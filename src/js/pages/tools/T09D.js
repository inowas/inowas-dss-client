import React from 'react';
import {connect} from 'react-redux';

import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT09D';
import Settings from '../../components/tools/Settings';
import Parameters from '../../components/tools/Parameters';
import { changeSettings, changeParameter, calculate, reset } from '../../actions/T09D';

import Header from '../../components/tools/Header';

@connect((store) => {
    return {tool: store.T09D}
})
export default class T09D extends React.Component {

    handleChange = (e) => {

        if (e.target.name === 'settings'){
            this.props.dispatch(changeSettings(e.target.value));
        }

        if (e.target.name.startsWith('parameter')){
            const param = e.target.name.split('_');

            let parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.props.dispatch(changeParameter(parameter))
        }
    };

    handleReset = (e) => {
        this.props.dispatch(reset());
    };

    componentWillMount(){
        this.props.dispatch(calculate())
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="page-width">
                    <Header/>
                    <div className="grid-container">
                        <section className="tile col col-abs-2 stacked">
                            <Background image={this.props.tool.background.image} />
                        </section>

                        <section className="tile col col-abs-3 stretch">
                            <Chart data={this.props.tool.chart.data} info={this.props.tool.info} options={this.props.tool.chart.options} />
                        </section>
                    </div>

                    <div className="grid-container">
                        <section className="tile col col-abs-2">
                            <Settings data={this.props.tool.settings} handleChange={this.handleChange} />
                        </section>

                        <section className="tile col col-abs-3 stretch">
                            <Parameters data={this.props.tool.parameters} handleChange={this.handleChange} handleReset={this.handleReset}/>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
