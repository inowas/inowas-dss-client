import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {Action} from '../../t03/actions/index';
import {LayoutComponents} from '../../core/index';
import Navbar from '../../containers/Navbar';
import BackgroundMap from './BackgroundMap';
import Sidebar from '../../components/primitive/Sidebar';
import Icon from '../../components/primitive/Icon';
import styleGlobals from 'styleGlobals';
import {Routing} from '../../t03/actions';
import {
    ModelEditorBoundary,
    ModelEditorGeneral,
    ModelEditorModelRun,
    ModelEditorOptimization,
    ModelEditorResults,
    ModelEditorSoilmodel,
    ModelEditorTransport,
} from '../containers/index';


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
    },
    window: {
        width:
        4 * styleGlobals.dimensions.gridColumn +
        3 * styleGlobals.dimensions.gridGutter,
        position: 'relative',
        zIndex: 1100
    }
};

class T03 extends React.Component {

    state = {
        navigation: [
            {
                name: 'Documentation',
                path: 'https://inowas.hydro.tu-dresden.de/tools/t03-modflow-model-setup-and-editor/',
                icon: <Icon name="file"/>
            }
        ]
    };

    componentWillMount() {
        if (this.props.params.said) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    navigation: [
                        ...prevState.navigation,
                        {
                            name: 'Back to scenario analysis',
                            path: '/tools/T07/' + this.props.params.said,
                            icon: <Icon name="layer_horizontal_hatched"/>
                        }
                    ]
                };
            });
        }
    }

    close = () => {
        this.props.router.push(this.props.location.pathname + '#view');
    };

    getMenuItems = (createModel) => [
        {
            title: 'General',
            name: null,
            icon: <Icon name="settings"/>
        },
        {
            title: 'Soilmodel',
            name: 'soilmodel',
            icon: <Icon name="layer_horizontal_hatched"/>,
            disabled: createModel
        },
        {
            title: 'Boundaries',
            name: 'boundaries',
            icon: <Icon name="marker"/>,
            disabled: createModel,
            items: [
                {
                    title: 'Time Variant Specified Head (CHD)',
                    name: 'chd'
                },
                {
                    title: 'General Head SingleOPBoundary (GHB)',
                    name: 'ghb'
                },
                {
                    title: 'Recharge (RCH)',
                    name: 'rch'
                },
                {
                    title: 'River (RIV)',
                    name: 'riv'
                },
                {
                    title: 'Wells (WEL)',
                    name: 'wel'
                },
                {
                    title: 'Head Observation Wells (HOB)',
                    name: 'hob'
                }
            ]
        },
        {
            title: 'Optimization',
            name: 'optimization',
            icon: <Icon name="success"/>,
            disabled: createModel
        },
        {
            title: 'Transport',
            name: 'transport',
            icon: <Icon name="target"/>,
            disabled: createModel
        },
        {
            title: 'Run',
            name: 'model-run',
            icon: <Icon name="calculator"/>,
            disabled: createModel
        },
        {
            title: 'Results',
            name: 'results',
            icon: <Icon name="dataset"/>,
            disabled: createModel
        }
    ];

    renderProperties = (property, tool, type, close) => {
        switch (property) {
            case 'create':
                return (
                    <LayoutComponents.CloseableWindow
                        heading="Create Model"
                        style={styles.window}
                        close={close}
                        closeable={false}
                    >
                        <ModelEditorGeneral tool={tool}/>
                    </LayoutComponents.CloseableWindow>
                );


            case 'soilmodel':
                return (
                    <LayoutComponents.CloseableWindow
                        heading="Soilmodel"
                        style={styles.window}
                        close={close}
                        closeable
                    >
                        <ModelEditorSoilmodel tool={tool}/>
                    </LayoutComponents.CloseableWindow>
                );

            case 'boundaries':
                return (
                    <LayoutComponents.CloseableWindow
                        heading="Boundary Conditions"
                        style={styles.window}
                        close={close}
                        closeable
                    >
                        <ModelEditorBoundary tool={tool}/>
                    </LayoutComponents.CloseableWindow>
                );

            case 'optimization':
                return (
                    <LayoutComponents.CloseableWindow
                        heading="Optimization"
                        style={styles.window}
                        close={close}
                        closeable
                    >
                        <ModelEditorOptimization type={type} tool={tool}/>
                    </LayoutComponents.CloseableWindow>
                );
            case 'transport':
                return (
                    <LayoutComponents.CloseableWindow
                        heading="Transport"
                        style={styles.window}
                        close={close}
                        closeable
                    >
                        <ModelEditorTransport tool={tool}/>
                    </LayoutComponents.CloseableWindow>
                );

            case 'model-run':
                return (
                    <LayoutComponents.CloseableWindow
                        heading="Model Run"
                        style={styles.window}
                        close={close}
                        closeable
                    >
                        <ModelEditorModelRun type={type} tool={tool}/>
                    </LayoutComponents.CloseableWindow>
                );

            case 'results':
                return (
                    <LayoutComponents.CloseableWindow
                        heading="Results"
                        style={styles.window}
                        close={close}
                        closeable
                    >
                        <ModelEditorResults tool={tool}/>
                    </LayoutComponents.CloseableWindow>
                );

            default:
                return (
                    <LayoutComponents.CloseableWindow
                        heading="General Model Properties"
                        style={styles.window}
                        close={close}
                        closeable
                    >
                        <ModelEditorGeneral tool={tool}/>
                    </LayoutComponents.CloseableWindow>
                );
        }
    };

    renderContent() {
        const isVisible =
            this.props.location.hash !== '#edit' &&
            this.props.location.hash !== '#edit-op' &&
            this.props.location.hash !== '#create' &&
            this.props.location.hash !== '#view';

        if (!isVisible) {
            return null;
        }

        const {params, route, routes} = this.props;
        const {id, property, type} = params;
        const {tool} = route;
        const createModel = !id;

        return (
            <div style={styles.wrapper}>
                <div style={styles.overlayWrapper}>
                    <div style={styles.overlay}>
                        <Sidebar
                            title="Menu"
                            items={this.getMenuItems(createModel)}
                            selectedProperty={property}
                            selectedType={type}
                            onClick={Routing.goToPropertyType(routes, params)}
                        />
                        {this.renderProperties(property, tool, type, this.close)}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {navigation} = this.state;
        const {tool} = this.props.route;

        return (
            <div className="toolT03">
                <Navbar links={navigation}/>
                <BackgroundMap tool={tool}/>
                {this.renderContent()}
            </div>
        );
    }
}

T03.propTypes = {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
};

const actions = {
    setModelArea: Action.destroyModflowModel
};

const mapDispatchToProps = (dispatch, {tool}) => {
    const wrappedActions = {};
    for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function() {
                const args = Array.prototype.slice.call(arguments);
                dispatch(actions[key](tool, ...args));
            };
        }
    }

    return wrappedActions;
};


// eslint-disable-next-line no-class-assign
T03 = withRouter(
    connect(null, mapDispatchToProps)(T03)
);

export default T03;
