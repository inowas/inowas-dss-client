import erfc from './erfc';

export function calculateDiagramData(Qw, S, T, d, tMin, tMax, lambda, dT) {
    function calcdQ(t) {
        const erfc1 = erfc(Math.sqrt((d * d * S) / (4 * T * t)));
        const exp1 = Math.exp((lambda * lambda * t / (4 * S * T)) + lambda * d / (2 * T));
        const erfc2 = erfc(Math.sqrt((lambda * lambda * t / (4 * S * T))) + Math.sqrt((d * d * S) / (4 * T * t)));
        return Qw * (erfc1 - exp1 * erfc2);
    }

    const data = [];
    for (let t = tMin; t < tMax; t += dT) {
        data.push({
            t: t,
            dQ: calcdQ(t)
        });
    }
    return data;
}
