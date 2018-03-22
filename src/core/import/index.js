import PropTypes from 'prop-types';
import React from 'react';
import {Button, Form, Grid, Icon, Input, Menu, Modal, Segment, TextArea} from 'semantic-ui-react';
import Ajv from 'ajv';
import {GeoJSON, Map, TileLayer} from 'react-leaflet';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import md5 from 'js-md5';

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

class ImportGeoJsonModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemPrimary: 'Geojson',
            activeItemSecondary: 'text',
            geoJson: '',
            geoJsonValid: null,
            fileValid: null
        };
    }

    handleItemPrimaryClick = (e, {name}) => this.setState({activeItemPrimary: name});

    handleItemSecondaryClick = (e, {name}) => this.setState({activeItemSecondary: name});

    onChange = (e) => {
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
        const result = e.srcElement.result;
        this.setState({
            geoJson: this.isJsonValid(result) ? this.makeJsonPretty(result) : 'Invalid file content.',
            geoJsonValid: this.validateGeoJson(result)
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

    render() {
        const {activeItemPrimary, activeItemSecondary, geoJson, geoJsonValid} = this.state;
        const {header, onClose} = this.props;
        const parsedGeoJson = geoJsonValid ? JSON.parse(geoJson) : null;
        return (
            <Modal
                open
                onClose={onClose}
                closeOnDimmerClick
                closeOnDocumentClick
                closeIcon
                dimmer={'inverted'}
                size={'small'}
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
                                <Menu.Item
                                    name={'Shapefile'}
                                    active={activeItemPrimary === 'Shapefile'}
                                    onClick={this.handleItemPrimaryClick}
                                />
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
                                <Form>
                                    <Input style={style.fileUpload} type="file" onChange={this.handleFileUpload}/>
                                    <TextArea
                                        style={geoJsonValid ? style.textArea.valid : style.textArea.invalid}
                                        name={'geoJson'}
                                        onInput={this.onChange}
                                        placeholder="Paste geojson here or upload file"
                                        rows={10}
                                        value={geoJson}
                                    />
                                </Form>
                                }
                                {activeItemSecondary === 'element' && geoJsonValid &&
                                <div>
                                    <p>
                                        Type: {parsedGeoJson.type}
                                    </p>
                                    <p>
                                        Geometry: <br/>
                                        Type: {parsedGeoJson.geometry.type} <br/>
                                        Coordinates: {parsedGeoJson.geometry.coordinates}
                                    </p>
                                </div>
                                }
                                {activeItemSecondary === 'map' && geoJsonValid &&
                                <Map
                                    className="boundaryGeometryMap"
                                    ref={map => {this.map = map;}}
                                    zoomControl={false}
                                    bounds={this.getBounds(parsedGeoJson.geometry)}
                                >
                                    <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                                    <GeoJSON
                                        data={parsedGeoJson.geometry}
                                        key={this.generateKeyFunction(parsedGeoJson.geometry)}
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
                    <Button negative>Cancel</Button>
                    <Button positive>Save</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

ImportGeoJsonModal.propTypes = {
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ImportGeoJsonModal;
