import * as svgObj from '../svgObjects'

import NetworkElement from './NetworkElement'
import InputConnector from './InputConnector'
import OutputConnector from './OutputConnector'
import Transform from './Transform'

/**
 * Parent class for gates and input and output boxes. Defines all the factors
 * that the boxes have in common (svgObj structure, draggability and rotatability...)
 * @extends NetworkElement
 */
export default class Box extends NetworkElement {
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
