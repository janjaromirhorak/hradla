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
        this.parentSVG.simulation.notifyChange(this.connectors[0].id, state);
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
        'href': './docs/user.html',
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
var $__src_47_es6_47_simulation_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/simulation.js";
  var Logic = ($__src_47_es6_47_logic_46_js__).default;
  var stateChange = function() {
    function stateChange(connectorId, state, whoCausedIt) {
      this.connectorId = connectorId;
      this.state = state;
      this.whoCausedIt = whoCausedIt;
    }
    return ($traceurRuntime.createClass)(stateChange, {}, {});
  }();
  var Simulation = function() {
    function Simulation(parentSVG) {
      this.parentSVG = parentSVG;
      this.predecessors = new Map();
      this.waves = new Map();
      this.wave = 0;
      this.cycledConnectors = new Map();
      this.resolvedCycledConnectors = new Set();
    }
    return ($traceurRuntime.createClass)(Simulation, {
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
      return Simulation;
    }};
})();
var $__src_47_es6_47_smallFunctions_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/smallFunctions.js";
  var Fn = function() {
    function Fn() {}
    return ($traceurRuntime.createClass)(Fn, {}, {
      deepCopy: function(arr) {
        return $.extend(true, [], arr);
      },
      addMouseScrollEventListener: function(query, func) {
        var MouseWheelHandler = function(event) {
          var event = window.event || event;
          event.delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
          func(event);
          return false;
        };
        var svgelement = document.querySelector(query);
        if (svgelement.addEventListener) {
          svgelement.addEventListener("mousewheel", MouseWheelHandler, false);
          svgelement.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        } else {
          svgelement.attachEvent("onmousewheel", MouseWheelHandler);
        }
        svgelement.addEventListener('mousewheel', function(e) {
          console.log('event', e);
        }, false);
      }
    });
  }();
  ;
  return {get default() {
      return Fn;
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
  var Simulation = ($__src_47_es6_47_simulation_46_js__).default;
  var Fn = ($__src_47_es6_47_smallFunctions_46_js__).default;
  var ViewBox = function() {
    function ViewBox(left, top, width, height) {
      this.real = {
        left: left,
        top: top,
        width: width,
        height: height
      };
      this.zoom = 1;
      this.leftShift = 0;
      this.topShift = 0;
    }
    return ($traceurRuntime.createClass)(ViewBox, {
      get width() {
        return this.real.width / this.zoom;
      },
      get height() {
        return this.real.height / this.zoom;
      },
      get left() {
        return this.real.left - (this.leftShift / this.zoom) + ((this.real.width - this.width) / 2);
      },
      get top() {
        return this.real.top - (this.topShift / this.zoom) + ((this.real.height - this.height) / 2);
      },
      get str() {
        return (this.left + " " + this.top + " " + this.width + " " + this.height);
      }
    }, {});
  }();
  var Svg = function() {
    function Svg(canvas, gridSize) {
      var $__2 = this;
      this.$svg = $(canvas);
      this.gridSize = gridSize;
      this.boxes = [];
      this.wires = [];
      this.simulationEnabled = true;
      this.simulation = new Simulation(this);
      this.$defs = $("<defs>");
      this.$svg.prepend(this.$defs);
      var pattern = new svgObj.Pattern("grid", this.gridSize, this.gridSize);
      var patternPoints = new svgObj.PolylinePoints().append(new svgObj.PolylinePoint(0, 0)).append(new svgObj.PolylinePoint(this.gridSize, 0)).append(new svgObj.PolylinePoint(this.gridSize, this.gridSize));
      pattern.addChild(new svgObj.PolyLine(patternPoints, "#a3a4d2", 2));
      this.addPattern(pattern.get());
      this.background = new svgObj.Rectangle(0, 0, this.width, this.height, "url(#grid)", "none");
      this.appendJQueryObject(this.background.get());
      this.refresh();
      this.$svg.attr('preserveAspectRatio', 'xMinYMin slice');
      this.viewbox = new ViewBox(0, 0, this.width, this.height);
      this.applyViewbox();
      this.contextMenu = new ContextMenu(this);
      this.floatingMenu = new FloatingMenu(this);
      var target;
      this.$svg.on('mousedown', function(event) {
        target = $__2.getRealTarget(event.target);
        if (target !== undefined) {
          target.onMouseDown(event);
        } else {
          $__2.onMouseDown(event);
        }
        $__2.hideContextMenu();
        event.preventDefault();
      }).on('mousemove', function(event) {
        if (target !== undefined) {
          target.onMouseMove(event);
        } else {
          $__2.onMouseMove(event);
        }
        event.preventDefault();
      }).on('mouseup', function(event) {
        if (target !== undefined) {
          target.onMouseUp(event);
        } else {
          $__2.onMouseUp(event);
        }
        target = undefined;
        event.preventDefault();
      }).on("contextmenu", function(event) {
        $__2.displayContextMenu(event.pageX, event.pageY, $__2.getRealJQueryTarget(event.target));
        event.preventDefault();
      });
      Fn.addMouseScrollEventListener(canvas, function(event) {
        if (event.ctrlKey) {
          switch (event.delta) {
            case 1:
              $__2.zoom += 0.1;
              break;
            case -1:
              $__2.zoom -= 0.1;
              break;
          }
        }
        event.preventDefault();
      });
    }
    return ($traceurRuntime.createClass)(Svg, {
      get width() {
        return this.$svg.width();
      },
      get height() {
        return this.$svg.height();
      },
      onMouseDown: function(event) {
        if (event.ctrlKey) {
          this.moveCanvas = {
            left: event.pageX,
            top: event.pageY
          };
        }
      },
      onMouseMove: function(event) {
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
      },
      onMouseUp: function(event) {
        if (this.moveCanvas) {
          this.moveCanvas = undefined;
        }
      },
      applyViewbox: function() {
        this.background.addAttr({
          x: this.viewbox.left,
          y: this.viewbox.top,
          width: this.viewbox.width,
          height: this.viewbox.height
        });
        this.$svg.attr('viewBox', this.viewbox.str);
      },
      get zoom() {
        return this.viewbox.zoom;
      },
      set zoom(value) {
        this.viewbox.zoom = value;
        this.applyViewbox();
      },
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
          this.simulation = new Simulation(this);
          this.simulation.notifyChange(startingConnector.id, state);
          this.simulation.run();
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
        var $__6 = true;
        var $__7 = false;
        var $__8 = undefined;
        try {
          for (var $__4 = void 0,
              $__3 = (this.wires)[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
            var wire = $__4.value;
            {
              if (wire.svgObj.id === wireId) {
                return wire;
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
          var $__6 = true;
          var $__7 = false;
          var $__8 = undefined;
          try {
            for (var $__4 = void 0,
                $__3 = (this.boxes)[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
              var box = $__4.value;
              {
                var connector$__13 = box.getConnectorById(connectorId);
                if (connector$__13) {
                  return connector$__13;
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
        }
        return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiIsInNyYy9lczYvc3RydWN0dXJlc0FuZENsYXNzZXMuanMiLCJzcmMvZXM2L3N2Z09iamVjdHMuanMiLCJzcmMvZXM2L2xvZ2ljLmpzIiwic3JjL2VzNi9lZGl0b3JFbGVtZW50cy5qcyIsInNyYy9lczYvY29udGV4dE1lbnUuanMiLCJzcmMvZXM2L2ltcG9ydEV4cG9ydC5qcyIsInNyYy9lczYvZmxvYXRpbmdNZW51LmpzIiwic3JjL2VzNi9zaW11bGF0aW9uLmpzIiwic3JjL2VzNi9zbWFsbEZ1bmN0aW9ucy5qcyIsInNyYy9lczYvY2FudmFzLmpzIiwic3JjL2VzNi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQUFBSSxJQUFBLENBQUEsWUFBVyxvQ0FBb0IsQ0FBQztBQ0dwQyxBQUFJLElBQUEsQ0FBQSxrQkFBaUIsRUFBSSxLQUFHLENBQUM7SUFFaEIsR0FBQyxFQUxkLENBQUEsU0FBUyxBQUFEO0FBS0QsV0FBTSxHQUFDLENBQ0UsQUFBRCxDQUFHO0FBQ1YsU0FBRyxDQUFDLGtCQUFpQixDQUFFO0FBQ25CLHlCQUFpQixFQUFJLEtBQUcsQ0FBQztNQUM3QjtBQUFBLEFBRUEsU0FBRyxPQUFPLEVBQUksS0FBRyxDQUFDO0FBQ2xCLFNBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBQztBQUVmLFdBQU8sbUJBQWlCLENBQUM7SUFDN0I7QUFvQkosQUFqQ1UsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBZWhDLFFBQUksT0FBSyxFQUFJO0FBQ1QsQUFBSSxVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBSTVCLGNBQU0sQ0FBQSxBQUFDLENBQUMsR0FBRSxFQUFFLE9BQUssQ0FBQyxPQUFPLENBQUc7QUFDeEIsYUFBRyxPQUFPLEVBQUUsQ0FBQztBQUNiLGVBQUssRUFBSSxDQUFBLElBQUcsU0FBUyxBQUFDLEVBQUMsQ0FBQztRQUM1QjtBQUFBLEFBRUEsV0FBRyxPQUFPLEVBQUUsQ0FBQztB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RyxDQUFHLENBQUEsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDL0MsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDcEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FFeEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDbEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDMUQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDOUQsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sWUFBWSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FDOUUsQ0FBQyxDQUFDO01BQ047QUFDTyxTQUFHLENBQVYsVUFBWSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDZCxhQUFPLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxLQUFJLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO01BQ3JDO0FBQ08sUUFBRSxDQUFULFVBQVcsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFHO0FBQ2IsYUFBTyxDQUFBLEtBQUksd0JBQXdCLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQ3ZDLENBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sR0FBRyxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQ3pELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWpFLEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2xELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzFELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzlELEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBQzlFLENBQUMsQ0FBQztNQUNOO0FBRUEsUUFBVyxNQUFJLEVBQUk7QUFDZixhQUFPO0FBQ0gsZ0JBQU0sQ0FBRyxFQUFBO0FBQ1QsV0FBQyxDQUFHLEVBQUE7QUFDSixZQUFFLENBQUcsRUFBQTtBQUNMLG9CQUFVLENBQUcsRUFBQTtBQUFBLFFBQ2pCLENBQUE7TUFDSjtBQUVPLDRCQUFzQixDQUE3QixVQUErQixDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxLQUFJLENBQUc7QUFDeEMsbUJBQWEsRUFBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsS0FBSSxPQUFPLENBQUksQ0FBQSxDQUFBLEVBQUUsQ0FBRztBQUNyQyxhQUFHLENBQUMsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxJQUFJLEVBQUEsQ0FBQSxFQUFLLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxJQUFJLEVBQUEsQ0FBQyxHQUFLLEVBQUMsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxJQUFJLEVBQUEsQ0FBQSxFQUFLLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxJQUFJLEVBQUEsQ0FBQyxDQUFHO0FBQzdFLGlCQUFPLENBQUEsS0FBSSxDQUFFLENBQUEsQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFDO1VBQ3RCO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxLQXZGd0YsQ0FBQztFQUNyRixBQUFDLEVBQUM7O0FBSFYsU0FBQSxhQUF3QjtBQUFFLGtCQUF3QjtJQUFFLEVBQTdCOzs7O0FBQXZCLEFBQUksSUFBQSxDQUFBLFlBQVcsOEJBQW9CLENBQUM7SUNBeEIsT0FBSztJQUNMLFdBQVM7SUFDZCxNQUFJO0FBR1gsQUFBTSxJQUFBLENBQUEsWUFBVyxFQUFJO0FBQ2pCLEtBQUMsQ0FBRyxVQUFRO0FBQ1osTUFBRSxDQUFHLFdBQVM7QUFDZCxVQUFNLENBQUcsZUFBYTtBQUN0QixjQUFVLENBQUcsbUJBQWlCO0FBQUEsRUFDbEMsQ0FBQztJQUdLLFNBQU8sRUFiYixDQUFBLFNBQVMsQUFBRDtBQWFSLFdBQU0sU0FBTyxDQUNHLE1BQUssQ0FBRztBQUNoQixTQUFHLE1BQUssSUFBSSxVQUFRLENBQUc7QUFDbkIsV0FBRyxLQUFLLEVBQUksQ0FBQSxNQUFLLFFBQVEsQUFBQyxDQUFDLGdCQUFlLENBQUcsS0FBRyxDQUFDLENBQUM7QUFDbEQsV0FBRyxLQUFLLEVBQUksQ0FBQSxNQUFLLFFBQVEsQUFBQyxDQUFDLGdCQUFlLENBQUcsS0FBRyxDQUFDLE1BQU0sQUFBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDO01BQ2pFO0FBQUEsSUFDSjtBQWFKLEFBOUJVLFNBQU8sQ0FBQSw2QkFBa0IsQUFBQztBQW1CaEMsWUFBTSxDQUFOLFVBQVEsSUFBRyxDQUFHO0FBQ1YsV0FBRyxLQUFLLEVBQUksS0FBRyxDQUFDO01BQ3BCO0FBRUEsaUJBQVcsQ0FBWCxVQUFhLElBQUcsQ0FBRztBQUNmLFdBQUcsS0FBSyxFQUFJLEtBQUcsQ0FBQztNQUNwQjtBQUVBLFFBQUUsQ0FBRixVQUFJLEFBQUQsQ0FBRztBQUNGLGFBQU8sQ0FBQSxJQUFHLEtBQUssRUFBSSxJQUFFLENBQUEsQ0FBSSxDQUFBLElBQUcsS0FBSyxLQUFLLEFBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQSxDQUFJLElBQUUsQ0FBQztNQUN0RDtBQUFBLFNBN0J3RixDQUFDO0VBQ3JGLEFBQUMsRUFBQztJQWdDRyxVQUFRLEVBbkNyQixDQUFBLFNBQVMsQUFBRDtBQW1DRCxXQUFNLFVBQVEsQ0FDTCxNQUFLLENBQUc7QUFDaEIsU0FBRyxNQUFNLEVBQUksR0FBQyxDQUFDO0FBRWYsU0FBRyxNQUFLLElBQUksVUFBUSxDQUFHO0FBQ25CLEFBQUksVUFBQSxDQUFBLFVBQVMsRUFBSSxDQUFBLE1BQUssTUFBTSxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7QUFFbEMsbUJBQWEsRUFBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsVUFBUyxPQUFPLENBQUksQ0FBQSxDQUFBLEVBQUUsQ0FBRztBQUMxQyxhQUFHLFVBQVMsQ0FBRSxDQUFBLENBQUMsQ0FBRztBQUNkLGVBQUcsTUFBTSxLQUFLLEFBQUMsQ0FBQyxHQUFJLFNBQU8sQUFBQyxDQUFDLFVBQVMsQ0FBRSxDQUFBLENBQUMsRUFBSSxJQUFFLENBQUMsQ0FBQyxDQUFDO1VBQ3REO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBZ0dKLEFBOUlVLFNBQU8sQ0FBQSw2QkFBa0IsQUFBQztBQWlEaEMsYUFBTyxDQUFQLFVBQVMsSUFBRyxDQUFHO0FBQ1gsbUJBQVksRUFBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxNQUFNLE9BQU8sQ0FBRyxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQ3hDLGFBQUcsSUFBRyxJQUFNLENBQUEsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBRztBQUM1QixpQkFBTyxFQUFBLENBQUM7VUFDWjtBQUFBLFFBQ0o7QUFBQSxBQUVBLGFBQU8sRUFBQyxDQUFBLENBQUM7TUFDYjtBQUVBLGlCQUFXLENBQVgsVUFBYSxBQUFELENBQUc7QUFDWCxBQUFJLFVBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxJQUFHLGFBQWEsQUFBQyxDQUFDLElBQUcsU0FBUyxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUMsQ0FBQztBQUV4RCxhQUFPO0FBQ0gsVUFBQSxDQUFHLENBQUEsSUFBRyxDQUFFLENBQUEsQ0FBQztBQUNULFVBQUEsQ0FBRyxDQUFBLElBQUcsQ0FBRSxDQUFBLENBQUM7QUFBQSxRQUNiLENBQUE7TUFDSjtBQUVBLGNBQVEsQ0FBUixVQUFVLEFBQUQsQ0FBRztBQUNSLEFBQUksVUFBQSxDQUFBLElBQUcsRUFBSSxDQUFBLElBQUcsYUFBYSxBQUFDLENBQUMsSUFBRyxTQUFTLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQyxDQUFDO0FBRXJELGFBQU87QUFDSCxZQUFFLENBQUcsQ0FBQSxJQUFHLENBQUUsQ0FBQSxDQUFDO0FBQ1gsZ0JBQU0sQ0FBRyxDQUFBLElBQUcsQ0FBRSxDQUFBLENBQUM7QUFDZixnQkFBTSxDQUFHLENBQUEsSUFBRyxDQUFFLENBQUEsQ0FBQztBQUFBLFFBQ25CLENBQUE7TUFDSjtBQUdBLGlCQUFXLENBQVgsVUFBYSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDZixXQUFHLGFBQWEsQUFBQyxDQUFDLFdBQVUsQ0FBRyxFQUFDLENBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO01BQzFDO0FBR0EsY0FBUSxDQUFSLFVBQVUsR0FBRSxDQUFHLENBQUEsT0FBTSxDQUFHLENBQUEsT0FBTSxDQUFHO0FBQzdCLFdBQUcsYUFBYSxBQUFDLENBQUMsUUFBTyxDQUFHLEVBQUMsR0FBRSxDQUFHLFFBQU0sQ0FBRyxRQUFNLENBQUMsQ0FBQyxDQUFDO01BQ3hEO0FBR0EsZ0JBQVUsQ0FBVixVQUFZLE9BQU0sQ0FBRyxDQUFBLE9BQU0sQ0FBRztBQUMxQixXQUFHLElBQUcsU0FBUyxBQUFDLENBQUMsUUFBTyxDQUFDLENBQUEsR0FBSSxFQUFDLENBQUEsQ0FBRztBQUM3QixhQUFHLFVBQVUsQUFBQyxDQUFDLEVBQUMsQ0FBRyxRQUFNLENBQUcsUUFBTSxDQUFDLENBQUM7UUFDeEMsS0FBTztBQUNILEFBQUksWUFBQSxDQUFBLFdBQVUsRUFBSSxDQUFBLENBQUMsUUFBTyxBQUFDLENBQUMsSUFBRyxVQUFVLEFBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQSxDQUFJLEdBQUMsQ0FBQyxFQUFJLElBQUUsQ0FBQztBQUU3RCxhQUFHLFdBQVUsSUFBSSxJQUFFLENBQUc7QUFHbEIsQUFBSSxjQUFBLENBQUEsQ0FBQSxFQUFJLFFBQU0sQ0FBQztBQUNmLGtCQUFNLEVBQUksUUFBTSxDQUFDO0FBQ2pCLGtCQUFNLEVBQUksRUFBQSxDQUFDO1VBQ2Y7QUFBQSxBQUVBLGFBQUcsVUFBVSxBQUFDLENBQ1YsV0FBVSxDQUNWLFFBQU0sQ0FDTixRQUFNLENBQ1YsQ0FBQztRQUNMO0FBQUEsTUFDSjtBQUdBLFFBQUUsQ0FBRixVQUFJLEFBQUQsQ0FBRztBQUNGLEFBQUksVUFBQSxDQUFBLE1BQUssRUFBSSxHQUFDLENBQUM7QUFDZixtQkFBWSxFQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLE1BQU0sT0FBTyxDQUFJLENBQUEsQ0FBQSxFQUFFLENBQUc7QUFDekMsYUFBRyxDQUFBLElBQUksRUFBQSxDQUFHO0FBQ04saUJBQUssR0FBSyxJQUFFLENBQUM7VUFDakI7QUFBQSxBQUNBLGVBQUssR0FBSyxDQUFBLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxJQUFJLEFBQUMsRUFBQyxDQUFDO1FBQ2pDO0FBQUEsQUFDQSxhQUFPLE9BQUssQ0FBQztNQUNqQjtBQUVBLGlCQUFXLENBQVgsVUFBYSxLQUFJLENBQUc7QUFDaEIsYUFBTyxDQUFBLElBQUcsTUFBTSxDQUFFLEtBQUksQ0FBQyxLQUFLLENBQUM7TUFDakM7QUFFQSxpQkFBVyxDQUFYLFVBQWEsSUFBRyxDQUFHLENBQUEsSUFBRyxDQUFHO0FBRXJCLEFBQUksVUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLElBQUcsU0FBUyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFJL0IsV0FBRyxLQUFJLElBQUksRUFBQyxDQUFBLENBQUc7QUFDWCxjQUFJLEVBQUksQ0FBQSxJQUFHLE1BQU0sT0FBTyxDQUFDO0FBQ3pCLGFBQUcsTUFBTSxDQUFFLEtBQUksQ0FBQyxFQUFJLElBQUksU0FBTyxBQUFDLEVBQUMsQ0FBQztBQUNsQyxhQUFHLE1BQU0sQ0FBRSxLQUFJLENBQUMsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7UUFDbkM7QUFBQSxBQUdBLFdBQUcsTUFBTSxDQUFFLEtBQUksQ0FBQyxhQUFhLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztNQUN4QztBQUFBLFNBN0l3RixDQUFDO0VBQ3JGLEFBQUMsRUFBQztJQWdKSixlQUFhLEVBbkpuQixDQUFBLFNBQVMsQUFBRDtBQW1KUixXQUFNLGVBQWEsQ0FDSCxTQUFRLENBQUc7QUFDbkIsU0FBRyxDQUFDLFNBQVEsQ0FBRztBQUNYLGNBQU0sTUFBTSxBQUFDLENBQUMsMENBQXlDLENBQUMsQ0FBQztNQUM3RDtBQUFBLEFBQ0EsU0FBRyxVQUFVLEVBQUksVUFBUSxDQUFDO0FBRzFCLFNBQUcsT0FBTyxFQUFJLFVBQVEsQ0FBQztJQUMzQjtBQXNCSixBQWhMVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUE0SmhDLFFBQUksR0FBQyxFQUFJO0FBQ0wsYUFBTyxDQUFBLElBQUcsT0FBTyxHQUFHLENBQUM7TUFDekI7QUFFQSxnQkFBVSxDQUFWLFVBQVksQUFBRCxDQUFHLEdBRWQ7QUFFQSxjQUFRLENBQVIsVUFBVSxBQUFELENBQUcsR0FFWjtBQUVBLGdCQUFVLENBQVYsVUFBWSxBQUFELENBQUcsR0FFZDtBQUVBLFFBQUksV0FBUyxFQUFJO0FBQ2IsY0FBTSxNQUFNLEFBQUMsQ0FBQyxxREFBb0QsQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUMxRSxhQUFPLFVBQVEsQ0FBQztNQUNwQjtBQUFBLFNBL0t3RixDQUFDO0VBQ3JGLEFBQUMsRUFBQztJQW1MSixVQUFRLEVBdExkLENBQUEsU0FBUyxRQUFPO0FBc0xoQixXQUFNLFVBQVEsQ0FDRSxTQUFRLENBQUcsQ0FBQSxRQUFPLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxHQUFFO0FBQ3JDLEFBeExSLHFDQUFpQixXQUFrQixLQUFkLEFBd0xiLE1BQU0sVUFBUSxDQUFDLEFBeExpQixDQXdMaEI7QUFFaEIsU0FBRyxTQUFTLEVBQUksU0FBTyxDQUFDO0FBQ3hCLFNBQUcsY0FBYyxFQUFJLFNBQU8sQ0FBQztBQUM3QixTQUFHLGdCQUFnQixFQUFJLENBQUEsSUFBRyxjQUFjLEVBQUksRUFBQSxDQUFDO0FBRTdDLFNBQUcsT0FBTyxFQUFJLElBQUksQ0FBQSxNQUFLLFVBQVUsQUFBQyxDQUM5QixJQUFHLEVBQUksQ0FBQSxJQUFHLFNBQVMsQ0FBQSxDQUFJLENBQUEsSUFBRyxnQkFBZ0IsQ0FDMUMsQ0FBQSxHQUFFLEVBQUksQ0FBQSxJQUFHLFNBQVMsQ0FBQSxDQUFJLENBQUEsSUFBRyxnQkFBZ0IsQ0FDekMsQ0FBQSxJQUFHLGNBQWMsQ0FDakIsQ0FBQSxJQUFHLGNBQWMsQ0FDakIsT0FBSyxDQUNMLFFBQU0sQ0FDVixDQUFDO0FBRUQsU0FBRyxPQUFPLElBQUksU0FBUyxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUM7QUFFckMsU0FBRyxVQUFVLEVBQUksTUFBSSxDQUFDO0FBR3RCLFNBQUcsaUJBQWlCLEVBQUksTUFBSSxDQUFDO0FBRTdCLFNBQUcsVUFBVSxFQUFJLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBQztBQUNwQyxTQUFHLE9BQU8sU0FBUyxBQUFDLENBQUMsWUFBVyxRQUFRLENBQUMsQ0FBQztBQUUxQyxTQUFHLFFBQVEsRUFBSSxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUM7SUEyRGhDO0FBMVFVLFNBQU8sQ0FBQSw2QkFBa0IsQUFBQztBQWtOaEMsUUFBSSxrQkFBZ0IsRUFBSTtBQUNwQixhQUFPLEVBQUMsSUFBRyxpQkFBaUIsQ0FBQztNQUNqQztBQVNBLGNBQVEsQ0FBUixVQUFVLE1BQUssQ0FBRztBQUNkLFdBQUcsUUFBUSxJQUFJLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztNQUM1QjtBQUVBLGlCQUFXLENBQVgsVUFBYSxNQUFLLENBQUc7QUFDakIsV0FBRyxRQUFRLE9BQU8sQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO01BQy9CO0FBR0EsMEJBQW9CLENBQXBCLFVBQXNCLE1BQUssQ0FBRztBQUMxQixXQUFHLGFBQWEsQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO01BQzdCO0FBRUEsYUFBTyxDQUFQLFVBQVMsS0FBSSxDQUFHLENBQUEsYUFBWSxDQUFHO0FBQzNCLFdBQUcsT0FBTyxjQUFjLEFBQUMsQ0FBQyxZQUFXLEdBQUcsQ0FBRyxDQUFBLFlBQVcsSUFBSSxDQUFHLENBQUEsWUFBVyxRQUFRLENBQUcsQ0FBQSxZQUFXLFlBQVksQ0FBQyxDQUFDO0FBRTVHLGVBQVEsS0FBSTtBQUNSLGFBQUssQ0FBQSxLQUFJLE1BQU0sUUFBUTtBQUNuQixlQUFHLE9BQU8sU0FBUyxBQUFDLENBQUMsWUFBVyxRQUFRLENBQUMsQ0FBQztBQUMxQyxpQkFBSztBQUFBLEFBQ1QsYUFBSyxDQUFBLEtBQUksTUFBTSxHQUFHO0FBQ2QsZUFBRyxPQUFPLFNBQVMsQUFBQyxDQUFDLFlBQVcsR0FBRyxDQUFDLENBQUM7QUFDckMsaUJBQUs7QUFBQSxBQUNULGFBQUssQ0FBQSxLQUFJLE1BQU0sSUFBSTtBQUNmLGVBQUcsT0FBTyxTQUFTLEFBQUMsQ0FBQyxZQUFXLElBQUksQ0FBQyxDQUFDO0FBQ3RDLGlCQUFLO0FBQUEsQUFDVCxhQUFLLENBQUEsS0FBSSxNQUFNLFlBQVk7QUFDdkIsZUFBRyxPQUFPLFNBQVMsQUFBQyxDQUFDLFlBQVcsWUFBWSxDQUFDLENBQUM7QUFDOUMsaUJBQUs7QUFBQSxRQUNiO0FBRUEsV0FBRyxVQUFVLEVBQUksTUFBSSxDQUFDO01BQzFCO0FBRUEsUUFBSSxNQUFJLEVBQUk7QUFDUixhQUFPLENBQUEsSUFBRyxVQUFVLENBQUM7TUFDekI7QUFFQSxRQUFFLENBQUYsVUFBSSxBQUFELENBQUc7QUFDRixhQUFPLENBQUEsSUFBRyxPQUFPLENBQUM7TUFDdEI7QUFFQSxjQUFRLENBQVIsVUFBVSxBQUFELENBQUc7QUFDUixXQUFHLFVBQVUsbUJBQW1CLEFBQUMsQ0FBQyxJQUFHLE9BQU8sR0FBRyxDQUFDLENBQUM7TUFDckQ7QUFBQSxPQW5EQSxHQUFXLEtBQUcsRUFBSTtBQUNkLGFBQU87QUFDSCx1QkFBYSxDQUFHLEVBQUE7QUFDaEIsd0JBQWMsQ0FBRyxFQUFBO0FBQUEsUUFDckIsQ0FBQTtNQUNKLEVBMU5pRCxTQUFPLENBQUMsQ0FBQztFQUN0RCxBQUFDLENBa0xlLGNBQWEsQ0FsTFY7SUEwUWQsZUFBYSxFQTlRMUIsQ0FBQSxTQUFTLFFBQU87QUE4UVQsV0FBTSxlQUFhLENBQ1YsU0FBUSxDQUFHLENBQUEsUUFBTyxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRTtBQUNyQyxBQWhSUixxQ0FBaUIsZ0JBQWtCLEtBQWQsQUFnUmIsTUFBTSxVQUFRLENBQUcsU0FBTyxDQUFHLEtBQUcsQ0FBRyxJQUFFLENBQUMsQUFoUkosQ0FnUks7QUFHckMsU0FBRyxLQUFLLEVBQUksQ0FBQSxTQUFRLEtBQUssZUFBZSxDQUFDO0FBQ3pDLFNBQUcsaUJBQWlCLEVBQUksS0FBRyxDQUFDO0lBb0JwQztBQXRTVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUFxUmhDLGFBQU8sQ0FBUCxVQUFTLEtBQUk7QUFHVCxBQTFSUiwrQkFBaUIsQ0FBQyxJQUFHLHVDQUF1QyxLQUF2QyxBQTBSQyxNQUFDLE1BQUksQ0FBQyxBQTFSWSxDQTBSWDtBQUVyQixBQUFJLFVBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxJQUFHLFVBQVUsb0JBQW9CLEFBQUMsQ0FBQyxJQUFHLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDN0QsV0FBRyxhQUFhLEFBQUMsRUFBQyxDQUFDO01BQ3ZCO0FBRUEsMEJBQW9CLENBQXBCLFVBQXNCLE1BQUs7QUFDdkIsQUFqU1IsK0JBQWlCLENBQUMsSUFBRyxvREFBdUMsS0FBdkMsQUFpU2MsTUFBQyxPQUFLLENBQUMsQUFqU0YsQ0FpU0c7QUFDbkMsV0FBRyxTQUFTLEFBQUMsQ0FBQyxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQUM7TUFDdEM7QUFFQSxRQUFJLE1BQUk7QUFDSixhQXRTUix5QkFBaUIsQ0FBQyxJQUFHLG9DQUF1QyxDQXNTbEM7TUFDdEI7U0FwU2lELFNBQU8sQ0FBQyxDQUFDO0VBQ3RELEFBQUMsQ0EwUTJCLFNBQVEsQ0ExUWpCO0lBc1NkLGdCQUFjLEVBMVMzQixDQUFBLFNBQVMsUUFBTztBQTBTVCxXQUFNLGdCQUFjLENBQ1gsU0FBUSxDQUFHLENBQUEsUUFBTyxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsR0FBRTtBQUNyQyxBQTVTUixxQ0FBaUIsaUJBQWtCLEtBQWQsQUE0U2IsTUFBTSxVQUFRLENBQUcsU0FBTyxDQUFHLEtBQUcsQ0FBRyxJQUFFLENBQUMsQUE1U0osQ0E0U0s7QUFHckMsU0FBRyxTQUFTLEVBQUksS0FBRyxDQUFDO0FBRXBCLFNBQUcsS0FBSyxFQUFJLENBQUEsU0FBUSxLQUFLLGdCQUFnQixDQUFDO0lBY2xEO0FBN1RVLFNBQU8sQ0FBQSw2QkFBa0IsQUFBQztBQWtUaEMsYUFBTyxDQUFQLFVBQVMsS0FBSTtBQUNULEFBclRSLCtCQUFpQixDQUFDLElBQUcsd0NBQXVDLEtBQXZDLEFBcVRDLE1BQUMsTUFBSSxDQUFDLEFBclRZLENBcVRYO0FBcFRyQixBQUFJLFVBQUEsT0FBb0IsS0FBRyxDQUFDO0FBQzVCLEFBQUksVUFBQSxRQUFvQixNQUFJLENBQUM7QUFDN0IsQUFBSSxVQUFBLFFBQW9CLFVBQVEsQ0FBQztBQUNqQyxVQUFJO0FBSEosY0FBUyxHQUFBLE9BRGpCLEtBQUssRUFBQSxBQUM0QjtBQUNoQixtQkFBb0IsQ0FBQSxDQXFUUixJQUFHLFFBQVEsQ0FyVGUsQ0FBRSxNQUFLLFNBQVMsQ0FBQyxBQUFDLEVBQUMsQ0FDN0QsRUFBQyxDQUFDLE1BQW9CLENBQUEsQ0FBQyxNQUFvQixDQUFBLFNBQXFCLEFBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUN6RSxPQUFvQixLQUFHLENBQUc7Y0FtVHBCLE9BQUs7QUFBbUI7QUFDL0IsaUJBQUcsVUFBVSxZQUFZLEFBQUMsQ0FBQyxNQUFLLENBQUMsU0FBUyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDdEQ7VUFsVEE7QUFBQSxRQURBLENBQUUsYUFBMEI7QUFDMUIsZ0JBQW9CLEtBQUcsQ0FBQztBQUN4QixzQkFBb0MsQ0FBQztRQUN2QyxDQUFFLE9BQVE7QUFDUixZQUFJO0FBQ0YsZUFBSSxLQUFpQixHQUFLLENBQUEsV0FBdUIsR0FBSyxLQUFHLENBQUc7QUFDMUQsd0JBQXdCLEFBQUMsRUFBQyxDQUFDO1lBQzdCO0FBQUEsVUFDRixDQUFFLE9BQVE7QUFDUixxQkFBd0I7QUFDdEIseUJBQXdCO1lBQzFCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQXVTSjtBQUVBLFFBQUksTUFBSTtBQUNKLGFBN1RSLHlCQUFpQixDQUFDLElBQUcscUNBQXVDLENBNlRsQztNQUN0QjtTQTNUaUQsU0FBTyxDQUFDLENBQUM7RUFDdEQsQUFBQyxDQXNTNEIsU0FBUSxDQXRTbEI7SUE4VHJCLElBQUUsRUFsVVIsQ0FBQSxTQUFTLFFBQU87QUFrVWhCLFdBQU0sSUFBRSxDQUNRLFNBQVEsQ0FBRyxDQUFBLElBQUcsQ0FBRyxDQUFBLFFBQU8sQ0FBRyxDQUFBLFNBQVEsQ0FBRyxDQUFBLFVBQVM7QUFDdkQsQUFwVVIscUNBQWlCLEtBQWtCLEtBQWQsQUFvVWIsTUFBTSxVQUFRLENBQUMsQUFwVWlCLENBb1VoQjtBQUVoQixTQUFHLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDaEIsU0FBRyxTQUFTLEVBQUksU0FBTyxDQUFDO0FBQ3hCLFNBQUcsU0FBUyxFQUFJLENBQUEsSUFBRyxVQUFVLFNBQVMsQ0FBQztBQUV2QyxTQUFHLElBQUksRUFBSSxDQUFBLE1BQUssRUFBSSxDQUFBLElBQUcsU0FBUyxDQUFBLENBQUksSUFBRSxDQUFBLENBQUksQ0FBQSxJQUFHLEtBQUssQ0FBQSxDQUFJLE9BQUssQ0FBQztBQUU1RCxTQUFHLFdBQVcsRUFBSSxHQUFDLENBQUM7QUFFcEIsU0FBRyxPQUFPLEVBQUksSUFBSSxDQUFBLE1BQUssTUFBTSxBQUFDLEVBQUMsQ0FBQztBQUVoQyxTQUFHLE1BQU0sRUFBSSxDQUFBLFNBQVEsRUFBSSxDQUFBLElBQUcsU0FBUyxDQUFDO0FBQ3RDLFNBQUcsT0FBTyxFQUFJLENBQUEsVUFBUyxFQUFJLENBQUEsSUFBRyxTQUFTLENBQUM7QUFFeEMsU0FBRyxVQUFVLEVBQUksVUFBUSxDQUFDO0FBQzFCLFNBQUcsV0FBVyxFQUFJLFdBQVMsQ0FBQztBQUc1QixBQUFJLFFBQUEsQ0FBQSxTQUFRLEVBQUksSUFBSSxDQUFBLE1BQUssVUFBVSxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxDQUFBLElBQUcsTUFBTSxDQUFHLENBQUEsSUFBRyxPQUFPLENBQUcsT0FBSyxDQUFHLE9BQUssQ0FBQyxDQUFDO0FBQ25GLGNBQVEsSUFBSSxTQUFTLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUM5QixTQUFHLE9BQU8sU0FBUyxBQUFDLENBQUMsU0FBUSxDQUFDLENBQUM7QUFFL0IsU0FBRyxNQUFNLEVBQUksSUFBSSxDQUFBLE1BQUssU0FBUyxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxDQUFBLElBQUcsTUFBTSxDQUFHLENBQUEsSUFBRyxPQUFPLENBQUcsQ0FBQSxJQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3pFLFNBQUcsT0FBTyxTQUFTLEFBQUMsQ0FBQyxJQUFHLE1BQU0sQ0FBQyxDQUFDO0FBR2hDLFNBQUcsT0FBTyxVQUFVLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUMzQixTQUFHLE9BQU8sVUFBVSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFHM0IsU0FBRyxPQUFPLFFBQVEsQUFBQyxDQUFDLENBQUMsTUFBSyxDQUFHLFNBQU8sQ0FBQyxDQUFDLENBQUM7QUFFdkMsU0FBRyxPQUFPLElBQUksU0FBUyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7QUFDL0IsU0FBRyxPQUFPLElBQUksU0FBUyxBQUFDLENBQUMsUUFBTyxDQUFDLENBQUM7QUFFbEMsU0FBRyxtQkFBbUIsQUFBQyxFQUFDLENBQUM7SUFvUmpDO0FBMW5CVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUF5V2hDLFFBQUksZ0JBQWM7QUFDZCxhQUFPLENBQUEsSUFBRyxXQUFXLE9BQU8sQUFBQyxDQUFDLFNBQUEsSUFBRztlQUFLLENBQUEsSUFBRyxpQkFBaUI7UUFBQSxDQUFDLENBQUE7TUFDL0Q7QUFFQSxRQUFJLGlCQUFlO0FBQ2YsYUFBTyxDQUFBLElBQUcsV0FBVyxPQUFPLEFBQUMsQ0FBQyxTQUFBLElBQUc7ZUFBSyxDQUFBLElBQUcsa0JBQWtCO1FBQUEsQ0FBQyxDQUFBO01BQ2hFO0FBRUEsUUFBSSxXQUFTO0FBQ1QsQUFBSSxVQUFBLENBQUEsV0FBVSxFQUFJLEdBQUMsQ0FBQztBQUdwQixBQUFJLFVBQUEsQ0FBQSxPQUFNLEVBQUksRUFBQSxDQUFBO0FBdFhkLEFBQUksVUFBQSxRQUFvQixLQUFHLENBQUM7QUFDNUIsQUFBSSxVQUFBLFFBQW9CLE1BQUksQ0FBQztBQUM3QixBQUFJLFVBQUEsUUFBb0IsVUFBUSxDQUFDO0FBQ2pDLFVBQUk7QUFISixjQUFTLEdBQUEsUUFEakIsS0FBSyxFQUFBLEFBQzRCO0FBQ2hCLG9CQUFvQixDQUFBLENBc1hWLElBQUcsV0FBVyxDQXRYYyxDQUFFLE1BQUssU0FBUyxDQUFDLEFBQUMsRUFBQyxDQUM3RCxFQUFDLENBQUMsT0FBb0IsQ0FBQSxDQUFDLE9BQW9CLENBQUEsVUFBcUIsQUFBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQ3pFLFFBQW9CLEtBQUcsQ0FBRztjQW9YcEIsS0FBRztBQUFzQjtBQXZYcEMsQUFBSSxnQkFBQSxPQUFvQixLQUFHLENBQUM7QUFDNUIsQUFBSSxnQkFBQSxRQUFvQixNQUFJLENBQUM7QUFDN0IsQUFBSSxnQkFBQSxRQUFvQixVQUFRLENBQUM7QUFDakMsZ0JBQUk7QUFISixvQkFBUyxHQUFBLE9BRGpCLEtBQUssRUFBQSxBQUM0QjtBQUNoQix5QkFBb0IsQ0FBQSxDQXdYTixJQUFHLFFBQVEsQ0F4WGEsQ0FBRSxNQUFLLFNBQVMsQ0FBQyxBQUFDLEVBQUMsQ0FDN0QsRUFBQyxDQUFDLE1BQW9CLENBQUEsQ0FBQyxNQUFvQixDQUFBLFNBQXFCLEFBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUN6RSxPQUFvQixLQUFHLENBQUc7b0JBc1hoQixLQUFHO0FBQW1CO0FBQzdCLEFBQUksc0JBQUEsQ0FBQSxVQUFTLEVBM1g3QixLQUFLLEVBQUEsQUEyWHdCLENBQUM7QUFDZCx1QkFBRyxDQUFDLElBQUcsVUFBVSxnQkFBZ0IsSUFBSSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUc7QUFFMUMseUJBQUcsVUFBVSxnQkFBZ0IsSUFBSSxBQUFDLENBQUMsSUFBRyxDQUFHLENBQUEsSUFBRyxVQUFVLGFBQWEsQ0FBQyxDQUFDO0FBQ3JFLCtCQUFTLEVBQUksQ0FBQSxJQUFHLFVBQVUsYUFBYSxDQUFDO0FBQ3hDLHlCQUFHLFVBQVUsYUFBYSxFQUFFLENBQUM7b0JBQ2pDLEtBQU87QUFFSCwrQkFBUyxFQUFJLENBQUEsSUFBRyxVQUFVLGdCQUFnQixJQUFJLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztvQkFDekQ7QUFBQSxBQUlBLDhCQUFVLENBQUUsV0FBVSxPQUFPLENBQUMsRUFBSTtBQUM5QiwwQkFBSSxDQUFHLFFBQU07QUFDYix5QkFBRyxDQUFHLENBQUEsSUFBRyxLQUFLO0FBQ2QsMkJBQUssQ0FBRyxXQUFTO0FBQUEsb0JBQ3JCLENBQUM7a0JBQ0w7Z0JBdFlKO0FBQUEsY0FEQSxDQUFFLGFBQTBCO0FBQzFCLHNCQUFvQixLQUFHLENBQUM7QUFDeEIsNEJBQW9DLENBQUM7Y0FDdkMsQ0FBRSxPQUFRO0FBQ1Isa0JBQUk7QUFDRixxQkFBSSxLQUFpQixHQUFLLENBQUEsV0FBdUIsR0FBSyxLQUFHLENBQUc7QUFDMUQsOEJBQXdCLEFBQUMsRUFBQyxDQUFDO2tCQUM3QjtBQUFBLGdCQUNGLENBQUUsT0FBUTtBQUNSLDJCQUF3QjtBQUN0QiwrQkFBd0I7a0JBQzFCO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsQUEyWEksb0JBQU0sRUFBRSxDQUFBO1lBQ1o7VUF4WUE7QUFBQSxRQURBLENBQUUsYUFBMEI7QUFDMUIsZ0JBQW9CLEtBQUcsQ0FBQztBQUN4QixzQkFBb0MsQ0FBQztRQUN2QyxDQUFFLE9BQVE7QUFDUixZQUFJO0FBQ0YsZUFBSSxNQUFpQixHQUFLLENBQUEsWUFBdUIsR0FBSyxLQUFHLENBQUc7QUFDMUQseUJBQXdCLEFBQUMsRUFBQyxDQUFDO1lBQzdCO0FBQUEsVUFDRixDQUFFLE9BQVE7QUFDUixxQkFBd0I7QUFDdEIseUJBQXdCO1lBQzFCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxBQThYQSxhQUFPO0FBQ0gsYUFBRyxDQUFHLENBQUEsSUFBRyxLQUFLO0FBRWQsaUJBQU8sQ0FBRyxDQUFBLElBQUcsU0FBUztBQUN0QixrQkFBUSxDQUFHLENBQUEsSUFBRyxhQUFhLEFBQUMsRUFBQztBQUM3QixvQkFBVSxDQUFHLFlBQVU7QUFBQSxRQUMzQixDQUFDO01BQ0w7QUFFQSx1QkFBaUIsQ0FBakIsVUFBbUIsQUFBZ0Y7VUFBaEYsVUFBUSw2Q0FBSSxFQUFBO1VBQUcsWUFBVSw2Q0FBSSxFQUFBO1VBQUcsYUFBVyw2Q0FBSSxFQUFBO1VBQUcsV0FBUyw2Q0FBSSxFQUFBO0FBeloxRSxZQUFTLEdBQUEsZUFBb0IsR0FBQztBQUFHLG9CQUFvQyxDQUNoRSxRQUFvQixDQUFBLFNBQVEsT0FBTyxDQUFHLFFBQWtCO0FBQzNELHNCQUFrQixTQUFvQyxDQUFDLEVBQUksQ0FBQSxTQUFRLE9BQW1CLENBQUM7QUFBQSxBQXdaN0YsV0FBRyxhQUFhLEVBQUksSUFBSSxJQUFFLEFBQUMsRUFBQyxDQUFDO0FBQzdCLG1CQUFZLFdBQVMsQ0FBSSxDQUFBLENBQUEsR0FBSyxDQUFBLElBQUcsVUFBVSxFQUFJLFlBQVUsQ0FBSSxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQzlELHFCQUFZLFVBQVEsQ0FBSSxDQUFBLENBQUEsR0FBSyxDQUFBLElBQUcsV0FBVyxFQUFJLGFBQVcsQ0FBSSxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQy9ELGVBQUcsYUFBYSxJQUFJLEFBQUMsQ0FBQztBQUNsQixjQUFBLENBQUcsRUFBQTtBQUNILGNBQUEsQ0FBRyxFQUFBO0FBQUEsWUFDUCxDQUFDLENBQUM7VUFDTjtBQUFBLFFBQ0o7QUFBQSxBQWxhSSxVQUFBLE9BQW9CLEtBQUcsQ0FBQztBQUM1QixBQUFJLFVBQUEsUUFBb0IsTUFBSSxDQUFDO0FBQzdCLEFBQUksVUFBQSxRQUFvQixVQUFRLENBQUM7QUFDakMsVUFBSTtBQUhKLGNBQVMsR0FBQSxPQURqQixLQUFLLEVBQUEsQUFDNEI7QUFDaEIsbUJBQW9CLENBQUEsQ0FtYVosWUFBVyxDQW5hbUIsQ0FBRSxNQUFLLFNBQVMsQ0FBQyxBQUFDLEVBQUMsQ0FDN0QsRUFBQyxDQUFDLE1BQW9CLENBQUEsQ0FBQyxNQUFvQixDQUFBLFNBQXFCLEFBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUN6RSxPQUFvQixLQUFHLENBQUc7Y0FpYXRCLEtBQUc7QUFBbUI7QUFDM0IsaUJBQUcsYUFBYSxJQUFJLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztZQUMvQjtVQWhhQTtBQUFBLFFBREEsQ0FBRSxhQUEwQjtBQUMxQixnQkFBb0IsS0FBRyxDQUFDO0FBQ3hCLHNCQUFvQyxDQUFDO1FBQ3ZDLENBQUUsT0FBUTtBQUNSLFlBQUk7QUFDRixlQUFJLEtBQWlCLEdBQUssQ0FBQSxXQUF1QixHQUFLLEtBQUcsQ0FBRztBQUMxRCx3QkFBd0IsQUFBQyxFQUFDLENBQUM7WUFDN0I7QUFBQSxVQUNGLENBQUUsT0FBUTtBQUNSLHFCQUF3QjtBQUN0Qix5QkFBd0I7WUFDMUI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BcVpKO0FBRUEsaUJBQVcsQ0FBWCxVQUFhLEFBQUQsQ0FBRztBQUdYLGNBQU0sS0FBSyxBQUFDLENBQUMsMERBQXlELENBQUMsQ0FBQztNQUM1RTtBQUlBLGdCQUFVLENBQVYsVUFBWSxNQUFLLENBQUc7QUFDaEIsV0FBRyxNQUFLLElBQU0sVUFBUSxDQUFBLEVBQUssQ0FBQSxNQUFLLElBQU0sR0FBQyxDQUFHO0FBQ3RDLGVBQUssRUFBSSxHQUFDLENBQUM7UUFDZixLQUFPO0FBQ0gsZUFBSyxFQUFJLENBQUEsR0FBRSxFQUFJLE9BQUssQ0FBQztRQUN6QjtBQUFBLEFBQ0EsV0FBRyxJQUFJLEVBQUksQ0FBQSxNQUFLLEVBQUksQ0FBQSxJQUFHLFNBQVMsQ0FBQSxDQUFJLElBQUUsQ0FBQSxDQUFJLENBQUEsSUFBRyxLQUFLLENBQUEsQ0FBSSxPQUFLLENBQUEsQ0FBSSxPQUFLLENBQUM7QUFFckUsV0FBRyxNQUFNLFVBQVUsQUFBQyxDQUFDLElBQUcsSUFBSSxDQUFDLENBQUM7TUFDbEM7QUFHQSxRQUFFLENBQUYsVUFBSSxBQUFELENBQUc7QUFDRixhQUFPLENBQUEsSUFBRyxPQUFPLElBQUksQUFBQyxFQUFDLENBQUM7TUFDNUI7QUFFQSxzQkFBZ0IsQ0FBaEIsVUFBa0IsQ0FBQSxDQUFHLENBQUEsQ0FBQTtBQWpjakIsQUFBSSxVQUFBLE9BQW9CLEtBQUcsQ0FBQztBQUM1QixBQUFJLFVBQUEsUUFBb0IsTUFBSSxDQUFDO0FBQzdCLEFBQUksVUFBQSxRQUFvQixVQUFRLENBQUM7QUFDakMsVUFBSTtBQUhKLGNBQVMsR0FBQSxPQURqQixLQUFLLEVBQUEsQUFDNEI7QUFDaEIsbUJBQW9CLENBQUEsQ0FpY2IsSUFBRyxhQUFhLENBamNlLENBQUUsTUFBSyxTQUFTLENBQUMsQUFBQyxFQUFDLENBQzdELEVBQUMsQ0FBQyxNQUFvQixDQUFBLENBQUMsTUFBb0IsQ0FBQSxTQUFxQixBQUFDLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FDekUsT0FBb0IsS0FBRyxDQUFHO2NBK2J2QixLQUFHO0FBQXdCO0FBQy9CLGlCQUFHLElBQUcsRUFBRSxJQUFJLEVBQUEsQ0FBQSxFQUFLLENBQUEsSUFBRyxFQUFFLElBQUksRUFBQSxDQUFHO0FBQ3pCLG1CQUFHLGFBQWEsT0FBTyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDOUIscUJBQUs7Y0FDVDtBQUFBLFlBQ0o7VUFqY0E7QUFBQSxRQURBLENBQUUsYUFBMEI7QUFDMUIsZ0JBQW9CLEtBQUcsQ0FBQztBQUN4QixzQkFBb0MsQ0FBQztRQUN2QyxDQUFFLE9BQVE7QUFDUixZQUFJO0FBQ0YsZUFBSSxLQUFpQixHQUFLLENBQUEsV0FBdUIsR0FBSyxLQUFHLENBQUc7QUFDMUQsd0JBQXdCLEFBQUMsRUFBQyxDQUFDO1lBQzdCO0FBQUEsVUFDRixDQUFFLE9BQVE7QUFDUixxQkFBd0I7QUFDdEIseUJBQXdCO1lBQzFCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQXNiSjtBQUVBLDRCQUFzQixDQUF0QixVQUF3QixBQUFEOztBQUNuQixXQUFHLElBQUcsU0FBUyxJQUFJLFVBQVEsQ0FBQSxFQUFLLENBQUEsSUFBRyxTQUFTLElBQUksRUFBQSxDQUFHO0FBQy9DLGFBQUcsU0FBUyxFQUFJLEVBQUEsQ0FBQztRQUNyQjtBQUFBLEFBQ0EsV0FBRyxTQUFTLEVBQUUsQ0FBQztBQUVmLFdBQUcsSUFBRyxTQUFTLElBQU0sRUFBQSxDQUFBLEVBQUssQ0FBQSxJQUFHLFNBQVMsSUFBTSxFQUFBLENBQUc7QUFDM0MsQUFBSSxZQUFBLENBQUEsZUFBYyxFQUFJLElBQUksSUFBRSxBQUFDLEVBQUMsQ0FBQztBQUMvQixhQUFHLGFBQWEsUUFBUSxBQUFDLENBQUMsU0FBQSxJQUFHLENBQUs7QUFDOUIsMEJBQWMsSUFBSSxBQUFDLENBQUM7QUFDaEIsY0FBQSxDQUFHLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBQyxJQUFHLEVBQUUsRUFBSSxnQkFBYyxDQUFDO0FBQ3BDLGNBQUEsQ0FBRyxDQUFBLElBQUcsRUFBRTtBQUFBLFlBQ1osQ0FBQyxDQUFDO1VBQ04sQ0FBQyxDQUFDO0FBQ0YsYUFBRyxhQUFhLEVBQUksZ0JBQWMsQ0FBQztRQUN2QyxLQUFPLEtBQUcsSUFBRyxTQUFTLElBQU0sRUFBQSxDQUFBLEVBQUssQ0FBQSxJQUFHLFNBQVMsSUFBTSxFQUFBLENBQUc7QUFDbEQsQUFBSSxZQUFBLENBQUEsb0JBQWMsRUFBSSxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUM7QUFDL0IsYUFBRyxhQUFhLFFBQVEsQUFBQyxDQUFDLFNBQUEsSUFBRyxDQUFLO0FBQzlCLG1DQUFrQixBQUFDLENBQUM7QUFDaEIsY0FBQSxDQUFHLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBQyxJQUFHLEVBQUUsRUFBSSxlQUFhLENBQUM7QUFDbkMsY0FBQSxDQUFHLENBQUEsSUFBRyxFQUFFO0FBQUEsWUFDWixDQUFDLENBQUM7VUFDTixDQUFDLENBQUM7QUFDRixhQUFHLGFBQWEsdUJBQWtCLENBQUM7UUFDdkM7QUFBQSxNQUNKO0FBRUEsaUJBQVcsQ0FBWCxVQUFhLElBQUcsQ0FBRyxDQUFBLEdBQUUsQ0FBRyxDQUFBLGFBQVksQ0FBRztBQUNuQyxBQUFJLFVBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxJQUFHLFdBQVcsT0FBTyxDQUFDO0FBQ2xDLFdBQUcsYUFBWSxJQUFJLENBQUEsU0FBUSxLQUFLLGVBQWUsQ0FBRztBQUM5QyxhQUFHLFdBQVcsQ0FBRSxLQUFJLENBQUMsRUFBSSxJQUFJLGVBQWEsQUFBQyxDQUFDLElBQUcsVUFBVSxDQUFHLENBQUEsSUFBRyxTQUFTLENBQUcsS0FBRyxDQUFHLElBQUUsQ0FBQyxDQUFDO1FBQ3pGLEtBQU87QUFDSCxhQUFHLFdBQVcsQ0FBRSxLQUFJLENBQUMsRUFBSSxJQUFJLGdCQUFjLEFBQUMsQ0FBQyxJQUFHLFVBQVUsQ0FBRyxDQUFBLElBQUcsU0FBUyxDQUFHLEtBQUcsQ0FBRyxJQUFFLENBQUMsQ0FBQztRQUMxRjtBQUFBLEFBQ0EsV0FBRyxPQUFPLFNBQVMsQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFFLEtBQUksQ0FBQyxJQUFJLEFBQUMsRUFBQyxDQUFDLENBQUM7QUFFbEQsV0FBRyxrQkFBa0IsQUFBQyxDQUFDLElBQUcsQ0FBRyxJQUFFLENBQUMsQ0FBQztNQUNyQztBQUdBLHFCQUFlLENBQWYsVUFBaUIsV0FBVSxDQUFHO0FBQzFCLG1CQUFZLEVBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsV0FBVyxPQUFPLENBQUksQ0FBQSxDQUFBLEVBQUUsQ0FBRztBQUM5QyxhQUFHLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxHQUFHLElBQUksWUFBVSxDQUFHO0FBQ3BDLGlCQUFPLENBQUEsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLENBQUM7VUFDN0I7QUFBQSxRQUNKO0FBQUEsQUFFQSxhQUFPLFVBQVEsQ0FBQztNQUNwQjtBQUVBLGlCQUFXLENBQVgsVUFBYSxBQUFELENBQUc7QUFDWCxBQUFJLFVBQUEsQ0FBQSxTQUFRLENBQUM7QUFDYixXQUFJLENBQUMsSUFBRyxPQUFPLElBQUksS0FBSyxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUc7QUFFcEMsa0JBQVEsRUFBSSxJQUFJLFVBQVEsQUFBQyxFQUFDLENBQUM7QUFDM0Isa0JBQVEsYUFBYSxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBQyxDQUFDO0FBQzVCLGFBQUcsT0FBTyxRQUFRLEFBQUMsQ0FBQyxDQUFDLFdBQVUsQ0FBRyxDQUFBLFNBQVEsSUFBSSxBQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsS0FBTztBQUVILGtCQUFRLEVBQUksSUFBSSxVQUFRLEFBQUMsQ0FBQyxJQUFHLE9BQU8sSUFBSSxLQUFLLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2hFO0FBQUEsQUFDQSxhQUFPLFVBQVEsQ0FBQztNQUNwQjtBQUVBLGlCQUFXLENBQVgsVUFBYSxTQUFRLENBQUc7QUFDcEIsV0FBRyxPQUFPLFFBQVEsQUFBQyxDQUFDLENBQUMsV0FBVSxDQUFHLENBQUEsU0FBUSxJQUFJLEFBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztNQUN2RDtBQUVBLGdCQUFVLENBQVYsVUFBWSxLQUFJLENBQUc7QUFDZixXQUFHLFVBQVUsRUFBSSxNQUFJLENBQUM7QUFDdEIsV0FBRyxLQUFJLE1BQU0sSUFBTSxFQUFBLENBQUc7QUFDbEIsYUFBRyxVQUFVLEVBQUksS0FBRyxDQUFDO0FBQ3JCLGFBQUcsZ0JBQWdCLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztBQUczQixhQUFHLFVBQVUsZ0JBQWdCLEFBQUMsQ0FBQyxJQUFHLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDbEQ7QUFBQSxNQUNKO0FBRUEsb0JBQWMsQ0FBZCxVQUFnQixLQUFJLENBQUc7QUFDbkIsV0FBRyxXQUFXLEVBQUksTUFBSSxDQUFDO0FBRXZCLEFBQUksVUFBQSxDQUFBLFNBQVEsRUFBSSxDQUFBLElBQUcsYUFBYSxBQUFDLEVBQUMsQ0FBQztBQUduQyxBQUFJLFVBQUEsQ0FBQSxlQUFjLEVBQUksQ0FBQSxTQUFRLGFBQWEsQUFBQyxFQUFDLENBQUM7QUFHOUMsV0FBRyxPQUFPLEVBQUk7QUFDVixVQUFBLENBQUcsQ0FBQSxLQUFJLE1BQU0sRUFBSSxDQUFBLGVBQWMsRUFBRTtBQUNqQyxVQUFBLENBQUcsQ0FBQSxLQUFJLE1BQU0sRUFBSSxDQUFBLGVBQWMsRUFBRTtBQUFBLFFBQ3JDLENBQUM7TUFDTDtBQUVBLGdCQUFVLENBQVYsVUFBWSxLQUFJLENBQUc7QUFDZixXQUFHLElBQUcsVUFBVSxDQUFHO0FBQ2YsYUFBRyxXQUFXLEVBQUksS0FBRyxDQUFDO0FBRXRCLEFBQUksWUFBQSxDQUFBLElBQUcsRUFBSSxDQUFBLEtBQUksTUFBTSxFQUFJLENBQUEsSUFBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QyxBQUFJLFlBQUEsQ0FBQSxHQUFFLEVBQUksQ0FBQSxLQUFJLE1BQU0sRUFBSSxDQUFBLElBQUcsT0FBTyxFQUFFLENBQUM7QUFFckMsQUFBSSxZQUFBLENBQUEsU0FBUSxFQUFJLENBQUEsSUFBRyxhQUFhLEFBQUMsRUFBQyxDQUFDO0FBQ25DLGtCQUFRLGFBQWEsQUFBQyxDQUFDLElBQUcsQ0FBRyxJQUFFLENBQUMsQ0FBQztBQUVqQyxhQUFHLGFBQWEsQUFBQyxDQUFDLFNBQVEsQ0FBQyxDQUFDO0FBRTVCLGFBQUcsWUFBWSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7UUFDMUI7QUFBQSxNQUNKO0FBRUEsY0FBUSxDQUFSLFVBQVUsS0FBSSxDQUFHO0FBQ2IsV0FBRyxLQUFJLE1BQU0sSUFBTSxFQUFBLENBQUc7QUFDbEIsYUFBRyxJQUFHLFdBQVcsQ0FBRztBQUNoQixlQUFHLE9BQU8sQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFDO1VBQ3RCLEtBQU87QUFDSCxlQUFHLFFBQVEsQUFBQyxFQUFDLENBQUM7VUFDbEI7QUFBQSxRQUNKLEtBQU8sS0FBSSxLQUFJLE1BQU0sSUFBTSxFQUFBLENBQUk7QUFDM0IsYUFBRyxjQUFjLEFBQUMsRUFBQyxDQUFDO1FBQ3hCO0FBQUEsTUFDSjtBQUVBLFdBQUssQ0FBTCxVQUFPLEtBQUksQ0FBRztBQUNWLEFBQUksVUFBQSxDQUFBLElBQUcsRUFBSSxDQUFBLEtBQUksTUFBTSxFQUFJLENBQUEsSUFBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QyxBQUFJLFVBQUEsQ0FBQSxHQUFFLEVBQUksQ0FBQSxLQUFJLE1BQU0sRUFBSSxDQUFBLElBQUcsT0FBTyxFQUFFLENBQUM7QUFFckMsV0FBRyxFQUFJLENBQUEsSUFBRyxVQUFVLFdBQVcsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQ3RDLFVBQUUsRUFBSSxDQUFBLElBQUcsVUFBVSxXQUFXLEFBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQztBQUVwQyxBQUFJLFVBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxJQUFHLGFBQWEsQUFBQyxFQUFDLENBQUM7QUFDbkMsZ0JBQVEsYUFBYSxBQUFDLENBQUMsSUFBRyxDQUFHLElBQUUsQ0FBQyxDQUFDO0FBRWpDLFdBQUcsYUFBYSxBQUFDLENBQUMsU0FBUSxDQUFDLENBQUM7QUFFNUIsV0FBRyxZQUFZLEFBQUMsRUFBQyxDQUFDO01BQ3RCO0FBRUEsWUFBTSxDQUFOLFVBQVEsQUFBRCxDQUFHLEdBRVY7QUFFQSxrQkFBWSxDQUFaLFVBQWMsQUFBRCxDQUFHO0FBQ1osQUFBSSxVQUFBLENBQUEsU0FBUSxFQUFJLENBQUEsSUFBRyxhQUFhLEFBQUMsRUFBQyxDQUFDO0FBRW5DLEFBQUksVUFBQSxDQUFBLElBQUcsRUFBSSxDQUFBLElBQUcsT0FBTyxJQUFJLENBQUUsQ0FBQSxDQUFDLHNCQUFzQixBQUFDLEVBQUMsQ0FBQztBQUVyRCxBQUFJLFVBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxJQUFHLE1BQU0sQUFBQyxDQUFDLElBQUcsTUFBTSxFQUFJLEVBQUEsQ0FBQyxDQUFDO0FBQ3hDLEFBQUksVUFBQSxDQUFBLE9BQU0sRUFBSSxDQUFBLElBQUcsTUFBTSxBQUFDLENBQUMsSUFBRyxPQUFPLEVBQUksRUFBQSxDQUFDLENBQUM7QUFFekMsY0FBTSxHQUFLLENBQUEsT0FBTSxFQUFJLENBQUEsSUFBRyxTQUFTLENBQUM7QUFDbEMsY0FBTSxHQUFLLENBQUEsT0FBTSxFQUFJLENBQUEsSUFBRyxTQUFTLENBQUM7QUFFbEMsZ0JBQVEsWUFBWSxBQUFDLENBQ2pCLE9BQU0sQ0FDTixRQUFNLENBQ1YsQ0FBQztBQUVELFdBQUcsT0FBTyxRQUFRLEFBQUMsQ0FBQyxDQUFDLFdBQVUsQ0FBRyxDQUFBLFNBQVEsSUFBSSxBQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFFbkQsV0FBRyx3QkFBd0IsQUFBQyxFQUFDLENBQUM7QUFFOUIsV0FBRyxZQUFZLEFBQUMsRUFBQyxDQUFDO01BQ3RCO0FBR0EsZ0JBQVUsQ0FBVixVQUFZLEFBQWdCO1VBQWhCLFVBQVEsNkNBQUksTUFBSTs7QUFDeEIsV0FBRyxXQUFXLFFBQVEsQUFBQyxDQUFDLFNBQUEsSUFBRztBQUN2QixhQUFHLFFBQVEsUUFBUSxBQUFDLENBQUMsU0FBQSxNQUFLLENBQUs7QUFDM0IsQUFBSSxjQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsY0FBYSxZQUFZLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUM3QyxlQUFHLFNBQVEsQ0FBRztBQUNWLGlCQUFHLGNBQWMsQUFBQyxFQUFDLENBQUM7WUFDeEIsS0FBTztBQUNILGlCQUFHLFVBQVUsQUFBQyxFQUFDLENBQUM7WUFDcEI7QUFBQSxVQUNKLENBQUMsQ0FBQTtRQUNMLENBQUMsQ0FBQTtNQUNMO1NBeG5CaUQsU0FBTyxDQUFDLENBQUM7RUFDdEQsQUFBQyxDQThUUyxjQUFhLENBOVRKO0lBMG5CZCxTQUFPLEVBOW5CcEIsQ0FBQSxTQUFTLFFBQU87QUE4bkJULFdBQU0sU0FBTyxDQUNKLFNBQVEsQUFBYztRQUFYLEtBQUcsNkNBQUksTUFBSTtBQUM5QixBQUFNLFFBQUEsQ0FBQSxLQUFJLEVBQUksRUFBQSxDQUFDO0FBQ2YsQUFBTSxRQUFBLENBQUEsTUFBSyxFQUFJLEVBQUEsQ0FBQztBQUVoQixBQW5vQlIscUNBQWlCLFVBQWtCLEtBQWQsQUFtb0JiLE1BQU0sVUFBUSxDQUFHLFFBQU0sQ0FBRyxLQUFHLENBQUcsTUFBSSxDQUFHLE9BQUssQ0FBQyxBQW5vQmIsQ0Ftb0JjO0FBRTlDLFNBQUcsYUFBYSxBQUFDLENBQUMsS0FBSSxDQUFHLENBQUEsTUFBSyxFQUFJLEVBQUEsQ0FBRyxDQUFBLFNBQVEsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXBFLFNBQUcsR0FBRyxFQUFJLEtBQUcsQ0FBQztJQXlDdEI7QUE5cUJVLFNBQU8sQ0FBQSw2QkFBa0IsQUFBQztBQXdvQmhDLFFBQUksV0FBUztBQUNULEFBQUksVUFBQSxDQUFBLElBQUcsRUEzb0JmLHlCQUFpQixDQUFDLElBQUcsbUNBQXVDLEFBMm9CMUIsQ0FBQztBQUMzQixXQUFHLEtBQUssRUFBSSxDQUFBLElBQUcsS0FBSyxDQUFDO0FBQ3JCLGFBQU8sS0FBRyxDQUFDO01BQ2Y7QUFFQSx1QkFBaUIsQ0FBakIsVUFBbUIsQUFBRDtBQUNkLEFBanBCUiwrQkFBaUIsQ0FBQyxJQUFHLDJDQUF1QyxLQUF2QyxBQWlwQlcsTUFBQyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUMsQUFqcEJILENBaXBCSTtNQUN4QztBQUVBLGlCQUFXLENBQVgsVUFBYSxBQUFELENBQUc7QUFFWCxXQUFHLFVBQVUsbUJBQW1CLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtNQUNsRjtBQUVBLFFBQUksR0FBQyxDQUFFLElBQUcsQ0FBRztBQUNULFdBQUksSUFBRyxDQUFHO0FBRU4sYUFBRyxZQUFZLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUN0QixhQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsU0FBUyxBQUFDLENBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLGFBQUcsYUFBYSxBQUFDLEVBQUMsQ0FBQTtRQUN0QixLQUFPO0FBRUgsYUFBRyxZQUFZLEFBQUMsRUFBQyxDQUFDO0FBQ2xCLGFBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxTQUFTLEFBQUMsQ0FBQyxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQUM7QUFDNUMsYUFBRyxhQUFhLEFBQUMsRUFBQyxDQUFBO1FBQ3RCO0FBQUEsQUFFQSxXQUFHLEtBQUssRUFBSSxLQUFHLENBQUM7TUFDcEI7QUFFQSxRQUFJLEdBQUMsRUFBSTtBQUNMLGFBQU8sQ0FBQSxJQUFHLEtBQUssQ0FBQztNQUNwQjtBQUVBLFlBQU0sQ0FBTixVQUFRLEFBQUQsQ0FBRztBQUNOLFdBQUcsR0FBRyxFQUFJLEVBQUMsSUFBRyxHQUFHLENBQUM7TUFDdEI7QUFBQSxTQTVxQmlELFNBQU8sQ0FBQyxDQUFDO0VBQ3RELEFBQUMsQ0EwbkJxQixHQUFFLENBMW5CTDtJQThxQmQsVUFBUSxFQWxyQnJCLENBQUEsU0FBUyxRQUFPO0FBa3JCVCxXQUFNLFVBQVEsQ0FDTCxTQUFRO0FBQ2hCLEFBQU0sUUFBQSxDQUFBLE1BQUssRUFBSSxFQUFBLENBQUM7QUFDaEIsQUFBTSxRQUFBLENBQUEsS0FBSSxFQUFJLEVBQUEsQ0FBQztBQUVmLEFBdnJCUixxQ0FBaUIsV0FBa0IsS0FBZCxBQXVyQmIsTUFBTSxVQUFRLENBQUcsU0FBTyxDQUFHLEtBQUcsQ0FBRyxNQUFJLENBQUcsT0FBSyxDQUFDLEFBdnJCZCxDQXVyQmU7QUFFL0MsU0FBRyxhQUFhLEFBQUMsQ0FBQyxDQUFBLENBQUcsQ0FBQSxNQUFLLEVBQUksRUFBQSxDQUFHLENBQUEsU0FBUSxLQUFLLGVBQWUsQ0FBQyxDQUFDO0lBMkJ2RTtBQWx0QlUsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBMHJCaEMsaUJBQVcsQ0FBWCxVQUFhLEFBQUQsQ0FBRztBQUNYLFdBQUcsU0FBUyxBQUFDLENBQUMsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDO01BQzNDO0FBRUEsYUFBTyxDQUFQLFVBQVMsS0FBSSxDQUFHO0FBQ1osZUFBUSxLQUFJO0FBQ1IsYUFBSyxDQUFBLEtBQUksTUFBTSxHQUFHO0FBQ2QsZUFBRyxZQUFZLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUN0QixpQkFBSztBQUFBLEFBQ1QsYUFBSyxDQUFBLEtBQUksTUFBTSxJQUFJO0FBQ2YsZUFBRyxZQUFZLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztBQUN2QixpQkFBSztBQUFBLEFBQ1QsYUFBSyxDQUFBLEtBQUksTUFBTSxRQUFRO0FBQ25CLGVBQUcsWUFBWSxBQUFDLEVBQUMsQ0FBQztBQUNsQixpQkFBSztBQUFBLEFBQ1QsYUFBSyxDQUFBLEtBQUksTUFBTSxZQUFZO0FBQ3ZCLGVBQUcsWUFBWSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7QUFDdkIsaUJBQUs7QUFBQSxRQUNiO01BQ0o7QUFFQSx1QkFBaUIsQ0FBakIsVUFBbUIsQUFBRDtBQUNkLEFBbHRCUiwrQkFBaUIsQ0FBQyxJQUFHLDRDQUF1QyxLQUF2QyxBQWt0QlcsTUFBQyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUMsQUFsdEJILENBa3RCSTtNQUN4QztTQWh0QmlELFNBQU8sQ0FBQyxDQUFDO0VBQ3RELEFBQUMsQ0E4cUJzQixHQUFFLENBOXFCTjtJQWt0QmQsS0FBRyxFQXR0QmhCLENBQUEsU0FBUyxRQUFPO0FBc3RCVCxXQUFNLEtBQUcsQ0FDQSxTQUFRLENBQUcsQ0FBQSxJQUFHO0FBQ3RCLEFBQU0sUUFBQSxDQUFBLEtBQUksRUFBSSxFQUFBLENBQUM7QUFDZixBQUFNLFFBQUEsQ0FBQSxNQUFLLEVBQUksRUFBQSxDQUFDO0FBRWhCLEFBM3RCUixxQ0FBaUIsTUFBa0IsS0FBZCxBQTJ0QmIsTUFBTSxVQUFRLENBQUcsS0FBRyxDQUFHLE9BQUssQ0FBRyxNQUFJLENBQUcsT0FBSyxDQUFDLEFBM3RCWixDQTJ0QmE7QUFHN0MsU0FBRyxhQUFhLEFBQUMsQ0FBQyxLQUFJLENBQUcsQ0FBQSxNQUFLLEVBQUksRUFBQSxDQUFHLENBQUEsU0FBUSxLQUFLLGdCQUFnQixDQUFDLENBQUM7QUFFcEUsU0FBRyxJQUFHLEtBQUssSUFBSSxNQUFJLENBQUc7QUFFbEIsV0FBRyxhQUFhLEFBQUMsQ0FBQyxDQUFBLENBQUcsQ0FBQSxNQUFLLEVBQUksRUFBQSxDQUFHLENBQUEsU0FBUSxLQUFLLGVBQWUsQ0FBQyxDQUFDO01BQ25FLEtBQU87QUFFSCxXQUFHLGFBQWEsQUFBQyxDQUFDLENBQUEsQ0FBRyxDQUFBLE1BQUssRUFBSSxFQUFBLENBQUcsQ0FBQSxTQUFRLEtBQUssZUFBZSxDQUFDLENBQUM7QUFDL0QsV0FBRyxhQUFhLEFBQUMsQ0FBQyxDQUFBLENBQUcsQ0FBQSxNQUFLLEVBQUksRUFBQyxDQUFBLEVBQUUsRUFBQSxDQUFDLENBQUcsQ0FBQSxTQUFRLEtBQUssZUFBZSxDQUFDLENBQUM7QUFJbkUsV0FBRyxtQkFBbUIsQUFBQyxDQUFDO0FBQ3BCLFVBQUEsQ0FBRyxFQUFBO0FBQ0gsVUFBQSxDQUFHLENBQUEsTUFBSyxFQUFJLEVBQUE7QUFBQSxRQUNoQixDQUFDLENBQUM7TUFDTjtBQUFBLEFBRUEsU0FBRyxhQUFhLEFBQUMsRUFBQyxDQUFDO0lBdUMzQjtBQXJ4QlUsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBaXZCaEMsdUJBQWlCLENBQWpCLFVBQW1CLFdBQVU7QUFDekIsV0FBRyxXQUFVLElBQUksVUFBUSxDQUFHO0FBQ3hCLEFBcnZCWixpQ0FBaUIsQ0FBQyxJQUFHLHVDQUF1QyxLQUF2QyxBQXF2QmUsTUFBQyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUcsWUFBVSxDQUFDLEFBcnZCcEIsQ0FxdkJxQjtRQUNyRCxLQUFPO0FBQ0gsQUF2dkJaLGlDQUFpQixDQUFDLElBQUcsdUNBQXVDLEtBQXZDLEFBdXZCZSxNQUFDLEVBQUEsQ0FBRyxFQUFBLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBQyxBQXZ2QlAsQ0F1dkJRO1FBQ3hDO0FBQUEsTUFDSjtBQUVBLGlCQUFXLENBQVgsVUFBYSxBQUFELENBQUc7QUFDWCxBQUFJLFVBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFBO0FBQzlCLGVBQVEsSUFBRyxLQUFLO0FBQ1osYUFBSyxNQUFJO0FBQ0wsZ0JBQUksRUFBSyxDQUFBLEtBQUksSUFBSSxBQUFDLENBQUMsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBRyxDQUFBLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNyRSxpQkFBSztBQUFBLEFBQ1QsYUFBSyxPQUFLO0FBQ04sZ0JBQUksRUFBSyxDQUFBLEtBQUksS0FBSyxBQUFDLENBQUMsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBRyxDQUFBLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUN0RSxpQkFBSztBQUFBLEFBQ1QsYUFBSyxNQUFJO0FBQ0wsZ0JBQUksRUFBSyxDQUFBLEtBQUksSUFBSSxBQUFDLENBQUMsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBRyxDQUFBLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNyRSxpQkFBSztBQUFBLEFBQ1QsYUFBSyxNQUFJO0FBQ0wsZ0JBQUksRUFBSyxDQUFBLEtBQUksSUFBSSxBQUFDLENBQUMsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzNDLGlCQUFLO0FBQUEsQUFDVCxhQUFLLEtBQUc7QUFDSixnQkFBSSxFQUFLLENBQUEsS0FBSSxHQUFHLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFHLENBQUEsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3BFLGlCQUFLO0FBQUEsQUFDVCxhQUFLLE9BQUs7QUFDTixnQkFBSSxFQUFLLENBQUEsS0FBSSxLQUFLLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFHLENBQUEsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3RFLGlCQUFLO0FBQUEsQUFDVCxhQUFLLE1BQUk7QUFDTCxnQkFBSSxFQUFLLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFHLENBQUEsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JFLGlCQUFLO0FBQUEsUUFDYjtBQUVBLFdBQUcsVUFBVSxXQUFXLGFBQWEsQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxHQUFHLENBQUcsTUFBSSxDQUFDLENBQUE7TUFDdkU7QUFBQSxTQW54QmlELFNBQU8sQ0FBQyxDQUFDO0VBQ3RELEFBQUMsQ0FrdEJpQixHQUFFLENBbHRCRDtJQXF4QmQsS0FBRyxFQXp4QmhCLENBQUEsU0FBUyxRQUFPO0FBeXhCVCxXQUFNLEtBQUcsQ0FDQSxTQUFRLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxRQUFPLEFBQWdCO1FBQWIsUUFBTSw2Q0FBSSxLQUFHO0FBR3hELEFBN3hCUixxQ0FBaUIsTUFBa0IsS0FBZCxBQTZ4QmIsTUFBTSxVQUFRLENBQUMsQUE3eEJpQixDQTZ4QmhCO0FBRWhCLFNBQUcsU0FBUyxFQUFJLFNBQU8sQ0FBQztBQUV4QixTQUFHLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDcEIsU0FBRyxLQUFLLEVBQUksS0FBRyxDQUFDO0FBRWhCLFNBQUcsU0FBUyxFQUFJLENBQUEsSUFBRyxVQUFVLG9CQUFvQixBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7QUFDMUQsU0FBRyxPQUFPLEVBQUksQ0FBQSxJQUFHLFVBQVUsb0JBQW9CLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUV0RCxTQUFHLE1BQU0sRUFBSSxFQUFDLElBQUcsU0FBUyxDQUFHLENBQUEsSUFBRyxPQUFPLENBQUMsQ0FBQTtBQUV4QyxTQUFHLGVBQWUsRUFBSSxDQUFBLElBQUcsVUFBVSxpQkFBaUIsQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBQzdELFNBQUcsYUFBYSxFQUFJLENBQUEsSUFBRyxVQUFVLGlCQUFpQixBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFFekQsU0FBRyxXQUFXLEVBQUksRUFBQyxJQUFHLGVBQWUsQ0FBRyxDQUFBLElBQUcsYUFBYSxDQUFDLENBQUE7QUFDekQsU0FBRyxVQUFVLEFBQUMsQ0FBQyxJQUFHLENBQUcsUUFBTSxDQUFDLENBQUM7QUFFN0IsU0FBRyxVQUFVLEVBQUksQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDO0FBOXlCcEMsQUFBSSxRQUFBLE9BQW9CLEtBQUcsQ0FBQztBQUM1QixBQUFJLFFBQUEsUUFBb0IsTUFBSSxDQUFDO0FBQzdCLEFBQUksUUFBQSxRQUFvQixVQUFRLENBQUM7QUFDakMsUUFBSTtBQUhKLFlBQVMsR0FBQSxPQURqQixLQUFLLEVBQUEsQUFDNEI7QUFDaEIsaUJBQW9CLENBQUEsQ0EreUJQLElBQUcsV0FBVyxDQS95QlcsQ0FBRSxNQUFLLFNBQVMsQ0FBQyxBQUFDLEVBQUMsQ0FDN0QsRUFBQyxDQUFDLE1BQW9CLENBQUEsQ0FBQyxNQUFvQixDQUFBLFNBQXFCLEFBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUN6RSxPQUFvQixLQUFHLENBQUc7WUE2eUJ0QixVQUFRO0FBQXNCO0FBQ25DLGVBQUcsU0FBUSxTQUFTLENBQUc7QUFDbkIsaUJBQUcsU0FBUyxBQUFDLENBQUMsU0FBUSxNQUFNLENBQUMsQ0FBQztZQUNsQztBQUFBLFVBQ0o7UUE5eUJBO0FBQUEsTUFEQSxDQUFFLGFBQTBCO0FBQzFCLGNBQW9CLEtBQUcsQ0FBQztBQUN4QixvQkFBb0MsQ0FBQztNQUN2QyxDQUFFLE9BQVE7QUFDUixVQUFJO0FBQ0YsYUFBSSxLQUFpQixHQUFLLENBQUEsV0FBdUIsR0FBSyxLQUFHLENBQUc7QUFDMUQsc0JBQXdCLEFBQUMsRUFBQyxDQUFDO1VBQzdCO0FBQUEsUUFDRixDQUFFLE9BQVE7QUFDUixtQkFBd0I7QUFDdEIsdUJBQXdCO1VBQzFCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxBQW95QkEsU0FBRyxPQUFPLElBQUksU0FBUyxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7SUE2U3hDO0FBbG1DVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUF3ekJoQyxRQUFJLFdBQVMsRUFBSTtBQUNiLGFBQU87QUFDSCxlQUFLLENBQUcsQ0FBQSxJQUFHLE9BQU87QUFDbEIsYUFBRyxDQUFHLENBQUEsSUFBRyxLQUFLO0FBQUEsUUFDbEIsQ0FBQztNQUNMO0FBRUEsYUFBTyxDQUFQLFVBQVMsS0FBSSxDQUFHO0FBQ1osV0FBRyxPQUFPLGNBQWMsQUFBQyxDQUFDLFlBQVcsR0FBRyxDQUFHLENBQUEsWUFBVyxJQUFJLENBQUcsQ0FBQSxZQUFXLFFBQVEsQ0FBRyxDQUFBLFlBQVcsWUFBWSxDQUFDLENBQUM7QUFFNUcsZUFBUSxLQUFJO0FBQ1IsYUFBSyxDQUFBLEtBQUksTUFBTSxRQUFRO0FBQ25CLGVBQUcsT0FBTyxTQUFTLEFBQUMsQ0FBQyxZQUFXLFFBQVEsQ0FBQyxDQUFDO0FBQzFDLGlCQUFLO0FBQUEsQUFDVCxhQUFLLENBQUEsS0FBSSxNQUFNLEdBQUc7QUFDZCxlQUFHLE9BQU8sU0FBUyxBQUFDLENBQUMsWUFBVyxHQUFHLENBQUMsQ0FBQztBQUNyQyxpQkFBSztBQUFBLEFBQ1QsYUFBSyxDQUFBLEtBQUksTUFBTSxJQUFJO0FBQ2YsZUFBRyxPQUFPLFNBQVMsQUFBQyxDQUFDLFlBQVcsSUFBSSxDQUFDLENBQUM7QUFDdEMsaUJBQUs7QUFBQSxBQUNULGFBQUssQ0FBQSxLQUFJLE1BQU0sWUFBWTtBQUN2QixlQUFHLE9BQU8sU0FBUyxBQUFDLENBQUMsWUFBVyxZQUFZLENBQUMsQ0FBQztBQUM5QyxpQkFBSztBQUFBLFFBQ2I7QUFFQSxXQUFJLElBQUcsZUFBZSxpQkFBaUIsQ0FBRztBQUN0QyxhQUFHLGVBQWUsU0FBUyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDdkM7QUFBQSxBQUNBLFdBQUcsSUFBRyxhQUFhLGlCQUFpQixDQUFHO0FBQ25DLGFBQUcsYUFBYSxTQUFTLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNyQztBQUFBLEFBRUEsV0FBRyxVQUFVLEVBQUksTUFBSSxDQUFDO01BQzFCO0FBRUEsUUFBSSxNQUFJLEVBQUk7QUFDUixhQUFPLENBQUEsSUFBRyxVQUFVLENBQUM7TUFDekI7QUFFQSxvQkFBYyxDQUFkLFVBQWdCLEFBQUQ7QUFoMkJYLEFBQUksVUFBQSxPQUFvQixLQUFHLENBQUM7QUFDNUIsQUFBSSxVQUFBLFFBQW9CLE1BQUksQ0FBQztBQUM3QixBQUFJLFVBQUEsUUFBb0IsVUFBUSxDQUFDO0FBQ2pDLFVBQUk7QUFISixjQUFTLEdBQUEsT0FEakIsS0FBSyxFQUFBLEFBQzRCO0FBQ2hCLG1CQUFvQixDQUFBLENBZzJCWCxJQUFHLE1BQU0sQ0FoMkJvQixDQUFFLE1BQUssU0FBUyxDQUFDLEFBQUMsRUFBQyxDQUM3RCxFQUFDLENBQUMsTUFBb0IsQ0FBQSxDQUFDLE1BQW9CLENBQUEsU0FBcUIsQUFBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQ3pFLE9BQW9CLEtBQUcsQ0FBRztjQTgxQnBCLElBQUU7QUFBaUI7QUFDMUIsZ0JBQUUsYUFBYSxBQUFDLEVBQUMsQ0FBQTtZQUNyQjtVQTcxQkE7QUFBQSxRQURBLENBQUUsYUFBMEI7QUFDMUIsZ0JBQW9CLEtBQUcsQ0FBQztBQUN4QixzQkFBb0MsQ0FBQztRQUN2QyxDQUFFLE9BQVE7QUFDUixZQUFJO0FBQ0YsZUFBSSxLQUFpQixHQUFLLENBQUEsV0FBdUIsR0FBSyxLQUFHLENBQUc7QUFDMUQsd0JBQXdCLEFBQUMsRUFBQyxDQUFDO1lBQzdCO0FBQUEsVUFDRixDQUFFLE9BQVE7QUFDUixxQkFBd0I7QUFDdEIseUJBQXdCO1lBQzFCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQXUxQko7QUFFQSxRQUFFLENBQUYsVUFBSSxBQUFELENBQUc7QUFDRixhQUFPLENBQUEsSUFBRyxPQUFPLElBQUksQUFBQyxFQUFDLENBQUM7TUFDNUI7QUFFQSwyQkFBcUIsQ0FBckIsVUFBdUIsQUFBRCxDQUFHO0FBQ3JCLEFBQUksVUFBQSxDQUFBLE1BQUssRUFBSSxJQUFJLENBQUEsTUFBSyxlQUFlLEFBQUMsRUFBQyxDQUFDO0FBQ3hDLGFBQUssT0FBTyxBQUFDLENBQUMsR0FBSSxDQUFBLE1BQUssY0FBYyxBQUFDLENBQUMsSUFBRyxVQUFVLEVBQUUsQ0FBRyxDQUFBLElBQUcsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNFLGFBQUssT0FBTyxBQUFDLENBQUMsR0FBSSxDQUFBLE1BQUssY0FBYyxBQUFDLENBQUMsSUFBRyxRQUFRLEVBQUUsQ0FBRyxDQUFBLElBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLGFBQU8sT0FBSyxDQUFDO01BQ2pCO0FBRUEsa0JBQVksQ0FBWixVQUFjLEFBQUQsQ0FBRztBQUNaLFdBQUcsVUFBVSxFQUFJLENBQUEsSUFBRyxlQUFlLEFBQUMsQ0FBQyxJQUFHLGVBQWUsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUNoRSxXQUFHLFFBQVEsRUFBSSxDQUFBLElBQUcsZUFBZSxBQUFDLENBQUMsSUFBRyxhQUFhLENBQUcsTUFBSSxDQUFDLENBQUM7QUFFNUQsV0FBRyxZQUFZLEFBQUMsQ0FBQyxJQUFHLHVCQUF1QixBQUFDLEVBQUMsQ0FBQyxDQUFDO01BSW5EO0FBRUEsY0FBUSxDQUFSLFVBQVUsQUFBZ0MsQ0FBRztVQUFuQyxXQUFTLDZDQUFJLEtBQUc7VUFBRyxRQUFNLDZDQUFJLEtBQUc7QUFDdEMsV0FBRyxVQUFVLEVBQUksQ0FBQSxJQUFHLGVBQWUsQUFBQyxDQUFDLElBQUcsZUFBZSxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBQ3JFLFdBQUcsUUFBUSxFQUFJLENBQUEsSUFBRyxlQUFlLEFBQUMsQ0FBQyxJQUFHLGFBQWEsQ0FBRyxXQUFTLENBQUMsQ0FBQztBQUVqRSxXQUFHLE9BQU8sRUFBSSxDQUFBLElBQUcsTUFBTSxBQUFDLENBQ3BCO0FBQ0ksVUFBQSxDQUFHLENBQUEsSUFBRyxVQUFVLEVBQUUsRUFBSSxDQUFBLElBQUcsU0FBUztBQUNsQyxVQUFBLENBQUcsQ0FBQSxJQUFHLFVBQVUsRUFBRSxFQUFJLENBQUEsSUFBRyxTQUFTO0FBQUEsUUFDdEMsQ0FDQTtBQUNJLFVBQUEsQ0FBRyxDQUFBLElBQUcsUUFBUSxFQUFFLEVBQUksQ0FBQSxJQUFHLFNBQVM7QUFDaEMsVUFBQSxDQUFHLENBQUEsSUFBRyxRQUFRLEVBQUUsRUFBSSxDQUFBLElBQUcsU0FBUztBQUFBLFFBQ3BDLENBQUMsQ0FBQztBQUVOLFdBQUcsWUFBWSxBQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsQ0FBQztBQUU3QixXQUFJLE9BQU07QUFDTixhQUFHLGdCQUFnQixBQUFDLEVBQUMsQ0FBQztBQUFBLE1BQzlCO0FBRUEsZ0JBQVUsQ0FBVixVQUFZLE1BQUssQ0FBRztBQUVoQixXQUFHLElBQUcsT0FBTyxJQUFJLFVBQVEsQ0FBRztBQUN4QixhQUFHLE9BQU8sYUFBYSxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7UUFDcEMsS0FBTztBQUNILGFBQUcsT0FBTyxFQUFJLElBQUksQ0FBQSxNQUFLLFNBQVMsQUFBQyxDQUFDLE1BQUssQ0FBRyxVQUFRLENBQUcsRUFBQSxDQUFDLENBQUM7UUFDM0Q7QUFBQSxBQUVBLFdBQUcsT0FBTyxjQUFjLEFBQUMsQ0FBQyxZQUFXLEdBQUcsQ0FBRyxDQUFBLFlBQVcsSUFBSSxDQUFHLENBQUEsWUFBVyxRQUFRLENBQUcsQ0FBQSxZQUFXLFlBQVksQ0FBQyxDQUFDO0FBQzVHLFdBQUcsT0FBTyxTQUFTLEFBQUMsQ0FBQyxZQUFXLFFBQVEsQ0FBQyxDQUFDO0FBRTFDLFdBQUcsT0FBTyxRQUFRLEFBQUMsQ0FBQztBQUNoQixlQUFLLENBQUcsQ0FBQSxJQUFHLE9BQU87QUFDbEIsYUFBRyxDQUFHLENBQUEsSUFBRyxLQUFLO0FBQUEsUUFDbEIsQ0FBQyxDQUFDO01BQ047QUFLQSxVQUFJLENBQUosVUFBTSxLQUFJLENBQUcsQ0FBQSxHQUFFO0FBR1gsQUFBTSxVQUFBLENBQUEsWUFBVyxFQUFJLE1BQUksQ0FBQztBQUUxQixBQUFJLFVBQUEsQ0FBQSxXQUFVLEVBQUksSUFBSSxJQUFFLEFBQUMsRUFBQyxDQUFDO0FBQzNCLEFBQUksVUFBQSxDQUFBLFNBQVEsRUFBSSxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUM7QUFDekIsZ0JBQVEsSUFBSSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7QUFFcEIsQUFBSSxVQUFBLENBQUEsUUFBTyxFQUFJLElBQUksSUFBRSxBQUFDLEVBQUMsQ0FBQztBQUd4QixBQUFJLFVBQUEsQ0FBQSxNQUFLLEVBQUksSUFBSSxDQUFBLFVBQVMsb0JBQW9CLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUN6RCxhQUFLLElBQUksQUFBQyxDQUFDLEtBQUksQ0FBRyxFQUFBLENBQUMsQ0FBQztBQUdwQixBQUFJLFVBQUEsQ0FBQSxNQUFLLEVBQUksSUFBSSxDQUFBLFVBQVMsb0JBQW9CLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUN6RCxhQUFLLElBQUksQUFBQyxDQUFDLEtBQUksQ0FBRyxDQUFBLElBQUcsa0JBQWtCLEFBQUMsQ0FBQyxLQUFJLENBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQztBQUVyRCxBQUFJLFVBQUEsQ0FBQSxXQUFVLEVBQUksQ0FBQSxJQUFHLFVBQVUsb0JBQW9CLEFBQUMsRUFBQyxDQUFDO0FBQ3RELEFBQUksVUFBQSxDQUFBLG1CQUFrQixDQUFDO0FBQ3ZCLFdBQUcsSUFBRyxPQUFPLElBQUksVUFBUSxDQUFHO0FBQ3hCLDRCQUFrQixFQUFJLENBQUEsSUFBRyxVQUFVLHFCQUFxQixBQUFDLEVBQUMsQ0FBQztRQUMvRCxLQUFPO0FBQ0gsNEJBQWtCLEVBQUksQ0FBQSxJQUFHLFVBQVUscUJBQXFCLEFBQUMsQ0FBQyxJQUFHLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDN0U7QUFBQSxBQUVBLGNBQU8sU0FBUSxLQUFLLEVBQUksRUFBQSxDQUFHO0FBQ3ZCLEFBQUksWUFBQSxDQUFBLFdBQVUsRUFyOEIxQixLQUFLLEVBQUEsQUFxOEJxQixDQUFDO0FBQ2YsQUFBSSxZQUFBLENBQUEsaUJBQWdCLEVBdDhCaEMsS0FBSyxFQUFBLEFBczhCMkIsQ0FBQztBQXI4QnpCLEFBQUksWUFBQSxPQUFvQixLQUFHLENBQUM7QUFDNUIsQUFBSSxZQUFBLFFBQW9CLE1BQUksQ0FBQztBQUM3QixBQUFJLFlBQUEsUUFBb0IsVUFBUSxDQUFDO0FBQ2pDLFlBQUk7QUFISixnQkFBUyxHQUFBLE9BRGpCLEtBQUssRUFBQSxBQUM0QjtBQUNoQixxQkFBb0IsQ0FBQSxDQXc4Qk4sU0FBUSxDQXg4QmdCLENBQUUsTUFBSyxTQUFTLENBQUMsQUFBQyxFQUFDLENBQzdELEVBQUMsQ0FBQyxNQUFvQixDQUFBLENBQUMsTUFBb0IsQ0FBQSxTQUFxQixBQUFDLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FDekUsT0FBb0IsS0FBRyxDQUFHO2dCQXM4QmhCLEtBQUc7QUFBZ0I7QUFDMUIsbUJBQUcsQ0FBQyxXQUFVLENBQUEsRUFBSyxDQUFBLE1BQUssSUFBSSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUEsQ0FBSSxrQkFBZ0IsQ0FBRztBQUNyRCw0QkFBVSxFQUFJLEtBQUcsQ0FBQztBQUNsQixrQ0FBZ0IsRUFBSSxDQUFBLE1BQUssSUFBSSxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUE7Z0JBQzlDO0FBQUEsY0FDSjtZQXg4Qko7QUFBQSxVQURBLENBQUUsYUFBMEI7QUFDMUIsa0JBQW9CLEtBQUcsQ0FBQztBQUN4Qix3QkFBb0MsQ0FBQztVQUN2QyxDQUFFLE9BQVE7QUFDUixjQUFJO0FBQ0YsaUJBQUksS0FBaUIsR0FBSyxDQUFBLFdBQXVCLEdBQUssS0FBRyxDQUFHO0FBQzFELDBCQUF3QixBQUFDLEVBQUMsQ0FBQztjQUM3QjtBQUFBLFlBQ0YsQ0FBRSxPQUFRO0FBQ1IsdUJBQXdCO0FBQ3RCLDJCQUF3QjtjQUMxQjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsQUE4N0JJLGFBQUcsTUFBSyxjQUFjLE9BQU8sQUFBQyxDQUFDLFdBQVUsQ0FBRyxJQUFFLENBQUMsQ0FBRztBQUM5QyxpQkFBTyxDQUFBLElBQUcsZ0JBQWdCLEFBQUMsQ0FBQyxRQUFPLENBQUcsWUFBVSxDQUFDLENBQUM7VUFDdEQ7QUFBQSxBQUVBLGtCQUFRLE9BQU8sQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0FBQzdCLG9CQUFVLElBQUksQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0FBSTVCLDZCQUFvQixFQUFBLENBQUksQ0FBQSxTQUFRLEVBQUksRUFBQSxDQUFJLENBQUEsU0FBUSxFQUFFLENBQUc7QUFDakQsQUFBSSxjQUFBLENBQUEsUUFBTyxFQUFJLENBQUEsSUFBRyxVQUFVLEFBQUMsQ0FBQyxXQUFVLENBQUcsVUFBUSxDQUFDLENBQUM7QUFDckQsdUJBQVksRUFBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLEdBQUMsQ0FBSSxDQUFBLENBQUEsRUFBRSxDQUFHO0FBRzFCLGlCQUFHLElBQUcsZ0JBQWdCLEFBQUMsQ0FBQyxXQUFVLENBQUcsQ0FBQSxJQUFHLGlCQUFpQixBQUFDLENBQUMsUUFBTyxDQUFDLENBQUMsQ0FBRztBQUNuRSxxQkFBSztjQUNUO0FBQUEsQUFJQSxpQkFBSSxXQUFVLElBQUksQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFHO0FBQzNCLHdCQUFRO2NBQ1o7QUFBQSxBQUVBLGlCQUFJLENBQUMsU0FBUSxJQUFJLEFBQUMsQ0FBQyxRQUFPLENBQUMsRUFBRSxDQUFHO0FBQzVCLHdCQUFRLElBQUksQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDO2NBQzNCO0FBQUEsQUFLSSxnQkFBQSxDQUFBLFNBQVEsRUFBSSxFQUFBLENBQUM7QUFDakIsaUJBQUcsQ0FBQSxJQUFJLEVBQUEsQ0FBRztBQUNOLHdCQUFRLEVBQUksRUFBQSxDQUFDO2NBQ2pCO0FBQUEsQUFDSSxnQkFBQSxDQUFBLGNBQWEsRUFBSSxDQUFBLE1BQUssSUFBSSxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUEsQ0FBSSxVQUFRLENBQUM7QUFFeEQsaUJBQUcsSUFBRyxnQkFBZ0IsQUFBQyxDQUFDLG1CQUFrQixDQUFHLENBQUEsSUFBRyxpQkFBaUIsQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDLENBQUc7QUFFM0UsNkJBQWEsR0FBSyxFQUFBLENBQUM7Y0FDdkI7QUFBQSxBQUVBLGlCQUFJLGNBQWEsR0FBSyxDQUFBLE1BQUssSUFBSSxBQUFDLENBQUMsUUFBTyxDQUFDLENBQUc7QUFDeEMsd0JBQVE7Y0FDWjtBQUFBLEFBRUEscUJBQU8sSUFBSSxBQUFDLENBQUMsUUFBTyxDQUFHLFlBQVUsQ0FBQyxDQUFDO0FBQ25DLG1CQUFLLElBQUksQUFBQyxDQUFDLFFBQU8sQ0FBRyxlQUFhLENBQUMsQ0FBQztBQUNwQyxtQkFBSyxJQUFJLEFBQUMsQ0FBQyxRQUFPLENBQUcsQ0FBQSxjQUFhLEVBQUksQ0FBQSxJQUFHLGtCQUFrQixBQUFDLENBQUMsUUFBTyxDQUFHLElBQUUsQ0FBQyxDQUFDLENBQUM7QUFJNUUsaUJBQUcsSUFBRyxnQkFBZ0IsQUFBQyxDQUFDLG1CQUFrQixDQUFHLENBQUEsSUFBRyxpQkFBaUIsQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDLENBQUc7QUFDM0UscUJBQUs7Y0FDVDtBQUFBLEFBR0EscUJBQU8sRUFBSSxDQUFBLElBQUcsVUFBVSxBQUFDLENBQUMsUUFBTyxDQUFHLFVBQVEsQ0FBQyxDQUFDO1lBQ2xEO0FBQUEsVUFDSjtBQUFBLEFBRUEsYUFBRyxTQUFRLEtBQUssRUFBSSxhQUFXLENBQUc7QUFDOUIsaUJBQUs7VUFDVDtBQUFBLFFBQ0o7QUFBQSxBQUVBLGFBQU8sQ0FBQSxJQUFHLHVCQUF1QixBQUFDLEVBQUMsQ0FBQztNQUN4QztBQXlCQSxxQkFBZSxDQUFmLFVBQWlCLEtBQUksQ0FBRztBQUNwQixhQUFPO0FBQ0gsVUFBQSxDQUFHLENBQUEsS0FBSSxFQUFFLEVBQUksQ0FBQSxJQUFHLFNBQVM7QUFDekIsVUFBQSxDQUFHLENBQUEsS0FBSSxFQUFFLEVBQUksQ0FBQSxJQUFHLFNBQVM7QUFBQSxRQUM3QixDQUFBO01BQ0o7QUFFQSxvQkFBYyxDQUFkLFVBQWdCLFFBQU8sQ0FBRyxDQUFBLFdBQVUsQ0FBRztBQUNuQyxBQUFJLFVBQUEsQ0FBQSxTQUFRLEVBQUksSUFBSSxDQUFBLE1BQUssZUFBZSxBQUFDLEVBQUMsQ0FBQztBQUMzQyxnQkFBUSxPQUFPLEFBQUMsQ0FBQyxHQUFJLENBQUEsTUFBSyxjQUFjLEFBQUMsQ0FBQyxXQUFVLEVBQUUsRUFBSSxDQUFBLElBQUcsU0FBUyxDQUFHLENBQUEsV0FBVSxFQUFFLEVBQUksQ0FBQSxJQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFFeEcsY0FBTyxRQUFPLElBQUksQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFHO0FBQzlCLG9CQUFVLEVBQUksQ0FBQSxRQUFPLElBQUksQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0FBQ3ZDLGtCQUFRLE9BQU8sQUFBQyxDQUFDLEdBQUksQ0FBQSxNQUFLLGNBQWMsQUFBQyxDQUFDLFdBQVUsRUFBRSxFQUFJLENBQUEsSUFBRyxTQUFTLENBQUcsQ0FBQSxXQUFVLEVBQUUsRUFBSSxDQUFBLElBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM1RztBQUFBLEFBRUEsYUFBTyxVQUFRLENBQUM7TUFDcEI7QUFnQkEsbUJBQWEsQ0FBYixVQUFlLFNBQVEsQUFBbUIsQ0FBRztVQUFuQixXQUFTLDZDQUFJLEtBQUc7QUFFdEMsQUFBSSxVQUFBLENBQUEsS0FBSSxFQUFJLENBQUEsU0FBUSxPQUFPLEdBQUcsQ0FBQztBQUUvQixBQUFJLFVBQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxTQUFRLE9BQU8sSUFBSSxDQUFDO0FBRXJDLEFBQUksVUFBQSxDQUFBLFFBQU8sRUFBSSxDQUFBLFVBQVMsU0FBUyxBQUFDLEVBQUMsQ0FBQztBQUNwQyxBQUFJLFVBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxVQUFTLEtBQUssQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQ3BDLEFBQUksVUFBQSxDQUFBLE1BQUssRUFBSSxDQUFBLFVBQVMsS0FBSyxBQUFDLENBQUMsUUFBTyxDQUFDLENBQUM7QUFFdEMsQUFBSSxVQUFBLENBQUEsQ0FBQSxFQUFJLENBQUEsUUFBTyxLQUFLLEVBQUksQ0FBQSxLQUFJLEVBQUksRUFBQSxDQUFDO0FBQ2pDLEFBQUksVUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLFFBQU8sSUFBSSxFQUFJLENBQUEsTUFBSyxFQUFJLEVBQUEsQ0FBQztBQUNqQyxXQUFHLFVBQVMsQ0FBRztBQUNYLFVBQUEsRUFBSSxDQUFBLElBQUcsVUFBVSxXQUFXLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNoQyxVQUFBLEVBQUksQ0FBQSxJQUFHLFVBQVUsV0FBVyxBQUFDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDcEM7QUFBQSxBQUVBLGFBQU87QUFDSCxVQUFBLENBQUcsRUFBQTtBQUNILFVBQUEsQ0FBRyxFQUFBO0FBQUEsUUFDUCxDQUFDO01BQ0w7QUFBQTtBQTlFTyxjQUFRLENBQWYsVUFBaUIsS0FBSSxDQUFHLENBQUEsU0FBUSxDQUFHO0FBQy9CLGVBQVEsU0FBUTtBQUNaLGFBQUssRUFBQTtBQUNELGlCQUFPO0FBQ0gsY0FBQSxDQUFHLENBQUEsS0FBSSxFQUFFO0FBQ1QsY0FBQSxDQUFHLENBQUEsS0FBSSxFQUFFLEVBQUksRUFBQTtBQUFBLFlBQ2pCLENBQUM7QUFBQSxBQUNMLGFBQUssRUFBQTtBQUNELGlCQUFPO0FBQ0gsY0FBQSxDQUFHLENBQUEsS0FBSSxFQUFFLEVBQUksRUFBQTtBQUNiLGNBQUEsQ0FBRyxDQUFBLEtBQUksRUFBRTtBQUFBLFlBQ2IsQ0FBQztBQUFBLEFBQ0wsYUFBSyxFQUFBO0FBQ0QsaUJBQU87QUFDSCxjQUFBLENBQUcsQ0FBQSxLQUFJLEVBQUU7QUFDVCxjQUFBLENBQUcsQ0FBQSxLQUFJLEVBQUUsRUFBSSxFQUFBO0FBQUEsWUFDakIsQ0FBQztBQUFBLEFBQ0wsYUFBSyxFQUFBO0FBQ0QsaUJBQU87QUFDSCxjQUFBLENBQUcsQ0FBQSxLQUFJLEVBQUUsRUFBSSxFQUFBO0FBQ2IsY0FBQSxDQUFHLENBQUEsS0FBSSxFQUFFO0FBQUEsWUFDYixDQUFDO0FBQUEsUUFDVDtNQUNKO0FBb0JPLHNCQUFnQixDQUF2QixVQUF5QixDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFFM0IsYUFBTyxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUMsQ0FBQSxFQUFFLEVBQUksQ0FBQSxDQUFBLEVBQUUsQ0FBQyxDQUFBLENBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFDLENBQUEsRUFBRSxFQUFJLENBQUEsQ0FBQSxFQUFFLENBQUMsQ0FBQztNQUNwRDtBQUVPLG9CQUFjLENBQXJCLFVBQXVCLEdBQUUsQ0FBRyxDQUFBLEtBQUk7QUFwa0M1QixBQUFJLFVBQUEsT0FBb0IsS0FBRyxDQUFDO0FBQzVCLEFBQUksVUFBQSxRQUFvQixNQUFJLENBQUM7QUFDN0IsQUFBSSxVQUFBLFFBQW9CLFVBQVEsQ0FBQztBQUNqQyxVQUFJO0FBSEosY0FBUyxHQUFBLE9BRGpCLEtBQUssRUFBQSxBQUM0QjtBQUNoQixtQkFBb0IsQ0FBQSxDQW9rQ1osR0FBRSxDQXBrQzRCLENBQUUsTUFBSyxTQUFTLENBQUMsQUFBQyxFQUFDLENBQzdELEVBQUMsQ0FBQyxNQUFvQixDQUFBLENBQUMsTUFBb0IsQ0FBQSxTQUFxQixBQUFDLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FDekUsT0FBb0IsS0FBRyxDQUFHO2NBa2tDdEIsS0FBRztBQUFVO0FBQ2xCLGlCQUFHLElBQUcsRUFBRSxJQUFNLENBQUEsS0FBSSxFQUFFLENBQUEsRUFBSyxDQUFBLElBQUcsRUFBRSxJQUFNLENBQUEsS0FBSSxFQUFFLENBQUc7QUFDekMscUJBQU8sS0FBRyxDQUFDO2NBQ2Y7QUFBQSxZQUNKO1VBbmtDQTtBQUFBLFFBREEsQ0FBRSxhQUEwQjtBQUMxQixnQkFBb0IsS0FBRyxDQUFDO0FBQ3hCLHNCQUFvQyxDQUFDO1FBQ3ZDLENBQUUsT0FBUTtBQUNSLFlBQUk7QUFDRixlQUFJLEtBQWlCLEdBQUssQ0FBQSxXQUF1QixHQUFLLEtBQUcsQ0FBRztBQUMxRCx3QkFBd0IsQUFBQyxFQUFDLENBQUM7WUFDN0I7QUFBQSxVQUNGLENBQUUsT0FBUTtBQUNSLHFCQUF3QjtBQUN0Qix5QkFBd0I7WUFDMUI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLEFBd2pDQSxhQUFPLE1BQUksQ0FBQztNQUNoQjtLQXprQ2lELFNBQU8sQ0FBQyxDQUFDO0VBQ3RELEFBQUMsQ0FxeEJpQixjQUFhLENBcnhCWjtBQUozQjtBQUFBLGtCQUF3QjtBQUFFLHNCQUF3QjtJQUFFO0FBQXBELHVCQUF3QjtBQUFFLDJCQUF3QjtJQUFFO0FBQXBELHdCQUF3QjtBQUFFLDRCQUF3QjtJQUFFO0FBQXBELGlCQUF3QjtBQUFFLHFCQUF3QjtJQUFFO0FBQXBELGtCQUF3QjtBQUFFLHNCQUF3QjtJQUFFO0FBQXBELGFBQXdCO0FBQUUsaUJBQXdCO0lBQUU7QUFBcEQsYUFBd0I7QUFBRSxpQkFBd0I7SUFBRTtBQUFBLEdBQTdCOzs7O0FBQXZCLEFBQUksSUFBQSxDQUFBLFlBQVcsMkJBQW9CLENBQUM7SUNFOUIsZ0JBQWMsRUFGcEIsQ0FBQSxTQUFTLEFBQUQ7QUFFUixXQUFNLGdCQUFjLENBQ0osSUFBRyxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsV0FBVSxDQUFHLENBQUEsU0FBUSxDQUFHLENBQUEsYUFBWTtBQUN4RCxTQUFHLEtBQUssRUFBSSxLQUFHLENBQUM7QUFDaEIsU0FBRyxLQUFLLEVBQUksS0FBRyxDQUFDO0FBQ2hCLFNBQUcsWUFBWSxFQUFJLFlBQVUsQ0FBQztBQUM5QixTQUFHLFVBQVUsRUFBSSxVQUFRLENBQUM7QUFFMUIsU0FBRyxJQUFJLEVBQUksQ0FBQSxDQUFBLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUNwQixNQUFBLEFBQUMsQ0FBQyxJQUFHLElBQUksQ0FBQyxLQUNGLEFBQUMsQ0FBQyxJQUFHLENBQUMsS0FDTixBQUFDLENBQUMsTUFBSyxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBRXZCLFNBQUcsYUFBWSxDQUFHO0FBQ2QsUUFBQSxBQUFDLENBQUMsSUFBRyxJQUFJLENBQUMsTUFBTSxBQUFDLENBQ2IsU0FBQSxLQUFJLENBQUs7QUFDTCxzQkFBWSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7QUFDcEIsb0JBQVUsS0FBSyxBQUFDLEVBQUMsQ0FBQztRQUN0QixDQUNKLENBQUM7TUFDTDtBQUFBLElBc0JSO0FBekNVLFNBQU8sQ0FBQSw2QkFBa0IsQUFBQztBQXNCaEMsYUFBTyxDQUFQLFVBQVMsR0FBRSxDQUFHO0FBQ1YsV0FBRyxJQUFJLFNBQVMsQUFBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDO0FBQ3RCLGFBQU8sS0FBRyxDQUFDO01BQ2Y7QUFFQSxlQUFTLENBQVQsVUFBVyxJQUFHLENBQUc7QUFDYixXQUFHLENBQUMsSUFBRyxRQUFRLENBQUc7QUFDZCxhQUFHLFFBQVEsRUFBSSxDQUFBLENBQUEsQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBQ3hCLGFBQUcsSUFBSSxPQUFPLEFBQUMsQ0FBQyxJQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDO0FBQUEsQUFFQSxXQUFHLFFBQVEsT0FBTyxBQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsQ0FBQztBQUVoQyxhQUFPLEtBQUcsQ0FBQztNQUNmO0FBRUEsUUFBSSxPQUFLLEVBQUk7QUFDVCxhQUFPLENBQUEsSUFBRyxJQUFJLENBQUM7TUFDbkI7QUFBQSxTQXhDd0YsQ0FBQztFQUNyRixBQUFDLEVBQUM7SUF5Q0osYUFBVyxFQTVDakIsQ0FBQSxTQUFTLFFBQU8sQ0FBRztBQTRDbkIsV0FBTSxhQUFXLENBQ0QsSUFBRyxDQUFHLENBQUEsV0FBVSxDQUFHLENBQUEsU0FBUTtBQUNuQyxBQTlDUixxQ0FBaUIsY0FBa0IsS0FBZCxBQThDYixNQUNJLEtBQUcsQ0FDSCxLQUFHLENBQ0gsWUFBVSxDQUNWLFVBQVEsQ0FDUixVQUFBLEtBQUksQ0FBSztBQUNMLEFBQUksVUFBQSxDQUFBLFFBQU8sRUFBSTtBQUNYLGFBQUcsQ0FBRyxDQUFBLElBQUcsTUFBTSxBQUFDLENBQUMsV0FBVSxTQUFTLEVBQUUsRUFBSSxDQUFBLFNBQVEsU0FBUyxDQUFDLENBQUEsQ0FBSSxDQUFBLFNBQVEsU0FBUztBQUNqRixZQUFFLENBQUcsQ0FBQSxJQUFHLE1BQU0sQUFBQyxDQUFDLFdBQVUsU0FBUyxFQUFFLEVBQUksQ0FBQSxTQUFRLFNBQVMsQ0FBQyxDQUFBLENBQUksQ0FBQSxTQUFRLFNBQVM7QUFBQSxRQUNwRixDQUFDO0FBRUQsZ0JBQVEsUUFBUSxBQUFDLENBQ2IsSUFBRyxDQUNILENBQUEsUUFBTyxLQUFLLENBQ1osQ0FBQSxRQUFPLElBQUksQ0FDZixDQUFDO01BQ0wsQ0FDSixBQS9EZ0MsQ0ErRC9CO0lBRVQ7QUEvRFUsU0FBTyxDQUFBLDZCQUFrQixBQUFDLHNCQUNpQixTQUFPLENBQUMsQ0FBQztFQUN0RCxBQUFDLENBd0NrQixlQUFjLENBeENkO0lBK0ROLFlBQVUsRUFuRS9CLENBQUEsU0FBUyxBQUFEO0FBbUVPLFdBQU0sWUFBVSxDQUNmLFNBQVE7O0FBQ2hCLFNBQUcsVUFBVSxFQUFJLFVBQVEsQ0FBQztBQUUxQixBQUFNLFFBQUEsQ0FBQSxLQUFJLEVBQUksRUFBQyxLQUFJLENBQUcsTUFBSSxDQUFHLEtBQUcsQ0FBRyxPQUFLLENBQUcsTUFBSSxDQUFHLE1BQUksQ0FBRyxPQUFLLENBQUMsQ0FBQztBQUVoRSxTQUFHLFNBQVMsRUFBSTtBQUNaLFFBQUEsQ0FBRyxFQUFBO0FBQUcsUUFBQSxDQUFHLEVBQUE7QUFBQSxNQUNiLENBQUM7QUFFRCxTQUFHLElBQUksRUFBSSxDQUFBLENBQUEsQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBQ3BCLFNBQUcsSUFBSSxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUcsY0FBWSxDQUFDLENBQUM7QUFFbEMsQUFBSSxRQUFBLENBQUEsUUFBTyxFQUFJLElBQUksZ0JBQWMsQUFBQyxDQUFDLFVBQVMsQ0FBRyxHQUFDLENBQUcsS0FBRyxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQ25FLGlCQUFhLEVBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxDQUFBLEtBQUksT0FBTyxDQUFJLEdBQUUsQ0FBQSxDQUFHO0FBQ3JDLGVBQU8sV0FBVyxBQUFDLENBQ2YsR0FBSSxhQUFXLEFBQUMsQ0FBQyxLQUFJLENBQUUsQ0FBQSxDQUFDLENBQUcsS0FBRyxDQUFHLFVBQVEsQ0FBQyxDQUM5QyxDQUFDO01BQ0w7QUFBQSxBQUNBLFNBQUcsV0FBVyxBQUFDLENBQUMsUUFBTyxDQUFDLENBQUM7QUFFekIsU0FBRyxXQUFXLEFBQUMsQ0FDWCxHQUFJLGdCQUFjLEFBQUMsQ0FBQyxXQUFVLENBQUcsR0FBQyxDQUFHLEtBQUcsQ0FBRyxVQUFRLENBQy9DLFVBQUMsQUFBRCxDQUFNO0FBQ0YsQUFBSSxVQUFBLENBQUEsUUFBTyxFQUFJO0FBQ1gsYUFBRyxDQUFHLENBQUEsY0FBYSxXQUFXLEFBQUMsQ0FBQyxhQUFZLEVBQUUsQ0FBQztBQUMvQyxZQUFFLENBQUcsQ0FBQSxjQUFhLFdBQVcsQUFBQyxDQUFDLGFBQVksRUFBRSxDQUFDO0FBQUEsUUFDbEQsQ0FBQztBQUVELGdCQUFRLFNBQVMsQUFBQyxDQUFDLFFBQU8sS0FBSyxDQUFHLENBQUEsUUFBTyxJQUFJLENBQUMsQ0FBQztNQUNuRCxDQUNKLENBQ0osQ0FBQztBQUVELFNBQUcsV0FBVyxBQUFDLENBQUMsR0FBSSxnQkFBYyxBQUFDLENBQUMsWUFBVyxDQUFHLEdBQUMsQ0FBRyxLQUFHLENBQUcsVUFBUSxDQUFHLFVBQUMsQUFBRCxDQUFNO0FBQ3pFLEFBQUksVUFBQSxDQUFBLFFBQU8sRUFBSTtBQUNYLGFBQUcsQ0FBRyxDQUFBLGNBQWEsV0FBVyxBQUFDLENBQUMsYUFBWSxFQUFFLENBQUM7QUFDL0MsWUFBRSxDQUFHLENBQUEsY0FBYSxXQUFXLEFBQUMsQ0FBQyxhQUFZLEVBQUUsQ0FBQztBQUFBLFFBQ2xELENBQUM7QUFFRCxnQkFBUSxVQUFVLEFBQUMsQ0FBQyxRQUFPLEtBQUssQ0FBRyxDQUFBLFFBQU8sSUFBSSxDQUFDLENBQUM7TUFDcEQsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFHLHNCQUFzQixBQUFDLENBQUMsS0FBSSxDQUFHLG1CQUFpQixDQUFHLFVBQUEsRUFBQyxDQUFLO0FBQUMscUJBQWEsVUFBVSxBQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7TUFBQyxDQUFDLENBQUM7QUFDM0YsU0FBRyxzQkFBc0IsQUFBQyxDQUFDLE1BQUssQ0FBRyxtQkFBaUIsQ0FBRyxVQUFBLEVBQUMsQ0FBSztBQUFDLHFCQUFhLGVBQWUsQUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBO01BQUMsQ0FBQyxDQUFDO0FBRWpHLGNBQVEsS0FBSyxPQUFPLEFBQUMsQ0FBQyxJQUFHLElBQUksQ0FBQyxDQUFDO0lBaUV2QztBQWhMVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUFrSGhDLGVBQVMsQ0FBVCxVQUFXLElBQUcsQ0FBRztBQUNiLFdBQUcsSUFBSSxPQUFPLEFBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLGFBQU8sS0FBRyxDQUFDO01BQ2Y7QUFLQSwwQkFBb0IsQ0FBcEIsVUFBc0IsU0FBUSxDQUFHLENBQUEsSUFBRyxDQUFHLENBQUEsYUFBWSxDQUFHO0FBQ2xELFdBQUcsQ0FBQyxJQUFHLGlCQUFpQixDQUFHO0FBQ3ZCLGFBQUcsaUJBQWlCLEVBQUksR0FBQyxDQUFDO1FBQzlCO0FBQUEsQUFFQSxXQUFHLGlCQUFpQixDQUFFLElBQUcsaUJBQWlCLE9BQU8sQ0FBQyxFQUFJO0FBQ2xELGtCQUFRLENBQUcsVUFBUTtBQUNuQixhQUFHLENBQUcsS0FBRztBQUNULHNCQUFZLENBQUcsY0FBWTtBQUFBLFFBQy9CLENBQUE7TUFDSjtBQUdBLDRCQUFzQixDQUF0QixVQUF3QixPQUFNOzs7O0FBRXRCLGlCQUFHLE9BQU0sU0FBUyxBQUFDLENBQUMscUJBQW9CLENBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxDQUFHO0FBQ3JELDhCQUFjLEFBQUMsQ0FDWCxHQUFJLGdCQUFjLEFBQUMsQ0FDZixxQkFBb0IsQ0FBRSxDQUFBLENBQUMsS0FBSyxDQUFHLEdBQUMsT0FBUyxlQUFhLENBQ3RELFVBQUMsQUFBRCxDQUFNO0FBQ0Ysc0NBQW9CLENBQUUsQ0FBQSxDQUFDLGNBQWMsQUFBQyxDQUFDLE9BQU0sS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsQ0FDSixDQUNKLFNBQVMsQUFBQyxDQUFDLGFBQVksQ0FBQyxDQUFDO2NBQzdCO0FBQUE7QUFWSixtQkFBWSxFQUFBLENBQUcsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLGlCQUFpQixPQUFPLENBQUcsR0FBRSxDQUFBOztRQVduRDtNQUNKO0FBR0EsNEJBQXNCLENBQXRCLFVBQXdCLEFBQUQsQ0FBRztBQUN0QixXQUFHLElBQUksU0FBUyxBQUFDLENBQUMsY0FBYSxDQUFDLE9BQU8sQUFBQyxFQUFDLENBQUM7TUFDOUM7QUFHQSxZQUFNLENBQU4sVUFBUSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxPQUFNLENBQUc7QUFDbkIsV0FBRyxTQUFTLEVBQUk7QUFDWixVQUFBLENBQUcsRUFBQTtBQUNILFVBQUEsQ0FBRyxFQUFBO0FBQUEsUUFDUCxDQUFDO0FBRUQsV0FBRyxJQUFJLElBQUksQUFBQyxDQUFDO0FBQ1QsZ0JBQU0sQ0FBRyxRQUFNO0FBQ2YsWUFBRSxDQUFHLENBQUEsQ0FBQSxFQUFJLEtBQUc7QUFDWixhQUFHLENBQUcsQ0FBQSxDQUFBLEVBQUksS0FBRztBQUFBLFFBQ2pCLENBQUMsQ0FBQztBQUVGLFdBQUcsd0JBQXdCLEFBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQztNQUN6QztBQUdBLFNBQUcsQ0FBSCxVQUFLLEFBQUQsQ0FBRztBQUNILFdBQUcsSUFBSSxJQUFJLEFBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBRyxPQUFLLENBQUMsQ0FBQyxDQUFDO0FBQy9CLFdBQUcsd0JBQXdCLEFBQUMsRUFBQyxDQUFDO01BQ2xDO0FBQUEsU0EvS3dGLENBQUM7RUFDckYsQUFBQyxFQUFDOztBQUhWLFNBQUEsYUFBd0I7QUFBRSx3QkFBd0I7SUFBRSxFQUE3Qjs7OztBQUF2QixBQUFJLElBQUEsQ0FBQSxZQUFXLDRCQUFvQixDQUFDO0lDRXZCLGNBQVksRUFGekIsQ0FBQSxTQUFTLEFBQUQ7QUFFRCxXQUFNLGNBQVksQ0FDVCxTQUFRLENBQUc7QUFDbkIsU0FBRyxVQUFVLEVBQUksVUFBUSxDQUFDO0lBQzlCO0FBMEJKLEFBN0JVLFNBQU8sQ0FBQSw2QkFBa0IsQUFBQztBQUtoQyxRQUFJLFdBQVMsRUFBSTtBQUNiLGFBQU8sQ0FBQSxJQUFHLFVBQVUsV0FBVyxDQUFDO01BQ3BDO0FBRUEsU0FBRyxDQUFILFVBQUssQUFBbUQsQ0FBRztVQUF0RCxNQUFJLDZDQUFJLENBQUEsYUFBWSxNQUFNLFFBQVE7VUFBRyxRQUFNLDZDQUFJLE1BQUk7QUFDcEQsV0FBRyxPQUFNLENBQUc7QUFDUixlQUFPLENBQUEsc0NBQXFDLEVBQ3RDLENBQUEsa0JBQWlCLEFBQUMsQ0FBQyxJQUFHLEtBQUssQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUMsS0FBTztBQUNILGlCQUFRLEtBQUk7QUFDUixlQUFLLENBQUEsYUFBWSxNQUFNLFFBQVE7QUFDM0IsbUJBQU8sQ0FBQSxJQUFHLFVBQVUsQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFDLENBQUM7QUFBQSxBQUMxQyxlQUFLLENBQUEsYUFBWSxNQUFNLE9BQU87QUFDMUIsbUJBQU8sQ0FBQSxJQUFHLFVBQVUsQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFHLEtBQUcsQ0FBRyxFQUFBLENBQUMsQ0FBQztBQUFBLFVBQ3ZEO1FBQ0o7QUFBQSxNQUNKO0FBQUEsT0FFQSxHQUFXLE1BQUksRUFBSTtBQUNmLGFBQU87QUFDSCxlQUFLLENBQUcsRUFBQTtBQUNSLGdCQUFNLENBQUcsRUFBQTtBQUFBLFFBQ2IsQ0FBQTtNQUNKLEVBNUJ3RixDQUFDO0VBQ3JGLEFBQUMsRUFBQztJQThCRyxhQUFXLEVBakN4QixDQUFBLFNBQVMsQUFBRCxDQUFHO0FBaUNKLFdBQU0sYUFBVyxDQUNSLFNBQVEsQ0FBRyxDQUFBLE1BQUssQ0FBRztBQUMzQixjQUFRLFdBQVcsQUFBQyxDQUNoQixJQUFHLE1BQU0sQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUNyQixDQUFDO0lBQ0w7QUFFSixBQXRDVSxTQUFPLENBQUEsNkJBQWtCLEFBQUMsc0JBQXdELENBQUM7RUFDckYsQUFBQyxFQUFDO0FBSFY7QUFBQSxzQkFBd0I7QUFBRSwwQkFBd0I7SUFBRTtBQUFwRCxxQkFBd0I7QUFBRSx5QkFBd0I7SUFBRTtBQUFBLEdBQTdCOzs7O0FBQXZCLEFBQUksSUFBQSxDQUFBLFlBQVcsNEJBQW9CLENBQUM7O0FDQTVCLGtCQUFZO0FBQUcsaUJBQVc7SUFFNUIsY0FBWSxFQUZsQixDQUFBLFNBQVMsQUFBRCxDQUFHO0FBRVgsV0FBTSxjQUFZLENBQ0YsV0FBVSxDQUFHO0FBQ3JCLFNBQUcsQ0FBQyxXQUFVLENBQUc7QUFDYixXQUFHLElBQUksRUFBSSxDQUFBLENBQUEsQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDO01BQ3pCLEtBQU87QUFDSCxXQUFHLElBQUksRUFBSSxDQUFBLENBQUEsQUFBQyxDQUFDLEdBQUUsRUFBSSxZQUFVLENBQUEsQ0FBSSxJQUFFLENBQUMsQ0FBQTtNQUN4QztBQUFBLElBQ0o7QUFDSixBQVJVLFNBQU8sQ0FBQSw2QkFBa0IsQUFBQyx1QkFBd0QsQ0FBQztFQUNyRixBQUFDLEVBQUM7SUFtQkosZUFBYSxFQXRCbkIsQ0FBQSxTQUFTLFFBQU8sQ0FBRztBQXNCbkIsV0FBTSxlQUFhLENBQ0gsSUFBRztBQUNYLEFBeEJSLHFDQUFpQixnQkFBa0IsS0FBZCxBQXdCYixNQUFNLEFBeEIwQixDQXdCekI7QUFFUCxTQUFHLElBQUksU0FBUyxBQUFDLENBQUMsZ0JBQWUsQ0FBQyxDQUFDO0FBQ25DLFNBQUcsSUFBSSxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztJQUUzQjtBQTNCVSxTQUFPLENBQUEsNkJBQWtCLEFBQUMsd0JBQ2lCLFNBQU8sQ0FBQyxDQUFDO0VBQ3RELEFBQUMsQ0FrQm9CLGFBQVksQ0FsQmQ7SUEyQnJCLFdBQVMsRUEvQmYsQ0FBQSxTQUFTLFFBQU87QUErQmhCLFdBQU0sV0FBUyxDQUNDLEFBQUQ7QUFDUCxBQWpDUixxQ0FBaUIsWUFBa0IsS0FBZCxBQWlDYixNQUFNLEFBakMwQixDQWlDekI7QUFFUCxTQUFHLElBQUksS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFHLE9BQUssQ0FBQyxDQUFDO0FBRTNCLFNBQUcsT0FBTyxBQUFDLENBQUMsR0FBSSxlQUFhLEFBQUMsQ0FBQyx5Q0FBd0MsQ0FBQyxDQUFDLENBQUM7QUFDMUUsU0FBRyxPQUFPLEFBQUMsQ0FBQyxHQUFJLGVBQWEsQUFBQyxDQUFDLGlEQUFnRCxDQUFDLENBQUMsQ0FBQztBQUNsRixTQUFHLE9BQU8sQUFBQyxDQUFDLEdBQUksZUFBYSxBQUFDLENBQUMsa0RBQWlELENBQUMsQ0FBQyxDQUFDO0FBQ25GLFNBQUcsT0FBTyxBQUFDLENBQUMsR0FBSSxlQUFhLEFBQUMsQ0FBQywwSEFBeUgsQ0FBQyxDQUFDLENBQUM7SUFNbks7QUE1Q1UsU0FBTyxDQUFBLDZCQUFrQixBQUFDLGNBeUNoQyxNQUFLLENBQUwsVUFBTyxJQUFHLENBQUc7QUFDVCxXQUFHLElBQUksT0FBTyxBQUFDLENBQUMsSUFBRyxJQUFJLENBQUMsQ0FBQztNQUM3QixNQTFDaUQsU0FBTyxDQUFDLENBQUM7RUFDdEQsQUFBQyxDQTJCZ0IsYUFBWSxDQTNCVjtJQTZDckIsaUJBQWUsRUFqRHJCLENBQUEsU0FBUyxRQUFPLENBQUc7QUFpRG5CLFdBQU0saUJBQWUsQ0FDTCxhQUFZLENBQUcsQ0FBQSxJQUFHLENBQUcsQ0FBQSxLQUFJLENBQUcsQ0FBQSxXQUFVO0FBQzlDLEFBbkRSLHFDQUFpQixrQkFBa0IsS0FBZCxBQW1EYixNQUFNLFlBQVUsQ0FBQyxBQW5EZSxDQW1EZDtBQUVsQixTQUFHLElBQUksU0FBUyxBQUFDLENBQUMsUUFBTyxDQUFDLENBQUM7QUFDM0IsU0FBRyxJQUFJLFNBQVMsQUFBQyxDQUFDLGFBQVksQ0FBQyxDQUFDO0FBRWhDLFNBQUcsSUFBSSxPQUFPLEFBQUMsQ0FDWCxDQUFBLEFBQUMsQ0FBQyxPQUFNLENBQUMsS0FDRCxBQUFDLENBQUMsS0FBSSxDQUFHLENBQUEsVUFBUyxFQUFJLEtBQUcsQ0FBQSxDQUFJLE9BQUssQ0FBQyxLQUNuQyxBQUFDLENBQUMsS0FBSSxDQUFHLE1BQUksQ0FBQyxLQUNkLEFBQUMsQ0FBQyxPQUFNLENBQUcsTUFBSSxDQUFDLENBQzVCLENBQUM7SUFFVDtBQTdEVSxTQUFPLENBQUEsNkJBQWtCLEFBQUMsMEJBQ2lCLFNBQU8sQ0FBQyxDQUFDO0VBQ3RELEFBQUMsQ0E2Q3NCLGFBQVksQ0E3Q2hCO0lBNkROLGFBQVcsRUFqRWhDLENBQUEsU0FBUyxRQUFPO0FBaUVELFdBQU0sYUFBVyxDQUNoQixTQUFRO0FBQ2hCLEFBbkVSLHFDQUFpQixjQUFrQixLQUFkLEFBbUViLE1BQU0sQUFuRTBCLENBbUV6QjtBQUVQLEFBQU0sUUFBQSxDQUFBLEVBQUMsRUFBSSxlQUFhLENBQUM7QUFFekIsU0FBRyxJQUFJLEtBQUssQUFBQyxDQUFDLElBQUcsQ0FBRyxHQUFDLENBQUMsQ0FBQztBQU12QixBQUFJLFFBQUEsQ0FBQSxrQkFBaUIsQ0FBQztBQUV0QixBQUFJLFFBQUEsQ0FBQSxZQUFXLEVBQUksSUFBSSxpQkFBZSxBQUFDLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBRyxtQkFBaUIsQ0FBRyxJQUFFLENBQUMsQ0FBQztBQUNwRixpQkFBVyxJQUFJLEdBQUcsQUFBQyxDQUFDLE9BQU0sQ0FBRyxVQUFDLEFBQUQ7QUFDekIsQUFBSSxVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsQ0FBQSxBQUFDLENBQUMsT0FBTSxDQUFDLFNBQ1YsQUFBQyxDQUFDLGNBQWEsQ0FBQyxTQUNoQixBQUFDLENBQUMsUUFBTyxDQUFDLENBQUM7QUFFdkIsQUFBSSxVQUFBLENBQUEsVUFBUyxFQUFJLGFBQVcsQ0FBQztBQUU3QixhQUFLLE9BQU8sQUFBQyxDQUNULENBQUEsQUFBQyxDQUFDLHVCQUFzQixDQUFDLEtBQUssQUFBQyxDQUFDLElBQUcsQ0FBRyxXQUFTLENBQUMsQ0FDcEQsT0FBTyxBQUFDLENBQ0osQ0FBQSxBQUFDLENBQUMsS0FBSSxDQUFDLEtBQ0MsQUFBQyxDQUFDO0FBQ0YsZUFBSyxDQUFHLElBQUU7QUFDVixnQkFBTSxDQUFHLFNBQU87QUFBQSxRQUNwQixDQUFDLE9BQ0ssQUFBQyxDQUNILENBQUEsQUFBQyxDQUFDLE9BQU0sQ0FBQyxLQUFLLEFBQUMsQ0FBQyxLQUFJLENBQUcscUJBQW1CLENBQUMsQ0FDL0MsT0FDTSxBQUFDLENBQUMsbUJBQWtCLENBQUMsR0FDekIsQUFBQyxDQUFDLE9BQU0sQ0FBRyxVQUFDLEFBQUQsQ0FBTTtBQUNmLEFBQUksWUFBQSxDQUFBLFNBQVEsRUFBSSxDQUFBLENBQUEsQUFBQyxDQUFDLEdBQUUsRUFBRSxXQUFTLENBQUMsQ0FBQztBQUdqQyxBQUFJLFlBQUEsQ0FBQSxZQUFXLEVBQUksQ0FBQSxTQUFRLElBQUksQUFBQyxFQUFDLENBQUM7QUFHbEMsMkJBQWlCLE1BQU0sQUFBQyxFQUFDLENBQUM7QUFHMUIsWUFBSSxhQUFXLEFBQUMsQ0FBQyxTQUFRLENBQUcsYUFBVyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUNULENBQUM7QUFFRCx5QkFBaUIsRUFBSSxDQUFBLElBQUcsQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO01BQ3JDLENBQUMsQ0FBQztBQUVGLFNBQUcsT0FBTyxBQUFDLENBQUMsWUFBVyxDQUFDLENBQUM7QUFJekIsQUFBSSxRQUFBLENBQUEsWUFBVyxFQUFJLElBQUksaUJBQWUsQUFBQyxDQUFDLFFBQU8sQ0FBRyxTQUFPLENBQUcsc0JBQW9CLENBQUcsSUFBRSxDQUFDLENBQUM7QUFDdkYsaUJBQVcsSUFBSSxHQUFHLEFBQUMsQ0FBQyxPQUFNLENBQUcsVUFBQyxBQUFELENBQU07QUFDL0IsQUFBSSxVQUFBLENBQUEsSUFBRyxFQUFJLElBQUksY0FBWSxBQUFDLENBQUMsU0FBUSxDQUFDLENBQUM7QUFHdkMsQUFBSSxVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsQ0FBQSxBQUFDLENBQUMsT0FBTSxDQUFDLFNBQ1YsQUFBQyxDQUFDLGNBQWEsQ0FBQyxTQUNoQixBQUFDLENBQUMsUUFBTyxDQUFDLENBQUM7QUFHdkIsYUFBSyxPQUFPLEFBQUMsQ0FDVCxDQUFBLEFBQUMsQ0FBQyxPQUFNLENBQUMsT0FBTyxBQUFDLENBQ2IsQ0FBQSxBQUFDLENBQUMsUUFBTyxDQUFDLEtBQ0YsQUFBQyxDQUNELElBQUcsS0FBSyxBQUFDLENBQUMsYUFBWSxNQUFNLE9BQU8sQ0FBQyxDQUN4QyxDQUNSLENBQ0osQ0FBQztBQUdELGFBQUssT0FBTyxBQUFDLENBQ1QsQ0FBQSxBQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQUFBQyxDQUFDO0FBQ1YsZUFBSyxDQUFHLENBQUEsSUFBRyxLQUFLLEFBQUMsQ0FBQyxhQUFZLE1BQU0sT0FBTyxDQUFHLEtBQUcsQ0FBQztBQUNsRCxnQkFBTSxDQUFHLFdBQVM7QUFDbEIsbUJBQVMsQ0FBRyxlQUFhO0FBQUEsUUFDN0IsQ0FBQyxPQUFPLEFBQUMsQ0FDTCxDQUFBLEFBQUMsQ0FBQyxPQUFNLENBQUMsS0FBSyxBQUFDLENBQUMsS0FBSSxDQUFHLHFCQUFtQixDQUFDLENBQy9DLE9BQU8sQUFBQyxDQUFDLGdCQUFlLENBQUMsQ0FDN0IsQ0FBQztBQUNELGFBQUssT0FBTyxBQUFDLENBQ1QsQ0FBQSxBQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQUFBQyxDQUFDO0FBQ1YsZUFBSyxDQUFHLENBQUEsSUFBRyxLQUFLLEFBQUMsQ0FBQyxhQUFZLE1BQU0sUUFBUSxDQUFHLEtBQUcsQ0FBQztBQUNuRCxnQkFBTSxDQUFHLFdBQVM7QUFDbEIsbUJBQVMsQ0FBRyxtQkFBaUI7QUFBQSxRQUNqQyxDQUFDLE9BQU8sQUFBQyxDQUNMLENBQUEsQUFBQyxDQUFDLE9BQU0sQ0FBQyxLQUFLLEFBQUMsQ0FBQyxLQUFJLENBQUcscUJBQW1CLENBQUMsQ0FDL0MsT0FBTyxBQUFDLENBQUMsZUFBYyxDQUFDLENBQzVCLENBQUM7QUFFRCxXQUFHLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztNQUNoQixDQUFDLENBQUM7QUFFRixTQUFHLE9BQU8sQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBSXpCLEFBQUksUUFBQSxDQUFBLElBQUcsRUFBSSxJQUFJLGlCQUFlLEFBQUMsQ0FBQyxNQUFLLENBQUcsT0FBSyxDQUFHLGVBQWEsQ0FBRyxJQUFFLENBQUMsQ0FBQztBQUNwRSxTQUFHLElBQUksR0FBRyxBQUFDLENBQUMsV0FBVSxDQUFHLFVBQUMsQUFBRCxDQUFNO0FBQzNCLFFBQUEsQUFBQyxDQUFDLE9BQU0sQ0FBQyxTQUFTLEFBQUMsQ0FBQyxTQUFRLENBQUMsQ0FBQztNQUNsQyxDQUFDLEdBQUcsQUFBQyxDQUFDLFVBQVMsQ0FBRyxVQUFDLEFBQUQsQ0FBTTtBQUNwQixRQUFBLEFBQUMsQ0FBQyxPQUFNLENBQUMsWUFBWSxBQUFDLENBQUMsU0FBUSxDQUFDLENBQUM7TUFDckMsQ0FBQyxDQUFDO0FBRUYsU0FBRyxJQUFJLEtBQUssQUFBQyxDQUFDO0FBQ1YsYUFBSyxDQUFHLG1CQUFpQjtBQUN6QixrQkFBVSxDQUFHLEdBQUM7QUFBQSxNQUNsQixDQUFDLENBQUM7QUFDRixTQUFHLE9BQU8sQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBRWpCLGNBQVEsS0FBSyxNQUFNLEFBQUMsQ0FBQyxJQUFHLElBQUksQ0FBQyxDQUFDO0FBQzlCLGNBQVEsS0FBSyxNQUFNLEFBQUMsQ0FBQyxHQUFJLFdBQVMsQUFBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBTWxEO0FBeExVLFNBQU8sQ0FBQSw2QkFBa0IsQUFBQyxnQkFxTGhDLE1BQUssQ0FBTCxVQUFPLFFBQU8sQ0FBRztBQUNiLFdBQUcsSUFBSSxPQUFPLEFBQUMsQ0FBQyxRQUFPLElBQUksQ0FBQyxDQUFDO01BQ2pDLE1BdExpRCxTQUFPLENBQUMsQ0FBQztFQUN0RCxBQUFDLENBNkRpQyxhQUFZLENBN0QzQjs7QUFKM0IsU0FBQSxhQUF3QjtBQUFFLHlCQUF3QjtJQUFFLEVBQTdCOzs7O0FBQXZCLEFBQUksSUFBQSxDQUFBLFlBQVcsMEJBQW9CLENBQUM7SUNBN0IsTUFBSTtJQUVMLFlBQVUsRUFGaEIsQ0FBQSxTQUFTLEFBQUQsQ0FBRztBQUVYLFdBQU0sWUFBVSxDQUNBLFdBQVUsQ0FBRyxDQUFBLEtBQUksQ0FBRyxDQUFBLFdBQVUsQ0FBRztBQUN6QyxTQUFHLFlBQVksRUFBSSxZQUFVLENBQUE7QUFDN0IsU0FBRyxNQUFNLEVBQUksTUFBSSxDQUFBO0FBQ2pCLFNBQUcsWUFBWSxFQUFJLFlBQVUsQ0FBQTtJQUNqQztBQUNKLEFBTlUsU0FBTyxDQUFBLDZCQUFrQixBQUFDLHFCQUF3RCxDQUFDO0VBQ3JGLEFBQUMsRUFBQztJQVFXLFdBQVMsRUFYOUIsQ0FBQSxTQUFTLEFBQUQ7QUFXTyxXQUFNLFdBQVMsQ0FDZCxTQUFRLENBQUc7QUFDbkIsU0FBRyxVQUFVLEVBQUksVUFBUSxDQUFBO0FBR3pCLFNBQUcsYUFBYSxFQUFJLElBQUksSUFBRSxBQUFDLEVBQUMsQ0FBQztBQUc3QixTQUFHLE1BQU0sRUFBSSxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUM7QUFDdEIsU0FBRyxLQUFLLEVBQUksRUFBQSxDQUFBO0FBRVosU0FBRyxpQkFBaUIsRUFBSSxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUE7QUFDaEMsU0FBRyx5QkFBeUIsRUFBSSxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUE7SUFFNUM7QUFvSEosQUEzSVUsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBeUJoQyxRQUFFLENBQUYsVUFBSSxBQUFELENBQUc7QUFDRixXQUFHLEtBQUssRUFBRSxDQUFDO0FBQ1gsY0FBTSxJQUFHLE1BQU0sSUFBSSxBQUFDLENBQUMsSUFBRyxLQUFLLENBQUMsQ0FBRztBQUM3QixhQUFHLEtBQUssQUFBQyxFQUFDLENBQUE7QUFDVixhQUFHLE1BQU0sT0FBTyxBQUFDLENBQUMsSUFBRyxLQUFLLENBQUMsQ0FBQTtBQUMzQixhQUFHLEtBQUssRUFBRSxDQUFBO1FBQ2Q7QUFBQSxNQUNKO0FBRUEsU0FBRyxDQUFILFVBQUssQUFBRDtBQW5DQSxBQUFJLFVBQUEsT0FBb0IsS0FBRyxDQUFDO0FBQzVCLEFBQUksVUFBQSxPQUFvQixNQUFJLENBQUM7QUFDN0IsQUFBSSxVQUFBLE9BQW9CLFVBQVEsQ0FBQztBQUNqQyxVQUFJO0FBSEosY0FBUyxHQUFBLE9BRGpCLEtBQUssRUFBQSxBQUM0QjtBQUNoQixtQkFBb0IsQ0FBQSxDQW1DaUIsSUFBRyxNQUFNLElBQUksQUFBQyxDQUFDLElBQUcsS0FBSyxDQUFDLENBbkN2QixDQUFFLE1BQUssU0FBUyxDQUFDLEFBQUMsRUFBQyxDQUM3RCxFQUFDLENBQUMsTUFBb0IsQ0FBQSxDQUFDLE1BQW9CLENBQUEsU0FBcUIsQUFBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQ3pFLE9BQW9CLEtBQUcsQ0FBRzs7QUFpQ3JCLDBCQUFVO0FBQUcsb0JBQUk7QUFBRywwQkFBVTtBQUFpQztBQUVyRSxpQkFBRyxJQUFHLHlCQUF5QixJQUFJLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBRztBQUMvQyx3QkFBTztjQUNYO0FBQUEsQUFHQSxpQkFBSSxJQUFHLGlCQUFpQixJQUFJLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBRztBQUV4QyxBQUFJLGtCQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxpQkFBaUIsSUFBSSxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUE7QUFHbEQsbUJBQUcsTUFBSyxJQUFJLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBRztBQUlsQixxQkFBRyxNQUFLLEtBQUssRUFBSSxFQUFBLENBQUc7QUFDaEIsd0JBQUksRUFBSSxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUE7a0JBQ2xDO0FBQUEsQUFHQSxxQkFBRyx5QkFBeUIsSUFBSSxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUE7Z0JBR2pELEtBQU87QUFDSCx1QkFBSyxJQUFJLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQTtnQkFDcEI7QUFBQSxBQUdBLG1CQUFHLGlCQUFpQixJQUFJLEFBQUMsQ0FBQyxXQUFVLENBQUcsT0FBSyxDQUFDLENBQUE7Y0FDakQ7QUFBQSxBQUVBLGlCQUFHLFlBQVksRUFBSSxZQUFVLENBQUE7QUFXN0IsaUJBQUcsV0FBVSxDQUFHO0FBQ1osbUJBQUcsZUFBZSxBQUFDLENBQUMsV0FBVSxDQUFHLFlBQVUsQ0FBQyxDQUFBO2NBQ2hEO0FBQUEsQUFFQSxpQkFBSSxDQUFDLElBQUcsaUJBQWlCLElBQUksQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFBLEVBQUssQ0FBQSxJQUFHLG1CQUFtQixBQUFDLENBQUMsV0FBVSxDQUFDLElBQUksQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFHO0FBQ2xHLG1CQUFHLGlCQUFpQixJQUFJLEFBQUMsQ0FBQyxXQUFVLENBQUcsSUFBSSxJQUFFLEFBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtjQUMzRDtBQUFBLEFBSUksZ0JBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxJQUFHLFVBQVUsaUJBQWlCLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBQTtBQUMzRCxpQkFBRyxTQUFRLENBQUc7QUFDVix3QkFBUSxTQUFTLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQTtjQUM1QjtBQUFBLFlBQ0o7VUF2RkE7QUFBQSxRQURBLENBQUUsWUFBMEI7QUFDMUIsZUFBb0IsS0FBRyxDQUFDO0FBQ3hCLG9CQUFvQyxDQUFDO1FBQ3ZDLENBQUUsT0FBUTtBQUNSLFlBQUk7QUFDRixlQUFJLEtBQWlCLEdBQUssQ0FBQSxXQUF1QixHQUFLLEtBQUcsQ0FBRztBQUMxRCx3QkFBd0IsQUFBQyxFQUFDLENBQUM7WUFDN0I7QUFBQSxVQUNGLENBQUUsT0FBUTtBQUNSLG9CQUF3QjtBQUN0Qix3QkFBd0I7WUFDMUI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLEFBNEVBLFdBQUcsWUFBWSxFQUFJLFVBQVEsQ0FBQTtNQUMvQjtBQUdBLG1CQUFhLENBQWIsVUFBZSxXQUFVLENBQUcsQ0FBQSxzQkFBcUIsQ0FBRztBQUNoRCxXQUFHLENBQUMsSUFBRyxhQUFhLElBQUksQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFHO0FBQ3BDLGFBQUcsYUFBYSxJQUFJLEFBQUMsQ0FBQyxXQUFVLENBQUcsSUFBSSxJQUFFLEFBQUMsRUFBQyxDQUFDLENBQUE7UUFDaEQ7QUFBQSxBQUVBLFdBQUcsYUFBYSxJQUFJLEFBQUMsQ0FBQyxXQUFVLENBQUMsSUFBSSxBQUFDLENBQUMsc0JBQXFCLENBQUMsQ0FBQTtNQUNqRTtBQUdBLHVCQUFpQixDQUFqQixVQUFtQixXQUFVO0FBQ3pCLFdBQUcsQ0FBQyxJQUFHLGFBQWEsSUFBSSxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUc7QUFDcEMsYUFBRyxhQUFhLElBQUksQUFBQyxDQUFDLFdBQVUsQ0FBRyxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUMsQ0FBQTtRQUNoRDtBQUFBLEFBRUksVUFBQSxDQUFBLEdBQUUsRUFBSSxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUE7QUFFbEIsV0FBRyxhQUFhLElBQUksQUFBQyxDQUFDLFdBQVUsQ0FBQyxRQUFRLEFBQUMsQ0FBQyxHQUFFLElBQUksQ0FBRyxJQUFFLENBQUMsQ0FBQztBQUV4RCxBQUFJLFVBQUEsQ0FBQSxRQUFPLEVBQUksRUFBQSxDQUFBO0FBQ2YsQUFBSSxVQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsR0FBRSxLQUFLLENBQUE7QUFDbEIsY0FBTSxRQUFPLEVBQUksS0FBRyxDQUFHO0FBdEh2QixBQUFJLFlBQUEsT0FBb0IsS0FBRyxDQUFDO0FBQzVCLEFBQUksWUFBQSxPQUFvQixNQUFJLENBQUM7QUFDN0IsQUFBSSxZQUFBLE9BQW9CLFVBQVEsQ0FBQztBQUNqQyxZQUFJO0FBSEosZ0JBQVMsR0FBQSxPQURqQixLQUFLLEVBQUEsQUFDNEI7QUFDaEIscUJBQW9CLENBQUEsQ0FzSEgsR0FBRSxDQXRIbUIsQ0FBRSxNQUFLLFNBQVMsQ0FBQyxBQUFDLEVBQUMsQ0FDN0QsRUFBQyxDQUFDLE1BQW9CLENBQUEsQ0FBQyxNQUFvQixDQUFBLFNBQXFCLEFBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUN6RSxPQUFvQixLQUFHLENBQUc7Z0JBb0hsQixVQUFRO0FBQVU7QUFDdkIsbUJBQUksSUFBRyxhQUFhLElBQUksQUFBQyxDQUFDLFNBQVEsQ0FBQyxDQUFHO0FBQ2xDLHFCQUFHLGFBQWEsSUFBSSxBQUFDLENBQUMsU0FBUSxDQUFDLFFBQVEsQUFBQyxDQUFDLEdBQUUsSUFBSSxDQUFHLElBQUUsQ0FBQyxDQUFDO2dCQUMxRDtBQUFBLGNBQ0o7WUFySEo7QUFBQSxVQURBLENBQUUsWUFBMEI7QUFDMUIsaUJBQW9CLEtBQUcsQ0FBQztBQUN4QixzQkFBb0MsQ0FBQztVQUN2QyxDQUFFLE9BQVE7QUFDUixjQUFJO0FBQ0YsaUJBQUksS0FBaUIsR0FBSyxDQUFBLFdBQXVCLEdBQUssS0FBRyxDQUFHO0FBQzFELDBCQUF3QixBQUFDLEVBQUMsQ0FBQztjQUM3QjtBQUFBLFlBQ0YsQ0FBRSxPQUFRO0FBQ1Isc0JBQXdCO0FBQ3RCLDBCQUF3QjtjQUMxQjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsQUEwR0ksaUJBQU8sRUFBSSxLQUFHLENBQUE7QUFDZCxhQUFHLEVBQUksQ0FBQSxHQUFFLEtBQUssQ0FBQTtRQUNsQjtBQUFBLEFBRUEsYUFBTyxJQUFFLENBQUE7TUFDYjtBQUVBLGlCQUFXLENBQVgsVUFBYSxXQUFVLENBQUcsQ0FBQSxLQUFJLENBQUc7QUFDN0IsQUFBSSxVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxLQUFLLEVBQUksRUFBQSxDQUFBO0FBRXpCLFdBQUcsQ0FBQyxJQUFHLE1BQU0sSUFBSSxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUc7QUFDeEIsYUFBRyxNQUFNLElBQUksQUFBQyxDQUFDLE1BQUssQ0FBRyxHQUFDLENBQUMsQ0FBQTtRQUM3QjtBQUFBLEFBRUEsV0FBRyxNQUFNLElBQUksQUFBQyxDQUFDLE1BQUssQ0FBQyxLQUFLLEFBQUMsQ0FBQyxHQUFJLFlBQVUsQUFBQyxDQUFDLFdBQVUsQ0FBRyxNQUFJLENBQUcsQ0FBQSxJQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7TUFDdEY7QUFBQSxTQTFJd0YsQ0FBQztFQUNyRixBQUFDLEVBQUM7O0FBSFYsU0FBQSxhQUF3QjtBQUFFLHVCQUF3QjtJQUFFLEVBQTdCOzs7O0FBQXZCLEFBQUksSUFBQSxDQUFBLFlBQVcsOEJBQW9CLENBQUM7SUNFZixHQUFDLEVBRnRCLENBQUEsU0FBUyxBQUFEO0FBRU8sV0FBTSxHQUFDLENBRlYsQUFBRCxDQUFHLEdBQUM7QUFpQ2YsQUEvQlUsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBQ3pCLGFBQU8sQ0FBZCxVQUFnQixHQUFFLENBQUc7QUFDakIsYUFBTyxDQUFBLENBQUEsT0FBTyxBQUFDLENBQUMsSUFBRyxDQUFHLEdBQUMsQ0FBRyxJQUFFLENBQUMsQ0FBQztNQUNsQztBQUVPLGdDQUEwQixDQUFqQyxVQUFtQyxLQUFJLENBQUcsQ0FBQSxJQUFHO0FBQ3pDLEFBQUksVUFBQSxDQUFBLGlCQUFnQixFQUFJLFVBQUEsS0FBSSxDQUFLO0FBQzdCLEFBQUksWUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLE1BQUssTUFBTSxHQUFLLE1BQUksQ0FBQztBQUNqQyxjQUFJLE1BQU0sRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUMsQ0FBQyxDQUFBLENBQUcsQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFDLEtBQUksV0FBVyxHQUFLLEVBQUMsS0FBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFNUUsYUFBRyxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUE7QUFFVixlQUFPLE1BQUksQ0FBQztRQUNoQixDQUFBO0FBR0EsQUFBSSxVQUFBLENBQUEsVUFBUyxFQUFJLENBQUEsUUFBTyxjQUFjLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQztBQUU5QyxXQUFJLFVBQVMsaUJBQWlCLENBQUc7QUFFN0IsbUJBQVMsaUJBQWlCLEFBQUMsQ0FBQyxZQUFXLENBQUcsa0JBQWdCLENBQUcsTUFBSSxDQUFDLENBQUM7QUFFbkUsbUJBQVMsaUJBQWlCLEFBQUMsQ0FBQyxnQkFBZSxDQUFHLGtCQUFnQixDQUFHLE1BQUksQ0FBQyxDQUFDO1FBQzNFLEtBQVE7QUFFSixtQkFBUyxZQUFZLEFBQUMsQ0FBQyxjQUFhLENBQUcsa0JBQWdCLENBQUMsQ0FBQztRQUM3RDtBQUFBLEFBQ0EsaUJBQVMsaUJBQWlCLEFBQUMsQ0FBQyxZQUFXLENBQUcsVUFBUyxDQUFBLENBQUc7QUFDbEQsZ0JBQU0sSUFBSSxBQUFDLENBQUMsT0FBTSxDQUFHLEVBQUEsQ0FBQyxDQUFBO1FBQzFCLENBQUcsTUFBSSxDQUFDLENBQUE7TUFDWjtLQTlCd0YsQ0FBQztFQUNyRixBQUFDLEVBQUM7O0FBSFYsU0FBQSxhQUF3QjtBQUFFLGVBQXdCO0lBQUUsRUFBN0I7Ozs7QUFBdkIsQUFBSSxJQUFBLENBQUEsWUFBVyxzQkFBb0IsQ0FBQztJQ0V4QixPQUFLO0lBQ0wsZUFBYTtJQUNsQixNQUFJO0lBQ0osWUFBVTtJQUNWLGFBQVc7SUFDWCxXQUFTO0lBQ1QsR0FBQztJQUVGLFFBQU0sRUFWWixDQUFBLFNBQVMsQUFBRCxDQUFHO0FBVVgsV0FBTSxRQUFNLENBQ0ksSUFBRyxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsS0FBSSxDQUFHLENBQUEsTUFBSyxDQUFHO0FBQ2xDLFNBQUcsS0FBSyxFQUFJO0FBQUUsV0FBRyxDQUFILEtBQUc7QUFBRyxVQUFFLENBQUYsSUFBRTtBQUFHLFlBQUksQ0FBSixNQUFJO0FBQUcsYUFBSyxDQUFMLE9BQUs7QUFBQSxNQUFFLENBQUE7QUFFdkMsU0FBRyxLQUFLLEVBQUksRUFBQSxDQUFBO0FBQ1osU0FBRyxVQUFVLEVBQUksRUFBQSxDQUFBO0FBQ2pCLFNBQUcsU0FBUyxFQUFJLEVBQUEsQ0FBQTtJQUNwQjtBQXFCSixBQXBDVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUFpQmhDLFFBQUksTUFBSSxFQUFJO0FBQ1IsYUFBTyxDQUFBLElBQUcsS0FBSyxNQUFNLEVBQUksQ0FBQSxJQUFHLEtBQUssQ0FBQTtNQUNyQztBQUVBLFFBQUksT0FBSyxFQUFJO0FBQ1QsYUFBTyxDQUFBLElBQUcsS0FBSyxPQUFPLEVBQUksQ0FBQSxJQUFHLEtBQUssQ0FBQTtNQUN0QztBQUVBLFFBQUksS0FBRyxFQUFJO0FBQ1AsYUFBTyxDQUFBLElBQUcsS0FBSyxLQUFLLEVBQUksRUFBQyxJQUFHLFVBQVUsRUFBSSxDQUFBLElBQUcsS0FBSyxDQUFDLENBQUEsQ0FBSSxFQUFDLENBQUMsSUFBRyxLQUFLLE1BQU0sRUFBSSxDQUFBLElBQUcsTUFBTSxDQUFDLEVBQUksRUFBQSxDQUFDLENBQUE7TUFDOUY7QUFFQSxRQUFJLElBQUUsRUFBSTtBQUNOLGFBQU8sQ0FBQSxJQUFHLEtBQUssSUFBSSxFQUFJLEVBQUMsSUFBRyxTQUFTLEVBQUksQ0FBQSxJQUFHLEtBQUssQ0FBQyxDQUFBLENBQUksRUFBQyxDQUFDLElBQUcsS0FBSyxPQUFPLEVBQUksQ0FBQSxJQUFHLE9BQU8sQ0FBQyxFQUFJLEVBQUEsQ0FBQyxDQUFBO01BQzlGO0FBRUEsUUFBSSxJQUFFLEVBQUk7QUFDTixlQUFVLElBQUcsS0FBSyxFQUFDLElBQUcsRUFBQyxDQUFBLElBQUcsSUFBSSxFQUFDLElBQUcsRUFBQyxDQUFBLElBQUcsTUFBTSxFQUFDLElBQUcsRUFBQyxDQUFBLElBQUcsT0FBTyxFQUFFO01BQ2pFO0FBQUEsU0FuQ3dGLENBQUM7RUFDckYsQUFBQyxFQUFDO0lBcUNXLElBQUUsRUF4Q3ZCLENBQUEsU0FBUyxBQUFEO0FBd0NPLFdBQU0sSUFBRSxDQUNQLE1BQUssQ0FBRyxDQUFBLFFBQU87O0FBQ3ZCLFNBQUcsS0FBSyxFQUFJLENBQUEsQ0FBQSxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7QUFFckIsU0FBRyxTQUFTLEVBQUksU0FBTyxDQUFDO0FBRXhCLFNBQUcsTUFBTSxFQUFJLEdBQUMsQ0FBQztBQUNmLFNBQUcsTUFBTSxFQUFJLEdBQUMsQ0FBQztBQUVmLFNBQUcsa0JBQWtCLEVBQUksS0FBRyxDQUFBO0FBQzVCLFNBQUcsV0FBVyxFQUFJLElBQUksV0FBUyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFHdEMsU0FBRyxNQUFNLEVBQUksQ0FBQSxDQUFBLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUN4QixTQUFHLEtBQUssUUFBUSxBQUFDLENBQUMsSUFBRyxNQUFNLENBQUMsQ0FBQztBQUc3QixBQUFJLFFBQUEsQ0FBQSxPQUFNLEVBQUksSUFBSSxDQUFBLE1BQUssUUFBUSxBQUFDLENBQUMsTUFBSyxDQUFHLENBQUEsSUFBRyxTQUFTLENBQUcsQ0FBQSxJQUFHLFNBQVMsQ0FBQyxDQUFDO0FBRXRFLEFBQUksUUFBQSxDQUFBLGFBQVksRUFBSSxDQUFBLEdBQUksQ0FBQSxNQUFLLGVBQWUsQUFBQyxFQUFDLE9BQ3BDLEFBQUMsQ0FBQyxHQUFJLENBQUEsTUFBSyxjQUFjLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFDLENBQUMsT0FDaEMsQUFBQyxDQUFDLEdBQUksQ0FBQSxNQUFLLGNBQWMsQUFBQyxDQUFDLElBQUcsU0FBUyxDQUFHLEVBQUEsQ0FBQyxDQUFDLE9BQzVDLEFBQUMsQ0FBQyxHQUFJLENBQUEsTUFBSyxjQUFjLEFBQUMsQ0FBQyxJQUFHLFNBQVMsQ0FBRyxDQUFBLElBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUVuRSxZQUFNLFNBQVMsQUFBQyxDQUFDLEdBQUksQ0FBQSxNQUFLLFNBQVMsQUFBQyxDQUFDLGFBQVksQ0FBRyxVQUFRLENBQUcsRUFBQSxDQUFDLENBQUMsQ0FBQztBQUNsRSxTQUFHLFdBQVcsQUFBQyxDQUFDLE9BQU0sSUFBSSxBQUFDLEVBQUMsQ0FBQyxDQUFDO0FBRTlCLFNBQUcsV0FBVyxFQUFJLElBQUksQ0FBQSxNQUFLLFVBQVUsQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsQ0FBQSxJQUFHLE1BQU0sQ0FBRyxDQUFBLElBQUcsT0FBTyxDQUFHLGFBQVcsQ0FBRyxPQUFLLENBQUMsQ0FBQztBQUMzRixTQUFHLG1CQUFtQixBQUFDLENBQUMsSUFBRyxXQUFXLElBQUksQUFBQyxFQUFDLENBQUMsQ0FBQztBQUM5QyxTQUFHLFFBQVEsQUFBQyxFQUFDLENBQUM7QUFHZCxTQUFHLEtBQUssS0FBSyxBQUFDLENBQUMscUJBQW9CLENBQUcsaUJBQWUsQ0FBQyxDQUFBO0FBQ3RELFNBQUcsUUFBUSxFQUFJLElBQUksUUFBTSxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxDQUFBLElBQUcsTUFBTSxDQUFHLENBQUEsSUFBRyxPQUFPLENBQUMsQ0FBQTtBQUN4RCxTQUFHLGFBQWEsQUFBQyxFQUFDLENBQUE7QUFHbEIsU0FBRyxZQUFZLEVBQUksSUFBSSxZQUFVLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUl4QyxTQUFHLGFBQWEsRUFBSSxJQUFJLGFBQVcsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBRzFDLEFBQUksUUFBQSxDQUFBLE1BQUssQ0FBQztBQUNWLFNBQUcsS0FBSyxHQUFHLEFBQUMsQ0FBQyxXQUFVLENBQUcsVUFBQSxLQUFJLENBQUs7QUFDL0IsYUFBSyxFQUFJLENBQUEsa0JBQWlCLEFBQUMsQ0FBQyxLQUFJLE9BQU8sQ0FBQyxDQUFDO0FBQ3pDLFdBQUcsTUFBSyxJQUFJLFVBQVEsQ0FBRztBQUVuQixlQUFLLFlBQVksQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQzdCLEtBQU87QUFFSCx5QkFBZSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUE7UUFDMUI7QUFBQSxBQUVBLDJCQUFtQixBQUFDLEVBQUMsQ0FBQztBQUN0QixZQUFJLGVBQWUsQUFBQyxFQUFDLENBQUM7TUFDMUIsQ0FBQyxHQUFHLEFBQUMsQ0FBQyxXQUFVLENBQUcsVUFBQSxLQUFJLENBQUs7QUFDeEIsV0FBRyxNQUFLLElBQUksVUFBUSxDQUFHO0FBQ25CLGVBQUssWUFBWSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDN0IsS0FBTztBQUVILHlCQUFlLEFBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQTtRQUMxQjtBQUFBLEFBRUEsWUFBSSxlQUFlLEFBQUMsRUFBQyxDQUFDO01BQzFCLENBQUMsR0FBRyxBQUFDLENBQUMsU0FBUSxDQUFHLFVBQUMsS0FBSSxDQUFNO0FBQ3hCLFdBQUcsTUFBSyxJQUFJLFVBQVEsQ0FBRztBQUNuQixlQUFLLFVBQVUsQUFBQyxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQzNCLEtBQU87QUFFSCx1QkFBYSxBQUFDLENBQUMsS0FBSSxDQUFDLENBQUE7UUFDeEI7QUFBQSxBQUVBLGFBQUssRUFBSSxVQUFRLENBQUM7QUFFbEIsWUFBSSxlQUFlLEFBQUMsRUFBQyxDQUFDO01BQzFCLENBQUMsR0FBRyxBQUFDLENBQUMsYUFBWSxDQUFHLFVBQUEsS0FBSSxDQUFLO0FBQzFCLDhCQUFzQixBQUFDLENBQUMsS0FBSSxNQUFNLENBQUcsQ0FBQSxLQUFJLE1BQU0sQ0FBRyxDQUFBLHdCQUF1QixBQUFDLENBQUMsS0FBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLFlBQUksZUFBZSxBQUFDLEVBQUMsQ0FBQztNQUMxQixDQUFDLENBQUM7QUFFRixPQUFDLDRCQUE0QixBQUFDLENBQUMsTUFBSyxDQUFHLFVBQUEsS0FBSSxDQUFLO0FBRTVDLFdBQUcsS0FBSSxRQUFRLENBQUc7QUFDZCxpQkFBUSxLQUFJLE1BQU07QUFDZCxlQUFLLEVBQUE7QUFDRCxzQkFBUSxHQUFLLElBQUUsQ0FBQTtBQUNmLG1CQUFJO0FBQUEsQUFDUixlQUFLLEVBQUMsQ0FBQTtBQUNGLHNCQUFRLEdBQUssSUFBRSxDQUFBO0FBQ2YsbUJBQUk7QUFBQSxVQUNaO1FBQ0o7QUFBQSxBQUVBLFlBQUksZUFBZSxBQUFDLEVBQUMsQ0FBQTtNQUN6QixDQUFDLENBQUE7SUE0a0JUO0FBbHRCVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUF5SWhDLFFBQUksTUFBSSxFQUFJO0FBQ1IsYUFBTyxDQUFBLElBQUcsS0FBSyxNQUFNLEFBQUMsRUFBQyxDQUFBO01BQzNCO0FBRUEsUUFBSSxPQUFLLEVBQUk7QUFDVCxhQUFPLENBQUEsSUFBRyxLQUFLLE9BQU8sQUFBQyxFQUFDLENBQUE7TUFDNUI7QUFFQSxnQkFBVSxDQUFWLFVBQVksS0FBSSxDQUFHO0FBQ2YsV0FBRyxLQUFJLFFBQVEsQ0FBRztBQUNkLGFBQUcsV0FBVyxFQUFJO0FBQ2QsZUFBRyxDQUFHLENBQUEsS0FBSSxNQUFNO0FBQ2hCLGNBQUUsQ0FBRyxDQUFBLEtBQUksTUFBTTtBQUFBLFVBQ25CLENBQUE7UUFDSjtBQUFBLE1BQ0o7QUFFQSxnQkFBVSxDQUFWLFVBQVksS0FBSSxDQUFHO0FBQ2YsV0FBRyxJQUFHLFdBQVcsQ0FBRztBQUNoQixBQUFJLFlBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxLQUFJLE1BQU0sRUFBSSxDQUFBLElBQUcsV0FBVyxLQUFLLENBQUE7QUFDNUMsQUFBSSxZQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsS0FBSSxNQUFNLEVBQUksQ0FBQSxJQUFHLFdBQVcsSUFBSSxDQUFBO0FBRTFDLGFBQUcsUUFBUSxVQUFVLEdBQUssS0FBRyxDQUFBO0FBQzdCLGFBQUcsUUFBUSxTQUFTLEdBQUssSUFBRSxDQUFBO0FBQzNCLGFBQUcsYUFBYSxBQUFDLEVBQUMsQ0FBQTtBQUVsQixhQUFHLFdBQVcsRUFBSTtBQUNkLGVBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTTtBQUNoQixjQUFFLENBQUcsQ0FBQSxLQUFJLE1BQU07QUFBQSxVQUNuQixDQUFBO1FBQ0o7QUFBQSxNQUNKO0FBRUEsY0FBUSxDQUFSLFVBQVUsS0FBSSxDQUFHO0FBQ2IsV0FBRyxJQUFHLFdBQVcsQ0FBRztBQUNoQixhQUFHLFdBQVcsRUFBSSxVQUFRLENBQUE7UUFDOUI7QUFBQSxNQUNKO0FBRUEsaUJBQVcsQ0FBWCxVQUFhLEFBQUQsQ0FBRztBQUVYLFdBQUcsV0FBVyxRQUFRLEFBQUMsQ0FBQztBQUNwQixVQUFBLENBQUcsQ0FBQSxJQUFHLFFBQVEsS0FBSztBQUNuQixVQUFBLENBQUcsQ0FBQSxJQUFHLFFBQVEsSUFBSTtBQUNsQixjQUFJLENBQUcsQ0FBQSxJQUFHLFFBQVEsTUFBTTtBQUN4QixlQUFLLENBQUcsQ0FBQSxJQUFHLFFBQVEsT0FBTztBQUFBLFFBQzlCLENBQUMsQ0FBQTtBQUdELFdBQUcsS0FBSyxLQUFLLEFBQUMsQ0FBQyxTQUFRLENBQUcsQ0FBQSxJQUFHLFFBQVEsSUFBSSxDQUFDLENBQUE7TUFDOUM7QUFFQSxRQUFJLEtBQUcsRUFBSTtBQUNQLGFBQU8sQ0FBQSxJQUFHLFFBQVEsS0FBSyxDQUFBO01BQzNCO0FBRUEsUUFBSSxLQUFHLENBQUUsS0FBSSxDQUFHO0FBQ1osV0FBRyxRQUFRLEtBQUssRUFBSSxNQUFJLENBQUE7QUFDeEIsV0FBRyxhQUFhLEFBQUMsRUFBQyxDQUFBO01BRXRCO0FBRUEsUUFBSSxXQUFTLEVBQUk7QUFDYixXQUFHLGdCQUFnQixFQUFJLElBQUksSUFBRSxBQUFDLEVBQUMsQ0FBQztBQUNoQyxXQUFHLGFBQWEsRUFBSSxFQUFBLENBQUM7QUFFckIsQUFBSSxVQUFBLENBQUEsSUFBRyxFQUFJLEVBR1AsS0FBSSxDQUFHLEdBQUMsQ0FDWixDQUFDO0FBRUQsbUJBQVksRUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxNQUFNLE9BQU8sQ0FBRyxHQUFFLENBQUEsQ0FBRztBQUN2QyxhQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsRUFBSSxDQUFBLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxXQUFXLENBQUM7UUFDNUM7QUFBQSxBQUVBLGFBQU8sS0FBRyxDQUFDO01BQ2Y7QUFFQSxlQUFTLENBQVQsVUFBVyxJQUFHOztBQUNWLFdBQUcsa0JBQWtCLEVBQUksTUFBSSxDQUFBO0FBSzdCLEFBQUksVUFBQSxDQUFBLFFBQU8sRUFBSSxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUM7QUFFeEIsbUJBQVksRUFBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxNQUFNLE9BQU8sQ0FBRyxHQUFFLENBQUEsQ0FBRztBQUV4QyxBQUFJLFlBQUEsQ0FBQSxHQUFFLEVBcE9sQixLQUFLLEVBQUEsQUFvT2EsQ0FBQztBQUNQLGlCQUFRLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxTQUFTO0FBQ3pCLGVBQUssT0FBSztBQUVOLGdCQUFFLEVBQUksQ0FBQSxJQUFHLFFBQVEsQUFBQyxDQUFDLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxLQUFLLENBQUcsRUFBQSxDQUFHLEVBQUEsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUNuRCxtQkFBSztBQUFBLEFBQ1QsZUFBSyxLQUFHO0FBQ0oscUJBQVEsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLEtBQUs7QUFDckIsbUJBQUssUUFBTTtBQUVQLG9CQUFFLEVBQUksQ0FBQSxJQUFHLFNBQVMsQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsQ0FBQSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsS0FBSyxDQUFHLE1BQUksQ0FBQyxDQUFDO0FBQ3BELHVCQUFLO0FBQUEsQUFDVCxtQkFBSyxTQUFPO0FBRVIsb0JBQUUsRUFBSSxDQUFBLElBQUcsVUFBVSxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUNqQyx1QkFBSztBQUFBLEFBQ1Q7QUFDSSx3QkFBTSxNQUFNLEFBQUMsQ0FBQyx1QkFBc0IsRUFBRSxDQUFBLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxLQUFLLENBQUEsQ0FBRSxLQUFHLENBQUMsQ0FBQztBQUM5RCx1QkFBSztBQUZGLGNBR1g7QUFDQSxtQkFBSztBQUFBLEFBQ1Q7QUFDSSxvQkFBTSxNQUFNLEFBQUMsQ0FBQyx3QkFBdUIsRUFBRSxDQUFBLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxTQUFTLENBQUEsQ0FBRSxLQUFHLENBQUMsQ0FBQztBQURoRSxVQUVYO0FBRUEsYUFBSSxHQUFFLENBQUc7QUFFTCxBQUFJLGNBQUEsQ0FBQSxTQUFRLEVBQUksSUFBSSxDQUFBLGNBQWEsVUFBVSxBQUFDLEVBQUMsQ0FBQztBQUM5Qyx1QkFBWSxFQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsVUFBVSxNQUFNLE9BQU8sQ0FBSSxHQUFFLENBQUEsQ0FBRztBQUM1RCxxQkFBUSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLEtBQUs7QUFDeEMsbUJBQUssWUFBVTtBQUNYLDBCQUFRLGFBQWEsQUFBQyxDQUNsQixJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBRSxDQUFBLENBQUMsQ0FDdkMsQ0FBQSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsVUFBVSxNQUFNLENBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBRSxDQUFBLENBQUMsQ0FDM0MsQ0FBQztBQUNELHVCQUFLO0FBQUEsQUFDVCxtQkFBSyxTQUFPO0FBQ1IsMEJBQVEsVUFBVSxBQUFDLENBQ2YsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxLQUFLLENBQUUsQ0FBQSxDQUFDLENBQ3ZDLENBQUEsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxLQUFLLENBQUUsQ0FBQSxDQUFDLENBQ3ZDLENBQUEsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLFVBQVUsTUFBTSxDQUFFLENBQUEsQ0FBQyxLQUFLLENBQUUsQ0FBQSxDQUFDLENBQzNDLENBQUM7QUFDRCx1QkFBSztBQUFBLEFBQ1Q7QUFDSSx3QkFBTSxNQUFNLEFBQUMsQ0FBQyw4QkFBNkIsRUFBRSxDQUFBLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxVQUFVLE1BQU0sQ0FBRSxDQUFBLENBQUMsS0FBSyxDQUFBLENBQUUsS0FBRyxDQUFDLENBQUM7QUFDeEYsdUJBQUs7QUFGRixjQUdYO1lBQ0o7QUFBQSxBQUVBLGNBQUUsYUFBYSxBQUFDLENBQUMsU0FBUSxDQUFDLENBQUM7QUFHM0IsNEJBQVksRUFBQSxDQUFJLFNBQUksQ0FBQSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsWUFBWSxPQUFPLENBQUksU0FBRSxDQUFHO0FBRXhELEFBQUksZ0JBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsWUFBWSxRQUFHLE9BQU8sQ0FBQztBQUdoRCxBQUFJLGdCQUFBLENBQUEsS0FBSSxFQUFJO0FBQ1Isb0JBQUksQ0FBRyxDQUFBLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxZQUFZLFFBQUcsTUFBTTtBQUN4QyxtQkFBRyxDQUFHLENBQUEsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLFlBQVksUUFBRyxLQUFLO0FBQ3RDLG9CQUFJLENBQUcsQ0FBQSxHQUFFLEdBQUc7QUFBQSxjQUNoQixDQUFDO0FBR0QsaUJBQUcsUUFBTyxJQUFJLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBRztBQUdyQixBQUFJLGtCQUFBLENBQUEsUUFBTyxFQUFJLENBQUEsUUFBTyxJQUFJLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUNuQyx1QkFBTyxDQUFFLFFBQU8sT0FBTyxDQUFDLEVBQUksTUFBSSxDQUFDO0FBQ2pDLHVCQUFPLElBQUksQUFBQyxDQUFDLE1BQUssQ0FBRyxTQUFPLENBQUMsQ0FBQztjQUNsQyxLQUFPO0FBR0gsdUJBQU8sSUFBSSxBQUFDLENBQUMsTUFBSyxDQUFHLEVBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztjQUNqQztBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLEFBR0EsV0FBRyxRQUFRLEFBQUMsRUFBQyxDQUFDO0FBR2QsZUFBTyxRQUFRLEFBQUMsQ0FBQyxTQUFBLElBQUc7QUFDaEIsQUFBSSxZQUFBLENBQUEsWUFBVyxFQUFJLEdBQUMsQ0FBQztBQUNyQixhQUFHLElBQUcsQ0FBRSxDQUFBLENBQUMsR0FBSyxDQUFBLElBQUcsQ0FBRSxDQUFBLENBQUMsQ0FBRztBQXhUM0IsQUFBSSxjQUFBLE9BQW9CLEtBQUcsQ0FBQztBQUM1QixBQUFJLGNBQUEsT0FBb0IsTUFBSSxDQUFDO0FBQzdCLEFBQUksY0FBQSxPQUFvQixVQUFRLENBQUM7QUFDakMsY0FBSTtBQUhKLGtCQUFTLEdBQUEsT0FEakIsS0FBSyxFQUFBLEFBQzRCO0FBQ2hCLHVCQUFvQixDQUFBLENBd1RMLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBQyxDQXhUa0IsQ0FBRSxNQUFLLFNBQVMsQ0FBQyxBQUFDLEVBQUMsQ0FDN0QsRUFBQyxDQUFDLE1BQW9CLENBQUEsQ0FBQyxNQUFvQixDQUFBLFNBQXFCLEFBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUN6RSxPQUFvQixLQUFHLENBQUc7a0JBc1RaLEVBQUE7QUFBYTtBQUNwQixBQUFJLG9CQUFBLENBQUEsR0FBRSxFQUFJLENBQUEsZUFBYyxBQUFDLENBQUMsSUFBRyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV4Qyw2QkFBVyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsR0FBRSxXQUFXLENBQUUsSUFBRyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUN0RDtjQXZUUjtBQUFBLFlBREEsQ0FBRSxZQUEwQjtBQUMxQixtQkFBb0IsS0FBRyxDQUFDO0FBQ3hCLHdCQUFvQyxDQUFDO1lBQ3ZDLENBQUUsT0FBUTtBQUNSLGdCQUFJO0FBQ0YsbUJBQUksS0FBaUIsR0FBSyxDQUFBLFdBQXVCLEdBQUssS0FBRyxDQUFHO0FBQzFELDRCQUF3QixBQUFDLEVBQUMsQ0FBQztnQkFDN0I7QUFBQSxjQUNGLENBQUUsT0FBUTtBQUNSLHdCQUF3QjtBQUN0Qiw0QkFBd0I7Z0JBQzFCO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQTRTSTtBQUFBLEFBQ0EscUJBQVcsQUFBQyxDQUFDLFlBQVcsQ0FBRSxDQUFBLENBQUMsQ0FBRyxDQUFBLFlBQVcsQ0FBRSxDQUFBLENBQUMsQ0FBRyxLQUFHLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUM7QUFHRixXQUFHLFFBQVEsQUFBQyxFQUFDLENBQUM7QUFFZCxXQUFHLGtCQUFrQixFQUFJLEtBQUcsQ0FBQztBQXJVN0IsQUFBSSxVQUFBLE9BQW9CLEtBQUcsQ0FBQztBQUM1QixBQUFJLFVBQUEsT0FBb0IsTUFBSSxDQUFDO0FBQzdCLEFBQUksVUFBQSxPQUFvQixVQUFRLENBQUM7QUFDakMsVUFBSTtBQUhKLGNBQVMsR0FBQSxPQURqQixLQUFLLEVBQUEsQUFDNEI7QUFDaEIsbUJBQW9CLENBQUEsQ0FxVWIsSUFBRyxNQUFNLENBclVzQixDQUFFLE1BQUssU0FBUyxDQUFDLEFBQUMsRUFBQyxDQUM3RCxFQUFDLENBQUMsTUFBb0IsQ0FBQSxDQUFDLE1BQW9CLENBQUEsU0FBcUIsQUFBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQ3pFLE9BQW9CLEtBQUcsQ0FBRztjQW1VdEIsU0FBRTtBQUFpQjtBQUN4QixpQkFBSSxtQkFBZSxDQUFBLGNBQWEsU0FBUyxDQUFHO0FBTXhDLDBCQUFLLEVBQUksRUFBQyxXQUFLLENBQUE7QUFDZiwwQkFBSyxFQUFJLEVBQUMsV0FBSyxDQUFBO2NBQ25CO0FBQUEsWUFDSjtVQTFVQTtBQUFBLFFBREEsQ0FBRSxZQUEwQjtBQUMxQixlQUFvQixLQUFHLENBQUM7QUFDeEIsb0JBQW9DLENBQUM7UUFDdkMsQ0FBRSxPQUFRO0FBQ1IsWUFBSTtBQUNGLGVBQUksS0FBaUIsR0FBSyxDQUFBLFdBQXVCLEdBQUssS0FBRyxDQUFHO0FBQzFELHdCQUF3QixBQUFDLEVBQUMsQ0FBQztZQUM3QjtBQUFBLFVBQ0YsQ0FBRSxPQUFRO0FBQ1Isb0JBQXdCO0FBQ3RCLHdCQUF3QjtZQUMxQjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUErVEo7QUFFQSx1QkFBaUIsQ0FBakIsVUFBbUIsV0FBVSxDQUFHO0FBQzVCLFdBQUcsQ0FBQyxJQUFHLGlCQUFpQixDQUFHO0FBQ3ZCLGFBQUcsaUJBQWlCLEVBQUksWUFBVSxDQUFDO1FBQ3ZDLEtBQU87QUFDSCxhQUFHLFFBQVEsQUFBQyxDQUFDLElBQUcsaUJBQWlCLENBQUcsWUFBVSxDQUFDLENBQUM7QUFDaEQsYUFBRyxpQkFBaUIsRUFBSSxVQUFRLENBQUM7UUFDckM7QUFBQSxNQUNKO0FBRUEsdUJBQWlCLENBQWpCLFVBQW1CLGlCQUFnQixDQUFHLENBQUEsS0FBSSxDQUFHO0FBQ3pDLFdBQUcsSUFBRyxrQkFBa0IsQ0FBRztBQUN2QixhQUFHLFdBQVcsRUFBSSxJQUFJLFdBQVMsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFBO0FBQ3JDLGFBQUcsV0FBVyxhQUFhLEFBQUMsQ0FBQyxpQkFBZ0IsR0FBRyxDQUFHLE1BQUksQ0FBQyxDQUFBO0FBQ3hELGFBQUcsV0FBVyxJQUFJLEFBQUMsRUFBQyxDQUFBO1FBQ3hCO0FBQUEsTUFDSjtBQUVBLFlBQU0sQ0FBTixVQUFRLElBQUcsQ0FBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQUFBZ0IsQ0FBRztVQUFoQixRQUFNLDZDQUFJLEtBQUc7QUFDN0IsYUFBTyxDQUFBLElBQUcsT0FBTyxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxJQUFJLENBQUEsY0FBYSxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFHLEVBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBRyxRQUFNLENBQUMsQ0FBQztNQUNoRjtBQUVBLGFBQU8sQ0FBUCxVQUFTLENBQUEsQ0FBRyxDQUFBLENBQUEsQUFBOEIsQ0FBRztVQUE5QixLQUFHLDZDQUFJLE1BQUk7VUFBRyxRQUFNLDZDQUFJLEtBQUc7QUFDdEMsYUFBTyxDQUFBLElBQUcsT0FBTyxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBRyxJQUFJLENBQUEsY0FBYSxTQUFTLEFBQUMsQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFDLENBQUcsUUFBTSxDQUFDLENBQUM7TUFDOUU7QUFFQSxjQUFRLENBQVIsVUFBVSxDQUFBLENBQUcsQ0FBQSxDQUFBLEFBQWdCLENBQUc7VUFBaEIsUUFBTSw2Q0FBSSxLQUFHO0FBQ3pCLGFBQU8sQ0FBQSxJQUFHLE9BQU8sQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsSUFBSSxDQUFBLGNBQWEsVUFBVSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUcsUUFBTSxDQUFDLENBQUM7TUFDekU7QUFFQSxXQUFLLENBQUwsVUFBTyxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUcsQ0FBQSxNQUFLLEFBQWdCLENBQUc7VUFBaEIsUUFBTSw2Q0FBSSxLQUFHO0FBQzlCLEFBQUksVUFBQSxDQUFBLEtBQUksRUFBSSxDQUFBLElBQUcsTUFBTSxPQUFPLENBQUM7QUFFN0IsV0FBRyxNQUFNLENBQUUsS0FBSSxDQUFDLEVBQUksT0FBSyxDQUFDO0FBRzFCLFdBQUcsQ0FBQSxHQUFLLEVBQUEsQ0FBRztBQUNQLEFBQUksWUFBQSxDQUFBLEVBQUMsRUFBSSxJQUFJLENBQUEsY0FBYSxVQUFVLEFBQUMsRUFBQyxDQUFDO0FBQ3ZDLFdBQUMsYUFBYSxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBQyxDQUFDO0FBRXJCLGFBQUcsTUFBTSxDQUFFLEtBQUksQ0FBQyxPQUFPLFFBQVEsQUFBQyxDQUFDLENBQUMsV0FBVSxDQUFHLENBQUEsRUFBQyxJQUFJLEFBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3RDtBQUFBLEFBRUEsV0FBRyxjQUFjLEFBQUMsQ0FBQyxJQUFHLE1BQU0sQ0FBRSxLQUFJLENBQUMsQ0FBRyxRQUFNLENBQUMsQ0FBQztBQUU5QyxhQUFPLENBQUEsSUFBRyxNQUFNLENBQUUsS0FBSSxDQUFDLENBQUM7TUFDNUI7QUFFQSxjQUFRLENBQVIsVUFBVSxNQUFLLENBQUc7QUFDZCxBQUFJLFVBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxDQUFBLEFBQUMsQ0FBQyxHQUFFLEVBQUUsT0FBSyxDQUFDLENBQUM7QUFHekIsQUFBSSxVQUFBLENBQUEsU0FBUSxFQUFJLEVBQUMsQ0FBQSxDQUFDO0FBQ2xCLG1CQUFZLEVBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsTUFBTSxPQUFPLENBQUksQ0FBQSxDQUFBLEVBQUUsQ0FBRztBQUN6QyxhQUFHLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFLLENBQUc7QUFDakMsb0JBQVEsRUFBSSxFQUFBLENBQUM7QUFDYixpQkFBSztVQUNUO0FBQUEsUUFDSjtBQUFBLEFBRUEsV0FBRyxTQUFRLEVBQUksRUFBQyxDQUFBLENBQUc7QUFFZiwwQkFBWSxFQUFBLENBQUcsU0FBSSxDQUFBLElBQUcsTUFBTSxDQUFFLFNBQVEsQ0FBQyxXQUFXLE9BQU8sQ0FBRyxTQUFFLENBQUc7QUFDN0QsZUFBRyx5QkFBeUIsQUFBQyxDQUFDLElBQUcsTUFBTSxDQUFFLFNBQVEsQ0FBQyxXQUFXLFFBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQztVQUNoRjtBQUFBLEFBR0EsYUFBRyxNQUFNLE9BQU8sQUFBQyxDQUFDLFNBQVEsQ0FBRyxFQUFBLENBQUMsQ0FBQztBQUMvQixjQUFJLE9BQU8sQUFBQyxFQUFDLENBQUM7UUFDbEIsS0FBTztBQUNILGdCQUFNLE1BQU0sQUFBQyxDQUFDLGtEQUFpRCxFQUFFLE9BQUssQ0FBQSxDQUFFLElBQUUsQ0FBQyxDQUFDO1FBQ2hGO0FBQUEsTUFDSjtBQUVBLFlBQU0sQ0FBTixVQUFRLE1BQUssQ0FBRyxDQUFBLElBQUcsQUFBZ0I7VUFBYixRQUFNLDZDQUFJLEtBQUc7O0FBRS9CLFdBQUksTUFBSyxJQUFJLEtBQUc7QUFDWixlQUFPLE1BQUksQ0FBQTtBQUFBLEFBRVgsVUFBQSxDQUFBLFVBQVMsRUFBSSxFQUFDLElBQUcsaUJBQWlCLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBRyxDQUFBLElBQUcsaUJBQWlCLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFBO0FBRzVFLGlCQUFTLFFBQVEsQUFBQyxDQUFDLFNBQUEsSUFBRyxDQUFLO0FBQ3ZCLGFBQUcsSUFBRyxpQkFBaUI7QUFDbkIsd0NBQTRCLEFBQUMsQ0FBQyxJQUFHLEdBQUcsQ0FBQyxDQUFBO0FBQUEsUUFDN0MsQ0FBQyxDQUFBO0FBQ0QsQUFBSSxVQUFBLENBQUEsS0FBSSxFQUFJLENBQUEsSUFBRyxNQUFNLE9BQU8sQ0FBQztBQUM3QixXQUFHLE1BQU0sQ0FBRSxLQUFJLENBQUMsRUFBSSxJQUFJLENBQUEsY0FBYSxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUcsT0FBSyxDQUFHLEtBQUcsQ0FBRyxDQUFBLElBQUcsU0FBUyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBRXZGLGlCQUFTLFFBQVEsQUFBQyxDQUFDLFNBQUEsSUFBRyxDQUFLO0FBQ3ZCLGFBQUcsVUFBVSxBQUFDLENBQUMsVUFBUyxDQUFFLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQTtBQUVELFdBQUcsY0FBYyxBQUFDLENBQUMsSUFBRyxNQUFNLENBQUUsS0FBSSxDQUFDLENBQUcsUUFBTSxDQUFDLENBQUM7QUFDOUMsV0FBRyxlQUFlLEFBQUMsQ0FBQyxJQUFHLE1BQU0sQ0FBRSxLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoRCxXQUFHLE9BQU07QUFDTCxhQUFHLE1BQU0sQ0FBRSxLQUFJLENBQUMsZ0JBQWdCLEFBQUMsRUFBQyxDQUFBO0FBQUEsQUFFdEMsYUFBTyxDQUFBLElBQUcsTUFBTSxDQUFFLEtBQUksQ0FBQyxDQUFDO01BQzVCO0FBRUEsZ0JBQVUsQ0FBVixVQUFZLE1BQUs7QUF4YmIsQUFBSSxVQUFBLE9BQW9CLEtBQUcsQ0FBQztBQUM1QixBQUFJLFVBQUEsT0FBb0IsTUFBSSxDQUFDO0FBQzdCLEFBQUksVUFBQSxPQUFvQixVQUFRLENBQUM7QUFDakMsVUFBSTtBQUhKLGNBQVMsR0FBQSxPQURqQixLQUFLLEVBQUEsQUFDNEI7QUFDaEIsbUJBQW9CLENBQUEsQ0F3YlYsSUFBRyxNQUFNLENBeGJtQixDQUFFLE1BQUssU0FBUyxDQUFDLEFBQUMsRUFBQyxDQUM3RCxFQUFDLENBQUMsTUFBb0IsQ0FBQSxDQUFDLE1BQW9CLENBQUEsU0FBcUIsQUFBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQ3pFLE9BQW9CLEtBQUcsQ0FBRztjQXNicEIsS0FBRztBQUFpQjtBQUMzQixpQkFBRyxJQUFHLE9BQU8sR0FBRyxJQUFNLE9BQUssQ0FBRztBQUMxQixxQkFBTyxLQUFHLENBQUE7Y0FDZDtBQUFBLFlBQ0o7VUF2YkE7QUFBQSxRQURBLENBQUUsWUFBMEI7QUFDMUIsZUFBb0IsS0FBRyxDQUFDO0FBQ3hCLG9CQUFvQyxDQUFDO1FBQ3ZDLENBQUUsT0FBUTtBQUNSLFlBQUk7QUFDRixlQUFJLEtBQWlCLEdBQUssQ0FBQSxXQUF1QixHQUFLLEtBQUcsQ0FBRztBQUMxRCx3QkFBd0IsQUFBQyxFQUFDLENBQUM7WUFDN0I7QUFBQSxVQUNGLENBQUUsT0FBUTtBQUNSLG9CQUF3QjtBQUN0Qix3QkFBd0I7WUFDMUI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLEFBNmFBLGFBQU8sTUFBSSxDQUFDO01BQ2hCO0FBRUEsMEJBQW9CLENBQXBCLFVBQXNCLFdBQVUsQ0FBRztBQUMvQixBQUFJLFVBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxJQUFHLGlCQUFpQixBQUFDLENBQUMsV0FBVSxDQUFDLENBQUM7QUFDbEQsYUFBTyxDQUFBLFNBQVEsUUFBUSxDQUFDO01BQzVCO0FBRUEsbUJBQWEsQ0FBYixVQUFlLE1BQUssQ0FBRztBQUNuQixtQkFBWSxFQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLE1BQU0sT0FBTyxDQUFJLEdBQUUsQ0FBQSxDQUFHO0FBQ3pDLGFBQUksSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLE9BQU8sR0FBRyxJQUFNLE9BQUssQ0FBRztBQUVwQyxBQUFJLGNBQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsZUFBZSxDQUFDO0FBQzdDLEFBQUksY0FBQSxDQUFBLFVBQVMsRUFBSSxDQUFBLElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxhQUFhLENBQUM7QUFFM0MscUJBQVMsc0JBQXNCLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUN4QyxxQkFBUyxzQkFBc0IsQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBRXhDLGVBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksT0FBTyxBQUFDLEVBQUMsQ0FBQztBQUNqQyxlQUFHLE1BQU0sT0FBTyxBQUFDLENBQUMsQ0FBQSxDQUFHLEVBQUEsQ0FBQyxDQUFDO0FBRXZCLGlCQUFLO1VBQ1Q7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUVBLDZCQUF1QixDQUF2QixVQUF5QixXQUFVOztBQUMvQixBQUFJLFVBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxJQUFHLGlCQUFpQixBQUFDLENBQUMsV0FBVSxDQUFDLENBQUM7QUFFbEQsZ0JBQVEsUUFBUSxRQUFRLEFBQUMsQ0FBQyxTQUFBLE1BQUssQ0FBSztBQUNoQyxBQUFJLFlBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxnQkFBZSxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7QUFHbkMsQUFBSSxZQUFBLENBQUEsY0FBYSxFQUFJLENBQUEscUJBQW9CLEFBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUM3RCxhQUFHLGNBQWEsT0FBTyxHQUFHLElBQUksWUFBVSxDQUFHO0FBQ3ZDLHlCQUFhLEVBQUksQ0FBQSxxQkFBb0IsQUFBQyxDQUFDLElBQUcsS0FBSyxDQUFHLEtBQUcsQ0FBQyxDQUFDO1VBQzNEO0FBQUEsQUFHQSx1QkFBYSxRQUFRLE9BQU8sQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBR3JDLFVBQUEsQUFBQyxDQUFDLEdBQUUsRUFBSSxPQUFLLENBQUMsT0FBTyxBQUFDLEVBQUMsQ0FBQztBQUd4QixhQUFHLGNBQWEsaUJBQWlCLENBQUc7QUFDaEMseUJBQWEsU0FBUyxBQUFDLENBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBQyxDQUFDO1VBQ2hEO0FBQUEsUUFDSixDQUFDLENBQUM7QUFHRixnQkFBUSxRQUFRLE1BQU0sQUFBQyxFQUFDLENBQUM7QUFFekIsV0FBRyxTQUFRLGlCQUFpQixDQUFHO0FBQzNCLGtCQUFRLFNBQVMsQUFBQyxDQUFDLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FBQztRQUMzQztBQUFBLE1BQ0o7QUFFQSxlQUFTLENBQVQsVUFBVyxNQUFLLENBQUc7QUFDZixtQkFBWSxFQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLE1BQU0sT0FBTyxDQUFJLENBQUEsQ0FBQSxFQUFFLENBQUc7QUFDekMsYUFBRyxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsT0FBTyxHQUFHLElBQUksT0FBSyxDQUFHO0FBQ2pDLGlCQUFPLENBQUEsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUM7VUFDeEI7QUFBQSxRQUNKO0FBQUEsQUFDQSxhQUFPLE1BQUksQ0FBQztNQUNoQjtBQUVBLHdCQUFrQixDQUFsQixVQUFvQixXQUFVLENBQUc7QUFDN0IsbUJBQVksRUFBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxNQUFNLE9BQU8sQ0FBSSxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQ3pDLGFBQUksSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLGlCQUFpQixBQUFDLENBQUMsV0FBVSxDQUFDLENBQUEsR0FBTSxVQUFRLENBQUc7QUFDM0QsaUJBQU8sQ0FBQSxJQUFHLE1BQU0sQ0FBRSxDQUFBLENBQUMsQ0FBQztVQUN4QjtBQUFBLFFBQ0o7QUFBQSxBQUNBLGFBQU8sTUFBSSxDQUFDO01BQ2hCO0FBRUEscUJBQWUsQ0FBZixVQUFpQixXQUFVLENBQUcsQ0FBQSxJQUFHO0FBSzdCLFdBQUcsSUFBRyxJQUFJLFVBQVEsQ0FBRztBQUVqQixBQUFJLFlBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxJQUFHLFNBQVMsaUJBQWlCLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBQTtBQUMxRCxhQUFJLENBQUMsU0FBUSxDQUFHO0FBQ1osb0JBQVEsRUFBSSxDQUFBLElBQUcsT0FBTyxpQkFBaUIsQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFBO1VBQ3hEO0FBQUEsQUFDQSxlQUFPLFVBQVEsQ0FBQTtRQUVuQixLQUFPO0FBeGhCUCxBQUFJLFlBQUEsT0FBb0IsS0FBRyxDQUFDO0FBQzVCLEFBQUksWUFBQSxPQUFvQixNQUFJLENBQUM7QUFDN0IsQUFBSSxZQUFBLE9BQW9CLFVBQVEsQ0FBQztBQUNqQyxZQUFJO0FBSEosZ0JBQVMsR0FBQSxPQURqQixLQUFLLEVBQUEsQUFDNEI7QUFDaEIscUJBQW9CLENBQUEsQ0F5aEJQLElBQUcsTUFBTSxDQXpoQmdCLENBQUUsTUFBSyxTQUFTLENBQUMsQUFBQyxFQUFDLENBQzdELEVBQUMsQ0FBQyxNQUFvQixDQUFBLENBQUMsTUFBb0IsQ0FBQSxTQUFxQixBQUFDLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FDekUsT0FBb0IsS0FBRyxDQUFHO2dCQXVoQmhCLElBQUU7QUFBaUI7QUFDMUIsQUFBTSxrQkFBQSxDQUFBLGNBQVEsRUFBSSxDQUFBLEdBQUUsaUJBQWlCLEFBQUMsQ0FBQyxXQUFVLENBQUMsQ0FBQTtBQUNsRCxrQ0FBYztBQUNWLHVDQUFlO2dCQUNuQjtBQUFBLGNBQ0o7WUF6aEJKO0FBQUEsVUFEQSxDQUFFLFlBQTBCO0FBQzFCLGlCQUFvQixLQUFHLENBQUM7QUFDeEIsc0JBQW9DLENBQUM7VUFDdkMsQ0FBRSxPQUFRO0FBQ1IsY0FBSTtBQUNGLGlCQUFJLEtBQWlCLEdBQUssQ0FBQSxXQUF1QixHQUFLLEtBQUcsQ0FBRztBQUMxRCwwQkFBd0IsQUFBQyxFQUFDLENBQUM7Y0FDN0I7QUFBQSxZQUNGLENBQUUsT0FBUTtBQUNSLHNCQUF3QjtBQUN0QiwwQkFBd0I7Y0FDMUI7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBOGdCQTtBQUFBLEFBRUEsYUFBTyxNQUFJLENBQUE7TUFDZjtBQUlBLHdCQUFrQixDQUFsQixVQUFvQixNQUFLLENBQUc7QUFDeEIsQUFBSSxVQUFBLENBQUEsT0FBTSxFQUFJLENBQUEsQ0FBQSxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7QUFDdkIsV0FBRyxDQUFDLE9BQU0sU0FBUyxBQUFDLENBQUMsV0FBVSxDQUFDLENBQUEsRUFBSyxDQUFBLE9BQU0sUUFBUSxBQUFDLENBQUMsR0FBRSxDQUFDLE9BQU8sRUFBSSxFQUFBLENBQUc7QUFDbEUsZ0JBQU0sRUFBSSxDQUFBLE9BQU0sT0FBTyxBQUFDLEVBQUMsQ0FBQztBQUMxQixnQkFBTyxPQUFNLEtBQUssQUFBQyxDQUFDLFNBQVEsQ0FBQyxDQUFBLEdBQU0sSUFBRSxDQUFBLEVBQUssQ0FBQSxPQUFNLEtBQUssQUFBQyxDQUFDLFNBQVEsQ0FBQyxDQUFBLEdBQU0sSUFBRSxDQUFHO0FBQ3ZFLGtCQUFNLEVBQUksQ0FBQSxPQUFNLE9BQU8sQUFBQyxFQUFDLENBQUM7VUFDOUI7QUFBQSxRQUNKO0FBQUEsQUFDQSxhQUFPLFFBQU0sQ0FBQztNQUNsQjtBQUdBLGtCQUFZLENBQVosVUFBYyxNQUFLLENBQUc7QUFFbEIsQUFBSSxVQUFBLENBQUEsT0FBTSxFQUFJLENBQUEsQ0FBQSxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7QUFFdkIsV0FBRyxPQUFNLFNBQVMsQUFBQyxDQUFDLFdBQVUsQ0FBQyxDQUFHO0FBRTlCLGVBQU8sQ0FBQSxJQUFHLGlCQUFpQixBQUFDLENBQUMsT0FBTSxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BELEtBQU8sS0FBRyxPQUFNLFFBQVEsQUFBQyxDQUFDLEdBQUUsQ0FBQyxPQUFPLEVBQUksRUFBQSxDQUFHO0FBSXZDLEFBQUksWUFBQSxDQUFBLFlBQVcsRUFBSSxDQUFBLE9BQU0sT0FBTyxBQUFDLEVBQUMsQ0FBQztBQUNuQyxnQkFBTyxZQUFXLEtBQUssQUFBQyxDQUFDLFNBQVEsQ0FBQyxDQUFBLEdBQU0sSUFBRSxDQUFBLEVBQUssQ0FBQSxZQUFXLEtBQUssQUFBQyxDQUFDLFNBQVEsQ0FBQyxDQUFBLEdBQU0sSUFBRSxDQUFHO0FBQ2pGLHVCQUFXLEVBQUksQ0FBQSxZQUFXLE9BQU8sQUFBQyxFQUFDLENBQUM7VUFDeEM7QUFBQSxBQUVBLGVBQU8sQ0FBQSxJQUFHLFdBQVcsQUFBQyxDQUFDLFlBQVcsS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztRQUNuRCxLQUFPLEtBQUksT0FBTSxTQUFTLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBRztBQUNqQyxlQUFPLENBQUEsSUFBRyxZQUFZLEFBQUMsQ0FBQyxPQUFNLEtBQUssQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0MsS0FBTztBQUNILGVBQU8sVUFBUSxDQUFDO1FBQ3BCO0FBQUEsTUFDSjtBQUVBLGtCQUFZLENBQVosVUFBYyxPQUFNLEFBQWdCLENBQUc7VUFBaEIsUUFBTSw2Q0FBSSxLQUFHO0FBQ2hDLFdBQUcsbUJBQW1CLEFBQUMsQ0FBQyxPQUFNLElBQUksQUFBQyxFQUFDLENBQUcsUUFBTSxDQUFDLENBQUM7TUFDbkQ7QUFFQSx1QkFBaUIsQ0FBakIsVUFBbUIsTUFBSyxBQUFnQixDQUFHO1VBQWhCLFFBQU0sNkNBQUksS0FBRztBQUNwQyxXQUFHLEtBQUssT0FBTyxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7QUFDeEIsV0FBRyxPQUFNLENBQUc7QUFDUixhQUFHLFFBQVEsQUFBQyxFQUFDLENBQUM7UUFDbEI7QUFBQSxNQUNKO0FBRUEsZUFBUyxDQUFULFVBQVcsT0FBTSxDQUFHO0FBQ2hCLFdBQUcsTUFBTSxPQUFPLEFBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUMxQixXQUFHLFFBQVEsQUFBQyxFQUFDLENBQUM7TUFDbEI7QUFHQSxZQUFNLENBQU4sVUFBUSxBQUFELENBQUc7QUFDTixXQUFHLEtBQUssS0FBSyxBQUFDLENBQUMsSUFBRyxLQUFLLEtBQUssQUFBQyxFQUFDLENBQUMsQ0FBQztBQUNoQyxjQUFNLElBQUksQUFBQyxDQUFDLGlDQUFnQyxDQUFDLENBQUE7TUFDakQ7QUFFQSx1QkFBaUIsQ0FBakIsVUFBbUIsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFHLENBQUEsT0FBTSxDQUFHO0FBQzlCLFdBQUcsWUFBWSxRQUFRLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFHLFFBQU0sQ0FBQyxDQUFDO01BQzNDO0FBQ0Esb0JBQWMsQ0FBZCxVQUFnQixBQUFELENBQUc7QUFDZCxXQUFHLFlBQVksS0FBSyxBQUFDLEVBQUMsQ0FBQztNQUMzQjtBQUdBLGVBQVMsQ0FBVCxVQUFXLEtBQUksQ0FBRztBQUNkLGFBQU8sQ0FBQSxJQUFHLE1BQU0sQUFBQyxDQUFDLEtBQUksRUFBSSxDQUFBLElBQUcsU0FBUyxDQUFDLENBQUEsQ0FBSSxDQUFBLElBQUcsU0FBUyxDQUFDO01BQzVEO0FBUUEsd0JBQWtCLENBQWxCLFVBQW9CLEFBQUQ7QUFDZixBQUFJLFVBQUEsQ0FBQSxZQUFXLEVBQUksSUFBSSxJQUFFLEFBQUMsRUFBQyxDQUFDO0FBRTVCLG1CQUFZLEVBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsTUFBTSxPQUFPLENBQUksR0FBRSxDQUFBLENBQUc7QUFFekMsQUFBSSxZQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsQ0FBQSxBQUFDLENBQUMsR0FBRSxFQUFJLENBQUEsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBRWhFLEFBQUksWUFBQSxDQUFBLFFBQU8sRUFBSSxDQUFBLENBQUEsQUFBQyxDQUFDLElBQUcsQ0FBQyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBR2pDLGlCQUFPLEtBQUssRUFBSSxDQUFBLElBQUcsV0FBVyxBQUFDLENBQUMsUUFBTyxLQUFLLENBQUMsQ0FBQztBQUM5QyxpQkFBTyxJQUFJLEVBQUksQ0FBQSxJQUFHLFdBQVcsQUFBQyxDQUFDLFFBQU8sSUFBSSxDQUFDLENBQUM7QUE5bkJoRCxBQUFJLFlBQUEsT0FBb0IsS0FBRyxDQUFDO0FBQzVCLEFBQUksWUFBQSxPQUFvQixNQUFJLENBQUM7QUFDN0IsQUFBSSxZQUFBLE9BQW9CLFVBQVEsQ0FBQztBQUNqQyxZQUFJO0FBSEosZ0JBQVMsR0FBQSxPQURqQixLQUFLLEVBQUEsQUFDNEI7QUFDaEIscUJBQW9CLENBQUEsQ0Frb0JULElBQUcsTUFBTSxDQUFFLENBQUEsQ0FBQyxhQUFhLENBbG9CRSxDQUFFLE1BQUssU0FBUyxDQUFDLEFBQUMsRUFBQyxDQUM3RCxFQUFDLENBQUMsTUFBb0IsQ0FBQSxDQUFDLE1BQW9CLENBQUEsU0FBcUIsQUFBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQ3pFLE9BQW9CLEtBQUcsQ0FBRztnQkFnb0JuQixLQUFHO0FBQWlDO0FBQ3hDLEFBQUksa0JBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxRQUFPLEtBQUssRUFBSSxDQUFBLElBQUcsRUFBRSxFQUFJLENBQUEsSUFBRyxTQUFTLENBQUM7QUFDdEQsQUFBSSxrQkFBQSxDQUFBLFNBQVEsRUFBSSxDQUFBLFFBQU8sSUFBSSxFQUFJLENBQUEsSUFBRyxFQUFFLEVBQUksQ0FBQSxJQUFHLFNBQVMsQ0FBQztBQUVyRCwyQkFBVyxJQUFJLEFBQUMsQ0FBQztBQUNiLGtCQUFBLENBQUcsVUFBUTtBQUNYLGtCQUFBLENBQUcsVUFBUTtBQUFBLGdCQUNmLENBQUMsQ0FBQztjQUNOO1lBcm9CSjtBQUFBLFVBREEsQ0FBRSxZQUEwQjtBQUMxQixpQkFBb0IsS0FBRyxDQUFDO0FBQ3hCLHNCQUFvQyxDQUFDO1VBQ3ZDLENBQUUsT0FBUTtBQUNSLGNBQUk7QUFDRixpQkFBSSxLQUFpQixHQUFLLENBQUEsV0FBdUIsR0FBSyxLQUFHLENBQUc7QUFDMUQsMEJBQXdCLEFBQUMsRUFBQyxDQUFDO2NBQzdCO0FBQUEsWUFDRixDQUFFLE9BQVE7QUFDUixzQkFBd0I7QUFDdEIsMEJBQXdCO2NBQzFCO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQTBuQkE7QUFBQSxBQUlBLGFBQU8sYUFBVyxDQUFDO01BQ3ZCO0FBRUEsb0JBQWMsQ0FBZCxVQUFnQixLQUFJLENBQUc7QUFDbkIsV0FBRyxLQUFLLE9BQU8sQUFBQyxDQUFDLENBQUEsQUFBQyxDQUFDLEdBQUUsRUFBSSxNQUFJLENBQUMsQ0FBQyxDQUFDO01BQ3BDO0FBRUEsbUJBQWEsQ0FBYixVQUFlLEtBQUksQ0FBRztBQUNsQixRQUFBLEFBQUMsQ0FBQyxHQUFFLEVBQUksQ0FBQSxJQUFHLFdBQVcsR0FBRyxDQUFDLE1BQ2pCLEFBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxHQUFFLEVBQUksTUFBSSxDQUFDLENBQUMsQ0FBQztNQUM5QjtBQUdBLHlCQUFtQixDQUFuQixVQUFxQixZQUFXOztBQUU1QixBQUFJLFVBQUEsQ0FBQSxpQkFBZ0IsRUFBSSxJQUFJLElBQUUsQUFBQyxFQUFDLENBQUM7OztBQUk3QixpQkFBRyxZQUFXLElBQUksVUFBUSxDQUFBLEVBQUssQ0FBQSxZQUFXLElBQUksQ0FBQSxXQUFTLENBQUUsQ0FBQSxDQUFDLE9BQU8sR0FBRyxDQUFHO0FBR25FLEFBQUksa0JBQUEsQ0FBQSxTQUFRLENBQUM7QUFDYiwwQkFBUyxDQUFFLENBQUEsQ0FBQyxPQUFPLFFBQVEsQUFBQyxDQUFDLFNBQUEsS0FBSSxDQUFLO0FBQ2xDLHFCQUFJLFNBQVEsSUFBTSxVQUFRLENBQUc7QUFFekIsb0NBQWdCLElBQUksQUFBQyxDQUFDO0FBQUMsc0JBQUEsQ0FBRyxDQUFBLEtBQUksRUFBRTtBQUFHLHNCQUFBLENBQUcsQ0FBQSxLQUFJLEVBQUU7QUFBQSxvQkFBQyxDQUFDLENBQUM7a0JBQ25ELEtBQU87QUFHSCx1QkFBRyxTQUFRLEVBQUUsSUFBSSxDQUFBLEtBQUksRUFBRSxDQUFHO0FBRXRCLEFBQUksd0JBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFDLFNBQVEsRUFBRSxDQUFHLENBQUEsS0FBSSxFQUFFLENBQUMsQ0FBQztBQUN6QyxBQUFJLHdCQUFBLENBQUEsRUFBQyxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBQyxTQUFRLEVBQUUsQ0FBRyxDQUFBLEtBQUksRUFBRSxDQUFDLENBQUM7QUFFdkMsNEJBQU0sSUFBRyxHQUFLLEdBQUMsQ0FBRztBQUNkLHdDQUFnQixJQUFJLEFBQUMsQ0FBQztBQUFDLDBCQUFBLENBQUcsQ0FBQSxLQUFJLEVBQUU7QUFBRywwQkFBQSxDQUFHLEtBQUc7QUFBQSx3QkFBQyxDQUFDLENBQUM7QUFDNUMsMkJBQUcsR0FBSyxjQUFZLENBQUM7c0JBQ3pCO0FBQUEsb0JBQ0osS0FBTyxLQUFHLFNBQVEsRUFBRSxJQUFJLENBQUEsS0FBSSxFQUFFLENBQUc7QUFFN0IsQUFBSSx3QkFBQSxDQUFBLFNBQUcsRUFBSSxDQUFBLElBQUcsSUFBSSxBQUFDLENBQUMsU0FBUSxFQUFFLENBQUcsQ0FBQSxLQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLEFBQUksd0JBQUEsQ0FBQSxPQUFDLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFDLFNBQVEsRUFBRSxDQUFHLENBQUEsS0FBSSxFQUFFLENBQUMsQ0FBQztBQUV2Qyw0QkFBTSxvQkFBUyxDQUFHO0FBQ2Qsd0NBQWdCLElBQUksQUFBQyxDQUFDO0FBQUMsMEJBQUEsV0FBTTtBQUFHLDBCQUFBLENBQUcsQ0FBQSxLQUFJLEVBQUU7QUFBQSx3QkFBQyxDQUFDLENBQUM7QUFDNUMsbUNBQVEsY0FBWSxDQUFDO3NCQUN6QjtBQUFBLG9CQUNKLEtBQU87QUFFSCw0QkFBTSxNQUFNLEFBQUMsQ0FBQyxrRkFBaUYsQ0FBQyxDQUFDO29CQUNyRztBQUFBLGtCQUNKO0FBQUEsQUFHQSwwQkFBUSxFQUFJO0FBQ1Isb0JBQUEsQ0FBRyxDQUFBLEtBQUksRUFBRTtBQUNULG9CQUFBLENBQUcsQ0FBQSxLQUFJLEVBQUU7QUFBQSxrQkFDYixDQUFDO2dCQUNMLENBQUMsQ0FBQztjQUdOO0FBQUE7QUE3Q0osbUJBQVksRUFBQSxDQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxNQUFNLE9BQU8sQ0FBSSxHQUFFLENBQUE7O1FBOEMxQztBQUVBLGFBQU8sa0JBQWdCLENBQUM7TUFDNUI7T0FwR08sVUFBUyxDQUFoQixVQUFrQixLQUFJLENBQUcsQ0FBQSxRQUFPLENBQUc7QUFDL0IsYUFBTyxDQUFBLElBQUcsTUFBTSxBQUFDLENBQUMsS0FBSSxFQUFJLFNBQU8sQ0FBQyxDQUFBLENBQUksU0FBTyxDQUFDO01BQ2xELEVBL21Cd0YsQ0FBQztFQUNyRixBQUFDLEVBQUM7O0FBSFYsU0FBQSxhQUF3QjtBQUFFLGdCQUF3QjtJQUFFLEVBQTdCOzs7O0FBQXZCLEFBQUksSUFBQSxDQUFBLFlBQVcsb0JBQW9CLENBQUM7SUNBN0IsSUFBRTtBQUVULEVBQUEsQUFBQyxDQUFDLFNBQVUsQUFBRCxDQUFHO0FBQ1YsQUFBSSxNQUFBLENBQUEsR0FBRSxFQUFJLElBQUksSUFBRSxBQUFDLENBQUMsWUFBVyxDQUFHLEdBQUMsQ0FBQyxDQUFDO0VBMkV2QyxDQUFDLENBQUM7QUE5RUYsV0FBdUIiLCJmaWxlIjoiL2hvbWUvd2FyYW4vU2tvbGEvcnAvY29kZS90ZW1wb3V0TUM0eE56WTBNREEwTnpjd09UZzJNakkxLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gc2luZ2xldG9uIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZCdzXG5sZXQgZXhpc3RpbmdJZEluc3RhbmNlID0gbnVsbDtcbi8vIHVzYWdlOiBsZXQgaWQgPSBuZXcgSWQoKS51bmlxdWVcbmV4cG9ydCBjbGFzcyBJZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmKCFleGlzdGluZ0lkSW5zdGFuY2Upe1xuICAgICAgICAgICAgZXhpc3RpbmdJZEluc3RhbmNlID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJlZml4ID0gXCJpZFwiO1xuICAgICAgICB0aGlzLm5leHRJZCA9IDA7XG5cbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nSWRJbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXQgdW5pcXVlKCkge1xuICAgICAgICBsZXQgcmV0VmFsID0gdGhpcy5nZW5lcmF0ZSgpO1xuXG4gICAgICAgIC8vIGZpbmQgbmV4dCB1bnVzZWQgaWRYWFhYIHRvIHByZXZlbnQgaWQgY29sbGlzaW9uIHRoYXQgbWlnaHQgYmUgY2F1c2VkIGJ5IHNvbWUgb3RoZXIgY29tcG9uZW50XG4gICAgICAgIC8vIChpdCByZWFsbHkgc2hvdWxkIG5vdCBoYXBwZW4sIGJ1dCB0aGlzIGlzIGEgc2ltcGxlIG1ldGhvZCB0byBlbnN1cmUgc2FmZXR5KVxuICAgICAgICB3aGlsZSgkKFwiI1wiK3JldFZhbCkubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRJZCsrO1xuICAgICAgICAgICAgcmV0VmFsID0gdGhpcy5nZW5lcmF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiB0aGlzIGlkXG4gICAgICAgIHRoaXMubmV4dElkKys7XG5cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5uZXh0SWQ7XG4gICAgfVxufVxuXG4vLyB0byBlczUgY29tcGlsZXIgZnJpZW5kbHkgaW1wbGVtZW50YXRpb24gKFwiY2FsbGluZyBhIGJ1aWx0aW4gTWFwIGNvbnN0cnVjdG9yIHdpdGhvdXQgbmV3IGlzIGZvcmJpZGRlblwiKVxuZXhwb3J0IGNsYXNzIE1hcFdpdGhEZWZhdWx0VmFsdWUge1xuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdFZhbHVlO1xuXG5cbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnNpemU7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5jbGVhcigpO1xuICAgIH1cblxuICAgIGZvckVhY2goLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZm9yRWFjaCguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5kZWxldGUoa2V5KTtcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmhhcyhrZXkpO1xuICAgIH1cblxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5lbnRyaWVzKCk7XG4gICAgfVxuXG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmtleXMoKTtcbiAgICB9XG5cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC52YWx1ZXMoKTtcbiAgICB9XG59XG5cbi8qXG4vLyBlczYgaW1wbGVtZW50YXRpb25cbmV4cG9ydCBjbGFzcyBNYXBXaXRoRGVmYXVsdFZhbHVlIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmRlZmF1bHQgPSBkZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBpZih0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgfVxufVxuKi8iLCJpbXBvcnQgKiBhcyBTdHJ1Y3R1cmVzIGZyb20gJy4vc3RydWN0dXJlc0FuZENsYXNzZXMuanMnXG5cbmNsYXNzIFRhZyB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICB0aGlzLnRhZ05hbWUgPSB0YWdOYW1lO1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjxcIit0aGlzLnRhZ05hbWUrXCI+XCIpO1xuXG4gICAgICAgIHRoaXMuaWQgPSBuZXcgU3RydWN0dXJlcy5JZCgpLnVuaXF1ZTtcbiAgICB9XG5cbiAgICBhZGRDbGFzcyhuYW1lKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKG5hbWUpO1xuICAgIH1cblxuICAgIHJlbW92ZUNsYXNzZXMoLi4uY2xhc3Nlcykge1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgY2xhc3Nlcykge1xuICAgICAgICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRBdHRyKGFzc29jKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuXG4gICAgICAgIC8vIGFkZCBhdHRyaWJ1dGVzIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMuJGVsLmF0dHIoYXNzb2MpO1xuICAgIH1cblxuICAgIGdldEF0dHIobmFtZSkge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcblxuICAgICAgICByZXR1cm4gdGhpcy4kZWwuYXR0cihuYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVBdHRyKG5hbWUpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG5cbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlQXR0cihuYW1lKTtcbiAgICB9XG5cbiAgICBzZXQgaWQoaWQpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcImlkXCI6IGlkfSk7XG4gICAgfTtcblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cihcImlkXCIpO1xuICAgIH07XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuICAgICAgICByZXR1cm4gdGhpcy4kZWw7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGVsZW1lbnQgZXhpc3RzIGluIGRvbSwgd2UgbmVlZCB0byBmZXRjaCBpdCB1c2luZyBqUXVlcnlcbiAgICBjaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCkge1xuICAgICAgICBsZXQgJGpxRWxlbWVudCA9ICQoXCIjXCIrdGhpcy4kZWwuYXR0cignaWQnKSk7XG4gICAgICAgIGlmKCRqcUVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICRqcUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIERyYWdnYWJsZSBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcbiAgICB9XG5cbiAgICBkcmFnZ2FibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcImRyYWdnYWJsZVwiOiB2YWx1ZX0pO1xuICAgIH1cbn1cblxuY2xhc3MgUm90YXRhYmxlIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHJvdGF0YWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wicm90YXRhYmxlXCI6IHZhbHVlfSk7XG4gICAgfVxufVxuXG4vLyB0aGVyZSBpcyBubyBtdWx0aXBsZSBpbmhlcml0YW5jZSBpbiBFUzYsIHNvIEkgaGF2ZSB0byBkbyBzb21ldGhpbmcgdWdseSBsaWtlIHRoaXNcbmNsYXNzIERyYWdnYWJsZVJvdGF0YWJsZSBleHRlbmRzIERyYWdnYWJsZSB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcbiAgICB9XG5cbiAgICByb3RhdGFibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcInJvdGF0YWJsZVwiOiB2YWx1ZX0pO1xuICAgIH1cbn1cblxuY2xhc3MgU3ZnRWxlbWVudCBleHRlbmRzIERyYWdnYWJsZVJvdGF0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgdGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcblxuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTdmdFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoLCBmaWxsLCBzdHJva2UpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgdywgaCwgXCJyZWN0XCIpO1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgZmlsbDogZmlsbCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlLFxuICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IDAuNSxcbiAgICAgICAgICAgICdwb2ludGVyLWV2ZW50cyc6ICdhbGwnIC8vIHRvIHRyaWdnZXIgaG92ZXIgZXZlbiB3aXRoIHRyYW5zcGFyZW50IGJhY2tncm91bmRcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3ZnSW1hZ2UgZXh0ZW5kcyBTdmdFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoLCB1cmwpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgdywgaCwgXCJpbWFnZVwiKTtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIFwieGxpbms6aHJlZlwiOiB1cmxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlVXJsKHVybCkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgXCJ4bGluazpocmVmXCI6IHVybFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm91cCBleHRlbmRzIERyYWdnYWJsZVJvdGF0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiZ1wiKTtcbiAgICB9XG5cbiAgICBhZGRDaGlsZChlbCkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoZWwuJGVsKTtcbiAgICAgICAgcmV0dXJuIGVsOyAvLyBwcm8gamVkbm9kdXNzaSBcImxldCByZWN0ID0gZy5hZGRDaGlsZChuZXcgUmVjdGFuZ2xlKC4uLlwiXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9seWxpbmVQb2ludCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICBpZih4ICE9PSB1bmRlZmluZWQgJiYgeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCh4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlRnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgbGV0IGFyciA9IHN0cmluZy5zcGxpdChcIixcIik7XG4gICAgICAgIHJldHVybiBuZXcgUG9seWxpbmVQb2ludChhcnJbMF0sIGFyclsxXSk7XG4gICAgfVxuXG4gICAgZ2V0IHN0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIFwiLFwiICsgdGhpcy55O1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbHMoYSwgYikge1xuICAgICAgICByZXR1cm4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnk7XG4gICAgfVxufVxuXG5jbGFzcyBTbWFydEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcbiAgICAgICAgaWYoYXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyID0gYXJyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcnIgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBTbWFydEFycmF5KCQuZXh0ZW5kKHRydWUsIFtdLCB0aGlzLmFycikpO1xuICAgIH1cblxuICAgIGFwcGVuZChwb2ludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRXaXRoSW5kZXgocG9pbnQsIHRoaXMuYXJyLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgcHJlcGVuZChwb2ludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRXaXRoSW5kZXgocG9pbnQsIDApO1xuICAgIH1cblxuICAgIC8vIGFkZCBhIHBvaW50IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXgsIG1vdmUgYWxsIGZvbGxvd2luZyBpdGVtc1xuICAgIGFkZFdpdGhJbmRleChwb2ludCwgaW5kZXgpIHtcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy5hcnIubGVuZ3RoIDsgaSA+IGluZGV4IDsgLS1pKSB7XG4gICAgICAgICAgICB0aGlzLmFycltpXSA9IHRoaXMuYXJyW2ktMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcnJbaW5kZXhdID0gcG9pbnQ7XG4gICAgICAgIHJldHVybiB0aGlzOyAvLyB0byBlbmFibGUgY2hhaW5pbmcgb2YgYXBwZW5kIC8gcHJlcHBlbmQgLyBhZGRXaXRoSW5kZXggY29tbWFuZHNcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnIubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldEl0ZW0oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyW2luZGV4XTtcbiAgICB9XG5cbiAgICBnZXQgbGFzdCgpIHtcbiAgICAgICAgaWYodGhpcy5sZW5ndGghPT0wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJbdGhpcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBmaXJzdCgpIHtcbiAgICAgICAgaWYodGhpcy5sZW5ndGghPT0wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbmRleEFycmF5IG11c3QgYmUgc29ydGVkIChBU0MsIGVnLiBbMSwgMywgNCwgOF0pXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcblxuICAgICAgICBmb3IobGV0IGkgPSBpbmRleCA7IGkgPCBsZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyW2ldID0gdGhpcy5hcnJbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJyLnBvcCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvbHlsaW5lUG9pbnRzIGV4dGVuZHMgU21hcnRBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgICAgIHN1cGVyKGFycik7XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2x5bGluZVBvaW50cygkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5hcnIpKTtcbiAgICB9XG5cbiAgICBhcHBlbmQocG9pbnQpIHtcbiAgICAgICAgLy8gY2FsbCBpbmhlcml0ZWQgZnVuY3Rpb24gdG8gaGFuZGxlIHRoZSBhcHBlbmRpbmdcbiAgICAgICAgc3VwZXIuYXBwZW5kKHBvaW50KTtcblxuICAgICAgICAvLyBpZiB0aGUgc2Vjb25kIHRvIGxhc3QgcG9pbnQgaXMgdW5uZWNlc3NhcnksIHJlbW92ZSBpdFxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICAgIGlmICggbGVuZ3RoID49IDNcbiAgICAgICAgICAgICAgICAmJiAoICAgICggdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDMpLnggPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS54ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS54ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMSkueCApXG4gICAgICAgICAgICAgICAgICAgICB8fCAoIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAzKS55ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueSA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDEpLnkgKVxuICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShsZW5ndGggLSAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiB0aGlzIGVsZW1lbnQgKHRvIGFsbG93IGNoYWluaW5nKVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIHN0YXRpYyBwYXJzZUZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIGxldCBwb2ludFN0cmluZ3MgPSBzdHJpbmcuc3BsaXQoXCIgXCIpO1xuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IFBvbHlsaW5lUG9pbnRzKCk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBwb2ludFN0cmluZ3MubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBwb2ludHMuYXBwZW5kKFBvbHlsaW5lUG9pbnQucGFyc2VGcm9tU3RyaW5nKHBvaW50U3RyaW5nc1tpXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBvaW50cztcbiAgICB9XG5cbiAgICBnZXQgc3RyaW5nKCkge1xuICAgICAgICBsZXQgc3RyaW5nID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgaWYoaSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmluZyArPSB0aGlzLmFycltpXS5zdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICB9XG5cbiAgICBmb3JFYWNoKGZ1bmMpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmFyci5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIGZ1bmModGhpcy5hcnJbaV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9seUxpbmUgZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHBvaW50cywgY29sb3IsIHN0cm9rZVdpZHRoKSB7XG4gICAgICAgIHN1cGVyKFwicG9seWxpbmVcIik7XG5cbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIHBvaW50czogcG9pbnRzLnN0cmluZyxcbiAgICAgICAgICAgIHN0cm9rZTogY29sb3IsXG4gICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgIFwic3Ryb2tlLXdpZHRoXCI6IHN0cm9rZVdpZHRoXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVBvaW50cyhwb2ludHMpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIHBvaW50czogcG9pbnRzLnN0cmluZ1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXR0ZXJuIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihcInBhdHRlcm5cIik7XG5cbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICBwYXR0ZXJuVW5pdHM6IFwidXNlclNwYWNlT25Vc2VcIixcbiAgICAgICAgICAgIHZpZXdCb3g6IFwiMCAwIFwiK3dpZHRoK1wiIFwiK2hlaWdodFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRDaGlsZChlbCkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoZWwuJGVsKTtcbiAgICAgICAgcmV0dXJuIGVsOyAvLyBwcm8gamVkbm9kdXNzaSBcImxldCByZWN0ID0gZy5hZGRDaGlsZChuZXcgUmVjdGFuZ2xlKC4uLlwiXG4gICAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBsb2dpYyBmdW5jdGlvbnMgdXNlZCBpbiB0aGUgZ2F0ZSBldmFsdWF0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpYyB7XG4gICAgc3RhdGljIGFuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy50ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBbXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub2ZmXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBzdGF0aWMgbmFuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy5ub3QoTG9naWMuYW5kKGEsIGIpKTtcbiAgICB9XG4gICAgc3RhdGljIG5vcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy5ub3QoTG9naWMub3IoYSwgYikpO1xuICAgIH1cbiAgICBzdGF0aWMgbm90KGEpIHtcbiAgICAgICAgaWYoYSA9PT0gTG9naWMuc3RhdGUub24pIHtcbiAgICAgICAgICAgIHJldHVybiBMb2dpYy5zdGF0ZS5vZmY7XG4gICAgICAgIH0gZWxzZSBpZiAoYSA9PT0gTG9naWMuc3RhdGUub2ZmKSB7XG4gICAgICAgICAgICByZXR1cm4gTG9naWMuc3RhdGUub247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgb3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMudGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgW1xuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUudW5rbm93bl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgc3RhdGljIHhub3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMubm90KExvZ2ljLnhvcihhLCBiKSk7XG4gICAgfVxuICAgIHN0YXRpYyB4b3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMudGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgW1xuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUudW5rbm93bl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdW5rbm93bjogMCxcbiAgICAgICAgICAgIG9uOiAxLFxuICAgICAgICAgICAgb2ZmOiAyLFxuICAgICAgICAgICAgb3NjaWxsYXRpbmc6IDNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB0ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBydWxlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBydWxlcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKChydWxlc1tpXVswXT09PWEgJiYgcnVsZXNbaV1bMV09PT1iKSB8fCAocnVsZXNbaV1bMF09PT1iICYmIHJ1bGVzW2ldWzFdPT09YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnVsZXNbaV1bMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0ICogYXMgc3ZnT2JqIGZyb20gJy4vc3ZnT2JqZWN0cy5qcydcbmltcG9ydCAqIGFzIFN0cnVjdHVyZXMgZnJvbSAnLi9zdHJ1Y3R1cmVzQW5kQ2xhc3Nlcy5qcydcbmltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuXG4vLyBtYXBwaW5nIGxvZ2ljYWwgc3RhdGVzIHRvIGNzcyBjbGFzc2VzXG5jb25zdCBzdGF0ZUNsYXNzZXMgPSB7XG4gICAgb246IFwic3RhdGVPblwiLFxuICAgIG9mZjogXCJzdGF0ZU9mZlwiLFxuICAgIHVua25vd246IFwic3RhdGVVbmtub3duXCIsXG4gICAgb3NjaWxsYXRpbmc6IFwic3RhdGVPc2NpbGxhdGluZ1wiXG59O1xuXG4vLyBoZWxwZXIgY2xhc3MgdXNlZCBieSBUcmFuc2Zvcm1cbmNsYXNzIFByb3BlcnR5IHtcbiAgICBjb25zdHJ1Y3RvcihzdHJpbmcpIHtcbiAgICAgICAgaWYoc3RyaW5nIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBzdHJpbmcucmVwbGFjZSgvXlsgXSooW14oXSspLiovLCBcIiQxXCIpO1xuICAgICAgICAgICAgdGhpcy5hcmdzID0gc3RyaW5nLnJlcGxhY2UoL15bXihdK1xcKCguKilcXCkvLCBcIiQxXCIpLnNwbGl0KCcgJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXRBcmd1bWVudHMoYXJncykge1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiKFwiICsgdGhpcy5hcmdzLmpvaW4oXCIgXCIpICsgXCIpXCI7XG4gICAgfVxufVxuXG4vLyB1c2VkIHRvIG1hbmlwdWxhdGUgdGhlIHRyYW5zZm9ybSBhcmd1bWVudCB1c2VkIGluIFNWR1xuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybSB7XG4gICAgY29uc3RydWN0b3Ioc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcblxuICAgICAgICBpZihzdHJpbmchPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBzcGxpdEl0ZW1zID0gc3RyaW5nLnNwbGl0KFwiKVwiKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgc3BsaXRJdGVtcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihzcGxpdEl0ZW1zW2ldKSB7IC8vIGlmIG5vdCBlbXB0eVxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IFByb3BlcnR5KHNwbGl0SXRlbXNbaV0gKyBcIilcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgaW5kZXggb3IgLTFcbiAgICBnZXRJbmRleChuYW1lKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYobmFtZSA9PT0gdGhpcy5pdGVtc1tpXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNsYXRlKCkge1xuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZ2V0QXJndW1lbnRzKHRoaXMuZ2V0SW5kZXgoXCJ0cmFuc2xhdGVcIikpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBhcmdzWzBdLFxuICAgICAgICAgICAgeTogYXJnc1sxXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Um90YXRlKCkge1xuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZ2V0QXJndW1lbnRzKHRoaXMuZ2V0SW5kZXgoXCJyb3RhdGVcIikpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZWc6IGFyZ3NbMF0sXG4gICAgICAgICAgICBjZW50cmVYOiBhcmdzWzFdLFxuICAgICAgICAgICAgY2VudHJlWTogYXJnc1syXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0cyB0aGUgdHJhbnNsYXRpb25cbiAgICBzZXRUcmFuc2xhdGUoeCwgeSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihcInRyYW5zbGF0ZVwiLCBbeCwgeV0pO1xuICAgIH1cblxuICAgIC8vIHNldHMgdGhlIHJvdGF0aW9uXG4gICAgc2V0Um90YXRlKGRlZywgY2VudHJlWCwgY2VudHJlWSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihcInJvdGF0ZVwiLCBbZGVnLCBjZW50cmVYLCBjZW50cmVZXSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHRoZSByb3RhdGlvblxuICAgIHJvdGF0ZVJpZ2h0KGNlbnRyZVgsIGNlbnRyZVkpIHtcbiAgICAgICAgaWYodGhpcy5nZXRJbmRleChcInJvdGF0ZVwiKT09PS0xKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJvdGF0ZSg5MCwgY2VudHJlWCwgY2VudHJlWSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbmV3Um90YXRpb24gPSAocGFyc2VJbnQodGhpcy5nZXRSb3RhdGUoKS5kZWcpICsgOTApICUgMzYwO1xuXG4gICAgICAgICAgICBpZihuZXdSb3RhdGlvbj09PTE4MCkge1xuICAgICAgICAgICAgICAgIC8vIHN3YXAgY2VudHJlIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgLy8gYmVjYXVzZSByb3RhdGUoYywgeCwgeSkgaXMgZGVmaW5lZCBsaWtlIHRyYW5zZm9ybSgteCwgLXkpIHJvdGF0ZShjKSB0cmFuc2Zvcm0oeCwgeSlcbiAgICAgICAgICAgICAgICBsZXQgYSA9IGNlbnRyZVg7XG4gICAgICAgICAgICAgICAgY2VudHJlWCA9IGNlbnRyZVk7XG4gICAgICAgICAgICAgICAgY2VudHJlWSA9IGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Um90YXRlKFxuICAgICAgICAgICAgICAgIG5ld1JvdGF0aW9uLFxuICAgICAgICAgICAgICAgIGNlbnRyZVgsXG4gICAgICAgICAgICAgICAgY2VudHJlWVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0aWVzIGNvbmNhdGVuYXRlZFxuICAgIGdldCgpIHtcbiAgICAgICAgbGV0IHJldFZhbCA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGkhPT0wKSB7XG4gICAgICAgICAgICAgICAgcmV0VmFsICs9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0VmFsICs9IHRoaXMuaXRlbXNbaV0uZ2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG5cbiAgICBnZXRBcmd1bWVudHMoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNbaW5kZXhdLmFyZ3M7XG4gICAgfVxuXG4gICAgc2V0UGFyYW1ldGVyKG5hbWUsIGFyZ3MpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGluZGV4IG9mIHRoZSBwYXJhbWV0ZXIgKGlmIHNldCksIGVsc2UgaW5kZXggPT0gLTFcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleChuYW1lKTtcblxuICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaGFzIGJlZW4gYWxyZWFkeSBzZXQsIGNoYW5nZSBpdCAocmV3cml0ZSB0aGUgYXJyYXkgaW4gdGhlIHJpZ2h0IGluZGV4KVxuICAgICAgICAvLyBlbHNlIGNyZWF0ZSBhIG5ldyBvbmUgKHNldCBpbmRleCB0byB0aGUgbGVuZ3RoIG9mIGFuIGFycmF5IC0tPiBhZCBhbiBpdGVtIHRvIHRoZSBlbmQpXG4gICAgICAgIGlmKGluZGV4PT09LTEpIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLml0ZW1zW2luZGV4XSA9IG5ldyBQcm9wZXJ0eSgpO1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uc2V0TmFtZShuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNhdmUgYXJncyB1bmRlciB0aGUgcmlnaHQgaW5kZXhcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uc2V0QXJndW1lbnRzKGFyZ3MpO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBhbGwgbmV0d29yayBlbGVtZW50c1xuY2xhc3MgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICBpZighcGFyZW50U1ZHKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUGFyZW50IFNWRyBlbGVtZW50IGhhcyBub3QgYmVlbiBkZWZpbmVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcblxuICAgICAgICAvLyB1c2VkIHRvIHN0b3JlIHRoZSBzdmpPYmplY3QncyBpbnN0YW5jZSBvZiB0aGlzIGVsZW1lbnRcbiAgICAgICAgdGhpcy5zdmdPYmogPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmouaWQ7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uIHRvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMsIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGxhdGVyIGluIHRoZSBCb3ggY2xhc3NcbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uIHRvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMsIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGxhdGVyIGluIHRoZSBCb3ggYW5kIENvbm5lY3RvciBjbGFzc2VzXG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uIHRvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMsIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGxhdGVyIGluIHRoZSBCb3ggY2xhc3NcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIidqc29uJyBnZXR0ZXIgaGFzIG5vdCBiZWVuIGRlZmluZWQgZm9yIHRoaXMgZWxlbWVudFwiLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbi8vIHBhcmVudCBjbGFzcyBmb3IgaW5wdXQgYW5kIG91dHB1dCBjb25uZWN0b3JzICh0aGUgdGhpbmdzIHlvdSBjbGljayBvblxuLy8gd2hlbiB5b3Ugd2FudCB0byBjb25uZWN0IGVsZW1lbnRzKVxuY2xhc3MgQ29ubmVjdG9yIGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkgeyAvLyB1bml0IG9mIGxlZnQgLyB0b3AgaXMgdGhlIHNpemUgb2YgdGhlIGdyaWRcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHKTtcblxuICAgICAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2l6ZSA9IGdyaWRTaXplO1xuICAgICAgICB0aGlzLmNvbm5lY3Rvck9mZnNldCA9IHRoaXMuY29ubmVjdG9yU2l6ZSAvIDI7XG5cbiAgICAgICAgdGhpcy5zdmdPYmogPSBuZXcgc3ZnT2JqLlJlY3RhbmdsZShcbiAgICAgICAgICAgIGxlZnQgKiB0aGlzLmdyaWRTaXplIC0gdGhpcy5jb25uZWN0b3JPZmZzZXQsXG4gICAgICAgICAgICB0b3AgKiB0aGlzLmdyaWRTaXplIC0gdGhpcy5jb25uZWN0b3JPZmZzZXQsXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNpemUsXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNpemUsXG4gICAgICAgICAgICBcIm5vbmVcIixcbiAgICAgICAgICAgIFwiYmxhY2tcIlxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcImNvbm5lY3RvclwiKTtcblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGlmIGEgd2lyZSBjYW4gc2V0IGNvbm5lY3RvcidzIHN0YXRlXG4gICAgICAgIHRoaXMuaXNJbnB1dENvbm5lY3RvciA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gTG9naWMuc3RhdGUudW5rbm93bjtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuXG4gICAgICAgIHRoaXMud2lyZUlkcyA9IG5ldyBTZXQoKTtcbiAgICB9XG5cbiAgICBnZXQgaXNPdXRwdXRDb25uZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0lucHV0Q29ubmVjdG9yO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0Q29ubmVjdG9yOiAwLFxuICAgICAgICAgICAgb3V0cHV0Q29ubmVjdG9yOiAxXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRXaXJlSWQod2lyZUlkKSB7XG4gICAgICAgIHRoaXMud2lyZUlkcy5hZGQod2lyZUlkKTtcbiAgICB9XG5cbiAgICByZW1vdmVXaXJlSWQod2lyZUlkKSB7XG4gICAgICAgIHRoaXMud2lyZUlkcy5kZWxldGUod2lyZUlkKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmVzIHRoZSB3aXJlIGFuZCB1cGRhdGVzIHRoZSBjb25uZWN0b3JcbiAgICByZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlV2lyZUlkKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUsIHByb3BhZ2F0aW9uSWQpIHtcbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9uOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub2ZmKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUF0dHI7XG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmo7XG4gICAgfVxuXG4gICAgb25Nb3VzZVVwKCkge1xuICAgICAgICB0aGlzLnBhcmVudFNWRy53aXJlQ3JlYXRpb25IZWxwZXIodGhpcy5zdmdPYmouaWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0Q29ubmVjdG9yIGV4dGVuZHMgQ29ubmVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApIHtcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKTtcblxuXG4gICAgICAgIHRoaXMudHlwZSA9IENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yO1xuICAgICAgICB0aGlzLmlzSW5wdXRDb25uZWN0b3IgPSB0cnVlO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZXRTdGF0ZSBvbicsIHRoaXMuaWQpXG5cbiAgICAgICAgc3VwZXIuc2V0U3RhdGUoc3RhdGUpO1xuXG4gICAgICAgIGxldCBnYXRlID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZCh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIGdhdGUucmVmcmVzaFN0YXRlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCkge1xuICAgICAgICBzdXBlci5yZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShMb2dpYy5zdGF0ZS51bmtub3duKTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRDb25uZWN0b3IgZXh0ZW5kcyBDb25uZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuXG4gICAgICAgIC8vIHVzZWQgdG8gc2V0IHRoZSB3aXJlIHN0YXRlIGR1cmluZyB3aXJlIGluaXRpYWxpemF0aW9uIGJhc2VkIG9uIHRoZSBvdXRwdXQgY29ubmVjdG9yIHN0YXRlXG4gICAgICAgIHRoaXMuaXNPdXRwdXQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudHlwZSA9IENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3RvcjtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBzdXBlci5zZXRTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB3aXJlSWQgb2YgdGhpcy53aXJlSWRzKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5nZXRXaXJlQnlJZCh3aXJlSWQpLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXRlO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBnYXRlcyBhbmQgaW5wdXQgYW5kIG91dHB1dCBib3hlc1xuY2xhc3MgQm94IGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSwgY2F0ZWdvcnksIGdyaWRXaWR0aCwgZ3JpZEhlaWdodCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IHRoaXMucGFyZW50U1ZHLmdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMudXJsID0gXCJpbWcvXCIgKyB0aGlzLmNhdGVnb3J5ICsgXCIvXCIgKyB0aGlzLm5hbWUgKyBcIi5zdmdcIjtcblxuICAgICAgICB0aGlzLmNvbm5lY3RvcnMgPSBbXTtcblxuICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouR3JvdXAoKTtcblxuICAgICAgICB0aGlzLndpZHRoID0gZ3JpZFdpZHRoICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBncmlkSGVpZ2h0ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmdyaWRXaWR0aCA9IGdyaWRXaWR0aDtcbiAgICAgICAgdGhpcy5ncmlkSGVpZ2h0ID0gZ3JpZEhlaWdodDtcblxuICAgICAgICAvLyB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICAgICAgICBsZXQgcmVjdGFuZ2xlID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIFwibm9uZVwiLCBcIm5vbmVcIik7XG4gICAgICAgIHJlY3RhbmdsZS4kZWwuYWRkQ2xhc3MoJ3JlY3QnKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQocmVjdGFuZ2xlKTtcbiAgICAgICAgLy8gaW1hZ2Ugb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBzdmdPYmouU3ZnSW1hZ2UoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMudXJsKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICAgICAgLy8gYWRkIGRyYWdnYWJpbGl0eSBhbmQgcm90YXRhYmlsaXR5XG4gICAgICAgIHRoaXMuc3ZnT2JqLmRyYWdnYWJsZSh0cnVlKTtcbiAgICAgICAgdGhpcy5zdmdPYmoucm90YXRhYmxlKHRydWUpO1xuXG4gICAgICAgIC8vIGFkZCB0eXBlPVwiZ2F0ZVwiLCB1c2VkIGluIHNwZWNpYWwgY2FsbGJhY2tzIGluIGNvbnRleHRtZW51XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHlwZVwiOiBjYXRlZ29yeX0pO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcImJveFwiKTtcbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKGNhdGVnb3J5KTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2RlcygpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dENvbm5lY3RvcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvcnMuZmlsdGVyKGNvbm4gPT4gY29ubi5pc0lucHV0Q29ubmVjdG9yKVxuICAgIH1cblxuICAgIGdldCBvdXRwdXRDb25uZWN0b3JzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JzLmZpbHRlcihjb25uID0+IGNvbm4uaXNPdXRwdXRDb25uZWN0b3IpXG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGxldCBjb25uZWN0aW9ucyA9IFtdO1xuXG4gICAgICAgIC8vIGdvIHRocm91Z2ggYWxsIGNvbm5lY3RvcnNcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwXG4gICAgICAgIGZvciAoY29uc3QgY29ubiBvZiB0aGlzLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgICAgIC8vIGdvIHRocm91Z2ggZWFjaCBpdHMgd2lyZSBpZFxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNvbm4ud2lyZUlkcykge1xuICAgICAgICAgICAgICAgIGxldCB0aGlzV2lyZUlkO1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuaGFzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB3aXJlIGlkIGlzIG5vdCBpbiB0aGUgbWFwLCBhZGQgaXQgYW5kIGFzc2lnbiBuZXcgYXJiaXRyYXJ5IGlkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZE1hcC5zZXQoaXRlbSwgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1dpcmVJZCA9IHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBnZXQgaWQgZnJvbSB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIHRoaXNXaXJlSWQgPSB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuZ2V0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoaXMgY29ubmVjdGlvbiB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25zW2Nvbm5lY3Rpb25zLmxlbmd0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb25uLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHdpcmVJZDogdGhpc1dpcmVJZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyKytcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAvLyBpZDogdGhpcy5zdmdPYmouaWQsXG4gICAgICAgICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdGhpcy5nZXRUcmFuc2Zvcm0oKSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25zOiBjb25uZWN0aW9uc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcyhtYXJnaW5Ub3AgPSAwLCBtYXJnaW5SaWdodCA9IDAsIG1hcmdpbkJvdHRvbSA9IDAsIG1hcmdpbkxlZnQgPSAwLCAuLi5zcGVjaWFsTm9kZXMpIHtcbiAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvcihsZXQgeCA9IG1hcmdpbkxlZnQgOyB4IDw9IHRoaXMuZ3JpZFdpZHRoIC0gbWFyZ2luUmlnaHQgOyB4KyspIHtcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IG1hcmdpblRvcCA7IHkgPD0gdGhpcy5ncmlkSGVpZ2h0IC0gbWFyZ2luQm90dG9tIDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBzcGVjaWFsTm9kZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmFkZChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24sIHJlZGVmaW5lZCBpbiBpbmhlcml0ZWQgZWxlbWVudHNcbiAgICAgICAgLy8gcmVmcmVzaFN0YXRlIHRha2VzIGlucHV0IGNvbm5lY3RvciB2YWx1ZXMgYW5kIHNldHMgb3V0cHV0IHZhbHVlcyBhY2NvcmRpbmdseVxuICAgICAgICBjb25zb2xlLndhcm4oXCJDYWxsaW5nIHRoZSB2aXJ0dWFsIGZ1bmN0aW9uIHJlZnJlc2hTdGF0ZSBoYXMgbm8gZWZmZWN0LlwiKTtcbiAgICB9XG5cbiAgICAvLyB1c2FnZTogY2hhbmdlSW1hZ2UoXCJhYmNcIikgY2hhbmdlcyBpbWFnZSB1cmwgdG8gaW1hZ2UtYWJjLnN2Z1xuICAgIC8vICAgICAgICBjaGFuZ2VJbWFnZSgpIGNoYW5nZXMgaW1hZ2UgdXJsIHRvIHRoZSBkZWZhdWx0IG9uZSAoaW1hZ2Uuc3ZnKVxuICAgIGNoYW5nZUltYWdlKHN1ZmZpeCkge1xuICAgICAgICBpZihzdWZmaXggPT09IHVuZGVmaW5lZCB8fCBzdWZmaXggPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHN1ZmZpeCA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWZmaXggPSBcIi1cIiArIHN1ZmZpeDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVybCA9IFwiaW1nL1wiICsgdGhpcy5jYXRlZ29yeSArIFwiL1wiICsgdGhpcy5uYW1lICsgc3VmZml4ICsgXCIuc3ZnXCI7XG5cbiAgICAgICAgdGhpcy5pbWFnZS5jaGFuZ2VVcmwodGhpcy51cmwpO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgYSBqUXVlcnkgb2JqZWN0XG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmouZ2V0KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQmxvY2tlZE5vZGUoeCwgeSkge1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5ibG9ja2VkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmKGl0ZW0ueD09PXggJiYgaXRlbS55PT09eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJvdGF0ZUJsb2NrZWROb2Rlc1JpZ2h0KCkge1xuICAgICAgICBpZih0aGlzLnJvdGF0aW9uPT09dW5kZWZpbmVkIHx8IHRoaXMucm90YXRpb249PT00KSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdGF0aW9uKys7XG5cbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbiA9PT0gMSB8fCB0aGlzLnJvdGF0aW9uID09PSAzKSB7XG4gICAgICAgICAgICBsZXQgbmV3QmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBuZXdCbG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5hYnMoaXRlbS55IC0gdGhpcy5ncmlkSGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgeTogaXRlbS54XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3QmxvY2tlZE5vZGVzO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5yb3RhdGlvbiA9PT0gMiB8fCB0aGlzLnJvdGF0aW9uID09PSA0KSB7XG4gICAgICAgICAgICBsZXQgbmV3QmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBuZXdCbG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5hYnMoaXRlbS55IC0gdGhpcy5ncmlkV2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICB5OiBpdGVtLnhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMgPSBuZXdCbG9ja2VkTm9kZXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDb25uZWN0b3IobGVmdCwgdG9wLCBjb25uZWN0b3JUeXBlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY29ubmVjdG9ycy5sZW5ndGg7XG4gICAgICAgIGlmKGNvbm5lY3RvclR5cGU9PT1Db25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzW2luZGV4XSA9IG5ldyBJbnB1dENvbm5lY3Rvcih0aGlzLnBhcmVudFNWRywgdGhpcy5ncmlkU2l6ZSwgbGVmdCwgdG9wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1tpbmRleF0gPSBuZXcgT3V0cHV0Q29ubmVjdG9yKHRoaXMucGFyZW50U1ZHLCB0aGlzLmdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENoaWxkKHRoaXMuY29ubmVjdG9yc1tpbmRleF0uZ2V0KCkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlQmxvY2tlZE5vZGUobGVmdCwgdG9wKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRoZSBjb25uZWN0b3Igb2JqZWN0IGJhc2VkIG9uIGl0cyBpZFxuICAgIGdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmNvbm5lY3RvcnMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmNvbm5lY3RvcnNbaV0uaWQ9PT1jb25uZWN0b3JJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgY29ubmVjdG9yIG5vdCBmb3VuZCwgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybTtcbiAgICAgICAgaWYgKCF0aGlzLnN2Z09iai4kZWwuYXR0cihcInRyYW5zZm9ybVwiKSkge1xuICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnQgZG9lcyBub3QgaGF2ZSBhIFwidHJhbnNmb3JtXCIgcHJvcGVydHkgLS0+IGNyZWF0ZSBpdFxuICAgICAgICAgICAgdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZSgwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnQgZG9lcyBoYXZlIGEgXCJ0cmFuc2Zvcm1cIiBwcm9wZXJ0eSAtLT4gY2hhbmdlIGl0XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHRoaXMuc3ZnT2JqLiRlbC5hdHRyKFwidHJhbnNmb3JtXCIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtO1xuICAgIH1cblxuICAgIHNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tb3VzZUxlZnQgPSBmYWxzZTtcbiAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZURvd25MZWZ0KGV2ZW50KTtcblxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgRE9NIGVsZW1lbnQgdG8gZnJvbnRcbiAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLm1vdmVUb0Zyb250QnlJZCh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bkxlZnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tb3VzZU1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG5cbiAgICAgICAgLy8gc2F2ZSB0aGUgY3VycmVudCBpdGVtIHBvc2l0aW9uIGludG8gYSB2YXJpYWJsZVxuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gdHJhbnNmb3JtLmdldFRyYW5zbGF0ZSgpO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBtb3VzZSBvZmZzZXQgZnJvbSB0aGUgb2JqZWN0IG9yaWdpblxuICAgICAgICB0aGlzLm9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYIC0gY3VycmVudFBvc2l0aW9uLngsXG4gICAgICAgICAgICB5OiBldmVudC5wYWdlWSAtIGN1cnJlbnRQb3NpdGlvbi55XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy5tb3VzZUxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGxldCBsZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLm9mZnNldC54O1xuICAgICAgICAgICAgbGV0IHRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5vZmZzZXQueTtcblxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG4gICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2lyZXModHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubW91c2VNb3ZlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Ecm9wKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IDIgKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tNaWRkbGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcChldmVudCkge1xuICAgICAgICBsZXQgbGVmdCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5vZmZzZXQueDtcbiAgICAgICAgbGV0IHRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5vZmZzZXQueTtcblxuICAgICAgICBsZWZ0ID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZChsZWZ0KTtcbiAgICAgICAgdG9wID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0b3ApO1xuXG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKCk7XG4gICAgfVxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24sIHdpbGwgYmUgcmVkZWZpbmVkIGluIElucHV0Qm94XG4gICAgfVxuXG4gICAgb25DbGlja01pZGRsZSgpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG5cbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLnN2Z09iai4kZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgbGV0IGNlbnRyZVggPSBNYXRoLnJvdW5kKHJlY3Qud2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGNlbnRyZVkgPSBNYXRoLnJvdW5kKHJlY3QuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgY2VudHJlWCAtPSBjZW50cmVYICUgdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgY2VudHJlWSAtPSBjZW50cmVZICUgdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICB0cmFuc2Zvcm0ucm90YXRlUmlnaHQoXG4gICAgICAgICAgICBjZW50cmVYLFxuICAgICAgICAgICAgY2VudHJlWVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuXG4gICAgICAgIHRoaXMucm90YXRlQmxvY2tlZE5vZGVzUmlnaHQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlcyBhbGwgd2lyZXMgY29ubmVjdGVkIHRvIHRoaXMgYm94XG4gICAgdXBkYXRlV2lyZXModGVtcG9yYXJ5ID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JzLmZvckVhY2goY29ubiA9PiB7XG4gICAgICAgICAgICBjb25uLndpcmVJZHMuZm9yRWFjaCh3aXJlSWQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB3aXJlID0gdGhpcy5wYXJlbnRTVkcuZ2V0V2lyZUJ5SWQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBpZih0ZW1wb3JhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS50ZW1wb3JhcnlXaXJlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS5yb3V0ZVdpcmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGlzT24gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDc7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBcImlucHV0XCIsIFwiaW9cIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5hZGRDb25uZWN0b3Iod2lkdGgsIGhlaWdodCAvIDIsIENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3Rvcik7XG5cbiAgICAgICAgdGhpcy5vbiA9IGlzT247XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGxldCBkYXRhID0gc3VwZXIuZXhwb3J0RGF0YTtcbiAgICAgICAgZGF0YS5pc09uID0gdGhpcy5pc09uO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAxLCAxLCAwKTtcbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIHN0YXJ0IGEgbmV3IHNpbXVsYXRpb24gZnJvbSB0aGUgb3V0cHV0IGNvbm5lY3RvclxuICAgICAgICB0aGlzLnBhcmVudFNWRy5zdGFydE5ld1NpbXVsYXRpb24odGhpcy5jb25uZWN0b3JzWzBdLCB0aGlzLmNvbm5lY3RvcnNbMF0uc3RhdGUpXG4gICAgfVxuXG4gICAgc2V0IG9uKGlzT24pIHtcbiAgICAgICAgaWYgKGlzT24pIHtcbiAgICAgICAgICAgIC8vIHR1cm4gb25cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvblwiKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5zdGF0ZS5vbik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9mZlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLnN0YXRlLm9mZik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzT24gPSBpc09uO1xuICAgIH1cblxuICAgIGdldCBvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPbjtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICB0aGlzLm9uID0gIXRoaXMub247XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA1O1xuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgXCJvdXRwdXRcIiwgXCJpb1wiLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuY29ubmVjdG9yc1swXS5zdGF0ZSk7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib25cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib2ZmXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9zY1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcygpIHtcbiAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDAsIDAsIDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdhdGUgZXh0ZW5kcyBCb3gge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBuYW1lLCBcImdhdGVcIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgLy8gb3V0cHV0XG4gICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKHdpZHRoLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5vdXRwdXRDb25uZWN0b3IpO1xuXG4gICAgICAgIGlmKHRoaXMubmFtZT09PVwibm90XCIpIHtcbiAgICAgICAgICAgIC8vIGlucHV0XG4gICAgICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpbnB1dFxuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gNCwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gKDQvMyksIENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKTtcblxuICAgICAgICAgICAgLy8gYWRkIG9uZSBibG9ja2VkTm9kZSBiZXR3ZWVuIHRoZSBpbnB1dHMgKGZvciBiZXR0ZXIgbG9va2luZyB3aXJpbmcpXG4gICAgICAgICAgICAvLyBhbmQgcmVnZW5lcmF0ZSBibG9ja2VkIG5vZGVzXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2Rlcyh7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiBoZWlnaHQgLyAyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXRlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKHNwZWNpYWxOb2RlKSB7XG4gICAgICAgIGlmKHNwZWNpYWxOb2RlIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdXBlci5nZW5lcmF0ZUJsb2NrTm9kZXMoMCwgMSwgMCwgMSwgc3BlY2lhbE5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDAsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICBsZXQgc3RhdGUgPSBMb2dpYy5zdGF0ZS51bmtub3duXG4gICAgICAgIHN3aXRjaCAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMuYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5hbmRcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5uYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLm5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub3RcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5ub3QodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLnhub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMueG9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vdGlmeSB0aGUgc2ltdWxhdG9yIGFib3V0IHRoaXMgY2hhbmdlXG4gICAgICAgIHRoaXMucGFyZW50U1ZHLnNpbXVsYXRpb24ubm90aWZ5Q2hhbmdlKHRoaXMuY29ubmVjdG9yc1swXS5pZCwgc3RhdGUpXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgV2lyZSBleHRlbmRzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGZyb21JZCwgdG9JZCwgZ3JpZFNpemUsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIC8vIHNtYWxsIHRvZG86IHJld29yayBzdGFydC4uLiBlbmQuLi4gdG8gYXJyYXlzPyAobm90IGltcG9ydGFudClcblxuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmZyb21JZCA9IGZyb21JZDtcbiAgICAgICAgdGhpcy50b0lkID0gdG9JZDtcblxuICAgICAgICB0aGlzLnN0YXJ0Qm94ID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZChmcm9tSWQpO1xuICAgICAgICB0aGlzLmVuZEJveCA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQodG9JZCk7XG5cbiAgICAgICAgdGhpcy5ib3hlcyA9IFt0aGlzLnN0YXJ0Qm94LCB0aGlzLmVuZEJveF1cblxuICAgICAgICB0aGlzLnN0YXJ0Q29ubmVjdG9yID0gdGhpcy5wYXJlbnRTVkcuZ2V0Q29ubmVjdG9yQnlJZChmcm9tSWQpO1xuICAgICAgICB0aGlzLmVuZENvbm5lY3RvciA9IHRoaXMucGFyZW50U1ZHLmdldENvbm5lY3RvckJ5SWQodG9JZCk7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0b3JzID0gW3RoaXMuc3RhcnRDb25uZWN0b3IsIHRoaXMuZW5kQ29ubmVjdG9yXVxuICAgICAgICB0aGlzLnJvdXRlV2lyZSh0cnVlLCByZWZyZXNoKTtcblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IExvZ2ljLnN0YXRlLnVua25vd247XG5cbiAgICAgICAgZm9yIChsZXQgY29ubmVjdG9yIG9mIHRoaXMuY29ubmVjdG9ycykge1xuICAgICAgICAgICAgaWYoY29ubmVjdG9yLmlzT3V0cHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShjb25uZWN0b3Iuc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKFwid2lyZVwiKTtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZyb21JZDogdGhpcy5mcm9tSWQsXG4gICAgICAgICAgICB0b0lkOiB0aGlzLnRvSWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub2ZmOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vZmYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhcnRDb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5zdGFydENvbm5lY3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5lbmRDb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5lbmRDb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlQXR0cjtcbiAgICB9XG5cbiAgICB1cGRhdGVXaXJlU3RhdGUoKSB7XG4gICAgICAgIGZvciAoY29uc3QgYm94IG9mIHRoaXMuYm94ZXMpIHtcbiAgICAgICAgICAgIGJveC5yZWZyZXNoU3RhdGUoKVxuICAgICAgICB9XG4gICAgICAgIC8vIGZvciAoY29uc3QgY29ubiBvZiB0aGlzLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgLy8gICAgIGlmKGNvbm4uaXNPdXRwdXRDb25uZWN0b3IpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnBhcmVudFNWRy5zdGFydE5ld1NpbXVsYXRpb24oY29ubi5pZCwgY29ubi5zdGF0ZSlcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqLmdldCgpO1xuICAgIH1cblxuICAgIGdldFRlbXBvcmFyeVdpcmVQb2ludHMoKSB7XG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnRzKCk7XG4gICAgICAgIHBvaW50cy5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMud2lyZVN0YXJ0LngsIHRoaXMud2lyZVN0YXJ0LnkpKTtcbiAgICAgICAgcG9pbnRzLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy53aXJlRW5kLngsIHRoaXMud2lyZUVuZC55KSk7XG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgdGVtcG9yYXJ5V2lyZSgpIHtcbiAgICAgICAgdGhpcy53aXJlU3RhcnQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuc3RhcnRDb25uZWN0b3IsIGZhbHNlKTtcbiAgICAgICAgdGhpcy53aXJlRW5kID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLmVuZENvbm5lY3RvciwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuc2V0V2lyZVBhdGgodGhpcy5nZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCkpO1xuXG4gICAgICAgIC8vIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgLy8gdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuICAgIH1cblxuICAgIHJvdXRlV2lyZShzbmFwVG9HcmlkID0gdHJ1ZSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy53aXJlU3RhcnQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuc3RhcnRDb25uZWN0b3IsIHNuYXBUb0dyaWQpO1xuICAgICAgICB0aGlzLndpcmVFbmQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuZW5kQ29ubmVjdG9yLCBzbmFwVG9HcmlkKTtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IHRoaXMuYVN0YXIoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlU3RhcnQueCAvIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgeTogdGhpcy53aXJlU3RhcnQueSAvIHRoaXMuZ3JpZFNpemVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlRW5kLnggLyB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMud2lyZUVuZC55IC8gdGhpcy5ncmlkU2l6ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRXaXJlUGF0aCh0aGlzLnBvaW50cyk7XG5cbiAgICAgICAgaWYgKHJlZnJlc2gpXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdpcmVTdGF0ZSgpO1xuICAgIH1cblxuICAgIHNldFdpcmVQYXRoKHBvaW50cykge1xuICAgICAgICAvLyBzZXQgdGhlIGxpbmVcbiAgICAgICAgaWYodGhpcy5zdmdPYmohPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqLnVwZGF0ZVBvaW50cyhwb2ludHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdmdPYmogPSBuZXcgc3ZnT2JqLlBvbHlMaW5lKHBvaW50cywgXCIjOGI4YjhiXCIsIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XG4gICAgICAgICAgICBmcm9tSWQ6IHRoaXMuZnJvbUlkLFxuICAgICAgICAgICAgdG9JZDogdGhpcy50b0lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvLyBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiB0aGlzIHBzZXVkb2NvZGU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0EqX3NlYXJjaF9hbGdvcml0aG0jUHNldWRvY29kZVxuICAgIGFTdGFyKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgLy8gbnVtYmVyIG9mIG5vZGVzLCB0aGF0IGNhbiBiZSBvcGVuZWQgYXQgb25jZVxuICAgICAgICAvLyBvbmNlIGlzIHRoaXMgbGltaXQgZXhjZWVkZWQsIGFTdGFyIHdpbGwgZmFpbCBhbmQgZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cyB3aWxsIGJlIHVzZWQgaW5zdGVhZFxuICAgICAgICBjb25zdCBtYXhOb2RlTGltaXQgPSA1MDAwMDtcblxuICAgICAgICBsZXQgY2xvc2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGxldCBvcGVuTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIG9wZW5Ob2Rlcy5hZGQoc3RhcnQpO1xuXG4gICAgICAgIGxldCBjYW1lRnJvbSA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHZhbHVlOiBpbmZpbml0eVxuICAgICAgICBsZXQgZ1Njb3JlID0gbmV3IFN0cnVjdHVyZXMuTWFwV2l0aERlZmF1bHRWYWx1ZShJbmZpbml0eSk7XG4gICAgICAgIGdTY29yZS5zZXQoc3RhcnQsIDApO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgdmFsdWU6IGluZmluaXR5XG4gICAgICAgIGxldCBmU2NvcmUgPSBuZXcgU3RydWN0dXJlcy5NYXBXaXRoRGVmYXVsdFZhbHVlKEluZmluaXR5KTtcbiAgICAgICAgZlNjb3JlLnNldChzdGFydCwgV2lyZS5tYW5oYXR0YW5EaXN0YW5jZShzdGFydCwgZW5kKSk7XG5cbiAgICAgICAgbGV0IG5vblJvdXRhYmxlID0gdGhpcy5wYXJlbnRTVkcuZ2V0Tm9uUm91dGFibGVOb2RlcygpO1xuICAgICAgICBsZXQgcHVuaXNoZWRCdXRSb3V0YWJsZTtcbiAgICAgICAgaWYodGhpcy5zdmdPYmo9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHB1bmlzaGVkQnV0Um91dGFibGUgPSB0aGlzLnBhcmVudFNWRy5nZXRJbmNvbnZlbmllbnROb2RlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHVuaXNoZWRCdXRSb3V0YWJsZSA9IHRoaXMucGFyZW50U1ZHLmdldEluY29udmVuaWVudE5vZGVzKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChvcGVuTm9kZXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZUZTY29yZTtcblxuICAgICAgICAgICAgLy8gZmluZCB0aGUgdmFsdWUgZnJvbSBvcGVuTm9kZXMgdGhhdCBoYXMgdGhlIGxvd2VzdCBmU2NvcmVcbiAgICAgICAgICAgIC8vIChjYW4gYmUgaW1wbGVtZW50ZWQgZWZmZWN0aXZlbHkgdXNpbmcgbWluLWhlYXAgZGF0YSBzdHJ1Y3R1cmUgKG1heWJlIHRvZG8gc29tZXRpbWUpPylcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBvcGVuTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZighY3VycmVudE5vZGUgfHwgZlNjb3JlLmdldChub2RlKSA8IGN1cnJlbnROb2RlRlNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGVGU2NvcmUgPSBmU2NvcmUuZ2V0KGN1cnJlbnROb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc3ZnT2JqLlBvbHlsaW5lUG9pbnQuZXF1YWxzKGN1cnJlbnROb2RlLCBlbmQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjb25zdHJ1Y3RQYXRoKGNhbWVGcm9tLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9wZW5Ob2Rlcy5kZWxldGUoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgY2xvc2VkTm9kZXMuYWRkKGN1cnJlbnROb2RlKTtcblxuICAgICAgICAgICAgLy8gdGhlIGZhcnRoZXN0IHBvaW50cyBhY2Nlc3NpYmxlIHdpdGhvdXQgYXZvaWRpbmcgb2JzdGFjbGVzIGluIGV2ZXJ5IGRpcmVjdGlvblxuICAgICAgICAgICAgLy8gKGJ1dCBtYXggNTAgaW4gZWFjaCBkaXJlY3Rpb24pXG4gICAgICAgICAgICBmb3IobGV0IGRpcmVjdGlvbiA9IDAgOyBkaXJlY3Rpb24gPCA0IDsgZGlyZWN0aW9uKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9pbnQgPSBXaXJlLm1vdmVQb2ludChjdXJyZW50Tm9kZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDUwIDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5ld1BvaW50IGlzIGluIHRoZSBzZXQgb2Ygbm9uIHJvdXRhYmxlIHBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWRkIGl0IGFuZCBzdG9wIHByb2NlZWRpbmcgaW4gdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoV2lyZS5zZXRIYXNUaGlzUG9pbnQobm9uUm91dGFibGUsIHRoaXMuc2NhbGVQb2ludFRvR3JpZChuZXdQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNraXAgdGhpcyBub2RlLCBpZiBpdCBoYXMgYmVlbiBhbHJlYWR5IGNsb3NlZFxuICAgICAgICAgICAgICAgICAgICAvLyBvciBpZiBpdCBpcyBvbiB0aGUgbGlzdCBvZiBub24gcm91dGFibGUgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlZE5vZGVzLmhhcyhuZXdQb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcGVuTm9kZXMuaGFzKG5ld1BvaW50KS55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuTm9kZXMuYWRkKG5ld1BvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBwb3NzaWJsZSBHU2NvcmUgYnkgYWRkaW5nIDEgdG8gdGhlIHNjb3JlIG9mIHRoZSBub2RlIHdlIGNhbWUgZnJvbVxuICAgICAgICAgICAgICAgICAgICAvLyAod2UgcHJpb3JpdGl6ZSB0byBtaW5pbWl6ZSB0aGUgbnVtYmVyIG9mIG5vZGVzIGFuZCBub3QgdGhlIGRpc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAvLyAgc28gd2UgYXJlIGFkZGluZyAxIG9uIGFsbCBub2RlcywgZXZlbiBpZiB0aGUgZXVjbGlkZWFuIC8gbWFubmhhdGFuIGRpc3RhbmNlIG1heSB2YXJ5KVxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5jcmVtZW50ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSE9PTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc3NpYmxlR1Njb3JlID0gZ1Njb3JlLmdldChjdXJyZW50Tm9kZSkgKyBpbmNyZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoV2lyZS5zZXRIYXNUaGlzUG9pbnQocHVuaXNoZWRCdXRSb3V0YWJsZSwgdGhpcy5zY2FsZVBvaW50VG9HcmlkKG5ld1BvaW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBub2RlIGlzIGluIHRoZSBzZXQgb2YgcHVuaXNoZWQgbm9kZSwgcHVuaXNoIGl0IGJ5IGFkZGluZyB0byB0aGUgR1Njb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZUdTY29yZSArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3NpYmxlR1Njb3JlID49IGdTY29yZS5nZXQobmV3UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNhbWVGcm9tLnNldChuZXdQb2ludCwgY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBnU2NvcmUuc2V0KG5ld1BvaW50LCBwb3NzaWJsZUdTY29yZSk7XG4gICAgICAgICAgICAgICAgICAgIGZTY29yZS5zZXQobmV3UG9pbnQsIHBvc3NpYmxlR1Njb3JlICsgV2lyZS5tYW5oYXR0YW5EaXN0YW5jZShuZXdQb2ludCwgZW5kKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmV3UG9pbnQgaXMgaW4gdGhlIHNldCBvZiBwdW5pc2hlZCBidXQgcm91dGFibGUgcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgaXQgYnV0IHN0b3AgcHJvY2VlZGluZyBpbiB0aGlzIGRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICBpZihXaXJlLnNldEhhc1RoaXNQb2ludChwdW5pc2hlZEJ1dFJvdXRhYmxlLCB0aGlzLnNjYWxlUG9pbnRUb0dyaWQobmV3UG9pbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlIHRvIHRoZSBuZXh0IHBvaW50IGluIHRoZSBkaXJlY2l0b25cbiAgICAgICAgICAgICAgICAgICAgbmV3UG9pbnQgPSBXaXJlLm1vdmVQb2ludChuZXdQb2ludCwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKG9wZW5Ob2Rlcy5zaXplID4gbWF4Tm9kZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgZ290IGhlcmUsIHRoZSBwYXRoIGRvZXMgbm90IGV4aXN0IC0+IGxldCdzIHVzZSB0ZW1wb3JhcnkgcGF0aCBpZ25vcmluZyBhbGwgY29saXNpb25zXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRlbXBvcmFyeVdpcmVQb2ludHMoKTtcbiAgICB9XG4gICAgc3RhdGljIG1vdmVQb2ludChwb2ludCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIDA6IC8vIHVwXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueSAtIDFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAxOiAvLyByaWdodFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LnggKyAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgMjogLy8gZG93blxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgKyAxXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgMzogLy8gbGVmdFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LnggLSAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzY2FsZVBvaW50VG9HcmlkKHBvaW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBwb2ludC54ICogdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgIHk6IHBvaW50LnkgKiB0aGlzLmdyaWRTaXplXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNvbnN0cnVjdFBhdGgoY2FtZUZyb20sIGN1cnJlbnROb2RlKSB7XG4gICAgICAgIGxldCB0b3RhbFBhdGggPSBuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnRzKCk7XG4gICAgICAgIHRvdGFsUGF0aC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KGN1cnJlbnROb2RlLnggKiB0aGlzLmdyaWRTaXplLCBjdXJyZW50Tm9kZS55ICogdGhpcy5ncmlkU2l6ZSkpO1xuXG4gICAgICAgIHdoaWxlIChjYW1lRnJvbS5oYXMoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGNhbWVGcm9tLmdldChjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICB0b3RhbFBhdGguYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludChjdXJyZW50Tm9kZS54ICogdGhpcy5ncmlkU2l6ZSwgY3VycmVudE5vZGUueSAqIHRoaXMuZ3JpZFNpemUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b3RhbFBhdGg7XG4gICAgfVxuXG4gICAgc3RhdGljIG1hbmhhdHRhbkRpc3RhbmNlKGEsIGIpIHtcbiAgICAgICAgLy8gTWFuaGF0dGFuIGdlb21ldHJ5XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhhLnggLSBiLngpICsgTWF0aC5hYnMoYS55IC0gYi55KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0SGFzVGhpc1BvaW50KHNldCwgcG9pbnQpIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBzZXQpIHtcbiAgICAgICAgICAgIGlmKGl0ZW0ueCA9PT0gcG9pbnQueCAmJiBpdGVtLnkgPT09IHBvaW50LnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Q29vcmRpbmF0ZXMoY29ubmVjdG9yLCBzbmFwVG9HcmlkID0gdHJ1ZSkge1xuICAgICAgICAvLyBjb25uZWN0b3Iuc3ZnT2JqLmlkIGhhcyB0byBiZSBjYWxsZWQsIGVsc2UgdGhlIGdldENvb3JkaW5hdGVzIGRvZXMgbm90IHdvcmsgb24gdGhlIGZpcnN0IGNhbGwgaW4gRmlyZWZveCA1NVxuICAgICAgICBsZXQgZHVtbXkgPSBjb25uZWN0b3Iuc3ZnT2JqLmlkO1xuXG4gICAgICAgIGxldCAkY29ubmVjdG9yID0gY29ubmVjdG9yLnN2Z09iai4kZWw7XG5cbiAgICAgICAgbGV0IHBvc2l0aW9uID0gJGNvbm5lY3Rvci5wb3NpdGlvbigpO1xuICAgICAgICBsZXQgd2lkdGggPSAkY29ubmVjdG9yLmF0dHIoXCJ3aWR0aFwiKTtcbiAgICAgICAgbGV0IGhlaWdodCA9ICRjb25uZWN0b3IuYXR0cihcImhlaWdodFwiKTtcblxuICAgICAgICBsZXQgeCA9IHBvc2l0aW9uLmxlZnQgKyB3aWR0aCAvIDI7XG4gICAgICAgIGxldCB5ID0gcG9zaXRpb24udG9wICsgaGVpZ2h0IC8gMjtcbiAgICAgICAgaWYoc25hcFRvR3JpZCkge1xuICAgICAgICAgICAgeCA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQoeCk7XG4gICAgICAgICAgICB5ID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBDb250ZXh0TWVudUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUsIGNvbnRleHRNZW51LCBwYXJlbnRTVkcsIGNsaWNrRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudSA9IGNvbnRleHRNZW51O1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcblxuICAgICAgICB0aGlzLiRlbCA9ICQoXCI8bGk+XCIpO1xuICAgICAgICAkKHRoaXMuJGVsKVxuICAgICAgICAgICAgLnRleHQobmFtZSlcbiAgICAgICAgICAgIC5hdHRyKFwidHlwZVwiLCB0eXBlKTtcblxuICAgICAgICBpZihjbGlja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgICAkKHRoaXMuJGVsKS5jbGljayhcbiAgICAgICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRnVuY3Rpb24oZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENsYXNzKGNscykge1xuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhjbHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhcHBlbmRJdGVtKGl0ZW0pIHtcbiAgICAgICAgaWYoIXRoaXMuc3ViTGlzdCkge1xuICAgICAgICAgICAgdGhpcy5zdWJMaXN0ID0gJChcIjx1bD5cIik7XG4gICAgICAgICAgICB0aGlzLiRlbC5hcHBlbmQodGhpcy5zdWJMaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ViTGlzdC5hcHBlbmQoaXRlbS5qUXVlcnkpO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGdldCBqUXVlcnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbDtcbiAgICB9XG59XG5jbGFzcyBHYXRlTWVudUl0ZW0gZXh0ZW5kcyBDb250ZXh0TWVudUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGNvbnRleHRNZW51LCBwYXJlbnRTVkcpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICB0eXBlLCAvLyBuYW1lIGlzIHRoZSB0eXBlXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgY29udGV4dE1lbnUsXG4gICAgICAgICAgICBwYXJlbnRTVkcsXG4gICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGNvbnRleHRNZW51LnBvc2l0aW9uLnggLyBwYXJlbnRTVkcuZ3JpZFNpemUpICogcGFyZW50U1ZHLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IE1hdGgucm91bmQoY29udGV4dE1lbnUucG9zaXRpb24ueSAvIHBhcmVudFNWRy5ncmlkU2l6ZSkgKiBwYXJlbnRTVkcuZ3JpZFNpemVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcGFyZW50U1ZHLm5ld0dhdGUoXG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQsIC8vIHggY29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi50b3AgLy8geSBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHRNZW51IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG5cbiAgICAgICAgY29uc3QgZ2F0ZXMgPSBbXCJub3RcIiwgXCJhbmRcIiwgXCJvclwiLCBcIm5hbmRcIiwgXCJub3JcIiwgXCJ4b3JcIiwgXCJ4bm9yXCJdO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICB4OiAwLCB5OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kZWwgPSAkKFwiPHVsPlwiKTtcbiAgICAgICAgdGhpcy4kZWwuYXR0cignaWQnLCAnY29udGV4dE1lbnUnKTtcblxuICAgICAgICBsZXQgZ2F0ZUxpc3QgPSBuZXcgQ29udGV4dE1lbnVJdGVtKFwiTmV3IGdhdGVcIiwgJycsIHRoaXMsIHBhcmVudFNWRyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IGdhdGVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgZ2F0ZUxpc3QuYXBwZW5kSXRlbShcbiAgICAgICAgICAgICAgICBuZXcgR2F0ZU1lbnVJdGVtKGdhdGVzW2ldLCB0aGlzLCBwYXJlbnRTVkcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwZW5kSXRlbShnYXRlTGlzdCk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgbmV3IENvbnRleHRNZW51SXRlbShcIklucHV0IGJveFwiLCAnJywgdGhpcywgcGFyZW50U1ZHLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLngpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueSlcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRTVkcubmV3SW5wdXQocG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKG5ldyBDb250ZXh0TWVudUl0ZW0oXCJPdXRwdXQgYm94XCIsICcnLCB0aGlzLCBwYXJlbnRTVkcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueCksXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBhcmVudFNWRy5uZXdPdXRwdXQocG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kQ29uZGl0aW9uYWxJdGVtKCdib3gnLCAnUmVtb3ZlIHRoaXMgaXRlbScsIGlkID0+IHt0aGlzLnBhcmVudFNWRy5yZW1vdmVCb3goaWQpfSk7XG4gICAgICAgIHRoaXMuYXBwZW5kQ29uZGl0aW9uYWxJdGVtKCd3aXJlJywgJ1JlbW92ZSB0aGlzIHdpcmUnLCBpZCA9PiB7dGhpcy5wYXJlbnRTVkcucmVtb3ZlV2lyZUJ5SWQoaWQpfSk7XG5cbiAgICAgICAgcGFyZW50U1ZHLiRzdmcuYmVmb3JlKHRoaXMuJGVsKTtcbiAgICB9XG5cbiAgICBhcHBlbmRJdGVtKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGl0ZW0ualF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLy8gYXBwZW5kcyBhbiBjb25uZGl0aW9uYWwgaXRlbSAodGhhdCBpcyBzaG93biBvbmx5IGlmIHRoZSB0YXJnZXRcbiAgICAvLyBoYXMgdGhlIGNsYXNzIGl0ZW1DbGFzcylcbiAgICAvLyBjbGlja0Z1bmN0aW9uIHRha2VzIG9uZSBhcmd1bWVudDogSUQgb2YgdGhlIHRhcmdldFxuICAgIGFwcGVuZENvbmRpdGlvbmFsSXRlbShpdGVtQ2xhc3MsIHRleHQsIGNsaWNrRnVuY3Rpb24pIHtcbiAgICAgICAgaWYoIXRoaXMuY29uZGl0aW9uYWxJdGVtcykge1xuICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXNbdGhpcy5jb25kaXRpb25hbEl0ZW1zLmxlbmd0aF0gPSB7XG4gICAgICAgICAgICBpdGVtQ2xhc3M6IGl0ZW1DbGFzcyxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICBjbGlja0Z1bmN0aW9uOiBjbGlja0Z1bmN0aW9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWNpZGVzIHdoZXRoZXIgb3Igbm90IHRvIGRpc3BsYXkgc3BlY2lmaWMgY29uZGl0aW9uYWwgaXRlbXNcbiAgICByZXNvbHZlQ29uZGl0aW9uYWxJdGVtcygkdGFyZ2V0KSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmRpdGlvbmFsSXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmKCR0YXJnZXQuaGFzQ2xhc3ModGhpcy5jb25kaXRpb25hbEl0ZW1zW2ldLml0ZW1DbGFzcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZEl0ZW0oXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDb250ZXh0TWVudUl0ZW0oXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXNbaV0udGV4dCwgJycsIHRoaXMsIHRoaXMucGFyZW50U1ZHLFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtc1tpXS5jbGlja0Z1bmN0aW9uKCR0YXJnZXQuYXR0cignaWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLmFkZENsYXNzKCdjb25kaXRpb25hbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaGlkZXMgYWxsIGNvbmRpdGlvbmFsIGl0ZW1zXG4gICAgaGlkZUFsbENvbmRpdGlvbmFsSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNoaWxkcmVuKCcuY29uZGl0aW9uYWwnKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvLyBkaXNwbGF5cyB0aGUgY29udGV4dCBtZW51IHdpdGggdGhlIHJpZ2h0IHNldCBvZiBjb25kaXRpb25hbCBpdGVtc1xuICAgIGRpc3BsYXkoeCwgeSwgJHRhcmdldCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRlbC5jc3Moe1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIHRvcDogeSArIFwicHhcIixcbiAgICAgICAgICAgIGxlZnQ6IHggKyBcInB4XCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZXNvbHZlQ29uZGl0aW9uYWxJdGVtcygkdGFyZ2V0KTtcbiAgICB9XG5cbiAgICAvLyBoaWRlcyB0aGUgY29udGV4dCBtZW51XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy4kZWwuY3NzKHtkaXNwbGF5OiAnbm9uZSd9KTtcbiAgICAgICAgdGhpcy5oaWRlQWxsQ29uZGl0aW9uYWxJdGVtcygpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgY2xhc3MgZXhwb3J0TmV0d29yayB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTVkcuZXhwb3J0RGF0YTtcbiAgICB9XG5cbiAgICBqc29uKHN0eWxlID0gZXhwb3J0TmV0d29yay5zdHlsZS5jb21wYWN0LCBkYXRhVXJpID0gZmFsc2UpIHtcbiAgICAgICAgaWYoZGF0YVVyaSkge1xuICAgICAgICAgICAgcmV0dXJuICdkYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCwnXG4gICAgICAgICAgICAgICAgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5qc29uKHN0eWxlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3Q6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmV4cG9ydERhdGEpO1xuICAgICAgICAgICAgICAgIGNhc2UgZXhwb3J0TmV0d29yay5zdHlsZS5wcmV0dHk6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmV4cG9ydERhdGEsIG51bGwsIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZXR0eTogMCxcbiAgICAgICAgICAgIGNvbXBhY3Q6IDFcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBpbXBvcnROZXR3b2sge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgc3RyaW5nKSB7XG4gICAgICAgIHBhcmVudFNWRy5pbXBvcnREYXRhKFxuICAgICAgICAgICAgSlNPTi5wYXJzZShzdHJpbmcpXG4gICAgICAgICk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHtleHBvcnROZXR3b3JrLCBpbXBvcnROZXR3b2t9IGZyb20gXCIuL2ltcG9ydEV4cG9ydC5qc1wiO1xuXG5jbGFzcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzcGVjaWZpY1RhZykge1xuICAgICAgICBpZighc3BlY2lmaWNUYWcpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJChcIjxkaXY+XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKFwiPFwiICsgc3BlY2lmaWNUYWcgKyBcIj5cIilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gY29uc3QgbW91c2VJY29uID1cbi8vICAgICBcIjxzdmcgY2xhc3M9XFxcIm1vdXNlSWNvblxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiBoZWlnaHQ9XFxcIjEyMS43NzEzMW1tXFxcIiB3aWR0aD1cXFwiODIuMzI3NTgzbW1cXFwiIHZlcnNpb249XFxcIjEuMVxcXCIgdmlld0JveD1cXFwiMCAwIDI5MS43MTE5MSA0MzEuNDczMTRcXFwiPlwiICtcbi8vICAgICBcIjxnIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKC0yMDIuNzA5MDgsLTI2MC45MjMyKVxcXCI+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggZD1cXFwibTIwMi44MTEwOCA0NDMuNTA2NjdjLTAuMTI1NyAxMS4wNTY4MyAwLjA2NTEgMTIuMTI5MTUgMC4wNTI4IDIzLjA5Mzc1IDEuMDQwNCAzOS4yOTE2NS00LjAzMjgxIDc5LjU4NDIgOC44MTQ0MSAxMTcuNTY4MzYgMTcuNTI2MDIgNTguMDA3NDIgNzAuNzYxMiAxMDcuMDc3OTMgMTMzLjEyOTA3IDEwOC4xMTcxOSA2MC44MDQ0OCAyLjYxMjQ3IDExNS44MDYzOC00MS40ODkxMiAxMzYuNjUyNDktOTYuOTM1NTUgMTUuMjE5NDItMzQuNzA1NjEgMTIuNzQ0Ny03Mi44MjYzOCAxMi44MzQtMTA5LjcyMjY2LTAuNDAzNTYtMTcuMjQ5MDUgMC4yNzQ1Mi0yNC43MzI5IDAuMDg3OS00Mi4xMjEwOWgtMjkxLjU3MDY2elxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJsZWZ0XFxcIiBkPVxcXCJtMzM1LjY3Nzg4IDI2MC45MzAzMmMtNTguNjUyNSAwLjY1NTY2LTk5LjYzMTkgNDMuNTEzODYtMTIwLjA4MjEgOTYuOTkyMTktMTAuNTUwNSAyNC4wNjAxMi0xMi41OTM1IDQxLjc3Nzk3LTEyLjg4NjcgNjcuNTgyMDNoMTM1Ljc4MzJ2LTE2NC41NzIyNmMtMC4wMDYgMC4wMDAwOC0wLjAxMTctMC4wMDAwOC0wLjAxNzYgMC0wLjkzNDctMC4wMTEtMS44NjU4LTAuMDEyNC0yLjc5NjgtMC4wMDJ6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcInJpZ2h0XFxcIiBkPVxcXCJtMzYxLjQ2Nzg3IDI2MC45Mjk5M2MtMC45NDIwNy0wLjAxLTEuODg2NC0wLjAwOS0yLjgzMjAzIDAuMDA0djE2NC41NzIyNmgxMzUuNzg1MTZjLTAuMjYyNTctMjQuNDY5NDgtMi4yNTIxLTQwLjc0ODIzLTExLjUwMzkxLTYzLjkwMjQzLTE5LjM0NzA5LTU1LjAzMjI1LTYxLjczMDQzLTEwMC4wNDUyNS0xMjEuNDQ5MjItMTAwLjY3MzgzelxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJtaWRkbGVcXFwiIGQ9XFxcIm0zNDguNTY1MDQgMjk0LjkzMzY1YzE1LjAzNzE0IDAgMjcuMTQyODYgMTIuMTA1NzIgMjcuMTQyODYgMjcuMTQyODZ2NDBjMCAxNS4wMzcxNC0xMi4xMDU3MiAyNy4xNDI4Ni0yNy4xNDI4NiAyNy4xNDI4NnMtMjcuMTQyODYtMTIuMTA1NzItMjcuMTQyODYtMjcuMTQyODZ2LTQwYzAtMTUuMDM3MTQgMTIuMTA1NzItMjcuMTQyODYgMjcuMTQyODYtMjcuMTQyODZ6XFxcIiBzdHJva2U9XFxcIiNmZmZcXFwiIHN0cm9rZS1saW5lY2FwPVxcXCJyb3VuZFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIyMFxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgPC9nPlwiICtcbi8vICAgICBcIjwvc3ZnPlwiO1xuXG5jbGFzcyBoZWxwV2luZG93SXRlbSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhcImhlbHBXaW5kb3dJdGVtXCIpO1xuICAgICAgICB0aGlzLiRlbC5odG1sKHRleHQpO1xuICAgIH1cbn1cblxuY2xhc3MgaGVscFdpbmRvdyBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuJGVsLmF0dHIoXCJpZFwiLCBcImhlbHBcIik7XG5cbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiPHN0cm9uZz5tYWluIG1lbnU8L3N0cm9uZz46IHJpZ2h0IGNsaWNrXCIpKTtcbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiZHJhZyBhbmQgZHJvcCB0byA8c3Ryb25nPm1vdmUgZWxlbWVudHM8L3N0cm9uZz5cIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPm1pZGRsZSBjbGljazwvc3Ryb25nPiB0byByb3RhdGUgZWxlbWVudHNcIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPmNsaWNrIDxpbWcgc3JjPSdpbWcvZ3VpL2hlbHAuc3ZnJyBjbGFzcz0naGVscGljb24nIGFsdD0naGVscCBpY29uJz48L3N0cm9uZz4gdG8gZGlzcGxheSBkb2N1bWVudGF0aW9uIChpbiBjemVjaClcIikpO1xuICAgIH1cblxuICAgIGFwcGVuZChpdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChpdGVtLiRlbCk7XG4gICAgfVxufVxuXG5cbmNsYXNzIGZsb2F0aW5nTWVudUl0ZW0gZXh0ZW5kcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzcGVjaWZpY0NsYXNzLCBpY29uLCB0aXRsZSwgc3BlY2lmaWNUYWcpIHtcbiAgICAgICAgc3VwZXIoc3BlY2lmaWNUYWcpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKFwiYnV0dG9uXCIpO1xuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhzcGVjaWZpY0NsYXNzKTtcblxuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoXG4gICAgICAgICAgICAkKFwiPGltZz5cIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInNyY1wiLCBcImltZy9ndWkvXCIgKyBpY29uICsgXCIuc3ZnXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJhbHRcIiwgdGl0bGUpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ0aXRsZVwiLCB0aXRsZSlcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZsb2F0aW5nTWVudSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gJ2Zsb2F0aW5nTWVudSc7XG5cbiAgICAgICAgdGhpcy4kZWwuYXR0cihcImlkXCIsIGlkKTtcblxuICAgICAgICAvKiBJTVBPUlQgKi9cblxuICAgICAgICAvLyBoZXJlIHdpbGwgYmUgdGhlIGluc3RhbmNlIG9mIExpdHkgc3RvcmVkXG4gICAgICAgIC8vICh3ZSBuZWVkIHRvIHN0b3JlIGl0LCBiZWNhdXNlIHRoZSBcImltcG9ydFwiIGJ1dHRvbiBhbHNvIGNsb3NlcyBMaXR5KVxuICAgICAgICBsZXQgbGl0eUluc3RhbmNlSW1wb3J0O1xuXG4gICAgICAgIGxldCBpbXBvcnRCdXR0b24gPSBuZXcgZmxvYXRpbmdNZW51SXRlbShcImltcG9ydFwiLCBcImltcG9ydFwiLCBcIkltcG9ydCBhIG5ldHdvcmtcIiwgXCJhXCIpO1xuICAgICAgICBpbXBvcnRCdXR0b24uJGVsLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0ICRwb3B1cCA9ICQoXCI8ZGl2PlwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImltcG9ydEV4cG9ydFwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImltcG9ydFwiKTtcblxuICAgICAgICAgICAgbGV0IHRleHRhcmVhSWQgPSBcImltcG9ydEpTT05cIjtcblxuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPHRleHRhcmVhPjwvdGV4dGFyZWE+XCIpLmF0dHIoJ2lkJywgdGV4dGFyZWFJZClcbiAgICAgICAgICAgICkuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8YT5cIilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc1wiOiBcInVwbG9hZFwiXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiPGltZz5cIikuYXR0cignc3JjJywgXCJpbWcvZ3VpL2ltcG9ydC5zdmdcIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFwiIGltcG9ydCBmcm9tIEpTT05cIilcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdGV4dGFyZWEgPSAkKCcjJyt0ZXh0YXJlYUlkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRleHRhcmVhIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1wb3J0U3RyaW5nID0gJHRleHRhcmVhLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBMaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXR5SW5zdGFuY2VJbXBvcnQuY2xvc2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvY2Nlc3MgdGhlIGltcG9ydGVkIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBpbXBvcnROZXR3b2socGFyZW50U1ZHLCBpbXBvcnRTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGl0eUluc3RhbmNlSW1wb3J0ID0gbGl0eSgkcG9wdXApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFwcGVuZChpbXBvcnRCdXR0b24pO1xuXG4gICAgICAgIC8qIEVYUE9SVCAqL1xuXG4gICAgICAgIGxldCBleHBvcnRCdXR0b24gPSBuZXcgZmxvYXRpbmdNZW51SXRlbShcImV4cG9ydFwiLCBcImV4cG9ydFwiLCBcIkV4cG9ydCB0aGlzIG5ldHdvcmtcIiwgXCJhXCIpO1xuICAgICAgICBleHBvcnRCdXR0b24uJGVsLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXcgZXhwb3J0TmV0d29yayhwYXJlbnRTVkcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIHBvcHVwIGNvbnRhaW5lciBob2xkaW5nIGFsbCBwb3B1cCBjb250ZW50ICh0aGF0IHdpbGwgYmUgcGFzc2VkIHRvIGxpdHkpXG4gICAgICAgICAgICBsZXQgJHBvcHVwID0gJChcIjxkaXY+XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0RXhwb3J0XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiZXhwb3J0XCIpO1xuXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgYmxvY2sgd2l0aCBjb2RlIHRvIGJlIGRpc3BsYXllZCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBwb3B1cCBlbGVtZW50XG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8cHJlPlwiKS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoXCI8Y29kZT5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgbGlua3NcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eSwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogXCJkb3dubG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwibmV0d29yay5qc29uXCJcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvZXhwb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICkuYXBwZW5kKFwiIGV4cGFuZGVkIEpTT05cIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8YT5cIikuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBkYXRhLmpzb24oZXhwb3J0TmV0d29yay5zdHlsZS5jb21wYWN0LCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgXCJjbGFzc1wiOiBcImRvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJuZXR3b3JrLm1pbi5qc29uXCJcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvZXhwb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICkuYXBwZW5kKFwiIGNvbXBhY3QgSlNPTlwiKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGl0eSgkcG9wdXApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFwcGVuZChleHBvcnRCdXR0b24pO1xuXG4gICAgICAgIC8qIEhFTFAgKi9cblxuICAgICAgICBsZXQgaGVscCA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiaGVscFwiLCBcImhlbHBcIiwgXCJEaXNwbGF5IGhlbHBcIiwgXCJhXCIpO1xuICAgICAgICBoZWxwLiRlbC5vbihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICAkKFwiI2hlbHBcIikuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpO1xuICAgICAgICB9KS5vbihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgICAgICQoXCIjaGVscFwiKS5yZW1vdmVDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhlbHAuJGVsLmF0dHIoe1xuICAgICAgICAgICAgJ2hyZWYnOiAnLi9kb2NzL3VzZXIuaHRtbCcsXG4gICAgICAgICAgICAnZGF0YS1saXR5JzogJydcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKGhlbHApO1xuXG4gICAgICAgIHBhcmVudFNWRy4kc3ZnLmFmdGVyKHRoaXMuJGVsKTtcbiAgICAgICAgcGFyZW50U1ZHLiRzdmcuYWZ0ZXIobmV3IGhlbHBXaW5kb3coKS4kZWwpO1xuICAgIH1cblxuICAgIGFwcGVuZChtZW51SXRlbSkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQobWVudUl0ZW0uJGVsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYy5qcydcblxuY2xhc3Mgc3RhdGVDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3RvcklkLCBzdGF0ZSwgd2hvQ2F1c2VkSXQpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JJZCA9IGNvbm5lY3RvcklkXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZVxuICAgICAgICB0aGlzLndob0NhdXNlZEl0ID0gd2hvQ2F1c2VkSXRcbiAgICB9XG59XG5cbi8vIGFsbCBjb25uZWN0b3JzIG1lbnRpb25lZCBoZXJlIGFyZSBPVVRQVVQgQ09OTkVDVE9SU1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdGlvbiB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHXG5cbiAgICAgICAgLy8gbWFwcyBlYWNoIGFmZmVjdGVkIG91dHB1dCBjb25uZWN0b3IgdG8gaXQncyBkaXJlY3RseSBwcmVjZWVkaW5nIG91dHB1dCBjb25uZWN0b3JzXG4gICAgICAgIHRoaXMucHJlZGVjZXNzb3JzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8vIG1hcHMgd2F2ZUlkIC0+IGFycmF5IG9mIG91dHB1dENvbm5lY3RvcnMgYWZmZWN0ZWRcbiAgICAgICAgdGhpcy53YXZlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy53YXZlID0gMFxuXG4gICAgICAgIHRoaXMuY3ljbGVkQ29ubmVjdG9ycyA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLnJlc29sdmVkQ3ljbGVkQ29ubmVjdG9ycyA9IG5ldyBTZXQoKVxuXG4gICAgfVxuXG4gICAgcnVuKCkge1xuICAgICAgICB0aGlzLndhdmUrKztcbiAgICAgICAgd2hpbGUodGhpcy53YXZlcy5oYXModGhpcy53YXZlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGVwKClcbiAgICAgICAgICAgIHRoaXMud2F2ZXMuZGVsZXRlKHRoaXMud2F2ZSkgLy8gY2xlYW4gb2xkIHdhdmVzIG9uIHRoZSBnb1xuICAgICAgICAgICAgdGhpcy53YXZlKytcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0ZXAoKSB7XG4gICAgICAgIGZvciAobGV0IHtjb25uZWN0b3JJZCwgc3RhdGUsIHdob0NhdXNlZEl0fSBvZiB0aGlzLndhdmVzLmdldCh0aGlzLndhdmUpKSB7XG4gICAgICAgICAgICAvLyBza2lwIHJlc29sdmVkIGN5Y2xlc1xuICAgICAgICAgICAgaWYodGhpcy5yZXNvbHZlZEN5Y2xlZENvbm5lY3RvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNraXAgY29ubmVjdG9yIHRoYXQgYXJlIGN5Y2xlc1xuICAgICAgICAgICAgaWYgKHRoaXMuY3ljbGVkQ29ubmVjdG9ycy5oYXMoY29ubmVjdG9ySWQpKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBzZXQgb2Ygc3RhdGVzIHRoYXQgdGhpcyBjb25uZWN0b3IgYXBwZWFyZWQgZnJvbSB0aGUgbW9tZW50IHRoZSBzaWduYWwgZmlyc3QgY3ljbGVkXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlcyA9IHRoaXMuY3ljbGVkQ29ubmVjdG9ycy5nZXQoY29ubmVjdG9ySWQpXG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgY29ubmVjdG9yIGFscmVhZHkgaGFkIHRoaXMgc3RhdGUgaW4gdGhpcyBjeWNsZSwgcmVzb2x2ZSB0aGUgY3ljbGVcbiAgICAgICAgICAgICAgICBpZihzdGF0ZXMuaGFzKHN0YXRlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBtb3JlIHN0YXRlcyBpbiB0aGUgc2V0LCB0aGUgY29ubmVjdG9yIGlzIG9zY2lsbGF0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIChlbHNlIGl0IGtlZXBzIGl0cyBzdGF0ZSBhbmQgd2UganVzdCBicmVhayB0aGUgY3ljbGUpXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0YXRlcy5zaXplID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWFyayB0aGlzIGNvbm5lY3RvciBhcyByZXNvbHZlZFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVkQ3ljbGVkQ29ubmVjdG9ycy5hZGQoY29ubmVjdG9ySWQpXG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgbmV3LCB1bnNlZW4gc3RhdGUsIGFkZCBpdCB0byB0aGUgc2V0IGFuZCBjb250aW51ZSBzaW11bGF0aW5nIHRoZSBjeWNsZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5hZGQoc3RhdGUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbWFwIHRoZSBtb2RpZmllZCBzZXQgb2Ygc3RhdGVzIHRvIHRoZSBjb25uZWN0b3JcbiAgICAgICAgICAgICAgICB0aGlzLmN5Y2xlZENvbm5lY3RvcnMuc2V0KGNvbm5lY3RvcklkLCBzdGF0ZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMud2hvQ2F1c2VkSXQgPSBjb25uZWN0b3JJZFxuICAgICAgICAgICAgLyogIHByb2Nlc3MgYWxsIG91dHB1dENvbm5lY3RvcnMgYnkgc2V0dGluZyB0aGVpciBzdGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMgd2lsbCB0cmlnZ2VyIGEgZm9sbG93aW5nIGV2ZW50IGNoYWluOlxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRDb25uZWN0b3IgY2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAtPiBhbGwgY29ubmVjdGVkIHdpcmVzIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAtPiBhbGwgaW5wdXRDb25uZWN0b3JzIGNvbm5lY3RlZCB0byB0aGVzZSB3aXJlcyBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgLT4gYWxsIGVsZW1lbnRzIHRoYXQgY29udGFpbiB0aGVzZSBpbnB1dENvbm5lY3RvcnMgY2hhbmdlXG4gICAgICAgICAgICAgICAgICAgIC0+IHRoZXNlIGVsZW1lbnRzIGNvbXB1dGUgdGhlIG5ldyBzdGF0ZSBvZiB0aGVpciBvdXRwdXQgY29ubmVjdG9ycyBhbmQgY2FsbCBub3RpZnlDaGFuZ2UoKVxuICAgICAgICAgICAgKi9cblxuXG4gICAgICAgICAgICBpZih3aG9DYXVzZWRJdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUHJlZGVjZXNzb3IoY29ubmVjdG9ySWQsIHdob0NhdXNlZEl0KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY3ljbGVkQ29ubmVjdG9ycy5oYXMoY29ubmVjdG9ySWQpICYmIHRoaXMuZ2V0QWxsUHJlZGVjZXNzb3JzKGNvbm5lY3RvcklkKS5oYXMoY29ubmVjdG9ySWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jeWNsZWRDb25uZWN0b3JzLnNldChjb25uZWN0b3JJZCwgbmV3IFNldChbc3RhdGVdKSlcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLyByZWZsZWN0IHRoZSBjaGFuZ2VzIGluIFNWR1xuICAgICAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMucGFyZW50U1ZHLmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpXG4gICAgICAgICAgICBpZihjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aG9DYXVzZWRJdCA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIC8vIG1hcmsgYSBwcmVkZWNlc3NvckNvbm5lY3RvcklkIGFzIGEgcHJlZGVjZXNzb3Igb2YgY29ubmVjdG9ySWRcbiAgICBhZGRQcmVkZWNlc3Nvcihjb25uZWN0b3JJZCwgcHJlZGVjZXNzb3JDb25uZWN0b3JJZCkge1xuICAgICAgICBpZighdGhpcy5wcmVkZWNlc3NvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuc2V0KGNvbm5lY3RvcklkLCBuZXcgU2V0KCkpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZWRlY2Vzc29ycy5nZXQoY29ubmVjdG9ySWQpLmFkZChwcmVkZWNlc3NvckNvbm5lY3RvcklkKVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgc2V0IG9mIGFsbCBvdXRwdXQgY29ubmVjdG9ycywgdGhhdCBhcmUgYmVmb3JlIHRoaXMgb3V0cHV0IGNvbm5lY3RvclxuICAgIGdldEFsbFByZWRlY2Vzc29ycyhjb25uZWN0b3JJZCkge1xuICAgICAgICBpZighdGhpcy5wcmVkZWNlc3NvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuc2V0KGNvbm5lY3RvcklkLCBuZXcgU2V0KCkpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWxsID0gbmV3IFNldCgpXG5cbiAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuZ2V0KGNvbm5lY3RvcklkKS5mb3JFYWNoKGFsbC5hZGQsIGFsbCk7XG5cbiAgICAgICAgbGV0IHByZXZTaXplID0gMFxuICAgICAgICBsZXQgc2l6ZSA9IGFsbC5zaXplXG4gICAgICAgIHdoaWxlKHByZXZTaXplIDwgc2l6ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29ubmVjdG9yIG9mIGFsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZWRlY2Vzc29ycy5oYXMoY29ubmVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWRlY2Vzc29ycy5nZXQoY29ubmVjdG9yKS5mb3JFYWNoKGFsbC5hZGQsIGFsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldlNpemUgPSBzaXplXG4gICAgICAgICAgICBzaXplID0gYWxsLnNpemVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbGxcbiAgICB9XG5cbiAgICBub3RpZnlDaGFuZ2UoY29ubmVjdG9ySWQsIHN0YXRlKSB7XG4gICAgICAgIGxldCB3YXZlSWQgPSB0aGlzLndhdmUgKyAxXG5cbiAgICAgICAgaWYoIXRoaXMud2F2ZXMuaGFzKHdhdmVJZCkpIHtcbiAgICAgICAgICAgIHRoaXMud2F2ZXMuc2V0KHdhdmVJZCwgW10pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndhdmVzLmdldCh3YXZlSWQpLnB1c2gobmV3IHN0YXRlQ2hhbmdlKGNvbm5lY3RvcklkLCBzdGF0ZSwgdGhpcy53aG9DYXVzZWRJdCkpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbiB7XG4gICAgc3RhdGljIGRlZXBDb3B5KGFycikge1xuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwgW10sIGFycik7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZE1vdXNlU2Nyb2xsRXZlbnRMaXN0ZW5lcihxdWVyeSwgZnVuYykge1xuICAgICAgICBsZXQgTW91c2VXaGVlbEhhbmRsZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSB3aW5kb3cuZXZlbnQgfHwgZXZlbnQ7IC8vIG9sZCBJRSBzdXBwb3J0XG4gICAgICAgICAgICBldmVudC5kZWx0YSA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCAoZXZlbnQud2hlZWxEZWx0YSB8fCAtZXZlbnQuZGV0YWlsKSkpO1xuXG4gICAgICAgICAgICBmdW5jKGV2ZW50KVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPIGFkZCBtb3JlIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHNvbWVob3dcbiAgICAgICAgbGV0IHN2Z2VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcblxuICAgICAgICBpZiAoc3ZnZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAvLyBJRTksIENocm9tZSwgU2FmYXJpLCBPcGVyYVxuICAgICAgICAgICAgc3ZnZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBNb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgc3ZnZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NTW91c2VTY3JvbGxcIiwgTW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAvLyBJRSA2LzcvOFxuICAgICAgICAgICAgc3ZnZWxlbWVudC5hdHRhY2hFdmVudChcIm9ubW91c2V3aGVlbFwiLCBNb3VzZVdoZWVsSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgc3ZnZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50JywgZSlcbiAgICAgICAgfSwgZmFsc2UpXG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCAqIGFzIHN2Z09iaiBmcm9tICcuL3N2Z09iamVjdHMuanMnXG5pbXBvcnQgKiBhcyBlZGl0b3JFbGVtZW50cyBmcm9tICcuL2VkaXRvckVsZW1lbnRzLmpzJ1xuaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMuanMnXG5pbXBvcnQgQ29udGV4dE1lbnUgZnJvbSAnLi9jb250ZXh0TWVudS5qcydcbmltcG9ydCBGbG9hdGluZ01lbnUgZnJvbSAnLi9mbG9hdGluZ01lbnUuanMnXG5pbXBvcnQgU2ltdWxhdGlvbiBmcm9tICcuL3NpbXVsYXRpb24uanMnXG5pbXBvcnQgRm4gZnJvbSAnLi9zbWFsbEZ1bmN0aW9ucy5qcydcblxuY2xhc3MgVmlld0JveCB7XG4gICAgY29uc3RydWN0b3IobGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMucmVhbCA9IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH1cblxuICAgICAgICB0aGlzLnpvb20gPSAxXG4gICAgICAgIHRoaXMubGVmdFNoaWZ0ID0gMFxuICAgICAgICB0aGlzLnRvcFNoaWZ0ID0gMFxuICAgIH1cblxuICAgIGdldCB3aWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhbC53aWR0aCAvIHRoaXMuem9vbVxuICAgIH1cblxuICAgIGdldCBoZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWwuaGVpZ2h0IC8gdGhpcy56b29tXG4gICAgfVxuXG4gICAgZ2V0IGxlZnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWwubGVmdCAtICh0aGlzLmxlZnRTaGlmdCAvIHRoaXMuem9vbSkgKyAoKHRoaXMucmVhbC53aWR0aCAtIHRoaXMud2lkdGgpIC8gMilcbiAgICB9XG5cbiAgICBnZXQgdG9wKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFsLnRvcCAtICh0aGlzLnRvcFNoaWZ0IC8gdGhpcy56b29tKSArICgodGhpcy5yZWFsLmhlaWdodCAtIHRoaXMuaGVpZ2h0KSAvIDIpXG4gICAgfVxuXG4gICAgZ2V0IHN0cigpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubGVmdH0gJHt0aGlzLnRvcH0gJHt0aGlzLndpZHRofSAke3RoaXMuaGVpZ2h0fWBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN2ZyB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBncmlkU2l6ZSkge1xuICAgICAgICB0aGlzLiRzdmcgPSAkKGNhbnZhcyk7XG5cbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMuYm94ZXMgPSBbXTsgLy8gc3RvcmVzIGFsbCBib3hlc1xuICAgICAgICB0aGlzLndpcmVzID0gW107IC8vIHN0b3JlcyBhbGwgd2lyZXNcblxuICAgICAgICB0aGlzLnNpbXVsYXRpb25FbmFibGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLnNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbih0aGlzKTsgLy8gZHVtbXksIHdpbGwgYmUgb3ZlcndyaXR0ZW4gb24gc3RhcnROZXdTaW11bGF0aW9uXG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkZWZzIGVsZW1lbnQsIHVzZWQgZm9yIHBhdHRlcm5zXG4gICAgICAgIHRoaXMuJGRlZnMgPSAkKFwiPGRlZnM+XCIpO1xuICAgICAgICB0aGlzLiRzdmcucHJlcGVuZCh0aGlzLiRkZWZzKTtcblxuICAgICAgICAvLyBCQUNLR1JPVU5EIFBBVFRFUk5cbiAgICAgICAgbGV0IHBhdHRlcm4gPSBuZXcgc3ZnT2JqLlBhdHRlcm4oXCJncmlkXCIsIHRoaXMuZ3JpZFNpemUsIHRoaXMuZ3JpZFNpemUpO1xuXG4gICAgICAgIGxldCBwYXR0ZXJuUG9pbnRzID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpXG4gICAgICAgICAgICAuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCgwLCAwKSlcbiAgICAgICAgICAgIC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMuZ3JpZFNpemUsIDApKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy5ncmlkU2l6ZSwgdGhpcy5ncmlkU2l6ZSkpO1xuXG4gICAgICAgIHBhdHRlcm4uYWRkQ2hpbGQobmV3IHN2Z09iai5Qb2x5TGluZShwYXR0ZXJuUG9pbnRzLCBcIiNhM2E0ZDJcIiwgMikpO1xuICAgICAgICB0aGlzLmFkZFBhdHRlcm4ocGF0dGVybi5nZXQoKSk7XG5cbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIFwidXJsKCNncmlkKVwiLCBcIm5vbmVcIik7XG4gICAgICAgIHRoaXMuYXBwZW5kSlF1ZXJ5T2JqZWN0KHRoaXMuYmFja2dyb3VuZC5nZXQoKSk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdmlld2JveCBmb3IgZnV0dXJlIHpvb21pbmcgYW5kIG1vdmluZyBvZiB0aGUgY2FudmFzXG4gICAgICAgIHRoaXMuJHN2Zy5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIHNsaWNlJylcbiAgICAgICAgdGhpcy52aWV3Ym94ID0gbmV3IFZpZXdCb3goMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgICAgIHRoaXMuYXBwbHlWaWV3Ym94KClcblxuICAgICAgICAvLyBDT05TVFJVQ1QgQ09OVEVYVCBNRU5VXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUgPSBuZXcgQ29udGV4dE1lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQ09OU1RSVUNUIEZMT0FUSU5HIE1FTlVcbiAgICAgICAgLy8gdGhpcy5mbG9hdGluZ01lbnUgPSBuZXcgRmxvYXRpbmdNZW51KHRoaXMpO1xuICAgICAgICB0aGlzLmZsb2F0aW5nTWVudSA9IG5ldyBGbG9hdGluZ01lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQUxMIEVWRU5UIENBTExCQUNLU1xuICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICB0aGlzLiRzdmcub24oJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0UmVhbFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gcHJvcGFnYXRlIG1vdXNlZG93biB0byB0aGUgcmVhbCB0YXJnZXRcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb3VzZURvd24oZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBtb3VzZWRvd24gaGFwcGVuZWQgZGlyZWN0bHkgb24gdGhlIHN2Z1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZURvd24oZXZlbnQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KS5vbignbW91c2Vtb3ZlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VNb3ZlKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbW91c2Vtb3ZlIGhhcHBlbmVkIGRpcmVjdGx5IG9uIHRoZSBzdmdcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlKGV2ZW50KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KS5vbignbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VVcChldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG1vdXNldXAgaGFwcGVuZWQgZGlyZWN0bHkgb24gdGhlIHN2Z1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZVVwKGV2ZW50KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKFwiY29udGV4dG1lbnVcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q29udGV4dE1lbnUoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZLCB0aGlzLmdldFJlYWxKUXVlcnlUYXJnZXQoZXZlbnQudGFyZ2V0KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBGbi5hZGRNb3VzZVNjcm9sbEV2ZW50TGlzdGVuZXIoY2FudmFzLCBldmVudCA9PiB7XG4gICAgICAgICAgICAvLyB6b29tIG9ubHkgaWYgdGhlIGN0cmwga2V5IGlzIHByZXNzZWRcbiAgICAgICAgICAgIGlmKGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmRlbHRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbSArPSAwLjFcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvb20gLT0gMC4xXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldCB3aWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN2Zy53aWR0aCgpXG4gICAgfVxuXG4gICAgZ2V0IGhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN2Zy5oZWlnaHQoKVxuICAgIH1cblxuICAgIG9uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmKGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUNhbnZhcyA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiBldmVudC5wYWdlWCxcbiAgICAgICAgICAgICAgICB0b3A6IGV2ZW50LnBhZ2VZXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZShldmVudCkge1xuICAgICAgICBpZih0aGlzLm1vdmVDYW52YXMpIHtcbiAgICAgICAgICAgIGxldCBsZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLm1vdmVDYW52YXMubGVmdFxuICAgICAgICAgICAgbGV0IHRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5tb3ZlQ2FudmFzLnRvcFxuXG4gICAgICAgICAgICB0aGlzLnZpZXdib3gubGVmdFNoaWZ0ICs9IGxlZnRcbiAgICAgICAgICAgIHRoaXMudmlld2JveC50b3BTaGlmdCArPSB0b3BcbiAgICAgICAgICAgIHRoaXMuYXBwbHlWaWV3Ym94KClcblxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2FudmFzID0ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IGV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgICAgIHRvcDogZXZlbnQucGFnZVlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VVcChldmVudCkge1xuICAgICAgICBpZih0aGlzLm1vdmVDYW52YXMpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUNhbnZhcyA9IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlWaWV3Ym94KCkge1xuICAgICAgICAvLyBhZGp1c3QgYmFja2dyb3VuZFxuICAgICAgICB0aGlzLmJhY2tncm91bmQuYWRkQXR0cih7XG4gICAgICAgICAgICB4OiB0aGlzLnZpZXdib3gubGVmdCxcbiAgICAgICAgICAgIHk6IHRoaXMudmlld2JveC50b3AsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy52aWV3Ym94LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnZpZXdib3guaGVpZ2h0XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gc2V0IHRoZSB2aWV3Qm94IGF0dHJpYnV0ZVxuICAgICAgICB0aGlzLiRzdmcuYXR0cigndmlld0JveCcsIHRoaXMudmlld2JveC5zdHIpXG4gICAgfVxuXG4gICAgZ2V0IHpvb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXdib3guem9vbVxuICAgIH1cblxuICAgIHNldCB6b29tKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmlld2JveC56b29tID0gdmFsdWVcbiAgICAgICAgdGhpcy5hcHBseVZpZXdib3goKVxuICAgICAgICAvLyB0aGlzLnJlZnJlc2goKVxuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICB0aGlzLmV4cG9ydFdpcmVJZE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5leHBvcnRXaXJlSWQgPSAwO1xuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgLy8gdG9kbyBpbXBsZW1lbnQgZ3JpZFNpemUgc2NhbGluZ1xuICAgICAgICAgICAgLy8gZ3JpZFNpemU6IHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICBib3hlczogW11cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZGF0YS5ib3hlc1tpXSA9IHRoaXMuYm94ZXNbaV0uZXhwb3J0RGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGltcG9ydERhdGEoZGF0YSkge1xuICAgICAgICB0aGlzLnNpbXVsYXRpb25FbmFibGVkID0gZmFsc2VcblxuICAgICAgICAvLyB0b2RvIGltcGxlbWVudCBncmlkU2l6ZSBzY2FsaW5nXG5cbiAgICAgICAgLy8gbGlzdCBvZiB3aXJlcyB0byBiZSBhZGRlZFxuICAgICAgICBsZXQgbmV3V2lyZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBkYXRhLmJveGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAvLyBhZGQgYm94XG4gICAgICAgICAgICBsZXQgYm94O1xuICAgICAgICAgICAgc3dpdGNoIChkYXRhLmJveGVzW2ldLmNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImdhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBnYXRlICh3aXRob3V0IHJlbG9hZGluZyB0aGUgU1ZHLCB3ZSB3aWxsIHJlbG9hZCBpdCBvbmNlIGFmdGVyIHRoZSBpbXBvcnQpXG4gICAgICAgICAgICAgICAgICAgIGJveCA9IHRoaXMubmV3R2F0ZShkYXRhLmJveGVzW2ldLm5hbWUsIDAsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlvXCI6XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ib3hlc1tpXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IGlucHV0ICh3aXRob3V0IHJlbG9hZGluZyB0aGUgU1ZHLCB3ZSB3aWxsIHJlbG9hZCBpdCBvbmNlIGFmdGVyIHRoZSBpbXBvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94ID0gdGhpcy5uZXdJbnB1dCgwLCAwLCBkYXRhLmJveGVzW2ldLmlzT24sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJvdXRwdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IG91dHB1dCAod2l0aG91dCByZWxvYWRpbmcgdGhlIFNWRywgd2Ugd2lsbCByZWxvYWQgaXQgb25jZSBhZnRlciB0aGUgaW1wb3J0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveCA9IHRoaXMubmV3T3V0cHV0KDAsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gaW8gYm94IG5hbWUgJ1wiK2RhdGEuYm94ZXNbaV0ubmFtZStcIicuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIGJveCBjYXRlZ29yeSAnXCIrZGF0YS5ib3hlc1tpXS5jYXRlZ29yeStcIicuXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYm94KSB7XG4gICAgICAgICAgICAgICAgLy8gcHJvY2Nlc3MgYm94IHRyYW5zZm9ybXMgKHRyYW5zbGF0aW9uIGFuZCByb3RhdGlvbilcbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNmb3JtID0gbmV3IGVkaXRvckVsZW1lbnRzLlRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDAgOyBqIDwgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXMubGVuZ3RoIDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRyYW5zbGF0ZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5zZXRUcmFuc2xhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLmFyZ3NbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLmFyZ3NbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJvdGF0ZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5zZXRSb3RhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLmFyZ3NbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLmFyZ3NbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLmFyZ3NbMl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biB0cmFuc2Zvcm0gcHJvcGVydHkgJ1wiK2RhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLm5hbWUrXCInLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJveC5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBhbGwgd2lyZXMgdG8gdGhlIGxpc3Qgb2Ygd2lyZXMgdG8gYmUgYWRkZWRcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwIDsgaiA8IGRhdGEuYm94ZXNbaV0uY29ubmVjdGlvbnMubGVuZ3RoIDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgYXJ0aWZpY2lhbCB3aXJlIGlkXG4gICAgICAgICAgICAgICAgICAgIGxldCB3aXJlSWQgPSBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zW2pdLndpcmVJZDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBwYXNzIHRoZSB2YWx1ZXMgZ290IGZyb20ganNvbiBpbnRvIGEgdmFyaWFibGUgdGhhdCB3aWxsIGJlIGFkZGVkIGludG8gdGhlIG1hcFxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9uc1tqXS5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGRhdGEuYm94ZXNbaV0uY29ubmVjdGlvbnNbal0udHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveElkOiBib3guaWRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHZhbHVlIHRvIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3V2lyZXMuaGFzKHdpcmVJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFscmVhZHkgaXMgYSB3aXJlIHdpdGggdGhpcyBpZCBpbiB0aGUgbWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSB2YWx1ZSB0byB0aGUgZW5kIG9mIHRoZSBhcnJheSBvZiB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXBWYWx1ZSA9IG5ld1dpcmVzLmdldCh3aXJlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwVmFsdWUubGVuZ3RoXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3V2lyZXMuc2V0KHdpcmVJZCwgbWFwVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gd2lyZSB3aXRoIHRoaXMgaWQgaW4gdGhlIG1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSB3aXJlIGFuZCBzZXQgdGhlIHZhbHVlIHRvIGJlIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3V2lyZXMuc2V0KHdpcmVJZCwgW3ZhbHVlXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWZyZXNoIHRoZSBTVkcgZG9jdW1lbnQgKG5lZWRlZCBmb3Igd2lyaW5nKVxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICAvLyB3aXRoIGFsbCBib3hlcyBhZGRlZCwgd2UgY2FuIG5vdyBjb25uZWN0IHRoZW0gd2l0aCB3aXJlc1xuICAgICAgICBuZXdXaXJlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IGNvbm5lY3RvcklkcyA9IFtdO1xuICAgICAgICAgICAgaWYoaXRlbVswXSAmJiBpdGVtWzFdKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIG9mIFswLCAxXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gdGhpcy5nZXRCb3hCeUlkKGl0ZW1baV0uYm94SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rvcklkc1tpXSA9IGJveC5jb25uZWN0b3JzW2l0ZW1baV0uaW5kZXhdLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmV3V2lyZShjb25uZWN0b3JJZHNbMF0sIGNvbm5lY3Rvcklkc1sxXSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlZnJlc2ggdGhlIFNWRyBkb2N1bWVudFxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICB0aGlzLnNpbXVsYXRpb25FbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgYm94IG9mIHRoaXMuYm94ZXMpIHtcbiAgICAgICAgICAgIGlmIChib3ggaW5zdGFuY2VvZiBlZGl0b3JFbGVtZW50cy5JbnB1dEJveCkge1xuICAgICAgICAgICAgICAgIC8vIHN3aXRjaCB0aGUgaW5wdXQgYm94IHN0YXRlIHRvIHRoZSBvcG9zaXQgYW5kIGJhY2ssIGZvciBzb21lIHJlYXNvbiBjYWxsaW5nIGJveC5yZWZyZXNoU3RhdGUoKVxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdHMgaW4gd2VpcmQgdW5maW5pc2hlZCBzaW11bGF0aW9uXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBjYXVzZXMgdXBkYXRlIG9mIHRoZSBvdXRwdXQgY29ubmVjdG9yIGFuZCBhIHN0YXJ0IG9mIGEgbmV3IHNpbXVsYXRpb25cblxuICAgICAgICAgICAgICAgIC8vIHRvZG8gZmluZCBiZXR0ZXIgc29sdXRpb24gaW5zdGVhZCBvZiB0aGlzIHdvcmthcm91bmRcbiAgICAgICAgICAgICAgICBib3gub24gPSAhYm94Lm9uXG4gICAgICAgICAgICAgICAgYm94Lm9uID0gIWJveC5vblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2lyZUNyZWF0aW9uSGVscGVyKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGlmKCF0aGlzLmZpcnN0Q29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDb25uZWN0b3JJZCA9IGNvbm5lY3RvcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXdXaXJlKHRoaXMuZmlyc3RDb25uZWN0b3JJZCwgY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgdGhpcy5maXJzdENvbm5lY3RvcklkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnROZXdTaW11bGF0aW9uKHN0YXJ0aW5nQ29ubmVjdG9yLCBzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLnNpbXVsYXRpb25FbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbih0aGlzKVxuICAgICAgICAgICAgdGhpcy5zaW11bGF0aW9uLm5vdGlmeUNoYW5nZShzdGFydGluZ0Nvbm5lY3Rvci5pZCwgc3RhdGUpXG4gICAgICAgICAgICB0aGlzLnNpbXVsYXRpb24ucnVuKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5ld0dhdGUobmFtZSwgeCwgeSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3Qm94KHgsIHksIG5ldyBlZGl0b3JFbGVtZW50cy5HYXRlKHRoaXMsIG5hbWUsIHgsIHkpLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBuZXdJbnB1dCh4LCB5LCBpc09uID0gZmFsc2UsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0JveCh4LCB5LCBuZXcgZWRpdG9yRWxlbWVudHMuSW5wdXRCb3godGhpcywgaXNPbiksIHJlZnJlc2gpO1xuICAgIH1cblxuICAgIG5ld091dHB1dCh4LCB5LCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLk91dHB1dEJveCh0aGlzKSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgbmV3Qm94KHgsIHksIG9iamVjdCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5ib3hlcy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5ib3hlc1tpbmRleF0gPSBvYmplY3Q7XG5cbiAgICAgICAgLy8gdHJhbnNsYXRlIHRoZSBnYXRlIGlmIHggYW5kIHkgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAgICAgIGlmKHggJiYgeSkge1xuICAgICAgICAgICAgbGV0IHRyID0gbmV3IGVkaXRvckVsZW1lbnRzLlRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdHIuc2V0VHJhbnNsYXRlKHgsIHkpO1xuXG4gICAgICAgICAgICB0aGlzLmJveGVzW2luZGV4XS5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHIuZ2V0KCl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwZW5kRWxlbWVudCh0aGlzLmJveGVzW2luZGV4XSwgcmVmcmVzaCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYm94ZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHJlbW92ZUJveChnYXRlSWQpIHtcbiAgICAgICAgbGV0ICRnYXRlID0gJChcIiNcIitnYXRlSWQpO1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIGdhdGUgaW4gc3ZnJ3MgbGlzdCBvZiBnYXRlc1xuICAgICAgICBsZXQgZ2F0ZUluZGV4ID0gLTE7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMuYm94ZXNbaV0uc3ZnT2JqLmlkPT09Z2F0ZUlkKSB7XG4gICAgICAgICAgICAgICAgZ2F0ZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGdhdGVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgYWxsIHdpcmVzIGNvbm5lY3RlZCB0byB0aGlzIGdhdGVcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmJveGVzW2dhdGVJbmRleF0uY29ubmVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlV2lyZXNCeUNvbm5lY3RvcklkKHRoaXMuYm94ZXNbZ2F0ZUluZGV4XS5jb25uZWN0b3JzW2ldLnN2Z09iai5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZ2F0ZVxuICAgICAgICAgICAgdGhpcy5ib3hlcy5zcGxpY2UoZ2F0ZUluZGV4LCAxKTtcbiAgICAgICAgICAgICRnYXRlLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRyeWluZyB0byByZW1vdmUgYW4gbm9uZXhpc3RpbmcgZ2F0ZS4gKEdhdGUgaWQ6IFwiK2dhdGVJZCtcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdXaXJlKGZyb21JZCwgdG9JZCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgLy8gd2lyZSBtdXN0IGNvbm5lY3QgdHdvIGRpc3RpbmN0IGVsZW1lbnRzXG4gICAgICAgIGlmIChmcm9tSWQ9PT10b0lkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgbGV0IGNvbm5lY3RvcnMgPSBbdGhpcy5nZXRDb25uZWN0b3JCeUlkKGZyb21JZCksIHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh0b0lkKV1cblxuICAgICAgICAvLyBpbnB1dCBjb25uZWN0b3JzIGNhbiBiZSBjb25uZWN0ZWQgdG8gb25lIHdpcmUgbWF4XG4gICAgICAgIGNvbm5lY3RvcnMuZm9yRWFjaChjb25uID0+IHtcbiAgICAgICAgICAgIGlmKGNvbm4uaXNJbnB1dENvbm5lY3RvcilcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZChjb25uLmlkKVxuICAgICAgICB9KVxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLndpcmVzLmxlbmd0aDtcbiAgICAgICAgdGhpcy53aXJlc1tpbmRleF0gPSBuZXcgZWRpdG9yRWxlbWVudHMuV2lyZSh0aGlzLCBmcm9tSWQsIHRvSWQsIHRoaXMuZ3JpZFNpemUsIHJlZnJlc2gpO1xuXG4gICAgICAgIGNvbm5lY3RvcnMuZm9yRWFjaChjb25uID0+IHtcbiAgICAgICAgICAgIGNvbm4uYWRkV2lyZUlkKHRoaXMud2lyZXNbaW5kZXhdLnN2Z09iai5pZCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5hcHBlbmRFbGVtZW50KHRoaXMud2lyZXNbaW5kZXhdLCByZWZyZXNoKTtcbiAgICAgICAgdGhpcy5tb3ZlVG9CYWNrQnlJZCh0aGlzLndpcmVzW2luZGV4XS5zdmdPYmouaWQpO1xuXG4gICAgICAgIGlmKHJlZnJlc2gpXG4gICAgICAgICAgICB0aGlzLndpcmVzW2luZGV4XS51cGRhdGVXaXJlU3RhdGUoKVxuXG4gICAgICAgIHJldHVybiB0aGlzLndpcmVzW2luZGV4XTtcbiAgICB9XG5cbiAgICBnZXRXaXJlQnlJZCh3aXJlSWQpIHtcbiAgICAgICAgZm9yIChjb25zdCB3aXJlIG9mIHRoaXMud2lyZXMpIHtcbiAgICAgICAgICAgIGlmKHdpcmUuc3ZnT2JqLmlkID09PSB3aXJlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2lyZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldFdpcmVzQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rvci53aXJlSWRzO1xuICAgIH1cblxuICAgIHJlbW92ZVdpcmVCeUlkKHdpcmVJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMud2lyZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy53aXJlc1tpXS5zdmdPYmouaWQgPT09IHdpcmVJZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGNvbm5lY3RvcjEgPSB0aGlzLndpcmVzW2ldLnN0YXJ0Q29ubmVjdG9yO1xuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IyID0gdGhpcy53aXJlc1tpXS5lbmRDb25uZWN0b3I7XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0b3IxLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuICAgICAgICAgICAgICAgIGNvbm5lY3RvcjIucmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzW2ldLnN2Z09iai4kZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy53aXJlcy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcblxuICAgICAgICBjb25uZWN0b3Iud2lyZUlkcy5mb3JFYWNoKHdpcmVJZCA9PiB7XG4gICAgICAgICAgICBsZXQgd2lyZSA9IHRoaXMuZ2V0V2lyZUJ5SWQod2lyZUlkKTtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBvdGhlciBjb25uZWN0b3IgdGhhdCBpcyB0aGUgd2lyZSBjb25uZWN0ZWQgdG9cbiAgICAgICAgICAgIGxldCBvdGhlckNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh3aXJlLmZyb21JZCwgd2lyZSk7XG4gICAgICAgICAgICBpZihvdGhlckNvbm5lY3Rvci5zdmdPYmouaWQ9PT1jb25uZWN0b3JJZCkge1xuICAgICAgICAgICAgICAgIG90aGVyQ29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKHdpcmUudG9JZCwgd2lyZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgd2lyZSByZWNvcmQgZnJvbSB0aGUgb3RoZXIgY29ubmVjdG9yXG4gICAgICAgICAgICBvdGhlckNvbm5lY3Rvci53aXJlSWRzLmRlbGV0ZSh3aXJlSWQpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIHdpcmUgcmVwcmVzZW50YXRpb24gdXNpbmcgalF1ZXJ5XG4gICAgICAgICAgICAkKFwiI1wiICsgd2lyZUlkKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgLy8gaWYgb3RoZXJDb25uZWN0b3IgaXMgYW4gaW5wdXQgY29ubmVjdG9yLCBzZXQgaXRzIHN0YXRlIHRvIHVua25vd25cbiAgICAgICAgICAgIGlmKG90aGVyQ29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBvdGhlckNvbm5lY3Rvci5zZXRTdGF0ZShMb2dpYy5zdGF0ZS51bmtub3duKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2xlYXIgdGhlIGxpc3Qgb2Ygd2lyZSBJZHNcbiAgICAgICAgY29ubmVjdG9yLndpcmVJZHMuY2xlYXIoKTtcbiAgICAgICAgLy8gaWYgY29ubmVjdG9yIGlzIGFuIGlucHV0IGNvbm5lY3Rvciwgc2V0IGl0cyBzdGF0ZSB0byB1bmtub3duXG4gICAgICAgIGlmKGNvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICBjb25uZWN0b3Iuc2V0U3RhdGUoTG9naWMuc3RhdGUudW5rbm93bik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRCb3hCeUlkKGdhdGVJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmJveGVzW2ldLnN2Z09iai5pZD09PWdhdGVJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJveGVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRCb3hCeUNvbm5lY3RvcklkKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJveGVzW2ldLmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCwgd2lyZSkge1xuICAgICAgICAvLyB0aGUgd2lyZSB2YXJpYWJsZSBpcyB1c2VkIGFzIGhldXJpc3RpYyxcbiAgICAgICAgLy8gd2hlbiB3ZSBrbm93IHRoZSB3aXJlLCB3ZSBoYXZlIHRvIGNoZWNrIG9ubHlcbiAgICAgICAgLy8gdHdvIGdhdGVzIGluc3RlYWQgb2YgYWxsIG9mIHRoZW1cblxuICAgICAgICBpZih3aXJlIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB3ZSBrbm93IHRoZSB3aXJlIC0tIHdlIGNhbiBjaGVjayBvbmx5IGdhdGVzIGF0IHRoZSBlbmRzIG9mIHRoaXMgd2lyZVxuICAgICAgICAgICAgbGV0IGNvbm5lY3RvciA9IHdpcmUuc3RhcnRCb3guZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZClcbiAgICAgICAgICAgIGlmICghY29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdG9yID0gd2lyZS5lbmRCb3guZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3JcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgZG8gbm90IGtub3cgdGhlIHdpcmUgLS0gd2UgaGF2ZSB0byBjaGVjayBhbGwgZ2F0ZXNcbiAgICAgICAgICAgIGZvciAoY29uc3QgYm94IG9mIHRoaXMuYm94ZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25uZWN0b3IgPSBib3guZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZClcbiAgICAgICAgICAgICAgICBpZihjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3RvclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBvYmplY3QsIHRoYXQgdXNlciBpbnRlcmFjdGVkIHdpdGgsIGlzIG5vdCBhIGNvbm5lY3RvciBhbmQgaXMgaW4gYSBncm91cFxuICAgIC8vIHJldHVybiB0aGUgZ3JvdXAgalF1ZXJ5IG9iamVjdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBqUXVlcnkgb2JqZWN0XG4gICAgZ2V0UmVhbEpRdWVyeVRhcmdldCh0YXJnZXQpIHtcbiAgICAgICAgbGV0ICR0YXJnZXQgPSAkKHRhcmdldCk7XG4gICAgICAgIGlmKCEkdGFyZ2V0Lmhhc0NsYXNzKFwiY29ubmVjdG9yXCIpICYmICR0YXJnZXQucGFyZW50cygnZycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgd2hpbGUgKCR0YXJnZXQucHJvcChcInRhZ05hbWVcIikgIT09IFwiR1wiICYmICR0YXJnZXQucHJvcChcInRhZ05hbWVcIikgIT09IFwiZ1wiKSB7XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICR0YXJnZXQucGFyZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICR0YXJnZXQ7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0aGUgZWRpdG9yRWxlbWVudCB0aGF0IHVzZXIgaW50ZXJhY3RlZCB3aXRoLCB0aGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBpcyBhIGpRdWVyeSBlbGVtZW50XG4gICAgZ2V0UmVhbFRhcmdldCh0YXJnZXQpIHtcbiAgICAgICAgLy8gZXZlbnR5IHNlIG11c2VqaSB6cHJhY292YXQgdGFkeSwgcHJvdG96ZSB2IFNWRyBzZSBldmVudHkgbmVwcm9wYWd1amlcbiAgICAgICAgbGV0ICR0YXJnZXQgPSAkKHRhcmdldCk7XG5cbiAgICAgICAgaWYoJHRhcmdldC5oYXNDbGFzcyhcImNvbm5lY3RvclwiKSkge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNvbm5lY3RvciwgZG9uJ3QgdHJhdmVyc2UgZ3JvdXBzXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb25uZWN0b3JCeUlkKCR0YXJnZXQuYXR0cignaWQnKSk7XG4gICAgICAgIH0gZWxzZSBpZigkdGFyZ2V0LnBhcmVudHMoJ2cnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGVsZW1lbnQgaXMgaW4gYSBncm91cCBhbmQgaXQgaXMgbm90IGEgY29ubmVjdG9yXG5cbiAgICAgICAgICAgIC8vIHRyYXZlcnNpbmcgdXAgdGhlIERPTSB0cmVlIHVudGlsIHdlIGZpbmQgdGhlIGNsb3Nlc3QgZ3JvdXBcbiAgICAgICAgICAgIGxldCAkcGFyZW50R3JvdXAgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgd2hpbGUgKCRwYXJlbnRHcm91cC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJHXCIgJiYgJHBhcmVudEdyb3VwLnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcImdcIikge1xuICAgICAgICAgICAgICAgICRwYXJlbnRHcm91cCA9ICRwYXJlbnRHcm91cC5wYXJlbnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm94QnlJZCgkcGFyZW50R3JvdXAuYXR0cignaWQnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHRhcmdldC5oYXNDbGFzcyhcIndpcmVcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFdpcmVCeUlkKCR0YXJnZXQuYXR0cignaWQnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kRWxlbWVudChlbGVtZW50LCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFwcGVuZEpRdWVyeU9iamVjdChlbGVtZW50LmdldCgpLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBhcHBlbmRKUXVlcnlPYmplY3Qob2JqZWN0LCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLiRzdmcuYXBwZW5kKG9iamVjdCk7XG4gICAgICAgIGlmKHJlZnJlc2gpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgICAgIHRoaXMuJGRlZnMuYXBwZW5kKHBhdHRlcm4pO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG5cbiAgICAvLyByZWxvYWQgdGhlIFNWRyBkb2N1bWVudCAobmVlZGVkIHRvIGRpc3BsYXkgbmV3bHkgYXBwZW5kZWQgalF1ZXJ5IG9iamVjdClcbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLiRzdmcuaHRtbCh0aGlzLiRzdmcuaHRtbCgpKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTVkcgZG9jdW1lbnQgaGFzIGJlZW4gcmVsb2FkZWQuXCIpXG4gICAgfVxuXG4gICAgZGlzcGxheUNvbnRleHRNZW51KHgsIHksICR0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudS5kaXNwbGF5KHgsIHksICR0YXJnZXQpO1xuICAgIH1cbiAgICBoaWRlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIHNuYXAgYSB2YWx1ZSB0byBhIGdyaWRcbiAgICBzbmFwVG9HcmlkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5ncmlkU2l6ZSkgKiB0aGlzLmdyaWRTaXplO1xuICAgIH1cblxuICAgIC8vIHN0YXRpYyBmdW5jdGlvbiBmb3Igc25hcHBpbmcgYSB2YWx1ZSB0byBhIGdyaWRcbiAgICBzdGF0aWMgc25hcFRvR3JpZCh2YWx1ZSwgZ3JpZFNpemUpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyBncmlkU2l6ZSkgKiBncmlkU2l6ZTtcbiAgICB9XG5cbiAgICAvLyBnZXQgc2V0IG9mIG5vZGVzLCB0aGF0IGNhbm5vdCBiZSB1c2VkIGZvciB3aXJpbmcgYXQgYW55IGNpcmN1bXN0YW5jZXNcbiAgICBnZXROb25Sb3V0YWJsZU5vZGVzKCkge1xuICAgICAgICBsZXQgYmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAvLyBmb3IgZWFjaCBib3hcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBqUXVlcnkgY2hpbGQgd2l0aCBjbGFzcyAucmVjdCAoXCJoaXRib3hcIilcbiAgICAgICAgICAgIGxldCByZWN0ID0gJCgnIycgKyB0aGlzLmJveGVzW2ldLnN2Z09iai5pZCkuY2hpbGRyZW4oXCIucmVjdFwiKVswXTtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZVxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gJChyZWN0KS5wb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAvLyBzbmFwIHRoZSBwb3NpdGlvbiB0byB0aGUgZ3JpZFxuICAgICAgICAgICAgcG9zaXRpb24ubGVmdCA9IHRoaXMuc25hcFRvR3JpZChwb3NpdGlvbi5sZWZ0KTtcbiAgICAgICAgICAgIHBvc2l0aW9uLnRvcCA9IHRoaXMuc25hcFRvR3JpZChwb3NpdGlvbi50b3ApO1xuXG4gICAgICAgICAgICAvLyBmb3IgZWFjaCBpdGVtIGluIGJsb2NrZWROb2RlcyAoc2V0IG9mIGJsb2NrZWQgbm9kZXMgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZVxuICAgICAgICAgICAgLy8gdG8gdGhlIGxlZnQgdXBwZXIgY29ybmVyIG9mIHJlY3Q7IHVuaXQgdXNlZCBpcyBcIm9uZSBncmlkU2l6ZVwiKSBjb252ZXJ0IHRoZSBjb29yZGluYXRlc1xuICAgICAgICAgICAgLy8gdG8gYWJzb2x1dGUgKG11bHRpcGxlIHdpdGggZ3JpZFNpemUgYW5kIGFkZCBwb3NpdGlvbiBvZiByZWN0KSBhbmQgYWRkIHRoZSByZXN1bHQgdG8gdGhlIHNldFxuICAgICAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuYm94ZXNbaV0uYmxvY2tlZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFic29sdXRlWCA9IHBvc2l0aW9uLmxlZnQgKyBpdGVtLnggKiB0aGlzLmdyaWRTaXplO1xuICAgICAgICAgICAgICAgIGxldCBhYnNvbHV0ZVkgPSBwb3NpdGlvbi50b3AgKyBpdGVtLnkgKiB0aGlzLmdyaWRTaXplO1xuXG4gICAgICAgICAgICAgICAgYmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IGFic29sdXRlWCxcbiAgICAgICAgICAgICAgICAgICAgeTogYWJzb2x1dGVZXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdG9kbyBlbnN1cmUgdGhhdCB0aGlzLnJlZnJlc2goKSBpcyByZWFsbHkgdW5uZWNlc3NhcnlcbiAgICAgICAgLy8gdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIC8vIHJldHVybiB0aGUgc2V0XG4gICAgICAgIHJldHVybiBibG9ja2VkTm9kZXM7XG4gICAgfVxuXG4gICAgbW92ZVRvRnJvbnRCeUlkKG9iaklkKSB7XG4gICAgICAgIHRoaXMuJHN2Zy5hcHBlbmQoJChcIiNcIiArIG9iaklkKSk7XG4gICAgfVxuXG4gICAgbW92ZVRvQmFja0J5SWQob2JqSWQpIHtcbiAgICAgICAgJChcIiNcIiArIHRoaXMuYmFja2dyb3VuZC5pZClcbiAgICAgICAgICAgIC5hZnRlcigkKFwiI1wiICsgb2JqSWQpKTtcbiAgICB9XG5cbiAgICAvLyBnZXQgc2V0IG9mIG5vZGVzLCB0aGF0IGlzIGJldHRlciBub3QgdG8gdXNlIGZvciB3aXJpbmdcbiAgICBnZXRJbmNvbnZlbmllbnROb2RlcyhpZ25vcmVXaXJlSWQpIHtcblxuICAgICAgICBsZXQgaW5jb252ZW5pZW50Tm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIC8vIGZvciBlYWNoIHdpcmVcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLndpcmVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgLy8gKGlnbm9yZSB0aGUgd2lyZSB0aGF0IGlzIHNwZWNpZmllZCBpbiB0aGUgaWdub3JlV2lyZUlkIGFyZ3VtZW50IChpZiBhbnkpKVxuICAgICAgICAgICAgaWYoaWdub3JlV2lyZUlkPT09dW5kZWZpbmVkIHx8IGlnbm9yZVdpcmVJZCE9PXRoaXMud2lyZXNbaV0uc3ZnT2JqLmlkKSB7XG4gICAgICAgICAgICAgICAgLy8gY3ljbGUgdGhyb3VnaCBwb2ludHMsIGZvciBlYWNoIG5laWdib3VycyBhZGQgYWxsIHBvaW50cyB0aGF0IGFyZSBpbiBiZXR3ZWVuIHRoZW1cbiAgICAgICAgICAgICAgICAvLyBpLmUuOiAoMCwwKSBhbmQgKDAsMzApIGFyZSBibG9ja2luZyB0aGVzZSBub2RlczogKDAsMCksICgwLDEwKSwgKDAsMjApLCAoMCwzMClcbiAgICAgICAgICAgICAgICBsZXQgcHJldlBvaW50O1xuICAgICAgICAgICAgICAgIHRoaXMud2lyZXNbaV0ucG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldlBvaW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcmV2UG9pbnQgaXMgdW5kZWZpbmVkLCBhZGQgdGhlIGZpcnN0IHBvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNvbnZlbmllbnROb2Rlcy5hZGQoe3g6IHBvaW50LngsIHk6IHBvaW50Lnl9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2UgYWRkIGFsbCB0aGUgcG9pbnQgYmV0d2VlbiB0aGUgcHJldlBvaW50IChleGNsdWRlZCkgYW5kIHBvaW50IChpbmNsdWRlZClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJldlBvaW50Lng9PT1wb2ludC54KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmUgaXMgaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tID0gTWF0aC5taW4ocHJldlBvaW50LnksIHBvaW50LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0byA9IE1hdGgubWF4KHByZXZQb2ludC55LCBwb2ludC55KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlKGZyb20gPD0gdG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb252ZW5pZW50Tm9kZXMuYWRkKHt4OiBwb2ludC54LCB5OiBmcm9tfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKz0gdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocHJldlBvaW50Lnk9PT1wb2ludC55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmUgaXMgdmVydGljYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IE1hdGgubWluKHByZXZQb2ludC54LCBwb2ludC54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG8gPSBNYXRoLm1heChwcmV2UG9pbnQueCwgcG9pbnQueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZShmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29udmVuaWVudE5vZGVzLmFkZCh7eDogZnJvbSwgeTogcG9pbnQueX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICs9IHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5lIGlzIG5laXRoZXIgaG9yaXpvbnRhbCBub3IgdmVydGljYWwsIHRocm93IGFuIGVycm9yIGZvciBiZXR0ZXIgZnV0dXJlIGRlYnVnZ2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJnZXRJbmNvbnZlbmllbnROb2RlczogbGluZSBiZXR3ZWVuIHR3byBwb2ludHMgaXMgbmVpdGhlciBob3Jpem9udGFsIG5vciB2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBuZXcgcHJldlBvaW50XG4gICAgICAgICAgICAgICAgICAgIHByZXZQb2ludCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiB0aGUgc2V0XG4gICAgICAgIHJldHVybiBpbmNvbnZlbmllbnROb2RlcztcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ZnIGZyb20gJy4vY2FudmFzLmpzJztcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHN2ZyA9IG5ldyBTdmcoXCJzdmcjY2FudmFzXCIsIDEwKTtcblxuICAgIC8qIERFTU8gKi9cbiAgICAvLyBPTkUgQklUIENPTVBBUkFUT1JcbiAgICAvKlxuICAgIGxldCBpMSA9IHN2Zy5uZXdJbnB1dCgxMDAsIDEwMCk7XG4gICAgbGV0IGkyID0gc3ZnLm5ld0lucHV0KDEwMCwgMjAwKTtcblxuICAgIGxldCBuMSA9IHN2Zy5uZXdHYXRlKFwibm90XCIsIDIwMCwgMTAwKTtcbiAgICBsZXQgbjIgPSBzdmcubmV3R2F0ZShcIm5vdFwiLCAyMDAsIDIwMCk7XG5cbiAgICBsZXQgYTEgPSBzdmcubmV3R2F0ZShcImFuZFwiLCAzNjAsIDkwKTtcbiAgICBsZXQgYTIgPSBzdmcubmV3R2F0ZShcImFuZFwiLCAzNjAsIDIxMCk7XG5cbiAgICBsZXQgbm9yID0gc3ZnLm5ld0dhdGUoXCJub3JcIiwgNTQwLCAxNTApO1xuXG4gICAgbGV0IG8xID0gc3ZnLm5ld091dHB1dCg2ODAsIDkwKTtcbiAgICBsZXQgbzIgPSBzdmcubmV3T3V0cHV0KDY4MCwgMTUwKTtcbiAgICBsZXQgbzMgPSBzdmcubmV3T3V0cHV0KDY4MCwgMjEwKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBuMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbjIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUobjEub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKG4yLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGExLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBub3IuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoYTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG5vci5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGExLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShub3Iub3V0cHV0c1swXS5zdmdPYmouaWQsIG8yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGEyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMy5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICAqL1xuXG4gICAgLy8gQklOQVJZIEFEREVSXG4gICAgLypcbiAgICBsZXQgaTEgPSBzdmcubmV3SW5wdXQoODAsIDkwKTtcbiAgICBsZXQgaTIgPSBzdmcubmV3SW5wdXQoODAsIDEzMCk7XG4gICAgbGV0IGkzID0gc3ZnLm5ld0lucHV0KDgwLCAxODApO1xuXG4gICAgbGV0IHgxID0gc3ZnLm5ld0dhdGUoXCJ4b3JcIiwgMzYwLCAxMDApO1xuICAgIGxldCB4MiA9IHN2Zy5uZXdHYXRlKFwieG9yXCIsIDM2MCwgMTcwKTtcblxuICAgIGxldCBhMSA9IHN2Zy5uZXdHYXRlKFwiYW5kXCIsIDI1MCwgMjIwKTtcbiAgICBhMS5vbkNsaWNrTWlkZGxlKCk7Ly8gYSBqZWRub3Ugcm90b3ZhbnlcbiAgICBsZXQgYTIgPSBzdmcubmV3R2F0ZShcImFuZFwiLCA1MDAsIDMyMCk7XG5cbiAgICBsZXQgb3IgPSBzdmcubmV3R2F0ZShcIm9yXCIsIDYyMCwgMzEwKTtcblxuICAgIGxldCBvMSA9IHN2Zy5uZXdPdXRwdXQoNzUwLCAyNzApO1xuICAgIGxldCBvMiA9IHN2Zy5uZXdPdXRwdXQoNzUwLCAzMTApO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIHgxLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4MS5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMy5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDIuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTEuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShpMy5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZSh4MS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoeDEub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoYTEub3V0cHV0c1swXS5zdmdPYmouaWQsIG9yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoeDIub3V0cHV0c1swXS5zdmdPYmouaWQsIG8xLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGEyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvci5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKG9yLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICAqL1xufSk7Il19
