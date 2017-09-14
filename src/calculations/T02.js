import numericallyIntegrate from './numericallyIntegrate';
import erf from './erf';

export function calculateDiagramData(variable, w, L, W, hi, Sy, K, t, xMin, xMax, dX) {
    const a = W / 2;
    const l = L / 2;
    const v = K * hi / Sy;
    const sqrt4vt = Math.sqrt(4 * v * t);

    // eq 2
    function S(alpha, beta) {
        return numericallyIntegrate(0, 1, 0.001, function(tau) {
            if (tau !== 0) {
                const sqrtTau = Math.sqrt(tau);
                return erf(alpha / sqrtTau) * erf(beta / sqrtTau);
            }
            return 0;
        });
    }

    // code for eq 1 with y = 0
    function calcHhi(x, y) {
        const s1 = S((l + x) / sqrt4vt, (a + y) / sqrt4vt);
        const s2 = S((l + x) / sqrt4vt, (a - y) / sqrt4vt);
        const s3 = S((l - x) / sqrt4vt, (a + y) / sqrt4vt);
        const s4 = S((l - x) / sqrt4vt, (a - y) / sqrt4vt);

        if (hi === 0) {
            return Math.sqrt(w / 2 / K * v * t * (s1 + s2 + s3 + s4) + hi * hi) - hi;
        }

        return Math.sqrt(w / 2 / K * v * t * (s1 + s2 + s3 + s4) + hi * hi) - hi;
    }

    const data = [];
    if (variable === 'x') {
        for (let x = xMin; x < xMax; x += dX) {
            data.push({
                x,
                hhi: calcHhi(x, 0)
            });
        }
    } else {
        for (let y = xMin; y < xMax; y += dX) {
            data.push({
                y,
                hhi: calcHhi(0, y)
            });
        }
    }

    return data;
}
