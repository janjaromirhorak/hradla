import Tag from './Tag'
import Text from './Text'

/**
 * Multi line text element in SVG
 *
 * Multi line text is not natively supportend in SVG 1.1,
 * the workaround is to use the <foreignObject> element and display
 * a HTML paragraph inside of the SVG document.
 *
 * Because this technique is not supported by all of the browsers,
 * the foreignObject element is wrapped in <switch>, which
 * provides fallback for those cases.
 *
 * read more: [foreignObject on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject)
 *
 * @extends Tag
 */
export default class MultiLineText extends Tag {
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
    constructor(x, y, w, h, text, size, color = "black") {
        super("switch");

        let foreignObject = new Tag("foreignObject");
        let alternativeText = new Text(x, y, w, h, text, size, color);

        foreignObject.addAttr({
            x,
            y,
            width: w,
            height: h
        });

        let $wrapper = $("<div>")
            .attr("xmlns", "http://www.w3.org/1999/xhtml")
            .addClass("multilinetext")
            .css("height", h);

        let $paragraph = $("<p>")
            .attr("xmlns", "http://www.w3.org/1999/xhtml")
            .css("font-size", size)
            .append(text);

        $wrapper.append($paragraph);
        foreignObject.$el.append($wrapper)

        this.$el.append(
            foreignObject.$el
        ).append(
            alternativeText.$el
        )
    }
}
