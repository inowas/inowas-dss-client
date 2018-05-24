import React from 'react';
import PropTypes from 'prop-types';

import {calcMFI, calculateMFIcor1, calculateMFIcor2, calculateR2, calculateDiagramData} from '../calculations/calculation';
import '../../less/toolT16.less';

export function resultDiv(rSquared, MFIcor2, MFI) {
    if (rSquared > 0.90){
        return (
                    <p>MFI (Based on the slope of linear trendline): {MFI.toFixed(2)} s/l<sup>2</sup>.
                        Information: The first x points were used for calculating MFI, because a linear trend line
                        with a coefficient of determination R<sup>2</sup> &gt; 0.90 can describe the determined points.
                        The other points were excluded from the calculation, because the resulting trend line including these points has a
                        coefficient of determination R<sup>2</sup> &lt; 0.90  </p>
        );
    }
    return(
                <p> You have to control your data input or repeat the measurement,
                    due to low coefficient of determination R<sup>2</sup> = {rSquared.toFixed(2)}.
                </p>
    );

}

const Settings = ({mfiData, P, Af, T, D, K}) => {
    const {MFI, a} = calcMFI(mfiData);
    const diagramData = calculateDiagramData(mfiData, MFI, a);
    const rSquared = calculateR2(diagramData);
    const MFIcor1 = calculateMFIcor1(T, MFI, P, Af);
    const MFIcor2 = calculateMFIcor2(MFIcor1, D, K);

    return (
        <div className="padding-30">
            <h2>
                Results
            </h2>
            {resultDiv(rSquared, MFIcor2, MFI)}
            {/*<div className="center-vertical center-horizontal">*/}
                {/*<ul className="list-style">*/}
                    {/*<li> MFi<sub>cor2</sub> = <strong>{(MFIcor2.toExponential(2))}</strong> s/l<sup>2</sup></li>*/}
                {/*</ul>*/}
            {/*</div>*/}
        </div>
    );
};

Settings.propTypes = {
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

export default Settings;
