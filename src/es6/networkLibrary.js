
const libraryDir = './library/'

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
