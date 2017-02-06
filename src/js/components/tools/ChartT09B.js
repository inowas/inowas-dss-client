import React from 'react'
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line
} from 'recharts'

export default class Chart extends React.Component {

    render() {
        return (
            <div>
                <h2>Calculation</h2>
                <div className="grid-container">
                    <div className="col stretch">

                        <div className="aspect-ratio-element diagram">
                            <ResponsiveContainer width="100%" aspect={2.0 / 1.0}>
                                <LineChart data={this.props.data} margin={{
                                    top: 20,
                                    right: 40,
                                    left: 10,
                                    bottom: 40
                                }}>
                                    <XAxis label="x (m)" type="number" domain={this.props.options.xAxis.domain} dataKey="x" allowDecimals={false} tickLine={false}/>
                                    <YAxis label="z (m)" type="number" domain={this.props.options.yAxis.domain} allowDecimals={false} tickLine={false} tickFormatter={(x) => {return x.toFixed(2)}}/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Line dot={false} isAnimationActive={false} type="basis" dataKey="b" stroke="#000000" strokeWidth="5" fillOpacity={1}/>
                                    <Line dot={false} isAnimationActive={false} type="basis" dataKey="z" stroke="#ED8D05" strokeWidth="5" fillOpacity={1}/>
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="diagram-labels-left">
                                <div className="diagram-label">
                                    <p>z<sub>0</sub>&nbsp;
                                        =&nbsp;
                                        <strong>{Number(this.props.info.z).toFixed(1)}</strong>&nbsp;
                                        m</p>
                                </div>
                                <div className="diagram-label">
                                    <p>L =
                                        <strong>{Number(this.props.info.l).toFixed(1)}</strong>
                                        m</p>
                                </div>
                                <div className="diagram-label">
                                    <p>x<sub>T</sub>
                                        =
                                        <strong>{Number(this.props.info.xT).toFixed(1)}</strong>
                                        m</p>
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
        );
    }
}
