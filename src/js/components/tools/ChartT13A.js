import React from "react"
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine
} from "recharts"

export default class Chart extends React.Component {

    render() {
        return (
            <div>
                <h2>Calculation</h2>
                <div className="grid-container">
                    <div className="col stretch">
                        <div className="diagram">
                            <ResponsiveContainer width={'100%'} aspect={2.0 / 1.0}>
                                <LineChart data={this.props.data} margin={{
                                    top: 20,
                                    right: 40,
                                    left: 10,
                                    bottom: 40
                                }}>

                                    <XAxis label="x (m)" type="number" dataKey="x"/>
                                    <YAxis label="t" type="number" domain={this.props.options.yAxis.domain}/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Line isAnimationActive={false} type="basis" dataKey={'t'} stroke="#1EB1ED" strokeWidth="5" dot={false}/>
                                </LineChart>
                            </ResponsiveContainer>
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
