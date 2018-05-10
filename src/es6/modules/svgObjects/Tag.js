import Id from '../other/id'

/** @module svgObjects.Tag */

/**
 * Parent class for all svgObjects
 */
export default class Tag {
    /**
     * @param {string} tagName SVG tag identifier (`rect`, `image`, `PolyLine`)
     */
    constructor(tagName) {
        /**
         * SVG tag identifier (`rect`, `image`, `PolyLine`)
         * @type {string}
         */
        this.tagName = tagName;

        /**
         * jQuery element for this tag
         * @type {jQuery.element}
         */
        this.$el = $("<"+this.tagName+">");

        /**
         * unique ID of this SVG object
         * @type {string}
         */
        this.id = new Id().unique;
    }

    /**
     * add a class to this element
     * @param {string} name class name to be added
     */
    addClass(name) {
        this.checkIfElementExistsInDOM();

        this.$el.addClass(name);
    }

    /**
     * remove class names from this element
     * @param  {string} classes class names to be removed
     */
    removeClasses(...classes) {
        this.checkIfElementExistsInDOM();

        for(let item of classes) {
            this.$el.removeClass(item);
        }
    }

    /**
     * set attributes of this element
     * @param {Object} assoc javascript object that will be mapped into attributes (`{key: value}` -> `key="value"`)
     */
    addAttr(assoc) {
        this.checkIfElementExistsInDOM();

        // add attributes to the element
        this.$el.attr(assoc);
    }

    /**
     * get attribute value by name
     * @param  {string} name name of the attribute
     * @return {string}      value of the attribute
     */
    getAttr(name) {
        this.checkIfElementExistsInDOM();

        return this.$el.attr(name);
    }

    /**
     * remove attribute by value
     * @param  {string} name name of the attribute to be removed
     */
    removeAttr(name) {
        this.checkIfElementExistsInDOM();

        this.$el.removeAttr(name);
    }

    /**
     * set id of this SVG object
     * @param  {string} id new id for this object
     */
    set id(id) {
        this.addAttr({"id": id});
    }

    /**
     * get id of this SVG object
     * @return {string}
     */
    get id() {
        return this.getAttr("id");
    }

    /**
     * get jQuery element for this SVG object
     * @return {jQuery.element}
     */
    get() {
        this.checkIfElementExistsInDOM();
        return this.$el;
    }

    /**
     * check if the element exists in dom, if so, refetch it from DOM using jQuery
     */
    checkIfElementExistsInDOM() {
        let $jqElement = $("#"+this.$el.attr('id'));
        if($jqElement.length) {
            this.$el = $jqElement;
        }
    }
}
