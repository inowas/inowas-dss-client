import React from 'react';
import {connect} from 'react-redux';

import '../../less/4TileTool.less';

import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT08';
import Info from '../../components/tools/InfoT08';
import Parameters from '../../components/tools/Parameters_T08';
import {changeParameter, calculate, reset, changeSettings} from '../../actions/T08';
import Header from '../../components/tools/Header';
import Navbar from '../Navbar';
import Icon from '../../components/primitive/Icon';

@connect((store) => {
    return {tool: store.T08};
})
export default class T08 extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/T08-1D transport model (Ogata-Banks)/',
            icon: <Icon name="file"/>
        }]
    };

    handleChange = (e) => {
        if (e.target.name.startsWith('parameter')) {
            const param = e.target.name.split('_');

            const parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;
            this.props.dispatch(changeParameter(parameter));
        }
        if ( e.target.name === 'settings' ) {
            this.props.dispatch(changeSettings( e.target.value ));
        }
    };

    handleReset = (e) => {
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
                <Header title={'T08-1D transport model (Ogata-Banks)'}/>
                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked">
                        <Background image={this.props.tool.background.image}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Chart data={this.props.tool.chart.data} settings={this.props.tool.settings} options={this.props.tool.chart.options}/>
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-2">
                        <Info data={this.props.tool.settings} handleChange={this.handleChange}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Parameters data={this.props.tool.parameters} handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                </div>
            </div>
        );
    }
}
