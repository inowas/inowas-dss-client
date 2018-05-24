import React from 'react';
import PropTypes from 'prop-types';
import {
    calcMFI,
    calculateDiagramData,
    calculateMFIcor1,
    calculateMFIcor2,
    calculateVC,
    calculateR2
} from '../calculations/calculation';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

import '../../less/toolDiagram.less';

const Chart = ({mfiData, V, P, Af, T, D, ueq, IR, K}) => {
    const yDomain = ['auto', 'auto'];
    const {MFI, a} = calcMFI(mfiData);

    const diagramData = calculateDiagramData(mfiData, MFI, a);
    const rSquared = calculateR2(diagramData);
    const MFIcor1 = calculateMFIcor1(T, MFI, P, Af);
    const MFIcor2 = calculateMFIcor2(MFIcor1, D, K);
    const vc = calculateVC(MFIcor2, ueq, IR, K);

    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2}>
                            <LineChart data={diagramData} margin={{
                                top: 20,
                                right: 40,
                                left: 10,
                                bottom: 0
                            }}>

                                <XAxis tickCount={6} type="number" dataKey="V"/>
                                <YAxis type="number" domain={yDomain}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} type="basis" dataKey={'tV'} stroke="#4C4C4C"
                                      strokeWidth="5" dot={true} legendType="none" />
                                <Line dataKey={'mfi'} strokeDasharray="3 3" stroke="#4C4C4C" strokeWidth="2"
                                      dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels"><p> t/V [s/l] </p></div>
                        <div className="diagram-labels-bottom-right">
                            <div className="diagram-label">
                                <p>MFi&nbsp;=&nbsp;<strong>{MFI.toFixed(2)}</strong>&nbsp;s/l<sup>2</sup></p>
                                <p>V<sub>c</sub>&nbsp;=&nbsp;<strong>{vc.toFixed(2)}</strong>&nbsp;m/year</p>
                            </div>
                        </div>
                        <p className="center-vertical center-horizontal"> V [l]</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Chart.propTypes = {
    mfiData: PropTypes.array.isRequired,
    V: PropTypes.number.isRequired,
    P: PropTypes.number.isRequired,
    Af: PropTypes.number.isRequired,
    T: PropTypes.number.isRequired,
    D: PropTypes.number.isRequired,
    ueq: PropTypes.number.isRequired,
    IR: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired
};

export default Chart;
