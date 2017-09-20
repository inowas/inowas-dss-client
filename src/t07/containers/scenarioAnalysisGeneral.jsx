import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Command, Action, Routing } from '../actions/index';
import { ScenarioAnalysis } from '../selectors/index';
import ConfiguredRadium from 'ConfiguredRadium';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';
import { WebData, LayoutComponents } from '../../core/index';
import uuid from 'uuid';
import * as lodash from 'lodash';
import Button from '../../components/primitive/Button';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';
import { Selector } from '../../dashboard/index';

const styles = {
    columnContainer: {
        display: 'flex'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    mapActionToolbar: {
        textAlign: 'right',
        marginBottom: styleGlobals.dimensions.spacing.medium
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    },

    expandVerticalContainer: {
        display: 'flex',
        flexDirection: 'column'
    },

    expandVertical: {
        flex: 1
    }
};

const initialState = {
    scenarioAnalysis: ScenarioAnalysis.getInitialState()
};

@ConfiguredRadium
class ScenarioAnalysisGeneral extends Component {
    constructor(props) {
        super( props );
        this.state = initialState;
    }

    componentWillMount() {
        const scenarioAnalysis = this.props.scenarioAnalysis
            ? this.props.scenarioAnalysis
            : ScenarioAnalysis.getInitialState();

        this.setState( function (prevState) {
            return {
                ...prevState,
                scenarioAnalysis: scenarioAnalysis
            };
        } );
    }

    componentWillReceiveProps(newProps) {
        this.setState( function (prevState) {
            return {
                ...prevState,
                scenarioAnalysis: newProps.scenarioAnalysis
            };
        } );
    }

    handleSelectChange = name => {
        return data => {
            this.handleInputChange( name )( data ? data.value : undefined );
        };
    };

    handleInputChange(name, key) {
        return value => {
            this.setState( function (prevState) {
                if (key) {
                    return {
                        scenarioAnalysis: {
                            ...prevState.scenarioAnalysis,
                            [ key ]: {
                                ...prevState.scenarioAnalysis[ key ],
                                [ name ]: value.hasOwnProperty( 'value' )
                                    ? value.value
                                    : value // dirty fix for react-select-plus returning an object
                            }
                        }
                    };
                }

                return {
                    scenarioAnalysis: {
                        ...prevState.scenarioAnalysis,
                        [ name ]: value.hasOwnProperty( 'value' )
                            ? value.value
                            : value // dirty fix for react-select-plus returning an object
                    }
                };
            } );
        };
    }

    save(id) {
        const { routes, params } = this.props;

        if (id) {
            this.props.updateScenarioAnalysis(id, this.state.scenarioAnalysis, routes, params);
            return;
        }

        this.props.createScenarioAnalysis(uuid.v4(), this.state.scenarioAnalysis, routes, params);
    }

    render() {
        const {
            getScenarioAnalysisDetailsStatus,
            createScenarioAnalysisStatus,
            updateScenarioAnalysisStatus,
            models
        } = this.props;
        const { id } = this.props.params;
        const { scenarioAnalysis } = this.state;

        if (!scenarioAnalysis) {
            return null;
        }

        // TODO use WebData loading component if ready
        if (id && WebData.Selector.isLoading(getScenarioAnalysisDetailsStatus)) {
            // TODO move to dump component
            return <p>Loading ...</p>;
        }
        if (id && WebData.Selector.hasError(getScenarioAnalysisDetailsStatus)) {
            // TODO move to dump component
            return (
                <p>
                    Error while loading ... ({WebData.Selector.getErrorMessage(getScenarioAnalysisDetailsStatus )})
                </p>
            );
        }

        const readOnly = scenarioAnalysis && !lodash.includes( scenarioAnalysis.permissions, 'w' );

        return (
            <div style={[ styles.columnContainer ]}>
                <LayoutComponents.Column
                    heading="General Properties"
                    style={[ styles.columnNotLast ]}
                >
                    <LayoutComponents.InputGroup label="Name">
                        <Input
                            disabled={readOnly}
                            value={scenarioAnalysis.name}
                            onChange={this.handleInputChange( 'name' )}
                            placeholder="Name"
                        />
                        <Select
                            disabled={readOnly}
                            clearable={false}
                            value={scenarioAnalysis.public}
                            onChange={this.handleSelectChange(
                                'public'
                            )}
                            options={
                                [
                                    { label: 'public', value: true },
                                    { label: 'private', value: false },
                                ]
                            }
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Base Model">
                        <Select
                            disabled={readOnly || !!id}
                            clearable={false}
                            value={scenarioAnalysis.basemodel_id}
                            onChange={this.handleSelectChange(
                                'basemodel_id'
                            )}
                            options={
                                lodash.map( models, v => {return { label: v.name, value: v.id };} )
                            }
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Description">
                        <Input
                            type="textarea"
                            disabled={readOnly}
                            name="description"
                            value={scenarioAnalysis.description}
                            onChange={this.handleInputChange(
                                'description'
                            )}
                            placeholder="Description"
                        />
                    </LayoutComponents.InputGroup>

                    <div style={[ styles.saveButtonWrapper ]}>
                        <WebData.Component.Loading
                            status={
                                id
                                    ? updateScenarioAnalysisStatus
                                    : createScenarioAnalysisStatus
                            }
                        >
                            <Button
                                onClick={() => {
                                    this.save( id );
                                }}
                                type="accent"
                            >
                                {id ? 'Save' : 'Create Scenario Analysis'}
                            </Button>
                        </WebData.Component.Loading>
                    </div>
                </LayoutComponents.Column>
            </div>
        );
    }
}

const mapStateToProps = (state, { tool }) => {
    return {
        scenarioAnalysis: state[ tool ].scenarioAnalysis,
        models: Selector.tool.getTool(
            state.dashboard.tools,
            'T03'
        ).instances,
        getScenarioAnalysisDetailsStatus: WebData.Selector.getRequestStatusByType(
            state,
            Query.GET_SCENARIO_ANALYSIS_DETAILS
        ),
        createScenarioAnalysisStatus: WebData.Selector.getStatusObject(
            state,
            Command.CREATE_SCENARIO_ANALYSIS
        ),
        updateScenarioAnalysisStatus: WebData.Selector.getStatusObject(
            state,
            Command.UPDATE_SCENARIO_ANALYSIS
        )
    };
};

const actions = {
    setScenarioAnalysis: Action.setScenarioAnalysis,
    createScenarioAnalysis: Command.createScenarioAnalysis,
    updateScenarioAnalysis: Command.updateScenarioAnalysis
};

const mapDispatchToProps = (dispatch, { tool }) => {
    const wrappedActions = {};
    for (const key in actions) {
        if (actions.hasOwnProperty( key )) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[ key ] = function () {
                const args = Array.prototype.slice.call( arguments );
                dispatch( actions[ key ]( tool, ...args ) );
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
ScenarioAnalysisGeneral = withRouter(
    connect( mapStateToProps, mapDispatchToProps )( ScenarioAnalysisGeneral )
);

ScenarioAnalysisGeneral.propTypes = {
    style: PropTypes.object,
    createScenarioAnalysis: PropTypes.func,
    updateScenarioAnalysis: PropTypes.func,
    setScenarioAnalysis: PropTypes.func,
    scenarioAnalysis: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
    getScenarioAnalysisDetailsStatus: PropTypes.object,
    createScenarioAnalysisStatus: PropTypes.object,
    updateScenarioAnalysisStatus: PropTypes.object
};

export default ScenarioAnalysisGeneral;
