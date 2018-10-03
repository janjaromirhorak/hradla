import Tag from './Tag';

/** @module svgObjects.Text */

/**
 * Text element in SVG
 * @extends Tag
 */
export default class Text extends Tag {
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
    constructor(x, y, w, h, text, size, color = 'black') {
        super('text');
        this.addAttr({
            x: x,
            y: y,
            width: w,
            height: h,
            fill: color
        });

        if (size) {
            this.addAttr({
                'font-size': size
            });
        }

        this.$el.append(text);
    }
}
