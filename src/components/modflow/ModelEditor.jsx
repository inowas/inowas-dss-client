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
import Boundary from '../../model/Boundary';
import BoundaryType from '../../model/BoundaryType';
import {calcBoundsOfPolygon} from "../../calculations/geoTools";
import * as mapHelpers from "../../calculations/map";
import {removeBoundary} from "../../actions/modelEditor";

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
export default class ModelEditor extends Component {

    static propTypes = {
        tool: PropTypes.string.isRequired,
        id: PropTypes.string,
        state: PropTypes.string, // TODO better use oneOf
        setEditorState: PropTypes.func,
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
        updateBoundingBox: PropTypes.func,
        boundaries: PropTypes.array,
        initial: PropTypes.bool,
        activeBoundary: PropTypes.string,
        setActiveBoundary: PropTypes.func,
        addBoundary: PropTypes.func,
        removeBoundary: PropTypes.func,
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
        // const { mapPosition, area, state } = this.props;
        //
        // // center mapPosition to area if no mapPosition is specified
        // if ( mapPosition === null && area.length > 0 ) {
        //     this.centerMapPositionToArea( );
        // }
        //
        // // enable or disable Map depending on state
        // if ( [ 'general', 'boundariesOverlay' ].indexOf( state ) !== -1 ) {
        //     this.disableMap( );
        // } else {
        //     this.enableMap( );
        // }
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

    enableMap = ( ) => {
        mapHelpers.enableMap(this.refs.map);
    };

    disableMap = ( ) => {
        mapHelpers.disableMap(this.refs.map);
    };

    unsetActiveTool = ( ) => {
        this.props.setEditorState( null );
    }

    centerMapPositionToArea = ( ) => {
        const { area } = this.props;
        if ( area.length > 0 ) {
            this.props.setMapPosition({bounds: calcBoundsOfPolygon( area )});
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
        addBoundary( new Boundary(
            uuid(),
            'new Well ' + boundaries.length,
            new BoundaryType('wel'),
            {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            }
        ));
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

    setEditorState = slug => {
        const { setEditorState, updateBoundingBox } = this.props;

        return ( ) => {
            setEditorState( slug );

            if (updateBoundingBox) {
                updateBoundingBox();
            }
        };
    }

    render( ) {
        const { state, initial, setEditorState, setActiveBoundaryType } = this.props;
        const menuItems = [
            {
                name: 'Model Setup',
                icon: <Icon name="settings"/>,
                items: [
                    {
                        name: 'Model Properties',
                        onClick: this.setEditorState( 'general' )
                    }
                ]
            }, {
                name: 'Soil model',
                icon: <Icon name="layer_horizontal_hatched"/>,
                disabled: initial,
                items: [
                    {
                        name: 'Model Layer Setup',
                        onClick: this.setEditorState( null )
                    }, {
                        name: 'Layer Properties',
                        onClick: this.setEditorState( null )
                    }
                ]
            }, {
                name: 'Boundary Conditions',
                icon: <Icon name="marker"/>,
                disabled: initial,
                items: [
                    {
                        name: 'Time Variant Specified Head (CHD)',
                        onClick: () => {
                            setEditorState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'chd' );
                        }
                    }, {
                        name: 'Wells (WEL)',
                        onClick: () => {
                            setEditorState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'wel' );
                        }
                    }, {
                        name: 'Recharge (RCH)',
                        onClick: () => {
                            setEditorState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'rch' );
                        }
                    }, {
                        name: 'River (RIV)',
                        onClick: () => {
                            setEditorState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'riv' );
                        }
                    }, {
                        name: 'General Head Coundary (GHB)',
                        onClick: () => {
                            setEditorState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'ghb' );
                        }
                    }, {
                        name: 'Evapotranspiration (EVT)',
                        onClick: () => {
                            setEditorState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'evt' );
                        }
                    }, {
                        name: 'Drain (DRN)',
                        onClick: () => {
                            setEditorState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'drn' );
                        }
                    }, {
                        name: 'Lake (Lak)',
                        onClick: () => {
                            setEditorState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'lak' );
                        }
                    }, {
                        name: 'Streamflow Routing (SFR2)',
                        onClick: () => {
                            setEditorState( 'boundariesOverlay' );
                            setActiveBoundaryType( 'sfr2' );
                        }
                    }
                ]
            }, {
                name: 'Model Run',
                icon: <Icon name="calculator"/>,
                disabled: initial,
                items: [
                    {
                        name: 'Time Discretization',
                        onClick: this.setEditorState( null )
                    }, {
                        name: 'PCG Solver Parameters',
                        onClick: this.setEditorState( null )
                    }, {
                        name: 'Rewetting Parameters',
                        onClick: this.setEditorState( null )
                    }, {
                        name: 'RUN MODEL',
                        onClick: this.setEditorState( null )
                    }
                ]
            }, {
                name: 'Result Analysis',
                icon: <Icon name="dataset"/>,
                disabled: initial,
                items: [
                    {
                        name: 'View Model Results',
                        onClick: this.setEditorState( null )
                    }, {
                        name: 'Volumetric Budget',
                        onClick: this.setEditorState( null )
                    }, {
                        name: 'Model Calibration',
                        onClick: this.setEditorState( null )
                    }, {
                        name: 'Export Results',
                        onClick: this.setEditorState( null )
                    }
                ]
            }
        ];

        const areaActions = [
            {
                title: 'Add',
                onClick: state === 'area-draw'
                    ? this.setEditorState( 'area' )
                    : this.setEditorState( 'area-draw' ),
                icon: <Icon name={state === 'area-draw'
                        ? 'success'
                        : 'add'}/>
            }, {
                title: 'Edit',
                onClick: state === 'area-edit'
                    ? this.setEditorState( 'area' )
                    : this.setEditorState( 'area-edit' ),
                icon: <Icon name={state === 'area-edit'
                        ? 'success'
                        : 'edit'}/>
            }, {
                title: 'Delete',
                onClick: state === 'area-delete'
                    ? this.setEditorState( 'area' )
                    : this.setEditorState( 'area-delete' ),
                icon: <Icon name={state === 'area-delete'
                        ? 'success'
                        : 'trash'}/>
            }
        ];

        const wellActions = [
            {
                title: 'Add',
                onClick: state === 'wells-add'
                    ? this.setEditorState( 'wells' )
                    : this.setEditorState( 'wells-add' ),
                icon: <Icon name={state === 'wells-add'
                        ? 'success'
                        : 'add'}/>
            }, {
                title: 'Move',
                onClick: state === 'wells-move'
                    ? this.setEditorState( 'wells' )
                    : this.setEditorState( 'wells-move' ),
                icon: <Icon name={state === 'wells-move'
                        ? 'success'
                        : 'marker'}/>
            }, {
                title: 'Edit',
                onClick: state === 'wells-edit'
                    ? this.setEditorState( 'wells' )
                    : this.setEditorState( 'wells-edit' ),
                icon: <Icon name={state === 'wells-edit'
                        ? 'success'
                        : 'edit'}/>
            }, {
                title: 'Delete',
                onClick: state === 'wells-delete'
                    ? this.setEditorState( 'wells' )
                    : this.setEditorState( 'wells-delete' ),
                icon: <Icon name={state === 'wells-delete'
                        ? 'success'
                        : 'trash'}/>
            }
        ];

        const riverActions = [
            {
                title: 'Add',
                onClick: state === 'river-add'
                    ? this.setEditorState( 'river' )
                    : this.setEditorState( 'river-add' ),
                icon: <Icon name={state === 'river-add'
                        ? 'success'
                        : 'add'}/>
            }
        ];

        return (
            <div style={styles.wrapper}>
                {(( ) => {
                    if ( state === null || [ 'general', 'boundariesOverlay' ].indexOf( state ) !== -1 ) {
                        return (
                            <div style={styles.overlayWrapper}>
                                <div style={styles.overlay}>
                                    <Menu style={styles.menu} title="Menu" items={menuItems}/> {this.renderTool( )}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })( )}
                {this.renderToast( )}
            </div>
        );
    }
}
