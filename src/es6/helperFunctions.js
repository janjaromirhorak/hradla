"use strict";

/**
 * @module HelperFunctions
 */

/**
 * add a cross browser event listener on a mouse scroll
 * @param {string} query DOM query of the element that the listener will be added to
 * @param {Function} func  Function that will be called when the event occurs. The function takes as a parameter an event object.
 */
export function addMouseScrollEventListener(query, func) {
    let MouseWheelHandler = event => {
        var event = window.event || event; // old IE support
        event.delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

        func(event)

        return false;
    }

    let svgelement;

    // if the query is a simple DOM id selector, we can use getElementById which has better backwards compatibility
    if(query.match(/^#\w+$/)) {
        svgelement = document.getElementById(query.substr(1))
    } else {
        svgelement = document.querySelector(query)
    }

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
