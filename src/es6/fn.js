"use strict";

export default class Fn {
    static deepCopy(arr) {
        return $.extend(true, [], arr);
    }

    static addMouseScrollEventListener(query, func) {
        let MouseWheelHandler = event => {
            var event = window.event || event; // old IE support
            event.delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

            func(event)

            return false;
        }

        // TODO add more backwards compatibility somehow
        let svgelement = document.querySelector(query);

        if (svgelement.addEventListener) {
            // IE9, Chrome, Safari, Opera
            svgelement.addEventListener("mousewheel", MouseWheelHandler, false);
            // Firefox
            svgelement.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        } else  {
            // IE 6/7/8
            svgelement.attachEvent("onmousewheel", MouseWheelHandler);
        }
        svgelement.addEventListener('mousewheel', function(e) {
            console.log('event', e)
        }, false)
    }
}
