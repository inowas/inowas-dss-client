import React from 'react';
import {GeoJSON, Map, TileLayer} from 'react-leaflet';
import PropTypes from 'prop-types';
import {Button, Grid, Menu, Modal, Popup, Radio, Segment, Table, TextArea} from 'semantic-ui-react';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import md5 from 'js-md5';
import {projectGeoJson} from '../geospatial/proj4';
import DropZone from './Containers/FileDropZone';
import {prettifyJson} from './Helpers';
import GeoJsonFeaturesImport from './Containers/GeoJsonFeaturesImport';
import {importBoundariesFromCsv} from './CsvImporter';
import CsvBoundariesImport from "./Containers/CsvBoundariesImport";

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
    },
    primaryMenu: {
        disabled: {
            color: 'grey'
        }
    }
};

class GenericImport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemPrimary: this.primaryMenuItems()[0].name,
            activeItemSecondary: 'text',
            content: null,
            contentType: null,
            contentValid: null,
            contentValidationErrors: null,
            selectedFeature: null,
            selectedBoundaryType: 'wel',
            selectedNameProperty: 'default'
        };
    }

    // Primary menu
    primaryMenuItems = () => {
        if (this.state && this.state.contentValid) {
            return [
                {name: 'File', disabled: false},
                {name: 'Elements', disabled: false},
                {name: 'Map', disabled: false}
            ];
        }

        return [
            {name: 'File', disabled: false},
            {name: 'Elements', disabled: true},
            {name: 'Map', disabled: true}
        ];
    };

    renderPrimaryMenu = (items, activeItem) => {
        const menuItems = items.map(i => (
            <Menu.Item
                style={i.disabled ? style.primaryMenu.disabled : {}}
                key={i.name}
                name={i.name}
                active={activeItem === i.name}
                disabled={i.disabled}
                onClick={this.handleItemPrimaryClick}
            />
        ));

        return (
            <Menu fluid vertical tabular>
                {menuItems}
            </Menu>
        );
    };

    handleItemPrimaryClick = (e, {name}) => this.setState({activeItemPrimary: name});

    onUploadFile = ({contentType, content, contentValid, contentValidationErrors}) => this.setState({
        contentType,
        content,
        contentValid,
        contentValidationErrors
    });

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

    handleChangeSelectedFeature = selectedFeature => {
        this.setState({selectedFeature});
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

    renderHeader = () => {
        switch (this.props.type) {
            case 'area': {
                return 'Import model area geometry';
            }

            case 'boundary': {
                return 'Import ' + this.props.boundaryType + '-boundaries';
            }

            default: {
                return 'Default import statement.';
            }
        }
    };

    render() {
        const {activeItemPrimary, content, contentValid, contentType, contentValidationErrors} = this.state;
        const {onClose} = this.props;

        let errors = null;
        if (Array.isArray(contentValidationErrors) && contentValidationErrors.length > 0) {
            errors = contentValidationErrors.map((e, key) => (
                <div key={key}>
                    <p>Error {key + 1}</p>
                    <span>Message: {e.message}</span>
                </div>
            ));
        }

        return (
            <Modal
                open
                onClose={onClose}
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                dimmer={'inverted'}
                size={'large'}
            >
                <Modal.Header>
                    {this.renderHeader()}
                </Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Column width={4}>
                            {this.renderPrimaryMenu(this.primaryMenuItems(), activeItemPrimary)}
                        </Grid.Column>
                        <Grid.Column stretched width={12}>
                            {activeItemPrimary === 'File' &&
                            <div>
                                <Segment color={'green'} size={'massive'}>
                                    <DropZone onChange={this.onUploadFile}/>
                                </Segment>

                                {errors &&
                                <Segment color={'red'} size={'small'}>
                                    {errors}
                                </Segment>
                                }

                                {(contentValid && contentType === 'application/json') &&
                                <Segment color={'grey'} size={'small'} style={{padding: 0}}>
                                    <TextArea
                                        rows={10}
                                        value={prettifyJson(content)}
                                        style={{width: '100%', border: 'none'}}
                                    />
                                </Segment>
                                }
                            </div>
                            }

                            {activeItemPrimary === 'Elements' && contentValid && contentType === 'application/json' &&
                            <GeoJsonFeaturesImport
                                type={this.props.type}
                                boundaryType={this.props.boundaryType}
                                geoJson={projectGeoJson(JSON.parse(content))}
                            />
                            }

                            {activeItemPrimary === 'Elements' && contentValid && contentType === 'text/csv' &&
                                <CsvBoundariesImport csv={content}/>
                            }
                        </Grid.Column>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.onClose}>Cancel</Button>
                    <Button
                        positive
                        onClick={() => this.importAreaByKey(projectGeoJson(JSON.parse(content)), this.state.selectedFeature)}
                        disabled={this.state.selectedFeature === null}
                    >
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

GenericImport.propTypes = {
    boundaryType: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};

export default GenericImport;
