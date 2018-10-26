import React from 'react';

import '../../less/4TileTool.less';
import styleGlobals from 'styleGlobals';
import image from '../images/T01.png';

import {Background, Chart, Parameters, Info} from '../components';

import Icon from '../../components/primitive/Icon';
import Navbar from '../../containers/Navbar';

import PapaParse from 'papaparse';
import csvFile from '../data/2018-10-25-mar-in-scales.csv';

const styles = {
    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10
    }
};

const navigation = [{
    name: 'Documentation',
    path: 'https://inowas.hydro.tu-dresden.de/',
    icon: <Icon name="file"/>
}];

class T01 extends React.Component {

    constructor() {
        super();
        this.state = {data: this.loadCsvFile()};
    }

    loadCsvFile = () => {
        const parsedFile = PapaParse.parse(csvFile, {header: true, dynamicTyping: true, skipEmptyLines: true});
        return parsedFile.data.map((row, key) => {
            row.x = row.x.split(';').map(v => parseInt(v, 10));
            row.y = row.y.split(';').map(v => parseFloat(v, 10));
            key < 3 ? row.selected = true : row.selected = false;
            return row;
        });
    };

    toggleSelect = (name) => {
        const data = this.state.data.map(row => {
            if (row.name === name) {
                row.selected = !row.selected;
            }

            return row;
        });

        return this.setState({data: data});
    };

    handleReset = () => {
        this.setState({data: this.loadCsvFile()});
    };

    render() {
        const {data} = this.state;
        return (
            <div className="app-width">
                <Navbar links={navigation}/>
                <h3 style={styles.heading}>T01. SAT basin infiltration capacity reduction database</h3>
                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked">
                        <Background image={image}/>
                    </section>
                    <section className="tile col col-abs-3 stretch">
                        <Chart data={data}/>
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-2">
                        <Info data={data}/>
                    </section>
                    <section className="tile col col-abs-3 stretch">
                        <Parameters
                            data={data}
                            toggleSelect={this.toggleSelect}
                            handleReset={this.handleReset}
                        />
                    </section>
                </div>
            </div>
        );
    }
}

export default T01;
