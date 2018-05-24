import React from 'react';
import PropTypes from 'prop-types';
import {calcDQ} from '../calculations/calculationT14C';

const Info = ({Qw, t, S, T, d, W, Kdash, bdash}) => {
    const lambda = Kdash * W / bdash;
    const dQ = calcDQ(d, S, T, t, lambda, Qw);
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
    t: PropTypes.number.isRequired,
    S: PropTypes.number.isRequired,
    T: PropTypes.number.isRequired,
    d: PropTypes.number.isRequired,
    W: PropTypes.number.isRequired,
    Kdash: PropTypes.number.isRequired,
    bdash: PropTypes.number.isRequired,
};

export default Info;
