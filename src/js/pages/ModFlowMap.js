import React from "react"
import { Map, TileLayer, GeoJSON, LayersControl, ZoomControl, CircleMarker} from 'react-leaflet'

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

    getBounds(bb) {
        const {y_min, x_min, y_max, x_max} = bb;
        return [
            [
                y_min, x_min
            ],
            [y_max, x_max]
        ];
    }


    parseJson(json){
        return (JSON.parse(json));
    }

    render() {
        const {model, appState, styles} = this.props;

        if (model.id) {
            const boundaries = model.boundaries.map( b => {
                if (b.type == 'WEL'){
                    const style = styles.wells[b.well_type];
                    const data = this.parseJson(b.geometry);
                    return <CircleMarker
                        key={b.id}
                        center={[data.coordinates[1], data.coordinates[0]]}
                        radius={style.radius}
                        color={style.color}
                        weight={style.weight}
                        fillColor={style.fillColor}
                        fillOpacity={style.fillOpacity}
                    />
                } else {
                    const style = styles[b.type];
                    const data = this.parseJson(b.geometry);
                    return <GeoJSON
                        key={b.id}
                        data={data}
                        style={style}
                    />
                }
            });

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
                                <GeoJSON data={this.parseJson(model.area.geometry)}/>
                            </LayersControl.Overlay>

                        </LayersControl>
                        <ZoomControl position="topright"/>

                        {boundaries}

                        <MapToolBox model={this.props.model} appState={this.props.appState}/>
                        <MapOverlay appState={appState}>
                            <BoundaryProperties appState={appState} model={model} />
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
