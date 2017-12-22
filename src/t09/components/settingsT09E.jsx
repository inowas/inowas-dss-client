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
                            value="constHead"
                            checked={value === 'constHead'}
                            onChange={handleChange}
                        />
                        <label htmlFor="radio1">Constant head</label>
                    </div>
                    <div>
                        <input
                            name="settings"
                            id="radio2"
                            type="radio"
                            value="constFlux"
                            checked={value === 'constFlux'}
                            onChange={handleChange}
                        />

                        <label htmlFor="radio2">Constant flux</label>
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
