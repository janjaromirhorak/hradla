import { getLibrary, getNetworkFromLibrary } from './networkLibrary';

import { Gate } from '../editorElements';

/**
 * Item in the [ContextMenu](./module-ContextMenu.html). ContextMenuItems can be nested using the appendItem function.
 */
class ContextMenuItem {
    /**
     * @param {string} text          text on the button
     * @param {ContextMenu} contextMenu instance of the [ContextMenu](./module-ContextMenu.html) this item belongs to
     * @param {Function} clickFunction callback function that will be called when user clicks this item
     */
    constructor(text, contextMenu, clickFunction) {
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
         * jQuery element representing DOM content of this menu item
         * @type {jQuery.element}
         */
        this.$el = $('<li>').text(text);

        // set up click callback if clickFunction is defined
        if (clickFunction !== undefined) {
            $(this.$el).click(event => {
                clickFunction();
                contextMenu.hide();

                event.stopPropagation();
            });
        }

        /**
         * jQuery element containing the submenu (or undefined, if item has no subitems)
         * @type {jQuery.element}
         */
        this.$submenu = undefined;

        /**
         * submenu item counter
         * @type {Number}
         */
        this.itemCount = 0;

        // set hover callback
        $(this.$el).hover(
            event => {
                // mouse on

                if (this.length > 0) {
                    this.$submenu.css({
                        display: 'block',
                        top: this.$el.offset().top,
                        left: this.$el.parent().offset().left + this.$el.parent().width()
                    });

                    this.contextMenu.$el.after(this.$submenu);

                    event.stopPropagation();
                }
            },
            () => {
                // mouse out
                if (this.$submenu) {
                    this.$submenu.css({
                        display: 'none'
                    });
                }

                // do not stop event propagation, here it is wanted
                // (because submenu overrides display: none when user moves from this menu item to the submenu)
            }
        );
    }

    /**
     * instance of [App](./module-App.html) this menu belongs to
     * @type {App}
     */
    get appInstance() {
        return this.contextMenu.appInstance;
    }

    /**
     * number of items in the submenu
     * @return {Number}
     */
    get length() {
        return this.itemCount;
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
        if (!this.$submenu) {
            this.$submenu = $('<ul>').addClass('subList');
            this.$submenu.hover(
                () => {
                    this.$submenu.css('display', 'block');
                },
                () => {
                    this.$submenu.css('display', 'none');
                }
            );
        }
        this.$submenu.append(item.$el);

        this.itemCount++;

        return item;
    }

    /**
     * get jQuery element of this menu item
     * @return {jQuery.element} jQuery element containing all DOM content for this menu item
     */
    get jQuery() {
        return this.$el;
    }

    get jQuerySubmenu() {
        return this.$submenu;
    }
}

/**
 * Menu item that has a custom click callback function that adds a {@link Gate} of the specified type to the [App](./module-App.html)
 * @extends ContextMenuItem
 */
class GateMenuItem extends ContextMenuItem {
    /**
     * @param {string} type        type of the gate {@link Gate} (and, or, ...)
     * @param {ContextMenu} contextMenu instance of the [ContextMenu](./module-ContextMenu.html) that this item belongs to
     */
    constructor(type, contextMenu) {
        super(`${type.toUpperCase()} gate`, contextMenu, () => {
            this.appInstance.newGate(
                type,
                this.appInstance.snapToGrid(
                    this.appInstance.viewbox.transformX(contextMenu.position.x)
                ),
                this.appInstance.snapToGrid(
                    this.appInstance.viewbox.transformY(contextMenu.position.y)
                )
            );
        });
    }
}

/**
 * Menu item that has a custom click callback function that adds a specified {@link Blackbox} to the [App](./module-App.html)
 * @extends ContextMenuItem
 */
class BlackboxMenuItem extends ContextMenuItem {
    constructor(name, file, contextMenu) {
        super(name, contextMenu, () => {
            getNetworkFromLibrary(file)
                .then(({ blackbox, name }) => {
                    const { inputs, outputs, table } = blackbox;

                    // use the name specified in the blackbox item, if it does not exist, use the name for the network
                    let usedName = blackbox.name || name;

                    this.appInstance.newBlackbox(
                        inputs,
                        outputs,
                        table,
                        usedName,
                        this.appInstance.snapToGrid(
                            this.appInstance.viewbox.transformX(contextMenu.position.x)
                        ),
                        this.appInstance.snapToGrid(
                            this.appInstance.viewbox.transformY(contextMenu.position.y)
                        )
                    );
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }
}

/**
 * Menu item that has a custom click callback function that adds a specified Network to the [App](./module-App.html)
 * @extends ContextMenuItem
 */
class NetworkMenuItem extends ContextMenuItem {
    constructor(name, file, contextMenu) {
        super(name, contextMenu, () => {
            getNetworkFromLibrary(file)
                .then(data => {
                    this.appInstance
                        .importData(
                            data,
                            Math.round(
                                this.appInstance.viewbox.transformX(contextMenu.position.x) /
                                    this.appInstance.gridSize
                            ),
                            Math.round(
                                this.appInstance.viewbox.transformY(contextMenu.position.y) /
                                    this.appInstance.gridSize
                            )
                        )
                        .then(warnings => {
                            for (const warning of warnings) {
                                this.appInstance.messages.newWarningMessage(warning);
                            }
                        });
                })
                .catch(error => {
                    this.appInstance.messages.newErrorMessage(error);
                });
        });
    }
}

/** @module ContextMenu */
/**
 * ContextMenu represents the menu that is displayed to the user when they right click on a canvas.
 * This menu allows user to add elements to the canvas and in the case that user rightclicked
 * on a specific element, this menu allows them to remove this element.
 */
export default class ContextMenu {
    /**
     * @param {App} appInstance instance of [App](./module-App.html) this menu belongs to
     */
    constructor(appInstance) {
        /**
         * instance of [App](./module-App.html) this menu belongs to
         * @type {App}
         */
        this.appInstance = appInstance;

        /**
         * Position of the context menu. It is used to add the new elements to the correct position on the canvas.
         * @type {Object}
         */
        this.position = {
            x: 0,
            y: 0
        };

        /**
         * jQuery element containing the context menu
         * @type {jQuery.element}
         */
        this.$el = $('<ul>');
        this.$el.attr('id', 'contextMenu');

        let special = new ContextMenuItem('Special elements', this);

        // add input box
        special.appendItem(
            new ContextMenuItem('Input box', this, () => {
                let position = {
                    left: this.appInstance.snapToGrid(
                        appInstance.viewbox.transformX(this.position.x)
                    ),
                    top: this.appInstance.snapToGrid(
                        appInstance.viewbox.transformY(this.position.y)
                    )
                };

                appInstance.newInput(position.left, position.top);
            })
        );

        // add output box
        special.appendItem(
            new ContextMenuItem('Output box', this, () => {
                let position = {
                    left: this.appInstance.snapToGrid(
                        appInstance.viewbox.transformX(this.position.x)
                    ),
                    top: this.appInstance.snapToGrid(
                        appInstance.viewbox.transformY(this.position.y)
                    )
                };

                appInstance.newOutput(position.left, position.top);
            })
        );

        this.appendItem(special);

        // list of gates that can be added
        const gates = Gate.validGates;
        let gateList = new ContextMenuItem('New gate', this, appInstance);
        for (const name of gates) {
            gateList.appendItem(new GateMenuItem(name, this));
        }
        this.appendItem(gateList);

        // more options will be added in the getLibrary() callback below
        let networkList = new ContextMenuItem('Add a network', this);
        networkList.appendItem(
            new ContextMenuItem('Paste a network', this, () => {
                this.displayImportDialog();
            })
        );
        this.appendItem(networkList); // always append

        let blackboxList = new ContextMenuItem('Add a blackbox', this); // appends only if contains items (see the callback)

        // network import (blackbox, network)
        getLibrary()
            .then(networks => {
                for (const { name, file, hasTable, hasNetwork } of networks) {
                    // add a network as a blackbox
                    if (hasTable) {
                        blackboxList.appendItem(new BlackboxMenuItem(name, file, this));
                    }

                    // load a network as a network of components connected with wires
                    if (hasNetwork) {
                        networkList.appendItem(new NetworkMenuItem(name, file, this));
                    }
                }

                if (blackboxList.length > 0) {
                    this.appendItem(blackboxList);
                }
            })
            .catch(error => {
                console.error(error);
            });

        // add conditional items for box and wire removal
        this.appendConditionalItem('box', 'Remove this item', id => {
            this.appInstance.removeBox(id);
        });
        this.appendConditionalItem('wire', 'Remove this wire', id => {
            this.appInstance.removeWireById(id);
        });

        // add the context menu to the DOM
        appInstance.$svg.before(this.$el);

        /**
         * Number of items in this menu (used in the .lenght getter). Conditional items do not count.
         * @type {Number}
         */
        this.itemCount = 0;
    }

    get length() {
        return this.itemCount;
    }

    /**
     * append a context menu item to the context menu
     * @param  {ContextMenuItem} item instance of {@link ContextMenuItem} that will be added to this menu
     */
    appendItem(item) {
        this.$el.append(item.jQuery);

        this.itemCount++;

        return item;
    }

    /**
     * appends an connditional item (that is shown only if the target has the class itemClass)
     * @param  {string} itemClass     show the item only if the target has this class
     * @param  {string} text          text of this menu item
     * @param  {Function} clickFunction function with one argument (ID of the target) that will be called on click
     */
    appendConditionalItem(itemClass, text, clickFunction) {
        if (!this.conditionalItems) {
            this.conditionalItems = [];
        }

        this.conditionalItems[this.conditionalItems.length] = {
            itemClass: itemClass,
            text: text,
            clickFunction: clickFunction
        };
    }

    /**
     * display the dialog for importing a network from a clipboard
     */
    displayImportDialog() {
        let $popup = $('<div>')
            .addClass('importExport')
            .addClass('import');

        let textareaId = 'importJSON';
        let $textblock = $('<textarea>').attr('id', textareaId);

        let lityInstance;

        $popup.append($textblock).append(
            $('<a>')
                .attr({
                    href: '#',
                    class: 'upload'
                })
                .append($('<img>').attr('src', 'img/gui/import.svg'))
                .append(' import from JSON')
                .on('click', () => {
                    let data;

                    try {
                        data = JSON.parse($('#' + textareaId).val());
                    } catch (e) {
                        this.appInstance.messages.newErrorMessage(
                            'The imported file is not a valid JSON file.'
                        );
                        lityInstance.close();
                    }

                    if (data) {
                        // proccess the imported data
                        this.appInstance
                            .importData(
                                data,
                                Math.round(
                                    this.appInstance.viewbox.transformX(this.position.x) /
                                        this.appInstance.gridSize
                                ),
                                Math.round(
                                    this.appInstance.viewbox.transformY(this.position.y) /
                                        this.appInstance.gridSize
                                )
                            )
                            .then(warnings => {
                                for (const warning of warnings) {
                                    this.appInstance.messages.newWarningMessage(warning);
                                }
                            })
                            .finally(() => {
                                lityInstance.close();
                            });
                    }
                })
        );

        lityInstance = lity($popup);

        // focus on the textblock
        $textblock.focus();
    }

    /**
     * decide whether or not to display specific conditional items
     * @param  {jQuery.element} $target jQuery target of a MouseEvent (element that user clicked on)
     */
    resolveConditionalItems($target) {
        for (let item of this.conditionalItems) {
            if ($target.hasClass(item.itemClass)) {
                this.appendItem(
                    new ContextMenuItem(item.text, this, () => {
                        item.clickFunction($target.attr('id'));
                    })
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

        this.resolveConditionalItems($target);

        this.$el
            .css({
                display: 'block',
                top: y,
                left: x
            })
            // set the width expicitly, or else the menu will widen when displaying a submenu
            // 2 is to prevent a weird text wrap bug
            .css('width', 'auto')
            .css('width', this.$el.innerWidth() + 2);
    }

    /**
     * hide the context menu
     */
    hide() {
        this.$el.css({ display: 'none' });
        $('.subList').css({ display: 'none' });
        this.hideAllConditionalItems();
    }
}
