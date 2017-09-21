import * as Structures from './structuresAndClasses.js'

class Tag {
    constructor(tagName) {
        this.tagName = tagName;

        this.$el = $("<"+this.tagName+">");

        this.id = new Structures.Id().unique;
    }

    addClass(name) {
        this.$el.addClass(name);
    }

    removeClasses(...classes) {
        for(let item of classes) {
            this.$el.removeClass(item);
        }
    }

    addAttr(assoc) {
        this.checkIfElementExistsInDOM();

        // add attributes to the element
        this.$el.attr(assoc);
    }

    getAttr(name) {
        this.checkIfElementExistsInDOM();

        return this.$el.attr(name);
    }

    removeAttr(name) {
        this.checkIfElementExistsInDOM();

        this.$el.removeAttr(name);
    }

    set id(id) {
        this.addAttr({"id": id});
    };

    get id() {
        return this.getAttr("id");
    };

    get() {
        this.checkIfElementExistsInDOM();
        return this.$el;
    }

    // if the element exists in dom, we need to fetch it using jQuery
    checkIfElementExistsInDOM() {
        let $jqElement = $("#"+this.$el.attr('id'));
        if($jqElement.length) {
            this.$el = $jqElement;
        }
    }
}

class Draggable extends Tag {
    constructor(tagName) {
        super(tagName);
    }

    draggable(value) {
        this.addAttr({"draggable": value});
    }
}

class Rotatable extends Tag {
    constructor(tagName) {
        super(tagName);
    }

    rotatable(value) {
        this.addAttr({"rotatable": value});
    }
}

// there is no multiple inheritance in ES6, so I have to do something ugly like this
class DraggableRotatable extends Draggable {
    constructor(tagName) {
        super(tagName);
    }

    rotatable(value) {
        this.addAttr({"rotatable": value});
    }
}

class SvgElement extends DraggableRotatable {
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

export class Rectangle extends SvgElement {
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

export class SvgImage extends SvgElement {
    constructor(x, y, w, h, url) {
        super(x, y, w, h, "image");
        this.addAttr({
            "xlink:href": url
        });
    }

    changeUrl(url) {
        this.addAttr({
            "xlink:href": url
        });
    }
}

export class Group extends DraggableRotatable {
    constructor() {
        super("g");
    }

    addChild(el) {
        this.$el.append(el.$el);
        return el; // pro jednodussi "let rect = g.addChild(new Rectangle(..."
    }
}

export class PolylinePoint {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        if(x !== undefined && y !== undefined) {
            this.x = x;
            this.y = y;
        }
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    static parseFromString(string) {
        let arr = string.split(",");
        return new PolylinePoint(arr[0], arr[1]);
    }

    get string() {
        return this.x + "," + this.y;
    }

    static equals(a, b) {
        return a.x === b.x && a.y === b.y;
    }
}

class SmartArray {
    constructor(arr) {
        if(arr !== undefined) {
            this.arr = arr;
        } else {
            this.arr = [];
        }
    }

    copy() {
        return SmartArray($.extend(true, [], this.arr));
    }

    append(point) {
        return this.addWithIndex(point, this.arr.length);
    }

    prepend(point) {
        return this.addWithIndex(point, 0);
    }

    // add a point at the specified index, move all following items
    addWithIndex(point, index) {
        for(let i = this.arr.length ; i > index ; --i) {
            this.arr[i] = this.arr[i-1];
        }
        this.arr[index] = point;
        return this; // to enable chaining of append / preppend / addWithIndex commands
    }

    get length() {
        return this.arr.length;
    }

    getItem(index) {
        return this.arr[index];
    }

    get last() {
        if(this.length!==0) {
            return this.arr[this.length - 1];
        } else {
            return false;
        }
    }

    get first() {
        if(this.length!==0) {
            return this.arr[0];
        } else {
            return false;
        }
    }

    // indexArray must be sorted (ASC, eg. [1, 3, 4, 8])
    remove(index) {
        let length = this.length;

        for(let i = index ; i < length ; ++i) {
            this.arr[i] = this.arr[i + 1];
        }
        this.arr.pop();
    }
}

export class PolylinePoints extends SmartArray {
    constructor(arr) {
        super(arr);
    }

    copy() {
        return new PolylinePoints($.extend(true, [], this.arr));
    }

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


    static parseFromString(string) {
        let pointStrings = string.split(" ");
        let points = new PolylinePoints();

        for(let i = 0 ; i < pointStrings.length ; ++i) {
            points.append(PolylinePoint.parseFromString(pointStrings[i]));
        }

        return points;
    }

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

    forEach(func) {
        for(let i = 0 ; i < this.arr.length ; ++i) {
            func(this.arr[i]);
        }
    }
}

export class PolyLine extends Tag {
    constructor(points, color, strokeWidth) {
        super("polyline");

        this.addAttr({
            points: points.string,
            stroke: color,
            fill: "none",
            "stroke-width": strokeWidth
        });
    }

    updatePoints(points) {
        this.addAttr({
            points: points.string
        });
    }
}

export class Pattern extends Tag {
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

    addChild(el) {
        this.$el.append(el.$el);
        return el; // pro jednodussi "let rect = g.addChild(new Rectangle(..."
    }
}