import erfc from './erfc';

export function calculateDiagramData(C0, vx, DL, R, x_max, t_max, cas) {
    function calc_C(t,x) {
        const term1 = erfc((x-(vx*t/R))/(2*Math.sqrt(DL*t/R)));
        const term2 = erfc((x+(vx*t/R))/(2*Math.sqrt(DL*t/R)));
        return C0 * 0.5* (term1+Math.exp(vx*x/DL)*term2);
    }

    let data = [];
    if (cas === 'Case1') {
        const x = x_max;
        var dt = Math.floor(t_max/25);
        var t_start =  t_max-dt*25;
        if (dt < 1) {
            t_start = 1;
            dt = 1
        }
        for (let t = t_start; t <= t_max; t += dt) {
            data.push({
                t: t,
                C: calc_C(t,x)
            });
        }
    }
    if (cas === 'Case2') {
        const t = t_max;
        var dx = x_max/25;
        var x_start =  x_max-dx*25;
        if (dx < 1) {
            x_start = 1;
            dx = 1
        }
        for (let x = x_start; x <= x_max; x += dx) {
            data.push({
                x: x,
                C: calc_C(t,x)
            });
        }
    }
    return data;
}

export function calculate_vx(K,ne,I) {
    return K*I/ne;
}
export function calculate_DL(alphaL,vx) {
    return alphaL*vx;
}
export function calculate_R(ne, Kd) {
    const rhob = (1-ne)*2.65;
    return 1+ Kd*rhob/ne;
}
export function calculate_kd(Kow,Corg) {
    const Koc = Math.exp(Math.log(Kow)-0.21);
    const Kd = Koc * Corg;
    return Kd;
}