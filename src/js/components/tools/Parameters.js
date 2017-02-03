import React from 'react';
import {inputType} from '../../inputType';

export default class Parameters extends React.Component {

    // handleChange(e) {
    //     if (this.props.handleChange) {
    //         this
    //             .props
    //             .handleChange(e);
    //     }
    // };

    handleChange = e => {
        if (this.props.handleChange)
            this.props.handleChange(e);
        }

    // handleReset(e) {
    //     this
    //         .props
    //         .handleReset(e);
    // };

    handleReset = e => {
        if (this.props.handleReset)
            this.props.handleReset(e);
        }

    renderParam(param) {
        if (!param.inputType) {
            return this.renderSlider(param);
        }

        switch (param.inputType) {
            case inputType.NUMBER:
                return this.renderNumber(param);
                break;
            case inputType.RADIO_SELECT:
                return this.renderRadioSelect(param);
                break;
            case inputType.SLIDER:
                return this.renderSlider(param);
                break;
            default:
        }
    }

    renderNumber(param) {
        return <tr key={param.id} className="parameter">
            <td className="parameter-label">{param.label}</td>
            <td>
                <input name={'parameter_' + param.id + '_value'} type="number" min={param.min} max={param.max} step={param.stepSize} value={Number(param.value).toFixed(param.decimals)} onChange={this.handleChange}/>
            </td>
        </tr>
    }

    renderRadioOption(param, option) {
        return <label key={option.id}>
            <input name={'parameter_' + param.id + '_value'} value={option.value} type="radio" checked={param.value == option.value} onChange={this.handleChange}/> {option.label}
        </label>
    }

    renderRadioSelect(param) {
        const options = param
            .options
            .map(option => {
                return this.renderRadioOption(param, option);
            });

        return <tr key={param.id} className="parameter">
            <td className="parameter-label">{param.label}</td>
            <td>{options}</td>
        </tr>
    }

    renderSlider(param) {
        // Should do some refactoring
        if (!param.label && param.name)
            param.label = param.name;

        return <tr key={param.id} className="parameter">
            <td className="parameter-label">{param.label}</td>
            <td>
                <input name={'parameter_' + param.id + '_min'} className="parameter-min input input-xs" type="number" step={param.stepSize} value={Number(param.min).toFixed(param.decimals)} onChange={this.handleChange}/>

                <input name={'parameter_' + param.id + '_max'} className="parameter-max input input-xs" type="number" step={param.stepSize} value={Number(param.max).toFixed(param.decimals)} onChange={this.handleChange}/>

                <input id={param.id + '_range'} name={'parameter_' + param.id + '_value'} className="parameter-input" type="range" min={param.min} max={param.max} step={param.stepSize} value={param.value} onChange={this.handleChange}/>
            </td>
            <td>
                <input name={'parameter_' + param.id + '_value'} className="parameter-max input input-xs" type="number" step={param.stepSize} value={Number(param.value).toFixed(param.decimals)} onChange={this.handleChange}/>
            </td>
        </tr>
    }

    render() {
        const sortedParameters = this
            .props
            .data
            .sort((a, b) => {
                if (a.order > b.order) {
                    return 1
                }
                return -1;
            });

        const params = sortedParameters.map(param => {
            return this.renderParam(param);
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
                            <button onClick={this.handleReset} className="button button-accent">Default</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
