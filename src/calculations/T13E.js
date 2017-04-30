export function calculateDiagramData(Qw, ne, hL, h0, x_min, x_max, d_x) {
    const xi = x_max;
    function calcT(x) {
        return ((0.95*h0 + 0.05*hL)*3.14159*(xi * xi - x * x)*ne/Qw);
    }

    var data = [];
    for (let x = x_min; x <= x_max; x += d_x) {
        data.push({
            x,
            t: calcT(x)
        });
    }
    return data;
}