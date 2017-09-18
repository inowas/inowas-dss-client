import React from 'react'

import '../../less/toolDiagram.less';

import * as calc from '../../calculations/T02';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

export default class Chart extends React.Component {

    render() {
        const {
                variable,
                w,
                L,
                W,
                hi,
                Sy,
                K,
                t,
                x_min,
                x_max,
                d_x
            } = this.props,

            data = calc.calculateDiagramData(variable, w, L, W, hi, Sy, K, t, x_min, x_max, d_x),
            hmax = data[0].hhi + hi;
        var xAxis = <XAxis type="number" dataKey="y"/>;
        var xlable = "y (m)";
        if (variable == 'x') {
            xAxis = <XAxis type="number" dataKey="x"/>;
            xlable = "x (m)"
        }
        return <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2.0 / 1.0}>
                            <LineChart data={data} margin={{
                                top: 20,
                                right: 40,
                                left: 40,
                                bottom: 0
                            }}>
                                {xAxis}
                                <YAxis type="number"/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'hhi'} stroke="#1EB1ED" strokeWidth="5" dot={false}/>
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
                                    <strong>{hmax.toFixed(2)}</strong>
                                    m
                                </p>
                            </div>
                        </div>
                        <p className="center-vertical center-horizontal">{xlable}</p>
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
    };
}