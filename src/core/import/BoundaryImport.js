import React from 'react';
import {GeoJSON, Map, TileLayer} from 'react-leaflet';
import PropTypes from 'prop-types';
import {
    Button, Dropdown, Form, Grid, Icon, Input, Label, Menu, Modal, Popup, Radio, Segment, Table, TextArea
} from 'semantic-ui-react';
import Ajv from 'ajv';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import md5 from 'js-md5';
import {projectGeoJson} from '../geospatial/proj4';

const style = {
    textArea: {
        valid: {},
        invalid: {
            border: '1px solid red'
        }
    },
    fileUpload: {
        backgroundColor: 'transparent',
        padding: 0
    }
};

class BoundaryImport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemPrimary: 'Geojson',
            activeItemSecondary: 'text',
            geoJson: '',
            geoJsonValid: null,
            fileValid: null,
            selectedFeature: null,
            selectedBoundaryType: 'wel',
            selectedNameProperty: 'default'
        };
    }

    handleItemPrimaryClick = (e, {name}) => this.setState({activeItemPrimary: name});

    handleItemSecondaryClick = (e, {name}) => this.setState({activeItemSecondary: name});

    onChangeTextInput = (e) => {
        if (e.target.name === 'geoJson') {
            this.setState({
                [e.target.name]: this.makeJsonPretty(e.target.value),
                geoJsonValid: this.validateGeoJson(e.target.value)
            });

            return;
        }

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    isJsonValid = (json) => {
        try {
            JSON.parse(json);
        } catch (e) {
            return false;
        }
        return true;
    };

    validateGeoJson = (geoJson) => {
        if (!this.isJsonValid(geoJson)) {
            return false;
        }

        const ajv = new Ajv({schemaId: 'id'});
        ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
        const validate = ajv.compile(require('schema/geojson.json'));
        return validate(JSON.parse(geoJson));
    };

    makeJsonPretty = (geoJson) => {
        if (!this.isJsonValid(geoJson)) {
            return geoJson;
        }

        return JSON.stringify(JSON.parse(geoJson), null, 2);
    };

    handleFile = (e) => {
        const fileContent = e.srcElement.result;
        this.setState({
            geoJson: this.isJsonValid(fileContent) ? this.makeJsonPretty(fileContent) : 'Invalid file content.',
            geoJsonValid: this.validateGeoJson(fileContent)
        });
    };

    handleFileUpload = e => {
        const files = e.target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = this.handleFile;
        reader.readAsText(file);
    };

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    importAreaByKey = (geoJson, key) => {
        if (geoJson.type === 'FeatureCollection') {
            this.importArea(geoJson.features[key]);
            this.props.onClose();
        }

        if (geoJson.type === 'Feature') {
            this.importArea(geoJson);
            this.props.onClose();
        }
    };

    importArea = feature => {
        const {geometry} = feature;
        if (geometry.type === 'LineString') {
            this.props.onChange({
                ...feature,
                geometry: {
                    type: 'Polygon',
                    coordinates: [geometry.coordinates]
                }
            });
        }

        if (geometry.type === 'Polygon') {
            this.props.onChange(feature);
        }
    };

    handleChangeSelectedFeature = selectedFeature => {
        this.setState({selectedFeature});
    };

    handleChangeSelectedBoundaryType = (e, {value}) => {
        this.setState({selectedBoundaryType: value});
    };

    handleChangeSelectedNameProperty = (e, {value}) => {
        this.setState({selectedNameProperty: value});
    };

    boundaryOptions = () => (
        [
            {key: 'chd', value: 'chd', text: 'Constant Head SingleOPBoundary'},
            {key: 'ghb', value: 'ghb', text: 'General Head SingleOPBoundary'},
            {key: 'rch', value: 'rch', text: 'Recharge SingleOPBoundary'},
            {key: 'riv', value: 'riv', text: 'River SingleOPBoundary'},
            {key: 'wel', value: 'wel', text: 'Well SingleOPBoundary'}
        ]
    );

    uniquePropertyOptions = geoJson => {
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
        const uniquePropertyKeys = Object.keys(properties)
            .map(p => p.replace(/[0-9]/g, ''))
            .filter((item, pos, self) => (self.indexOf(item) === pos));

        uniquePropertyKeys.forEach(k => {
            options.push({key: k, value: k, text: k});
        });

        return options;
    };

    renderRow = (feature, key) => (
        <Table.Row key={key}>
            <Table.Cell>{key + 1}</Table.Cell>
            <Table.Cell>
                {this.state.selectedNameProperty === 'default' ? this.state.selectedBoundaryType + ' ' + key + 1 : feature.properties[this.state.selectedNameProperty]}
            </Table.Cell>
            <Table.Cell>{this.state.selectedBoundaryType}</Table.Cell>
            <Table.Cell>
                <Popup
                    trigger={<span>{feature.geometry.type}</span>}
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
                    trigger={<span>Properties</span>}
                    content={JSON.stringify(feature.properties)}
                    basic
                />
            </Table.Cell>
            <Table.Cell>
                {(feature.geometry.type === 'LineString' || feature.geometry.type === 'Polygon') &&
                <Radio fitted checked={this.state.selectedFeature === key}
                       onChange={() => this.handleChangeSelectedFeature(key)}/>
                }
            </Table.Cell>
        </Table.Row>
    );

    renderRows = geoJson => {
        const rows = [];
        if (geoJson.type && geoJson.type === 'FeatureCollection') {
            geoJson.features.forEach((f, j) => {
                rows.push(this.renderRow(f, j));
            });
        }

        if (geoJson.type && geoJson.type === 'Feature') {
            rows.push(this.renderRow(geoJson, 0));
        }

        return rows;
    };

    render() {
        const {activeItemPrimary, activeItemSecondary, geoJson, geoJsonValid} = this.state;
        const {header, onClose} = this.props;
        const parsedGeoJson = geoJsonValid ? JSON.parse(geoJson) : null;
        const projectedGeoJson = parsedGeoJson ? projectGeoJson(parsedGeoJson) : null;

        return (
            <Modal
                open
                onClose={onClose}
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                dimmer={'inverted'}
                size={'large'}
            >
                <Modal.Header>{header}</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Column width={4}>
                            <Menu fluid vertical tabular>
                                <Menu.Item
                                    name={'Geojson'}
                                    active={activeItemPrimary === 'Geojson'}
                                    onClick={this.handleItemPrimaryClick}
                                />
                                {/*
                                <Menu.Item
                                    name={'Shapefile'}
                                    active={activeItemPrimary === 'Shapefile'}
                                    onClick={this.handleItemPrimaryClick}
                                />
                                */}
                            </Menu>
                        </Grid.Column>
                        <Grid.Column stretched width={12}>
                            {activeItemPrimary === 'Geojson' &&
                            <div>
                                <Menu pointing secondary>
                                    <Menu.Item
                                        name="text"
                                        active={activeItemSecondary === 'text'}
                                        onClick={this.handleItemSecondaryClick}
                                    >
                                        <Icon name="file text outline"/>
                                        Text
                                    </Menu.Item>

                                    {geoJsonValid &&
                                    <Menu.Item
                                        name="element"
                                        active={activeItemSecondary === 'element'}
                                        onClick={this.handleItemSecondaryClick}
                                    >
                                        <Icon name="file outline"/>
                                        Element
                                    </Menu.Item>
                                    }

                                    {geoJsonValid &&
                                    <Menu.Item
                                        name="map"
                                        active={activeItemSecondary === 'map'}
                                        onClick={this.handleItemSecondaryClick}
                                    >
                                        <Icon name="file outline"/>
                                        Map
                                    </Menu.Item>
                                    }
                                </Menu>
                                {activeItemSecondary === 'text' &&
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={10}>
                                            <Form>
                                                <TextArea
                                                    style={geoJsonValid ? style.textArea.valid : style.textArea.invalid}
                                                    name={'geoJson'}
                                                    onInput={this.onChangeTextInput}
                                                    placeholder="Paste geojson here or upload file"
                                                    rows={10}
                                                    value={geoJson}
                                                />
                                            </Form>
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            <Label>Upload file:</Label>
                                            <Input
                                                style={style.fileUpload}
                                                type="file"
                                                onChange={this.handleFileUpload}
                                            />
                                            <Label>Select boundary type</Label>
                                            <Dropdown
                                                fluid
                                                selection
                                                closeOnChange
                                                options={this.boundaryOptions()}
                                                value={this.state.selectedBoundaryType}
                                                onChange={this.handleChangeSelectedBoundaryType}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                }
                                {activeItemSecondary === 'element' && geoJsonValid &&
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={11}>
                                            <Table size="small">
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell>
                                                            #
                                                        </Table.HeaderCell>
                                                        <Table.HeaderCell>
                                                            Name
                                                        </Table.HeaderCell>
                                                        <Table.HeaderCell>
                                                            Type
                                                        </Table.HeaderCell>
                                                        <Table.HeaderCell>
                                                            Geometry
                                                        </Table.HeaderCell>
                                                        <Table.HeaderCell>
                                                            Properties
                                                        </Table.HeaderCell>
                                                        <Table.HeaderCell/>
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {this.renderRows(projectedGeoJson)}
                                                </Table.Body>
                                            </Table>
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            <Label>Select boundary type</Label>
                                            <Dropdown
                                                fluid
                                                selection
                                                closeOnChange
                                                options={this.boundaryOptions()}
                                                value={this.state.selectedBoundaryType}
                                                onChange={this.handleChangeSelectedBoundaryType}
                                            />

                                            <Label>Select property for name</Label>
                                            <Dropdown
                                                fluid
                                                selection
                                                closeOnChange
                                                options={this.uniquePropertyOptions(projectedGeoJson)}
                                                value={this.state.selectedNameProperty}
                                                onChange={this.handleChangeSelectedNameProperty}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                }
                                {activeItemSecondary === 'map' && geoJsonValid &&
                                <Map
                                    className="boundaryGeometryMap"
                                    ref={map => {
                                        this.map = map;
                                    }}
                                    zoomControl={false}
                                    bounds={this.getBounds(projectedGeoJson)}
                                >
                                    <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                                    <GeoJSON
                                        data={projectedGeoJson}
                                        key={this.generateKeyFunction(projectedGeoJson)}
                                    />
                                </Map>
                                }
                            </div>
                            }
                            {activeItemPrimary === 'Shapefile' &&
                            <Segment>
                                Shapefile
                            </Segment>
                            }
                        </Grid.Column>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.onClose}>Cancel</Button>
                    <Button
                        positive
                        onClick={() => this.importAreaByKey(projectedGeoJson, this.state.selectedFeature)}
                        disabled={this.state.selectedFeature === null}
                    >
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

BoundaryImport.propTypes = {
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default BoundaryImport;
