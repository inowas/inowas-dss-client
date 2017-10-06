import React from 'react';
import { connect } from 'react-redux';

import Info from '../../components/tools/InfoT13D';
import Settings from '../../components/tools/SettingsT13D';
import Parameters from '../../components/tools/Parameters';
import {changeParameter, calculate, reset } from '../../actions/T13D';
import Header from '../../components/tools/Header';
import Navbar from '../Navbar';
import Icon from '../../components/primitive/Icon';

@connect(( store ) => {
    return { tool: store.T13D };
})
export default class T13D extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/t13-travel-time-through-unconfined-aquifer/',
            icon: <Icon name="file"/>
        }]
    };

    handleChange = ( e ) => {
        if (e.target.name.startsWith( 'parameter' )) {
            const param = e.target.name.split( '_' );

            const parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.props.dispatch(changeParameter( parameter ));
        }
    };

    handleReset = ( e ) => {
        this.props.dispatch(reset( ));
    };

    componentWillMount( ) {
        this.props.dispatch(calculate( ));
    }

    render( ) {
        const { navigation } = this.state;
        return (
            <div className="app-width">
                <Navbar links={navigation}/>
                <Header title={'T13_D. Travel time // Aquifer system with two fixed head boundary conditions'}/>

                <div className="grid-container">
                    <section className="tile col col-abs-2">
                        <Info data={this.props.tool.info}/>
                        <Settings data={this.props.tool.info} handleChange={this.handleChange}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Parameters parameters={this.props.tool.parameters} handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                </div>
            </div>
        );
    }
}
