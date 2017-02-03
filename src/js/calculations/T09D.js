/*function range(start, stop, step) {
    let a = [start],
        b = start;
    while (b < stop) {
        b += step;
        a.push(b)
    }
    return a;
}*/
export function calculateDiagramData(q, b, k, rho_f, rho_s, q_w, x_w, x_min, x_max, d_x) {
    let d_rho = rho_f / (rho_s - rho_f);

    function calcY(x) {
        let L = Math.pow(Math.E, (4 * Math.PI * k * (0.5 * (1 + d_rho) * Math.pow(b / d_rho, 2) - q * x / k)) / q_w);
        let M = (L * Math.sqrt(x + x_w, 2) - Math.pow(x - x_w, 2)) / (1 - L);
        return  Math.sqrt(M);
        // let M = Math.sqrt(1 / (Math.pow(Math.E, 2 * k / q_w * b * b / d_rho * Math.PI - 4 / q_w * d_rho * x * Math.PI + 2 * k / q_w * b * b / d_rho / d_rho * Math.PI) - 1));
        // let L = Math.sqrt((-1) * (x * x + x_w * x_w + 2 * x * x_w) * Math.pow(Math.E, 2 * k / q_w * b * b / d_rho * Math.PI - 4 / q_w * q * x * Math.PI + 2 * k / q_w * b * b / d_rho / d_rho * Math.PI) + x * x + x_w * x_w - 2 * x_w * x);
        // return M * L;
    }
    let data = [];
    for (let x = x_min; x < x_max; x += d_x) {
        data.push({
            x,
            y: calcY(x)
        });
    }
    return data;
}
/*
export function calculateZ(d) {
    return 0.4 * d;
}
export function calculateH(q, k, d, df, ds) {
    return ((q * df) / (2 * Math.PI * d * k * (ds - df)));
}
export function calculateCurve(z, x) {
    x = x / 50;
    return (z * Math.pow(Math.E, -(x * x * x * x)));
}
export function calculateQ(k, d, df, ds) {
    return (0.6 * Math.PI * d * d * k * ((ds - df) / ds));
}*/
