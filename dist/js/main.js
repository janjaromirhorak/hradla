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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svgObjects = require('./svgObjects');

var svgObj = _interopRequireWildcard(_svgObjects);

var _editorElements = require('./editorElements');

var editorElements = _interopRequireWildcard(_editorElements);

var _logic = require('./logic');

var _logic2 = _interopRequireDefault(_logic);

var _contextMenu = require('./contextMenu');

var _contextMenu2 = _interopRequireDefault(_contextMenu);

var _floatingMenu = require('./floatingMenu');

var _floatingMenu2 = _interopRequireDefault(_floatingMenu);

var _simulation = require('./simulation');

var _simulation2 = _interopRequireDefault(_simulation);

var _helperFunctions = require('./helperFunctions');

var _tutorial = require('./tutorial');

var _tutorial2 = _interopRequireDefault(_tutorial);

var _libstl = require('libstl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// note: imported from a node module

/**
 * ViewBox provides an api for oprerating with the viewBox argument of the <svg> DOM element.
 */
var ViewBox = function () {
    /**
     * Initialize viewBox
     * @param {number} left   distance of the left edge of the viewbox from document's y axis in SVG pixels
     * @param {number} top    distance of the top edge of the viewbox from the document's x axis in SVG pixels
     * @param {number} width  width of the viewbox in SVG pixels
     * @param {number} height height of the viewbox in SVG pixels
     */
    function ViewBox(left, top, width, height) {
        _classCallCheck(this, ViewBox);

        /**
         * ViewBox attributes before applying zoom and shift
         * @type {object}
         */
        this.real = { left: left, top: top, width: width, height: height

            /**
             * The maximum amount of zoom on the viewbox
             * @type {number}
             */
        };this.maxZoom = 8;
        /**
         * The minimum amount of zoom on the viewbox
         * @type {number}
         */
        this.minZoom = 0.1;

        /**
         * Amount of zoom on the viewbox, always between this.minZoom and this.maxZoom
         * @type {number}
         */
        this.realZoom = 1;

        /**
         * amount of horizontal shift of the document
         * @type {number}
         */
        this.leftShift = 0;
        /**
         * amount of vertical shift of the document
         * @type {number}
         */
        this.topShift = 0;
    }

    /**
     * get the amount of zoom on the viewbox
     * @return {number}
     */


    _createClass(ViewBox, [{
        key: 'transformX',


        /**
         * transform horizontal units to the scale and shift of the editor
         * @param  {number} x original horizontal value
         * @return {number}   transformed horizontal value
         */
        value: function transformX(x) {
            return this.left + x / this.zoom;
        }

        /**
         * transform vertical units to the scale and shift of the editor
         * @param  {number} y original vertical value
         * @return {number}   transformed vertical value
         */

    }, {
        key: 'transformY',
        value: function transformY(y) {
            return this.top + y / this.zoom;
        }

        /**
         * transform pageX and pageY parameters of the jquery event to match the zoom and shift of the viewbox
         * @param  {jquery.MouseEvent} event original event
         * @return {jquery.MouseEvent}       the same event but with transformed pageX and pageY members
         */

    }, {
        key: 'transformEvent',
        value: function transformEvent(event) {
            event.pageX = this.transformX(event.pageX);
            event.pageY = this.transformY(event.pageY);

            return event;
        }
    }, {
        key: 'zoom',
        get: function get() {
            return this.realZoom;
        }

        /**
         * set the amount of zoom on the viewbox
         * @param {number} value the new amount of zoom
         */
        ,
        set: function set(value) {
            // fit this.realZoom to fit between this.minZoom and this.maxZoom
            this.realZoom = Math.max(Math.min(value, this.maxZoom), this.minZoom);
        }

        /**
         * get the width of the viewbox with the current zoom applied
         * @return {number} the final width of the viewbox
         */

    }, {
        key: 'width',
        get: function get() {
            return this.real.width / this.zoom;
        }

        /**
         * get the height of the viewbox with the current zoom applied
         * @return {number} the final height of the viewbox
         */

    }, {
        key: 'height',
        get: function get() {
            return this.real.height / this.zoom;
        }

        /**
         * get the horizontal distance from the y axis of the document with zoom and shift value applied
         * @return {number}
         */

    }, {
        key: 'left',
        get: function get() {
            return this.real.left - this.leftShift / this.zoom + (this.real.width - this.width) / 2;
        }

        /**
         * get the vertical distance from the x axis of the document with zoom and shift value applied
         * @return {number}
         */

    }, {
        key: 'top',
        get: function get() {
            return this.real.top - this.topShift / this.zoom + (this.real.height - this.height) / 2;
        }

        /**
         * get the computed viewbox values as a string in the correct format that can be used in the viewBox attribute of the SVG element
         * @return {string} string in format "left top width height"
         */

    }, {
        key: 'str',
        get: function get() {
            return this.left + ' ' + this.top + ' ' + this.width + ' ' + this.height;
        }
    }]);

    return ViewBox;
}();

var ctrlKey = 17,
    cmdKey = 91;

/** @module Canvas */
/**
 * Main class of the application. It represents an instance of the whole editor and holds
 * references to all its elements.
 */

var Canvas = function () {
    /**
     * Initialize the Svg class
     * @param {string} canvas   query selector of the SVG element, that will contain all SVG content of the application
     * @param {number} gridSize initial size of the grid in SVG pixels
     */
    function Canvas(canvas, gridSize) {
        var _this = this;

        _classCallCheck(this, Canvas);

        /**
         * jQuery element for the SVG document
         */
        this.$svg = $(canvas);

        /**
         * space between grid lines in SVG pixels
         * @type {number}
         */
        this.gridSize = gridSize;

        /**
         * Array of all boxes (instances of objects derived from editorElements.Box) used on Canvas
         * @type {Array}
         */
        this.boxes = []; // stores all boxes

        /**
         * Array of all wires (instances of editorElements.Wire) used on Canvas
         * @type {Array}
         */
        this.wires = []; // stores all wires

        this.simulationEnabled = true;
        this.simulation = new _simulation2.default(this); // dummy, will be overwritten on startNewSimulation

        /**
         * distance from the left top corner to the first element in the imported network
         * and distance from the left top corner to the imported black box _in grid pixels_
         * @type {number}
         */
        this.leftTopPadding = 4;

        // create the defs element, used for patterns
        this.$defs = $("<defs>");
        this.$svg.prepend(this.$defs);

        // BACKGROUND PATTERN
        var pattern = new svgObj.Pattern("grid", this.gridSize, this.gridSize);

        var patternPoints = new svgObj.PolylinePoints().append(new svgObj.PolylinePoint(0, 0)).append(new svgObj.PolylinePoint(this.gridSize, 0)).append(new svgObj.PolylinePoint(this.gridSize, this.gridSize));

        pattern.addChild(new svgObj.PolyLine(patternPoints, 2, "#a3a4d2"));
        this.addPattern(pattern.get());

        this.background = new svgObj.Rectangle(0, 0, this.width, this.height, "url(#grid)", "none");
        this.appendJQueryObject(this.background.get());
        this.refresh();

        // set the viewbox for future zooming and moving of the canvas
        this.$svg.attr('preserveAspectRatio', 'xMinYMin slice');
        this.viewbox = new ViewBox(0, 0, this.width, this.height);
        this.applyViewbox();

        // CONSTRUCT CONTEXT MENU
        this.contextMenu = new _contextMenu2.default(this);

        // CONSTRUCT FLOATING MENU
        this.floatingMenu = new _floatingMenu2.default(this);

        var target = void 0;

        // ALL EVENT CALLBACKS
        this.$svg.on('mousedown', function (event) {
            target = _this.getRealTarget(event.target);

            if (target !== undefined) {
                // propagate mousedown to the real target
                target.onMouseDown(event);
            } else {
                // mousedown happened directly on the svg
                _this.onMouseDown(event);
            }

            _this.hideContextMenu();
            event.preventDefault();
        }).on('mousemove', function (event) {
            if (target !== undefined) {
                target.onMouseMove(event);
            } else {
                // mousemove happened directly on the svg
                _this.onMouseMove(event);
            }

            event.preventDefault();
        }).on('mouseup', function (event) {
            if (target !== undefined) {
                target.onMouseUp(event);
            } else {
                // mouseup happened directly on the svg
                _this.onMouseUp(event);
            }

            target = undefined;

            event.preventDefault();
        }).on("contextmenu", function (event) {
            _this.displayContextMenu(event.pageX, event.pageY, _this.getRealJQueryTarget(event.target));
            event.preventDefault();
        });

        $(document).on('keydown', function (event) {
            _this.onKeyDown(event);
        }).on("keyup", function (event) {
            _this.onKeyUp(event);
        });

        (0, _helperFunctions.addMouseScrollEventListener)(canvas, function (event) {
            // zoom only if the ctrl key is pressed
            if (event.ctrlKey) {
                switch (event.delta) {
                    case 1:
                        _this.zoom += 0.1;
                        break;
                    case -1:
                        _this.zoom -= 0.1;
                        break;
                }
            }

            event.preventDefault();
        });

        /**
         * property containing an instance of [Tutorial](./module-Tutorial.html), if there is any
         * @type {Tutorial}
         */
        this.tutorial;

        // check if the user visits for the first time, if so, start the tutorial
        try {
            if (!localStorage.userHasVisited) {
                this.startTutorial();
            }
        } catch (e) {
            console.warn(e);
        }
    }

    /**
     * Get the width of the main SVG element
     * @return {number} width of the SVG element in pixels
     */


    _createClass(Canvas, [{
        key: 'onKeyDown',


        /**
         * Process all keydown events that are connected to Canvas
         * @param  {jquery.KeyboardEvent} event KeyboardEvent generated by a listener
         */
        value: function onKeyDown(event) {
            if (event.keyCode === ctrlKey || event.keyCode === cmdKey) {
                this.$svg.addClass('grabbable');
            }
        }

        /**
         * Process all keyup events that are connected to Canvas
         * @param  {jquery.KeyboardEvent} event KeyboardEvent generated by a listener
         */

    }, {
        key: 'onKeyUp',
        value: function onKeyUp(event) {
            if (event.keyCode === ctrlKey || event.keyCode === cmdKey) {
                this.$svg.removeClass('grabbable');
            }
        }

        /**
         * Process all mousedown events that are happening directly on the Canvas
         * @param  {jquery.MouseEvent} event MouseEvent generated by a listener
         */

    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            // middle mouse or left mouse + ctrl moves the canvas
            if (event.which === 2 || event.which === 1 && event.ctrlKey) {
                this.$svg.addClass('grabbed');
                this.moveCanvas = {
                    left: event.pageX,
                    top: event.pageY
                };
            }
        }

        /**
         * Process all mousemove events that are happening directly on the Canvas
         * @param  {jquery.MouseEvent} event MouseEvent generated by a listener
         */

    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
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
        }

        /**
         * Process all mouseup events that are happening directly on the Canvas
         */

    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            if (this.moveCanvas) {
                this.$svg.removeClass('grabbed');
                this.moveCanvas = undefined;

                // if tutorial exists, call tutorial callback
                if (this.tutorial) {
                    this.tutorial.onCanvasMoved();
                }
            }
        }

        /**
         * Set the viewBox attribute of the SVG element and size and position attributes
         * of the rectangle with the background grid to match the values in this.viewbox
         */

    }, {
        key: 'applyViewbox',
        value: function applyViewbox() {
            // adjust background
            this.background.addAttr({
                x: this.viewbox.left,
                y: this.viewbox.top,
                width: this.viewbox.width,
                height: this.viewbox.height
            });

            // set the viewBox attribute
            this.$svg.attr('viewBox', this.viewbox.str);
        }

        /**
         * Get the current zoom multiplier of the canvas
         * @return {number}
         */

    }, {
        key: 'startTutorial',


        /**
         * start the tutorial
         */
        value: function startTutorial() {
            var _this2 = this;

            // instantiate the tutorial
            this.tutorial = new _tutorial2.default(this, function () {
                // set userHasVisited to true when user closes (or finishes) the tutorial
                localStorage.userHasVisited = true;

                // unset the this.tutorial property
                _this2.tutorial = undefined;
            });

            // start the tutorial
            this.tutorial.start();
        }

        /**
         * Generate an object containing export data for the Canvas and all elements.
         * Data from this function should cover all important information needed to import the
         * network in a different session.
         * @return {object} object containing infomration about the network
         */

    }, {
        key: 'importData',


        /**
         * Recreate a logic network from the data provided
         * @param  {object} data object containing information about the imported network
         * @param  {number} [x]  horizontal position of the left top corner of the network in grid pixels
         * @param  {number} [y]  vertical position of the left top corner of the network in grid pixels
         */
        value: function importData(data, x, y) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                // if the x or y is undefined, set it to leftTopPadding instead
                // (cannot use x || leftTopPadding because of 0)

                x = x !== undefined ? x : _this3.leftTopPadding;
                y = y !== undefined ? y : _this3.leftTopPadding;

                _this3.simulationEnabled = false;

                // list of wires to be added
                var newWires = new Map();

                // find the leftmost and topmost coordinate of any box, save them to leftTopCorner
                var leftTopCorner = void 0;

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.boxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var boxData = _step.value;
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = boxData.transform.items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var transformInfo = _step5.value;

                                if (transformInfo.name === "translate") {
                                    if (leftTopCorner) {
                                        leftTopCorner = {
                                            x: Math.min(leftTopCorner.x, transformInfo.args[0]),
                                            y: Math.min(leftTopCorner.y, transformInfo.args[1])
                                        };
                                    } else {
                                        leftTopCorner = {
                                            x: transformInfo.args[0],
                                            y: transformInfo.args[1]
                                        };
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
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

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = data.boxes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _boxData = _step2.value;

                        // add box
                        var box = void 0;
                        switch (_boxData.category) {
                            case "gate":
                                // add new gate (without reloading the SVG, we will reload it once after the import)
                                box = _this3.newGate(_boxData.name, 0, 0, false);
                                break;
                            case "other":
                                switch (_boxData.name) {
                                    case "input":
                                        // add new input (without reloading the SVG, we will reload it once after the import)
                                        box = _this3.newInput(0, 0, _boxData.isOn, false);
                                        break;
                                    case "output":
                                        // add new output (without reloading the SVG, we will reload it once after the import)
                                        box = _this3.newOutput(0, 0, false);
                                        break;
                                    case "repeater":
                                        // add new output (without reloading the SVG, we will reload it once after the import)
                                        box = _this3.newRepeater(0, 0, false);
                                        break;
                                    default:
                                        reject("Unknown io box name '" + _boxData.name + "'.");
                                        break;
                                }
                                break;
                            case "blackbox":
                                box = _this3.newBlackbox(_boxData.inputs, _boxData.outputs, _boxData.table, _boxData.name, 0, 0, false);
                                break;
                            default:
                                reject("Unknown box category '" + _boxData.category + "'.");
                        }

                        if (box) {
                            // proccess box transforms (translation and rotation)
                            var transform = new editorElements.Transform();

                            for (var j = 0; j < _boxData.transform.items.length; ++j) {
                                switch (_boxData.transform.items[j].name) {
                                    case "translate":
                                        transform.setTranslate(_boxData.transform.items[j].args[0] - leftTopCorner.x // make it the relative distance from the leftmost element
                                        + x // apply the position


                                        , _boxData.transform.items[j].args[1] - leftTopCorner.y // make it the relative distance from the topmost element
                                        + y // apply the position
                                        );
                                        break;
                                    case "rotate":
                                        transform.setRotate(_boxData.transform.items[j].args[0], _boxData.transform.items[j].args[1], _boxData.transform.items[j].args[2]);
                                        break;
                                    default:
                                        reject("Unknown transform property '" + _boxData.transform.items[j].name + "'.");
                                        break;
                                }
                            }

                            transform.toSVGPixels(_this3);
                            box.setTransform(transform);

                            // add all wires to the list of wires to be added
                            for (var _j = 0; _j < _boxData.connections.length; ++_j) {
                                // get the artificial wire id
                                var wireId = _boxData.connections[_j].wireId;

                                // pass the values got from json into a variable that will be added into the map
                                var value = {
                                    index: _boxData.connections[_j].index,
                                    boxId: box.id
                                };

                                // add the value to the map
                                if (newWires.has(wireId)) {
                                    // if there already is a wire with this id in the map,
                                    // add the value to the end of the array of values
                                    var mapValue = newWires.get(wireId);
                                    mapValue.push(value);
                                    newWires.set(wireId, mapValue);
                                } else {
                                    // if there is no wire with this id in the map
                                    // add the wire and set the value to be the first element in the array
                                    newWires.set(wireId, [value]);
                                }
                            }
                        }
                    }

                    // refresh the SVG document (needed for wiring)
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

                _this3.refresh();

                // with all boxes added, we can now connect them with wires

                // priority queue for the new wires, priority being (1 / manhattanDistance) between the conenctors, higher is better
                var wireQueue = new _libstl.PriorityQueue();

                // get all ids for lal the
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = newWires.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var wireInfo = _step3.value;

                        var connectorIds = [];

                        // create an array [connector1Id, connector2Id]
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = wireInfo[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var _ref = _step6.value;
                                var boxId = _ref.boxId;
                                var index = _ref.index;

                                connectorIds.push(_this3.getBoxById(boxId).connectors[index].id);
                            }

                            // create and array [{x, y}, {x, y}] containing positions for connectors 1 and 2
                        } catch (err) {
                            _didIteratorError6 = true;
                            _iteratorError6 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                    _iterator6.return();
                                }
                            } finally {
                                if (_didIteratorError6) {
                                    throw _iteratorError6;
                                }
                            }
                        }

                        var connectorsPositions = connectorIds.map(function (connectorId) {
                            return _this3.getConnectorPosition(_this3.getConnectorById(connectorId), true);
                        });

                        var wire = _this3.newWire.apply(_this3, connectorIds.concat([false, false]));

                        // get the manhattan distance between these two connectors
                        var distance = _helperFunctions.manhattanDistance.apply(undefined, _toConsumableArray(connectorsPositions));

                        // add connectorids to the priority queue
                        wireQueue.enqueue(wire, 1 / distance);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                if (window.Worker) {
                    var wirePoints = [];
                    var wireReferences = [];

                    // convert the queue to an array (this is needed by the web worker)
                    while (!wireQueue.isEmpty()) {
                        var wire = wireQueue.dequeue();

                        var wireStart = _this3.getConnectorPosition(wire.startConnector, true);
                        var wireEnd = _this3.getConnectorPosition(wire.endConnector, true);

                        wirePoints.push([{
                            x: wireStart.x / _this3.gridSize,
                            y: wireStart.y / _this3.gridSize
                        }, {
                            x: wireEnd.x / _this3.gridSize,
                            y: wireEnd.y / _this3.gridSize
                        }]);

                        wireReferences.push(wire);
                    }

                    var myWorker = new Worker("js/routeWorker.js");

                    myWorker.onmessage = function (event) {
                        var paths = event.data.paths;
                        // iterate wireReferences and paths synchronously

                        wireReferences.forEach(function (wire, key) {
                            wire.setWirePath(wire.pathToPolyline(paths[key]));
                            wire.updateWireState();
                        });
                    };

                    var message = {
                        wires: wirePoints,
                        nonRoutableNodes: _this3.getNonRoutableNodes(),
                        inconvenientNodes: _this3.getInconvenientNodes()
                    };

                    myWorker.postMessage(message);
                } else {}
                // TODO
                // add wires in the order from short to long
                /**
                while(!wireQueue.isEmpty()) {
                    const connectors = wireQueue.dequeue();
                    this.newWire(...connectors, false);
                }
                */


                // refresh the SVG document
                _this3.refresh();

                _this3.simulationEnabled = true;
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = _this3.boxes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var box = _step4.value;

                        if (box instanceof editorElements.InputBox) {
                            // switch the input box state to the opposite and back:
                            // for some reason calling box.refreshState()
                            // results in weird unfinished simulation
                            // this causes update of the output connector and a start of a new simulation

                            // TODO find better solution instead of this workaround, if there is any
                            box.on = !box.on;
                            box.on = !box.on;
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                resolve();
            });
        }

        /**
         * When user clicks on a connector, remember it until they click on some other connector.
         * Than call newWire with the last two connectors ids as arguments.
         * @param  {string} connectorId id of the connector that the user clicked on
         */

    }, {
        key: 'wireCreationHelper',
        value: function wireCreationHelper(connectorId) {
            if (!this.firstConnectorId) {
                this.firstConnectorId = connectorId;
            } else {
                this.newWire(this.firstConnectorId, connectorId);
                this.firstConnectorId = undefined;
            }
        }

        /**
         * Run a logic simulation from the startingConnector.
         * This refreshes the states of all elements in the network whose inputs are
         * directly (or by transition) connected to startingConnector's output
         * @param  {OutputConnector} startingConnector run simulation from this output connector
         * @param  {Logic.state} state new state of the startingConnector
         */

    }, {
        key: 'startNewSimulation',
        value: function startNewSimulation(startingConnector, state) {
            if (this.simulationEnabled) {
                this.simulation = new _simulation2.default(this);
                this.simulation.notifyChange(startingConnector.id, state);
                this.simulation.run();
            }
        }

        /**
         * Create a new gate on the specified position
         * @param  {string}  name           type of the gate (and, or ...)
         * @param  {number}  x              horizontal position of the gate in SVG pixels
         * @param  {number}  y              vertical position of the gate in SVG pixels
         * @param  {boolean} [refresh=true] if true, this.refresh() will be called after adding the gate
         * @return {editorElements.Gate}    instance of Gate that has been newly added
         */

    }, {
        key: 'newGate',
        value: function newGate(name, x, y) {
            var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            return this.newBox(x, y, new editorElements.Gate(this, name, x, y), refresh);
        }

        /**
         * Create an input box on the specified position
         * @param  {number}  x              horizontal position of the gate in SVG pixels
         * @param  {number}  y              vertical position of the gate in SVG pixels
         * @param  {boolean} [isOn=false]   state of the input box (default is false (off))
         * @param  {boolean} [refresh=true] if true, this.refresh() will be called after adding the input box
         * @return {editorElements.InputBox}    instance of the InputBox that has been newly added
         */

    }, {
        key: 'newInput',
        value: function newInput(x, y) {
            var isOn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            return this.newBox(x, y, new editorElements.InputBox(this, isOn), refresh);
        }

        /**
         * Create an output box on the specified position
         * @param  {number}  x              horizontal position of the gate in SVG pixels
         * @param  {number}  y              vertical position of the gate in SVG pixels
         * @param  {boolean} [refresh=true] if true, this.refresh() will be called after adding the output box
         * @return {editorElements.InputBox}    instance of the OutputBox that has been newly added
         */

    }, {
        key: 'newOutput',
        value: function newOutput(x, y) {
            var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            return this.newBox(x, y, new editorElements.OutputBox(this), refresh);
        }
    }, {
        key: 'newRepeater',
        value: function newRepeater(x, y) {
            var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            return this.newBox(x, y, new editorElements.Repeater(this), refresh);
        }

        /**
         * Add a new Box to the Canvas
         * @param  {number}  x              horizontal position of the box in SVG pixels
         * @param  {number}  y              vertical position of the box in SVG pixels
         * @param  {editorElements.Box}  object         instance of an object derived from the editorElements.Box class
         * @param  {Boolean} [refresh=true] if true, this.refresh() will be called after adding the box
         * @return {editorElements.Box}                 return the instance of the newly added object
         */

    }, {
        key: 'newBox',
        value: function newBox(x, y, object) {
            var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            var index = this.boxes.length;

            this.boxes[index] = object;

            // translate the gate if x and y has been specified
            if (x && y) {
                var tr = new editorElements.Transform();
                tr.setTranslate(x, y);

                this.boxes[index].svgObj.addAttr({ "transform": tr.get() });
            }

            this.appendElement(this.boxes[index], refresh);

            // if tutorial exists, call tutorial callback
            if (this.tutorial) {
                this.tutorial.onElementAdded(this.boxes[index].name);
            }

            return this.boxes[index];
        }

        /**
         * Remove a box from Canvas based on the provided ID
         * @param {string} boxId id of the box that should be removed
         */

    }, {
        key: 'removeBox',
        value: function removeBox(boxId) {
            var $gate = $("#" + boxId);

            // find the gate in svg's list of gates
            var gateIndex = -1;
            for (var i = 0; i < this.boxes.length; i++) {
                if (this.boxes[i].svgObj.id === boxId) {
                    gateIndex = i;
                    break;
                }
            }

            if (gateIndex > -1) {
                // remove all wires connected to this gate
                for (var _i = 0; _i < this.boxes[gateIndex].connectors.length; _i++) {
                    this.removeWiresByConnectorId(this.boxes[gateIndex].connectors[_i].svgObj.id);
                }

                // remove the gate
                this.boxes.splice(gateIndex, 1);
                $gate.remove();

                // if tutorial exists, call tutorial callback
                if (this.tutorial) {
                    this.tutorial.onElementRemoved();
                }
            } else {
                console.error("Trying to remove an nonexisting box. Box id:", boxId);
            }
        }

        /**
         * Remove all boxes from the canvas
         */

    }, {
        key: 'cleanCanvas',
        value: function cleanCanvas() {
            // cannot simply iterate through the array because removeBox works with it

            // create an array of ids
            var ids = this.boxes.map(function (box) {
                return box.id;
            });

            // remove all boxes by their ids
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = ids[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var id = _step7.value;

                    this.removeBox(id);
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }
        }

        /**
         * Create a new wire connecting the provided connectors
         * @param  {string}  fromId         id of the connector that the wire is attached to
         * @param  {string}  toId           id of the connector that the wire is attached to
         * @param  {Boolean} [refresh=true] if refresh is set to true, the SVG document will be reloaded after adding the wire
         * @return {editorElements.Wire}    instance of editorElements.Wire that has been added to the Canvas
         */

    }, {
        key: 'newWire',
        value: function newWire(fromId, toId) {
            var _this4 = this;

            var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var route = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            // wire must connect two distinct connectors
            if (fromId === toId) return false;

            var connectors = [this.getConnectorById(fromId), this.getConnectorById(toId)];

            // input connectors can be connected to one wire max
            connectors.forEach(function (conn) {
                if (conn.isInputConnector) _this4.removeWiresByConnectorId(conn.id);
            });
            var index = this.wires.length;
            this.wires[index] = new editorElements.Wire(this, fromId, toId, refresh, route);

            connectors.forEach(function (conn) {
                conn.addWireId(_this4.wires[index].svgObj.id);
            });

            this.appendElement(this.wires[index], refresh);
            this.moveToBackById(this.wires[index].svgObj.id);

            if (refresh) this.wires[index].updateWireState();

            return this.wires[index];
        }

        /**
         * get the coordinates of the specified connector
         * @param  {Connector}  connector      instance of {@link Connector}
         * @param  {Boolean} [snapToGrid=true] if true, the connector position will be snapped to the grid
         * @return {Object}                    point - object containing numeric attributes `x` and `y`
         */

    }, {
        key: 'getConnectorPosition',
        value: function getConnectorPosition(connector) {
            var snapToGrid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            // connector.svgObj.id has to be called, else the getCoordinates does not work on the first call in Firefox 55
            var dummy = connector.svgObj.id; // eslint-disable-line no-unused-vars

            var $connector = connector.svgObj.$el;

            var position = $connector.position();

            position.left = this.viewbox.transformX(position.left);
            position.top = this.viewbox.transformY(position.top);

            var width = $connector.attr("width");
            var height = $connector.attr("height");

            var x = position.left + width / 2;
            var y = position.top + height / 2;
            if (snapToGrid) {
                x = this.snapToGrid(x);
                y = this.snapToGrid(y);
            }

            return {
                x: x,
                y: y
            };
        }

        /**
         * creates a new blackbox
         * @param  {number} x       horizontal position of the blackbox in SVG pixels
         * @param  {number} y       vertical position of the gate in SVG pixels
         * @param  {number} inputs  number of input pins of this blackbox
         * @param  {number} outputs number of output pins of this blackbox
         * @param  {Array} table   Array of arrays, each inner array contains list of [Logic.state](./module-Logic.html#.state)s,
         *                          that describe the combination of input pin and output pin states in the order from the top to bottom for both input and output connectors.
         *                          If we had an AND array as a blackbox, one of the states could be `[Logic.state.on, Logic.state.off, Logic.state.off]`
         *                          which means that if the first input connector is in the `on` state and the second connector is in the `off` state,
         *                          the state of the output connector will be `off`.
         *                          The array can be described as `[state for input conn 1, state for input conn 2, ..., state for output conn 1, state for output conn 2 ...]`.
         * @param  {string}  name   a name that will be displayed on the blackbox
         * @param  {boolean} [refresh=true] if true, this.refresh() will be called after adding the gate
         *
         * @return {editorElements.Blackbox} instance of {@link Blackbox} that has been added to the [Canvas](./module-Canvas.html)
         */

    }, {
        key: 'newBlackbox',
        value: function newBlackbox(inputs, outputs, table, name, x, y) {
            var refresh = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

            var index = this.boxes.length;

            this.boxes[index] = new editorElements.Blackbox(this, inputs, outputs, function () {
                for (var _len = arguments.length, inputStates = Array(_len), _key = 0; _key < _len; _key++) {
                    inputStates[_key] = arguments[_key];
                }

                var _loop = function _loop(line) {
                    var lineInputStates = line.slice(0, inputs);

                    // if every input state matches the corresponding input state in this line of the truth table
                    if (inputStates.every(function (value, index) {
                        return value === lineInputStates[index];
                    })) {
                        // return the rest of the line as output
                        return {
                            v: line.slice(inputs)
                        };
                    }
                };

                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = table[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var line = _step8.value;

                        var _ret = _loop(line);

                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                    }
                    // if nothing matches, set all outputs to undefined
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                            _iterator8.return();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }

                return Array.from(new Array(outputs), function () {
                    return _logic2.default.state.unknown;
                });
            }, name);

            if (x && y) {
                var tr = new editorElements.Transform();
                tr.setTranslate(x, y);

                this.boxes[index].svgObj.addAttr({ "transform": tr.get() });
            }

            this.appendElement(this.boxes[index], refresh);

            return this.boxes[index];
        }

        /**
         * Find the correct instance of editorElements.Wire in the Canvas' wires by the provided id
         * @param  {string} wireId id of the wire
         * @return {editorElements.Wire} instance of the wire
         */

    }, {
        key: 'getWireById',
        value: function getWireById(wireId) {
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = this.wires[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var wire = _step9.value;

                    if (wire.svgObj.id === wireId) {
                        return wire;
                    }
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            return false;
        }

        /**
         * Find all wires that are connected to the specified connector
         * @param  {string} connectorId id of the connector
         * @return {Set} set of ID's of the wires connected to this connector
         */

    }, {
        key: 'getWiresByConnectorId',
        value: function getWiresByConnectorId(connectorId) {
            var connector = this.getConnectorById(connectorId);
            return connector.wireIds;
        }

        /**
         * Remove wire that has the provided ID
         * @param  {string} wireId ID of the wire that should be removed
         */

    }, {
        key: 'removeWireById',
        value: function removeWireById(wireId) {
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
        }

        /**
         * Remove all wires that are connected to the connector provided by its ID
         * @param  {string} connectorId ID of the connector
         */

    }, {
        key: 'removeWiresByConnectorId',
        value: function removeWiresByConnectorId(connectorId) {
            var _this5 = this;

            var connector = this.getConnectorById(connectorId);

            connector.wireIds.forEach(function (wireId) {
                var wire = _this5.getWireById(wireId);

                // get the other connector that is the wire connected to
                var otherConnector = _this5.getConnectorById(wire.fromId, wire);
                if (otherConnector.svgObj.id === connectorId) {
                    otherConnector = _this5.getConnectorById(wire.toId, wire);
                }

                // delete the wire record from the other connector
                otherConnector.wireIds.delete(wireId);

                // remove the wire representation using jQuery
                $("#" + wireId).remove();

                // if otherConnector is an input connector, set its state to unknown
                if (otherConnector.isInputConnector) {
                    _this5.startNewSimulation(otherConnector, _logic2.default.state.unknown);
                }
            });

            // clear the list of wire Ids
            connector.wireIds.clear();
            // if connector is an input connector, set its state to unknown
            if (connector.isInputConnector) {
                connector.setState(_logic2.default.state.unknown);
            }
        }

        /**
         * Find the correct instance of editorElements.Box in the Canvas' boxes by the provided id
         * @param  {string} boxId id of the box
         * @return {editorElements.Box} instance of the box
         */

    }, {
        key: 'getBoxById',
        value: function getBoxById(boxId) {
            for (var i = 0; i < this.boxes.length; i++) {
                if (this.boxes[i].svgObj.id === boxId) {
                    return this.boxes[i];
                }
            }
            return undefined;
        }

        /**
         * Find the correct instance of editorElements.Box in the Canvas' boxes by ID of a connector that belongs to this box
         * @param  {string} boxId id of the connector
         * @return {editorElements.Box} instance of the box
         */

    }, {
        key: 'getBoxByConnectorId',
        value: function getBoxByConnectorId(connectorId) {
            for (var i = 0; i < this.boxes.length; i++) {
                if (this.boxes[i].getConnectorById(connectorId) !== undefined) {
                    return this.boxes[i];
                }
            }
            return false;
        }

        /**
         * Get instance of a connector based on it's ID (and also on an instance of editorElements.Wire if provided)
         *
         * The wire variable is used as heuristic: When we know the wire, we have to check only
         * two gates instead of all of them
         * @param  {string} connectorId id of the connector
         * @param  {editorElements.Wire} [wire]      instance of the Wire that is connected to this connector
         * @return {editorElements.Connector}        instance of the connector
         */

    }, {
        key: 'getConnectorById',
        value: function getConnectorById(connectorId) {
            var wire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;


            if (wire !== undefined) {
                // we know the wire -- we can check only gates at the ends of this wire
                var connector = wire.startBox.getConnectorById(connectorId);
                if (!connector) {
                    connector = wire.endBox.getConnectorById(connectorId);
                }
                return connector;
            } else {
                // we do not know the wire -- we have to check all gates
                var _iteratorNormalCompletion10 = true;
                var _didIteratorError10 = false;
                var _iteratorError10 = undefined;

                try {
                    for (var _iterator10 = this.boxes[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                        var box = _step10.value;

                        var _connector = box.getConnectorById(connectorId);
                        if (_connector) {
                            return _connector;
                        }
                    }
                } catch (err) {
                    _didIteratorError10 = true;
                    _iteratorError10 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion10 && _iterator10.return) {
                            _iterator10.return();
                        }
                    } finally {
                        if (_didIteratorError10) {
                            throw _iteratorError10;
                        }
                    }
                }
            }

            return false;
        }

        /**
         * Get the logical jQuery target based on the factual jQuery target.
         *
         * If the object, that user interacted with, is not a connector and is in a group,
         * return the group jQuery object instead of the original jQuery object.
         * @param  {target} target jQuery target of the object user interacted with
         * @return {target}        jQuery target of the object user wanted to interact with
         */

    }, {
        key: 'getRealJQueryTarget',
        value: function getRealJQueryTarget(target) {
            var $target = $(target);
            if (!$target.hasClass("connector") && $target.parents('g').length > 0) {
                $target = $target.parent();
                while ($target.prop("tagName") !== "G" && $target.prop("tagName") !== "g") {
                    $target = $target.parent();
                }
            }
            return $target;
        }

        // returns the editorElement that user interacted with, the "target" argument is a jQuery element
        /**
         * Get instance of some object from editorElement based on the jQuery target
         * @param  {target} target jQuery target that user interacted with
         * @return {editorElements.NetworkElement} instance of an object derived from editorElements.NetworkElement that the user interacted with
         */

    }, {
        key: 'getRealTarget',
        value: function getRealTarget(target) {
            if (target === undefined) {
                return undefined;
            }

            // eventy se museji zpracovat tady, protoze v SVG se eventy nepropaguji
            var $target = $(target);

            if ($target.hasClass("connector")) {
                // this is a connector, don't traverse groups
                return this.getConnectorById($target.attr('id'));
            } else if ($target.parents('g').length > 0) {
                // this element is in a group and it is not a connector

                // traversing up the DOM tree until we find the closest group
                var $parentGroup = $target.parent();
                while ($parentGroup.prop("tagName") !== "G" && $parentGroup.prop("tagName") !== "g") {
                    $parentGroup = $parentGroup.parent();
                }

                // try to match the jQuery element to the logical element using DOM classes

                if ($parentGroup.hasClass("box")) {
                    // return the corresponding box
                    return this.getBoxById($parentGroup.attr('id'));
                } else if ($parentGroup.hasClass("wire")) {
                    // return the corresponding wire
                    return this.getWireById($parentGroup.attr('id'));
                } else {
                    // found a group that contains the target, but this group does not match any known element types
                    return undefined;
                }
            } else {
                // element does not match any known element types
                return undefined;
            }
        }

        /**
         * Add an element to the Canvas
         * @param  {editorElements.NetworkElement}  element Element that will be added on the Canvas
         * @param  {Boolean} [refresh=true] if true, the SVG document will be reloaded after adding this element
         */

    }, {
        key: 'appendElement',
        value: function appendElement(element) {
            var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.appendJQueryObject(element.get(), refresh);
        }

        /**
         * Append a jQuery element to the SVG document (helper for this.appendElement)
         * @param  {object}  object         jQuery element that will be added to the SVG document
         * @param  {Boolean} [refresh=true] if true, the SVG document will be reloaded after adding this element
         */

    }, {
        key: 'appendJQueryObject',
        value: function appendJQueryObject(object) {
            var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.$svg.append(object);
            if (refresh) this.refresh();
        }

        /**
         * Add a new pattern to the definitions element in the SVG document
         * @param {svgObj.Pattern} pattern pattern that will be added to the <devs> element in the SVG document
         */

    }, {
        key: 'addPattern',
        value: function addPattern(pattern) {
            this.$defs.append(pattern);
            this.refresh();
        }

        /**
         * Reload the SVG document (needed to display a newly appended jQuery object)
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            this.$svg.html(this.$svg.html());
            console.log("SVG document has been reloaded.");
        }

        /**
         * Display the context menu on the specified position
         * @param  {number} x       horizontal position in CSS pixels
         * @param  {number} y       vertical position in CSS pixels
         * @param  {jQuery.element} $target the item user clicked on (used to display "remove this element"-type items in the menu)
         */

    }, {
        key: 'displayContextMenu',
        value: function displayContextMenu(x, y, $target) {
            this.contextMenu.display(x, y, $target);

            // if tutorial exists, call tutorial callback
            if (this.tutorial) {
                this.tutorial.onContextMenuOpened();
            }
        }

        /**
         * hide the context menu
         */

    }, {
        key: 'hideContextMenu',
        value: function hideContextMenu() {
            this.contextMenu.hide();
        }

        /**
         * snap a value to a grid
         * @param  {number} value value in SVG pixels
         * @return {number}       the value rounded to the closest number divisible by the grid size
         */

    }, {
        key: 'snapToGrid',
        value: function snapToGrid(value) {
            return Math.round(value / this.gridSize) * this.gridSize;
        }

        /**
         * convert grid pixels to SVG pixels
         * @param  {number} value distance in grid pixels
         * @return {number}       distance in SVG pixels
         */

    }, {
        key: 'gridToSVG',
        value: function gridToSVG(value) {
            return value * this.gridSize;
        }

        /**
         * convert SVG pixels to grid pixels
         * @param {number} value distance in SVG pixels
         * @return {number}      distance in grud pixels
         */

    }, {
        key: 'SVGToGrid',
        value: function SVGToGrid(value) {
            return value / this.gridSize;
        }

        /**
         * static function for snapping a value to a grid
         * @param  {number} value value in SVG pixels
         * @param  {number} gridSize size of the grid in SVG pixels
         * @return {number}       the value rounded to the closest number divisible by the grid size
         */

    }, {
        key: 'moveToFrontById',


        /**
         * move an element to the front in the canvas
         * @param  {string} objId id of the element
         */
        value: function moveToFrontById(objId) {
            this.$svg.append($("#" + objId));
        }

        /**
         * move an element to the back in the canvas
         * @param  {string} objId id of the element
         */

    }, {
        key: 'moveToBackById',
        value: function moveToBackById(objId) {
            $("#" + this.background.id).after($("#" + objId));
        }

        /**
         * get set of nodes, that cannot be used for wiring at any circumstances
         * @return {Set} set of nodes (objects containing x and y coordinates) that are not suitable for wiring
         */

    }, {
        key: 'getNonRoutableNodes',
        value: function getNonRoutableNodes() {
            var blockedNodes = new Set();
            // for each box
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = this.boxes[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var box = _step11.value;

                    var translate = box.getGridPixelTransform().getTranslate();

                    // for each item in blockedNodes (set of blocked nodes with coordinates relative
                    // to the left upper corner of rect; unit used is "one gridSize") convert the coordinates
                    // to absolute (multiple with gridSize and add position of rect) and add the result to the set
                    var _iteratorNormalCompletion12 = true;
                    var _didIteratorError12 = false;
                    var _iteratorError12 = undefined;

                    try {
                        for (var _iterator12 = box.blockedNodes[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                            var node = _step12.value;

                            blockedNodes.add({
                                x: translate.x + node.x,
                                y: translate.y + node.y
                            });
                        }
                    } catch (err) {
                        _didIteratorError12 = true;
                        _iteratorError12 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                _iterator12.return();
                            }
                        } finally {
                            if (_didIteratorError12) {
                                throw _iteratorError12;
                            }
                        }
                    }
                }

                // FOR DEBUG ONLY: display the non routable nodes
                /*
                 if(this.nodeDisplay) {
                    for (const rectangleId of this.nodeDisplay) {
                        $(`#${rectangleId}`).remove();
                    }
                }
                 this.nodeDisplay = [];
                 for (const node of blockedNodes) {
                    const x = this.gridToSVG(node.x);
                    const y = this.gridToSVG(node.y);
                     const w = 4;
                    const p = w / 2;
                     const nodeRectangle = new svgObj.Rectangle(x - p, y - p, w, w, "red", "none")
                    this.nodeDisplay.push(nodeRectangle.id);
                    this.appendElement(nodeRectangle, false);
                }
                 this.refresh();
                 */
                // END FOR DEBUG ONLY

                // return the set
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            return blockedNodes;
        }

        /**
         * get set of nodes, that are inconvenient for wiring, but can be used, just are not preferred
         * @return {Set} set of nodes (objects containing x and y coordinates) that are not preferred for wiring
         */

    }, {
        key: 'getInconvenientNodes',
        value: function getInconvenientNodes(ignoreWireId) {
            var inconvenientNodes = new Set();
            // for each wire

            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = this.wires[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var wire = _step13.value;

                    if (ignoreWireId === undefined || ignoreWireId !== wire.id) {
                        if (wire.inconvenientNodes) {
                            var _iteratorNormalCompletion14 = true;
                            var _didIteratorError14 = false;
                            var _iteratorError14 = undefined;

                            try {
                                for (var _iterator14 = wire.inconvenientNodes[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                    var node = _step14.value;

                                    inconvenientNodes.add(node);
                                }
                            } catch (err) {
                                _didIteratorError14 = true;
                                _iteratorError14 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                        _iterator14.return();
                                    }
                                } finally {
                                    if (_didIteratorError14) {
                                        throw _iteratorError14;
                                    }
                                }
                            }
                        }
                    }
                }

                // FOR DEBUG ONLY: display the inconvenient nodes
                /*
                 if(this.inconvenientNodeDisplay) {
                    for (const rectangleId of this.inconvenientNodeDisplay) {
                        $(`#${rectangleId}`).remove();
                    }
                }
                 this.inconvenientNodeDisplay = [];
                 for (const node of inconvenientNodes) {
                    const x = this.gridToSVG(node.x);
                    const y = this.gridToSVG(node.y);
                     const w = 4;
                    const p = w / 2;
                     const nodeRectangle = new svgObj.Rectangle(x - p, y - p, w, w, "orange", "none")
                    this.inconvenientNodeDisplay.push(nodeRectangle.id);
                    this.appendElement(nodeRectangle, false);
                }
                 this.refresh();
                 */
                // END FOR DEBUG ONLY

                // return the set
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }

            return inconvenientNodes;
        }
    }, {
        key: 'width',
        get: function get() {
            return this.$svg.width();
        }

        /**
         * Get the height of the main SVG element
         * @return {number} height of the SVG element in pixels
         */

    }, {
        key: 'height',
        get: function get() {
            return this.$svg.height();
        }
    }, {
        key: 'zoom',
        get: function get() {
            return this.viewbox.zoom;
        }

        /**
         * Set the zoom multiplier of the canvas.
         * I sets the viewbox zoom and then applies the new value by calling this.applyViewbox()
         * @param  {number} value set the zoom to this value
         */
        ,
        set: function set(value) {
            this.viewbox.zoom = value;
            this.applyViewbox();

            // if tutorial exists, call tutorial callback
            if (this.tutorial) {
                this.tutorial.onCanvasZoomed();
            }
        }
    }, {
        key: 'exportData',
        get: function get() {
            this.exportWireIdMap = new Map();
            this.exportWireId = 0;

            var data = {
                boxes: []
            };

            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this.boxes[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var box = _step15.value;

                    data.boxes.push(box.exportData);
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }

            return data;
        }
    }], [{
        key: 'snapToGrid',
        value: function snapToGrid(value, gridSize) {
            return Math.round(value / gridSize) * gridSize;
        }
    }]);

    return Canvas;
}();

exports.default = Canvas;

},{"./contextMenu":11,"./editorElements":12,"./floatingMenu":14,"./helperFunctions":15,"./logic":17,"./simulation":21,"./svgObjects":22,"./tutorial":23,"libstl":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _networkLibrary = require("./networkLibrary");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Item in the [ContextMenu](./module-ContextMenu.html). ContextMenuItems can be nested using the appendItem function.
 */
var ContextMenuItem = function () {
    /**
     * @param {string} text          text on the button
     * @param {ContextMenu} contextMenu instance of the [ContextMenu](./module-ContextMenu.html) this item belongs to
     * @param {Function} clickFunction callback function that will be called when user clicks this item
     */
    function ContextMenuItem(text, contextMenu, clickFunction) {
        var _this = this;

        _classCallCheck(this, ContextMenuItem);

        /**
         * text on the button
         * @type {string}
         */
        this.text = text;

        /**
         * instance of the [ContextMenu](./module-ContextMenu.html) this item belongs to
         * @type {ContextMenu}
         */
        this.contextMenu = contextMenu;

        /**
         * jQuery element representing DOM content of this menu item
         * @type {jQuery.element}
         */
        this.$el = $("<li>").text(text);

        // set up click callback if clickFunction is defined
        if (clickFunction !== undefined) {
            $(this.$el).click(function (event) {
                clickFunction();
                contextMenu.hide();

                event.stopPropagation();
            });
        }

        /**
         * jQuery element containing the submenu (or undefined, if item has no subitems)
         * @type {jQuery.element}
         */
        this.$submenu = undefined;

        /**
         * submenu item counter
         * @type {Number}
         */
        this.itemCount = 0;

        // set hover callback
        $(this.$el).hover(function (event) {
            // mouse on

            if (_this.length > 0) {
                _this.$submenu.css({
                    display: "block",
                    top: _this.$el.offset().top,
                    left: _this.$el.parent().offset().left + _this.$el.parent().width()
                });

                _this.contextMenu.$el.after(_this.$submenu);

                event.stopPropagation();
            }
        }, function () {
            // mouse out
            if (_this.$submenu) {
                _this.$submenu.css({
                    display: "none"
                });
            }

            // do not stop event propagation, here it is wanted
            // (because submenu overrides display: none when user moves from this menu item to the submenu)
        });
    }

    /**
     * instance of [Canvas](./module-Canvas.html) this menu belongs to
     * @type {Canvas}
     */


    _createClass(ContextMenuItem, [{
        key: "addClass",


        /**
         * add a CSS class to this item
         * @param {string} cls [description]
         */
        value: function addClass(cls) {
            this.$el.addClass(cls);
            return this;
        }

        /**
         * append a nested {@link ContextMenuItem} to this item
         * @param  {ContextMenuItem} item item that will be appended
         */

    }, {
        key: "appendItem",
        value: function appendItem(item) {
            var _this2 = this;

            if (!this.$submenu) {
                this.$submenu = $("<ul>").addClass("subList");
                this.$submenu.hover(function () {
                    _this2.$submenu.css("display", "block");
                }, function () {
                    _this2.$submenu.css("display", "none");
                });
            }
            this.$submenu.append(item.$el);

            this.itemCount++;

            return item;
        }

        /**
         * get jQuery element of this menu item
         * @return {jQuery.element} jQuery element containing all DOM content for this menu item
         */

    }, {
        key: "parentSVG",
        get: function get() {
            return this.contextMenu.parentSVG;
        }

        /**
         * number of items in the submenu
         * @return {Number}
         */

    }, {
        key: "length",
        get: function get() {
            return this.itemCount;
        }
    }, {
        key: "jQuery",
        get: function get() {
            return this.$el;
        }
    }, {
        key: "jQuerySubmenu",
        get: function get() {
            return this.$submenu;
        }
    }]);

    return ContextMenuItem;
}();

/**
 * Menu item that has a custom click callback function that adds a {@link Gate} of the specified type to the [Canvas](./module-Canvas.html)
 * @extends ContextMenuItem
 */


var GateMenuItem = function (_ContextMenuItem) {
    _inherits(GateMenuItem, _ContextMenuItem);

    /**
     * @param {string} type        type of the gate {@link Gate} (and, or, ...)
     * @param {ContextMenu} contextMenu instance of the [ContextMenu](./module-ContextMenu.html) that this item belongs to
     */
    function GateMenuItem(type, contextMenu) {
        var _this3;

        _classCallCheck(this, GateMenuItem);

        return _this3 = _possibleConstructorReturn(this, (GateMenuItem.__proto__ || Object.getPrototypeOf(GateMenuItem)).call(this, type.toUpperCase() + " gate", contextMenu, function () {
            _this3.parentSVG.newGate(type, _this3.parentSVG.snapToGrid(_this3.parentSVG.viewbox.transformX(contextMenu.position.x)), _this3.parentSVG.snapToGrid(_this3.parentSVG.viewbox.transformY(contextMenu.position.y)));
        }));
    }

    return GateMenuItem;
}(ContextMenuItem);

var BlackboxMenuItem = function (_ContextMenuItem2) {
    _inherits(BlackboxMenuItem, _ContextMenuItem2);

    function BlackboxMenuItem(name, file, contextMenu) {
        var _this4;

        _classCallCheck(this, BlackboxMenuItem);

        return _this4 = _possibleConstructorReturn(this, (BlackboxMenuItem.__proto__ || Object.getPrototypeOf(BlackboxMenuItem)).call(this, name, contextMenu, function () {
            (0, _networkLibrary.getNetworkFromLibrary)(file).then(function (_ref) {
                var blackbox = _ref.blackbox,
                    name = _ref.name;
                var inputs = blackbox.inputs,
                    outputs = blackbox.outputs,
                    table = blackbox.table;


                _this4.parentSVG.newBlackbox(inputs, outputs, table, name, _this4.parentSVG.snapToGrid(_this4.parentSVG.viewbox.transformX(contextMenu.position.x)), _this4.parentSVG.snapToGrid(_this4.parentSVG.viewbox.transformY(contextMenu.position.y)));
            }).catch(function (error) {
                console.error(error);
            });
        }));
    }

    return BlackboxMenuItem;
}(ContextMenuItem);

var NetworkMenuItem = function (_ContextMenuItem3) {
    _inherits(NetworkMenuItem, _ContextMenuItem3);

    function NetworkMenuItem(name, file, contextMenu) {
        var _this5;

        _classCallCheck(this, NetworkMenuItem);

        return _this5 = _possibleConstructorReturn(this, (NetworkMenuItem.__proto__ || Object.getPrototypeOf(NetworkMenuItem)).call(this, name, contextMenu, function () {
            (0, _networkLibrary.getNetworkFromLibrary)(file).then(function (data) {
                _this5.parentSVG.importData(data, Math.round(_this5.parentSVG.viewbox.transformX(contextMenu.position.x) / _this5.parentSVG.gridSize), Math.round(_this5.parentSVG.viewbox.transformY(contextMenu.position.y) / _this5.parentSVG.gridSize)).then();
            }).catch(function (error) {
                console.error(error);
            });
        }));
    }

    return NetworkMenuItem;
}(ContextMenuItem);

/** @module ContextMenu */
/**
 * ContextMenu represents the menu that is displayed to the user when they right click on a canvas.
 * This menu allows user to add elements to the Canvas and in the case that user rightclicked
 * on a specific element, this menu allows them to remove this element.
 */


var ContextMenu = function () {
    /**
     * @param {Canvas} parentSVG instance of [Canvas](./module-Canvas.html) this menu belongs to
     */
    function ContextMenu(parentSVG) {
        var _this6 = this;

        _classCallCheck(this, ContextMenu);

        /**
         * instance of [Canvas](./module-Canvas.html) this menu belongs to
         * @type {Canvas}
         */
        this.parentSVG = parentSVG;

        /**
         * Position of the context menu. It is used to add the new elements to the correct position on the Canvas.
         * @type {Object}
         */
        this.position = {
            x: 0, y: 0
        };

        /**
         * jQuery element containing the context menu
         * @type {jQuery.element}
         */
        this.$el = $("<ul>");
        this.$el.attr('id', 'contextMenu');

        var special = new ContextMenuItem("Special elements", this);

        // add input box
        special.appendItem(new ContextMenuItem("Input box", this, function () {
            var position = {
                left: _this6.parentSVG.snapToGrid(parentSVG.viewbox.transformX(_this6.position.x)),
                top: _this6.parentSVG.snapToGrid(parentSVG.viewbox.transformY(_this6.position.y))
            };

            parentSVG.newInput(position.left, position.top);
        }));

        // add output box
        special.appendItem(new ContextMenuItem("Output box", this, function () {
            var position = {
                left: _this6.parentSVG.snapToGrid(parentSVG.viewbox.transformX(_this6.position.x)),
                top: _this6.parentSVG.snapToGrid(parentSVG.viewbox.transformY(_this6.position.y))
            };

            parentSVG.newOutput(position.left, position.top);
        }));

        special.appendItem(new ContextMenuItem("Repeater", this, function () {
            var position = {
                left: _this6.parentSVG.snapToGrid(parentSVG.viewbox.transformX(_this6.position.x)),
                top: _this6.parentSVG.snapToGrid(parentSVG.viewbox.transformY(_this6.position.y))
            };

            parentSVG.newRepeater(position.left, position.top);
        }));

        this.appendItem(special);

        // add all gates

        // list of gates that can be added
        var gates = ["not", "and", "or", "nand", "nor", "xor", "xnor"];
        var gateList = new ContextMenuItem("New gate", this, parentSVG);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = gates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var name = _step.value;

                gateList.appendItem(new GateMenuItem(name, this));
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

        this.appendItem(gateList);

        // more options will be added in the getLibrary() callback below
        var networkList = new ContextMenuItem("Add a network", this);
        networkList.appendItem(new ContextMenuItem("paste a network", this, function () {
            _this6.displayImportDialog();
        }));
        this.appendItem(networkList); // always append

        var blackboxList = new ContextMenuItem("Add a blackbox", this); // appends only if contains items (see the callback)

        // network import (blackbox, network)
        (0, _networkLibrary.getLibrary)().then(function (networks) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {

                for (var _iterator2 = networks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _ref2 = _step2.value;
                    var _name = _ref2.name;
                    var file = _ref2.file;
                    var hasTable = _ref2.hasTable;
                    var hasNetwork = _ref2.hasNetwork;

                    // add a network as a blackbox
                    if (hasTable) {
                        blackboxList.appendItem(new BlackboxMenuItem(_name, file, _this6));
                    }

                    // load a network as a network of components connected with wires
                    if (hasNetwork) {
                        networkList.appendItem(new NetworkMenuItem(_name, file, _this6));
                    }
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

            if (blackboxList.length > 0) {
                _this6.appendItem(blackboxList);
            }
        }).catch(function (error) {
            console.error(error);
        });

        // add conditional items for box and wire removal
        this.appendConditionalItem('box', 'Remove this item', function (id) {
            _this6.parentSVG.removeBox(id);
        });
        this.appendConditionalItem('wire', 'Remove this wire', function (id) {
            _this6.parentSVG.removeWireById(id);
        });

        // add the context menu to the DOM
        parentSVG.$svg.before(this.$el);

        /**
         * Number of items in this menu (used in the .lenght getter). Conditional items do not count.
         * @type {Number}
         */
        this.itemCount = 0;
    }

    _createClass(ContextMenu, [{
        key: "appendItem",


        /**
         * append a context menu item to the context menu
         * @param  {ContextMenuItem} item instance of {@link ContextMenuItem} that will be added to this menu
         */
        value: function appendItem(item) {
            this.$el.append(item.jQuery);

            this.itemCount++;

            return item;
        }

        /**
         * appends an connditional item (that is shown only if the target has the class itemClass)
         * @param  {string} itemClass     show the item only if the target has this class
         * @param  {string} text          text of this menu item
         * @param  {Function} clickFunction function with one argument (ID of the target) that will be called on click
         */

    }, {
        key: "appendConditionalItem",
        value: function appendConditionalItem(itemClass, text, clickFunction) {
            if (!this.conditionalItems) {
                this.conditionalItems = [];
            }

            this.conditionalItems[this.conditionalItems.length] = {
                itemClass: itemClass,
                text: text,
                clickFunction: clickFunction
            };
        }

        /**
         * display the dialog for importing a network from a clipboard
         */

    }, {
        key: "displayImportDialog",
        value: function displayImportDialog() {
            var _this7 = this;

            var $popup = $("<div>").addClass("importExport").addClass("import");

            var textareaId = "importJSON";
            var $textblock = $("<textarea>").attr('id', textareaId);

            var lityInstance = void 0;

            $popup.append($textblock).append($("<a>").attr({
                "href": "#",
                "class": "upload"
            }).append($("<img>").attr('src', "img/gui/import.svg")).append(" import from JSON").on('click', function () {
                var data = JSON.parse($('#' + textareaId).val());

                // proccess the imported data
                _this7.parentSVG.importData(data, Math.round(_this7.parentSVG.viewbox.transformX(_this7.position.x) / _this7.parentSVG.gridSize), Math.round(_this7.parentSVG.viewbox.transformY(_this7.position.y) / _this7.parentSVG.gridSize)).then(function () {
                    // close Lity
                    lityInstance.close();
                });
            }));

            lityInstance = lity($popup);

            // focus on the textblock
            $textblock.focus();
        }

        /**
         * decide whether or not to display specific conditional items
         * @param  {jQuery.element} $target jQuery target of a MouseEvent (element that user clicked on)
         */

    }, {
        key: "resolveConditionalItems",
        value: function resolveConditionalItems($target) {
            var _this8 = this;

            var _loop = function _loop(item) {
                if ($target.hasClass(item.itemClass)) {
                    _this8.appendItem(new ContextMenuItem(item.text, _this8, function () {
                        item.clickFunction($target.attr('id'));
                    })).addClass('conditional');
                }
            };

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.conditionalItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    _loop(item);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }

        /**
         * hide all conditional items
         */

    }, {
        key: "hideAllConditionalItems",
        value: function hideAllConditionalItems() {
            this.$el.children('.conditional').remove();
        }

        /**
         * displays the context menu with the right set of conditional items
         * @param  {number} x       horizontal position of the context menu in CSS pixels
         * @param  {number} y       vertical position of the context menu in CSS pixels
         * @param  {jQuery.element} $target jQuery target of a MouseEvent (element that user clicked on)
         */

    }, {
        key: "display",
        value: function display(x, y, $target) {
            this.position = {
                x: x,
                y: y
            };

            this.resolveConditionalItems($target);

            this.$el.css({
                display: 'block',
                top: y,
                left: x
            })
            // set the width expicitly, or else the menu will widen when displaying a submenu
            // 2 is to prevent a weird text wrap bug
            .css('width', 'auto').css('width', this.$el.innerWidth() + 2);
        }

        /**
         * hide the context menu
         */

    }, {
        key: "hide",
        value: function hide() {
            this.$el.css({ display: 'none' });
            $(".subList").css({ display: 'none' });
            this.hideAllConditionalItems();
        }
    }, {
        key: "length",
        get: function get() {
            return this.itemCount;
        }
    }]);

    return ContextMenu;
}();

exports.default = ContextMenu;

},{"./networkLibrary":20}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Wire = exports.Blackbox = exports.Gate = exports.OutputBox = exports.InputBox = exports.Repeater = exports.OutputConnector = exports.InputConnector = exports.Transform = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svgObjects = require('./svgObjects');

var svgObj = _interopRequireWildcard(_svgObjects);

var _logic = require('./logic');

var _logic2 = _interopRequireDefault(_logic);

var _findPath = require('./findPath');

var _findPath2 = _interopRequireDefault(_findPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * mapping of logical states to css classes
 * @type {Object}
 */
var stateClasses = {
    on: "stateOn",
    off: "stateOff",
    unknown: "stateUnknown",
    oscillating: "stateOscillating"
};

/**
 * Helper class used by {@link Transform}.
 *
 * Represents one single property of the transform argument, for example `translate(360 150)`
 * that may be a part of longer transform argument like `transform="translate(360 150) rotate(90 30 20)"`
 */

var Property = function () {
    /**
     * Initialize the Property object
     * @param {string} [string] string in the property format `propertyname(list of space separated values)`
     */
    function Property(string) {
        _classCallCheck(this, Property);

        if (string !== undefined) {
            this.name = string.replace(/^[ ]*([^(]+).*/, "$1");
            this.args = string.replace(/^[^(]+\((.*)\)/, "$1").split(' ');
        }
    }

    /**
     * set or replace the name of this property
     * @param {string} name new name for this property
     */


    _createClass(Property, [{
        key: 'setName',
        value: function setName(name) {
            this.name = name;
        }

        /**
         * set arguments of this property
         * @param {array} args array of arguments
         */

    }, {
        key: 'setArguments',
        value: function setArguments(args) {
            this.args = args;
        }

        /**
         * get string representation of the property
         * @return {string} property in the property format `name(arg1 arg2)`
         */

    }, {
        key: 'get',
        value: function get() {
            return this.name + "(" + this.args.join(" ") + ")";
        }
    }]);

    return Property;
}();

/**
 * API for manipulating the transform argument used in SVG
 */


var Transform = exports.Transform = function () {
    /**
     * Initialize the Transform object
     * @param {string} [string] string in the format of the `transform` argument in SVG, for example `translate(360 150) rotate(90 30 20)`
     */
    function Transform(string) {
        _classCallCheck(this, Transform);

        /**
         * array of {@link Property} instances
         * @type {Array}
         */
        this.items = [];

        if (string !== undefined) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = string.split(")")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (item) {
                        // if not empty
                        this.items.push(new Property(item + ")"));
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
        }
    }

    /**
     * convert distances from SVG pixels to grid pixels
     * @param  {Canvas} parentSVG instance of [Canvas](./module-Canvas.html)
     */


    _createClass(Transform, [{
        key: 'toGridPixels',
        value: function toGridPixels(parentSVG) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    if (item.name === "translate") {
                        item.args = [parentSVG.SVGToGrid(item.args[0]), parentSVG.SVGToGrid(item.args[1])];
                    } else if (item.name === "rotate") {
                        item.args = [item.args[0], parentSVG.SVGToGrid(item.args[1]), parentSVG.SVGToGrid(item.args[2])];
                    }
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

        /**
         * convert distances from grid pixels to SVG pixels
         * @param  {Canvas} parentSVG instance of [Canvas](./module-Canvas.html)
         */

    }, {
        key: 'toSVGPixels',
        value: function toSVGPixels(parentSVG) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    if (item.name === "translate") {
                        item.args = [parentSVG.gridToSVG(item.args[0]), parentSVG.gridToSVG(item.args[1])];
                    } else if (item.name === "rotate") {
                        item.args = [item.args[0], parentSVG.gridToSVG(item.args[1]), parentSVG.gridToSVG(item.args[2])];
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }

        /**
         * find a transform property by name and get its index in the [items](#items) array
         * @param  {string} name name of the property
         * @return {number}      index of the property in the array of properties or `-1` if not found
         */

    }, {
        key: 'getIndex',
        value: function getIndex(name) {
            for (var i = 0; i < this.items.length; i++) {
                if (name === this.items[i].name) {
                    return i;
                }
            }

            return -1;
        }

        /**
         * get the translate property
         * @return {Object} object containing parameters of the translate attribute
         */

    }, {
        key: 'getTranslate',
        value: function getTranslate() {
            var args = this.getArguments(this.getIndex("translate"));

            return {
                x: Number(args[0]),
                y: Number(args[1])
            };
        }

        /**
         * get the rotate property
         * @return {Object} object containing parameters of the rotate attribute
         */

    }, {
        key: 'getRotate',
        value: function getRotate() {
            var args = this.getArguments(this.getIndex("rotate"));

            return {
                deg: Number(args[0]),
                centreX: Number(args[1]),
                centreY: Number(args[2])
            };
        }

        /**
         * set translate to the specified values
         * @param {number} x horizontal translation
         * @param {number} y vertical translation
         */

    }, {
        key: 'setTranslate',
        value: function setTranslate(x, y) {
            this.setParameter("translate", [x, y]);
        }

        /**
         * set rotate to the specified values
         * @param {number} deg     angle of the rotation in degrees
         * @param {number} centreX horizontal position of the centre of the rotation
         * @param {number} centreY vertical position of the centre of the rotation
         */

    }, {
        key: 'setRotate',
        value: function setRotate(deg, centreX, centreY) {
            this.setParameter("rotate", [deg, centreX, centreY]);
        }

        /**
         * rotate by 90 degrees to the right or left, depending on the parameter `right`
         * @param {number} centreX horizontal position of the centre of the rotation
         * @param {number} centreY vertical position of the centre of the rotation
         * @param {boolean} right rotate to the right if `true`, to the left if `false`
         */

    }, {
        key: 'rotateRightAngle',
        value: function rotateRightAngle(centreX, centreY, right) {
            var amount = right ? 90 : 270;

            if (this.getIndex("rotate") === -1) {
                this.setRotate(amount, centreX, centreY);
            } else {
                var newRotation = (parseInt(this.getRotate().deg) + amount) % 360;

                if (newRotation === 180) {
                    // swap centre coordinates
                    // because rotate(c, x, y) is defined like transform(-x, -y) rotate(c) transform(x, y)
                    var a = centreX;
                    centreX = centreY;
                    centreY = a;
                }

                this.setRotate(newRotation, centreX, centreY);
            }
        }

        /**
         * rotate by 90 degrees to the right
         * @param  {number} centreX horizontal position of the centre of the rotation
         * @param  {number} centreY vertical position of the centre of the rotation
         */

    }, {
        key: 'rotateRight',
        value: function rotateRight(centreX, centreY) {
            this.rotateRightAngle(centreX, centreY, true);
        }

        /**
         * rotate by 90 degrees to the left
         * @param  {number} centreX horizontal position of the centre of the rotation
         * @param  {number} centreY vertical position of the centre of the rotation
         */

    }, {
        key: 'rotateLeft',
        value: function rotateLeft(centreX, centreY) {
            this.rotateRightAngle(centreX, centreY, false);
        }

        /**
         * get the transform values in a string
         * @return {string} string that can be used as a value for the transform property of a SVG element
         */

    }, {
        key: 'get',
        value: function get() {
            var retVal = void 0;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var item = _step4.value;

                    if (retVal) {
                        retVal += " " + item.get();
                    } else {
                        retVal = item.get();
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return retVal;
        }

        /**
         * get arguments of a property specified by index
         * @param  {number} index index of the property
         * @return {array}       array of arguments of the specified property
         */

    }, {
        key: 'getArguments',
        value: function getArguments(index) {
            return this.items[index].args;
        }

        /**
         * set argumets of a property specified by name
         * @param {string} name name of the property
         * @param {array} args array of arguments of the specified property
         */

    }, {
        key: 'setParameter',
        value: function setParameter(name, args) {
            // determine index of the parameter (if set), else index == -1
            var index = this.getIndex(name);

            // if the property has been already set, change it (rewrite the array in the right index)
            // else create a new one (set index to the length of an array --> ad an item to the end)
            if (index === -1) {
                index = this.items.length;
                this.items[index] = new Property();
                this.items[index].setName(name);
            }

            // save args under the right index
            this.items[index].setArguments(args);
        }
    }]);

    return Transform;
}();

/**
 * parent class for all network elements
 */


var NetworkElement = function () {
    /**
     * Basic constructor for NetworkElement
     * @param {Canvas} parentSVG reference to the instance of {@link Canvas} that this element belongs to
     */
    function NetworkElement(parentSVG) {
        _classCallCheck(this, NetworkElement);

        if (!parentSVG) {
            console.error("Parent SVG element has to be defined.");
        }
        this.parentSVG = parentSVG;

        // used to store the svjObject's instance of this element
        this.svgObj = undefined;
    }

    /**
     * Get the unique ID of the SVG element tied to this logical element
     * @return {string} ID of the SVG element
     */


    _createClass(NetworkElement, [{
        key: 'onMouseDown',


        /**
         * empty callback function to prevent error messages, function is implemented later in the {@link Box} class
         */
        value: function onMouseDown() {}

        /**
         * empty function to prevent error messages, function is implemented later in the {@link Box} and {@link Connector} classes
         */

    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {}

        /**
         * empty function to prevent error messages, function is implemented later in the {@link Box} class
         */

    }, {
        key: 'onMouseMove',
        value: function onMouseMove() {}

        /**
         * "virtual" getter for json data, prints an error that it has to be redefined in the derived classes
         */

    }, {
        key: 'id',
        get: function get() {
            return this.svgObj.id;
        }
    }, {
        key: 'exportData',
        get: function get() {
            console.error("'json' getter has not been defined for this element", this);
            return undefined;
        }
    }]);

    return NetworkElement;
}();

/**
 * parent class for input and output connectors
 * @extends NetworkElement
 */


var Connector = function (_NetworkElement) {
    _inherits(Connector, _NetworkElement);

    /**
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} gridSize  size of the grid in SVG pixels
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    function Connector(parentSVG, left, top) {
        _classCallCheck(this, Connector);

        /**
         * size of the grid in SVG pixels
         * @type {number}
         */
        var _this = _possibleConstructorReturn(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).call(this, parentSVG));

        _this.gridSize = parentSVG.gridSize;
        /**
         * size of the connector in SVG pixels
         * @type {number}
         */
        _this.connectorSize = parentSVG.gridSize;
        /**
         * offset of the connector from the grid in SVG pixels
         * @type {number}
         */
        _this.connectorOffset = _this.connectorSize / 2;

        /**
         * instance of {@link svgObjects.svgObj} that holds all SVG information about this connector
         * @type {svgObj}
         */
        _this.svgObj = new svgObj.Rectangle(left * _this.gridSize - _this.connectorOffset, top * _this.gridSize - _this.connectorOffset, _this.connectorSize, _this.connectorSize, "none", "black");

        _this.svgObj.$el.addClass("connector");

        /**
         * this flag describes whether this connector is an input connector
         * @type {Boolean}
         */
        _this.isInputConnector = false;

        /**
         * current logical state of this connector
         * @type {Logic.state}
         */
        _this.elementState = _logic2.default.state.unknown;
        _this.svgObj.addClass(stateClasses.unknown);

        /**
         * set of ids of all wires connected to this connector
         * @type {Set}
         */
        _this.wireIds = new Set();
        return _this;
    }

    /**
     * whether this connector is an output connector
     * @return {Boolean}
     */


    _createClass(Connector, [{
        key: 'addWireId',


        /**
         * add a wire id to the list of wire ids
         * @param {string} wireId
         */
        value: function addWireId(wireId) {
            this.wireIds.add(wireId);
        }

        /**
         * remove a wire id from the list of wire ids
         * @param {string} wireId
         */

    }, {
        key: 'removeWireId',
        value: function removeWireId(wireId) {
            this.wireIds.delete(wireId);
        }

        /**
         * remove a wire specified by ID and update the connector
         * @param  {string} wireId ID of the wire to be removed
         */

    }, {
        key: 'removeWireIdAndUpdate',
        value: function removeWireIdAndUpdate(wireId) {
            this.removeWireId(wireId);
        }

        /**
         * set logical state of the connector
         * @param {Logic.state} state new state of the connector
         */

    }, {
        key: 'setState',
        value: function setState(state) {
            this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);

            switch (state) {
                case _logic2.default.state.unknown:
                    this.svgObj.addClass(stateClasses.unknown);
                    break;
                case _logic2.default.state.on:
                    this.svgObj.addClass(stateClasses.on);
                    break;
                case _logic2.default.state.off:
                    this.svgObj.addClass(stateClasses.off);
                    break;
                case _logic2.default.state.oscillating:
                    this.svgObj.addClass(stateClasses.oscillating);
                    break;
            }

            this.elementState = state;
        }

        /**
         * get state of this connector
         * @return {Logic.state}
         */

    }, {
        key: 'get',


        /**
         * get svgObj instance content of this connector
         * @return {svgObjects.Rectangle}
         */
        value: function get() {
            return this.svgObj;
        }

        /**
         * call [wireCreationHelper](./module-Canvas.html#wireCreationHelper) on mouse up
         */

    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            this.parentSVG.wireCreationHelper(this.svgObj.id);
        }
    }, {
        key: 'isOutputConnector',
        get: function get() {
            return !this.isInputConnector;
        }

        /**
         * whether this connector is an output connector
         * @return {Boolean}
         */
        ,
        set: function set(value) {
            this.isInputConnector = !value;
        }
    }, {
        key: 'state',
        get: function get() {
            return this.elementState;
        }
    }]);

    return Connector;
}(NetworkElement);

/**
 * Connector that gets its state from a connected value and passes it through to the {@link Box} this connector belongs to.
 * @extends Connector
 */


var InputConnector = exports.InputConnector = function (_Connector) {
    _inherits(InputConnector, _Connector);

    /**
     * Call the constructor from the parent {@link Connector} class and set isInputConnector to true.
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    function InputConnector(parentSVG, left, top) {
        _classCallCheck(this, InputConnector);

        var _this2 = _possibleConstructorReturn(this, (InputConnector.__proto__ || Object.getPrototypeOf(InputConnector)).call(this, parentSVG, left, top));

        _this2.isInputConnector = true;
        return _this2;
    }

    /**
     * Call the setState method of {@link Connector} and than refresh the state of the connected {@link Box}
     * @param {Logic.state} state new {@link Logic.state} of the connector
     */


    _createClass(InputConnector, [{
        key: 'setState',
        value: function setState(state) {
            _get(InputConnector.prototype.__proto__ || Object.getPrototypeOf(InputConnector.prototype), 'setState', this).call(this, state);

            var gate = this.parentSVG.getBoxByConnectorId(this.svgObj.id);
            gate.refreshState();
        }

        /**
         * remove the wire (by calling the removeWireIdAndUpdate of {@link Connector})
         * and update state of this connector by setting it to undefined using the setState method
         * @param  {string} wireId ID of the {@link Wire}
         */

    }, {
        key: 'removeWireIdAndUpdate',
        value: function removeWireIdAndUpdate(wireId) {
            _get(InputConnector.prototype.__proto__ || Object.getPrototypeOf(InputConnector.prototype), 'removeWireIdAndUpdate', this).call(this, wireId);
            this.setState(_logic2.default.state.unknown);
        }
    }]);

    return InputConnector;
}(Connector);

/**
 * Connector that takes a state defined by the {@link Box} it belongs to and passes it to all connected wire
 * @extends Connector
 */


var OutputConnector = exports.OutputConnector = function (_Connector2) {
    _inherits(OutputConnector, _Connector2);

    /**
     * Call the constructor from the parent {@link Connector} class and set isOutputConnector to true.
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    function OutputConnector(parentSVG, left, top) {
        _classCallCheck(this, OutputConnector);

        var _this3 = _possibleConstructorReturn(this, (OutputConnector.__proto__ || Object.getPrototypeOf(OutputConnector)).call(this, parentSVG, left, top));

        _this3.isOutputConnector = true;
        return _this3;
    }

    /**
     * Call the setState method of {@link Connector} and than set the state of the connected {@link Wire}s
     * @param {Logic.state} state new {@link Logic.state} of the connector
     */


    _createClass(OutputConnector, [{
        key: 'setState',
        value: function setState(state) {
            _get(OutputConnector.prototype.__proto__ || Object.getPrototypeOf(OutputConnector.prototype), 'setState', this).call(this, state);

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.wireIds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var wireId = _step5.value;

                    this.parentSVG.getWireById(wireId).setState(state);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }]);

    return OutputConnector;
}(Connector);

/**
 * Parent class for gates and input and output boxes. Defines all the factors
 * that the boxes have in common (svgObj structure, draggability and rotatability...)
 * @extends NetworkElement
 */


var Box = function (_NetworkElement2) {
    _inherits(Box, _NetworkElement2);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string} name       name of the element (input, output, and, or, xor...)
     * @param {string} category   type of the element (io, gate)
     * @param {number} gridWidth  width of the element in grid pixels
     * @param {number} gridHeight height of the element in grid pixels
     */
    function Box(parentSVG, name, category, gridWidth, gridHeight) {
        _classCallCheck(this, Box);

        /**
         * specifies the box type within the category (input/output in io, and/or/... in gate)
         * @type {string}
         */
        var _this4 = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, parentSVG));

        _this4.name = name;

        /**
         * specifies the box category (io for input or output, gate for logic gates)
         * @type {string}
         */
        _this4.category = category;

        /**
         * size of the grid in SVG pixels
         * @type {number}
         */
        _this4.gridSize = _this4.parentSVG.gridSize;

        /**
         * array of connectors of this box
         * @type {Array}
         */
        _this4.connectors = [];

        /**
         * svgObj containing all SVG data used to display this box
         * @type {svgObj}
         */
        _this4.svgObj = new svgObj.Group();

        /**
         * width of this element in SVG pixels
         * @type {number}
         */
        _this4.width = gridWidth * _this4.gridSize;
        /**
         * height of this element in SVG pixels
         * @type {number}
         */
        _this4.height = gridHeight * _this4.gridSize;

        /**
         * width of this element in grid pixels
         * @type {number}
         */
        _this4.gridWidth = gridWidth;
        /**
         * height of this element in grid pixels
         * @type {number}
         */
        _this4.gridHeight = gridHeight;

        // transparent background rectangle
        var rectangle = new svgObj.Rectangle(0, 0, _this4.width, _this4.height, "none", "none");
        rectangle.$el.addClass('rect');

        _this4.svgObj.addChild(rectangle);

        // image of the element
        _this4.image = new svgObj.SvgImage(0, 0, _this4.width, _this4.height, _this4.url);
        _this4.svgObj.addChild(_this4.image);

        // add type="gate", used in special callbacks in contextmenu
        _this4.svgObj.addAttr({ "type": category });

        _this4.svgObj.$el.addClass("box");
        _this4.svgObj.$el.addClass(category);
        return _this4;
    }

    /**
     * url of the image depicting this object
     * @type {string}
     */


    _createClass(Box, [{
        key: 'generateBlockNodes',


        /**
         * get set of nodes that are not suitable for wire routing
         * @param  {Number} [marginTop=0]    top margin of the element (distance from the element that should be also blocked)
         * @param  {Number} [marginRight=0]  right margin of the element
         * @param  {Number} [marginBottom=0] bottom margin of the element
         * @param  {Number} [marginLeft=0]   left margin of the element
         * @param  {Number} specialNodes     additional nodes that should be added to the set
         * @return {Set}                     set of not suitable nodes
         */
        value: function generateBlockNodes() {
            var marginTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var marginRight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var marginBottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var marginLeft = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            this.blockedNodes = new Set();
            for (var x = marginLeft; x <= this.gridWidth - marginRight; x++) {
                for (var y = marginTop; y <= this.gridHeight - marginBottom; y++) {
                    this.blockedNodes.add({
                        x: x,
                        y: y
                    });
                }
            }

            for (var _len = arguments.length, specialNodes = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
                specialNodes[_key - 4] = arguments[_key];
            }

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = specialNodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var node = _step6.value;

                    this.blockedNodes.add(node);
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }

        /**
         * empty function, redefined in inherited elements
         * refreshState takes input connector values and sets output values accordingly
         */

    }, {
        key: 'refreshState',
        value: function refreshState() {
            console.warn("Calling the virtual function refreshState has no effect.");
        }

        /**
         * change image to another one that ends with a specified suffix
         *
         * *usage:* `changeImage("abc")` changes image url to `image-abc.svg`,
         * `changeImage()` changes image url to the default one (`image.svg`)
         * @param  {string} [suffix] new suffix for the image
         */

    }, {
        key: 'changeImage',
        value: function changeImage(suffix) {
            if (suffix === undefined || suffix === "") {
                this.imgSuffix = "";
            } else {
                this.imgSuffix = "-" + suffix;
            }

            this.image.changeUrl(this.url);
        }

        /**
         * get a jQuery element representing this box
         * @return {jQuery.element}
         */

    }, {
        key: 'get',
        value: function get() {
            return this.svgObj.get();
        }

        /**
         * rotate the set of blocked nodes by 90 degrees to the right or to the left, depending on the parameter
         *
         * used to rotate the nodes when the object itself is rotated
         * @param  {boolean} right rotate clockwise if true, counterclockwise if false
         */

    }, {
        key: 'rotateBlockedNodes',
        value: function rotateBlockedNodes(right) {
            if (this.rotationParity === undefined) {
                this.rotationParity = false;
            }

            this.rotationParity = !this.rotationParity;

            var newBlockedNodes = new Set();

            // rotate the node

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.blockedNodes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var node = _step7.value;

                    var newNode = void 0;

                    if (this.rotationParity) {
                        if (right) {
                            newNode = {
                                x: Math.abs(node.y - this.gridHeight),
                                y: node.x
                            };
                        } else {
                            newNode = {
                                x: node.y,
                                y: Math.abs(node.x - this.gridWidth)
                            };
                        }
                    } else {
                        if (right) {
                            newNode = {
                                x: Math.abs(node.y - this.gridWidth),
                                y: node.x
                            };
                        } else {
                            newNode = {
                                x: node.y,
                                y: Math.abs(node.x - this.gridHeight)
                            };
                        }
                    }

                    newBlockedNodes.add(newNode);
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            this.blockedNodes = newBlockedNodes;
        }

        /**
         * rotate the set of blocked nodes to the right
         *
         * used to rotate the nodes when the object itself is rotated
         */

    }, {
        key: 'rotateBlockedNodesRight',
        value: function rotateBlockedNodesRight() {
            this.rotateBlockedNodes(true);
        }

        /**
         * rotate the set of blocked nodes to the right
         *
         * used to rotate the nodes when the object itself is rotated
         */

    }, {
        key: 'rotateBlockedNodesLeft',
        value: function rotateBlockedNodesLeft() {
            this.rotateBlockedNodes(false);
        }

        /**
         * add a connector to the element on the specified position
         * @param {number}  left             horizontal distance from the left edge of the element
         * @param {number}  top              vertical distance from the top edge of the element
         * @param {Boolean} isInputConnector whether or not should this connector an input connector (`true` for input connector, `false` for output connector)
         */

    }, {
        key: 'addConnector',
        value: function addConnector(left, top, isInputConnector) {
            var index = this.connectors.length;
            if (isInputConnector) {
                this.connectors[index] = new InputConnector(this.parentSVG, left, top);
            } else {
                this.connectors[index] = new OutputConnector(this.parentSVG, left, top);
            }
            this.svgObj.addChild(this.connectors[index].get());
        }

        /**
         * add an input connector to the element on the specified position
         * @param {number} left horizontal distance from the left edge of the element
         * @param {number} top  vertical distance from the top edge of the element
         */

    }, {
        key: 'addInputConnector',
        value: function addInputConnector(left, top) {
            return this.addConnector(left, top, true);
        }

        /**
         * add an output connector to the element on the specified position
         * @param {number} left horizontal distance from the left edge of the element
         * @param {number} top  vertical distance from the top edge of the element
         */

    }, {
        key: 'addOutputConnector',
        value: function addOutputConnector(left, top) {
            return this.addConnector(left, top, false);
        }

        /**
         * get the connector object based on its id
         * @param  {string} connectorId ID of the {@link Connector}
         * @return {Connector}             instance of the {@link Connector} or `undefined` if not found
         */

    }, {
        key: 'getConnectorById',
        value: function getConnectorById(connectorId) {
            for (var i = 0; i < this.connectors.length; i++) {
                if (this.connectors[i].id === connectorId) {
                    return this.connectors[i];
                }
            }
            // if connector not found, return undefined
            return undefined;
        }

        /**
         * get the instance of {@link Transform} representing the state of the transform attribute of this element
         * @param  {Boolean} [gridPixels=false] if `true`, function will return the result in grid pixels instead of SVG pixels
         * @return {Transform}                  {@link Transform} of the element
         */

    }, {
        key: 'getTransform',
        value: function getTransform() {
            var gridPixels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var transform = void 0;
            if (!this.svgObj.$el.attr("transform")) {
                // the element does not have a "transform" property --> create it
                transform = new Transform();
                transform.setTranslate(0, 0);
                this.svgObj.addAttr({ "transform": transform.get() });
            } else {
                // the element does have a "transform" property --> change it
                transform = new Transform(this.svgObj.$el.attr("transform"));
            }

            // convert values to grid pixels
            if (gridPixels) {
                transform.toGridPixels(this.parentSVG);
            }

            return transform;
        }

        /**
         * get the instance of {@link Transform} representing the state of the transform attribute of this element _with lenght units in grid pixels_
         * @return {Transform} {@link Transform} of the element
         */

    }, {
        key: 'getGridPixelTransform',
        value: function getGridPixelTransform() {
            return this.getTransform(true);
        }

        /**
         * set the transform attribute of this element
         * @param {Transform} transform {@link Transform} of the element (with lengths specified in SVG pixels)
         */

    }, {
        key: 'setTransform',
        value: function setTransform(transform) {
            this.svgObj.addAttr({ "transform": transform.get() });
        }

        /**
         * function that is called on every mouse down on this element
         *
         * moves the element to the front and calls onMouseDownLeft if applicable
         * @param  {jQuery.MouseEvent} event
         */

    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            this.mouseLeft = false;
            if (event.which === 1) {
                this.mouseLeft = true;
                this.onMouseDownLeft(event);

                // move the DOM element to front
                this.parentSVG.moveToFrontById(this.svgObj.id);
            }
        }

        /**
         * function that is called on every left mouse down on this element
         *
         * prepares element for the "click" and "drag and drop" actions
         * @param  {jQuery.MouseEvent} event
         */

    }, {
        key: 'onMouseDownLeft',
        value: function onMouseDownLeft(event) {
            this.mouseMoved = false;

            var transform = this.getTransform();

            // save the current item position into a variable
            var currentPosition = transform.getTranslate();

            var _parentSVG$viewbox$tr = this.parentSVG.viewbox.transformEvent(event),
                pageX = _parentSVG$viewbox$tr.pageX,
                pageY = _parentSVG$viewbox$tr.pageY;

            // calculate mouse offset from the object origin


            this.offset = {
                x: pageX - currentPosition.x,
                y: pageY - currentPosition.y
            };
        }

        /**
         * function that is called on every left mouse move with this element
         * applies the correct transform values to provide the "drag and drop" functionality
         * @param  {jQuery.MouseEvent} event
         */

    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            if (this.mouseLeft) {
                this.svgObj.$el.addClass('grabbed');

                this.mouseMoved = true;

                var _parentSVG$viewbox$tr2 = this.parentSVG.viewbox.transformEvent(event),
                    pageX = _parentSVG$viewbox$tr2.pageX,
                    pageY = _parentSVG$viewbox$tr2.pageY;

                var left = pageX - this.offset.x;
                var top = pageY - this.offset.y;

                var transform = this.getTransform();
                transform.setTranslate(left, top);

                this.setTransform(transform);

                this.updateWires(true);
            }
        }

        /**
         * function that is called on every mouse up on this element
         * provides the "click" functionality and calls the onDrop handler for the "drag and drop" functionality
         * @param  {jQuery.MouseEvent} event
         */

    }, {
        key: 'onMouseUp',
        value: function onMouseUp(event) {
            if (event.which === 1) {
                if (this.mouseMoved) {
                    this.onDrop(event);
                } else {
                    this.onClick();
                }
            } else if (event.which === 2) {
                this.onClickMiddle(event);
            }

            this.svgObj.$el.removeClass('grabbed');
        }

        /**
         * called by onMouseUp when the mouse has been moved between onMouseDown and onMouseUp
         *
         * applies grid snapping of the element on the end of the "drag and drop" action
         * @param  {jQuery.MouseEvent} event
         */

    }, {
        key: 'onDrop',
        value: function onDrop(event) {
            var _parentSVG$viewbox$tr3 = this.parentSVG.viewbox.transformEvent(event),
                pageX = _parentSVG$viewbox$tr3.pageX,
                pageY = _parentSVG$viewbox$tr3.pageY;

            var left = pageX - this.offset.x;
            var top = pageY - this.offset.y;

            left = this.parentSVG.snapToGrid(left);
            top = this.parentSVG.snapToGrid(top);

            var transform = this.getTransform();
            transform.setTranslate(left, top);

            this.setTransform(transform);

            this.updateWires();

            // if tutorial exists, call tutorial callback
            if (this.parentSVG.tutorial) {
                this.parentSVG.tutorial.onBoxMoved();
            }
        }

        /**
         * empty function, will be redefined in InputBox
         */

    }, {
        key: 'onClick',
        value: function onClick() {}

        /**
         * custom callback function for middle click that rotates the box by 90 degrees to the right
         */

    }, {
        key: 'onClickMiddle',
        value: function onClickMiddle(event) {
            // get the transform value for this box
            var transform = this.getTransform();

            // get the bounding rectangle for this box
            var rect = this.svgObj.$el[0].getBoundingClientRect();

            // use the bounding rectangle dimensions to figure out the geometrical centre of the box
            var centreX = Math.round(rect.width / 2);
            var centreY = Math.round(rect.height / 2);

            centreX -= centreX % this.gridSize;
            centreY -= centreY % this.gridSize;

            // apply the rotation to the transform object
            if (event.ctrlKey) {
                transform.rotateLeft(centreX, centreY);
            } else {
                transform.rotateRight(centreX, centreY);
            }

            // apply the modified transform object ot the svgObj
            this.svgObj.addAttr({ "transform": transform.get() });

            // rotate also the blocked nodes
            if (event.ctrlKey) {
                this.rotateBlockedNodesLeft();
            } else {
                this.rotateBlockedNodesRight();
            }

            // update the wires
            this.updateWires();

            // if tutorial exists, call tutorial callback
            if (this.parentSVG.tutorial) {
                this.parentSVG.tutorial.onBoxRotated();
            }
        }

        /**
         * Updates all wires connected to this box. Iterates over all wires that are connected to this box
         * and calls routeWire (or temporaryWire if the `temporary` parameter is set to true) to update the wire routing
         * @param  {Boolean} [temporary=false] [description]
         */

    }, {
        key: 'updateWires',
        value: function updateWires() {
            var _this5 = this;

            var temporary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.connectors.forEach(function (conn) {
                conn.wireIds.forEach(function (wireId) {
                    var wire = _this5.parentSVG.getWireById(wireId);
                    if (temporary) {
                        wire.temporaryWire();
                    } else {
                        wire.routeWire();
                    }
                });
            });
        }
    }, {
        key: 'url',
        get: function get() {
            var category = this.category || "",
                name = this.name || "",
                suffix = this.imgSuffix || "";

            return 'img/svg/' + category + '/' + name + suffix + '.svg';
        }

        /**
         * get all input connectors of this box
         * @return {Array} array of input connectors
         */

    }, {
        key: 'inputConnectors',
        get: function get() {
            return this.connectors.filter(function (conn) {
                return conn.isInputConnector;
            });
        }

        /**
         * get all output connectors of this box
         * @return {Array} array of output connectors
         */

    }, {
        key: 'outputConnectors',
        get: function get() {
            return this.connectors.filter(function (conn) {
                return conn.isOutputConnector;
            });
        }

        /**
         * get data of this box as a JSON-ready object
         * @return {Object} javascript object containing essential data for this box
         */

    }, {
        key: 'exportData',
        get: function get() {
            var connections = [];

            // go through all connectors
            var counter = 0;
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = this.connectors[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var conn = _step8.value;

                    // go through each its wire id
                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;

                    try {
                        for (var _iterator9 = conn.wireIds[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var item = _step9.value;

                            var thisWireId = void 0;
                            if (!this.parentSVG.exportWireIdMap.has(item)) {
                                // if the wire id is not in the map, add it and assign new arbitrary id
                                this.parentSVG.exportWireIdMap.set(item, this.parentSVG.exportWireId);
                                thisWireId = this.parentSVG.exportWireId;
                                this.parentSVG.exportWireId++;
                            } else {
                                // else get id from the map
                                thisWireId = this.parentSVG.exportWireIdMap.get(item);
                            }

                            // add this connection to the list
                            connections[connections.length] = {
                                index: counter,
                                type: conn.type,
                                wireId: thisWireId
                            };
                        }
                    } catch (err) {
                        _didIteratorError9 = true;
                        _iteratorError9 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                _iterator9.return();
                            }
                        } finally {
                            if (_didIteratorError9) {
                                throw _iteratorError9;
                            }
                        }
                    }

                    counter++;
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return {
                name: this.name,
                category: this.category,
                transform: this.getTransform(true),
                connections: connections
            };
        }
    }]);

    return Box;
}(NetworkElement);

var Repeater = exports.Repeater = function (_Box) {
    _inherits(Repeater, _Box);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     */
    function Repeater(parentSVG) {
        _classCallCheck(this, Repeater);

        var gridHeight = 4;
        var gridWidth = 9;

        var _this6 = _possibleConstructorReturn(this, (Repeater.__proto__ || Object.getPrototypeOf(Repeater)).call(this, parentSVG, "repeater", "other", gridWidth, gridHeight));

        _this6.addInputConnector(0, gridHeight / 2);
        _this6.addOutputConnector(gridWidth, gridHeight / 2);

        // regenerate blocked nodes
        _this6.generateBlockNodes();
        return _this6;
    }

    /**
     * Set the output connector state to match the state of the input connector
     */


    _createClass(Repeater, [{
        key: 'refreshState',
        value: function refreshState() {
            this.parentSVG.simulation.notifyChange(this.connectors[1].id, this.connectors[0].state);
        }
    }, {
        key: 'generateBlockNodes',
        value: function generateBlockNodes() {
            var _get2;

            // block the input and output connector nodes
            var specialNodes = [{ x: 0, y: this.gridHeight / 2 }, { x: this.gridWidth, y: this.gridHeight / 2 }];
            (_get2 = _get(Repeater.prototype.__proto__ || Object.getPrototypeOf(Repeater.prototype), 'generateBlockNodes', this)).call.apply(_get2, [this, 0, 1, 0, 1].concat(specialNodes));
        }
    }]);

    return Repeater;
}(Box);

/**
 * InputBox has only output connectors and is used to set the input states for the logic network.
 * @extends Box
 */


var InputBox = exports.InputBox = function (_Box2) {
    _inherits(InputBox, _Box2);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {Boolean} [isOn=false] the initial state of the inputbox (`true` is *on*, `false` is *off*)
     */
    function InputBox(parentSVG) {
        var isOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, InputBox);

        var gridWidth = 7;
        var gridHeight = 4;

        var _this7 = _possibleConstructorReturn(this, (InputBox.__proto__ || Object.getPrototypeOf(InputBox)).call(this, parentSVG, "input", "other", gridWidth, gridHeight));

        _this7.addConnector(gridWidth, gridHeight / 2, false);

        _this7.on = isOn;

        _this7.generateBlockNodes();
        return _this7;
    }

    /**
     * get data of this input box as a JSON-ready object
     * @return {Object} javascript object containing essential data for this input box
     */


    _createClass(InputBox, [{
        key: 'generateBlockNodes',
        value: function generateBlockNodes() {
            // block the input connector node
            var specialNode = {
                x: this.gridWidth,
                y: this.gridHeight / 2
            };
            _get(InputBox.prototype.__proto__ || Object.getPrototypeOf(InputBox.prototype), 'generateBlockNodes', this).call(this, 0, 1, 1, 0, specialNode);
        }

        /**
         * start a new simulation from the output connector
         */

    }, {
        key: 'refreshState',
        value: function refreshState() {
            this.parentSVG.startNewSimulation(this.connectors[0], this.connectors[0].state);
        }

        /**
         * set the state of the inputbox to the corresponding value
         * @param  {Boolean} isOn set to *on* if `true`, set to *off* if `false`
         */

    }, {
        key: 'onClick',


        /**
         * toggle the state of the inputbox
         */
        value: function onClick() {
            this.on = !this.on;

            if (this.parentSVG.tutorial) {
                this.parentSVG.tutorial.onChangeInputBoxState();
            }
        }
    }, {
        key: 'exportData',
        get: function get() {
            var data = _get(InputBox.prototype.__proto__ || Object.getPrototypeOf(InputBox.prototype), 'exportData', this);
            data.isOn = this.isOn;

            return data;
        }
    }, {
        key: 'on',
        set: function set(isOn) {
            if (isOn) {
                // turn on
                this.changeImage("on");
                this.connectors[0].setState(_logic2.default.state.on);
                this.refreshState();
            } else {
                // turn off
                this.changeImage();
                this.connectors[0].setState(_logic2.default.state.off);
                this.refreshState();
            }

            this.isOn = isOn;
        }

        /**
         * get the state of the inputbox (`true` if *on*, `false` if *off*)
         * @return {Boolean} [description]
         */
        ,
        get: function get() {
            return this.isOn;
        }
    }]);

    return InputBox;
}(Box);

/**
 * OutputBox has only input connectors and is used to visualize the output states of the logic network.
 * @extends Box
 */


var OutputBox = exports.OutputBox = function (_Box3) {
    _inherits(OutputBox, _Box3);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     */
    function OutputBox(parentSVG) {
        _classCallCheck(this, OutputBox);

        var gridHeight = 4;
        var gridWidth = 5;

        var _this8 = _possibleConstructorReturn(this, (OutputBox.__proto__ || Object.getPrototypeOf(OutputBox)).call(this, parentSVG, "output", "other", gridWidth, gridHeight));

        _this8.addConnector(0, gridHeight / 2, true);

        _this8.generateBlockNodes();
        return _this8;
    }

    /**
     * set state of this output box to match the state of its input connector
     */


    _createClass(OutputBox, [{
        key: 'refreshState',
        value: function refreshState() {
            this.setState(this.connectors[0].state);
        }

        /**
         * Reflect the input connector state in the appearance of the element - set
         * the element image to represent the corresponding state
         * @param {Logic.state} state new state of this outputBox
         */

    }, {
        key: 'setState',
        value: function setState(state) {
            switch (state) {
                case _logic2.default.state.on:
                    this.changeImage("on");

                    // if tutorial exists, call tutorial callback
                    if (this.parentSVG.tutorial) {
                        this.parentSVG.tutorial.onOutputBoxTrue();
                    }
                    break;
                case _logic2.default.state.off:
                    this.changeImage("off");
                    break;
                case _logic2.default.state.unknown:
                    this.changeImage();
                    break;
                case _logic2.default.state.oscillating:
                    this.changeImage("osc");
                    break;
            }
        }
    }, {
        key: 'generateBlockNodes',
        value: function generateBlockNodes() {
            // block the input connector node
            var specialNode = {
                x: 0,
                y: this.gridHeight / 2
            };
            _get(OutputBox.prototype.__proto__ || Object.getPrototypeOf(OutputBox.prototype), 'generateBlockNodes', this).call(this, 0, 0, 0, 1, specialNode);
        }
    }]);

    return OutputBox;
}(Box);

/**
 * Gate is a box that processes the states of its input connectors and returns the result in its output connectors.
 * @extends Box
 */


var Gate = exports.Gate = function (_Box4) {
    _inherits(Gate, _Box4);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string} name       name of the gate (and, not, xor...)
     */
    function Gate(parentSVG, name) {
        _classCallCheck(this, Gate);

        var width = 9;
        var height = 4;

        // ADD CONNECTORS

        var _this9 = _possibleConstructorReturn(this, (Gate.__proto__ || Object.getPrototypeOf(Gate)).call(this, parentSVG, name, "gate", width, height));

        var specialNodes = [];

        // output
        _this9.addConnector(width, height / 2, false);

        // block the output connector
        specialNodes.push({
            x: width,
            y: height / 2
        });

        if (_this9.name === "not") {
            // input
            _this9.addConnector(0, height / 2, true);
            // block the input connector
            specialNodes.push({
                x: 0,
                y: height / 2
            });
        } else {
            // input
            _this9.addConnector(0, height / 4, true);
            _this9.addConnector(0, height / (4 / 3), true);

            // block the input connectors
            specialNodes.push({
                x: 0,
                y: height / 4
            });
            specialNodes.push({
                x: 0,
                y: height / (4 / 3)
            });

            // add one blocked node between the inputs (for better looking wiring)
            specialNodes.push({
                x: 0,
                y: height / 2
            });
        }

        _this9.generateBlockNodes.apply(_this9, specialNodes);

        _this9.refreshState();
        return _this9;
    }

    _createClass(Gate, [{
        key: 'generateBlockNodes',
        value: function generateBlockNodes() {
            for (var _len2 = arguments.length, specialNodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                specialNodes[_key2] = arguments[_key2];
            }

            if (specialNodes !== undefined) {
                var _get3;

                (_get3 = _get(Gate.prototype.__proto__ || Object.getPrototypeOf(Gate.prototype), 'generateBlockNodes', this)).call.apply(_get3, [this, 0, 1, 0, 1].concat(specialNodes));
            } else {
                _get(Gate.prototype.__proto__ || Object.getPrototypeOf(Gate.prototype), 'generateBlockNodes', this).call(this, 0, 1, 0, 1);
            }
        }

        /**
         * proccess the input connector states and reflect them in the output connector states according
         * to the logic corresponding to this gate's name
         */

    }, {
        key: 'refreshState',
        value: function refreshState() {
            var state = _logic2.default.state.unknown;
            switch (this.name) {
                case "and":
                    state = _logic2.default.and(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "nand":
                    state = _logic2.default.nand(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "nor":
                    state = _logic2.default.nor(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "not":
                    state = _logic2.default.not(this.connectors[1].state);
                    break;
                case "or":
                    state = _logic2.default.or(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "xnor":
                    state = _logic2.default.xnor(this.connectors[1].state, this.connectors[2].state);
                    break;
                case "xor":
                    state = _logic2.default.xor(this.connectors[1].state, this.connectors[2].state);
                    break;
            }
            // notify the simulator about this change
            this.parentSVG.simulation.notifyChange(this.connectors[0].id, state);
        }
    }]);

    return Gate;
}(Box);

/**
 * Blackbox is a box that is defined by its evaluation function
 * @extends Box
 */


var Blackbox = exports.Blackbox = function (_Box5) {
    _inherits(Blackbox, _Box5);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {number} inputConnectors  number of input connectors
     * @param {number} outputConnectors number of output connectors
     * @param {Function} evalFunction   function that takes `inputConnectors` [Logic.state](./module-Logic.html#.state)s
     *                                  and returns `outputConnectors` Logic.states.
     * @param {String} [name]        name that will be displayed on the blackbox
     */
    function Blackbox(parentSVG, inputConnectors, outputConnectors, evalFunction) {
        var name = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

        _classCallCheck(this, Blackbox);

        var width = 11;
        var height = Math.max(inputConnectors, outputConnectors) * 2;

        var _this10 = _possibleConstructorReturn(this, (Blackbox.__proto__ || Object.getPrototypeOf(Blackbox)).call(this, parentSVG, name, "blackbox", width, height));

        var connectorPinLenght = 2.5 * _this10.gridSize;

        // override default svgObj structure
        _this10.svgObj = new svgObj.Group();

        // transparent background rectangle
        var hitbox = new svgObj.Rectangle(0, 0, _this10.width, _this10.height, "none", "none");
        hitbox.$el.addClass('rect');

        _this10.svgObj.addChild(hitbox);

        // main rectangle
        var bodyWidth = _this10.width - 2 * connectorPinLenght;

        var rectangle = new svgObj.Rectangle(connectorPinLenght, 0, bodyWidth, _this10.height, "white", "black");
        rectangle.addAttr({ 'stroke-width': '2.5' });
        rectangle.$el.addClass('rect');

        _this10.svgObj.addChild(rectangle);

        // text description of the box
        var textWidth = bodyWidth - _this10.gridSize;
        var textHeight = _this10.height - _this10.gridSize;
        var text = new svgObj.MultiLineText((_this10.width - textWidth) / 2, // horizontal centering
        (_this10.height - textHeight) / 2, // vertical centering
        textWidth, _this10.height, name.toUpperCase(), _this10.gridSize * 1.2);
        _this10.svgObj.addChild(text);

        // add input connectors
        for (var i = 0; i < inputConnectors; ++i) {
            var gridPosition = i * 2 + 1;
            var pixelPosition = gridPosition * _this10.gridSize;

            var pin = new svgObj.PolyLine(new svgObj.PolylinePoints([new svgObj.PolylinePoint(0, pixelPosition), new svgObj.PolylinePoint(connectorPinLenght, pixelPosition)]), 1, "black");

            _this10.svgObj.addChild(pin);

            // add the connector
            _this10.addInputConnector(0, gridPosition);
        }

        // add output connectors
        for (var _i = 0; _i < outputConnectors; ++_i) {
            var _gridPosition = _i * 2 + 1;
            var _pixelPosition = _gridPosition * _this10.gridSize;

            var _pin = new svgObj.PolyLine(new svgObj.PolylinePoints([new svgObj.PolylinePoint(_this10.width - connectorPinLenght, _pixelPosition), new svgObj.PolylinePoint(_this10.width, _pixelPosition)]), 1, "black");

            _this10.svgObj.addChild(_pin);

            _this10.addOutputConnector(width, _gridPosition);
        }

        _this10.svgObj.$el.addClass("box");

        /**
         * function that takes `inputConnectors` [Logic.state](./module-Logic.html#.state)s
         * and returns `outputConnectors` Logic.states.
         */
        _this10.evalFunction = evalFunction;

        // regenerate the blocked nodes after adding all the connectors
        _this10.generateBlockNodes();
        return _this10;
    }

    /**
     * get data of this blackbox as a JSON-ready object
     * @return {Object} javascript object containing essential data for this blackbox
     */


    _createClass(Blackbox, [{
        key: 'refreshState',


        /**
         * proccess the input connector states and reflect them in the output connector states according
         * to the logic defined by this.evalFunction
         */
        value: function refreshState() {
            var inputStates = this.inputConnectors.map(function (conn) {
                return conn.state;
            });
            // call the evalFunction to get the output states
            var outputStates = this.evalFunction.apply(this, _toConsumableArray(inputStates));

            // apply the outputStates to the outputConnectors
            for (var i = 0; i < outputStates.length; ++i) {
                this.outputConnectors[i].setState(outputStates[i]);
            }
        }
    }, {
        key: 'generateBlockNodes',
        value: function generateBlockNodes() {
            var _get4;

            // add blocked nodes on the connectors and between them as well

            var specialNodes = [];
            for (var i = 1; i < this.inputConnectors.length * 2; ++i) {
                specialNodes.push({
                    x: 0,
                    y: i
                });
            }
            for (var _i2 = 1; _i2 < this.outputConnectors.length * 2; ++_i2) {
                specialNodes.push({
                    x: this.gridWidth,
                    y: _i2
                });
            }

            (_get4 = _get(Blackbox.prototype.__proto__ || Object.getPrototypeOf(Blackbox.prototype), 'generateBlockNodes', this)).call.apply(_get4, [this, 0, 1, 0, 1].concat(specialNodes));
        }
    }, {
        key: 'exportData',
        get: function get() {
            var data = _get(Blackbox.prototype.__proto__ || Object.getPrototypeOf(Blackbox.prototype), 'exportData', this);
            data.inputs = this.inputConnectors.length;
            data.outputs = this.outputConnectors.length;

            // generate the truth table

            data.table = [];

            // array of tested input states
            var stateList = _logic2.default.stateList;

            // recursive function that generates all possible inputs
            var getPermutations = function getPermutations(length) {
                var permutations = [];
                switch (length) {
                    case 0:
                        return [];
                    case 1:
                        var _iteratorNormalCompletion10 = true;
                        var _didIteratorError10 = false;
                        var _iteratorError10 = undefined;

                        try {
                            for (var _iterator10 = stateList[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                var state = _step10.value;

                                permutations.push([state]);
                            }
                        } catch (err) {
                            _didIteratorError10 = true;
                            _iteratorError10 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                    _iterator10.return();
                                }
                            } finally {
                                if (_didIteratorError10) {
                                    throw _iteratorError10;
                                }
                            }
                        }

                        return permutations;
                    default:
                        var _iteratorNormalCompletion11 = true;
                        var _didIteratorError11 = false;
                        var _iteratorError11 = undefined;

                        try {
                            for (var _iterator11 = stateList[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                var _state = _step11.value;
                                var _iteratorNormalCompletion12 = true;
                                var _didIteratorError12 = false;
                                var _iteratorError12 = undefined;

                                try {
                                    for (var _iterator12 = getPermutations(length - 1)[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                        var perm = _step12.value;

                                        permutations.push([_state].concat(_toConsumableArray(perm)));
                                    }
                                } catch (err) {
                                    _didIteratorError12 = true;
                                    _iteratorError12 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                            _iterator12.return();
                                        }
                                    } finally {
                                        if (_didIteratorError12) {
                                            throw _iteratorError12;
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError11 = true;
                            _iteratorError11 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                    _iterator11.return();
                                }
                            } finally {
                                if (_didIteratorError11) {
                                    throw _iteratorError11;
                                }
                            }
                        }

                        return permutations;
                }
            };

            // generate outputs for all the possible inputs
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = getPermutations(data.inputs)[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var inputValues = _step13.value;

                    var outputValues = this.evalFunction.apply(this, _toConsumableArray(inputValues));

                    // if there is an output value that is not Logic.state.unknown, add this line to the
                    // truthtable, otherwise don't add it (if all output values are Logic.state.unknown,
                    // the input combination does not have to be defines, because Logic.state.unknown is the default value)
                    if (outputValues.reduce(function (accumulator, current) {
                        return accumulator || current !== _logic2.default.state.unknown;
                    })) {
                        data.table.push([].concat(_toConsumableArray(inputValues), _toConsumableArray(outputValues)));
                    }
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }

            return data;
        }
    }]);

    return Blackbox;
}(Box);

/**
 * Wire represents connection of two {@link Connector}s.
 * @extends NetworkElement
 */


var Wire = exports.Wire = function (_NetworkElement3) {
    _inherits(Wire, _NetworkElement3);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string}  fromId    id of the first connector this wire will be connected to
     * @param {string}  toId      id of the second connector this wire will be connected to
     * @param {Boolean} [refresh=true] if `true`, the [Canvas](./module-Canvas.html) will refresh after creating this wire
     */
    function Wire(parentSVG, fromId, toId) {
        var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var route = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        _classCallCheck(this, Wire);

        var _this11 = _possibleConstructorReturn(this, (Wire.__proto__ || Object.getPrototypeOf(Wire)).call(this, parentSVG));

        _this11.gridSize = parentSVG.gridSize;

        _this11.fromId = fromId;
        _this11.toId = toId;

        _this11.startBox = _this11.parentSVG.getBoxByConnectorId(fromId);
        _this11.endBox = _this11.parentSVG.getBoxByConnectorId(toId);

        _this11.boxes = [_this11.startBox, _this11.endBox];

        _this11.startConnector = _this11.parentSVG.getConnectorById(fromId);
        _this11.endConnector = _this11.parentSVG.getConnectorById(toId);

        _this11.connectors = [_this11.startConnector, _this11.endConnector];

        if (route) {
            _this11.routeWire(true, refresh);
        } else {
            _this11.temporaryWire();
        }

        _this11.elementState = _logic2.default.state.unknown;

        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
            for (var _iterator14 = _this11.connectors[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                var connector = _step14.value;

                if (connector.isOutputConnector) {
                    _this11.setState(connector.state);
                }
            }
        } catch (err) {
            _didIteratorError14 = true;
            _iteratorError14 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                    _iterator14.return();
                }
            } finally {
                if (_didIteratorError14) {
                    throw _iteratorError14;
                }
            }
        }

        _this11.svgObj.$el.addClass("wire");
        return _this11;
    }

    /**
     * get data of this wire as a JSON-ready object
     * @return {Object} javascript object containing essential data for this wire
     */


    _createClass(Wire, [{
        key: 'setState',


        /**
         * set the state of this wire to match the state of the input connector it is connected to
         * @param {Logic.state} state [description]
         */
        value: function setState(state) {
            this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);

            switch (state) {
                case _logic2.default.state.unknown:
                    this.svgObj.addClass(stateClasses.unknown);
                    break;
                case _logic2.default.state.on:
                    this.svgObj.addClass(stateClasses.on);
                    break;
                case _logic2.default.state.off:
                    this.svgObj.addClass(stateClasses.off);
                    break;
                case _logic2.default.state.oscillating:
                    this.svgObj.addClass(stateClasses.oscillating);
                    break;
            }

            if (this.startConnector.isInputConnector) {
                this.startConnector.setState(state);
            }
            if (this.endConnector.isInputConnector) {
                this.endConnector.setState(state);
            }

            this.elementState = state;
        }

        /**
         * get the current [Logic.state](./modules-Logic.html#.state) of this wire
         * @return {Logic.state}
         */

    }, {
        key: 'updateWireState',


        /**
         * update the state of this wire
         */
        value: function updateWireState() {
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this.boxes[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var box = _step15.value;

                    box.refreshState();
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }
        }

        /**
         * get the jQuery element for this wire
         * @return {jQuery.element}
         */

    }, {
        key: 'get',
        value: function get() {
            return this.svgObj.get();
        }

        /**
         * get the polyline points for a temporary wire placement connecting the two connectors
         * @return {PolylinePoints} new instance of {@link PolylinePoints}
         */

    }, {
        key: 'getTemporaryWirePoints',
        value: function getTemporaryWirePoints() {
            var points = new svgObj.PolylinePoints();
            points.append(new svgObj.PolylinePoint(this.wireStart.x, this.wireStart.y));
            points.append(new svgObj.PolylinePoint(this.wireEnd.x, this.wireEnd.y));
            return points;
        }

        /**
         * route the wire using the temporary wire points
         */

    }, {
        key: 'temporaryWire',
        value: function temporaryWire() {
            this.wireStart = this.parentSVG.getConnectorPosition(this.startConnector, false);
            this.wireEnd = this.parentSVG.getConnectorPosition(this.endConnector, false);

            this.setWirePath(this.getTemporaryWirePoints());
        }

        /**
         * route the wire using the modified A* wire routing algorithm
         */

    }, {
        key: 'routeWire',
        value: function routeWire() {
            var snapToGrid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.wireStart = this.parentSVG.getConnectorPosition(this.startConnector, snapToGrid);
            this.wireEnd = this.parentSVG.getConnectorPosition(this.endConnector, snapToGrid);

            this.points = this.findRoute({
                x: this.wireStart.x / this.gridSize,
                y: this.wireStart.y / this.gridSize
            }, {
                x: this.wireEnd.x / this.gridSize,
                y: this.wireEnd.y / this.gridSize
            });

            this.setWirePath(this.points);

            if (refresh) this.updateWireState();

            // regenerate inconvenient nodes
            this.generateInconvenientNodes();
        }

        /**
         * set the wire to follow the specified points
         * @param {PolylinePoints} points instance of {@link PolylinePoints}
         */

    }, {
        key: 'setWirePath',
        value: function setWirePath(points) {
            // set the line
            if (this.svgObj !== undefined) {
                // this.svgObj.updatePoints(points);
                var _iteratorNormalCompletion16 = true;
                var _didIteratorError16 = false;
                var _iteratorError16 = undefined;

                try {
                    for (var _iterator16 = this.svgObj.children[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                        var child = _step16.value;

                        child.updatePoints(points);
                    }
                } catch (err) {
                    _didIteratorError16 = true;
                    _iteratorError16 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion16 && _iterator16.return) {
                            _iterator16.return();
                        }
                    } finally {
                        if (_didIteratorError16) {
                            throw _iteratorError16;
                        }
                    }
                }
            } else {
                // this.svgObj = new svgObj.PolyLine(points, 2, "#8b8b8b");
                this.svgObj = new svgObj.Group();

                var hitbox = new svgObj.PolyLine(points, 10, 'white');
                hitbox.addClass("hitbox");
                hitbox.addAttr({ opacity: 0 });
                this.svgObj.addChild(hitbox);

                var mainLine = new svgObj.PolyLine(points, 2);
                mainLine.addClass("main", "stateUnknown");
                this.svgObj.addChild(mainLine);
            }

            this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);
            this.svgObj.addClass(stateClasses.unknown);

            this.svgObj.addAttr({
                fromId: this.fromId,
                toId: this.toId
            });
        }

        /**
         * TODO
         */

    }, {
        key: 'pathToPolyline',
        value: function pathToPolyline(path) {
            var totalPath = new svgObj.PolylinePoints();
            var _iteratorNormalCompletion17 = true;
            var _didIteratorError17 = false;
            var _iteratorError17 = undefined;

            try {
                for (var _iterator17 = path[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                    var point = _step17.value;

                    totalPath.append(new svgObj.PolylinePoint(point.x * this.gridSize, point.y * this.gridSize));
                }
            } catch (err) {
                _didIteratorError17 = true;
                _iteratorError17 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion17 && _iterator17.return) {
                        _iterator17.return();
                    }
                } finally {
                    if (_didIteratorError17) {
                        throw _iteratorError17;
                    }
                }
            }

            return totalPath;
        }

        /**
         * find a nice route for the wire
         * @param  {Object} start object containing numeric attributes `x` and `y` that represent the first endpoint of the wire in grid pixel
         * @param  {Object} end   object containing numeric attributes `x` and `y` that represent the second endpoint of the wire in grid pixels
         * @return {PolylinePoints}       [description]
         */

    }, {
        key: 'findRoute',
        value: function findRoute(start, end) {
            var nonRoutable = this.parentSVG.getNonRoutableNodes();

            var punishedButRoutable = void 0;
            if (this.svgObj === undefined) {
                punishedButRoutable = this.parentSVG.getInconvenientNodes();
            } else {
                punishedButRoutable = this.parentSVG.getInconvenientNodes(this.svgObj.id);
            }

            var path = (0, _findPath2.default)(start, end, nonRoutable, punishedButRoutable, this.gridSize);

            if (path) {
                return this.pathToPolyline(path);
            }

            // if a path was not found, try again but don't take into account the punished and non routable node
            path = (0, _findPath2.default)(start, end, new Set(), new Set(), this.gridSize);

            if (path) {
                return this.pathToPolyline(path);
            }

            // if the path was still not found, give up and return temporary points
            return this.getTemporaryWirePoints();
        }

        /**
         * generate a set of nodes, that are inconvenient for wiring, but can be used, just are not preferred
         * @return {Set} set of nodes (objects containing x and y coordinates) that are not preferred for wiring
         */

    }, {
        key: 'generateInconvenientNodes',
        value: function generateInconvenientNodes() {
            var _this12 = this;

            this.inconvenientNodes = new Set();

            var prevPoint = void 0;

            this.points.forEach(function (point) {
                var x = _this12.parentSVG.SVGToGrid(point.x),
                    y = _this12.parentSVG.SVGToGrid(point.y);

                if (prevPoint === undefined) {
                    // if the prevPoint is undefined, add the first point
                    _this12.inconvenientNodes.add({ x: x, y: y });
                } else {
                    // else add all the point between the prevPoint (excluded) and point (included)

                    if (prevPoint.x === x) {
                        // if the line is horizontal
                        var from = Math.min(prevPoint.y, y);
                        var to = Math.max(prevPoint.y, y);

                        while (from <= to) {
                            _this12.inconvenientNodes.add({ x: x, y: from });
                            from++;
                        }
                    } else if (prevPoint.y === y) {
                        // if the line is vertical
                        var _from = Math.min(prevPoint.x, x);
                        var _to = Math.max(prevPoint.x, x);

                        while (_from <= _to) {
                            _this12.inconvenientNodes.add({ x: _from, y: y });
                            _from++;
                        }
                    } else {
                        // line is neither horizontal nor vertical, throw an error for better future debugging
                        // console.error("getInconvenientNodes: line between two points is neither horizontal nor vertical");
                    }
                }

                // set new prevPoint
                prevPoint = { x: x, y: y };
            });
        }
    }, {
        key: 'exportData',
        get: function get() {
            return {
                fromId: this.fromId,
                toId: this.toId
            };
        }
    }, {
        key: 'state',
        get: function get() {
            return this.elementState;
        }
    }]);

    return Wire;
}(NetworkElement);

},{"./findPath":13,"./logic":17,"./svgObjects":22}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findPath;

var _helperFunctions = require('./helperFunctions');

var _mapWithDefaultValue = require('./mapWithDefaultValue');

var _mapWithDefaultValue2 = _interopRequireDefault(_mapWithDefaultValue);

var _libstl = require('libstl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// note: imported from a node module

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
 *                              - 0: up
 *                              - 1: right
 *                              - 2: down
 *                              - 3: left
 * @return {Object}           object containing numeric attributes `x` and `y`
 */
function movePoint(point, direction) {
    switch (direction) {
        case 0:
            // up
            return {
                x: point.x,
                y: point.y - 1
            };
        case 1:
            // right
            return {
                x: point.x + 1,
                y: point.y
            };
        case 2:
            // down
            return {
                x: point.x,
                y: point.y + 1
            };
        case 3:
            // left
            return {
                x: point.x - 1,
                y: point.y
            };
    }
}

/**
 * helper backtracking function used by the aStar algorithm to construct the final path
 * @param  {Object} cameFrom    object containing numeric attributes `x` and `y`
 * @param  {Object} currentNode object containing numeric attributes `x` and `y`
 * @return {TODO}
 */
function reconstructPath(cameFrom, currentNode) {
    var path = [];

    path.push({
        x: currentNode.x,
        y: currentNode.y
    });

    while (cameFrom.has(currentNode)) {
        currentNode = cameFrom.get(currentNode);
        path.push({
            x: currentNode.x,
            y: currentNode.y
        });
    }

    return path;
}

/**
 * Heavily modified implementation of the A* algorithm
 * @param  {Object} start object containing numeric attributes `x` and `y` that represent the first endpoint of the wire in grid pixels
 * @param  {Object} end   object containing numeric attributes `x` and `y` that represent the second endpoint of the wire in grid pixels
 * @param  {Set} nonRoutable set of non routable nodes
 * @param  {Set} punishedButRoutable set of nodes that are not optimal for routing
 * @return {TODO}
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
                    // if this not the end point, break
                    if (newPoint.x !== end.x || newPoint.y !== end.y) {
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

},{"./helperFunctions":15,"./mapWithDefaultValue":19,"libstl":9}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helperFunctions = require("./helperFunctions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * FloatingButton represents a button that is used in the floating menu in the right bottom corner
 * of the application. It may have a custom tooltip and callback on the click event
 */
var FloatingButton =
/**
 * @param {string} buttonClass Custom string that identifies the SVG icon used on this button. This string is also added as a CSS class to the button.
 * @param {string} tooltip     tooltip for the button, that will be displayed on hover and also used as alternative title for the image
 * @param {Function} clickEvent  custom callback when user clicks the button
 * @param {Canvas} parentSVG   reference to the parent SVG element
 */
function FloatingButton(buttonClass, tooltip, clickEvent, parentSVG) {
    var _this = this;

    _classCallCheck(this, FloatingButton);

    /**
     * jQuery element representing the button
     * @type {jQuery.element}
     */
    this.$el = $('<a>');

    // add classes to the element
    this.$el.addClass("button");
    this.$el.addClass(buttonClass);

    // add the icon
    this.$el.append($("<img>").attr("src", "img/gui/" + buttonClass + ".svg").attr("alt", tooltip));

    // add the tooltip element and an event listener if tooltip is defined
    if (tooltip) {
        /**
         * jQuery element representing the tooltip
         * @type {jQuery.element}
         */
        this.$tooltip = $("<div>");
        this.$tooltip.addClass("tooltip").html(tooltip);

        parentSVG.$svg.after(this.$tooltip);

        this.$el.hover(function () {
            _this.$tooltip.fadeIn(200);
        }, function () {
            _this.$tooltip.fadeOut(200);
        });
    }

    // add an event listener on click, if the callback function is defined
    if (clickEvent) {
        this.$el.on("click", clickEvent);
    }
};

/** @module FloatingMenu */
/**
 * Class to represent the floating menu in the right bottom corner of the page.
 * It instantiates all the buttons and their callbacks.
 */


var FloatingMenu = function () {
    /**
     * @param {Canvas} parentSVG reference to the Canvas element this menu is associated with
     */
    function FloatingMenu(parentSVG) {
        _classCallCheck(this, FloatingMenu);

        /**
         * the jQuery element containing all buttons
         * @type {jQuery.element}
         */
        this.$el = $('<div>');

        var id = 'floatingMenu';

        this.$el.attr("id", id);

        // const $loader = $("<div>").addClass("loader").addClass("hidden");


        /* EXPORT */
        this.append(new FloatingButton("export", "Get code for this network", function () {
            // create the popup container holding all popup content (that will be passed to lity)
            var $popup = $("<div>").addClass("importExport").addClass("export");

            // generate the block with code to be displayed and append it to the popup element
            var $textblock = $("<textarea>").text((0, _helperFunctions.getJSONString)(parentSVG.exportData, true));

            $popup.append($textblock);

            // generate the links
            $popup.append($("<a>").attr({
                "href": (0, _helperFunctions.getJSONString)(parentSVG.exportData, true, true),
                "class": "download",
                "download": "network.json"
            }).append($("<img>").attr('src', "img/gui/export.svg")).append(" expanded JSON"));
            $popup.append($("<a>").attr({
                "href": (0, _helperFunctions.getJSONString)(parentSVG.exportData, false, true),
                "class": "download",
                "download": "network.min.json"
            }).append($("<img>").attr('src', "img/gui/export.svg")).append(" compact JSON"));

            lity($popup);

            // highlight the text in the textblock
            $textblock.select();
        }, parentSVG));

        /* Tutorial */
        this.append(new FloatingButton("tutorial", "Start the tutorial", function () {
            parentSVG.startTutorial();
        }, parentSVG));

        parentSVG.$svg.after(this.$el);

        /* HELP */

        var help = new FloatingButton("help", "Display a help page", false, parentSVG);
        help.$el.attr({
            'href': './docs/user.html',
            'data-lity': ''
        });
        this.append(help);

        parentSVG.$svg.after(this.$el);
    }

    /**
     * append a FloatingButton to this menu
     * @param  {FloatingButton} menuItem append an instance of  {@link FloatingButton} to this menu
     */


    _createClass(FloatingMenu, [{
        key: "append",
        value: function append(menuItem) {
            this.$el.append(menuItem.$el);
        }
    }]);

    return FloatingMenu;
}();

exports.default = FloatingMenu;

},{"./helperFunctions":15}],15:[function(require,module,exports){
"use strict";

/**
 * @module HelperFunctions
 */

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
function getJSONString(data) {
    var pretty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var dataUri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (dataUri) {
        return 'data:application/json;charset=utf-8,' + encodeURIComponent(getJSONString(data, pretty));
    } else {
        switch (pretty) {
            case true:
                return (0, _jsonStringifyPrettyCompact2.default)(data, { maxLength: 50 });
            case false:
                return JSON.stringify(data);
        }
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

},{"json-stringify-pretty-compact":1}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module Id */

/**
 * the current instance of Id
 * @type {Id}
 */
var existingIdInstance = void 0;

/**
 * singleton to generate unique id's
 *
 * usage: `let id = new Id().unique`
 */

var Id = function () {
  function Id() {
    _classCallCheck(this, Id);

    if (!existingIdInstance) {
      existingIdInstance = this;
    }

    /**
     * prefix for the id, that is common in all the Ids
     * @type {String}
     */
    this.prefix = "id";

    /**
     * numeric part of the next id (the next id without the prefix)
     * @type {number}
     */
    this.nextId = 0;

    return existingIdInstance;
  }

  /**
   * get unique ID
   * @return {string} new unique ID
   */


  _createClass(Id, [{
    key: "unique",
    get: function get() {
      var retVal = this.prefix + this.nextId;

      // find next unused idXXXX to prevent id collision that might be caused by some other component
      // (it really should not happen, but this is a simple way to ensure it)
      while ($("#" + retVal).length) {
        this.nextId++;
        retVal = this.generate();
      }
      // return this id
      this.nextId++;

      return retVal;
    }
  }]);

  return Id;
}();

exports.default = Id;

},{}],17:[function(require,module,exports){
"use strict";

/** @module Logic */
/**
 * definitions of logic states and basic logic functions used in the simulation
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logic = function () {
    function Logic() {
        _classCallCheck(this, Logic);
    }

    _createClass(Logic, null, [{
        key: "and",


        /**
         * Logic AND
         * @param  {Logic.state} a first input state
         * @param  {Logic.state} b second input state
         * @return {Logic.state}   output state
         */
        value: function and(a, b) {
            return Logic.runSymmetricRules(a, b, [[Logic.state.on, Logic.state.on, Logic.state.on], [Logic.state.on, Logic.state.off, Logic.state.off], [Logic.state.on, Logic.state.unknown, Logic.state.unknown], [Logic.state.on, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.off, Logic.state.off, Logic.state.off], [Logic.state.off, Logic.state.unknown, Logic.state.off], [Logic.state.off, Logic.state.oscillating, Logic.state.off], [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown], [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown], [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]]);
        }
        /**
         * Logic NAND
         * @param  {Logic.state} a first input state
         * @param  {Logic.state} b second input state
         * @return {Logic.state}   output state
         */

    }, {
        key: "nand",
        value: function nand(a, b) {
            return Logic.not(Logic.and(a, b));
        }

        /**
         * Logic NOR
         * @param  {Logic.state} a first input state
         * @param  {Logic.state} b second input state
         * @return {Logic.state}   output state
         */

    }, {
        key: "nor",
        value: function nor(a, b) {
            return Logic.not(Logic.or(a, b));
        }

        /**
         * Logic NOT
         * @param  {Logic.state} a first input state
         * @return {Logic.state}   output state
         */

    }, {
        key: "not",
        value: function not(a) {
            if (a === Logic.state.on) {
                return Logic.state.off;
            } else if (a === Logic.state.off) {
                return Logic.state.on;
            } else {
                return a;
            }
        }

        /**
         * Logic OR
         * @param  {Logic.state} a first input state
         * @param  {Logic.state} b second input state
         * @return {Logic.state}   output state
         */

    }, {
        key: "or",
        value: function or(a, b) {
            return Logic.runSymmetricRules(a, b, [[Logic.state.on, Logic.state.on, Logic.state.on], [Logic.state.on, Logic.state.off, Logic.state.on], [Logic.state.on, Logic.state.unknown, Logic.state.on], [Logic.state.on, Logic.state.oscillating, Logic.state.on], [Logic.state.off, Logic.state.off, Logic.state.off], [Logic.state.off, Logic.state.unknown, Logic.state.unknown], [Logic.state.off, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown], [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown], [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]]);
        }

        /**
         * Logic XNOR
         * @param  {Logic.state} a first input state
         * @param  {Logic.state} b second input state
         * @return {Logic.state}   output state
         */

    }, {
        key: "xnor",
        value: function xnor(a, b) {
            return Logic.not(Logic.xor(a, b));
        }

        /**
         * Logic XOR
         * @param  {Logic.state} a first input state
         * @param  {Logic.state} b second input state
         * @return {Logic.state}   output state
         */

    }, {
        key: "xor",
        value: function xor(a, b) {
            return Logic.runSymmetricRules(a, b, [[Logic.state.on, Logic.state.on, Logic.state.off], [Logic.state.on, Logic.state.off, Logic.state.on], [Logic.state.on, Logic.state.unknown, Logic.state.unknown], [Logic.state.on, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.off, Logic.state.off, Logic.state.off], [Logic.state.off, Logic.state.unknown, Logic.state.unknown], [Logic.state.off, Logic.state.oscillating, Logic.state.oscillating], [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown], [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown], [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]]);
        }

        /**
         * Finds the correct rule in the array of rules and returns the corresponding return value.
         * This function expects rules to be symmetric (so `a RULE b` should returns the same value as `b RULE a`),
         * which allows to cut down on the `rules` array quite a bit
         * @param  {Logic.state} a     first input state
         * @param  {Logic.state} b     second input state
         * @param  {Array} rules       Array of arrays. Each inner array represents a rule in the format [input1, input2, output].
         *                             The function finds an array, where `a === input1` and `b === input1` (or `a === input2` and `b === input1`)
         *                             and returns `output` from this array.
         * @return {Logic.state}       output state
         */

    }, {
        key: "runSymmetricRules",
        value: function runSymmetricRules(a, b, rules) {
            // iterate through all the rules
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var rule = _step.value;

                    if (rule[0] === a && rule[1] === b || rule[0] === b && rule[1] === a) {
                        return rule[2];
                    }
                }

                // if no rule matches, the output state is unknown
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

            return Logic.state.unknown;
        }
    }, {
        key: "state",

        /**
         * Enum for logic states.
         *
         * States:
         * - `unknown`
         * - `on`
         * - `off`
         * - `oscillating`
         * @type {Number}
         */
        get: function get() {
            return {
                unknown: 0,
                on: 1,
                off: 2,
                oscillating: 3
            };
        }

        /**
         * list of all states that can be used in the simulation
         *
         * This getter iterates over Logic.state and returns an array containing all values of Logic.state's members
         * @type {Array}
         */

    }, {
        key: "stateList",
        get: function get() {
            var states = [];

            // iterate over all defined states and add their values to the states array
            Object.keys(Logic.state).forEach(function (key) {
                states.push(Logic.state[key]);
            });

            return states;
        }
    }]);

    return Logic;
}();

exports.default = Logic;

},{}],18:[function(require,module,exports){
"use strict";

var _canvas = require("./canvas");

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * When the document is ready, initialize the application
 */
$(function () {
  new _canvas2.default("#canvas", 10);
});

},{"./canvas":10}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLibrary = getLibrary;
exports.getNetworkFromLibrary = getNetworkFromLibrary;
/**
 * @module Library
 */

var libraryDir = './library/';

/**
 * get list of networks from the library
 * @return {Promise} promise, the resolution is an object containing a list of libraries
 */
function getLibrary() {
    return new Promise(function (resolve, reject) {
        var libraryFile = libraryDir + 'networkList.json';

        var request = new XMLHttpRequest();

        request.addEventListener("load", function () {
            if (this.response) {
                resolve(this.response.networks);
            }
        });

        request.addEventListener(["error", "abort"], function () {
            reject("Failed loading libraries.");
        });

        request.open('GET', libraryFile, true);
        request.responseType = 'json';
        request.send();
    });
}

/**
 * get a network from the library, specified by filename
 * @param  {string} networkName library file name without the extension
 * @return {Promise} promise, the resolution is an object containing the library import data
 */
function getNetworkFromLibrary(networkName) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.addEventListener("load", function () {
            if (this.response) {
                resolve(this.response);
            }
        });

        request.addEventListener(["error", "abort"], function () {
            reject('Failed loading library ' + networkName + '.');
        });

        request.open('GET', libraryDir + networkName + '.json', true);
        request.responseType = 'json';
        request.send();
    });
}

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logic = require('./logic');

var _logic2 = _interopRequireDefault(_logic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module Simulation
 */

var stateChange = function stateChange(connectorId, state, whoCausedIt) {
    _classCallCheck(this, stateChange);

    this.connectorId = connectorId;
    this.state = state;
    this.whoCausedIt = whoCausedIt;
};

/**
 * This class runs the network simulation.
 *
 * _note: all connectors that are used in this class are **output connectors**_
 */


var Simulation = function () {
    /**
     * @param {Canvas} parentSVG instance of [Canvas](./module-Canvas.html)
     */
    function Simulation(parentSVG) {
        _classCallCheck(this, Simulation);

        /**
         * instance of Canvas this Simulation belongs to
         * @type {Canvas}
         */
        this.parentSVG = parentSVG;

        /**
         * maps each affected output connector to it's directly preceeding output connectors
         * @type {Map}
         */
        this.predecessors = new Map();

        /**
         * maps waveId to an array of affected outputConnectors
         * @type {Map}
         */
        this.waves = new Map();
        this.wave = 0;

        /**
         * maps cycled connector id to set of states this connector was in
         * @type {Map}
         */
        this.cycledConnectors = new Map();

        /**
         * set of cycled connectors that have been already resolved
         * @type {Set}
         */
        this.resolvedCycledConnectors = new Set();
    }

    /**
     * run the simulation
     */


    _createClass(Simulation, [{
        key: 'run',
        value: function run() {
            this.wave++;
            while (this.waves.has(this.wave)) {
                this.step();
                this.waves.delete(this.wave); // clean old waves on the go
                this.wave++;
            }
        }

        /**
         * one step/wave of the simulation
         *
         * determines states of the connectors in the current wave, detects cycles
         */

    }, {
        key: 'step',
        value: function step() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.waves.get(this.wave)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref = _step.value;
                    var connectorId = _ref.connectorId;
                    var state = _ref.state;
                    var whoCausedIt = _ref.whoCausedIt;

                    // skip resolved cycles
                    if (this.resolvedCycledConnectors.has(connectorId)) {
                        continue;
                    }

                    // skip connector that are cycles
                    if (this.cycledConnectors.has(connectorId)) {
                        // get the set of states that this connector appeared from the moment the signal first cycled
                        var states = this.cycledConnectors.get(connectorId);

                        // if the connector already had this state in this cycle, resolve the cycle
                        if (states.has(state)) {

                            // if there are more states in the set, the connector is oscillating
                            // (else it keeps its state and we just break the cycle)
                            if (states.size > 1) {
                                state = _logic2.default.state.oscillating;
                            }

                            // mark this connector as resolved
                            this.resolvedCycledConnectors.add(connectorId);

                            // this is a new, unseen state, add it to the set and continue simulating the cycle
                        } else {
                            states.add(state);
                        }

                        // map the modified set of states to the connector
                        this.cycledConnectors.set(connectorId, states);
                    }

                    this.whoCausedIt = connectorId;
                    /*  process all outputConnectors by setting their state
                        this will trigger a following event chain:
                            outputConnector changes
                            -> all connected wires change
                            -> all inputConnectors connected to these wires change
                            -> all elements that contain these inputConnectors change
                            -> these elements compute the new state of their output connectors and call notifyChange()
                    */

                    if (whoCausedIt) {
                        this.addPredecessor(connectorId, whoCausedIt);
                    }

                    if (!this.cycledConnectors.has(connectorId) && this.getAllPredecessors(connectorId).has(connectorId)) {
                        this.cycledConnectors.set(connectorId, new Set([state]));
                    }

                    // reflect the changes in SVG
                    var connector = this.parentSVG.getConnectorById(connectorId);
                    if (connector) {
                        connector.setState(state);
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

            this.whoCausedIt = undefined;
        }

        /**
         * mark a predecessorConnectorId as a predecessor of connectorId
         * @param {string} connectorId ID of a connector
         * @param {string} predecessorConnectorId predecessor of `connectorId`
         */

    }, {
        key: 'addPredecessor',
        value: function addPredecessor(connectorId, predecessorConnectorId) {
            if (!this.predecessors.has(connectorId)) {
                this.predecessors.set(connectorId, new Set());
            }

            this.predecessors.get(connectorId).add(predecessorConnectorId);
        }

        /**
         * get set of all output connectors that are before this output connector
         * @param  {string} connectorId ID of a connector
         * @return {Set}                set of connector ids that are before this output connector
         */

    }, {
        key: 'getAllPredecessors',
        value: function getAllPredecessors(connectorId) {
            if (!this.predecessors.has(connectorId)) {
                this.predecessors.set(connectorId, new Set());
            }

            var all = new Set();

            this.predecessors.get(connectorId).forEach(all.add, all);

            var prevSize = 0;
            var size = all.size;
            while (prevSize < size) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = all[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var connector = _step2.value;

                        if (this.predecessors.has(connector)) {
                            this.predecessors.get(connector).forEach(all.add, all);
                        }
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

                prevSize = size;
                size = all.size;
            }

            return all;
        }

        /**
         * Notify a change in the network. This function adds the changed connector to the next wave
         * @param  {string} connectorId ID of the changed connector
         * @param  {Logic.state} state  new [Logic.state](./module-Logic.html#.state) of the connector
         */

    }, {
        key: 'notifyChange',
        value: function notifyChange(connectorId, state) {
            var waveId = this.wave + 1;

            if (!this.waves.has(waveId)) {
                this.waves.set(waveId, []);
            }

            this.waves.get(waveId).push(new stateChange(connectorId, state, this.whoCausedIt));
        }
    }]);

    return Simulation;
}();

exports.default = Simulation;

},{"./logic":17}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pattern = exports.MultiLineText = exports.Text = exports.PolyLine = exports.PolylinePoints = exports.PolylinePoint = exports.Group = exports.SvgImage = exports.Rectangle = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _id = require("./id");

var _id2 = _interopRequireDefault(_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Parent class for all svgObjects
 */
var Tag = function () {
    /**
     * @param {string} tagName SVG tag identifier (`rect`, `image`, `polyline`)
     */
    function Tag(tagName) {
        _classCallCheck(this, Tag);

        /**
         * SVG tag identifier (`rect`, `image`, `polyline`)
         * @type {string}
         */
        this.tagName = tagName;

        /**
         * jQuery element for this tag
         * @type {jQuery.element}
         */
        this.$el = $("<" + this.tagName + ">");

        /**
         * unique ID of this SVG object
         * @type {string}
         */
        this.id = new _id2.default().unique;
    }

    /**
     * add a class to this element
     * @param {string} name class name to be added
     */


    _createClass(Tag, [{
        key: "addClass",
        value: function addClass(name) {
            this.$el.addClass(name);
        }

        /**
         * remove class names from this element
         * @param  {string} classes class names to be removed
         */

    }, {
        key: "removeClasses",
        value: function removeClasses() {
            for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
                classes[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this.$el.removeClass(item);
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
        }

        /**
         * set attributes of this element
         * @param {Object} assoc javascript object that will be mapped into attributes (`{key: value}` -> `key="value"`)
         */

    }, {
        key: "addAttr",
        value: function addAttr(assoc) {
            this.checkIfElementExistsInDOM();

            // add attributes to the element
            this.$el.attr(assoc);
        }

        /**
         * get attribute value by name
         * @param  {string} name name of the attribute
         * @return {string}      value of the attribute
         */

    }, {
        key: "getAttr",
        value: function getAttr(name) {
            this.checkIfElementExistsInDOM();

            return this.$el.attr(name);
        }

        /**
         * remove attribute by value
         * @param  {string} name name of the attribute to be removed
         */

    }, {
        key: "removeAttr",
        value: function removeAttr(name) {
            this.checkIfElementExistsInDOM();

            this.$el.removeAttr(name);
        }

        /**
         * set id of this SVG object
         * @param  {string} id new id for this object
         */

    }, {
        key: "get",


        /**
         * get jQuery element for this SVG object
         * @return {jQuery.element}
         */
        value: function get() {
            this.checkIfElementExistsInDOM();
            return this.$el;
        }

        /**
         * check if the element exists in dom, if so, refetch it from DOM using jQuery
         */

    }, {
        key: "checkIfElementExistsInDOM",
        value: function checkIfElementExistsInDOM() {
            var $jqElement = $("#" + this.$el.attr('id'));
            if ($jqElement.length) {
                this.$el = $jqElement;
            }
        }
    }, {
        key: "id",
        set: function set(id) {
            this.addAttr({ "id": id });
        }

        /**
         * get id of this SVG object
         * @return {string}
         */
        ,
        get: function get() {
            return this.getAttr("id");
        }
    }]);

    return Tag;
}();

/**
 * represents visible element in SVG that has position and dimensions (for example `rectangle` is a SvgElement, but `pattern` is not, even though both are tags)
 * @extends Tag
 */


var SvgElement = function (_Tag) {
    _inherits(SvgElement, _Tag);

    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width in SVG pixels
     * @param {number} h       height in SVG pixels
     * @param {string} tagName tag name of the element
     */
    function SvgElement(x, y, w, h, tagName) {
        _classCallCheck(this, SvgElement);

        var _this = _possibleConstructorReturn(this, (SvgElement.__proto__ || Object.getPrototypeOf(SvgElement)).call(this, tagName));

        _this.addAttr({
            x: x,
            y: y,
            width: w,
            height: h
        });
        return _this;
    }

    return SvgElement;
}(Tag);

/**
 * a rectangle in SVG
 * @extends SvgElement
 */


var Rectangle = exports.Rectangle = function (_SvgElement) {
    _inherits(Rectangle, _SvgElement);

    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width in SVG pixels
     * @param {number} h       height in SVG pixels
     * @param {string} fill    filling color of the rectangle
     * @param {string} stroke  stroke color of the rectangle
     */
    function Rectangle(x, y, w, h, fill, stroke) {
        _classCallCheck(this, Rectangle);

        var _this2 = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, x, y, w, h, "rect"));

        _this2.addAttr({
            fill: fill,
            stroke: stroke,
            'stroke-width': 0.5,
            'pointer-events': 'all' // to trigger hover even with transparent background
        });
        return _this2;
    }

    return Rectangle;
}(SvgElement);

/**
 * an image in SVG
 * @extends SvgElement
 */


var SvgImage = exports.SvgImage = function (_SvgElement2) {
    _inherits(SvgImage, _SvgElement2);

    function SvgImage(x, y, w, h, url) {
        _classCallCheck(this, SvgImage);

        var _this3 = _possibleConstructorReturn(this, (SvgImage.__proto__ || Object.getPrototypeOf(SvgImage)).call(this, x, y, w, h, "image"));

        _this3.addAttr({
            "xlink:href": url
        });
        return _this3;
    }

    /**
     * change url of the image
     * @param {string} url the new url of the image
     */


    _createClass(SvgImage, [{
        key: "changeUrl",
        value: function changeUrl(url) {
            this.addAttr({
                "xlink:href": url
            });
        }
    }]);

    return SvgImage;
}(SvgElement);

/**
 * SVG group, used for grouping elements, for example a gate is represented by many elements (rectangle, image, inivisible hitbox rectangle...),
 * but all of the elements need to be transformed together. Using groups the transform property can be set on the group which contains all the elements.
 * @extends Tag
 */


var Group = exports.Group = function (_Tag2) {
    _inherits(Group, _Tag2);

    function Group() {
        _classCallCheck(this, Group);

        var _this4 = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, "g"));

        _this4.children = [];
        return _this4;
    }

    /**
     * add an element to the group
     * @param {SvgElement} el an instance of {@link SvgElement}
     */


    _createClass(Group, [{
        key: "addChild",
        value: function addChild(el) {
            this.children.push(el);

            this.$el.append(el.$el);
            return el; // pro jednodussi "let rect = g.addChild(new Rectangle(..."
        }
    }]);

    return Group;
}(Tag);

/**
 * one point of {@link PolylinePoints}, used in the {@link PolyLine} object
 */


var PolylinePoint = exports.PolylinePoint = function () {
    /**
     * @param {number} x horizontal coordinate of the polyline point
     * @param {number} y vertical coordinate of the polyline point
     */
    function PolylinePoint(x, y) {
        _classCallCheck(this, PolylinePoint);

        this.x = 0;
        this.y = 0;
        if (x !== undefined && y !== undefined) {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * change the coordinates of this point
     * @param {number} x horizontal coordinate of the polyline point
     * @param {number} y vertical coordinate of the polyline point
     */


    _createClass(PolylinePoint, [{
        key: "set",
        value: function set(x, y) {
            this.x = x;
            this.y = y;
        }

        /**
         * create polyline from a comma separated string (e.g. from a string formatted like this: "x,y", for example "15,8")
         * @param  {string} string string in the format "x,y" representing a point in the SVG polyline
         * @return {PolylinePoint} newly created instance of {@link PolylinePoint}
         */

    }, {
        key: "string",


        /**
         * return a string representation of this polyline point
         * @return {string} string in the format "x,y"
         */
        get: function get() {
            return this.x + "," + this.y;
        }

        /**
         * compare polyline points, return `true` if they are equal, else return `false`
         * @param  {PolylinePoint} a
         * @param  {PolylinePoint} b
         * @return {boolean}
         */

    }], [{
        key: "parseFromString",
        value: function parseFromString(string) {
            var arr = string.split(",");
            return new PolylinePoint(arr[0], arr[1]);
        }
    }, {
        key: "equals",
        value: function equals(a, b) {
            return a.x === b.x && a.y === b.y;
        }
    }]);

    return PolylinePoint;
}();

/**
 * array-like structure used in {@link PolylinePoints}
 */


var SmartArray = function () {
    /**
     * @param {Array} [arr] if set, initialized SmartArray will contain these values
     */
    function SmartArray(arr) {
        _classCallCheck(this, SmartArray);

        if (arr !== undefined) {
            this.arr = arr;
        } else {
            this.arr = [];
        }
    }

    /**
     * get a deep copy of this array
     * @return {SmartArray}
     */


    _createClass(SmartArray, [{
        key: "copy",
        value: function copy() {
            return SmartArray($.extend(true, [], this.arr));
        }

        /**
         * append an item to the array
         * @param item new item that will be appended to the array
         */

    }, {
        key: "append",
        value: function append(item) {
            return this.addWithIndex(item, this.arr.length);
        }

        /**
         * prepend an item to the array
         * @param item new item that will be prepended to the array
         */

    }, {
        key: "prepend",
        value: function prepend(item) {
            return this.addWithIndex(item, 0);
        }

        /**
         * add a new item at the specified index, move all following items
         * @param item new item that will be added at the specified index
         * @param {number} index index of this item
         */

    }, {
        key: "addWithIndex",
        value: function addWithIndex(item, index) {
            for (var i = this.arr.length; i > index; --i) {
                this.arr[i] = this.arr[i - 1];
            }
            this.arr[index] = item;
            return this; // to enable chaining of append / preppend / addWithIndex commands
        }

        /**
         * get length of the array
         * @return {number}
         */

    }, {
        key: "getItem",


        /**
         * get item by index
         * @param  {number} index index of the item
         * @return contents of the array on the specified index
         */
        value: function getItem(index) {
            return this.arr[index];
        }

        /**
         * @return last element of the array
         */

    }, {
        key: "remove",


        /**
         * remove an item from the array by index
         * @param  {number} index index of the item that will be removed
         */
        value: function remove(index) {
            var length = this.length;

            for (var i = index; i < length; ++i) {
                this.arr[i] = this.arr[i + 1];
            }
            this.arr.pop();
        }
    }, {
        key: "length",
        get: function get() {
            return this.arr.length;
        }
    }, {
        key: "last",
        get: function get() {
            if (this.length !== 0) {
                return this.arr[this.length - 1];
            } else {
                return false;
            }
        }

        /**
         * @return first element of the array
         */

    }, {
        key: "first",
        get: function get() {
            if (this.length !== 0) {
                return this.arr[0];
            } else {
                return false;
            }
        }
    }]);

    return SmartArray;
}();

/**
 * points of the {@link PolyLine}
 * @extends SmartArray
 */


var PolylinePoints = exports.PolylinePoints = function (_SmartArray) {
    _inherits(PolylinePoints, _SmartArray);

    /**
     * @param {Array} [arr] array containing instances of {@link PolylinePoint}
     */
    function PolylinePoints(arr) {
        _classCallCheck(this, PolylinePoints);

        return _possibleConstructorReturn(this, (PolylinePoints.__proto__ || Object.getPrototypeOf(PolylinePoints)).call(this, arr));
    }

    /**
     * get a deep copy of this object
     * @return {PolylinePoints}
     */


    _createClass(PolylinePoints, [{
        key: "copy",
        value: function copy() {
            return new PolylinePoints($.extend(true, [], this.arr));
        }

        /**
         * append a point
         * @param  {PolylinePoint} point a new point
         */

    }, {
        key: "append",
        value: function append(point) {
            // call inherited function to handle the appending
            _get(PolylinePoints.prototype.__proto__ || Object.getPrototypeOf(PolylinePoints.prototype), "append", this).call(this, point);

            // if the second to last point is unnecessary, remove it
            var length = this.length;
            if (length >= 3 && (this.getItem(length - 3).x === this.getItem(length - 2).x && this.getItem(length - 2).x === this.getItem(length - 1).x || this.getItem(length - 3).y === this.getItem(length - 2).y && this.getItem(length - 2).y === this.getItem(length - 1).y)) {
                this.remove(length - 2);
            }

            // return this element (to allow chaining)
            return this;
        }

        /**
         * parse polyline from string
         * @param  {string} string string in the polyline format (`x1,y1 x2,y2, x3,y3`)
         * @return {PolylinePoints} a new instance of {@link PolylinePoints} created by parsing the string
         */

    }, {
        key: "forEach",


        /**
         * wrapper for foreach on the polyline points
         * @param  {Function} func function that will be called on each element
         */
        value: function forEach(func) {
            for (var i = 0; i < this.arr.length; ++i) {
                func(this.arr[i]);
            }
        }
    }, {
        key: "string",


        /**
         * get a string representation of this polyline
         * @return {string} string in the polyline format (`x1,y1 x2,y2, x3,y3`)
         */
        get: function get() {
            var string = "";
            for (var i = 0; i < this.length; ++i) {
                if (i !== 0) {
                    string += " ";
                }
                string += this.arr[i].string;
            }
            return string;
        }
    }], [{
        key: "parseFromString",
        value: function parseFromString(string) {
            var pointStrings = string.split(" ");
            var points = new PolylinePoints();

            for (var i = 0; i < pointStrings.length; ++i) {
                points.append(PolylinePoint.parseFromString(pointStrings[i]));
            }

            return points;
        }
    }]);

    return PolylinePoints;
}(SmartArray);

/**
 * SVG polyline (a path defined by sequence of points on plane)
 * @extends Tag
 */


var PolyLine = exports.PolyLine = function (_Tag3) {
    _inherits(PolyLine, _Tag3);

    /**
     * @param {PolylinePoints} points points describing this polyline
     * @param {number} [strokeWidth] width of the stroke for this polyline in SVG pixels
     * @param {string} [color] CSS color of this polyline
     */
    function PolyLine(points, strokeWidth, color) {
        _classCallCheck(this, PolyLine);

        var _this6 = _possibleConstructorReturn(this, (PolyLine.__proto__ || Object.getPrototypeOf(PolyLine)).call(this, "polyline"));

        var attributes = {
            points: points.string,
            fill: "none",
            "stroke-width": strokeWidth
        };

        if (color !== undefined) {
            attributes.stroke = color;
        }

        _this6.addAttr(attributes);
        return _this6;
    }

    /**
     * update points of this polyline
     * @param {PolylinePoints} points new set of points describing this polyline
     */


    _createClass(PolyLine, [{
        key: "updatePoints",
        value: function updatePoints(points) {
            this.addAttr({
                points: points.string
            });
        }
    }]);

    return PolyLine;
}(Tag);

/**
 * Text element in SVG
 * @extends Tag
 */


var Text = exports.Text = function (_Tag4) {
    _inherits(Text, _Tag4);

    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width of the text box in SVG pixels
     * @param {number} h       height of the text box in SVG pixels
     * @param {number} text    text content of the text box
     * @param {string} size    CSS font size of the text
     * @param {String} [color="black"] color of the text
     *
     */
    function Text(x, y, w, h, text, size) {
        var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "black";

        _classCallCheck(this, Text);

        var _this7 = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, "text"));

        _this7.addAttr({
            x: x,
            y: y,
            width: w,
            height: h,
            fill: color
        });

        if (size) {
            _this7.addAttr({
                'font-size': size
            });
        }

        _this7.$el.append(text);
        return _this7;
    }

    return Text;
}(Tag);

/**
 * Multi line text element in SVG
 *
 * Multi line text is not natively supportend in SVG 1.1,
 * the workaround is to use the <foreignObject> element and display
 * a HTML paragraph inside of the SVG document.
 *
 * Because this technique is not supported by all of the browsers,
 * the foreignObject element is wrapped in <switch>, which
 * provides fallback for those cases.
 *
 * read more: [foreignObject on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject)
 *
 * @extends Tag
 */


var MultiLineText = exports.MultiLineText = function (_Tag5) {
    _inherits(MultiLineText, _Tag5);

    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width of the text box in SVG pixels
     * @param {number} h       height of the text box in SVG pixels
     * @param {number} text    text content of the text box
     * @param {string} size    CSS font size of the text
     * @param {String} [color="black"] color of the text
     *
     */
    function MultiLineText(x, y, w, h, text, size) {
        var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "black";

        _classCallCheck(this, MultiLineText);

        var _this8 = _possibleConstructorReturn(this, (MultiLineText.__proto__ || Object.getPrototypeOf(MultiLineText)).call(this, "switch"));

        var foreignObject = new Tag("foreignObject");
        var alternativeText = new Text(x, y, w, h, text, size, color);

        foreignObject.addAttr({
            x: x,
            y: y,
            width: w,
            height: h
        });

        foreignObject.$el.append($("<p class=\"multilinetext\" xmlns=\"http://www.w3.org/1999/xhtml\" style=\"font-size:" + size + "px\">").append(text));

        _this8.$el.append(foreignObject.$el).append(alternativeText.$el);
        return _this8;
    }

    return MultiLineText;
}(Tag);

/**
 * pattern object in SVG
 * @extends Tag
 */


var Pattern = exports.Pattern = function (_Tag6) {
    _inherits(Pattern, _Tag6);

    /**
     * @param {string} id     unique id of this pattern
     * @param {number} width  width of one pattern tile in SVG pixels
     * @param {number} height height of one pattern tile in SVG pixels
     */
    function Pattern(id, width, height) {
        _classCallCheck(this, Pattern);

        var _this9 = _possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).call(this, "pattern"));

        _this9.addAttr({
            id: id,
            x: 0,
            y: 0,
            width: width,
            height: height,
            patternUnits: "userSpaceOnUse",
            viewBox: "0 0 " + width + " " + height
        });
        return _this9;
    }

    /**
     * add a child to this pattern
     *
     * pattern behaves a little like {@link Group} - it contains child elements, which represent the content of one tile of the pattern
     * and the whole package of the child elements is repeated on each tile of the pattern
     * @param {SvgElement} el element that will be added to the pattern
     */


    _createClass(Pattern, [{
        key: "addChild",
        value: function addChild(el) {
            this.$el.append(el.$el);
            return el;
        }
    }]);

    return Pattern;
}(Tag);

},{"./id":16}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module Tutorial */
/**
 * Display and manage the tutorial
 */
var Tutorial = function () {
    /**
     * @param {Canvas} parentSVG instance of [Canvas](./module-Canvas.html) for this tutorial
     * @param {Function} [onTutorialClosed] callback function when user closes or finishes the tutorial
     */
    function Tutorial(parentSVG, onTutorialClosed) {
        var _this = this;

        _classCallCheck(this, Tutorial);

        /**
         * instance of [Canvas](./module-Canvas.html) for this tutorial
         * @type {Canvas}
         */
        this.parentSVG = parentSVG;

        /**
         * helper variable for the `step` property, stores current state of the tutorial (step `0` means that tutorial is closed)
         * @type {Number}
         */
        this.currentStep = 0;

        /**
         * jQuery element containing the tutorial popup
         * @type {jQuery.element}
         */
        this.$tutorialWindow;
        /**
         * jQuery element for the dynamic part of the tutorial popup
         * (text and buttons that are dependent on the current state of the tutorial)
         * @type {Array}
         */
        this.$tutorialContent;

        /**
         * array of functions that represent intividual steps in the tutorial
         * by default populated with step `0` that closes the tutorial
         * @type {Array}
         */
        this.steps = [function () {
            _this.closeWindow(onTutorialClosed);
        }];

        // set up the tutorial
        this.setUpTutorial();
    }

    /**
     * get the current step of the tutorial, this number corresponds to the index in the `this.steps` array
     * that contains the function for the last displayed step
     * @return {Number}
     */


    _createClass(Tutorial, [{
        key: "resetHooks",


        /**
         * reset all tutorial hooks
         */
        value: function resetHooks() {
            /**
             * _tutorial hook_, called when the context menu is opened
             */
            this.onContextMenuOpened = function () {};

            /**
             * _tutorial hook_, called when a new element is added
             */
            this.onElementAdded = function () {};

            /**
             * _tutorial hook_, called when a box is moved
             */
            this.onBoxMoved = function () {};

            /**
             * _tutorial hook_, called when a box is rotated
             */
            this.onBoxRotated = function () {};

            /**
             * _tutorial hook_, called when an output box value is set to `on`
             */
            this.onOutputBoxTrue = function () {};

            /**
             * _tutorial hook_, called when the canvas is moved
             */
            this.onCanvasMoved = function () {};

            /**
             * _tutorial hook_, called when the canvas is zoomed
             */
            this.onCanvasZoomed = function () {};

            /**
             * _tutorial hook_, called when a box is removed
             */
            this.onElementRemoved = function () {};

            /**
             * _tutorial hook_, called when user changes the state of an input box
             */
            this.onChangeInputBoxState = function () {};
        }

        /**
         * set up the tutorial: reset all tutorial hooks and define the order of tutorial steps
         */

    }, {
        key: "setUpTutorial",
        value: function setUpTutorial() {
            var _this2 = this;

            this.resetHooks();

            this.steps.push(function () {
                _this2.stepWelcome();
            }, function () {
                _this2.stepAddBoxes();
            }, function () {
                _this2.stepMoveCanvas();
            }, function () {
                _this2.stepZoomCanvas();
            }, function () {
                _this2.stepMoveBoxes();
            }, function () {
                _this2.stepWiring();
            }, function () {
                _this2.switchInputBox();
            }, function () {
                _this2.stepRemoveBox();
            }, function () {
                _this2.stepFinish();
            });
        }

        /**
         * _tutorial step_: display context menu
         */

    }, {
        key: "stepWelcome",
        value: function stepWelcome() {
            var _this3 = this;

            this.windowContent("Welcome to Hradla! To get started, click anywhere on the editing area with your right mouse button.");

            this.onContextMenuOpened = function () {
                _this3.next();

                // this function runs only once
                _this3.onContextMenuOpened = function () {};
            };
        }

        /**
         * _tutorial step_: add input box, output box and a NOT gate
         */

    }, {
        key: "stepAddBoxes",
        value: function stepAddBoxes() {
            var _this4 = this;

            this.windowContent("Great job! Now you know, how to open the editor menu.\n            Now try to add an <em>Input box</em>, <em>Output box</em> and a <em>NOT gate</em>\n            to the editing area.");

            var elementsAdded = {
                inputBox: false,
                outputBox: false,
                notGate: false
            };

            this.onElementAdded = function (name) {
                switch (name) {
                    case "input":
                        elementsAdded.inputBox = true;
                        break;
                    case "output":
                        elementsAdded.outputBox = true;
                        break;
                    case "not":
                        elementsAdded.notGate = true;
                        break;
                    default:
                        // no action on default
                        break;
                }

                if (elementsAdded.inputBox && elementsAdded.outputBox && elementsAdded.notGate) {
                    // remove the action
                    _this4.onElementAdded = function () {};

                    // proceed to the next step of the tutorial
                    _this4.next();
                }
            };
        }

        /**
         * _tutorial step_: move the canvas
         */

    }, {
        key: "stepMoveCanvas",
        value: function stepMoveCanvas() {
            var _this5 = this;

            this.windowContent("You can move the editing area (sometimes called canvas) by dragging\n            with the middle mouse button or by holding the <code>Ctrl</code> key\n            and dragging with the left mouse button. Check it out.");

            this.onCanvasMoved = function () {
                _this5.next();
                _this5.onCanvasMoved = function () {};
            };
        }

        /**
         * _tutorial step_: zoom the canvas
         */

    }, {
        key: "stepZoomCanvas",
        value: function stepZoomCanvas() {
            var _this6 = this;

            this.windowContent("You can also zoom in and out using <code>Ctrl</code> and the mouse wheel.");

            this.onCanvasZoomed = function () {
                _this6.next();
                _this6.onCanvasZoomed = function () {};
            };
        }

        /**
         * _tutorial step_: move the boxes
         */

    }, {
        key: "stepMoveBoxes",
        value: function stepMoveBoxes() {
            var _this7 = this;

            this.windowContent("You can move the elements on the editing canvas by dragging them\n            using the left mouse button. You can also rotate them using middle click. Try it out.");

            var boxMoved = false;
            var boxRotated = false;

            var moveRotateCallback = function moveRotateCallback() {
                if (boxMoved && boxRotated) {
                    _this7.next();
                }
            };

            this.onBoxMoved = function () {
                boxMoved = true;

                _this7.onBoxMoved = function () {};

                moveRotateCallback();
            };

            this.onBoxRotated = function () {
                boxRotated = true;

                _this7.onBoxRotated = function () {};

                moveRotateCallback();
            };
        }

        /**
         * _tutorial step_: create an invertor
         */

    }, {
        key: "stepWiring",
        value: function stepWiring() {
            var _this8 = this;

            this.windowContent("Essential part of logic networks is the wiring. Create a very simple\n            inverter by connecting the <em>Input box</em> to the input of the <em>NOT gate</em>\n            and the output of the <em>NOT gate</em> to the input of the <em>Output box</em>.", "To connect two elemnts, simply click on a connector of the first element,\n            than click on a conector of the second element.");

            this.onOutputBoxTrue = function () {
                _this8.next();

                _this8.onOutputBoxTrue = function () {};
            };
        }

        /**
         * _tutorial step_: change the state of an input box
         */

    }, {
        key: "switchInputBox",
        value: function switchInputBox() {
            var _this9 = this;

            this.windowContent("\n            The input boxes can be in two states: <em>ON</em> and <em>OFF</em>, signalled\n            by the green and red colors respectively. You can left click on an Input box to\n            switch its state. Try it out!\n        ");

            this.onChangeInputBoxState = function () {
                _this9.next();

                _this9.onChangeInputBoxState = function () {};
            };
        }

        /**
         * _tutorial step_: remove a box
         */

    }, {
        key: "stepRemoveBox",
        value: function stepRemoveBox() {
            var _this10 = this;

            this.windowContent("When you right click on an element, you can find a new item in the menu,\n            that allows you to remove the element. This works for wires as well as for gates and other types of boxes.\n            Try to remove an element!");

            this.onElementRemoved = function () {
                _this10.next();

                _this10.onElementRemoved = function () {};
            };
        }

        /**
         * _tutorial step_: ask the user if they want to clean the canvas before closing the tutorial
         */

    }, {
        key: "stepFinish",
        value: function stepFinish() {
            var _this11 = this;

            this.windowContent("You're all set, enjoy your stay!", "Do you wish to start with empty canvas?");
            this.windowChoice({
                text: 'yes, clean the canvas',
                func: function func() {
                    _this11.parentSVG.cleanCanvas();
                    _this11.stop();
                }
            }, {
                text: 'no, keep the canvas as it is',
                func: function func() {
                    _this11.stop();
                }
            });
        }

        /**
         * display the tutorial window
         */

    }, {
        key: "displayWindow",
        value: function displayWindow() {
            this.parentSVG.$svg.after(this.$tutorialWindow);
        }

        /**
         * close the tutorial window
         * @param  {Function} [onTutorialClosed] callback function that is called when the tutorial is closed
         */

    }, {
        key: "closeWindow",
        value: function closeWindow(onTutorialClosed) {
            this.$tutorialWindow.remove();

            if (onTutorialClosed !== undefined) {
                onTutorialClosed();
            }
        }

        /**
         * set the tutorial window text content
         * @param  {...string} text each string is a separate paragraph
         */

    }, {
        key: "windowContent",
        value: function windowContent() {
            var _this12 = this;

            if (!this.$tutorialWindow) {
                this.$tutorialWindow = $("<div>").attr("id", "tutorial");
                this.$tutorialWindow.append($("<div>").addClass("topButtons").append($("<a>").attr("href", "#").addClass("button close").click(function () {
                    _this12.stop();
                })));

                this.$tutorialContent = $("<div>").addClass("content");
                this.$tutorialWindow.append(this.$tutorialContent);
            }

            this.$tutorialContent.html("");

            for (var _len = arguments.length, text = Array(_len), _key = 0; _key < _len; _key++) {
                text[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = text[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var paragraph = _step.value;

                    this.$tutorialContent.append($("<p>").html(paragraph));
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
        }

        /**
         * add buttons with choices to the tutorial window
         * @param  {...object} choices each choice is an object in with a `string` property _text_ and a `function` property _func_
         */

    }, {
        key: "windowChoice",
        value: function windowChoice() {
            var $choices = $("<ol>").addClass("choices");

            for (var _len2 = arguments.length, choices = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                choices[_key2] = arguments[_key2];
            }

            var _loop = function _loop(choice) {
                $choices.append($("<li>").append($("<a>").attr("href", "#").click(function () {
                    choice.func();
                }).html(choice.text)));
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = choices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var choice = _step2.value;

                    _loop(choice);
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

            this.$tutorialContent.append($choices);
        }

        /**
         * start the tutorial
         */

    }, {
        key: "start",
        value: function start() {
            this.step = 1;
        }

        /**
         * go to the next step of the tutorial
         */

    }, {
        key: "next",
        value: function next() {
            this.step++;
        }

        /**
         * stop the tutorial
         */

    }, {
        key: "stop",
        value: function stop() {
            this.step = 0;
        }
    }, {
        key: "step",
        get: function get() {
            return this.currentStep;
        }

        /**
         * change the current step of the tutorial, `0` means "stop the tutorial"
         * @param  {Number} value the step of the tutorial to be displayed
         */
        ,
        set: function set(value) {
            this.currentStep = value;

            if (this.step < this.steps.length) {
                this.steps[this.step]();

                if (this.step === 1) this.displayWindow();
            } else {
                this.step = 0;
            }
        }
    }]);

    return Tutorial;
}();

exports.default = Tutorial;

},{}]},{},[18])

//# sourceMappingURL=main.js.map
