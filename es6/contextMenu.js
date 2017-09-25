"use strict";

class ContextMenuItem {
    constructor(name, type, contextMenu, parentSVG, clickFunction) {
        this.name = name;
        this.type = type;
        this.contextMenu = contextMenu;
        this.parentSVG = parentSVG;

        this.$el = $("<li>");
        $(this.$el)
            .text(name)
            .attr("type", type);

        if(clickFunction) {
            $(this.$el).click(
                (event) => {
                    clickFunction(event);
                    contextMenu.hide();
                }
            );
        }
    }

    addClass(cls) {
        this.$el.addClass(cls);
        return this;
    }

    appendItem(item) {
        if(!this.subList) {
            this.subList = $("<ul>");
            this.$el.append(this.subList);
        }

        this.subList.append(item.jQuery);

        return item;
    }

    get jQuery() {
        return this.$el;
    }
}
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

export default class ContextMenu {
    constructor(parentSVG) {
        this.parentSVG = parentSVG;

        const gates = ["not", "and", "or", "nand", "nor", "xor", "xnor"];

        this.position = {
            x: 0, y: 0
        };

        this.$el = $("<ul>");
        this.$el.attr('id', 'contextMenu');

        let gateList = new ContextMenuItem("New gate", '', this, parentSVG);
        for (let i = 0 ; i < gates.length ; ++i) {
            gateList.appendItem(
                new GateMenuItem(gates[i], this, parentSVG)
            );
        }
        this.appendItem(gateList);

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

        this.appendItem(new ContextMenuItem("Output box", '', this, parentSVG, () => {
            let position = {
                left: this.parentSVG.snapToGrid(this.position.x),
                top: this.parentSVG.snapToGrid(this.position.y)
            };

            parentSVG.newOutput(position.left, position.top);
        }));

        this.appendConditionalItem('box', 'Remove this item', (id) => {this.parentSVG.removeBox(id)});
        this.appendConditionalItem('wire', 'Remove this wire', (id) => {this.parentSVG.removeWireById(id)});

        parentSVG.$svg.before(this.$el);
    }

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