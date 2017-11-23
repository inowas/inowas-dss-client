import md5 from 'js-md5';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GeoJSON, Map, CircleMarker, TileLayer} from 'react-leaflet';
import {geoJSON} from 'leaflet';
import * as mapHelpers from '../../calculations/map';
import ConfiguredRadium from 'ConfiguredRadium';
import {uniqueId} from 'lodash';

const RadiumMap = ConfiguredRadium(Map);

const componentStyle = {
    map: {
        zIndex: -1
    }
};

@ConfiguredRadium
class BoundaryMap extends Component {
    componentDidMount() {
        mapHelpers.disableMap(this.map);
    }

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    getBounds = geometry => {
        return geoJSON(geometry).getBounds();
    };

    getStyle = (type, subtype) => {
        const styles = this.props.styles;

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

    renderObservationPoints(b) {
        if (b.observation_points && b.observation_points.length > 1) {
            return b.observation_points.map(op => {
                const selected = (op.id === this.props.selectedObservationPointId) ? '_selected' : '';
                return (
                    <CircleMarker
                        key={uniqueId(op.id)}
                        center={[
                            op.geometry.coordinates[1],
                            op.geometry.coordinates[0]
                        ]}
                        {...this.getStyle('op' + selected)}
                    />
                );
            });
        }

        return null;
    }

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
                key={this.generateKeyFunction(b.geometry)}
                data={b.geometry}
                style={this.getStyle(b.type)}
            />
        );
    }

    render() {
        const {area: areaGeometry, boundary, style} = this.props;

        return (
            <RadiumMap
                style={[style, componentStyle.map]}
                className="boundaryMap"
                ref={map => {
                    this.map = map;
                }}
                zoomControl={false}
                bounds={this.getBounds(areaGeometry)}
            >
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                <GeoJSON
                    key={this.generateKeyFunction(areaGeometry)}
                    data={areaGeometry}
                    style={this.getStyle('area')}
                />
                {this.renderBoundary(boundary)}
                {this.renderObservationPoints(boundary)}

            </RadiumMap>
        );
    }
}

BoundaryMap.PropTypes = {
    area: PropTypes.object.isRequired,
    boundary: PropTypes.object.isRequired,
    selectedObservationPointId: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    styles: PropTypes.object
};

export default BoundaryMap;
