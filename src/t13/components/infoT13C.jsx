import React from 'react';
import PropTypes from 'prop-types';
import {calculateTravelTimeT13C, calculateXwd} from '../calculations';

const Info = ({W, K, L, hL, h0, ne, xi, xe}) => {
    const xwd = calculateXwd(L, K, W, hL, h0);
    const t = calculateTravelTimeT13C(xe, W, K, ne, L + Math.abs(xwd), hL, xi);

    return (
        <div className="padding-30">
            <h2>
                Info
            </h2>

            <div className="center-vertical center-horizontal">
                <p>
                    The regional system is divided into the two subdomains on either side of the water divide.<br/>
                    The water divide is located at <strong>{xwd.toFixed(1)} m</strong>.<br/>
                    Note that for this case the departure point x<sub>i</sub> is between |x<sub>wd</sub>| and
                    L+|x<sub>wd</sub>|.
                </p>
            </div>

            <div className="center-vertical center-horizontal" style={{marginTop: 20}}>
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
    xe: PropTypes.number.isRequired
};

export default Info;
