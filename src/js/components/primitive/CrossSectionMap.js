import React, { PropTypes, Component } from 'react';

import { Map, TileLayer, Rectangle, GeoJSON, ImageOverlay } from 'react-leaflet';

import Icon from './Icon';

import '../../../less/crossSectionMap.less';

export default class CrossSectionMap extends Component {

    static propTypes = {
        model: PropTypes.object.isRequired,
        updateMapView: PropTypes.func.isRequired,
        updateBounds: PropTypes.func.isRequired,
        mapPosition: PropTypes.object.isRequired,
        setClickedCell: PropTypes.func.isRequired,
        activeCell: PropTypes.object
    };

    handleMove = e => {
        const zoom = e.target.getZoom();
        const center = e.target.getCenter();

        this.props.updateMapView({lat: center.lat, lng: center.lng}, zoom);
    };

    resetView = () => {
        const {model} = this.props;
        this.props.updateBounds([{
            lat: model.boundingBox.y_min,
            lng: model.boundingBox.x_min
        }, {
            lat: model.boundingBox.y_max,
            lng: model.boundingBox.x_max
        }]);
    }

    handleClick = e => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        const { model } = this.props;
        const boundingBox = model.boundingBox;
        const grid = model.gridSize;

        const dlat = ( boundingBox.y_max - boundingBox.y_min) / grid.n_y; // row width of bounding box grid
        const dlng = ( boundingBox.x_max - boundingBox.x_min) / grid.n_x; // column width of bounding box grid
        const roundedLat = Math.floor( lat / dlat ) * dlat; // start of the row

        // console.log( 'Clicked Cell in grid of bounding box:' );
        const x = Math.floor( ( lng - boundingBox.x_min) / dlng );
        // console.log('x:', x); // x coordinate of bounding box grid from 0 to grid[1]-1
        const y = grid.n_y - 1 - Math.floor( ( lat - boundingBox.y_min) / dlat );
        console.log('y:', y); // y coordinate of bounding box grid from 0 to grid[0]-1

        // Make sure point is inside bounding box
        if ( y >= 0 && y < grid.n_y && x >= 0 && x < grid.n_x) {
            this.props.setClickedCell({x, y});
        }
    };

    renderHeatMap() {
        if (this.props.model.result) {
            const boundingBox = [
                [this.props.model.boundingBox.y_min, this.props.model.boundingBox.x_min],
                [this.props.model.boundingBox.y_max, this.props.model.boundingBox.x_max]
            ];

            return (
                <ImageOverlay url={this.props.model.result.imgUrl(this.props.min, this.props.max)} bounds={boundingBox} opacity={0.5}/>
            );
        }
        return null;
    }

    render() {
        const { model, mapPosition, activeCell } = this.props;
        const boundingBox = [
            [model.boundingBox.y_min, model.boundingBox.x_min],
            [model.boundingBox.y_max, model.boundingBox.x_max]
        ];

        let crossSectionLatRectangle = null;
        if (activeCell && activeCell.y !== null) {
            const dlat = ( model.boundingBox.y_max - model.boundingBox.y_min) / model.gridSize.n_y; // row width of bounding box grid
            const crossSectionLat = (model.gridSize.n_y - activeCell.y - 1) * dlat + model.boundingBox.y_min;
            crossSectionLatRectangle = <Rectangle bounds={[[crossSectionLat, model.boundingBox.x_min], [crossSectionLat + dlat, model.boundingBox.x_max]]}/>;
        }

        let crossSectionLngRectangle = null;
        if (activeCell && activeCell.x !== null) {
            const dlng = ( model.boundingBox.x_max - model.boundingBox.x_min) / model.gridSize.n_x; // column width of bounding box grid
            const crossSectionLng = activeCell.x * dlng + model.boundingBox.x_min;
            crossSectionLngRectangle = <Rectangle bounds={[[model.boundingBox.y_min, crossSectionLng], [model.boundingBox.y_max, crossSectionLng + dlng]]}/>;
        }

        return (
            <Map className="crossSectionMap" {...mapPosition} onClick={this.handleClick} zoomControl={false} onMoveEnd={this.handleMove}>
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                <GeoJSON data={model.area}/>
                <Rectangle color="#000000" bounds={boundingBox}/>
                {this.renderHeatMap()}
                {crossSectionLatRectangle}
                {crossSectionLngRectangle}
                <button title="reset view" className="button resetView" onClick={this.resetView}><Icon name="marker" /></button>
            </Map>
        );
    }

}
