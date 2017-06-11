import React from 'react';
import { connect } from 'react-redux';

import '../../less/4TileTool.less';

import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT16';
import Sieves from '../../components/tools/T16_Sieves';
import HydroData from '../../components/tools/T16_HydroData';
import {enterSieve, changeStandard, changeHydroData, changeSieve,
    changeParameter, calculate, reset, changeParWet} from '../../actions/T16'
import Header from '../../components/tools/Header';
import Navbar from '../Navbar';
import Icon from '../../components/primitive/Icon';
import Info from '../../components/tools/InfoT16';

@connect(( store ) => {
    return { tool: store.T16 };
})
export default class T16A extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/t16-calculation-of-hydraulic-conductivity/',
            icon: <Icon name="file"/>
        }]
    }


    handleChange = ( e ) => {
        const param = e.target.name.split( '_' );

        const parameter = {};
        parameter.id = param[1];
        parameter[param[2]] = e.target.value;
        if (e.target.name.startsWith( 'parameter' )) {
            this.props.dispatch(changeParameter( parameter ));
        }
        if (e.target.name.startsWith('sieve')) {
            this.props.dispatch(changeSieve(parameter));
        }
        if (e.target.name.startsWith('hydroData')) {
            this.props.dispatch(changeHydroData(parameter));
        }
        if (e.target.value.startsWith('standard')) {
            this.props.dispatch(changeStandard({name: e.target.value}));
        }
        if (e.target.name.startsWith('selectSieve')) {
            const param = e.target.name.split(' ');
            this.props.dispatch(enterSieve({
                id: param[3],
                name: param[1]+' '+param[2],
                selected: e.target.checked
            }))
        }
        if (e.target.name.startsWith('customSieve')) {
            this.props.dispatch(enterSieve({
                id: 'Custom',
                value: e.target.value,
            }))
        }
        if (e.target.name.startsWith('submitSieve')) {
            this.props.dispatch(enterSieve({
                id: 'Custom'
            }))
        }
        if (e.target.name.startsWith('parWet')) {
            const param = e.target.name.split(' ');
            this.props.dispatch(changeParWet({
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
                <Header title={'T16_a. Saturated hydraulic conductivity based on grain size distribution'}/>
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
                        <h2>SIEVING</h2>
                        <h3>After wet separation</h3>
                        <Sieves data={this.props.tool.sieves} info={this.props.tool.info}
                                dSampSieve={this.props.tool.dSampSieve} DIN={this.props.tool.DIN}
                                ASTM={this.props.tool.ASTM} Custom={this.props.tool.Custom}
                                handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                    <section className="tile col col-hydro">
                        <h2>Sedimentation</h2>
                        <h3>Fine particles after wet separation</h3>
                        <HydroData data={this.props.tool.hydroData} info={this.props.tool.info}
                                   parWet={this.props.tool.parametersWet} handleChange={this.handleChange} />
                    </section>
                </div>
            </div>
        );
    }
}
