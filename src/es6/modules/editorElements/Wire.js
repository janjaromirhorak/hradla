/** @module editorElements.Wire */

import * as svgObj from '../svgObjects'
import Logic from '../Logic'
import stateClasses from './stateClasses'
import findPath from '../findPath'

import NetworkElement from './NetworkElement'

/**
 * Wire represents connection of two {@link Connector}s.
 * @extends NetworkElement
 */
export default class Wire extends NetworkElement {
    /**
     * @param {Canvas} parentSVG  instance of [Canvas](./module-Canvas.html)
     * @param {string}  fromId    id of the first connector this wire will be connected to
     * @param {string}  toId      id of the second connector this wire will be connected to
     * @param {Boolean} [refresh=true] if `true`, the [Canvas](./module-Canvas.html) will refresh after creating this wire
     */
    constructor(parentSVG, fromId, toId, refresh = true, route = true) {
        super(parentSVG);

        this.gridSize = parentSVG.gridSize;

        this.connection = {
            from: {
                id: fromId,
                box: this.parentSVG.getBoxByConnectorId(fromId),
                connector: this.parentSVG.getConnectorById(fromId)
            },
            to: {
                id: toId,
                box: this.parentSVG.getBoxByConnectorId(toId),
                connector: this.parentSVG.getConnectorById(toId)
            }
        }

        if(this.connection.from.connector.isOutputConnector) {
            if(this.connection.to.connector.isInputConnector) {
                // desired state
            } else {
                // connecting two output connectors
                throw "Can not place wire between two output connectors";
            }
        } else {
            if(this.connection.to.connector.isInputConnector) {
                // connecting two input connectors
                throw "Can not place wire between two input connectors";
            } else {
                // swap them and we are ready to go
                [ this.connection.from, this.connection.to ] = [ this.connection.to, this.connection.from ];
            }
        }

        if(route) {
            this.routeWire(true, refresh);
        } else {
            this.temporaryWire();
        }

        this.elementState = Logic.state.unknown;

        this.setState(this.connection.from.connector.state)

        this.svgObj.$el.addClass("wire");
    }

    get boxes() {
        return [this.connection.from.box, this.connection.to.box];
    }

    get connectors() {
        return [this.connection.from.connector, this.connection.to.connector];
    }

    /**
     * get data of this wire as a JSON-ready object
     * @return {Object} javascript object containing essential data for this wire
     */
    get exportData() {
        return {
            fromId: this.connection.from.id,
            toId: this.connection.to.id
        };
    }

    /**
     * set the state of this wire to match the state of the input connector it is connected to
     * @param {Logic.state} state [description]
     */
    setState(state) {
        this.svgObj.removeClasses(stateClasses.on, stateClasses.off, stateClasses.unknown, stateClasses.oscillating);

        switch (state) {
            case Logic.state.unknown:
                this.svgObj.addClass(stateClasses.unknown);
                break;
            case Logic.state.on:
                this.svgObj.addClass(stateClasses.on);
                break;
            case Logic.state.off:
                this.svgObj.addClass(stateClasses.off);
                break;
            case Logic.state.oscillating:
                this.svgObj.addClass(stateClasses.oscillating);
                break;
        }

        this.connection.to.connector.setState(state);

        this.elementState = state;
    }

    /**
     * get the current [Logic.state](./modules-Logic.html#.state) of this wire
     * @return {Logic.state}
     */
    get state() {
        return this.elementState;
    }

    /**
     * update the state of this wire
     */
    updateWireState() {
        // TODO investigate
        for (const box of this.boxes) {
            box.refreshState()
        }
    }

    /**
     * get the jQuery element for this wire
     * @return {jQuery.element}
     */
    get() {
        return this.svgObj.get();
    }

    /**
     * get the polyline points for a temporary wire placement connecting the two connectors
     * @return {PolylinePoints} new instance of {@link PolylinePoints}
     */
    getTemporaryWirePoints() {
        let points = new svgObj.PolylinePoints();
        points.append(new svgObj.PolylinePoint(this.wireStart.x, this.wireStart.y));
        points.append(new svgObj.PolylinePoint(this.wireEnd.x, this.wireEnd.y));
        return points;
    }

    /**
     * route the wire using the temporary wire points
     */
    temporaryWire() {
        this.wireStart = this.parentSVG.getConnectorPosition(this.connection.from.connector, false);
        this.wireEnd = this.parentSVG.getConnectorPosition(this.connection.to.connector, false);

        this.setWirePath(this.getTemporaryWirePoints());
    }

    /**
     * route the wire using the modified A* wire routing algorithm
     */
    routeWire(snapToGrid = true, refresh = true) {
        this.wireStart = this.parentSVG.getConnectorPosition(this.connection.from.connector, snapToGrid);
        this.wireEnd = this.parentSVG.getConnectorPosition(this.connection.to.connector, snapToGrid);

        this.points = this.findRoute(
            {
                x: this.wireStart.x / this.gridSize,
                y: this.wireStart.y / this.gridSize
            },
            {
                x: this.wireEnd.x / this.gridSize,
                y: this.wireEnd.y / this.gridSize
            });

        this.setWirePath(this.points);

        if (refresh)
            this.updateWireState();

        // regenerate inconvenient nodes
        this.generateInconvenientNodes();
    }

    /**
     * set the wire to follow the specified points
     * @param {PolylinePoints} points instance of {@link PolylinePoints}
     */
    setWirePath(points) {
        // set the line
        if(this.svgObj!==undefined) {
            // this.svgObj.updatePoints(points);
            for (let child of this.svgObj.children) {
                child.updatePoints(points);
            }
        } else {
            this.svgObj = new svgObj.Group();

            let hitbox = new svgObj.PolyLine(points, 10, 'white');
            hitbox.addClass("hitbox");
            hitbox.addAttr({opacity: 0});
            this.svgObj.addChild(hitbox);

            let mainLine = new svgObj.PolyLine(points, 2);
            mainLine.addClass("main", "stateUnknown");
            this.svgObj.addChild(mainLine);
        }
    }

    pathToPolyline(path) {
        let totalPath = new svgObj.PolylinePoints();
        for (const point of path) {
            totalPath.append(new svgObj.PolylinePoint(point.x * this.gridSize, point.y * this.gridSize));
        }
        return totalPath;
    }

    /**
     * find a nice route for the wire
     * @param  {Object} start object containing numeric attributes `x` and `y` that represent the first endpoint of the wire in grid pixel
     * @param  {Object} end   object containing numeric attributes `x` and `y` that represent the second endpoint of the wire in grid pixels
     * @return {PolylinePoints}       [description]
     */
    findRoute(start, end) {
        let nonRoutable = this.parentSVG.getNonRoutableNodes();

        let punishedButRoutable;
        if(this.svgObj===undefined) {
            punishedButRoutable = this.parentSVG.getInconvenientNodes();
        } else {
            punishedButRoutable = this.parentSVG.getInconvenientNodes(this.svgObj.id);
        }

        let path = findPath(start, end, nonRoutable, punishedButRoutable, this.gridSize);

        if(path) {
            return this.pathToPolyline(path);
        }


        // if a path was not found, try again but don't take into account the punished and non routable node
        path = findPath(start, end, new Set(), new Set(), this.gridSize);

        if(path) {
            return this.pathToPolyline(path);
        }

        // if the path was still not found, give up and return temporary points
        return this.getTemporaryWirePoints();
    }

    /**
     * generate a set of nodes, that are inconvenient for wiring, but can be used, just are not preferred
     * @return {Set} set of nodes (objects containing x and y coordinates) that are not preferred for wiring
     */
    generateInconvenientNodes() {
        this.inconvenientNodes = new Set();

        let prevPoint;

        this.points.forEach(point => {
            const
                x = this.parentSVG.SVGToGrid(point.x),
                y = this.parentSVG.SVGToGrid(point.y);

            if (prevPoint === undefined) {
                // if the prevPoint is undefined, add the first point
                this.inconvenientNodes.add({x, y});
            } else {
                // else add all the point between the prevPoint (excluded) and point (included)

                if(prevPoint.x === x) {
                    // if the line is horizontal
                    let from = Math.min(prevPoint.y, y);
                    let to = Math.max(prevPoint.y, y);

                    while(from <= to) {
                        this.inconvenientNodes.add({x: x, y: from});
                        from++;
                    }
                } else if(prevPoint.y === y) {
                    // if the line is vertical
                    let from = Math.min(prevPoint.x, x);
                    let to = Math.max(prevPoint.x, x);

                    while(from <= to) {
                        this.inconvenientNodes.add({x: from, y: y});
                        from++;
                    }
                } else {
                    // line is neither horizontal nor vertical, throw an error for better future debugging
                    // console.error("getInconvenientNodes: line between two points is neither horizontal nor vertical");
                }
            }

            // set new prevPoint
            prevPoint = {x, y};
        });
    }
}
