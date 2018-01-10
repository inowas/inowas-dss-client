import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {calculateDiagramData} from '../calculations/calculationT14A';

import '../../less/toolDiagram.less';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

const Chart = ({Qw, t, S, T, d}) => {
    const data = calculateDiagramData(Qw, S, T, d, 0, t, 1);
    const dQ = data[data.length - 1].dQ;

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
                                <XAxis label="T (d)" type="number" dataKey="t"/>
                                <YAxis label="dQ (m³/d)" type="number" domain={[0, 'auto']}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'dQ'} stroke="#4C4C4C" strokeWidth="5" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-labels-bottom-right">
                            <div className="diagram-label">
                                <p>
                                    &#916;Q&nbsp;=&nbsp;<strong>{dQ.toFixed(1)}</strong>&nbsp;m³/d
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Chart.propTypes = {
    Qw: PropTypes.number.isRequired,
    S: PropTypes.number.isRequired,
    T: PropTypes.number.isRequired,
    d: PropTypes.number.isRequired,
    t: PropTypes.number.isRequired
};

export default pure(Chart);
