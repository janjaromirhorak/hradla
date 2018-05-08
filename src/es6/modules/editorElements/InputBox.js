import Logic from '../Logic'

import Box from './Box'

/** @module editorElements.InputBox */

/**
 * InputBox has only output connectors and is used to set the input states for the logic network.
 * @extends Box
 */
export default class InputBox extends Box {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {Boolean} [isOn=false] the initial state of the inputbox (`true` is *on*, `false` is *off*)
     */
    constructor(parentSVG, isOn = false) {
        const gridWidth = 7;
        const gridHeight = 4;

        super(parentSVG, "input", "other", gridWidth, gridHeight);

        this.addConnector(gridWidth, gridHeight / 2, false);

        this.on = isOn;

        this.generateBlockNodes();
    }

    /**
     * get data of this input box as a JSON-ready object
     * @return {Object} javascript object containing essential data for this input box
     */
    get exportData() {
        let data = super.exportData;
        data.isOn = this.isOn;

        return data;
    }

    generateBlockNodes() {
        // block the input connector node
        const specialNode = {
            x: this.gridWidth,
            y: this.gridHeight / 2
        }
        super.generateBlockNodes(0, 1, 1, 0, specialNode);
    }

    /**
     * start a new simulation from the output connector
     */
    refreshState() {
        this.parentSVG.startNewSimulation(this.connectors[0], this.connectors[0].state)
    }

    /**
     * set the state of the inputbox to the corresponding value
     * @param  {Boolean} isOn set to *on* if `true`, set to *off* if `false`
     */
    set on(isOn) {
        if (isOn) {
            // turn on
            this.changeImage("on");
            this.connectors[0].setState(Logic.state.on);
            this.refreshState()
        } else {
            // turn off
            this.changeImage();
            this.connectors[0].setState(Logic.state.off);
            this.refreshState()
        }

        this.isOn = isOn;
    }

    /**
     * get the state of the inputbox (`true` if *on*, `false` if *off*)
     * @return {Boolean} [description]
     */
    get on() {
        return this.isOn;
    }

    /**
     * toggle the state of the inputbox
     */
    onClick() {
        this.on = !this.on;

        if(this.parentSVG.tutorial) {
            this.parentSVG.tutorial.onChangeInputBoxState();
        }
    }
}
