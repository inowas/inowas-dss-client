import md5 from 'js-md5';
import PropTypes from 'prop-types';
import React from 'react';

import {GeoJSON, Map, TileLayer, Polygon, Polyline, Circle, FeatureGroup, CircleMarker} from 'react-leaflet';
import {geoJSON as leafletGeoJSON, LatLng} from 'leaflet';
import {cloneDeep, uniqueId} from 'lodash';
import {EditControl} from 'react-leaflet-draw';
import FullscreenControl from 'react-leaflet-fullscreen';

import * as mapHelpers from '../../calculations/map';
import * as geoTools from '../geospatial';
import Control from '../map/Control';

import Button from '../../components/primitive/Button';
import Icon from '../../components/primitive/Icon';

class BoundaryGeometryEditorMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boundary: null,
            boundaries: null,
            bounds: null
        };
    }

    componentWillMount() {
        this.setState({
            boundary: this.props.boundary,
            boundaries: this.props.boundaries.filter(b => (b.id !== this.props.boundary.id)),
            bounds: this.getBounds(this.props.area)
        });
    }

    componentDidMount() {
        // mapHelpers.disableMap(this.map);
    }

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    getStyle = (type, subtype) => {
        const styles = this.props.mapStyles;

        if (!(type in styles)) {
            return styles.default;
        }

        if (subtype === undefined) {
            return styles[type];
        }

        if (!(subtype in styles[type])) {
            return styles.default;
        }

        return styles[type][subtype];
    };

    renderBoundaries(boundaries) {
        return (
            boundaries.map(b => {
                if (b.type === 'wel') {
                    return (
                        <CircleMarker
                            key={b.id}
                            center={[
                                b.geometry.coordinates[1],
                                b.geometry.coordinates[0]
                            ]}
                            {...this.getStyle(b.type, b.metadata.well_type)}
                        />
                    );
                }
                return (
                    <GeoJSON
                        id={b.id}
                        key={this.generateKeyFunction(b.geometry)}
                        data={b.geometry}
                        style={this.getStyle(b.type)}
                    />
                );
            })
        );
    }

    getGeometry = (boundary) => {
        switch (boundary.geometry.type.toLowerCase()) {
            case 'polygon':
                return (
                    <Polygon
                        key={uniqueId()}
                        id={boundary.id}
                        positions={mapHelpers.getLatLngFromXY(
                            boundary.geometry.coordinates[0]
                        )}
                    />
                );
            case 'linestring':
                return (
                    <Polyline
                        key={uniqueId()}
                        id={boundary.id}
                        positions={mapHelpers.getLatLngFromXY(
                            boundary.geometry.coordinates
                        )}
                    />
                );
            case 'point':
                return (
                    <Circle
                        key={uniqueId()}
                        id={boundary.id}
                        center={[
                            boundary.geometry.coordinates[1],
                            boundary.geometry.coordinates[0]
                        ]}
                        radius={50}
                    />
                );
            default:
                return null;
        }
    };

    onEditPath = e => {
        const layers = e.layers;
        layers.eachLayer(layer => {
            const id = layer.options.id;
            const geoJson = layer.toGeoJSON();
            const geometry = geoJson.geometry;

            const boundary = this.state.boundary;

            if (boundary.id === id && boundary.observation_points) {
                boundary.observation_points.map(op => {
                    const {coordinates} = op.geometry;
                    const latLng = mapHelpers.closestPointOnGeometry(e.target, layer, new LatLng(coordinates[1], coordinates[0]));
                    op.geometry.coordinates = [latLng.lng, latLng.lat];
                    return op;
                });
            }

            const activeCells = geoTools.calculateActiveCells(geoJson, this.props.boundingBox, this.props.gridSize);

            this.setState({
                boundary: {
                    ...boundary,
                    geometry,
                    active_cells: activeCells
                }
            });

            this.props.onChange({...boundary, geometry, active_cells: activeCells});
        });
    };

    handleResetViewClick = () => {
        const newBounds = cloneDeep(this.state.bounds);
        newBounds._northEast.lat = this.state.bounds._northEast.lat - 0.00001;

        this.setState({
            bounds: newBounds
        });
    };

    renderBoundaryToEdit(boundary, readOnly) {
        const options = {
            edit: {
                remove: false
            },
            draw: {
                polyline: false,
                polygon: false,
                rectangle: false,
                circle: false,
                marker: false
            }
        };

        if (readOnly) {
            return this.getGeometry(boundary);
        }

        return (
            <FeatureGroup>
                <EditControl
                    position="bottomright"
                    onEdited={this.onEditPath}
                    {...options}
                />{' '}
                {this.getGeometry(boundary)}
            </FeatureGroup>
        );
    }

    render() {
        const {area, readOnly} = this.props;
        const {boundary, boundaries, bounds} = this.state;

        return (
            <div>
                <Map
                    className="boundaryGeometryMap"
                    ref={map => {
                        this.map = map;
                    }}
                    zoomControl={false}
                    bounds={bounds}
                >
                    <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                    <GeoJSON
                        key={this.generateKeyFunction(area)}
                        data={area}
                        style={this.getStyle('area')}
                    />

                    <FullscreenControl position="topright"/>
                    <Control position="topright">
                        <Button
                            title="reset view"
                            onClick={this.handleResetViewClick}
                            iconInside
                            icon={<Icon name="marker"/>}
                        />
                    </Control>

                    {this.renderBoundaries(boundaries)}
                    {this.renderBoundaryToEdit(boundary, readOnly)}
                </Map>
            </div>
        );
    }
}

BoundaryGeometryEditorMap.propTypes = {
    area: PropTypes.object.isRequired,
    boundary: PropTypes.object.isRequired,
    boundaries: PropTypes.array,
    boundingBox: PropTypes.array.isRequired,
    gridSize: PropTypes.object.isRequired,
    mapStyles: PropTypes.object,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool.isRequired
};

export default BoundaryGeometryEditorMap;
