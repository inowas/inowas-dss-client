import React from "react"

export default class Parameters extends React.Component{

    handleChange(e) {
        if (this.props.handleChange){
            this.props.handleChange(e);
        }
    };

    renderParam(param){
        return (
            <tr key={param.id} className="parameter">
                <td className="parameter-label">{param.name}</td>
                <td>
                    <input
                        name={"parameter_"+param.id+"_min"}
                        className="parameter-min input input-xs"
                        type="text"
                        value={param.min}
                        onChange={this.handleChange.bind(this)}
                    />

                    <input
                        name={"parameter_"+param.id+"_max"}
                        className="parameter-max input input-xs"
                        type="text"
                        defaultValue={param.max}
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
            </tr>
        );
    }

    render(){
        const params = this.props.data.map( param => {
            return this.renderParam(param);
        });

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
                            <button className="button button-accent">Default</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
