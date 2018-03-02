import React from 'react';
import PropTypes from 'prop-types';
import {calculateTravelTimeT13B, calculateXwd} from '../calculations';
import {SETTINGS_SELECTED_H0, SETTINGS_SELECTED_HL, SETTINGS_SELECTED_NOTHING} from '../reducers/T13B';

// eslint-disable-next-line react/no-multi-comp
const Info = ({W, K, L, hL, h0, ne, xi, xe, settings}) => {

    if (settings === SETTINGS_SELECTED_NOTHING) {
        return null;
    }

    const xwd = calculateXwd(L, K, W, hL, h0).toFixed(1);

    let t = 0;
    if (settings === SETTINGS_SELECTED_H0) {
        t = calculateTravelTimeT13B(xe, W, K, ne, (xwd * 1), h0, xi);
    }
    if (settings === SETTINGS_SELECTED_HL) {
        t = calculateTravelTimeT13B(xe, W, K, ne, (L - xwd), hL, xi);
    }

    return (
        <div style={{paddingLeft: 30, paddingRight: 30}}>
            <div className="center-vertical center-horizontal">
                <p>
                    The travel time between initial position and arrival location
                    is <strong>{t.toFixed(1)} days</strong>.
                </p>
            </div>
        </div>
    );
};

Info.propTypes = {
    W: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    hL: PropTypes.number.isRequired,
    h0: PropTypes.number.isRequired,
    ne: PropTypes.number.isRequired,
    xi: PropTypes.number.isRequired,
    xe: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired
};

export default Info;
