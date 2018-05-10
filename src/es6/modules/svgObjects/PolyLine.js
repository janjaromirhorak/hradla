import Tag from './Tag'

/** @module svgObjects.PolyLine */

/**
 * SVG PolyLine (a path defined by sequence of points on plane)
 * @extends Tag
 */
export default class PolyLine extends Tag {
    /**
     * @param {PolyLinePoints} points points describing this PolyLine
     * @param {number} [strokeWidth] width of the stroke for this PolyLine in SVG pixels
     * @param {string} [color] CSS color of this PolyLine
     */
    constructor(points, strokeWidth, color) {
        super("PolyLine");

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
     * update points of this PolyLine
     * @param {PolyLinePoints} points new set of points describing this PolyLine
     */
    updatePoints(points) {
        this.addAttr({
            points: points.string
        });
    }
}
