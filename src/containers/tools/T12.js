import React from 'react';
import { connect } from 'react-redux';

import '../../less/4TileTool.less';

import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT12';
import MFI from '../../components/tools/T12_MFI';
import Parameters from '../../components/tools/Parameters_T12';
import {changeMFI, changeParameter, changeCorrections, calculate, reset, useDataInGraph} from '../../actions/T12'
import Header from '../../components/tools/Header';
import Navbar from '../Navbar';
import Icon from '../../components/primitive/Icon';
import Info from '../../components/tools/InfoT12';

@connect(( store ) => {
    return { tool: store.T12 };
})
export default class T12 extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/t12-Clogging-estimation-by-MFI-Index/',
            icon: <Icon name="file"/>
        }]
    };

    handleChange = ( e ) => {
        const param = e.target.name.split( '_' );

        const parameter = {};
        parameter.id = param[1];
        parameter[param[2]] = Number(e.target.value);
        if (e.target.name.startsWith( 'parameter' )) {
            this.props.dispatch(changeParameter( parameter ));
        }
        if (e.target.name.startsWith('mfi')) {
            this.props.dispatch(changeMFI(parameter));
        }
        if (e.target.name.startsWith('use')) {
            this.props.dispatch(useDataInGraph(parameter));
        }
        if (e.target.name.startsWith('corr')) {
            const param = e.target.name.split(' ');
            this.props.dispatch(changeCorrections({
                name: param[1],
                value: e.target.value
            }))
        }
    };

    handleReset = ( e ) => {
        this.props.dispatch(reset( ));
    };

    componentWillMount( ) {
        this.props.dispatch(calculate( ));
    }
    render() {
        const styleheader = {
            color: '#1EB1ED'
        };

        return (
            <div className="app-width">
                <Navbar links={[ ]}/>
                <Header title={'T12. Clogging estimation by MFI-Index'}/>
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
                    <section className="tile col col-rel-1">
                        <h2>MFI</h2>
                        <MFI data={this.props.tool.mfi} corrections={this.props.tool.corrections} info={this.props.tool.info}
                             handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                    <section className="tile col col-hydro">
                        <Parameters data={this.props.tool.parameters} handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                </div>
            </div>
        );
    }
}