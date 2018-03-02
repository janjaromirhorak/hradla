import {exportNetwork, importNetwok} from "./importExport.js";

class jqueryElement {
    constructor(specificTag) {
        if(!specificTag) {
            this.$el = $("<div>");
        } else {
            this.$el = $("<" + specificTag + ">")
        }
    }
}

// const mouseIcon =
//     "<svg class=\"mouseIcon\" xmlns=\"http://www.w3.org/2000/svg\" height=\"121.77131mm\" width=\"82.327583mm\" version=\"1.1\" viewBox=\"0 0 291.71191 431.47314\">" +
//     "<g transform=\"translate(-202.70908,-260.9232)\">\n" +
//     "            <path d=\"m202.81108 443.50667c-0.1257 11.05683 0.0651 12.12915 0.0528 23.09375 1.0404 39.29165-4.03281 79.5842 8.81441 117.56836 17.52602 58.00742 70.7612 107.07793 133.12907 108.11719 60.80448 2.61247 115.80638-41.48912 136.65249-96.93555 15.21942-34.70561 12.7447-72.82638 12.834-109.72266-0.40356-17.24905 0.27452-24.7329 0.0879-42.12109h-291.57066z\"/>\n" +
//     "            <path class=\"left\" d=\"m335.67788 260.93032c-58.6525 0.65566-99.6319 43.51386-120.0821 96.99219-10.5505 24.06012-12.5935 41.77797-12.8867 67.58203h135.7832v-164.57226c-0.006 0.00008-0.0117-0.00008-0.0176 0-0.9347-0.011-1.8658-0.0124-2.7968-0.002z\"/>\n" +
//     "            <path class=\"right\" d=\"m361.46787 260.92993c-0.94207-0.01-1.8864-0.009-2.83203 0.004v164.57226h135.78516c-0.26257-24.46948-2.2521-40.74823-11.50391-63.90243-19.34709-55.03225-61.73043-100.04525-121.44922-100.67383z\"/>\n" +
//     "            <path class=\"middle\" d=\"m348.56504 294.93365c15.03714 0 27.14286 12.10572 27.14286 27.14286v40c0 15.03714-12.10572 27.14286-27.14286 27.14286s-27.14286-12.10572-27.14286-27.14286v-40c0-15.03714 12.10572-27.14286 27.14286-27.14286z\" stroke=\"#fff\" stroke-linecap=\"round\" stroke-width=\"20\"/>\n" +
//     "        </g>" +
//     "</svg>";

class helpWindowItem extends jqueryElement {
    constructor(text) {
        super();

        this.$el.addClass("helpWindowItem");
        this.$el.html(text);
    }
}

class helpWindow extends jqueryElement {
    constructor() {
        super();

        this.$el.attr("id", "help");

        this.append(new helpWindowItem("<strong>main menu</strong>: right click"));
        this.append(new helpWindowItem("drag and drop to <strong>move elements</strong>"));
        this.append(new helpWindowItem("<strong>middle click</strong> to rotate elements"));
        this.append(new helpWindowItem("<strong>click <img src='img/gui/help.svg' class='helpicon' alt='help icon'></strong> to display documentation (in czech)"));
    }

    append(item) {
        this.$el.append(item.$el);
    }
}


class floatingMenuItem extends jqueryElement {
    constructor(specificClass, icon, title, specificTag) {
        super(specificTag);

        this.$el.addClass("button");
        this.$el.addClass(specificClass);

        this.$el.append(
            $("<img>")
                .attr("src", "img/gui/" + icon + ".svg")
                .attr("alt", title)
                .attr("title", title)
        );
    }
}

export default class floatingMenu extends jqueryElement {
    constructor(parentSVG) {
        super();

        const id = 'floatingMenu';

        this.$el.attr("id", id);

        /* IMPORT */

        // here will be the instance of Lity stored
        // (we need to store it, because the "import" button also closes Lity)
        let lityInstanceImport;

        let importButton = new floatingMenuItem("import", "import", "Import a network", "a");
        importButton.$el.on("click", () => {
            let $popup = $("<div>")
                .addClass("importExport")
                .addClass("import");

            let textareaId = "importJSON";

            $popup.append(
                $("<textarea></textarea>").attr('id', textareaId)
            ).append(
                $("<a>")
                    .attr({
                        "href": "#",
                        "class": "upload"
                    })
                    .append(
                        $("<img>").attr('src', "img/gui/import.svg")
                    )
                    .append(" import from JSON")
                    .on('click', () => {
                        let $textarea = $('#'+textareaId);

                        // get textarea contents
                        let importString = $textarea.val();

                        // close Lity
                        lityInstanceImport.close();

                        // proccess the imported data
                        new importNetwok(parentSVG, importString);
                    })
            );

            lityInstanceImport = lity($popup);
        });

        this.append(importButton);

        /* EXPORT */

        let exportButton = new floatingMenuItem("export", "export", "Export this network", "a");
        exportButton.$el.on("click", () => {
            let data = new exportNetwork(parentSVG);

            // create the popup container holding all popup content (that will be passed to lity)
            let $popup = $("<div>")
                .addClass("importExport")
                .addClass("export");

            // generate the block with code to be displayed and append it to the popup element
            $popup.append(
                $("<pre>").append(
                    $("<code>")
                        .text(
                            data.json(exportNetwork.style.pretty)
                        )
                )
            );

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
        });

        this.append(exportButton);

        /* HELP */

        let help = new floatingMenuItem("help", "help", "Display help", "a");
        help.$el.on("mouseover", () => {
            $("#help").addClass("visible");
        }).on("mouseout", () => {
            $("#help").removeClass("visible");
        });

        help.$el.attr({
            'href': './docs/',
            'data-lity': ''
        });
        this.append(help);

        parentSVG.$svg.after(this.$el);
        parentSVG.$svg.after(new helpWindow().$el);
    }

    append(menuItem) {
        this.$el.append(menuItem.$el);
    }
}
