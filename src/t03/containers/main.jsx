import React, { Component, PropTypes } from 'react';
import {Properties} from '../../t03/components/index';
import Navbar from '../../containers/Navbar';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';
import BackgroundMap from './BackgroundMap';
import Sidebar from '../../components/primitive/Sidebar';
import Icon from '../../components/primitive/Icon';
import styleGlobals from 'styleGlobals';
import {makeMapStateToProps} from '../selectors/mapState';

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

    state = {
        navigation: [ ]
    };

    getToolName = () => ( this.constructor.name );

    pushPropertyToBrowserHistory = ( property, propertyType) => {
        let url = '/tools/' + this.getToolName() + '/' + this.props.params.id;

        if (property) {
            url += '/' + property;
        }

        if (propertyType) {
            url += '/' + propertyType;
        }

        browserHistory.push(url);
    };

    close = () => {
        browserHistory.push(this.props.location.pathname + '#edit');
    };

    renderProperties() {
        const isVisible = this.props.location.hash !== '#edit';

        if ( ! isVisible ) {
            return null;
        }

        const initial = ( this.props.params.id === undefined || this.props.params.id === null );
        const menuItems = [
            {
                title: 'General',
                name: null,
                icon: <Icon name="settings"/>
            }, {
                title: 'Soilmodel',
                name: 'soilmodel',
                icon: <Icon name="layer_horizontal_hatched"/>,
                disabled: initial
            }, {
                title: 'Boundaries',
                name: 'boundaries',
                icon: <Icon name="marker"/>,
                disabled: initial,
                items: [
                    {
                        title: 'Time Variant Specified Head (CHD)',
                        name: 'chd',
                    }, {
                        title: 'General Head Boundary (GHB)',
                        name: 'ghb',
                    }, {
                        title: 'Recharge (RCH)',
                        name: 'rch',
                    }, {
                        title: 'River (RIV)',
                        name: 'riv',
                    }, {
                        title: 'Wells (WEL)',
                        name: 'wel',
                    }
                ]
            }, {
                title: 'Model Run',
                name: 'model-run',
                icon: <Icon name="calculator"/>,
                disabled: initial,
                items: [
                    {
                        title: 'Time Discretization',
                        name: 'times',
                    }, {
                        title: 'RUN MODEL',
                        name: 'calculation',
                    }, {
                        title: 'Show logs',
                        name: 'logs',
                    }, {
                        title: 'Show Namfile',
                        name: 'nam',
                    }

                ]
            }, {
                title: 'Result Analysis',
                name: 'results',
                icon: <Icon name="dataset"/>,
                disabled: initial,
                items: [
                    {
                        title: 'View Model Results',
                        name: 'heads',
                    }, {
                        title: 'Volumetric Budget',
                        name: 'budget',
                    }, {
                        title: 'Model Calibration',
                        name: 'calibration',
                    }, {
                        title: 'Export Results',
                        name: 'export',
                    }
                ]
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
                            onClick={this.pushPropertyToBrowserHistory}
                        />
                        <Properties selectedProperty={this.props.params.property} close={this.close}
                                    tool={this.getToolName()}/>
                    </div>
                </div>
            </div>
        );
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

T03 = withRouter(( T03 ));

export default T03;
