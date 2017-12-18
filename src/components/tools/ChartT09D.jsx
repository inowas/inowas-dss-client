import React from 'react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Text,
    Legend,
    ReferenceLine
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
                                <LineChart data={this.props.data} margin={{
                                    top: 15,
                                    right: 40,
                                    left: 20,
                                    bottom: 15
                                }}>
                                    <XAxis dataKey={'x'} />
                                    {/*<YAxis type="number" domain={this.props.options.yAxis.domain}/>*/}
                                    <YAxis dataKey={'y'} />
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    {/*<Line isAnimationActive={false} type="monotone" dataKey={'zCrit'} stroke="#000000" dot={false}/>*/}
                                    <Line isAnimationActive={false} type="monotone" dataKey={'y'} stroke="#ED8D05" dot={false}/>
                                    {/*<ReferenceLine y={this.props.info.zCrit} label="Max" stroke="red" strokeDasharray="3 3"/>*/}
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="diagram-labels-bottom-left">
                                <div className="diagram-label">
                                    <p>Label</p>
                                </div>
                            </div>
                            <div className="diagram-labels-bottom-right">
                                <div className="diagram-label">
                                    <p>Label</p>
                                </div>
                            </div>
                        </div>
                    </div>
{/*                    <div className="col col-rel-0-5">
                        <ul className="nav nav-stacked" role="navigation">
                            <li>
                                <button className="button">PNG</button>
                            </li>
                            <li>
                                <button className="button">CSV</button>
                            </li>
                        </ul>
                    </div>*/}
                </div>
            </div>
        )
    }
}
