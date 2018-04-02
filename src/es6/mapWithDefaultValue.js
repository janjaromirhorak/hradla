/** @module MapWithDefaultValue */
/**
 * Map that has a default value specified in the constructor.
 *
 * For the complete documentation of the Map see [Map in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 *
 * _Note: This version is written specially for ES6 compiled into ES5. In non-compiled ES6 is the implementation far simpler:_
 *
 * ```JavaScript
 export class MapWithDefaultValue extends Map {
     constructor(defaultValue) {
         super();

         this.default = defaultValue;
     }

     get(key) {
         if(this.has(key)) {
             return super.get(key);
         } else {
             return this.default;
         }
     }
 }```
 */
export default class MapWithDefaultValue {
    /**
     * @param defaultValue the value that will be returned on get(key) when the key is not found in the map
     */
    constructor(defaultValue) {
        this.map = new Map();
        this.default = defaultValue;
    }

    get size() {
        return this.map.size;
    }

    clear() {
        return this.map.clear();
    }

    forEach(...args) {
        return this.map.forEach(...args);
    }

    get(key) {
        return this.map.get(key);
    }

    delete(key) {
        return this.map.delete(key);
    }

    set(key, value) {
        return this.map.set(key, value);
    }

    has(key) {
        return this.map.has(key);
    }

    entries() {
        return this.map.entries();
    }

    keys() {
        return this.map.keys();
    }

    values() {
        return this.map.values();
    }
}
