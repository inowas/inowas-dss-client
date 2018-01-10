/* eslint-disable react/no-multi-comp */
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {calcC, calcCTau, calculateDL, calculateR, calculateVx} from '../calculations/calculationT08';
import {
    SETTINGS_CASE_FIXED_TIME, SETTINGS_CASE_VARIABLE_TIME, SETTINGS_INFILTRATION_CONTINUOUS,
    SETTINGS_INFILTRATION_ONE_TIME
} from "../reducers/main";

const style = {
    marginTop: '10px',
    marginBottom: '10px'
};

const renderText = (settings, t, c, x) => {
    if (settings.case === SETTINGS_CASE_FIXED_TIME) {
        return (
            <p>
                After fixed <strong>{t} days</strong> since introduction of constant point source the
                concentration is <strong>{c.toFixed(2)} mg/l</strong> at a distance of <strong>{x} m</strong> from
                constant point
                source.
            </p>
        );
    }

    return (
        <p>
            At a fixed distance of <strong>{x} m</strong> from constant point source the
            concentration is <strong>{c.toFixed(2)} mg/l</strong> after <strong>{t} days</strong> since introduction of
            constant point source.
        </p>
    );
};

const Settings = ({settings, handleChange, x, t, C0, tau, K, ne, I, alphaL, Kd}) => {
    const vx = calculateVx(K, ne, I);
    const DL = calculateDL(alphaL, vx);
    const R = calculateR(ne, Kd);
    const C = (settings.infiltration === SETTINGS_INFILTRATION_ONE_TIME && t > tau) ? calcCTau(t, x, vx, R, DL, tau) : calcC(t, x, vx, R, DL);
    const c = C0 * C;

    return (
        <div className="padding-30">
            <h2>Settings</h2>
            <div className="center-vertical center-horizontal">
                <div className="radio-group">
                    <div>
                        <input name="settings_case" id="radio1" type="radio" value={SETTINGS_CASE_VARIABLE_TIME}
                               checked={settings.case === SETTINGS_CASE_VARIABLE_TIME}
                               style={style} onChange={handleChange}/>
                        <label htmlFor="radio1">Variable time (T), Fixed length (x)</label>
                    </div>
                    <div>
                        <input name="settings_case" id="radio2" type="radio" value={SETTINGS_CASE_FIXED_TIME}
                               checked={settings.case === SETTINGS_CASE_FIXED_TIME}
                               style={style} onChange={handleChange}/>
                        <label htmlFor="radio2">Fixed time (T), Variable length (x)</label>
                    </div>
                </div>
            </div>
            <h3>Select the type of infiltration</h3>
            <div className="center-vertical center-horizontal">
                <div className="radio-group">
                    <div>
                        <input name="settings_infiltration" id="radio3" type="radio" value={SETTINGS_INFILTRATION_CONTINUOUS}
                               checked={settings.infiltration === SETTINGS_INFILTRATION_CONTINUOUS}
                               style={style} onChange={handleChange}/>
                        <label htmlFor="radio3">Continuous infiltration</label>
                    </div>
                    <div>
                        <input name="settings_infiltration" id="radio4" type="radio" value={SETTINGS_INFILTRATION_ONE_TIME}
                               checked={settings.infiltration === SETTINGS_INFILTRATION_ONE_TIME}
                               style={style} onChange={handleChange}/>
                        <label htmlFor="radio4">One-time infiltration</label>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            {renderText(settings, t, c, x)}
        </div>
    );
};

Settings.propTypes = {
    settings: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    x: PropTypes.number.isRequired,
    t: PropTypes.number.isRequired,
    C0: PropTypes.number.isRequired,
    tau: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired,
    ne: PropTypes.number.isRequired,
    I: PropTypes.number.isRequired,
    alphaL: PropTypes.number.isRequired,
    Kd: PropTypes.number.isRequired,
};

export default pure(Settings);
