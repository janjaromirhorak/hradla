import * as svgObj from './svgObjects'
import Logic from './logic'
import findPath from './findPath'


/**
 * mapping of logical states to css classes
 * @type {Object}
 */
const stateClasses = {
    on: "stateOn",
    off: "stateOff",
    unknown: "stateUnknown",
    oscillating: "stateOscillating"
};

/**
 * Helper class used by {@link Transform}.
 *
 * Represents one single property of the transform argument, for example `translate(360 150)`
 * that may be a part of longer transform argument like `transform="translate(360 150) rotate(90 30 20)"`
 */
class Property {
    /**
     * Initialize the Property object
     * @param {string} [string] string in the property format `propertyname(list of space separated values)`
     */
    constructor(string) {
        if(string!==undefined) {
            this.name = string.replace(/^[ ]*([^(]+).*/, "$1");
            this.args = string.replace(/^[^(]+\((.*)\)/, "$1").split(' ');
        }
    }

    /**
     * set or replace the name of this property
     * @param {string} name new name for this property
     */
    setName(name) {
        this.name = name;
    }

    /**
     * set arguments of this property
     * @param {array} args array of arguments
     */
    setArguments(args) {
        this.args = args;
    }

    /**
     * get string representation of the property
     * @return {string} property in the property format `name(arg1 arg2)`
     */
    get() {
        return this.name + "(" + this.args.join(" ") + ")";
    }
}

/**
 * API for manipulating the transform argument used in SVG
 */
export class Transform {
    /**
     * Initialize the Transform object
     * @param {string} [string] string in the format of the `transform` argument in SVG, for example `translate(360 150) rotate(90 30 20)`
     */
    constructor(string) {
        /**
         * array of {@link Property} instances
         * @type {Array}
         */
        this.items = [];

        if(string!==undefined) {
            for (const item of string.split(")")) {
                if(item) { // if not empty
                    this.items.push(new Property(item + ")"));
                }
            }
        }
    }

    /**
     * convert distances from SVG pixels to grid pixels
     * @param  {Canvas} parentSVG instance of [Canvas](./module-Canvas.html)
     */
    toGridPixels(parentSVG) {
        for (let item of this.items) {
            if(item.name === "translate") {
                item.args = [
                    parentSVG.SVGToGrid(item.args[0]),
                    parentSVG.SVGToGrid(item.args[1]),
                ]
            } else if(item.name === "rotate") {
                item.args = [
                    item.args[0],
                    parentSVG.SVGToGrid(item.args[1]),
                    parentSVG.SVGToGrid(item.args[2]),
                ]
            }
        }
    }

    /**
     * convert distances from grid pixels to SVG pixels
     * @param  {Canvas} parentSVG instance of [Canvas](./module-Canvas.html)
     */
    toSVGPixels(parentSVG) {
        for (let item of this.items) {
            if(item.name === "translate") {
                item.args = [
                    parentSVG.gridToSVG(item.args[0]),
                    parentSVG.gridToSVG(item.args[1]),
                ]
            } else if(item.name === "rotate") {
                item.args = [
                    item.args[0],
                    parentSVG.gridToSVG(item.args[1]),
                    parentSVG.gridToSVG(item.args[2]),
                ]
            }
        }
    }

    /**
     * find a transform property by name and get its index in the [items](#items) array
     * @param  {string} name name of the property
     * @return {number}      index of the property in the array of properties or `-1` if not found
     */
    getIndex(name) {
        for(let i = 0 ; i < this.items.length; i++) {
            if(name === this.items[i].name) {
                return i;
            }
        }

        return -1;
    }

    /**
     * get the translate property
     * @return {Object} object containing parameters of the translate attribute
     */
    getTranslate() {
        let args = this.getArguments(this.getIndex("translate"));

        return {
            x: Number(args[0]),
            y: Number(args[1])
        }
    }

    /**
     * get the rotate property
     * @return {Object} object containing parameters of the rotate attribute
     */
    getRotate() {
        let args = this.getArguments(this.getIndex("rotate"));

        return {
            deg: Number(args[0]),
            centreX: Number(args[1]),
            centreY: Number(args[2])
        }
    }

    /**
     * set translate to the specified values
     * @param {number} x horizontal translation
     * @param {number} y vertical translation
     */
    setTranslate(x, y) {
        this.setParameter("translate", [x, y]);
    }

    /**
     * set rotate to the specified values
     * @param {number} deg     angle of the rotation in degrees
     * @param {number} centreX horizontal position of the centre of the rotation
     * @param {number} centreY vertical position of the centre of the rotation
     */
    setRotate(deg, centreX, centreY) {
        this.setParameter("rotate", [deg, centreX, centreY]);
    }

    /**
     * rotate by 90 degrees to the right or left, depending on the parameter `right`
     * @param {number} centreX horizontal position of the centre of the rotation
     * @param {number} centreY vertical position of the centre of the rotation
     * @param {boolean} right rotate to the right if `true`, to the left if `false`
     */
    rotateRightAngle(centreX, centreY, right) {
        const amount = right ? 90 : 270;

        if(this.getIndex("rotate")===-1) {
            this.setRotate(amount, centreX, centreY);
        } else {
            let newRotation = (parseInt(this.getRotate().deg) + amount) % 360;

            if(newRotation===180) {
                // swap centre coordinates
                // because rotate(c, x, y) is defined like transform(-x, -y) rotate(c) transform(x, y)
                let a = centreX;
                centreX = centreY;
                centreY = a;
            }

            this.setRotate(
                newRotation,
                centreX,
                centreY
            );
        }
    }

    /**
     * rotate by 90 degrees to the right
     * @param  {number} centreX horizontal position of the centre of the rotation
     * @param  {number} centreY vertical position of the centre of the rotation
     */
    rotateRight(centreX, centreY) {
        this.rotateRightAngle(centreX, centreY, true);
    }

    /**
     * rotate by 90 degrees to the left
     * @param  {number} centreX horizontal position of the centre of the rotation
     * @param  {number} centreY vertical position of the centre of the rotation
     */
    rotateLeft(centreX, centreY) {
        this.rotateRightAngle(centreX, centreY, false);
    }

    /**
     * get the transform values in a string
     * @return {string} string that can be used as a value for the transform property of a SVG element
     */
    get() {
        let retVal;
        for(const item of this.items) {
            if(retVal) {
                retVal += " " + item.get();
            } else {
                retVal = item.get();
            }
        }
        return retVal;
    }

    /**
     * get arguments of a property specified by index
     * @param  {number} index index of the property
     * @return {array}       array of arguments of the specified property
     */
    getArguments(index) {
        return this.items[index].args;
    }

    /**
     * set argumets of a property specified by name
     * @param {string} name name of the property
     * @param {array} args array of arguments of the specified property
     */
    setParameter(name, args) {
        // determine index of the parameter (if set), else index == -1
        let index = this.getIndex(name);

        // if the property has been already set, change it (rewrite the array in the right index)
        // else create a new one (set index to the length of an array --> ad an item to the end)
        if(index===-1) {
            index = this.items.length;
            this.items[index] = new Property();
            this.items[index].setName(name);
        }

        // save args under the right index
        this.items[index].setArguments(args);
    }
}

/**
 * parent class for all network elements
 */
class NetworkElement {
    /**
     * Basic constructor for NetworkElement
     * @param {Canvas} parentSVG reference to the instance of {@link Canvas} that this element belongs to
     */
    constructor(parentSVG) {
        if(!parentSVG) {
            console.error("Parent SVG element has to be defined.");
        }
        this.parentSVG = parentSVG;

        // used to store the svjObject's instance of this element
        this.svgObj = undefined;
    }

    /**
     * Get the unique ID of the SVG element tied to this logical element
     * @return {string} ID of the SVG element
     */
    get id() {
        return this.svgObj.id;
    }

    /**
     * empty callback function to prevent error messages, function is implemented later in the {@link Box} class
     */
    onMouseDown() {}

    /**
     * empty function to prevent error messages, function is implemented later in the {@link Box} and {@link Connector} classes
     */
    onMouseUp() {}

    /**
     * empty function to prevent error messages, function is implemented later in the {@link Box} class
     */
    onMouseMove() {}

    /**
     * "virtual" getter for json data, prints an error that it has to be redefined in the derived classes
     */
    get exportData() {
        console.error("'json' getter has not been defined for this element", this);
        return undefined;
    }
}

/**
 * parent class for input and output connectors
 * @extends NetworkElement
 */
class Connector extends NetworkElement {
    /**
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} gridSize  size of the grid in SVG pixels
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    constructor(parentSVG, left, top) {
        super(parentSVG);

        /**
         * size of the grid in SVG pixels
         * @type {number}
         */
        this.gridSize = parentSVG.gridSize;
        /**
         * size of the connector in SVG pixels
         * @type {number}
         */
        this.connectorSize = parentSVG.gridSize;
        /**
         * offset of the connector from the grid in SVG pixels
         * @type {number}
         */
        this.connectorOffset = this.connectorSize / 2;

        /**
         * instance of {@link svgObjects.svgObj} that holds all SVG information about this connector
         * @type {svgObj}
         */
        this.svgObj = new svgObj.Rectangle(
            left * this.gridSize - this.connectorOffset,
            top * this.gridSize - this.connectorOffset,
            this.connectorSize,
            this.connectorSize,
            "none",
            "black"
        );

        this.svgObj.$el.addClass("connector");

        /**
         * this flag describes whether this connector is an input connector
         * @type {Boolean}
         */
        this.isInputConnector = false;

        /**
         * current logical state of this connector
         * @type {Logic.state}
         */
        this.elementState = Logic.state.unknown;
        this.svgObj.addClass(stateClasses.unknown);

        /**
         * set of ids of all wires connected to this connector
         * @type {Set}
         */
        this.wireIds = new Set();
    }

    /**
     * whether this connector is an output connector
     * @return {Boolean}
     */
    get isOutputConnector() {
        return !this.isInputConnector;
    }

    /**
     * whether this connector is an output connector
     * @return {Boolean}
     */
    set isOutputConnector(value) {
        this.isInputConnector = !value;
    }

    /**
     * add a wire id to the list of wire ids
     * @param {string} wireId
     */
    addWireId(wireId) {
        this.wireIds.add(wireId);
    }

    /**
     * remove a wire id from the list of wire ids
     * @param {string} wireId
     */
    removeWireId(wireId) {
        this.wireIds.delete(wireId);
    }

    /**
     * remove a wire specified by ID and update the connector
     * @param  {string} wireId ID of the wire to be removed
     */
    removeWireIdAndUpdate(wireId) {
        this.removeWireId(wireId);
    }

    /**
     * set logical state of the connector
     * @param {Logic.state} state new state of the connector
     */
    setState(state) {
        this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);

        switch (state) {
            case Logic.state.unknown:
                this.svgObj.addClass(stateClasses.unknown);
                break;
            case Logic.state.on:
                this.svgObj.addClass(stateClasses.on);
                break;
            case Logic.state.off:
                this.svgObj.addClass(stateClasses.off);
                break;
            case Logic.state.oscillating:
                this.svgObj.addClass(stateClasses.oscillating);
                break;
        }

        this.elementState = state;
    }

    /**
     * get state of this connector
     * @return {Logic.state}
     */
    get state() {
        return this.elementState;
    }

    /**
     * get svgObj instance content of this connector
     * @return {svgObjects.Rectangle}
     */
    get() {
        return this.svgObj;
    }

    /**
     * call [wireCreationHelper](./module-Canvas.html#wireCreationHelper) on mouse up
     */
    onMouseUp() {
        this.parentSVG.wireCreationHelper(this.svgObj.id);
    }
}

/**
 * Connector that gets its state from a connected value and passes it through to the {@link Box} this connector belongs to.
 * @extends Connector
 */
export class InputConnector extends Connector {
    /**
     * Call the constructor from the parent {@link Connector} class and set isInputConnector to true.
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    constructor(parentSVG, left, top) {
        super(parentSVG, left, top);

        this.isInputConnector = true;
    }

    /**
     * Call the setState method of {@link Connector} and than refresh the state of the connected {@link Box}
     * @param {Logic.state} state new {@link Logic.state} of the connector
     */
    setState(state) {
        super.setState(state);

        let gate = this.parentSVG.getBoxByConnectorId(this.svgObj.id);
        gate.refreshState();
    }

    /**
     * remove the wire (by calling the removeWireIdAndUpdate of {@link Connector})
     * and update state of this connector by setting it to undefined using the setState method
     * @param  {string} wireId ID of the {@link Wire}
     */
    removeWireIdAndUpdate(wireId) {
        super.removeWireIdAndUpdate(wireId);
        this.setState(Logic.state.unknown);
    }
}

/**
 * Connector that takes a state defined by the {@link Box} it belongs to and passes it to all connected wire
 * @extends Connector
 */
export class OutputConnector extends Connector {
    /**
     * Call the constructor from the parent {@link Connector} class and set isOutputConnector to true.
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    constructor(parentSVG, left, top) {
        super(parentSVG, left, top);

        this.isOutputConnector = true;
    }

    /**
     * Call the setState method of {@link Connector} and than set the state of the connected {@link Wire}s
     * @param {Logic.state} state new {@link Logic.state} of the connector
     */
    setState(state) {
        super.setState(state);

        for (const wireId of this.wireIds) {
            this.parentSVG.getWireById(wireId).setState(state);
        }
    }
}

/**
 * Parent class for gates and input and output boxes. Defines all the factors
 * that the boxes have in common (svgObj structure, draggability and rotatability...)
 * @extends NetworkElement
 */
class Box extends NetworkElement {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string} name       name of the element (input, output, and, or, xor...)
     * @param {string} category   type of the element (io, gate)
     * @param {number} gridWidth  width of the element in grid pixels
     * @param {number} gridHeight height of the element in grid pixels
     */
    constructor(parentSVG, name, category, gridWidth, gridHeight) {
        super(parentSVG);

        /**
         * specifies the box type within the category (input/output in io, and/or/... in gate)
         * @type {string}
         */
        this.name = name;

        /**
         * specifies the box category (io for input or output, gate for logic gates)
         * @type {string}
         */
        this.category = category;

        /**
         * size of the grid in SVG pixels
         * @type {number}
         */
        this.gridSize = this.parentSVG.gridSize;

        /**
         * array of connectors of this box
         * @type {Array}
         */
        this.connectors = [];

        /**
         * svgObj containing all SVG data used to display this box
         * @type {svgObj}
         */
        this.svgObj = new svgObj.Group();

        /**
         * width of this element in SVG pixels
         * @type {number}
         */
        this.width = gridWidth * this.gridSize;
        /**
         * height of this element in SVG pixels
         * @type {number}
         */
        this.height = gridHeight * this.gridSize;

        /**
         * width of this element in grid pixels
         * @type {number}
         */
        this.gridWidth = gridWidth;
        /**
         * height of this element in grid pixels
         * @type {number}
         */
        this.gridHeight = gridHeight;

        // transparent background rectangle
        let rectangle = new svgObj.Rectangle(0, 0, this.width, this.height, "none", "none");
        rectangle.$el.addClass('rect');

        this.svgObj.addChild(rectangle);

        // image of the element
        this.image = new svgObj.SvgImage(0, 0, this.width, this.height, this.url);
        this.svgObj.addChild(this.image);

        // add type="gate", used in special callbacks in contextmenu
        this.svgObj.addAttr({"type": category});

        this.svgObj.$el.addClass("box");
        this.svgObj.$el.addClass(category);
    }

    /**
     * url of the image depicting this object
     * @type {string}
     */
    get url() {
        const
            category = this.category || "",
            name = this.name || "",
            suffix = this.imgSuffix || "";

        return `img/svg/${category}/${name}${suffix}.svg`;
    }

    /**
     * get all input connectors of this box
     * @return {Array} array of input connectors
     */
    get inputConnectors() {
        return this.connectors.filter(conn => conn.isInputConnector)
    }

    /**
     * get all output connectors of this box
     * @return {Array} array of output connectors
     */
    get outputConnectors() {
        return this.connectors.filter(conn => conn.isOutputConnector)
    }

    /**
     * get data of this box as a JSON-ready object
     * @return {Object} javascript object containing essential data for this box
     */
    get exportData() {
        let connections = [];

        // go through all connectors
        let counter = 0
        for (const conn of this.connectors) {
            // go through each its wire id
            for (const item of conn.wireIds) {
                let thisWireId;
                if(!this.parentSVG.exportWireIdMap.has(item)) {
                    // if the wire id is not in the map, add it and assign new arbitrary id
                    this.parentSVG.exportWireIdMap.set(item, this.parentSVG.exportWireId);
                    thisWireId = this.parentSVG.exportWireId;
                    this.parentSVG.exportWireId++;
                } else {
                    // else get id from the map
                    thisWireId = this.parentSVG.exportWireIdMap.get(item);
                }


                // add this connection to the list
                connections[connections.length] = {
                    index: counter,
                    type: conn.type,
                    wireId: thisWireId
                };
            }
            counter++
        }

        return {
            name: this.name,
            category: this.category,
            transform: this.getTransform(true),
            connections: connections
        };
    }

    /**
     * get set of nodes that are not suitable for wire routing
     * @param  {Number} [marginTop=0]    top margin of the element (distance from the element that should be also blocked)
     * @param  {Number} [marginRight=0]  right margin of the element
     * @param  {Number} [marginBottom=0] bottom margin of the element
     * @param  {Number} [marginLeft=0]   left margin of the element
     * @param  {Number} specialNodes     additional nodes that should be added to the set
     * @return {Set}                     set of not suitable nodes
     */
    generateBlockNodes(marginTop = 0, marginRight = 0, marginBottom = 0, marginLeft = 0, ...specialNodes) {
        this.blockedNodes = new Set();
        for(let x = marginLeft ; x <= this.gridWidth - marginRight ; x++) {
            for(let y = marginTop ; y <= this.gridHeight - marginBottom ; y++) {
                this.blockedNodes.add({
                    x: x,
                    y: y
                });
            }
        }

        for (let node of specialNodes) {
            this.blockedNodes.add(node);
        }
    }

    /**
     * empty function, redefined in inherited elements
     * refreshState takes input connector values and sets output values accordingly
     */
    refreshState() {
        console.warn("Calling the virtual function refreshState has no effect.");
    }

    /**
     * change image to another one that ends with a specified suffix
     *
     * *usage:* `changeImage("abc")` changes image url to `image-abc.svg`,
     * `changeImage()` changes image url to the default one (`image.svg`)
     * @param  {string} [suffix] new suffix for the image
     */
    changeImage(suffix) {
        if(suffix === undefined || suffix === "") {
            this.imgSuffix = "";
        } else {
            this.imgSuffix = "-" + suffix;
        }

        this.image.changeUrl(this.url);
    }

    /**
     * get a jQuery element representing this box
     * @return {jQuery.element}
     */
    get() {
        return this.svgObj.get();
    }

    /**
     * rotate the set of blocked nodes by 90 degrees to the right or to the left, depending on the parameter
     *
     * used to rotate the nodes when the object itself is rotated
     * @param  {boolean} right rotate clockwise if true, counterclockwise if false
     */
    rotateBlockedNodes(right) {
        if(this.rotationParity===undefined) {
            this.rotationParity = false;
        }

        this.rotationParity = !this.rotationParity;

        let newBlockedNodes = new Set();

        // rotate the node

        for (const node of this.blockedNodes) {
            let newNode;

            if(this.rotationParity) {
                if(right) {
                    newNode = {
                        x: Math.abs(node.y - this.gridHeight),
                        y: node.x
                    };
                } else {
                    newNode = {
                        x: node.y,
                        y: Math.abs(node.x - this.gridWidth)
                    };
                }
            } else {
                if(right) {
                    newNode = {
                        x: Math.abs(node.y - this.gridWidth),
                        y: node.x
                    };
                } else {
                    newNode = {
                        x: node.y,
                        y: Math.abs(node.x - this.gridHeight)
                    };
                }
            }

            newBlockedNodes.add(newNode);
        }

        this.blockedNodes = newBlockedNodes;
    }

    /**
     * rotate the set of blocked nodes to the right
     *
     * used to rotate the nodes when the object itself is rotated
     */
    rotateBlockedNodesRight() {
        this.rotateBlockedNodes(true);
    }

    /**
     * rotate the set of blocked nodes to the right
     *
     * used to rotate the nodes when the object itself is rotated
     */
    rotateBlockedNodesLeft() {
        this.rotateBlockedNodes(false);
    }

    /**
     * add a connector to the element on the specified position
     * @param {number}  left             horizontal distance from the left edge of the element
     * @param {number}  top              vertical distance from the top edge of the element
     * @param {Boolean} isInputConnector whether or not should this connector an input connector (`true` for input connector, `false` for output connector)
     */
    addConnector(left, top, isInputConnector) {
        let index = this.connectors.length;
        if(isInputConnector) {
            this.connectors[index] = new InputConnector(this.parentSVG, left, top);
        } else {
            this.connectors[index] = new OutputConnector(this.parentSVG, left, top);
        }
        this.svgObj.addChild(this.connectors[index].get());
    }

    /**
     * add an input connector to the element on the specified position
     * @param {number} left horizontal distance from the left edge of the element
     * @param {number} top  vertical distance from the top edge of the element
     */
    addInputConnector(left, top) {
        return this.addConnector(left, top, true)
    }

    /**
     * add an output connector to the element on the specified position
     * @param {number} left horizontal distance from the left edge of the element
     * @param {number} top  vertical distance from the top edge of the element
     */
    addOutputConnector(left, top) {
        return this.addConnector(left, top, false)
    }

    /**
     * get the connector object based on its id
     * @param  {string} connectorId ID of the {@link Connector}
     * @return {Connector}             instance of the {@link Connector} or `undefined` if not found
     */
    getConnectorById(connectorId) {
        for(let i = 0 ; i < this.connectors.length ; i++) {
            if(this.connectors[i].id===connectorId) {
                return this.connectors[i];
            }
        }
        // if connector not found, return undefined
        return undefined;
    }

    /**
     * get the instance of {@link Transform} representing the state of the transform attribute of this element
     * @param  {Boolean} [gridPixels=false] if `true`, function will return the result in grid pixels instead of SVG pixels
     * @return {Transform}                  {@link Transform} of the element
     */
    getTransform(gridPixels = false) {
        let transform;
        if (!this.svgObj.$el.attr("transform")) {
            // the element does not have a "transform" property --> create it
            transform = new Transform();
            transform.setTranslate(0, 0);
            this.svgObj.addAttr({"transform": transform.get()});
        } else {
            // the element does have a "transform" property --> change it
            transform = new Transform(this.svgObj.$el.attr("transform"));
        }

        // convert values to grid pixels
        if(gridPixels) {
            transform.toGridPixels(this.parentSVG);
        }

        return transform;
    }

    /**
     * get the instance of {@link Transform} representing the state of the transform attribute of this element _with lenght units in grid pixels_
     * @return {Transform} {@link Transform} of the element
     */
    getGridPixelTransform() {
        return this.getTransform(true);
    }

    /**
     * set the transform attribute of this element
     * @param {Transform} transform {@link Transform} of the element (with lengths specified in SVG pixels)
     */
    setTransform(transform) {
        this.svgObj.addAttr({"transform": transform.get()});
    }

    /**
     * function that is called on every mouse down on this element
     *
     * moves the element to the front and calls onMouseDownLeft if applicable
     * @param  {jQuery.MouseEvent} event
     */
    onMouseDown(event) {
        this.mouseLeft = false;
        if(event.which === 1) {
            this.mouseLeft = true;
            this.onMouseDownLeft(event);

            // move the DOM element to front
            this.parentSVG.moveToFrontById(this.svgObj.id);
        }
    }

    /**
     * function that is called on every left mouse down on this element
     *
     * prepares element for the "click" and "drag and drop" actions
     * @param  {jQuery.MouseEvent} event
     */
    onMouseDownLeft(event) {
        this.mouseMoved = false;

        let transform = this.getTransform();

        // save the current item position into a variable
        let currentPosition = transform.getTranslate();

        let {pageX, pageY} = this.parentSVG.viewbox.transformEvent(event)

        // calculate mouse offset from the object origin
        this.offset = {
            x: pageX - currentPosition.x,
            y: pageY - currentPosition.y
        };
    }

    /**
     * function that is called on every left mouse move with this element
     * applies the correct transform values to provide the "drag and drop" functionality
     * @param  {jQuery.MouseEvent} event
     */
    onMouseMove(event) {
        if(this.mouseLeft) {
            this.svgObj.$el.addClass('grabbed');

            this.mouseMoved = true;

            let {pageX, pageY} = this.parentSVG.viewbox.transformEvent(event)

            const left = pageX - this.offset.x;
            const top = pageY - this.offset.y;

            let transform = this.getTransform();
            transform.setTranslate(left, top);

            this.setTransform(transform);

            this.updateWires(true);
        }
    }

    /**
     * function that is called on every mouse up on this element
     * provides the "click" functionality and calls the onDrop handler for the "drag and drop" functionality
     * @param  {jQuery.MouseEvent} event
     */
    onMouseUp(event) {
        if(event.which === 1) {
            if(this.mouseMoved) {
                this.onDrop(event);
            } else {
                this.onClick();
            }
        } else if (event.which === 2 ) {
            this.onClickMiddle(event);
        }

        this.svgObj.$el.removeClass('grabbed');
    }

    /**
     * called by onMouseUp when the mouse has been moved between onMouseDown and onMouseUp
     *
     * applies grid snapping of the element on the end of the "drag and drop" action
     * @param  {jQuery.MouseEvent} event
     */
    onDrop(event) {
        let {pageX, pageY} = this.parentSVG.viewbox.transformEvent(event)

        let left = pageX - this.offset.x;
        let top = pageY - this.offset.y;

        left = this.parentSVG.snapToGrid(left);
        top = this.parentSVG.snapToGrid(top);

        let transform = this.getTransform();
        transform.setTranslate(left, top);

        this.setTransform(transform);

        this.updateWires();

        // if tutorial exists, call tutorial callback
        if(this.parentSVG.tutorial) {
            this.parentSVG.tutorial.onBoxMoved();
        }
    }

    /**
     * empty function, will be redefined in InputBox
     */
    onClick() {}

    /**
     * custom callback function for middle click that rotates the box by 90 degrees to the right
     */
    onClickMiddle(event) {
        // get the transform value for this box
        let transform = this.getTransform();

        // get the bounding rectangle for this box
        let rect = this.svgObj.$el[0].getBoundingClientRect();

        // use the bounding rectangle dimensions to figure out the geometrical centre of the box
        let centreX = Math.round(rect.width / 2);
        let centreY = Math.round(rect.height / 2);

        centreX -= centreX % this.gridSize;
        centreY -= centreY % this.gridSize;

        // apply the rotation to the transform object
        if(event.ctrlKey) {
            transform.rotateLeft(centreX, centreY);
        } else {
            transform.rotateRight(centreX, centreY);
        }


        // apply the modified transform object ot the svgObj
        this.svgObj.addAttr({"transform": transform.get()});

        // rotate also the blocked nodes
        if(event.ctrlKey) {
            this.rotateBlockedNodesLeft();
        } else {
            this.rotateBlockedNodesRight();
        }

        // update the wires
        this.updateWires();

        // if tutorial exists, call tutorial callback
        if(this.parentSVG.tutorial) {
            this.parentSVG.tutorial.onBoxRotated();
        }
    }

    /**
     * Updates all wires connected to this box. Iterates over all wires that are connected to this box
     * and calls routeWire (or temporaryWire if the `temporary` parameter is set to true) to update the wire routing
     * @param  {Boolean} [temporary=false] [description]
     */
    updateWires(temporary = false) {
        this.connectors.forEach(conn => {
            conn.wireIds.forEach(wireId => {
                let wire = this.parentSVG.getWireById(wireId);
                if(temporary) {
                    wire.temporaryWire();
                } else {
                    wire.routeWire();
                }
            })
        })
    }
}

/**
 * InputBox has only output connectors and is used to set the input states for the logic network.
 * @extends Box
 */
export class InputBox extends Box {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {Boolean} [isOn=false] the initial state of the inputbox (`true` is *on*, `false` is *off*)
     */
    constructor(parentSVG, isOn = false) {
        const gridWidth = 7;
        const gridHeight = 4;

        super(parentSVG, "input", "other", gridWidth, gridHeight);

        this.addConnector(gridWidth, gridHeight / 2, false);

        this.on = isOn;

        this.generateBlockNodes();
    }

    /**
     * get data of this input box as a JSON-ready object
     * @return {Object} javascript object containing essential data for this input box
     */
    get exportData() {
        let data = super.exportData;
        data.isOn = this.isOn;

        return data;
    }

    generateBlockNodes() {
        // block the input connector node
        const specialNode = {
            x: this.gridWidth,
            y: this.gridHeight / 2
        }
        super.generateBlockNodes(0, 1, 1, 0, specialNode);
    }

    /**
     * start a new simulation from the output connector
     */
    refreshState() {
        this.parentSVG.startNewSimulation(this.connectors[0], this.connectors[0].state)
    }

    /**
     * set the state of the inputbox to the corresponding value
     * @param  {Boolean} isOn set to *on* if `true`, set to *off* if `false`
     */
    set on(isOn) {
        if (isOn) {
            // turn on
            this.changeImage("on");
            this.connectors[0].setState(Logic.state.on);
            this.refreshState()
        } else {
            // turn off
            this.changeImage();
            this.connectors[0].setState(Logic.state.off);
            this.refreshState()
        }

        this.isOn = isOn;
    }

    /**
     * get the state of the inputbox (`true` if *on*, `false` if *off*)
     * @return {Boolean} [description]
     */
    get on() {
        return this.isOn;
    }

    /**
     * toggle the state of the inputbox
     */
    onClick() {
        this.on = !this.on;

        if(this.parentSVG.tutorial) {
            this.parentSVG.tutorial.onChangeInputBoxState();
        }
    }
}

/**
 * OutputBox has only input connectors and is used to visualize the output states of the logic network.
 * @extends Box
 */
export class OutputBox extends Box {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     */
    constructor(parentSVG) {
        const gridHeight = 4;
        const gridWidth = 5;

        super(parentSVG, "output", "other", gridWidth, gridHeight);

        this.addConnector(0, gridHeight / 2, true);

        this.generateBlockNodes();
    }

    /**
     * set state of this output box to match the state of its input connector
     */
    refreshState() {
        this.setState(this.connectors[0].state);
    }

    /**
     * Reflect the input connector state in the appearance of the element - set
     * the element image to represent the corresponding state
     * @param {Logic.state} state new state of this outputBox
     */
    setState(state) {
        switch (state) {
            case Logic.state.on:
                this.changeImage("on");

                // if tutorial exists, call tutorial callback
                if(this.parentSVG.tutorial) {
                    this.parentSVG.tutorial.onOutputBoxTrue();
                }
                break;
            case Logic.state.off:
                this.changeImage("off");
                break;
            case Logic.state.unknown:
                this.changeImage();
                break;
            case Logic.state.oscillating:
                this.changeImage("osc");
                break;
        }
    }

    generateBlockNodes() {
        // block the input connector node
        const specialNode = {
            x: 0,
            y: this.gridHeight / 2
        }
        super.generateBlockNodes(0, 0, 0, 1, specialNode);
    }
}

/**
 * Gate is a box that processes the states of its input connectors and returns the result in its output connectors.
 * @extends Box
 */
export class Gate extends Box {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string} name       name of the gate (and, not, xor...)
     */
    constructor(parentSVG, name) {
        const width = 9;
        const height = 4;

        super(parentSVG, name, "gate", width, height);

        // ADD CONNECTORS

        let specialNodes = [];

        // output
        this.addConnector(width, height / 2, false);

        // block the output connector
        specialNodes.push({
            x: width,
            y: height / 2
        });

        if(this.name==="not" || this.name==="repeater") {
            // input
            this.addConnector(0, height / 2, true);
            // block the input connector
            specialNodes.push({
                x: 0,
                y: height / 2
            });
        } else {
            // input
            this.addConnector(0, height / 4, true);
            this.addConnector(0, height / (4/3), true);

            // block the input connectors
            specialNodes.push({
                x: 0,
                y: height / 4
            })
            specialNodes.push({
                x: 0,
                y: height / (4/3)
            });

            // add one blocked node between the inputs (for better looking wiring)
            specialNodes.push({
                x: 0,
                y: height / 2
            });
        }

        this.generateBlockNodes(...specialNodes);

        this.refreshState();
    }

    /**
     * array of valid gate names
     * @type {Set}
     */
    static get validGates() {
        return new Set(["not", "and", "or", "nand", "nor", "xor", "xnor", "repeater"]);
    }

    generateBlockNodes(...specialNodes) {
        if(specialNodes!==undefined) {
            super.generateBlockNodes(0, 1, 0, 1, ...specialNodes);
        } else {
            super.generateBlockNodes(0, 1, 0, 1);
        }
    }

    /**
     * proccess the input connector states and reflect them in the output connector states according
     * to the logic corresponding to this gate's name
     */
    refreshState() {
        let state = Logic.state.unknown
        switch (this.name) {
            case "and":
                state = Logic.and(this.connectors[1].state, this.connectors[2].state)
                break;
            case "nand":
                state = Logic.nand(this.connectors[1].state, this.connectors[2].state)
                break;
            case "nor":
                state = Logic.nor(this.connectors[1].state, this.connectors[2].state)
                break;
            case "not":
                state = Logic.not(this.connectors[1].state)
                break;
            case "or":
                state = Logic.or(this.connectors[1].state, this.connectors[2].state)
                break;
            case "xnor":
                state = Logic.xnor(this.connectors[1].state, this.connectors[2].state)
                break;
            case "xor":
                state = Logic.xor(this.connectors[1].state, this.connectors[2].state)
                break;
            case "repeater":
                state = this.connectors[1].state
                break;
        }
        // notify the simulator about this change
        this.parentSVG.simulation.notifyChange(this.connectors[0].id, state)
    }
}

/**
 * Blackbox is a box that is defined by its evaluation function
 * @extends Box
 */
export class Blackbox extends Box {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {number} inputConnectors  number of input connectors
     * @param {number} outputConnectors number of output connectors
     * @param {Function} evalFunction   function that takes `inputConnectors` [Logic.state](./module-Logic.html#.state)s
     *                                  and returns `outputConnectors` Logic.states.
     * @param {String} [name]        name that will be displayed on the blackbox
     */
    constructor(parentSVG, inputConnectors, outputConnectors, evalFunction, name = "") {
        const width = 11;
        const height = Math.max(inputConnectors, outputConnectors) * 2;

        super(parentSVG, name, "blackbox", width, height);

        const connectorPinLenght = 2.5 * this.gridSize;

        // override default svgObj structure
        this.svgObj = new svgObj.Group();

        // transparent background rectangle
        let hitbox = new svgObj.Rectangle(0, 0, this.width, this.height, "none", "none");
        hitbox.$el.addClass('rect');

        this.svgObj.addChild(hitbox);

        // main rectangle
        const bodyWidth = this.width - 2 * connectorPinLenght;

        let rectangle = new svgObj.Rectangle(connectorPinLenght, 0, bodyWidth, this.height, "white", "black");
        rectangle.addAttr({'stroke-width': '2.5'});
        rectangle.$el.addClass('rect');

        this.svgObj.addChild(rectangle);

        // text description of the box
        const textWidth = bodyWidth - this.gridSize;
        const textHeight = this.height - this.gridSize;
        let text = new svgObj.MultiLineText(
            (this.width - textWidth) / 2, // horizontal centering
            (this.height - textHeight) / 2, // vertical centering
            textWidth,
            textHeight,
            name.toUpperCase(),
            this.gridSize * 1.2
        );
        this.svgObj.addChild(text);

        // add input connectors
        for (let i = 0 ; i < inputConnectors ; ++i) {
            const gridPosition = (i * 2) + 1;
            const pixelPosition = gridPosition * this.gridSize;

            let pin = new svgObj.PolyLine(
                new svgObj.PolylinePoints([
                    new svgObj.PolylinePoint(0, pixelPosition),
                    new svgObj.PolylinePoint(connectorPinLenght, pixelPosition),
                ]),
                1,
                "black"
            )

            this.svgObj.addChild(pin);

            // add the connector
            this.addInputConnector(0, gridPosition);
        }

        // add output connectors
        for (let i = 0 ; i < outputConnectors ; ++i) {
            const gridPosition = (i * 2) + 1;
            const pixelPosition = gridPosition * this.gridSize;

            let pin = new svgObj.PolyLine(
                new svgObj.PolylinePoints([
                    new svgObj.PolylinePoint(this.width - connectorPinLenght, pixelPosition),
                    new svgObj.PolylinePoint(this.width, pixelPosition),
                ]),
                1,
                "black"
            )

            this.svgObj.addChild(pin);

            this.addOutputConnector(width, gridPosition);
        }

        this.svgObj.$el.addClass("box");

        /**
         * function that takes `inputConnectors` [Logic.state](./module-Logic.html#.state)s
         * and returns `outputConnectors` Logic.states.
         */
        this.evalFunction = evalFunction;

        // regenerate the blocked nodes after adding all the connectors
        this.generateBlockNodes();
    }

    /**
     * get data of this blackbox as a JSON-ready object
     * @return {Object} javascript object containing essential data for this blackbox
     */
    get exportData() {
        let data = super.exportData;
        data.inputs = this.inputConnectors.length;
        data.outputs = this.outputConnectors.length;

        // generate the truth table

        data.table = []

        // array of tested input states
        const stateList = Logic.stateList;

        // recursive function that generates all possible inputs
        const getPermutations = (length) => {
            let permutations = [];
            switch (length) {
                case 0:
                    return [];
                case 1:
                    for (const state of stateList) {
                        permutations.push([state])
                    }
                    return permutations;
                default:
                    for (const state of stateList) {
                        for(const perm of getPermutations(length - 1)) {
                            permutations.push([state, ...perm])
                        }
                    }
                    return permutations;
            }
        }

        // generate outputs for all the possible inputs
        for (const inputValues of getPermutations(data.inputs)) {
            const outputValues = this.evalFunction(...inputValues);

            // if there is an output value that is not Logic.state.unknown, add this line to the
            // truthtable, otherwise don't add it (if all output values are Logic.state.unknown,
            // the input combination does not have to be defines, because Logic.state.unknown is the default value)
            if (outputValues.reduce((accumulator, current) => {
                return accumulator || current !== Logic.state.unknown
            })) {
                data.table.push([...inputValues, ...outputValues])
            }
        }

        return data;
    }

    /**
     * proccess the input connector states and reflect them in the output connector states according
     * to the logic defined by this.evalFunction
     */
    refreshState() {
        const inputStates = this.inputConnectors.map(conn => conn.state);
        // call the evalFunction to get the output states
        const outputStates = this.evalFunction(...inputStates);

        // apply the outputStates to the outputConnectors
        for (let i = 0; i < outputStates.length ; ++i) {
            this.outputConnectors[i].setState(outputStates[i]);
        }
    }

    generateBlockNodes() {
        // add blocked nodes on the connectors and between them as well

        let specialNodes = []
        for (let i = 1 ; i < this.inputConnectors.length * 2 ; ++i) {
            specialNodes.push({
                x: 0,
                y: i
            })
        }
        for (let i = 1 ; i < this.outputConnectors.length * 2 ; ++i) {
            specialNodes.push({
                x: this.gridWidth,
                y: i
            })
        }

        super.generateBlockNodes(0, 1, 0, 1, ...specialNodes);
    }
}

/**
 * Wire represents connection of two {@link Connector}s.
 * @extends NetworkElement
 */
export class Wire extends NetworkElement {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string}  fromId    id of the first connector this wire will be connected to
     * @param {string}  toId      id of the second connector this wire will be connected to
     * @param {Boolean} [refresh=true] if `true`, the [Canvas](./module-Canvas.html) will refresh after creating this wire
     */
    constructor(parentSVG, fromId, toId, refresh = true, route = true) {
        super(parentSVG);

        this.gridSize = parentSVG.gridSize;

        this.fromId = fromId;
        this.toId = toId;

        this.startBox = this.parentSVG.getBoxByConnectorId(fromId);
        this.endBox = this.parentSVG.getBoxByConnectorId(toId);

        this.boxes = [this.startBox, this.endBox]

        this.startConnector = this.parentSVG.getConnectorById(fromId);
        this.endConnector = this.parentSVG.getConnectorById(toId);

        this.connectors = [this.startConnector, this.endConnector]

        if(route) {
            this.routeWire(true, refresh);
        } else {
            this.temporaryWire();
        }

        this.elementState = Logic.state.unknown;

        for (let connector of this.connectors) {
            if(connector.isOutputConnector) {
                this.setState(connector.state);
            }
        }

        this.svgObj.$el.addClass("wire");
    }

    /**
     * get data of this wire as a JSON-ready object
     * @return {Object} javascript object containing essential data for this wire
     */
    get exportData() {
        return {
            fromId: this.fromId,
            toId: this.toId
        };
    }

    /**
     * set the state of this wire to match the state of the input connector it is connected to
     * @param {Logic.state} state [description]
     */
    setState(state) {
        this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);

        switch (state) {
            case Logic.state.unknown:
                this.svgObj.addClass(stateClasses.unknown);
                break;
            case Logic.state.on:
                this.svgObj.addClass(stateClasses.on);
                break;
            case Logic.state.off:
                this.svgObj.addClass(stateClasses.off);
                break;
            case Logic.state.oscillating:
                this.svgObj.addClass(stateClasses.oscillating);
                break;
        }

        if (this.startConnector.isInputConnector) {
            this.startConnector.setState(state);
        }
        if(this.endConnector.isInputConnector) {
            this.endConnector.setState(state);
        }

        this.elementState = state;
    }

    /**
     * get the current [Logic.state](./modules-Logic.html#.state) of this wire
     * @return {Logic.state}
     */
    get state() {
        return this.elementState;
    }

    /**
     * update the state of this wire
     */
    updateWireState() {
        for (const box of this.boxes) {
            box.refreshState()
        }
    }

    /**
     * get the jQuery element for this wire
     * @return {jQuery.element}
     */
    get() {
        return this.svgObj.get();
    }

    /**
     * get the polyline points for a temporary wire placement connecting the two connectors
     * @return {PolylinePoints} new instance of {@link PolylinePoints}
     */
    getTemporaryWirePoints() {
        let points = new svgObj.PolylinePoints();
        points.append(new svgObj.PolylinePoint(this.wireStart.x, this.wireStart.y));
        points.append(new svgObj.PolylinePoint(this.wireEnd.x, this.wireEnd.y));
        return points;
    }

    /**
     * route the wire using the temporary wire points
     */
    temporaryWire() {
        this.wireStart = this.parentSVG.getConnectorPosition(this.startConnector, false);
        this.wireEnd = this.parentSVG.getConnectorPosition(this.endConnector, false);

        this.setWirePath(this.getTemporaryWirePoints());
    }

    /**
     * route the wire using the modified A* wire routing algorithm
     */
    routeWire(snapToGrid = true, refresh = true) {
        this.wireStart = this.parentSVG.getConnectorPosition(this.startConnector, snapToGrid);
        this.wireEnd = this.parentSVG.getConnectorPosition(this.endConnector, snapToGrid);

        this.points = this.findRoute(
            {
                x: this.wireStart.x / this.gridSize,
                y: this.wireStart.y / this.gridSize
            },
            {
                x: this.wireEnd.x / this.gridSize,
                y: this.wireEnd.y / this.gridSize
            });

        this.setWirePath(this.points);

        if (refresh)
            this.updateWireState();

        // regenerate inconvenient nodes
        this.generateInconvenientNodes();
    }

    /**
     * set the wire to follow the specified points
     * @param {PolylinePoints} points instance of {@link PolylinePoints}
     */
    setWirePath(points) {
        // set the line
        if(this.svgObj!==undefined) {
            // this.svgObj.updatePoints(points);
            for (let child of this.svgObj.children) {
                child.updatePoints(points);
            }
        } else {
            // this.svgObj = new svgObj.PolyLine(points, 2, "#8b8b8b");
            this.svgObj = new svgObj.Group();

            let hitbox = new svgObj.PolyLine(points, 10, 'white');
            hitbox.addClass("hitbox");
            hitbox.addAttr({opacity: 0});
            this.svgObj.addChild(hitbox);

            let mainLine = new svgObj.PolyLine(points, 2);
            mainLine.addClass("main", "stateUnknown");
            this.svgObj.addChild(mainLine);
        }

        this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);
        this.svgObj.addClass(stateClasses.unknown);

        this.svgObj.addAttr({
            fromId: this.fromId,
            toId: this.toId
        });
    }

    /**
     * TODO
     */
    pathToPolyline(path) {
        let totalPath = new svgObj.PolylinePoints();
        for (const point of path) {
            totalPath.append(new svgObj.PolylinePoint(point.x * this.gridSize, point.y * this.gridSize));
        }
        return totalPath;
    }

    /**
     * find a nice route for the wire
     * @param  {Object} start object containing numeric attributes `x` and `y` that represent the first endpoint of the wire in grid pixel
     * @param  {Object} end   object containing numeric attributes `x` and `y` that represent the second endpoint of the wire in grid pixels
     * @return {PolylinePoints}       [description]
     */
    findRoute(start, end) {
        let nonRoutable = this.parentSVG.getNonRoutableNodes();

        let punishedButRoutable;
        if(this.svgObj===undefined) {
            punishedButRoutable = this.parentSVG.getInconvenientNodes();
        } else {
            punishedButRoutable = this.parentSVG.getInconvenientNodes(this.svgObj.id);
        }

        let path = findPath(start, end, nonRoutable, punishedButRoutable, this.gridSize);

        if(path) {
            return this.pathToPolyline(path);
        }


        // if a path was not found, try again but don't take into account the punished and non routable node
        path = findPath(start, end, new Set(), new Set(), this.gridSize);

        if(path) {
            return this.pathToPolyline(path);
        }

        // if the path was still not found, give up and return temporary points
        return this.getTemporaryWirePoints();
    }

    /**
     * generate a set of nodes, that are inconvenient for wiring, but can be used, just are not preferred
     * @return {Set} set of nodes (objects containing x and y coordinates) that are not preferred for wiring
     */
    generateInconvenientNodes() {
        this.inconvenientNodes = new Set();

        let prevPoint;

        this.points.forEach(point => {
            const
                x = this.parentSVG.SVGToGrid(point.x),
                y = this.parentSVG.SVGToGrid(point.y);

            if (prevPoint === undefined) {
                // if the prevPoint is undefined, add the first point
                this.inconvenientNodes.add({x, y});
            } else {
                // else add all the point between the prevPoint (excluded) and point (included)

                if(prevPoint.x === x) {
                    // if the line is horizontal
                    let from = Math.min(prevPoint.y, y);
                    let to = Math.max(prevPoint.y, y);

                    while(from <= to) {
                        this.inconvenientNodes.add({x: x, y: from});
                        from++;
                    }
                } else if(prevPoint.y === y) {
                    // if the line is vertical
                    let from = Math.min(prevPoint.x, x);
                    let to = Math.max(prevPoint.x, x);

                    while(from <= to) {
                        this.inconvenientNodes.add({x: from, y: y});
                        from++;
                    }
                } else {
                    // line is neither horizontal nor vertical, throw an error for better future debugging
                    // console.error("getInconvenientNodes: line between two points is neither horizontal nor vertical");
                }
            }

            // set new prevPoint
            prevPoint = {x, y};
        });
    }
}
