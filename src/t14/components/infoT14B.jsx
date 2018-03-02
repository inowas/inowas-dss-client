import React from 'react';
import PropTypes from 'prop-types';
import {calcDQ} from '../calculations/calculationT14B';

const Info = ({d, S, T, t, K, Kdash, bdash, Qw}) => {
    const L = K * bdash / Kdash;
    const dQ = calcDQ(d, S, T, t, L, Qw);
    return (
        <div className="padding-30">
            <h2>
                INFO
            </h2>

            <div className="center-vertical center-horizontal">
                <p>
                    The calculated river drawdown is <strong>{dQ.toFixed(1)} m³/d</strong>.
                </p>
            </div>
        </div>
    );
};

Info.propTypes = {
    Qw: PropTypes.number.isRequired,
    d: PropTypes.number.isRequired,
    S: PropTypes.number.isRequired,
    T: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    t: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired,
    bdash: PropTypes.number.isRequired,
    Kdash: PropTypes.number.isRequired,
};

export default Info;
