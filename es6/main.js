/**
 * Initialize the application
 */

import Svg from './canvas.js';

// initialize when jQuery is ready
$(function () {
    // selector of the inline SVG element that will be used to initialize the editor
    const targetElementSelector = "svg#canvas";
    // size of the grid in pixels
    const gridSize = 10;

    // start the app by calling the Svg class constructor
    new Svg(targetElementSelector, gridSize);

    /* DEMO */
    // ONE BIT COMPARATOR
    /*
    let i1 = svg.newInput(100, 100);
    let i2 = svg.newInput(100, 200);

    let n1 = svg.newGate("not", 200, 100);
    let n2 = svg.newGate("not", 200, 200);

    let a1 = svg.newGate("and", 360, 90);
    let a2 = svg.newGate("and", 360, 210);

    let nor = svg.newGate("nor", 540, 150);

    let o1 = svg.newOutput(680, 90);
    let o2 = svg.newOutput(680, 150);
    let o3 = svg.newOutput(680, 210);

    svg.newWire(i1.outputs[0].svgObj.id, n1.inputs[0].svgObj.id);
    svg.newWire(i2.outputs[0].svgObj.id, n2.inputs[0].svgObj.id);

    svg.newWire(i1.outputs[0].svgObj.id, a2.inputs[1].svgObj.id);
    svg.newWire(i2.outputs[0].svgObj.id, a1.inputs[0].svgObj.id);

    svg.newWire(n1.outputs[0].svgObj.id, a1.inputs[1].svgObj.id);
    svg.newWire(n2.outputs[0].svgObj.id, a2.inputs[0].svgObj.id);

    svg.newWire(a1.outputs[0].svgObj.id, nor.inputs[0].svgObj.id);
    svg.newWire(a2.outputs[0].svgObj.id, nor.inputs[1].svgObj.id);

    svg.newWire(a1.outputs[0].svgObj.id, o1.inputs[0].svgObj.id);
    svg.newWire(nor.outputs[0].svgObj.id, o2.inputs[0].svgObj.id);
    svg.newWire(a2.outputs[0].svgObj.id, o3.inputs[0].svgObj.id);
    */

    // BINARY ADDER
    /*
    let i1 = svg.newInput(80, 90);
    let i2 = svg.newInput(80, 130);
    let i3 = svg.newInput(80, 180);

    let x1 = svg.newGate("xor", 360, 100);
    let x2 = svg.newGate("xor", 360, 170);

    let a1 = svg.newGate("and", 250, 220);
    a1.onClickMiddle();// a jednou rotovany
    let a2 = svg.newGate("and", 500, 320);

    let or = svg.newGate("or", 620, 310);

    let o1 = svg.newOutput(750, 270);
    let o2 = svg.newOutput(750, 310);

    svg.newWire(i1.outputs[0].svgObj.id, x1.inputs[0].svgObj.id);
    svg.newWire(i2.outputs[0].svgObj.id, x1.inputs[1].svgObj.id);
    svg.newWire(i3.outputs[0].svgObj.id, x2.inputs[1].svgObj.id);

    svg.newWire(i1.outputs[0].svgObj.id, a1.inputs[1].svgObj.id);

    svg.newWire(i2.outputs[0].svgObj.id, a1.inputs[0].svgObj.id);

    svg.newWire(i3.outputs[0].svgObj.id, a2.inputs[1].svgObj.id);

    svg.newWire(x1.outputs[0].svgObj.id, x2.inputs[0].svgObj.id);
    svg.newWire(x1.outputs[0].svgObj.id, a2.inputs[0].svgObj.id);

    svg.newWire(a1.outputs[0].svgObj.id, or.inputs[0].svgObj.id);

    svg.newWire(x2.outputs[0].svgObj.id, o1.inputs[0].svgObj.id);
    svg.newWire(a2.outputs[0].svgObj.id, or.inputs[1].svgObj.id);

    svg.newWire(or.outputs[0].svgObj.id, o2.inputs[0].svgObj.id);
    */
});