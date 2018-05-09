import Logic from '../Logic'

import Box from './Box'

/** @module editorElements.Gate */

/**
 * Gate is a box that processes the states of its input connectors and returns the result in its output connectors.
 * @extends Box
 */
export default class Gate extends Box {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string} name       name of the gate (and, not, xor...)
     */
    constructor(parentSVG, name) {
        const width = 9;
        const height = 4;

        super(parentSVG, name, "gate", width, height);

        // ADD CONNECTORS

        let specialNodes = [];

        // output
        this.addConnector(width, height / 2, false);

        // block the output connector
        specialNodes.push({
            x: width,
            y: height / 2
        });

        if(this.name==="not" || this.name==="repeater") {
            // input
            this.addConnector(0, height / 2, true);
            // block the input connector
            specialNodes.push({
                x: 0,
                y: height / 2
            });
        } else {
            // input
            this.addConnector(0, height / 4, true);
            this.addConnector(0, height / (4/3), true);

            // block the input connectors
            specialNodes.push({
                x: 0,
                y: height / 4
            })
            specialNodes.push({
                x: 0,
                y: height / (4/3)
            });

            // add one blocked node between the inputs (for better looking wiring)
            specialNodes.push({
                x: 0,
                y: height / 2
            });
        }

        this.generateBlockNodes(...specialNodes);

        this.refreshState();
    }

    /**
     * array of valid gate names
     * @type {Set}
     */
    static get validGates() {
        return new Set(["not", "and", "or", "nand", "nor", "xor", "xnor", "repeater"]);
    }

    generateBlockNodes(...specialNodes) {
        if(specialNodes!==undefined) {
            super.generateBlockNodes(0, 1, 0, 1, ...specialNodes);
        } else {
            super.generateBlockNodes(0, 1, 0, 1);
        }
    }

    /**
     * proccess the input connector states and reflect them in the output connector states according
     * to the logic corresponding to this gate's name
     */
    refreshState() {
        // console.log("Refresh state on gate", this.id)

        let state = Logic.state.unknown
        switch (this.name) {
            case "and":
                state = Logic.and(this.connectors[1].state, this.connectors[2].state)
                break;
            case "nand":
                state = Logic.nand(this.connectors[1].state, this.connectors[2].state)
                break;
            case "nor":
                state = Logic.nor(this.connectors[1].state, this.connectors[2].state)
                break;
            case "not":
                state = Logic.not(this.connectors[1].state)
                break;
            case "or":
                state = Logic.or(this.connectors[1].state, this.connectors[2].state)
                break;
            case "xnor":
                state = Logic.xnor(this.connectors[1].state, this.connectors[2].state)
                break;
            case "xor":
                state = Logic.xor(this.connectors[1].state, this.connectors[2].state)
                break;
            case "repeater":
                state = this.connectors[1].state
                break;
        }
        // notify the simulator about this change
        this.parentSVG.simulation.notifyChange(this.connectors[0].id, state)
    }
}
