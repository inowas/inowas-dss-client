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
import erfc from '../../calculations/erfc';

const calcC = (t, x, vx, R, DL) => {
    const term1 = erfc((x - (vx * t / R)) / (2 * Math.sqrt(DL * t / R)));
    const term2 = erfc((x + (vx * t / R)) / (2 * Math.sqrt(DL * t / R)));
    return 0.5 * (term1 + Math.exp(vx * x / DL) * term2);
};

const calcCTau = (t, x, tau, vx, R, DL) => {
    const term1 = erfc((x - (vx * t / R)) / (2 * Math.sqrt(DL * t / R))) - erfc((x - (vx * (t - tau) / R)) / (2 * Math.sqrt(DL * (t - tau) / R)));
    let term2 = erfc((x + (vx * t / R)) / (2 * Math.sqrt(DL * t / R))) - erfc((x + (vx * (t - tau) / R)) / (2 * Math.sqrt(DL * (t - tau) / R)));
    // this condition is necessary to fix a bug; it can be changed

    if (Math.abs(term2) < 10e-16) {
        term2 = 0
    }
    return 0.5 * (term1 + Math.exp(vx * x / DL) * term2);
};

const calcT = (xMax) => {
    let c = 0;
    let t = 0;
    while (c < 0.9999) {
        c = calcC(t, xMax);
        t = t + 20;
    }
    return t;
};

const calcX = (tMax) => {
    let c = 1;
    let x = 0;
    while (c > 0.0001) {
        c = calcC(tMax, x);
        x = x + 20;
    }
    return x;
};

const calculateVx = (K, ne, I) => {
    return K * I / ne;
};

const calculateDL = (alphaL, vx) => {
    return alphaL * vx;
};

const calculateR = (ne, Kd) => {
    const rhob = (1 - ne) * 2.65;
    return 1 + Kd * rhob / ne;
};

const calculateKd = (Kow, Corg) => {
    const Koc = Math.exp(Math.log(Kow) - 0.21);
    const Kd = Koc * Corg;
    return Kd;
};

const calculateDiagramData = (C0, info, xMax, cas, infil, tau) => {
    const vx = info.vx;
    const DL = info.DL;
    const R = info.R;

    let tauMax = 10e+8;
    if (infil === 'OneTime') tauMax = tau;

    const data = [];
    if (cas === 'Case1') { // variable time, fixed length
        const x = xMax;
        const tMax = calcT(xMax);
        let dt = Math.floor(tMax / 25);
        let tStart = tMax - dt * 25;

        if (dt < 1) {
            tStart = 1;
            dt = 1;
        }

        for (let t = 0; t <= tMax; t += dt) {
            if (t < tauMax) {
                data.push({
                    t: t,
                    C: calcC(t, x)
                });
            } else {
                data.push({
                    t: t,
                    C: calc_C_tau(t, x)
                });
            }
        }
    }
    if (cas === 'Case2') {
        const t = tMax;
        const x_max = calc_x();
        let dx = x_max / 25;
        let x_start = x_max - dx * 25;
        if (dx < 1) {
            x_start = 1;
            dx = 1;
        }
        for (let x = 0; x <= x_max; x += dx) {
            if (t < tauMax) {
                data.push({
                    x: x,
                    C: calcC(t, x)
                });
            } else {
                data.push({
                    x: x,
                    C: calc_C_tau(t, x)
                });
            }
        }
    }
    return data;
};


const Chart = ({settings, c0, x, t, K, I, n, rho, alpha, kd}) => {
    let label = '';
    let dataKey = '';
    let variable = '';
    let unit = '';


    const data = calculateDiagramData(c0, );

    let DataMax = 0;
    for (let i = 1; i < data.length; i += 1) {
        (data[i].C > DataMax) ? DataMax = data[i].C : DataMax = DataMax;
    }
    (settings.infiltration !== 'OneTime') ? DataMax = 1 : DataMax = DataMax;
    if (settings.case === 'Case1') {
        label = 't (d)';
        dataKey = 't';
        variable = 'T';
        unit = 'days';

        for (let i = 1; i < data.length; i += 1) {
            if (data[i].C > 0.00001 * DataMax && data[i - 1].C < 0.00001 * DataMax) {
                var val0 = data[i].t;
            }
            if (data[i].C > 0.50001 * DataMax && data[i - 1].C < 0.50001 * DataMax) {
                var val50 = data[i].t;
            }
            if (// (data[i].C > 0.9999*DataMax && data[i-1].C < 0.9999*DataMax) ||
                (data[i].C > 0.9999 * DataMax)) {
                var valmax = data[i].t;
            }
        }
    }

    if (settings.case === 'Case2') {
        label = 'x (m)';
        dataKey = 'x';
        variable = 'X';
        unit = 'm';

        const valmax = (0).toFixed(2);
        for (let i = 1; i < data.length; i += 1) {
            if (data[i].C < 0.0001 * DataMax && data[i - 1].C > 0.0001 * DataMax) {
                var val0 = data[i].x.toFixed(2);
            }
            if (data[i].C < 0.5001 * DataMax && data[i - 1].C > 0.5001 * DataMax) {
                var val50 = data[i].x.toFixed(2);
            }
            if (// (data[i].C > 0.9999*DataMax && data[i-1].C < 0.9999*DataMax) ||
                (data[i].C > 0.9999 * DataMax)) {
                var valmax = data[i].x.toFixed(2);
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
                                <XAxis type="number" dataKey={dataKey}/>
                                <YAxis type="number" domain={this.props.options.yAxis.domain}/>
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
                                    C&nbsp;=&nbsp;<strong>{(info.C * c0).toFixed(2)}</strong>&nbsp;
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
                {/*                 <div className="col col-rel-0-5">
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
    );
};

Chart.propTypes = {
    c0: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    t: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired,
    I: PropTypes.number.isRequired,
    n: PropTypes.number.isRequired,
    rho: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
    kd: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired
};


export default Chart;

