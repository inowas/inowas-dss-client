import React from "react"
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Text, Legend, ReferenceLine} from "recharts"

export default class Chart extends React.Component {

    render() {
        return (
            <div>
                <h2>Calculation</h2>
                <div className="grid-container">
                    <div className="col stretch">
                        <div className="aspect-ratio-wrapper">
                            <div className="aspect-ratio-element diagram">
                                <ResponsiveContainer width='100%' aspect={3.0/2.0}>
                                    <LineChart
                                        data={this.props.data}
                                        margin={{top: 15, right: 40, left: 20, bottom: 15}}
                                    >
                                        <XAxis dataKey='x' />
                                        <YAxis type="number" domain={this.props.options.yAxis.domain} />
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Line isAnimationActive={false} type="monotone" dataKey={'z'} stroke="#000000" dot={false}/>
                                        <Line isAnimationActive={false} type="monotone" dataKey={'h'} stroke="#8884d8" dot={false}/>
                                        <ReferenceLine y={this.props.info.z} label="Max" stroke="red" strokeDasharray="3 3" />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="diagram-labels">
                                    <div className="diagram-label">
                                        <p>
                                            z={Number(this.props.info.z).toFixed(1)}m <br/>
                                            Q<sub>max</sub>={Number(this.props.info.q).toFixed(1)}m<sup>3</sup>/d
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-rel-0-5">
                        <ul className="nav nav-stacked" role="navigation">
                            <li><button className="button">PNG</button></li>
                            <li><button className="button">CSV</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
