var $__src_47_es6_47_structuresAndClasses_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/structuresAndClasses.js";
  var existingIdInstance = null;
  var Id = function() {
    function Id() {
      if (!existingIdInstance) {
        existingIdInstance = this;
      }
      this.prefix = "id";
      this.nextId = 0;
      return existingIdInstance;
    }
    return ($traceurRuntime.createClass)(Id, {
      get unique() {
        var retVal = this.generate();
        while ($("#" + retVal).length) {
          this.nextId++;
          retVal = this.generate();
        }
        this.nextId++;
        return retVal;
      },
      generate: function() {
        return this.prefix + this.nextId;
      }
    }, {});
  }();
  var MapWithDefaultValue = function() {
    function MapWithDefaultValue(defaultValue) {
      this.map = new Map();
      this.default = defaultValue;
    }
    return ($traceurRuntime.createClass)(MapWithDefaultValue, {
      get size() {
        return this.map.size;
      },
      clear: function() {
        return this.map.clear();
      },
      forEach: function() {
        var $__3;
        for (var args = [],
            $__2 = 0; $__2 < arguments.length; $__2++)
          args[$__2] = arguments[$__2];
        return ($__3 = this.map).forEach.apply($__3, $traceurRuntime.spread(args));
      },
      get: function(key) {
        return this.map.get(key);
      },
      delete: function(key) {
        return this.map.delete(key);
      },
      set: function(key, value) {
        return this.map.set(key, value);
      },
      has: function(key) {
        return this.map.has(key);
      },
      entries: function() {
        return this.map.entries();
      },
      keys: function() {
        return this.map.keys();
      },
      values: function() {
        return this.map.values();
      }
    }, {});
  }();
  return {
    get Id() {
      return Id;
    },
    get MapWithDefaultValue() {
      return MapWithDefaultValue;
    }
  };
})();
var $__src_47_es6_47_svgObjects_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/svgObjects.js";
  var Structures = $__src_47_es6_47_structuresAndClasses_46_js__;
  var Tag = function() {
    function Tag(tagName) {
      this.tagName = tagName;
      this.$el = $("<" + this.tagName + ">");
      this.id = new Structures.Id().unique;
    }
    return ($traceurRuntime.createClass)(Tag, {
      addClass: function(name) {
        this.$el.addClass(name);
      },
      removeClasses: function() {
        for (var classes = [],
            $__12 = 0; $__12 < arguments.length; $__12++)
          classes[$__12] = arguments[$__12];
        var $__8 = true;
        var $__9 = false;
        var $__10 = undefined;
        try {
          for (var $__6 = void 0,
              $__5 = (classes)[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
            var item = $__6.value;
            {
              this.$el.removeClass(item);
            }
          }
        } catch ($__11) {
          $__9 = true;
          $__10 = $__11;
        } finally {
          try {
            if (!$__8 && $__5.return != null) {
              $__5.return();
            }
          } finally {
            if ($__9) {
              throw $__10;
            }
          }
        }
      },
      addAttr: function(assoc) {
        this.checkIfElementExistsInDOM();
        this.$el.attr(assoc);
      },
      getAttr: function(name) {
        this.checkIfElementExistsInDOM();
        return this.$el.attr(name);
      },
      removeAttr: function(name) {
        this.checkIfElementExistsInDOM();
        this.$el.removeAttr(name);
      },
      set id(id) {
        this.addAttr({"id": id});
      },
      get id() {
        return this.getAttr("id");
      },
      get: function() {
        this.checkIfElementExistsInDOM();
        return this.$el;
      },
      checkIfElementExistsInDOM: function() {
        var $jqElement = $("#" + this.$el.attr('id'));
        if ($jqElement.length) {
          this.$el = $jqElement;
        }
      }
    }, {});
  }();
  var Draggable = function($__super) {
    function Draggable(tagName) {
      $traceurRuntime.superConstructor(Draggable).call(this, tagName);
    }
    return ($traceurRuntime.createClass)(Draggable, {draggable: function(value) {
        this.addAttr({"draggable": value});
      }}, {}, $__super);
  }(Tag);
  var Rotatable = function($__super) {
    function Rotatable(tagName) {
      $traceurRuntime.superConstructor(Rotatable).call(this, tagName);
    }
    return ($traceurRuntime.createClass)(Rotatable, {rotatable: function(value) {
        this.addAttr({"rotatable": value});
      }}, {}, $__super);
  }(Tag);
  var DraggableRotatable = function($__super) {
    function DraggableRotatable(tagName) {
      $traceurRuntime.superConstructor(DraggableRotatable).call(this, tagName);
    }
    return ($traceurRuntime.createClass)(DraggableRotatable, {rotatable: function(value) {
        this.addAttr({"rotatable": value});
      }}, {}, $__super);
  }(Draggable);
  var SvgElement = function($__super) {
    function SvgElement(x, y, w, h, tagName) {
      $traceurRuntime.superConstructor(SvgElement).call(this, tagName);
      this.addAttr({
        x: x,
        y: y,
        width: w,
        height: h
      });
    }
    return ($traceurRuntime.createClass)(SvgElement, {}, {}, $__super);
  }(DraggableRotatable);
  var Rectangle = function($__super) {
    function Rectangle(x, y, w, h, fill, stroke) {
      $traceurRuntime.superConstructor(Rectangle).call(this, x, y, w, h, "rect");
      this.addAttr({
        fill: fill,
        stroke: stroke,
        'stroke-width': 0.5,
        'pointer-events': 'all'
      });
    }
    return ($traceurRuntime.createClass)(Rectangle, {}, {}, $__super);
  }(SvgElement);
  var SvgImage = function($__super) {
    function SvgImage(x, y, w, h, url) {
      $traceurRuntime.superConstructor(SvgImage).call(this, x, y, w, h, "image");
      this.addAttr({"xlink:href": url});
    }
    return ($traceurRuntime.createClass)(SvgImage, {changeUrl: function(url) {
        this.addAttr({"xlink:href": url});
      }}, {}, $__super);
  }(SvgElement);
  var Group = function($__super) {
    function Group() {
      $traceurRuntime.superConstructor(Group).call(this, "g");
    }
    return ($traceurRuntime.createClass)(Group, {addChild: function(el) {
        this.$el.append(el.$el);
        return el;
      }}, {}, $__super);
  }(DraggableRotatable);
  var PolylinePoint = function() {
    function PolylinePoint(x, y) {
      this.x = 0;
      this.y = 0;
      if (x !== undefined && y !== undefined) {
        this.x = x;
        this.y = y;
      }
    }
    return ($traceurRuntime.createClass)(PolylinePoint, {
      set: function(x, y) {
        this.x = x;
        this.y = y;
      },
      get string() {
        return this.x + "," + this.y;
      }
    }, {
      parseFromString: function(string) {
        var arr = string.split(",");
        return new PolylinePoint(arr[0], arr[1]);
      },
      equals: function(a, b) {
        return a.x === b.x && a.y === b.y;
      }
    });
  }();
  var SmartArray = function() {
    function SmartArray(arr) {
      if (arr !== undefined) {
        this.arr = arr;
      } else {
        this.arr = [];
      }
    }
    return ($traceurRuntime.createClass)(SmartArray, {
      copy: function() {
        return SmartArray($.extend(true, [], this.arr));
      },
      append: function(point) {
        return this.addWithIndex(point, this.arr.length);
      },
      prepend: function(point) {
        return this.addWithIndex(point, 0);
      },
      addWithIndex: function(point, index) {
        for (var i = this.arr.length; i > index; --i) {
          this.arr[i] = this.arr[i - 1];
        }
        this.arr[index] = point;
        return this;
      },
      get length() {
        return this.arr.length;
      },
      getItem: function(index) {
        return this.arr[index];
      },
      get last() {
        if (this.length !== 0) {
          return this.arr[this.length - 1];
        } else {
          return false;
        }
      },
      get first() {
        if (this.length !== 0) {
          return this.arr[0];
        } else {
          return false;
        }
      },
      remove: function(index) {
        var length = this.length;
        for (var i = index; i < length; ++i) {
          this.arr[i] = this.arr[i + 1];
        }
        this.arr.pop();
      }
    }, {});
  }();
  var PolylinePoints = function($__super) {
    function PolylinePoints(arr) {
      $traceurRuntime.superConstructor(PolylinePoints).call(this, arr);
    }
    return ($traceurRuntime.createClass)(PolylinePoints, {
      copy: function() {
        return new PolylinePoints($.extend(true, [], this.arr));
      },
      append: function(point) {
        $traceurRuntime.superGet(this, PolylinePoints.prototype, "append").call(this, point);
        var length = this.length;
        if (length >= 3 && ((this.getItem(length - 3).x === this.getItem(length - 2).x && this.getItem(length - 2).x === this.getItem(length - 1).x) || (this.getItem(length - 3).y === this.getItem(length - 2).y && this.getItem(length - 2).y === this.getItem(length - 1).y))) {
          this.remove(length - 2);
        }
        return this;
      },
      get string() {
        var string = "";
        for (var i = 0; i < this.length; ++i) {
          if (i !== 0) {
            string += " ";
          }
          string += this.arr[i].string;
        }
        return string;
      },
      forEach: function(func) {
        for (var i = 0; i < this.arr.length; ++i) {
          func(this.arr[i]);
        }
      }
    }, {parseFromString: function(string) {
        var pointStrings = string.split(" ");
        var points = new PolylinePoints();
        for (var i = 0; i < pointStrings.length; ++i) {
          points.append(PolylinePoint.parseFromString(pointStrings[i]));
        }
        return points;
      }}, $__super);
  }(SmartArray);
  var PolyLine = function($__super) {
    function PolyLine(points, color, strokeWidth) {
      $traceurRuntime.superConstructor(PolyLine).call(this, "polyline");
      this.addAttr({
        points: points.string,
        stroke: color,
        fill: "none",
        "stroke-width": strokeWidth
      });
    }
    return ($traceurRuntime.createClass)(PolyLine, {updatePoints: function(points) {
        this.addAttr({points: points.string});
      }}, {}, $__super);
  }(Tag);
  var Pattern = function($__super) {
    function Pattern(id, width, height) {
      $traceurRuntime.superConstructor(Pattern).call(this, "pattern");
      this.addAttr({
        id: id,
        x: 0,
        y: 0,
        width: width,
        height: height,
        patternUnits: "userSpaceOnUse",
        viewBox: "0 0 " + width + " " + height
      });
    }
    return ($traceurRuntime.createClass)(Pattern, {addChild: function(el) {
        this.$el.append(el.$el);
        return el;
      }}, {}, $__super);
  }(Tag);
  return {
    get Rectangle() {
      return Rectangle;
    },
    get SvgImage() {
      return SvgImage;
    },
    get Group() {
      return Group;
    },
    get PolylinePoint() {
      return PolylinePoint;
    },
    get PolylinePoints() {
      return PolylinePoints;
    },
    get PolyLine() {
      return PolyLine;
    },
    get Pattern() {
      return Pattern;
    }
  };
})();
var $__src_47_es6_47_logic_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/logic.js";
  var Logic = function() {
    function Logic() {}
    return ($traceurRuntime.createClass)(Logic, {}, {
      and: function(a, b) {
        return Logic.testLogicRulesSymmetric(a, b, [[Logic.state.on, Logic.state.on, Logic.state.on], [Logic.state.on, Logic.state.off, Logic.state.off], [Logic.state.on, Logic.state.unknown, Logic.state.unknown], [Logic.state.on, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.off, Logic.state.off, Logic.state.off], [Logic.state.off, Logic.state.unknown, Logic.state.off], [Logic.state.off, Logic.state.oscillating, Logic.state.off], [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown], [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown], [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]]);
      },
      nand: function(a, b) {
        return Logic.not(Logic.and(a, b));
      },
      nor: function(a, b) {
        return Logic.not(Logic.or(a, b));
      },
      not: function(a) {
        if (a === Logic.state.on) {
          return Logic.state.off;
        } else if (a === Logic.state.off) {
          return Logic.state.on;
        } else {
          return a;
        }
      },
      or: function(a, b) {
        return Logic.testLogicRulesSymmetric(a, b, [[Logic.state.on, Logic.state.on, Logic.state.on], [Logic.state.on, Logic.state.off, Logic.state.on], [Logic.state.on, Logic.state.unknown, Logic.state.on], [Logic.state.on, Logic.state.oscillating, Logic.state.on], [Logic.state.off, Logic.state.off, Logic.state.off], [Logic.state.off, Logic.state.unknown, Logic.state.unknown], [Logic.state.off, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown], [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown], [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]]);
      },
      xnor: function(a, b) {
        return Logic.not(Logic.xor(a, b));
      },
      xor: function(a, b) {
        return Logic.testLogicRulesSymmetric(a, b, [[Logic.state.on, Logic.state.on, Logic.state.off], [Logic.state.on, Logic.state.off, Logic.state.on], [Logic.state.on, Logic.state.unknown, Logic.state.unknown], [Logic.state.on, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.off, Logic.state.off, Logic.state.off], [Logic.state.off, Logic.state.unknown, Logic.state.unknown], [Logic.state.off, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown], [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown], [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]]);
      },
      get state() {
        return {
          unknown: 0,
          on: 1,
          off: 2,
          oscillating: 3
        };
      },
      testLogicRulesSymmetric: function(a, b, rules) {
        for (var i = 0; i < rules.length; i++) {
          if ((rules[i][0] === a && rules[i][1] === b) || (rules[i][0] === b && rules[i][1] === a)) {
            return rules[i][2];
          }
        }
      }
    });
  }();
  ;
  return {get default() {
      return Logic;
    }};
})();
var $__src_47_es6_47_editorElements_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/editorElements.js";
  var svgObj = $__src_47_es6_47_svgObjects_46_js__;
  var Structures = $__src_47_es6_47_structuresAndClasses_46_js__;
  var Logic = ($__src_47_es6_47_logic_46_js__).default;
  var stateClasses = {
    on: "stateOn",
    off: "stateOff",
    unknown: "stateUnknown",
    oscillating: "stateOscillating"
  };
  var Property = function() {
    function Property(string) {
      if (string !== undefined) {
        this.name = string.replace(/^[ ]*([^(]+).*/, "$1");
        this.args = string.replace(/^[^(]+\((.*)\)/, "$1").split(' ');
      }
    }
    return ($traceurRuntime.createClass)(Property, {
      setName: function(name) {
        this.name = name;
      },
      setArguments: function(args) {
        this.args = args;
      },
      get: function() {
        return this.name + "(" + this.args.join(" ") + ")";
      }
    }, {});
  }();
  var Transform = function() {
    function Transform(string) {
      this.items = [];
      if (string !== undefined) {
        var splitItems = string.split(")");
        for (var i = 0; i < splitItems.length; i++) {
          if (splitItems[i]) {
            this.items.push(new Property(splitItems[i] + ")"));
          }
        }
      }
    }
    return ($traceurRuntime.createClass)(Transform, {
      getIndex: function(name) {
        for (var i = 0; i < this.items.length; i++) {
          if (name === this.items[i].name) {
            return i;
          }
        }
        return -1;
      },
      getTranslate: function() {
        var args = this.getArguments(this.getIndex("translate"));
        return {
          x: args[0],
          y: args[1]
        };
      },
      getRotate: function() {
        var args = this.getArguments(this.getIndex("rotate"));
        return {
          deg: args[0],
          centreX: args[1],
          centreY: args[2]
        };
      },
      setTranslate: function(x, y) {
        this.setParameter("translate", [x, y]);
      },
      setRotate: function(deg, centreX, centreY) {
        this.setParameter("rotate", [deg, centreX, centreY]);
      },
      rotateRight: function(centreX, centreY) {
        if (this.getIndex("rotate") === -1) {
          this.setRotate(90, centreX, centreY);
        } else {
          var newRotation = (parseInt(this.getRotate().deg) + 90) % 360;
          if (newRotation === 180) {
            var a = centreX;
            centreX = centreY;
            centreY = a;
          }
          this.setRotate(newRotation, centreX, centreY);
        }
      },
      get: function() {
        var retVal = "";
        for (var i = 0; i < this.items.length; i++) {
          if (i !== 0) {
            retVal += " ";
          }
          retVal += this.items[i].get();
        }
        return retVal;
      },
      getArguments: function(index) {
        return this.items[index].args;
      },
      setParameter: function(name, args) {
        var index = this.getIndex(name);
        if (index === -1) {
          index = this.items.length;
          this.items[index] = new Property();
          this.items[index].setName(name);
        }
        this.items[index].setArguments(args);
      }
    }, {});
  }();
  var NetworkElement = function() {
    function NetworkElement(parentSVG) {
      if (!parentSVG) {
        console.error("Parent SVG element has not been defined.");
      }
      this.parentSVG = parentSVG;
      this.svgObj = undefined;
    }
    return ($traceurRuntime.createClass)(NetworkElement, {
      get id() {
        return this.svgObj.id;
      },
      onMouseDown: function() {},
      onMouseUp: function() {},
      onMouseMove: function() {},
      get exportData() {
        console.error("'json' getter has not been defined for this element", this);
        return undefined;
      }
    }, {});
  }();
  var Connector = function($__super) {
    function Connector(parentSVG, gridSize, left, top) {
      $traceurRuntime.superConstructor(Connector).call(this, parentSVG);
      this.gridSize = gridSize;
      this.connectorSize = gridSize;
      this.connectorOffset = this.connectorSize / 2;
      this.svgObj = new svgObj.Rectangle(left * this.gridSize - this.connectorOffset, top * this.gridSize - this.connectorOffset, this.connectorSize, this.connectorSize, "none", "black");
      this.svgObj.$el.addClass("connector");
      this.stateAttr = false;
      this.isInputConnector = false;
      this.stateAttr = Logic.state.unknown;
      this.svgObj.addClass(stateClasses.unknown);
      this.wireIds = new Set();
    }
    return ($traceurRuntime.createClass)(Connector, {
      get isOutputConnector() {
        return !this.isInputConnector;
      },
      addWireId: function(wireId) {
        this.wireIds.add(wireId);
      },
      removeWireId: function(wireId) {
        this.wireIds.delete(wireId);
      },
      removeWireIdAndUpdate: function(wireId) {
        this.removeWireId(wireId);
      },
      setState: function(state, propagationId) {
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
      },
      get state() {
        return this.stateAttr;
      },
      get: function() {
        return this.svgObj;
      },
      onMouseUp: function() {
        this.parentSVG.wireCreationHelper(this.svgObj.id);
      }
    }, {get type() {
        return {
          inputConnector: 0,
          outputConnector: 1
        };
      }}, $__super);
  }(NetworkElement);
  var InputConnector = function($__super) {
    function InputConnector(parentSVG, gridSize, left, top) {
      $traceurRuntime.superConstructor(InputConnector).call(this, parentSVG, gridSize, left, top);
      this.type = Connector.type.inputConnector;
      this.isInputConnector = true;
    }
    return ($traceurRuntime.createClass)(InputConnector, {
      setState: function(state) {
        $traceurRuntime.superGet(this, InputConnector.prototype, "setState").call(this, state);
        var gate = this.parentSVG.getBoxByConnectorId(this.svgObj.id);
        gate.refreshState();
      },
      removeWireIdAndUpdate: function(wireId) {
        $traceurRuntime.superGet(this, InputConnector.prototype, "removeWireIdAndUpdate").call(this, wireId);
        this.setState(Logic.state.unknown);
      },
      get state() {
        return $traceurRuntime.superGet(this, InputConnector.prototype, "state");
      }
    }, {}, $__super);
  }(Connector);
  var OutputConnector = function($__super) {
    function OutputConnector(parentSVG, gridSize, left, top) {
      $traceurRuntime.superConstructor(OutputConnector).call(this, parentSVG, gridSize, left, top);
      this.isOutput = true;
      this.type = Connector.type.outputConnector;
    }
    return ($traceurRuntime.createClass)(OutputConnector, {
      setState: function(state) {
        $traceurRuntime.superGet(this, OutputConnector.prototype, "setState").call(this, state);
        var $__9 = true;
        var $__10 = false;
        var $__11 = undefined;
        try {
          for (var $__7 = void 0,
              $__6 = (this.wireIds)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
            var wireId = $__7.value;
            {
              this.parentSVG.getWireById(wireId).setState(state);
            }
          }
        } catch ($__12) {
          $__10 = true;
          $__11 = $__12;
        } finally {
          try {
            if (!$__9 && $__6.return != null) {
              $__6.return();
            }
          } finally {
            if ($__10) {
              throw $__11;
            }
          }
        }
      },
      get state() {
        return $traceurRuntime.superGet(this, OutputConnector.prototype, "state");
      }
    }, {}, $__super);
  }(Connector);
  var Box = function($__super) {
    function Box(parentSVG, name, category, gridWidth, gridHeight) {
      $traceurRuntime.superConstructor(Box).call(this, parentSVG);
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
      var rectangle = new svgObj.Rectangle(0, 0, this.width, this.height, "none", "none");
      rectangle.$el.addClass('rect');
      this.svgObj.addChild(rectangle);
      this.image = new svgObj.SvgImage(0, 0, this.width, this.height, this.url);
      this.svgObj.addChild(this.image);
      this.svgObj.draggable(true);
      this.svgObj.rotatable(true);
      this.svgObj.addAttr({"type": category});
      this.svgObj.$el.addClass("box");
      this.svgObj.$el.addClass(category);
      this.generateBlockNodes();
      this.triggersSimulationOnRefresh = false;
    }
    return ($traceurRuntime.createClass)(Box, {
      get inputConnectors() {
        return this.connectors.filter(function(conn) {
          return conn.isInputConnector;
        });
      },
      get outputConnectors() {
        return this.connectors.filter(function(conn) {
          return conn.isOutputConnector;
        });
      },
      get exportData() {
        var connections = [];
        var counter = 0;
        var $__16 = true;
        var $__17 = false;
        var $__18 = undefined;
        try {
          for (var $__14 = void 0,
              $__13 = (this.connectors)[Symbol.iterator](); !($__16 = ($__14 = $__13.next()).done); $__16 = true) {
            var conn = $__14.value;
            {
              var $__9 = true;
              var $__10 = false;
              var $__11 = undefined;
              try {
                for (var $__7 = void 0,
                    $__6 = (conn.wireIds)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
                  var item = $__7.value;
                  {
                    var thisWireId = void 0;
                    if (!this.parentSVG.exportWireIdMap.has(item)) {
                      this.parentSVG.exportWireIdMap.set(item, this.parentSVG.exportWireId);
                      thisWireId = this.parentSVG.exportWireId;
                      this.parentSVG.exportWireId++;
                    } else {
                      thisWireId = this.parentSVG.exportWireIdMap.get(item);
                    }
                    connections[connections.length] = {
                      index: counter,
                      type: conn.type,
                      wireId: thisWireId
                    };
                  }
                }
              } catch ($__12) {
                $__10 = true;
                $__11 = $__12;
              } finally {
                try {
                  if (!$__9 && $__6.return != null) {
                    $__6.return();
                  }
                } finally {
                  if ($__10) {
                    throw $__11;
                  }
                }
              }
              counter++;
            }
          }
        } catch ($__19) {
          $__17 = true;
          $__18 = $__19;
        } finally {
          try {
            if (!$__16 && $__13.return != null) {
              $__13.return();
            }
          } finally {
            if ($__17) {
              throw $__18;
            }
          }
        }
        return {
          name: this.name,
          category: this.category,
          transform: this.getTransform(),
          connections: connections
        };
      },
      generateBlockNodes: function() {
        var marginTop = arguments[0] !== (void 0) ? arguments[0] : 0;
        var marginRight = arguments[1] !== (void 0) ? arguments[1] : 0;
        var marginBottom = arguments[2] !== (void 0) ? arguments[2] : 0;
        var marginLeft = arguments[3] !== (void 0) ? arguments[3] : 0;
        for (var specialNodes = [],
            $__20 = 4; $__20 < arguments.length; $__20++)
          specialNodes[$__20 - 4] = arguments[$__20];
        this.blockedNodes = new Set();
        for (var x = marginLeft; x <= this.gridWidth - marginRight; x++) {
          for (var y = marginTop; y <= this.gridHeight - marginBottom; y++) {
            this.blockedNodes.add({
              x: x,
              y: y
            });
          }
        }
        var $__9 = true;
        var $__10 = false;
        var $__11 = undefined;
        try {
          for (var $__7 = void 0,
              $__6 = (specialNodes)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
            var node = $__7.value;
            {
              this.blockedNodes.add(node);
            }
          }
        } catch ($__12) {
          $__10 = true;
          $__11 = $__12;
        } finally {
          try {
            if (!$__9 && $__6.return != null) {
              $__6.return();
            }
          } finally {
            if ($__10) {
              throw $__11;
            }
          }
        }
      },
      refreshState: function() {
        console.warn("Calling the virtual function refreshState has no effect.");
      },
      changeImage: function(suffix) {
        if (suffix === undefined || suffix === "") {
          suffix = "";
        } else {
          suffix = "-" + suffix;
        }
        this.url = "img/" + this.category + "/" + this.name + suffix + ".svg";
        this.image.changeUrl(this.url);
      },
      get: function() {
        return this.svgObj.get();
      },
      removeBlockedNode: function(x, y) {
        var $__9 = true;
        var $__10 = false;
        var $__11 = undefined;
        try {
          for (var $__7 = void 0,
              $__6 = (this.blockedNodes)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
            var item = $__7.value;
            {
              if (item.x === x && item.y === y) {
                this.blockedNodes.delete(item);
                break;
              }
            }
          }
        } catch ($__12) {
          $__10 = true;
          $__11 = $__12;
        } finally {
          try {
            if (!$__9 && $__6.return != null) {
              $__6.return();
            }
          } finally {
            if ($__10) {
              throw $__11;
            }
          }
        }
      },
      rotateBlockedNodesRight: function() {
        var $__5 = this;
        if (this.rotation === undefined || this.rotation === 4) {
          this.rotation = 0;
        }
        this.rotation++;
        if (this.rotation === 1 || this.rotation === 3) {
          var newBlockedNodes = new Set();
          this.blockedNodes.forEach(function(item) {
            newBlockedNodes.add({
              x: Math.abs(item.y - $__5.gridHeight),
              y: item.x
            });
          });
          this.blockedNodes = newBlockedNodes;
        } else if (this.rotation === 2 || this.rotation === 4) {
          var newBlockedNodes$__21 = new Set();
          this.blockedNodes.forEach(function(item) {
            newBlockedNodes$__21.add({
              x: Math.abs(item.y - $__5.gridWidth),
              y: item.x
            });
          });
          this.blockedNodes = newBlockedNodes$__21;
        }
      },
      addConnector: function(left, top, connectorType) {
        var index = this.connectors.length;
        if (connectorType === Connector.type.inputConnector) {
          this.connectors[index] = new InputConnector(this.parentSVG, this.gridSize, left, top);
        } else {
          this.connectors[index] = new OutputConnector(this.parentSVG, this.gridSize, left, top);
        }
        this.svgObj.addChild(this.connectors[index].get());
        this.removeBlockedNode(left, top);
      },
      getConnectorById: function(connectorId) {
        for (var i = 0; i < this.connectors.length; i++) {
          if (this.connectors[i].id === connectorId) {
            return this.connectors[i];
          }
        }
        return undefined;
      },
      getTransform: function() {
        var transform;
        if (!this.svgObj.$el.attr("transform")) {
          transform = new Transform();
          transform.setTranslate(0, 0);
          this.svgObj.addAttr({"transform": transform.get()});
        } else {
          transform = new Transform(this.svgObj.$el.attr("transform"));
        }
        return transform;
      },
      setTransform: function(transform) {
        this.svgObj.addAttr({"transform": transform.get()});
      },
      onMouseDown: function(event) {
        this.mouseLeft = false;
        if (event.which === 1) {
          this.mouseLeft = true;
          this.onMouseDownLeft(event);
          this.parentSVG.moveToFrontById(this.svgObj.id);
        }
      },
      onMouseDownLeft: function(event) {
        this.mouseMoved = false;
        var transform = this.getTransform();
        var currentPosition = transform.getTranslate();
        this.offset = {
          x: event.pageX - currentPosition.x,
          y: event.pageY - currentPosition.y
        };
      },
      onMouseMove: function(event) {
        if (this.mouseLeft) {
          this.mouseMoved = true;
          var left = event.pageX - this.offset.x;
          var top = event.pageY - this.offset.y;
          var transform = this.getTransform();
          transform.setTranslate(left, top);
          this.setTransform(transform);
          this.updateWires(true);
        }
      },
      onMouseUp: function(event) {
        if (event.which === 1) {
          if (this.mouseMoved) {
            this.onDrop(event);
          } else {
            this.onClick();
          }
        } else if (event.which === 2) {
          this.onClickMiddle();
        }
      },
      onDrop: function(event) {
        var left = event.pageX - this.offset.x;
        var top = event.pageY - this.offset.y;
        left = this.parentSVG.snapToGrid(left);
        top = this.parentSVG.snapToGrid(top);
        var transform = this.getTransform();
        transform.setTranslate(left, top);
        this.setTransform(transform);
        this.updateWires();
      },
      onClick: function() {},
      onClickMiddle: function() {
        var transform = this.getTransform();
        var rect = this.svgObj.$el[0].getBoundingClientRect();
        var centreX = Math.round(rect.width / 2);
        var centreY = Math.round(rect.height / 2);
        centreX -= centreX % this.gridSize;
        centreY -= centreY % this.gridSize;
        transform.rotateRight(centreX, centreY);
        this.svgObj.addAttr({"transform": transform.get()});
        this.rotateBlockedNodesRight();
        this.updateWires();
      },
      updateWires: function() {
        var temporary = arguments[0] !== (void 0) ? arguments[0] : false;
        var $__5 = this;
        this.connectors.forEach(function(conn) {
          conn.wireIds.forEach(function(wireId) {
            var wire = $__5.parentSVG.getWireById(wireId);
            if (temporary) {
              wire.temporaryWire();
            } else {
              wire.routeWire();
            }
          });
        });
      }
    }, {}, $__super);
  }(NetworkElement);
  var InputBox = function($__super) {
    function InputBox(parentSVG) {
      var isOn = arguments[1] !== (void 0) ? arguments[1] : false;
      var width = 7;
      var height = 4;
      $traceurRuntime.superConstructor(InputBox).call(this, parentSVG, "input", "io", width, height);
      this.addConnector(width, height / 2, Connector.type.outputConnector);
      this.on = isOn;
      this.triggersSimulationOnRefresh = true;
    }
    return ($traceurRuntime.createClass)(InputBox, {
      get exportData() {
        var data = $traceurRuntime.superGet(this, InputBox.prototype, "exportData");
        data.isOn = this.isOn;
        return data;
      },
      generateBlockNodes: function() {
        $traceurRuntime.superGet(this, InputBox.prototype, "generateBlockNodes").call(this, 0, 1, 1, 0);
      },
      refreshState: function() {
        this.parentSVG.startNewSimulation(this.connectors[0], this.connectors[0].state);
      },
      set on(isOn) {
        if (isOn) {
          this.changeImage("on");
          this.connectors[0].setState(Logic.state.on);
          this.refreshState();
        } else {
          this.changeImage();
          this.connectors[0].setState(Logic.state.off);
          this.refreshState();
        }
        this.isOn = isOn;
      },
      get on() {
        return this.isOn;
      },
      onClick: function() {
        this.on = !this.on;
      }
    }, {}, $__super);
  }(Box);
  var OutputBox = function($__super) {
    function OutputBox(parentSVG) {
      var height = 4;
      var width = 5;
      $traceurRuntime.superConstructor(OutputBox).call(this, parentSVG, "output", "io", width, height);
      this.addConnector(0, height / 2, Connector.type.inputConnector);
    }
    return ($traceurRuntime.createClass)(OutputBox, {
      refreshState: function() {
        this.setState(this.connectors[0].state);
      },
      setState: function(state) {
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
      },
      generateBlockNodes: function() {
        $traceurRuntime.superGet(this, OutputBox.prototype, "generateBlockNodes").call(this, 0, 0, 0, 1);
      }
    }, {}, $__super);
  }(Box);
  var Gate = function($__super) {
    function Gate(parentSVG, name) {
      var width = 9;
      var height = 4;
      $traceurRuntime.superConstructor(Gate).call(this, parentSVG, name, "gate", width, height);
      this.addConnector(width, height / 2, Connector.type.outputConnector);
      if (this.name === "not") {
        this.addConnector(0, height / 2, Connector.type.inputConnector);
      } else {
        this.addConnector(0, height / 4, Connector.type.inputConnector);
        this.addConnector(0, height / (4 / 3), Connector.type.inputConnector);
        this.generateBlockNodes({
          x: 0,
          y: height / 2
        });
      }
      this.refreshState();
    }
    return ($traceurRuntime.createClass)(Gate, {
      generateBlockNodes: function(specialNode) {
        if (specialNode !== undefined) {
          $traceurRuntime.superGet(this, Gate.prototype, "generateBlockNodes").call(this, 0, 1, 0, 1, specialNode);
        } else {
          $traceurRuntime.superGet(this, Gate.prototype, "generateBlockNodes").call(this, 0, 1, 0, 1);
        }
      },
      refreshState: function() {
        var state = Logic.state.unknown;
        switch (this.name) {
          case "and":
            state = Logic.and(this.connectors[1].state, this.connectors[2].state);
            break;
          case "nand":
            state = Logic.nand(this.connectors[1].state, this.connectors[2].state);
            break;
          case "nor":
            state = Logic.nor(this.connectors[1].state, this.connectors[2].state);
            break;
          case "not":
            state = Logic.not(this.connectors[1].state);
            break;
          case "or":
            state = Logic.or(this.connectors[1].state, this.connectors[2].state);
            break;
          case "xnor":
            state = Logic.xnor(this.connectors[1].state, this.connectors[2].state);
            break;
          case "xor":
            state = Logic.xor(this.connectors[1].state, this.connectors[2].state);
            break;
        }
        this.parentSVG.simulator.notifyChange(this.connectors[0].id, state);
      }
    }, {}, $__super);
  }(Box);
  var Wire = function($__super) {
    function Wire(parentSVG, fromId, toId, gridSize) {
      var refresh = arguments[4] !== (void 0) ? arguments[4] : true;
      $traceurRuntime.superConstructor(Wire).call(this, parentSVG);
      this.gridSize = gridSize;
      this.fromId = fromId;
      this.toId = toId;
      this.startBox = this.parentSVG.getBoxByConnectorId(fromId);
      this.endBox = this.parentSVG.getBoxByConnectorId(toId);
      this.boxes = [this.startBox, this.endBox];
      this.startConnector = this.parentSVG.getConnectorById(fromId);
      this.endConnector = this.parentSVG.getConnectorById(toId);
      this.connectors = [this.startConnector, this.endConnector];
      this.routeWire(true, refresh);
      this.stateAttr = Logic.state.unknown;
      var $__9 = true;
      var $__10 = false;
      var $__11 = undefined;
      try {
        for (var $__7 = void 0,
            $__6 = (this.connectors)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
          var connector = $__7.value;
          {
            if (connector.isOutput) {
              this.setState(connector.state);
            }
          }
        }
      } catch ($__12) {
        $__10 = true;
        $__11 = $__12;
      } finally {
        try {
          if (!$__9 && $__6.return != null) {
            $__6.return();
          }
        } finally {
          if ($__10) {
            throw $__11;
          }
        }
      }
      this.svgObj.$el.addClass("wire");
    }
    return ($traceurRuntime.createClass)(Wire, {
      get exportData() {
        return {
          fromId: this.fromId,
          toId: this.toId
        };
      },
      setState: function(state) {
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
        if (this.endConnector.isInputConnector) {
          this.endConnector.setState(state);
        }
        this.stateAttr = state;
      },
      get state() {
        return this.stateAttr;
      },
      updateWireState: function() {
        var $__9 = true;
        var $__10 = false;
        var $__11 = undefined;
        try {
          for (var $__7 = void 0,
              $__6 = (this.boxes)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
            var box = $__7.value;
            {
              box.refreshState();
            }
          }
        } catch ($__12) {
          $__10 = true;
          $__11 = $__12;
        } finally {
          try {
            if (!$__9 && $__6.return != null) {
              $__6.return();
            }
          } finally {
            if ($__10) {
              throw $__11;
            }
          }
        }
      },
      get: function() {
        return this.svgObj.get();
      },
      getTemporaryWirePoints: function() {
        var points = new svgObj.PolylinePoints();
        points.append(new svgObj.PolylinePoint(this.wireStart.x, this.wireStart.y));
        points.append(new svgObj.PolylinePoint(this.wireEnd.x, this.wireEnd.y));
        return points;
      },
      temporaryWire: function() {
        this.wireStart = this.getCoordinates(this.startConnector, false);
        this.wireEnd = this.getCoordinates(this.endConnector, false);
        this.setWirePath(this.getTemporaryWirePoints());
      },
      routeWire: function() {
        var snapToGrid = arguments[0] !== (void 0) ? arguments[0] : true;
        var refresh = arguments[1] !== (void 0) ? arguments[1] : true;
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
        if (refresh)
          this.updateWireState();
      },
      setWirePath: function(points) {
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
      },
      aStar: function(start, end) {
        var maxNodeLimit = 50000;
        var closedNodes = new Set();
        var openNodes = new Set();
        openNodes.add(start);
        var cameFrom = new Map();
        var gScore = new Structures.MapWithDefaultValue(Infinity);
        gScore.set(start, 0);
        var fScore = new Structures.MapWithDefaultValue(Infinity);
        fScore.set(start, Wire.manhattanDistance(start, end));
        var nonRoutable = this.parentSVG.getNonRoutableNodes();
        var punishedButRoutable;
        if (this.svgObj === undefined) {
          punishedButRoutable = this.parentSVG.getInconvenientNodes();
        } else {
          punishedButRoutable = this.parentSVG.getInconvenientNodes(this.svgObj.id);
        }
        while (openNodes.size > 0) {
          var currentNode = void 0;
          var currentNodeFScore = void 0;
          var $__9 = true;
          var $__10 = false;
          var $__11 = undefined;
          try {
            for (var $__7 = void 0,
                $__6 = (openNodes)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
              var node = $__7.value;
              {
                if (!currentNode || fScore.get(node) < currentNodeFScore) {
                  currentNode = node;
                  currentNodeFScore = fScore.get(currentNode);
                }
              }
            }
          } catch ($__12) {
            $__10 = true;
            $__11 = $__12;
          } finally {
            try {
              if (!$__9 && $__6.return != null) {
                $__6.return();
              }
            } finally {
              if ($__10) {
                throw $__11;
              }
            }
          }
          if (svgObj.PolylinePoint.equals(currentNode, end)) {
            return this.reconstructPath(cameFrom, currentNode);
          }
          openNodes.delete(currentNode);
          closedNodes.add(currentNode);
          for (var direction = 0; direction < 4; direction++) {
            var newPoint = Wire.movePoint(currentNode, direction);
            for (var i = 0; i < 50; i++) {
              if (Wire.setHasThisPoint(nonRoutable, this.scalePointToGrid(newPoint))) {
                break;
              }
              if (closedNodes.has(newPoint)) {
                continue;
              }
              if (!openNodes.has(newPoint).y) {
                openNodes.add(newPoint);
              }
              var increment = 1;
              if (i !== 0) {
                increment = 2;
              }
              var possibleGScore = gScore.get(currentNode) + increment;
              if (Wire.setHasThisPoint(punishedButRoutable, this.scalePointToGrid(newPoint))) {
                possibleGScore += 1;
              }
              if (possibleGScore >= gScore.get(newPoint)) {
                continue;
              }
              cameFrom.set(newPoint, currentNode);
              gScore.set(newPoint, possibleGScore);
              fScore.set(newPoint, possibleGScore + Wire.manhattanDistance(newPoint, end));
              if (Wire.setHasThisPoint(punishedButRoutable, this.scalePointToGrid(newPoint))) {
                break;
              }
              newPoint = Wire.movePoint(newPoint, direction);
            }
          }
          if (openNodes.size > maxNodeLimit) {
            break;
          }
        }
        return this.getTemporaryWirePoints();
      },
      scalePointToGrid: function(point) {
        return {
          x: point.x * this.gridSize,
          y: point.y * this.gridSize
        };
      },
      reconstructPath: function(cameFrom, currentNode) {
        var totalPath = new svgObj.PolylinePoints();
        totalPath.append(new svgObj.PolylinePoint(currentNode.x * this.gridSize, currentNode.y * this.gridSize));
        while (cameFrom.has(currentNode)) {
          currentNode = cameFrom.get(currentNode);
          totalPath.append(new svgObj.PolylinePoint(currentNode.x * this.gridSize, currentNode.y * this.gridSize));
        }
        return totalPath;
      },
      getCoordinates: function(connector) {
        var snapToGrid = arguments[1] !== (void 0) ? arguments[1] : true;
        var dummy = connector.svgObj.id;
        var $connector = connector.svgObj.$el;
        var position = $connector.position();
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
      movePoint: function(point, direction) {
        switch (direction) {
          case 0:
            return {
              x: point.x,
              y: point.y - 1
            };
          case 1:
            return {
              x: point.x + 1,
              y: point.y
            };
          case 2:
            return {
              x: point.x,
              y: point.y + 1
            };
          case 3:
            return {
              x: point.x - 1,
              y: point.y
            };
        }
      },
      manhattanDistance: function(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
      },
      setHasThisPoint: function(set, point) {
        var $__9 = true;
        var $__10 = false;
        var $__11 = undefined;
        try {
          for (var $__7 = void 0,
              $__6 = (set)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
            var item = $__7.value;
            {
              if (item.x === point.x && item.y === point.y) {
                return true;
              }
            }
          }
        } catch ($__12) {
          $__10 = true;
          $__11 = $__12;
        } finally {
          try {
            if (!$__9 && $__6.return != null) {
              $__6.return();
            }
          } finally {
            if ($__10) {
              throw $__11;
            }
          }
        }
        return false;
      }
    }, $__super);
  }(NetworkElement);
  return {
    get Transform() {
      return Transform;
    },
    get InputConnector() {
      return InputConnector;
    },
    get OutputConnector() {
      return OutputConnector;
    },
    get InputBox() {
      return InputBox;
    },
    get OutputBox() {
      return OutputBox;
    },
    get Gate() {
      return Gate;
    },
    get Wire() {
      return Wire;
    }
  };
})();
var $__src_47_es6_47_contextMenu_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/contextMenu.js";
  var ContextMenuItem = function() {
    function ContextMenuItem(name, type, contextMenu, parentSVG, clickFunction) {
      this.name = name;
      this.type = type;
      this.contextMenu = contextMenu;
      this.parentSVG = parentSVG;
      this.$el = $("<li>");
      $(this.$el).text(name).attr("type", type);
      if (clickFunction) {
        $(this.$el).click(function(event) {
          clickFunction(event);
          contextMenu.hide();
        });
      }
    }
    return ($traceurRuntime.createClass)(ContextMenuItem, {
      addClass: function(cls) {
        this.$el.addClass(cls);
        return this;
      },
      appendItem: function(item) {
        if (!this.subList) {
          this.subList = $("<ul>");
          this.$el.append(this.subList);
        }
        this.subList.append(item.jQuery);
        return item;
      },
      get jQuery() {
        return this.$el;
      }
    }, {});
  }();
  var GateMenuItem = function($__super) {
    function GateMenuItem(type, contextMenu, parentSVG) {
      $traceurRuntime.superConstructor(GateMenuItem).call(this, type, type, contextMenu, parentSVG, function(event) {
        var position = {
          left: Math.round(contextMenu.position.x / parentSVG.gridSize) * parentSVG.gridSize,
          top: Math.round(contextMenu.position.y / parentSVG.gridSize) * parentSVG.gridSize
        };
        parentSVG.newGate(type, position.left, position.top);
      });
    }
    return ($traceurRuntime.createClass)(GateMenuItem, {}, {}, $__super);
  }(ContextMenuItem);
  var ContextMenu = function() {
    function ContextMenu(parentSVG) {
      var $__3 = this;
      this.parentSVG = parentSVG;
      var gates = ["not", "and", "or", "nand", "nor", "xor", "xnor"];
      this.position = {
        x: 0,
        y: 0
      };
      this.$el = $("<ul>");
      this.$el.attr('id', 'contextMenu');
      var gateList = new ContextMenuItem("New gate", '', this, parentSVG);
      for (var i = 0; i < gates.length; ++i) {
        gateList.appendItem(new GateMenuItem(gates[i], this, parentSVG));
      }
      this.appendItem(gateList);
      this.appendItem(new ContextMenuItem("Input box", '', this, parentSVG, function() {
        var position = {
          left: $__3.parentSVG.snapToGrid($__3.position.x),
          top: $__3.parentSVG.snapToGrid($__3.position.y)
        };
        parentSVG.newInput(position.left, position.top);
      }));
      this.appendItem(new ContextMenuItem("Output box", '', this, parentSVG, function() {
        var position = {
          left: $__3.parentSVG.snapToGrid($__3.position.x),
          top: $__3.parentSVG.snapToGrid($__3.position.y)
        };
        parentSVG.newOutput(position.left, position.top);
      }));
      this.appendConditionalItem('box', 'Remove this item', function(id) {
        $__3.parentSVG.removeBox(id);
      });
      this.appendConditionalItem('wire', 'Remove this wire', function(id) {
        $__3.parentSVG.removeWireById(id);
      });
      parentSVG.$svg.before(this.$el);
    }
    return ($traceurRuntime.createClass)(ContextMenu, {
      appendItem: function(item) {
        this.$el.append(item.jQuery);
        return item;
      },
      appendConditionalItem: function(itemClass, text, clickFunction) {
        if (!this.conditionalItems) {
          this.conditionalItems = [];
        }
        this.conditionalItems[this.conditionalItems.length] = {
          itemClass: itemClass,
          text: text,
          clickFunction: clickFunction
        };
      },
      resolveConditionalItems: function($target) {
        var $__3 = this;
        var $__4 = this,
            $__5 = function(i) {
              if ($target.hasClass($__4.conditionalItems[i].itemClass)) {
                $__4.appendItem(new ContextMenuItem($__4.conditionalItems[i].text, '', $__4, $__4.parentSVG, function() {
                  $__3.conditionalItems[i].clickFunction($target.attr('id'));
                })).addClass('conditional');
              }
            };
        for (var i = 0; i < this.conditionalItems.length; ++i) {
          $__5(i);
        }
      },
      hideAllConditionalItems: function() {
        this.$el.children('.conditional').remove();
      },
      display: function(x, y, $target) {
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
      },
      hide: function() {
        this.$el.css({display: 'none'});
        this.hideAllConditionalItems();
      }
    }, {});
  }();
  ;
  return {get default() {
      return ContextMenu;
    }};
})();
var $__src_47_es6_47_importExport_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/importExport.js";
  var exportNetwork = function() {
    function exportNetwork(parentSVG) {
      this.parentSVG = parentSVG;
    }
    return ($traceurRuntime.createClass)(exportNetwork, {
      get exportData() {
        return this.parentSVG.exportData;
      },
      json: function() {
        var style = arguments[0] !== (void 0) ? arguments[0] : exportNetwork.style.compact;
        var dataUri = arguments[1] !== (void 0) ? arguments[1] : false;
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
    }, {get style() {
        return {
          pretty: 0,
          compact: 1
        };
      }});
  }();
  var importNetwok = function() {
    function importNetwok(parentSVG, string) {
      parentSVG.importData(JSON.parse(string));
    }
    return ($traceurRuntime.createClass)(importNetwok, {}, {});
  }();
  return {
    get exportNetwork() {
      return exportNetwork;
    },
    get importNetwok() {
      return importNetwok;
    }
  };
})();
var $__src_47_es6_47_floatingMenu_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/floatingMenu.js";
  var $__6 = $__src_47_es6_47_importExport_46_js__,
      exportNetwork = $__6.exportNetwork,
      importNetwok = $__6.importNetwok;
  var jqueryElement = function() {
    function jqueryElement(specificTag) {
      if (!specificTag) {
        this.$el = $("<div>");
      } else {
        this.$el = $("<" + specificTag + ">");
      }
    }
    return ($traceurRuntime.createClass)(jqueryElement, {}, {});
  }();
  var helpWindowItem = function($__super) {
    function helpWindowItem(text) {
      $traceurRuntime.superConstructor(helpWindowItem).call(this);
      this.$el.addClass("helpWindowItem");
      this.$el.html(text);
    }
    return ($traceurRuntime.createClass)(helpWindowItem, {}, {}, $__super);
  }(jqueryElement);
  var helpWindow = function($__super) {
    function helpWindow() {
      $traceurRuntime.superConstructor(helpWindow).call(this);
      this.$el.attr("id", "help");
      this.append(new helpWindowItem("<strong>main menu</strong>: right click"));
      this.append(new helpWindowItem("drag and drop to <strong>move elements</strong>"));
      this.append(new helpWindowItem("<strong>middle click</strong> to rotate elements"));
      this.append(new helpWindowItem("<strong>click <img src='img/gui/help.svg' class='helpicon' alt='help icon'></strong> to display documentation (in czech)"));
    }
    return ($traceurRuntime.createClass)(helpWindow, {append: function(item) {
        this.$el.append(item.$el);
      }}, {}, $__super);
  }(jqueryElement);
  var floatingMenuItem = function($__super) {
    function floatingMenuItem(specificClass, icon, title, specificTag) {
      $traceurRuntime.superConstructor(floatingMenuItem).call(this, specificTag);
      this.$el.addClass("button");
      this.$el.addClass(specificClass);
      this.$el.append($("<img>").attr("src", "img/gui/" + icon + ".svg").attr("alt", title).attr("title", title));
    }
    return ($traceurRuntime.createClass)(floatingMenuItem, {}, {}, $__super);
  }(jqueryElement);
  var floatingMenu = function($__super) {
    function floatingMenu(parentSVG) {
      $traceurRuntime.superConstructor(floatingMenu).call(this);
      var id = 'floatingMenu';
      this.$el.attr("id", id);
      var lityInstanceImport;
      var importButton = new floatingMenuItem("import", "import", "Import a network", "a");
      importButton.$el.on("click", function() {
        var $popup = $("<div>").addClass("importExport").addClass("import");
        var textareaId = "importJSON";
        $popup.append($("<textarea></textarea>").attr('id', textareaId)).append($("<a>").attr({
          "href": "#",
          "class": "upload"
        }).append($("<img>").attr('src', "img/gui/import.svg")).append(" import from JSON").on('click', function() {
          var $textarea = $('#' + textareaId);
          var importString = $textarea.val();
          lityInstanceImport.close();
          new importNetwok(parentSVG, importString);
        }));
        lityInstanceImport = lity($popup);
      });
      this.append(importButton);
      var exportButton = new floatingMenuItem("export", "export", "Export this network", "a");
      exportButton.$el.on("click", function() {
        var data = new exportNetwork(parentSVG);
        var $popup = $("<div>").addClass("importExport").addClass("export");
        $popup.append($("<pre>").append($("<code>").text(data.json(exportNetwork.style.pretty))));
        $popup.append($("<a>").attr({
          "href": data.json(exportNetwork.style.pretty, true),
          "class": "download",
          "download": "network.json"
        }).append($("<img>").attr('src', "img/gui/export.svg")).append(" expanded JSON"));
        $popup.append($("<a>").attr({
          "href": data.json(exportNetwork.style.compact, true),
          "class": "download",
          "download": "network.min.json"
        }).append($("<img>").attr('src', "img/gui/export.svg")).append(" compact JSON"));
        lity($popup);
      });
      this.append(exportButton);
      var help = new floatingMenuItem("help", "help", "Display help", "a");
      help.$el.on("mouseover", function() {
        $("#help").addClass("visible");
      }).on("mouseout", function() {
        $("#help").removeClass("visible");
      });
      help.$el.attr({
        'href': './docs/',
        'data-lity': ''
      });
      this.append(help);
      parentSVG.$svg.after(this.$el);
      parentSVG.$svg.after(new helpWindow().$el);
    }
    return ($traceurRuntime.createClass)(floatingMenu, {append: function(menuItem) {
        this.$el.append(menuItem.$el);
      }}, {}, $__super);
  }(jqueryElement);
  ;
  return {get default() {
      return floatingMenu;
    }};
})();
var $__src_47_es6_47_logicSimulator_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/logicSimulator.js";
  var Logic = ($__src_47_es6_47_logic_46_js__).default;
  var stateChange = function() {
    function stateChange(connectorId, state, whoCausedIt) {
      this.connectorId = connectorId;
      this.state = state;
      this.whoCausedIt = whoCausedIt;
    }
    return ($traceurRuntime.createClass)(stateChange, {}, {});
  }();
  var Simulator = function() {
    function Simulator(parentSVG) {
      this.parentSVG = parentSVG;
      this.predecessors = new Map();
      this.waves = new Map();
      this.wave = 0;
      this.cycledConnectors = new Map();
      this.resolvedCycledConnectors = new Set();
    }
    return ($traceurRuntime.createClass)(Simulator, {
      run: function() {
        this.wave++;
        while (this.waves.has(this.wave)) {
          this.step();
          this.waves.delete(this.wave);
          this.wave++;
        }
      },
      step: function() {
        var $__5 = true;
        var $__6 = false;
        var $__7 = undefined;
        try {
          for (var $__3 = void 0,
              $__2 = (this.waves.get(this.wave))[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
            var $__9 = $__3.value,
                connectorId = $__9.connectorId,
                state = $__9.state,
                whoCausedIt = $__9.whoCausedIt;
            {
              if (this.resolvedCycledConnectors.has(connectorId)) {
                continue;
              }
              if (this.cycledConnectors.has(connectorId)) {
                var states = this.cycledConnectors.get(connectorId);
                if (states.has(state)) {
                  if (states.size > 1) {
                    state = Logic.state.oscillating;
                  }
                  this.resolvedCycledConnectors.add(connectorId);
                } else {
                  states.add(state);
                }
                this.cycledConnectors.set(connectorId, states);
              }
              this.whoCausedIt = connectorId;
              if (whoCausedIt) {
                this.addPredecessor(connectorId, whoCausedIt);
              }
              if (!this.cycledConnectors.has(connectorId) && this.getAllPredecessors(connectorId).has(connectorId)) {
                this.cycledConnectors.set(connectorId, new Set([state]));
              }
              var connector = this.parentSVG.getConnectorById(connectorId);
              if (connector) {
                connector.setState(state);
              }
            }
          }
        } catch ($__8) {
          $__6 = true;
          $__7 = $__8;
        } finally {
          try {
            if (!$__5 && $__2.return != null) {
              $__2.return();
            }
          } finally {
            if ($__6) {
              throw $__7;
            }
          }
        }
        this.whoCausedIt = undefined;
      },
      addPredecessor: function(connectorId, predecessorConnectorId) {
        if (!this.predecessors.has(connectorId)) {
          this.predecessors.set(connectorId, new Set());
        }
        this.predecessors.get(connectorId).add(predecessorConnectorId);
      },
      getAllPredecessors: function(connectorId) {
        if (!this.predecessors.has(connectorId)) {
          this.predecessors.set(connectorId, new Set());
        }
        var all = new Set();
        this.predecessors.get(connectorId).forEach(all.add, all);
        var prevSize = 0;
        var size = all.size;
        while (prevSize < size) {
          var $__5 = true;
          var $__6 = false;
          var $__7 = undefined;
          try {
            for (var $__3 = void 0,
                $__2 = (all)[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
              var connector = $__3.value;
              {
                if (this.predecessors.has(connector)) {
                  this.predecessors.get(connector).forEach(all.add, all);
                }
              }
            }
          } catch ($__8) {
            $__6 = true;
            $__7 = $__8;
          } finally {
            try {
              if (!$__5 && $__2.return != null) {
                $__2.return();
              }
            } finally {
              if ($__6) {
                throw $__7;
              }
            }
          }
          prevSize = size;
          size = all.size;
        }
        return all;
      },
      notifyChange: function(connectorId, state) {
        var waveId = this.wave + 1;
        if (!this.waves.has(waveId)) {
          this.waves.set(waveId, []);
        }
        this.waves.get(waveId).push(new stateChange(connectorId, state, this.whoCausedIt));
      }
    }, {});
  }();
  ;
  return {get default() {
      return Simulator;
    }};
})();
var $__src_47_es6_47_canvas_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/canvas.js";
  var svgObj = $__src_47_es6_47_svgObjects_46_js__;
  var editorElements = $__src_47_es6_47_editorElements_46_js__;
  var Logic = ($__src_47_es6_47_logic_46_js__).default;
  var ContextMenu = ($__src_47_es6_47_contextMenu_46_js__).default;
  var FloatingMenu = ($__src_47_es6_47_floatingMenu_46_js__).default;
  var Simulator = ($__src_47_es6_47_logicSimulator_46_js__).default;
  var Svg = function() {
    function Svg(canvas, gridSize) {
      var $__2 = this;
      this.$svg = $(canvas);
      this.gridSize = gridSize;
      this.boxes = [];
      this.wires = [];
      this.simulationEnabled = true;
      this.simulator = new Simulator(this);
      this.$defs = $("<defs>");
      this.$svg.prepend(this.$defs);
      var pattern = new svgObj.Pattern("grid", this.gridSize, this.gridSize);
      var patternPoints = new svgObj.PolylinePoints().append(new svgObj.PolylinePoint(0, 0)).append(new svgObj.PolylinePoint(this.gridSize, 0)).append(new svgObj.PolylinePoint(this.gridSize, this.gridSize));
      pattern.addChild(new svgObj.PolyLine(patternPoints, "#a3a4d2", 2));
      this.addPattern(pattern.get());
      this.background = new svgObj.Rectangle(0, 0, "100%", "100%", "url(#grid)", "none");
      this.appendJQueryObject(this.background.get());
      this.refresh();
      this.contextMenu = new ContextMenu(this);
      this.floatingMenu = new FloatingMenu(this);
      var target;
      this.$svg.on('mousedown', function(event) {
        target = $__2.getRealTarget(event.target);
        if (target !== undefined) {
          target.onMouseDown(event);
        }
        $__2.hideContextMenu();
        event.preventDefault();
      }).on('mousemove', function(event) {
        if (target !== undefined) {
          target.onMouseMove(event);
        }
        event.preventDefault();
      }).on('mouseup', function(event) {
        if (target !== undefined) {
          target.onMouseUp(event);
        }
        target = undefined;
        event.preventDefault();
      }).on("contextmenu", function(event) {
        $__2.displayContextMenu(event.pageX, event.pageY, $__2.getRealJQueryTarget(event.target));
        event.preventDefault();
      });
    }
    return ($traceurRuntime.createClass)(Svg, {
      get exportData() {
        this.exportWireIdMap = new Map();
        this.exportWireId = 0;
        var data = {boxes: []};
        for (var i = 0; i < this.boxes.length; ++i) {
          data.boxes[i] = this.boxes[i].exportData;
        }
        return data;
      },
      importData: function(data) {
        var $__2 = this;
        this.simulationEnabled = false;
        var newWires = new Map();
        for (var i = 0; i < data.boxes.length; ++i) {
          var box = void 0;
          switch (data.boxes[i].category) {
            case "gate":
              box = this.newGate(data.boxes[i].name, 0, 0, false);
              break;
            case "io":
              switch (data.boxes[i].name) {
                case "input":
                  box = this.newInput(0, 0, data.boxes[i].isOn, false);
                  break;
                case "output":
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
            for (var j$__10 = 0; j$__10 < data.boxes[i].connections.length; ++j$__10) {
              var wireId = data.boxes[i].connections[j$__10].wireId;
              var value = {
                index: data.boxes[i].connections[j$__10].index,
                type: data.boxes[i].connections[j$__10].type,
                boxId: box.id
              };
              if (newWires.has(wireId)) {
                var mapValue = newWires.get(wireId);
                mapValue[mapValue.length] = value;
                newWires.set(wireId, mapValue);
              } else {
                newWires.set(wireId, [value]);
              }
            }
          }
        }
        this.refresh();
        newWires.forEach(function(item) {
          var connectorIds = [];
          if (item[0] && item[1]) {
            var $__6 = true;
            var $__7 = false;
            var $__8 = undefined;
            try {
              for (var $__4 = void 0,
                  $__3 = ([0, 1])[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
                var i = $__4.value;
                {
                  var box = $__2.getBoxById(item[i].boxId);
                  connectorIds[i] = box.connectors[item[i].index].id;
                }
              }
            } catch ($__9) {
              $__7 = true;
              $__8 = $__9;
            } finally {
              try {
                if (!$__6 && $__3.return != null) {
                  $__3.return();
                }
              } finally {
                if ($__7) {
                  throw $__8;
                }
              }
            }
          }
          $__2.newWire(connectorIds[0], connectorIds[1], true);
        });
        this.refresh();
        this.simulationEnabled = true;
        var $__6 = true;
        var $__7 = false;
        var $__8 = undefined;
        try {
          for (var $__4 = void 0,
              $__3 = (this.boxes)[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
            var box$__11 = $__4.value;
            {
              if (box$__11 instanceof editorElements.InputBox) {
                box$__11.on = !box$__11.on;
                box$__11.on = !box$__11.on;
              }
            }
          }
        } catch ($__9) {
          $__7 = true;
          $__8 = $__9;
        } finally {
          try {
            if (!$__6 && $__3.return != null) {
              $__3.return();
            }
          } finally {
            if ($__7) {
              throw $__8;
            }
          }
        }
      },
      wireCreationHelper: function(connectorId) {
        if (!this.firstConnectorId) {
          this.firstConnectorId = connectorId;
        } else {
          this.newWire(this.firstConnectorId, connectorId);
          this.firstConnectorId = undefined;
        }
      },
      startNewSimulation: function(startingConnector, state) {
        if (this.simulationEnabled) {
          this.simulator = new Simulator(this);
          this.simulator.notifyChange(startingConnector.id, state);
          this.simulator.run();
        }
      },
      newGate: function(name, x, y) {
        var refresh = arguments[3] !== (void 0) ? arguments[3] : true;
        return this.newBox(x, y, new editorElements.Gate(this, name, x, y), refresh);
      },
      newInput: function(x, y) {
        var isOn = arguments[2] !== (void 0) ? arguments[2] : false;
        var refresh = arguments[3] !== (void 0) ? arguments[3] : true;
        return this.newBox(x, y, new editorElements.InputBox(this, isOn), refresh);
      },
      newOutput: function(x, y) {
        var refresh = arguments[2] !== (void 0) ? arguments[2] : true;
        return this.newBox(x, y, new editorElements.OutputBox(this), refresh);
      },
      newBox: function(x, y, object) {
        var refresh = arguments[3] !== (void 0) ? arguments[3] : true;
        var index = this.boxes.length;
        this.boxes[index] = object;
        if (x && y) {
          var tr = new editorElements.Transform();
          tr.setTranslate(x, y);
          this.boxes[index].svgObj.addAttr({"transform": tr.get()});
        }
        this.appendElement(this.boxes[index], refresh);
        return this.boxes[index];
      },
      removeBox: function(gateId) {
        var $gate = $("#" + gateId);
        var gateIndex = -1;
        for (var i = 0; i < this.boxes.length; i++) {
          if (this.boxes[i].svgObj.id === gateId) {
            gateIndex = i;
            break;
          }
        }
        if (gateIndex > -1) {
          for (var i$__12 = 0; i$__12 < this.boxes[gateIndex].connectors.length; i$__12++) {
            this.removeWiresByConnectorId(this.boxes[gateIndex].connectors[i$__12].svgObj.id);
          }
          this.boxes.splice(gateIndex, 1);
          $gate.remove();
        } else {
          console.error("Trying to remove an nonexisting gate. (Gate id: " + gateId + ")");
        }
      },
      newWire: function(fromId, toId) {
        var refresh = arguments[2] !== (void 0) ? arguments[2] : true;
        var $__2 = this;
        if (fromId === toId)
          return false;
        var connectors = [this.getConnectorById(fromId), this.getConnectorById(toId)];
        connectors.forEach(function(conn) {
          if (conn.isInputConnector)
            $__2.removeWiresByConnectorId(conn.id);
        });
        var index = this.wires.length;
        this.wires[index] = new editorElements.Wire(this, fromId, toId, this.gridSize, refresh);
        connectors.forEach(function(conn) {
          conn.addWireId($__2.wires[index].svgObj.id);
        });
        this.appendElement(this.wires[index], refresh);
        this.moveToBackById(this.wires[index].svgObj.id);
        if (refresh)
          this.wires[index].updateWireState();
        return this.wires[index];
      },
      getWireById: function(wireId) {
        var wireCount = this.wires.length;
        for (var i = 0; i < wireCount; i++) {
          if (this.wires[i].svgObj.id === wireId) {
            return this.wires[i];
          }
        }
        return false;
      },
      getWiresByConnectorId: function(connectorId) {
        var connector = this.getConnectorById(connectorId);
        return connector.wireIds;
      },
      removeWireById: function(wireId) {
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
      },
      removeWiresByConnectorId: function(connectorId) {
        var $__2 = this;
        var connector = this.getConnectorById(connectorId);
        connector.wireIds.forEach(function(wireId) {
          var wire = $__2.getWireById(wireId);
          var otherConnector = $__2.getConnectorById(wire.fromId, wire);
          if (otherConnector.svgObj.id === connectorId) {
            otherConnector = $__2.getConnectorById(wire.toId, wire);
          }
          otherConnector.wireIds.delete(wireId);
          $("#" + wireId).remove();
          if (otherConnector.isInputConnector) {
            otherConnector.setState(Logic.state.unknown);
          }
        });
        connector.wireIds.clear();
        if (connector.isInputConnector) {
          connector.setState(Logic.state.unknown);
        }
      },
      getBoxById: function(gateId) {
        for (var i = 0; i < this.boxes.length; i++) {
          if (this.boxes[i].svgObj.id === gateId) {
            return this.boxes[i];
          }
        }
        return false;
      },
      getBoxByConnectorId: function(connectorId) {
        for (var i = 0; i < this.boxes.length; i++) {
          if (this.boxes[i].getConnectorById(connectorId) !== undefined) {
            return this.boxes[i];
          }
        }
        return false;
      },
      getConnectorById: function(connectorId, wire) {
        if (wire !== undefined) {
          var connector = wire.startBox.getConnectorById(connectorId);
          if (!connector) {
            connector = wire.endBox.getConnectorById(connectorId);
          }
          return connector;
        } else {
          var gateCount = this.boxes.length;
          for (var i = 0; i < gateCount; i++) {
            var connector$__13 = this.boxes[i].getConnectorById(connectorId);
            if (connector$__13) {
              return connector$__13;
            }
          }
        }
      },
      getRealJQueryTarget: function(target) {
        var $target = $(target);
        if (!$target.hasClass("connector") && $target.parents('g').length > 0) {
          $target = $target.parent();
          while ($target.prop("tagName") !== "G" && $target.prop("tagName") !== "g") {
            $target = $target.parent();
          }
        }
        return $target;
      },
      getRealTarget: function(target) {
        var $target = $(target);
        if ($target.hasClass("connector")) {
          return this.getConnectorById($target.attr('id'));
        } else if ($target.parents('g').length > 0) {
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
      },
      appendElement: function(element) {
        var refresh = arguments[1] !== (void 0) ? arguments[1] : true;
        this.appendJQueryObject(element.get(), refresh);
      },
      appendJQueryObject: function(object) {
        var refresh = arguments[1] !== (void 0) ? arguments[1] : true;
        this.$svg.append(object);
        if (refresh) {
          this.refresh();
        }
      },
      addPattern: function(pattern) {
        this.$defs.append(pattern);
        this.refresh();
      },
      refresh: function() {
        this.$svg.html(this.$svg.html());
        console.log("SVG document has been reloaded.");
      },
      displayContextMenu: function(x, y, $target) {
        this.contextMenu.display(x, y, $target);
      },
      hideContextMenu: function() {
        this.contextMenu.hide();
      },
      snapToGrid: function(value) {
        return Math.round(value / this.gridSize) * this.gridSize;
      },
      getNonRoutableNodes: function() {
        var blockedNodes = new Set();
        for (var i = 0; i < this.boxes.length; ++i) {
          var rect = $('#' + this.boxes[i].svgObj.id).children(".rect")[0];
          var position = $(rect).position();
          position.left = this.snapToGrid(position.left);
          position.top = this.snapToGrid(position.top);
          var $__6 = true;
          var $__7 = false;
          var $__8 = undefined;
          try {
            for (var $__4 = void 0,
                $__3 = (this.boxes[i].blockedNodes)[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
              var item = $__4.value;
              {
                var absoluteX = position.left + item.x * this.gridSize;
                var absoluteY = position.top + item.y * this.gridSize;
                blockedNodes.add({
                  x: absoluteX,
                  y: absoluteY
                });
              }
            }
          } catch ($__9) {
            $__7 = true;
            $__8 = $__9;
          } finally {
            try {
              if (!$__6 && $__3.return != null) {
                $__3.return();
              }
            } finally {
              if ($__7) {
                throw $__8;
              }
            }
          }
        }
        return blockedNodes;
      },
      moveToFrontById: function(objId) {
        this.$svg.append($("#" + objId));
      },
      moveToBackById: function(objId) {
        $("#" + this.background.id).after($("#" + objId));
      },
      getInconvenientNodes: function(ignoreWireId) {
        var $__2 = this;
        var inconvenientNodes = new Set();
        var $__14 = this,
            $__15 = function(i) {
              if (ignoreWireId === undefined || ignoreWireId !== $__14.wires[i].svgObj.id) {
                var prevPoint;
                $__14.wires[i].points.forEach(function(point) {
                  if (prevPoint === undefined) {
                    inconvenientNodes.add({
                      x: point.x,
                      y: point.y
                    });
                  } else {
                    if (prevPoint.x === point.x) {
                      var from = Math.min(prevPoint.y, point.y);
                      var to = Math.max(prevPoint.y, point.y);
                      while (from <= to) {
                        inconvenientNodes.add({
                          x: point.x,
                          y: from
                        });
                        from += $__2.gridSize;
                      }
                    } else if (prevPoint.y === point.y) {
                      var from$__16 = Math.min(prevPoint.x, point.x);
                      var to$__17 = Math.max(prevPoint.x, point.x);
                      while (from$__16 <= to$__17) {
                        inconvenientNodes.add({
                          x: from$__16,
                          y: point.y
                        });
                        from$__16 += $__2.gridSize;
                      }
                    } else {
                      console.error("getInconvenientNodes: line between two points is neither horizontal nor vertical");
                    }
                  }
                  prevPoint = {
                    x: point.x,
                    y: point.y
                  };
                });
              }
            };
        for (var i = 0; i < this.wires.length; ++i) {
          $__15(i);
        }
        return inconvenientNodes;
      }
    }, {snapToGrid: function(value, gridSize) {
        return Math.round(value / gridSize) * gridSize;
      }});
  }();
  ;
  return {get default() {
      return Svg;
    }};
})();
var $__src_47_es6_47_main_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/main.js";
  var Svg = ($__src_47_es6_47_canvas_46_js__).default;
  $(function() {
    var svg = new Svg("svg#canvas", 10);
  });
  return {};
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiIsInNyYy9lczYvc3RydWN0dXJlc0FuZENsYXNzZXMuanMiLCJzcmMvZXM2L3N2Z09iamVjdHMuanMiLCJzcmMvZXM2L2xvZ2ljLmpzIiwic3JjL2VzNi9lZGl0b3JFbGVtZW50cy5qcyIsInNyYy9lczYvY29udGV4dE1lbnUuanMiLCJzcmMvZXM2L2ltcG9ydEV4cG9ydC5qcyIsInNyYy9lczYvZmxvYXRpbmdNZW51LmpzIiwic3JjL2VzNi9sb2dpY1NpbXVsYXRvci5qcyIsInNyYy9lczYvY2FudmFzLmpzIiwic3JjL2VzNi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQUFBSSxJQUFBLENBQUEsWUFBVyxvQ0FBb0IsQ0FBQztBQ0dwQyxBQUFJLElBQUEsQ0FBQSxrQkFBaUIsRUFBSSxLQUFHLENBQUM7SUFFaEIsR0FBQyxFQUxkLENBQUEsU0FBUyxBQUFEO0FBS0QsV0FBTSxHQUFDLENBQ0UsQUFBRCxDQUFHO0FBQ1YsU0FBRyxDQUFDLGtCQUFpQixDQUFFO0FBQ25CLHlCQUFpQixFQUFJLEtBQUcsQ0FBQztNQUM3QjtBQUFBLEFBRUEsU0FBRyxPQUFPLEVBQUksS0FBRyxDQUFDO0FBQ2xCLFNBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBQztBQUVmLFdBQU8sbUJBQWlCLENBQUM7SUFDN0I7QUFvQkosQUFqQ1UsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBZWhDLFFBQUksT0FBSyxFQUFJO0FBQ1QsQUFBSSxVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBSTVCLGNBQU0sQ0FBQSxBQUFDLENBQUMsR0FBRSxFQUFFLE9BQUssQ0FBQyxPQUFPLENBQUc7QUFDeEIsYUFBRyxPQUFPLEVBQUUsQ0FBQztBQUNiLGVBQUssRUFBSSxDQUFBLElBQUcsU0FBUyxBQUFDLEVBQUMsQ0FBQztRQUM1QjtBQUFBLEFBRUEsV0FBRyxPQUFPLEVBQUUsQ0FBQztBQUViLGFBQU8sT0FBSyxDQUFDO01BQ2pC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QUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDL0MsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDcEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FFeEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDbEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDMUQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDOUQsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sWUFBWSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FDOUUsQ0FBQyxDQUFDO01BQ047QUFDTyxTQUFHLENBQVYsVUFBWSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDZCxhQUFPLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxLQUFJLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO01BQ3JDO0FBQ08sUUFBRSxDQUFULFVBQVcsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFHO0FBQ2IsYUFBTyxDQUFBLEtBQUksd0JBQXdCLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQ3ZDLENBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sR0FBRyxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQ3pELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWpFLEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2xELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzFELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzlELEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZ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QUEsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JFLGlCQUFLO0FBQUEsQUFDVCxhQUFLLE9BQUs7QUFDTixnQkFBSSxFQUFLLENBQUEsS0FBSSxLQUFLLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFHLENBQUEsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3RFLGlCQUFLO0FBQUEsQUFDVCxhQUFLLE1BQUk7QUFDTCxnQkFBSSxFQUFLLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFHLENBQUEsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JFLGlCQUFLO0FBQUEsQUFDVCxhQUFLLE1BQUk7QUFDTCxnQkFBSSxFQUFLLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDM0MsaUJBQUs7QUFBQSxBQUNULGFBQUssS0FBRztBQUNKLGdCQUFJLEVBQUssQ0FBQSxLQUFJLEdBQUcsQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUcsQ0FBQSxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDcEUsaUJBQUs7QUFBQSxBQUNULGFBQUssT0FBSztBQUNOLGdCQUFJLEVBQUssQ0FBQSxLQUFJLEtBQUssQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUcsQ0FBQSxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDdEUsaUJBQUs7QUFBQSxBQUNULGFBQUssTUFBSTtBQUNMLGdCQUFJLEVBQUssQ0FBQSxLQUFJLElBQUksQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUcsQ0FBQSxJQUFHLFdBQVcsQ0FBRSxDQUFB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VyxDQUFHLEdBQUMsQ0FBQyxDQUFDO0VBMkV2QyxDQUFDLENBQUM7QUE5RUYsV0FBdUIiLCJmaWxlIjoiL2hvbWUvd2FyYW4vU2tvbGEvcnAvY29kZS90ZW1wb3V0TUM0eU1qVXhNakF5TURnME5qZzNPRFF5TWdyZWRyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGwsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzaW5nbGV0b24gdG8gZ2VuZXJhdGUgdW5pcXVlIGlkJ3NcbmxldCBleGlzdGluZ0lkSW5zdGFuY2UgPSBudWxsO1xuLy8gdXNhZ2U6IGxldCBpZCA9IG5ldyBJZCgpLnVuaXF1ZVxuZXhwb3J0IGNsYXNzIElkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYoIWV4aXN0aW5nSWRJbnN0YW5jZSl7XG4gICAgICAgICAgICBleGlzdGluZ0lkSW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVmaXggPSBcImlkXCI7XG4gICAgICAgIHRoaXMubmV4dElkID0gMDtcblxuICAgICAgICByZXR1cm4gZXhpc3RpbmdJZEluc3RhbmNlO1xuICAgIH1cblxuICAgIGdldCB1bmlxdWUoKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSB0aGlzLmdlbmVyYXRlKCk7XG5cbiAgICAgICAgLy8gZmluZCBuZXh0IHVudXNlZCBpZFhYWFggdG8gcHJldmVudCBpZCBjb2xsaXNpb24gdGhhdCBtaWdodCBiZSBjYXVzZWQgYnkgc29tZSBvdGhlciBjb21wb25lbnRcbiAgICAgICAgLy8gKGl0IHJlYWxseSBzaG91bGQgbm90IGhhcHBlbiwgYnV0IHRoaXMgaXMgYSBzaW1wbGUgbWV0aG9kIHRvIGVuc3VyZSBzYWZldHkpXG4gICAgICAgIHdoaWxlKCQoXCIjXCIrcmV0VmFsKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dElkKys7XG4gICAgICAgICAgICByZXRWYWwgPSB0aGlzLmdlbmVyYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMgaWRcbiAgICAgICAgdGhpcy5uZXh0SWQrKztcblxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cblxuICAgIGdlbmVyYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggKyB0aGlzLm5leHRJZDtcbiAgICB9XG59XG5cbi8vIHRvIGVzNSBjb21waWxlciBmcmllbmRseSBpbXBsZW1lbnRhdGlvbiAoXCJjYWxsaW5nIGEgYnVpbHRpbiBNYXAgY29uc3RydWN0b3Igd2l0aG91dCBuZXcgaXMgZm9yYmlkZGVuXCIpXG5leHBvcnQgY2xhc3MgTWFwV2l0aERlZmF1bHRWYWx1ZSB7XG4gICAgY29uc3RydWN0b3IoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmRlZmF1bHQgPSBkZWZhdWx0VmFsdWU7XG5cblxuICAgIH1cblxuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc2l6ZTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgZm9yRWFjaCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5mb3JFYWNoKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldChrZXkpO1xuICAgIH1cblxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmRlbGV0ZShrZXkpO1xuICAgIH1cblxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuaGFzKGtleSk7XG4gICAgfVxuXG4gICAgZW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmVudHJpZXMoKTtcbiAgICB9XG5cbiAgICBrZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAua2V5cygpO1xuICAgIH1cblxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnZhbHVlcygpO1xuICAgIH1cbn1cblxuLypcbi8vIGVzNiBpbXBsZW1lbnRhdGlvblxuZXhwb3J0IGNsYXNzIE1hcFdpdGhEZWZhdWx0VmFsdWUgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGlmKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5nZXQoa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4qLyIsImltcG9ydCAqIGFzIFN0cnVjdHVyZXMgZnJvbSAnLi9zdHJ1Y3R1cmVzQW5kQ2xhc3Nlcy5qcydcblxuY2xhc3MgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHRoaXMudGFnTmFtZSA9IHRhZ05hbWU7XG5cbiAgICAgICAgdGhpcy4kZWwgPSAkKFwiPFwiK3RoaXMudGFnTmFtZStcIj5cIik7XG5cbiAgICAgICAgdGhpcy5pZCA9IG5ldyBTdHJ1Y3R1cmVzLklkKCkudW5pcXVlO1xuICAgIH1cblxuICAgIGFkZENsYXNzKG5hbWUpIHtcbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MobmFtZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2xhc3NlcyguLi5jbGFzc2VzKSB7XG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiBjbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcyhpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEF0dHIoYXNzb2MpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG5cbiAgICAgICAgLy8gYWRkIGF0dHJpYnV0ZXMgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy4kZWwuYXR0cihhc3NvYyk7XG4gICAgfVxuXG4gICAgZ2V0QXR0cihuYW1lKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLiRlbC5hdHRyKG5hbWUpO1xuICAgIH1cblxuICAgIHJlbW92ZUF0dHIobmFtZSkge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcblxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVBdHRyKG5hbWUpO1xuICAgIH1cblxuICAgIHNldCBpZChpZCkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wiaWRcIjogaWR9KTtcbiAgICB9O1xuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyKFwiaWRcIik7XG4gICAgfTtcblxuICAgIGdldCgpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbDtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgZWxlbWVudCBleGlzdHMgaW4gZG9tLCB3ZSBuZWVkIHRvIGZldGNoIGl0IHVzaW5nIGpRdWVyeVxuICAgIGNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKSB7XG4gICAgICAgIGxldCAkanFFbGVtZW50ID0gJChcIiNcIit0aGlzLiRlbC5hdHRyKCdpZCcpKTtcbiAgICAgICAgaWYoJGpxRWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJGpxRWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuICAgIH1cblxuICAgIGRyYWdnYWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wiZHJhZ2dhYmxlXCI6IHZhbHVlfSk7XG4gICAgfVxufVxuXG5jbGFzcyBSb3RhdGFibGUgZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgcm90YXRhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJyb3RhdGFibGVcIjogdmFsdWV9KTtcbiAgICB9XG59XG5cbi8vIHRoZXJlIGlzIG5vIG11bHRpcGxlIGluaGVyaXRhbmNlIGluIEVTNiwgc28gSSBoYXZlIHRvIGRvIHNvbWV0aGluZyB1Z2x5IGxpa2UgdGhpc1xuY2xhc3MgRHJhZ2dhYmxlUm90YXRhYmxlIGV4dGVuZHMgRHJhZ2dhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHJvdGF0YWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wicm90YXRhYmxlXCI6IHZhbHVlfSk7XG4gICAgfVxufVxuXG5jbGFzcyBTdmdFbGVtZW50IGV4dGVuZHMgRHJhZ2dhYmxlUm90YXRhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoLCB0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIFN2Z0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIGZpbGwsIHN0cm9rZSkge1xuICAgICAgICBzdXBlcih4LCB5LCB3LCBoLCBcInJlY3RcIik7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBmaWxsOiBmaWxsLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2UsXG4gICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMC41LFxuICAgICAgICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ2FsbCcgLy8gdG8gdHJpZ2dlciBob3ZlciBldmVuIHdpdGggdHJhbnNwYXJlbnQgYmFja2dyb3VuZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdmdJbWFnZSBleHRlbmRzIFN2Z0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIHVybCkge1xuICAgICAgICBzdXBlcih4LCB5LCB3LCBoLCBcImltYWdlXCIpO1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgXCJ4bGluazpocmVmXCI6IHVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VVcmwodXJsKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBcInhsaW5rOmhyZWZcIjogdXJsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyb3VwIGV4dGVuZHMgRHJhZ2dhYmxlUm90YXRhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJnXCIpO1xuICAgIH1cblxuICAgIGFkZENoaWxkKGVsKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChlbC4kZWwpO1xuICAgICAgICByZXR1cm4gZWw7IC8vIHBybyBqZWRub2R1c3NpIFwibGV0IHJlY3QgPSBnLmFkZENoaWxkKG5ldyBSZWN0YW5nbGUoLi4uXCJcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2x5bGluZVBvaW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIGlmKHggIT09IHVuZGVmaW5lZCAmJiB5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0KHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VGcm9tU3RyaW5nKHN0cmluZykge1xuICAgICAgICBsZXQgYXJyID0gc3RyaW5nLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2x5bGluZVBvaW50KGFyclswXSwgYXJyWzFdKTtcbiAgICB9XG5cbiAgICBnZXQgc3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICsgXCIsXCIgKyB0aGlzLnk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFscyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnggPT09IGIueCAmJiBhLnkgPT09IGIueTtcbiAgICB9XG59XG5cbmNsYXNzIFNtYXJ0QXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycikge1xuICAgICAgICBpZihhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hcnIgPSBhcnI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFyciA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIFNtYXJ0QXJyYXkoJC5leHRlbmQodHJ1ZSwgW10sIHRoaXMuYXJyKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKHBvaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFdpdGhJbmRleChwb2ludCwgdGhpcy5hcnIubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBwcmVwZW5kKHBvaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFdpdGhJbmRleChwb2ludCwgMCk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGEgcG9pbnQgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgbW92ZSBhbGwgZm9sbG93aW5nIGl0ZW1zXG4gICAgYWRkV2l0aEluZGV4KHBvaW50LCBpbmRleCkge1xuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLmFyci5sZW5ndGggOyBpID4gaW5kZXggOyAtLWkpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyW2ldID0gdGhpcy5hcnJbaS0xXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFycltpbmRleF0gPSBwb2ludDtcbiAgICAgICAgcmV0dXJuIHRoaXM7IC8vIHRvIGVuYWJsZSBjaGFpbmluZyBvZiBhcHBlbmQgLyBwcmVwcGVuZCAvIGFkZFdpdGhJbmRleCBjb21tYW5kc1xuICAgIH1cblxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyci5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0SXRlbShpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnJbaW5kZXhdO1xuICAgIH1cblxuICAgIGdldCBsYXN0KCkge1xuICAgICAgICBpZih0aGlzLmxlbmd0aCE9PTApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFyclt0aGlzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGZpcnN0KCkge1xuICAgICAgICBpZih0aGlzLmxlbmd0aCE9PTApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFyclswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGluZGV4QXJyYXkgbXVzdCBiZSBzb3J0ZWQgKEFTQywgZWcuIFsxLCAzLCA0LCA4XSlcbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IGluZGV4IDsgaSA8IGxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5hcnJbaV0gPSB0aGlzLmFycltpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcnIucG9wKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9seWxpbmVQb2ludHMgZXh0ZW5kcyBTbWFydEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcbiAgICAgICAgc3VwZXIoYXJyKTtcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvbHlsaW5lUG9pbnRzKCQuZXh0ZW5kKHRydWUsIFtdLCB0aGlzLmFycikpO1xuICAgIH1cblxuICAgIGFwcGVuZChwb2ludCkge1xuICAgICAgICAvLyBjYWxsIGluaGVyaXRlZCBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIGFwcGVuZGluZ1xuICAgICAgICBzdXBlci5hcHBlbmQocG9pbnQpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBzZWNvbmQgdG8gbGFzdCBwb2ludCBpcyB1bm5lY2Vzc2FyeSwgcmVtb3ZlIGl0XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgaWYgKCBsZW5ndGggPj0gM1xuICAgICAgICAgICAgICAgICYmICggICAgKCB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMykueCA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnggPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAxKS54IClcbiAgICAgICAgICAgICAgICAgICAgIHx8ICggdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDMpLnkgPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS55ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS55ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMSkueSApXG4gICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGxlbmd0aCAtIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMgZWxlbWVudCAodG8gYWxsb3cgY2hhaW5pbmcpXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHBhcnNlRnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgbGV0IHBvaW50U3RyaW5ncyA9IHN0cmluZy5zcGxpdChcIiBcIik7XG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgUG9seWxpbmVQb2ludHMoKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHBvaW50U3RyaW5ncy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIHBvaW50cy5hcHBlbmQoUG9seWxpbmVQb2ludC5wYXJzZUZyb21TdHJpbmcocG9pbnRTdHJpbmdzW2ldKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIGdldCBzdHJpbmcoKSB7XG4gICAgICAgIGxldCBzdHJpbmcgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBpZihpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyaW5nICs9IHRoaXMuYXJyW2ldLnN0cmluZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgIH1cblxuICAgIGZvckVhY2goZnVuYykge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYXJyLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgZnVuYyh0aGlzLmFycltpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2x5TGluZSBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IocG9pbnRzLCBjb2xvciwgc3Ryb2tlV2lkdGgpIHtcbiAgICAgICAgc3VwZXIoXCJwb2x5bGluZVwiKTtcblxuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgcG9pbnRzOiBwb2ludHMuc3RyaW5nLFxuICAgICAgICAgICAgc3Ryb2tlOiBjb2xvcixcbiAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgXCJzdHJva2Utd2lkdGhcIjogc3Ryb2tlV2lkdGhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlUG9pbnRzKHBvaW50cykge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgcG9pbnRzOiBwb2ludHMuc3RyaW5nXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhdHRlcm4gZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKGlkLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKFwicGF0dGVyblwiKTtcblxuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIHBhdHRlcm5Vbml0czogXCJ1c2VyU3BhY2VPblVzZVwiLFxuICAgICAgICAgICAgdmlld0JveDogXCIwIDAgXCIrd2lkdGgrXCIgXCIraGVpZ2h0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZENoaWxkKGVsKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChlbC4kZWwpO1xuICAgICAgICByZXR1cm4gZWw7IC8vIHBybyBqZWRub2R1c3NpIFwibGV0IHJlY3QgPSBnLmFkZENoaWxkKG5ldyBSZWN0YW5nbGUoLi4uXCJcbiAgICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGxvZ2ljIGZ1bmN0aW9ucyB1c2VkIGluIHRoZSBnYXRlIGV2YWx1YXRpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2ljIHtcbiAgICBzdGF0aWMgYW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLnRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIFtcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vZmZdLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLnVua25vd25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ11cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHN0YXRpYyBuYW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLm5vdChMb2dpYy5hbmQoYSwgYikpO1xuICAgIH1cbiAgICBzdGF0aWMgbm9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLm5vdChMb2dpYy5vcihhLCBiKSk7XG4gICAgfVxuICAgIHN0YXRpYyBub3QoYSkge1xuICAgICAgICBpZihhID09PSBMb2dpYy5zdGF0ZS5vbikge1xuICAgICAgICAgICAgcmV0dXJuIExvZ2ljLnN0YXRlLm9mZjtcbiAgICAgICAgfSBlbHNlIGlmIChhID09PSBMb2dpYy5zdGF0ZS5vZmYpIHtcbiAgICAgICAgICAgIHJldHVybiBMb2dpYy5zdGF0ZS5vbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBvcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy50ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBbXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vbl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBzdGF0aWMgeG5vcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy5ub3QoTG9naWMueG9yKGEsIGIpKTtcbiAgICB9XG4gICAgc3RhdGljIHhvcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy50ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBbXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1bmtub3duOiAwLFxuICAgICAgICAgICAgb246IDEsXG4gICAgICAgICAgICBvZmY6IDIsXG4gICAgICAgICAgICBvc2NpbGxhdGluZzogM1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIHJ1bGVzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHJ1bGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoKHJ1bGVzW2ldWzBdPT09YSAmJiBydWxlc1tpXVsxXT09PWIpIHx8IChydWxlc1tpXVswXT09PWIgJiYgcnVsZXNbaV1bMV09PT1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBydWxlc1tpXVsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBzdmdPYmogZnJvbSAnLi9zdmdPYmplY3RzLmpzJ1xuaW1wb3J0ICogYXMgU3RydWN0dXJlcyBmcm9tICcuL3N0cnVjdHVyZXNBbmRDbGFzc2VzLmpzJ1xuaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMuanMnXG5cbi8vIG1hcHBpbmcgbG9naWNhbCBzdGF0ZXMgdG8gY3NzIGNsYXNzZXNcbmNvbnN0IHN0YXRlQ2xhc3NlcyA9IHtcbiAgICBvbjogXCJzdGF0ZU9uXCIsXG4gICAgb2ZmOiBcInN0YXRlT2ZmXCIsXG4gICAgdW5rbm93bjogXCJzdGF0ZVVua25vd25cIixcbiAgICBvc2NpbGxhdGluZzogXCJzdGF0ZU9zY2lsbGF0aW5nXCJcbn07XG5cbi8vIGhlbHBlciBjbGFzcyB1c2VkIGJ5IFRyYW5zZm9ybVxuY2xhc3MgUHJvcGVydHkge1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZykge1xuICAgICAgICBpZihzdHJpbmchPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHN0cmluZy5yZXBsYWNlKC9eWyBdKihbXihdKykuKi8sIFwiJDFcIik7XG4gICAgICAgICAgICB0aGlzLmFyZ3MgPSBzdHJpbmcucmVwbGFjZSgvXlteKF0rXFwoKC4qKVxcKS8sIFwiJDFcIikuc3BsaXQoJyAnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE5hbWUobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIHNldEFyZ3VtZW50cyhhcmdzKSB7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCIoXCIgKyB0aGlzLmFyZ3Muam9pbihcIiBcIikgKyBcIilcIjtcbiAgICB9XG59XG5cbi8vIHVzZWQgdG8gbWFuaXB1bGF0ZSB0aGUgdHJhbnNmb3JtIGFyZ3VtZW50IHVzZWQgaW4gU1ZHXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgICAgIGlmKHN0cmluZyE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IHNwbGl0SXRlbXMgPSBzdHJpbmcuc3BsaXQoXCIpXCIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBzcGxpdEl0ZW1zLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKHNwbGl0SXRlbXNbaV0pIHsgLy8gaWYgbm90IGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgUHJvcGVydHkoc3BsaXRJdGVtc1tpXSArIFwiKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBpbmRleCBvciAtMVxuICAgIGdldEluZGV4KG5hbWUpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihuYW1lID09PSB0aGlzLml0ZW1zW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBnZXRUcmFuc2xhdGUoKSB7XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5nZXRBcmd1bWVudHModGhpcy5nZXRJbmRleChcInRyYW5zbGF0ZVwiKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGFyZ3NbMF0sXG4gICAgICAgICAgICB5OiBhcmdzWzFdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRSb3RhdGUoKSB7XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5nZXRBcmd1bWVudHModGhpcy5nZXRJbmRleChcInJvdGF0ZVwiKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlZzogYXJnc1swXSxcbiAgICAgICAgICAgIGNlbnRyZVg6IGFyZ3NbMV0sXG4gICAgICAgICAgICBjZW50cmVZOiBhcmdzWzJdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXRzIHRoZSB0cmFuc2xhdGlvblxuICAgIHNldFRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFwidHJhbnNsYXRlXCIsIFt4LCB5XSk7XG4gICAgfVxuXG4gICAgLy8gc2V0cyB0aGUgcm90YXRpb25cbiAgICBzZXRSb3RhdGUoZGVnLCBjZW50cmVYLCBjZW50cmVZKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFwicm90YXRlXCIsIFtkZWcsIGNlbnRyZVgsIGNlbnRyZVldKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdGhlIHJvdGF0aW9uXG4gICAgcm90YXRlUmlnaHQoY2VudHJlWCwgY2VudHJlWSkge1xuICAgICAgICBpZih0aGlzLmdldEluZGV4KFwicm90YXRlXCIpPT09LTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Um90YXRlKDkwLCBjZW50cmVYLCBjZW50cmVZKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXdSb3RhdGlvbiA9IChwYXJzZUludCh0aGlzLmdldFJvdGF0ZSgpLmRlZykgKyA5MCkgJSAzNjA7XG5cbiAgICAgICAgICAgIGlmKG5ld1JvdGF0aW9uPT09MTgwKSB7XG4gICAgICAgICAgICAgICAgLy8gc3dhcCBjZW50cmUgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIHJvdGF0ZShjLCB4LCB5KSBpcyBkZWZpbmVkIGxpa2UgdHJhbnNmb3JtKC14LCAteSkgcm90YXRlKGMpIHRyYW5zZm9ybSh4LCB5KVxuICAgICAgICAgICAgICAgIGxldCBhID0gY2VudHJlWDtcbiAgICAgICAgICAgICAgICBjZW50cmVYID0gY2VudHJlWTtcbiAgICAgICAgICAgICAgICBjZW50cmVZID0gYTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRSb3RhdGUoXG4gICAgICAgICAgICAgICAgbmV3Um90YXRpb24sXG4gICAgICAgICAgICAgICAgY2VudHJlWCxcbiAgICAgICAgICAgICAgICBjZW50cmVZXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0aGUgdHJhbnNmb3JtIHByb3BlcnRpZXMgY29uY2F0ZW5hdGVkXG4gICAgZ2V0KCkge1xuICAgICAgICBsZXQgcmV0VmFsID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoaSE9PTApIHtcbiAgICAgICAgICAgICAgICByZXRWYWwgKz0gXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXRWYWwgKz0gdGhpcy5pdGVtc1tpXS5nZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cblxuICAgIGdldEFyZ3VtZW50cyhpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tpbmRleF0uYXJncztcbiAgICB9XG5cbiAgICBzZXRQYXJhbWV0ZXIobmFtZSwgYXJncykge1xuICAgICAgICAvLyBkZXRlcm1pbmUgaW5kZXggb2YgdGhlIHBhcmFtZXRlciAoaWYgc2V0KSwgZWxzZSBpbmRleCA9PSAtMVxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4KG5hbWUpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBoYXMgYmVlbiBhbHJlYWR5IHNldCwgY2hhbmdlIGl0IChyZXdyaXRlIHRoZSBhcnJheSBpbiB0aGUgcmlnaHQgaW5kZXgpXG4gICAgICAgIC8vIGVsc2UgY3JlYXRlIGEgbmV3IG9uZSAoc2V0IGluZGV4IHRvIHRoZSBsZW5ndGggb2YgYW4gYXJyYXkgLS0+IGFkIGFuIGl0ZW0gdG8gdGhlIGVuZClcbiAgICAgICAgaWYoaW5kZXg9PT0tMSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdID0gbmV3IFByb3BlcnR5KCk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5zZXROYW1lKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2F2ZSBhcmdzIHVuZGVyIHRoZSByaWdodCBpbmRleFxuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5zZXRBcmd1bWVudHMoYXJncyk7XG4gICAgfVxufVxuXG4vLyBwYXJlbnQgY2xhc3MgZm9yIGFsbCBuZXR3b3JrIGVsZW1lbnRzXG5jbGFzcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIGlmKCFwYXJlbnRTVkcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQYXJlbnQgU1ZHIGVsZW1lbnQgaGFzIG5vdCBiZWVuIGRlZmluZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIC8vIHVzZWQgdG8gc3RvcmUgdGhlIHN2ak9iamVjdCdzIGluc3RhbmNlIG9mIHRoaXMgZWxlbWVudFxuICAgICAgICB0aGlzLnN2Z09iaiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iai5pZDtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bigpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24gdG8gcHJldmVudCBlcnJvciBtZXNzYWdlcywgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbGF0ZXIgaW4gdGhlIEJveCBjbGFzc1xuICAgIH1cblxuICAgIG9uTW91c2VVcCgpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24gdG8gcHJldmVudCBlcnJvciBtZXNzYWdlcywgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbGF0ZXIgaW4gdGhlIEJveCBhbmQgQ29ubmVjdG9yIGNsYXNzZXNcbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZSgpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24gdG8gcHJldmVudCBlcnJvciBtZXNzYWdlcywgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbGF0ZXIgaW4gdGhlIEJveCBjbGFzc1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiJ2pzb24nIGdldHRlciBoYXMgbm90IGJlZW4gZGVmaW5lZCBmb3IgdGhpcyBlbGVtZW50XCIsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBpbnB1dCBhbmQgb3V0cHV0IGNvbm5lY3RvcnMgKHRoZSB0aGluZ3MgeW91IGNsaWNrIG9uXG4vLyB3aGVuIHlvdSB3YW50IHRvIGNvbm5lY3QgZWxlbWVudHMpXG5jbGFzcyBDb25uZWN0b3IgZXh0ZW5kcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKSB7IC8vIHVuaXQgb2YgbGVmdCAvIHRvcCBpcyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZFxuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTaXplID0gZ3JpZFNpemU7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yT2Zmc2V0ID0gdGhpcy5jb25uZWN0b3JTaXplIC8gMjtcblxuICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouUmVjdGFuZ2xlKFxuICAgICAgICAgICAgbGVmdCAqIHRoaXMuZ3JpZFNpemUgLSB0aGlzLmNvbm5lY3Rvck9mZnNldCxcbiAgICAgICAgICAgIHRvcCAqIHRoaXMuZ3JpZFNpemUgLSB0aGlzLmNvbm5lY3Rvck9mZnNldCxcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2l6ZSxcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2l6ZSxcbiAgICAgICAgICAgIFwibm9uZVwiLFxuICAgICAgICAgICAgXCJibGFja1wiXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKFwiY29ubmVjdG9yXCIpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gZmFsc2U7XG5cbiAgICAgICAgLy8gaWYgYSB3aXJlIGNhbiBzZXQgY29ubmVjdG9yJ3Mgc3RhdGVcbiAgICAgICAgdGhpcy5pc0lucHV0Q29ubmVjdG9yID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBMb2dpYy5zdGF0ZS51bmtub3duO1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG5cbiAgICAgICAgdGhpcy53aXJlSWRzID0gbmV3IFNldCgpO1xuICAgIH1cblxuICAgIGdldCBpc091dHB1dENvbm5lY3RvcigpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzSW5wdXRDb25uZWN0b3I7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5wdXRDb25uZWN0b3I6IDAsXG4gICAgICAgICAgICBvdXRwdXRDb25uZWN0b3I6IDFcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFdpcmVJZCh3aXJlSWQpIHtcbiAgICAgICAgdGhpcy53aXJlSWRzLmFkZCh3aXJlSWQpO1xuICAgIH1cblxuICAgIHJlbW92ZVdpcmVJZCh3aXJlSWQpIHtcbiAgICAgICAgdGhpcy53aXJlSWRzLmRlbGV0ZSh3aXJlSWQpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZXMgdGhlIHdpcmUgYW5kIHVwZGF0ZXMgdGhlIGNvbm5lY3RvclxuICAgIHJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVXaXJlSWQod2lyZUlkKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSwgcHJvcGFnYXRpb25JZCkge1xuICAgICAgICB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub2ZmOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vZmYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlQXR0cjtcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iajtcbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHLndpcmVDcmVhdGlvbkhlbHBlcih0aGlzLnN2Z09iai5pZCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRDb25uZWN0b3IgZXh0ZW5kcyBDb25uZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuXG5cbiAgICAgICAgdGhpcy50eXBlID0gQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3I7XG4gICAgICAgIHRoaXMuaXNJbnB1dENvbm5lY3RvciA9IHRydWU7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NldFN0YXRlIG9uJywgdGhpcy5pZClcblxuICAgICAgICBzdXBlci5zZXRTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgbGV0IGdhdGUgPSB0aGlzLnBhcmVudFNWRy5nZXRCb3hCeUNvbm5lY3RvcklkKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICAgICAgZ2F0ZS5yZWZyZXNoU3RhdGUoKTtcbiAgICB9XG5cbiAgICByZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKSB7XG4gICAgICAgIHN1cGVyLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24pO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXRlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dENvbm5lY3RvciBleHRlbmRzIENvbm5lY3RvciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG5cbiAgICAgICAgLy8gdXNlZCB0byBzZXQgdGhlIHdpcmUgc3RhdGUgZHVyaW5nIHdpcmUgaW5pdGlhbGl6YXRpb24gYmFzZWQgb24gdGhlIG91dHB1dCBjb25uZWN0b3Igc3RhdGVcbiAgICAgICAgdGhpcy5pc091dHB1dCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy50eXBlID0gQ29ubmVjdG9yLnR5cGUub3V0cHV0Q29ubmVjdG9yO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyLnNldFN0YXRlKHN0YXRlKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHdpcmVJZCBvZiB0aGlzLndpcmVJZHMpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLmdldFdpcmVCeUlkKHdpcmVJZCkuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIuc3RhdGU7XG4gICAgfVxufVxuXG4vLyBwYXJlbnQgY2xhc3MgZm9yIGdhdGVzIGFuZCBpbnB1dCBhbmQgb3V0cHV0IGJveGVzXG5jbGFzcyBCb3ggZXh0ZW5kcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBuYW1lLCBjYXRlZ29yeSwgZ3JpZFdpZHRoLCBncmlkSGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHBhcmVudFNWRyk7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgICAgICB0aGlzLmdyaWRTaXplID0gdGhpcy5wYXJlbnRTVkcuZ3JpZFNpemU7XG5cbiAgICAgICAgdGhpcy51cmwgPSBcImltZy9cIiArIHRoaXMuY2F0ZWdvcnkgKyBcIi9cIiArIHRoaXMubmFtZSArIFwiLnN2Z1wiO1xuXG4gICAgICAgIHRoaXMuY29ubmVjdG9ycyA9IFtdO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqID0gbmV3IHN2Z09iai5Hcm91cCgpO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSBncmlkV2lkdGggKiB0aGlzLmdyaWRTaXplO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGdyaWRIZWlnaHQgKiB0aGlzLmdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMuZ3JpZFdpZHRoID0gZ3JpZFdpZHRoO1xuICAgICAgICB0aGlzLmdyaWRIZWlnaHQgPSBncmlkSGVpZ2h0O1xuXG4gICAgICAgIC8vIHRyYW5zcGFyZW50IGJhY2tncm91bmQgcmVjdGFuZ2xlXG4gICAgICAgIGxldCByZWN0YW5nbGUgPSBuZXcgc3ZnT2JqLlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgXCJub25lXCIsIFwibm9uZVwiKTtcbiAgICAgICAgcmVjdGFuZ2xlLiRlbC5hZGRDbGFzcygncmVjdCcpO1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRDaGlsZChyZWN0YW5nbGUpO1xuICAgICAgICAvLyBpbWFnZSBvZiB0aGUgZWxlbWVudFxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IHN2Z09iai5TdmdJbWFnZSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy51cmwpO1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRDaGlsZCh0aGlzLmltYWdlKTtcblxuICAgICAgICAvLyBhZGQgZHJhZ2dhYmlsaXR5IGFuZCByb3RhdGFiaWxpdHlcbiAgICAgICAgdGhpcy5zdmdPYmouZHJhZ2dhYmxlKHRydWUpO1xuICAgICAgICB0aGlzLnN2Z09iai5yb3RhdGFibGUodHJ1ZSk7XG5cbiAgICAgICAgLy8gYWRkIHR5cGU9XCJnYXRlXCIsIHVzZWQgaW4gc3BlY2lhbCBjYWxsYmFja3MgaW4gY29udGV4dG1lbnVcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0eXBlXCI6IGNhdGVnb3J5fSk7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKFwiYm94XCIpO1xuICAgICAgICB0aGlzLnN2Z09iai4kZWwuYWRkQ2xhc3MoY2F0ZWdvcnkpO1xuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVCbG9ja05vZGVzKCk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2Vyc1NpbXVsYXRpb25PblJlZnJlc2ggPSBmYWxzZVxuICAgIH1cblxuICAgIGdldCBpbnB1dENvbm5lY3RvcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvcnMuZmlsdGVyKGNvbm4gPT4gY29ubi5pc0lucHV0Q29ubmVjdG9yKVxuICAgIH1cblxuICAgIGdldCBvdXRwdXRDb25uZWN0b3JzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JzLmZpbHRlcihjb25uID0+IGNvbm4uaXNPdXRwdXRDb25uZWN0b3IpXG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGxldCBjb25uZWN0aW9ucyA9IFtdO1xuXG4gICAgICAgIC8vIGdvIHRocm91Z2ggYWxsIGNvbm5lY3RvcnNcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwXG4gICAgICAgIGZvciAoY29uc3QgY29ubiBvZiB0aGlzLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgICAgIC8vIGdvIHRocm91Z2ggZWFjaCBpdHMgd2lyZSBpZFxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNvbm4ud2lyZUlkcykge1xuICAgICAgICAgICAgICAgIGxldCB0aGlzV2lyZUlkO1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuaGFzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB3aXJlIGlkIGlzIG5vdCBpbiB0aGUgbWFwLCBhZGQgaXQgYW5kIGFzc2lnbiBuZXcgYXJiaXRyYXJ5IGlkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZE1hcC5zZXQoaXRlbSwgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1dpcmVJZCA9IHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBnZXQgaWQgZnJvbSB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIHRoaXNXaXJlSWQgPSB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuZ2V0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoaXMgY29ubmVjdGlvbiB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25zW2Nvbm5lY3Rpb25zLmxlbmd0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb25uLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHdpcmVJZDogdGhpc1dpcmVJZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyKytcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAvLyBpZDogdGhpcy5zdmdPYmouaWQsXG4gICAgICAgICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdGhpcy5nZXRUcmFuc2Zvcm0oKSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25zOiBjb25uZWN0aW9uc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcyhtYXJnaW5Ub3AgPSAwLCBtYXJnaW5SaWdodCA9IDAsIG1hcmdpbkJvdHRvbSA9IDAsIG1hcmdpbkxlZnQgPSAwLCAuLi5zcGVjaWFsTm9kZXMpIHtcbiAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvcihsZXQgeCA9IG1hcmdpbkxlZnQgOyB4IDw9IHRoaXMuZ3JpZFdpZHRoIC0gbWFyZ2luUmlnaHQgOyB4KyspIHtcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IG1hcmdpblRvcCA7IHkgPD0gdGhpcy5ncmlkSGVpZ2h0IC0gbWFyZ2luQm90dG9tIDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBzcGVjaWFsTm9kZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmFkZChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24sIHJlZGVmaW5lZCBpbiBpbmhlcml0ZWQgZWxlbWVudHNcbiAgICAgICAgLy8gcmVmcmVzaFN0YXRlIHRha2VzIGlucHV0IGNvbm5lY3RvciB2YWx1ZXMgYW5kIHNldHMgb3V0cHV0IHZhbHVlcyBhY2NvcmRpbmdseVxuICAgICAgICBjb25zb2xlLndhcm4oXCJDYWxsaW5nIHRoZSB2aXJ0dWFsIGZ1bmN0aW9uIHJlZnJlc2hTdGF0ZSBoYXMgbm8gZWZmZWN0LlwiKTtcbiAgICB9XG5cbiAgICAvLyB1c2FnZTogY2hhbmdlSW1hZ2UoXCJhYmNcIikgY2hhbmdlcyBpbWFnZSB1cmwgdG8gaW1hZ2UtYWJjLnN2Z1xuICAgIC8vICAgICAgICBjaGFuZ2VJbWFnZSgpIGNoYW5nZXMgaW1hZ2UgdXJsIHRvIHRoZSBkZWZhdWx0IG9uZSAoaW1hZ2Uuc3ZnKVxuICAgIGNoYW5nZUltYWdlKHN1ZmZpeCkge1xuICAgICAgICBpZihzdWZmaXggPT09IHVuZGVmaW5lZCB8fCBzdWZmaXggPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHN1ZmZpeCA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWZmaXggPSBcIi1cIiArIHN1ZmZpeDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVybCA9IFwiaW1nL1wiICsgdGhpcy5jYXRlZ29yeSArIFwiL1wiICsgdGhpcy5uYW1lICsgc3VmZml4ICsgXCIuc3ZnXCI7XG5cbiAgICAgICAgdGhpcy5pbWFnZS5jaGFuZ2VVcmwodGhpcy51cmwpO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgYSBqUXVlcnkgb2JqZWN0XG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmouZ2V0KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQmxvY2tlZE5vZGUoeCwgeSkge1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5ibG9ja2VkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmKGl0ZW0ueD09PXggJiYgaXRlbS55PT09eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJvdGF0ZUJsb2NrZWROb2Rlc1JpZ2h0KCkge1xuICAgICAgICBpZih0aGlzLnJvdGF0aW9uPT09dW5kZWZpbmVkIHx8IHRoaXMucm90YXRpb249PT00KSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdGF0aW9uKys7XG5cbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbiA9PT0gMSB8fCB0aGlzLnJvdGF0aW9uID09PSAzKSB7XG4gICAgICAgICAgICBsZXQgbmV3QmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBuZXdCbG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5hYnMoaXRlbS55IC0gdGhpcy5ncmlkSGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgeTogaXRlbS54XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3QmxvY2tlZE5vZGVzO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5yb3RhdGlvbiA9PT0gMiB8fCB0aGlzLnJvdGF0aW9uID09PSA0KSB7XG4gICAgICAgICAgICBsZXQgbmV3QmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBuZXdCbG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5hYnMoaXRlbS55IC0gdGhpcy5ncmlkV2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICB5OiBpdGVtLnhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMgPSBuZXdCbG9ja2VkTm9kZXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDb25uZWN0b3IobGVmdCwgdG9wLCBjb25uZWN0b3JUeXBlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY29ubmVjdG9ycy5sZW5ndGg7XG4gICAgICAgIGlmKGNvbm5lY3RvclR5cGU9PT1Db25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzW2luZGV4XSA9IG5ldyBJbnB1dENvbm5lY3Rvcih0aGlzLnBhcmVudFNWRywgdGhpcy5ncmlkU2l6ZSwgbGVmdCwgdG9wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1tpbmRleF0gPSBuZXcgT3V0cHV0Q29ubmVjdG9yKHRoaXMucGFyZW50U1ZHLCB0aGlzLmdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENoaWxkKHRoaXMuY29ubmVjdG9yc1tpbmRleF0uZ2V0KCkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlQmxvY2tlZE5vZGUobGVmdCwgdG9wKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRoZSBjb25uZWN0b3Igb2JqZWN0IGJhc2VkIG9uIGl0cyBpZFxuICAgIGdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmNvbm5lY3RvcnMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmNvbm5lY3RvcnNbaV0uaWQ9PT1jb25uZWN0b3JJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgY29ubmVjdG9yIG5vdCBmb3VuZCwgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybTtcbiAgICAgICAgaWYgKCF0aGlzLnN2Z09iai4kZWwuYXR0cihcInRyYW5zZm9ybVwiKSkge1xuICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnQgZG9lcyBub3QgaGF2ZSBhIFwidHJhbnNmb3JtXCIgcHJvcGVydHkgLS0+IGNyZWF0ZSBpdFxuICAgICAgICAgICAgdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZSgwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnQgZG9lcyBoYXZlIGEgXCJ0cmFuc2Zvcm1cIiBwcm9wZXJ0eSAtLT4gY2hhbmdlIGl0XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHRoaXMuc3ZnT2JqLiRlbC5hdHRyKFwidHJhbnNmb3JtXCIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtO1xuICAgIH1cblxuICAgIHNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tb3VzZUxlZnQgPSBmYWxzZTtcbiAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZURvd25MZWZ0KGV2ZW50KTtcblxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgRE9NIGVsZW1lbnQgdG8gZnJvbnRcbiAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLm1vdmVUb0Zyb250QnlJZCh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bkxlZnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tb3VzZU1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG5cbiAgICAgICAgLy8gc2F2ZSB0aGUgY3VycmVudCBpdGVtIHBvc2l0aW9uIGludG8gYSB2YXJpYWJsZVxuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gdHJhbnNmb3JtLmdldFRyYW5zbGF0ZSgpO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBtb3VzZSBvZmZzZXQgZnJvbSB0aGUgb2JqZWN0IG9yaWdpblxuICAgICAgICB0aGlzLm9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYIC0gY3VycmVudFBvc2l0aW9uLngsXG4gICAgICAgICAgICB5OiBldmVudC5wYWdlWSAtIGN1cnJlbnRQb3NpdGlvbi55XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy5tb3VzZUxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGxldCBsZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLm9mZnNldC54O1xuICAgICAgICAgICAgbGV0IHRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5vZmZzZXQueTtcblxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG4gICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2lyZXModHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubW91c2VNb3ZlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Ecm9wKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IDIgKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tNaWRkbGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcChldmVudCkge1xuICAgICAgICBsZXQgbGVmdCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5vZmZzZXQueDtcbiAgICAgICAgbGV0IHRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5vZmZzZXQueTtcblxuICAgICAgICBsZWZ0ID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZChsZWZ0KTtcbiAgICAgICAgdG9wID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0b3ApO1xuXG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKCk7XG4gICAgfVxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24sIHdpbGwgYmUgcmVkZWZpbmVkIGluIElucHV0Qm94XG4gICAgfVxuXG4gICAgb25DbGlja01pZGRsZSgpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG5cbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLnN2Z09iai4kZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgbGV0IGNlbnRyZVggPSBNYXRoLnJvdW5kKHJlY3Qud2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGNlbnRyZVkgPSBNYXRoLnJvdW5kKHJlY3QuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgY2VudHJlWCAtPSBjZW50cmVYICUgdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgY2VudHJlWSAtPSBjZW50cmVZICUgdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICB0cmFuc2Zvcm0ucm90YXRlUmlnaHQoXG4gICAgICAgICAgICBjZW50cmVYLFxuICAgICAgICAgICAgY2VudHJlWVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuXG4gICAgICAgIHRoaXMucm90YXRlQmxvY2tlZE5vZGVzUmlnaHQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlcyBhbGwgd2lyZXMgY29ubmVjdGVkIHRvIHRoaXMgYm94XG4gICAgdXBkYXRlV2lyZXModGVtcG9yYXJ5ID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JzLmZvckVhY2goY29ubiA9PiB7XG4gICAgICAgICAgICBjb25uLndpcmVJZHMuZm9yRWFjaCh3aXJlSWQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB3aXJlID0gdGhpcy5wYXJlbnRTVkcuZ2V0V2lyZUJ5SWQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBpZih0ZW1wb3JhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS50ZW1wb3JhcnlXaXJlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS5yb3V0ZVdpcmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGlzT24gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDc7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBcImlucHV0XCIsIFwiaW9cIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5hZGRDb25uZWN0b3Iod2lkdGgsIGhlaWdodCAvIDIsIENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3Rvcik7XG5cbiAgICAgICAgdGhpcy5vbiA9IGlzT247XG5cbiAgICAgICAgdGhpcy50cmlnZ2Vyc1NpbXVsYXRpb25PblJlZnJlc2ggPSB0cnVlXG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGxldCBkYXRhID0gc3VwZXIuZXhwb3J0RGF0YTtcbiAgICAgICAgZGF0YS5pc09uID0gdGhpcy5pc09uO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAxLCAxLCAwKTtcbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIHN0YXJ0IGEgbmV3IHNpbXVsYXRpb24gZnJvbSB0aGUgb3V0cHV0IGNvbm5lY3RvclxuICAgICAgICB0aGlzLnBhcmVudFNWRy5zdGFydE5ld1NpbXVsYXRpb24odGhpcy5jb25uZWN0b3JzWzBdLCB0aGlzLmNvbm5lY3RvcnNbMF0uc3RhdGUpXG4gICAgfVxuXG4gICAgc2V0IG9uKGlzT24pIHtcbiAgICAgICAgaWYgKGlzT24pIHtcbiAgICAgICAgICAgIC8vIHR1cm4gb25cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvblwiKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5zdGF0ZS5vbik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9mZlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLnN0YXRlLm9mZik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzT24gPSBpc09uO1xuICAgIH1cblxuICAgIGdldCBvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPbjtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICB0aGlzLm9uID0gIXRoaXMub247XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA1O1xuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgXCJvdXRwdXRcIiwgXCJpb1wiLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuY29ubmVjdG9yc1swXS5zdGF0ZSk7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib25cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib2ZmXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9zY1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcygpIHtcbiAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDAsIDAsIDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdhdGUgZXh0ZW5kcyBCb3gge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBuYW1lLCBcImdhdGVcIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgLy8gb3V0cHV0XG4gICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKHdpZHRoLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5vdXRwdXRDb25uZWN0b3IpO1xuXG4gICAgICAgIGlmKHRoaXMubmFtZT09PVwibm90XCIpIHtcbiAgICAgICAgICAgIC8vIGlucHV0XG4gICAgICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpbnB1dFxuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gNCwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gKDQvMyksIENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKTtcblxuICAgICAgICAgICAgLy8gYWRkIG9uZSBibG9ja2VkTm9kZSBiZXR3ZWVuIHRoZSBpbnB1dHMgKGZvciBiZXR0ZXIgbG9va2luZyB3aXJpbmcpXG4gICAgICAgICAgICAvLyBhbmQgcmVnZW5lcmF0ZSBibG9ja2VkIG5vZGVzXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2Rlcyh7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiBoZWlnaHQgLyAyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXRlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKHNwZWNpYWxOb2RlKSB7XG4gICAgICAgIGlmKHNwZWNpYWxOb2RlIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdXBlci5nZW5lcmF0ZUJsb2NrTm9kZXMoMCwgMSwgMCwgMSwgc3BlY2lhbE5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDAsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICBsZXQgc3RhdGUgPSBMb2dpYy5zdGF0ZS51bmtub3duXG4gICAgICAgIHN3aXRjaCAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMuYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5hbmRcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5uYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLm5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub3RcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5ub3QodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLnhub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMueG9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vdGlmeSB0aGUgc2ltdWxhdG9yIGFib3V0IHRoaXMgY2hhbmdlXG4gICAgICAgIHRoaXMucGFyZW50U1ZHLnNpbXVsYXRvci5ub3RpZnlDaGFuZ2UodGhpcy5jb25uZWN0b3JzWzBdLmlkLCBzdGF0ZSlcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXaXJlIGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZnJvbUlkLCB0b0lkLCBncmlkU2l6ZSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgLy8gc21hbGwgdG9kbzogcmV3b3JrIHN0YXJ0Li4uIGVuZC4uLiB0byBhcnJheXM/IChub3QgaW1wb3J0YW50KVxuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRyk7XG5cbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMuZnJvbUlkID0gZnJvbUlkO1xuICAgICAgICB0aGlzLnRvSWQgPSB0b0lkO1xuXG4gICAgICAgIHRoaXMuc3RhcnRCb3ggPSB0aGlzLnBhcmVudFNWRy5nZXRCb3hCeUNvbm5lY3RvcklkKGZyb21JZCk7XG4gICAgICAgIHRoaXMuZW5kQm94ID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZCh0b0lkKTtcblxuICAgICAgICB0aGlzLmJveGVzID0gW3RoaXMuc3RhcnRCb3gsIHRoaXMuZW5kQm94XVxuXG4gICAgICAgIHRoaXMuc3RhcnRDb25uZWN0b3IgPSB0aGlzLnBhcmVudFNWRy5nZXRDb25uZWN0b3JCeUlkKGZyb21JZCk7XG4gICAgICAgIHRoaXMuZW5kQ29ubmVjdG9yID0gdGhpcy5wYXJlbnRTVkcuZ2V0Q29ubmVjdG9yQnlJZCh0b0lkKTtcblxuICAgICAgICB0aGlzLmNvbm5lY3RvcnMgPSBbdGhpcy5zdGFydENvbm5lY3RvciwgdGhpcy5lbmRDb25uZWN0b3JdXG4gICAgICAgIHRoaXMucm91dGVXaXJlKHRydWUsIHJlZnJlc2gpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gTG9naWMuc3RhdGUudW5rbm93bjtcblxuICAgICAgICBmb3IgKGxldCBjb25uZWN0b3Igb2YgdGhpcy5jb25uZWN0b3JzKSB7XG4gICAgICAgICAgICBpZihjb25uZWN0b3IuaXNPdXRwdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKGNvbm5lY3Rvci5zdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN2Z09iai4kZWwuYWRkQ2xhc3MoXCJ3aXJlXCIpO1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZnJvbUlkOiB0aGlzLmZyb21JZCxcbiAgICAgICAgICAgIHRvSWQ6IHRoaXMudG9JZFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLnVua25vd246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vZmY6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9mZik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGFydENvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q29ubmVjdG9yLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmVuZENvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmVuZENvbm5lY3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IHN0YXRlO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVBdHRyO1xuICAgIH1cblxuICAgIHVwZGF0ZVdpcmVTdGF0ZSgpIHtcbiAgICAgICAgZm9yIChjb25zdCBib3ggb2YgdGhpcy5ib3hlcykge1xuICAgICAgICAgICAgYm94LnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yIChjb25zdCBjb25uIG9mIHRoaXMuY29ubmVjdG9ycykge1xuICAgICAgICAvLyAgICAgaWYoY29ubi5pc091dHB1dENvbm5lY3Rvcikge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMucGFyZW50U1ZHLnN0YXJ0TmV3U2ltdWxhdGlvbihjb25uLmlkLCBjb25uLnN0YXRlKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmouZ2V0KCk7XG4gICAgfVxuXG4gICAgZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cygpIHtcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBzdmdPYmouUG9seWxpbmVQb2ludHMoKTtcbiAgICAgICAgcG9pbnRzLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy53aXJlU3RhcnQueCwgdGhpcy53aXJlU3RhcnQueSkpO1xuICAgICAgICBwb2ludHMuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLndpcmVFbmQueCwgdGhpcy53aXJlRW5kLnkpKTtcbiAgICAgICAgcmV0dXJuIHBvaW50cztcbiAgICB9XG5cbiAgICB0ZW1wb3JhcnlXaXJlKCkge1xuICAgICAgICB0aGlzLndpcmVTdGFydCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5zdGFydENvbm5lY3RvciwgZmFsc2UpO1xuICAgICAgICB0aGlzLndpcmVFbmQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuZW5kQ29ubmVjdG9yLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5zZXRXaXJlUGF0aCh0aGlzLmdldFRlbXBvcmFyeVdpcmVQb2ludHMoKSk7XG5cbiAgICAgICAgLy8gdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICAvLyB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG4gICAgfVxuXG4gICAgcm91dGVXaXJlKHNuYXBUb0dyaWQgPSB0cnVlLCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLndpcmVTdGFydCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5zdGFydENvbm5lY3Rvciwgc25hcFRvR3JpZCk7XG4gICAgICAgIHRoaXMud2lyZUVuZCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5lbmRDb25uZWN0b3IsIHNuYXBUb0dyaWQpO1xuXG4gICAgICAgIHRoaXMucG9pbnRzID0gdGhpcy5hU3RhcihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLndpcmVTdGFydC54IC8gdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLndpcmVTdGFydC55IC8gdGhpcy5ncmlkU2l6ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLndpcmVFbmQueCAvIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgeTogdGhpcy53aXJlRW5kLnkgLyB0aGlzLmdyaWRTaXplXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFdpcmVQYXRoKHRoaXMucG9pbnRzKTtcblxuICAgICAgICBpZiAocmVmcmVzaClcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2lyZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgc2V0V2lyZVBhdGgocG9pbnRzKSB7XG4gICAgICAgIC8vIHNldCB0aGUgbGluZVxuICAgICAgICBpZih0aGlzLnN2Z09iaiE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdmdPYmoudXBkYXRlUG9pbnRzKHBvaW50cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouUG9seUxpbmUocG9pbnRzLCBcIiM4YjhiOGJcIiwgMik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcblxuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcbiAgICAgICAgICAgIGZyb21JZDogdGhpcy5mcm9tSWQsXG4gICAgICAgICAgICB0b0lkOiB0aGlzLnRvSWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8vIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIHRoaXMgcHNldWRvY29kZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQSpfc2VhcmNoX2FsZ29yaXRobSNQc2V1ZG9jb2RlXG4gICAgYVN0YXIoc3RhcnQsIGVuZCkge1xuICAgICAgICAvLyBudW1iZXIgb2Ygbm9kZXMsIHRoYXQgY2FuIGJlIG9wZW5lZCBhdCBvbmNlXG4gICAgICAgIC8vIG9uY2UgaXMgdGhpcyBsaW1pdCBleGNlZWRlZCwgYVN0YXIgd2lsbCBmYWlsIGFuZCBnZXRUZW1wb3JhcnlXaXJlUG9pbnRzIHdpbGwgYmUgdXNlZCBpbnN0ZWFkXG4gICAgICAgIGNvbnN0IG1heE5vZGVMaW1pdCA9IDUwMDAwO1xuXG4gICAgICAgIGxldCBjbG9zZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgbGV0IG9wZW5Ob2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgb3Blbk5vZGVzLmFkZChzdGFydCk7XG5cbiAgICAgICAgbGV0IGNhbWVGcm9tID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgdmFsdWU6IGluZmluaXR5XG4gICAgICAgIGxldCBnU2NvcmUgPSBuZXcgU3RydWN0dXJlcy5NYXBXaXRoRGVmYXVsdFZhbHVlKEluZmluaXR5KTtcbiAgICAgICAgZ1Njb3JlLnNldChzdGFydCwgMCk7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB2YWx1ZTogaW5maW5pdHlcbiAgICAgICAgbGV0IGZTY29yZSA9IG5ldyBTdHJ1Y3R1cmVzLk1hcFdpdGhEZWZhdWx0VmFsdWUoSW5maW5pdHkpO1xuICAgICAgICBmU2NvcmUuc2V0KHN0YXJ0LCBXaXJlLm1hbmhhdHRhbkRpc3RhbmNlKHN0YXJ0LCBlbmQpKTtcblxuICAgICAgICBsZXQgbm9uUm91dGFibGUgPSB0aGlzLnBhcmVudFNWRy5nZXROb25Sb3V0YWJsZU5vZGVzKCk7XG4gICAgICAgIGxldCBwdW5pc2hlZEJ1dFJvdXRhYmxlO1xuICAgICAgICBpZih0aGlzLnN2Z09iaj09PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHVuaXNoZWRCdXRSb3V0YWJsZSA9IHRoaXMucGFyZW50U1ZHLmdldEluY29udmVuaWVudE5vZGVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdW5pc2hlZEJ1dFJvdXRhYmxlID0gdGhpcy5wYXJlbnRTVkcuZ2V0SW5jb252ZW5pZW50Tm9kZXModGhpcy5zdmdPYmouaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKG9wZW5Ob2Rlcy5zaXplID4gMCkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnROb2RlRlNjb3JlO1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSB2YWx1ZSBmcm9tIG9wZW5Ob2RlcyB0aGF0IGhhcyB0aGUgbG93ZXN0IGZTY29yZVxuICAgICAgICAgICAgLy8gKGNhbiBiZSBpbXBsZW1lbnRlZCBlZmZlY3RpdmVseSB1c2luZyBtaW4taGVhcCBkYXRhIHN0cnVjdHVyZSAobWF5YmUgdG9kbyBzb21ldGltZSk/KVxuICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG9wZW5Ob2Rlcykge1xuICAgICAgICAgICAgICAgIGlmKCFjdXJyZW50Tm9kZSB8fCBmU2NvcmUuZ2V0KG5vZGUpIDwgY3VycmVudE5vZGVGU2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUZTY29yZSA9IGZTY29yZS5nZXQoY3VycmVudE5vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzdmdPYmouUG9seWxpbmVQb2ludC5lcXVhbHMoY3VycmVudE5vZGUsIGVuZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWNvbnN0cnVjdFBhdGgoY2FtZUZyb20sIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3Blbk5vZGVzLmRlbGV0ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICBjbG9zZWROb2Rlcy5hZGQoY3VycmVudE5vZGUpO1xuXG4gICAgICAgICAgICAvLyB0aGUgZmFydGhlc3QgcG9pbnRzIGFjY2Vzc2libGUgd2l0aG91dCBhdm9pZGluZyBvYnN0YWNsZXMgaW4gZXZlcnkgZGlyZWN0aW9uXG4gICAgICAgICAgICAvLyAoYnV0IG1heCA1MCBpbiBlYWNoIGRpcmVjdGlvbilcbiAgICAgICAgICAgIGZvcihsZXQgZGlyZWN0aW9uID0gMCA7IGRpcmVjdGlvbiA8IDQgOyBkaXJlY3Rpb24rKykge1xuICAgICAgICAgICAgICAgIGxldCBuZXdQb2ludCA9IFdpcmUubW92ZVBvaW50KGN1cnJlbnROb2RlLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgNTAgOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmV3UG9pbnQgaXMgaW4gdGhlIHNldCBvZiBub24gcm91dGFibGUgcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBhZGQgaXQgYW5kIHN0b3AgcHJvY2VlZGluZyBpbiB0aGlzIGRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICBpZihXaXJlLnNldEhhc1RoaXNQb2ludChub25Sb3V0YWJsZSwgdGhpcy5zY2FsZVBvaW50VG9HcmlkKG5ld1BvaW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2tpcCB0aGlzIG5vZGUsIGlmIGl0IGhhcyBiZWVuIGFscmVhZHkgY2xvc2VkXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIGlmIGl0IGlzIG9uIHRoZSBsaXN0IG9mIG5vbiByb3V0YWJsZSBub2Rlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VkTm9kZXMuaGFzKG5ld1BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZW5Ob2Rlcy5oYXMobmV3UG9pbnQpLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5Ob2Rlcy5hZGQobmV3UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHBvc3NpYmxlIEdTY29yZSBieSBhZGRpbmcgMSB0byB0aGUgc2NvcmUgb2YgdGhlIG5vZGUgd2UgY2FtZSBmcm9tXG4gICAgICAgICAgICAgICAgICAgIC8vICh3ZSBwcmlvcml0aXplIHRvIG1pbmltaXplIHRoZSBudW1iZXIgb2Ygbm9kZXMgYW5kIG5vdCB0aGUgZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIC8vICBzbyB3ZSBhcmUgYWRkaW5nIDEgb24gYWxsIG5vZGVzLCBldmVuIGlmIHRoZSBldWNsaWRlYW4gLyBtYW5uaGF0YW4gZGlzdGFuY2UgbWF5IHZhcnkpXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmNyZW1lbnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZihpIT09MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zc2libGVHU2NvcmUgPSBnU2NvcmUuZ2V0KGN1cnJlbnROb2RlKSArIGluY3JlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICBpZihXaXJlLnNldEhhc1RoaXNQb2ludChwdW5pc2hlZEJ1dFJvdXRhYmxlLCB0aGlzLnNjYWxlUG9pbnRUb0dyaWQobmV3UG9pbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIG5vZGUgaXMgaW4gdGhlIHNldCBvZiBwdW5pc2hlZCBub2RlLCBwdW5pc2ggaXQgYnkgYWRkaW5nIHRvIHRoZSBHU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3NpYmxlR1Njb3JlICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zc2libGVHU2NvcmUgPj0gZ1Njb3JlLmdldChuZXdQb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2FtZUZyb20uc2V0KG5ld1BvaW50LCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGdTY29yZS5zZXQobmV3UG9pbnQsIHBvc3NpYmxlR1Njb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgZlNjb3JlLnNldChuZXdQb2ludCwgcG9zc2libGVHU2NvcmUgKyBXaXJlLm1hbmhhdHRhbkRpc3RhbmNlKG5ld1BvaW50LCBlbmQpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXdQb2ludCBpcyBpbiB0aGUgc2V0IG9mIHB1bmlzaGVkIGJ1dCByb3V0YWJsZSBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBpdCBidXQgc3RvcCBwcm9jZWVkaW5nIGluIHRoaXMgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KHB1bmlzaGVkQnV0Um91dGFibGUsIHRoaXMuc2NhbGVQb2ludFRvR3JpZChuZXdQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgdG8gdGhlIG5leHQgcG9pbnQgaW4gdGhlIGRpcmVjaXRvblxuICAgICAgICAgICAgICAgICAgICBuZXdQb2ludCA9IFdpcmUubW92ZVBvaW50KG5ld1BvaW50LCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYob3Blbk5vZGVzLnNpemUgPiBtYXhOb2RlTGltaXQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB3ZSBnb3QgaGVyZSwgdGhlIHBhdGggZG9lcyBub3QgZXhpc3QgLT4gbGV0J3MgdXNlIHRlbXBvcmFyeSBwYXRoIGlnbm9yaW5nIGFsbCBjb2xpc2lvbnNcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cygpO1xuICAgIH1cbiAgICBzdGF0aWMgbW92ZVBvaW50KHBvaW50LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMDogLy8gdXBcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55IC0gMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDE6IC8vIHJpZ2h0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCArIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAyOiAvLyBkb3duXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueSArIDFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAzOiAvLyBsZWZ0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCAtIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHNjYWxlUG9pbnRUb0dyaWQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHBvaW50LnggKiB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgeTogcG9pbnQueSAqIHRoaXMuZ3JpZFNpemVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY29uc3RydWN0UGF0aChjYW1lRnJvbSwgY3VycmVudE5vZGUpIHtcbiAgICAgICAgbGV0IHRvdGFsUGF0aCA9IG5ldyBzdmdPYmouUG9seWxpbmVQb2ludHMoKTtcbiAgICAgICAgdG90YWxQYXRoLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoY3VycmVudE5vZGUueCAqIHRoaXMuZ3JpZFNpemUsIGN1cnJlbnROb2RlLnkgKiB0aGlzLmdyaWRTaXplKSk7XG5cbiAgICAgICAgd2hpbGUgKGNhbWVGcm9tLmhhcyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY2FtZUZyb20uZ2V0KGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIHRvdGFsUGF0aC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KGN1cnJlbnROb2RlLnggKiB0aGlzLmdyaWRTaXplLCBjdXJyZW50Tm9kZS55ICogdGhpcy5ncmlkU2l6ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsUGF0aDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbWFuaGF0dGFuRGlzdGFuY2UoYSwgYikge1xuICAgICAgICAvLyBNYW5oYXR0YW4gZ2VvbWV0cnlcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGEueCAtIGIueCkgKyBNYXRoLmFicyhhLnkgLSBiLnkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRIYXNUaGlzUG9pbnQoc2V0LCBwb2ludCkge1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHNldCkge1xuICAgICAgICAgICAgaWYoaXRlbS54ID09PSBwb2ludC54ICYmIGl0ZW0ueSA9PT0gcG9pbnQueSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRDb29yZGluYXRlcyhjb25uZWN0b3IsIHNuYXBUb0dyaWQgPSB0cnVlKSB7XG4gICAgICAgIC8vIGNvbm5lY3Rvci5zdmdPYmouaWQgaGFzIHRvIGJlIGNhbGxlZCwgZWxzZSB0aGUgZ2V0Q29vcmRpbmF0ZXMgZG9lcyBub3Qgd29yayBvbiB0aGUgZmlyc3QgY2FsbCBpbiBGaXJlZm94IDU1XG4gICAgICAgIGxldCBkdW1teSA9IGNvbm5lY3Rvci5zdmdPYmouaWQ7XG5cbiAgICAgICAgbGV0ICRjb25uZWN0b3IgPSBjb25uZWN0b3Iuc3ZnT2JqLiRlbDtcblxuICAgICAgICBsZXQgcG9zaXRpb24gPSAkY29ubmVjdG9yLnBvc2l0aW9uKCk7XG4gICAgICAgIGxldCB3aWR0aCA9ICRjb25uZWN0b3IuYXR0cihcIndpZHRoXCIpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gJGNvbm5lY3Rvci5hdHRyKFwiaGVpZ2h0XCIpO1xuXG4gICAgICAgIGxldCB4ID0gcG9zaXRpb24ubGVmdCArIHdpZHRoIC8gMjtcbiAgICAgICAgbGV0IHkgPSBwb3NpdGlvbi50b3AgKyBoZWlnaHQgLyAyO1xuICAgICAgICBpZihzbmFwVG9HcmlkKSB7XG4gICAgICAgICAgICB4ID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh4KTtcbiAgICAgICAgICAgIHkgPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5XG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIENvbnRleHRNZW51SXRlbSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgY29udGV4dE1lbnUsIHBhcmVudFNWRywgY2xpY2tGdW5jdGlvbikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gY29udGV4dE1lbnU7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjxsaT5cIik7XG4gICAgICAgICQodGhpcy4kZWwpXG4gICAgICAgICAgICAudGV4dChuYW1lKVxuICAgICAgICAgICAgLmF0dHIoXCJ0eXBlXCIsIHR5cGUpO1xuXG4gICAgICAgIGlmKGNsaWNrRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICQodGhpcy4kZWwpLmNsaWNrKFxuICAgICAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tGdW5jdGlvbihldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2xhc3MoY2xzKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKGNscyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFwcGVuZEl0ZW0oaXRlbSkge1xuICAgICAgICBpZighdGhpcy5zdWJMaXN0KSB7XG4gICAgICAgICAgICB0aGlzLnN1Ykxpc3QgPSAkKFwiPHVsPlwiKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLnN1Ykxpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdWJMaXN0LmFwcGVuZChpdGVtLmpRdWVyeSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZ2V0IGpRdWVyeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsO1xuICAgIH1cbn1cbmNsYXNzIEdhdGVNZW51SXRlbSBleHRlbmRzIENvbnRleHRNZW51SXRlbSB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgY29udGV4dE1lbnUsIHBhcmVudFNWRykge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHR5cGUsIC8vIG5hbWUgaXMgdGhlIHR5cGVcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBjb250ZXh0TWVudSxcbiAgICAgICAgICAgIHBhcmVudFNWRyxcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQoY29udGV4dE1lbnUucG9zaXRpb24ueCAvIHBhcmVudFNWRy5ncmlkU2l6ZSkgKiBwYXJlbnRTVkcuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChjb250ZXh0TWVudS5wb3NpdGlvbi55IC8gcGFyZW50U1ZHLmdyaWRTaXplKSAqIHBhcmVudFNWRy5ncmlkU2l6ZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBwYXJlbnRTVkcubmV3R2F0ZShcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ubGVmdCwgLy8geCBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnRvcCAvLyB5IGNvb3JkaW5hdGVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dE1lbnUge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcblxuICAgICAgICBjb25zdCBnYXRlcyA9IFtcIm5vdFwiLCBcImFuZFwiLCBcIm9yXCIsIFwibmFuZFwiLCBcIm5vclwiLCBcInhvclwiLCBcInhub3JcIl07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IDAsIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRlbCA9ICQoXCI8dWw+XCIpO1xuICAgICAgICB0aGlzLiRlbC5hdHRyKCdpZCcsICdjb250ZXh0TWVudScpO1xuXG4gICAgICAgIGxldCBnYXRlTGlzdCA9IG5ldyBDb250ZXh0TWVudUl0ZW0oXCJOZXcgZ2F0ZVwiLCAnJywgdGhpcywgcGFyZW50U1ZHKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgZ2F0ZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBnYXRlTGlzdC5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgICAgIG5ldyBHYXRlTWVudUl0ZW0oZ2F0ZXNbaV0sIHRoaXMsIHBhcmVudFNWRylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKGdhdGVMaXN0KTtcblxuICAgICAgICB0aGlzLmFwcGVuZEl0ZW0oXG4gICAgICAgICAgICBuZXcgQ29udGV4dE1lbnVJdGVtKFwiSW5wdXQgYm94XCIsICcnLCB0aGlzLCBwYXJlbnRTVkcsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi55KVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFNWRy5uZXdJbnB1dChwb3NpdGlvbi5sZWZ0LCBwb3NpdGlvbi50b3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFwcGVuZEl0ZW0obmV3IENvbnRleHRNZW51SXRlbShcIk91dHB1dCBib3hcIiwgJycsIHRoaXMsIHBhcmVudFNWRywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi54KSxcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi55KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGFyZW50U1ZHLm5ld091dHB1dChwb3NpdGlvbi5sZWZ0LCBwb3NpdGlvbi50b3ApO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRDb25kaXRpb25hbEl0ZW0oJ2JveCcsICdSZW1vdmUgdGhpcyBpdGVtJywgaWQgPT4ge3RoaXMucGFyZW50U1ZHLnJlbW92ZUJveChpZCl9KTtcbiAgICAgICAgdGhpcy5hcHBlbmRDb25kaXRpb25hbEl0ZW0oJ3dpcmUnLCAnUmVtb3ZlIHRoaXMgd2lyZScsIGlkID0+IHt0aGlzLnBhcmVudFNWRy5yZW1vdmVXaXJlQnlJZChpZCl9KTtcblxuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5iZWZvcmUodGhpcy4kZWwpO1xuICAgIH1cblxuICAgIGFwcGVuZEl0ZW0oaXRlbSkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoaXRlbS5qUXVlcnkpO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmRzIGFuIGNvbm5kaXRpb25hbCBpdGVtICh0aGF0IGlzIHNob3duIG9ubHkgaWYgdGhlIHRhcmdldFxuICAgIC8vIGhhcyB0aGUgY2xhc3MgaXRlbUNsYXNzKVxuICAgIC8vIGNsaWNrRnVuY3Rpb24gdGFrZXMgb25lIGFyZ3VtZW50OiBJRCBvZiB0aGUgdGFyZ2V0XG4gICAgYXBwZW5kQ29uZGl0aW9uYWxJdGVtKGl0ZW1DbGFzcywgdGV4dCwgY2xpY2tGdW5jdGlvbikge1xuICAgICAgICBpZighdGhpcy5jb25kaXRpb25hbEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtc1t0aGlzLmNvbmRpdGlvbmFsSXRlbXMubGVuZ3RoXSA9IHtcbiAgICAgICAgICAgIGl0ZW1DbGFzczogaXRlbUNsYXNzLFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGNsaWNrRnVuY3Rpb246IGNsaWNrRnVuY3Rpb25cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlY2lkZXMgd2hldGhlciBvciBub3QgdG8gZGlzcGxheSBzcGVjaWZpYyBjb25kaXRpb25hbCBpdGVtc1xuICAgIHJlc29sdmVDb25kaXRpb25hbEl0ZW1zKCR0YXJnZXQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZGl0aW9uYWxJdGVtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYoJHRhcmdldC5oYXNDbGFzcyh0aGlzLmNvbmRpdGlvbmFsSXRlbXNbaV0uaXRlbUNsYXNzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kSXRlbShcbiAgICAgICAgICAgICAgICAgICAgbmV3IENvbnRleHRNZW51SXRlbShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtc1tpXS50ZXh0LCAnJywgdGhpcywgdGhpcy5wYXJlbnRTVkcsXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW2ldLmNsaWNrRnVuY3Rpb24oJHRhcmdldC5hdHRyKCdpZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkuYWRkQ2xhc3MoJ2NvbmRpdGlvbmFsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBoaWRlcyBhbGwgY29uZGl0aW9uYWwgaXRlbXNcbiAgICBoaWRlQWxsQ29uZGl0aW9uYWxJdGVtcygpIHtcbiAgICAgICAgdGhpcy4kZWwuY2hpbGRyZW4oJy5jb25kaXRpb25hbCcpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8vIGRpc3BsYXlzIHRoZSBjb250ZXh0IG1lbnUgd2l0aCB0aGUgcmlnaHQgc2V0IG9mIGNvbmRpdGlvbmFsIGl0ZW1zXG4gICAgZGlzcGxheSh4LCB5LCAkdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJGVsLmNzcyh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgdG9wOiB5ICsgXCJweFwiLFxuICAgICAgICAgICAgbGVmdDogeCArIFwicHhcIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlc29sdmVDb25kaXRpb25hbEl0ZW1zKCR0YXJnZXQpO1xuICAgIH1cblxuICAgIC8vIGhpZGVzIHRoZSBjb250ZXh0IG1lbnVcbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLiRlbC5jc3Moe2Rpc3BsYXk6ICdub25lJ30pO1xuICAgICAgICB0aGlzLmhpZGVBbGxDb25kaXRpb25hbEl0ZW1zKCk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBleHBvcnROZXR3b3JrIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNWRy5leHBvcnREYXRhO1xuICAgIH1cblxuICAgIGpzb24oc3R5bGUgPSBleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3QsIGRhdGFVcmkgPSBmYWxzZSkge1xuICAgICAgICBpZihkYXRhVXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2RhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04LCdcbiAgICAgICAgICAgICAgICArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmpzb24oc3R5bGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGV4cG9ydE5ldHdvcmsuc3R5bGUuY29tcGFjdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSk7XG4gICAgICAgICAgICAgICAgY2FzZSBleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSwgbnVsbCwgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJldHR5OiAwLFxuICAgICAgICAgICAgY29tcGFjdDogMVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIGltcG9ydE5ldHdvayB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBzdHJpbmcpIHtcbiAgICAgICAgcGFyZW50U1ZHLmltcG9ydERhdGEoXG4gICAgICAgICAgICBKU09OLnBhcnNlKHN0cmluZylcbiAgICAgICAgKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge2V4cG9ydE5ldHdvcmssIGltcG9ydE5ldHdva30gZnJvbSBcIi4vaW1wb3J0RXhwb3J0LmpzXCI7XG5cbmNsYXNzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNpZmljVGFnKSB7XG4gICAgICAgIGlmKCFzcGVjaWZpY1RhZykge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoXCI8XCIgKyBzcGVjaWZpY1RhZyArIFwiPlwiKVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBjb25zdCBtb3VzZUljb24gPVxuLy8gICAgIFwiPHN2ZyBjbGFzcz1cXFwibW91c2VJY29uXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIGhlaWdodD1cXFwiMTIxLjc3MTMxbW1cXFwiIHdpZHRoPVxcXCI4Mi4zMjc1ODNtbVxcXCIgdmVyc2lvbj1cXFwiMS4xXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjkxLjcxMTkxIDQzMS40NzMxNFxcXCI+XCIgK1xuLy8gICAgIFwiPGcgdHJhbnNmb3JtPVxcXCJ0cmFuc2xhdGUoLTIwMi43MDkwOCwtMjYwLjkyMzIpXFxcIj5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBkPVxcXCJtMjAyLjgxMTA4IDQ0My41MDY2N2MtMC4xMjU3IDExLjA1NjgzIDAuMDY1MSAxMi4xMjkxNSAwLjA1MjggMjMuMDkzNzUgMS4wNDA0IDM5LjI5MTY1LTQuMDMyODEgNzkuNTg0MiA4LjgxNDQxIDExNy41NjgzNiAxNy41MjYwMiA1OC4wMDc0MiA3MC43NjEyIDEwNy4wNzc5MyAxMzMuMTI5MDcgMTA4LjExNzE5IDYwLjgwNDQ4IDIuNjEyNDcgMTE1LjgwNjM4LTQxLjQ4OTEyIDEzNi42NTI0OS05Ni45MzU1NSAxNS4yMTk0Mi0zNC43MDU2MSAxMi43NDQ3LTcyLjgyNjM4IDEyLjgzNC0xMDkuNzIyNjYtMC40MDM1Ni0xNy4yNDkwNSAwLjI3NDUyLTI0LjczMjkgMC4wODc5LTQyLjEyMTA5aC0yOTEuNTcwNjZ6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImxlZnRcXFwiIGQ9XFxcIm0zMzUuNjc3ODggMjYwLjkzMDMyYy01OC42NTI1IDAuNjU1NjYtOTkuNjMxOSA0My41MTM4Ni0xMjAuMDgyMSA5Ni45OTIxOS0xMC41NTA1IDI0LjA2MDEyLTEyLjU5MzUgNDEuNzc3OTctMTIuODg2NyA2Ny41ODIwM2gxMzUuNzgzMnYtMTY0LjU3MjI2Yy0wLjAwNiAwLjAwMDA4LTAuMDExNy0wLjAwMDA4LTAuMDE3NiAwLTAuOTM0Ny0wLjAxMS0xLjg2NTgtMC4wMTI0LTIuNzk2OC0wLjAwMnpcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwicmlnaHRcXFwiIGQ9XFxcIm0zNjEuNDY3ODcgMjYwLjkyOTkzYy0wLjk0MjA3LTAuMDEtMS44ODY0LTAuMDA5LTIuODMyMDMgMC4wMDR2MTY0LjU3MjI2aDEzNS43ODUxNmMtMC4yNjI1Ny0yNC40Njk0OC0yLjI1MjEtNDAuNzQ4MjMtMTEuNTAzOTEtNjMuOTAyNDMtMTkuMzQ3MDktNTUuMDMyMjUtNjEuNzMwNDMtMTAwLjA0NTI1LTEyMS40NDkyMi0xMDAuNjczODN6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcIm1pZGRsZVxcXCIgZD1cXFwibTM0OC41NjUwNCAyOTQuOTMzNjVjMTUuMDM3MTQgMCAyNy4xNDI4NiAxMi4xMDU3MiAyNy4xNDI4NiAyNy4xNDI4NnY0MGMwIDE1LjAzNzE0LTEyLjEwNTcyIDI3LjE0Mjg2LTI3LjE0Mjg2IDI3LjE0Mjg2cy0yNy4xNDI4Ni0xMi4xMDU3Mi0yNy4xNDI4Ni0yNy4xNDI4NnYtNDBjMC0xNS4wMzcxNCAxMi4xMDU3Mi0yNy4xNDI4NiAyNy4xNDI4Ni0yNy4xNDI4NnpcXFwiIHN0cm9rZT1cXFwiI2ZmZlxcXCIgc3Ryb2tlLWxpbmVjYXA9XFxcInJvdW5kXFxcIiBzdHJva2Utd2lkdGg9XFxcIjIwXFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICA8L2c+XCIgK1xuLy8gICAgIFwiPC9zdmc+XCI7XG5cbmNsYXNzIGhlbHBXaW5kb3dJdGVtIGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IodGV4dCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKFwiaGVscFdpbmRvd0l0ZW1cIik7XG4gICAgICAgIHRoaXMuJGVsLmh0bWwodGV4dCk7XG4gICAgfVxufVxuXG5jbGFzcyBoZWxwV2luZG93IGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy4kZWwuYXR0cihcImlkXCIsIFwiaGVscFwiKTtcblxuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPm1haW4gbWVudTwvc3Ryb25nPjogcmlnaHQgY2xpY2tcIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCJkcmFnIGFuZCBkcm9wIHRvIDxzdHJvbmc+bW92ZSBlbGVtZW50czwvc3Ryb25nPlwiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+bWlkZGxlIGNsaWNrPC9zdHJvbmc+IHRvIHJvdGF0ZSBlbGVtZW50c1wiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+Y2xpY2sgPGltZyBzcmM9J2ltZy9ndWkvaGVscC5zdmcnIGNsYXNzPSdoZWxwaWNvbicgYWx0PSdoZWxwIGljb24nPjwvc3Ryb25nPiB0byBkaXNwbGF5IGRvY3VtZW50YXRpb24gKGluIGN6ZWNoKVwiKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGl0ZW0uJGVsKTtcbiAgICB9XG59XG5cblxuY2xhc3MgZmxvYXRpbmdNZW51SXRlbSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNpZmljQ2xhc3MsIGljb24sIHRpdGxlLCBzcGVjaWZpY1RhZykge1xuICAgICAgICBzdXBlcihzcGVjaWZpY1RhZyk7XG5cbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoXCJidXR0b25cIik7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKHNwZWNpZmljQ2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChcbiAgICAgICAgICAgICQoXCI8aW1nPlwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3JjXCIsIFwiaW1nL2d1aS9cIiArIGljb24gKyBcIi5zdmdcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImFsdFwiLCB0aXRsZSlcbiAgICAgICAgICAgICAgICAuYXR0cihcInRpdGxlXCIsIHRpdGxlKVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZmxvYXRpbmdNZW51IGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgY29uc3QgaWQgPSAnZmxvYXRpbmdNZW51JztcblxuICAgICAgICB0aGlzLiRlbC5hdHRyKFwiaWRcIiwgaWQpO1xuXG4gICAgICAgIC8qIElNUE9SVCAqL1xuXG4gICAgICAgIC8vIGhlcmUgd2lsbCBiZSB0aGUgaW5zdGFuY2Ugb2YgTGl0eSBzdG9yZWRcbiAgICAgICAgLy8gKHdlIG5lZWQgdG8gc3RvcmUgaXQsIGJlY2F1c2UgdGhlIFwiaW1wb3J0XCIgYnV0dG9uIGFsc28gY2xvc2VzIExpdHkpXG4gICAgICAgIGxldCBsaXR5SW5zdGFuY2VJbXBvcnQ7XG5cbiAgICAgICAgbGV0IGltcG9ydEJ1dHRvbiA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiaW1wb3J0XCIsIFwiaW1wb3J0XCIsIFwiSW1wb3J0IGEgbmV0d29ya1wiLCBcImFcIik7XG4gICAgICAgIGltcG9ydEJ1dHRvbi4kZWwub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgJHBvcHVwID0gJChcIjxkaXY+XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0RXhwb3J0XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0XCIpO1xuXG4gICAgICAgICAgICBsZXQgdGV4dGFyZWFJZCA9IFwiaW1wb3J0SlNPTlwiO1xuXG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8dGV4dGFyZWE+PC90ZXh0YXJlYT5cIikuYXR0cignaWQnLCB0ZXh0YXJlYUlkKVxuICAgICAgICAgICAgKS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwidXBsb2FkXCJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvaW1wb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXCIgaW1wb3J0IGZyb20gSlNPTlwiKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0ZXh0YXJlYSA9ICQoJyMnK3RleHRhcmVhSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGV4dGFyZWEgY29udGVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbXBvcnRTdHJpbmcgPSAkdGV4dGFyZWEudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIExpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpdHlJbnN0YW5jZUltcG9ydC5jbG9zZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9jY2VzcyB0aGUgaW1wb3J0ZWQgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IGltcG9ydE5ldHdvayhwYXJlbnRTVkcsIGltcG9ydFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsaXR5SW5zdGFuY2VJbXBvcnQgPSBsaXR5KCRwb3B1cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKGltcG9ydEJ1dHRvbik7XG5cbiAgICAgICAgLyogRVhQT1JUICovXG5cbiAgICAgICAgbGV0IGV4cG9ydEJ1dHRvbiA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiZXhwb3J0XCIsIFwiZXhwb3J0XCIsIFwiRXhwb3J0IHRoaXMgbmV0d29ya1wiLCBcImFcIik7XG4gICAgICAgIGV4cG9ydEJ1dHRvbi4kZWwub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBleHBvcnROZXR3b3JrKHBhcmVudFNWRyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgcG9wdXAgY29udGFpbmVyIGhvbGRpbmcgYWxsIHBvcHVwIGNvbnRlbnQgKHRoYXQgd2lsbCBiZSBwYXNzZWQgdG8gbGl0eSlcbiAgICAgICAgICAgIGxldCAkcG9wdXAgPSAkKFwiPGRpdj5cIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJpbXBvcnRFeHBvcnRcIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJleHBvcnRcIik7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBibG9jayB3aXRoIGNvZGUgdG8gYmUgZGlzcGxheWVkIGFuZCBhcHBlbmQgaXQgdG8gdGhlIHBvcHVwIGVsZW1lbnRcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxwcmU+XCIpLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxjb2RlPlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBsaW5rc1xuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPGE+XCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5LCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgXCJjbGFzc1wiOiBcImRvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJuZXR3b3JrLmpzb25cIlxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9leHBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgKS5hcHBlbmQoXCIgZXhwYW5kZWQgSlNPTlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3QsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwiZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcIm5ldHdvcmsubWluLmpzb25cIlxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9leHBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgKS5hcHBlbmQoXCIgY29tcGFjdCBKU09OXCIpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsaXR5KCRwb3B1cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKGV4cG9ydEJ1dHRvbik7XG5cbiAgICAgICAgLyogSEVMUCAqL1xuXG4gICAgICAgIGxldCBoZWxwID0gbmV3IGZsb2F0aW5nTWVudUl0ZW0oXCJoZWxwXCIsIFwiaGVscFwiLCBcIkRpc3BsYXkgaGVscFwiLCBcImFcIik7XG4gICAgICAgIGhlbHAuJGVsLm9uKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgICAgICQoXCIjaGVscFwiKS5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgJChcIiNoZWxwXCIpLnJlbW92ZUNsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaGVscC4kZWwuYXR0cih7XG4gICAgICAgICAgICAnaHJlZic6ICcuL2RvY3MvJyxcbiAgICAgICAgICAgICdkYXRhLWxpdHknOiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVscCk7XG5cbiAgICAgICAgcGFyZW50U1ZHLiRzdmcuYWZ0ZXIodGhpcy4kZWwpO1xuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5hZnRlcihuZXcgaGVscFdpbmRvdygpLiRlbCk7XG4gICAgfVxuXG4gICAgYXBwZW5kKG1lbnVJdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChtZW51SXRlbS4kZWwpO1xuICAgIH1cbn1cbiIsImltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuXG5jbGFzcyBzdGF0ZUNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IoY29ubmVjdG9ySWQsIHN0YXRlLCB3aG9DYXVzZWRJdCkge1xuICAgICAgICB0aGlzLmNvbm5lY3RvcklkID0gY29ubmVjdG9ySWRcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlXG4gICAgICAgIHRoaXMud2hvQ2F1c2VkSXQgPSB3aG9DYXVzZWRJdFxuICAgIH1cbn1cblxuLy8gYWxsIGNvbm5lY3RvcnMgbWVudGlvbmVkIGhlcmUgYXJlIE9VVFBVVCBDT05ORUNUT1JTXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW11bGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWR1xuXG4gICAgICAgIC8vIG1hcHMgZWFjaCBhZmZlY3RlZCBvdXRwdXQgY29ubmVjdG9yIHRvIGl0J3MgZGlyZWN0bHkgcHJlY2VlZGluZyBvdXRwdXQgY29ubmVjdG9yc1xuICAgICAgICB0aGlzLnByZWRlY2Vzc29ycyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvLyBtYXBzIHdhdmVJZCAtPiBhcnJheSBvZiBvdXRwdXRDb25uZWN0b3JzIGFmZmVjdGVkXG4gICAgICAgIHRoaXMud2F2ZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMud2F2ZSA9IDBcblxuICAgICAgICB0aGlzLmN5Y2xlZENvbm5lY3RvcnMgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5yZXNvbHZlZEN5Y2xlZENvbm5lY3RvcnMgPSBuZXcgU2V0KClcblxuICAgIH1cblxuICAgIHJ1bigpIHtcbiAgICAgICAgdGhpcy53YXZlKys7XG4gICAgICAgIHdoaWxlKHRoaXMud2F2ZXMuaGFzKHRoaXMud2F2ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCgpXG4gICAgICAgICAgICB0aGlzLndhdmVzLmRlbGV0ZSh0aGlzLndhdmUpIC8vIGNsZWFuIG9sZCB3YXZlcyBvbiB0aGUgZ29cbiAgICAgICAgICAgIHRoaXMud2F2ZSsrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGVwKCkge1xuICAgICAgICBmb3IgKGxldCB7Y29ubmVjdG9ySWQsIHN0YXRlLCB3aG9DYXVzZWRJdH0gb2YgdGhpcy53YXZlcy5nZXQodGhpcy53YXZlKSkge1xuICAgICAgICAgICAgLy8gc2tpcCByZXNvbHZlZCBjeWNsZXNcbiAgICAgICAgICAgIGlmKHRoaXMucmVzb2x2ZWRDeWNsZWRDb25uZWN0b3JzLmhhcyhjb25uZWN0b3JJZCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBza2lwIGNvbm5lY3RvciB0aGF0IGFyZSBjeWNsZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmN5Y2xlZENvbm5lY3RvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgc2V0IG9mIHN0YXRlcyB0aGF0IHRoaXMgY29ubmVjdG9yIGFwcGVhcmVkIGZyb20gdGhlIG1vbWVudCB0aGUgc2lnbmFsIGZpcnN0IGN5Y2xlZFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZXMgPSB0aGlzLmN5Y2xlZENvbm5lY3RvcnMuZ2V0KGNvbm5lY3RvcklkKVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGNvbm5lY3RvciBhbHJlYWR5IGhhZCB0aGlzIHN0YXRlIGluIHRoaXMgY3ljbGUsIHJlc29sdmUgdGhlIGN5Y2xlXG4gICAgICAgICAgICAgICAgaWYoc3RhdGVzLmhhcyhzdGF0ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbW9yZSBzdGF0ZXMgaW4gdGhlIHNldCwgdGhlIGNvbm5lY3RvciBpcyBvc2NpbGxhdGluZ1xuICAgICAgICAgICAgICAgICAgICAvLyAoZWxzZSBpdCBrZWVwcyBpdHMgc3RhdGUgYW5kIHdlIGp1c3QgYnJlYWsgdGhlIGN5Y2xlKVxuICAgICAgICAgICAgICAgICAgICBpZihzdGF0ZXMuc2l6ZSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gTG9naWMuc3RhdGUub3NjaWxsYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hcmsgdGhpcyBjb25uZWN0b3IgYXMgcmVzb2x2ZWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlZEN5Y2xlZENvbm5lY3RvcnMuYWRkKGNvbm5lY3RvcklkKVxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIG5ldywgdW5zZWVuIHN0YXRlLCBhZGQgaXQgdG8gdGhlIHNldCBhbmQgY29udGludWUgc2ltdWxhdGluZyB0aGUgY3ljbGVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuYWRkKHN0YXRlKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG1hcCB0aGUgbW9kaWZpZWQgc2V0IG9mIHN0YXRlcyB0byB0aGUgY29ubmVjdG9yXG4gICAgICAgICAgICAgICAgdGhpcy5jeWNsZWRDb25uZWN0b3JzLnNldChjb25uZWN0b3JJZCwgc3RhdGVzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLndob0NhdXNlZEl0ID0gY29ubmVjdG9ySWRcbiAgICAgICAgICAgIC8qICBwcm9jZXNzIGFsbCBvdXRwdXRDb25uZWN0b3JzIGJ5IHNldHRpbmcgdGhlaXIgc3RhdGVcbiAgICAgICAgICAgICAgICB0aGlzIHdpbGwgdHJpZ2dlciBhIGZvbGxvd2luZyBldmVudCBjaGFpbjpcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0Q29ubmVjdG9yIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgLT4gYWxsIGNvbm5lY3RlZCB3aXJlcyBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgLT4gYWxsIGlucHV0Q29ubmVjdG9ycyBjb25uZWN0ZWQgdG8gdGhlc2Ugd2lyZXMgY2hhbmdlXG4gICAgICAgICAgICAgICAgICAgIC0+IGFsbCBlbGVtZW50cyB0aGF0IGNvbnRhaW4gdGhlc2UgaW5wdXRDb25uZWN0b3JzIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAtPiB0aGVzZSBlbGVtZW50cyBjb21wdXRlIHRoZSBuZXcgc3RhdGUgb2YgdGhlaXIgb3V0cHV0IGNvbm5lY3RvcnMgYW5kIGNhbGwgbm90aWZ5Q2hhbmdlKClcbiAgICAgICAgICAgICovXG5cblxuICAgICAgICAgICAgaWYod2hvQ2F1c2VkSXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFByZWRlY2Vzc29yKGNvbm5lY3RvcklkLCB3aG9DYXVzZWRJdClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmN5Y2xlZENvbm5lY3RvcnMuaGFzKGNvbm5lY3RvcklkKSAmJiB0aGlzLmdldEFsbFByZWRlY2Vzc29ycyhjb25uZWN0b3JJZCkuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3ljbGVkQ29ubmVjdG9ycy5zZXQoY29ubmVjdG9ySWQsIG5ldyBTZXQoW3N0YXRlXSkpXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gcmVmbGVjdCB0aGUgY2hhbmdlcyBpbiBTVkdcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3IgPSB0aGlzLnBhcmVudFNWRy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKVxuICAgICAgICAgICAgaWYoY29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdG9yLnNldFN0YXRlKHN0YXRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2hvQ2F1c2VkSXQgPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvLyBtYXJrIGEgcHJlZGVjZXNzb3JDb25uZWN0b3JJZCBhcyBhIHByZWRlY2Vzc29yIG9mIGNvbm5lY3RvcklkXG4gICAgYWRkUHJlZGVjZXNzb3IoY29ubmVjdG9ySWQsIHByZWRlY2Vzc29yQ29ubmVjdG9ySWQpIHtcbiAgICAgICAgaWYoIXRoaXMucHJlZGVjZXNzb3JzLmhhcyhjb25uZWN0b3JJZCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJlZGVjZXNzb3JzLnNldChjb25uZWN0b3JJZCwgbmV3IFNldCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuZ2V0KGNvbm5lY3RvcklkKS5hZGQocHJlZGVjZXNzb3JDb25uZWN0b3JJZClcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHNldCBvZiBhbGwgb3V0cHV0IGNvbm5lY3RvcnMsIHRoYXQgYXJlIGJlZm9yZSB0aGlzIG91dHB1dCBjb25uZWN0b3JcbiAgICBnZXRBbGxQcmVkZWNlc3NvcnMoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgaWYoIXRoaXMucHJlZGVjZXNzb3JzLmhhcyhjb25uZWN0b3JJZCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJlZGVjZXNzb3JzLnNldChjb25uZWN0b3JJZCwgbmV3IFNldCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFsbCA9IG5ldyBTZXQoKVxuXG4gICAgICAgIHRoaXMucHJlZGVjZXNzb3JzLmdldChjb25uZWN0b3JJZCkuZm9yRWFjaChhbGwuYWRkLCBhbGwpO1xuXG4gICAgICAgIGxldCBwcmV2U2l6ZSA9IDBcbiAgICAgICAgbGV0IHNpemUgPSBhbGwuc2l6ZVxuICAgICAgICB3aGlsZShwcmV2U2l6ZSA8IHNpemUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbm5lY3RvciBvZiBhbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmVkZWNlc3NvcnMuaGFzKGNvbm5lY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuZ2V0KGNvbm5lY3RvcikuZm9yRWFjaChhbGwuYWRkLCBhbGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZTaXplID0gc2l6ZVxuICAgICAgICAgICAgc2l6ZSA9IGFsbC5zaXplXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWxsXG4gICAgfVxuXG4gICAgbm90aWZ5Q2hhbmdlKGNvbm5lY3RvcklkLCBzdGF0ZSkge1xuICAgICAgICBsZXQgd2F2ZUlkID0gdGhpcy53YXZlICsgMVxuXG4gICAgICAgIGlmKCF0aGlzLndhdmVzLmhhcyh3YXZlSWQpKSB7XG4gICAgICAgICAgICB0aGlzLndhdmVzLnNldCh3YXZlSWQsIFtdKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53YXZlcy5nZXQod2F2ZUlkKS5wdXNoKG5ldyBzdGF0ZUNoYW5nZShjb25uZWN0b3JJZCwgc3RhdGUsIHRoaXMud2hvQ2F1c2VkSXQpKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0ICogYXMgc3ZnT2JqIGZyb20gJy4vc3ZnT2JqZWN0cy5qcydcbmltcG9ydCAqIGFzIGVkaXRvckVsZW1lbnRzIGZyb20gJy4vZWRpdG9yRWxlbWVudHMuanMnXG5pbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYy5qcydcbmltcG9ydCBDb250ZXh0TWVudSBmcm9tICcuL2NvbnRleHRNZW51LmpzJ1xuaW1wb3J0IEZsb2F0aW5nTWVudSBmcm9tICcuL2Zsb2F0aW5nTWVudS5qcydcbmltcG9ydCBTaW11bGF0b3IgZnJvbSAnLi9sb2dpY1NpbXVsYXRvci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ZnIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGdyaWRTaXplKSB7XG4gICAgICAgIHRoaXMuJHN2ZyA9ICQoY2FudmFzKTtcblxuICAgICAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XG5cbiAgICAgICAgdGhpcy5ib3hlcyA9IFtdOyAvLyBzdG9yZXMgYWxsIGJveGVzXG4gICAgICAgIHRoaXMud2lyZXMgPSBbXTsgLy8gc3RvcmVzIGFsbCB3aXJlc1xuXG4gICAgICAgIHRoaXMuc2ltdWxhdGlvbkVuYWJsZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuc2ltdWxhdG9yID0gbmV3IFNpbXVsYXRvcih0aGlzKTsgLy8gZHVtbXksIHdpbGwgYmUgb3ZlcndyaXR0ZW4gb24gc3RhcnROZXdTaW11bGF0aW9uXG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkZWZzIGVsZW1lbnQsIHVzZWQgZm9yIHBhdHRlcm5zXG4gICAgICAgIHRoaXMuJGRlZnMgPSAkKFwiPGRlZnM+XCIpO1xuICAgICAgICB0aGlzLiRzdmcucHJlcGVuZCh0aGlzLiRkZWZzKTtcblxuICAgICAgICAvLyBCQUNLR1JPVU5EIFBBVFRFUk5cbiAgICAgICAgbGV0IHBhdHRlcm4gPSBuZXcgc3ZnT2JqLlBhdHRlcm4oXCJncmlkXCIsIHRoaXMuZ3JpZFNpemUsIHRoaXMuZ3JpZFNpemUpO1xuXG4gICAgICAgIGxldCBwYXR0ZXJuUG9pbnRzID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpXG4gICAgICAgICAgICAuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCgwLCAwKSlcbiAgICAgICAgICAgIC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMuZ3JpZFNpemUsIDApKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy5ncmlkU2l6ZSwgdGhpcy5ncmlkU2l6ZSkpO1xuXG4gICAgICAgIHBhdHRlcm4uYWRkQ2hpbGQobmV3IHN2Z09iai5Qb2x5TGluZShwYXR0ZXJuUG9pbnRzLCBcIiNhM2E0ZDJcIiwgMikpO1xuICAgICAgICB0aGlzLmFkZFBhdHRlcm4ocGF0dGVybi5nZXQoKSk7XG5cbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgXCIxMDAlXCIsIFwiMTAwJVwiLCBcInVybCgjZ3JpZClcIiwgXCJub25lXCIpO1xuICAgICAgICB0aGlzLmFwcGVuZEpRdWVyeU9iamVjdCh0aGlzLmJhY2tncm91bmQuZ2V0KCkpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICAvLyBDT05TVFJVQ1QgQ09OVEVYVCBNRU5VXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUgPSBuZXcgQ29udGV4dE1lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQ09OU1RSVUNUIEZMT0FUSU5HIE1FTlVcbiAgICAgICAgLy8gdGhpcy5mbG9hdGluZ01lbnUgPSBuZXcgRmxvYXRpbmdNZW51KHRoaXMpO1xuICAgICAgICB0aGlzLmZsb2F0aW5nTWVudSA9IG5ldyBGbG9hdGluZ01lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQUxMIEVWRU5UIENBTExCQUNLU1xuICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICB0aGlzLiRzdmcub24oJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0UmVhbFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VEb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5oaWRlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpZih0YXJnZXQhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb3VzZU1vdmUoZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KS5vbignbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VVcChldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKFwiY29udGV4dG1lbnVcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q29udGV4dE1lbnUoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZLCB0aGlzLmdldFJlYWxKUXVlcnlUYXJnZXQoZXZlbnQudGFyZ2V0KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgdGhpcy5leHBvcnRXaXJlSWRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZXhwb3J0V2lyZUlkID0gMDtcblxuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIC8vIHRvZG8gaW1wbGVtZW50IGdyaWRTaXplIHNjYWxpbmdcbiAgICAgICAgICAgIC8vIGdyaWRTaXplOiB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgYm94ZXM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGRhdGEuYm94ZXNbaV0gPSB0aGlzLmJveGVzW2ldLmV4cG9ydERhdGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpbXBvcnREYXRhKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zaW11bGF0aW9uRW5hYmxlZCA9IGZhbHNlXG5cbiAgICAgICAgLy8gdG9kbyBpbXBsZW1lbnQgZ3JpZFNpemUgc2NhbGluZ1xuXG4gICAgICAgIC8vIGxpc3Qgb2Ygd2lyZXMgdG8gYmUgYWRkZWRcbiAgICAgICAgbGV0IG5ld1dpcmVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgZGF0YS5ib3hlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgLy8gYWRkIGJveFxuICAgICAgICAgICAgbGV0IGJveDtcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ib3hlc1tpXS5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJnYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgZ2F0ZSAod2l0aG91dCByZWxvYWRpbmcgdGhlIFNWRywgd2Ugd2lsbCByZWxvYWQgaXQgb25jZSBhZnRlciB0aGUgaW1wb3J0KVxuICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld0dhdGUoZGF0YS5ib3hlc1tpXS5uYW1lLCAwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpb1wiOlxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBpbnB1dCAod2l0aG91dCByZWxvYWRpbmcgdGhlIFNWRywgd2Ugd2lsbCByZWxvYWQgaXQgb25jZSBhZnRlciB0aGUgaW1wb3J0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveCA9IHRoaXMubmV3SW5wdXQoMCwgMCwgZGF0YS5ib3hlc1tpXS5pc09uLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwib3V0cHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBvdXRwdXQgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld091dHB1dCgwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIGlvIGJveCBuYW1lICdcIitkYXRhLmJveGVzW2ldLm5hbWUrXCInLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBib3ggY2F0ZWdvcnkgJ1wiK2RhdGEuYm94ZXNbaV0uY2F0ZWdvcnkrXCInLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJveCkge1xuICAgICAgICAgICAgICAgIC8vIHByb2NjZXNzIGJveCB0cmFuc2Zvcm1zICh0cmFuc2xhdGlvbiBhbmQgcm90YXRpb24pXG4gICAgICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IG5ldyBlZGl0b3JFbGVtZW50cy5UcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwIDsgaiA8IGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zLmxlbmd0aCA7ICsraikge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFuc2xhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyb3RhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc2V0Um90YXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gdHJhbnNmb3JtIHByb3BlcnR5ICdcIitkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5uYW1lK1wiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBib3guc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgYWxsIHdpcmVzIHRvIHRoZSBsaXN0IG9mIHdpcmVzIHRvIGJlIGFkZGVkXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMCA7IGogPCBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zLmxlbmd0aCA7ICsraikge1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGFydGlmaWNpYWwgd2lyZSBpZFxuICAgICAgICAgICAgICAgICAgICBsZXQgd2lyZUlkID0gZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9uc1tqXS53aXJlSWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcGFzcyB0aGUgdmFsdWVzIGdvdCBmcm9tIGpzb24gaW50byBhIHZhcmlhYmxlIHRoYXQgd2lsbCBiZSBhZGRlZCBpbnRvIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGRhdGEuYm94ZXNbaV0uY29ubmVjdGlvbnNbal0uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zW2pdLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3hJZDogYm94LmlkXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSB2YWx1ZSB0byB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld1dpcmVzLmhhcyh3aXJlSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhbHJlYWR5IGlzIGEgd2lyZSB3aXRoIHRoaXMgaWQgaW4gdGhlIG1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgdmFsdWUgdG8gdGhlIGVuZCBvZiB0aGUgYXJyYXkgb2YgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFwVmFsdWUgPSBuZXdXaXJlcy5nZXQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcFZhbHVlLmxlbmd0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1dpcmVzLnNldCh3aXJlSWQsIG1hcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHdpcmUgd2l0aCB0aGlzIGlkIGluIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgd2lyZSBhbmQgc2V0IHRoZSB2YWx1ZSB0byBiZSB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1dpcmVzLnNldCh3aXJlSWQsIFt2YWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgU1ZHIGRvY3VtZW50IChuZWVkZWQgZm9yIHdpcmluZylcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgLy8gd2l0aCBhbGwgYm94ZXMgYWRkZWQsIHdlIGNhbiBub3cgY29ubmVjdCB0aGVtIHdpdGggd2lyZXNcbiAgICAgICAgbmV3V2lyZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3JJZHMgPSBbXTtcbiAgICAgICAgICAgIGlmKGl0ZW1bMF0gJiYgaXRlbVsxXSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBvZiBbMCwgMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJveCA9IHRoaXMuZ2V0Qm94QnlJZChpdGVtW2ldLmJveElkKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0b3JJZHNbaV0gPSBib3guY29ubmVjdG9yc1tpdGVtW2ldLmluZGV4XS5pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5ld1dpcmUoY29ubmVjdG9ySWRzWzBdLCBjb25uZWN0b3JJZHNbMV0sIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZWZyZXNoIHRoZSBTVkcgZG9jdW1lbnRcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgdGhpcy5zaW11bGF0aW9uRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGJveCBvZiB0aGlzLmJveGVzKSB7XG4gICAgICAgICAgICBpZiAoYm94IGluc3RhbmNlb2YgZWRpdG9yRWxlbWVudHMuSW5wdXRCb3gpIHtcbiAgICAgICAgICAgICAgICAvLyBzd2l0Y2ggdGhlIGlucHV0IGJveCBzdGF0ZSB0byB0aGUgb3Bvc2l0IGFuZCBiYWNrLCBmb3Igc29tZSByZWFzb24gY2FsbGluZyBib3gucmVmcmVzaFN0YXRlKClcbiAgICAgICAgICAgICAgICAvLyByZXN1bHRzIGluIHdlaXJkIHVuZmluaXNoZWQgc2ltdWxhdGlvblxuICAgICAgICAgICAgICAgIC8vIHRoaXMgY2F1c2VzIHVwZGF0ZSBvZiB0aGUgb3V0cHV0IGNvbm5lY3RvciBhbmQgYSBzdGFydCBvZiBhIG5ldyBzaW11bGF0aW9uXG5cbiAgICAgICAgICAgICAgICAvLyB0b2RvIGZpbmQgYmV0dGVyIHNvbHV0aW9uIGluc3RlYWQgb2YgdGhpcyB3b3JrYXJvdW5kXG4gICAgICAgICAgICAgICAgYm94Lm9uID0gIWJveC5vblxuICAgICAgICAgICAgICAgIGJveC5vbiA9ICFib3gub25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpcmVDcmVhdGlvbkhlbHBlcihjb25uZWN0b3JJZCkge1xuICAgICAgICBpZighdGhpcy5maXJzdENvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29ubmVjdG9ySWQgPSBjb25uZWN0b3JJZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubmV3V2lyZSh0aGlzLmZpcnN0Q29ubmVjdG9ySWQsIGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDb25uZWN0b3JJZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0TmV3U2ltdWxhdGlvbihzdGFydGluZ0Nvbm5lY3Rvciwgc3RhdGUpIHtcbiAgICAgICAgaWYodGhpcy5zaW11bGF0aW9uRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zaW11bGF0b3IgPSBuZXcgU2ltdWxhdG9yKHRoaXMpXG4gICAgICAgICAgICB0aGlzLnNpbXVsYXRvci5ub3RpZnlDaGFuZ2Uoc3RhcnRpbmdDb25uZWN0b3IuaWQsIHN0YXRlKVxuICAgICAgICAgICAgdGhpcy5zaW11bGF0b3IucnVuKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5ld0dhdGUobmFtZSwgeCwgeSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3Qm94KHgsIHksIG5ldyBlZGl0b3JFbGVtZW50cy5HYXRlKHRoaXMsIG5hbWUsIHgsIHkpLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBuZXdJbnB1dCh4LCB5LCBpc09uID0gZmFsc2UsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0JveCh4LCB5LCBuZXcgZWRpdG9yRWxlbWVudHMuSW5wdXRCb3godGhpcywgaXNPbiksIHJlZnJlc2gpO1xuICAgIH1cblxuICAgIG5ld091dHB1dCh4LCB5LCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLk91dHB1dEJveCh0aGlzKSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgbmV3Qm94KHgsIHksIG9iamVjdCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5ib3hlcy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5ib3hlc1tpbmRleF0gPSBvYmplY3Q7XG5cbiAgICAgICAgLy8gdHJhbnNsYXRlIHRoZSBnYXRlIGlmIHggYW5kIHkgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAgICAgIGlmKHggJiYgeSkge1xuICAgICAgICAgICAgbGV0IHRyID0gbmV3IGVkaXRvckVsZW1lbnRzLlRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdHIuc2V0VHJhbnNsYXRlKHgsIHkpO1xuXG4gICAgICAgICAgICB0aGlzLmJveGVzW2luZGV4XS5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHIuZ2V0KCl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwZW5kRWxlbWVudCh0aGlzLmJveGVzW2luZGV4XSwgcmVmcmVzaCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYm94ZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHJlbW92ZUJveChnYXRlSWQpIHtcbiAgICAgICAgbGV0ICRnYXRlID0gJChcIiNcIitnYXRlSWQpO1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIGdhdGUgaW4gc3ZnJ3MgbGlzdCBvZiBnYXRlc1xuICAgICAgICBsZXQgZ2F0ZUluZGV4ID0gLTE7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMuYm94ZXNbaV0uc3ZnT2JqLmlkPT09Z2F0ZUlkKSB7XG4gICAgICAgICAgICAgICAgZ2F0ZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGdhdGVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgYWxsIHdpcmVzIGNvbm5lY3RlZCB0byB0aGlzIGdhdGVcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmJveGVzW2dhdGVJbmRleF0uY29ubmVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlV2lyZXNCeUNvbm5lY3RvcklkKHRoaXMuYm94ZXNbZ2F0ZUluZGV4XS5jb25uZWN0b3JzW2ldLnN2Z09iai5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZ2F0ZVxuICAgICAgICAgICAgdGhpcy5ib3hlcy5zcGxpY2UoZ2F0ZUluZGV4LCAxKTtcbiAgICAgICAgICAgICRnYXRlLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRyeWluZyB0byByZW1vdmUgYW4gbm9uZXhpc3RpbmcgZ2F0ZS4gKEdhdGUgaWQ6IFwiK2dhdGVJZCtcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdXaXJlKGZyb21JZCwgdG9JZCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgLy8gd2lyZSBtdXN0IGNvbm5lY3QgdHdvIGRpc3RpbmN0IGVsZW1lbnRzXG4gICAgICAgIGlmIChmcm9tSWQ9PT10b0lkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgbGV0IGNvbm5lY3RvcnMgPSBbdGhpcy5nZXRDb25uZWN0b3JCeUlkKGZyb21JZCksIHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh0b0lkKV1cblxuICAgICAgICAvLyBpbnB1dCBjb25uZWN0b3JzIGNhbiBiZSBjb25uZWN0ZWQgdG8gb25lIHdpcmUgbWF4XG4gICAgICAgIGNvbm5lY3RvcnMuZm9yRWFjaChjb25uID0+IHtcbiAgICAgICAgICAgIGlmKGNvbm4uaXNJbnB1dENvbm5lY3RvcilcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZChjb25uLmlkKVxuICAgICAgICB9KVxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLndpcmVzLmxlbmd0aDtcbiAgICAgICAgdGhpcy53aXJlc1tpbmRleF0gPSBuZXcgZWRpdG9yRWxlbWVudHMuV2lyZSh0aGlzLCBmcm9tSWQsIHRvSWQsIHRoaXMuZ3JpZFNpemUsIHJlZnJlc2gpO1xuXG4gICAgICAgIGNvbm5lY3RvcnMuZm9yRWFjaChjb25uID0+IHtcbiAgICAgICAgICAgIGNvbm4uYWRkV2lyZUlkKHRoaXMud2lyZXNbaW5kZXhdLnN2Z09iai5pZCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5hcHBlbmRFbGVtZW50KHRoaXMud2lyZXNbaW5kZXhdLCByZWZyZXNoKTtcbiAgICAgICAgdGhpcy5tb3ZlVG9CYWNrQnlJZCh0aGlzLndpcmVzW2luZGV4XS5zdmdPYmouaWQpO1xuXG4gICAgICAgIGlmKHJlZnJlc2gpXG4gICAgICAgICAgICB0aGlzLndpcmVzW2luZGV4XS51cGRhdGVXaXJlU3RhdGUoKVxuXG4gICAgICAgIHJldHVybiB0aGlzLndpcmVzW2luZGV4XTtcbiAgICB9XG5cbiAgICBnZXRXaXJlQnlJZCh3aXJlSWQpIHtcbiAgICAgICAgbGV0IHdpcmVDb3VudCA9IHRoaXMud2lyZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgd2lyZUNvdW50IDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLndpcmVzW2ldLnN2Z09iai5pZD09PXdpcmVJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpcmVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldFdpcmVzQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rvci53aXJlSWRzO1xuICAgIH1cblxuICAgIHJlbW92ZVdpcmVCeUlkKHdpcmVJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMud2lyZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy53aXJlc1tpXS5zdmdPYmouaWQgPT09IHdpcmVJZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGNvbm5lY3RvcjEgPSB0aGlzLndpcmVzW2ldLnN0YXJ0Q29ubmVjdG9yO1xuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IyID0gdGhpcy53aXJlc1tpXS5lbmRDb25uZWN0b3I7XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0b3IxLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuICAgICAgICAgICAgICAgIGNvbm5lY3RvcjIucmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzW2ldLnN2Z09iai4kZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy53aXJlcy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcblxuICAgICAgICBjb25uZWN0b3Iud2lyZUlkcy5mb3JFYWNoKHdpcmVJZCA9PiB7XG4gICAgICAgICAgICBsZXQgd2lyZSA9IHRoaXMuZ2V0V2lyZUJ5SWQod2lyZUlkKTtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBvdGhlciBjb25uZWN0b3IgdGhhdCBpcyB0aGUgd2lyZSBjb25uZWN0ZWQgdG9cbiAgICAgICAgICAgIGxldCBvdGhlckNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh3aXJlLmZyb21JZCwgd2lyZSk7XG4gICAgICAgICAgICBpZihvdGhlckNvbm5lY3Rvci5zdmdPYmouaWQ9PT1jb25uZWN0b3JJZCkge1xuICAgICAgICAgICAgICAgIG90aGVyQ29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKHdpcmUudG9JZCwgd2lyZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgd2lyZSByZWNvcmQgZnJvbSB0aGUgb3RoZXIgY29ubmVjdG9yXG4gICAgICAgICAgICBvdGhlckNvbm5lY3Rvci53aXJlSWRzLmRlbGV0ZSh3aXJlSWQpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIHdpcmUgcmVwcmVzZW50YXRpb24gdXNpbmcgalF1ZXJ5XG4gICAgICAgICAgICAkKFwiI1wiICsgd2lyZUlkKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgLy8gaWYgb3RoZXJDb25uZWN0b3IgaXMgYW4gaW5wdXQgY29ubmVjdG9yLCBzZXQgaXRzIHN0YXRlIHRvIHVua25vd25cbiAgICAgICAgICAgIGlmKG90aGVyQ29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBvdGhlckNvbm5lY3Rvci5zZXRTdGF0ZShMb2dpYy5zdGF0ZS51bmtub3duKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2xlYXIgdGhlIGxpc3Qgb2Ygd2lyZSBJZHNcbiAgICAgICAgY29ubmVjdG9yLndpcmVJZHMuY2xlYXIoKTtcbiAgICAgICAgLy8gaWYgY29ubmVjdG9yIGlzIGFuIGlucHV0IGNvbm5lY3Rvciwgc2V0IGl0cyBzdGF0ZSB0byB1bmtub3duXG4gICAgICAgIGlmKGNvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICBjb25uZWN0b3Iuc2V0U3RhdGUoTG9naWMuc3RhdGUudW5rbm93bik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRCb3hCeUlkKGdhdGVJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmJveGVzW2ldLnN2Z09iai5pZD09PWdhdGVJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJveGVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRCb3hCeUNvbm5lY3RvcklkKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJveGVzW2ldLmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCwgd2lyZSkge1xuICAgICAgICAvLyB0aGUgd2lyZSB2YXJpYWJsZSBpcyB1c2VkIGFzIGhldXJpc3RpYyxcbiAgICAgICAgLy8gd2hlbiB3ZSBrbm93IHRoZSB3aXJlLCB3ZSBoYXZlIHRvIGNoZWNrIG9ubHlcbiAgICAgICAgLy8gdHdvIGdhdGVzIGluc3RlYWQgb2YgYWxsIG9mIHRoZW1cblxuICAgICAgICBpZih3aXJlIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB3ZSBrbm93IHRoZSB3aXJlIC0tIHdlIGNhbiBjaGVjayBvbmx5IGdhdGVzIGF0IHRoZSBlbmRzIG9mIHRoaXMgd2lyZVxuICAgICAgICAgICAgbGV0IGNvbm5lY3RvciA9IHdpcmUuc3RhcnRCb3guZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG4gICAgICAgICAgICBpZiAoIWNvbm5lY3Rvcikge1xuICAgICAgICAgICAgICAgIGNvbm5lY3RvciA9IHdpcmUuZW5kQm94LmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3RvcjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgZG8gbm90IGtub3cgdGhlIHdpcmUgLS0gd2UgaGF2ZSB0byBjaGVjayBhbGwgZ2F0ZXNcbiAgICAgICAgICAgIGxldCBnYXRlQ291bnQgPSB0aGlzLmJveGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IGdhdGVDb3VudCA7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IgPSB0aGlzLmJveGVzW2ldLmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgICAgIGlmKGNvbm5lY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29ubmVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBvYmplY3QsIHRoYXQgdXNlciBpbnRlcmFjdGVkIHdpdGgsIGlzIG5vdCBhIGNvbm5lY3RvciBhbmQgaXMgaW4gYSBncm91cFxuICAgIC8vIHJldHVybiB0aGUgZ3JvdXAgalF1ZXJ5IG9iamVjdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBqUXVlcnkgb2JqZWN0XG4gICAgZ2V0UmVhbEpRdWVyeVRhcmdldCh0YXJnZXQpIHtcbiAgICAgICAgbGV0ICR0YXJnZXQgPSAkKHRhcmdldCk7XG4gICAgICAgIGlmKCEkdGFyZ2V0Lmhhc0NsYXNzKFwiY29ubmVjdG9yXCIpICYmICR0YXJnZXQucGFyZW50cygnZycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgd2hpbGUgKCR0YXJnZXQucHJvcChcInRhZ05hbWVcIikgIT09IFwiR1wiICYmICR0YXJnZXQucHJvcChcInRhZ05hbWVcIikgIT09IFwiZ1wiKSB7XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICR0YXJnZXQucGFyZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICR0YXJnZXQ7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0aGUgZWRpdG9yRWxlbWVudCB0aGF0IHVzZXIgaW50ZXJhY3RlZCB3aXRoLCB0aGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBpcyBhIGpRdWVyeSBlbGVtZW50XG4gICAgZ2V0UmVhbFRhcmdldCh0YXJnZXQpIHtcbiAgICAgICAgLy8gZXZlbnR5IHNlIG11c2VqaSB6cHJhY292YXQgdGFkeSwgcHJvdG96ZSB2IFNWRyBzZSBldmVudHkgbmVwcm9wYWd1amlcbiAgICAgICAgbGV0ICR0YXJnZXQgPSAkKHRhcmdldCk7XG5cbiAgICAgICAgaWYoJHRhcmdldC5oYXNDbGFzcyhcImNvbm5lY3RvclwiKSkge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNvbm5lY3RvciwgZG9uJ3QgdHJhdmVyc2UgZ3JvdXBzXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb25uZWN0b3JCeUlkKCR0YXJnZXQuYXR0cignaWQnKSk7XG4gICAgICAgIH0gZWxzZSBpZigkdGFyZ2V0LnBhcmVudHMoJ2cnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGVsZW1lbnQgaXMgaW4gYSBncm91cCBhbmQgaXQgaXMgbm90IGEgY29ubmVjdG9yXG5cbiAgICAgICAgICAgIC8vIHRyYXZlcnNpbmcgdXAgdGhlIERPTSB0cmVlIHVudGlsIHdlIGZpbmQgdGhlIGNsb3Nlc3QgZ3JvdXBcbiAgICAgICAgICAgIGxldCAkcGFyZW50R3JvdXAgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgd2hpbGUgKCRwYXJlbnRHcm91cC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJHXCIgJiYgJHBhcmVudEdyb3VwLnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcImdcIikge1xuICAgICAgICAgICAgICAgICRwYXJlbnRHcm91cCA9ICRwYXJlbnRHcm91cC5wYXJlbnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm94QnlJZCgkcGFyZW50R3JvdXAuYXR0cignaWQnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHRhcmdldC5oYXNDbGFzcyhcIndpcmVcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFdpcmVCeUlkKCR0YXJnZXQuYXR0cignaWQnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kRWxlbWVudChlbGVtZW50LCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFwcGVuZEpRdWVyeU9iamVjdChlbGVtZW50LmdldCgpLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBhcHBlbmRKUXVlcnlPYmplY3Qob2JqZWN0LCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLiRzdmcuYXBwZW5kKG9iamVjdCk7XG4gICAgICAgIGlmKHJlZnJlc2gpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgICAgIHRoaXMuJGRlZnMuYXBwZW5kKHBhdHRlcm4pO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG5cbiAgICAvLyByZWxvYWQgdGhlIFNWRyBkb2N1bWVudCAobmVlZGVkIHRvIGRpc3BsYXkgbmV3bHkgYXBwZW5kZWQgalF1ZXJ5IG9iamVjdClcbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLiRzdmcuaHRtbCh0aGlzLiRzdmcuaHRtbCgpKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTVkcgZG9jdW1lbnQgaGFzIGJlZW4gcmVsb2FkZWQuXCIpXG4gICAgfVxuXG4gICAgZGlzcGxheUNvbnRleHRNZW51KHgsIHksICR0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudS5kaXNwbGF5KHgsIHksICR0YXJnZXQpO1xuICAgIH1cbiAgICBoaWRlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIHNuYXAgYSB2YWx1ZSB0byBhIGdyaWRcbiAgICBzbmFwVG9HcmlkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5ncmlkU2l6ZSkgKiB0aGlzLmdyaWRTaXplO1xuICAgIH1cblxuICAgIC8vIHN0YXRpYyBmdW5jdGlvbiBmb3Igc25hcHBpbmcgYSB2YWx1ZSB0byBhIGdyaWRcbiAgICBzdGF0aWMgc25hcFRvR3JpZCh2YWx1ZSwgZ3JpZFNpemUpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyBncmlkU2l6ZSkgKiBncmlkU2l6ZTtcbiAgICB9XG5cbiAgICAvLyBnZXQgc2V0IG9mIG5vZGVzLCB0aGF0IGNhbm5vdCBiZSB1c2VkIGZvciB3aXJpbmcgYXQgYW55IGNpcmN1bXN0YW5jZXNcbiAgICBnZXROb25Sb3V0YWJsZU5vZGVzKCkge1xuICAgICAgICBsZXQgYmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAvLyBmb3IgZWFjaCBib3hcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBqUXVlcnkgY2hpbGQgd2l0aCBjbGFzcyAucmVjdCAoXCJoaXRib3hcIilcbiAgICAgICAgICAgIGxldCByZWN0ID0gJCgnIycgKyB0aGlzLmJveGVzW2ldLnN2Z09iai5pZCkuY2hpbGRyZW4oXCIucmVjdFwiKVswXTtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZVxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gJChyZWN0KS5wb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAvLyBzbmFwIHRoZSBwb3NpdGlvbiB0byB0aGUgZ3JpZFxuICAgICAgICAgICAgcG9zaXRpb24ubGVmdCA9IHRoaXMuc25hcFRvR3JpZChwb3NpdGlvbi5sZWZ0KTtcbiAgICAgICAgICAgIHBvc2l0aW9uLnRvcCA9IHRoaXMuc25hcFRvR3JpZChwb3NpdGlvbi50b3ApO1xuXG4gICAgICAgICAgICAvLyBmb3IgZWFjaCBpdGVtIGluIGJsb2NrZWROb2RlcyAoc2V0IG9mIGJsb2NrZWQgbm9kZXMgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZVxuICAgICAgICAgICAgLy8gdG8gdGhlIGxlZnQgdXBwZXIgY29ybmVyIG9mIHJlY3Q7IHVuaXQgdXNlZCBpcyBcIm9uZSBncmlkU2l6ZVwiKSBjb252ZXJ0IHRoZSBjb29yZGluYXRlc1xuICAgICAgICAgICAgLy8gdG8gYWJzb2x1dGUgKG11bHRpcGxlIHdpdGggZ3JpZFNpemUgYW5kIGFkZCBwb3NpdGlvbiBvZiByZWN0KSBhbmQgYWRkIHRoZSByZXN1bHQgdG8gdGhlIHNldFxuICAgICAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuYm94ZXNbaV0uYmxvY2tlZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFic29sdXRlWCA9IHBvc2l0aW9uLmxlZnQgKyBpdGVtLnggKiB0aGlzLmdyaWRTaXplO1xuICAgICAgICAgICAgICAgIGxldCBhYnNvbHV0ZVkgPSBwb3NpdGlvbi50b3AgKyBpdGVtLnkgKiB0aGlzLmdyaWRTaXplO1xuXG4gICAgICAgICAgICAgICAgYmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IGFic29sdXRlWCxcbiAgICAgICAgICAgICAgICAgICAgeTogYWJzb2x1dGVZXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdG9kbyBlbnN1cmUgdGhhdCB0aGlzLnJlZnJlc2goKSBpcyByZWFsbHkgdW5uZWNlc3NhcnlcbiAgICAgICAgLy8gdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIC8vIHJldHVybiB0aGUgc2V0XG4gICAgICAgIHJldHVybiBibG9ja2VkTm9kZXM7XG4gICAgfVxuXG4gICAgbW92ZVRvRnJvbnRCeUlkKG9iaklkKSB7XG4gICAgICAgIHRoaXMuJHN2Zy5hcHBlbmQoJChcIiNcIiArIG9iaklkKSk7XG4gICAgfVxuXG4gICAgbW92ZVRvQmFja0J5SWQob2JqSWQpIHtcbiAgICAgICAgJChcIiNcIiArIHRoaXMuYmFja2dyb3VuZC5pZClcbiAgICAgICAgICAgIC5hZnRlcigkKFwiI1wiICsgb2JqSWQpKTtcbiAgICB9XG5cbiAgICAvLyBnZXQgc2V0IG9mIG5vZGVzLCB0aGF0IGlzIGJldHRlciBub3QgdG8gdXNlIGZvciB3aXJpbmdcbiAgICBnZXRJbmNvbnZlbmllbnROb2RlcyhpZ25vcmVXaXJlSWQpIHtcblxuICAgICAgICBsZXQgaW5jb252ZW5pZW50Tm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIC8vIGZvciBlYWNoIHdpcmVcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLndpcmVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgLy8gKGlnbm9yZSB0aGUgd2lyZSB0aGF0IGlzIHNwZWNpZmllZCBpbiB0aGUgaWdub3JlV2lyZUlkIGFyZ3VtZW50IChpZiBhbnkpKVxuICAgICAgICAgICAgaWYoaWdub3JlV2lyZUlkPT09dW5kZWZpbmVkIHx8IGlnbm9yZVdpcmVJZCE9PXRoaXMud2lyZXNbaV0uc3ZnT2JqLmlkKSB7XG4gICAgICAgICAgICAgICAgLy8gY3ljbGUgdGhyb3VnaCBwb2ludHMsIGZvciBlYWNoIG5laWdib3VycyBhZGQgYWxsIHBvaW50cyB0aGF0IGFyZSBpbiBiZXR3ZWVuIHRoZW1cbiAgICAgICAgICAgICAgICAvLyBpLmUuOiAoMCwwKSBhbmQgKDAsMzApIGFyZSBibG9ja2luZyB0aGVzZSBub2RlczogKDAsMCksICgwLDEwKSwgKDAsMjApLCAoMCwzMClcbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvaW50O1xuICAgICAgICAgICAgICAgIHRoaXMud2lyZXNbaV0ucG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldlBvaW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcmV2UG9pbnQgaXMgdW5kZWZpbmVkLCBhZGQgdGhlIGZpcnN0IHBvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNvbnZlbmllbnROb2Rlcy5hZGQoe3g6IHBvaW50LngsIHk6IHBvaW50Lnl9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2UgYWRkIGFsbCB0aGUgcG9pbnQgYmV0d2VlbiB0aGUgcHJldlBvaW50IChleGNsdWRlZCkgYW5kIHBvaW50IChpbmNsdWRlZClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJldlBvaW50Lng9PT1wb2ludC54KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmUgaXMgaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tID0gTWF0aC5taW4ocHJldlBvaW50LnksIHBvaW50LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0byA9IE1hdGgubWF4KHByZXZQb2ludC55LCBwb2ludC55KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlKGZyb20gPD0gdG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb252ZW5pZW50Tm9kZXMuYWRkKHt4OiBwb2ludC54LCB5OiBmcm9tfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKz0gdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocHJldlBvaW50Lnk9PT1wb2ludC55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmUgaXMgdmVydGljYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IE1hdGgubWluKHByZXZQb2ludC54LCBwb2ludC54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG8gPSBNYXRoLm1heChwcmV2UG9pbnQueCwgcG9pbnQueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZShmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29udmVuaWVudE5vZGVzLmFkZCh7eDogZnJvbSwgeTogcG9pbnQueX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICs9IHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5lIGlzIG5laXRoZXIgaG9yaXpvbnRhbCBub3IgdmVydGljYWwsIHRocm93IGFuIGVycm9yIGZvciBiZXR0ZXIgZnV0dXJlIGRlYnVnZ2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJnZXRJbmNvbnZlbmllbnROb2RlczogbGluZSBiZXR3ZWVuIHR3byBwb2ludHMgaXMgbmVpdGhlciBob3Jpem9udGFsIG5vciB2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBuZXcgcHJldlBvaW50XG4gICAgICAgICAgICAgICAgICAgIHByZXZQb2ludCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiB0aGUgc2V0XG4gICAgICAgIHJldHVybiBpbmNvbnZlbmllbnROb2RlcztcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ZnIGZyb20gJy4vY2FudmFzLmpzJztcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHN2ZyA9IG5ldyBTdmcoXCJzdmcjY2FudmFzXCIsIDEwKTtcblxuICAgIC8qIERFTU8gKi9cbiAgICAvLyBPTkUgQklUIENPTVBBUkFUT1JcbiAgICAvKlxuICAgIGxldCBpMSA9IHN2Zy5uZXdJbnB1dCgxMDAsIDEwMCk7XG4gICAgbGV0IGkyID0gc3ZnLm5ld0lucHV0KDEwMCwgMjAwKTtcblxuICAgIGxldCBuMSA9IHN2Zy5uZXdHYXRlKFwibm90XCIsIDIwMCwgMTAwKTtcbiAgICBsZXQgbjIgPSBzdmcubmV3R2F0ZShcIm5vdFwiLCAyMDAsIDIwMCk7XG5cbiAgICBsZXQgYTEgPSBzdmcubmV3R2F0ZShcImFuZFwiLCAzNjAsIDkwKTtcbiAgICBsZXQgYTIgPSBzdmcubmV3R2F0ZShcImFuZFwiLCAzNjAsIDIxMCk7XG5cbiAgICBsZXQgbm9yID0gc3ZnLm5ld0dhdGUoXCJub3JcIiwgNTQwLCAxNTApO1xuXG4gICAgbGV0IG8xID0gc3ZnLm5ld091dHB1dCg2ODAsIDkwKTtcbiAgICBsZXQgbzIgPSBzdmcubmV3T3V0cHV0KDY4MCwgMTUwKTtcbiAgICBsZXQgbzMgPSBzdmcubmV3T3V0cHV0KDY4MCwgMjEwKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBuMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbjIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUobjEub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKG4yLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGExLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBub3IuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoYTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG5vci5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGExLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShub3Iub3V0cHV0c1swXS5zdmdPYmouaWQsIG8yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGEyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMy5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICAqL1xuXG4gICAgLy8gQklOQVJZIEFEREVSXG4gICAgLypcbiAgICBsZXQgaTEgPSBzdmcubmV3SW5wdXQoODAsIDkwKTtcbiAgICBsZXQgaTIgPSBzdmcubmV3SW5wdXQoODAsIDEzMCk7XG4gICAgbGV0IGkzID0gc3ZnLm5ld0lucHV0KDgwLCAxODApO1xuXG4gICAgbGV0IHgxID0gc3ZnLm5ld0dhdGUoXCJ4b3JcIiwgMzYwLCAxMDApO1xuICAgIGxldCB4MiA9IHN2Zy5uZXdHYXRlKFwieG9yXCIsIDM2MCwgMTcwKTtcblxuICAgIGxldCBhMSA9IHN2Zy5uZXdHYXRlKFwiYW5kXCIsIDI1MCwgMjIwKTtcbiAgICBhMS5vbkNsaWNrTWlkZGxlKCk7Ly8gYSBqZWRub3Ugcm90b3ZhbnlcbiAgICBsZXQgYTIgPSBzdmcubmV3R2F0ZShcImFuZFwiLCA1MDAsIDMyMCk7XG5cbiAgICBsZXQgb3IgPSBzdmcubmV3R2F0ZShcIm9yXCIsIDYyMCwgMzEwKTtcblxuICAgIGxldCBvMSA9IHN2Zy5uZXdPdXRwdXQoNzUwLCAyNzApO1xuICAgIGxldCBvMiA9IHN2Zy5uZXdPdXRwdXQoNzUwLCAzMTApO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIHgxLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4MS5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMy5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDIuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTEuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShpMy5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZSh4MS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoeDEub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoYTEub3V0cHV0c1swXS5zdmdPYmouaWQsIG9yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoeDIub3V0cHV0c1swXS5zdmdPYmouaWQsIG8xLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGEyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvci5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKG9yLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICAqL1xufSk7Il19
