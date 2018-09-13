import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {GeoJSON, Map, Rectangle, TileLayer, FeatureGroup, CircleMarker} from 'react-leaflet';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import md5 from 'js-md5';
import {uniqueId} from 'lodash';

class OptimizationResultsMap extends React.Component {

    constructor(props) {
        super(props);
    }

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    drawObject = (boundingBox, gridSize, location, color = 'red') => {
        const bbXmin = boundingBox[0][0];
        const bbYmin = boundingBox[0][1];
        const bbXmax = boundingBox[1][0];
        const bbYmax = boundingBox[1][1];

        const styles = {
            point: {
                color: color,
                weight: 0.3
            },
            polygon: {
                color: 'grey',
                weight: 0.3
            }
        };

        const dX = (bbXmax - bbXmin) / gridSize.n_x;
        const dY = (bbYmax - bbYmin) / gridSize.n_y;

        const cXmin = bbXmin + location.col.min * dX;
        const cXmax = bbXmin + location.col.max * dX;
        const cYmin = bbYmax - location.row.min * dY;
        const cYmax = bbYmax - location.row.max * dY;

        const cXres = bbXmin + location.col.result * dX;
        const cYres = bbYmax - location.row.result * dY;

        return (
            <div key={uniqueId()}>
                <CircleMarker
                    center={[
                        cYres,
                        cXres
                    ]}
                    {...styles.point}
                />
                <Rectangle
                    bounds={[
                        {lng: cXmin, lat: cYmin},
                        {lng: cXmin, lat: cYmax},
                        {lng: cXmax, lat: cYmax},
                        {lng: cXmax, lat: cYmin},
                    ]}
                    {...styles.polygon}
                />
            </div>
        );
    };

    render() {
        const {area} = this.props;
        if (!this.props.bbox || !area) {
            return null;
        }

        return (
            <Map
                className="boundaryGeometryMap"
                bounds={this.getBounds(this.props.area)}
            >
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                <GeoJSON
                    key={this.generateKeyFunction(area)}
                    data={area}
                />
                {this.props.objects && this.props.objects.length > 0 &&
                <div>
                    {
                        this.props.objects.map(object => {
                            return this.drawObject(this.props.bbox, this.props.gridSize, object.position, 'red');
                        })
                    }
                </div>
                }
            </Map>
        );
    }
}

OptimizationResultsMap.propTypes = {
    area: PropTypes.object.isRequired,
    bbox: PropTypes.array.isRequired,
    objects: PropTypes.array.isRequired,
    readOnly: PropTypes.bool,
    gridSize: PropTypes.object.isRequired,
};

export default pure(ConfiguredRadium(OptimizationResultsMap));
