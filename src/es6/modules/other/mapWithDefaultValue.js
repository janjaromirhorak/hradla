/** @module MapWithDefaultValue */
/**
 * Map that has a default value specified in the constructor.
 *
 * For the complete documentation of the Map see [Map in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 *
 * Usage:
 * ```JavaScript
 let myMap = new MapWithDefaultValue(Infinity);
 const value = myMap.getWithDefault(key)
 ```
 *
 * _Note: This version is written specially for ES6 compiled into ES5. In non-compiled ES6 is the implementation far more elegant:_
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
 * @class MapWithDefaultValue
 * @param defaultValue {any} default value that will be returned when the requested key is not found in the map
 */
export default function(defaultValue) {
    let map = new Map();
    /**
     * @param  {any} key key of a requested item
     * @return {any} value of the item with the corresponding key, or defaultValue if the key is not found in the map
     */
    map.getWithDefault = key => {
        return map.has(key) ? map.get(key) : defaultValue;
    };
    return map;
}
