/**
 * @module Library
 */

const libraryDir = './library/'

/**
 * get list of networks from the library
 * @return {Promise} promise, the resolution is an object containing a list of libraries
 */
export function getLibrary() {
    return new Promise((resolve, reject) => {
        const libraryFile = libraryDir + 'networkList.json';

        let request = new XMLHttpRequest();

        request.addEventListener("load", function() {
            if(this.response) {
                resolve(this.response.networks);
            }
        });

        request.open('GET', libraryFile, true);
        request.responseType = 'json';
        request.send();
    });
}

/**
 * get a network from the library, specified by filename
 * @param  {string} networkName library file name without the extension
 * @return {Promise} promise, the resolution is an object containing the library import data
 */
export function getNetworkFromLibrary(networkName) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.addEventListener("load", function() {
            if(this.response) {
                resolve(this.response);
            }
        });

        request.open('GET', libraryDir + networkName + '.json', true);
        request.responseType = 'json';
        request.send();
    });
}
