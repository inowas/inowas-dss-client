import React from 'react';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';
import Button from '../../components/primitive/Button';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';
import * as lodash from 'lodash';
import { Command, Query } from '../../t03/actions';
import { Selector } from '../../t03/index';
import { StressPeriodProperties, CalculationStatus, RunModelOverview } from '../components';
import { WebData } from '../../core';
import RunModelProperties from '../components/runModelProperties';
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

    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10,
        marginTop: 30
    }
};


const menu = [
    {
        id: '',
        name: 'Overview'
    },
    {
        id: 'times',
        name: 'Time Discretization'
    },
    {
        id: 'calculation',
        name: 'Show logs'
    },
    {
        id: 'files',
        name: 'Show files'
    }
];

@ConfiguredRadium
class ModelEditorModelRun extends React.Component {

    updateStressPeriods = (data) => {
        const {id} = this.props.params;
        this.props.updateStressPeriods(id, data);
    };

    calculateStressPeriods = (start, end, timeUnit) => {
        const {id} = this.props.params;
        this.props.calculateStressPeriods(id, start, end, timeUnit);
    };

    onMenuClick = (type) => {
        const { routes, params } = this.props;

        Routing.modelRunType(routes, params)(type);
    };

    loadFile = (file) => {
        const { model, getFile } = this.props;
        const calculationId = model.calculation.calculation_id;

        if (!file || !calculationId) {
            return;
        }

        getFile( calculationId, lodash.last(lodash.split(file, '.')) );
    };

    renderProperties( ) {
        const {
            stressPeriods,
            calculateStressPeriodsStatus,
            updateStressPeriodsStatus,
            getFileStatus,
            model,
            routes,
            params
        } = this.props;

        const readOnly = !lodash.includes(model.permissions, 'w');
        const readOnlyScenario = lodash.includes(model.permissions, 's');

        const {type, id} = this.props.params;

        switch ( type ) {
            case 'calculation':
                return (
                    <RunModelProperties
                        readOnly={readOnly}
                        calculation={model.calculation}
                        id={id}
                    />
                );
            case 'files':
                return (
                    <ListfileProperties
                        getFileStatus={getFileStatus}
                        loadFile={this.loadFile}
                        files={model.calculation.files || []}
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
                return <RunModelOverview model={model} route={Routing.goToProperty(routes, params)} routeType={Routing.goToPropertyType(routes, params)}/>;
        }
    }

    render() {
        const {calculateModflowModel, calculateModflowModelStatus, model, stopPolling} = this.props;
        const {id} = this.props.params;
        const readOnly = !lodash.includes(model.permissions, 'w');

        const canCancel = WebData.Selector.isStatusLoading(calculateModflowModelStatus)
            && model.calculation.state !== Selector.model.CALCULATION_STATE_NEW;

        return (
            <div style={[ styles.container ]}>
                <div style={styles.left}>
                    <FilterableList
                        itemClickAction={this.onMenuClick}
                        list={menu}
                    />
                    {!readOnly && !canCancel &&
                    <WebData.Component.Loading status={calculateModflowModelStatus}>
                        <Button type="full" onClick={() => calculateModflowModel(id)}>Calculate</Button>
                    </WebData.Component.Loading>}
                    {canCancel &&
                    <Button type="full" onClick={stopPolling}>Cancel calculation</Button>}
                    <h3 style={[styles.heading]}>
                        Calculation Status
                    </h3>
                    <CalculationStatus calculation={model.calculation} />
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
    getFile: Query.getFile,
    stopPolling: Query.stopGetModflowModelCalculation,
};

const mapStateToProps = (state, { tool, params }) => {
    return {
        stressPeriods: Selector.stressPeriods.getState(state[ tool ].model),
        model: state[ tool ].model,
        calculateStressPeriodsStatus: WebData.Selector.getStatusObject(state, Command.CALCULATE_STRESS_PERIODS),
        updateStressPeriodsStatus: WebData.Selector.getStatusObject(state, Command.UPDATE_STRESS_PERIODS),
        calculateModflowModelStatus: WebData.Selector.getStatusObject(state, Command.CALCULATE_MODFLOW_MODEL),
        getFileStatus: WebData.Selector.getStatusObject(state, Query.GET_FILE),
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
    tool: PropTypes.string,
    getFile: PropTypes.func,
    calculateStressPeriods: PropTypes.func,
    calculateStressPeriodsStatus: PropTypes.func,
    calculateModflowModel: PropTypes.func,
    calculateModflowModelStatus: PropTypes.func,
    calculation: PropTypes.object,
    getFileStatus: PropTypes.func,
    model: PropTypes.object,
    params: PropTypes.object,
    routes: PropTypes.object,
    stopPolling: PropTypes.func,
    stressPeriods: PropTypes.object,
    updateStressPeriods: PropTypes.func,
    updateStressPeriodsStatus: PropTypes.func
};


export default ModelEditorModelRun;
