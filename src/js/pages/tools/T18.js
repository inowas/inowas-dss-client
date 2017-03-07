import React from 'react';
import { connect } from 'react-redux';

import '../../../less/4TileTool.less';

import Background from '../../components/tools/Background';
import Chart from '../../components/tools/ChartT18';
import Info from '../../components/tools/InfoT18';
import Parameters from '../../components/tools/Parameters';
import { changeParameter, calculate, reset } from '../../actions/T18';
import Navbar from '../Navbar';

import Header from '../../components/tools/Header';

@connect(( store ) => {
    return { tool: store.T18 };
})
export default class T18 extends React.Component {

    handleChange = ( e ) => {
        if (e.target.name.startsWith( 'parameter' )) {
            const param = e.target.name.split( '_' );

            const parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.props.dispatch(changeParameter( parameter ));
        }
    };

    handleReset = ( ) => {
        this.props.dispatch(reset( ));
    };

    componentWillMount( ) {
        this.props.dispatch(calculate( ));
    }

    render( ) {
        return (
            <div className="app-width">
                <Navbar links={[ ]}/>
                <Header title={'T18. SAT basin design'}/>
                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked" />

                    <section className="tile col col-abs-3 stretch">
                        <Chart data={this.props.tool.chart.data} info={this.props.tool.info} options={this.props.tool.chart.options}/>
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-2">
                        <Info info={this.props.tool.info}/>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <Parameters data={this.props.tool.parameters} handleChange={this.handleChange} handleReset={this.handleReset}/>
                    </section>
                </div>
            </div>
        );
    }
}
