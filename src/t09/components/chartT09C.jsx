import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';

import '../../less/toolDiagram.less';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine
} from "recharts";

// TODO: implement this eq in library

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

const Chart = ({q, k, d, df, ds}) => {
    const data = calculateDiagramData(q, k, d, df, ds, 0, 1000, 1);
    const yDomain = [0, 2 * calculateZCrit(d)];
    const z = calculateZ(q, k, d, df, ds);
    const qmax = calculateQ(k, d, df, ds);
    const zCrit = calculateZCrit(d);

    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2.0 / 1.0}>
                            <LineChart data={data} margin={{
                                top: 20,
                                right: 55,
                                left: 20,
                                bottom: 0
                            }}>

                                <XAxis type="number" dataKey="x"/>
                                <YAxis type="number" domain={yDomain} allowDecimals={false} tickLine={false} tickFormatter={(x) => {return x.toFixed(1)}}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'h'} stroke="#ED8D05" strokeWidth="5" dot={false}/>
                                <ReferenceLine y={zCrit} stroke="#ED8D05" strokeWidth="5" strokeDasharray="20 20"/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels">
                            <p>d (m)</p>
                        </div>
                        <div className="diagram-labels-right">
                            <div className="diagram-label">
                                <p>
                                    z&nbsp;=&nbsp;<strong>{z.toFixed(1)}</strong>&nbsp;
                                    m
                                </p>
                            </div>
                            <div className="diagram-label">
                                <p>
                                    Q<sub>max</sub>&nbsp;=&nbsp;<strong>{qmax.toFixed(1)}</strong>&nbsp;m<sup>3</sup>/d
                                </p>
                            </div>
                        </div>
                        <p className="center-vertical center-horizontal">x (m)</p>
                    </div>
                </div>
                {/*<div className="col col-rel-0-5">*/}
                    {/*<ul className="nav nav-stacked" role="navigation">*/}
                        {/*<li>*/}
                            {/*<button className="button">PNG</button>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<button className="button">CSV</button>*/}
                        {/*</li>*/}
                    {/*</ul>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

Chart.propTypes = {
    q: PropTypes.number.isRequired,
    k: PropTypes.number.isRequired,
    d: PropTypes.number.isRequired,
    df: PropTypes.number.isRequired,
    ds: PropTypes.number.isRequired
};

export default pure(Chart);
