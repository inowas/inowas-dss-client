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

import {SETTINGS_SELECTED_H0, SETTINGS_SELECTED_HL, SETTINGS_SELECTED_NOTHING} from '../reducers/T13B';

import {calculateTravelTimeT13B, calculateXwd} from '../calculations';

export function calculateDiagramData(w, K, ne, L1, h1, xMin, xMax, dX) {
    const data = [];
    if (xMax < xMin) {
        // eslint-disable-next-line no-param-reassign
        xMax = xMin;
    }

    for (let x = xMin; x <= xMax; x += dX) {
        data.push({
            x: x,
            t: calculateTravelTimeT13B(x, w, K, ne, L1, h1, xMin)
        });
    }
    return data;
}

export function resultDiv(xe, xi, L, data) {
    if (xe < xi) {
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Arrival location, x<sub>e</sub>, can not be smaller than initial position, x<sub>i</sub>.</p>
                </div>
            </div>
        );
    }
    if (xe > L) {
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Arrival location, x<sub>e</sub>, can not be bigger than the Aquifer length, L<sup>'</sup>.</p>
                </div>
            </div>
        );
    }
    if (xi > L) {
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Initial location, x<sub>i</sub>, can not be bigger than the Aquifer length, L<sup>'</sup>.</p>
                </div>
            </div>
        );
    }
    return (
        <div className="diagram-labels-bottom-right">
            <div className="diagram-label">
                <p>
                    t&nbsp;=&nbsp;<strong>{data[data.length - 1].t.toFixed(1)}</strong>&nbsp;d
                </p>
            </div>
        </div>
    );
}

// eslint-disable-next-line react/no-multi-comp
const Chart = ({W, K, L, hL, h0, ne, xi, xe, settings}) => {
    const yDomain = [0, 'auto'];
    let data = [];
    const xwd = calculateXwd(L, K, W, hL, h0).toFixed(1);
    if (settings === SETTINGS_SELECTED_H0) {
        data = calculateDiagramData(W, K, ne, (xwd * 1), h0, xi, xe, 10);
    }
    if (settings === SETTINGS_SELECTED_HL) {
        data = calculateDiagramData(W, K, ne, (L - xwd), hL, xi, xe, 10);
    }
    if (settings === SETTINGS_SELECTED_NOTHING) {
        data = [{x: 0, t: 0}];
    }
    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2}>
                            <LineChart data={data} margin={{
                                top: 20,
                                right: 55,
                                left: 30,
                                bottom: 0
                            }}>
                                <XAxis type="number" dataKey="x" allowDecimals={false} tickLine={false}/>
                                <YAxis type="number" domain={yDomain} allowDecimals={false} tickLine={false}
                                       tickFormatter={(x) => (x.toFixed(0))}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'t'} stroke="#4C4C4C"
                                      strokeWidth="5" dot={false} fillOpacity={1}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels">
                            <p>t (d)</p>
                        </div>
                        {resultDiv(xe, xi, L, data)}
                        <p className="center-vertical center-horizontal">x (m)</p>
                    </div>
                </div>
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
    xe: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired,
};

export default pure(Chart);
