import md5 from 'js-md5';
import PropTypes from 'prop-types';
import React from 'react';
import {GeoJSON, Map, TileLayer, CircleMarker} from 'react-leaflet';
import {geoJSON as leafletGeoJSON, LatLng} from 'leaflet';
import {EditControl} from 'react-leaflet-draw';
import FullscreenControl from 'react-leaflet-fullscreen';
import * as mapHelpers from '../../calculations/map';
import * as geoTools from '../geospatial';
import ActiveCellsLayer from './activeCellsLayer';
import {getActiveCellFromCoordinate} from '../geospatial/index';
import Control from '../map/Control';
import Button from '../../components/primitive/Button';
import Icon from '../../components/primitive/Icon';
import {cloneDeep} from 'lodash';

class BoundaryGeometryActiveCellsMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boundary: null,
            bounds: null
        };
    }

    componentWillMount() {
        this.setState({
            boundary: this.props.boundary,
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

    handleClickOnMap = ({latlng}) => {
        const {boundingBox, gridSize, readOnly} = this.props;

        if (readOnly) {
            return;
        }

        const {boundary} = this.state;
        const activeCells = boundary.active_cells;

        const activeCell = getActiveCellFromCoordinate(
            [latlng.lng, latlng.lat],
            boundingBox,
            gridSize
        );

        const key = activeCells.findIndex(ac => (ac[0] === activeCell[0] && ac[1] === activeCell[1]));

        if (key < 0) {
            activeCells.push(activeCell);
        }

        if (key >= 0) {
            activeCells.splice(key, 1);
        }

        this.setState(
            {...boundary, active_cells: activeCells}
        );
    };

    handleResetViewClick = () => {
        const newBounds = cloneDeep(this.state.bounds);
        newBounds._northEast.lat = this.state.bounds._northEast.lat - 0.00001;

        this.setState({
            bounds: newBounds
        });
    };

    renderBoundary(b) {
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
                style={{
                    ...this.getStyle(b.type),
                    weight: 1,
                }}
            />
        );
    }

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

            this.setState({
                boundary: {
                    ...boundary,
                    geometry,
                    active_cells: geoTools.calculateActiveCells(geoJson, this.props.boundingBox, this.props.gridSize)
                }
            });

            this.props.onChange({...boundary, geometry});
        });
    };

    render() {
        const {area, boundingBox, gridSize} = this.props;
        const {boundary, bounds} = this.state;
        const activeCells = boundary.active_cells;

        return (
            <Map
                className="boundaryGeometryMap"
                ref={map => {
                    this.map = map;
                }}
                zoomControl={false}
                bounds={bounds}
                onClick={this.handleClickOnMap}
            >
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                <GeoJSON
                    key={this.generateKeyFunction(area)}
                    data={area}
                    style={{
                        ...this.getStyle('area'),
                        weight: 1
                    }}
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

                {this.renderBoundary(boundary)}
                <ActiveCellsLayer boundingBox={boundingBox} gridSize={gridSize} activeCells={activeCells}/>
            </Map>
        );
    }
}

BoundaryGeometryActiveCellsMap.propTypes = {
    area: PropTypes.object.isRequired,
    boundary: PropTypes.object.isRequired,
    boundingBox: PropTypes.array.isRequired,
    gridSize: PropTypes.object.isRequired,
    mapStyles: PropTypes.object,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool.isRequired,
};

export default BoundaryGeometryActiveCellsMap;
