import SvgElement from './SvgElement'

/**
 * an image in SVG
 * @extends SvgElement
 */
export default class SvgImage extends SvgElement {
    constructor(x, y, w, h, url) {
        super(x, y, w, h, "image");
        this.addAttr({
            "xlink:href": url
        });
    }

    /**
     * change url of the image
     * @param {string} url the new url of the image
     */
    changeUrl(url) {
        this.addAttr({
            "xlink:href": url
        });
    }
}
