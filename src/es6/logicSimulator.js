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

    }

    run() {
        this.wave++;
        while(this.waves.has(this.wave)) {
            // console.log('step', this.wave)
            this.step()
            this.wave++
        }
    }

    step() {
        for (let stateInfo of this.waves.get(this.wave)) {
            this.whoCausedIt = stateInfo.connectorId
            /*  process all outputConnectors by setting their state
                this will trigger a following event chain:
                    outputConnector changes
                    -> all connected wires change
                    -> all inputConnectors connected to these wires change
                    -> all elements that contain these inputConnectors change
                    -> these elements compute the new state of their output connectors and call notifyChange()
            */

            if(stateInfo.whoCausedIt) {
                this.addPredecessor(stateInfo.connectorId, stateInfo.whoCausedIt)
            }

            if (stateInfo.connectorId in this.getAllPredecessors(stateInfo.connectorId)) {
                console.error('CYCLE DETECTED', this.getAllPredecessors(stateInfo.connectorId))
                this.waves.clear()
            }

            // reflect the changes in SVG
            let connector = this.parentSVG.getConnectorById(stateInfo.connectorId)
            if(connector) {
                connector.setState(stateInfo.state)
            }
        }
        this.whoCausedIt = undefined
    }

    addPredecessor(connectorId, predecessorConnectorId) {
        if(!this.predecessors.has(connectorId)) {
            this.predecessors.set(connectorId, new Set())
        }

        this.predecessors.get(connectorId).add(predecessorConnectorId)
    }

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
        // console.log('notifyChange, connector:', connectorId, 'wave:', this.wave)

        let waveId = this.wave + 1

        if(!this.waves.has(waveId)) {
            this.waves.set(waveId, [])
        }

        this.waves.get(waveId).push(new stateChange(connectorId, state, this.whoCausedIt));
    }
}
