import { getJSONString } from "./helperFunctions.js";

import {
    getLibrary,
    getNetworkFromLibrary
} from './networkLibrary.js';

/**
 * FloatingButton represents a button that is used in the floating menu in the right bottom corner
 * of the application. It may have a custom tooltip and callback on the click event
 */
class FloatingButton {
    /**
     * @param {string} buttonClass Custom string that identifies the SVG icon used on this button. This string is also added as a CSS class to the button.
     * @param {string} tooltip     tooltip for the button, that will be displayed on hover and also used as alternative title for the image
     * @param {Function} clickEvent  custom callback when user clicks the button
     * @param {Canvas} parentSVG   reference to the parent SVG element
     */
    constructor(buttonClass, tooltip, clickEvent, parentSVG) {
        /**
         * jQuery element representing the button
         * @type {jQuery.element}
         */
        this.$el = $('<a>')

        // add classes to the element
        this.$el.addClass("button");
        this.$el.addClass(buttonClass);

        // add the icon
        this.$el.append(
            $("<img>")
            .attr("src", `img/gui/${buttonClass}.svg`)
            .attr("alt", tooltip)
        );

        // add the tooltip element and an event listener if tooltip is defined
        if (tooltip) {
            /**
             * jQuery element representing the tooltip
             * @type {jQuery.element}
             */
            this.$tooltip = $("<div>");
            this.$tooltip
                .addClass("tooltip")
                .html(tooltip);

            parentSVG.$svg.after(this.$tooltip);

            this.$el.hover(() => {
                this.$tooltip.fadeIn(200);
            }, () => {
                this.$tooltip.fadeOut(200);
            });
        }

        // add an event listener on click, if the callback function is defined
        if (clickEvent) {
            this.$el.on("click", clickEvent);
        }
    }
}

/** @module FloatingMenu */
/**
 * Class to represent the floating menu in the right bottom corner of the page.
 * It instantiates all the buttons and their callbacks.
 */
export default class FloatingMenu {
    /**
     * @param {Canvas} parentSVG reference to the Canvas element this menu is associated with
     */
    constructor(parentSVG) {
        /**
         * the jQuery element containing all buttons
         * @type {jQuery.element}
         */
        this.$el = $('<div>')

        const id = 'floatingMenu';

        this.$el.attr("id", id);

        // const $loader = $("<div>").addClass("loader").addClass("hidden");

        /* IMPORT */

        // here will be the instance of Lity stored
        // (we need to store it, because the "import" button also closes Lity)
        let lityInstance;

        this.append(
            new FloatingButton("import", "Import a network from a file", () => {
                let $popup = $("<div>")
                    .addClass("importExport")
                    .addClass("import");

                let textareaId = "importJSON";
                let $textblock = $("<textarea>").attr('id', textareaId);

                $popup.append(
                    $textblock
                ).append(
                    $("<a>").attr({
                        "href": "#",
                        "class": "upload"
                    })
                    .append(
                        $("<img>").attr('src', "img/gui/import.svg")
                    )
                    .append(" import from JSON")
                    .on('click', () => {
                        // $popup.children().addClass("hidden");
                        // $loader.removeClass("hidden");

                        const data = JSON.parse($('#' + textareaId).val());

                        // proccess the imported data
                        parentSVG.importData(data).then(() => {
                            // close Lity
                            lityInstance.close();
                        })
                    })
                );

                lityInstance = lity($popup);

                // focus on the textblock
                $textblock.focus();
            }, parentSVG)
        );

        /* EXPORT */
        this.append(
            new FloatingButton("export", "Get code for this network", () => {
                // create the popup container holding all popup content (that will be passed to lity)
                let $popup = $("<div>")
                    .addClass("importExport")
                    .addClass("export");

                // generate the block with code to be displayed and append it to the popup element
                const $textblock = $("<textarea>").text(
                    getJSONString(parentSVG.exportData, true)
                )

                $popup.append($textblock);

                // generate the links
                $popup.append(
                    $("<a>").attr({
                        "href": getJSONString(parentSVG.exportData, true, true),
                        "class": "download",
                        "download": "network.json"
                    }).append(
                        $("<img>").attr('src', "img/gui/export.svg")
                    ).append(" expanded JSON")
                );
                $popup.append(
                    $("<a>").attr({
                        "href": getJSONString(parentSVG.exportData, false, true),
                        "class": "download",
                        "download": "network.min.json"
                    }).append(
                        $("<img>").attr('src', "img/gui/export.svg")
                    ).append(" compact JSON")
                );

                lity($popup);

                // highlight the text in the textblock
                $textblock.select();
            }, parentSVG)
        );

        /* HELP */

        let help = new FloatingButton("help", "Display a help page", false, parentSVG);
        help.$el.attr({
            'href': './docs/user.html',
            'data-lity': ''
        });
        this.append(help);

        parentSVG.$svg.after(this.$el);
    }

    /**
     * append a FloatingButton to this menu
     * @param  {FloatingButton} menuItem append an instance of  {@link FloatingButton} to this menu
     */
    append(menuItem) {
        this.$el.append(menuItem.$el);
    }
}
