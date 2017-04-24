export function calculatek(CH, T, d10) {
        return CH * d10 * d10 * (0.7 + 0.33 * T);
}

export function calculateDiagramData(sieves, total, dSampSieve, hydroData, parametersWet) {
    const rhoS = parametersWet.find(p => {
        return p.name == 'rhoS'
    }).value;
    const Mh = parametersWet.find(p => {
        return p.name == 'Mh'
    }).value;
    const Fm = parametersWet.find(p => {
        return p.name == 'Fm'
    }).value;
    const h = parametersWet.find(p => {
        return p.name == 'h'
    }).value;
    const h0 = parametersWet.find(p => {
        return p.name == 'h0'
    }).value;
    const Lh = parametersWet.find(p => {
        return p.name == 'Lh'
    }).value;
    const VA = parametersWet.find(p => {
        return p.name == 'VA'
    }).value;
    const Az = parametersWet.find(p => {
        return p.name == 'Az'
    }).value;
    const Smin = parametersWet.find(p => {
        return p.name == 'Smin'
    }).value;
    const Smax = parametersWet.find(p => {
        return p.name == 'Smax'
    }).value;
    var tot = 0;
    function calcPercentage(val) {
        tot = tot + val;
        return 100-tot*100/dSampSieve.value
    }

    function calcD(R, T, time) {
        var Ra = (R-1)*1000;
        var Rc = Ra+Fm;
        var Ct = (0.0053*T*T)-(0.0082*T)-1.9568;
        var n  = 0.00178/((1+0.00337*T)+(0.00022*T*T));
        var rhoW = 1/(((1+(2.31*T*T)*(2.31*T*T))-182)*0.000001);
        var rho = 1+ 0.001*Rc;
        var hs = (Lh/(Smax-Smin))*((Smin-rho)/1000);
        var hp = hs + h0+ Fm*(h-(VA/Az));
        const hhmmss = time.split(':');
        const minutes = Number(hhmmss[0])*60;
        const seconds = (minutes+ Number(hhmmss[1]))*60+Number(hhmmss[2]);
        return Math.sqrt(hp*(18.35*n/(rhoS -rhoW))/seconds);
    }

    function calcA(R, T) {
        var Ra = (R-1)*1000;
        var Rc = Ra+Fm;
        var Ct = (0.0053*T*T)-(0.0082*T)-1.9568;
        const Mf = (100/Mh)*(rhoS / (rhoS-1));
        var MA = dSampSieve.value;
        const Mlt120= (MA - total).toFixed(dSampSieve.decimals);
        return ((Rc+Ct)*Mf)*Mlt120/MA;
    }

    let data = [];
    sieves.map(param => {
        data.push({
            D: Number(param.id),
            Percentage: calcPercentage(param.value)
        });
    });
    hydroData.map(param => {
        data.push({
            D: calcD(param.reading, param.temp, param.time),
            Percentage: calcA(param.reading, param.temp)
        });
    });
    return data;
}

export function calculateD(data, percentage) {
    for (let i = 0; i < data.length; i += 1) {
        if (data[i].Percentage <= percentage && data[i-1].Percentage >= percentage){
            // return data[i-1].D+((data[i].D - data[i-1].D) (10-data[i-1].Percentage) /(data[i].Percentage - data[i-1].Percentage));
            return data[i-1].D+((data[i].D - data[i-1].D)*(percentage-data[i-1].Percentage) /(data[i].Percentage - data[i-1].Percentage));
        }
    }
}