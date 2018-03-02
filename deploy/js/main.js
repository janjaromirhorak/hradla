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
        switch (this.name) {
          case "and":
            this.connectors[0].setState(Logic.and(this.connectors[1].state, this.connectors[2].state));
            break;
          case "nand":
            this.connectors[0].setState(Logic.nand(this.connectors[1].state, this.connectors[2].state));
            break;
          case "nor":
            this.connectors[0].setState(Logic.nor(this.connectors[1].state, this.connectors[2].state));
            break;
          case "not":
            this.connectors[0].setState(Logic.not(this.connectors[1].state));
            break;
          case "or":
            this.connectors[0].setState(Logic.or(this.connectors[1].state, this.connectors[2].state));
            break;
          case "xnor":
            this.connectors[0].setState(Logic.xnor(this.connectors[1].state, this.connectors[2].state));
            break;
          case "xor":
            this.connectors[0].setState(Logic.xor(this.connectors[1].state, this.connectors[2].state));
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
        this.startBox.refreshState();
        this.endBox.refreshState();
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
  var Logic = ($__src_47_es6_47_logic_46_js__).default;
  var stateChange = function() {
    function stateChange(connectorId, state, wave) {
      this.connectorId = connectorId;
      this.state = state;
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
        while (this.waves.has(this.wave)) {
          step();
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
              connector = this.parentSVG.getConnectorById(stateInfo.connectorId);
              connector.setState(stateInfo.state);
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
      },
      notifyChange: function(connectorId, state) {
        var waveId = this.wave + 1;
        if (!this.waves.has(waveId)) {
          this.waves.set(waveId, []);
        }
        this.waves.get(waveId).push(new stateChange(connectorId, state));
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
        this.simulator = new Simulator;
        this.simulator.notifyChange(startingConnector, state);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiIsInNyYy9lczYvc3RydWN0dXJlc0FuZENsYXNzZXMuanMiLCJzcmMvZXM2L3N2Z09iamVjdHMuanMiLCJzcmMvZXM2L2xvZ2ljLmpzIiwic3JjL2VzNi9lZGl0b3JFbGVtZW50cy5qcyIsInNyYy9lczYvY29udGV4dE1lbnUuanMiLCJzcmMvZXM2L2ltcG9ydEV4cG9ydC5qcyIsInNyYy9lczYvZmxvYXRpbmdNZW51LmpzIiwic3JjL2VzNi9sb2dpY1NpbXVsYXRvci5qcyIsInNyYy9lczYvY2FudmFzLmpzIiwic3JjL2VzNi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQUFBSSxJQUFBLENBQUEsWUFBVyxvQ0FBb0IsQ0FBQztBQ0dwQyxBQUFJLElBQUEsQ0FBQSxrQkFBaUIsRUFBSSxLQUFHLENBQUM7SUFFaEIsR0FBQyxFQUxkLENBQUEsU0FBUyxBQUFEO0FBS0QsV0FBTSxHQUFDLENBQ0UsQUFBRCxDQUFHO0FBQ1YsU0FBRyxDQUFDLGtCQUFpQixDQUFFO0FBQ25CLHlCQUFpQixFQUFJLEtBQUcsQ0FBQztNQUM3QjtBQUFBLEFBRUEsU0FBRyxPQUFPLEVBQUksS0FBRyxDQUFDO0FBQ2xCLFNBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBQztBQUVmLFdBQU8sbUJBQWlCLENBQUM7SUFDN0I7QUFvQkosQUFqQ1UsU0FBTyxDQUFBLDZCQUFrQixBQUFDO0FBZWhDLFFBQUksT0FBSyxFQUFJO0FBQ1QsQUFBSSxVQUFBLENBQUEsTUFBSyxFQUFJLENBQUEsSUFBRyxTQUFTLEFBQUMsRUFBQyxDQUFDO0FBSTVCLGNBQU0sQ0FBQSxBQUFDLENBQUMsR0FBRSxFQUFFLE9BQUssQ0FBQyxPQUFPLENBQUc7QUFDeEIsYUFBRyxPQUFPLEVBQUUsQ0FBQztBQUNiLGVBQUssRUFBSSxDQUFBLElBQUcsU0FBUyxBQUFDLEVBQUMsQ0FBQztRQUM1QjtBQUFBLEFBRUEsV0FBRyxPQUFPLEVBQUUsQ0FBQztBQUViLGFBQU8sT0FBSyxDQUFDO01BQ2pC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QUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDL0MsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDaEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FDcEQsRUFBQyxLQUFJLE1BQU0sR0FBRyxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FFeEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUMsQ0FDbEQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDMUQsRUFBQyxLQUFJLE1BQU0sSUFBSSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FDOUQsRUFBQyxLQUFJLE1BQU0sUUFBUSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUMsQ0FFbEUsRUFBQyxLQUFJLE1BQU0sWUFBWSxDQUFHLENBQUEsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUMsQ0FDOUUsQ0FBQyxDQUFDO01BQ047QUFDTyxTQUFHLENBQVYsVUFBWSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUc7QUFDZCxhQUFPLENBQUEsS0FBSSxJQUFJLEFBQUMsQ0FBQyxLQUFJLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO01BQ3JDO0FBQ08sUUFBRSxDQUFULFVBQVcsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFHO0FBQ2IsYUFBTyxDQUFBLEtBQUksd0JBQXdCLEFBQUMsQ0FBQyxDQUFBLENBQUcsRUFBQSxDQUFHLEVBQ3ZDLENBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxHQUFHLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sR0FBRyxDQUFDLENBQ2hELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQ3pELEVBQUMsS0FBSSxNQUFNLEdBQUcsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWpFLEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxJQUFJLENBQUcsQ0FBQSxLQUFJLE1BQU0sSUFBSSxDQUFDLENBQ2xELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzFELEVBQUMsS0FBSSxNQUFNLElBQUksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sWUFBWSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxRQUFRLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBQzlELEVBQUMsS0FBSSxNQUFNLFFBQVEsQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZLENBQUcsQ0FBQSxLQUFJLE1BQU0sUUFBUSxDQUFDLENBRWxFLEVBQUMsS0FBSSxNQUFNLFlBQVksQ0FBRyxDQUFBLEtBQUksTUFBTSxZQUFZ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QXBHTyxVQUFTLENBQWhCLFVBQWtCLEtBQUksQ0FBRyxDQUFBLFFBQU8sQ0FBRztBQUMvQixhQUFPLENBQUEsSUFBRyxNQUFNLEFBQUMsQ0FBQyxLQUFJLEVBQUksU0FBTyxDQUFDLENBQUEsQ0FBSSxTQUFPLENBQUM7TUFDbEQsRUFuZXdGLENBQUM7RUFDckYsQUFBQyxFQUFDOztBQUhWLFNBQUEsYUFBd0I7QUFBRSxnQkFBd0I7SUFBRSxFQUE3Qjs7OztBQUF2QixBQUFJLElBQUEsQ0FBQSxZQUFXLG9CQUFvQixDQUFDO0lDQTdCLElBQUU7QUFFVCxFQUFBLEFBQUMsQ0FBQyxTQUFVLEFBQUQsQ0FBRztBQUNWLEFBQUksTUFBQSxDQUFBLEdBQUUsRUFBSSxJQUFJLElBQUUsQUFBQyxDQUFDLFlBQVcsQ0FBRyxHQUFDLENBQUMsQ0FBQztFQTJFdkMsQ0FBQyxDQUFDO0FBOUVGLFdBQXVCIiwiZmlsZSI6Ii9ob21lL3dhcmFuL1Nrb2xhL3JwL2NvZGUvdGVtcG91dE1DNHdNVEk1TkRJME1EUXlNekkwTkRrMU1qTXJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbCwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHNpbmdsZXRvbiB0byBnZW5lcmF0ZSB1bmlxdWUgaWQnc1xubGV0IGV4aXN0aW5nSWRJbnN0YW5jZSA9IG51bGw7XG4vLyB1c2FnZTogbGV0IGlkID0gbmV3IElkKCkudW5pcXVlXG5leHBvcnQgY2xhc3MgSWQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZighZXhpc3RpbmdJZEluc3RhbmNlKXtcbiAgICAgICAgICAgIGV4aXN0aW5nSWRJbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZWZpeCA9IFwiaWRcIjtcbiAgICAgICAgdGhpcy5uZXh0SWQgPSAwO1xuXG4gICAgICAgIHJldHVybiBleGlzdGluZ0lkSW5zdGFuY2U7XG4gICAgfVxuXG4gICAgZ2V0IHVuaXF1ZSgpIHtcbiAgICAgICAgbGV0IHJldFZhbCA9IHRoaXMuZ2VuZXJhdGUoKTtcblxuICAgICAgICAvLyBmaW5kIG5leHQgdW51c2VkIGlkWFhYWCB0byBwcmV2ZW50IGlkIGNvbGxpc2lvbiB0aGF0IG1pZ2h0IGJlIGNhdXNlZCBieSBzb21lIG90aGVyIGNvbXBvbmVudFxuICAgICAgICAvLyAoaXQgcmVhbGx5IHNob3VsZCBub3QgaGFwcGVuLCBidXQgdGhpcyBpcyBhIHNpbXBsZSBtZXRob2QgdG8gZW5zdXJlIHNhZmV0eSlcbiAgICAgICAgd2hpbGUoJChcIiNcIityZXRWYWwpLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0SWQrKztcbiAgICAgICAgICAgIHJldFZhbCA9IHRoaXMuZ2VuZXJhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gdGhpcyBpZFxuICAgICAgICB0aGlzLm5leHRJZCsrO1xuXG4gICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeCArIHRoaXMubmV4dElkO1xuICAgIH1cbn1cblxuLy8gdG8gZXM1IGNvbXBpbGVyIGZyaWVuZGx5IGltcGxlbWVudGF0aW9uIChcImNhbGxpbmcgYSBidWlsdGluIE1hcCBjb25zdHJ1Y3RvciB3aXRob3V0IG5ldyBpcyBmb3JiaWRkZW5cIilcbmV4cG9ydCBjbGFzcyBNYXBXaXRoRGVmYXVsdFZhbHVlIHtcbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IGRlZmF1bHRWYWx1ZTtcblxuXG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5zaXplO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBmb3JFYWNoKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmZvckVhY2goLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZGVsZXRlKGtleSk7XG4gICAgfVxuXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5oYXMoa2V5KTtcbiAgICB9XG5cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZW50cmllcygpO1xuICAgIH1cblxuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5rZXlzKCk7XG4gICAgfVxuXG4gICAgdmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAudmFsdWVzKCk7XG4gICAgfVxufVxuXG4vKlxuLy8gZXM2IGltcGxlbWVudGF0aW9uXG5leHBvcnQgY2xhc3MgTWFwV2l0aERlZmF1bHRWYWx1ZSBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3IoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgaWYodGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiovIiwiaW1wb3J0ICogYXMgU3RydWN0dXJlcyBmcm9tICcuL3N0cnVjdHVyZXNBbmRDbGFzc2VzLmpzJ1xuXG5jbGFzcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgdGhpcy50YWdOYW1lID0gdGFnTmFtZTtcblxuICAgICAgICB0aGlzLiRlbCA9ICQoXCI8XCIrdGhpcy50YWdOYW1lK1wiPlwiKTtcblxuICAgICAgICB0aGlzLmlkID0gbmV3IFN0cnVjdHVyZXMuSWQoKS51bmlxdWU7XG4gICAgfVxuXG4gICAgYWRkQ2xhc3MobmFtZSkge1xuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhuYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVDbGFzc2VzKC4uLmNsYXNzZXMpIHtcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQXR0cihhc3NvYykge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcblxuICAgICAgICAvLyBhZGQgYXR0cmlidXRlcyB0byB0aGUgZWxlbWVudFxuICAgICAgICB0aGlzLiRlbC5hdHRyKGFzc29jKTtcbiAgICB9XG5cbiAgICBnZXRBdHRyKG5hbWUpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmRWxlbWVudEV4aXN0c0luRE9NKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLmF0dHIobmFtZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXR0cihuYW1lKSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpO1xuXG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUF0dHIobmFtZSk7XG4gICAgfVxuXG4gICAgc2V0IGlkKGlkKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJpZFwiOiBpZH0pO1xuICAgIH07XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHIoXCJpZFwiKTtcbiAgICB9O1xuXG4gICAgZ2V0KCkge1xuICAgICAgICB0aGlzLmNoZWNrSWZFbGVtZW50RXhpc3RzSW5ET00oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBlbGVtZW50IGV4aXN0cyBpbiBkb20sIHdlIG5lZWQgdG8gZmV0Y2ggaXQgdXNpbmcgalF1ZXJ5XG4gICAgY2hlY2tJZkVsZW1lbnRFeGlzdHNJbkRPTSgpIHtcbiAgICAgICAgbGV0ICRqcUVsZW1lbnQgPSAkKFwiI1wiK3RoaXMuJGVsLmF0dHIoJ2lkJykpO1xuICAgICAgICBpZigkanFFbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkanFFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBUYWcge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgZHJhZ2dhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJkcmFnZ2FibGVcIjogdmFsdWV9KTtcbiAgICB9XG59XG5cbmNsYXNzIFJvdGF0YWJsZSBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IodGFnTmFtZSkge1xuICAgICAgICBzdXBlcih0YWdOYW1lKTtcbiAgICB9XG5cbiAgICByb3RhdGFibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcInJvdGF0YWJsZVwiOiB2YWx1ZX0pO1xuICAgIH1cbn1cblxuLy8gdGhlcmUgaXMgbm8gbXVsdGlwbGUgaW5oZXJpdGFuY2UgaW4gRVM2LCBzbyBJIGhhdmUgdG8gZG8gc29tZXRoaW5nIHVnbHkgbGlrZSB0aGlzXG5jbGFzcyBEcmFnZ2FibGVSb3RhdGFibGUgZXh0ZW5kcyBEcmFnZ2FibGUge1xuICAgIGNvbnN0cnVjdG9yKHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgcm90YXRhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XCJyb3RhdGFibGVcIjogdmFsdWV9KTtcbiAgICB9XG59XG5cbmNsYXNzIFN2Z0VsZW1lbnQgZXh0ZW5kcyBEcmFnZ2FibGVSb3RhdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIHRhZ05hbWUpIHtcbiAgICAgICAgc3VwZXIodGFnTmFtZSk7XG5cbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgU3ZnRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgZmlsbCwgc3Ryb2tlKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHcsIGgsIFwicmVjdFwiKTtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGwsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZSxcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAwLjUsXG4gICAgICAgICAgICAncG9pbnRlci1ldmVudHMnOiAnYWxsJyAvLyB0byB0cmlnZ2VyIGhvdmVyIGV2ZW4gd2l0aCB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN2Z0ltYWdlIGV4dGVuZHMgU3ZnRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgdXJsKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIHcsIGgsIFwiaW1hZ2VcIik7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBcInhsaW5rOmhyZWZcIjogdXJsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZVVybCh1cmwpIHtcbiAgICAgICAgdGhpcy5hZGRBdHRyKHtcbiAgICAgICAgICAgIFwieGxpbms6aHJlZlwiOiB1cmxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBEcmFnZ2FibGVSb3RhdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcImdcIik7XG4gICAgfVxuXG4gICAgYWRkQ2hpbGQoZWwpIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGVsLiRlbCk7XG4gICAgICAgIHJldHVybiBlbDsgLy8gcHJvIGplZG5vZHVzc2kgXCJsZXQgcmVjdCA9IGcuYWRkQ2hpbGQobmV3IFJlY3RhbmdsZSguLi5cIlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvbHlsaW5lUG9pbnQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgaWYoeCAhPT0gdW5kZWZpbmVkICYmIHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZUZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIGxldCBhcnIgPSBzdHJpbmcuc3BsaXQoXCIsXCIpO1xuICAgICAgICByZXR1cm4gbmV3IFBvbHlsaW5lUG9pbnQoYXJyWzBdLCBhcnJbMV0pO1xuICAgIH1cblxuICAgIGdldCBzdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKyBcIixcIiArIHRoaXMueTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55O1xuICAgIH1cbn1cblxuY2xhc3MgU21hcnRBcnJheSB7XG4gICAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgICAgIGlmKGFyciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFyciA9IGFycjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXJyID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gU21hcnRBcnJheSgkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5hcnIpKTtcbiAgICB9XG5cbiAgICBhcHBlbmQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkV2l0aEluZGV4KHBvaW50LCB0aGlzLmFyci5sZW5ndGgpO1xuICAgIH1cblxuICAgIHByZXBlbmQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkV2l0aEluZGV4KHBvaW50LCAwKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYSBwb2ludCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LCBtb3ZlIGFsbCBmb2xsb3dpbmcgaXRlbXNcbiAgICBhZGRXaXRoSW5kZXgocG9pbnQsIGluZGV4KSB7XG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuYXJyLmxlbmd0aCA7IGkgPiBpbmRleCA7IC0taSkge1xuICAgICAgICAgICAgdGhpcy5hcnJbaV0gPSB0aGlzLmFycltpLTFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJyW2luZGV4XSA9IHBvaW50O1xuICAgICAgICByZXR1cm4gdGhpczsgLy8gdG8gZW5hYmxlIGNoYWluaW5nIG9mIGFwcGVuZCAvIHByZXBwZW5kIC8gYWRkV2l0aEluZGV4IGNvbW1hbmRzXG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRJdGVtKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFycltpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0IGxhc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGVuZ3RoIT09MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyW3RoaXMubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZmlyc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGVuZ3RoIT09MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaW5kZXhBcnJheSBtdXN0IGJlIHNvcnRlZCAoQVNDLCBlZy4gWzEsIDMsIDQsIDhdKVxuICAgIHJlbW92ZShpbmRleCkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yKGxldCBpID0gaW5kZXggOyBpIDwgbGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmFycltpXSA9IHRoaXMuYXJyW2kgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFyci5wb3AoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2x5bGluZVBvaW50cyBleHRlbmRzIFNtYXJ0QXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKGFycikge1xuICAgICAgICBzdXBlcihhcnIpO1xuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9seWxpbmVQb2ludHMoJC5leHRlbmQodHJ1ZSwgW10sIHRoaXMuYXJyKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKHBvaW50KSB7XG4gICAgICAgIC8vIGNhbGwgaW5oZXJpdGVkIGZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYXBwZW5kaW5nXG4gICAgICAgIHN1cGVyLmFwcGVuZChwb2ludCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHNlY29uZCB0byBsYXN0IHBvaW50IGlzIHVubmVjZXNzYXJ5LCByZW1vdmUgaXRcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICBpZiAoIGxlbmd0aCA+PSAzXG4gICAgICAgICAgICAgICAgJiYgKCAgICAoIHRoaXMuZ2V0SXRlbShsZW5ndGggLSAzKS54ID09PSB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMikueCA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDEpLnggKVxuICAgICAgICAgICAgICAgICAgICAgfHwgKCB0aGlzLmdldEl0ZW0obGVuZ3RoIC0gMykueSA9PT0gdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtKGxlbmd0aCAtIDIpLnkgPT09IHRoaXMuZ2V0SXRlbShsZW5ndGggLSAxKS55IClcbiAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUobGVuZ3RoIC0gMik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhpcyBlbGVtZW50ICh0byBhbGxvdyBjaGFpbmluZylcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgcGFyc2VGcm9tU3RyaW5nKHN0cmluZykge1xuICAgICAgICBsZXQgcG9pbnRTdHJpbmdzID0gc3RyaW5nLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBQb2x5bGluZVBvaW50cygpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgcG9pbnRTdHJpbmdzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgcG9pbnRzLmFwcGVuZChQb2x5bGluZVBvaW50LnBhcnNlRnJvbVN0cmluZyhwb2ludFN0cmluZ3NbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IHN0cmluZygpIHtcbiAgICAgICAgbGV0IHN0cmluZyA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIGlmKGkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJpbmcgKz0gdGhpcy5hcnJbaV0uc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgZm9yRWFjaChmdW5jKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5hcnIubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBmdW5jKHRoaXMuYXJyW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvbHlMaW5lIGV4dGVuZHMgVGFnIHtcbiAgICBjb25zdHJ1Y3Rvcihwb2ludHMsIGNvbG9yLCBzdHJva2VXaWR0aCkge1xuICAgICAgICBzdXBlcihcInBvbHlsaW5lXCIpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBwb2ludHM6IHBvaW50cy5zdHJpbmcsXG4gICAgICAgICAgICBzdHJva2U6IGNvbG9yLFxuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICBcInN0cm9rZS13aWR0aFwiOiBzdHJva2VXaWR0aFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVQb2ludHMocG9pbnRzKSB7XG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBwb2ludHM6IHBvaW50cy5zdHJpbmdcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGF0dGVybiBleHRlbmRzIFRhZyB7XG4gICAgY29uc3RydWN0b3IoaWQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoXCJwYXR0ZXJuXCIpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0cih7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgcGF0dGVyblVuaXRzOiBcInVzZXJTcGFjZU9uVXNlXCIsXG4gICAgICAgICAgICB2aWV3Qm94OiBcIjAgMCBcIit3aWR0aCtcIiBcIitoZWlnaHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2hpbGQoZWwpIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGVsLiRlbCk7XG4gICAgICAgIHJldHVybiBlbDsgLy8gcHJvIGplZG5vZHVzc2kgXCJsZXQgcmVjdCA9IGcuYWRkQ2hpbGQobmV3IFJlY3RhbmdsZSguLi5cIlxuICAgIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gbG9naWMgZnVuY3Rpb25zIHVzZWQgaW4gdGhlIGdhdGUgZXZhbHVhdGlvblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naWMge1xuICAgIHN0YXRpYyBhbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMudGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgW1xuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLnVua25vd25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmYsIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9mZl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUudW5rbm93bl0sXG5cbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgc3RhdGljIG5hbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMubm90KExvZ2ljLmFuZChhLCBiKSk7XG4gICAgfVxuICAgIHN0YXRpYyBub3IoYSwgYikge1xuICAgICAgICByZXR1cm4gTG9naWMubm90KExvZ2ljLm9yKGEsIGIpKTtcbiAgICB9XG4gICAgc3RhdGljIG5vdChhKSB7XG4gICAgICAgIGlmKGEgPT09IExvZ2ljLnN0YXRlLm9uKSB7XG4gICAgICAgICAgICByZXR1cm4gTG9naWMuc3RhdGUub2ZmO1xuICAgICAgICB9IGVsc2UgaWYgKGEgPT09IExvZ2ljLnN0YXRlLm9mZikge1xuICAgICAgICAgICAgcmV0dXJuIExvZ2ljLnN0YXRlLm9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIG9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLnRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIFtcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vbl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLnVua25vd24sIExvZ2ljLnN0YXRlLm9uXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9uXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLnVua25vd25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ11cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHN0YXRpYyB4bm9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLm5vdChMb2dpYy54b3IoYSwgYikpO1xuICAgIH1cbiAgICBzdGF0aWMgeG9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIExvZ2ljLnRlc3RMb2dpY1J1bGVzU3ltbWV0cmljKGEsIGIsIFtcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub24sIExvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub25dLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9uLCBMb2dpYy5zdGF0ZS51bmtub3duLCBMb2dpYy5zdGF0ZS51bmtub3duXSxcbiAgICAgICAgICAgIFtMb2dpYy5zdGF0ZS5vbiwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nXSxcblxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vZmZdLFxuICAgICAgICAgICAgW0xvZ2ljLnN0YXRlLm9mZiwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub2ZmLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZywgTG9naWMuc3RhdGUub3NjaWxsYXRpbmddLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUudW5rbm93bl0sXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUudW5rbm93biwgTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLnVua25vd25dLFxuXG4gICAgICAgICAgICBbTG9naWMuc3RhdGUub3NjaWxsYXRpbmcsIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nLCBMb2dpYy5zdGF0ZS5vc2NpbGxhdGluZ11cbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVua25vd246IDAsXG4gICAgICAgICAgICBvbjogMSxcbiAgICAgICAgICAgIG9mZjogMixcbiAgICAgICAgICAgIG9zY2lsbGF0aW5nOiAzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdGVzdExvZ2ljUnVsZXNTeW1tZXRyaWMoYSwgYiwgcnVsZXMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgcnVsZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZigocnVsZXNbaV1bMF09PT1hICYmIHJ1bGVzW2ldWzFdPT09YikgfHwgKHJ1bGVzW2ldWzBdPT09YiAmJiBydWxlc1tpXVsxXT09PWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ1bGVzW2ldWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCAqIGFzIHN2Z09iaiBmcm9tICcuL3N2Z09iamVjdHMuanMnXG5pbXBvcnQgKiBhcyBTdHJ1Y3R1cmVzIGZyb20gJy4vc3RydWN0dXJlc0FuZENsYXNzZXMuanMnXG5pbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYy5qcydcblxuLy8gbWFwcGluZyBsb2dpY2FsIHN0YXRlcyB0byBjc3MgY2xhc3Nlc1xuY29uc3Qgc3RhdGVDbGFzc2VzID0ge1xuICAgIG9uOiBcInN0YXRlT25cIixcbiAgICBvZmY6IFwic3RhdGVPZmZcIixcbiAgICB1bmtub3duOiBcInN0YXRlVW5rbm93blwiLFxuICAgIG9zY2lsbGF0aW5nOiBcInN0YXRlT3NjaWxsYXRpbmdcIlxufTtcblxuLy8gaGVscGVyIGNsYXNzIHVzZWQgYnkgVHJhbnNmb3JtXG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3Ioc3RyaW5nKSB7XG4gICAgICAgIGlmKHN0cmluZyE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gc3RyaW5nLnJlcGxhY2UoL15bIF0qKFteKF0rKS4qLywgXCIkMVwiKTtcbiAgICAgICAgICAgIHRoaXMuYXJncyA9IHN0cmluZy5yZXBsYWNlKC9eW14oXStcXCgoLiopXFwpLywgXCIkMVwiKS5zcGxpdCgnICcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0QXJndW1lbnRzKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIihcIiArIHRoaXMuYXJncy5qb2luKFwiIFwiKSArIFwiKVwiO1xuICAgIH1cbn1cblxuLy8gdXNlZCB0byBtYW5pcHVsYXRlIHRoZSB0cmFuc2Zvcm0gYXJndW1lbnQgdXNlZCBpbiBTVkdcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZykge1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG5cbiAgICAgICAgaWYoc3RyaW5nIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgc3BsaXRJdGVtcyA9IHN0cmluZy5zcGxpdChcIilcIik7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHNwbGl0SXRlbXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYoc3BsaXRJdGVtc1tpXSkgeyAvLyBpZiBub3QgZW1wdHlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBQcm9wZXJ0eShzcGxpdEl0ZW1zW2ldICsgXCIpXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGluZGV4IG9yIC0xXG4gICAgZ2V0SW5kZXgobmFtZSkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKG5hbWUgPT09IHRoaXMuaXRlbXNbaV0ubmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGdldFRyYW5zbGF0ZSgpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLmdldEFyZ3VtZW50cyh0aGlzLmdldEluZGV4KFwidHJhbnNsYXRlXCIpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogYXJnc1swXSxcbiAgICAgICAgICAgIHk6IGFyZ3NbMV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJvdGF0ZSgpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLmdldEFyZ3VtZW50cyh0aGlzLmdldEluZGV4KFwicm90YXRlXCIpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVnOiBhcmdzWzBdLFxuICAgICAgICAgICAgY2VudHJlWDogYXJnc1sxXSxcbiAgICAgICAgICAgIGNlbnRyZVk6IGFyZ3NbMl1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldHMgdGhlIHRyYW5zbGF0aW9uXG4gICAgc2V0VHJhbnNsYXRlKHgsIHkpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoXCJ0cmFuc2xhdGVcIiwgW3gsIHldKTtcbiAgICB9XG5cbiAgICAvLyBzZXRzIHRoZSByb3RhdGlvblxuICAgIHNldFJvdGF0ZShkZWcsIGNlbnRyZVgsIGNlbnRyZVkpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoXCJyb3RhdGVcIiwgW2RlZywgY2VudHJlWCwgY2VudHJlWV0pO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGUgcm90YXRpb25cbiAgICByb3RhdGVSaWdodChjZW50cmVYLCBjZW50cmVZKSB7XG4gICAgICAgIGlmKHRoaXMuZ2V0SW5kZXgoXCJyb3RhdGVcIik9PT0tMSkge1xuICAgICAgICAgICAgdGhpcy5zZXRSb3RhdGUoOTAsIGNlbnRyZVgsIGNlbnRyZVkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5ld1JvdGF0aW9uID0gKHBhcnNlSW50KHRoaXMuZ2V0Um90YXRlKCkuZGVnKSArIDkwKSAlIDM2MDtcblxuICAgICAgICAgICAgaWYobmV3Um90YXRpb249PT0xODApIHtcbiAgICAgICAgICAgICAgICAvLyBzd2FwIGNlbnRyZSBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgIC8vIGJlY2F1c2Ugcm90YXRlKGMsIHgsIHkpIGlzIGRlZmluZWQgbGlrZSB0cmFuc2Zvcm0oLXgsIC15KSByb3RhdGUoYykgdHJhbnNmb3JtKHgsIHkpXG4gICAgICAgICAgICAgICAgbGV0IGEgPSBjZW50cmVYO1xuICAgICAgICAgICAgICAgIGNlbnRyZVggPSBjZW50cmVZO1xuICAgICAgICAgICAgICAgIGNlbnRyZVkgPSBhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFJvdGF0ZShcbiAgICAgICAgICAgICAgICBuZXdSb3RhdGlvbixcbiAgICAgICAgICAgICAgICBjZW50cmVYLFxuICAgICAgICAgICAgICAgIGNlbnRyZVlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIHRoZSB0cmFuc2Zvcm0gcHJvcGVydGllcyBjb25jYXRlbmF0ZWRcbiAgICBnZXQoKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZihpIT09MCkge1xuICAgICAgICAgICAgICAgIHJldFZhbCArPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldFZhbCArPSB0aGlzLml0ZW1zW2ldLmdldCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfVxuXG4gICAgZ2V0QXJndW1lbnRzKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW2luZGV4XS5hcmdzO1xuICAgIH1cblxuICAgIHNldFBhcmFtZXRlcihuYW1lLCBhcmdzKSB7XG4gICAgICAgIC8vIGRldGVybWluZSBpbmRleCBvZiB0aGUgcGFyYW1ldGVyIChpZiBzZXQpLCBlbHNlIGluZGV4ID09IC0xXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXgobmFtZSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGhhcyBiZWVuIGFscmVhZHkgc2V0LCBjaGFuZ2UgaXQgKHJld3JpdGUgdGhlIGFycmF5IGluIHRoZSByaWdodCBpbmRleClcbiAgICAgICAgLy8gZWxzZSBjcmVhdGUgYSBuZXcgb25lIChzZXQgaW5kZXggdG8gdGhlIGxlbmd0aCBvZiBhbiBhcnJheSAtLT4gYWQgYW4gaXRlbSB0byB0aGUgZW5kKVxuICAgICAgICBpZihpbmRleD09PS0xKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0gPSBuZXcgUHJvcGVydHkoKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLnNldE5hbWUobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzYXZlIGFyZ3MgdW5kZXIgdGhlIHJpZ2h0IGluZGV4XG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLnNldEFyZ3VtZW50cyhhcmdzKTtcbiAgICB9XG59XG5cbi8vIHBhcmVudCBjbGFzcyBmb3IgYWxsIG5ldHdvcmsgZWxlbWVudHNcbmNsYXNzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgaWYoIXBhcmVudFNWRykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlBhcmVudCBTVkcgZWxlbWVudCBoYXMgbm90IGJlZW4gZGVmaW5lZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG5cbiAgICAgICAgLy8gdXNlZCB0byBzdG9yZSB0aGUgc3ZqT2JqZWN0J3MgaW5zdGFuY2Ugb2YgdGhpcyBlbGVtZW50XG4gICAgICAgIHRoaXMuc3ZnT2JqID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqLmlkO1xuICAgIH1cblxuICAgIG9uTW91c2VEb3duKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzLCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBsYXRlciBpbiB0aGUgQm94IGNsYXNzXG4gICAgfVxuXG4gICAgb25Nb3VzZVVwKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzLCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBsYXRlciBpbiB0aGUgQm94IGFuZCBDb25uZWN0b3IgY2xhc3Nlc1xuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlKCkge1xuICAgICAgICAvLyBlbXB0eSBmdW5jdGlvbiB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzLCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBsYXRlciBpbiB0aGUgQm94IGNsYXNzXG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCInanNvbicgZ2V0dGVyIGhhcyBub3QgYmVlbiBkZWZpbmVkIGZvciB0aGlzIGVsZW1lbnRcIiwgdGhpcyk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuXG4vLyBwYXJlbnQgY2xhc3MgZm9yIGlucHV0IGFuZCBvdXRwdXQgY29ubmVjdG9ycyAodGhlIHRoaW5ncyB5b3UgY2xpY2sgb25cbi8vIHdoZW4geW91IHdhbnQgdG8gY29ubmVjdCBlbGVtZW50cylcbmNsYXNzIENvbm5lY3RvciBleHRlbmRzIE5ldHdvcmtFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGdyaWRTaXplLCBsZWZ0LCB0b3ApIHsgLy8gdW5pdCBvZiBsZWZ0IC8gdG9wIGlzIHRoZSBzaXplIG9mIHRoZSBncmlkXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRyk7XG5cbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xuICAgICAgICB0aGlzLmNvbm5lY3RvclNpemUgPSBncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JPZmZzZXQgPSB0aGlzLmNvbm5lY3RvclNpemUgLyAyO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoXG4gICAgICAgICAgICBsZWZ0ICogdGhpcy5ncmlkU2l6ZSAtIHRoaXMuY29ubmVjdG9yT2Zmc2V0LFxuICAgICAgICAgICAgdG9wICogdGhpcy5ncmlkU2l6ZSAtIHRoaXMuY29ubmVjdG9yT2Zmc2V0LFxuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTaXplLFxuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTaXplLFxuICAgICAgICAgICAgXCJub25lXCIsXG4gICAgICAgICAgICBcImJsYWNrXCJcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnN2Z09iai4kZWwuYWRkQ2xhc3MoXCJjb25uZWN0b3JcIik7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBmYWxzZTtcblxuICAgICAgICAvLyBpZiBhIHdpcmUgY2FuIHNldCBjb25uZWN0b3IncyBzdGF0ZVxuICAgICAgICB0aGlzLmlzSW5wdXRDb25uZWN0b3IgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IExvZ2ljLnN0YXRlLnVua25vd247XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcblxuICAgICAgICB0aGlzLndpcmVJZHMgPSBuZXcgU2V0KCk7XG4gICAgfVxuXG4gICAgZ2V0IGlzT3V0cHV0Q29ubmVjdG9yKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNJbnB1dENvbm5lY3RvcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnB1dENvbm5lY3RvcjogMCxcbiAgICAgICAgICAgIG91dHB1dENvbm5lY3RvcjogMVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkV2lyZUlkKHdpcmVJZCkge1xuICAgICAgICB0aGlzLndpcmVJZHMuYWRkKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2lyZUlkKHdpcmVJZCkge1xuICAgICAgICB0aGlzLndpcmVJZHMuZGVsZXRlKHdpcmVJZCk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlcyB0aGUgd2lyZSBhbmQgdXBkYXRlcyB0aGUgY29ubmVjdG9yXG4gICAgcmVtb3ZlV2lyZUlkQW5kVXBkYXRlKHdpcmVJZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVdpcmVJZCh3aXJlSWQpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlLCBwcm9wYWdhdGlvbklkKSB7XG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLnVua25vd246XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vbjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vZmY6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9mZik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlQXR0ciA9IHN0YXRlO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVBdHRyO1xuICAgIH1cblxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqO1xuICAgIH1cblxuICAgIG9uTW91c2VVcCgpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcud2lyZUNyZWF0aW9uSGVscGVyKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dENvbm5lY3RvciBleHRlbmRzIENvbm5lY3RvciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG5cblxuICAgICAgICB0aGlzLnR5cGUgPSBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3RvcjtcbiAgICAgICAgdGhpcy5pc0lucHV0Q29ubmVjdG9yID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBzdXBlci5zZXRTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgbGV0IGdhdGUgPSB0aGlzLnBhcmVudFNWRy5nZXRCb3hCeUNvbm5lY3RvcklkKHRoaXMuc3ZnT2JqLmlkKTtcbiAgICAgICAgZ2F0ZS5yZWZyZXNoU3RhdGUoKTtcbiAgICB9XG5cbiAgICByZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKSB7XG4gICAgICAgIHN1cGVyLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24pO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXRlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dENvbm5lY3RvciBleHRlbmRzIENvbm5lY3RvciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBncmlkU2l6ZSwgbGVmdCwgdG9wKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG5cbiAgICAgICAgLy8gdXNlZCB0byBzZXQgdGhlIHdpcmUgc3RhdGUgZHVyaW5nIHdpcmUgaW5pdGlhbGl6YXRpb24gYmFzZWQgb24gdGhlIG91dHB1dCBjb25uZWN0b3Igc3RhdGVcbiAgICAgICAgdGhpcy5pc091dHB1dCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy50eXBlID0gQ29ubmVjdG9yLnR5cGUub3V0cHV0Q29ubmVjdG9yO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyLnNldFN0YXRlKHN0YXRlKTtcblxuICAgICAgICB0aGlzLndpcmVJZHMuZm9yRWFjaCh3aXJlSWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZ2V0V2lyZUJ5SWQod2lyZUlkKVxuICAgICAgICAgICAgICAgIC5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXRlO1xuICAgIH1cbn1cblxuLy8gcGFyZW50IGNsYXNzIGZvciBnYXRlcyBhbmQgaW5wdXQgYW5kIG91dHB1dCBib3hlc1xuY2xhc3MgQm94IGV4dGVuZHMgTmV0d29ya0VsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRywgbmFtZSwgY2F0ZWdvcnksIGdyaWRXaWR0aCwgZ3JpZEhlaWdodCkge1xuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IHRoaXMucGFyZW50U1ZHLmdyaWRTaXplO1xuXG4gICAgICAgIHRoaXMudXJsID0gXCJpbWcvXCIgKyB0aGlzLmNhdGVnb3J5ICsgXCIvXCIgKyB0aGlzLm5hbWUgKyBcIi5zdmdcIjtcblxuICAgICAgICB0aGlzLmNvbm5lY3RvcnMgPSBbXTtcblxuICAgICAgICB0aGlzLnN2Z09iaiA9IG5ldyBzdmdPYmouR3JvdXAoKTtcblxuICAgICAgICB0aGlzLndpZHRoID0gZ3JpZFdpZHRoICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBncmlkSGVpZ2h0ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmdyaWRXaWR0aCA9IGdyaWRXaWR0aDtcbiAgICAgICAgdGhpcy5ncmlkSGVpZ2h0ID0gZ3JpZEhlaWdodDtcblxuICAgICAgICAvLyB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICAgICAgICBsZXQgcmVjdGFuZ2xlID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIFwibm9uZVwiLCBcIm5vbmVcIik7XG4gICAgICAgIHJlY3RhbmdsZS4kZWwuYWRkQ2xhc3MoJ3JlY3QnKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQocmVjdGFuZ2xlKTtcbiAgICAgICAgLy8gaW1hZ2Ugb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBzdmdPYmouU3ZnSW1hZ2UoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMudXJsKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICAgICAgLy8gYWRkIGRyYWdnYWJpbGl0eSBhbmQgcm90YXRhYmlsaXR5XG4gICAgICAgIHRoaXMuc3ZnT2JqLmRyYWdnYWJsZSh0cnVlKTtcbiAgICAgICAgdGhpcy5zdmdPYmoucm90YXRhYmxlKHRydWUpO1xuXG4gICAgICAgIC8vIGFkZCB0eXBlPVwiZ2F0ZVwiLCB1c2VkIGluIHNwZWNpYWwgY2FsbGJhY2tzIGluIGNvbnRleHRtZW51XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHlwZVwiOiBjYXRlZ29yeX0pO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcImJveFwiKTtcbiAgICAgICAgdGhpcy5zdmdPYmouJGVsLmFkZENsYXNzKGNhdGVnb3J5KTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlQmxvY2tOb2RlcygpO1xuICAgIH1cblxuICAgIGdldCBleHBvcnREYXRhKCkge1xuICAgICAgICBsZXQgY29ubmVjdGlvbnMgPSBbXTtcblxuICAgICAgICAvLyBnbyB0aHJvdWdoIGFsbCBjb25uZWN0b3JzXG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHRoaXMuY29ubmVjdG9ycy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGZvciBhbGwgY29ubmVjdG9yIHRoYXQgaGFzIGF0IGxlYXN0IG9uZSB3aXJlIGNvbm5lY3RlZFxuICAgICAgICAgICAgaWYodGhpcy5jb25uZWN0b3JzW2ldLndpcmVJZHMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBnbyB0aHJvdWdoIGVhY2ggaXRzIHdpcmUgaWRcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbaV0ud2lyZUlkcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGhpc1dpcmVJZDtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZE1hcC5oYXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB3aXJlIGlkIGlzIG5vdCBpbiB0aGUgbWFwLCBhZGQgaXQgYW5kIGFzc2lnbiBuZXcgYXJiaXRyYXJ5IGlkXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuc2V0KGl0ZW0sIHRoaXMucGFyZW50U1ZHLmV4cG9ydFdpcmVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzV2lyZUlkID0gdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTVkcuZXhwb3J0V2lyZUlkKys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGdldCBpZCBmcm9tIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNXaXJlSWQgPSB0aGlzLnBhcmVudFNWRy5leHBvcnRXaXJlSWRNYXAuZ2V0KGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhpcyBjb25uZWN0aW9uIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25zW2Nvbm5lY3Rpb25zLmxlbmd0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuY29ubmVjdG9yc1tpXS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lyZUlkOiB0aGlzV2lyZUlkXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgLy8gaWQ6IHRoaXMuc3ZnT2JqLmlkLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuZ2V0VHJhbnNmb3JtKCksXG4gICAgICAgICAgICBjb25uZWN0aW9uczogY29ubmVjdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMobWFyZ2luVG9wID0gMCwgbWFyZ2luUmlnaHQgPSAwLCBtYXJnaW5Cb3R0b20gPSAwLCBtYXJnaW5MZWZ0ID0gMCwgLi4uc3BlY2lhbE5vZGVzKSB7XG4gICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IobGV0IHggPSBtYXJnaW5MZWZ0IDsgeCA8PSB0aGlzLmdyaWRXaWR0aCAtIG1hcmdpblJpZ2h0IDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IHkgPSBtYXJnaW5Ub3AgOyB5IDw9IHRoaXMuZ3JpZEhlaWdodCAtIG1hcmdpbkJvdHRvbSA7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2Ygc3BlY2lhbE5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5hZGQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uLCByZWRlZmluZWQgaW4gaW5oZXJpdGVkIGVsZW1lbnRzXG4gICAgICAgIC8vIHJlZnJlc2hTdGF0ZSB0YWtlcyBpbnB1dCBjb25uZWN0b3IgdmFsdWVzIGFuZCBzZXRzIG91dHB1dCB2YWx1ZXMgYWNjb3JkaW5nbHlcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ2FsbGluZyB0aGUgdmlydHVhbCBmdW5jdGlvbiByZWZyZXNoU3RhdGUgaGFzIG5vIGVmZmVjdC5cIik7XG4gICAgfVxuXG4gICAgLy8gdXNhZ2U6IGNoYW5nZUltYWdlKFwiYWJjXCIpIGNoYW5nZXMgaW1hZ2UgdXJsIHRvIGltYWdlLWFiYy5zdmdcbiAgICAvLyAgICAgICAgY2hhbmdlSW1hZ2UoKSBjaGFuZ2VzIGltYWdlIHVybCB0byB0aGUgZGVmYXVsdCBvbmUgKGltYWdlLnN2ZylcbiAgICBjaGFuZ2VJbWFnZShzdWZmaXgpIHtcbiAgICAgICAgaWYoc3VmZml4ID09PSB1bmRlZmluZWQgfHwgc3VmZml4ID09PSBcIlwiKSB7XG4gICAgICAgICAgICBzdWZmaXggPSBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VmZml4ID0gXCItXCIgKyBzdWZmaXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cmwgPSBcImltZy9cIiArIHRoaXMuY2F0ZWdvcnkgKyBcIi9cIiArIHRoaXMubmFtZSArIHN1ZmZpeCArIFwiLnN2Z1wiO1xuXG4gICAgICAgIHRoaXMuaW1hZ2UuY2hhbmdlVXJsKHRoaXMudXJsKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGEgalF1ZXJ5IG9iamVjdFxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnT2JqLmdldCgpO1xuICAgIH1cblxuICAgIHJlbW92ZUJsb2NrZWROb2RlKHgsIHkpIHtcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuYmxvY2tlZE5vZGVzKSB7XG4gICAgICAgICAgICBpZihpdGVtLng9PT14ICYmIGl0ZW0ueT09PXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrZWROb2Rlcy5kZWxldGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByb3RhdGVCbG9ja2VkTm9kZXNSaWdodCgpIHtcbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbj09PXVuZGVmaW5lZCB8fCB0aGlzLnJvdGF0aW9uPT09NCkge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3RhdGlvbisrO1xuXG4gICAgICAgIGlmKHRoaXMucm90YXRpb24gPT09IDEgfHwgdGhpcy5yb3RhdGlvbiA9PT0gMykge1xuICAgICAgICAgICAgbGV0IG5ld0Jsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3QmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IE1hdGguYWJzKGl0ZW0ueSAtIHRoaXMuZ3JpZEhlaWdodCksXG4gICAgICAgICAgICAgICAgICAgIHk6IGl0ZW0ueFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmJsb2NrZWROb2RlcyA9IG5ld0Jsb2NrZWROb2RlcztcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMucm90YXRpb24gPT09IDIgfHwgdGhpcy5yb3RhdGlvbiA9PT0gNCkge1xuICAgICAgICAgICAgbGV0IG5ld0Jsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3QmxvY2tlZE5vZGVzLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IE1hdGguYWJzKGl0ZW0ueSAtIHRoaXMuZ3JpZFdpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgeTogaXRlbS54XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tlZE5vZGVzID0gbmV3QmxvY2tlZE5vZGVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ29ubmVjdG9yKGxlZnQsIHRvcCwgY29ubmVjdG9yVHlwZSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmNvbm5lY3RvcnMubGVuZ3RoO1xuICAgICAgICBpZihjb25uZWN0b3JUeXBlPT09Q29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1tpbmRleF0gPSBuZXcgSW5wdXRDb25uZWN0b3IodGhpcy5wYXJlbnRTVkcsIHRoaXMuZ3JpZFNpemUsIGxlZnQsIHRvcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbaW5kZXhdID0gbmV3IE91dHB1dENvbm5lY3Rvcih0aGlzLnBhcmVudFNWRywgdGhpcy5ncmlkU2l6ZSwgbGVmdCwgdG9wKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN2Z09iai5hZGRDaGlsZCh0aGlzLmNvbm5lY3RvcnNbaW5kZXhdLmdldCgpKTtcblxuICAgICAgICB0aGlzLnJlbW92ZUJsb2NrZWROb2RlKGxlZnQsIHRvcCk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyB0aGUgY29ubmVjdG9yIG9iamVjdCBiYXNlZCBvbiBpdHMgaWRcbiAgICBnZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5jb25uZWN0b3JzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5jb25uZWN0b3JzW2ldLmlkPT09Y29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIGNvbm5lY3RvciBub3QgZm91bmQsIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm07XG4gICAgICAgIGlmICghdGhpcy5zdmdPYmouJGVsLmF0dHIoXCJ0cmFuc2Zvcm1cIikpIHtcbiAgICAgICAgICAgIC8vIHRoZSBlbGVtZW50IGRvZXMgbm90IGhhdmUgYSBcInRyYW5zZm9ybVwiIHByb3BlcnR5IC0tPiBjcmVhdGUgaXRcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybS5zZXRUcmFuc2xhdGUoMCwgMCk7XG4gICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInRyYW5zZm9ybVwiOiB0cmFuc2Zvcm0uZ2V0KCl9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoZSBlbGVtZW50IGRvZXMgaGF2ZSBhIFwidHJhbnNmb3JtXCIgcHJvcGVydHkgLS0+IGNoYW5nZSBpdFxuICAgICAgICAgICAgdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSh0aGlzLnN2Z09iai4kZWwuYXR0cihcInRyYW5zZm9ybVwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybTtcbiAgICB9XG5cbiAgICBzZXRUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyYW5zZm9ybS5nZXQoKX0pO1xuICAgIH1cblxuICAgIG9uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubW91c2VMZWZ0ID0gZmFsc2U7XG4gICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTGVmdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VEb3duTGVmdChldmVudCk7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIERPTSBlbGVtZW50IHRvIGZyb250XG4gICAgICAgICAgICB0aGlzLnBhcmVudFNWRy5tb3ZlVG9Gcm9udEJ5SWQodGhpcy5zdmdPYmouaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd25MZWZ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMubW91c2VNb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuXG4gICAgICAgIC8vIHNhdmUgdGhlIGN1cnJlbnQgaXRlbSBwb3NpdGlvbiBpbnRvIGEgdmFyaWFibGVcbiAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IHRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoKTtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgbW91c2Ugb2Zmc2V0IGZyb20gdGhlIG9iamVjdCBvcmlnaW5cbiAgICAgICAgdGhpcy5vZmZzZXQgPSB7XG4gICAgICAgICAgICB4OiBldmVudC5wYWdlWCAtIGN1cnJlbnRQb3NpdGlvbi54LFxuICAgICAgICAgICAgeTogZXZlbnQucGFnZVkgLSBjdXJyZW50UG9zaXRpb24ueVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMubW91c2VMZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBsZXQgbGVmdCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5vZmZzZXQueDtcbiAgICAgICAgICAgIGxldCB0b3AgPSBldmVudC5wYWdlWSAtIHRoaXMub2Zmc2V0Lnk7XG5cbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZShsZWZ0LCB0b3ApO1xuXG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdpcmVzKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZVVwKGV2ZW50KSB7XG4gICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxKSB7XG4gICAgICAgICAgICBpZih0aGlzLm1vdXNlTW92ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRHJvcChldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSAyICkge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrTWlkZGxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyb3AoZXZlbnQpIHtcbiAgICAgICAgbGV0IGxlZnQgPSBldmVudC5wYWdlWCAtIHRoaXMub2Zmc2V0Lng7XG4gICAgICAgIGxldCB0b3AgPSBldmVudC5wYWdlWSAtIHRoaXMub2Zmc2V0Lnk7XG5cbiAgICAgICAgbGVmdCA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQobGVmdCk7XG4gICAgICAgIHRvcCA9IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodG9wKTtcblxuICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICAgICAgdHJhbnNmb3JtLnNldFRyYW5zbGF0ZShsZWZ0LCB0b3ApO1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVXaXJlcygpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIC8vIGVtcHR5IGZ1bmN0aW9uLCB3aWxsIGJlIHJlZGVmaW5lZCBpbiBJbnB1dEJveFxuICAgIH1cblxuICAgIG9uQ2xpY2tNaWRkbGUoKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5zdmdPYmouJGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGxldCBjZW50cmVYID0gTWF0aC5yb3VuZChyZWN0LndpZHRoIC8gMik7XG4gICAgICAgIGxldCBjZW50cmVZID0gTWF0aC5yb3VuZChyZWN0LmhlaWdodCAvIDIpO1xuXG4gICAgICAgIGNlbnRyZVggLT0gY2VudHJlWCAlIHRoaXMuZ3JpZFNpemU7XG4gICAgICAgIGNlbnRyZVkgLT0gY2VudHJlWSAlIHRoaXMuZ3JpZFNpemU7XG5cbiAgICAgICAgdHJhbnNmb3JtLnJvdGF0ZVJpZ2h0KFxuICAgICAgICAgICAgY2VudHJlWCxcbiAgICAgICAgICAgIGNlbnRyZVlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnN2Z09iai5hZGRBdHRyKHtcInRyYW5zZm9ybVwiOiB0cmFuc2Zvcm0uZ2V0KCl9KTtcblxuICAgICAgICB0aGlzLnJvdGF0ZUJsb2NrZWROb2Rlc1JpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVXaXJlcygpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZXMgYWxsIHdpcmVzIGNvbm5lY3RlZCB0byB0aGlzIGJveFxuICAgIHVwZGF0ZVdpcmVzKHRlbXBvcmFyeSA9IGZhbHNlKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5jb25uZWN0b3JzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzW2ldLndpcmVJZHMuZm9yRWFjaCh3aXJlSWQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB3aXJlID0gdGhpcy5wYXJlbnRTVkcuZ2V0V2lyZUJ5SWQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBpZih0ZW1wb3JhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS50ZW1wb3JhcnlXaXJlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2lyZS5yb3V0ZVdpcmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0Qm94IGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIGlzT24gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDc7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG5cbiAgICAgICAgc3VwZXIocGFyZW50U1ZHLCBcImlucHV0XCIsIFwiaW9cIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5hZGRDb25uZWN0b3Iod2lkdGgsIGhlaWdodCAvIDIsIENvbm5lY3Rvci50eXBlLm91dHB1dENvbm5lY3Rvcik7XG5cbiAgICAgICAgdGhpcy5vbiA9IGlzT247XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIGxldCBkYXRhID0gc3VwZXIuZXhwb3J0RGF0YTtcbiAgICAgICAgZGF0YS5pc09uID0gdGhpcy5pc09uO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAxLCAxLCAwKTtcbiAgICB9XG5cbiAgICByZWZyZXNoU3RhdGUoKSB7XG4gICAgICAgIC8vIGNhbGwgdGhlIG9uIHNldHRlciBhZ2FpbiAodG8gcmVmcmVzaCB0aGUgc3RhdGUgb2YgdGhlIGNvbm5lY3RlZCB3aXJlcylcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcuc3RhcnROZXdTaW11bGF0aW9uKHRoaXMuY29ubmVjdG9yc1swXSwgdGhpcy5jb25uZWN0b3JzWzBdLnN0YXRlKVxuICAgIH1cblxuICAgIHNldCBvbihpc09uKSB7XG4gICAgICAgIGlmIChpc09uKSB7XG4gICAgICAgICAgICAvLyB0dXJuIG9uXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKFwib25cIik7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMuc3RhdGUub24pO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU3RhdGUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdHVybiBvZmZcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5zdGF0ZS5vZmYpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU3RhdGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc09uID0gaXNPbjtcbiAgICB9XG5cbiAgICBnZXQgb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzT247XG4gICAgfVxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgdGhpcy5vbiA9ICF0aGlzLm9uO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dEJveCBleHRlbmRzIEJveCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gNTtcblxuICAgICAgICBzdXBlcihwYXJlbnRTVkcsIFwib3V0cHV0XCIsIFwiaW9cIiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gMiwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuICAgIH1cblxuICAgIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmNvbm5lY3RvcnNbMF0uc3RhdGUpO1xuICAgIH1cblxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub246XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9uXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMb2dpYy5zdGF0ZS5vZmY6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZShcIm9mZlwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9zY2lsbGF0aW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UoXCJvc2NcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJsb2NrTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAwLCAwLCAxKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYXRlIGV4dGVuZHMgQm94IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcsIG5hbWUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA5O1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA0O1xuXG4gICAgICAgIHN1cGVyKHBhcmVudFNWRywgbmFtZSwgXCJnYXRlXCIsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIC8vIG91dHB1dFxuICAgICAgICB0aGlzLmFkZENvbm5lY3Rvcih3aWR0aCwgaGVpZ2h0IC8gMiwgQ29ubmVjdG9yLnR5cGUub3V0cHV0Q29ubmVjdG9yKTtcblxuICAgICAgICBpZih0aGlzLm5hbWU9PT1cIm5vdFwiKSB7XG4gICAgICAgICAgICAvLyBpbnB1dFxuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0b3IoMCwgaGVpZ2h0IC8gMiwgQ29ubmVjdG9yLnR5cGUuaW5wdXRDb25uZWN0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaW5wdXRcbiAgICAgICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKDAsIGhlaWdodCAvIDQsIENvbm5lY3Rvci50eXBlLmlucHV0Q29ubmVjdG9yKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29ubmVjdG9yKDAsIGhlaWdodCAvICg0LzMpLCBDb25uZWN0b3IudHlwZS5pbnB1dENvbm5lY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIGFkZCBvbmUgYmxvY2tlZE5vZGUgYmV0d2VlbiB0aGUgaW5wdXRzIChmb3IgYmV0dGVyIGxvb2tpbmcgd2lyaW5nKVxuICAgICAgICAgICAgLy8gYW5kIHJlZ2VuZXJhdGUgYmxvY2tlZCBub2Rlc1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUJsb2NrTm9kZXMoe1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogaGVpZ2h0IC8gMlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hTdGF0ZSgpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlQmxvY2tOb2RlcyhzcGVjaWFsTm9kZSkge1xuICAgICAgICBpZihzcGVjaWFsTm9kZSE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3VwZXIuZ2VuZXJhdGVCbG9ja05vZGVzKDAsIDEsIDAsIDEsIHNwZWNpYWxOb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyLmdlbmVyYXRlQmxvY2tOb2RlcygwLCAxLCAwLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJhbmRcIjpcblxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5hbmQodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJuYW5kXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLm5hbmQodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub3JcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMubm9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibm90XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLm5vdCh0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInhub3JcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMueG5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy54b3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBzd2l0Y2ggKHRoaXMubmFtZSkge1xuICAgICAgICAvLyAgICAgY2FzZSBcImFuZFwiOlxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5hbmQodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgIGNhc2UgXCJuYW5kXCI6XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLm5hbmQodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgIGNhc2UgXCJub3JcIjpcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMubm9yKHRoaXMuY29ubmVjdG9yc1sxXS5zdGF0ZSwgdGhpcy5jb25uZWN0b3JzWzJdLnN0YXRlKSk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgICBjYXNlIFwibm90XCI6XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jb25uZWN0b3JzWzBdLnNldFN0YXRlKExvZ2ljLm5vdCh0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUpKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgIGNhc2UgXCJvclwiOlxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSkpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICAgY2FzZSBcInhub3JcIjpcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNvbm5lY3RvcnNbMF0uc2V0U3RhdGUoTG9naWMueG5vcih0aGlzLmNvbm5lY3RvcnNbMV0uc3RhdGUsIHRoaXMuY29ubmVjdG9yc1syXS5zdGF0ZSkpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICAgY2FzZSBcInhvclwiOlxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY29ubmVjdG9yc1swXS5zZXRTdGF0ZShMb2dpYy54b3IodGhpcy5jb25uZWN0b3JzWzFdLnN0YXRlLCB0aGlzLmNvbm5lY3RvcnNbMl0uc3RhdGUpKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdpcmUgZXh0ZW5kcyBOZXR3b3JrRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBmcm9tSWQsIHRvSWQsIGdyaWRTaXplKSB7XG4gICAgICAgIC8vIHNtYWxsIHRvZG86IHJld29yayBzdGFydC4uLiBlbmQuLi4gdG8gYXJyYXlzPyAobm90IGltcG9ydGFudClcblxuICAgICAgICBzdXBlcihwYXJlbnRTVkcpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmZyb21JZCA9IGZyb21JZDtcbiAgICAgICAgdGhpcy50b0lkID0gdG9JZDtcblxuICAgICAgICB0aGlzLnN0YXJ0Qm94ID0gdGhpcy5wYXJlbnRTVkcuZ2V0Qm94QnlDb25uZWN0b3JJZChmcm9tSWQpO1xuICAgICAgICB0aGlzLmVuZEJveCA9IHRoaXMucGFyZW50U1ZHLmdldEJveEJ5Q29ubmVjdG9ySWQodG9JZCk7XG5cbiAgICAgICAgdGhpcy5ib3hlcyA9IFt0aGlzLnN0YXJ0Qm94LCB0aGlzLmVuZEJveF1cblxuICAgICAgICB0aGlzLnN0YXJ0Q29ubmVjdG9yID0gdGhpcy5wYXJlbnRTVkcuZ2V0Q29ubmVjdG9yQnlJZChmcm9tSWQpO1xuICAgICAgICB0aGlzLmVuZENvbm5lY3RvciA9IHRoaXMucGFyZW50U1ZHLmdldENvbm5lY3RvckJ5SWQodG9JZCk7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0b3JzID0gW3RoaXMuc3RhcnRDb25uZWN0b3IsIHRoaXMuZW5kQ29ubmVjdG9yXVxuXG4gICAgICAgIHRoaXMucm91dGVXaXJlKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUF0dHIgPSBMb2dpYy5zdGF0ZS51bmtub3duO1xuXG4gICAgICAgIGZvciAobGV0IGNvbm5lY3RvciBvZiB0aGlzLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgICAgIGlmKGNvbm5lY3Rvci5pc091dHB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoY29ubmVjdG9yLnN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnT2JqLiRlbC5hZGRDbGFzcyhcIndpcmVcIik7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcm9tSWQ6IHRoaXMuZnJvbUlkLFxuICAgICAgICAgICAgdG9JZDogdGhpcy50b0lkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdmdPYmoucmVtb3ZlQ2xhc3NlcyhzdGF0ZUNsYXNzZXMub24sIHN0YXRlQ2xhc3Nlcy5vZmYsIHN0YXRlQ2xhc3Nlcy51bmtub3duLCBzdGF0ZUNsYXNzZXMub3NjaWxsYXRpbmcpO1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUudW5rbm93bjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMudW5rbm93bik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9uOlxuICAgICAgICAgICAgICAgIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy5vbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExvZ2ljLnN0YXRlLm9mZjpcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z09iai5hZGRDbGFzcyhzdGF0ZUNsYXNzZXMub2ZmKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naWMuc3RhdGUub3NjaWxsYXRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0Q29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb25uZWN0b3Iuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZW5kQ29ubmVjdG9yLmlzSW5wdXRDb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kQ29ubmVjdG9yLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGVBdHRyID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUF0dHI7XG4gICAgfVxuXG4gICAgdXBkYXRlV2lyZVN0YXRlKCkge1xuICAgICAgICB0aGlzLnN0YXJ0Qm94LnJlZnJlc2hTdGF0ZSgpO1xuICAgICAgICB0aGlzLmVuZEJveC5yZWZyZXNoU3RhdGUoKTtcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iai5nZXQoKTtcbiAgICB9XG5cbiAgICBnZXRUZW1wb3JhcnlXaXJlUG9pbnRzKCkge1xuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpO1xuICAgICAgICBwb2ludHMuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCh0aGlzLndpcmVTdGFydC54LCB0aGlzLndpcmVTdGFydC55KSk7XG4gICAgICAgIHBvaW50cy5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMud2lyZUVuZC54LCB0aGlzLndpcmVFbmQueSkpO1xuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIHRlbXBvcmFyeVdpcmUoKSB7XG4gICAgICAgIHRoaXMud2lyZVN0YXJ0ID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLnN0YXJ0Q29ubmVjdG9yLCBmYWxzZSk7XG4gICAgICAgIHRoaXMud2lyZUVuZCA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy5lbmRDb25uZWN0b3IsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLnNldFdpcmVQYXRoKHRoaXMuZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cygpKTtcblxuICAgICAgICAvLyB0aGlzLnN2Z09iai5yZW1vdmVDbGFzc2VzKHN0YXRlQ2xhc3Nlcy5vbiwgc3RhdGVDbGFzc2VzLm9mZiwgc3RhdGVDbGFzc2VzLnVua25vd24sIHN0YXRlQ2xhc3Nlcy5vc2NpbGxhdGluZyk7XG4gICAgICAgIC8vIHRoaXMuc3ZnT2JqLmFkZENsYXNzKHN0YXRlQ2xhc3Nlcy51bmtub3duKTtcbiAgICB9XG5cbiAgICByb3V0ZVdpcmUoc25hcFRvR3JpZCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy53aXJlU3RhcnQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuc3RhcnRDb25uZWN0b3IsIHNuYXBUb0dyaWQpO1xuICAgICAgICB0aGlzLndpcmVFbmQgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMuZW5kQ29ubmVjdG9yLCBzbmFwVG9HcmlkKTtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IHRoaXMuYVN0YXIoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlU3RhcnQueCAvIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgeTogdGhpcy53aXJlU3RhcnQueSAvIHRoaXMuZ3JpZFNpemVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy53aXJlRW5kLnggLyB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMud2lyZUVuZC55IC8gdGhpcy5ncmlkU2l6ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRXaXJlUGF0aCh0aGlzLnBvaW50cyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVXaXJlU3RhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRXaXJlUGF0aChwb2ludHMpIHtcbiAgICAgICAgLy8gc2V0IHRoZSBsaW5lXG4gICAgICAgIGlmKHRoaXMuc3ZnT2JqIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN2Z09iai51cGRhdGVQb2ludHMocG9pbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnT2JqID0gbmV3IHN2Z09iai5Qb2x5TGluZShwb2ludHMsIFwiIzhiOGI4YlwiLCAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3ZnT2JqLnJlbW92ZUNsYXNzZXMoc3RhdGVDbGFzc2VzLm9uLCBzdGF0ZUNsYXNzZXMub2ZmLCBzdGF0ZUNsYXNzZXMudW5rbm93biwgc3RhdGVDbGFzc2VzLm9zY2lsbGF0aW5nKTtcbiAgICAgICAgdGhpcy5zdmdPYmouYWRkQ2xhc3Moc3RhdGVDbGFzc2VzLnVua25vd24pO1xuXG4gICAgICAgIHRoaXMuc3ZnT2JqLmFkZEF0dHIoe1xuICAgICAgICAgICAgZnJvbUlkOiB0aGlzLmZyb21JZCxcbiAgICAgICAgICAgIHRvSWQ6IHRoaXMudG9JZFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLy8gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gdGhpcyBwc2V1ZG9jb2RlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BKl9zZWFyY2hfYWxnb3JpdGhtI1BzZXVkb2NvZGVcbiAgICBhU3RhcihzdGFydCwgZW5kKSB7XG4gICAgICAgIC8vIG51bWJlciBvZiBub2RlcywgdGhhdCBjYW4gYmUgb3BlbmVkIGF0IG9uY2VcbiAgICAgICAgLy8gb25jZSBpcyB0aGlzIGxpbWl0IGV4Y2VlZGVkLCBhU3RhciB3aWxsIGZhaWwgYW5kIGdldFRlbXBvcmFyeVdpcmVQb2ludHMgd2lsbCBiZSB1c2VkIGluc3RlYWRcbiAgICAgICAgY29uc3QgbWF4Tm9kZUxpbWl0ID0gNTAwMDA7XG5cbiAgICAgICAgbGV0IGNsb3NlZE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBsZXQgb3Blbk5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICBvcGVuTm9kZXMuYWRkKHN0YXJ0KTtcblxuICAgICAgICBsZXQgY2FtZUZyb20gPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB2YWx1ZTogaW5maW5pdHlcbiAgICAgICAgbGV0IGdTY29yZSA9IG5ldyBTdHJ1Y3R1cmVzLk1hcFdpdGhEZWZhdWx0VmFsdWUoSW5maW5pdHkpO1xuICAgICAgICBnU2NvcmUuc2V0KHN0YXJ0LCAwKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHZhbHVlOiBpbmZpbml0eVxuICAgICAgICBsZXQgZlNjb3JlID0gbmV3IFN0cnVjdHVyZXMuTWFwV2l0aERlZmF1bHRWYWx1ZShJbmZpbml0eSk7XG4gICAgICAgIGZTY29yZS5zZXQoc3RhcnQsIFdpcmUubWFuaGF0dGFuRGlzdGFuY2Uoc3RhcnQsIGVuZCkpO1xuXG4gICAgICAgIGxldCBub25Sb3V0YWJsZSA9IHRoaXMucGFyZW50U1ZHLmdldE5vblJvdXRhYmxlTm9kZXMoKTtcbiAgICAgICAgbGV0IHB1bmlzaGVkQnV0Um91dGFibGU7XG4gICAgICAgIGlmKHRoaXMuc3ZnT2JqPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwdW5pc2hlZEJ1dFJvdXRhYmxlID0gdGhpcy5wYXJlbnRTVkcuZ2V0SW5jb252ZW5pZW50Tm9kZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB1bmlzaGVkQnV0Um91dGFibGUgPSB0aGlzLnBhcmVudFNWRy5nZXRJbmNvbnZlbmllbnROb2Rlcyh0aGlzLnN2Z09iai5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAob3Blbk5vZGVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGU7XG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGVGU2NvcmU7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHZhbHVlIGZyb20gb3Blbk5vZGVzIHRoYXQgaGFzIHRoZSBsb3dlc3QgZlNjb3JlXG4gICAgICAgICAgICAvLyAoY2FuIGJlIGltcGxlbWVudGVkIGVmZmVjdGl2ZWx5IHVzaW5nIG1pbi1oZWFwIGRhdGEgc3RydWN0dXJlIChtYXliZSB0b2RvIHNvbWV0aW1lKT8pXG4gICAgICAgICAgICBvcGVuTm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBpZighY3VycmVudE5vZGUgfHwgZlNjb3JlLmdldChub2RlKSA8IGN1cnJlbnROb2RlRlNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGVGU2NvcmUgPSBmU2NvcmUuZ2V0KGN1cnJlbnROb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZihzdmdPYmouUG9seWxpbmVQb2ludC5lcXVhbHMoY3VycmVudE5vZGUsIGVuZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWNvbnN0cnVjdFBhdGgoY2FtZUZyb20sIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3Blbk5vZGVzLmRlbGV0ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICBjbG9zZWROb2Rlcy5hZGQoY3VycmVudE5vZGUpO1xuXG4gICAgICAgICAgICAvLyB0aGUgZmFydGhlc3QgcG9pbnRzIGFjY2Vzc2libGUgd2l0aG91dCBhdm9pZGluZyBvYnN0YWNsZXMgaW4gZXZlcnkgZGlyZWN0aW9uXG4gICAgICAgICAgICAvLyAoYnV0IG1heCA1MCBpbiBlYWNoIGRpcmVjdGlvbilcbiAgICAgICAgICAgIGZvcihsZXQgZGlyZWN0aW9uID0gMCA7IGRpcmVjdGlvbiA8IDQgOyBkaXJlY3Rpb24rKykge1xuICAgICAgICAgICAgICAgIGxldCBuZXdQb2ludCA9IFdpcmUubW92ZVBvaW50KGN1cnJlbnROb2RlLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgNTAgOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmV3UG9pbnQgaXMgaW4gdGhlIHNldCBvZiBub24gcm91dGFibGUgcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBhZGQgaXQgYW5kIHN0b3AgcHJvY2VlZGluZyBpbiB0aGlzIGRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICBpZihXaXJlLnNldEhhc1RoaXNQb2ludChub25Sb3V0YWJsZSwgdGhpcy5zY2FsZVBvaW50VG9HcmlkKG5ld1BvaW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2tpcCB0aGlzIG5vZGUsIGlmIGl0IGhhcyBiZWVuIGFscmVhZHkgY2xvc2VkXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIGlmIGl0IGlzIG9uIHRoZSBsaXN0IG9mIG5vbiByb3V0YWJsZSBub2Rlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VkTm9kZXMuaGFzKG5ld1BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZW5Ob2Rlcy5oYXMobmV3UG9pbnQpLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5Ob2Rlcy5hZGQobmV3UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHBvc3NpYmxlIEdTY29yZSBieSBhZGRpbmcgMSB0byB0aGUgc2NvcmUgb2YgdGhlIG5vZGUgd2UgY2FtZSBmcm9tXG4gICAgICAgICAgICAgICAgICAgIC8vICh3ZSBwcmlvcml0aXplIHRvIG1pbmltaXplIHRoZSBudW1iZXIgb2Ygbm9kZXMgYW5kIG5vdCB0aGUgZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIC8vICBzbyB3ZSBhcmUgYWRkaW5nIDEgb24gYWxsIG5vZGVzLCBldmVuIGlmIHRoZSBldWNsaWRlYW4gLyBtYW5uaGF0YW4gZGlzdGFuY2UgbWF5IHZhcnkpXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmNyZW1lbnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZihpIT09MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zc2libGVHU2NvcmUgPSBnU2NvcmUuZ2V0KGN1cnJlbnROb2RlKSArIGluY3JlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICBpZihXaXJlLnNldEhhc1RoaXNQb2ludChwdW5pc2hlZEJ1dFJvdXRhYmxlLCB0aGlzLnNjYWxlUG9pbnRUb0dyaWQobmV3UG9pbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIG5vZGUgaXMgaW4gdGhlIHNldCBvZiBwdW5pc2hlZCBub2RlLCBwdW5pc2ggaXQgYnkgYWRkaW5nIHRvIHRoZSBHU2NvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3NpYmxlR1Njb3JlICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zc2libGVHU2NvcmUgPj0gZ1Njb3JlLmdldChuZXdQb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2FtZUZyb20uc2V0KG5ld1BvaW50LCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGdTY29yZS5zZXQobmV3UG9pbnQsIHBvc3NpYmxlR1Njb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgZlNjb3JlLnNldChuZXdQb2ludCwgcG9zc2libGVHU2NvcmUgKyBXaXJlLm1hbmhhdHRhbkRpc3RhbmNlKG5ld1BvaW50LCBlbmQpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuZXdQb2ludCBpcyBpbiB0aGUgc2V0IG9mIHB1bmlzaGVkIGJ1dCByb3V0YWJsZSBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBpdCBidXQgc3RvcCBwcm9jZWVkaW5nIGluIHRoaXMgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKFdpcmUuc2V0SGFzVGhpc1BvaW50KHB1bmlzaGVkQnV0Um91dGFibGUsIHRoaXMuc2NhbGVQb2ludFRvR3JpZChuZXdQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgdG8gdGhlIG5leHQgcG9pbnQgaW4gdGhlIGRpcmVjaXRvblxuICAgICAgICAgICAgICAgICAgICBuZXdQb2ludCA9IFdpcmUubW92ZVBvaW50KG5ld1BvaW50LCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYob3Blbk5vZGVzLnNpemUgPiBtYXhOb2RlTGltaXQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB3ZSBnb3QgaGVyZSwgdGhlIHBhdGggZG9lcyBub3QgZXhpc3QgLT4gbGV0J3MgdXNlIHRlbXBvcmFyeSBwYXRoIGlnbm9yaW5nIGFsbCBjb2xpc2lvbnNcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGVtcG9yYXJ5V2lyZVBvaW50cygpO1xuICAgIH1cbiAgICBzdGF0aWMgbW92ZVBvaW50KHBvaW50LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMDogLy8gdXBcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICB5OiBwb2ludC55IC0gMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIDE6IC8vIHJpZ2h0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCArIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAyOiAvLyBkb3duXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueSArIDFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAzOiAvLyBsZWZ0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCAtIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHNjYWxlUG9pbnRUb0dyaWQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHBvaW50LnggKiB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgeTogcG9pbnQueSAqIHRoaXMuZ3JpZFNpemVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY29uc3RydWN0UGF0aChjYW1lRnJvbSwgY3VycmVudE5vZGUpIHtcbiAgICAgICAgbGV0IHRvdGFsUGF0aCA9IG5ldyBzdmdPYmouUG9seWxpbmVQb2ludHMoKTtcbiAgICAgICAgdG90YWxQYXRoLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQoY3VycmVudE5vZGUueCAqIHRoaXMuZ3JpZFNpemUsIGN1cnJlbnROb2RlLnkgKiB0aGlzLmdyaWRTaXplKSk7XG5cbiAgICAgICAgd2hpbGUgKGNhbWVGcm9tLmhhcyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY2FtZUZyb20uZ2V0KGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgIHRvdGFsUGF0aC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KGN1cnJlbnROb2RlLnggKiB0aGlzLmdyaWRTaXplLCBjdXJyZW50Tm9kZS55ICogdGhpcy5ncmlkU2l6ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsUGF0aDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbWFuaGF0dGFuRGlzdGFuY2UoYSwgYikge1xuICAgICAgICAvLyBNYW5oYXR0YW4gZ2VvbWV0cnlcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGEueCAtIGIueCkgKyBNYXRoLmFicyhhLnkgLSBiLnkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRIYXNUaGlzUG9pbnQoc2V0LCBwb2ludCkge1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHNldCkge1xuICAgICAgICAgICAgaWYoaXRlbS54ID09PSBwb2ludC54ICYmIGl0ZW0ueSA9PT0gcG9pbnQueSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRDb29yZGluYXRlcyhjb25uZWN0b3IsIHNuYXBUb0dyaWQgPSB0cnVlKSB7XG4gICAgICAgIC8vIGNvbm5lY3Rvci5zdmdPYmouaWQgaGFzIHRvIGJlIGNhbGxlZCwgZWxzZSB0aGUgZ2V0Q29vcmRpbmF0ZXMgZG9lcyBub3Qgd29yayBvbiB0aGUgZmlyc3QgY2FsbCBpbiBGaXJlZm94IDU1XG4gICAgICAgIGxldCBkdW1teSA9IGNvbm5lY3Rvci5zdmdPYmouaWQ7XG5cbiAgICAgICAgbGV0ICRjb25uZWN0b3IgPSBjb25uZWN0b3Iuc3ZnT2JqLiRlbDtcblxuICAgICAgICBsZXQgcG9zaXRpb24gPSAkY29ubmVjdG9yLnBvc2l0aW9uKCk7XG4gICAgICAgIGxldCB3aWR0aCA9ICRjb25uZWN0b3IuYXR0cihcIndpZHRoXCIpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gJGNvbm5lY3Rvci5hdHRyKFwiaGVpZ2h0XCIpO1xuXG4gICAgICAgIGxldCB4ID0gcG9zaXRpb24ubGVmdCArIHdpZHRoIC8gMjtcbiAgICAgICAgbGV0IHkgPSBwb3NpdGlvbi50b3AgKyBoZWlnaHQgLyAyO1xuICAgICAgICBpZihzbmFwVG9HcmlkKSB7XG4gICAgICAgICAgICB4ID0gdGhpcy5wYXJlbnRTVkcuc25hcFRvR3JpZCh4KTtcbiAgICAgICAgICAgIHkgPSB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5XG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIENvbnRleHRNZW51SXRlbSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgdHlwZSwgY29udGV4dE1lbnUsIHBhcmVudFNWRywgY2xpY2tGdW5jdGlvbikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gY29udGV4dE1lbnU7XG4gICAgICAgIHRoaXMucGFyZW50U1ZHID0gcGFyZW50U1ZHO1xuXG4gICAgICAgIHRoaXMuJGVsID0gJChcIjxsaT5cIik7XG4gICAgICAgICQodGhpcy4kZWwpXG4gICAgICAgICAgICAudGV4dChuYW1lKVxuICAgICAgICAgICAgLmF0dHIoXCJ0eXBlXCIsIHR5cGUpO1xuXG4gICAgICAgIGlmKGNsaWNrRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICQodGhpcy4kZWwpLmNsaWNrKFxuICAgICAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tGdW5jdGlvbihldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2xhc3MoY2xzKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKGNscyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFwcGVuZEl0ZW0oaXRlbSkge1xuICAgICAgICBpZighdGhpcy5zdWJMaXN0KSB7XG4gICAgICAgICAgICB0aGlzLnN1Ykxpc3QgPSAkKFwiPHVsPlwiKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLnN1Ykxpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdWJMaXN0LmFwcGVuZChpdGVtLmpRdWVyeSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZ2V0IGpRdWVyeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsO1xuICAgIH1cbn1cbmNsYXNzIEdhdGVNZW51SXRlbSBleHRlbmRzIENvbnRleHRNZW51SXRlbSB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgY29udGV4dE1lbnUsIHBhcmVudFNWRykge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHR5cGUsIC8vIG5hbWUgaXMgdGhlIHR5cGVcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBjb250ZXh0TWVudSxcbiAgICAgICAgICAgIHBhcmVudFNWRyxcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQoY29udGV4dE1lbnUucG9zaXRpb24ueCAvIHBhcmVudFNWRy5ncmlkU2l6ZSkgKiBwYXJlbnRTVkcuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChjb250ZXh0TWVudS5wb3NpdGlvbi55IC8gcGFyZW50U1ZHLmdyaWRTaXplKSAqIHBhcmVudFNWRy5ncmlkU2l6ZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBwYXJlbnRTVkcubmV3R2F0ZShcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ubGVmdCwgLy8geCBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnRvcCAvLyB5IGNvb3JkaW5hdGVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dE1lbnUge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWRztcblxuICAgICAgICBjb25zdCBnYXRlcyA9IFtcIm5vdFwiLCBcImFuZFwiLCBcIm9yXCIsIFwibmFuZFwiLCBcIm5vclwiLCBcInhvclwiLCBcInhub3JcIl07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IDAsIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRlbCA9ICQoXCI8dWw+XCIpO1xuICAgICAgICB0aGlzLiRlbC5hdHRyKCdpZCcsICdjb250ZXh0TWVudScpO1xuXG4gICAgICAgIGxldCBnYXRlTGlzdCA9IG5ldyBDb250ZXh0TWVudUl0ZW0oXCJOZXcgZ2F0ZVwiLCAnJywgdGhpcywgcGFyZW50U1ZHKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgZ2F0ZXMubGVuZ3RoIDsgKytpKSB7XG4gICAgICAgICAgICBnYXRlTGlzdC5hcHBlbmRJdGVtKFxuICAgICAgICAgICAgICAgIG5ldyBHYXRlTWVudUl0ZW0oZ2F0ZXNbaV0sIHRoaXMsIHBhcmVudFNWRylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBlbmRJdGVtKGdhdGVMaXN0KTtcblxuICAgICAgICB0aGlzLmFwcGVuZEl0ZW0oXG4gICAgICAgICAgICBuZXcgQ29udGV4dE1lbnVJdGVtKFwiSW5wdXQgYm94XCIsICcnLCB0aGlzLCBwYXJlbnRTVkcsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLnBhcmVudFNWRy5zbmFwVG9HcmlkKHRoaXMucG9zaXRpb24ueCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi55KVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFNWRy5uZXdJbnB1dChwb3NpdGlvbi5sZWZ0LCBwb3NpdGlvbi50b3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFwcGVuZEl0ZW0obmV3IENvbnRleHRNZW51SXRlbShcIk91dHB1dCBib3hcIiwgJycsIHRoaXMsIHBhcmVudFNWRywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi54KSxcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMucGFyZW50U1ZHLnNuYXBUb0dyaWQodGhpcy5wb3NpdGlvbi55KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGFyZW50U1ZHLm5ld091dHB1dChwb3NpdGlvbi5sZWZ0LCBwb3NpdGlvbi50b3ApO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRDb25kaXRpb25hbEl0ZW0oJ2JveCcsICdSZW1vdmUgdGhpcyBpdGVtJywgaWQgPT4ge3RoaXMucGFyZW50U1ZHLnJlbW92ZUJveChpZCl9KTtcbiAgICAgICAgdGhpcy5hcHBlbmRDb25kaXRpb25hbEl0ZW0oJ3dpcmUnLCAnUmVtb3ZlIHRoaXMgd2lyZScsIGlkID0+IHt0aGlzLnBhcmVudFNWRy5yZW1vdmVXaXJlQnlJZChpZCl9KTtcblxuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5iZWZvcmUodGhpcy4kZWwpO1xuICAgIH1cblxuICAgIGFwcGVuZEl0ZW0oaXRlbSkge1xuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoaXRlbS5qUXVlcnkpO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmRzIGFuIGNvbm5kaXRpb25hbCBpdGVtICh0aGF0IGlzIHNob3duIG9ubHkgaWYgdGhlIHRhcmdldFxuICAgIC8vIGhhcyB0aGUgY2xhc3MgaXRlbUNsYXNzKVxuICAgIC8vIGNsaWNrRnVuY3Rpb24gdGFrZXMgb25lIGFyZ3VtZW50OiBJRCBvZiB0aGUgdGFyZ2V0XG4gICAgYXBwZW5kQ29uZGl0aW9uYWxJdGVtKGl0ZW1DbGFzcywgdGV4dCwgY2xpY2tGdW5jdGlvbikge1xuICAgICAgICBpZighdGhpcy5jb25kaXRpb25hbEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsSXRlbXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtc1t0aGlzLmNvbmRpdGlvbmFsSXRlbXMubGVuZ3RoXSA9IHtcbiAgICAgICAgICAgIGl0ZW1DbGFzczogaXRlbUNsYXNzLFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGNsaWNrRnVuY3Rpb246IGNsaWNrRnVuY3Rpb25cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlY2lkZXMgd2hldGhlciBvciBub3QgdG8gZGlzcGxheSBzcGVjaWZpYyBjb25kaXRpb25hbCBpdGVtc1xuICAgIHJlc29sdmVDb25kaXRpb25hbEl0ZW1zKCR0YXJnZXQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZGl0aW9uYWxJdGVtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYoJHRhcmdldC5oYXNDbGFzcyh0aGlzLmNvbmRpdGlvbmFsSXRlbXNbaV0uaXRlbUNsYXNzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kSXRlbShcbiAgICAgICAgICAgICAgICAgICAgbmV3IENvbnRleHRNZW51SXRlbShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxJdGVtc1tpXS50ZXh0LCAnJywgdGhpcywgdGhpcy5wYXJlbnRTVkcsXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEl0ZW1zW2ldLmNsaWNrRnVuY3Rpb24oJHRhcmdldC5hdHRyKCdpZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkuYWRkQ2xhc3MoJ2NvbmRpdGlvbmFsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBoaWRlcyBhbGwgY29uZGl0aW9uYWwgaXRlbXNcbiAgICBoaWRlQWxsQ29uZGl0aW9uYWxJdGVtcygpIHtcbiAgICAgICAgdGhpcy4kZWwuY2hpbGRyZW4oJy5jb25kaXRpb25hbCcpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8vIGRpc3BsYXlzIHRoZSBjb250ZXh0IG1lbnUgd2l0aCB0aGUgcmlnaHQgc2V0IG9mIGNvbmRpdGlvbmFsIGl0ZW1zXG4gICAgZGlzcGxheSh4LCB5LCAkdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJGVsLmNzcyh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgdG9wOiB5ICsgXCJweFwiLFxuICAgICAgICAgICAgbGVmdDogeCArIFwicHhcIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlc29sdmVDb25kaXRpb25hbEl0ZW1zKCR0YXJnZXQpO1xuICAgIH1cblxuICAgIC8vIGhpZGVzIHRoZSBjb250ZXh0IG1lbnVcbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLiRlbC5jc3Moe2Rpc3BsYXk6ICdub25lJ30pO1xuICAgICAgICB0aGlzLmhpZGVBbGxDb25kaXRpb25hbEl0ZW1zKCk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBleHBvcnROZXR3b3JrIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRTVkcpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTVkcgPSBwYXJlbnRTVkc7XG4gICAgfVxuXG4gICAgZ2V0IGV4cG9ydERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNWRy5leHBvcnREYXRhO1xuICAgIH1cblxuICAgIGpzb24oc3R5bGUgPSBleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3QsIGRhdGFVcmkgPSBmYWxzZSkge1xuICAgICAgICBpZihkYXRhVXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2RhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04LCdcbiAgICAgICAgICAgICAgICArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmpzb24oc3R5bGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGV4cG9ydE5ldHdvcmsuc3R5bGUuY29tcGFjdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSk7XG4gICAgICAgICAgICAgICAgY2FzZSBleHBvcnROZXR3b3JrLnN0eWxlLnByZXR0eTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZXhwb3J0RGF0YSwgbnVsbCwgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJldHR5OiAwLFxuICAgICAgICAgICAgY29tcGFjdDogMVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIGltcG9ydE5ldHdvayB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHLCBzdHJpbmcpIHtcbiAgICAgICAgcGFyZW50U1ZHLmltcG9ydERhdGEoXG4gICAgICAgICAgICBKU09OLnBhcnNlKHN0cmluZylcbiAgICAgICAgKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge2V4cG9ydE5ldHdvcmssIGltcG9ydE5ldHdva30gZnJvbSBcIi4vaW1wb3J0RXhwb3J0LmpzXCI7XG5cbmNsYXNzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNpZmljVGFnKSB7XG4gICAgICAgIGlmKCFzcGVjaWZpY1RhZykge1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoXCI8XCIgKyBzcGVjaWZpY1RhZyArIFwiPlwiKVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBjb25zdCBtb3VzZUljb24gPVxuLy8gICAgIFwiPHN2ZyBjbGFzcz1cXFwibW91c2VJY29uXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIGhlaWdodD1cXFwiMTIxLjc3MTMxbW1cXFwiIHdpZHRoPVxcXCI4Mi4zMjc1ODNtbVxcXCIgdmVyc2lvbj1cXFwiMS4xXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjkxLjcxMTkxIDQzMS40NzMxNFxcXCI+XCIgK1xuLy8gICAgIFwiPGcgdHJhbnNmb3JtPVxcXCJ0cmFuc2xhdGUoLTIwMi43MDkwOCwtMjYwLjkyMzIpXFxcIj5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBkPVxcXCJtMjAyLjgxMTA4IDQ0My41MDY2N2MtMC4xMjU3IDExLjA1NjgzIDAuMDY1MSAxMi4xMjkxNSAwLjA1MjggMjMuMDkzNzUgMS4wNDA0IDM5LjI5MTY1LTQuMDMyODEgNzkuNTg0MiA4LjgxNDQxIDExNy41NjgzNiAxNy41MjYwMiA1OC4wMDc0MiA3MC43NjEyIDEwNy4wNzc5MyAxMzMuMTI5MDcgMTA4LjExNzE5IDYwLjgwNDQ4IDIuNjEyNDcgMTE1LjgwNjM4LTQxLjQ4OTEyIDEzNi42NTI0OS05Ni45MzU1NSAxNS4yMTk0Mi0zNC43MDU2MSAxMi43NDQ3LTcyLjgyNjM4IDEyLjgzNC0xMDkuNzIyNjYtMC40MDM1Ni0xNy4yNDkwNSAwLjI3NDUyLTI0LjczMjkgMC4wODc5LTQyLjEyMTA5aC0yOTEuNTcwNjZ6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImxlZnRcXFwiIGQ9XFxcIm0zMzUuNjc3ODggMjYwLjkzMDMyYy01OC42NTI1IDAuNjU1NjYtOTkuNjMxOSA0My41MTM4Ni0xMjAuMDgyMSA5Ni45OTIxOS0xMC41NTA1IDI0LjA2MDEyLTEyLjU5MzUgNDEuNzc3OTctMTIuODg2NyA2Ny41ODIwM2gxMzUuNzgzMnYtMTY0LjU3MjI2Yy0wLjAwNiAwLjAwMDA4LTAuMDExNy0wLjAwMDA4LTAuMDE3NiAwLTAuOTM0Ny0wLjAxMS0xLjg2NTgtMC4wMTI0LTIuNzk2OC0wLjAwMnpcXFwiLz5cXG5cIiArXG4vLyAgICAgXCIgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwicmlnaHRcXFwiIGQ9XFxcIm0zNjEuNDY3ODcgMjYwLjkyOTkzYy0wLjk0MjA3LTAuMDEtMS44ODY0LTAuMDA5LTIuODMyMDMgMC4wMDR2MTY0LjU3MjI2aDEzNS43ODUxNmMtMC4yNjI1Ny0yNC40Njk0OC0yLjI1MjEtNDAuNzQ4MjMtMTEuNTAzOTEtNjMuOTAyNDMtMTkuMzQ3MDktNTUuMDMyMjUtNjEuNzMwNDMtMTAwLjA0NTI1LTEyMS40NDkyMi0xMDAuNjczODN6XFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcIm1pZGRsZVxcXCIgZD1cXFwibTM0OC41NjUwNCAyOTQuOTMzNjVjMTUuMDM3MTQgMCAyNy4xNDI4NiAxMi4xMDU3MiAyNy4xNDI4NiAyNy4xNDI4NnY0MGMwIDE1LjAzNzE0LTEyLjEwNTcyIDI3LjE0Mjg2LTI3LjE0Mjg2IDI3LjE0Mjg2cy0yNy4xNDI4Ni0xMi4xMDU3Mi0yNy4xNDI4Ni0yNy4xNDI4NnYtNDBjMC0xNS4wMzcxNCAxMi4xMDU3Mi0yNy4xNDI4NiAyNy4xNDI4Ni0yNy4xNDI4NnpcXFwiIHN0cm9rZT1cXFwiI2ZmZlxcXCIgc3Ryb2tlLWxpbmVjYXA9XFxcInJvdW5kXFxcIiBzdHJva2Utd2lkdGg9XFxcIjIwXFxcIi8+XFxuXCIgK1xuLy8gICAgIFwiICAgICAgICA8L2c+XCIgK1xuLy8gICAgIFwiPC9zdmc+XCI7XG5cbmNsYXNzIGhlbHBXaW5kb3dJdGVtIGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IodGV4dCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKFwiaGVscFdpbmRvd0l0ZW1cIik7XG4gICAgICAgIHRoaXMuJGVsLmh0bWwodGV4dCk7XG4gICAgfVxufVxuXG5jbGFzcyBoZWxwV2luZG93IGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy4kZWwuYXR0cihcImlkXCIsIFwiaGVscFwiKTtcblxuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCI8c3Ryb25nPm1haW4gbWVudTwvc3Ryb25nPjogcmlnaHQgY2xpY2tcIikpO1xuICAgICAgICB0aGlzLmFwcGVuZChuZXcgaGVscFdpbmRvd0l0ZW0oXCJkcmFnIGFuZCBkcm9wIHRvIDxzdHJvbmc+bW92ZSBlbGVtZW50czwvc3Ryb25nPlwiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+bWlkZGxlIGNsaWNrPC9zdHJvbmc+IHRvIHJvdGF0ZSBlbGVtZW50c1wiKSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5ldyBoZWxwV2luZG93SXRlbShcIjxzdHJvbmc+Y2xpY2sgPGltZyBzcmM9J2ltZy9ndWkvaGVscC5zdmcnIGNsYXNzPSdoZWxwaWNvbicgYWx0PSdoZWxwIGljb24nPjwvc3Ryb25nPiB0byBkaXNwbGF5IGRvY3VtZW50YXRpb24gKGluIGN6ZWNoKVwiKSk7XG4gICAgfVxuXG4gICAgYXBwZW5kKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kKGl0ZW0uJGVsKTtcbiAgICB9XG59XG5cblxuY2xhc3MgZmxvYXRpbmdNZW51SXRlbSBleHRlbmRzIGpxdWVyeUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNpZmljQ2xhc3MsIGljb24sIHRpdGxlLCBzcGVjaWZpY1RhZykge1xuICAgICAgICBzdXBlcihzcGVjaWZpY1RhZyk7XG5cbiAgICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoXCJidXR0b25cIik7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKHNwZWNpZmljQ2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChcbiAgICAgICAgICAgICQoXCI8aW1nPlwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwic3JjXCIsIFwiaW1nL2d1aS9cIiArIGljb24gKyBcIi5zdmdcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImFsdFwiLCB0aXRsZSlcbiAgICAgICAgICAgICAgICAuYXR0cihcInRpdGxlXCIsIHRpdGxlKVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZmxvYXRpbmdNZW51IGV4dGVuZHMganF1ZXJ5RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50U1ZHKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgY29uc3QgaWQgPSAnZmxvYXRpbmdNZW51JztcblxuICAgICAgICB0aGlzLiRlbC5hdHRyKFwiaWRcIiwgaWQpO1xuXG4gICAgICAgIC8qIElNUE9SVCAqL1xuXG4gICAgICAgIC8vIGhlcmUgd2lsbCBiZSB0aGUgaW5zdGFuY2Ugb2YgTGl0eSBzdG9yZWRcbiAgICAgICAgLy8gKHdlIG5lZWQgdG8gc3RvcmUgaXQsIGJlY2F1c2UgdGhlIFwiaW1wb3J0XCIgYnV0dG9uIGFsc28gY2xvc2VzIExpdHkpXG4gICAgICAgIGxldCBsaXR5SW5zdGFuY2VJbXBvcnQ7XG5cbiAgICAgICAgbGV0IGltcG9ydEJ1dHRvbiA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiaW1wb3J0XCIsIFwiaW1wb3J0XCIsIFwiSW1wb3J0IGEgbmV0d29ya1wiLCBcImFcIik7XG4gICAgICAgIGltcG9ydEJ1dHRvbi4kZWwub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgJHBvcHVwID0gJChcIjxkaXY+XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0RXhwb3J0XCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiaW1wb3J0XCIpO1xuXG4gICAgICAgICAgICBsZXQgdGV4dGFyZWFJZCA9IFwiaW1wb3J0SlNPTlwiO1xuXG4gICAgICAgICAgICAkcG9wdXAuYXBwZW5kKFxuICAgICAgICAgICAgICAgICQoXCI8dGV4dGFyZWE+PC90ZXh0YXJlYT5cIikuYXR0cignaWQnLCB0ZXh0YXJlYUlkKVxuICAgICAgICAgICAgKS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwidXBsb2FkXCJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCI8aW1nPlwiKS5hdHRyKCdzcmMnLCBcImltZy9ndWkvaW1wb3J0LnN2Z1wiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXCIgaW1wb3J0IGZyb20gSlNPTlwiKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0ZXh0YXJlYSA9ICQoJyMnK3RleHRhcmVhSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGV4dGFyZWEgY29udGVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbXBvcnRTdHJpbmcgPSAkdGV4dGFyZWEudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIExpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpdHlJbnN0YW5jZUltcG9ydC5jbG9zZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9jY2VzcyB0aGUgaW1wb3J0ZWQgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IGltcG9ydE5ldHdvayhwYXJlbnRTVkcsIGltcG9ydFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsaXR5SW5zdGFuY2VJbXBvcnQgPSBsaXR5KCRwb3B1cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKGltcG9ydEJ1dHRvbik7XG5cbiAgICAgICAgLyogRVhQT1JUICovXG5cbiAgICAgICAgbGV0IGV4cG9ydEJ1dHRvbiA9IG5ldyBmbG9hdGluZ01lbnVJdGVtKFwiZXhwb3J0XCIsIFwiZXhwb3J0XCIsIFwiRXhwb3J0IHRoaXMgbmV0d29ya1wiLCBcImFcIik7XG4gICAgICAgIGV4cG9ydEJ1dHRvbi4kZWwub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBleHBvcnROZXR3b3JrKHBhcmVudFNWRyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgcG9wdXAgY29udGFpbmVyIGhvbGRpbmcgYWxsIHBvcHVwIGNvbnRlbnQgKHRoYXQgd2lsbCBiZSBwYXNzZWQgdG8gbGl0eSlcbiAgICAgICAgICAgIGxldCAkcG9wdXAgPSAkKFwiPGRpdj5cIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJpbXBvcnRFeHBvcnRcIilcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJleHBvcnRcIik7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBibG9jayB3aXRoIGNvZGUgdG8gYmUgZGlzcGxheWVkIGFuZCBhcHBlbmQgaXQgdG8gdGhlIHBvcHVwIGVsZW1lbnRcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxwcmU+XCIpLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxjb2RlPlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBsaW5rc1xuICAgICAgICAgICAgJHBvcHVwLmFwcGVuZChcbiAgICAgICAgICAgICAgICAkKFwiPGE+XCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogZGF0YS5qc29uKGV4cG9ydE5ldHdvcmsuc3R5bGUucHJldHR5LCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgXCJjbGFzc1wiOiBcImRvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG93bmxvYWRcIjogXCJuZXR3b3JrLmpzb25cIlxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9leHBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgKS5hcHBlbmQoXCIgZXhwYW5kZWQgSlNPTlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICRwb3B1cC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcIjxhPlwiKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGRhdGEuanNvbihleHBvcnROZXR3b3JrLnN0eWxlLmNvbXBhY3QsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6IFwiZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkb3dubG9hZFwiOiBcIm5ldHdvcmsubWluLmpzb25cIlxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgJChcIjxpbWc+XCIpLmF0dHIoJ3NyYycsIFwiaW1nL2d1aS9leHBvcnQuc3ZnXCIpXG4gICAgICAgICAgICAgICAgKS5hcHBlbmQoXCIgY29tcGFjdCBKU09OXCIpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsaXR5KCRwb3B1cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kKGV4cG9ydEJ1dHRvbik7XG5cbiAgICAgICAgLyogSEVMUCAqL1xuXG4gICAgICAgIGxldCBoZWxwID0gbmV3IGZsb2F0aW5nTWVudUl0ZW0oXCJoZWxwXCIsIFwiaGVscFwiLCBcIkRpc3BsYXkgaGVscFwiLCBcImFcIik7XG4gICAgICAgIGhlbHAuJGVsLm9uKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgICAgICQoXCIjaGVscFwiKS5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgJChcIiNoZWxwXCIpLnJlbW92ZUNsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaGVscC4kZWwuYXR0cih7XG4gICAgICAgICAgICAnaHJlZic6ICcuL2RvY3MvJyxcbiAgICAgICAgICAgICdkYXRhLWxpdHknOiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVscCk7XG5cbiAgICAgICAgcGFyZW50U1ZHLiRzdmcuYWZ0ZXIodGhpcy4kZWwpO1xuICAgICAgICBwYXJlbnRTVkcuJHN2Zy5hZnRlcihuZXcgaGVscFdpbmRvdygpLiRlbCk7XG4gICAgfVxuXG4gICAgYXBwZW5kKG1lbnVJdGVtKSB7XG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZChtZW51SXRlbS4kZWwpO1xuICAgIH1cbn1cbiIsImltcG9ydCBMb2dpYyBmcm9tIFwiLi9sb2dpYy5qc1wiXG5cbmNsYXNzIHN0YXRlQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25uZWN0b3JJZCwgc3RhdGUsIHdhdmUpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JJZCA9IGNvbm5lY3RvcklkXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZVxuICAgIH1cbn1cblxuLy8gYWxsIGNvbm5lY3RvcnMgbWVudGlvbmVkIGhlcmUgYXJlIE9VVFBVVCBDT05ORUNUT1JTXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW11bGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudFNWRykge1xuICAgICAgICB0aGlzLnBhcmVudFNWRyA9IHBhcmVudFNWR1xuXG4gICAgICAgIC8vIG1hcHMgZWFjaCBhZmZlY3RlZCBvdXRwdXQgY29ubmVjdG9yIHRvIGl0J3MgZGlyZWN0bHkgcHJlY2VlZGluZyBvdXRwdXQgY29ubmVjdG9yc1xuICAgICAgICB0aGlzLnByZWRlY2Vzc29ycyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvLyBtYXBzIHdhdmVJZCAtPiBhcnJheSBvZiBvdXRwdXRDb25uZWN0b3JzIGFmZmVjdGVkXG4gICAgICAgIHRoaXMud2F2ZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgdGhpcy53YXZlID0gMFxuICAgIH1cblxuICAgIHJ1bigpIHtcbiAgICAgICAgd2hpbGUodGhpcy53YXZlcy5oYXModGhpcy53YXZlKSkge1xuICAgICAgICAgICAgc3RlcCgpXG4gICAgICAgICAgICB0aGlzLndhdmUrK1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RlcCgpIHtcbiAgICAgICAgZm9yIChsZXQgc3RhdGVJbmZvIG9mIHRoaXMud2F2ZXMuZ2V0KHRoaXMud2F2ZSkpIHtcbiAgICAgICAgICAgIC8qICBwcm9jZXNzIGFsbCBvdXRwdXRDb25uZWN0b3JzIGJ5IHNldHRpbmcgdGhlaXIgc3RhdGVcbiAgICAgICAgICAgICAgICB0aGlzIHdpbGwgdHJpZ2dlciBhIGZvbGxvd2luZyBldmVudCBjaGFpbjpcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0Q29ubmVjdG9yIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgLT4gYWxsIGNvbm5lY3RlZCB3aXJlcyBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgLT4gYWxsIGlucHV0Q29ubmVjdG9ycyBjb25uZWN0ZWQgdG8gdGhlc2Ugd2lyZXMgY2hhbmdlXG4gICAgICAgICAgICAgICAgICAgIC0+IGFsbCBlbGVtZW50cyB0aGF0IGNvbnRhaW4gdGhlc2UgaW5wdXRDb25uZWN0b3JzIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAtPiB0aGVzZSBlbGVtZW50cyBjb21wdXRlIHRoZSBuZXcgc3RhdGUgb2YgdGhlaXIgb3V0cHV0IGNvbm5lY3RvcnMgYW5kIGNhbGwgbm90aWZ5Q2hhbmdlKClcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25uZWN0b3IgPSB0aGlzLnBhcmVudFNWRy5nZXRDb25uZWN0b3JCeUlkKHN0YXRlSW5mby5jb25uZWN0b3JJZClcbiAgICAgICAgICAgIGNvbm5lY3Rvci5zZXRTdGF0ZShzdGF0ZUluZm8uc3RhdGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBub3RpZnlDaGFuZ2UoY29ubmVjdG9ySWQsIHN0YXRlKSB7XG4gICAgICAgIGxldCB3YXZlSWQgPSB0aGlzLndhdmUgKyAxXG5cbiAgICAgICAgaWYoIXRoaXMud2F2ZXMuaGFzKHdhdmVJZCkpIHtcbiAgICAgICAgICAgIHRoaXMud2F2ZXMuc2V0KHdhdmVJZCwgW10pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndhdmVzLmdldCh3YXZlSWQpLnB1c2gobmV3IHN0YXRlQ2hhbmdlKGNvbm5lY3RvcklkLCBzdGF0ZSkpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgKiBhcyBzdmdPYmogZnJvbSAnLi9zdmdPYmplY3RzLmpzJ1xuaW1wb3J0ICogYXMgZWRpdG9yRWxlbWVudHMgZnJvbSAnLi9lZGl0b3JFbGVtZW50cy5qcydcbmltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljLmpzJ1xuaW1wb3J0IENvbnRleHRNZW51IGZyb20gJy4vY29udGV4dE1lbnUuanMnXG5pbXBvcnQgRmxvYXRpbmdNZW51IGZyb20gJy4vZmxvYXRpbmdNZW51LmpzJ1xuaW1wb3J0IFNpbXVsYXRvciBmcm9tICcuL2xvZ2ljU2ltdWxhdG9yLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdmcge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JpZFNpemUpIHtcbiAgICAgICAgdGhpcy4kc3ZnID0gJChjYW52YXMpO1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuICAgICAgICB0aGlzLmJveGVzID0gW107IC8vIHN0b3JlcyBhbGwgYm94ZXNcbiAgICAgICAgdGhpcy53aXJlcyA9IFtdOyAvLyBzdG9yZXMgYWxsIHdpcmVzXG5cbiAgICAgICAgdGhpcy5zaW11bGF0b3IgPSBuZXcgU2ltdWxhdG9yKHRoaXMpXG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkZWZzIGVsZW1lbnQsIHVzZWQgZm9yIHBhdHRlcm5zXG4gICAgICAgIHRoaXMuJGRlZnMgPSAkKFwiPGRlZnM+XCIpO1xuICAgICAgICB0aGlzLiRzdmcucHJlcGVuZCh0aGlzLiRkZWZzKTtcblxuICAgICAgICAvLyBCQUNLR1JPVU5EIFBBVFRFUk5cbiAgICAgICAgbGV0IHBhdHRlcm4gPSBuZXcgc3ZnT2JqLlBhdHRlcm4oXCJncmlkXCIsIHRoaXMuZ3JpZFNpemUsIHRoaXMuZ3JpZFNpemUpO1xuXG4gICAgICAgIGxldCBwYXR0ZXJuUG9pbnRzID0gbmV3IHN2Z09iai5Qb2x5bGluZVBvaW50cygpXG4gICAgICAgICAgICAuYXBwZW5kKG5ldyBzdmdPYmouUG9seWxpbmVQb2ludCgwLCAwKSlcbiAgICAgICAgICAgIC5hcHBlbmQobmV3IHN2Z09iai5Qb2x5bGluZVBvaW50KHRoaXMuZ3JpZFNpemUsIDApKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgc3ZnT2JqLlBvbHlsaW5lUG9pbnQodGhpcy5ncmlkU2l6ZSwgdGhpcy5ncmlkU2l6ZSkpO1xuXG4gICAgICAgIHBhdHRlcm4uYWRkQ2hpbGQobmV3IHN2Z09iai5Qb2x5TGluZShwYXR0ZXJuUG9pbnRzLCBcIiNhM2E0ZDJcIiwgMikpO1xuICAgICAgICB0aGlzLmFkZFBhdHRlcm4ocGF0dGVybi5nZXQoKSk7XG5cbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IHN2Z09iai5SZWN0YW5nbGUoMCwgMCwgXCIxMDAlXCIsIFwiMTAwJVwiLCBcInVybCgjZ3JpZClcIiwgXCJub25lXCIpO1xuICAgICAgICB0aGlzLmFwcGVuZEpRdWVyeU9iamVjdCh0aGlzLmJhY2tncm91bmQuZ2V0KCkpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICAvLyBDT05TVFJVQ1QgQ09OVEVYVCBNRU5VXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUgPSBuZXcgQ29udGV4dE1lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQ09OU1RSVUNUIEZMT0FUSU5HIE1FTlVcbiAgICAgICAgLy8gdGhpcy5mbG9hdGluZ01lbnUgPSBuZXcgRmxvYXRpbmdNZW51KHRoaXMpO1xuICAgICAgICB0aGlzLmZsb2F0aW5nTWVudSA9IG5ldyBGbG9hdGluZ01lbnUodGhpcyk7XG5cbiAgICAgICAgLy8gQUxMIEVWRU5UIENBTExCQUNLU1xuICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICB0aGlzLiRzdmcub24oJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0UmVhbFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VEb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5oaWRlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpZih0YXJnZXQhPT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb3VzZU1vdmUoZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KS5vbignbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYodGFyZ2V0IT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW91c2VVcChldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLm9uKFwiY29udGV4dG1lbnVcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q29udGV4dE1lbnUoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZLCB0aGlzLmdldFJlYWxKUXVlcnlUYXJnZXQoZXZlbnQudGFyZ2V0KSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgZXhwb3J0RGF0YSgpIHtcbiAgICAgICAgdGhpcy5leHBvcnRXaXJlSWRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZXhwb3J0V2lyZUlkID0gMDtcblxuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIC8vIHRvZG8gaW1wbGVtZW50IGdyaWRTaXplIHNjYWxpbmdcbiAgICAgICAgICAgIC8vIGdyaWRTaXplOiB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgYm94ZXM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGRhdGEuYm94ZXNbaV0gPSB0aGlzLmJveGVzW2ldLmV4cG9ydERhdGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpbXBvcnREYXRhKGRhdGEpIHtcbiAgICAgICAgLy8gdG9kbyBpbXBsZW1lbnQgZ3JpZFNpemUgc2NhbGluZ1xuXG4gICAgICAgIC8vIGxpc3Qgb2Ygd2lyZXMgdG8gYmUgYWRkZWRcbiAgICAgICAgbGV0IG5ld1dpcmVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgZGF0YS5ib3hlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgLy8gYWRkIGJveFxuICAgICAgICAgICAgbGV0IGJveDtcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ib3hlc1tpXS5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJnYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuZXcgZ2F0ZSAod2l0aG91dCByZWxvYWRpbmcgdGhlIFNWRywgd2Ugd2lsbCByZWxvYWQgaXQgb25jZSBhZnRlciB0aGUgaW1wb3J0KVxuICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld0dhdGUoZGF0YS5ib3hlc1tpXS5uYW1lLCAwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpb1wiOlxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBpbnB1dCAod2l0aG91dCByZWxvYWRpbmcgdGhlIFNWRywgd2Ugd2lsbCByZWxvYWQgaXQgb25jZSBhZnRlciB0aGUgaW1wb3J0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveCA9IHRoaXMubmV3SW5wdXQoMCwgMCwgZGF0YS5ib3hlc1tpXS5pc09uLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwib3V0cHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG5ldyBvdXRwdXQgKHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBTVkcsIHdlIHdpbGwgcmVsb2FkIGl0IG9uY2UgYWZ0ZXIgdGhlIGltcG9ydClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3ggPSB0aGlzLm5ld091dHB1dCgwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIGlvIGJveCBuYW1lICdcIitkYXRhLmJveGVzW2ldLm5hbWUrXCInLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBib3ggY2F0ZWdvcnkgJ1wiK2RhdGEuYm94ZXNbaV0uY2F0ZWdvcnkrXCInLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJveCkge1xuICAgICAgICAgICAgICAgIC8vIHByb2NjZXNzIGJveCB0cmFuc2Zvcm1zICh0cmFuc2xhdGlvbiBhbmQgcm90YXRpb24pXG4gICAgICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IG5ldyBlZGl0b3JFbGVtZW50cy5UcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwIDsgaiA8IGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zLmxlbmd0aCA7ICsraikge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYm94ZXNbaV0udHJhbnNmb3JtLml0ZW1zW2pdLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFuc2xhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc2V0VHJhbnNsYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyb3RhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc2V0Um90YXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5hcmdzWzJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gdHJhbnNmb3JtIHByb3BlcnR5ICdcIitkYXRhLmJveGVzW2ldLnRyYW5zZm9ybS5pdGVtc1tqXS5uYW1lK1wiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBib3guc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgYWxsIHdpcmVzIHRvIHRoZSBsaXN0IG9mIHdpcmVzIHRvIGJlIGFkZGVkXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMCA7IGogPCBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zLmxlbmd0aCA7ICsraikge1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGFydGlmaWNpYWwgd2lyZSBpZFxuICAgICAgICAgICAgICAgICAgICBsZXQgd2lyZUlkID0gZGF0YS5ib3hlc1tpXS5jb25uZWN0aW9uc1tqXS53aXJlSWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcGFzcyB0aGUgdmFsdWVzIGdvdCBmcm9tIGpzb24gaW50byBhIHZhcmlhYmxlIHRoYXQgd2lsbCBiZSBhZGRlZCBpbnRvIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGRhdGEuYm94ZXNbaV0uY29ubmVjdGlvbnNbal0uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBkYXRhLmJveGVzW2ldLmNvbm5lY3Rpb25zW2pdLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3hJZDogYm94LmlkXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSB2YWx1ZSB0byB0aGUgbWFwXG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld1dpcmVzLmhhcyh3aXJlSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhbHJlYWR5IGlzIGEgd2lyZSB3aXRoIHRoaXMgaWQgaW4gdGhlIG1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgdmFsdWUgdG8gdGhlIGVuZCBvZiB0aGUgYXJyYXkgb2YgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFwVmFsdWUgPSBuZXdXaXJlcy5nZXQod2lyZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcFZhbHVlLmxlbmd0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1dpcmVzLnNldCh3aXJlSWQsIG1hcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHdpcmUgd2l0aCB0aGlzIGlkIGluIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgd2lyZSBhbmQgc2V0IHRoZSB2YWx1ZSB0byBiZSB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1dpcmVzLnNldCh3aXJlSWQsIFt2YWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgU1ZHIGRvY3VtZW50IChuZWVkZWQgZm9yIHdpcmluZylcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgLy8gd2l0aCBhbGwgYm94ZXMgYWRkZWQsIHdlIGNhbiBub3cgY29ubmVjdCB0aGVtIHdpdGggd2lyZXNcbiAgICAgICAgbmV3V2lyZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3JJZHMgPSBbXTtcbiAgICAgICAgICAgIGlmKGl0ZW1bMF0gJiYgaXRlbVsxXSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDE7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gdGhpcy5nZXRCb3hCeUlkKGl0ZW1baV0uYm94SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rvcklkc1tpXSA9IGJveC5jb25uZWN0b3JzW2l0ZW1baV0uaW5kZXhdLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmV3V2lyZShjb25uZWN0b3JJZHNbMF0sIGNvbm5lY3Rvcklkc1sxXSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZWZyZXNoIHRoZSBTVkcgZG9jdW1lbnRcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgd2lyZUNyZWF0aW9uSGVscGVyKGNvbm5lY3RvcklkKSB7XG4gICAgICAgIGlmKCF0aGlzLmZpcnN0Q29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDb25uZWN0b3JJZCA9IGNvbm5lY3RvcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXdXaXJlKHRoaXMuZmlyc3RDb25uZWN0b3JJZCwgY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgdGhpcy5maXJzdENvbm5lY3RvcklkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnROZXdTaW11bGF0aW9uKHN0YXJ0aW5nQ29ubmVjdG9yLCBzdGF0ZSkge1xuICAgICAgICB0aGlzLnNpbXVsYXRvciA9IG5ldyBTaW11bGF0b3JcbiAgICAgICAgdGhpcy5zaW11bGF0b3Iubm90aWZ5Q2hhbmdlKHN0YXJ0aW5nQ29ubmVjdG9yLCBzdGF0ZSlcbiAgICAgICAgdGhpcy5zaW11bGF0b3IucnVuKClcbiAgICB9XG5cbiAgICBuZXdHYXRlKG5hbWUsIHgsIHksIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld0JveCh4LCB5LCBuZXcgZWRpdG9yRWxlbWVudHMuR2F0ZSh0aGlzLCBuYW1lLCB4LCB5KSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgbmV3SW5wdXQoeCwgeSwgaXNPbiA9IGZhbHNlLCByZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdCb3goeCwgeSwgbmV3IGVkaXRvckVsZW1lbnRzLklucHV0Qm94KHRoaXMsIGlzT24pLCByZWZyZXNoKTtcbiAgICB9XG5cbiAgICBuZXdPdXRwdXQoeCwgeSwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3Qm94KHgsIHksIG5ldyBlZGl0b3JFbGVtZW50cy5PdXRwdXRCb3godGhpcyksIHJlZnJlc2gpO1xuICAgIH1cblxuICAgIG5ld0JveCh4LCB5LCBvYmplY3QsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuYm94ZXMubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuYm94ZXNbaW5kZXhdID0gb2JqZWN0O1xuXG4gICAgICAgIC8vIHRyYW5zbGF0ZSB0aGUgZ2F0ZSBpZiB4IGFuZCB5IGhhcyBiZWVuIHNwZWNpZmllZFxuICAgICAgICBpZih4ICYmIHkpIHtcbiAgICAgICAgICAgIGxldCB0ciA9IG5ldyBlZGl0b3JFbGVtZW50cy5UcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRyLnNldFRyYW5zbGF0ZSh4LCB5KTtcblxuICAgICAgICAgICAgdGhpcy5ib3hlc1tpbmRleF0uc3ZnT2JqLmFkZEF0dHIoe1widHJhbnNmb3JtXCI6IHRyLmdldCgpfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGVuZEVsZW1lbnQodGhpcy5ib3hlc1tpbmRleF0sIHJlZnJlc2gpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmJveGVzW2luZGV4XTtcbiAgICB9XG5cbiAgICByZW1vdmVCb3goZ2F0ZUlkKSB7XG4gICAgICAgIGxldCAkZ2F0ZSA9ICQoXCIjXCIrZ2F0ZUlkKTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBnYXRlIGluIHN2ZydzIGxpc3Qgb2YgZ2F0ZXNcbiAgICAgICAgbGV0IGdhdGVJbmRleCA9IC0xO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmJveGVzW2ldLnN2Z09iai5pZD09PWdhdGVJZCkge1xuICAgICAgICAgICAgICAgIGdhdGVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihnYXRlSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCB3aXJlcyBjb25uZWN0ZWQgdG8gdGhpcyBnYXRlXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3hlc1tnYXRlSW5kZXhdLmNvbm5lY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZCh0aGlzLmJveGVzW2dhdGVJbmRleF0uY29ubmVjdG9yc1tpXS5zdmdPYmouaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGdhdGVcbiAgICAgICAgICAgIHRoaXMuYm94ZXMuc3BsaWNlKGdhdGVJbmRleCwgMSk7XG4gICAgICAgICAgICAkZ2F0ZS5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUcnlpbmcgdG8gcmVtb3ZlIGFuIG5vbmV4aXN0aW5nIGdhdGUuIChHYXRlIGlkOiBcIitnYXRlSWQrXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3V2lyZShmcm9tSWQsIHRvSWQsIHJlZnJlc2ggPSB0cnVlKSB7XG4gICAgICAgIGlmKGZyb21JZD09PXRvSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZyb21JZCA9IGZyb21JZDtcbiAgICAgICAgdGhpcy50b0lkID0gdG9JZDtcblxuICAgICAgICBsZXQgZnJvbUNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZChmcm9tSWQpO1xuICAgICAgICBsZXQgdG9Db25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQodG9JZCk7XG5cbiAgICAgICAgaWYoZnJvbUNvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVdpcmVzQnlDb25uZWN0b3JJZChmcm9tSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodG9Db25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVXaXJlc0J5Q29ubmVjdG9ySWQodG9JZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLndpcmVzLmxlbmd0aDtcbiAgICAgICAgdGhpcy53aXJlc1tpbmRleF0gPSBuZXcgZWRpdG9yRWxlbWVudHMuV2lyZSh0aGlzLCBmcm9tSWQsIHRvSWQsIHRoaXMuZ3JpZFNpemUpO1xuXG4gICAgICAgIGZyb21Db25uZWN0b3IuYWRkV2lyZUlkKHRoaXMud2lyZXNbaW5kZXhdLnN2Z09iai5pZCk7XG4gICAgICAgIHRvQ29ubmVjdG9yLmFkZFdpcmVJZCh0aGlzLndpcmVzW2luZGV4XS5zdmdPYmouaWQpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kRWxlbWVudCh0aGlzLndpcmVzW2luZGV4XSwgcmVmcmVzaCk7XG4gICAgICAgIHRoaXMubW92ZVRvQmFja0J5SWQodGhpcy53aXJlc1tpbmRleF0uc3ZnT2JqLmlkKTtcblxuICAgICAgICByZXR1cm4gdGhpcy53aXJlc1tpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0V2lyZUJ5SWQod2lyZUlkKSB7XG4gICAgICAgIGxldCB3aXJlQ291bnQgPSB0aGlzLndpcmVzLmxlbmd0aDtcblxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHdpcmVDb3VudCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy53aXJlc1tpXS5zdmdPYmouaWQ9PT13aXJlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aXJlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRXaXJlc0J5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG4gICAgICAgIHJldHVybiBjb25uZWN0b3Iud2lyZUlkcztcbiAgICB9XG5cbiAgICByZW1vdmVXaXJlQnlJZCh3aXJlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLndpcmVzLmxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lyZXNbaV0uc3ZnT2JqLmlkID09PSB3aXJlSWQpIHtcblxuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0b3IxID0gdGhpcy53aXJlc1tpXS5zdGFydENvbm5lY3RvcjtcbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdG9yMiA9IHRoaXMud2lyZXNbaV0uZW5kQ29ubmVjdG9yO1xuXG4gICAgICAgICAgICAgICAgY29ubmVjdG9yMS5yZW1vdmVXaXJlSWRBbmRVcGRhdGUod2lyZUlkKTtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IyLnJlbW92ZVdpcmVJZEFuZFVwZGF0ZSh3aXJlSWQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53aXJlc1tpXS5zdmdPYmouJGVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMud2lyZXMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVXaXJlc0J5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQpIHtcbiAgICAgICAgbGV0IGNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZChjb25uZWN0b3JJZCk7XG5cbiAgICAgICAgY29ubmVjdG9yLndpcmVJZHMuZm9yRWFjaCh3aXJlSWQgPT4ge1xuICAgICAgICAgICAgbGV0IHdpcmUgPSB0aGlzLmdldFdpcmVCeUlkKHdpcmVJZCk7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgb3RoZXIgY29ubmVjdG9yIHRoYXQgaXMgdGhlIHdpcmUgY29ubmVjdGVkIHRvXG4gICAgICAgICAgICBsZXQgb3RoZXJDb25uZWN0b3IgPSB0aGlzLmdldENvbm5lY3RvckJ5SWQod2lyZS5mcm9tSWQsIHdpcmUpO1xuICAgICAgICAgICAgaWYob3RoZXJDb25uZWN0b3Iuc3ZnT2JqLmlkPT09Y29ubmVjdG9ySWQpIHtcbiAgICAgICAgICAgICAgICBvdGhlckNvbm5lY3RvciA9IHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCh3aXJlLnRvSWQsIHdpcmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIHdpcmUgcmVjb3JkIGZyb20gdGhlIG90aGVyIGNvbm5lY3RvclxuICAgICAgICAgICAgb3RoZXJDb25uZWN0b3Iud2lyZUlkcy5kZWxldGUod2lyZUlkKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB3aXJlIHJlcHJlc2VudGF0aW9uIHVzaW5nIGpRdWVyeVxuICAgICAgICAgICAgJChcIiNcIiArIHdpcmVJZCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vIGlmIG90aGVyQ29ubmVjdG9yIGlzIGFuIGlucHV0IGNvbm5lY3Rvciwgc2V0IGl0cyBzdGF0ZSB0byB1bmtub3duXG4gICAgICAgICAgICBpZihvdGhlckNvbm5lY3Rvci5pc0lucHV0Q29ubmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJDb25uZWN0b3Iuc2V0U3RhdGUoTG9naWMuc3RhdGUudW5rbm93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSBsaXN0IG9mIHdpcmUgSWRzXG4gICAgICAgIGNvbm5lY3Rvci53aXJlSWRzLmNsZWFyKCk7XG4gICAgICAgIC8vIGlmIGNvbm5lY3RvciBpcyBhbiBpbnB1dCBjb25uZWN0b3IsIHNldCBpdHMgc3RhdGUgdG8gdW5rbm93blxuICAgICAgICBpZihjb25uZWN0b3IuaXNJbnB1dENvbm5lY3Rvcikge1xuICAgICAgICAgICAgY29ubmVjdG9yLnNldFN0YXRlKExvZ2ljLnN0YXRlLnVua25vd24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlJZChnYXRlSWQpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLmJveGVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy5ib3hlc1tpXS5zdmdPYmouaWQ9PT1nYXRlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib3hlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Qm94QnlDb25uZWN0b3JJZChjb25uZWN0b3JJZCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHRoaXMuYm94ZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib3hlc1tpXS5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm94ZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQsIHdpcmUpIHtcbiAgICAgICAgLy8gdGhlIHdpcmUgdmFyaWFibGUgaXMgdXNlZCBhcyBoZXVyaXN0aWMsXG4gICAgICAgIC8vIHdoZW4gd2Uga25vdyB0aGUgd2lyZSwgd2UgaGF2ZSB0byBjaGVjayBvbmx5XG4gICAgICAgIC8vIHR3byBnYXRlcyBpbnN0ZWFkIG9mIGFsbCBvZiB0aGVtXG5cbiAgICAgICAgaWYod2lyZSE9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gd2Uga25vdyB0aGUgd2lyZSAtLSB3ZSBjYW4gY2hlY2sgb25seSBnYXRlcyBhdCB0aGUgZW5kcyBvZiB0aGlzIHdpcmVcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3IgPSB3aXJlLnN0YXJ0Qm94LmdldENvbm5lY3RvckJ5SWQoY29ubmVjdG9ySWQpO1xuICAgICAgICAgICAgaWYgKCFjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IgPSB3aXJlLmVuZEJveC5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3I7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGRvIG5vdCBrbm93IHRoZSB3aXJlIC0tIHdlIGhhdmUgdG8gY2hlY2sgYWxsIGdhdGVzXG4gICAgICAgICAgICBsZXQgZ2F0ZUNvdW50ID0gdGhpcy5ib3hlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBnYXRlQ291bnQgOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdG9yID0gdGhpcy5ib3hlc1tpXS5nZXRDb25uZWN0b3JCeUlkKGNvbm5lY3RvcklkKTtcbiAgICAgICAgICAgICAgICBpZihjb25uZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgb2JqZWN0LCB0aGF0IHVzZXIgaW50ZXJhY3RlZCB3aXRoLCBpcyBub3QgYSBjb25uZWN0b3IgYW5kIGlzIGluIGEgZ3JvdXBcbiAgICAvLyByZXR1cm4gdGhlIGdyb3VwIGpRdWVyeSBvYmplY3QgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgalF1ZXJ5IG9iamVjdFxuICAgIGdldFJlYWxKUXVlcnlUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuICAgICAgICBpZighJHRhcmdldC5oYXNDbGFzcyhcImNvbm5lY3RvclwiKSAmJiAkdGFyZ2V0LnBhcmVudHMoJ2cnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcIkdcIiAmJiAkdGFyZ2V0LnByb3AoXCJ0YWdOYW1lXCIpICE9PSBcImdcIikge1xuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkdGFyZ2V0O1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgdGhlIGVkaXRvckVsZW1lbnQgdGhhdCB1c2VyIGludGVyYWN0ZWQgd2l0aCwgdGhlIFwidGFyZ2V0XCIgYXJndW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudFxuICAgIGdldFJlYWxUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIC8vIGV2ZW50eSBzZSBtdXNlamkgenByYWNvdmF0IHRhZHksIHByb3RvemUgdiBTVkcgc2UgZXZlbnR5IG5lcHJvcGFndWppXG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuXG4gICAgICAgIGlmKCR0YXJnZXQuaGFzQ2xhc3MoXCJjb25uZWN0b3JcIikpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjb25uZWN0b3IsIGRvbid0IHRyYXZlcnNlIGdyb3Vwc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29ubmVjdG9yQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYoJHRhcmdldC5wYXJlbnRzKCdnJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gdGhpcyBlbGVtZW50IGlzIGluIGEgZ3JvdXAgYW5kIGl0IGlzIG5vdCBhIGNvbm5lY3RvclxuXG4gICAgICAgICAgICAvLyB0cmF2ZXJzaW5nIHVwIHRoZSBET00gdHJlZSB1bnRpbCB3ZSBmaW5kIHRoZSBjbG9zZXN0IGdyb3VwXG4gICAgICAgICAgICBsZXQgJHBhcmVudEdyb3VwID0gJHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICgkcGFyZW50R3JvdXAucHJvcChcInRhZ05hbWVcIikgIT09IFwiR1wiICYmICRwYXJlbnRHcm91cC5wcm9wKFwidGFnTmFtZVwiKSAhPT0gXCJnXCIpIHtcbiAgICAgICAgICAgICAgICAkcGFyZW50R3JvdXAgPSAkcGFyZW50R3JvdXAucGFyZW50KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJveEJ5SWQoJHBhcmVudEdyb3VwLmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2UgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoXCJ3aXJlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRXaXJlQnlJZCgkdGFyZ2V0LmF0dHIoJ2lkJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZEVsZW1lbnQoZWxlbWVudCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRKUXVlcnlPYmplY3QoZWxlbWVudC5nZXQoKSwgcmVmcmVzaCk7XG4gICAgfVxuXG4gICAgYXBwZW5kSlF1ZXJ5T2JqZWN0KG9iamVjdCwgcmVmcmVzaCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmFwcGVuZChvYmplY3QpO1xuICAgICAgICBpZihyZWZyZXNoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFBhdHRlcm4ocGF0dGVybikge1xuICAgICAgICB0aGlzLiRkZWZzLmFwcGVuZChwYXR0ZXJuKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgLy8gcmVsb2FkIHRoZSBTVkcgZG9jdW1lbnQgKG5lZWRlZCB0byBkaXNwbGF5IG5ld2x5IGFwcGVuZGVkIGpRdWVyeSBvYmplY3QpXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy4kc3ZnLmh0bWwodGhpcy4kc3ZnLmh0bWwoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU1ZHIGRvY3VtZW50IGhhcyBiZWVuIHJlbG9hZGVkLlwiKVxuICAgIH1cblxuICAgIGRpc3BsYXlDb250ZXh0TWVudSh4LCB5LCAkdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuZGlzcGxheSh4LCB5LCAkdGFyZ2V0KTtcbiAgICB9XG4gICAgaGlkZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBzbmFwIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc25hcFRvR3JpZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRoaXMuZ3JpZFNpemUpICogdGhpcy5ncmlkU2l6ZTtcbiAgICB9XG5cbiAgICAvLyBzdGF0aWMgZnVuY3Rpb24gZm9yIHNuYXBwaW5nIGEgdmFsdWUgdG8gYSBncmlkXG4gICAgc3RhdGljIHNuYXBUb0dyaWQodmFsdWUsIGdyaWRTaXplKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gZ3JpZFNpemUpICogZ3JpZFNpemU7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBjYW5ub3QgYmUgdXNlZCBmb3Igd2lyaW5nIGF0IGFueSBjaXJjdW1zdGFuY2VzXG4gICAgZ2V0Tm9uUm91dGFibGVOb2RlcygpIHtcbiAgICAgICAgbGV0IGJsb2NrZWROb2RlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgLy8gZm9yIGVhY2ggYm94XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5ib3hlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgalF1ZXJ5IGNoaWxkIHdpdGggY2xhc3MgLnJlY3QgKFwiaGl0Ym94XCIpXG4gICAgICAgICAgICBsZXQgcmVjdCA9ICQoJyMnICsgdGhpcy5ib3hlc1tpXS5zdmdPYmouaWQpLmNoaWxkcmVuKFwiLnJlY3RcIilbMF07XG4gICAgICAgICAgICAvLyBnZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGVcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9ICQocmVjdCkucG9zaXRpb24oKTtcblxuICAgICAgICAgICAgLy8gc25hcCB0aGUgcG9zaXRpb24gdG8gdGhlIGdyaWRcbiAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24ubGVmdCk7XG4gICAgICAgICAgICBwb3NpdGlvbi50b3AgPSB0aGlzLnNuYXBUb0dyaWQocG9zaXRpb24udG9wKTtcblxuICAgICAgICAgICAgLy8gZm9yIGVhY2ggaXRlbSBpbiBibG9ja2VkTm9kZXMgKHNldCBvZiBibG9ja2VkIG5vZGVzIHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmVcbiAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IHVwcGVyIGNvcm5lciBvZiByZWN0OyB1bml0IHVzZWQgaXMgXCJvbmUgZ3JpZFNpemVcIikgY29udmVydCB0aGUgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIC8vIHRvIGFic29sdXRlIChtdWx0aXBsZSB3aXRoIGdyaWRTaXplIGFuZCBhZGQgcG9zaXRpb24gb2YgcmVjdCkgYW5kIGFkZCB0aGUgcmVzdWx0IHRvIHRoZSBzZXRcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLmJveGVzW2ldLmJsb2NrZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGxldCBhYnNvbHV0ZVggPSBwb3NpdGlvbi5sZWZ0ICsgaXRlbS54ICogdGhpcy5ncmlkU2l6ZTtcbiAgICAgICAgICAgICAgICBsZXQgYWJzb2x1dGVZID0gcG9zaXRpb24udG9wICsgaXRlbS55ICogdGhpcy5ncmlkU2l6ZTtcblxuICAgICAgICAgICAgICAgIGJsb2NrZWROb2Rlcy5hZGQoe1xuICAgICAgICAgICAgICAgICAgICB4OiBhYnNvbHV0ZVgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGFic29sdXRlWVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRvZG8gZW5zdXJlIHRoYXQgdGhpcy5yZWZyZXNoKCkgaXMgcmVhbGx5IHVubmVjZXNzYXJ5XG4gICAgICAgIC8vIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gYmxvY2tlZE5vZGVzO1xuICAgIH1cblxuICAgIG1vdmVUb0Zyb250QnlJZChvYmpJZCkge1xuICAgICAgICB0aGlzLiRzdmcuYXBwZW5kKCQoXCIjXCIgKyBvYmpJZCkpO1xuICAgIH1cblxuICAgIG1vdmVUb0JhY2tCeUlkKG9iaklkKSB7XG4gICAgICAgICQoXCIjXCIgKyB0aGlzLmJhY2tncm91bmQuaWQpXG4gICAgICAgICAgICAuYWZ0ZXIoJChcIiNcIiArIG9iaklkKSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHNldCBvZiBub2RlcywgdGhhdCBpcyBiZXR0ZXIgbm90IHRvIHVzZSBmb3Igd2lyaW5nXG4gICAgZ2V0SW5jb252ZW5pZW50Tm9kZXMoaWdub3JlV2lyZUlkKSB7XG5cbiAgICAgICAgbGV0IGluY29udmVuaWVudE5vZGVzID0gbmV3IFNldCgpO1xuICAgICAgICAvLyBmb3IgZWFjaCB3aXJlXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy53aXJlcy5sZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vIChpZ25vcmUgdGhlIHdpcmUgdGhhdCBpcyBzcGVjaWZpZWQgaW4gdGhlIGlnbm9yZVdpcmVJZCBhcmd1bWVudCAoaWYgYW55KSlcbiAgICAgICAgICAgIGlmKGlnbm9yZVdpcmVJZD09PXVuZGVmaW5lZCB8fCBpZ25vcmVXaXJlSWQhPT10aGlzLndpcmVzW2ldLnN2Z09iai5pZCkge1xuICAgICAgICAgICAgICAgIC8vIGN5Y2xlIHRocm91Z2ggcG9pbnRzLCBmb3IgZWFjaCBuZWlnYm91cnMgYWRkIGFsbCBwb2ludHMgdGhhdCBhcmUgaW4gYmV0d2VlbiB0aGVtXG4gICAgICAgICAgICAgICAgLy8gaS5lLjogKDAsMCkgYW5kICgwLDMwKSBhcmUgYmxvY2tpbmcgdGhlc2Ugbm9kZXM6ICgwLDApLCAoMCwxMCksICgwLDIwKSwgKDAsMzApXG4gICAgICAgICAgICAgICAgbGV0IHByZXZQb2ludDtcbiAgICAgICAgICAgICAgICB0aGlzLndpcmVzW2ldLnBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZQb2ludCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJldlBvaW50IGlzIHVuZGVmaW5lZCwgYWRkIHRoZSBmaXJzdCBwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jb252ZW5pZW50Tm9kZXMuYWRkKHt4OiBwb2ludC54LCB5OiBwb2ludC55fSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGFkZCBhbGwgdGhlIHBvaW50IGJldHdlZW4gdGhlIHByZXZQb2ludCAoZXhjbHVkZWQpIGFuZCBwb2ludCAoaW5jbHVkZWQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByZXZQb2ludC54PT09cG9pbnQueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIGhvcml6b250YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IE1hdGgubWluKHByZXZQb2ludC55LCBwb2ludC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG8gPSBNYXRoLm1heChwcmV2UG9pbnQueSwgcG9pbnQueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZShmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29udmVuaWVudE5vZGVzLmFkZCh7eDogcG9pbnQueCwgeTogZnJvbX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICs9IHRoaXMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHByZXZQb2ludC55PT09cG9pbnQueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5lIGlzIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb20gPSBNYXRoLm1pbihwcmV2UG9pbnQueCwgcG9pbnQueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvID0gTWF0aC5tYXgocHJldlBvaW50LngsIHBvaW50LngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUoZnJvbSA8PSB0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbnZlbmllbnROb2Rlcy5hZGQoe3g6IGZyb20sIHk6IHBvaW50Lnl9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArPSB0aGlzLmdyaWRTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluZSBpcyBuZWl0aGVyIGhvcml6b250YWwgbm9yIHZlcnRpY2FsLCB0aHJvdyBhbiBlcnJvciBmb3IgYmV0dGVyIGZ1dHVyZSBkZWJ1Z2dpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZ2V0SW5jb252ZW5pZW50Tm9kZXM6IGxpbmUgYmV0d2VlbiB0d28gcG9pbnRzIGlzIG5laXRoZXIgaG9yaXpvbnRhbCBub3IgdmVydGljYWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgbmV3IHByZXZQb2ludFxuICAgICAgICAgICAgICAgICAgICBwcmV2UG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gdGhlIHNldFxuICAgICAgICByZXR1cm4gaW5jb252ZW5pZW50Tm9kZXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFN2ZyBmcm9tICcuL2NhbnZhcy5qcyc7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGxldCBzdmcgPSBuZXcgU3ZnKFwic3ZnI2NhbnZhc1wiLCAxMCk7XG5cbiAgICAvKiBERU1PICovXG4gICAgLy8gT05FIEJJVCBDT01QQVJBVE9SXG4gICAgLypcbiAgICBsZXQgaTEgPSBzdmcubmV3SW5wdXQoMTAwLCAxMDApO1xuICAgIGxldCBpMiA9IHN2Zy5uZXdJbnB1dCgxMDAsIDIwMCk7XG5cbiAgICBsZXQgbjEgPSBzdmcubmV3R2F0ZShcIm5vdFwiLCAyMDAsIDEwMCk7XG4gICAgbGV0IG4yID0gc3ZnLm5ld0dhdGUoXCJub3RcIiwgMjAwLCAyMDApO1xuXG4gICAgbGV0IGExID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCA5MCk7XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgMzYwLCAyMTApO1xuXG4gICAgbGV0IG5vciA9IHN2Zy5uZXdHYXRlKFwibm9yXCIsIDU0MCwgMTUwKTtcblxuICAgIGxldCBvMSA9IHN2Zy5uZXdPdXRwdXQoNjgwLCA5MCk7XG4gICAgbGV0IG8yID0gc3ZnLm5ld091dHB1dCg2ODAsIDE1MCk7XG4gICAgbGV0IG8zID0gc3ZnLm5ld091dHB1dCg2ODAsIDIxMCk7XG5cbiAgICBzdmcubmV3V2lyZShpMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbjEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIG4yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGkyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKG4xLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMS5pbnB1dHNbMV0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShuMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgYTIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbm9yLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKGEyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBub3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShhMS5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzEuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUobm9yLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzMuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cblxuICAgIC8vIEJJTkFSWSBBRERFUlxuICAgIC8qXG4gICAgbGV0IGkxID0gc3ZnLm5ld0lucHV0KDgwLCA5MCk7XG4gICAgbGV0IGkyID0gc3ZnLm5ld0lucHV0KDgwLCAxMzApO1xuICAgIGxldCBpMyA9IHN2Zy5uZXdJbnB1dCg4MCwgMTgwKTtcblxuICAgIGxldCB4MSA9IHN2Zy5uZXdHYXRlKFwieG9yXCIsIDM2MCwgMTAwKTtcbiAgICBsZXQgeDIgPSBzdmcubmV3R2F0ZShcInhvclwiLCAzNjAsIDE3MCk7XG5cbiAgICBsZXQgYTEgPSBzdmcubmV3R2F0ZShcImFuZFwiLCAyNTAsIDIyMCk7XG4gICAgYTEub25DbGlja01pZGRsZSgpOy8vIGEgamVkbm91IHJvdG92YW55XG4gICAgbGV0IGEyID0gc3ZnLm5ld0dhdGUoXCJhbmRcIiwgNTAwLCAzMjApO1xuXG4gICAgbGV0IG9yID0gc3ZnLm5ld0dhdGUoXCJvclwiLCA2MjAsIDMxMCk7XG5cbiAgICBsZXQgbzEgPSBzdmcubmV3T3V0cHV0KDc1MCwgMjcwKTtcbiAgICBsZXQgbzIgPSBzdmcubmV3T3V0cHV0KDc1MCwgMzEwKTtcblxuICAgIHN2Zy5uZXdXaXJlKGkxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCB4MS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShpMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgeDEuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTEub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTIub3V0cHV0c1swXS5zdmdPYmouaWQsIGExLmlucHV0c1swXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoaTMub3V0cHV0c1swXS5zdmdPYmouaWQsIGEyLmlucHV0c1sxXS5zdmdPYmouaWQpO1xuXG4gICAgc3ZnLm5ld1dpcmUoeDEub3V0cHV0c1swXS5zdmdPYmouaWQsIHgyLmlucHV0c1swXS5zdmdPYmouaWQpO1xuICAgIHN2Zy5uZXdXaXJlKHgxLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBhMi5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKGExLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvci5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcblxuICAgIHN2Zy5uZXdXaXJlKHgyLm91dHB1dHNbMF0uc3ZnT2JqLmlkLCBvMS5pbnB1dHNbMF0uc3ZnT2JqLmlkKTtcbiAgICBzdmcubmV3V2lyZShhMi5vdXRwdXRzWzBdLnN2Z09iai5pZCwgb3IuaW5wdXRzWzFdLnN2Z09iai5pZCk7XG5cbiAgICBzdmcubmV3V2lyZShvci5vdXRwdXRzWzBdLnN2Z09iai5pZCwgbzIuaW5wdXRzWzBdLnN2Z09iai5pZCk7XG4gICAgKi9cbn0pOyJdfQ==
