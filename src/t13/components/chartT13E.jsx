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

import {calculateTravelTimeT13E} from '../calculations';

export function calculateDiagramData(Qw, ne, hL, h0, x, xi) {
    const data = [];
    for (let i = x; i <= xi; i += 10) {
        data.push({
            x: i,
            t: calculateTravelTimeT13E(i, h0, hL, x, ne, Qw)
        });
    }
    return data;
}

export function resultDiv(t) {
    return (
        <div className="diagram-labels-left">
            <div className="diagram-label">
                <p>
                    t&nbsp;=&nbsp;<strong>{t.toFixed(1)}</strong>&nbsp;days
                </p>
            </div>
        </div>
    );
}

// eslint-disable-next-line react/no-multi-comp
const Chart = ({Qw, ne, hL, h0, xi, x}) => {
    const yDomain = [0, 'auto'];
    const data = calculateDiagramData(Qw, ne, hL, h0, x, xi);
    const tMax = calculateTravelTimeT13E(xi, h0, hL, x, ne, Qw);
    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2}>
                            <LineChart data={data} margin={{
                                top: 20,
                                right: 50,
                                left: 30,
                                bottom: 0
                            }}>
                                <XAxis type="number"
                                       domain={['auto', 'auto']}
                                       dataKey="x"
                                       allowDecimals={false}
                                       tickLine={false}
                                />
                                <YAxis type="number"
                                       domain={yDomain}
                                       allowDecimals={false}
                                       tickLine={false}
                                       orientation={'right'}
                                       tickFormatter={(t) => t.toFixed(0)}
                                />
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line
                                    isAnimationActive={false}
                                    type="basis"
                                    dataKey={'t'}
                                    stroke="#4C4C4C"
                                    strokeWidth="5"
                                    dot={false}
                                    fillOpacity={1}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels-right">
                            <p>t (d)</p>
                        </div>
                        {resultDiv(tMax)}
                        <p className="center-vertical center-horizontal">x (m)</p>
                    </div>
                </div>
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
    x: PropTypes.number.isRequired
};

export default pure(Chart);
