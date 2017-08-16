import md5 from 'js-md5'
import React, { Component } from 'react';
import { GeoJSON, Map, Rectangle, TileLayer} from 'react-leaflet';
import * as mapHelpers from "../../calculations/map";

export default class ModelEditorGeneralMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            model: props.model
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            model: nextProps.model
        });
    }

    componentDidMount( ) {
        mapHelpers.invalidateSize( this.map );
        mapHelpers.disableMap( this.map );
    }

    generateKeyFunction = ( geometry ) => {
        return md5(JSON.stringify(geometry))
    };

    getBounds = ( geometry ) => {
        if ( geometry ) {
            return L.geoJSON(geometry).getBounds();
        }
    };

    getStyle = ( type, subtype ) => {
        const styles = this.state.model.styles;

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


    render( ) {
        const area = this.state.model.geometry;
        const boundingBox = this.state.model.bounding_box;
        const bounds = [[boundingBox[0][1], boundingBox[0][0]], [boundingBox[1][1], boundingBox[1][0]]];

        if (area) {

            return (
                <Map className="crossSectionMap" ref={map => {this.map = map;}} zoomControl={false} bounds={this.getBounds(area)} >
                    <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                    <GeoJSON key={this.generateKeyFunction( area )} data={area} style={this.getStyle('area')} />
                    <Rectangle bounds={bounds} {...this.getStyle('bounding_box')}/>
                </Map>
            );
        }

        return null;
    }
}
