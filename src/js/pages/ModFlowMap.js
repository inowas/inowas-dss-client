import React from "react"
import { Map, TileLayer, FeatureGroup, GeoJSON, LayersControl, ZoomControl, CircleMarker, ImageOverlay} from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"

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
        return [[y_min, x_min], [y_max, x_max]];
    }


    parseJson(json){
        return (JSON.parse(json));
    }

    hasData(){
        return (this.props.model != null)
    }

    onClickHandler(e){
        //console.log("You clicked the map at " + e.latlng)
    };

    renderEditControl(){
        return (
        <FeatureGroup>
            <EditControl
                position='topright'
                draw={{
                    rectangle: false
                }}
            />
        </FeatureGroup>
        )
    }

    render() {

        if (this.hasData()) {
            const {model, appState, styles, store} = this.props;
            const boundingBox = model.bounding_box;
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
                    <Map bounds={this.getBounds(boundingBox)} zoomControl={false} onClick={::this.onClickHandler}>
                        <LayersControl position='topright'>
                            <LayersControl.BaseLayer name="Common map layer" checked>
                                <TileLayer url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                            </LayersControl.BaseLayer>

                            <LayersControl.BaseLayer name='OpenStreetMap.BlackAndWhite'>
                                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'/>
                            </LayersControl.BaseLayer>

                            <LayersControl.Overlay name='Heads' checked>
                                <ImageOverlay
                                    url={'http://dev.inowas.hydro.tu-dresden.de/api/modflow/models/'+model.id+'/heads/image.png'}
                                    bounds={this.getBounds(boundingBox)}
                                    opacity={0.5}
                                />
                            </LayersControl.Overlay>

                            <LayersControl.Overlay name='Area' checked>
                                <GeoJSON data={this.parseJson(model.area.geometry)}/>
                            </LayersControl.Overlay>

                            <LayersControl.Overlay name='Heads' checked>
                                <ImageOverlay
                                    url={'http://dev.inowas.hydro.tu-dresden.de/api/modflow/models/'+model.id+'/heads/image.png'}
                                    bounds={this.getBounds(boundingBox)}
                                    opacity={0.5}
                                />
                            </LayersControl.Overlay>

                        </LayersControl>
                        <ZoomControl position="topright"/>

                        {boundaries}

                        <MapToolBox model={model} appState={appState} store={store} />
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
