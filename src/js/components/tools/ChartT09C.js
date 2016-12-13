import React from "react"
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine} from "recharts"

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
                                        margin={{top: 20, right: 40, left: 10, bottom: 40}}
                                    >

                                        <XAxis label="x (m)" type="number" dataKey='x' />
                                        <YAxis label="d (m)" type="number" domain={this.props.options.yAxis.domain} />
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Line isAnimationActive={false} type="basis" dataKey={'h'} stroke="#ED8D05" strokeWidth="5" dot={false}/>
                                        <ReferenceLine y={this.props.info.z} stroke="#ED8D05" strokeWidth="5" strokeDasharray="20 20" />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="diagram-labels-right">
                                    <div className="diagram-label">
                                        <p>
                                            z={Number(this.props.info.h).toFixed(1)}m
                                        </p>
                                    </div>
                                    <div className="diagram-label">
                                        <p>
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
