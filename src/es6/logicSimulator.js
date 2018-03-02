import Logic from "./logic.js"

class stateChange {
    constructor(connectorId, state, wave) {
        this.connectorId = connectorId
        this.state = state
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
        while(this.waves.has(this.wave)) {
            step()
            this.wave++
        }
    }

    step() {
        for (let stateInfo of this.waves.get(this.wave)) {
            /*  process all outputConnectors by setting their state
                this will trigger a following event chain:
                    outputConnector changes
                    -> all connected wires change
                    -> all inputConnectors connected to these wires change
                    -> all elements that contain these inputConnectors change
                    -> these elements compute the new state of their output connectors and call notifyChange()
            */
            connector = this.parentSVG.getConnectorById(stateInfo.connectorId)
            connector.setState(stateInfo.state)
        }
    }

    notifyChange(connectorId, state) {
        let waveId = this.wave + 1

        if(!this.waves.has(waveId)) {
            this.waves.set(waveId, [])
        }

        this.waves.get(waveId).push(new stateChange(connectorId, state));
    }
}
