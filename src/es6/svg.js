"use strict";

import * as svgObj from './svgObjects.js'
import * as editorElements from './editorElements.js'
import Logic from './logic.js'
import ContextMenu from './contextMenu.js'
import FloatingMenu from './floatingMenu.js'
import Simulation from './simulation.js'
import Fn from './fn.js'

class ViewBox {
    constructor(left, top, width, height) {
        this.real = { left, top, width, height }

        this.maxZoom = 8;
        this.minZoom = 0.1;

        this.realZoom = 1
        this.leftShift = 0
        this.topShift = 0
    }

    get zoom() {
        return this.realZoom;
    }

    set zoom(value) {
        this.realZoom = Math.max(Math.min(value, this.maxZoom), this.minZoom);
    }

    get width() {
        return this.real.width / this.zoom
    }

    get height() {
        return this.real.height / this.zoom
    }

    get left() {
        return this.real.left - (this.leftShift / this.zoom) + ((this.real.width - this.width) / 2)
    }

    get top() {
        return this.real.top - (this.topShift / this.zoom) + ((this.real.height - this.height) / 2)
    }

    get str() {
        return `${this.left} ${this.top} ${this.width} ${this.height}`
    }

    // transforms horizontal units to the scale and shift of the editor
    transformX(x) {
        return this.left + (x / this.zoom)
    }

    // transforms vertical units to the scale and shift of the editor
    transformY(y) {
        return this.top + (y / this.zoom)
    }
}

export default class Svg {
    constructor(canvas, gridSize) {
        this.$svg = $(canvas);

        this.gridSize = gridSize;

        this.boxes = []; // stores all boxes
        this.wires = []; // stores all wires

        this.simulationEnabled = true
        this.simulation = new Simulation(this); // dummy, will be overwritten on startNewSimulation

        // create the defs element, used for patterns
        this.$defs = $("<defs>");
        this.$svg.prepend(this.$defs);

        // BACKGROUND PATTERN
        let pattern = new svgObj.Pattern("grid", this.gridSize, this.gridSize);

        let patternPoints = new svgObj.PolylinePoints()
            .append(new svgObj.PolylinePoint(0, 0))
            .append(new svgObj.PolylinePoint(this.gridSize, 0))
            .append(new svgObj.PolylinePoint(this.gridSize, this.gridSize));

        pattern.addChild(new svgObj.PolyLine(patternPoints, "#a3a4d2", 2));
        this.addPattern(pattern.get());

        this.background = new svgObj.Rectangle(0, 0, this.width, this.height, "url(#grid)", "none");
        this.appendJQueryObject(this.background.get());
        this.refresh();

        // set the viewbox for future zooming and moving of the canvas
        this.$svg.attr('preserveAspectRatio', 'xMinYMin slice')
        this.viewbox = new ViewBox(0, 0, this.width, this.height)
        this.applyViewbox()

        // CONSTRUCT CONTEXT MENU
        this.contextMenu = new ContextMenu(this);

        // CONSTRUCT FLOATING MENU
        // this.floatingMenu = new FloatingMenu(this);
        this.floatingMenu = new FloatingMenu(this);

        // ALL EVENT CALLBACKS
        let target;
        this.$svg.on('mousedown', event => {
            target = this.getRealTarget(event.target);
            if(target!==undefined) {
                // propagate mousedown to the real target
                target.onMouseDown(event);
            } else {
                // mousedown happened directly on the svg
                this.onMouseDown(event)
            }

            this.hideContextMenu();
            event.preventDefault();
        }).on('mousemove', event => {
            if(target!==undefined) {
                target.onMouseMove(event);
            } else {
                // mousemove happened directly on the svg
                this.onMouseMove(event)
            }

            event.preventDefault();
        }).on('mouseup', (event) => {
            if(target!==undefined) {
                target.onMouseUp(event);
            } else {
                // mouseup happened directly on the svg
                this.onMouseUp(event)
            }

            target = undefined;

            event.preventDefault();
        }).on("contextmenu", event => {
            this.displayContextMenu(event.pageX, event.pageY, this.getRealJQueryTarget(event.target));
            event.preventDefault();
        });

        Fn.addMouseScrollEventListener(canvas, event => {
            // zoom only if the ctrl key is pressed
            if(event.ctrlKey) {
                switch (event.delta) {
                    case 1:
                        this.zoom += 0.1
                        break
                    case -1:
                        this.zoom -= 0.1
                        break
                }
            }

            event.preventDefault()
        })
    }

    get width() {
        return this.$svg.width()
    }

    get height() {
        return this.$svg.height()
    }

    onMouseDown(event) {
        if(event.ctrlKey) {
            this.moveCanvas = {
                left: event.pageX,
                top: event.pageY
            }
        }
    }

    onMouseMove(event) {
        if(this.moveCanvas) {
            let left = event.pageX - this.moveCanvas.left
            let top = event.pageY - this.moveCanvas.top

            this.viewbox.leftShift += left
            this.viewbox.topShift += top
            this.applyViewbox()

            this.moveCanvas = {
                left: event.pageX,
                top: event.pageY
            }
        }
    }

    onMouseUp(event) {
        if(this.moveCanvas) {
            this.moveCanvas = undefined
        }
    }

    applyViewbox() {
        // adjust background
        this.background.addAttr({
            x: this.viewbox.left,
            y: this.viewbox.top,
            width: this.viewbox.width,
            height: this.viewbox.height
        })

        // set the viewBox attribute
        this.$svg.attr('viewBox', this.viewbox.str)
    }

    get zoom() {
        return this.viewbox.zoom
    }

    set zoom(value) {
        this.viewbox.zoom = value
        this.applyViewbox()
    }

    get exportData() {
        this.exportWireIdMap = new Map();
        this.exportWireId = 0;

        let data = {
            // TODO implement gridSize scaling
            // gridSize: this.gridSize,
            boxes: []
        };

        for(let i = 0; i < this.boxes.length; ++i) {
            data.boxes[i] = this.boxes[i].exportData;
        }

        return data;
    }

    importData(data) {
        this.simulationEnabled = false

        // TODO implement gridSize scaling

        // list of wires to be added
        let newWires = new Map();

        for(let i = 0 ; i < data.boxes.length; ++i) {
            // add box
            let box;
            switch (data.boxes[i].category) {
                case "gate":
                    // add new gate (without reloading the SVG, we will reload it once after the import)
                    box = this.newGate(data.boxes[i].name, 0, 0, false);
                    break;
                case "io":
                    switch (data.boxes[i].name) {
                        case "input":
                            // add new input (without reloading the SVG, we will reload it once after the import)
                            box = this.newInput(0, 0, data.boxes[i].isOn, false);
                            break;
                        case "output":
                            // add new output (without reloading the SVG, we will reload it once after the import)
                            box = this.newOutput(0, 0, false);
                            break;
                        default:
                            console.error("Unknown io box name '"+data.boxes[i].name+"'.");
                            break;
                    }
                    break;
                default:
                    console.error("Unknown box category '"+data.boxes[i].category+"'.");
            }

            if (box) {
                // proccess box transforms (translation and rotation)
                let transform = new editorElements.Transform();
                for(let j = 0 ; j < data.boxes[i].transform.items.length ; ++j) {
                    switch (data.boxes[i].transform.items[j].name) {
                        case "translate":
                            transform.setTranslate(
                                data.boxes[i].transform.items[j].args[0],
                                data.boxes[i].transform.items[j].args[1]
                            );
                            break;
                        case "rotate":
                            transform.setRotate(
                                data.boxes[i].transform.items[j].args[0],
                                data.boxes[i].transform.items[j].args[1],
                                data.boxes[i].transform.items[j].args[2]
                            );
                            break;
                        default:
                            console.error("Unknown transform property '"+data.boxes[i].transform.items[j].name+"'.");
                            break;
                    }
                }

                box.setTransform(transform);

                // add all wires to the list of wires to be added
                for(let j = 0 ; j < data.boxes[i].connections.length ; ++j) {
                    // get the artificial wire id
                    let wireId = data.boxes[i].connections[j].wireId;

                    // pass the values got from json into a variable that will be added into the map
                    let value = {
                        index: data.boxes[i].connections[j].index,
                        type: data.boxes[i].connections[j].type,
                        boxId: box.id
                    };

                    // add the value to the map
                    if(newWires.has(wireId)) {
                        // if there already is a wire with this id in the map,
                        // add the value to the end of the array of values
                        let mapValue = newWires.get(wireId);
                        mapValue[mapValue.length] = value;
                        newWires.set(wireId, mapValue);
                    } else {
                        // if there is no wire with this id in the map
                        // add the wire and set the value to be the first element in the array
                        newWires.set(wireId, [value]);
                    }
                }
            }
        }

        // refresh the SVG document (needed for wiring)
        this.refresh();

        // with all boxes added, we can now connect them with wires
        newWires.forEach(item => {
            let connectorIds = [];
            if(item[0] && item[1]) {
                for (const i of [0, 1]) {
                    let box = this.getBoxById(item[i].boxId);

                    connectorIds[i] = box.connectors[item[i].index].id;
                }
            }
            this.newWire(connectorIds[0], connectorIds[1], true);
        });

        // refresh the SVG document
        this.refresh();

        this.simulationEnabled = true;
        for (let box of this.boxes) {
            if (box instanceof editorElements.InputBox) {
                // switch the input box state to the oposit and back, for some reason calling box.refreshState()
                // results in weird unfinished simulation
                // this causes update of the output connector and a start of a new simulation

                // TODO find better solution instead of this workaround
                box.on = !box.on
                box.on = !box.on
            }
        }
    }

    wireCreationHelper(connectorId) {
        if(!this.firstConnectorId) {
            this.firstConnectorId = connectorId;
        } else {
            this.newWire(this.firstConnectorId, connectorId);
            this.firstConnectorId = undefined;
        }
    }

    startNewSimulation(startingConnector, state) {
        if(this.simulationEnabled) {
            this.simulation = new Simulation(this)
            this.simulation.notifyChange(startingConnector.id, state)
            this.simulation.run()
        }
    }

    newGate(name, x, y, refresh = true) {
        return this.newBox(x, y, new editorElements.Gate(this, name, x, y), refresh);
    }

    newInput(x, y, isOn = false, refresh = true) {
        return this.newBox(x, y, new editorElements.InputBox(this, isOn), refresh);
    }

    newOutput(x, y, refresh = true) {
        return this.newBox(x, y, new editorElements.OutputBox(this), refresh);
    }

    newBox(x, y, object, refresh = true) {
        let index = this.boxes.length;

        this.boxes[index] = object;

        // translate the gate if x and y has been specified
        if(x && y) {
            let tr = new editorElements.Transform();
            tr.setTranslate(x, y);

            this.boxes[index].svgObj.addAttr({"transform": tr.get()});
        }

        this.appendElement(this.boxes[index], refresh);

        return this.boxes[index];
    }

    removeBox(gateId) {
        let $gate = $("#"+gateId);

        // find the gate in svg's list of gates
        let gateIndex = -1;
        for(let i = 0 ; i < this.boxes.length ; i++) {
            if(this.boxes[i].svgObj.id===gateId) {
                gateIndex = i;
                break;
            }
        }

        if(gateIndex > -1) {
            // remove all wires connected to this gate
            for(let i = 0; i < this.boxes[gateIndex].connectors.length; i++) {
                this.removeWiresByConnectorId(this.boxes[gateIndex].connectors[i].svgObj.id);
            }

            // remove the gate
            this.boxes.splice(gateIndex, 1);
            $gate.remove();
        } else {
            console.error("Trying to remove an nonexisting gate. (Gate id: "+gateId+")");
        }
    }

    newWire(fromId, toId, refresh = true) {
        // wire must connect two distinct elements
        if (fromId===toId)
            return false

        let connectors = [this.getConnectorById(fromId), this.getConnectorById(toId)]

        // input connectors can be connected to one wire max
        connectors.forEach(conn => {
            if(conn.isInputConnector)
                this.removeWiresByConnectorId(conn.id)
        })
        let index = this.wires.length;
        this.wires[index] = new editorElements.Wire(this, fromId, toId, this.gridSize, refresh);

        connectors.forEach(conn => {
            conn.addWireId(this.wires[index].svgObj.id);
        })

        this.appendElement(this.wires[index], refresh);
        this.moveToBackById(this.wires[index].svgObj.id);

        if(refresh)
            this.wires[index].updateWireState()

        return this.wires[index];
    }

    getWireById(wireId) {
        for (const wire of this.wires) {
            if(wire.svgObj.id === wireId) {
                return wire
            }
        }

        return false;
    }

    getWiresByConnectorId(connectorId) {
        let connector = this.getConnectorById(connectorId);
        return connector.wireIds;
    }

    removeWireById(wireId) {
        for(let i = 0 ; i < this.wires.length ; ++i) {
            if (this.wires[i].svgObj.id === wireId) {

                let connector1 = this.wires[i].startConnector;
                let connector2 = this.wires[i].endConnector;

                connector1.removeWireIdAndUpdate(wireId);
                connector2.removeWireIdAndUpdate(wireId);

                this.wires[i].svgObj.$el.remove();
                this.wires.splice(i, 1);

                break;
            }
        }
    }

    removeWiresByConnectorId(connectorId) {
        let connector = this.getConnectorById(connectorId);

        connector.wireIds.forEach(wireId => {
            let wire = this.getWireById(wireId);

            // get the other connector that is the wire connected to
            let otherConnector = this.getConnectorById(wire.fromId, wire);
            if(otherConnector.svgObj.id===connectorId) {
                otherConnector = this.getConnectorById(wire.toId, wire);
            }

            // delete the wire record from the other connector
            otherConnector.wireIds.delete(wireId);

            // remove the wire representation using jQuery
            $("#" + wireId).remove();

            // if otherConnector is an input connector, set its state to unknown
            if(otherConnector.isInputConnector) {
                otherConnector.setState(Logic.state.unknown);
            }
        });

        // clear the list of wire Ids
        connector.wireIds.clear();
        // if connector is an input connector, set its state to unknown
        if(connector.isInputConnector) {
            connector.setState(Logic.state.unknown);
        }
    }

    getBoxById(gateId) {
        for(let i = 0 ; i < this.boxes.length ; i++) {
            if(this.boxes[i].svgObj.id===gateId) {
                return this.boxes[i];
            }
        }
        return false;
    }

    getBoxByConnectorId(connectorId) {
        for(let i = 0 ; i < this.boxes.length ; i++) {
            if (this.boxes[i].getConnectorById(connectorId) !== undefined) {
                return this.boxes[i];
            }
        }
        return false;
    }

    getConnectorById(connectorId, wire) {
        // the wire variable is used as heuristic,
        // when we know the wire, we have to check only
        // two gates instead of all of them

        if(wire!==undefined) {
            // we know the wire -- we can check only gates at the ends of this wire
            let connector = wire.startBox.getConnectorById(connectorId)
            if (!connector) {
                connector = wire.endBox.getConnectorById(connectorId)
            }
            return connector

        } else {
            // we do not know the wire -- we have to check all gates
            for (const box of this.boxes) {
                const connector = box.getConnectorById(connectorId)
                if(connector) {
                    return connector
                }
            }
        }

        return false
    }

    // if the object, that user interacted with, is not a connector and is in a group
    // return the group jQuery object instead of the original jQuery object
    getRealJQueryTarget(target) {
        let $target = $(target);
        if(!$target.hasClass("connector") && $target.parents('g').length > 0) {
            $target = $target.parent();
            while ($target.prop("tagName") !== "G" && $target.prop("tagName") !== "g") {
                $target = $target.parent();
            }
        }
        return $target;
    }

    // returns the editorElement that user interacted with, the "target" argument is a jQuery element
    getRealTarget(target) {
        // eventy se museji zpracovat tady, protoze v SVG se eventy nepropaguji
        let $target = $(target);

        if($target.hasClass("connector")) {
            // this is a connector, don't traverse groups
            return this.getConnectorById($target.attr('id'));
        } else if($target.parents('g').length > 0) {
            // this element is in a group and it is not a connector

            // traversing up the DOM tree until we find the closest group
            let $parentGroup = $target.parent();
            while ($parentGroup.prop("tagName") !== "G" && $parentGroup.prop("tagName") !== "g") {
                $parentGroup = $parentGroup.parent();
            }

            return this.getBoxById($parentGroup.attr('id'));
        } else if ($target.hasClass("wire")) {
            return this.getWireById($target.attr('id'));
        } else {
            return undefined;
        }
    }

    appendElement(element, refresh = true) {
        this.appendJQueryObject(element.get(), refresh);
    }

    appendJQueryObject(object, refresh = true) {
        this.$svg.append(object);
        if(refresh) {
            this.refresh();
        }
    }

    addPattern(pattern) {
        this.$defs.append(pattern);
        this.refresh();
    }

    // reload the SVG document (needed to display newly appended jQuery object)
    refresh() {
        this.$svg.html(this.$svg.html());
        console.log("SVG document has been reloaded.")
    }

    displayContextMenu(x, y, $target) {
        this.contextMenu.display(x, y, $target);
    }
    hideContextMenu() {
        this.contextMenu.hide();
    }

    // snap a value to a grid
    snapToGrid(value) {
        return Math.round(value / this.gridSize) * this.gridSize;
    }

    // static function for snapping a value to a grid
    static snapToGrid(value, gridSize) {
        return Math.round(value / gridSize) * gridSize;
    }

    // get set of nodes, that cannot be used for wiring at any circumstances
    getNonRoutableNodes() {
        let blockedNodes = new Set();
        // for each box
        for(let i = 0 ; i < this.boxes.length ; ++i) {
            // get the jQuery child with class .rect ("hitbox")
            let rect = $('#' + this.boxes[i].svgObj.id).children(".rect")[0];
            // get the position of the rectangle
            let position = $(rect).position();

            // snap the position to the grid
            position.left = this.snapToGrid(position.left);
            position.top = this.snapToGrid(position.top);

            // for each item in blockedNodes (set of blocked nodes with coordinates relative
            // to the left upper corner of rect; unit used is "one gridSize") convert the coordinates
            // to absolute (multiple with gridSize and add position of rect) and add the result to the set
            for(let item of this.boxes[i].blockedNodes) {
                let absoluteX = position.left + item.x * this.gridSize;
                let absoluteY = position.top + item.y * this.gridSize;

                blockedNodes.add({
                    x: absoluteX,
                    y: absoluteY
                });
            }
        }
        // TODO ensure that this.refresh() is really unnecessary
        // this.refresh();
        // return the set
        return blockedNodes;
    }

    moveToFrontById(objId) {
        this.$svg.append($("#" + objId));
    }

    moveToBackById(objId) {
        $("#" + this.background.id)
            .after($("#" + objId));
    }

    // get set of nodes, that is better not to use for wiring
    getInconvenientNodes(ignoreWireId) {

        let inconvenientNodes = new Set();
        // for each wire
        for(let i = 0 ; i < this.wires.length ; ++i) {
            // (ignore the wire that is specified in the ignoreWireId argument (if any))
            if(ignoreWireId===undefined || ignoreWireId!==this.wires[i].svgObj.id) {
                // cycle through points, for each neigbours add all points that are in between them
                // i.e.: (0,0) and (0,30) are blocking these nodes: (0,0), (0,10), (0,20), (0,30)
                let prevPoint;
                this.wires[i].points.forEach(point => {
                    if (prevPoint === undefined) {
                        // if the prevPoint is undefined, add the first point
                        inconvenientNodes.add({x: point.x, y: point.y});
                    } else {
                        // else add all the point between the prevPoint (excluded) and point (included)

                        if(prevPoint.x===point.x) {
                            // if the line is horizontal
                            let from = Math.min(prevPoint.y, point.y);
                            let to = Math.max(prevPoint.y, point.y);

                            while(from <= to) {
                                inconvenientNodes.add({x: point.x, y: from});
                                from += this.gridSize;
                            }
                        } else if(prevPoint.y===point.y) {
                            // if the line is vertical
                            let from = Math.min(prevPoint.x, point.x);
                            let to = Math.max(prevPoint.x, point.x);

                            while(from <= to) {
                                inconvenientNodes.add({x: from, y: point.y});
                                from += this.gridSize;
                            }
                        } else {
                            // line is neither horizontal nor vertical, throw an error for better future debugging
                            console.error("getInconvenientNodes: line between two points is neither horizontal nor vertical");
                        }
                    }

                    // set new prevPoint
                    prevPoint = {
                        x: point.x,
                        y: point.y
                    };
                });


            }
        }
        // return the set
        return inconvenientNodes;
    }
}
