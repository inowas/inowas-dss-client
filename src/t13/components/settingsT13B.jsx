import PropTypes from 'prop-types';
import React from 'react';
import {SETTINGS_SELECTED_H0, SETTINGS_SELECTED_HL} from "../reducers/T13B";

const settings = ({value, handleChange}) => {

        const styleupdate = {
            marginLeft: "40px"
        };
        return (
            <div className="padding-30">
                <p>
                    Would you like to proceed with left or the right side of the flow domain
                </p>
                <div className="center-vertical center-horizontal">
                    <div className="radio-group">
                        <div>
                            <input name="settings" id="radio1" type="radio" value={SETTINGS_SELECTED_H0} checked={value === SETTINGS_SELECTED_H0}
                                   onChange={handleChange}/>
                            <label htmlFor="radio1">Left</label>
                            <input name="settings" id="radio2" type="radio" value={SETTINGS_SELECTED_HL} style={styleupdate} checked={value === SETTINGS_SELECTED_HL}
                                   onChange={handleChange}/>
                            <label htmlFor="radio2">Right</label></div>
                    </div>
                </div>
            </div>
        )
};

settings.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

export default settings;
