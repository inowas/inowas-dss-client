import React, { PropTypes, Component } from 'react';

import {
    Map,
    TileLayer,
    Rectangle,
    GeoJSON,
    ImageOverlay,
    CircleMarker,
    LayersControl,
    LayerGroup
} from 'react-leaflet';

// import Coordinate from '../../model/Coordinate';

import Icon from './Icon';

import '../../less/leaflet.less';
import '../../less/modelEditorMap.less';

export default class ModelEditorMap extends Component {

    static propTypes = {
        // mapData: PropTypes.instanceOf(ScenarioAnalysisMapData).isRequired
    };

    render( ) {
        return (
            <div className="modelEditorMap-wrapper">
                <Map center={[ 51.505, -0.09 ]} zoom={13} className="modelEditorMap" zoomControl={false}>
                    <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/> {/** <LayersControl position="topleft" /> **/}
                    <button title="reset view" className="button icon-inside resetView" onClick={this.resetView}><Icon name="marker"/></button>
                </Map>
            </div>
        );
    }
}
