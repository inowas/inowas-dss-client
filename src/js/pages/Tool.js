import React from "react"
import {connect} from "react-redux";

import Background from "../components/tools/Background"
import Chart from "../components/tools/Chart"
import Parameters from "../components/tools/Parameters"
import Settings from "../components/tools/Settings"
import { changeSettings } from "../actions/ToolActions"

@connect((store) => {
    return {tool: store.tool}
})
export default class Tool extends React.Component {

    handleChange = (e) => {
        if (e.target.name === 'settings'){
            this.props.dispatch(changeSettings(e.target.value));
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
                        <Settings data={this.props.tool.settings} handleChange={this.handleChange} />
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Parameters data={this.props.tool.parameters} />
                    </section>
                </div>
            </div>
        )
    }
}
