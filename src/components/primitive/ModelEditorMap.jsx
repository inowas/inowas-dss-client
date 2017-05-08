import '../../less/leaflet.less';
import '../../less/modelEditorMap.less';

import { CircleMarker, Map, Polygon, Polyline, TileLayer } from 'react-leaflet';
import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import FloatingTitle from './FloatingTitle';
import FloatingTool from './FloatingTool';
import FloatingToolbox from './FloatingToolbox';
import Icon from './Icon';
import T03Area from '../../containers/tools/T03Area';
import T03Boundaries from '../../containers/tools/T03Boundaries';
import T03Setup from '../../containers/tools/T03Setup';
import styleGlobals from 'styleGlobals';

const styles = {
    resetViewButton: {
        zIndex: 1100,
        position: 'absolute',
        top: styleGlobals.dimensions.spacing.large,
        right: styleGlobals.dimensions.spacing.large
    }
};

@ConfiguredRadium
export default class ModelEditorMap extends Component {

    static propTypes = {
        mapMode: PropTypes.string, // TODO better use oneOf
        setMapMode: PropTypes.func,
        addAreaCoordinate: PropTypes.func,
        setMapPosition: PropTypes.func,
        area: PropTypes.array,
        mapPosition: PropTypes.object,
        setMousePositionOnMap: PropTypes.func,
        firstAreaCoordinate: PropTypes.object,
        lastAreaCoordinate: PropTypes.object,
        mousePositionOnMap: PropTypes.object,
        setDraggedAreaCoordinate: PropTypes.func,
        draggedAreaCoordinate: PropTypes.number,
        setAreaLatitude: PropTypes.func,
        setAreaLongitude: PropTypes.func,
        activeAreaCoordinate: PropTypes.object
    };

    state = {
        properties: [
            {
                slug: 'setup',
                name: 'Setup',
                icon: <Icon name="settings"/>
            }, {
                slug: 'boundariesOverlay',
                name: 'Boundaries',
                icon: <Icon name="marker"/>
            }
        ],

        styles: {
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
            hasNoWell: {
                color: '#000',
                weight: 0,
                fillOpacity: 0
            },
            hasWell: {
                color: 'blue',
                weight: 1,
                fillColor: 'darkblue',
                fillOpacity: 1
            },
            controlPoint: {
                radius: 7,
                color: 'blue',
                stroke: 0,
                weight: 1,
                fillColor: 'blue',
                fillOpacity: 0.7
            },
            activeControlPoint: {
                fillColor: 'yellow'
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
    }

    componentDidMount( ) {
        // manually emit a resize event so the leaflet maps recalculate their container size
        const event = document.createEvent( 'HTMLEvents' );
        event.initEvent( 'resize', true, false );
        document.dispatchEvent( event );

        document.addEventListener( 'mouseup', this.coordinateDragEnd );
    }

    componentWillUnmount( ) {
        document.removeEventListener( 'mouseup', this.coordinateDragEnd );
    }

    enableMap = ( ) => {
        if ( this.refs.map ) {
            this.refs.map.leafletElement._handlers.forEach( function( handler ) {
                handler.enable( );
            });
        }
    }

    disableMap = ( ) => {
        if ( this.refs.map ) {
            this.refs.map.leafletElement._handlers.forEach( function( handler ) {
                handler.disable( );
            });
        }
    }

    unsetActiveTool = ( ) => {
        this.props.setMapMode( null );
    }

    addAreaCoordinate = e => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        this.props.addAreaCoordinate( lat, lng );
    };

    centerMapPositionToArea = ( ) => {
        const { area } = this.props;
        if ( area.length > 0 ) {
            this.props.setMapPosition({bounds: this.getBoundsOfPolygone( area )});
        }
    }

    setMapPosition = e => {
        const zoom = e.target.getZoom( );
        const center = e.target.getCenter( );

        this.props.setMapPosition({ center, zoom });
    }

    setMousePosition = e => {
        this.props.setMousePositionOnMap( e.latlng );
    }

    // TODO move to separate file
    getBoundsOfPolygone( polygone ) {
        let minLat = Infinity;
        let maxLat = -Infinity;
        let minLng = Infinity;
        let maxLng = -Infinity;

        polygone.forEach(c => {
            if ( c.lat < minLat ) {
                minLat = c.lat;
            }

            if ( c.lat > maxLat ) {
                maxLat = c.lat;
            }

            if ( c.lng < minLng ) {
                minLng = c.lng;
            }

            if ( c.lng > maxLng ) {
                maxLng = c.lng;
            }
        });

        return [
            {
                lat: minLat,
                lng: minLng
            }, {
                lat: maxLat,
                lng: maxLng
            }
        ];
    }

    updateAreaCoordinate = e => {
        const { draggedAreaCoordinate } = this.props;
        if ( draggedAreaCoordinate !== null ) {
            this.props.setAreaLatitude( draggedAreaCoordinate, e.latlng.lat );
            this.props.setAreaLongitude( draggedAreaCoordinate, e.latlng.lng );
        }
    }

    coordinateDragStart = index => {
        return ( ) => {
            const { draggedAreaCoordinate } = this.props;
            if ( draggedAreaCoordinate === null ) {
                this.refs.map.leafletElement.dragging.disable( );
                this.props.setDraggedAreaCoordinate( index );
            }
        };
    }

    coordinateDragEnd = ( ) => {
        const { draggedAreaCoordinate } = this.props;
        if ( draggedAreaCoordinate !== null ) {
            this.refs.map.leafletElement.dragging.enable( );
            this.props.setDraggedAreaCoordinate( null );
        }
    }

    renderAreaControlPoints( area, activeAreaCoordinate ) {
        return area.map(( c, index ) => {
            return ( <CircleMarker onMouseDown={this.coordinateDragStart( index )} key={index} center={c} {...this.state.styles.controlPoint} fillColor={( index === activeAreaCoordinate ) && this.state.styles.activeControlPoint.fillColor}/> );
        });
    }

    renderArea( area ) {
        if ( area.length > 1 ) {
            return ( <Polygon positions={area} {...this.state.styles.area}/> );
        }
        return null;
    }

    renderMap( ) {
        const {
            mapMode,
            area,
            mapPosition,
            firstAreaCoordinate,
            lastAreaCoordinate,
            mousePositionOnMap,
            activeAreaCoordinate
        } = this.props;

        const handler = {
            onMoveEnd: this.setMapPosition,
            onClick: ( ) => {},
            onMouseMove: ( ) => {}
        };

        switch ( mapMode ) {
            case 'area-draw':
                handler.onClick = this.addAreaCoordinate;
                handler.onMouseMove = this.setMousePosition;
                break;

            case 'area-edit':
                handler.onMouseMove = this.updateAreaCoordinate;
                break;
        }

        return (
            <Map ref="map" {...mapPosition} className="modelEditorMap" zoomControl={false} {...handler}>
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/> {/** <LayersControl position="topleft" /> **/}
                {this.renderArea( area )}
                {( mapMode === 'area-draw' && area.length > 0 && <Polyline positions={[ firstAreaCoordinate, mousePositionOnMap, lastAreaCoordinate ]}/> )}
                {mapMode === 'area-draw' && <CircleMarker center={mousePositionOnMap} {...this.state.styles.controlPoint}/>}
                {[ 'area', 'area-draw', 'area-edit' ].indexOf( mapMode ) !== -1 && this.renderAreaControlPoints( area, activeAreaCoordinate )}
            </Map>
        );
    }

    renderTool( mapMode ) {
        switch ( mapMode ) {
            case 'boundariesOverlay':
                return <T03Boundaries/>;
            case 'setup':
                return <T03Setup/>;
            case 'area':
            case 'area-draw':
            case 'area-edit':
                return <T03Area/>;
            default:
                return null;
        }
    }

    renderToolWrapper( mapMode ) {
        const minimized = ( [ 'area', 'area-draw', 'area-edit' ].indexOf( mapMode ) !== -1 );
        const tool = this.renderTool( mapMode );

        if (tool) {
            return (
                <FloatingTool minimized={minimized} enableMap={this.enableMap} disableMap={this.disableMap} close={this.unsetActiveTool}>
                    {tool}
                </FloatingTool>
            );
        }

        return null;
    }

    renderTitle( mapMode ) {
        let title;

        switch ( mapMode ) {
            case 'area':
                title = 'Edit the area';
                break;
            case 'area-draw':
                title = 'Click the map to set a control point';
                break;
            case 'area-edit':
                title = 'Click, hold and move the control points';
                break;
        }

        return ( <FloatingTitle title={title}/> );
    }

    render( ) {
        const { setMapMode, mapMode } = this.props;
        const { properties } = this.state;

        return (
            <div className="modelEditorMap-wrapper">
                {this.renderMap( )}
                <button style={styles.resetViewButton} title="reset view" className="button icon-inside" onClick={this.centerMapPositionToArea}><Icon name="marker"/></button>
                {this.renderToolWrapper( mapMode )}
                {this.renderTitle( mapMode )}
                <FloatingToolbox items={properties} onToolClick={setMapMode}/>
            </div>
        );
    }
}
