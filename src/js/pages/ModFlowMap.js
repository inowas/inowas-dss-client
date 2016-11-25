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

import MapToolBox from "../components/MapToolBox";

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

  getBounds() {
    return [
      [
        20.942793923555, 105.75218379342
      ],
      [21.100124603334, 105.91170436595]
    ];
  }

  getAreaGeoJson() {
    return {
      "type": "Polygon",
      "coordinates": [
        [
          [
            105.79076773363, 21.094425932026
          ],
          [
            105.7969598434, 21.093521487879
          ],
          [
            105.80201706033, 21.092234483652
          ],
          [
            105.80808425974, 21.090442258425
          ],
          [
            105.81249937936, 21.08874528577
          ],
          [
            105.81718985777, 21.086246452411
          ],
          [
            105.82184988092, 21.083084791162
          ],
          [
            105.82620668519, 21.080549811907
          ],
          [
            105.82974566655, 21.077143263498
          ],
          [
            105.83373828447, 21.073871989488
          ],
          [
            105.83705437197, 21.068790508713
          ],
          [
            105.84315647783, 21.061619066459
          ],
          [
            105.84525729705, 21.058494488217
          ],
          [
            105.84809106469, 21.055416254107
          ],
          [
            105.8504150528, 21.051740212148
          ],
          [
            105.85398642619, 21.047219935886
          ],
          [
            105.85731779774, 21.042700799257
          ],
          [
            105.86088616529, 21.037730164508
          ],
          [
            105.86278107729, 21.033668431681
          ],
          [
            105.86562845881, 21.028476242159
          ],
          [
            105.86751271361, 21.022613568027
          ],
          [
            105.86940204857, 21.017651320651
          ],
          [
            105.87138878204, 21.01342644222
          ],
          [
            105.87284994574, 21.008166192541
          ],
          [
            105.87618166477, 21.003946864459
          ],
          [
            105.882508712, 21.001813076332
          ],
          [
            105.88949176703, 21.00028845236
          ],
          [
            105.89432480733, 20.997811850332
          ],
          [
            105.89813016273, 20.994990356212
          ],
          [
            105.90303557489, 20.989098851962
          ],
          [
            105.90561925316, 20.984707849769
          ],
          [
            105.90510730986, 20.977094091795
          ],
          [
            105.9017071448, 20.969670720259
          ],
          [
            105.89605227287, 20.959195015806
          ],
          [
            105.88686516703, 20.950138230158
          ],
          [
            105.87790127444, 20.947208019283
          ],
          [
            105.8344990677, 20.951978316228
          ],
          [
            105.80625764634, 20.968923300374
          ],
          [
            105.78185697817, 21.00860854901
          ],
          [
            105.76821653259, 21.039487418417
          ],
          [
            105.77435758569, 21.072902571997
          ],
          [
            105.77706202591, 21.090749775345
          ],
          [
            105.78304910633, 21.093961473087
          ],
          [105.79076773363, 21.094425932026]
        ]
      ]
    };
  }

  render() {
    return (
      <div class="map-wrapper">
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
          <ZoomControl position="topright" />
          <MapToolBox />
        </Map>
      </div>
    );
  }
}
