import Logic from '../Logic';

import Box from './Box';

/** @module editorElements.Gate */

/**
 * Gate is a box that processes the states of its input connectors and returns the result in its output connectors.
 * @extends Box
 */
export default class Gate extends Box {
    /**
     * @param {App} appInstance  instance of [App](./module-App.html)
     * @param {string} name       name of the gate (and, not, xor...)
     */
    constructor(appInstance, name) {
        const width = 9;
        const height = 4;

        super(appInstance, name, 'gate', width, height);

        // ADD CONNECTORS

        let specialNodes = [];

        // output
        this.addConnector(width, height / 2, false);

        // block the output connector
        specialNodes.push({
            x: width,
            y: height / 2
        });

        if (this.name === 'not' || this.name === 'repeater') {
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
            this.addConnector(0, height / (4 / 3), true);

            // block the input connectors
            specialNodes.push({
                x: 0,
                y: height / 4
            });
            specialNodes.push({
                x: 0,
                y: height / (4 / 3)
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
        // return new Set(["not", "and", "or", "nand", "nor", "xor", "xnor", "repeater"]);
        return new Set(['not', 'and', 'or', 'nand', 'nor', 'xor', 'xnor']);
    }

    generateBlockNodes(...specialNodes) {
        if (specialNodes !== undefined) {
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
        // map gate names to their logic functions
        const stateMap = {
            and: () => Logic.and(this.connectors[1].state, this.connectors[2].state),
            nand: () => Logic.nand(this.connectors[1].state, this.connectors[2].state),
            nor: () => Logic.nor(this.connectors[1].state, this.connectors[2].state),
            not: () => Logic.not(this.connectors[1].state),
            or: () => Logic.or(this.connectors[1].state, this.connectors[2].state),
            xnor: () => Logic.xnor(this.connectors[1].state, this.connectors[2].state),
            xor: () => Logic.xor(this.connectors[1].state, this.connectors[2].state),
            repeater: () => this.connectors[1].state
        };

        let state = Logic.state.unknown;

        if (stateMap[this.name]) {
            state = stateMap[this.name]();
        }

        // notify the simulator about this change
        this.appInstance.simulation.notifyChange(this.connectors[0].id, state);
    }
}
