import React from 'react';
import PropTypes from 'prop-types';
import {calcDQ} from '../calculations/calculationT14A';

const Info = ({Qw, d, S, T, t}) => {
    const DQ = calcDQ(Qw, d, S, T, t);
    return (
        <div className="padding-30">
            <h2>
                INFO
            </h2>

            <div className="center-vertical center-horizontal">
                <p>
                    The calculated river drawdown is <strong>{DQ.toFixed(1)} m³/d</strong>.
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
    t: PropTypes.number.isRequired,
};

export default Info;
