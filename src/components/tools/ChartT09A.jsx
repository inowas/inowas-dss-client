import React from 'react'
import {ResponsiveContainer, BarChart, Bar, XAxis, Legend} from 'recharts'

import '../../less/toolDiagram.less';

export default class Chart extends React.Component {

    render() {
        return (
            <div>
                <h2>Calculation</h2>
                <div className="grid-container">
                    <div className="col stretch">
                        <div className="diagram">
                            <ResponsiveContainer width="100%" aspect={2.0 / 1.0}>
                                <BarChart data={this.props.data} barSize={50} margin={{
                                    top: 15,
                                    right: 30,
                                    left: 20,
                                    bottom: 15
                                }}>
                                    <Bar isAnimationActive={false} dataKey="h" stackId="a" fill="#1EB1ED"/>
                                    <Bar isAnimationActive={false} dataKey="z" stackId="a" fill="#DBF3FD"/>
                                    <Legend />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="diagram-labels-right">
                                <div className="diagram-label">
                                    <p>
                                        h&nbsp;=&nbsp;
                                        <strong>{this
                                                .props
                                                .info
                                                .h
                                                .toFixed(1)}</strong>&nbsp;m
                                    </p>
                                </div>
                                <div className="diagram-label">
                                    <p>
                                        z&nbsp;=&nbsp;
                                        <strong>{this
                                                .props
                                                .info
                                                .z
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
    }
}
