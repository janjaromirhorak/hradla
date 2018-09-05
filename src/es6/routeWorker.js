'use strict';

/** @module routeWorker */

import findPath from './modules/findPath';

/**
 * callback when a message is sent to the web worker
 *
 * @param {Object} event web worker event object (the `data` item of the event object is expected to contain
 *                       these items: `wires` (array), `nonRoutableNodes` (iterable) and `inconvenientNodes` (iterable))
 */
onmessage = event => {
    const { wires, nonRoutableNodes, inconvenientNodes } = event.data;

    const paths = findPaths(wires, nonRoutableNodes, inconvenientNodes);

    postMessage({ paths });
    close();
};

/**
 * find paths for all the specified wires
 * @param  {Array} wires              array of objects with attributes `from` and `to`, both of them which are objects
 *                                    with values `x` and `y` containing coordinates of the wire endpoints
 * @param  {Iterable} nonRoutableNodes  Set or array of non routable nodes
 * @param  {Iterable} inconvenientNodes Set or array of inconvenient nodes
 * @return {Array}                    array of paths, each item is an array of points of the path
 *                                    the returned array contains paths for the wires with corresponding indexes from the `wires` parameter
 */
function findPaths(wires, nonRoutableNodes, inconvenientNodes) {
    let paths = [];

    for (const [from, to] of wires) {
        const path = findPath(from, to, nonRoutableNodes, inconvenientNodes);

        if (!path) {
            console.log('path not found');
            console.log(from, to);
        } else {
            console.log('path found');
        }

        paths.push(path);

        // add new inconvenient nodes created by this new path
        let prevPoint;
        for (const point of path) {
            if (prevPoint) {
                if (point.x === prevPoint.x) {
                    // horizontal section of the path
                    for (
                        let y = Math.min(point.y, prevPoint.y);
                        y <= Math.max(point.y, prevPoint.y);
                        ++y
                    ) {
                        inconvenientNodes.add({
                            x: point.x,
                            y: y
                        });
                    }
                } else if (point.y === prevPoint.y) {
                    // vertical section of the path
                    for (
                        let x = Math.min(point.x, prevPoint.x);
                        x <= Math.max(point.x, prevPoint.x);
                        ++x
                    ) {
                        inconvenientNodes.add({
                            x: x,
                            y: point.y
                        });
                    }
                }
            }

            prevPoint = point;
        }
    }

    return paths;
}
