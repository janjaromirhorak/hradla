import {
    Group,
    Rectangle,
    MultiLineText,
    PolyLine,
    PolyLinePoints,
    PolyLinePoint
} from '../svgObjects';
import Logic from '../Logic';

import Box from './Box';

/** @module editorElements.Blackbox */

/**
 * Blackbox is a box that is defined by its evaluation function
 * @extends Box
 */
export default class Blackbox extends Box {
    /**
     * @param {App} appInstance  instance of [App](./module-App.html)
     * @param {number} inputConnectors  number of input connectors
     * @param {number} outputConnectors number of output connectors
     * @param {Function} evalFunction   function that takes `inputConnectors` [Logic.state](./module-Logic.html#.state)s
     *                                  and returns `outputConnectors` Logic.states.
     * @param {String} [name]        name that will be displayed on the blackbox
     */
    constructor(appInstance, inputConnectors, outputConnectors, evalFunction, name = '') {
        const width = 11;
        const height = Math.max(inputConnectors, outputConnectors) * 2;

        super(appInstance, name, 'blackbox', width, height);

        const connectorPinLenght = 2.5 * this.gridSize;

        // override default svgObj structure
        this.svgObj = new Group();

        // transparent background rectangle
        let hitbox = new Rectangle(0, 0, this.width, this.height, 'none', 'none');
        hitbox.$el.addClass('rect');

        this.svgObj.addChild(hitbox);

        // main rectangle
        const bodyWidth = this.width - 2 * connectorPinLenght;

        let rectangle = new Rectangle(
            connectorPinLenght,
            0,
            bodyWidth,
            this.height,
            'white',
            'black'
        );
        rectangle.addAttr({ 'stroke-width': '2.5' });
        rectangle.$el.addClass('rect');

        this.svgObj.addChild(rectangle);

        // text description of the box
        const textWidth = bodyWidth - this.gridSize;
        const textHeight = this.height - this.gridSize;
        let text = new MultiLineText(
            (this.width - textWidth) / 2, // horizontal centering
            (this.height - textHeight) / 2, // vertical centering
            textWidth,
            textHeight,
            name.toUpperCase(),
            this.gridSize * 1.2
        );
        this.svgObj.addChild(text);

        // add input connectors
        for (let i = 0; i < inputConnectors; ++i) {
            const gridPosition = i * 2 + 1;
            const pixelPosition = gridPosition * this.gridSize;

            let pin = new PolyLine(
                new PolyLinePoints([
                    new PolyLinePoint(0, pixelPosition),
                    new PolyLinePoint(connectorPinLenght, pixelPosition)
                ]),
                1,
                'black'
            );

            this.svgObj.addChild(pin);

            // add the connector
            this.addInputConnector(0, gridPosition);
        }

        // add output connectors
        for (let i = 0; i < outputConnectors; ++i) {
            const gridPosition = i * 2 + 1;
            const pixelPosition = gridPosition * this.gridSize;

            let pin = new PolyLine(
                new PolyLinePoints([
                    new PolyLinePoint(this.width - connectorPinLenght, pixelPosition),
                    new PolyLinePoint(this.width, pixelPosition)
                ]),
                1,
                'black'
            );

            this.svgObj.addChild(pin);

            this.addOutputConnector(width, gridPosition);
        }

        this.svgObj.$el.addClass('box');

        /**
         * function that takes `inputConnectors` [Logic.state](./module-Logic.html#.state)s
         * and returns `outputConnectors` Logic.states.
         */
        this.evalFunction = evalFunction;

        // regenerate the blocked nodes after adding all the connectors
        this.generateBlockNodes();
    }

    /**
     * get data of this blackbox as a JSON-ready object
     * @return {Object} javascript object containing essential data for this blackbox
     */
    get exportData() {
        let data = super.exportData;
        data.inputs = this.inputConnectors.length;
        data.outputs = this.outputConnectors.length;

        // generate the truth table

        data.table = [];

        // array of tested input states
        const stateList = Logic.stateList;

        // recursive function that generates all possible inputs
        const getPermutations = length => {
            let permutations = [];
            switch (length) {
                case 0:
                    return [];
                case 1:
                    for (const state of stateList) {
                        permutations.push([state]);
                    }
                    return permutations;
                default:
                    for (const state of stateList) {
                        for (const perm of getPermutations(length - 1)) {
                            permutations.push([state, ...perm]);
                        }
                    }
                    return permutations;
            }
        };

        // generate outputs for all the possible inputs
        for (const inputValues of getPermutations(data.inputs)) {
            const outputValues = this.evalFunction(...inputValues);

            // if there is an output value that is not Logic.state.unknown, add this line to the
            // truthtable, otherwise don't add it (if all output values are Logic.state.unknown,
            // the input combination does not have to be defines, because Logic.state.unknown is the default value)
            if (
                outputValues.reduce((accumulator, current) => {
                    return accumulator || current !== Logic.state.unknown;
                })
            ) {
                data.table.push([...inputValues, ...outputValues]);
            }
        }

        return data;
    }

    /**
     * proccess the input connector states and reflect them in the output connector states according
     * to the logic defined by this.evalFunction
     */
    refreshState() {
        const inputStates = this.inputConnectors.map(conn => conn.state);
        // call the evalFunction to get the output states
        const outputStates = this.evalFunction(...inputStates);

        // apply the outputStates to the outputConnectors
        for (let i = 0; i < outputStates.length; ++i) {
            this.outputConnectors[i].setState(outputStates[i]);
        }
    }

    generateBlockNodes() {
        // add blocked nodes on the connectors and between them as well

        let specialNodes = [];
        for (let i = 1; i < this.inputConnectors.length * 2; ++i) {
            specialNodes.push({
                x: 0,
                y: i
            });
        }
        for (let i = 1; i < this.outputConnectors.length * 2; ++i) {
            specialNodes.push({
                x: this.gridWidth,
                y: i
            });
        }

        super.generateBlockNodes(0, 1, 0, 1, ...specialNodes);
    }
}
