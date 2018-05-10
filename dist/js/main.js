(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"core-js/fn/regexp/escape":3,"core-js/shim":326,"regenerator-runtime/runtime":2}],2:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;

},{"../../modules/_core":24,"../../modules/core.regexp.escape":129}],4:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],5:[function(require,module,exports){
var cof = require('./_cof');
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

},{"./_cof":19}],6:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":43,"./_wks":127}],7:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],8:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":52}],9:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-absolute-index":112,"./_to-length":116,"./_to-object":117}],10:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-absolute-index":112,"./_to-length":116,"./_to-object":117}],11:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":40}],12:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":112,"./_to-iobject":115,"./_to-length":116}],13:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_array-species-create":16,"./_ctx":26,"./_iobject":48,"./_to-length":116,"./_to-object":117}],14:[function(require,module,exports){
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var toLength = require('./_to-length');

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

},{"./_a-function":4,"./_iobject":48,"./_to-length":116,"./_to-object":117}],15:[function(require,module,exports){
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-array":50,"./_is-object":52,"./_wks":127}],16:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":15}],17:[function(require,module,exports){
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":4,"./_invoke":47,"./_is-object":52}],18:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":19,"./_wks":127}],19:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],20:[function(require,module,exports){
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_an-instance":7,"./_ctx":26,"./_descriptors":30,"./_for-of":40,"./_iter-define":56,"./_iter-step":58,"./_meta":66,"./_object-create":71,"./_object-dp":72,"./_redefine-all":91,"./_set-species":98,"./_validate-collection":124}],21:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_array-from-iterable":11,"./_classof":18}],22:[function(require,module,exports){
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_an-instance":7,"./_an-object":8,"./_array-methods":13,"./_for-of":40,"./_has":42,"./_is-object":52,"./_meta":66,"./_redefine-all":91,"./_validate-collection":124}],23:[function(require,module,exports){
'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_an-instance":7,"./_export":34,"./_fails":36,"./_for-of":40,"./_global":41,"./_inherit-if-required":46,"./_is-object":52,"./_iter-detect":57,"./_meta":66,"./_redefine":92,"./_redefine-all":91,"./_set-to-string-tag":99}],24:[function(require,module,exports){
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],25:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":72,"./_property-desc":90}],26:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":4}],27:[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = require('./_fails');
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

},{"./_fails":36}],28:[function(require,module,exports){
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":8,"./_to-primitive":118}],29:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],30:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":36}],31:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":41,"./_is-object":52}],32:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],33:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":78,"./_object-keys":81,"./_object-pie":82}],34:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":24,"./_ctx":26,"./_global":41,"./_hide":43,"./_redefine":92}],35:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":127}],36:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],37:[function(require,module,exports){
'use strict';
var hide = require('./_hide');
var redefine = require('./_redefine');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./_defined":29,"./_fails":36,"./_hide":43,"./_redefine":92,"./_wks":127}],38:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":8}],39:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_ctx":26,"./_is-array":50,"./_is-object":52,"./_to-length":116,"./_wks":127}],40:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":8,"./_ctx":26,"./_is-array-iter":49,"./_iter-call":54,"./_to-length":116,"./core.get-iterator-method":128}],41:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],42:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],43:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":30,"./_object-dp":72,"./_property-desc":90}],44:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":41}],45:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":30,"./_dom-create":31,"./_fails":36}],46:[function(require,module,exports){
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":52,"./_set-proto":97}],47:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],48:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":19}],49:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":59,"./_wks":127}],50:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":19}],51:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":52}],52:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],53:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_cof":19,"./_is-object":52,"./_wks":127}],54:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":8}],55:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":43,"./_object-create":71,"./_property-desc":90,"./_set-to-string-tag":99,"./_wks":127}],56:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":34,"./_has":42,"./_hide":43,"./_iter-create":55,"./_iterators":59,"./_library":60,"./_object-gpo":79,"./_redefine":92,"./_set-to-string-tag":99,"./_wks":127}],57:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":127}],58:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],59:[function(require,module,exports){
module.exports = {};

},{}],60:[function(require,module,exports){
module.exports = false;

},{}],61:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],62:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":65}],63:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],64:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

},{}],65:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],66:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":36,"./_has":42,"./_is-object":52,"./_object-dp":72,"./_uid":122}],67:[function(require,module,exports){
var Map = require('./es6.map');
var $export = require('./_export');
var shared = require('./_shared')('metadata');
var store = shared.store || (shared.store = new (require('./es6.weak-map'))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

},{"./_export":34,"./_shared":101,"./es6.map":159,"./es6.weak-map":265}],68:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":19,"./_global":41,"./_task":111}],69:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":4}],70:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":36,"./_iobject":48,"./_object-gops":78,"./_object-keys":81,"./_object-pie":82,"./_to-object":117}],71:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":8,"./_dom-create":31,"./_enum-bug-keys":32,"./_html":44,"./_object-dps":73,"./_shared-key":100}],72:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":8,"./_descriptors":30,"./_ie8-dom-define":45,"./_to-primitive":118}],73:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":8,"./_descriptors":30,"./_object-dp":72,"./_object-keys":81}],74:[function(require,module,exports){
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_fails":36,"./_global":41,"./_library":60}],75:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":30,"./_has":42,"./_ie8-dom-define":45,"./_object-pie":82,"./_property-desc":90,"./_to-iobject":115,"./_to-primitive":118}],76:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":77,"./_to-iobject":115}],77:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":32,"./_object-keys-internal":80}],78:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],79:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":42,"./_shared-key":100,"./_to-object":117}],80:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":12,"./_has":42,"./_shared-key":100,"./_to-iobject":115}],81:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":32,"./_object-keys-internal":80}],82:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],83:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":24,"./_export":34,"./_fails":36}],84:[function(require,module,exports){
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

},{"./_object-keys":81,"./_object-pie":82,"./_to-iobject":115}],85:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_an-object":8,"./_global":41,"./_object-gopn":77,"./_object-gops":78}],86:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":41,"./_string-trim":109,"./_string-ws":110}],87:[function(require,module,exports){
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":41,"./_string-trim":109,"./_string-ws":110}],88:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],89:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":8,"./_is-object":52,"./_new-promise-capability":69}],90:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],91:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":92}],92:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":24,"./_global":41,"./_has":42,"./_hide":43,"./_uid":122}],93:[function(require,module,exports){
module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

},{}],94:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],95:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_a-function":4,"./_ctx":26,"./_export":34,"./_for-of":40}],96:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":34}],97:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_an-object":8,"./_ctx":26,"./_is-object":52,"./_object-gopd":75}],98:[function(require,module,exports){
'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_descriptors":30,"./_global":41,"./_object-dp":72,"./_wks":127}],99:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":42,"./_object-dp":72,"./_wks":127}],100:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":101,"./_uid":122}],101:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":41}],102:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":4,"./_an-object":8,"./_wks":127}],103:[function(require,module,exports){
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":36}],104:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":29,"./_to-integer":114}],105:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_defined":29,"./_is-regexp":53}],106:[function(require,module,exports){
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_defined":29,"./_export":34,"./_fails":36}],107:[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":29,"./_string-repeat":108,"./_to-length":116}],108:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_defined":29,"./_to-integer":114}],109:[function(require,module,exports){
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_defined":29,"./_export":34,"./_fails":36,"./_string-ws":110}],110:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],111:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":19,"./_ctx":26,"./_dom-create":31,"./_global":41,"./_html":44,"./_invoke":47}],112:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":114}],113:[function(require,module,exports){
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":114,"./_to-length":116}],114:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],115:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":29,"./_iobject":48}],116:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":114}],117:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":29}],118:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":52}],119:[function(require,module,exports){
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_an-instance":7,"./_array-copy-within":9,"./_array-fill":10,"./_array-includes":12,"./_array-methods":13,"./_classof":18,"./_ctx":26,"./_descriptors":30,"./_export":34,"./_fails":36,"./_global":41,"./_has":42,"./_hide":43,"./_is-array-iter":49,"./_is-object":52,"./_iter-detect":57,"./_iterators":59,"./_library":60,"./_object-create":71,"./_object-dp":72,"./_object-gopd":75,"./_object-gopn":77,"./_object-gpo":79,"./_property-desc":90,"./_redefine-all":91,"./_set-species":98,"./_species-constructor":102,"./_to-absolute-index":112,"./_to-index":113,"./_to-integer":114,"./_to-length":116,"./_to-object":117,"./_to-primitive":118,"./_typed":121,"./_typed-buffer":120,"./_uid":122,"./_wks":127,"./core.get-iterator-method":128,"./es6.array.iterator":140}],120:[function(require,module,exports){
'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_an-instance":7,"./_array-fill":10,"./_descriptors":30,"./_fails":36,"./_global":41,"./_hide":43,"./_library":60,"./_object-dp":72,"./_object-gopn":77,"./_redefine-all":91,"./_set-to-string-tag":99,"./_to-index":113,"./_to-integer":114,"./_to-length":116,"./_typed":121}],121:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":41,"./_hide":43,"./_uid":122}],122:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],123:[function(require,module,exports){
var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":41}],124:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":52}],125:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":24,"./_global":41,"./_library":60,"./_object-dp":72,"./_wks-ext":126}],126:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":127}],127:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":41,"./_shared":101,"./_uid":122}],128:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":18,"./_core":24,"./_iterators":59,"./_wks":127}],129:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export');
var $re = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

},{"./_export":34,"./_replacer":93}],130:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_add-to-unscopables":6,"./_array-copy-within":9,"./_export":34}],131:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $every = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":13,"./_export":34,"./_strict-method":103}],132:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_add-to-unscopables":6,"./_array-fill":10,"./_export":34}],133:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":13,"./_export":34,"./_strict-method":103}],134:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_add-to-unscopables":6,"./_array-methods":13,"./_export":34}],135:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_add-to-unscopables":6,"./_array-methods":13,"./_export":34}],136:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":13,"./_export":34,"./_strict-method":103}],137:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":25,"./_ctx":26,"./_export":34,"./_is-array-iter":49,"./_iter-call":54,"./_iter-detect":57,"./_to-length":116,"./_to-object":117,"./core.get-iterator-method":128}],138:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $indexOf = require('./_array-includes')(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"./_array-includes":12,"./_export":34,"./_strict-method":103}],139:[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":34,"./_is-array":50}],140:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":6,"./_iter-define":56,"./_iter-step":58,"./_iterators":59,"./_to-iobject":115}],141:[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

},{"./_export":34,"./_iobject":48,"./_strict-method":103,"./_to-iobject":115}],142:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});

},{"./_export":34,"./_strict-method":103,"./_to-integer":114,"./_to-iobject":115,"./_to-length":116}],143:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $map = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":13,"./_export":34,"./_strict-method":103}],144:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_create-property":25,"./_export":34,"./_fails":36}],145:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

},{"./_array-reduce":14,"./_export":34,"./_strict-method":103}],146:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

},{"./_array-reduce":14,"./_export":34,"./_strict-method":103}],147:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var html = require('./_html');
var cof = require('./_cof');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

},{"./_cof":19,"./_export":34,"./_fails":36,"./_html":44,"./_to-absolute-index":112,"./_to-length":116}],148:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $some = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":13,"./_export":34,"./_strict-method":103}],149:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_a-function":4,"./_export":34,"./_fails":36,"./_strict-method":103,"./_to-object":117}],150:[function(require,module,exports){
require('./_set-species')('Array');

},{"./_set-species":98}],151:[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"./_export":34}],152:[function(require,module,exports){
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export');
var toISOString = require('./_date-to-iso-string');

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

},{"./_date-to-iso-string":27,"./_export":34}],153:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":34,"./_fails":36,"./_to-object":117,"./_to-primitive":118}],154:[function(require,module,exports){
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_date-to-primitive":28,"./_hide":43,"./_wks":127}],155:[function(require,module,exports){
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  require('./_redefine')(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"./_redefine":92}],156:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', { bind: require('./_bind') });

},{"./_bind":17,"./_export":34}],157:[function(require,module,exports){
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":52,"./_object-dp":72,"./_object-gpo":79,"./_wks":127}],158:[function(require,module,exports){
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_descriptors":30,"./_object-dp":72}],159:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection":23,"./_collection-strong":20,"./_validate-collection":124}],160:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":34,"./_math-log1p":63}],161:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":34}],162:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":34}],163:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":34,"./_math-sign":65}],164:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":34}],165:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":34}],166:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":34,"./_math-expm1":61}],167:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":34,"./_math-fround":62}],168:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":34}],169:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":34,"./_fails":36}],170:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":34}],171:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":34,"./_math-log1p":63}],172:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":34}],173:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":34,"./_math-sign":65}],174:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":34,"./_fails":36,"./_math-expm1":61}],175:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":34,"./_math-expm1":61}],176:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":34}],177:[function(require,module,exports){
'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_cof":19,"./_descriptors":30,"./_fails":36,"./_global":41,"./_has":42,"./_inherit-if-required":46,"./_object-create":71,"./_object-dp":72,"./_object-gopd":75,"./_object-gopn":77,"./_redefine":92,"./_string-trim":109,"./_to-primitive":118}],178:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":34}],179:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":34,"./_global":41}],180:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":34,"./_is-integer":51}],181:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":34}],182:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":34,"./_is-integer":51}],183:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":34}],184:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":34}],185:[function(require,module,exports){
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":34,"./_parse-float":86}],186:[function(require,module,exports){
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":34,"./_parse-int":87}],187:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toInteger = require('./_to-integer');
var aNumberValue = require('./_a-number-value');
var repeat = require('./_string-repeat');
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

},{"./_a-number-value":5,"./_export":34,"./_fails":36,"./_string-repeat":108,"./_to-integer":114}],188:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $fails = require('./_fails');
var aNumberValue = require('./_a-number-value');
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

},{"./_a-number-value":5,"./_export":34,"./_fails":36}],189:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":34,"./_object-assign":70}],190:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":34,"./_object-create":71}],191:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });

},{"./_descriptors":30,"./_export":34,"./_object-dps":73}],192:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":30,"./_export":34,"./_object-dp":72}],193:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":52,"./_meta":66,"./_object-sap":83}],194:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_object-gopd":75,"./_object-sap":83,"./_to-iobject":115}],195:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-gopn-ext":76,"./_object-sap":83}],196:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_object-gpo":79,"./_object-sap":83,"./_to-object":117}],197:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":52,"./_object-sap":83}],198:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":52,"./_object-sap":83}],199:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":52,"./_object-sap":83}],200:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":34,"./_same-value":94}],201:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":81,"./_object-sap":83,"./_to-object":117}],202:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":52,"./_meta":66,"./_object-sap":83}],203:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":52,"./_meta":66,"./_object-sap":83}],204:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":34,"./_set-proto":97}],205:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":18,"./_redefine":92,"./_wks":127}],206:[function(require,module,exports){
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

},{"./_export":34,"./_parse-float":86}],207:[function(require,module,exports){
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":34,"./_parse-int":87}],208:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":4,"./_an-instance":7,"./_classof":18,"./_core":24,"./_ctx":26,"./_export":34,"./_for-of":40,"./_global":41,"./_is-object":52,"./_iter-detect":57,"./_library":60,"./_microtask":68,"./_new-promise-capability":69,"./_perform":88,"./_promise-resolve":89,"./_redefine-all":91,"./_set-species":98,"./_set-to-string-tag":99,"./_species-constructor":102,"./_task":111,"./_wks":127}],209:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_a-function":4,"./_an-object":8,"./_export":34,"./_fails":36,"./_global":41}],210:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_a-function":4,"./_an-object":8,"./_bind":17,"./_export":34,"./_fails":36,"./_global":41,"./_is-object":52,"./_object-create":71}],211:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_an-object":8,"./_export":34,"./_fails":36,"./_object-dp":72,"./_to-primitive":118}],212:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_an-object":8,"./_export":34,"./_object-gopd":75}],213:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

},{"./_an-object":8,"./_export":34,"./_iter-create":55}],214:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_an-object":8,"./_export":34,"./_object-gopd":75}],215:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_an-object":8,"./_export":34,"./_object-gpo":79}],216:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_an-object":8,"./_export":34,"./_has":42,"./_is-object":52,"./_object-gopd":75,"./_object-gpo":79}],217:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":34}],218:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_an-object":8,"./_export":34}],219:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":34,"./_own-keys":85}],220:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_an-object":8,"./_export":34}],221:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":34,"./_set-proto":97}],222:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_an-object":8,"./_export":34,"./_has":42,"./_is-object":52,"./_object-dp":72,"./_object-gopd":75,"./_object-gpo":79,"./_property-desc":90}],223:[function(require,module,exports){
var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_descriptors":30,"./_fails":36,"./_flags":38,"./_global":41,"./_inherit-if-required":46,"./_is-regexp":53,"./_object-dp":72,"./_object-gopn":77,"./_redefine":92,"./_set-species":98,"./_wks":127}],224:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":30,"./_flags":38,"./_object-dp":72}],225:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

},{"./_fix-re-wks":37}],226:[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

},{"./_fix-re-wks":37}],227:[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

},{"./_fix-re-wks":37}],228:[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = require('./_is-regexp');
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

},{"./_fix-re-wks":37,"./_is-regexp":53}],229:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./_an-object":8,"./_descriptors":30,"./_fails":36,"./_flags":38,"./_redefine":92,"./es6.regexp.flags":224}],230:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection":23,"./_collection-strong":20,"./_validate-collection":124}],231:[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":106}],232:[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":106}],233:[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":106}],234:[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":106}],235:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":34,"./_string-at":104}],236:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":34,"./_fails-is-regexp":35,"./_string-context":105,"./_to-length":116}],237:[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":106}],238:[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":106}],239:[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":106}],240:[function(require,module,exports){
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":34,"./_to-absolute-index":112}],241:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":34,"./_fails-is-regexp":35,"./_string-context":105}],242:[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":106}],243:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":56,"./_string-at":104}],244:[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":106}],245:[function(require,module,exports){
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":34,"./_to-iobject":115,"./_to-length":116}],246:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":34,"./_string-repeat":108}],247:[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":106}],248:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":34,"./_fails-is-regexp":35,"./_string-context":105,"./_to-length":116}],249:[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":106}],250:[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":106}],251:[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":106}],252:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

},{"./_string-trim":109}],253:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":8,"./_descriptors":30,"./_enum-keys":33,"./_export":34,"./_fails":36,"./_global":41,"./_has":42,"./_hide":43,"./_is-array":50,"./_is-object":52,"./_library":60,"./_meta":66,"./_object-create":71,"./_object-dp":72,"./_object-gopd":75,"./_object-gopn":77,"./_object-gopn-ext":76,"./_object-gops":78,"./_object-keys":81,"./_object-pie":82,"./_property-desc":90,"./_redefine":92,"./_set-to-string-tag":99,"./_shared":101,"./_to-iobject":115,"./_to-primitive":118,"./_uid":122,"./_wks":127,"./_wks-define":125,"./_wks-ext":126}],254:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_an-object":8,"./_export":34,"./_fails":36,"./_global":41,"./_is-object":52,"./_set-species":98,"./_species-constructor":102,"./_to-absolute-index":112,"./_to-length":116,"./_typed":121,"./_typed-buffer":120}],255:[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});

},{"./_export":34,"./_typed":121,"./_typed-buffer":120}],256:[function(require,module,exports){
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":119}],257:[function(require,module,exports){
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":119}],258:[function(require,module,exports){
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":119}],259:[function(require,module,exports){
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":119}],260:[function(require,module,exports){
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":119}],261:[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":119}],262:[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":119}],263:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":119}],264:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":119}],265:[function(require,module,exports){
'use strict';
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var fails = require('./_fails');
var validate = require('./_validate-collection');
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_array-methods":13,"./_collection":23,"./_collection-weak":22,"./_fails":36,"./_is-object":52,"./_meta":66,"./_object-assign":70,"./_redefine":92,"./_validate-collection":124}],266:[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection":23,"./_collection-weak":22,"./_validate-collection":124}],267:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_a-function":4,"./_add-to-unscopables":6,"./_array-species-create":16,"./_export":34,"./_flatten-into-array":39,"./_to-length":116,"./_to-object":117}],268:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

require('./_add-to-unscopables')('flatten');

},{"./_add-to-unscopables":6,"./_array-species-create":16,"./_export":34,"./_flatten-into-array":39,"./_to-integer":114,"./_to-length":116,"./_to-object":117}],269:[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_add-to-unscopables":6,"./_array-includes":12,"./_export":34}],270:[function(require,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = require('./_export');
var microtask = require('./_microtask')();
var process = require('./_global').process;
var isNode = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"./_cof":19,"./_export":34,"./_global":41,"./_microtask":68}],271:[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export');
var cof = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

},{"./_cof":19,"./_export":34}],272:[function(require,module,exports){
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.G, { global: require('./_global') });

},{"./_export":34,"./_global":41}],273:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
require('./_set-collection-from')('Map');

},{"./_set-collection-from":95}],274:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
require('./_set-collection-of')('Map');

},{"./_set-collection-of":96}],275:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_collection-to-json":21,"./_export":34}],276:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

},{"./_export":34}],277:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

},{"./_export":34}],278:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"./_export":34}],279:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var scale = require('./_math-scale');
var fround = require('./_math-fround');

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"./_export":34,"./_math-fround":62,"./_math-scale":64}],280:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"./_export":34}],281:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"./_export":34}],282:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"./_export":34}],283:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

},{"./_export":34}],284:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"./_export":34}],285:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { scale: require('./_math-scale') });

},{"./_export":34,"./_math-scale":64}],286:[function(require,module,exports){
// http://jfbastien.github.io/papers/Math.signbit.html
var $export = require('./_export');

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });

},{"./_export":34}],287:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"./_export":34}],288:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_a-function":4,"./_descriptors":30,"./_export":34,"./_object-dp":72,"./_object-forced-pam":74,"./_to-object":117}],289:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_a-function":4,"./_descriptors":30,"./_export":34,"./_object-dp":72,"./_object-forced-pam":74,"./_to-object":117}],290:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":34,"./_object-to-array":84}],291:[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_create-property":25,"./_export":34,"./_object-gopd":75,"./_own-keys":85,"./_to-iobject":115}],292:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_descriptors":30,"./_export":34,"./_object-forced-pam":74,"./_object-gopd":75,"./_object-gpo":79,"./_to-object":117,"./_to-primitive":118}],293:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_descriptors":30,"./_export":34,"./_object-forced-pam":74,"./_object-gopd":75,"./_object-gpo":79,"./_to-object":117,"./_to-primitive":118}],294:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":34,"./_object-to-array":84}],295:[function(require,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export = require('./_export');
var global = require('./_global');
var core = require('./_core');
var microtask = require('./_microtask')();
var OBSERVABLE = require('./_wks')('observable');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var anInstance = require('./_an-instance');
var redefineAll = require('./_redefine-all');
var hide = require('./_hide');
var forOf = require('./_for-of');
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

require('./_set-species')('Observable');

},{"./_a-function":4,"./_an-instance":7,"./_an-object":8,"./_core":24,"./_export":34,"./_for-of":40,"./_global":41,"./_hide":43,"./_microtask":68,"./_redefine-all":91,"./_set-species":98,"./_wks":127}],296:[function(require,module,exports){
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_core":24,"./_export":34,"./_global":41,"./_promise-resolve":89,"./_species-constructor":102}],297:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":34,"./_new-promise-capability":69,"./_perform":88}],298:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });

},{"./_an-object":8,"./_metadata":67}],299:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });

},{"./_an-object":8,"./_metadata":67}],300:[function(require,module,exports){
var Set = require('./es6.set');
var from = require('./_array-from-iterable');
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_an-object":8,"./_array-from-iterable":11,"./_metadata":67,"./_object-gpo":79,"./es6.set":230}],301:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":8,"./_metadata":67,"./_object-gpo":79}],302:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_an-object":8,"./_metadata":67}],303:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":8,"./_metadata":67}],304:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":8,"./_metadata":67,"./_object-gpo":79}],305:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":8,"./_metadata":67}],306:[function(require,module,exports){
var $metadata = require('./_metadata');
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });

},{"./_a-function":4,"./_an-object":8,"./_metadata":67}],307:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":95}],308:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":96}],309:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_collection-to-json":21,"./_export":34}],310:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export');
var $at = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

},{"./_export":34,"./_string-at":104}],311:[function(require,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export = require('./_export');
var defined = require('./_defined');
var toLength = require('./_to-length');
var isRegExp = require('./_is-regexp');
var getFlags = require('./_flags');
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

},{"./_defined":29,"./_export":34,"./_flags":38,"./_is-regexp":53,"./_iter-create":55,"./_to-length":116}],312:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":34,"./_string-pad":107,"./_user-agent":123}],313:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":34,"./_string-pad":107,"./_user-agent":123}],314:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":109}],315:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":109}],316:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":125}],317:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":125}],318:[function(require,module,exports){
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.S, 'System', { global: require('./_global') });

},{"./_export":34,"./_global":41}],319:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
require('./_set-collection-from')('WeakMap');

},{"./_set-collection-from":95}],320:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
require('./_set-collection-of')('WeakMap');

},{"./_set-collection-of":96}],321:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
require('./_set-collection-from')('WeakSet');

},{"./_set-collection-from":95}],322:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
require('./_set-collection-of')('WeakSet');

},{"./_set-collection-of":96}],323:[function(require,module,exports){
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./_global":41,"./_hide":43,"./_iterators":59,"./_object-keys":81,"./_redefine":92,"./_wks":127,"./es6.array.iterator":140}],324:[function(require,module,exports){
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":34,"./_task":111}],325:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_export":34,"./_global":41,"./_user-agent":123}],326:[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.array.flat-map');
require('./modules/es7.array.flatten');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.map.of');
require('./modules/es7.set.of');
require('./modules/es7.weak-map.of');
require('./modules/es7.weak-set.of');
require('./modules/es7.map.from');
require('./modules/es7.set.from');
require('./modules/es7.weak-map.from');
require('./modules/es7.weak-set.from');
require('./modules/es7.global');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.clamp');
require('./modules/es7.math.deg-per-rad');
require('./modules/es7.math.degrees');
require('./modules/es7.math.fscale');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.rad-per-deg');
require('./modules/es7.math.radians');
require('./modules/es7.math.scale');
require('./modules/es7.math.umulh');
require('./modules/es7.math.signbit');
require('./modules/es7.promise.finally');
require('./modules/es7.promise.try');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');

},{"./modules/_core":24,"./modules/es6.array.copy-within":130,"./modules/es6.array.every":131,"./modules/es6.array.fill":132,"./modules/es6.array.filter":133,"./modules/es6.array.find":135,"./modules/es6.array.find-index":134,"./modules/es6.array.for-each":136,"./modules/es6.array.from":137,"./modules/es6.array.index-of":138,"./modules/es6.array.is-array":139,"./modules/es6.array.iterator":140,"./modules/es6.array.join":141,"./modules/es6.array.last-index-of":142,"./modules/es6.array.map":143,"./modules/es6.array.of":144,"./modules/es6.array.reduce":146,"./modules/es6.array.reduce-right":145,"./modules/es6.array.slice":147,"./modules/es6.array.some":148,"./modules/es6.array.sort":149,"./modules/es6.array.species":150,"./modules/es6.date.now":151,"./modules/es6.date.to-iso-string":152,"./modules/es6.date.to-json":153,"./modules/es6.date.to-primitive":154,"./modules/es6.date.to-string":155,"./modules/es6.function.bind":156,"./modules/es6.function.has-instance":157,"./modules/es6.function.name":158,"./modules/es6.map":159,"./modules/es6.math.acosh":160,"./modules/es6.math.asinh":161,"./modules/es6.math.atanh":162,"./modules/es6.math.cbrt":163,"./modules/es6.math.clz32":164,"./modules/es6.math.cosh":165,"./modules/es6.math.expm1":166,"./modules/es6.math.fround":167,"./modules/es6.math.hypot":168,"./modules/es6.math.imul":169,"./modules/es6.math.log10":170,"./modules/es6.math.log1p":171,"./modules/es6.math.log2":172,"./modules/es6.math.sign":173,"./modules/es6.math.sinh":174,"./modules/es6.math.tanh":175,"./modules/es6.math.trunc":176,"./modules/es6.number.constructor":177,"./modules/es6.number.epsilon":178,"./modules/es6.number.is-finite":179,"./modules/es6.number.is-integer":180,"./modules/es6.number.is-nan":181,"./modules/es6.number.is-safe-integer":182,"./modules/es6.number.max-safe-integer":183,"./modules/es6.number.min-safe-integer":184,"./modules/es6.number.parse-float":185,"./modules/es6.number.parse-int":186,"./modules/es6.number.to-fixed":187,"./modules/es6.number.to-precision":188,"./modules/es6.object.assign":189,"./modules/es6.object.create":190,"./modules/es6.object.define-properties":191,"./modules/es6.object.define-property":192,"./modules/es6.object.freeze":193,"./modules/es6.object.get-own-property-descriptor":194,"./modules/es6.object.get-own-property-names":195,"./modules/es6.object.get-prototype-of":196,"./modules/es6.object.is":200,"./modules/es6.object.is-extensible":197,"./modules/es6.object.is-frozen":198,"./modules/es6.object.is-sealed":199,"./modules/es6.object.keys":201,"./modules/es6.object.prevent-extensions":202,"./modules/es6.object.seal":203,"./modules/es6.object.set-prototype-of":204,"./modules/es6.object.to-string":205,"./modules/es6.parse-float":206,"./modules/es6.parse-int":207,"./modules/es6.promise":208,"./modules/es6.reflect.apply":209,"./modules/es6.reflect.construct":210,"./modules/es6.reflect.define-property":211,"./modules/es6.reflect.delete-property":212,"./modules/es6.reflect.enumerate":213,"./modules/es6.reflect.get":216,"./modules/es6.reflect.get-own-property-descriptor":214,"./modules/es6.reflect.get-prototype-of":215,"./modules/es6.reflect.has":217,"./modules/es6.reflect.is-extensible":218,"./modules/es6.reflect.own-keys":219,"./modules/es6.reflect.prevent-extensions":220,"./modules/es6.reflect.set":222,"./modules/es6.reflect.set-prototype-of":221,"./modules/es6.regexp.constructor":223,"./modules/es6.regexp.flags":224,"./modules/es6.regexp.match":225,"./modules/es6.regexp.replace":226,"./modules/es6.regexp.search":227,"./modules/es6.regexp.split":228,"./modules/es6.regexp.to-string":229,"./modules/es6.set":230,"./modules/es6.string.anchor":231,"./modules/es6.string.big":232,"./modules/es6.string.blink":233,"./modules/es6.string.bold":234,"./modules/es6.string.code-point-at":235,"./modules/es6.string.ends-with":236,"./modules/es6.string.fixed":237,"./modules/es6.string.fontcolor":238,"./modules/es6.string.fontsize":239,"./modules/es6.string.from-code-point":240,"./modules/es6.string.includes":241,"./modules/es6.string.italics":242,"./modules/es6.string.iterator":243,"./modules/es6.string.link":244,"./modules/es6.string.raw":245,"./modules/es6.string.repeat":246,"./modules/es6.string.small":247,"./modules/es6.string.starts-with":248,"./modules/es6.string.strike":249,"./modules/es6.string.sub":250,"./modules/es6.string.sup":251,"./modules/es6.string.trim":252,"./modules/es6.symbol":253,"./modules/es6.typed.array-buffer":254,"./modules/es6.typed.data-view":255,"./modules/es6.typed.float32-array":256,"./modules/es6.typed.float64-array":257,"./modules/es6.typed.int16-array":258,"./modules/es6.typed.int32-array":259,"./modules/es6.typed.int8-array":260,"./modules/es6.typed.uint16-array":261,"./modules/es6.typed.uint32-array":262,"./modules/es6.typed.uint8-array":263,"./modules/es6.typed.uint8-clamped-array":264,"./modules/es6.weak-map":265,"./modules/es6.weak-set":266,"./modules/es7.array.flat-map":267,"./modules/es7.array.flatten":268,"./modules/es7.array.includes":269,"./modules/es7.asap":270,"./modules/es7.error.is-error":271,"./modules/es7.global":272,"./modules/es7.map.from":273,"./modules/es7.map.of":274,"./modules/es7.map.to-json":275,"./modules/es7.math.clamp":276,"./modules/es7.math.deg-per-rad":277,"./modules/es7.math.degrees":278,"./modules/es7.math.fscale":279,"./modules/es7.math.iaddh":280,"./modules/es7.math.imulh":281,"./modules/es7.math.isubh":282,"./modules/es7.math.rad-per-deg":283,"./modules/es7.math.radians":284,"./modules/es7.math.scale":285,"./modules/es7.math.signbit":286,"./modules/es7.math.umulh":287,"./modules/es7.object.define-getter":288,"./modules/es7.object.define-setter":289,"./modules/es7.object.entries":290,"./modules/es7.object.get-own-property-descriptors":291,"./modules/es7.object.lookup-getter":292,"./modules/es7.object.lookup-setter":293,"./modules/es7.object.values":294,"./modules/es7.observable":295,"./modules/es7.promise.finally":296,"./modules/es7.promise.try":297,"./modules/es7.reflect.define-metadata":298,"./modules/es7.reflect.delete-metadata":299,"./modules/es7.reflect.get-metadata":301,"./modules/es7.reflect.get-metadata-keys":300,"./modules/es7.reflect.get-own-metadata":303,"./modules/es7.reflect.get-own-metadata-keys":302,"./modules/es7.reflect.has-metadata":304,"./modules/es7.reflect.has-own-metadata":305,"./modules/es7.reflect.metadata":306,"./modules/es7.set.from":307,"./modules/es7.set.of":308,"./modules/es7.set.to-json":309,"./modules/es7.string.at":310,"./modules/es7.string.match-all":311,"./modules/es7.string.pad-end":312,"./modules/es7.string.pad-start":313,"./modules/es7.string.trim-left":314,"./modules/es7.string.trim-right":315,"./modules/es7.symbol.async-iterator":316,"./modules/es7.symbol.observable":317,"./modules/es7.system.global":318,"./modules/es7.weak-map.from":319,"./modules/es7.weak-map.of":320,"./modules/es7.weak-set.from":321,"./modules/es7.weak-set.of":322,"./modules/web.dom.iterable":323,"./modules/web.immediate":324,"./modules/web.timers":325}],327:[function(require,module,exports){
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

},{}],328:[function(require,module,exports){
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

},{}],329:[function(require,module,exports){
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

},{}],330:[function(require,module,exports){
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

},{"./Heap":329}],331:[function(require,module,exports){
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

},{"./Heap":329}],332:[function(require,module,exports){
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

},{"./Heap":329}],333:[function(require,module,exports){
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

},{"./DoublyLinkedList":328}],334:[function(require,module,exports){
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

},{"./DoublyLinkedList":328}],335:[function(require,module,exports){
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
},{"./Datastructures/DoublyLinkedList":328,"./Datastructures/Heap":329,"./Datastructures/MaxHeap":330,"./Datastructures/MinHeap":331,"./Datastructures/PriorityQueue":332,"./Datastructures/Queue":333,"./Datastructures/Stack":334}],336:[function(require,module,exports){
"use strict";

// import the babel polyfill that allows usage of generators

require("babel-polyfill");

var _Canvas = require("./modules/Canvas");

var _Canvas2 = _interopRequireDefault(_Canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * When the document is ready, initialize the application
 */
$(function () {
  new _Canvas2.default("#canvas", 10);
});

// import the main class

},{"./modules/Canvas":337,"babel-polyfill":1}],337:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // editor elements (gates, wires...)


// svg elements


// network logic and simulation


// ui stuff


// mouse scroll event listerer for ui, manhattan distance for importData


// used in importData
// note: imported from a node module


var _editorElements = require('./editorElements');

var editorElements = _interopRequireWildcard(_editorElements);

var _svgObjects = require('./svgObjects');

var _Logic = require('./Logic');

var _Logic2 = _interopRequireDefault(_Logic);

var _Simulation = require('./Simulation');

var _Simulation2 = _interopRequireDefault(_Simulation);

var _ContextMenu = require('./ui/ContextMenu');

var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

var _FloatingMenu = require('./ui/FloatingMenu');

var _FloatingMenu2 = _interopRequireDefault(_FloatingMenu);

var _Tutorial = require('./ui/Tutorial');

var _Tutorial2 = _interopRequireDefault(_Tutorial);

var _Messages = require('./ui/Messages');

var _Messages2 = _interopRequireDefault(_Messages);

var _ViewBox = require('./ui/ViewBox');

var _ViewBox2 = _interopRequireDefault(_ViewBox);

var _helperFunctions = require('./other/helperFunctions');

var _libstl = require('libstl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        // TODO document this
        this.messages = new _Messages2.default();

        this.simulationEnabled = true;
        this.simulation = new _Simulation2.default(this); // dummy, will be overwritten on startNewSimulation

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
        var pattern = new _svgObjects.Pattern("grid", this.gridSize, this.gridSize);

        var patternPoints = new _svgObjects.PolyLinePoints().append(new _svgObjects.PolyLinePoint(0, 0)).append(new _svgObjects.PolyLinePoint(this.gridSize, 0)).append(new _svgObjects.PolyLinePoint(this.gridSize, this.gridSize));

        pattern.addChild(new _svgObjects.PolyLine(patternPoints, 2, "#c2c3e4"));
        this.addPattern(pattern.get());

        this.background = new _svgObjects.Rectangle(0, 0, this.width, this.height, "url(#grid)", "none");
        this.appendJQueryObject(this.background.get());
        this.refresh();

        // set the viewbox for future zooming and moving of the canvas
        this.$svg.attr('preserveAspectRatio', 'xMinYMin slice');
        this.viewbox = new _ViewBox2.default(0, 0, this.width, this.height);
        this.applyViewbox();

        // CONSTRUCT CONTEXT MENU
        this.contextMenu = new _ContextMenu2.default(this);

        // CONSTRUCT FLOATING MENU
        this.floatingMenu = new _FloatingMenu2.default(this);

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

        // update the viewbox on window resize
        $(window).on('resize', function () {
            _this.viewbox.newDimensions(_this.width, _this.height);
            _this.applyViewbox();
        });

        (0, _helperFunctions.addMouseScrollEventListener)(canvas, function (event) {
            // zoom only if the ctrl key is not pressed
            if (!event.ctrlKey) {
                _this.zoom += event.delta * 0.1;

                event.preventDefault();
            }
        });

        $(window).on('keydown', function (event) {
            var actions = {
                '+': 0.1,
                '-': -0.1
            };

            if (actions[event.key]) {
                _this.zoom += actions[event.key];
            }
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
            // any click on canvas cancels the wire creation
            this.cancelWireCreation();

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
            this.background.addAttr({ x: this.viewbox.left, y: this.viewbox.top, width: this.viewbox.width, height: this.viewbox.height });

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
            this.tutorial = new _Tutorial2.default(this, function () {
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

            return new Promise(function (resolve) {
                var warnings = [];

                // if the x or y is undefined, set it to leftTopPadding instead
                // (cannot use x || leftTopPadding because of 0)
                x = x !== undefined ? x : _this3.leftTopPadding;
                y = y !== undefined ? y : _this3.leftTopPadding;

                _this3.simulationEnabled = false;

                // list of wires to be added
                var newWires = new Map();

                // find the leftmost and topmost coordinate of any box, save them to leftTopCorner
                var leftTopCorner = {
                    x: 0,
                    y: 0
                };

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.boxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var boxData = _step.value;

                        if (boxData.transform && boxData.transform.items) {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = boxData.transform.items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var transformInfo = _step4.value;

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

                var _loop = function _loop(_boxData) {
                    // mapping of dataBox.name of the objects that have category "other"
                    var otherMap = {
                        "input": function input() {
                            return _this3.newInput(0, 0, _boxData.isOn, false);
                        },
                        "output": function output() {
                            return _this3.newOutput(0, 0, false);
                        }

                        // mapping of dataBox.category
                    };var boxMap = {
                        "gate": function gate() {
                            return _this3.newGate(_boxData.name, 0, 0, false);
                        },
                        "blackbox": function blackbox() {
                            return _this3.newBlackbox(_boxData.inputs, _boxData.outputs, _boxData.table, _boxData.name, 0, 0, false);
                        },
                        "other": function other() {
                            if (!_boxData.name) throw 'This network contains a box without a name.';

                            if (!otherMap[_boxData.name]) throw 'This network contains unknown box names. (' + _boxData.name + ')';

                            return otherMap[_boxData.name]();
                        }
                    };

                    var createBox = function createBox() {
                        if (!_boxData.category) throw 'This network a box without a category.';

                        if (!boxMap[_boxData.category]) throw 'This network contains unknown box categories. (' + _boxData.category + ')';

                        return boxMap[_boxData.category]();
                    };

                    var box = void 0;

                    try {
                        box = createBox();
                    } catch (e) {
                        warnings.push(e);
                    }

                    if (box) {
                        // proccess box transforms (translation and rotation)
                        var transform = new editorElements.Transform();
                        var rotationCount = 0;

                        var transformItemMap = {
                            "translate": function translate(args) {
                                transform.setTranslate(args[0] - leftTopCorner.x // make it the relative distance from the leftmost element
                                + x // apply the position

                                , args[1] - leftTopCorner.y // make it the relative distance from the topmost element
                                + y // apply the position
                                );
                            },
                            "rotate": function rotate(args) {
                                rotationCount = args[0] % 360 / 90;
                            }
                        };

                        if (_boxData.transform && _boxData.transform.items) {
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = _boxData.transform.items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var transformItem = _step5.value;
                                    var name = transformItem.name,
                                        args = transformItem.args;


                                    if (!name) {
                                        warnings.push('This network contains unnamed transform properties.');
                                        break;
                                    }

                                    if (!transformItemMap[name]) {
                                        warnings.push('This network contains unknown transform properties. (' + transformItem.name + ')');
                                        break;
                                    }

                                    transformItemMap[name](args);
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

                        transform.toSVGPixels(_this3);
                        box.setTransform(transform);

                        for (var i = 0; i < rotationCount; ++i) {
                            box.rotate(true);
                        }

                        // add all wires to the list of wires to be added
                        if (_boxData.connections) {
                            var _iteratorNormalCompletion6 = true;
                            var _didIteratorError6 = false;
                            var _iteratorError6 = undefined;

                            try {
                                for (var _iterator6 = _boxData.connections[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                    var connection = _step6.value;

                                    // get the artificial wire id
                                    var wireId = connection.wireId;

                                    // pass the values got from json into a variable that will be added into the map
                                    var value = {
                                        index: connection.index,
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
                    }
                };

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = data.boxes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _boxData = _step2.value;

                        _loop(_boxData);
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
                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;

                        try {
                            for (var _iterator7 = wireInfo[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var _ref = _step7.value;
                                var boxId = _ref.boxId;
                                var index = _ref.index;

                                connectorIds.push(_this3.getBoxById(boxId).connectors[index].id);
                            }

                            // create and array [{x, y}, {x, y}] containing positions for connectors 1 and 2
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

                        var connectorsPositions = connectorIds.map(function (connectorId) {
                            return _this3.getConnectorPosition(_this3.getConnectorById(connectorId), true);
                        });

                        if (connectorsPositions.length === 2) {
                            var _wire2 = _this3.newWire.apply(_this3, connectorIds.concat([false, false]));

                            // get the manhattan distance between these two connectors
                            var distance = _helperFunctions.manhattanDistance.apply(undefined, _toConsumableArray(connectorsPositions));

                            // add connectorids to the priority queue
                            wireQueue.enqueue(_wire2, 1 / distance);
                        } else {
                            warnings.push('Found a wire that does not have two endings. (It had ' + connectorsPositions.length + ' instead.)');
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

                if (window.Worker) {
                    var wirePoints = [];
                    var wireReferences = [];

                    // convert the queue to an array (this is needed by the web worker)
                    while (!wireQueue.isEmpty()) {
                        var wire = wireQueue.dequeue();

                        var wireStart = _this3.getConnectorPosition(wire.connection.from.connector, true);
                        var wireEnd = _this3.getConnectorPosition(wire.connection.to.connector, true);

                        wirePoints.push([{
                            x: wireStart.x / _this3.gridSize,
                            y: wireStart.y / _this3.gridSize
                        }, {
                            x: wireEnd.x / _this3.gridSize,
                            y: wireEnd.y / _this3.gridSize
                        }]);

                        wireReferences.push(wire);
                    }

                    // routeWorker.js replaced in the build process (defined in gulpfile) depending on devel / prod build
                    var myWorker = new Worker("js/routeWorker.js");

                    var loadingMessage = _this3.messages.newLoadingMessage("looking for the best wiring…");

                    myWorker.onmessage = function (event) {
                        var paths = event.data.paths;
                        // iterate wireReferences and paths synchronously

                        wireReferences.forEach(function (wire, key) {
                            wire.setWirePath(wire.pathToPolyLine(paths[key]));
                            wire.updateWireState();
                            wire.generateInconvenientNodes();
                        });

                        loadingMessage.hide();
                    };

                    var message = {
                        wires: wirePoints,
                        nonRoutableNodes: _this3.getNonRoutableNodes(),
                        inconvenientNodes: _this3.getInconvenientNodes()
                    };

                    myWorker.postMessage(message);
                } else {
                    // web worker is not supported: use an interval to make the import a bit slower
                    // by dividing it into chunks, so the browser window is not entirely frozen when the wiring is happening

                    var wiresToBeRoutedAtOnce = 10;
                    var delayBetweenIterations = 200;

                    // add wires in the order from short to long
                    var wirePlacingInterval = window.setInterval(function () {
                        if (!wireQueue.isEmpty()) {
                            for (var i = 0; i < wiresToBeRoutedAtOnce; ++i) {
                                if (wireQueue.isEmpty()) {
                                    break;
                                }

                                var _wire = wireQueue.dequeue();
                                _wire.routeWire(true, false);
                                _wire.updateWireState();
                            }
                        } else {
                            console.log("finished");
                            clearInterval(wirePlacingInterval);
                        }
                    }, delayBetweenIterations);
                }

                // refresh the SVG document
                _this3.refresh();

                _this3.simulationEnabled = true;

                resolve(warnings);
            });
        }

        /**
         * When user clicks on a connector, remember it until they click on some other connector.
         * Than call newWire with the last two connectors ids as arguments.
         * Visualize the process by displaying a grey wire between the first conenctor and the mouse pointer.
         * @param  {string} connectorId id of the connector that the user clicked on
         */

    }, {
        key: 'wireCreationHelper',
        value: function wireCreationHelper(connectorId, mousePosition) {
            if (!this.wireCreation) {
                this.wireCreation = {
                    fromId: connectorId
                };

                this.displayCreatedWire(mousePosition);
            } else {
                if (this.wireCreation.fromId !== connectorId) {
                    this.hideCreatedWire();

                    this.newWire(this.wireCreation.fromId, connectorId);

                    this.wireCreation = undefined;
                }
            }
        }

        /**
         * helper for wireCreationHelper that displays a grey wire between the first connector and the specified mousePosition
         * @param  {Object} mousePosition object with x and y coordinates in SVG pixels
         */

    }, {
        key: 'displayCreatedWire',
        value: function displayCreatedWire(mousePosition) {
            var _this4 = this;

            this.wireCreation.tempWire = new editorElements.HelperWire(this, this.wireCreation.fromId, mousePosition);

            $(window).on('mousemove.wireCreation', function (event) {
                event = _this4.viewbox.transformEvent(event);

                mousePosition = {
                    x: event.pageX,
                    y: event.pageY
                };

                _this4.wireCreation.tempWire.updateMousePosition(mousePosition);
            });

            this.appendElement(this.wireCreation.tempWire);
            this.moveToBackById(this.wireCreation.tempWire.id);
        }

        /**
         * helper for wireCreationHelper that hides the temporary wire when wire creation is done
         */

    }, {
        key: 'hideCreatedWire',
        value: function hideCreatedWire() {
            $(window).off('mousemove.wireCreation');

            this.wireCreation.tempWire.get().remove();
            this.wireCreation.tempWire = undefined;
        }

        /**
         * helper for wireCreationHelper that cancels the wire creation process
         */

    }, {
        key: 'cancelWireCreation',
        value: function cancelWireCreation() {
            if (this.wireCreation) {
                this.hideCreatedWire();
                this.wireCreation = undefined;
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
                this.simulation = new _Simulation2.default(this);
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
                    this.removeWiresByConnectorId(this.boxes[gateIndex].connectors[_i].id);
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
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = ids[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var id = _step8.value;

                    this.removeBox(id);
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
            var _this5 = this;

            var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var route = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            // wire must connect two distinct connectors
            if (fromId === toId) return undefined;

            var connectors = [this.getConnectorById(fromId), this.getConnectorById(toId)];

            // input connectors can be connected to one wire max
            connectors.forEach(function (conn) {
                if (conn.isInputConnector) _this5.removeWiresByConnectorId(conn.id);
            });
            var index = this.wires.length;

            try {
                this.wires[index] = new editorElements.Wire(this, fromId, toId, refresh, route);
            } catch (e) {
                this.messages.newErrorMessage(e);
                return undefined;
            }

            connectors.forEach(function (conn) {
                conn.addWireId(_this5.wires[index].svgObj.id);
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

            return { x: x, y: y };
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

                var _loop2 = function _loop2(line) {
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

                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    for (var _iterator9 = table[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        var line = _step9.value;

                        var _ret2 = _loop2(line);

                        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
                    }
                    // if nothing matches, set all outputs to undefined
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

                return Array.from(new Array(outputs), function () {
                    return _Logic2.default.state.unknown;
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
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = this.wires[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var wire = _step10.value;

                    if (wire.svgObj.id === wireId) {
                        return wire;
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
                    var connectors = this.wires[i].connectors;
                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;

                    try {

                        for (var _iterator11 = connectors[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var connector = _step11.value;

                            connector.removeWireIdAndUpdate(wireId);
                        }

                        // start simulation from the input connector to
                        // refresh the network after this wire
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

                    var inputConnector = this.wires[i].connection.to.connector;
                    this.startNewSimulation(inputConnector, inputConnector.state);

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
            var _this6 = this;

            var connector = this.getConnectorById(connectorId);

            connector.wireIds.forEach(function (wireId) {
                var wire = _this6.getWireById(wireId);

                var _wire$connection = wire.connection,
                    from = _wire$connection.from,
                    to = _wire$connection.to;

                // get the other connector that is the wire connected to

                var otherConnector = connectorId === from.id ? to.connector : from.connector;

                // delete the wire record from the other connector
                otherConnector.wireIds.delete(wireId);

                // remove the wire representation using jQuery
                $("#" + wireId).remove();

                // if otherConnector is an input connector, set its state to unknown
                if (otherConnector.isInputConnector) {
                    otherConnector.setState(_Logic2.default.state.unknown);
                    _this6.startNewSimulation(otherConnector, _Logic2.default.state.unknown);
                }
            });

            // clear the list of wire Ids
            connector.wireIds.clear();
            // if connector is an input connector, set its state to unknown
            if (connector.isInputConnector) {
                connector.setState(_Logic2.default.state.unknown);
                this.startNewSimulation(connector, _Logic2.default.state.unknown);
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
                var _wire$connection2 = wire.connection,
                    from = _wire$connection2.from,
                    to = _wire$connection2.to;


                if (from.id === connectorId) return from.connector;

                if (to.id === connectorId) return to.connector;
            } else {
                // we do not know the wire -- we have to check all gates
                var _iteratorNormalCompletion12 = true;
                var _didIteratorError12 = false;
                var _iteratorError12 = undefined;

                try {
                    for (var _iterator12 = this.boxes[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                        var _box = _step12.value;

                        var connector = _box.getConnectorById(connectorId);
                        if (connector) {
                            return connector;
                        }
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

            return undefined;
        }
    }, {
        key: 'getWireAnchorById',
        value: function getWireAnchorById(anchorId) {
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = this.wires[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var wire = _step13.value;
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;

                    try {
                        for (var _iterator14 = wire.anchors[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var anchor = _step14.value;

                            if (anchor.id === anchorId) {
                                return anchor;
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
            } else if ($target.hasClass("wireAnchor")) {
                return this.getWireAnchorById($target.attr('id'));
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
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this.boxes[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var _box2 = _step15.value;

                    var translate = _box2.getGridPixelTransform().getTranslate();

                    // for each item in blockedNodes (set of blocked nodes with coordinates relative
                    // to the left upper corner of rect; unit used is "one gridSize") convert the coordinates
                    // to absolute (multiple with gridSize and add position of rect) and add the result to the set
                    var _iteratorNormalCompletion16 = true;
                    var _didIteratorError16 = false;
                    var _iteratorError16 = undefined;

                    try {
                        for (var _iterator16 = _box2.blockedNodes[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                            var node = _step16.value;

                            blockedNodes.add({
                                x: translate.x + node.x,
                                y: translate.y + node.y
                            });
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
                }

                // FOR DEBUG ONLY: display the non routable nodes
                /*
                 if(this.nodeDisplay) {
                    for (const rectangleId of this.nodeDisplay) {
                        $(`#${rectangleId}`).remove();
                    }
                }
                 this.nodeDisplay = [];
                 let first = true;
                 for (const node of blockedNodes) {
                    const x = this.gridToSVG(node.x);
                    const y = this.gridToSVG(node.y);
                     const w = 4;
                    const p = w / 2;
                     const nodeRectangle = new Rectangle(x - p, y - p, w, w, first ? "blue" : "red", "none")
                    this.nodeDisplay.push(nodeRectangle.id);
                    this.appendElement(nodeRectangle, false);
                     first = false;
                }
                 this.refresh();
                 */
                // END FOR DEBUG ONLY

                // return the set
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

            var _iteratorNormalCompletion17 = true;
            var _didIteratorError17 = false;
            var _iteratorError17 = undefined;

            try {
                for (var _iterator17 = this.wires[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                    var wire = _step17.value;

                    if (ignoreWireId === undefined || ignoreWireId !== wire.id) {
                        if (wire.inconvenientNodes) {
                            var _iteratorNormalCompletion18 = true;
                            var _didIteratorError18 = false;
                            var _iteratorError18 = undefined;

                            try {
                                for (var _iterator18 = wire.inconvenientNodes[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                                    var node = _step18.value;

                                    inconvenientNodes.add(node);
                                }
                            } catch (err) {
                                _didIteratorError18 = true;
                                _iteratorError18 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion18 && _iterator18.return) {
                                        _iterator18.return();
                                    }
                                } finally {
                                    if (_didIteratorError18) {
                                        throw _iteratorError18;
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
                     const nodeRectangle = new Rectangle(x - p, y - p, w, w, "orange", "none")
                    this.inconvenientNodeDisplay.push(nodeRectangle.id);
                    this.appendElement(nodeRectangle, false);
                }
                 this.refresh();
                 */
                // END FOR DEBUG ONLY

                // return the set
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

            var _iteratorNormalCompletion19 = true;
            var _didIteratorError19 = false;
            var _iteratorError19 = undefined;

            try {
                for (var _iterator19 = this.boxes[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                    var _box3 = _step19.value;

                    data.boxes.push(_box3.exportData);
                }
            } catch (err) {
                _didIteratorError19 = true;
                _iteratorError19 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion19 && _iterator19.return) {
                        _iterator19.return();
                    }
                } finally {
                    if (_didIteratorError19) {
                        throw _iteratorError19;
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

},{"./Logic":338,"./Simulation":339,"./editorElements":340,"./other/helperFunctions":356,"./svgObjects":359,"./ui/ContextMenu":371,"./ui/FloatingMenu":372,"./ui/Messages":373,"./ui/Tutorial":374,"./ui/ViewBox":375,"libstl":335}],338:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module Logic */
/**
 * definitions of logic states and basic logic functions used in the simulation
 */
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

},{}],339:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Logic = require('./Logic');

var _Logic2 = _interopRequireDefault(_Logic);

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
                                state = _Logic2.default.state.oscillating;
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

},{"./Logic":338}],340:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Transform = require('./editorElements/Transform');

Object.defineProperty(exports, 'Transform', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Transform).default;
  }
});

var _InputConnector = require('./editorElements/InputConnector');

Object.defineProperty(exports, 'InputConnector', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_InputConnector).default;
  }
});

var _OutputConnector = require('./editorElements/OutputConnector');

Object.defineProperty(exports, 'OutputConnector', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_OutputConnector).default;
  }
});

var _InputBox = require('./editorElements/InputBox');

Object.defineProperty(exports, 'InputBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_InputBox).default;
  }
});

var _OutputBox = require('./editorElements/OutputBox');

Object.defineProperty(exports, 'OutputBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_OutputBox).default;
  }
});

var _Gate = require('./editorElements/Gate');

Object.defineProperty(exports, 'Gate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Gate).default;
  }
});

var _Blackbox = require('./editorElements/Blackbox');

Object.defineProperty(exports, 'Blackbox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Blackbox).default;
  }
});

var _HelperWire = require('./editorElements/HelperWire');

Object.defineProperty(exports, 'HelperWire', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_HelperWire).default;
  }
});

var _Wire = require('./editorElements/Wire');

Object.defineProperty(exports, 'Wire', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Wire).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./editorElements/Blackbox":341,"./editorElements/Gate":344,"./editorElements/HelperWire":345,"./editorElements/InputBox":346,"./editorElements/InputConnector":347,"./editorElements/OutputBox":349,"./editorElements/OutputConnector":350,"./editorElements/Transform":351,"./editorElements/Wire":352}],341:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _svgObjects = require('../svgObjects');

var _Logic = require('../Logic');

var _Logic2 = _interopRequireDefault(_Logic);

var _Box2 = require('./Box');

var _Box3 = _interopRequireDefault(_Box2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module editorElements.Blackbox */

/**
 * Blackbox is a box that is defined by its evaluation function
 * @extends Box
 */
var Blackbox = function (_Box) {
    _inherits(Blackbox, _Box);

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

        var _this = _possibleConstructorReturn(this, (Blackbox.__proto__ || Object.getPrototypeOf(Blackbox)).call(this, parentSVG, name, "blackbox", width, height));

        var connectorPinLenght = 2.5 * _this.gridSize;

        // override default svgObj structure
        _this.svgObj = new _svgObjects.Group();

        // transparent background rectangle
        var hitbox = new _svgObjects.Rectangle(0, 0, _this.width, _this.height, "none", "none");
        hitbox.$el.addClass('rect');

        _this.svgObj.addChild(hitbox);

        // main rectangle
        var bodyWidth = _this.width - 2 * connectorPinLenght;

        var rectangle = new _svgObjects.Rectangle(connectorPinLenght, 0, bodyWidth, _this.height, "white", "black");
        rectangle.addAttr({ 'stroke-width': '2.5' });
        rectangle.$el.addClass('rect');

        _this.svgObj.addChild(rectangle);

        // text description of the box
        var textWidth = bodyWidth - _this.gridSize;
        var textHeight = _this.height - _this.gridSize;
        var text = new _svgObjects.MultiLineText((_this.width - textWidth) / 2, // horizontal centering
        (_this.height - textHeight) / 2, // vertical centering
        textWidth, textHeight, name.toUpperCase(), _this.gridSize * 1.2);
        _this.svgObj.addChild(text);

        // add input connectors
        for (var i = 0; i < inputConnectors; ++i) {
            var gridPosition = i * 2 + 1;
            var pixelPosition = gridPosition * _this.gridSize;

            var pin = new _svgObjects.PolyLine(new _svgObjects.PolyLinePoints([new _svgObjects.PolyLinePoint(0, pixelPosition), new _svgObjects.PolyLinePoint(connectorPinLenght, pixelPosition)]), 1, "black");

            _this.svgObj.addChild(pin);

            // add the connector
            _this.addInputConnector(0, gridPosition);
        }

        // add output connectors
        for (var _i = 0; _i < outputConnectors; ++_i) {
            var _gridPosition = _i * 2 + 1;
            var _pixelPosition = _gridPosition * _this.gridSize;

            var _pin = new _svgObjects.PolyLine(new _svgObjects.PolyLinePoints([new _svgObjects.PolyLinePoint(_this.width - connectorPinLenght, _pixelPosition), new _svgObjects.PolyLinePoint(_this.width, _pixelPosition)]), 1, "black");

            _this.svgObj.addChild(_pin);

            _this.addOutputConnector(width, _gridPosition);
        }

        _this.svgObj.$el.addClass("box");

        /**
         * function that takes `inputConnectors` [Logic.state](./module-Logic.html#.state)s
         * and returns `outputConnectors` Logic.states.
         */
        _this.evalFunction = evalFunction;

        // regenerate the blocked nodes after adding all the connectors
        _this.generateBlockNodes();
        return _this;
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
            var _get2;

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

            (_get2 = _get(Blackbox.prototype.__proto__ || Object.getPrototypeOf(Blackbox.prototype), 'generateBlockNodes', this)).call.apply(_get2, [this, 0, 1, 0, 1].concat(specialNodes));
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
            var stateList = _Logic2.default.stateList;

            // recursive function that generates all possible inputs
            var getPermutations = function getPermutations(length) {
                var permutations = [];
                switch (length) {
                    case 0:
                        return [];
                    case 1:
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = stateList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var state = _step.value;

                                permutations.push([state]);
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

                        return permutations;
                    default:
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = stateList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _state = _step2.value;
                                var _iteratorNormalCompletion3 = true;
                                var _didIteratorError3 = false;
                                var _iteratorError3 = undefined;

                                try {
                                    for (var _iterator3 = getPermutations(length - 1)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var perm = _step3.value;

                                        permutations.push([_state].concat(_toConsumableArray(perm)));
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

                        return permutations;
                }
            };

            // generate outputs for all the possible inputs
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = getPermutations(data.inputs)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var inputValues = _step4.value;

                    var outputValues = this.evalFunction.apply(this, _toConsumableArray(inputValues));

                    // if there is an output value that is not Logic.state.unknown, add this line to the
                    // truthtable, otherwise don't add it (if all output values are Logic.state.unknown,
                    // the input combination does not have to be defines, because Logic.state.unknown is the default value)
                    if (outputValues.reduce(function (accumulator, current) {
                        return accumulator || current !== _Logic2.default.state.unknown;
                    })) {
                        data.table.push([].concat(_toConsumableArray(inputValues), _toConsumableArray(outputValues)));
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

            return data;
        }
    }]);

    return Blackbox;
}(_Box3.default);

exports.default = Blackbox;

},{"../Logic":338,"../svgObjects":359,"./Box":342}],342:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svgObjects = require('../svgObjects');

var _NetworkElement2 = require('./NetworkElement');

var _NetworkElement3 = _interopRequireDefault(_NetworkElement2);

var _InputConnector = require('./InputConnector');

var _InputConnector2 = _interopRequireDefault(_InputConnector);

var _OutputConnector = require('./OutputConnector');

var _OutputConnector2 = _interopRequireDefault(_OutputConnector);

var _Transform = require('./Transform');

var _Transform2 = _interopRequireDefault(_Transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module editorElements.Box */

/**
 * Parent class for gates and input and output boxes. Defines all the factors
 * that the boxes have in common (svgObj structure, draggability and rotatability...)
 * @extends NetworkElement
 */
var Box = function (_NetworkElement) {
    _inherits(Box, _NetworkElement);

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
        var _this = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, parentSVG));

        _this.name = name;

        /**
         * specifies the box category (io for input or output, gate for logic gates)
         * @type {string}
         */
        _this.category = category;

        /**
         * size of the grid in SVG pixels
         * @type {number}
         */
        _this.gridSize = _this.parentSVG.gridSize;

        /**
         * array of connectors of this box
         * @type {Array}
         */
        _this.connectors = [];

        /**
         * svgObj containing all SVG data used to display this box
         * @type {svgObj}
         */
        _this.svgObj = new _svgObjects.Group();

        /**
         * width of this element in SVG pixels
         * @type {number}
         */
        _this.width = gridWidth * _this.gridSize;
        /**
         * height of this element in SVG pixels
         * @type {number}
         */
        _this.height = gridHeight * _this.gridSize;

        /**
         * width of this element in grid pixels
         * @type {number}
         */
        _this.gridWidth = gridWidth;
        /**
         * height of this element in grid pixels
         * @type {number}
         */
        _this.gridHeight = gridHeight;

        // transparent background rectangle
        var rectangle = new _svgObjects.Rectangle(0, 0, _this.width, _this.height, "none", "none");
        rectangle.$el.addClass('rect');

        _this.svgObj.addChild(rectangle);

        // image of the element
        _this.image = new _svgObjects.SvgImage(0, 0, _this.width, _this.height, _this.url);
        _this.svgObj.addChild(_this.image);

        // add type="gate", used in special callbacks in contextmenu
        _this.svgObj.addAttr({ "type": category });

        _this.svgObj.$el.addClass("box");
        _this.svgObj.$el.addClass(category);
        return _this;
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

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = specialNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var node = _step.value;

                    this.blockedNodes.add(node);
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
        value: function rotateBlockedNodes(center, right) {
            if (this.rotationParity === undefined) {
                this.rotationParity = false;
            }

            this.rotationParity = !this.rotationParity;

            var newBlockedNodes = new Set();

            // rotate the node

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.blockedNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var node = _step2.value;

                    var newNode = void 0;

                    var parityFactor = this.rotationParity ? 1 : -1;

                    if (right) {
                        newNode = {
                            x: -node.y + this.gridHeight + (center.x - center.y) * parityFactor,
                            y: node.x + (center.y - center.x) * parityFactor
                        };
                    } else {
                        newNode = {
                            x: node.y + (center.x - center.y) * parityFactor
                        };

                        if (this.rotationParity) {
                            newNode.y = -node.x + this.gridWidth + (this.gridHeight - center.y - (this.gridWidth - center.x));
                        } else {
                            newNode.y = -node.x + this.gridHeight + (center.y - center.x);
                        }
                    }

                    newBlockedNodes.add(newNode);
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

            this.blockedNodes = newBlockedNodes;
        }

        /**
         * rotate the set of blocked nodes to the right
         *
         * used to rotate the nodes when the object itself is rotated
         */

    }, {
        key: 'rotateBlockedNodesRight',
        value: function rotateBlockedNodesRight(center) {
            this.rotateBlockedNodes(center, true);
        }

        /**
         * rotate the set of blocked nodes to the right
         *
         * used to rotate the nodes when the object itself is rotated
         */

    }, {
        key: 'rotateBlockedNodesLeft',
        value: function rotateBlockedNodesLeft(center) {
            this.rotateBlockedNodes(center, false);
        }
    }, {
        key: 'rotate',
        value: function rotate(clockWise) {
            // get the transform value for this box
            var transform = this.getTransform();

            // get the bounding rectangle for this box
            var rect = this.svgObj.$el[0].getBoundingClientRect();

            // use the bounding rectangle dimensions to figure out the geometrical center of the box
            var center = {
                x: Math.round(rect.width / 2),
                y: Math.round(rect.height / 2)
            };

            center.x -= center.x % this.gridSize;
            center.y -= center.y % this.gridSize;

            // apply the rotation to the transform object
            if (clockWise) {
                transform.rotateRight(center.x, center.y);
            } else {
                transform.rotateLeft(center.x, center.y);
            }

            // apply the modified transform object ot the svgObj
            this.svgObj.addAttr({ "transform": transform.get() });

            var gridCenter = {
                x: center.x / this.gridSize,
                y: center.y / this.gridSize
            };

            // rotate also the blocked nodes
            if (clockWise) {
                this.rotateBlockedNodesRight(gridCenter);
            } else {
                this.rotateBlockedNodesLeft(gridCenter);
            }

            // update the wires
            this.updateWires();

            // if tutorial exists, call tutorial callback
            if (this.parentSVG.tutorial) {
                this.parentSVG.tutorial.onBoxRotated();
            }
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
                this.connectors[index] = new _InputConnector2.default(this.parentSVG, left, top);
            } else {
                this.connectors[index] = new _OutputConnector2.default(this.parentSVG, left, top);
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
                transform = new _Transform2.default();
                transform.setTranslate(0, 0);
                this.svgObj.addAttr({ "transform": transform.get() });
            } else {
                // the element does have a "transform" property --> change it
                transform = new _Transform2.default(this.svgObj.$el.attr("transform"));
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
            if (event.ctrlKey) {
                this.rotate(false);
            } else {
                this.rotate(true);
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
            var _this2 = this;

            var temporary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.connectors.forEach(function (conn) {
                conn.wireIds.forEach(function (wireId) {
                    var wire = _this2.parentSVG.getWireById(wireId);
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
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.connectors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var conn = _step3.value;

                    // go through each its wire id
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = conn.wireIds[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var item = _step4.value;

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

                    counter++;
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

            return {
                name: this.name,
                category: this.category,
                transform: this.getTransform(true),
                connections: connections
            };
        }
    }]);

    return Box;
}(_NetworkElement3.default);

exports.default = Box;

},{"../svgObjects":359,"./InputConnector":347,"./NetworkElement":348,"./OutputConnector":350,"./Transform":351}],343:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NetworkElement2 = require('./NetworkElement');

var _NetworkElement3 = _interopRequireDefault(_NetworkElement2);

var _svgObjects = require('../svgObjects');

var _Logic = require('../Logic');

var _Logic2 = _interopRequireDefault(_Logic);

var _stateClasses = require('./stateClasses');

var _stateClasses2 = _interopRequireDefault(_stateClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module editorElements.Connector */

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
    _this.svgObj = new _svgObjects.Rectangle(left * _this.gridSize - _this.connectorOffset, top * _this.gridSize - _this.connectorOffset, _this.connectorSize, _this.connectorSize, "none", "black");

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
    _this.elementState = _Logic2.default.state.unknown;
    _this.svgObj.addClass(_stateClasses2.default[_Logic2.default.state.unknown]);

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
      var _svgObj;

      (_svgObj = this.svgObj).removeClasses.apply(_svgObj, _toConsumableArray(_stateClasses2.default));
      this.svgObj.addClass(_stateClasses2.default[state]);

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
    value: function onMouseUp(event) {
      // only left click counts
      if (event.which === 1) {
        event = this.parentSVG.viewbox.transformEvent(event);

        var mousePosition = {
          x: event.pageX,
          y: event.pageY
        };

        this.parentSVG.wireCreationHelper(this.svgObj.id, mousePosition);
      }
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
}(_NetworkElement3.default);

exports.default = Connector;

},{"../Logic":338,"../svgObjects":359,"./NetworkElement":348,"./stateClasses":354}],344:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Logic = require('../Logic');

var _Logic2 = _interopRequireDefault(_Logic);

var _Box2 = require('./Box');

var _Box3 = _interopRequireDefault(_Box2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module editorElements.Gate */

/**
 * Gate is a box that processes the states of its input connectors and returns the result in its output connectors.
 * @extends Box
 */
var Gate = function (_Box) {
    _inherits(Gate, _Box);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string} name       name of the gate (and, not, xor...)
     */
    function Gate(parentSVG, name) {
        _classCallCheck(this, Gate);

        var width = 9;
        var height = 4;

        // ADD CONNECTORS

        var _this = _possibleConstructorReturn(this, (Gate.__proto__ || Object.getPrototypeOf(Gate)).call(this, parentSVG, name, "gate", width, height));

        var specialNodes = [];

        // output
        _this.addConnector(width, height / 2, false);

        // block the output connector
        specialNodes.push({
            x: width,
            y: height / 2
        });

        if (_this.name === "not" || _this.name === "repeater") {
            // input
            _this.addConnector(0, height / 2, true);
            // block the input connector
            specialNodes.push({
                x: 0,
                y: height / 2
            });
        } else {
            // input
            _this.addConnector(0, height / 4, true);
            _this.addConnector(0, height / (4 / 3), true);

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

        _this.generateBlockNodes.apply(_this, specialNodes);

        _this.refreshState();
        return _this;
    }

    /**
     * array of valid gate names
     * @type {Set}
     */


    _createClass(Gate, [{
        key: 'generateBlockNodes',
        value: function generateBlockNodes() {
            for (var _len = arguments.length, specialNodes = Array(_len), _key = 0; _key < _len; _key++) {
                specialNodes[_key] = arguments[_key];
            }

            if (specialNodes !== undefined) {
                var _get2;

                (_get2 = _get(Gate.prototype.__proto__ || Object.getPrototypeOf(Gate.prototype), 'generateBlockNodes', this)).call.apply(_get2, [this, 0, 1, 0, 1].concat(specialNodes));
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
            var _this2 = this;

            // map gate names to their logic functions
            var stateMap = {
                "and": function and() {
                    return _Logic2.default.and(_this2.connectors[1].state, _this2.connectors[2].state);
                },
                "nand": function nand() {
                    return _Logic2.default.nand(_this2.connectors[1].state, _this2.connectors[2].state);
                },
                "nor": function nor() {
                    return _Logic2.default.nor(_this2.connectors[1].state, _this2.connectors[2].state);
                },
                "not": function not() {
                    return _Logic2.default.not(_this2.connectors[1].state);
                },
                "or": function or() {
                    return _Logic2.default.or(_this2.connectors[1].state, _this2.connectors[2].state);
                },
                "xnor": function xnor() {
                    return _Logic2.default.xnor(_this2.connectors[1].state, _this2.connectors[2].state);
                },
                "xor": function xor() {
                    return _Logic2.default.xor(_this2.connectors[1].state, _this2.connectors[2].state);
                },
                "repeater": function repeater() {
                    return _this2.connectors[1].state;
                }
            };

            var state = _Logic2.default.state.unknown;

            if (stateMap[this.name]) {
                state = stateMap[this.name]();
            }

            // notify the simulator about this change
            this.parentSVG.simulation.notifyChange(this.connectors[0].id, state);
        }
    }], [{
        key: 'validGates',
        get: function get() {
            return new Set(["not", "and", "or", "nand", "nor", "xor", "xnor", "repeater"]);
        }
    }]);

    return Gate;
}(_Box3.default);

exports.default = Gate;

},{"../Logic":338,"./Box":342}],345:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svgObjects = require('../svgObjects');

var _NetworkElement2 = require('./NetworkElement');

var _NetworkElement3 = _interopRequireDefault(_NetworkElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module editorElements.HelperWire */

/**
 * A temporary wire that is connecting a {@link Connector} with a mouse pointer when user creates a wire.
 * @extends NetworkElement
 */
var HelperWire = function (_NetworkElement) {
    _inherits(HelperWire, _NetworkElement);

    function HelperWire(parentSVG, fromId, mousePosition) {
        _classCallCheck(this, HelperWire);

        var _this = _possibleConstructorReturn(this, (HelperWire.__proto__ || Object.getPrototypeOf(HelperWire)).call(this, parentSVG));

        var connector = _this.parentSVG.getConnectorById(fromId);
        _this.connectorPosition = _this.parentSVG.getConnectorPosition(connector, true);

        var from = new _svgObjects.PolyLinePoint(_this.connectorPosition.x, _this.connectorPosition.y);
        var to = new _svgObjects.PolyLinePoint(mousePosition.x, mousePosition.y);

        var points = new _svgObjects.PolyLinePoints([from, to]);

        _this.svgObj = new _svgObjects.PolyLine(points, 2, "#8b8b8b");
        return _this;
    }

    _createClass(HelperWire, [{
        key: 'updateMousePosition',
        value: function updateMousePosition(mousePosition) {
            var from = new _svgObjects.PolyLinePoint(this.connectorPosition.x, this.connectorPosition.y);
            var to = new _svgObjects.PolyLinePoint(mousePosition.x, mousePosition.y);

            var points = new _svgObjects.PolyLinePoints([from, to]);

            this.svgObj.updatePoints(points);
        }

        /**
         * get the jQuery element for this helper wire
         * @return {jQuery.element}
         */

    }, {
        key: 'get',
        value: function get() {
            return this.svgObj.get();
        }
    }]);

    return HelperWire;
}(_NetworkElement3.default);

exports.default = HelperWire;

},{"../svgObjects":359,"./NetworkElement":348}],346:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Logic = require('../Logic');

var _Logic2 = _interopRequireDefault(_Logic);

var _Box2 = require('./Box');

var _Box3 = _interopRequireDefault(_Box2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module editorElements.InputBox */

/**
 * InputBox has only output connectors and is used to set the input states for the logic network.
 * @extends Box
 */
var InputBox = function (_Box) {
    _inherits(InputBox, _Box);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {Boolean} [isOn=false] the initial state of the inputbox (`true` is *on*, `false` is *off*)
     */
    function InputBox(parentSVG) {
        var isOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, InputBox);

        var gridWidth = 7;
        var gridHeight = 4;

        var _this = _possibleConstructorReturn(this, (InputBox.__proto__ || Object.getPrototypeOf(InputBox)).call(this, parentSVG, "input", "other", gridWidth, gridHeight));

        _this.addConnector(gridWidth, gridHeight / 2, false);

        _this.on = isOn;

        _this.generateBlockNodes();
        return _this;
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
                this.connectors[0].setState(_Logic2.default.state.on);
                this.refreshState();
            } else {
                // turn off
                this.changeImage();
                this.connectors[0].setState(_Logic2.default.state.off);
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
}(_Box3.default);

exports.default = InputBox;

},{"../Logic":338,"./Box":342}],347:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Connector2 = require('./Connector');

var _Connector3 = _interopRequireDefault(_Connector2);

var _Logic = require('../Logic');

var _Logic2 = _interopRequireDefault(_Logic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module editorElements.InputConnector */

/**
 * Connector that gets its state from a connected value and passes it through to the {@link Box} this connector belongs to.
 * @extends Connector
 */
var InputConnector = function (_Connector) {
  _inherits(InputConnector, _Connector);

  /**
   * Call the constructor from the parent {@link Connector} class and set isInputConnector to true.
   * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
   * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
   * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
   */
  function InputConnector(parentSVG, left, top) {
    _classCallCheck(this, InputConnector);

    var _this = _possibleConstructorReturn(this, (InputConnector.__proto__ || Object.getPrototypeOf(InputConnector)).call(this, parentSVG, left, top));

    _this.isInputConnector = true;
    return _this;
  }

  /**
   * Call the setState method of {@link Connector} and than refresh the state of the connected {@link Box}
   * @param {Logic.state} state new {@link Logic.state} of the connector
   */


  _createClass(InputConnector, [{
    key: 'setState',
    value: function setState(state) {
      _get(InputConnector.prototype.__proto__ || Object.getPrototypeOf(InputConnector.prototype), 'setState', this).call(this, state);
      // console.log("SET STATE ON IC", this.id, ":", state)

      var box = this.parentSVG.getBoxByConnectorId(this.svgObj.id);
      box.refreshState();
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
      this.setState(_Logic2.default.state.unknown);
    }
  }]);

  return InputConnector;
}(_Connector3.default);

exports.default = InputConnector;

},{"../Logic":338,"./Connector":343}],348:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module editorElements.NetworkElement */

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
    key: "onMouseDown",


    /**
     * empty callback function to prevent error messages, function is implemented later in the {@link Box} class
     */
    value: function onMouseDown() {}

    /**
     * empty function to prevent error messages, function is implemented later in the {@link Box} and {@link Connector} classes
     */

  }, {
    key: "onMouseUp",
    value: function onMouseUp() {}

    /**
     * empty function to prevent error messages, function is implemented later in the {@link Box} class
     */

  }, {
    key: "onMouseMove",
    value: function onMouseMove() {}

    /**
     * "virtual" getter for json data, prints an error that it has to be redefined in the derived classes
     */

  }, {
    key: "id",
    get: function get() {
      return this.svgObj.id;
    }
  }, {
    key: "exportData",
    get: function get() {
      console.error("'json' getter has not been defined for this element", this);
      return undefined;
    }
  }]);

  return NetworkElement;
}();

exports.default = NetworkElement;

},{}],349:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Logic = require('../Logic');

var _Logic2 = _interopRequireDefault(_Logic);

var _Box2 = require('./Box');

var _Box3 = _interopRequireDefault(_Box2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module editorElements.OutputBox */

/**
 * OutputBox has only input connectors and is used to visualize the output states of the logic network.
 * @extends Box
 */
var OutputBox = function (_Box) {
    _inherits(OutputBox, _Box);

    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     */
    function OutputBox(parentSVG) {
        _classCallCheck(this, OutputBox);

        var gridHeight = 4;
        var gridWidth = 5;

        var _this = _possibleConstructorReturn(this, (OutputBox.__proto__ || Object.getPrototypeOf(OutputBox)).call(this, parentSVG, "output", "other", gridWidth, gridHeight));

        _this.addConnector(0, gridHeight / 2, true);

        _this.generateBlockNodes();
        return _this;
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
            if (state === _Logic2.default.state.on) {
                if (this.parentSVG.tutorial) {
                    this.parentSVG.tutorial.onOutputBoxTrue();
                }
            }

            var stateMap = {};
            stateMap[_Logic2.default.state.on] = "on";
            stateMap[_Logic2.default.state.off] = "off";
            stateMap[_Logic2.default.state.unknown] = "";
            stateMap[_Logic2.default.state.oscillating] = "osc";

            this.changeImage(stateMap[state]);
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
}(_Box3.default);

exports.default = OutputBox;

},{"../Logic":338,"./Box":342}],350:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Connector2 = require('./Connector');

var _Connector3 = _interopRequireDefault(_Connector2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module editorElements.OutputConnector */

/**
 * Connector that takes a state defined by the {@link Box} it belongs to and passes it to all connected wire
 * @extends Connector
 */
var OutputConnector = function (_Connector) {
    _inherits(OutputConnector, _Connector);

    /**
     * Call the constructor from the parent {@link Connector} class and set isOutputConnector to true.
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    function OutputConnector(parentSVG, left, top) {
        _classCallCheck(this, OutputConnector);

        var _this = _possibleConstructorReturn(this, (OutputConnector.__proto__ || Object.getPrototypeOf(OutputConnector)).call(this, parentSVG, left, top));

        _this.isOutputConnector = true;
        return _this;
    }

    /**
     * Call the setState method of {@link Connector} and than set the state of the connected {@link Wire}s
     * @param {Logic.state} state new {@link Logic.state} of the connector
     */


    _createClass(OutputConnector, [{
        key: 'setState',
        value: function setState(state) {
            _get(OutputConnector.prototype.__proto__ || Object.getPrototypeOf(OutputConnector.prototype), 'setState', this).call(this, state);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.wireIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var wireId = _step.value;

                    this.parentSVG.getWireById(wireId).setState(state);
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
    }]);

    return OutputConnector;
}(_Connector3.default);

exports.default = OutputConnector;

},{"./Connector":343}],351:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module editorElements.Transform */

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
        key: "setName",
        value: function setName(name) {
            this.name = name;
        }

        /**
         * set arguments of this property
         * @param {array} args array of arguments
         */

    }, {
        key: "setArguments",
        value: function setArguments(args) {
            this.args = args;
        }

        /**
         * get string representation of the property
         * @return {string} property in the property format `name(arg1 arg2)`
         */

    }, {
        key: "get",
        value: function get() {
            return this.name + "(" + this.args.join(" ") + ")";
        }
    }]);

    return Property;
}();

/**
 * API for manipulating the transform argument used in SVG
 */


var Transform = function () {
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
        key: "toGridPixels",
        value: function toGridPixels(parentSVG) {
            this.pixelConversion(function (val) {
                return parentSVG.SVGToGrid(val);
            });
        }

        /**
         * convert distances from grid pixels to SVG pixels
         * @param  {Canvas} parentSVG instance of [Canvas](./module-Canvas.html)
         */

    }, {
        key: "toSVGPixels",
        value: function toSVGPixels(parentSVG) {
            this.pixelConversion(function (val) {
                return parentSVG.gridToSVG(val);
            });
        }

        /**
         * Convert distances using a specified convertor. Used by toGridPixels and toSVGPixels
         * @param  {Function} convertor function that converts int to int
         */

    }, {
        key: "pixelConversion",
        value: function pixelConversion(convertor) {
            var propertyMap = {
                "translate": function translate(item) {
                    item.args = item.args.map(function (arg) {
                        return convertor(arg);
                    });
                    return item;
                },
                "rotate": function rotate(item) {
                    item.args = [item.args[0], convertor(item.args[1]), convertor(item.args[2])];
                    return item;
                }
            };

            this.items = this.items.map(function (item) {
                return propertyMap[item.name] ? propertyMap[item.name](item) : item;
            });
        }

        /**
         * find a transform property by name and get its index in the [items](#items) array
         * @param  {string} name name of the property
         * @return {number}      index of the property in the array of properties or `-1` if not found
         */

    }, {
        key: "getIndex",
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
        key: "getTranslate",
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
        key: "getRotate",
        value: function getRotate() {
            var args = this.getArguments(this.getIndex("rotate"));

            return {
                deg: Number(args[0]),
                centerX: Number(args[1]),
                centerY: Number(args[2])
            };
        }

        /**
         * set translate to the specified values
         * @param {number} x horizontal translation
         * @param {number} y vertical translation
         */

    }, {
        key: "setTranslate",
        value: function setTranslate(x, y) {
            this.setParameter("translate", [x, y]);
        }

        /**
         * set rotate to the specified values
         * @param {number} deg     angle of the rotation in degrees
         * @param {number} centerX horizontal position of the center of the rotation
         * @param {number} centerY vertical position of the center of the rotation
         */

    }, {
        key: "setRotate",
        value: function setRotate(deg, centerX, centerY) {
            this.setParameter("rotate", [deg, centerX, centerY]);
        }

        /**
         * rotate by 90 degrees to the right or left, depending on the parameter `right`
         * @param {number} centerX horizontal position of the center of the rotation
         * @param {number} centerY vertical position of the center of the rotation
         * @param {boolean} right rotate to the right if `true`, to the left if `false`
         */

    }, {
        key: "rotateRightAngle",
        value: function rotateRightAngle(centerX, centerY, right) {
            var amount = right ? 90 : 270;

            if (this.getIndex("rotate") === -1) {
                this.setRotate(amount, centerX, centerY);
            } else {
                var newRotation = (parseInt(this.getRotate().deg) + amount) % 360;

                if (newRotation === 180) {
                    // swap center coordinates
                    // because rotate(c, x, y) is defined like transform(-x, -y) rotate(c) transform(x, y)
                    var a = centerX;
                    centerX = centerY;
                    centerY = a;
                }

                this.setRotate(newRotation, centerX, centerY);
            }
        }

        /**
         * rotate by 90 degrees to the right
         * @param  {number} centerX horizontal position of the center of the rotation
         * @param  {number} centerY vertical position of the center of the rotation
         */

    }, {
        key: "rotateRight",
        value: function rotateRight(centerX, centerY) {
            this.rotateRightAngle(centerX, centerY, true);
        }

        /**
         * rotate by 90 degrees to the left
         * @param  {number} centerX horizontal position of the center of the rotation
         * @param  {number} centerY vertical position of the center of the rotation
         */

    }, {
        key: "rotateLeft",
        value: function rotateLeft(centerX, centerY) {
            this.rotateRightAngle(centerX, centerY, false);
        }

        /**
         * get the transform values in a string
         * @return {string} string that can be used as a value for the transform property of a SVG element
         */

    }, {
        key: "get",
        value: function get() {
            var retVal = void 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    if (retVal) {
                        retVal += " " + item.get();
                    } else {
                        retVal = item.get();
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

            return retVal;
        }

        /**
         * get arguments of a property specified by index
         * @param  {number} index index of the property
         * @return {array}       array of arguments of the specified property
         */

    }, {
        key: "getArguments",
        value: function getArguments(index) {
            return this.items[index].args;
        }

        /**
         * set argumets of a property specified by name
         * @param {string} name name of the property
         * @param {array} args array of arguments of the specified property
         */

    }, {
        key: "setParameter",
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

exports.default = Transform;

},{}],352:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svgObjects = require('../svgObjects');

var _Logic = require('../Logic');

var _Logic2 = _interopRequireDefault(_Logic);

var _stateClasses = require('./stateClasses');

var _stateClasses2 = _interopRequireDefault(_stateClasses);

var _findPath = require('../findPath');

var _findPath2 = _interopRequireDefault(_findPath);

var _NetworkElement2 = require('./NetworkElement');

var _NetworkElement3 = _interopRequireDefault(_NetworkElement2);

var _WireAnchor = require('./WireAnchor');

var _WireAnchor2 = _interopRequireDefault(_WireAnchor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @module editorElements.Wire */

/**
 * Wire represents connection of two {@link Connector}s.
 * @extends NetworkElement
 */
var Wire = function (_NetworkElement) {
    _inherits(Wire, _NetworkElement);

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

        var _this = _possibleConstructorReturn(this, (Wire.__proto__ || Object.getPrototypeOf(Wire)).call(this, parentSVG));

        _this.gridSize = parentSVG.gridSize;

        /** TODO document */
        _this.anchors = [];

        _this.connection = {
            from: {
                id: fromId,
                box: _this.parentSVG.getBoxByConnectorId(fromId),
                connector: _this.parentSVG.getConnectorById(fromId)
            },
            to: {
                id: toId,
                box: _this.parentSVG.getBoxByConnectorId(toId),
                connector: _this.parentSVG.getConnectorById(toId)
            }
        };

        if (_this.connection.from.connector.isOutputConnector) {
            if (_this.connection.to.connector.isInputConnector) {
                // desired state
            } else {
                // connecting two output connectors
                throw "Can not place wire between two output connectors";
            }
        } else {
            if (_this.connection.to.connector.isInputConnector) {
                // connecting two input connectors
                throw "Can not place wire between two input connectors";
            } else {
                var _ref = [_this.connection.to, _this.connection.from];
                // swap them and we are ready to go

                _this.connection.from = _ref[0];
                _this.connection.to = _ref[1];
            }
        }

        if (route) {
            _this.routeWire(true, refresh);
        } else {
            _this.temporaryWire();
        }

        _this.elementState = _Logic2.default.state.unknown;

        _this.setState(_this.connection.from.connector.state);

        if (refresh) {
            var connector = _this.connection.to.connector;

            _this.parentSVG.startNewSimulation(connector, connector.state);
        }

        _this.svgObj.$el.addClass("wire");
        return _this;
    }

    _createClass(Wire, [{
        key: 'setState',


        /**
         * set the state of this wire to match the state of the input connector it is connected to
         * @param {Logic.state} state [description]
         */
        value: function setState(state) {
            var _svgObj;

            (_svgObj = this.svgObj).removeClasses.apply(_svgObj, _toConsumableArray(_stateClasses2.default));
            this.svgObj.addClass(_stateClasses2.default[state]);

            this.connection.to.connector.setState(state);

            this.elementState = state;

            // update states of all anchors as well
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.anchors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var anchor = _step.value;

                    anchor.setState(state);
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
         * get the current [Logic.state](./modules-Logic.html#.state) of this wire
         * @return {Logic.state}
         */

    }, {
        key: 'updateWireState',


        /**
         * update the state of this wire
         */
        value: function updateWireState() {
            // TODO investigate
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.boxes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var box = _step2.value;

                    box.refreshState();
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
         * get the jQuery element for this wire
         * @return {jQuery.element}
         */

    }, {
        key: 'get',
        value: function get() {
            return this.svgObj.get();
        }

        /**
         * get the PolyLine points for a temporary wire placement connecting the two connectors
         * @return {PolyLinePoints} new instance of {@link PolyLinePoints}
         */

    }, {
        key: 'getTemporaryWirePoints',
        value: function getTemporaryWirePoints() {
            var points = new _svgObjects.PolyLinePoints();
            points.append(new _svgObjects.PolyLinePoint(this.wireStart.x, this.wireStart.y));

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.anchors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var anchor = _step3.value;

                    points.append(new _svgObjects.PolyLinePoint(anchor.svgPosition.x, anchor.svgPosition.y));
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

            points.append(new _svgObjects.PolyLinePoint(this.wireEnd.x, this.wireEnd.y));
            return points;
        }

        /**
         * route the wire using the temporary wire points
         */

    }, {
        key: 'temporaryWire',
        value: function temporaryWire() {
            this.wireStart = this.parentSVG.getConnectorPosition(this.connection.from.connector, false);
            this.wireEnd = this.parentSVG.getConnectorPosition(this.connection.to.connector, false);

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

            this.wireStart = this.parentSVG.getConnectorPosition(this.connection.from.connector, snapToGrid);

            this.wireEnd = this.parentSVG.getConnectorPosition(this.connection.to.connector, snapToGrid);

            // todo clean up
            var points = this.findRoute({
                x: this.wireStart.x / this.gridSize,
                y: this.wireStart.y / this.gridSize
            }, {
                x: this.wireEnd.x / this.gridSize,
                y: this.wireEnd.y / this.gridSize
            });

            this.setWirePath(points);

            if (refresh) this.updateWireState();

            // regenerate inconvenient nodes
            this.generateInconvenientNodes();
        }

        /**
         * set the wire to follow the specified points
         * @param {PolyLinePoints} points instance of {@link PolyLinePoints}
         */

    }, {
        key: 'setWirePath',
        value: function setWirePath(points) {
            // set the line
            if (this.svgObj !== undefined) {
                // this.svgObj.updatePoints(points);
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.svgObj.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var child = _step4.value;

                        child.updatePoints(points);
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
            } else {
                this.svgObj = new _svgObjects.Group();

                var hitbox = new _svgObjects.PolyLine(points, 10, 'white');
                hitbox.addClass("hitbox");
                hitbox.addAttr({ opacity: 0 });
                this.svgObj.addChild(hitbox);

                var mainLine = new _svgObjects.PolyLine(points, 2);
                mainLine.addClass("main", "stateUnknown");
                this.svgObj.addChild(mainLine);
            }

            this.points = points;
        }
    }, {
        key: 'pathToPolyLine',
        value: function pathToPolyLine(path) {
            var totalPath = new _svgObjects.PolyLinePoints();
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = path[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var point = _step5.value;

                    totalPath.append(new _svgObjects.PolyLinePoint(point.x * this.gridSize, point.y * this.gridSize));
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

            return totalPath;
        }

        /**
         * find a nice route for the wire
         * @param  {Object} start object containing numeric attributes `x` and `y` that represent the first endpoint of the wire in grid pixel
         * @param  {Object} end   object containing numeric attributes `x` and `y` that represent the second endpoint of the wire in grid pixels
         * @return {PolyLinePoints}       [description]
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

            var routePoints = [start].concat(_toConsumableArray(this.anchors.map(function (_ref2) {
                var x = _ref2.x,
                    y = _ref2.y;
                return { x: x, y: y };
            })), [// strip all other data that x and y coordinates
            end]);

            // add start here because of the slice(1) below
            var path = [start];

            var prev = void 0;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = routePoints[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var routePoint = _step6.value;

                    if (prev) {
                        var _path;

                        // find the best path from 'prev' to 'routePoints'
                        var foundPath = (0, _findPath2.default)(prev, routePoint, nonRoutable, punishedButRoutable, this.gridSize);

                        // to avoid repetition of the joints, ignore the first point
                        (_path = path).push.apply(_path, _toConsumableArray(foundPath.slice(1)));
                    }
                    prev = routePoint;
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

            console.log(path);

            // let path = findPath(start, end, nonRoutable, punishedButRoutable, this.gridSize);

            if (path) {
                return this.pathToPolyLine(path);
            }

            // if a path was not found, try again but don't take into account the punished and non routable node
            path = (0, _findPath2.default)(start, end, new Set(), new Set(), this.gridSize);

            if (path) {
                return this.pathToPolyLine(path);
            }

            // if the path was still not found, give up and return temporary points
            return this.getTemporaryWirePoints();
        }

        /**
         * Generator that travels the path from the start to the end and each item
         * is a point with `x` and `y` coordinates in grid pixels
         * @return {Generator}
        */

    }, {
        key: 'pathTraveller',
        value: /*#__PURE__*/regeneratorRuntime.mark(function pathTraveller() {
            var prevPoint, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, point, x, y, from, to, _from, _to;

            return regeneratorRuntime.wrap(function pathTraveller$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            prevPoint = void 0;
                            _iteratorNormalCompletion7 = true;
                            _didIteratorError7 = false;
                            _iteratorError7 = undefined;
                            _context.prev = 4;
                            _iterator7 = this.points[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                                _context.next = 38;
                                break;
                            }

                            point = _step7.value;
                            x = this.parentSVG.SVGToGrid(point.x), y = this.parentSVG.SVGToGrid(point.y);

                            if (!(prevPoint === undefined)) {
                                _context.next = 12;
                                break;
                            }

                            _context.next = 34;
                            break;

                        case 12:
                            if (!(prevPoint.x === x)) {
                                _context.next = 23;
                                break;
                            }

                            // if the line is horizontal
                            from = Math.min(prevPoint.y, y);
                            to = Math.max(prevPoint.y, y);

                        case 15:
                            if (!(from <= to)) {
                                _context.next = 21;
                                break;
                            }

                            _context.next = 18;
                            return { x: x, y: from };

                        case 18:
                            from++;
                            _context.next = 15;
                            break;

                        case 21:
                            _context.next = 34;
                            break;

                        case 23:
                            if (!(prevPoint.y === y)) {
                                _context.next = 34;
                                break;
                            }

                            // if the line is vertical
                            _from = Math.min(prevPoint.x, x);
                            _to = Math.max(prevPoint.x, x);

                        case 26:
                            if (!(_from <= _to)) {
                                _context.next = 32;
                                break;
                            }

                            _context.next = 29;
                            return { x: _from, y: y };

                        case 29:
                            _from++;
                            _context.next = 26;
                            break;

                        case 32:
                            _context.next = 34;
                            break;

                        case 34:

                            // set new prevPoint
                            prevPoint = { x: x, y: y };

                        case 35:
                            _iteratorNormalCompletion7 = true;
                            _context.next = 6;
                            break;

                        case 38:
                            _context.next = 44;
                            break;

                        case 40:
                            _context.prev = 40;
                            _context.t0 = _context['catch'](4);
                            _didIteratorError7 = true;
                            _iteratorError7 = _context.t0;

                        case 44:
                            _context.prev = 44;
                            _context.prev = 45;

                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                _iterator7.return();
                            }

                        case 47:
                            _context.prev = 47;

                            if (!_didIteratorError7) {
                                _context.next = 50;
                                break;
                            }

                            throw _iteratorError7;

                        case 50:
                            return _context.finish(47);

                        case 51:
                            return _context.finish(44);

                        case 52:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, pathTraveller, this, [[4, 40, 44, 52], [45,, 47, 51]]);
        })

        /**
         * generate a set of nodes, that are inconvenient for wiring, but can be used, just are not preferred
         * @return {Set} set of nodes (objects containing x and y coordinates) that are not preferred for wiring
         */

    }, {
        key: 'generateInconvenientNodes',
        value: function generateInconvenientNodes() {
            this.inconvenientNodes = new Set();

            var pt = this.pathTraveller();
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = pt[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var point = _step8.value;

                    this.inconvenientNodes.add(point);
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
        }

        /**
         * add a new anchor at the specified position
         *
         * if there is already an anchor at this position, do nothing
         * @param {Object} anchor object with `x` and `y` in grid pixels
         */

    }, {
        key: 'addAnchor',
        value: function addAnchor(_ref3) {
            var x = _ref3.x,
                y = _ref3.y;

            // place the anchor to the right position in the array

            var newAnchor = new _WireAnchor2.default(this, x, y);

            // travel the path
            var pt = this.pathTraveller();
            var pointer = 0;
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = pt[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var point = _step9.value;

                    // get the current anchor that the pointer is pointing at
                    var currentAnchor = this.anchors[pointer];

                    // if the current anchor does not exist, that means that
                    // the pointer passed all current anchors, so the
                    // new anchor is the last anchor on this wire
                    if (!currentAnchor) {
                        this.anchors.push(newAnchor);
                        break;
                    }

                    // if the current anchor has the same coordinates as this point
                    // move the pointer to the next anchor
                    if (currentAnchor.x === point.x && currentAnchor.y === point.y) {
                        pointer++;

                        // this continue assures that there can be at most one
                        // anchor on one position. If the new anchor had the same
                        // coordinates as this one, it will be skipped
                        //
                        // but technically this should never happen because user
                        // should be not able to click on the wire at this
                        // position if there is already an anchor
                        continue;
                    }

                    // if the new anchor has the same coordinates as this point
                    // put it in the place of the pointer (the rest of the array is moved to the right)
                    if (newAnchor.x === point.x && newAnchor.y === point.y) {
                        this.anchors.splice(pointer, 0, newAnchor);
                        break;
                    }
                }

                // set the anchor class to the current wire state
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

            newAnchor.setState(this.state);

            this.parentSVG.appendElement(newAnchor);
        }

        /**
         * remove an anchor specified by its position
         * @param {Object} anchor object with `x` and `y` in grid pixels
         */

    }, {
        key: 'removeAnchor',
        value: function removeAnchor(anchor) {
            var x = anchor.x,
                y = anchor.y;

            var $el = anchor.svgObj.$el;

            // remove the anchor from the array
            this.anchors = this.anchors.filter(function (anchor) {
                return anchor.x !== x || anchor.y !== y;
            });

            // remove the anchor from the SVG
            $el.remove();

            // reroute the wire
            this.routeWire();
        }
    }, {
        key: 'anchorMoved',
        value: function anchorMoved() {
            this.temporaryWire();
        }
    }, {
        key: 'anchorDropped',
        value: function anchorDropped() {
            this.routeWire();
        }

        /** TODO document */

    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            // only left click counts
            if (event.which === 1) {
                // convert pixels in the event from CSS pixels to SVG pixels relative to the SVG document
                event = this.parentSVG.viewbox.transformEvent(event);

                var click = {
                    x: event.pageX,
                    y: event.pageY
                };

                for (var key in click) {
                    if (click.hasOwnProperty(key)) {
                        click[key] = this.parentSVG.snapToGrid(click[key]);
                        click[key] = this.parentSVG.SVGToGrid(click[key]);
                    }
                }

                this.addAnchor(click);
            }
        }
    }, {
        key: 'boxes',
        get: function get() {
            return [this.connection.from.box, this.connection.to.box];
        }
    }, {
        key: 'connectors',
        get: function get() {
            return [this.connection.from.connector, this.connection.to.connector];
        }

        /**
         * get data of this wire as a JSON-ready object
         * @return {Object} javascript object containing essential data for this wire
         */

    }, {
        key: 'exportData',
        get: function get() {
            return {
                fromId: this.connection.from.id,
                toId: this.connection.to.id
            };
        }
    }, {
        key: 'state',
        get: function get() {
            return this.elementState;
        }
    }]);

    return Wire;
}(_NetworkElement3.default);

exports.default = Wire;

},{"../Logic":338,"../findPath":355,"../svgObjects":359,"./NetworkElement":348,"./WireAnchor":353,"./stateClasses":354}],353:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NetworkElement2 = require('./NetworkElement');

var _NetworkElement3 = _interopRequireDefault(_NetworkElement2);

var _Transform = require('./Transform');

var _Transform2 = _interopRequireDefault(_Transform);

var _stateClasses = require('./stateClasses');

var _stateClasses2 = _interopRequireDefault(_stateClasses);

var _svgObjects = require('../svgObjects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Logic from '../Logic'

// import stateClasses from './stateClasses'

/** @module editorElements.WireAnchor */

/**
 * parent class for input and output connectors
 * @extends NetworkElement
 */
var WireAnchor = function (_NetworkElement) {
    _inherits(WireAnchor, _NetworkElement);

    /**
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} gridSize  size of the grid in SVG pixels
     * @param {number} x      horizontal position defined in grid pixels
     * @param {number} y       vertical position defined in grid pixels
     */
    function WireAnchor(parentWire, x, y) {
        _classCallCheck(this, WireAnchor);

        var _this = _possibleConstructorReturn(this, (WireAnchor.__proto__ || Object.getPrototypeOf(WireAnchor)).call(this, parentWire.parentSVG));

        _this.parentWire = parentWire;

        _this.x = x;
        _this.y = y;

        _this.anchorSize = 10;
        _this.anchorCenter = _this.anchorSize / 2;

        _this.svgPosition = {
            x: _this.parentSVG.gridToSVG(x),
            y: _this.parentSVG.gridToSVG(y)
        };

        _this.svgObj = new _svgObjects.Rectangle(0, 0, _this.anchorSize, _this.anchorSize, "none", "black");

        // move to the correct position
        _this.move(_this.svgPosition.x, _this.svgPosition.y);

        // rotate the anchor by 45 degrees
        var transform = new _Transform2.default(_this.svgObj.getAttr("transform"));
        transform.setRotate(45, _this.anchorCenter, _this.anchorCenter);
        _this.svgObj.addAttr({ transform: transform.get() });

        _this.svgObj.$el.addClass("wireAnchor");

        _this.mouseEvent;
        return _this;
    }

    _createClass(WireAnchor, [{
        key: 'move',
        value: function move(x, y) {
            var transform = new _Transform2.default(this.svgObj.getAttr("transform"));
            transform.setTranslate(x - this.anchorCenter, y - this.anchorCenter);
            this.svgObj.addAttr({ transform: transform.get() });

            this.svgPosition = { x: x, y: y };

            this.x = this.parentSVG.SVGToGrid(this.parentSVG.snapToGrid(x));
            this.y = this.parentSVG.SVGToGrid(this.parentSVG.snapToGrid(y));
        }
    }, {
        key: 'setState',
        value: function setState(state) {
            var _svgObj;

            (_svgObj = this.svgObj).removeClasses.apply(_svgObj, _toConsumableArray(_stateClasses2.default));
            this.svgObj.addClass(_stateClasses2.default[state]);
        }
    }, {
        key: 'get',
        value: function get() {
            return this.svgObj.$el;
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown() {
            this.mouseEvent = {
                moved: false
            };
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            this.mouseEvent.moved = true;

            event = this.parentSVG.viewbox.transformEvent(event);

            this.move(event.pageX, event.pageY);

            this.parentWire.anchorMoved();
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(event) {
            if (this.mouseEvent.moved) {
                event = this.parentSVG.viewbox.transformEvent(event);

                var x = this.parentSVG.snapToGrid(event.pageX);
                var y = this.parentSVG.snapToGrid(event.pageY);

                this.move(x, y);

                this.parentWire.anchorDropped();
            } else {
                // it was a click -- delete this anchor
                this.parentWire.removeAnchor(this);
            }

            this.mouseEvent = undefined;
        }
    }]);

    return WireAnchor;
}(_NetworkElement3.default);

exports.default = WireAnchor;

},{"../svgObjects":359,"./NetworkElement":348,"./Transform":351,"./stateClasses":354}],354:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Logic = require("../Logic");

var _Logic2 = _interopRequireDefault(_Logic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * mapping of logical states to css classes
 * @type {Object}
 */

var map = []; // array so we can use the ...spread operator

map[_Logic2.default.state.on] = "stateOn";
map[_Logic2.default.state.off] = "stateOff";
map[_Logic2.default.state.unknown] = "stateUnknown";
map[_Logic2.default.state.oscillating] = "stateOscillating";

exports.default = map;

},{"../Logic":338}],355:[function(require,module,exports){
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

},{"./other/helperFunctions":356,"./other/mapWithDefaultValue":358,"libstl":335}],356:[function(require,module,exports){
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

},{"json-stringify-pretty-compact":327}],357:[function(require,module,exports){
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

},{}],358:[function(require,module,exports){
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

},{}],359:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PolyLinePoint = require('./svgObjects/PolyLinePoint');

Object.defineProperty(exports, 'PolyLinePoint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PolyLinePoint).default;
  }
});

var _PolyLinePoints = require('./svgObjects/PolyLinePoints');

Object.defineProperty(exports, 'PolyLinePoints', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PolyLinePoints).default;
  }
});

var _Pattern = require('./svgObjects/Pattern');

Object.defineProperty(exports, 'Pattern', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Pattern).default;
  }
});

var _Group = require('./svgObjects/Group');

Object.defineProperty(exports, 'Group', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Group).default;
  }
});

var _Rectangle = require('./svgObjects/Rectangle');

Object.defineProperty(exports, 'Rectangle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Rectangle).default;
  }
});

var _SvgImage = require('./svgObjects/SvgImage');

Object.defineProperty(exports, 'SvgImage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SvgImage).default;
  }
});

var _PolyLine = require('./svgObjects/PolyLine');

Object.defineProperty(exports, 'PolyLine', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PolyLine).default;
  }
});

var _Text = require('./svgObjects/Text');

Object.defineProperty(exports, 'Text', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Text).default;
  }
});

var _MultiLineText = require('./svgObjects/MultiLineText');

Object.defineProperty(exports, 'MultiLineText', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MultiLineText).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./svgObjects/Group":360,"./svgObjects/MultiLineText":361,"./svgObjects/Pattern":362,"./svgObjects/PolyLine":363,"./svgObjects/PolyLinePoint":364,"./svgObjects/PolyLinePoints":365,"./svgObjects/Rectangle":366,"./svgObjects/SvgImage":368,"./svgObjects/Text":370}],360:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tag2 = require("./Tag");

var _Tag3 = _interopRequireDefault(_Tag2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module svgObjects.Group */

/**
 * SVG group, used for grouping elements, for example a gate is represented by many elements (rectangle, image, inivisible hitbox rectangle...),
 * but all of the elements need to be transformed together. Using groups the transform property can be set on the group which contains all the elements.
 * @extends Tag
 */
var Group = function (_Tag) {
    _inherits(Group, _Tag);

    function Group() {
        _classCallCheck(this, Group);

        var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, "g"));

        _this.children = [];
        return _this;
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
}(_Tag3.default);

exports.default = Group;

},{"./Tag":369}],361:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Tag2 = require('./Tag');

var _Tag3 = _interopRequireDefault(_Tag2);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module svgObjects.MultiLineText */

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
var MultiLineText = function (_Tag) {
    _inherits(MultiLineText, _Tag);

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

        var _this = _possibleConstructorReturn(this, (MultiLineText.__proto__ || Object.getPrototypeOf(MultiLineText)).call(this, "switch"));

        var foreignObject = new _Tag3.default("foreignObject");
        var alternativeText = new _Text2.default(x, y, w, h, text, size, color);

        foreignObject.addAttr({
            x: x,
            y: y,
            width: w,
            height: h
        });

        var $wrapper = $("<div>").attr("xmlns", "http://www.w3.org/1999/xhtml").addClass("multilinetext").css("height", h);

        var $paragraph = $("<p>").attr("xmlns", "http://www.w3.org/1999/xhtml").css("font-size", size).append(text);

        $wrapper.append($paragraph);
        foreignObject.$el.append($wrapper);

        _this.$el.append(foreignObject.$el).append(alternativeText.$el);
        return _this;
    }

    return MultiLineText;
}(_Tag3.default);

exports.default = MultiLineText;

},{"./Tag":369,"./Text":370}],362:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tag2 = require("./Tag");

var _Tag3 = _interopRequireDefault(_Tag2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module svgObjects.Pattern */

/**
 * pattern object in SVG
 * @extends Tag
 */
var Pattern = function (_Tag) {
    _inherits(Pattern, _Tag);

    /**
     * @param {string} id     unique id of this pattern
     * @param {number} width  width of one pattern tile in SVG pixels
     * @param {number} height height of one pattern tile in SVG pixels
     */
    function Pattern(id, width, height) {
        _classCallCheck(this, Pattern);

        var _this = _possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).call(this, "pattern"));

        _this.addAttr({
            id: id,
            x: 0,
            y: 0,
            width: width,
            height: height,
            patternUnits: "userSpaceOnUse",
            viewBox: "0 0 " + width + " " + height
        });
        return _this;
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
}(_Tag3.default);

exports.default = Pattern;

},{"./Tag":369}],363:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tag2 = require("./Tag");

var _Tag3 = _interopRequireDefault(_Tag2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module svgObjects.PolyLine */

/**
 * SVG PolyLine (a path defined by sequence of points on plane)
 * @extends Tag
 */
var PolyLine = function (_Tag) {
    _inherits(PolyLine, _Tag);

    /**
     * @param {PolyLinePoints} points points describing this PolyLine
     * @param {number} [strokeWidth] width of the stroke for this PolyLine in SVG pixels
     * @param {string} [color] CSS color of this PolyLine
     */
    function PolyLine(points, strokeWidth, color) {
        _classCallCheck(this, PolyLine);

        var _this = _possibleConstructorReturn(this, (PolyLine.__proto__ || Object.getPrototypeOf(PolyLine)).call(this, "PolyLine"));

        var attributes = {
            points: points.string,
            fill: "none",
            "stroke-width": strokeWidth
        };

        if (color !== undefined) {
            attributes.stroke = color;
        }

        _this.addAttr(attributes);
        return _this;
    }

    /**
     * update points of this PolyLine
     * @param {PolyLinePoints} points new set of points describing this PolyLine
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
}(_Tag3.default);

exports.default = PolyLine;

},{"./Tag":369}],364:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module svgObjects.PolyLinePoint */

/**
 * one point of {@link PolyLinePoints}, used in the {@link PolyLine} object
 */
var PolyLinePoint = function () {
    /**
     * @param {number} x horizontal coordinate of the PolyLine point
     * @param {number} y vertical coordinate of the PolyLine point
     */
    function PolyLinePoint(x, y) {
        _classCallCheck(this, PolyLinePoint);

        this.x = 0;
        this.y = 0;
        if (x !== undefined && y !== undefined) {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * change the coordinates of this point
     * @param {number} x horizontal coordinate of the PolyLine point
     * @param {number} y vertical coordinate of the PolyLine point
     */


    _createClass(PolyLinePoint, [{
        key: "set",
        value: function set(x, y) {
            this.x = x;
            this.y = y;
        }

        /**
         * create PolyLine from a comma separated string (e.g. from a string formatted like this: "x,y", for example "15,8")
         * @param  {string} string string in the format "x,y" representing a point in the SVG PolyLine
         * @return {PolyLinePoint} newly created instance of {@link PolyLinePoint}
         */

    }, {
        key: "string",


        /**
         * return a string representation of this PolyLine point
         * @return {string} string in the format "x,y"
         */
        get: function get() {
            return this.x + "," + this.y;
        }

        /**
         * compare PolyLine points, return `true` if they are equal, else return `false`
         * @param  {PolyLinePoint} a
         * @param  {PolyLinePoint} b
         * @return {boolean}
         */

    }], [{
        key: "parseFromString",
        value: function parseFromString(string) {
            var arr = string.split(",");
            return new PolyLinePoint(arr[0], arr[1]);
        }
    }, {
        key: "equals",
        value: function equals(a, b) {
            return a.x === b.x && a.y === b.y;
        }
    }]);

    return PolyLinePoint;
}();

exports.default = PolyLinePoint;

},{}],365:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PolyLinePoint = require("./PolyLinePoint");

var _PolyLinePoint2 = _interopRequireDefault(_PolyLinePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module svgObjects.PolyLinePoints */

/**
 * array-like structure used in {@link PolyLinePoints}
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

        /**
         * make the array iterable
         * @type {Number}
         */

    }, {
        key: Symbol.iterator,
        value: function value() {
            var index = -1;
            var data = this.arr;

            return {
                next: function next() {
                    return {
                        value: data[++index],
                        done: !(index in data)
                    };
                }
            };
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


var PolyLinePoints = function (_SmartArray) {
    _inherits(PolyLinePoints, _SmartArray);

    /**
     * @param {Array} [arr] array containing instances of {@link PolyLinePoint}
     */
    function PolyLinePoints(arr) {
        _classCallCheck(this, PolyLinePoints);

        return _possibleConstructorReturn(this, (PolyLinePoints.__proto__ || Object.getPrototypeOf(PolyLinePoints)).call(this, arr));
    }

    /**
     * get a deep copy of this object
     * @return {PolyLinePoints}
     */


    _createClass(PolyLinePoints, [{
        key: "copy",
        value: function copy() {
            return new PolyLinePoints($.extend(true, [], this.arr));
        }

        /**
         * append a point
         * @param  {PolyLinePoint} point a new point
         */

    }, {
        key: "append",
        value: function append(point) {
            // call inherited function to handle the appending
            _get(PolyLinePoints.prototype.__proto__ || Object.getPrototypeOf(PolyLinePoints.prototype), "append", this).call(this, point);

            // if the second to last point is unnecessary, remove it
            var length = this.length;
            if (length >= 3 && (this.getItem(length - 3).x === this.getItem(length - 2).x && this.getItem(length - 2).x === this.getItem(length - 1).x || this.getItem(length - 3).y === this.getItem(length - 2).y && this.getItem(length - 2).y === this.getItem(length - 1).y)) {
                this.remove(length - 2);
            }

            // return this element (to allow chaining)
            return this;
        }

        /**
         * parse PolyLine from string
         * @param  {string} string string in the PolyLine format (`x1,y1 x2,y2, x3,y3`)
         * @return {PolyLinePoints} a new instance of {@link PolyLinePoints} created by parsing the string
         */

    }, {
        key: "forEach",


        /**
         * wrapper for foreach on the PolyLine points
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
         * get a string representation of this PolyLine
         * @return {string} string in the PolyLine format (`x1,y1 x2,y2, x3,y3`)
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
            var points = new PolyLinePoints();

            for (var i = 0; i < pointStrings.length; ++i) {
                points.append(_PolyLinePoint2.default.parseFromString(pointStrings[i]));
            }

            return points;
        }
    }]);

    return PolyLinePoints;
}(SmartArray);

exports.default = PolyLinePoints;

},{"./PolyLinePoint":364}],366:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SvgElement2 = require('./SvgElement');

var _SvgElement3 = _interopRequireDefault(_SvgElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module svgObjects.Rectangle */

/**
 * a rectangle in SVG
 * @extends SvgElement
 */
var Rectangle = function (_SvgElement) {
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

        var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, x, y, w, h, "rect"));

        _this.addAttr({
            fill: fill,
            stroke: stroke,
            'stroke-width': 0.5,
            'pointer-events': 'all' // to trigger hover even with transparent background
        });
        return _this;
    }

    return Rectangle;
}(_SvgElement3.default);

exports.default = Rectangle;

},{"./SvgElement":367}],367:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Tag2 = require('./Tag');

var _Tag3 = _interopRequireDefault(_Tag2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module svgObjects.SvgElement */

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
}(_Tag3.default);

exports.default = SvgElement;

},{"./Tag":369}],368:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SvgElement2 = require("./SvgElement");

var _SvgElement3 = _interopRequireDefault(_SvgElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module svgObjects.SvgImage */

/**
 * an image in SVG
 * @extends SvgElement
 */
var SvgImage = function (_SvgElement) {
    _inherits(SvgImage, _SvgElement);

    function SvgImage(x, y, w, h, url) {
        _classCallCheck(this, SvgImage);

        var _this = _possibleConstructorReturn(this, (SvgImage.__proto__ || Object.getPrototypeOf(SvgImage)).call(this, x, y, w, h, "image"));

        _this.addAttr({
            "xlink:href": url
        });
        return _this;
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
}(_SvgElement3.default);

exports.default = SvgImage;

},{"./SvgElement":367}],369:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _id = require("../other/id");

var _id2 = _interopRequireDefault(_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module svgObjects.Tag */

/**
 * Parent class for all svgObjects
 */
var Tag = function () {
  /**
   * @param {string} tagName SVG tag identifier (`rect`, `image`, `PolyLine`)
   */
  function Tag(tagName) {
    _classCallCheck(this, Tag);

    /**
     * SVG tag identifier (`rect`, `image`, `PolyLine`)
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
      this.checkIfElementExistsInDOM();

      this.$el.addClass(name);
    }

    /**
     * remove class names from this element
     * @param  {string} classes class names to be removed
     */

  }, {
    key: "removeClasses",
    value: function removeClasses() {
      this.checkIfElementExistsInDOM();

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

exports.default = Tag;

},{"../other/id":357}],370:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Tag2 = require("./Tag");

var _Tag3 = _interopRequireDefault(_Tag2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module svgObjects.Text */

/**
 * Text element in SVG
 * @extends Tag
 */
var Text = function (_Tag) {
    _inherits(Text, _Tag);

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

        var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, "text"));

        _this.addAttr({
            x: x,
            y: y,
            width: w,
            height: h,
            fill: color
        });

        if (size) {
            _this.addAttr({
                'font-size': size
            });
        }

        _this.$el.append(text);
        return _this;
    }

    return Text;
}(_Tag3.default);

exports.default = Text;

},{"./Tag":369}],371:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _networkLibrary = require('./networkLibrary');

var _editorElements = require('../editorElements');

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
        key: 'addClass',


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
        key: 'appendItem',
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
        key: 'parentSVG',
        get: function get() {
            return this.contextMenu.parentSVG;
        }

        /**
         * number of items in the submenu
         * @return {Number}
         */

    }, {
        key: 'length',
        get: function get() {
            return this.itemCount;
        }
    }, {
        key: 'jQuery',
        get: function get() {
            return this.$el;
        }
    }, {
        key: 'jQuerySubmenu',
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

        return _this3 = _possibleConstructorReturn(this, (GateMenuItem.__proto__ || Object.getPrototypeOf(GateMenuItem)).call(this, type.toUpperCase() + ' gate', contextMenu, function () {
            _this3.parentSVG.newGate(type, _this3.parentSVG.snapToGrid(_this3.parentSVG.viewbox.transformX(contextMenu.position.x)), _this3.parentSVG.snapToGrid(_this3.parentSVG.viewbox.transformY(contextMenu.position.y)));
        }));
    }

    return GateMenuItem;
}(ContextMenuItem);

/**
 * Menu item that has a custom click callback function that adds a specified {@link Blackbox} to the [Canvas](./module-Canvas.html)
 * @extends ContextMenuItem
 */


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

                // use the name specified in the blackbox item, if it does not exist, use the name for the network

                var usedName = blackbox.name || name;

                _this4.parentSVG.newBlackbox(inputs, outputs, table, usedName, _this4.parentSVG.snapToGrid(_this4.parentSVG.viewbox.transformX(contextMenu.position.x)), _this4.parentSVG.snapToGrid(_this4.parentSVG.viewbox.transformY(contextMenu.position.y)));
            }).catch(function (error) {
                console.error(error);
            });
        }));
    }

    return BlackboxMenuItem;
}(ContextMenuItem);

/**
 * Menu item that has a custom click callback function that adds a specified Network to the [Canvas](./module-Canvas.html)
 * @extends ContextMenuItem
 */


var NetworkMenuItem = function (_ContextMenuItem3) {
    _inherits(NetworkMenuItem, _ContextMenuItem3);

    function NetworkMenuItem(name, file, contextMenu) {
        var _this5;

        _classCallCheck(this, NetworkMenuItem);

        return _this5 = _possibleConstructorReturn(this, (NetworkMenuItem.__proto__ || Object.getPrototypeOf(NetworkMenuItem)).call(this, name, contextMenu, function () {
            (0, _networkLibrary.getNetworkFromLibrary)(file).then(function (data) {
                _this5.parentSVG.importData(data, Math.round(_this5.parentSVG.viewbox.transformX(contextMenu.position.x) / _this5.parentSVG.gridSize), Math.round(_this5.parentSVG.viewbox.transformY(contextMenu.position.y) / _this5.parentSVG.gridSize)).then(function (warnings) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = warnings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var warning = _step.value;

                            _this5.parentSVG.messages.newWarningMessage(warning);
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
                });
            }).catch(function (error) {
                _this5.parentSVG.messages.newErrorMessage(error);
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

        this.appendItem(special);

        // list of gates that can be added
        var gates = _editorElements.Gate.validGates;
        var gateList = new ContextMenuItem("New gate", this, parentSVG);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = gates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var name = _step2.value;

                gateList.appendItem(new GateMenuItem(name, this));
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

        this.appendItem(gateList);

        // more options will be added in the getLibrary() callback below
        var networkList = new ContextMenuItem("Add a network", this);
        networkList.appendItem(new ContextMenuItem("Paste a network", this, function () {
            _this6.displayImportDialog();
        }));
        this.appendItem(networkList); // always append

        var blackboxList = new ContextMenuItem("Add a blackbox", this); // appends only if contains items (see the callback)

        // network import (blackbox, network)
        (0, _networkLibrary.getLibrary)().then(function (networks) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {

                for (var _iterator3 = networks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _ref2 = _step3.value;
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
        key: 'appendItem',


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
        key: 'appendConditionalItem',
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
        key: 'displayImportDialog',
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
                var data = void 0;

                try {
                    data = JSON.parse($('#' + textareaId).val());
                } catch (e) {
                    _this7.parentSVG.messages.newErrorMessage("The imported file is not a valid JSON file.");
                    lityInstance.close();
                }

                if (data) {
                    // proccess the imported data
                    _this7.parentSVG.importData(data, Math.round(_this7.parentSVG.viewbox.transformX(_this7.position.x) / _this7.parentSVG.gridSize), Math.round(_this7.parentSVG.viewbox.transformY(_this7.position.y) / _this7.parentSVG.gridSize)).then(function (warnings) {
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = warnings[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var warning = _step4.value;

                                _this7.parentSVG.messages.newWarningMessage(warning);
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
                    }).finally(function () {
                        lityInstance.close();
                    });
                }
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
        key: 'resolveConditionalItems',
        value: function resolveConditionalItems($target) {
            var _this8 = this;

            var _loop = function _loop(item) {
                if ($target.hasClass(item.itemClass)) {
                    _this8.appendItem(new ContextMenuItem(item.text, _this8, function () {
                        item.clickFunction($target.attr('id'));
                    })).addClass('conditional');
                }
            };

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.conditionalItems[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var item = _step5.value;

                    _loop(item);
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

        /**
         * hide all conditional items
         */

    }, {
        key: 'hideAllConditionalItems',
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
        key: 'display',
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
        key: 'hide',
        value: function hide() {
            this.$el.css({ display: 'none' });
            $(".subList").css({ display: 'none' });
            this.hideAllConditionalItems();
        }
    }, {
        key: 'length',
        get: function get() {
            return this.itemCount;
        }
    }]);

    return ContextMenu;
}();

exports.default = ContextMenu;

},{"../editorElements":340,"./networkLibrary":376}],372:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helperFunctions = require("../other/helperFunctions");

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

},{"../other/helperFunctions":356}],373:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module Messages */

/**
 * a generic message that can be displayed in the {@link Messages} box
 */
var Message = function () {
    /**
     * @param {string} text               text of the message
     * @param {Function} [onHide] a function that will be called when the `hide()` method is called
     */
    function Message(text, onHide) {
        _classCallCheck(this, Message);

        this.$el = $("<div>").addClass("message").text(text);

        /**
         * callback function that will be called when the `hide()` method is called
         * @type {Function}
         */
        this.onHide = onHide;
    }

    /**
     * hide the message (and call the onHide callback if there is any)
     */


    _createClass(Message, [{
        key: "hide",
        value: function hide() {
            this.$el.remove();

            if (this.onHide) {
                this.onHide();
            }
        }
    }]);

    return Message;
}();

/**
 * a loading message that can be displayed in the {@link Messages} box
 * @extends Message
 */


var LoadingMessage = function (_Message) {
    _inherits(LoadingMessage, _Message);

    function LoadingMessage(text) {
        var onHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        _classCallCheck(this, LoadingMessage);

        var _this = _possibleConstructorReturn(this, (LoadingMessage.__proto__ || Object.getPrototypeOf(LoadingMessage)).call(this, text, onHide));

        _this.$el.addClass("loading");
        return _this;
    }

    return LoadingMessage;
}(Message);

/**
 * a message that has a close button and that can be displayed in the {@link Messages} box
 * @extends Message
 */


var ClosableMessage = function (_Message2) {
    _inherits(ClosableMessage, _Message2);

    function ClosableMessage(text) {
        var onHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        _classCallCheck(this, ClosableMessage);

        var _this2 = _possibleConstructorReturn(this, (ClosableMessage.__proto__ || Object.getPrototypeOf(ClosableMessage)).call(this, text, onHide));

        _this2.$el.append($("<span>").addClass("close").click(function () {
            _this2.hide();
        }));
        return _this2;
    }

    return ClosableMessage;
}(Message);

/**
 * an error message that can be displayed in the {@link Messages} box
 * @extends ClosableMessage
 */


var ErrorMessage = function (_ClosableMessage) {
    _inherits(ErrorMessage, _ClosableMessage);

    function ErrorMessage(text) {
        var onHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        _classCallCheck(this, ErrorMessage);

        var _this3 = _possibleConstructorReturn(this, (ErrorMessage.__proto__ || Object.getPrototypeOf(ErrorMessage)).call(this, text, onHide));

        _this3.$el.addClass("error");
        return _this3;
    }

    return ErrorMessage;
}(ClosableMessage);

/**
 * a warning message that can be displayed in the {@link Messages} box
 * @extends ClosableMessage
 */


var WarningMessage = function (_ClosableMessage2) {
    _inherits(WarningMessage, _ClosableMessage2);

    function WarningMessage(text) {
        var onHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        _classCallCheck(this, WarningMessage);

        var _this4 = _possibleConstructorReturn(this, (WarningMessage.__proto__ || Object.getPrototypeOf(WarningMessage)).call(this, text, onHide));

        _this4.$el.addClass("warning");
        return _this4;
    }

    return WarningMessage;
}(ClosableMessage);

/**
 * display messages to the user in a nice UI
 */


var Messages = function () {
    function Messages() {
        _classCallCheck(this, Messages);

        /**
         * jQuery element that represents the message interface. This element contains all the currently displayed messages.
         * @type {jQuery.element}
         */
        this.$el = $("<div>").addClass('messages');

        /**
         * number of currently displayed messages, has a specified setter and getter
         * @type {number}
         */
        this.count = 0;

        // place the progress info element
        $('body').append(this.$el);
    }

    /**
     * get the number of currently displayed messages
     * @return {number} [description]
     */


    _createClass(Messages, [{
        key: "hide",


        /**
         * hide the message box by adding a `hidden` class to the element
         */
        value: function hide() {
            this.$el.addClass('hidden');
        }

        /**
         * display the message box by removing the `hidden` class to the element
         */

    }, {
        key: "display",
        value: function display() {
            this.$el.removeClass('hidden');
        }

        /**
         * add a new message to the message box
         * @param  {string} text             text of the message
         * @param  {Message} [constr=Message] constructor of the message, must be a derivate of the {@link Message} class
         * @return {Message}                  the newly constructed message (instance made by the specified constructor)
         */

    }, {
        key: "newMessage",
        value: function newMessage(text) {
            var _this5 = this;

            var constr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Message;

            // Create the message by calling the constructor,
            // provide it with text and a callback function that will be called when hiding the message.
            // This callback subtracts 1 from the
            var message = new constr(text, function () {
                _this5.count--;
            });

            this.$el.append(message.$el);
            this.count++;

            return message;
        }

        /**
         * create a new loading message and add it to the message box
         * @param  {string} text text of the message
         * @return {LoadingMessage} the newly constructed {@link LoadingMessage}
         */

    }, {
        key: "newLoadingMessage",
        value: function newLoadingMessage(text) {
            return this.newMessage(text, LoadingMessage);
        }

        /**
         * create a new error message and add it to the message box
         * @param  {string} text text of the message
         * @return {ErrorMessage} the newly constructed {@link ErrorMessage}
         */

    }, {
        key: "newErrorMessage",
        value: function newErrorMessage(text) {
            return this.newMessage(text, ErrorMessage);
        }

        /**
         * create a new warning message and add it to the message box
         * @param  {string} text text of the message
         * @return {WarningMessage} the newly constructed {@link WarningMessage}
         */

    }, {
        key: "newWarningMessage",
        value: function newWarningMessage(text) {
            return this.newMessage(text, WarningMessage);
        }
    }, {
        key: "count",
        get: function get() {
            return this.messageCount;
        }

        /**
         * Set the number of currently displayed messages. Should be called only through functions that add messages.
         *
         * If the message count is >= 1, the jQuery element for the UI is displayed, if the message count is <1, the UI is hidden.
         * @param  {number} value [description]
         * @return {number}       [description]
         */
        ,
        set: function set(value) {
            this.messageCount = value;

            if (this.messageCount < 1) {
                this.hide();
            } else {
                this.display();
            }
        }
    }]);

    return Messages;
}();

exports.default = Messages;

},{}],374:[function(require,module,exports){
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
            };
        }

        /**
         * _tutorial step_: zoom the canvas
         */

    }, {
        key: "stepZoomCanvas",
        value: function stepZoomCanvas() {
            var _this6 = this;

            this.windowContent("You can also zoom in and out using the mouse wheel\n            or with the <code>+</code>&nbsp;and <code>\u2212</code>&nbsp;keys.");

            this.onCanvasZoomed = function () {
                _this6.next();
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
                moveRotateCallback();
            };

            this.onBoxRotated = function () {
                boxRotated = true;
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

                this.$topButtonsLeft = $("<div>").addClass("left");

                this.$tutorialWindow.append($("<div>").addClass("topButtons").append(this.$topButtonsLeft).append( // the .right div can be added here because it is not modified during the tutorial
                $("<div>").addClass("right").append($("<a>").attr({
                    href: "#",
                    title: "close tutorial"
                }).addClass("button close").click(function () {
                    _this12.stop();
                }))));

                this.$tutorialWindow.append(this.$topButtons);

                this.$tutorialContent = $("<div>").addClass("content");
                this.$tutorialWindow.append(this.$tutorialContent);
            }

            this.$topButtonsLeft.html("");

            var $prev = $("<a>").attr({
                href: "#",
                title: "go back"
            }).addClass("button prev");

            if (this.step > 1) {
                $prev.click(function () {
                    _this12.prev();
                });
            } else {
                $prev.addClass("disabled");
            }

            var $next = $("<a>").attr({
                href: "#",
                title: "go forward"
            }).addClass("button next");

            if (this.step < this.steps.length - 1) {
                $next.click(function () {
                    _this12.next();
                });
            } else {
                $next.addClass("disabled");
            }

            this.$topButtonsLeft.append($prev).append($next);

            // set the text content

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

                // // render the buttons in each step (to remove focus and to
                // // ensure there is no "back" button on the first step or "next" button on the last step)
                // if(this.$prevNext) {
                //     this.$prevNext.remove();
                // }
                //
                // this.$prevNext = $("<div>").addClass("bottomButtons");
                //
                // if(this.step>1) {
                //     this.$prevNext.append(
                //         $("<a>").attr("href", "#").addClass("button prev")
                //         // .text("back")
                //         .click(() => {
                //             this.step--;
                //         })
                //     )
                // }
                //
                // if(this.step < this.steps.length - 1) {
                //     this.$prevNext.append(
                //         $("<a>").attr("href", "#").addClass("button next")
                //         // .text("next")
                //         .click(() => {
                //             this.next();
                //         })
                //     )
                // }
                //
                // this.$tutorialWindow.append(this.$prevNext);
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
         * go to the previous step of the tutorial
         */

    }, {
        key: "prev",
        value: function prev() {
            this.step--;
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
            // reset all hooks
            this.resetHooks();

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

},{}],375:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module ViewBox */
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
   * update the dimensions of the viewbox (used on window resize)
   * @param  {Number} width  new width of the viewbox in SVG pixels
   * @param  {Number} height new height of the viewbox in SVG pixels
   */


  _createClass(ViewBox, [{
    key: "newDimensions",
    value: function newDimensions(width, height) {
      // keep the viewbox centered
      this.real.left += (this.real.width - width) / 2;
      this.real.top += (this.real.height - height) / 2;

      // update the dimensions
      this.real.width = width;
      this.real.height = height;
    }

    /**
     * get the amount of zoom on the viewbox
     * @return {number}
     */

  }, {
    key: "transformX",


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
    key: "transformY",
    value: function transformY(y) {
      return this.top + y / this.zoom;
    }

    /**
     * transform pageX and pageY parameters of the jquery event to match the zoom and shift of the viewbox
     * @param  {jquery.MouseEvent} event original event
     * @return {jquery.MouseEvent}       the same event but with transformed pageX and pageY members
     */

  }, {
    key: "transformEvent",
    value: function transformEvent(event) {
      event.pageX = this.transformX(event.pageX);
      event.pageY = this.transformY(event.pageY);

      return event;
    }
  }, {
    key: "zoom",
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
    key: "width",
    get: function get() {
      return this.real.width / this.zoom;
    }

    /**
     * get the height of the viewbox with the current zoom applied
     * @return {number} the final height of the viewbox
     */

  }, {
    key: "height",
    get: function get() {
      return this.real.height / this.zoom;
    }

    /**
     * get the horizontal distance from the y axis of the document with zoom and shift value applied
     * @return {number}
     */

  }, {
    key: "left",
    get: function get() {
      return this.real.left - this.leftShift / this.zoom + (this.real.width - this.width) / 2;
    }

    /**
     * get the vertical distance from the x axis of the document with zoom and shift value applied
     * @return {number}
     */

  }, {
    key: "top",
    get: function get() {
      return this.real.top - this.topShift / this.zoom + (this.real.height - this.height) / 2;
    }

    /**
     * get the computed viewbox values as a string in the correct format that can be used in the viewBox attribute of the SVG element
     * @return {string} string in format "left top width height"
     */

  }, {
    key: "str",
    get: function get() {
      return this.left + " " + this.top + " " + this.width + " " + this.height;
    }
  }]);

  return ViewBox;
}();

exports.default = ViewBox;

},{}],376:[function(require,module,exports){
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

},{}]},{},[336])

//# sourceMappingURL=main.js.map
