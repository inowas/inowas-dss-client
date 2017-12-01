import React from 'react';
import {inputType} from '../../inputType';
import Popup from '../primitive/Popup';

import '../../less/toolParameters.less';
import '../../less/input-range.less';

export default class Parameters extends React.Component {

    state = {
        popupVisible: false
    };
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

    closePopup = () => {
        this.setState({
            popupVisible: false
        });
    };
    showPopup = () => {
        this.setState({
            popupVisible: true
        });
    };

    render() {
        const settings = this.props.settings;
        const styleupdate = {
            marginTop: "20px"
        };
        const stylelink = {
            marginLeft: "70px"
        };
        var params = this.props.data.slice(0,9).map(param => {
            return this.renderSlider(param);
        });
        if (settings.infiltration === 'OneTime') {
            params = this.props.data.slice(0,10).map(param => {
            return this.renderSlider(param);
        });
        }
        const params_Kd = this.props.data.slice(10,12).map(param => {
            return this.renderSlider(param);
        });
        return (
            <div className="grid-container">
                <div className="col stretch parameters-wrapper">
                    <table className="parameters">
                        <tbody>
                            {params}
                        </tbody>
                    </table>
                    <div className="popup-div">
                        <button style={stylelink} className="link popups" onClick={this.showPopup}>
                            <span>Calculate Kd</span>
                        </button>
                    </div>
                </div>
                <div className="col col-rel-0-5">
                    <ul className="nav nav-stacked" role="navigation">
                        <li>
                            <button onClick={this.handleReset} className="button button-accent">Default</button>
                        </li>
                    </ul>
                </div>
                <Popup visible={this.state.popupVisible} close={this.closePopup}>
                    <h2>Calculate Kd</h2>
                    <div className="col-textalign stretch parameters-wrapper">
                        <table className="parameters">
                            <tbody>
                            {params_Kd}
                            </tbody>
                        </table>
                        <button  style={styleupdate} type="Button" onClick={this.closePopup}>Close</button>
                    </div>
                </Popup>
            </div>
        );
    }
}