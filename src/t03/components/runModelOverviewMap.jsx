import * as mapHelpers from '../../calculations/map';

import { GeoJSON, Map, Rectangle, TileLayer } from 'react-leaflet';
import React, { Component } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import PropTypes from 'prop-types';
import { geoJSON } from 'leaflet';
import md5 from 'js-md5';
import GridLayer from "./gridLayer";

const styles = {
    map: {
        minHeight: 300
    }
};

const RadiumMap = ConfiguredRadium(Map);

@ConfiguredRadium
class RunModelOverviewMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: props.model
        };
    }

    componentDidMount() {
        mapHelpers.disableMap(this.map);
        mapHelpers.invalidateSize(this.map);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            model: nextProps.model
        });
    }

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    getBounds = geometry => {
        if (geometry) {
            return geoJSON(geometry).getBounds();
        }

        return null;
    };

    getStyle = (type, subtype) => {
        const modelStyles = this.state.model.styles;

        if (!(type in modelStyles)) {
            return modelStyles.default;
        }

        if (subtype === undefined) {
            return modelStyles[type];
        }

        if (!(subtype in modelStyles[type])) {
            return modelStyles.default;
        }

        return modelStyles[type][subtype];
    };

    render() {
        const { style } = this.props;
        const area = this.state.model.geometry;
        const boundingBox = this.state.model.bounding_box;
        const gridSize = this.state.model.grid_size;
        const bounds = [
            [boundingBox[0][1], boundingBox[0][0]],
            [boundingBox[1][1], boundingBox[1][0]]
        ];

        if (area) {
            return (
                <RadiumMap
                    className="crossSectionMap"
                    style={[styles.map, style]}
                    ref={map => {
                        this.map = map;
                    }}
                    zoomControl={false}
                    bounds={this.getBounds(area)}
                >
                    <TileLayer
                        url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
                    />
                    <GeoJSON
                        key={this.generateKeyFunction(area)}
                        data={area}
                        style={this.getStyle('area')}
                    />
                    <Rectangle
                        bounds={bounds}
                        {...this.getStyle('bounding_box')}
                    />
                    <GridLayer boundingBox={boundingBox} gridSize={gridSize} />
                </RadiumMap>
            );
        }

        return (
            <RadiumMap
                className="crossSectionMap"
                style={[styles.map, style]}
                ref={map => {
                    this.map = map;
                }}
                zoomControl={false}
                center={[20, 140]}
                zoom={1}
            >
                <TileLayer
                    url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
                />
            </RadiumMap>
        );
    }
}

RunModelOverviewMap.propTypes = {
    model: PropTypes.object,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default RunModelOverviewMap;
