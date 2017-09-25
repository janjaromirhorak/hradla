"use strict";

// item of the context menu
class ContextMenuItem {
    constructor(name, type, contextMenu, parentSVG, clickFunction) {
        this.name = name;
        this.type = type;
        this.contextMenu = contextMenu;
        this.parentSVG = parentSVG;

        // create the jQuery element
        this.$el = $("<li>");
        $(this.$el)
            .text(name)
            .attr("type", type);

        // assign a click functionality to the element
        if(clickFunction) {
            $(this.$el).click(
                (event) => {
                    // call the passed function
                    clickFunction(event);
                    // hide the menu
                    contextMenu.hide();
                }
            );
        }
    }

    // add a css class to the element
    addClass(cls) {
        this.$el.addClass(cls);
        return this;
    }

    // make this item a sub-menu (append child items)
    appendItem(item) {
        if(!this.subList) {
            this.subList = $("<ul>");
            this.$el.append(this.subList);
        }

        this.subList.append(item.jQuery);

        return item;
    }

    // get the jQuery representation of this menu item
    get jQuery() {
        return this.$el;
    }
}

// specific functionality for the context menu items that allow to add gates
class GateMenuItem extends ContextMenuItem {
    constructor(type, contextMenu, parentSVG) {
        super(
            type, // name is the type
            type,
            contextMenu,
            parentSVG,
            (event) => {
                let position = {
                    left: Math.round(contextMenu.position.x / parentSVG.gridSize) * parentSVG.gridSize,
                    top: Math.round(contextMenu.position.y / parentSVG.gridSize) * parentSVG.gridSize
                };

                parentSVG.newGate(
                    type,
                    position.left, // x coordinate
                    position.top // y coordinate
                );
            }
        );
    }
}

// the main class specifying the context menu
export default class ContextMenu {
    constructor(parentSVG) {
        this.parentSVG = parentSVG;

        // list of gates that can be added
        const gates = ["not", "and", "or", "nand", "nor", "xor", "xnor"];

        // starting position of the context menu (left top corner)
        this.position = {
            x: 0, y: 0
        };

        // the main jQuery element
        this.$el = $("<ul>");
        // add id contextMenu (used in SCSS for styling)
        this.$el.attr('id', 'contextMenu');

        // create a submenu with gates
        let gateList = new ContextMenuItem("New gate", '', this, parentSVG);
        for (let i = 0 ; i < gates.length ; ++i) {
            gateList.appendItem(
                new GateMenuItem(gates[i], this, parentSVG)
            );
        }
        // append the submenu with gates
        this.appendItem(gateList);

        // create the button for adding an input box
        this.appendItem(
            new ContextMenuItem("Input box", '', this, parentSVG,
                () => {
                    let position = {
                        left: this.parentSVG.snapToGrid(this.position.x),
                        top: this.parentSVG.snapToGrid(this.position.y)
                    };

                    parentSVG.newInput(position.left, position.top);
                }
            )
        );

        // create the button for adding an output box
        this.appendItem(new ContextMenuItem("Output box", '', this, parentSVG, () => {
            let position = {
                left: this.parentSVG.snapToGrid(this.position.x),
                top: this.parentSVG.snapToGrid(this.position.y)
            };

            parentSVG.newOutput(position.left, position.top);
        }));

        // conditional items for removing boxes and wires
        this.appendConditionalItem('box', 'Remove this item', (id) => {this.parentSVG.removeBox(id)});
        this.appendConditionalItem('wire', 'Remove this wire', (id) => {this.parentSVG.removeWireById(id)});

        // add the jQuery representation before the svg jQuery element
        parentSVG.$svg.before(this.$el);
    }

    // append an item to the menu
    appendItem(item) {
        this.$el.append(item.jQuery);
        return item;
    }

    // clickFunction takes one argument: ID of the target
    appendConditionalItem(itemClass, text, clickFunction) {
        if(!this.conditionalItems) {
            this.conditionalItems = [];
        }

        this.conditionalItems[this.conditionalItems.length] = {
            itemClass: itemClass,
            text: text,
            clickFunction: clickFunction
        }
    }

    resolveConditionalItems($target) {
        for(let i = 0; i < this.conditionalItems.length; ++i) {
            if($target.hasClass(this.conditionalItems[i].itemClass)) {
                this.appendItem(
                    new ContextMenuItem(
                        this.conditionalItems[i].text, '', this, this.parentSVG,
                        () => {
                            this.conditionalItems[i].clickFunction($target.attr('id'));
                        }
                    )
                ).addClass('conditional');
            }
        }
    }

    hideAllConditionalItems() {
        this.$el.children('.conditional').remove();
    }
    
    display(x, y, $target) {
        this.position = {
            x: x,
            y: y
        };

        this.$el.css({
            display: 'block',
            top: y + "px",
            left: x + "px"
        });

        this.resolveConditionalItems($target);
    }

    hide() {
        this.$el.css({display: 'none'});
        this.hideAllConditionalItems();
    }
}