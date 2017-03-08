import React, { PropTypes, Component } from 'react';

import { Map, TileLayer, Rectangle, GeoJSON, ImageOverlay } from 'react-leaflet';

import '../../../less/crossSectionMap.less';

export default class CrossSectionMap extends Component {

    static propTypes = {
        model: PropTypes.object.isRequired,
        updateBounds: PropTypes.func.isRequired,
        bounds: PropTypes.array,
        setCrossSection: PropTypes.func.isRequired,
        crossSection: PropTypes.array
    };

    handleMove = e => {
        if (this.props.model.isBaseModel){
            const bounds = e.target.getBounds();
            this.props.updateBounds([
                [bounds.getSouth(), bounds.getWest()],
                [bounds.getNorth(), bounds.getEast()]
            ]);
        }
    };

    handleClick = e => {
        this.props.setCrossSection( e.latlng.lat, e.latlng.lng );
    };

    renderHeatMap(){
        if (this.props.model.result){
            const boundingBox = [
                [this.props.model.boundingBox.y_min, this.props.model.boundingBox.x_min],
                [this.props.model.boundingBox.y_max, this.props.model.boundingBox.x_max]
            ];

            return (
                <ImageOverlay url={this.props.model.result.imgUrl(this.props.min, this.props.max)} bounds={boundingBox} opacity={0.5}/>
            );
        }
    }

    render() {
        const { model, bounds, crossSection } = this.props;
        const boundingBox = [
            [model.boundingBox.y_min, model.boundingBox.x_min],
            [model.boundingBox.y_max, model.boundingBox.x_max]
        ];


        // const boundingBox = [[model.boundingBox.x_min, model.boundingBox.y_min], [model.boundingBox.x_max, model.boundingBox.y_max]];

        // return (
        //     <Map className="crossSectionMap" bounds={bounds} onClick={this.handleClick} zoomControl={false} onMoveEnd={this.handleMove}>
        //         <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
        //         <Rectangle color="#000000" bounds={boundingBox}/> {crossSection
        //             ? <Rectangle bounds={crossSection}/>
        //             : null}
        //     </Map>
        // );
        console.log( 'bounds', bounds );
        return (
            <Map animate={false} className="crossSectionMap" bounds={bounds} onClick={this.handleClick} zoomControl={false} onMoveEnd={this.handleMove}>
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                <GeoJSON data={model.area}/>
                <Rectangle color="#000000" bounds={boundingBox}/>
                {this.renderHeatMap()}
            </Map>
        );
    }

}
