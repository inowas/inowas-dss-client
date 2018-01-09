import erfc from '../../calculations/erfc';

export function calcC(t, x, vx, R, DL) {
    const term1 = erfc((x - (vx * t / R)) / (2 * Math.sqrt(DL * t / R)));
    const term2 = erfc((x + (vx * t / R)) / (2 * Math.sqrt(DL * t / R)));

    return 0.5 * (term1 + Math.exp(vx * x / DL) * term2);
}

// this is for one time infiltration
export function calcCTau(t, x, vx, R, DL, tau) {
    const term1 = erfc((x - (vx * t / R)) / (2 * Math.sqrt(DL * t / R))) - erfc((x - (vx * (t - tau) / R)) / (2 * Math.sqrt(DL * (t - tau) / R)));
    let term2 = erfc((x + (vx * t / R)) / (2 * Math.sqrt(DL * t / R))) - erfc((x + (vx * (t - tau) / R)) / (2 * Math.sqrt(DL * (t - tau) / R)));
    term2 = Math.abs(term2) < 10e-16 ? 0 : term2;
    return 0.5 * (term1 + Math.exp(vx * x / DL) * term2);
}

export function calcT(xMax, vx, R, DL) {
    let c = 0;
    let t = 0;
    while (c < 0.9999) {
        c = calcC(t, xMax, vx, R, DL);
        t = t + 20;
    }

    return t;
}

export function calcX(tMax, vx, R, DL) {
    let c = 1;
    let x = 0;
    while (c > 0.0001) {
        c = calcC(tMax, x, vx, R, DL);
        x = x + 20;
    }
    return x;
}

export function calculateVx(K, ne, I) {
    return K * I / ne;
}

export function calculateDL(alphaL, vx) {
    return alphaL * vx;
}

export function calculateR(ne, Kd) {
    const rHob = (1 - ne) * 2.65;
    return 1 + Kd * rHob / ne;
}

export function calculateKd(kOw, cOrg) {
    const Koc = Math.exp(Math.log(kOw) - 0.21);
    return Koc * cOrg;
}

export function calculateDiagramData(settings, vx, DL, R, C0, xMax, tMax, tau) {
    let tauMax = 10e+8;
    if (settings.infiltration === 'oneTime') {
        tauMax = tau;
    }

    const data = [];
    if (settings.case === 'variableTime') {
        const x = xMax;
        tMax = calcT(xMax, vx, R, DL);

        let dt = Math.floor(tMax / 25);
        let tStart = tMax - dt * 25;
        if (dt < 1) {
            tStart = 1;
            dt = 1;
        }
        for (let t = 0; t <= tMax; t += dt) {
            if (t < tauMax) {
                data.push({
                    t: t,
                    C: calcC(t, x, vx, R, DL)
                });
            } else {
                data.push({
                    t: t,
                    C: calcCTau(t, x, vx, R, DL)
                });
            }
        }
    }

    if (settings.case === 'fixedTime') {
        const t = tMax;
        xMax = calcX(tMax, vx, R, DL);
        let dx = xMax / 25;
        let xStart = xMax - dx * 25;
        if (dx < 1) {
            xStart = 1;
            dx = 1;
        }
        for (let x = 0; x <= xMax; x += dx) {
            if (t < tauMax) {
                data.push({
                    x: x,
                    C: calcC(t, x, vx, R, DL)
                });
            } else {
                data.push({
                    x: x,
                    C: calcCTau(t, x, vx, R, DL)
                });
            }
        }
    }
    return data;
}
