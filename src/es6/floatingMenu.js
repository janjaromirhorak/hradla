import {
    exportNetwork,
    importNetwork
} from "./importExport.js";

class FloatingButton {
    constructor(buttonClass, title, tooltip, clickEvent, parentSVG) {
        this.$el = $('<a>')

        this.$el.addClass("button");
        this.$el.addClass(buttonClass);

        this.$el.append(
            $("<img>")
            .attr("src", `img/gui/${buttonClass}.svg`)
            .attr("alt", title)
            .attr("title", title)
        );

        if (tooltip) {
            this.$tooltip = $("<div>");
            this.$tooltip
                .addClass("tooltip")
                .addClass("hidden")
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

        if (clickEvent) {
            this.$el.on("click", clickEvent);
        }
    }
}

export default class FloatingMenu {
    constructor(parentSVG) {
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

    append(menuItem) {
        this.$el.append(menuItem.$el);
    }
}
