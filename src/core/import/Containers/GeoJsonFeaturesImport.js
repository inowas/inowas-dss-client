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

const importConfiguration = {
    area: {
        expectedGeometry: ['LineString', 'Polygon'],
    },
    boundary: {
        chd: {
            values: ['sHead', 'eHead'],
            startDateTime: new Date('2010-01-01'),
            expectedGeometry: ['LineString'],
            nameProperty: 'default',
            totalTimesProperty: 'default',
            sHeadProperty: 'default',
            eHeadProperty: 'default',
        },
        ghb: {
            values: ['stage', 'cond'],
            startDateTime: new Date('2010-01-01'),
            expectedGeometry: ['LineString'],
            nameProperty: 'default',
            totalTimesProperty: 'default',
            stageProperty: 'default',
            condProperty: 'default',
        },
        rch: {
            values: ['rechargeRate'],
            startDateTime: new Date('2010-01-01'),
            expectedGeometry: ['LineString, Polygon'],
            nameProperty: 'default',
            totalTimesProperty: 'default',
            rechargeRateProperty: 'default',
        },
        riv: {
            values: ['stage', 'rbot', 'cond'],
            startDateTime: new Date('2010-01-01'),
            expectedGeometry: ['LineString'],
            nameProperty: 'default',
            totalTimesProperty: 'default',
            stageProperty: 'default',
            rbotProperty: 'default',
            condProperty: 'default',
        },
        wel: {
            values: ['pumpingRate'],
            startDateTime: new Date('2010-01-01'),
            expectedGeometry: ['Point'],
            nameProperty: 'default',
            totalTimesProperty: 'default',
            pumpingRateProperty: 'default',
        }
    }
};

class GeoJsonFeaturesImport extends React.Component {
    constructor(props) {
        super(props);
        const configuration = props.type === 'area' ?
            importConfiguration[props.type] :
            importConfiguration[props.type][props.boundaryType];
        this.state = {configuration};
    }

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    propertyOptions = (geoJson, unique = false) => {
        let feature = null;
        if (geoJson.type === 'FeatureCollection' && Array.isArray(geoJson.features) && geoJson.features.length > 0) {
            feature = geoJson.features[0];
        }

        if (geoJson.type === 'Feature') {
            feature = geoJson;
        }

        const options = [{key: 'default', value: 'default', text: 'Default'}];

        if (!feature) {
            return options;
        }

        const {properties} = feature;

        let propertyKeys = Object.keys(properties);

        if (unique) {
            propertyKeys = propertyKeys
                .map(p => p.replace(/[0-9]/g, ''))
                .filter((item, pos, self) => (self.indexOf(item) === pos));
        }

        propertyKeys.forEach(k => {
            options.push({key: k, value: k, text: k});
        });

        return options;
    };

    handleChangeProperty = property => {
        return (e, {value}) => {
            this.setState({
                ...this.state,
                configuration: {
                    ...this.state.configuration,
                    [property]: value
                }
            });
        };
    };

    handleChangeDateTime = value => {
        this.setState({
            ...this.state,
            configuration: {
                ...this.state.configuration,
                startDateTime: dateToDateIgnoreTimeZones(value)
            }
        });
    };

    renderProperties = (type, boundaryType, geoJson) => {
        const {configuration} = this.state;
        const properties = [];

        if (configuration.hasOwnProperty('nameProperty')) {
            properties.push(
                <Form.Dropdown
                    key={'nameProperty'}
                    label={'Choose property for name:'}
                    fluid
                    selection
                    closeOnChange
                    options={this.propertyOptions(geoJson, false)}
                    onChange={this.handleChangeProperty('nameProperty')}
                    value={configuration.nameProperty}
                />
            );
        }

        if (configuration.hasOwnProperty('values')) {
            properties.push(
                <LayoutComponents.InputGroup
                    key={'dateTimeValues'}
                    label={'Set start-dateTime:'}
                >
                    <Input
                        name="dateTime"
                        type="date"
                        value={Formatter.dateToYmd(configuration.startDateTime)}
                        onChange={this.handleChangeDateTime}
                    />
                </LayoutComponents.InputGroup>
            );

            properties.push(
                <Form.Dropdown
                    key={'totalTimesProperty'}
                    label={'Set totalTimesProperty:'}
                    fluid
                    selection
                    closeOnChange
                    options={this.propertyOptions(geoJson, true)}
                    onChange={this.handleChangeProperty('totalTimesProperty')}
                    value={configuration.totalTimesProperty}
                />
            );

            configuration.values.forEach(e => {
                properties.push(
                    <Form.Dropdown
                        key={e + 'Property'}
                        label={'Set ' + e + ':'}
                        fluid
                        selection
                        closeOnChange
                        options={this.propertyOptions(geoJson, true)}
                        onChange={this.handleChangeProperty(e + 'Property')}
                        value={configuration[e + 'Property']}
                    />
                );
            });
        }

        return (
            <Segment color={'blue'}>
                <Header as={'h3'}>Import properties</Header>
                <Form>
                    {properties}
                </Form>
            </Segment>
        );
    };

    calculateDateTimeValues = (feature) => {
        const {configuration} = this.state;

        const {properties} = feature;
        const {values} = configuration;
        let canNotBeCalculated = false;

        // get TotalTimes
        if (configuration.totalTimesProperty === 'default') {
            return null;
        }

        const dateTimeValues = [];
        for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
                if (key.startsWith(configuration.totalTimesProperty)) {
                    dateTimeValues.push({
                        property: key,
                        base: configuration.totalTimesProperty,
                        number: Number(key.replace(configuration.totalTimesProperty, '')),
                        totalTime: properties[key],
                        dateTime: dateToAtomFormat(dateToDateIgnoreTimeZones(addDays(properties[key])(dateToDateIgnoreTimeZones(this.state.configuration.startDateTime)))),
                        values: []
                    });
                }
            }
        }

        values.forEach(v => {
            if (configuration[v + 'Property'] === 'default') {
                canNotBeCalculated = true;
            }

            const propertyBaseName = configuration[v + 'Property'];

            for (const key in properties) {
                if (properties.hasOwnProperty(key)) {
                    if (key.startsWith(propertyBaseName)) {
                        const number = Number(key.replace(propertyBaseName, ''));
                        dateTimeValues.forEach( (dtv, index) => {
                            if (dtv.number === number) {
                                dateTimeValues[index].values.push(Number(properties[key]));
                            }
                        });
                    }
                }
            }
        });

        if (canNotBeCalculated) {
            // return null;
        }



        return JSON.stringify(dateTimeValues);
    };

    renderTableHeader = (type) => {
        let cells = [];
        if (type === 'area') {
            cells = ['#', 'Geometry', 'Map', 'Selected'];
        }

        if (type === 'boundary') {
            cells = ['#', 'Name', 'Geometry', 'Map', 'Properties', 'Selected'];
        }

        cells = cells.map((c, key) => (
            <Table.HeaderCell key={key}>{c}</Table.HeaderCell>
        ));

        return (
            <Table.Header>
                <Table.Row>
                    {cells}
                </Table.Row>
            </Table.Header>
        );
    };

    getFeatures = geoJson => {
        if (geoJson.type && geoJson.type === 'FeatureCollection') {
            return geoJson.features;
        }

        if (geoJson.type && geoJson.type === 'Feature') {
            return [geoJson];
        }

        return [];
    };

    renderRow = (type, key, feature) => {
        const {configuration} = this.state;
        return (
            <Table.Row key={key}>
                <Table.Cell>{key + 1}</Table.Cell>
                <Table.Cell>
                    {configuration.nameProperty === 'default' ? this.props.boundaryType + ' ' + key + 1 : feature.properties[configuration.nameProperty]}
                </Table.Cell>
                <Table.Cell>{feature.geometry.type}</Table.Cell>
                <Table.Cell>
                    <Popup
                        trigger={<span><u>show</u></span>}
                        content={
                            <Map
                                className="boundaryMap"
                                style={{height: 300, width: 300}}
                                zoomControl={false}
                                bounds={this.getBounds(feature)}
                            >
                                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                                <GeoJSON
                                    data={feature}
                                    key={this.generateKeyFunction(feature)}
                                />
                            </Map>
                        }
                        basic
                    />
                </Table.Cell>
                <Table.Cell>
                    <Popup
                        trigger={<span><u>raw</u></span>}
                        content={JSON.stringify(feature.properties)}
                        basic
                    />
                    &nbsp;|&nbsp;
                    <Popup
                        trigger={<span><u>values</u></span>}
                        content={this.calculateDateTimeValues(feature)}
                        basic
                    />
                </Table.Cell>
                <Table.Cell>
                    {(feature.geometry.type === 'LineString' || feature.geometry.type === 'Polygon') &&
                    <Radio
                        fitted
                        checked={this.state.selectedFeature === key}
                        onChange={() => this.handleChangeSelectedFeature(key)}
                    />
                    }
                </Table.Cell>
            </Table.Row>
        );
    };

    renderElements = (type, boundaryType, geoJson) => {
        const features = this.getFeatures(geoJson);
        const rows = features.map((f, key) => this.renderRow(type, key, f));

        return (
            <Table.Body>
                {rows}
            </Table.Body>
        );
    };

    render() {
        const {geoJson, boundaryType, type} = this.props;
        return (
            <Grid>
                <Grid.Column width={4}>
                    {this.renderProperties(type, boundaryType, geoJson)}
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment color={'grey'}>
                        <Table size="small">
                            {this.renderTableHeader(type, boundaryType)}
                            {this.renderElements(type, boundaryType, geoJson)}
                        </Table>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

GeoJsonFeaturesImport.propTypes = {
    boundaryType: PropTypes.string,
    geoJson: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};

export default GeoJsonFeaturesImport;
