import NetworkElement from './NetworkElement';
import Transform from './Transform'
import stateClasses from './stateClasses';

import {Rectangle} from '../svgObjects'
// import Logic from '../Logic'

// import stateClasses from './stateClasses'

/** @module editorElements.WireAnchor */

/**
 * parent class for input and output connectors
 * @extends NetworkElement
 */
export default class WireAnchor extends NetworkElement {
    /**
     * @param {Canvas} parentSVG link to the {@link Canvas} instance that this connector will belong to
     * @param {number} gridSize  size of the grid in SVG pixels
     * @param {number} x      horizontal position defined in grid pixels
     * @param {number} y       vertical position defined in grid pixels
     */
    constructor(parentWire, x, y) {
        super(parentWire.parentSVG);

        this.parentWire = parentWire;

        this.x = x;
        this.y = y;

        this.anchorSize = 10;
        this.anchorCenter = this.anchorSize / 2;

        this.svgPosition = {
            x: this.parentSVG.gridToSVG(x),
            y: this.parentSVG.gridToSVG(y)
        }

        this.svgObj = new Rectangle(
            0,
            0,
            this.anchorSize,
            this.anchorSize,
            "none",
            "black"
        );

        // move to the correct position
        this.move(this.svgPosition.x, this.svgPosition.y);

        // rotate the anchor by 45 degrees
        let transform = new Transform(this.svgObj.getAttr("transform"));
        transform.setRotate(
            45,
            this.anchorCenter,
            this.anchorCenter
        );
        this.svgObj.addAttr({transform: transform.get()});

        this.svgObj.$el.addClass("wireAnchor");

        this.mouseEvent;
    }

    move(x, y) {
        let transform = new Transform(this.svgObj.getAttr("transform"));
        transform.setTranslate(x - this.anchorCenter, y - this.anchorCenter)
        this.svgObj.addAttr({transform: transform.get()})

        this.svgPosition = { x, y }

        this.x = this.parentSVG.SVGToGrid(this.parentSVG.snapToGrid(x));
        this.y = this.parentSVG.SVGToGrid(this.parentSVG.snapToGrid(y));
    }

    setState(state) {
        this.svgObj.removeClasses(...stateClasses);
        this.svgObj.addClass(stateClasses[state]);
    }

    get() {
        return this.svgObj.$el;
    }

    onMouseDown() {
        this.mouseEvent = {
            moved:false
        }
    }

    onMouseMove(event) {
        this.mouseEvent.moved = true;

        event = this.parentSVG.viewbox.transformEvent(event);

        this.move(event.pageX, event.pageY)

        this.parentWire.anchorMoved()
    }

    onMouseUp(event) {
        if(this.mouseEvent.moved) {
            event = this.parentSVG.viewbox.transformEvent(event);

            const x = this.parentSVG.snapToGrid(event.pageX)
            const y = this.parentSVG.snapToGrid(event.pageY)

            this.move(x, y);

            this.parentWire.anchorDropped()
        } else {
            // it was a click -- delete this anchor
            this.parentWire.removeAnchor(this);
        }

        this.mouseEvent = undefined;
    }
}
