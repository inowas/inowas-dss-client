import React from 'react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import '../../less/toolDiagram.less';
import { scaleLinear } from 'd3-scale';
const scale = scaleLinear();

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
                                    bottom: 0
                                }}>

                                    <XAxis tickCount={6} tickFormatter={this.logtick} type="number" dataKey="V"/>
                                    <YAxis type="number" domain={this.props.options.yAxis.domain}/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Line isAnimationActive={false} type="basis" dataKey={'tV'} stroke="#4C4C4C" strokeWidth="5" dot={false}/>
                                    <Line dataKey={'mfi'} strokeDasharray="3 3" stroke="#4C4C4C" strokeWidth="1" dot={false}/>
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="diagram-ylabels">
                                <p>t/V [s/l]</p>
                            </div>
                            <div className="diagram-labels-bottom-right">
                                <div className="diagram-label">
                                    <p>
                                        MFi&nbsp;=&nbsp;<strong>{this.props.info.MFI.toFixed(2)}</strong>&nbsp;
                                        s/l<sup>2</sup>
                                    </p>
                                    <p>
                                        V<sub>c</sub>&nbsp;=&nbsp;<strong>{this.props.info.vc.toFixed(2)}</strong>&nbsp;
                                        m/year
                                    </p>
                                </div>
                            </div>
                            <p className="center-vertical center-horizontal">V [l]</p>
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