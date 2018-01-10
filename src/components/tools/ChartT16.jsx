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
    logdata(data){
        let data2 = [];
        for (let i = 0; i < data.length; i += 1) {
            data2.push({
                D: Math.log10(data[i].D),
                Percentage: data[i].Percentage
            });
        }
        return data2;
    };
    logtick = (e)=> {
        return (Math.pow(10,e)).toFixed(2)
    };
    render() {
        return (
            <div>
                <h2>Calculation</h2>
                <div className="grid-container">
                    <div className="col stretch">
                        <div className="diagram">
                            <ResponsiveContainer width={'100%'} aspect={2.0 / 1.0}>
                                <LineChart data={this.logdata(this.props.data)} margin={{
                                    top: 20,
                                    right: 40,
                                    left: 10,
                                    bottom: 40
                                }}>

                                    <XAxis tickCount={6} tickFormatter={this.logtick} label="D" type="number" dataKey="D"/>
                                    <YAxis label="%" type="number" domain={this.props.options.yAxis.domain}/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Line isAnimationActive={false} type="basis" dataKey={'Percentage'} stroke="#4C4C4C" strokeWidth="5" dot={false}/>
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="diagram-labels-bottom-right">
                                <div className="diagram-label">
                                    <p>
                                        K&nbsp;=&nbsp;<strong>{this.props.info.K.toFixed(1)}</strong>&nbsp;
                                    </p>
                                </div>
                                <div className="diagram-label">
                                    <Accordion>
                                        <AccordionItem  heading="Method">
                                            <ul className="nav-sub">
                                                <li>
                                                    <a className="link" href="#/tools/T16A">Hazen</a>
                                                </li>
                                            </ul>
                                        </AccordionItem>
                                    </Accordion>
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
