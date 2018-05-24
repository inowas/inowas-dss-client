import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import PapaParse from 'papaparse';
import styleGlobals from 'styleGlobals';
import csvFile from '../data/database-2018-01-05.csv';
import '../../less/4TileTool.less';
import '../styles/pivottable.less';

import Icon from '../../components/primitive/Icon';
import Navbar from '../../containers/Navbar';

const styles = {
    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10
    },
    table: {
        backgroundColor: styleGlobals.colors.background,
        padding: 20,
        overflowY: 'scroll'
    }
};

const navigation = [{
    name: 'Documentation',
    path: 'https://inowas..hydro.tu-dresden.de/t04a-database/',
    icon: <Icon name="file"/>
}];


class T04 extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    loadCsvFile = () => {
        const parsedFile = PapaParse.parse(csvFile);
        return parsedFile.data;
    };

    render() {
        return (
            <div className="app-width">
                <Navbar links={navigation}/>
                <h3 style={styles.heading}>
                    T04. Database for GIS Based Site Suitability Mapping
                </h3>
                <div style={styles.table}>
                    <PivotTableUI data={this.loadCsvFile()} onChange={s => this.setState(s)} {...this.state} />
                </div>
            </div>
        );
    }
}

export default T04;
