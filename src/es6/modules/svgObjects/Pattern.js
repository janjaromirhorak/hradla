import Tag from './Tag';

/** @module svgObjects.Pattern */

/**
 * pattern object in SVG
 * @extends Tag
 */
export default class Pattern extends Tag {
    /**
     * @param {string} id     unique id of this pattern
     * @param {number} width  width of one pattern tile in SVG pixels
     * @param {number} height height of one pattern tile in SVG pixels
     */
    constructor(id, width, height) {
        super('pattern');

        this.addAttr({
            id: id,
            x: 0,
            y: 0,
            width: width,
            height: height,
            patternUnits: 'userSpaceOnUse',
            viewBox: '0 0 ' + width + ' ' + height
        });
    }

    /**
     * add a child to this pattern
     *
     * pattern behaves a little like {@link Group} - it contains child elements, which represent the content of one tile of the pattern
     * and the whole package of the child elements is repeated on each tile of the pattern
     * @param {SvgElement} el element that will be added to the pattern
     */
    addChild(el) {
        this.$el.append(el.$el);
        return el;
    }
}
