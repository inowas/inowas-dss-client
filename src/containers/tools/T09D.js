import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import '../../less/4TileTool.less';

import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT09D';
import Settings from '../../components/tools/SettingsT09D';
import Parameters from '../../components/tools/Parameters';
import {changeSettings, changeParameter, calculate, reset} from '../../actions/T09D';
import Header from '../../components/tools/Header';
import Navbar from '../Navbar';
import Icon from '../../components/primitive/Icon';

class T09D extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/t09-simple-saltwater-intrusion-equations/',
            icon: <Icon name="file"/>
        }]
    };

    componentWillMount() {
        this.props.calculate();
    }


    handleChange = (e) => {
        if (e.target.name === 'settings') {
            this.props.changeSettings(e.target.value);
        }

        if (e.target.name.startsWith('parameter')) {
            const param = e.target.name.split('_');

            const parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.props.changeParameter(parameter);
        }
    };

    handleReset = () => {
        this.props.reset();
    };

    render() {
        const { navigation } = this.state;
        return (
            <div className="app-width">
                <Navbar links={navigation} />
                <Header title={'T09_d. Saltwater intrusion // Critical well discharge'}/>
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
                        <Settings data={this.props.tool.settings} handleChange={this.handleChange}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Parameters parameters={this.props.tool.parameters} handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                </div>
            </div>
        );
    }
}

T09D.propTypes = {
    tool: PropTypes.object.isRequired,
    calculate: PropTypes.func.isRequired,
    changeParameter: PropTypes.func.isRequired,
    changeSettings: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        tool: state.T09D,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        calculate: calculate,
        changeParameter: changeParameter,
        changeSettings: changeSettings,
        reset: reset
    }, dispatch);
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(T09D)
);
