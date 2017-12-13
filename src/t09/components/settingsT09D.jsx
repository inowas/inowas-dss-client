import PropTypes from 'prop-types';
import React from 'react';

const settings = ({value, handleChange}) => {
    return (
        <div>
            <h2>Settings</h2>
            <div className="center-vertical center-horizontal">
                <div className="radio-group">
                    <div>
                        <input
                            name="settings"
                            id="radio1"
                            type="radio"
                            value="confined"
                            checked={value === 'confined'}
                            onChange={handleChange}
                        />
                        <label htmlFor="radio1">Confined Aquifer</label>
                    </div>
                    <div>
                        <input
                            name="settings"
                            id="radio2"
                            type="radio"
                            value="unconfined"
                            checked={value === 'unconfined'}
                            onChange={handleChange}
                        />

                        <label htmlFor="radio2">Unconfined Aquifer</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

settings.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default settings;
