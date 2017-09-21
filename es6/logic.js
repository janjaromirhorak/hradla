"use strict";

// logic functions used in the gate evaluation
export default class Logic {
    static and(a, b) {
        return Logic.testLogicRulesSymmetric(a, b, [
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
    static nand(a, b) {
        return Logic.not(Logic.and(a, b));
    }
    static nor(a, b) {
        return Logic.not(Logic.or(a, b));
    }
    static not(a) {
        if(a === Logic.state.on) {
            return Logic.state.off;
        } else if (a === Logic.state.off) {
            return Logic.state.on;
        } else {
            return a;
        }
    }
    static or(a, b) {
        return Logic.testLogicRulesSymmetric(a, b, [
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
    static xnor(a, b) {
        return Logic.not(Logic.xor(a, b));
    }
    static xor(a, b) {
        return Logic.testLogicRulesSymmetric(a, b, [
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

    static get state() {
        return {
            unknown: 0,
            on: 1,
            off: 2,
            oscillating: 3
        }
    }

    static testLogicRulesSymmetric(a, b, rules) {
        for (let i = 0 ; i < rules.length ; i++) {
            if((rules[i][0]===a && rules[i][1]===b) || (rules[i][0]===b && rules[i][1]===a)) {
                return rules[i][2];
            }
        }
    }
}