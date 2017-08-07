import React, { Component, PropTypes } from 'react';
import {setActiveBoundaryType, setView} from "../../actions/modelEditor"
import { getBoundaries } from '../../reducers/ModelEditor/boundaries';
import Properties from '../../components/modflow/Properties';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';
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
    };

    state = {
        navigation: [ ]
    };

    getToolName = () => ( this.constructor.name );

    pushPropertyToBrowserHistory( property, propertyType) {

        let url = '/tools/' + this.getToolName() + '/' + this.props.params.id + '/' + property;

        if (propertyType) {
            url += '/' + propertyType;
        }

        browserHistory.push(url)
    }

    close = () => {
        browserHistory.push(this.props.location.pathname + '#edit');
    };

    renderProperties() {
        const { id } = this.props;
        const initial = ( id === undefined || id === null );
        const propertiesVisible = this.props.location.hash !== "#edit";
        const menuItems = [
            {
                name: 'General',
                icon: <Icon name="settings"/>,
                onClick: () => {
                    this.pushPropertyToBrowserHistory('general');
                },
            }, {
                name: 'Soilmodel',
                icon: <Icon name="layer_horizontal_hatched"/>,
                onClick: () => {
                    this.pushPropertyToBrowserHistory('soilmodel');
                },
                disabled: initial
            }, {
                name: 'Boundaries',
                icon: <Icon name="marker"/>,
                onClick: () => {
                    this.pushPropertyToBrowserHistory('boundaries');
                },
                disabled: initial,
                items: [
                    {
                        name: 'Time Variant Specified Head (CHD)',
                        onClick: () => {
                            this.pushPropertyToBrowserHistory('boundaries', 'chd');
                        }
                    }, {
                        name: 'Wells (WEL)',
                        onClick: () => {
                            this.pushPropertyToBrowserHistory('boundaries', 'wel');
                        }
                    }, {
                        name: 'Recharge (RCH)',
                        onClick: () => {
                            this.pushPropertyToBrowserHistory('boundaries', 'rch');
                        }
                    }, {
                        name: 'River (RIV)',
                        onClick: () => {
                            this.pushPropertyToBrowserHistory('boundaries', 'riv');
                        }
                    }, {
                        name: 'General Head Coundary (GHB)',
                        onClick: () => {
                            this.pushPropertyToBrowserHistory('boundaries', 'ghb');
                        }
                    }, {
                        name: 'Evapotranspiration (EVT)',
                        onClick: () => {
                            this.pushPropertyToBrowserHistory('boundaries', 'evt');
                        }
                    }, {
                        name: 'Drain (DRN)',
                        onClick: () => {
                            this.pushPropertyToBrowserHistory('boundaries', 'drn');
                        }
                    }, {
                        name: 'Lake (Lak)',
                        onClick: () => {
                            this.pushPropertyToBrowserHistory('boundaries', 'lak');
                        }
                    }, {
                        name: 'Streamflow Routing (SFR2)',
                        onClick: () => {
                            this.pushPropertyToBrowserHistory('boundaries', 'sfr2');
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
                        onClick: () => {this.pushPropertyToBrowserHistory('model-run', 'times');}
                    }, {
                        name: 'PCG Solver Parameters',
                        onClick: () => {this.pushPropertyToBrowserHistory('model-run', 'solver-params');}
                    }, {
                        name: 'Rewetting Parameters',
                        onClick: () => {this.pushPropertyToBrowserHistory('model-run', 'rewetting');}
                    }, {
                        name: 'RUN MODEL',
                        onClick: () => {this.pushPropertyToBrowserHistory('model-run', 'calculation');}
                    }
                ]
            }, {
                name: 'Result Analysis',
                icon: <Icon name="dataset"/>,
                disabled: initial,
                items: [
                    {
                        name: 'View Model Results',
                        onClick: () => {this.pushPropertyToBrowserHistory('results', 'heads');}
                    }, {
                        name: 'Volumetric Budget',
                        onClick: () => {this.pushPropertyToBrowserHistory('results', 'budget');}
                    }, {
                        name: 'Model Calibration',
                        onClick: () => {this.pushPropertyToBrowserHistory('results', 'calibration');}
                    }, {
                        name: 'Export Results',
                        onClick: () => {this.pushPropertyToBrowserHistory('results', 'export');}
                    }
                ]
            }
        ];

        if ( propertiesVisible ) {
            return (
                <div style={styles.wrapper}>
                    <div style={styles.overlayWrapper}>
                        <div style={styles.overlay}>
                            <Sidebar title="Menu" items={menuItems} />
                            <Properties selectedProperty={this.props.params.property || 'general'} close={this.close} tool={this.getToolName()} />
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
                <BackgroundMap tool={this.getToolName()} />
                {this.renderProperties()}
            </div>
        );
    }

}

const mapStateToProps = (state, { params }) => {

    return {
        id: params.id,
        boundaries: getBoundaries( state.T03.model.boundaries ),
    };
};


const actions = {
    setActiveBoundaryType,
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
                dispatch(actions[key](this, ...args));
            };
        }
    }

    return wrappedActions;
};

T03 = withRouter( connect( mapStateToProps, mapDispatchToProps )( T03 ));

export default T03;
