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

import MapToolBox from "../components/map/MapToolBox"
import MapOverlay from "../components/map/MapOverlay"
import Model from "./../modflow_model_example_data"

export default class ModFlowMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      model: Model,
    }
  }

  getChildContext() {
    return {
      model: this.state.model,
      updateBoundaryName: this.updateBoundaryName.bind(this),
    };
  }

  updateBoundaryName(id, newName) {
    this.state.model.boundaries.find(b => b.id == id).name = newName;
    this.forceUpdate();
  }

  getBounds() {
    const {y_min, x_min, y_max, x_max } = this.state.model.bounding_box;
    return [
      [y_min, x_min],
      [y_max,x_max]
    ];
  }

  getAreaGeoJson() {
    return (
      JSON.parse(this.state.model.area.geometry)
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
    const { model } = this.state;

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
          <MapToolBox model={model} />
          {this.renderMapOverlay()}
        </Map>
      </div>
    );
  }
}

ModFlowMap.childContextTypes = {
  model: React.PropTypes.object,
  updateBoundaryName: React.PropTypes.func
};
