import PolylinePoint from './PolylinePoint'

/** @module svgObjects.PolylinePoints */

/**
 * array-like structure used in {@link PolylinePoints}
 */
class SmartArray {
    /**
     * @param {Array} [arr] if set, initialized SmartArray will contain these values
     */
    constructor(arr) {
        if(arr !== undefined) {
            this.arr = arr;
        } else {
            this.arr = [];
        }
    }

    /**
     * get a deep copy of this array
     * @return {SmartArray}
     */
    copy() {
        return SmartArray($.extend(true, [], this.arr));
    }

    /**
     * append an item to the array
     * @param item new item that will be appended to the array
     */
    append(item) {
        return this.addWithIndex(item, this.arr.length);
    }

    /**
     * prepend an item to the array
     * @param item new item that will be prepended to the array
     */
    prepend(item) {
        return this.addWithIndex(item, 0);
    }

    /**
     * add a new item at the specified index, move all following items
     * @param item new item that will be added at the specified index
     * @param {number} index index of this item
     */
    addWithIndex(item, index) {
        for(let i = this.arr.length ; i > index ; --i) {
            this.arr[i] = this.arr[i-1];
        }
        this.arr[index] = item;
        return this; // to enable chaining of append / preppend / addWithIndex commands
    }

    /**
     * get length of the array
     * @return {number}
     */
    get length() {
        return this.arr.length;
    }

    /**
     * get item by index
     * @param  {number} index index of the item
     * @return contents of the array on the specified index
     */
    getItem(index) {
        return this.arr[index];
    }

    /**
     * @return last element of the array
     */
    get last() {
        if(this.length!==0) {
            return this.arr[this.length - 1];
        } else {
            return false;
        }
    }

    /**
     * @return first element of the array
     */
    get first() {
        if(this.length!==0) {
            return this.arr[0];
        } else {
            return false;
        }
    }

    /**
     * remove an item from the array by index
     * @param  {number} index index of the item that will be removed
     */
    remove(index) {
        let length = this.length;

        for(let i = index ; i < length ; ++i) {
            this.arr[i] = this.arr[i + 1];
        }
        this.arr.pop();
    }
}

/**
 * points of the {@link PolyLine}
 * @extends SmartArray
 */
export default class PolylinePoints extends SmartArray {
    /**
     * @param {Array} [arr] array containing instances of {@link PolylinePoint}
     */
    constructor(arr) {
        super(arr);
    }

    /**
     * get a deep copy of this object
     * @return {PolylinePoints}
     */
    copy() {
        return new PolylinePoints($.extend(true, [], this.arr));
    }

    /**
     * append a point
     * @param  {PolylinePoint} point a new point
     */
    append(point) {
        // call inherited function to handle the appending
        super.append(point);

        // if the second to last point is unnecessary, remove it
        let length = this.length;
        if ( length >= 3
                && (    ( this.getItem(length - 3).x === this.getItem(length - 2).x &&
                          this.getItem(length - 2).x === this.getItem(length - 1).x )
                     || ( this.getItem(length - 3).y === this.getItem(length - 2).y &&
                          this.getItem(length - 2).y === this.getItem(length - 1).y )
                   )
           )
        {
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
    static parseFromString(string) {
        let pointStrings = string.split(" ");
        let points = new PolylinePoints();

        for(let i = 0 ; i < pointStrings.length ; ++i) {
            points.append(PolylinePoint.parseFromString(pointStrings[i]));
        }

        return points;
    }

    /**
     * get a string representation of this polyline
     * @return {string} string in the polyline format (`x1,y1 x2,y2, x3,y3`)
     */
    get string() {
        let string = "";
        for(let i = 0 ; i < this.length ; ++i) {
            if(i !== 0) {
                string += " ";
            }
            string += this.arr[i].string;
        }
        return string;
    }

    /**
     * wrapper for foreach on the polyline points
     * @param  {Function} func function that will be called on each element
     */
    forEach(func) {
        for(let i = 0 ; i < this.arr.length ; ++i) {
            func(this.arr[i]);
        }
    }
}
