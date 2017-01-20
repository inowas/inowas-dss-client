export function calculateDiagramData( x_min, x_max, d_x) {
    function calcHhi(x) {
    }

    let data = [];
    for (let x = x_min; x < x_max; x += d_x) {
        data.push({
            x: x,
            hhi: calcHhi(x)
        });
    }
    return data;
}
