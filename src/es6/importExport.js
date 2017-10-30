"use strict";

export class exportNetwork {
    constructor(parentSVG) {
        this.parentSVG = parentSVG;
    }

    get exportData() {
        return this.parentSVG.exportData;
    }

    get json() {
        return JSON.stringify(this.exportData);
    }
}