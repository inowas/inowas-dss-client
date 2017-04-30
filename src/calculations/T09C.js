
function range(start, stop, step) {
    let a=[start], b=start;
    while(b<stop){b+=step;a.push(b)}
    return a;
}

export function calculateDiagramData(q, k, d, df, ds, start, stop, step) {

    const xRange = range(start, stop, step);
    let data = [];

    for(let i=0; i<xRange.length; i++){
        let dataSet = {};
        const x = xRange[i];
        const h = calculateZ(q, k, d, df, ds);

        dataSet['x'] = Number(x);
        dataSet['h'] = calculateZofX(x, q, d, k, ds, df);
        data.push(dataSet);
    }

    return data;
}

export  function calculateZCrit(d) {
    return 0.3 * d;
}

export  function calculateZ(q, k, d, df, ds) {
    return (q/(2*Math.PI*d*k*dRo(df, ds)));
}

export function dRo(df, ds){
    return ((ds-df)/df);
}

export function calculateR(x, d) {
    return x/d;
}

export function calculateT(df, ds, k, d) {
    const t = 1000000000;
    const n = 0.25;
    const deltaS = dRo(df, ds);
    return (deltaS * k * t)/(n*d*(2+deltaS));
}

export  function calculateZofX(x, q, d, k, ds, df) {
    return (1/(Math.sqrt(Math.pow(calculateR(x,d), 2)+1)) - (1/(Math.sqrt(Math.pow(calculateR(x,d),2)+Math.pow(1+calculateT(df, ds, k, d),2))))) * calculateZ(q, k, d, df, ds);
}

export  function calculateQ(k, d, df, ds) {
    return (0.6 * Math.PI * d * d * k * dRo(df, ds));
}
