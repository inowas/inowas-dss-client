import React from 'react'
import {connect} from 'react-redux';

import Background from '../../components/tools/Background'
import Chart from '../../components/tools/ChartT02'
import Settings from '../../components/tools/SettingsT02';
import Parameters from '../../components/tools/Parameters'
import {changeSettings, changeParameter, calculate, reset,} from '../../actions/T02'
import Header from '../../components/tools/Header';

@connect((store) => {
    return {tool: store.T02}
})
export default class T02 extends React.Component {

    handleChange = (e) => {

        if (e.target.name == 'variable') {
            this.props.dispatch(changeSettings(e.target.value));
        }

        if (e.target.name.startsWith('parameter')) {
            const param = e.target.name.split('_');

            let parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.props.dispatch(changeParameter(parameter))
        }
    };

    handleReset = () => {
        this.props.dispatch(reset());
    };

    componentWillMount() {
        this.props.dispatch(calculate())
    }

    render() {
        const variable = this.props.tool.settings.variable;
        const parameters = this.props.tool.parameters;
        const w = parameters.find(p => {
            return p.id == 'w'
        }).value;
        const L = parameters.find(p => {
            return p.id == 'L'
        }).value;
        const W = parameters.find(p => {
            return p.id == 'W'
        }).value;
        const hi = parameters.find(p => {
            return p.id == 'hi'
        }).value;
        const Sy = parameters.find(p => {
            return p.id == 'Sy'
        }).value;
        const K = parameters.find(p => {
            return p.id == 'K'
        }).value;
        const t = parameters.find(p => {
            return p.id == 't'
        }).value;

        return (
            <div className="page-wrapper">
                <div className="page-width">
                    <Header title={'T02. Groundwater mounding (Hantush)'} />
                    <div className="grid-container">
                        <section className="tile col col-abs-2 stacked">
                            <Background image={this.props.tool.background.image}/>
                        </section>

                        <section className="tile col col-abs-3 stretch">
                            <Chart variable={variable} w={w} L={L} W={W} hi={hi} Sy={Sy} K={K} t={t} x_min={0} x_max={120} d_x={10} />
                        </section>
                    </div>

                    <div className="grid-container">
                        <section className="tile col col-abs-2">
                            <Settings data={this.props.tool.settings} handleChange={this.handleChange}/>
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
