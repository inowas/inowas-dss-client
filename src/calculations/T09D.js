export function calculateDiagramData(q, b, k, rho_f, rho_s, q_w, x_w) {
    let d_rho = rho_f / (rho_s - rho_f);
console.log(d_rho);
    function calcY(x) {
        let L = Math.pow(Math.E, (4 * Math.PI * k * (0.5 * (1 + d_rho) * Math.pow(b / d_rho, 2) - q * x / k)) / q_w);
        console.log(L);
        let M = (L * Math.pow(x + x_w, 2) - Math.pow(x - x_w, 2)) / (1 - L);
        return  Math.sqrt(M);
    }
    let data = [];
    const x_min = 21;
    for (let x = x_min; x < 2500; x += 100) {
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
