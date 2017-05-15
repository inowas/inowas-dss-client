import '../../less/leaflet.less';
import '../../less/modelEditorMap.less';

import { CircleMarker, Map, Polygon, Polyline, TileLayer } from 'react-leaflet';
import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import FloatingTitle from './FloatingTitle';
import FloatingTool from './FloatingTool';
import FloatingToolbox from './FloatingToolbox';
import Icon from '../primitive/Icon';
import T03Area from '../../containers/tools/T03Area';
import T03Boundaries from '../../containers/tools/T03Boundaries';
import T03General from '../../containers/tools/T03General';
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
        state: PropTypes.string, // TODO better use oneOf
        setState: PropTypes.func,
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
        activeAreaCoordinate: PropTypes.number,
        setActiveAreaCoordinate: PropTypes.func
    };

    state = {
        // TODO move to container
        properties: [
            {
                slug: 'general',
                name: 'General',
                icon: <Icon name="settings"/>
            }, {
                slug: 'soilmodel',
                name: 'Soilmodel',
                icon: <Icon name="layer_horizontal_hatched"/>
            }, {
                slug: 'boundariesOverlay',
                name: 'Boundaries',
                icon: <Icon name="marker"/>
            }, {
                slug: 'modelRun',
                name: 'Model Run',
                icon: <Icon name="calculator"/>
            }, {
                slug: 'results',
                name: 'Results',
                icon: <Icon name="dataset"/>
            }
        ],

        styles: {
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
            addControlPoint: {
                radius: 7,
                color: 'blue',
                stroke: 0,
                weight: 1,
                fillColor: 'blue',
                fillOpacity: 0.3
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
        this.props.setState( null );
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

    insertAreaCoordinate = ( lat, lng, index ) => {
        return ( ) => {
            this.props.addAreaCoordinate( lat, lng, index );
        };
    }

    renderAreaAddControlPoints( area ) {
        return area.map(( c, index ) => {
            const nextIndex = ( area.length <= index + 1 )
                ? 0
                : ( index + 1 );

            const nextC = area[nextIndex];

            const position = {
                lat: ( c.lat + nextC.lat ) / 2,
                lng: ( c.lng + nextC.lng ) / 2
            };

            return ( <CircleMarker onClick={this.insertAreaCoordinate( position.lat, position.lng, nextIndex )} key={index} center={position} {...this.state.styles.addControlPoint}/> );
        });
    }

    setActiveAreaCoordinate = index => {
        return ( ) => {
            const { setActiveAreaCoordinate, state} = this.props;
            if (state === 'area-edit') {
                setActiveAreaCoordinate( index );
            }
        };
    }

    renderAreaControlPoints( area, activeAreaCoordinate ) {
        return area.map(( c, index ) => {
            return ( <CircleMarker onMouseOver={this.setActiveAreaCoordinate(index)} onMouseOut={this.setActiveAreaCoordinate(null)} onMouseDown={this.coordinateDragStart( index )} key={index} center={c} {...this.state.styles.controlPoint} fillColor={( index === activeAreaCoordinate ) && this.state.styles.activeControlPoint.fillColor}/> );
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
            state,
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

        switch ( state ) {
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
                {( state === 'area-draw' && area.length > 0 && <Polyline positions={[ firstAreaCoordinate, mousePositionOnMap, lastAreaCoordinate ]}/> )}
                {state === 'area-draw' && <CircleMarker center={mousePositionOnMap} {...this.state.styles.controlPoint}/>}
                {state === 'area-edit' && area.length > 0 && this.renderAreaAddControlPoints( area )}
                {[ 'area', 'area-draw', 'area-edit' ].indexOf( state ) !== -1 && this.renderAreaControlPoints( area, activeAreaCoordinate )}
            </Map>
        );
    }

    renderTool( state ) {
        switch ( state ) {
            case 'boundariesOverlay':
                return <T03Boundaries/>;
            case 'initial':
            case 'general':
                return <T03General/>;
            case 'area':
            case 'area-draw':
            case 'area-edit':
                return <T03Area/>;
            default:
                return null;
        }
    }

    renderToolWrapper( state ) {
        const minimized = ( [ 'area', 'area-draw', 'area-edit' ].indexOf( state ) !== -1 );
        const tool = this.renderTool( state );

        if ( tool ) {
            return (
                <FloatingTool minimized={minimized} enableMap={this.enableMap} disableMap={this.disableMap} close={this.unsetActiveTool}>
                    {tool}
                </FloatingTool>
            );
        }

        return null;
    }

    renderTitle( state ) {
        let title;

        switch ( state ) {
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
        const { setState, state } = this.props;
        const { properties } = this.state;

        return (
            <div className="modelEditorMap-wrapper">
                {this.renderMap( )}
                <button style={styles.resetViewButton} title="reset view" className="button icon-inside" onClick={this.centerMapPositionToArea}><Icon name="marker"/></button>
                {this.renderToolWrapper( state )}
                {this.renderTitle( state )}
                {state !== 'initial' && <FloatingToolbox items={properties} onToolClick={setState}/>}
            </div>
        );
    }
}
