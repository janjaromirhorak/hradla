/** @module editorElements.NetworkElement */

/**
 * parent class for all network elements
 */
export default class NetworkElement {
    /**
     * Basic constructor for NetworkElement
     * @param {App} appInstance reference to the instance of [App](./module-App.html) that this element belongs to
     */
    constructor(appInstance) {
        if(!appInstance) {
            console.error("Parent SVG element has to be defined.");
        }
        this.appInstance = appInstance;

        // used to store the svjObject's instance of this element
        this.svgObj = undefined;
    }

    /**
     * Get the unique ID of the SVG element tied to this logical element
     * @return {string} ID of the SVG element
     */
    get id() {
        return this.svgObj.id;
    }

    /**
     * empty callback function to prevent error messages, function is implemented later in the {@link Box} class
     */
    onMouseDown() {}

    /**
     * empty function to prevent error messages, function is implemented later in the {@link Box} and {@link Connector} classes
     */
    onMouseUp() {}

    /**
     * empty function to prevent error messages, function is implemented later in the {@link Box} class
     */
    onMouseMove() {}

    /**
     * "virtual" getter for json data, prints an error that it has to be redefined in the derived classes
     */
    get exportData() {
        console.error("'json' getter has not been defined for this element", this);
        return undefined;
    }
}
