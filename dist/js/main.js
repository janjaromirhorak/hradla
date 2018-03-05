(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _smallFunctions = require('./smallFunctions.js');

var _smallFunctions2 = _interopRequireDefault(_smallFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewBox = function () {
    function ViewBox(left, top, width, height) {
        _classCallCheck(this, ViewBox);

        this.real = { left: left, top: top, width: width, height: height };

        this.zoom = 1;
        this.leftShift = 0;
        this.topShift = 0;
    }

    _createClass(ViewBox, [{
        key: 'transformX',


        // transforms horizontal units to the scale and shift of the editor
        value: function transformX(x) {
            return this.left + x / this.zoom;
        }

        // transforms vertical units to the scale and shift of the editor

    }, {
        key: 'transformY',
        value: function transformY(y) {
            return this.top + y / this.zoom;
        }
    }, {
        key: 'width',
        get: function get() {
            return this.real.width / this.zoom;
        }
    }, {
        key: 'height',
        get: function get() {
            return this.real.height / this.zoom;
        }
    }, {
        key: 'left',
        get: function get() {
            return this.real.left - this.leftShift / this.zoom + (this.real.width - this.width) / 2;
        }
    }, {
        key: 'top',
        get: function get() {
            return this.real.top - this.topShift / this.zoom + (this.real.height - this.height) / 2;
        }
    }, {
        key: 'str',
        get: function get() {
            return this.left + ' ' + this.top + ' ' + this.width + ' ' + this.height;
        }
    }]);

    return ViewBox;
}();

var Svg = function () {
    function Svg(canvas, gridSize) {
        var _this = this;

        _classCallCheck(this, Svg);

        this.$svg = $(canvas);

        this.gridSize = gridSize;

        this.boxes = []; // stores all boxes
        this.wires = []; // stores all wires

        this.simulationEnabled = true;
        this.simulation = new _simulation2.default(this); // dummy, will be overwritten on startNewSimulation

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
        // this.floatingMenu = new FloatingMenu(this);
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

        _smallFunctions2.default.addMouseScrollEventListener(canvas, function (event) {
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

    _createClass(Svg, [{
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            if (event.ctrlKey) {
                this.moveCanvas = {
                    left: event.pageX,
                    top: event.pageY
                };
            }
        }
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
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(event) {
            if (this.moveCanvas) {
                this.moveCanvas = undefined;
            }
        }
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
    }, {
        key: 'importData',
        value: function importData(data) {
            var _this2 = this;

            this.simulationEnabled = false;

            // todo implement gridSize scaling

            // list of wires to be added
            var newWires = new Map();

            for (var i = 0; i < data.boxes.length; ++i) {
                // add box
                var box = void 0;
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
                                console.error("Unknown io box name '" + data.boxes[i].name + "'.");
                                break;
                        }
                        break;
                    default:
                        console.error("Unknown box category '" + data.boxes[i].category + "'.");
                }

                if (box) {
                    // proccess box transforms (translation and rotation)
                    var transform = new editorElements.Transform();
                    for (var j = 0; j < data.boxes[i].transform.items.length; ++j) {
                        switch (data.boxes[i].transform.items[j].name) {
                            case "translate":
                                transform.setTranslate(data.boxes[i].transform.items[j].args[0], data.boxes[i].transform.items[j].args[1]);
                                break;
                            case "rotate":
                                transform.setRotate(data.boxes[i].transform.items[j].args[0], data.boxes[i].transform.items[j].args[1], data.boxes[i].transform.items[j].args[2]);
                                break;
                            default:
                                console.error("Unknown transform property '" + data.boxes[i].transform.items[j].name + "'.");
                                break;
                        }
                    }

                    box.setTransform(transform);

                    // add all wires to the list of wires to be added
                    for (var _j = 0; _j < data.boxes[i].connections.length; ++_j) {
                        // get the artificial wire id
                        var wireId = data.boxes[i].connections[_j].wireId;

                        // pass the values got from json into a variable that will be added into the map
                        var value = {
                            index: data.boxes[i].connections[_j].index,
                            type: data.boxes[i].connections[_j].type,
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
            this.refresh();

            // with all boxes added, we can now connect them with wires
            newWires.forEach(function (item) {
                var connectorIds = [];
                if (item[0] && item[1]) {
                    var _arr = [0, 1];

                    for (var _i2 = 0; _i2 < _arr.length; _i2++) {
                        var _i = _arr[_i2];
                        var _box = _this2.getBoxById(item[_i].boxId);

                        connectorIds[_i] = _box.connectors[item[_i].index].id;
                    }
                }
                _this2.newWire(connectorIds[0], connectorIds[1], true);
            });

            // refresh the SVG document
            this.refresh();

            this.simulationEnabled = true;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.boxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _box2 = _step.value;

                    if (_box2 instanceof editorElements.InputBox) {
                        // switch the input box state to the oposit and back, for some reason calling box.refreshState()
                        // results in weird unfinished simulation
                        // this causes update of the output connector and a start of a new simulation

                        // todo find better solution instead of this workaround
                        _box2.on = !_box2.on;
                        _box2.on = !_box2.on;
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
    }, {
        key: 'startNewSimulation',
        value: function startNewSimulation(startingConnector, state) {
            if (this.simulationEnabled) {
                this.simulation = new _simulation2.default(this);
                this.simulation.notifyChange(startingConnector.id, state);
                this.simulation.run();
            }
        }
    }, {
        key: 'newGate',
        value: function newGate(name, x, y) {
            var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            return this.newBox(x, y, new editorElements.Gate(this, name, x, y), refresh);
        }
    }, {
        key: 'newInput',
        value: function newInput(x, y) {
            var isOn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            return this.newBox(x, y, new editorElements.InputBox(this, isOn), refresh);
        }
    }, {
        key: 'newOutput',
        value: function newOutput(x, y) {
            var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            return this.newBox(x, y, new editorElements.OutputBox(this), refresh);
        }
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
    }, {
        key: 'removeBox',
        value: function removeBox(gateId) {
            var $gate = $("#" + gateId);

            // find the gate in svg's list of gates
            var gateIndex = -1;
            for (var i = 0; i < this.boxes.length; i++) {
                if (this.boxes[i].svgObj.id === gateId) {
                    gateIndex = i;
                    break;
                }
            }

            if (gateIndex > -1) {
                // remove all wires connected to this gate
                for (var _i3 = 0; _i3 < this.boxes[gateIndex].connectors.length; _i3++) {
                    this.removeWiresByConnectorId(this.boxes[gateIndex].connectors[_i3].svgObj.id);
                }

                // remove the gate
                this.boxes.splice(gateIndex, 1);
                $gate.remove();
            } else {
                console.error("Trying to remove an nonexisting gate. (Gate id: " + gateId + ")");
            }
        }
    }, {
        key: 'newWire',
        value: function newWire(fromId, toId) {
            var _this3 = this;

            var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            // wire must connect two distinct elements
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
    }, {
        key: 'getWireById',
        value: function getWireById(wireId) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.wires[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var wire = _step2.value;

                    if (wire.svgObj.id === wireId) {
                        return wire;
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

            return false;
        }
    }, {
        key: 'getWiresByConnectorId',
        value: function getWiresByConnectorId(connectorId) {
            var connector = this.getConnectorById(connectorId);
            return connector.wireIds;
        }
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
                    otherConnector.setState(_logic2.default.state.unknown);
                }
            });

            // clear the list of wire Ids
            connector.wireIds.clear();
            // if connector is an input connector, set its state to unknown
            if (connector.isInputConnector) {
                connector.setState(_logic2.default.state.unknown);
            }
        }
    }, {
        key: 'getBoxById',
        value: function getBoxById(gateId) {
            for (var i = 0; i < this.boxes.length; i++) {
                if (this.boxes[i].svgObj.id === gateId) {
                    return this.boxes[i];
                }
            }
            return false;
        }
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
    }, {
        key: 'getConnectorById',
        value: function getConnectorById(connectorId, wire) {
            // the wire variable is used as heuristic,
            // when we know the wire, we have to check only
            // two gates instead of all of them

            if (wire !== undefined) {
                // we know the wire -- we can check only gates at the ends of this wire
                var connector = wire.startBox.getConnectorById(connectorId);
                if (!connector) {
                    connector = wire.endBox.getConnectorById(connectorId);
                }
                return connector;
            } else {
                // we do not know the wire -- we have to check all gates
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.boxes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var box = _step3.value;

                        var _connector = box.getConnectorById(connectorId);
                        if (_connector) {
                            return _connector;
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
            }

            return false;
        }

        // if the object, that user interacted with, is not a connector and is in a group
        // return the group jQuery object instead of the original jQuery object

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
    }, {
        key: 'appendElement',
        value: function appendElement(element) {
            var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.appendJQueryObject(element.get(), refresh);
        }
    }, {
        key: 'appendJQueryObject',
        value: function appendJQueryObject(object) {
            var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.$svg.append(object);
            if (refresh) {
                this.refresh();
            }
        }
    }, {
        key: 'addPattern',
        value: function addPattern(pattern) {
            this.$defs.append(pattern);
            this.refresh();
        }

        // reload the SVG document (needed to display newly appended jQuery object)

    }, {
        key: 'refresh',
        value: function refresh() {
            this.$svg.html(this.$svg.html());
            console.log("SVG document has been reloaded.");
        }
    }, {
        key: 'displayContextMenu',
        value: function displayContextMenu(x, y, $target) {
            this.contextMenu.display(x, y, $target);
        }
    }, {
        key: 'hideContextMenu',
        value: function hideContextMenu() {
            this.contextMenu.hide();
        }

        // snap a value to a grid

    }, {
        key: 'snapToGrid',
        value: function snapToGrid(value) {
            return Math.round(value / this.gridSize) * this.gridSize;
        }

        // static function for snapping a value to a grid

    }, {
        key: 'getNonRoutableNodes',


        // get set of nodes, that cannot be used for wiring at any circumstances
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
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.boxes[i].blockedNodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var item = _step4.value;

                        var absoluteX = position.left + item.x * this.gridSize;
                        var absoluteY = position.top + item.y * this.gridSize;

                        blockedNodes.add({
                            x: absoluteX,
                            y: absoluteY
                        });
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
            // todo ensure that this.refresh() is really unnecessary
            // this.refresh();
            // return the set
            return blockedNodes;
        }
    }, {
        key: 'moveToFrontById',
        value: function moveToFrontById(objId) {
            this.$svg.append($("#" + objId));
        }
    }, {
        key: 'moveToBackById',
        value: function moveToBackById(objId) {
            $("#" + this.background.id).after($("#" + objId));
        }

        // get set of nodes, that is better not to use for wiring

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
    }, {
        key: 'height',
        get: function get() {
            return this.$svg.height();
        }
    }, {
        key: 'zoom',
        get: function get() {
            return this.viewbox.zoom;
        },
        set: function set(value) {
            this.viewbox.zoom = value;
            this.applyViewbox();
            // this.refresh()
        }
    }, {
        key: 'exportData',
        get: function get() {
            this.exportWireIdMap = new Map();
            this.exportWireId = 0;

            var data = {
                // todo implement gridSize scaling
                // gridSize: this.gridSize,
                boxes: []
            };

            for (var i = 0; i < this.boxes.length; ++i) {
                data.boxes[i] = this.boxes[i].exportData;
            }

            return data;
        }
    }], [{
        key: 'snapToGrid',
        value: function snapToGrid(value, gridSize) {
            return Math.round(value / gridSize) * gridSize;
        }
    }]);

    return Svg;
}();

exports.default = Svg;

},{"./contextMenu.js":2,"./editorElements.js":3,"./floatingMenu.js":4,"./logic.js":6,"./simulation.js":8,"./smallFunctions.js":9,"./svgObjects.js":11}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenuItem = function () {
    function ContextMenuItem(name, type, contextMenu, parentSVG, clickFunction) {
        _classCallCheck(this, ContextMenuItem);

        this.name = name;
        this.type = type;
        this.contextMenu = contextMenu;
        this.parentSVG = parentSVG;

        this.$el = $("<li>");
        $(this.$el).text(name).attr("type", type);

        if (clickFunction) {
            $(this.$el).click(function (event) {
                clickFunction(event);
                contextMenu.hide();
            });
        }
    }

    _createClass(ContextMenuItem, [{
        key: "addClass",
        value: function addClass(cls) {
            this.$el.addClass(cls);
            return this;
        }
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
    }, {
        key: "jQuery",
        get: function get() {
            return this.$el;
        }
    }]);

    return ContextMenuItem;
}();

var GateMenuItem = function (_ContextMenuItem) {
    _inherits(GateMenuItem, _ContextMenuItem);

    function GateMenuItem(type, contextMenu, parentSVG) {
        _classCallCheck(this, GateMenuItem);

        return _possibleConstructorReturn(this, (GateMenuItem.__proto__ || Object.getPrototypeOf(GateMenuItem)).call(this, type, // name is the type
        type, contextMenu, parentSVG, function (event) {
            var position = {
                left: Math.round(contextMenu.position.x / parentSVG.gridSize) * parentSVG.gridSize,
                top: Math.round(contextMenu.position.y / parentSVG.gridSize) * parentSVG.gridSize
            };

            parentSVG.newGate(type, position.left, // x coordinate
            position.top // y coordinate
            );
        }));
    }

    return GateMenuItem;
}(ContextMenuItem);

var ContextMenu = function () {
    function ContextMenu(parentSVG) {
        var _this2 = this;

        _classCallCheck(this, ContextMenu);

        this.parentSVG = parentSVG;

        var gates = ["not", "and", "or", "nand", "nor", "xor", "xnor"];

        this.position = {
            x: 0, y: 0
        };

        this.$el = $("<ul>");
        this.$el.attr('id', 'contextMenu');

        var gateList = new ContextMenuItem("New gate", '', this, parentSVG);
        for (var i = 0; i < gates.length; ++i) {
            gateList.appendItem(new GateMenuItem(gates[i], this, parentSVG));
        }
        this.appendItem(gateList);

        this.appendItem(new ContextMenuItem("Input box", '', this, parentSVG, function () {
            var position = {
                left: _this2.parentSVG.snapToGrid(_this2.position.x),
                top: _this2.parentSVG.snapToGrid(_this2.position.y)
            };

            parentSVG.newInput(position.left, position.top);
        }));

        this.appendItem(new ContextMenuItem("Output box", '', this, parentSVG, function () {
            var position = {
                left: _this2.parentSVG.snapToGrid(_this2.position.x),
                top: _this2.parentSVG.snapToGrid(_this2.position.y)
            };

            parentSVG.newOutput(position.left, position.top);
        }));

        this.appendConditionalItem('box', 'Remove this item', function (id) {
            _this2.parentSVG.removeBox(id);
        });
        this.appendConditionalItem('wire', 'Remove this wire', function (id) {
            _this2.parentSVG.removeWireById(id);
        });

        parentSVG.$svg.before(this.$el);
    }

    _createClass(ContextMenu, [{
        key: "appendItem",
        value: function appendItem(item) {
            this.$el.append(item.jQuery);
            return item;
        }

        // appends an connditional item (that is shown only if the target
        // has the class itemClass)
        // clickFunction takes one argument: ID of the target

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

        // decides whether or not to display specific conditional items

    }, {
        key: "resolveConditionalItems",
        value: function resolveConditionalItems($target) {
            var _this3 = this;

            var _loop = function _loop(i) {
                if ($target.hasClass(_this3.conditionalItems[i].itemClass)) {
                    _this3.appendItem(new ContextMenuItem(_this3.conditionalItems[i].text, '', _this3, _this3.parentSVG, function () {
                        _this3.conditionalItems[i].clickFunction($target.attr('id'));
                    })).addClass('conditional');
                }
            };

            for (var i = 0; i < this.conditionalItems.length; ++i) {
                _loop(i);
            }
        }

        // hides all conditional items

    }, {
        key: "hideAllConditionalItems",
        value: function hideAllConditionalItems() {
            this.$el.children('.conditional').remove();
        }

        // displays the context menu with the right set of conditional items

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

        // hides the context menu

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
exports.Wire = exports.Gate = exports.OutputBox = exports.InputBox = exports.OutputConnector = exports.InputConnector = exports.Transform = undefined;

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

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// mapping logical states to css classes
var stateClasses = {
    on: "stateOn",
    off: "stateOff",
    unknown: "stateUnknown",
    oscillating: "stateOscillating"
};

// helper class used by Transform

var Property = function () {
    function Property(string) {
        _classCallCheck(this, Property);

        if (string !== undefined) {
            this.name = string.replace(/^[ ]*([^(]+).*/, "$1");
            this.args = string.replace(/^[^(]+\((.*)\)/, "$1").split(' ');
        }
    }

    _createClass(Property, [{
        key: 'setName',
        value: function setName(name) {
            this.name = name;
        }
    }, {
        key: 'setArguments',
        value: function setArguments(args) {
            this.args = args;
        }
    }, {
        key: 'get',
        value: function get() {
            return this.name + "(" + this.args.join(" ") + ")";
        }
    }]);

    return Property;
}();

// used to manipulate the transform argument used in SVG


var Transform = exports.Transform = function () {
    function Transform(string) {
        _classCallCheck(this, Transform);

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

    // returns index or -1


    _createClass(Transform, [{
        key: 'getIndex',
        value: function getIndex(name) {
            for (var i = 0; i < this.items.length; i++) {
                if (name === this.items[i].name) {
                    return i;
                }
            }

            return -1;
        }
    }, {
        key: 'getTranslate',
        value: function getTranslate() {
            var args = this.getArguments(this.getIndex("translate"));

            return {
                x: args[0],
                y: args[1]
            };
        }
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

        // sets the translation

    }, {
        key: 'setTranslate',
        value: function setTranslate(x, y) {
            this.setParameter("translate", [x, y]);
        }

        // sets the rotation

    }, {
        key: 'setRotate',
        value: function setRotate(deg, centreX, centreY) {
            this.setParameter("rotate", [deg, centreX, centreY]);
        }

        // add the rotation

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

        // returns the transform properties concatenated

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
    }, {
        key: 'getArguments',
        value: function getArguments(index) {
            return this.items[index].args;
        }
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

// parent class for all network elements


var NetworkElement = function () {
    function NetworkElement(parentSVG) {
        _classCallCheck(this, NetworkElement);

        if (!parentSVG) {
            console.error("Parent SVG element has not been defined.");
        }
        this.parentSVG = parentSVG;

        // used to store the svjObject's instance of this element
        this.svgObj = undefined;
    }

    _createClass(NetworkElement, [{
        key: 'onMouseDown',
        value: function onMouseDown() {
            // empty function to prevent error messages, function is implemented later in the Box class
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            // empty function to prevent error messages, function is implemented later in the Box and Connector classes
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove() {
            // empty function to prevent error messages, function is implemented later in the Box class
        }
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

// parent class for input and output connectors (the things you click on
// when you want to connect elements)


var Connector = function (_NetworkElement) {
    _inherits(Connector, _NetworkElement);

    function Connector(parentSVG, gridSize, left, top) {
        _classCallCheck(this, Connector);

        var _this = _possibleConstructorReturn(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).call(this, parentSVG)); // unit of left / top is the size of the grid


        _this.gridSize = gridSize;
        _this.connectorSize = gridSize;
        _this.connectorOffset = _this.connectorSize / 2;

        _this.svgObj = new svgObj.Rectangle(left * _this.gridSize - _this.connectorOffset, top * _this.gridSize - _this.connectorOffset, _this.connectorSize, _this.connectorSize, "none", "black");

        _this.svgObj.$el.addClass("connector");

        _this.stateAttr = false;

        // if a wire can set connector's state
        _this.isInputConnector = false;

        _this.stateAttr = _logic2.default.state.unknown;
        _this.svgObj.addClass(stateClasses.unknown);

        _this.wireIds = new Set();
        return _this;
    }

    _createClass(Connector, [{
        key: 'addWireId',
        value: function addWireId(wireId) {
            this.wireIds.add(wireId);
        }
    }, {
        key: 'removeWireId',
        value: function removeWireId(wireId) {
            this.wireIds.delete(wireId);
        }

        // removes the wire and updates the connector

    }, {
        key: 'removeWireIdAndUpdate',
        value: function removeWireIdAndUpdate(wireId) {
            this.removeWireId(wireId);
        }
    }, {
        key: 'setState',
        value: function setState(state, propagationId) {
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

            this.stateAttr = state;
        }
    }, {
        key: 'get',
        value: function get() {
            return this.svgObj;
        }
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
    }, {
        key: 'state',
        get: function get() {
            return this.stateAttr;
        }
    }], [{
        key: 'type',
        get: function get() {
            return {
                inputConnector: 0,
                outputConnector: 1
            };
        }
    }]);

    return Connector;
}(NetworkElement);

var InputConnector = exports.InputConnector = function (_Connector) {
    _inherits(InputConnector, _Connector);

    function InputConnector(parentSVG, gridSize, left, top) {
        _classCallCheck(this, InputConnector);

        var _this2 = _possibleConstructorReturn(this, (InputConnector.__proto__ || Object.getPrototypeOf(InputConnector)).call(this, parentSVG, gridSize, left, top));

        _this2.type = Connector.type.inputConnector;
        _this2.isInputConnector = true;
        return _this2;
    }

    _createClass(InputConnector, [{
        key: 'setState',
        value: function setState(state) {
            // console.log('setState on', this.id)

            _get(InputConnector.prototype.__proto__ || Object.getPrototypeOf(InputConnector.prototype), 'setState', this).call(this, state);

            var gate = this.parentSVG.getBoxByConnectorId(this.svgObj.id);
            gate.refreshState();
        }
    }, {
        key: 'removeWireIdAndUpdate',
        value: function removeWireIdAndUpdate(wireId) {
            _get(InputConnector.prototype.__proto__ || Object.getPrototypeOf(InputConnector.prototype), 'removeWireIdAndUpdate', this).call(this, wireId);
            this.setState(_logic2.default.state.unknown);
        }
    }, {
        key: 'state',
        get: function get() {
            return _get(InputConnector.prototype.__proto__ || Object.getPrototypeOf(InputConnector.prototype), 'state', this);
        }
    }]);

    return InputConnector;
}(Connector);

var OutputConnector = exports.OutputConnector = function (_Connector2) {
    _inherits(OutputConnector, _Connector2);

    function OutputConnector(parentSVG, gridSize, left, top) {
        _classCallCheck(this, OutputConnector);

        // used to set the wire state during wire initialization based on the output connector state
        var _this3 = _possibleConstructorReturn(this, (OutputConnector.__proto__ || Object.getPrototypeOf(OutputConnector)).call(this, parentSVG, gridSize, left, top));

        _this3.isOutput = true;

        _this3.type = Connector.type.outputConnector;
        return _this3;
    }

    _createClass(OutputConnector, [{
        key: 'setState',
        value: function setState(state) {
            _get(OutputConnector.prototype.__proto__ || Object.getPrototypeOf(OutputConnector.prototype), 'setState', this).call(this, state);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.wireIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var wireId = _step.value;

                    this.parentSVG.getWireById(wireId).setState(state);
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
        key: 'state',
        get: function get() {
            return _get(OutputConnector.prototype.__proto__ || Object.getPrototypeOf(OutputConnector.prototype), 'state', this);
        }
    }]);

    return OutputConnector;
}(Connector);

// parent class for gates and input and output boxes


var Box = function (_NetworkElement2) {
    _inherits(Box, _NetworkElement2);

    function Box(parentSVG, name, category, gridWidth, gridHeight) {
        _classCallCheck(this, Box);

        var _this4 = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, parentSVG));

        _this4.name = name;
        _this4.category = category;
        _this4.gridSize = _this4.parentSVG.gridSize;

        _this4.url = "img/" + _this4.category + "/" + _this4.name + ".svg";

        _this4.connectors = [];

        _this4.svgObj = new svgObj.Group();

        _this4.width = gridWidth * _this4.gridSize;
        _this4.height = gridHeight * _this4.gridSize;

        _this4.gridWidth = gridWidth;
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

    _createClass(Box, [{
        key: 'generateBlockNodes',
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = specialNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var node = _step2.value;

                    this.blockedNodes.add(node);
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
    }, {
        key: 'refreshState',
        value: function refreshState() {
            // empty function, redefined in inherited elements
            // refreshState takes input connector values and sets output values accordingly
            console.warn("Calling the virtual function refreshState has no effect.");
        }

        // usage: changeImage("abc") changes image url to image-abc.svg
        //        changeImage() changes image url to the default one (image.svg)

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

        // returns a jQuery object

    }, {
        key: 'get',
        value: function get() {
            return this.svgObj.get();
        }
    }, {
        key: 'removeBlockedNode',
        value: function removeBlockedNode(x, y) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.blockedNodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    if (item.x === x && item.y === y) {
                        this.blockedNodes.delete(item);
                        break;
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
        }
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
    }, {
        key: 'addConnector',
        value: function addConnector(left, top, connectorType) {
            var index = this.connectors.length;
            if (connectorType === Connector.type.inputConnector) {
                this.connectors[index] = new InputConnector(this.parentSVG, this.gridSize, left, top);
            } else {
                this.connectors[index] = new OutputConnector(this.parentSVG, this.gridSize, left, top);
            }
            this.svgObj.addChild(this.connectors[index].get());

            this.removeBlockedNode(left, top);
        }

        // returns the connector object based on its id

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
    }, {
        key: 'getTransform',
        value: function getTransform() {
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
            return transform;
        }
    }, {
        key: 'setTransform',
        value: function setTransform(transform) {
            this.svgObj.addAttr({ "transform": transform.get() });
        }
    }, {
        key: 'transformEvent',
        value: function transformEvent(event) {
            event.pageX = this.parentSVG.viewbox.transformX(event.pageX);
            event.pageY = this.parentSVG.viewbox.transformY(event.pageY);

            return event;
        }
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
    }, {
        key: 'onMouseDownLeft',
        value: function onMouseDownLeft(event) {
            this.mouseMoved = false;

            var transform = this.getTransform();

            // save the current item position into a variable
            var currentPosition = transform.getTranslate();

            var _transformEvent = this.transformEvent(event),
                pageX = _transformEvent.pageX,
                pageY = _transformEvent.pageY;

            // calculate mouse offset from the object origin


            this.offset = {
                x: pageX - currentPosition.x,
                y: pageY - currentPosition.y
            };
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            if (this.mouseLeft) {
                this.mouseMoved = true;

                var _transformEvent2 = this.transformEvent(event),
                    pageX = _transformEvent2.pageX,
                    pageY = _transformEvent2.pageY;

                var left = pageX - this.offset.x;
                var top = pageY - this.offset.y;

                var transform = this.getTransform();
                transform.setTranslate(left, top);

                this.setTransform(transform);

                this.updateWires(true);
            }
        }
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
        }
    }, {
        key: 'onDrop',
        value: function onDrop(event) {
            var _transformEvent3 = this.transformEvent(event),
                pageX = _transformEvent3.pageX,
                pageY = _transformEvent3.pageY;

            var left = pageX - this.offset.x;
            var top = pageY - this.offset.y;

            left = this.parentSVG.snapToGrid(left);
            top = this.parentSVG.snapToGrid(top);

            var transform = this.getTransform();
            transform.setTranslate(left, top);

            this.setTransform(transform);

            this.updateWires();
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            // empty function, will be redefined in InputBox
        }
    }, {
        key: 'onClickMiddle',
        value: function onClickMiddle() {
            var transform = this.getTransform();

            var rect = this.svgObj.$el[0].getBoundingClientRect();

            var centreX = Math.round(rect.width / 2);
            var centreY = Math.round(rect.height / 2);

            centreX -= centreX % this.gridSize;
            centreY -= centreY % this.gridSize;

            transform.rotateRight(centreX, centreY);

            this.svgObj.addAttr({ "transform": transform.get() });

            this.rotateBlockedNodesRight();

            this.updateWires();
        }

        // updates all wires connected to this box

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
    }, {
        key: 'outputConnectors',
        get: function get() {
            return this.connectors.filter(function (conn) {
                return conn.isOutputConnector;
            });
        }
    }, {
        key: 'exportData',
        get: function get() {
            var connections = [];

            // go through all connectors
            var counter = 0;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.connectors[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var conn = _step4.value;

                    // go through each its wire id
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = conn.wireIds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var item = _step5.value;

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

                    counter++;
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

            return {
                name: this.name,
                // id: this.svgObj.id,
                category: this.category,
                transform: this.getTransform(),
                connections: connections
            };
        }
    }]);

    return Box;
}(NetworkElement);

var InputBox = exports.InputBox = function (_Box) {
    _inherits(InputBox, _Box);

    function InputBox(parentSVG) {
        var isOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, InputBox);

        var width = 7;
        var height = 4;

        var _this7 = _possibleConstructorReturn(this, (InputBox.__proto__ || Object.getPrototypeOf(InputBox)).call(this, parentSVG, "input", "io", width, height));

        _this7.addConnector(width, height / 2, Connector.type.outputConnector);

        _this7.on = isOn;
        return _this7;
    }

    _createClass(InputBox, [{
        key: 'generateBlockNodes',
        value: function generateBlockNodes() {
            _get(InputBox.prototype.__proto__ || Object.getPrototypeOf(InputBox.prototype), 'generateBlockNodes', this).call(this, 0, 1, 1, 0);
        }
    }, {
        key: 'refreshState',
        value: function refreshState() {
            // start a new simulation from the output connector
            this.parentSVG.startNewSimulation(this.connectors[0], this.connectors[0].state);
        }
    }, {
        key: 'onClick',
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
        },
        get: function get() {
            return this.isOn;
        }
    }]);

    return InputBox;
}(Box);

var OutputBox = exports.OutputBox = function (_Box2) {
    _inherits(OutputBox, _Box2);

    function OutputBox(parentSVG) {
        _classCallCheck(this, OutputBox);

        var height = 4;
        var width = 5;

        var _this8 = _possibleConstructorReturn(this, (OutputBox.__proto__ || Object.getPrototypeOf(OutputBox)).call(this, parentSVG, "output", "io", width, height));

        _this8.addConnector(0, height / 2, Connector.type.inputConnector);
        return _this8;
    }

    _createClass(OutputBox, [{
        key: 'refreshState',
        value: function refreshState() {
            this.setState(this.connectors[0].state);
        }
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

var Gate = exports.Gate = function (_Box3) {
    _inherits(Gate, _Box3);

    function Gate(parentSVG, name) {
        _classCallCheck(this, Gate);

        var width = 9;
        var height = 4;

        // output
        var _this9 = _possibleConstructorReturn(this, (Gate.__proto__ || Object.getPrototypeOf(Gate)).call(this, parentSVG, name, "gate", width, height));

        _this9.addConnector(width, height / 2, Connector.type.outputConnector);

        if (_this9.name === "not") {
            // input
            _this9.addConnector(0, height / 2, Connector.type.inputConnector);
        } else {
            // input
            _this9.addConnector(0, height / 4, Connector.type.inputConnector);
            _this9.addConnector(0, height / (4 / 3), Connector.type.inputConnector);

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

var Wire = exports.Wire = function (_NetworkElement3) {
    _inherits(Wire, _NetworkElement3);

    function Wire(parentSVG, fromId, toId, gridSize) {
        var refresh = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        _classCallCheck(this, Wire);

        var _this10 = _possibleConstructorReturn(this, (Wire.__proto__ || Object.getPrototypeOf(Wire)).call(this, parentSVG));
        // small todo: rework start... end... to arrays? (not important)

        _this10.gridSize = gridSize;

        _this10.fromId = fromId;
        _this10.toId = toId;

        _this10.startBox = _this10.parentSVG.getBoxByConnectorId(fromId);
        _this10.endBox = _this10.parentSVG.getBoxByConnectorId(toId);

        _this10.boxes = [_this10.startBox, _this10.endBox];

        _this10.startConnector = _this10.parentSVG.getConnectorById(fromId);
        _this10.endConnector = _this10.parentSVG.getConnectorById(toId);

        _this10.connectors = [_this10.startConnector, _this10.endConnector];
        _this10.routeWire(true, refresh);

        _this10.stateAttr = _logic2.default.state.unknown;

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
            for (var _iterator6 = _this10.connectors[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var connector = _step6.value;

                if (connector.isOutput) {
                    _this10.setState(connector.state);
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

        _this10.svgObj.$el.addClass("wire");
        return _this10;
    }

    _createClass(Wire, [{
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

            if (this.startConnector.isInputConnector) {
                this.startConnector.setState(state);
            }
            if (this.endConnector.isInputConnector) {
                this.endConnector.setState(state);
            }

            this.stateAttr = state;
        }
    }, {
        key: 'updateWireState',
        value: function updateWireState() {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.boxes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var box = _step7.value;

                    box.refreshState();
                }
                // for (const conn of this.connectors) {
                //     if(conn.isOutputConnector) {
                //         this.parentSVG.startNewSimulation(conn.id, conn.state)
                //     }
                // }
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
    }, {
        key: 'get',
        value: function get() {
            return this.svgObj.get();
        }
    }, {
        key: 'getTemporaryWirePoints',
        value: function getTemporaryWirePoints() {
            var points = new svgObj.PolylinePoints();
            points.append(new svgObj.PolylinePoint(this.wireStart.x, this.wireStart.y));
            points.append(new svgObj.PolylinePoint(this.wireEnd.x, this.wireEnd.y));
            return points;
        }
    }, {
        key: 'temporaryWire',
        value: function temporaryWire() {
            this.wireStart = this.getCoordinates(this.startConnector, false);
            this.wireEnd = this.getCoordinates(this.endConnector, false);

            this.setWirePath(this.getTemporaryWirePoints());

            // this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);
            // this.svgObj.addClass(stateClasses.unknown);
        }
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

        // implementation based on this pseudocode: https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode

    }, {
        key: 'aStar',
        value: function aStar(start, end) {
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
                // (can be implemented effectively using min-heap data structure (maybe todo sometime)?)
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = openNodes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var node = _step8.value;

                        if (!currentNode || fScore.get(node) < currentNodeFScore) {
                            currentNode = node;
                            currentNodeFScore = fScore.get(currentNode);
                        }
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

                        if (!openNodes.has(newPoint).y) {
                            openNodes.add(newPoint);
                        }

                        // calculate possible GScore by adding 1 to the score of the node we came from
                        // (we prioritize to minimize the number of nodes and not the distance,
                        //  so we are adding 1 on all nodes, even if the euclidean / mannhatan distance may vary)
                        var increment = 1;
                        if (i !== 0) {
                            increment = 2;
                        }
                        var possibleGScore = gScore.get(currentNode) + increment;

                        if (Wire.setHasThisPoint(punishedButRoutable, this.scalePointToGrid(newPoint))) {
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
    }, {
        key: 'scalePointToGrid',
        value: function scalePointToGrid(point) {
            return {
                x: point.x * this.gridSize,
                y: point.y * this.gridSize
            };
        }
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
    }, {
        key: 'getCoordinates',
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
            return this.stateAttr;
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
    }, {
        key: 'setHasThisPoint',
        value: function setHasThisPoint(set, point) {
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = set[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var item = _step9.value;

                    if (item.x === point.x && item.y === point.y) {
                        return true;
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

            return false;
        }
    }]);

    return Wire;
}(NetworkElement);

},{"./logic.js":6,"./structuresAndClasses.js":10,"./svgObjects.js":11}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _importExport = require("./importExport.js");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jqueryElement = function jqueryElement(specificTag) {
    _classCallCheck(this, jqueryElement);

    if (!specificTag) {
        this.$el = $("<div>");
    } else {
        this.$el = $("<" + specificTag + ">");
    }
};

// const mouseIcon =
//     "<svg class=\"mouseIcon\" xmlns=\"http://www.w3.org/2000/svg\" height=\"121.77131mm\" width=\"82.327583mm\" version=\"1.1\" viewBox=\"0 0 291.71191 431.47314\">" +
//     "<g transform=\"translate(-202.70908,-260.9232)\">\n" +
//     "            <path d=\"m202.81108 443.50667c-0.1257 11.05683 0.0651 12.12915 0.0528 23.09375 1.0404 39.29165-4.03281 79.5842 8.81441 117.56836 17.52602 58.00742 70.7612 107.07793 133.12907 108.11719 60.80448 2.61247 115.80638-41.48912 136.65249-96.93555 15.21942-34.70561 12.7447-72.82638 12.834-109.72266-0.40356-17.24905 0.27452-24.7329 0.0879-42.12109h-291.57066z\"/>\n" +
//     "            <path class=\"left\" d=\"m335.67788 260.93032c-58.6525 0.65566-99.6319 43.51386-120.0821 96.99219-10.5505 24.06012-12.5935 41.77797-12.8867 67.58203h135.7832v-164.57226c-0.006 0.00008-0.0117-0.00008-0.0176 0-0.9347-0.011-1.8658-0.0124-2.7968-0.002z\"/>\n" +
//     "            <path class=\"right\" d=\"m361.46787 260.92993c-0.94207-0.01-1.8864-0.009-2.83203 0.004v164.57226h135.78516c-0.26257-24.46948-2.2521-40.74823-11.50391-63.90243-19.34709-55.03225-61.73043-100.04525-121.44922-100.67383z\"/>\n" +
//     "            <path class=\"middle\" d=\"m348.56504 294.93365c15.03714 0 27.14286 12.10572 27.14286 27.14286v40c0 15.03714-12.10572 27.14286-27.14286 27.14286s-27.14286-12.10572-27.14286-27.14286v-40c0-15.03714 12.10572-27.14286 27.14286-27.14286z\" stroke=\"#fff\" stroke-linecap=\"round\" stroke-width=\"20\"/>\n" +
//     "        </g>" +
//     "</svg>";

var helpWindowItem = function (_jqueryElement) {
    _inherits(helpWindowItem, _jqueryElement);

    function helpWindowItem(text) {
        _classCallCheck(this, helpWindowItem);

        var _this = _possibleConstructorReturn(this, (helpWindowItem.__proto__ || Object.getPrototypeOf(helpWindowItem)).call(this));

        _this.$el.addClass("helpWindowItem");
        _this.$el.html(text);
        return _this;
    }

    return helpWindowItem;
}(jqueryElement);

var helpWindow = function (_jqueryElement2) {
    _inherits(helpWindow, _jqueryElement2);

    function helpWindow() {
        _classCallCheck(this, helpWindow);

        var _this2 = _possibleConstructorReturn(this, (helpWindow.__proto__ || Object.getPrototypeOf(helpWindow)).call(this));

        _this2.$el.attr("id", "help");

        _this2.append(new helpWindowItem("<strong>main menu</strong>: right click"));
        _this2.append(new helpWindowItem("drag and drop to <strong>move elements</strong>"));
        _this2.append(new helpWindowItem("<strong>middle click</strong> to rotate elements"));
        _this2.append(new helpWindowItem("<strong>click <img src='img/gui/help.svg' class='helpicon' alt='help icon'></strong> to display documentation (in czech)"));
        return _this2;
    }

    _createClass(helpWindow, [{
        key: "append",
        value: function append(item) {
            this.$el.append(item.$el);
        }
    }]);

    return helpWindow;
}(jqueryElement);

var floatingMenuItem = function (_jqueryElement3) {
    _inherits(floatingMenuItem, _jqueryElement3);

    function floatingMenuItem(specificClass, icon, title, specificTag) {
        _classCallCheck(this, floatingMenuItem);

        var _this3 = _possibleConstructorReturn(this, (floatingMenuItem.__proto__ || Object.getPrototypeOf(floatingMenuItem)).call(this, specificTag));

        _this3.$el.addClass("button");
        _this3.$el.addClass(specificClass);

        _this3.$el.append($("<img>").attr("src", "img/gui/" + icon + ".svg").attr("alt", title).attr("title", title));
        return _this3;
    }

    return floatingMenuItem;
}(jqueryElement);

var floatingMenu = function (_jqueryElement4) {
    _inherits(floatingMenu, _jqueryElement4);

    function floatingMenu(parentSVG) {
        _classCallCheck(this, floatingMenu);

        var _this4 = _possibleConstructorReturn(this, (floatingMenu.__proto__ || Object.getPrototypeOf(floatingMenu)).call(this));

        var id = 'floatingMenu';

        _this4.$el.attr("id", id);

        /* IMPORT */

        // here will be the instance of Lity stored
        // (we need to store it, because the "import" button also closes Lity)
        var lityInstanceImport = void 0;

        var importButton = new floatingMenuItem("import", "import", "Import a network", "a");
        importButton.$el.on("click", function () {
            var $popup = $("<div>").addClass("importExport").addClass("import");

            var textareaId = "importJSON";

            $popup.append($("<textarea></textarea>").attr('id', textareaId)).append($("<a>").attr({
                "href": "#",
                "class": "upload"
            }).append($("<img>").attr('src', "img/gui/import.svg")).append(" import from JSON").on('click', function () {
                var $textarea = $('#' + textareaId);

                // get textarea contents
                var importString = $textarea.val();

                // close Lity
                lityInstanceImport.close();

                // proccess the imported data
                new _importExport.importNetwok(parentSVG, importString);
            }));

            lityInstanceImport = lity($popup);
        });

        _this4.append(importButton);

        /* EXPORT */

        var exportButton = new floatingMenuItem("export", "export", "Export this network", "a");
        exportButton.$el.on("click", function () {
            var data = new _importExport.exportNetwork(parentSVG);

            // create the popup container holding all popup content (that will be passed to lity)
            var $popup = $("<div>").addClass("importExport").addClass("export");

            // generate the block with code to be displayed and append it to the popup element
            $popup.append($("<pre>").append($("<code>").text(data.json(_importExport.exportNetwork.style.pretty))));

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
        });

        _this4.append(exportButton);

        /* HELP */

        var help = new floatingMenuItem("help", "help", "Display help", "a");
        help.$el.on("mouseover", function () {
            $("#help").addClass("visible");
        }).on("mouseout", function () {
            $("#help").removeClass("visible");
        });

        help.$el.attr({
            'href': './docs/user.html',
            'data-lity': ''
        });
        _this4.append(help);

        parentSVG.$svg.after(_this4.$el);
        parentSVG.$svg.after(new helpWindow().$el);
        return _this4;
    }

    _createClass(floatingMenu, [{
        key: "append",
        value: function append(menuItem) {
            this.$el.append(menuItem.$el);
        }
    }]);

    return floatingMenu;
}(jqueryElement);

exports.default = floatingMenu;

},{"./importExport.js":5}],5:[function(require,module,exports){
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

var importNetwok = exports.importNetwok = function importNetwok(parentSVG, string) {
    _classCallCheck(this, importNetwok);

    parentSVG.importData(JSON.parse(string));
};

},{}],6:[function(require,module,exports){
"use strict";

// logic functions used in the gate evaluation

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
    }]);

    return Logic;
}();

exports.default = Logic;

},{}],7:[function(require,module,exports){
"use strict";

var _canvas = require("./canvas.js");

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    var svg = new _canvas2.default("svg#canvas", 10);

    /* DEMO */
    // ONE BIT COMPARATOR
    /*
    let i1 = svg.newInput(100, 100);
    let i2 = svg.newInput(100, 200);
     let n1 = svg.newGate("not", 200, 100);
    let n2 = svg.newGate("not", 200, 200);
     let a1 = svg.newGate("and", 360, 90);
    let a2 = svg.newGate("and", 360, 210);
     let nor = svg.newGate("nor", 540, 150);
     let o1 = svg.newOutput(680, 90);
    let o2 = svg.newOutput(680, 150);
    let o3 = svg.newOutput(680, 210);
     svg.newWire(i1.outputs[0].svgObj.id, n1.inputs[0].svgObj.id);
    svg.newWire(i2.outputs[0].svgObj.id, n2.inputs[0].svgObj.id);
     svg.newWire(i1.outputs[0].svgObj.id, a2.inputs[1].svgObj.id);
    svg.newWire(i2.outputs[0].svgObj.id, a1.inputs[0].svgObj.id);
     svg.newWire(n1.outputs[0].svgObj.id, a1.inputs[1].svgObj.id);
    svg.newWire(n2.outputs[0].svgObj.id, a2.inputs[0].svgObj.id);
     svg.newWire(a1.outputs[0].svgObj.id, nor.inputs[0].svgObj.id);
    svg.newWire(a2.outputs[0].svgObj.id, nor.inputs[1].svgObj.id);
     svg.newWire(a1.outputs[0].svgObj.id, o1.inputs[0].svgObj.id);
    svg.newWire(nor.outputs[0].svgObj.id, o2.inputs[0].svgObj.id);
    svg.newWire(a2.outputs[0].svgObj.id, o3.inputs[0].svgObj.id);
    */

    // BINARY ADDER
    /*
    let i1 = svg.newInput(80, 90);
    let i2 = svg.newInput(80, 130);
    let i3 = svg.newInput(80, 180);
     let x1 = svg.newGate("xor", 360, 100);
    let x2 = svg.newGate("xor", 360, 170);
     let a1 = svg.newGate("and", 250, 220);
    a1.onClickMiddle();// a jednou rotovany
    let a2 = svg.newGate("and", 500, 320);
     let or = svg.newGate("or", 620, 310);
     let o1 = svg.newOutput(750, 270);
    let o2 = svg.newOutput(750, 310);
     svg.newWire(i1.outputs[0].svgObj.id, x1.inputs[0].svgObj.id);
    svg.newWire(i2.outputs[0].svgObj.id, x1.inputs[1].svgObj.id);
    svg.newWire(i3.outputs[0].svgObj.id, x2.inputs[1].svgObj.id);
     svg.newWire(i1.outputs[0].svgObj.id, a1.inputs[1].svgObj.id);
     svg.newWire(i2.outputs[0].svgObj.id, a1.inputs[0].svgObj.id);
     svg.newWire(i3.outputs[0].svgObj.id, a2.inputs[1].svgObj.id);
     svg.newWire(x1.outputs[0].svgObj.id, x2.inputs[0].svgObj.id);
    svg.newWire(x1.outputs[0].svgObj.id, a2.inputs[0].svgObj.id);
     svg.newWire(a1.outputs[0].svgObj.id, or.inputs[0].svgObj.id);
     svg.newWire(x2.outputs[0].svgObj.id, o1.inputs[0].svgObj.id);
    svg.newWire(a2.outputs[0].svgObj.id, or.inputs[1].svgObj.id);
     svg.newWire(or.outputs[0].svgObj.id, o2.inputs[0].svgObj.id);
    */
});

},{"./canvas.js":1}],8:[function(require,module,exports){
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

},{"./logic.js":6}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pattern = exports.PolyLine = exports.PolylinePoints = exports.PolylinePoint = exports.Group = exports.SvgImage = exports.Rectangle = undefined;

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

var Pattern = exports.Pattern = function (_Tag4) {
    _inherits(Pattern, _Tag4);

    function Pattern(id, width, height) {
        _classCallCheck(this, Pattern);

        var _this10 = _possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).call(this, "pattern"));

        _this10.addAttr({
            id: id,
            x: 0,
            y: 0,
            width: width,
            height: height,
            patternUnits: "userSpaceOnUse",
            viewBox: "0 0 " + width + " " + height
        });
        return _this10;
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

},{"./structuresAndClasses.js":10}]},{},[7])

//# sourceMappingURL=main.js.map
