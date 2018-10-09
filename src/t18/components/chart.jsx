import PropTypes from 'prop-types';
import React from 'react';

import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid, BarChart, Bar
} from 'recharts';

import '../../less/toolDiagram.less';
import {calculateDiagramData} from '../calculations/calculationT18';

const Chart = ({LLRN, LLRO, AF, Q, IR, OD, Cn, Co}) => {
    const data = calculateDiagramData(LLRN, LLRO, AF, Q, IR, OD, Cn, Co);
    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width="100%" aspect={2.0}>
                            <BarChart layout="vertical" data={data} margin={{
                                top: 20,
                                right: 80,
                                left: 10,
                                bottom: 0
                            }}>

                                <XAxis type="number"/>
                                <YAxis type="category" dataKey="name"/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Bar isAnimationActive={false} dataKey="value" fill="#ED8D05"/>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="center-vertical center-horizontal">Area m{<sup>2</sup>}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Chart.propTypes = {
    LLRN: PropTypes.number.isRequired,
    LLRO: PropTypes.number.isRequired,
    AF: PropTypes.number.isRequired,
    Q: PropTypes.number.isRequired,
    IR: PropTypes.number.isRequired,
    OD: PropTypes.number.isRequired,
    Cn: PropTypes.number.isRequired,
    Co: PropTypes.number.isRequired,
};

export default Chart;
