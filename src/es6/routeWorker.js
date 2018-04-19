import findPath from './findPath'

onmessage = (event) => {
    const {wires, nonRoutableNodes} = event.data;
    let {inconvenientNodes} = event.data;

    let paths = [];

    for (const [from, to] of wires) {
        const path = findPath(from, to, nonRoutableNodes, inconvenientNodes)

        paths.push(path);

        // add new inconvenient nodes created by this new path
        let prevPoint;
        for(const point of path) {
            if(prevPoint) {
                if(point.x === prevPoint.x) {
                    // horizontal section of the path
                    for(let y = Math.min(point.y, prevPoint.y); y <= Math.max(point.y, prevPoint.y) ; ++y) {
                        inconvenientNodes.add({
                            x: point.x,
                            y: y
                        })
                    }
                } else if(point.y === prevPoint.y) {
                    // vertical section of the path
                    for(let x = Math.min(point.x, prevPoint.x); x <= Math.max(point.x, prevPoint.x) ; ++x) {
                        inconvenientNodes.add({
                            x: x,
                            y: point.y
                        })
                    }
                }
            }

            prevPoint = point;
        }


    }

    postMessage({paths})
}
