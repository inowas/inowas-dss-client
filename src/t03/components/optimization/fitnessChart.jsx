import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';

import '../../../less/toolDiagram.less';

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';

const Chart = ({data}) => {
    return (
        <div>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2.0}>
                            <LineChart width={632} height={250} data={data}
                                       margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Line
                                    isAnimationActive={false}
                                    type="monotone"
                                    dataKey="fitness"
                                    stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels">
                            Fitness
                        </div>
                        <span className="center-vertical center-horizontal">Iteration</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

Chart.propTypes = {
    data: PropTypes.array.isRequired
};

export default pure(Chart);
