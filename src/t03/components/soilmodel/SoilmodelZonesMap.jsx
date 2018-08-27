import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {GeoJSON, Map, Rectangle, TileLayer, FeatureGroup, CircleMarker} from 'react-leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import md5 from 'js-md5';
import {uniqueId} from 'lodash';
import EditControl from '../../../core/map/EditControl';
import * as geoTools from '../../../core/geospatial';
import {Button, Grid, Modal, Segment} from 'semantic-ui-react';

class ZonesMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showOverlay: false,
            hasError: false,
            isEditing: false
        };
    }

    toggleEditingState = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    };

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    onEditPath = e => {
        const layers = e.layers;

        layers.eachLayer(layer => {
            const geoJson = layer.toGeoJSON();
            const geometry = geoJson.geometry;

            // Latitude (S/N)
            let ymin = 90;
            let ymax = -90;
            // Longitude (E/W)
            let xmin = 180;
            let xmax = -180;

            geometry.coordinates[0].map(c => {
                if (c[0] <= xmin) {
                    xmin = c[0];
                }
                if (c[0] >= xmax) {
                    xmax = c[0];
                }
                if (c[1] <= ymin) {
                    ymin = c[1];
                }
                if (c[1] >= ymax) {
                    ymax = c[1];
                }
            });

            const cmin = geoTools.getActiveCellFromCoordinate([xmin, ymax], this.props.bbox, this.props.gridSize);
            const cmax = geoTools.getActiveCellFromCoordinate([xmax, ymin], this.props.bbox, this.props.gridSize);

            const p = {
                row: {
                    min: cmin[1],
                    max: cmax[1]
                },
                col: {
                    min: cmin[0],
                    max: cmax[0]
                }
            };

            return this.setState({
                location: {
                    ...this.state.location,
                    row: {
                        ...this.state.location.row,
                        min: p.row.min,
                        max: p.row.max
                    },
                    col: {
                        ...this.state.location.col,
                        min: p.col.min,
                        max: p.col.max
                    }
                }
            });
        });
    };

    onSaveModal = (e) => {
        this.props.onChange(e, {
            'name': this.props.name,
            'value': this.state.location
        });
        return this.setState({
            showOverlay: false
        });
    };

    onCancelModal = () => {
        this.setState({
            showOverlay: false
        });
    };

    onClickToggleMap = () => {
        this.setState({
            showOverlay: true
        });
    };

    printMap() {
        let options = {
            edit: {
                remove: true
            },
            draw: {
                polyline: false,
                polygon: false,
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                poly: {
                    allowIntersection: false
                }
            }
        };

        if(!this.props.readOnly) {
            options.draw.polygon = {
                guideLayers: [this.getBounds(this.props.area)],
                snapDistance: 5
            };
        }

        const {area} = this.props;
        if (!this.props.bbox || !area) {
            return null;
        }

        return (
            <Map
                className="boundaryGeometryMap"
                zoomControl={false}
                dragging={this.state.showOverlay}
                boxZoom={this.state.showOverlay}
                touchZoom={this.state.showOverlay}
                doubleClickZoom={this.state.showOverlay}
                scrollWheelZoom={this.state.showOverlay}
                bounds={this.getBounds(this.props.area)}
            >
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                <GeoJSON
                    key={this.generateKeyFunction(area)}
                    data={area}
                />
                    <div>
                        <FullscreenControl position="topright"/>
                        <FeatureGroup>
                            <EditControl
                                position="bottomright"
                                onEdited={this.onEditPath}
                                onEditStart={this.toggleEditingState}
                                onEditStop={this.toggleEditingState}
                                {...options}
                            />
                        </FeatureGroup>
                    </div>
            </Map>
        );
    }

    render() {
        return (
            <div>
                <Button fluid
                        onClick={this.onClickToggleMap}
                >
                    { this.props.label ? this.props.label : 'Edit Location' }
                </Button>
                {this.printMap(true)}
                {this.state.showOverlay &&
                <Modal size={'large'} open onClose={this.onCancelModal} dimmer={'inverted'}>
                    <Modal.Header>{ this.props.label ? this.props.label : 'Edit Location' }</Modal.Header>
                    <Modal.Content>
                        <Grid divided={'vertically'}>
                            <Grid.Row columns={2}>
                                <Grid.Column width={6}>
                                    TEst
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Segment attached="bottom">
                                        {this.printMap()}
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.onCancelModal}>Cancel</Button>
                        <Button
                            positive
                            onClick={this.onSaveModal}
                            disabled={this.state.hasError}>
                            Save
                        </Button>
                    </Modal.Actions>
                </Modal>
                }
            </div>
        );
    }
}

ZonesMap.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    area: PropTypes.object.isRequired,
    bbox: PropTypes.array.isRequired,
    location: PropTypes.object,
    objects: PropTypes.array,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    gridSize: PropTypes.object.isRequired,
};

export default pure(ConfiguredRadium(ZonesMap));
