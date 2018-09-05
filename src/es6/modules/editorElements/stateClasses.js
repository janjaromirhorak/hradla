import Logic from '../Logic';

/**
 * mapping of logical states to css classes
 * @type {Object}
 */

let map = []; // array so we can use the ...spread operator

map[Logic.state.on] = 'stateOn';
map[Logic.state.off] = 'stateOff';
map[Logic.state.unknown] = 'stateUnknown';
map[Logic.state.oscillating] = 'stateOscillating';

export default map;
