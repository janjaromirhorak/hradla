/** @module Tutorial */
/**
 * Display and manage the tutorial
 */
export default class Tutorial {
    /**
     * @param {Canvas} parentSVG instance of [Canvas](./module-Canvas.html) for this tutorial
     * @param {Function} [onTutorialClosed] callback function when user closes or finishes the tutorial
     */
    constructor(parentSVG, onTutorialClosed) {
        /**
         * instance of [Canvas](./module-Canvas.html) for this tutorial
         * @type {Canvas}
         */
        this.parentSVG = parentSVG;

        /**
         * helper variable for the `step` property, stores current state of the tutorial (step `0` means that tutorial is closed)
         * @type {Number}
         */
        this.currentStep = 0;

        /**
         * jQuery element containing the tutorial popup
         * @type {jQuery.element}
         */
        this.$tutorialWindow;
        /**
         * jQuery element for the dynamic part of the tutorial popup
         * (text and buttons that are dependent on the current state of the tutorial)
         * @type {Array}
         */
        this.$tutorialContent;

        /**
         * array of functions that represent intividual steps in the tutorial
         * by default populated with step `0` that closes the tutorial
         * @type {Array}
         */
        this.steps = [() => { this.closeWindow(onTutorialClosed) }];

        // set up the tutorial
        this.setUpTutorial();
    }

    /**
     * get the current step of the tutorial, this number corresponds to the index in the `this.steps` array
     * that contains the function for the last displayed step
     * @return {Number}
     */
    get step() {
        return this.currentStep;
    }

    /**
     * change the current step of the tutorial, `0` means "stop the tutorial"
     * @param  {Number} value the step of the tutorial to be displayed
     */
    set step(value) {
        this.currentStep = value;

        if(this.step < this.steps.length) {
            this.steps[this.step]();

            if(this.step === 1)
                this.displayWindow();
        } else {
            this.step = 0;
        }
    }

    /**
     * reset all tutorial hooks
     */
    resetHooks() {
        /**
         * _tutorial hook_, called when the context menu is opened
         */
        this.onContextMenuOpened = () => {};

        /**
         * _tutorial hook_, called when a new element is added
         */
        this.onElementAdded = () => {};

        /**
         * _tutorial hook_, called when a box is moved
         */
        this.onBoxMoved = () => {};

        /**
         * _tutorial hook_, called when a box is rotated
         */
        this.onBoxRotated = () => {};

        /**
         * _tutorial hook_, called when an output box value is set to `on`
         */
        this.onOutputBoxTrue = () => {};

        /**
         * _tutorial hook_, called when the canvas is moved
         */
        this.onCanvasMoved = () => {};

        /**
         * _tutorial hook_, called when the canvas is zoomed
         */
        this.onCanvasZoomed = () => {};

        /**
         * _tutorial hook_, called when a box is removed
         */
        this.onElementRemoved = () => {};

        /**
         * _tutorial hook_, called when user changes the state of an input box
         */
        this.onChangeInputBoxState = () => {};
    }

    /**
     * set up the tutorial: reset all tutorial hooks and define the order of tutorial steps
     */
    setUpTutorial() {
        this.resetHooks();

        this.steps.push(
            () => { this.stepWelcome() },
            () => { this.stepAddBoxes() },
            () => { this.stepMoveCanvas() },
            () => { this.stepZoomCanvas() },
            () => { this.stepMoveBoxes() },
            () => { this.stepWiring() },
            () => { this.switchInputBox() },
            () => { this.stepRemoveBox() },
            () => { this.stepFinish() }
        )
    }

    /**
     * _tutorial step_: display context menu
     */
    stepWelcome() {
        this.windowContent(
            `Welcome to Hradla! To get started, click anywhere on the editing area with your right mouse button.`
        )

        this.onContextMenuOpened = () => {
            this.next();

            // this function runs only once
            this.onContextMenuOpened = () => {}
        }
    }

    /**
     * _tutorial step_: add input box, output box and a NOT gate
     */
    stepAddBoxes() {
        this.windowContent(
            `Great job! Now you know, how to open the editor menu.
            Now try to add an <em>Input box</em>, <em>Output box</em> and a <em>NOT gate</em>
            to the editing area.`)

        let elementsAdded = {
            inputBox: false,
            outputBox: false,
            notGate: false
        }

        this.onElementAdded = (name) => {
            switch (name) {
                case "input":
                    elementsAdded.inputBox = true;
                    break;
                case "output":
                    elementsAdded.outputBox = true;
                    break;
                case "not":
                    elementsAdded.notGate = true;
                    break;
                default:
                    // no action on default
                    break;
            }

            if(elementsAdded.inputBox && elementsAdded.outputBox && elementsAdded.notGate) {
                // remove the action
                this.onElementAdded = () => {}

                // proceed to the next step of the tutorial
                this.next();
            }
        };
    }

    /**
     * _tutorial step_: move the canvas
     */
    stepMoveCanvas() {
        this.windowContent(
            `You can move the editing area (sometimes called canvas) by dragging
            with the middle mouse button or by holding the <code>Ctrl</code> key
            and dragging with the left mouse button. Check it out.`)

        this.onCanvasMoved = () => {
            this.next();
            this.onCanvasMoved = () => {}
        }
    }

    /**
     * _tutorial step_: zoom the canvas
     */
    stepZoomCanvas() {
        this.windowContent(
            `You can also zoom in and out using the mouse wheel
            or with the <code>+</code>&nbsp;and <code>−</code>&nbsp;keys.`
        )

        this.onCanvasZoomed = () => {
            this.next();
        }
    }

    /**
     * _tutorial step_: move the boxes
     */
    stepMoveBoxes() {
        this.windowContent(`You can move the elements on the editing canvas by dragging them
            using the left mouse button. You can also rotate them using middle click. Try it out.`)

        let boxMoved = false;
        let boxRotated = false;

        let moveRotateCallback = () => {
            if(boxMoved && boxRotated) {
                this.next();
            }
        }

        this.onBoxMoved = () => {
            boxMoved = true;

            this.onBoxMoved = () => {}

            moveRotateCallback()
        }

        this.onBoxRotated = () => {
            boxRotated = true;

            this.onBoxRotated = () => {}

            moveRotateCallback()
        }
    }

    /**
     * _tutorial step_: create an invertor
     */
    stepWiring() {
        this.windowContent(`Essential part of logic networks is the wiring. Create a very simple
            inverter by connecting the <em>Input box</em> to the input of the <em>NOT gate</em>
            and the output of the <em>NOT gate</em> to the input of the <em>Output box</em>.`,
            `To connect two elemnts, simply click on a connector of the first element,
            than click on a conector of the second element.`)

        this.onOutputBoxTrue = () => {
            this.next();

            this.onOutputBoxTrue = () => {};
        };
    }

    /**
     * _tutorial step_: change the state of an input box
     */
    switchInputBox() {
        this.windowContent(`
            The input boxes can be in two states: <em>ON</em> and <em>OFF</em>, signalled
            by the green and red colors respectively. You can left click on an Input box to
            switch its state. Try it out!
        `)

        this.onChangeInputBoxState = () => {
            this.next();

            this.onChangeInputBoxState = () => {};
        };
    }

    /**
     * _tutorial step_: remove a box
     */
    stepRemoveBox() {
        this.windowContent(
            `When you right click on an element, you can find a new item in the menu,
            that allows you to remove the element. This works for wires as well as for gates and other types of boxes.
            Try to remove an element!`
        )

        this.onElementRemoved = () => {
            this.next();

            this.onElementRemoved = () => {};
        }
    }

    /**
     * _tutorial step_: ask the user if they want to clean the canvas before closing the tutorial
     */
    stepFinish() {
        this.windowContent(`You're all set, enjoy your stay!`,
                           `Do you wish to start with empty canvas?`)
        this.windowChoice(
            {
                text: 'yes, clean the canvas',
                func: () => {
                    this.parentSVG.cleanCanvas();
                    this.stop();
                }
            },
            {
                text: 'no, keep the canvas as it is',
                func: () => {
                    this.stop();
                }
            }
        )
    }

    /**
     * display the tutorial window
     */
    displayWindow() {
        this.parentSVG.$svg.after(this.$tutorialWindow)
    }

    /**
     * close the tutorial window
     * @param  {Function} [onTutorialClosed] callback function that is called when the tutorial is closed
     */
    closeWindow(onTutorialClosed) {
        this.$tutorialWindow.remove();

        if(onTutorialClosed!==undefined) {
            onTutorialClosed();
        }
    }

    /**
     * set the tutorial window text content
     * @param  {...string} text each string is a separate paragraph
     */
    windowContent(...text) {
        if(!this.$tutorialWindow) {
            this.$tutorialWindow = $("<div>").attr("id", "tutorial");
            this.$tutorialWindow.append(
                $("<div>").addClass("topButtons").append(
                    $("<a>").attr("href", "#").addClass("button close")
                    .click(() => {
                        this.stop();
                    })
                )
            )

            this.$tutorialContent = $("<div>").addClass("content");
            this.$tutorialWindow.append(this.$tutorialContent);
        }

        this.$tutorialContent.html("");
        for (const paragraph of text) {
            this.$tutorialContent.append(
                $("<p>").html(paragraph)
            );
        }
    }

    /**
     * add buttons with choices to the tutorial window
     * @param  {...object} choices each choice is an object in with a `string` property _text_ and a `function` property _func_
     */
    windowChoice(...choices) {
        let $choices = $("<ol>").addClass("choices");
        for (const choice of choices) {
            $choices.append(
                $("<li>").append(
                    $("<a>").attr("href", "#").click(() => {
                        choice.func()
                    }).html(choice.text)
                )
            )
        }
        this.$tutorialContent.append($choices);
    }

    /**
     * start the tutorial
     */
    start() { this.step = 1; }

    /**
     * go to the next step of the tutorial
     */
    next() { this.step++; }

    /**
     * stop the tutorial
     */
    stop() { this.step = 0 }
}
