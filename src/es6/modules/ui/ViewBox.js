/** @module ViewBox */
/**
 * ViewBox provides an api for oprerating with the viewBox argument of the <svg> DOM element.
 */
export default class ViewBox {
    /**
     * Initialize viewBox
     * @param {number} left   distance of the left edge of the viewbox from document's y axis in SVG pixels
     * @param {number} top    distance of the top edge of the viewbox from the document's x axis in SVG pixels
     * @param {number} width  width of the viewbox in SVG pixels
     * @param {number} height height of the viewbox in SVG pixels
     */
    constructor(left, top, width, height) {
        /**
         * ViewBox attributes before applying zoom and shift
         * @type {object}
         */
        this.real = { left, top, width, height }

        /**
         * The maximum amount of zoom on the viewbox
         * @type {number}
         */
        this.maxZoom = 8;
        /**
         * The minimum amount of zoom on the viewbox
         * @type {number}
         */
        this.minZoom = 0.1;

        /**
         * Amount of zoom on the viewbox, always between this.minZoom and this.maxZoom
         * @type {number}
         */
        this.realZoom = 1

        /**
         * amount of horizontal shift of the document
         * @type {number}
         */
        this.leftShift = 0
        /**
         * amount of vertical shift of the document
         * @type {number}
         */
        this.topShift = 0
    }

    /**
     * update the dimensions of the viewbox (used on window resize)
     * @param  {Number} width  new width of the viewbox in SVG pixels
     * @param  {Number} height new height of the viewbox in SVG pixels
     */
    newDimensions(width, height) {
        // keep the viewbox centered
        this.real.left += (this.real.width - width)/2
        this.real.top += (this.real.height - height)/2

        // update the dimensions
        this.real.width = width;
        this.real.height = height;
    }

    /**
     * apply viewbox movement and take the zoom into account
     * @param  {number} left horizontal movement
     * @param  {number} top  vertical movement
     */
    move(left, top) {
        this.leftShift += left / this.zoom;
        this.topShift += top / this.zoom;
    }

    /**
     * get the amount of zoom on the viewbox
     * @return {number}
     */
    get zoom() {
        return this.realZoom;
    }

    /**
     * set the amount of zoom on the viewbox
     * @param {number} value the new amount of zoom
     */
    set zoom(value) {
        // fit this.realZoom to fit between this.minZoom and this.maxZoom
        this.realZoom = Math.max(Math.min(value, this.maxZoom), this.minZoom);
    }

    /**
     * get the width of the viewbox with the current zoom applied
     * @return {number} the final width of the viewbox
     */
    get width() {
        return this.real.width / this.zoom
    }

    /**
     * get the height of the viewbox with the current zoom applied
     * @return {number} the final height of the viewbox
     */
    get height() {
        return this.real.height / this.zoom
    }

    /**
     * get the horizontal distance from the y axis of the document with zoom and shift value applied
     * @return {number}
     */
    get left() {
        return this.real.left - this.leftShift + ((this.real.width - this.width) / 2)
    }

    /**
     * get the vertical distance from the x axis of the document with zoom and shift value applied
     * @return {number}
     */
    get top() {
        return this.real.top - this.topShift + ((this.real.height - this.height) / 2)
    }

    /**
     * get the computed viewbox values as a string in the correct format that can be used in the viewBox attribute of the SVG element
     * @return {string} string in format "left top width height"
     */
    get str() {
        return `${this.left} ${this.top} ${this.width} ${this.height}`
    }

    /**
     * transform horizontal units to the scale and shift of the editor
     * @param  {number} x original horizontal value
     * @return {number}   transformed horizontal value
     */
    transformX(x) {
        return this.left + (x / this.zoom)
    }

    /**
     * transform vertical units to the scale and shift of the editor
     * @param  {number} y original vertical value
     * @return {number}   transformed vertical value
     */
    transformY(y) {
        return this.top + (y / this.zoom)
    }

    /**
     * transform pageX and pageY parameters of the jquery event to match the zoom and shift of the viewbox
     * @param  {jquery.MouseEvent} event original event
     * @return {jquery.MouseEvent}       the same event but with transformed pageX and pageY members
     */
    transformEvent(event) {
        event.pageX = this.transformX(event.pageX)
        event.pageY = this.transformY(event.pageY)

        return event
    }
}
