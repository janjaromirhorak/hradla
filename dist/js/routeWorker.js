(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
function stringify (obj, options) {
  options = options || {}
  var indent = JSON.stringify([1], null, get(options, 'indent', 2)).slice(2, -3)
  var addMargin = get(options, 'margins', false)
  var maxLength = (indent === '' ? Infinity : get(options, 'maxLength', 80))

  return (function _stringify (obj, currentIndent, reserved) {
    if (obj && typeof obj.toJSON === 'function') {
      obj = obj.toJSON()
    }

    var string = JSON.stringify(obj)

    if (string === undefined) {
      return string
    }

    var length = maxLength - currentIndent.length - reserved

    if (string.length <= length) {
      var prettified = prettify(string, addMargin)
      if (prettified.length <= length) {
        return prettified
      }
    }

    if (typeof obj === 'object' && obj !== null) {
      var nextIndent = currentIndent + indent
      var items = []
      var delimiters
      var comma = function (array, index) {
        return (index === array.length - 1 ? 0 : 1)
      }

      if (Array.isArray(obj)) {
        for (var index = 0; index < obj.length; index++) {
          items.push(
            _stringify(obj[index], nextIndent, comma(obj, index)) || 'null'
          )
        }
        delimiters = '[]'
      } else {
        Object.keys(obj).forEach(function (key, index, array) {
          var keyPart = JSON.stringify(key) + ': '
          var value = _stringify(obj[key], nextIndent,
                                 keyPart.length + comma(array, index))
          if (value !== undefined) {
            items.push(keyPart + value)
          }
        })
        delimiters = '{}'
      }

      if (items.length > 0) {
        return [
          delimiters[0],
          indent + items.join(',\n' + nextIndent),
          delimiters[1]
        ].join('\n' + currentIndent)
      }
    }

    return string
  }(obj, '', 0))
}

// Note: This regex matches even invalid JSON strings, but since we’re
// working on the output of `JSON.stringify` we know that only valid strings
// are present (unless the user supplied a weird `options.indent` but in
// that case we don’t care since the output would be invalid anyway).
var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,\][}{]/g

function prettify (string, addMargin) {
  var m = addMargin ? ' ' : ''
  var tokens = {
    '{': '{' + m,
    '[': '[' + m,
    '}': m + '}',
    ']': m + ']',
    ',': ', ',
    ':': ': '
  }
  return string.replace(stringOrChar, function (match, string) {
    return string ? match : tokens[match]
  })
}

function get (options, name, defaultValue) {
  return (name in options ? options[name] : defaultValue)
}

module.exports = stringify

},{}],2:[function(require,module,exports){
/**
 * The DoublyLinkedList class provides the main functionality of a doubly linked list.
 *
 * @class DoublyLinkedList
 */
var DoublyLinkedList = (function () {
    function DoublyLinkedList() {
        /**
         * Count of elements in list
         *
         * @property _length
         * @type number
         * @private
         */
        this._length = 0;
        /**
         * Iteration pointer
         *
         * @property _key
         * @type number
         * @private
         */
        this._key = 0;
        /**
         * Reference to head(first) element in list
         *
         * @property _head
         * @type DoublyLinkedListNode
         * @private
         */
        this._head = null;
        /**
         * Reference to tail(last) element in list
         *
         * @property _tail
         * @type DoublyLinkedListNode
         * @private
         */
        this._tail = null;
        /**
         * Reference to iterated element in list
         *
         * @property _current
         * @type DoublyLinkedListNode
         * @private
         */
        this._current = null;
    }
    /**
     * Insert a new value at the specified index
     *
     * @method add
     * @param index The index where the new value is to be inserted.
     * @param value The new value for the index.
     * @return void
     */
    DoublyLinkedList.prototype.add = function (index, value) {
        if (index < 0 || index >= this._length) {
            throw new Error("Out of bounds");
        }
        var i = 0;
        var current = this._head;
        while (i < index) {
            current = current.next;
            i++;
        }
        current.value = value;
    };
    /**
     * Pops a node from the end of the doubly linked list
     *
     * @method pop
     * @return any  The value of the popped node.
     */
    DoublyLinkedList.prototype.pop = function () {
        if (this._length === 0) {
            throw new Error("Can't pop from an empty data structure");
        }
        var value = this._tail.value;
        this._tail = this._tail.prev;
        if (this._tail) {
            delete this._tail.next;
            this._tail.next = null;
        }
        this._length--;
        if (this._length === 0) {
            delete this._head;
            this._head = null;
        }
        return value;
    };
    /**
     * Shifts a node from the beginning of the doubly linked list
     *
     * @method shift
     * @return any  The value of the shifted node.
     */
    DoublyLinkedList.prototype.shift = function () {
        if (this._length === 0) {
            throw new Error("Can't shift from an empty data structure");
        }
        var value = this._head.value;
        this._head = this._head.next;
        if (this._head) {
            delete this._head.prev;
            this._head.prev = null;
        }
        this._length--;
        return value;
    };
    /**
     * Pushes an element at the end of the doubly linked list
     *
     * @method push
     * @param value The value to push.
     * @return void
     */
    DoublyLinkedList.prototype.push = function (value) {
        // allocate new node
        var node = {
            value: value,
            prev: this._tail,
            next: null
        };
        if (this._length === 0) {
            this._head = this._tail = node;
        }
        else {
            this._tail.next = node;
            this._tail = this._tail.next;
        }
        this._length++;
    };
    /**
     * Prepends the doubly linked list with an element
     *
     * @method unshift
     * @param value The value to unshift.
     * @return void
     */
    DoublyLinkedList.prototype.unshift = function (value) {
        // allocate new node
        var node = {
            value: value,
            prev: null,
            next: this._head
        };
        if (this._length === 0) {
            this._head = this._tail = node;
        }
        else {
            this._head.prev = node;
            this._head = this._head.prev;
        }
        this._length++;
    };
    /**
     * Peeks at the node from the end of the doubly linked list
     *
     * @method top
     * @return any  The value of the last node.
     */
    DoublyLinkedList.prototype.top = function () {
        if (this._tail)
            return this._tail.value;
    };
    /**
     * Peeks at the node from the beginning of the doubly linked list
     *
     * @method bottom
     * @return any  The value of the first node.
     */
    DoublyLinkedList.prototype.bottom = function () {
        if (this._head)
            return this._head.value;
    };
    /**
     * Counts the number of elements in the doubly linked list
     *
     * @method count
     * @return number the number of elements in the doubly linked list.
     */
    DoublyLinkedList.prototype.count = function () {
        return this._length;
    };
    /**
     * Checks whether the doubly linked list is empty
     *
     * @method isEmpty
     * @return boolean whether the doubly linked list is empty.
     */
    DoublyLinkedList.prototype.isEmpty = function () {
        return (this._length === 0);
    };
    /**
     * Rewind iterator back to the start
     *
     * @method rewind
     * @return void
     */
    DoublyLinkedList.prototype.rewind = function () {
        this._key = 0;
        this._current = this._head;
    };
    /**
     * Return current list entry
     *
     * @method current
     * @return any  The current node value.
     */
    DoublyLinkedList.prototype.current = function () {
        if (this._current) {
            return this._current.value;
        }
        return null;
    };
    /**
     * Return current node index
     *
     * @method key
     * @return any  The current node index.
     */
    DoublyLinkedList.prototype.key = function () {
        return this._key;
    };
    /**
     * Move to next entry
     *
     * @method next
     * @return void
     */
    DoublyLinkedList.prototype.next = function () {
        this._current = this._current.next;
        this._key++;
    };
    /**
     * Move to previous entry
     *
     * @method prev
     * @return void
     */
    DoublyLinkedList.prototype.prev = function () {
        this._current = this._current.prev;
        this._key--;
    };
    /**
     * Check whether the doubly linked list contains more nodes
     *
     * @method valid
     * @return boolean true if the doubly linked list contains any more nodes, false otherwise.
     */
    DoublyLinkedList.prototype.valid = function () {
        return (this._key >= 0 && this._key < this._length);
    };
    /**
     * Export the list to array
     *
     * @method toArray
     * @return Array   The exported array
     */
    DoublyLinkedList.prototype.toArray = function () {
        var list = [];
        var current = this._head;
        while (current) {
            list.push(current.value);
            current = current.next;
        }
        return list;
    };
    /**
     * Serializes the list to string
     *
     * @method toString
     * @return string   The serialized string.
     */
    DoublyLinkedList.prototype.toString = function () {
        return "{" + this.toArray().join("->") + "}";
    };
    return DoublyLinkedList;
})();
module.exports = DoublyLinkedList;

},{}],3:[function(require,module,exports){
/**
 * The Heap class provides the main functionality of a Heap.
 *
 * @class Heap
 */
var Heap = (function () {
    function Heap() {
        /**
         * Binary tree storage array
         *
         * @property _tree
         * @type Array
         * @private
         */
        this._tree = [];
        /**
         * Heap type
         *
         * @property _type
         * @type number
         * @private
         */
        this._type = Heap.MAX;
        /**
         * Iteration pointer
         *
         * @property _key
         * @type number
         * @private
         */
        this._key = 0;
    }
    /**
     * Get index of left child element in binary tree stored in array
     *
     * @method _child
     * @param n
     * @return number
     * @private
     */
    Heap.prototype._child = function (n) {
        return 2 * n + 1;
    };
    /**
     * Get index of parent element in binary tree stored in array
     *
     * @method _parent
     * @param n
     * @return number
     * @private
     */
    Heap.prototype._parent = function (n) {
        //console.log('n=', n, Math.floor(n / 2));
        return Math.floor(n / 2);
    };
    /**
     * Swap 2 elements in binary tree
     *
     * @method _swap
     * @param first
     * @param second
     * @private
     */
    Heap.prototype._swap = function (first, second) {
        var swap = this._tree[first];
        this._tree[first] = this._tree[second];
        this._tree[second] = swap;
    };
    /**
     * Sift elements in binary tree
     *
     * @method _siftUp
     * @param i
     * @private
     */
    Heap.prototype._siftUp = function (i) {
        while (i > 0) {
            var parent = this._parent(i);
            if (this.compare(this._tree[i], this._tree[parent]) * this._type > 0) {
                this._swap(i, parent);
                i = parent;
            }
            else {
                break;
            }
        }
    };
    /**
     * Sift down elements in binary tree
     *
     * @method _siftDown
     * @param i
     * @private
     */
    Heap.prototype._siftDown = function (i) {
        while (i < this._tree.length) {
            var left = this._child(i);
            var right = left + 1;
            if ((left < this._tree.length) && (right < this._tree.length) &&
                (this.compare(this._tree[i], this._tree[left]) * this._type < 0 ||
                    this.compare(this._tree[i], this._tree[right]) * this._type < 0)) {
                // there is 2 children and one of them must be swapped
                // get correct element to sift down
                var sift = left;
                if (this.compare(this._tree[left], this._tree[right]) * this._type < 0) {
                    sift = right;
                }
                this._swap(i, sift);
                i = sift;
            }
            else if (left < this._tree.length &&
                this.compare(this._tree[i], this._tree[left]) * this._type < 0) {
                // only one child exists
                this._swap(i, left);
                i = left;
            }
            else {
                break;
            }
        }
    };
    /**
     * Extracts a node from top of the heap and sift up
     *
     * @method extract
     * @return any The value of the extracted node.
     */
    Heap.prototype.extract = function () {
        if (this._tree.length === 0) {
            throw new Error("Can't extract from an empty data structure");
        }
        var extracted = this._tree[0];
        if (this._tree.length === 1) {
            this._tree = [];
        }
        else {
            this._tree[0] = this._tree.pop();
            this._siftDown(0);
        }
        return extracted;
    };
    /**
     * Inserts an element in the heap by sifting it up
     *
     * @method insert
     * @param value The value to insert.
     * @return void
     */
    Heap.prototype.insert = function (value) {
        this._tree.push(value);
        this._siftUp(this._tree.length - 1);
    };
    /**
     * Peeks at the node from the top of the heap
     *
     * @method top
     * @return any The value of the node on the top.
     */
    Heap.prototype.top = function () {
        if (this._tree.length === 0) {
            throw new Error("Can't peek at an empty heap");
        }
        return this._tree[0];
    };
    /**
     * Counts the number of elements in the heap
     *
     * @method count
     * @return number the number of elements in the heap.
     */
    Heap.prototype.count = function () {
        return this._tree.length;
    };
    /**
     * Checks whether the heap is empty
     *
     * @method isEmpty
     * @return boolean whether the heap is empty.
     */
    Heap.prototype.isEmpty = function () {
        return (this._tree.length === 0);
    };
    /**
     * Rewind iterator back to the start (no-op)
     *
     * @method rewind
     * @return void
     */
    Heap.prototype.rewind = function () {
        this._key = 0;
    };
    /**
     * Return current node pointed by the iterator
     *
     * @method current
     * @return any The current node value.
     */
    Heap.prototype.current = function () {
        return this._tree[this._key];
    };
    /**
     * Return current node index
     *
     * @method key
     * @return any The current node index.
     */
    Heap.prototype.key = function () {
        return this._key;
    };
    /**
     * Move to the next node
     *
     * @method next
     * @return void
     */
    Heap.prototype.next = function () {
        this._key++;
    };
    /**
     * Move to previous entry
     *
     * @method prev
     * @return void
     */
    Heap.prototype.prev = function () {
        this._key--;
    };
    /**
     * Check whether the heap contains more nodes
     *
     * @method valid
     * @return boolean true if the heap contains any more nodes, false otherwise.
     */
    Heap.prototype.valid = function () {
        return (this._key >= 0 && this._key < this._tree.length);
    };
    /**
     * Compare elements in order to place them correctly in the heap while sifting up.
     *
     * @method compare
     * @param first The value of the first node being compared.
     * @param second The value of the second node being compared.
     * @return number Result of the comparison, positive integer if first is greater than second, 0 if they are equal, negative integer otherwise.
     * Having multiple elements with the same value in a Heap is not recommended. They will end up in an arbitrary relative position.
     */
    Heap.prototype.compare = function (first, second) {
        if (first > second) {
            return 1;
        }
        else if (first == second) {
            return 0;
        }
        else {
            return -1;
        }
    };
    /**
     * Visually display heap tree
     *
     * @method _displayNode
     * @param node
     * @param prefix
     * @param last
     * @return String
     * @private
     */
    Heap.prototype._displayNode = function (node, prefix, last) {
        if (prefix === void 0) { prefix = ''; }
        if (last === void 0) { last = true; }
        var line = prefix;
        // get child indexes
        var left = this._child(node);
        var right = left + 1;
        if (last) {
            line += (prefix ? '└─' : '  ');
        }
        else {
            line += '├─';
        }
        line += this._tree[node];
        prefix += (last ? '  ' : '│ ');
        if (left < this._tree.length) {
            line += '\n' + this._displayNode(left, prefix, (this._tree[right] == undefined ? true : false));
        }
        if (right < this._tree.length) {
            line += '\n' + this._displayNode(right, prefix, true);
        }
        return line;
    };
    /**
     * Serializes the heap to string
     *
     * @method toString
     * @return string   The serialized string.
     */
    Heap.prototype.toString = function () {
        // start with root and recursively goes to each node
        return this._displayNode(0);
    };
    /**
     * Serializes the heap to array
     *
     * @method toArray
     * @return Array   The serialized array.
     */
    Heap.prototype.toArray = function () {
        return this._tree;
    };
    /**
     * Max heap flag
     *
     * @property MAX
     * @type number
     * @static
     */
    Heap.MAX = 1;
    /**
     * Min heap flag
     *
     * @property MIN
     * @type number
     * @static
     */
    Heap.MIN = -1;
    return Heap;
})();
module.exports = Heap;

},{}],4:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Heap = require('./Heap');
/**
 * The MaxHeap class provides the main functionality of a heap, keeping the maximum on the top.
 *
 * @class MaxHeap
 * @extends Heap
 */
var MaxHeap = (function (_super) {
    __extends(MaxHeap, _super);
    function MaxHeap() {
        _super.apply(this, arguments);
        this._type = Heap.MAX;
    }
    return MaxHeap;
})(Heap);
module.exports = MaxHeap;

},{"./Heap":3}],5:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Heap = require('./Heap');
/**
 * The MinHeap class provides the main functionality of a heap, keeping the minimum on the top.
 *
 * @class MinHeap
 * @extends Heap
 */
var MinHeap = (function (_super) {
    __extends(MinHeap, _super);
    function MinHeap() {
        _super.apply(this, arguments);
        this._type = Heap.MIN;
    }
    return MinHeap;
})(Heap);
module.exports = MinHeap;

},{"./Heap":3}],6:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Heap = require('./Heap');
/**
 * The PriorityQueue class provides the main functionality of an prioritized queue, implemented using a max heap.
 *
 * @class PriorityQueue
 * @extends Heap
 */
var PriorityQueue = (function (_super) {
    __extends(PriorityQueue, _super);
    function PriorityQueue() {
        _super.apply(this, arguments);
        this._type = Heap.MAX;
    }
    /**
     * Adds an element to the queue
     *
     * @method enqueue
     * @param value The value to enqueue.
     * @param priority The priority of value.
     * @return void
     */
    PriorityQueue.prototype.enqueue = function (value, priority) {
        return this.insert(new PriorityQueueNode(value, priority));
    };
    /**
     * Dequeues a node from the queue
     *
     * @method dequeue
     * @return any  The value of the dequeued node.
     */
    PriorityQueue.prototype.dequeue = function () {
        return this.extract().value;
    };
    /**
     * Peeks at the node from the top of the heap
     *
     * @method top
     * @return any The value of the node on the top.
     */
    PriorityQueue.prototype.top = function () {
        return _super.prototype.top.call(this).value;
    };
    /**
     * Compare elements in order to place them correctly in the heap while sifting up.
     *
     * @method compare
     * @param first The value of the first node being compared.
     * @param second The value of the second node being compared.
     * @return number Result of the comparison, positive integer if first is greater than second, 0 if they are equal, negative integer otherwise.
     * Having multiple elements with the same value in a Heap is not recommended. They will end up in an arbitrary relative position.
     */
    PriorityQueue.prototype.compare = function (first, second) {
        if (first.priority > second.priority) {
            return 1;
        }
        else if (first.priority == second.priority) {
            return 0;
        }
        else {
            return -1;
        }
    };
    return PriorityQueue;
})(Heap);
/**
 * PriorityQueue Node
 *
 * @class PriorityQueueNode
 */
var PriorityQueueNode = (function () {
    /**
     * Constructor
     *
     * @method constructor
     * @param value
     * @param priority
     */
    function PriorityQueueNode(value, priority) {
        this.value = value;
        this.priority = priority;
    }
    /**
     * Serializes the node to string
     *
     * @method toString
     * @return string   The serialized string.
     */
    PriorityQueueNode.prototype.toString = function () {
        return this.value + " [" + this.priority + "]";
    };
    return PriorityQueueNode;
})();
module.exports = PriorityQueue;

},{"./Heap":3}],7:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DoublyLinkedList = require('./DoublyLinkedList');
/**
 * The Queue class provides the main functionality of a queue implemented using a doubly linked list.
 *
 * @class Queue
 * @extends DoublyLinkedList
 */
var Queue = (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        _super.apply(this, arguments);
    }
    /**
     * Adds an element to the queue
     *
     * @method enqueue
     * @param value The value to enqueue.
     * @return void
     */
    Queue.prototype.enqueue = function (value) {
        return this.push(value);
    };
    /**
     * Dequeues a node from the queue
     *
     * @method dequeue
     * @return any  The value of the dequeued node.
     */
    Queue.prototype.dequeue = function () {
        return this.shift();
    };
    return Queue;
})(DoublyLinkedList);
module.exports = Queue;

},{"./DoublyLinkedList":2}],8:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DoublyLinkedList = require('./DoublyLinkedList');
/**
 * The Stack class provides the main functionality of a stack implemented using a doubly linked list.
 *
 * @class Stack
 * @extends DoublyLinkedList
 */
var Stack = (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        _super.apply(this, arguments);
    }
    return Stack;
})(DoublyLinkedList);
module.exports = Stack;

},{"./DoublyLinkedList":2}],9:[function(require,module,exports){
/**
 * STL
 * @type {{DoublyLinkedList: exports, Stack: exports, Queue: exports, Heap: exports, MaxHeap: exports, MinHeap: exports, PriorityQueue: exports}}
 */
module.exports = {
	DoublyLinkedList: require('./Datastructures/DoublyLinkedList'),
	Stack: require('./Datastructures/Stack'),
	Queue: require('./Datastructures/Queue'),
	Heap: require('./Datastructures/Heap'),
	MaxHeap: require('./Datastructures/MaxHeap'),
	MinHeap: require('./Datastructures/MinHeap'),
	PriorityQueue: require('./Datastructures/PriorityQueue')
};
},{"./Datastructures/DoublyLinkedList":2,"./Datastructures/Heap":3,"./Datastructures/MaxHeap":4,"./Datastructures/MinHeap":5,"./Datastructures/PriorityQueue":6,"./Datastructures/Queue":7,"./Datastructures/Stack":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findPath;

var _helperFunctions = require('./other/helperFunctions');

var _mapWithDefaultValue = require('./other/mapWithDefaultValue');

var _mapWithDefaultValue2 = _interopRequireDefault(_mapWithDefaultValue);

var _libstl = require('libstl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// note: imported from a node module

/** @module findPath */

/**
 * Heavily modified implementation of the A* algorithm
 * @param  {Object} start object containing numeric attributes `x` and `y` that represent the first endpoint of the wire in grid pixels
 * @param  {Object} end   object containing numeric attributes `x` and `y` that represent the second endpoint of the wire in grid pixels
 * @param  {Set} nonRoutable set of non routable nodes
 * @param  {Set} punishedButRoutable set of nodes that are not optimal for routing
 * @return {Array} array of objects containing numeric attributes `x` and `y`
 */
function findPath(start, end, nonRoutable, punishedButRoutable) {
    var distanceFunction = _helperFunctions.manhattanDistance;

    var wireCrossPunishment = 1;
    var wireBendPunishment = 1;

    // number of nodes, that can be opened at once
    // once is this limit exceeded, aStar will fail and return undefined
    var maxNodeLimit = 100000;

    var closedNodes = new Set();
    var openNodes = new Set();
    var openNodeQueue = new _libstl.PriorityQueue();

    // functions for working with open nodes:

    /**
     * add a new open node to the structure
     * @param {Object} node   object containing numeric attributes `x` and `y` that represent the first endpoint of the wire
     * @param {number} fscore fScore of this node
     */
    var addOpenNode = function addOpenNode(node, fscore) {
        openNodes.add(node);
        // flip the fscore, because PriorityQueue uses max heap
        openNodeQueue.enqueue(node, 1 / fscore);
    };

    /**
     * get the open node with the lowest fScore and remove it
     * @return {Object} object containing numeric attributes `x` and `y` that represent the first endpoint of the wire
     */
    var getOpenNode = function getOpenNode() {
        var node = openNodeQueue.dequeue();
        openNodes.delete(node);
        return node;
    };

    var cameFrom = new Map();

    // default value: infinity
    var gScore = new _mapWithDefaultValue2.default(Infinity);
    gScore.set(start, 0);

    var startFScore = distanceFunction(start, end);

    addOpenNode(start, startFScore);

    openNodes.add(start);
    openNodeQueue.enqueue(start, 1 / startFScore);

    while (openNodes.size > 0) {
        // get the value from openNodes that has the lowest fScore
        var currentNode = getOpenNode();

        // if we reached the end point, reconstruct the path and return it
        if (currentNode.x == end.x && currentNode.y == end.y) {
            return reconstructPath(cameFrom, currentNode);
        }

        // add this node to the closed nodes
        closedNodes.add(currentNode);

        // the farthest points accessible without avoiding obstacles in every direction
        // (but max 50 in each direction)
        for (var direction = 0; direction < 4; direction++) {
            var newPoint = movePoint(currentNode, direction);

            var wiresCrossed = 0;

            for (var i = 0; i < 50; i++) {
                // if newPoint is in the set of non routable points,
                // don't add it and stop proceeding in this direction
                if (setHasThisPoint(nonRoutable, newPoint)) {
                    // if this not the end or start point, break
                    if (!(newPoint.x === end.x && newPoint.y === end.y) && !(newPoint.x === start.x && newPoint.y === start.y)) {
                        break;
                    }
                }

                // skip this node, if it has been already closed
                // or if it is on the list of non routable nodes
                if (closedNodes.has(newPoint)) {
                    continue;
                }

                // calculate possible GScore by applying a punishment for each node ("bend") in the path
                var newGScore = wireBendPunishment + gScore.getWithDefault(currentNode);

                if (setHasThisPoint(punishedButRoutable, newPoint)) {
                    // if the node is in the set of punished nodes, apply the punishment
                    wiresCrossed++;
                }

                // apply the punishment for each wire crossed in this direction
                // note: we are counting the wires crossed when exporting this direction, not the wires
                // crossed in the final path, there will be probably only at most of these nodes in the
                // final path, not multiple
                newGScore += wiresCrossed * wireCrossPunishment;

                // skip this node if it has worst estimage gscore than in the gscore table
                if (newGScore >= gScore.getWithDefault(newPoint)) {
                    continue;
                }

                cameFrom.set(newPoint, currentNode);
                gScore.set(newPoint, newGScore);

                var newFScore = newGScore + distanceFunction(newPoint, end);

                if (!openNodes.has(newPoint)) {
                    // add the point to the list of points
                    addOpenNode(newPoint, newFScore);
                }

                // move to the next point in the direciton
                newPoint = movePoint(newPoint, direction);
            }
        }

        if (openNodes.size > maxNodeLimit) {
            console.log('aStar: Number of open nodes (' + openNodes.size + ') exceeded the limit for open nodes (' + maxNodeLimit + ').');
            break;
        }
    }
    // if we got here, the path was not found

    return undefined;
}

/**
 * returns `true` if the specified set of points contains the specified point (and returns `false` otherwise)
 * @param {Set} set set of points
 * @param {Object} point object containing numeric attributes `x` and `y`
 */
function setHasThisPoint(set, point) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (item.x === point.x && item.y === point.y) {
                return true;
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

    return false;
}

/**
 * Helper that moves the passed point in the specified direction. It simply adds or subtracts 1 from one of the coordinates depending on the direction attribute.
 * @param  {Object} point     object containing numeric attributes `x` and `y`
 * @param  {number} direction directions:
 *     - 0: up
 *     - 1: right
 *     - 2: down
 *     - 3: left
 * @return {Object}           object containing numeric attributes `x` and `y`
 */
function movePoint(_ref, direction) {
    var x = _ref.x,
        y = _ref.y;

    // map direction do point coordinate modification
    var dirMap = {
        0: function _() {
            y -= 1;
        },
        1: function _() {
            x += 1;
        },
        2: function _() {
            y += 1;
        },
        3: function _() {
            x -= 1;
        }
    };

    dirMap[direction]();

    return { x: x, y: y };
}

/**
 * helper backtracking function used by the aStar algorithm to construct the final path
 * @param  {Object} cameFrom    object containing numeric attributes `x` and `y`
 * @param  {Object} currentNode object containing numeric attributes `x` and `y`
 * @return {Array} array of objects containing numeric attributes `x` and `y`
 */
function reconstructPath(cameFrom, currentNode) {
    var path = [];

    path.push({
        x: currentNode.x,
        y: currentNode.y
    });

    while (cameFrom.has(currentNode)) {
        currentNode = cameFrom.get(currentNode);
        // push the point on the beginning of the array instead of the end
        path.splice(0, 0, {
            x: currentNode.x,
            y: currentNode.y
        });
    }

    return path;
}

},{"./other/helperFunctions":11,"./other/mapWithDefaultValue":12,"libstl":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addMouseScrollEventListener = addMouseScrollEventListener;
exports.getJSONString = getJSONString;
exports.manhattanDistance = manhattanDistance;

var _jsonStringifyPrettyCompact = require("json-stringify-pretty-compact");

var _jsonStringifyPrettyCompact2 = _interopRequireDefault(_jsonStringifyPrettyCompact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// note: imported from a module

/**
 * add a cross browser event listener on a mouse scroll
 * @param {string} query DOM query of the element that the listener will be added to
 * @param {Function} func  Function that will be called when the event occurs. The function takes as a parameter an event object.
 */
function addMouseScrollEventListener(query, func) {
    var MouseWheelHandler = function MouseWheelHandler(event) {
        // redeclare for old IE support
        var event = window.event || event; // eslint-disable-line no-redeclare

        event.delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));

        func(event);

        return false;
    };

    var svgelement = void 0;

    // if the query is a simple DOM id selector, we can use getElementById which has better backwards compatibility
    if (query.match(/^#\w+$/)) {
        svgelement = document.getElementById(query.substr(1));
    } else {
        svgelement = document.querySelector(query);
    }

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

/**
 * convert a data object to JSON string or to a data URI containing a JSON string
 * @param  {Object}  data            object that will be serialized into a JSON string
 * @param  {Boolean} [pretty=false]  if `true`, the code will be proprerly indented, else a more compact syntax will be used
 * @param  {Boolean} [dataUri=false] return dataUri containing the JSON string instead of the pure JSON string
 * @return {string}
 */
/**
 * @module HelperFunctions
 */

function getJSONString(data) {
    var pretty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var dataUri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (dataUri) {
        return 'data:application/json;charset=utf-8,' + encodeURIComponent(getJSONString(data, pretty));
    } else {
        if (pretty) return (0, _jsonStringifyPrettyCompact2.default)(data, { maxLength: 50 });

        return JSON.stringify(data);
    }
}

/**
 * returns the Manhattan distance between the points _a_ and _b_
 * @param  {Object} a object containing numeric attributes `x` and `y`
 * @param  {Object} b object containing numeric attributes `x` and `y`
 * @return {number}
 */
function manhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

},{"json-stringify-pretty-compact":1}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (defaultValue) {
    var map = new Map();
    /**
     * @param  {any} key key of a requested item
     * @return {any} value of the item with the corresponding key, or defaultValue if the key is not found in the map
     */
    map.getWithDefault = function (key) {
        return map.has(key) ? map.get(key) : defaultValue;
    };
    return map;
};

},{}],13:[function(require,module,exports){
"use strict";

/** @module routeWorker */

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _findPath = require("./modules/findPath");

var _findPath2 = _interopRequireDefault(_findPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * callback when a message is sent to the web worker
 *
 * @param {Object} event web worker event object (the `data` item of the event object is expected to contain
 *                       these items: `wires` (array), `nonRoutableNodes` (iterable) and `inconvenientNodes` (iterable))
 */
onmessage = function onmessage(event) {
    var _event$data = event.data,
        wires = _event$data.wires,
        nonRoutableNodes = _event$data.nonRoutableNodes,
        inconvenientNodes = _event$data.inconvenientNodes;


    var paths = findPaths(wires, nonRoutableNodes, inconvenientNodes);

    postMessage({ paths: paths });
    close();
};

/**
 * find paths for all the specified wires
 * @param  {Array} wires              array of objects with attributes `from` and `to`, both of them which are objects
 *                                    with values `x` and `y` containing coordinates of the wire endpoints
 * @param  {Iterable} nonRoutableNodes  Set or array of non routable nodes
 * @param  {Iterable} inconvenientNodes Set or array of inconvenient nodes
 * @return {Array}                    array of paths, each item is an array of points of the path
 *                                    the returned array contains paths for the wires with corresponding indexes from the `wires` parameter
 */
function findPaths(wires, nonRoutableNodes, inconvenientNodes) {
    var paths = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = wires[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var from = _ref2[0];
            var to = _ref2[1];

            var path = (0, _findPath2.default)(from, to, nonRoutableNodes, inconvenientNodes);

            if (!path) {
                console.log("path not found");
                console.log(from, to);
            } else {
                console.log("path found");
            }

            paths.push(path);

            // add new inconvenient nodes created by this new path
            var prevPoint = void 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = path[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var point = _step2.value;

                    if (prevPoint) {
                        if (point.x === prevPoint.x) {
                            // horizontal section of the path
                            for (var y = Math.min(point.y, prevPoint.y); y <= Math.max(point.y, prevPoint.y); ++y) {
                                inconvenientNodes.add({
                                    x: point.x,
                                    y: y
                                });
                            }
                        } else if (point.y === prevPoint.y) {
                            // vertical section of the path
                            for (var x = Math.min(point.x, prevPoint.x); x <= Math.max(point.x, prevPoint.x); ++x) {
                                inconvenientNodes.add({
                                    x: x,
                                    y: point.y
                                });
                            }
                        }
                    }

                    prevPoint = point;
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

    return paths;
}

},{"./modules/findPath":10}]},{},[13])

//# sourceMappingURL=routeWorker.js.map
