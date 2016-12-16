import React from "react"

export default class Parameters extends React.Component {

    handleChange(e) {
        if (this.props.handleChange){
            this.props.handleChange(e);
        }
    };

    handleReset(e) {
        this.props.handleReset(e);
    };

    renderParam(param){
        return (
            <tr key={param.id} className="parameter">
                <td className="parameter-label">{param.name}</td>
                <td>
                    <input
                        name={"parameter_"+param.id+"_min"}
                        className="parameter-min input input-xs"
                        type="number"
                        value={Number(param.min).toFixed(param.decimals)}
                        onChange={this.handleChange.bind(this)}
                    />

                    <input
                        name={"parameter_"+param.id+"_max"}
                        className="parameter-max input input-xs"
                        type="number"
                        value={Number(param.max).toFixed(param.decimals)}
                        onChange={this.handleChange.bind(this)}
                    />

                    <input
                        id={param.id+"_range"}
                        name={"parameter_"+param.id+"_value"}
                        className="parameter-input"
                        type="range"
                        min={param.min}
                        max={param.max}
                        step={param.stepSize}
                        value={param.value}
                        onChange={this.handleChange.bind(this)}
                    />
                </td>
                <td>
                    <input
                        name={"parameter_"+param.id+"_value"}
                        className="parameter-max input input-xs"
                        type="number"
                        value={Number(param.value).toFixed(param.decimals)}
                        onChange={this.handleChange.bind(this)}
                    />
                </td>
            </tr>
        );
    }

    render(){
        const sortedParameters = this.props.data.sort(
            (a, b) => {
                if (a.order > b.order) {
                    return 1
                }
                return -1;
            });

        const params = sortedParameters.map(
                param => {
                    return this.renderParam(param);
                })
            ;

        return(
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
                            <button onClick={this.handleReset.bind(this)} className="button button-accent">Default</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
