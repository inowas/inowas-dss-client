export function calculateData(mfi) {
    function calctV(V,t) {
        return t/V;
    }
    let data = [];
    mfi.map(param => {
        if (param.checked === 'true') {
            data.push({
                V: param.V,
                tV: calctV(param.V, param.t)
            });
        }
    });
    return data;
}
export function calculateDiagramData(data, info) {
    function calcMFIdata(V,mfi,a) {
        return mfi*V+a;
    }
    let newdata = [];
    data.map(param => {
        newdata.push({
            V: param.V,
            tV: param.tV,
            mfi: calcMFIdata(param.V, info.MFI, info.a)
        });
    });
    return newdata;
}
export function calcMFI(data, info) {
    // first pass: read in data, compute xbar and ybar
    var sumx = 0.0, sumy = 0.0, sumx2 = 0.0;
    data.map(param =>{
        sumx  += param.V;
        sumx2 += param.V * param.V;
        sumy  += param.tV;
    });
    const xbar = sumx / data.length;
    const ybar = sumy / data.length;

    // second pass: compute summary statistics
    var xxbar = 0.0, yybar = 0.0, xybar = 0.0;
    data.map(param =>{
        xxbar += (param.V - xbar) * (param.V - xbar);
        yybar += (param.tV - ybar) * (param.tV - ybar);
        xybar += (param.V - xbar) * (param.tV - ybar);
    });
    info.MFI = xybar / xxbar;
    info.a = ybar - info.MFI * xbar;
}
export function visc_Correc(table, temp, mfi) {
    var visc = 0;
    for (let i = 1; i < table.temp.length; i += 1) {
        if (table.temp[i] > temp && table.temp[i-1] < temp){
            visc = table.visc[i-1]+((table.visc[i] - table.visc[i-1])*(temp-table.temp[i-1]) /(table.temp[i] - table.temp[i-1]));
        }
        if(table.temp[i] === temp) {
            visc = table.visc[i]
        }
    }
    console.log(1002/visc);
    return mfi*1002/visc;
}