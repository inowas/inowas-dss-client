
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
        dataSet['x'] = xRange[i];
        const h = calculateH(q, k, d, df, ds);
        dataSet['h'] = calculateCurve(h, xRange[i]);
        data.push(dataSet);
    }

    return data;
}

export  function calculateZ(d) {
    return 0.4*d;
}

export  function calculateH(q, k, d, df, ds) {
    return ((q*df)/(2*Math.PI*d*k*(ds-df)));
}

export  function calculateCurve(z, x) {
    x = x/50;
    return (z * Math.pow(Math.E, -(x*x*x*x)));
}

export  function calculateQ(k, d, df, ds) {
    return (0.6 * Math.PI * d * d * k * ((ds-df)/ds));
}
