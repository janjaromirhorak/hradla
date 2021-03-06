import Connector from './Connector';
import Logic from '../Logic';

/** @module editorElements.InputConnector */

/**
 * Connector that gets its state from a connected value and passes it through to the {@link Box} this connector belongs to.
 * @extends Connector
 */
export default class InputConnector extends Connector {
    /**
     * Call the constructor from the parent {@link Connector} class and set isInputConnector to true.
     * @param {App} appInstance link to the [App](./module-App.html) instance that this connector will belong to
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    constructor(appInstance, left, top) {
        super(appInstance, left, top);

        this.isInputConnector = true;
    }

    /**
     * Call the setState method of {@link Connector} and than refresh the state of the connected {@link Box}
     * @param {Logic.state} state new {@link Logic.state} of the connector
     */
    setState(state) {
        super.setState(state);
        // console.log("SET STATE ON IC", this.id, ":", state)

        let box = this.appInstance.getBoxByConnectorId(this.svgObj.id);
        box.refreshState();
    }

    /**
     * remove the wire (by calling the removeWireIdAndUpdate of {@link Connector})
     * and update state of this connector by setting it to undefined using the setState method
     * @param  {string} wireId ID of the {@link Wire}
     */
    removeWireIdAndUpdate(wireId) {
        super.removeWireIdAndUpdate(wireId);
        this.setState(Logic.state.unknown);
    }
}
