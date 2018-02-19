import React from 'react';
import PropTypes from 'prop-types';

import '../../less/toolParameters.less';
import '../../less/input-range.less';
import '../../less/toolT16.less';

import Popup from '../../components/primitive/Popup';

class MFI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false
        };
    }

    renderMFIDataRow(param) {
        if (!param.label && param.name) {
            param.label = param.name;
        }

        return (
            <tr key={param.id} className="parameter">
                <td>
                    <input name={'use_' + param.id + '_data'} type="radio" checked={param.checked === 'true'}
                           onChange={this.props.handleChange}/>
                </td>
                <td>
                    <input name={'mfi_' + param.id + '_t'} className="parameter-max input input-xs"
                           type="number" step={param.stepSize} value={Number(param.t).toFixed(param.decimals)}
                           onChange={this.props.handleChange}/>
                </td>
                <td>
                    <input name={'mfi_' + param.id + '_V'} className="parameter-max input input-xs"
                           type="number" step={param.stepSize} value={Number(param.V).toFixed(param.decimals)}
                           onChange={this.props.handleChange}/>
                </td>
            </tr>
        );
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

    renderCorrections() {
        const corrections = this.props.corrections.map(param => {
            return (
                <tr key={param.name} className="parameter">
                    <td className="parameter-label">{param.def}</td>
                    <td>{param.name}</td>
                    <td>
                        <input name={'corr_' + param.name} className="input-hydrodata input input-xs"
                               value={Number(param.value)} type="number" step={param.stepSize}
                               onChange={this.props.handleChange}/>
                    </td>
                    <td>{param.unit}</td>
                </tr>
            );
        });
        return (
            <table className="table">
                <tbody>
                {corrections}
                </tbody>
            </table>
        );
    };

    render() {
        const data = this.props.data;
        const params = data.map(param => {
            return this.renderMFIDataRow(param);
        });
        return (
            <div className="grid-container">
                <div className="col stretch parameters-wrapper">
                    <table className="table-t16a-sieve">
                        <tbody>
                        <tr>
                            <th className="th"><strong/></th>
                            <th className="th"><strong>Time [s]</strong></th>
                            <th className="th"><strong>Volume [l]</strong></th>
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
                        {this.renderCorrections()}
                    </Popup>

                </div>
            </div>
        );
    }
}

MFI.propTypes = {
    corrections: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired
};

export default MFI;
