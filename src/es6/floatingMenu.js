import {
    exportNetwork,
    importNetwork
} from "./importExport.js";

/**
 * FloatingButton represents a button that is used in the floating menu in the right bottom corner
 * of the application. It may have a custom tooltip and callback on the click event
 */
class FloatingButton {
    /**
     * @param {string} buttonClass Custom string that identifies the SVG icon used on this button. This string is also added as a CSS class to the button.
     * @param {string} title       alternative title for the button
     * @param {string} tooltip     tooltip for the button, that will be displayed on hover
     * @param {Function} clickEvent  custom callback when user clicks the button
     * @param {Canvas} parentSVG   reference to the parent SVG element
     */
    constructor(buttonClass, title, tooltip, clickEvent, parentSVG) {
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
            .attr("alt", title)
            .attr("title", title)
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
                console.log('display tooltip for', title)
            }, () => {
                this.$tooltip.fadeOut(200);
                console.log('hide tooltip for', title)
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

        /* IMPORT */

        // here will be the instance of Lity stored
        // (we need to store it, because the "import" button also closes Lity)
        let lityInstanceImport;

        this.append(
            new FloatingButton("import", "Import a network", "Import a network", () => {
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
                        let $textarea = $('#' + textareaId);

                        // get textarea contents
                        let importString = $textarea.val();

                        // close Lity
                        lityInstanceImport.close();

                        // proccess the imported data
                        new importNetwork(parentSVG, importString);
                    })
                );

                lityInstanceImport = lity($popup);

                // focus on the textblock
                $textblock.focus();
            }, parentSVG)
        );

        /* EXPORT */
        this.append(
            new FloatingButton("export", "Export this network", "Get code for this network", () => {
                const data = new exportNetwork(parentSVG);

                // create the popup container holding all popup content (that will be passed to lity)
                let $popup = $("<div>")
                    .addClass("importExport")
                    .addClass("export");

                // generate the block with code to be displayed and append it to the popup element
                const $textblock = $("<textarea>").text(data.json(exportNetwork.style.pretty))

                $popup.append($textblock);

                // generate the links
                $popup.append(
                    $("<a>").attr({
                        "href": data.json(exportNetwork.style.pretty, true),
                        "class": "download",
                        "download": "network.json"
                    }).append(
                        $("<img>").attr('src', "img/gui/export.svg")
                    ).append(" expanded JSON")
                );
                $popup.append(
                    $("<a>").attr({
                        "href": data.json(exportNetwork.style.compact, true),
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

        let help = new FloatingButton(
            "help", "Display help",
            "Display a help page", false, parentSVG);
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
