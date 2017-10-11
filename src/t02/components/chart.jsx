import React from 'react';
import PropTypes from 'prop-types';
import { mounding } from 'gwflowjs';
import { pure } from 'recompose';

import '../../less/toolDiagram.less';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

const calculateXMax = (w, L, W, hi, Sy, K, t, stepSize = 50, threshold = 0.01) => {
    let xMax = stepSize;
    while (mounding.calculateHi( xMax, 0, w, L, W, hi, Sy, K, t ) > threshold) {
        xMax += stepSize;
    }

    return xMax;
};

const calculateYMax = (w, L, W, hi, Sy, K, t, stepSize = 50, threshold = 0.01) => {
    let yMax = stepSize;
    while (mounding.calculateHi( 0, yMax, w, L, W, hi, Sy, K, t ) > threshold) {
        yMax += stepSize;
    }

    return yMax;
};

const calculateDiagramData = (variable, w, L, W, hi, Sy, K, t, min, max, stepSize) => {
    const data = [];
    if (variable === 'x') {
        for (let x = min; x < max; x += stepSize) {
            data.push( {
                x,
                hhi: mounding.calculateHi( x, 0, w, L, W, hi, Sy, K, t )
            } );
        }
    } else {
        for (let y = min; y < max; y += stepSize) {
            data.push( {
                y,
                hhi: mounding.calculateHi( 0, y, w, L, W, hi, Sy, K, t )
            } );
        }
    }

    return data;
};

const Chart = ({settings, w, L, W, hi, Sy, K, t}) => {
    let max = 0;
    if (settings.variable === 'x') {
        max = calculateXMax( w, L, W, hi, Sy, K, t, 50, 0.01 );
    } else {
        max = calculateYMax( w, L, W, hi, Sy, K, t, 50, 0.01 );
    }

    const variable = settings.variable;
    const data = calculateDiagramData( variable, w, L, W, hi, Sy, K, t, 0, max, 10 );
    const hMax = data[ 0 ].hhi + hi;

    let xAxis = <XAxis type="number" dataKey="y"/>;
    let xLabel = 'y (m)';

    if (variable === 'x') {
        xAxis = <XAxis type="number" dataKey="x"/>;
        xLabel = 'x (m)';
    }

    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2.0}>
                            <LineChart data={data} margin={{
                                top: 20,
                                right: 40,
                                left: 40,
                                bottom: 0
                            }}>
                                {xAxis}
                                <YAxis type="number"/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'hhi'} stroke="#1EB1ED"
                                      strokeWidth="5" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels">
                            <p>h - hi (m)</p>
                        </div>
                        <div className="diagram-labels-right">
                            <div className="diagram-label">
                                <p>
                                    h<sub>max</sub>
                                    =
                                    <strong>{hMax.toFixed( 2 )}</strong>
                                    m
                                </p>
                            </div>
                        </div>
                        <p className="center-vertical center-horizontal">{xLabel}</p>
                    </div>
                </div>
                <div className="col col-rel-0-5">
                    <ul className="nav nav-stacked" role="navigation">
                        <li>
                            <button className="button">PNG</button>
                        </li>
                        <li>
                            <button className="button">CSV</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

Chart.propTypes = {
    settings: PropTypes.object,
    w: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    W: PropTypes.number.isRequired,
    hi: PropTypes.number.isRequired,
    Sy: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired,
    t: PropTypes.number.isRequired,
};

export default pure( Chart );
