import NetworkElement from './NetworkElement';
import * as svgObj from '../svgObjects'
import Logic from '../Logic'

import stateClasses from './stateClasses'

/**
 * parent class for input and output connectors
 * @extends NetworkElement
 */
export default class Connector extends NetworkElement {
    /**
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} gridSize  size of the grid in SVG pixels
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    constructor(parentSVG, left, top) {
        super(parentSVG);

        /**
         * size of the grid in SVG pixels
         * @type {number}
         */
        this.gridSize = parentSVG.gridSize;
        /**
         * size of the connector in SVG pixels
         * @type {number}
         */
        this.connectorSize = parentSVG.gridSize;
        /**
         * offset of the connector from the grid in SVG pixels
         * @type {number}
         */
        this.connectorOffset = this.connectorSize / 2;

        /**
         * instance of {@link svgObjects.svgObj} that holds all SVG information about this connector
         * @type {svgObj}
         */
        this.svgObj = new svgObj.Rectangle(
            left * this.gridSize - this.connectorOffset,
            top * this.gridSize - this.connectorOffset,
            this.connectorSize,
            this.connectorSize,
            "none",
            "black"
        );

        this.svgObj.$el.addClass("connector");

        /**
         * this flag describes whether this connector is an input connector
         * @type {Boolean}
         */
        this.isInputConnector = false;

        /**
         * current logical state of this connector
         * @type {Logic.state}
         */
        this.elementState = Logic.state.unknown;
        this.svgObj.addClass(stateClasses.unknown);

        /**
         * set of ids of all wires connected to this connector
         * @type {Set}
         */
        this.wireIds = new Set();
    }

    /**
     * whether this connector is an output connector
     * @return {Boolean}
     */
    get isOutputConnector() {
        return !this.isInputConnector;
    }

    /**
     * whether this connector is an output connector
     * @return {Boolean}
     */
    set isOutputConnector(value) {
        this.isInputConnector = !value;
    }

    /**
     * add a wire id to the list of wire ids
     * @param {string} wireId
     */
    addWireId(wireId) {
        this.wireIds.add(wireId);
    }

    /**
     * remove a wire id from the list of wire ids
     * @param {string} wireId
     */
    removeWireId(wireId) {
        this.wireIds.delete(wireId);
    }

    /**
     * remove a wire specified by ID and update the connector
     * @param  {string} wireId ID of the wire to be removed
     */
    removeWireIdAndUpdate(wireId) {
        this.removeWireId(wireId);
    }

    /**
     * set logical state of the connector
     * @param {Logic.state} state new state of the connector
     */
    setState(state) {
        this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);

        switch (state) {
            case Logic.state.unknown:
                this.svgObj.addClass(stateClasses.unknown);
                break;
            case Logic.state.on:
                this.svgObj.addClass(stateClasses.on);
                break;
            case Logic.state.off:
                this.svgObj.addClass(stateClasses.off);
                break;
            case Logic.state.oscillating:
                this.svgObj.addClass(stateClasses.oscillating);
                break;
        }

        this.elementState = state;
    }

    /**
     * get state of this connector
     * @return {Logic.state}
     */
    get state() {
        return this.elementState;
    }

    /**
     * get svgObj instance content of this connector
     * @return {svgObjects.Rectangle}
     */
    get() {
        return this.svgObj;
    }

    /**
     * call [wireCreationHelper](./module-Canvas.html#wireCreationHelper) on mouse up
     */
    onMouseUp(event) {
        // only left click counts
        if(event.which === 1) {
            event = this.parentSVG.viewbox.transformEvent(event);

            const mousePosition = {
                x: event.pageX,
                y: event.pageY
            }

            this.parentSVG.wireCreationHelper(this.svgObj.id, mousePosition);
        }
    }
}
