import PropTypes from 'prop-types';
import React from 'react';
import {SETTINGS_SELECTED_H0, SETTINGS_SELECTED_HL} from '../reducers/T13B';
import {calculateXwd} from '../calculations';

const settings = ({value, handleChange, W, K, L, hL, h0}) => {
    const style = {
        marginLeft: '40px'
    };

    const xwd = calculateXwd(L, K, W, hL, h0).toFixed(1);

    return (
        <div>
            <div className="padding-30">
                <h2>
                    SELECT FLOW DOMAIN
                </h2>

                <div className="center-vertical center-horizontal">
                    <p>
                        The regional system is divided into the two subdomains on either side of the water divide.
                        The water divide is located at <strong>{xwd} m</strong>.
                    </p>
                </div>

                <div style={{marginTop: 10, marginBottom: 10}}>
                    <p>Select to proceed with left or the right side of the flow domain:</p>
                </div>

                <div className="center-vertical center-horizontal">
                    <div className="radio-group">
                        <div>
                            <input name="settings" id="radio1" type="radio" value={SETTINGS_SELECTED_H0}
                                   checked={value === SETTINGS_SELECTED_H0}
                                   onChange={handleChange}/>
                            <label htmlFor="radio1">Left</label>
                            <input name="settings" id="radio2" type="radio" value={SETTINGS_SELECTED_HL} style={style}
                                   checked={value === SETTINGS_SELECTED_HL}
                                   onChange={handleChange}/>
                            <label htmlFor="radio2">Right</label></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

settings.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    W: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    hL: PropTypes.number.isRequired,
    h0: PropTypes.number.isRequired,
};

export default settings;
