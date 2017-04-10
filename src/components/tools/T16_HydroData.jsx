import '../../less/toolParameters.less';
import '../../less/input-range.less';
import '../../less/toolT16.less';

import Popup from '../primitive/Popup';
import React from 'react';

export default class Parameters extends React.Component {
    state = {
        popupVisible: false
    }

    handleChange = e => {
        if ( this.props.handleChange ) {
            this.props.handleChange( e );
        }
    }

    handleReset = e => {
        if ( this.props.handleReset ) {
            this.props.handleReset( e );
        }
    }

    renderNumber( param ) {
        return (
            <tr key={param.time} className="parameter">
                <td>
                    <input name={'hydroData_' + param.time + '_time'} className="input-readingtime" type="datetime-local" step="10" value={param.datetime} onChange={this.handleChange}/>
                </td>
                <td>
                    <input name={'hydroData_' + param.time + '_time'} className="input-readingtime" type="time" step="10" value={param.time} onChange={this.handleChange}/>
                </td>
                <td>
                    <input name={'hydroData_' + param.time + '_reading'} className="parameter-max input input-xs" type="number" step="10" value={Number( param.reading )} onChange={this.handleChange}/>
                </td>
                <td>
                    <input name={'hydroData_' + param.time + '_temp'} className="parameter-max input input-xs" type="number" step="10" value={Number( param.temp )} onChange={this.handleChange}/>
                </td>
                <td>°c</td>
            </tr>
        );
    }
    closePopup = ( ) => {
        this.setState({ popupVisible: false });
    }

    showPopup = ( ) => {
        this.setState({ popupVisible: true });
    }

    hydroCharac( ) {
        return (
            <table className="parameters-sieve">
                <tbody>
                    <tr className="parameter">
                        <td className="table-sieve-bottom">Hydrometer Data</td>
                    </tr>
                    <tr className="parameter">
                        <td className="parameter-label">Height of hydrometer bulb</td>
                        <td>
                            <input/>
                        </td>
                        <td>cm</td>
                    </tr>
                </tbody>
            </table>
        );
    }
    render( ) {
        const params = this.props.data.map(param => {
            return this.renderNumber( param );
        });
        const info = this.props.info;
        return (
            <div className="grid-container">
                <div className="col stretch parameters-wrapper">
                    <div className="popup-div">
                        <button className=" link popups" onClick={this.showPopup}>
                            <span>Hydrometer Characterstics</span>
                        </button>
                    </div>

                    <div>
                        <p className="input-t16a">
                            <strong>Start</strong>
                            <input type="datetime-local" className="input-start" step="10" value={info.start} onChange={this.handleChange}/>
                            <strong>Dry Sample</strong>
                            <input type="number" className="input-start" step="10"/>
                        </p>
                    </div>
                    <table className="parameters-sieve">
                        <tbody>
                            <tr>
                                <td className="parameter-label">
                                    <strong>Reading Time</strong>
                                </td>
                                <td className="parameter-label">
                                    <strong>hh:mm:ss</strong>
                                </td>
                                <td className="parameter-label">
                                    <strong>Hydrometer Data</strong>
                                </td>
                                <td className="parameter-label">
                                    <strong>Temperature</strong>
                                </td>
                            </tr>
                            {params}
                        </tbody>
                    </table>
                    <Popup visible={this.state.popupVisible} close={this.closePopup}>
                        <h2>Hydrometer Characterstics</h2>
                        {this.hydroCharac( )}
                    </Popup>
                </div>
            </div>
        );
    }
}
