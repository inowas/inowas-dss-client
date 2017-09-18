import React from 'react';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';
import Button from '../../components/primitive/Button';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';
import * as lodash from 'lodash';
import { Command, Query } from '../../t03/actions';
import { stressPeriods } from '../../t03/selectors';
import { StressPeriodProperties } from '../components';
import { WebData } from '../../core';
import RunModelProperties from "../components/runModelProperties";
import ListfileProperties from '../components/ListfileProperties';
import FilterableList from '../../components/primitive/FilterableList';
import { Routing } from '../actions/index';

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


const menu = [
    {
        id: "",
        name: 'Overview'
    },
    {
        id: "times",
        name: 'Time Discretization'
    },
    {
        id: "calculation",
        name: 'Show logs'
    },
    {
        id: "listfile",
        name: 'Show files'
    }
];

@ConfiguredRadium
class ModelEditorModelRun extends React.Component {

    updateStressPeriods = (data) => {
        const {id} = this.props.params;
        this.props.updateStressPeriods(id, data);
    };

    calculateStressPeriods = (start, end, time_unit) => {
        const {id} = this.props.params;
        this.props.calculateStressPeriods(id, start, end, time_unit);
    };

    onMenuClick = (type) => {
        const { routes, params } = this.props;

        Routing.modelRunType(routes, params)(type);
    };

    renderProperties( ) {
        const {
            stressPeriods,
            calculateStressPeriodsStatus,
            updateStressPeriodsStatus,
            getModflowModelCalculationStatus,
            getModflowModelCalculation,
            getListfileStatus,
            getListfile,
            permissions,
            calculation,
        } = this.props;

        const readOnly = !lodash.includes(permissions, 'w');
        const readOnlyScenario = lodash.includes(permissions, 's');

        const {type, id} = this.props.params;

        switch ( type ) {
            case 'calculation':
                return (
                    <RunModelProperties
                        readOnly={readOnly}
                        getModflowModelCalculationStatus={getModflowModelCalculationStatus}
                        getModflowModelCalculation={getModflowModelCalculation}
                        id={id}
                    />
                );
            case 'listfile':
                return (
                    <ListfileProperties
                        getListfileStatus={getListfileStatus}
                        getListfile={getListfile}
                        calculation={calculation}
                    />
                );
            case 'times':
                return (
                    <StressPeriodProperties stressPeriods={stressPeriods}
                                    onSave={this.updateStressPeriods}
                                    onCalculate={this.calculateStressPeriods}
                                    calculateStressPeriodsStatus={calculateStressPeriodsStatus}
                                    updateStressPeriodsStatus={updateStressPeriodsStatus}
                                    readOnly={readOnly || readOnlyScenario}
                    /> );
            default:
                return null;
        }
    }

    render() {
        const {calculateModflowModel, calculateModflowModelStatus, id, permissions} = this.props;
        const readOnly = !lodash.includes(permissions, 'w');

        return (
            <div style={[ styles.container ]}>
                <div style={styles.left}>
                    <FilterableList
                        itemClickAction={this.onMenuClick}
                        list={menu}
                    />
                    {!readOnly &&
                    <WebData.Component.Loading status={calculateModflowModelStatus}>
                        <Button onClick={() => calculateModflowModel(id)}>Calculate</Button>
                    </WebData.Component.Loading>}
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
    updateStressPeriods: Command.updateStressPeriods,
    calculateStressPeriods: Command.calculateStressPeriods,
    calculateModflowModel: Command.calculateModflowModel,
    getModflowModelCalculation: Query.getModflowModelCalculation,
    getListfile: Query.getListfile,
};

const mapStateToProps = (state, { tool, params }) => {
    return {
        stressPeriods: stressPeriods.getState(state[ tool ].model),
        permissions: state[ tool ].model.permissions,
        calculation: state[ tool ].model.calculation,
        calculateStressPeriodsStatus: WebData.Selector.getStatusObject(state, Command.CALCULATE_STRESS_PERIODS),
        updateStressPeriodsStatus: WebData.Selector.getStatusObject(state, Command.UPDATE_STRESS_PERIODS),
        calculateModflowModelStatus: WebData.Selector.getStatusObject(state, Command.CALCULATE_MODFLOW_MODEL),
        getModflowModelCalculationStatus: WebData.Selector.getStatusObject(state, Query.GET_MODFLOW_MODEL_CALCULATION),
        getListfileStatus: WebData.Selector.getStatusObject(state, Query.GET_LISTFILE),
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
