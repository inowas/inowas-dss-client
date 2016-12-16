import React from "react"

import {
    Map,
    Marker,
    Popup,
    TileLayer,
    GeoJSON,
    LayersControl,
    FeatureGroup,
    ZoomControl
} from 'react-leaflet'

import MapToolBox from "../components/map/MapToolBox";
import MapOverlay from "../components/map/MapOverlay";
import BoundaryProperties from "../components/boundaries/BoundaryProperties";

export default class ModFlowMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            model: props.model,
            appState: props.appState
        }
    }

    getChildContext() {
        return {model: this.props.model};
    }

    getBounds(bb) {
        const {y_min, x_min, y_max, x_max} = bb;
        return [
            [
                y_min, x_min
            ],
            [y_max, x_max]
        ];
    }

    getAreaGeoJson() {
        return (JSON.parse(this.props.model.area.geometry))
    }

    renderMapToolBox() {
        if (!this.props.appState.scenarioAnalysisSelect) {
            return <MapToolBox model={this.props.model} appState={this.props.appState}/>;
        }

        return null;
    }

    render() {

        const model = this.props.model;
        const appState = this.props.appState;

        if (model.id) {
            return (
                <div className="map-wrapper">
                    <Map bounds={this.getBounds(this.props.model.bounding_box)} zoomControl={false}>
                        <LayersControl position='topright'>
                            <LayersControl.BaseLayer name="Common map layer" checked>
                                <TileLayer url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                            </LayersControl.BaseLayer>

                            <LayersControl.BaseLayer name='OpenStreetMap.BlackAndWhite'>
                                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'/>
                            </LayersControl.BaseLayer>

                            <LayersControl.Overlay name='Area' checked>
                                <GeoJSON data={this.getAreaGeoJson()}/>
                            </LayersControl.Overlay>
                        </LayersControl>
                        <ZoomControl position="topright"/>
                        {this.renderMapToolBox()}
                        <MapOverlay appState={appState}>
                            <BoundaryProperties appState={appState} model={model}/>
                        </MapOverlay>
                    </Map>
                </div>
            );
        }

        return null;
    }
}

ModFlowMap.childContextTypes = {
    model: React.PropTypes.object
};
