import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {Action} from '../../t03/actions/index';
import {Properties} from '../../t03/components/index';
import Navbar from '../../containers/Navbar';
import BackgroundMap from './BackgroundMap';
import Sidebar from '../../components/primitive/Sidebar';
import Icon from '../../components/primitive/Icon';
import styleGlobals from 'styleGlobals';
import {Routing} from '../../t03/actions';

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

class T03 extends React.Component {

    state = {
        navigation: []
    };

    componentWillMount() {
        const {said} = this.props.params;
        if (said) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    navigation: [
                        ...prevState.navigation,
                        {
                            name: 'Back to scenario analysis',
                            path: '/tools/T07/' + said,
                            icon: <Icon name="layer_horizontal_hatched"/>
                        }
                    ]
                };
            });
        }
    }

    close = () => {
        // eslint-disable-next-line no-shadow
        const {router, location} = this.props;

        router.push(location.pathname + '#view');
    };

    renderProperties() {
        const isVisible =
            this.props.location.hash !== '#edit' &&
            this.props.location.hash !== '#edit-op' &&
            this.props.location.hash !== '#create' &&
            this.props.location.hash !== '#view';

        if (!isVisible) {
            return null;
        }

        const initial =
            this.props.params.id === undefined || this.props.params.id === null;
        const {params, routes} = this.props;
        const {tool} = this.props.route;

        const menuItems = [
            {
                title: 'General',
                name: null,
                icon: <Icon name="settings"/>
            },
            {
                title: 'Soilmodel',
                name: 'soilmodel',
                icon: <Icon name="layer_horizontal_hatched"/>,
                disabled: initial
            },
            {
                title: 'Boundaries',
                name: 'boundaries',
                icon: <Icon name="marker"/>,
                disabled: initial,
                items: [
                    {
                        title: 'Time Variant Specified Head (CHD)',
                        name: 'chd'
                    },
                    {
                        title: 'General Head Boundary (GHB)',
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
                    }
                ]
            },
            {
                title: 'Run',
                name: 'model-run',
                icon: <Icon name="calculator"/>,
                disabled: initial
            },
            {
                title: 'Results',
                name: 'results',
                icon: <Icon name="dataset"/>,
                disabled: initial
            },
            {
                title: 'Calibration',
                name: 'calibration',
                icon: <Icon name="target"/>,
                disabled: true
            }
        ];

        return (
            <div style={styles.wrapper}>
                <div style={styles.overlayWrapper}>
                    <div style={styles.overlay}>
                        <Sidebar
                            title="Menu"
                            items={menuItems}
                            selectedProperty={this.props.params.property}
                            selectedType={this.props.params.type}
                            onClick={Routing.goToPropertyType(routes, params)}
                        />
                        <Properties
                            selectedProperty={this.props.params.property}
                            close={this.close}
                            tool={tool}
                            type={this.props.params.type}
                        />
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
                {this.renderProperties()}
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
