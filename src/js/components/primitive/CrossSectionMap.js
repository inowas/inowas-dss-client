import React, { PropTypes, Component } from 'react';

import { Map, TileLayer, Rectangle, GeoJSON, ImageOverlay, CircleMarker, LayersControl, LayerGroup } from 'react-leaflet';

import Coordinate from '../../model/Coordinate';

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
        clickCoordinate: PropTypes.func.isRequired
    };

    state = {
        styles: {
            crossSectionSelection: {color: '#000', weight: 0.5, opacity: 0.5, fillColor: '#000', fillOpacity: 0.5},
            inactive: {color: '#000', weight: 0, fillColor: '#000', fillOpacity: 0.7},
            active: {color: '#ff7800', weight: 0, fillColor: '#000', fillOpacity: 0},
            boundingBox: {color: '#000', weight: 0.5, fillColor: 'blue', fillOpacity: 0.1},
            area: {color: '#000', weight: 0.5, fillColor: 'blue', fillOpacity: 0.1},
            hasNoWell: {color: '#000', weight: 0, fillOpacity: 0},
            hasWell: {color: 'blue', weight: 1, fillColor: 'darkblue', fillOpacity: 1},
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
        const boundingBox = this.props.mapData.boundingBox;

        this.props.updateBounds(boundingBox.toArray());
    };

    clickOnMap = e => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        this.props.clickCoordinate(new Coordinate(lat, lng));
    };

    renderHeatMap() {
        if (this.props.mapData.imgUrl === null) {
            return null;
        }

        const boundingBox = this.props.mapData.boundingBox.toArray();

        return (
            <LayersControl.Overlay name="Heads" checked>
                <ImageOverlay url={this.props.mapData.imgUrl} bounds={boundingBox} opacity={0.5}/>
            </LayersControl.Overlay>
        );
    }

    renderLegend() {
        const legend = this.props.mapData.legend;

        if (legend === null) {
            return  null;
        }

        return (
            <ColorLegend legend={legend} />
        );
    }

    renderBoundaries() {
        const boundaries = this.props.mapData.boundaries;
        if (boundaries.length === 0) {
            return null;
        }

        const wells = boundaries.map( b => {
            if (b.type === 'well') {
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
            return null;
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
        const boundingBox = this.props.mapData.boundingBox.toArray();
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
        const area = this.props.mapData.area;
        return (
            <LayersControl.Overlay name="Area" checked>
                <GeoJSON data={area} style={this.state.styles.area} />
            </LayersControl.Overlay>
        );
    }

    renderXCrossSection() {
        if(!this.props.mapData.xCrossSection) {
            return null;
        }

        const style = this.state.styles.crossSectionSelection;

        return (<Rectangle
            bounds={this.props.mapData.xCrossSection.toArray()}
            color={style.color}
            weight={style.weight}
            opacity={style.opacity}
            fillColor={style.fillColor}
            fillOpacity={style.fillOpacity}
        />);
    }

    render() {
        const { mapPosition } = this.props;

        return (
            <Map className="crossSectionMap" {...mapPosition} onClick={this.clickOnMap} zoomControl={false} onMoveEnd={this.handleMove}>
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                <LayersControl position="topleft">
                    {this.renderArea()}
                    {this.renderBoundingBox()}
                    {this.renderHeatMap()}
                    {this.renderBoundaries()}
                </LayersControl>

                {this.renderXCrossSection()}
                <button title="reset view" className="button icon-inside resetView" onClick={this.resetView}><Icon name="marker" /></button>
                {this.renderLegend()}
            </Map>
        );
    }
}
