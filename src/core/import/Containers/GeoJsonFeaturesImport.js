import PropTypes from 'prop-types';
import React from 'react';
import {Form, Grid, Header, Popup, Radio, Segment, Table} from 'semantic-ui-react';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import {GeoJSON, Map, TileLayer} from 'react-leaflet';
import md5 from 'js-md5';
import {Formatter, LayoutComponents} from '../../../core';
import Input from '../../../components/primitive/Input';
import {toDate} from '../../formatter';

const availableTypes = ['area', 'boundary'];
const availableBoundaryTypes = ['chd', 'ghb', 'rch', 'riv', 'wel'];
const expectedGeometry = {
    area: ['LineString', 'Polygon'],
    boundary: {
        chd: ['LineString'],
        ghb: ['LineString'],
        rch: ['LineString', 'Polygon'],
        riv: ['LineString'],
        wel: ['Point']
    }
};

const availableProperties = [
    {
        key: 'name',
        label: 'Select name property:',
        uniqueOption: false,
        default: 'default'
    },
    {
        key: 'totalTime',
        label: 'Select time property:',
        uniqueOption: true,
        default: 'default'
    },
    {
        key: 'sHead',
        label: 'Select sHead property:',
        uniqueOption: true,
        default: 'default'
    },
    {
        key: 'eHead',
        label: 'Select eHead property:',
        uniqueOption: true,
        default: 'default'
    },
    {
        key: 'stage',
        label: 'Select stage property:',
        uniqueOption: true,
        default: 'default'
    },
    {
        key: 'cond',
        label: 'Select conductivity property:',
        uniqueOption: true,
        default: 'default'
    },
    {
        key: 'rechargeRate',
        label: 'Select recharge rate property:',
        uniqueOption: true,
        default: 'default'
    },
    {
        key: 'rbot',
        label: 'Select river bottom property:',
        uniqueOption: true,
        default: 'default'
    },
    {
        key: 'pumpingRate',
        label: 'Select pumping rate property:',
        uniqueOption: true,
        default: 'default'
    },
    {
        key: 'startDateTime',
        label: 'Select start dateTime:',
        uniqueOption: false,
        dateTime: true,
        default: new Date('2010-01-01')
    },
];

const importPropertyConfiguration = {
    area: [],
    boundary: {
        chd: ['name', 'totalTime', 'startDateTime', 'sHead', 'eHead'],
        ghb: ['name', 'totalTime', 'startDateTime', 'stage', 'cond'],
        rch: ['name', 'totalTime', 'startDateTime', 'rechargeRate'],
        riv: ['name', 'totalTime', 'startDateTime', 'stage', 'rbot', 'cond'],
        wel: ['name', 'totalTime', 'startDateTime', 'pumpingRate']
    }
};

class GeoJsonFeaturesImport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        availableProperties.map(p => {
            this.setState({[p.key]: p.default});
        });
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
                [property]: value
            });
        };
    };

    handleChangeDateTime = value => {
        this.setState({
            startDateTime: toDate(value)
        });
    };

    renderProperties = (type, boundaryType, geoJson) => {
        let propertyConfiguration;
        if (type === 'area') {
            propertyConfiguration = importPropertyConfiguration[type];
        }

        if (type === 'boundary') {
            propertyConfiguration = importPropertyConfiguration[type][boundaryType];
        }

        const properties = propertyConfiguration.map(pc => {
            const property = availableProperties.find(p => p.key === pc);
            if (property.dateTime) {
                return (
                    <LayoutComponents.InputGroup
                        key={property.key}
                        label={property.label}
                    >
                        <Input
                            name="dateTime"
                            type="date"
                            value={Formatter.dateToYmd(this.state.startDateTime)}
                            onChange={this.handleChangeDateTime}
                        />
                    </LayoutComponents.InputGroup>
                );
            }

            return (
                <Form.Dropdown
                    key={property.key}
                    label={property.label}
                    fluid
                    selection
                    closeOnChange
                    options={this.propertyOptions(geoJson, property.uniqueOption)}
                    onChange={this.handleChangeProperty(property.key)}
                    value={this.state[property.key]}
                />
            );
        });

        return (
            <Segment color={'blue'}>
                <Header as={'h3'}>Import properties</Header>
                <Form>
                    {properties}
                </Form>
            </Segment>
        )
            ;
    };

    calculateDateTimeValues = (type, boundaryType, feature) => {
        let propertyConfiguration;
        if (type === 'area') {
            return false;
        }

        if (type === 'boundary') {
            propertyConfiguration = importPropertyConfiguration[type][boundaryType];
        }

        let canBeCalculated = true;
        const properties = [];
        propertyConfiguration.forEach(pc => {
            const property = availableProperties.find(p => p.key === pc);
            canBeCalculated = canBeCalculated && properties.canBeCalculated();
            properties.push(property);
        });

        if (!canBeCalculated) {
            return false;
        }

        // Start with times
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
        return (
            <Table.Row key={key}>
                <Table.Cell>{key + 1}</Table.Cell>
                <Table.Cell>
                    {this.state.name === 'default' ? this.props.boundaryType + ' ' + key + 1 : feature.properties[this.state.name]}
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
                        content={JSON.stringify(feature.properties)}
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
