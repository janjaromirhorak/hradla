"use strict";

import * as svgObj from './svgObjects'
import * as editorElements from './editorElements'
import Logic from './logic'
import ContextMenu from './contextMenu'
import FloatingMenu from './floatingMenu'
import Simulation from './simulation'
import { addMouseScrollEventListener, manhattanDistance } from './helperFunctions'
import Tutorial from './tutorial';
import ViewBox from './viewbox'

import { PriorityQueue } from 'libstl'; // note: imported from a node module

const
    ctrlKey = 17,
    cmdKey = 91;

/** @module Canvas */
/**
 * Main class of the application. It represents an instance of the whole editor and holds
 * references to all its elements.
 */
export default class Canvas {
    /**
     * Initialize the Svg class
     * @param {string} canvas   query selector of the SVG element, that will contain all SVG content of the application
     * @param {number} gridSize initial size of the grid in SVG pixels
     */
    constructor(canvas, gridSize) {
        /**
         * jQuery element for the SVG document
         */
        this.$svg = $(canvas);

        /**
         * space between grid lines in SVG pixels
         * @type {number}
         */
        this.gridSize = gridSize;

        /**
         * Array of all boxes (instances of objects derived from editorElements.Box) used on Canvas
         * @type {Array}
         */
        this.boxes = []; // stores all boxes

        /**
         * Array of all wires (instances of editorElements.Wire) used on Canvas
         * @type {Array}
         */
        this.wires = []; // stores all wires

        this.simulationEnabled = true
        this.simulation = new Simulation(this); // dummy, will be overwritten on startNewSimulation

        /**
         * distance from the left top corner to the first element in the imported network
         * and distance from the left top corner to the imported black box _in grid pixels_
         * @type {number}
         */
        this.leftTopPadding = 4;

        // create the defs element, used for patterns
        this.$defs = $("<defs>");
        this.$svg.prepend(this.$defs);

        // BACKGROUND PATTERN
        let pattern = new svgObj.Pattern("grid", this.gridSize, this.gridSize);

        let patternPoints = new svgObj.PolylinePoints()
            .append(new svgObj.PolylinePoint(0, 0))
            .append(new svgObj.PolylinePoint(this.gridSize, 0))
            .append(new svgObj.PolylinePoint(this.gridSize, this.gridSize));

        pattern.addChild(new svgObj.PolyLine(patternPoints, 2, "#a3a4d2"));
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
        this.floatingMenu = new FloatingMenu(this);

        let target;

        // ALL EVENT CALLBACKS
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
        }).on('mouseup', event => {
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
        })

        $(document).on('keydown', event => {
            this.onKeyDown(event);
        }).on("keyup", event => {
            this.onKeyUp(event);
        });

        // update the viewbox on window resize
        $(window).on('resize', () => {
            this.viewbox.newDimensions(this.width, this.height);
            this.applyViewbox();
        });

        addMouseScrollEventListener(canvas, event => {
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

        /**
         * property containing an instance of [Tutorial](./module-Tutorial.html), if there is any
         * @type {Tutorial}
         */
        this.tutorial;

        // check if the user visits for the first time, if so, start the tutorial
        try {
            if(!localStorage.userHasVisited) {
                this.startTutorial();
            }
        } catch (e) {
            console.warn(e);
        }
    }

    /**
     * Get the width of the main SVG element
     * @return {number} width of the SVG element in pixels
     */
    get width() {
        return this.$svg.width()
    }

    /**
     * Get the height of the main SVG element
     * @return {number} height of the SVG element in pixels
     */
    get height() {
        return this.$svg.height()
    }

    /**
     * Process all keydown events that are connected to Canvas
     * @param  {jquery.KeyboardEvent} event KeyboardEvent generated by a listener
     */
    onKeyDown(event) {
        if(event.keyCode === ctrlKey || event.keyCode === cmdKey) {
            this.$svg.addClass('grabbable');
        }
    }

    /**
     * Process all keyup events that are connected to Canvas
     * @param  {jquery.KeyboardEvent} event KeyboardEvent generated by a listener
     */
    onKeyUp(event) {
        if(event.keyCode === ctrlKey || event.keyCode === cmdKey) {
            this.$svg.removeClass('grabbable');
        }
    }

    /**
     * Process all mousedown events that are happening directly on the Canvas
     * @param  {jquery.MouseEvent} event MouseEvent generated by a listener
     */
    onMouseDown(event) {
        // middle mouse or left mouse + ctrl moves the canvas
        if(event.which === 2 || (event.which === 1 && event.ctrlKey)) {
            this.$svg.addClass('grabbed');
            this.moveCanvas = {
                left: event.pageX,
                top: event.pageY
            }
        }
    }

    /**
     * Process all mousemove events that are happening directly on the Canvas
     * @param  {jquery.MouseEvent} event MouseEvent generated by a listener
     */
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

    /**
     * Process all mouseup events that are happening directly on the Canvas
     */
    onMouseUp() {
        if(this.moveCanvas) {
            this.$svg.removeClass('grabbed');
            this.moveCanvas = undefined

            // if tutorial exists, call tutorial callback
            if(this.tutorial) {
                this.tutorial.onCanvasMoved();
            }
        }
    }

    /**
     * Set the viewBox attribute of the SVG element and size and position attributes
     * of the rectangle with the background grid to match the values in this.viewbox
     */
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

    /**
     * Get the current zoom multiplier of the canvas
     * @return {number}
     */
    get zoom() {
        return this.viewbox.zoom
    }

    /**
     * Set the zoom multiplier of the canvas.
     * I sets the viewbox zoom and then applies the new value by calling this.applyViewbox()
     * @param  {number} value set the zoom to this value
     */
    set zoom(value) {
        this.viewbox.zoom = value
        this.applyViewbox()

        // if tutorial exists, call tutorial callback
        if(this.tutorial) {
            this.tutorial.onCanvasZoomed();
        }
    }

    /**
     * start the tutorial
     */
    startTutorial() {
        // instantiate the tutorial
        this.tutorial = new Tutorial(this, () => {
            // set userHasVisited to true when user closes (or finishes) the tutorial
            localStorage.userHasVisited = true;

            // unset the this.tutorial property
            this.tutorial = undefined;
        });

        // start the tutorial
        this.tutorial.start();
    }

    /**
     * Generate an object containing export data for the Canvas and all elements.
     * Data from this function should cover all important information needed to import the
     * network in a different session.
     * @return {object} object containing infomration about the network
     */
    get exportData() {
        this.exportWireIdMap = new Map();
        this.exportWireId = 0;

        let data = {
            boxes: []
        };

        for (const box of this.boxes) {
            data.boxes.push(box.exportData)
        }

        return data;
    }

    /**
     * Recreate a logic network from the data provided
     * @param  {object} data object containing information about the imported network
     * @param  {number} [x]  horizontal position of the left top corner of the network in grid pixels
     * @param  {number} [y]  vertical position of the left top corner of the network in grid pixels
     */
    importData(data, x, y) {
        return new Promise((resolve, reject) => {
            // if the x or y is undefined, set it to leftTopPadding instead
            // (cannot use x || leftTopPadding because of 0)

            x = x!==undefined ? x : this.leftTopPadding
            y = y!==undefined ? y : this.leftTopPadding

            this.simulationEnabled = false

            // list of wires to be added
            let newWires = new Map();

            // find the leftmost and topmost coordinate of any box, save them to leftTopCorner
            let leftTopCorner;

            for (const boxData of data.boxes) {
                for(const transformInfo of boxData.transform.items) {
                    if(transformInfo.name === "translate") {
                        if(leftTopCorner) {
                            leftTopCorner = {
                                x: Math.min(leftTopCorner.x, transformInfo.args[0]),
                                y: Math.min(leftTopCorner.y, transformInfo.args[1])
                            }
                        } else {
                            leftTopCorner = {
                                x: transformInfo.args[0],
                                y: transformInfo.args[1]
                            }
                        }
                    }
                }
            }

            for(let boxData of data.boxes) {
                // add box
                let box;
                switch (boxData.category) {
                    case "gate":
                        // add new gate (without reloading the SVG, we will reload it once after the import)
                        box = this.newGate(boxData.name, 0, 0, false);
                        break;
                    case "other":
                        switch (boxData.name) {
                            case "input":
                                // add new input (without reloading the SVG, we will reload it once after the import)
                                box = this.newInput(0, 0, boxData.isOn, false);
                                break;
                            case "output":
                                // add new output (without reloading the SVG, we will reload it once after the import)
                                box = this.newOutput(0, 0, false);
                                break;
                            default:
                                reject("Unknown io box name '"+boxData.name+"'.");
                                break;
                        }
                        break;
                    case "blackbox":
                        box = this.newBlackbox(boxData.inputs, boxData.outputs, boxData.table, boxData.name, 0, 0, false)
                        break;
                    default:
                        reject("Unknown box category '"+boxData.category+"'.");
                }

                if (box) {
                    // proccess box transforms (translation and rotation)
                    let transform = new editorElements.Transform();

                    for(let j = 0 ; j < boxData.transform.items.length ; ++j) {
                        switch (boxData.transform.items[j].name) {
                            case "translate":
                                transform.setTranslate(
                                    boxData.transform.items[j].args[0]
                                        - leftTopCorner.x // make it the relative distance from the leftmost element
                                        + x // apply the position
                                        ,

                                    boxData.transform.items[j].args[1]
                                        - leftTopCorner.y // make it the relative distance from the topmost element
                                        + y // apply the position
                                );
                                break;
                            case "rotate":
                                transform.setRotate(
                                    boxData.transform.items[j].args[0],
                                    boxData.transform.items[j].args[1],
                                    boxData.transform.items[j].args[2]
                                );
                                break;
                            default:
                                reject("Unknown transform property '"+boxData.transform.items[j].name+"'.");
                                break;
                        }
                    }

                    transform.toSVGPixels(this);
                    box.setTransform(transform);

                    // add all wires to the list of wires to be added
                    for(let j = 0 ; j < boxData.connections.length ; ++j) {
                        // get the artificial wire id
                        let wireId = boxData.connections[j].wireId;

                        // pass the values got from json into a variable that will be added into the map
                        let value = {
                            index: boxData.connections[j].index,
                            boxId: box.id
                        };

                        // add the value to the map
                        if(newWires.has(wireId)) {
                            // if there already is a wire with this id in the map,
                            // add the value to the end of the array of values
                            let mapValue = newWires.get(wireId);
                            mapValue.push(value);
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

            // priority queue for the new wires, priority being (1 / manhattanDistance) between the conenctors, higher is better
            let wireQueue = new PriorityQueue();

            // get all ids for lal the
            for (const wireInfo of newWires.values()) {
                let connectorIds = [];

                // create an array [connector1Id, connector2Id]
                for (const {boxId, index} of wireInfo) {
                    connectorIds.push(
                        this.getBoxById(boxId).connectors[index].id
                    )
                }

                // create and array [{x, y}, {x, y}] containing positions for connectors 1 and 2
                const connectorsPositions = connectorIds.map(
                    connectorId => this.getConnectorPosition(
                        this.getConnectorById(connectorId),
                        true)
                    )

                let wire = this.newWire(...connectorIds, false, false);

                // get the manhattan distance between these two connectors
                const distance = manhattanDistance(...connectorsPositions);

                // add connectorids to the priority queue
                wireQueue.enqueue(wire, 1 / distance);
            }

            if (window.Worker) {
                let wirePoints = [];
                let wireReferences = [];

                // convert the queue to an array (this is needed by the web worker)
                while(!wireQueue.isEmpty()) {
                    const wire = wireQueue.dequeue();

                    let wireStart = this.getConnectorPosition(wire.startConnector, true);
                    let wireEnd = this.getConnectorPosition(wire.endConnector, true);

                    wirePoints.push([
                        {
                            x: wireStart.x / this.gridSize,
                            y: wireStart.y / this.gridSize
                        },
                        {
                            x: wireEnd.x / this.gridSize,
                            y: wireEnd.y / this.gridSize
                        }
                    ])

                    wireReferences.push(wire);
                }

                // [routeWorkerFileName] replaced in gulpfile depending on devel / prod build
                let myWorker = new Worker("js/[routeWorkerFileName]");

                myWorker.onmessage = (event) => {
                    const {paths} = event.data
                    // iterate wireReferences and paths synchronously
                    wireReferences.forEach((wire, key) => {
                        wire.setWirePath(wire.pathToPolyline(paths[key]))
                        wire.updateWireState();
                    })
                }

                const message = {
                    wires: wirePoints,
                    nonRoutableNodes: this.getNonRoutableNodes(),
                    inconvenientNodes: this.getInconvenientNodes()
                }

                myWorker.postMessage(message)

            } else {
                // web worker is not supported: use an interval to make the import a bit slower
                // by dividing it into chunks, so the browser window is not entirely frozen when the wiring is happening

                const wiresToBeRoutedAtOnce = 10;
                const delayBetweenIterations = 200;

                // add wires in the order from short to long
                let wirePlacingInterval = window.setInterval(() => {
                    if(!wireQueue.isEmpty()) {
                        for(let i = 0; i < wiresToBeRoutedAtOnce; ++i) {
                            if(wireQueue.isEmpty()) {
                                break;
                            }

                            const wire = wireQueue.dequeue();
                            wire.routeWire(true, false);
                            wire.updateWireState();
                        }
                    } else {
                        console.log("finished");
                        clearInterval(wirePlacingInterval);
                    }
                }, delayBetweenIterations)
            }

            // refresh the SVG document
            this.refresh();

            this.simulationEnabled = true;
            for (let box of this.boxes) {
                if (box instanceof editorElements.InputBox) {
                    // switch the input box state to the opposite and back:
                    // for some reason calling box.refreshState()
                    // results in weird unfinished simulation
                    // this causes update of the output connector and thus a start of a new simulation

                    // TODO find better solution instead of this workaround, if there is any
                    box.on = !box.on
                    box.on = !box.on
                }
            }

            resolve()
        })
    }

    /**
     * When user clicks on a connector, remember it until they click on some other connector.
     * Than call newWire with the last two connectors ids as arguments.
     * @param  {string} connectorId id of the connector that the user clicked on
     */
    wireCreationHelper(connectorId) {
        if(!this.firstConnectorId) {
            this.firstConnectorId = connectorId;
        } else {
            this.newWire(this.firstConnectorId, connectorId);
            this.firstConnectorId = undefined;
        }
    }

    /**
     * Run a logic simulation from the startingConnector.
     * This refreshes the states of all elements in the network whose inputs are
     * directly (or by transition) connected to startingConnector's output
     * @param  {OutputConnector} startingConnector run simulation from this output connector
     * @param  {Logic.state} state new state of the startingConnector
     */
    startNewSimulation(startingConnector, state) {
        if(this.simulationEnabled) {
            this.simulation = new Simulation(this)
            this.simulation.notifyChange(startingConnector.id, state)
            this.simulation.run()
        }
    }

    /**
     * Create a new gate on the specified position
     * @param  {string}  name           type of the gate (and, or ...)
     * @param  {number}  x              horizontal position of the gate in SVG pixels
     * @param  {number}  y              vertical position of the gate in SVG pixels
     * @param  {boolean} [refresh=true] if true, this.refresh() will be called after adding the gate
     * @return {editorElements.Gate}    instance of Gate that has been newly added
     */
    newGate(name, x, y, refresh = true) {
        return this.newBox(x, y, new editorElements.Gate(this, name, x, y), refresh);
    }

    /**
     * Create an input box on the specified position
     * @param  {number}  x              horizontal position of the gate in SVG pixels
     * @param  {number}  y              vertical position of the gate in SVG pixels
     * @param  {boolean} [isOn=false]   state of the input box (default is false (off))
     * @param  {boolean} [refresh=true] if true, this.refresh() will be called after adding the input box
     * @return {editorElements.InputBox}    instance of the InputBox that has been newly added
     */
    newInput(x, y, isOn = false, refresh = true) {
        return this.newBox(x, y, new editorElements.InputBox(this, isOn), refresh);
    }

    /**
     * Create an output box on the specified position
     * @param  {number}  x              horizontal position of the gate in SVG pixels
     * @param  {number}  y              vertical position of the gate in SVG pixels
     * @param  {boolean} [refresh=true] if true, this.refresh() will be called after adding the output box
     * @return {editorElements.InputBox}    instance of the OutputBox that has been newly added
     */
    newOutput(x, y, refresh = true) {
        return this.newBox(x, y, new editorElements.OutputBox(this), refresh);
    }

    /**
     * Add a new Box to the Canvas
     * @param  {number}  x              horizontal position of the box in SVG pixels
     * @param  {number}  y              vertical position of the box in SVG pixels
     * @param  {editorElements.Box}  object         instance of an object derived from the editorElements.Box class
     * @param  {Boolean} [refresh=true] if true, this.refresh() will be called after adding the box
     * @return {editorElements.Box}                 return the instance of the newly added object
     */
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

        // if tutorial exists, call tutorial callback
        if(this.tutorial) {
            this.tutorial.onElementAdded(this.boxes[index].name);
        }

        return this.boxes[index];
    }

    /**
     * Remove a box from Canvas based on the provided ID
     * @param {string} boxId id of the box that should be removed
     */
    removeBox(boxId) {
        let $gate = $("#"+boxId);

        // find the gate in svg's list of gates
        let gateIndex = -1;
        for(let i = 0 ; i < this.boxes.length ; i++) {
            if(this.boxes[i].svgObj.id===boxId) {
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

            // if tutorial exists, call tutorial callback
            if(this.tutorial) {
                this.tutorial.onElementRemoved();
            }
        } else {
            console.error("Trying to remove an nonexisting box. Box id:", boxId);
        }
    }

    /**
     * Remove all boxes from the canvas
     */
    cleanCanvas() {
        // cannot simply iterate through the array because removeBox works with it

        // create an array of ids
        const ids = this.boxes.map(box => box.id);

        // remove all boxes by their ids
        for (const id of ids) {
            this.removeBox(id);
        }
    }

    /**
     * Create a new wire connecting the provided connectors
     * @param  {string}  fromId         id of the connector that the wire is attached to
     * @param  {string}  toId           id of the connector that the wire is attached to
     * @param  {Boolean} [refresh=true] if refresh is set to true, the SVG document will be reloaded after adding the wire
     * @return {editorElements.Wire}    instance of editorElements.Wire that has been added to the Canvas
     */
    newWire(fromId, toId, refresh = true, route = true) {
        // wire must connect two distinct connectors
        if (fromId===toId)
            return false

        let connectors = [this.getConnectorById(fromId), this.getConnectorById(toId)]

        // input connectors can be connected to one wire max
        connectors.forEach(conn => {
            if(conn.isInputConnector)
                this.removeWiresByConnectorId(conn.id)
        })
        let index = this.wires.length;
        this.wires[index] = new editorElements.Wire(this, fromId, toId, refresh, route);

        connectors.forEach(conn => {
            conn.addWireId(this.wires[index].svgObj.id);
        })

        this.appendElement(this.wires[index], refresh);
        this.moveToBackById(this.wires[index].svgObj.id);

        if(refresh)
            this.wires[index].updateWireState()

        return this.wires[index];
    }

    /**
     * get the coordinates of the specified connector
     * @param  {Connector}  connector      instance of {@link Connector}
     * @param  {Boolean} [snapToGrid=true] if true, the connector position will be snapped to the grid
     * @return {Object}                    point - object containing numeric attributes `x` and `y`
     */
    getConnectorPosition(connector, snapToGrid = true) {
        // connector.svgObj.id has to be called, else the getCoordinates does not work on the first call in Firefox 55
        const dummy = connector.svgObj.id; // eslint-disable-line no-unused-vars

        let $connector = connector.svgObj.$el;

        let position = $connector.position();

        position.left = this.viewbox.transformX(position.left)
        position.top = this.viewbox.transformY(position.top)

        let width = $connector.attr("width");
        let height = $connector.attr("height");

        let x = position.left + width / 2;
        let y = position.top + height / 2;
        if(snapToGrid) {
            x = this.snapToGrid(x);
            y = this.snapToGrid(y);
        }

        return {
            x: x,
            y: y
        };
    }

    /**
     * creates a new blackbox
     * @param  {number} x       horizontal position of the blackbox in SVG pixels
     * @param  {number} y       vertical position of the gate in SVG pixels
     * @param  {number} inputs  number of input pins of this blackbox
     * @param  {number} outputs number of output pins of this blackbox
     * @param  {Array} table   Array of arrays, each inner array contains list of [Logic.state](./module-Logic.html#.state)s,
     *                          that describe the combination of input pin and output pin states in the order from the top to bottom for both input and output connectors.
     *                          If we had an AND array as a blackbox, one of the states could be `[Logic.state.on, Logic.state.off, Logic.state.off]`
     *                          which means that if the first input connector is in the `on` state and the second connector is in the `off` state,
     *                          the state of the output connector will be `off`.
     *                          The array can be described as `[state for input conn 1, state for input conn 2, ..., state for output conn 1, state for output conn 2 ...]`.
     * @param  {string}  name   a name that will be displayed on the blackbox
     * @param  {boolean} [refresh=true] if true, this.refresh() will be called after adding the gate
     *
     * @return {editorElements.Blackbox} instance of {@link Blackbox} that has been added to the [Canvas](./module-Canvas.html)
     */
    newBlackbox(inputs, outputs, table, name, x, y, refresh=true) {
        const index = this.boxes.length;

        this.boxes[index] = new editorElements.Blackbox(
            this,
            inputs,
            outputs,
            (...inputStates) => {
                for (const line of table) {
                    const lineInputStates = line.slice(0, inputs);

                    // if every input state matches the corresponding input state in this line of the truth table
                    if(inputStates.every((value, index) => value === lineInputStates[index])) {
                        // return the rest of the line as output
                        return line.slice(inputs);
                    }
                }
                // if nothing matches, set all outputs to undefined
                return Array.from(new Array(outputs), () => Logic.state.unknown)
            },
            name
        );

        if(x && y) {
            let tr = new editorElements.Transform();
            tr.setTranslate(x, y);

            this.boxes[index].svgObj.addAttr({"transform": tr.get()});
        }

        this.appendElement(this.boxes[index], refresh);

        return this.boxes[index];
    }

    /**
     * Find the correct instance of editorElements.Wire in the Canvas' wires by the provided id
     * @param  {string} wireId id of the wire
     * @return {editorElements.Wire} instance of the wire
     */
    getWireById(wireId) {
        for (const wire of this.wires) {
            if(wire.svgObj.id === wireId) {
                return wire
            }
        }

        return false;
    }

    /**
     * Find all wires that are connected to the specified connector
     * @param  {string} connectorId id of the connector
     * @return {Set} set of ID's of the wires connected to this connector
     */
    getWiresByConnectorId(connectorId) {
        let connector = this.getConnectorById(connectorId);
        return connector.wireIds;
    }

    /**
     * Remove wire that has the provided ID
     * @param  {string} wireId ID of the wire that should be removed
     */
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

    /**
     * Remove all wires that are connected to the connector provided by its ID
     * @param  {string} connectorId ID of the connector
     */
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
                this.startNewSimulation(otherConnector, Logic.state.unknown)
            }
        });

        // clear the list of wire Ids
        connector.wireIds.clear();
        // if connector is an input connector, set its state to unknown
        if(connector.isInputConnector) {
            connector.setState(Logic.state.unknown);
        }
    }

    /**
     * Find the correct instance of editorElements.Box in the Canvas' boxes by the provided id
     * @param  {string} boxId id of the box
     * @return {editorElements.Box} instance of the box
     */
    getBoxById(boxId) {
        for(let i = 0 ; i < this.boxes.length ; i++) {
            if(this.boxes[i].svgObj.id===boxId) {
                return this.boxes[i];
            }
        }
        return undefined;
    }

    /**
     * Find the correct instance of editorElements.Box in the Canvas' boxes by ID of a connector that belongs to this box
     * @param  {string} boxId id of the connector
     * @return {editorElements.Box} instance of the box
     */
    getBoxByConnectorId(connectorId) {
        for(let i = 0 ; i < this.boxes.length ; i++) {
            if (this.boxes[i].getConnectorById(connectorId) !== undefined) {
                return this.boxes[i];
            }
        }
        return false;
    }

    /**
     * Get instance of a connector based on it's ID (and also on an instance of editorElements.Wire if provided)
     *
     * The wire variable is used as heuristic: When we know the wire, we have to check only
     * two gates instead of all of them
     * @param  {string} connectorId id of the connector
     * @param  {editorElements.Wire} [wire]      instance of the Wire that is connected to this connector
     * @return {editorElements.Connector}        instance of the connector
     */
    getConnectorById(connectorId, wire=undefined) {

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

    /**
     * Get the logical jQuery target based on the factual jQuery target.
     *
     * If the object, that user interacted with, is not a connector and is in a group,
     * return the group jQuery object instead of the original jQuery object.
     * @param  {target} target jQuery target of the object user interacted with
     * @return {target}        jQuery target of the object user wanted to interact with
     */
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
    /**
     * Get instance of some object from editorElement based on the jQuery target
     * @param  {target} target jQuery target that user interacted with
     * @return {editorElements.NetworkElement} instance of an object derived from editorElements.NetworkElement that the user interacted with
     */
    getRealTarget(target) {
        if (target===undefined) {
            return undefined;
        }

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

            // try to match the jQuery element to the logical element using DOM classes

            if($parentGroup.hasClass("box")) {
                // return the corresponding box
                return this.getBoxById($parentGroup.attr('id'));
            } else if($parentGroup.hasClass("wire")) {
                // return the corresponding wire
                return this.getWireById($parentGroup.attr('id'));
            } else {
                // found a group that contains the target, but this group does not match any known element types
                return undefined;
            }
        } else {
            // element does not match any known element types
            return undefined;
        }
    }

    /**
     * Add an element to the Canvas
     * @param  {editorElements.NetworkElement}  element Element that will be added on the Canvas
     * @param  {Boolean} [refresh=true] if true, the SVG document will be reloaded after adding this element
     */
    appendElement(element, refresh = true) {
        this.appendJQueryObject(element.get(), refresh);
    }

    /**
     * Append a jQuery element to the SVG document (helper for this.appendElement)
     * @param  {object}  object         jQuery element that will be added to the SVG document
     * @param  {Boolean} [refresh=true] if true, the SVG document will be reloaded after adding this element
     */
    appendJQueryObject(object, refresh = true) {
        this.$svg.append(object);
        if(refresh)
            this.refresh();
    }

    /**
     * Add a new pattern to the definitions element in the SVG document
     * @param {svgObj.Pattern} pattern pattern that will be added to the <devs> element in the SVG document
     */
    addPattern(pattern) {
        this.$defs.append(pattern);
        this.refresh();
    }

    /**
     * Reload the SVG document (needed to display a newly appended jQuery object)
     */
    refresh() {
        this.$svg.html(this.$svg.html());
        console.log("SVG document has been reloaded.")
    }

    /**
     * Display the context menu on the specified position
     * @param  {number} x       horizontal position in CSS pixels
     * @param  {number} y       vertical position in CSS pixels
     * @param  {jQuery.element} $target the item user clicked on (used to display "remove this element"-type items in the menu)
     */
    displayContextMenu(x, y, $target) {
        this.contextMenu.display(x, y, $target);

        // if tutorial exists, call tutorial callback
        if(this.tutorial) {
            this.tutorial.onContextMenuOpened();
        }
    }

    /**
     * hide the context menu
     */
    hideContextMenu() {
        this.contextMenu.hide();
    }

    /**
     * snap a value to a grid
     * @param  {number} value value in SVG pixels
     * @return {number}       the value rounded to the closest number divisible by the grid size
     */
    snapToGrid(value) {
        return Math.round(value / this.gridSize) * this.gridSize;
    }

    /**
     * convert grid pixels to SVG pixels
     * @param  {number} value distance in grid pixels
     * @return {number}       distance in SVG pixels
     */
    gridToSVG(value) {
        return value * this.gridSize;
    }

    /**
     * convert SVG pixels to grid pixels
     * @param {number} value distance in SVG pixels
     * @return {number}      distance in grud pixels
     */
    SVGToGrid(value) {
        return value / this.gridSize;
    }

    /**
     * static function for snapping a value to a grid
     * @param  {number} value value in SVG pixels
     * @param  {number} gridSize size of the grid in SVG pixels
     * @return {number}       the value rounded to the closest number divisible by the grid size
     */
    static snapToGrid(value, gridSize) {
        return Math.round(value / gridSize) * gridSize;
    }

    /**
     * move an element to the front in the canvas
     * @param  {string} objId id of the element
     */
    moveToFrontById(objId) {
        this.$svg.append($("#" + objId));
    }

    /**
     * move an element to the back in the canvas
     * @param  {string} objId id of the element
     */
    moveToBackById(objId) {
        $("#" + this.background.id)
            .after($("#" + objId));
    }

    /**
     * get set of nodes, that cannot be used for wiring at any circumstances
     * @return {Set} set of nodes (objects containing x and y coordinates) that are not suitable for wiring
     */
    getNonRoutableNodes() {
        let blockedNodes = new Set();
        // for each box
        for(const box of this.boxes) {
            const translate = box.getGridPixelTransform().getTranslate();

            // for each item in blockedNodes (set of blocked nodes with coordinates relative
            // to the left upper corner of rect; unit used is "one gridSize") convert the coordinates
            // to absolute (multiple with gridSize and add position of rect) and add the result to the set
            for(const node of box.blockedNodes) {
                blockedNodes.add({
                    x: translate.x + node.x,
                    y: translate.y + node.y
                });
            }
        }

        // FOR DEBUG ONLY: display the non routable nodes
        /*

        if(this.nodeDisplay) {
            for (const rectangleId of this.nodeDisplay) {
                $(`#${rectangleId}`).remove();
            }
        }

        this.nodeDisplay = [];

        for (const node of blockedNodes) {
            const x = this.gridToSVG(node.x);
            const y = this.gridToSVG(node.y);

            const w = 4;
            const p = w / 2;

            const nodeRectangle = new svgObj.Rectangle(x - p, y - p, w, w, "red", "none")
            this.nodeDisplay.push(nodeRectangle.id);
            this.appendElement(nodeRectangle, false);
        }

        this.refresh();

        */
        // END FOR DEBUG ONLY

        // return the set
        return blockedNodes;
    }

    /**
     * get set of nodes, that are inconvenient for wiring, but can be used, just are not preferred
     * @return {Set} set of nodes (objects containing x and y coordinates) that are not preferred for wiring
     */
    getInconvenientNodes(ignoreWireId) {
        let inconvenientNodes = new Set();
        // for each wire

        for(const wire of this.wires) {
            if(ignoreWireId===undefined || ignoreWireId!==wire.id) {
                if(wire.inconvenientNodes) {
                    for (const node of wire.inconvenientNodes) {
                        inconvenientNodes.add(node);
                    }
                }
            }
        }

        // FOR DEBUG ONLY: display the inconvenient nodes
        /*

        if(this.inconvenientNodeDisplay) {
            for (const rectangleId of this.inconvenientNodeDisplay) {
                $(`#${rectangleId}`).remove();
            }
        }

        this.inconvenientNodeDisplay = [];

        for (const node of inconvenientNodes) {
            const x = this.gridToSVG(node.x);
            const y = this.gridToSVG(node.y);

            const w = 4;
            const p = w / 2;

            const nodeRectangle = new svgObj.Rectangle(x - p, y - p, w, w, "orange", "none")
            this.inconvenientNodeDisplay.push(nodeRectangle.id);
            this.appendElement(nodeRectangle, false);
        }

        this.refresh();

        */
        // END FOR DEBUG ONLY

        // return the set
        return inconvenientNodes;
    }
}
