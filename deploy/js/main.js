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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiIsInNyYy9lczYvc3RydWN0dXJlc0FuZENsYXNzZXMuanMiLCJzcmMvZXM2L3N2Z09iamVjdHMuanMiLCJzcmMvZXM2L2xvZ2ljLmpzIiwic3JjL2VzNi9lZGl0b3JFbGVtZW50cy5qcyIsInNyYy9lczYvY29udGV4dE1lbnUuanMiLCJzcmMvZXM2L2ltcG9ydEV4cG9ydC5qcyIsInNyYy9lczYvZmxvYXRpbmdNZW51LmpzIiwic3JjL2VzNi9zaW11bGF0aW9uLmpzIiwic3JjL2VzNi9zbWFsbEZ1bmN0aW9ucy5qcyIsInNyYy9lczYvY2FudmFzLmpzIiwic3JjL2VzNi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQUFBSSxJQUFBLENBQUEsWUFBVyxvQ0FBb0IsQ0FBQztBQ0dwQyxBQUFJLElBQUEsQ0FBQSxrQkFBaUIsRUFBSSxLQUFHLENBQUM7SUFFaEIsR0FBQyxFQUxkLENBQUEsU0FBUyxBQUFEO0FBS0QsV0FBTSxHQUFDLENBQ0UsQUFBRCxDQUFHO0FBQ1YsU0FBRyxDQUFDLGtCQUFpQixDQUFFO0FBQ25CLHlCQUFpQixFQUFJLEtBQUcsQ0FBQztNQUM3QjtBQUFBLEFBRUEsU0FBRyxPQUFPLEVBQUksS0FBRyxDQUFDO0FBQ2xCLFNBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBQztBQUVmLFdBQU8sbUJBQWlCLENBQUM7SUFDN0I7QUFvQkosQUFqQ1UsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBZWhDLFFBQUksT0FBSyxFQUFJO0FBQ1QsQUFBSSxVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBSTVCLGNBQU0sQ0FBQSxBQUFDLENBQUMsR0FBRSxFQUFFLE9BQUssQ0FBQyxPQUFPLENBQUc7QUFDeEIsYUFBRyxPQUFPLEVBQUUsQ0FBQztBQUNiLGVBQUssRUFBSSxDQUFBLElBQUcsU0FBUyxBQUFDLEVBQUMsQ0FBQztRQUM1QjtBQUFBLEFBRUEsV0FBRyxPQUFPLEVBQUUsQ0FBQztB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RyxDQUFHLENBQUEsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDL0MsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDcEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FFeEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDbEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDMUQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDOUQsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sWUFBWSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FDOUUsQ0FBQyxDQUFDO01BQ047QUFDTyxTQUFHLENBQVYsVUFBWSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDZCxhQUFPLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxLQUFJLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO01BQ3JDO0FBQ08sUUFBRSxDQUFULFVBQVcsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFHO0FBQ2IsYUFBTyxDQUFBLEtBQUksd0JBQXdCLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQ3ZDLENBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sR0FBRyxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQ3pELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWpFLEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2xELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzFELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzlELEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFlBQVks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QUM7Y0FHTjtBQUFBO0FBN0NKLG1CQUFZLEVBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsTUFBTSxPQUFPLENBQUksR0FBRSxDQUFBOztRQThDMUM7QUFFQSxhQUFPLGtCQUFnQixDQUFDO01BQzVCO09BcEdPLFVBQVMsQ0FBaEIsVUFBa0IsS0FBSSxDQUFHLENBQUEsUUFBTyxDQUFHO0FBQy9CLGFBQU8sQ0FBQSxJQUFHLE1BQU0sQUFBQyxDQUFDLEtBQUksRUFBSSxTQUFPLENBQUMsQ0FBQSxDQUFJLFNBQU8sQ0FBQztNQUNsRCxFQS9tQndGLENBQUM7RUFDckYsQUFBQyxFQUFDOztBQUhWLFNBQUEsYUFBd0I7QUFBRSxnQkFBd0I7SUFBRSxFQUE3Qjs7OztBQUF2QixBQUFJLElBQUEsQ0FBQSxZQUFXLG9CQUFvQixDQUFDO0lDQTdCLElBQUU7QUFFVCxFQUFBLEFBQUMsQ0FBQyxTQUFVLEFBQUQsQ0FBRztBQUNWLEFBQUksTUFBQSxDQUFBLEdBQUUsRUFBSSxJQUFJLElBQUUsQUFBQyxDQUFDLFlBQVcsQ0FBRyxHQUFDLENBQUMsQ0FBQztFQTJFdkMsQ0FBQyxDQUFDO0FBOUVGLFdBQXVCIiwiZmlsZSI6Ii9ob21lL3dhcmFuL1Nrb2xhL3JwL2NvZGUvdGVtcG91dE1DNHlPVFkwTmpRME56a3hNREV3TnpFei5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbCwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHNpbmdsZXRvbiB0byBnZW5lcmF0ZSB1bmlxdWUgaWQnc1xubGV0IGV4aXN0aW5nSWRJbnN0YW5jZSA9IG51bGw7XG4vLyB1c2FnZTogbGV0IGlkID0gbmV3IElkKCkudW5pcXVlXG5leHBvcnQgY2xhc3MgSWQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZighZXhpc3RpbmdJZEluc3RhbmNlKXtcbiAgICAgICAgICAgIGV4aXN0aW5nSWRJbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZWZpeCA9IFwiaWRcIjtcbiAgICAgICAgdGhpcy5uZXh0SWQgPSAwO1xuXG4gICAgICAgIHJldHVybiBleGlzdGluZ0lkSW5zdGFuY2U7XG4gICAgfVxuXG4gICAgZ2V0IHVuaXF1ZSgpIHtcbiAgICAgICAgbGV0IHJldFZhbCA9IHRoaXMuZ2VuZXJhdGUoKTtcblxuICAgICAgICAvLyBmaW5kIG5leHQgdW51c2VkIGlkWFhYWCB0byBwcmV2ZW50IGlkIGNvbGxpc2lvbiB0aGF0IG1pZ2h0IGJlIGNhdXNlZCBieSBzb21lIG90aGVyIGNvbXBvbmVudFxuICAgICAgICAvLyAoaXQgcmVhbGx5IHNob3VsZCBub3QgaGFwcGVuLCBidXQgdGhpcyBpcyBhIHNpbXBsZSBtZXRob2QgdG8gZW5zdXJlIHNhZmV0eSlcbiAgICAgICAgd2hpbGUoJChcIiNcIityZXRWYWwpLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0SWQrKztcbiAgICAgICAgICAgIHJldFZhbCA9IHRoaXMuZ2VuZXJhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gdGhpcyBpZFxuICAgICAgICB0aGlzLm5leHRJZCsrO1xuXG4gICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeCArIHRoaXMubmV4dElkO1xuICAgIH1cbn1cblxuLy8gdG8gZXM1IGNvbXBpbGVyIGZyaWVuZGx5IGltcGxlbWVudGF0aW9uIChcImNhbGxpbmcgYSBidWlsdGluIE1hcCBjb25zdHJ1Y3RvciB3aXRob3V0IG5ldyBpcyBmb3JiaWRkZW5cIilcbmV4cG9ydCBjbGFzcyBNYXBXaXRoRGVmYXVsdFZhbHVlIHtcbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IGRlZmF1bHRWYWx1ZTtcblxuXG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5zaXplO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBmb3JFYWNoKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmZvckVhY2goLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZGVsZXRlKGtleSk7XG4gICAgfVxuXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5oYXMoa2V5KTtcbiAgICB9XG5cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZW50cmllcygpO1xuICAgIH1cblxuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5rZXlzKCk7XG4gICAgfVxuXG4gICAgdmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAudmFsdWVzKCk7XG4gICAgfVxufVxuXG4vKlxuLy8gZXM2IGltcGxlbWVudGF0aW9uXG5leHBvcnQgY2xhc3MgTWFwV2l0aERlZmF1bHRWYWx1ZSBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3IoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgaWYodGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiovIiwiaW1wb3J0ICogYXMgU3RydWN0dXJlcyBmcm9tICcuL3N0cnVjdHVyZXNBbmRDbGFzc2VzLmpzJ1xuXG5jbGFzcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgdGhpcy50YWdOYW1lID0gdGFnTmFtZTtcblxuICAgICAgICB0aGlzLiRlbCA9ICQoXCI8XCIrdGhpcy50YWdOYW1lK1wiPlwiKTtcblxuICAgICAgICB0aGlzLmlkID0gbmV3IFN0cnVjdHVyZXMuSWQoKS51bmlxdWU7XG4gICAgfVxuXG4gICAgYWRkQ2xhc3MobmFtZSkge1xuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhuYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVDbGFzc2VzKC4uLmNsYXNzZXMpIHtcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQXR0cihhc3NvYykge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcblxuICAgICAgICAvLyBhZGQgYXR0cmlidXRlcyB0byB0aGUgZWxlbWVudFxuICAgICAgICB0aGlzLiRlbC5hdHRyKGFzc29jKTtcbiAgICB9XG5cbiAgICBnZXRBdHRyKG5hbWUpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLmF0dHIobmFtZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXR0cihuYW1lKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuXG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUF0dHIobmFtZSk7XG4gICAgfVxuXG4gICAgc2V0IGlkKGlkKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJpZFwiOiBpZH0pO1xuICAgIH07XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHIoXCJpZFwiKTtcbiAgICB9O1xuXG4gICAgZ2V0KCkge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBlbGVtZW50IGV4aXN0cyBpbiBkb20sIHdlIG5lZWQgdG8gZmV0Y2ggaXQgdXNpbmcgalF1ZXJ5XG4gICAgY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpIHtcbiAgICAgICAgbGV0ICRqcUVsZW1lbnQgPSAkKFwiI1wiK3RoaXMuJGVsLmF0dHIoJ2lkJykpO1xuICAgICAgICBpZigkanFFbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkanFFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgZHJhZ2dhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJkcmFnZ2FibGVcIjogdmFsdWV9KTtcbiAgICB9XG59XG5cbmNsYXNzIFJvdGF0YWJsZSBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcbiAgICB9XG5cbiAgICByb3RhdGFibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcInJvdGF0YWJsZVwiOiB2YWx1ZX0pO1xuICAgIH1cbn1cblxuLy8gdGhlcmUgaXMgbm8gbXVsdGlwbGUgaW5oZXJpdGFuY2UgaW4gRVM2LCBzbyBJIGhhdmUgdG8gZG8gc29tZXRoaW5nIHVnbHkgbGlrZSB0aGlzXG5jbGFzcyBEcmFnZ2FibGVSb3RhdGFibGUgZXh0ZW5kcyBEcmFnZ2FibGUge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgcm90YXRhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJyb3RhdGFibGVcIjogdmFsdWV9KTtcbiAgICB9XG59XG5cbmNsYXNzIFN2Z0VsZW1lbnQgZXh0ZW5kcyBEcmFnZ2FibGVSb3RhdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG5cbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgU3ZnRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgZmlsbCwgc3Ryb2tlKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHcsIGgsIFwicmVjdFwiKTtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGwsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZSxcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAwLjUsXG4gICAgICAgICAgICAncG9pbnRlci1ldmVudHMnOiAnYWxsJyAvLyB0byB0cmlnZ2VyIGhvdmVyIGV2ZW4gd2l0aCB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN2Z0ltYWdlIGV4dGVuZHMgU3ZnRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgdXJsKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHcsIGgsIFwiaW1hZ2VcIik7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBcInhsaW5rOmhyZWZcIjogdXJsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZVVybCh1cmwpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIFwieGxpbms6aHJlZlwiOiB1cmxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBEcmFnZ2FibGVSb3RhdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcImdcIik7XG4gICAgfVxuXG4gICAgYWRkQ2hpbGQoZWwpIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGVsLiRlbCk7XG4gICAgICAgIHJldHVybiBlbDsgLy8gcHJvIGplZG5vZHVzc2kgXCJsZXQgcmVjdCA9IGcuYWRkQ2hpbGQobmV3IFJlY3RhbmdsZSguLi5cIlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvbHlsaW5lUG9pbnQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgaWYoeCAhPT0gdW5kZWZpbmVkICYmIHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZUZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIGxldCBhcnIgPSBzdHJpbmcuc3BsaXQoXCIsXCIpO1xuICAgICAgICByZXR1cm4gbmV3IFBvbHlsaW5lUG9pbnQoYXJyWzBdLCBhcnJbMV0pO1xuICAgIH1cblxuICAgIGdldCBzdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKyBcIixcIiArIHRoaXMueTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55O1xuICAgIH1cbn1cblxuY2xhc3MgU21hcnRBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgICAgIGlmKGFyciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFyciA9IGFycjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXJyID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gU21hcnRBcnJheSgkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5hcnIpKTtcbiAgICB9XG5cbiAgICBhcHBlbmQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkV2l0aEluZGV4KHBvaW50LCB0aGlzLmFyci5sZW5ndGgpO1xuICAgIH1cblxuICAgIHByZXBlbmQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkV2l0aEluZGV4KHBvaW50LCAwKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYSBwb2ludCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LCBtb3ZlIGFsbCBmb2xsb3dpbmcgaXRlbXNcbiAgICBhZGRXaXRoSW5kZXgocG9pbnQsIGluZGV4KSB7XG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuYXJyLmxlbmd0aCA7IGkgPiBpbmRleCA7IC0taSkge1xuICAgICAgICAgICAgdGhpcy5hcnJbaV0gPSB0aGlzLmFycltpLTFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJyW2luZGV4XSA9IHBvaW50O1xuICAgICAgICByZXR1cm4gdGhpczsgLy8gdG8gZW5hYmxlIGNoYWluaW5nIG9mIGFwcGVuZCAvIHByZXBwZW5kIC8gYWRkV2l0aEluZGV4IGNvbW1hbmRzXG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRJdGVtKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFycltpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0IGxhc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGVuZ3RoIT09MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyW3RoaXMubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZmlyc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGVuZ3RoIT09MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaW5kZXhBcnJheSBtdXN0IGJlIHNvcnRlZCAoQVNDLCBlZy4gWzEsIDMsIDQsIDhdKVxuICAgIHJlbW92ZShpbmRleCkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yKGxldCBpID0gaW5kZXggOyBpIDwgbGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmFycltpXSA9IHRoaXMuYXJyW2kgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFyci5wb3AoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2x5bGluZVBvaW50cyBleHRlbmRzIFNtYXJ0QXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycikge1xuICAgICAgICBzdXBlcihhcnIpO1xuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9seWxpbmVQb2ludHMoJC5leHRlbmQodHJ1ZSwgW10sIHRoaXMuYXJyKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKHBvaW50KSB7XG4gICAgICAgIC8vIGNhbGwgaW5oZXJpdGVkIGZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYXBwZW5kaW5nXG4gICAgICAgIHN1cGVyLmFwcGVuZChwb2ludCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHNlY29uZCB0byBsYXN0IHBvaW50IGlzIHVubmVjZXNzYXJ5LCByZW1vdmUgaXRcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICBpZiAoIGxlbmd0aCA+PSAzXG4gICAgICAgICAgICAgICAgJiYgKCAgICAoIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAzKS54ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueCA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDEpLnggKVxuICAgICAgICAgICAgICAgICAgICAgfHwgKCB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMykueSA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnkgPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAxKS55IClcbiAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUobGVuZ3RoIC0gMik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhpcyBlbGVtZW50ICh0byBhbGxvdyBjaGFpbmluZylcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgcGFyc2VGcm9tU3RyaW5nKHN0cmluZykge1xuICAgICAgICBsZXQgcG9pbnRTdHJpbmdzID0gc3RyaW5nLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBQb2x5bGluZVBvaW50cygpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgcG9pbnRTdHJpbmdzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgcG9pbnRzLmFwcGVuZChQb2x5bGluZVBvaW50LnBhcnNlRnJvbVN0cmluZyhwb2ludFN0cmluZ3NbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IHN0cmluZygpIHtcbiAgICAgICAgbGV0IHN0cmluZyA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIGlmKGkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJpbmcgKz0gdGhpcy5hcnJbaV0uc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgZm9yRWFjaChmdW5jKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5hcnIubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBmdW5jKHRoaXMuYXJyW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvbHlMaW5lIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcihwb2ludHMsIGNvbG9yLCBzdHJva2VXaWR0aCkge1xuICAgICAgICBzdXBlcihcInBvbHlsaW5lXCIpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBwb2ludHM6IHBvaW50cy5zdHJpbmcsXG4gICAgICAgICAgICBzdHJva2U6IGNvbG9yLFxuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICBcInN0cm9rZS13aWR0aFwiOiBzdHJva2VXaWR0aFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVQb2ludHMocG9pbnRzKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBwb2ludHM6IHBvaW50cy5zdHJpbmdcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGF0dGVybiBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IoaWQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoXCJwYXR0ZXJuXCIpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgcGF0dGVyblVuaXRzOiBcInVzZXJTcGFjZU9uVXNlXCIsXG4gICAgICAgICAgICB2aWV3Qm94OiBcIjAgMCBcIit3aWR0aCtcIiBcIitoZWlnaHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2hpbGQoZWwpIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGVsLiRlbCk7XG4gICAgICAgIHJldHVybiBlbDsgLy8gcHJvIGplZG5vZHVzc2kgXCJsZXQgcmVjdCA9IGcuYWRkQ2hpbGQobmV3IFJlY3RhbmdsZSguLi5cIlxuICAgIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gbG9naWMgZnVuY3Rpb25zIHVzZWQgaW4gdGhlIGdhdGUgZXZhbHVhdGlvblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naWMge1xuICAgIHN0YXRpYyBhbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMudGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgW1xuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9mZl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUudW5rbm93bl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgc3RhdGljIG5hbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMubm90KExvZ2ljLmFuZChhLCBiKSk7XG4gICAgfVxuICAgIHN0YXRpYyBub3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMubm90KExvZ2ljLm9yKGEsIGIpKTtcbiAgICB9XG4gICAgc3RhdGljIG5vdChhKSB7XG4gICAgICAgIGlmKGEgPT09IExvZ2ljLnN0YXRlLm9uKSB7XG4gICAgICAgICAgICByZXR1cm4gTG9naWMuc3RhdGUub2ZmO1xuICAgICAgICB9IGVsc2UgaWYgKGEgPT09IExvZ2ljLnN0YXRlLm9mZikge1xuICAgICAgICAgICAgcmV0dXJuIExvZ2ljLnN0YXRlLm9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIG9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLnRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIFtcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9uXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLnVua25vd25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ11cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHN0YXRpYyB4bm9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLm5vdChMb2dpYy54b3IoYSwgYikpO1xuICAgIH1cbiAgICBzdGF0aWMgeG9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLnRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIFtcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLnVua25vd25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ11cbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVua25vd246IDAsXG4gICAgICAgICAgICBvbjogMSxcbiAgICAgICAgICAgIG9mZjogMixcbiAgICAgICAgICAgIG9zY2lsbGF0aW5nOiAzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgcnVsZXMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgcnVsZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZigocnVsZXNbaV1bMF09PT1hICYmIHJ1bGVzW2ldWzFdPT09YikgfHwgKHJ1bGVzW2ldWzBdPT09YiAmJiBydWxlc1tpXVsxXT09PWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ1bGVzW2ldWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCAqIGFzIHN2Z09iaiBmcm9tICcuL3N2Z09iamVjdHMuanMnXG5pbXBvcnQgKiBhcyBTdHJ1Y3R1cmVzIGZyb20gJy4vc3RydWN0dXJlc0FuZENsYXNzZXMuanMnXG5pbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYy5qcydcblxuLy8gbWFwcGluZyBsb2dpY2FsIHN0YXRlcyB0byBjc3MgY2xhc3Nlc1xuY29uc3Qgc3RhdGVDbGFzc2VzID0ge1xuICAgIG9uOiBcInN0YXRlT25cIixcbiAgICBvZmY6IFwic3RhdGVPZmZcIixcbiAgICB1bmtub3duOiBcInN0YXRlVW5rbm93blwiLFxuICAgIG9zY2lsbGF0aW5nOiBcInN0YXRlT3NjaWxsYXRpbmdcIlxufTtcblxuLy8gaGVscGVyIGNsYXNzIHVzZWQgYnkgVHJhbnNmb3JtXG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3Ioc3RyaW5nKSB7XG4gICAgICAgIGlmKHN0cmluZyE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gc3RyaW5nLnJlcGxhY2UoL15bIF0qKFteKF0rKS4qLywgXCIkMVwiKTtcbiAgICAgICAgICAgIHRoaXMuYXJncyA9IHN0cmluZy5yZXBsYWNlKC9eW14oXStcXCgoLiopXFwpLywgXCIkMVwiKS5zcGxpdCgnICcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0QXJndW1lbnRzKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIihcIiArIHRoaXMuYXJncy5qb2luKFwiIFwiKSArIFwiKVwiO1xuICAgIH1cbn1cblxuLy8gdXNlZCB0byBtYW5pcHVsYXRlIHRoZSB0cmFuc2Zvcm0gYXJndW1lbnQgdXNlZCBpbiBTVkdcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZykge1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG5cbiAgICAgICAgaWYoc3RyaW5nIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgc3BsaXRJdGVtcyA9IHN0cmluZy5zcGxpdChcIilcIik7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHNwbGl0SXRlbXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYoc3BsaXRJdGVtc1tpXSkgeyAvLyBpZiBub3QgZW1wdHlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBQcm9wZXJ0eShzcGxpdEl0ZW1zW2ldICsgXCIpXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGluZGV4IG9yIC0xXG4gICAgZ2V0SW5kZXgobmFtZSkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKG5hbWUgPT09IHRoaXMuaXRlbXNbaV0ubmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGdldFRyYW5zbGF0ZSgpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLmdldEFyZ3VtZW50cyh0aGlzLmdldEluZGV4KFwidHJhbnNsYXRlXCIpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogYXJnc1swXSxcbiAgICAgICAgICAgIHk6IGFyZ3NbMV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJvdGF0ZSgpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLmdldEFyZ3VtZW50cyh0aGlzLmdldEluZGV4KFwicm90YXRlXCIpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVnOiBhcmdzWzBdLFxuICAgICAgICAgICAgY2VudHJlWDogYXJnc1sxXSxcbiAgICAgICAgICAgIGNlbnRyZVk6IGFyZ3NbMl1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldHMgdGhlIHRyYW5zbGF0aW9uXG4gICAgc2V0VHJhbnNsYXRlKHgsIHkpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoXCJ0cmFuc2xhdGVcIiwgW3gsIHldKTtcbiAgICB9XG5cbiAgICAvLyBzZXRzIHRoZSByb3RhdGlvblxuICAgIHNldFJvdGF0ZShkZWcsIGNlbnRyZVgsIGNlbnRyZVkpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoXCJyb3RhdGVcIiwgW2RlZywgY2VudHJlWCwgY2VudHJlWV0pO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGUgcm90YXRpb25cbiAgICByb3RhdGVSaWdodChjZW50cmVYLCBjZW50cmVZKSB7XG4gICAgICAgIGlmKHRoaXMuZ2V0SW5kZXgoXCJyb3RhdGVcIik9PT0tMSkge1xuICAgICAgICAgICAgdGhpcy5zZXRSb3RhdGUoOTAsIGNlbnRyZVgsIGNlbnRyZVkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5ld1JvdGF0aW9uID0gKHBhcnNlSW50KHRoaXMuZ2V0Um90YXRlKCkuZGVnKSArIDkwKSAlIDM2MDtcblxuICAgICAgICAgICAgaWYobmV3Um90YXRpb249PT0xODApIHtcbiAgICAgICAgICAgICAgICAvLyBzd2FwIGNlbnRyZSBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgIC8vIGJlY2F1c2Ugcm90YXRlKGMsIHgsIHkpIGlzIGRlZmluZWQgbGlrZSB0cmFuc2Zvcm0oLXgsIC15KSByb3RhdGUoYykgdHJhbnNmb3JtKHgsIHkpXG4gICAgICAgICAgICAgICAgbGV0IGEgPSBjZW50cmVYO1xuICAgICAgICAgICAgICAgIGNlbnRyZVggPSBjZW50cmVZO1xuICAgICAgICAgICAgICAgIGNlbnRyZVkgPSBhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFJvdGF0ZShcbiAgICAgICAgICAgICAgICBuZXdSb3RhdGlvbixcbiAgICAgICAgICAgICAgICBjZW50cmVYLFxuICAgICAgICAgICAgICAgIGNlbnRyZVlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRoZSB0cmFuc2Zvcm0gcHJvcGVydGllcyBjb25jYXRlbmF0ZWRcbiAgICBnZXQoKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZihpIT09MCkge1xuICAgICAgICAgICAgICAgIHJldFZhbCArPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldFZhbCArPSB0aGlzLml0ZW1zW2ldLmdldCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfVxuXG4gICAgZ2V0QXJndW1lbnRzKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW2luZGV4XS5hcmdzO1xuICAgIH1cblxuICAgIHNldFBhcmFtZXRlcihuYW1lLCBhcmdzKSB7XG4gICAgICAgIC8vIGRldGVybWluZSBpbmRleCBvZiB0aGUgcGFyYW1ldGVyIChpZiBzZXQpLCBlbHNlIGluZGV4ID09IC0xXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXgobmFtZSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGhhcyBiZWVuIGFscmVhZHkgc2V0LCBjaGFuZ2UgaXQgKHJld3JpdGUgdGhlIGFycmF5IGluIHRoZSByaWdodCBpbmRleClcbiAgICAgICAgLy8gZWxzZSBjcmVhdGUgYSBuZXcgb25lIChzZXQgaW5kZXggdG8gdGhlIGxlbmd0aCBvZiBhbiBhcnJheSAtLT4gYWQgYW4gaXRlbSB0byB0aGUgZW5kKVxuICAgICAgICBpZihpbmRleD09PS0xKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0gPSBuZXcgUHJvcGVydHkoKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLnNldE5hbWUobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzYXZlIGFyZ3MgdW5kZXIgdGhlIHJpZ2h0IGluZGV4XG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLnNldEFyZ3VtZW50cyhhcmdzKTtcbiAgICB9XG59XG5cbi8vIHBhcmVudCBjbGFzcyBmb3IgYWxsIG5ldHdvcmsgZWxlbWVudHNcbmNsYXNzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgaWYoIXBhcmVudFNWRykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlBhcmVudCBTVkcgZWxlbWVudCBoYXMgbm90IGJlZW4gZGVmaW5lZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG5cbiAgICAgICAgLy8gdXNlZCB0byBzdG9yZSB0aGUgc3ZqT2JqZWN0J3MgaW5zdGFuY2Ugb2YgdGhpcyBlbGVtZW50XG4gICAgICAgIHRoaXMuc3ZnT2JqID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqLmlkO1xuICAgIH1cblxuICAgIG9uTW91c2VEb3duKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzLCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBsYXRlciBpbiB0aGUgQm94IGNsYXNzXG4gICAgfVxuXG4gICAgb25Nb3VzZVVwKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzLCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBsYXRlciBpbiB0aGUgQm94IGFuZCBDb25uZWN0b3IgY2xhc3Nlc1xuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzLCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBsYXRlciBpbiB0aGUgQm94IGNsYXNzXG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCInanNvbicgZ2V0dGVyIGhhcyBub3QgYmVlbiBkZWZpbmVkIGZvciB0aGlzIGVsZW1lbnRcIiwgdGhpcyk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuXG4vLyBwYXJlbnQgY2xhc3MgZm9yIGlucHV0IGFuZCBvdXRwdXQgY29ubmVjdG9ycyAodGhlIHRoaW5ncyB5b3UgY2xpY2sgb25cbi8vIHdoZW4geW91IHdhbnQgdG8gY29ubmVjdCBlbGVtZW50cylcbmNsYXNzIENvbm5lY3RvciBleHRlbmRzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApIHsgLy8gdW5pdCBvZiBsZWZ0IC8gdG9wIGlzIHRoZSBzaXplIG9mIHRoZSBncmlkXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRyk7XG5cbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xuICAgICAgICB0aGlzLmNvbm5lY3RvclNpemUgPSBncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JPZmZzZXQgPSB0aGlzLmNvbm5lY3RvclNpemUgLyAyO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoXG4gICAgICAgICAgICBsZWZ0ICogdGhpcy5ncmlkU2l6ZSAtIHRoaXMuY29ubmVjdG9yT2Zmc2V0LFxuICAgICAgICAgICAgdG9wICogdGhpcy5ncmlkU2l6ZSAtIHRoaXMuY29ubmVjdG9yT2Zmc2V0LFxuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTaXplLFxuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTaXplLFxuICAgICAgICAgICAgXCJub25lXCIsXG4gICAgICAgICAgICBcImJsYWNrXCJcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnN2Z09iai4kZWwuYWRkQ2xhc3MoXCJjb25uZWN0b3JcIik7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBmYWxzZTtcblxuICAgICAgICAvLyBpZiBhIHdpcmUgY2FuIHNldCBjb25uZWN0b3IncyBzdGF0ZVxuICAgICAgICB0aGlzLmlzSW5wdXRDb25uZWN0b3IgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IExvZ2ljLnN0YXRlLnVua25vd247XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcblxuICAgICAgICB0aGlzLndpcmVJZHMgPSBuZXcgU2V0KCk7XG4gICAgfVxuXG4gICAgZ2V0IGlzT3V0cHV0Q29ubmVjdG9yKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNJbnB1dENvbm5lY3RvcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnB1dENvbm5lY3RvcjogMCxcbiAgICAgICAgICAgIG91dHB1dENvbm5lY3RvcjogMVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkV2lyZUlkKHdpcmVJZCkge1xuICAgICAgICB0aGlzLndpcmVJZHMuYWRkKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZUlkKHdpcmVJZCkge1xuICAgICAgICB0aGlzLndpcmVJZHMuZGVsZXRlKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlcyB0aGUgd2lyZSBhbmQgdXBkYXRlcyB0aGUgY29ubmVjdG9yXG4gICAgcmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVdpcmVJZCh3aXJlSWQpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlLCBwcm9wYWdhdGlvbklkKSB7XG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLnVua25vd246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vZmY6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9mZik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IHN0YXRlO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVBdHRyO1xuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqO1xuICAgIH1cblxuICAgIG9uTW91c2VVcCgpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcud2lyZUNyZWF0aW9uSGVscGVyKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dENvbm5lY3RvciBleHRlbmRzIENvbm5lY3RvciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG5cblxuICAgICAgICB0aGlzLnR5cGUgPSBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3RvcjtcbiAgICAgICAgdGhpcy5pc0lucHV0Q29ubmVjdG9yID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc2V0U3RhdGUgb24nLCB0aGlzLmlkKVxuXG4gICAgICAgIHN1cGVyLnNldFN0YXRlKHN0YXRlKTtcblxuICAgICAgICBsZXQgZ2F0ZSA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQodGhpcy5zdmdPYmouaWQpO1xuICAgICAgICBnYXRlLnJlZnJlc2hTdGF0ZSgpO1xuICAgIH1cblxuICAgIHJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpIHtcbiAgICAgICAgc3VwZXIucmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoTG9naWMuc3RhdGUudW5rbm93bik7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIuc3RhdGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0Q29ubmVjdG9yIGV4dGVuZHMgQ29ubmVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApIHtcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKTtcblxuICAgICAgICAvLyB1c2VkIHRvIHNldCB0aGUgd2lyZSBzdGF0ZSBkdXJpbmcgd2lyZSBpbml0aWFsaXphdGlvbiBiYXNlZCBvbiB0aGUgb3V0cHV0IGNvbm5lY3RvciBzdGF0ZVxuICAgICAgICB0aGlzLmlzT3V0cHV0ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnR5cGUgPSBDb25uZWN0b3IudHlwZS5vdXRwdXRDb25uZWN0b3I7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3VwZXIuc2V0U3RhdGUoc3RhdGUpO1xuXG4gICAgICAgIGZvciAoY29uc3Qgd2lyZUlkIG9mIHRoaXMud2lyZUlkcykge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZ2V0V2lyZUJ5SWQod2lyZUlkKS5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGF0ZTtcbiAgICB9XG59XG5cbi8vIHBhcmVudCBjbGFzcyBmb3IgZ2F0ZXMgYW5kIGlucHV0IGFuZCBvdXRwdXQgYm94ZXNcbmNsYXNzIEJveCBleHRlbmRzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIG5hbWUsIGNhdGVnb3J5LCBncmlkV2lkdGgsIGdyaWRIZWlnaHQpIHtcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSB0aGlzLnBhcmVudFNWRy5ncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLnVybCA9IFwiaW1nL1wiICsgdGhpcy5jYXRlZ29yeSArIFwiL1wiICsgdGhpcy5uYW1lICsgXCIuc3ZnXCI7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0b3JzID0gW107XG5cbiAgICAgICAgdGhpcy5zdmdPYmogPSBuZXcgc3ZnT2JqLkdyb3VwKCk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IGdyaWRXaWR0aCAqIHRoaXMuZ3JpZFNpemU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZ3JpZEhlaWdodCAqIHRoaXMuZ3JpZFNpemU7XG5cbiAgICAgICAgdGhpcy5ncmlkV2lkdGggPSBncmlkV2lkdGg7XG4gICAgICAgIHRoaXMuZ3JpZEhlaWdodCA9IGdyaWRIZWlnaHQ7XG5cbiAgICAgICAgLy8gdHJhbnNwYXJlbnQgYmFja2dyb3VuZCByZWN0YW5nbGVcbiAgICAgICAgbGV0IHJlY3RhbmdsZSA9IG5ldyBzdmdPYmouUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBcIm5vbmVcIiwgXCJub25lXCIpO1xuICAgICAgICByZWN0YW5nbGUuJGVsLmFkZENsYXNzKCdyZWN0Jyk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENoaWxkKHJlY3RhbmdsZSk7XG4gICAgICAgIC8vIGltYWdlIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgc3ZnT2JqLlN2Z0ltYWdlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLnVybCk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENoaWxkKHRoaXMuaW1hZ2UpO1xuXG4gICAgICAgIC8vIGFkZCBkcmFnZ2FiaWxpdHkgYW5kIHJvdGF0YWJpbGl0eVxuICAgICAgICB0aGlzLnN2Z09iai5kcmFnZ2FibGUodHJ1ZSk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLnJvdGF0YWJsZSh0cnVlKTtcblxuICAgICAgICAvLyBhZGQgdHlwZT1cImdhdGVcIiwgdXNlZCBpbiBzcGVjaWFsIGNhbGxiYWNrcyBpbiBjb250ZXh0bWVudVxuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInR5cGVcIjogY2F0ZWdvcnl9KTtcblxuICAgICAgICB0aGlzLnN2Z09iai4kZWwuYWRkQ2xhc3MoXCJib3hcIik7XG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhjYXRlZ29yeSk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZUJsb2NrTm9kZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXRDb25uZWN0b3JzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JzLmZpbHRlcihjb25uID0+IGNvbm4uaXNJbnB1dENvbm5lY3RvcilcbiAgICB9XG5cbiAgICBnZXQgb3V0cHV0Q29ubmVjdG9ycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9ycy5maWx0ZXIoY29ubiA9PiBjb25uLmlzT3V0cHV0Q29ubmVjdG9yKVxuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICBsZXQgY29ubmVjdGlvbnMgPSBbXTtcblxuICAgICAgICAvLyBnbyB0aHJvdWdoIGFsbCBjb25uZWN0b3JzXG4gICAgICAgIGxldCBjb3VudGVyID0gMFxuICAgICAgICBmb3IgKGNvbnN0IGNvbm4gb2YgdGhpcy5jb25uZWN0b3JzKSB7XG4gICAgICAgICAgICAvLyBnbyB0aHJvdWdoIGVhY2ggaXRzIHdpcmUgaWRcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjb25uLndpcmVJZHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGhpc1dpcmVJZDtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkTWFwLmhhcyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgd2lyZSBpZCBpcyBub3QgaW4gdGhlIG1hcCwgYWRkIGl0IGFuZCBhc3NpZ24gbmV3IGFyYml0cmFyeSBpZFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuc2V0KGl0ZW0sIHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNXaXJlSWQgPSB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVsc2UgZ2V0IGlkIGZyb20gdGhlIG1hcFxuICAgICAgICAgICAgICAgICAgICB0aGlzV2lyZUlkID0gdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkTWFwLmdldChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGlzIGNvbm5lY3Rpb24gdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uc1tjb25uZWN0aW9ucy5sZW5ndGhdID0ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogY291bnRlcixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogY29ubi50eXBlLFxuICAgICAgICAgICAgICAgICAgICB3aXJlSWQ6IHRoaXNXaXJlSWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcisrXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgLy8gaWQ6IHRoaXMuc3ZnT2JqLmlkLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuZ2V0VHJhbnNmb3JtKCksXG4gICAgICAgICAgICBjb25uZWN0aW9uczogY29ubmVjdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMobWFyZ2luVG9wID0gMCwgbWFyZ2luUmlnaHQgPSAwLCBtYXJnaW5Cb3R0b20gPSAwLCBtYXJnaW5MZWZ0ID0gMCwgLi4uc3BlY2lhbE5vZGVzKSB7XG4gICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IobGV0IHggPSBtYXJnaW5MZWZ0IDsgeCA8PSB0aGlzLmdyaWRXaWR0aCAtIG1hcmdpblJpZ2h0IDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IHkgPSBtYXJnaW5Ub3AgOyB5IDw9IHRoaXMuZ3JpZEhlaWdodCAtIG1hcmdpbkJvdHRvbSA7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2Ygc3BlY2lhbE5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5hZGQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uLCByZWRlZmluZWQgaW4gaW5oZXJpdGVkIGVsZW1lbnRzXG4gICAgICAgIC8vIHJlZnJlc2hTdGF0ZSB0YWtlcyBpbnB1dCBjb25uZWN0b3IgdmFsdWVzIGFuZCBzZXRzIG91dHB1dCB2YWx1ZXMgYWNjb3JkaW5nbHlcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ2FsbGluZyB0aGUgdmlydHVhbCBmdW5jdGlvbiByZWZyZXNoU3RhdGUgaGFzIG5vIGVmZmVjdC5cIik7XG4gICAgfVxuXG4gICAgLy8gdXNhZ2U6IGNoYW5nZUltYWdlKFwiYWJjXCIpIGNoYW5nZXMgaW1hZ2UgdXJsIHRvIGltYWdlLWFiYy5zdmdcbiAgICAvLyAgICAgICAgY2hhbmdlSW1hZ2UoKSBjaGFuZ2VzIGltYWdlIHVybCB0byB0aGUgZGVmYXVsdCBvbmUgKGltYWdlLnN2ZylcbiAgICBjaGFuZ2VJbWFnZShzdWZmaXgpIHtcbiAgICAgICAgaWYoc3VmZml4ID09PSB1bmRlZmluZWQgfHwgc3VmZml4ID09PSBcIlwiKSB7XG4gICAgICAgICAgICBzdWZmaXggPSBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VmZml4ID0gXCItXCIgKyBzdWZmaXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cmwgPSBcImltZy9cIiArIHRoaXMuY2F0ZWdvcnkgKyBcIi9cIiArIHRoaXMubmFtZSArIHN1ZmZpeCArIFwiLnN2Z1wiO1xuXG4gICAgICAgIHRoaXMuaW1hZ2UuY2hhbmdlVXJsKHRoaXMudXJsKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGEgalF1ZXJ5IG9iamVjdFxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqLmdldCgpO1xuICAgIH1cblxuICAgIHJlbW92ZUJsb2NrZWROb2RlKHgsIHkpIHtcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuYmxvY2tlZE5vZGVzKSB7XG4gICAgICAgICAgICBpZihpdGVtLng9PT14ICYmIGl0ZW0ueT09PXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5kZWxldGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByb3RhdGVCbG9ja2VkTm9kZXNSaWdodCgpIHtcbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbj09PXVuZGVmaW5lZCB8fCB0aGlzLnJvdGF0aW9uPT09NCkge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3RhdGlvbisrO1xuXG4gICAgICAgIGlmKHRoaXMucm90YXRpb24gPT09IDEgfHwgdGhpcy5yb3RhdGlvbiA9PT0gMykge1xuICAgICAgICAgICAgbGV0IG5ld0Jsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3QmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IE1hdGguYWJzKGl0ZW0ueSAtIHRoaXMuZ3JpZEhlaWdodCksXG4gICAgICAgICAgICAgICAgICAgIHk6IGl0ZW0ueFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2RlcyA9IG5ld0Jsb2NrZWROb2RlcztcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMucm90YXRpb24gPT09IDIgfHwgdGhpcy5yb3RhdGlvbiA9PT0gNCkge1xuICAgICAgICAgICAgbGV0IG5ld0Jsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3QmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IE1hdGguYWJzKGl0ZW0ueSAtIHRoaXMuZ3JpZFdpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgeTogaXRlbS54XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3QmxvY2tlZE5vZGVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ29ubmVjdG9yKGxlZnQsIHRvcCwgY29ubmVjdG9yVHlwZSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmNvbm5lY3RvcnMubGVuZ3RoO1xuICAgICAgICBpZihjb25uZWN0b3JUeXBlPT09Q29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1tpbmRleF0gPSBuZXcgSW5wdXRDb25uZWN0b3IodGhpcy5wYXJlbnRTVkcsIHRoaXMuZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbaW5kZXhdID0gbmV3IE91dHB1dENvbm5lY3Rvcih0aGlzLnBhcmVudFNWRywgdGhpcy5ncmlkU2l6ZSwgbGVmdCwgdG9wKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN2Z09iai5hZGRDaGlsZCh0aGlzLmNvbm5lY3RvcnNbaW5kZXhdLmdldCgpKTtcblxuICAgICAgICB0aGlzLnJlbW92ZUJsb2NrZWROb2RlKGxlZnQsIHRvcCk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0aGUgY29ubmVjdG9yIG9iamVjdCBiYXNlZCBvbiBpdHMgaWRcbiAgICBnZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5jb25uZWN0b3JzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5jb25uZWN0b3JzW2ldLmlkPT09Y29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIGNvbm5lY3RvciBub3QgZm91bmQsIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm07XG4gICAgICAgIGlmICghdGhpcy5zdmdPYmouJGVsLmF0dHIoXCJ0cmFuc2Zvcm1cIikpIHtcbiAgICAgICAgICAgIC8vIHRoZSBlbGVtZW50IGRvZXMgbm90IGhhdmUgYSBcInRyYW5zZm9ybVwiIHByb3BlcnR5IC0tPiBjcmVhdGUgaXRcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybS5zZXRUcmFuc2xhdGUoMCwgMCk7XG4gICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInRyYW5zZm9ybVwiOiB0cmFuc2Zvcm0uZ2V0KCl9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoZSBlbGVtZW50IGRvZXMgaGF2ZSBhIFwidHJhbnNmb3JtXCIgcHJvcGVydHkgLS0+IGNoYW5nZSBpdFxuICAgICAgICAgICAgdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSh0aGlzLnN2Z09iai4kZWwuYXR0cihcInRyYW5zZm9ybVwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybTtcbiAgICB9XG5cbiAgICBzZXRUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuICAgIH1cblxuICAgIG9uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubW91c2VMZWZ0ID0gZmFsc2U7XG4gICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTGVmdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VEb3duTGVmdChldmVudCk7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIERPTSBlbGVtZW50IHRvIGZyb250XG4gICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5tb3ZlVG9Gcm9udEJ5SWQodGhpcy5zdmdPYmouaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd25MZWZ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMubW91c2VNb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuXG4gICAgICAgIC8vIHNhdmUgdGhlIGN1cnJlbnQgaXRlbSBwb3NpdGlvbiBpbnRvIGEgdmFyaWFibGVcbiAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IHRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoKTtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgbW91c2Ugb2Zmc2V0IGZyb20gdGhlIG9iamVjdCBvcmlnaW5cbiAgICAgICAgdGhpcy5vZmZzZXQgPSB7XG4gICAgICAgICAgICB4OiBldmVudC5wYWdlWCAtIGN1cnJlbnRQb3NpdGlvbi54LFxuICAgICAgICAgICAgeTogZXZlbnQucGFnZVkgLSBjdXJyZW50UG9zaXRpb24ueVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMubW91c2VMZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBsZXQgbGVmdCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5vZmZzZXQueDtcbiAgICAgICAgICAgIGxldCB0b3AgPSBldmVudC5wYWdlWSAtIHRoaXMub2Zmc2V0Lnk7XG5cbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZShsZWZ0LCB0b3ApO1xuXG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZVVwKGV2ZW50KSB7XG4gICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxKSB7XG4gICAgICAgICAgICBpZih0aGlzLm1vdXNlTW92ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRHJvcChldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSAyICkge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrTWlkZGxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyb3AoZXZlbnQpIHtcbiAgICAgICAgbGV0IGxlZnQgPSBldmVudC5wYWdlWCAtIHRoaXMub2Zmc2V0Lng7XG4gICAgICAgIGxldCB0b3AgPSBldmVudC5wYWdlWSAtIHRoaXMub2Zmc2V0Lnk7XG5cbiAgICAgICAgbGVmdCA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQobGVmdCk7XG4gICAgICAgIHRvcCA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodG9wKTtcblxuICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZShsZWZ0LCB0b3ApO1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVXaXJlcygpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uLCB3aWxsIGJlIHJlZGVmaW5lZCBpbiBJbnB1dEJveFxuICAgIH1cblxuICAgIG9uQ2xpY2tNaWRkbGUoKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5zdmdPYmouJGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGxldCBjZW50cmVYID0gTWF0aC5yb3VuZChyZWN0LndpZHRoIC8gMik7XG4gICAgICAgIGxldCBjZW50cmVZID0gTWF0aC5yb3VuZChyZWN0LmhlaWdodCAvIDIpO1xuXG4gICAgICAgIGNlbnRyZVggLT0gY2VudHJlWCAlIHRoaXMuZ3JpZFNpemU7XG4gICAgICAgIGNlbnRyZVkgLT0gY2VudHJlWSAlIHRoaXMuZ3JpZFNpemU7XG5cbiAgICAgICAgdHJhbnNmb3JtLnJvdGF0ZVJpZ2h0KFxuICAgICAgICAgICAgY2VudHJlWCxcbiAgICAgICAgICAgIGNlbnRyZVlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInRyYW5zZm9ybVwiOiB0cmFuc2Zvcm0uZ2V0KCl9KTtcblxuICAgICAgICB0aGlzLnJvdGF0ZUJsb2NrZWROb2Rlc1JpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVXaXJlcygpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZXMgYWxsIHdpcmVzIGNvbm5lY3RlZCB0byB0aGlzIGJveFxuICAgIHVwZGF0ZVdpcmVzKHRlbXBvcmFyeSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdG9ycy5mb3JFYWNoKGNvbm4gPT4ge1xuICAgICAgICAgICAgY29ubi53aXJlSWRzLmZvckVhY2god2lyZUlkID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgd2lyZSA9IHRoaXMucGFyZW50U1ZHLmdldFdpcmVCeUlkKHdpcmVJZCk7XG4gICAgICAgICAgICAgICAgaWYodGVtcG9yYXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHdpcmUudGVtcG9yYXJ5V2lyZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpcmUucm91dGVXaXJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dEJveCBleHRlbmRzIEJveCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBpc09uID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA3O1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA0O1xuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgXCJpbnB1dFwiLCBcImlvXCIsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKHdpZHRoLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5vdXRwdXRDb25uZWN0b3IpO1xuXG4gICAgICAgIHRoaXMub24gPSBpc09uO1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHN1cGVyLmV4cG9ydERhdGE7XG4gICAgICAgIGRhdGEuaXNPbiA9IHRoaXMuaXNPbjtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKCkge1xuICAgICAgICBzdXBlci5nZW5lcmF0ZUJsb2NrTm9kZXMoMCwgMSwgMSwgMCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICAvLyBzdGFydCBhIG5ldyBzaW11bGF0aW9uIGZyb20gdGhlIG91dHB1dCBjb25uZWN0b3JcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcuc3RhcnROZXdTaW11bGF0aW9uKHRoaXMuY29ubmVjdG9yc1swXSwgdGhpcy5jb25uZWN0b3JzWzBdLnN0YXRlKVxuICAgIH1cblxuICAgIHNldCBvbihpc09uKSB7XG4gICAgICAgIGlmIChpc09uKSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9uXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib25cIik7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMuc3RhdGUub24pO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU3RhdGUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdHVybiBvZmZcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5zdGF0ZS5vZmYpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU3RhdGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc09uID0gaXNPbjtcbiAgICB9XG5cbiAgICBnZXQgb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzT247XG4gICAgfVxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgdGhpcy5vbiA9ICF0aGlzLm9uO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dEJveCBleHRlbmRzIEJveCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gNTtcblxuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIFwib3V0cHV0XCIsIFwiaW9cIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gMiwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuICAgIH1cblxuICAgIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmNvbm5lY3RvcnNbMF0uc3RhdGUpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub246XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9uXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vZmY6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9mZlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvc2NcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAwLCAwLCAxKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYXRlIGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIG5hbWUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA5O1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA0O1xuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgbmFtZSwgXCJnYXRlXCIsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIC8vIG91dHB1dFxuICAgICAgICB0aGlzLmFkZENvbm5lY3Rvcih3aWR0aCwgaGVpZ2h0IC8gMiwgQ29ubmVjdG9yLnR5cGUub3V0cHV0Q29ubmVjdG9yKTtcblxuICAgICAgICBpZih0aGlzLm5hbWU9PT1cIm5vdFwiKSB7XG4gICAgICAgICAgICAvLyBpbnB1dFxuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gMiwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaW5wdXRcbiAgICAgICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKDAsIGhlaWdodCAvIDQsIENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKDAsIGhlaWdodCAvICg0LzMpLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIGFkZCBvbmUgYmxvY2tlZE5vZGUgYmV0d2VlbiB0aGUgaW5wdXRzIChmb3IgYmV0dGVyIGxvb2tpbmcgd2lyaW5nKVxuICAgICAgICAgICAgLy8gYW5kIHJlZ2VuZXJhdGUgYmxvY2tlZCBub2Rlc1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUJsb2NrTm9kZXMoe1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogaGVpZ2h0IC8gMlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcyhzcGVjaWFsTm9kZSkge1xuICAgICAgICBpZihzcGVjaWFsTm9kZSE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDAsIDEsIHNwZWNpYWxOb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAxLCAwLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gTG9naWMuc3RhdGUudW5rbm93blxuICAgICAgICBzd2l0Y2ggKHRoaXMubmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLmFuZCh0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJuYW5kXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMubmFuZCh0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub3JcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5ub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibm90XCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMubm90KHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLm9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInhub3JcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy54bm9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLnhvcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBub3RpZnkgdGhlIHNpbXVsYXRvciBhYm91dCB0aGlzIGNoYW5nZVxuICAgICAgICB0aGlzLnBhcmVudFNWRy5zaW11bGF0aW9uLm5vdGlmeUNoYW5nZSh0aGlzLmNvbm5lY3RvcnNbMF0uaWQsIHN0YXRlKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdpcmUgZXh0ZW5kcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBmcm9tSWQsIHRvSWQsIGdyaWRTaXplLCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICAvLyBzbWFsbCB0b2RvOiByZXdvcmsgc3RhcnQuLi4gZW5kLi4uIHRvIGFycmF5cz8gKG5vdCBpbXBvcnRhbnQpXG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHKTtcblxuICAgICAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XG5cbiAgICAgICAgdGhpcy5mcm9tSWQgPSBmcm9tSWQ7XG4gICAgICAgIHRoaXMudG9JZCA9IHRvSWQ7XG5cbiAgICAgICAgdGhpcy5zdGFydEJveCA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQoZnJvbUlkKTtcbiAgICAgICAgdGhpcy5lbmRCb3ggPSB0aGlzLnBhcmVudFNWRy5nZXRCb3hCeUNvbm5lY3RvcklkKHRvSWQpO1xuXG4gICAgICAgIHRoaXMuYm94ZXMgPSBbdGhpcy5zdGFydEJveCwgdGhpcy5lbmRCb3hdXG5cbiAgICAgICAgdGhpcy5zdGFydENvbm5lY3RvciA9IHRoaXMucGFyZW50U1ZHLmdldENvbm5lY3RvckJ5SWQoZnJvbUlkKTtcbiAgICAgICAgdGhpcy5lbmRDb25uZWN0b3IgPSB0aGlzLnBhcmVudFNWRy5nZXRDb25uZWN0b3JCeUlkKHRvSWQpO1xuXG4gICAgICAgIHRoaXMuY29ubmVjdG9ycyA9IFt0aGlzLnN0YXJ0Q29ubmVjdG9yLCB0aGlzLmVuZENvbm5lY3Rvcl1cbiAgICAgICAgdGhpcy5yb3V0ZVdpcmUodHJ1ZSwgcmVmcmVzaCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBMb2dpYy5zdGF0ZS51bmtub3duO1xuXG4gICAgICAgIGZvciAobGV0IGNvbm5lY3RvciBvZiB0aGlzLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgICAgIGlmKGNvbm5lY3Rvci5pc091dHB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoY29ubmVjdG9yLnN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcIndpcmVcIik7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcm9tSWQ6IHRoaXMuZnJvbUlkLFxuICAgICAgICAgICAgdG9JZDogdGhpcy50b0lkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9uOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub2ZmKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0Q29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZW5kQ29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kQ29ubmVjdG9yLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUF0dHI7XG4gICAgfVxuXG4gICAgdXBkYXRlV2lyZVN0YXRlKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGJveCBvZiB0aGlzLmJveGVzKSB7XG4gICAgICAgICAgICBib3gucmVmcmVzaFN0YXRlKClcbiAgICAgICAgfVxuICAgICAgICAvLyBmb3IgKGNvbnN0IGNvbm4gb2YgdGhpcy5jb25uZWN0b3JzKSB7XG4gICAgICAgIC8vICAgICBpZihjb25uLmlzT3V0cHV0Q29ubmVjdG9yKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5wYXJlbnRTVkcuc3RhcnROZXdTaW11bGF0aW9uKGNvbm4uaWQsIGNvbm4uc3RhdGUpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iai5nZXQoKTtcbiAgICB9XG5cbiAgICBnZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCkge1xuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpO1xuICAgICAgICBwb2ludHMuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLndpcmVTdGFydC54LCB0aGlzLndpcmVTdGFydC55KSk7XG4gICAgICAgIHBvaW50cy5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMud2lyZUVuZC54LCB0aGlzLndpcmVFbmQueSkpO1xuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIHRlbXBvcmFyeVdpcmUoKSB7XG4gICAgICAgIHRoaXMud2lyZVN0YXJ0ID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLnN0YXJ0Q29ubmVjdG9yLCBmYWxzZSk7XG4gICAgICAgIHRoaXMud2lyZUVuZCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5lbmRDb25uZWN0b3IsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLnNldFdpcmVQYXRoKHRoaXMuZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cygpKTtcblxuICAgICAgICAvLyB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgIC8vIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICB9XG5cbiAgICByb3V0ZVdpcmUoc25hcFRvR3JpZCA9IHRydWUsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHRoaXMud2lyZVN0YXJ0ID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLnN0YXJ0Q29ubmVjdG9yLCBzbmFwVG9HcmlkKTtcbiAgICAgICAgdGhpcy53aXJlRW5kID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLmVuZENvbm5lY3Rvciwgc25hcFRvR3JpZCk7XG5cbiAgICAgICAgdGhpcy5wb2ludHMgPSB0aGlzLmFTdGFyKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IHRoaXMud2lyZVN0YXJ0LnggLyB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMud2lyZVN0YXJ0LnkgLyB0aGlzLmdyaWRTaXplXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IHRoaXMud2lyZUVuZC54IC8gdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLndpcmVFbmQueSAvIHRoaXMuZ3JpZFNpemVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0V2lyZVBhdGgodGhpcy5wb2ludHMpO1xuXG4gICAgICAgIGlmIChyZWZyZXNoKVxuICAgICAgICAgICAgdGhpcy51cGRhdGVXaXJlU3RhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRXaXJlUGF0aChwb2ludHMpIHtcbiAgICAgICAgLy8gc2V0IHRoZSBsaW5lXG4gICAgICAgIGlmKHRoaXMuc3ZnT2JqIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN2Z09iai51cGRhdGVQb2ludHMocG9pbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqID0gbmV3IHN2Z09iai5Qb2x5TGluZShwb2ludHMsIFwiIzhiOGI4YlwiLCAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1xuICAgICAgICAgICAgZnJvbUlkOiB0aGlzLmZyb21JZCxcbiAgICAgICAgICAgIHRvSWQ6IHRoaXMudG9JZFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLy8gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gdGhpcyBwc2V1ZG9jb2RlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BKl9zZWFyY2hfYWxnb3JpdGhtI1BzZXVkb2NvZGVcbiAgICBhU3RhcihzdGFydCwgZW5kKSB7XG4gICAgICAgIC8vIG51bWJlciBvZiBub2RlcywgdGhhdCBjYW4gYmUgb3BlbmVkIGF0IG9uY2VcbiAgICAgICAgLy8gb25jZSBpcyB0aGlzIGxpbWl0IGV4Y2VlZGVkLCBhU3RhciB3aWxsIGZhaWwgYW5kIGdldFRlbXBvcmFyeVdpcmVQb2ludHMgd2lsbCBiZSB1c2VkIGluc3RlYWRcbiAgICAgICAgY29uc3QgbWF4Tm9kZUxpbWl0ID0gNTAwMDA7XG5cbiAgICAgICAgbGV0IGNsb3NlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBsZXQgb3Blbk5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBvcGVuTm9kZXMuYWRkKHN0YXJ0KTtcblxuICAgICAgICBsZXQgY2FtZUZyb20gPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB2YWx1ZTogaW5maW5pdHlcbiAgICAgICAgbGV0IGdTY29yZSA9IG5ldyBTdHJ1Y3R1cmVzLk1hcFdpdGhEZWZhdWx0VmFsdWUoSW5maW5pdHkpO1xuICAgICAgICBnU2NvcmUuc2V0KHN0YXJ0LCAwKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHZhbHVlOiBpbmZpbml0eVxuICAgICAgICBsZXQgZlNjb3JlID0gbmV3IFN0cnVjdHVyZXMuTWFwV2l0aERlZmF1bHRWYWx1ZShJbmZpbml0eSk7XG4gICAgICAgIGZTY29yZS5zZXQoc3RhcnQsIFdpcmUubWFuaGF0dGFuRGlzdGFuY2Uoc3RhcnQsIGVuZCkpO1xuXG4gICAgICAgIGxldCBub25Sb3V0YWJsZSA9IHRoaXMucGFyZW50U1ZHLmdldE5vblJvdXRhYmxlTm9kZXMoKTtcbiAgICAgICAgbGV0IHB1bmlzaGVkQnV0Um91dGFibGU7XG4gICAgICAgIGlmKHRoaXMuc3ZnT2JqPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwdW5pc2hlZEJ1dFJvdXRhYmxlID0gdGhpcy5wYXJlbnRTVkcuZ2V0SW5jb252ZW5pZW50Tm9kZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB1bmlzaGVkQnV0Um91dGFibGUgPSB0aGlzLnBhcmVudFNWRy5nZXRJbmNvbnZlbmllbnROb2Rlcyh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAob3Blbk5vZGVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGU7XG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGVGU2NvcmU7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHZhbHVlIGZyb20gb3Blbk5vZGVzIHRoYXQgaGFzIHRoZSBsb3dlc3QgZlNjb3JlXG4gICAgICAgICAgICAvLyAoY2FuIGJlIGltcGxlbWVudGVkIGVmZmVjdGl2ZWx5IHVzaW5nIG1pbi1oZWFwIGRhdGEgc3RydWN0dXJlIChtYXliZSB0b2RvIHNvbWV0aW1lKT8pXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygb3Blbk5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYoIWN1cnJlbnROb2RlIHx8IGZTY29yZS5nZXQobm9kZSkgPCBjdXJyZW50Tm9kZUZTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlRlNjb3JlID0gZlNjb3JlLmdldChjdXJyZW50Tm9kZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHN2Z09iai5Qb2x5bGluZVBvaW50LmVxdWFscyhjdXJyZW50Tm9kZSwgZW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY29uc3RydWN0UGF0aChjYW1lRnJvbSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcGVuTm9kZXMuZGVsZXRlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIGNsb3NlZE5vZGVzLmFkZChjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAgIC8vIHRoZSBmYXJ0aGVzdCBwb2ludHMgYWNjZXNzaWJsZSB3aXRob3V0IGF2b2lkaW5nIG9ic3RhY2xlcyBpbiBldmVyeSBkaXJlY3Rpb25cbiAgICAgICAgICAgIC8vIChidXQgbWF4IDUwIGluIGVhY2ggZGlyZWN0aW9uKVxuICAgICAgICAgICAgZm9yKGxldCBkaXJlY3Rpb24gPSAwIDsgZGlyZWN0aW9uIDwgNCA7IGRpcmVjdGlvbisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvaW50ID0gV2lyZS5tb3ZlUG9pbnQoY3VycmVudE5vZGUsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCA1MCA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXdQb2ludCBpcyBpbiB0aGUgc2V0IG9mIG5vbiByb3V0YWJsZSBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGFkZCBpdCBhbmQgc3RvcCBwcm9jZWVkaW5nIGluIHRoaXMgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KG5vblJvdXRhYmxlLCB0aGlzLnNjYWxlUG9pbnRUb0dyaWQobmV3UG9pbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBza2lwIHRoaXMgbm9kZSwgaWYgaXQgaGFzIGJlZW4gYWxyZWFkeSBjbG9zZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gb3IgaWYgaXQgaXMgb24gdGhlIGxpc3Qgb2Ygbm9uIHJvdXRhYmxlIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZWROb2Rlcy5oYXMobmV3UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3Blbk5vZGVzLmhhcyhuZXdQb2ludCkueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3Blbk5vZGVzLmFkZChuZXdQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgcG9zc2libGUgR1Njb3JlIGJ5IGFkZGluZyAxIHRvIHRoZSBzY29yZSBvZiB0aGUgbm9kZSB3ZSBjYW1lIGZyb21cbiAgICAgICAgICAgICAgICAgICAgLy8gKHdlIHByaW9yaXRpemUgdG8gbWluaW1pemUgdGhlIG51bWJlciBvZiBub2RlcyBhbmQgbm90IHRoZSBkaXN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gIHNvIHdlIGFyZSBhZGRpbmcgMSBvbiBhbGwgbm9kZXMsIGV2ZW4gaWYgdGhlIGV1Y2xpZGVhbiAvIG1hbm5oYXRhbiBkaXN0YW5jZSBtYXkgdmFyeSlcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluY3JlbWVudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkhPT0wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NzaWJsZUdTY29yZSA9IGdTY29yZS5nZXQoY3VycmVudE5vZGUpICsgaW5jcmVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KHB1bmlzaGVkQnV0Um91dGFibGUsIHRoaXMuc2NhbGVQb2ludFRvR3JpZChuZXdQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbm9kZSBpcyBpbiB0aGUgc2V0IG9mIHB1bmlzaGVkIG5vZGUsIHB1bmlzaCBpdCBieSBhZGRpbmcgdG8gdGhlIEdTY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVHU2NvcmUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZUdTY29yZSA+PSBnU2NvcmUuZ2V0KG5ld1BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYW1lRnJvbS5zZXQobmV3UG9pbnQsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgZ1Njb3JlLnNldChuZXdQb2ludCwgcG9zc2libGVHU2NvcmUpO1xuICAgICAgICAgICAgICAgICAgICBmU2NvcmUuc2V0KG5ld1BvaW50LCBwb3NzaWJsZUdTY29yZSArIFdpcmUubWFuaGF0dGFuRGlzdGFuY2UobmV3UG9pbnQsIGVuZCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5ld1BvaW50IGlzIGluIHRoZSBzZXQgb2YgcHVuaXNoZWQgYnV0IHJvdXRhYmxlIHBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGl0IGJ1dCBzdG9wIHByb2NlZWRpbmcgaW4gdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoV2lyZS5zZXRIYXNUaGlzUG9pbnQocHVuaXNoZWRCdXRSb3V0YWJsZSwgdGhpcy5zY2FsZVBvaW50VG9HcmlkKG5ld1BvaW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSB0byB0aGUgbmV4dCBwb2ludCBpbiB0aGUgZGlyZWNpdG9uXG4gICAgICAgICAgICAgICAgICAgIG5ld1BvaW50ID0gV2lyZS5tb3ZlUG9pbnQobmV3UG9pbnQsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihvcGVuTm9kZXMuc2l6ZSA+IG1heE5vZGVMaW1pdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHdlIGdvdCBoZXJlLCB0aGUgcGF0aCBkb2VzIG5vdCBleGlzdCAtPiBsZXQncyB1c2UgdGVtcG9yYXJ5IHBhdGggaWdub3JpbmcgYWxsIGNvbGlzaW9uc1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCk7XG4gICAgfVxuICAgIHN0YXRpYyBtb3ZlUG9pbnQocG9pbnQsIGRpcmVjdGlvbikge1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAwOiAvLyB1cFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgLSAxXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgMTogLy8gcmlnaHRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDI6IC8vIGRvd25cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55ICsgMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDM6IC8vIGxlZnRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2NhbGVQb2ludFRvR3JpZChwb2ludCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcG9pbnQueCAqIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICB5OiBwb2ludC55ICogdGhpcy5ncmlkU2l6ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjb25zdHJ1Y3RQYXRoKGNhbWVGcm9tLCBjdXJyZW50Tm9kZSkge1xuICAgICAgICBsZXQgdG90YWxQYXRoID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpO1xuICAgICAgICB0b3RhbFBhdGguYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludChjdXJyZW50Tm9kZS54ICogdGhpcy5ncmlkU2l6ZSwgY3VycmVudE5vZGUueSAqIHRoaXMuZ3JpZFNpemUpKTtcblxuICAgICAgICB3aGlsZSAoY2FtZUZyb20uaGFzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjYW1lRnJvbS5nZXQoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgdG90YWxQYXRoLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoY3VycmVudE5vZGUueCAqIHRoaXMuZ3JpZFNpemUsIGN1cnJlbnROb2RlLnkgKiB0aGlzLmdyaWRTaXplKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG90YWxQYXRoO1xuICAgIH1cblxuICAgIHN0YXRpYyBtYW5oYXR0YW5EaXN0YW5jZShhLCBiKSB7XG4gICAgICAgIC8vIE1hbmhhdHRhbiBnZW9tZXRyeVxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoYS54IC0gYi54KSArIE1hdGguYWJzKGEueSAtIGIueSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEhhc1RoaXNQb2ludChzZXQsIHBvaW50KSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2Ygc2V0KSB7XG4gICAgICAgICAgICBpZihpdGVtLnggPT09IHBvaW50LnggJiYgaXRlbS55ID09PSBwb2ludC55KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldENvb3JkaW5hdGVzKGNvbm5lY3Rvciwgc25hcFRvR3JpZCA9IHRydWUpIHtcbiAgICAgICAgLy8gY29ubmVjdG9yLnN2Z09iai5pZCBoYXMgdG8gYmUgY2FsbGVkLCBlbHNlIHRoZSBnZXRDb29yZGluYXRlcyBkb2VzIG5vdCB3b3JrIG9uIHRoZSBmaXJzdCBjYWxsIGluIEZpcmVmb3ggNTVcbiAgICAgICAgbGV0IGR1bW15ID0gY29ubmVjdG9yLnN2Z09iai5pZDtcblxuICAgICAgICBsZXQgJGNvbm5lY3RvciA9IGNvbm5lY3Rvci5zdmdPYmouJGVsO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbiA9ICRjb25uZWN0b3IucG9zaXRpb24oKTtcbiAgICAgICAgbGV0IHdpZHRoID0gJGNvbm5lY3Rvci5hdHRyKFwid2lkdGhcIik7XG4gICAgICAgIGxldCBoZWlnaHQgPSAkY29ubmVjdG9yLmF0dHIoXCJoZWlnaHRcIik7XG5cbiAgICAgICAgbGV0IHggPSBwb3NpdGlvbi5sZWZ0ICsgd2lkdGggLyAyO1xuICAgICAgICBsZXQgeSA9IHBvc2l0aW9uLnRvcCArIGhlaWdodCAvIDI7XG4gICAgICAgIGlmKHNuYXBUb0dyaWQpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHgpO1xuICAgICAgICAgICAgeSA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQoeSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgQ29udGV4dE1lbnVJdGVtIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBjb250ZXh0TWVudSwgcGFyZW50U1ZHLCBjbGlja0Z1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUgPSBjb250ZXh0TWVudTtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG5cbiAgICAgICAgdGhpcy4kZWwgPSAkKFwiPGxpPlwiKTtcbiAgICAgICAgJCh0aGlzLiRlbClcbiAgICAgICAgICAgIC50ZXh0KG5hbWUpXG4gICAgICAgICAgICAuYXR0cihcInR5cGVcIiwgdHlwZSk7XG5cbiAgICAgICAgaWYoY2xpY2tGdW5jdGlvbikge1xuICAgICAgICAgICAgJCh0aGlzLiRlbCkuY2xpY2soXG4gICAgICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbGlja0Z1bmN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDbGFzcyhjbHMpIHtcbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoY2xzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYXBwZW5kSXRlbShpdGVtKSB7XG4gICAgICAgIGlmKCF0aGlzLnN1Ykxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViTGlzdCA9ICQoXCI8dWw+XCIpO1xuICAgICAgICAgICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMuc3ViTGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1Ykxpc3QuYXBwZW5kKGl0ZW0ualF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBnZXQgalF1ZXJ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWw7XG4gICAgfVxufVxuY2xhc3MgR2F0ZU1lbnVJdGVtIGV4dGVuZHMgQ29udGV4dE1lbnVJdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBjb250ZXh0TWVudSwgcGFyZW50U1ZHKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgdHlwZSwgLy8gbmFtZSBpcyB0aGUgdHlwZVxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIGNvbnRleHRNZW51LFxuICAgICAgICAgICAgcGFyZW50U1ZHLFxuICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogTWF0aC5yb3VuZChjb250ZXh0TWVudS5wb3NpdGlvbi54IC8gcGFyZW50U1ZHLmdyaWRTaXplKSAqIHBhcmVudFNWRy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKGNvbnRleHRNZW51LnBvc2l0aW9uLnkgLyBwYXJlbnRTVkcuZ3JpZFNpemUpICogcGFyZW50U1ZHLmdyaWRTaXplXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHBhcmVudFNWRy5uZXdHYXRlKFxuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi5sZWZ0LCAvLyB4IGNvb3JkaW5hdGVcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24udG9wIC8vIHkgY29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0TWVudSB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIGNvbnN0IGdhdGVzID0gW1wibm90XCIsIFwiYW5kXCIsIFwib3JcIiwgXCJuYW5kXCIsIFwibm9yXCIsIFwieG9yXCIsIFwieG5vclwiXTtcblxuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgeDogMCwgeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjx1bD5cIik7XG4gICAgICAgIHRoaXMuJGVsLmF0dHIoJ2lkJywgJ2NvbnRleHRNZW51Jyk7XG5cbiAgICAgICAgbGV0IGdhdGVMaXN0ID0gbmV3IENvbnRleHRNZW51SXRlbShcIk5ldyBnYXRlXCIsICcnLCB0aGlzLCBwYXJlbnRTVkcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBnYXRlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIGdhdGVMaXN0LmFwcGVuZEl0ZW0oXG4gICAgICAgICAgICAgICAgbmV3IEdhdGVNZW51SXRlbShnYXRlc1tpXSwgdGhpcywgcGFyZW50U1ZHKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcGVuZEl0ZW0oZ2F0ZUxpc3QpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kSXRlbShcbiAgICAgICAgICAgIG5ldyBDb250ZXh0TWVudUl0ZW0oXCJJbnB1dCBib3hcIiwgJycsIHRoaXMsIHBhcmVudFNWRyxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi54KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLnkpXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50U1ZHLm5ld0lucHV0KHBvc2l0aW9uLmxlZnQsIHBvc2l0aW9uLnRvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kSXRlbShuZXcgQ29udGV4dE1lbnVJdGVtKFwiT3V0cHV0IGJveFwiLCAnJywgdGhpcywgcGFyZW50U1ZHLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbGVmdDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLngpLFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLnkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwYXJlbnRTVkcubmV3T3V0cHV0KHBvc2l0aW9uLmxlZnQsIHBvc2l0aW9uLnRvcCk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLmFwcGVuZENvbmRpdGlvbmFsSXRlbSgnYm94JywgJ1JlbW92ZSB0aGlzIGl0ZW0nLCBpZCA9PiB7dGhpcy5wYXJlbnRTVkcucmVtb3ZlQm94KGlkKX0pO1xuICAgICAgICB0aGlzLmFwcGVuZENvbmRpdGlvbmFsSXRlbSgnd2lyZScsICdSZW1vdmUgdGhpcyB3aXJlJywgaWQgPT4ge3RoaXMucGFyZW50U1ZHLnJlbW92ZVdpcmVCeUlkKGlkKX0pO1xuXG4gICAgICAgIHBhcmVudFNWRy4kc3ZnLmJlZm9yZSh0aGlzLiRlbCk7XG4gICAgfVxuXG4gICAgYXBwZW5kSXRlbShpdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChpdGVtLmpRdWVyeSk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8vIGFwcGVuZHMgYW4gY29ubmRpdGlvbmFsIGl0ZW0gKHRoYXQgaXMgc2hvd24gb25seSBpZiB0aGUgdGFyZ2V0XG4gICAgLy8gaGFzIHRoZSBjbGFzcyBpdGVtQ2xhc3MpXG4gICAgLy8gY2xpY2tGdW5jdGlvbiB0YWtlcyBvbmUgYXJndW1lbnQ6IElEIG9mIHRoZSB0YXJnZXRcbiAgICBhcHBlbmRDb25kaXRpb25hbEl0ZW0oaXRlbUNsYXNzLCB0ZXh0LCBjbGlja0Z1bmN0aW9uKSB7XG4gICAgICAgIGlmKCF0aGlzLmNvbmRpdGlvbmFsSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW3RoaXMuY29uZGl0aW9uYWxJdGVtcy5sZW5ndGhdID0ge1xuICAgICAgICAgICAgaXRlbUNsYXNzOiBpdGVtQ2xhc3MsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgY2xpY2tGdW5jdGlvbjogY2xpY2tGdW5jdGlvblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVjaWRlcyB3aGV0aGVyIG9yIG5vdCB0byBkaXNwbGF5IHNwZWNpZmljIGNvbmRpdGlvbmFsIGl0ZW1zXG4gICAgcmVzb2x2ZUNvbmRpdGlvbmFsSXRlbXMoJHRhcmdldCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25kaXRpb25hbEl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZigkdGFyZ2V0Lmhhc0NsYXNzKHRoaXMuY29uZGl0aW9uYWxJdGVtc1tpXS5pdGVtQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ29udGV4dE1lbnVJdGVtKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW2ldLnRleHQsICcnLCB0aGlzLCB0aGlzLnBhcmVudFNWRyxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXNbaV0uY2xpY2tGdW5jdGlvbigkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKS5hZGRDbGFzcygnY29uZGl0aW9uYWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGhpZGVzIGFsbCBjb25kaXRpb25hbCBpdGVtc1xuICAgIGhpZGVBbGxDb25kaXRpb25hbEl0ZW1zKCkge1xuICAgICAgICB0aGlzLiRlbC5jaGlsZHJlbignLmNvbmRpdGlvbmFsJykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLy8gZGlzcGxheXMgdGhlIGNvbnRleHQgbWVudSB3aXRoIHRoZSByaWdodCBzZXQgb2YgY29uZGl0aW9uYWwgaXRlbXNcbiAgICBkaXNwbGF5KHgsIHksICR0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kZWwuY3NzKHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB0b3A6IHkgKyBcInB4XCIsXG4gICAgICAgICAgICBsZWZ0OiB4ICsgXCJweFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVzb2x2ZUNvbmRpdGlvbmFsSXRlbXMoJHRhcmdldCk7XG4gICAgfVxuXG4gICAgLy8gaGlkZXMgdGhlIGNvbnRleHQgbWVudVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNzcyh7ZGlzcGxheTogJ25vbmUnfSk7XG4gICAgICAgIHRoaXMuaGlkZUFsbENvbmRpdGlvbmFsSXRlbXMoKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNsYXNzIGV4cG9ydE5ldHdvcmsge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U1ZHLmV4cG9ydERhdGE7XG4gICAgfVxuXG4gICAganNvbihzdHlsZSA9IGV4cG9ydE5ldHdvcmsuc3R5bGUuY29tcGFjdCwgZGF0YVVyaSA9IGZhbHNlKSB7XG4gICAgICAgIGlmKGRhdGFVcmkpIHtcbiAgICAgICAgICAgIHJldHVybiAnZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgsJ1xuICAgICAgICAgICAgICAgICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuanNvbihzdHlsZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZXhwb3J0TmV0d29yay5zdHlsZS5jb21wYWN0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5leHBvcnREYXRhKTtcbiAgICAgICAgICAgICAgICBjYXNlIGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5leHBvcnREYXRhLCBudWxsLCAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgc3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmV0dHk6IDAsXG4gICAgICAgICAgICBjb21wYWN0OiAxXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgaW1wb3J0TmV0d29rIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIHN0cmluZykge1xuICAgICAgICBwYXJlbnRTVkcuaW1wb3J0RGF0YShcbiAgICAgICAgICAgIEpTT04ucGFyc2Uoc3RyaW5nKVxuICAgICAgICApO1xuICAgIH1cblxufSIsImltcG9ydCB7ZXhwb3J0TmV0d29yaywgaW1wb3J0TmV0d29rfSBmcm9tIFwiLi9pbXBvcnRFeHBvcnQuanNcIjtcblxuY2xhc3MganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Ioc3BlY2lmaWNUYWcpIHtcbiAgICAgICAgaWYoIXNwZWNpZmljVGFnKSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJChcIjxcIiArIHNwZWNpZmljVGFnICsgXCI+XCIpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIGNvbnN0IG1vdXNlSWNvbiA9XG4vLyAgICAgXCI8c3ZnIGNsYXNzPVxcXCJtb3VzZUljb25cXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgaGVpZ2h0PVxcXCIxMjEuNzcxMzFtbVxcXCIgd2lkdGg9XFxcIjgyLjMyNzU4M21tXFxcIiB2ZXJzaW9uPVxcXCIxLjFcXFwiIHZpZXdCb3g9XFxcIjAgMCAyOTEuNzExOTEgNDMxLjQ3MzE0XFxcIj5cIiArXG4vLyAgICAgXCI8ZyB0cmFuc2Zvcm09XFxcInRyYW5zbGF0ZSgtMjAyLjcwOTA4LC0yNjAuOTIzMilcXFwiPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGQ9XFxcIm0yMDIuODExMDggNDQzLjUwNjY3Yy0wLjEyNTcgMTEuMDU2ODMgMC4wNjUxIDEyLjEyOTE1IDAuMDUyOCAyMy4wOTM3NSAxLjA0MDQgMzkuMjkxNjUtNC4wMzI4MSA3OS41ODQyIDguODE0NDEgMTE3LjU2ODM2IDE3LjUyNjAyIDU4LjAwNzQyIDcwLjc2MTIgMTA3LjA3NzkzIDEzMy4xMjkwNyAxMDguMTE3MTkgNjAuODA0NDggMi42MTI0NyAxMTUuODA2MzgtNDEuNDg5MTIgMTM2LjY1MjQ5LTk2LjkzNTU1IDE1LjIxOTQyLTM0LjcwNTYxIDEyLjc0NDctNzIuODI2MzggMTIuODM0LTEwOS43MjI2Ni0wLjQwMzU2LTE3LjI0OTA1IDAuMjc0NTItMjQuNzMyOSAwLjA4NzktNDIuMTIxMDloLTI5MS41NzA2NnpcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwibGVmdFxcXCIgZD1cXFwibTMzNS42Nzc4OCAyNjAuOTMwMzJjLTU4LjY1MjUgMC42NTU2Ni05OS42MzE5IDQzLjUxMzg2LTEyMC4wODIxIDk2Ljk5MjE5LTEwLjU1MDUgMjQuMDYwMTItMTIuNTkzNSA0MS43Nzc5Ny0xMi44ODY3IDY3LjU4MjAzaDEzNS43ODMydi0xNjQuNTcyMjZjLTAuMDA2IDAuMDAwMDgtMC4wMTE3LTAuMDAwMDgtMC4wMTc2IDAtMC45MzQ3LTAuMDExLTEuODY1OC0wLjAxMjQtMi43OTY4LTAuMDAyelxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJyaWdodFxcXCIgZD1cXFwibTM2MS40Njc4NyAyNjAuOTI5OTNjLTAuOTQyMDctMC4wMS0xLjg4NjQtMC4wMDktMi44MzIwMyAwLjAwNHYxNjQuNTcyMjZoMTM1Ljc4NTE2Yy0wLjI2MjU3LTI0LjQ2OTQ4LTIuMjUyMS00MC43NDgyMy0xMS41MDM5MS02My45MDI0My0xOS4zNDcwOS01NS4wMzIyNS02MS43MzA0My0xMDAuMDQ1MjUtMTIxLjQ0OTIyLTEwMC42NzM4M3pcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwibWlkZGxlXFxcIiBkPVxcXCJtMzQ4LjU2NTA0IDI5NC45MzM2NWMxNS4wMzcxNCAwIDI3LjE0Mjg2IDEyLjEwNTcyIDI3LjE0Mjg2IDI3LjE0Mjg2djQwYzAgMTUuMDM3MTQtMTIuMTA1NzIgMjcuMTQyODYtMjcuMTQyODYgMjcuMTQyODZzLTI3LjE0Mjg2LTEyLjEwNTcyLTI3LjE0Mjg2LTI3LjE0Mjg2di00MGMwLTE1LjAzNzE0IDEyLjEwNTcyLTI3LjE0Mjg2IDI3LjE0Mjg2LTI3LjE0Mjg2elxcXCIgc3Ryb2tlPVxcXCIjZmZmXFxcIiBzdHJva2UtbGluZWNhcD1cXFwicm91bmRcXFwiIHN0cm9rZS13aWR0aD1cXFwiMjBcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgIDwvZz5cIiArXG4vLyAgICAgXCI8L3N2Zz5cIjtcblxuY2xhc3MgaGVscFdpbmRvd0l0ZW0gZXh0ZW5kcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoXCJoZWxwV2luZG93SXRlbVwiKTtcbiAgICAgICAgdGhpcy4kZWwuaHRtbCh0ZXh0KTtcbiAgICB9XG59XG5cbmNsYXNzIGhlbHBXaW5kb3cgZXh0ZW5kcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLiRlbC5hdHRyKFwiaWRcIiwgXCJoZWxwXCIpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+bWFpbiBtZW51PC9zdHJvbmc+OiByaWdodCBjbGlja1wiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcImRyYWcgYW5kIGRyb3AgdG8gPHN0cm9uZz5tb3ZlIGVsZW1lbnRzPC9zdHJvbmc+XCIpKTtcbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiPHN0cm9uZz5taWRkbGUgY2xpY2s8L3N0cm9uZz4gdG8gcm90YXRlIGVsZW1lbnRzXCIpKTtcbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiPHN0cm9uZz5jbGljayA8aW1nIHNyYz0naW1nL2d1aS9oZWxwLnN2ZycgY2xhc3M9J2hlbHBpY29uJyBhbHQ9J2hlbHAgaWNvbic+PC9zdHJvbmc+IHRvIGRpc3BsYXkgZG9jdW1lbnRhdGlvbiAoaW4gY3plY2gpXCIpKTtcbiAgICB9XG5cbiAgICBhcHBlbmQoaXRlbSkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoaXRlbS4kZWwpO1xuICAgIH1cbn1cblxuXG5jbGFzcyBmbG9hdGluZ01lbnVJdGVtIGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Ioc3BlY2lmaWNDbGFzcywgaWNvbiwgdGl0bGUsIHNwZWNpZmljVGFnKSB7XG4gICAgICAgIHN1cGVyKHNwZWNpZmljVGFnKTtcblxuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhcImJ1dHRvblwiKTtcbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3Moc3BlY2lmaWNDbGFzcyk7XG5cbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKFxuICAgICAgICAgICAgJChcIjxpbWc+XCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzcmNcIiwgXCJpbWcvZ3VpL1wiICsgaWNvbiArIFwiLnN2Z1wiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiYWx0XCIsIHRpdGxlKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwidGl0bGVcIiwgdGl0bGUpXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBmbG9hdGluZ01lbnUgZXh0ZW5kcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBjb25zdCBpZCA9ICdmbG9hdGluZ01lbnUnO1xuXG4gICAgICAgIHRoaXMuJGVsLmF0dHIoXCJpZFwiLCBpZCk7XG5cbiAgICAgICAgLyogSU1QT1JUICovXG5cbiAgICAgICAgLy8gaGVyZSB3aWxsIGJlIHRoZSBpbnN0YW5jZSBvZiBMaXR5IHN0b3JlZFxuICAgICAgICAvLyAod2UgbmVlZCB0byBzdG9yZSBpdCwgYmVjYXVzZSB0aGUgXCJpbXBvcnRcIiBidXR0b24gYWxzbyBjbG9zZXMgTGl0eSlcbiAgICAgICAgbGV0IGxpdHlJbnN0YW5jZUltcG9ydDtcblxuICAgICAgICBsZXQgaW1wb3J0QnV0dG9uID0gbmV3IGZsb2F0aW5nTWVudUl0ZW0oXCJpbXBvcnRcIiwgXCJpbXBvcnRcIiwgXCJJbXBvcnQgYSBuZXR3b3JrXCIsIFwiYVwiKTtcbiAgICAgICAgaW1wb3J0QnV0dG9uLiRlbC5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGxldCAkcG9wdXAgPSAkKFwiPGRpdj5cIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJpbXBvcnRFeHBvcnRcIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJpbXBvcnRcIik7XG5cbiAgICAgICAgICAgIGxldCB0ZXh0YXJlYUlkID0gXCJpbXBvcnRKU09OXCI7XG5cbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjx0ZXh0YXJlYT48L3RleHRhcmVhPlwiKS5hdHRyKCdpZCcsIHRleHRhcmVhSWQpXG4gICAgICAgICAgICApLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPGE+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogXCJ1cGxvYWRcIlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9pbXBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcIiBpbXBvcnQgZnJvbSBKU09OXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHRleHRhcmVhID0gJCgnIycrdGV4dGFyZWFJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCB0ZXh0YXJlYSBjb250ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltcG9ydFN0cmluZyA9ICR0ZXh0YXJlYS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgTGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgbGl0eUluc3RhbmNlSW1wb3J0LmNsb3NlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb2NjZXNzIHRoZSBpbXBvcnRlZCBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgaW1wb3J0TmV0d29rKHBhcmVudFNWRywgaW1wb3J0U3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxpdHlJbnN0YW5jZUltcG9ydCA9IGxpdHkoJHBvcHVwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmQoaW1wb3J0QnV0dG9uKTtcblxuICAgICAgICAvKiBFWFBPUlQgKi9cblxuICAgICAgICBsZXQgZXhwb3J0QnV0dG9uID0gbmV3IGZsb2F0aW5nTWVudUl0ZW0oXCJleHBvcnRcIiwgXCJleHBvcnRcIiwgXCJFeHBvcnQgdGhpcyBuZXR3b3JrXCIsIFwiYVwiKTtcbiAgICAgICAgZXhwb3J0QnV0dG9uLiRlbC5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gbmV3IGV4cG9ydE5ldHdvcmsocGFyZW50U1ZHKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBwb3B1cCBjb250YWluZXIgaG9sZGluZyBhbGwgcG9wdXAgY29udGVudCAodGhhdCB3aWxsIGJlIHBhc3NlZCB0byBsaXR5KVxuICAgICAgICAgICAgbGV0ICRwb3B1cCA9ICQoXCI8ZGl2PlwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImltcG9ydEV4cG9ydFwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImV4cG9ydFwiKTtcblxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdGhlIGJsb2NrIHdpdGggY29kZSB0byBiZSBkaXNwbGF5ZWQgYW5kIGFwcGVuZCBpdCB0byB0aGUgcG9wdXAgZWxlbWVudFxuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPHByZT5cIikuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAkKFwiPGNvZGU+XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmpzb24oZXhwb3J0TmV0d29yay5zdHlsZS5wcmV0dHkpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdGhlIGxpbmtzXG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8YT5cIikuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBkYXRhLmpzb24oZXhwb3J0TmV0d29yay5zdHlsZS5wcmV0dHksIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwiZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcIm5ldHdvcmsuanNvblwiXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAkKFwiPGltZz5cIikuYXR0cignc3JjJywgXCJpbWcvZ3VpL2V4cG9ydC5zdmdcIilcbiAgICAgICAgICAgICAgICApLmFwcGVuZChcIiBleHBhbmRlZCBKU09OXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPGE+XCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUuY29tcGFjdCwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogXCJkb3dubG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwibmV0d29yay5taW4uanNvblwiXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAkKFwiPGltZz5cIikuYXR0cignc3JjJywgXCJpbWcvZ3VpL2V4cG9ydC5zdmdcIilcbiAgICAgICAgICAgICAgICApLmFwcGVuZChcIiBjb21wYWN0IEpTT05cIilcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxpdHkoJHBvcHVwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmQoZXhwb3J0QnV0dG9uKTtcblxuICAgICAgICAvKiBIRUxQICovXG5cbiAgICAgICAgbGV0IGhlbHAgPSBuZXcgZmxvYXRpbmdNZW51SXRlbShcImhlbHBcIiwgXCJoZWxwXCIsIFwiRGlzcGxheSBoZWxwXCIsIFwiYVwiKTtcbiAgICAgICAgaGVscC4kZWwub24oXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgJChcIiNoZWxwXCIpLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSkub24oXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAkKFwiI2hlbHBcIikucmVtb3ZlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBoZWxwLiRlbC5hdHRyKHtcbiAgICAgICAgICAgICdocmVmJzogJy4vZG9jcy8nLFxuICAgICAgICAgICAgJ2RhdGEtbGl0eSc6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcGVuZChoZWxwKTtcblxuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5hZnRlcih0aGlzLiRlbCk7XG4gICAgICAgIHBhcmVudFNWRy4kc3ZnLmFmdGVyKG5ldyBoZWxwV2luZG93KCkuJGVsKTtcbiAgICB9XG5cbiAgICBhcHBlbmQobWVudUl0ZW0pIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKG1lbnVJdGVtLiRlbCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMuanMnXG5cbmNsYXNzIHN0YXRlQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25uZWN0b3JJZCwgc3RhdGUsIHdob0NhdXNlZEl0KSB7XG4gICAgICAgIHRoaXMuY29ubmVjdG9ySWQgPSBjb25uZWN0b3JJZFxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGVcbiAgICAgICAgdGhpcy53aG9DYXVzZWRJdCA9IHdob0NhdXNlZEl0XG4gICAgfVxufVxuXG4vLyBhbGwgY29ubmVjdG9ycyBtZW50aW9uZWQgaGVyZSBhcmUgT1VUUFVUIENPTk5FQ1RPUlNcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXVsYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWR1xuXG4gICAgICAgIC8vIG1hcHMgZWFjaCBhZmZlY3RlZCBvdXRwdXQgY29ubmVjdG9yIHRvIGl0J3MgZGlyZWN0bHkgcHJlY2VlZGluZyBvdXRwdXQgY29ubmVjdG9yc1xuICAgICAgICB0aGlzLnByZWRlY2Vzc29ycyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvLyBtYXBzIHdhdmVJZCAtPiBhcnJheSBvZiBvdXRwdXRDb25uZWN0b3JzIGFmZmVjdGVkXG4gICAgICAgIHRoaXMud2F2ZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMud2F2ZSA9IDBcblxuICAgICAgICB0aGlzLmN5Y2xlZENvbm5lY3RvcnMgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5yZXNvbHZlZEN5Y2xlZENvbm5lY3RvcnMgPSBuZXcgU2V0KClcblxuICAgIH1cblxuICAgIHJ1bigpIHtcbiAgICAgICAgdGhpcy53YXZlKys7XG4gICAgICAgIHdoaWxlKHRoaXMud2F2ZXMuaGFzKHRoaXMud2F2ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCgpXG4gICAgICAgICAgICB0aGlzLndhdmVzLmRlbGV0ZSh0aGlzLndhdmUpIC8vIGNsZWFuIG9sZCB3YXZlcyBvbiB0aGUgZ29cbiAgICAgICAgICAgIHRoaXMud2F2ZSsrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGVwKCkge1xuICAgICAgICBmb3IgKGxldCB7Y29ubmVjdG9ySWQsIHN0YXRlLCB3aG9DYXVzZWRJdH0gb2YgdGhpcy53YXZlcy5nZXQodGhpcy53YXZlKSkge1xuICAgICAgICAgICAgLy8gc2tpcCByZXNvbHZlZCBjeWNsZXNcbiAgICAgICAgICAgIGlmKHRoaXMucmVzb2x2ZWRDeWNsZWRDb25uZWN0b3JzLmhhcyhjb25uZWN0b3JJZCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBza2lwIGNvbm5lY3RvciB0aGF0IGFyZSBjeWNsZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmN5Y2xlZENvbm5lY3RvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgc2V0IG9mIHN0YXRlcyB0aGF0IHRoaXMgY29ubmVjdG9yIGFwcGVhcmVkIGZyb20gdGhlIG1vbWVudCB0aGUgc2lnbmFsIGZpcnN0IGN5Y2xlZFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZXMgPSB0aGlzLmN5Y2xlZENvbm5lY3RvcnMuZ2V0KGNvbm5lY3RvcklkKVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGNvbm5lY3RvciBhbHJlYWR5IGhhZCB0aGlzIHN0YXRlIGluIHRoaXMgY3ljbGUsIHJlc29sdmUgdGhlIGN5Y2xlXG4gICAgICAgICAgICAgICAgaWYoc3RhdGVzLmhhcyhzdGF0ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbW9yZSBzdGF0ZXMgaW4gdGhlIHNldCwgdGhlIGNvbm5lY3RvciBpcyBvc2NpbGxhdGluZ1xuICAgICAgICAgICAgICAgICAgICAvLyAoZWxzZSBpdCBrZWVwcyBpdHMgc3RhdGUgYW5kIHdlIGp1c3QgYnJlYWsgdGhlIGN5Y2xlKVxuICAgICAgICAgICAgICAgICAgICBpZihzdGF0ZXMuc2l6ZSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gTG9naWMuc3RhdGUub3NjaWxsYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hcmsgdGhpcyBjb25uZWN0b3IgYXMgcmVzb2x2ZWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlZEN5Y2xlZENvbm5lY3RvcnMuYWRkKGNvbm5lY3RvcklkKVxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIG5ldywgdW5zZWVuIHN0YXRlLCBhZGQgaXQgdG8gdGhlIHNldCBhbmQgY29udGludWUgc2ltdWxhdGluZyB0aGUgY3ljbGVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuYWRkKHN0YXRlKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG1hcCB0aGUgbW9kaWZpZWQgc2V0IG9mIHN0YXRlcyB0byB0aGUgY29ubmVjdG9yXG4gICAgICAgICAgICAgICAgdGhpcy5jeWNsZWRDb25uZWN0b3JzLnNldChjb25uZWN0b3JJZCwgc3RhdGVzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLndob0NhdXNlZEl0ID0gY29ubmVjdG9ySWRcbiAgICAgICAgICAgIC8qICBwcm9jZXNzIGFsbCBvdXRwdXRDb25uZWN0b3JzIGJ5IHNldHRpbmcgdGhlaXIgc3RhdGVcbiAgICAgICAgICAgICAgICB0aGlzIHdpbGwgdHJpZ2dlciBhIGZvbGxvd2luZyBldmVudCBjaGFpbjpcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0Q29ubmVjdG9yIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgLT4gYWxsIGNvbm5lY3RlZCB3aXJlcyBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgLT4gYWxsIGlucHV0Q29ubmVjdG9ycyBjb25uZWN0ZWQgdG8gdGhlc2Ugd2lyZXMgY2hhbmdlXG4gICAgICAgICAgICAgICAgICAgIC0+IGFsbCBlbGVtZW50cyB0aGF0IGNvbnRhaW4gdGhlc2UgaW5wdXRDb25uZWN0b3JzIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAtPiB0aGVzZSBlbGVtZW50cyBjb21wdXRlIHRoZSBuZXcgc3RhdGUgb2YgdGhlaXIgb3V0cHV0IGNvbm5lY3RvcnMgYW5kIGNhbGwgbm90aWZ5Q2hhbmdlKClcbiAgICAgICAgICAgICovXG5cblxuICAgICAgICAgICAgaWYod2hvQ2F1c2VkSXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFByZWRlY2Vzc29yKGNvbm5lY3RvcklkLCB3aG9DYXVzZWRJdClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmN5Y2xlZENvbm5lY3RvcnMuaGFzKGNvbm5lY3RvcklkKSAmJiB0aGlzLmdldEFsbFByZWRlY2Vzc29ycyhjb25uZWN0b3JJZCkuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3ljbGVkQ29ubmVjdG9ycy5zZXQoY29ubmVjdG9ySWQsIG5ldyBTZXQoW3N0YXRlXSkpXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gcmVmbGVjdCB0aGUgY2hhbmdlcyBpbiBTVkdcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3IgPSB0aGlzLnBhcmVudFNWRy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKVxuICAgICAgICAgICAgaWYoY29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdG9yLnNldFN0YXRlKHN0YXRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2hvQ2F1c2VkSXQgPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvLyBtYXJrIGEgcHJlZGVjZXNzb3JDb25uZWN0b3JJZCBhcyBhIHByZWRlY2Vzc29yIG9mIGNvbm5lY3RvcklkXG4gICAgYWRkUHJlZGVjZXNzb3IoY29ubmVjdG9ySWQsIHByZWRlY2Vzc29yQ29ubmVjdG9ySWQpIHtcbiAgICAgICAgaWYoIXRoaXMucHJlZGVjZXNzb3JzLmhhcyhjb25uZWN0b3JJZCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJlZGVjZXNzb3JzLnNldChjb25uZWN0b3JJZCwgbmV3IFNldCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuZ2V0KGNvbm5lY3RvcklkKS5hZGQocHJlZGVjZXNzb3JDb25uZWN0b3JJZClcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHNldCBvZiBhbGwgb3V0cHV0IGNvbm5lY3RvcnMsIHRoYXQgYXJlIGJlZm9yZSB0aGlzIG91dHB1dCBjb25uZWN0b3JcbiAgICBnZXRBbGxQcmVkZWNlc3NvcnMoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgaWYoIXRoaXMucHJlZGVjZXNzb3JzLmhhcyhjb25uZWN0b3JJZCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJlZGVjZXNzb3JzLnNldChjb25uZWN0b3JJZCwgbmV3IFNldCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFsbCA9IG5ldyBTZXQoKVxuXG4gICAgICAgIHRoaXMucHJlZGVjZXNzb3JzLmdldChjb25uZWN0b3JJZCkuZm9yRWFjaChhbGwuYWRkLCBhbGwpO1xuXG4gICAgICAgIGxldCBwcmV2U2l6ZSA9IDBcbiAgICAgICAgbGV0IHNpemUgPSBhbGwuc2l6ZVxuICAgICAgICB3aGlsZShwcmV2U2l6ZSA8IHNpemUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbm5lY3RvciBvZiBhbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmVkZWNlc3NvcnMuaGFzKGNvbm5lY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuZ2V0KGNvbm5lY3RvcikuZm9yRWFjaChhbGwuYWRkLCBhbGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZTaXplID0gc2l6ZVxuICAgICAgICAgICAgc2l6ZSA9IGFsbC5zaXplXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWxsXG4gICAgfVxuXG4gICAgbm90aWZ5Q2hhbmdlKGNvbm5lY3RvcklkLCBzdGF0ZSkge1xuICAgICAgICBsZXQgd2F2ZUlkID0gdGhpcy53YXZlICsgMVxuXG4gICAgICAgIGlmKCF0aGlzLndhdmVzLmhhcyh3YXZlSWQpKSB7XG4gICAgICAgICAgICB0aGlzLndhdmVzLnNldCh3YXZlSWQsIFtdKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53YXZlcy5nZXQod2F2ZUlkKS5wdXNoKG5ldyBzdGF0ZUNoYW5nZShjb25uZWN0b3JJZCwgc3RhdGUsIHRoaXMud2hvQ2F1c2VkSXQpKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm4ge1xuICAgIHN0YXRpYyBkZWVwQ29weShhcnIpIHtcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIFtdLCBhcnIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRNb3VzZVNjcm9sbEV2ZW50TGlzdGVuZXIocXVlcnksIGZ1bmMpIHtcbiAgICAgICAgbGV0IE1vdXNlV2hlZWxIYW5kbGVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gd2luZG93LmV2ZW50IHx8IGV2ZW50OyAvLyBvbGQgSUUgc3VwcG9ydFxuICAgICAgICAgICAgZXZlbnQuZGVsdGEgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgKGV2ZW50LndoZWVsRGVsdGEgfHwgLWV2ZW50LmRldGFpbCkpKTtcblxuICAgICAgICAgICAgZnVuYyhldmVudClcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETyBhZGQgbW9yZSBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBzb21laG93XG4gICAgICAgIGxldCBzdmdlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XG5cbiAgICAgICAgaWYgKHN2Z2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgLy8gSUU5LCBDaHJvbWUsIFNhZmFyaSwgT3BlcmFcbiAgICAgICAgICAgIHN2Z2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgTW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgIHN2Z2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTU1vdXNlU2Nyb2xsXCIsIE1vdXNlV2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgLy8gSUUgNi83LzhcbiAgICAgICAgICAgIHN2Z2VsZW1lbnQuYXR0YWNoRXZlbnQoXCJvbm1vdXNld2hlZWxcIiwgTW91c2VXaGVlbEhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHN2Z2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdldmVudCcsIGUpXG4gICAgICAgIH0sIGZhbHNlKVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgKiBhcyBzdmdPYmogZnJvbSAnLi9zdmdPYmplY3RzLmpzJ1xuaW1wb3J0ICogYXMgZWRpdG9yRWxlbWVudHMgZnJvbSAnLi9lZGl0b3JFbGVtZW50cy5qcydcbmltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuaW1wb3J0IENvbnRleHRNZW51IGZyb20gJy4vY29udGV4dE1lbnUuanMnXG5pbXBvcnQgRmxvYXRpbmdNZW51IGZyb20gJy4vZmxvYXRpbmdNZW51LmpzJ1xuaW1wb3J0IFNpbXVsYXRpb24gZnJvbSAnLi9zaW11bGF0aW9uLmpzJ1xuaW1wb3J0IEZuIGZyb20gJy4vc21hbGxGdW5jdGlvbnMuanMnXG5cbmNsYXNzIFZpZXdCb3gge1xuICAgIGNvbnN0cnVjdG9yKGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLnJlYWwgPSB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9XG5cbiAgICAgICAgdGhpcy56b29tID0gMVxuICAgICAgICB0aGlzLmxlZnRTaGlmdCA9IDBcbiAgICAgICAgdGhpcy50b3BTaGlmdCA9IDBcbiAgICB9XG5cbiAgICBnZXQgd2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWwud2lkdGggLyB0aGlzLnpvb21cbiAgICB9XG5cbiAgICBnZXQgaGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFsLmhlaWdodCAvIHRoaXMuem9vbVxuICAgIH1cblxuICAgIGdldCBsZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFsLmxlZnQgLSAodGhpcy5sZWZ0U2hpZnQgLyB0aGlzLnpvb20pICsgKCh0aGlzLnJlYWwud2lkdGggLSB0aGlzLndpZHRoKSAvIDIpXG4gICAgfVxuXG4gICAgZ2V0IHRvcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhbC50b3AgLSAodGhpcy50b3BTaGlmdCAvIHRoaXMuem9vbSkgKyAoKHRoaXMucmVhbC5oZWlnaHQgLSB0aGlzLmhlaWdodCkgLyAyKVxuICAgIH1cblxuICAgIGdldCBzdHIoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxlZnR9ICR7dGhpcy50b3B9ICR7dGhpcy53aWR0aH0gJHt0aGlzLmhlaWdodH1gXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdmcge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JpZFNpemUpIHtcbiAgICAgICAgdGhpcy4kc3ZnID0gJChjYW52YXMpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmJveGVzID0gW107IC8vIHN0b3JlcyBhbGwgYm94ZXNcbiAgICAgICAgdGhpcy53aXJlcyA9IFtdOyAvLyBzdG9yZXMgYWxsIHdpcmVzXG5cbiAgICAgICAgdGhpcy5zaW11bGF0aW9uRW5hYmxlZCA9IHRydWVcbiAgICAgICAgdGhpcy5zaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24odGhpcyk7IC8vIGR1bW15LCB3aWxsIGJlIG92ZXJ3cml0dGVuIG9uIHN0YXJ0TmV3U2ltdWxhdGlvblxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGVmcyBlbGVtZW50LCB1c2VkIGZvciBwYXR0ZXJuc1xuICAgICAgICB0aGlzLiRkZWZzID0gJChcIjxkZWZzPlwiKTtcbiAgICAgICAgdGhpcy4kc3ZnLnByZXBlbmQodGhpcy4kZGVmcyk7XG5cbiAgICAgICAgLy8gQkFDS0dST1VORCBQQVRURVJOXG4gICAgICAgIGxldCBwYXR0ZXJuID0gbmV3IHN2Z09iai5QYXR0ZXJuKFwiZ3JpZFwiLCB0aGlzLmdyaWRTaXplLCB0aGlzLmdyaWRTaXplKTtcblxuICAgICAgICBsZXQgcGF0dGVyblBvaW50cyA9IG5ldyBzdmdPYmouUG9seWxpbmVQb2ludHMoKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoMCwgMCkpXG4gICAgICAgICAgICAuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLmdyaWRTaXplLCAwKSlcbiAgICAgICAgICAgIC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMuZ3JpZFNpemUsIHRoaXMuZ3JpZFNpemUpKTtcblxuICAgICAgICBwYXR0ZXJuLmFkZENoaWxkKG5ldyBzdmdPYmouUG9seUxpbmUocGF0dGVyblBvaW50cywgXCIjYTNhNGQyXCIsIDIpKTtcbiAgICAgICAgdGhpcy5hZGRQYXR0ZXJuKHBhdHRlcm4uZ2V0KCkpO1xuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBzdmdPYmouUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBcInVybCgjZ3JpZClcIiwgXCJub25lXCIpO1xuICAgICAgICB0aGlzLmFwcGVuZEpRdWVyeU9iamVjdCh0aGlzLmJhY2tncm91bmQuZ2V0KCkpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICAvLyBzZXQgdGhlIHZpZXdib3ggZm9yIGZ1dHVyZSB6b29taW5nIGFuZCBtb3Zpbmcgb2YgdGhlIGNhbnZhc1xuICAgICAgICB0aGlzLiRzdmcuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBzbGljZScpXG4gICAgICAgIHRoaXMudmlld2JveCA9IG5ldyBWaWV3Qm94KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgICAgICB0aGlzLmFwcGx5Vmlld2JveCgpXG5cbiAgICAgICAgLy8gQ09OU1RSVUNUIENPTlRFWFQgTUVOVVxuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gbmV3IENvbnRleHRNZW51KHRoaXMpO1xuXG4gICAgICAgIC8vIENPTlNUUlVDVCBGTE9BVElORyBNRU5VXG4gICAgICAgIC8vIHRoaXMuZmxvYXRpbmdNZW51ID0gbmV3IEZsb2F0aW5nTWVudSh0aGlzKTtcbiAgICAgICAgdGhpcy5mbG9hdGluZ01lbnUgPSBuZXcgRmxvYXRpbmdNZW51KHRoaXMpO1xuXG4gICAgICAgIC8vIEFMTCBFVkVOVCBDQUxMQkFDS1NcbiAgICAgICAgbGV0IHRhcmdldDtcbiAgICAgICAgdGhpcy4kc3ZnLm9uKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0aGlzLmdldFJlYWxUYXJnZXQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIGlmKHRhcmdldCE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIHByb3BhZ2F0ZSBtb3VzZWRvd24gdG8gdGhlIHJlYWwgdGFyZ2V0XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VEb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbW91c2Vkb3duIGhhcHBlbmVkIGRpcmVjdGx5IG9uIHRoZSBzdmdcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VEb3duKGV2ZW50KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmhpZGVDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSkub24oJ21vdXNlbW92ZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmKHRhcmdldCE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vdXNlTW92ZShldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG1vdXNlbW92ZSBoYXBwZW5lZCBkaXJlY3RseSBvbiB0aGUgc3ZnXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZShldmVudClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSkub24oJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmKHRhcmdldCE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vdXNlVXAoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBtb3VzZXVwIGhhcHBlbmVkIGRpcmVjdGx5IG9uIHRoZSBzdmdcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VVcChldmVudClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KS5vbihcImNvbnRleHRtZW51XCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvbnRleHRNZW51KGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSwgdGhpcy5nZXRSZWFsSlF1ZXJ5VGFyZ2V0KGV2ZW50LnRhcmdldCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgRm4uYWRkTW91c2VTY3JvbGxFdmVudExpc3RlbmVyKGNhbnZhcywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gem9vbSBvbmx5IGlmIHRoZSBjdHJsIGtleSBpcyBwcmVzc2VkXG4gICAgICAgICAgICBpZihldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC5kZWx0YSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvb20gKz0gMC4xXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b29tIC09IDAuMVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXQgd2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdmcud2lkdGgoKVxuICAgIH1cblxuICAgIGdldCBoZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdmcuaGVpZ2h0KClcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICBpZihldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVDYW52YXMgPSB7XG4gICAgICAgICAgICAgICAgbGVmdDogZXZlbnQucGFnZVgsXG4gICAgICAgICAgICAgICAgdG9wOiBldmVudC5wYWdlWVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy5tb3ZlQ2FudmFzKSB7XG4gICAgICAgICAgICBsZXQgbGVmdCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5tb3ZlQ2FudmFzLmxlZnRcbiAgICAgICAgICAgIGxldCB0b3AgPSBldmVudC5wYWdlWSAtIHRoaXMubW92ZUNhbnZhcy50b3BcblxuICAgICAgICAgICAgdGhpcy52aWV3Ym94LmxlZnRTaGlmdCArPSBsZWZ0XG4gICAgICAgICAgICB0aGlzLnZpZXdib3gudG9wU2hpZnQgKz0gdG9wXG4gICAgICAgICAgICB0aGlzLmFwcGx5Vmlld2JveCgpXG5cbiAgICAgICAgICAgIHRoaXMubW92ZUNhbnZhcyA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiBldmVudC5wYWdlWCxcbiAgICAgICAgICAgICAgICB0b3A6IGV2ZW50LnBhZ2VZXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy5tb3ZlQ2FudmFzKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVDYW52YXMgPSB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5Vmlld2JveCgpIHtcbiAgICAgICAgLy8gYWRqdXN0IGJhY2tncm91bmRcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLmFkZEF0dHIoe1xuICAgICAgICAgICAgeDogdGhpcy52aWV3Ym94LmxlZnQsXG4gICAgICAgICAgICB5OiB0aGlzLnZpZXdib3gudG9wLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMudmlld2JveC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy52aWV3Ym94LmhlaWdodFxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIHNldCB0aGUgdmlld0JveCBhdHRyaWJ1dGVcbiAgICAgICAgdGhpcy4kc3ZnLmF0dHIoJ3ZpZXdCb3gnLCB0aGlzLnZpZXdib3guc3RyKVxuICAgIH1cblxuICAgIGdldCB6b29tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3Ym94Lnpvb21cbiAgICB9XG5cbiAgICBzZXQgem9vbSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnZpZXdib3guem9vbSA9IHZhbHVlXG4gICAgICAgIHRoaXMuYXBwbHlWaWV3Ym94KClcbiAgICAgICAgLy8gdGhpcy5yZWZyZXNoKClcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgdGhpcy5leHBvcnRXaXJlSWRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZXhwb3J0V2lyZUlkID0gMDtcblxuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIC8vIHRvZG8gaW1wbGVtZW50IGdyaWRTaXplIHNjYWxpbmdcbiAgICAgICAgICAgIC8vIGdyaWRTaXplOiB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgYm94ZXM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGRhdGEuYm94ZXNbaV0gPSB0aGlzLmJveGVzW2ldLmV4cG9ydERhdGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpbXBvcnREYXRhKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zaW11bGF0aW9uRW5hYmxlZCA9IGZhbHNlXG5cbiAgICAgICAgLy8gdG9kbyBpbXBsZW1lbnQgZ3JpZFNpemUgc2NhbGluZ1xuXG4gICAgICAgIC8vIGxpc3Qgb2Ygd2lyZXMgdG8gYmUgYWRkZWRcbiAgICAgICAgbGV0IG5ld1dpcmVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgZGF0YS5ib3hlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgLy8gYWRkIGJveFxuICAgICAgICAgICAgbGV0IGJveDtcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ib3hlc1tpXS5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJnYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgZ2F0ZSAod2l0aG91dCByZWxvYWRpbmcgdGhlIFNWRywgd2Ugd2lsbCByZWxvYWQgaXQgb25jZSBhZnRlciB0aGUgaW1wb3J0KVxuICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld0dhdGUoZGF0YS5ib3hlc1tpXS5uYW1lLCAwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpb1wiOlxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBpbnB1dCAod2l0aG91dCByZWxvYWRpbmcgdGhlIFNWRywgd2Ugd2lsbCByZWxvYWQgaXQgb25jZSBhZnRlciB0aGUgaW1wb3J0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveCA9IHRoaXMubmV3SW5wdXQoMCwgMCwgZGF0YS5ib3hlc1tpXS5pc09uLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwib3V0cHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBvdXRwdXQgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld091dHB1dCgwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIGlvIGJveCBuYW1lICdcIitkYXRhLmJveGVzW2ldLm5hbWUrXCInLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBib3ggY2F0ZWdvcnkgJ1wiK2RhdGEuYm94ZXNbaV0uY2F0ZWdvcnkrXCInLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJveCkge1xuICAgICAgICAgICAgICAgIC8vIHByb2NjZXNzIGJveCB0cmFuc2Zvcm1zICh0cmFuc2xhdGlvbiBhbmQgcm90YXRpb24pXG4gICAgICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IG5ldyBlZGl0b3JFbGVtZW50cy5UcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwIDsgaiA8IGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zLmxlbmd0aCA7ICsraikge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFuc2xhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyb3RhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc2V0Um90YXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gdHJhbnNmb3JtIHByb3BlcnR5ICdcIitkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5uYW1lK1wiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBib3guc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgYWxsIHdpcmVzIHRvIHRoZSBsaXN0IG9mIHdpcmVzIHRvIGJlIGFkZGVkXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMCA7IGogPCBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zLmxlbmd0aCA7ICsraikge1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGFydGlmaWNpYWwgd2lyZSBpZFxuICAgICAgICAgICAgICAgICAgICBsZXQgd2lyZUlkID0gZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9uc1tqXS53aXJlSWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcGFzcyB0aGUgdmFsdWVzIGdvdCBmcm9tIGpzb24gaW50byBhIHZhcmlhYmxlIHRoYXQgd2lsbCBiZSBhZGRlZCBpbnRvIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGRhdGEuYm94ZXNbaV0uY29ubmVjdGlvbnNbal0uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zW2pdLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3hJZDogYm94LmlkXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSB2YWx1ZSB0byB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld1dpcmVzLmhhcyh3aXJlSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhbHJlYWR5IGlzIGEgd2lyZSB3aXRoIHRoaXMgaWQgaW4gdGhlIG1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgdmFsdWUgdG8gdGhlIGVuZCBvZiB0aGUgYXJyYXkgb2YgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFwVmFsdWUgPSBuZXdXaXJlcy5nZXQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcFZhbHVlLmxlbmd0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1dpcmVzLnNldCh3aXJlSWQsIG1hcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHdpcmUgd2l0aCB0aGlzIGlkIGluIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgd2lyZSBhbmQgc2V0IHRoZSB2YWx1ZSB0byBiZSB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1dpcmVzLnNldCh3aXJlSWQsIFt2YWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgU1ZHIGRvY3VtZW50IChuZWVkZWQgZm9yIHdpcmluZylcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgLy8gd2l0aCBhbGwgYm94ZXMgYWRkZWQsIHdlIGNhbiBub3cgY29ubmVjdCB0aGVtIHdpdGggd2lyZXNcbiAgICAgICAgbmV3V2lyZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3JJZHMgPSBbXTtcbiAgICAgICAgICAgIGlmKGl0ZW1bMF0gJiYgaXRlbVsxXSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBvZiBbMCwgMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJveCA9IHRoaXMuZ2V0Qm94QnlJZChpdGVtW2ldLmJveElkKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0b3JJZHNbaV0gPSBib3guY29ubmVjdG9yc1tpdGVtW2ldLmluZGV4XS5pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5ld1dpcmUoY29ubmVjdG9ySWRzWzBdLCBjb25uZWN0b3JJZHNbMV0sIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZWZyZXNoIHRoZSBTVkcgZG9jdW1lbnRcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgdGhpcy5zaW11bGF0aW9uRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGJveCBvZiB0aGlzLmJveGVzKSB7XG4gICAgICAgICAgICBpZiAoYm94IGluc3RhbmNlb2YgZWRpdG9yRWxlbWVudHMuSW5wdXRCb3gpIHtcbiAgICAgICAgICAgICAgICAvLyBzd2l0Y2ggdGhlIGlucHV0IGJveCBzdGF0ZSB0byB0aGUgb3Bvc2l0IGFuZCBiYWNrLCBmb3Igc29tZSByZWFzb24gY2FsbGluZyBib3gucmVmcmVzaFN0YXRlKClcbiAgICAgICAgICAgICAgICAvLyByZXN1bHRzIGluIHdlaXJkIHVuZmluaXNoZWQgc2ltdWxhdGlvblxuICAgICAgICAgICAgICAgIC8vIHRoaXMgY2F1c2VzIHVwZGF0ZSBvZiB0aGUgb3V0cHV0IGNvbm5lY3RvciBhbmQgYSBzdGFydCBvZiBhIG5ldyBzaW11bGF0aW9uXG5cbiAgICAgICAgICAgICAgICAvLyB0b2RvIGZpbmQgYmV0dGVyIHNvbHV0aW9uIGluc3RlYWQgb2YgdGhpcyB3b3JrYXJvdW5kXG4gICAgICAgICAgICAgICAgYm94Lm9uID0gIWJveC5vblxuICAgICAgICAgICAgICAgIGJveC5vbiA9ICFib3gub25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpcmVDcmVhdGlvbkhlbHBlcihjb25uZWN0b3JJZCkge1xuICAgICAgICBpZighdGhpcy5maXJzdENvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29ubmVjdG9ySWQgPSBjb25uZWN0b3JJZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubmV3V2lyZSh0aGlzLmZpcnN0Q29ubmVjdG9ySWQsIGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDb25uZWN0b3JJZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0TmV3U2ltdWxhdGlvbihzdGFydGluZ0Nvbm5lY3Rvciwgc3RhdGUpIHtcbiAgICAgICAgaWYodGhpcy5zaW11bGF0aW9uRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24odGhpcylcbiAgICAgICAgICAgIHRoaXMuc2ltdWxhdGlvbi5ub3RpZnlDaGFuZ2Uoc3RhcnRpbmdDb25uZWN0b3IuaWQsIHN0YXRlKVxuICAgICAgICAgICAgdGhpcy5zaW11bGF0aW9uLnJ1bigpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdHYXRlKG5hbWUsIHgsIHksIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0JveCh4LCB5LCBuZXcgZWRpdG9yRWxlbWVudHMuR2F0ZSh0aGlzLCBuYW1lLCB4LCB5KSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgbmV3SW5wdXQoeCwgeSwgaXNPbiA9IGZhbHNlLCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLklucHV0Qm94KHRoaXMsIGlzT24pLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBuZXdPdXRwdXQoeCwgeSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3Qm94KHgsIHksIG5ldyBlZGl0b3JFbGVtZW50cy5PdXRwdXRCb3godGhpcyksIHJlZnJlc2gpO1xuICAgIH1cblxuICAgIG5ld0JveCh4LCB5LCBvYmplY3QsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuYm94ZXMubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuYm94ZXNbaW5kZXhdID0gb2JqZWN0O1xuXG4gICAgICAgIC8vIHRyYW5zbGF0ZSB0aGUgZ2F0ZSBpZiB4IGFuZCB5IGhhcyBiZWVuIHNwZWNpZmllZFxuICAgICAgICBpZih4ICYmIHkpIHtcbiAgICAgICAgICAgIGxldCB0ciA9IG5ldyBlZGl0b3JFbGVtZW50cy5UcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRyLnNldFRyYW5zbGF0ZSh4LCB5KTtcblxuICAgICAgICAgICAgdGhpcy5ib3hlc1tpbmRleF0uc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyLmdldCgpfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGVuZEVsZW1lbnQodGhpcy5ib3hlc1tpbmRleF0sIHJlZnJlc2gpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmJveGVzW2luZGV4XTtcbiAgICB9XG5cbiAgICByZW1vdmVCb3goZ2F0ZUlkKSB7XG4gICAgICAgIGxldCAkZ2F0ZSA9ICQoXCIjXCIrZ2F0ZUlkKTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBnYXRlIGluIHN2ZydzIGxpc3Qgb2YgZ2F0ZXNcbiAgICAgICAgbGV0IGdhdGVJbmRleCA9IC0xO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmJveGVzW2ldLnN2Z09iai5pZD09PWdhdGVJZCkge1xuICAgICAgICAgICAgICAgIGdhdGVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihnYXRlSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCB3aXJlcyBjb25uZWN0ZWQgdG8gdGhpcyBnYXRlXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3hlc1tnYXRlSW5kZXhdLmNvbm5lY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZCh0aGlzLmJveGVzW2dhdGVJbmRleF0uY29ubmVjdG9yc1tpXS5zdmdPYmouaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGdhdGVcbiAgICAgICAgICAgIHRoaXMuYm94ZXMuc3BsaWNlKGdhdGVJbmRleCwgMSk7XG4gICAgICAgICAgICAkZ2F0ZS5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUcnlpbmcgdG8gcmVtb3ZlIGFuIG5vbmV4aXN0aW5nIGdhdGUuIChHYXRlIGlkOiBcIitnYXRlSWQrXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3V2lyZShmcm9tSWQsIHRvSWQsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIC8vIHdpcmUgbXVzdCBjb25uZWN0IHR3byBkaXN0aW5jdCBlbGVtZW50c1xuICAgICAgICBpZiAoZnJvbUlkPT09dG9JZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGxldCBjb25uZWN0b3JzID0gW3RoaXMuZ2V0Q29ubmVjdG9yQnlJZChmcm9tSWQpLCB0aGlzLmdldENvbm5lY3RvckJ5SWQodG9JZCldXG5cbiAgICAgICAgLy8gaW5wdXQgY29ubmVjdG9ycyBjYW4gYmUgY29ubmVjdGVkIHRvIG9uZSB3aXJlIG1heFxuICAgICAgICBjb25uZWN0b3JzLmZvckVhY2goY29ubiA9PiB7XG4gICAgICAgICAgICBpZihjb25uLmlzSW5wdXRDb25uZWN0b3IpXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVXaXJlc0J5Q29ubmVjdG9ySWQoY29ubi5pZClcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy53aXJlcy5sZW5ndGg7XG4gICAgICAgIHRoaXMud2lyZXNbaW5kZXhdID0gbmV3IGVkaXRvckVsZW1lbnRzLldpcmUodGhpcywgZnJvbUlkLCB0b0lkLCB0aGlzLmdyaWRTaXplLCByZWZyZXNoKTtcblxuICAgICAgICBjb25uZWN0b3JzLmZvckVhY2goY29ubiA9PiB7XG4gICAgICAgICAgICBjb25uLmFkZFdpcmVJZCh0aGlzLndpcmVzW2luZGV4XS5zdmdPYmouaWQpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYXBwZW5kRWxlbWVudCh0aGlzLndpcmVzW2luZGV4XSwgcmVmcmVzaCk7XG4gICAgICAgIHRoaXMubW92ZVRvQmFja0J5SWQodGhpcy53aXJlc1tpbmRleF0uc3ZnT2JqLmlkKTtcblxuICAgICAgICBpZihyZWZyZXNoKVxuICAgICAgICAgICAgdGhpcy53aXJlc1tpbmRleF0udXBkYXRlV2lyZVN0YXRlKClcblxuICAgICAgICByZXR1cm4gdGhpcy53aXJlc1tpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0V2lyZUJ5SWQod2lyZUlkKSB7XG4gICAgICAgIGZvciAoY29uc3Qgd2lyZSBvZiB0aGlzLndpcmVzKSB7XG4gICAgICAgICAgICBpZih3aXJlLnN2Z09iai5pZCA9PT0gd2lyZUlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpcmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRXaXJlc0J5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG4gICAgICAgIHJldHVybiBjb25uZWN0b3Iud2lyZUlkcztcbiAgICB9XG5cbiAgICByZW1vdmVXaXJlQnlJZCh3aXJlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLndpcmVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lyZXNbaV0uc3ZnT2JqLmlkID09PSB3aXJlSWQpIHtcblxuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IxID0gdGhpcy53aXJlc1tpXS5zdGFydENvbm5lY3RvcjtcbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdG9yMiA9IHRoaXMud2lyZXNbaV0uZW5kQ29ubmVjdG9yO1xuXG4gICAgICAgICAgICAgICAgY29ubmVjdG9yMS5yZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IyLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53aXJlc1tpXS5zdmdPYmouJGVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMud2lyZXMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVXaXJlc0J5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG5cbiAgICAgICAgY29ubmVjdG9yLndpcmVJZHMuZm9yRWFjaCh3aXJlSWQgPT4ge1xuICAgICAgICAgICAgbGV0IHdpcmUgPSB0aGlzLmdldFdpcmVCeUlkKHdpcmVJZCk7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgb3RoZXIgY29ubmVjdG9yIHRoYXQgaXMgdGhlIHdpcmUgY29ubmVjdGVkIHRvXG4gICAgICAgICAgICBsZXQgb3RoZXJDb25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQod2lyZS5mcm9tSWQsIHdpcmUpO1xuICAgICAgICAgICAgaWYob3RoZXJDb25uZWN0b3Iuc3ZnT2JqLmlkPT09Y29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgICAgICBvdGhlckNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh3aXJlLnRvSWQsIHdpcmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIHdpcmUgcmVjb3JkIGZyb20gdGhlIG90aGVyIGNvbm5lY3RvclxuICAgICAgICAgICAgb3RoZXJDb25uZWN0b3Iud2lyZUlkcy5kZWxldGUod2lyZUlkKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB3aXJlIHJlcHJlc2VudGF0aW9uIHVzaW5nIGpRdWVyeVxuICAgICAgICAgICAgJChcIiNcIiArIHdpcmVJZCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vIGlmIG90aGVyQ29ubmVjdG9yIGlzIGFuIGlucHV0IGNvbm5lY3Rvciwgc2V0IGl0cyBzdGF0ZSB0byB1bmtub3duXG4gICAgICAgICAgICBpZihvdGhlckNvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJDb25uZWN0b3Iuc2V0U3RhdGUoTG9naWMuc3RhdGUudW5rbm93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSBsaXN0IG9mIHdpcmUgSWRzXG4gICAgICAgIGNvbm5lY3Rvci53aXJlSWRzLmNsZWFyKCk7XG4gICAgICAgIC8vIGlmIGNvbm5lY3RvciBpcyBhbiBpbnB1dCBjb25uZWN0b3IsIHNldCBpdHMgc3RhdGUgdG8gdW5rbm93blxuICAgICAgICBpZihjb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgY29ubmVjdG9yLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlJZChnYXRlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5ib3hlc1tpXS5zdmdPYmouaWQ9PT1nYXRlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib3hlc1tpXS5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm94ZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQsIHdpcmUpIHtcbiAgICAgICAgLy8gdGhlIHdpcmUgdmFyaWFibGUgaXMgdXNlZCBhcyBoZXVyaXN0aWMsXG4gICAgICAgIC8vIHdoZW4gd2Uga25vdyB0aGUgd2lyZSwgd2UgaGF2ZSB0byBjaGVjayBvbmx5XG4gICAgICAgIC8vIHR3byBnYXRlcyBpbnN0ZWFkIG9mIGFsbCBvZiB0aGVtXG5cbiAgICAgICAgaWYod2lyZSE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gd2Uga25vdyB0aGUgd2lyZSAtLSB3ZSBjYW4gY2hlY2sgb25seSBnYXRlcyBhdCB0aGUgZW5kcyBvZiB0aGlzIHdpcmVcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3IgPSB3aXJlLnN0YXJ0Qm94LmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpXG4gICAgICAgICAgICBpZiAoIWNvbm5lY3Rvcikge1xuICAgICAgICAgICAgICAgIGNvbm5lY3RvciA9IHdpcmUuZW5kQm94LmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdG9yXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGRvIG5vdCBrbm93IHRoZSB3aXJlIC0tIHdlIGhhdmUgdG8gY2hlY2sgYWxsIGdhdGVzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJveCBvZiB0aGlzLmJveGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29ubmVjdG9yID0gYm94LmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpXG4gICAgICAgICAgICAgICAgaWYoY29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgb2JqZWN0LCB0aGF0IHVzZXIgaW50ZXJhY3RlZCB3aXRoLCBpcyBub3QgYSBjb25uZWN0b3IgYW5kIGlzIGluIGEgZ3JvdXBcbiAgICAvLyByZXR1cm4gdGhlIGdyb3VwIGpRdWVyeSBvYmplY3QgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgalF1ZXJ5IG9iamVjdFxuICAgIGdldFJlYWxKUXVlcnlUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuICAgICAgICBpZighJHRhcmdldC5oYXNDbGFzcyhcImNvbm5lY3RvclwiKSAmJiAkdGFyZ2V0LnBhcmVudHMoJ2cnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcIkdcIiAmJiAkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcImdcIikge1xuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkdGFyZ2V0O1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIGVkaXRvckVsZW1lbnQgdGhhdCB1c2VyIGludGVyYWN0ZWQgd2l0aCwgdGhlIFwidGFyZ2V0XCIgYXJndW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudFxuICAgIGdldFJlYWxUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIC8vIGV2ZW50eSBzZSBtdXNlamkgenByYWNvdmF0IHRhZHksIHByb3RvemUgdiBTVkcgc2UgZXZlbnR5IG5lcHJvcGFndWppXG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuXG4gICAgICAgIGlmKCR0YXJnZXQuaGFzQ2xhc3MoXCJjb25uZWN0b3JcIikpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjb25uZWN0b3IsIGRvbid0IHRyYXZlcnNlIGdyb3Vwc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYoJHRhcmdldC5wYXJlbnRzKCdnJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gdGhpcyBlbGVtZW50IGlzIGluIGEgZ3JvdXAgYW5kIGl0IGlzIG5vdCBhIGNvbm5lY3RvclxuXG4gICAgICAgICAgICAvLyB0cmF2ZXJzaW5nIHVwIHRoZSBET00gdHJlZSB1bnRpbCB3ZSBmaW5kIHRoZSBjbG9zZXN0IGdyb3VwXG4gICAgICAgICAgICBsZXQgJHBhcmVudEdyb3VwID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkcGFyZW50R3JvdXAucHJvcChcInRhZ05hbWVcIikgIT09IFwiR1wiICYmICRwYXJlbnRHcm91cC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJnXCIpIHtcbiAgICAgICAgICAgICAgICAkcGFyZW50R3JvdXAgPSAkcGFyZW50R3JvdXAucGFyZW50KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJveEJ5SWQoJHBhcmVudEdyb3VwLmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoXCJ3aXJlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRXaXJlQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZEVsZW1lbnQoZWxlbWVudCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRKUXVlcnlPYmplY3QoZWxlbWVudC5nZXQoKSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgYXBwZW5kSlF1ZXJ5T2JqZWN0KG9iamVjdCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmFwcGVuZChvYmplY3QpO1xuICAgICAgICBpZihyZWZyZXNoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFBhdHRlcm4ocGF0dGVybikge1xuICAgICAgICB0aGlzLiRkZWZzLmFwcGVuZChwYXR0ZXJuKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgLy8gcmVsb2FkIHRoZSBTVkcgZG9jdW1lbnQgKG5lZWRlZCB0byBkaXNwbGF5IG5ld2x5IGFwcGVuZGVkIGpRdWVyeSBvYmplY3QpXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmh0bWwodGhpcy4kc3ZnLmh0bWwoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU1ZHIGRvY3VtZW50IGhhcyBiZWVuIHJlbG9hZGVkLlwiKVxuICAgIH1cblxuICAgIGRpc3BsYXlDb250ZXh0TWVudSh4LCB5LCAkdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuZGlzcGxheSh4LCB5LCAkdGFyZ2V0KTtcbiAgICB9XG4gICAgaGlkZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBzbmFwIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc25hcFRvR3JpZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuZ3JpZFNpemUpICogdGhpcy5ncmlkU2l6ZTtcbiAgICB9XG5cbiAgICAvLyBzdGF0aWMgZnVuY3Rpb24gZm9yIHNuYXBwaW5nIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc3RhdGljIHNuYXBUb0dyaWQodmFsdWUsIGdyaWRTaXplKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gZ3JpZFNpemUpICogZ3JpZFNpemU7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBjYW5ub3QgYmUgdXNlZCBmb3Igd2lyaW5nIGF0IGFueSBjaXJjdW1zdGFuY2VzXG4gICAgZ2V0Tm9uUm91dGFibGVOb2RlcygpIHtcbiAgICAgICAgbGV0IGJsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgLy8gZm9yIGVhY2ggYm94XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgalF1ZXJ5IGNoaWxkIHdpdGggY2xhc3MgLnJlY3QgKFwiaGl0Ym94XCIpXG4gICAgICAgICAgICBsZXQgcmVjdCA9ICQoJyMnICsgdGhpcy5ib3hlc1tpXS5zdmdPYmouaWQpLmNoaWxkcmVuKFwiLnJlY3RcIilbMF07XG4gICAgICAgICAgICAvLyBnZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGVcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9ICQocmVjdCkucG9zaXRpb24oKTtcblxuICAgICAgICAgICAgLy8gc25hcCB0aGUgcG9zaXRpb24gdG8gdGhlIGdyaWRcbiAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24ubGVmdCk7XG4gICAgICAgICAgICBwb3NpdGlvbi50b3AgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24udG9wKTtcblxuICAgICAgICAgICAgLy8gZm9yIGVhY2ggaXRlbSBpbiBibG9ja2VkTm9kZXMgKHNldCBvZiBibG9ja2VkIG5vZGVzIHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmVcbiAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IHVwcGVyIGNvcm5lciBvZiByZWN0OyB1bml0IHVzZWQgaXMgXCJvbmUgZ3JpZFNpemVcIikgY29udmVydCB0aGUgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIC8vIHRvIGFic29sdXRlIChtdWx0aXBsZSB3aXRoIGdyaWRTaXplIGFuZCBhZGQgcG9zaXRpb24gb2YgcmVjdCkgYW5kIGFkZCB0aGUgcmVzdWx0IHRvIHRoZSBzZXRcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLmJveGVzW2ldLmJsb2NrZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGxldCBhYnNvbHV0ZVggPSBwb3NpdGlvbi5sZWZ0ICsgaXRlbS54ICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgICAgICAgICBsZXQgYWJzb2x1dGVZID0gcG9zaXRpb24udG9wICsgaXRlbS55ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICAgICAgICAgIGJsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBhYnNvbHV0ZVgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGFic29sdXRlWVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRvZG8gZW5zdXJlIHRoYXQgdGhpcy5yZWZyZXNoKCkgaXMgcmVhbGx5IHVubmVjZXNzYXJ5XG4gICAgICAgIC8vIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gYmxvY2tlZE5vZGVzO1xuICAgIH1cblxuICAgIG1vdmVUb0Zyb250QnlJZChvYmpJZCkge1xuICAgICAgICB0aGlzLiRzdmcuYXBwZW5kKCQoXCIjXCIgKyBvYmpJZCkpO1xuICAgIH1cblxuICAgIG1vdmVUb0JhY2tCeUlkKG9iaklkKSB7XG4gICAgICAgICQoXCIjXCIgKyB0aGlzLmJhY2tncm91bmQuaWQpXG4gICAgICAgICAgICAuYWZ0ZXIoJChcIiNcIiArIG9iaklkKSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBpcyBiZXR0ZXIgbm90IHRvIHVzZSBmb3Igd2lyaW5nXG4gICAgZ2V0SW5jb252ZW5pZW50Tm9kZXMoaWdub3JlV2lyZUlkKSB7XG5cbiAgICAgICAgbGV0IGluY29udmVuaWVudE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAvLyBmb3IgZWFjaCB3aXJlXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy53aXJlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIChpZ25vcmUgdGhlIHdpcmUgdGhhdCBpcyBzcGVjaWZpZWQgaW4gdGhlIGlnbm9yZVdpcmVJZCBhcmd1bWVudCAoaWYgYW55KSlcbiAgICAgICAgICAgIGlmKGlnbm9yZVdpcmVJZD09PXVuZGVmaW5lZCB8fCBpZ25vcmVXaXJlSWQhPT10aGlzLndpcmVzW2ldLnN2Z09iai5pZCkge1xuICAgICAgICAgICAgICAgIC8vIGN5Y2xlIHRocm91Z2ggcG9pbnRzLCBmb3IgZWFjaCBuZWlnYm91cnMgYWRkIGFsbCBwb2ludHMgdGhhdCBhcmUgaW4gYmV0d2VlbiB0aGVtXG4gICAgICAgICAgICAgICAgLy8gaS5lLjogKDAsMCkgYW5kICgwLDMwKSBhcmUgYmxvY2tpbmcgdGhlc2Ugbm9kZXM6ICgwLDApLCAoMCwxMCksICgwLDIwKSwgKDAsMzApXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb2ludDtcbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzW2ldLnBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZQb2ludCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJldlBvaW50IGlzIHVuZGVmaW5lZCwgYWRkIHRoZSBmaXJzdCBwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jb252ZW5pZW50Tm9kZXMuYWRkKHt4OiBwb2ludC54LCB5OiBwb2ludC55fSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGFkZCBhbGwgdGhlIHBvaW50IGJldHdlZW4gdGhlIHByZXZQb2ludCAoZXhjbHVkZWQpIGFuZCBwb2ludCAoaW5jbHVkZWQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByZXZQb2ludC54PT09cG9pbnQueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIGhvcml6b250YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IE1hdGgubWluKHByZXZQb2ludC55LCBwb2ludC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG8gPSBNYXRoLm1heChwcmV2UG9pbnQueSwgcG9pbnQueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZShmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29udmVuaWVudE5vZGVzLmFkZCh7eDogcG9pbnQueCwgeTogZnJvbX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICs9IHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHByZXZQb2ludC55PT09cG9pbnQueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb20gPSBNYXRoLm1pbihwcmV2UG9pbnQueCwgcG9pbnQueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvID0gTWF0aC5tYXgocHJldlBvaW50LngsIHBvaW50LngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUoZnJvbSA8PSB0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbnZlbmllbnROb2Rlcy5hZGQoe3g6IGZyb20sIHk6IHBvaW50Lnl9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArPSB0aGlzLmdyaWRTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluZSBpcyBuZWl0aGVyIGhvcml6b250YWwgbm9yIHZlcnRpY2FsLCB0aHJvdyBhbiBlcnJvciBmb3IgYmV0dGVyIGZ1dHVyZSBkZWJ1Z2dpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZ2V0SW5jb252ZW5pZW50Tm9kZXM6IGxpbmUgYmV0d2VlbiB0d28gcG9pbnRzIGlzIG5laXRoZXIgaG9yaXpvbnRhbCBub3IgdmVydGljYWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgbmV3IHByZXZQb2ludFxuICAgICAgICAgICAgICAgICAgICBwcmV2UG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gaW5jb252ZW5pZW50Tm9kZXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFN2ZyBmcm9tICcuL2NhbnZhcy5qcyc7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGxldCBzdmcgPSBuZXcgU3ZnKFwic3ZnI2NhbnZhc1wiLCAxMCk7XG5cbiAgICAvKiBERU1PICovXG4gICAgLy8gT05FIEJJVCBDT01QQVJBVE9SXG4gICAgLypcbiAgICBsZXQgaTEgPSBzdmcubmV3SW5wdXQoMTAwLCAxMDApO1xuICAgIGxldCBpMiA9IHN2Zy5uZXdJbnB1dCgxMDAsIDIwMCk7XG5cbiAgICBsZXQgbjEgPSBzdmcubmV3R2F0ZShcIm5vdFwiLCAyMDAsIDEwMCk7XG4gICAgbGV0IG4yID0gc3ZnLm5ld0dhdGUoXCJub3RcIiwgMjAwLCAyMDApO1xuXG4gICAgbGV0IGExID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCA5MCk7XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCAyMTApO1xuXG4gICAgbGV0IG5vciA9IHN2Zy5uZXdHYXRlKFwibm9yXCIsIDU0MCwgMTUwKTtcblxuICAgIGxldCBvMSA9IHN2Zy5uZXdPdXRwdXQoNjgwLCA5MCk7XG4gICAgbGV0IG8yID0gc3ZnLm5ld091dHB1dCg2ODAsIDE1MCk7XG4gICAgbGV0IG8zID0gc3ZnLm5ld091dHB1dCg2ODAsIDIxMCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbjEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG4yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKG4xLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShuMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbm9yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGEyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBub3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUobm9yLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzMuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cblxuICAgIC8vIEJJTkFSWSBBRERFUlxuICAgIC8qXG4gICAgbGV0IGkxID0gc3ZnLm5ld0lucHV0KDgwLCA5MCk7XG4gICAgbGV0IGkyID0gc3ZnLm5ld0lucHV0KDgwLCAxMzApO1xuICAgIGxldCBpMyA9IHN2Zy5uZXdJbnB1dCg4MCwgMTgwKTtcblxuICAgIGxldCB4MSA9IHN2Zy5uZXdHYXRlKFwieG9yXCIsIDM2MCwgMTAwKTtcbiAgICBsZXQgeDIgPSBzdmcubmV3R2F0ZShcInhvclwiLCAzNjAsIDE3MCk7XG5cbiAgICBsZXQgYTEgPSBzdmcubmV3R2F0ZShcImFuZFwiLCAyNTAsIDIyMCk7XG4gICAgYTEub25DbGlja01pZGRsZSgpOy8vIGEgamVkbm91IHJvdG92YW55XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgNTAwLCAzMjApO1xuXG4gICAgbGV0IG9yID0gc3ZnLm5ld0dhdGUoXCJvclwiLCA2MjAsIDMxMCk7XG5cbiAgICBsZXQgbzEgPSBzdmcubmV3T3V0cHV0KDc1MCwgMjcwKTtcbiAgICBsZXQgbzIgPSBzdmcubmV3T3V0cHV0KDc1MCwgMzEwKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4MS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDEuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoeDEub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKHgxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGExLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvci5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKHgyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgb3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShvci5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cbn0pOyJdfQ==
