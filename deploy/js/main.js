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
        var $__5 = this;
        $traceurRuntime.superGet(this, OutputConnector.prototype, "setState").call(this, state);
        this.wireIds.forEach(function(wireId) {
          $__5.parentSVG.getWireById(wireId).setState(state);
        });
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
        this.connectors[0].setState(state);
        this.parentSVG.simulator.notifyChange(this.connectors[0].id, state);
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
      this.boxes = [this.startBox, this.endBox];
      this.startConnector = this.parentSVG.getConnectorById(fromId);
      this.endConnector = this.parentSVG.getConnectorById(toId);
      this.connectors = [this.startConnector, this.endConnector];
      this.routeWire();
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
        this.boxes.forEach(function(box) {
          box.refreshState();
        });
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
var $__src_47_es6_47_logicSimulator_46_js__ = (function() {
  "use strict";
  var __moduleName = "src/es6/logicSimulator.js";
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
    }
    return ($traceurRuntime.createClass)(Simulator, {
      run: function() {
        console.log('Simulating the network...');
        this.wave++;
        while (this.waves.has(this.wave)) {
          this.step();
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
            var stateInfo = $__3.value;
            {
              this.whoCausedIt = stateInfo.connectorId;
              if (stateInfo.whoCausedIt) {
                this.addPredecessor(stateInfo.connectorId, stateInfo.whoCausedIt);
              }
              if (stateInfo.connectorId in this.getAllPredecessors(stateInfo.connectorId)) {
                console.error('CYCLE DETECTED', this.getAllPredecessors(stateInfo.connectorId));
                this.waves.clear();
              }
              var connector = this.parentSVG.getConnectorById(stateInfo.connectorId);
              if (connector) {
                connector.setState(stateInfo.state);
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
        var $__2 = this;
        if (fromId === toId)
          return false;
        var connectors = [this.getConnectorById(fromId), this.getConnectorById(toId)];
        connectors.forEach(function(conn) {
          if (conn.isInputConnector)
            $__2.removeWiresByConnectorId(conn.id);
        });
        var index = this.wires.length;
        this.wires[index] = new editorElements.Wire(this, fromId, toId, this.gridSize);
        connectors.forEach(function(conn) {
          conn.addWireId($__2.wires[index].svgObj.id);
        });
        this.appendElement(this.wires[index], refresh);
        this.moveToBackById(this.wires[index].svgObj.id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiIsInNyYy9lczYvc3RydWN0dXJlc0FuZENsYXNzZXMuanMiLCJzcmMvZXM2L3N2Z09iamVjdHMuanMiLCJzcmMvZXM2L2xvZ2ljLmpzIiwic3JjL2VzNi9lZGl0b3JFbGVtZW50cy5qcyIsInNyYy9lczYvY29udGV4dE1lbnUuanMiLCJzcmMvZXM2L2ltcG9ydEV4cG9ydC5qcyIsInNyYy9lczYvZmxvYXRpbmdNZW51LmpzIiwic3JjL2VzNi9sb2dpY1NpbXVsYXRvci5qcyIsInNyYy9lczYvY2FudmFzLmpzIiwic3JjL2VzNi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQUFBSSxJQUFBLENBQUEsWUFBVyxvQ0FBb0IsQ0FBQztBQ0dwQyxBQUFJLElBQUEsQ0FBQSxrQkFBaUIsRUFBSSxLQUFHLENBQUM7SUFFaEIsR0FBQyxFQUxkLENBQUEsU0FBUyxBQUFEO0FBS0QsV0FBTSxHQUFDLENBQ0UsQUFBRCxDQUFHO0FBQ1YsU0FBRyxDQUFDLGtCQUFpQixDQUFFO0FBQ25CLHlCQUFpQixFQUFJLEtBQUcsQ0FBQztNQUM3QjtBQUFBLEFBRUEsU0FBRyxPQUFPLEVBQUksS0FBRyxDQUFDO0FBQ2xCLFNBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBQztBQUVmLFdBQU8sbUJBQWlCLENBQUM7SUFDN0I7QUFvQkosQUFqQ1UsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBZWhDLFFBQUksT0FBSyxFQUFJO0FBQ1QsQUFBSSxVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBSTVCLGNBQU0sQ0FBQSxBQUFDLENBQUMsR0FBRSxFQUFFLE9BQUssQ0FBQyxPQUFPLENBQUc7QUFDeEIsYUFBRyxPQUFPLEVBQUUsQ0FBQztBQUNiLGVBQUssRUFBSSxDQUFBLElBQUcsU0FBUyxBQUFDLEVBQUMsQ0FBQztRQUM1QjtBQUFBLEFBRUEsV0FBRyxPQUFPLEVBQUUsQ0FBQztBQUViLGFBQU8sT0FBSyxDQUFDO01BQ2pC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QUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDL0MsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDcEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FFeEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDbEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDMUQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDOUQsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sWUFBWSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FDOUUsQ0FBQyxDQUFDO01BQ047QUFDTyxTQUFHLENBQVYsVUFBWSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDZCxhQUFPLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxLQUFJLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO01BQ3JDO0FBQ08sUUFBRSxDQUFULFVBQVcsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFHO0FBQ2IsYUFBTyxDQUFBLEtBQUksd0JBQXdCLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQ3ZDLENBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sR0FBRyxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQ3pELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWpFLEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2xELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzFELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzlELEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZ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a0JBQ2IsQ0FBQztnQkFDTCxDQUFDLENBQUM7Y0FHTjtBQUFBO0FBN0NKLG1CQUFZLEVBQUEsQ0FBSSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsTUFBTSxPQUFPLENBQUksR0FBRSxDQUFBOztRQThDMUM7QUFFQSxhQUFPLGtCQUFnQixDQUFDO01BQzVCO09BcEdPLFVBQVMsQ0FBaEIsVUFBa0IsS0FBSSxDQUFHLENBQUEsUUFBTyxDQUFHO0FBQy9CLGFBQU8sQ0FBQSxJQUFHLE1BQU0sQUFBQyxDQUFDLEtBQUksRUFBSSxTQUFPLENBQUMsQ0FBQSxDQUFJLFNBQU8sQ0FBQztNQUNsRCxFQWpld0YsQ0FBQztFQUNyRixBQUFDLEVBQUM7O0FBSFYsU0FBQSxhQUF3QjtBQUFFLGdCQUF3QjtJQUFFLEVBQTdCOzs7O0FBQXZCLEFBQUksSUFBQSxDQUFBLFlBQVcsb0JBQW9CLENBQUM7SUNBN0IsSUFBRTtBQUVULEVBQUEsQUFBQyxDQUFDLFNBQVUsQUFBRCxDQUFHO0FBQ1YsQUFBSSxNQUFBLENBQUEsR0FBRSxFQUFJLElBQUksSUFBRSxBQUFDLENBQUMsWUFBVyxDQUFHLEdBQUMsQ0FBQyxDQUFDO0VBMkV2QyxDQUFDLENBQUM7QUE5RUYsV0FBdUIiLCJmaWxlIjoiL2hvbWUvd2FyYW4vU2tvbGEvcnAvY29kZS90ZW1wb3V0TUM0ek56VTVORFE0TkRjNU16TXhOalU1TmdyZWRyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGwsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzaW5nbGV0b24gdG8gZ2VuZXJhdGUgdW5pcXVlIGlkJ3NcbmxldCBleGlzdGluZ0lkSW5zdGFuY2UgPSBudWxsO1xuLy8gdXNhZ2U6IGxldCBpZCA9IG5ldyBJZCgpLnVuaXF1ZVxuZXhwb3J0IGNsYXNzIElkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYoIWV4aXN0aW5nSWRJbnN0YW5jZSl7XG4gICAgICAgICAgICBleGlzdGluZ0lkSW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVmaXggPSBcImlkXCI7XG4gICAgICAgIHRoaXMubmV4dElkID0gMDtcblxuICAgICAgICByZXR1cm4gZXhpc3RpbmdJZEluc3RhbmNlO1xuICAgIH1cblxuICAgIGdldCB1bmlxdWUoKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSB0aGlzLmdlbmVyYXRlKCk7XG5cbiAgICAgICAgLy8gZmluZCBuZXh0IHVudXNlZCBpZFhYWFggdG8gcHJldmVudCBpZCBjb2xsaXNpb24gdGhhdCBtaWdodCBiZSBjYXVzZWQgYnkgc29tZSBvdGhlciBjb21wb25lbnRcbiAgICAgICAgLy8gKGl0IHJlYWxseSBzaG91bGQgbm90IGhhcHBlbiwgYnV0IHRoaXMgaXMgYSBzaW1wbGUgbWV0aG9kIHRvIGVuc3VyZSBzYWZldHkpXG4gICAgICAgIHdoaWxlKCQoXCIjXCIrcmV0VmFsKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dElkKys7XG4gICAgICAgICAgICByZXRWYWwgPSB0aGlzLmdlbmVyYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMgaWRcbiAgICAgICAgdGhpcy5uZXh0SWQrKztcblxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cblxuICAgIGdlbmVyYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggKyB0aGlzLm5leHRJZDtcbiAgICB9XG59XG5cbi8vIHRvIGVzNSBjb21waWxlciBmcmllbmRseSBpbXBsZW1lbnRhdGlvbiAoXCJjYWxsaW5nIGEgYnVpbHRpbiBNYXAgY29uc3RydWN0b3Igd2l0aG91dCBuZXcgaXMgZm9yYmlkZGVuXCIpXG5leHBvcnQgY2xhc3MgTWFwV2l0aERlZmF1bHRWYWx1ZSB7XG4gICAgY29uc3RydWN0b3IoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmRlZmF1bHQgPSBkZWZhdWx0VmFsdWU7XG5cblxuICAgIH1cblxuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc2l6ZTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgZm9yRWFjaCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5mb3JFYWNoKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldChrZXkpO1xuICAgIH1cblxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmRlbGV0ZShrZXkpO1xuICAgIH1cblxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuaGFzKGtleSk7XG4gICAgfVxuXG4gICAgZW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmVudHJpZXMoKTtcbiAgICB9XG5cbiAgICBrZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAua2V5cygpO1xuICAgIH1cblxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnZhbHVlcygpO1xuICAgIH1cbn1cblxuLypcbi8vIGVzNiBpbXBsZW1lbnRhdGlvblxuZXhwb3J0IGNsYXNzIE1hcFdpdGhEZWZhdWx0VmFsdWUgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGlmKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5nZXQoa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4qLyIsImltcG9ydCAqIGFzIFN0cnVjdHVyZXMgZnJvbSAnLi9zdHJ1Y3R1cmVzQW5kQ2xhc3Nlcy5qcydcblxuY2xhc3MgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHRoaXMudGFnTmFtZSA9IHRhZ05hbWU7XG5cbiAgICAgICAgdGhpcy4kZWwgPSAkKFwiPFwiK3RoaXMudGFnTmFtZStcIj5cIik7XG5cbiAgICAgICAgdGhpcy5pZCA9IG5ldyBTdHJ1Y3R1cmVzLklkKCkudW5pcXVlO1xuICAgIH1cblxuICAgIGFkZENsYXNzKG5hbWUpIHtcbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MobmFtZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2xhc3NlcyguLi5jbGFzc2VzKSB7XG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiBjbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcyhpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEF0dHIoYXNzb2MpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG5cbiAgICAgICAgLy8gYWRkIGF0dHJpYnV0ZXMgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy4kZWwuYXR0cihhc3NvYyk7XG4gICAgfVxuXG4gICAgZ2V0QXR0cihuYW1lKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLiRlbC5hdHRyKG5hbWUpO1xuICAgIH1cblxuICAgIHJlbW92ZUF0dHIobmFtZSkge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcblxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVBdHRyKG5hbWUpO1xuICAgIH1cblxuICAgIHNldCBpZChpZCkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wiaWRcIjogaWR9KTtcbiAgICB9O1xuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyKFwiaWRcIik7XG4gICAgfTtcblxuICAgIGdldCgpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbDtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgZWxlbWVudCBleGlzdHMgaW4gZG9tLCB3ZSBuZWVkIHRvIGZldGNoIGl0IHVzaW5nIGpRdWVyeVxuICAgIGNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKSB7XG4gICAgICAgIGxldCAkanFFbGVtZW50ID0gJChcIiNcIit0aGlzLiRlbC5hdHRyKCdpZCcpKTtcbiAgICAgICAgaWYoJGpxRWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJGpxRWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuICAgIH1cblxuICAgIGRyYWdnYWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wiZHJhZ2dhYmxlXCI6IHZhbHVlfSk7XG4gICAgfVxufVxuXG5jbGFzcyBSb3RhdGFibGUgZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgcm90YXRhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJyb3RhdGFibGVcIjogdmFsdWV9KTtcbiAgICB9XG59XG5cbi8vIHRoZXJlIGlzIG5vIG11bHRpcGxlIGluaGVyaXRhbmNlIGluIEVTNiwgc28gSSBoYXZlIHRvIGRvIHNvbWV0aGluZyB1Z2x5IGxpa2UgdGhpc1xuY2xhc3MgRHJhZ2dhYmxlUm90YXRhYmxlIGV4dGVuZHMgRHJhZ2dhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcih0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHJvdGF0YWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1wicm90YXRhYmxlXCI6IHZhbHVlfSk7XG4gICAgfVxufVxuXG5jbGFzcyBTdmdFbGVtZW50IGV4dGVuZHMgRHJhZ2dhYmxlUm90YXRhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoLCB0YWdOYW1lKSB7XG4gICAgICAgIHN1cGVyKHRhZ05hbWUpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIFN2Z0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIGZpbGwsIHN0cm9rZSkge1xuICAgICAgICBzdXBlcih4LCB5LCB3LCBoLCBcInJlY3RcIik7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBmaWxsOiBmaWxsLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2UsXG4gICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMC41LFxuICAgICAgICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ2FsbCcgLy8gdG8gdHJpZ2dlciBob3ZlciBldmVuIHdpdGggdHJhbnNwYXJlbnQgYmFja2dyb3VuZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdmdJbWFnZSBleHRlbmRzIFN2Z0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIHVybCkge1xuICAgICAgICBzdXBlcih4LCB5LCB3LCBoLCBcImltYWdlXCIpO1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgXCJ4bGluazpocmVmXCI6IHVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VVcmwodXJsKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBcInhsaW5rOmhyZWZcIjogdXJsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyb3VwIGV4dGVuZHMgRHJhZ2dhYmxlUm90YXRhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJnXCIpO1xuICAgIH1cblxuICAgIGFkZENoaWxkKGVsKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChlbC4kZWwpO1xuICAgICAgICByZXR1cm4gZWw7IC8vIHBybyBqZWRub2R1c3NpIFwibGV0IHJlY3QgPSBnLmFkZENoaWxkKG5ldyBSZWN0YW5nbGUoLi4uXCJcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2x5bGluZVBvaW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIGlmKHggIT09IHVuZGVmaW5lZCAmJiB5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0KHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VGcm9tU3RyaW5nKHN0cmluZykge1xuICAgICAgICBsZXQgYXJyID0gc3RyaW5nLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2x5bGluZVBvaW50KGFyclswXSwgYXJyWzFdKTtcbiAgICB9XG5cbiAgICBnZXQgc3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICsgXCIsXCIgKyB0aGlzLnk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFscyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnggPT09IGIueCAmJiBhLnkgPT09IGIueTtcbiAgICB9XG59XG5cbmNsYXNzIFNtYXJ0QXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycikge1xuICAgICAgICBpZihhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hcnIgPSBhcnI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFyciA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIFNtYXJ0QXJyYXkoJC5leHRlbmQodHJ1ZSwgW10sIHRoaXMuYXJyKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKHBvaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFdpdGhJbmRleChwb2ludCwgdGhpcy5hcnIubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBwcmVwZW5kKHBvaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFdpdGhJbmRleChwb2ludCwgMCk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGEgcG9pbnQgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgbW92ZSBhbGwgZm9sbG93aW5nIGl0ZW1zXG4gICAgYWRkV2l0aEluZGV4KHBvaW50LCBpbmRleCkge1xuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLmFyci5sZW5ndGggOyBpID4gaW5kZXggOyAtLWkpIHtcbiAgICAgICAgICAgIHRoaXMuYXJyW2ldID0gdGhpcy5hcnJbaS0xXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFycltpbmRleF0gPSBwb2ludDtcbiAgICAgICAgcmV0dXJuIHRoaXM7IC8vIHRvIGVuYWJsZSBjaGFpbmluZyBvZiBhcHBlbmQgLyBwcmVwcGVuZCAvIGFkZFdpdGhJbmRleCBjb21tYW5kc1xuICAgIH1cblxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyci5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0SXRlbShpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnJbaW5kZXhdO1xuICAgIH1cblxuICAgIGdldCBsYXN0KCkge1xuICAgICAgICBpZih0aGlzLmxlbmd0aCE9PTApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFyclt0aGlzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGZpcnN0KCkge1xuICAgICAgICBpZih0aGlzLmxlbmd0aCE9PTApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFyclswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGluZGV4QXJyYXkgbXVzdCBiZSBzb3J0ZWQgKEFTQywgZWcuIFsxLCAzLCA0LCA4XSlcbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IGluZGV4IDsgaSA8IGxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5hcnJbaV0gPSB0aGlzLmFycltpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcnIucG9wKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUG9seWxpbmVQb2ludHMgZXh0ZW5kcyBTbWFydEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcbiAgICAgICAgc3VwZXIoYXJyKTtcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvbHlsaW5lUG9pbnRzKCQuZXh0ZW5kKHRydWUsIFtdLCB0aGlzLmFycikpO1xuICAgIH1cblxuICAgIGFwcGVuZChwb2ludCkge1xuICAgICAgICAvLyBjYWxsIGluaGVyaXRlZCBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIGFwcGVuZGluZ1xuICAgICAgICBzdXBlci5hcHBlbmQocG9pbnQpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBzZWNvbmQgdG8gbGFzdCBwb2ludCBpcyB1bm5lY2Vzc2FyeSwgcmVtb3ZlIGl0XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgaWYgKCBsZW5ndGggPj0gM1xuICAgICAgICAgICAgICAgICYmICggICAgKCB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMykueCA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnggPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAxKS54IClcbiAgICAgICAgICAgICAgICAgICAgIHx8ICggdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDMpLnkgPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS55ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAyKS55ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMSkueSApXG4gICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGxlbmd0aCAtIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMgZWxlbWVudCAodG8gYWxsb3cgY2hhaW5pbmcpXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHBhcnNlRnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgbGV0IHBvaW50U3RyaW5ncyA9IHN0cmluZy5zcGxpdChcIiBcIik7XG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgUG9seWxpbmVQb2ludHMoKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHBvaW50U3RyaW5ncy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIHBvaW50cy5hcHBlbmQoUG9seWxpbmVQb2ludC5wYXJzZUZyb21TdHJpbmcocG9pbnRTdHJpbmdzW2ldKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIGdldCBzdHJpbmcoKSB7XG4gICAgICAgIGxldCBzdHJpbmcgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBpZihpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyaW5nICs9IHRoaXMuYXJyW2ldLnN0cmluZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgIH1cblxuICAgIGZvckVhY2goZnVuYykge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYXJyLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgZnVuYyh0aGlzLmFycltpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2x5TGluZSBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IocG9pbnRzLCBjb2xvciwgc3Ryb2tlV2lkdGgpIHtcbiAgICAgICAgc3VwZXIoXCJwb2x5bGluZVwiKTtcblxuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgcG9pbnRzOiBwb2ludHMuc3RyaW5nLFxuICAgICAgICAgICAgc3Ryb2tlOiBjb2xvcixcbiAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgXCJzdHJva2Utd2lkdGhcIjogc3Ryb2tlV2lkdGhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlUG9pbnRzKHBvaW50cykge1xuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgcG9pbnRzOiBwb2ludHMuc3RyaW5nXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhdHRlcm4gZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKGlkLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKFwicGF0dGVyblwiKTtcblxuICAgICAgICB0aGlzLmFkZEF0dHIoe1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIHBhdHRlcm5Vbml0czogXCJ1c2VyU3BhY2VPblVzZVwiLFxuICAgICAgICAgICAgdmlld0JveDogXCIwIDAgXCIrd2lkdGgrXCIgXCIraGVpZ2h0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZENoaWxkKGVsKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChlbC4kZWwpO1xuICAgICAgICByZXR1cm4gZWw7IC8vIHBybyBqZWRub2R1c3NpIFwibGV0IHJlY3QgPSBnLmFkZENoaWxkKG5ldyBSZWN0YW5nbGUoLi4uXCJcbiAgICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGxvZ2ljIGZ1bmN0aW9ucyB1c2VkIGluIHRoZSBnYXRlIGV2YWx1YXRpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2ljIHtcbiAgICBzdGF0aWMgYW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLnRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIFtcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vZmZdLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLnVua25vd25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ11cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHN0YXRpYyBuYW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLm5vdChMb2dpYy5hbmQoYSwgYikpO1xuICAgIH1cbiAgICBzdGF0aWMgbm9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLm5vdChMb2dpYy5vcihhLCBiKSk7XG4gICAgfVxuICAgIHN0YXRpYyBub3QoYSkge1xuICAgICAgICBpZihhID09PSBMb2dpYy5zdGF0ZS5vbikge1xuICAgICAgICAgICAgcmV0dXJuIExvZ2ljLnN0YXRlLm9mZjtcbiAgICAgICAgfSBlbHNlIGlmIChhID09PSBMb2dpYy5zdGF0ZS5vZmYpIHtcbiAgICAgICAgICAgIHJldHVybiBMb2dpYy5zdGF0ZS5vbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBvcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy50ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBbXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vbl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBzdGF0aWMgeG5vcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy5ub3QoTG9naWMueG9yKGEsIGIpKTtcbiAgICB9XG4gICAgc3RhdGljIHhvcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBMb2dpYy50ZXN0TG9naWNSdWxlc1N5bW1ldHJpYyhhLCBiLCBbXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ10sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1bmtub3duOiAwLFxuICAgICAgICAgICAgb246IDEsXG4gICAgICAgICAgICBvZmY6IDIsXG4gICAgICAgICAgICBvc2NpbGxhdGluZzogM1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIHJ1bGVzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHJ1bGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoKHJ1bGVzW2ldWzBdPT09YSAmJiBydWxlc1tpXVsxXT09PWIpIHx8IChydWxlc1tpXVswXT09PWIgJiYgcnVsZXNbaV1bMV09PT1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBydWxlc1tpXVsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBzdmdPYmogZnJvbSAnLi9zdmdPYmplY3RzLmpzJ1xuaW1wb3J0ICogYXMgU3RydWN0dXJlcyBmcm9tICcuL3N0cnVjdHVyZXNBbmRDbGFzc2VzLmpzJ1xuaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMuanMnXG5cbi8vIG1hcHBpbmcgbG9naWNhbCBzdGF0ZXMgdG8gY3NzIGNsYXNzZXNcbmNvbnN0IHN0YXRlQ2xhc3NlcyA9IHtcbiAgICBvbjogXCJzdGF0ZU9uXCIsXG4gICAgb2ZmOiBcInN0YXRlT2ZmXCIsXG4gICAgdW5rbm93bjogXCJzdGF0ZVVua25vd25cIixcbiAgICBvc2NpbGxhdGluZzogXCJzdGF0ZU9zY2lsbGF0aW5nXCJcbn07XG5cbi8vIGhlbHBlciBjbGFzcyB1c2VkIGJ5IFRyYW5zZm9ybVxuY2xhc3MgUHJvcGVydHkge1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZykge1xuICAgICAgICBpZihzdHJpbmchPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHN0cmluZy5yZXBsYWNlKC9eWyBdKihbXihdKykuKi8sIFwiJDFcIik7XG4gICAgICAgICAgICB0aGlzLmFyZ3MgPSBzdHJpbmcucmVwbGFjZSgvXlteKF0rXFwoKC4qKVxcKS8sIFwiJDFcIikuc3BsaXQoJyAnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE5hbWUobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIHNldEFyZ3VtZW50cyhhcmdzKSB7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCIoXCIgKyB0aGlzLmFyZ3Muam9pbihcIiBcIikgKyBcIilcIjtcbiAgICB9XG59XG5cbi8vIHVzZWQgdG8gbWFuaXB1bGF0ZSB0aGUgdHJhbnNmb3JtIGFyZ3VtZW50IHVzZWQgaW4gU1ZHXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgICAgIGlmKHN0cmluZyE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IHNwbGl0SXRlbXMgPSBzdHJpbmcuc3BsaXQoXCIpXCIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBzcGxpdEl0ZW1zLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKHNwbGl0SXRlbXNbaV0pIHsgLy8gaWYgbm90IGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgUHJvcGVydHkoc3BsaXRJdGVtc1tpXSArIFwiKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBpbmRleCBvciAtMVxuICAgIGdldEluZGV4KG5hbWUpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihuYW1lID09PSB0aGlzLml0ZW1zW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBnZXRUcmFuc2xhdGUoKSB7XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5nZXRBcmd1bWVudHModGhpcy5nZXRJbmRleChcInRyYW5zbGF0ZVwiKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGFyZ3NbMF0sXG4gICAgICAgICAgICB5OiBhcmdzWzFdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRSb3RhdGUoKSB7XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5nZXRBcmd1bWVudHModGhpcy5nZXRJbmRleChcInJvdGF0ZVwiKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlZzogYXJnc1swXSxcbiAgICAgICAgICAgIGNlbnRyZVg6IGFyZ3NbMV0sXG4gICAgICAgICAgICBjZW50cmVZOiBhcmdzWzJdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXRzIHRoZSB0cmFuc2xhdGlvblxuICAgIHNldFRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFwidHJhbnNsYXRlXCIsIFt4LCB5XSk7XG4gICAgfVxuXG4gICAgLy8gc2V0cyB0aGUgcm90YXRpb25cbiAgICBzZXRSb3RhdGUoZGVnLCBjZW50cmVYLCBjZW50cmVZKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFwicm90YXRlXCIsIFtkZWcsIGNlbnRyZVgsIGNlbnRyZVldKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdGhlIHJvdGF0aW9uXG4gICAgcm90YXRlUmlnaHQoY2VudHJlWCwgY2VudHJlWSkge1xuICAgICAgICBpZih0aGlzLmdldEluZGV4KFwicm90YXRlXCIpPT09LTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Um90YXRlKDkwLCBjZW50cmVYLCBjZW50cmVZKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXdSb3RhdGlvbiA9IChwYXJzZUludCh0aGlzLmdldFJvdGF0ZSgpLmRlZykgKyA5MCkgJSAzNjA7XG5cbiAgICAgICAgICAgIGlmKG5ld1JvdGF0aW9uPT09MTgwKSB7XG4gICAgICAgICAgICAgICAgLy8gc3dhcCBjZW50cmUgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIHJvdGF0ZShjLCB4LCB5KSBpcyBkZWZpbmVkIGxpa2UgdHJhbnNmb3JtKC14LCAteSkgcm90YXRlKGMpIHRyYW5zZm9ybSh4LCB5KVxuICAgICAgICAgICAgICAgIGxldCBhID0gY2VudHJlWDtcbiAgICAgICAgICAgICAgICBjZW50cmVYID0gY2VudHJlWTtcbiAgICAgICAgICAgICAgICBjZW50cmVZID0gYTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRSb3RhdGUoXG4gICAgICAgICAgICAgICAgbmV3Um90YXRpb24sXG4gICAgICAgICAgICAgICAgY2VudHJlWCxcbiAgICAgICAgICAgICAgICBjZW50cmVZXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0aGUgdHJhbnNmb3JtIHByb3BlcnRpZXMgY29uY2F0ZW5hdGVkXG4gICAgZ2V0KCkge1xuICAgICAgICBsZXQgcmV0VmFsID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoaSE9PTApIHtcbiAgICAgICAgICAgICAgICByZXRWYWwgKz0gXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXRWYWwgKz0gdGhpcy5pdGVtc1tpXS5nZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cblxuICAgIGdldEFyZ3VtZW50cyhpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tpbmRleF0uYXJncztcbiAgICB9XG5cbiAgICBzZXRQYXJhbWV0ZXIobmFtZSwgYXJncykge1xuICAgICAgICAvLyBkZXRlcm1pbmUgaW5kZXggb2YgdGhlIHBhcmFtZXRlciAoaWYgc2V0KSwgZWxzZSBpbmRleCA9PSAtMVxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4KG5hbWUpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBoYXMgYmVlbiBhbHJlYWR5IHNldCwgY2hhbmdlIGl0IChyZXdyaXRlIHRoZSBhcnJheSBpbiB0aGUgcmlnaHQgaW5kZXgpXG4gICAgICAgIC8vIGVsc2UgY3JlYXRlIGEgbmV3IG9uZSAoc2V0IGluZGV4IHRvIHRoZSBsZW5ndGggb2YgYW4gYXJyYXkgLS0+IGFkIGFuIGl0ZW0gdG8gdGhlIGVuZClcbiAgICAgICAgaWYoaW5kZXg9PT0tMSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdID0gbmV3IFByb3BlcnR5KCk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5zZXROYW1lKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2F2ZSBhcmdzIHVuZGVyIHRoZSByaWdodCBpbmRleFxuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5zZXRBcmd1bWVudHMoYXJncyk7XG4gICAgfVxufVxuXG4vLyBwYXJlbnQgY2xhc3MgZm9yIGFsbCBuZXR3b3JrIGVsZW1lbnRzXG5jbGFzcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIGlmKCFwYXJlbnRTVkcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQYXJlbnQgU1ZHIGVsZW1lbnQgaGFzIG5vdCBiZWVuIGRlZmluZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIC8vIHVzZWQgdG8gc3RvcmUgdGhlIHN2ak9iamVjdCdzIGluc3RhbmNlIG9mIHRoaXMgZWxlbWVudFxuICAgICAgICB0aGlzLnN2Z09iaiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iai5pZDtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bigpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24gdG8gcHJldmVudCBlcnJvciBtZXNzYWdlcywgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbGF0ZXIgaW4gdGhlIEJveCBjbGFzc1xuICAgIH1cblxuICAgIG9uTW91c2VVcCgpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24gdG8gcHJldmVudCBlcnJvciBtZXNzYWdlcywgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbGF0ZXIgaW4gdGhlIEJveCBhbmQgQ29ubmVjdG9yIGNsYXNzZXNcbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZSgpIHtcbiAgICAgICAgLy8gZW1wdHkgZnVuY3Rpb24gdG8gcHJldmVudCBlcnJvciBtZXNzYWdlcywgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbGF0ZXIgaW4gdGhlIEJveCBjbGFzc1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiJ2pzb24nIGdldHRlciBoYXMgbm90IGJlZW4gZGVmaW5lZCBmb3IgdGhpcyBlbGVtZW50XCIsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBpbnB1dCBhbmQgb3V0cHV0IGNvbm5lY3RvcnMgKHRoZSB0aGluZ3MgeW91IGNsaWNrIG9uXG4vLyB3aGVuIHlvdSB3YW50IHRvIGNvbm5lY3QgZWxlbWVudHMpXG5jbGFzcyBDb25uZWN0b3IgZXh0ZW5kcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKSB7IC8vIHVuaXQgb2YgbGVmdCAvIHRvcCBpcyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZFxuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTaXplID0gZ3JpZFNpemU7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yT2Zmc2V0ID0gdGhpcy5jb25uZWN0b3JTaXplIC8gMjtcblxuICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouUmVjdGFuZ2xlKFxuICAgICAgICAgICAgbGVmdCAqIHRoaXMuZ3JpZFNpemUgLSB0aGlzLmNvbm5lY3Rvck9mZnNldCxcbiAgICAgICAgICAgIHRvcCAqIHRoaXMuZ3JpZFNpemUgLSB0aGlzLmNvbm5lY3Rvck9mZnNldCxcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2l6ZSxcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2l6ZSxcbiAgICAgICAgICAgIFwibm9uZVwiLFxuICAgICAgICAgICAgXCJibGFja1wiXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKFwiY29ubmVjdG9yXCIpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gZmFsc2U7XG5cbiAgICAgICAgLy8gaWYgYSB3aXJlIGNhbiBzZXQgY29ubmVjdG9yJ3Mgc3RhdGVcbiAgICAgICAgdGhpcy5pc0lucHV0Q29ubmVjdG9yID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBMb2dpYy5zdGF0ZS51bmtub3duO1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG5cbiAgICAgICAgdGhpcy53aXJlSWRzID0gbmV3IFNldCgpO1xuICAgIH1cblxuICAgIGdldCBpc091dHB1dENvbm5lY3RvcigpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzSW5wdXRDb25uZWN0b3I7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5wdXRDb25uZWN0b3I6IDAsXG4gICAgICAgICAgICBvdXRwdXRDb25uZWN0b3I6IDFcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFdpcmVJZCh3aXJlSWQpIHtcbiAgICAgICAgdGhpcy53aXJlSWRzLmFkZCh3aXJlSWQpO1xuICAgIH1cblxuICAgIHJlbW92ZVdpcmVJZCh3aXJlSWQpIHtcbiAgICAgICAgdGhpcy53aXJlSWRzLmRlbGV0ZSh3aXJlSWQpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZXMgdGhlIHdpcmUgYW5kIHVwZGF0ZXMgdGhlIGNvbm5lY3RvclxuICAgIHJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVXaXJlSWQod2lyZUlkKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSwgcHJvcGFnYXRpb25JZCkge1xuICAgICAgICB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub2ZmOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vZmYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlQXR0cjtcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iajtcbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHLndpcmVDcmVhdGlvbkhlbHBlcih0aGlzLnN2Z09iai5pZCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRDb25uZWN0b3IgZXh0ZW5kcyBDb25uZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuXG5cbiAgICAgICAgdGhpcy50eXBlID0gQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3I7XG4gICAgICAgIHRoaXMuaXNJbnB1dENvbm5lY3RvciA9IHRydWU7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3VwZXIuc2V0U3RhdGUoc3RhdGUpO1xuXG4gICAgICAgIGxldCBnYXRlID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZCh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIGdhdGUucmVmcmVzaFN0YXRlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCkge1xuICAgICAgICBzdXBlci5yZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShMb2dpYy5zdGF0ZS51bmtub3duKTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRDb25uZWN0b3IgZXh0ZW5kcyBDb25uZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuXG4gICAgICAgIC8vIHVzZWQgdG8gc2V0IHRoZSB3aXJlIHN0YXRlIGR1cmluZyB3aXJlIGluaXRpYWxpemF0aW9uIGJhc2VkIG9uIHRoZSBvdXRwdXQgY29ubmVjdG9yIHN0YXRlXG4gICAgICAgIHRoaXMuaXNPdXRwdXQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudHlwZSA9IENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3RvcjtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBzdXBlci5zZXRTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgdGhpcy53aXJlSWRzLmZvckVhY2god2lyZUlkID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLmdldFdpcmVCeUlkKHdpcmVJZClcbiAgICAgICAgICAgICAgICAuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGF0ZTtcbiAgICB9XG59XG5cbi8vIHBhcmVudCBjbGFzcyBmb3IgZ2F0ZXMgYW5kIGlucHV0IGFuZCBvdXRwdXQgYm94ZXNcbmNsYXNzIEJveCBleHRlbmRzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIG5hbWUsIGNhdGVnb3J5LCBncmlkV2lkdGgsIGdyaWRIZWlnaHQpIHtcbiAgICAgICAgc3VwZXIocGFyZW50U1ZHKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSB0aGlzLnBhcmVudFNWRy5ncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLnVybCA9IFwiaW1nL1wiICsgdGhpcy5jYXRlZ29yeSArIFwiL1wiICsgdGhpcy5uYW1lICsgXCIuc3ZnXCI7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0b3JzID0gW107XG5cbiAgICAgICAgdGhpcy5zdmdPYmogPSBuZXcgc3ZnT2JqLkdyb3VwKCk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IGdyaWRXaWR0aCAqIHRoaXMuZ3JpZFNpemU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZ3JpZEhlaWdodCAqIHRoaXMuZ3JpZFNpemU7XG5cbiAgICAgICAgdGhpcy5ncmlkV2lkdGggPSBncmlkV2lkdGg7XG4gICAgICAgIHRoaXMuZ3JpZEhlaWdodCA9IGdyaWRIZWlnaHQ7XG5cbiAgICAgICAgLy8gdHJhbnNwYXJlbnQgYmFja2dyb3VuZCByZWN0YW5nbGVcbiAgICAgICAgbGV0IHJlY3RhbmdsZSA9IG5ldyBzdmdPYmouUmVjdGFuZ2xlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBcIm5vbmVcIiwgXCJub25lXCIpO1xuICAgICAgICByZWN0YW5nbGUuJGVsLmFkZENsYXNzKCdyZWN0Jyk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENoaWxkKHJlY3RhbmdsZSk7XG4gICAgICAgIC8vIGltYWdlIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgc3ZnT2JqLlN2Z0ltYWdlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLnVybCk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENoaWxkKHRoaXMuaW1hZ2UpO1xuXG4gICAgICAgIC8vIGFkZCBkcmFnZ2FiaWxpdHkgYW5kIHJvdGF0YWJpbGl0eVxuICAgICAgICB0aGlzLnN2Z09iai5kcmFnZ2FibGUodHJ1ZSk7XG4gICAgICAgIHRoaXMuc3ZnT2JqLnJvdGF0YWJsZSh0cnVlKTtcblxuICAgICAgICAvLyBhZGQgdHlwZT1cImdhdGVcIiwgdXNlZCBpbiBzcGVjaWFsIGNhbGxiYWNrcyBpbiBjb250ZXh0bWVudVxuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInR5cGVcIjogY2F0ZWdvcnl9KTtcblxuICAgICAgICB0aGlzLnN2Z09iai4kZWwuYWRkQ2xhc3MoXCJib3hcIik7XG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhjYXRlZ29yeSk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZUJsb2NrTm9kZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgbGV0IGNvbm5lY3Rpb25zID0gW107XG5cbiAgICAgICAgLy8gZ28gdGhyb3VnaCBhbGwgY29ubmVjdG9yc1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLmNvbm5lY3RvcnMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICAvLyBmb3IgYWxsIGNvbm5lY3RvciB0aGF0IGhhcyBhdCBsZWFzdCBvbmUgd2lyZSBjb25uZWN0ZWRcbiAgICAgICAgICAgIGlmKHRoaXMuY29ubmVjdG9yc1tpXS53aXJlSWRzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZ28gdGhyb3VnaCBlYWNoIGl0cyB3aXJlIGlkXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzW2ldLndpcmVJZHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRoaXNXaXJlSWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuaGFzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgd2lyZSBpZCBpcyBub3QgaW4gdGhlIG1hcCwgYWRkIGl0IGFuZCBhc3NpZ24gbmV3IGFyYml0cmFyeSBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkTWFwLnNldChpdGVtLCB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1dpcmVJZCA9IHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZCsrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBnZXQgaWQgZnJvbSB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzV2lyZUlkID0gdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkTWFwLmdldChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoaXMgY29ubmVjdGlvbiB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uc1tjb25uZWN0aW9ucy5sZW5ndGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLmNvbm5lY3RvcnNbaV0udHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpcmVJZDogdGhpc1dpcmVJZFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIC8vIGlkOiB0aGlzLnN2Z09iai5pZCxcbiAgICAgICAgICAgIGNhdGVnb3J5OiB0aGlzLmNhdGVnb3J5LFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0aGlzLmdldFRyYW5zZm9ybSgpLFxuICAgICAgICAgICAgY29ubmVjdGlvbnM6IGNvbm5lY3Rpb25zXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKG1hcmdpblRvcCA9IDAsIG1hcmdpblJpZ2h0ID0gMCwgbWFyZ2luQm90dG9tID0gMCwgbWFyZ2luTGVmdCA9IDAsIC4uLnNwZWNpYWxOb2Rlcykge1xuICAgICAgICB0aGlzLmJsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yKGxldCB4ID0gbWFyZ2luTGVmdCA7IHggPD0gdGhpcy5ncmlkV2lkdGggLSBtYXJnaW5SaWdodCA7IHgrKykge1xuICAgICAgICAgICAgZm9yKGxldCB5ID0gbWFyZ2luVG9wIDsgeSA8PSB0aGlzLmdyaWRIZWlnaHQgLSBtYXJnaW5Cb3R0b20gOyB5KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICB5OiB5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBub2RlIG9mIHNwZWNpYWxOb2Rlcykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuYWRkKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiwgcmVkZWZpbmVkIGluIGluaGVyaXRlZCBlbGVtZW50c1xuICAgICAgICAvLyByZWZyZXNoU3RhdGUgdGFrZXMgaW5wdXQgY29ubmVjdG9yIHZhbHVlcyBhbmQgc2V0cyBvdXRwdXQgdmFsdWVzIGFjY29yZGluZ2x5XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNhbGxpbmcgdGhlIHZpcnR1YWwgZnVuY3Rpb24gcmVmcmVzaFN0YXRlIGhhcyBubyBlZmZlY3QuXCIpO1xuICAgIH1cblxuICAgIC8vIHVzYWdlOiBjaGFuZ2VJbWFnZShcImFiY1wiKSBjaGFuZ2VzIGltYWdlIHVybCB0byBpbWFnZS1hYmMuc3ZnXG4gICAgLy8gICAgICAgIGNoYW5nZUltYWdlKCkgY2hhbmdlcyBpbWFnZSB1cmwgdG8gdGhlIGRlZmF1bHQgb25lIChpbWFnZS5zdmcpXG4gICAgY2hhbmdlSW1hZ2Uoc3VmZml4KSB7XG4gICAgICAgIGlmKHN1ZmZpeCA9PT0gdW5kZWZpbmVkIHx8IHN1ZmZpeCA9PT0gXCJcIikge1xuICAgICAgICAgICAgc3VmZml4ID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1ZmZpeCA9IFwiLVwiICsgc3VmZml4O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXJsID0gXCJpbWcvXCIgKyB0aGlzLmNhdGVnb3J5ICsgXCIvXCIgKyB0aGlzLm5hbWUgKyBzdWZmaXggKyBcIi5zdmdcIjtcblxuICAgICAgICB0aGlzLmltYWdlLmNoYW5nZVVybCh0aGlzLnVybCk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBhIGpRdWVyeSBvYmplY3RcbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iai5nZXQoKTtcbiAgICB9XG5cbiAgICByZW1vdmVCbG9ja2VkTm9kZSh4LCB5KSB7XG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLmJsb2NrZWROb2Rlcykge1xuICAgICAgICAgICAgaWYoaXRlbS54PT09eCAmJiBpdGVtLnk9PT15KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMuZGVsZXRlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcm90YXRlQmxvY2tlZE5vZGVzUmlnaHQoKSB7XG4gICAgICAgIGlmKHRoaXMucm90YXRpb249PT11bmRlZmluZWQgfHwgdGhpcy5yb3RhdGlvbj09PTQpIHtcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm90YXRpb24rKztcblxuICAgICAgICBpZih0aGlzLnJvdGF0aW9uID09PSAxIHx8IHRoaXMucm90YXRpb24gPT09IDMpIHtcbiAgICAgICAgICAgIGxldCBuZXdCbG9ja2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIG5ld0Jsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmFicyhpdGVtLnkgLSB0aGlzLmdyaWRIZWlnaHQpLFxuICAgICAgICAgICAgICAgICAgICB5OiBpdGVtLnhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5ibG9ja2VkTm9kZXMgPSBuZXdCbG9ja2VkTm9kZXM7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLnJvdGF0aW9uID09PSAyIHx8IHRoaXMucm90YXRpb24gPT09IDQpIHtcbiAgICAgICAgICAgIGxldCBuZXdCbG9ja2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIG5ld0Jsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmFicyhpdGVtLnkgLSB0aGlzLmdyaWRXaWR0aCksXG4gICAgICAgICAgICAgICAgICAgIHk6IGl0ZW0ueFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2RlcyA9IG5ld0Jsb2NrZWROb2RlcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENvbm5lY3RvcihsZWZ0LCB0b3AsIGNvbm5lY3RvclR5cGUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jb25uZWN0b3JzLmxlbmd0aDtcbiAgICAgICAgaWYoY29ubmVjdG9yVHlwZT09PUNvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbaW5kZXhdID0gbmV3IElucHV0Q29ubmVjdG9yKHRoaXMucGFyZW50U1ZHLCB0aGlzLmdyaWRTaXplLCBsZWZ0LCB0b3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzW2luZGV4XSA9IG5ldyBPdXRwdXRDb25uZWN0b3IodGhpcy5wYXJlbnRTVkcsIHRoaXMuZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQodGhpcy5jb25uZWN0b3JzW2luZGV4XS5nZXQoKSk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVCbG9ja2VkTm9kZShsZWZ0LCB0b3ApO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIGNvbm5lY3RvciBvYmplY3QgYmFzZWQgb24gaXRzIGlkXG4gICAgZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuY29ubmVjdG9ycy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY29ubmVjdG9yc1tpXS5pZD09PWNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBjb25uZWN0b3Igbm90IGZvdW5kLCByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNmb3JtKCkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtO1xuICAgICAgICBpZiAoIXRoaXMuc3ZnT2JqLiRlbC5hdHRyKFwidHJhbnNmb3JtXCIpKSB7XG4gICAgICAgICAgICAvLyB0aGUgZWxlbWVudCBkb2VzIG5vdCBoYXZlIGEgXCJ0cmFuc2Zvcm1cIiBwcm9wZXJ0eSAtLT4gY3JlYXRlIGl0XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKCk7XG4gICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKDAsIDApO1xuICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGUgZWxlbWVudCBkb2VzIGhhdmUgYSBcInRyYW5zZm9ybVwiIHByb3BlcnR5IC0tPiBjaGFuZ2UgaXRcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcy5zdmdPYmouJGVsLmF0dHIoXCJ0cmFuc2Zvcm1cIikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm07XG4gICAgfVxuXG4gICAgc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInRyYW5zZm9ybVwiOiB0cmFuc2Zvcm0uZ2V0KCl9KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICB0aGlzLm1vdXNlTGVmdCA9IGZhbHNlO1xuICAgICAgICBpZihldmVudC53aGljaCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5tb3VzZUxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlRG93bkxlZnQoZXZlbnQpO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBET00gZWxlbWVudCB0byBmcm9udFxuICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcubW92ZVRvRnJvbnRCeUlkKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VEb3duTGVmdChldmVudCkge1xuICAgICAgICB0aGlzLm1vdXNlTW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcblxuICAgICAgICAvLyBzYXZlIHRoZSBjdXJyZW50IGl0ZW0gcG9zaXRpb24gaW50byBhIHZhcmlhYmxlXG4gICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSB0cmFuc2Zvcm0uZ2V0VHJhbnNsYXRlKCk7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIG1vdXNlIG9mZnNldCBmcm9tIHRoZSBvYmplY3Qgb3JpZ2luXG4gICAgICAgIHRoaXMub2Zmc2V0ID0ge1xuICAgICAgICAgICAgeDogZXZlbnQucGFnZVggLSBjdXJyZW50UG9zaXRpb24ueCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnBhZ2VZIC0gY3VycmVudFBvc2l0aW9uLnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZShldmVudCkge1xuICAgICAgICBpZih0aGlzLm1vdXNlTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgbGV0IGxlZnQgPSBldmVudC5wYWdlWCAtIHRoaXMub2Zmc2V0Lng7XG4gICAgICAgICAgICBsZXQgdG9wID0gZXZlbnQucGFnZVkgLSB0aGlzLm9mZnNldC55O1xuXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybS5zZXRUcmFuc2xhdGUobGVmdCwgdG9wKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0odHJhbnNmb3JtKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVXaXJlcyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VVcChldmVudCkge1xuICAgICAgICBpZihldmVudC53aGljaCA9PT0gMSkge1xuICAgICAgICAgICAgaWYodGhpcy5tb3VzZU1vdmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRyb3AoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gMiApIHtcbiAgICAgICAgICAgIHRoaXMub25DbGlja01pZGRsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50KSB7XG4gICAgICAgIGxldCBsZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLm9mZnNldC54O1xuICAgICAgICBsZXQgdG9wID0gZXZlbnQucGFnZVkgLSB0aGlzLm9mZnNldC55O1xuXG4gICAgICAgIGxlZnQgPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKGxlZnQpO1xuICAgICAgICB0b3AgPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRvcCk7XG5cbiAgICAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG4gICAgICAgIHRyYW5zZm9ybS5zZXRUcmFuc2xhdGUobGVmdCwgdG9wKTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlV2lyZXMoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiwgd2lsbCBiZSByZWRlZmluZWQgaW4gSW5wdXRCb3hcbiAgICB9XG5cbiAgICBvbkNsaWNrTWlkZGxlKCkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcblxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuc3ZnT2JqLiRlbFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBsZXQgY2VudHJlWCA9IE1hdGgucm91bmQocmVjdC53aWR0aCAvIDIpO1xuICAgICAgICBsZXQgY2VudHJlWSA9IE1hdGgucm91bmQocmVjdC5oZWlnaHQgLyAyKTtcblxuICAgICAgICBjZW50cmVYIC09IGNlbnRyZVggJSB0aGlzLmdyaWRTaXplO1xuICAgICAgICBjZW50cmVZIC09IGNlbnRyZVkgJSB0aGlzLmdyaWRTaXplO1xuXG4gICAgICAgIHRyYW5zZm9ybS5yb3RhdGVSaWdodChcbiAgICAgICAgICAgIGNlbnRyZVgsXG4gICAgICAgICAgICBjZW50cmVZXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XCJ0cmFuc2Zvcm1cIjogdHJhbnNmb3JtLmdldCgpfSk7XG5cbiAgICAgICAgdGhpcy5yb3RhdGVCbG9ja2VkTm9kZXNSaWdodCgpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlV2lyZXMoKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGVzIGFsbCB3aXJlcyBjb25uZWN0ZWQgdG8gdGhpcyBib3hcbiAgICB1cGRhdGVXaXJlcyh0ZW1wb3JhcnkgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNvbm5lY3RvcnMuZm9yRWFjaChjb25uID0+IHtcbiAgICAgICAgICAgIGNvbm4ud2lyZUlkcy5mb3JFYWNoKHdpcmVJZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHdpcmUgPSB0aGlzLnBhcmVudFNWRy5nZXRXaXJlQnlJZCh3aXJlSWQpO1xuICAgICAgICAgICAgICAgIGlmKHRlbXBvcmFyeSkge1xuICAgICAgICAgICAgICAgICAgICB3aXJlLnRlbXBvcmFyeVdpcmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aXJlLnJvdXRlV2lyZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRCb3ggZXh0ZW5kcyBCb3gge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgaXNPbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gNztcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDtcblxuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIFwiaW5wdXRcIiwgXCJpb1wiLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmFkZENvbm5lY3Rvcih3aWR0aCwgaGVpZ2h0IC8gMiwgQ29ubmVjdG9yLnR5cGUub3V0cHV0Q29ubmVjdG9yKTtcblxuICAgICAgICB0aGlzLm9uID0gaXNPbjtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBzdXBlci5leHBvcnREYXRhO1xuICAgICAgICBkYXRhLmlzT24gPSB0aGlzLmlzT247XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcygpIHtcbiAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDEsIDApO1xuICAgIH1cblxuICAgIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgLy8gY2FsbCB0aGUgb24gc2V0dGVyIGFnYWluICh0byByZWZyZXNoIHRoZSBzdGF0ZSBvZiB0aGUgY29ubmVjdGVkIHdpcmVzKVxuICAgICAgICB0aGlzLnBhcmVudFNWRy5zdGFydE5ld1NpbXVsYXRpb24odGhpcy5jb25uZWN0b3JzWzBdLCB0aGlzLmNvbm5lY3RvcnNbMF0uc3RhdGUpXG4gICAgfVxuXG4gICAgc2V0IG9uKGlzT24pIHtcbiAgICAgICAgaWYgKGlzT24pIHtcbiAgICAgICAgICAgIC8vIHR1cm4gb25cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvblwiKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5zdGF0ZS5vbik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9mZlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLnN0YXRlLm9mZik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzT24gPSBpc09uO1xuICAgIH1cblxuICAgIGdldCBvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPbjtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICB0aGlzLm9uID0gIXRoaXMub247XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA1O1xuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgXCJvdXRwdXRcIiwgXCJpb1wiLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuY29ubmVjdG9yc1swXS5zdGF0ZSk7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib25cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib2ZmXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS51bmtub3duOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9zY1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcygpIHtcbiAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDAsIDAsIDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdhdGUgZXh0ZW5kcyBCb3gge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBuYW1lLCBcImdhdGVcIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgLy8gb3V0cHV0XG4gICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKHdpZHRoLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5vdXRwdXRDb25uZWN0b3IpO1xuXG4gICAgICAgIGlmKHRoaXMubmFtZT09PVwibm90XCIpIHtcbiAgICAgICAgICAgIC8vIGlucHV0XG4gICAgICAgICAgICB0aGlzLmFkZENvbm5lY3RvcigwLCBoZWlnaHQgLyAyLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpbnB1dFxuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gNCwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gKDQvMyksIENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKTtcblxuICAgICAgICAgICAgLy8gYWRkIG9uZSBibG9ja2VkTm9kZSBiZXR3ZWVuIHRoZSBpbnB1dHMgKGZvciBiZXR0ZXIgbG9va2luZyB3aXJpbmcpXG4gICAgICAgICAgICAvLyBhbmQgcmVnZW5lcmF0ZSBibG9ja2VkIG5vZGVzXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2Rlcyh7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiBoZWlnaHQgLyAyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXRlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVCbG9ja05vZGVzKHNwZWNpYWxOb2RlKSB7XG4gICAgICAgIGlmKHNwZWNpYWxOb2RlIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdXBlci5nZW5lcmF0ZUJsb2NrTm9kZXMoMCwgMSwgMCwgMSwgc3BlY2lhbE5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDAsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFN0YXRlKCkge1xuICAgICAgICBsZXQgc3RhdGUgPSBMb2dpYy5zdGF0ZS51bmtub3duXG4gICAgICAgIHN3aXRjaCAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYW5kXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMuYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5hbmRcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5uYW5kKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLm5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub3RcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9ICBMb2dpYy5ub3QodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG5vclwiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gIExvZ2ljLnhub3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieG9yXCI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSAgTG9naWMueG9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShzdGF0ZSlcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcuc2ltdWxhdG9yLm5vdGlmeUNoYW5nZSh0aGlzLmNvbm5lY3RvcnNbMF0uaWQsIHN0YXRlKVxuICAgICAgICAvLyBzd2l0Y2ggKHRoaXMubmFtZSkge1xuICAgICAgICAvLyAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5hbmQodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgIGNhc2UgXCJuYW5kXCI6XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLm5hbmQodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgIGNhc2UgXCJub3JcIjpcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMubm9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKSk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgICBjYXNlIFwibm90XCI6XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLm5vdCh0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUpKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSkpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICAgY2FzZSBcInhub3JcIjpcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMueG5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSkpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy54b3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdpcmUgZXh0ZW5kcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBmcm9tSWQsIHRvSWQsIGdyaWRTaXplKSB7XG4gICAgICAgIC8vIHNtYWxsIHRvZG86IHJld29yayBzdGFydC4uLiBlbmQuLi4gdG8gYXJyYXlzPyAobm90IGltcG9ydGFudClcblxuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmZyb21JZCA9IGZyb21JZDtcbiAgICAgICAgdGhpcy50b0lkID0gdG9JZDtcblxuICAgICAgICB0aGlzLnN0YXJ0Qm94ID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZChmcm9tSWQpO1xuICAgICAgICB0aGlzLmVuZEJveCA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQodG9JZCk7XG5cbiAgICAgICAgdGhpcy5ib3hlcyA9IFt0aGlzLnN0YXJ0Qm94LCB0aGlzLmVuZEJveF1cblxuICAgICAgICB0aGlzLnN0YXJ0Q29ubmVjdG9yID0gdGhpcy5wYXJlbnRTVkcuZ2V0Q29ubmVjdG9yQnlJZChmcm9tSWQpO1xuICAgICAgICB0aGlzLmVuZENvbm5lY3RvciA9IHRoaXMucGFyZW50U1ZHLmdldENvbm5lY3RvckJ5SWQodG9JZCk7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0b3JzID0gW3RoaXMuc3RhcnRDb25uZWN0b3IsIHRoaXMuZW5kQ29ubmVjdG9yXVxuXG4gICAgICAgIHRoaXMucm91dGVXaXJlKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBMb2dpYy5zdGF0ZS51bmtub3duO1xuXG4gICAgICAgIGZvciAobGV0IGNvbm5lY3RvciBvZiB0aGlzLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgICAgIGlmKGNvbm5lY3Rvci5pc091dHB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoY29ubmVjdG9yLnN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcIndpcmVcIik7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcm9tSWQ6IHRoaXMuZnJvbUlkLFxuICAgICAgICAgICAgdG9JZDogdGhpcy50b0lkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9uOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub2ZmKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0Q29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZW5kQ29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kQ29ubmVjdG9yLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUF0dHI7XG4gICAgfVxuXG4gICAgdXBkYXRlV2lyZVN0YXRlKCkge1xuICAgICAgICB0aGlzLmJveGVzLmZvckVhY2goYm94ID0+IHtcbiAgICAgICAgICAgIGJveC5yZWZyZXNoU3RhdGUoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqLmdldCgpO1xuICAgIH1cblxuICAgIGdldFRlbXBvcmFyeVdpcmVQb2ludHMoKSB7XG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnRzKCk7XG4gICAgICAgIHBvaW50cy5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMud2lyZVN0YXJ0LngsIHRoaXMud2lyZVN0YXJ0LnkpKTtcbiAgICAgICAgcG9pbnRzLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy53aXJlRW5kLngsIHRoaXMud2lyZUVuZC55KSk7XG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgdGVtcG9yYXJ5V2lyZSgpIHtcbiAgICAgICAgdGhpcy53aXJlU3RhcnQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuc3RhcnRDb25uZWN0b3IsIGZhbHNlKTtcbiAgICAgICAgdGhpcy53aXJlRW5kID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLmVuZENvbm5lY3RvciwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuc2V0V2lyZVBhdGgodGhpcy5nZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCkpO1xuXG4gICAgICAgIC8vIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgLy8gdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuICAgIH1cblxuICAgIHJvdXRlV2lyZShzbmFwVG9HcmlkID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLndpcmVTdGFydCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5zdGFydENvbm5lY3Rvciwgc25hcFRvR3JpZCk7XG4gICAgICAgIHRoaXMud2lyZUVuZCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5lbmRDb25uZWN0b3IsIHNuYXBUb0dyaWQpO1xuXG4gICAgICAgIHRoaXMucG9pbnRzID0gdGhpcy5hU3RhcihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLndpcmVTdGFydC54IC8gdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLndpcmVTdGFydC55IC8gdGhpcy5ncmlkU2l6ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLndpcmVFbmQueCAvIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgeTogdGhpcy53aXJlRW5kLnkgLyB0aGlzLmdyaWRTaXplXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFdpcmVQYXRoKHRoaXMucG9pbnRzKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVdpcmVTdGF0ZSgpO1xuICAgIH1cblxuICAgIHNldFdpcmVQYXRoKHBvaW50cykge1xuICAgICAgICAvLyBzZXQgdGhlIGxpbmVcbiAgICAgICAgaWYodGhpcy5zdmdPYmohPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqLnVwZGF0ZVBvaW50cyhwb2ludHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdmdPYmogPSBuZXcgc3ZnT2JqLlBvbHlMaW5lKHBvaW50cywgXCIjOGI4YjhiXCIsIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG5cbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQXR0cih7XG4gICAgICAgICAgICBmcm9tSWQ6IHRoaXMuZnJvbUlkLFxuICAgICAgICAgICAgdG9JZDogdGhpcy50b0lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvLyBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiB0aGlzIHBzZXVkb2NvZGU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0EqX3NlYXJjaF9hbGdvcml0aG0jUHNldWRvY29kZVxuICAgIGFTdGFyKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgLy8gbnVtYmVyIG9mIG5vZGVzLCB0aGF0IGNhbiBiZSBvcGVuZWQgYXQgb25jZVxuICAgICAgICAvLyBvbmNlIGlzIHRoaXMgbGltaXQgZXhjZWVkZWQsIGFTdGFyIHdpbGwgZmFpbCBhbmQgZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cyB3aWxsIGJlIHVzZWQgaW5zdGVhZFxuICAgICAgICBjb25zdCBtYXhOb2RlTGltaXQgPSA1MDAwMDtcblxuICAgICAgICBsZXQgY2xvc2VkTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGxldCBvcGVuTm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIG9wZW5Ob2Rlcy5hZGQoc3RhcnQpO1xuXG4gICAgICAgIGxldCBjYW1lRnJvbSA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHZhbHVlOiBpbmZpbml0eVxuICAgICAgICBsZXQgZ1Njb3JlID0gbmV3IFN0cnVjdHVyZXMuTWFwV2l0aERlZmF1bHRWYWx1ZShJbmZpbml0eSk7XG4gICAgICAgIGdTY29yZS5zZXQoc3RhcnQsIDApO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgdmFsdWU6IGluZmluaXR5XG4gICAgICAgIGxldCBmU2NvcmUgPSBuZXcgU3RydWN0dXJlcy5NYXBXaXRoRGVmYXVsdFZhbHVlKEluZmluaXR5KTtcbiAgICAgICAgZlNjb3JlLnNldChzdGFydCwgV2lyZS5tYW5oYXR0YW5EaXN0YW5jZShzdGFydCwgZW5kKSk7XG5cbiAgICAgICAgbGV0IG5vblJvdXRhYmxlID0gdGhpcy5wYXJlbnRTVkcuZ2V0Tm9uUm91dGFibGVOb2RlcygpO1xuICAgICAgICBsZXQgcHVuaXNoZWRCdXRSb3V0YWJsZTtcbiAgICAgICAgaWYodGhpcy5zdmdPYmo9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHB1bmlzaGVkQnV0Um91dGFibGUgPSB0aGlzLnBhcmVudFNWRy5nZXRJbmNvbnZlbmllbnROb2RlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHVuaXNoZWRCdXRSb3V0YWJsZSA9IHRoaXMucGFyZW50U1ZHLmdldEluY29udmVuaWVudE5vZGVzKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChvcGVuTm9kZXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZUZTY29yZTtcblxuICAgICAgICAgICAgLy8gZmluZCB0aGUgdmFsdWUgZnJvbSBvcGVuTm9kZXMgdGhhdCBoYXMgdGhlIGxvd2VzdCBmU2NvcmVcbiAgICAgICAgICAgIC8vIChjYW4gYmUgaW1wbGVtZW50ZWQgZWZmZWN0aXZlbHkgdXNpbmcgbWluLWhlYXAgZGF0YSBzdHJ1Y3R1cmUgKG1heWJlIHRvZG8gc29tZXRpbWUpPylcbiAgICAgICAgICAgIG9wZW5Ob2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFjdXJyZW50Tm9kZSB8fCBmU2NvcmUuZ2V0KG5vZGUpIDwgY3VycmVudE5vZGVGU2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUZTY29yZSA9IGZTY29yZS5nZXQoY3VycmVudE5vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKHN2Z09iai5Qb2x5bGluZVBvaW50LmVxdWFscyhjdXJyZW50Tm9kZSwgZW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY29uc3RydWN0UGF0aChjYW1lRnJvbSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcGVuTm9kZXMuZGVsZXRlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIGNsb3NlZE5vZGVzLmFkZChjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAgIC8vIHRoZSBmYXJ0aGVzdCBwb2ludHMgYWNjZXNzaWJsZSB3aXRob3V0IGF2b2lkaW5nIG9ic3RhY2xlcyBpbiBldmVyeSBkaXJlY3Rpb25cbiAgICAgICAgICAgIC8vIChidXQgbWF4IDUwIGluIGVhY2ggZGlyZWN0aW9uKVxuICAgICAgICAgICAgZm9yKGxldCBkaXJlY3Rpb24gPSAwIDsgZGlyZWN0aW9uIDwgNCA7IGRpcmVjdGlvbisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1BvaW50ID0gV2lyZS5tb3ZlUG9pbnQoY3VycmVudE5vZGUsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCA1MCA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXdQb2ludCBpcyBpbiB0aGUgc2V0IG9mIG5vbiByb3V0YWJsZSBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGFkZCBpdCBhbmQgc3RvcCBwcm9jZWVkaW5nIGluIHRoaXMgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KG5vblJvdXRhYmxlLCB0aGlzLnNjYWxlUG9pbnRUb0dyaWQobmV3UG9pbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBza2lwIHRoaXMgbm9kZSwgaWYgaXQgaGFzIGJlZW4gYWxyZWFkeSBjbG9zZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gb3IgaWYgaXQgaXMgb24gdGhlIGxpc3Qgb2Ygbm9uIHJvdXRhYmxlIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZWROb2Rlcy5oYXMobmV3UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3Blbk5vZGVzLmhhcyhuZXdQb2ludCkueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3Blbk5vZGVzLmFkZChuZXdQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgcG9zc2libGUgR1Njb3JlIGJ5IGFkZGluZyAxIHRvIHRoZSBzY29yZSBvZiB0aGUgbm9kZSB3ZSBjYW1lIGZyb21cbiAgICAgICAgICAgICAgICAgICAgLy8gKHdlIHByaW9yaXRpemUgdG8gbWluaW1pemUgdGhlIG51bWJlciBvZiBub2RlcyBhbmQgbm90IHRoZSBkaXN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gIHNvIHdlIGFyZSBhZGRpbmcgMSBvbiBhbGwgbm9kZXMsIGV2ZW4gaWYgdGhlIGV1Y2xpZGVhbiAvIG1hbm5oYXRhbiBkaXN0YW5jZSBtYXkgdmFyeSlcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluY3JlbWVudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkhPT0wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NzaWJsZUdTY29yZSA9IGdTY29yZS5nZXQoY3VycmVudE5vZGUpICsgaW5jcmVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KHB1bmlzaGVkQnV0Um91dGFibGUsIHRoaXMuc2NhbGVQb2ludFRvR3JpZChuZXdQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbm9kZSBpcyBpbiB0aGUgc2V0IG9mIHB1bmlzaGVkIG5vZGUsIHB1bmlzaCBpdCBieSBhZGRpbmcgdG8gdGhlIEdTY29yZVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVHU2NvcmUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZUdTY29yZSA+PSBnU2NvcmUuZ2V0KG5ld1BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYW1lRnJvbS5zZXQobmV3UG9pbnQsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgZ1Njb3JlLnNldChuZXdQb2ludCwgcG9zc2libGVHU2NvcmUpO1xuICAgICAgICAgICAgICAgICAgICBmU2NvcmUuc2V0KG5ld1BvaW50LCBwb3NzaWJsZUdTY29yZSArIFdpcmUubWFuaGF0dGFuRGlzdGFuY2UobmV3UG9pbnQsIGVuZCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5ld1BvaW50IGlzIGluIHRoZSBzZXQgb2YgcHVuaXNoZWQgYnV0IHJvdXRhYmxlIHBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGl0IGJ1dCBzdG9wIHByb2NlZWRpbmcgaW4gdGhpcyBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoV2lyZS5zZXRIYXNUaGlzUG9pbnQocHVuaXNoZWRCdXRSb3V0YWJsZSwgdGhpcy5zY2FsZVBvaW50VG9HcmlkKG5ld1BvaW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSB0byB0aGUgbmV4dCBwb2ludCBpbiB0aGUgZGlyZWNpdG9uXG4gICAgICAgICAgICAgICAgICAgIG5ld1BvaW50ID0gV2lyZS5tb3ZlUG9pbnQobmV3UG9pbnQsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihvcGVuTm9kZXMuc2l6ZSA+IG1heE5vZGVMaW1pdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHdlIGdvdCBoZXJlLCB0aGUgcGF0aCBkb2VzIG5vdCBleGlzdCAtPiBsZXQncyB1c2UgdGVtcG9yYXJ5IHBhdGggaWdub3JpbmcgYWxsIGNvbGlzaW9uc1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCk7XG4gICAgfVxuICAgIHN0YXRpYyBtb3ZlUG9pbnQocG9pbnQsIGRpcmVjdGlvbikge1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAwOiAvLyB1cFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgLSAxXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgMTogLy8gcmlnaHRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDI6IC8vIGRvd25cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55ICsgMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDM6IC8vIGxlZnRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2NhbGVQb2ludFRvR3JpZChwb2ludCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcG9pbnQueCAqIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICB5OiBwb2ludC55ICogdGhpcy5ncmlkU2l6ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjb25zdHJ1Y3RQYXRoKGNhbWVGcm9tLCBjdXJyZW50Tm9kZSkge1xuICAgICAgICBsZXQgdG90YWxQYXRoID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpO1xuICAgICAgICB0b3RhbFBhdGguYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludChjdXJyZW50Tm9kZS54ICogdGhpcy5ncmlkU2l6ZSwgY3VycmVudE5vZGUueSAqIHRoaXMuZ3JpZFNpemUpKTtcblxuICAgICAgICB3aGlsZSAoY2FtZUZyb20uaGFzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjYW1lRnJvbS5nZXQoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgdG90YWxQYXRoLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoY3VycmVudE5vZGUueCAqIHRoaXMuZ3JpZFNpemUsIGN1cnJlbnROb2RlLnkgKiB0aGlzLmdyaWRTaXplKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG90YWxQYXRoO1xuICAgIH1cblxuICAgIHN0YXRpYyBtYW5oYXR0YW5EaXN0YW5jZShhLCBiKSB7XG4gICAgICAgIC8vIE1hbmhhdHRhbiBnZW9tZXRyeVxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoYS54IC0gYi54KSArIE1hdGguYWJzKGEueSAtIGIueSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEhhc1RoaXNQb2ludChzZXQsIHBvaW50KSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2Ygc2V0KSB7XG4gICAgICAgICAgICBpZihpdGVtLnggPT09IHBvaW50LnggJiYgaXRlbS55ID09PSBwb2ludC55KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldENvb3JkaW5hdGVzKGNvbm5lY3Rvciwgc25hcFRvR3JpZCA9IHRydWUpIHtcbiAgICAgICAgLy8gY29ubmVjdG9yLnN2Z09iai5pZCBoYXMgdG8gYmUgY2FsbGVkLCBlbHNlIHRoZSBnZXRDb29yZGluYXRlcyBkb2VzIG5vdCB3b3JrIG9uIHRoZSBmaXJzdCBjYWxsIGluIEZpcmVmb3ggNTVcbiAgICAgICAgbGV0IGR1bW15ID0gY29ubmVjdG9yLnN2Z09iai5pZDtcblxuICAgICAgICBsZXQgJGNvbm5lY3RvciA9IGNvbm5lY3Rvci5zdmdPYmouJGVsO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbiA9ICRjb25uZWN0b3IucG9zaXRpb24oKTtcbiAgICAgICAgbGV0IHdpZHRoID0gJGNvbm5lY3Rvci5hdHRyKFwid2lkdGhcIik7XG4gICAgICAgIGxldCBoZWlnaHQgPSAkY29ubmVjdG9yLmF0dHIoXCJoZWlnaHRcIik7XG5cbiAgICAgICAgbGV0IHggPSBwb3NpdGlvbi5sZWZ0ICsgd2lkdGggLyAyO1xuICAgICAgICBsZXQgeSA9IHBvc2l0aW9uLnRvcCArIGhlaWdodCAvIDI7XG4gICAgICAgIGlmKHNuYXBUb0dyaWQpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHgpO1xuICAgICAgICAgICAgeSA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQoeSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgQ29udGV4dE1lbnVJdGVtIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlLCBjb250ZXh0TWVudSwgcGFyZW50U1ZHLCBjbGlja0Z1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUgPSBjb250ZXh0TWVudTtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG5cbiAgICAgICAgdGhpcy4kZWwgPSAkKFwiPGxpPlwiKTtcbiAgICAgICAgJCh0aGlzLiRlbClcbiAgICAgICAgICAgIC50ZXh0KG5hbWUpXG4gICAgICAgICAgICAuYXR0cihcInR5cGVcIiwgdHlwZSk7XG5cbiAgICAgICAgaWYoY2xpY2tGdW5jdGlvbikge1xuICAgICAgICAgICAgJCh0aGlzLiRlbCkuY2xpY2soXG4gICAgICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbGlja0Z1bmN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDbGFzcyhjbHMpIHtcbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoY2xzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYXBwZW5kSXRlbShpdGVtKSB7XG4gICAgICAgIGlmKCF0aGlzLnN1Ykxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViTGlzdCA9ICQoXCI8dWw+XCIpO1xuICAgICAgICAgICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMuc3ViTGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1Ykxpc3QuYXBwZW5kKGl0ZW0ualF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBnZXQgalF1ZXJ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWw7XG4gICAgfVxufVxuY2xhc3MgR2F0ZU1lbnVJdGVtIGV4dGVuZHMgQ29udGV4dE1lbnVJdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBjb250ZXh0TWVudSwgcGFyZW50U1ZHKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgdHlwZSwgLy8gbmFtZSBpcyB0aGUgdHlwZVxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIGNvbnRleHRNZW51LFxuICAgICAgICAgICAgcGFyZW50U1ZHLFxuICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogTWF0aC5yb3VuZChjb250ZXh0TWVudS5wb3NpdGlvbi54IC8gcGFyZW50U1ZHLmdyaWRTaXplKSAqIHBhcmVudFNWRy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKGNvbnRleHRNZW51LnBvc2l0aW9uLnkgLyBwYXJlbnRTVkcuZ3JpZFNpemUpICogcGFyZW50U1ZHLmdyaWRTaXplXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHBhcmVudFNWRy5uZXdHYXRlKFxuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi5sZWZ0LCAvLyB4IGNvb3JkaW5hdGVcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24udG9wIC8vIHkgY29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0TWVudSB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIGNvbnN0IGdhdGVzID0gW1wibm90XCIsIFwiYW5kXCIsIFwib3JcIiwgXCJuYW5kXCIsIFwibm9yXCIsIFwieG9yXCIsIFwieG5vclwiXTtcblxuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgeDogMCwgeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjx1bD5cIik7XG4gICAgICAgIHRoaXMuJGVsLmF0dHIoJ2lkJywgJ2NvbnRleHRNZW51Jyk7XG5cbiAgICAgICAgbGV0IGdhdGVMaXN0ID0gbmV3IENvbnRleHRNZW51SXRlbShcIk5ldyBnYXRlXCIsICcnLCB0aGlzLCBwYXJlbnRTVkcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBnYXRlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIGdhdGVMaXN0LmFwcGVuZEl0ZW0oXG4gICAgICAgICAgICAgICAgbmV3IEdhdGVNZW51SXRlbShnYXRlc1tpXSwgdGhpcywgcGFyZW50U1ZHKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcGVuZEl0ZW0oZ2F0ZUxpc3QpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kSXRlbShcbiAgICAgICAgICAgIG5ldyBDb250ZXh0TWVudUl0ZW0oXCJJbnB1dCBib3hcIiwgJycsIHRoaXMsIHBhcmVudFNWRyxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi54KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLnkpXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50U1ZHLm5ld0lucHV0KHBvc2l0aW9uLmxlZnQsIHBvc2l0aW9uLnRvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kSXRlbShuZXcgQ29udGV4dE1lbnVJdGVtKFwiT3V0cHV0IGJveFwiLCAnJywgdGhpcywgcGFyZW50U1ZHLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbGVmdDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLngpLFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh0aGlzLnBvc2l0aW9uLnkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwYXJlbnRTVkcubmV3T3V0cHV0KHBvc2l0aW9uLmxlZnQsIHBvc2l0aW9uLnRvcCk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLmFwcGVuZENvbmRpdGlvbmFsSXRlbSgnYm94JywgJ1JlbW92ZSB0aGlzIGl0ZW0nLCBpZCA9PiB7dGhpcy5wYXJlbnRTVkcucmVtb3ZlQm94KGlkKX0pO1xuICAgICAgICB0aGlzLmFwcGVuZENvbmRpdGlvbmFsSXRlbSgnd2lyZScsICdSZW1vdmUgdGhpcyB3aXJlJywgaWQgPT4ge3RoaXMucGFyZW50U1ZHLnJlbW92ZVdpcmVCeUlkKGlkKX0pO1xuXG4gICAgICAgIHBhcmVudFNWRy4kc3ZnLmJlZm9yZSh0aGlzLiRlbCk7XG4gICAgfVxuXG4gICAgYXBwZW5kSXRlbShpdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChpdGVtLmpRdWVyeSk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8vIGFwcGVuZHMgYW4gY29ubmRpdGlvbmFsIGl0ZW0gKHRoYXQgaXMgc2hvd24gb25seSBpZiB0aGUgdGFyZ2V0XG4gICAgLy8gaGFzIHRoZSBjbGFzcyBpdGVtQ2xhc3MpXG4gICAgLy8gY2xpY2tGdW5jdGlvbiB0YWtlcyBvbmUgYXJndW1lbnQ6IElEIG9mIHRoZSB0YXJnZXRcbiAgICBhcHBlbmRDb25kaXRpb25hbEl0ZW0oaXRlbUNsYXNzLCB0ZXh0LCBjbGlja0Z1bmN0aW9uKSB7XG4gICAgICAgIGlmKCF0aGlzLmNvbmRpdGlvbmFsSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW3RoaXMuY29uZGl0aW9uYWxJdGVtcy5sZW5ndGhdID0ge1xuICAgICAgICAgICAgaXRlbUNsYXNzOiBpdGVtQ2xhc3MsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgY2xpY2tGdW5jdGlvbjogY2xpY2tGdW5jdGlvblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVjaWRlcyB3aGV0aGVyIG9yIG5vdCB0byBkaXNwbGF5IHNwZWNpZmljIGNvbmRpdGlvbmFsIGl0ZW1zXG4gICAgcmVzb2x2ZUNvbmRpdGlvbmFsSXRlbXMoJHRhcmdldCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25kaXRpb25hbEl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZigkdGFyZ2V0Lmhhc0NsYXNzKHRoaXMuY29uZGl0aW9uYWxJdGVtc1tpXS5pdGVtQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ29udGV4dE1lbnVJdGVtKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW2ldLnRleHQsICcnLCB0aGlzLCB0aGlzLnBhcmVudFNWRyxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXNbaV0uY2xpY2tGdW5jdGlvbigkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKS5hZGRDbGFzcygnY29uZGl0aW9uYWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGhpZGVzIGFsbCBjb25kaXRpb25hbCBpdGVtc1xuICAgIGhpZGVBbGxDb25kaXRpb25hbEl0ZW1zKCkge1xuICAgICAgICB0aGlzLiRlbC5jaGlsZHJlbignLmNvbmRpdGlvbmFsJykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLy8gZGlzcGxheXMgdGhlIGNvbnRleHQgbWVudSB3aXRoIHRoZSByaWdodCBzZXQgb2YgY29uZGl0aW9uYWwgaXRlbXNcbiAgICBkaXNwbGF5KHgsIHksICR0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kZWwuY3NzKHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB0b3A6IHkgKyBcInB4XCIsXG4gICAgICAgICAgICBsZWZ0OiB4ICsgXCJweFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVzb2x2ZUNvbmRpdGlvbmFsSXRlbXMoJHRhcmdldCk7XG4gICAgfVxuXG4gICAgLy8gaGlkZXMgdGhlIGNvbnRleHQgbWVudVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNzcyh7ZGlzcGxheTogJ25vbmUnfSk7XG4gICAgICAgIHRoaXMuaGlkZUFsbENvbmRpdGlvbmFsSXRlbXMoKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNsYXNzIGV4cG9ydE5ldHdvcmsge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U1ZHLmV4cG9ydERhdGE7XG4gICAgfVxuXG4gICAganNvbihzdHlsZSA9IGV4cG9ydE5ldHdvcmsuc3R5bGUuY29tcGFjdCwgZGF0YVVyaSA9IGZhbHNlKSB7XG4gICAgICAgIGlmKGRhdGFVcmkpIHtcbiAgICAgICAgICAgIHJldHVybiAnZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgsJ1xuICAgICAgICAgICAgICAgICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuanNvbihzdHlsZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZXhwb3J0TmV0d29yay5zdHlsZS5jb21wYWN0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5leHBvcnREYXRhKTtcbiAgICAgICAgICAgICAgICBjYXNlIGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5leHBvcnREYXRhLCBudWxsLCAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgc3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmV0dHk6IDAsXG4gICAgICAgICAgICBjb21wYWN0OiAxXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgaW1wb3J0TmV0d29rIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIHN0cmluZykge1xuICAgICAgICBwYXJlbnRTVkcuaW1wb3J0RGF0YShcbiAgICAgICAgICAgIEpTT04ucGFyc2Uoc3RyaW5nKVxuICAgICAgICApO1xuICAgIH1cblxufSIsImltcG9ydCB7ZXhwb3J0TmV0d29yaywgaW1wb3J0TmV0d29rfSBmcm9tIFwiLi9pbXBvcnRFeHBvcnQuanNcIjtcblxuY2xhc3MganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Ioc3BlY2lmaWNUYWcpIHtcbiAgICAgICAgaWYoIXNwZWNpZmljVGFnKSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJChcIjxcIiArIHNwZWNpZmljVGFnICsgXCI+XCIpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIGNvbnN0IG1vdXNlSWNvbiA9XG4vLyAgICAgXCI8c3ZnIGNsYXNzPVxcXCJtb3VzZUljb25cXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgaGVpZ2h0PVxcXCIxMjEuNzcxMzFtbVxcXCIgd2lkdGg9XFxcIjgyLjMyNzU4M21tXFxcIiB2ZXJzaW9uPVxcXCIxLjFcXFwiIHZpZXdCb3g9XFxcIjAgMCAyOTEuNzExOTEgNDMxLjQ3MzE0XFxcIj5cIiArXG4vLyAgICAgXCI8ZyB0cmFuc2Zvcm09XFxcInRyYW5zbGF0ZSgtMjAyLjcwOTA4LC0yNjAuOTIzMilcXFwiPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGQ9XFxcIm0yMDIuODExMDggNDQzLjUwNjY3Yy0wLjEyNTcgMTEuMDU2ODMgMC4wNjUxIDEyLjEyOTE1IDAuMDUyOCAyMy4wOTM3NSAxLjA0MDQgMzkuMjkxNjUtNC4wMzI4MSA3OS41ODQyIDguODE0NDEgMTE3LjU2ODM2IDE3LjUyNjAyIDU4LjAwNzQyIDcwLjc2MTIgMTA3LjA3NzkzIDEzMy4xMjkwNyAxMDguMTE3MTkgNjAuODA0NDggMi42MTI0NyAxMTUuODA2MzgtNDEuNDg5MTIgMTM2LjY1MjQ5LTk2LjkzNTU1IDE1LjIxOTQyLTM0LjcwNTYxIDEyLjc0NDctNzIuODI2MzggMTIuODM0LTEwOS43MjI2Ni0wLjQwMzU2LTE3LjI0OTA1IDAuMjc0NTItMjQuNzMyOSAwLjA4NzktNDIuMTIxMDloLTI5MS41NzA2NnpcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwibGVmdFxcXCIgZD1cXFwibTMzNS42Nzc4OCAyNjAuOTMwMzJjLTU4LjY1MjUgMC42NTU2Ni05OS42MzE5IDQzLjUxMzg2LTEyMC4wODIxIDk2Ljk5MjE5LTEwLjU1MDUgMjQuMDYwMTItMTIuNTkzNSA0MS43Nzc5Ny0xMi44ODY3IDY3LjU4MjAzaDEzNS43ODMydi0xNjQuNTcyMjZjLTAuMDA2IDAuMDAwMDgtMC4wMTE3LTAuMDAwMDgtMC4wMTc2IDAtMC45MzQ3LTAuMDExLTEuODY1OC0wLjAxMjQtMi43OTY4LTAuMDAyelxcXCIvPlxcblwiICtcbi8vICAgICBcIiAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJyaWdodFxcXCIgZD1cXFwibTM2MS40Njc4NyAyNjAuOTI5OTNjLTAuOTQyMDctMC4wMS0xLjg4NjQtMC4wMDktMi44MzIwMyAwLjAwNHYxNjQuNTcyMjZoMTM1Ljc4NTE2Yy0wLjI2MjU3LTI0LjQ2OTQ4LTIuMjUyMS00MC43NDgyMy0xMS41MDM5MS02My45MDI0My0xOS4zNDcwOS01NS4wMzIyNS02MS43MzA0My0xMDAuMDQ1MjUtMTIxLjQ0OTIyLTEwMC42NzM4M3pcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwibWlkZGxlXFxcIiBkPVxcXCJtMzQ4LjU2NTA0IDI5NC45MzM2NWMxNS4wMzcxNCAwIDI3LjE0Mjg2IDEyLjEwNTcyIDI3LjE0Mjg2IDI3LjE0Mjg2djQwYzAgMTUuMDM3MTQtMTIuMTA1NzIgMjcuMTQyODYtMjcuMTQyODYgMjcuMTQyODZzLTI3LjE0Mjg2LTEyLjEwNTcyLTI3LjE0Mjg2LTI3LjE0Mjg2di00MGMwLTE1LjAzNzE0IDEyLjEwNTcyLTI3LjE0Mjg2IDI3LjE0Mjg2LTI3LjE0Mjg2elxcXCIgc3Ryb2tlPVxcXCIjZmZmXFxcIiBzdHJva2UtbGluZWNhcD1cXFwicm91bmRcXFwiIHN0cm9rZS13aWR0aD1cXFwiMjBcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgIDwvZz5cIiArXG4vLyAgICAgXCI8L3N2Zz5cIjtcblxuY2xhc3MgaGVscFdpbmRvd0l0ZW0gZXh0ZW5kcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoXCJoZWxwV2luZG93SXRlbVwiKTtcbiAgICAgICAgdGhpcy4kZWwuaHRtbCh0ZXh0KTtcbiAgICB9XG59XG5cbmNsYXNzIGhlbHBXaW5kb3cgZXh0ZW5kcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLiRlbC5hdHRyKFwiaWRcIiwgXCJoZWxwXCIpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+bWFpbiBtZW51PC9zdHJvbmc+OiByaWdodCBjbGlja1wiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcImRyYWcgYW5kIGRyb3AgdG8gPHN0cm9uZz5tb3ZlIGVsZW1lbnRzPC9zdHJvbmc+XCIpKTtcbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiPHN0cm9uZz5taWRkbGUgY2xpY2s8L3N0cm9uZz4gdG8gcm90YXRlIGVsZW1lbnRzXCIpKTtcbiAgICAgICAgdGhpcy5hcHBlbmQobmV3IGhlbHBXaW5kb3dJdGVtKFwiPHN0cm9uZz5jbGljayA8aW1nIHNyYz0naW1nL2d1aS9oZWxwLnN2ZycgY2xhc3M9J2hlbHBpY29uJyBhbHQ9J2hlbHAgaWNvbic+PC9zdHJvbmc+IHRvIGRpc3BsYXkgZG9jdW1lbnRhdGlvbiAoaW4gY3plY2gpXCIpKTtcbiAgICB9XG5cbiAgICBhcHBlbmQoaXRlbSkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoaXRlbS4kZWwpO1xuICAgIH1cbn1cblxuXG5jbGFzcyBmbG9hdGluZ01lbnVJdGVtIGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Ioc3BlY2lmaWNDbGFzcywgaWNvbiwgdGl0bGUsIHNwZWNpZmljVGFnKSB7XG4gICAgICAgIHN1cGVyKHNwZWNpZmljVGFnKTtcblxuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhcImJ1dHRvblwiKTtcbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3Moc3BlY2lmaWNDbGFzcyk7XG5cbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKFxuICAgICAgICAgICAgJChcIjxpbWc+XCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzcmNcIiwgXCJpbWcvZ3VpL1wiICsgaWNvbiArIFwiLnN2Z1wiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiYWx0XCIsIHRpdGxlKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwidGl0bGVcIiwgdGl0bGUpXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBmbG9hdGluZ01lbnUgZXh0ZW5kcyBqcXVlcnlFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBjb25zdCBpZCA9ICdmbG9hdGluZ01lbnUnO1xuXG4gICAgICAgIHRoaXMuJGVsLmF0dHIoXCJpZFwiLCBpZCk7XG5cbiAgICAgICAgLyogSU1QT1JUICovXG5cbiAgICAgICAgLy8gaGVyZSB3aWxsIGJlIHRoZSBpbnN0YW5jZSBvZiBMaXR5IHN0b3JlZFxuICAgICAgICAvLyAod2UgbmVlZCB0byBzdG9yZSBpdCwgYmVjYXVzZSB0aGUgXCJpbXBvcnRcIiBidXR0b24gYWxzbyBjbG9zZXMgTGl0eSlcbiAgICAgICAgbGV0IGxpdHlJbnN0YW5jZUltcG9ydDtcblxuICAgICAgICBsZXQgaW1wb3J0QnV0dG9uID0gbmV3IGZsb2F0aW5nTWVudUl0ZW0oXCJpbXBvcnRcIiwgXCJpbXBvcnRcIiwgXCJJbXBvcnQgYSBuZXR3b3JrXCIsIFwiYVwiKTtcbiAgICAgICAgaW1wb3J0QnV0dG9uLiRlbC5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGxldCAkcG9wdXAgPSAkKFwiPGRpdj5cIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJpbXBvcnRFeHBvcnRcIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJpbXBvcnRcIik7XG5cbiAgICAgICAgICAgIGxldCB0ZXh0YXJlYUlkID0gXCJpbXBvcnRKU09OXCI7XG5cbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjx0ZXh0YXJlYT48L3RleHRhcmVhPlwiKS5hdHRyKCdpZCcsIHRleHRhcmVhSWQpXG4gICAgICAgICAgICApLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPGE+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogXCJ1cGxvYWRcIlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9pbXBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcIiBpbXBvcnQgZnJvbSBKU09OXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHRleHRhcmVhID0gJCgnIycrdGV4dGFyZWFJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCB0ZXh0YXJlYSBjb250ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltcG9ydFN0cmluZyA9ICR0ZXh0YXJlYS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgTGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgbGl0eUluc3RhbmNlSW1wb3J0LmNsb3NlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb2NjZXNzIHRoZSBpbXBvcnRlZCBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgaW1wb3J0TmV0d29rKHBhcmVudFNWRywgaW1wb3J0U3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxpdHlJbnN0YW5jZUltcG9ydCA9IGxpdHkoJHBvcHVwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmQoaW1wb3J0QnV0dG9uKTtcblxuICAgICAgICAvKiBFWFBPUlQgKi9cblxuICAgICAgICBsZXQgZXhwb3J0QnV0dG9uID0gbmV3IGZsb2F0aW5nTWVudUl0ZW0oXCJleHBvcnRcIiwgXCJleHBvcnRcIiwgXCJFeHBvcnQgdGhpcyBuZXR3b3JrXCIsIFwiYVwiKTtcbiAgICAgICAgZXhwb3J0QnV0dG9uLiRlbC5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gbmV3IGV4cG9ydE5ldHdvcmsocGFyZW50U1ZHKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBwb3B1cCBjb250YWluZXIgaG9sZGluZyBhbGwgcG9wdXAgY29udGVudCAodGhhdCB3aWxsIGJlIHBhc3NlZCB0byBsaXR5KVxuICAgICAgICAgICAgbGV0ICRwb3B1cCA9ICQoXCI8ZGl2PlwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImltcG9ydEV4cG9ydFwiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImV4cG9ydFwiKTtcblxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdGhlIGJsb2NrIHdpdGggY29kZSB0byBiZSBkaXNwbGF5ZWQgYW5kIGFwcGVuZCBpdCB0byB0aGUgcG9wdXAgZWxlbWVudFxuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPHByZT5cIikuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAkKFwiPGNvZGU+XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmpzb24oZXhwb3J0TmV0d29yay5zdHlsZS5wcmV0dHkpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdGhlIGxpbmtzXG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8YT5cIikuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBkYXRhLmpzb24oZXhwb3J0TmV0d29yay5zdHlsZS5wcmV0dHksIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwiZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcIm5ldHdvcmsuanNvblwiXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAkKFwiPGltZz5cIikuYXR0cignc3JjJywgXCJpbWcvZ3VpL2V4cG9ydC5zdmdcIilcbiAgICAgICAgICAgICAgICApLmFwcGVuZChcIiBleHBhbmRlZCBKU09OXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPGE+XCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUuY29tcGFjdCwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogXCJkb3dubG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRvd25sb2FkXCI6IFwibmV0d29yay5taW4uanNvblwiXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAkKFwiPGltZz5cIikuYXR0cignc3JjJywgXCJpbWcvZ3VpL2V4cG9ydC5zdmdcIilcbiAgICAgICAgICAgICAgICApLmFwcGVuZChcIiBjb21wYWN0IEpTT05cIilcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxpdHkoJHBvcHVwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmQoZXhwb3J0QnV0dG9uKTtcblxuICAgICAgICAvKiBIRUxQICovXG5cbiAgICAgICAgbGV0IGhlbHAgPSBuZXcgZmxvYXRpbmdNZW51SXRlbShcImhlbHBcIiwgXCJoZWxwXCIsIFwiRGlzcGxheSBoZWxwXCIsIFwiYVwiKTtcbiAgICAgICAgaGVscC4kZWwub24oXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgJChcIiNoZWxwXCIpLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSkub24oXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAkKFwiI2hlbHBcIikucmVtb3ZlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBoZWxwLiRlbC5hdHRyKHtcbiAgICAgICAgICAgICdocmVmJzogJy4vZG9jcy8nLFxuICAgICAgICAgICAgJ2RhdGEtbGl0eSc6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcGVuZChoZWxwKTtcblxuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5hZnRlcih0aGlzLiRlbCk7XG4gICAgICAgIHBhcmVudFNWRy4kc3ZnLmFmdGVyKG5ldyBoZWxwV2luZG93KCkuJGVsKTtcbiAgICB9XG5cbiAgICBhcHBlbmQobWVudUl0ZW0pIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKG1lbnVJdGVtLiRlbCk7XG4gICAgfVxufVxuIiwiY2xhc3Mgc3RhdGVDaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3RvcklkLCBzdGF0ZSwgd2hvQ2F1c2VkSXQpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JJZCA9IGNvbm5lY3RvcklkXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZVxuICAgICAgICB0aGlzLndob0NhdXNlZEl0ID0gd2hvQ2F1c2VkSXRcbiAgICB9XG59XG5cbi8vIGFsbCBjb25uZWN0b3JzIG1lbnRpb25lZCBoZXJlIGFyZSBPVVRQVVQgQ09OTkVDVE9SU1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkdcblxuICAgICAgICAvLyBtYXBzIGVhY2ggYWZmZWN0ZWQgb3V0cHV0IGNvbm5lY3RvciB0byBpdCdzIGRpcmVjdGx5IHByZWNlZWRpbmcgb3V0cHV0IGNvbm5lY3RvcnNcbiAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLy8gbWFwcyB3YXZlSWQgLT4gYXJyYXkgb2Ygb3V0cHV0Q29ubmVjdG9ycyBhZmZlY3RlZFxuICAgICAgICB0aGlzLndhdmVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMud2F2ZSA9IDBcblxuICAgIH1cblxuICAgIHJ1bigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NpbXVsYXRpbmcgdGhlIG5ldHdvcmsuLi4nKVxuICAgICAgICB0aGlzLndhdmUrKztcbiAgICAgICAgd2hpbGUodGhpcy53YXZlcy5oYXModGhpcy53YXZlKSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N0ZXAnLCB0aGlzLndhdmUpXG4gICAgICAgICAgICB0aGlzLnN0ZXAoKVxuICAgICAgICAgICAgdGhpcy53YXZlKytcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0ZXAoKSB7XG4gICAgICAgIGZvciAobGV0IHN0YXRlSW5mbyBvZiB0aGlzLndhdmVzLmdldCh0aGlzLndhdmUpKSB7XG4gICAgICAgICAgICB0aGlzLndob0NhdXNlZEl0ID0gc3RhdGVJbmZvLmNvbm5lY3RvcklkXG4gICAgICAgICAgICAvKiAgcHJvY2VzcyBhbGwgb3V0cHV0Q29ubmVjdG9ycyBieSBzZXR0aW5nIHRoZWlyIHN0YXRlXG4gICAgICAgICAgICAgICAgdGhpcyB3aWxsIHRyaWdnZXIgYSBmb2xsb3dpbmcgZXZlbnQgY2hhaW46XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dENvbm5lY3RvciBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgIC0+IGFsbCBjb25uZWN0ZWQgd2lyZXMgY2hhbmdlXG4gICAgICAgICAgICAgICAgICAgIC0+IGFsbCBpbnB1dENvbm5lY3RvcnMgY29ubmVjdGVkIHRvIHRoZXNlIHdpcmVzIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAtPiBhbGwgZWxlbWVudHMgdGhhdCBjb250YWluIHRoZXNlIGlucHV0Q29ubmVjdG9ycyBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgLT4gdGhlc2UgZWxlbWVudHMgY29tcHV0ZSB0aGUgbmV3IHN0YXRlIG9mIHRoZWlyIG91dHB1dCBjb25uZWN0b3JzIGFuZCBjYWxsIG5vdGlmeUNoYW5nZSgpXG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBpZihzdGF0ZUluZm8ud2hvQ2F1c2VkSXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFByZWRlY2Vzc29yKHN0YXRlSW5mby5jb25uZWN0b3JJZCwgc3RhdGVJbmZvLndob0NhdXNlZEl0KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdGVJbmZvLmNvbm5lY3RvcklkIGluIHRoaXMuZ2V0QWxsUHJlZGVjZXNzb3JzKHN0YXRlSW5mby5jb25uZWN0b3JJZCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdDWUNMRSBERVRFQ1RFRCcsIHRoaXMuZ2V0QWxsUHJlZGVjZXNzb3JzKHN0YXRlSW5mby5jb25uZWN0b3JJZCkpXG4gICAgICAgICAgICAgICAgdGhpcy53YXZlcy5jbGVhcigpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlZmxlY3QgdGhlIGNoYW5nZXMgaW4gU1ZHXG4gICAgICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5wYXJlbnRTVkcuZ2V0Q29ubmVjdG9yQnlJZChzdGF0ZUluZm8uY29ubmVjdG9ySWQpXG4gICAgICAgICAgICBpZihjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGVJbmZvLnN0YXRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2hvQ2F1c2VkSXQgPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBhZGRQcmVkZWNlc3Nvcihjb25uZWN0b3JJZCwgcHJlZGVjZXNzb3JDb25uZWN0b3JJZCkge1xuICAgICAgICBpZighdGhpcy5wcmVkZWNlc3NvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuc2V0KGNvbm5lY3RvcklkLCBuZXcgU2V0KCkpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZWRlY2Vzc29ycy5nZXQoY29ubmVjdG9ySWQpLmFkZChwcmVkZWNlc3NvckNvbm5lY3RvcklkKVxuICAgIH1cblxuICAgIGdldEFsbFByZWRlY2Vzc29ycyhjb25uZWN0b3JJZCkge1xuICAgICAgICBpZighdGhpcy5wcmVkZWNlc3NvcnMuaGFzKGNvbm5lY3RvcklkKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuc2V0KGNvbm5lY3RvcklkLCBuZXcgU2V0KCkpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWxsID0gbmV3IFNldCgpXG5cbiAgICAgICAgdGhpcy5wcmVkZWNlc3NvcnMuZ2V0KGNvbm5lY3RvcklkKS5mb3JFYWNoKGFsbC5hZGQsIGFsbCk7XG5cbiAgICAgICAgbGV0IHByZXZTaXplID0gMFxuICAgICAgICBsZXQgc2l6ZSA9IGFsbC5zaXplXG4gICAgICAgIHdoaWxlKHByZXZTaXplIDwgc2l6ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29ubmVjdG9yIG9mIGFsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZWRlY2Vzc29ycy5oYXMoY29ubmVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWRlY2Vzc29ycy5nZXQoY29ubmVjdG9yKS5mb3JFYWNoKGFsbC5hZGQsIGFsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldlNpemUgPSBzaXplXG4gICAgICAgICAgICBzaXplID0gYWxsLnNpemVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbGxcbiAgICB9XG5cbiAgICBub3RpZnlDaGFuZ2UoY29ubmVjdG9ySWQsIHN0YXRlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdub3RpZnlDaGFuZ2UsIGNvbm5lY3RvcjonLCBjb25uZWN0b3JJZCwgJ3dhdmU6JywgdGhpcy53YXZlKVxuXG4gICAgICAgIGxldCB3YXZlSWQgPSB0aGlzLndhdmUgKyAxXG5cbiAgICAgICAgaWYoIXRoaXMud2F2ZXMuaGFzKHdhdmVJZCkpIHtcbiAgICAgICAgICAgIHRoaXMud2F2ZXMuc2V0KHdhdmVJZCwgW10pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndhdmVzLmdldCh3YXZlSWQpLnB1c2gobmV3IHN0YXRlQ2hhbmdlKGNvbm5lY3RvcklkLCBzdGF0ZSwgdGhpcy53aG9DYXVzZWRJdCkpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgKiBhcyBzdmdPYmogZnJvbSAnLi9zdmdPYmplY3RzLmpzJ1xuaW1wb3J0ICogYXMgZWRpdG9yRWxlbWVudHMgZnJvbSAnLi9lZGl0b3JFbGVtZW50cy5qcydcbmltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuaW1wb3J0IENvbnRleHRNZW51IGZyb20gJy4vY29udGV4dE1lbnUuanMnXG5pbXBvcnQgRmxvYXRpbmdNZW51IGZyb20gJy4vZmxvYXRpbmdNZW51LmpzJ1xuaW1wb3J0IFNpbXVsYXRvciBmcm9tICcuL2xvZ2ljU2ltdWxhdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdmcge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JpZFNpemUpIHtcbiAgICAgICAgdGhpcy4kc3ZnID0gJChjYW52YXMpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmJveGVzID0gW107IC8vIHN0b3JlcyBhbGwgYm94ZXNcbiAgICAgICAgdGhpcy53aXJlcyA9IFtdOyAvLyBzdG9yZXMgYWxsIHdpcmVzXG5cbiAgICAgICAgdGhpcy5zaW11bGF0b3IgPSBuZXcgU2ltdWxhdG9yKHRoaXMpXG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkZWZzIGVsZW1lbnQsIHVzZWQgZm9yIHBhdHRlcm5zXG4gICAgICAgIHRoaXMuJGRlZnMgPSAkKFwiPGRlZnM+XCIpO1xuICAgICAgICB0aGlzLiRzdmcucHJlcGVuZCh0aGlzLiRkZWZzKTtcblxuICAgICAgICAvLyBCQUNLR1JPVU5EIFBBVFRFUk5cbiAgICAgICAgbGV0IHBhdHRlcm4gPSBuZXcgc3ZnT2JqLlBhdHRlcm4oXCJncmlkXCIsIHRoaXMuZ3JpZFNpemUsIHRoaXMuZ3JpZFNpemUpO1xuXG4gICAgICAgIGxldCBwYXR0ZXJuUG9pbnRzID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpXG4gICAgICAgICAgICAuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCgwLCAwKSlcbiAgICAgICAgICAgIC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMuZ3JpZFNpemUsIDApKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy5ncmlkU2l6ZSwgdGhpcy5ncmlkU2l6ZSkpO1xuXG4gICAgICAgIHBhdHRlcm4uYWRkQ2hpbGQobmV3IHN2Z09iai5Qb2x5TGluZShwYXR0ZXJuUG9pbnRzLCBcIiNhM2E0ZDJcIiwgMikpO1xuICAgICAgICB0aGlzLmFkZFBhdHRlcm4ocGF0dGVybi5nZXQoKSk7XG5cbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgXCIxMDAlXCIsIFwiMTAwJVwiLCBcInVybCgjZ3JpZClcIiwgXCJub25lXCIpO1xuICAgICAgICB0aGlzLmFwcGVuZEpRdWVyeU9iamVjdCh0aGlzLmJhY2tncm91bmQuZ2V0KCkpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICAvLyBDT05TVFJVQ1QgQ09OVEVYVCBNRU5VXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUgPSBuZXcgQ29udGV4dE1lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQ09OU1RSVUNUIEZMT0FUSU5HIE1FTlVcbiAgICAgICAgLy8gdGhpcy5mbG9hdGluZ01lbnUgPSBuZXcgRmxvYXRpbmdNZW51KHRoaXMpO1xuICAgICAgICB0aGlzLmZsb2F0aW5nTWVudSA9IG5ldyBGbG9hdGluZ01lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQUxMIEVWRU5UIENBTExCQUNLU1xuICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICB0aGlzLiRzdmcub24oJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0UmVhbFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VEb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5oaWRlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpZih0YXJnZXQhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb3VzZU1vdmUoZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KS5vbignbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VVcChldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKFwiY29udGV4dG1lbnVcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q29udGV4dE1lbnUoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZLCB0aGlzLmdldFJlYWxKUXVlcnlUYXJnZXQoZXZlbnQudGFyZ2V0KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgdGhpcy5leHBvcnRXaXJlSWRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZXhwb3J0V2lyZUlkID0gMDtcblxuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIC8vIHRvZG8gaW1wbGVtZW50IGdyaWRTaXplIHNjYWxpbmdcbiAgICAgICAgICAgIC8vIGdyaWRTaXplOiB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgYm94ZXM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGRhdGEuYm94ZXNbaV0gPSB0aGlzLmJveGVzW2ldLmV4cG9ydERhdGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpbXBvcnREYXRhKGRhdGEpIHtcbiAgICAgICAgLy8gdG9kbyBpbXBsZW1lbnQgZ3JpZFNpemUgc2NhbGluZ1xuXG4gICAgICAgIC8vIGxpc3Qgb2Ygd2lyZXMgdG8gYmUgYWRkZWRcbiAgICAgICAgbGV0IG5ld1dpcmVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgZGF0YS5ib3hlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgLy8gYWRkIGJveFxuICAgICAgICAgICAgbGV0IGJveDtcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ib3hlc1tpXS5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJnYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgZ2F0ZSAod2l0aG91dCByZWxvYWRpbmcgdGhlIFNWRywgd2Ugd2lsbCByZWxvYWQgaXQgb25jZSBhZnRlciB0aGUgaW1wb3J0KVxuICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld0dhdGUoZGF0YS5ib3hlc1tpXS5uYW1lLCAwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpb1wiOlxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBpbnB1dCAod2l0aG91dCByZWxvYWRpbmcgdGhlIFNWRywgd2Ugd2lsbCByZWxvYWQgaXQgb25jZSBhZnRlciB0aGUgaW1wb3J0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveCA9IHRoaXMubmV3SW5wdXQoMCwgMCwgZGF0YS5ib3hlc1tpXS5pc09uLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwib3V0cHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBvdXRwdXQgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld091dHB1dCgwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIGlvIGJveCBuYW1lICdcIitkYXRhLmJveGVzW2ldLm5hbWUrXCInLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBib3ggY2F0ZWdvcnkgJ1wiK2RhdGEuYm94ZXNbaV0uY2F0ZWdvcnkrXCInLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJveCkge1xuICAgICAgICAgICAgICAgIC8vIHByb2NjZXNzIGJveCB0cmFuc2Zvcm1zICh0cmFuc2xhdGlvbiBhbmQgcm90YXRpb24pXG4gICAgICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IG5ldyBlZGl0b3JFbGVtZW50cy5UcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwIDsgaiA8IGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zLmxlbmd0aCA7ICsraikge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFuc2xhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyb3RhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc2V0Um90YXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gdHJhbnNmb3JtIHByb3BlcnR5ICdcIitkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5uYW1lK1wiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBib3guc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgYWxsIHdpcmVzIHRvIHRoZSBsaXN0IG9mIHdpcmVzIHRvIGJlIGFkZGVkXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMCA7IGogPCBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zLmxlbmd0aCA7ICsraikge1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGFydGlmaWNpYWwgd2lyZSBpZFxuICAgICAgICAgICAgICAgICAgICBsZXQgd2lyZUlkID0gZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9uc1tqXS53aXJlSWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcGFzcyB0aGUgdmFsdWVzIGdvdCBmcm9tIGpzb24gaW50byBhIHZhcmlhYmxlIHRoYXQgd2lsbCBiZSBhZGRlZCBpbnRvIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGRhdGEuYm94ZXNbaV0uY29ubmVjdGlvbnNbal0uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zW2pdLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3hJZDogYm94LmlkXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSB2YWx1ZSB0byB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld1dpcmVzLmhhcyh3aXJlSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhbHJlYWR5IGlzIGEgd2lyZSB3aXRoIHRoaXMgaWQgaW4gdGhlIG1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgdmFsdWUgdG8gdGhlIGVuZCBvZiB0aGUgYXJyYXkgb2YgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFwVmFsdWUgPSBuZXdXaXJlcy5nZXQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcFZhbHVlLmxlbmd0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1dpcmVzLnNldCh3aXJlSWQsIG1hcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHdpcmUgd2l0aCB0aGlzIGlkIGluIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgd2lyZSBhbmQgc2V0IHRoZSB2YWx1ZSB0byBiZSB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1dpcmVzLnNldCh3aXJlSWQsIFt2YWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgU1ZHIGRvY3VtZW50IChuZWVkZWQgZm9yIHdpcmluZylcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgLy8gd2l0aCBhbGwgYm94ZXMgYWRkZWQsIHdlIGNhbiBub3cgY29ubmVjdCB0aGVtIHdpdGggd2lyZXNcbiAgICAgICAgbmV3V2lyZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3JJZHMgPSBbXTtcbiAgICAgICAgICAgIGlmKGl0ZW1bMF0gJiYgaXRlbVsxXSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDE7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gdGhpcy5nZXRCb3hCeUlkKGl0ZW1baV0uYm94SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rvcklkc1tpXSA9IGJveC5jb25uZWN0b3JzW2l0ZW1baV0uaW5kZXhdLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmV3V2lyZShjb25uZWN0b3JJZHNbMF0sIGNvbm5lY3Rvcklkc1sxXSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZWZyZXNoIHRoZSBTVkcgZG9jdW1lbnRcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgd2lyZUNyZWF0aW9uSGVscGVyKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGlmKCF0aGlzLmZpcnN0Q29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDb25uZWN0b3JJZCA9IGNvbm5lY3RvcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXdXaXJlKHRoaXMuZmlyc3RDb25uZWN0b3JJZCwgY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgdGhpcy5maXJzdENvbm5lY3RvcklkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnROZXdTaW11bGF0aW9uKHN0YXJ0aW5nQ29ubmVjdG9yLCBzdGF0ZSkge1xuICAgICAgICB0aGlzLnNpbXVsYXRvciA9IG5ldyBTaW11bGF0b3IodGhpcylcbiAgICAgICAgdGhpcy5zaW11bGF0b3Iubm90aWZ5Q2hhbmdlKHN0YXJ0aW5nQ29ubmVjdG9yLmlkLCBzdGF0ZSlcbiAgICAgICAgdGhpcy5zaW11bGF0b3IucnVuKClcbiAgICB9XG5cbiAgICBuZXdHYXRlKG5hbWUsIHgsIHksIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0JveCh4LCB5LCBuZXcgZWRpdG9yRWxlbWVudHMuR2F0ZSh0aGlzLCBuYW1lLCB4LCB5KSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgbmV3SW5wdXQoeCwgeSwgaXNPbiA9IGZhbHNlLCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLklucHV0Qm94KHRoaXMsIGlzT24pLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBuZXdPdXRwdXQoeCwgeSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3Qm94KHgsIHksIG5ldyBlZGl0b3JFbGVtZW50cy5PdXRwdXRCb3godGhpcyksIHJlZnJlc2gpO1xuICAgIH1cblxuICAgIG5ld0JveCh4LCB5LCBvYmplY3QsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuYm94ZXMubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuYm94ZXNbaW5kZXhdID0gb2JqZWN0O1xuXG4gICAgICAgIC8vIHRyYW5zbGF0ZSB0aGUgZ2F0ZSBpZiB4IGFuZCB5IGhhcyBiZWVuIHNwZWNpZmllZFxuICAgICAgICBpZih4ICYmIHkpIHtcbiAgICAgICAgICAgIGxldCB0ciA9IG5ldyBlZGl0b3JFbGVtZW50cy5UcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRyLnNldFRyYW5zbGF0ZSh4LCB5KTtcblxuICAgICAgICAgICAgdGhpcy5ib3hlc1tpbmRleF0uc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyLmdldCgpfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGVuZEVsZW1lbnQodGhpcy5ib3hlc1tpbmRleF0sIHJlZnJlc2gpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmJveGVzW2luZGV4XTtcbiAgICB9XG5cbiAgICByZW1vdmVCb3goZ2F0ZUlkKSB7XG4gICAgICAgIGxldCAkZ2F0ZSA9ICQoXCIjXCIrZ2F0ZUlkKTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBnYXRlIGluIHN2ZydzIGxpc3Qgb2YgZ2F0ZXNcbiAgICAgICAgbGV0IGdhdGVJbmRleCA9IC0xO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmJveGVzW2ldLnN2Z09iai5pZD09PWdhdGVJZCkge1xuICAgICAgICAgICAgICAgIGdhdGVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihnYXRlSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCB3aXJlcyBjb25uZWN0ZWQgdG8gdGhpcyBnYXRlXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3hlc1tnYXRlSW5kZXhdLmNvbm5lY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZCh0aGlzLmJveGVzW2dhdGVJbmRleF0uY29ubmVjdG9yc1tpXS5zdmdPYmouaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGdhdGVcbiAgICAgICAgICAgIHRoaXMuYm94ZXMuc3BsaWNlKGdhdGVJbmRleCwgMSk7XG4gICAgICAgICAgICAkZ2F0ZS5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUcnlpbmcgdG8gcmVtb3ZlIGFuIG5vbmV4aXN0aW5nIGdhdGUuIChHYXRlIGlkOiBcIitnYXRlSWQrXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3V2lyZShmcm9tSWQsIHRvSWQsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIC8vIHdpcmUgbXVzdCBjb25uZWN0IHR3byBkaXN0aW5jdCBlbGVtZW50c1xuICAgICAgICBpZiAoZnJvbUlkPT09dG9JZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGxldCBjb25uZWN0b3JzID0gW3RoaXMuZ2V0Q29ubmVjdG9yQnlJZChmcm9tSWQpLCB0aGlzLmdldENvbm5lY3RvckJ5SWQodG9JZCldXG5cbiAgICAgICAgLy8gaW5wdXQgY29ubmVjdG9ycyBjYW4gYmUgY29ubmVjdGVkIHRvIG9uZSB3aXJlIG1heFxuICAgICAgICBjb25uZWN0b3JzLmZvckVhY2goY29ubiA9PiB7XG4gICAgICAgICAgICBpZihjb25uLmlzSW5wdXRDb25uZWN0b3IpXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVXaXJlc0J5Q29ubmVjdG9ySWQoY29ubi5pZClcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLndpcmVzLmxlbmd0aDtcbiAgICAgICAgdGhpcy53aXJlc1tpbmRleF0gPSBuZXcgZWRpdG9yRWxlbWVudHMuV2lyZSh0aGlzLCBmcm9tSWQsIHRvSWQsIHRoaXMuZ3JpZFNpemUpO1xuXG4gICAgICAgIGNvbm5lY3RvcnMuZm9yRWFjaChjb25uID0+IHtcbiAgICAgICAgICAgIGNvbm4uYWRkV2lyZUlkKHRoaXMud2lyZXNbaW5kZXhdLnN2Z09iai5pZCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5hcHBlbmRFbGVtZW50KHRoaXMud2lyZXNbaW5kZXhdLCByZWZyZXNoKTtcbiAgICAgICAgdGhpcy5tb3ZlVG9CYWNrQnlJZCh0aGlzLndpcmVzW2luZGV4XS5zdmdPYmouaWQpO1xuXG4gICAgICAgIHRoaXMud2lyZXNbaW5kZXhdLnVwZGF0ZVdpcmVTdGF0ZSgpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy53aXJlc1tpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0V2lyZUJ5SWQod2lyZUlkKSB7XG4gICAgICAgIGxldCB3aXJlQ291bnQgPSB0aGlzLndpcmVzLmxlbmd0aDtcblxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHdpcmVDb3VudCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy53aXJlc1tpXS5zdmdPYmouaWQ9PT13aXJlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aXJlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRXaXJlc0J5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG4gICAgICAgIHJldHVybiBjb25uZWN0b3Iud2lyZUlkcztcbiAgICB9XG5cbiAgICByZW1vdmVXaXJlQnlJZCh3aXJlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLndpcmVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lyZXNbaV0uc3ZnT2JqLmlkID09PSB3aXJlSWQpIHtcblxuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IxID0gdGhpcy53aXJlc1tpXS5zdGFydENvbm5lY3RvcjtcbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdG9yMiA9IHRoaXMud2lyZXNbaV0uZW5kQ29ubmVjdG9yO1xuXG4gICAgICAgICAgICAgICAgY29ubmVjdG9yMS5yZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IyLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53aXJlc1tpXS5zdmdPYmouJGVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMud2lyZXMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVXaXJlc0J5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG5cbiAgICAgICAgY29ubmVjdG9yLndpcmVJZHMuZm9yRWFjaCh3aXJlSWQgPT4ge1xuICAgICAgICAgICAgbGV0IHdpcmUgPSB0aGlzLmdldFdpcmVCeUlkKHdpcmVJZCk7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgb3RoZXIgY29ubmVjdG9yIHRoYXQgaXMgdGhlIHdpcmUgY29ubmVjdGVkIHRvXG4gICAgICAgICAgICBsZXQgb3RoZXJDb25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQod2lyZS5mcm9tSWQsIHdpcmUpO1xuICAgICAgICAgICAgaWYob3RoZXJDb25uZWN0b3Iuc3ZnT2JqLmlkPT09Y29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgICAgICBvdGhlckNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh3aXJlLnRvSWQsIHdpcmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIHdpcmUgcmVjb3JkIGZyb20gdGhlIG90aGVyIGNvbm5lY3RvclxuICAgICAgICAgICAgb3RoZXJDb25uZWN0b3Iud2lyZUlkcy5kZWxldGUod2lyZUlkKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB3aXJlIHJlcHJlc2VudGF0aW9uIHVzaW5nIGpRdWVyeVxuICAgICAgICAgICAgJChcIiNcIiArIHdpcmVJZCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vIGlmIG90aGVyQ29ubmVjdG9yIGlzIGFuIGlucHV0IGNvbm5lY3Rvciwgc2V0IGl0cyBzdGF0ZSB0byB1bmtub3duXG4gICAgICAgICAgICBpZihvdGhlckNvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJDb25uZWN0b3Iuc2V0U3RhdGUoTG9naWMuc3RhdGUudW5rbm93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSBsaXN0IG9mIHdpcmUgSWRzXG4gICAgICAgIGNvbm5lY3Rvci53aXJlSWRzLmNsZWFyKCk7XG4gICAgICAgIC8vIGlmIGNvbm5lY3RvciBpcyBhbiBpbnB1dCBjb25uZWN0b3IsIHNldCBpdHMgc3RhdGUgdG8gdW5rbm93blxuICAgICAgICBpZihjb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgY29ubmVjdG9yLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlJZChnYXRlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5ib3hlc1tpXS5zdmdPYmouaWQ9PT1nYXRlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib3hlc1tpXS5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm94ZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQsIHdpcmUpIHtcbiAgICAgICAgLy8gdGhlIHdpcmUgdmFyaWFibGUgaXMgdXNlZCBhcyBoZXVyaXN0aWMsXG4gICAgICAgIC8vIHdoZW4gd2Uga25vdyB0aGUgd2lyZSwgd2UgaGF2ZSB0byBjaGVjayBvbmx5XG4gICAgICAgIC8vIHR3byBnYXRlcyBpbnN0ZWFkIG9mIGFsbCBvZiB0aGVtXG5cbiAgICAgICAgaWYod2lyZSE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gd2Uga25vdyB0aGUgd2lyZSAtLSB3ZSBjYW4gY2hlY2sgb25seSBnYXRlcyBhdCB0aGUgZW5kcyBvZiB0aGlzIHdpcmVcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3IgPSB3aXJlLnN0YXJ0Qm94LmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgaWYgKCFjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IgPSB3aXJlLmVuZEJveC5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3I7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGRvIG5vdCBrbm93IHRoZSB3aXJlIC0tIHdlIGhhdmUgdG8gY2hlY2sgYWxsIGdhdGVzXG4gICAgICAgICAgICBsZXQgZ2F0ZUNvdW50ID0gdGhpcy5ib3hlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBnYXRlQ291bnQgOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5ib3hlc1tpXS5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgICAgICBpZihjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgb2JqZWN0LCB0aGF0IHVzZXIgaW50ZXJhY3RlZCB3aXRoLCBpcyBub3QgYSBjb25uZWN0b3IgYW5kIGlzIGluIGEgZ3JvdXBcbiAgICAvLyByZXR1cm4gdGhlIGdyb3VwIGpRdWVyeSBvYmplY3QgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgalF1ZXJ5IG9iamVjdFxuICAgIGdldFJlYWxKUXVlcnlUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuICAgICAgICBpZighJHRhcmdldC5oYXNDbGFzcyhcImNvbm5lY3RvclwiKSAmJiAkdGFyZ2V0LnBhcmVudHMoJ2cnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcIkdcIiAmJiAkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcImdcIikge1xuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkdGFyZ2V0O1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIGVkaXRvckVsZW1lbnQgdGhhdCB1c2VyIGludGVyYWN0ZWQgd2l0aCwgdGhlIFwidGFyZ2V0XCIgYXJndW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudFxuICAgIGdldFJlYWxUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIC8vIGV2ZW50eSBzZSBtdXNlamkgenByYWNvdmF0IHRhZHksIHByb3RvemUgdiBTVkcgc2UgZXZlbnR5IG5lcHJvcGFndWppXG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuXG4gICAgICAgIGlmKCR0YXJnZXQuaGFzQ2xhc3MoXCJjb25uZWN0b3JcIikpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjb25uZWN0b3IsIGRvbid0IHRyYXZlcnNlIGdyb3Vwc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYoJHRhcmdldC5wYXJlbnRzKCdnJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gdGhpcyBlbGVtZW50IGlzIGluIGEgZ3JvdXAgYW5kIGl0IGlzIG5vdCBhIGNvbm5lY3RvclxuXG4gICAgICAgICAgICAvLyB0cmF2ZXJzaW5nIHVwIHRoZSBET00gdHJlZSB1bnRpbCB3ZSBmaW5kIHRoZSBjbG9zZXN0IGdyb3VwXG4gICAgICAgICAgICBsZXQgJHBhcmVudEdyb3VwID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkcGFyZW50R3JvdXAucHJvcChcInRhZ05hbWVcIikgIT09IFwiR1wiICYmICRwYXJlbnRHcm91cC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJnXCIpIHtcbiAgICAgICAgICAgICAgICAkcGFyZW50R3JvdXAgPSAkcGFyZW50R3JvdXAucGFyZW50KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJveEJ5SWQoJHBhcmVudEdyb3VwLmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoXCJ3aXJlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRXaXJlQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZEVsZW1lbnQoZWxlbWVudCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRKUXVlcnlPYmplY3QoZWxlbWVudC5nZXQoKSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgYXBwZW5kSlF1ZXJ5T2JqZWN0KG9iamVjdCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmFwcGVuZChvYmplY3QpO1xuICAgICAgICBpZihyZWZyZXNoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFBhdHRlcm4ocGF0dGVybikge1xuICAgICAgICB0aGlzLiRkZWZzLmFwcGVuZChwYXR0ZXJuKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgLy8gcmVsb2FkIHRoZSBTVkcgZG9jdW1lbnQgKG5lZWRlZCB0byBkaXNwbGF5IG5ld2x5IGFwcGVuZGVkIGpRdWVyeSBvYmplY3QpXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmh0bWwodGhpcy4kc3ZnLmh0bWwoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU1ZHIGRvY3VtZW50IGhhcyBiZWVuIHJlbG9hZGVkLlwiKVxuICAgIH1cblxuICAgIGRpc3BsYXlDb250ZXh0TWVudSh4LCB5LCAkdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuZGlzcGxheSh4LCB5LCAkdGFyZ2V0KTtcbiAgICB9XG4gICAgaGlkZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBzbmFwIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc25hcFRvR3JpZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuZ3JpZFNpemUpICogdGhpcy5ncmlkU2l6ZTtcbiAgICB9XG5cbiAgICAvLyBzdGF0aWMgZnVuY3Rpb24gZm9yIHNuYXBwaW5nIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc3RhdGljIHNuYXBUb0dyaWQodmFsdWUsIGdyaWRTaXplKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gZ3JpZFNpemUpICogZ3JpZFNpemU7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBjYW5ub3QgYmUgdXNlZCBmb3Igd2lyaW5nIGF0IGFueSBjaXJjdW1zdGFuY2VzXG4gICAgZ2V0Tm9uUm91dGFibGVOb2RlcygpIHtcbiAgICAgICAgbGV0IGJsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgLy8gZm9yIGVhY2ggYm94XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgalF1ZXJ5IGNoaWxkIHdpdGggY2xhc3MgLnJlY3QgKFwiaGl0Ym94XCIpXG4gICAgICAgICAgICBsZXQgcmVjdCA9ICQoJyMnICsgdGhpcy5ib3hlc1tpXS5zdmdPYmouaWQpLmNoaWxkcmVuKFwiLnJlY3RcIilbMF07XG4gICAgICAgICAgICAvLyBnZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGVcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9ICQocmVjdCkucG9zaXRpb24oKTtcblxuICAgICAgICAgICAgLy8gc25hcCB0aGUgcG9zaXRpb24gdG8gdGhlIGdyaWRcbiAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24ubGVmdCk7XG4gICAgICAgICAgICBwb3NpdGlvbi50b3AgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24udG9wKTtcblxuICAgICAgICAgICAgLy8gZm9yIGVhY2ggaXRlbSBpbiBibG9ja2VkTm9kZXMgKHNldCBvZiBibG9ja2VkIG5vZGVzIHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmVcbiAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IHVwcGVyIGNvcm5lciBvZiByZWN0OyB1bml0IHVzZWQgaXMgXCJvbmUgZ3JpZFNpemVcIikgY29udmVydCB0aGUgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIC8vIHRvIGFic29sdXRlIChtdWx0aXBsZSB3aXRoIGdyaWRTaXplIGFuZCBhZGQgcG9zaXRpb24gb2YgcmVjdCkgYW5kIGFkZCB0aGUgcmVzdWx0IHRvIHRoZSBzZXRcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLmJveGVzW2ldLmJsb2NrZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGxldCBhYnNvbHV0ZVggPSBwb3NpdGlvbi5sZWZ0ICsgaXRlbS54ICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgICAgICAgICBsZXQgYWJzb2x1dGVZID0gcG9zaXRpb24udG9wICsgaXRlbS55ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICAgICAgICAgIGJsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBhYnNvbHV0ZVgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGFic29sdXRlWVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRvZG8gZW5zdXJlIHRoYXQgdGhpcy5yZWZyZXNoKCkgaXMgcmVhbGx5IHVubmVjZXNzYXJ5XG4gICAgICAgIC8vIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gYmxvY2tlZE5vZGVzO1xuICAgIH1cblxuICAgIG1vdmVUb0Zyb250QnlJZChvYmpJZCkge1xuICAgICAgICB0aGlzLiRzdmcuYXBwZW5kKCQoXCIjXCIgKyBvYmpJZCkpO1xuICAgIH1cblxuICAgIG1vdmVUb0JhY2tCeUlkKG9iaklkKSB7XG4gICAgICAgICQoXCIjXCIgKyB0aGlzLmJhY2tncm91bmQuaWQpXG4gICAgICAgICAgICAuYWZ0ZXIoJChcIiNcIiArIG9iaklkKSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBpcyBiZXR0ZXIgbm90IHRvIHVzZSBmb3Igd2lyaW5nXG4gICAgZ2V0SW5jb252ZW5pZW50Tm9kZXMoaWdub3JlV2lyZUlkKSB7XG5cbiAgICAgICAgbGV0IGluY29udmVuaWVudE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAvLyBmb3IgZWFjaCB3aXJlXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy53aXJlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIChpZ25vcmUgdGhlIHdpcmUgdGhhdCBpcyBzcGVjaWZpZWQgaW4gdGhlIGlnbm9yZVdpcmVJZCBhcmd1bWVudCAoaWYgYW55KSlcbiAgICAgICAgICAgIGlmKGlnbm9yZVdpcmVJZD09PXVuZGVmaW5lZCB8fCBpZ25vcmVXaXJlSWQhPT10aGlzLndpcmVzW2ldLnN2Z09iai5pZCkge1xuICAgICAgICAgICAgICAgIC8vIGN5Y2xlIHRocm91Z2ggcG9pbnRzLCBmb3IgZWFjaCBuZWlnYm91cnMgYWRkIGFsbCBwb2ludHMgdGhhdCBhcmUgaW4gYmV0d2VlbiB0aGVtXG4gICAgICAgICAgICAgICAgLy8gaS5lLjogKDAsMCkgYW5kICgwLDMwKSBhcmUgYmxvY2tpbmcgdGhlc2Ugbm9kZXM6ICgwLDApLCAoMCwxMCksICgwLDIwKSwgKDAsMzApXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb2ludDtcbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzW2ldLnBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZQb2ludCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJldlBvaW50IGlzIHVuZGVmaW5lZCwgYWRkIHRoZSBmaXJzdCBwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jb252ZW5pZW50Tm9kZXMuYWRkKHt4OiBwb2ludC54LCB5OiBwb2ludC55fSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGFkZCBhbGwgdGhlIHBvaW50IGJldHdlZW4gdGhlIHByZXZQb2ludCAoZXhjbHVkZWQpIGFuZCBwb2ludCAoaW5jbHVkZWQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByZXZQb2ludC54PT09cG9pbnQueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIGhvcml6b250YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IE1hdGgubWluKHByZXZQb2ludC55LCBwb2ludC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG8gPSBNYXRoLm1heChwcmV2UG9pbnQueSwgcG9pbnQueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZShmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29udmVuaWVudE5vZGVzLmFkZCh7eDogcG9pbnQueCwgeTogZnJvbX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICs9IHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHByZXZQb2ludC55PT09cG9pbnQueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb20gPSBNYXRoLm1pbihwcmV2UG9pbnQueCwgcG9pbnQueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvID0gTWF0aC5tYXgocHJldlBvaW50LngsIHBvaW50LngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUoZnJvbSA8PSB0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbnZlbmllbnROb2Rlcy5hZGQoe3g6IGZyb20sIHk6IHBvaW50Lnl9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArPSB0aGlzLmdyaWRTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluZSBpcyBuZWl0aGVyIGhvcml6b250YWwgbm9yIHZlcnRpY2FsLCB0aHJvdyBhbiBlcnJvciBmb3IgYmV0dGVyIGZ1dHVyZSBkZWJ1Z2dpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZ2V0SW5jb252ZW5pZW50Tm9kZXM6IGxpbmUgYmV0d2VlbiB0d28gcG9pbnRzIGlzIG5laXRoZXIgaG9yaXpvbnRhbCBub3IgdmVydGljYWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgbmV3IHByZXZQb2ludFxuICAgICAgICAgICAgICAgICAgICBwcmV2UG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gaW5jb252ZW5pZW50Tm9kZXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFN2ZyBmcm9tICcuL2NhbnZhcy5qcyc7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGxldCBzdmcgPSBuZXcgU3ZnKFwic3ZnI2NhbnZhc1wiLCAxMCk7XG5cbiAgICAvKiBERU1PICovXG4gICAgLy8gT05FIEJJVCBDT01QQVJBVE9SXG4gICAgLypcbiAgICBsZXQgaTEgPSBzdmcubmV3SW5wdXQoMTAwLCAxMDApO1xuICAgIGxldCBpMiA9IHN2Zy5uZXdJbnB1dCgxMDAsIDIwMCk7XG5cbiAgICBsZXQgbjEgPSBzdmcubmV3R2F0ZShcIm5vdFwiLCAyMDAsIDEwMCk7XG4gICAgbGV0IG4yID0gc3ZnLm5ld0dhdGUoXCJub3RcIiwgMjAwLCAyMDApO1xuXG4gICAgbGV0IGExID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCA5MCk7XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCAyMTApO1xuXG4gICAgbGV0IG5vciA9IHN2Zy5uZXdHYXRlKFwibm9yXCIsIDU0MCwgMTUwKTtcblxuICAgIGxldCBvMSA9IHN2Zy5uZXdPdXRwdXQoNjgwLCA5MCk7XG4gICAgbGV0IG8yID0gc3ZnLm5ld091dHB1dCg2ODAsIDE1MCk7XG4gICAgbGV0IG8zID0gc3ZnLm5ld091dHB1dCg2ODAsIDIxMCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbjEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG4yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKG4xLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShuMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbm9yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGEyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBub3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUobm9yLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzMuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cblxuICAgIC8vIEJJTkFSWSBBRERFUlxuICAgIC8qXG4gICAgbGV0IGkxID0gc3ZnLm5ld0lucHV0KDgwLCA5MCk7XG4gICAgbGV0IGkyID0gc3ZnLm5ld0lucHV0KDgwLCAxMzApO1xuICAgIGxldCBpMyA9IHN2Zy5uZXdJbnB1dCg4MCwgMTgwKTtcblxuICAgIGxldCB4MSA9IHN2Zy5uZXdHYXRlKFwieG9yXCIsIDM2MCwgMTAwKTtcbiAgICBsZXQgeDIgPSBzdmcubmV3R2F0ZShcInhvclwiLCAzNjAsIDE3MCk7XG5cbiAgICBsZXQgYTEgPSBzdmcubmV3R2F0ZShcImFuZFwiLCAyNTAsIDIyMCk7XG4gICAgYTEub25DbGlja01pZGRsZSgpOy8vIGEgamVkbm91IHJvdG92YW55XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgNTAwLCAzMjApO1xuXG4gICAgbGV0IG9yID0gc3ZnLm5ld0dhdGUoXCJvclwiLCA2MjAsIDMxMCk7XG5cbiAgICBsZXQgbzEgPSBzdmcubmV3T3V0cHV0KDc1MCwgMjcwKTtcbiAgICBsZXQgbzIgPSBzdmcubmV3T3V0cHV0KDc1MCwgMzEwKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4MS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDEuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoeDEub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKHgxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGExLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvci5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKHgyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgb3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShvci5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cbn0pOyJdfQ==
