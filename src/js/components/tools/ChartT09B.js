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
                                        margin={{top: 0, right: 0, left: 40, bottom: 40}}
                                    >
                                        <XAxis dataKey='x' orientation={'top'} />
                                        <YAxis type="number" domain={this.props.options.yAxis.domain} orientation={'right'}/>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Line isAnimationActive={false} type="monotone" dataKey={'z'} stroke="#000000" dot={false}/>
                                        <Line isAnimationActive={false} type="monotone" dataKey={'h'} stroke="#8884d8" dot={false}/>
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="diagram-labels-left">
                                    <div className="diagram-label">
                                        <p>
                                            L={Number(this.props.info.l).toFixed(1)}m <br/>
                                            z<sub>0</sub>={Number(this.props.info.z).toFixed(1)}m
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
