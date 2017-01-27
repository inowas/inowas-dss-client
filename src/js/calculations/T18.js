export function calculateDiagramData(LLRN, LLRO, AF, Q, IR, OD, Cn, Co) {
    const HLR = calcHLR(IR, AF);
    Cn = calcC(Cn, IR, AF, OD, LLRN);
    Co = calcC(Co, IR, AF, OD, LLRO);
    return [{
        name: 'AH',
        value: calcA(1, Q, HLR)
    }, {
        name: 'AN',
        value: calcA(Cn, Q, LLRN)
    }, {
        name: 'AO',
        value: calcA(Co, Q, LLRO)
    }]
}

export function convertLLR(LLR) {
    return LLR / 10000 * 365; // convert kg/ha/d to kg/m2/y
}

export function convertQ(Q) {
    return Q * 1000000; // convert Mega to standard
}

export function convertC(C) {
    return C / 1000; //convert mg/l to kg/m3
}

export function isCtoHigh(C, IR, AF, OD, LLR) {
    const HLR = calcHLR(IR, AF),
        LR = calcLR(HLR, C, OD);
    if (LR > LLR) {
        return true;
    }
    return false;
}

function calcC(C, IR, AF, OD, LLR) {
    if (isCtoHigh(C, IR, AF, OD, LLR)) {
        // overrride user input
        const HLR = calcHLR(IR, AF);
        return LLR * OD / HLR / 365;
    }
    return C;
}

function calcHLR(IR, AF) {
    return IR * AF;
}

function calcLR(HLR, C, OD) {
    return HLR * C * 365 / OD;
}

function calcA(C, Q, LLR) {
    return C * Q / LLR;
}
