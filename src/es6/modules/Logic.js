/** @module Logic */
/**
 * definitions of logic states and basic logic functions used in the simulation
 */
export default class Logic {
    /**
     * Enum for logic states.
     *
     * States:
     * - `off`
     * - `on`
     * - `unknown`
     * - `oscillating`
     * @type {Number}
     */
    static get state() {
        return {
            off: 0,
            on: 1,
            unknown: 2,
            oscillating: 3
        }
    }

    /**
     * list of all states that can be used in the simulation
     *
     * This getter iterates over Logic.state and returns an array containing all values of Logic.state's members
     * @type {Array}
     */
    static get stateList() {
        let states = [];

        // iterate over all defined states and add their values to the states array
        Object.keys(Logic.state).forEach(key => {
            states.push(Logic.state[key]);
        });

        return states;
    }

    /**
     * Logic AND
     * @param  {Logic.state} a first input state
     * @param  {Logic.state} b second input state
     * @return {Logic.state}   output state
     */
    static and(a, b) {
        return Logic.runSymmetricRules(a, b, [
            [Logic.state.on, Logic.state.on, Logic.state.on],
            [Logic.state.on, Logic.state.off, Logic.state.off],
            [Logic.state.on, Logic.state.unknown, Logic.state.unknown],
            [Logic.state.on, Logic.state.oscillating, Logic.state.oscillating],

            [Logic.state.off, Logic.state.off, Logic.state.off],
            [Logic.state.off, Logic.state.unknown, Logic.state.off],
            [Logic.state.off, Logic.state.oscillating, Logic.state.off],

            [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown],
            [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown],

            [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]
        ]);
    }
    /**
     * Logic NAND
     * @param  {Logic.state} a first input state
     * @param  {Logic.state} b second input state
     * @return {Logic.state}   output state
     */
    static nand(a, b) {
        return Logic.not(Logic.and(a, b));
    }

    /**
     * Logic NOR
     * @param  {Logic.state} a first input state
     * @param  {Logic.state} b second input state
     * @return {Logic.state}   output state
     */
    static nor(a, b) {
        return Logic.not(Logic.or(a, b));
    }

    /**
     * Logic NOT
     * @param  {Logic.state} a first input state
     * @return {Logic.state}   output state
     */
    static not(a) {
        if(a === Logic.state.on) {
            return Logic.state.off;
        } else if (a === Logic.state.off) {
            return Logic.state.on;
        } else {
            return a;
        }
    }

    /**
     * Logic OR
     * @param  {Logic.state} a first input state
     * @param  {Logic.state} b second input state
     * @return {Logic.state}   output state
     */
    static or(a, b) {
        return Logic.runSymmetricRules(a, b, [
            [Logic.state.on, Logic.state.on, Logic.state.on],
            [Logic.state.on, Logic.state.off, Logic.state.on],
            [Logic.state.on, Logic.state.unknown, Logic.state.on],
            [Logic.state.on, Logic.state.oscillating, Logic.state.on],

            [Logic.state.off, Logic.state.off, Logic.state.off],
            [Logic.state.off, Logic.state.unknown, Logic.state.unknown],
            [Logic.state.off, Logic.state.oscillating, Logic.state.oscillating],

            [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown],
            [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown],

            [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]
        ]);
    }

    /**
     * Logic XNOR
     * @param  {Logic.state} a first input state
     * @param  {Logic.state} b second input state
     * @return {Logic.state}   output state
     */
    static xnor(a, b) {
        return Logic.not(Logic.xor(a, b));
    }

    /**
     * Logic XOR
     * @param  {Logic.state} a first input state
     * @param  {Logic.state} b second input state
     * @return {Logic.state}   output state
     */
    static xor(a, b) {
        return Logic.runSymmetricRules(a, b, [
            [Logic.state.on, Logic.state.on, Logic.state.off],
            [Logic.state.on, Logic.state.off, Logic.state.on],
            [Logic.state.on, Logic.state.unknown, Logic.state.unknown],
            [Logic.state.on, Logic.state.oscillating, Logic.state.oscillating],

            [Logic.state.off, Logic.state.off, Logic.state.off],
            [Logic.state.off, Logic.state.unknown, Logic.state.unknown],
            [Logic.state.off, Logic.state.oscillating, Logic.state.oscillating],

            [Logic.state.unknown, Logic.state.unknown, Logic.state.unknown],
            [Logic.state.unknown, Logic.state.oscillating, Logic.state.unknown],

            [Logic.state.oscillating, Logic.state.oscillating, Logic.state.oscillating]
        ]);
    }

    /**
     * Finds the correct rule in the array of rules and returns the corresponding return value.
     * This function expects rules to be symmetric (so `a RULE b` should returns the same value as `b RULE a`),
     * which allows to cut down on the `rules` array quite a bit
     * @param  {Logic.state} a     first input state
     * @param  {Logic.state} b     second input state
     * @param  {Array} rules       Array of arrays. Each inner array represents a rule in the format [input1, input2, output].
     *                             The function finds an array, where `a === input1` and `b === input1` (or `a === input2` and `b === input1`)
     *                             and returns `output` from this array.
     * @return {Logic.state}       output state
     */
    static runSymmetricRules(a, b, rules) {
        // iterate through all the rules
        for (const rule of rules) {
            if ((rule[0] === a && rule[1] === b) || (rule[0] === b && rule[1] === a)) {
                return rule[2];
            }
        }

        // if no rule matches, the output state is unknown
        return Logic.state.unknown;
    }
}
