import React from "react";

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

//import * as DiagramActions from "../actions/DiagramActions";
//import DiagramStore from "../stores/DiagramStore";

export default class ModFlowMap extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    //DiagramStore.on("change", this.getData);
  }

  componentWillUnmount() {
    //DiagramStore.removeListener("change", this.getData);
  }

  render() {
    const position = [51.505, -0.09];
    return (
      <div class="fullscreen">
        <Map center={position} zoom={13}>
          <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}
