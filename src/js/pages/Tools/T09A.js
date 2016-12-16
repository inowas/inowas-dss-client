import React from "react"
import {connect} from "react-redux";

import Background from "../../components/tools/Background"
import Chart from "../../components/tools/ChartT09A"
import Parameters from "../../components/tools/Parameters"
import Settings from "../../components/tools/Settings"
import { changeSettings, changeParameter } from "../../actions/T09A"

@connect((store) => {
    return {tool: store.T09A}
})
export default class T09A extends React.Component {

    handleChange = (e) => {
        if (e.target.name === 'settings'){
            this.props.dispatch(changeSettings(e.target.value));
        }

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
              <div className="page-width">
                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked">
                        <Background image={this.props.tool.background.image} />
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Chart data={this.props.tool.chart.data} />
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-2">
                        <Settings data={this.props.tool.settings} handleChange={this.handleChange} />
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Parameters data={this.props.tool.parameters} handleChange={this.handleChange} />
                    </section>
                </div>
                </div>
            </div>
        )
    }
}
