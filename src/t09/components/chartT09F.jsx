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
} from 'recharts';

import * as calc from '../calculations/calculationT09F';

const calculationErrorOverlay = (maxIter, valid, dxt) => {
    if (!valid) {
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Invalid values: square root gets minus.</p>
                    <p>Offshore discharge rate is less than minimum discharge rate</p>
                </div>
            </div>
        );
    }

    if (maxIter) {
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Maximum number of iterations are conducted.</p>
                    <p>Change in x <sub>t</sub>&nbsp;=&nbsp;<strong>{dxt.toFixed(1)}</strong>&nbsp;m</p>
                </div>
            </div>
        );
    }

    return (
        <div className="diagram-labels-left">
            <div className="diagram-label">
                <p>Change in x <sub>t</sub>&nbsp;=&nbsp;<strong>{dxt.toFixed(1)}</strong>&nbsp;m</p>
            </div>
        </div>
    );
};

const Chart = ({dz, k, z0, l, w, theta, x, df, ds}) => {

    const newXt = calc.calcNewXt({dz, k, z0, l, w, theta, x, df, ds});
    const xt = calc.calcXt({dz, k, z0, l, w, theta, x, df, ds});
    const dxt = calc.calcDeltaXt({dz, k, z0, l, w, theta, x, df, ds});

    const data = [{
        xt: newXt,
        z0_new: -z0
    }, {
        xt: xt,
        z0: -z0,
        z0_new: (dz + z0) / (l - newXt) * xt - z0 - (dz + z0) / (l - newXt) * newXt
    }, {
        xt: l,
        z0: 0,
        z0_new: dz
    }];

    // return null;

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
                                left: 50,
                                bottom: 0
                            }}>

                                <XAxis
                                    type="number"
                                    dataKey="xt"
                                    domain={[Math.floor(newXt / 100) * 100, l]}
                                />
                                <YAxis
                                    type="number"
                                    allowDecimals={false}
                                    tickLine={false}
                                    tickFormatter={(tick) => tick.toFixed(1)}
                                    orientation="right"
                                />
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'z0'} stroke="#ED8D05"
                                      strokeWidth="5" dot={false}/>
                                <Line isAnimationActive={false} type="basis" dataKey={'z0_new'} stroke="#ED8D05"
                                      strokeWidth="5" dot={false} strokeDasharray="15 15"/>
                                <ReferenceLine y={-z0} stroke="black" strokeWidth="1" strokeDasharray="3 3"
                                               label="z₀" dot={false}/>
                                <ReferenceLine x={xt} stroke="black" strokeWidth="1" strokeDasharray="3 3"
                                               label="xt" dot={false}/>
                                <ReferenceLine x={newXt} stroke="black" strokeWidth="1" strokeDasharray="3 3"
                                               label="xt'" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels-right">
                            <p>z<sub>0</sub> (m)</p>
                        </div>
                        <div className="diagram-labels-left">
                            <div className="diagram-label">
                                <p>x<sub>t</sub>&nbsp;=&nbsp;<strong>{xt.toFixed(1)}</strong>&nbsp;m</p>
                                <p>x<sub>t</sub>'&nbsp;=&nbsp;<strong>{newXt.toFixed(1)}</strong>&nbsp;m</p>
                                <p>dx<sub>t</sub>&nbsp;=&nbsp;<strong>{dxt.toFixed(1)}</strong>&nbsp;m</p>
                            </div>
                        </div>
                        <p className="center-vertical center-horizontal">x<sub>w</sub> (m)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Chart.propTypes = {
    dz: PropTypes.number.isRequired,
    k: PropTypes.number.isRequired,
    z0: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    theta: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    ds: PropTypes.number.isRequired,
    df: PropTypes.number.isRequired
};

export default pure(Chart);
