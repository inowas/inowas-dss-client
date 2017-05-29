import '../../less/leaflet.less';

import { Map, TileLayer } from 'react-leaflet';
import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import EditableArea from './EditableArea';
import EditableWells from './EditableWells';
import FloatingTitle from './FloatingTitle';
import FloatingTool from './FloatingTool';
import FloatingToolbox from './FloatingToolbox';
import Icon from '../primitive/Icon';
import T03Area from '../../containers/tools/T03Area';
import T03Boundaries from '../../containers/tools/T03Boundaries';
import T03Boundary from '../../containers/tools/T03Boundary';
import T03General from '../../containers/tools/T03General';
import styleGlobals from 'styleGlobals';

const RadiumMap = ConfiguredRadium( Map );

const styles = {
    wrapper: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: styleGlobals.dimensions.navBarHeight,
        bottom: 0,
        overflow: 'hidden'
    },
    map: {
        height: '100%',
        position: 'relative'
    },
    resetViewButton: {
        zIndex: 1100,
        position: 'absolute',
        top: styleGlobals.dimensions.spacing.large,
        right: styleGlobals.dimensions.spacing.large
    },
    boundingBox: {
        color: '#000',
        weight: 0.5,
        fillColor: 'blue',
        fillOpacity: 0.1
    },
    river: {
        color: '#000',
        weight: 0.5,
        fillColor: 'blue',
        fillOpacity: 0
    }
};

@ConfiguredRadium
export default class ModelEditorMap extends Component {

    static propTypes = {
        state: PropTypes.string, // TODO better use oneOf
        setState: PropTypes.func,
        addAreaControlPoint: PropTypes.func,
        setMapPosition: PropTypes.func,
        area: PropTypes.array,
        mapPosition: PropTypes.object,
        setMousePositionOnMap: PropTypes.func,
        firstAreaControlPoint: PropTypes.object,
        lastAreaControlPoint: PropTypes.object,
        mousePositionOnMap: PropTypes.object,
        setDraggedAreaControlPoint: PropTypes.func,
        draggedAreaControlPoint: PropTypes.number,
        setAreaLatitude: PropTypes.func,
        setAreaLongitude: PropTypes.func,
        activeAreaControlPoint: PropTypes.number,
        setActiveAreaControlPoint: PropTypes.func,
        boundaries: PropTypes.array,
        initial: PropTypes.bool,
        activeBoundary: PropTypes.string,
        draggedBoundary: PropTypes.string,
        setDraggedBoundary: PropTypes.func,
        updateBoundary: PropTypes.func
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
        ]
    }

    componentDidMount( ) {
        // center mapPosition to area if no mapPosition is specified
        const { mapPosition, area } = this.props;

        if ( mapPosition === null && area.length > 0 ) {
            this.centerMapPositionToArea( );
        }
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

    addAreaControlPoint = e => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        this.props.addAreaControlPoint( lat, lng );
    };

    renderMap( ) {
        const {
            state,
            area,
            mapPosition,
            mousePositionOnMap,
            activeAreaControlPoint,
            addAreaControlPoint,
            setActiveAreaControlPoint,
            draggedAreaControlPoint,
            setDraggedAreaControlPoint,
            setAreaLatitude,
            setAreaLongitude,
            boundaries,
            activeBoundary,
            draggedBoundary,
            setDraggedBoundary,
            updateBoundary
        } = this.props;

        const handler = {
            onMoveEnd: this.setMapPosition,
            onClick: ( ) => {},
            onMouseMove: ( ) => {}
        };
        switch ( state ) {
            case 'area-draw':
                handler.onClick = this.addAreaControlPoint;
                handler.onMouseMove = this.setMousePosition;
                break;
            case 'area-edit':
            case 'wells-edit':
                handler.onMouseMove = this.setMousePosition;
                break;
        }

        const areaState = (( ) => {
            switch ( state ) {
                case 'area':
                    return 'default';
                case 'area-draw':
                    return 'draw';
                case 'area-edit':
                    return 'edit';
                default:
                    return 'minimal';
            }
        })( );

        const wellsState = (( ) => {
            switch ( state ) {
                case 'wells-edit':
                    return 'edit';
                default:
                    return 'minimal';
            }
        })( );

        const mergedWithDefaultsMapPosition = mapPosition
            ? mapPosition
            : {
                center: [
                    0, 0
                ],
                zoom: 2
            };

        return (
            <RadiumMap style={styles.map} ref="map" {...mergedWithDefaultsMapPosition} zoomControl={false} {...handler}>
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/> {/** <LayersControl position="topleft" /> **/}
                <EditableArea state={areaState} area={area} activeControlPoint={activeAreaControlPoint} setActiveControlPoint={setActiveAreaControlPoint} addControlPoint={addAreaControlPoint} draggedControlPoint={draggedAreaControlPoint} setDraggedControlPoint={setDraggedAreaControlPoint} setControlPointLatitude={setAreaLatitude} setControlPointLongitude={setAreaLongitude} mousePosition={mousePositionOnMap} leafletElement={this.refs.map
                    ? this.refs.map.leafletElement
                    : null}/>
                <EditableWells state={wellsState} draggedBoundary={draggedBoundary} setDraggedBoundary={setDraggedBoundary} activeBoundary={activeBoundary} wells={boundaries.filter( b => b.type === 'well' )} updateBoundary={updateBoundary} mousePosition={mousePositionOnMap} leafletElement={this.refs.map
                    ? this.refs.map.leafletElement
                    : null}/>
            </RadiumMap>
        );
    }

    renderTool( state ) {
        switch ( state ) {
            case 'boundariesOverlay':
                return <T03Boundaries/>;
            case 'general':
                return <T03General/>;
            case 'area':
            case 'area-draw':
            case 'area-edit':
                return <T03Area/>;
            case 'wells-edit':
                return <T03Boundary/>;
            default:
                return null;
        }
    }

    renderToolWrapper( state, initial ) {
        const minimized = ( [ 'area', 'area-draw', 'area-edit', 'wells-edit' ].indexOf( state ) !== -1 );
        const closeable = !initial;
        const tool = this.renderTool( state );

        if ( tool ) {
            return (
                <FloatingTool minimized={minimized} enableMap={this.enableMap} disableMap={this.disableMap} close={this.unsetActiveTool} closeable={closeable}>
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
        const { setState, state, initial } = this.props;
        const { properties } = this.state;

        return (
            <div style={styles.wrapper}>
                {this.renderMap( )}
                <button style={styles.resetViewButton} title="reset view" className="button icon-inside" onClick={this.centerMapPositionToArea}><Icon name="marker"/></button>
                {this.renderToolWrapper( state, initial )}
                {this.renderTitle( state )}
                {!initial && <FloatingToolbox items={properties} onToolClick={setState}/>}
            </div>
        );
    }
}
