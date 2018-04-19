import {manhattanDistance} from './helperFunctions'
import MapWithDefaultValue from './mapWithDefaultValue'

import { PriorityQueue } from 'libstl'; // note: imported from a node module

/**
 * returns `true` if the specified set of points contains the specified point (and returns `false` otherwise)
 * @param {Set} set set of points
 * @param {Object} point object containing numeric attributes `x` and `y`
 */
function setHasThisPoint(set, point) {
    for (let item of set) {
        if (item.x === point.x && item.y === point.y) {
            return true;
        }
    }
    return false;
}

/**
 * Helper that moves the passed point in the specified direction. It simply adds or subtracts 1 from one of the coordinates depending on the direction attribute.
 * @param  {Object} point     object containing numeric attributes `x` and `y`
 * @param  {number} direction directions:
 *                              - 0: up
 *                              - 1: right
 *                              - 2: down
 *                              - 3: left
 * @return {Object}           object containing numeric attributes `x` and `y`
 */
function movePoint(point, direction) {
    switch (direction) {
        case 0: // up
            return {
                x: point.x,
                y: point.y - 1
            };
        case 1: // right
            return {
                x: point.x + 1,
                y: point.y
            };
        case 2: // down
            return {
                x: point.x,
                y: point.y + 1
            };
        case 3: // left
            return {
                x: point.x - 1,
                y: point.y
            };
    }
}

/**
 * helper backtracking function used by the aStar algorithm to construct the final path
 * @param  {Object} cameFrom    object containing numeric attributes `x` and `y`
 * @param  {Object} currentNode object containing numeric attributes `x` and `y`
 * @return {TODO}
 */
function reconstructPath(cameFrom, currentNode) {
    let path = [];

    path.push({
        x: currentNode.x,
        y: currentNode.y
    })

    while (cameFrom.has(currentNode)) {
        currentNode = cameFrom.get(currentNode);
        path.push({
            x: currentNode.x,
            y: currentNode.y
        })
    }

    return path;
}

/**
 * Heavily modified implementation of the A* algorithm
 * @param  {Object} start object containing numeric attributes `x` and `y` that represent the first endpoint of the wire in grid pixels
 * @param  {Object} end   object containing numeric attributes `x` and `y` that represent the second endpoint of the wire in grid pixels
 * @param  {Set} nonRoutable set of non routable nodes
 * @param  {Set} punishedButRoutable set of nodes that are not optimal for routing
 * @return {TODO}
 */
export default function findPath(start, end, nonRoutable, punishedButRoutable) {

    const distanceFunction = manhattanDistance;

    const wireCrossPunishment = 1;
    const wireBendPunishment = 1;

    // number of nodes, that can be opened at once
    // once is this limit exceeded, aStar will fail and return undefined
    const maxNodeLimit = 100000;

    let closedNodes = new Set();
    let openNodes = new Set();
    let openNodeQueue = new PriorityQueue();

    // functions for working with open nodes:

    /**
     * add a new open node to the structure
     * @param {Object} node   object containing numeric attributes `x` and `y` that represent the first endpoint of the wire
     * @param {number} fscore fScore of this node
     */
    const addOpenNode = (node, fscore) => {
        openNodes.add(node);
        // flip the fscore, because PriorityQueue uses max heap
        openNodeQueue.enqueue(node, 1 / fscore);
    }

    /**
     * get the open node with the lowest fScore and remove it
     * @return {Object} object containing numeric attributes `x` and `y` that represent the first endpoint of the wire
     */
    const getOpenNode = () => {
        const node = openNodeQueue.dequeue();
        openNodes.delete(node);
        return node;
    }

    let cameFrom = new Map();

    // default value: infinity
    let gScore = new MapWithDefaultValue(Infinity);
    gScore.set(start, 0);

    let startFScore = distanceFunction(start, end);

    addOpenNode(start, startFScore);

    openNodes.add(start);
    openNodeQueue.enqueue(start, 1 / startFScore);

    while (openNodes.size > 0) {
        // get the value from openNodes that has the lowest fScore
        const currentNode = getOpenNode();

        // if we reached the end point, reconstruct the path and return it
        if (currentNode.x == end.x && currentNode.y == end.y) {
            return reconstructPath(cameFrom, currentNode);
        }

        // add this node to the closed nodes
        closedNodes.add(currentNode);

        // the farthest points accessible without avoiding obstacles in every direction
        // (but max 50 in each direction)
        for (let direction = 0; direction < 4; direction++) {
            let newPoint = movePoint(currentNode, direction);

            let wiresCrossed = 0;

            for (let i = 0; i < 50; i++) {
                // if newPoint is in the set of non routable points,
                // don't add it and stop proceeding in this direction
                if (setHasThisPoint(nonRoutable, newPoint)) {
                    // if this not the end point, break
                    if (newPoint.x !== end.x || newPoint.y !== end.y) {
                        break;
                    }
                }

                // skip this node, if it has been already closed
                // or if it is on the list of non routable nodes
                if (closedNodes.has(newPoint)) {
                    continue;
                }

                // calculate possible GScore by applying a punishment for each node ("bend") in the path
                let newGScore = wireBendPunishment + gScore.getWithDefault(currentNode);

                if (setHasThisPoint(punishedButRoutable, newPoint)) {
                    // if the node is in the set of punished nodes, apply the punishment
                    wiresCrossed++;
                }

                // apply the punishment for each wire crossed in this direction
                // note: we are counting the wires crossed when exporting this direction, not the wires
                // crossed in the final path, there will be probably only at most of these nodes in the
                // final path, not multiple
                newGScore += wiresCrossed * wireCrossPunishment;

                // skip this node if it has worst estimage gscore than in the gscore table
                if (newGScore >= gScore.getWithDefault(newPoint)) {
                    continue;
                }

                cameFrom.set(newPoint, currentNode);
                gScore.set(newPoint, newGScore);

                const newFScore = newGScore + distanceFunction(newPoint, end);

                if (!openNodes.has(newPoint)) {
                    // add the point to the list of points
                    addOpenNode(newPoint, newFScore);
                }

                // move to the next point in the direciton
                newPoint = movePoint(newPoint, direction);
            }
        }

        if (openNodes.size > maxNodeLimit) {
            console.log(`aStar: Number of open nodes (${openNodes.size}) exceeded the limit for open nodes (${maxNodeLimit}).`)
            break;
        }
    }
    // if we got here, the path was not found

    return undefined;
}
