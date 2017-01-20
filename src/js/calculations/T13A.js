export function calculateDiagramData(w, K, ne, L, hL, x_min, x_max, d_x) {
    function calcT(x) {
        const alpha = L*L + K * hL*hL / w;
        const root1 = Math.sqrt(alpha / K / w);
        const root2 = Math.sqrt(1/(x*x) - 1/alpha);
        const root3 = Math.sqrt(1/(x_min*x_min) - 1/alpha);
        const root4 = Math.sqrt(alpha / (x_min*x_min) - 1);
        const root5 = Math.sqrt(alpha / (x*x) - 1);
        const ln = Math.log((Math.sqrt(alpha) / x_min + root4) / (Math.sqrt(alpha) / x + root5));
        return ne * root1 * (x * root2 - x_min * root3 + ln);
        //return ne * Math.sqrt(alpha / K / w) * (x * Math.sqrt(1/(x*x) - 1/alpha) - x_min * Math.sqrt(1/(x_min*x_min) - 1/alpha) + Math.log((Math.sqrt(alpha)/x_min + Math.sqrt(alpha / (x_min*x_min) - 1)) / (Math.sqrt(alpha)/x + Math.sqrt(alpha / (x*x) - 1))) );
    }

    let data = [];
    for (let x = x_min; x < x_max; x += d_x) {
        data.push({
            x: x,
            t: calcT(x)
        });
    }
    return data;
}
