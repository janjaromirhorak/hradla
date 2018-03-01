"use strict";

// singleton to generate unique id's
let existingIdInstance = null;
// usage: let id = new Id().unique
export class Id {
    constructor() {
        if(!existingIdInstance){
            existingIdInstance = this;
        }

        this.prefix = "id";
        this.nextId = 0;

        return existingIdInstance;
    }

    get unique() {
        let retVal = this.generate();

        // find next unused idXXXX to prevent id collision that might be caused by some other component
        // (it really should not happen, but this is a simple method to ensure safety)
        while($("#"+retVal).length) {
            this.nextId++;
            retVal = this.generate();
        }
        // return this id
        this.nextId++;

        return retVal;
    }

    generate() {
        return this.prefix + this.nextId;
    }
}

// to es5 compiler friendly implementation ("calling a builtin Map constructor without new is forbidden")
export class MapWithDefaultValue {
    constructor(defaultValue) {
        this.map = new Map();
        this.default = defaultValue;


    }

    get size() {
        return this.map.size;
    }

    clear() {
        return this.map.clear();
    }

    forEach(...args) {
        return this.map.forEach(...args);
    }

    get(key) {
        return this.map.get(key);
    }

    delete(key) {
        return this.map.delete(key);
    }

    set(key, value) {
        return this.map.set(key, value);
    }

    has(key) {
        return this.map.has(key);
    }

    entries() {
        return this.map.entries();
    }

    keys() {
        return this.map.keys();
    }

    values() {
        return this.map.values();
    }
}

/*
// es6 implementation
export class MapWithDefaultValue extends Map {
    constructor(defaultValue) {
        super();

        this.default = defaultValue;
    }

    get(key) {
        if(this.has(key)) {
            return super.get(key);
        } else {
            return this.default;
        }
    }
}
*/