import Id from './id'

/**
 * Parent class for all svgObjects
 */
class Tag {
    /**
     * @param {string} tagName SVG tag identifier (`rect`, `image`, `polyline`)
     */
    constructor(tagName) {
        /**
         * SVG tag identifier (`rect`, `image`, `polyline`)
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
        this.$el.addClass(name);
    }

    /**
     * remove class names from this element
     * @param  {string} classes class names to be removed
     */
    removeClasses(...classes) {
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

/**
 * represents visible element in SVG that has position and dimensions (for example `rectangle` is a SvgElement, but `pattern` is not, even though both are tags)
 * @extends Tag
 */
class SvgElement extends Tag {
    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width in SVG pixels
     * @param {number} h       height in SVG pixels
     * @param {string} tagName tag name of the element
     */
    constructor(x, y, w, h, tagName) {
        super(tagName);

        this.addAttr({
            x: x,
            y: y,
            width: w,
            height: h
        });
    }
}

/**
 * a rectangle in SVG
 * @extends SvgElement
 */
export class Rectangle extends SvgElement {
    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width in SVG pixels
     * @param {number} h       height in SVG pixels
     * @param {string} fill    filling color of the rectangle
     * @param {string} stroke  stroke color of the rectangle
     */
    constructor(x, y, w, h, fill, stroke) {
        super(x, y, w, h, "rect");
        this.addAttr({
            fill: fill,
            stroke: stroke,
            'stroke-width': 0.5,
            'pointer-events': 'all' // to trigger hover even with transparent background
        });
    }
}

/**
 * an image in SVG
 * @extends SvgElement
 */
export class SvgImage extends SvgElement {
    constructor(x, y, w, h, url) {
        super(x, y, w, h, "image");
        this.addAttr({
            "xlink:href": url
        });
    }

    /**
     * change url of the image
     * @param {string} url the new url of the image
     */
    changeUrl(url) {
        this.addAttr({
            "xlink:href": url
        });
    }
}

/**
 * SVG group, used for grouping elements, for example a gate is represented by many elements (rectangle, image, inivisible hitbox rectangle...),
 * but all of the elements need to be transformed together. Using groups the transform property can be set on the group which contains all the elements.
 * @extends Tag
 */
export class Group extends Tag {
    constructor() {
        super("g");
    }

    /**
     * add an element to the group
     * @param {SvgElement} el an instance of {@link SvgElement}
     */
    addChild(el) {
        this.$el.append(el.$el);
        return el; // pro jednodussi "let rect = g.addChild(new Rectangle(..."
    }
}

/**
 * one point of {@link PolylinePoints}, used in the {@link PolyLine} object
 */
export class PolylinePoint {
    /**
     * @param {number} x horizontal coordinate of the polyline point
     * @param {number} y vertical coordinate of the polyline point
     */
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        if(x !== undefined && y !== undefined) {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * change the coordinates of this point
     * @param {number} x horizontal coordinate of the polyline point
     * @param {number} y vertical coordinate of the polyline point
     */
    set(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * create polyline from a comma separated string (e.g. from a string formatted like this: "x,y", for example "15,8")
     * @param  {string} string string in the format "x,y" representing a point in the SVG polyline
     * @return {PolylinePoint} newly created instance of {@link PolylinePoint}
     */
    static parseFromString(string) {
        let arr = string.split(",");
        return new PolylinePoint(arr[0], arr[1]);
    }

    /**
     * return a string representation of this polyline point
     * @return {string} string in the format "x,y"
     */
    get string() {
        return this.x + "," + this.y;
    }

    /**
     * compare polyline points, return `true` if they are equal, else return `false`
     * @param  {PolylinePoint} a
     * @param  {PolylinePoint} b
     * @return {boolean}
     */
    static equals(a, b) {
        return a.x === b.x && a.y === b.y;
    }
}

/**
 * array-like structure used in {@link PolylinePoints}
 */
class SmartArray {
    /**
     * @param {Array} [arr] if set, initialized SmartArray will contain these values
     */
    constructor(arr) {
        if(arr !== undefined) {
            this.arr = arr;
        } else {
            this.arr = [];
        }
    }

    /**
     * get a deep copy of this array
     * @return {SmartArray}
     */
    copy() {
        return SmartArray($.extend(true, [], this.arr));
    }

    /**
     * append an item to the array
     * @param item new item that will be appended to the array
     */
    append(item) {
        return this.addWithIndex(item, this.arr.length);
    }

    /**
     * prepend an item to the array
     * @param item new item that will be prepended to the array
     */
    prepend(item) {
        return this.addWithIndex(item, 0);
    }

    /**
     * add a new item at the specified index, move all following items
     * @param item new item that will be added at the specified index
     * @param {number} index index of this item
     */
    addWithIndex(item, index) {
        for(let i = this.arr.length ; i > index ; --i) {
            this.arr[i] = this.arr[i-1];
        }
        this.arr[index] = item;
        return this; // to enable chaining of append / preppend / addWithIndex commands
    }

    /**
     * get length of the array
     * @return {number}
     */
    get length() {
        return this.arr.length;
    }

    /**
     * get item by index
     * @param  {number} index index of the item
     * @return contents of the array on the specified index
     */
    getItem(index) {
        return this.arr[index];
    }

    /**
     * @return last element of the array
     */
    get last() {
        if(this.length!==0) {
            return this.arr[this.length - 1];
        } else {
            return false;
        }
    }

    /**
     * @return first element of the array
     */
    get first() {
        if(this.length!==0) {
            return this.arr[0];
        } else {
            return false;
        }
    }

    /**
     * remove an item from the array by index
     * @param  {number} index index of the item that will be removed
     */
    remove(index) {
        let length = this.length;

        for(let i = index ; i < length ; ++i) {
            this.arr[i] = this.arr[i + 1];
        }
        this.arr.pop();
    }
}

/**
 * points of the {@link PolyLine}
 * @extends SmartArray
 */
export class PolylinePoints extends SmartArray {
    /**
     * @param {Array} [arr] array containing instances of {@link PolylinePoint}
     */
    constructor(arr) {
        super(arr);
    }

    /**
     * get a deep copy of this object
     * @return {PolylinePoints}
     */
    copy() {
        return new PolylinePoints($.extend(true, [], this.arr));
    }

    /**
     * append a point
     * @param  {PolylinePoint} point a new point
     */
    append(point) {
        // call inherited function to handle the appending
        super.append(point);

        // if the second to last point is unnecessary, remove it
        let length = this.length;
        if ( length >= 3
                && (    ( this.getItem(length - 3).x === this.getItem(length - 2).x &&
                          this.getItem(length - 2).x === this.getItem(length - 1).x )
                     || ( this.getItem(length - 3).y === this.getItem(length - 2).y &&
                          this.getItem(length - 2).y === this.getItem(length - 1).y )
                   )
           )
        {
            this.remove(length - 2);
        }

        // return this element (to allow chaining)
        return this;
    }

    /**
     * parse polyline from string
     * @param  {string} string string in the polyline format (`x1,y1 x2,y2, x3,y3`)
     * @return {PolylinePoints} a new instance of {@link PolylinePoints} created by parsing the string
     */
    static parseFromString(string) {
        let pointStrings = string.split(" ");
        let points = new PolylinePoints();

        for(let i = 0 ; i < pointStrings.length ; ++i) {
            points.append(PolylinePoint.parseFromString(pointStrings[i]));
        }

        return points;
    }

    /**
     * get a string representation of this polyline
     * @return {string} string in the polyline format (`x1,y1 x2,y2, x3,y3`)
     */
    get string() {
        let string = "";
        for(let i = 0 ; i < this.length ; ++i) {
            if(i !== 0) {
                string += " ";
            }
            string += this.arr[i].string;
        }
        return string;
    }

    /**
     * wrapper for foreach on the polyline points
     * @param  {Function} func function that will be called on each element
     */
    forEach(func) {
        for(let i = 0 ; i < this.arr.length ; ++i) {
            func(this.arr[i]);
        }
    }
}

/**
 * SVG polyline (a path defined by sequence of points on plane)
 * @extends Tag
 */
export class PolyLine extends Tag {
    /**
     * @param {PolylinePoints} points points describing this polyline
     * @param {string} color CSS color of this polyline
     * @param {number} strokeWidth width of the stroke for this polyline in SVG pixels
     */
    constructor(points, color, strokeWidth) {
        super("polyline");

        this.addAttr({
            points: points.string,
            stroke: color,
            fill: "none",
            "stroke-width": strokeWidth
        });
    }

    /**
     * update points of this polyline
     * @param {PolylinePoints} points new set of points describing this polyline
     */
    updatePoints(points) {
        this.addAttr({
            points: points.string
        });
    }
}

/**
 * Text element in SVG
 * @extends Tag
 */
export class Text extends Tag {
    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width of the text box in SVG pixels
     * @param {number} h       height of the text box in SVG pixels
     * @param {number} text    text content of the text box
     * @param {string} size    CSS font size of the text
     * @param {String} [color="black"] color of the text
     *
     */
    constructor(x, y, w, h, text, size, color = "black") {
        super("text");
        this.addAttr({
            x: x,
            y: y,
            width: w,
            height: h,
            fill: color
        });

        if(size) {
            this.addAttr({
                'font-size': size
            })
        }

        this.$el.append(text);
    }
}

/**
 * Multi line text element in SVG
 *
 * Multi line text is not natively supportend in SVG 1.1,
 * the workaround is to use the <foreignObject> element and display
 * a HTML paragraph inside of the SVG document.
 *
 * Because this technique is not supported by all of the browsers,
 * the foreignObject element is wrapped in <switch>, which
 * provides fallback for those cases.
 *
 * read more: [foreignObject on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject)
 *
 * @extends Tag
 */
export class MultiLineText extends Tag {
    /**
     * @param {number} x       horizontal position in SVG pixels
     * @param {number} y       vertical position in SVG pixels
     * @param {number} w       width of the text box in SVG pixels
     * @param {number} h       height of the text box in SVG pixels
     * @param {number} text    text content of the text box
     * @param {string} size    CSS font size of the text
     * @param {String} [color="black"] color of the text
     *
     */
    constructor(x, y, w, h, text, size, color = "black") {
        super("switch");

        let foreignObject = new Tag("foreignObject");
        let alternativeText = new Text(x, y, w, h, text, size, color);

        foreignObject.addAttr({
            x,
            y,
            width: w,
            height: h
        });

        foreignObject.$el.append(
            $(`<p class="multilinetext" xmlns="http://www.w3.org/1999/xhtml" style="font-size:${size}px">`).append(text)
        )

        this.$el.append(
            foreignObject.$el
        ).append(
            alternativeText.$el
        )
    }

}

/**
 * pattern object in SVG
 * @extends Tag
 */
export class Pattern extends Tag {
    /**
     * @param {string} id     unique id of this pattern
     * @param {number} width  width of one pattern tile in SVG pixels
     * @param {number} height height of one pattern tile in SVG pixels
     */
    constructor(id, width, height) {
        super("pattern");

        this.addAttr({
            id: id,
            x: 0,
            y: 0,
            width: width,
            height: height,
            patternUnits: "userSpaceOnUse",
            viewBox: "0 0 "+width+" "+height
        });
    }

    /**
     * add a child to this pattern
     *
     * pattern behaves a little like {@link Group} - it contains child elements, which represent the content of one tile of the pattern
     * and the whole package of the child elements is repeated on each tile of the pattern
     * @param {SvgElement} el element that will be added to the pattern
     */
    addChild(el) {
        this.$el.append(el.$el);
        return el;
    }
}
