import React from 'react';
import {inputType} from '../../inputType';

import '../../less/toolParameters.less';
import '../../less/input-range.less';

export default class Parameters extends React.Component {

    handleChange = e => {
        if (this.props.handleChange)            {this.props.handleChange(e);}
    };

    handleReset = e => {
        if (this.props.handleReset)            {this.props.handleReset(e);}
    };

    renderSlider(param) {
        // Should do some refactoring
        if (!param.label && param.name)            {param.label = param.name;}
        let disable = false;
        if (param.disable) {
            disable = param.disable;
        }
        return (<tr key={param.id} className="parameter">
            <td className="parameter-label">{param.label}</td>
            <td>
                <input disabled={disable} name={'parameter_' + param.id + '_min'} className="parameter-min input-max input-xs" type="number" step={param.stepSize} value={Number(param.min).toFixed(param.decimals)} onChange={this.handleChange}/>

                <input disabled={disable} name={'parameter_' + param.id + '_max'} className="parameter-max input-max input-xs" type="number" step={param.stepSize} value={Number(param.max).toFixed(param.decimals)} onChange={this.handleChange}/>

                <input disabled={disable} id={param.id + '_range'} name={'parameter_' + param.id + '_value'} className="parameter-input" type="range" min={param.min} max={param.max} step={param.stepSize} value={param.value} onChange={this.handleChange}/>
            </td>
            <td>
                <input disabled={disable} name={'parameter_' + param.id + '_value'} className="parameter-max input input-xs"
                       type="number" step={param.stepSize} min={param.min} max={param.max}
                       value={Number(param.value).toFixed(param.decimals)} onChange={this.handleChange}/>
            </td>
        </tr>);
    }

    render() {
        const sortedParameters = this
            .props
            .data
            .sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                }
                return -1;
            });

        const params = sortedParameters.map(param => {
            return this.renderSlider(param);
        });

        return (
            <div className="grid-container">
                <div className="col stretch parameters-wrapper">
                    <h2>Parameters</h2>
                    <table className="parameters">
                        <tbody>
                            {params}
                        </tbody>
                    </table>
                </div>

                <div>
                    <ul className="nav nav-stacked" role="navigation">
                        <li>
                            <button onClick={this.handleReset} className="button button-accent">Default</button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
