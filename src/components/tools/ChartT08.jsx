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
import {max} from "../../core/rasterData/helpers";

export default class Chart extends React.Component {

    render() {
        const c0 = this.props.c0.value;
        const data = this.props.data ;
        const settings = this.props.settings;
        const info = this.props.info;
        var DataMax = 0;
        for (let i = 1 ; i < data.length; i +=1){
            (data[i].C > DataMax)? DataMax = data[i].C : DataMax = DataMax;
        }
        (settings.infiltration !== 'OneTime') ? DataMax = 1 : DataMax = DataMax;
        if (settings.case === 'Case1') {
            var label = 't (d)';
            var datakey = 't';
            var variable = 'T';
            var unit = 'days';
            for (let i = 1; i < data.length; i += 1) {
                if (data[i].C > 0.00001*DataMax && data[i-1].C < 0.00001*DataMax){
                    var val0 = data[i].t
                }
                if (data[i].C > 0.50001*DataMax && data[i-1].C < 0.50001*DataMax){
                    var val50 = data[i].t
                }
                if (//(data[i].C > 0.9999*DataMax && data[i-1].C < 0.9999*DataMax) ||
                    (data[i].C > 0.9999*DataMax) ){
                    var valmax = data[i].t
                }
            }
        }
        if (settings.case === 'Case2') {
            label = 'x (m)';
            datakey = 'x';
            var variable = 'X';
            var unit = 'm';
            var valmax = (0).toFixed(2);
            for (let i = 1; i < data.length; i += 1) {
                if (data[i].C < 0.0001*DataMax && data[i-1].C > 0.0001*DataMax){
                    var val0 = data[i].x.toFixed(2)
                }
                if (data[i].C < 0.5001*DataMax && data[i-1].C > 0.5001*DataMax){
                    var val50 = data[i].x.toFixed(2)
                }
                if (//(data[i].C > 0.9999*DataMax && data[i-1].C < 0.9999*DataMax) ||
                    (data[i].C > 0.9999*DataMax ) ){
                    var valmax = data[i].x.toFixed(2)
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
                                    left: 20,
                                    bottom: 0
                                }}>
                                    <XAxis type="number" dataKey={datakey}/>
                                    <YAxis type="number" domain={this.props.options.yAxis.domain}/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Line isAnimationActive={false} type="basis" dataKey={'C'} stroke="#4C4C4C" strokeWidth="5" dot={false}/>
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="diagram-ylabels">
                                <p>C/C<sub>0</sub> [-]</p>
                            </div>
                            <div className="diagram-labels-bottom-right">
                                <div className="diagram-label">
                                    <p>
                                        C&nbsp;=&nbsp;<strong>{(info.C*c0).toFixed(2)}</strong>&nbsp;
                                        mg/L
                                    </p>
                                    <p>
                                        {variable}<sub>0</sub>&nbsp;=&nbsp;<strong>{val0}</strong>&nbsp;
                                        {unit}
                                    </p>
                                    <p>
                                        {variable}<sub>50</sub>&nbsp;=&nbsp;<strong>{val50}</strong>&nbsp;
                                        {unit}
                                    </p>
                                    <p>
                                        {variable}<sub>max</sub>&nbsp;=&nbsp;<strong>{valmax}</strong>&nbsp;
                                        {unit}
                                    </p>
                                </div>
                            </div>
                            <p className="center-vertical center-horizontal">{label}</p>
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
