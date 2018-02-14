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
    CartesianGrid
} from 'recharts';

// TODO: implement this eq in library

export function calculateDiagramData(w, K, ne, L, hL, x_min, x_max, d_x) {
    const small = 1e-12;
    const xi = x_min;
    const alpha = L*L + K * hL*hL / w;
    const root1 = Math.sqrt(alpha / K / w);
    const root3 = Math.sqrt(1/((xi*xi)+small) - 1/alpha);
    const root4 = Math.sqrt( (alpha / ((xi*xi)+small)) - 1);

    function calcT(x) {
        const root2 = Math.sqrt(1/(x*x) - 1/alpha);
        const root5 = Math.sqrt( (alpha / (x*x)) - 1);
        const ln = Math.log((Math.sqrt(alpha) / xi + root4) / (Math.sqrt(alpha) / x + root5));
        return ne * root1 * (x * root2 - xi * root3 + ln);
    }

    let data = [];
    if (x_max<x_min) x_max=x_min;
    for (let x = x_min; x <= x_max; x += d_x) {
        data.push({
            x,
            t: calcT(x)
        });
    }
    return data;
}

export  function calculateXwd(L, K, w, hL, h0) {
    return (L/2+K*(hL*hL-h0*h0)/(2*w*L));
}

export function resultDiv(xe, xi, L, data, xwd) {
    if (xe < xi){
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Arrival location, x<sub>e</sub>, can not be smaller than initial position, x<sub>i</sub>.</p>
                </div>
            </div>
        );
    }
    if (xe > L+Math.abs(xwd)){
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Arrival location, x<sub>e</sub>, can not be bigger than L<sup>'</sup>+|xwd|.</p>
                </div>
            </div>
        );
    }
    if (xi > L){
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Initial location, x<sub>i</sub>, can not be bigger than the Aquifer length, L<sup>'</sup>.</p>
                </div>
            </div>
        );
    }
    return(
        <div className="diagram-labels-bottom-right">
            <div className="diagram-label">
                <p>
                    t&nbsp;=&nbsp;<strong>{data[data.length -1].t.toFixed(1)}</strong>&nbsp;d
                </p>
            </div>
        </div>
    );

}

const Chart = ({W, K, ne, L, hL, h0, xi, xe}) => {
    const yDomain = [0, 'auto'];
    const xwd = calculateXwd(L, K, W, hL, h0);
    const data = calculateDiagramData(W, K, ne, L+Math.abs(xwd), hL, xi, xe, 10);
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
                                left: 30,
                                bottom: 0
                            }}>
                                <XAxis type="number" domain={['auto','auto']} dataKey="x" allowDecimals={false} tickLine={false}/>
                                <YAxis type="number" domain={yDomain} allowDecimals={false} tickLine={false} tickFormatter={(x) => {return x.toFixed(0)}}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'t'} stroke="#4C4C4C" strokeWidth="5" dot={false} fillOpacity={1}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels">
                            <p>t (d)</p>
                        </div>
                        {resultDiv(xe, xi, L, data, xwd)}
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
    W: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired,
    ne: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    hL: PropTypes.number.isRequired,
    h0: PropTypes.number.isRequired,
    xi: PropTypes.number.isRequired,
    xe: PropTypes.number.isRequired
};

export default pure(Chart);
