/** @module svgObjects.PolyLinePoint */

/**
 * one point of {@link PolyLinePoints}, used in the {@link PolyLine} object
 */
export default class PolyLinePoint {
    /**
     * @param {number} x horizontal coordinate of the PolyLine point
     * @param {number} y vertical coordinate of the PolyLine point
     */
    constructor(x, y) {
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
    set(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * create PolyLine from a comma separated string (e.g. from a string formatted like this: "x,y", for example "15,8")
     * @param  {string} string string in the format "x,y" representing a point in the SVG PolyLine
     * @return {PolyLinePoint} newly created instance of {@link PolyLinePoint}
     */
    static parseFromString(string) {
        let arr = string.split(',');
        return new PolyLinePoint(arr[0], arr[1]);
    }

    /**
     * return a string representation of this PolyLine point
     * @return {string} string in the format "x,y"
     */
    get string() {
        return this.x + ',' + this.y;
    }

    /**
     * compare PolyLine points, return `true` if they are equal, else return `false`
     * @param  {PolyLinePoint} a
     * @param  {PolyLinePoint} b
     * @return {boolean}
     */
    static equals(a, b) {
        return a.x === b.x && a.y === b.y;
    }
}
