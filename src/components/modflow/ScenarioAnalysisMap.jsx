import '../../less/leaflet.less';
import '../../less/crossSectionMap.less';

import {
    CircleMarker,
    GeoJSON,
    LayerGroup,
    LayersControl,
    Map,
    Rectangle,
    TileLayer
} from 'react-leaflet';
import React, { Component, PropTypes } from 'react';

import Button from '../primitive/Button';
import CanvasHeatMapOverlay from '../../core/leafletCanvasHeatMapOverlay/ReactLeafletHeatMapCanvasOverlay';
import ColorLegend from './ColorLegend';
import ConfiguredRadium from 'ConfiguredRadium';
import Coordinate from '../../model/Coordinate';
import Icon from '../primitive/Icon';
import Rainbow from 'rainbowvis.js';
import ScenarioAnalysisMapData from '../../model/ScenarioAnalysisMapData';
import percentile from 'percentile';
import { sortBy } from 'lodash';
import styleGlobals from 'styleGlobals';

const RadiumMap = ConfiguredRadium(Map);

const styles = {
    wrapper: {
        position: 'relative'
    },

    map: {
        zIndex: 0
    },

    resetViewButton: {
        position: 'absolute',
        top: styleGlobals.dimensions.spacing.small,
        right: styleGlobals.dimensions.spacing.small,
        zIndex: 500
    },

    mapElements: {
        crossSectionSelection: {
            color: '#000',
            weight: 0.5,
            opacity: 0.5,
            fillColor: '#000',
            fillOpacity: 0.5
        },
        inactive: {
            color: '#000',
            weight: 0,
            fillColor: '#000',
            fillOpacity: 0.7
        },
        active: {
            color: '#ff7800',
            weight: 0,
            fillColor: '#000',
            fillOpacity: 0
        },
        boundingBox: {
            color: '#000',
            weight: 0.5,
            fillColor: 'blue',
            fillOpacity: 0.1
        },
        area: {
            color: '#000',
            weight: 0.5,
            fillColor: 'blue',
            fillOpacity: 0.1
        },
        hasNoWell: { color: '#000', weight: 0, fillOpacity: 0 },
        hasWell: {
            color: 'blue',
            weight: 1,
            fillColor: 'darkblue',
            fillOpacity: 1
        },
        wells: {
            cw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkgreen',
                fillOpacity: 0.7
            },
            iw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkgreen',
                fillOpacity: 0.7
            },
            sniw: {
                radius: 5,
                color: 'red',
                weight: 2,
                fillColor: 'darkgreen',
                fillOpacity: 0.7
            },
            puw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkblue',
                fillOpacity: 0.7
            },
            snpw: {
                radius: 5,
                color: 'red',
                weight: 2,
                fillColor: 'darkblue',
                fillOpacity: 0.7
            },
            prw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkblue',
                fillOpacity: 0.7
            },
            smw: {
                radius: 5,
                color: 'black',
                weight: 1,
                fillColor: 'red',
                fillOpacity: 1
            },
            snw: {
                radius: 5,
                color: 'black',
                weight: 1,
                fillColor: 'yellow',
                fillOpacity: 1
            },
            snifw: {
                radius: 5,
                color: '#63b3ea',
                weight: 2,
                fillColor: '#bbdff6',
                fillOpacity: 0.7
            }
        },
        river: {
            color: '#000',
            weight: 0.5,
            fillColor: 'blue',
            fillOpacity: 0
        }
    }
};

// a factory is needed, so we always get a new Instance
// we need a new Instance every time the number range changes because ReactLeafletHeatMapCanvasOverlay must update
function rainbowFactory(numberRange = { min: -50, max: 50 }) {
    const rainbow = new Rainbow();
    rainbow.setSpectrum(
        '#800080',
        '#FF0000',
        '#FFFF00',
        '#00FF00',
        '#00FFFF',
        '#0000FF'
    );
    if (numberRange) {
        rainbow.setNumberRange(numberRange.min, numberRange.max);
    }
    return rainbow;
}

@ConfiguredRadium
export default class ScenarioAnalysisMap extends Component {
    static propTypes = {
        mapData: PropTypes.instanceOf(ScenarioAnalysisMapData).isRequired,
        setMapPosition: PropTypes.func,
        mapPosition: PropTypes.object.isRequired,
        clickCoordinate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        if (
            props.mapData &&
            props.mapData.heatMapData &&
            props.mapData.heatMapData.length > 0
        ) {
            const newHeatMapData = this.restructureHeatMapData(
                props.mapData.heatMapData
            );

            this.state = {
                heatMapData: newHeatMapData,
                rainbow: rainbowFactory({
                    min: props.mapData.globalMin
                        ? props.mapData.globalMin
                        : percentile(5, newHeatMapData, o => o.value).value,
                    max: props.mapData.globalMax
                        ? props.mapData.globalMax
                        : percentile(95, newHeatMapData, o => o.value).value
                })
            };
        } else {
            this.state = {
                rainbow: rainbowFactory()
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.mapData &&
            nextProps.mapData.heatMapData &&
            nextProps.mapData.heatMapData.length > 0 &&
            (!this.props.mapData ||
                !this.props.mapData.heatMapData ||
                nextProps.mapData.heatMapData !==
                    this.props.mapData.heatMapData)
        ) {
            const newHeatMapData = this.restructureHeatMapData(
                nextProps.mapData.heatMapData
            );

            this.setState({
                heatMapData: newHeatMapData,
                rainbow: rainbowFactory({
                    min: nextProps.mapData.globalMin
                        ? nextProps.mapData.globalMin
                        : percentile(5, newHeatMapData, o => o.value).value,
                    max: nextProps.mapData.globalMax
                        ? nextProps.mapData.globalMax
                        : percentile(95, newHeatMapData, o => o.value).value
                })
            });
        }
    }

    // make it a one-dimensional array
    // [{
    //     x, y, value
    // }]
    restructureHeatMapData = heatMapData => {
        const newHeatMapData = [];
        heatMapData.forEach((x, xIndex) => {
            x.forEach((y, yIndex) => {
                if (y) {
                    newHeatMapData.push({
                        x: xIndex,
                        y: yIndex,
                        value: parseFloat(y)
                    });
                }
            });
        });

        return sortBy(newHeatMapData, 'value');
    };

    handleMove = e => {
        const zoom = e.target.getZoom();
        const center = e.target.getCenter();

        this.props.setMapPosition({
            center,
            zoom
        });
    };

    resetView = () => {
        const boundingBox = this.props.mapData.boundingBox;

        this.props.setMapPosition({
            bounds: boundingBox.toArray()
        });
    };

    clickOnMap = e => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        this.props.clickCoordinate(new Coordinate(lat, lng));
    };

    renderHeatMap() {
        const { rainbow, heatMapData } = this.state;
        const { mapData } = this.props;
        if (!rainbow || !heatMapData || !mapData) {
            return null;
        }

        const { boundingBox, grid } = mapData;
        if (!boundingBox || !grid) {
            return null;
        }

        return (
            <LayersControl.Overlay name="Heads" checked>
                <CanvasHeatMapOverlay
                    nX={grid.nX}
                    nY={grid.nY}
                    rainbow={rainbow}
                    dataArray={heatMapData}
                    bounds={boundingBox}
                    opacity={0.5}
                />
            </LayersControl.Overlay>
        );
    }

    renderLegend() {
        const { rainbow, heatMapData } = this.state;

        if (!rainbow || !heatMapData) {
            return null;
        }

        // slice() to make an immuatble copy
        const gradients = rainbow.getGradients().slice().reverse();
        const lastGradient = gradients[gradients.length - 1];
        const legend = gradients.map(gradient => ({
            color: '#' + gradient.getEndColour(),
            value: Number(gradient.getMaxNum()).toFixed(2)
        }));

        legend.push({
            color: '#' + lastGradient.getStartColour(),
            value: Number(lastGradient.getMinNum()).toFixed(2)
        });

        return <ColorLegend legend={legend} />;
    }

    renderBoundaries() {
        const boundaries = this.props.mapData.boundaries;
        if (!boundaries || boundaries.length === 0) {
            return null;
        }

        const wells = boundaries.map((b, index) => {
            if (b.type === 'wel') {
                const geometry = b.geometry;
                const metadata = b.metadata;

                const style = styles.mapElements.wells[metadata.well_type];
                return (
                    <CircleMarker
                        key={index}
                        center={[
                            geometry.coordinates[1],
                            geometry.coordinates[0]
                        ]}
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
            <LayersControl.Overlay name="Wells">
                <LayerGroup>
                    {wells}
                </LayerGroup>
            </LayersControl.Overlay>
        );
    }

    renderBoundingBox() {
        const boundingBox = this.props.mapData.boundingBox.toArray();
        const style = styles.mapElements.boundingBox;

        return (
            <LayersControl.Overlay name="BoundingBox">
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
                <GeoJSON data={area} style={styles.mapElements.area} />
            </LayersControl.Overlay>
        );
    }

    renderXCrossSection() {
        if (!this.props.mapData.xCrossSection) {
            return null;
        }

        const style = styles.mapElements.crossSectionSelection;

        return (
            <Rectangle
                bounds={this.props.mapData.xCrossSection.toArray()}
                color={style.color}
                weight={style.weight}
                opacity={style.opacity}
                fillColor={style.fillColor}
                fillOpacity={style.fillOpacity}
            />
        );
    }

    renderTimeSeriesGridCells() {
        const timeSeriesGridCells = this.props.mapData.timeSeriesGridCells;

        if (!timeSeriesGridCells) {
            return null;
        }

        return timeSeriesGridCells.map((c, index) => {
            return (
                <div key={index}>
                    <Rectangle
                        key={'rectangle_' + index}
                        bounds={c.boundingBox.toArray()}
                        fillColor={c.backgroundColor}
                        fillOpacity={c.opacity}
                        stroke={false}
                    />
                    <CircleMarker
                        key={'circle_' + index}
                        center={c.coordinate.toLatLng()}
                        radius={5}
                        stroke={false}
                        fillColor={c.markerColor}
                        fillOpacity={c.opacity}
                    />
                </div>
            );
        });
    }

    render() {
        const { mapPosition } = this.props;

        return (
            <div style={[styles.wrapper]}>
                <RadiumMap
                    style={styles.map}
                    className="crossSectionMap"
                    {...mapPosition}
                    onClick={this.clickOnMap}
                    zoomControl={false}
                    onMoveEnd={this.handleMove}
                >
                    <TileLayer
                        url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
                    />
                    <LayersControl position="topleft">
                        {this.renderArea()}
                        {this.renderBoundingBox()}
                        {this.renderHeatMap()}
                        {this.renderBoundaries()}
                    </LayersControl>

                    {this.renderTimeSeriesGridCells()}
                    {this.renderXCrossSection()}
                </RadiumMap>
                <Button
                    title="reset view"
                    style={[styles.resetViewButton]}
                    onClick={this.resetView}
                    iconInside
                    icon={<Icon name="marker" />}
                />
                {this.renderLegend()}
            </div>
        );
    }
}
