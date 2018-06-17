/** @module editorElements.Transform */

/**
 * Helper class used by {@link Transform}.
 *
 * Represents one single property of the transform argument, for example `translate(360 150)`
 * that may be a part of longer transform argument like `transform="translate(360 150) rotate(90 30 20)"`
 */
class Property {
    /**
     * Initialize the Property object
     * @param {string} [string] string in the property format `propertyname(list of space separated values)`
     */
    constructor(string) {
        if(string!==undefined) {
            this.name = string.replace(/^[ ]*([^(]+).*/, "$1");
            this.args = string.replace(/^[^(]+\((.*)\)/, "$1").split(' ');
        }
    }

    /**
     * set or replace the name of this property
     * @param {string} name new name for this property
     */
    setName(name) {
        this.name = name;
    }

    /**
     * set arguments of this property
     * @param {array} args array of arguments
     */
    setArguments(args) {
        this.args = args;
    }

    /**
     * get string representation of the property
     * @return {string} property in the property format `name(arg1 arg2)`
     */
    get() {
        return this.name + "(" + this.args.join(" ") + ")";
    }
}

/**
 * API for manipulating the transform argument used in SVG
 */
export default class Transform {
    /**
     * Initialize the Transform object
     * @param {string} [string] string in the format of the `transform` argument in SVG, for example `translate(360 150) rotate(90 30 20)`
     */
    constructor(string) {
        /**
         * array of {@link Property} instances
         * @type {Array}
         */
        this.items = [];

        if(string!==undefined) {
            for (const item of string.split(")")) {
                if(item) { // if not empty
                    this.items.push(new Property(item + ")"));
                }
            }
        }
    }

    /**
     * convert distances from SVG pixels to grid pixels
     * @param {App} appInstance instance of [App](./module-App.html)
     */
    toGridPixels(appInstance) {
        this.pixelConversion((val) => appInstance.SVGToGrid(val))
    }

    /**
     * convert distances from grid pixels to SVG pixels
     * @param {App} appInstance instance of [App](./module-App.html)
     */
    toSVGPixels(appInstance) {
        this.pixelConversion((val) => appInstance.gridToSVG(val))
    }

    /**
     * Convert distances using a specified convertor. Used by toGridPixels and toSVGPixels
     * @param  {Function} convertor function that converts int to int
     */
    pixelConversion(convertor) {
        const propertyMap = {
            "translate": (item) => {
                item.args = item.args.map(arg => convertor(arg))
                return item;
            },
            "rotate": (item) => {
                item.args = [
                    item.args[0],
                    convertor(item.args[1]),
                    convertor(item.args[2])
                ]
                return item;
            }
        }

        this.items = this.items.map((item) => {
            return propertyMap[item.name] ? propertyMap[item.name](item) : item
        })
    }

    /**
     * find a transform property by name and get its index in the [items](#items) array
     * @param  {string} name name of the property
     * @return {number}      index of the property in the array of properties or `-1` if not found
     */
    getIndex(name) {
        for(let i = 0 ; i < this.items.length; i++) {
            if(name === this.items[i].name) {
                return i;
            }
        }

        return -1;
    }

    /**
     * get the translate property
     * @return {Object} object containing parameters of the translate attribute
     */
    getTranslate() {
        let args = this.getArguments(this.getIndex("translate"));

        return {
            x: Number(args[0]),
            y: Number(args[1])
        }
    }

    /**
     * get the rotate property
     * @return {Object} object containing parameters of the rotate attribute
     */
    getRotate() {
        let args = this.getArguments(this.getIndex("rotate"));

        return {
            deg: Number(args[0]),
            centerX: Number(args[1]),
            centerY: Number(args[2])
        }
    }

    /**
     * set translate to the specified values
     * @param {number} x horizontal translation
     * @param {number} y vertical translation
     */
    setTranslate(x, y) {
        this.setParameter("translate", [x, y]);
    }

    /**
     * set rotate to the specified values
     * @param {number} deg     angle of the rotation in degrees
     * @param {number} centerX horizontal position of the center of the rotation
     * @param {number} centerY vertical position of the center of the rotation
     */
    setRotate(deg, centerX, centerY) {
        this.setParameter("rotate", [deg, centerX, centerY]);
    }

    /**
     * rotate by 90 degrees to the right or left, depending on the parameter `right`
     * @param {number} centerX horizontal position of the center of the rotation
     * @param {number} centerY vertical position of the center of the rotation
     * @param {boolean} right rotate to the right if `true`, to the left if `false`
     */
    rotateRightAngle(centerX, centerY, right) {
        const amount = right ? 90 : 270;

        if(this.getIndex("rotate")===-1) {
            this.setRotate(amount, centerX, centerY);
        } else {
            let newRotation = (parseInt(this.getRotate().deg) + amount) % 360;

            if(newRotation===180) {
                // swap center coordinates
                // because rotate(c, x, y) is defined like transform(-x, -y) rotate(c) transform(x, y)
                let a = centerX;
                centerX = centerY;
                centerY = a;
            }

            this.setRotate(
                newRotation,
                centerX,
                centerY
            );
        }
    }

    /**
     * rotate by 90 degrees to the right
     * @param  {number} centerX horizontal position of the center of the rotation
     * @param  {number} centerY vertical position of the center of the rotation
     */
    rotateRight(centerX, centerY) {
        this.rotateRightAngle(centerX, centerY, true);
    }

    /**
     * rotate by 90 degrees to the left
     * @param  {number} centerX horizontal position of the center of the rotation
     * @param  {number} centerY vertical position of the center of the rotation
     */
    rotateLeft(centerX, centerY) {
        this.rotateRightAngle(centerX, centerY, false);
    }

    /**
     * get the transform values in a string
     * @return {string} string that can be used as a value for the transform property of a SVG element
     */
    get() {
        let retVal;
        for(const item of this.items) {
            if(retVal) {
                retVal += " " + item.get();
            } else {
                retVal = item.get();
            }
        }
        return retVal;
    }

    /**
     * get arguments of a property specified by index
     * @param  {number} index index of the property
     * @return {array}       array of arguments of the specified property
     */
    getArguments(index) {
        return this.items[index].args;
    }

    /**
     * set argumets of a property specified by name
     * @param {string} name name of the property
     * @param {array} args array of arguments of the specified property
     */
    setParameter(name, args) {
        // determine index of the parameter (if set), else index == -1
        let index = this.getIndex(name);

        // if the property has been already set, change it (rewrite the array in the right index)
        // else create a new one (set index to the length of an array --> ad an item to the end)
        if(index===-1) {
            index = this.items.length;
            this.items[index] = new Property();
            this.items[index].setName(name);
        }

        // save args under the right index
        this.items[index].setArguments(args);
    }
}
