import SvgElement from './SvgElement'

/**
 * a rectangle in SVG
 * @extends SvgElement
 */
export default class Rectangle extends SvgElement {
    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width in SVG pixels
     * @param {number} h       height in SVG pixels
     * @param {string} fill    filling color of the rectangle
     * @param {string} stroke  stroke color of the rectangle
     */
    constructor(x, y, w, h, fill, stroke) {
        super(x, y, w, h, "rect");
        this.addAttr({
            fill: fill,
            stroke: stroke,
            'stroke-width': 0.5,
            'pointer-events': 'all' // to trigger hover even with transparent background
        });
    }
}
