import React from 'react';
import { connect } from 'react-redux';

import '../../less/4TileTool.less';

import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT14C';
import Parameters from '../../components/tools/Parameters';
import { changeParameter, calculate, reset } from '../../actions/T14C';
import Header from '../../components/tools/Header';
import Navbar from '../Navbar';
import Icon from '../../components/primitive/Icon';

@connect(( store ) => {
    return { tool: store.T14C };
})
export default class T14C extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/t14-pumping-induced-river-drawdown/',
            icon: <Icon name="file"/>
        }]
    }

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
                <Header title={'T14_c. Partially penetrating stream with streambed resistance (Hunt, 1999)'}/>
                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked">
                        <Background image={this.props.tool.background.image}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Chart data={this.props.tool.chart.data} info={this.props.tool.info} options={this.props.tool.chart.options}/>
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-2" />

                    <section className="tile col col-abs-3 stretch">
                        <Parameters parameters={this.props.tool.parameters} handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                </div>
            </div>
        );
    }
}
