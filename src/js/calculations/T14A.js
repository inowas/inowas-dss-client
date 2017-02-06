import erfc from './erfc';

export function calculateDiagramData(Qw, S, T, d, t_min, t_max, d_t) {
    function calcdQ(t) {
        return Qw * erfc(Math.sqrt((d * d * S) / (4 * T * t)));
    }

    let data = [];
    for (let t = t_min; t < t_max; t += d_t) {
        data.push({
            t: t,
            dQ: calcdQ(t)
        });
    }
    return data;
}
