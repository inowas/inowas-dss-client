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
        const c0 = this.props.c0.value;
        const data = this.props.data ;
        const settings = this.props.settings;
        const info = this.props.info;
        if (settings.case === 'Case1') {
            var label = 't (d)';
            var datakey = 't';
            for (let i = 1; i < data.length; i += 1) {
                if (data[i].C > 0.00001 && data[i-1].C < 0.00001){
                    var val0 = data[i].t ; var var0 = 'T' ; var unit = 'days'
                }
                if (data[i].C > 0.50001 && data[i-1].C < 0.50001){
                    var val50 = data[i].t ; var var50 = 'T'; var unit = 'days'
                }
                if (data[i].C > 0.9999 && data[i-1].C < 0.9999){
                    var valmax = data[i].t ; var varMax = 'T'; var unit = 'days'
                }
            }
        }
        if (settings.case === 'Case2') {
            label = 'x (m)';
            datakey = 'x';
            for (let i = 1; i < data.length; i += 1) {
                if (data[i].C < 0.0001 && data[i-1].C > 0.0001){
                    var val0 = data[i].x.toFixed(2) ; var var0 = 'X' ; var unit = 'm'
                }
                if (data[i].C < 0.5001 && data[i-1].C > 0.5001){
                    var val50 = data[i].x.toFixed(2) ; var var50 = 'X'; var unit = 'm'
                }
                if (data[i].C < 0.9999 && data[i-1].C > 0.9999){
                    var valmax = data[i].x.toFixed(2) ; var varMax = 'X'; var unit = 'm'
                }
            }
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
                                    <YAxis label="C/C0 [-]" type="number" domain={this.props.options.yAxis.domain}/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Line isAnimationActive={false} type="basis" dataKey={'C'} stroke="#4C4C4C" strokeWidth="5" dot={false}/>
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="diagram-labels-bottom-right">
                                <div className="diagram-label">
                                    <p>
                                        C&nbsp;=&nbsp;<strong>{(info.C*c0).toFixed(2)}</strong>&nbsp;
                                        mg/L
                                    </p>
                                    <p>
                                        {var0}<sub>0</sub>&nbsp;=&nbsp;<strong>{val0}</strong>&nbsp;
                                        {unit}
                                    </p>
                                    <p>
                                        {var50}<sub>50</sub>&nbsp;=&nbsp;<strong>{val50}</strong>&nbsp;
                                        {unit}
                                    </p>
                                    <p>
                                        {varMax}<sub>max</sub>&nbsp;=&nbsp;<strong>{valmax}</strong>&nbsp;
                                        {unit}
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
