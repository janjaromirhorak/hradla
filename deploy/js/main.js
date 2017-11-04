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
      this.type = Connector.type.outputConnector;
    }
    return ($traceurRuntime.createClass)(OutputConnector, {
      setState: function(state, propagationId) {
        var $__5 = this;
        var loopGuard = this.parentSVG.loopGuard(propagationId, this.svgObj.id, state);
        $traceurRuntime.superGet(this, OutputConnector.prototype, "setState").call(this, loopGuard.state, propagationId);
        if (loopGuard.stopPropagation === false) {
          this.wireIds.forEach(function(wireId) {
            $__5.parentSVG.getWireById(wireId).setState(state, propagationId);
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
      get exportData() {
        var $__5 = this;
        var connections = [];
        var $__14 = this,
            $__15 = function(i) {
              if ($__14.connectors[i].wireIds.size > 0) {
                $__14.connectors[i].wireIds.forEach(function(item) {
                  var thisWireId;
                  if (!$__5.parentSVG.exportWireIdMap.has(item)) {
                    $__5.parentSVG.exportWireIdMap.set(item, $__5.parentSVG.exportWireId);
                    thisWireId = $__5.parentSVG.exportWireId;
                    $__5.parentSVG.exportWireId++;
                  } else {
                    thisWireId = $__5.parentSVG.exportWireIdMap.get(item);
                  }
                  connections[connections.length] = {
                    index: i,
                    type: $__5.connectors[i].type,
                    wireId: thisWireId
                  };
                });
              }
            };
        for (var i = 0; i < this.connectors.length; ++i) {
          $__15(i);
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
            $__13 = 4; $__13 < arguments.length; $__13++)
          specialNodes[$__13 - 4] = arguments[$__13];
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
          var newBlockedNodes$__16 = new Set();
          this.blockedNodes.forEach(function(item) {
            newBlockedNodes$__16.add({
              x: Math.abs(item.y - $__5.gridWidth),
              y: item.x
            });
          });
          this.blockedNodes = newBlockedNodes$__16;
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
        for (var i = 0; i < this.connectors.length; ++i) {
          this.connectors[i].wireIds.forEach(function(wireId) {
            var wire = $__5.parentSVG.getWireById(wireId);
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
        var t = this.connectors[0].state;
        this.connectors[0].setState(t, this.parentSVG.getNewPropagationId());
      },
      set on(isOn) {
        var newPropId = this.parentSVG.getNewPropagationId();
        if (isOn) {
          this.changeImage("on");
          this.connectors[0].setState(Logic.state.on, newPropId);
        } else {
          this.changeImage();
          this.connectors[0].setState(Logic.state.off, newPropId);
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
            this.connectors[0].setState(Logic.and(this.connectors[1].state, this.connectors[2].state), propagationId);
            break;
          case "nand":
            this.connectors[0].setState(Logic.nand(this.connectors[1].state, this.connectors[2].state), propagationId);
            break;
          case "nor":
            this.connectors[0].setState(Logic.nor(this.connectors[1].state, this.connectors[2].state), propagationId);
            break;
          case "not":
            this.connectors[0].setState(Logic.not(this.connectors[1].state), propagationId);
            break;
          case "or":
            this.connectors[0].setState(Logic.or(this.connectors[1].state, this.connectors[2].state), propagationId);
            break;
          case "xnor":
            this.connectors[0].setState(Logic.xnor(this.connectors[1].state, this.connectors[2].state), propagationId);
            break;
          case "xor":
            this.connectors[0].setState(Logic.xor(this.connectors[1].state, this.connectors[2].state), propagationId);
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
        this.exportWireIdMap = new Map();
        this.exportWireId = 0;
        var data = {
          boxes: [],
          wires: []
        };
        for (var i = 0; i < this.boxes.length; ++i) {
          data.boxes[i] = this.boxes[i].exportData;
        }
        return data;
      },
      importData: function(data) {
        var $__2 = this;
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
          for (var i$__11 = 0; i$__11 < this.boxes[gateIndex].connectors.length; i$__11++) {
            this.removeWiresByConnectorId(this.boxes[gateIndex].connectors[i$__11].svgObj.id);
          }
          this.boxes.splice(gateIndex, 1);
          $gate.remove();
        } else {
          console.error("Trying to remove an nonexisting gate. (Gate id: " + gateId + ")");
        }
      },
      newWire: function(fromId, toId) {
        var refresh = arguments[2] !== (void 0) ? arguments[2] : true;
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
        this.appendElement(this.wires[index], refresh);
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
            var connector$__12 = this.boxes[i].getConnectorById(connectorId);
            if (connector$__12) {
              return connector$__12;
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
        var $__13 = this,
            $__14 = function(i) {
              if (ignoreWireId === undefined || ignoreWireId !== $__13.wires[i].svgObj.id) {
                var prevPoint;
                $__13.wires[i].points.forEach(function(point) {
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
                      var from$__15 = Math.min(prevPoint.x, point.x);
                      var to$__16 = Math.max(prevPoint.x, point.x);
                      while (from$__15 <= to$__16) {
                        inconvenientNodes.add({
                          x: from$__15,
                          y: point.y
                        });
                        from$__15 += $__2.gridSize;
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
          $__14(i);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiIsInNyYy9lczYvc3RydWN0dXJlc0FuZENsYXNzZXMuanMiLCJzcmMvZXM2L3N2Z09iamVjdHMuanMiLCJzcmMvZXM2L2xvZ2ljLmpzIiwic3JjL2VzNi9lZGl0b3JFbGVtZW50cy5qcyIsInNyYy9lczYvY29udGV4dE1lbnUuanMiLCJzcmMvZXM2L2ltcG9ydEV4cG9ydC5qcyIsInNyYy9lczYvZmxvYXRpbmdNZW51LmpzIiwic3JjL2VzNi9jYW52YXMuanMiLCJzcmMvZXM2L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxBQUFJLElBQUEsQ0FBQSxZQUFXLG9DQUFvQixDQUFDO0FDR3BDLEFBQUksSUFBQSxDQUFBLGtCQUFpQixFQUFJLEtBQUcsQ0FBQztJQUVoQixHQUFDLEVBTGQsQ0FBQSxTQUFTLEFBQUQ7QUFLRCxXQUFNLEdBQUMsQ0FDRSxBQUFELENBQUc7QUFDVixTQUFHLENBQUMsa0JBQWlCLENBQUU7QUFDbkIseUJBQWlCLEVBQUksS0FBRyxDQUFDO01BQzdCO0FBQUEsQUFFQSxTQUFHLE9BQU8sRUFBSSxLQUFHLENBQUM7QUFDbEIsU0FBRyxPQUFPLEVBQUksRUFBQSxDQUFDO0FBRWYsV0FBTyxtQkFBaUIsQ0FBQztJQUM3QjtBQW9CSixBQWpDVSxTQUFPLENBQUEsNkJBQWtCLEFBQUM7QUFlaEMsUUFBSSxPQUFLLEVBQUk7QUFDVCxBQUFJLFVBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxJQUFHLFNBQVMsQUFBQyxFQUFDLENBQUM7QUFJNUIsY0FBTSxDQUFBLEFBQUMsQ0FBQyxHQUFFLEVBQUUsT0FBSyxDQUFDLE9BQU8sQ0FBRztBQUN4QixhQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ2IsZUFBSyxFQUFJLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO1FBQzVCO0FBQUEsQUFFQSxXQUFHLE9BQU8sRUFBRSxDQUFDO0FBRWIsYUFBTyxPQUFLLENBQUM7TUFDakI7QUFFQSxhQUFPLENBQVAsVUFBUyxBQUFELENB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LENBQVQsVUFBVyxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDYixhQUFPLENBQUEsS0FBSSx3QkFBd0IsQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUcsRUFDdkMsQ0FBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDekQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFakUsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDbEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDMUQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDOUQsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sWUFBWSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENB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QUFTLENBQUc7QUFDZCx3Q0FBZ0IsSUFBSSxBQUFDLENBQUM7QUFBQywwQkFBQSxXQUFNO0FBQUcsMEJBQUEsQ0FBRyxDQUFBLEtBQUksRUFBRTtBQUFBLHdCQUFDLENBQUMsQ0FBQztBQUM1QyxtQ0FBUSxjQUFZLENBQUM7c0JBQ3pCO0FBQUEsb0JBQ0osS0FBTztBQUVILDRCQUFNLE1BQU0sQUFBQyxDQUFDLGtGQUFpRixDQUFDLENBQUM7b0JBQ3JHO0FBQUEsa0JBQ0o7QUFBQSxBQUdBLDBCQUFRLEVBQUk7QUFDUixvQkFBQSxDQUFHLENBQUEsS0FBSSxFQUFFO0FBQ1Qsb0JBQUEsQ0FBRyxDQUFBLEtBQUksRUFBRTtBQUFBLGtCQUNiLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDO2NBR047QUFBQTtBQTdDSixtQkFBWSxFQUFBLENBQUksQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLE1BQU0sT0FBTyxDQUFJLEdBQUUsQ0FBQTs7UUE4QzFDO0FBRUEsYUFBTyxrQkFBZ0IsQ0FBQztNQUM1QjtPQXBHTyxVQUFTLENBQWhCLFVBQWtCLEtBQUksQ0FBRyxDQUFBLFFBQU8sQ0FBRztBQUMvQixhQUFPLENBQUEsSUFBRyxNQUFNLEFBQUMsQ0FBQyxLQUFJLEVBQUksU0FBTyxDQUFDLENBQUEsQ0FBSSxTQUFPLENBQUM7TUFDbEQsRUF0aEJ3RixDQUFDO0VBQ3JGLEFBQUMsRUFBQzs7QUFIVixTQUFBLGFBQXdCO0FBQUUsZ0JBQXdCO0lBQUUsRUFBN0I7Ozs7QUFBdkIsQUFBSSxJQUFBLENBQUEsWUFBVyxvQkFBb0IsQ0FBQztJQ0E3QixJQUFFO0FBRVQsRUFBQSxBQUFDLENBQUMsU0FBVSxBQUFELENBQUc7QUFDVixBQUFJLE1BQUEsQ0FBQSxHQUFFLEVBQUksSUFBSSxJQUFFLEFBQUMsQ0FBQyxZQUFXLENBQUcsR0FBQyxDQUFDLENBQUM7RUEyRXZDLENBQUMsQ0FBQztBQTlFRixXQUF1QiIsImZpbGUiOiIvaG9tZS93YXJhbi9Ta29sYS9ycC9jb2RlL3RlbXBvdXRNQzQxTXpnM09EWXpNRFU1TnpZMk16RTIuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGwsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzaW5nbGV0b24gdG8gZ2VuZXJhdGUgdW5pcXVlIGlkJ3NcbmxldCBleGlzdGluZ0lkSW5zdGFuY2UgPSBudWxsO1xuLy8gdXNhZ2U6IGxldCBpZCA9IG5ldyBJZCgpLnVuaXF1ZVxuZXhwb3J0IGNsYXNzIElkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYoIWV4aXN0aW5nSWRJbnN0YW5jZSl7XG4gICAgICAgICAgICBleGlzdGluZ0lkSW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVmaXggPSBcImlkXCI7XG4gICAgICAgIHRoaXMubmV4dElkID0gMDtcblxuICAgICAgICByZXR1cm4gZXhpc3RpbmdJZEluc3RhbmNlO1xuICAgIH1cblxuICAgIGdldCB1bmlxdWUoKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSB0aGlzLmdlbmVyYXRlKCk7XG5cbiAgICAgICAgLy8gZmluZCBuZXh0IHVudXNlZCBpZFhYWFggdG8gcHJldmVudCBpZCBjb2xsaXNpb24gdGhhdCBtaWdodCBiZSBjYXVzZWQgYnkgc29tZSBvdGhlciBjb21wb25lbnRcbiAgICAgICAgLy8gKGl0IHJlYWxseSBzaG91bGQgbm90IGhhcHBlbiwgYnV0IHRoaXMgaXMgYSBzaW1wbGUgbWV0aG9kIHRvIGVuc3VyZSBzYWZldHkpXG4gICAgICAgIHdoaWxlKCQoXCIjXCIrcmV0VmFsKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dElkKys7XG4gICAgICAgICAgICByZXRWYWwgPSB0aGlzLmdlbmVyYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMgaWRcbiAgICAgICAgdGhpcy5uZXh0SWQrKztcblxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cblxuICAgIGdlbmVyYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggKyB0aGlzLm5leHRJZDtcbiAgICB9XG59XG5cbi8vIHRvIGVzNSBjb21waWxlciBmcmllbmRseSBpbXBsZW1lbnRhdGlvbiAoY2FsbGluZyBhIGJ1aWx0aW4gTWFwIGNvbnN0cnVjdG9yIHdpdGhvdXQgbmV3IGlzIGZvcmJpZGRlblxuZXhwb3J0IGNsYXNzIE1hcFdpdGhEZWZhdWx0VmFsdWUge1xuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdFZhbHVlO1xuXG5cbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnNpemU7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5jbGVhcigpO1xuICAgIH1cblxuICAgIGZvckVhY2goLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZm9yRWFjaCguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5kZWxldGUoa2V5KTtcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmhhcyhrZXkpO1xuICAgIH1cblxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5lbnRyaWVzKCk7XG4gICAgfVxuXG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmtleXMoKTtcbiAgICB9XG5cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC52YWx1ZXMoKTtcbiAgICB9XG59XG5cbi8qXG4vLyBlczYgaW1wbGVtZW50YXRpb25cbmV4cG9ydCBjbGFzcyBNYXBXaXRoRGVmYXVsdFZhbHVlIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmRlZmF1bHQgPSBkZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBpZih0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgfVxufVxuKi8iLCJpbXBvcnQgKiBhcyBTdHJ1Y3R1cmVzIGZyb20gJy4vc3RydWN0dXJlc0FuZENsYXNzZXMuanMnXG5cbmNsYXNzIFRhZyB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICB0aGlzLnRhZ05hbWUgPSB0YWdOYW1lO1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjxcIit0aGlzLnRhZ05hbWUrXCI+XCIpO1xuXG4gICAgICAgIHRoaXMuaWQgPSBuZXcgU3RydWN0dXJlcy5JZCgpLnVuaXF1ZTtcbiAgICB9XG5cbiAgICBhZGRDbGFzcyhuYW1lKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKG5hbWUpO1xuICAgIH1cblxuICAgIHJlbW92ZUNsYXNzZXMoLi4uY2xhc3Nlcykge1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgY2xhc3Nlcykge1xuICAgICAgICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRBdHRyKGFzc29jKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuXG4gICAgICAgIC8vIGFkZCBhdHRyaWJ1dGVzIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMuJGVsLmF0dHIoYXNzb2MpO1xuICAgIH1cblxuICAgIGdldEF0dHIobmFtZSkge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcblxuICAgICAgICByZXR1cm4gdGhpcy4kZWwuYXR0cihuYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVBdHRyKG5hbWUpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG5cbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlQXR0cihuYW1lKTtcbiAgICB9XG5cbiAgICBzZXQgaWQoaWQpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcImlkXCI6IGlkfSk7XG4gICAgfTtcblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cihcImlkXCIpO1xuICAgIH07XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuICAgICAgICByZXR1cm4gdGhpcy4kZWw7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGVsZW1lbnQgZXhpc3RzIGluIGRvbSwgd2UgbmVlZCB0byBmZXRjaCBpdCB1c2luZyBqUXVlcnlcbiAgICBjaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCkge1xuICAgICAgICBsZXQgJGpxRWxlbWVudCA9ICQoXCIjXCIrdGhpcy4kZWwuYXR0cignaWQnKSk7XG4gICAgICAgIGlmKCRqcUVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICRqcUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIERyYWdnYWJsZSBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcbiAgICB9XG5cbiAgICBkcmFnZ2FibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcImRyYWdnYWJsZVwiOiB2YWx1ZX0pO1xuICAgIH1cbn1cblxuY2xhc3MgUm90YXRhYmxlIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHJvdGF0YWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wicm90YXRhYmxlXCI6IHZhbHVlfSk7XG4gICAgfVxufVxuXG4vLyB0aGVyZSBpcyBubyBtdWx0aXBsZSBpbmhlcml0YW5jZSBpbiBFUzYsIHNvIEkgaGF2ZSB0byBkbyBzb21ldGhpbmcgdWdseSBsaWtlIHRoaXNcbmNsYXNzIERyYWdnYWJsZVJvdGF0YWJsZSBleHRlbmRzIERyYWdnYWJsZSB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcbiAgICB9XG5cbiAgICByb3RhdGFibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcInJvdGF0YWJsZVwiOiB2YWx1ZX0pO1xuICAgIH1cbn1cblxuY2xhc3MgU3ZnRWxlbWVudCBleHRlbmRzIERyYWdnYWJsZVJvdGF0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgdGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcblxuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTdmdFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoLCBmaWxsLCBzdHJva2UpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgdywgaCwgXCJyZWN0XCIpO1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgZmlsbDogZmlsbCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlLFxuICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IDAuNSxcbiAgICAgICAgICAgICdwb2ludGVyLWV2ZW50cyc6ICdhbGwnIC8vIHRvIHRyaWdnZXIgaG92ZXIgZXZlbiB3aXRoIHRyYW5zcGFyZW50IGJhY2tncm91bmRcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3ZnSW1hZ2UgZXh0ZW5kcyBTdmdFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoLCB1cmwpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgdywgaCwgXCJpbWFnZVwiKTtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIFwieGxpbms6aHJlZlwiOiB1cmxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlVXJsKHVybCkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgXCJ4bGluazpocmVmXCI6IHVybFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm91cCBleHRlbmRzIERyYWdnYWJsZVJvdGF0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiZ1wiKTtcbiAgICB9XG5cbiAgICBhZGRDaGlsZChlbCkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoZWwuJGVsKTtcbiAgICAgICAgcmV0dXJuIGVsOyAvLyBwcm8gamVkbm9kdXNzaSBcImxldCByZWN0ID0gZy5hZGRDaGlsZChuZXcgUmVjdGFuZ2xlKC4uLlwiXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9seWxpbmVQb2ludCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICBpZih4ICE9PSB1bmRlZmluZWQgJiYgeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCh4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlRnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgbGV0IGFyciA9IHN0cmluZy5zcGxpdChcIixcIik7XG4gICAgICAgIHJldHVybiBuZXcgUG9seWxpbmVQb2ludChhcnJbMF0sIGFyclsxXSk7XG4gICAgfVxuXG4gICAgZ2V0IHN0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIFwiLFwiICsgdGhpcy55O1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbHMoYSwgYikge1xuICAgICAgICByZXR1cm4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnk7XG4gICAgfVxufVxuXG5jbGFzcyBTbWFydEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcbiAgICAgICAgaWYoYXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyID0gYXJyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcnIgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBTbWFydEFycmF5KCQuZXh0ZW5kKHRydWUsIFtdLCB0aGlzLmFycikpO1xuICAgIH1cblxuICAgIGFwcGVuZChwb2ludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRXaXRoSW5kZXgocG9pbnQsIHRoaXMuYXJyLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgcHJlcGVuZChwb2ludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRXaXRoSW5kZXgocG9pbnQsIDApO1xuICAgIH1cblxuICAgIC8vIGFkZCBhIHBvaW50IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXgsIG1vdmUgYWxsIGZvbGxvd2luZyBpdGVtc1xuICAgIGFkZFdpdGhJbmRleChwb2ludCwgaW5kZXgpIHtcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy5hcnIubGVuZ3RoIDsgaSA+IGluZGV4IDsgLS1pKSB7XG4gICAgICAgICAgICB0aGlzLmFycltpXSA9IHRoaXMuYXJyW2ktMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcnJbaW5kZXhdID0gcG9pbnQ7XG4gICAgICAgIHJldHVybiB0aGlzOyAvLyB0byBlbmFibGUgY2hhaW5pbmcgb2YgYXBwZW5kIC8gcHJlcHBlbmQgLyBhZGRXaXRoSW5kZXggY29tbWFuZHNcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnIubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldEl0ZW0oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyW2luZGV4XTtcbiAgICB9XG5cbiAgICBnZXQgbGFzdCgpIHtcbiAgICAgICAgaWYodGhpcy5sZW5ndGghPT0wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJbdGhpcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBmaXJzdCgpIHtcbiAgICAgICAgaWYodGhpcy5sZW5ndGghPT0wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbmRleEFycmF5IG11c3QgYmUgc29ydGVkIChBU0MsIGVnLiBbMSwgMywgNCwgOF0pXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcblxuICAgICAgICBmb3IobGV0IGkgPSBpbmRleCA7IGkgPCBsZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyW2ldID0gdGhpcy5hcnJbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJyLnBvcCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvbHlsaW5lUG9pbnRzIGV4dGVuZHMgU21hcnRBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgICAgIHN1cGVyKGFycik7XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2x5bGluZVBvaW50cygkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5hcnIpKTtcbiAgICB9XG5cbiAgICBhcHBlbmQocG9pbnQpIHtcbiAgICAgICAgLy8gY2FsbCBpbmhlcml0ZWQgZnVuY3Rpb24gdG8gaGFuZGxlIHRoZSBhcHBlbmRpbmdcbiAgICAgICAgc3VwZXIuYXBwZW5kKHBvaW50KTtcblxuICAgICAgICAvLyBpZiB0aGUgc2Vjb25kIHRvIGxhc3QgcG9pbnQgaXMgdW5uZWNlc3NhcnksIHJlbW92ZSBpdFxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICAgIGlmICggbGVuZ3RoID49IDNcbiAgICAgICAgICAgICAgICAmJiAoICAgICggdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDMpLnggPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS54ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS54ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMSkueCApXG4gICAgICAgICAgICAgICAgICAgICB8fCAoIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAzKS55ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueSA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDEpLnkgKVxuICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShsZW5ndGggLSAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiB0aGlzIGVsZW1lbnQgKHRvIGFsbG93IGNoYWluaW5nKVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIHN0YXRpYyBwYXJzZUZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIGxldCBwb2ludFN0cmluZ3MgPSBzdHJpbmcuc3BsaXQoXCIgXCIpO1xuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IFBvbHlsaW5lUG9pbnRzKCk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBwb2ludFN0cmluZ3MubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBwb2ludHMuYXBwZW5kKFBvbHlsaW5lUG9pbnQucGFyc2VGcm9tU3RyaW5nKHBvaW50U3RyaW5nc1tpXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBvaW50cztcbiAgICB9XG5cbiAgICBnZXQgc3RyaW5nKCkge1xuICAgICAgICBsZXQgc3RyaW5nID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgaWYoaSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmluZyArPSB0aGlzLmFycltpXS5zdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICB9XG5cbiAgICBmb3JFYWNoKGZ1bmMpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmFyci5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIGZ1bmModGhpcy5hcnJbaV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9seUxpbmUgZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHBvaW50cywgY29sb3IsIHN0cm9rZVdpZHRoKSB7XG4gICAgICAgIHN1cGVyKFwicG9seWxpbmVcIik7XG5cbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIHBvaW50czogcG9pbnRzLnN0cmluZyxcbiAgICAgICAgICAgIHN0cm9rZTogY29sb3IsXG4gICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgIFwic3Ryb2tlLXdpZHRoXCI6IHN0cm9rZVdpZHRoXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVBvaW50cyhwb2ludHMpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIHBvaW50czogcG9pbnRzLnN0cmluZ1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXR0ZXJuIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihcInBhdHRlcm5cIik7XG5cbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICBwYXR0ZXJuVW5pdHM6IFwidXNlclNwYWNlT25Vc2VcIixcbiAgICAgICAgICAgIHZpZXdCb3g6IFwiMCAwIFwiK3dpZHRoK1wiIFwiK2hlaWdodFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRDaGlsZChlbCkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoZWwuJGVsKTtcbiAgICAgICAgcmV0dXJuIGVsOyAvLyBwcm8gamVkbm9kdXNzaSBcImxldCByZWN0ID0gZy5hZGRDaGlsZChuZXcgUmVjdGFuZ2xlKC4uLlwiXG4gICAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBsb2dpYyBmdW5jdGlvbnMgdXNlZCBpbiB0aGUgZ2F0ZSBldmFsdWF0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpYyB7XG4gICAgc3RhdGljIGFuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy50ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBbXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub2ZmXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBzdGF0aWMgbmFuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy5ub3QoTG9naWMuYW5kKGEsIGIpKTtcbiAgICB9XG4gICAgc3RhdGljIG5vcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy5ub3QoTG9naWMub3IoYSwgYikpO1xuICAgIH1cbiAgICBzdGF0aWMgbm90KGEpIHtcbiAgICAgICAgaWYoYSA9PT0gTG9naWMuc3RhdGUub24pIHtcbiAgICAgICAgICAgIHJldHVybiBMb2dpYy5zdGF0ZS5vZmY7XG4gICAgICAgIH0gZWxzZSBpZiAoYSA9PT0gTG9naWMuc3RhdGUub2ZmKSB7XG4gICAgICAgICAgICByZXR1cm4gTG9naWMuc3RhdGUub247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgb3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMudGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgW1xuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUudW5rbm93bl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgc3RhdGljIHhub3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMubm90KExvZ2ljLnhvcihhLCBiKSk7XG4gICAgfVxuICAgIHN0YXRpYyB4b3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMudGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgW1xuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUudW5rbm93bl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdW5rbm93bjogMCxcbiAgICAgICAgICAgIG9uOiAxLFxuICAgICAgICAgICAgb2ZmOiAyLFxuICAgICAgICAgICAgb3NjaWxsYXRpbmc6IDNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB0ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBydWxlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBydWxlcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKChydWxlc1tpXVswXT09PWEgJiYgcnVsZXNbaV1bMV09PT1iKSB8fCAocnVsZXNbaV1bMF09PT1iICYmIHJ1bGVzW2ldWzFdPT09YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnVsZXNbaV1bMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0ICogYXMgc3ZnT2JqIGZyb20gJy4vc3ZnT2JqZWN0cy5qcydcbmltcG9ydCAqIGFzIFN0cnVjdHVyZXMgZnJvbSAnLi9zdHJ1Y3R1cmVzQW5kQ2xhc3Nlcy5qcydcbmltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuXG4vLyBtYXBwaW5nIGxvZ2ljYWwgc3RhdGVzIHRvIGNzcyBjbGFzc2VzXG5jb25zdCBzdGF0ZUNsYXNzZXMgPSB7XG4gICAgb246IFwic3RhdGVPblwiLFxuICAgIG9mZjogXCJzdGF0ZU9mZlwiLFxuICAgIHVua25vd246IFwic3RhdGVVbmtub3duXCIsXG4gICAgb3NjaWxsYXRpbmc6IFwic3RhdGVPc2NpbGxhdGluZ1wiXG59O1xuXG4vLyBoZWxwZXIgY2xhc3MgdXNlZCBieSBUcmFuc2Zvcm1cbmNsYXNzIFByb3BlcnR5IHtcbiAgICBjb25zdHJ1Y3RvcihzdHJpbmcpIHtcbiAgICAgICAgaWYoc3RyaW5nIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBzdHJpbmcucmVwbGFjZSgvXlsgXSooW14oXSspLiovLCBcIiQxXCIpO1xuICAgICAgICAgICAgdGhpcy5hcmdzID0gc3RyaW5nLnJlcGxhY2UoL15bXihdK1xcKCguKilcXCkvLCBcIiQxXCIpLnNwbGl0KCcgJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXRBcmd1bWVudHMoYXJncykge1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiKFwiICsgdGhpcy5hcmdzLmpvaW4oXCIgXCIpICsgXCIpXCI7XG4gICAgfVxufVxuXG4vLyB1c2VkIHRvIG1hbmlwdWxhdGUgdGhlIHRyYW5zZm9ybSBhcmd1bWVudCB1c2VkIGluIFNWR1xuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybSB7XG4gICAgY29uc3RydWN0b3Ioc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcblxuICAgICAgICBpZihzdHJpbmchPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBzcGxpdEl0ZW1zID0gc3RyaW5nLnNwbGl0KFwiKVwiKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgc3BsaXRJdGVtcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihzcGxpdEl0ZW1zW2ldKSB7IC8vIGlmIG5vdCBlbXB0eVxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IFByb3BlcnR5KHNwbGl0SXRlbXNbaV0gKyBcIilcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgaW5kZXggb3IgLTFcbiAgICBnZXRJbmRleChuYW1lKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYobmFtZSA9PT0gdGhpcy5pdGVtc1tpXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNsYXRlKCkge1xuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZ2V0QXJndW1lbnRzKHRoaXMuZ2V0SW5kZXgoXCJ0cmFuc2xhdGVcIikpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBhcmdzWzBdLFxuICAgICAgICAgICAgeTogYXJnc1sxXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Um90YXRlKCkge1xuICAgICAgICBsZXQgYXJncyA9IHRoaXMuZ2V0QXJndW1lbnRzKHRoaXMuZ2V0SW5kZXgoXCJyb3RhdGVcIikpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZWc6IGFyZ3NbMF0sXG4gICAgICAgICAgICBjZW50cmVYOiBhcmdzWzFdLFxuICAgICAgICAgICAgY2VudHJlWTogYXJnc1syXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0cyB0aGUgdHJhbnNsYXRpb25cbiAgICBzZXRUcmFuc2xhdGUoeCwgeSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihcInRyYW5zbGF0ZVwiLCBbeCwgeV0pO1xuICAgIH1cblxuICAgIC8vIHNldHMgdGhlIHJvdGF0aW9uXG4gICAgc2V0Um90YXRlKGRlZywgY2VudHJlWCwgY2VudHJlWSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihcInJvdGF0ZVwiLCBbZGVnLCBjZW50cmVYLCBjZW50cmVZXSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHRoZSByb3RhdGlvblxuICAgIHJvdGF0ZVJpZ2h0KGNlbnRyZVgsIGNlbnRyZVkpIHtcbiAgICAgICAgaWYodGhpcy5nZXRJbmRleChcInJvdGF0ZVwiKT09PS0xKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJvdGF0ZSg5MCwgY2VudHJlWCwgY2VudHJlWSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbmV3Um90YXRpb24gPSAocGFyc2VJbnQodGhpcy5nZXRSb3RhdGUoKS5kZWcpICsgOTApICUgMzYwO1xuXG4gICAgICAgICAgICBpZihuZXdSb3RhdGlvbj09PTE4MCkge1xuICAgICAgICAgICAgICAgIC8vIHN3YXAgY2VudHJlIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgLy8gYmVjYXVzZSByb3RhdGUoYywgeCwgeSkgaXMgZGVmaW5lZCBsaWtlIHRyYW5zZm9ybSgteCwgLXkpIHJvdGF0ZShjKSB0cmFuc2Zvcm0oeCwgeSlcbiAgICAgICAgICAgICAgICBsZXQgYSA9IGNlbnRyZVg7XG4gICAgICAgICAgICAgICAgY2VudHJlWCA9IGNlbnRyZVk7XG4gICAgICAgICAgICAgICAgY2VudHJlWSA9IGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Um90YXRlKFxuICAgICAgICAgICAgICAgIG5ld1JvdGF0aW9uLFxuICAgICAgICAgICAgICAgIGNlbnRyZVgsXG4gICAgICAgICAgICAgICAgY2VudHJlWVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0aWVzIGNvbmNhdGVuYXRlZFxuICAgIGdldCgpIHtcbiAgICAgICAgbGV0IHJldFZhbCA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGkhPT0wKSB7XG4gICAgICAgICAgICAgICAgcmV0VmFsICs9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0VmFsICs9IHRoaXMuaXRlbXNbaV0uZ2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG5cbiAgICBnZXRBcmd1bWVudHMoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNbaW5kZXhdLmFyZ3M7XG4gICAgfVxuXG4gICAgc2V0UGFyYW1ldGVyKG5hbWUsIGFyZ3MpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGluZGV4IG9mIHRoZSBwYXJhbWV0ZXIgKGlmIHNldCksIGVsc2UgaW5kZXggPT0gLTFcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleChuYW1lKTtcblxuICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaGFzIGJlZW4gYWxyZWFkeSBzZXQsIGNoYW5nZSBpdCAocmV3cml0ZSB0aGUgYXJyYXkgaW4gdGhlIHJpZ2h0IGluZGV4KVxuICAgICAgICAvLyBlbHNlIGNyZWF0ZSBhIG5ldyBvbmUgKHNldCBpbmRleCB0byB0aGUgbGVuZ3RoIG9mIGFuIGFycmF5IC0tPiBhZCBhbiBpdGVtIHRvIHRoZSBlbmQpXG4gICAgICAgIGlmKGluZGV4PT09LTEpIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLml0ZW1zW2luZGV4XSA9IG5ldyBQcm9wZXJ0eSgpO1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uc2V0TmFtZShuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNhdmUgYXJncyB1bmRlciB0aGUgcmlnaHQgaW5kZXhcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uc2V0QXJndW1lbnRzKGFyZ3MpO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBhbGwgbmV0d29yayBlbGVtZW50c1xuY2xhc3MgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICBpZighcGFyZW50U1ZHKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUGFyZW50IFNWRyBlbGVtZW50IGhhcyBub3QgYmVlbiBkZWZpbmVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcblxuICAgICAgICAvLyB1c2VkIHRvIHN0b3JlIHRoZSBzdmpPYmplY3QncyBpbnN0YW5jZSBvZiB0aGlzIGVsZW1lbnRcbiAgICAgICAgdGhpcy5zdmdPYmogPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdmdPYmouaWQ7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uIHRvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMsIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGxhdGVyIGluIHRoZSBCb3ggY2xhc3NcbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uIHRvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMsIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGxhdGVyIGluIHRoZSBCb3ggYW5kIENvbm5lY3RvciBjbGFzc2VzXG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uIHRvIHByZXZlbnQgZXJyb3IgbWVzc2FnZXMsIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGxhdGVyIGluIHRoZSBCb3ggY2xhc3NcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIidqc29uJyBnZXR0ZXIgaGFzIG5vdCBiZWVuIGRlZmluZWQgZm9yIHRoaXMgZWxlbWVudFwiLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbi8vIHBhcmVudCBjbGFzcyBmb3IgaW5wdXQgYW5kIG91dHB1dCBjb25uZWN0b3JzICh0aGUgdGhpbmdzIHlvdSBjbGljayBvblxuLy8gd2hlbiB5b3Ugd2FudCB0byBjb25uZWN0IGVsZW1lbnRzKVxuY2xhc3MgQ29ubmVjdG9yIGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkgeyAvLyB1bml0IG9mIGxlZnQgLyB0b3AgaXMgdGhlIHNpemUgb2YgdGhlIGdyaWRcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHKTtcblxuICAgICAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2l6ZSA9IGdyaWRTaXplO1xuICAgICAgICB0aGlzLmNvbm5lY3Rvck9mZnNldCA9IHRoaXMuY29ubmVjdG9yU2l6ZSAvIDI7XG5cbiAgICAgICAgdGhpcy5zdmdPYmogPSBuZXcgc3ZnT2JqLlJlY3RhbmdsZShcbiAgICAgICAgICAgIGxlZnQgKiB0aGlzLmdyaWRTaXplIC0gdGhpcy5jb25uZWN0b3JPZmZzZXQsXG4gICAgICAgICAgICB0b3AgKiB0aGlzLmdyaWRTaXplIC0gdGhpcy5jb25uZWN0b3JPZmZzZXQsXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNpemUsXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNpemUsXG4gICAgICAgICAgICBcIm5vbmVcIixcbiAgICAgICAgICAgIFwiYmxhY2tcIlxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcImNvbm5lY3RvclwiKTtcblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGlmIGEgd2lyZSBjYW4gc2V0IGNvbm5lY3RvcidzIHN0YXRlXG4gICAgICAgIHRoaXMuaXNJbnB1dENvbm5lY3RvciA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gTG9naWMuc3RhdGUudW5rbm93bjtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuXG4gICAgICAgIHRoaXMud2lyZUlkcyA9IG5ldyBTZXQoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnB1dENvbm5lY3RvcjogMCxcbiAgICAgICAgICAgIG91dHB1dENvbm5lY3RvcjogMVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkV2lyZUlkKHdpcmVJZCkge1xuICAgICAgICB0aGlzLndpcmVJZHMuYWRkKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZUlkKHdpcmVJZCkge1xuICAgICAgICB0aGlzLndpcmVJZHMuZGVsZXRlKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlcyB0aGUgd2lyZSBhbmQgdXBkYXRlcyB0aGUgY29ubmVjdG9yXG4gICAgcmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVdpcmVJZCh3aXJlSWQpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlLCBwcm9wYWdhdGlvbklkKSB7XG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLnVua25vd246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vZmY6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9mZik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IHN0YXRlO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVBdHRyO1xuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqO1xuICAgIH1cblxuICAgIG9uTW91c2VVcCgpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcud2lyZUNyZWF0aW9uSGVscGVyKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dENvbm5lY3RvciBleHRlbmRzIENvbm5lY3RvciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG5cblxuICAgICAgICB0aGlzLnR5cGUgPSBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3RvcjtcbiAgICAgICAgdGhpcy5pc0lucHV0Q29ubmVjdG9yID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSwgcHJvcGFnYXRpb25JZCkge1xuICAgICAgICAvLyBnZXQgbG9vcEd1YXJkIGluZm9cbiAgICAgICAgbGV0IGxvb3BHdWFyZCA9IHRoaXMucGFyZW50U1ZHLmxvb3BHdWFyZChwcm9wYWdhdGlvbklkLCB0aGlzLnN2Z09iai5pZCwgc3RhdGUpO1xuXG4gICAgICAgIHN1cGVyLnNldFN0YXRlKGxvb3BHdWFyZC5zdGF0ZSwgcHJvcGFnYXRpb25JZCk7XG5cbiAgICAgICAgaWYobG9vcEd1YXJkLnN0b3BQcm9wYWdhdGlvbj09PWZhbHNlKSB7XG4gICAgICAgICAgICAvLyBwcm9jZXNzIGlucHV0cyBpbiB0aGUgZ2F0ZSB0aGlzIGNvbm5lY3RvciBiZWxvbmdzIHRvXG4gICAgICAgICAgICBsZXQgZ2F0ZSA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQodGhpcy5zdmdPYmouaWQpO1xuICAgICAgICAgICAgZ2F0ZS5yZWZyZXNoU3RhdGUocHJvcGFnYXRpb25JZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKSB7XG4gICAgICAgIHN1cGVyLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24sIHRoaXMucGFyZW50U1ZHLmdldE5ld1Byb3BhZ2F0aW9uSWQoKSk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIuc3RhdGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0Q29ubmVjdG9yIGV4dGVuZHMgQ29ubmVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApIHtcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKTtcblxuICAgICAgICAvLyB1c2VkIHRvIHNldCB0aGUgd2lyZSBzdGF0ZSBkdXJpbmcgd2lyZSBpbml0aWFsaXphdGlvbiBiYXNlZCBvbiB0aGUgb3V0cHV0IGNvbm5lY3RvciBzdGF0ZVxuICAgICAgICB0aGlzLmlzT3V0cHV0ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnR5cGUgPSBDb25uZWN0b3IudHlwZS5vdXRwdXRDb25uZWN0b3I7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUsIHByb3BhZ2F0aW9uSWQpIHtcbiAgICAgICAgLy8gZ2V0IGxvb3BHdWFyZCBpbmZvXG4gICAgICAgIGxldCBsb29wR3VhcmQgPSB0aGlzLnBhcmVudFNWRy5sb29wR3VhcmQocHJvcGFnYXRpb25JZCwgdGhpcy5zdmdPYmouaWQsIHN0YXRlKTtcblxuICAgICAgICBzdXBlci5zZXRTdGF0ZShsb29wR3VhcmQuc3RhdGUsIHByb3BhZ2F0aW9uSWQpO1xuXG4gICAgICAgIGlmKGxvb3BHdWFyZC5zdG9wUHJvcGFnYXRpb249PT1mYWxzZSkge1xuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBzdGF0ZSBvZiBhIHdpcmUgdGhpcyBjb25uZWN0b3IgaXMgY29ubmVjdGVkIHRvIChpZiBjb25uZWN0ZWQpXG4gICAgICAgICAgICB0aGlzLndpcmVJZHMuZm9yRWFjaCgod2lyZUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZ2V0V2lyZUJ5SWQod2lyZUlkKVxuICAgICAgICAgICAgICAgICAgICAuc2V0U3RhdGUoc3RhdGUsIHByb3BhZ2F0aW9uSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGF0ZTtcbiAgICB9XG59XG5cbi8vIHBhcmVudCBjbGFzcyBmb3IgZ2F0ZXMgYW5kIGlucHV0IGFuZCBvdXRwdXQgYm94ZXNcbmNsYXNzIEJveCBleHRlbmRzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIG5hbWUsIGNhdGVnb3J5LCBncmlkV2lkdGgsIGdyaWRIZWlnaHQpIHtcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSB0aGlzLnBhcmVudFNWRy5ncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLnVybCA9IFwiaW1nL1wiICsgdGhpcy5jYXRlZ29yeSArIFwiL1wiICsgdGhpcy5uYW1lICsgXCIuc3ZnXCI7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0b3JzID0gW107XG5cbiAgICAgICAgdGhpcy5zdmdPYmogPSBuZXcgc3ZnT2JqLkdyb3VwKCk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IGdyaWRXaWR0aCAqIHRoaXMuZ3JpZFNpemU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZ3JpZEhlaWdodCAqIHRoaXMuZ3JpZFNpemU7XG5cbiAgICAgICAgdGhpcy5ncmlkV2lkdGggPSBncmlkV2lkdGg7XG4gICAgICAgIHRoaXMuZ3JpZEhlaWdodCA9IGdyaWRIZWlnaHQ7XG5cbiAgICAgICAgLy8gdHJhbnNwYXJlbnQgYmFja2dyb3VuZCByZWN0YW5nbGVcbiAgICAgICAgbGV0IHJlY3RhbmdsZSA9IG5ldyBzdmdPYmouUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBcIm5vbmVcIiwgXCJub25lXCIpO1xuICAgICAgICByZWN0YW5nbGUuJGVsLmFkZENsYXNzKCdyZWN0Jyk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENoaWxkKHJlY3RhbmdsZSk7XG4gICAgICAgIC8vIGltYWdlIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgc3ZnT2JqLlN2Z0ltYWdlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLnVybCk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENoaWxkKHRoaXMuaW1hZ2UpO1xuXG4gICAgICAgIC8vIGFkZCBkcmFnZ2FiaWxpdHkgYW5kIHJvdGF0YWJpbGl0eVxuICAgICAgICB0aGlzLnN2Z09iai5kcmFnZ2FibGUodHJ1ZSk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLnJvdGF0YWJsZSh0cnVlKTtcblxuICAgICAgICAvLyBhZGQgdHlwZT1cImdhdGVcIiwgdXNlZCBpbiBzcGVjaWFsIGNhbGxiYWNrcyBpbiBjb250ZXh0bWVudVxuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInR5cGVcIjogY2F0ZWdvcnl9KTtcblxuICAgICAgICB0aGlzLnN2Z09iai4kZWwuYWRkQ2xhc3MoXCJib3hcIik7XG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhjYXRlZ29yeSk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZUJsb2NrTm9kZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgbGV0IGNvbm5lY3Rpb25zID0gW107XG5cbiAgICAgICAgLy8gZ28gdGhyb3VnaCBhbGwgY29ubmVjdG9yc1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLmNvbm5lY3RvcnMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICAvLyBmb3IgYWxsIGNvbm5lY3RvciB0aGF0IGhhcyBhdCBsZWFzdCBvbmUgd2lyZSBjb25uZWN0ZWRcbiAgICAgICAgICAgIGlmKHRoaXMuY29ubmVjdG9yc1tpXS53aXJlSWRzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZ28gdGhyb3VnaCBlYWNoIGl0cyB3aXJlIGlkXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzW2ldLndpcmVJZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGhpc1dpcmVJZDtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZE1hcC5oYXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB3aXJlIGlkIGlzIG5vdCBpbiB0aGUgbWFwLCBhZGQgaXQgYW5kIGFzc2lnbiBuZXcgYXJiaXRyYXJ5IGlkXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuc2V0KGl0ZW0sIHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzV2lyZUlkID0gdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkKys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGdldCBpZCBmcm9tIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNXaXJlSWQgPSB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuZ2V0KGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhpcyBjb25uZWN0aW9uIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25zW2Nvbm5lY3Rpb25zLmxlbmd0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuY29ubmVjdG9yc1tpXS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lyZUlkOiB0aGlzV2lyZUlkXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgLy8gaWQ6IHRoaXMuc3ZnT2JqLmlkLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuZ2V0VHJhbnNmb3JtKCksXG4gICAgICAgICAgICBjb25uZWN0aW9uczogY29ubmVjdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMobWFyZ2luVG9wID0gMCwgbWFyZ2luUmlnaHQgPSAwLCBtYXJnaW5Cb3R0b20gPSAwLCBtYXJnaW5MZWZ0ID0gMCwgLi4uc3BlY2lhbE5vZGVzKSB7XG4gICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IobGV0IHggPSBtYXJnaW5MZWZ0IDsgeCA8PSB0aGlzLmdyaWRXaWR0aCAtIG1hcmdpblJpZ2h0IDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IHkgPSBtYXJnaW5Ub3AgOyB5IDw9IHRoaXMuZ3JpZEhlaWdodCAtIG1hcmdpbkJvdHRvbSA7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2Ygc3BlY2lhbE5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5hZGQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uLCByZWRlZmluZWQgaW4gaW5oZXJpdGVkIGVsZW1lbnRzXG4gICAgICAgIC8vIHJlZnJlc2hTdGF0ZSB0YWtlcyBpbnB1dCBjb25uZWN0b3IgdmFsdWVzIGFuZCBzZXRzIG91dHB1dCB2YWx1ZXMgYWNjb3JkaW5nbHlcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ2FsbGluZyB0aGUgdmlydHVhbCBmdW5jdGlvbiByZWZyZXNoU3RhdGUgaGFzIG5vIGVmZmVjdC5cIik7XG4gICAgfVxuXG4gICAgLy8gdXNhZ2U6IGNoYW5nZUltYWdlKFwiYWJjXCIpIGNoYW5nZXMgaW1hZ2UgdXJsIHRvIGltYWdlLWFiYy5zdmdcbiAgICAvLyAgICAgICAgY2hhbmdlSW1hZ2UoKSBjaGFuZ2VzIGltYWdlIHVybCB0byB0aGUgZGVmYXVsdCBvbmUgKGltYWdlLnN2ZylcbiAgICBjaGFuZ2VJbWFnZShzdWZmaXgpIHtcbiAgICAgICAgaWYoc3VmZml4ID09PSB1bmRlZmluZWQgfHwgc3VmZml4ID09PSBcIlwiKSB7XG4gICAgICAgICAgICBzdWZmaXggPSBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VmZml4ID0gXCItXCIgKyBzdWZmaXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cmwgPSBcImltZy9cIiArIHRoaXMuY2F0ZWdvcnkgKyBcIi9cIiArIHRoaXMubmFtZSArIHN1ZmZpeCArIFwiLnN2Z1wiO1xuXG4gICAgICAgIHRoaXMuaW1hZ2UuY2hhbmdlVXJsKHRoaXMudXJsKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGEgalF1ZXJ5IG9iamVjdFxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqLmdldCgpO1xuICAgIH1cblxuICAgIHJlbW92ZUJsb2NrZWROb2RlKHgsIHkpIHtcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuYmxvY2tlZE5vZGVzKSB7XG4gICAgICAgICAgICBpZihpdGVtLng9PT14ICYmIGl0ZW0ueT09PXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5kZWxldGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByb3RhdGVCbG9ja2VkTm9kZXNSaWdodCgpIHtcbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbj09PXVuZGVmaW5lZCB8fCB0aGlzLnJvdGF0aW9uPT09NCkge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3RhdGlvbisrO1xuXG4gICAgICAgIGlmKHRoaXMucm90YXRpb24gPT09IDEgfHwgdGhpcy5yb3RhdGlvbiA9PT0gMykge1xuICAgICAgICAgICAgbGV0IG5ld0Jsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBuZXdCbG9ja2VkTm9kZXMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5hYnMoaXRlbS55IC0gdGhpcy5ncmlkSGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgeTogaXRlbS54XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3QmxvY2tlZE5vZGVzO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5yb3RhdGlvbiA9PT0gMiB8fCB0aGlzLnJvdGF0aW9uID09PSA0KSB7XG4gICAgICAgICAgICBsZXQgbmV3QmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0Jsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmFicyhpdGVtLnkgLSB0aGlzLmdyaWRXaWR0aCksXG4gICAgICAgICAgICAgICAgICAgIHk6IGl0ZW0ueFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2RlcyA9IG5ld0Jsb2NrZWROb2RlcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENvbm5lY3RvcihsZWZ0LCB0b3AsIGNvbm5lY3RvclR5cGUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jb25uZWN0b3JzLmxlbmd0aDtcbiAgICAgICAgaWYoY29ubmVjdG9yVHlwZT09PUNvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbaW5kZXhdID0gbmV3IElucHV0Q29ubmVjdG9yKHRoaXMucGFyZW50U1ZHLCB0aGlzLmdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzW2luZGV4XSA9IG5ldyBPdXRwdXRDb25uZWN0b3IodGhpcy5wYXJlbnRTVkcsIHRoaXMuZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQodGhpcy5jb25uZWN0b3JzW2luZGV4XS5nZXQoKSk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVCbG9ja2VkTm9kZShsZWZ0LCB0b3ApO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIGNvbm5lY3RvciBvYmplY3QgYmFzZWQgb24gaXRzIGlkXG4gICAgZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuY29ubmVjdG9ycy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY29ubmVjdG9yc1tpXS5pZD09PWNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBjb25uZWN0b3Igbm90IGZvdW5kLCByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNmb3JtKCkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtO1xuICAgICAgICBpZiAoIXRoaXMuc3ZnT2JqLiRlbC5hdHRyKFwidHJhbnNmb3JtXCIpKSB7XG4gICAgICAgICAgICAvLyB0aGUgZWxlbWVudCBkb2VzIG5vdCBoYXZlIGEgXCJ0cmFuc2Zvcm1cIiBwcm9wZXJ0eSAtLT4gY3JlYXRlIGl0XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKCk7XG4gICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKDAsIDApO1xuICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGUgZWxlbWVudCBkb2VzIGhhdmUgYSBcInRyYW5zZm9ybVwiIHByb3BlcnR5IC0tPiBjaGFuZ2UgaXRcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcy5zdmdPYmouJGVsLmF0dHIoXCJ0cmFuc2Zvcm1cIikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm07XG4gICAgfVxuXG4gICAgc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInRyYW5zZm9ybVwiOiB0cmFuc2Zvcm0uZ2V0KCl9KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICB0aGlzLm1vdXNlTGVmdCA9IGZhbHNlO1xuICAgICAgICBpZihldmVudC53aGljaCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5tb3VzZUxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlRG93bkxlZnQoZXZlbnQpO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBET00gZWxlbWVudCB0byBmcm9udFxuICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcubW92ZVRvRnJvbnRCeUlkKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VEb3duTGVmdChldmVudCkge1xuICAgICAgICB0aGlzLm1vdXNlTW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcblxuICAgICAgICAvLyBzYXZlIHRoZSBjdXJyZW50IGl0ZW0gcG9zaXRpb24gaW50byBhIHZhcmlhYmxlXG4gICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSB0cmFuc2Zvcm0uZ2V0VHJhbnNsYXRlKCk7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIG1vdXNlIG9mZnNldCBmcm9tIHRoZSBvYmplY3Qgb3JpZ2luXG4gICAgICAgIHRoaXMub2Zmc2V0ID0ge1xuICAgICAgICAgICAgeDogZXZlbnQucGFnZVggLSBjdXJyZW50UG9zaXRpb24ueCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnBhZ2VZIC0gY3VycmVudFBvc2l0aW9uLnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZShldmVudCkge1xuICAgICAgICBpZih0aGlzLm1vdXNlTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgbGV0IGxlZnQgPSBldmVudC5wYWdlWCAtIHRoaXMub2Zmc2V0Lng7XG4gICAgICAgICAgICBsZXQgdG9wID0gZXZlbnQucGFnZVkgLSB0aGlzLm9mZnNldC55O1xuXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybS5zZXRUcmFuc2xhdGUobGVmdCwgdG9wKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVXaXJlcyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VVcChldmVudCkge1xuICAgICAgICBpZihldmVudC53aGljaCA9PT0gMSkge1xuICAgICAgICAgICAgaWYodGhpcy5tb3VzZU1vdmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRyb3AoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gMiApIHtcbiAgICAgICAgICAgIHRoaXMub25DbGlja01pZGRsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50KSB7XG4gICAgICAgIGxldCBsZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLm9mZnNldC54O1xuICAgICAgICBsZXQgdG9wID0gZXZlbnQucGFnZVkgLSB0aGlzLm9mZnNldC55O1xuXG4gICAgICAgIGxlZnQgPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKGxlZnQpO1xuICAgICAgICB0b3AgPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRvcCk7XG5cbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG4gICAgICAgIHRyYW5zZm9ybS5zZXRUcmFuc2xhdGUobGVmdCwgdG9wKTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlV2lyZXMoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiwgd2lsbCBiZSByZWRlZmluZWQgaW4gSW5wdXRCb3hcbiAgICB9XG5cbiAgICBvbkNsaWNrTWlkZGxlKCkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcblxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuc3ZnT2JqLiRlbFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBsZXQgY2VudHJlWCA9IE1hdGgucm91bmQocmVjdC53aWR0aCAvIDIpO1xuICAgICAgICBsZXQgY2VudHJlWSA9IE1hdGgucm91bmQocmVjdC5oZWlnaHQgLyAyKTtcblxuICAgICAgICBjZW50cmVYIC09IGNlbnRyZVggJSB0aGlzLmdyaWRTaXplO1xuICAgICAgICBjZW50cmVZIC09IGNlbnRyZVkgJSB0aGlzLmdyaWRTaXplO1xuXG4gICAgICAgIHRyYW5zZm9ybS5yb3RhdGVSaWdodChcbiAgICAgICAgICAgIGNlbnRyZVgsXG4gICAgICAgICAgICBjZW50cmVZXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG5cbiAgICAgICAgdGhpcy5yb3RhdGVCbG9ja2VkTm9kZXNSaWdodCgpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlV2lyZXMoKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGVzIGFsbCB3aXJlcyBjb25uZWN0ZWQgdG8gdGhpcyBib3hcbiAgICB1cGRhdGVXaXJlcyh0ZW1wb3JhcnkgPSBmYWxzZSkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuY29ubmVjdG9ycy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1tpXS53aXJlSWRzLmZvckVhY2goKHdpcmVJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB3aXJlID0gdGhpcy5wYXJlbnRTVkcuZ2V0V2lyZUJ5SWQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBpZih0ZW1wb3JhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS50ZW1wb3JhcnlXaXJlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS5yb3V0ZVdpcmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGlzT24gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDc7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBcImlucHV0XCIsIFwiaW9cIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5hZGRDb25uZWN0b3Iod2lkdGgsIGhlaWdodCAvIDIsIENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3Rvcik7XG5cbiAgICAgICAgdGhpcy5vbiA9IGlzT247XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGxldCBkYXRhID0gc3VwZXIuZXhwb3J0RGF0YTtcbiAgICAgICAgZGF0YS5pc09uID0gdGhpcy5pc09uO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAxLCAxLCAwKTtcbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIGNhbGwgdGhlIG9uIHNldHRlciBhZ2FpbiAodG8gcmVmcmVzaCB0aGUgc3RhdGUgb2YgdGhlIGNvbm5lY3RlZCB3aXJlcylcbiAgICAgICAgbGV0IHQgPSB0aGlzLmNvbm5lY3RvcnNbMF0uc3RhdGU7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZSh0LCB0aGlzLnBhcmVudFNWRy5nZXROZXdQcm9wYWdhdGlvbklkKCkpO1xuICAgIH1cblxuICAgIHNldCBvbihpc09uKSB7XG4gICAgICAgIGxldCBuZXdQcm9wSWQgPSB0aGlzLnBhcmVudFNWRy5nZXROZXdQcm9wYWdhdGlvbklkKCk7XG4gICAgICAgIGlmIChpc09uKSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9uXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib25cIik7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMuc3RhdGUub24sIG5ld1Byb3BJZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9mZlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLnN0YXRlLm9mZiwgbmV3UHJvcElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNPbiA9IGlzT247XG4gICAgfVxuXG4gICAgZ2V0IG9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc09uO1xuICAgIH1cblxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMub24gPSAhdGhpcy5vbjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRCb3ggZXh0ZW5kcyBCb3gge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA0O1xuICAgICAgICBjb25zdCB3aWR0aCA9IDU7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBcIm91dHB1dFwiLCBcImlvXCIsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKDAsIGhlaWdodCAvIDIsIENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKTtcbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5jb25uZWN0b3JzWzBdLnN0YXRlKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9uOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvblwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub2ZmOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvZmZcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLnVua25vd246XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib3NjXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKCkge1xuICAgICAgICBzdXBlci5nZW5lcmF0ZUJsb2NrTm9kZXMoMCwgMCwgMCwgMSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2F0ZSBleHRlbmRzIEJveCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBuYW1lKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gOTtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDtcblxuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIG5hbWUsIFwiZ2F0ZVwiLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICAvLyBvdXRwdXRcbiAgICAgICAgdGhpcy5hZGRDb25uZWN0b3Iod2lkdGgsIGhlaWdodCAvIDIsIENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3Rvcik7XG5cbiAgICAgICAgaWYodGhpcy5uYW1lPT09XCJub3RcIikge1xuICAgICAgICAgICAgLy8gaW5wdXRcbiAgICAgICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKDAsIGhlaWdodCAvIDIsIENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlucHV0XG4gICAgICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyA0LCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAoNC8zKSwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuXG4gICAgICAgICAgICAvLyBhZGQgb25lIGJsb2NrZWROb2RlIGJldHdlZW4gdGhlIGlucHV0cyAoZm9yIGJldHRlciBsb29raW5nIHdpcmluZylcbiAgICAgICAgICAgIC8vIGFuZCByZWdlbmVyYXRlIGJsb2NrZWQgbm9kZXNcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVCbG9ja05vZGVzKHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IGhlaWdodCAvIDJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoU3RhdGUodGhpcy5wYXJlbnRTVkcuZ2V0TmV3UHJvcGFnYXRpb25JZCgpKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoc3BlY2lhbE5vZGUpIHtcbiAgICAgICAgaWYoc3BlY2lhbE5vZGUhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAxLCAwLCAxLCBzcGVjaWFsTm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBlci5nZW5lcmF0ZUJsb2NrTm9kZXMoMCwgMSwgMCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUocHJvcGFnYXRpb25JZCkge1xuICAgICAgICBpZihwcm9wYWdhdGlvbklkPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdyZWZyZXNoU3RhdGUgZXJyb3I6IHByb3BhZ2F0aW9uSWQgY2Fubm90IGJlIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMuYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKSwgcHJvcGFnYXRpb25JZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibmFuZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5uYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKSwgcHJvcGFnYXRpb25JZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibm9yXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLm5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSksIHByb3BhZ2F0aW9uSWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5ub3QodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlKSwgcHJvcGFnYXRpb25JZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwib3JcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpLCBwcm9wYWdhdGlvbklkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ4bm9yXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLnhub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpLCBwcm9wYWdhdGlvbklkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ4b3JcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMueG9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKSwgcHJvcGFnYXRpb25JZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXaXJlIGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZnJvbUlkLCB0b0lkLCBncmlkU2l6ZSkge1xuICAgICAgICAvLyBzbWFsbCB0b2RvOiByZXdvcmsgc3RhcnQuLi4gZW5kLi4uIHRvIGFycmF5cz8gKG5vdCBpbXBvcnRhbnQpXG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHKTtcblxuICAgICAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XG5cbiAgICAgICAgdGhpcy5mcm9tSWQgPSBmcm9tSWQ7XG4gICAgICAgIHRoaXMudG9JZCA9IHRvSWQ7XG5cbiAgICAgICAgdGhpcy5zdGFydEJveCA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQoZnJvbUlkKTtcbiAgICAgICAgdGhpcy5lbmRCb3ggPSB0aGlzLnBhcmVudFNWRy5nZXRCb3hCeUNvbm5lY3RvcklkKHRvSWQpO1xuXG4gICAgICAgIHRoaXMuc3RhcnRDb25uZWN0b3IgPSB0aGlzLnBhcmVudFNWRy5nZXRDb25uZWN0b3JCeUlkKGZyb21JZCk7XG4gICAgICAgIHRoaXMuZW5kQ29ubmVjdG9yID0gdGhpcy5wYXJlbnRTVkcuZ2V0Q29ubmVjdG9yQnlJZCh0b0lkKTtcblxuICAgICAgICB0aGlzLnJvdXRlV2lyZSgpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gTG9naWMuc3RhdGUudW5rbm93bjtcblxuICAgICAgICAvLyBjYW5ub3QgY2FsbCB1cGRhdGVXaXJlU3RhdGUgdW50aWwgV2lyZSBpcyBpbml0aWFsaXplZCxcbiAgICAgICAgLy8gc28gdGhlIGluaXRpYWwgc3RhdGUgaGFzIHRvIGJlIHNldCBtYW51YWxseSBhbmQgbm90IGJ5IGNhbGxpbmcgLm9uIHNldHRlcnMgb24gdGhlIGNvbm5lY3RvcnNcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRDb25uZWN0b3IuaXNPdXRwdXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGFydENvbm5lY3Rvci5zdGF0ZSwgdGhpcy5wYXJlbnRTVkcuZ2V0TmV3UHJvcGFnYXRpb25JZCgpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVuZENvbm5lY3Rvci5pc091dHB1dCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmVuZENvbm5lY3Rvci5zdGF0ZSwgdGhpcy5wYXJlbnRTVkcuZ2V0TmV3UHJvcGFnYXRpb25JZCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcIndpcmVcIik7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcm9tSWQ6IHRoaXMuZnJvbUlkLFxuICAgICAgICAgICAgdG9JZDogdGhpcy50b0lkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUsIHByb3BhZ2F0aW9uSWQpIHtcbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9uOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub2ZmKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0Q29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUsIHByb3BhZ2F0aW9uSWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZW5kQ29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kQ29ubmVjdG9yLnNldFN0YXRlKHN0YXRlLCBwcm9wYWdhdGlvbklkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUF0dHI7XG4gICAgfVxuXG4gICAgdXBkYXRlV2lyZVN0YXRlKCkge1xuICAgICAgICB0aGlzLnN0YXJ0Qm94LnJlZnJlc2hTdGF0ZSh0aGlzLnBhcmVudFNWRy5nZXROZXdQcm9wYWdhdGlvbklkKCkpO1xuICAgICAgICB0aGlzLmVuZEJveC5yZWZyZXNoU3RhdGUodGhpcy5wYXJlbnRTVkcuZ2V0TmV3UHJvcGFnYXRpb25JZCgpKTtcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iai5nZXQoKTtcbiAgICB9XG5cbiAgICBnZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCkge1xuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpO1xuICAgICAgICBwb2ludHMuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLndpcmVTdGFydC54LCB0aGlzLndpcmVTdGFydC55KSk7XG4gICAgICAgIHBvaW50cy5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMud2lyZUVuZC54LCB0aGlzLndpcmVFbmQueSkpO1xuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIHRlbXBvcmFyeVdpcmUoKSB7XG4gICAgICAgIHRoaXMud2lyZVN0YXJ0ID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLnN0YXJ0Q29ubmVjdG9yLCBmYWxzZSk7XG4gICAgICAgIHRoaXMud2lyZUVuZCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5lbmRDb25uZWN0b3IsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLnNldFdpcmVQYXRoKHRoaXMuZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cygpKTtcblxuICAgICAgICAvLyB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgIC8vIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICB9XG5cbiAgICByb3V0ZVdpcmUoc25hcFRvR3JpZCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy53aXJlU3RhcnQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuc3RhcnRDb25uZWN0b3IsIHNuYXBUb0dyaWQpO1xuICAgICAgICB0aGlzLndpcmVFbmQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuZW5kQ29ubmVjdG9yLCBzbmFwVG9HcmlkKTtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IHRoaXMuYVN0YXIoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlU3RhcnQueCAvIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgeTogdGhpcy53aXJlU3RhcnQueSAvIHRoaXMuZ3JpZFNpemVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlRW5kLnggLyB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMud2lyZUVuZC55IC8gdGhpcy5ncmlkU2l6ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRXaXJlUGF0aCh0aGlzLnBvaW50cyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVXaXJlU3RhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRXaXJlUGF0aChwb2ludHMpIHtcbiAgICAgICAgLy8gc2V0IHRoZSBsaW5lXG4gICAgICAgIGlmKHRoaXMuc3ZnT2JqIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN2Z09iai51cGRhdGVQb2ludHMocG9pbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqID0gbmV3IHN2Z09iai5Qb2x5TGluZShwb2ludHMsIFwiIzhiOGI4YlwiLCAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1xuICAgICAgICAgICAgZnJvbUlkOiB0aGlzLmZyb21JZCxcbiAgICAgICAgICAgIHRvSWQ6IHRoaXMudG9JZFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLy8gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gdGhpcyBwc2V1ZG9jb2RlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BKl9zZWFyY2hfYWxnb3JpdGhtI1BzZXVkb2NvZGVcbiAgICBhU3RhcihzdGFydCwgZW5kKSB7XG4gICAgICAgIC8vIG51bWJlciBvZiBub2RlcywgdGhhdCBjYW4gYmUgb3BlbmVkIGF0IG9uY2VcbiAgICAgICAgLy8gb25jZSBpcyB0aGlzIGxpbWl0IGV4Y2VlZGVkLCBhU3RhciB3aWxsIGZhaWwgYW5kIGdldFRlbXBvcmFyeVdpcmVQb2ludHMgd2lsbCBiZSB1c2VkIGluc3RlYWRcbiAgICAgICAgY29uc3QgbWF4Tm9kZUxpbWl0ID0gNTAwMDA7XG5cbiAgICAgICAgbGV0IGNsb3NlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBsZXQgb3Blbk5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBvcGVuTm9kZXMuYWRkKHN0YXJ0KTtcblxuICAgICAgICBsZXQgY2FtZUZyb20gPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB2YWx1ZTogaW5maW5pdHlcbiAgICAgICAgbGV0IGdTY29yZSA9IG5ldyBTdHJ1Y3R1cmVzLk1hcFdpdGhEZWZhdWx0VmFsdWUoSW5maW5pdHkpO1xuICAgICAgICBnU2NvcmUuc2V0KHN0YXJ0LCAwKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHZhbHVlOiBpbmZpbml0eVxuICAgICAgICBsZXQgZlNjb3JlID0gbmV3IFN0cnVjdHVyZXMuTWFwV2l0aERlZmF1bHRWYWx1ZShJbmZpbml0eSk7XG4gICAgICAgIGZTY29yZS5zZXQoc3RhcnQsIFdpcmUubWFuaGF0dGFuRGlzdGFuY2Uoc3RhcnQsIGVuZCkpO1xuXG4gICAgICAgIGxldCBub25Sb3V0YWJsZSA9IHRoaXMucGFyZW50U1ZHLmdldE5vblJvdXRhYmxlTm9kZXMoKTtcbiAgICAgICAgbGV0IHB1bmlzaGVkQnV0Um91dGFibGU7XG4gICAgICAgIGlmKHRoaXMuc3ZnT2JqPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwdW5pc2hlZEJ1dFJvdXRhYmxlID0gdGhpcy5wYXJlbnRTVkcuZ2V0SW5jb252ZW5pZW50Tm9kZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB1bmlzaGVkQnV0Um91dGFibGUgPSB0aGlzLnBhcmVudFNWRy5nZXRJbmNvbnZlbmllbnROb2Rlcyh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAob3Blbk5vZGVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGU7XG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGVGU2NvcmU7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHZhbHVlIGZyb20gb3Blbk5vZGVzIHRoYXQgaGFzIHRoZSBsb3dlc3QgZlNjb3JlXG4gICAgICAgICAgICAvLyAoY2FuIGJlIGltcGxlbWVudGVkIGVmZmVjdGl2ZWx5IHVzaW5nIG1pbi1oZWFwIGRhdGEgc3RydWN0dXJlIChtYXliZSB0b2RvIHNvbWV0aW1lKT8pXG4gICAgICAgICAgICBvcGVuTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFjdXJyZW50Tm9kZSB8fCBmU2NvcmUuZ2V0KG5vZGUpIDwgY3VycmVudE5vZGVGU2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUZTY29yZSA9IGZTY29yZS5nZXQoY3VycmVudE5vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKHN2Z09iai5Qb2x5bGluZVBvaW50LmVxdWFscyhjdXJyZW50Tm9kZSwgZW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY29uc3RydWN0UGF0aChjYW1lRnJvbSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcGVuTm9kZXMuZGVsZXRlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIGNsb3NlZE5vZGVzLmFkZChjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAgIC8vIHRoZSBmYXJ0aGVzdCBwb2ludHMgYWNjZXNzaWJsZSB3aXRob3V0IGF2b2lkaW5nIG9ic3RhY2xlcyBpbiBldmVyeSBkaXJlY3Rpb25cbiAgICAgICAgICAgIC8vIChidXQgbWF4IDUwIGluIGVhY2ggZGlyZWN0aW9uKVxuICAgICAgICAgICAgZm9yKGxldCBkaXJlY3Rpb24gPSAwIDsgZGlyZWN0aW9uIDwgNCA7IGRpcmVjdGlvbisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvaW50ID0gV2lyZS5tb3ZlUG9pbnQoY3VycmVudE5vZGUsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCA1MCA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXdQb2ludCBpcyBpbiB0aGUgc2V0IG9mIG5vbiByb3V0YWJsZSBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGFkZCBpdCBhbmQgc3RvcCBwcm9jZWVkaW5nIGluIHRoaXMgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KG5vblJvdXRhYmxlLCB0aGlzLnNjYWxlUG9pbnRUb0dyaWQobmV3UG9pbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBza2lwIHRoaXMgbm9kZSwgaWYgaXQgaGFzIGJlZW4gYWxyZWFkeSBjbG9zZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gb3IgaWYgaXQgaXMgb24gdGhlIGxpc3Qgb2Ygbm9uIHJvdXRhYmxlIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZWROb2Rlcy5oYXMobmV3UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3Blbk5vZGVzLmhhcyhuZXdQb2ludCkueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3Blbk5vZGVzLmFkZChuZXdQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgcG9zc2libGUgR1Njb3JlIGJ5IGFkZGluZyAxIHRvIHRoZSBzY29yZSBvZiB0aGUgbm9kZSB3ZSBjYW1lIGZyb21cbiAgICAgICAgICAgICAgICAgICAgLy8gKHdlIHByaW9yaXRpemUgdG8gbWluaW1pemUgdGhlIG51bWJlciBvZiBub2RlcyBhbmQgbm90IHRoZSBkaXN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gIHNvIHdlIGFyZSBhZGRpbmcgMSBvbiBhbGwgbm9kZXMsIGV2ZW4gaWYgdGhlIGV1Y2xpZGVhbiAvIG1hbm5oYXRhbiBkaXN0YW5jZSBtYXkgdmFyeSlcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluY3JlbWVudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkhPT0wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NzaWJsZUdTY29yZSA9IGdTY29yZS5nZXQoY3VycmVudE5vZGUpICsgaW5jcmVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KHB1bmlzaGVkQnV0Um91dGFibGUsIHRoaXMuc2NhbGVQb2ludFRvR3JpZChuZXdQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbm9kZSBpcyBpbiB0aGUgc2V0IG9mIHB1bmlzaGVkIG5vZGUsIHB1bmlzaCBpdCBieSBhZGRpbmcgdG8gdGhlIEdTY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVHU2NvcmUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZUdTY29yZSA+PSBnU2NvcmUuZ2V0KG5ld1BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYW1lRnJvbS5zZXQobmV3UG9pbnQsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgZ1Njb3JlLnNldChuZXdQb2ludCwgcG9zc2libGVHU2NvcmUpO1xuICAgICAgICAgICAgICAgICAgICBmU2NvcmUuc2V0KG5ld1BvaW50LCBwb3NzaWJsZUdTY29yZSArIFdpcmUubWFuaGF0dGFuRGlzdGFuY2UobmV3UG9pbnQsIGVuZCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5ld1BvaW50IGlzIGluIHRoZSBzZXQgb2YgcHVuaXNoZWQgYnV0IHJvdXRhYmxlIHBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGl0IGJ1dCBzdG9wIHByb2NlZWRpbmcgaW4gdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoV2lyZS5zZXRIYXNUaGlzUG9pbnQocHVuaXNoZWRCdXRSb3V0YWJsZSwgdGhpcy5zY2FsZVBvaW50VG9HcmlkKG5ld1BvaW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSB0byB0aGUgbmV4dCBwb2ludCBpbiB0aGUgZGlyZWNpdG9uXG4gICAgICAgICAgICAgICAgICAgIG5ld1BvaW50ID0gV2lyZS5tb3ZlUG9pbnQobmV3UG9pbnQsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihvcGVuTm9kZXMuc2l6ZSA+IG1heE5vZGVMaW1pdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHdlIGdvdCBoZXJlLCB0aGUgcGF0aCBkb2VzIG5vdCBleGlzdCAtPiBsZXQncyB1c2UgdGVtcG9yYXJ5IHBhdGggaWdub3JpbmcgYWxsIGNvbGlzaW9uc1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCk7XG4gICAgfVxuICAgIHN0YXRpYyBtb3ZlUG9pbnQocG9pbnQsIGRpcmVjdGlvbikge1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAwOiAvLyB1cFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgLSAxXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgMTogLy8gcmlnaHRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDI6IC8vIGRvd25cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55ICsgMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDM6IC8vIGxlZnRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2NhbGVQb2ludFRvR3JpZChwb2ludCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcG9pbnQueCAqIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICB5OiBwb2ludC55ICogdGhpcy5ncmlkU2l6ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjb25zdHJ1Y3RQYXRoKGNhbWVGcm9tLCBjdXJyZW50Tm9kZSkge1xuICAgICAgICBsZXQgdG90YWxQYXRoID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpO1xuICAgICAgICB0b3RhbFBhdGguYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludChjdXJyZW50Tm9kZS54ICogdGhpcy5ncmlkU2l6ZSwgY3VycmVudE5vZGUueSAqIHRoaXMuZ3JpZFNpemUpKTtcblxuICAgICAgICB3aGlsZSAoY2FtZUZyb20uaGFzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjYW1lRnJvbS5nZXQoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgdG90YWxQYXRoLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoY3VycmVudE5vZGUueCAqIHRoaXMuZ3JpZFNpemUsIGN1cnJlbnROb2RlLnkgKiB0aGlzLmdyaWRTaXplKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG90YWxQYXRoO1xuICAgIH1cblxuICAgIHN0YXRpYyBtYW5oYXR0YW5EaXN0YW5jZShhLCBiKSB7XG4gICAgICAgIC8vIE1hbmhhdHRhbiBnZW9tZXRyeVxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoYS54IC0gYi54KSArIE1hdGguYWJzKGEueSAtIGIueSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEhhc1RoaXNQb2ludChzZXQsIHBvaW50KSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2Ygc2V0KSB7XG4gICAgICAgICAgICBpZihpdGVtLnggPT09IHBvaW50LnggJiYgaXRlbS55ID09PSBwb2ludC55KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldENvb3JkaW5hdGVzKGNvbm5lY3Rvciwgc25hcFRvR3JpZCA9IHRydWUpIHtcbiAgICAgICAgLy8gY29ubmVjdG9yLnN2Z09iai5pZCBoYXMgdG8gYmUgY2FsbGVkLCBlbHNlIHRoZSBnZXRDb29yZGluYXRlcyBkb2VzIG5vdCB3b3JrIG9uIHRoZSBmaXJzdCBjYWxsIGluIEZpcmVmb3ggNTVcbiAgICAgICAgbGV0IGR1bW15ID0gY29ubmVjdG9yLnN2Z09iai5pZDtcblxuICAgICAgICBsZXQgJGNvbm5lY3RvciA9IGNvbm5lY3Rvci5zdmdPYmouJGVsO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbiA9ICRjb25uZWN0b3IucG9zaXRpb24oKTtcbiAgICAgICAgbGV0IHdpZHRoID0gJGNvbm5lY3Rvci5hdHRyKFwid2lkdGhcIik7XG4gICAgICAgIGxldCBoZWlnaHQgPSAkY29ubmVjdG9yLmF0dHIoXCJoZWlnaHRcIik7XG5cbiAgICAgICAgbGV0IHggPSBwb3NpdGlvbi5sZWZ0ICsgd2lkdGggLyAyO1xuICAgICAgICBsZXQgeSA9IHBvc2l0aW9uLnRvcCArIGhlaWdodCAvIDI7XG4gICAgICAgIGlmKHNuYXBUb0dyaWQpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHgpO1xuICAgICAgICAgICAgeSA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQoeSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgfTtcbiAgICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIENvbnRleHRNZW51SXRlbSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgY29udGV4dE1lbnUsIHBhcmVudFNWRywgY2xpY2tGdW5jdGlvbikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gY29udGV4dE1lbnU7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjxsaT5cIik7XG4gICAgICAgICQodGhpcy4kZWwpXG4gICAgICAgICAgICAudGV4dChuYW1lKVxuICAgICAgICAgICAgLmF0dHIoXCJ0eXBlXCIsIHR5cGUpO1xuXG4gICAgICAgIGlmKGNsaWNrRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICQodGhpcy4kZWwpLmNsaWNrKFxuICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbGlja0Z1bmN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDbGFzcyhjbHMpIHtcbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoY2xzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYXBwZW5kSXRlbShpdGVtKSB7XG4gICAgICAgIGlmKCF0aGlzLnN1Ykxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViTGlzdCA9ICQoXCI8dWw+XCIpO1xuICAgICAgICAgICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMuc3ViTGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1Ykxpc3QuYXBwZW5kKGl0ZW0ualF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBnZXQgalF1ZXJ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWw7XG4gICAgfVxufVxuY2xhc3MgR2F0ZU1lbnVJdGVtIGV4dGVuZHMgQ29udGV4dE1lbnVJdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBjb250ZXh0TWVudSwgcGFyZW50U1ZHKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgdHlwZSwgLy8gbmFtZSBpcyB0aGUgdHlwZVxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIGNvbnRleHRNZW51LFxuICAgICAgICAgICAgcGFyZW50U1ZHLFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGNvbnRleHRNZW51LnBvc2l0aW9uLnggLyBwYXJlbnRTVkcuZ3JpZFNpemUpICogcGFyZW50U1ZHLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IE1hdGgucm91bmQoY29udGV4dE1lbnUucG9zaXRpb24ueSAvIHBhcmVudFNWRy5ncmlkU2l6ZSkgKiBwYXJlbnRTVkcuZ3JpZFNpemVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcGFyZW50U1ZHLm5ld0dhdGUoXG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQsIC8vIHggY29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi50b3AgLy8geSBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHRNZW51IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG5cbiAgICAgICAgY29uc3QgZ2F0ZXMgPSBbXCJub3RcIiwgXCJhbmRcIiwgXCJvclwiLCBcIm5hbmRcIiwgXCJub3JcIiwgXCJ4b3JcIiwgXCJ4bm9yXCJdO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICB4OiAwLCB5OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kZWwgPSAkKFwiPHVsPlwiKTtcbiAgICAgICAgdGhpcy4kZWwuYXR0cignaWQnLCAnY29udGV4dE1lbnUnKTtcblxuICAgICAgICBsZXQgZ2F0ZUxpc3QgPSBuZXcgQ29udGV4dE1lbnVJdGVtKFwiTmV3IGdhdGVcIiwgJycsIHRoaXMsIHBhcmVudFNWRyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IGdhdGVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgZ2F0ZUxpc3QuYXBwZW5kSXRlbShcbiAgICAgICAgICAgICAgICBuZXcgR2F0ZU1lbnVJdGVtKGdhdGVzW2ldLCB0aGlzLCBwYXJlbnRTVkcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwZW5kSXRlbShnYXRlTGlzdCk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgbmV3IENvbnRleHRNZW51SXRlbShcIklucHV0IGJveFwiLCAnJywgdGhpcywgcGFyZW50U1ZHLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLngpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueSlcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRTVkcubmV3SW5wdXQocG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKG5ldyBDb250ZXh0TWVudUl0ZW0oXCJPdXRwdXQgYm94XCIsICcnLCB0aGlzLCBwYXJlbnRTVkcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueCksXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBhcmVudFNWRy5uZXdPdXRwdXQocG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kQ29uZGl0aW9uYWxJdGVtKCdib3gnLCAnUmVtb3ZlIHRoaXMgaXRlbScsIChpZCkgPT4ge3RoaXMucGFyZW50U1ZHLnJlbW92ZUJveChpZCl9KTtcbiAgICAgICAgdGhpcy5hcHBlbmRDb25kaXRpb25hbEl0ZW0oJ3dpcmUnLCAnUmVtb3ZlIHRoaXMgd2lyZScsIChpZCkgPT4ge3RoaXMucGFyZW50U1ZHLnJlbW92ZVdpcmVCeUlkKGlkKX0pO1xuXG4gICAgICAgIHBhcmVudFNWRy4kc3ZnLmJlZm9yZSh0aGlzLiRlbCk7XG4gICAgfVxuXG4gICAgYXBwZW5kSXRlbShpdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChpdGVtLmpRdWVyeSk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8vIGFwcGVuZHMgYW4gY29ubmRpdGlvbmFsIGl0ZW0gKHRoYXQgaXMgc2hvd24gb25seSBpZiB0aGUgdGFyZ2V0XG4gICAgLy8gaGFzIHRoZSBjbGFzcyBpdGVtQ2xhc3MpXG4gICAgLy8gY2xpY2tGdW5jdGlvbiB0YWtlcyBvbmUgYXJndW1lbnQ6IElEIG9mIHRoZSB0YXJnZXRcbiAgICBhcHBlbmRDb25kaXRpb25hbEl0ZW0oaXRlbUNsYXNzLCB0ZXh0LCBjbGlja0Z1bmN0aW9uKSB7XG4gICAgICAgIGlmKCF0aGlzLmNvbmRpdGlvbmFsSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW3RoaXMuY29uZGl0aW9uYWxJdGVtcy5sZW5ndGhdID0ge1xuICAgICAgICAgICAgaXRlbUNsYXNzOiBpdGVtQ2xhc3MsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgY2xpY2tGdW5jdGlvbjogY2xpY2tGdW5jdGlvblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVjaWRlcyB3aGV0aGVyIG9yIG5vdCB0byBkaXNwbGF5IHNwZWNpZmljIGNvbmRpdGlvbmFsIGl0ZW1zXG4gICAgcmVzb2x2ZUNvbmRpdGlvbmFsSXRlbXMoJHRhcmdldCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25kaXRpb25hbEl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZigkdGFyZ2V0Lmhhc0NsYXNzKHRoaXMuY29uZGl0aW9uYWxJdGVtc1tpXS5pdGVtQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ29udGV4dE1lbnVJdGVtKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW2ldLnRleHQsICcnLCB0aGlzLCB0aGlzLnBhcmVudFNWRyxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXNbaV0uY2xpY2tGdW5jdGlvbigkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKS5hZGRDbGFzcygnY29uZGl0aW9uYWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGhpZGVzIGFsbCBjb25kaXRpb25hbCBpdGVtc1xuICAgIGhpZGVBbGxDb25kaXRpb25hbEl0ZW1zKCkge1xuICAgICAgICB0aGlzLiRlbC5jaGlsZHJlbignLmNvbmRpdGlvbmFsJykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLy8gZGlzcGxheXMgdGhlIGNvbnRleHQgbWVudSB3aXRoIHRoZSByaWdodCBzZXQgb2YgY29uZGl0aW9uYWwgaXRlbXNcbiAgICBkaXNwbGF5KHgsIHksICR0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kZWwuY3NzKHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB0b3A6IHkgKyBcInB4XCIsXG4gICAgICAgICAgICBsZWZ0OiB4ICsgXCJweFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVzb2x2ZUNvbmRpdGlvbmFsSXRlbXMoJHRhcmdldCk7XG4gICAgfVxuXG4gICAgLy8gaGlkZXMgdGhlIGNvbnRleHQgbWVudVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNzcyh7ZGlzcGxheTogJ25vbmUnfSk7XG4gICAgICAgIHRoaXMuaGlkZUFsbENvbmRpdGlvbmFsSXRlbXMoKTtcbiAgICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBleHBvcnROZXR3b3JrIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNWRy5leHBvcnREYXRhO1xuICAgIH1cblxuICAgIGpzb24oc3R5bGUgPSBleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3QsIGRhdGFVcmkgPSBmYWxzZSkge1xuICAgICAgICBpZihkYXRhVXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2RhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04LCdcbiAgICAgICAgICAgICAgICArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmpzb24oc3R5bGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGV4cG9ydE5ldHdvcmsuc3R5bGUuY29tcGFjdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSk7XG4gICAgICAgICAgICAgICAgY2FzZSBleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSwgbnVsbCwgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJldHR5OiAwLFxuICAgICAgICAgICAgY29tcGFjdDogMVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIGltcG9ydE5ldHdvayB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBzdHJpbmcpIHtcbiAgICAgICAgcGFyZW50U1ZHLmltcG9ydERhdGEoXG4gICAgICAgICAgICBKU09OLnBhcnNlKHN0cmluZylcbiAgICAgICAgKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge2V4cG9ydE5ldHdvcmssIGltcG9ydE5ldHdva30gZnJvbSBcIi4vaW1wb3J0RXhwb3J0LmpzXCI7XG5cbmNsYXNzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNpZmljVGFnKSB7XG4gICAgICAgIGlmKCFzcGVjaWZpY1RhZykge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoXCI8XCIgKyBzcGVjaWZpY1RhZyArIFwiPlwiKVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBjb25zdCBtb3VzZUljb24gPVxuLy8gICAgIFwiPHN2ZyBjbGFzcz1cXFwibW91c2VJY29uXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIGhlaWdodD1cXFwiMTIxLjc3MTMxbW1cXFwiIHdpZHRoPVxcXCI4Mi4zMjc1ODNtbVxcXCIgdmVyc2lvbj1cXFwiMS4xXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjkxLjcxMTkxIDQzMS40NzMxNFxcXCI+XCIgK1xuLy8gICAgIFwiPGcgdHJhbnNmb3JtPVxcXCJ0cmFuc2xhdGUoLTIwMi43MDkwOCwtMjYwLjkyMzIpXFxcIj5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBkPVxcXCJtMjAyLjgxMTA4IDQ0My41MDY2N2MtMC4xMjU3IDExLjA1NjgzIDAuMDY1MSAxMi4xMjkxNSAwLjA1MjggMjMuMDkzNzUgMS4wNDA0IDM5LjI5MTY1LTQuMDMyODEgNzkuNTg0MiA4LjgxNDQxIDExNy41NjgzNiAxNy41MjYwMiA1OC4wMDc0MiA3MC43NjEyIDEwNy4wNzc5MyAxMzMuMTI5MDcgMTA4LjExNzE5IDYwLjgwNDQ4IDIuNjEyNDcgMTE1LjgwNjM4LTQxLjQ4OTEyIDEzNi42NTI0OS05Ni45MzU1NSAxNS4yMTk0Mi0zNC43MDU2MSAxMi43NDQ3LTcyLjgyNjM4IDEyLjgzNC0xMDkuNzIyNjYtMC40MDM1Ni0xNy4yNDkwNSAwLjI3NDUyLTI0LjczMjkgMC4wODc5LTQyLjEyMTA5aC0yOTEuNTcwNjZ6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImxlZnRcXFwiIGQ9XFxcIm0zMzUuNjc3ODggMjYwLjkzMDMyYy01OC42NTI1IDAuNjU1NjYtOTkuNjMxOSA0My41MTM4Ni0xMjAuMDgyMSA5Ni45OTIxOS0xMC41NTA1IDI0LjA2MDEyLTEyLjU5MzUgNDEuNzc3OTctMTIuODg2NyA2Ny41ODIwM2gxMzUuNzgzMnYtMTY0LjU3MjI2Yy0wLjAwNiAwLjAwMDA4LTAuMDExNy0wLjAwMDA4LTAuMDE3NiAwLTAuOTM0Ny0wLjAxMS0xLjg2NTgtMC4wMTI0LTIuNzk2OC0wLjAwMnpcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwicmlnaHRcXFwiIGQ9XFxcIm0zNjEuNDY3ODcgMjYwLjkyOTkzYy0wLjk0MjA3LTAuMDEtMS44ODY0LTAuMDA5LTIuODMyMDMgMC4wMDR2MTY0LjU3MjI2aDEzNS43ODUxNmMtMC4yNjI1Ny0yNC40Njk0OC0yLjI1MjEtNDAuNzQ4MjMtMTEuNTAzOTEtNjMuOTAyNDMtMTkuMzQ3MDktNTUuMDMyMjUtNjEuNzMwNDMtMTAwLjA0NTI1LTEyMS40NDkyMi0xMDAuNjczODN6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcIm1pZGRsZVxcXCIgZD1cXFwibTM0OC41NjUwNCAyOTQuOTMzNjVjMTUuMDM3MTQgMCAyNy4xNDI4NiAxMi4xMDU3MiAyNy4xNDI4NiAyNy4xNDI4NnY0MGMwIDE1LjAzNzE0LTEyLjEwNTcyIDI3LjE0Mjg2LTI3LjE0Mjg2IDI3LjE0Mjg2cy0yNy4xNDI4Ni0xMi4xMDU3Mi0yNy4xNDI4Ni0yNy4xNDI4NnYtNDBjMC0xNS4wMzcxNCAxMi4xMDU3Mi0yNy4xNDI4NiAyNy4xNDI4Ni0yNy4xNDI4NnpcXFwiIHN0cm9rZT1cXFwiI2ZmZlxcXCIgc3Ryb2tlLWxpbmVjYXA9XFxcInJvdW5kXFxcIiBzdHJva2Utd2lkdGg9XFxcIjIwXFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICA8L2c+XCIgK1xuLy8gICAgIFwiPC9zdmc+XCI7XG5cbmNsYXNzIGhlbHBXaW5kb3dJdGVtIGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IodGV4dCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKFwiaGVscFdpbmRvd0l0ZW1cIik7XG4gICAgICAgIHRoaXMuJGVsLmh0bWwodGV4dCk7XG4gICAgfVxufVxuXG5jbGFzcyBoZWxwV2luZG93IGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy4kZWwuYXR0cihcImlkXCIsIFwiaGVscFwiKTtcblxuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPm1haW4gbWVudTwvc3Ryb25nPjogcmlnaHQgY2xpY2tcIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCJkcmFnIGFuZCBkcm9wIHRvIDxzdHJvbmc+bW92ZSBlbGVtZW50czwvc3Ryb25nPlwiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+bWlkZGxlIGNsaWNrPC9zdHJvbmc+IHRvIHJvdGF0ZSBlbGVtZW50c1wiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+Y2xpY2sgPGltZyBzcmM9J2ltZy9ndWkvaGVscC5zdmcnIGNsYXNzPSdoZWxwaWNvbicgYWx0PSdoZWxwIGljb24nPjwvc3Ryb25nPiB0byBkaXNwbGF5IGRvY3VtZW50YXRpb24gKGluIGN6ZWNoKVwiKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGl0ZW0uJGVsKTtcbiAgICB9XG59XG5cblxuY2xhc3MgZmxvYXRpbmdNZW51SXRlbSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNpZmljQ2xhc3MsIGljb24sIHRpdGxlLCBzcGVjaWZpY1RhZykge1xuICAgICAgICBzdXBlcihzcGVjaWZpY1RhZyk7XG5cbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoXCJidXR0b25cIik7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKHNwZWNpZmljQ2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChcbiAgICAgICAgICAgICQoXCI8aW1nPlwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3JjXCIsIFwiaW1nL2d1aS9cIiArIGljb24gKyBcIi5zdmdcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImFsdFwiLCB0aXRsZSlcbiAgICAgICAgICAgICAgICAuYXR0cihcInRpdGxlXCIsIHRpdGxlKVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZmxvYXRpbmdNZW51IGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgY29uc3QgaWQgPSAnZmxvYXRpbmdNZW51JztcblxuICAgICAgICB0aGlzLiRlbC5hdHRyKFwiaWRcIiwgaWQpO1xuXG4gICAgICAgIC8qIElNUE9SVCAqL1xuXG4gICAgICAgIC8vIGhlcmUgd2lsbCBiZSB0aGUgaW5zdGFuY2Ugb2YgTGl0eSBzdG9yZWRcbiAgICAgICAgLy8gKHdlIG5lZWQgdG8gc3RvcmUgaXQsIGJlY2F1c2UgdGhlIFwiaW1wb3J0XCIgYnV0dG9uIGFsc28gY2xvc2VzIExpdHkpXG4gICAgICAgIGxldCBsaXR5SW5zdGFuY2VJbXBvcnQ7XG5cbiAgICAgICAgbGV0IGltcG9ydEJ1dHRvbiA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiaW1wb3J0XCIsIFwiaW1wb3J0XCIsIFwiSW1wb3J0IGEgbmV0d29ya1wiLCBcImFcIik7XG4gICAgICAgIGltcG9ydEJ1dHRvbi4kZWwub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgJHBvcHVwID0gJChcIjxkaXY+XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0RXhwb3J0XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0XCIpO1xuXG4gICAgICAgICAgICBsZXQgdGV4dGFyZWFJZCA9IFwiaW1wb3J0SlNPTlwiO1xuXG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8dGV4dGFyZWE+PC90ZXh0YXJlYT5cIikuYXR0cignaWQnLCB0ZXh0YXJlYUlkKVxuICAgICAgICAgICAgKS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwidXBsb2FkXCJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvaW1wb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXCIgaW1wb3J0IGZyb20gSlNPTlwiKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0ZXh0YXJlYSA9ICQoJyMnK3RleHRhcmVhSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGV4dGFyZWEgY29udGVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbXBvcnRTdHJpbmcgPSAkdGV4dGFyZWEudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIExpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpdHlJbnN0YW5jZUltcG9ydC5jbG9zZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9jY2VzcyB0aGUgaW1wb3J0ZWQgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IGltcG9ydE5ldHdvayhwYXJlbnRTVkcsIGltcG9ydFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsaXR5SW5zdGFuY2VJbXBvcnQgPSBsaXR5KCRwb3B1cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKGltcG9ydEJ1dHRvbik7XG5cbiAgICAgICAgLyogRVhQT1JUICovXG5cbiAgICAgICAgbGV0IGV4cG9ydEJ1dHRvbiA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiZXhwb3J0XCIsIFwiZXhwb3J0XCIsIFwiRXhwb3J0IHRoaXMgbmV0d29ya1wiLCBcImFcIik7XG4gICAgICAgIGV4cG9ydEJ1dHRvbi4kZWwub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBleHBvcnROZXR3b3JrKHBhcmVudFNWRyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgcG9wdXAgY29udGFpbmVyIGhvbGRpbmcgYWxsIHBvcHVwIGNvbnRlbnQgKHRoYXQgd2lsbCBiZSBwYXNzZWQgdG8gbGl0eSlcbiAgICAgICAgICAgIGxldCAkcG9wdXAgPSAkKFwiPGRpdj5cIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJpbXBvcnRFeHBvcnRcIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJleHBvcnRcIik7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBibG9jayB3aXRoIGNvZGUgdG8gYmUgZGlzcGxheWVkIGFuZCBhcHBlbmQgaXQgdG8gdGhlIHBvcHVwIGVsZW1lbnRcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxwcmU+XCIpLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxjb2RlPlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBsaW5rc1xuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPGE+XCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5LCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgXCJjbGFzc1wiOiBcImRvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJuZXR3b3JrLmpzb25cIlxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9leHBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgKS5hcHBlbmQoXCIgZXhwYW5kZWQgSlNPTlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3QsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwiZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcIm5ldHdvcmsubWluLmpzb25cIlxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9leHBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgKS5hcHBlbmQoXCIgY29tcGFjdCBKU09OXCIpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsaXR5KCRwb3B1cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKGV4cG9ydEJ1dHRvbik7XG5cbiAgICAgICAgLyogSEVMUCAqL1xuXG4gICAgICAgIGxldCBoZWxwID0gbmV3IGZsb2F0aW5nTWVudUl0ZW0oXCJoZWxwXCIsIFwiaGVscFwiLCBcIkRpc3BsYXkgaGVscFwiLCBcImFcIik7XG4gICAgICAgIGhlbHAuJGVsLm9uKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgICAgICQoXCIjaGVscFwiKS5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgJChcIiNoZWxwXCIpLnJlbW92ZUNsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaGVscC4kZWwuYXR0cih7XG4gICAgICAgICAgICAnaHJlZic6ICcuL2RvY3MvJyxcbiAgICAgICAgICAgICdkYXRhLWxpdHknOiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVscCk7XG5cbiAgICAgICAgcGFyZW50U1ZHLiRzdmcuYWZ0ZXIodGhpcy4kZWwpO1xuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5hZnRlcihuZXcgaGVscFdpbmRvdygpLiRlbCk7XG4gICAgfVxuXG4gICAgYXBwZW5kKG1lbnVJdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChtZW51SXRlbS4kZWwpO1xuICAgIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0ICogYXMgc3ZnT2JqIGZyb20gJy4vc3ZnT2JqZWN0cy5qcydcbmltcG9ydCAqIGFzIGVkaXRvckVsZW1lbnRzIGZyb20gJy4vZWRpdG9yRWxlbWVudHMuanMnXG5pbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYy5qcydcbmltcG9ydCBDb250ZXh0TWVudSBmcm9tICcuL2NvbnRleHRNZW51LmpzJ1xuaW1wb3J0IEZsb2F0aW5nTWVudSBmcm9tICcuL2Zsb2F0aW5nTWVudS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ZnIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGdyaWRTaXplKSB7XG4gICAgICAgIHRoaXMuJHN2ZyA9ICQoY2FudmFzKTtcblxuICAgICAgICB0aGlzLmdyaWRTaXplID0gZ3JpZFNpemU7XG5cbiAgICAgICAgdGhpcy5ib3hlcyA9IFtdOyAvLyBzdG9yZXMgYWxsIGJveGVzXG4gICAgICAgIHRoaXMud2lyZXMgPSBbXTsgLy8gc3RvcmVzIGFsbCB3aXJlc1xuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGVmcyBlbGVtZW50LCB1c2VkIGZvciBwYXR0ZXJuc1xuICAgICAgICB0aGlzLiRkZWZzID0gJChcIjxkZWZzPlwiKTtcbiAgICAgICAgdGhpcy4kc3ZnLnByZXBlbmQodGhpcy4kZGVmcyk7XG5cbiAgICAgICAgLy8gQkFDS0dST1VORCBQQVRURVJOXG4gICAgICAgIGxldCBwYXR0ZXJuID0gbmV3IHN2Z09iai5QYXR0ZXJuKFwiZ3JpZFwiLCB0aGlzLmdyaWRTaXplLCB0aGlzLmdyaWRTaXplKTtcblxuICAgICAgICBsZXQgcGF0dGVyblBvaW50cyA9IG5ldyBzdmdPYmouUG9seWxpbmVQb2ludHMoKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoMCwgMCkpXG4gICAgICAgICAgICAuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLmdyaWRTaXplLCAwKSlcbiAgICAgICAgICAgIC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMuZ3JpZFNpemUsIHRoaXMuZ3JpZFNpemUpKTtcblxuICAgICAgICBwYXR0ZXJuLmFkZENoaWxkKG5ldyBzdmdPYmouUG9seUxpbmUocGF0dGVyblBvaW50cywgXCIjYTNhNGQyXCIsIDIpKTtcbiAgICAgICAgdGhpcy5hZGRQYXR0ZXJuKHBhdHRlcm4uZ2V0KCkpO1xuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBzdmdPYmouUmVjdGFuZ2xlKDAsIDAsIFwiMTAwJVwiLCBcIjEwMCVcIiwgXCJ1cmwoI2dyaWQpXCIsIFwibm9uZVwiKTtcbiAgICAgICAgdGhpcy5hcHBlbmRKUXVlcnlPYmplY3QodGhpcy5iYWNrZ3JvdW5kLmdldCgpKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgLy8gQ09OU1RSVUNUIENPTlRFWFQgTUVOVVxuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gbmV3IENvbnRleHRNZW51KHRoaXMpO1xuXG4gICAgICAgIC8vIENPTlNUUlVDVCBGTE9BVElORyBNRU5VXG4gICAgICAgIC8vIHRoaXMuZmxvYXRpbmdNZW51ID0gbmV3IEZsb2F0aW5nTWVudSh0aGlzKTtcbiAgICAgICAgdGhpcy5mbG9hdGluZ01lbnUgPSBuZXcgRmxvYXRpbmdNZW51KHRoaXMpO1xuXG4gICAgICAgIC8vIEFMTCBFVkVOVCBDQUxMQkFDS1NcbiAgICAgICAgbGV0IHRhcmdldDtcbiAgICAgICAgdGhpcy4kc3ZnLm9uKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0UmVhbFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VEb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5oaWRlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmKHRhcmdldCE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vdXNlTW92ZShldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZih0YXJnZXQhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb3VzZVVwKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSkub24oXCJjb250ZXh0bWVudVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvbnRleHRNZW51KGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSwgdGhpcy5nZXRSZWFsSlF1ZXJ5VGFyZ2V0KGV2ZW50LnRhcmdldCkpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHRoaXMuZXhwb3J0V2lyZUlkTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmV4cG9ydFdpcmVJZCA9IDA7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAvLyB0b2RvIGltcGxlbWVudCBncmlkU2l6ZSBzY2FsaW5nXG4gICAgICAgICAgICAvLyBncmlkU2l6ZTogdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgIGJveGVzOiBbXSxcbiAgICAgICAgICAgIHdpcmVzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBkYXRhLmJveGVzW2ldID0gdGhpcy5ib3hlc1tpXS5leHBvcnREYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaW1wb3J0RGF0YShkYXRhKSB7XG4gICAgICAgIC8vIHRvZG8gaW1wbGVtZW50IGdyaWRTaXplIHNjYWxpbmdcblxuICAgICAgICAvLyBsaXN0IG9mIHdpcmVzIHRvIGJlIGFkZGVkXG4gICAgICAgIGxldCBuZXdXaXJlcyA9IG5ldyBNYXAoKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGRhdGEuYm94ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGFkZCBib3hcbiAgICAgICAgICAgIGxldCBib3g7XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0uY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2F0ZVwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmV3IGdhdGUgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgYm94ID0gdGhpcy5uZXdHYXRlKGRhdGEuYm94ZXNbaV0ubmFtZSwgMCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW9cIjpcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmJveGVzW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbnB1dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgaW5wdXQgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld0lucHV0KDAsIDAsIGRhdGEuYm94ZXNbaV0uaXNPbiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm91dHB1dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgb3V0cHV0ICh3aXRob3V0IHJlbG9hZGluZyB0aGUgU1ZHLCB3ZSB3aWxsIHJlbG9hZCBpdCBvbmNlIGFmdGVyIHRoZSBpbXBvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94ID0gdGhpcy5uZXdPdXRwdXQoMCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBpbyBib3ggbmFtZSAnXCIrZGF0YS5ib3hlc1tpXS5uYW1lK1wiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gYm94IGNhdGVnb3J5ICdcIitkYXRhLmJveGVzW2ldLmNhdGVnb3J5K1wiJy5cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChib3gpIHtcbiAgICAgICAgICAgICAgICAvLyBwcm9jY2VzcyBib3ggdHJhbnNmb3JtcyAodHJhbnNsYXRpb24gYW5kIHJvdGF0aW9uKVxuICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgZWRpdG9yRWxlbWVudHMuVHJhbnNmb3JtKCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMCA7IGogPCBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtcy5sZW5ndGggOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidHJhbnNsYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1sxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicm90YXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnNldFJvdGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1sxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0uYXJnc1syXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIHRyYW5zZm9ybSBwcm9wZXJ0eSAnXCIrZGF0YS5ib3hlc1tpXS50cmFuc2Zvcm0uaXRlbXNbal0ubmFtZStcIicuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYm94LnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGFsbCB3aXJlcyB0byB0aGUgbGlzdCBvZiB3aXJlcyB0byBiZSBhZGRlZFxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDAgOyBqIDwgZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9ucy5sZW5ndGggOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBhcnRpZmljaWFsIHdpcmUgaWRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpcmVJZCA9IGRhdGEuYm94ZXNbaV0uY29ubmVjdGlvbnNbal0ud2lyZUlkO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhc3MgdGhlIHZhbHVlcyBnb3QgZnJvbSBqc29uIGludG8gYSB2YXJpYWJsZSB0aGF0IHdpbGwgYmUgYWRkZWQgaW50byB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zW2pdLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9uc1tqXS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm94SWQ6IGJveC5pZFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgdmFsdWUgdG8gdGhlIG1hcFxuICAgICAgICAgICAgICAgICAgICBpZihuZXdXaXJlcy5oYXMod2lyZUlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgYWxyZWFkeSBpcyBhIHdpcmUgd2l0aCB0aGlzIGlkIGluIHRoZSBtYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHZhbHVlIHRvIHRoZSBlbmQgb2YgdGhlIGFycmF5IG9mIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1hcFZhbHVlID0gbmV3V2lyZXMuZ2V0KHdpcmVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBWYWx1ZS5sZW5ndGhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdXaXJlcy5zZXQod2lyZUlkLCBtYXBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyB3aXJlIHdpdGggdGhpcyBpZCBpbiB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHdpcmUgYW5kIHNldCB0aGUgdmFsdWUgdG8gYmUgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdXaXJlcy5zZXQod2lyZUlkLCBbdmFsdWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlZnJlc2ggdGhlIFNWRyBkb2N1bWVudCAobmVlZGVkIGZvciB3aXJpbmcpXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgICAgIC8vIHdpdGggYWxsIGJveGVzIGFkZGVkLCB3ZSBjYW4gbm93IGNvbm5lY3QgdGhlbSB3aXRoIHdpcmVzXG4gICAgICAgIG5ld1dpcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3JJZHMgPSBbXTtcbiAgICAgICAgICAgIGlmKGl0ZW1bMF0gJiYgaXRlbVsxXSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDE7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gdGhpcy5nZXRCb3hCeUlkKGl0ZW1baV0uYm94SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rvcklkc1tpXSA9IGJveC5jb25uZWN0b3JzW2l0ZW1baV0uaW5kZXhdLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmV3V2lyZShjb25uZWN0b3JJZHNbMF0sIGNvbm5lY3Rvcklkc1sxXSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZWZyZXNoIHRoZSBTVkcgZG9jdW1lbnRcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgd2lyZUNyZWF0aW9uSGVscGVyKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGlmKCF0aGlzLmZpcnN0Q29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDb25uZWN0b3JJZCA9IGNvbm5lY3RvcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXdXaXJlKHRoaXMuZmlyc3RDb25uZWN0b3JJZCwgY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgdGhpcy5maXJzdENvbm5lY3RvcklkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TmV3UHJvcGFnYXRpb25JZCgpIHtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGlvbkhpc3RvcnkgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmKHRoaXMucHJvcElkPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BJZCA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BJZCsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BJZDtcbiAgICB9XG5cbiAgICAvLyBjaGVja3MgZm9yIGxvb3BzLCByZXR1cm5zIHRoZSBjb3JyZWN0IHN0YXRlIChjaGFuZ2VzIG9zY2lsbGF0aW9uIHRvIHRoZSBvc2NpbGxhdGluZyBzdGF0ZSBldGMpXG4gICAgbG9vcEd1YXJkKHByb3BhZ2F0aW9uSWQsIGNvbm5lY3RvcklkLCBzdGF0ZSkge1xuXG4gICAgICAgIGlmKHByb3BhZ2F0aW9uSWQ9PT10aGlzLnByb3BJZCkge1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wYWdhdGlvbkhpc3RvcnkuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgICAgIC8vIGRlZXBDb3B5IGlzIG5lY2Vzc2FyeSwgd2l0aG91dCBpdCBpIGFtIG5vdCBhYmxlIHRvIGFkZCBuZXcgaXRlbXMgdG8gc3RhdGVMaXN0XG4gICAgICAgICAgICAgICAgLy8gbGV0IHN0YXRlTGlzdCA9IEZuLmRlZXBDb3B5KHRoaXMucHJvcGFnYXRpb25IaXN0b3J5LmdldChjb25uZWN0b3JJZCkpO1xuICAgICAgICAgICAgICAgIGxldCBzdGF0ZUxpc3QgPSB0aGlzLnByb3BhZ2F0aW9uSGlzdG9yeS5nZXQoY29ubmVjdG9ySWQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNTdGF0ZUZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgc3RhdGVMaXN0Lmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZihzdGF0ZUxpc3RbaV09PT1zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1N0YXRlRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgbGFzdFN0YXRlID0gc3RhdGVMaXN0W3N0YXRlTGlzdC5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgICAgIHN0YXRlTGlzdFtzdGF0ZUxpc3QubGVuZ3RoXSA9IHN0YXRlO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRpb25IaXN0b3J5LnNldChjb25uZWN0b3JJZCwgc3RhdGVMaXN0KTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXNTdGF0ZUZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2lvbiBpcyBoYXBwZW5pbmdcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTdGF0ZSE9PXN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGlvbkhpc3Rvcnkuc2V0KGNvbm5lY3RvcklkLCBbc3RhdGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRpb25IaXN0b3J5ID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5ld0dhdGUobmFtZSwgeCwgeSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3Qm94KHgsIHksIG5ldyBlZGl0b3JFbGVtZW50cy5HYXRlKHRoaXMsIG5hbWUsIHgsIHkpLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBuZXdJbnB1dCh4LCB5LCBpc09uID0gZmFsc2UsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0JveCh4LCB5LCBuZXcgZWRpdG9yRWxlbWVudHMuSW5wdXRCb3godGhpcywgaXNPbiksIHJlZnJlc2gpO1xuICAgIH1cblxuICAgIG5ld091dHB1dCh4LCB5LCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLk91dHB1dEJveCh0aGlzKSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgbmV3Qm94KHgsIHksIG9iamVjdCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5ib3hlcy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5ib3hlc1tpbmRleF0gPSBvYmplY3Q7XG5cbiAgICAgICAgLy8gdHJhbnNsYXRlIHRoZSBnYXRlIGlmIHggYW5kIHkgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAgICAgIGlmKHggJiYgeSkge1xuICAgICAgICAgICAgbGV0IHRyID0gbmV3IGVkaXRvckVsZW1lbnRzLlRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdHIuc2V0VHJhbnNsYXRlKHgsIHkpO1xuXG4gICAgICAgICAgICB0aGlzLmJveGVzW2luZGV4XS5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHIuZ2V0KCl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwZW5kRWxlbWVudCh0aGlzLmJveGVzW2luZGV4XSwgcmVmcmVzaCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYm94ZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHJlbW92ZUJveChnYXRlSWQpIHtcbiAgICAgICAgbGV0ICRnYXRlID0gJChcIiNcIitnYXRlSWQpO1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIGdhdGUgaW4gc3ZnJ3MgbGlzdCBvZiBnYXRlc1xuICAgICAgICBsZXQgZ2F0ZUluZGV4ID0gLTE7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMuYm94ZXNbaV0uc3ZnT2JqLmlkPT09Z2F0ZUlkKSB7XG4gICAgICAgICAgICAgICAgZ2F0ZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGdhdGVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgYWxsIHdpcmVzIGNvbm5lY3RlZCB0byB0aGlzIGdhdGVcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmJveGVzW2dhdGVJbmRleF0uY29ubmVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlV2lyZXNCeUNvbm5lY3RvcklkKHRoaXMuYm94ZXNbZ2F0ZUluZGV4XS5jb25uZWN0b3JzW2ldLnN2Z09iai5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZ2F0ZVxuICAgICAgICAgICAgdGhpcy5ib3hlcy5zcGxpY2UoZ2F0ZUluZGV4LCAxKTtcbiAgICAgICAgICAgICRnYXRlLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRyeWluZyB0byByZW1vdmUgYW4gbm9uZXhpc3RpbmcgZ2F0ZS4gKEdhdGUgaWQ6IFwiK2dhdGVJZCtcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdXaXJlKGZyb21JZCwgdG9JZCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgaWYoZnJvbUlkPT09dG9JZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZnJvbUlkID0gZnJvbUlkO1xuICAgICAgICB0aGlzLnRvSWQgPSB0b0lkO1xuXG4gICAgICAgIGxldCBmcm9tQ29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGZyb21JZCk7XG4gICAgICAgIGxldCB0b0Nvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh0b0lkKTtcblxuICAgICAgICBpZihmcm9tQ29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlV2lyZXNCeUNvbm5lY3RvcklkKGZyb21JZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0b0Nvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZCh0b0lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMud2lyZXMubGVuZ3RoO1xuICAgICAgICB0aGlzLndpcmVzW2luZGV4XSA9IG5ldyBlZGl0b3JFbGVtZW50cy5XaXJlKHRoaXMsIGZyb21JZCwgdG9JZCwgdGhpcy5ncmlkU2l6ZSk7XG5cbiAgICAgICAgZnJvbUNvbm5lY3Rvci5hZGRXaXJlSWQodGhpcy53aXJlc1tpbmRleF0uc3ZnT2JqLmlkKTtcbiAgICAgICAgdG9Db25uZWN0b3IuYWRkV2lyZUlkKHRoaXMud2lyZXNbaW5kZXhdLnN2Z09iai5pZCk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRFbGVtZW50KHRoaXMud2lyZXNbaW5kZXhdLCByZWZyZXNoKTtcbiAgICAgICAgdGhpcy5tb3ZlVG9CYWNrQnlJZCh0aGlzLndpcmVzW2luZGV4XS5zdmdPYmouaWQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLndpcmVzW2luZGV4XTtcbiAgICB9XG5cbiAgICBnZXRXaXJlQnlJZCh3aXJlSWQpIHtcbiAgICAgICAgbGV0IHdpcmVDb3VudCA9IHRoaXMud2lyZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgd2lyZUNvdW50IDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLndpcmVzW2ldLnN2Z09iai5pZD09PXdpcmVJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpcmVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldFdpcmVzQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rvci53aXJlSWRzO1xuICAgIH1cblxuICAgIHJlbW92ZVdpcmVCeUlkKHdpcmVJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMud2lyZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy53aXJlc1tpXS5zdmdPYmouaWQgPT09IHdpcmVJZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGNvbm5lY3RvcjEgPSB0aGlzLndpcmVzW2ldLnN0YXJ0Q29ubmVjdG9yO1xuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IyID0gdGhpcy53aXJlc1tpXS5lbmRDb25uZWN0b3I7XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0b3IxLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuICAgICAgICAgICAgICAgIGNvbm5lY3RvcjIucmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzW2ldLnN2Z09iai4kZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy53aXJlcy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcblxuICAgICAgICBjb25uZWN0b3Iud2lyZUlkcy5mb3JFYWNoKCh3aXJlSWQpID0+IHtcbiAgICAgICAgICAgIGxldCB3aXJlID0gdGhpcy5nZXRXaXJlQnlJZCh3aXJlSWQpO1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIG90aGVyIGNvbm5lY3RvciB0aGF0IGlzIHRoZSB3aXJlIGNvbm5lY3RlZCB0b1xuICAgICAgICAgICAgbGV0IG90aGVyQ29ubmVjdG9yID0gdGhpcy5nZXRDb25uZWN0b3JCeUlkKHdpcmUuZnJvbUlkLCB3aXJlKTtcbiAgICAgICAgICAgIGlmKG90aGVyQ29ubmVjdG9yLnN2Z09iai5pZD09PWNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJDb25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQod2lyZS50b0lkLCB3aXJlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSB3aXJlIHJlY29yZCBmcm9tIHRoZSBvdGhlciBjb25uZWN0b3JcbiAgICAgICAgICAgIG90aGVyQ29ubmVjdG9yLndpcmVJZHMuZGVsZXRlKHdpcmVJZCk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgd2lyZSByZXByZXNlbnRhdGlvbiB1c2luZyBqUXVlcnlcbiAgICAgICAgICAgICQoXCIjXCIgKyB3aXJlSWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAvLyBpZiBvdGhlckNvbm5lY3RvciBpcyBhbiBpbnB1dCBjb25uZWN0b3IsIHNldCBpdHMgc3RhdGUgdG8gdW5rbm93blxuICAgICAgICAgICAgaWYob3RoZXJDb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgICAgIG90aGVyQ29ubmVjdG9yLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24sIHRoaXMuZ2V0TmV3UHJvcGFnYXRpb25JZCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2xlYXIgdGhlIGxpc3Qgb2Ygd2lyZSBJZHNcbiAgICAgICAgY29ubmVjdG9yLndpcmVJZHMuY2xlYXIoKTtcbiAgICAgICAgLy8gaWYgY29ubmVjdG9yIGlzIGFuIGlucHV0IGNvbm5lY3Rvciwgc2V0IGl0cyBzdGF0ZSB0byB1bmtub3duXG4gICAgICAgIGlmKGNvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICBjb25uZWN0b3Iuc2V0U3RhdGUoTG9naWMuc3RhdGUudW5rbm93biwgdGhpcy5nZXROZXdQcm9wYWdhdGlvbklkKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlJZChnYXRlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5ib3hlc1tpXS5zdmdPYmouaWQ9PT1nYXRlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib3hlc1tpXS5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm94ZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQsIHdpcmUpIHtcbiAgICAgICAgLy8gdGhlIHdpcmUgdmFyaWFibGUgaXMgdXNlZCBhcyBoZXVyaXN0aWMsXG4gICAgICAgIC8vIHdoZW4gd2Uga25vdyB0aGUgd2lyZSwgd2UgaGF2ZSB0byBjaGVjayBvbmx5XG4gICAgICAgIC8vIHR3byBnYXRlcyBpbnN0ZWFkIG9mIGFsbCBvZiB0aGVtXG5cbiAgICAgICAgaWYod2lyZSE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gd2Uga25vdyB0aGUgd2lyZSAtLSB3ZSBjYW4gY2hlY2sgb25seSBnYXRlcyBhdCB0aGUgZW5kcyBvZiB0aGlzIHdpcmVcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3IgPSB3aXJlLnN0YXJ0Qm94LmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgaWYgKCFjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IgPSB3aXJlLmVuZEJveC5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3I7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGRvIG5vdCBrbm93IHRoZSB3aXJlIC0tIHdlIGhhdmUgdG8gY2hlY2sgYWxsIGdhdGVzXG4gICAgICAgICAgICBsZXQgZ2F0ZUNvdW50ID0gdGhpcy5ib3hlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBnYXRlQ291bnQgOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5ib3hlc1tpXS5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgICAgICBpZihjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgb2JqZWN0LCB0aGF0IHVzZXIgaW50ZXJhY3RlZCB3aXRoLCBpcyBub3QgYSBjb25uZWN0b3IgYW5kIGlzIGluIGEgZ3JvdXBcbiAgICAvLyByZXR1cm4gdGhlIGdyb3VwIGpRdWVyeSBvYmplY3QgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgalF1ZXJ5IG9iamVjdFxuICAgIGdldFJlYWxKUXVlcnlUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuICAgICAgICBpZighJHRhcmdldC5oYXNDbGFzcyhcImNvbm5lY3RvclwiKSAmJiAkdGFyZ2V0LnBhcmVudHMoJ2cnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcIkdcIiAmJiAkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcImdcIikge1xuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkdGFyZ2V0O1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIGVkaXRvckVsZW1lbnQgdGhhdCB1c2VyIGludGVyYWN0ZWQgd2l0aCwgdGhlIFwidGFyZ2V0XCIgYXJndW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudFxuICAgIGdldFJlYWxUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIC8vIGV2ZW50eSBzZSBtdXNlamkgenByYWNvdmF0IHRhZHksIHByb3RvemUgdiBTVkcgc2UgZXZlbnR5IG5lcHJvcGFndWppXG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuXG4gICAgICAgIGlmKCR0YXJnZXQuaGFzQ2xhc3MoXCJjb25uZWN0b3JcIikpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjb25uZWN0b3IsIGRvbid0IHRyYXZlcnNlIGdyb3Vwc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYoJHRhcmdldC5wYXJlbnRzKCdnJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gdGhpcyBlbGVtZW50IGlzIGluIGEgZ3JvdXAgYW5kIGl0IGlzIG5vdCBhIGNvbm5lY3RvclxuXG4gICAgICAgICAgICAvLyB0cmF2ZXJzaW5nIHVwIHRoZSBET00gdHJlZSB1bnRpbCB3ZSBmaW5kIHRoZSBjbG9zZXN0IGdyb3VwXG4gICAgICAgICAgICBsZXQgJHBhcmVudEdyb3VwID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkcGFyZW50R3JvdXAucHJvcChcInRhZ05hbWVcIikgIT09IFwiR1wiICYmICRwYXJlbnRHcm91cC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJnXCIpIHtcbiAgICAgICAgICAgICAgICAkcGFyZW50R3JvdXAgPSAkcGFyZW50R3JvdXAucGFyZW50KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJveEJ5SWQoJHBhcmVudEdyb3VwLmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoXCJ3aXJlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRXaXJlQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZEVsZW1lbnQoZWxlbWVudCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRKUXVlcnlPYmplY3QoZWxlbWVudC5nZXQoKSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgYXBwZW5kSlF1ZXJ5T2JqZWN0KG9iamVjdCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmFwcGVuZChvYmplY3QpO1xuICAgICAgICBpZihyZWZyZXNoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFBhdHRlcm4ocGF0dGVybikge1xuICAgICAgICB0aGlzLiRkZWZzLmFwcGVuZChwYXR0ZXJuKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgLy8gcmVsb2FkIHRoZSBTVkcgZG9jdW1lbnQgKG5lZWRlZCB0byBkaXNwbGF5IG5ld2x5IGFwcGVuZGVkIGpRdWVyeSBvYmplY3QpXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmh0bWwodGhpcy4kc3ZnLmh0bWwoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU1ZHIGRvY3VtZW50IGhhcyBiZWVuIHJlbG9hZGVkLlwiKVxuICAgIH1cblxuICAgIGRpc3BsYXlDb250ZXh0TWVudSh4LCB5LCAkdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuZGlzcGxheSh4LCB5LCAkdGFyZ2V0KTtcbiAgICB9XG4gICAgaGlkZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBzbmFwIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc25hcFRvR3JpZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuZ3JpZFNpemUpICogdGhpcy5ncmlkU2l6ZTtcbiAgICB9XG5cbiAgICAvLyBzdGF0aWMgZnVuY3Rpb24gZm9yIHNuYXBwaW5nIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc3RhdGljIHNuYXBUb0dyaWQodmFsdWUsIGdyaWRTaXplKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gZ3JpZFNpemUpICogZ3JpZFNpemU7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBjYW5ub3QgYmUgdXNlZCBmb3Igd2lyaW5nIGF0IGFueSBjaXJjdW1zdGFuY2VzXG4gICAgZ2V0Tm9uUm91dGFibGVOb2RlcygpIHtcbiAgICAgICAgbGV0IGJsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgLy8gZm9yIGVhY2ggYm94XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgalF1ZXJ5IGNoaWxkIHdpdGggY2xhc3MgLnJlY3QgKFwiaGl0Ym94XCIpXG4gICAgICAgICAgICBsZXQgcmVjdCA9ICQoJyMnICsgdGhpcy5ib3hlc1tpXS5zdmdPYmouaWQpLmNoaWxkcmVuKFwiLnJlY3RcIilbMF07XG4gICAgICAgICAgICAvLyBnZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGVcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9ICQocmVjdCkucG9zaXRpb24oKTtcblxuICAgICAgICAgICAgLy8gc25hcCB0aGUgcG9zaXRpb24gdG8gdGhlIGdyaWRcbiAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24ubGVmdCk7XG4gICAgICAgICAgICBwb3NpdGlvbi50b3AgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24udG9wKTtcblxuICAgICAgICAgICAgLy8gZm9yIGVhY2ggaXRlbSBpbiBibG9ja2VkTm9kZXMgKHNldCBvZiBibG9ja2VkIG5vZGVzIHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmVcbiAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IHVwcGVyIGNvcm5lciBvZiByZWN0OyB1bml0IHVzZWQgaXMgXCJvbmUgZ3JpZFNpemVcIikgY29udmVydCB0aGUgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIC8vIHRvIGFic29sdXRlIChtdWx0aXBsZSB3aXRoIGdyaWRTaXplIGFuZCBhZGQgcG9zaXRpb24gb2YgcmVjdCkgYW5kIGFkZCB0aGUgcmVzdWx0IHRvIHRoZSBzZXRcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLmJveGVzW2ldLmJsb2NrZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGxldCBhYnNvbHV0ZVggPSBwb3NpdGlvbi5sZWZ0ICsgaXRlbS54ICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgICAgICAgICBsZXQgYWJzb2x1dGVZID0gcG9zaXRpb24udG9wICsgaXRlbS55ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICAgICAgICAgIGJsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBhYnNvbHV0ZVgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGFic29sdXRlWVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRvZG8gZW5zdXJlIHRoYXQgdGhpcy5yZWZyZXNoKCkgaXMgcmVhbGx5IHVubmVjZXNzYXJ5XG4gICAgICAgIC8vIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gYmxvY2tlZE5vZGVzO1xuICAgIH1cblxuICAgIG1vdmVUb0Zyb250QnlJZChvYmpJZCkge1xuICAgICAgICB0aGlzLiRzdmcuYXBwZW5kKCQoXCIjXCIgKyBvYmpJZCkpO1xuICAgIH1cblxuICAgIG1vdmVUb0JhY2tCeUlkKG9iaklkKSB7XG4gICAgICAgICQoXCIjXCIgKyB0aGlzLmJhY2tncm91bmQuaWQpXG4gICAgICAgICAgICAuYWZ0ZXIoJChcIiNcIiArIG9iaklkKSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBpcyBiZXR0ZXIgbm90IHRvIHVzZSBmb3Igd2lyaW5nXG4gICAgZ2V0SW5jb252ZW5pZW50Tm9kZXMoaWdub3JlV2lyZUlkKSB7XG5cbiAgICAgICAgbGV0IGluY29udmVuaWVudE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAvLyBmb3IgZWFjaCB3aXJlXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy53aXJlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIChpZ25vcmUgdGhlIHdpcmUgdGhhdCBpcyBzcGVjaWZpZWQgaW4gdGhlIGlnbm9yZVdpcmVJZCBhcmd1bWVudCAoaWYgYW55KSlcbiAgICAgICAgICAgIGlmKGlnbm9yZVdpcmVJZD09PXVuZGVmaW5lZCB8fCBpZ25vcmVXaXJlSWQhPT10aGlzLndpcmVzW2ldLnN2Z09iai5pZCkge1xuICAgICAgICAgICAgICAgIC8vIGN5Y2xlIHRocm91Z2ggcG9pbnRzLCBmb3IgZWFjaCBuZWlnYm91cnMgYWRkIGFsbCBwb2ludHMgdGhhdCBhcmUgaW4gYmV0d2VlbiB0aGVtXG4gICAgICAgICAgICAgICAgLy8gaS5lLjogKDAsMCkgYW5kICgwLDMwKSBhcmUgYmxvY2tpbmcgdGhlc2Ugbm9kZXM6ICgwLDApLCAoMCwxMCksICgwLDIwKSwgKDAsMzApXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb2ludDtcbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzW2ldLnBvaW50cy5mb3JFYWNoKChwb2ludCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldlBvaW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcmV2UG9pbnQgaXMgdW5kZWZpbmVkLCBhZGQgdGhlIGZpcnN0IHBvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNvbnZlbmllbnROb2Rlcy5hZGQoe3g6IHBvaW50LngsIHk6IHBvaW50Lnl9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2UgYWRkIGFsbCB0aGUgcG9pbnQgYmV0d2VlbiB0aGUgcHJldlBvaW50IChleGNsdWRlZCkgYW5kIHBvaW50IChpbmNsdWRlZClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJldlBvaW50Lng9PT1wb2ludC54KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmUgaXMgaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tID0gTWF0aC5taW4ocHJldlBvaW50LnksIHBvaW50LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0byA9IE1hdGgubWF4KHByZXZQb2ludC55LCBwb2ludC55KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlKGZyb20gPD0gdG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb252ZW5pZW50Tm9kZXMuYWRkKHt4OiBwb2ludC54LCB5OiBmcm9tfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKz0gdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocHJldlBvaW50Lnk9PT1wb2ludC55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmUgaXMgdmVydGljYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IE1hdGgubWluKHByZXZQb2ludC54LCBwb2ludC54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG8gPSBNYXRoLm1heChwcmV2UG9pbnQueCwgcG9pbnQueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZShmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29udmVuaWVudE5vZGVzLmFkZCh7eDogZnJvbSwgeTogcG9pbnQueX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICs9IHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5lIGlzIG5laXRoZXIgaG9yaXpvbnRhbCBub3IgdmVydGljYWwsIHRocm93IGFuIGVycm9yIGZvciBiZXR0ZXIgZnV0dXJlIGRlYnVnZ2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJnZXRJbmNvbnZlbmllbnROb2RlczogbGluZSBiZXR3ZWVuIHR3byBwb2ludHMgaXMgbmVpdGhlciBob3Jpem9udGFsIG5vciB2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBuZXcgcHJldlBvaW50XG4gICAgICAgICAgICAgICAgICAgIHByZXZQb2ludCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiB0aGUgc2V0XG4gICAgICAgIHJldHVybiBpbmNvbnZlbmllbnROb2RlcztcbiAgICB9XG59IiwiaW1wb3J0IFN2ZyBmcm9tICcuL2NhbnZhcy5qcyc7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGxldCBzdmcgPSBuZXcgU3ZnKFwic3ZnI2NhbnZhc1wiLCAxMCk7XG5cbiAgICAvKiBERU1PICovXG4gICAgLy8gT05FIEJJVCBDT01QQVJBVE9SXG4gICAgLypcbiAgICBsZXQgaTEgPSBzdmcubmV3SW5wdXQoMTAwLCAxMDApO1xuICAgIGxldCBpMiA9IHN2Zy5uZXdJbnB1dCgxMDAsIDIwMCk7XG5cbiAgICBsZXQgbjEgPSBzdmcubmV3R2F0ZShcIm5vdFwiLCAyMDAsIDEwMCk7XG4gICAgbGV0IG4yID0gc3ZnLm5ld0dhdGUoXCJub3RcIiwgMjAwLCAyMDApO1xuXG4gICAgbGV0IGExID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCA5MCk7XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCAyMTApO1xuXG4gICAgbGV0IG5vciA9IHN2Zy5uZXdHYXRlKFwibm9yXCIsIDU0MCwgMTUwKTtcblxuICAgIGxldCBvMSA9IHN2Zy5uZXdPdXRwdXQoNjgwLCA5MCk7XG4gICAgbGV0IG8yID0gc3ZnLm5ld091dHB1dCg2ODAsIDE1MCk7XG4gICAgbGV0IG8zID0gc3ZnLm5ld091dHB1dCg2ODAsIDIxMCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbjEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG4yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKG4xLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShuMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbm9yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGEyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBub3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUobm9yLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzMuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cblxuICAgIC8vIEJJTkFSWSBBRERFUlxuICAgIC8qXG4gICAgbGV0IGkxID0gc3ZnLm5ld0lucHV0KDgwLCA5MCk7XG4gICAgbGV0IGkyID0gc3ZnLm5ld0lucHV0KDgwLCAxMzApO1xuICAgIGxldCBpMyA9IHN2Zy5uZXdJbnB1dCg4MCwgMTgwKTtcblxuICAgIGxldCB4MSA9IHN2Zy5uZXdHYXRlKFwieG9yXCIsIDM2MCwgMTAwKTtcbiAgICBsZXQgeDIgPSBzdmcubmV3R2F0ZShcInhvclwiLCAzNjAsIDE3MCk7XG5cbiAgICBsZXQgYTEgPSBzdmcubmV3R2F0ZShcImFuZFwiLCAyNTAsIDIyMCk7XG4gICAgYTEub25DbGlja01pZGRsZSgpOy8vIGEgamVkbm91IHJvdG92YW55XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgNTAwLCAzMjApO1xuXG4gICAgbGV0IG9yID0gc3ZnLm5ld0dhdGUoXCJvclwiLCA2MjAsIDMxMCk7XG5cbiAgICBsZXQgbzEgPSBzdmcubmV3T3V0cHV0KDc1MCwgMjcwKTtcbiAgICBsZXQgbzIgPSBzdmcubmV3T3V0cHV0KDc1MCwgMzEwKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4MS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDEuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoeDEub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKHgxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGExLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvci5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKHgyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgb3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShvci5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cbn0pOyJdfQ==
