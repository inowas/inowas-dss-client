import React from 'react';

import '../../../less/toolParameters.less';
import '../../../less/input-range.less';
import '../../../less/toolT16.less';
import Popup from '../primitive/Popup';

export default class Parameters extends React.Component {
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

        return <tr key={param.time} className="parameter">
{/*
            <td>
                <input name={'hydroData_' + param.time + '_time'} className="input-readingtime" type="datetime-local" step='10'
                       value={param.datetime} onChange={this.handleChange}/>
            </td>
*/}
            <td>
                <input name={'hydroData_' + param.time + '_time'} className="input-readingtime" type="time" step='10'
                       value={param.time} onChange={this.handleChange}/>
            </td>
            <td>
                <input name={'hydroData_' + param.time + '_reading'} className="input-hydrodata input input-xs" type="number" step='10'
                       value={Number(param.reading)} onChange={this.handleChange}/>
            </td>
            <td>
                <input name={'hydroData_' + param.time + '_temp'} className="input-hydrodata input input-xs" type="number" step='0.1'
                       value={Number(param.temp)} onChange={this.handleChange}/>
            </td>
            <td>°c</td>
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
    hydroCharac() {
        const paramWet = this.props.parWet.map(param => {
            return <tr key={param.name} className="parameter">
                 <td className="parameter-label">{param.def}</td>
                <td>{param.name}</td>
                <td>
                    <input name={'parWet ' + param.name} className="input-hydrodata input input-xs"
                           value={Number(param.value)} type="number" step={param.stepSize}
                           onChange={this.handleChange}/>
                </td>
                <td>{param.unit}</td>
            </tr>
        });
        return <table className="table">
            <tbody>
                <tr className="parameter">
                    <th className="th"><strong>Hydrometer Data</strong></th>
                    <th> </th>
                    <th> </th>
                    <th> </th>
                </tr>
                {paramWet}
            </tbody>
        </table>

    };
    render() {
        const params = this.props.data.map(param => {
            return this.renderNumber(param);
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
                            <input type="datetime-local" className="input-start" step='10'
                                   value={info.start} onChange={this.handleChange}/>
                            <strong>Dry Sample</strong>
                            <input type="number" className="parameter-max input input-xs"/>
                        </p>
                    </div>
                    <table className="table-t16a-hydro">
                        <tbody>
                            <tr>
                                {/*<td className="parameter-label"><strong>Reading Time</strong></td>*/}
                                <td className="th"><strong>hh:mm:ss</strong></td>
                                <td className="th"><strong>Hydrometer Data</strong></td>
                                <td className="th"><strong>Temperature</strong></td>
                            </tr>
                            {params}
                        </tbody>
                    </table>
                    <Popup visible={this.state.popupVisible} close={this.closePopup}>
                        <h2>Hydrometer Characterstics</h2>
                        {this.hydroCharac()}
                    </Popup>
                </div>
            </div>
        )
    }
}
