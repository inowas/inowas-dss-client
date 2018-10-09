/* eslint-disable react/no-multi-comp */
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {inputType} from '../../inputType';

import '../../less/toolParameters.less';
import '../../less/input-range.less';
import {SETTINGS_INFILTRATION_ONE_TIME} from '../reducers/main';


import ParameterSlider from '../../core/parameterSlider';

const renderParam = (param, handleChange) => {
    if (!param.inputType) {
        return (<ParameterSlider key={param.id} handleChange={handleChange} param={param}/>);
    }

    switch (param.inputType) {
        case inputType.NUMBER:
            return renderNumber(param, handleChange);
        case inputType.RADIO_SELECT:
            return renderRadioSelect(param, handleChange);
        case inputType.SLIDER:
            return (<ParameterSlider key={param.id} handleChange={handleChange} param={param}/>);
    }

    return null;
};

const renderNumber = (param, handleChange) => {
    return (<tr key={param.id} className="parameter">
        <td className="parameter-label">{param.label}</td>
        <td>
            <input name={'parameter_' + param.id + '_value'} type="number" min={param.min} max={param.max}
                   step={param.stepSize} value={Number(param.value).toFixed(param.decimals)}
                   onChange={handleChange}/>
        </td>
    </tr>);
};

const renderRadioOption = (param, option, handleChange) => {
    return (
        <div key={option.id}>
            <label>
                <input
                    name={'parameter_' + param.id + '_value'}
                    value={option.value}
                    type="radio"
                    checked={param.value === option.value}
                    onChange={handleChange}
                /> {option.label}
            </label>
            <br/>
        </div>
    );
};

const renderRadioSelect = (param, handleChange) => {
    const options = param
        .options
        .map(option => {
            return renderRadioOption(param, option, handleChange);
        });

    return (
        <tr key={param.id} className="parameter">
            <td className="parameter-label">{param.label}</td>
            <td>{options}</td>
        </tr>
    );
};

const Parameters = ({settings, parameters, handleChange, handleReset}) => {
    const sortedParameters = parameters.sort((a, b) => {
        if (a.order > b.order) {
            return 1;
        }
        return -1;
    });

    let params = sortedParameters.slice(0, 9).map(param => {
        return renderParam(param, handleChange);
    });
    if (settings.infiltration === SETTINGS_INFILTRATION_ONE_TIME) {
        params = sortedParameters.slice(0, 10).map(param => {
            return renderParam(param, handleChange);
        });
    }
    return (
        <div className="grid-container">
            <div className="col stretch parameters-wrapper">
                <table className="parameters">
                    <tbody>
                    {params}
                    </tbody>
                </table>
            </div>

            <div className="col col-rel-0-5">
                <ul className="nav nav-stacked" role="navigation">
                    <li>
                        <button onClick={handleReset} className="button button-accent">Default</button>
                    </li>
                </ul>
            </div>

        </div>
    );
};

Parameters.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    parameters: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
};

export default pure(Parameters);
