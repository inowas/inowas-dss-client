import React from 'react';
import PropTypes from 'prop-types';
import {calculateTravelTimeT13E} from '../calculations';

const Info = ({Qw, ne, hL, h0, xi, x}) => {
    const tMax = calculateTravelTimeT13E(xi, h0, hL, x, ne, Qw);

    return (
        <div className="padding-30">
            <h2>
                Info
            </h2>

            <div className="center-vertical center-horizontal" style={{marginTop: 20}}>
                <p>
                    The travel time between initial position and arrival location
                    is <strong>{tMax.toFixed(1)} days</strong>.
                </p>
            </div>
        </div>
    );
};

Info.propTypes = {
    Qw: PropTypes.number.isRequired,
    ne: PropTypes.number.isRequired,
    hL: PropTypes.number.isRequired,
    h0: PropTypes.number.isRequired,
    xi: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired
};

export default Info;
