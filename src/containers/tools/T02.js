import React from 'react';

import image from '../../images/tools/T02.png';

import '../../less/4TileTool.less';

import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT02';
import Settings from '../../components/tools/SettingsT02';
import Parameters from '../../components/tools/Parameters';
import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import Navbar from '../Navbar';

import applyParameterUpdate from '../../reducers/applyParameterUpdate';

class T02 extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        this.setState(this.defaultState);
    }

    defaultState = () => {
        return {
            navigation: [{
                name: 'Documentation',
                path: 'https://wiki.inowas.hydro.tu-dresden.de/t02-groundwater-mounding-hantush/',
                icon: <Icon name="file"/>
            }],
            settings: {
                variable: 'x'
            },
            parameters: [{
                order: 0,
                id: 'w',
                name: 'Percolation rate, w (m/d)',
                min: 0,
                validMin: function(x) {
                    return x >= 0;
                },
                max: 10,
                value: 0.045,
                stepSize: 0.001,
                decimals: 3
            }, {
                order: 1,
                id: 'L',
                name: 'Basin length, L (m)',
                min: 0,
                validMin: function(x) {
                    return x > 0;
                },
                max: 1000,
                value: 40,
                stepSize: 1,
                decimals: 0
            }, {
                order: 2,
                id: 'W',
                name: 'Basin width, W (m)',
                min: 0,
                validMin: function(x) {
                    return x > 0;
                },
                max: 100,
                value: 20,
                stepSize: 1,
                decimals: 0
            }, {
                order: 3,
                id: 'hi',
                name: 'Initial groundwater Level, hi (m)',
                min: 0,
                validMin: function(x) {
                    return x >= 0;
                },
                max: 100,
                value: 35,
                stepSize: 1,
                decimals: 0
            }, {
                order: 4,
                id: 'Sy',
                name: 'Specific yield, Sy (-)',
                min: 0.000,
                validMin: function(x) {
                    return x > 0;
                },
                max: 0.5,
                validMax: function(x) {
                    return x <= 0.5;
                },
                value: 0.085,
                stepSize: 0.001,
                decimals: 3
            }, {
                order: 5,
                id: 'K',
                name: 'Hydraulic conductivity, K (m/d)',
                min: 0.1,
                validMin: function(x) {
                    return x > 0;
                },
                max: 10,
                validMax: function(x) {
                    return x <= 100000;
                },
                value: 1.83,
                stepSize: 0.1,
                decimals: 1
            }, {
                order: 6,
                id: 't',
                name: 'Infiltration time, t (d)',
                min: 0,
                validMin: function(x) {
                    return x > 0;
                },
                max: 100,
                value: 1.5,
                stepSize: 1,
                decimals: 0
            }]
        };
    };

    updateSettings(value) {
        this.setState({
            settings: {
                variable: value
            }
        });
    }

    updateParameter(updatedParam) {
        const parameters = this.state.parameters.map( p => {
            if (p.id === updatedParam.id) {
                return applyParameterUpdate(p, updatedParam);
            }

            return p;
        });

        this.setState({parameters: parameters});
    }

    handleChange = (e) => {
        if (e.target.name === 'variable') {
            this.updateSettings(e.target.value);
        }

        if (e.target.name.startsWith('parameter')) {
            const param = e.target.name.split('_');

            const parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.updateParameter(parameter);
        }
    };

    handleReset = () => {
        this.setState(this.defaultState);
    };

    render() {
        const { navigation, settings, parameters } = this.state;

        return (
            <div className="app-width">
                <Navbar links={navigation}/>
                <Header title={'T02. Groundwater mounding (Hantush)'}/>
                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked">
                        <Background image={image}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Chart settings={settings} parameters={parameters}/>
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-2">
                        <Settings settings={settings} handleChange={this.handleChange}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Parameters parameters={parameters} handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                </div>
            </div>
        );
    }
}

export default T02;
