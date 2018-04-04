export default class Tutorial {
    constructor(parentSVG, onTutorialClosed) {
        this.parentSVG = parentSVG;
        this.currentStep = 0;

        this.$tutorialWindow;
        this.$tutorialContent;

        this.steps = [() => { this.closeWindow(onTutorialClosed) }];

        this.setUpTutorial();

        this.resetActions();
    }

    get step() {
        return this.currentStep;
    }

    resetActions() {
        this.onContextMenuOpened = () => {};
        this.onElementAdded = () => {};
        this.onBoxMoved = () => {};
        this.onBoxRotated = () => {};
        this.onOutputBoxTrue = () => {};
        this.onCanvasMoved = () => {};
        this.onCanvasZoomed = () => {};
        this.onElementRemoved = () => {};
        this.onChangeInputBoxState = () => {};
    }

    setUpTutorial() {
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

    stepZoomCanvas() {
        this.windowContent(
            `You can also zoom in and out using <code>Ctrl</code> and the mouse wheel.`
        )

        this.onCanvasZoomed = () => {
            this.next();
            this.onCanvasZoomed = () => {};
        }
    }

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

    set step(value) {
        this.currentStep = value;

        console.log("Tutorial step", this.step)

        if(this.step < this.steps.length) {
            this.steps[this.step]();

            if(this.step === 1)
                this.displayWindow();
        } else {
            this.step = 0;
        }
    }

    displayWindow() {
        this.parentSVG.$svg.after(this.$tutorialWindow)
    }

    closeWindow(onTutorialClosed) {
        this.$tutorialWindow.remove();

        if(onTutorialClosed!==undefined) {
            onTutorialClosed();
        }
    }

    windowContent(...text) {
        if(!this.$tutorialWindow) {
            this.$tutorialWindow = $("<div>").attr("id", "tutorial");

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

    start() { this.step = 1; }
    next() { this.step++; }
    stop() { this.step = 0 }
}
