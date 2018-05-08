import Tag from './Tag'

/**
 * represents visible element in SVG that has position and dimensions (for example `rectangle` is a SvgElement, but `pattern` is not, even though both are tags)
 * @extends Tag
 */
export default class SvgElement extends Tag {
    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width in SVG pixels
     * @param {number} h       height in SVG pixels
     * @param {string} tagName tag name of the element
     */
    constructor(x, y, w, h, tagName) {
        super(tagName);

        this.addAttr({
            x: x,
            y: y,
            width: w,
            height: h
        });
    }
}
