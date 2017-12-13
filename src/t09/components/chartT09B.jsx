import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';

import '../../less/toolDiagram.less';

import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line
} from 'recharts'

// TODO: implement this eq in library
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

        dataSet['x'] = -x;
        if (z<=b) {
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

export function calculateXT(i, b, rho_f, rho_s) {
    const frac1 = (i*b*rho_f) / (rho_s - rho_f);
    return ((b*b - frac1*frac1)*(rho_s - rho_f)) / (2*i*b);
}

const Chart = ({b, i, df, ds}) => {
    const yDomain = [-b, 0];
    const z = calculateZ(i, b, df, ds);
    const L = calculateL(i, b, df, ds);
    const xT = calculateXT(i, b, df, ds);
    const xDomain = [(Math.round(xT/50,0)+1)*50, 0];
    const data = calculateDiagramData(i, b, df, ds, 0, (Math.round(xT/50,0)+1)*50, 1);
    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">

                    <div className="aspect-ratio-element diagram">
                        <ResponsiveContainer width="100%" aspect={2.0 / 1.0}>
                            <LineChart data={data} margin={{
                                top: 20,
                                right: 55,
                                left: 30,
                                bottom: 0
                            }}>
                                <XAxis type="number" domain={xDomain} dataKey="x" allowDecimals={false} tickLine={false}/>
                                <YAxis type="number" domain={yDomain} allowDecimals={false} tickLine={false} tickFormatter={(x) => {return x.toFixed(1)}}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line dot={false} isAnimationActive={false} type="basis" dataKey="b" stroke="#000000" strokeWidth="5" fillOpacity={1}/>
                                <Line dot={false} isAnimationActive={false} type="basis" dataKey="z" stroke="#ED8D05" strokeWidth="5" fillOpacity={1}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels">
                            <p>z (m)</p>
                        </div>
                        <div className="diagram-labels-bottom-right">
                            <div className="diagram-label">
                                <p>z<sub>0</sub>&nbsp;
                                    =&nbsp;
                                    <strong>{z.toFixed(1)}</strong>&nbsp;
                                    m</p>
                            </div>
                            <div className="diagram-label">
                                <p>L&nbsp; = &nbsp;
                                    <strong>{L.toFixed(1)}</strong>&nbsp;
                                    m</p>
                            </div>
                            <div className="diagram-label">
                                <p>x<sub>T</sub>&nbsp;
                                    =&nbsp;
                                    <strong>{xT.toFixed(1)}</strong>&nbsp;
                                    m</p>
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
    b: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
    df: PropTypes.number.isRequired,
    ds: PropTypes.number.isRequired
};

export default pure(Chart);
