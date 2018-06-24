import Connector from './Connector'

/** @module editorElements.OutputConnector */

/**
 * Connector that takes a state defined by the {@link Box} it belongs to and passes it to all connected wire
 * @extends Connector
 */
export default class OutputConnector extends Connector {
    /**
     * Call the constructor from the parent {@link Connector} class and set isOutputConnector to true.
     * @param {App} appInstance link to the [App](./module-App.html) instance that this connector will belong to
     * @param {number} left      horizontal position defined in grid units (SVG pixels divided by the grid size)
     * @param {number} top       vertical position defined in grid units (SVG pixels divided by the grid size)
     */
    constructor(appInstance, left, top) {
        super(appInstance, left, top);

        this.isOutputConnector = true;
    }

    /**
     * Call the setState method of {@link Connector} and than set the state of the connected {@link Wire}s
     * @param {Logic.state} state new {@link Logic.state} of the connector
     */
    setState(state) {
        super.setState(state);

        for (const wireId of this.wireIds) {
            this.appInstance.getWireById(wireId).setState(state);
        }
    }
}
