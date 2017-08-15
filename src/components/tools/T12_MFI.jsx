import React from 'react';
import '../../less/toolParameters.less';
import '../../less/input-range.less';
import '../../less/toolT16.less';
import Popup from '../primitive/Popup';

export default class Sieves extends React.Component {

    state = {
        popupVisible: false
    };
    handleChange = e => {
        if (this.props.handleChange)
            this.props.handleChange(e);
    };

    handleReset = e => {
        if (this.props.handleReset)
            this.props.handleReset(e);
    };
    renderNumber(param) {
        if (!param.label && param.name)
            param.label = param.name;
        return <tr key={param.id} className="parameter">
            <td>
                <input name={'use_' + param.id + '_data'} type="radio" checked={param.checked === 'true'}
                       onChange={this.handleChange}/>
            </td>
            <td>
                <input name={'mfi_' + param.id + '_t'} className="parameter-max input input-xs"
                       type="number" step={param.stepSize} value={Number(param.t).toFixed(param.decimals)}
                       onChange={this.handleChange}/>
            </td>
            <td>
            <input name={'mfi_' + param.id + '_V'} className="parameter-max input input-xs"
                   type="number" step={param.stepSize} value={Number(param.V).toFixed(param.decimals)}
                   onChange={this.handleChange}/>
            </td>
        </tr>
    };
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
    //Popup window
    corrections() {
        const corrections = this.props.corrections.map(param => {
        return <tr key={param.name} className="parameter">
            <td className="parameter-label">{param.def}</td>
            <td>{param.name}</td>
            <td>
                <input name={'corr ' + param.name} className="input-hydrodata input input-xs"
                       value={Number(param.value)} type="number" step={param.stepSize}
                       onChange={this.handleChange}/>
            </td>
            <td>{param.unit}</td>
        </tr>
    });
        return <table className="table">
            <tbody>
            {corrections}
            </tbody>
        </table>
    };
    render() {
        const data = this.props.data;
        const params = data.map(param => {
            return this.renderNumber(param);
        });
        return (
            <div className="grid-container">
                <div className="col stretch parameters-wrapper">
                    <table className="table-t16a-sieve">
                        <tbody>
                        <tr>
                            <th  className="th"><strong></strong></th>
                            <th  className="th"><strong>Time [s]</strong></th>
                            <th  className="th"><strong>Volume [l]</strong></th>
                        </tr>
                        {params}
                        </tbody>
                    </table>
                    <div className="popup-div">
                        <button className=" link popups" onClick={this.showPopup}>
                            <span>Corrections</span>
                        </button>
                    </div>
                    <Popup visible={this.state.popupVisible} close={this.closePopup}>
                        <h2>Experimental setup</h2>
                        {this.corrections()}
                    </Popup>

                </div>
            </div>
        )
    }
}
