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

export function calculateDiagramData(q, mu, xw ) {

    let data = [];
    for(let x = xw-1000; x<xw+1000; x=x+100 ){
        let dataSet = {};
        dataSet['xw'] = Number(x);
        dataSet['Qcrit'] = calculateQCrit(q, mu, x);
        data.push(dataSet);
    }
    return data;
}

export  function calcLambda(k, b, q, xw, rhof, rhos, AqType) {
    const dRho = dRo(rhof, rhos);
    if (AqType === 'unconfined') {
        return (k*b*b/(q*xw))*((1+dRho)/(dRho*dRho));
    } else if(AqType === 'confined'){
        return (k*b*b/(q*xw*dRho));
    }
}

export function dRo(rhof, rhos){
    return rhof/(rhos-rhof);
}

export  function calcMu(Lambda) {
    let mu = 0.0000001;
    var rhs = 0;
    let iter = 1;
    do {
        const term1 = 2*Math.sqrt((1-mu/Math.PI));
        const term2 = (mu/Math.PI)*Math.log((1-Math.sqrt((1-mu/Math.PI)))/(1+Math.sqrt((1-mu/Math.PI))));
        rhs = term1+term2;
        mu = mu+Math.abs(Lambda-rhs)/Math.PI;
        if (mu < 0){mu = 0.0000001} // this should not happen
        iter = iter +1
    } while(iter < 100)//Lambda-rhs>0.000001);
    return mu;
}

export function calculateQCrit(q, mu, xw){
    return q*mu*xw;
}

export function resultDiv(rhof, rhos, lambda, qCrit) {
    if (rhof >= rhos){
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Saltwater density is lower than the density of freshwater.</p>
                </div>
            </div>
        );
    }
    if (lambda > 2){
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>The Stagnation point is located far from the coast. This will lead to the entrance of salt water
                        into the flow directly from the sea.</p>
                </div>
            </div>
        );
    }
    return(
        <div className="diagram-labels-right">
            <div className="diagram-label">
                <p>
                    Q<sub>crit</sub>&nbsp;=&nbsp;<strong>{qCrit.toFixed(1)}</strong>&nbsp;m<sup>3</sup>/d
                </p>
            </div>
        </div>
    );

}
const Chart = ({k, b, q, xw, rhof, rhos, AqType}) => {
    const lambda = calcLambda(k, b, q, xw, rhof, rhos, AqType);
    const mu = calcMu(lambda);
    const qCrit = calculateQCrit(q, mu, xw);
    const data = calculateDiagramData(q, mu, xw );

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

                                <XAxis type="number" dataKey="xw"/>
                                <YAxis type="number" allowDecimals={false} tickLine={false} tickFormatter={(x) => {return x.toFixed(1)}}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'Qcrit'} stroke="#ED8D05" strokeWidth="5" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels">
                            <p>Q<sub>crit</sub> (m<sup>3</sup>/d)</p>
                        </div>
                        {resultDiv(rhof,rhos,lambda,qCrit)}
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
    b: PropTypes.number.isRequired,
    xw: PropTypes.number.isRequired,
    q: PropTypes.number.isRequired,
    rhos: PropTypes.number.isRequired,
    rhof: PropTypes.number.isRequired,
    AqType: PropTypes.string.isRequired,
};

export default pure(Chart);
