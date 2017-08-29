import React from 'react';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';
import * as lodash from 'lodash';
import { Command } from '../../t03/actions';
import { stressPeriods } from '../../t03/selectors';
import { StressPeriodProperties } from '../components';
import { WebData } from '../../core';

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
};

@ConfiguredRadium
class ModelEditorModelRun extends React.Component {

    updateStressPeriods = (data) => {
        const {id} = this.props.params;
        this.props.updateStressPeriods(id, data);
    };

    renderProperties( ) {
        const {
            stressPeriods,
            updateStressPeriodsStatus,
            permissions,
        } = this.props;

        const readOnly = !lodash.includes(permissions, 'w');

        const {type} = this.props.params;

        switch ( type ) {
            case 'times':
                return (
                    <StressPeriodProperties stressPeriods={stressPeriods}
                                    onSave={this.updateStressPeriods}
                                    updateStressPeriodsStatus={updateStressPeriodsStatus}
                                    readOnly={readOnly}
                    /> );
            default:
                return null;
        }
    }

    render() {

        return (
            <div style={[ styles.container ]}>
                <div style={styles.left}>
                </div>
                <div style={styles.properties}>
                    <div style={[ styles.columnFlex2 ]}>
                        {this.renderProperties()}
                    </div>
                </div>
            </div>
        );
    }
}

const actions = {
    updateStressPeriods: Command.updateStressPeriods
};

const mapStateToProps = (state, { tool, params }) => {
    return {
        stressPeriods: stressPeriods.getState(state[ tool ].model),
        permissions: state[ tool ].model.permissions,
        updateStressPeriodsStatus: WebData.Selector.getStatusObject(state, Command.UPDATE_STRESS_PERIODS),
    };
};

const mapDispatchToProps = (dispatch, { tool }) => {
    const wrappedActions = {};
    for ( const key in actions ) {
        if (actions.hasOwnProperty( key )) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function( ) {
                const args = Array.prototype.slice.call( arguments );
                dispatch(actions[key]( tool, ...args ));
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
ModelEditorModelRun = withRouter(connect(mapStateToProps, mapDispatchToProps)(ModelEditorModelRun));

ModelEditorModelRun.propTypes = {
    tool: PropTypes.string.isRequired,
};


export default ModelEditorModelRun;
