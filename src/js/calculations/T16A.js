export function calculateDiagramData(CH, T, d10_min, d10_max, d_d10) {
    function calcK(d10) {
        console.log(CH,T,d10_max,d10_min, CH * d10 * d10 * (0.7 + 0.33 * T));
        return CH * d10 * d10 * (0.7 + 0.33 * T);
    }

    let data = [];
    for (let d10 = d10_min; d10 < d10_max; d10 += d_d10) {
        data.push({
            d10: d10,
            K: calcK(d10)
        });
    }
    return data;
}
