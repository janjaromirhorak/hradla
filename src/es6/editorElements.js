import * as svgObj from './svgObjects.js'
import * as Structures from './structuresAndClasses.js'
import Logic from './logic.js'

// mapping logical states to css classes
const stateClasses = {
    on: "stateOn",
    off: "stateOff",
    unknown: "stateUnknown",
    oscillating: "stateOscillating"
};

// helper class used by Transform
class Property {
    constructor(string) {
        if(string!==undefined) {
            this.name = string.replace(/^[ ]*([^(]+).*/, "$1");
            this.args = string.replace(/^[^(]+\((.*)\)/, "$1").split(' ');
        }
    }

    setName(name) {
        this.name = name;
    }

    setArguments(args) {
        this.args = args;
    }

    get() {
        return this.name + "(" + this.args.join(" ") + ")";
    }
}

// used to manipulate the transform argument used in SVG
export class Transform {
    constructor(string) {
        this.items = [];

        if(string!==undefined) {
            let splitItems = string.split(")");

            for (let i = 0 ; i < splitItems.length ; i++) {
                if(splitItems[i]) { // if not empty
                    this.items.push(new Property(splitItems[i] + ")"));
                }
            }
        }
    }

    // returns index or -1
    getIndex(name) {
        for(let i = 0 ; i < this.items.length; i++) {
            if(name === this.items[i].name) {
                return i;
            }
        }

        return -1;
    }

    getTranslate() {
        let args = this.getArguments(this.getIndex("translate"));

        return {
            x: args[0],
            y: args[1]
        }
    }

    getRotate() {
        let args = this.getArguments(this.getIndex("rotate"));

        return {
            deg: args[0],
            centreX: args[1],
            centreY: args[2]
        }
    }

    // sets the translation
    setTranslate(x, y) {
        this.setParameter("translate", [x, y]);
    }

    // sets the rotation
    setRotate(deg, centreX, centreY) {
        this.setParameter("rotate", [deg, centreX, centreY]);
    }

    // add the rotation
    rotateRight(centreX, centreY) {
        if(this.getIndex("rotate")===-1) {
            this.setRotate(90, centreX, centreY);
        } else {
            let newRotation = (parseInt(this.getRotate().deg) + 90) % 360;

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

    // returns the transform properties concatenated
    get() {
        let retVal = "";
        for(let i = 0 ; i < this.items.length ; i++) {
            if(i!==0) {
                retVal += " ";
            }
            retVal += this.items[i].get();
        }
        return retVal;
    }

    getArguments(index) {
        return this.items[index].args;
    }

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

// parent class for all network elements
class NetworkElement {
    constructor(parentSVG) {
        if(!parentSVG) {
            console.error("Parent SVG element has not been defined.");
        }
        this.parentSVG = parentSVG;

        // used to store the svjObject's instance of this element
        this.svgObj = undefined;
    }

    get id() {
        return this.svgObj.id;
    }

    onMouseDown() {
        // empty function to prevent error messages, function is implemented later in the Box class
    }

    onMouseUp() {
        // empty function to prevent error messages, function is implemented later in the Box and Connector classes
    }

    onMouseMove() {
        // empty function to prevent error messages, function is implemented later in the Box class
    }

    get exportData() {
        console.error("'json' getter has not been defined for this element", this);
        return undefined;
    }
}

// parent class for input and output connectors (the things you click on
// when you want to connect elements)
class Connector extends NetworkElement {
    constructor(parentSVG, gridSize, left, top) { // unit of left / top is the size of the grid
        super(parentSVG);

        this.gridSize = gridSize;
        this.connectorSize = gridSize;
        this.connectorOffset = this.connectorSize / 2;

        this.svgObj = new svgObj.Rectangle(
            left * this.gridSize - this.connectorOffset,
            top * this.gridSize - this.connectorOffset,
            this.connectorSize,
            this.connectorSize,
            "none",
            "black"
        );

        this.svgObj.$el.addClass("connector");

        this.stateAttr = false;

        // if a wire can set connector's state
        this.isInputConnector = false;

        this.stateAttr = Logic.state.unknown;
        this.svgObj.addClass(stateClasses.unknown);

        this.wireIds = new Set();
    }

    get isOutputConnector() {
        return !this.isInputConnector;
    }

    static get type() {
        return {
            inputConnector: 0,
            outputConnector: 1
        }
    }

    addWireId(wireId) {
        this.wireIds.add(wireId);
    }

    removeWireId(wireId) {
        this.wireIds.delete(wireId);
    }

    // removes the wire and updates the connector
    removeWireIdAndUpdate(wireId) {
        this.removeWireId(wireId);
    }

    setState(state, propagationId) {
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

        this.stateAttr = state;
    }

    get state() {
        return this.stateAttr;
    }

    get() {
        return this.svgObj;
    }

    onMouseUp() {
        this.parentSVG.wireCreationHelper(this.svgObj.id);
    }
}

export class InputConnector extends Connector {
    constructor(parentSVG, gridSize, left, top) {
        super(parentSVG, gridSize, left, top);


        this.type = Connector.type.inputConnector;
        this.isInputConnector = true;
    }

    setState(state) {
        super.setState(state);

        let gate = this.parentSVG.getBoxByConnectorId(this.svgObj.id);
        gate.refreshState();
    }

    removeWireIdAndUpdate(wireId) {
        super.removeWireIdAndUpdate(wireId);
        this.setState(Logic.state.unknown);
    }

    get state() {
        return super.state;
    }
}

export class OutputConnector extends Connector {
    constructor(parentSVG, gridSize, left, top) {
        super(parentSVG, gridSize, left, top);

        // used to set the wire state during wire initialization based on the output connector state
        this.isOutput = true;

        this.type = Connector.type.outputConnector;
    }

    setState(state) {
        super.setState(state);

        this.wireIds.forEach(wireId => {
            this.parentSVG.getWireById(wireId)
                .setState(state);
        });
    }

    get state() {
        return super.state;
    }
}

// parent class for gates and input and output boxes
class Box extends NetworkElement {
    constructor(parentSVG, name, category, gridWidth, gridHeight) {
        super(parentSVG);

        this.name = name;
        this.category = category;
        this.gridSize = this.parentSVG.gridSize;

        this.url = "img/" + this.category + "/" + this.name + ".svg";

        this.connectors = [];

        this.svgObj = new svgObj.Group();

        this.width = gridWidth * this.gridSize;
        this.height = gridHeight * this.gridSize;

        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;

        // transparent background rectangle
        let rectangle = new svgObj.Rectangle(0, 0, this.width, this.height, "none", "none");
        rectangle.$el.addClass('rect');
        this.svgObj.addChild(rectangle);
        // image of the element
        this.image = new svgObj.SvgImage(0, 0, this.width, this.height, this.url);
        this.svgObj.addChild(this.image);

        // add draggability and rotatability
        this.svgObj.draggable(true);
        this.svgObj.rotatable(true);

        // add type="gate", used in special callbacks in contextmenu
        this.svgObj.addAttr({"type": category});

        this.svgObj.$el.addClass("box");
        this.svgObj.$el.addClass(category);

        this.generateBlockNodes();
    }

    get exportData() {
        let connections = [];

        // go through all connectors
        for (let i = 0 ; i < this.connectors.length ; ++i) {
            // for all connector that has at least one wire connected
            if(this.connectors[i].wireIds.size > 0) {
                // go through each its wire id
                this.connectors[i].wireIds.forEach(item => {
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
                        index: i,
                        type: this.connectors[i].type,
                        wireId: thisWireId
                    };
                });
            }
        }

        return {
            name: this.name,
            // id: this.svgObj.id,
            category: this.category,
            transform: this.getTransform(),
            connections: connections
        };
    }

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

    refreshState() {
        // empty function, redefined in inherited elements
        // refreshState takes input connector values and sets output values accordingly
        console.warn("Calling the virtual function refreshState has no effect.");
    }

    // usage: changeImage("abc") changes image url to image-abc.svg
    //        changeImage() changes image url to the default one (image.svg)
    changeImage(suffix) {
        if(suffix === undefined || suffix === "") {
            suffix = "";
        } else {
            suffix = "-" + suffix;
        }
        this.url = "img/" + this.category + "/" + this.name + suffix + ".svg";

        this.image.changeUrl(this.url);
    }

    // returns a jQuery object
    get() {
        return this.svgObj.get();
    }

    removeBlockedNode(x, y) {
        for(let item of this.blockedNodes) {
            if(item.x===x && item.y===y) {
                this.blockedNodes.delete(item);
                break;
            }
        }
    }

    rotateBlockedNodesRight() {
        if(this.rotation===undefined || this.rotation===4) {
            this.rotation = 0;
        }
        this.rotation++;

        if(this.rotation === 1 || this.rotation === 3) {
            let newBlockedNodes = new Set();
            this.blockedNodes.forEach(item => {
                newBlockedNodes.add({
                    x: Math.abs(item.y - this.gridHeight),
                    y: item.x
                });
            });
            this.blockedNodes = newBlockedNodes;
        } else if(this.rotation === 2 || this.rotation === 4) {
            let newBlockedNodes = new Set();
            this.blockedNodes.forEach(item => {
                newBlockedNodes.add({
                    x: Math.abs(item.y - this.gridWidth),
                    y: item.x
                });
            });
            this.blockedNodes = newBlockedNodes;
        }
    }

    addConnector(left, top, connectorType) {
        let index = this.connectors.length;
        if(connectorType===Connector.type.inputConnector) {
            this.connectors[index] = new InputConnector(this.parentSVG, this.gridSize, left, top);
        } else {
            this.connectors[index] = new OutputConnector(this.parentSVG, this.gridSize, left, top);
        }
        this.svgObj.addChild(this.connectors[index].get());

        this.removeBlockedNode(left, top);
    }

    // returns the connector object based on its id
    getConnectorById(connectorId) {
        for(let i = 0 ; i < this.connectors.length ; i++) {
            if(this.connectors[i].id===connectorId) {
                return this.connectors[i];
            }
        }
        // if connector not found, return undefined
        return undefined;
    }

    getTransform() {
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
        return transform;
    }

    setTransform(transform) {
        this.svgObj.addAttr({"transform": transform.get()});
    }

    onMouseDown(event) {
        this.mouseLeft = false;
        if(event.which === 1) {
            this.mouseLeft = true;
            this.onMouseDownLeft(event);

            // move the DOM element to front
            this.parentSVG.moveToFrontById(this.svgObj.id);
        }
    }

    onMouseDownLeft(event) {
        this.mouseMoved = false;

        let transform = this.getTransform();

        // save the current item position into a variable
        let currentPosition = transform.getTranslate();

        // calculate mouse offset from the object origin
        this.offset = {
            x: event.pageX - currentPosition.x,
            y: event.pageY - currentPosition.y
        };
    }

    onMouseMove(event) {
        if(this.mouseLeft) {
            this.mouseMoved = true;

            let left = event.pageX - this.offset.x;
            let top = event.pageY - this.offset.y;

            let transform = this.getTransform();
            transform.setTranslate(left, top);

            this.setTransform(transform);

            this.updateWires(true);
        }
    }

    onMouseUp(event) {
        if(event.which === 1) {
            if(this.mouseMoved) {
                this.onDrop(event);
            } else {
                this.onClick();
            }
        } else if (event.which === 2 ) {
            this.onClickMiddle();
        }
    }

    onDrop(event) {
        let left = event.pageX - this.offset.x;
        let top = event.pageY - this.offset.y;

        left = this.parentSVG.snapToGrid(left);
        top = this.parentSVG.snapToGrid(top);

        let transform = this.getTransform();
        transform.setTranslate(left, top);

        this.setTransform(transform);

        this.updateWires();
    }

    onClick() {
        // empty function, will be redefined in InputBox
    }

    onClickMiddle() {
        let transform = this.getTransform();

        let rect = this.svgObj.$el[0].getBoundingClientRect();

        let centreX = Math.round(rect.width / 2);
        let centreY = Math.round(rect.height / 2);

        centreX -= centreX % this.gridSize;
        centreY -= centreY % this.gridSize;

        transform.rotateRight(
            centreX,
            centreY
        );

        this.svgObj.addAttr({"transform": transform.get()});

        this.rotateBlockedNodesRight();

        this.updateWires();
    }

    // updates all wires connected to this box
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

export class InputBox extends Box {
    constructor(parentSVG, isOn = false) {
        const width = 7;
        const height = 4;

        super(parentSVG, "input", "io", width, height);

        this.addConnector(width, height / 2, Connector.type.outputConnector);

        this.on = isOn;
    }

    get exportData() {
        let data = super.exportData;
        data.isOn = this.isOn;
        return data;
    }

    generateBlockNodes() {
        super.generateBlockNodes(0, 1, 1, 0);
    }

    refreshState() {
        // call the on setter again (to refresh the state of the connected wires)
        this.parentSVG.startNewSimulation(this.connectors[0], this.connectors[0].state)
    }

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

    get on() {
        return this.isOn;
    }

    onClick() {
        this.on = !this.on;
    }
}

export class OutputBox extends Box {
    constructor(parentSVG) {
        const height = 4;
        const width = 5;

        super(parentSVG, "output", "io", width, height);

        this.addConnector(0, height / 2, Connector.type.inputConnector);
    }

    refreshState() {
        this.setState(this.connectors[0].state);
    }

    setState(state) {
        switch (state) {
            case Logic.state.on:
                this.changeImage("on");
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
        super.generateBlockNodes(0, 0, 0, 1);
    }
}

export class Gate extends Box {
    constructor(parentSVG, name) {
        const width = 9;
        const height = 4;

        super(parentSVG, name, "gate", width, height);

        // output
        this.addConnector(width, height / 2, Connector.type.outputConnector);

        if(this.name==="not") {
            // input
            this.addConnector(0, height / 2, Connector.type.inputConnector);
        } else {
            // input
            this.addConnector(0, height / 4, Connector.type.inputConnector);
            this.addConnector(0, height / (4/3), Connector.type.inputConnector);

            // add one blockedNode between the inputs (for better looking wiring)
            // and regenerate blocked nodes
            this.generateBlockNodes({
                x: 0,
                y: height / 2
            });
        }

        this.refreshState();
    }

    generateBlockNodes(specialNode) {
        if(specialNode!==undefined) {
            super.generateBlockNodes(0, 1, 0, 1, specialNode);
        } else {
            super.generateBlockNodes(0, 1, 0, 1);
        }
    }

    refreshState() {
        let state = Logic.state.unknown
        switch (this.name) {
            case "and":
                state =  Logic.and(this.connectors[1].state, this.connectors[2].state)
                break;
            case "nand":
                state =  Logic.nand(this.connectors[1].state, this.connectors[2].state)
                break;
            case "nor":
                state =  Logic.nor(this.connectors[1].state, this.connectors[2].state)
                break;
            case "not":
                state =  Logic.not(this.connectors[1].state)
                break;
            case "or":
                state =  Logic.or(this.connectors[1].state, this.connectors[2].state)
                break;
            case "xnor":
                state =  Logic.xnor(this.connectors[1].state, this.connectors[2].state)
                break;
            case "xor":
                state =  Logic.xor(this.connectors[1].state, this.connectors[2].state)
                break;
        }
        // set the connector state
        this.connectors[0].setState(state)
        // notify the simulator about this change
        this.parentSVG.simulator.notifyChange(this.connectors[0].id, state)
    }
}

export class Wire extends NetworkElement {
    constructor(parentSVG, fromId, toId, gridSize) {
        // small todo: rework start... end... to arrays? (not important)

        super(parentSVG);

        this.gridSize = gridSize;

        this.fromId = fromId;
        this.toId = toId;

        this.startBox = this.parentSVG.getBoxByConnectorId(fromId);
        this.endBox = this.parentSVG.getBoxByConnectorId(toId);

        this.boxes = [this.startBox, this.endBox]

        this.startConnector = this.parentSVG.getConnectorById(fromId);
        this.endConnector = this.parentSVG.getConnectorById(toId);

        this.connectors = [this.startConnector, this.endConnector]

        this.routeWire();

        this.stateAttr = Logic.state.unknown;

        for (let connector of this.connectors) {
            if(connector.isOutput) {
                this.setState(connector.state);
            }
        }

        this.svgObj.$el.addClass("wire");
    }

    get exportData() {
        return {
            fromId: this.fromId,
            toId: this.toId
        };
    }

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

        this.stateAttr = state;
    }

    get state() {
        return this.stateAttr;
    }

    updateWireState() {
        this.boxes.forEach(box => {
            box.refreshState()
        })
    }

    get() {
        return this.svgObj.get();
    }

    getTemporaryWirePoints() {
        let points = new svgObj.PolylinePoints();
        points.append(new svgObj.PolylinePoint(this.wireStart.x, this.wireStart.y));
        points.append(new svgObj.PolylinePoint(this.wireEnd.x, this.wireEnd.y));
        return points;
    }

    temporaryWire() {
        this.wireStart = this.getCoordinates(this.startConnector, false);
        this.wireEnd = this.getCoordinates(this.endConnector, false);

        this.setWirePath(this.getTemporaryWirePoints());

        // this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);
        // this.svgObj.addClass(stateClasses.unknown);
    }

    routeWire(snapToGrid = true) {
        this.wireStart = this.getCoordinates(this.startConnector, snapToGrid);
        this.wireEnd = this.getCoordinates(this.endConnector, snapToGrid);

        this.points = this.aStar(
            {
                x: this.wireStart.x / this.gridSize,
                y: this.wireStart.y / this.gridSize
            },
            {
                x: this.wireEnd.x / this.gridSize,
                y: this.wireEnd.y / this.gridSize
            });

        this.setWirePath(this.points);

        this.updateWireState();
    }

    setWirePath(points) {
        // set the line
        if(this.svgObj!==undefined) {
            this.svgObj.updatePoints(points);
        } else {
            this.svgObj = new svgObj.PolyLine(points, "#8b8b8b", 2);
        }

        this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);
        this.svgObj.addClass(stateClasses.unknown);

        this.svgObj.addAttr({
            fromId: this.fromId,
            toId: this.toId
        });
    }



    // implementation based on this pseudocode: https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode
    aStar(start, end) {
        // number of nodes, that can be opened at once
        // once is this limit exceeded, aStar will fail and getTemporaryWirePoints will be used instead
        const maxNodeLimit = 50000;

        let closedNodes = new Set();
        let openNodes = new Set();
        openNodes.add(start);

        let cameFrom = new Map();

        // default value: infinity
        let gScore = new Structures.MapWithDefaultValue(Infinity);
        gScore.set(start, 0);

        // default value: infinity
        let fScore = new Structures.MapWithDefaultValue(Infinity);
        fScore.set(start, Wire.manhattanDistance(start, end));

        let nonRoutable = this.parentSVG.getNonRoutableNodes();
        let punishedButRoutable;
        if(this.svgObj===undefined) {
            punishedButRoutable = this.parentSVG.getInconvenientNodes();
        } else {
            punishedButRoutable = this.parentSVG.getInconvenientNodes(this.svgObj.id);
        }

        while (openNodes.size > 0) {
            let currentNode;
            let currentNodeFScore;

            // find the value from openNodes that has the lowest fScore
            // (can be implemented effectively using min-heap data structure (maybe todo sometime)?)
            openNodes.forEach(node => {
                if(!currentNode || fScore.get(node) < currentNodeFScore) {
                    currentNode = node;
                    currentNodeFScore = fScore.get(currentNode)
                }
            });

            if(svgObj.PolylinePoint.equals(currentNode, end)) {
                return this.reconstructPath(cameFrom, currentNode);
            }

            openNodes.delete(currentNode);
            closedNodes.add(currentNode);

            // the farthest points accessible without avoiding obstacles in every direction
            // (but max 50 in each direction)
            for(let direction = 0 ; direction < 4 ; direction++) {
                let newPoint = Wire.movePoint(currentNode, direction);
                for(let i = 0 ; i < 50 ; i++) {
                    // if newPoint is in the set of non routable points,
                    // don't add it and stop proceeding in this direction
                    if(Wire.setHasThisPoint(nonRoutable, this.scalePointToGrid(newPoint))) {
                        break;
                    }

                    // skip this node, if it has been already closed
                    // or if it is on the list of non routable nodes
                    if (closedNodes.has(newPoint)) {
                        continue;
                    }

                    if (!openNodes.has(newPoint).y) {
                        openNodes.add(newPoint);
                    }

                    // calculate possible GScore by adding 1 to the score of the node we came from
                    // (we prioritize to minimize the number of nodes and not the distance,
                    //  so we are adding 1 on all nodes, even if the euclidean / mannhatan distance may vary)
                    let increment = 1;
                    if(i!==0) {
                        increment = 2;
                    }
                    let possibleGScore = gScore.get(currentNode) + increment;

                    if(Wire.setHasThisPoint(punishedButRoutable, this.scalePointToGrid(newPoint))) {
                        // if the node is in the set of punished node, punish it by adding to the GScore
                        possibleGScore += 1;
                    }

                    if (possibleGScore >= gScore.get(newPoint)) {
                        continue;
                    }

                    cameFrom.set(newPoint, currentNode);
                    gScore.set(newPoint, possibleGScore);
                    fScore.set(newPoint, possibleGScore + Wire.manhattanDistance(newPoint, end));

                    // if newPoint is in the set of punished but routable points,
                    // add it but stop proceeding in this direction
                    if(Wire.setHasThisPoint(punishedButRoutable, this.scalePointToGrid(newPoint))) {
                        break;
                    }

                    // move to the next point in the direciton
                    newPoint = Wire.movePoint(newPoint, direction);
                }
            }

            if(openNodes.size > maxNodeLimit) {
                break;
            }
        }
        // if we got here, the path does not exist -> let's use temporary path ignoring all colisions
        return this.getTemporaryWirePoints();
    }
    static movePoint(point, direction) {
        switch (direction) {
            case 0: // up
                return {
                    x: point.x,
                    y: point.y - 1
                };
            case 1: // right
                return {
                    x: point.x + 1,
                    y: point.y
                };
            case 2: // down
                return {
                    x: point.x,
                    y: point.y + 1
                };
            case 3: // left
                return {
                    x: point.x - 1,
                    y: point.y
                };
        }
    }
    scalePointToGrid(point) {
        return {
            x: point.x * this.gridSize,
            y: point.y * this.gridSize
        }
    }

    reconstructPath(cameFrom, currentNode) {
        let totalPath = new svgObj.PolylinePoints();
        totalPath.append(new svgObj.PolylinePoint(currentNode.x * this.gridSize, currentNode.y * this.gridSize));

        while (cameFrom.has(currentNode)) {
            currentNode = cameFrom.get(currentNode);
            totalPath.append(new svgObj.PolylinePoint(currentNode.x * this.gridSize, currentNode.y * this.gridSize));
        }

        return totalPath;
    }

    static manhattanDistance(a, b) {
        // Manhattan geometry
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    static setHasThisPoint(set, point) {
        for (let item of set) {
            if(item.x === point.x && item.y === point.y) {
                return true;
            }
        }
        return false;
    }

    getCoordinates(connector, snapToGrid = true) {
        // connector.svgObj.id has to be called, else the getCoordinates does not work on the first call in Firefox 55
        let dummy = connector.svgObj.id;

        let $connector = connector.svgObj.$el;

        let position = $connector.position();
        let width = $connector.attr("width");
        let height = $connector.attr("height");

        let x = position.left + width / 2;
        let y = position.top + height / 2;
        if(snapToGrid) {
            x = this.parentSVG.snapToGrid(x);
            y = this.parentSVG.snapToGrid(y);
        }

        return {
            x: x,
            y: y
        };
    }
}
