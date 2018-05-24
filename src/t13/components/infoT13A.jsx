import React from 'react';
import PropTypes from 'prop-types';
import {calculateTravelTimeT13A} from '../calculations/calculationT13A';

const Info = ({W, K, ne, L, hL, xi, xe}) => {
    const t = calculateTravelTimeT13A(xe, W, K, ne, L, hL, xi);
    return (
        <div className="padding-30">
            <h2>
                INFO
            </h2>

            <div className="center-vertical center-horizontal">
                <p>
                    The travel time between initial position and arrival location is <strong>{t.toFixed(1)} days</strong>.
                </p>
            </div>
        </div>
    );
};

Info.propTypes = {
    W: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired,
    ne: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    hL: PropTypes.number.isRequired,
    xi: PropTypes.number.isRequired,
    xe: PropTypes.number.isRequired,
};

export default Info;
