import React, { Component, PropTypes } from 'react';
import { getGeometry } from '../../reducers/ModelEditor/general';
import {
    getState,
    getMapPosition,
    getMousePositionOnMap,
    getDraggedAreaControlPoint,
    getActiveAreaControlPoint,
    getActiveBoundary,
    getDraggedBoundary,
    getActiveBoundaryControlPoint, getMapState, getView
} from '../../reducers/ModelEditor/ui';

import {setActiveBoundaryType, setEditorState, setView} from "../../actions/modelEditor"
import { getBoundaries } from '../../reducers/ModelEditor/boundaries';
import Properties from '../../components/modflow/Properties';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BackgroundMap from "./BackgroundMap";
import Sidebar from "../../components/primitive/Sidebar"
import Icon from "../../components/primitive/Icon";
import styleGlobals from 'styleGlobals';

const styles = {
    wrapper: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: styleGlobals.dimensions.navBarHeight,
        bottom: 0,
        overflow: 'hidden'
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
    }
};

class T03 extends Component {

    static propTypes = {
        id: PropTypes.string,
        push: PropTypes.func,
        setActiveBoundaryType: PropTypes.func,
        setEditorState: PropTypes.func,
    };

    state = {
        navigation: [ ]
    };

    setEditorState = ( argument ) => {
        return this.props.setEditorState( argument );
    };

    setActiveBoundaryType = ( argument ) => {
        return this.props.setActiveBoundaryType( argument );
    };

    renderProperties() {
        const { id, view } = this.props;
        const initial = ( id === undefined || id === null );

        if (view === 'map') {
            return null;
        }

        const propertiesVisible = this.props.location.hash !== "#edit";

        const menuItems = [
            {
                name: 'General',
                icon: <Icon name="settings"/>,
                onClick: () => {
                    this.setEditorState( 'general' )
                },
                items: [
                    {
                        name: 'Model Properties',
                        onClick: () => {
                            this.setEditorState( 'general' )
                        }
                    }
                ]
            }, {
                name: 'Soilmodel',
                icon: <Icon name="layer_horizontal_hatched"/>,
                onClick: () => {
                    this.setEditorState( 'soilmodel' )
                },
                disabled: initial
            }, {
                name: 'Boundaries',
                icon: <Icon name="marker"/>,
                onClick: () => {
                    this.setEditorState( 'boundaries' )
                },
                disabled: initial,
                items: [
                    {
                        name: 'Time Variant Specified Head (CHD)',
                        onClick: () => {
                            this.setEditorState( 'boundaries' );
                            this.setActiveBoundaryType( 'chd' );
                        }
                    }, {
                        name: 'Wells (WEL)',
                        onClick: () => {
                            this.setEditorState( 'boundaries' );
                            this.setActiveBoundaryType( 'wel' );
                        }
                    }, {
                        name: 'Recharge (RCH)',
                        onClick: () => {
                            this.setEditorState( 'boundaries' );
                            this.setActiveBoundaryType( 'rch' );
                        }
                    }, {
                        name: 'River (RIV)',
                        onClick: () => {
                            this.setEditorState( 'boundaries' );
                            this.setActiveBoundaryType( 'riv' );
                        }
                    }, {
                        name: 'General Head Coundary (GHB)',
                        onClick: () => {
                            this.setEditorState( 'boundaries' );
                            this.setActiveBoundaryType( 'ghb' );
                        }
                    }, {
                        name: 'Evapotranspiration (EVT)',
                        onClick: () => {
                            this.setEditorState( 'boundaries' );
                            this.setActiveBoundaryType( 'evt' );
                        }
                    }, {
                        name: 'Drain (DRN)',
                        onClick: () => {
                            this.setEditorState( 'boundaries' );
                            this.setActiveBoundaryType( 'drn' );
                        }
                    }, {
                        name: 'Lake (Lak)',
                        onClick: () => {
                            this.setEditorState( 'boundariesOverlay' );
                            this.setActiveBoundaryType( 'lak' );
                        }
                    }, {
                        name: 'Streamflow Routing (SFR2)',
                        onClick: () => {
                            this.setEditorState( 'boundaries' );
                            this.setActiveBoundaryType( 'sfr2' );
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
                        onClick: () => {this.setEditorState( null )}
                    }, {
                        name: 'PCG Solver Parameters',
                        onClick: () => {this.setEditorState( null )}
                    }, {
                        name: 'Rewetting Parameters',
                        onClick: () => {this.setEditorState( null )}
                    }, {
                        name: 'RUN MODEL',
                        onClick: () => {this.setEditorState( null )}
                    }
                ]
            }, {
                name: 'Result Analysis',
                icon: <Icon name="dataset"/>,
                disabled: initial,
                items: [
                    {
                        name: 'View Model Results',
                        onClick: () => {this.setEditorState( null )}
                    }, {
                        name: 'Volumetric Budget',
                        onClick: () => {this.setEditorState( null )}
                    }, {
                        name: 'Model Calibration',
                        onClick: () => {this.setEditorState( null )}
                    }, {
                        name: 'Export Results',
                        onClick: () => {this.setEditorState( null )}
                    }
                ]
            }
        ];

        if (propertiesVisible ) {
            return (
                <div style={styles.wrapper}>
                    <div style={styles.overlayWrapper}>
                        <div style={styles.overlay}>
                            <Sidebar title="Menu" items={menuItems} />
                            <Properties {...this.props} initial={initial} tool={'T03'} />
                        </div>
                    </div>
                </div>
            )
        }

        return null;
    }

    render( ) {
        const { navigation } = this.state;

        return (
            <div className="toolT03">
                <Navbar links={navigation} />
                <BackgroundMap tool={'T03'} />
                {this.renderProperties()}
            </div>
        );
    }

}

const mapStateToProps = (state, { params }) => {

    return {
        view: getView( state.T03.ui ),
        state: getState( state.T03.ui ),
        geometry: getGeometry( state.T03.model ),
        mapPosition: getMapPosition( state.T03.ui ),
        mousePositionOnMap: getMousePositionOnMap( state.T03.ui ),
        draggedAreaControlPoint: getDraggedAreaControlPoint( state.T03.ui ),
        activeAreaControlPoint: getActiveAreaControlPoint( state.T03.ui ),
        boundaries: getBoundaries( state.T03.model.boundaries ),
        id: params.id,
        activeBoundary: getActiveBoundary( state.T03.ui ),
        draggedBoundary: getDraggedBoundary( state.T03.ui ),
        activeBoundaryControlPoint: getActiveBoundaryControlPoint( state.T03.ui )
    };
};


const actions = {
    setActiveBoundaryType,
    setEditorState,
    setView
};

const mapDispatchToProps = dispatch => {
    // wrap actions in dispatch and apply T03 as first argument
    const wrappedActions = {};
    for (const key in actions) {
        if(actions.hasOwnProperty(key)) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function() {
                const args = Array.prototype.slice.call(arguments);
                dispatch(actions[key]('T03', ...args));
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
T03 = withRouter( connect( mapStateToProps, mapDispatchToProps )( T03 ));

export default T03;
