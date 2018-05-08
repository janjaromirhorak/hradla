import Tag from './Tag'

/**
 * SVG polyline (a path defined by sequence of points on plane)
 * @extends Tag
 */
export default class PolyLine extends Tag {
    /**
     * @param {PolylinePoints} points points describing this polyline
     * @param {number} [strokeWidth] width of the stroke for this polyline in SVG pixels
     * @param {string} [color] CSS color of this polyline
     */
    constructor(points, strokeWidth, color) {
        super("polyline");

        let attributes = {
            points: points.string,
            fill: "none",
            "stroke-width": strokeWidth
        };

        if(color!==undefined) {
            attributes.stroke = color
        }

        this.addAttr(attributes);
    }

    /**
     * update points of this polyline
     * @param {PolylinePoints} points new set of points describing this polyline
     */
    updatePoints(points) {
        this.addAttr({
            points: points.string
        });
    }
}
