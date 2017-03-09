import React from 'react';
import '../../../less/toolParameters.less';
import '../../../less/input-range.less';
import '../../../less/toolT16.less';

export default class Parameters extends React.Component {

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
            <td className="parameter-label">{param.label}</td>
            <td>
                <input name={'sieve_' + param.id + '_value'} className="parameter-max input input-xs"
                       type="number" min={param.min} max={param.max} step={param.stepSize}
                       value={Number(param.value).toFixed(param.decimals)} onChange={this.handleChange}/>
            </td>
            <td>g</td>
        </tr>
    }

    render() {
        const params = this.props.data.map(param => {
            return this.renderNumber(param);
        });
        return (
            <div className="grid-container">
                <div className="col stretch parameters-wrapper">
                    <table className="parameters-sieve">
                        <tbody>
                            <tr>
                                <th  className="table-sieve-bottom"><strong>Sieve</strong></th>
                                <th  className="table-sieve-bottom"><strong>Mass</strong></th>
                                <th  className="table-sieve-bottom"><strong>Unit</strong></th>
                            </tr>
                                {params}
                            <tr>
                                <td className="table-sieve-top" ><strong>Total</strong></td>
                                <td className="table-sieve-top" >{this.props.info.total}</td>
                                <td>g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
