import {binomial, erfc, integrate, summation} from '../../core/calculations';
import bessel from 'bessel';
import {lower as gammaInc} from 'incomplete-gamma';

const GP = [
    -0.949107912342759,
    -0.741531185599394,
    -0.405845151377397,
    0.0,
    0.405845151377397,
    0.741531185599394,
    0.949107912342759
];

const WT = [
    0.129484966168870,
    0.279705391489277,
    0.381830050505119,
    0.417959183673469,
    0.381830050505119,
    0.279705391489277,
    0.129484966168870
];


const FTerm = (d, S, T, lambda, alpha, t) => {
    return (
        Math.exp(-((d * d * S) / (4 * T * t * alpha * alpha))) *
        Math.sqrt((T * t) / (S * d * d * Math.PI)) -
        (alpha * t * lambda) / (2 * S * d) *
        Math.exp((lambda * d) / (2 * T) + (t * alpha * alpha * lambda * lambda) / (4 * S * T)) *
        erfc(((alpha * lambda) / 2) * Math.sqrt(t / (S * T)) + (d * Math.sqrt(S)) / (2 * alpha * Math.sqrt(T * t)))
    );
};

const GTerm = (K, B, S, Sy, alpha, t) => {
    const a = ((K / B) * t) / Sy * (1 - Math.pow(alpha, 2));
    const b = ((K / B) * t) / S * Math.pow(alpha, 2);

    return (
        1 / 2 * (
            1 -
            Math.exp(-a + b) *
            bessel.besseli(2 * Math.sqrt(a * b), 0) +
            ((b - a) / (a + b)) *
            summation(
                (n) => (
                    binomial(2 * n, n) *
                    gammaInc(2 * n + 1, a + b) *
                    (Math.pow(Math.sqrt(2 * a * b), 2 * n) / (a + b))
                ),
                0,
                10000
            )
        )
    );
};

const calcDQ = (d, S, T, t, lambda, Kdash, Bdashdash, Sy, Qw) => {
    const erfc1 = erfc(Math.sqrt((d * d * S) / (4 * T * t)));
    const exp1 = Math.exp((lambda * lambda * t / (4 * S * T)) + lambda * d / (2 * T));
    const erfc2 = erfc(Math.sqrt((lambda * lambda * t / (4 * S * T))) + Math.sqrt((d * d * S) / (4 * T * t)));

    let corsum = 0.0;

    for (let IPT = 0; IPT < GP.length; IPT++) {
        // ALPHA RANGES FROM 0 TO 1, GAUSS POINTS ARE FOR -1 TO 1
        // USE CHANGE OF VARIABLE TO GET CORRECT ALPHA CORRESPONDING TO GAUSS POINTS
        const alpha = 0.5 + 0.50 * GP[IPT];
        const F = FTerm(d, S, T, lambda, alpha, t);
        const G = GTerm(Kdash, Bdashdash, S, Sy, alpha, t);
        corsum += F * G * WT[IPT];
    }

    // THE "0.5" IN THE NEXT LINE IS FROM THE CHANGE IN RANGE OF INTEGRATION
    // IN THE GAUSSIAN QUADRATURE FROM -1 -> 1 TO 0 -> 1.
    if (corsum < 0) {
        corsum = 0;
    }

    let correction = Qw * lambda * corsum * 0.5;
    if (correction > Qw) {
        correction = Qw;
    }

    return Qw * (erfc1 - exp1 * erfc2 - correction);
};


export function calculateDiagramData(Qw, S, T, d, tMin, tMax, lambda, dT, Kdash, Bdashdash, Sy) {
    const data = [];
    for (let t = tMin; t < tMax; t += dT) {
        data.push({
            t: t,
            dQ: calcDQ(d, S, T, t, lambda, Kdash, Bdashdash, Sy, Qw)
        });
    }
    return data;
}
