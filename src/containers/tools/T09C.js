import React from 'react';
import {connect} from 'react-redux';

import '../../less/4TileTool.less';

import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT09C';
import Info from '../../components/tools/InfoT09C';
import Parameters from '../../components/tools/Parameters';
import {changeParameter, calculate, reset} from '../../actions/T09C';

import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import Navbar from '../Navbar';

@connect((store) => {
    return {tool: store.T09C};
})
export default class T09C extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/t09-simple-saltwater-intrusion-equations/',
            icon: <Icon name="file"/>
        }]
    }

    handleChange = (e) => {
        if (e.target.name.startsWith('parameter')) {
            const param = e.target.name.split('_');

            const parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.props.dispatch(changeParameter(parameter));
        }
    };

    handleReset = () => {
        this.props.dispatch(reset());
    };

    componentWillMount() {
        this.props.dispatch(calculate());
    }

    render() {
        const { navigation } = this.state;
        return (
            <div className="app-width">
                <Navbar links={navigation} />
                <Header title={'T09_c. Saltwater intrusion // Upconing'}/>
                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked">
                        <Background image={this.props.tool.background.image}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Chart data={this.props.tool.chart.data} info={this.props.tool.info} options={this.props.tool.chart.options}/>
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-2">
                        <Info data={this.props.tool.info}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Parameters data={this.props.tool.parameters} handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                </div>
            </div>
        );
    }
}
