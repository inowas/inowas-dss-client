import React from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

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
                                <BarChart layout="vertical" data={this.props.data} margin={{
                                    top: 20,
                                    right: 80,
                                    left: 10,
                                    bottom: 0
                                }}>

                                    {/*<XAxis type="number" label="Area (m²)"/>*/}
                                    <XAxis type="number"/>
                                    <YAxis type="category" dataKey="name"/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Bar isAnimationActive={false} dataKey="value" fill="#ED8D05"/>
                                </BarChart>
                            </ResponsiveContainer>
                            <p className="center-vertical center-horizontal">Area m{<sup>2</sup>}</p>
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
