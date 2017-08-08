import md5 from 'js-md5'
import React, { Component, PropTypes } from 'react';
import { GeoJSON, Map, CircleMarker, TileLayer} from 'react-leaflet';
import * as mapHelpers from "../../calculations/map";


export default class ModelEditorBoundaryMap extends Component {

    static propTypes = {
        area: PropTypes.object,
        boundary: PropTypes.object,
        styles: PropTypes.object
    };

    componentDidMount( ) {
        mapHelpers.disableMap( this.refs.map );
    }

    generateKeyFunction = ( geometry ) => {
        return md5(JSON.stringify(geometry))
    };

    getBounds = ( geometry ) => {
        return L.geoJSON(geometry).getBounds();
    };

    getStyle = ( type, subtype ) => {
        const styles = this.props.styles;

        if (!(type in styles)) {
            return styles['default'];
        }

        if (subtype === undefined) {
            return styles[type];
        }

        if (!(subtype in styles[type])) {
            return styles['default'];
        }

        return styles[type][subtype];
    };


    renderBoundary( b ) {

        if (b.type === 'wel') {
            const wellType = b.metadata['well_type'];
            return (
                <CircleMarker key={b.id} center={[b.geometry.coordinates[1], b.geometry.coordinates[0]]} {...this.getStyle(b.type, wellType)} />
            );
        }
    }

    render( ) {
        const areaGeometry = this.props.area;
        const boundary = this.props.boundary;

        return (
            <Map className="boundaryMap" ref="map" zoomControl={false} bounds={ this.getBounds(areaGeometry) } >
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                <GeoJSON key={this.generateKeyFunction( areaGeometry )} data={ areaGeometry } style={this.getStyle('area')} />
                {this.renderBoundary(boundary)}
            </Map>
        );
    }
}
