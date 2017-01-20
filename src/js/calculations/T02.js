import numericallyIntegrate from './numericallyIntegrate';
import erf from './erf';

export function calculateDiagramData(w, L, W, hi, Sy, K, t, x_min, x_max, d_x) {
    const a = W / 2,
        l = L / 2,
        v = K * hi / Sy,
        sqrt4vt = Math.sqrt(4 * v * t);

    // eq 2
    function S(alpha, beta) {
        return numericallyIntegrate(0, 1, 0.05, function(tau) {
            if (tau != 0) {
                const sqrttau = Math.sqrt(tau);
                return erf(alpha / sqrttau) * erf(beta / sqrttau);
            }
            return 0;
        });
    }

    // code for eq 1 with y = 0
    function calcHhi(x) {
        const s1 = S((l + x) / sqrt4vt, a / sqrt4vt), // y = 0 => s1 = s2
            s3 = S((l - x) / sqrt4vt, a / sqrt4vt);  // y = 0 => s3 = s4
        console.log(x, s1, s3);
        return Math.sqrt(w / 2 / K * v * t * (2 * s1 + 2 * s3) + hi * hi) - hi; // eq 1
    }

    let data = [];
    for (let x = x_min; x < x_max; x += d_x) {
        data.push({
            x: x,
            hhi: calcHhi(x)
        });
    }
    return data;
}
