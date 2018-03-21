"use strict";

/**
 * Item in the [ContextMenu](./module-ContextMenu.html). ContextMenuItems can be nested using the appendItem function.
 */
class ContextMenuItem {
    /**
     * @param {string} text          text on the button
     * @param {ContextMenu} contextMenu instance of the [ContextMenu](./module-ContextMenu.html) this item belongs to
     * @param {Canvas} parentSVG     instance of [Canvas](./module-Canvas.html) this menu belongs to
     * @param {Function} clickFunction callback function that will be called when user clicks this item
     */
    constructor(text, contextMenu, parentSVG, clickFunction) {
        /**
         * text on the button
         * @type {string}
         */
        this.text = text;

        /**
         * instance of the [ContextMenu](./module-ContextMenu.html) this item belongs to
         * @type {ContextMenu}
         */
        this.contextMenu = contextMenu;

        /**
         * instance of [Canvas](./module-Canvas.html) this menu belongs to
         * @type {Canvas}
         */
        this.parentSVG = parentSVG;

        /**
         * jQuery element representing DOM content of this menu item
         * @type {jQuery.element}
         */
        this.$el = $("<li>").text(text);

        // set up click callback if clickFunction is defined
        if(clickFunction) {
            $(this.$el).click(
                event => {
                    clickFunction(event);
                    contextMenu.hide();
                }
            );
        }
    }

    /**
     * add a CSS class to this item
     * @param {string} cls [description]
     */
    addClass(cls) {
        this.$el.addClass(cls);
        return this;
    }

    /**
     * append a nested {@link ContextMenuItem} to this item
     * @param  {ContextMenuItem} item item that will be appended
     */
    appendItem(item) {
        if(!this.subList) {
            this.subList = $("<ul>");
            this.$el.append(this.subList);
        }

        this.subList.append(item.jQuery);

        return item;
    }

    /**
     * get jQuery element of this menu item
     * @return {jQuery.element} jQuery element containing all DOM content for this menu item
     */
    get jQuery() {
        return this.$el;
    }
}

/**
 * Menu item that has a custom click callback function that adds a {@link Gate} of the specified type to the [Canvas](./module-Canvas.html)
 * @extends ContextMenuItem
 */
class GateMenuItem extends ContextMenuItem {
    /**
     * @param {string} type        type of the gate {@link Gate} (and, or, ...)
     * @param {ContextMenu} contextMenu instance of the [ContextMenu](./module-ContextMenu.html) that this item belongs to
     * @param {Canvas} parentSVG   instance of [Canvas](./module-Canvas.html) this menu belongs to
     */
    constructor(type, contextMenu, parentSVG) {
        super(
            `${type} gate`,
            contextMenu,
            parentSVG,
            event => {
                let position = {
                    left: parentSVG.snapToGrid(parentSVG.viewbox.transformX(contextMenu.position.x)),
                    top: parentSVG.snapToGrid(parentSVG.viewbox.transformY(contextMenu.position.y))
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

/** @module ContextMenu */
/**
 * ContextMenu represents the menu that is displayed to the user when they right click on a canvas.
 * This menu allows user to add elements to the Canvas and in the case that user rightclicked
 * on a specific element, this menu allows them to remove this element.
 */
export default class ContextMenu {
    /**
     * @param {Canvas} parentSVG instance of [Canvas](./module-Canvas.html) this menu belongs to
     */
    constructor(parentSVG) {
        /**
         * instance of [Canvas](./module-Canvas.html) this menu belongs to
         * @type {Canvas}
         */
        this.parentSVG = parentSVG;

        // list of gates that can be added
        const gates = ["not", "and", "or", "nand", "nor", "xor", "xnor"];

        /**
         * Position of the context menu. It is used to add the new elements to the correct position on the Canvas.
         * @type {Object}
         */
        this.position = {
            x: 0, y: 0
        };

        /**
         * jQuery element containing the context menu
         * @type {jQuery.element}
         */
        this.$el = $("<ul>");
        this.$el.attr('id', 'contextMenu');

        // add all gates
        let gateList = new ContextMenuItem("New gate", this, parentSVG);
        for (let i = 0 ; i < gates.length ; ++i) {
            gateList.appendItem(
                new GateMenuItem(gates[i], this, parentSVG)
            );
        }
        this.appendItem(gateList);

        // add input box
        this.appendItem(
            new ContextMenuItem("Input box", this, parentSVG,
                () => {
                    let position = {
                        left: this.parentSVG.snapToGrid(parentSVG.viewbox.transformX(this.position.x)),
                        top: this.parentSVG.snapToGrid(parentSVG.viewbox.transformY(this.position.y))
                    };

                    parentSVG.newInput(position.left, position.top);
                }
            )
        );

        // add output box
        this.appendItem(new ContextMenuItem("Output box", this, parentSVG, () => {
            let position = {
                left: this.parentSVG.snapToGrid(parentSVG.viewbox.transformX(this.position.x)),
                top: this.parentSVG.snapToGrid(parentSVG.viewbox.transformY(this.position.y))
            };

            parentSVG.newOutput(position.left, position.top);
        }));

        // add conditional items for box and wire removal
        this.appendConditionalItem('box', 'Remove this item', id => {this.parentSVG.removeBox(id)});
        this.appendConditionalItem('wire', 'Remove this wire', id => {this.parentSVG.removeWireById(id)});

        // add the context menu to the DOM
        parentSVG.$svg.before(this.$el);
    }

    /**
     * append a context menu item to the context menu
     * @param  {ContextMenuItem} item instance of {@link ContextMenuItem} that will be added to this menu
     */
    appendItem(item) {
        this.$el.append(item.jQuery);
        return item;
    }

    /**
     * appends an connditional item (that is shown only if the target has the class itemClass)
     * @param  {string} itemClass     show the item only if the target has this class
     * @param  {string} text          text of this menu item
     * @param  {Function} clickFunction function with one argument (ID of the target) that will be called on click
     */
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

    /**
     * decide whether or not to display specific conditional items
     * @param  {jQuery.element} $target jQuery target of a MouseEvent (element that user clicked on)
     */
    resolveConditionalItems($target) {
        for(let i = 0; i < this.conditionalItems.length; ++i) {
            if($target.hasClass(this.conditionalItems[i].itemClass)) {
                this.appendItem(
                    new ContextMenuItem(
                        this.conditionalItems[i].text, this, this.parentSVG,
                        () => {
                            this.conditionalItems[i].clickFunction($target.attr('id'));
                        }
                    )
                ).addClass('conditional');
            }
        }
    }

    /**
     * hide all conditional items
     */
    hideAllConditionalItems() {
        this.$el.children('.conditional').remove();
    }

    /**
     * displays the context menu with the right set of conditional items
     * @param  {number} x       horizontal position of the context menu in CSS pixels
     * @param  {number} y       vertical position of the context menu in CSS pixels
     * @param  {jQuery.element} $target jQuery target of a MouseEvent (element that user clicked on)
     */
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

    /**
     * hide the context menu
     */
    hide() {
        this.$el.css({display: 'none'});
        this.hideAllConditionalItems();
    }
}
