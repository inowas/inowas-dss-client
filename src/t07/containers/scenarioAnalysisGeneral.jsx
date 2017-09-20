import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Command, Action, Routing } from '../actions/index';
import { ScenarioAnalysis } from '../selectors/index';
import ConfiguredRadium from 'ConfiguredRadium';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import { browserHistory, withRouter } from 'react-router';
import { WebData, LayoutComponents } from '../../core/index';
import uuid from 'uuid';
import * as lodash from 'lodash';
import Button from '../../components/primitive/Button';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';

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
        super(props);
        this.state = initialState;
    }

    componentWillMount() {
        const scenarioAnalysis = this.props.scenarioAnalysis
            ? this.props.scenarioAnalysis
            : ScenarioAnalysis.getInitialState();

        this.setState(function(prevState) {
            return {
                ...prevState,
                scenarioAnalysis: scenarioAnalysis
            };
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState(function(prevState) {
            return {
                ...prevState,
                scenarioAnalysis: newProps.scenarioAnalysis
            };
        });
    }

    componentWillUnmount() {
        this.props.setScenarioAnalysis(this.state.scenarioAnalysis);
    }

    handleSelectChange = name => {
        return data => {
            this.handleInputChange( name )( data ? data.value : undefined );
        };
    };

    handleInputChange(name, key) {
        return value => {
            this.setState(function(prevState) {
                if (key) {
                    return {
                        model: {
                            ...prevState.model,
                            [key]: {
                                ...prevState.model[key],
                                [name]: value.hasOwnProperty('value')
                                    ? value.value
                                    : value // dirty fix for react-select-plus returning an object
                            }
                        }
                    };
                }

                return {
                    model: {
                        ...prevState.model,
                        [name]: value.hasOwnProperty('value')
                            ? value.value
                            : value // dirty fix for react-select-plus returning an object
                    }
                };
            });
        };
    }

    save(id) {
        const {routes, params} = this.props;

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
            updateScenarioAnalysisStatus
        } = this.props;
        const { id } = this.props.params;
        const { scenarioAnalysis } = this.state;

        console.log(this.state);

        if (!scenarioAnalysis) {
            return null;
        }

        const readOnly = scenarioAnalysis && !lodash.includes(scenarioAnalysis.permissions, 'w');

        return (
            <div style={[styles.columnContainer]}>
                <LayoutComponents.Column
                    heading="General Properties"
                    style={[styles.columnNotLast]}
                >
                    <form>
                        <LayoutComponents.InputGroup label="Name">
                            <Input
                                disabled={readOnly}
                                value={scenarioAnalysis.name}
                                onChange={this.handleInputChange('name')}
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

                        <div style={[styles.saveButtonWrapper]}>
                            <WebData.Component.Loading
                                status={
                                    id
                                        ? updateScenarioAnalysisStatus
                                        : createScenarioAnalysisStatus
                                }
                            >
                                <Button
                                    disabled={readOnly}
                                    onClick={() => {
                                        this.save(id);
                                    }}
                                    type="accent"
                                >
                                    {id ? 'Save' : 'Create Scenario Analysis'}
                                </Button>
                            </WebData.Component.Loading>
                        </div>
                    </form>
                </LayoutComponents.Column>

            </div>
        );
    }
}

const mapStateToProps = (state, { tool }) => {
    return {
        scenarioAnalysis: state[tool].scenarioAnalysis,
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
ScenarioAnalysisGeneral = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ScenarioAnalysisGeneral)
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
