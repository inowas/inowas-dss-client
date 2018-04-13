import PropTypes from 'prop-types';
import React from 'react';
import {Form, Grid, Header, Popup, Radio, Segment, Table} from 'semantic-ui-react';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import {GeoJSON, Map, TileLayer} from 'react-leaflet';
import md5 from 'js-md5';
import {Formatter, LayoutComponents} from '../../../core';
import Input from '../../../components/primitive/Input';
import {dateToAtomFormat, dateToDateIgnoreTimeZones} from '../../formatter';
import {addDays} from '../../helpers';
import {importBoundariesFromCsv} from "../CsvImporter";

class CsvBoundariesImport extends React.Component {
    render() {
        const boundaries = importBoundariesFromCsv(this.props.csv);
        return (
            <Grid>
                <Grid.Column width={4}/>
                <Grid.Column width={12}>
                    <Segment color={'grey'}>
                        <Table size="small" />
                </Segment>
            </Grid.Column>
            </Grid>
        );
    }
}

CsvBoundariesImport.propTypes = {
    csv: PropTypes.string.isRequired
};

export default CsvBoundariesImport;
