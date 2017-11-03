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
    }, {}, $__super);
  }(NetworkElement);
  var InputConnector = function($__super) {
    function InputConnector(parentSVG, gridSize, left, top) {
      $traceurRuntime.superConstructor(InputConnector).call(this, parentSVG, gridSize, left, top);
      this.isInputConnector = true;
    }
    return ($traceurRuntime.createClass)(InputConnector, {
      setState: function(state, propagationId) {
        var loopGuard = this.parentSVG.loopGuard(propagationId, this.svgObj.id, state);
        $traceurRuntime.superGet(this, InputConnector.prototype, "setState").call(this, loopGuard.state, propagationId);
        if (loopGuard.stopPropagation === false) {
          var gate = this.parentSVG.getBoxByConnectorId(this.svgObj.id);
          gate.refreshState(propagationId);
        }
      },
      removeWireIdAndUpdate: function(wireId) {
        $traceurRuntime.superGet(this, InputConnector.prototype, "removeWireIdAndUpdate").call(this, wireId);
        this.setState(Logic.state.unknown, this.parentSVG.getNewPropagationId());
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
    }
    return ($traceurRuntime.createClass)(OutputConnector, {
      setState: function(state, propagationId) {
        var $__6 = this;
        var loopGuard = this.parentSVG.loopGuard(propagationId, this.svgObj.id, state);
        $traceurRuntime.superGet(this, OutputConnector.prototype, "setState").call(this, loopGuard.state, propagationId);
        if (loopGuard.stopPropagation === false) {
          this.wireIds.forEach(function(wireId) {
            $__6.parentSVG.getWireById(wireId).setState(state, propagationId);
          });
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
      this.inputs = [];
      this.outputs = [];
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
      get exportData() {
        return {
          name: this.name,
          id: this.svgObj.id,
          category: this.category,
          transform: this.getTransform()
        };
      },
      generateBlockNodes: function() {
        var marginTop = arguments[0] !== (void 0) ? arguments[0] : 0;
        var marginRight = arguments[1] !== (void 0) ? arguments[1] : 0;
        var marginBottom = arguments[2] !== (void 0) ? arguments[2] : 0;
        var marginLeft = arguments[3] !== (void 0) ? arguments[3] : 0;
        for (var specialNodes = [],
            $__14 = 4; $__14 < arguments.length; $__14++)
          specialNodes[$__14 - 4] = arguments[$__14];
        this.blockedNodes = new Set();
        for (var x = marginLeft; x <= this.gridWidth - marginRight; x++) {
          for (var y = marginTop; y <= this.gridHeight - marginBottom; y++) {
            this.blockedNodes.add({
              x: x,
              y: y
            });
          }
        }
        var $__10 = true;
        var $__11 = false;
        var $__12 = undefined;
        try {
          for (var $__8 = void 0,
              $__7 = (specialNodes)[Symbol.iterator](); !($__10 = ($__8 = $__7.next()).done); $__10 = true) {
            var node = $__8.value;
            {
              this.blockedNodes.add(node);
            }
          }
        } catch ($__13) {
          $__11 = true;
          $__12 = $__13;
        } finally {
          try {
            if (!$__10 && $__7.return != null) {
              $__7.return();
            }
          } finally {
            if ($__11) {
              throw $__12;
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
        var $__10 = true;
        var $__11 = false;
        var $__12 = undefined;
        try {
          for (var $__8 = void 0,
              $__7 = (this.blockedNodes)[Symbol.iterator](); !($__10 = ($__8 = $__7.next()).done); $__10 = true) {
            var item = $__8.value;
            {
              if (item.x === x && item.y === y) {
                this.blockedNodes.delete(item);
                break;
              }
            }
          }
        } catch ($__13) {
          $__11 = true;
          $__12 = $__13;
        } finally {
          try {
            if (!$__10 && $__7.return != null) {
              $__7.return();
            }
          } finally {
            if ($__11) {
              throw $__12;
            }
          }
        }
      },
      rotateBlockedNodesRight: function() {
        var $__6 = this;
        if (this.rotation === undefined || this.rotation === 4) {
          this.rotation = 0;
        }
        this.rotation++;
        if (this.rotation === 1 || this.rotation === 3) {
          var newBlockedNodes = new Set();
          this.blockedNodes.forEach(function(item) {
            newBlockedNodes.add({
              x: Math.abs(item.y - $__6.gridHeight),
              y: item.x
            });
          });
          this.blockedNodes = newBlockedNodes;
        } else if (this.rotation === 2 || this.rotation === 4) {
          var newBlockedNodes$__15 = new Set();
          this.blockedNodes.forEach(function(item) {
            newBlockedNodes$__15.add({
              x: Math.abs(item.y - $__6.gridWidth),
              y: item.x
            });
          });
          this.blockedNodes = newBlockedNodes$__15;
        }
      },
      addInput: function(left, top) {
        var index = this.inputs.length;
        this.inputs[index] = new InputConnector(this.parentSVG, this.gridSize, left, top);
        this.inputs[index].svgObj.addAttr({gateid: this.svgObj.id});
        this.svgObj.addChild(this.inputs[index].get());
        this.removeBlockedNode(left, top);
      },
      addOutput: function(left, top) {
        var index = this.outputs.length;
        this.outputs[index] = new OutputConnector(this.parentSVG, this.gridSize, left, top);
        this.outputs[index].svgObj.addAttr({gateid: this.svgObj.id});
        this.svgObj.addChild(this.outputs[index].get());
        this.removeBlockedNode(left, top);
      },
      getConnectorById: function(connectorId) {
        for (var i = 0; i < this.inputs.length; i++) {
          if (this.inputs[i].svgObj.id === connectorId) {
            return this.inputs[i];
          }
        }
        for (var i$__16 = 0; i$__16 < this.outputs.length; i$__16++) {
          if (this.outputs[i$__16].svgObj.id === connectorId) {
            return this.outputs[i$__16];
          }
        }
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
        var $__6 = this;
        var connectors = this.inputs.concat(this.outputs);
        for (var i = 0; i < connectors.length; ++i) {
          connectors[i].wireIds.forEach(function(wireId) {
            var wire = $__6.parentSVG.getWireById(wireId);
            if (temporary) {
              wire.temporaryWire();
            } else {
              wire.routeWire();
            }
          });
        }
      }
    }, {}, $__super);
  }(NetworkElement);
  var InputBox = function($__super) {
    function InputBox(parentSVG) {
      var isOn = arguments[1] !== (void 0) ? arguments[1] : false;
      var width = 7;
      var height = 4;
      $traceurRuntime.superConstructor(InputBox).call(this, parentSVG, "input", "io", width, height);
      this.addOutput(width, height / 2);
      this.outputs[0].setState(Logic.state.off, this.parentSVG.getNewPropagationId());
      this.isOn = isOn;
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
        var t = this.outputs[0].state;
        this.outputs[0].setState(t, this.parentSVG.getNewPropagationId());
      },
      set on(isOn) {
        var newPropId = this.parentSVG.getNewPropagationId();
        if (isOn) {
          this.changeImage("on");
          this.outputs[0].setState(Logic.state.on, newPropId);
        } else {
          this.changeImage();
          this.outputs[0].setState(Logic.state.off, newPropId);
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
      this.addInput(0, height / 2);
    }
    return ($traceurRuntime.createClass)(OutputBox, {
      refreshState: function() {
        this.setState(this.inputs[0].state);
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
      if (this.name === "not") {
        this.addInput(0, height / 2);
      } else {
        this.addInput(0, height / 4);
        this.addInput(0, height / (4 / 3));
        this.generateBlockNodes({
          x: 0,
          y: height / 2
        });
      }
      this.addOutput(width, height / 2);
      this.refreshState(this.parentSVG.getNewPropagationId());
    }
    return ($traceurRuntime.createClass)(Gate, {
      generateBlockNodes: function(specialNode) {
        if (specialNode !== undefined) {
          $traceurRuntime.superGet(this, Gate.prototype, "generateBlockNodes").call(this, 0, 1, 0, 1, specialNode);
        } else {
          $traceurRuntime.superGet(this, Gate.prototype, "generateBlockNodes").call(this, 0, 1, 0, 1);
        }
      },
      refreshState: function(propagationId) {
        if (propagationId === undefined) {
          console.error('refreshState error: propagationId cannot be undefined');
        }
        switch (this.name) {
          case "and":
            this.outputs[0].setState(Logic.and(this.inputs[0].state, this.inputs[1].state), propagationId);
            break;
          case "nand":
            this.outputs[0].setState(Logic.nand(this.inputs[0].state, this.inputs[1].state), propagationId);
            break;
          case "nor":
            this.outputs[0].setState(Logic.nor(this.inputs[0].state, this.inputs[1].state), propagationId);
            break;
          case "not":
            this.outputs[0].setState(Logic.not(this.inputs[0].state), propagationId);
            break;
          case "or":
            this.outputs[0].setState(Logic.or(this.inputs[0].state, this.inputs[1].state), propagationId);
            break;
          case "xnor":
            this.outputs[0].setState(Logic.xnor(this.inputs[0].state, this.inputs[1].state), propagationId);
            break;
          case "xor":
            this.outputs[0].setState(Logic.xor(this.inputs[0].state, this.inputs[1].state), propagationId);
            break;
        }
      }
    }, {}, $__super);
  }(Box);
  var Wire = function($__super) {
    function Wire(parentSVG, fromId, toId, gridSize) {
      $traceurRuntime.superConstructor(Wire).call(this, parentSVG);
      this.gridSize = gridSize;
      this.fromId = fromId;
      this.toId = toId;
      this.startBox = this.parentSVG.getBoxByConnectorId(fromId);
      this.endBox = this.parentSVG.getBoxByConnectorId(toId);
      this.startConnector = this.parentSVG.getConnectorById(fromId);
      this.endConnector = this.parentSVG.getConnectorById(toId);
      this.routeWire();
      this.stateAttr = Logic.state.unknown;
      if (this.startConnector.isOutput) {
        this.setState(this.startConnector.state, this.parentSVG.getNewPropagationId());
      } else if (this.endConnector.isOutput) {
        this.setState(this.endConnector.state, this.parentSVG.getNewPropagationId());
      } else {
        this.svgObj.addClass(stateClasses.unknown);
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
        if (this.startConnector.isInputConnector) {
          this.startConnector.setState(state, propagationId);
        }
        if (this.endConnector.isInputConnector) {
          this.endConnector.setState(state, propagationId);
        }
        this.stateAttr = state;
      },
      get state() {
        return this.stateAttr;
      },
      updateWireState: function() {
        this.startBox.refreshState(this.parentSVG.getNewPropagationId());
        this.endBox.refreshState(this.parentSVG.getNewPropagationId());
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
        var $__18 = this,
            $__19 = function() {
              var currentNode;
              var currentNodeFScore;
              openNodes.forEach(function(node) {
                if (!currentNode || fScore.get(node) < currentNodeFScore) {
                  currentNode = node;
                  currentNodeFScore = fScore.get(currentNode);
                }
              });
              if (svgObj.PolylinePoint.equals(currentNode, end)) {
                return {v: $__18.reconstructPath(cameFrom, currentNode)};
              }
              openNodes.delete(currentNode);
              closedNodes.add(currentNode);
              for (var direction = 0; direction < 4; direction++) {
                var newPoint = Wire.movePoint(currentNode, direction);
                for (var i = 0; i < 50; i++) {
                  if (Wire.setHasThisPoint(nonRoutable, $__18.scalePointToGrid(newPoint))) {
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
                  if (Wire.setHasThisPoint(punishedButRoutable, $__18.scalePointToGrid(newPoint))) {
                    possibleGScore += 1;
                  }
                  if (possibleGScore >= gScore.get(newPoint)) {
                    continue;
                  }
                  cameFrom.set(newPoint, currentNode);
                  gScore.set(newPoint, possibleGScore);
                  fScore.set(newPoint, possibleGScore + Wire.manhattanDistance(newPoint, end));
                  if (Wire.setHasThisPoint(punishedButRoutable, $__18.scalePointToGrid(newPoint))) {
                    break;
                  }
                  newPoint = Wire.movePoint(newPoint, direction);
                }
              }
              if (openNodes.size > maxNodeLimit) {
                return 0;
              }
            },
            $__20;
        $__17: while (openNodes.size > 0) {
          $__20 = $__19();
          switch ($__20) {
            case 0:
              break $__17;
            default:
              if ((typeof $__20 === 'undefined' ? 'undefined' : $traceurRuntime.typeof($__20)) === "object")
                return $__20.v;
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
        var $__10 = true;
        var $__11 = false;
        var $__12 = undefined;
        try {
          for (var $__8 = void 0,
              $__7 = (set)[Symbol.iterator](); !($__10 = ($__8 = $__7.next()).done); $__10 = true) {
            var item = $__8.value;
            {
              if (item.x === point.x && item.y === point.y) {
                return true;
              }
            }
          }
        } catch ($__13) {
          $__11 = true;
          $__12 = $__13;
        } finally {
          try {
            if (!$__10 && $__7.return != null) {
              $__7.return();
            }
          } finally {
            if ($__11) {
              throw $__12;
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
  return {get exportNetwork() {
      return exportNetwork;
    }};
})();
var $__src_47_es6_47_floatingMenu_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/floatingMenu.js";
  var exportNetwork = ($__src_47_es6_47_importExport_46_js__).exportNetwork;
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
      var exportButton = new floatingMenuItem("export", "export", "Export this network", "a");
      exportButton.$el.on("click", function() {
        var data = new exportNetwork(parentSVG);
        var $popup = $("<div>").attr("id", "jsonExport");
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
var $__src_47_es6_47_canvas_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/canvas.js";
  var svgObj = $__src_47_es6_47_svgObjects_46_js__;
  var editorElements = $__src_47_es6_47_editorElements_46_js__;
  var Logic = ($__src_47_es6_47_logic_46_js__).default;
  var ContextMenu = ($__src_47_es6_47_contextMenu_46_js__).default;
  var FloatingMenu = ($__src_47_es6_47_floatingMenu_46_js__).default;
  var Svg = function() {
    function Svg(canvas, gridSize) {
      var $__2 = this;
      this.$svg = $(canvas);
      this.gridSize = gridSize;
      this.boxes = [];
      this.wires = [];
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
        var data = {
          gridSize: this.gridSize,
          boxes: [],
          wires: []
        };
        for (var i = 0; i < this.boxes.length; ++i) {
          data.boxes[i] = this.boxes[i].exportData;
        }
        for (var i$__10 = 0; i$__10 < this.wires.length; ++i$__10) {
          data.wires[i$__10] = this.wires[i$__10].exportData;
        }
        return data;
      },
      wireCreationHelper: function(connectorId) {
        if (!this.firstConnectorId) {
          this.firstConnectorId = connectorId;
        } else {
          this.newWire(this.firstConnectorId, connectorId);
          this.firstConnectorId = undefined;
        }
      },
      getNewPropagationId: function() {
        this.propagationHistory = new Map();
        if (this.propId === undefined) {
          this.propId = 1;
        } else {
          this.propId++;
        }
        return this.propId;
      },
      loopGuard: function(propagationId, connectorId, state) {
        if (propagationId === this.propId) {
          if (this.propagationHistory.has(connectorId)) {
            var stateList = this.propagationHistory.get(connectorId);
            var thisStateFound = false;
            for (var i = 0; i < stateList.length; ++i) {
              if (stateList[i] === state) {
                thisStateFound = true;
                break;
              }
            }
            var lastState = stateList[stateList.length - 1];
            stateList[stateList.length] = state;
            this.propagationHistory.set(connectorId, stateList);
            if (thisStateFound) {
              if (lastState !== state) {
                return {
                  stopPropagation: false,
                  state: Logic.state.oscillating
                };
              } else {
                return {
                  stopPropagation: true,
                  state: state
                };
              }
            }
          } else {
            this.propagationHistory.set(connectorId, [state]);
          }
        } else {
          this.propagationHistory = new Map();
        }
        return {
          stopPropagation: false,
          state: state
        };
      },
      newGate: function(name, x, y) {
        return this.newBox(x, y, new editorElements.Gate(this, name, x, y));
      },
      newInput: function(x, y) {
        return this.newBox(x, y, new editorElements.InputBox(this));
      },
      newOutput: function(x, y) {
        return this.newBox(x, y, new editorElements.OutputBox(this));
      },
      newBox: function(x, y, object) {
        var index = this.boxes.length;
        this.boxes[index] = object;
        if (x && y) {
          var tr = new editorElements.Transform();
          tr.setTranslate(x, y);
          this.boxes[index].svgObj.addAttr({"transform": tr.get()});
        }
        this.appendElement(this.boxes[index]);
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
          for (var i$__11 = 0; i$__11 < this.boxes[gateIndex].inputs.length; i$__11++) {
            this.removeWiresByConnectorId(this.boxes[gateIndex].inputs[i$__11].svgObj.id);
          }
          for (var i$__12 = 0; i$__12 < this.boxes[gateIndex].outputs.length; i$__12++) {
            this.removeWiresByConnectorId(this.boxes[gateIndex].outputs[i$__12].svgObj.id);
          }
          this.boxes.splice(gateIndex, 1);
          $gate.remove();
        } else {
          console.error("Trying to remove an nonexisting gate. (Gate id: " + gateId + ")");
        }
      },
      newWire: function(fromId, toId) {
        if (fromId === toId) {
          return false;
        }
        this.fromId = fromId;
        this.toId = toId;
        var fromConnector = this.getConnectorById(fromId);
        var toConnector = this.getConnectorById(toId);
        if (fromConnector.isInputConnector) {
          this.removeWiresByConnectorId(fromId);
        }
        if (toConnector.isInputConnector) {
          this.removeWiresByConnectorId(toId);
        }
        var index = this.wires.length;
        this.wires[index] = new editorElements.Wire(this, fromId, toId, this.gridSize);
        fromConnector.addWireId(this.wires[index].svgObj.id);
        toConnector.addWireId(this.wires[index].svgObj.id);
        this.appendElement(this.wires[index]);
        this.moveToBackById(this.wires[index].svgObj.id);
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
            otherConnector.setState(Logic.state.unknown, $__2.getNewPropagationId());
          }
        });
        connector.wireIds.clear();
        if (connector.isInputConnector) {
          connector.setState(Logic.state.unknown, this.getNewPropagationId());
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
          for (var j = 0; j < this.boxes[i].inputs.length; j++) {
            if (this.boxes[i].inputs[j].svgObj.id === connectorId) {
              return this.boxes[i];
            }
          }
          for (var j$__13 = 0; j$__13 < this.boxes[i].outputs.length; j$__13++) {
            if (this.boxes[i].outputs[j$__13].svgObj.id === connectorId) {
              return this.boxes[i];
            }
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
            var connector$__14 = this.boxes[i].getConnectorById(connectorId);
            if (connector$__14) {
              return connector$__14;
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
        this.appendJQueryObject(element.get());
      },
      appendJQueryObject: function(object) {
        this.$svg.append(object);
        this.refresh();
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
        this.refresh();
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
        var $__15 = this,
            $__16 = function(i) {
              if (ignoreWireId === undefined || ignoreWireId !== $__15.wires[i].svgObj.id) {
                var prevPoint;
                $__15.wires[i].points.forEach(function(point) {
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
                      var from$__17 = Math.min(prevPoint.x, point.x);
                      var to$__18 = Math.max(prevPoint.x, point.x);
                      while (from$__17 <= to$__18) {
                        inconvenientNodes.add({
                          x: from$__17,
                          y: point.y
                        });
                        from$__17 += $__2.gridSize;
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
          $__16(i);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiIsInNyYy9lczYvc3RydWN0dXJlc0FuZENsYXNzZXMuanMiLCJzcmMvZXM2L3N2Z09iamVjdHMuanMiLCJzcmMvZXM2L2xvZ2ljLmpzIiwic3JjL2VzNi9lZGl0b3JFbGVtZW50cy5qcyIsInNyYy9lczYvY29udGV4dE1lbnUuanMiLCJzcmMvZXM2L2ltcG9ydEV4cG9ydC5qcyIsInNyYy9lczYvZmxvYXRpbmdNZW51LmpzIiwic3JjL2VzNi9jYW52YXMuanMiLCJzcmMvZXM2L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxBQUFJLElBQUEsQ0FBQSxZQUFXLG9DQUFvQixDQUFDO0FDR3BDLEFBQUksSUFBQSxDQUFBLGtCQUFpQixFQUFJLEtBQUcsQ0FBQztJQUVoQixHQUFDLEVBTGQsQ0FBQSxTQUFTLEFBQUQ7QUFLRCxXQUFNLEdBQUMsQ0FDRSxBQUFELENBQUc7QUFDVixTQUFHLENBQUMsa0JBQWlCLENBQUU7QUFDbkIseUJBQWlCLEVBQUksS0FBRyxDQUFDO01BQzdCO0FBQUEsQUFFQSxTQUFHLE9BQU8sRUFBSSxLQUFHLENBQUM7QUFDbEIsU0FBRyxPQUFPLEVBQUksRUFBQSxDQUFDO0FBRWYsV0FBTyxtQkFBaUIsQ0FBQztJQUM3QjtBQW9CSixBQWpDVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUFlaEMsUUFBSSxPQUFLLEVBQUk7QUFDVCxBQUFJLFVBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxJQUFHLFNBQVMsQUFBQyxFQUFDLENBQUM7QUFJNUIsY0FBTSxDQUFBLEFBQUMsQ0FBQyxHQUFFLEVBQUUsT0FBSyxDQUFDLE9BQU8sQ0FBRztBQUN4QixhQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ2IsZUFBSyxFQUFJLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO1FBQzVCO0FBQUEsQUFFQSxXQUFHLE9BQU8sRUFBRSxDQUFDO0FBRWIsYUFBTyxPQUFLLENBQUM7TUFDakI7QUFFQSxhQUFPLENBQVAsVUFBUyxBQUFELENB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LENBQVQsVUFBVyxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDYixhQUFPLENBQUEsS0FBSSx3QkFBd0IsQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFDdkMsQ0FBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDekQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFakUsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDbEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDMUQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDOUQsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sWUFBWSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENB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QUFPO0FBRUgsNEJBQU0sTUFBTSxBQUFDLENBQUMsa0ZBQWlGLENBQUMsQ0FBQztvQkFDckc7QUFBQSxrQkFDSjtBQUFBLEFBR0EsMEJBQVEsRUFBSTtBQUNSLG9CQUFBLENBQUcsQ0FBQSxLQUFJLEVBQUU7QUFDVCxvQkFBQSxDQUFHLENBQUEsS0FBSSxFQUFFO0FBQUEsa0JBQ2IsQ0FBQztnQkFDTCxDQUFDLENBQUM7Y0FHTjtBQUFBO0FBN0NKLG1CQUFZLEVBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsTUFBTSxPQUFPLENBQUksR0FBRSxDQUFBOztRQThDMUM7QUFFQSxhQUFPLGtCQUFnQixDQUFDO01BQzVCO09BbkdPLFVBQVMsQ0FBaEIsVUFBa0IsS0FBSSxDQUFHLENBQUEsUUFBTyxDQUFHO0FBQy9CLGFBQU8sQ0FBQSxJQUFHLE1BQU0sQUFBQyxDQUFDLEtBQUksRUFBSSxTQUFPLENBQUMsQ0FBQSxDQUFJLFNBQU8sQ0FBQztNQUNsRCxFQXBid0YsQ0FBQztFQUNyRixBQUFDLEVBQUM7O0FBSFYsU0FBQSxhQUF3QjtBQUFFLGdCQUF3QjtJQUFFLEVBQTdCOzs7O0FBQXZCLEFBQUksSUFBQSxDQUFBLFlBQVcsb0JBQW9CLENBQUM7SUNBN0IsSUFBRTtBQUVULEVBQUEsQUFBQyxDQUFDLFNBQVUsQUFBRCxDQUFHO0FBQ1YsQUFBSSxNQUFBLENBQUEsR0FBRSxFQUFJLElBQUksSUFBRSxBQUFDLENBQUMsWUFBVyxDQUFHLEdBQUMsQ0FBQyxDQUFDO0VBMkV2QyxDQUFDLENBQUM7QUE5RUYsV0FBdUIiLCJmaWxlIjoiL2hvbWUvd2FyYW4vU2tvbGEvcnAvY29kZS90ZW1wb3V0TUM0Mk5qSXdOekV3TlRRME1URXhNakF4LmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gc2luZ2xldG9uIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZCdzXG5sZXQgZXhpc3RpbmdJZEluc3RhbmNlID0gbnVsbDtcbi8vIHVzYWdlOiBsZXQgaWQgPSBuZXcgSWQoKS51bmlxdWVcbmV4cG9ydCBjbGFzcyBJZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmKCFleGlzdGluZ0lkSW5zdGFuY2Upe1xuICAgICAgICAgICAgZXhpc3RpbmdJZEluc3RhbmNlID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJlZml4ID0gXCJpZFwiO1xuICAgICAgICB0aGlzLm5leHRJZCA9IDA7XG5cbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nSWRJbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXQgdW5pcXVlKCkge1xuICAgICAgICBsZXQgcmV0VmFsID0gdGhpcy5nZW5lcmF0ZSgpO1xuXG4gICAgICAgIC8vIGZpbmQgbmV4dCB1bnVzZWQgaWRYWFhYIHRvIHByZXZlbnQgaWQgY29sbGlzaW9uIHRoYXQgbWlnaHQgYmUgY2F1c2VkIGJ5IHNvbWUgb3RoZXIgY29tcG9uZW50XG4gICAgICAgIC8vIChpdCByZWFsbHkgc2hvdWxkIG5vdCBoYXBwZW4sIGJ1dCB0aGlzIGlzIGEgc2ltcGxlIG1ldGhvZCB0byBlbnN1cmUgc2FmZXR5KVxuICAgICAgICB3aGlsZSgkKFwiI1wiK3JldFZhbCkubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRJZCsrO1xuICAgICAgICAgICAgcmV0VmFsID0gdGhpcy5nZW5lcmF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiB0aGlzIGlkXG4gICAgICAgIHRoaXMubmV4dElkKys7XG5cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5uZXh0SWQ7XG4gICAgfVxufVxuXG4vLyB0byBlczUgY29tcGlsZXIgZnJpZW5kbHkgaW1wbGVtZW50YXRpb24gKGNhbGxpbmcgYSBidWlsdGluIE1hcCBjb25zdHJ1Y3RvciB3aXRob3V0IG5ldyBpcyBmb3JiaWRkZW5cbmV4cG9ydCBjbGFzcyBNYXBXaXRoRGVmYXVsdFZhbHVlIHtcbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IGRlZmF1bHRWYWx1ZTtcblxuXG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5zaXplO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBmb3JFYWNoKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmZvckVhY2goLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZGVsZXRlKGtleSk7XG4gICAgfVxuXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5oYXMoa2V5KTtcbiAgICB9XG5cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZW50cmllcygpO1xuICAgIH1cblxuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5rZXlzKCk7XG4gICAgfVxuXG4gICAgdmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAudmFsdWVzKCk7XG4gICAgfVxufVxuXG4vKlxuLy8gZXM2IGltcGxlbWVudGF0aW9uXG5leHBvcnQgY2xhc3MgTWFwV2l0aERlZmF1bHRWYWx1ZSBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3IoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgaWYodGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiovIiwiaW1wb3J0ICogYXMgU3RydWN0dXJlcyBmcm9tICcuL3N0cnVjdHVyZXNBbmRDbGFzc2VzLmpzJ1xuXG5jbGFzcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgdGhpcy50YWdOYW1lID0gdGFnTmFtZTtcblxuICAgICAgICB0aGlzLiRlbCA9ICQoXCI8XCIrdGhpcy50YWdOYW1lK1wiPlwiKTtcblxuICAgICAgICB0aGlzLmlkID0gbmV3IFN0cnVjdHVyZXMuSWQoKS51bmlxdWU7XG4gICAgfVxuXG4gICAgYWRkQ2xhc3MobmFtZSkge1xuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhuYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVDbGFzc2VzKC4uLmNsYXNzZXMpIHtcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQXR0cihhc3NvYykge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcblxuICAgICAgICAvLyBhZGQgYXR0cmlidXRlcyB0byB0aGUgZWxlbWVudFxuICAgICAgICB0aGlzLiRlbC5hdHRyKGFzc29jKTtcbiAgICB9XG5cbiAgICBnZXRBdHRyKG5hbWUpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLmF0dHIobmFtZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXR0cihuYW1lKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuXG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUF0dHIobmFtZSk7XG4gICAgfVxuXG4gICAgc2V0IGlkKGlkKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJpZFwiOiBpZH0pO1xuICAgIH07XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHIoXCJpZFwiKTtcbiAgICB9O1xuXG4gICAgZ2V0KCkge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBlbGVtZW50IGV4aXN0cyBpbiBkb20sIHdlIG5lZWQgdG8gZmV0Y2ggaXQgdXNpbmcgalF1ZXJ5XG4gICAgY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpIHtcbiAgICAgICAgbGV0ICRqcUVsZW1lbnQgPSAkKFwiI1wiK3RoaXMuJGVsLmF0dHIoJ2lkJykpO1xuICAgICAgICBpZigkanFFbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkanFFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgZHJhZ2dhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJkcmFnZ2FibGVcIjogdmFsdWV9KTtcbiAgICB9XG59XG5cbmNsYXNzIFJvdGF0YWJsZSBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcbiAgICB9XG5cbiAgICByb3RhdGFibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcInJvdGF0YWJsZVwiOiB2YWx1ZX0pO1xuICAgIH1cbn1cblxuLy8gdGhlcmUgaXMgbm8gbXVsdGlwbGUgaW5oZXJpdGFuY2UgaW4gRVM2LCBzbyBJIGhhdmUgdG8gZG8gc29tZXRoaW5nIHVnbHkgbGlrZSB0aGlzXG5jbGFzcyBEcmFnZ2FibGVSb3RhdGFibGUgZXh0ZW5kcyBEcmFnZ2FibGUge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgcm90YXRhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJyb3RhdGFibGVcIjogdmFsdWV9KTtcbiAgICB9XG59XG5cbmNsYXNzIFN2Z0VsZW1lbnQgZXh0ZW5kcyBEcmFnZ2FibGVSb3RhdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG5cbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgU3ZnRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgZmlsbCwgc3Ryb2tlKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHcsIGgsIFwicmVjdFwiKTtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGwsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZSxcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAwLjUsXG4gICAgICAgICAgICAncG9pbnRlci1ldmVudHMnOiAnYWxsJyAvLyB0byB0cmlnZ2VyIGhvdmVyIGV2ZW4gd2l0aCB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN2Z0ltYWdlIGV4dGVuZHMgU3ZnRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgdXJsKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHcsIGgsIFwiaW1hZ2VcIik7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBcInhsaW5rOmhyZWZcIjogdXJsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZVVybCh1cmwpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIFwieGxpbms6aHJlZlwiOiB1cmxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBEcmFnZ2FibGVSb3RhdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcImdcIik7XG4gICAgfVxuXG4gICAgYWRkQ2hpbGQoZWwpIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGVsLiRlbCk7XG4gICAgICAgIHJldHVybiBlbDsgLy8gcHJvIGplZG5vZHVzc2kgXCJsZXQgcmVjdCA9IGcuYWRkQ2hpbGQobmV3IFJlY3RhbmdsZSguLi5cIlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvbHlsaW5lUG9pbnQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgaWYoeCAhPT0gdW5kZWZpbmVkICYmIHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZUZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIGxldCBhcnIgPSBzdHJpbmcuc3BsaXQoXCIsXCIpO1xuICAgICAgICByZXR1cm4gbmV3IFBvbHlsaW5lUG9pbnQoYXJyWzBdLCBhcnJbMV0pO1xuICAgIH1cblxuICAgIGdldCBzdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKyBcIixcIiArIHRoaXMueTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55O1xuICAgIH1cbn1cblxuY2xhc3MgU21hcnRBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgICAgIGlmKGFyciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFyciA9IGFycjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXJyID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gU21hcnRBcnJheSgkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5hcnIpKTtcbiAgICB9XG5cbiAgICBhcHBlbmQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkV2l0aEluZGV4KHBvaW50LCB0aGlzLmFyci5sZW5ndGgpO1xuICAgIH1cblxuICAgIHByZXBlbmQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkV2l0aEluZGV4KHBvaW50LCAwKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYSBwb2ludCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LCBtb3ZlIGFsbCBmb2xsb3dpbmcgaXRlbXNcbiAgICBhZGRXaXRoSW5kZXgocG9pbnQsIGluZGV4KSB7XG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuYXJyLmxlbmd0aCA7IGkgPiBpbmRleCA7IC0taSkge1xuICAgICAgICAgICAgdGhpcy5hcnJbaV0gPSB0aGlzLmFycltpLTFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJyW2luZGV4XSA9IHBvaW50O1xuICAgICAgICByZXR1cm4gdGhpczsgLy8gdG8gZW5hYmxlIGNoYWluaW5nIG9mIGFwcGVuZCAvIHByZXBwZW5kIC8gYWRkV2l0aEluZGV4IGNvbW1hbmRzXG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRJdGVtKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFycltpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0IGxhc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGVuZ3RoIT09MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyW3RoaXMubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZmlyc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGVuZ3RoIT09MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaW5kZXhBcnJheSBtdXN0IGJlIHNvcnRlZCAoQVNDLCBlZy4gWzEsIDMsIDQsIDhdKVxuICAgIHJlbW92ZShpbmRleCkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yKGxldCBpID0gaW5kZXggOyBpIDwgbGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmFycltpXSA9IHRoaXMuYXJyW2kgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFyci5wb3AoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2x5bGluZVBvaW50cyBleHRlbmRzIFNtYXJ0QXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycikge1xuICAgICAgICBzdXBlcihhcnIpO1xuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9seWxpbmVQb2ludHMoJC5leHRlbmQodHJ1ZSwgW10sIHRoaXMuYXJyKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKHBvaW50KSB7XG4gICAgICAgIC8vIGNhbGwgaW5oZXJpdGVkIGZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYXBwZW5kaW5nXG4gICAgICAgIHN1cGVyLmFwcGVuZChwb2ludCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHNlY29uZCB0byBsYXN0IHBvaW50IGlzIHVubmVjZXNzYXJ5LCByZW1vdmUgaXRcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICBpZiAoIGxlbmd0aCA+PSAzXG4gICAgICAgICAgICAgICAgJiYgKCAgICAoIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAzKS54ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueCA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDEpLnggKVxuICAgICAgICAgICAgICAgICAgICAgfHwgKCB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMykueSA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnkgPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAxKS55IClcbiAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUobGVuZ3RoIC0gMik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhpcyBlbGVtZW50ICh0byBhbGxvdyBjaGFpbmluZylcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgcGFyc2VGcm9tU3RyaW5nKHN0cmluZykge1xuICAgICAgICBsZXQgcG9pbnRTdHJpbmdzID0gc3RyaW5nLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBQb2x5bGluZVBvaW50cygpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgcG9pbnRTdHJpbmdzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgcG9pbnRzLmFwcGVuZChQb2x5bGluZVBvaW50LnBhcnNlRnJvbVN0cmluZyhwb2ludFN0cmluZ3NbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IHN0cmluZygpIHtcbiAgICAgICAgbGV0IHN0cmluZyA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIGlmKGkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJpbmcgKz0gdGhpcy5hcnJbaV0uc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgZm9yRWFjaChmdW5jKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5hcnIubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBmdW5jKHRoaXMuYXJyW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvbHlMaW5lIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcihwb2ludHMsIGNvbG9yLCBzdHJva2VXaWR0aCkge1xuICAgICAgICBzdXBlcihcInBvbHlsaW5lXCIpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBwb2ludHM6IHBvaW50cy5zdHJpbmcsXG4gICAgICAgICAgICBzdHJva2U6IGNvbG9yLFxuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICBcInN0cm9rZS13aWR0aFwiOiBzdHJva2VXaWR0aFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVQb2ludHMocG9pbnRzKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBwb2ludHM6IHBvaW50cy5zdHJpbmdcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGF0dGVybiBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IoaWQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoXCJwYXR0ZXJuXCIpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgcGF0dGVyblVuaXRzOiBcInVzZXJTcGFjZU9uVXNlXCIsXG4gICAgICAgICAgICB2aWV3Qm94OiBcIjAgMCBcIit3aWR0aCtcIiBcIitoZWlnaHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2hpbGQoZWwpIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGVsLiRlbCk7XG4gICAgICAgIHJldHVybiBlbDsgLy8gcHJvIGplZG5vZHVzc2kgXCJsZXQgcmVjdCA9IGcuYWRkQ2hpbGQobmV3IFJlY3RhbmdsZSguLi5cIlxuICAgIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gbG9naWMgZnVuY3Rpb25zIHVzZWQgaW4gdGhlIGdhdGUgZXZhbHVhdGlvblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naWMge1xuICAgIHN0YXRpYyBhbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMudGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgW1xuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9mZl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUudW5rbm93bl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgc3RhdGljIG5hbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMubm90KExvZ2ljLmFuZChhLCBiKSk7XG4gICAgfVxuICAgIHN0YXRpYyBub3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMubm90KExvZ2ljLm9yKGEsIGIpKTtcbiAgICB9XG4gICAgc3RhdGljIG5vdChhKSB7XG4gICAgICAgIGlmKGEgPT09IExvZ2ljLnN0YXRlLm9uKSB7XG4gICAgICAgICAgICByZXR1cm4gTG9naWMuc3RhdGUub2ZmO1xuICAgICAgICB9IGVsc2UgaWYgKGEgPT09IExvZ2ljLnN0YXRlLm9mZikge1xuICAgICAgICAgICAgcmV0dXJuIExvZ2ljLnN0YXRlLm9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIG9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLnRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIFtcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9uXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLnVua25vd25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ11cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHN0YXRpYyB4bm9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLm5vdChMb2dpYy54b3IoYSwgYikpO1xuICAgIH1cbiAgICBzdGF0aWMgeG9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLnRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIFtcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLnVua25vd25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ11cbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVua25vd246IDAsXG4gICAgICAgICAgICBvbjogMSxcbiAgICAgICAgICAgIG9mZjogMixcbiAgICAgICAgICAgIG9zY2lsbGF0aW5nOiAzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgcnVsZXMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgcnVsZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZigocnVsZXNbaV1bMF09PT1hICYmIHJ1bGVzW2ldWzFdPT09YikgfHwgKHJ1bGVzW2ldWzBdPT09YiAmJiBydWxlc1tpXVsxXT09PWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ1bGVzW2ldWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCAqIGFzIHN2Z09iaiBmcm9tICcuL3N2Z09iamVjdHMuanMnXG5pbXBvcnQgKiBhcyBTdHJ1Y3R1cmVzIGZyb20gJy4vc3RydWN0dXJlc0FuZENsYXNzZXMuanMnXG5pbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYy5qcydcblxuLy8gbWFwcGluZyBsb2dpY2FsIHN0YXRlcyB0byBjc3MgY2xhc3Nlc1xuY29uc3Qgc3RhdGVDbGFzc2VzID0ge1xuICAgIG9uOiBcInN0YXRlT25cIixcbiAgICBvZmY6IFwic3RhdGVPZmZcIixcbiAgICB1bmtub3duOiBcInN0YXRlVW5rbm93blwiLFxuICAgIG9zY2lsbGF0aW5nOiBcInN0YXRlT3NjaWxsYXRpbmdcIlxufTtcblxuLy8gaGVscGVyIGNsYXNzIHVzZWQgYnkgVHJhbnNmb3JtXG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3Ioc3RyaW5nKSB7XG4gICAgICAgIGlmKHN0cmluZyE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gc3RyaW5nLnJlcGxhY2UoL15bIF0qKFteKF0rKS4qLywgXCIkMVwiKTtcbiAgICAgICAgICAgIHRoaXMuYXJncyA9IHN0cmluZy5yZXBsYWNlKC9eW14oXStcXCgoLiopXFwpLywgXCIkMVwiKS5zcGxpdCgnICcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0QXJndW1lbnRzKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIihcIiArIHRoaXMuYXJncy5qb2luKFwiIFwiKSArIFwiKVwiO1xuICAgIH1cbn1cblxuLy8gdXNlZCB0byBtYW5pcHVsYXRlIHRoZSB0cmFuc2Zvcm0gYXJndW1lbnQgdXNlZCBpbiBTVkdcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZykge1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG5cbiAgICAgICAgaWYoc3RyaW5nIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgc3BsaXRJdGVtcyA9IHN0cmluZy5zcGxpdChcIilcIik7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHNwbGl0SXRlbXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYoc3BsaXRJdGVtc1tpXSkgeyAvLyBpZiBub3QgZW1wdHlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBQcm9wZXJ0eShzcGxpdEl0ZW1zW2ldICsgXCIpXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGluZGV4IG9yIC0xXG4gICAgZ2V0SW5kZXgobmFtZSkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKG5hbWUgPT09IHRoaXMuaXRlbXNbaV0ubmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGdldFRyYW5zbGF0ZSgpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLmdldEFyZ3VtZW50cyh0aGlzLmdldEluZGV4KFwidHJhbnNsYXRlXCIpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogYXJnc1swXSxcbiAgICAgICAgICAgIHk6IGFyZ3NbMV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJvdGF0ZSgpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLmdldEFyZ3VtZW50cyh0aGlzLmdldEluZGV4KFwicm90YXRlXCIpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVnOiBhcmdzWzBdLFxuICAgICAgICAgICAgY2VudHJlWDogYXJnc1sxXSxcbiAgICAgICAgICAgIGNlbnRyZVk6IGFyZ3NbMl1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldHMgdGhlIHRyYW5zbGF0aW9uXG4gICAgc2V0VHJhbnNsYXRlKHgsIHkpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoXCJ0cmFuc2xhdGVcIiwgW3gsIHldKTtcbiAgICB9XG5cbiAgICAvLyBzZXRzIHRoZSByb3RhdGlvblxuICAgIHNldFJvdGF0ZShkZWcsIGNlbnRyZVgsIGNlbnRyZVkpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoXCJyb3RhdGVcIiwgW2RlZywgY2VudHJlWCwgY2VudHJlWV0pO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGUgcm90YXRpb25cbiAgICByb3RhdGVSaWdodChjZW50cmVYLCBjZW50cmVZKSB7XG4gICAgICAgIGlmKHRoaXMuZ2V0SW5kZXgoXCJyb3RhdGVcIik9PT0tMSkge1xuICAgICAgICAgICAgdGhpcy5zZXRSb3RhdGUoOTAsIGNlbnRyZVgsIGNlbnRyZVkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5ld1JvdGF0aW9uID0gKHBhcnNlSW50KHRoaXMuZ2V0Um90YXRlKCkuZGVnKSArIDkwKSAlIDM2MDtcblxuICAgICAgICAgICAgaWYobmV3Um90YXRpb249PT0xODApIHtcbiAgICAgICAgICAgICAgICAvLyBzd2FwIGNlbnRyZSBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgIC8vIGJlY2F1c2Ugcm90YXRlKGMsIHgsIHkpIGlzIGRlZmluZWQgbGlrZSB0cmFuc2Zvcm0oLXgsIC15KSByb3RhdGUoYykgdHJhbnNmb3JtKHgsIHkpXG4gICAgICAgICAgICAgICAgbGV0IGEgPSBjZW50cmVYO1xuICAgICAgICAgICAgICAgIGNlbnRyZVggPSBjZW50cmVZO1xuICAgICAgICAgICAgICAgIGNlbnRyZVkgPSBhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFJvdGF0ZShcbiAgICAgICAgICAgICAgICBuZXdSb3RhdGlvbixcbiAgICAgICAgICAgICAgICBjZW50cmVYLFxuICAgICAgICAgICAgICAgIGNlbnRyZVlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRoZSB0cmFuc2Zvcm0gcHJvcGVydGllcyBjb25jYXRlbmF0ZWRcbiAgICBnZXQoKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZihpIT09MCkge1xuICAgICAgICAgICAgICAgIHJldFZhbCArPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldFZhbCArPSB0aGlzLml0ZW1zW2ldLmdldCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfVxuXG4gICAgZ2V0QXJndW1lbnRzKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW2luZGV4XS5hcmdzO1xuICAgIH1cblxuICAgIHNldFBhcmFtZXRlcihuYW1lLCBhcmdzKSB7XG4gICAgICAgIC8vIGRldGVybWluZSBpbmRleCBvZiB0aGUgcGFyYW1ldGVyIChpZiBzZXQpLCBlbHNlIGluZGV4ID09IC0xXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXgobmFtZSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGhhcyBiZWVuIGFscmVhZHkgc2V0LCBjaGFuZ2UgaXQgKHJld3JpdGUgdGhlIGFycmF5IGluIHRoZSByaWdodCBpbmRleClcbiAgICAgICAgLy8gZWxzZSBjcmVhdGUgYSBuZXcgb25lIChzZXQgaW5kZXggdG8gdGhlIGxlbmd0aCBvZiBhbiBhcnJheSAtLT4gYWQgYW4gaXRlbSB0byB0aGUgZW5kKVxuICAgICAgICBpZihpbmRleD09PS0xKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0gPSBuZXcgUHJvcGVydHkoKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLnNldE5hbWUobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzYXZlIGFyZ3MgdW5kZXIgdGhlIHJpZ2h0IGluZGV4XG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLnNldEFyZ3VtZW50cyhhcmdzKTtcbiAgICB9XG59XG5cbi8vIHBhcmVudCBjbGFzcyBmb3IgYWxsIG5ldHdvcmsgZWxlbWVudHNcbmNsYXNzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgaWYoIXBhcmVudFNWRykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlBhcmVudCBTVkcgZWxlbWVudCBoYXMgbm90IGJlZW4gZGVmaW5lZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG5cbiAgICAgICAgLy8gdXNlZCB0byBzdG9yZSB0aGUgc3ZqT2JqZWN0J3MgaW5zdGFuY2Ugb2YgdGhpcyBlbGVtZW50XG4gICAgICAgIHRoaXMuc3ZnT2JqID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG9uTW91c2VEb3duKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzLCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBsYXRlciBpbiB0aGUgQm94IGNsYXNzXG4gICAgfVxuXG4gICAgb25Nb3VzZVVwKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzLCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBsYXRlciBpbiB0aGUgQm94IGFuZCBDb25uZWN0b3IgY2xhc3Nlc1xuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzLCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBsYXRlciBpbiB0aGUgQm94IGNsYXNzXG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCInanNvbicgZ2V0dGVyIGhhcyBub3QgYmVlbiBkZWZpbmVkIGZvciB0aGlzIGVsZW1lbnRcIiwgdGhpcyk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuXG4vLyBwYXJlbnQgY2xhc3MgZm9yIGlucHV0IGFuZCBvdXRwdXQgY29ubmVjdG9ycyAodGhlIHRoaW5ncyB5b3UgY2xpY2sgb25cbi8vIHdoZW4geW91IHdhbnQgdG8gY29ubmVjdCBlbGVtZW50cylcbmNsYXNzIENvbm5lY3RvciBleHRlbmRzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApIHsgLy8gdW5pdCBvZiBsZWZ0IC8gdG9wIGlzIHRoZSBzaXplIG9mIHRoZSBncmlkXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRyk7XG5cbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xuICAgICAgICB0aGlzLmNvbm5lY3RvclNpemUgPSBncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JPZmZzZXQgPSB0aGlzLmNvbm5lY3RvclNpemUgLyAyO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoXG4gICAgICAgICAgICBsZWZ0ICogdGhpcy5ncmlkU2l6ZSAtIHRoaXMuY29ubmVjdG9yT2Zmc2V0LFxuICAgICAgICAgICAgdG9wICogdGhpcy5ncmlkU2l6ZSAtIHRoaXMuY29ubmVjdG9yT2Zmc2V0LFxuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTaXplLFxuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTaXplLFxuICAgICAgICAgICAgXCJub25lXCIsXG4gICAgICAgICAgICBcImJsYWNrXCJcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnN2Z09iai4kZWwuYWRkQ2xhc3MoXCJjb25uZWN0b3JcIik7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBmYWxzZTtcblxuICAgICAgICAvLyBpZiBhIHdpcmUgY2FuIHNldCBjb25uZWN0b3IncyBzdGF0ZVxuICAgICAgICB0aGlzLmlzSW5wdXRDb25uZWN0b3IgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IExvZ2ljLnN0YXRlLnVua25vd247XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcblxuICAgICAgICB0aGlzLndpcmVJZHMgPSBuZXcgU2V0KCk7XG4gICAgfVxuXG4gICAgYWRkV2lyZUlkKHdpcmVJZCkge1xuICAgICAgICB0aGlzLndpcmVJZHMuYWRkKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZUlkKHdpcmVJZCkge1xuICAgICAgICB0aGlzLndpcmVJZHMuZGVsZXRlKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlcyB0aGUgd2lyZSBhbmQgdXBkYXRlcyB0aGUgY29ubmVjdG9yXG4gICAgcmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVdpcmVJZCh3aXJlSWQpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlLCBwcm9wYWdhdGlvbklkKSB7XG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLnVua25vd246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vZmY6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9mZik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IHN0YXRlO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVBdHRyO1xuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqO1xuICAgIH1cblxuICAgIG9uTW91c2VVcCgpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcud2lyZUNyZWF0aW9uSGVscGVyKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dENvbm5lY3RvciBleHRlbmRzIENvbm5lY3RvciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG5cbiAgICAgICAgdGhpcy5pc0lucHV0Q29ubmVjdG9yID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSwgcHJvcGFnYXRpb25JZCkge1xuICAgICAgICAvLyBnZXQgbG9vcEd1YXJkIGluZm9cbiAgICAgICAgbGV0IGxvb3BHdWFyZCA9IHRoaXMucGFyZW50U1ZHLmxvb3BHdWFyZChwcm9wYWdhdGlvbklkLCB0aGlzLnN2Z09iai5pZCwgc3RhdGUpO1xuXG4gICAgICAgIHN1cGVyLnNldFN0YXRlKGxvb3BHdWFyZC5zdGF0ZSwgcHJvcGFnYXRpb25JZCk7XG5cbiAgICAgICAgaWYobG9vcEd1YXJkLnN0b3BQcm9wYWdhdGlvbj09PWZhbHNlKSB7XG4gICAgICAgICAgICAvLyBwcm9jZXNzIGlucHV0cyBpbiB0aGUgZ2F0ZSB0aGlzIGNvbm5lY3RvciBiZWxvbmdzIHRvXG4gICAgICAgICAgICBsZXQgZ2F0ZSA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQodGhpcy5zdmdPYmouaWQpO1xuICAgICAgICAgICAgZ2F0ZS5yZWZyZXNoU3RhdGUocHJvcGFnYXRpb25JZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKSB7XG4gICAgICAgIHN1cGVyLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24sIHRoaXMucGFyZW50U1ZHLmdldE5ld1Byb3BhZ2F0aW9uSWQoKSk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIuc3RhdGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0Q29ubmVjdG9yIGV4dGVuZHMgQ29ubmVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApIHtcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKTtcblxuICAgICAgICAvLyB1c2VkIHRvIHNldCB0aGUgd2lyZSBzdGF0ZSBkdXJpbmcgd2lyZSBpbml0aWFsaXphdGlvbiBiYXNlZCBvbiB0aGUgb3V0cHV0IGNvbm5lY3RvciBzdGF0ZVxuICAgICAgICB0aGlzLmlzT3V0cHV0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSwgcHJvcGFnYXRpb25JZCkge1xuICAgICAgICAvLyBnZXQgbG9vcEd1YXJkIGluZm9cbiAgICAgICAgbGV0IGxvb3BHdWFyZCA9IHRoaXMucGFyZW50U1ZHLmxvb3BHdWFyZChwcm9wYWdhdGlvbklkLCB0aGlzLnN2Z09iai5pZCwgc3RhdGUpO1xuXG4gICAgICAgIHN1cGVyLnNldFN0YXRlKGxvb3BHdWFyZC5zdGF0ZSwgcHJvcGFnYXRpb25JZCk7XG5cbiAgICAgICAgaWYobG9vcEd1YXJkLnN0b3BQcm9wYWdhdGlvbj09PWZhbHNlKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHN0YXRlIG9mIGEgd2lyZSB0aGlzIGNvbm5lY3RvciBpcyBjb25uZWN0ZWQgdG8gKGlmIGNvbm5lY3RlZClcbiAgICAgICAgICAgIHRoaXMud2lyZUlkcy5mb3JFYWNoKCh3aXJlSWQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5nZXRXaXJlQnlJZCh3aXJlSWQpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRTdGF0ZShzdGF0ZSwgcHJvcGFnYXRpb25JZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXRlO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBnYXRlcyBhbmQgaW5wdXQgYW5kIG91dHB1dCBib3hlc1xuY2xhc3MgQm94IGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSwgY2F0ZWdvcnksIGdyaWRXaWR0aCwgZ3JpZEhlaWdodCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IHRoaXMucGFyZW50U1ZHLmdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMudXJsID0gXCJpbWcvXCIgKyB0aGlzLmNhdGVnb3J5ICsgXCIvXCIgKyB0aGlzLm5hbWUgKyBcIi5zdmdcIjtcblxuICAgICAgICB0aGlzLmlucHV0cyA9IFtdO1xuICAgICAgICB0aGlzLm91dHB1dHMgPSBbXTtcblxuICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouR3JvdXAoKTtcblxuICAgICAgICB0aGlzLndpZHRoID0gZ3JpZFdpZHRoICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBncmlkSGVpZ2h0ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmdyaWRXaWR0aCA9IGdyaWRXaWR0aDtcbiAgICAgICAgdGhpcy5ncmlkSGVpZ2h0ID0gZ3JpZEhlaWdodDtcblxuICAgICAgICAvLyB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICAgICAgICBsZXQgcmVjdGFuZ2xlID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIFwibm9uZVwiLCBcIm5vbmVcIik7XG4gICAgICAgIHJlY3RhbmdsZS4kZWwuYWRkQ2xhc3MoJ3JlY3QnKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQocmVjdGFuZ2xlKTtcbiAgICAgICAgLy8gaW1hZ2Ugb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBzdmdPYmouU3ZnSW1hZ2UoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMudXJsKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICAgICAgLy8gYWRkIGRyYWdnYWJpbGl0eSBhbmQgcm90YXRhYmlsaXR5XG4gICAgICAgIHRoaXMuc3ZnT2JqLmRyYWdnYWJsZSh0cnVlKTtcbiAgICAgICAgdGhpcy5zdmdPYmoucm90YXRhYmxlKHRydWUpO1xuXG4gICAgICAgIC8vIGFkZCB0eXBlPVwiZ2F0ZVwiLCB1c2VkIGluIHNwZWNpYWwgY2FsbGJhY2tzIGluIGNvbnRleHRtZW51XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHlwZVwiOiBjYXRlZ29yeX0pO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcImJveFwiKTtcbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKGNhdGVnb3J5KTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2RlcygpO1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgaWQ6IHRoaXMuc3ZnT2JqLmlkLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuZ2V0VHJhbnNmb3JtKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMobWFyZ2luVG9wID0gMCwgbWFyZ2luUmlnaHQgPSAwLCBtYXJnaW5Cb3R0b20gPSAwLCBtYXJnaW5MZWZ0ID0gMCwgLi4uc3BlY2lhbE5vZGVzKSB7XG4gICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IobGV0IHggPSBtYXJnaW5MZWZ0IDsgeCA8PSB0aGlzLmdyaWRXaWR0aCAtIG1hcmdpblJpZ2h0IDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IHkgPSBtYXJnaW5Ub3AgOyB5IDw9IHRoaXMuZ3JpZEhlaWdodCAtIG1hcmdpbkJvdHRvbSA7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2Ygc3BlY2lhbE5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5hZGQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uLCByZWRlZmluZWQgaW4gaW5oZXJpdGVkIGVsZW1lbnRzXG4gICAgICAgIC8vIHJlZnJlc2hTdGF0ZSB0YWtlcyBpbnB1dCBjb25uZWN0b3IgdmFsdWVzIGFuZCBzZXRzIG91dHB1dCB2YWx1ZXMgYWNjb3JkaW5nbHlcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ2FsbGluZyB0aGUgdmlydHVhbCBmdW5jdGlvbiByZWZyZXNoU3RhdGUgaGFzIG5vIGVmZmVjdC5cIik7XG4gICAgfVxuXG4gICAgLy8gdXNhZ2U6IGNoYW5nZUltYWdlKFwiYWJjXCIpIGNoYW5nZXMgaW1hZ2UgdXJsIHRvIGltYWdlLWFiYy5zdmdcbiAgICAvLyAgICAgICAgY2hhbmdlSW1hZ2UoKSBjaGFuZ2VzIGltYWdlIHVybCB0byB0aGUgZGVmYXVsdCBvbmUgKGltYWdlLnN2ZylcbiAgICBjaGFuZ2VJbWFnZShzdWZmaXgpIHtcbiAgICAgICAgaWYoc3VmZml4ID09PSB1bmRlZmluZWQgfHwgc3VmZml4ID09PSBcIlwiKSB7XG4gICAgICAgICAgICBzdWZmaXggPSBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VmZml4ID0gXCItXCIgKyBzdWZmaXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cmwgPSBcImltZy9cIiArIHRoaXMuY2F0ZWdvcnkgKyBcIi9cIiArIHRoaXMubmFtZSArIHN1ZmZpeCArIFwiLnN2Z1wiO1xuXG4gICAgICAgIHRoaXMuaW1hZ2UuY2hhbmdlVXJsKHRoaXMudXJsKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGEgalF1ZXJ5IG9iamVjdFxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqLmdldCgpO1xuICAgIH1cblxuICAgIHJlbW92ZUJsb2NrZWROb2RlKHgsIHkpIHtcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuYmxvY2tlZE5vZGVzKSB7XG4gICAgICAgICAgICBpZihpdGVtLng9PT14ICYmIGl0ZW0ueT09PXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5kZWxldGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByb3RhdGVCbG9ja2VkTm9kZXNSaWdodCgpIHtcbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbj09PXVuZGVmaW5lZCB8fCB0aGlzLnJvdGF0aW9uPT09NCkge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3RhdGlvbisrO1xuXG4gICAgICAgIGlmKHRoaXMucm90YXRpb24gPT09IDEgfHwgdGhpcy5yb3RhdGlvbiA9PT0gMykge1xuICAgICAgICAgICAgbGV0IG5ld0Jsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBuZXdCbG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5hYnMoaXRlbS55IC0gdGhpcy5ncmlkSGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgeTogaXRlbS54XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3QmxvY2tlZE5vZGVzO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5yb3RhdGlvbiA9PT0gMiB8fCB0aGlzLnJvdGF0aW9uID09PSA0KSB7XG4gICAgICAgICAgICBsZXQgbmV3QmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0Jsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmFicyhpdGVtLnkgLSB0aGlzLmdyaWRXaWR0aCksXG4gICAgICAgICAgICAgICAgICAgIHk6IGl0ZW0ueFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2RlcyA9IG5ld0Jsb2NrZWROb2RlcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZHMgYW4gaW5wdXQgY29ubmVjdG9yXG4gICAgYWRkSW5wdXQobGVmdCwgdG9wKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuaW5wdXRzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5pbnB1dHNbaW5kZXhdID0gbmV3IElucHV0Q29ubmVjdG9yKHRoaXMucGFyZW50U1ZHLCB0aGlzLmdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuICAgICAgICB0aGlzLmlucHV0c1tpbmRleF0uc3ZnT2JqLmFkZEF0dHIoe2dhdGVpZDogdGhpcy5zdmdPYmouaWR9KTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQodGhpcy5pbnB1dHNbaW5kZXhdLmdldCgpKTtcblxuICAgICAgICB0aGlzLnJlbW92ZUJsb2NrZWROb2RlKGxlZnQsIHRvcCk7XG4gICAgfVxuXG4gICAgLy8gYWRkcyBhbiBvdXRwdXQgY29ubmVjdG9yXG4gICAgYWRkT3V0cHV0KGxlZnQsIHRvcCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm91dHB1dHMubGVuZ3RoO1xuICAgICAgICB0aGlzLm91dHB1dHNbaW5kZXhdID0gbmV3IE91dHB1dENvbm5lY3Rvcih0aGlzLnBhcmVudFNWRywgdGhpcy5ncmlkU2l6ZSwgbGVmdCwgdG9wKTtcbiAgICAgICAgdGhpcy5vdXRwdXRzW2luZGV4XS5zdmdPYmouYWRkQXR0cih7Z2F0ZWlkOiB0aGlzLnN2Z09iai5pZH0pO1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRDaGlsZCh0aGlzLm91dHB1dHNbaW5kZXhdLmdldCgpKTtcblxuICAgICAgICB0aGlzLnJlbW92ZUJsb2NrZWROb2RlKGxlZnQsIHRvcCk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0aGUgY29ubmVjdG9yIG9iamVjdCBiYXNlZCBvbiBpdHMgaWRcbiAgICBnZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5pbnB1dHMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmlucHV0c1tpXS5zdmdPYmouaWQ9PT1jb25uZWN0b3JJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5vdXRwdXRzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5vdXRwdXRzW2ldLnN2Z09iai5pZD09PWNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybTtcbiAgICAgICAgaWYgKCF0aGlzLnN2Z09iai4kZWwuYXR0cihcInRyYW5zZm9ybVwiKSkge1xuICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnQgZG9lcyBub3QgaGF2ZSBhIFwidHJhbnNmb3JtXCIgcHJvcGVydHkgLS0+IGNyZWF0ZSBpdFxuICAgICAgICAgICAgdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZSgwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhlIGVsZW1lbnQgZG9lcyBoYXZlIGEgXCJ0cmFuc2Zvcm1cIiBwcm9wZXJ0eSAtLT4gY2hhbmdlIGl0XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHRoaXMuc3ZnT2JqLiRlbC5hdHRyKFwidHJhbnNmb3JtXCIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtO1xuICAgIH1cblxuICAgIHNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tb3VzZUxlZnQgPSBmYWxzZTtcbiAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZURvd25MZWZ0KGV2ZW50KTtcblxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgRE9NIGVsZW1lbnQgdG8gZnJvbnRcbiAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLm1vdmVUb0Zyb250QnlJZCh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bkxlZnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tb3VzZU1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG5cbiAgICAgICAgLy8gc2F2ZSB0aGUgY3VycmVudCBpdGVtIHBvc2l0aW9uIGludG8gYSB2YXJpYWJsZVxuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gdHJhbnNmb3JtLmdldFRyYW5zbGF0ZSgpO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBtb3VzZSBvZmZzZXQgZnJvbSB0aGUgb2JqZWN0IG9yaWdpblxuICAgICAgICB0aGlzLm9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYIC0gY3VycmVudFBvc2l0aW9uLngsXG4gICAgICAgICAgICB5OiBldmVudC5wYWdlWSAtIGN1cnJlbnRQb3NpdGlvbi55XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy5tb3VzZUxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGxldCBsZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLm9mZnNldC54O1xuICAgICAgICAgICAgbGV0IHRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5vZmZzZXQueTtcblxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG4gICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2lyZXModHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubW91c2VNb3ZlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Ecm9wKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IDIgKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tNaWRkbGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcChldmVudCkge1xuICAgICAgICBsZXQgbGVmdCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5vZmZzZXQueDtcbiAgICAgICAgbGV0IHRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5vZmZzZXQueTtcblxuICAgICAgICBsZWZ0ID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZChsZWZ0KTtcbiAgICAgICAgdG9wID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0b3ApO1xuXG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKCk7XG4gICAgfVxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24sIHdpbGwgYmUgcmVkZWZpbmVkIGluIElucHV0Qm94XG4gICAgfVxuXG4gICAgb25DbGlja01pZGRsZSgpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG5cbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLnN2Z09iai4kZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgbGV0IGNlbnRyZVggPSBNYXRoLnJvdW5kKHJlY3Qud2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGNlbnRyZVkgPSBNYXRoLnJvdW5kKHJlY3QuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgY2VudHJlWCAtPSBjZW50cmVYICUgdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgY2VudHJlWSAtPSBjZW50cmVZICUgdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICB0cmFuc2Zvcm0ucm90YXRlUmlnaHQoXG4gICAgICAgICAgICBjZW50cmVYLFxuICAgICAgICAgICAgY2VudHJlWVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuXG4gICAgICAgIHRoaXMucm90YXRlQmxvY2tlZE5vZGVzUmlnaHQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlcyBhbGwgd2lyZXMgY29ubmVjdGVkIHRvIHRoaXMgYm94XG4gICAgdXBkYXRlV2lyZXModGVtcG9yYXJ5ID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGNvbm5lY3RvcnMgPSB0aGlzLmlucHV0cy5jb25jYXQodGhpcy5vdXRwdXRzKTtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBjb25uZWN0b3JzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgY29ubmVjdG9yc1tpXS53aXJlSWRzLmZvckVhY2goKHdpcmVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB3aXJlID0gdGhpcy5wYXJlbnRTVkcuZ2V0V2lyZUJ5SWQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBpZih0ZW1wb3JhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS50ZW1wb3JhcnlXaXJlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS5yb3V0ZVdpcmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGlzT24gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDc7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBcImlucHV0XCIsIFwiaW9cIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5hZGRPdXRwdXQod2lkdGgsIGhlaWdodCAvIDIpO1xuXG4gICAgICAgIHRoaXMub3V0cHV0c1swXS5zZXRTdGF0ZShMb2dpYy5zdGF0ZS5vZmYsIHRoaXMucGFyZW50U1ZHLmdldE5ld1Byb3BhZ2F0aW9uSWQoKSk7XG4gICAgICAgIHRoaXMuaXNPbiA9IGlzT247XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGxldCBkYXRhID0gc3VwZXIuZXhwb3J0RGF0YTtcbiAgICAgICAgZGF0YS5pc09uID0gdGhpcy5pc09uO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAxLCAxLCAwKTtcbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIGNhbGwgdGhlIG9uIHNldHRlciBhZ2FpbiAodG8gcmVmcmVzaCB0aGUgc3RhdGUgb2YgdGhlIGNvbm5lY3RlZCB3aXJlcylcbiAgICAgICAgbGV0IHQgPSB0aGlzLm91dHB1dHNbMF0uc3RhdGU7XG4gICAgICAgIHRoaXMub3V0cHV0c1swXS5zZXRTdGF0ZSh0LCB0aGlzLnBhcmVudFNWRy5nZXROZXdQcm9wYWdhdGlvbklkKCkpO1xuICAgIH1cblxuICAgIHNldCBvbihpc09uKSB7XG4gICAgICAgIGxldCBuZXdQcm9wSWQgPSB0aGlzLnBhcmVudFNWRy5nZXROZXdQcm9wYWdhdGlvbklkKCk7XG4gICAgICAgIGlmIChpc09uKSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9uXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib25cIik7XG4gICAgICAgICAgICB0aGlzLm91dHB1dHNbMF0uc2V0U3RhdGUoTG9naWMuc3RhdGUub24sIG5ld1Byb3BJZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9mZlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5vdXRwdXRzWzBdLnNldFN0YXRlKExvZ2ljLnN0YXRlLm9mZiwgbmV3UHJvcElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNPbiA9IGlzT247XG4gICAgfVxuXG4gICAgZ2V0IG9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc09uO1xuICAgIH1cblxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMub24gPSAhdGhpcy5vbjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRCb3ggZXh0ZW5kcyBCb3gge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA0O1xuICAgICAgICBjb25zdCB3aWR0aCA9IDU7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBcIm91dHB1dFwiLCBcImlvXCIsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuYWRkSW5wdXQoMCwgaGVpZ2h0IC8gMilcbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbnB1dHNbMF0uc3RhdGUpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub246XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9uXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vZmY6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9mZlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvc2NcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAwLCAwLCAxKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYXRlIGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIG5hbWUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA5O1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA0O1xuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgbmFtZSwgXCJnYXRlXCIsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIGlmKHRoaXMubmFtZT09PVwibm90XCIpIHtcbiAgICAgICAgICAgIC8vIGlucHV0XG4gICAgICAgICAgICB0aGlzLmFkZElucHV0KDAsIGhlaWdodCAvIDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaW5wdXRcbiAgICAgICAgICAgIHRoaXMuYWRkSW5wdXQoMCwgaGVpZ2h0IC8gNCk7XG4gICAgICAgICAgICB0aGlzLmFkZElucHV0KDAsIGhlaWdodCAvICg0LzMpKTtcblxuICAgICAgICAgICAgLy8gYWRkIG9uZSBibG9ja2VkTm9kZSBiZXR3ZWVuIHRoZSBpbnB1dHMgKGZvciBiZXR0ZXIgbG9va2luZyB3aXJpbmcpXG4gICAgICAgICAgICAvLyBhbmQgcmVnZW5lcmF0ZSBibG9ja2VkIG5vZGVzXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2Rlcyh7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiBoZWlnaHQgLyAyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdXRwdXRcbiAgICAgICAgdGhpcy5hZGRPdXRwdXQod2lkdGgsIGhlaWdodCAvIDIpO1xuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXRlKHRoaXMucGFyZW50U1ZHLmdldE5ld1Byb3BhZ2F0aW9uSWQoKSk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKHNwZWNpYWxOb2RlKSB7XG4gICAgICAgIGlmKHNwZWNpYWxOb2RlIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdXBlci5nZW5lcmF0ZUJsb2NrTm9kZXMoMCwgMSwgMCwgMSwgc3BlY2lhbE5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDAsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKHByb3BhZ2F0aW9uSWQpIHtcbiAgICAgICAgaWYocHJvcGFnYXRpb25JZD09PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncmVmcmVzaFN0YXRlIGVycm9yOiBwcm9wYWdhdGlvbklkIGNhbm5vdCBiZSB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRzWzBdLnNldFN0YXRlKExvZ2ljLmFuZCh0aGlzLmlucHV0c1swXS5zdGF0ZSwgdGhpcy5pbnB1dHNbMV0uc3RhdGUpLCBwcm9wYWdhdGlvbklkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJuYW5kXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRzWzBdLnNldFN0YXRlKExvZ2ljLm5hbmQodGhpcy5pbnB1dHNbMF0uc3RhdGUsIHRoaXMuaW5wdXRzWzFdLnN0YXRlKSwgcHJvcGFnYXRpb25JZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibm9yXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRzWzBdLnNldFN0YXRlKExvZ2ljLm5vcih0aGlzLmlucHV0c1swXS5zdGF0ZSwgdGhpcy5pbnB1dHNbMV0uc3RhdGUpLCBwcm9wYWdhdGlvbklkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm91dHB1dHNbMF0uc2V0U3RhdGUoTG9naWMubm90KHRoaXMuaW5wdXRzWzBdLnN0YXRlKSwgcHJvcGFnYXRpb25JZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm91dHB1dHNbMF0uc2V0U3RhdGUoTG9naWMub3IodGhpcy5pbnB1dHNbMF0uc3RhdGUsIHRoaXMuaW5wdXRzWzFdLnN0YXRlKSwgcHJvcGFnYXRpb25JZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG5vclwiOlxuICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0c1swXS5zZXRTdGF0ZShMb2dpYy54bm9yKHRoaXMuaW5wdXRzWzBdLnN0YXRlLCB0aGlzLmlucHV0c1sxXS5zdGF0ZSksIHByb3BhZ2F0aW9uSWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0c1swXS5zZXRTdGF0ZShMb2dpYy54b3IodGhpcy5pbnB1dHNbMF0uc3RhdGUsIHRoaXMuaW5wdXRzWzFdLnN0YXRlKSwgcHJvcGFnYXRpb25JZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXaXJlIGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZnJvbUlkLCB0b0lkLCBncmlkU2l6ZSkge1xuICAgICAgICAvLyBzbWFsbCB0b2RvOiByZXdvcmsgc3RhcnQuLi4gZW5kLi4uIHRvIGFycmF5cz8gKG5vdCBpbXBvcnRhbnQpXG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHKTtcblxuICAgICAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XG5cbiAgICAgICAgdGhpcy5mcm9tSWQgPSBmcm9tSWQ7XG4gICAgICAgIHRoaXMudG9JZCA9IHRvSWQ7XG5cbiAgICAgICAgdGhpcy5zdGFydEJveCA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQoZnJvbUlkKTtcbiAgICAgICAgdGhpcy5lbmRCb3ggPSB0aGlzLnBhcmVudFNWRy5nZXRCb3hCeUNvbm5lY3RvcklkKHRvSWQpO1xuXG4gICAgICAgIHRoaXMuc3RhcnRDb25uZWN0b3IgPSB0aGlzLnBhcmVudFNWRy5nZXRDb25uZWN0b3JCeUlkKGZyb21JZCk7XG4gICAgICAgIHRoaXMuZW5kQ29ubmVjdG9yID0gdGhpcy5wYXJlbnRTVkcuZ2V0Q29ubmVjdG9yQnlJZCh0b0lkKTtcblxuICAgICAgICB0aGlzLnJvdXRlV2lyZSgpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gTG9naWMuc3RhdGUudW5rbm93bjtcblxuICAgICAgICAvLyBjYW5ub3QgY2FsbCB1cGRhdGVXaXJlU3RhdGUgdW50aWwgV2lyZSBpcyBpbml0aWFsaXplZCxcbiAgICAgICAgLy8gc28gdGhlIGluaXRpYWwgc3RhdGUgaGFzIHRvIGJlIHNldCBtYW51YWxseSBhbmQgbm90IGJ5IGNhbGxpbmcgLm9uIHNldHRlcnMgb24gdGhlIGNvbm5lY3RvcnNcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRDb25uZWN0b3IuaXNPdXRwdXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGFydENvbm5lY3Rvci5zdGF0ZSwgdGhpcy5wYXJlbnRTVkcuZ2V0TmV3UHJvcGFnYXRpb25JZCgpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVuZENvbm5lY3Rvci5pc091dHB1dCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmVuZENvbm5lY3Rvci5zdGF0ZSwgdGhpcy5wYXJlbnRTVkcuZ2V0TmV3UHJvcGFnYXRpb25JZCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcIndpcmVcIik7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcm9tSWQ6IHRoaXMuZnJvbUlkLFxuICAgICAgICAgICAgdG9JZDogdGhpcy50b0lkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUsIHByb3BhZ2F0aW9uSWQpIHtcbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9uOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub2ZmKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0Q29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUsIHByb3BhZ2F0aW9uSWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZW5kQ29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kQ29ubmVjdG9yLnNldFN0YXRlKHN0YXRlLCBwcm9wYWdhdGlvbklkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUF0dHI7XG4gICAgfVxuXG4gICAgdXBkYXRlV2lyZVN0YXRlKCkge1xuICAgICAgICB0aGlzLnN0YXJ0Qm94LnJlZnJlc2hTdGF0ZSh0aGlzLnBhcmVudFNWRy5nZXROZXdQcm9wYWdhdGlvbklkKCkpO1xuICAgICAgICB0aGlzLmVuZEJveC5yZWZyZXNoU3RhdGUodGhpcy5wYXJlbnRTVkcuZ2V0TmV3UHJvcGFnYXRpb25JZCgpKTtcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iai5nZXQoKTtcbiAgICB9XG5cbiAgICBnZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCkge1xuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpO1xuICAgICAgICBwb2ludHMuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLndpcmVTdGFydC54LCB0aGlzLndpcmVTdGFydC55KSk7XG4gICAgICAgIHBvaW50cy5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMud2lyZUVuZC54LCB0aGlzLndpcmVFbmQueSkpO1xuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIHRlbXBvcmFyeVdpcmUoKSB7XG4gICAgICAgIHRoaXMud2lyZVN0YXJ0ID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLnN0YXJ0Q29ubmVjdG9yLCBmYWxzZSk7XG4gICAgICAgIHRoaXMud2lyZUVuZCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5lbmRDb25uZWN0b3IsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLnNldFdpcmVQYXRoKHRoaXMuZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cygpKTtcblxuICAgICAgICAvLyB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgIC8vIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICB9XG5cbiAgICByb3V0ZVdpcmUoc25hcFRvR3JpZCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy53aXJlU3RhcnQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuc3RhcnRDb25uZWN0b3IsIHNuYXBUb0dyaWQpO1xuICAgICAgICB0aGlzLndpcmVFbmQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuZW5kQ29ubmVjdG9yLCBzbmFwVG9HcmlkKTtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IHRoaXMuYVN0YXIoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlU3RhcnQueCAvIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgeTogdGhpcy53aXJlU3RhcnQueSAvIHRoaXMuZ3JpZFNpemVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlRW5kLnggLyB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMud2lyZUVuZC55IC8gdGhpcy5ncmlkU2l6ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRXaXJlUGF0aCh0aGlzLnBvaW50cyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVXaXJlU3RhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRXaXJlUGF0aChwb2ludHMpIHtcbiAgICAgICAgLy8gc2V0IHRoZSBsaW5lXG4gICAgICAgIGlmKHRoaXMuc3ZnT2JqIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN2Z09iai51cGRhdGVQb2ludHMocG9pbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqID0gbmV3IHN2Z09iai5Qb2x5TGluZShwb2ludHMsIFwiIzhiOGI4YlwiLCAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1xuICAgICAgICAgICAgZnJvbUlkOiB0aGlzLmZyb21JZCxcbiAgICAgICAgICAgIHRvSWQ6IHRoaXMudG9JZFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLy8gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gdGhpcyBwc2V1ZG9jb2RlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BKl9zZWFyY2hfYWxnb3JpdGhtI1BzZXVkb2NvZGVcbiAgICBhU3RhcihzdGFydCwgZW5kKSB7XG4gICAgICAgIC8vIG51bWJlciBvZiBub2RlcywgdGhhdCBjYW4gYmUgb3BlbmVkIGF0IG9uY2VcbiAgICAgICAgLy8gb25jZSBpcyB0aGlzIGxpbWl0IGV4Y2VlZGVkLCBhU3RhciB3aWxsIGZhaWwgYW5kIGdldFRlbXBvcmFyeVdpcmVQb2ludHMgd2lsbCBiZSB1c2VkIGluc3RlYWRcbiAgICAgICAgY29uc3QgbWF4Tm9kZUxpbWl0ID0gNTAwMDA7XG5cbiAgICAgICAgbGV0IGNsb3NlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBsZXQgb3Blbk5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBvcGVuTm9kZXMuYWRkKHN0YXJ0KTtcblxuICAgICAgICBsZXQgY2FtZUZyb20gPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB2YWx1ZTogaW5maW5pdHlcbiAgICAgICAgbGV0IGdTY29yZSA9IG5ldyBTdHJ1Y3R1cmVzLk1hcFdpdGhEZWZhdWx0VmFsdWUoSW5maW5pdHkpO1xuICAgICAgICBnU2NvcmUuc2V0KHN0YXJ0LCAwKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHZhbHVlOiBpbmZpbml0eVxuICAgICAgICBsZXQgZlNjb3JlID0gbmV3IFN0cnVjdHVyZXMuTWFwV2l0aERlZmF1bHRWYWx1ZShJbmZpbml0eSk7XG4gICAgICAgIGZTY29yZS5zZXQoc3RhcnQsIFdpcmUubWFuaGF0dGFuRGlzdGFuY2Uoc3RhcnQsIGVuZCkpO1xuXG4gICAgICAgIGxldCBub25Sb3V0YWJsZSA9IHRoaXMucGFyZW50U1ZHLmdldE5vblJvdXRhYmxlTm9kZXMoKTtcbiAgICAgICAgbGV0IHB1bmlzaGVkQnV0Um91dGFibGU7XG4gICAgICAgIGlmKHRoaXMuc3ZnT2JqPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwdW5pc2hlZEJ1dFJvdXRhYmxlID0gdGhpcy5wYXJlbnRTVkcuZ2V0SW5jb252ZW5pZW50Tm9kZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB1bmlzaGVkQnV0Um91dGFibGUgPSB0aGlzLnBhcmVudFNWRy5nZXRJbmNvbnZlbmllbnROb2Rlcyh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAob3Blbk5vZGVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGU7XG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGVGU2NvcmU7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHZhbHVlIGZyb20gb3Blbk5vZGVzIHRoYXQgaGFzIHRoZSBsb3dlc3QgZlNjb3JlXG4gICAgICAgICAgICAvLyAoY2FuIGJlIGltcGxlbWVudGVkIGVmZmVjdGl2ZWx5IHVzaW5nIG1pbi1oZWFwIGRhdGEgc3RydWN0dXJlIChtYXliZSB0b2RvIHNvbWV0aW1lKT8pXG4gICAgICAgICAgICBvcGVuTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFjdXJyZW50Tm9kZSB8fCBmU2NvcmUuZ2V0KG5vZGUpIDwgY3VycmVudE5vZGVGU2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUZTY29yZSA9IGZTY29yZS5nZXQoY3VycmVudE5vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKHN2Z09iai5Qb2x5bGluZVBvaW50LmVxdWFscyhjdXJyZW50Tm9kZSwgZW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY29uc3RydWN0UGF0aChjYW1lRnJvbSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcGVuTm9kZXMuZGVsZXRlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIGNsb3NlZE5vZGVzLmFkZChjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAgIC8vIHRoZSBmYXJ0aGVzdCBwb2ludHMgYWNjZXNzaWJsZSB3aXRob3V0IGF2b2lkaW5nIG9ic3RhY2xlcyBpbiBldmVyeSBkaXJlY3Rpb25cbiAgICAgICAgICAgIC8vIChidXQgbWF4IDUwIGluIGVhY2ggZGlyZWN0aW9uKVxuICAgICAgICAgICAgZm9yKGxldCBkaXJlY3Rpb24gPSAwIDsgZGlyZWN0aW9uIDwgNCA7IGRpcmVjdGlvbisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvaW50ID0gV2lyZS5tb3ZlUG9pbnQoY3VycmVudE5vZGUsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCA1MCA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXdQb2ludCBpcyBpbiB0aGUgc2V0IG9mIG5vbiByb3V0YWJsZSBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGFkZCBpdCBhbmQgc3RvcCBwcm9jZWVkaW5nIGluIHRoaXMgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KG5vblJvdXRhYmxlLCB0aGlzLnNjYWxlUG9pbnRUb0dyaWQobmV3UG9pbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBza2lwIHRoaXMgbm9kZSwgaWYgaXQgaGFzIGJlZW4gYWxyZWFkeSBjbG9zZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gb3IgaWYgaXQgaXMgb24gdGhlIGxpc3Qgb2Ygbm9uIHJvdXRhYmxlIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZWROb2Rlcy5oYXMobmV3UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3Blbk5vZGVzLmhhcyhuZXdQb2ludCkueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3Blbk5vZGVzLmFkZChuZXdQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgcG9zc2libGUgR1Njb3JlIGJ5IGFkZGluZyAxIHRvIHRoZSBzY29yZSBvZiB0aGUgbm9kZSB3ZSBjYW1lIGZyb21cbiAgICAgICAgICAgICAgICAgICAgLy8gKHdlIHByaW9yaXRpemUgdG8gbWluaW1pemUgdGhlIG51bWJlciBvZiBub2RlcyBhbmQgbm90IHRoZSBkaXN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gIHNvIHdlIGFyZSBhZGRpbmcgMSBvbiBhbGwgbm9kZXMsIGV2ZW4gaWYgdGhlIGV1Y2xpZGVhbiAvIG1hbm5oYXRhbiBkaXN0YW5jZSBtYXkgdmFyeSlcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluY3JlbWVudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkhPT0wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NzaWJsZUdTY29yZSA9IGdTY29yZS5nZXQoY3VycmVudE5vZGUpICsgaW5jcmVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KHB1bmlzaGVkQnV0Um91dGFibGUsIHRoaXMuc2NhbGVQb2ludFRvR3JpZChuZXdQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbm9kZSBpcyBpbiB0aGUgc2V0IG9mIHB1bmlzaGVkIG5vZGUsIHB1bmlzaCBpdCBieSBhZGRpbmcgdG8gdGhlIEdTY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVHU2NvcmUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZUdTY29yZSA+PSBnU2NvcmUuZ2V0KG5ld1BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYW1lRnJvbS5zZXQobmV3UG9pbnQsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgZ1Njb3JlLnNldChuZXdQb2ludCwgcG9zc2libGVHU2NvcmUpO1xuICAgICAgICAgICAgICAgICAgICBmU2NvcmUuc2V0KG5ld1BvaW50LCBwb3NzaWJsZUdTY29yZSArIFdpcmUubWFuaGF0dGFuRGlzdGFuY2UobmV3UG9pbnQsIGVuZCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5ld1BvaW50IGlzIGluIHRoZSBzZXQgb2YgcHVuaXNoZWQgYnV0IHJvdXRhYmxlIHBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGl0IGJ1dCBzdG9wIHByb2NlZWRpbmcgaW4gdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoV2lyZS5zZXRIYXNUaGlzUG9pbnQocHVuaXNoZWRCdXRSb3V0YWJsZSwgdGhpcy5zY2FsZVBvaW50VG9HcmlkKG5ld1BvaW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSB0byB0aGUgbmV4dCBwb2ludCBpbiB0aGUgZGlyZWNpdG9uXG4gICAgICAgICAgICAgICAgICAgIG5ld1BvaW50ID0gV2lyZS5tb3ZlUG9pbnQobmV3UG9pbnQsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihvcGVuTm9kZXMuc2l6ZSA+IG1heE5vZGVMaW1pdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHdlIGdvdCBoZXJlLCB0aGUgcGF0aCBkb2VzIG5vdCBleGlzdCAtPiBsZXQncyB1c2UgdGVtcG9yYXJ5IHBhdGggaWdub3JpbmcgYWxsIGNvbGlzaW9uc1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCk7XG4gICAgfVxuICAgIHN0YXRpYyBtb3ZlUG9pbnQocG9pbnQsIGRpcmVjdGlvbikge1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAwOiAvLyB1cFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgLSAxXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgMTogLy8gcmlnaHRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDI6IC8vIGRvd25cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55ICsgMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDM6IC8vIGxlZnRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2NhbGVQb2ludFRvR3JpZChwb2ludCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcG9pbnQueCAqIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICB5OiBwb2ludC55ICogdGhpcy5ncmlkU2l6ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjb25zdHJ1Y3RQYXRoKGNhbWVGcm9tLCBjdXJyZW50Tm9kZSkge1xuICAgICAgICBsZXQgdG90YWxQYXRoID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpO1xuICAgICAgICB0b3RhbFBhdGguYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludChjdXJyZW50Tm9kZS54ICogdGhpcy5ncmlkU2l6ZSwgY3VycmVudE5vZGUueSAqIHRoaXMuZ3JpZFNpemUpKTtcblxuICAgICAgICB3aGlsZSAoY2FtZUZyb20uaGFzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjYW1lRnJvbS5nZXQoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgdG90YWxQYXRoLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoY3VycmVudE5vZGUueCAqIHRoaXMuZ3JpZFNpemUsIGN1cnJlbnROb2RlLnkgKiB0aGlzLmdyaWRTaXplKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG90YWxQYXRoO1xuICAgIH1cblxuICAgIHN0YXRpYyBtYW5oYXR0YW5EaXN0YW5jZShhLCBiKSB7XG4gICAgICAgIC8vIE1hbmhhdHRhbiBnZW9tZXRyeVxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoYS54IC0gYi54KSArIE1hdGguYWJzKGEueSAtIGIueSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEhhc1RoaXNQb2ludChzZXQsIHBvaW50KSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2Ygc2V0KSB7XG4gICAgICAgICAgICBpZihpdGVtLnggPT09IHBvaW50LnggJiYgaXRlbS55ID09PSBwb2ludC55KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldENvb3JkaW5hdGVzKGNvbm5lY3Rvciwgc25hcFRvR3JpZCA9IHRydWUpIHtcbiAgICAgICAgLy8gY29ubmVjdG9yLnN2Z09iai5pZCBoYXMgdG8gYmUgY2FsbGVkLCBlbHNlIHRoZSBnZXRDb29yZGluYXRlcyBkb2VzIG5vdCB3b3JrIG9uIHRoZSBmaXJzdCBjYWxsIGluIEZpcmVmb3ggNTVcbiAgICAgICAgbGV0IGR1bW15ID0gY29ubmVjdG9yLnN2Z09iai5pZDtcblxuICAgICAgICBsZXQgJGNvbm5lY3RvciA9IGNvbm5lY3Rvci5zdmdPYmouJGVsO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbiA9ICRjb25uZWN0b3IucG9zaXRpb24oKTtcbiAgICAgICAgbGV0IHdpZHRoID0gJGNvbm5lY3Rvci5hdHRyKFwid2lkdGhcIik7XG4gICAgICAgIGxldCBoZWlnaHQgPSAkY29ubmVjdG9yLmF0dHIoXCJoZWlnaHRcIik7XG5cbiAgICAgICAgbGV0IHggPSBwb3NpdGlvbi5sZWZ0ICsgd2lkdGggLyAyO1xuICAgICAgICBsZXQgeSA9IHBvc2l0aW9uLnRvcCArIGhlaWdodCAvIDI7XG4gICAgICAgIGlmKHNuYXBUb0dyaWQpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHgpO1xuICAgICAgICAgICAgeSA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQoeSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgfTtcbiAgICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIENvbnRleHRNZW51SXRlbSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgY29udGV4dE1lbnUsIHBhcmVudFNWRywgY2xpY2tGdW5jdGlvbikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gY29udGV4dE1lbnU7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjxsaT5cIik7XG4gICAgICAgICQodGhpcy4kZWwpXG4gICAgICAgICAgICAudGV4dChuYW1lKVxuICAgICAgICAgICAgLmF0dHIoXCJ0eXBlXCIsIHR5cGUpO1xuXG4gICAgICAgIGlmKGNsaWNrRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICQodGhpcy4kZWwpLmNsaWNrKFxuICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbGlja0Z1bmN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDbGFzcyhjbHMpIHtcbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoY2xzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYXBwZW5kSXRlbShpdGVtKSB7XG4gICAgICAgIGlmKCF0aGlzLnN1Ykxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViTGlzdCA9ICQoXCI8dWw+XCIpO1xuICAgICAgICAgICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMuc3ViTGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1Ykxpc3QuYXBwZW5kKGl0ZW0ualF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBnZXQgalF1ZXJ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWw7XG4gICAgfVxufVxuY2xhc3MgR2F0ZU1lbnVJdGVtIGV4dGVuZHMgQ29udGV4dE1lbnVJdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBjb250ZXh0TWVudSwgcGFyZW50U1ZHKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgdHlwZSwgLy8gbmFtZSBpcyB0aGUgdHlwZVxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIGNvbnRleHRNZW51LFxuICAgICAgICAgICAgcGFyZW50U1ZHLFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGNvbnRleHRNZW51LnBvc2l0aW9uLnggLyBwYXJlbnRTVkcuZ3JpZFNpemUpICogcGFyZW50U1ZHLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IE1hdGgucm91bmQoY29udGV4dE1lbnUucG9zaXRpb24ueSAvIHBhcmVudFNWRy5ncmlkU2l6ZSkgKiBwYXJlbnRTVkcuZ3JpZFNpemVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcGFyZW50U1ZHLm5ld0dhdGUoXG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQsIC8vIHggY29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi50b3AgLy8geSBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHRNZW51IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG5cbiAgICAgICAgY29uc3QgZ2F0ZXMgPSBbXCJub3RcIiwgXCJhbmRcIiwgXCJvclwiLCBcIm5hbmRcIiwgXCJub3JcIiwgXCJ4b3JcIiwgXCJ4bm9yXCJdO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICB4OiAwLCB5OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kZWwgPSAkKFwiPHVsPlwiKTtcbiAgICAgICAgdGhpcy4kZWwuYXR0cignaWQnLCAnY29udGV4dE1lbnUnKTtcblxuICAgICAgICBsZXQgZ2F0ZUxpc3QgPSBuZXcgQ29udGV4dE1lbnVJdGVtKFwiTmV3IGdhdGVcIiwgJycsIHRoaXMsIHBhcmVudFNWRyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IGdhdGVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgZ2F0ZUxpc3QuYXBwZW5kSXRlbShcbiAgICAgICAgICAgICAgICBuZXcgR2F0ZU1lbnVJdGVtKGdhdGVzW2ldLCB0aGlzLCBwYXJlbnRTVkcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwZW5kSXRlbShnYXRlTGlzdCk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgbmV3IENvbnRleHRNZW51SXRlbShcIklucHV0IGJveFwiLCAnJywgdGhpcywgcGFyZW50U1ZHLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLngpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueSlcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRTVkcubmV3SW5wdXQocG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKG5ldyBDb250ZXh0TWVudUl0ZW0oXCJPdXRwdXQgYm94XCIsICcnLCB0aGlzLCBwYXJlbnRTVkcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueCksXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBhcmVudFNWRy5uZXdPdXRwdXQocG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kQ29uZGl0aW9uYWxJdGVtKCdib3gnLCAnUmVtb3ZlIHRoaXMgaXRlbScsIChpZCkgPT4ge3RoaXMucGFyZW50U1ZHLnJlbW92ZUJveChpZCl9KTtcbiAgICAgICAgdGhpcy5hcHBlbmRDb25kaXRpb25hbEl0ZW0oJ3dpcmUnLCAnUmVtb3ZlIHRoaXMgd2lyZScsIChpZCkgPT4ge3RoaXMucGFyZW50U1ZHLnJlbW92ZVdpcmVCeUlkKGlkKX0pO1xuXG4gICAgICAgIHBhcmVudFNWRy4kc3ZnLmJlZm9yZSh0aGlzLiRlbCk7XG4gICAgfVxuXG4gICAgYXBwZW5kSXRlbShpdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChpdGVtLmpRdWVyeSk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8vIGFwcGVuZHMgYW4gY29ubmRpdGlvbmFsIGl0ZW0gKHRoYXQgaXMgc2hvd24gb25seSBpZiB0aGUgdGFyZ2V0XG4gICAgLy8gaGFzIHRoZSBjbGFzcyBpdGVtQ2xhc3MpXG4gICAgLy8gY2xpY2tGdW5jdGlvbiB0YWtlcyBvbmUgYXJndW1lbnQ6IElEIG9mIHRoZSB0YXJnZXRcbiAgICBhcHBlbmRDb25kaXRpb25hbEl0ZW0oaXRlbUNsYXNzLCB0ZXh0LCBjbGlja0Z1bmN0aW9uKSB7XG4gICAgICAgIGlmKCF0aGlzLmNvbmRpdGlvbmFsSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW3RoaXMuY29uZGl0aW9uYWxJdGVtcy5sZW5ndGhdID0ge1xuICAgICAgICAgICAgaXRlbUNsYXNzOiBpdGVtQ2xhc3MsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgY2xpY2tGdW5jdGlvbjogY2xpY2tGdW5jdGlvblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVjaWRlcyB3aGV0aGVyIG9yIG5vdCB0byBkaXNwbGF5IHNwZWNpZmljIGNvbmRpdGlvbmFsIGl0ZW1zXG4gICAgcmVzb2x2ZUNvbmRpdGlvbmFsSXRlbXMoJHRhcmdldCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25kaXRpb25hbEl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZigkdGFyZ2V0Lmhhc0NsYXNzKHRoaXMuY29uZGl0aW9uYWxJdGVtc1tpXS5pdGVtQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ29udGV4dE1lbnVJdGVtKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW2ldLnRleHQsICcnLCB0aGlzLCB0aGlzLnBhcmVudFNWRyxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXNbaV0uY2xpY2tGdW5jdGlvbigkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKS5hZGRDbGFzcygnY29uZGl0aW9uYWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGhpZGVzIGFsbCBjb25kaXRpb25hbCBpdGVtc1xuICAgIGhpZGVBbGxDb25kaXRpb25hbEl0ZW1zKCkge1xuICAgICAgICB0aGlzLiRlbC5jaGlsZHJlbignLmNvbmRpdGlvbmFsJykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLy8gZGlzcGxheXMgdGhlIGNvbnRleHQgbWVudSB3aXRoIHRoZSByaWdodCBzZXQgb2YgY29uZGl0aW9uYWwgaXRlbXNcbiAgICBkaXNwbGF5KHgsIHksICR0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kZWwuY3NzKHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB0b3A6IHkgKyBcInB4XCIsXG4gICAgICAgICAgICBsZWZ0OiB4ICsgXCJweFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVzb2x2ZUNvbmRpdGlvbmFsSXRlbXMoJHRhcmdldCk7XG4gICAgfVxuXG4gICAgLy8gaGlkZXMgdGhlIGNvbnRleHQgbWVudVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNzcyh7ZGlzcGxheTogJ25vbmUnfSk7XG4gICAgICAgIHRoaXMuaGlkZUFsbENvbmRpdGlvbmFsSXRlbXMoKTtcbiAgICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBleHBvcnROZXR3b3JrIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNWRy5leHBvcnREYXRhO1xuICAgIH1cblxuICAgIGpzb24oc3R5bGUgPSBleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3QsIGRhdGFVcmkgPSBmYWxzZSkge1xuICAgICAgICBpZihkYXRhVXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2RhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04LCdcbiAgICAgICAgICAgICAgICArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmpzb24oc3R5bGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGV4cG9ydE5ldHdvcmsuc3R5bGUuY29tcGFjdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSk7XG4gICAgICAgICAgICAgICAgY2FzZSBleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSwgbnVsbCwgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJldHR5OiAwLFxuICAgICAgICAgICAgY29tcGFjdDogMVxuICAgICAgICB9XG4gICAgfTtcbn0iLCJpbXBvcnQge2V4cG9ydE5ldHdvcmt9IGZyb20gXCIuL2ltcG9ydEV4cG9ydC5qc1wiO1xuXG5jbGFzcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzcGVjaWZpY1RhZykge1xuICAgICAgICBpZighc3BlY2lmaWNUYWcpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJChcIjxkaXY+XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKFwiPFwiICsgc3BlY2lmaWNUYWcgKyBcIj5cIilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gY29uc3QgbW91c2VJY29uID1cbi8vICAgICBcIjxzdmcgY2xhc3M9XFxcIm1vdXNlSWNvblxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiBoZWlnaHQ9XFxcIjEyMS43NzEzMW1tXFxcIiB3aWR0aD1cXFwiODIuMzI3NTgzbW1cXFwiIHZlcnNpb249XFxcIjEuMVxcXCIgdmlld0JveD1cXFwiMCAwIDI5MS43MTE5MSA0MzEuNDczMTRcXFwiPlwiICtcbi8vICAgICBcIjxnIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKC0yMDIuNzA5MDgsLTI2MC45MjMyKVxcXCI+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggZD1cXFwibTIwMi44MTEwOCA0NDMuNTA2NjdjLTAuMTI1NyAxMS4wNTY4MyAwLjA2NTEgMTIuMTI5MTUgMC4wNTI4IDIzLjA5Mzc1IDEuMDQwNCAzOS4yOTE2NS00LjAzMjgxIDc5LjU4NDIgOC44MTQ0MSAxMTcuNTY4MzYgMTcuNTI2MDIgNTguMDA3NDIgNzAuNzYxMiAxMDcuMDc3OTMgMTMzLjEyOTA3IDEwOC4xMTcxOSA2MC44MDQ0OCAyLjYxMjQ3IDExNS44MDYzOC00MS40ODkxMiAxMzYuNjUyNDktOTYuOTM1NTUgMTUuMjE5NDItMzQuNzA1NjEgMTIuNzQ0Ny03Mi44MjYzOCAxMi44MzQtMTA5LjcyMjY2LTAuNDAzNTYtMTcuMjQ5MDUgMC4yNzQ1Mi0yNC43MzI5IDAuMDg3OS00Mi4xMjEwOWgtMjkxLjU3MDY2elxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJsZWZ0XFxcIiBkPVxcXCJtMzM1LjY3Nzg4IDI2MC45MzAzMmMtNTguNjUyNSAwLjY1NTY2LTk5LjYzMTkgNDMuNTEzODYtMTIwLjA4MjEgOTYuOTkyMTktMTAuNTUwNSAyNC4wNjAxMi0xMi41OTM1IDQxLjc3Nzk3LTEyLjg4NjcgNjcuNTgyMDNoMTM1Ljc4MzJ2LTE2NC41NzIyNmMtMC4wMDYgMC4wMDAwOC0wLjAxMTctMC4wMDAwOC0wLjAxNzYgMC0wLjkzNDctMC4wMTEtMS44NjU4LTAuMDEyNC0yLjc5NjgtMC4wMDJ6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcInJpZ2h0XFxcIiBkPVxcXCJtMzYxLjQ2Nzg3IDI2MC45Mjk5M2MtMC45NDIwNy0wLjAxLTEuODg2NC0wLjAwOS0yLjgzMjAzIDAuMDA0djE2NC41NzIyNmgxMzUuNzg1MTZjLTAuMjYyNTctMjQuNDY5NDgtMi4yNTIxLTQwLjc0ODIzLTExLjUwMzkxLTYzLjkwMjQzLTE5LjM0NzA5LTU1LjAzMjI1LTYxLjczMDQzLTEwMC4wNDUyNS0xMjEuNDQ5MjItMTAwLjY3MzgzelxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJtaWRkbGVcXFwiIGQ9XFxcIm0zNDguNTY1MDQgMjk0LjkzMzY1YzE1LjAzNzE0IDAgMjcuMTQyODYgMTIuMTA1NzIgMjcuMTQyODYgMjcuMTQyODZ2NDBjMCAxNS4wMzcxNC0xMi4xMDU3MiAyNy4xNDI4Ni0yNy4xNDI4NiAyNy4xNDI4NnMtMjcuMTQyODYtMTIuMTA1NzItMjcuMTQyODYtMjcuMTQyODZ2LTQwYzAtMTUuMDM3MTQgMTIuMTA1NzItMjcuMTQyODYgMjcuMTQyODYtMjcuMTQyODZ6XFxcIiBzdHJva2U9XFxcIiNmZmZcXFwiIHN0cm9rZS1saW5lY2FwPVxcXCJyb3VuZFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIyMFxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgPC9nPlwiICtcbi8vICAgICBcIjwvc3ZnPlwiO1xuXG5jbGFzcyBoZWxwV2luZG93SXRlbSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhcImhlbHBXaW5kb3dJdGVtXCIpO1xuICAgICAgICB0aGlzLiRlbC5odG1sKHRleHQpO1xuICAgIH1cbn1cblxuY2xhc3MgaGVscFdpbmRvdyBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuJGVsLmF0dHIoXCJpZFwiLCBcImhlbHBcIik7XG5cbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiPHN0cm9uZz5tYWluIG1lbnU8L3N0cm9uZz46IHJpZ2h0IGNsaWNrXCIpKTtcbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiZHJhZyBhbmQgZHJvcCB0byA8c3Ryb25nPm1vdmUgZWxlbWVudHM8L3N0cm9uZz5cIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPm1pZGRsZSBjbGljazwvc3Ryb25nPiB0byByb3RhdGUgZWxlbWVudHNcIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPmNsaWNrIDxpbWcgc3JjPSdpbWcvZ3VpL2hlbHAuc3ZnJyBjbGFzcz0naGVscGljb24nIGFsdD0naGVscCBpY29uJz48L3N0cm9uZz4gdG8gZGlzcGxheSBkb2N1bWVudGF0aW9uIChpbiBjemVjaClcIikpO1xuICAgIH1cblxuICAgIGFwcGVuZChpdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChpdGVtLiRlbCk7XG4gICAgfVxufVxuXG5cbmNsYXNzIGZsb2F0aW5nTWVudUl0ZW0gZXh0ZW5kcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzcGVjaWZpY0NsYXNzLCBpY29uLCB0aXRsZSwgc3BlY2lmaWNUYWcpIHtcbiAgICAgICAgc3VwZXIoc3BlY2lmaWNUYWcpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKFwiYnV0dG9uXCIpO1xuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhzcGVjaWZpY0NsYXNzKTtcblxuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoXG4gICAgICAgICAgICAkKFwiPGltZz5cIilcbiAgICAgICAgICAgICAgICAuYXR0cihcInNyY1wiLCBcImltZy9ndWkvXCIgKyBpY29uICsgXCIuc3ZnXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJhbHRcIiwgdGl0bGUpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ0aXRsZVwiLCB0aXRsZSlcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZsb2F0aW5nTWVudSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gJ2Zsb2F0aW5nTWVudSc7XG5cbiAgICAgICAgdGhpcy4kZWwuYXR0cihcImlkXCIsIGlkKTtcblxuICAgICAgICBsZXQgZXhwb3J0QnV0dG9uID0gbmV3IGZsb2F0aW5nTWVudUl0ZW0oXCJleHBvcnRcIiwgXCJleHBvcnRcIiwgXCJFeHBvcnQgdGhpcyBuZXR3b3JrXCIsIFwiYVwiKTtcbiAgICAgICAgZXhwb3J0QnV0dG9uLiRlbC5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gbmV3IGV4cG9ydE5ldHdvcmsocGFyZW50U1ZHKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBwb3B1cCBjb250YWluZXIgaG9sZGluZyBhbGwgcG9wdXAgY29udGVudCAodGhhdCB3aWxsIGJlIHBhc3NlZCB0byBsaXR5KVxuICAgICAgICAgICAgbGV0ICRwb3B1cCA9ICQoXCI8ZGl2PlwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiaWRcIiwgXCJqc29uRXhwb3J0XCIpO1xuXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgYmxvY2sgd2l0aCBjb2RlIHRvIGJlIGRpc3BsYXllZCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBwb3B1cCBlbGVtZW50XG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8cHJlPlwiKS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoXCI8Y29kZT5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgbGlua3NcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eSwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogXCJkb3dubG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwibmV0d29yay5qc29uXCJcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvZXhwb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICkuYXBwZW5kKFwiIGV4cGFuZGVkIEpTT05cIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8YT5cIikuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBkYXRhLmpzb24oZXhwb3J0TmV0d29yay5zdHlsZS5jb21wYWN0LCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgXCJjbGFzc1wiOiBcImRvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJuZXR3b3JrLm1pbi5qc29uXCJcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvZXhwb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICkuYXBwZW5kKFwiIGNvbXBhY3QgSlNPTlwiKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGl0eSgkcG9wdXApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFwcGVuZChleHBvcnRCdXR0b24pO1xuXG5cbiAgICAgICAgbGV0IGhlbHAgPSBuZXcgZmxvYXRpbmdNZW51SXRlbShcImhlbHBcIiwgXCJoZWxwXCIsIFwiRGlzcGxheSBoZWxwXCIsIFwiYVwiKTtcbiAgICAgICAgaGVscC4kZWwub24oXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgJChcIiNoZWxwXCIpLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSkub24oXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAkKFwiI2hlbHBcIikucmVtb3ZlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBoZWxwLiRlbC5hdHRyKHtcbiAgICAgICAgICAgICdocmVmJzogJy4vZG9jcy8nLFxuICAgICAgICAgICAgJ2RhdGEtbGl0eSc6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcGVuZChoZWxwKTtcblxuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5hZnRlcih0aGlzLiRlbCk7XG4gICAgICAgIHBhcmVudFNWRy4kc3ZnLmFmdGVyKG5ldyBoZWxwV2luZG93KCkuJGVsKTtcbiAgICB9XG5cbiAgICBhcHBlbmQobWVudUl0ZW0pIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKG1lbnVJdGVtLiRlbCk7XG4gICAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgKiBhcyBzdmdPYmogZnJvbSAnLi9zdmdPYmplY3RzLmpzJ1xuaW1wb3J0ICogYXMgZWRpdG9yRWxlbWVudHMgZnJvbSAnLi9lZGl0b3JFbGVtZW50cy5qcydcbmltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuaW1wb3J0IENvbnRleHRNZW51IGZyb20gJy4vY29udGV4dE1lbnUuanMnXG5pbXBvcnQgRmxvYXRpbmdNZW51IGZyb20gJy4vZmxvYXRpbmdNZW51LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdmcge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JpZFNpemUpIHtcbiAgICAgICAgdGhpcy4kc3ZnID0gJChjYW52YXMpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmJveGVzID0gW107IC8vIHN0b3JlcyBhbGwgYm94ZXNcbiAgICAgICAgdGhpcy53aXJlcyA9IFtdOyAvLyBzdG9yZXMgYWxsIHdpcmVzXG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkZWZzIGVsZW1lbnQsIHVzZWQgZm9yIHBhdHRlcm5zXG4gICAgICAgIHRoaXMuJGRlZnMgPSAkKFwiPGRlZnM+XCIpO1xuICAgICAgICB0aGlzLiRzdmcucHJlcGVuZCh0aGlzLiRkZWZzKTtcblxuICAgICAgICAvLyBCQUNLR1JPVU5EIFBBVFRFUk5cbiAgICAgICAgbGV0IHBhdHRlcm4gPSBuZXcgc3ZnT2JqLlBhdHRlcm4oXCJncmlkXCIsIHRoaXMuZ3JpZFNpemUsIHRoaXMuZ3JpZFNpemUpO1xuXG4gICAgICAgIGxldCBwYXR0ZXJuUG9pbnRzID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpXG4gICAgICAgICAgICAuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCgwLCAwKSlcbiAgICAgICAgICAgIC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMuZ3JpZFNpemUsIDApKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy5ncmlkU2l6ZSwgdGhpcy5ncmlkU2l6ZSkpO1xuXG4gICAgICAgIHBhdHRlcm4uYWRkQ2hpbGQobmV3IHN2Z09iai5Qb2x5TGluZShwYXR0ZXJuUG9pbnRzLCBcIiNhM2E0ZDJcIiwgMikpO1xuICAgICAgICB0aGlzLmFkZFBhdHRlcm4ocGF0dGVybi5nZXQoKSk7XG5cbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgXCIxMDAlXCIsIFwiMTAwJVwiLCBcInVybCgjZ3JpZClcIiwgXCJub25lXCIpO1xuICAgICAgICB0aGlzLmFwcGVuZEpRdWVyeU9iamVjdCh0aGlzLmJhY2tncm91bmQuZ2V0KCkpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICAvLyBDT05TVFJVQ1QgQ09OVEVYVCBNRU5VXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUgPSBuZXcgQ29udGV4dE1lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQ09OU1RSVUNUIEZMT0FUSU5HIE1FTlVcbiAgICAgICAgLy8gdGhpcy5mbG9hdGluZ01lbnUgPSBuZXcgRmxvYXRpbmdNZW51KHRoaXMpO1xuICAgICAgICB0aGlzLmZsb2F0aW5nTWVudSA9IG5ldyBGbG9hdGluZ01lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQUxMIEVWRU5UIENBTExCQUNLU1xuICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICB0aGlzLiRzdmcub24oJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXRSZWFsVGFyZ2V0KGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICBpZih0YXJnZXQhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb3VzZURvd24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmhpZGVDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSkub24oJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VNb3ZlKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSkub24oJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmKHRhcmdldCE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vdXNlVXAoZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KS5vbihcImNvbnRleHRtZW51XCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q29udGV4dE1lbnUoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZLCB0aGlzLmdldFJlYWxKUXVlcnlUYXJnZXQoZXZlbnQudGFyZ2V0KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBncmlkU2l6ZTogdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgIGJveGVzOiBbXSxcbiAgICAgICAgICAgIHdpcmVzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBkYXRhLmJveGVzW2ldID0gdGhpcy5ib3hlc1tpXS5leHBvcnREYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud2lyZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGRhdGEud2lyZXNbaV0gPSB0aGlzLndpcmVzW2ldLmV4cG9ydERhdGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICB3aXJlQ3JlYXRpb25IZWxwZXIoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgaWYoIXRoaXMuZmlyc3RDb25uZWN0b3JJZCkge1xuICAgICAgICAgICAgdGhpcy5maXJzdENvbm5lY3RvcklkID0gY29ubmVjdG9ySWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5ld1dpcmUodGhpcy5maXJzdENvbm5lY3RvcklkLCBjb25uZWN0b3JJZCk7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29ubmVjdG9ySWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXROZXdQcm9wYWdhdGlvbklkKCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0aW9uSGlzdG9yeSA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYodGhpcy5wcm9wSWQ9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcElkID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcElkKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcElkO1xuICAgIH1cblxuICAgIC8vIGNoZWNrcyBmb3IgbG9vcHMsIHJldHVybnMgdGhlIGNvcnJlY3Qgc3RhdGUgKGNoYW5nZXMgb3NjaWxsYXRpb24gdG8gdGhlIG9zY2lsbGF0aW5nIHN0YXRlIGV0YylcbiAgICBsb29wR3VhcmQocHJvcGFnYXRpb25JZCwgY29ubmVjdG9ySWQsIHN0YXRlKSB7XG5cbiAgICAgICAgaWYocHJvcGFnYXRpb25JZD09PXRoaXMucHJvcElkKSB7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BhZ2F0aW9uSGlzdG9yeS5oYXMoY29ubmVjdG9ySWQpKSB7XG4gICAgICAgICAgICAgICAgLy8gZGVlcENvcHkgaXMgbmVjZXNzYXJ5LCB3aXRob3V0IGl0IGkgYW0gbm90IGFibGUgdG8gYWRkIG5ldyBpdGVtcyB0byBzdGF0ZUxpc3RcbiAgICAgICAgICAgICAgICAvLyBsZXQgc3RhdGVMaXN0ID0gRm4uZGVlcENvcHkodGhpcy5wcm9wYWdhdGlvbkhpc3RvcnkuZ2V0KGNvbm5lY3RvcklkKSk7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlTGlzdCA9IHRoaXMucHJvcGFnYXRpb25IaXN0b3J5LmdldChjb25uZWN0b3JJZCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGhpc1N0YXRlRm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBzdGF0ZUxpc3QubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHN0YXRlTGlzdFtpXT09PXN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzU3RhdGVGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBsYXN0U3RhdGUgPSBzdGF0ZUxpc3Rbc3RhdGVMaXN0Lmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICAgICAgc3RhdGVMaXN0W3N0YXRlTGlzdC5sZW5ndGhdID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGlvbkhpc3Rvcnkuc2V0KGNvbm5lY3RvcklkLCBzdGF0ZUxpc3QpO1xuXG4gICAgICAgICAgICAgICAgaWYodGhpc1N0YXRlRm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjdXJzaW9uIGlzIGhhcHBlbmluZ1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFN0YXRlIT09c3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogTG9naWMuc3RhdGUub3NjaWxsYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0aW9uSGlzdG9yeS5zZXQoY29ubmVjdG9ySWQsIFtzdGF0ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGlvbkhpc3RvcnkgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3R2F0ZShuYW1lLCB4LCB5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0JveCh4LCB5LCBuZXcgZWRpdG9yRWxlbWVudHMuR2F0ZSh0aGlzLCBuYW1lLCB4LCB5KSk7XG4gICAgfVxuXG4gICAgbmV3SW5wdXQoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLklucHV0Qm94KHRoaXMpKTtcbiAgICB9XG5cbiAgICBuZXdPdXRwdXQoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLk91dHB1dEJveCh0aGlzKSk7XG4gICAgfVxuXG4gICAgbmV3Qm94KHgsIHksIG9iamVjdCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmJveGVzLmxlbmd0aDtcblxuICAgICAgICB0aGlzLmJveGVzW2luZGV4XSA9IG9iamVjdDtcblxuICAgICAgICAvLyB0cmFuc2xhdGUgdGhlIGdhdGUgaWYgeCBhbmQgeSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICAgICAgaWYoeCAmJiB5KSB7XG4gICAgICAgICAgICBsZXQgdHIgPSBuZXcgZWRpdG9yRWxlbWVudHMuVHJhbnNmb3JtKCk7XG4gICAgICAgICAgICB0ci5zZXRUcmFuc2xhdGUoeCwgeSk7XG5cbiAgICAgICAgICAgIHRoaXMuYm94ZXNbaW5kZXhdLnN2Z09iai5hZGRBdHRyKHtcInRyYW5zZm9ybVwiOiB0ci5nZXQoKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBlbmRFbGVtZW50KHRoaXMuYm94ZXNbaW5kZXhdKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpbmRleF07XG4gICAgfVxuXG4gICAgcmVtb3ZlQm94KGdhdGVJZCkge1xuICAgICAgICBsZXQgJGdhdGUgPSAkKFwiI1wiK2dhdGVJZCk7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgZ2F0ZSBpbiBzdmcncyBsaXN0IG9mIGdhdGVzXG4gICAgICAgIGxldCBnYXRlSW5kZXggPSAtMTtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5ib3hlc1tpXS5zdmdPYmouaWQ9PT1nYXRlSWQpIHtcbiAgICAgICAgICAgICAgICBnYXRlSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoZ2F0ZUluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgd2lyZXMgY29ubmVjdGVkIHRvIHRoaXMgZ2F0ZVxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYm94ZXNbZ2F0ZUluZGV4XS5pbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZCh0aGlzLmJveGVzW2dhdGVJbmRleF0uaW5wdXRzW2ldLnN2Z09iai5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3hlc1tnYXRlSW5kZXhdLm91dHB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZCh0aGlzLmJveGVzW2dhdGVJbmRleF0ub3V0cHV0c1tpXS5zdmdPYmouaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGdhdGVcbiAgICAgICAgICAgIHRoaXMuYm94ZXMuc3BsaWNlKGdhdGVJbmRleCwgMSk7XG4gICAgICAgICAgICAkZ2F0ZS5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUcnlpbmcgdG8gcmVtb3ZlIGFuIG5vbmV4aXN0aW5nIGdhdGUuIChHYXRlIGlkOiBcIitnYXRlSWQrXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3V2lyZShmcm9tSWQsIHRvSWQpIHtcbiAgICAgICAgaWYoZnJvbUlkPT09dG9JZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZnJvbUlkID0gZnJvbUlkO1xuICAgICAgICB0aGlzLnRvSWQgPSB0b0lkO1xuXG4gICAgICAgIGxldCBmcm9tQ29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGZyb21JZCk7XG4gICAgICAgIGxldCB0b0Nvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh0b0lkKTtcblxuICAgICAgICBpZihmcm9tQ29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlV2lyZXNCeUNvbm5lY3RvcklkKGZyb21JZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0b0Nvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZCh0b0lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMud2lyZXMubGVuZ3RoO1xuICAgICAgICB0aGlzLndpcmVzW2luZGV4XSA9IG5ldyBlZGl0b3JFbGVtZW50cy5XaXJlKHRoaXMsIGZyb21JZCwgdG9JZCwgdGhpcy5ncmlkU2l6ZSk7XG5cbiAgICAgICAgZnJvbUNvbm5lY3Rvci5hZGRXaXJlSWQodGhpcy53aXJlc1tpbmRleF0uc3ZnT2JqLmlkKTtcbiAgICAgICAgdG9Db25uZWN0b3IuYWRkV2lyZUlkKHRoaXMud2lyZXNbaW5kZXhdLnN2Z09iai5pZCk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRFbGVtZW50KHRoaXMud2lyZXNbaW5kZXhdKTtcbiAgICAgICAgdGhpcy5tb3ZlVG9CYWNrQnlJZCh0aGlzLndpcmVzW2luZGV4XS5zdmdPYmouaWQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLndpcmVzW2luZGV4XTtcbiAgICB9XG5cbiAgICBnZXRXaXJlQnlJZCh3aXJlSWQpIHtcbiAgICAgICAgbGV0IHdpcmVDb3VudCA9IHRoaXMud2lyZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgd2lyZUNvdW50IDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLndpcmVzW2ldLnN2Z09iai5pZD09PXdpcmVJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpcmVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldFdpcmVzQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rvci53aXJlSWRzO1xuICAgIH1cblxuICAgIHJlbW92ZVdpcmVCeUlkKHdpcmVJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMud2lyZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy53aXJlc1tpXS5zdmdPYmouaWQgPT09IHdpcmVJZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGNvbm5lY3RvcjEgPSB0aGlzLndpcmVzW2ldLnN0YXJ0Q29ubmVjdG9yO1xuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IyID0gdGhpcy53aXJlc1tpXS5lbmRDb25uZWN0b3I7XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0b3IxLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuICAgICAgICAgICAgICAgIGNvbm5lY3RvcjIucmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzW2ldLnN2Z09iai4kZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy53aXJlcy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcblxuICAgICAgICBjb25uZWN0b3Iud2lyZUlkcy5mb3JFYWNoKCh3aXJlSWQpID0+IHtcbiAgICAgICAgICAgIGxldCB3aXJlID0gdGhpcy5nZXRXaXJlQnlJZCh3aXJlSWQpO1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIG90aGVyIGNvbm5lY3RvciB0aGF0IGlzIHRoZSB3aXJlIGNvbm5lY3RlZCB0b1xuICAgICAgICAgICAgbGV0IG90aGVyQ29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKHdpcmUuZnJvbUlkLCB3aXJlKTtcbiAgICAgICAgICAgIGlmKG90aGVyQ29ubmVjdG9yLnN2Z09iai5pZD09PWNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJDb25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQod2lyZS50b0lkLCB3aXJlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSB3aXJlIHJlY29yZCBmcm9tIHRoZSBvdGhlciBjb25uZWN0b3JcbiAgICAgICAgICAgIG90aGVyQ29ubmVjdG9yLndpcmVJZHMuZGVsZXRlKHdpcmVJZCk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgd2lyZSByZXByZXNlbnRhdGlvbiB1c2luZyBqUXVlcnlcbiAgICAgICAgICAgICQoXCIjXCIgKyB3aXJlSWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAvLyBpZiBvdGhlckNvbm5lY3RvciBpcyBhbiBpbnB1dCBjb25uZWN0b3IsIHNldCBpdHMgc3RhdGUgdG8gdW5rbm93blxuICAgICAgICAgICAgaWYob3RoZXJDb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgICAgIG90aGVyQ29ubmVjdG9yLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24sIHRoaXMuZ2V0TmV3UHJvcGFnYXRpb25JZCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2xlYXIgdGhlIGxpc3Qgb2Ygd2lyZSBJZHNcbiAgICAgICAgY29ubmVjdG9yLndpcmVJZHMuY2xlYXIoKTtcbiAgICAgICAgLy8gaWYgY29ubmVjdG9yIGlzIGFuIGlucHV0IGNvbm5lY3Rvciwgc2V0IGl0cyBzdGF0ZSB0byB1bmtub3duXG4gICAgICAgIGlmKGNvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICBjb25uZWN0b3Iuc2V0U3RhdGUoTG9naWMuc3RhdGUudW5rbm93biwgdGhpcy5nZXROZXdQcm9wYWdhdGlvbklkKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlJZChnYXRlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5ib3hlc1tpXS5zdmdPYmouaWQ9PT1nYXRlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwIDsgaiA8IHRoaXMuYm94ZXNbaV0uaW5wdXRzLmxlbmd0aCA7IGorKykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuYm94ZXNbaV0uaW5wdXRzW2pdLnN2Z09iai5pZD09PWNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJveGVzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yKGxldCBqID0gMCA7IGogPCB0aGlzLmJveGVzW2ldLm91dHB1dHMubGVuZ3RoIDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5ib3hlc1tpXS5vdXRwdXRzW2pdLnN2Z09iai5pZD09PWNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJveGVzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCwgd2lyZSkge1xuICAgICAgICAvLyB0aGUgd2lyZSB2YXJpYWJsZSBpcyB1c2VkIGFzIGhldXJpc3RpYyxcbiAgICAgICAgLy8gd2hlbiB3ZSBrbm93IHRoZSB3aXJlLCB3ZSBoYXZlIHRvIGNoZWNrIG9ubHlcbiAgICAgICAgLy8gdHdvIGdhdGVzIGluc3RlYWQgb2YgYWxsIG9mIHRoZW1cblxuICAgICAgICBpZih3aXJlIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB3ZSBrbm93IHRoZSB3aXJlIC0tIHdlIGNhbiBjaGVjayBvbmx5IGdhdGVzIGF0IHRoZSBlbmRzIG9mIHRoaXMgd2lyZVxuICAgICAgICAgICAgbGV0IGNvbm5lY3RvciA9IHdpcmUuc3RhcnRCb3guZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG4gICAgICAgICAgICBpZiAoIWNvbm5lY3Rvcikge1xuICAgICAgICAgICAgICAgIGNvbm5lY3RvciA9IHdpcmUuZW5kQm94LmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3RvcjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgZG8gbm90IGtub3cgdGhlIHdpcmUgLS0gd2UgaGF2ZSB0byBjaGVjayBhbGwgZ2F0ZXNcbiAgICAgICAgICAgIGxldCBnYXRlQ291bnQgPSB0aGlzLmJveGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IGdhdGVDb3VudCA7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IgPSB0aGlzLmJveGVzW2ldLmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgICAgIGlmKGNvbm5lY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29ubmVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBvYmplY3QsIHRoYXQgdXNlciBpbnRlcmFjdGVkIHdpdGgsIGlzIG5vdCBhIGNvbm5lY3RvciBhbmQgaXMgaW4gYSBncm91cFxuICAgIC8vIHJldHVybiB0aGUgZ3JvdXAgalF1ZXJ5IG9iamVjdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBqUXVlcnkgb2JqZWN0XG4gICAgZ2V0UmVhbEpRdWVyeVRhcmdldCh0YXJnZXQpIHtcbiAgICAgICAgbGV0ICR0YXJnZXQgPSAkKHRhcmdldCk7XG4gICAgICAgIGlmKCEkdGFyZ2V0Lmhhc0NsYXNzKFwiY29ubmVjdG9yXCIpICYmICR0YXJnZXQucGFyZW50cygnZycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgd2hpbGUgKCR0YXJnZXQucHJvcChcInRhZ05hbWVcIikgIT09IFwiR1wiICYmICR0YXJnZXQucHJvcChcInRhZ05hbWVcIikgIT09IFwiZ1wiKSB7XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICR0YXJnZXQucGFyZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICR0YXJnZXQ7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0aGUgZWRpdG9yRWxlbWVudCB0aGF0IHVzZXIgaW50ZXJhY3RlZCB3aXRoLCB0aGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBpcyBhIGpRdWVyeSBlbGVtZW50XG4gICAgZ2V0UmVhbFRhcmdldCh0YXJnZXQpIHtcbiAgICAgICAgLy8gZXZlbnR5IHNlIG11c2VqaSB6cHJhY292YXQgdGFkeSwgcHJvdG96ZSB2IFNWRyBzZSBldmVudHkgbmVwcm9wYWd1amlcbiAgICAgICAgbGV0ICR0YXJnZXQgPSAkKHRhcmdldCk7XG5cbiAgICAgICAgaWYoJHRhcmdldC5oYXNDbGFzcyhcImNvbm5lY3RvclwiKSkge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNvbm5lY3RvciwgZG9uJ3QgdHJhdmVyc2UgZ3JvdXBzXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb25uZWN0b3JCeUlkKCR0YXJnZXQuYXR0cignaWQnKSk7XG4gICAgICAgIH0gZWxzZSBpZigkdGFyZ2V0LnBhcmVudHMoJ2cnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGVsZW1lbnQgaXMgaW4gYSBncm91cCBhbmQgaXQgaXMgbm90IGEgY29ubmVjdG9yXG5cbiAgICAgICAgICAgIC8vIHRyYXZlcnNpbmcgdXAgdGhlIERPTSB0cmVlIHVudGlsIHdlIGZpbmQgdGhlIGNsb3Nlc3QgZ3JvdXBcbiAgICAgICAgICAgIGxldCAkcGFyZW50R3JvdXAgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgd2hpbGUgKCRwYXJlbnRHcm91cC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJHXCIgJiYgJHBhcmVudEdyb3VwLnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcImdcIikge1xuICAgICAgICAgICAgICAgICRwYXJlbnRHcm91cCA9ICRwYXJlbnRHcm91cC5wYXJlbnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm94QnlJZCgkcGFyZW50R3JvdXAuYXR0cignaWQnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHRhcmdldC5oYXNDbGFzcyhcIndpcmVcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFdpcmVCeUlkKCR0YXJnZXQuYXR0cignaWQnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuYXBwZW5kSlF1ZXJ5T2JqZWN0KGVsZW1lbnQuZ2V0KCkpO1xuICAgIH1cblxuICAgIGFwcGVuZEpRdWVyeU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmFwcGVuZChvYmplY3QpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG5cbiAgICBhZGRQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICAgICAgdGhpcy4kZGVmcy5hcHBlbmQocGF0dGVybik7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH1cblxuICAgIC8vIHJlbG9hZCB0aGUgU1ZHIGRvY3VtZW50IChuZWVkZWQgdG8gZGlzcGxheSBuZXdseSBhcHBlbmRlZCBqUXVlcnkgb2JqZWN0KVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuJHN2Zy5odG1sKHRoaXMuJHN2Zy5odG1sKCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNWRyBkb2N1bWVudCBoYXMgYmVlbiByZWxvYWRlZC5cIilcbiAgICB9XG5cbiAgICBkaXNwbGF5Q29udGV4dE1lbnUoeCwgeSwgJHRhcmdldCkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LmRpc3BsYXkoeCwgeSwgJHRhcmdldCk7XG4gICAgfVxuICAgIGhpZGVDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudS5oaWRlKCk7XG4gICAgfVxuXG4gICAgLy8gc25hcCBhIHZhbHVlIHRvIGEgZ3JpZFxuICAgIHNuYXBUb0dyaWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyB0aGlzLmdyaWRTaXplKSAqIHRoaXMuZ3JpZFNpemU7XG4gICAgfVxuXG4gICAgLy8gc3RhdGljIGZ1bmN0aW9uIGZvciBzbmFwcGluZyBhIHZhbHVlIHRvIGEgZ3JpZFxuICAgIHN0YXRpYyBzbmFwVG9HcmlkKHZhbHVlLCBncmlkU2l6ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIGdyaWRTaXplKSAqIGdyaWRTaXplO1xuICAgIH1cblxuICAgIC8vIGdldCBzZXQgb2Ygbm9kZXMsIHRoYXQgY2Fubm90IGJlIHVzZWQgZm9yIHdpcmluZyBhdCBhbnkgY2lyY3Vtc3RhbmNlc1xuICAgIGdldE5vblJvdXRhYmxlTm9kZXMoKSB7XG4gICAgICAgIGxldCBibG9ja2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIC8vIGZvciBlYWNoIGJveFxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIGpRdWVyeSBjaGlsZCB3aXRoIGNsYXNzIC5yZWN0IChcImhpdGJveFwiKVxuICAgICAgICAgICAgbGV0IHJlY3QgPSAkKCcjJyArIHRoaXMuYm94ZXNbaV0uc3ZnT2JqLmlkKS5jaGlsZHJlbihcIi5yZWN0XCIpWzBdO1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlXG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSAkKHJlY3QpLnBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIHNuYXAgdGhlIHBvc2l0aW9uIHRvIHRoZSBncmlkXG4gICAgICAgICAgICBwb3NpdGlvbi5sZWZ0ID0gdGhpcy5zbmFwVG9HcmlkKHBvc2l0aW9uLmxlZnQpO1xuICAgICAgICAgICAgcG9zaXRpb24udG9wID0gdGhpcy5zbmFwVG9HcmlkKHBvc2l0aW9uLnRvcCk7XG5cbiAgICAgICAgICAgIC8vIGZvciBlYWNoIGl0ZW0gaW4gYmxvY2tlZE5vZGVzIChzZXQgb2YgYmxvY2tlZCBub2RlcyB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlXG4gICAgICAgICAgICAvLyB0byB0aGUgbGVmdCB1cHBlciBjb3JuZXIgb2YgcmVjdDsgdW5pdCB1c2VkIGlzIFwib25lIGdyaWRTaXplXCIpIGNvbnZlcnQgdGhlIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAvLyB0byBhYnNvbHV0ZSAobXVsdGlwbGUgd2l0aCBncmlkU2l6ZSBhbmQgYWRkIHBvc2l0aW9uIG9mIHJlY3QpIGFuZCBhZGQgdGhlIHJlc3VsdCB0byB0aGUgc2V0XG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5ib3hlc1tpXS5ibG9ja2VkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgYWJzb2x1dGVYID0gcG9zaXRpb24ubGVmdCArIGl0ZW0ueCAqIHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgbGV0IGFic29sdXRlWSA9IHBvc2l0aW9uLnRvcCArIGl0ZW0ueSAqIHRoaXMuZ3JpZFNpemU7XG5cbiAgICAgICAgICAgICAgICBibG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogYWJzb2x1dGVYLFxuICAgICAgICAgICAgICAgICAgICB5OiBhYnNvbHV0ZVlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBzZXRcbiAgICAgICAgcmV0dXJuIGJsb2NrZWROb2RlcztcbiAgICB9XG5cbiAgICBtb3ZlVG9Gcm9udEJ5SWQob2JqSWQpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmFwcGVuZCgkKFwiI1wiICsgb2JqSWQpKTtcbiAgICB9XG5cbiAgICBtb3ZlVG9CYWNrQnlJZChvYmpJZCkge1xuICAgICAgICAkKFwiI1wiICsgdGhpcy5iYWNrZ3JvdW5kLmlkKVxuICAgICAgICAgICAgLmFmdGVyKCQoXCIjXCIgKyBvYmpJZCkpO1xuICAgIH1cblxuICAgIC8vIGdldCBzZXQgb2Ygbm9kZXMsIHRoYXQgaXMgYmV0dGVyIG5vdCB0byB1c2UgZm9yIHdpcmluZ1xuICAgIGdldEluY29udmVuaWVudE5vZGVzKGlnbm9yZVdpcmVJZCkge1xuXG4gICAgICAgIGxldCBpbmNvbnZlbmllbnROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgLy8gZm9yIGVhY2ggd2lyZVxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMud2lyZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICAvLyAoaWdub3JlIHRoZSB3aXJlIHRoYXQgaXMgc3BlY2lmaWVkIGluIHRoZSBpZ25vcmVXaXJlSWQgYXJndW1lbnQgKGlmIGFueSkpXG4gICAgICAgICAgICBpZihpZ25vcmVXaXJlSWQ9PT11bmRlZmluZWQgfHwgaWdub3JlV2lyZUlkIT09dGhpcy53aXJlc1tpXS5zdmdPYmouaWQpIHtcbiAgICAgICAgICAgICAgICAvLyBjeWNsZSB0aHJvdWdoIHBvaW50cywgZm9yIGVhY2ggbmVpZ2JvdXJzIGFkZCBhbGwgcG9pbnRzIHRoYXQgYXJlIGluIGJldHdlZW4gdGhlbVxuICAgICAgICAgICAgICAgIC8vIGkuZS46ICgwLDApIGFuZCAoMCwzMCkgYXJlIGJsb2NraW5nIHRoZXNlIG5vZGVzOiAoMCwwKSwgKDAsMTApLCAoMCwyMCksICgwLDMwKVxuICAgICAgICAgICAgICAgIGxldCBwcmV2UG9pbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy53aXJlc1tpXS5wb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZQb2ludCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJldlBvaW50IGlzIHVuZGVmaW5lZCwgYWRkIHRoZSBmaXJzdCBwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jb252ZW5pZW50Tm9kZXMuYWRkKHt4OiBwb2ludC54LCB5OiBwb2ludC55fSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGFkZCBhbGwgdGhlIHBvaW50IGJldHdlZW4gdGhlIHByZXZQb2ludCAoZXhjbHVkZWQpIGFuZCBwb2ludCAoaW5jbHVkZWQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByZXZQb2ludC54PT09cG9pbnQueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIGhvcml6b250YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IE1hdGgubWluKHByZXZQb2ludC55LCBwb2ludC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG8gPSBNYXRoLm1heChwcmV2UG9pbnQueSwgcG9pbnQueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZShmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29udmVuaWVudE5vZGVzLmFkZCh7eDogcG9pbnQueCwgeTogZnJvbX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICs9IHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHByZXZQb2ludC55PT09cG9pbnQueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb20gPSBNYXRoLm1pbihwcmV2UG9pbnQueCwgcG9pbnQueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvID0gTWF0aC5tYXgocHJldlBvaW50LngsIHBvaW50LngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUoZnJvbSA8PSB0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbnZlbmllbnROb2Rlcy5hZGQoe3g6IGZyb20sIHk6IHBvaW50Lnl9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArPSB0aGlzLmdyaWRTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluZSBpcyBuZWl0aGVyIGhvcml6b250YWwgbm9yIHZlcnRpY2FsLCB0aHJvdyBhbiBlcnJvciBmb3IgYmV0dGVyIGZ1dHVyZSBkZWJ1Z2dpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZ2V0SW5jb252ZW5pZW50Tm9kZXM6IGxpbmUgYmV0d2VlbiB0d28gcG9pbnRzIGlzIG5laXRoZXIgaG9yaXpvbnRhbCBub3IgdmVydGljYWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgbmV3IHByZXZQb2ludFxuICAgICAgICAgICAgICAgICAgICBwcmV2UG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gaW5jb252ZW5pZW50Tm9kZXM7XG4gICAgfVxufSIsImltcG9ydCBTdmcgZnJvbSAnLi9jYW52YXMuanMnO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc3ZnID0gbmV3IFN2ZyhcInN2ZyNjYW52YXNcIiwgMTApO1xuXG4gICAgLyogREVNTyAqL1xuICAgIC8vIE9ORSBCSVQgQ09NUEFSQVRPUlxuICAgIC8qXG4gICAgbGV0IGkxID0gc3ZnLm5ld0lucHV0KDEwMCwgMTAwKTtcbiAgICBsZXQgaTIgPSBzdmcubmV3SW5wdXQoMTAwLCAyMDApO1xuXG4gICAgbGV0IG4xID0gc3ZnLm5ld0dhdGUoXCJub3RcIiwgMjAwLCAxMDApO1xuICAgIGxldCBuMiA9IHN2Zy5uZXdHYXRlKFwibm90XCIsIDIwMCwgMjAwKTtcblxuICAgIGxldCBhMSA9IHN2Zy5uZXdHYXRlKFwiYW5kXCIsIDM2MCwgOTApO1xuICAgIGxldCBhMiA9IHN2Zy5uZXdHYXRlKFwiYW5kXCIsIDM2MCwgMjEwKTtcblxuICAgIGxldCBub3IgPSBzdmcubmV3R2F0ZShcIm5vclwiLCA1NDAsIDE1MCk7XG5cbiAgICBsZXQgbzEgPSBzdmcubmV3T3V0cHV0KDY4MCwgOTApO1xuICAgIGxldCBvMiA9IHN2Zy5uZXdPdXRwdXQoNjgwLCAxNTApO1xuICAgIGxldCBvMyA9IHN2Zy5uZXdPdXRwdXQoNjgwLCAyMTApO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIG4xLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBuMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShuMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTEuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUobjIub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoYTEub3V0cHV0c1swXS5zdmdPYmouaWQsIG5vci5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbm9yLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoYTEub3V0cHV0c1swXS5zdmdPYmouaWQsIG8xLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKG5vci5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoYTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG8zLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgICovXG5cbiAgICAvLyBCSU5BUlkgQURERVJcbiAgICAvKlxuICAgIGxldCBpMSA9IHN2Zy5uZXdJbnB1dCg4MCwgOTApO1xuICAgIGxldCBpMiA9IHN2Zy5uZXdJbnB1dCg4MCwgMTMwKTtcbiAgICBsZXQgaTMgPSBzdmcubmV3SW5wdXQoODAsIDE4MCk7XG5cbiAgICBsZXQgeDEgPSBzdmcubmV3R2F0ZShcInhvclwiLCAzNjAsIDEwMCk7XG4gICAgbGV0IHgyID0gc3ZnLm5ld0dhdGUoXCJ4b3JcIiwgMzYwLCAxNzApO1xuXG4gICAgbGV0IGExID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMjUwLCAyMjApO1xuICAgIGExLm9uQ2xpY2tNaWRkbGUoKTsvLyBhIGplZG5vdSByb3RvdmFueVxuICAgIGxldCBhMiA9IHN2Zy5uZXdHYXRlKFwiYW5kXCIsIDUwMCwgMzIwKTtcblxuICAgIGxldCBvciA9IHN2Zy5uZXdHYXRlKFwib3JcIiwgNjIwLCAzMTApO1xuXG4gICAgbGV0IG8xID0gc3ZnLm5ld091dHB1dCg3NTAsIDI3MCk7XG4gICAgbGV0IG8yID0gc3ZnLm5ld091dHB1dCg3NTAsIDMxMCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIHgxLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkzLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4Mi5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkzLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKHgxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4Mi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZSh4MS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgb3IuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZSh4Mi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoYTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG9yLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUob3Iub3V0cHV0c1swXS5zdmdPYmouaWQsIG8yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgICovXG59KTsiXX0=
