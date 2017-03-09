import React from 'react'
import {connect} from 'react-redux';

import '../../../less/4TileTool.less';

import Background from '../../components/tools/Background'
import Chart from '../../components/tools/ChartT16A'
import Sieves from '../../components/tools/Sieves'
import HydroData from '../../components/tools/HydroData'
import {changeSieve, changeParameter, calculate, reset} from '../../actions/T16A'
import Header from '../../components/tools/Header';

@connect((store) => {
    return {tool: store.T16A}
})
export default class T16A extends React.Component {

    handleChange = (e) => {

        if (e.target.name.startsWith('parameter')) {
            const param = e.target.name.split('_');

            let parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.props.dispatch(changeParameter(parameter))
        }
        if (e.target.name.startsWith('sieve')) {
            const param = e.target.name.split('_');

            let parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.props.dispatch(changeSieve(parameter))
        }
    };

    handleReset = (e) => {
        this.props.dispatch(reset());
    };

    componentWillMount() {
        this.props.dispatch(calculate())
    }

    total(param) {
//        console.log(param.time);
/*
        console.log(this.props.tool.info.total);
        const time=param.time.split(':');
        const totaltime= this.props.tool.info.total.split(':');
        totaltime[0] = Number(totaltime[0])+Number(time[0]);
        totaltime[1] = Number(totaltime[1])+Number(time[1]);
        totaltime[2] = Number(totaltime[2])+Number(time[2]);
        this.props.tool.info.total = totaltime[0]+":"+totaltime[1]+":"+totaltime[2];
*/
        //console.log(total)
    }

    render() {
        const styleheader = {
            color: '#1EB1ED'
        };

        const params = this.props.tool.hydroData.map(param => {
            return this.total(param);
        });

        return (
            <div className="app-width">
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
                    </section>

                    <section className="tile col col-rel-1">
                        <h2>SIEVING</h2>
                        <h3>After wet separation</h3>
                        <h3 style={styleheader}>Select sieves</h3>
                        <Sieves data={this.props.tool.sieves} info={this.props.tool.info} handleChange={this.handleChange} handleReset={this.handleReset}/>
                        <h3>{params}</h3>

                    </section>
                    <section className="tile col col-rel-2">
                        <h2>Sedimentation</h2>
                        <h3>Fine particles after wet separation</h3>
                        <h3 style={styleheader}>Hydrometer Characterstics</h3>
                        <HydroData data={this.props.tool.hydroData} info={this.props.tool.info} handleChange={this.handleChange} />
                    </section>
                </div>
            </div>
        )
    }
}
