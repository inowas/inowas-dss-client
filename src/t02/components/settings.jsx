import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {mounding} from "gwflowjs";

const Settings = ({settings, handleChange, w, L, W, hi, Sy, K, t}) => {

    const hhi = mounding.calculateHi(0, 0, w, L, W, hi, Sy, K, t);
    const hMax = (hhi + hi);

    return (
        <div>
            <h2>Settings</h2>
            <div className="center-vertical center-horizontal">
                <h4>Please select the axis for the calculation of groundwater mounding:</h4>
            </div>
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
            <div className="center-vertical center-horizontal" style={{padding: 20}}>
                <p>
                    The resulting groundwater mound is <strong>{hhi.toFixed(2)}m </strong>
                    and the groundwater level will rise up to <strong>{hMax.toFixed(2)}m</strong>.</p>
            </div>
        </div>
    );
};

Settings.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object
};

export default pure(Settings);
