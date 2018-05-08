import Logic from '../Logic'

import Box from './Box'

/**
 * OutputBox has only input connectors and is used to visualize the output states of the logic network.
 * @extends Box
 */
export default class OutputBox extends Box {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     */
    constructor(parentSVG) {
        const gridHeight = 4;
        const gridWidth = 5;

        super(parentSVG, "output", "other", gridWidth, gridHeight);

        this.addConnector(0, gridHeight / 2, true);

        this.generateBlockNodes();
    }

    /**
     * set state of this output box to match the state of its input connector
     */
    refreshState() {
        this.setState(this.connectors[0].state);
    }

    /**
     * Reflect the input connector state in the appearance of the element - set
     * the element image to represent the corresponding state
     * @param {Logic.state} state new state of this outputBox
     */
    setState(state) {
        switch (state) {
            case Logic.state.on:
                this.changeImage("on");

                // if tutorial exists, call tutorial callback
                if(this.parentSVG.tutorial) {
                    this.parentSVG.tutorial.onOutputBoxTrue();
                }
                break;
            case Logic.state.off:
                this.changeImage("off");
                break;
            case Logic.state.unknown:
                this.changeImage();
                break;
            case Logic.state.oscillating:
                this.changeImage("osc");
                break;
        }
    }

    generateBlockNodes() {
        // block the input connector node
        const specialNode = {
            x: 0,
            y: this.gridHeight / 2
        }
        super.generateBlockNodes(0, 0, 0, 1, specialNode);
    }
}
