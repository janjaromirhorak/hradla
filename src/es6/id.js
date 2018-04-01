/** @module Id */

/**
 * the current instance of Id
 * @type {Id}
 */
let existingIdInstance;

/**
 * singleton to generate unique id's
 *
 * usage: `let id = new Id().unique`
 */
export default class Id {
    constructor() {
        if(!existingIdInstance){
            existingIdInstance = this;
        }

        /**
         * prefix for the id, that is common in all the Ids
         * @type {String}
         */
        this.prefix = "id";

        /**
         * numeric part of the next id (the next id without the prefix)
         * @type {number}
         */
        this.nextId = 0;

        return existingIdInstance;
    }

    /**
     * get unique ID
     * @return {string} new unique ID
     */
    get unique() {
        let retVal = this.prefix + this.nextId;

        // find next unused idXXXX to prevent id collision that might be caused by some other component
        // (it really should not happen, but this is a simple way to ensure it)
        while($("#"+retVal).length) {
            this.nextId++;
            retVal = this.generate();
        }
        // return this id
        this.nextId++;

        return retVal;
    }
}
