(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svgObjects = require('./svgObjects.js');

var svgObj = _interopRequireWildcard(_svgObjects);

var _editorElements = require('./editorElements.js');

var editorElements = _interopRequireWildcard(_editorElements);

var _logic = require('./logic.js');

var _logic2 = _interopRequireDefault(_logic);

var _contextMenu = require('./contextMenu.js');

var _contextMenu2 = _interopRequireDefault(_contextMenu);

var _floatingMenu = require('./floatingMenu.js');

var _floatingMenu2 = _interopRequireDefault(_floatingMenu);

var _simulation = require('./simulation.js');

var _simulation2 = _interopRequireDefault(_simulation);

var _fn = require('./fn.js');

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ViewBox provides an api for oprerating with the viewBox argument of the <svg> DOM element.
 */
var ViewBox = function () {
    /**
     * Initialize viewBox
     * @param {number} left   distance of the left edge of the viewbox from document's y axis in SVG pixels
     * @param {number} top    distance of the top edge of the viewbox from the document's x axis in SVG pixels
     * @param {number} width  width of the viewbox in SVG pixels
     * @param {number} height height of the viewbox in SVG pixels
     */
    function ViewBox(left, top, width, height) {
        _classCallCheck(this, ViewBox);

        /**
         * ViewBox attributes before applying zoom and shift
         * @type {object}
         */
        this.real = { left: left, top: top, width: width, height: height

            /**
             * The maximum amount of zoom on the viewbox
             * @type {number}
             */
        };this.maxZoom = 8;
        /**
         * The minimum amount of zoom on the viewbox
         * @type {number}
         */
        this.minZoom = 0.1;

        /**
         * Amount of zoom on the viewbox, always between this.minZoom and this.maxZoom
         * @type {number}
         */
        this.realZoom = 1;

        /**
         * amount of horizontal shift of the document
         * @type {number}
         */
        this.leftShift = 0;
        /**
         * amount of vertical shift of the document
         * @type {number}
         */
        this.topShift = 0;
    }

    /**
     * get the amount of zoom on the viewbox
     * @return {number}
     */


    _createClass(ViewBox, [{
        key: 'transformX',


        /**
         * transform horizontal units to the scale and shift of the editor
         * @param  {number} x original horizontal value
         * @return {number}   transformed horizontal value
         */
        value: function transformX(x) {
            return this.left + x / this.zoom;
        }

        /**
         * transform vertical units to the scale and shift of the editor
         * @param  {number} y original vertical value
         * @return {number}   transformed vertical value
         */

    }, {
        key: 'transformY',
        value: function transformY(y) {
            return this.top + y / this.zoom;
        }

        /**
         * transform pageX and pageY parameters of the jquery event to match the zoom and shift of the viewbox
         * @param  {jquery.MouseEvent} event original event
         * @return {jquery.MouseEvent}       the same event but with transformed pageX and pageY members
         */

    }, {
        key: 'transformEvent',
        value: function transformEvent(event) {
            event.pageX = this.transformX(event.pageX);
            event.pageY = this.transformY(event.pageY);

            return event;
        }
    }, {
        key: 'zoom',
        get: function get() {
            return this.realZoom;
        }

        /**
         * set the amount of zoom on the viewbox
         * @param {number} value the new amount of zoom
         */
        ,
        set: function set(value) {
            // fit this.realZoom to fit between this.minZoom and this.maxZoom
            this.realZoom = Math.max(Math.min(value, this.maxZoom), this.minZoom);
        }

        /**
         * get the width of the viewbox with the current zoom applied
         * @return {number} the final width of the viewbox
         */

    }, {
        key: 'width',
        get: function get() {
            return this.real.width / this.zoom;
        }

        /**
         * get the height of the viewbox with the current zoom applied
         * @return {number} the final height of the viewbox
         */

    }, {
        key: 'height',
        get: function get() {
            return this.real.height / this.zoom;
        }

        /**
         * get the horizontal distance from the y axis of the document with zoom and shift value applied
         * @return {number}
         */

    }, {
        key: 'left',
        get: function get() {
            return this.real.left - this.leftShift / this.zoom + (this.real.width - this.width) / 2;
        }

        /**
         * get the vertical distance from the x axis of the document with zoom and shift value applied
         * @return {number}
         */

    }, {
        key: 'top',
        get: function get() {
            return this.real.top - this.topShift / this.zoom + (this.real.height - this.height) / 2;
        }

        /**
         * get the computed viewbox values as a string in the correct format that can be used in the viewBox attribute of the SVG element
         * @return {string} string in format "left top width height"
         */

    }, {
        key: 'str',
        get: function get() {
            return this.left + ' ' + this.top + ' ' + this.width + ' ' + this.height;
        }
    }]);

    return ViewBox;
}();

var ctrlKey = 17,
    cmdKey = 91;

/** @module Canvas */
/**
 * Main class of the application. It represents an instance of the whole editor and holds
 * references to all its elements.
 */

var Canvas = function () {
    /**
     * Initialize the Svg class
     * @param {string} canvas   query selector of the SVG element, that will contain all SVG content of the application
     * @param {number} gridSize initial size of the grid in SVG pixels
     */
    function Canvas(canvas, gridSize) {
        var _this = this;

        _classCallCheck(this, Canvas);

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

        this.simulationEnabled = true;
        this.simulation = new _simulation2.default(this); // dummy, will be overwritten on startNewSimulation

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
        var pattern = new svgObj.Pattern("grid", this.gridSize, this.gridSize);

        var patternPoints = new svgObj.PolylinePoints().append(new svgObj.PolylinePoint(0, 0)).append(new svgObj.PolylinePoint(this.gridSize, 0)).append(new svgObj.PolylinePoint(this.gridSize, this.gridSize));

        pattern.addChild(new svgObj.PolyLine(patternPoints, "#a3a4d2", 2));
        this.addPattern(pattern.get());

        this.background = new svgObj.Rectangle(0, 0, this.width, this.height, "url(#grid)", "none");
        this.appendJQueryObject(this.background.get());
        this.refresh();

        // set the viewbox for future zooming and moving of the canvas
        this.$svg.attr('preserveAspectRatio', 'xMinYMin slice');
        this.viewbox = new ViewBox(0, 0, this.width, this.height);
        this.applyViewbox();

        // CONSTRUCT CONTEXT MENU
        this.contextMenu = new _contextMenu2.default(this);

        // CONSTRUCT FLOATING MENU
        this.floatingMenu = new _floatingMenu2.default(this);

        // ALL EVENT CALLBACKS
        var target = void 0;
        this.$svg.on('mousedown', function (event) {
            target = _this.getRealTarget(event.target);
            if (target !== undefined) {
                // propagate mousedown to the real target
                target.onMouseDown(event);
            } else {
                // mousedown happened directly on the svg
                _this.onMouseDown(event);
            }

            _this.hideContextMenu();
            event.preventDefault();
        }).on('mousemove', function (event) {
            if (target !== undefined) {
                target.onMouseMove(event);
            } else {
                // mousemove happened directly on the svg
                _this.onMouseMove(event);
            }

            event.preventDefault();
        }).on('mouseup', function (event) {
            if (target !== undefined) {
                target.onMouseUp(event);
            } else {
                // mouseup happened directly on the svg
                _this.onMouseUp(event);
            }

            target = undefined;

            event.preventDefault();
        }).on("contextmenu", function (event) {
            _this.displayContextMenu(event.pageX, event.pageY, _this.getRealJQueryTarget(event.target));
            event.preventDefault();
        });

        $(document).on('keydown', function (event) {
            _this.onKeyDown(event);
        }).on("keyup", function (event) {
            _this.onKeyUp(event);
        });

        _fn2.default.addMouseScrollEventListener(canvas, function (event) {
            // zoom only if the ctrl key is pressed
            if (event.ctrlKey) {
                switch (event.delta) {
                    case 1:
                        _this.zoom += 0.1;
                        break;
                    case -1:
                        _this.zoom -= 0.1;
                        break;
                }
            }

            event.preventDefault();
        });
    }

    /**
     * Get the width of the main SVG element
     * @return {number} width of the SVG element in pixels
     */


    _createClass(Canvas, [{
        key: 'onKeyDown',


        /**
         * Process all keydown events that are connected to Canvas
         * @param  {jquery.KeyboardEvent} event KeyboardEvent generated by a listener
         */
        value: function onKeyDown(event) {
            if (event.keyCode === ctrlKey || event.keyCode === cmdKey) {
                this.$svg.addClass('grabbable');
            }
        }

        /**
         * Process all keyup events that are connected to Canvas
         * @param  {jquery.KeyboardEvent} event KeyboardEvent generated by a listener
         */

    }, {
        key: 'onKeyUp',
        value: function onKeyUp(event) {
            if (event.keyCode === ctrlKey || event.keyCode === cmdKey) {
                this.$svg.removeClass('grabbable');
            }
        }

        /**
         * Process all mousedown events that are happening directly on the Canvas
         * @param  {jquery.MouseEvent} event MouseEvent generated by a listener
         */

    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            // middle mouse or left mouse + ctrl moves the canvas
            if (event.which === 2 || event.which === 1 && event.ctrlKey) {
                this.$svg.addClass('grabbed');
                this.moveCanvas = {
                    left: event.pageX,
                    top: event.pageY
                };
            }
        }

        /**
         * Process all mousemove events that are happening directly on the Canvas
         * @param  {jquery.MouseEvent} event MouseEvent generated by a listener
         */

    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            if (this.moveCanvas) {
                var left = event.pageX - this.moveCanvas.left;
                var top = event.pageY - this.moveCanvas.top;

                this.viewbox.leftShift += left;
                this.viewbox.topShift += top;
                this.applyViewbox();

                this.moveCanvas = {
                    left: event.pageX,
                    top: event.pageY
                };
            }
        }

        /**
         * Process all mouseup events that are happening directly on the Canvas
         * @param  {jquery.MouseEvent} event MouseEvent generated by a listener
         */

    }, {
        key: 'onMouseUp',
        value: function onMouseUp(event) {
            if (this.moveCanvas) {
                this.$svg.removeClass('grabbed');
                this.moveCanvas = undefined;
            }
        }

        /**
         * Set the viewBox attribute of the SVG element and size and position attributes
         * of the rectangle with the background grid to match the values in this.viewbox
         */

    }, {
        key: 'applyViewbox',
        value: function applyViewbox() {
            // adjust background
            this.background.addAttr({
                x: this.viewbox.left,
                y: this.viewbox.top,
                width: this.viewbox.width,
                height: this.viewbox.height
            });

            // set the viewBox attribute
            this.$svg.attr('viewBox', this.viewbox.str);
        }

        /**
         * Get the current zoom multiplier of the canvas
         * @return {number}
         */

    }, {
        key: 'importData',


        /**
         * Recreate a logic network from the data provided
         * @param  {object} data object containing information about the imported network
         */
        value: function importData(data) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.simulationEnabled = false;

                // list of wires to be added
                var newWires = new Map();

                // find the leftmost and topmost coordinate of any box, save them to leftTopCorner
                var leftTopCorner = void 0;

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.boxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var boxData = _step.value;
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = boxData.transform.items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var transformInfo = _step4.value;

                                if (transformInfo.name === "translate") {
                                    if (leftTopCorner) {
                                        leftTopCorner = {
                                            x: Math.min(leftTopCorner.x, transformInfo.args[0]),
                                            y: Math.min(leftTopCorner.y, transformInfo.args[1])
                                        };
                                    } else {
                                        leftTopCorner = {
                                            x: transformInfo.args[0],
                                            y: transformInfo.args[1]
                                        };
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = data.boxes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _boxData = _step2.value;

                        // add box
                        var box = void 0;
                        switch (_boxData.category) {
                            case "gate":
                                // add new gate (without reloading the SVG, we will reload it once after the import)
                                box = _this2.newGate(_boxData.name, 0, 0, false);
                                break;
                            case "io":
                                switch (_boxData.name) {
                                    case "input":
                                        // add new input (without reloading the SVG, we will reload it once after the import)
                                        box = _this2.newInput(0, 0, _boxData.isOn, false);
                                        break;
                                    case "output":
                                        // add new output (without reloading the SVG, we will reload it once after the import)
                                        box = _this2.newOutput(0, 0, false);
                                        break;
                                    default:
                                        console.error("Unknown io box name '" + _boxData.name + "'.");
                                        break;
                                }
                                break;
                            case "blackbox":
                                box = _this2.newBlackbox(0, 0, _boxData.inputs, _boxData.outputs, _boxData.table, _boxData.name);
                                break;
                            default:
                                console.error("Unknown box category '" + _boxData.category + "'.");
                        }

                        if (box) {
                            // proccess box transforms (translation and rotation)
                            var transform = new editorElements.Transform();

                            for (var j = 0; j < _boxData.transform.items.length; ++j) {
                                switch (_boxData.transform.items[j].name) {
                                    case "translate":
                                        transform.setTranslate(_boxData.transform.items[j].args[0] - leftTopCorner.x // make it the relative distance from the leftmost element
                                        - Math.round(_this2.viewbox.leftShift / _this2.gridSize) // move the element relative to the viewbox shift
                                        + _this2.leftTopPadding, // apply padding

                                        _boxData.transform.items[j].args[1] - leftTopCorner.y // make it the relative distance from the topmost element
                                        - Math.round(_this2.viewbox.topShift / _this2.gridSize) // move the element relative to the viewbox shift
                                        + _this2.leftTopPadding // apply padding
                                        );
                                        break;
                                    case "rotate":
                                        transform.setRotate(_boxData.transform.items[j].args[0], _boxData.transform.items[j].args[1], _boxData.transform.items[j].args[2]);
                                        break;
                                    default:
                                        console.error("Unknown transform property '" + _boxData.transform.items[j].name + "'.");
                                        break;
                                }
                            }

                            transform.toSVGPixels(_this2);
                            box.setTransform(transform);

                            // add all wires to the list of wires to be added
                            for (var _j = 0; _j < _boxData.connections.length; ++_j) {
                                // get the artificial wire id
                                var wireId = _boxData.connections[_j].wireId;

                                // pass the values got from json into a variable that will be added into the map
                                var value = {
                                    index: _boxData.connections[_j].index,
                                    type: _boxData.connections[_j].type,
                                    boxId: box.id
                                };

                                // add the value to the map
                                if (newWires.has(wireId)) {
                                    // if there already is a wire with this id in the map,
                                    // add the value to the end of the array of values
                                    var mapValue = newWires.get(wireId);
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
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _this2.refresh();

                // with all boxes added, we can now connect them with wires
                newWires.forEach(function (item) {
                    var connectorIds = [];
                    if (item[0] && item[1]) {
                        var _arr = [0, 1];

                        for (var _i = 0; _i < _arr.length; _i++) {
                            var i = _arr[_i];
                            var box = _this2.getBoxById(item[i].boxId);

                            connectorIds[i] = box.connectors[item[i].index].id;
                        }
                    }
                    _this2.newWire(connectorIds[0], connectorIds[1], true);
                });

                // refresh the SVG document
                _this2.refresh();

                _this2.simulationEnabled = true;
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = _this2.boxes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var box = _step3.value;

                        if (box instanceof editorElements.InputBox) {
                            // switch the input box state to the oposit and back, for some reason calling box.refreshState()
                            // results in weird unfinished simulation
                            // this causes update of the output connector and a start of a new simulation

                            // TODO find better solution instead of this workaround
                            box.on = !box.on;
                            box.on = !box.on;
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                resolve();
            });
        }

        /**
         * When user clicks on a connector, remember it until they click on some other connector.
         * Than call newWire with the last two connectors ids as arguments.
         * @param  {string} connectorId id of the connector that the user clicked on
         */

    }, {
        key: 'wireCreationHelper',
        value: function wireCreationHelper(connectorId) {
            if (!this.firstConnectorId) {
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

    }, {
        key: 'startNewSimulation',
        value: function startNewSimulation(startingConnector, state) {
            if (this.simulationEnabled) {
                this.simulation = new _simulation2.default(this);
                this.simulation.notifyChange(startingConnector.id, state);
                this.simulation.run();
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

    }, {
        key: 'newGate',
        value: function newGate(name, x, y) {
            var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

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

    }, {
        key: 'newInput',
        value: function newInput(x, y) {
            var isOn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            return this.newBox(x, y, new editorElements.InputBox(this, isOn), refresh);
        }

        /**
         * Create an output box on the specified position
         * @param  {number}  x              horizontal position of the gate in SVG pixels
         * @param  {number}  y              vertical position of the gate in SVG pixels
         * @param  {boolean} [refresh=true] if true, this.refresh() will be called after adding the output box
         * @return {editorElements.InputBox}    instance of the OutputBox that has been newly added
         */

    }, {
        key: 'newOutput',
        value: function newOutput(x, y) {
            var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

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

    }, {
        key: 'newBox',
        value: function newBox(x, y, object) {
            var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            var index = this.boxes.length;

            this.boxes[index] = object;

            // translate the gate if x and y has been specified
            if (x && y) {
                var tr = new editorElements.Transform();
                tr.setTranslate(x, y);

                this.boxes[index].svgObj.addAttr({ "transform": tr.get() });
            }

            this.appendElement(this.boxes[index], refresh);

            return this.boxes[index];
        }

        /**
         * Remove a box from Canvas based on the provided ID
         * @param {string} boxId id of the box that should be removed
         */

    }, {
        key: 'removeBox',
        value: function removeBox(boxId) {
            var $gate = $("#" + boxId);

            // find the gate in svg's list of gates
            var gateIndex = -1;
            for (var i = 0; i < this.boxes.length; i++) {
                if (this.boxes[i].svgObj.id === boxId) {
                    gateIndex = i;
                    break;
                }
            }

            if (gateIndex > -1) {
                // remove all wires connected to this gate
                for (var _i2 = 0; _i2 < this.boxes[gateIndex].connectors.length; _i2++) {
                    this.removeWiresByConnectorId(this.boxes[gateIndex].connectors[_i2].svgObj.id);
                }

                // remove the gate
                this.boxes.splice(gateIndex, 1);
                $gate.remove();
            } else {
                console.error("Trying to remove an nonexisting box. Box id:", boxId);
            }
        }

        /**
         * Create a new wire connecting the provided connectors
         * @param  {string}  fromId         id of the connector that the wire is attached to
         * @param  {string}  toId           id of the connector that the wire is attached to
         * @param  {Boolean} [refresh=true] if refresh is set to true, the SVG document will be reloaded after adding the wire
         * @return {editorElements.Wire}    instance of editorElements.Wire that has been added to the Canvas
         */

    }, {
        key: 'newWire',
        value: function newWire(fromId, toId) {
            var _this3 = this;

            var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            // wire must connect two distinct connectors
            if (fromId === toId) return false;

            var connectors = [this.getConnectorById(fromId), this.getConnectorById(toId)];

            // input connectors can be connected to one wire max
            connectors.forEach(function (conn) {
                if (conn.isInputConnector) _this3.removeWiresByConnectorId(conn.id);
            });
            var index = this.wires.length;
            this.wires[index] = new editorElements.Wire(this, fromId, toId, this.gridSize, refresh);

            connectors.forEach(function (conn) {
                conn.addWireId(_this3.wires[index].svgObj.id);
            });

            this.appendElement(this.wires[index], refresh);
            this.moveToBackById(this.wires[index].svgObj.id);

            if (refresh) this.wires[index].updateWireState();

            return this.wires[index];
        }

        /**
         * import a blackbox based on the provided data
         * @param  {Object} data data describing the object,
         *                       must contain fields `inputs`, `outputs`
         *                       (positive integers, determining number of inputs and outputs)
         *                       and `table` (array of arrays, the inner arrays have `inputs + outputs`
         *                       items that describe the input and output states of the connectors in order)
         * @param  {string} name name of the black box
         * @return {editorElements.Blackbox} instance of {@link Blackbox} that has been added to the [Canvas](./module-Canvas.html)
         */

    }, {
        key: 'importBlackbox',
        value: function importBlackbox(data, name) {
            var inputs = data.inputs,
                outputs = data.outputs,
                table = data.table;

            var padding = {
                x: this.snapToGrid(this.leftTopPadding * this.gridSize - this.viewbox.leftShift),
                y: this.snapToGrid(this.leftTopPadding * this.gridSize - this.viewbox.topShift)
            };
            return this.newBlackbox(padding.x, padding.y, inputs, outputs, table, name);
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

    }, {
        key: 'newBlackbox',
        value: function newBlackbox(x, y, inputs, outputs, table, name) {
            var refresh = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

            var height = Math.max(inputs, outputs) * 2;
            var index = this.boxes.length;

            this.boxes[index] = new editorElements.Blackbox(this, inputs, outputs, function () {
                for (var _len = arguments.length, inputStates = Array(_len), _key = 0; _key < _len; _key++) {
                    inputStates[_key] = arguments[_key];
                }

                var _loop = function _loop(line) {
                    var lineInputStates = line.slice(0, inputs);

                    // if every input state matches the corresponding input state in this line of the truth table
                    if (inputStates.every(function (value, index) {
                        return value === lineInputStates[index];
                    })) {
                        // return the rest of the line as output
                        return {
                            v: line.slice(inputs)
                        };
                    }
                };

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = table[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var line = _step5.value;

                        var _ret = _loop(line);

                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                    }
                    // if nothing matches, set all outputs to undefined
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                return Array.from(new Array(outputs), function () {
                    return _logic2.default.state.unknown;
                });
            }, name);

            if (x && y) {
                var tr = new editorElements.Transform();
                tr.setTranslate(x, y);

                this.boxes[index].svgObj.addAttr({ "transform": tr.get() });
            }

            this.appendElement(this.boxes[index], refresh);

            return this.boxes[index];
        }

        /**
         * Find the correct instance of editorElements.Wire in the Canvas' wires by the provided id
         * @param  {string} wireId id of the wire
         * @return {editorElements.Wire} instance of the wire
         */

    }, {
        key: 'getWireById',
        value: function getWireById(wireId) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.wires[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var wire = _step6.value;

                    if (wire.svgObj.id === wireId) {
                        return wire;
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            return false;
        }

        /**
         * Find all wires that are connected to the specified connector
         * @param  {string} connectorId id of the connector
         * @return {Set} set of ID's of the wires connected to this connector
         */

    }, {
        key: 'getWiresByConnectorId',
        value: function getWiresByConnectorId(connectorId) {
            var connector = this.getConnectorById(connectorId);
            return connector.wireIds;
        }

        /**
         * Remove wire that has the provided ID
         * @param  {string} wireId ID of the wire that should be removed
         */

    }, {
        key: 'removeWireById',
        value: function removeWireById(wireId) {
            for (var i = 0; i < this.wires.length; ++i) {
                if (this.wires[i].svgObj.id === wireId) {

                    var connector1 = this.wires[i].startConnector;
                    var connector2 = this.wires[i].endConnector;

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

    }, {
        key: 'removeWiresByConnectorId',
        value: function removeWiresByConnectorId(connectorId) {
            var _this4 = this;

            var connector = this.getConnectorById(connectorId);

            connector.wireIds.forEach(function (wireId) {
                var wire = _this4.getWireById(wireId);

                // get the other connector that is the wire connected to
                var otherConnector = _this4.getConnectorById(wire.fromId, wire);
                if (otherConnector.svgObj.id === connectorId) {
                    otherConnector = _this4.getConnectorById(wire.toId, wire);
                }

                // delete the wire record from the other connector
                otherConnector.wireIds.delete(wireId);

                // remove the wire representation using jQuery
                $("#" + wireId).remove();

                // if otherConnector is an input connector, set its state to unknown
                if (otherConnector.isInputConnector) {
                    _this4.startNewSimulation(otherConnector, _logic2.default.state.unknown);
                }
            });

            // clear the list of wire Ids
            connector.wireIds.clear();
            // if connector is an input connector, set its state to unknown
            if (connector.isInputConnector) {
                connector.setState(_logic2.default.state.unknown);
            }
        }

        /**
         * Find the correct instance of editorElements.Box in the Canvas' boxes by the provided id
         * @param  {string} boxId id of the box
         * @return {editorElements.Box} instance of the box
         */

    }, {
        key: 'getBoxById',
        value: function getBoxById(boxId) {
            for (var i = 0; i < this.boxes.length; i++) {
                if (this.boxes[i].svgObj.id === boxId) {
                    return this.boxes[i];
                }
            }
            return false;
        }

        /**
         * Find the correct instance of editorElements.Box in the Canvas' boxes by ID of a connector that belongs to this box
         * @param  {string} boxId id of the connector
         * @return {editorElements.Box} instance of the box
         */

    }, {
        key: 'getBoxByConnectorId',
        value: function getBoxByConnectorId(connectorId) {
            for (var i = 0; i < this.boxes.length; i++) {
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

    }, {
        key: 'getConnectorById',
        value: function getConnectorById(connectorId) {
            var wire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;


            if (wire !== undefined) {
                // we know the wire -- we can check only gates at the ends of this wire
                var connector = wire.startBox.getConnectorById(connectorId);
                if (!connector) {
                    connector = wire.endBox.getConnectorById(connectorId);
                }
                return connector;
            } else {
                // we do not know the wire -- we have to check all gates
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = this.boxes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var box = _step7.value;

                        var _connector = box.getConnectorById(connectorId);
                        if (_connector) {
                            return _connector;
                        }
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }
            }

            return false;
        }

        /**
         * Get the logical jQuery target based on the factual jQuery target.
         *
         * If the object, that user interacted with, is not a connector and is in a group,
         * return the group jQuery object instead of the original jQuery object.
         * @param  {target} target jQuery target of the object user interacted with
         * @return {target}        jQuery target of the object user wanted to interact with
         */

    }, {
        key: 'getRealJQueryTarget',
        value: function getRealJQueryTarget(target) {
            var $target = $(target);
            if (!$target.hasClass("connector") && $target.parents('g').length > 0) {
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

    }, {
        key: 'getRealTarget',
        value: function getRealTarget(target) {
            // eventy se museji zpracovat tady, protoze v SVG se eventy nepropaguji
            var $target = $(target);

            if ($target.hasClass("connector")) {
                // this is a connector, don't traverse groups
                return this.getConnectorById($target.attr('id'));
            } else if ($target.parents('g').length > 0) {
                // this element is in a group and it is not a connector

                // traversing up the DOM tree until we find the closest group
                var $parentGroup = $target.parent();
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

        /**
         * Add an element to the Canvas
         * @param  {editorElements.NetworkElement}  element Element that will be added on the Canvas
         * @param  {Boolean} [refresh=true] if true, the SVG document will be reloaded after adding this element
         */

    }, {
        key: 'appendElement',
        value: function appendElement(element) {
            var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.appendJQueryObject(element.get(), refresh);
        }

        /**
         * Append a jQuery element to the SVG document (helper for this.appendElement)
         * @param  {object}  object         jQuery element that will be added to the SVG document
         * @param  {Boolean} [refresh=true] if true, the SVG document will be reloaded after adding this element
         */

    }, {
        key: 'appendJQueryObject',
        value: function appendJQueryObject(object) {
            var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.$svg.append(object);
            if (refresh) this.refresh();
        }

        /**
         * Add a new pattern to the definitions element in the SVG document
         * @param {svgObj.Pattern} pattern pattern that will be added to the <devs> element in the SVG document
         */

    }, {
        key: 'addPattern',
        value: function addPattern(pattern) {
            this.$defs.append(pattern);
            this.refresh();
        }

        /**
         * Reload the SVG document (needed to display a newly appended jQuery object)
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            this.$svg.html(this.$svg.html());
            console.log("SVG document has been reloaded.");
        }

        /**
         * Display the context menu on the specified position
         * @param  {number} x       horizontal position in CSS pixels
         * @param  {number} y       vertical position in CSS pixels
         * @param  {jQuery.element} $target the item user clicked on (used to display "remove this element"-type items in the menu)
         */

    }, {
        key: 'displayContextMenu',
        value: function displayContextMenu(x, y, $target) {
            this.contextMenu.display(x, y, $target);
        }

        /**
         * hide the context menu
         */

    }, {
        key: 'hideContextMenu',
        value: function hideContextMenu() {
            this.contextMenu.hide();
        }

        /**
         * snap a value to a grid
         * @param  {number} value value in SVG pixels
         * @return {number}       the value rounded to the closest number divisible by the grid size
         */

    }, {
        key: 'snapToGrid',
        value: function snapToGrid(value) {
            return Math.round(value / this.gridSize) * this.gridSize;
        }

        /**
         * convert grid pixels to SVG pixels
         * @param  {number} value distance in grid pixels
         * @return {number}       distance in SVG pixels
         */

    }, {
        key: 'gridToSVG',
        value: function gridToSVG(value) {
            return value * this.gridSize;
        }

        /**
         * convert SVG pixels to grid pixels
         * @param {number} value distance in SVG pixels
         * @return {number}      distance in grud pixels
         */

    }, {
        key: 'SVGToGrid',
        value: function SVGToGrid(value) {
            return value / this.gridSize;
        }

        /**
         * static function for snapping a value to a grid
         * @param  {number} value value in SVG pixels
         * @param  {number} gridSize size of the grid in SVG pixels
         * @return {number}       the value rounded to the closest number divisible by the grid size
         */

    }, {
        key: 'moveToFrontById',


        /**
         * move an element to the front in the canvas
         * @param  {string} objId id of the element
         */
        value: function moveToFrontById(objId) {
            this.$svg.append($("#" + objId));
        }

        /**
         * move an element to the back in the canvas
         * @param  {string} objId id of the element
         */

    }, {
        key: 'moveToBackById',
        value: function moveToBackById(objId) {
            $("#" + this.background.id).after($("#" + objId));
        }

        /**
         * get set of nodes, that cannot be used for wiring at any circumstances
         * @return {Set} set of nodes (objects containing x and y coordinates) that are not suitable for wiring
         */

    }, {
        key: 'getNonRoutableNodes',
        value: function getNonRoutableNodes() {
            var blockedNodes = new Set();
            // for each box
            for (var i = 0; i < this.boxes.length; ++i) {
                // get the jQuery child with class .rect ("hitbox")
                var rect = $('#' + this.boxes[i].svgObj.id).children(".rect")[0];
                // get the position of the rectangle
                var position = $(rect).position();

                // snap the position to the grid
                position.left = this.snapToGrid(position.left);
                position.top = this.snapToGrid(position.top);

                // for each item in blockedNodes (set of blocked nodes with coordinates relative
                // to the left upper corner of rect; unit used is "one gridSize") convert the coordinates
                // to absolute (multiple with gridSize and add position of rect) and add the result to the set
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = this.boxes[i].blockedNodes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var item = _step8.value;

                        var absoluteX = position.left + item.x * this.gridSize;
                        var absoluteY = position.top + item.y * this.gridSize;

                        blockedNodes.add({
                            x: absoluteX,
                            y: absoluteY
                        });
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                            _iterator8.return();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }
            }
            // TODO ensure that this.refresh() is really unnecessary
            // this.refresh();
            // return the set
            return blockedNodes;
        }

        /**
         * get set of nodes, that are inconvenient for wiring, but can be used, just are not preferred
         * @return {Set} set of nodes (objects containing x and y coordinates) that are not preferred for wiring
         */

    }, {
        key: 'getInconvenientNodes',
        value: function getInconvenientNodes(ignoreWireId) {
            var _this5 = this;

            var inconvenientNodes = new Set();
            // for each wire
            for (var i = 0; i < this.wires.length; ++i) {
                // (ignore the wire that is specified in the ignoreWireId argument (if any))
                if (ignoreWireId === undefined || ignoreWireId !== this.wires[i].svgObj.id) {
                    (function () {
                        // cycle through points, for each neigbours add all points that are in between them
                        // i.e.: (0,0) and (0,30) are blocking these nodes: (0,0), (0,10), (0,20), (0,30)
                        var prevPoint = void 0;
                        _this5.wires[i].points.forEach(function (point) {
                            if (prevPoint === undefined) {
                                // if the prevPoint is undefined, add the first point
                                inconvenientNodes.add({ x: point.x, y: point.y });
                            } else {
                                // else add all the point between the prevPoint (excluded) and point (included)

                                if (prevPoint.x === point.x) {
                                    // if the line is horizontal
                                    var from = Math.min(prevPoint.y, point.y);
                                    var to = Math.max(prevPoint.y, point.y);

                                    while (from <= to) {
                                        inconvenientNodes.add({ x: point.x, y: from });
                                        from += _this5.gridSize;
                                    }
                                } else if (prevPoint.y === point.y) {
                                    // if the line is vertical
                                    var _from = Math.min(prevPoint.x, point.x);
                                    var _to = Math.max(prevPoint.x, point.x);

                                    while (_from <= _to) {
                                        inconvenientNodes.add({ x: _from, y: point.y });
                                        _from += _this5.gridSize;
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
                    })();
                }
            }
            // return the set
            return inconvenientNodes;
        }
    }, {
        key: 'width',
        get: function get() {
            return this.$svg.width();
        }

        /**
         * Get the height of the main SVG element
         * @return {number} height of the SVG element in pixels
         */

    }, {
        key: 'height',
        get: function get() {
            return this.$svg.height();
        }
    }, {
        key: 'zoom',
        get: function get() {
            return this.viewbox.zoom;
        }

        /**
         * Set the zoom multiplier of the canvas.
         * I sets the viewbox zoom and then applies the new value by calling this.applyViewbox()
         * @param  {number} value set the zoom to this value
         */
        ,
        set: function set(value) {
            this.viewbox.zoom = value;
            this.applyViewbox();
        }

        /**
         * Generate an object containing export data for the Canvas and all elements.
         * Data from this function should cover all important information needed to import the
         * network in a different session.
         * @return {object} object containing infomration about the network
         */

    }, {
        key: 'exportData',
        get: function get() {
            this.exportWireIdMap = new Map();
            this.exportWireId = 0;

            var data = {
                boxes: []
            };

            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = this.boxes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var box = _step9.value;

                    data.boxes.push(box.exportData);
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            return data;
        }
    }], [{
        key: 'snapToGrid',
        value: function snapToGrid(value, gridSize) {
            return Math.round(value / gridSize) * gridSize;
        }
    }]);

    return Canvas;
}();

exports.default = Canvas;

},{"./contextMenu.js":2,"./editorElements.js":3,"./floatingMenu.js":4,"./fn.js":5,"./logic.js":7,"./simulation.js":10,"./svgObjects.js":12}],2:[function(require,module,exports){
"use strict";

/**
 * Item in the [ContextMenu](./module-ContextMenu.html). ContextMenuItems can be nested using the appendItem function.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenuItem = function () {
    /**
     * @param {string} text          text on the button
     * @param {ContextMenu} contextMenu instance of the [ContextMenu](./module-ContextMenu.html) this item belongs to
     * @param {Canvas} parentSVG     instance of [Canvas](./module-Canvas.html) this menu belongs to
     * @param {Function} clickFunction callback function that will be called when user clicks this item
     */
    function ContextMenuItem(text, contextMenu, parentSVG, clickFunction) {
        _classCallCheck(this, ContextMenuItem);

        /**
         * text on the button
         * @type {string}
         */
        this.text = text;

        /**
         * instance of the [ContextMenu](./module-ContextMenu.html) this item belongs to
         * @type {ContextMenu}
         */
        this.contextMenu = contextMenu;

        /**
         * instance of [Canvas](./module-Canvas.html) this menu belongs to
         * @type {Canvas}
         */
        this.parentSVG = parentSVG;

        /**
         * jQuery element representing DOM content of this menu item
         * @type {jQuery.element}
         */
        this.$el = $("<li>").text(text);

        // set up click callback if clickFunction is defined
        if (clickFunction) {
            $(this.$el).click(function (event) {
                clickFunction(event);
                contextMenu.hide();
            });
        }
    }

    /**
     * add a CSS class to this item
     * @param {string} cls [description]
     */


    _createClass(ContextMenuItem, [{
        key: "addClass",
        value: function addClass(cls) {
            this.$el.addClass(cls);
            return this;
        }

        /**
         * append a nested {@link ContextMenuItem} to this item
         * @param  {ContextMenuItem} item item that will be appended
         */

    }, {
        key: "appendItem",
        value: function appendItem(item) {
            if (!this.subList) {
                this.subList = $("<ul>");
                this.$el.append(this.subList);
            }

            this.subList.append(item.jQuery);

            return item;
        }

        /**
         * get jQuery element of this menu item
         * @return {jQuery.element} jQuery element containing all DOM content for this menu item
         */

    }, {
        key: "jQuery",
        get: function get() {
            return this.$el;
        }
    }]);

    return ContextMenuItem;
}();

/**
 * Menu item that has a custom click callback function that adds a {@link Gate} of the specified type to the [Canvas](./module-Canvas.html)
 * @extends ContextMenuItem
 */


var GateMenuItem = function (_ContextMenuItem) {
    _inherits(GateMenuItem, _ContextMenuItem);

    /**
     * @param {string} type        type of the gate {@link Gate} (and, or, ...)
     * @param {ContextMenu} contextMenu instance of the [ContextMenu](./module-ContextMenu.html) that this item belongs to
     * @param {Canvas} parentSVG   instance of [Canvas](./module-Canvas.html) this menu belongs to
     */
    function GateMenuItem(type, contextMenu, parentSVG) {
        _classCallCheck(this, GateMenuItem);

        return _possibleConstructorReturn(this, (GateMenuItem.__proto__ || Object.getPrototypeOf(GateMenuItem)).call(this, type + " gate", contextMenu, parentSVG, function (event) {
            var position = {
                left: parentSVG.snapToGrid(parentSVG.viewbox.transformX(contextMenu.position.x)),
                top: parentSVG.snapToGrid(parentSVG.viewbox.transformY(contextMenu.position.y))
            };

            parentSVG.newGate(type, position.left, // x coordinate
            position.top // y coordinate
            );
        }));
    }

    return GateMenuItem;
}(ContextMenuItem);

/** @module ContextMenu */
/**
 * ContextMenu represents the menu that is displayed to the user when they right click on a canvas.
 * This menu allows user to add elements to the Canvas and in the case that user rightclicked
 * on a specific element, this menu allows them to remove this element.
 */


var ContextMenu = function () {
    /**
     * @param {Canvas} parentSVG instance of [Canvas](./module-Canvas.html) this menu belongs to
     */
    function ContextMenu(parentSVG) {
        var _this2 = this;

        _classCallCheck(this, ContextMenu);

        /**
         * instance of [Canvas](./module-Canvas.html) this menu belongs to
         * @type {Canvas}
         */
        this.parentSVG = parentSVG;

        // list of gates that can be added
        var gates = ["not", "and", "or", "nand", "nor", "xor", "xnor"];

        /**
         * Position of the context menu. It is used to add the new elements to the correct position on the Canvas.
         * @type {Object}
         */
        this.position = {
            x: 0, y: 0
        };

        /**
         * jQuery element containing the context menu
         * @type {jQuery.element}
         */
        this.$el = $("<ul>");
        this.$el.attr('id', 'contextMenu');

        // add all gates
        var gateList = new ContextMenuItem("New gate", this, parentSVG);
        for (var i = 0; i < gates.length; ++i) {
            gateList.appendItem(new GateMenuItem(gates[i], this, parentSVG));
        }
        this.appendItem(gateList);

        // add input box
        this.appendItem(new ContextMenuItem("Input box", this, parentSVG, function () {
            var position = {
                left: _this2.parentSVG.snapToGrid(parentSVG.viewbox.transformX(_this2.position.x)),
                top: _this2.parentSVG.snapToGrid(parentSVG.viewbox.transformY(_this2.position.y))
            };

            parentSVG.newInput(position.left, position.top);
        }));

        // add output box
        this.appendItem(new ContextMenuItem("Output box", this, parentSVG, function () {
            var position = {
                left: _this2.parentSVG.snapToGrid(parentSVG.viewbox.transformX(_this2.position.x)),
                top: _this2.parentSVG.snapToGrid(parentSVG.viewbox.transformY(_this2.position.y))
            };

            parentSVG.newOutput(position.left, position.top);
        }));

        // add conditional items for box and wire removal
        this.appendConditionalItem('box', 'Remove this item', function (id) {
            _this2.parentSVG.removeBox(id);
        });
        this.appendConditionalItem('wire', 'Remove this wire', function (id) {
            _this2.parentSVG.removeWireById(id);
        });

        // add the context menu to the DOM
        parentSVG.$svg.before(this.$el);
    }

    /**
     * append a context menu item to the context menu
     * @param  {ContextMenuItem} item instance of {@link ContextMenuItem} that will be added to this menu
     */


    _createClass(ContextMenu, [{
        key: "appendItem",
        value: function appendItem(item) {
            this.$el.append(item.jQuery);
            return item;
        }

        /**
         * appends an connditional item (that is shown only if the target has the class itemClass)
         * @param  {string} itemClass     show the item only if the target has this class
         * @param  {string} text          text of this menu item
         * @param  {Function} clickFunction function with one argument (ID of the target) that will be called on click
         */

    }, {
        key: "appendConditionalItem",
        value: function appendConditionalItem(itemClass, text, clickFunction) {
            if (!this.conditionalItems) {
                this.conditionalItems = [];
            }

            this.conditionalItems[this.conditionalItems.length] = {
                itemClass: itemClass,
                text: text,
                clickFunction: clickFunction
            };
        }

        /**
         * decide whether or not to display specific conditional items
         * @param  {jQuery.element} $target jQuery target of a MouseEvent (element that user clicked on)
         */

    }, {
        key: "resolveConditionalItems",
        value: function resolveConditionalItems($target) {
            var _this3 = this;

            var _loop = function _loop(i) {
                if ($target.hasClass(_this3.conditionalItems[i].itemClass)) {
                    _this3.appendItem(new ContextMenuItem(_this3.conditionalItems[i].text, _this3, _this3.parentSVG, function () {
                        _this3.conditionalItems[i].clickFunction($target.attr('id'));
                    })).addClass('conditional');
                }
            };

            for (var i = 0; i < this.conditionalItems.length; ++i) {
                _loop(i);
            }
        }

        /**
         * hide all conditional items
         */

    }, {
        key: "hideAllConditionalItems",
        value: function hideAllConditionalItems() {
            this.$el.children('.conditional').remove();
        }

        /**
         * displays the context menu with the right set of conditional items
         * @param  {number} x       horizontal position of the context menu in CSS pixels
         * @param  {number} y       vertical position of the context menu in CSS pixels
         * @param  {jQuery.element} $target jQuery target of a MouseEvent (element that user clicked on)
         */

    }, {
        key: "display",
        value: function display(x, y, $target) {
            this.position = {
                x: x,
                y: y
            };

            this.$el.css({
                display: 'block',
                top: y + "px",
                left: x + "px"
            });

            this.resolveConditionalItems($target);
        }

        /**
         * hide the context menu
         */

    }, {
        key: "hide",
        value: function hide() {
            this.$el.css({ display: 'none' });
            this.hideAllConditionalItems();
        }
    }]);

    return ContextMenu;
}();

exports.default = ContextMenu;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Wire = exports.Blackbox = exports.Gate = exports.OutputBox = exports.InputBox = exports.OutputConnector = exports.InputConnector = exports.Transform = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svgObjects = require('./svgObjects.js');

var svgObj = _interopRequireWildcard(_svgObjects);

var _structuresAndClasses = require('./structuresAndClasses.js');

var Structures = _interopRequireWildcard(_structuresAndClasses);

var _logic = require('./logic.js');

var _logic2 = _interopRequireDefault(_logic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * mapping of logical states to css classes
 * @type {Object}
 */
var stateClasses = {
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

var Property = function () {
    /**
     * Initialize the Property object
     * @param {string} [string] string in the property format `propertyname(list of space separated values)`
     */
    function Property(string) {
        _classCallCheck(this, Property);

        if (string !== undefined) {
            this.name = string.replace(/^[ ]*([^(]+).*/, "$1");
            this.args = string.replace(/^[^(]+\((.*)\)/, "$1").split(' ');
        }
    }

    /**
     * set or replace the name of this property
     * @param {string} name new name for this property
     */


    _createClass(Property, [{
        key: 'setName',
        value: function setName(name) {
            this.name = name;
        }

        /**
         * set arguments of this property
         * @param {array} args array of arguments
         */

    }, {
        key: 'setArguments',
        value: function setArguments(args) {
            this.args = args;
        }

        /**
         * get string representation of the property
         * @return {string} property in the property format `name(arg1 arg2)`
         */

    }, {
        key: 'get',
        value: function get() {
            return this.name + "(" + this.args.join(" ") + ")";
        }
    }]);

    return Property;
}();

/**
 * API for manipulating the transform argument used in SVG
 */


var Transform = exports.Transform = function () {
    /**
     * Initialize the Transform object
     * @param {string} [string] string in the format of the `transform` argument in SVG, for example `translate(360 150) rotate(90 30 20)`
     */
    function Transform(string) {
        _classCallCheck(this, Transform);

        /**
         * array of {@link Property} instances
         * @type {Array}
         */
        this.items = [];

        if (string !== undefined) {
            var splitItems = string.split(")");

            for (var i = 0; i < splitItems.length; i++) {
                if (splitItems[i]) {
                    // if not empty
                    this.items.push(new Property(splitItems[i] + ")"));
                }
            }
        }
    }

    /**
     * convert distances from SVG pixels to grid pixels
     * @param  {Canvas} parentSVG instance of [Canvas](./module-Canvas.html)
     */


    _createClass(Transform, [{
        key: 'toGridPixels',
        value: function toGridPixels(parentSVG) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (item.name === "translate") {
                        item.args = [parentSVG.SVGToGrid(item.args[0]), parentSVG.SVGToGrid(item.args[1])];
                    } else if (item.name === "rotate") {
                        item.args = [item.args[0], parentSVG.SVGToGrid(item.args[1]), parentSVG.SVGToGrid(item.args[2])];
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * convert distances from grid pixels to SVG pixels
         * @param  {Canvas} parentSVG instance of [Canvas](./module-Canvas.html)
         */

    }, {
        key: 'toSVGPixels',
        value: function toSVGPixels(parentSVG) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    if (item.name === "translate") {
                        item.args = [parentSVG.gridToSVG(item.args[0]), parentSVG.gridToSVG(item.args[1])];
                    } else if (item.name === "rotate") {
                        item.args = [item.args[0], parentSVG.gridToSVG(item.args[1]), parentSVG.gridToSVG(item.args[2])];
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        /**
         * find a transform property by name and get its index in the [items](#items) array
         * @param  {string} name name of the property
         * @return {number}      index of the property in the array of properties or `-1` if not found
         */

    }, {
        key: 'getIndex',
        value: function getIndex(name) {
            for (var i = 0; i < this.items.length; i++) {
                if (name === this.items[i].name) {
                    return i;
                }
            }

            return -1;
        }

        /**
         * get the translate property
         * @return {Object} object containing parameters of the translate attribute
         */

    }, {
        key: 'getTranslate',
        value: function getTranslate() {
            var args = this.getArguments(this.getIndex("translate"));

            return {
                x: args[0],
                y: args[1]
            };
        }

        /**
         * get the rotate property
         * @return {Object} object containing parameters of the rotate attribute
         */

    }, {
        key: 'getRotate',
        value: function getRotate() {
            var args = this.getArguments(this.getIndex("rotate"));

            return {
                deg: args[0],
                centreX: args[1],
                centreY: args[2]
            };
        }

        /**
         * set translate to the specified values
         * @param {number} x horizontal translation
         * @param {number} y vertical translation
         */

    }, {
        key: 'setTranslate',
        value: function setTranslate(x, y) {
            this.setParameter("translate", [x, y]);
        }

        /**
         * set rotate to the specified values
         * @param {number} deg     angle of the rotation in degrees
         * @param {number} centreX horizontal position of the centre of the rotation
         * @param {number} centreY vertical position of the centre of the rotation
         */

    }, {
        key: 'setRotate',
        value: function setRotate(deg, centreX, centreY) {
            this.setParameter("rotate", [deg, centreX, centreY]);
        }

        /**
         * rotate by 90 degrees to the right
         * @param  {number} centreX horizontal position of the centre of the rotation
         * @param  {number} centreY vertical position of the centre of the rotation
         */

    }, {
        key: 'rotateRight',
        value: function rotateRight(centreX, centreY) {
            if (this.getIndex("rotate") === -1) {
                this.setRotate(90, centreX, centreY);
            } else {
                var newRotation = (parseInt(this.getRotate().deg) + 90) % 360;

                if (newRotation === 180) {
                    // swap centre coordinates
                    // because rotate(c, x, y) is defined like transform(-x, -y) rotate(c) transform(x, y)
                    var a = centreX;
                    centreX = centreY;
                    centreY = a;
                }

                this.setRotate(newRotation, centreX, centreY);
            }
        }

        /**
         * get the transform values in a string
         * @return {string} string that can be used as a value for the transform property of a SVG element
         */

    }, {
        key: 'get',
        value: function get() {
            var retVal = "";
            for (var i = 0; i < this.items.length; i++) {
                if (i !== 0) {
                    retVal += " ";
                }
                retVal += this.items[i].get();
            }
            return retVal;
        }

        /**
         * get arguments of a property specified by index
         * @param  {number} index index of the property
         * @return {array}       array of arguments of the specified property
         */

    }, {
        key: 'getArguments',
        value: function getArguments(index) {
            return this.items[index].args;
        }

        /**
         * set argumets of a property specified by name
         * @param {string} name name of the property
         * @param {array} args array of arguments of the specified property
         */

    }, {
        key: 'setParameter',
        value: function setParameter(name, args) {
            // determine index of the parameter (if set), else index == -1
            var index = this.getIndex(name);

            // if the property has been already set, change it (rewrite the array in the right index)
            // else create a new one (set index to the length of an array --> ad an item to the end)
            if (index === -1) {
                index = this.items.length;
                this.items[index] = new Property();
                this.items[index].setName(name);
            }

            // save args under the right index
            this.items[index].setArguments(args);
        }
    }]);

    return Transform;
}();

/**
 * parent class for all network elements
 */


var NetworkElement = function () {
    /**
     * Basic constructor for NetworkElement
     * @param {Canvas} parentSVG reference to the instance of {@link Canvas} that this element belongs to
     */
    function NetworkElement(parentSVG) {
        _classCallCheck(this, NetworkElement);

        if (!parentSVG) {
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


    _createClass(NetworkElement, [{
        key: 'onMouseDown',


        /**
         * empty callback function to prevent error messages, function is implemented later in the {@link Box} class
         */
        value: function onMouseDown() {}

        /**
         * empty function to prevent error messages, function is implemented later in the {@link Box} and {@link Connector} classes
         */

    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {}

        /**
         * empty function to prevent error messages, function is implemented later in the {@link Box} class
         */

    }, {
        key: 'onMouseMove',
        value: function onMouseMove() {}

        /**
         * "virtual" getter for json data, prints an error that it has to be redefined in the derived classes
         */

    }, {
        key: 'id',
        get: function get() {
            return this.svgObj.id;
        }
    }, {
        key: 'exportData',
        get: function get() {
            console.error("'json' getter has not been defined for this element", this);
            return undefined;
        }
    }]);

    return NetworkElement;
}();

/**
 * parent class for input and output connectors
 * @extends NetworkElement
 */


var Connector = function (_NetworkElement) {
    _inherits(Connector, _NetworkElement);

    /**
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} gridSize  size of the grid in SVG pixels
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    function Connector(parentSVG, gridSize, left, top) {
        _classCallCheck(this, Connector);

        /**
         * size of the grid in SVG pixels
         * @type {number}
         */
        var _this = _possibleConstructorReturn(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).call(this, parentSVG));

        _this.gridSize = gridSize;
        /**
         * size of the connector in SVG pixels
         * @type {number}
         */
        _this.connectorSize = gridSize;
        /**
         * offset of the connector from the grid in SVG pixels
         * @type {number}
         */
        _this.connectorOffset = _this.connectorSize / 2;

        /**
         * instance of {@link svgObjects.svgObj} that holds all SVG information about this connector
         * @type {svgObj}
         */
        _this.svgObj = new svgObj.Rectangle(left * _this.gridSize - _this.connectorOffset, top * _this.gridSize - _this.connectorOffset, _this.connectorSize, _this.connectorSize, "none", "black");

        _this.svgObj.$el.addClass("connector");

        /**
         * this flag describes whether this connector is an input connector
         * @type {Boolean}
         */
        _this.isInputConnector = false;

        /**
         * current logical state of this connector
         * @type {Logic.state}
         */
        _this.elementState = _logic2.default.state.unknown;
        _this.svgObj.addClass(stateClasses.unknown);

        /**
         * set of ids of all wires connected to this connector
         * @type {Set}
         */
        _this.wireIds = new Set();
        return _this;
    }

    /**
     * whether this connector is an output connector
     * @return {Boolean}
     */


    _createClass(Connector, [{
        key: 'addWireId',


        /**
         * add a wire id to the list of wire ids
         * @param {string} wireId
         */
        value: function addWireId(wireId) {
            this.wireIds.add(wireId);
        }

        /**
         * remove a wire id from the list of wire ids
         * @param {string} wireId
         */

    }, {
        key: 'removeWireId',
        value: function removeWireId(wireId) {
            this.wireIds.delete(wireId);
        }

        /**
         * remove a wire specified by ID and update the connector
         * @param  {string} wireId ID of the wire to be removed
         */

    }, {
        key: 'removeWireIdAndUpdate',
        value: function removeWireIdAndUpdate(wireId) {
            this.removeWireId(wireId);
        }

        /**
         * set logical state of the connector
         * @param {Logic.state} state new state of the connector
         */

    }, {
        key: 'setState',
        value: function setState(state) {
            this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);

            switch (state) {
                case _logic2.default.state.unknown:
                    this.svgObj.addClass(stateClasses.unknown);
                    break;
                case _logic2.default.state.on:
                    this.svgObj.addClass(stateClasses.on);
                    break;
                case _logic2.default.state.off:
                    this.svgObj.addClass(stateClasses.off);
                    break;
                case _logic2.default.state.oscillating:
                    this.svgObj.addClass(stateClasses.oscillating);
                    break;
            }

            this.elementState = state;
        }

        /**
         * get state of this connector
         * @return {Logic.state}
         */

    }, {
        key: 'get',


        /**
         * get svgObj instance content of this connector
         * @return {svgObjects.Rectangle}
         */
        value: function get() {
            return this.svgObj;
        }

        /**
         * call [wireCreationHelper](./module-Canvas.html#wireCreationHelper) on mouse up
         */

    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            this.parentSVG.wireCreationHelper(this.svgObj.id);
        }
    }, {
        key: 'isOutputConnector',
        get: function get() {
            return !this.isInputConnector;
        }

        /**
         * whether this connector is an output connector
         * @return {Boolean}
         */
        ,
        set: function set(value) {
            this.isInputConnector = !value;
        }
    }, {
        key: 'state',
        get: function get() {
            return this.elementState;
        }
    }]);

    return Connector;
}(NetworkElement);

/**
 * Connector that gets its state from a connected value and passes it through to the {@link Box} this connector belongs to.
 * @extends Connector
 */


var InputConnector = exports.InputConnector = function (_Connector) {
    _inherits(InputConnector, _Connector);

    /**
     * Call the constructor from the parent {@link Connector} class and set isInputConnector to true.
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} gridSize  size of the grid in SVG pixels
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    function InputConnector(parentSVG, gridSize, left, top) {
        _classCallCheck(this, InputConnector);

        var _this2 = _possibleConstructorReturn(this, (InputConnector.__proto__ || Object.getPrototypeOf(InputConnector)).call(this, parentSVG, gridSize, left, top));

        _this2.isInputConnector = true;
        return _this2;
    }

    /**
     * Call the setState method of {@link Connector} and than refresh the state of the connected {@link Box}
     * @param {Logic.state} state new {@link Logic.state} of the connector
     */


    _createClass(InputConnector, [{
        key: 'setState',
        value: function setState(state) {
            _get(InputConnector.prototype.__proto__ || Object.getPrototypeOf(InputConnector.prototype), 'setState', this).call(this, state);

            var gate = this.parentSVG.getBoxByConnectorId(this.svgObj.id);
            gate.refreshState();
        }

        /**
         * remove the wire (by calling the removeWireIdAndUpdate of {@link Connector})
         * and update state of this connector by setting it to undefined using the setState method
         * @param  {string} wireId ID of the {@link Wire}
         */

    }, {
        key: 'removeWireIdAndUpdate',
        value: function removeWireIdAndUpdate(wireId) {
            _get(InputConnector.prototype.__proto__ || Object.getPrototypeOf(InputConnector.prototype), 'removeWireIdAndUpdate', this).call(this, wireId);
            this.setState(_logic2.default.state.unknown);
        }
    }]);

    return InputConnector;
}(Connector);

/**
 * Connector that takes a state defined by the {@link Box} it belongs to and passes it to all connected wire
 * @extends Connector
 */


var OutputConnector = exports.OutputConnector = function (_Connector2) {
    _inherits(OutputConnector, _Connector2);

    /**
     * Call the constructor from the parent {@link Connector} class and set isOutputConnector to true.
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} gridSize  size of the grid in SVG pixels
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    function OutputConnector(parentSVG, gridSize, left, top) {
        _classCallCheck(this, OutputConnector);

        var _this3 = _possibleConstructorReturn(this, (OutputConnector.__proto__ || Object.getPrototypeOf(OutputConnector)).call(this, parentSVG, gridSize, left, top));

        _this3.isOutputConnector = true;
        return _this3;
    }

    /**
     * Call the setState method of {@link Connector} and than set the state of the connected {@link Wire}s
     * @param {Logic.state} state new {@link Logic.state} of the connector
     */


    _createClass(OutputConnector, [{
        key: 'setState',
        value: function setState(state) {
            _get(OutputConnector.prototype.__proto__ || Object.getPrototypeOf(OutputConnector.prototype), 'setState', this).call(this, state);

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.wireIds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var wireId = _step3.value;

                    this.parentSVG.getWireById(wireId).setState(state);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }]);

    return OutputConnector;
}(Connector);

/**
 * Parent class for gates and input and output boxes. Defines all the factors
 * that the boxes have in common (svgObj structure, draggability and rotatability...)
 * @extends NetworkElement
 */


var Box = function (_NetworkElement2) {
    _inherits(Box, _NetworkElement2);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string} name       name of the element (input, output, and, or, xor...)
     * @param {string} category   type of the element (io, gate)
     * @param {number} gridWidth  width of the element in grid pixels
     * @param {number} gridHeight height of the element in grid pixels
     */
    function Box(parentSVG, name, category, gridWidth, gridHeight) {
        _classCallCheck(this, Box);

        /**
         * specifies the box type within the category (input/output in io, and/or/... in gate)
         * @type {string}
         */
        var _this4 = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, parentSVG));

        _this4.name = name;

        /**
         * specifies the box category (io for input or output, gate for logic gates)
         * @type {string}
         */
        _this4.category = category;

        /**
         * size of the grid in SVG pixels
         * @type {number}
         */
        _this4.gridSize = _this4.parentSVG.gridSize;

        /**
         * url of the image depicting this object
         * @type {string}
         */
        _this4.url = "img/" + _this4.category + "/" + _this4.name + ".svg";

        /**
         * array of connectors of this box
         * @type {Array}
         */
        _this4.connectors = [];

        /**
         * svgObj containing all SVG data used to display this box
         * @type {svgObj}
         */
        _this4.svgObj = new svgObj.Group();

        /**
         * width of this element in SVG pixels
         * @type {number}
         */
        _this4.width = gridWidth * _this4.gridSize;
        /**
         * height of this element in SVG pixels
         * @type {number}
         */
        _this4.height = gridHeight * _this4.gridSize;

        /**
         * width of this element in grid pixels
         * @type {number}
         */
        _this4.gridWidth = gridWidth;
        /**
         * height of this element in grid pixels
         * @type {number}
         */
        _this4.gridHeight = gridHeight;

        // transparent background rectangle
        var rectangle = new svgObj.Rectangle(0, 0, _this4.width, _this4.height, "none", "none");
        rectangle.$el.addClass('rect');

        _this4.svgObj.addChild(rectangle);
        // image of the element
        _this4.image = new svgObj.SvgImage(0, 0, _this4.width, _this4.height, _this4.url);
        _this4.svgObj.addChild(_this4.image);

        // add draggability and rotatability
        _this4.svgObj.draggable(true);
        _this4.svgObj.rotatable(true);

        // add type="gate", used in special callbacks in contextmenu
        _this4.svgObj.addAttr({ "type": category });

        _this4.svgObj.$el.addClass("box");
        _this4.svgObj.$el.addClass(category);

        _this4.generateBlockNodes();
        return _this4;
    }

    /**
     * get all input connectors of this box
     * @return {Array} array of input connectors
     */


    _createClass(Box, [{
        key: 'generateBlockNodes',


        /**
         * get set of nodes that are not suitable for wire routing
         * @param  {Number} [marginTop=0]    top margin of the element (distance from the element that should be also blocked)
         * @param  {Number} [marginRight=0]  right margin of the element
         * @param  {Number} [marginBottom=0] bottom margin of the element
         * @param  {Number} [marginLeft=0]   left margin of the element
         * @param  {Number} specialNodes     additional nodes that should be added to the set
         * @return {Set}                     set of not suitable nodes
         */
        value: function generateBlockNodes() {
            var marginTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var marginRight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var marginBottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var marginLeft = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            this.blockedNodes = new Set();
            for (var x = marginLeft; x <= this.gridWidth - marginRight; x++) {
                for (var y = marginTop; y <= this.gridHeight - marginBottom; y++) {
                    this.blockedNodes.add({
                        x: x,
                        y: y
                    });
                }
            }

            for (var _len = arguments.length, specialNodes = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
                specialNodes[_key - 4] = arguments[_key];
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = specialNodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var node = _step4.value;

                    this.blockedNodes.add(node);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }

        /**
         * empty function, redefined in inherited elements
         * refreshState takes input connector values and sets output values accordingly
         */

    }, {
        key: 'refreshState',
        value: function refreshState() {
            console.warn("Calling the virtual function refreshState has no effect.");
        }

        /**
         * change image to another one that ends with a specified suffix
         *
         * *usage:* `changeImage("abc")` changes image url to `image-abc.svg`,
         * `changeImage()` changes image url to the default one (`image.svg`)
         * @param  {string} [suffix] new suffix for the image
         */

    }, {
        key: 'changeImage',
        value: function changeImage(suffix) {
            if (suffix === undefined || suffix === "") {
                suffix = "";
            } else {
                suffix = "-" + suffix;
            }
            this.url = "img/" + this.category + "/" + this.name + suffix + ".svg";

            this.image.changeUrl(this.url);
        }

        /**
         * get a jQuery element representing this box
         * @return {jQuery.element}
         */

    }, {
        key: 'get',
        value: function get() {
            return this.svgObj.get();
        }

        /**
         * remove a specific onde from the set of blocked nodes
         * @param  {number} x horizontal position of the blocked node in grid pixels
         * @param  {number} y vertical position of the blocked node in grid pixels
         */

    }, {
        key: 'removeBlockedNode',
        value: function removeBlockedNode(x, y) {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.blockedNodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var item = _step5.value;

                    if (item.x === x && item.y === y) {
                        this.blockedNodes.delete(item);
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }

        /**
         * rotate the set of blocked nodes to the right
         *
         * used to rotate the nodes when the object itself is rotated
         */

    }, {
        key: 'rotateBlockedNodesRight',
        value: function rotateBlockedNodesRight() {
            var _this5 = this;

            if (this.rotation === undefined || this.rotation === 4) {
                this.rotation = 0;
            }
            this.rotation++;

            if (this.rotation === 1 || this.rotation === 3) {
                var newBlockedNodes = new Set();
                this.blockedNodes.forEach(function (item) {
                    newBlockedNodes.add({
                        x: Math.abs(item.y - _this5.gridHeight),
                        y: item.x
                    });
                });
                this.blockedNodes = newBlockedNodes;
            } else if (this.rotation === 2 || this.rotation === 4) {
                var _newBlockedNodes = new Set();
                this.blockedNodes.forEach(function (item) {
                    _newBlockedNodes.add({
                        x: Math.abs(item.y - _this5.gridWidth),
                        y: item.x
                    });
                });
                this.blockedNodes = _newBlockedNodes;
            }
        }

        /**
         * add a connector to the element on the specified position
         * @param {number}  left             horizontal distance from the left edge of the element
         * @param {number}  top              vertical distance from the top edge of the element
         * @param {Boolean} isInputConnector whether or not should this connector an input connector (`true` for input connector, `false` for output connector)
         */

    }, {
        key: 'addConnector',
        value: function addConnector(left, top, isInputConnector) {
            var index = this.connectors.length;
            if (isInputConnector) {
                this.connectors[index] = new InputConnector(this.parentSVG, this.gridSize, left, top);
            } else {
                this.connectors[index] = new OutputConnector(this.parentSVG, this.gridSize, left, top);
            }
            this.svgObj.addChild(this.connectors[index].get());

            this.removeBlockedNode(left, top);
        }

        /**
         * add an input connector to the element on the specified position
         * @param {number} left horizontal distance from the left edge of the element
         * @param {number} top  vertical distance from the top edge of the element
         */

    }, {
        key: 'addInputConnector',
        value: function addInputConnector(left, top) {
            return this.addConnector(left, top, true);
        }

        /**
         * add an output connector to the element on the specified position
         * @param {number} left horizontal distance from the left edge of the element
         * @param {number} top  vertical distance from the top edge of the element
         */

    }, {
        key: 'addOutputConnector',
        value: function addOutputConnector(left, top) {
            return this.addConnector(left, top, false);
        }

        /**
         * get the connector object based on its id
         * @param  {string} connectorId ID of the {@link Connector}
         * @return {Connector}             instance of the {@link Connector} or `undefined` if not found
         */

    }, {
        key: 'getConnectorById',
        value: function getConnectorById(connectorId) {
            for (var i = 0; i < this.connectors.length; i++) {
                if (this.connectors[i].id === connectorId) {
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

    }, {
        key: 'getTransform',
        value: function getTransform() {
            var gridPixels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var transform = void 0;
            if (!this.svgObj.$el.attr("transform")) {
                // the element does not have a "transform" property --> create it
                transform = new Transform();
                transform.setTranslate(0, 0);
                this.svgObj.addAttr({ "transform": transform.get() });
            } else {
                // the element does have a "transform" property --> change it
                transform = new Transform(this.svgObj.$el.attr("transform"));
            }

            // convert values to grid pixels
            if (gridPixels) {
                transform.toGridPixels(this.parentSVG);
            }

            return transform;
        }

        /**
         * get the instance of {@link Transform} representing the state of the transform attribute of this element _with lenght units in grid pixels_
         * @return {Transform} {@link Transform} of the element
         */

    }, {
        key: 'getGridPixelTransform',
        value: function getGridPixelTransform() {
            return getTransform(true);
        }

        /**
         * set the transform attribute of this element
         * @param {Transform} transform {@link Transform} of the element (with lengths specified in SVG pixels)
         */

    }, {
        key: 'setTransform',
        value: function setTransform(transform) {
            this.svgObj.addAttr({ "transform": transform.get() });
        }

        /**
         * function that is called on every mouse down on this element
         *
         * moves the element to the front and calls onMouseDownLeft if applicable
         * @param  {jQuery.MouseEvent} event
         */

    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            this.mouseLeft = false;
            if (event.which === 1) {
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

    }, {
        key: 'onMouseDownLeft',
        value: function onMouseDownLeft(event) {
            this.mouseMoved = false;

            var transform = this.getTransform();

            // save the current item position into a variable
            var currentPosition = transform.getTranslate();

            var _parentSVG$viewbox$tr = this.parentSVG.viewbox.transformEvent(event),
                pageX = _parentSVG$viewbox$tr.pageX,
                pageY = _parentSVG$viewbox$tr.pageY;

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

    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            if (this.mouseLeft) {
                this.svgObj.$el.addClass('grabbed');

                this.mouseMoved = true;

                var _parentSVG$viewbox$tr2 = this.parentSVG.viewbox.transformEvent(event),
                    pageX = _parentSVG$viewbox$tr2.pageX,
                    pageY = _parentSVG$viewbox$tr2.pageY;

                var left = pageX - this.offset.x;
                var top = pageY - this.offset.y;

                var transform = this.getTransform();
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

    }, {
        key: 'onMouseUp',
        value: function onMouseUp(event) {
            if (event.which === 1) {
                if (this.mouseMoved) {
                    this.onDrop(event);
                } else {
                    this.onClick();
                }
            } else if (event.which === 2) {
                this.onClickMiddle();
            }

            this.svgObj.$el.removeClass('grabbed');
        }

        /**
         * called by onMouseUp when the mouse has been moved between onMouseDown and onMouseUp
         *
         * applies grid snapping of the element on the end of the "drag and drop" action
         * @param  {jQuery.MouseEvent} event
         */

    }, {
        key: 'onDrop',
        value: function onDrop(event) {
            var _parentSVG$viewbox$tr3 = this.parentSVG.viewbox.transformEvent(event),
                pageX = _parentSVG$viewbox$tr3.pageX,
                pageY = _parentSVG$viewbox$tr3.pageY;

            var left = pageX - this.offset.x;
            var top = pageY - this.offset.y;

            left = this.parentSVG.snapToGrid(left);
            top = this.parentSVG.snapToGrid(top);

            var transform = this.getTransform();
            transform.setTranslate(left, top);

            this.setTransform(transform);

            this.updateWires();
        }

        /**
         * empty function, will be redefined in InputBox
         */

    }, {
        key: 'onClick',
        value: function onClick() {}

        /**
         * custom callback function for middle click that rotates the box by 90 degrees to the right
         */

    }, {
        key: 'onClickMiddle',
        value: function onClickMiddle() {
            // get the transform value for this box
            var transform = this.getTransform();

            // get the bounding rectangle for this box
            var rect = this.svgObj.$el[0].getBoundingClientRect();

            // use the bounding rectangle dimensions to figure out the geometrical centre of the box
            var centreX = Math.round(rect.width / 2);
            var centreY = Math.round(rect.height / 2);

            centreX -= centreX % this.gridSize;
            centreY -= centreY % this.gridSize;

            // apply the rotation to the transform object
            transform.rotateRight(centreX, centreY);

            // apply the modified transform object ot the svgObj
            this.svgObj.addAttr({ "transform": transform.get() });

            // rotate also the blocked nodes
            this.rotateBlockedNodesRight();

            // update the wires
            this.updateWires();
        }

        /**
         * Updates all wires connected to this box. Iterates over all wires that are connected to this box
         * and calls routeWire (or temporaryWire if the `temporary` parameter is set to true) to update the wire routing
         * @param  {Boolean} [temporary=false] [description]
         */

    }, {
        key: 'updateWires',
        value: function updateWires() {
            var _this6 = this;

            var temporary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.connectors.forEach(function (conn) {
                conn.wireIds.forEach(function (wireId) {
                    var wire = _this6.parentSVG.getWireById(wireId);
                    if (temporary) {
                        wire.temporaryWire();
                    } else {
                        wire.routeWire();
                    }
                });
            });
        }
    }, {
        key: 'inputConnectors',
        get: function get() {
            return this.connectors.filter(function (conn) {
                return conn.isInputConnector;
            });
        }

        /**
         * get all output connectors of this box
         * @return {Array} array of output connectors
         */

    }, {
        key: 'outputConnectors',
        get: function get() {
            return this.connectors.filter(function (conn) {
                return conn.isOutputConnector;
            });
        }

        /**
         * get data of this box as a JSON-ready object
         * @return {Object} javascript object containing essential data for this box
         */

    }, {
        key: 'exportData',
        get: function get() {
            var connections = [];

            // go through all connectors
            var counter = 0;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.connectors[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var conn = _step6.value;

                    // go through each its wire id
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;

                    try {
                        for (var _iterator7 = conn.wireIds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var item = _step7.value;

                            var thisWireId = void 0;
                            if (!this.parentSVG.exportWireIdMap.has(item)) {
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
                    } catch (err) {
                        _didIteratorError7 = true;
                        _iteratorError7 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                _iterator7.return();
                            }
                        } finally {
                            if (_didIteratorError7) {
                                throw _iteratorError7;
                            }
                        }
                    }

                    counter++;
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            return {
                name: this.name,
                category: this.category,
                transform: this.getTransform(true),
                connections: connections
            };
        }
    }]);

    return Box;
}(NetworkElement);

/**
 * InputBox has only output connectors and is used to set the input states for the logic network.
 * @extends Box
 */


var InputBox = exports.InputBox = function (_Box) {
    _inherits(InputBox, _Box);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {Boolean} [isOn=false] the initial state of the inputbox (`true` is *on*, `false` is *off*)
     */
    function InputBox(parentSVG) {
        var isOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, InputBox);

        var width = 7;
        var height = 4;

        var _this7 = _possibleConstructorReturn(this, (InputBox.__proto__ || Object.getPrototypeOf(InputBox)).call(this, parentSVG, "input", "io", width, height));

        _this7.addConnector(width, height / 2, false);

        _this7.on = isOn;
        return _this7;
    }

    /**
     * get data of this input box as a JSON-ready object
     * @return {Object} javascript object containing essential data for this input box
     */


    _createClass(InputBox, [{
        key: 'generateBlockNodes',
        value: function generateBlockNodes() {
            _get(InputBox.prototype.__proto__ || Object.getPrototypeOf(InputBox.prototype), 'generateBlockNodes', this).call(this, 0, 1, 1, 0);
        }

        /**
         * start a new simulation from the output connector
         */

    }, {
        key: 'refreshState',
        value: function refreshState() {
            this.parentSVG.startNewSimulation(this.connectors[0], this.connectors[0].state);
        }

        /**
         * set the state of the inputbox to the corresponding value
         * @param  {Boolean} isOn set to *on* if `true`, set to *off* if `false`
         */

    }, {
        key: 'onClick',


        /**
         * toggle the state of the inputbox
         */
        value: function onClick() {
            this.on = !this.on;
        }
    }, {
        key: 'exportData',
        get: function get() {
            var data = _get(InputBox.prototype.__proto__ || Object.getPrototypeOf(InputBox.prototype), 'exportData', this);
            data.isOn = this.isOn;
            return data;
        }
    }, {
        key: 'on',
        set: function set(isOn) {
            if (isOn) {
                // turn on
                this.changeImage("on");
                this.connectors[0].setState(_logic2.default.state.on);
                this.refreshState();
            } else {
                // turn off
                this.changeImage();
                this.connectors[0].setState(_logic2.default.state.off);
                this.refreshState();
            }

            this.isOn = isOn;
        }

        /**
         * get the state of the inputbox (`true` if *on*, `false` if *off*)
         * @return {Boolean} [description]
         */
        ,
        get: function get() {
            return this.isOn;
        }
    }]);

    return InputBox;
}(Box);

/**
 * OutputBox has only input connectors and is used to visualize the output states of the logic network.
 * @extends Box
 */


var OutputBox = exports.OutputBox = function (_Box2) {
    _inherits(OutputBox, _Box2);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     */
    function OutputBox(parentSVG) {
        _classCallCheck(this, OutputBox);

        var height = 4;
        var width = 5;

        var _this8 = _possibleConstructorReturn(this, (OutputBox.__proto__ || Object.getPrototypeOf(OutputBox)).call(this, parentSVG, "output", "io", width, height));

        _this8.addConnector(0, height / 2, true);
        return _this8;
    }

    /**
     * set state of this output box to match the state of its input connector
     */


    _createClass(OutputBox, [{
        key: 'refreshState',
        value: function refreshState() {
            this.setState(this.connectors[0].state);
        }

        /**
         * Reflect the input connector state in the appearance of the element - set
         * the element image to represent the corresponding state
         * @param {Logic.state} state new state of this outputBox
         */

    }, {
        key: 'setState',
        value: function setState(state) {
            switch (state) {
                case _logic2.default.state.on:
                    this.changeImage("on");
                    break;
                case _logic2.default.state.off:
                    this.changeImage("off");
                    break;
                case _logic2.default.state.unknown:
                    this.changeImage();
                    break;
                case _logic2.default.state.oscillating:
                    this.changeImage("osc");
                    break;
            }
        }
    }, {
        key: 'generateBlockNodes',
        value: function generateBlockNodes() {
            _get(OutputBox.prototype.__proto__ || Object.getPrototypeOf(OutputBox.prototype), 'generateBlockNodes', this).call(this, 0, 0, 0, 1);
        }
    }]);

    return OutputBox;
}(Box);

/**
 * Gate is a box that processes the states of its input connectors and returns the result in its output connectors.
 * @extends Box
 */


var Gate = exports.Gate = function (_Box3) {
    _inherits(Gate, _Box3);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string} name       name of the gate (and, not, xor...)
     */
    function Gate(parentSVG, name) {
        _classCallCheck(this, Gate);

        var width = 9;
        var height = 4;

        // output
        var _this9 = _possibleConstructorReturn(this, (Gate.__proto__ || Object.getPrototypeOf(Gate)).call(this, parentSVG, name, "gate", width, height));

        _this9.addConnector(width, height / 2, false);

        if (_this9.name === "not") {
            // input
            _this9.addConnector(0, height / 2, true);
        } else {
            // input
            _this9.addConnector(0, height / 4, true);
            _this9.addConnector(0, height / (4 / 3), true);

            // add one blockedNode between the inputs (for better looking wiring)
            // and regenerate blocked nodes
            _this9.generateBlockNodes({
                x: 0,
                y: height / 2
            });
        }

        _this9.refreshState();
        return _this9;
    }

    _createClass(Gate, [{
        key: 'generateBlockNodes',
        value: function generateBlockNodes(specialNode) {
            if (specialNode !== undefined) {
                _get(Gate.prototype.__proto__ || Object.getPrototypeOf(Gate.prototype), 'generateBlockNodes', this).call(this, 0, 1, 0, 1, specialNode);
            } else {
                _get(Gate.prototype.__proto__ || Object.getPrototypeOf(Gate.prototype), 'generateBlockNodes', this).call(this, 0, 1, 0, 1);
            }
        }

        /**
         * proccess the input connector states and reflect them in the output connector states according
         * to the logic corresponding to this gate's name
         */

    }, {
        key: 'refreshState',
        value: function refreshState() {
            var state = _logic2.default.state.unknown;
            switch (this.name) {
                case "and":
                    state = _logic2.default.and(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "nand":
                    state = _logic2.default.nand(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "nor":
                    state = _logic2.default.nor(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "not":
                    state = _logic2.default.not(this.connectors[1].state);
                    break;
                case "or":
                    state = _logic2.default.or(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "xnor":
                    state = _logic2.default.xnor(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "xor":
                    state = _logic2.default.xor(this.connectors[1].state, this.connectors[2].state);
                    break;
            }
            // notify the simulator about this change
            this.parentSVG.simulation.notifyChange(this.connectors[0].id, state);
        }
    }]);

    return Gate;
}(Box);

/**
 * Blackbox is a box that is defined by its evaluation function
 * @extends Box
 */


var Blackbox = exports.Blackbox = function (_Box4) {
    _inherits(Blackbox, _Box4);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {number} inputConnectors  number of input connectors
     * @param {number} outputConnectors number of output connectors
     * @param {Function} evalFunction   function that takes `inputConnectors` [Logic.state](./module-Logic.html#.state)s
     *                                  and returns `outputConnectors` Logic.states.
     * @param {String} [name]        name that will be displayed on the blackbox
     */
    function Blackbox(parentSVG, inputConnectors, outputConnectors, evalFunction) {
        var name = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

        _classCallCheck(this, Blackbox);

        var width = 11;
        var height = Math.max(inputConnectors, outputConnectors) * 2;

        var _this10 = _possibleConstructorReturn(this, (Blackbox.__proto__ || Object.getPrototypeOf(Blackbox)).call(this, parentSVG, name, "blackbox", width, height));

        var connectorPinLenght = 2.5 * _this10.gridSize;

        // override default svgObj structure
        _this10.svgObj = new svgObj.Group();

        // transparent background rectangle
        var hitbox = new svgObj.Rectangle(0, 0, _this10.width, _this10.height, "none", "none");
        hitbox.$el.addClass('rect');

        _this10.svgObj.addChild(hitbox);

        // main rectangle
        var bodyWidth = _this10.width - 2 * connectorPinLenght;

        var rectangle = new svgObj.Rectangle(connectorPinLenght, 0, bodyWidth, _this10.height, "white", "black");
        rectangle.addAttr({ 'stroke-width': '2.5' });
        rectangle.$el.addClass('rect');

        _this10.svgObj.addChild(rectangle);

        // text description of the box
        var textWidth = bodyWidth - _this10.gridSize;
        var textHeight = _this10.height - _this10.gridSize;
        var text = new svgObj.MultiLineText((_this10.width - textWidth) / 2, // horizontal centering
        (_this10.height - textHeight) / 2, // vertical centering
        textWidth, _this10.height, name.toUpperCase(), _this10.gridSize * 1.2);
        _this10.svgObj.addChild(text);

        // add input connectors
        for (var i = 0; i < inputConnectors; ++i) {
            var gridPosition = i * 2 + 1;
            var pixelPosition = gridPosition * _this10.gridSize;

            var pin = new svgObj.PolyLine(new svgObj.PolylinePoints([new svgObj.PolylinePoint(0, pixelPosition), new svgObj.PolylinePoint(connectorPinLenght, pixelPosition)]), "black", 1);

            _this10.svgObj.addChild(pin);

            // add the connector
            _this10.addInputConnector(0, gridPosition);
        }

        // add output connectors
        for (var _i = 0; _i < outputConnectors; ++_i) {
            var _gridPosition = _i * 2 + 1;
            var _pixelPosition = _gridPosition * _this10.gridSize;

            var _pin = new svgObj.PolyLine(new svgObj.PolylinePoints([new svgObj.PolylinePoint(_this10.width - connectorPinLenght, _pixelPosition), new svgObj.PolylinePoint(_this10.width, _pixelPosition)]), "black", 1);

            _this10.svgObj.addChild(_pin);

            _this10.addOutputConnector(width, _gridPosition);
        }

        // add draggability and rotatability
        _this10.svgObj.draggable(true);
        _this10.svgObj.rotatable(true);

        _this10.svgObj.$el.addClass("box");

        /**
         * function that takes `inputConnectors` [Logic.state](./module-Logic.html#.state)s
         * and returns `outputConnectors` Logic.states.
         */
        _this10.evalFunction = evalFunction;
        return _this10;
    }

    /**
     * get data of this blackbox as a JSON-ready object
     * @return {Object} javascript object containing essential data for this blackbox
     */


    _createClass(Blackbox, [{
        key: 'refreshState',


        /**
         * proccess the input connector states and reflect them in the output connector states according
         * to the logic defined by this.evalFunction
         */
        value: function refreshState() {
            var inputStates = this.inputConnectors.map(function (conn) {
                return conn.state;
            });
            // call the evalFunction to get the output states
            var outputStates = this.evalFunction.apply(this, _toConsumableArray(inputStates));

            // apply the outputStates to the outputConnectors
            for (var i = 0; i < outputStates.length; ++i) {
                this.outputConnectors[i].setState(outputStates[i]);
            }
        }
    }, {
        key: 'exportData',
        get: function get() {
            var data = _get(Blackbox.prototype.__proto__ || Object.getPrototypeOf(Blackbox.prototype), 'exportData', this);
            data.inputs = this.inputConnectors.length;
            data.outputs = this.outputConnectors.length;

            // generate the truth table

            data.table = [];

            // array of tested input states
            var stateList = _logic2.default.stateList;

            // recursive function that generates all possible inputs
            var getPermutations = function getPermutations(length) {
                var permutations = [];
                switch (length) {
                    case 0:
                        return [];
                    case 1:
                        var _iteratorNormalCompletion8 = true;
                        var _didIteratorError8 = false;
                        var _iteratorError8 = undefined;

                        try {
                            for (var _iterator8 = stateList[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                var state = _step8.value;

                                permutations.push([state]);
                            }
                        } catch (err) {
                            _didIteratorError8 = true;
                            _iteratorError8 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                    _iterator8.return();
                                }
                            } finally {
                                if (_didIteratorError8) {
                                    throw _iteratorError8;
                                }
                            }
                        }

                        return permutations;
                    default:
                        var shorterPermutations = getPermutations(length - 1);
                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;

                        try {
                            for (var _iterator9 = stateList[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                var _state = _step9.value;
                                var _iteratorNormalCompletion10 = true;
                                var _didIteratorError10 = false;
                                var _iteratorError10 = undefined;

                                try {
                                    for (var _iterator10 = shorterPermutations[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                        var perm = _step10.value;

                                        permutations.push([_state].concat(_toConsumableArray(perm)));
                                    }
                                } catch (err) {
                                    _didIteratorError10 = true;
                                    _iteratorError10 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                            _iterator10.return();
                                        }
                                    } finally {
                                        if (_didIteratorError10) {
                                            throw _iteratorError10;
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError9 = true;
                            _iteratorError9 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                    _iterator9.return();
                                }
                            } finally {
                                if (_didIteratorError9) {
                                    throw _iteratorError9;
                                }
                            }
                        }

                        return permutations;
                }
            };

            // generate outputs for all the possible inputs
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = getPermutations(data.inputs)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var inputValues = _step11.value;

                    var outputValues = this.evalFunction.apply(this, _toConsumableArray(inputValues));

                    // if there is an output value that is not Logic.state.unknown, add this line to the
                    // truthtable, otherwise don't add it (if all output values are Logic.state.unknown,
                    // the input combination does not have to be defines, because Logic.state.unknown is the default value)
                    if (outputValues.reduce(function (accumulator, current) {
                        return accumulator || current !== _logic2.default.state.unknown;
                    })) {
                        data.table.push([].concat(_toConsumableArray(inputValues), _toConsumableArray(outputValues)));
                    }
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            return data;
        }
    }]);

    return Blackbox;
}(Box);

/**
 * Wire represents connection of two {@link Connector}s.
 * @extends NetworkElement
 */


var Wire = exports.Wire = function (_NetworkElement3) {
    _inherits(Wire, _NetworkElement3);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string}  fromId    id of the first connector this wire will be connected to
     * @param {string}  toId      id of the second connector this wire will be connected to
     * @param {number}  gridSize       size of the grid in SVG pixels
     * @param {Boolean} [refresh=true] if `true`, the [Canvas](./module-Canvas.html) will refresh after creating this wire
     */
    function Wire(parentSVG, fromId, toId, gridSize) {
        var refresh = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        _classCallCheck(this, Wire);

        var _this11 = _possibleConstructorReturn(this, (Wire.__proto__ || Object.getPrototypeOf(Wire)).call(this, parentSVG));
        // small TODO: rework start... end... to arrays? (not important)

        _this11.gridSize = gridSize;

        _this11.fromId = fromId;
        _this11.toId = toId;

        _this11.startBox = _this11.parentSVG.getBoxByConnectorId(fromId);
        _this11.endBox = _this11.parentSVG.getBoxByConnectorId(toId);

        _this11.boxes = [_this11.startBox, _this11.endBox];

        _this11.startConnector = _this11.parentSVG.getConnectorById(fromId);
        _this11.endConnector = _this11.parentSVG.getConnectorById(toId);

        _this11.connectors = [_this11.startConnector, _this11.endConnector];
        _this11.routeWire(true, refresh);

        _this11.elementState = _logic2.default.state.unknown;

        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
            for (var _iterator12 = _this11.connectors[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                var connector = _step12.value;

                if (connector.isOutputConnector) {
                    _this11.setState(connector.state);
                }
            }
        } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                    _iterator12.return();
                }
            } finally {
                if (_didIteratorError12) {
                    throw _iteratorError12;
                }
            }
        }

        _this11.svgObj.$el.addClass("wire");
        return _this11;
    }

    /**
     * get data of this wire as a JSON-ready object
     * @return {Object} javascript object containing essential data for this wire
     */


    _createClass(Wire, [{
        key: 'setState',


        /**
         * set the state of this wire to match the state of the input connector it is connected to
         * @param {Logic.state} state [description]
         */
        value: function setState(state) {
            this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);

            switch (state) {
                case _logic2.default.state.unknown:
                    this.svgObj.addClass(stateClasses.unknown);
                    break;
                case _logic2.default.state.on:
                    this.svgObj.addClass(stateClasses.on);
                    break;
                case _logic2.default.state.off:
                    this.svgObj.addClass(stateClasses.off);
                    break;
                case _logic2.default.state.oscillating:
                    this.svgObj.addClass(stateClasses.oscillating);
                    break;
            }

            if (this.startConnector.isInputConnector) {
                this.startConnector.setState(state);
            }
            if (this.endConnector.isInputConnector) {
                this.endConnector.setState(state);
            }

            this.elementState = state;
        }

        /**
         * get the current [Logic.state](./modules-Logic.html#.state) of this wire
         * @return {Logic.state}
         */

    }, {
        key: 'updateWireState',


        /**
         * update the state of this wire
         */
        value: function updateWireState() {
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = this.boxes[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var box = _step13.value;

                    box.refreshState();
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }
        }

        /**
         * get the jQuery element for this wire
         * @return {jQuery.element}
         */

    }, {
        key: 'get',
        value: function get() {
            return this.svgObj.get();
        }

        /**
         * get the polyline points for a temporary wire placement connecting the two connectors
         * @return {PolylinePoints} new instance of {@link PolylinePoints}
         */

    }, {
        key: 'getTemporaryWirePoints',
        value: function getTemporaryWirePoints() {
            var points = new svgObj.PolylinePoints();
            points.append(new svgObj.PolylinePoint(this.wireStart.x, this.wireStart.y));
            points.append(new svgObj.PolylinePoint(this.wireEnd.x, this.wireEnd.y));
            return points;
        }

        /**
         * route the wire using the temporary wire points
         */

    }, {
        key: 'temporaryWire',
        value: function temporaryWire() {
            this.wireStart = this.getCoordinates(this.startConnector, false);
            this.wireEnd = this.getCoordinates(this.endConnector, false);

            this.setWirePath(this.getTemporaryWirePoints());
        }

        /**
         * route the wire using the modified A* wire routing algorithm
         */

    }, {
        key: 'routeWire',
        value: function routeWire() {
            var snapToGrid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.wireStart = this.getCoordinates(this.startConnector, snapToGrid);
            this.wireEnd = this.getCoordinates(this.endConnector, snapToGrid);

            this.points = this.aStar({
                x: this.wireStart.x / this.gridSize,
                y: this.wireStart.y / this.gridSize
            }, {
                x: this.wireEnd.x / this.gridSize,
                y: this.wireEnd.y / this.gridSize
            });

            this.setWirePath(this.points);

            if (refresh) this.updateWireState();
        }

        /**
         * set the wire to follow the specified points
         * @param {PolylinePoints} points instance of {@link PolylinePoints}
         */

    }, {
        key: 'setWirePath',
        value: function setWirePath(points) {
            // set the line
            if (this.svgObj !== undefined) {
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

        /**
         * Heavily modified implementation of the A* algorithm
         * @param  {Object} start object containing numeric attributes `x` and `y` that represent the first endpoint of the wire
         * @param  {Object} end   object containing numeric attributes `x` and `y` that represent the second endpoint of the wire
         * @return {PolylinePoints} instance of {@link PolylinePoints}
         */

    }, {
        key: 'aStar',
        value: function aStar(start, end) {
            var wireCrossPunishment = 2;
            var wireBendPunishment = 1;

            // number of nodes, that can be opened at once
            // once is this limit exceeded, aStar will fail and getTemporaryWirePoints will be used instead
            var maxNodeLimit = 50000;

            var closedNodes = new Set();
            var openNodes = new Set();
            openNodes.add(start);

            var cameFrom = new Map();

            // default value: infinity
            var gScore = new Structures.MapWithDefaultValue(Infinity);
            gScore.set(start, 0);

            // default value: infinity
            var fScore = new Structures.MapWithDefaultValue(Infinity);
            fScore.set(start, Wire.manhattanDistance(start, end));

            var nonRoutable = this.parentSVG.getNonRoutableNodes();
            var punishedButRoutable = void 0;
            if (this.svgObj === undefined) {
                punishedButRoutable = this.parentSVG.getInconvenientNodes();
            } else {
                punishedButRoutable = this.parentSVG.getInconvenientNodes(this.svgObj.id);
            }

            while (openNodes.size > 0) {
                var currentNode = void 0;
                var currentNodeFScore = void 0;

                // find the value from openNodes that has the lowest fScore
                // (can be implemented effectively using min-heap data structure (maybe TODO sometime)?)
                var _iteratorNormalCompletion14 = true;
                var _didIteratorError14 = false;
                var _iteratorError14 = undefined;

                try {
                    for (var _iterator14 = openNodes[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                        var node = _step14.value;

                        if (!currentNode || fScore.get(node) < currentNodeFScore) {
                            currentNode = node;
                            currentNodeFScore = fScore.get(currentNode);
                        }
                    }
                } catch (err) {
                    _didIteratorError14 = true;
                    _iteratorError14 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion14 && _iterator14.return) {
                            _iterator14.return();
                        }
                    } finally {
                        if (_didIteratorError14) {
                            throw _iteratorError14;
                        }
                    }
                }

                if (svgObj.PolylinePoint.equals(currentNode, end)) {
                    return this.reconstructPath(cameFrom, currentNode);
                }

                openNodes.delete(currentNode);
                closedNodes.add(currentNode);

                // the farthest points accessible without avoiding obstacles in every direction
                // (but max 50 in each direction)
                for (var direction = 0; direction < 4; direction++) {
                    var newPoint = Wire.movePoint(currentNode, direction);
                    for (var i = 0; i < 50; i++) {
                        // if newPoint is in the set of non routable points,
                        // don't add it and stop proceeding in this direction
                        if (Wire.setHasThisPoint(nonRoutable, this.scalePointToGrid(newPoint))) {
                            break;
                        }

                        // skip this node, if it has been already closed
                        // or if it is on the list of non routable nodes
                        if (closedNodes.has(newPoint)) {
                            continue;
                        }

                        if (!openNodes.has(newPoint)) {
                            openNodes.add(newPoint);
                        }

                        // calculate possible GScore by adding 1 to the score of the node we came from
                        // (we prioritize to minimize the number of nodes and not the distance,
                        //  so we are adding 1 on all nodes, even if the euclidean / mannhatan distance may vary)
                        var increment = wireBendPunishment;
                        var possibleGScore = gScore.get(currentNode) + increment;

                        if (Wire.setHasThisPoint(punishedButRoutable, this.scalePointToGrid(newPoint))) {
                            // if the node is in the set of punished node, punish it by adding to the GScore
                            possibleGScore += wireCrossPunishment;
                        }

                        // skip this node if it has worst estimage gscore than in the gscore table
                        if (possibleGScore >= gScore.get(newPoint)) {
                            continue;
                        }

                        cameFrom.set(newPoint, currentNode);
                        gScore.set(newPoint, possibleGScore);
                        fScore.set(newPoint, possibleGScore + Wire.manhattanDistance(newPoint, end));

                        // if newPoint is in the set of punished but routable points,
                        // add it but stop proceeding in this direction
                        if (Wire.setHasThisPoint(punishedButRoutable, this.scalePointToGrid(newPoint))) {
                            break;
                        }

                        // move to the next point in the direciton
                        newPoint = Wire.movePoint(newPoint, direction);
                    }
                }

                if (openNodes.size > maxNodeLimit) {
                    break;
                }
            }
            // if we got here, the path does not exist -> let's use temporary path ignoring all colisions
            return this.getTemporaryWirePoints();
        }

        /**
         * Helper that moves the passed point in the specified direction. It simply adds or subtracts 1 from one of the coordinates depending on the direction attribute.
         * @param  {Object} point     object containing numeric attributes `x` and `y`
         * @param  {number} direction directions:
         *                              - 0: up
         *                              - 1: right
         *                              - 2: down
         *                              - 3: left
         * @return {Object}           object containing numeric attributes `x` and `y`
         */

    }, {
        key: 'scalePointToGrid',


        /**
         * multiply the point coordinates by the grid size
         * @param  {Object} point object containing numeric attributes `x` and `y` in grid pixels
         * @return {Object}       the same point but containing numeric attributes `x` and `y` in SVG pixels
         */
        value: function scalePointToGrid(point) {
            return {
                x: point.x * this.gridSize,
                y: point.y * this.gridSize
            };
        }

        /**
         * helper backtracking function used by the aStar algorithm to construct the final {@link PolylinePoints}
         * @param  {Object} cameFrom    object containing numeric attributes `x` and `y`
         * @param  {Object} currentNode object containing numeric attributes `x` and `y`
         * @return {PolylinePoints}     instance of {@link PolylinePoints} that represents the path found by the aStar algorithm
         */

    }, {
        key: 'reconstructPath',
        value: function reconstructPath(cameFrom, currentNode) {
            var totalPath = new svgObj.PolylinePoints();
            totalPath.append(new svgObj.PolylinePoint(currentNode.x * this.gridSize, currentNode.y * this.gridSize));

            while (cameFrom.has(currentNode)) {
                currentNode = cameFrom.get(currentNode);
                totalPath.append(new svgObj.PolylinePoint(currentNode.x * this.gridSize, currentNode.y * this.gridSize));
            }

            return totalPath;
        }

        /**
         * returns the Manhattan distance between the points _a_ and _b_
         * @param  {Object} a object containing numeric attributes `x` and `y`
         * @param  {Object} b object containing numeric attributes `x` and `y`
         * @return {number}
         */

    }, {
        key: 'getCoordinates',


        /**
         * get the coordinates of the specified connector
         * @param  {Connector}  connector      instance of {@link Connector}
         * @param  {Boolean} [snapToGrid=true] if true, the connector position will be snapped to the grid
         * @return {Object}                    point - object containing numeric attributes `x` and `y`
         */
        value: function getCoordinates(connector) {
            var snapToGrid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            // connector.svgObj.id has to be called, else the getCoordinates does not work on the first call in Firefox 55
            var dummy = connector.svgObj.id;

            var $connector = connector.svgObj.$el;

            var position = $connector.position();

            position.left = this.parentSVG.viewbox.transformX(position.left);
            position.top = this.parentSVG.viewbox.transformY(position.top);

            var width = $connector.attr("width");
            var height = $connector.attr("height");

            var x = position.left + width / 2;
            var y = position.top + height / 2;
            if (snapToGrid) {
                x = this.parentSVG.snapToGrid(x);
                y = this.parentSVG.snapToGrid(y);
            }

            return {
                x: x,
                y: y
            };
        }
    }, {
        key: 'exportData',
        get: function get() {
            return {
                fromId: this.fromId,
                toId: this.toId
            };
        }
    }, {
        key: 'state',
        get: function get() {
            return this.elementState;
        }
    }], [{
        key: 'movePoint',
        value: function movePoint(point, direction) {
            switch (direction) {
                case 0:
                    // up
                    return {
                        x: point.x,
                        y: point.y - 1
                    };
                case 1:
                    // right
                    return {
                        x: point.x + 1,
                        y: point.y
                    };
                case 2:
                    // down
                    return {
                        x: point.x,
                        y: point.y + 1
                    };
                case 3:
                    // left
                    return {
                        x: point.x - 1,
                        y: point.y
                    };
            }
        }
    }, {
        key: 'manhattanDistance',
        value: function manhattanDistance(a, b) {
            // Manhattan geometry
            return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
        }

        /**
         * returns `true` if the specified set of points contains the specified point (and returns `false` otherwise)
         * @param {Set} set set of points
         * @param {Object} point object containing numeric attributes `x` and `y`
         */

    }, {
        key: 'setHasThisPoint',
        value: function setHasThisPoint(set, point) {
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = set[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var item = _step15.value;

                    if (item.x === point.x && item.y === point.y) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }

            return false;
        }
    }]);

    return Wire;
}(NetworkElement);

},{"./logic.js":7,"./structuresAndClasses.js":11,"./svgObjects.js":12}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _importExport = require('./importExport.js');

var _networkLibrary = require('./networkLibrary.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * FloatingButton represents a button that is used in the floating menu in the right bottom corner
 * of the application. It may have a custom tooltip and callback on the click event
 */
var FloatingButton =
/**
 * @param {string} buttonClass Custom string that identifies the SVG icon used on this button. This string is also added as a CSS class to the button.
 * @param {string} tooltip     tooltip for the button, that will be displayed on hover and also used as alternative title for the image
 * @param {Function} clickEvent  custom callback when user clicks the button
 * @param {Canvas} parentSVG   reference to the parent SVG element
 */
function FloatingButton(buttonClass, tooltip, clickEvent, parentSVG) {
    var _this = this;

    _classCallCheck(this, FloatingButton);

    /**
     * jQuery element representing the button
     * @type {jQuery.element}
     */
    this.$el = $('<a>');

    // add classes to the element
    this.$el.addClass("button");
    this.$el.addClass(buttonClass);

    // add the icon
    this.$el.append($("<img>").attr("src", 'img/gui/' + buttonClass + '.svg').attr("alt", tooltip));

    // add the tooltip element and an event listener if tooltip is defined
    if (tooltip) {
        /**
         * jQuery element representing the tooltip
         * @type {jQuery.element}
         */
        this.$tooltip = $("<div>");
        this.$tooltip.addClass("tooltip").html(tooltip);

        parentSVG.$svg.after(this.$tooltip);

        this.$el.hover(function () {
            _this.$tooltip.fadeIn(200);
        }, function () {
            _this.$tooltip.fadeOut(200);
        });
    }

    // add an event listener on click, if the callback function is defined
    if (clickEvent) {
        this.$el.on("click", clickEvent);
    }
};

/** @module FloatingMenu */
/**
 * Class to represent the floating menu in the right bottom corner of the page.
 * It instantiates all the buttons and their callbacks.
 */


var FloatingMenu = function () {
    /**
     * @param {Canvas} parentSVG reference to the Canvas element this menu is associated with
     */
    function FloatingMenu(parentSVG) {
        _classCallCheck(this, FloatingMenu);

        /**
         * the jQuery element containing all buttons
         * @type {jQuery.element}
         */
        this.$el = $('<div>');

        var id = 'floatingMenu';

        this.$el.attr("id", id);

        var $loader = $("<div>").addClass("loader").addClass("hidden");

        /* IMPORT */

        // here will be the instance of Lity stored
        // (we need to store it, because the "import" button also closes Lity)
        var lityInstance = void 0;

        this.append(new FloatingButton("import", "Import a network from a file", function () {
            var $popup = $("<div>").addClass("importExport").addClass("import");

            var textareaId = "importJSON";
            var $textblock = $("<textarea>").attr('id', textareaId);

            $popup.append($textblock).append($("<a>").attr({
                "href": "#",
                "class": "upload"
            }).append($("<img>").attr('src', "img/gui/import.svg")).append(" import from JSON").on('click', function () {
                $popup.children().addClass("hidden");
                $loader.removeClass("hidden");

                var data = JSON.parse($('#' + textareaId).val());

                // proccess the imported data
                parentSVG.importData(data).then(function () {
                    // close Lity
                    lityInstance.close();
                });
            })).append($loader);

            lityInstance = lity($popup);

            // focus on the textblock
            $textblock.focus();
        }, parentSVG));

        /* LOAD FROM LIBRARY */
        this.append(new FloatingButton("library", "Load a network from the library", function () {

            var $popup = $("<div>").addClass("importExport").addClass("library");

            var $list = $("<ul>");
            $popup.append($list).append($loader);

            (0, _networkLibrary.getLibrary)().then(function (networkList) {
                var _loop = function _loop(networkInfo) {
                    if (networkInfo.hasNetwork || networkInfo.hasTable) {
                        var $listItem = $("<li>").append($("<span class='name'>").append(networkInfo.name));

                        if (networkInfo.hasNetwork) {
                            $listItem.append($("<a>").append("load as network").attr("href", "#").on("click", function () {
                                $popup.children().addClass("hidden");
                                $loader.removeClass("hidden");

                                (0, _networkLibrary.getNetworkFromLibrary)(networkInfo.file).then(function (response) {
                                    // proccess the imported data
                                    parentSVG.importData(response).then(function () {
                                        // close Lity
                                        lityInstance.close();
                                    });
                                });
                            }));
                        }

                        if (networkInfo.hasTable) {
                            $listItem.append($("<a>").append("load in blackbox").attr("href", "#").on("click", function () {
                                $popup.children().addClass("hidden");
                                $loader.removeClass("hidden");

                                (0, _networkLibrary.getNetworkFromLibrary)(networkInfo.file).then(function (response) {
                                    parentSVG.importBlackbox(response.blackbox, response.name);

                                    // close Lity
                                    lityInstance.close();
                                });
                            }));
                        }
                        $list.append($listItem);
                    }
                };

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = networkList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var networkInfo = _step.value;

                        _loop(networkInfo);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            });

            $popup.append();

            lityInstance = lity($popup);
        }, parentSVG));

        /* EXPORT */
        this.append(new FloatingButton("export", "Get code for this network", function () {
            var data = new _importExport.exportNetwork(parentSVG);

            // create the popup container holding all popup content (that will be passed to lity)
            var $popup = $("<div>").addClass("importExport").addClass("export");

            // generate the block with code to be displayed and append it to the popup element
            var $textblock = $("<textarea>").text(data.json(_importExport.exportNetwork.style.pretty));

            $popup.append($textblock);

            // generate the links
            $popup.append($("<a>").attr({
                "href": data.json(_importExport.exportNetwork.style.pretty, true),
                "class": "download",
                "download": "network.json"
            }).append($("<img>").attr('src', "img/gui/export.svg")).append(" expanded JSON"));
            $popup.append($("<a>").attr({
                "href": data.json(_importExport.exportNetwork.style.compact, true),
                "class": "download",
                "download": "network.min.json"
            }).append($("<img>").attr('src', "img/gui/export.svg")).append(" compact JSON"));

            lity($popup);

            // highlight the text in the textblock
            $textblock.select();
        }, parentSVG));

        /* HELP */

        var help = new FloatingButton("help", "Display a help page", false, parentSVG);
        help.$el.attr({
            'href': './docs/user.html',
            'data-lity': ''
        });
        this.append(help);

        parentSVG.$svg.after(this.$el);
    }

    /**
     * append a FloatingButton to this menu
     * @param  {FloatingButton} menuItem append an instance of  {@link FloatingButton} to this menu
     */


    _createClass(FloatingMenu, [{
        key: 'append',
        value: function append(menuItem) {
            this.$el.append(menuItem.$el);
        }
    }]);

    return FloatingMenu;
}();

exports.default = FloatingMenu;

},{"./importExport.js":6,"./networkLibrary.js":9}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fn = function () {
    function Fn() {
        _classCallCheck(this, Fn);
    }

    _createClass(Fn, null, [{
        key: "deepCopy",
        value: function deepCopy(arr) {
            return $.extend(true, [], arr);
        }
    }, {
        key: "addMouseScrollEventListener",
        value: function addMouseScrollEventListener(query, func) {
            var MouseWheelHandler = function MouseWheelHandler(event) {
                var event = window.event || event; // old IE support
                event.delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));

                func(event);

                return false;
            };

            // TODO add more backwards compatibility somehow
            var svgelement = document.querySelector(query);

            if (svgelement.addEventListener) {
                // IE9, Chrome, Safari, Opera
                svgelement.addEventListener("mousewheel", MouseWheelHandler, false);
                // Firefox
                svgelement.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
            } else {
                // IE 6/7/8
                svgelement.attachEvent("onmousewheel", MouseWheelHandler);
            }
            svgelement.addEventListener('mousewheel', function (e) {
                console.log('event', e);
            }, false);
        }
    }]);

    return Fn;
}();

exports.default = Fn;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var exportNetwork = exports.exportNetwork = function () {
    function exportNetwork(parentSVG) {
        _classCallCheck(this, exportNetwork);

        this.parentSVG = parentSVG;
    }

    _createClass(exportNetwork, [{
        key: "json",
        value: function json() {
            var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : exportNetwork.style.compact;
            var dataUri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (dataUri) {
                return 'data:application/json;charset=utf-8,' + encodeURIComponent(this.json(style));
            } else {
                switch (style) {
                    case exportNetwork.style.compact:
                        return JSON.stringify(this.exportData);
                    case exportNetwork.style.pretty:
                        return JSON.stringify(this.exportData, null, 2);
                }
            }
        }
    }, {
        key: "exportData",
        get: function get() {
            return this.parentSVG.exportData;
        }
    }], [{
        key: "style",
        get: function get() {
            return {
                pretty: 0,
                compact: 1
            };
        }
    }]);

    return exportNetwork;
}();

},{}],7:[function(require,module,exports){
"use strict";

/** @module Logic */
/**
 * definitions of logic states and basic logic functions used in the simulation
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logic = function () {
    function Logic() {
        _classCallCheck(this, Logic);
    }

    _createClass(Logic, null, [{
        key: "and",
        value: function and(a, b) {
            return Logic.testLogicRulesSymmetric(a, b, [[Logic.state.on, Logic.state.on, Logic.state.on], [Logic.state.on, Logic.state.off, Logic.state.off], [Logic.state.on, Logic.state.unknown, Logic.state.unknown], [Logic.state.on, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.off, Logic.state.off, Logic.state.off], [Logic.state.off, Logic.state.unknown, Logic.state.off], [Logic.state.off, Logic.state.oscillating, Logic.state.off], [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown], [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown], [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]]);
        }
    }, {
        key: "nand",
        value: function nand(a, b) {
            return Logic.not(Logic.and(a, b));
        }
    }, {
        key: "nor",
        value: function nor(a, b) {
            return Logic.not(Logic.or(a, b));
        }
    }, {
        key: "not",
        value: function not(a) {
            if (a === Logic.state.on) {
                return Logic.state.off;
            } else if (a === Logic.state.off) {
                return Logic.state.on;
            } else {
                return a;
            }
        }
    }, {
        key: "or",
        value: function or(a, b) {
            return Logic.testLogicRulesSymmetric(a, b, [[Logic.state.on, Logic.state.on, Logic.state.on], [Logic.state.on, Logic.state.off, Logic.state.on], [Logic.state.on, Logic.state.unknown, Logic.state.on], [Logic.state.on, Logic.state.oscillating, Logic.state.on], [Logic.state.off, Logic.state.off, Logic.state.off], [Logic.state.off, Logic.state.unknown, Logic.state.unknown], [Logic.state.off, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown], [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown], [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]]);
        }
    }, {
        key: "xnor",
        value: function xnor(a, b) {
            return Logic.not(Logic.xor(a, b));
        }
    }, {
        key: "xor",
        value: function xor(a, b) {
            return Logic.testLogicRulesSymmetric(a, b, [[Logic.state.on, Logic.state.on, Logic.state.off], [Logic.state.on, Logic.state.off, Logic.state.on], [Logic.state.on, Logic.state.unknown, Logic.state.unknown], [Logic.state.on, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.off, Logic.state.off, Logic.state.off], [Logic.state.off, Logic.state.unknown, Logic.state.unknown], [Logic.state.off, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown], [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown], [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]]);
        }

        /**
         * Enum for logic states.
         *
         * States:
         * - `unknown`
         * - `on`
         * - `off`
         * - `oscillating`
         * @type {Number}
         */

    }, {
        key: "testLogicRulesSymmetric",
        value: function testLogicRulesSymmetric(a, b, rules) {
            for (var i = 0; i < rules.length; i++) {
                if (rules[i][0] === a && rules[i][1] === b || rules[i][0] === b && rules[i][1] === a) {
                    return rules[i][2];
                }
            }
        }
    }, {
        key: "state",
        get: function get() {
            return {
                unknown: 0,
                on: 1,
                off: 2,
                oscillating: 3
            };
        }

        /**
         * list of all states that can be used in the simulation
         *
         * This getter iterates over Logic.state and returns an array containing all values of Logic.state's members
         * @type {Array}
         */

    }, {
        key: "stateList",
        get: function get() {
            var states = [];

            // iterate over all defined states and add their values to the states array
            Object.keys(Logic.state).forEach(function (key) {
                states.push(Logic.state[key]);
            });

            return states;
        }
    }]);

    return Logic;
}();

exports.default = Logic;

},{}],8:[function(require,module,exports){
"use strict";

var _canvas = require("./canvas.js");

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * When the document is ready, initialize the application
 */
$(function () {
  new _canvas2.default("#canvas", 10);
});

},{"./canvas.js":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLibrary = getLibrary;
exports.getNetworkFromLibrary = getNetworkFromLibrary;

var libraryDir = './library/';

function getLibrary() {
    return new Promise(function (resolve, reject) {
        var libraryFile = libraryDir + 'networkList.json';

        var request = new XMLHttpRequest();

        request.addEventListener("load", function () {
            if (this.response) {
                resolve(this.response.networks);
            }
        });

        request.open('GET', libraryFile, true);
        request.responseType = 'json';
        request.send();
    });
}

function getNetworkFromLibrary(networkName) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.addEventListener("load", function () {
            if (this.response) {
                resolve(this.response);
            }
        });

        request.open('GET', libraryDir + networkName + '.json', true);
        request.responseType = 'json';
        request.send();
    });
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logic = require('./logic.js');

var _logic2 = _interopRequireDefault(_logic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stateChange = function stateChange(connectorId, state, whoCausedIt) {
    _classCallCheck(this, stateChange);

    this.connectorId = connectorId;
    this.state = state;
    this.whoCausedIt = whoCausedIt;
};

// all connectors mentioned here are OUTPUT CONNECTORS


var Simulation = function () {
    function Simulation(parentSVG) {
        _classCallCheck(this, Simulation);

        this.parentSVG = parentSVG;

        // maps each affected output connector to it's directly preceeding output connectors
        this.predecessors = new Map();

        // maps waveId -> array of outputConnectors affected
        this.waves = new Map();
        this.wave = 0;

        this.cycledConnectors = new Map();
        this.resolvedCycledConnectors = new Set();
    }

    _createClass(Simulation, [{
        key: 'run',
        value: function run() {
            this.wave++;
            while (this.waves.has(this.wave)) {
                this.step();
                this.waves.delete(this.wave); // clean old waves on the go
                this.wave++;
            }
        }
    }, {
        key: 'step',
        value: function step() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.waves.get(this.wave)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref = _step.value;
                    var connectorId = _ref.connectorId;
                    var state = _ref.state;
                    var whoCausedIt = _ref.whoCausedIt;

                    // skip resolved cycles
                    if (this.resolvedCycledConnectors.has(connectorId)) {
                        continue;
                    }

                    // skip connector that are cycles
                    if (this.cycledConnectors.has(connectorId)) {
                        // get the set of states that this connector appeared from the moment the signal first cycled
                        var states = this.cycledConnectors.get(connectorId);

                        // if the connector already had this state in this cycle, resolve the cycle
                        if (states.has(state)) {

                            // if there are more states in the set, the connector is oscillating
                            // (else it keeps its state and we just break the cycle)
                            if (states.size > 1) {
                                state = _logic2.default.state.oscillating;
                            }

                            // mark this connector as resolved
                            this.resolvedCycledConnectors.add(connectorId);

                            // this is a new, unseen state, add it to the set and continue simulating the cycle
                        } else {
                            states.add(state);
                        }

                        // map the modified set of states to the connector
                        this.cycledConnectors.set(connectorId, states);
                    }

                    this.whoCausedIt = connectorId;
                    /*  process all outputConnectors by setting their state
                        this will trigger a following event chain:
                            outputConnector changes
                            -> all connected wires change
                            -> all inputConnectors connected to these wires change
                            -> all elements that contain these inputConnectors change
                            -> these elements compute the new state of their output connectors and call notifyChange()
                    */

                    if (whoCausedIt) {
                        this.addPredecessor(connectorId, whoCausedIt);
                    }

                    if (!this.cycledConnectors.has(connectorId) && this.getAllPredecessors(connectorId).has(connectorId)) {
                        this.cycledConnectors.set(connectorId, new Set([state]));
                    }

                    // reflect the changes in SVG
                    var connector = this.parentSVG.getConnectorById(connectorId);
                    if (connector) {
                        connector.setState(state);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.whoCausedIt = undefined;
        }

        // mark a predecessorConnectorId as a predecessor of connectorId

    }, {
        key: 'addPredecessor',
        value: function addPredecessor(connectorId, predecessorConnectorId) {
            if (!this.predecessors.has(connectorId)) {
                this.predecessors.set(connectorId, new Set());
            }

            this.predecessors.get(connectorId).add(predecessorConnectorId);
        }

        // returns set of all output connectors, that are before this output connector

    }, {
        key: 'getAllPredecessors',
        value: function getAllPredecessors(connectorId) {
            if (!this.predecessors.has(connectorId)) {
                this.predecessors.set(connectorId, new Set());
            }

            var all = new Set();

            this.predecessors.get(connectorId).forEach(all.add, all);

            var prevSize = 0;
            var size = all.size;
            while (prevSize < size) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = all[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var connector = _step2.value;

                        if (this.predecessors.has(connector)) {
                            this.predecessors.get(connector).forEach(all.add, all);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                prevSize = size;
                size = all.size;
            }

            return all;
        }
    }, {
        key: 'notifyChange',
        value: function notifyChange(connectorId, state) {
            var waveId = this.wave + 1;

            if (!this.waves.has(waveId)) {
                this.waves.set(waveId, []);
            }

            this.waves.get(waveId).push(new stateChange(connectorId, state, this.whoCausedIt));
        }
    }]);

    return Simulation;
}();

exports.default = Simulation;

},{"./logic.js":7}],11:[function(require,module,exports){
"use strict";

// singleton to generate unique id's

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var existingIdInstance = null;
// usage: let id = new Id().unique

var Id = exports.Id = function () {
    function Id() {
        _classCallCheck(this, Id);

        if (!existingIdInstance) {
            existingIdInstance = this;
        }

        this.prefix = "id";
        this.nextId = 0;

        return existingIdInstance;
    }

    _createClass(Id, [{
        key: "generate",
        value: function generate() {
            return this.prefix + this.nextId;
        }
    }, {
        key: "unique",
        get: function get() {
            var retVal = this.generate();

            // find next unused idXXXX to prevent id collision that might be caused by some other component
            // (it really should not happen, but this is a simple method to ensure safety)
            while ($("#" + retVal).length) {
                this.nextId++;
                retVal = this.generate();
            }
            // return this id
            this.nextId++;

            return retVal;
        }
    }]);

    return Id;
}();

// to es5 compiler friendly implementation ("calling a builtin Map constructor without new is forbidden")


var MapWithDefaultValue = exports.MapWithDefaultValue = function () {
    function MapWithDefaultValue(defaultValue) {
        _classCallCheck(this, MapWithDefaultValue);

        this.map = new Map();
        this.default = defaultValue;
    }

    _createClass(MapWithDefaultValue, [{
        key: "clear",
        value: function clear() {
            return this.map.clear();
        }
    }, {
        key: "forEach",
        value: function forEach() {
            var _map;

            return (_map = this.map).forEach.apply(_map, arguments);
        }
    }, {
        key: "get",
        value: function get(key) {
            return this.map.get(key);
        }
    }, {
        key: "delete",
        value: function _delete(key) {
            return this.map.delete(key);
        }
    }, {
        key: "set",
        value: function set(key, value) {
            return this.map.set(key, value);
        }
    }, {
        key: "has",
        value: function has(key) {
            return this.map.has(key);
        }
    }, {
        key: "entries",
        value: function entries() {
            return this.map.entries();
        }
    }, {
        key: "keys",
        value: function keys() {
            return this.map.keys();
        }
    }, {
        key: "values",
        value: function values() {
            return this.map.values();
        }
    }, {
        key: "size",
        get: function get() {
            return this.map.size;
        }
    }]);

    return MapWithDefaultValue;
}();

/*
// es6 implementation
export class MapWithDefaultValue extends Map {
    constructor(defaultValue) {
        super();

        this.default = defaultValue;
    }

    get(key) {
        if(this.has(key)) {
            return super.get(key);
        } else {
            return this.default;
        }
    }
}
*/

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pattern = exports.MultiLineText = exports.Text = exports.PolyLine = exports.PolylinePoints = exports.PolylinePoint = exports.Group = exports.SvgImage = exports.Rectangle = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _structuresAndClasses = require("./structuresAndClasses.js");

var Structures = _interopRequireWildcard(_structuresAndClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tag = function () {
    function Tag(tagName) {
        _classCallCheck(this, Tag);

        this.tagName = tagName;

        this.$el = $("<" + this.tagName + ">");

        this.id = new Structures.Id().unique;
    }

    _createClass(Tag, [{
        key: "addClass",
        value: function addClass(name) {
            this.$el.addClass(name);
        }
    }, {
        key: "removeClasses",
        value: function removeClasses() {
            for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
                classes[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this.$el.removeClass(item);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "addAttr",
        value: function addAttr(assoc) {
            this.checkIfElementExistsInDOM();

            // add attributes to the element
            this.$el.attr(assoc);
        }
    }, {
        key: "getAttr",
        value: function getAttr(name) {
            this.checkIfElementExistsInDOM();

            return this.$el.attr(name);
        }
    }, {
        key: "removeAttr",
        value: function removeAttr(name) {
            this.checkIfElementExistsInDOM();

            this.$el.removeAttr(name);
        }
    }, {
        key: "get",
        value: function get() {
            this.checkIfElementExistsInDOM();
            return this.$el;
        }

        // if the element exists in dom, we need to fetch it using jQuery

    }, {
        key: "checkIfElementExistsInDOM",
        value: function checkIfElementExistsInDOM() {
            var $jqElement = $("#" + this.$el.attr('id'));
            if ($jqElement.length) {
                this.$el = $jqElement;
            }
        }
    }, {
        key: "id",
        set: function set(id) {
            this.addAttr({ "id": id });
        },
        get: function get() {
            return this.getAttr("id");
        }
    }]);

    return Tag;
}();

var Draggable = function (_Tag) {
    _inherits(Draggable, _Tag);

    function Draggable(tagName) {
        _classCallCheck(this, Draggable);

        return _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, tagName));
    }

    _createClass(Draggable, [{
        key: "draggable",
        value: function draggable(value) {
            this.addAttr({ "draggable": value });
        }
    }]);

    return Draggable;
}(Tag);

var Rotatable = function (_Tag2) {
    _inherits(Rotatable, _Tag2);

    function Rotatable(tagName) {
        _classCallCheck(this, Rotatable);

        return _possibleConstructorReturn(this, (Rotatable.__proto__ || Object.getPrototypeOf(Rotatable)).call(this, tagName));
    }

    _createClass(Rotatable, [{
        key: "rotatable",
        value: function rotatable(value) {
            this.addAttr({ "rotatable": value });
        }
    }]);

    return Rotatable;
}(Tag);

// there is no multiple inheritance in ES6, so I have to do something ugly like this


var DraggableRotatable = function (_Draggable) {
    _inherits(DraggableRotatable, _Draggable);

    function DraggableRotatable(tagName) {
        _classCallCheck(this, DraggableRotatable);

        return _possibleConstructorReturn(this, (DraggableRotatable.__proto__ || Object.getPrototypeOf(DraggableRotatable)).call(this, tagName));
    }

    _createClass(DraggableRotatable, [{
        key: "rotatable",
        value: function rotatable(value) {
            this.addAttr({ "rotatable": value });
        }
    }]);

    return DraggableRotatable;
}(Draggable);

var SvgElement = function (_DraggableRotatable) {
    _inherits(SvgElement, _DraggableRotatable);

    function SvgElement(x, y, w, h, tagName) {
        _classCallCheck(this, SvgElement);

        var _this4 = _possibleConstructorReturn(this, (SvgElement.__proto__ || Object.getPrototypeOf(SvgElement)).call(this, tagName));

        _this4.addAttr({
            x: x,
            y: y,
            width: w,
            height: h
        });
        return _this4;
    }

    return SvgElement;
}(DraggableRotatable);

var Rectangle = exports.Rectangle = function (_SvgElement) {
    _inherits(Rectangle, _SvgElement);

    function Rectangle(x, y, w, h, fill, stroke) {
        _classCallCheck(this, Rectangle);

        var _this5 = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, x, y, w, h, "rect"));

        _this5.addAttr({
            fill: fill,
            stroke: stroke,
            'stroke-width': 0.5,
            'pointer-events': 'all' // to trigger hover even with transparent background
        });
        return _this5;
    }

    return Rectangle;
}(SvgElement);

var SvgImage = exports.SvgImage = function (_SvgElement2) {
    _inherits(SvgImage, _SvgElement2);

    function SvgImage(x, y, w, h, url) {
        _classCallCheck(this, SvgImage);

        var _this6 = _possibleConstructorReturn(this, (SvgImage.__proto__ || Object.getPrototypeOf(SvgImage)).call(this, x, y, w, h, "image"));

        _this6.addAttr({
            "xlink:href": url
        });
        return _this6;
    }

    _createClass(SvgImage, [{
        key: "changeUrl",
        value: function changeUrl(url) {
            this.addAttr({
                "xlink:href": url
            });
        }
    }]);

    return SvgImage;
}(SvgElement);

var Group = exports.Group = function (_DraggableRotatable2) {
    _inherits(Group, _DraggableRotatable2);

    function Group() {
        _classCallCheck(this, Group);

        return _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, "g"));
    }

    _createClass(Group, [{
        key: "addChild",
        value: function addChild(el) {
            this.$el.append(el.$el);
            return el; // pro jednodussi "let rect = g.addChild(new Rectangle(..."
        }
    }]);

    return Group;
}(DraggableRotatable);

var PolylinePoint = exports.PolylinePoint = function () {
    function PolylinePoint(x, y) {
        _classCallCheck(this, PolylinePoint);

        this.x = 0;
        this.y = 0;
        if (x !== undefined && y !== undefined) {
            this.x = x;
            this.y = y;
        }
    }

    _createClass(PolylinePoint, [{
        key: "set",
        value: function set(x, y) {
            this.x = x;
            this.y = y;
        }
    }, {
        key: "string",
        get: function get() {
            return this.x + "," + this.y;
        }
    }], [{
        key: "parseFromString",
        value: function parseFromString(string) {
            var arr = string.split(",");
            return new PolylinePoint(arr[0], arr[1]);
        }
    }, {
        key: "equals",
        value: function equals(a, b) {
            return a.x === b.x && a.y === b.y;
        }
    }]);

    return PolylinePoint;
}();

var SmartArray = function () {
    function SmartArray(arr) {
        _classCallCheck(this, SmartArray);

        if (arr !== undefined) {
            this.arr = arr;
        } else {
            this.arr = [];
        }
    }

    _createClass(SmartArray, [{
        key: "copy",
        value: function copy() {
            return SmartArray($.extend(true, [], this.arr));
        }
    }, {
        key: "append",
        value: function append(point) {
            return this.addWithIndex(point, this.arr.length);
        }
    }, {
        key: "prepend",
        value: function prepend(point) {
            return this.addWithIndex(point, 0);
        }

        // add a point at the specified index, move all following items

    }, {
        key: "addWithIndex",
        value: function addWithIndex(point, index) {
            for (var i = this.arr.length; i > index; --i) {
                this.arr[i] = this.arr[i - 1];
            }
            this.arr[index] = point;
            return this; // to enable chaining of append / preppend / addWithIndex commands
        }
    }, {
        key: "getItem",
        value: function getItem(index) {
            return this.arr[index];
        }
    }, {
        key: "remove",


        // indexArray must be sorted (ASC, eg. [1, 3, 4, 8])
        value: function remove(index) {
            var length = this.length;

            for (var i = index; i < length; ++i) {
                this.arr[i] = this.arr[i + 1];
            }
            this.arr.pop();
        }
    }, {
        key: "length",
        get: function get() {
            return this.arr.length;
        }
    }, {
        key: "last",
        get: function get() {
            if (this.length !== 0) {
                return this.arr[this.length - 1];
            } else {
                return false;
            }
        }
    }, {
        key: "first",
        get: function get() {
            if (this.length !== 0) {
                return this.arr[0];
            } else {
                return false;
            }
        }
    }]);

    return SmartArray;
}();

var PolylinePoints = exports.PolylinePoints = function (_SmartArray) {
    _inherits(PolylinePoints, _SmartArray);

    function PolylinePoints(arr) {
        _classCallCheck(this, PolylinePoints);

        return _possibleConstructorReturn(this, (PolylinePoints.__proto__ || Object.getPrototypeOf(PolylinePoints)).call(this, arr));
    }

    _createClass(PolylinePoints, [{
        key: "copy",
        value: function copy() {
            return new PolylinePoints($.extend(true, [], this.arr));
        }
    }, {
        key: "append",
        value: function append(point) {
            // call inherited function to handle the appending
            _get(PolylinePoints.prototype.__proto__ || Object.getPrototypeOf(PolylinePoints.prototype), "append", this).call(this, point);

            // if the second to last point is unnecessary, remove it
            var length = this.length;
            if (length >= 3 && (this.getItem(length - 3).x === this.getItem(length - 2).x && this.getItem(length - 2).x === this.getItem(length - 1).x || this.getItem(length - 3).y === this.getItem(length - 2).y && this.getItem(length - 2).y === this.getItem(length - 1).y)) {
                this.remove(length - 2);
            }

            // return this element (to allow chaining)
            return this;
        }
    }, {
        key: "forEach",
        value: function forEach(func) {
            for (var i = 0; i < this.arr.length; ++i) {
                func(this.arr[i]);
            }
        }
    }, {
        key: "string",
        get: function get() {
            var string = "";
            for (var i = 0; i < this.length; ++i) {
                if (i !== 0) {
                    string += " ";
                }
                string += this.arr[i].string;
            }
            return string;
        }
    }], [{
        key: "parseFromString",
        value: function parseFromString(string) {
            var pointStrings = string.split(" ");
            var points = new PolylinePoints();

            for (var i = 0; i < pointStrings.length; ++i) {
                points.append(PolylinePoint.parseFromString(pointStrings[i]));
            }

            return points;
        }
    }]);

    return PolylinePoints;
}(SmartArray);

var PolyLine = exports.PolyLine = function (_Tag3) {
    _inherits(PolyLine, _Tag3);

    function PolyLine(points, color, strokeWidth) {
        _classCallCheck(this, PolyLine);

        var _this9 = _possibleConstructorReturn(this, (PolyLine.__proto__ || Object.getPrototypeOf(PolyLine)).call(this, "polyline"));

        _this9.addAttr({
            points: points.string,
            stroke: color,
            fill: "none",
            "stroke-width": strokeWidth
        });
        return _this9;
    }

    _createClass(PolyLine, [{
        key: "updatePoints",
        value: function updatePoints(points) {
            this.addAttr({
                points: points.string
            });
        }
    }]);

    return PolyLine;
}(Tag);

var Text = exports.Text = function (_Tag4) {
    _inherits(Text, _Tag4);

    function Text(x, y, w, h, text, size) {
        var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "black";

        _classCallCheck(this, Text);

        var lineHeight = size * 1.2;

        var _this10 = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, "text"));

        _this10.addAttr({
            x: x,
            y: y,
            width: w,
            height: h,
            fill: color
        });

        if (size) {
            _this10.addAttr({
                'font-size': size
            });
        }

        _this10.$el.append(text);
        return _this10;
    }

    return Text;
}(Tag);

/**
 * Multi line text is not natively supportend in SVG 1.1,
 * the workaround is to use the <foreignObject> element and display
 * a HTML paragraph inside of the SVG document.
 *
 * Because this technique is not supported by all of the browsers,
 * the foreignObject element is wrapped in <switch>, which
 * provides fallback for those cases.
 *
 * read more: [foreignObject on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject)
 */


var MultiLineText = exports.MultiLineText = function (_Tag5) {
    _inherits(MultiLineText, _Tag5);

    function MultiLineText(x, y, w, h, text, size) {
        var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "black";

        _classCallCheck(this, MultiLineText);

        var _this11 = _possibleConstructorReturn(this, (MultiLineText.__proto__ || Object.getPrototypeOf(MultiLineText)).call(this, "switch"));

        var foreignObject = new Tag("foreignObject");
        var alternativeText = new Text(x, y, w, h, text, size, color);

        foreignObject.addAttr({
            x: x,
            y: y,
            width: w,
            height: h
        });

        foreignObject.$el.append($("<p class=\"multilinetext\" xmlns=\"http://www.w3.org/1999/xhtml\" style=\"font-size:" + size + "px\">").append(text));

        _this11.$el.append(foreignObject.$el).append(alternativeText.$el);
        return _this11;
    }

    return MultiLineText;
}(Tag);

var Pattern = exports.Pattern = function (_Tag6) {
    _inherits(Pattern, _Tag6);

    function Pattern(id, width, height) {
        _classCallCheck(this, Pattern);

        var _this12 = _possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).call(this, "pattern"));

        _this12.addAttr({
            id: id,
            x: 0,
            y: 0,
            width: width,
            height: height,
            patternUnits: "userSpaceOnUse",
            viewBox: "0 0 " + width + " " + height
        });
        return _this12;
    }

    _createClass(Pattern, [{
        key: "addChild",
        value: function addChild(el) {
            this.$el.append(el.$el);
            return el; // pro jednodussi "let rect = g.addChild(new Rectangle(..."
        }
    }]);

    return Pattern;
}(Tag);

},{"./structuresAndClasses.js":11}]},{},[8])

//# sourceMappingURL=main.js.map
