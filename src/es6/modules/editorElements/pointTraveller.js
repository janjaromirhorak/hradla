/**
 * Create a generator that travels between specified points returning each visited point
 * @param  {Array}    points array of points represented by an object: `{x, y}`, subsequent points must have one equal
 *                           coordinate (so the traveller can travel either vertically or horizontally)
 * @return {Generator}       generator that travels between specified points returning each visited point
 */
export default function* (points) {
    let prevPoint;

    for (const {x, y} of points) {

        if (prevPoint === undefined) {
            // if the prevPoint is undefined, add the first point
            // yield ({x, y});
        } else {
            // else add all the point between the prevPoint (excluded) and point (included)

            if (prevPoint.x === x) {
                // if the line is horizontal
                let from = Math.min(prevPoint.y, y);
                let to = Math.max(prevPoint.y, y);

                while (from <= to) {
                    yield({x: x, y: from});
                    from++;
                }
            } else if (prevPoint.y === y) {
                // if the line is vertical
                let from = Math.min(prevPoint.x, x);
                let to = Math.max(prevPoint.x, x);

                while (from <= to) {
                    yield({x: from, y: y});
                    from++;
                }
            } else {
                // line is neither horizontal nor vertical, throw an error for better future debugging
                // console.error("getInconvenientNodes: line between two points is neither horizontal nor vertical");
            }
        }

        // set new prevPoint
        prevPoint = {
            x,
            y
        };
    }
}
