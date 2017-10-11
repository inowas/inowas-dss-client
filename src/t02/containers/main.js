import React from 'react';
import image from '../../images/tools/T02.png';
import '../../less/4TileTool.less';
import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT02';
import Settings from '../../components/tools/SettingsT02';
import Parameters from '../../components/tools/Parameters';
import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import Navbar from '../../containers/Navbar';
import { getInitialState } from '../reducers/main';

import applyParameterUpdate from '../../reducers/applyParameterUpdate';

class T02 extends React.Component {

    constructor() {
        super();
        this.state = {
            navigation: [ {
                name: 'Documentation',
                path: 'https://wiki.inowas.hydro.tu-dresden.de/t02-groundwater-mounding-hantush/',
                icon: <Icon name="file"/>
            } ],
            data: getInitialState()
        };
    }

    updateSettings(value) {
        this.setState( prevState => {
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    settings: {
                        ...prevState.settings,
                        variable: value
                    }
                }
            };
        } );
    }

    updateParameter(updatedParam) {
        const parameters = this.state.data.parameters.map( p => {
            if (p.id === updatedParam.id) {
                return applyParameterUpdate( p, updatedParam );
            }

            return p;
        } );

        this.setState( prevState => {
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    parameters
                }
            };
        } );
    }

    handleChange = (e) => {
        if (e.target.name === 'variable') {
            this.updateSettings( e.target.value );
        }

        if (e.target.name.startsWith( 'parameter' )) {
            const param = e.target.name.split( '_' );

            const parameter = {};
            parameter.id = param[ 1 ];
            parameter[ param[ 2 ] ] = e.target.value;

            this.updateParameter( parameter );
        }
    };

    handleReset = () => {
        this.setState( prevState => {return { ...prevState, data: getInitialState() };} );
    };

    render() {
        const { settings, parameters } = this.state.data;
        const { navigation } = this.state;

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
                        <Parameters parameters={parameters} handleChange={this.handleChange}
                                    handleReset={this.handleReset}/>
                    </section>
                </div>
            </div>
        );
    }
}

export default T02;
