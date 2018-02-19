import React from 'react';
import PropTypes from 'prop-types';

import {calcMFI, calculateMFIcor1, calculateMFIcor2} from '../calculations/calculation';
import '../../less/toolT16.less';

const Settings = ({mfiData, P, Af, T, D, K}) => {
    const {MFI} = calcMFI(mfiData);
    const MFIcor1 = calculateMFIcor1(T, MFI, P, Af);
    const MFIcor2 = calculateMFIcor2(MFIcor1, D, K);

    return (
        <div className="padding-30">
            <h2>
                Results
            </h2>
            <div className="center-vertical center-horizontal">
                <ul className="list-style">
                    <li> MFi<sub>cor2</sub> = <strong>{(MFIcor2.toExponential(2))}</strong> s/l<sup>2</sup></li>
                </ul>
            </div>
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
