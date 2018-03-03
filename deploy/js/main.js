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
        return connectors.filter(function(conn) {
          return conn.isInputConnector;
        });
      },
      get outputConnectors() {
        return connectors.filter(function(conn) {
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
    }, {get triggersSimulationOnRefresh() {
        return false;
      }}, $__super);
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
    }, {get triggersSimulationOnRefresh() {
        return true;
      }}, $__super);
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
      this.enabled = true;
    }
    return ($traceurRuntime.createClass)(Simulator, {
      enable: function() {
        this.enabled = true;
      },
      disable: function() {
        this.enabled = false;
      },
      run: function() {
        if (this.enabled) {
          console.log('Simulator.run() has been successfully started.');
          this.wave++;
          while (this.waves.has(this.wave)) {
            this.step();
            this.waves.delete(this.wave);
            this.wave++;
          }
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
                console.log('this happened');
                var states = this.cycledConnectors.get(connectorId);
                if (states.has(state)) {
                  console.log('state reappeared');
                  if (states.size > 1) {
                    state = Logic.state.oscillating;
                  }
                  this.resolvedCycledConnectors.add(connectorId);
                } else {
                  states.add(state);
                }
                this.cycledConnectors.set(connectorId, states);
                console.log(this.cycledConnectors.get(connectorId));
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
        this.simulator.disable();
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
            for (var i = 0; i <= 1; ++i) {
              var box = $__2.getBoxById(item[i].boxId);
              connectorIds[i] = box.connectors[item[i].index].id;
            }
          }
          $__2.newWire(connectorIds[0], connectorIds[1], false);
        });
        this.refresh();
        this.simulator = new Simulator();
        this.simulator.disable();
        for (var box$__11 in this.boxes) {
          if (box$__11.triggersSimulationOnRefresh) {
            var $__6 = true;
            var $__7 = false;
            var $__8 = undefined;
            try {
              for (var $__4 = void 0,
                  $__3 = (box$__11.outputConnectors)[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
                var conn = $__4.value;
                {
                  this.simulator.notifyChange(conn.id, conn.state);
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
        }
        this.simulator.enable();
        this.simulator.run();
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
        this.simulator = new Simulator(this);
        this.simulator.notifyChange(startingConnector.id, state);
        this.simulator.run();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiIsInNyYy9lczYvc3RydWN0dXJlc0FuZENsYXNzZXMuanMiLCJzcmMvZXM2L3N2Z09iamVjdHMuanMiLCJzcmMvZXM2L2xvZ2ljLmpzIiwic3JjL2VzNi9lZGl0b3JFbGVtZW50cy5qcyIsInNyYy9lczYvY29udGV4dE1lbnUuanMiLCJzcmMvZXM2L2ltcG9ydEV4cG9ydC5qcyIsInNyYy9lczYvZmxvYXRpbmdNZW51LmpzIiwic3JjL2VzNi9sb2dpY1NpbXVsYXRvci5qcyIsInNyYy9lczYvY2FudmFzLmpzIiwic3JjL2VzNi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQUFBSSxJQUFBLENBQUEsWUFBVyxvQ0FBb0IsQ0FBQztBQ0dwQyxBQUFJLElBQUEsQ0FBQSxrQkFBaUIsRUFBSSxLQUFHLENBQUM7SUFFaEIsR0FBQyxFQUxkLENBQUEsU0FBUyxBQUFEO0FBS0QsV0FBTSxHQUFDLENBQ0UsQUFBRCxDQUFHO0FBQ1YsU0FBRyxDQUFDLGtCQUFpQixDQUFFO0FBQ25CLHlCQUFpQixFQUFJLEtBQUcsQ0FBQztNQUM3QjtBQUFBLEFBRUEsU0FBRyxPQUFPLEVBQUksS0FBRyxDQUFDO0FBQ2xCLFNBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBQztBQUVmLFdBQU8sbUJBQWlCLENBQUM7SUFDN0I7QUFvQkosQUFqQ1UsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBZWhDLFFBQUksT0FBSyxFQUFJO0FBQ1QsQUFBSSxVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBSTVCLGNBQU0sQ0FBQSxBQUFDLENBQUMsR0FBRSxFQUFFLE9BQUssQ0FBQyxPQUFPLENBQUc7QUFDeEIsYUFBRyxPQUFPLEVBQUUsQ0FBQztBQUNiLGVBQUssRUFBSSxDQUFBLElBQUcsU0FBUyxBQUFDLEVBQUMsQ0FBQztRQUM1QjtBQUFBLEFBRUEsV0FBRyxPQUFPLEVBQUUsQ0FBQztBQUViLGFBQU8sT0FBSyxDQUFDO01BQ2pC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QUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDL0MsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDcEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FFeEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDbEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDMUQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDOUQsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sWUFBWSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FDOUUsQ0FBQyxDQUFDO01BQ047QUFDTyxTQUFHLENBQVYsVUFBWSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDZCxhQUFPLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxLQUFJLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO01BQ3JDO0FBQ08sUUFBRSxDQUFULFVBQVcsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFHO0FBQ2IsYUFBTyxDQUFBLEtBQUksd0JBQXdCLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQ3ZDLENBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sR0FBRyxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQ3pELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWpFLEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2xELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzFELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzlELEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZ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Q0FBQyxDQUFDO0VBMkV2QyxDQUFDLENBQUM7QUE5RUYsV0FBdUIiLCJmaWxlIjoiL2hvbWUvd2FyYW4vU2tvbGEvcnAvY29kZS90ZW1wb3V0TUM0NE1qRTNORGs1T0Rrd016RTNOemtyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGwsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzaW5nbGV0b24gdG8gZ2VuZXJhdGUgdW5pcXVlIGlkJ3NcbmxldCBleGlzdGluZ0lkSW5zdGFuY2UgPSBudWxsO1xuLy8gdXNhZ2U6IGxldCBpZCA9IG5ldyBJZCgpLnVuaXF1ZVxuZXhwb3J0IGNsYXNzIElkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYoIWV4aXN0aW5nSWRJbnN0YW5jZSl7XG4gICAgICAgICAgICBleGlzdGluZ0lkSW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVmaXggPSBcImlkXCI7XG4gICAgICAgIHRoaXMubmV4dElkID0gMDtcblxuICAgICAgICByZXR1cm4gZXhpc3RpbmdJZEluc3RhbmNlO1xuICAgIH1cblxuICAgIGdldCB1bmlxdWUoKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSB0aGlzLmdlbmVyYXRlKCk7XG5cbiAgICAgICAgLy8gZmluZCBuZXh0IHVudXNlZCBpZFhYWFggdG8gcHJldmVudCBpZCBjb2xsaXNpb24gdGhhdCBtaWdodCBiZSBjYXVzZWQgYnkgc29tZSBvdGhlciBjb21wb25lbnRcbiAgICAgICAgLy8gKGl0IHJlYWxseSBzaG91bGQgbm90IGhhcHBlbiwgYnV0IHRoaXMgaXMgYSBzaW1wbGUgbWV0aG9kIHRvIGVuc3VyZSBzYWZldHkpXG4gICAgICAgIHdoaWxlKCQoXCIjXCIrcmV0VmFsKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dElkKys7XG4gICAgICAgICAgICByZXRWYWwgPSB0aGlzLmdlbmVyYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMgaWRcbiAgICAgICAgdGhpcy5uZXh0SWQrKztcblxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cblxuICAgIGdlbmVyYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggKyB0aGlzLm5leHRJZDtcbiAgICB9XG59XG5cbi8vIHRvIGVzNSBjb21waWxlciBmcmllbmRseSBpbXBsZW1lbnRhdGlvbiAoXCJjYWxsaW5nIGEgYnVpbHRpbiBNYXAgY29uc3RydWN0b3Igd2l0aG91dCBuZXcgaXMgZm9yYmlkZGVuXCIpXG5leHBvcnQgY2xhc3MgTWFwV2l0aERlZmF1bHRWYWx1ZSB7XG4gICAgY29uc3RydWN0b3IoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmRlZmF1bHQgPSBkZWZhdWx0VmFsdWU7XG5cblxuICAgIH1cblxuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc2l6ZTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgZm9yRWFjaCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5mb3JFYWNoKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldChrZXkpO1xuICAgIH1cblxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmRlbGV0ZShrZXkpO1xuICAgIH1cblxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuaGFzKGtleSk7XG4gICAgfVxuXG4gICAgZW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmVudHJpZXMoKTtcbiAgICB9XG5cbiAgICBrZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAua2V5cygpO1xuICAgIH1cblxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnZhbHVlcygpO1xuICAgIH1cbn1cblxuLypcbi8vIGVzNiBpbXBsZW1lbnRhdGlvblxuZXhwb3J0IGNsYXNzIE1hcFdpdGhEZWZhdWx0VmFsdWUgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGlmKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5nZXQoa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4qLyIsImltcG9ydCAqIGFzIFN0cnVjdHVyZXMgZnJvbSAnLi9zdHJ1Y3R1cmVzQW5kQ2xhc3Nlcy5qcydcblxuY2xhc3MgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHRoaXMudGFnTmFtZSA9IHRhZ05hbWU7XG5cbiAgICAgICAgdGhpcy4kZWwgPSAkKFwiPFwiK3RoaXMudGFnTmFtZStcIj5cIik7XG5cbiAgICAgICAgdGhpcy5pZCA9IG5ldyBTdHJ1Y3R1cmVzLklkKCkudW5pcXVlO1xuICAgIH1cblxuICAgIGFkZENsYXNzKG5hbWUpIHtcbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MobmFtZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2xhc3NlcyguLi5jbGFzc2VzKSB7XG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiBjbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcyhpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEF0dHIoYXNzb2MpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG5cbiAgICAgICAgLy8gYWRkIGF0dHJpYnV0ZXMgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy4kZWwuYXR0cihhc3NvYyk7XG4gICAgfVxuXG4gICAgZ2V0QXR0cihuYW1lKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLiRlbC5hdHRyKG5hbWUpO1xuICAgIH1cblxuICAgIHJlbW92ZUF0dHIobmFtZSkge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcblxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVBdHRyKG5hbWUpO1xuICAgIH1cblxuICAgIHNldCBpZChpZCkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wiaWRcIjogaWR9KTtcbiAgICB9O1xuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyKFwiaWRcIik7XG4gICAgfTtcblxuICAgIGdldCgpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbDtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgZWxlbWVudCBleGlzdHMgaW4gZG9tLCB3ZSBuZWVkIHRvIGZldGNoIGl0IHVzaW5nIGpRdWVyeVxuICAgIGNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKSB7XG4gICAgICAgIGxldCAkanFFbGVtZW50ID0gJChcIiNcIit0aGlzLiRlbC5hdHRyKCdpZCcpKTtcbiAgICAgICAgaWYoJGpxRWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJGpxRWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuICAgIH1cblxuICAgIGRyYWdnYWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wiZHJhZ2dhYmxlXCI6IHZhbHVlfSk7XG4gICAgfVxufVxuXG5jbGFzcyBSb3RhdGFibGUgZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgcm90YXRhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJyb3RhdGFibGVcIjogdmFsdWV9KTtcbiAgICB9XG59XG5cbi8vIHRoZXJlIGlzIG5vIG11bHRpcGxlIGluaGVyaXRhbmNlIGluIEVTNiwgc28gSSBoYXZlIHRvIGRvIHNvbWV0aGluZyB1Z2x5IGxpa2UgdGhpc1xuY2xhc3MgRHJhZ2dhYmxlUm90YXRhYmxlIGV4dGVuZHMgRHJhZ2dhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHJvdGF0YWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wicm90YXRhYmxlXCI6IHZhbHVlfSk7XG4gICAgfVxufVxuXG5jbGFzcyBTdmdFbGVtZW50IGV4dGVuZHMgRHJhZ2dhYmxlUm90YXRhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoLCB0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIFN2Z0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIGZpbGwsIHN0cm9rZSkge1xuICAgICAgICBzdXBlcih4LCB5LCB3LCBoLCBcInJlY3RcIik7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBmaWxsOiBmaWxsLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2UsXG4gICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMC41LFxuICAgICAgICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ2FsbCcgLy8gdG8gdHJpZ2dlciBob3ZlciBldmVuIHdpdGggdHJhbnNwYXJlbnQgYmFja2dyb3VuZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdmdJbWFnZSBleHRlbmRzIFN2Z0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIHVybCkge1xuICAgICAgICBzdXBlcih4LCB5LCB3LCBoLCBcImltYWdlXCIpO1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgXCJ4bGluazpocmVmXCI6IHVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VVcmwodXJsKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBcInhsaW5rOmhyZWZcIjogdXJsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyb3VwIGV4dGVuZHMgRHJhZ2dhYmxlUm90YXRhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJnXCIpO1xuICAgIH1cblxuICAgIGFkZENoaWxkKGVsKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChlbC4kZWwpO1xuICAgICAgICByZXR1cm4gZWw7IC8vIHBybyBqZWRub2R1c3NpIFwibGV0IHJlY3QgPSBnLmFkZENoaWxkKG5ldyBSZWN0YW5nbGUoLi4uXCJcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2x5bGluZVBvaW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIGlmKHggIT09IHVuZGVmaW5lZCAmJiB5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0KHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VGcm9tU3RyaW5nKHN0cmluZykge1xuICAgICAgICBsZXQgYXJyID0gc3RyaW5nLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2x5bGluZVBvaW50KGFyclswXSwgYXJyWzFdKTtcbiAgICB9XG5cbiAgICBnZXQgc3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICsgXCIsXCIgKyB0aGlzLnk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFscyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnggPT09IGIueCAmJiBhLnkgPT09IGIueTtcbiAgICB9XG59XG5cbmNsYXNzIFNtYXJ0QXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycikge1xuICAgICAgICBpZihhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hcnIgPSBhcnI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFyciA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIFNtYXJ0QXJyYXkoJC5leHRlbmQodHJ1ZSwgW10sIHRoaXMuYXJyKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKHBvaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFdpdGhJbmRleChwb2ludCwgdGhpcy5hcnIubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBwcmVwZW5kKHBvaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFdpdGhJbmRleChwb2ludCwgMCk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGEgcG9pbnQgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgbW92ZSBhbGwgZm9sbG93aW5nIGl0ZW1zXG4gICAgYWRkV2l0aEluZGV4KHBvaW50LCBpbmRleCkge1xuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLmFyci5sZW5ndGggOyBpID4gaW5kZXggOyAtLWkpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyW2ldID0gdGhpcy5hcnJbaS0xXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFycltpbmRleF0gPSBwb2ludDtcbiAgICAgICAgcmV0dXJuIHRoaXM7IC8vIHRvIGVuYWJsZSBjaGFpbmluZyBvZiBhcHBlbmQgLyBwcmVwcGVuZCAvIGFkZFdpdGhJbmRleCBjb21tYW5kc1xuICAgIH1cblxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyci5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0SXRlbShpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnJbaW5kZXhdO1xuICAgIH1cblxuICAgIGdldCBsYXN0KCkge1xuICAgICAgICBpZih0aGlzLmxlbmd0aCE9PTApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFyclt0aGlzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGZpcnN0KCkge1xuICAgICAgICBpZih0aGlzLmxlbmd0aCE9PTApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFyclswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGluZGV4QXJyYXkgbXVzdCBiZSBzb3J0ZWQgKEFTQywgZWcuIFsxLCAzLCA0LCA4XSlcbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IGluZGV4IDsgaSA8IGxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5hcnJbaV0gPSB0aGlzLmFycltpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcnIucG9wKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9seWxpbmVQb2ludHMgZXh0ZW5kcyBTbWFydEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcbiAgICAgICAgc3VwZXIoYXJyKTtcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvbHlsaW5lUG9pbnRzKCQuZXh0ZW5kKHRydWUsIFtdLCB0aGlzLmFycikpO1xuICAgIH1cblxuICAgIGFwcGVuZChwb2ludCkge1xuICAgICAgICAvLyBjYWxsIGluaGVyaXRlZCBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIGFwcGVuZGluZ1xuICAgICAgICBzdXBlci5hcHBlbmQocG9pbnQpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBzZWNvbmQgdG8gbGFzdCBwb2ludCBpcyB1bm5lY2Vzc2FyeSwgcmVtb3ZlIGl0XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgaWYgKCBsZW5ndGggPj0gM1xuICAgICAgICAgICAgICAgICYmICggICAgKCB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMykueCA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnggPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAxKS54IClcbiAgICAgICAgICAgICAgICAgICAgIHx8ICggdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDMpLnkgPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS55ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS55ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMSkueSApXG4gICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGxlbmd0aCAtIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMgZWxlbWVudCAodG8gYWxsb3cgY2hhaW5pbmcpXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHBhcnNlRnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgbGV0IHBvaW50U3RyaW5ncyA9IHN0cmluZy5zcGxpdChcIiBcIik7XG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgUG9seWxpbmVQb2ludHMoKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHBvaW50U3RyaW5ncy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIHBvaW50cy5hcHBlbmQoUG9seWxpbmVQb2ludC5wYXJzZUZyb21TdHJpbmcocG9pbnRTdHJpbmdzW2ldKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIGdldCBzdHJpbmcoKSB7XG4gICAgICAgIGxldCBzdHJpbmcgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBpZihpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyaW5nICs9IHRoaXMuYXJyW2ldLnN0cmluZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgIH1cblxuICAgIGZvckVhY2goZnVuYykge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYXJyLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgZnVuYyh0aGlzLmFycltpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2x5TGluZSBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IocG9pbnRzLCBjb2xvciwgc3Ryb2tlV2lkdGgpIHtcbiAgICAgICAgc3VwZXIoXCJwb2x5bGluZVwiKTtcblxuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgcG9pbnRzOiBwb2ludHMuc3RyaW5nLFxuICAgICAgICAgICAgc3Ryb2tlOiBjb2xvcixcbiAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgXCJzdHJva2Utd2lkdGhcIjogc3Ryb2tlV2lkdGhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlUG9pbnRzKHBvaW50cykge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgcG9pbnRzOiBwb2ludHMuc3RyaW5nXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhdHRlcm4gZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKGlkLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKFwicGF0dGVyblwiKTtcblxuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIHBhdHRlcm5Vbml0czogXCJ1c2VyU3BhY2VPblVzZVwiLFxuICAgICAgICAgICAgdmlld0JveDogXCIwIDAgXCIrd2lkdGgrXCIgXCIraGVpZ2h0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZENoaWxkKGVsKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChlbC4kZWwpO1xuICAgICAgICByZXR1cm4gZWw7IC8vIHBybyBqZWRub2R1c3NpIFwibGV0IHJlY3QgPSBnLmFkZENoaWxkKG5ldyBSZWN0YW5nbGUoLi4uXCJcbiAgICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGxvZ2ljIGZ1bmN0aW9ucyB1c2VkIGluIHRoZSBnYXRlIGV2YWx1YXRpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2ljIHtcbiAgICBzdGF0aWMgYW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLnRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIFtcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vZmZdLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLnVua25vd25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ11cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHN0YXRpYyBuYW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLm5vdChMb2dpYy5hbmQoYSwgYikpO1xuICAgIH1cbiAgICBzdGF0aWMgbm9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLm5vdChMb2dpYy5vcihhLCBiKSk7XG4gICAgfVxuICAgIHN0YXRpYyBub3QoYSkge1xuICAgICAgICBpZihhID09PSBMb2dpYy5zdGF0ZS5vbikge1xuICAgICAgICAgICAgcmV0dXJuIExvZ2ljLnN0YXRlLm9mZjtcbiAgICAgICAgfSBlbHNlIGlmIChhID09PSBMb2dpYy5zdGF0ZS5vZmYpIHtcbiAgICAgICAgICAgIHJldHVybiBMb2dpYy5zdGF0ZS5vbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBvcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy50ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBbXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vbl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBzdGF0aWMgeG5vcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy5ub3QoTG9naWMueG9yKGEsIGIpKTtcbiAgICB9XG4gICAgc3RhdGljIHhvcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy50ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBbXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1bmtub3duOiAwLFxuICAgICAgICAgICAgb246IDEsXG4gICAgICAgICAgICBvZmY6IDIsXG4gICAgICAgICAgICBvc2NpbGxhdGluZzogM1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIHJ1bGVzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHJ1bGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoKHJ1bGVzW2ldWzBdPT09YSAmJiBydWxlc1tpXVsxXT09PWIpIHx8IChydWxlc1tpXVswXT09PWIgJiYgcnVsZXNbaV1bMV09PT1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBydWxlc1tpXVsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBzdmdPYmogZnJvbSAnLi9zdmdPYmplY3RzLmpzJ1xuaW1wb3J0ICogYXMgU3RydWN0dXJlcyBmcm9tICcuL3N0cnVjdHVyZXNBbmRDbGFzc2VzLmpzJ1xuaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMuanMnXG5cbi8vIG1hcHBpbmcgbG9naWNhbCBzdGF0ZXMgdG8gY3NzIGNsYXNzZXNcbmNvbnN0IHN0YXRlQ2xhc3NlcyA9IHtcbiAgICBvbjogXCJzdGF0ZU9uXCIsXG4gICAgb2ZmOiBcInN0YXRlT2ZmXCIsXG4gICAgdW5rbm93bjogXCJzdGF0ZVVua25vd25cIixcbiAgICBvc2NpbGxhdGluZzogXCJzdGF0ZU9zY2lsbGF0aW5nXCJcbn07XG5cbi8vIGhlbHBlciBjbGFzcyB1c2VkIGJ5IFRyYW5zZm9ybVxuY2xhc3MgUHJvcGVydHkge1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZykge1xuICAgICAgICBpZihzdHJpbmchPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHN0cmluZy5yZXBsYWNlKC9eWyBdKihbXihdKykuKi8sIFwiJDFcIik7XG4gICAgICAgICAgICB0aGlzLmFyZ3MgPSBzdHJpbmcucmVwbGFjZSgvXlteKF0rXFwoKC4qKVxcKS8sIFwiJDFcIikuc3BsaXQoJyAnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE5hbWUobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIHNldEFyZ3VtZW50cyhhcmdzKSB7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCIoXCIgKyB0aGlzLmFyZ3Muam9pbihcIiBcIikgKyBcIilcIjtcbiAgICB9XG59XG5cbi8vIHVzZWQgdG8gbWFuaXB1bGF0ZSB0aGUgdHJhbnNmb3JtIGFyZ3VtZW50IHVzZWQgaW4gU1ZHXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgICAgIGlmKHN0cmluZyE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IHNwbGl0SXRlbXMgPSBzdHJpbmcuc3BsaXQoXCIpXCIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBzcGxpdEl0ZW1zLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKHNwbGl0SXRlbXNbaV0pIHsgLy8gaWYgbm90IGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgUHJvcGVydHkoc3BsaXRJdGVtc1tpXSArIFwiKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBpbmRleCBvciAtMVxuICAgIGdldEluZGV4KG5hbWUpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihuYW1lID09PSB0aGlzLml0ZW1zW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBnZXRUcmFuc2xhdGUoKSB7XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5nZXRBcmd1bWVudHModGhpcy5nZXRJbmRleChcInRyYW5zbGF0ZVwiKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGFyZ3NbMF0sXG4gICAgICAgICAgICB5OiBhcmdzWzFdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRSb3RhdGUoKSB7XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5nZXRBcmd1bWVudHModGhpcy5nZXRJbmRleChcInJvdGF0ZVwiKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlZzogYXJnc1swXSxcbiAgICAgICAgICAgIGNlbnRyZVg6IGFyZ3NbMV0sXG4gICAgICAgICAgICBjZW50cmVZOiBhcmdzWzJdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXRzIHRoZSB0cmFuc2xhdGlvblxuICAgIHNldFRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFwidHJhbnNsYXRlXCIsIFt4LCB5XSk7XG4gICAgfVxuXG4gICAgLy8gc2V0cyB0aGUgcm90YXRpb25cbiAgICBzZXRSb3RhdGUoZGVnLCBjZW50cmVYLCBjZW50cmVZKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFwicm90YXRlXCIsIFtkZWcsIGNlbnRyZVgsIGNlbnRyZVldKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdGhlIHJvdGF0aW9uXG4gICAgcm90YXRlUmlnaHQoY2VudHJlWCwgY2VudHJlWSkge1xuICAgICAgICBpZih0aGlzLmdldEluZGV4KFwicm90YXRlXCIpPT09LTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Um90YXRlKDkwLCBjZW50cmVYLCBjZW50cmVZKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXdSb3RhdGlvbiA9IChwYXJzZUludCh0aGlzLmdldFJvdGF0ZSgpLmRlZykgKyA5MCkgJSAzNjA7XG5cbiAgICAgICAgICAgIGlmKG5ld1JvdGF0aW9uPT09MTgwKSB7XG4gICAgICAgICAgICAgICAgLy8gc3dhcCBjZW50cmUgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIHJvdGF0ZShjLCB4LCB5KSBpcyBkZWZpbmVkIGxpa2UgdHJhbnNmb3JtKC14LCAteSkgcm90YXRlKGMpIHRyYW5zZm9ybSh4LCB5KVxuICAgICAgICAgICAgICAgIGxldCBhID0gY2VudHJlWDtcbiAgICAgICAgICAgICAgICBjZW50cmVYID0gY2VudHJlWTtcbiAgICAgICAgICAgICAgICBjZW50cmVZID0gYTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRSb3RhdGUoXG4gICAgICAgICAgICAgICAgbmV3Um90YXRpb24sXG4gICAgICAgICAgICAgICAgY2VudHJlWCxcbiAgICAgICAgICAgICAgICBjZW50cmVZXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0aGUgdHJhbnNmb3JtIHByb3BlcnRpZXMgY29uY2F0ZW5hdGVkXG4gICAgZ2V0KCkge1xuICAgICAgICBsZXQgcmV0VmFsID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoaSE9PTApIHtcbiAgICAgICAgICAgICAgICByZXRWYWwgKz0gXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXRWYWwgKz0gdGhpcy5pdGVtc1tpXS5nZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cblxuICAgIGdldEFyZ3VtZW50cyhpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tpbmRleF0uYXJncztcbiAgICB9XG5cbiAgICBzZXRQYXJhbWV0ZXIobmFtZSwgYXJncykge1xuICAgICAgICAvLyBkZXRlcm1pbmUgaW5kZXggb2YgdGhlIHBhcmFtZXRlciAoaWYgc2V0KSwgZWxzZSBpbmRleCA9PSAtMVxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4KG5hbWUpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBoYXMgYmVlbiBhbHJlYWR5IHNldCwgY2hhbmdlIGl0IChyZXdyaXRlIHRoZSBhcnJheSBpbiB0aGUgcmlnaHQgaW5kZXgpXG4gICAgICAgIC8vIGVsc2UgY3JlYXRlIGEgbmV3IG9uZSAoc2V0IGluZGV4IHRvIHRoZSBsZW5ndGggb2YgYW4gYXJyYXkgLS0+IGFkIGFuIGl0ZW0gdG8gdGhlIGVuZClcbiAgICAgICAgaWYoaW5kZXg9PT0tMSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdID0gbmV3IFByb3BlcnR5KCk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5zZXROYW1lKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2F2ZSBhcmdzIHVuZGVyIHRoZSByaWdodCBpbmRleFxuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5zZXRBcmd1bWVudHMoYXJncyk7XG4gICAgfVxufVxuXG4vLyBwYXJlbnQgY2xhc3MgZm9yIGFsbCBuZXR3b3JrIGVsZW1lbnRzXG5jbGFzcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIGlmKCFwYXJlbnRTVkcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQYXJlbnQgU1ZHIGVsZW1lbnQgaGFzIG5vdCBiZWVuIGRlZmluZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIC8vIHVzZWQgdG8gc3RvcmUgdGhlIHN2ak9iamVjdCdzIGluc3RhbmNlIG9mIHRoaXMgZWxlbWVudFxuICAgICAgICB0aGlzLnN2Z09iaiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iai5pZDtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bigpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24gdG8gcHJldmVudCBlcnJvciBtZXNzYWdlcywgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbGF0ZXIgaW4gdGhlIEJveCBjbGFzc1xuICAgIH1cblxuICAgIG9uTW91c2VVcCgpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24gdG8gcHJldmVudCBlcnJvciBtZXNzYWdlcywgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbGF0ZXIgaW4gdGhlIEJveCBhbmQgQ29ubmVjdG9yIGNsYXNzZXNcbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZSgpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24gdG8gcHJldmVudCBlcnJvciBtZXNzYWdlcywgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbGF0ZXIgaW4gdGhlIEJveCBjbGFzc1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiJ2pzb24nIGdldHRlciBoYXMgbm90IGJlZW4gZGVmaW5lZCBmb3IgdGhpcyBlbGVtZW50XCIsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBpbnB1dCBhbmQgb3V0cHV0IGNvbm5lY3RvcnMgKHRoZSB0aGluZ3MgeW91IGNsaWNrIG9uXG4vLyB3aGVuIHlvdSB3YW50IHRvIGNvbm5lY3QgZWxlbWVudHMpXG5jbGFzcyBDb25uZWN0b3IgZXh0ZW5kcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKSB7IC8vIHVuaXQgb2YgbGVmdCAvIHRvcCBpcyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZFxuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTaXplID0gZ3JpZFNpemU7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yT2Zmc2V0ID0gdGhpcy5jb25uZWN0b3JTaXplIC8gMjtcblxuICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouUmVjdGFuZ2xlKFxuICAgICAgICAgICAgbGVmdCAqIHRoaXMuZ3JpZFNpemUgLSB0aGlzLmNvbm5lY3Rvck9mZnNldCxcbiAgICAgICAgICAgIHRvcCAqIHRoaXMuZ3JpZFNpemUgLSB0aGlzLmNvbm5lY3Rvck9mZnNldCxcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2l6ZSxcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2l6ZSxcbiAgICAgICAgICAgIFwibm9uZVwiLFxuICAgICAgICAgICAgXCJibGFja1wiXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKFwiY29ubmVjdG9yXCIpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gZmFsc2U7XG5cbiAgICAgICAgLy8gaWYgYSB3aXJlIGNhbiBzZXQgY29ubmVjdG9yJ3Mgc3RhdGVcbiAgICAgICAgdGhpcy5pc0lucHV0Q29ubmVjdG9yID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBMb2dpYy5zdGF0ZS51bmtub3duO1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG5cbiAgICAgICAgdGhpcy53aXJlSWRzID0gbmV3IFNldCgpO1xuICAgIH1cblxuICAgIGdldCBpc091dHB1dENvbm5lY3RvcigpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzSW5wdXRDb25uZWN0b3I7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5wdXRDb25uZWN0b3I6IDAsXG4gICAgICAgICAgICBvdXRwdXRDb25uZWN0b3I6IDFcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFdpcmVJZCh3aXJlSWQpIHtcbiAgICAgICAgdGhpcy53aXJlSWRzLmFkZCh3aXJlSWQpO1xuICAgIH1cblxuICAgIHJlbW92ZVdpcmVJZCh3aXJlSWQpIHtcbiAgICAgICAgdGhpcy53aXJlSWRzLmRlbGV0ZSh3aXJlSWQpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZXMgdGhlIHdpcmUgYW5kIHVwZGF0ZXMgdGhlIGNvbm5lY3RvclxuICAgIHJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVXaXJlSWQod2lyZUlkKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSwgcHJvcGFnYXRpb25JZCkge1xuICAgICAgICB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub2ZmOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vZmYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlQXR0cjtcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iajtcbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHLndpcmVDcmVhdGlvbkhlbHBlcih0aGlzLnN2Z09iai5pZCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRDb25uZWN0b3IgZXh0ZW5kcyBDb25uZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuXG5cbiAgICAgICAgdGhpcy50eXBlID0gQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3I7XG4gICAgICAgIHRoaXMuaXNJbnB1dENvbm5lY3RvciA9IHRydWU7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3VwZXIuc2V0U3RhdGUoc3RhdGUpO1xuXG4gICAgICAgIGxldCBnYXRlID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZCh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIGdhdGUucmVmcmVzaFN0YXRlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCkge1xuICAgICAgICBzdXBlci5yZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShMb2dpYy5zdGF0ZS51bmtub3duKTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRDb25uZWN0b3IgZXh0ZW5kcyBDb25uZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuXG4gICAgICAgIC8vIHVzZWQgdG8gc2V0IHRoZSB3aXJlIHN0YXRlIGR1cmluZyB3aXJlIGluaXRpYWxpemF0aW9uIGJhc2VkIG9uIHRoZSBvdXRwdXQgY29ubmVjdG9yIHN0YXRlXG4gICAgICAgIHRoaXMuaXNPdXRwdXQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudHlwZSA9IENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3RvcjtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBzdXBlci5zZXRTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB3aXJlSWQgb2YgdGhpcy53aXJlSWRzKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5nZXRXaXJlQnlJZCh3aXJlSWQpLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXRlO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBnYXRlcyBhbmQgaW5wdXQgYW5kIG91dHB1dCBib3hlc1xuY2xhc3MgQm94IGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSwgY2F0ZWdvcnksIGdyaWRXaWR0aCwgZ3JpZEhlaWdodCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IHRoaXMucGFyZW50U1ZHLmdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMudXJsID0gXCJpbWcvXCIgKyB0aGlzLmNhdGVnb3J5ICsgXCIvXCIgKyB0aGlzLm5hbWUgKyBcIi5zdmdcIjtcblxuICAgICAgICB0aGlzLmNvbm5lY3RvcnMgPSBbXTtcblxuICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouR3JvdXAoKTtcblxuICAgICAgICB0aGlzLndpZHRoID0gZ3JpZFdpZHRoICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBncmlkSGVpZ2h0ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmdyaWRXaWR0aCA9IGdyaWRXaWR0aDtcbiAgICAgICAgdGhpcy5ncmlkSGVpZ2h0ID0gZ3JpZEhlaWdodDtcblxuICAgICAgICAvLyB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICAgICAgICBsZXQgcmVjdGFuZ2xlID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIFwibm9uZVwiLCBcIm5vbmVcIik7XG4gICAgICAgIHJlY3RhbmdsZS4kZWwuYWRkQ2xhc3MoJ3JlY3QnKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQocmVjdGFuZ2xlKTtcbiAgICAgICAgLy8gaW1hZ2Ugb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBzdmdPYmouU3ZnSW1hZ2UoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMudXJsKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICAgICAgLy8gYWRkIGRyYWdnYWJpbGl0eSBhbmQgcm90YXRhYmlsaXR5XG4gICAgICAgIHRoaXMuc3ZnT2JqLmRyYWdnYWJsZSh0cnVlKTtcbiAgICAgICAgdGhpcy5zdmdPYmoucm90YXRhYmxlKHRydWUpO1xuXG4gICAgICAgIC8vIGFkZCB0eXBlPVwiZ2F0ZVwiLCB1c2VkIGluIHNwZWNpYWwgY2FsbGJhY2tzIGluIGNvbnRleHRtZW51XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHlwZVwiOiBjYXRlZ29yeX0pO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcImJveFwiKTtcbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKGNhdGVnb3J5KTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2RlcygpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dENvbm5lY3RvcnMoKSB7XG4gICAgICAgIHJldHVybiBjb25uZWN0b3JzLmZpbHRlcihjb25uID0+IGNvbm4uaXNJbnB1dENvbm5lY3RvcilcbiAgICB9XG5cbiAgICBnZXQgb3V0cHV0Q29ubmVjdG9ycygpIHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3RvcnMuZmlsdGVyKGNvbm4gPT4gY29ubi5pc091dHB1dENvbm5lY3RvcilcbiAgICB9XG5cbiAgICAvLyBoZWxwZXIsIHNldCB0byB0cnVlLCBpZiB0aGUgZWxlbWVudCB0cmlnZ2VycyBzaW11bGF0aW9uIG9uIHJlZnJlc2hTdGF0ZVxuICAgIHN0YXRpYyBnZXQgdHJpZ2dlcnNTaW11bGF0aW9uT25SZWZyZXNoKCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgbGV0IGNvbm5lY3Rpb25zID0gW107XG5cbiAgICAgICAgLy8gZ28gdGhyb3VnaCBhbGwgY29ubmVjdG9yc1xuICAgICAgICBsZXQgY291bnRlciA9IDBcbiAgICAgICAgZm9yIChjb25zdCBjb25uIG9mIHRoaXMuY29ubmVjdG9ycykge1xuICAgICAgICAgICAgLy8gZ28gdGhyb3VnaCBlYWNoIGl0cyB3aXJlIGlkXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY29ubi53aXJlSWRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRoaXNXaXJlSWQ7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZE1hcC5oYXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHdpcmUgaWQgaXMgbm90IGluIHRoZSBtYXAsIGFkZCBpdCBhbmQgYXNzaWduIG5ldyBhcmJpdHJhcnkgaWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkTWFwLnNldChpdGVtLCB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzV2lyZUlkID0gdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWQrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGdldCBpZCBmcm9tIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgdGhpc1dpcmVJZCA9IHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZE1hcC5nZXQoaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhpcyBjb25uZWN0aW9uIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbnNbY29ubmVjdGlvbnMubGVuZ3RoXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGNvdW50ZXIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGNvbm4udHlwZSxcbiAgICAgICAgICAgICAgICAgICAgd2lyZUlkOiB0aGlzV2lyZUlkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXIrK1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIC8vIGlkOiB0aGlzLnN2Z09iai5pZCxcbiAgICAgICAgICAgIGNhdGVnb3J5OiB0aGlzLmNhdGVnb3J5LFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0aGlzLmdldFRyYW5zZm9ybSgpLFxuICAgICAgICAgICAgY29ubmVjdGlvbnM6IGNvbm5lY3Rpb25zXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKG1hcmdpblRvcCA9IDAsIG1hcmdpblJpZ2h0ID0gMCwgbWFyZ2luQm90dG9tID0gMCwgbWFyZ2luTGVmdCA9IDAsIC4uLnNwZWNpYWxOb2Rlcykge1xuICAgICAgICB0aGlzLmJsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yKGxldCB4ID0gbWFyZ2luTGVmdCA7IHggPD0gdGhpcy5ncmlkV2lkdGggLSBtYXJnaW5SaWdodCA7IHgrKykge1xuICAgICAgICAgICAgZm9yKGxldCB5ID0gbWFyZ2luVG9wIDsgeSA8PSB0aGlzLmdyaWRIZWlnaHQgLSBtYXJnaW5Cb3R0b20gOyB5KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICB5OiB5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBub2RlIG9mIHNwZWNpYWxOb2Rlcykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuYWRkKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiwgcmVkZWZpbmVkIGluIGluaGVyaXRlZCBlbGVtZW50c1xuICAgICAgICAvLyByZWZyZXNoU3RhdGUgdGFrZXMgaW5wdXQgY29ubmVjdG9yIHZhbHVlcyBhbmQgc2V0cyBvdXRwdXQgdmFsdWVzIGFjY29yZGluZ2x5XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNhbGxpbmcgdGhlIHZpcnR1YWwgZnVuY3Rpb24gcmVmcmVzaFN0YXRlIGhhcyBubyBlZmZlY3QuXCIpO1xuICAgIH1cblxuICAgIC8vIHVzYWdlOiBjaGFuZ2VJbWFnZShcImFiY1wiKSBjaGFuZ2VzIGltYWdlIHVybCB0byBpbWFnZS1hYmMuc3ZnXG4gICAgLy8gICAgICAgIGNoYW5nZUltYWdlKCkgY2hhbmdlcyBpbWFnZSB1cmwgdG8gdGhlIGRlZmF1bHQgb25lIChpbWFnZS5zdmcpXG4gICAgY2hhbmdlSW1hZ2Uoc3VmZml4KSB7XG4gICAgICAgIGlmKHN1ZmZpeCA9PT0gdW5kZWZpbmVkIHx8IHN1ZmZpeCA9PT0gXCJcIikge1xuICAgICAgICAgICAgc3VmZml4ID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1ZmZpeCA9IFwiLVwiICsgc3VmZml4O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXJsID0gXCJpbWcvXCIgKyB0aGlzLmNhdGVnb3J5ICsgXCIvXCIgKyB0aGlzLm5hbWUgKyBzdWZmaXggKyBcIi5zdmdcIjtcblxuICAgICAgICB0aGlzLmltYWdlLmNoYW5nZVVybCh0aGlzLnVybCk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBhIGpRdWVyeSBvYmplY3RcbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iai5nZXQoKTtcbiAgICB9XG5cbiAgICByZW1vdmVCbG9ja2VkTm9kZSh4LCB5KSB7XG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLmJsb2NrZWROb2Rlcykge1xuICAgICAgICAgICAgaWYoaXRlbS54PT09eCAmJiBpdGVtLnk9PT15KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZGVsZXRlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcm90YXRlQmxvY2tlZE5vZGVzUmlnaHQoKSB7XG4gICAgICAgIGlmKHRoaXMucm90YXRpb249PT11bmRlZmluZWQgfHwgdGhpcy5yb3RhdGlvbj09PTQpIHtcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm90YXRpb24rKztcblxuICAgICAgICBpZih0aGlzLnJvdGF0aW9uID09PSAxIHx8IHRoaXMucm90YXRpb24gPT09IDMpIHtcbiAgICAgICAgICAgIGxldCBuZXdCbG9ja2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIG5ld0Jsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmFicyhpdGVtLnkgLSB0aGlzLmdyaWRIZWlnaHQpLFxuICAgICAgICAgICAgICAgICAgICB5OiBpdGVtLnhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMgPSBuZXdCbG9ja2VkTm9kZXM7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLnJvdGF0aW9uID09PSAyIHx8IHRoaXMucm90YXRpb24gPT09IDQpIHtcbiAgICAgICAgICAgIGxldCBuZXdCbG9ja2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIG5ld0Jsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmFicyhpdGVtLnkgLSB0aGlzLmdyaWRXaWR0aCksXG4gICAgICAgICAgICAgICAgICAgIHk6IGl0ZW0ueFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2RlcyA9IG5ld0Jsb2NrZWROb2RlcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENvbm5lY3RvcihsZWZ0LCB0b3AsIGNvbm5lY3RvclR5cGUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jb25uZWN0b3JzLmxlbmd0aDtcbiAgICAgICAgaWYoY29ubmVjdG9yVHlwZT09PUNvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbaW5kZXhdID0gbmV3IElucHV0Q29ubmVjdG9yKHRoaXMucGFyZW50U1ZHLCB0aGlzLmdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzW2luZGV4XSA9IG5ldyBPdXRwdXRDb25uZWN0b3IodGhpcy5wYXJlbnRTVkcsIHRoaXMuZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQodGhpcy5jb25uZWN0b3JzW2luZGV4XS5nZXQoKSk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVCbG9ja2VkTm9kZShsZWZ0LCB0b3ApO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIGNvbm5lY3RvciBvYmplY3QgYmFzZWQgb24gaXRzIGlkXG4gICAgZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuY29ubmVjdG9ycy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY29ubmVjdG9yc1tpXS5pZD09PWNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBjb25uZWN0b3Igbm90IGZvdW5kLCByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNmb3JtKCkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtO1xuICAgICAgICBpZiAoIXRoaXMuc3ZnT2JqLiRlbC5hdHRyKFwidHJhbnNmb3JtXCIpKSB7XG4gICAgICAgICAgICAvLyB0aGUgZWxlbWVudCBkb2VzIG5vdCBoYXZlIGEgXCJ0cmFuc2Zvcm1cIiBwcm9wZXJ0eSAtLT4gY3JlYXRlIGl0XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKCk7XG4gICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKDAsIDApO1xuICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGUgZWxlbWVudCBkb2VzIGhhdmUgYSBcInRyYW5zZm9ybVwiIHByb3BlcnR5IC0tPiBjaGFuZ2UgaXRcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcy5zdmdPYmouJGVsLmF0dHIoXCJ0cmFuc2Zvcm1cIikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm07XG4gICAgfVxuXG4gICAgc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInRyYW5zZm9ybVwiOiB0cmFuc2Zvcm0uZ2V0KCl9KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICB0aGlzLm1vdXNlTGVmdCA9IGZhbHNlO1xuICAgICAgICBpZihldmVudC53aGljaCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5tb3VzZUxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlRG93bkxlZnQoZXZlbnQpO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBET00gZWxlbWVudCB0byBmcm9udFxuICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcubW92ZVRvRnJvbnRCeUlkKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VEb3duTGVmdChldmVudCkge1xuICAgICAgICB0aGlzLm1vdXNlTW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcblxuICAgICAgICAvLyBzYXZlIHRoZSBjdXJyZW50IGl0ZW0gcG9zaXRpb24gaW50byBhIHZhcmlhYmxlXG4gICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSB0cmFuc2Zvcm0uZ2V0VHJhbnNsYXRlKCk7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIG1vdXNlIG9mZnNldCBmcm9tIHRoZSBvYmplY3Qgb3JpZ2luXG4gICAgICAgIHRoaXMub2Zmc2V0ID0ge1xuICAgICAgICAgICAgeDogZXZlbnQucGFnZVggLSBjdXJyZW50UG9zaXRpb24ueCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnBhZ2VZIC0gY3VycmVudFBvc2l0aW9uLnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZShldmVudCkge1xuICAgICAgICBpZih0aGlzLm1vdXNlTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgbGV0IGxlZnQgPSBldmVudC5wYWdlWCAtIHRoaXMub2Zmc2V0Lng7XG4gICAgICAgICAgICBsZXQgdG9wID0gZXZlbnQucGFnZVkgLSB0aGlzLm9mZnNldC55O1xuXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybS5zZXRUcmFuc2xhdGUobGVmdCwgdG9wKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVXaXJlcyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VVcChldmVudCkge1xuICAgICAgICBpZihldmVudC53aGljaCA9PT0gMSkge1xuICAgICAgICAgICAgaWYodGhpcy5tb3VzZU1vdmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRyb3AoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gMiApIHtcbiAgICAgICAgICAgIHRoaXMub25DbGlja01pZGRsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50KSB7XG4gICAgICAgIGxldCBsZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLm9mZnNldC54O1xuICAgICAgICBsZXQgdG9wID0gZXZlbnQucGFnZVkgLSB0aGlzLm9mZnNldC55O1xuXG4gICAgICAgIGxlZnQgPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKGxlZnQpO1xuICAgICAgICB0b3AgPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRvcCk7XG5cbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG4gICAgICAgIHRyYW5zZm9ybS5zZXRUcmFuc2xhdGUobGVmdCwgdG9wKTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlV2lyZXMoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiwgd2lsbCBiZSByZWRlZmluZWQgaW4gSW5wdXRCb3hcbiAgICB9XG5cbiAgICBvbkNsaWNrTWlkZGxlKCkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcblxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuc3ZnT2JqLiRlbFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBsZXQgY2VudHJlWCA9IE1hdGgucm91bmQocmVjdC53aWR0aCAvIDIpO1xuICAgICAgICBsZXQgY2VudHJlWSA9IE1hdGgucm91bmQocmVjdC5oZWlnaHQgLyAyKTtcblxuICAgICAgICBjZW50cmVYIC09IGNlbnRyZVggJSB0aGlzLmdyaWRTaXplO1xuICAgICAgICBjZW50cmVZIC09IGNlbnRyZVkgJSB0aGlzLmdyaWRTaXplO1xuXG4gICAgICAgIHRyYW5zZm9ybS5yb3RhdGVSaWdodChcbiAgICAgICAgICAgIGNlbnRyZVgsXG4gICAgICAgICAgICBjZW50cmVZXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG5cbiAgICAgICAgdGhpcy5yb3RhdGVCbG9ja2VkTm9kZXNSaWdodCgpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlV2lyZXMoKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGVzIGFsbCB3aXJlcyBjb25uZWN0ZWQgdG8gdGhpcyBib3hcbiAgICB1cGRhdGVXaXJlcyh0ZW1wb3JhcnkgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNvbm5lY3RvcnMuZm9yRWFjaChjb25uID0+IHtcbiAgICAgICAgICAgIGNvbm4ud2lyZUlkcy5mb3JFYWNoKHdpcmVJZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHdpcmUgPSB0aGlzLnBhcmVudFNWRy5nZXRXaXJlQnlJZCh3aXJlSWQpO1xuICAgICAgICAgICAgICAgIGlmKHRlbXBvcmFyeSkge1xuICAgICAgICAgICAgICAgICAgICB3aXJlLnRlbXBvcmFyeVdpcmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aXJlLnJvdXRlV2lyZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRCb3ggZXh0ZW5kcyBCb3gge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgaXNPbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gNztcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDtcblxuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIFwiaW5wdXRcIiwgXCJpb1wiLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmFkZENvbm5lY3Rvcih3aWR0aCwgaGVpZ2h0IC8gMiwgQ29ubmVjdG9yLnR5cGUub3V0cHV0Q29ubmVjdG9yKTtcblxuICAgICAgICB0aGlzLm9uID0gaXNPbjtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBzdXBlci5leHBvcnREYXRhO1xuICAgICAgICBkYXRhLmlzT24gPSB0aGlzLmlzT247XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcygpIHtcbiAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDEsIDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgdHJpZ2dlcnNTaW11bGF0aW9uT25SZWZyZXNoKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgLy8gY2FsbCB0aGUgb24gc2V0dGVyIGFnYWluICh0byByZWZyZXNoIHRoZSBzdGF0ZSBvZiB0aGUgY29ubmVjdGVkIHdpcmVzKVxuICAgICAgICB0aGlzLnBhcmVudFNWRy5zdGFydE5ld1NpbXVsYXRpb24odGhpcy5jb25uZWN0b3JzWzBdLCB0aGlzLmNvbm5lY3RvcnNbMF0uc3RhdGUpXG4gICAgfVxuXG4gICAgc2V0IG9uKGlzT24pIHtcbiAgICAgICAgaWYgKGlzT24pIHtcbiAgICAgICAgICAgIC8vIHR1cm4gb25cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvblwiKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5zdGF0ZS5vbik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9mZlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLnN0YXRlLm9mZik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzT24gPSBpc09uO1xuICAgIH1cblxuICAgIGdldCBvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPbjtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICB0aGlzLm9uID0gIXRoaXMub247XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA1O1xuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgXCJvdXRwdXRcIiwgXCJpb1wiLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuY29ubmVjdG9yc1swXS5zdGF0ZSk7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib25cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib2ZmXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9zY1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcygpIHtcbiAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDAsIDAsIDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdhdGUgZXh0ZW5kcyBCb3gge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBuYW1lLCBcImdhdGVcIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgLy8gb3V0cHV0XG4gICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKHdpZHRoLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5vdXRwdXRDb25uZWN0b3IpO1xuXG4gICAgICAgIGlmKHRoaXMubmFtZT09PVwibm90XCIpIHtcbiAgICAgICAgICAgIC8vIGlucHV0XG4gICAgICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpbnB1dFxuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gNCwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gKDQvMyksIENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKTtcblxuICAgICAgICAgICAgLy8gYWRkIG9uZSBibG9ja2VkTm9kZSBiZXR3ZWVuIHRoZSBpbnB1dHMgKGZvciBiZXR0ZXIgbG9va2luZyB3aXJpbmcpXG4gICAgICAgICAgICAvLyBhbmQgcmVnZW5lcmF0ZSBibG9ja2VkIG5vZGVzXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2Rlcyh7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiBoZWlnaHQgLyAyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXRlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKHNwZWNpYWxOb2RlKSB7XG4gICAgICAgIGlmKHNwZWNpYWxOb2RlIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdXBlci5nZW5lcmF0ZUJsb2NrTm9kZXMoMCwgMSwgMCwgMSwgc3BlY2lhbE5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDAsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICBsZXQgc3RhdGUgPSBMb2dpYy5zdGF0ZS51bmtub3duXG4gICAgICAgIHN3aXRjaCAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMuYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5hbmRcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5uYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLm5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub3RcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5ub3QodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLnhub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMueG9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vdGlmeSB0aGUgc2ltdWxhdG9yIGFib3V0IHRoaXMgY2hhbmdlXG4gICAgICAgIHRoaXMucGFyZW50U1ZHLnNpbXVsYXRvci5ub3RpZnlDaGFuZ2UodGhpcy5jb25uZWN0b3JzWzBdLmlkLCBzdGF0ZSlcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXaXJlIGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZnJvbUlkLCB0b0lkLCBncmlkU2l6ZSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgLy8gc21hbGwgdG9kbzogcmV3b3JrIHN0YXJ0Li4uIGVuZC4uLiB0byBhcnJheXM/IChub3QgaW1wb3J0YW50KVxuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRyk7XG5cbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMuZnJvbUlkID0gZnJvbUlkO1xuICAgICAgICB0aGlzLnRvSWQgPSB0b0lkO1xuXG4gICAgICAgIHRoaXMuc3RhcnRCb3ggPSB0aGlzLnBhcmVudFNWRy5nZXRCb3hCeUNvbm5lY3RvcklkKGZyb21JZCk7XG4gICAgICAgIHRoaXMuZW5kQm94ID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZCh0b0lkKTtcblxuICAgICAgICB0aGlzLmJveGVzID0gW3RoaXMuc3RhcnRCb3gsIHRoaXMuZW5kQm94XVxuXG4gICAgICAgIHRoaXMuc3RhcnRDb25uZWN0b3IgPSB0aGlzLnBhcmVudFNWRy5nZXRDb25uZWN0b3JCeUlkKGZyb21JZCk7XG4gICAgICAgIHRoaXMuZW5kQ29ubmVjdG9yID0gdGhpcy5wYXJlbnRTVkcuZ2V0Q29ubmVjdG9yQnlJZCh0b0lkKTtcblxuICAgICAgICB0aGlzLmNvbm5lY3RvcnMgPSBbdGhpcy5zdGFydENvbm5lY3RvciwgdGhpcy5lbmRDb25uZWN0b3JdXG4gICAgICAgIHRoaXMucm91dGVXaXJlKHRydWUsIHJlZnJlc2gpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gTG9naWMuc3RhdGUudW5rbm93bjtcblxuICAgICAgICBmb3IgKGxldCBjb25uZWN0b3Igb2YgdGhpcy5jb25uZWN0b3JzKSB7XG4gICAgICAgICAgICBpZihjb25uZWN0b3IuaXNPdXRwdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKGNvbm5lY3Rvci5zdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN2Z09iai4kZWwuYWRkQ2xhc3MoXCJ3aXJlXCIpO1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZnJvbUlkOiB0aGlzLmZyb21JZCxcbiAgICAgICAgICAgIHRvSWQ6IHRoaXMudG9JZFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLnVua25vd246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vZmY6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9mZik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGFydENvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q29ubmVjdG9yLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmVuZENvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmVuZENvbm5lY3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IHN0YXRlO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVBdHRyO1xuICAgIH1cblxuICAgIHVwZGF0ZVdpcmVTdGF0ZSgpIHtcbiAgICAgICAgZm9yIChjb25zdCBib3ggb2YgdGhpcy5ib3hlcykge1xuICAgICAgICAgICAgYm94LnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yIChjb25zdCBjb25uIG9mIHRoaXMuY29ubmVjdG9ycykge1xuICAgICAgICAvLyAgICAgaWYoY29ubi5pc091dHB1dENvbm5lY3Rvcikge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMucGFyZW50U1ZHLnN0YXJ0TmV3U2ltdWxhdGlvbihjb25uLmlkLCBjb25uLnN0YXRlKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmouZ2V0KCk7XG4gICAgfVxuXG4gICAgZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cygpIHtcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBzdmdPYmouUG9seWxpbmVQb2ludHMoKTtcbiAgICAgICAgcG9pbnRzLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy53aXJlU3RhcnQueCwgdGhpcy53aXJlU3RhcnQueSkpO1xuICAgICAgICBwb2ludHMuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLndpcmVFbmQueCwgdGhpcy53aXJlRW5kLnkpKTtcbiAgICAgICAgcmV0dXJuIHBvaW50cztcbiAgICB9XG5cbiAgICB0ZW1wb3JhcnlXaXJlKCkge1xuICAgICAgICB0aGlzLndpcmVTdGFydCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5zdGFydENvbm5lY3RvciwgZmFsc2UpO1xuICAgICAgICB0aGlzLndpcmVFbmQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuZW5kQ29ubmVjdG9yLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5zZXRXaXJlUGF0aCh0aGlzLmdldFRlbXBvcmFyeVdpcmVQb2ludHMoKSk7XG5cbiAgICAgICAgLy8gdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICAvLyB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG4gICAgfVxuXG4gICAgcm91dGVXaXJlKHNuYXBUb0dyaWQgPSB0cnVlLCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLndpcmVTdGFydCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5zdGFydENvbm5lY3Rvciwgc25hcFRvR3JpZCk7XG4gICAgICAgIHRoaXMud2lyZUVuZCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5lbmRDb25uZWN0b3IsIHNuYXBUb0dyaWQpO1xuXG4gICAgICAgIHRoaXMucG9pbnRzID0gdGhpcy5hU3RhcihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLndpcmVTdGFydC54IC8gdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLndpcmVTdGFydC55IC8gdGhpcy5ncmlkU2l6ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLndpcmVFbmQueCAvIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgeTogdGhpcy53aXJlRW5kLnkgLyB0aGlzLmdyaWRTaXplXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFdpcmVQYXRoKHRoaXMucG9pbnRzKTtcblxuICAgICAgICBpZiAocmVmcmVzaClcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2lyZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgc2V0V2lyZVBhdGgocG9pbnRzKSB7XG4gICAgICAgIC8vIHNldCB0aGUgbGluZVxuICAgICAgICBpZih0aGlzLnN2Z09iaiE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdmdPYmoudXBkYXRlUG9pbnRzKHBvaW50cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouUG9seUxpbmUocG9pbnRzLCBcIiM4YjhiOGJcIiwgMik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcblxuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcbiAgICAgICAgICAgIGZyb21JZDogdGhpcy5mcm9tSWQsXG4gICAgICAgICAgICB0b0lkOiB0aGlzLnRvSWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8vIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIHRoaXMgcHNldWRvY29kZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQSpfc2VhcmNoX2FsZ29yaXRobSNQc2V1ZG9jb2RlXG4gICAgYVN0YXIoc3RhcnQsIGVuZCkge1xuICAgICAgICAvLyBudW1iZXIgb2Ygbm9kZXMsIHRoYXQgY2FuIGJlIG9wZW5lZCBhdCBvbmNlXG4gICAgICAgIC8vIG9uY2UgaXMgdGhpcyBsaW1pdCBleGNlZWRlZCwgYVN0YXIgd2lsbCBmYWlsIGFuZCBnZXRUZW1wb3JhcnlXaXJlUG9pbnRzIHdpbGwgYmUgdXNlZCBpbnN0ZWFkXG4gICAgICAgIGNvbnN0IG1heE5vZGVMaW1pdCA9IDUwMDAwO1xuXG4gICAgICAgIGxldCBjbG9zZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgbGV0IG9wZW5Ob2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgb3Blbk5vZGVzLmFkZChzdGFydCk7XG5cbiAgICAgICAgbGV0IGNhbWVGcm9tID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgdmFsdWU6IGluZmluaXR5XG4gICAgICAgIGxldCBnU2NvcmUgPSBuZXcgU3RydWN0dXJlcy5NYXBXaXRoRGVmYXVsdFZhbHVlKEluZmluaXR5KTtcbiAgICAgICAgZ1Njb3JlLnNldChzdGFydCwgMCk7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB2YWx1ZTogaW5maW5pdHlcbiAgICAgICAgbGV0IGZTY29yZSA9IG5ldyBTdHJ1Y3R1cmVzLk1hcFdpdGhEZWZhdWx0VmFsdWUoSW5maW5pdHkpO1xuICAgICAgICBmU2NvcmUuc2V0KHN0YXJ0LCBXaXJlLm1hbmhhdHRhbkRpc3RhbmNlKHN0YXJ0LCBlbmQpKTtcblxuICAgICAgICBsZXQgbm9uUm91dGFibGUgPSB0aGlzLnBhcmVudFNWRy5nZXROb25Sb3V0YWJsZU5vZGVzKCk7XG4gICAgICAgIGxldCBwdW5pc2hlZEJ1dFJvdXRhYmxlO1xuICAgICAgICBpZih0aGlzLnN2Z09iaj09PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHVuaXNoZWRCdXRSb3V0YWJsZSA9IHRoaXMucGFyZW50U1ZHLmdldEluY29udmVuaWVudE5vZGVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdW5pc2hlZEJ1dFJvdXRhYmxlID0gdGhpcy5wYXJlbnRTVkcuZ2V0SW5jb252ZW5pZW50Tm9kZXModGhpcy5zdmdPYmouaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKG9wZW5Ob2Rlcy5zaXplID4gMCkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnROb2RlRlNjb3JlO1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSB2YWx1ZSBmcm9tIG9wZW5Ob2RlcyB0aGF0IGhhcyB0aGUgbG93ZXN0IGZTY29yZVxuICAgICAgICAgICAgLy8gKGNhbiBiZSBpbXBsZW1lbnRlZCBlZmZlY3RpdmVseSB1c2luZyBtaW4taGVhcCBkYXRhIHN0cnVjdHVyZSAobWF5YmUgdG9kbyBzb21ldGltZSk/KVxuICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG9wZW5Ob2Rlcykge1xuICAgICAgICAgICAgICAgIGlmKCFjdXJyZW50Tm9kZSB8fCBmU2NvcmUuZ2V0KG5vZGUpIDwgY3VycmVudE5vZGVGU2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUZTY29yZSA9IGZTY29yZS5nZXQoY3VycmVudE5vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzdmdPYmouUG9seWxpbmVQb2ludC5lcXVhbHMoY3VycmVudE5vZGUsIGVuZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWNvbnN0cnVjdFBhdGgoY2FtZUZyb20sIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3Blbk5vZGVzLmRlbGV0ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICBjbG9zZWROb2Rlcy5hZGQoY3VycmVudE5vZGUpO1xuXG4gICAgICAgICAgICAvLyB0aGUgZmFydGhlc3QgcG9pbnRzIGFjY2Vzc2libGUgd2l0aG91dCBhdm9pZGluZyBvYnN0YWNsZXMgaW4gZXZlcnkgZGlyZWN0aW9uXG4gICAgICAgICAgICAvLyAoYnV0IG1heCA1MCBpbiBlYWNoIGRpcmVjdGlvbilcbiAgICAgICAgICAgIGZvcihsZXQgZGlyZWN0aW9uID0gMCA7IGRpcmVjdGlvbiA8IDQgOyBkaXJlY3Rpb24rKykge1xuICAgICAgICAgICAgICAgIGxldCBuZXdQb2ludCA9IFdpcmUubW92ZVBvaW50KGN1cnJlbnROb2RlLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgNTAgOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmV3UG9pbnQgaXMgaW4gdGhlIHNldCBvZiBub24gcm91dGFibGUgcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBhZGQgaXQgYW5kIHN0b3AgcHJvY2VlZGluZyBpbiB0aGlzIGRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICBpZihXaXJlLnNldEhhc1RoaXNQb2ludChub25Sb3V0YWJsZSwgdGhpcy5zY2FsZVBvaW50VG9HcmlkKG5ld1BvaW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2tpcCB0aGlzIG5vZGUsIGlmIGl0IGhhcyBiZWVuIGFscmVhZHkgY2xvc2VkXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIGlmIGl0IGlzIG9uIHRoZSBsaXN0IG9mIG5vbiByb3V0YWJsZSBub2Rlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VkTm9kZXMuaGFzKG5ld1BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZW5Ob2Rlcy5oYXMobmV3UG9pbnQpLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5Ob2Rlcy5hZGQobmV3UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHBvc3NpYmxlIEdTY29yZSBieSBhZGRpbmcgMSB0byB0aGUgc2NvcmUgb2YgdGhlIG5vZGUgd2UgY2FtZSBmcm9tXG4gICAgICAgICAgICAgICAgICAgIC8vICh3ZSBwcmlvcml0aXplIHRvIG1pbmltaXplIHRoZSBudW1iZXIgb2Ygbm9kZXMgYW5kIG5vdCB0aGUgZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIC8vICBzbyB3ZSBhcmUgYWRkaW5nIDEgb24gYWxsIG5vZGVzLCBldmVuIGlmIHRoZSBldWNsaWRlYW4gLyBtYW5uaGF0YW4gZGlzdGFuY2UgbWF5IHZhcnkpXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmNyZW1lbnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZihpIT09MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zc2libGVHU2NvcmUgPSBnU2NvcmUuZ2V0KGN1cnJlbnROb2RlKSArIGluY3JlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICBpZihXaXJlLnNldEhhc1RoaXNQb2ludChwdW5pc2hlZEJ1dFJvdXRhYmxlLCB0aGlzLnNjYWxlUG9pbnRUb0dyaWQobmV3UG9pbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIG5vZGUgaXMgaW4gdGhlIHNldCBvZiBwdW5pc2hlZCBub2RlLCBwdW5pc2ggaXQgYnkgYWRkaW5nIHRvIHRoZSBHU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3NpYmxlR1Njb3JlICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zc2libGVHU2NvcmUgPj0gZ1Njb3JlLmdldChuZXdQb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2FtZUZyb20uc2V0KG5ld1BvaW50LCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGdTY29yZS5zZXQobmV3UG9pbnQsIHBvc3NpYmxlR1Njb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgZlNjb3JlLnNldChuZXdQb2ludCwgcG9zc2libGVHU2NvcmUgKyBXaXJlLm1hbmhhdHRhbkRpc3RhbmNlKG5ld1BvaW50LCBlbmQpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXdQb2ludCBpcyBpbiB0aGUgc2V0IG9mIHB1bmlzaGVkIGJ1dCByb3V0YWJsZSBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBpdCBidXQgc3RvcCBwcm9jZWVkaW5nIGluIHRoaXMgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KHB1bmlzaGVkQnV0Um91dGFibGUsIHRoaXMuc2NhbGVQb2ludFRvR3JpZChuZXdQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgdG8gdGhlIG5leHQgcG9pbnQgaW4gdGhlIGRpcmVjaXRvblxuICAgICAgICAgICAgICAgICAgICBuZXdQb2ludCA9IFdpcmUubW92ZVBvaW50KG5ld1BvaW50LCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYob3Blbk5vZGVzLnNpemUgPiBtYXhOb2RlTGltaXQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB3ZSBnb3QgaGVyZSwgdGhlIHBhdGggZG9lcyBub3QgZXhpc3QgLT4gbGV0J3MgdXNlIHRlbXBvcmFyeSBwYXRoIGlnbm9yaW5nIGFsbCBjb2xpc2lvbnNcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cygpO1xuICAgIH1cbiAgICBzdGF0aWMgbW92ZVBvaW50KHBvaW50LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMDogLy8gdXBcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55IC0gMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDE6IC8vIHJpZ2h0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCArIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAyOiAvLyBkb3duXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueSArIDFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAzOiAvLyBsZWZ0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCAtIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHNjYWxlUG9pbnRUb0dyaWQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHBvaW50LnggKiB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgeTogcG9pbnQueSAqIHRoaXMuZ3JpZFNpemVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY29uc3RydWN0UGF0aChjYW1lRnJvbSwgY3VycmVudE5vZGUpIHtcbiAgICAgICAgbGV0IHRvdGFsUGF0aCA9IG5ldyBzdmdPYmouUG9seWxpbmVQb2ludHMoKTtcbiAgICAgICAgdG90YWxQYXRoLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoY3VycmVudE5vZGUueCAqIHRoaXMuZ3JpZFNpemUsIGN1cnJlbnROb2RlLnkgKiB0aGlzLmdyaWRTaXplKSk7XG5cbiAgICAgICAgd2hpbGUgKGNhbWVGcm9tLmhhcyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY2FtZUZyb20uZ2V0KGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIHRvdGFsUGF0aC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KGN1cnJlbnROb2RlLnggKiB0aGlzLmdyaWRTaXplLCBjdXJyZW50Tm9kZS55ICogdGhpcy5ncmlkU2l6ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsUGF0aDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbWFuaGF0dGFuRGlzdGFuY2UoYSwgYikge1xuICAgICAgICAvLyBNYW5oYXR0YW4gZ2VvbWV0cnlcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGEueCAtIGIueCkgKyBNYXRoLmFicyhhLnkgLSBiLnkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRIYXNUaGlzUG9pbnQoc2V0LCBwb2ludCkge1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHNldCkge1xuICAgICAgICAgICAgaWYoaXRlbS54ID09PSBwb2ludC54ICYmIGl0ZW0ueSA9PT0gcG9pbnQueSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRDb29yZGluYXRlcyhjb25uZWN0b3IsIHNuYXBUb0dyaWQgPSB0cnVlKSB7XG4gICAgICAgIC8vIGNvbm5lY3Rvci5zdmdPYmouaWQgaGFzIHRvIGJlIGNhbGxlZCwgZWxzZSB0aGUgZ2V0Q29vcmRpbmF0ZXMgZG9lcyBub3Qgd29yayBvbiB0aGUgZmlyc3QgY2FsbCBpbiBGaXJlZm94IDU1XG4gICAgICAgIGxldCBkdW1teSA9IGNvbm5lY3Rvci5zdmdPYmouaWQ7XG5cbiAgICAgICAgbGV0ICRjb25uZWN0b3IgPSBjb25uZWN0b3Iuc3ZnT2JqLiRlbDtcblxuICAgICAgICBsZXQgcG9zaXRpb24gPSAkY29ubmVjdG9yLnBvc2l0aW9uKCk7XG4gICAgICAgIGxldCB3aWR0aCA9ICRjb25uZWN0b3IuYXR0cihcIndpZHRoXCIpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gJGNvbm5lY3Rvci5hdHRyKFwiaGVpZ2h0XCIpO1xuXG4gICAgICAgIGxldCB4ID0gcG9zaXRpb24ubGVmdCArIHdpZHRoIC8gMjtcbiAgICAgICAgbGV0IHkgPSBwb3NpdGlvbi50b3AgKyBoZWlnaHQgLyAyO1xuICAgICAgICBpZihzbmFwVG9HcmlkKSB7XG4gICAgICAgICAgICB4ID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh4KTtcbiAgICAgICAgICAgIHkgPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5XG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIENvbnRleHRNZW51SXRlbSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgY29udGV4dE1lbnUsIHBhcmVudFNWRywgY2xpY2tGdW5jdGlvbikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gY29udGV4dE1lbnU7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjxsaT5cIik7XG4gICAgICAgICQodGhpcy4kZWwpXG4gICAgICAgICAgICAudGV4dChuYW1lKVxuICAgICAgICAgICAgLmF0dHIoXCJ0eXBlXCIsIHR5cGUpO1xuXG4gICAgICAgIGlmKGNsaWNrRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICQodGhpcy4kZWwpLmNsaWNrKFxuICAgICAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tGdW5jdGlvbihldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2xhc3MoY2xzKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKGNscyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFwcGVuZEl0ZW0oaXRlbSkge1xuICAgICAgICBpZighdGhpcy5zdWJMaXN0KSB7XG4gICAgICAgICAgICB0aGlzLnN1Ykxpc3QgPSAkKFwiPHVsPlwiKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLnN1Ykxpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdWJMaXN0LmFwcGVuZChpdGVtLmpRdWVyeSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZ2V0IGpRdWVyeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsO1xuICAgIH1cbn1cbmNsYXNzIEdhdGVNZW51SXRlbSBleHRlbmRzIENvbnRleHRNZW51SXRlbSB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgY29udGV4dE1lbnUsIHBhcmVudFNWRykge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHR5cGUsIC8vIG5hbWUgaXMgdGhlIHR5cGVcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBjb250ZXh0TWVudSxcbiAgICAgICAgICAgIHBhcmVudFNWRyxcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQoY29udGV4dE1lbnUucG9zaXRpb24ueCAvIHBhcmVudFNWRy5ncmlkU2l6ZSkgKiBwYXJlbnRTVkcuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChjb250ZXh0TWVudS5wb3NpdGlvbi55IC8gcGFyZW50U1ZHLmdyaWRTaXplKSAqIHBhcmVudFNWRy5ncmlkU2l6ZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBwYXJlbnRTVkcubmV3R2F0ZShcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ubGVmdCwgLy8geCBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnRvcCAvLyB5IGNvb3JkaW5hdGVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dE1lbnUge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcblxuICAgICAgICBjb25zdCBnYXRlcyA9IFtcIm5vdFwiLCBcImFuZFwiLCBcIm9yXCIsIFwibmFuZFwiLCBcIm5vclwiLCBcInhvclwiLCBcInhub3JcIl07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IDAsIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRlbCA9ICQoXCI8dWw+XCIpO1xuICAgICAgICB0aGlzLiRlbC5hdHRyKCdpZCcsICdjb250ZXh0TWVudScpO1xuXG4gICAgICAgIGxldCBnYXRlTGlzdCA9IG5ldyBDb250ZXh0TWVudUl0ZW0oXCJOZXcgZ2F0ZVwiLCAnJywgdGhpcywgcGFyZW50U1ZHKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgZ2F0ZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBnYXRlTGlzdC5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgICAgIG5ldyBHYXRlTWVudUl0ZW0oZ2F0ZXNbaV0sIHRoaXMsIHBhcmVudFNWRylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKGdhdGVMaXN0KTtcblxuICAgICAgICB0aGlzLmFwcGVuZEl0ZW0oXG4gICAgICAgICAgICBuZXcgQ29udGV4dE1lbnVJdGVtKFwiSW5wdXQgYm94XCIsICcnLCB0aGlzLCBwYXJlbnRTVkcsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi55KVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFNWRy5uZXdJbnB1dChwb3NpdGlvbi5sZWZ0LCBwb3NpdGlvbi50b3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFwcGVuZEl0ZW0obmV3IENvbnRleHRNZW51SXRlbShcIk91dHB1dCBib3hcIiwgJycsIHRoaXMsIHBhcmVudFNWRywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi54KSxcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi55KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGFyZW50U1ZHLm5ld091dHB1dChwb3NpdGlvbi5sZWZ0LCBwb3NpdGlvbi50b3ApO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRDb25kaXRpb25hbEl0ZW0oJ2JveCcsICdSZW1vdmUgdGhpcyBpdGVtJywgaWQgPT4ge3RoaXMucGFyZW50U1ZHLnJlbW92ZUJveChpZCl9KTtcbiAgICAgICAgdGhpcy5hcHBlbmRDb25kaXRpb25hbEl0ZW0oJ3dpcmUnLCAnUmVtb3ZlIHRoaXMgd2lyZScsIGlkID0+IHt0aGlzLnBhcmVudFNWRy5yZW1vdmVXaXJlQnlJZChpZCl9KTtcblxuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5iZWZvcmUodGhpcy4kZWwpO1xuICAgIH1cblxuICAgIGFwcGVuZEl0ZW0oaXRlbSkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoaXRlbS5qUXVlcnkpO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmRzIGFuIGNvbm5kaXRpb25hbCBpdGVtICh0aGF0IGlzIHNob3duIG9ubHkgaWYgdGhlIHRhcmdldFxuICAgIC8vIGhhcyB0aGUgY2xhc3MgaXRlbUNsYXNzKVxuICAgIC8vIGNsaWNrRnVuY3Rpb24gdGFrZXMgb25lIGFyZ3VtZW50OiBJRCBvZiB0aGUgdGFyZ2V0XG4gICAgYXBwZW5kQ29uZGl0aW9uYWxJdGVtKGl0ZW1DbGFzcywgdGV4dCwgY2xpY2tGdW5jdGlvbikge1xuICAgICAgICBpZighdGhpcy5jb25kaXRpb25hbEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtc1t0aGlzLmNvbmRpdGlvbmFsSXRlbXMubGVuZ3RoXSA9IHtcbiAgICAgICAgICAgIGl0ZW1DbGFzczogaXRlbUNsYXNzLFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGNsaWNrRnVuY3Rpb246IGNsaWNrRnVuY3Rpb25cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlY2lkZXMgd2hldGhlciBvciBub3QgdG8gZGlzcGxheSBzcGVjaWZpYyBjb25kaXRpb25hbCBpdGVtc1xuICAgIHJlc29sdmVDb25kaXRpb25hbEl0ZW1zKCR0YXJnZXQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZGl0aW9uYWxJdGVtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYoJHRhcmdldC5oYXNDbGFzcyh0aGlzLmNvbmRpdGlvbmFsSXRlbXNbaV0uaXRlbUNsYXNzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kSXRlbShcbiAgICAgICAgICAgICAgICAgICAgbmV3IENvbnRleHRNZW51SXRlbShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtc1tpXS50ZXh0LCAnJywgdGhpcywgdGhpcy5wYXJlbnRTVkcsXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW2ldLmNsaWNrRnVuY3Rpb24oJHRhcmdldC5hdHRyKCdpZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkuYWRkQ2xhc3MoJ2NvbmRpdGlvbmFsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBoaWRlcyBhbGwgY29uZGl0aW9uYWwgaXRlbXNcbiAgICBoaWRlQWxsQ29uZGl0aW9uYWxJdGVtcygpIHtcbiAgICAgICAgdGhpcy4kZWwuY2hpbGRyZW4oJy5jb25kaXRpb25hbCcpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8vIGRpc3BsYXlzIHRoZSBjb250ZXh0IG1lbnUgd2l0aCB0aGUgcmlnaHQgc2V0IG9mIGNvbmRpdGlvbmFsIGl0ZW1zXG4gICAgZGlzcGxheSh4LCB5LCAkdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJGVsLmNzcyh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgdG9wOiB5ICsgXCJweFwiLFxuICAgICAgICAgICAgbGVmdDogeCArIFwicHhcIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlc29sdmVDb25kaXRpb25hbEl0ZW1zKCR0YXJnZXQpO1xuICAgIH1cblxuICAgIC8vIGhpZGVzIHRoZSBjb250ZXh0IG1lbnVcbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLiRlbC5jc3Moe2Rpc3BsYXk6ICdub25lJ30pO1xuICAgICAgICB0aGlzLmhpZGVBbGxDb25kaXRpb25hbEl0ZW1zKCk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBleHBvcnROZXR3b3JrIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNWRy5leHBvcnREYXRhO1xuICAgIH1cblxuICAgIGpzb24oc3R5bGUgPSBleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3QsIGRhdGFVcmkgPSBmYWxzZSkge1xuICAgICAgICBpZihkYXRhVXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2RhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04LCdcbiAgICAgICAgICAgICAgICArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmpzb24oc3R5bGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGV4cG9ydE5ldHdvcmsuc3R5bGUuY29tcGFjdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSk7XG4gICAgICAgICAgICAgICAgY2FzZSBleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSwgbnVsbCwgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJldHR5OiAwLFxuICAgICAgICAgICAgY29tcGFjdDogMVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIGltcG9ydE5ldHdvayB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBzdHJpbmcpIHtcbiAgICAgICAgcGFyZW50U1ZHLmltcG9ydERhdGEoXG4gICAgICAgICAgICBKU09OLnBhcnNlKHN0cmluZylcbiAgICAgICAgKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge2V4cG9ydE5ldHdvcmssIGltcG9ydE5ldHdva30gZnJvbSBcIi4vaW1wb3J0RXhwb3J0LmpzXCI7XG5cbmNsYXNzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNpZmljVGFnKSB7XG4gICAgICAgIGlmKCFzcGVjaWZpY1RhZykge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoXCI8XCIgKyBzcGVjaWZpY1RhZyArIFwiPlwiKVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBjb25zdCBtb3VzZUljb24gPVxuLy8gICAgIFwiPHN2ZyBjbGFzcz1cXFwibW91c2VJY29uXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIGhlaWdodD1cXFwiMTIxLjc3MTMxbW1cXFwiIHdpZHRoPVxcXCI4Mi4zMjc1ODNtbVxcXCIgdmVyc2lvbj1cXFwiMS4xXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjkxLjcxMTkxIDQzMS40NzMxNFxcXCI+XCIgK1xuLy8gICAgIFwiPGcgdHJhbnNmb3JtPVxcXCJ0cmFuc2xhdGUoLTIwMi43MDkwOCwtMjYwLjkyMzIpXFxcIj5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBkPVxcXCJtMjAyLjgxMTA4IDQ0My41MDY2N2MtMC4xMjU3IDExLjA1NjgzIDAuMDY1MSAxMi4xMjkxNSAwLjA1MjggMjMuMDkzNzUgMS4wNDA0IDM5LjI5MTY1LTQuMDMyODEgNzkuNTg0MiA4LjgxNDQxIDExNy41NjgzNiAxNy41MjYwMiA1OC4wMDc0MiA3MC43NjEyIDEwNy4wNzc5MyAxMzMuMTI5MDcgMTA4LjExNzE5IDYwLjgwNDQ4IDIuNjEyNDcgMTE1LjgwNjM4LTQxLjQ4OTEyIDEzNi42NTI0OS05Ni45MzU1NSAxNS4yMTk0Mi0zNC43MDU2MSAxMi43NDQ3LTcyLjgyNjM4IDEyLjgzNC0xMDkuNzIyNjYtMC40MDM1Ni0xNy4yNDkwNSAwLjI3NDUyLTI0LjczMjkgMC4wODc5LTQyLjEyMTA5aC0yOTEuNTcwNjZ6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImxlZnRcXFwiIGQ9XFxcIm0zMzUuNjc3ODggMjYwLjkzMDMyYy01OC42NTI1IDAuNjU1NjYtOTkuNjMxOSA0My41MTM4Ni0xMjAuMDgyMSA5Ni45OTIxOS0xMC41NTA1IDI0LjA2MDEyLTEyLjU5MzUgNDEuNzc3OTctMTIuODg2NyA2Ny41ODIwM2gxMzUuNzgzMnYtMTY0LjU3MjI2Yy0wLjAwNiAwLjAwMDA4LTAuMDExNy0wLjAwMDA4LTAuMDE3NiAwLTAuOTM0Ny0wLjAxMS0xLjg2NTgtMC4wMTI0LTIuNzk2OC0wLjAwMnpcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwicmlnaHRcXFwiIGQ9XFxcIm0zNjEuNDY3ODcgMjYwLjkyOTkzYy0wLjk0MjA3LTAuMDEtMS44ODY0LTAuMDA5LTIuODMyMDMgMC4wMDR2MTY0LjU3MjI2aDEzNS43ODUxNmMtMC4yNjI1Ny0yNC40Njk0OC0yLjI1MjEtNDAuNzQ4MjMtMTEuNTAzOTEtNjMuOTAyNDMtMTkuMzQ3MDktNTUuMDMyMjUtNjEuNzMwNDMtMTAwLjA0NTI1LTEyMS40NDkyMi0xMDAuNjczODN6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcIm1pZGRsZVxcXCIgZD1cXFwibTM0OC41NjUwNCAyOTQuOTMzNjVjMTUuMDM3MTQgMCAyNy4xNDI4NiAxMi4xMDU3MiAyNy4xNDI4NiAyNy4xNDI4NnY0MGMwIDE1LjAzNzE0LTEyLjEwNTcyIDI3LjE0Mjg2LTI3LjE0Mjg2IDI3LjE0Mjg2cy0yNy4xNDI4Ni0xMi4xMDU3Mi0yNy4xNDI4Ni0yNy4xNDI4NnYtNDBjMC0xNS4wMzcxNCAxMi4xMDU3Mi0yNy4xNDI4NiAyNy4xNDI4Ni0yNy4xNDI4NnpcXFwiIHN0cm9rZT1cXFwiI2ZmZlxcXCIgc3Ryb2tlLWxpbmVjYXA9XFxcInJvdW5kXFxcIiBzdHJva2Utd2lkdGg9XFxcIjIwXFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICA8L2c+XCIgK1xuLy8gICAgIFwiPC9zdmc+XCI7XG5cbmNsYXNzIGhlbHBXaW5kb3dJdGVtIGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IodGV4dCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKFwiaGVscFdpbmRvd0l0ZW1cIik7XG4gICAgICAgIHRoaXMuJGVsLmh0bWwodGV4dCk7XG4gICAgfVxufVxuXG5jbGFzcyBoZWxwV2luZG93IGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy4kZWwuYXR0cihcImlkXCIsIFwiaGVscFwiKTtcblxuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPm1haW4gbWVudTwvc3Ryb25nPjogcmlnaHQgY2xpY2tcIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCJkcmFnIGFuZCBkcm9wIHRvIDxzdHJvbmc+bW92ZSBlbGVtZW50czwvc3Ryb25nPlwiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+bWlkZGxlIGNsaWNrPC9zdHJvbmc+IHRvIHJvdGF0ZSBlbGVtZW50c1wiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+Y2xpY2sgPGltZyBzcmM9J2ltZy9ndWkvaGVscC5zdmcnIGNsYXNzPSdoZWxwaWNvbicgYWx0PSdoZWxwIGljb24nPjwvc3Ryb25nPiB0byBkaXNwbGF5IGRvY3VtZW50YXRpb24gKGluIGN6ZWNoKVwiKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGl0ZW0uJGVsKTtcbiAgICB9XG59XG5cblxuY2xhc3MgZmxvYXRpbmdNZW51SXRlbSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNpZmljQ2xhc3MsIGljb24sIHRpdGxlLCBzcGVjaWZpY1RhZykge1xuICAgICAgICBzdXBlcihzcGVjaWZpY1RhZyk7XG5cbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoXCJidXR0b25cIik7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKHNwZWNpZmljQ2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChcbiAgICAgICAgICAgICQoXCI8aW1nPlwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3JjXCIsIFwiaW1nL2d1aS9cIiArIGljb24gKyBcIi5zdmdcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImFsdFwiLCB0aXRsZSlcbiAgICAgICAgICAgICAgICAuYXR0cihcInRpdGxlXCIsIHRpdGxlKVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZmxvYXRpbmdNZW51IGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgY29uc3QgaWQgPSAnZmxvYXRpbmdNZW51JztcblxuICAgICAgICB0aGlzLiRlbC5hdHRyKFwiaWRcIiwgaWQpO1xuXG4gICAgICAgIC8qIElNUE9SVCAqL1xuXG4gICAgICAgIC8vIGhlcmUgd2lsbCBiZSB0aGUgaW5zdGFuY2Ugb2YgTGl0eSBzdG9yZWRcbiAgICAgICAgLy8gKHdlIG5lZWQgdG8gc3RvcmUgaXQsIGJlY2F1c2UgdGhlIFwiaW1wb3J0XCIgYnV0dG9uIGFsc28gY2xvc2VzIExpdHkpXG4gICAgICAgIGxldCBsaXR5SW5zdGFuY2VJbXBvcnQ7XG5cbiAgICAgICAgbGV0IGltcG9ydEJ1dHRvbiA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiaW1wb3J0XCIsIFwiaW1wb3J0XCIsIFwiSW1wb3J0IGEgbmV0d29ya1wiLCBcImFcIik7XG4gICAgICAgIGltcG9ydEJ1dHRvbi4kZWwub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgJHBvcHVwID0gJChcIjxkaXY+XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0RXhwb3J0XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0XCIpO1xuXG4gICAgICAgICAgICBsZXQgdGV4dGFyZWFJZCA9IFwiaW1wb3J0SlNPTlwiO1xuXG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8dGV4dGFyZWE+PC90ZXh0YXJlYT5cIikuYXR0cignaWQnLCB0ZXh0YXJlYUlkKVxuICAgICAgICAgICAgKS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwidXBsb2FkXCJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvaW1wb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXCIgaW1wb3J0IGZyb20gSlNPTlwiKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0ZXh0YXJlYSA9ICQoJyMnK3RleHRhcmVhSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGV4dGFyZWEgY29udGVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbXBvcnRTdHJpbmcgPSAkdGV4dGFyZWEudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIExpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpdHlJbnN0YW5jZUltcG9ydC5jbG9zZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9jY2VzcyB0aGUgaW1wb3J0ZWQgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IGltcG9ydE5ldHdvayhwYXJlbnRTVkcsIGltcG9ydFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsaXR5SW5zdGFuY2VJbXBvcnQgPSBsaXR5KCRwb3B1cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKGltcG9ydEJ1dHRvbik7XG5cbiAgICAgICAgLyogRVhQT1JUICovXG5cbiAgICAgICAgbGV0IGV4cG9ydEJ1dHRvbiA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiZXhwb3J0XCIsIFwiZXhwb3J0XCIsIFwiRXhwb3J0IHRoaXMgbmV0d29ya1wiLCBcImFcIik7XG4gICAgICAgIGV4cG9ydEJ1dHRvbi4kZWwub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBleHBvcnROZXR3b3JrKHBhcmVudFNWRyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgcG9wdXAgY29udGFpbmVyIGhvbGRpbmcgYWxsIHBvcHVwIGNvbnRlbnQgKHRoYXQgd2lsbCBiZSBwYXNzZWQgdG8gbGl0eSlcbiAgICAgICAgICAgIGxldCAkcG9wdXAgPSAkKFwiPGRpdj5cIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJpbXBvcnRFeHBvcnRcIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJleHBvcnRcIik7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBibG9jayB3aXRoIGNvZGUgdG8gYmUgZGlzcGxheWVkIGFuZCBhcHBlbmQgaXQgdG8gdGhlIHBvcHVwIGVsZW1lbnRcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxwcmU+XCIpLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxjb2RlPlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBsaW5rc1xuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPGE+XCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5LCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgXCJjbGFzc1wiOiBcImRvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJuZXR3b3JrLmpzb25cIlxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9leHBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgKS5hcHBlbmQoXCIgZXhwYW5kZWQgSlNPTlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3QsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwiZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcIm5ldHdvcmsubWluLmpzb25cIlxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9leHBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgKS5hcHBlbmQoXCIgY29tcGFjdCBKU09OXCIpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsaXR5KCRwb3B1cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKGV4cG9ydEJ1dHRvbik7XG5cbiAgICAgICAgLyogSEVMUCAqL1xuXG4gICAgICAgIGxldCBoZWxwID0gbmV3IGZsb2F0aW5nTWVudUl0ZW0oXCJoZWxwXCIsIFwiaGVscFwiLCBcIkRpc3BsYXkgaGVscFwiLCBcImFcIik7XG4gICAgICAgIGhlbHAuJGVsLm9uKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgICAgICQoXCIjaGVscFwiKS5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgJChcIiNoZWxwXCIpLnJlbW92ZUNsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaGVscC4kZWwuYXR0cih7XG4gICAgICAgICAgICAnaHJlZic6ICcuL2RvY3MvJyxcbiAgICAgICAgICAgICdkYXRhLWxpdHknOiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVscCk7XG5cbiAgICAgICAgcGFyZW50U1ZHLiRzdmcuYWZ0ZXIodGhpcy4kZWwpO1xuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5hZnRlcihuZXcgaGVscFdpbmRvdygpLiRlbCk7XG4gICAgfVxuXG4gICAgYXBwZW5kKG1lbnVJdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChtZW51SXRlbS4kZWwpO1xuICAgIH1cbn1cbiIsImltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuXG5jbGFzcyBzdGF0ZUNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IoY29ubmVjdG9ySWQsIHN0YXRlLCB3aG9DYXVzZWRJdCkge1xuICAgICAgICB0aGlzLmNvbm5lY3RvcklkID0gY29ubmVjdG9ySWRcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlXG4gICAgICAgIHRoaXMud2hvQ2F1c2VkSXQgPSB3aG9DYXVzZWRJdFxuICAgIH1cbn1cblxuLy8gYWxsIGNvbm5lY3RvcnMgbWVudGlvbmVkIGhlcmUgYXJlIE9VVFBVVCBDT05ORUNUT1JTXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW11bGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWR1xuXG4gICAgICAgIC8vIG1hcHMgZWFjaCBhZmZlY3RlZCBvdXRwdXQgY29ubmVjdG9yIHRvIGl0J3MgZGlyZWN0bHkgcHJlY2VlZGluZyBvdXRwdXQgY29ubmVjdG9yc1xuICAgICAgICB0aGlzLnByZWRlY2Vzc29ycyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvLyBtYXBzIHdhdmVJZCAtPiBhcnJheSBvZiBvdXRwdXRDb25uZWN0b3JzIGFmZmVjdGVkXG4gICAgICAgIHRoaXMud2F2ZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgdGhpcy53YXZlID0gMFxuXG4gICAgICAgIHRoaXMuY3ljbGVkQ29ubmVjdG9ycyA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLnJlc29sdmVkQ3ljbGVkQ29ubmVjdG9ycyA9IG5ldyBTZXQoKVxuXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWUgLy8gaWYgc2ltdWxhdG9yIGlzIG5vdCBlbmFibGVkLCBpdCBpZ25vcmVzIGNhbGxzIHRvIHRoZSBydW4oKSBmdW5jdGlvblxuICAgIH1cblxuICAgIGVuYWJsZSgpIHsgdGhpcy5lbmFibGVkID0gdHJ1ZSB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5lbmFibGVkID0gZmFsc2UgfVxuXG4gICAgcnVuKCkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2ltdWxhdG9yLnJ1bigpIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBzdGFydGVkLicpXG4gICAgICAgICAgICB0aGlzLndhdmUrKztcbiAgICAgICAgICAgIHdoaWxlKHRoaXMud2F2ZXMuaGFzKHRoaXMud2F2ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXAoKVxuICAgICAgICAgICAgICAgIHRoaXMud2F2ZXMuZGVsZXRlKHRoaXMud2F2ZSlcbiAgICAgICAgICAgICAgICB0aGlzLndhdmUrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RlcCgpIHtcbiAgICAgICAgZm9yIChsZXQge2Nvbm5lY3RvcklkLCBzdGF0ZSwgd2hvQ2F1c2VkSXR9IG9mIHRoaXMud2F2ZXMuZ2V0KHRoaXMud2F2ZSkpIHtcbiAgICAgICAgICAgIGlmKHRoaXMucmVzb2x2ZWRDeWNsZWRDb25uZWN0b3JzLmhhcyhjb25uZWN0b3JJZCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBza2lwIGNvbm5lY3RvciB0aGF0IGFyZSBjeWNsZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmN5Y2xlZENvbm5lY3RvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGhhcHBlbmVkJylcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGVzID0gdGhpcy5jeWNsZWRDb25uZWN0b3JzLmdldChjb25uZWN0b3JJZClcbiAgICAgICAgICAgICAgICBpZihzdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3RhdGUgcmVhcHBlYXJlZCcpXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0YXRlcy5zaXplID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZWRDeWNsZWRDb25uZWN0b3JzLmFkZChjb25uZWN0b3JJZClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuYWRkKHN0YXRlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmN5Y2xlZENvbm5lY3RvcnMuc2V0KGNvbm5lY3RvcklkLCBzdGF0ZXMpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jeWNsZWRDb25uZWN0b3JzLmdldChjb25uZWN0b3JJZCkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMud2hvQ2F1c2VkSXQgPSBjb25uZWN0b3JJZFxuICAgICAgICAgICAgLyogIHByb2Nlc3MgYWxsIG91dHB1dENvbm5lY3RvcnMgYnkgc2V0dGluZyB0aGVpciBzdGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMgd2lsbCB0cmlnZ2VyIGEgZm9sbG93aW5nIGV2ZW50IGNoYWluOlxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRDb25uZWN0b3IgY2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAtPiBhbGwgY29ubmVjdGVkIHdpcmVzIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAtPiBhbGwgaW5wdXRDb25uZWN0b3JzIGNvbm5lY3RlZCB0byB0aGVzZSB3aXJlcyBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgLT4gYWxsIGVsZW1lbnRzIHRoYXQgY29udGFpbiB0aGVzZSBpbnB1dENvbm5lY3RvcnMgY2hhbmdlXG4gICAgICAgICAgICAgICAgICAgIC0+IHRoZXNlIGVsZW1lbnRzIGNvbXB1dGUgdGhlIG5ldyBzdGF0ZSBvZiB0aGVpciBvdXRwdXQgY29ubmVjdG9ycyBhbmQgY2FsbCBub3RpZnlDaGFuZ2UoKVxuICAgICAgICAgICAgKi9cblxuXG4gICAgICAgICAgICBpZih3aG9DYXVzZWRJdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUHJlZGVjZXNzb3IoY29ubmVjdG9ySWQsIHdob0NhdXNlZEl0KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY3ljbGVkQ29ubmVjdG9ycy5oYXMoY29ubmVjdG9ySWQpICYmIHRoaXMuZ2V0QWxsUHJlZGVjZXNzb3JzKGNvbm5lY3RvcklkKS5oYXMoY29ubmVjdG9ySWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jeWNsZWRDb25uZWN0b3JzLnNldChjb25uZWN0b3JJZCwgbmV3IFNldChbc3RhdGVdKSlcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLyByZWZsZWN0IHRoZSBjaGFuZ2VzIGluIFNWR1xuICAgICAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMucGFyZW50U1ZHLmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpXG4gICAgICAgICAgICBpZihjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aG9DYXVzZWRJdCA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGFkZFByZWRlY2Vzc29yKGNvbm5lY3RvcklkLCBwcmVkZWNlc3NvckNvbm5lY3RvcklkKSB7XG4gICAgICAgIGlmKCF0aGlzLnByZWRlY2Vzc29ycy5oYXMoY29ubmVjdG9ySWQpKSB7XG4gICAgICAgICAgICB0aGlzLnByZWRlY2Vzc29ycy5zZXQoY29ubmVjdG9ySWQsIG5ldyBTZXQoKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJlZGVjZXNzb3JzLmdldChjb25uZWN0b3JJZCkuYWRkKHByZWRlY2Vzc29yQ29ubmVjdG9ySWQpXG4gICAgfVxuXG4gICAgZ2V0QWxsUHJlZGVjZXNzb3JzKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGlmKCF0aGlzLnByZWRlY2Vzc29ycy5oYXMoY29ubmVjdG9ySWQpKSB7XG4gICAgICAgICAgICB0aGlzLnByZWRlY2Vzc29ycy5zZXQoY29ubmVjdG9ySWQsIG5ldyBTZXQoKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhbGwgPSBuZXcgU2V0KClcblxuICAgICAgICB0aGlzLnByZWRlY2Vzc29ycy5nZXQoY29ubmVjdG9ySWQpLmZvckVhY2goYWxsLmFkZCwgYWxsKTtcblxuICAgICAgICBsZXQgcHJldlNpemUgPSAwXG4gICAgICAgIGxldCBzaXplID0gYWxsLnNpemVcbiAgICAgICAgd2hpbGUocHJldlNpemUgPCBzaXplKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb25uZWN0b3Igb2YgYWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlZGVjZXNzb3JzLmhhcyhjb25uZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlZGVjZXNzb3JzLmdldChjb25uZWN0b3IpLmZvckVhY2goYWxsLmFkZCwgYWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2U2l6ZSA9IHNpemVcbiAgICAgICAgICAgIHNpemUgPSBhbGwuc2l6ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFsbFxuICAgIH1cblxuICAgIG5vdGlmeUNoYW5nZShjb25uZWN0b3JJZCwgc3RhdGUpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ25vdGlmeUNoYW5nZSwgY29ubmVjdG9yOicsIGNvbm5lY3RvcklkLCAnd2F2ZTonLCB0aGlzLndhdmUpXG5cbiAgICAgICAgbGV0IHdhdmVJZCA9IHRoaXMud2F2ZSArIDFcblxuICAgICAgICBpZighdGhpcy53YXZlcy5oYXMod2F2ZUlkKSkge1xuICAgICAgICAgICAgdGhpcy53YXZlcy5zZXQod2F2ZUlkLCBbXSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2F2ZXMuZ2V0KHdhdmVJZCkucHVzaChuZXcgc3RhdGVDaGFuZ2UoY29ubmVjdG9ySWQsIHN0YXRlLCB0aGlzLndob0NhdXNlZEl0KSk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCAqIGFzIHN2Z09iaiBmcm9tICcuL3N2Z09iamVjdHMuanMnXG5pbXBvcnQgKiBhcyBlZGl0b3JFbGVtZW50cyBmcm9tICcuL2VkaXRvckVsZW1lbnRzLmpzJ1xuaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMuanMnXG5pbXBvcnQgQ29udGV4dE1lbnUgZnJvbSAnLi9jb250ZXh0TWVudS5qcydcbmltcG9ydCBGbG9hdGluZ01lbnUgZnJvbSAnLi9mbG9hdGluZ01lbnUuanMnXG5pbXBvcnQgU2ltdWxhdG9yIGZyb20gJy4vbG9naWNTaW11bGF0b3IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN2ZyB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBncmlkU2l6ZSkge1xuICAgICAgICB0aGlzLiRzdmcgPSAkKGNhbnZhcyk7XG5cbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMuYm94ZXMgPSBbXTsgLy8gc3RvcmVzIGFsbCBib3hlc1xuICAgICAgICB0aGlzLndpcmVzID0gW107IC8vIHN0b3JlcyBhbGwgd2lyZXNcblxuICAgICAgICB0aGlzLnNpbXVsYXRvciA9IG5ldyBTaW11bGF0b3IodGhpcylcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRlZnMgZWxlbWVudCwgdXNlZCBmb3IgcGF0dGVybnNcbiAgICAgICAgdGhpcy4kZGVmcyA9ICQoXCI8ZGVmcz5cIik7XG4gICAgICAgIHRoaXMuJHN2Zy5wcmVwZW5kKHRoaXMuJGRlZnMpO1xuXG4gICAgICAgIC8vIEJBQ0tHUk9VTkQgUEFUVEVSTlxuICAgICAgICBsZXQgcGF0dGVybiA9IG5ldyBzdmdPYmouUGF0dGVybihcImdyaWRcIiwgdGhpcy5ncmlkU2l6ZSwgdGhpcy5ncmlkU2l6ZSk7XG5cbiAgICAgICAgbGV0IHBhdHRlcm5Qb2ludHMgPSBuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnRzKClcbiAgICAgICAgICAgIC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KDAsIDApKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy5ncmlkU2l6ZSwgMCkpXG4gICAgICAgICAgICAuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLmdyaWRTaXplLCB0aGlzLmdyaWRTaXplKSk7XG5cbiAgICAgICAgcGF0dGVybi5hZGRDaGlsZChuZXcgc3ZnT2JqLlBvbHlMaW5lKHBhdHRlcm5Qb2ludHMsIFwiI2EzYTRkMlwiLCAyKSk7XG4gICAgICAgIHRoaXMuYWRkUGF0dGVybihwYXR0ZXJuLmdldCgpKTtcblxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBuZXcgc3ZnT2JqLlJlY3RhbmdsZSgwLCAwLCBcIjEwMCVcIiwgXCIxMDAlXCIsIFwidXJsKCNncmlkKVwiLCBcIm5vbmVcIik7XG4gICAgICAgIHRoaXMuYXBwZW5kSlF1ZXJ5T2JqZWN0KHRoaXMuYmFja2dyb3VuZC5nZXQoKSk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgICAgIC8vIENPTlNUUlVDVCBDT05URVhUIE1FTlVcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudSA9IG5ldyBDb250ZXh0TWVudSh0aGlzKTtcblxuICAgICAgICAvLyBDT05TVFJVQ1QgRkxPQVRJTkcgTUVOVVxuICAgICAgICAvLyB0aGlzLmZsb2F0aW5nTWVudSA9IG5ldyBGbG9hdGluZ01lbnUodGhpcyk7XG4gICAgICAgIHRoaXMuZmxvYXRpbmdNZW51ID0gbmV3IEZsb2F0aW5nTWVudSh0aGlzKTtcblxuICAgICAgICAvLyBBTEwgRVZFTlQgQ0FMTEJBQ0tTXG4gICAgICAgIGxldCB0YXJnZXQ7XG4gICAgICAgIHRoaXMuJHN2Zy5vbignbW91c2Vkb3duJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXRSZWFsVGFyZ2V0KGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICBpZih0YXJnZXQhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb3VzZURvd24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmhpZGVDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSkub24oJ21vdXNlbW92ZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmKHRhcmdldCE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vdXNlTW92ZShldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZih0YXJnZXQhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb3VzZVVwKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSkub24oXCJjb250ZXh0bWVudVwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb250ZXh0TWVudShldmVudC5wYWdlWCwgZXZlbnQucGFnZVksIHRoaXMuZ2V0UmVhbEpRdWVyeVRhcmdldChldmVudC50YXJnZXQpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICB0aGlzLmV4cG9ydFdpcmVJZE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5leHBvcnRXaXJlSWQgPSAwO1xuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgLy8gdG9kbyBpbXBsZW1lbnQgZ3JpZFNpemUgc2NhbGluZ1xuICAgICAgICAgICAgLy8gZ3JpZFNpemU6IHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICBib3hlczogW11cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZGF0YS5ib3hlc1tpXSA9IHRoaXMuYm94ZXNbaV0uZXhwb3J0RGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGltcG9ydERhdGEoZGF0YSkge1xuICAgICAgICAvLyBkaXNhYmxlIHRoZSBzaW11bGF0b3IgdG8gcHJlZmVudCB1bm5lY2Vzc2FyeSBzaW11bGF0aW9uIGR1cmluZyBpbnNlcnRpbmcgbmV3IGVsZW1lbnRzXG4gICAgICAgIHRoaXMuc2ltdWxhdG9yLmRpc2FibGUoKVxuXG4gICAgICAgIC8vIHRvZG8gaW1wbGVtZW50IGdyaWRTaXplIHNjYWxpbmdcblxuICAgICAgICAvLyBsaXN0IG9mIHdpcmVzIHRvIGJlIGFkZGVkXG4gICAgICAgIGxldCBuZXdXaXJlcyA9IG5ldyBNYXAoKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGRhdGEuYm94ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGFkZCBib3hcbiAgICAgICAgICAgIGxldCBib3g7XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0uY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2F0ZVwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IGdhdGUgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgYm94ID0gdGhpcy5uZXdHYXRlKGRhdGEuYm94ZXNbaV0ubmFtZSwgMCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW9cIjpcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmJveGVzW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbnB1dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgaW5wdXQgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld0lucHV0KDAsIDAsIGRhdGEuYm94ZXNbaV0uaXNPbiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm91dHB1dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgb3V0cHV0ICh3aXRob3V0IHJlbG9hZGluZyB0aGUgU1ZHLCB3ZSB3aWxsIHJlbG9hZCBpdCBvbmNlIGFmdGVyIHRoZSBpbXBvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94ID0gdGhpcy5uZXdPdXRwdXQoMCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBpbyBib3ggbmFtZSAnXCIrZGF0YS5ib3hlc1tpXS5uYW1lK1wiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gYm94IGNhdGVnb3J5ICdcIitkYXRhLmJveGVzW2ldLmNhdGVnb3J5K1wiJy5cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChib3gpIHtcbiAgICAgICAgICAgICAgICAvLyBwcm9jY2VzcyBib3ggdHJhbnNmb3JtcyAodHJhbnNsYXRpb24gYW5kIHJvdGF0aW9uKVxuICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgZWRpdG9yRWxlbWVudHMuVHJhbnNmb3JtKCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMCA7IGogPCBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtcy5sZW5ndGggOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidHJhbnNsYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1sxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicm90YXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnNldFJvdGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1sxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1syXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIHRyYW5zZm9ybSBwcm9wZXJ0eSAnXCIrZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0ubmFtZStcIicuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYm94LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGFsbCB3aXJlcyB0byB0aGUgbGlzdCBvZiB3aXJlcyB0byBiZSBhZGRlZFxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDAgOyBqIDwgZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9ucy5sZW5ndGggOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBhcnRpZmljaWFsIHdpcmUgaWRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpcmVJZCA9IGRhdGEuYm94ZXNbaV0uY29ubmVjdGlvbnNbal0ud2lyZUlkO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhc3MgdGhlIHZhbHVlcyBnb3QgZnJvbSBqc29uIGludG8gYSB2YXJpYWJsZSB0aGF0IHdpbGwgYmUgYWRkZWQgaW50byB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zW2pdLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9uc1tqXS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm94SWQ6IGJveC5pZFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgdmFsdWUgdG8gdGhlIG1hcFxuICAgICAgICAgICAgICAgICAgICBpZihuZXdXaXJlcy5oYXMod2lyZUlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgYWxyZWFkeSBpcyBhIHdpcmUgd2l0aCB0aGlzIGlkIGluIHRoZSBtYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHZhbHVlIHRvIHRoZSBlbmQgb2YgdGhlIGFycmF5IG9mIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1hcFZhbHVlID0gbmV3V2lyZXMuZ2V0KHdpcmVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBWYWx1ZS5sZW5ndGhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdXaXJlcy5zZXQod2lyZUlkLCBtYXBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyB3aXJlIHdpdGggdGhpcyBpZCBpbiB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHdpcmUgYW5kIHNldCB0aGUgdmFsdWUgdG8gYmUgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdXaXJlcy5zZXQod2lyZUlkLCBbdmFsdWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlZnJlc2ggdGhlIFNWRyBkb2N1bWVudCAobmVlZGVkIGZvciB3aXJpbmcpXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgICAgIC8vIHdpdGggYWxsIGJveGVzIGFkZGVkLCB3ZSBjYW4gbm93IGNvbm5lY3QgdGhlbSB3aXRoIHdpcmVzXG4gICAgICAgIG5ld1dpcmVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBsZXQgY29ubmVjdG9ySWRzID0gW107XG4gICAgICAgICAgICBpZihpdGVtWzBdICYmIGl0ZW1bMV0pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJveCA9IHRoaXMuZ2V0Qm94QnlJZChpdGVtW2ldLmJveElkKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0b3JJZHNbaV0gPSBib3guY29ubmVjdG9yc1tpdGVtW2ldLmluZGV4XS5pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5ld1dpcmUoY29ubmVjdG9ySWRzWzBdLCBjb25uZWN0b3JJZHNbMV0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgU1ZHIGRvY3VtZW50XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgICAgIHRoaXMuc2ltdWxhdG9yID0gbmV3IFNpbXVsYXRvcigpXG4gICAgICAgIHRoaXMuc2ltdWxhdG9yLmRpc2FibGUoKVxuICAgICAgICAvLyB0cmlnZ2VyIHRoZSBuZXR3b3JrIHNpbXVsYXRpb25cbiAgICAgICAgZm9yIChjb25zdCBib3ggaW4gdGhpcy5ib3hlcykge1xuICAgICAgICAgICAgLy8gaWYgdGhlIGJveCB0cmlnZ2VycyBuZXcgc2ltdWxhdGlvbiBvbiByZWZyZXNoU3RhdGVcbiAgICAgICAgICAgIGlmIChib3gudHJpZ2dlcnNTaW11bGF0aW9uT25SZWZyZXNoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjb25uIG9mIGJveC5vdXRwdXRDb25uZWN0b3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2ltdWxhdG9yLm5vdGlmeUNoYW5nZShjb25uLmlkLCBjb25uLnN0YXRlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2ltdWxhdG9yLmVuYWJsZSgpXG4gICAgICAgIHRoaXMuc2ltdWxhdG9yLnJ1bigpXG4gICAgfVxuXG4gICAgd2lyZUNyZWF0aW9uSGVscGVyKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGlmKCF0aGlzLmZpcnN0Q29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDb25uZWN0b3JJZCA9IGNvbm5lY3RvcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXdXaXJlKHRoaXMuZmlyc3RDb25uZWN0b3JJZCwgY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgdGhpcy5maXJzdENvbm5lY3RvcklkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnROZXdTaW11bGF0aW9uKHN0YXJ0aW5nQ29ubmVjdG9yLCBzdGF0ZSkge1xuICAgICAgICB0aGlzLnNpbXVsYXRvciA9IG5ldyBTaW11bGF0b3IodGhpcylcbiAgICAgICAgdGhpcy5zaW11bGF0b3Iubm90aWZ5Q2hhbmdlKHN0YXJ0aW5nQ29ubmVjdG9yLmlkLCBzdGF0ZSlcbiAgICAgICAgdGhpcy5zaW11bGF0b3IucnVuKClcbiAgICB9XG5cbiAgICBuZXdHYXRlKG5hbWUsIHgsIHksIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0JveCh4LCB5LCBuZXcgZWRpdG9yRWxlbWVudHMuR2F0ZSh0aGlzLCBuYW1lLCB4LCB5KSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgbmV3SW5wdXQoeCwgeSwgaXNPbiA9IGZhbHNlLCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLklucHV0Qm94KHRoaXMsIGlzT24pLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBuZXdPdXRwdXQoeCwgeSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3Qm94KHgsIHksIG5ldyBlZGl0b3JFbGVtZW50cy5PdXRwdXRCb3godGhpcyksIHJlZnJlc2gpO1xuICAgIH1cblxuICAgIG5ld0JveCh4LCB5LCBvYmplY3QsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuYm94ZXMubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuYm94ZXNbaW5kZXhdID0gb2JqZWN0O1xuXG4gICAgICAgIC8vIHRyYW5zbGF0ZSB0aGUgZ2F0ZSBpZiB4IGFuZCB5IGhhcyBiZWVuIHNwZWNpZmllZFxuICAgICAgICBpZih4ICYmIHkpIHtcbiAgICAgICAgICAgIGxldCB0ciA9IG5ldyBlZGl0b3JFbGVtZW50cy5UcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRyLnNldFRyYW5zbGF0ZSh4LCB5KTtcblxuICAgICAgICAgICAgdGhpcy5ib3hlc1tpbmRleF0uc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyLmdldCgpfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGVuZEVsZW1lbnQodGhpcy5ib3hlc1tpbmRleF0sIHJlZnJlc2gpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmJveGVzW2luZGV4XTtcbiAgICB9XG5cbiAgICByZW1vdmVCb3goZ2F0ZUlkKSB7XG4gICAgICAgIGxldCAkZ2F0ZSA9ICQoXCIjXCIrZ2F0ZUlkKTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBnYXRlIGluIHN2ZydzIGxpc3Qgb2YgZ2F0ZXNcbiAgICAgICAgbGV0IGdhdGVJbmRleCA9IC0xO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmJveGVzW2ldLnN2Z09iai5pZD09PWdhdGVJZCkge1xuICAgICAgICAgICAgICAgIGdhdGVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihnYXRlSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCB3aXJlcyBjb25uZWN0ZWQgdG8gdGhpcyBnYXRlXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3hlc1tnYXRlSW5kZXhdLmNvbm5lY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZCh0aGlzLmJveGVzW2dhdGVJbmRleF0uY29ubmVjdG9yc1tpXS5zdmdPYmouaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGdhdGVcbiAgICAgICAgICAgIHRoaXMuYm94ZXMuc3BsaWNlKGdhdGVJbmRleCwgMSk7XG4gICAgICAgICAgICAkZ2F0ZS5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUcnlpbmcgdG8gcmVtb3ZlIGFuIG5vbmV4aXN0aW5nIGdhdGUuIChHYXRlIGlkOiBcIitnYXRlSWQrXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3V2lyZShmcm9tSWQsIHRvSWQsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIC8vIHdpcmUgbXVzdCBjb25uZWN0IHR3byBkaXN0aW5jdCBlbGVtZW50c1xuICAgICAgICBpZiAoZnJvbUlkPT09dG9JZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGxldCBjb25uZWN0b3JzID0gW3RoaXMuZ2V0Q29ubmVjdG9yQnlJZChmcm9tSWQpLCB0aGlzLmdldENvbm5lY3RvckJ5SWQodG9JZCldXG5cbiAgICAgICAgLy8gaW5wdXQgY29ubmVjdG9ycyBjYW4gYmUgY29ubmVjdGVkIHRvIG9uZSB3aXJlIG1heFxuICAgICAgICBjb25uZWN0b3JzLmZvckVhY2goY29ubiA9PiB7XG4gICAgICAgICAgICBpZihjb25uLmlzSW5wdXRDb25uZWN0b3IpXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVXaXJlc0J5Q29ubmVjdG9ySWQoY29ubi5pZClcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy53aXJlcy5sZW5ndGg7XG4gICAgICAgIHRoaXMud2lyZXNbaW5kZXhdID0gbmV3IGVkaXRvckVsZW1lbnRzLldpcmUodGhpcywgZnJvbUlkLCB0b0lkLCB0aGlzLmdyaWRTaXplLCByZWZyZXNoKTtcblxuICAgICAgICBjb25uZWN0b3JzLmZvckVhY2goY29ubiA9PiB7XG4gICAgICAgICAgICBjb25uLmFkZFdpcmVJZCh0aGlzLndpcmVzW2luZGV4XS5zdmdPYmouaWQpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYXBwZW5kRWxlbWVudCh0aGlzLndpcmVzW2luZGV4XSwgcmVmcmVzaCk7XG4gICAgICAgIHRoaXMubW92ZVRvQmFja0J5SWQodGhpcy53aXJlc1tpbmRleF0uc3ZnT2JqLmlkKTtcblxuICAgICAgICBpZihyZWZyZXNoKVxuICAgICAgICAgICAgdGhpcy53aXJlc1tpbmRleF0udXBkYXRlV2lyZVN0YXRlKClcblxuICAgICAgICByZXR1cm4gdGhpcy53aXJlc1tpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0V2lyZUJ5SWQod2lyZUlkKSB7XG4gICAgICAgIGxldCB3aXJlQ291bnQgPSB0aGlzLndpcmVzLmxlbmd0aDtcblxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHdpcmVDb3VudCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy53aXJlc1tpXS5zdmdPYmouaWQ9PT13aXJlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aXJlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRXaXJlc0J5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG4gICAgICAgIHJldHVybiBjb25uZWN0b3Iud2lyZUlkcztcbiAgICB9XG5cbiAgICByZW1vdmVXaXJlQnlJZCh3aXJlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLndpcmVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lyZXNbaV0uc3ZnT2JqLmlkID09PSB3aXJlSWQpIHtcblxuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IxID0gdGhpcy53aXJlc1tpXS5zdGFydENvbm5lY3RvcjtcbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdG9yMiA9IHRoaXMud2lyZXNbaV0uZW5kQ29ubmVjdG9yO1xuXG4gICAgICAgICAgICAgICAgY29ubmVjdG9yMS5yZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IyLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53aXJlc1tpXS5zdmdPYmouJGVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMud2lyZXMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVXaXJlc0J5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG5cbiAgICAgICAgY29ubmVjdG9yLndpcmVJZHMuZm9yRWFjaCh3aXJlSWQgPT4ge1xuICAgICAgICAgICAgbGV0IHdpcmUgPSB0aGlzLmdldFdpcmVCeUlkKHdpcmVJZCk7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgb3RoZXIgY29ubmVjdG9yIHRoYXQgaXMgdGhlIHdpcmUgY29ubmVjdGVkIHRvXG4gICAgICAgICAgICBsZXQgb3RoZXJDb25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQod2lyZS5mcm9tSWQsIHdpcmUpO1xuICAgICAgICAgICAgaWYob3RoZXJDb25uZWN0b3Iuc3ZnT2JqLmlkPT09Y29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgICAgICBvdGhlckNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh3aXJlLnRvSWQsIHdpcmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIHdpcmUgcmVjb3JkIGZyb20gdGhlIG90aGVyIGNvbm5lY3RvclxuICAgICAgICAgICAgb3RoZXJDb25uZWN0b3Iud2lyZUlkcy5kZWxldGUod2lyZUlkKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB3aXJlIHJlcHJlc2VudGF0aW9uIHVzaW5nIGpRdWVyeVxuICAgICAgICAgICAgJChcIiNcIiArIHdpcmVJZCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vIGlmIG90aGVyQ29ubmVjdG9yIGlzIGFuIGlucHV0IGNvbm5lY3Rvciwgc2V0IGl0cyBzdGF0ZSB0byB1bmtub3duXG4gICAgICAgICAgICBpZihvdGhlckNvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJDb25uZWN0b3Iuc2V0U3RhdGUoTG9naWMuc3RhdGUudW5rbm93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSBsaXN0IG9mIHdpcmUgSWRzXG4gICAgICAgIGNvbm5lY3Rvci53aXJlSWRzLmNsZWFyKCk7XG4gICAgICAgIC8vIGlmIGNvbm5lY3RvciBpcyBhbiBpbnB1dCBjb25uZWN0b3IsIHNldCBpdHMgc3RhdGUgdG8gdW5rbm93blxuICAgICAgICBpZihjb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgY29ubmVjdG9yLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlJZChnYXRlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5ib3hlc1tpXS5zdmdPYmouaWQ9PT1nYXRlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib3hlc1tpXS5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm94ZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQsIHdpcmUpIHtcbiAgICAgICAgLy8gdGhlIHdpcmUgdmFyaWFibGUgaXMgdXNlZCBhcyBoZXVyaXN0aWMsXG4gICAgICAgIC8vIHdoZW4gd2Uga25vdyB0aGUgd2lyZSwgd2UgaGF2ZSB0byBjaGVjayBvbmx5XG4gICAgICAgIC8vIHR3byBnYXRlcyBpbnN0ZWFkIG9mIGFsbCBvZiB0aGVtXG5cbiAgICAgICAgaWYod2lyZSE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gd2Uga25vdyB0aGUgd2lyZSAtLSB3ZSBjYW4gY2hlY2sgb25seSBnYXRlcyBhdCB0aGUgZW5kcyBvZiB0aGlzIHdpcmVcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3IgPSB3aXJlLnN0YXJ0Qm94LmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgaWYgKCFjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IgPSB3aXJlLmVuZEJveC5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3I7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGRvIG5vdCBrbm93IHRoZSB3aXJlIC0tIHdlIGhhdmUgdG8gY2hlY2sgYWxsIGdhdGVzXG4gICAgICAgICAgICBsZXQgZ2F0ZUNvdW50ID0gdGhpcy5ib3hlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBnYXRlQ291bnQgOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5ib3hlc1tpXS5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgICAgICBpZihjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgb2JqZWN0LCB0aGF0IHVzZXIgaW50ZXJhY3RlZCB3aXRoLCBpcyBub3QgYSBjb25uZWN0b3IgYW5kIGlzIGluIGEgZ3JvdXBcbiAgICAvLyByZXR1cm4gdGhlIGdyb3VwIGpRdWVyeSBvYmplY3QgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgalF1ZXJ5IG9iamVjdFxuICAgIGdldFJlYWxKUXVlcnlUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuICAgICAgICBpZighJHRhcmdldC5oYXNDbGFzcyhcImNvbm5lY3RvclwiKSAmJiAkdGFyZ2V0LnBhcmVudHMoJ2cnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcIkdcIiAmJiAkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcImdcIikge1xuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkdGFyZ2V0O1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIGVkaXRvckVsZW1lbnQgdGhhdCB1c2VyIGludGVyYWN0ZWQgd2l0aCwgdGhlIFwidGFyZ2V0XCIgYXJndW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudFxuICAgIGdldFJlYWxUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIC8vIGV2ZW50eSBzZSBtdXNlamkgenByYWNvdmF0IHRhZHksIHByb3RvemUgdiBTVkcgc2UgZXZlbnR5IG5lcHJvcGFndWppXG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuXG4gICAgICAgIGlmKCR0YXJnZXQuaGFzQ2xhc3MoXCJjb25uZWN0b3JcIikpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjb25uZWN0b3IsIGRvbid0IHRyYXZlcnNlIGdyb3Vwc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYoJHRhcmdldC5wYXJlbnRzKCdnJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gdGhpcyBlbGVtZW50IGlzIGluIGEgZ3JvdXAgYW5kIGl0IGlzIG5vdCBhIGNvbm5lY3RvclxuXG4gICAgICAgICAgICAvLyB0cmF2ZXJzaW5nIHVwIHRoZSBET00gdHJlZSB1bnRpbCB3ZSBmaW5kIHRoZSBjbG9zZXN0IGdyb3VwXG4gICAgICAgICAgICBsZXQgJHBhcmVudEdyb3VwID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkcGFyZW50R3JvdXAucHJvcChcInRhZ05hbWVcIikgIT09IFwiR1wiICYmICRwYXJlbnRHcm91cC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJnXCIpIHtcbiAgICAgICAgICAgICAgICAkcGFyZW50R3JvdXAgPSAkcGFyZW50R3JvdXAucGFyZW50KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJveEJ5SWQoJHBhcmVudEdyb3VwLmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoXCJ3aXJlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRXaXJlQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZEVsZW1lbnQoZWxlbWVudCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRKUXVlcnlPYmplY3QoZWxlbWVudC5nZXQoKSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgYXBwZW5kSlF1ZXJ5T2JqZWN0KG9iamVjdCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmFwcGVuZChvYmplY3QpO1xuICAgICAgICBpZihyZWZyZXNoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFBhdHRlcm4ocGF0dGVybikge1xuICAgICAgICB0aGlzLiRkZWZzLmFwcGVuZChwYXR0ZXJuKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgLy8gcmVsb2FkIHRoZSBTVkcgZG9jdW1lbnQgKG5lZWRlZCB0byBkaXNwbGF5IG5ld2x5IGFwcGVuZGVkIGpRdWVyeSBvYmplY3QpXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmh0bWwodGhpcy4kc3ZnLmh0bWwoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU1ZHIGRvY3VtZW50IGhhcyBiZWVuIHJlbG9hZGVkLlwiKVxuICAgIH1cblxuICAgIGRpc3BsYXlDb250ZXh0TWVudSh4LCB5LCAkdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuZGlzcGxheSh4LCB5LCAkdGFyZ2V0KTtcbiAgICB9XG4gICAgaGlkZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBzbmFwIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc25hcFRvR3JpZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuZ3JpZFNpemUpICogdGhpcy5ncmlkU2l6ZTtcbiAgICB9XG5cbiAgICAvLyBzdGF0aWMgZnVuY3Rpb24gZm9yIHNuYXBwaW5nIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc3RhdGljIHNuYXBUb0dyaWQodmFsdWUsIGdyaWRTaXplKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gZ3JpZFNpemUpICogZ3JpZFNpemU7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBjYW5ub3QgYmUgdXNlZCBmb3Igd2lyaW5nIGF0IGFueSBjaXJjdW1zdGFuY2VzXG4gICAgZ2V0Tm9uUm91dGFibGVOb2RlcygpIHtcbiAgICAgICAgbGV0IGJsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgLy8gZm9yIGVhY2ggYm94XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgalF1ZXJ5IGNoaWxkIHdpdGggY2xhc3MgLnJlY3QgKFwiaGl0Ym94XCIpXG4gICAgICAgICAgICBsZXQgcmVjdCA9ICQoJyMnICsgdGhpcy5ib3hlc1tpXS5zdmdPYmouaWQpLmNoaWxkcmVuKFwiLnJlY3RcIilbMF07XG4gICAgICAgICAgICAvLyBnZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGVcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9ICQocmVjdCkucG9zaXRpb24oKTtcblxuICAgICAgICAgICAgLy8gc25hcCB0aGUgcG9zaXRpb24gdG8gdGhlIGdyaWRcbiAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24ubGVmdCk7XG4gICAgICAgICAgICBwb3NpdGlvbi50b3AgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24udG9wKTtcblxuICAgICAgICAgICAgLy8gZm9yIGVhY2ggaXRlbSBpbiBibG9ja2VkTm9kZXMgKHNldCBvZiBibG9ja2VkIG5vZGVzIHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmVcbiAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IHVwcGVyIGNvcm5lciBvZiByZWN0OyB1bml0IHVzZWQgaXMgXCJvbmUgZ3JpZFNpemVcIikgY29udmVydCB0aGUgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIC8vIHRvIGFic29sdXRlIChtdWx0aXBsZSB3aXRoIGdyaWRTaXplIGFuZCBhZGQgcG9zaXRpb24gb2YgcmVjdCkgYW5kIGFkZCB0aGUgcmVzdWx0IHRvIHRoZSBzZXRcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLmJveGVzW2ldLmJsb2NrZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGxldCBhYnNvbHV0ZVggPSBwb3NpdGlvbi5sZWZ0ICsgaXRlbS54ICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgICAgICAgICBsZXQgYWJzb2x1dGVZID0gcG9zaXRpb24udG9wICsgaXRlbS55ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICAgICAgICAgIGJsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBhYnNvbHV0ZVgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGFic29sdXRlWVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRvZG8gZW5zdXJlIHRoYXQgdGhpcy5yZWZyZXNoKCkgaXMgcmVhbGx5IHVubmVjZXNzYXJ5XG4gICAgICAgIC8vIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gYmxvY2tlZE5vZGVzO1xuICAgIH1cblxuICAgIG1vdmVUb0Zyb250QnlJZChvYmpJZCkge1xuICAgICAgICB0aGlzLiRzdmcuYXBwZW5kKCQoXCIjXCIgKyBvYmpJZCkpO1xuICAgIH1cblxuICAgIG1vdmVUb0JhY2tCeUlkKG9iaklkKSB7XG4gICAgICAgICQoXCIjXCIgKyB0aGlzLmJhY2tncm91bmQuaWQpXG4gICAgICAgICAgICAuYWZ0ZXIoJChcIiNcIiArIG9iaklkKSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBpcyBiZXR0ZXIgbm90IHRvIHVzZSBmb3Igd2lyaW5nXG4gICAgZ2V0SW5jb252ZW5pZW50Tm9kZXMoaWdub3JlV2lyZUlkKSB7XG5cbiAgICAgICAgbGV0IGluY29udmVuaWVudE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAvLyBmb3IgZWFjaCB3aXJlXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy53aXJlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIChpZ25vcmUgdGhlIHdpcmUgdGhhdCBpcyBzcGVjaWZpZWQgaW4gdGhlIGlnbm9yZVdpcmVJZCBhcmd1bWVudCAoaWYgYW55KSlcbiAgICAgICAgICAgIGlmKGlnbm9yZVdpcmVJZD09PXVuZGVmaW5lZCB8fCBpZ25vcmVXaXJlSWQhPT10aGlzLndpcmVzW2ldLnN2Z09iai5pZCkge1xuICAgICAgICAgICAgICAgIC8vIGN5Y2xlIHRocm91Z2ggcG9pbnRzLCBmb3IgZWFjaCBuZWlnYm91cnMgYWRkIGFsbCBwb2ludHMgdGhhdCBhcmUgaW4gYmV0d2VlbiB0aGVtXG4gICAgICAgICAgICAgICAgLy8gaS5lLjogKDAsMCkgYW5kICgwLDMwKSBhcmUgYmxvY2tpbmcgdGhlc2Ugbm9kZXM6ICgwLDApLCAoMCwxMCksICgwLDIwKSwgKDAsMzApXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb2ludDtcbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzW2ldLnBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZQb2ludCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJldlBvaW50IGlzIHVuZGVmaW5lZCwgYWRkIHRoZSBmaXJzdCBwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jb252ZW5pZW50Tm9kZXMuYWRkKHt4OiBwb2ludC54LCB5OiBwb2ludC55fSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGFkZCBhbGwgdGhlIHBvaW50IGJldHdlZW4gdGhlIHByZXZQb2ludCAoZXhjbHVkZWQpIGFuZCBwb2ludCAoaW5jbHVkZWQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByZXZQb2ludC54PT09cG9pbnQueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIGhvcml6b250YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IE1hdGgubWluKHByZXZQb2ludC55LCBwb2ludC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG8gPSBNYXRoLm1heChwcmV2UG9pbnQueSwgcG9pbnQueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZShmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29udmVuaWVudE5vZGVzLmFkZCh7eDogcG9pbnQueCwgeTogZnJvbX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICs9IHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHByZXZQb2ludC55PT09cG9pbnQueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb20gPSBNYXRoLm1pbihwcmV2UG9pbnQueCwgcG9pbnQueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvID0gTWF0aC5tYXgocHJldlBvaW50LngsIHBvaW50LngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUoZnJvbSA8PSB0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbnZlbmllbnROb2Rlcy5hZGQoe3g6IGZyb20sIHk6IHBvaW50Lnl9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArPSB0aGlzLmdyaWRTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluZSBpcyBuZWl0aGVyIGhvcml6b250YWwgbm9yIHZlcnRpY2FsLCB0aHJvdyBhbiBlcnJvciBmb3IgYmV0dGVyIGZ1dHVyZSBkZWJ1Z2dpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZ2V0SW5jb252ZW5pZW50Tm9kZXM6IGxpbmUgYmV0d2VlbiB0d28gcG9pbnRzIGlzIG5laXRoZXIgaG9yaXpvbnRhbCBub3IgdmVydGljYWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgbmV3IHByZXZQb2ludFxuICAgICAgICAgICAgICAgICAgICBwcmV2UG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gaW5jb252ZW5pZW50Tm9kZXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFN2ZyBmcm9tICcuL2NhbnZhcy5qcyc7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGxldCBzdmcgPSBuZXcgU3ZnKFwic3ZnI2NhbnZhc1wiLCAxMCk7XG5cbiAgICAvKiBERU1PICovXG4gICAgLy8gT05FIEJJVCBDT01QQVJBVE9SXG4gICAgLypcbiAgICBsZXQgaTEgPSBzdmcubmV3SW5wdXQoMTAwLCAxMDApO1xuICAgIGxldCBpMiA9IHN2Zy5uZXdJbnB1dCgxMDAsIDIwMCk7XG5cbiAgICBsZXQgbjEgPSBzdmcubmV3R2F0ZShcIm5vdFwiLCAyMDAsIDEwMCk7XG4gICAgbGV0IG4yID0gc3ZnLm5ld0dhdGUoXCJub3RcIiwgMjAwLCAyMDApO1xuXG4gICAgbGV0IGExID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCA5MCk7XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCAyMTApO1xuXG4gICAgbGV0IG5vciA9IHN2Zy5uZXdHYXRlKFwibm9yXCIsIDU0MCwgMTUwKTtcblxuICAgIGxldCBvMSA9IHN2Zy5uZXdPdXRwdXQoNjgwLCA5MCk7XG4gICAgbGV0IG8yID0gc3ZnLm5ld091dHB1dCg2ODAsIDE1MCk7XG4gICAgbGV0IG8zID0gc3ZnLm5ld091dHB1dCg2ODAsIDIxMCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbjEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG4yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKG4xLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShuMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbm9yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGEyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBub3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUobm9yLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzMuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cblxuICAgIC8vIEJJTkFSWSBBRERFUlxuICAgIC8qXG4gICAgbGV0IGkxID0gc3ZnLm5ld0lucHV0KDgwLCA5MCk7XG4gICAgbGV0IGkyID0gc3ZnLm5ld0lucHV0KDgwLCAxMzApO1xuICAgIGxldCBpMyA9IHN2Zy5uZXdJbnB1dCg4MCwgMTgwKTtcblxuICAgIGxldCB4MSA9IHN2Zy5uZXdHYXRlKFwieG9yXCIsIDM2MCwgMTAwKTtcbiAgICBsZXQgeDIgPSBzdmcubmV3R2F0ZShcInhvclwiLCAzNjAsIDE3MCk7XG5cbiAgICBsZXQgYTEgPSBzdmcubmV3R2F0ZShcImFuZFwiLCAyNTAsIDIyMCk7XG4gICAgYTEub25DbGlja01pZGRsZSgpOy8vIGEgamVkbm91IHJvdG92YW55XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgNTAwLCAzMjApO1xuXG4gICAgbGV0IG9yID0gc3ZnLm5ld0dhdGUoXCJvclwiLCA2MjAsIDMxMCk7XG5cbiAgICBsZXQgbzEgPSBzdmcubmV3T3V0cHV0KDc1MCwgMjcwKTtcbiAgICBsZXQgbzIgPSBzdmcubmV3T3V0cHV0KDc1MCwgMzEwKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4MS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDEuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoeDEub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKHgxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGExLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvci5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKHgyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgb3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShvci5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cbn0pOyJdfQ==
