import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';

import '../../less/toolDiagram.less';

import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    XAxis
} from 'recharts';
//TO DO: implement this eq in library
const calc_z = (h,df,ds)=>{ return (df * h) / (ds - df) };

const calculateDiagramData = (h,df,ds) => {
    let z = calc_z(h,df,ds);
    var data = [{
        name: '',
        h,
        z
    }];

    return data;
};

const Chart = ({h,df,ds}) => {
    const data = calculateDiagramData(h,df,ds);
    const z = calc_z(h,df,ds);
    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width="100%" aspect={2.0 / 1.0}>
                            <BarChart data={data} barSize={50} margin={{
                                top: 15,
                                right: 30,
                                left: 20,
                                bottom: 15
                            }}>
                                <Bar isAnimationActive={false} dataKey="h" stackId="a" fill="#1EB1ED"/>
                                <Bar isAnimationActive={false} dataKey="z" stackId="a" fill="#DBF3FD"/>
                                <Legend/>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="diagram-labels-right">
                            <div className="diagram-label">
                                <p>
                                    h&nbsp;=&nbsp;
                                    <strong>{h
                                        .toFixed(1)}</strong>&nbsp;m
                                </p>
                            </div>
                            <div className="diagram-label">
                                <p>
                                    z&nbsp;=&nbsp;
                                    <strong>{z
                                        .toFixed(1)}</strong>&nbsp;m
                                </p>
                            </div>
                        </div>
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
    )
};

Chart.propTypes = {
    h: PropTypes.number.isRequired,
    df: PropTypes.number.isRequired,
    ds: PropTypes.number.isRequired
};

export default pure(Chart);