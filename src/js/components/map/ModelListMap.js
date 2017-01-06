import React from "react";
import { Map, GeoJSON } from 'react-leaflet';

export default class ModelListMap extends React.Component {
    constructor(props){
        super(props);
    }

    hasData(){
        return this.props.mapData;
    }

    render(){
        const mapStyle = {background: 'transparent'};
        const myCustomStyle = {
            stroke: false,
            fill: true,
            fillColor: '#c0c0c0',
            fillOpacity: 1};

        if (this.hasData()) {
            return (
                <div id="models-map">
                    <Map
                        center={[40, 0]} zoom={1}
                        zoomControl={false}
                        style={mapStyle}
                        dragging={false}
                        touchZoom={false}
                        doubleClickZoom={false}
                        scrollWheelZoom={false}
                        boxZoom={false}
                        keyboard={false}
                    >
                        <GeoJSON data={this.props.mapData} style={myCustomStyle}/>
                    </Map>
                </div>
            )
        }
        return null;
    }
}
