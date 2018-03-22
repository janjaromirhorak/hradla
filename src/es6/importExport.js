"use strict";

export class exportNetwork {
    constructor(parentSVG) {
        this.parentSVG = parentSVG;
    }

    get exportData() {
        return this.parentSVG.exportData;
    }

    json(style = exportNetwork.style.compact, dataUri = false) {
        if(dataUri) {
            return 'data:application/json;charset=utf-8,'
                + encodeURIComponent(this.json(style));
        } else {
            switch (style) {
                case exportNetwork.style.compact:
                    return JSON.stringify(this.exportData);
                case exportNetwork.style.pretty:
                    return JSON.stringify(this.exportData, null, 2);
            }
        }
    }

    static get style() {
        return {
            pretty: 0,
            compact: 1
        }
    };
}
