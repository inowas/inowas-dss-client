
function range(start, stop, step) {
    let a=[start], b=start;
    while(b<stop){b+=step;a.push(b)}
    return a;
}

export function calculateDiagramData(i, b, df, ds, start, stop, step) {

    const xRange = range(start, stop, step);
    let data = [];

    for(let ni=0; ni<xRange.length; ni++){
        let dataSet = {};
        const x = xRange[ni];
        const z = calculateZofX(x, i, b, df, ds);

        dataSet['x'] = x;
        if (z<=b){
            dataSet['z'] = -z;
        }
        dataSet['b'] = -b;
        data.unshift(dataSet);
    }

    return data;
}

export  function calculateZ(i, b, df, ds) {
    return (i*b*df)/(ds-df);
}

export  function calculateZofX(x, i, b, df, ds) {
    const value = Math.sqrt(
        ((2*i*b*x)/(ds-df))+(Math.pow((i*b*df)/(ds-df), 2))
    );

    return value;
}

export  function calculateL(i, b, df, ds) {
    return (i*b*df)/(2*(ds-df));
}
