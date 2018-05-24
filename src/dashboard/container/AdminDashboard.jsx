import '../../less/dashboard.less';

import React from 'react';
import PropTypes from 'prop-types';

import ConfiguredRadium from 'ConfiguredRadium';
import {Selector, Modifier} from '../../dashboard';
import Button from '../../components/primitive/Button';
import {Formatter} from '../../core';
import Icon from '../../components/primitive/Icon';
import Input from '../../components/primitive/Input';
import Menu from '../../components/primitive/Menu';
import Navbar from '../../containers/Navbar';
import Popup from '../../components/primitive/Popup';
import Table from '../../components/primitive/table/Table';
import Td from '../../components/primitive/table/Td';
import Tr from '../../components/primitive/table/Tr';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import styleGlobals from 'styleGlobals';
import {includes} from 'lodash';

const styles = {
    menu: {
        width:
        2 * styleGlobals.dimensions.gridColumn +
        styleGlobals.dimensions.gridGutter,
        marginRight: styleGlobals.dimensions.gridGutter
    },

    linkActive: {
        textDecoration: 'underline'
    },

    lastTd: {
        position: 'relative',
        width: 0,
        padding: 0
    },

    actionWrapper: {
        position: 'absolute',
        right: 0,
        width: 500
    },

    actionContent: {
        paddingLeft: 50,
        paddingTop: styleGlobals.dimensions.spacing.small,
        paddingRight: styleGlobals.dimensions.spacing.small,
        paddingBottom: styleGlobals.dimensions.spacing.small - 1,
        background:
        'linear-gradient(to right, transparent, ' +
        styleGlobals.colors.background +
        ' 50px)',
        float: 'right'
    },

    action: {
        marginLeft: styleGlobals.dimensions.spacing.large
    }
};

@ConfiguredRadium
class AdminDashboard extends React.Component {

    state = {
        popupVisible: false,
        navigation: [
            {
                name: 'Documentation',
                path: 'https://inowas.hydro.tu-dresden.de/',
                icon: <Icon name="file"/>
            },
            {
                name: 'Datasets',
                path: 'https://kb.inowas.hydro.tu-dresden.de',
                icon: <Icon name="dataset"/>
            }
        ],
        hoveredInstance: null
    };

    closePopup = () => {
        this.setState({popupVisible: false});
    };

    showPopup = () => {
        this.setState({popupVisible: true});
    };

    render() {
        const {navigation} = this.state;

        return (
            <div className="dashboard">
                <Navbar links={navigation}/>
                <div className="app-width grid-container">
                    ADMIN-DASHBOARD
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {};

AdminDashboard.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
