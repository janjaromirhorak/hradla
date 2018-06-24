import { getJSONString } from "../other/helperFunctions";

/**
 * FloatingButton represents a button that is used in the floating menu in the right bottom corner
 * of the application. It may have a custom tooltip and callback on the click event
 */
class FloatingButton {
    /**
     * @param {string} buttonClass Custom string that identifies the SVG icon used on this button. This string is also added as a CSS class to the button.
     * @param {string} tooltip     tooltip for the button, that will be displayed on hover and also used as alternative title for the image
     * @param {Function} clickEvent  custom callback when user clicks the button
     * @param {App} appInstance   reference to the parent SVG element
     */
    constructor(buttonClass, tooltip, clickEvent, appInstance) {
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

            appInstance.$svg.after(this.$tooltip);

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
     * @param {App} appInstance reference to the App element this menu is associated with
     */
    constructor(appInstance) {
        /**
         * the jQuery element containing all buttons
         * @type {jQuery.element}
         */
        this.$el = $('<div>')

        const id = 'floatingMenu';

        this.$el.attr("id", id);

        // const $loader = $("<div>").addClass("loader").addClass("hidden");


        /* EXPORT */
        this.append(
            new FloatingButton("export", "Get code for this network", () => {
                // create the popup container holding all popup content (that will be passed to lity)
                let $popup = $("<div>")
                    .addClass("importExport")
                    .addClass("export");

                // generate the block with code to be displayed and append it to the popup element
                const $textblock = $("<textarea>").text(
                    getJSONString(appInstance.exportData, true)
                )

                $popup.append($textblock);

                // generate the links
                $popup.append(
                    $("<a>").attr({
                        "href": getJSONString(appInstance.exportData, true, true),
                        "class": "download",
                        "download": "network.json"
                    }).append(
                        $("<img>").attr('src', "img/gui/export.svg")
                    ).append(" expanded JSON")
                );
                $popup.append(
                    $("<a>").attr({
                        "href": getJSONString(appInstance.exportData, false, true),
                        "class": "download",
                        "download": "network.min.json"
                    }).append(
                        $("<img>").attr('src', "img/gui/export.svg")
                    ).append(" compact JSON")
                );

                lity($popup);

                // highlight the text in the textblock
                $textblock.select();
            }, appInstance)
        );

        /* Tutorial */
        this.append(
            new FloatingButton("tutorial", "Start the tutorial", () => {
                appInstance.startTutorial();
            }, appInstance)
        );

        appInstance.$svg.after(this.$el);

        /* HELP */

        let help = new FloatingButton("help", "Display a help page", false, appInstance);
        help.$el.attr({
            'href': './docs/user.html',
            'data-lity': ''
        });
        this.append(help);

        appInstance.$svg.after(this.$el);
    }

    /**
     * append a FloatingButton to this menu
     * @param  {FloatingButton} menuItem append an instance of  {@link FloatingButton} to this menu
     */
    append(menuItem) {
        this.$el.append(menuItem.$el);
    }
}
