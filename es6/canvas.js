"use strict";

import * as svgObj from './svgObjects.js'
import * as editorElements from './editorElements.js'
import Logic from './logic.js'
import ContextMenu from './contextMenu.js'
import FloatingMenu from './floatingMenu.js'

/**
 * Main class that runs the application
 */
export default class Svg {
    constructor(canvas, gridSize) {
        // the jQuery object representing the SVG element that the whole app runs in
        this.$svg = $(canvas);

        // resolution of the grid
        this.gridSize = gridSize;

        this.boxes = []; // stores all boxes (gates, input, output etc.)
        this.wires = []; // stores all wires

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

        this.background = new svgObj.Rectangle(0, 0, "100%", "100%", "url(#grid)", "none");
        this.appendJQueryObject(this.background.get());
        this.refresh();
        // END background pattern

        // CONSTRUCT CONTEXT MENU
        this.contextMenu = new ContextMenu(this);

        // CONSTRUCT FLOATING MENU
        this.floatingMenu = new FloatingMenu(this);

        // ASSIGN EVENT CALLBACKS
        let target;
        this.$svg.on('mousedown', (event) => {
            target = this.getRealTarget(event.target);
            if(target!==undefined) {
                target.onMouseDown(event);
            }

            this.hideContextMenu();
            event.preventDefault();
        }).on('mousemove', (event) => {
            if(target!==undefined) {
                target.onMouseMove(event);
            }

            event.preventDefault();
        }).on('mouseup', (event) => {
            if(target!==undefined) {
                target.onMouseUp(event);
            }

            target = undefined;
            event.preventDefault();
        }).on("contextmenu", (event) => {
            this.displayContextMenu(event.pageX, event.pageY, this.getRealJQueryTarget(event.target));
            event.preventDefault();
        });
    }

    // helps when creating wires -- if the firstConnectorId is specified, creates a new wire
    // from firstConnectorId to connectorId, else saves the connectorId to the firstConnectorId variable
    wireCreationHelper(connectorId) {
        if(!this.firstConnectorId) {
            this.firstConnectorId = connectorId;
        } else {
            this.newWire(this.firstConnectorId, connectorId);
            this.firstConnectorId = undefined;
        }
    }

    // a very simple singleton to return unique propagation ids
    // (used to detect loops in the network simulation)
    getNewPropagationId() {
        // restart the map storing the propagation history
        // the variable stores a map, the key is connectorId, the value is an array of states
        this.propagationHistory = new Map();

        // return unique propagationId
        if(this.propId===undefined) {
            this.propId = 1;
        } else {
            this.propId++;
        }
        return this.propId;
    }

    // checks for loops, returns the correct state (changes oscillation to the oscillating state etc)
    loopGuard(propagationId, connectorId, state) {

        if(propagationId===this.propId) {
            // propagationHistory stores a map, the key is connectorId, the value is an array of states

            if(this.propagationHistory.has(connectorId)) {
                // get the list of states for the tested connector
                let stateList = this.propagationHistory.get(connectorId);

                // find if the connector was already in the specified state
                let thisStateFound = false;
                for (let i = 0 ; i < stateList.length ; ++i) {
                    if(stateList[i]===state) {
                        thisStateFound = true;
                        break;
                    }
                }

                let lastState = stateList[stateList.length - 1];

                // add the state to the propagation history
                stateList[stateList.length] = state;
                this.propagationHistory.set(connectorId, stateList);

                if(thisStateFound) {
                    // a loop is detected
                    if (lastState!==state) {
                        // the state is changing between iterations of the propagation loop
                        // -> set state to oscillating, don't stop the propagation yet (to spread the "oscillating" state)
                        return {
                            stopPropagation: false,
                            state: Logic.state.oscillating
                        }
                    } else {
                        // the state is not changing between iterations of the propagation loop
                        // -> stop the propagation
                        return {
                            stopPropagation: true,
                            state: state
                        }
                    }
                }
            } else {
                // the connector is not in the propagationHistory yet, add it
                this.propagationHistory.set(connectorId, [state]);
            }
        } else {
            // the propagationId does not match, restart the propagation history
            this.propagationHistory = new Map();
        }

        // else... do nothing (don't stop propagation, don't change the state)
        return {
            stopPropagation: false,
            state: state
        }
    }

    // creates a new gate (name specifies the type ("not", "or", "xnor"...) at given coordinates
    newGate(name, x, y) {
        return this.newBox(x, y, new editorElements.Gate(this, name, x, y));
    }

    // creates a new input box
    newInput(x, y) {
        return this.newBox(x, y, new editorElements.InputBox(this));
    }

    // creates a new output box
    newOutput(x, y) {
        return this.newBox(x, y, new editorElements.OutputBox(this));
    }

    // creates a new box (gate, input, output...)
    newBox(x, y, object) {
        // add the box to the list
        let index = this.boxes.length;
        this.boxes[index] = object;

        // translate the box if x and y has been specified
        if(x && y) {
            let tr = new editorElements.Transform();
            tr.setTranslate(x, y);

            this.boxes[index].svgObj.addAttr({"transform": tr.get()});
        }

        // add the box to the SVG element
        this.appendElement(this.boxes[index]);

        // return the box to allow function chaining
        return this.boxes[index];
    }

    // remove a box by the id
    removeBox(boxId) {
        // get the jQuery object of the box
        let $box = $("#"+boxId);

        // find the gate in svg's list of gates
        let boxIndex = -1;
        for(let i = 0 ; i < this.boxes.length ; i++) {
            if(this.boxes[i].svgObj.id===boxId) {
                boxIndex = i;
                break;
            }
        }

        // check if the box exists (it should)
        if(boxIndex > -1) {
            // remove all wires connected to this box
            for(let i = 0; i < this.boxes[boxIndex].inputs.length; i++) {
                this.removeWiresByConnectorId(this.boxes[boxIndex].inputs[i].svgObj.id);
            }
            for(let i = 0; i < this.boxes[boxIndex].outputs.length; i++) {
                this.removeWiresByConnectorId(this.boxes[boxIndex].outputs[i].svgObj.id);
            }

            // remove the box from the list
            this.boxes.splice(boxIndex, 1);

            // remove the box "physically" from the SVG element
            $box.remove();
        } else {
            // this should not ever happen
            console.error("Trying to remove an nonexisting box. (Box id: "+boxId+")");
        }
    }

    // creates a new wire connecting the connector with id "fromId" with the connector with id "toId"
    newWire(fromId, toId) {
        // return false, if trying to connect a connector to itself
        if(fromId===toId) {
            return false;
        }
        this.fromId = fromId;
        this.toId = toId;

        let fromConnector = this.getConnectorById(fromId);
        let toConnector = this.getConnectorById(toId);

        // input connector can have only one input -> remove all wires before adding this one
        if(fromConnector.isInputConnector) {
            this.removeWiresByConnectorId(fromId);
        }
        if(toConnector.isInputConnector) {
            this.removeWiresByConnectorId(toId);
        }

        // create new wire
        let index = this.wires.length;
        this.wires[index] = new editorElements.Wire(this, fromId, toId, this.gridSize);

        // add references to this wire to both connectors
        fromConnector.addWireId(this.wires[index].svgObj.id);
        toConnector.addWireId(this.wires[index].svgObj.id);

        // add the wire to the SVG element and move it to the back
        this.appendElement(this.wires[index]);
        this.moveToBackById(this.wires[index].svgObj.id);

        // return the object to allow function chaining
        return this.wires[index];
    }

    // returns the wire object based on its id
    getWireById(wireId) {
        let wireCount = this.wires.length;

        for(let i = 0 ; i < wireCount ; i++) {
            if(this.wires[i].svgObj.id===wireId) {
                return this.wires[i];
            }
        }

        return false;
    }

    // returns all wires based on their connector Id
    getWiresByConnectorId(connectorId) {
        let connector = this.getConnectorById(connectorId);
        return connector.wireIds;
    }

    // removes a wire based on its id
    removeWireById(wireId) {
        // find a wire in the list of wires
        for(let i = 0 ; i < this.wires.length ; ++i) {
            if (this.wires[i].svgObj.id === wireId) {

                // get connectors
                let connector1 = this.wires[i].startConnector;
                let connector2 = this.wires[i].endConnector;

                // remove the wire references from the connectors
                connector1.removeWireIdAndUpdate(wireId);
                connector2.removeWireIdAndUpdate(wireId);

                // "physically" remove whe wire from the SVG element
                this.wires[i].svgObj.$el.remove();
                // remove the wire from the list of wires
                this.wires.splice(i, 1);

                break;
            }
        }
    }

    // remove all wires connected to a connector specified by its id
    removeWiresByConnectorId(connectorId) {
        // get the connector by its id
        let connector = this.getConnectorById(connectorId);

        // for each wire id
        connector.wireIds.forEach((wireId) => {
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
                otherConnector.setState(Logic.state.unknown, this.getNewPropagationId());
            }
        });

        // clear the list of wire Ids
        connector.wireIds.clear();
        // if connector is an input connector, set its state to unknown
        if(connector.isInputConnector) {
            connector.setState(Logic.state.unknown, this.getNewPropagationId());
        }
    }

    // get a box (input, output, gate...) by its id
    getBoxById(gateId) {
        for(let i = 0 ; i < this.boxes.length ; i++) {
            if(this.boxes[i].svgObj.id===gateId) {
                return this.boxes[i];
            }
        }
        return false;
    }

    // get a box from his child connector specified by id
    getBoxByConnectorId(connectorId) {
        // go through all boxes and try to find the right connector
        for(let i = 0 ; i < this.boxes.length ; i++) {

            // check inputs, if found, return the box
            for(let j = 0 ; j < this.boxes[i].inputs.length ; j++) {
                if(this.boxes[i].inputs[j].svgObj.id===connectorId) {
                    return this.boxes[i];
                }
            }

            // check outputs, if found, return the box
            for(let j = 0 ; j < this.boxes[i].outputs.length ; j++) {
                if(this.boxes[i].outputs[j].svgObj.id===connectorId) {
                    return this.boxes[i];
                }
            }
        }

        // not found, return false
        return false;
    }

    getConnectorById(connectorId, wire) {
        // the wire variable is used as heuristic,
        // when we know the wire, we have to check only
        // two gates instead of all of them

        if(wire!==undefined) {
            // we know the wire -- we can check only gates at the ends of this wire
            let connector = wire.startBox.getConnectorById(connectorId);
            if (!connector) {
                connector = wire.endBox.getConnectorById(connectorId);
            }
            return connector;

        } else {
            // we do not know the wire -- we have to check all gates
            let gateCount = this.boxes.length;
            for (let i = 0 ; i < gateCount ; i++) {
                let connector = this.boxes[i].getConnectorById(connectorId);
                if(connector) {
                    return connector;
                }
            }
        }
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

    // append an element to the SVG object (simple wrapper for appendJQUeryObject)
    appendElement(element) {
        this.appendJQueryObject(element.get());
    }

    // append an jquery object to the SVG object and reload it
    appendJQueryObject(object) {
        this.$svg.append(object);
        this.refresh();
    }

    // add a new pattern that can be used as a background of an SVG element
    addPattern(pattern) {
        this.$defs.append(pattern);
        this.refresh();
    }

    // reload the SVG document (needed to display newly appended jQuery object)
    refresh() {
        this.$svg.html(this.$svg.html());
        console.log("SVG document has been reloaded.")
    }

    // display the context menu
    displayContextMenu(x, y, $target) {
        this.contextMenu.display(x, y, $target);
    }
    // hide the context menu
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
        this.refresh();
        // return the set
        return blockedNodes;
    }

    // move an element to the front (move it to be the last element)
    moveToFrontById(objId) {
        this.$svg.append($("#" + objId));
    }

    // move an element to the back (move it to be the first element after the background)
    moveToBackById(objId) {
        $("#" + this.background.id)
            .after($("#" + objId));
    }

    // get set of nodes, that are not optimal for wiring (but can be used if necessary)
    getInconvenientNodes(ignoreWireId) {

        let inconvenientNodes = new Set();
        // for each wire
        for(let i = 0 ; i < this.wires.length ; ++i) {
            // (ignore the wire that is specified in the ignoreWireId argument (if any))
            if(ignoreWireId===undefined || ignoreWireId!==this.wires[i].svgObj.id) {
                // cycle through points, for each neigbours add all points that are in between them
                // i.e.: (0,0) and (0,30) are blocking these nodes: (0,0), (0,10), (0,20), (0,30)
                let prevPoint;
                this.wires[i].points.forEach((point) => {
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