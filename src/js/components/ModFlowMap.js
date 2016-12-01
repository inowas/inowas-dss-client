import React from "react";

import {
  Map,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  LayersControl,
  FeatureGroup,
  ZoomControl
} from 'react-leaflet';

import MapToolBox from "./MapToolBox";
import MapOverlay from "./MapOverlay";

//import * as DiagramActions from "../actions/DiagramActions";
//import DiagramStore from "../stores/DiagramStore";

export default class ModFlowMap extends React.Component {

  componentWillMount() {
    //DiagramStore.on("change", this.getData);
  }

  componentWillUnmount() {
    //DiagramStore.removeListener("change", this.getData);
  }
/*
  disableMap() {
    console.log(this.context);
    this.context.map._handlers.forEach(function(handler) {
      handler.disable();
    });
  }

  enableMap() {
    this.context.map._handlers.forEach(function(handler) {
      handler.enable();
    });
  }
*/
  getBounds() {
    const bb = this.props.model.bounding_box;
    return [
      [bb.y_min, bb.x_min],
      [bb.y_max, bb.x_max]
    ];
  }

  getAreaGeoJson() {
    return (
      JSON.parse(this.props.model.area.geometry)
    )
  }

  renderMapOverlay() {
    if (this.props.children) {
      return (
        <MapOverlay>
          {this.props.children}
        </MapOverlay>
      );
    }

    return("");
  }

  render() {
    return (
      <div className="map-wrapper">
        <Map bounds={this.getBounds()} zoomControl={false}>
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
          <MapToolBox model={this.props.model} />
          {this.renderMapOverlay()}
        </Map>
      </div>
    );
  }
}
