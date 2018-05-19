/** @module editorElements.Wire */

import {PolyLine, PolyLinePoints, PolyLinePoint, Group} from '../svgObjects'
import Logic from '../Logic'
import stateClasses from './stateClasses'
import findPath from '../findPath'
import pointTraveller from './pointTraveller'

import NetworkElement from './NetworkElement'
import WireAnchor from './WireAnchor'

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

        /**
         * array of anchors defined for this array,
         * each anchor is an instance of the {@link WireAnchor} class
         * @type {Array}
         */
        this.anchors = []

        /**
         * All information about the wire endpoints, contains two members: `from` and `to`.
         *
         * Both members are objects with members `id`, `box` and `connector` containing
         * the connector id, box object reference and connector object reference for the endpoint.
         * @type {Object}
         */
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

        /**
         * current state of the element
         * @type {Logic.state}
         */
        this.elementState = Logic.state.unknown;

        this.setState(this.connection.from.connector.state)

        if(refresh) {
            const {connector} = this.connection.to;
            this.parentSVG.startNewSimulation(connector, connector.state);
        }

        this.svgObj.addClass("wire");
    }

    /**
     * get the box objects that this wire is connecting
     * @return {Array} array containing two instances of the {@link Box} class
     */
    get boxes() {
        return [this.connection.from.box, this.connection.to.box];
    }

    /**
     * get the connector objects that this wire is connecting
     * @return {Array} array containing two instances of the {@link Connector} class
     */
    get connectors() {
        return [this.connection.from.connector, this.connection.to.connector];
    }

    /**
     * get data of this wire as a JSON-ready object
     * @return {Object} javascript object containing essential data for this wire
     */
    get exportData() {
        if(!this.parentSVG.exportWireIdMap.has(this.id)) {
            this.parentSVG.exportWireIdMap.set(this.id, this.parentSVG.exportWireId);
            this.parentSVG.exportWireId++;
        }

        return {
            id: this.parentSVG.exportWireIdMap.get(this.id),
            anchors: this.anchors.map(({x, y}) => ({x, y}))
        };
    }

    /**
     * set the state of this wire to match the state of the input connector it is connected to
     * @param {Logic.state} state [description]
     */
    setState(state) {
        this.svgObj.removeClasses(...stateClasses);
        this.svgObj.addClass(stateClasses[state]);

        this.connection.to.connector.setState(state);

        this.elementState = state;

        // update states of all anchors as well
        for(let anchor of this.anchors) {
            anchor.setState(state);
        }
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
     * route the wire using the temporary wire points
     */
    temporaryWire() {
        const [from, to] = this.connectors.map(connector => {
            return this.parentSVG.getConnectorPosition(connector, false)
        })

        let points = new PolyLinePoints();
        points.append(new PolyLinePoint(from.x, from.y));

        for(const anchor of this.anchors) {
            points.append(new PolyLinePoint(anchor.svgPosition.x, anchor.svgPosition.y))
        }

        points.append(new PolyLinePoint(to.x, to.y));

        this.setWirePath(points);
    }

    /**
     * route the wire using the modified A* wire routing algorithm
     */
    routeWire(snapToGrid = true, refresh = true) {
        let endpoints = this.connectors.map(connector => {
            const {x, y} = this.parentSVG.getConnectorPosition(connector, snapToGrid);
            return {
                x: this.parentSVG.SVGToGrid(x),
                y: this.parentSVG.SVGToGrid(y)
            }
        })

        // get route between the endpoints
        const points = this.findRoute(...endpoints);

        // set the wire path to the generated points
        this.setWirePath(points);

        if (refresh)
            this.updateWireState();

        // regenerate inconvenient nodes
        this.generateInconvenientNodes();
    }

    /**
     * set the wire to follow the specified points
     * @param {PolyLinePoints} points instance of {@link PolyLinePoints}
     */
    setWirePath(points) {
        // set the line
        if(this.svgObj!==undefined) {
            // this.svgObj.updatePoints(points);
            for (let child of this.svgObj.children) {
                child.updatePoints(points);
            }
        } else {
            this.svgObj = new Group();

            let hitbox = new PolyLine(points, 10, 'white');
            hitbox.addClass("hitbox");
            hitbox.addAttr({opacity: 0});
            this.svgObj.addChild(hitbox);

            let mainLine = new PolyLine(points, 2);
            mainLine.addClass("main", "stateUnknown");
            this.svgObj.addChild(mainLine);
        }

        this.points = points;
    }

    pathToPolyLine(path) {
        // create array of polyline points from the coordinates from `path` transformed from grid pixels to SVG pixels
        const points = path.map(({x, y}) => new PolyLinePoint(this.parentSVG.gridToSVG(x), this.parentSVG.gridToSVG(y)));

        const totalPath = new PolyLinePoints(points);

        return totalPath;
    }

    /**
     * find a nice route for the wire
     * @param  {Object} start object containing numeric attributes `x` and `y` that represent the first endpoint of the wire in grid pixel
     * @param  {Object} end   object containing numeric attributes `x` and `y` that represent the second endpoint of the wire in grid pixels
     * @return {PolyLinePoints}       [description]
     */
    findRoute(start, end) {
        let nonRoutable = this.parentSVG.getNonRoutableNodes();

        let punishedButRoutable;
        if(this.svgObj===undefined) {
            punishedButRoutable = this.parentSVG.getInconvenientNodes();
        } else {
            punishedButRoutable = this.parentSVG.getInconvenientNodes(this.svgObj.id);
        }

        let routePoints = [
            start,
            ...this.anchors.map(({x, y}) => ({x, y})), // strip all other data that x and y coordinates
            end
        ];

        // add start here because of the slice(1) below
        let path = [start];

        let prev;
        for (const routePoint of routePoints) {
            if(prev) {
                // find the best path from 'prev' to 'routePoints'
                const foundPath = findPath(prev, routePoint, nonRoutable, punishedButRoutable);

                // to avoid repetition of the joints, ignore the first point
                path.push(...foundPath.slice(1));

                // add the new points to the punishedButRoutable set
                const pt = pointTraveller(foundPath);
                for (const point of pt) {
                    punishedButRoutable.add(point);
                }
            }
            prev = routePoint;
        }

        // let path = findPath(start, end, nonRoutable, punishedButRoutable, this.gridSize);

        if(path) {
            return this.pathToPolyLine(path);
        }


        // if a path was not found, try again but don't take into account the punished and non routable node
        path = findPath(start, end, new Set(), new Set(), this.gridSize);

        if(path) {
            return this.pathToPolyLine(path);
        }

        // if the path was still not found, give up and return temporary points
        return this.getTemporaryWirePoints();
    }

    /**
     * Generator that travels the path from the start to the end and each item
     * is a point with `x` and `y` coordinates in grid pixels
     * @return {Generator}
    */
    *pathTraveller() {
        const traveller = pointTraveller(this.points.map(({x, y}) => ({
            x: this.parentSVG.SVGToGrid(x),
            y: this.parentSVG.SVGToGrid(y)
        })));

        for(const point of traveller) {
            yield point;
        }
    }

    /**
     * generate a set of nodes, that are inconvenient for wiring, but can be used, just are not preferred
     * @return {Set} set of nodes (objects containing x and y coordinates) that are not preferred for wiring
     */
    generateInconvenientNodes() {
        this.inconvenientNodes = new Set();

        const pt = this.pathTraveller();
        for (const point of pt) {
            this.inconvenientNodes.add(point);
        }
    }

    /**
     * add a new anchor at the specified position
     *
     * if there is already an anchor at this position, do nothing
     * @param {Object} anchor object with `x` and `y` in grid pixels
     */
    addAnchor({x, y}) {
        // place the anchor to the right position in the array

        let newAnchor = new WireAnchor(this, x, y);

        // travel the path
        const pt = this.pathTraveller();
        let pointer = 0;
        for (const point of pt) {
            // get the current anchor that the pointer is pointing at
            const currentAnchor = this.anchors[pointer];

            // if the current anchor does not exist, that means that
            // the pointer passed all current anchors, so the
            // new anchor is the last anchor on this wire
            if(!currentAnchor) {
                this.anchors.push(newAnchor);
                break;
            }

            // if the current anchor has the same coordinates as this point
            // move the pointer to the next anchor
            if(currentAnchor.x === point.x && currentAnchor.y === point.y) {
                pointer++;

                // this continue assures that there can be at most one
                // anchor on one position. If the new anchor had the same
                // coordinates as this one, it will be skipped
                //
                // but technically this should never happen because user
                // should be not able to click on the wire at this
                // position if there is already an anchor
                continue;
            }

            // if the new anchor has the same coordinates as this point
            // put it in the place of the pointer (the rest of the array is moved to the right)
            if(newAnchor.x === point.x && newAnchor.y === point.y) {
                this.anchors.splice(pointer, 0, newAnchor);
                break;
            }
        }

        // set the anchor class to the current wire state
        newAnchor.setState(this.state);

        this.parentSVG.appendElement(newAnchor);
    }

    /**
     * remove an anchor specified by its position
     * @param {Object} anchor object with `x` and `y` in grid pixels
     */
    removeAnchor(anchor) {
        const {x, y} = anchor;
        let $el = anchor.svgObj.$el;

        // remove the anchor from the array
        this.anchors = this.anchors.filter(anchor => {
            return anchor.x !== x || anchor.y !== y
        })

        // remove the anchor from the SVG
        $el.remove();

        // reroute the wire
        this.routeWire();
    }

    /**
     * remove all anchors from this wire
     */
    removeAnchors() {
        for(let anchor of this.anchors) {
            anchor.svgObj.$el.remove();
        }
        
        this.anchors = [];
    }

    anchorMoved() {
        this.temporaryWire();
    }

    anchorDropped() {
        this.routeWire();
    }

    /**
     * Callback for a mousedown, that adds a new anchor on the place that user clicked on.
     * @param  {jQuery.MouseEvent} event the mousedown event
     */
    onMouseDown(event) {
        // only left click counts
        if(event.which===1) {
            // convert pixels in the event from CSS pixels to SVG pixels relative to the SVG document
            event = this.parentSVG.viewbox.transformEvent(event);

            let click = {
                x: event.pageX,
                y: event.pageY
            }

            for(const key in click) {
                if(click.hasOwnProperty(key)) {
                    click[key] = this.parentSVG.snapToGrid(click[key]);
                    click[key] = this.parentSVG.SVGToGrid(click[key]);
                }
            }

            // add an anchor on this position
            this.addAnchor(click);
        }
    }
}
