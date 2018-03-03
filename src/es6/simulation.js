import Logic from './logic.js'

class stateChange {
    constructor(connectorId, state, whoCausedIt) {
        this.connectorId = connectorId
        this.state = state
        this.whoCausedIt = whoCausedIt
    }
}

// all connectors mentioned here are OUTPUT CONNECTORS
export default class Simulator {
    constructor(parentSVG) {
        this.parentSVG = parentSVG

        // maps each affected output connector to it's directly preceeding output connectors
        this.predecessors = new Map();

        // maps waveId -> array of outputConnectors affected
        this.waves = new Map();
        this.wave = 0

        this.cycledConnectors = new Map()
        this.resolvedCycledConnectors = new Set()

    }

    run() {
        this.wave++;
        while(this.waves.has(this.wave)) {
            this.step()
            this.waves.delete(this.wave) // clean old waves on the go
            this.wave++
        }
    }

    step() {
        for (let {connectorId, state, whoCausedIt} of this.waves.get(this.wave)) {
            // skip resolved cycles
            if(this.resolvedCycledConnectors.has(connectorId)) {
                continue
            }

            // skip connector that are cycles
            if (this.cycledConnectors.has(connectorId)) {
                // get the set of states that this connector appeared from the moment the signal first cycled
                let states = this.cycledConnectors.get(connectorId)

                // if the connector already had this state in this cycle, resolve the cycle
                if(states.has(state)) {

                    // if there are more states in the set, the connector is oscillating
                    // (else it keeps its state and we just break the cycle)
                    if(states.size > 1) {
                        state = Logic.state.oscillating
                    }

                    // mark this connector as resolved
                    this.resolvedCycledConnectors.add(connectorId)

                // this is a new, unseen state, add it to the set and continue simulating the cycle
                } else {
                    states.add(state)
                }

                // map the modified set of states to the connector
                this.cycledConnectors.set(connectorId, states)
            }

            this.whoCausedIt = connectorId
            /*  process all outputConnectors by setting their state
                this will trigger a following event chain:
                    outputConnector changes
                    -> all connected wires change
                    -> all inputConnectors connected to these wires change
                    -> all elements that contain these inputConnectors change
                    -> these elements compute the new state of their output connectors and call notifyChange()
            */


            if(whoCausedIt) {
                this.addPredecessor(connectorId, whoCausedIt)
            }

            if (!this.cycledConnectors.has(connectorId) && this.getAllPredecessors(connectorId).has(connectorId)) {
                this.cycledConnectors.set(connectorId, new Set([state]))
            }


            // reflect the changes in SVG
            let connector = this.parentSVG.getConnectorById(connectorId)
            if(connector) {
                connector.setState(state)
            }
        }
        this.whoCausedIt = undefined
    }

    // mark a predecessorConnectorId as a predecessor of connectorId
    addPredecessor(connectorId, predecessorConnectorId) {
        if(!this.predecessors.has(connectorId)) {
            this.predecessors.set(connectorId, new Set())
        }

        this.predecessors.get(connectorId).add(predecessorConnectorId)
    }

    // returns set of all output connectors, that are before this output connector
    getAllPredecessors(connectorId) {
        if(!this.predecessors.has(connectorId)) {
            this.predecessors.set(connectorId, new Set())
        }

        let all = new Set()

        this.predecessors.get(connectorId).forEach(all.add, all);

        let prevSize = 0
        let size = all.size
        while(prevSize < size) {
            for (let connector of all) {
                if (this.predecessors.has(connector)) {
                    this.predecessors.get(connector).forEach(all.add, all);
                }
            }
            prevSize = size
            size = all.size
        }

        return all
    }

    notifyChange(connectorId, state) {
        let waveId = this.wave + 1

        if(!this.waves.has(waveId)) {
            this.waves.set(waveId, [])
        }

        this.waves.get(waveId).push(new stateChange(connectorId, state, this.whoCausedIt));
    }
}
