import erfc from './erfc';

export function calculateDiagramData(Qw, S, T, d, t_min, t_max, lambda, d_t) {
    function calcdQ(t) {
        var erfc1 = erfc(Math.sqrt((d * d * S) / (4 * T * t)));
        var exp1 = Math.exp((lambda*lambda*t/(4*S*T))+lambda*d/(2*T));
        var erfc2 = erfc(Math.sqrt((lambda*lambda*t/(4*S*T)))+Math.sqrt((d * d * S) / (4 * T * t)));
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
