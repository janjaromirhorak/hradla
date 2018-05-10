import {PolyLine, PolyLinePoints, PolyLinePoint} from '../svgObjects'

import NetworkElement from './NetworkElement'

/** @module editorElements.HelperWire */

/**
 * A temporary wire that is connecting a {@link Connector} with a mouse pointer when user creates a wire.
 * @extends NetworkElement
 */
export default class HelperWire extends NetworkElement {
    constructor(parentSVG, fromId, mousePosition) {
        super(parentSVG);

        const connector = this.parentSVG.getConnectorById(fromId);
        this.connectorPosition = this.parentSVG.getConnectorPosition(connector, true);

        const from = new PolyLinePoint(this.connectorPosition.x, this.connectorPosition.y);
        const to = new PolyLinePoint(mousePosition.x, mousePosition.y);

        const points = new PolyLinePoints([from, to]);

        this.svgObj = new PolyLine(points, 2, "#8b8b8b");
    }

    updateMousePosition(mousePosition) {
        const from = new PolyLinePoint(this.connectorPosition.x, this.connectorPosition.y);
        const to = new PolyLinePoint(mousePosition.x, mousePosition.y);

        const points = new PolyLinePoints([from, to]);

        this.svgObj.updatePoints(points);
    }

    /**
     * get the jQuery element for this helper wire
     * @return {jQuery.element}
     */
    get() {
        return this.svgObj.get();
    }
}
