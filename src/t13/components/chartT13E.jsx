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

export function calculateDiagramData(Qw, ne, hL, h0, x, xi) {
    function calcT(x) {
        return ((0.95*h0 + 0.05*hL)*Math.PI*(xi**2 - x**2)*ne/Qw);
    }

    let data = [];
    for (let i = x; i <= xi; i += 10) {
        data.push({
            x: i,
            t: calcT(i)
        });
    }
    return data;
}
export function resultDiv(data) {
    return(
        <div className="diagram-labels-right">
            <div className="diagram-label">
                <p>
                    t&nbsp;=&nbsp;<strong>{(data[0].t/365).toFixed(2)}</strong>&nbsp;y
                </p>
            </div>
        </div>
    );

}

const Chart = ({Qw, ne, hL, h0, xi, x}) => {
    const yDomain = [0, 'auto'];
    const data = calculateDiagramData(Qw, ne, hL, h0, x, xi);
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
                        {resultDiv(data)}
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
    Qw: PropTypes.number.isRequired,
    ne: PropTypes.number.isRequired,
    hL: PropTypes.number.isRequired,
    h0: PropTypes.number.isRequired,
    xi: PropTypes.number.isRequired,
    x : PropTypes.number.isRequired
};

export default pure(Chart);
