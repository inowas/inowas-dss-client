function temperatureViscosityTable() {
    return {
        temp: [-30, -20, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40],
        visc: [8661.1, 4362.7, 2645.2, 2153.5, 1792.3, 1518.7, 1306.4, 1138, 1002, 890.45, 797.68, 719.62, 653.25]
    };
}

function calcTv(V, t) {
    return t / V;
}

function calcMFIData(V, mfi, a) {
    return mfi * V + a;
}

function preprocessData(data) {
    const newData = [];
    data.forEach(param => {
        if (param.checked === 'true') {
            newData.push({
                V: param.V,
                tV: calcTv(param.V, param.t)
            });
        }
    });
    return newData;
}

export function calculateDiagramData(data, MFI, a) {
    const preprocessedData = preprocessData(data);
    const diagramData = [];
    preprocessedData.forEach(param => {
        diagramData.push({
            V: param.V,
            tV: param.tV,
            mfi: calcMFIData(param.V, MFI, a)
        });
    });

    return diagramData;
}

function viscosityCorrection(temperature, mfi) {
    const table = temperatureViscosityTable();
    let visc = 0;
    for (let i = 1; i < table.temp.length; i += 1) {
        if (table.temp[i] > temperature && table.temp[i - 1] < temperature) {
            visc = table.visc[i - 1] + ((table.visc[i] - table.visc[i - 1]) * (temperature - table.temp[i - 1]) / (table.temp[i] - table.temp[i - 1]));
        }
        if (table.temp[i] === temperature) {
            visc = table.visc[i];
        }
    }
    return mfi * 1002 / visc;
}

export function calcMFI(data) {

    const preprocessedData = preprocessData(data);

    // first pass: read in data, compute xBar and yBar
    let sumX = 0.0;
    let sumY = 0.0;
    let sumX2 = 0.0;

    preprocessedData.forEach(param => {
        sumX += param.V;
        sumX2 += param.V * param.V;
        sumY += param.tV;
    });

    const xBar = sumX / preprocessedData.length;
    const yBar = sumY / preprocessedData.length;

    // second pass: compute summary statistics
    let xxbar = 0.0;
    let yybar = 0.0;
    let xybar = 0.0;

    preprocessedData.forEach(param => {
        xxbar += (param.V - xBar) * (param.V - xBar);
        yybar += (param.tV - yBar) * (param.tV - yBar);
        xybar += (param.V - xBar) * (param.tV - yBar);
    });

    const MFI = xybar / xxbar;
    const a = yBar - MFI * xBar;

    return {
        MFI,
        a
    };
}

export function calculateMFIcor1(T, MFI, P, Af) {
    return viscosityCorrection(T, MFI) * (P / 210) * (Af ** 2 / 0.00138 ** 2);
}

export function calculateD50(K) {
    return (10 ** (-3) * (K / 150) ** 0.6);
}

export function calculateEPS(D50) {
    return D50 / 6;
}

export function calculateMFIcor2(MFIcor1, D, K) {
    const D50 = calculateD50(K);
    const EPS = calculateEPS(D50);
    return MFIcor1 * ((D * 10 ** (-6)) ** 2 / EPS ** 2);
}

export function calculateVC(MFIcor2, ueq, IR, K) {
    return 2 * 10 ** (-6) * MFIcor2 * (ueq) * (IR ** 2 / (K / 150) ** 1.2);
}

export function calculateR2(data) {
    let sumX = 0;
    data.forEach(param => {
        sumX += param.tV;
    });
    const tvBar =  sumX / data.length;
    let SStot = 0;
    data.forEach(param => {
        SStot += (param.tV-tvBar)**2;
    });
    let SSres = 0;
    data.forEach(param => {
        SSres += (param.tV-param.mfi)**2;
    });
    if (SStot == 0) {SStot = 1e-12}

    return (1-(SSres/SStot))
}
