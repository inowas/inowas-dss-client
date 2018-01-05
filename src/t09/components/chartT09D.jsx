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
} from 'recharts';

import {calcLambda, calcMu, calculateQCrit, calculateDiagramData} from '../calculations/calculationT09D';

export function resultDiv(rhof, rhos, lambda, qCrit) {
    if (rhof >= rhos) {
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>Saltwater density is lower than the density of freshwater.</p>
                </div>
            </div>
        );
    }
    if (lambda > 2) {
        return (
            <div className="diagram-labels-left">
                <div className="diagram-label">
                    <p>The Stagnation point is located far from the coast. This will lead to the entrance of salt water
                        into the flow directly from the sea.</p>
                </div>
            </div>
        );
    }
    return (
        <div className="diagram-labels-bottom-right">
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
    const data = calculateDiagramData(q, mu, xw);

    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2}>
                            <LineChart data={data} margin={{
                                top: 20,
                                right: 55,
                                left: 50,
                                bottom: 0
                            }}>

                                <XAxis type="number" dataKey="xw"/>
                                <YAxis type="number" allowDecimals={false} tickLine={false}
                                       tickFormatter={(x) => x.toFixed(1)}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <ReferenceLine x={xw} stroke="black" strokeWidth="1" strokeDasharray="3 3" label="xw" dot={false}/>
                                <Line isAnimationActive={false} type="basis" dataKey={'Qcrit'} stroke="black"
                                      strokeWidth="3" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels">
                            <p>Q<sub>crit</sub> (m<sup>3</sup>/d)</p>
                        </div>
                        {resultDiv(rhof, rhos, lambda, qCrit)}
                        <p className="center-vertical center-horizontal">x<sub>w</sub> (m)</p>
                    </div>
                </div>
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
