import Tag from './Tag'

/** @module svgObjects.Group */

/**
 * SVG group, used for grouping elements, for example a gate is represented by many elements (rectangle, image, inivisible hitbox rectangle...),
 * but all of the elements need to be transformed together. Using groups the transform property can be set on the group which contains all the elements.
 * @extends Tag
 */
export default class Group extends Tag {
    constructor() {
        super("g");

        this.children = [];
    }

    /**
     * add an element to the group
     * @param {SvgElement} el an instance of {@link SvgElement}
     */
    addChild(el) {
        this.children.push(el);

        this.$el.append(el.$el);
        return el; // pro jednodussi "let rect = g.addChild(new Rectangle(..."
    }
}
