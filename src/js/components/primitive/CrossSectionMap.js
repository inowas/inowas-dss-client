import React, { PropTypes, Component } from 'react';

import { Map, TileLayer, Rectangle, GeoJSON, ImageOverlay, CircleMarker, LayersControl, LayerGroup } from 'react-leaflet';

import Icon from './Icon';
import ColorLegend from './ColorLegend';

import '../../../less/leaflet.less';
import '../../../less/crossSectionMap.less';

export default class CrossSectionMap extends Component {

    static propTypes = {
        mapData: PropTypes.object.isRequired,
        updateMapView: PropTypes.func.isRequired,
        updateBounds: PropTypes.func.isRequired,
        mapPosition: PropTypes.object.isRequired,
        setClickedCell: PropTypes.func.isRequired,
        activeCell: PropTypes.object
    };

    state = {
        styles: {
            crossSectionSelection: {color: "#000", weight: 0.5, opacity: 0.5, fillColor: "#000", fillOpacity: 0.5},
            inactive: {color: "#000", weight: 0, fillColor: "#000", fillOpacity: 0.7},
            active: {color: "#ff7800", weight: 0, fillColor: "#000", fillOpacity: 0},
            boundingBox: {color: "#000", weight: 0.5, fillColor: "blue", fillOpacity: 0.1},
            area: {color: "#000", weight: 0.5, fillColor: "blue", fillOpacity: 0.1},
            hasNoWell: {color: "#000", weight: 0, fillOpacity: 0},
            hasWell: {color: "blue", weight: 1, fillColor: "darkblue", fillOpacity: 1},
            wells: {
                cw: {radius: 3, color: 'black', weight: 1, fillColor: 'darkgreen', fillOpacity: 0.7},
                iw: {radius: 3, color: 'black', weight: 1, fillColor: 'darkgreen', fillOpacity: 0.7},
                sniw: {radius: 5, color: 'red', weight: 2, fillColor: 'darkgreen', fillOpacity: 0.7},
                puw: {radius: 3, color: 'black', weight: 1, fillColor: 'darkblue', fillOpacity: 0.7},
                snpw: {radius: 5, color: 'red', weight: 2, fillColor: 'darkblue', fillOpacity: 0.7},
                prw: {radius: 3, color: 'black', weight: 1, fillColor: 'darkblue', fillOpacity: 0.7},
                smw: {radius: 5, color: 'black', weight: 1, fillColor: 'red', fillOpacity: 1},
                snw: {radius: 5, color: 'black', weight: 1, fillColor: 'yellow', fillOpacity: 1},
                snifw: {radius: 5, color: '#63b3ea', weight: 2, fillColor: '#bbdff6', fillOpacity: 0.7}
            },
            river: {color: '#000', weight: 0.5, fillColor: 'blue', fillOpacity: 0}
        },
    };

    handleMove = e => {
        const zoom = e.target.getZoom();
        const center = e.target.getCenter();

        this.props.updateMapView({lat: center.lat, lng: center.lng}, zoom);
    };

    resetView = () => {
        const bb = this.props.mapData.boundingBox();

        this.props.updateBounds([{
            lat: bb.y_min,
            lng: bb.x_min
        }, {
            lat: bb.y_max,
            lng: bb.x_max
        }]);
    };

    handleClick = e => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        const { mapData } = this.props;
        const boundingBox = mapData.boundingBox();
        const grid = mapData.gridSize();

        const dlat = ( boundingBox.y_max - boundingBox.y_min) / grid.n_y; // row width of bounding box grid
        const dlng = ( boundingBox.x_max - boundingBox.x_min) / grid.n_x; // column width of bounding box grid

        //console.log( 'Clicked Cell in grid of bounding box:' );
        const x = Math.floor( ( lng - boundingBox.x_min) / dlng );
        //console.log('x:', x); // x coordinate of bounding box grid from 0 to grid[1]-1
        const y = grid.n_y - 1 - Math.floor( ( lat - boundingBox.y_min) / dlat );
        //console.log('y:', y); // y coordinate of bounding box grid from 0 to grid[0]-1

        // Make sure point is inside bounding box
        if ( y >= 0 && y < grid.n_y && x >= 0 && x < grid.n_x) {
            this.props.setClickedCell({x, y});
        }
    };

    renderHeatMap() {
        if (this.props.mapData.imgUrl() === null){
            return null;
        }

        const bb = this.props.mapData.boundingBox();
        const boundingBox = [[bb.y_min, bb.x_min], [bb.y_max, bb.x_max]];

        return (
            <LayersControl.Overlay name="Heads" checked>
                <ImageOverlay url={this.props.mapData.imgUrl()} bounds={boundingBox} opacity={0.5}/>
            </LayersControl.Overlay>
        );
    }

    renderLegend() {
        const legend = this.props.mapData.legend();

        if (legend === null) {
            return  null;
        }

        return (
            <ColorLegend legend={legend} />
        );
    }

    renderBoundaries() {
        const boundaries = this.props.mapData.boundaries();
        if (boundaries.length == 0) {
            return null;
        }

        const wells = boundaries.map( b => {
            if (b.type == 'well') {
                const name = b.name;
                const geometry = JSON.parse(b.geometry);
                const metadata = JSON.parse(b.metadata);

                const style = this.state.styles.wells[metadata.well_type];
                return (
                   <CircleMarker
                       key={b.boundary_id}
                       center={[geometry.coordinates[1], geometry.coordinates[0]]}
                       radius={style.radius}
                       color={style.color}
                       weight={style.weight}
                       fillColor={style.fillColor}
                       fillOpacity={style.fillOpacity}
                   />
                );
            }
        });

        return (
            <LayersControl.Overlay name="Wells" checked>
                <LayerGroup>
                    {wells}
                </LayerGroup>
            </LayersControl.Overlay>
        );
    }

    renderBoundingBox() {
        const bb = this.props.mapData.boundingBox();
        const boundingBox = [[bb.y_min, bb.x_min], [bb.y_max, bb.x_max]];
        const style = this.state.styles.boundingBox;

        return (
            <LayersControl.Overlay name="BoundingBox" checked>
                <Rectangle
                    bounds={boundingBox}
                    color={style.color}
                    weight={style.weight}
                    fillColor={style.fillColor}
                    fillOpacity={style.fillOpacity}
                />
            </LayersControl.Overlay>
        );
    }

    renderArea() {
        const area = this.props.mapData.area();
        return (
            <LayersControl.Overlay name="Area" checked>
                <GeoJSON data={area} style={this.state.styles.area} />
            </LayersControl.Overlay>
        );
    }

    renderCrossSectionSelection(lat = true, lng = false) {
        const activeCell = this.props.activeCell;
        const gridSize = this.props.mapData.gridSize();
        const style = this.state.styles.crossSectionSelection;
        const boundingBox = this.props.mapData.boundingBox();

        let crossSectionLatRectangle = null;
        if (activeCell && activeCell.y !== null) {
            const dlat = ( boundingBox.y_max - boundingBox.y_min) / gridSize.n_y; // row width of bounding box grid
            const crossSectionLat = (gridSize.n_y - activeCell.y - 1) * dlat + boundingBox.y_min;
            crossSectionLatRectangle = <Rectangle
                bounds={[[crossSectionLat, boundingBox.x_min], [crossSectionLat + dlat, boundingBox.x_max]]}
                color={style.color}
                weight={style.weight}
                opacity={style.opacity}
                fillColor={style.fillColor}
                fillOpacity={style.fillOpacity}
            />;
        }

        let crossSectionLngRectangle = null;
        if (activeCell && activeCell.x !== null) {
             const dlng = ( boundingBox.x_max - boundingBox.x_min) / gridSize.n_x; // column width of bounding box grid
             const crossSectionLng = activeCell.x * dlng + boundingBox.x_min;
             crossSectionLngRectangle = <Rectangle
                 bounds={[[boundingBox.y_min, crossSectionLng], [boundingBox.y_max, crossSectionLng + dlng]]}
                 color={style.color}
                 weight={style.weight}
                 opacity={style.opacity}
                 fillColor={style.fillColor}
                 fillOpacity={style.fillOpacity}
             />;
        }

        if (lat && lng) {return (<div>{crossSectionLatRectangle}{crossSectionLngRectangle}</div>);}
        if (lat) {return (<div>{crossSectionLatRectangle}</div>);}
        if (lng) {return (<div>{crossSectionLngRectangle}</div>);}
    }

    render() {
        const { mapPosition } = this.props;

        return (
            <Map className="crossSectionMap" {...mapPosition} onClick={this.handleClick} zoomControl={false} onMoveEnd={this.handleMove}>
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                <LayersControl position="topleft">
                    {this.renderArea()}
                    {this.renderBoundingBox()}
                    {this.renderHeatMap()}
                    {this.renderBoundaries()}
                </LayersControl>

                {this.renderCrossSectionSelection()}
                <button title="reset view" className="button icon-inside resetView" onClick={this.resetView}><Icon name="marker" /></button>
                {this.renderLegend()}
            </Map>
        );
    }
}
