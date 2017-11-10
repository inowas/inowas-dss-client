/* eslint-disable react/no-multi-comp */
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {inputType} from '../../inputType';

import '../../less/toolParameters.less';
import '../../less/input-range.less';

const renderParam = (param, handleChange) => {
    if (!param.inputType) {
        return renderSlider(param, handleChange);
    }

    switch (param.inputType) {
        case inputType.NUMBER:
            return renderNumber(param, handleChange);
        case inputType.RADIO_SELECT:
            return renderRadioSelect(param, handleChange);
        case inputType.SLIDER:
            return renderSlider(param, handleChange);
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
    return (<label key={option.id}>
        <input name={'parameter_' + param.id + '_value'} value={option.value} type="radio"
               checked={param.value === option.value} onChange={handleChange}/> {option.label}
    </label>);
};

const renderRadioSelect = (param) => {
    const options = param
        .options
        .map(option => {
            return renderRadioOption(param, option);
        });

    return (<tr key={param.id} className="parameter">
        <td className="parameter-label">{param.label}</td>
        <td>{options}</td>
    </tr>);
};

const renderSlider = (param, handleChange) => {
    // Should do some refactoring
    if (!param.label && param.name) {
        param.label = param.name;
    }
    let disable = false;
    if (param.disable) {
        disable = param.disable;
    }
    return (<tr key={param.id} className="parameter">
        <td className="parameter-label">{param.label}</td>
        <td>
            <input disabled={disable} name={'parameter_' + param.id + '_min'}
                   className="parameter-min input-max input-xs" type="number" step={param.stepSize}
                   value={Number(param.min).toFixed(param.decimals)} onChange={handleChange}/>

            <input disabled={disable} name={'parameter_' + param.id + '_max'}
                   className="parameter-max input-max input-xs" type="number" step={param.stepSize}
                   value={Number(param.max).toFixed(param.decimals)} onChange={handleChange}/>

            <input disabled={disable} id={param.id + '_range'} name={'parameter_' + param.id + '_value'}
                   className="parameter-input" type="range" min={param.min} max={param.max} step={param.stepSize}
                   value={param.value} onChange={handleChange}/>
        </td>
        <td>
            <input disabled={disable} name={'parameter_' + param.id + '_value'}
                   className="parameter-max input input-xs"
                   type="number" step={param.stepSize} min={param.min} max={param.max}
                   value={Number(param.value).toFixed(param.decimals)} onChange={handleChange}/>
        </td>
    </tr>);
};

const Parameters = ({parameters, handleChange, handleReset}) => {
    const sortedParameters = parameters.sort((a, b) => {
        if (a.order > b.order) {
            return 1;
        }
        return -1;
    });

    const params = sortedParameters.map(param => {
        return renderParam(param, handleChange);
    });

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
    parameters: PropTypes.array.isRequired
};

export default pure(Parameters);
