import React from 'react';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';
import {connect} from 'react-redux';
import styleGlobals from 'styleGlobals';
import {withRouter} from 'react-router';
import * as lodash from 'lodash';
import {Command, Query} from '../../t03/actions';
import {Selector} from '../../t03/index';
import {WebData} from '../../core';
import {Routing} from '../actions/index';
import VerticalMenu from '../../components/primitive/VerticalMenu';
import Mt3dms from '../../core/modflow/mt3d/mt3dms';
import MtPackageProperties from '../components/packages/mt/mtPackageProperties';
import AbstractMt3dPackage from '../../core/modflow/mt3d/AbstractMt3dPackage';
import BtnPackageProperties from '../components/packages/mt/btnPackageProperties';
import AdvPackageProperties from '../components/packages/mt/advPackageProperties';
import DspPackageProperties from '../components/packages/mt/dspPackageProperties';
import GcgPackageProperties from '../components/packages/mt/gcgPackageProperties';
import SsmPackageProperties from '../components/packages/mt/ssmPackageProperties';

const styles = {
    container: {
        display: 'flex',
        maxHeight: '100%'
    },

    left: {
        width: styleGlobals.dimensions.gridColumn,
        marginRight: styleGlobals.dimensions.gridGutter,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },

    properties: {
        flex: 1
    },

    searchWrapper: {
        marginBottom: 6
    },

    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10,
        marginTop: 30
    }
};

const sideBar = [
    {
        id: undefined,
        name: 'Overview (MT-Package)'
    },
    {
        id: 'btn',
        name: 'Basic transport package'
    },
    {
        id: 'adv',
        name: 'Advaction package'
    },
    {
        id: 'dsp',
        name: 'Dispersion package'
    },
    {
        id: 'ssm',
        name: 'Source/Sink Package'
    },
    {
        id: 'gcg',
        name: 'Matrix solver package'
    }
];

class ModelEditorTransport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mt3dms: props.mt3dms.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.mt3dms) {
            this.state = {
                mt3dms: nextProps.mt3dms.toObject
            };
        }
    }

    handleChangePackage = (p) => {
        if (p instanceof AbstractMt3dPackage) {
            const newMt3dms = Mt3dms.fromObject(this.state.mt3dms);
            newMt3dms.addPackage(p);
            return this.setState({
                mt3dms: newMt3dms.toObject
            });
        }

        throw new Error('Package hat to be instance of AbstractMt3dPackage');
    };

    handleToggleEnabled = () => {
        const changedMt3dms = Mt3dms.fromObject(this.state.mt3dms);
        changedMt3dms.toggleEnabled();
        return this.setState({
            mt3dms: changedMt3dms.toObject
        });
    };

    onMenuClick = (type) => {
        const {routes, params} = this.props;
        Routing.transportType(routes, params)(type);
    };

    renderProperties() {
        if (!this.state.mt3dms) {
            return null;
        }

        const mt3d = Mt3dms.fromObject(this.state.mt3dms);
        const {model} = this.props;
        const stressPeriods = model.stress_periods;
        const readOnly = !lodash.includes(model.permissions, 'w');
        const {type} = this.props.params;

        switch (type) {
            case 'adv':
                return (
                    <AdvPackageProperties
                        mtPackage={mt3d.getPackage(type)}
                        onChange={this.handleChangePackage}
                        readonly={readOnly}
                    />
                );
            case 'btn':
                return (
                    <BtnPackageProperties
                        mtPackage={mt3d.getPackage(type)}
                        onChange={this.handleChangePackage}
                        readonly={readOnly}
                    />
                );
            case 'dsp':
                return (
                    <DspPackageProperties
                        mtPackage={mt3d.getPackage(type)}
                        onChange={this.handleChangePackage}
                        readonly={readOnly}
                    />
                );
            case 'gcg':
                return (
                    <GcgPackageProperties
                        mtPackage={mt3d.getPackage(type)}
                        onChange={this.handleChangePackage}
                        readonly={readOnly}
                    />
                );
            case 'ssm':
                return (
                    <SsmPackageProperties
                        mtPackage={mt3d.getPackage(type)}
                        stressPeriods={stressPeriods}
                        onChange={this.handleChangePackage}
                        readonly={readOnly}
                    />
                );
            default:
                return (
                    <MtPackageProperties
                        mtPackage={mt3d.getPackage('mt')}
                        onChange={this.handleChangePackage}
                        enabled={mt3d.enabled}
                        toggleEnabled={this.handleToggleEnabled}
                        readonly={readOnly}
                    />
                );
        }
    }

    renderSidebar = () => {
        const {type} = this.props.params;

        return (
            <div style={styles.left}>
                <VerticalMenu
                    activeItem={type}
                    items={sideBar}
                    onClick={this.onMenuClick}
                />
            </div>
        );
    };

    render() {
        return (
            <div style={[styles.container]}>
                {this.renderSidebar()}
                <div style={styles.properties}>
                    <div style={[styles.columnFlex2]}>
                        {this.renderProperties()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, {tool}) => {
    return {
        model: state[tool].model,
        mt3dms: Selector.model.getModflowMt3dms(state[tool]),
        stressPeriods: Selector.stressPeriods.getState(state[tool].model)
    };
};

const actions = {};

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

ModelEditorTransport.propTypes = {
    tool: PropTypes.string,
    model: PropTypes.object,
    mt3dms: PropTypes.instanceOf(Mt3dms),
    params: PropTypes.object.isRequired,
    routes: PropTypes.array
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfiguredRadium(ModelEditorTransport)));
