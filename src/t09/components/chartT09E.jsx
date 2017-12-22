import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';

import '../../less/toolDiagram.less';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine
} from "recharts";

// TODO: implement this eq in library

export function calculateDiagramData(xt,z0, xt_slr, z0_slr, valid) {

    let data = [{
        xt: 0,
        z0: 0,
        z0_new: 0
    },{
        xt: -xt,
        z0: -z0,
        z0_new: -(z0_slr*(xt/xt_slr))
    },{
        xt: -xt_slr,
        z0_new: -z0_slr
    }
    ];
    if (valid === 'false') data =[{        xt: 0,
        z0: 0,
        z0_new: 0}];
    return data;
}

export function dRho(rhof, rhos){
    return rhof/(rhos-rhof);
}
export  function calcXtQ0_flux(k, z0, dz, l, w, i, alpha) {
    const qi = i*k*z0;
    const q = qi + w*l
    const qmin = Math.sqrt((w*k*(1+alpha)*z0*z0)/(alpha*alpha))
    const hT = z0/alpha
    const xm = q/w
    const xt = q/w-Math.sqrt((q*q)/(w*w)-(k*(1+alpha)*z0*z0)/(w*alpha*alpha))
    const hm = Math.sqrt(2/k*(xm-xt)*(q-(w/2)*(xm+xt))+(hT+z0)*(hT+z0))

// after sea level rise
    const hTn =  (dz+z0)/alpha
    const xt_slr = q/w-Math.sqrt((q*q)/(w*w)-(k*(1+alpha)*(z0+dz)*(z0+dz))/(w*alpha*alpha))
    return  [xt, xt_slr]
}
export  function calcXtQ0_head(K, z0, dz, L, W, hi, alpha) {
    const zn = z0+dz;
    var   loop = 1;
    const ht = z0/alpha;
    const term1 = ((hi+zn)*(hi+zn)-(ht+zn)*(ht+zn))*K/2. ;
    var q0 = 1; //start value
    var q0_old = q0;
    var xt = 0;
    var iter = 0; var max_iter = 'false';
    const iter_max = 100;
    const q_min = Math.sqrt((W*K*(1+alpha)*zn*zn)/(alpha*alpha));
    var valid = 'true';
    do {
        if ((q0 * q0 / (W * W)) < (K * (1 + alpha) * zn * zn) / (W * alpha * alpha)){ valid = 'false'; break;}
        xt = (q0 / W) - Math.sqrt((q0 * q0 / (W * W)) - (K * (1 + alpha) * zn * zn) / (W * alpha * alpha));
        q0 = (term1 / (L - xt)) + W * (L + xt) / 2;
        if (Math.abs(q0_old-q0)<0.0000001) loop = 0;
        q0_old = q0;
        iter++;
    } while (loop === 1 && iter < iter_max);
    if (iter === iter_max){max_iter = 'true';}
    return [xt, q0, max_iter, valid]
}
export function resultDiv(max_iter, valid, dxt) {
    if (valid === 'false'){
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Invalid values: square root gets minus.</p>
                    <p>Offshore discharge rate is less than minimum discharge rate</p>
                </div>
            </div>
        );
    }
    if (max_iter === 'true'){
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Maximum number of iterations are conducted.</p>
                    <p>Change in x <sub>t</sub>&nbsp;=&nbsp;<strong>{dxt.toFixed(1)}</strong>&nbsp;m</p>
                </div>
            </div>
        );
    }

    return(
        <div className="diagram-labels-left">
            <div className="diagram-label">
                <p>Change in x <sub>t</sub>&nbsp;=&nbsp;<strong>{dxt.toFixed(1)}</strong>&nbsp;m</p>
            </div>
        </div>
    );

}
const Chart = ({k, z0, l, w, dz, hi, i, df, ds, method}) => {

    const alpha = dRho(df, ds);
    var max_iter = 'false';
    var valid = 'true';
    if (method === 'constHead') {
        var xt; var q0;
        [xt,q0,max_iter,valid] = calcXtQ0_head(k, z0, 0, l, w, hi, alpha);
        const xtQ0 = calcXtQ0_head(k, z0, dz, l, w, hi - dz, alpha);
        var xt_slr = xtQ0[0]; // slr: after sea level rise
        const q0_slr = xtQ0[1];
        if (max_iter === 'false') max_iter = xtQ0[2];
        if (valid === 'true') valid = xtQ0[3];
    }
    if (method === 'constFlux'){
        [xt,xt_slr] = calcXtQ0_flux(k, z0, dz, l, w, i, alpha)
    }
    const dxt = xt_slr-xt;
    const data = calculateDiagramData(xt,z0, xt_slr, z0+dz, valid);
    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2.0 / 1.0}>
                            <LineChart data={data} margin={{
                                top: 20,
                                right: 55,
                                left: 50,
                                bottom: 0
                            }}>

                                <XAxis type="number" dataKey="xt"/>
                                <YAxis type="number" allowDecimals={false} tickLine={false} tickFormatter={(x) => {return x.toFixed(1)}} orientation="right"/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'z0'} stroke="#ED8D05" strokeWidth="5" dot={false}/>
                                <Line isAnimationActive={false} type="basis" dataKey={'z0_new'} stroke="#ED8D05" strokeWidth="5" dot={false}  strokeDasharray="20 20"/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels-right">
                            <p>z<sub>0</sub> (m)</p>
                        </div>
                        {resultDiv(max_iter, valid, dxt)}
                        <p className="center-vertical center-horizontal">x<sub>w</sub> (m)</p>
                    </div>
                </div>
                {/*<div className="col col-rel-0-5">*/}
                {/*<ul className="nav nav-stacked" role="navigation">*/}
                {/*<li>*/}
                {/*<button className="button">PNG</button>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*<button className="button">CSV</button>*/}
                {/*</li>*/}
                {/*</ul>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

Chart.propTypes = {
    k: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    z0: PropTypes.number.isRequired,
    ds: PropTypes.number.isRequired,
    df: PropTypes.number.isRequired,
};

export default pure(Chart);
