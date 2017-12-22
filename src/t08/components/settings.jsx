import React from 'react';
import { pure } from 'recompose';
import PropTypes from 'prop-types';

const Settings = ({ settings, handleChange }) => {
    return (
        <div>
            <h2>Settings</h2>
            <div className="center-vertical center-horizontal">
                <div className="radio-group">
                    <div>
                        <input name="variable" type="radio" value="x" checked={settings.variable === 'x'}
                               onChange={handleChange}/>
                        <label htmlFor="radio1">x</label>
                    </div>
                    <div>
                        <input name="variable" type="radio" value="y" checked={settings.variable === 'y'}
                               onChange={handleChange}/>
                        <label htmlFor="radio2">y</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

Settings.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object
};

export default pure( Settings );
