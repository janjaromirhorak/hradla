/** @module svgObjects.PolylinePoint */

/**
 * one point of {@link PolylinePoints}, used in the {@link PolyLine} object
 */
export default class PolylinePoint {
    /**
     * @param {number} x horizontal coordinate of the polyline point
     * @param {number} y vertical coordinate of the polyline point
     */
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        if(x !== undefined && y !== undefined) {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * change the coordinates of this point
     * @param {number} x horizontal coordinate of the polyline point
     * @param {number} y vertical coordinate of the polyline point
     */
    set(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * create polyline from a comma separated string (e.g. from a string formatted like this: "x,y", for example "15,8")
     * @param  {string} string string in the format "x,y" representing a point in the SVG polyline
     * @return {PolylinePoint} newly created instance of {@link PolylinePoint}
     */
    static parseFromString(string) {
        let arr = string.split(",");
        return new PolylinePoint(arr[0], arr[1]);
    }

    /**
     * return a string representation of this polyline point
     * @return {string} string in the format "x,y"
     */
    get string() {
        return this.x + "," + this.y;
    }

    /**
     * compare polyline points, return `true` if they are equal, else return `false`
     * @param  {PolylinePoint} a
     * @param  {PolylinePoint} b
     * @return {boolean}
     */
    static equals(a, b) {
        return a.x === b.x && a.y === b.y;
    }
}
