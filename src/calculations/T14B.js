import erfc from './erfc';

export function calculateDiagramData(Qw, S, T, d, t_min, t_max, L, d_t) {
    function calcdQ(t) {
        var erfc1 = erfc(Math.sqrt((d * d * S) / (4 * T * t)));
        var exp1 = Math.exp((T*t/(S*L*L))+d/L);
        var erfc2 = erfc(Math.sqrt(T*t/(S*L*L))+Math.sqrt((d * d * S) / (4 * T * t)));
        return Qw * (erfc1-exp1*erfc2);
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
