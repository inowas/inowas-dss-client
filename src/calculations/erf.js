//import factorial from './factorial';
// precise upt to 6 fractions
// see https://de.wikipedia.org/wiki/Fehlerfunktion
/*export default function erf(x) {
    var sum = 0;
    for (let n = 0; n <= 30; n++) {
        let cons2n1 = 2 * n + 1;
        let sumi = ((Math.pow(-1, n) * Math.pow(x, cons2n1)) / (cons2n1 * factorial(n)));
        sum += sumi;
    }
    let c = 2 / Math.sqrt(Math.PI);
    return Math.round(c * sum);
}*/
export default function erf(x) {
    const a1 = 0.254829592,
        a2 = -0.284496736,
        a3 = 1.421413741,
        a4 = -1.453152027,
        a5 = 1.061405429,
        p = 0.3275911;
    // Save the sign of x
    let sign = 1
    if (x < 0) sign = -1;
    x = Math.abs(x);
    // A & S 7.1.26 with Horners Method
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}
