import '../../less/leaflet.less';

// TODO break into smaller parts

import { Map, TileLayer } from 'react-leaflet';
import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import EditableArea from './EditableArea';
import EditableWells from './EditableWells';
import EditableLine from './EditableLine';
import FloatingToast from './FloatingToast';
import FloatingMapToolBox from './FloatingMapToolBox';
import Tool from './Tool';
import Menu from '../primitive/Menu';
import Icon from '../primitive/Icon';
import ModelEditorBoundaries from '../../containers/tools/ModelEditorBoundaries';
import ModelEditorGeneral from '../../containers/tools/ModelEditorGeneral';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';

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
    },
    overlayWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    overlay: {
        width: styleGlobals.dimensions.appWidth,
        padding: styleGlobals.dimensions.gridGutter,
        maxHeight: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex'
    },
    menu: {
        width: styleGlobals.dimensions.gridColumn,
        marginLeft: styleGlobals.dimensions.gridGutter,
        marginRight: styleGlobals.dimensions.gridGutter,
        marginBottom: 'auto', // pin element to top
        position: 'relative',
        zIndex: 1100
    },
    tool: {
        width: 4 * styleGlobals.dimensions.gridColumn + 3 * styleGlobals.dimensions.gridGutter,
        marginRight: styleGlobals.dimensions.gridGutter,
        position: 'relative',
        zIndex: 1100
    }
};

@ConfiguredRadium
export default class ModelEditorMap extends Component {

    static propTypes = {
        tool: PropTypes.string.isRequired,
        id: PropTypes.string,
        state: PropTypes.string, // TODO better use oneOf
        setState: PropTypes.func,
        loadModel: PropTypes.func.isRequired,
        loadBoundaries: PropTypes.func.isRequired,
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
        setActiveBoundary: PropTypes.func,
        addBoundary: PropTypes.func,
        deleteBoundary: PropTypes.func,
        draggedBoundary: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        setDraggedBoundary: PropTypes.func,
        updateBoundary: PropTypes.func,
        addBoundaryControlPoint: PropTypes.func,
        updateBoundaryControlPoint: PropTypes.func,
        activeBoundaryControlPoint: PropTypes.number,
        setActiveBoundaryControlPoint: PropTypes.func,
        deleteAreaControlPoint: PropTypes.func
    };

    componentDidMount( ) {
        const { mapPosition, area, state, initial } = this.props;

        // load Model
        if (!initial) {
            this.loadModel();
        }

        // center mapPosition to area if no mapPosition is specified
        if ( mapPosition === null && area.length > 0 ) {
            this.centerMapPositionToArea( );
        }

        // enable or disable Map depending on state
        if ( [ 'general', 'boundariesOverlay' ].indexOf( state ) !== -1 ) {
            this.disableMap( );
        } else {
            this.enableMap( );
        }
    }

    componentDidUpdate( prevProps ) {
        // enable or disable Map depending on state
        const { state } = this.props;
        if ( state !== prevProps.state ) {
            if ( [ 'general', 'boundariesOverlay' ].indexOf( state ) !== -1 ) {
                this.disableMap( );
            } else {
                this.enableMap( );
            }
        }
    }

    loadModel() {
        const { id, loadModel, loadBoundaries } = this.props;
        loadModel( id );
        loadBoundaries( id );
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

    addBoundaryControlPoint = e => {
        const latlng = e.latlng;

        this.props.addBoundaryControlPoint( latlng );
    }

    addWell = e => {
        const { addBoundary, boundaries } = this.props;
        addBoundary({
            name: 'new Well ' + boundaries.length,
            type: 'WEL',
            id: uuid(),
            lat: e.latlng.lat,
            lng: e.latlng.lng
        });
    }

    renderMap( ) {
        const {
            state,
            area,
            mapPosition,
            setState,
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
            setActiveBoundary,
            deleteBoundary,
            draggedBoundary,
            setDraggedBoundary,
            updateBoundary,
            addBoundaryControlPoint,
            updateBoundaryControlPoint,
            activeBoundaryControlPoint,
            setActiveBoundaryControlPoint,
            deleteAreaControlPoint
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
            case 'wells-add':
                handler.onClick = this.addWell;
                handler.onMouseMove = this.setMousePosition;
                break;
            case 'river-draw':
                handler.onMouseMove = this.setMousePosition;
                handler.onClick = this.addBoundaryControlPoint;
                break;
            case 'area-edit':
            case 'wells-move':
            case 'river-edit':
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
                case 'area-delete':
                    return 'delete';
                default:
                    return 'minimal';
            }
        })( );

        const wellsState = (( ) => {
            switch ( state ) {
                case 'wells':
                    return 'default';
                case 'wells-add':
                    return 'add';
                case 'wells-move':
                    return 'move';
                case 'wells-edit':
                    return 'edit';
                case 'wells-delete':
                    return 'delete';
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
                <EditableArea state={areaState} area={area} activeControlPoint={activeAreaControlPoint} setActiveControlPoint={setActiveAreaControlPoint} addControlPoint={addAreaControlPoint} deleteControlPoint={deleteAreaControlPoint} draggedControlPoint={draggedAreaControlPoint} setDraggedControlPoint={setDraggedAreaControlPoint} setControlPointLatitude={setAreaLatitude} setControlPointLongitude={setAreaLongitude} mousePosition={mousePositionOnMap} leafletElement={this.refs.map
                    ? this.refs.map.leafletElement
                    : null}/> {boundaries.filter( b => b.type === 'river' ).map(( r, index ) => {
                        const riverState = (( ) => {
                            if ( r.id === activeBoundary ) {
                                switch ( state ) {
                                    case 'river':
                                        return 'default';
                                    case 'river-draw':
                                        return 'draw';
                                    case 'river-edit':
                                        return 'edit';
                                    default:
                                        return 'minimal';
                                }
                            }
                            return 'minimal';
                        })( );

                        return ( <EditableLine key={index} state={riverState} line={r.geometry} activeControlPoint={activeBoundaryControlPoint} setActiveControlPoint={setActiveBoundaryControlPoint} addControlPoint={addBoundaryControlPoint} draggedControlPoint={draggedBoundary} setDraggedControlPoint={setDraggedBoundary} updateControlPoint={updateBoundaryControlPoint} mousePosition={mousePositionOnMap} leafletElement={this.refs.map
                        ? this.refs.map.leafletElement
                        : null}/> );
                    })}
                <EditableWells setActiveBoundary={setActiveBoundary} deleteBoundary={deleteBoundary} state={wellsState} draggedBoundary={draggedBoundary} setState={setState} setDraggedBoundary={setDraggedBoundary} activeBoundary={activeBoundary} wells={boundaries.filter( b => b.type === 'WEL' )} updateBoundary={updateBoundary} mousePosition={mousePositionOnMap} leafletElement={this.refs.map
                    ? this.refs.map.leafletElement
                    : null}/>
                <button style={styles.resetViewButton} title="reset view" className="button icon-inside" onClick={this.centerMapPositionToArea}><Icon name="marker"/></button>
            </RadiumMap>
        );
    }

    renderTool( ) {
        const { tool, state, initial } = this.props;
        const closeable = !initial;
        switch ( state ) {
            case 'boundariesOverlay':
                return (
                    <Tool heading="Boundary Conditions" style={styles.tool} close={this.unsetActiveTool} closeable={closeable}>
                        <ModelEditorBoundaries tool={tool}/>
                    </Tool>
                );
            case 'general':
                return (
                    <Tool heading="Create Model" style={styles.tool} close={this.unsetActiveTool} closeable={closeable}>
                        <ModelEditorGeneral tool={tool}/>
                    </Tool>
                );
            default:
                return null;
        }
    }

    renderToast( ) {
        const { state } = this.props;
        let text;
        switch ( state ) {
            case 'area':
                text = 'Edit the area';
                break;
            case 'area-draw':
                text = 'Click the map to set a control point';
                break;
            case 'area-edit':
                text = 'Click, hold and move the control points';
                break;
            case 'wells-edit':
                text = 'Click, hold and move the wells';
                break;
            case 'river-edit':
                text = 'Click, hold and move the control points';
                break;
        }

        return (
            <FloatingToast>{text}</FloatingToast>
        );
    }

    setState = slug => {
        const { setState } = this.props;

        return ( ) => {
            setState( slug );
        };
    }

    render( ) {
        const { state, initial, setState, setActiveBoundaryType } = this.props;
        const menuItems = [
            {
                name: 'Model Setup',
                icon: <Icon name="settings"/>,
                items: [
                    {
                        name: 'Model Properties',
                        onClick: this.setState( 'general' )
                    }
                ]
            }, {
                name: 'Soil model',
                icon: <Icon name="layer_horizontal_hatched"/>,
                disabled: initial,
                items: [
                    {
                        name: 'Model Layer Setup',
                        onClick: this.setState( null )
                    }, {
                        name: 'Layer Properties',
                        onClick: this.setState( null )
                    }
                ]
            }, {
                name: 'Boundary Conditions',
                icon: <Icon name="marker"/>,
                disabled: initial,
                items: [
                    {
                        name: 'Time Variant Specified Head',
                        onClick: this.setState( null )
                    }, {
                        name: '(CHD)',
                        onClick: this.setState( null )
                    }, {
                        name: 'Wells (WEL)',
                        onClick: () => {
                            setState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'WEL' );
                        }
                    }, {
                        name: 'Recharge (RCH)',
                        onClick: this.setState( null )
                    }, {
                        name: 'River (RIV)',
                        onClick: this.setState( 'boundariesOverlay' )
                    }, {
                        name: 'General Head Coundary (GHB)',
                        onClick: this.setState( null )
                    }, {
                        name: 'Evapotranspiration (EVT)',
                        onClick: this.setState( null )
                    }, {
                        name: 'Drain (DRN)',
                        onClick: this.setState( null )
                    }, {
                        name: 'Lake (Lak)',
                        onClick: this.setState( null )
                    }, {
                        name: 'Streamflow Routing (SFR2)',
                        onClick: this.setState( null )
                    }
                ]
            }, {
                name: 'Model Run',
                icon: <Icon name="calculator"/>,
                disabled: initial,
                items: [
                    {
                        name: 'Time Discretization',
                        onClick: this.setState( null )
                    }, {
                        name: 'PCG Solver Parameters',
                        onClick: this.setState( null )
                    }, {
                        name: 'Rewetting Parameters',
                        onClick: this.setState( null )
                    }, {
                        name: 'RUN MODEL',
                        onClick: this.setState( null )
                    }
                ]
            }, {
                name: 'Result Analysis',
                icon: <Icon name="dataset"/>,
                disabled: initial,
                items: [
                    {
                        name: 'View Model Results',
                        onClick: this.setState( null )
                    }, {
                        name: 'Volumetric Budget',
                        onClick: this.setState( null )
                    }, {
                        name: 'Model Calibration',
                        onClick: this.setState( null )
                    }, {
                        name: 'Export Results',
                        onClick: this.setState( null )
                    }
                ]
            }
        ];

        const areaActions = [
            {
                title: 'Add',
                onClick: state === 'area-draw'
                    ? this.setState( 'area' )
                    : this.setState( 'area-draw' ),
                icon: <Icon name={state === 'area-draw'
                        ? 'success'
                        : 'add'}/>
            }, {
                title: 'Edit',
                onClick: state === 'area-edit'
                    ? this.setState( 'area' )
                    : this.setState( 'area-edit' ),
                icon: <Icon name={state === 'area-edit'
                        ? 'success'
                        : 'edit'}/>
            }, {
                title: 'Delete',
                onClick: state === 'area-delete'
                    ? this.setState( 'area' )
                    : this.setState( 'area-delete' ),
                icon: <Icon name={state === 'area-delete'
                        ? 'success'
                        : 'trash'}/>
            }
        ];

        const wellActions = [
            {
                title: 'Add',
                onClick: state === 'wells-add'
                    ? this.setState( 'wells' )
                    : this.setState( 'wells-add' ),
                icon: <Icon name={state === 'wells-add'
                        ? 'success'
                        : 'add'}/>
            }, {
                title: 'Move',
                onClick: state === 'wells-move'
                    ? this.setState( 'wells' )
                    : this.setState( 'wells-move' ),
                icon: <Icon name={state === 'wells-move'
                        ? 'success'
                        : 'marker'}/>
            }, {
                title: 'Edit',
                onClick: state === 'wells-edit'
                    ? this.setState( 'wells' )
                    : this.setState( 'wells-edit' ),
                icon: <Icon name={state === 'wells-edit'
                        ? 'success'
                        : 'edit'}/>
            }, {
                title: 'Delete',
                onClick: state === 'wells-delete'
                    ? this.setState( 'wells' )
                    : this.setState( 'wells-delete' ),
                icon: <Icon name={state === 'wells-delete'
                        ? 'success'
                        : 'trash'}/>
            }
        ];

        return (
            <div style={styles.wrapper}>
                {this.renderMap( )}
                {(( ) => {
                    if ( state === null || [ 'general', 'boundariesOverlay' ].indexOf( state ) !== -1 ) {
                        return (
                            <div style={styles.overlayWrapper}>
                                <div style={styles.overlay}>
                                    <Menu style={styles.menu} title="Menu" items={menuItems}/> {this.renderTool( )}
                                </div>
                            </div>
                        );
                    } else if ( [ 'area', 'area-draw', 'area-edit', 'area-delete' ].indexOf( state ) !== -1 ) {
                        return ( <FloatingMapToolBox actions={areaActions} save={this.setState( 'general' )}/> );
                    } else if ( [ 'wells', 'wells-add', 'wells-move', 'wells-edit', 'wells-delete' ].indexOf( state ) !== -1 ) {
                        return ( <FloatingMapToolBox actions={wellActions} save={this.setState( 'boundariesOverlay' )}/> );
                    }
                    return null;
                })( )}
                {this.renderToast( )}
            </div>
        );
    }
}
