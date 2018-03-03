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
var $__src_47_es6_47_canvas_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/canvas.js";
  var svgObj = $__src_47_es6_47_svgObjects_46_js__;
  var editorElements = $__src_47_es6_47_editorElements_46_js__;
  var Logic = ($__src_47_es6_47_logic_46_js__).default;
  var ContextMenu = ($__src_47_es6_47_contextMenu_46_js__).default;
  var FloatingMenu = ($__src_47_es6_47_floatingMenu_46_js__).default;
  var Simulation = ($__src_47_es6_47_simulation_46_js__).default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiIsInNyYy9lczYvc3RydWN0dXJlc0FuZENsYXNzZXMuanMiLCJzcmMvZXM2L3N2Z09iamVjdHMuanMiLCJzcmMvZXM2L2xvZ2ljLmpzIiwic3JjL2VzNi9lZGl0b3JFbGVtZW50cy5qcyIsInNyYy9lczYvY29udGV4dE1lbnUuanMiLCJzcmMvZXM2L2ltcG9ydEV4cG9ydC5qcyIsInNyYy9lczYvZmxvYXRpbmdNZW51LmpzIiwic3JjL2VzNi9zaW11bGF0aW9uLmpzIiwic3JjL2VzNi9jYW52YXMuanMiLCJzcmMvZXM2L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxBQUFJLElBQUEsQ0FBQSxZQUFXLG9DQUFvQixDQUFDO0FDR3BDLEFBQUksSUFBQSxDQUFBLGtCQUFpQixFQUFJLEtBQUcsQ0FBQztJQUVoQixHQUFDLEVBTGQsQ0FBQSxTQUFTLEFBQUQ7QUFLRCxXQUFNLEdBQUMsQ0FDRSxBQUFELENBQUc7QUFDVixTQUFHLENBQUMsa0JBQWlCLENBQUU7QUFDbkIseUJBQWlCLEVBQUksS0FBRyxDQUFDO01BQzdCO0FBQUEsQUFFQSxTQUFHLE9BQU8sRUFBSSxLQUFHLENBQUM7QUFDbEIsU0FBRyxPQUFPLEVBQUksRUFBQSxDQUFDO0FBRWYsV0FBTyxtQkFBaUIsQ0FBQztJQUM3QjtBQW9CSixBQWpDVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUFlaEMsUUFBSSxPQUFLLEVBQUk7QUFDVCxBQUFJLFVBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxJQUFHLFNBQVMsQUFBQyxFQUFDLENBQUM7QUFJNUIsY0FBTSxDQUFBLEFBQUMsQ0FBQyxHQUFFLEVBQUUsT0FBSyxDQUFDLE9BQU8sQ0FBRztBQUN4QixhQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ2IsZUFBSyxFQUFJLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO1FBQzVCO0FBQUEsQUFFQSxXQUFHLE9BQU8sRUFBRSxDQUFDO0FBRWIsYUFBTyxPQUFLLENBQUM7TUFDakI7QUFF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QUFDLENBQUM7TUFDckM7QUFDTyxRQUFFLENBQVQsVUFBVyxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDYixhQUFPLENBQUEsS0FBSSx3QkFBd0IsQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFDdkMsQ0FBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDekQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFakUsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDbEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDMUQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDOUQsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sWUFBWSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FB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LE9BQUs7QUFDTixnQkFBSSxFQUFLLENBQUEsS0FBSSxLQUFLLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFHLENBQUEsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3RFLGlCQUFLO0FBQUEsQUFDVCxhQUFLLE1BQUk7QUFDTCxnQkFBSSxFQUFLLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFHLENBQUEsSUFBRyxXQUFXLENBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JFLGlCQUFLO0FBQUEsQUFDVCxhQUFLLE1BQUk7QUFDTCxnQkFBSSxFQUFLLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDM0MsaUJBQUs7QUFBQSxBQUNULGFBQUssS0FBRztBQUNKLGdCQUFJLEVBQUssQ0FBQSxLQUFJLEdBQUcsQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUcsQ0FBQSxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDcEUsaUJBQUs7QUFBQSxBQUNULGFBQUssT0FBSztBQUNOLGdCQUFJLEVBQUssQ0FBQSxLQUFJLEtBQUssQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUcsQ0FBQSxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDdEUsaUJBQUs7QUFBQSxBQUNULGFBQUssTUFBSTtBQUNMLGdCQUFJLEVBQUssQ0FBQSxLQUFJLElBQUksQUFBQyxDQUFDLElBQUcsV0FBVyxDQUFFLENBQUEsQ0FBQyxNQUFNLENBQUcsQ0FBQSxJQUFHLFdBQVcsQ0FBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDckUsaUJBQUs7QUFBQSxRQUNiO0FBRUEsV0FBRyxVQUFVLFdBQVcsYUFBYSxB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YW4vU2tvbGEvcnAvY29kZS90ZW1wb3V0TUM0NU5UWTJNelV5TWpReE16a3pOVEV5LmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gc2luZ2xldG9uIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZCdzXG5sZXQgZXhpc3RpbmdJZEluc3RhbmNlID0gbnVsbDtcbi8vIHVzYWdlOiBsZXQgaWQgPSBuZXcgSWQoKS51bmlxdWVcbmV4cG9ydCBjbGFzcyBJZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmKCFleGlzdGluZ0lkSW5zdGFuY2Upe1xuICAgICAgICAgICAgZXhpc3RpbmdJZEluc3RhbmNlID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJlZml4ID0gXCJpZFwiO1xuICAgICAgICB0aGlzLm5leHRJZCA9IDA7XG5cbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nSWRJbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXQgdW5pcXVlKCkge1xuICAgICAgICBsZXQgcmV0VmFsID0gdGhpcy5nZW5lcmF0ZSgpO1xuXG4gICAgICAgIC8vIGZpbmQgbmV4dCB1bnVzZWQgaWRYWFhYIHRvIHByZXZlbnQgaWQgY29sbGlzaW9uIHRoYXQgbWlnaHQgYmUgY2F1c2VkIGJ5IHNvbWUgb3RoZXIgY29tcG9uZW50XG4gICAgICAgIC8vIChpdCByZWFsbHkgc2hvdWxkIG5vdCBoYXBwZW4sIGJ1dCB0aGlzIGlzIGEgc2ltcGxlIG1ldGhvZCB0byBlbnN1cmUgc2FmZXR5KVxuICAgICAgICB3aGlsZSgkKFwiI1wiK3JldFZhbCkubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRJZCsrO1xuICAgICAgICAgICAgcmV0VmFsID0gdGhpcy5nZW5lcmF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiB0aGlzIGlkXG4gICAgICAgIHRoaXMubmV4dElkKys7XG5cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5uZXh0SWQ7XG4gICAgfVxufVxuXG4vLyB0byBlczUgY29tcGlsZXIgZnJpZW5kbHkgaW1wbGVtZW50YXRpb24gKFwiY2FsbGluZyBhIGJ1aWx0aW4gTWFwIGNvbnN0cnVjdG9yIHdpdGhvdXQgbmV3IGlzIGZvcmJpZGRlblwiKVxuZXhwb3J0IGNsYXNzIE1hcFdpdGhEZWZhdWx0VmFsdWUge1xuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdFZhbHVlO1xuXG5cbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnNpemU7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5jbGVhcigpO1xuICAgIH1cblxuICAgIGZvckVhY2goLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZm9yRWFjaCguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5kZWxldGUoa2V5KTtcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmhhcyhrZXkpO1xuICAgIH1cblxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5lbnRyaWVzKCk7XG4gICAgfVxuXG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmtleXMoKTtcbiAgICB9XG5cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC52YWx1ZXMoKTtcbiAgICB9XG59XG5cbi8qXG4vLyBlczYgaW1wbGVtZW50YXRpb25cbmV4cG9ydCBjbGFzcyBNYXBXaXRoRGVmYXVsdFZhbHVlIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmRlZmF1bHQgPSBkZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBpZih0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgfVxufVxuKi8iLCJpbXBvcnQgKiBhcyBTdHJ1Y3R1cmVzIGZyb20gJy4vc3RydWN0dXJlc0FuZENsYXNzZXMuanMnXG5cbmNsYXNzIFRhZyB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICB0aGlzLnRhZ05hbWUgPSB0YWdOYW1lO1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjxcIit0aGlzLnRhZ05hbWUrXCI+XCIpO1xuXG4gICAgICAgIHRoaXMuaWQgPSBuZXcgU3RydWN0dXJlcy5JZCgpLnVuaXF1ZTtcbiAgICB9XG5cbiAgICBhZGRDbGFzcyhuYW1lKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKG5hbWUpO1xuICAgIH1cblxuICAgIHJlbW92ZUNsYXNzZXMoLi4uY2xhc3Nlcykge1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgY2xhc3Nlcykge1xuICAgICAgICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRBdHRyKGFzc29jKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuXG4gICAgICAgIC8vIGFkZCBhdHRyaWJ1dGVzIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMuJGVsLmF0dHIoYXNzb2MpO1xuICAgIH1cblxuICAgIGdldEF0dHIobmFtZSkge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcblxuICAgICAgICByZXR1cm4gdGhpcy4kZWwuYXR0cihuYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVBdHRyKG5hbWUpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG5cbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlQXR0cihuYW1lKTtcbiAgICB9XG5cbiAgICBzZXQgaWQoaWQpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcImlkXCI6IGlkfSk7XG4gICAgfTtcblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cihcImlkXCIpO1xuICAgIH07XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuICAgICAgICByZXR1cm4gdGhpcy4kZWw7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGVsZW1lbnQgZXhpc3RzIGluIGRvbSwgd2UgbmVlZCB0byBmZXRjaCBpdCB1c2luZyBqUXVlcnlcbiAgICBjaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCkge1xuICAgICAgICBsZXQgJGpxRWxlbWVudCA9ICQoXCIjXCIrdGhpcy4kZWwuYXR0cignaWQnKSk7XG4gICAgICAgIGlmKCRqcUVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICRqcUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIERyYWdnYWJsZSBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcbiAgICB9XG5cbiAgICBkcmFnZ2FibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcImRyYWdnYWJsZVwiOiB2YWx1ZX0pO1xuICAgIH1cbn1cblxuY2xhc3MgUm90YXRhYmxlIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHJvdGF0YWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wicm90YXRhYmxlXCI6IHZhbHVlfSk7XG4gICAgfVxufVxuXG4vLyB0aGVyZSBpcyBubyBtdWx0aXBsZSBpbmhlcml0YW5jZSBpbiBFUzYsIHNvIEkgaGF2ZSB0byBkbyBzb21ldGhpbmcgdWdseSBsaWtlIHRoaXNcbmNsYXNzIERyYWdnYWJsZVJvdGF0YWJsZSBleHRlbmRzIERyYWdnYWJsZSB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcbiAgICB9XG5cbiAgICByb3RhdGFibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcInJvdGF0YWJsZVwiOiB2YWx1ZX0pO1xuICAgIH1cbn1cblxuY2xhc3MgU3ZnRWxlbWVudCBleHRlbmRzIERyYWdnYWJsZVJvdGF0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgdGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcblxuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTdmdFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoLCBmaWxsLCBzdHJva2UpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgdywgaCwgXCJyZWN0XCIpO1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgZmlsbDogZmlsbCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlLFxuICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IDAuNSxcbiAgICAgICAgICAgICdwb2ludGVyLWV2ZW50cyc6ICdhbGwnIC8vIHRvIHRyaWdnZXIgaG92ZXIgZXZlbiB3aXRoIHRyYW5zcGFyZW50IGJhY2tncm91bmRcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3ZnSW1hZ2UgZXh0ZW5kcyBTdmdFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoLCB1cmwpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgdywgaCwgXCJpbWFnZVwiKTtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIFwieGxpbms6aHJlZlwiOiB1cmxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlVXJsKHVybCkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgXCJ4bGluazpocmVmXCI6IHVybFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm91cCBleHRlbmRzIERyYWdnYWJsZVJvdGF0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiZ1wiKTtcbiAgICB9XG5cbiAgICBhZGRDaGlsZChlbCkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoZWwuJGVsKTtcbiAgICAgICAgcmV0dXJuIGVsOyAvLyBwcm8gamVkbm9kdXNzaSBcImxldCByZWN0ID0gZy5hZGRDaGlsZChuZXcgUmVjdGFuZ2xlKC4uLlwiXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9seWxpbmVQb2ludCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICBpZih4ICE9PSB1bmRlZmluZWQgJiYgeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCh4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlRnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgbGV0IGFyciA9IHN0cmluZy5zcGxpdChcIixcIik7XG4gICAgICAgIHJldHVybiBuZXcgUG9seWxpbmVQb2ludChhcnJbMF0sIGFyclsxXSk7XG4gICAgfVxuXG4gICAgZ2V0IHN0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIFwiLFwiICsgdGhpcy55O1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbHMoYSwgYikge1xuICAgICAgICByZXR1cm4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnk7XG4gICAgfVxufVxuXG5jbGFzcyBTbWFydEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcbiAgICAgICAgaWYoYXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyID0gYXJyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcnIgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBTbWFydEFycmF5KCQuZXh0ZW5kKHRydWUsIFtdLCB0aGlzLmFycikpO1xuICAgIH1cblxuICAgIGFwcGVuZChwb2ludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRXaXRoSW5kZXgocG9pbnQsIHRoaXMuYXJyLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgcHJlcGVuZChwb2ludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRXaXRoSW5kZXgocG9pbnQsIDApO1xuICAgIH1cblxuICAgIC8vIGFkZCBhIHBvaW50IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXgsIG1vdmUgYWxsIGZvbGxvd2luZyBpdGVtc1xuICAgIGFkZFdpdGhJbmRleChwb2ludCwgaW5kZXgpIHtcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy5hcnIubGVuZ3RoIDsgaSA+IGluZGV4IDsgLS1pKSB7XG4gICAgICAgICAgICB0aGlzLmFycltpXSA9IHRoaXMuYXJyW2ktMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcnJbaW5kZXhdID0gcG9pbnQ7XG4gICAgICAgIHJldHVybiB0aGlzOyAvLyB0byBlbmFibGUgY2hhaW5pbmcgb2YgYXBwZW5kIC8gcHJlcHBlbmQgLyBhZGRXaXRoSW5kZXggY29tbWFuZHNcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnIubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldEl0ZW0oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyW2luZGV4XTtcbiAgICB9XG5cbiAgICBnZXQgbGFzdCgpIHtcbiAgICAgICAgaWYodGhpcy5sZW5ndGghPT0wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJbdGhpcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBmaXJzdCgpIHtcbiAgICAgICAgaWYodGhpcy5sZW5ndGghPT0wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbmRleEFycmF5IG11c3QgYmUgc29ydGVkIChBU0MsIGVnLiBbMSwgMywgNCwgOF0pXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcblxuICAgICAgICBmb3IobGV0IGkgPSBpbmRleCA7IGkgPCBsZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyW2ldID0gdGhpcy5hcnJbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJyLnBvcCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvbHlsaW5lUG9pbnRzIGV4dGVuZHMgU21hcnRBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgICAgIHN1cGVyKGFycik7XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2x5bGluZVBvaW50cygkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5hcnIpKTtcbiAgICB9XG5cbiAgICBhcHBlbmQocG9pbnQpIHtcbiAgICAgICAgLy8gY2FsbCBpbmhlcml0ZWQgZnVuY3Rpb24gdG8gaGFuZGxlIHRoZSBhcHBlbmRpbmdcbiAgICAgICAgc3VwZXIuYXBwZW5kKHBvaW50KTtcblxuICAgICAgICAvLyBpZiB0aGUgc2Vjb25kIHRvIGxhc3QgcG9pbnQgaXMgdW5uZWNlc3NhcnksIHJlbW92ZSBpdFxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICAgIGlmICggbGVuZ3RoID49IDNcbiAgICAgICAgICAgICAgICAmJiAoICAgICggdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDMpLnggPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS54ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS54ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMSkueCApXG4gICAgICAgICAgICAgICAgICAgICB8fCAoIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAzKS55ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueSA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDEpLnkgKVxuICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShsZW5ndGggLSAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiB0aGlzIGVsZW1lbnQgKHRvIGFsbG93IGNoYWluaW5nKVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIHN0YXRpYyBwYXJzZUZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIGxldCBwb2ludFN0cmluZ3MgPSBzdHJpbmcuc3BsaXQoXCIgXCIpO1xuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IFBvbHlsaW5lUG9pbnRzKCk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBwb2ludFN0cmluZ3MubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBwb2ludHMuYXBwZW5kKFBvbHlsaW5lUG9pbnQucGFyc2VGcm9tU3RyaW5nKHBvaW50U3RyaW5nc1tpXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBvaW50cztcbiAgICB9XG5cbiAgICBnZXQgc3RyaW5nKCkge1xuICAgICAgICBsZXQgc3RyaW5nID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgaWYoaSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmluZyArPSB0aGlzLmFycltpXS5zdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICB9XG5cbiAgICBmb3JFYWNoKGZ1bmMpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmFyci5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIGZ1bmModGhpcy5hcnJbaV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9seUxpbmUgZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHBvaW50cywgY29sb3IsIHN0cm9rZVdpZHRoKSB7XG4gICAgICAgIHN1cGVyKFwicG9seWxpbmVcIik7XG5cbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIHBvaW50czogcG9pbnRzLnN0cmluZyxcbiAgICAgICAgICAgIHN0cm9rZTogY29sb3IsXG4gICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgIFwic3Ryb2tlLXdpZHRoXCI6IHN0cm9rZVdpZHRoXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVBvaW50cyhwb2ludHMpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIHBvaW50czogcG9pbnRzLnN0cmluZ1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXR0ZXJuIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihcInBhdHRlcm5cIik7XG5cbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICBwYXR0ZXJuVW5pdHM6IFwidXNlclNwYWNlT25Vc2VcIixcbiAgICAgICAgICAgIHZpZXdCb3g6IFwiMCAwIFwiK3dpZHRoK1wiIFwiK2hlaWdodFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRDaGlsZChlbCkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoZWwuJGVsKTtcbiAgICAgICAgcmV0dXJuIGVsOyAvLyBwcm8gamVkbm9kdXNzaSBcImxldCByZWN0ID0gZy5hZGRDaGlsZChuZXcgUmVjdGFuZ2xlKC4uLlwiXG4gICAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBsb2dpYyBmdW5jdGlvbnMgdXNlZCBpbiB0aGUgZ2F0ZSBldmFsdWF0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpYyB7XG4gICAgc3RhdGljIGFuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy50ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBbXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub2ZmXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBzdGF0aWMgbmFuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy5ub3QoTG9naWMuYW5kKGEsIGIpKTtcbiAgICB9XG4gICAgc3RhdGljIG5vcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy5ub3QoTG9naWMub3IoYSwgYikpO1xuICAgIH1cbiAgICBzdGF0aWMgbm90KGEpIHtcbiAgICAgICAgaWYoYSA9PT0gTG9naWMuc3RhdGUub24pIHtcbiAgICAgICAgICAgIHJldHVybiBMb2dpYy5zdGF0ZS5vZmY7XG4gICAgICAgIH0gZWxzZSBpZiAoYSA9PT0gTG9naWMuc3RhdGUub2ZmKSB7XG4gICAgICAgICAgICByZXR1cm4gTG9naWMuc3RhdGUub247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgb3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMudGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgW1xuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUudW5rbm93bl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgc3RhdGljIHhub3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMubm90KExvZ2ljLnhvcihhLCBiKSk7XG4gICAgfVxuICAgIHN0YXRpYyB4b3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMudGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgW1xuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUudW5rbm93bl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdW5rbm93bjogMCxcbiAgICAgICAgICAgIG9uOiAxLFxuICAgICAgICAgICAgb2ZmOiAyLFxuICAgICAgICAgICAgb3NjaWxsYXRpbmc6IDNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB0ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBydWxlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBydWxlcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKChydWxlc1tpXVswXT09PWEgJiYgcnVsZXNbaV1bMV09PT1iKSB8fCAocnVsZXNbaV1bMF09PT1iICYmIHJ1bGVzW2ldWzFdPT09YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnVsZXNbaV1bMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0ICogYXMgc3ZnT2JqIGZyb20gJy4vc3ZnT2JqZWN0cy5qcydcbmltcG9ydCAqIGFzIFN0cnVjdHVyZXMgZnJvbSAnLi9zdHJ1Y3R1cmVzQW5kQ2xhc3Nlcy5qcydcbmltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuXG4vLyBtYXBwaW5nIGxvZ2ljYWwgc3RhdGVzIHRvIGNzcyBjbGFzc2VzXG5jb25zdCBzdGF0ZUNsYXNzZXMgPSB7XG4gICAgb246IFwic3RhdGVPblwiLFxuICAgIG9mZjogXCJzdGF0ZU9mZlwiLFxuICAgIHVua25vd246IFwic3RhdGVVbmtub3duXCIsXG4gICAgb3NjaWxsYXRpbmc6IFwic3RhdGVPc2NpbGxhdGluZ1wiXG59O1xuXG4vLyBoZWxwZXIgY2xhc3MgdXNlZCBieSBUcmFuc2Zvcm1cbmNsYXNzIFByb3BlcnR5IHtcbiAgICBjb25zdHJ1Y3RvcihzdHJpbmcpIHtcbiAgICAgICAgaWYoc3RyaW5nIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBzdHJpbmcucmVwbGFjZSgvXlsgXSooW14oXSspLiovLCBcIiQxXCIpO1xuICAgICAgICAgICAgdGhpcy5hcmdzID0gc3RyaW5nLnJlcGxhY2UoL15bXihdK1xcKCguKilcXCkvLCBcIiQxXCIpLnNwbGl0KCcgJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXRBcmd1bWVudHMoYXJncykge1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiKFwiICsgdGhpcy5hcmdzLmpvaW4oXCIgXCIpICsgXCIpXCI7XG4gICAgfVxufVxuXG4vLyB1c2VkIHRvIG1hbmlwdWxhdGUgdGhlIHRyYW5zZm9ybSBhcmd1bWVudCB1c2VkIGluIFNWR1xuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybSB7XG4gICAgY29uc3RydWN0b3Ioc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcblxuICAgICAgICBpZihzdHJpbmchPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBzcGxpdEl0ZW1zID0gc3RyaW5nLnNwbGl0KFwiKVwiKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgc3BsaXRJdGVtcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihzcGxpdEl0ZW1zW2ldKSB7IC8vIGlmIG5vdCBlbXB0eVxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IFByb3BlcnR5KHNwbGl0SXRlbXNbaV0gKyBcIilcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgaW5kZXggb3IgLTFcbiAgICBnZXRJbmRleChuYW1lKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYobmFtZSA9PT0gdGhpcy5pdGVtc1tpXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNsYXRlKCkge1xuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZ2V0QXJndW1lbnRzKHRoaXMuZ2V0SW5kZXgoXCJ0cmFuc2xhdGVcIikpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBhcmdzWzBdLFxuICAgICAgICAgICAgeTogYXJnc1sxXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Um90YXRlKCkge1xuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZ2V0QXJndW1lbnRzKHRoaXMuZ2V0SW5kZXgoXCJyb3RhdGVcIikpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZWc6IGFyZ3NbMF0sXG4gICAgICAgICAgICBjZW50cmVYOiBhcmdzWzFdLFxuICAgICAgICAgICAgY2VudHJlWTogYXJnc1syXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0cyB0aGUgdHJhbnNsYXRpb25cbiAgICBzZXRUcmFuc2xhdGUoeCwgeSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihcInRyYW5zbGF0ZVwiLCBbeCwgeV0pO1xuICAgIH1cblxuICAgIC8vIHNldHMgdGhlIHJvdGF0aW9uXG4gICAgc2V0Um90YXRlKGRlZywgY2VudHJlWCwgY2VudHJlWSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihcInJvdGF0ZVwiLCBbZGVnLCBjZW50cmVYLCBjZW50cmVZXSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHRoZSByb3RhdGlvblxuICAgIHJvdGF0ZVJpZ2h0KGNlbnRyZVgsIGNlbnRyZVkpIHtcbiAgICAgICAgaWYodGhpcy5nZXRJbmRleChcInJvdGF0ZVwiKT09PS0xKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJvdGF0ZSg5MCwgY2VudHJlWCwgY2VudHJlWSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbmV3Um90YXRpb24gPSAocGFyc2VJbnQodGhpcy5nZXRSb3RhdGUoKS5kZWcpICsgOTApICUgMzYwO1xuXG4gICAgICAgICAgICBpZihuZXdSb3RhdGlvbj09PTE4MCkge1xuICAgICAgICAgICAgICAgIC8vIHN3YXAgY2VudHJlIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgLy8gYmVjYXVzZSByb3RhdGUoYywgeCwgeSkgaXMgZGVmaW5lZCBsaWtlIHRyYW5zZm9ybSgteCwgLXkpIHJvdGF0ZShjKSB0cmFuc2Zvcm0oeCwgeSlcbiAgICAgICAgICAgICAgICBsZXQgYSA9IGNlbnRyZVg7XG4gICAgICAgICAgICAgICAgY2VudHJlWCA9IGNlbnRyZVk7XG4gICAgICAgICAgICAgICAgY2VudHJlWSA9IGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Um90YXRlKFxuICAgICAgICAgICAgICAgIG5ld1JvdGF0aW9uLFxuICAgICAgICAgICAgICAgIGNlbnRyZVgsXG4gICAgICAgICAgICAgICAgY2VudHJlWVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0aWVzIGNvbmNhdGVuYXRlZFxuICAgIGdldCgpIHtcbiAgICAgICAgbGV0IHJldFZhbCA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGkhPT0wKSB7XG4gICAgICAgICAgICAgICAgcmV0VmFsICs9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0VmFsICs9IHRoaXMuaXRlbXNbaV0uZ2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG5cbiAgICBnZXRBcmd1bWVudHMoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNbaW5kZXhdLmFyZ3M7XG4gICAgfVxuXG4gICAgc2V0UGFyYW1ldGVyKG5hbWUsIGFyZ3MpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGluZGV4IG9mIHRoZSBwYXJhbWV0ZXIgKGlmIHNldCksIGVsc2UgaW5kZXggPT0gLTFcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleChuYW1lKTtcblxuICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaGFzIGJlZW4gYWxyZWFkeSBzZXQsIGNoYW5nZSBpdCAocmV3cml0ZSB0aGUgYXJyYXkgaW4gdGhlIHJpZ2h0IGluZGV4KVxuICAgICAgICAvLyBlbHNlIGNyZWF0ZSBhIG5ldyBvbmUgKHNldCBpbmRleCB0byB0aGUgbGVuZ3RoIG9mIGFuIGFycmF5IC0tPiBhZCBhbiBpdGVtIHRvIHRoZSBlbmQpXG4gICAgICAgIGlmKGluZGV4PT09LTEpIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLml0ZW1zW2luZGV4XSA9IG5ldyBQcm9wZXJ0eSgpO1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uc2V0TmFtZShuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNhdmUgYXJncyB1bmRlciB0aGUgcmlnaHQgaW5kZXhcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uc2V0QXJndW1lbnRzKGFyZ3MpO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBhbGwgbmV0d29yayBlbGVtZW50c1xuY2xhc3MgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICBpZighcGFyZW50U1ZHKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUGFyZW50IFNWRyBlbGVtZW50IGhhcyBub3QgYmVlbiBkZWZpbmVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcblxuICAgICAgICAvLyB1c2VkIHRvIHN0b3JlIHRoZSBzdmpPYmplY3QncyBpbnN0YW5jZSBvZiB0aGlzIGVsZW1lbnRcbiAgICAgICAgdGhpcy5zdmdPYmogPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmouaWQ7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uIHRvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMsIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGxhdGVyIGluIHRoZSBCb3ggY2xhc3NcbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uIHRvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMsIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGxhdGVyIGluIHRoZSBCb3ggYW5kIENvbm5lY3RvciBjbGFzc2VzXG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uIHRvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMsIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGxhdGVyIGluIHRoZSBCb3ggY2xhc3NcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIidqc29uJyBnZXR0ZXIgaGFzIG5vdCBiZWVuIGRlZmluZWQgZm9yIHRoaXMgZWxlbWVudFwiLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbi8vIHBhcmVudCBjbGFzcyBmb3IgaW5wdXQgYW5kIG91dHB1dCBjb25uZWN0b3JzICh0aGUgdGhpbmdzIHlvdSBjbGljayBvblxuLy8gd2hlbiB5b3Ugd2FudCB0byBjb25uZWN0IGVsZW1lbnRzKVxuY2xhc3MgQ29ubmVjdG9yIGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkgeyAvLyB1bml0IG9mIGxlZnQgLyB0b3AgaXMgdGhlIHNpemUgb2YgdGhlIGdyaWRcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHKTtcblxuICAgICAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2l6ZSA9IGdyaWRTaXplO1xuICAgICAgICB0aGlzLmNvbm5lY3Rvck9mZnNldCA9IHRoaXMuY29ubmVjdG9yU2l6ZSAvIDI7XG5cbiAgICAgICAgdGhpcy5zdmdPYmogPSBuZXcgc3ZnT2JqLlJlY3RhbmdsZShcbiAgICAgICAgICAgIGxlZnQgKiB0aGlzLmdyaWRTaXplIC0gdGhpcy5jb25uZWN0b3JPZmZzZXQsXG4gICAgICAgICAgICB0b3AgKiB0aGlzLmdyaWRTaXplIC0gdGhpcy5jb25uZWN0b3JPZmZzZXQsXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNpemUsXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNpemUsXG4gICAgICAgICAgICBcIm5vbmVcIixcbiAgICAgICAgICAgIFwiYmxhY2tcIlxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcImNvbm5lY3RvclwiKTtcblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGlmIGEgd2lyZSBjYW4gc2V0IGNvbm5lY3RvcidzIHN0YXRlXG4gICAgICAgIHRoaXMuaXNJbnB1dENvbm5lY3RvciA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gTG9naWMuc3RhdGUudW5rbm93bjtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuXG4gICAgICAgIHRoaXMud2lyZUlkcyA9IG5ldyBTZXQoKTtcbiAgICB9XG5cbiAgICBnZXQgaXNPdXRwdXRDb25uZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0lucHV0Q29ubmVjdG9yO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0Q29ubmVjdG9yOiAwLFxuICAgICAgICAgICAgb3V0cHV0Q29ubmVjdG9yOiAxXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRXaXJlSWQod2lyZUlkKSB7XG4gICAgICAgIHRoaXMud2lyZUlkcy5hZGQod2lyZUlkKTtcbiAgICB9XG5cbiAgICByZW1vdmVXaXJlSWQod2lyZUlkKSB7XG4gICAgICAgIHRoaXMud2lyZUlkcy5kZWxldGUod2lyZUlkKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmVzIHRoZSB3aXJlIGFuZCB1cGRhdGVzIHRoZSBjb25uZWN0b3JcbiAgICByZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlV2lyZUlkKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUsIHByb3BhZ2F0aW9uSWQpIHtcbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9uOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub2ZmKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUF0dHI7XG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmo7XG4gICAgfVxuXG4gICAgb25Nb3VzZVVwKCkge1xuICAgICAgICB0aGlzLnBhcmVudFNWRy53aXJlQ3JlYXRpb25IZWxwZXIodGhpcy5zdmdPYmouaWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0Q29ubmVjdG9yIGV4dGVuZHMgQ29ubmVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApIHtcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKTtcblxuXG4gICAgICAgIHRoaXMudHlwZSA9IENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yO1xuICAgICAgICB0aGlzLmlzSW5wdXRDb25uZWN0b3IgPSB0cnVlO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZXRTdGF0ZSBvbicsIHRoaXMuaWQpXG5cbiAgICAgICAgc3VwZXIuc2V0U3RhdGUoc3RhdGUpO1xuXG4gICAgICAgIGxldCBnYXRlID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZCh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIGdhdGUucmVmcmVzaFN0YXRlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCkge1xuICAgICAgICBzdXBlci5yZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShMb2dpYy5zdGF0ZS51bmtub3duKTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRDb25uZWN0b3IgZXh0ZW5kcyBDb25uZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuXG4gICAgICAgIC8vIHVzZWQgdG8gc2V0IHRoZSB3aXJlIHN0YXRlIGR1cmluZyB3aXJlIGluaXRpYWxpemF0aW9uIGJhc2VkIG9uIHRoZSBvdXRwdXQgY29ubmVjdG9yIHN0YXRlXG4gICAgICAgIHRoaXMuaXNPdXRwdXQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudHlwZSA9IENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3RvcjtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBzdXBlci5zZXRTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB3aXJlSWQgb2YgdGhpcy53aXJlSWRzKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5nZXRXaXJlQnlJZCh3aXJlSWQpLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXRlO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBnYXRlcyBhbmQgaW5wdXQgYW5kIG91dHB1dCBib3hlc1xuY2xhc3MgQm94IGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSwgY2F0ZWdvcnksIGdyaWRXaWR0aCwgZ3JpZEhlaWdodCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IHRoaXMucGFyZW50U1ZHLmdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMudXJsID0gXCJpbWcvXCIgKyB0aGlzLmNhdGVnb3J5ICsgXCIvXCIgKyB0aGlzLm5hbWUgKyBcIi5zdmdcIjtcblxuICAgICAgICB0aGlzLmNvbm5lY3RvcnMgPSBbXTtcblxuICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouR3JvdXAoKTtcblxuICAgICAgICB0aGlzLndpZHRoID0gZ3JpZFdpZHRoICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBncmlkSGVpZ2h0ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmdyaWRXaWR0aCA9IGdyaWRXaWR0aDtcbiAgICAgICAgdGhpcy5ncmlkSGVpZ2h0ID0gZ3JpZEhlaWdodDtcblxuICAgICAgICAvLyB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICAgICAgICBsZXQgcmVjdGFuZ2xlID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIFwibm9uZVwiLCBcIm5vbmVcIik7XG4gICAgICAgIHJlY3RhbmdsZS4kZWwuYWRkQ2xhc3MoJ3JlY3QnKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQocmVjdGFuZ2xlKTtcbiAgICAgICAgLy8gaW1hZ2Ugb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBzdmdPYmouU3ZnSW1hZ2UoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMudXJsKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICAgICAgLy8gYWRkIGRyYWdnYWJpbGl0eSBhbmQgcm90YXRhYmlsaXR5XG4gICAgICAgIHRoaXMuc3ZnT2JqLmRyYWdnYWJsZSh0cnVlKTtcbiAgICAgICAgdGhpcy5zdmdPYmoucm90YXRhYmxlKHRydWUpO1xuXG4gICAgICAgIC8vIGFkZCB0eXBlPVwiZ2F0ZVwiLCB1c2VkIGluIHNwZWNpYWwgY2FsbGJhY2tzIGluIGNvbnRleHRtZW51XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHlwZVwiOiBjYXRlZ29yeX0pO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcImJveFwiKTtcbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKGNhdGVnb3J5KTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2RlcygpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dENvbm5lY3RvcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvcnMuZmlsdGVyKGNvbm4gPT4gY29ubi5pc0lucHV0Q29ubmVjdG9yKVxuICAgIH1cblxuICAgIGdldCBvdXRwdXRDb25uZWN0b3JzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JzLmZpbHRlcihjb25uID0+IGNvbm4uaXNPdXRwdXRDb25uZWN0b3IpXG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGxldCBjb25uZWN0aW9ucyA9IFtdO1xuXG4gICAgICAgIC8vIGdvIHRocm91Z2ggYWxsIGNvbm5lY3RvcnNcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwXG4gICAgICAgIGZvciAoY29uc3QgY29ubiBvZiB0aGlzLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgICAgIC8vIGdvIHRocm91Z2ggZWFjaCBpdHMgd2lyZSBpZFxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNvbm4ud2lyZUlkcykge1xuICAgICAgICAgICAgICAgIGxldCB0aGlzV2lyZUlkO1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuaGFzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB3aXJlIGlkIGlzIG5vdCBpbiB0aGUgbWFwLCBhZGQgaXQgYW5kIGFzc2lnbiBuZXcgYXJiaXRyYXJ5IGlkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZE1hcC5zZXQoaXRlbSwgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1dpcmVJZCA9IHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBnZXQgaWQgZnJvbSB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIHRoaXNXaXJlSWQgPSB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuZ2V0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoaXMgY29ubmVjdGlvbiB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25zW2Nvbm5lY3Rpb25zLmxlbmd0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb25uLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHdpcmVJZDogdGhpc1dpcmVJZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyKytcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAvLyBpZDogdGhpcy5zdmdPYmouaWQsXG4gICAgICAgICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdGhpcy5nZXRUcmFuc2Zvcm0oKSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25zOiBjb25uZWN0aW9uc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcyhtYXJnaW5Ub3AgPSAwLCBtYXJnaW5SaWdodCA9IDAsIG1hcmdpbkJvdHRvbSA9IDAsIG1hcmdpbkxlZnQgPSAwLCAuLi5zcGVjaWFsTm9kZXMpIHtcbiAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvcihsZXQgeCA9IG1hcmdpbkxlZnQgOyB4IDw9IHRoaXMuZ3JpZFdpZHRoIC0gbWFyZ2luUmlnaHQgOyB4KyspIHtcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IG1hcmdpblRvcCA7IHkgPD0gdGhpcy5ncmlkSGVpZ2h0IC0gbWFyZ2luQm90dG9tIDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBzcGVjaWFsTm9kZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmFkZChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24sIHJlZGVmaW5lZCBpbiBpbmhlcml0ZWQgZWxlbWVudHNcbiAgICAgICAgLy8gcmVmcmVzaFN0YXRlIHRha2VzIGlucHV0IGNvbm5lY3RvciB2YWx1ZXMgYW5kIHNldHMgb3V0cHV0IHZhbHVlcyBhY2NvcmRpbmdseVxuICAgICAgICBjb25zb2xlLndhcm4oXCJDYWxsaW5nIHRoZSB2aXJ0dWFsIGZ1bmN0aW9uIHJlZnJlc2hTdGF0ZSBoYXMgbm8gZWZmZWN0LlwiKTtcbiAgICB9XG5cbiAgICAvLyB1c2FnZTogY2hhbmdlSW1hZ2UoXCJhYmNcIikgY2hhbmdlcyBpbWFnZSB1cmwgdG8gaW1hZ2UtYWJjLnN2Z1xuICAgIC8vICAgICAgICBjaGFuZ2VJbWFnZSgpIGNoYW5nZXMgaW1hZ2UgdXJsIHRvIHRoZSBkZWZhdWx0IG9uZSAoaW1hZ2Uuc3ZnKVxuICAgIGNoYW5nZUltYWdlKHN1ZmZpeCkge1xuICAgICAgICBpZihzdWZmaXggPT09IHVuZGVmaW5lZCB8fCBzdWZmaXggPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHN1ZmZpeCA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWZmaXggPSBcIi1cIiArIHN1ZmZpeDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVybCA9IFwiaW1nL1wiICsgdGhpcy5jYXRlZ29yeSArIFwiL1wiICsgdGhpcy5uYW1lICsgc3VmZml4ICsgXCIuc3ZnXCI7XG5cbiAgICAgICAgdGhpcy5pbWFnZS5jaGFuZ2VVcmwodGhpcy51cmwpO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgYSBqUXVlcnkgb2JqZWN0XG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmouZ2V0KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQmxvY2tlZE5vZGUoeCwgeSkge1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5ibG9ja2VkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmKGl0ZW0ueD09PXggJiYgaXRlbS55PT09eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJvdGF0ZUJsb2NrZWROb2Rlc1JpZ2h0KCkge1xuICAgICAgICBpZih0aGlzLnJvdGF0aW9uPT09dW5kZWZpbmVkIHx8IHRoaXMucm90YXRpb249PT00KSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdGF0aW9uKys7XG5cbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbiA9PT0gMSB8fCB0aGlzLnJvdGF0aW9uID09PSAzKSB7XG4gICAgICAgICAgICBsZXQgbmV3QmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBuZXdCbG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5hYnMoaXRlbS55IC0gdGhpcy5ncmlkSGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgeTogaXRlbS54XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3QmxvY2tlZE5vZGVzO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5yb3RhdGlvbiA9PT0gMiB8fCB0aGlzLnJvdGF0aW9uID09PSA0KSB7XG4gICAgICAgICAgICBsZXQgbmV3QmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBuZXdCbG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5hYnMoaXRlbS55IC0gdGhpcy5ncmlkV2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICB5OiBpdGVtLnhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMgPSBuZXdCbG9ja2VkTm9kZXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDb25uZWN0b3IobGVmdCwgdG9wLCBjb25uZWN0b3JUeXBlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY29ubmVjdG9ycy5sZW5ndGg7XG4gICAgICAgIGlmKGNvbm5lY3RvclR5cGU9PT1Db25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzW2luZGV4XSA9IG5ldyBJbnB1dENvbm5lY3Rvcih0aGlzLnBhcmVudFNWRywgdGhpcy5ncmlkU2l6ZSwgbGVmdCwgdG9wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1tpbmRleF0gPSBuZXcgT3V0cHV0Q29ubmVjdG9yKHRoaXMucGFyZW50U1ZHLCB0aGlzLmdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENoaWxkKHRoaXMuY29ubmVjdG9yc1tpbmRleF0uZ2V0KCkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlQmxvY2tlZE5vZGUobGVmdCwgdG9wKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRoZSBjb25uZWN0b3Igb2JqZWN0IGJhc2VkIG9uIGl0cyBpZFxuICAgIGdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmNvbm5lY3RvcnMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmNvbm5lY3RvcnNbaV0uaWQ9PT1jb25uZWN0b3JJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgY29ubmVjdG9yIG5vdCBmb3VuZCwgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybTtcbiAgICAgICAgaWYgKCF0aGlzLnN2Z09iai4kZWwuYXR0cihcInRyYW5zZm9ybVwiKSkge1xuICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnQgZG9lcyBub3QgaGF2ZSBhIFwidHJhbnNmb3JtXCIgcHJvcGVydHkgLS0+IGNyZWF0ZSBpdFxuICAgICAgICAgICAgdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZSgwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnQgZG9lcyBoYXZlIGEgXCJ0cmFuc2Zvcm1cIiBwcm9wZXJ0eSAtLT4gY2hhbmdlIGl0XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHRoaXMuc3ZnT2JqLiRlbC5hdHRyKFwidHJhbnNmb3JtXCIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtO1xuICAgIH1cblxuICAgIHNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tb3VzZUxlZnQgPSBmYWxzZTtcbiAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZURvd25MZWZ0KGV2ZW50KTtcblxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgRE9NIGVsZW1lbnQgdG8gZnJvbnRcbiAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLm1vdmVUb0Zyb250QnlJZCh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bkxlZnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tb3VzZU1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG5cbiAgICAgICAgLy8gc2F2ZSB0aGUgY3VycmVudCBpdGVtIHBvc2l0aW9uIGludG8gYSB2YXJpYWJsZVxuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gdHJhbnNmb3JtLmdldFRyYW5zbGF0ZSgpO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBtb3VzZSBvZmZzZXQgZnJvbSB0aGUgb2JqZWN0IG9yaWdpblxuICAgICAgICB0aGlzLm9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYIC0gY3VycmVudFBvc2l0aW9uLngsXG4gICAgICAgICAgICB5OiBldmVudC5wYWdlWSAtIGN1cnJlbnRQb3NpdGlvbi55XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy5tb3VzZUxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGxldCBsZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLm9mZnNldC54O1xuICAgICAgICAgICAgbGV0IHRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5vZmZzZXQueTtcblxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG4gICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2lyZXModHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubW91c2VNb3ZlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Ecm9wKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IDIgKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tNaWRkbGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcChldmVudCkge1xuICAgICAgICBsZXQgbGVmdCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5vZmZzZXQueDtcbiAgICAgICAgbGV0IHRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5vZmZzZXQueTtcblxuICAgICAgICBsZWZ0ID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZChsZWZ0KTtcbiAgICAgICAgdG9wID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0b3ApO1xuXG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKCk7XG4gICAgfVxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24sIHdpbGwgYmUgcmVkZWZpbmVkIGluIElucHV0Qm94XG4gICAgfVxuXG4gICAgb25DbGlja01pZGRsZSgpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG5cbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLnN2Z09iai4kZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgbGV0IGNlbnRyZVggPSBNYXRoLnJvdW5kKHJlY3Qud2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGNlbnRyZVkgPSBNYXRoLnJvdW5kKHJlY3QuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgY2VudHJlWCAtPSBjZW50cmVYICUgdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgY2VudHJlWSAtPSBjZW50cmVZICUgdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICB0cmFuc2Zvcm0ucm90YXRlUmlnaHQoXG4gICAgICAgICAgICBjZW50cmVYLFxuICAgICAgICAgICAgY2VudHJlWVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuXG4gICAgICAgIHRoaXMucm90YXRlQmxvY2tlZE5vZGVzUmlnaHQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlcyBhbGwgd2lyZXMgY29ubmVjdGVkIHRvIHRoaXMgYm94XG4gICAgdXBkYXRlV2lyZXModGVtcG9yYXJ5ID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JzLmZvckVhY2goY29ubiA9PiB7XG4gICAgICAgICAgICBjb25uLndpcmVJZHMuZm9yRWFjaCh3aXJlSWQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB3aXJlID0gdGhpcy5wYXJlbnRTVkcuZ2V0V2lyZUJ5SWQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBpZih0ZW1wb3JhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS50ZW1wb3JhcnlXaXJlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS5yb3V0ZVdpcmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGlzT24gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDc7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBcImlucHV0XCIsIFwiaW9cIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5hZGRDb25uZWN0b3Iod2lkdGgsIGhlaWdodCAvIDIsIENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3Rvcik7XG5cbiAgICAgICAgdGhpcy5vbiA9IGlzT247XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGxldCBkYXRhID0gc3VwZXIuZXhwb3J0RGF0YTtcbiAgICAgICAgZGF0YS5pc09uID0gdGhpcy5pc09uO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAxLCAxLCAwKTtcbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIHN0YXJ0IGEgbmV3IHNpbXVsYXRpb24gZnJvbSB0aGUgb3V0cHV0IGNvbm5lY3RvclxuICAgICAgICB0aGlzLnBhcmVudFNWRy5zdGFydE5ld1NpbXVsYXRpb24odGhpcy5jb25uZWN0b3JzWzBdLCB0aGlzLmNvbm5lY3RvcnNbMF0uc3RhdGUpXG4gICAgfVxuXG4gICAgc2V0IG9uKGlzT24pIHtcbiAgICAgICAgaWYgKGlzT24pIHtcbiAgICAgICAgICAgIC8vIHR1cm4gb25cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvblwiKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5zdGF0ZS5vbik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9mZlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLnN0YXRlLm9mZik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzT24gPSBpc09uO1xuICAgIH1cblxuICAgIGdldCBvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPbjtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICB0aGlzLm9uID0gIXRoaXMub247XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA1O1xuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgXCJvdXRwdXRcIiwgXCJpb1wiLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuY29ubmVjdG9yc1swXS5zdGF0ZSk7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib25cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib2ZmXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9zY1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcygpIHtcbiAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDAsIDAsIDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdhdGUgZXh0ZW5kcyBCb3gge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBuYW1lLCBcImdhdGVcIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgLy8gb3V0cHV0XG4gICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKHdpZHRoLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5vdXRwdXRDb25uZWN0b3IpO1xuXG4gICAgICAgIGlmKHRoaXMubmFtZT09PVwibm90XCIpIHtcbiAgICAgICAgICAgIC8vIGlucHV0XG4gICAgICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpbnB1dFxuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gNCwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gKDQvMyksIENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKTtcblxuICAgICAgICAgICAgLy8gYWRkIG9uZSBibG9ja2VkTm9kZSBiZXR3ZWVuIHRoZSBpbnB1dHMgKGZvciBiZXR0ZXIgbG9va2luZyB3aXJpbmcpXG4gICAgICAgICAgICAvLyBhbmQgcmVnZW5lcmF0ZSBibG9ja2VkIG5vZGVzXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2Rlcyh7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiBoZWlnaHQgLyAyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXRlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKHNwZWNpYWxOb2RlKSB7XG4gICAgICAgIGlmKHNwZWNpYWxOb2RlIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdXBlci5nZW5lcmF0ZUJsb2NrTm9kZXMoMCwgMSwgMCwgMSwgc3BlY2lhbE5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDAsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICBsZXQgc3RhdGUgPSBMb2dpYy5zdGF0ZS51bmtub3duXG4gICAgICAgIHN3aXRjaCAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMuYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5hbmRcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5uYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLm5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub3RcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5ub3QodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLnhub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMueG9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vdGlmeSB0aGUgc2ltdWxhdG9yIGFib3V0IHRoaXMgY2hhbmdlXG4gICAgICAgIHRoaXMucGFyZW50U1ZHLnNpbXVsYXRpb24ubm90aWZ5Q2hhbmdlKHRoaXMuY29ubmVjdG9yc1swXS5pZCwgc3RhdGUpXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgV2lyZSBleHRlbmRzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGZyb21JZCwgdG9JZCwgZ3JpZFNpemUsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIC8vIHNtYWxsIHRvZG86IHJld29yayBzdGFydC4uLiBlbmQuLi4gdG8gYXJyYXlzPyAobm90IGltcG9ydGFudClcblxuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmZyb21JZCA9IGZyb21JZDtcbiAgICAgICAgdGhpcy50b0lkID0gdG9JZDtcblxuICAgICAgICB0aGlzLnN0YXJ0Qm94ID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZChmcm9tSWQpO1xuICAgICAgICB0aGlzLmVuZEJveCA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQodG9JZCk7XG5cbiAgICAgICAgdGhpcy5ib3hlcyA9IFt0aGlzLnN0YXJ0Qm94LCB0aGlzLmVuZEJveF1cblxuICAgICAgICB0aGlzLnN0YXJ0Q29ubmVjdG9yID0gdGhpcy5wYXJlbnRTVkcuZ2V0Q29ubmVjdG9yQnlJZChmcm9tSWQpO1xuICAgICAgICB0aGlzLmVuZENvbm5lY3RvciA9IHRoaXMucGFyZW50U1ZHLmdldENvbm5lY3RvckJ5SWQodG9JZCk7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0b3JzID0gW3RoaXMuc3RhcnRDb25uZWN0b3IsIHRoaXMuZW5kQ29ubmVjdG9yXVxuICAgICAgICB0aGlzLnJvdXRlV2lyZSh0cnVlLCByZWZyZXNoKTtcblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IExvZ2ljLnN0YXRlLnVua25vd247XG5cbiAgICAgICAgZm9yIChsZXQgY29ubmVjdG9yIG9mIHRoaXMuY29ubmVjdG9ycykge1xuICAgICAgICAgICAgaWYoY29ubmVjdG9yLmlzT3V0cHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShjb25uZWN0b3Iuc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKFwid2lyZVwiKTtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZyb21JZDogdGhpcy5mcm9tSWQsXG4gICAgICAgICAgICB0b0lkOiB0aGlzLnRvSWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub2ZmOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vZmYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhcnRDb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5zdGFydENvbm5lY3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5lbmRDb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5lbmRDb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlQXR0cjtcbiAgICB9XG5cbiAgICB1cGRhdGVXaXJlU3RhdGUoKSB7XG4gICAgICAgIGZvciAoY29uc3QgYm94IG9mIHRoaXMuYm94ZXMpIHtcbiAgICAgICAgICAgIGJveC5yZWZyZXNoU3RhdGUoKVxuICAgICAgICB9XG4gICAgICAgIC8vIGZvciAoY29uc3QgY29ubiBvZiB0aGlzLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgLy8gICAgIGlmKGNvbm4uaXNPdXRwdXRDb25uZWN0b3IpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnBhcmVudFNWRy5zdGFydE5ld1NpbXVsYXRpb24oY29ubi5pZCwgY29ubi5zdGF0ZSlcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqLmdldCgpO1xuICAgIH1cblxuICAgIGdldFRlbXBvcmFyeVdpcmVQb2ludHMoKSB7XG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnRzKCk7XG4gICAgICAgIHBvaW50cy5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMud2lyZVN0YXJ0LngsIHRoaXMud2lyZVN0YXJ0LnkpKTtcbiAgICAgICAgcG9pbnRzLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy53aXJlRW5kLngsIHRoaXMud2lyZUVuZC55KSk7XG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgdGVtcG9yYXJ5V2lyZSgpIHtcbiAgICAgICAgdGhpcy53aXJlU3RhcnQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuc3RhcnRDb25uZWN0b3IsIGZhbHNlKTtcbiAgICAgICAgdGhpcy53aXJlRW5kID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLmVuZENvbm5lY3RvciwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuc2V0V2lyZVBhdGgodGhpcy5nZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCkpO1xuXG4gICAgICAgIC8vIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgLy8gdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuICAgIH1cblxuICAgIHJvdXRlV2lyZShzbmFwVG9HcmlkID0gdHJ1ZSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy53aXJlU3RhcnQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuc3RhcnRDb25uZWN0b3IsIHNuYXBUb0dyaWQpO1xuICAgICAgICB0aGlzLndpcmVFbmQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuZW5kQ29ubmVjdG9yLCBzbmFwVG9HcmlkKTtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IHRoaXMuYVN0YXIoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlU3RhcnQueCAvIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgeTogdGhpcy53aXJlU3RhcnQueSAvIHRoaXMuZ3JpZFNpemVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlRW5kLnggLyB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMud2lyZUVuZC55IC8gdGhpcy5ncmlkU2l6ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRXaXJlUGF0aCh0aGlzLnBvaW50cyk7XG5cbiAgICAgICAgaWYgKHJlZnJlc2gpXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdpcmVTdGF0ZSgpO1xuICAgIH1cblxuICAgIHNldFdpcmVQYXRoKHBvaW50cykge1xuICAgICAgICAvLyBzZXQgdGhlIGxpbmVcbiAgICAgICAgaWYodGhpcy5zdmdPYmohPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqLnVwZGF0ZVBvaW50cyhwb2ludHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdmdPYmogPSBuZXcgc3ZnT2JqLlBvbHlMaW5lKHBvaW50cywgXCIjOGI4YjhiXCIsIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XG4gICAgICAgICAgICBmcm9tSWQ6IHRoaXMuZnJvbUlkLFxuICAgICAgICAgICAgdG9JZDogdGhpcy50b0lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvLyBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiB0aGlzIHBzZXVkb2NvZGU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0EqX3NlYXJjaF9hbGdvcml0aG0jUHNldWRvY29kZVxuICAgIGFTdGFyKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgLy8gbnVtYmVyIG9mIG5vZGVzLCB0aGF0IGNhbiBiZSBvcGVuZWQgYXQgb25jZVxuICAgICAgICAvLyBvbmNlIGlzIHRoaXMgbGltaXQgZXhjZWVkZWQsIGFTdGFyIHdpbGwgZmFpbCBhbmQgZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cyB3aWxsIGJlIHVzZWQgaW5zdGVhZFxuICAgICAgICBjb25zdCBtYXhOb2RlTGltaXQgPSA1MDAwMDtcblxuICAgICAgICBsZXQgY2xvc2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGxldCBvcGVuTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIG9wZW5Ob2Rlcy5hZGQoc3RhcnQpO1xuXG4gICAgICAgIGxldCBjYW1lRnJvbSA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHZhbHVlOiBpbmZpbml0eVxuICAgICAgICBsZXQgZ1Njb3JlID0gbmV3IFN0cnVjdHVyZXMuTWFwV2l0aERlZmF1bHRWYWx1ZShJbmZpbml0eSk7XG4gICAgICAgIGdTY29yZS5zZXQoc3RhcnQsIDApO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgdmFsdWU6IGluZmluaXR5XG4gICAgICAgIGxldCBmU2NvcmUgPSBuZXcgU3RydWN0dXJlcy5NYXBXaXRoRGVmYXVsdFZhbHVlKEluZmluaXR5KTtcbiAgICAgICAgZlNjb3JlLnNldChzdGFydCwgV2lyZS5tYW5oYXR0YW5EaXN0YW5jZShzdGFydCwgZW5kKSk7XG5cbiAgICAgICAgbGV0IG5vblJvdXRhYmxlID0gdGhpcy5wYXJlbnRTVkcuZ2V0Tm9uUm91dGFibGVOb2RlcygpO1xuICAgICAgICBsZXQgcHVuaXNoZWRCdXRSb3V0YWJsZTtcbiAgICAgICAgaWYodGhpcy5zdmdPYmo9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHB1bmlzaGVkQnV0Um91dGFibGUgPSB0aGlzLnBhcmVudFNWRy5nZXRJbmNvbnZlbmllbnROb2RlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHVuaXNoZWRCdXRSb3V0YWJsZSA9IHRoaXMucGFyZW50U1ZHLmdldEluY29udmVuaWVudE5vZGVzKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChvcGVuTm9kZXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZUZTY29yZTtcblxuICAgICAgICAgICAgLy8gZmluZCB0aGUgdmFsdWUgZnJvbSBvcGVuTm9kZXMgdGhhdCBoYXMgdGhlIGxvd2VzdCBmU2NvcmVcbiAgICAgICAgICAgIC8vIChjYW4gYmUgaW1wbGVtZW50ZWQgZWZmZWN0aXZlbHkgdXNpbmcgbWluLWhlYXAgZGF0YSBzdHJ1Y3R1cmUgKG1heWJlIHRvZG8gc29tZXRpbWUpPylcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBvcGVuTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZighY3VycmVudE5vZGUgfHwgZlNjb3JlLmdldChub2RlKSA8IGN1cnJlbnROb2RlRlNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGVGU2NvcmUgPSBmU2NvcmUuZ2V0KGN1cnJlbnROb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc3ZnT2JqLlBvbHlsaW5lUG9pbnQuZXF1YWxzKGN1cnJlbnROb2RlLCBlbmQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjb25zdHJ1Y3RQYXRoKGNhbWVGcm9tLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9wZW5Ob2Rlcy5kZWxldGUoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgY2xvc2VkTm9kZXMuYWRkKGN1cnJlbnROb2RlKTtcblxuICAgICAgICAgICAgLy8gdGhlIGZhcnRoZXN0IHBvaW50cyBhY2Nlc3NpYmxlIHdpdGhvdXQgYXZvaWRpbmcgb2JzdGFjbGVzIGluIGV2ZXJ5IGRpcmVjdGlvblxuICAgICAgICAgICAgLy8gKGJ1dCBtYXggNTAgaW4gZWFjaCBkaXJlY3Rpb24pXG4gICAgICAgICAgICBmb3IobGV0IGRpcmVjdGlvbiA9IDAgOyBkaXJlY3Rpb24gPCA0IDsgZGlyZWN0aW9uKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9pbnQgPSBXaXJlLm1vdmVQb2ludChjdXJyZW50Tm9kZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDUwIDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5ld1BvaW50IGlzIGluIHRoZSBzZXQgb2Ygbm9uIHJvdXRhYmxlIHBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWRkIGl0IGFuZCBzdG9wIHByb2NlZWRpbmcgaW4gdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoV2lyZS5zZXRIYXNUaGlzUG9pbnQobm9uUm91dGFibGUsIHRoaXMuc2NhbGVQb2ludFRvR3JpZChuZXdQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNraXAgdGhpcyBub2RlLCBpZiBpdCBoYXMgYmVlbiBhbHJlYWR5IGNsb3NlZFxuICAgICAgICAgICAgICAgICAgICAvLyBvciBpZiBpdCBpcyBvbiB0aGUgbGlzdCBvZiBub24gcm91dGFibGUgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlZE5vZGVzLmhhcyhuZXdQb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcGVuTm9kZXMuaGFzKG5ld1BvaW50KS55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuTm9kZXMuYWRkKG5ld1BvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBwb3NzaWJsZSBHU2NvcmUgYnkgYWRkaW5nIDEgdG8gdGhlIHNjb3JlIG9mIHRoZSBub2RlIHdlIGNhbWUgZnJvbVxuICAgICAgICAgICAgICAgICAgICAvLyAod2UgcHJpb3JpdGl6ZSB0byBtaW5pbWl6ZSB0aGUgbnVtYmVyIG9mIG5vZGVzIGFuZCBub3QgdGhlIGRpc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAvLyAgc28gd2UgYXJlIGFkZGluZyAxIG9uIGFsbCBub2RlcywgZXZlbiBpZiB0aGUgZXVjbGlkZWFuIC8gbWFubmhhdGFuIGRpc3RhbmNlIG1heSB2YXJ5KVxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5jcmVtZW50ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSE9PTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc3NpYmxlR1Njb3JlID0gZ1Njb3JlLmdldChjdXJyZW50Tm9kZSkgKyBpbmNyZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoV2lyZS5zZXRIYXNUaGlzUG9pbnQocHVuaXNoZWRCdXRSb3V0YWJsZSwgdGhpcy5zY2FsZVBvaW50VG9HcmlkKG5ld1BvaW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBub2RlIGlzIGluIHRoZSBzZXQgb2YgcHVuaXNoZWQgbm9kZSwgcHVuaXNoIGl0IGJ5IGFkZGluZyB0byB0aGUgR1Njb3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZUdTY29yZSArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3NpYmxlR1Njb3JlID49IGdTY29yZS5nZXQobmV3UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNhbWVGcm9tLnNldChuZXdQb2ludCwgY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBnU2NvcmUuc2V0KG5ld1BvaW50LCBwb3NzaWJsZUdTY29yZSk7XG4gICAgICAgICAgICAgICAgICAgIGZTY29yZS5zZXQobmV3UG9pbnQsIHBvc3NpYmxlR1Njb3JlICsgV2lyZS5tYW5oYXR0YW5EaXN0YW5jZShuZXdQb2ludCwgZW5kKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmV3UG9pbnQgaXMgaW4gdGhlIHNldCBvZiBwdW5pc2hlZCBidXQgcm91dGFibGUgcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgaXQgYnV0IHN0b3AgcHJvY2VlZGluZyBpbiB0aGlzIGRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICBpZihXaXJlLnNldEhhc1RoaXNQb2ludChwdW5pc2hlZEJ1dFJvdXRhYmxlLCB0aGlzLnNjYWxlUG9pbnRUb0dyaWQobmV3UG9pbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlIHRvIHRoZSBuZXh0IHBvaW50IGluIHRoZSBkaXJlY2l0b25cbiAgICAgICAgICAgICAgICAgICAgbmV3UG9pbnQgPSBXaXJlLm1vdmVQb2ludChuZXdQb2ludCwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKG9wZW5Ob2Rlcy5zaXplID4gbWF4Tm9kZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgZ290IGhlcmUsIHRoZSBwYXRoIGRvZXMgbm90IGV4aXN0IC0+IGxldCdzIHVzZSB0ZW1wb3JhcnkgcGF0aCBpZ25vcmluZyBhbGwgY29saXNpb25zXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRlbXBvcmFyeVdpcmVQb2ludHMoKTtcbiAgICB9XG4gICAgc3RhdGljIG1vdmVQb2ludChwb2ludCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIDA6IC8vIHVwXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueSAtIDFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAxOiAvLyByaWdodFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LnggKyAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgMjogLy8gZG93blxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgKyAxXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgMzogLy8gbGVmdFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LnggLSAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzY2FsZVBvaW50VG9HcmlkKHBvaW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBwb2ludC54ICogdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgIHk6IHBvaW50LnkgKiB0aGlzLmdyaWRTaXplXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNvbnN0cnVjdFBhdGgoY2FtZUZyb20sIGN1cnJlbnROb2RlKSB7XG4gICAgICAgIGxldCB0b3RhbFBhdGggPSBuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnRzKCk7XG4gICAgICAgIHRvdGFsUGF0aC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KGN1cnJlbnROb2RlLnggKiB0aGlzLmdyaWRTaXplLCBjdXJyZW50Tm9kZS55ICogdGhpcy5ncmlkU2l6ZSkpO1xuXG4gICAgICAgIHdoaWxlIChjYW1lRnJvbS5oYXMoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGNhbWVGcm9tLmdldChjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICB0b3RhbFBhdGguYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludChjdXJyZW50Tm9kZS54ICogdGhpcy5ncmlkU2l6ZSwgY3VycmVudE5vZGUueSAqIHRoaXMuZ3JpZFNpemUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b3RhbFBhdGg7XG4gICAgfVxuXG4gICAgc3RhdGljIG1hbmhhdHRhbkRpc3RhbmNlKGEsIGIpIHtcbiAgICAgICAgLy8gTWFuaGF0dGFuIGdlb21ldHJ5XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhhLnggLSBiLngpICsgTWF0aC5hYnMoYS55IC0gYi55KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0SGFzVGhpc1BvaW50KHNldCwgcG9pbnQpIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBzZXQpIHtcbiAgICAgICAgICAgIGlmKGl0ZW0ueCA9PT0gcG9pbnQueCAmJiBpdGVtLnkgPT09IHBvaW50LnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Q29vcmRpbmF0ZXMoY29ubmVjdG9yLCBzbmFwVG9HcmlkID0gdHJ1ZSkge1xuICAgICAgICAvLyBjb25uZWN0b3Iuc3ZnT2JqLmlkIGhhcyB0byBiZSBjYWxsZWQsIGVsc2UgdGhlIGdldENvb3JkaW5hdGVzIGRvZXMgbm90IHdvcmsgb24gdGhlIGZpcnN0IGNhbGwgaW4gRmlyZWZveCA1NVxuICAgICAgICBsZXQgZHVtbXkgPSBjb25uZWN0b3Iuc3ZnT2JqLmlkO1xuXG4gICAgICAgIGxldCAkY29ubmVjdG9yID0gY29ubmVjdG9yLnN2Z09iai4kZWw7XG5cbiAgICAgICAgbGV0IHBvc2l0aW9uID0gJGNvbm5lY3Rvci5wb3NpdGlvbigpO1xuICAgICAgICBsZXQgd2lkdGggPSAkY29ubmVjdG9yLmF0dHIoXCJ3aWR0aFwiKTtcbiAgICAgICAgbGV0IGhlaWdodCA9ICRjb25uZWN0b3IuYXR0cihcImhlaWdodFwiKTtcblxuICAgICAgICBsZXQgeCA9IHBvc2l0aW9uLmxlZnQgKyB3aWR0aCAvIDI7XG4gICAgICAgIGxldCB5ID0gcG9zaXRpb24udG9wICsgaGVpZ2h0IC8gMjtcbiAgICAgICAgaWYoc25hcFRvR3JpZCkge1xuICAgICAgICAgICAgeCA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQoeCk7XG4gICAgICAgICAgICB5ID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBDb250ZXh0TWVudUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUsIGNvbnRleHRNZW51LCBwYXJlbnRTVkcsIGNsaWNrRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudSA9IGNvbnRleHRNZW51O1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcblxuICAgICAgICB0aGlzLiRlbCA9ICQoXCI8bGk+XCIpO1xuICAgICAgICAkKHRoaXMuJGVsKVxuICAgICAgICAgICAgLnRleHQobmFtZSlcbiAgICAgICAgICAgIC5hdHRyKFwidHlwZVwiLCB0eXBlKTtcblxuICAgICAgICBpZihjbGlja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgICAkKHRoaXMuJGVsKS5jbGljayhcbiAgICAgICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRnVuY3Rpb24oZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENsYXNzKGNscykge1xuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhjbHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhcHBlbmRJdGVtKGl0ZW0pIHtcbiAgICAgICAgaWYoIXRoaXMuc3ViTGlzdCkge1xuICAgICAgICAgICAgdGhpcy5zdWJMaXN0ID0gJChcIjx1bD5cIik7XG4gICAgICAgICAgICB0aGlzLiRlbC5hcHBlbmQodGhpcy5zdWJMaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ViTGlzdC5hcHBlbmQoaXRlbS5qUXVlcnkpO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGdldCBqUXVlcnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbDtcbiAgICB9XG59XG5jbGFzcyBHYXRlTWVudUl0ZW0gZXh0ZW5kcyBDb250ZXh0TWVudUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGNvbnRleHRNZW51LCBwYXJlbnRTVkcpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICB0eXBlLCAvLyBuYW1lIGlzIHRoZSB0eXBlXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgY29udGV4dE1lbnUsXG4gICAgICAgICAgICBwYXJlbnRTVkcsXG4gICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGNvbnRleHRNZW51LnBvc2l0aW9uLnggLyBwYXJlbnRTVkcuZ3JpZFNpemUpICogcGFyZW50U1ZHLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IE1hdGgucm91bmQoY29udGV4dE1lbnUucG9zaXRpb24ueSAvIHBhcmVudFNWRy5ncmlkU2l6ZSkgKiBwYXJlbnRTVkcuZ3JpZFNpemVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcGFyZW50U1ZHLm5ld0dhdGUoXG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQsIC8vIHggY29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi50b3AgLy8geSBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHRNZW51IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG5cbiAgICAgICAgY29uc3QgZ2F0ZXMgPSBbXCJub3RcIiwgXCJhbmRcIiwgXCJvclwiLCBcIm5hbmRcIiwgXCJub3JcIiwgXCJ4b3JcIiwgXCJ4bm9yXCJdO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICB4OiAwLCB5OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kZWwgPSAkKFwiPHVsPlwiKTtcbiAgICAgICAgdGhpcy4kZWwuYXR0cignaWQnLCAnY29udGV4dE1lbnUnKTtcblxuICAgICAgICBsZXQgZ2F0ZUxpc3QgPSBuZXcgQ29udGV4dE1lbnVJdGVtKFwiTmV3IGdhdGVcIiwgJycsIHRoaXMsIHBhcmVudFNWRyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IGdhdGVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgZ2F0ZUxpc3QuYXBwZW5kSXRlbShcbiAgICAgICAgICAgICAgICBuZXcgR2F0ZU1lbnVJdGVtKGdhdGVzW2ldLCB0aGlzLCBwYXJlbnRTVkcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwZW5kSXRlbShnYXRlTGlzdCk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgbmV3IENvbnRleHRNZW51SXRlbShcIklucHV0IGJveFwiLCAnJywgdGhpcywgcGFyZW50U1ZHLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLngpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueSlcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRTVkcubmV3SW5wdXQocG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKG5ldyBDb250ZXh0TWVudUl0ZW0oXCJPdXRwdXQgYm94XCIsICcnLCB0aGlzLCBwYXJlbnRTVkcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueCksXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBhcmVudFNWRy5uZXdPdXRwdXQocG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kQ29uZGl0aW9uYWxJdGVtKCdib3gnLCAnUmVtb3ZlIHRoaXMgaXRlbScsIGlkID0+IHt0aGlzLnBhcmVudFNWRy5yZW1vdmVCb3goaWQpfSk7XG4gICAgICAgIHRoaXMuYXBwZW5kQ29uZGl0aW9uYWxJdGVtKCd3aXJlJywgJ1JlbW92ZSB0aGlzIHdpcmUnLCBpZCA9PiB7dGhpcy5wYXJlbnRTVkcucmVtb3ZlV2lyZUJ5SWQoaWQpfSk7XG5cbiAgICAgICAgcGFyZW50U1ZHLiRzdmcuYmVmb3JlKHRoaXMuJGVsKTtcbiAgICB9XG5cbiAgICBhcHBlbmRJdGVtKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGl0ZW0ualF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLy8gYXBwZW5kcyBhbiBjb25uZGl0aW9uYWwgaXRlbSAodGhhdCBpcyBzaG93biBvbmx5IGlmIHRoZSB0YXJnZXRcbiAgICAvLyBoYXMgdGhlIGNsYXNzIGl0ZW1DbGFzcylcbiAgICAvLyBjbGlja0Z1bmN0aW9uIHRha2VzIG9uZSBhcmd1bWVudDogSUQgb2YgdGhlIHRhcmdldFxuICAgIGFwcGVuZENvbmRpdGlvbmFsSXRlbShpdGVtQ2xhc3MsIHRleHQsIGNsaWNrRnVuY3Rpb24pIHtcbiAgICAgICAgaWYoIXRoaXMuY29uZGl0aW9uYWxJdGVtcykge1xuICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXNbdGhpcy5jb25kaXRpb25hbEl0ZW1zLmxlbmd0aF0gPSB7XG4gICAgICAgICAgICBpdGVtQ2xhc3M6IGl0ZW1DbGFzcyxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICBjbGlja0Z1bmN0aW9uOiBjbGlja0Z1bmN0aW9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWNpZGVzIHdoZXRoZXIgb3Igbm90IHRvIGRpc3BsYXkgc3BlY2lmaWMgY29uZGl0aW9uYWwgaXRlbXNcbiAgICByZXNvbHZlQ29uZGl0aW9uYWxJdGVtcygkdGFyZ2V0KSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmRpdGlvbmFsSXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmKCR0YXJnZXQuaGFzQ2xhc3ModGhpcy5jb25kaXRpb25hbEl0ZW1zW2ldLml0ZW1DbGFzcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZEl0ZW0oXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDb250ZXh0TWVudUl0ZW0oXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXNbaV0udGV4dCwgJycsIHRoaXMsIHRoaXMucGFyZW50U1ZHLFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtc1tpXS5jbGlja0Z1bmN0aW9uKCR0YXJnZXQuYXR0cignaWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLmFkZENsYXNzKCdjb25kaXRpb25hbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaGlkZXMgYWxsIGNvbmRpdGlvbmFsIGl0ZW1zXG4gICAgaGlkZUFsbENvbmRpdGlvbmFsSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNoaWxkcmVuKCcuY29uZGl0aW9uYWwnKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvLyBkaXNwbGF5cyB0aGUgY29udGV4dCBtZW51IHdpdGggdGhlIHJpZ2h0IHNldCBvZiBjb25kaXRpb25hbCBpdGVtc1xuICAgIGRpc3BsYXkoeCwgeSwgJHRhcmdldCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRlbC5jc3Moe1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIHRvcDogeSArIFwicHhcIixcbiAgICAgICAgICAgIGxlZnQ6IHggKyBcInB4XCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZXNvbHZlQ29uZGl0aW9uYWxJdGVtcygkdGFyZ2V0KTtcbiAgICB9XG5cbiAgICAvLyBoaWRlcyB0aGUgY29udGV4dCBtZW51XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy4kZWwuY3NzKHtkaXNwbGF5OiAnbm9uZSd9KTtcbiAgICAgICAgdGhpcy5oaWRlQWxsQ29uZGl0aW9uYWxJdGVtcygpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgY2xhc3MgZXhwb3J0TmV0d29yayB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTVkcuZXhwb3J0RGF0YTtcbiAgICB9XG5cbiAgICBqc29uKHN0eWxlID0gZXhwb3J0TmV0d29yay5zdHlsZS5jb21wYWN0LCBkYXRhVXJpID0gZmFsc2UpIHtcbiAgICAgICAgaWYoZGF0YVVyaSkge1xuICAgICAgICAgICAgcmV0dXJuICdkYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCwnXG4gICAgICAgICAgICAgICAgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5qc29uKHN0eWxlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3Q6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmV4cG9ydERhdGEpO1xuICAgICAgICAgICAgICAgIGNhc2UgZXhwb3J0TmV0d29yay5zdHlsZS5wcmV0dHk6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmV4cG9ydERhdGEsIG51bGwsIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZXR0eTogMCxcbiAgICAgICAgICAgIGNvbXBhY3Q6IDFcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBpbXBvcnROZXR3b2sge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgc3RyaW5nKSB7XG4gICAgICAgIHBhcmVudFNWRy5pbXBvcnREYXRhKFxuICAgICAgICAgICAgSlNPTi5wYXJzZShzdHJpbmcpXG4gICAgICAgICk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHtleHBvcnROZXR3b3JrLCBpbXBvcnROZXR3b2t9IGZyb20gXCIuL2ltcG9ydEV4cG9ydC5qc1wiO1xuXG5jbGFzcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzcGVjaWZpY1RhZykge1xuICAgICAgICBpZighc3BlY2lmaWNUYWcpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJChcIjxkaXY+XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKFwiPFwiICsgc3BlY2lmaWNUYWcgKyBcIj5cIilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gY29uc3QgbW91c2VJY29uID1cbi8vICAgICBcIjxzdmcgY2xhc3M9XFxcIm1vdXNlSWNvblxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiBoZWlnaHQ9XFxcIjEyMS43NzEzMW1tXFxcIiB3aWR0aD1cXFwiODIuMzI3NTgzbW1cXFwiIHZlcnNpb249XFxcIjEuMVxcXCIgdmlld0JveD1cXFwiMCAwIDI5MS43MTE5MSA0MzEuNDczMTRcXFwiPlwiICtcbi8vICAgICBcIjxnIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKC0yMDIuNzA5MDgsLTI2MC45MjMyKVxcXCI+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggZD1cXFwibTIwMi44MTEwOCA0NDMuNTA2NjdjLTAuMTI1NyAxMS4wNTY4MyAwLjA2NTEgMTIuMTI5MTUgMC4wNTI4IDIzLjA5Mzc1IDEuMDQwNCAzOS4yOTE2NS00LjAzMjgxIDc5LjU4NDIgOC44MTQ0MSAxMTcuNTY4MzYgMTcuNTI2MDIgNTguMDA3NDIgNzAuNzYxMiAxMDcuMDc3OTMgMTMzLjEyOTA3IDEwOC4xMTcxOSA2MC44MDQ0OCAyLjYxMjQ3IDExNS44MDYzOC00MS40ODkxMiAxMzYuNjUyNDktOTYuOTM1NTUgMTUuMjE5NDItMzQuNzA1NjEgMTIuNzQ0Ny03Mi44MjYzOCAxMi44MzQtMTA5LjcyMjY2LTAuNDAzNTYtMTcuMjQ5MDUgMC4yNzQ1Mi0yNC43MzI5IDAuMDg3OS00Mi4xMjEwOWgtMjkxLjU3MDY2elxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJsZWZ0XFxcIiBkPVxcXCJtMzM1LjY3Nzg4IDI2MC45MzAzMmMtNTguNjUyNSAwLjY1NTY2LTk5LjYzMTkgNDMuNTEzODYtMTIwLjA4MjEgOTYuOTkyMTktMTAuNTUwNSAyNC4wNjAxMi0xMi41OTM1IDQxLjc3Nzk3LTEyLjg4NjcgNjcuNTgyMDNoMTM1Ljc4MzJ2LTE2NC41NzIyNmMtMC4wMDYgMC4wMDAwOC0wLjAxMTctMC4wMDAwOC0wLjAxNzYgMC0wLjkzNDctMC4wMTEtMS44NjU4LTAuMDEyNC0yLjc5NjgtMC4wMDJ6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcInJpZ2h0XFxcIiBkPVxcXCJtMzYxLjQ2Nzg3IDI2MC45Mjk5M2MtMC45NDIwNy0wLjAxLTEuODg2NC0wLjAwOS0yLjgzMjAzIDAuMDA0djE2NC41NzIyNmgxMzUuNzg1MTZjLTAuMjYyNTctMjQuNDY5NDgtMi4yNTIxLTQwLjc0ODIzLTExLjUwMzkxLTYzLjkwMjQzLTE5LjM0NzA5LTU1LjAzMjI1LTYxLjczMDQzLTEwMC4wNDUyNS0xMjEuNDQ5MjItMTAwLjY3MzgzelxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJtaWRkbGVcXFwiIGQ9XFxcIm0zNDguNTY1MDQgMjk0LjkzMzY1YzE1LjAzNzE0IDAgMjcuMTQyODYgMTIuMTA1NzIgMjcuMTQyODYgMjcuMTQyODZ2NDBjMCAxNS4wMzcxNC0xMi4xMDU3MiAyNy4xNDI4Ni0yNy4xNDI4NiAyNy4xNDI4NnMtMjcuMTQyODYtMTIuMTA1NzItMjcuMTQyODYtMjcuMTQyODZ2LTQwYzAtMTUuMDM3MTQgMTIuMTA1NzItMjcuMTQyODYgMjcuMTQyODYtMjcuMTQyODZ6XFxcIiBzdHJva2U9XFxcIiNmZmZcXFwiIHN0cm9rZS1saW5lY2FwPVxcXCJyb3VuZFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIyMFxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgPC9nPlwiICtcbi8vICAgICBcIjwvc3ZnPlwiO1xuXG5jbGFzcyBoZWxwV2luZG93SXRlbSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhcImhlbHBXaW5kb3dJdGVtXCIpO1xuICAgICAgICB0aGlzLiRlbC5odG1sKHRleHQpO1xuICAgIH1cbn1cblxuY2xhc3MgaGVscFdpbmRvdyBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuJGVsLmF0dHIoXCJpZFwiLCBcImhlbHBcIik7XG5cbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiPHN0cm9uZz5tYWluIG1lbnU8L3N0cm9uZz46IHJpZ2h0IGNsaWNrXCIpKTtcbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiZHJhZyBhbmQgZHJvcCB0byA8c3Ryb25nPm1vdmUgZWxlbWVudHM8L3N0cm9uZz5cIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPm1pZGRsZSBjbGljazwvc3Ryb25nPiB0byByb3RhdGUgZWxlbWVudHNcIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPmNsaWNrIDxpbWcgc3JjPSdpbWcvZ3VpL2hlbHAuc3ZnJyBjbGFzcz0naGVscGljb24nIGFsdD0naGVscCBpY29uJz48L3N0cm9uZz4gdG8gZGlzcGxheSBkb2N1bWVudGF0aW9uIChpbiBjemVjaClcIikpO1xuICAgIH1cblxuICAgIGFwcGVuZChpdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChpdGVtLiRlbCk7XG4gICAgfVxufVxuXG5cbmNsYXNzIGZsb2F0aW5nTWVudUl0ZW0gZXh0ZW5kcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzcGVjaWZpY0NsYXNzLCBpY29uLCB0aXRsZSwgc3BlY2lmaWNUYWcpIHtcbiAgICAgICAgc3VwZXIoc3BlY2lmaWNUYWcpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKFwiYnV0dG9uXCIpO1xuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhzcGVjaWZpY0NsYXNzKTtcblxuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoXG4gICAgICAgICAgICAkKFwiPGltZz5cIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInNyY1wiLCBcImltZy9ndWkvXCIgKyBpY29uICsgXCIuc3ZnXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJhbHRcIiwgdGl0bGUpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ0aXRsZVwiLCB0aXRsZSlcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZsb2F0aW5nTWVudSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gJ2Zsb2F0aW5nTWVudSc7XG5cbiAgICAgICAgdGhpcy4kZWwuYXR0cihcImlkXCIsIGlkKTtcblxuICAgICAgICAvKiBJTVBPUlQgKi9cblxuICAgICAgICAvLyBoZXJlIHdpbGwgYmUgdGhlIGluc3RhbmNlIG9mIExpdHkgc3RvcmVkXG4gICAgICAgIC8vICh3ZSBuZWVkIHRvIHN0b3JlIGl0LCBiZWNhdXNlIHRoZSBcImltcG9ydFwiIGJ1dHRvbiBhbHNvIGNsb3NlcyBMaXR5KVxuICAgICAgICBsZXQgbGl0eUluc3RhbmNlSW1wb3J0O1xuXG4gICAgICAgIGxldCBpbXBvcnRCdXR0b24gPSBuZXcgZmxvYXRpbmdNZW51SXRlbShcImltcG9ydFwiLCBcImltcG9ydFwiLCBcIkltcG9ydCBhIG5ldHdvcmtcIiwgXCJhXCIpO1xuICAgICAgICBpbXBvcnRCdXR0b24uJGVsLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0ICRwb3B1cCA9ICQoXCI8ZGl2PlwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImltcG9ydEV4cG9ydFwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImltcG9ydFwiKTtcblxuICAgICAgICAgICAgbGV0IHRleHRhcmVhSWQgPSBcImltcG9ydEpTT05cIjtcblxuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPHRleHRhcmVhPjwvdGV4dGFyZWE+XCIpLmF0dHIoJ2lkJywgdGV4dGFyZWFJZClcbiAgICAgICAgICAgICkuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8YT5cIilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc1wiOiBcInVwbG9hZFwiXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiPGltZz5cIikuYXR0cignc3JjJywgXCJpbWcvZ3VpL2ltcG9ydC5zdmdcIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFwiIGltcG9ydCBmcm9tIEpTT05cIilcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdGV4dGFyZWEgPSAkKCcjJyt0ZXh0YXJlYUlkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRleHRhcmVhIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1wb3J0U3RyaW5nID0gJHRleHRhcmVhLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBMaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXR5SW5zdGFuY2VJbXBvcnQuY2xvc2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvY2Nlc3MgdGhlIGltcG9ydGVkIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBpbXBvcnROZXR3b2socGFyZW50U1ZHLCBpbXBvcnRTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGl0eUluc3RhbmNlSW1wb3J0ID0gbGl0eSgkcG9wdXApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFwcGVuZChpbXBvcnRCdXR0b24pO1xuXG4gICAgICAgIC8qIEVYUE9SVCAqL1xuXG4gICAgICAgIGxldCBleHBvcnRCdXR0b24gPSBuZXcgZmxvYXRpbmdNZW51SXRlbShcImV4cG9ydFwiLCBcImV4cG9ydFwiLCBcIkV4cG9ydCB0aGlzIG5ldHdvcmtcIiwgXCJhXCIpO1xuICAgICAgICBleHBvcnRCdXR0b24uJGVsLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXcgZXhwb3J0TmV0d29yayhwYXJlbnRTVkcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIHBvcHVwIGNvbnRhaW5lciBob2xkaW5nIGFsbCBwb3B1cCBjb250ZW50ICh0aGF0IHdpbGwgYmUgcGFzc2VkIHRvIGxpdHkpXG4gICAgICAgICAgICBsZXQgJHBvcHVwID0gJChcIjxkaXY+XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0RXhwb3J0XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiZXhwb3J0XCIpO1xuXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgYmxvY2sgd2l0aCBjb2RlIHRvIGJlIGRpc3BsYXllZCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBwb3B1cCBlbGVtZW50XG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8cHJlPlwiKS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoXCI8Y29kZT5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgbGlua3NcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eSwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogXCJkb3dubG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwibmV0d29yay5qc29uXCJcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvZXhwb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICkuYXBwZW5kKFwiIGV4cGFuZGVkIEpTT05cIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8YT5cIikuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBkYXRhLmpzb24oZXhwb3J0TmV0d29yay5zdHlsZS5jb21wYWN0LCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgXCJjbGFzc1wiOiBcImRvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJuZXR3b3JrLm1pbi5qc29uXCJcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvZXhwb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICkuYXBwZW5kKFwiIGNvbXBhY3QgSlNPTlwiKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGl0eSgkcG9wdXApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFwcGVuZChleHBvcnRCdXR0b24pO1xuXG4gICAgICAgIC8qIEhFTFAgKi9cblxuICAgICAgICBsZXQgaGVscCA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiaGVscFwiLCBcImhlbHBcIiwgXCJEaXNwbGF5IGhlbHBcIiwgXCJhXCIpO1xuICAgICAgICBoZWxwLiRlbC5vbihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICAkKFwiI2hlbHBcIikuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpO1xuICAgICAgICB9KS5vbihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgICAgICQoXCIjaGVscFwiKS5yZW1vdmVDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhlbHAuJGVsLmF0dHIoe1xuICAgICAgICAgICAgJ2hyZWYnOiAnLi9kb2NzLycsXG4gICAgICAgICAgICAnZGF0YS1saXR5JzogJydcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKGhlbHApO1xuXG4gICAgICAgIHBhcmVudFNWRy4kc3ZnLmFmdGVyKHRoaXMuJGVsKTtcbiAgICAgICAgcGFyZW50U1ZHLiRzdmcuYWZ0ZXIobmV3IGhlbHBXaW5kb3coKS4kZWwpO1xuICAgIH1cblxuICAgIGFwcGVuZChtZW51SXRlbSkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQobWVudUl0ZW0uJGVsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYy5qcydcblxuY2xhc3Mgc3RhdGVDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3RvcklkLCBzdGF0ZSwgd2hvQ2F1c2VkSXQpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JJZCA9IGNvbm5lY3RvcklkXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZVxuICAgICAgICB0aGlzLndob0NhdXNlZEl0ID0gd2hvQ2F1c2VkSXRcbiAgICB9XG59XG5cbi8vIGFsbCBjb25uZWN0b3JzIG1lbnRpb25lZCBoZXJlIGFyZSBPVVRQVVQgQ09OTkVDVE9SU1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdGlvbiB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHXG5cbiAgICAgICAgLy8gbWFwcyBlYWNoIGFmZmVjdGVkIG91dHB1dCBjb25uZWN0b3IgdG8gaXQncyBkaXJlY3RseSBwcmVjZWVkaW5nIG91dHB1dCBjb25uZWN0b3JzXG4gICAgICAgIHRoaXMucHJlZGVjZXNzb3JzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8vIG1hcHMgd2F2ZUlkIC0+IGFycmF5IG9mIG91dHB1dENvbm5lY3RvcnMgYWZmZWN0ZWRcbiAgICAgICAgdGhpcy53YXZlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy53YXZlID0gMFxuXG4gICAgICAgIHRoaXMuY3ljbGVkQ29ubmVjdG9ycyA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLnJlc29sdmVkQ3ljbGVkQ29ubmVjdG9ycyA9IG5ldyBTZXQoKVxuXG4gICAgfVxuXG4gICAgcnVuKCkge1xuICAgICAgICB0aGlzLndhdmUrKztcbiAgICAgICAgd2hpbGUodGhpcy53YXZlcy5oYXModGhpcy53YXZlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGVwKClcbiAgICAgICAgICAgIHRoaXMud2F2ZXMuZGVsZXRlKHRoaXMud2F2ZSkgLy8gY2xlYW4gb2xkIHdhdmVzIG9uIHRoZSBnb1xuICAgICAgICAgICAgdGhpcy53YXZlKytcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0ZXAoKSB7XG4gICAgICAgIGZvciAobGV0IHtjb25uZWN0b3JJZCwgc3RhdGUsIHdob0NhdXNlZEl0fSBvZiB0aGlzLndhdmVzLmdldCh0aGlzLndhdmUpKSB7XG4gICAgICAgICAgICAvLyBza2lwIHJlc29sdmVkIGN5Y2xlc1xuICAgICAgICAgICAgaWYodGhpcy5yZXNvbHZlZEN5Y2xlZENvbm5lY3RvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNraXAgY29ubmVjdG9yIHRoYXQgYXJlIGN5Y2xlc1xuICAgICAgICAgICAgaWYgKHRoaXMuY3ljbGVkQ29ubmVjdG9ycy5oYXMoY29ubmVjdG9ySWQpKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBzZXQgb2Ygc3RhdGVzIHRoYXQgdGhpcyBjb25uZWN0b3IgYXBwZWFyZWQgZnJvbSB0aGUgbW9tZW50IHRoZSBzaWduYWwgZmlyc3QgY3ljbGVkXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlcyA9IHRoaXMuY3ljbGVkQ29ubmVjdG9ycy5nZXQoY29ubmVjdG9ySWQpXG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgY29ubmVjdG9yIGFscmVhZHkgaGFkIHRoaXMgc3RhdGUgaW4gdGhpcyBjeWNsZSwgcmVzb2x2ZSB0aGUgY3ljbGVcbiAgICAgICAgICAgICAgICBpZihzdGF0ZXMuaGFzKHN0YXRlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBtb3JlIHN0YXRlcyBpbiB0aGUgc2V0LCB0aGUgY29ubmVjdG9yIGlzIG9zY2lsbGF0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIChlbHNlIGl0IGtlZXBzIGl0cyBzdGF0ZSBhbmQgd2UganVzdCBicmVhayB0aGUgY3ljbGUpXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0YXRlcy5zaXplID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWFyayB0aGlzIGNvbm5lY3RvciBhcyByZXNvbHZlZFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVkQ3ljbGVkQ29ubmVjdG9ycy5hZGQoY29ubmVjdG9ySWQpXG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgbmV3LCB1bnNlZW4gc3RhdGUsIGFkZCBpdCB0byB0aGUgc2V0IGFuZCBjb250aW51ZSBzaW11bGF0aW5nIHRoZSBjeWNsZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5hZGQoc3RhdGUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbWFwIHRoZSBtb2RpZmllZCBzZXQgb2Ygc3RhdGVzIHRvIHRoZSBjb25uZWN0b3JcbiAgICAgICAgICAgICAgICB0aGlzLmN5Y2xlZENvbm5lY3RvcnMuc2V0KGNvbm5lY3RvcklkLCBzdGF0ZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMud2hvQ2F1c2VkSXQgPSBjb25uZWN0b3JJZFxuICAgICAgICAgICAgLyogIHByb2Nlc3MgYWxsIG91dHB1dENvbm5lY3RvcnMgYnkgc2V0dGluZyB0aGVpciBzdGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMgd2lsbCB0cmlnZ2VyIGEgZm9sbG93aW5nIGV2ZW50IGNoYWluOlxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRDb25uZWN0b3IgY2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAtPiBhbGwgY29ubmVjdGVkIHdpcmVzIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAtPiBhbGwgaW5wdXRDb25uZWN0b3JzIGNvbm5lY3RlZCB0byB0aGVzZSB3aXJlcyBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgLT4gYWxsIGVsZW1lbnRzIHRoYXQgY29udGFpbiB0aGVzZSBpbnB1dENvbm5lY3RvcnMgY2hhbmdlXG4gICAgICAgICAgICAgICAgICAgIC0+IHRoZXNlIGVsZW1lbnRzIGNvbXB1dGUgdGhlIG5ldyBzdGF0ZSBvZiB0aGVpciBvdXRwdXQgY29ubmVjdG9ycyBhbmQgY2FsbCBub3RpZnlDaGFuZ2UoKVxuICAgICAgICAgICAgKi9cblxuXG4gICAgICAgICAgICBpZih3aG9DYXVzZWRJdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUHJlZGVjZXNzb3IoY29ubmVjdG9ySWQsIHdob0NhdXNlZEl0KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY3ljbGVkQ29ubmVjdG9ycy5oYXMoY29ubmVjdG9ySWQpICYmIHRoaXMuZ2V0QWxsUHJlZGVjZXNzb3JzKGNvbm5lY3RvcklkKS5oYXMoY29ubmVjdG9ySWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jeWNsZWRDb25uZWN0b3JzLnNldChjb25uZWN0b3JJZCwgbmV3IFNldChbc3RhdGVdKSlcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLyByZWZsZWN0IHRoZSBjaGFuZ2VzIGluIFNWR1xuICAgICAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMucGFyZW50U1ZHLmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpXG4gICAgICAgICAgICBpZihjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aG9DYXVzZWRJdCA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIC8vIG1hcmsgYSBwcmVkZWNlc3NvckNvbm5lY3RvcklkIGFzIGEgcHJlZGVjZXNzb3Igb2YgY29ubmVjdG9ySWRcbiAgICBhZGRQcmVkZWNlc3Nvcihjb25uZWN0b3JJZCwgcHJlZGVjZXNzb3JDb25uZWN0b3JJZCkge1xuICAgICAgICBpZighdGhpcy5wcmVkZWNlc3NvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuc2V0KGNvbm5lY3RvcklkLCBuZXcgU2V0KCkpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZWRlY2Vzc29ycy5nZXQoY29ubmVjdG9ySWQpLmFkZChwcmVkZWNlc3NvckNvbm5lY3RvcklkKVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgc2V0IG9mIGFsbCBvdXRwdXQgY29ubmVjdG9ycywgdGhhdCBhcmUgYmVmb3JlIHRoaXMgb3V0cHV0IGNvbm5lY3RvclxuICAgIGdldEFsbFByZWRlY2Vzc29ycyhjb25uZWN0b3JJZCkge1xuICAgICAgICBpZighdGhpcy5wcmVkZWNlc3NvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuc2V0KGNvbm5lY3RvcklkLCBuZXcgU2V0KCkpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWxsID0gbmV3IFNldCgpXG5cbiAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuZ2V0KGNvbm5lY3RvcklkKS5mb3JFYWNoKGFsbC5hZGQsIGFsbCk7XG5cbiAgICAgICAgbGV0IHByZXZTaXplID0gMFxuICAgICAgICBsZXQgc2l6ZSA9IGFsbC5zaXplXG4gICAgICAgIHdoaWxlKHByZXZTaXplIDwgc2l6ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29ubmVjdG9yIG9mIGFsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZWRlY2Vzc29ycy5oYXMoY29ubmVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWRlY2Vzc29ycy5nZXQoY29ubmVjdG9yKS5mb3JFYWNoKGFsbC5hZGQsIGFsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldlNpemUgPSBzaXplXG4gICAgICAgICAgICBzaXplID0gYWxsLnNpemVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbGxcbiAgICB9XG5cbiAgICBub3RpZnlDaGFuZ2UoY29ubmVjdG9ySWQsIHN0YXRlKSB7XG4gICAgICAgIGxldCB3YXZlSWQgPSB0aGlzLndhdmUgKyAxXG5cbiAgICAgICAgaWYoIXRoaXMud2F2ZXMuaGFzKHdhdmVJZCkpIHtcbiAgICAgICAgICAgIHRoaXMud2F2ZXMuc2V0KHdhdmVJZCwgW10pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndhdmVzLmdldCh3YXZlSWQpLnB1c2gobmV3IHN0YXRlQ2hhbmdlKGNvbm5lY3RvcklkLCBzdGF0ZSwgdGhpcy53aG9DYXVzZWRJdCkpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgKiBhcyBzdmdPYmogZnJvbSAnLi9zdmdPYmplY3RzLmpzJ1xuaW1wb3J0ICogYXMgZWRpdG9yRWxlbWVudHMgZnJvbSAnLi9lZGl0b3JFbGVtZW50cy5qcydcbmltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuaW1wb3J0IENvbnRleHRNZW51IGZyb20gJy4vY29udGV4dE1lbnUuanMnXG5pbXBvcnQgRmxvYXRpbmdNZW51IGZyb20gJy4vZmxvYXRpbmdNZW51LmpzJ1xuaW1wb3J0IFNpbXVsYXRpb24gZnJvbSAnLi9zaW11bGF0aW9uLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdmcge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JpZFNpemUpIHtcbiAgICAgICAgdGhpcy4kc3ZnID0gJChjYW52YXMpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmJveGVzID0gW107IC8vIHN0b3JlcyBhbGwgYm94ZXNcbiAgICAgICAgdGhpcy53aXJlcyA9IFtdOyAvLyBzdG9yZXMgYWxsIHdpcmVzXG5cbiAgICAgICAgdGhpcy5zaW11bGF0aW9uRW5hYmxlZCA9IHRydWVcbiAgICAgICAgdGhpcy5zaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24odGhpcyk7IC8vIGR1bW15LCB3aWxsIGJlIG92ZXJ3cml0dGVuIG9uIHN0YXJ0TmV3U2ltdWxhdGlvblxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGVmcyBlbGVtZW50LCB1c2VkIGZvciBwYXR0ZXJuc1xuICAgICAgICB0aGlzLiRkZWZzID0gJChcIjxkZWZzPlwiKTtcbiAgICAgICAgdGhpcy4kc3ZnLnByZXBlbmQodGhpcy4kZGVmcyk7XG5cbiAgICAgICAgLy8gQkFDS0dST1VORCBQQVRURVJOXG4gICAgICAgIGxldCBwYXR0ZXJuID0gbmV3IHN2Z09iai5QYXR0ZXJuKFwiZ3JpZFwiLCB0aGlzLmdyaWRTaXplLCB0aGlzLmdyaWRTaXplKTtcblxuICAgICAgICBsZXQgcGF0dGVyblBvaW50cyA9IG5ldyBzdmdPYmouUG9seWxpbmVQb2ludHMoKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoMCwgMCkpXG4gICAgICAgICAgICAuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLmdyaWRTaXplLCAwKSlcbiAgICAgICAgICAgIC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMuZ3JpZFNpemUsIHRoaXMuZ3JpZFNpemUpKTtcblxuICAgICAgICBwYXR0ZXJuLmFkZENoaWxkKG5ldyBzdmdPYmouUG9seUxpbmUocGF0dGVyblBvaW50cywgXCIjYTNhNGQyXCIsIDIpKTtcbiAgICAgICAgdGhpcy5hZGRQYXR0ZXJuKHBhdHRlcm4uZ2V0KCkpO1xuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBzdmdPYmouUmVjdGFuZ2xlKDAsIDAsIFwiMTAwJVwiLCBcIjEwMCVcIiwgXCJ1cmwoI2dyaWQpXCIsIFwibm9uZVwiKTtcbiAgICAgICAgdGhpcy5hcHBlbmRKUXVlcnlPYmplY3QodGhpcy5iYWNrZ3JvdW5kLmdldCgpKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgLy8gQ09OU1RSVUNUIENPTlRFWFQgTUVOVVxuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gbmV3IENvbnRleHRNZW51KHRoaXMpO1xuXG4gICAgICAgIC8vIENPTlNUUlVDVCBGTE9BVElORyBNRU5VXG4gICAgICAgIC8vIHRoaXMuZmxvYXRpbmdNZW51ID0gbmV3IEZsb2F0aW5nTWVudSh0aGlzKTtcbiAgICAgICAgdGhpcy5mbG9hdGluZ01lbnUgPSBuZXcgRmxvYXRpbmdNZW51KHRoaXMpO1xuXG4gICAgICAgIC8vIEFMTCBFVkVOVCBDQUxMQkFDS1NcbiAgICAgICAgbGV0IHRhcmdldDtcbiAgICAgICAgdGhpcy4kc3ZnLm9uKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0aGlzLmdldFJlYWxUYXJnZXQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIGlmKHRhcmdldCE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vdXNlRG93bihldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KS5vbignbW91c2Vtb3ZlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VNb3ZlKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSkub24oJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmKHRhcmdldCE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vdXNlVXAoZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KS5vbihcImNvbnRleHRtZW51XCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvbnRleHRNZW51KGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSwgdGhpcy5nZXRSZWFsSlF1ZXJ5VGFyZ2V0KGV2ZW50LnRhcmdldCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHRoaXMuZXhwb3J0V2lyZUlkTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmV4cG9ydFdpcmVJZCA9IDA7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAvLyB0b2RvIGltcGxlbWVudCBncmlkU2l6ZSBzY2FsaW5nXG4gICAgICAgICAgICAvLyBncmlkU2l6ZTogdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgIGJveGVzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBkYXRhLmJveGVzW2ldID0gdGhpcy5ib3hlc1tpXS5leHBvcnREYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaW1wb3J0RGF0YShkYXRhKSB7XG4gICAgICAgIHRoaXMuc2ltdWxhdGlvbkVuYWJsZWQgPSBmYWxzZVxuXG4gICAgICAgIC8vIHRvZG8gaW1wbGVtZW50IGdyaWRTaXplIHNjYWxpbmdcblxuICAgICAgICAvLyBsaXN0IG9mIHdpcmVzIHRvIGJlIGFkZGVkXG4gICAgICAgIGxldCBuZXdXaXJlcyA9IG5ldyBNYXAoKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGRhdGEuYm94ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGFkZCBib3hcbiAgICAgICAgICAgIGxldCBib3g7XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0uY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2F0ZVwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IGdhdGUgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgYm94ID0gdGhpcy5uZXdHYXRlKGRhdGEuYm94ZXNbaV0ubmFtZSwgMCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW9cIjpcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmJveGVzW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbnB1dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgaW5wdXQgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld0lucHV0KDAsIDAsIGRhdGEuYm94ZXNbaV0uaXNPbiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm91dHB1dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgb3V0cHV0ICh3aXRob3V0IHJlbG9hZGluZyB0aGUgU1ZHLCB3ZSB3aWxsIHJlbG9hZCBpdCBvbmNlIGFmdGVyIHRoZSBpbXBvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94ID0gdGhpcy5uZXdPdXRwdXQoMCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBpbyBib3ggbmFtZSAnXCIrZGF0YS5ib3hlc1tpXS5uYW1lK1wiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gYm94IGNhdGVnb3J5ICdcIitkYXRhLmJveGVzW2ldLmNhdGVnb3J5K1wiJy5cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChib3gpIHtcbiAgICAgICAgICAgICAgICAvLyBwcm9jY2VzcyBib3ggdHJhbnNmb3JtcyAodHJhbnNsYXRpb24gYW5kIHJvdGF0aW9uKVxuICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgZWRpdG9yRWxlbWVudHMuVHJhbnNmb3JtKCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMCA7IGogPCBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtcy5sZW5ndGggOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidHJhbnNsYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1sxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicm90YXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnNldFJvdGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1sxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1syXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIHRyYW5zZm9ybSBwcm9wZXJ0eSAnXCIrZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0ubmFtZStcIicuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYm94LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGFsbCB3aXJlcyB0byB0aGUgbGlzdCBvZiB3aXJlcyB0byBiZSBhZGRlZFxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDAgOyBqIDwgZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9ucy5sZW5ndGggOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBhcnRpZmljaWFsIHdpcmUgaWRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpcmVJZCA9IGRhdGEuYm94ZXNbaV0uY29ubmVjdGlvbnNbal0ud2lyZUlkO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhc3MgdGhlIHZhbHVlcyBnb3QgZnJvbSBqc29uIGludG8gYSB2YXJpYWJsZSB0aGF0IHdpbGwgYmUgYWRkZWQgaW50byB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zW2pdLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9uc1tqXS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm94SWQ6IGJveC5pZFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgdmFsdWUgdG8gdGhlIG1hcFxuICAgICAgICAgICAgICAgICAgICBpZihuZXdXaXJlcy5oYXMod2lyZUlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgYWxyZWFkeSBpcyBhIHdpcmUgd2l0aCB0aGlzIGlkIGluIHRoZSBtYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHZhbHVlIHRvIHRoZSBlbmQgb2YgdGhlIGFycmF5IG9mIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1hcFZhbHVlID0gbmV3V2lyZXMuZ2V0KHdpcmVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBWYWx1ZS5sZW5ndGhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdXaXJlcy5zZXQod2lyZUlkLCBtYXBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyB3aXJlIHdpdGggdGhpcyBpZCBpbiB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHdpcmUgYW5kIHNldCB0aGUgdmFsdWUgdG8gYmUgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdXaXJlcy5zZXQod2lyZUlkLCBbdmFsdWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlZnJlc2ggdGhlIFNWRyBkb2N1bWVudCAobmVlZGVkIGZvciB3aXJpbmcpXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgICAgIC8vIHdpdGggYWxsIGJveGVzIGFkZGVkLCB3ZSBjYW4gbm93IGNvbm5lY3QgdGhlbSB3aXRoIHdpcmVzXG4gICAgICAgIG5ld1dpcmVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBsZXQgY29ubmVjdG9ySWRzID0gW107XG4gICAgICAgICAgICBpZihpdGVtWzBdICYmIGl0ZW1bMV0pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgb2YgWzAsIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBib3ggPSB0aGlzLmdldEJveEJ5SWQoaXRlbVtpXS5ib3hJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdG9ySWRzW2ldID0gYm94LmNvbm5lY3RvcnNbaXRlbVtpXS5pbmRleF0uaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5uZXdXaXJlKGNvbm5lY3Rvcklkc1swXSwgY29ubmVjdG9ySWRzWzFdLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgU1ZHIGRvY3VtZW50XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgICAgIHRoaXMuc2ltdWxhdGlvbkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBib3ggb2YgdGhpcy5ib3hlcykge1xuICAgICAgICAgICAgaWYgKGJveCBpbnN0YW5jZW9mIGVkaXRvckVsZW1lbnRzLklucHV0Qm94KSB7XG4gICAgICAgICAgICAgICAgLy8gc3dpdGNoIHRoZSBpbnB1dCBib3ggc3RhdGUgdG8gdGhlIG9wb3NpdCBhbmQgYmFjaywgZm9yIHNvbWUgcmVhc29uIGNhbGxpbmcgYm94LnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0cyBpbiB3ZWlyZCB1bmZpbmlzaGVkIHNpbXVsYXRpb25cbiAgICAgICAgICAgICAgICAvLyB0aGlzIGNhdXNlcyB1cGRhdGUgb2YgdGhlIG91dHB1dCBjb25uZWN0b3IgYW5kIGEgc3RhcnQgb2YgYSBuZXcgc2ltdWxhdGlvblxuXG4gICAgICAgICAgICAgICAgLy8gdG9kbyBmaW5kIGJldHRlciBzb2x1dGlvbiBpbnN0ZWFkIG9mIHRoaXMgd29ya2Fyb3VuZFxuICAgICAgICAgICAgICAgIGJveC5vbiA9ICFib3gub25cbiAgICAgICAgICAgICAgICBib3gub24gPSAhYm94Lm9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aXJlQ3JlYXRpb25IZWxwZXIoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgaWYoIXRoaXMuZmlyc3RDb25uZWN0b3JJZCkge1xuICAgICAgICAgICAgdGhpcy5maXJzdENvbm5lY3RvcklkID0gY29ubmVjdG9ySWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5ld1dpcmUodGhpcy5maXJzdENvbm5lY3RvcklkLCBjb25uZWN0b3JJZCk7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29ubmVjdG9ySWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydE5ld1NpbXVsYXRpb24oc3RhcnRpbmdDb25uZWN0b3IsIHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuc2ltdWxhdGlvbkVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2ltdWxhdGlvbiA9IG5ldyBTaW11bGF0aW9uKHRoaXMpXG4gICAgICAgICAgICB0aGlzLnNpbXVsYXRpb24ubm90aWZ5Q2hhbmdlKHN0YXJ0aW5nQ29ubmVjdG9yLmlkLCBzdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuc2ltdWxhdGlvbi5ydW4oKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3R2F0ZShuYW1lLCB4LCB5LCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLkdhdGUodGhpcywgbmFtZSwgeCwgeSksIHJlZnJlc2gpO1xuICAgIH1cblxuICAgIG5ld0lucHV0KHgsIHksIGlzT24gPSBmYWxzZSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3Qm94KHgsIHksIG5ldyBlZGl0b3JFbGVtZW50cy5JbnB1dEJveCh0aGlzLCBpc09uKSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgbmV3T3V0cHV0KHgsIHksIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0JveCh4LCB5LCBuZXcgZWRpdG9yRWxlbWVudHMuT3V0cHV0Qm94KHRoaXMpLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBuZXdCb3goeCwgeSwgb2JqZWN0LCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmJveGVzLmxlbmd0aDtcblxuICAgICAgICB0aGlzLmJveGVzW2luZGV4XSA9IG9iamVjdDtcblxuICAgICAgICAvLyB0cmFuc2xhdGUgdGhlIGdhdGUgaWYgeCBhbmQgeSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICAgICAgaWYoeCAmJiB5KSB7XG4gICAgICAgICAgICBsZXQgdHIgPSBuZXcgZWRpdG9yRWxlbWVudHMuVHJhbnNmb3JtKCk7XG4gICAgICAgICAgICB0ci5zZXRUcmFuc2xhdGUoeCwgeSk7XG5cbiAgICAgICAgICAgIHRoaXMuYm94ZXNbaW5kZXhdLnN2Z09iai5hZGRBdHRyKHtcInRyYW5zZm9ybVwiOiB0ci5nZXQoKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBlbmRFbGVtZW50KHRoaXMuYm94ZXNbaW5kZXhdLCByZWZyZXNoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpbmRleF07XG4gICAgfVxuXG4gICAgcmVtb3ZlQm94KGdhdGVJZCkge1xuICAgICAgICBsZXQgJGdhdGUgPSAkKFwiI1wiK2dhdGVJZCk7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgZ2F0ZSBpbiBzdmcncyBsaXN0IG9mIGdhdGVzXG4gICAgICAgIGxldCBnYXRlSW5kZXggPSAtMTtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5ib3hlc1tpXS5zdmdPYmouaWQ9PT1nYXRlSWQpIHtcbiAgICAgICAgICAgICAgICBnYXRlSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoZ2F0ZUluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgd2lyZXMgY29ubmVjdGVkIHRvIHRoaXMgZ2F0ZVxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYm94ZXNbZ2F0ZUluZGV4XS5jb25uZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVXaXJlc0J5Q29ubmVjdG9ySWQodGhpcy5ib3hlc1tnYXRlSW5kZXhdLmNvbm5lY3RvcnNbaV0uc3ZnT2JqLmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBnYXRlXG4gICAgICAgICAgICB0aGlzLmJveGVzLnNwbGljZShnYXRlSW5kZXgsIDEpO1xuICAgICAgICAgICAgJGdhdGUucmVtb3ZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVHJ5aW5nIHRvIHJlbW92ZSBhbiBub25leGlzdGluZyBnYXRlLiAoR2F0ZSBpZDogXCIrZ2F0ZUlkK1wiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5ld1dpcmUoZnJvbUlkLCB0b0lkLCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICAvLyB3aXJlIG11c3QgY29ubmVjdCB0d28gZGlzdGluY3QgZWxlbWVudHNcbiAgICAgICAgaWYgKGZyb21JZD09PXRvSWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICBsZXQgY29ubmVjdG9ycyA9IFt0aGlzLmdldENvbm5lY3RvckJ5SWQoZnJvbUlkKSwgdGhpcy5nZXRDb25uZWN0b3JCeUlkKHRvSWQpXVxuXG4gICAgICAgIC8vIGlucHV0IGNvbm5lY3RvcnMgY2FuIGJlIGNvbm5lY3RlZCB0byBvbmUgd2lyZSBtYXhcbiAgICAgICAgY29ubmVjdG9ycy5mb3JFYWNoKGNvbm4gPT4ge1xuICAgICAgICAgICAgaWYoY29ubi5pc0lucHV0Q29ubmVjdG9yKVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlV2lyZXNCeUNvbm5lY3RvcklkKGNvbm4uaWQpXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMud2lyZXMubGVuZ3RoO1xuICAgICAgICB0aGlzLndpcmVzW2luZGV4XSA9IG5ldyBlZGl0b3JFbGVtZW50cy5XaXJlKHRoaXMsIGZyb21JZCwgdG9JZCwgdGhpcy5ncmlkU2l6ZSwgcmVmcmVzaCk7XG5cbiAgICAgICAgY29ubmVjdG9ycy5mb3JFYWNoKGNvbm4gPT4ge1xuICAgICAgICAgICAgY29ubi5hZGRXaXJlSWQodGhpcy53aXJlc1tpbmRleF0uc3ZnT2JqLmlkKTtcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmFwcGVuZEVsZW1lbnQodGhpcy53aXJlc1tpbmRleF0sIHJlZnJlc2gpO1xuICAgICAgICB0aGlzLm1vdmVUb0JhY2tCeUlkKHRoaXMud2lyZXNbaW5kZXhdLnN2Z09iai5pZCk7XG5cbiAgICAgICAgaWYocmVmcmVzaClcbiAgICAgICAgICAgIHRoaXMud2lyZXNbaW5kZXhdLnVwZGF0ZVdpcmVTdGF0ZSgpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2lyZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIGdldFdpcmVCeUlkKHdpcmVJZCkge1xuICAgICAgICBsZXQgd2lyZUNvdW50ID0gdGhpcy53aXJlcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB3aXJlQ291bnQgOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMud2lyZXNbaV0uc3ZnT2JqLmlkPT09d2lyZUlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lyZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0V2lyZXNCeUNvbm5lY3RvcklkKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGxldCBjb25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuICAgICAgICByZXR1cm4gY29ubmVjdG9yLndpcmVJZHM7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZUJ5SWQod2lyZUlkKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy53aXJlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndpcmVzW2ldLnN2Z09iai5pZCA9PT0gd2lyZUlkKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdG9yMSA9IHRoaXMud2lyZXNbaV0uc3RhcnRDb25uZWN0b3I7XG4gICAgICAgICAgICAgICAgbGV0IGNvbm5lY3RvcjIgPSB0aGlzLndpcmVzW2ldLmVuZENvbm5lY3RvcjtcblxuICAgICAgICAgICAgICAgIGNvbm5lY3RvcjEucmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCk7XG4gICAgICAgICAgICAgICAgY29ubmVjdG9yMi5yZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKTtcblxuICAgICAgICAgICAgICAgIHRoaXMud2lyZXNbaV0uc3ZnT2JqLiRlbC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZXNCeUNvbm5lY3RvcklkKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGxldCBjb25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuXG4gICAgICAgIGNvbm5lY3Rvci53aXJlSWRzLmZvckVhY2god2lyZUlkID0+IHtcbiAgICAgICAgICAgIGxldCB3aXJlID0gdGhpcy5nZXRXaXJlQnlJZCh3aXJlSWQpO1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIG90aGVyIGNvbm5lY3RvciB0aGF0IGlzIHRoZSB3aXJlIGNvbm5lY3RlZCB0b1xuICAgICAgICAgICAgbGV0IG90aGVyQ29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKHdpcmUuZnJvbUlkLCB3aXJlKTtcbiAgICAgICAgICAgIGlmKG90aGVyQ29ubmVjdG9yLnN2Z09iai5pZD09PWNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJDb25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQod2lyZS50b0lkLCB3aXJlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSB3aXJlIHJlY29yZCBmcm9tIHRoZSBvdGhlciBjb25uZWN0b3JcbiAgICAgICAgICAgIG90aGVyQ29ubmVjdG9yLndpcmVJZHMuZGVsZXRlKHdpcmVJZCk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgd2lyZSByZXByZXNlbnRhdGlvbiB1c2luZyBqUXVlcnlcbiAgICAgICAgICAgICQoXCIjXCIgKyB3aXJlSWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAvLyBpZiBvdGhlckNvbm5lY3RvciBpcyBhbiBpbnB1dCBjb25uZWN0b3IsIHNldCBpdHMgc3RhdGUgdG8gdW5rbm93blxuICAgICAgICAgICAgaWYob3RoZXJDb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgICAgIG90aGVyQ29ubmVjdG9yLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjbGVhciB0aGUgbGlzdCBvZiB3aXJlIElkc1xuICAgICAgICBjb25uZWN0b3Iud2lyZUlkcy5jbGVhcigpO1xuICAgICAgICAvLyBpZiBjb25uZWN0b3IgaXMgYW4gaW5wdXQgY29ubmVjdG9yLCBzZXQgaXRzIHN0YXRlIHRvIHVua25vd25cbiAgICAgICAgaWYoY29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbm5lY3Rvci5zZXRTdGF0ZShMb2dpYy5zdGF0ZS51bmtub3duKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJveEJ5SWQoZ2F0ZUlkKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMuYm94ZXNbaV0uc3ZnT2JqLmlkPT09Z2F0ZUlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm94ZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldEJveEJ5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm94ZXNbaV0uZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJveGVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkLCB3aXJlKSB7XG4gICAgICAgIC8vIHRoZSB3aXJlIHZhcmlhYmxlIGlzIHVzZWQgYXMgaGV1cmlzdGljLFxuICAgICAgICAvLyB3aGVuIHdlIGtub3cgdGhlIHdpcmUsIHdlIGhhdmUgdG8gY2hlY2sgb25seVxuICAgICAgICAvLyB0d28gZ2F0ZXMgaW5zdGVhZCBvZiBhbGwgb2YgdGhlbVxuXG4gICAgICAgIGlmKHdpcmUhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIHdlIGtub3cgdGhlIHdpcmUgLS0gd2UgY2FuIGNoZWNrIG9ubHkgZ2F0ZXMgYXQgdGhlIGVuZHMgb2YgdGhpcyB3aXJlXG4gICAgICAgICAgICBsZXQgY29ubmVjdG9yID0gd2lyZS5zdGFydEJveC5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgIGlmICghY29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdG9yID0gd2lyZS5lbmRCb3guZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdG9yO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZSBkbyBub3Qga25vdyB0aGUgd2lyZSAtLSB3ZSBoYXZlIHRvIGNoZWNrIGFsbCBnYXRlc1xuICAgICAgICAgICAgbGV0IGdhdGVDb3VudCA9IHRoaXMuYm94ZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgZ2F0ZUNvdW50IDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMuYm94ZXNbaV0uZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG4gICAgICAgICAgICAgICAgaWYoY29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIG9iamVjdCwgdGhhdCB1c2VyIGludGVyYWN0ZWQgd2l0aCwgaXMgbm90IGEgY29ubmVjdG9yIGFuZCBpcyBpbiBhIGdyb3VwXG4gICAgLy8gcmV0dXJuIHRoZSBncm91cCBqUXVlcnkgb2JqZWN0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGpRdWVyeSBvYmplY3RcbiAgICBnZXRSZWFsSlF1ZXJ5VGFyZ2V0KHRhcmdldCkge1xuICAgICAgICBsZXQgJHRhcmdldCA9ICQodGFyZ2V0KTtcbiAgICAgICAgaWYoISR0YXJnZXQuaGFzQ2xhc3MoXCJjb25uZWN0b3JcIikgJiYgJHRhcmdldC5wYXJlbnRzKCdnJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJHRhcmdldCA9ICR0YXJnZXQucGFyZW50KCk7XG4gICAgICAgICAgICB3aGlsZSAoJHRhcmdldC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJHXCIgJiYgJHRhcmdldC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJnXCIpIHtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJHRhcmdldDtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRoZSBlZGl0b3JFbGVtZW50IHRoYXQgdXNlciBpbnRlcmFjdGVkIHdpdGgsIHRoZSBcInRhcmdldFwiIGFyZ3VtZW50IGlzIGEgalF1ZXJ5IGVsZW1lbnRcbiAgICBnZXRSZWFsVGFyZ2V0KHRhcmdldCkge1xuICAgICAgICAvLyBldmVudHkgc2UgbXVzZWppIHpwcmFjb3ZhdCB0YWR5LCBwcm90b3plIHYgU1ZHIHNlIGV2ZW50eSBuZXByb3BhZ3VqaVxuICAgICAgICBsZXQgJHRhcmdldCA9ICQodGFyZ2V0KTtcblxuICAgICAgICBpZigkdGFyZ2V0Lmhhc0NsYXNzKFwiY29ubmVjdG9yXCIpKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIGEgY29ubmVjdG9yLCBkb24ndCB0cmF2ZXJzZSBncm91cHNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbm5lY3RvckJ5SWQoJHRhcmdldC5hdHRyKCdpZCcpKTtcbiAgICAgICAgfSBlbHNlIGlmKCR0YXJnZXQucGFyZW50cygnZycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIHRoaXMgZWxlbWVudCBpcyBpbiBhIGdyb3VwIGFuZCBpdCBpcyBub3QgYSBjb25uZWN0b3JcblxuICAgICAgICAgICAgLy8gdHJhdmVyc2luZyB1cCB0aGUgRE9NIHRyZWUgdW50aWwgd2UgZmluZCB0aGUgY2xvc2VzdCBncm91cFxuICAgICAgICAgICAgbGV0ICRwYXJlbnRHcm91cCA9ICR0YXJnZXQucGFyZW50KCk7XG4gICAgICAgICAgICB3aGlsZSAoJHBhcmVudEdyb3VwLnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcIkdcIiAmJiAkcGFyZW50R3JvdXAucHJvcChcInRhZ05hbWVcIikgIT09IFwiZ1wiKSB7XG4gICAgICAgICAgICAgICAgJHBhcmVudEdyb3VwID0gJHBhcmVudEdyb3VwLnBhcmVudCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCb3hCeUlkKCRwYXJlbnRHcm91cC5hdHRyKCdpZCcpKTtcbiAgICAgICAgfSBlbHNlIGlmICgkdGFyZ2V0Lmhhc0NsYXNzKFwid2lyZVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0V2lyZUJ5SWQoJHRhcmdldC5hdHRyKCdpZCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmRFbGVtZW50KGVsZW1lbnQsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kSlF1ZXJ5T2JqZWN0KGVsZW1lbnQuZ2V0KCksIHJlZnJlc2gpO1xuICAgIH1cblxuICAgIGFwcGVuZEpRdWVyeU9iamVjdChvYmplY3QsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuJHN2Zy5hcHBlbmQob2JqZWN0KTtcbiAgICAgICAgaWYocmVmcmVzaCkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICAgICAgdGhpcy4kZGVmcy5hcHBlbmQocGF0dGVybik7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH1cblxuICAgIC8vIHJlbG9hZCB0aGUgU1ZHIGRvY3VtZW50IChuZWVkZWQgdG8gZGlzcGxheSBuZXdseSBhcHBlbmRlZCBqUXVlcnkgb2JqZWN0KVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuJHN2Zy5odG1sKHRoaXMuJHN2Zy5odG1sKCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNWRyBkb2N1bWVudCBoYXMgYmVlbiByZWxvYWRlZC5cIilcbiAgICB9XG5cbiAgICBkaXNwbGF5Q29udGV4dE1lbnUoeCwgeSwgJHRhcmdldCkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LmRpc3BsYXkoeCwgeSwgJHRhcmdldCk7XG4gICAgfVxuICAgIGhpZGVDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudS5oaWRlKCk7XG4gICAgfVxuXG4gICAgLy8gc25hcCBhIHZhbHVlIHRvIGEgZ3JpZFxuICAgIHNuYXBUb0dyaWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyB0aGlzLmdyaWRTaXplKSAqIHRoaXMuZ3JpZFNpemU7XG4gICAgfVxuXG4gICAgLy8gc3RhdGljIGZ1bmN0aW9uIGZvciBzbmFwcGluZyBhIHZhbHVlIHRvIGEgZ3JpZFxuICAgIHN0YXRpYyBzbmFwVG9HcmlkKHZhbHVlLCBncmlkU2l6ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIGdyaWRTaXplKSAqIGdyaWRTaXplO1xuICAgIH1cblxuICAgIC8vIGdldCBzZXQgb2Ygbm9kZXMsIHRoYXQgY2Fubm90IGJlIHVzZWQgZm9yIHdpcmluZyBhdCBhbnkgY2lyY3Vtc3RhbmNlc1xuICAgIGdldE5vblJvdXRhYmxlTm9kZXMoKSB7XG4gICAgICAgIGxldCBibG9ja2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIC8vIGZvciBlYWNoIGJveFxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIGpRdWVyeSBjaGlsZCB3aXRoIGNsYXNzIC5yZWN0IChcImhpdGJveFwiKVxuICAgICAgICAgICAgbGV0IHJlY3QgPSAkKCcjJyArIHRoaXMuYm94ZXNbaV0uc3ZnT2JqLmlkKS5jaGlsZHJlbihcIi5yZWN0XCIpWzBdO1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlXG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSAkKHJlY3QpLnBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIHNuYXAgdGhlIHBvc2l0aW9uIHRvIHRoZSBncmlkXG4gICAgICAgICAgICBwb3NpdGlvbi5sZWZ0ID0gdGhpcy5zbmFwVG9HcmlkKHBvc2l0aW9uLmxlZnQpO1xuICAgICAgICAgICAgcG9zaXRpb24udG9wID0gdGhpcy5zbmFwVG9HcmlkKHBvc2l0aW9uLnRvcCk7XG5cbiAgICAgICAgICAgIC8vIGZvciBlYWNoIGl0ZW0gaW4gYmxvY2tlZE5vZGVzIChzZXQgb2YgYmxvY2tlZCBub2RlcyB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlXG4gICAgICAgICAgICAvLyB0byB0aGUgbGVmdCB1cHBlciBjb3JuZXIgb2YgcmVjdDsgdW5pdCB1c2VkIGlzIFwib25lIGdyaWRTaXplXCIpIGNvbnZlcnQgdGhlIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAvLyB0byBhYnNvbHV0ZSAobXVsdGlwbGUgd2l0aCBncmlkU2l6ZSBhbmQgYWRkIHBvc2l0aW9uIG9mIHJlY3QpIGFuZCBhZGQgdGhlIHJlc3VsdCB0byB0aGUgc2V0XG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5ib3hlc1tpXS5ibG9ja2VkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgYWJzb2x1dGVYID0gcG9zaXRpb24ubGVmdCArIGl0ZW0ueCAqIHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgbGV0IGFic29sdXRlWSA9IHBvc2l0aW9uLnRvcCArIGl0ZW0ueSAqIHRoaXMuZ3JpZFNpemU7XG5cbiAgICAgICAgICAgICAgICBibG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogYWJzb2x1dGVYLFxuICAgICAgICAgICAgICAgICAgICB5OiBhYnNvbHV0ZVlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0b2RvIGVuc3VyZSB0aGF0IHRoaXMucmVmcmVzaCgpIGlzIHJlYWxseSB1bm5lY2Vzc2FyeVxuICAgICAgICAvLyB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBzZXRcbiAgICAgICAgcmV0dXJuIGJsb2NrZWROb2RlcztcbiAgICB9XG5cbiAgICBtb3ZlVG9Gcm9udEJ5SWQob2JqSWQpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmFwcGVuZCgkKFwiI1wiICsgb2JqSWQpKTtcbiAgICB9XG5cbiAgICBtb3ZlVG9CYWNrQnlJZChvYmpJZCkge1xuICAgICAgICAkKFwiI1wiICsgdGhpcy5iYWNrZ3JvdW5kLmlkKVxuICAgICAgICAgICAgLmFmdGVyKCQoXCIjXCIgKyBvYmpJZCkpO1xuICAgIH1cblxuICAgIC8vIGdldCBzZXQgb2Ygbm9kZXMsIHRoYXQgaXMgYmV0dGVyIG5vdCB0byB1c2UgZm9yIHdpcmluZ1xuICAgIGdldEluY29udmVuaWVudE5vZGVzKGlnbm9yZVdpcmVJZCkge1xuXG4gICAgICAgIGxldCBpbmNvbnZlbmllbnROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgLy8gZm9yIGVhY2ggd2lyZVxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMud2lyZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICAvLyAoaWdub3JlIHRoZSB3aXJlIHRoYXQgaXMgc3BlY2lmaWVkIGluIHRoZSBpZ25vcmVXaXJlSWQgYXJndW1lbnQgKGlmIGFueSkpXG4gICAgICAgICAgICBpZihpZ25vcmVXaXJlSWQ9PT11bmRlZmluZWQgfHwgaWdub3JlV2lyZUlkIT09dGhpcy53aXJlc1tpXS5zdmdPYmouaWQpIHtcbiAgICAgICAgICAgICAgICAvLyBjeWNsZSB0aHJvdWdoIHBvaW50cywgZm9yIGVhY2ggbmVpZ2JvdXJzIGFkZCBhbGwgcG9pbnRzIHRoYXQgYXJlIGluIGJldHdlZW4gdGhlbVxuICAgICAgICAgICAgICAgIC8vIGkuZS46ICgwLDApIGFuZCAoMCwzMCkgYXJlIGJsb2NraW5nIHRoZXNlIG5vZGVzOiAoMCwwKSwgKDAsMTApLCAoMCwyMCksICgwLDMwKVxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9pbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy53aXJlc1tpXS5wb2ludHMuZm9yRWFjaChwb2ludCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2UG9pbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByZXZQb2ludCBpcyB1bmRlZmluZWQsIGFkZCB0aGUgZmlyc3QgcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY29udmVuaWVudE5vZGVzLmFkZCh7eDogcG9pbnQueCwgeTogcG9pbnQueX0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBhZGQgYWxsIHRoZSBwb2ludCBiZXR3ZWVuIHRoZSBwcmV2UG9pbnQgKGV4Y2x1ZGVkKSBhbmQgcG9pbnQgKGluY2x1ZGVkKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwcmV2UG9pbnQueD09PXBvaW50LngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbGluZSBpcyBob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb20gPSBNYXRoLm1pbihwcmV2UG9pbnQueSwgcG9pbnQueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvID0gTWF0aC5tYXgocHJldlBvaW50LnksIHBvaW50LnkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUoZnJvbSA8PSB0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbnZlbmllbnROb2Rlcy5hZGQoe3g6IHBvaW50LngsIHk6IGZyb219KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArPSB0aGlzLmdyaWRTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihwcmV2UG9pbnQueT09PXBvaW50LnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbGluZSBpcyB2ZXJ0aWNhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tID0gTWF0aC5taW4ocHJldlBvaW50LngsIHBvaW50LngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0byA9IE1hdGgubWF4KHByZXZQb2ludC54LCBwb2ludC54KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlKGZyb20gPD0gdG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb252ZW5pZW50Tm9kZXMuYWRkKHt4OiBmcm9tLCB5OiBwb2ludC55fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKz0gdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmUgaXMgbmVpdGhlciBob3Jpem9udGFsIG5vciB2ZXJ0aWNhbCwgdGhyb3cgYW4gZXJyb3IgZm9yIGJldHRlciBmdXR1cmUgZGVidWdnaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImdldEluY29udmVuaWVudE5vZGVzOiBsaW5lIGJldHdlZW4gdHdvIHBvaW50cyBpcyBuZWl0aGVyIGhvcml6b250YWwgbm9yIHZlcnRpY2FsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IG5ldyBwcmV2UG9pbnRcbiAgICAgICAgICAgICAgICAgICAgcHJldlBvaW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBzZXRcbiAgICAgICAgcmV0dXJuIGluY29udmVuaWVudE5vZGVzO1xuICAgIH1cbn1cbiIsImltcG9ydCBTdmcgZnJvbSAnLi9jYW52YXMuanMnO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc3ZnID0gbmV3IFN2ZyhcInN2ZyNjYW52YXNcIiwgMTApO1xuXG4gICAgLyogREVNTyAqL1xuICAgIC8vIE9ORSBCSVQgQ09NUEFSQVRPUlxuICAgIC8qXG4gICAgbGV0IGkxID0gc3ZnLm5ld0lucHV0KDEwMCwgMTAwKTtcbiAgICBsZXQgaTIgPSBzdmcubmV3SW5wdXQoMTAwLCAyMDApO1xuXG4gICAgbGV0IG4xID0gc3ZnLm5ld0dhdGUoXCJub3RcIiwgMjAwLCAxMDApO1xuICAgIGxldCBuMiA9IHN2Zy5uZXdHYXRlKFwibm90XCIsIDIwMCwgMjAwKTtcblxuICAgIGxldCBhMSA9IHN2Zy5uZXdHYXRlKFwiYW5kXCIsIDM2MCwgOTApO1xuICAgIGxldCBhMiA9IHN2Zy5uZXdHYXRlKFwiYW5kXCIsIDM2MCwgMjEwKTtcblxuICAgIGxldCBub3IgPSBzdmcubmV3R2F0ZShcIm5vclwiLCA1NDAsIDE1MCk7XG5cbiAgICBsZXQgbzEgPSBzdmcubmV3T3V0cHV0KDY4MCwgOTApO1xuICAgIGxldCBvMiA9IHN2Zy5uZXdPdXRwdXQoNjgwLCAxNTApO1xuICAgIGxldCBvMyA9IHN2Zy5uZXdPdXRwdXQoNjgwLCAyMTApO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIG4xLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBuMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShuMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTEuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUobjIub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoYTEub3V0cHV0c1swXS5zdmdPYmouaWQsIG5vci5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbm9yLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoYTEub3V0cHV0c1swXS5zdmdPYmouaWQsIG8xLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKG5vci5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoYTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG8zLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgICovXG5cbiAgICAvLyBCSU5BUlkgQURERVJcbiAgICAvKlxuICAgIGxldCBpMSA9IHN2Zy5uZXdJbnB1dCg4MCwgOTApO1xuICAgIGxldCBpMiA9IHN2Zy5uZXdJbnB1dCg4MCwgMTMwKTtcbiAgICBsZXQgaTMgPSBzdmcubmV3SW5wdXQoODAsIDE4MCk7XG5cbiAgICBsZXQgeDEgPSBzdmcubmV3R2F0ZShcInhvclwiLCAzNjAsIDEwMCk7XG4gICAgbGV0IHgyID0gc3ZnLm5ld0dhdGUoXCJ4b3JcIiwgMzYwLCAxNzApO1xuXG4gICAgbGV0IGExID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMjUwLCAyMjApO1xuICAgIGExLm9uQ2xpY2tNaWRkbGUoKTsvLyBhIGplZG5vdSByb3RvdmFueVxuICAgIGxldCBhMiA9IHN2Zy5uZXdHYXRlKFwiYW5kXCIsIDUwMCwgMzIwKTtcblxuICAgIGxldCBvciA9IHN2Zy5uZXdHYXRlKFwib3JcIiwgNjIwLCAzMTApO1xuXG4gICAgbGV0IG8xID0gc3ZnLm5ld091dHB1dCg3NTAsIDI3MCk7XG4gICAgbGV0IG8yID0gc3ZnLm5ld091dHB1dCg3NTAsIDMxMCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIHgxLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkzLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4Mi5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkzLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKHgxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4Mi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZSh4MS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgb3IuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZSh4Mi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoYTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG9yLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUob3Iub3V0cHV0c1swXS5zdmdPYmouaWQsIG8yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgICovXG59KTsiXX0=
