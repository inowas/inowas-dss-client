import erfc from './erfc';

export function calculateDiagramData(C0, info, x_max, t_max, cas, infil, tau) {
    var vx = info.vx;
    var DL = info.DL;
    var R  = info.R;
    var tau_max = 10e+8;
    if (infil === 'OneTime') tau_max = tau;
    function calc_C(t,x) {
        const term1 = erfc((x-(vx*t/R))/(2*Math.sqrt(DL*t/R)));
        const term2 = erfc((x+(vx*t/R))/(2*Math.sqrt(DL*t/R)));
        return 0.5* (term1+Math.exp(vx*x/DL)*term2);
    }
    // this is for one time infiltration
    function calc_C_tau(t,x) {
        const term1 = erfc((x-(vx*t/R))/(2*Math.sqrt(DL*t/R)))-erfc((x-(vx*(t-tau)/R))/(2*Math.sqrt(DL*(t-tau)/R)));
        var term2 = erfc((x+(vx*t/R))/(2*Math.sqrt(DL*t/R)))-erfc((x+(vx*(t-tau)/R))/(2*Math.sqrt(DL*(t-tau)/R)));
        // this condition is necessary to fix a bug; it can be changed
        Math.abs(term2) < 10e-16 ? term2 = 0 : term2 = term2
        return 0.5* (term1+Math.exp(vx*x/DL)*term2);
    }
    function calc_t() {
        var c = 0;
        var t = 0;
       while (c < 0.9999) {
           c = calc_C(t, x_max);
           t = t + 20;
       }
       return t
    }
    function calc_x() {
        var c = 1;
        var x = 0;
        while (c > 0.0001) {
            c = calc_C(t_max, x);
            x = x + 20;
        }
        return x
    }
    // calculate the result (to be shown in info)
    info.C = (infil === 'OneTime' && t_max>tau) ? calc_C_tau(t_max,x_max) : calc_C(t_max,x_max);

    let data = [];
    if (cas === 'Case1') { //variable time, fixed length
        const x = x_max;
        const t_max = calc_t();
        var dt = Math.floor(t_max/25);
        var t_start =  t_max-dt*25;
        if (dt < 1) {
            t_start = 1;
            dt = 1
        }
        for (let t = 0; t <= t_max; t += dt) {
            if (t < tau_max) {
                data.push({
                    t: t,
                    C: calc_C(t,x)
                });
            } else {
                data.push({
                    t: t,
                    C: calc_C_tau(t,x)
                });
            }
        }
    }
    if (cas === 'Case2') {
        const t = t_max;
        const x_max = calc_x();
        var dx = x_max/25;
        var x_start =  x_max-dx*25;
        if (dx < 1) {
            x_start = 1;
            dx = 1
        }
        for (let x = 0; x <= x_max; x += dx) {
            if (t < tau_max) {
                data.push({
                    x: x,
                    C: calc_C(t,x)
                });
            } else {
                data.push({
                    x: x,
                    C: calc_C_tau(t,x)
                });
            }
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