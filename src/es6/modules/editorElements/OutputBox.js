import Logic from '../Logic';

import Box from './Box';

/** @module editorElements.OutputBox */

/**
 * OutputBox has only input connectors and is used to visualize the output states of the logic network.
 * @extends Box
 */
export default class OutputBox extends Box {
    /**
     * @param {App} appInstance  instance of [App](./module-App.html)
     */
    constructor(appInstance) {
        const gridHeight = 4;
        const gridWidth = 5;

        super(appInstance, 'output', 'other', gridWidth, gridHeight);

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
        if (state === Logic.state.on) {
            if (this.appInstance.tutorial) {
                this.appInstance.tutorial.onOutputBoxTrue();
            }
        }

        let stateMap = {};
        stateMap[Logic.state.on] = 'on';
        stateMap[Logic.state.off] = 'off';
        stateMap[Logic.state.unknown] = '';
        stateMap[Logic.state.oscillating] = 'osc';

        this.changeImage(stateMap[state]);
    }

    generateBlockNodes() {
        // block the input connector node
        const specialNode = {
            x: 0,
            y: this.gridHeight / 2
        };
        super.generateBlockNodes(0, 0, 0, 1, specialNode);
    }
}
