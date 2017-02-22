export function calculateDiagramData(w, K, ne, L1, h1, x_min, x_max, d_x) {
    const xi = x_min;
    const alpha = L1*L1 + K * h1*h1 / w;
    const root1 = Math.sqrt(alpha / K / w);
    const root3 = Math.sqrt(1/(xi*xi) - 1/alpha);
    const root4 = Math.sqrt( (alpha / (xi*xi)) - 1);

    function calcT(x) {
        const root2 = Math.sqrt(1/(x*x) - 1/alpha);
        const root5 = Math.sqrt( (alpha / (x*x)) - 1);
        const ln = Math.log((Math.sqrt(alpha) / xi + root4) / (Math.sqrt(alpha) / x + root5));
        return ne * root1 * (x * root2 - xi * root3 + ln);
        //return ne * Math.sqrt(alpha / K / w) * (x * Math.sqrt(1/(x*x) - 1/alpha) - x_min * Math.sqrt(1/(x_min*x_min) - 1/alpha) + Math.log((Math.sqrt(alpha)/x_min + Math.sqrt(alpha / (x_min*x_min) - 1)) / (Math.sqrt(alpha)/x + Math.sqrt(alpha / (x*x) - 1))) );
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

export  function calculateXwd(L, K, w, hL, h0) {
    return (L/2+K*(hL*hL-h0*h0)/(2*w*L));
}
