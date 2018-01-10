import PropTypes from 'prop-types';
import React from 'react';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

import '../../less/toolDiagram.less';
import {
    calcC, calcCTau, calculateDiagramData, calculateDL, calculateR,
    calculateVx
} from '../calculations/calculationT08';


const Chart = ({settings, C0, Kd, I, ne, x, t, alphaL, tau}) => {
    let label = '';
    let dataKey = '';
    let variable = '';
    let unit = '';
    let val0 = 0;
    let val50 = 0;
    let valmax = 0;

    const vx = calculateVx(Kd, ne, I);
    const DL = calculateDL(alphaL, vx);
    const R = calculateR(ne, Kd);
    const C = (settings.case === 'oneTime' && t > tau) ? calcCTau(t, x, vx, R, DL) : calcC(t, x, vx, R, DL);
    const data = calculateDiagramData(settings, vx, DL, R, C0, x, t, tau);

    let dataMax = 0;
    for (let i = 1; i < data.length; i += 1) {
        dataMax = (data[i].C > dataMax) ? data[i].C : dataMax;
    }

    dataMax = (settings.infiltration !== 'oneTime') ? 1 : dataMax;

    if (settings.case === 'variableTime') {
        label = 't (d)';
        dataKey = 't';
        variable = 'T';
        unit = 'days';

        for (let i = 1; i < data.length; i += 1) {
            if (data[i].C > 0.00001 * dataMax && data[i - 1].C < 0.00001 * dataMax) {
                val0 = data[i].t;
            }
            if (data[i].C > 0.50001 * dataMax && data[i - 1].C < 0.50001 * dataMax) {
                val50 = data[i].t;
            }
            if (// (data[i].C > 0.9999*DataMax && data[i-1].C < 0.9999*DataMax) ||
                (data[i].C > 0.9999 * dataMax)) {
                valmax = data[i].t;
            }
        }
    }

    if (settings.case === 'fixedTime') {
        label = 'x (m)';
        dataKey = 'x';
        variable = 'X';
        unit = 'm';

        valmax = (0).toFixed(2);
        for (let i = 1; i < data.length; i += 1) {
            if (data[i].C < 0.0001 * dataMax && data[i - 1].C > 0.0001 * dataMax) {
                val0 = data[i].x.toFixed(2);
            }
            if (data[i].C < 0.5001 * dataMax && data[i - 1].C > 0.5001 * dataMax) {
                val50 = data[i].x.toFixed(2);
            }
            if (// (data[i].C > 0.9999*DataMax && data[i-1].C < 0.9999*DataMax) ||
                (data[i].C > 0.9999 * dataMax)) {
                valmax = data[i].x.toFixed(2);
            }
        }
    }

    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2}>
                            <LineChart data={data} margin={{
                                top: 20,
                                right: 40,
                                left: 20,
                                bottom: 0
                            }}>
                                <XAxis type="number" dataKey={dataKey}/>
                                <YAxis type="number" domain={[0, 'auto']}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'C'} stroke="#4C4C4C"
                                      strokeWidth="5" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels">
                            <p>C/C<sub>0</sub> [-]</p>
                        </div>
                        <div className="diagram-labels-bottom-right">
                            <div className="diagram-label">
                                <p>
                                    C&nbsp;=&nbsp;<strong>{(C * C0).toFixed(2)}</strong>&nbsp;
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
            </div>
        </div>
    );
};

Chart.propTypes = {
    C0: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    t: PropTypes.number.isRequired,
    Kd: PropTypes.number.isRequired,
    I: PropTypes.number.isRequired,
    ne: PropTypes.number.isRequired,
    alphaL: PropTypes.number.isRequired,
    tau: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired
};

export default Chart;
