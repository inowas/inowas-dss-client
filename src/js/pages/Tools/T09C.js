import React from "react"
import {connect} from "react-redux";

import Background from "../../components/tools/Background"
import Chart from "../../components/tools/Chart"
import Parameters from "../../components/tools/Parameters"
import { changeParameter } from "../../actions/T09C"

@connect((store) => {
    return {tool: store.T09C}
})
export default class T09C extends React.Component {

    handleChange = (e) => {

        if (e.target.name.startsWith('parameter')){
            const param = e.target.name.split("_");

            let parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.props.dispatch(changeParameter(parameter))
        }
    };

    render() {
        return (
            <div className="page-wrapper">
                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked">
                        <Background image={this.props.tool.background.image} />
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Chart data={this.props.tool.chart.data} options={this.props.tool.chart.options} />
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-2">

                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Parameters data={this.props.tool.parameters} handleChange={this.handleChange} />
                    </section>
                </div>
            </div>
        )
    }
}
