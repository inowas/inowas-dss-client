import React from 'react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

import '../../less/toolDiagram.less';

export default class Chart extends React.Component {

    render() {
        const settings = this.props.settings;
        var label = 't (d)';
        var datakey = 't';
        if (settings.case === 'Case2') {
            label = 'x (m)';
            datakey = 'x';
        }
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
                                    <XAxis label={label} type="number" dataKey={datakey}/>
                                    <YAxis label="C (mg/L)" type="number" domain={this.props.options.yAxis.domain}/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Line isAnimationActive={false} type="basis" dataKey={'C'} stroke="#4C4C4C" strokeWidth="5" dot={false}/>
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="diagram-labels-bottom-right">
                                <div className="diagram-label">
                                    <p>
                                        C&nbsp;=&nbsp;<strong>{Number(this.props.data[this.props.data.length -1].C).toFixed(3)}</strong>&nbsp;
                                        mg/L
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
