import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {GeoJSON, Map, Rectangle, TileLayer, FeatureGroup} from 'react-leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import md5 from 'js-md5';
import {uniqueId} from 'lodash';
import EditControl from '../../../core/map/EditControl';
import * as geoTools from '../../../core/geospatial';

class OptimizationMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            object: this.props.object
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            object: nextProps.object
        });
    }

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    selectedAreaLayer = (boundingBox, gridSize, position) => {
        const bbXmin = boundingBox[0][0];
        const bbYmin = boundingBox[0][1];
        const bbXmax = boundingBox[1][0];
        const bbYmax = boundingBox[1][1];

        const styles = {
            line: {
                color: 'red',
                weight: 0.3
            }
        };

        const dX = (bbXmax - bbXmin) / gridSize.n_x;
        const dY = (bbYmax - bbYmin) / gridSize.n_y;

        const cXmin = bbXmin + position.col.min * dX;
        const cXmax = bbXmin + position.col.max * dX;
        const cYmin = bbYmax - position.row.min * dY;
        const cYmax = bbYmax - position.row.max * dY;

        return (
            <Rectangle
                key={uniqueId()}
                bounds={[
                    {lng: cXmin, lat: cYmin},
                    {lng: cXmin, lat: cYmax},
                    {lng: cXmax, lat: cYmax},
                    {lng: cXmax, lat: cYmin},
                ]}
                {...styles.line}
            />
        );
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

            const position = {
                row: {
                    min: cmin[1],
                    max: cmax[1]
                },
                col: {
                    min: cmin[0],
                    max: cmax[0]
                }
            };

            this.props.onChange(position);
        });
    };

    render() {
        const options = {
            edit: {
                remove: false
            },
            draw: {
                polyline: false,
                polygon: false,
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false
            }
        };

        const {area} = this.props;
        if (!this.props.bbox || !area) {
            return null;
        }

        return (
            <div>
                <Map
                    className="boundaryGeometryMap"
                    zoomControl={false}
                    bounds={this.getBounds(this.props.area)}
                >
                    <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                    <GeoJSON
                        key={this.generateKeyFunction(area)}
                        data={area}
                    />
                    {!this.props.readOnly
                        ?
                        <div>
                            <FullscreenControl position="topright"/>
                            <FeatureGroup>
                                <EditControl
                                    position="bottomright"
                                    onEdited={this.onEditPath}
                                    {...options}
                                />{' '}
                                {this.selectedAreaLayer(this.props.bbox, this.props.gridSize, this.state.object.position)}
                            </FeatureGroup>
                        </div>
                        :
                        <FeatureGroup>
                            {this.selectedAreaLayer(this.props.bbox, this.props.gridSize, this.state.object.position)}
                        </FeatureGroup>
                    }
                </Map>
            </div>
        );
    }
}

OptimizationMap.propTypes = {
    area: PropTypes.object.isRequired,
    bbox: PropTypes.array.isRequired,
    object: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    gridSize: PropTypes.object.isRequired,
};

export default pure(ConfiguredRadium(OptimizationMap));
