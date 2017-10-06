import React, { Component } from 'react';

import BoundingBox from '../../model/BoundingBox';
import ConfiguredAxios from 'ConfiguredAxios';
import ConfiguredRadium from 'ConfiguredRadium';
import Coordinate from '../../model/Coordinate';
import Grid from '../../model/Grid';
import Icon from '../../components/primitive/Icon';
import LayerNumber from '../../model/LayerNumber';
import ModflowBoundary from '../../model/ModflowBoundary';
import ModflowCalculationResult from '../../model/ModflowModelResult';
import ModflowLayerValues from '../../model/ModflowLayerValues';
import ModflowModel from '../../model/ModflowModel';
import ModflowModelBoundaries from '../../model/ModflowModelBoundaries';
import Navbar from '../../containers/Navbar';
import PropTypes from 'prop-types';
import ResultType from '../../model/ResultType';
import TimeSeries from '../../model/TimeSeries';
import TimeSeriesResult from '../../model/TimeSeriesResult';
import TotalTimes from '../../model/TotalTimes';
import TwoDData from '../../model/TwoDData';
import { connect } from 'react-redux';
import { getApiKey } from '../../reducers/user';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';
import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';

const styles = {
    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10
    }
};

@ConfiguredRadium
class Main extends Component {
    static propTypes = {
        children: PropTypes.node,
        params: PropTypes.object,
        apiKey: PropTypes.string
    };

    state = {
        navigation: [],
        scenarioAnalysis: {},
        scenarios: {},
        selectedScenarios: []
    };

    componentDidMount() {
        const { params } = this.props;
        this.setNavigation(params.id);
        this.fetchScenarioAnalysisDetails(params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.setNavigation(nextProps.params.id);
            this.fetchScenarioAnalysisDetails(nextProps.params.id);
        }
    }

    setNavigation = id => {
        // only rebuild the navigation array when id has changed, so Navbar doesn't rerender every time
        this.setState({
            navigation: [
                {
                    name: 'Cross section',
                    path: `/tools/T07/${id}/CrossSection`,
                    icon: <Icon name="layer_horizontal_hatched" />
                },
                {
                    name: 'Scenarios difference',
                    path: `/tools/T07/${id}/Difference`,
                    icon: <Icon name="layer_horizontal_hatched" />
                },
                {
                    name: 'Time series',
                    path: `/tools/T07/${id}/TimeSeries`,
                    icon: <Icon name="layer_horizontal_hatched" />
                }
                // {
                //     name: 'Overall budget',
                //     path: 'tools/T07D/' + props.params.id,
                //     icon: <Icon name="layer_horizontal_hatched"/>
                // }
            ]
        });
    };

    fetchScenarioAnalysisDetails(id) {
        const { apiKey } = this.props;
        ConfiguredAxios.get(`/scenarioanalyses/${id}`, {
            headers: { 'X-AUTH-TOKEN': apiKey }
        })
            .then(({ data }) => {
                this.setState(
                    prevState => {
                        const boundingBox = new BoundingBox(
                            new Coordinate(
                                data.bounding_box[0][1],
                                data.bounding_box[0][0]
                            ),
                            new Coordinate(
                                data.bounding_box[1][1],
                                data.bounding_box[1][0]
                            )
                        );
                        // add our fetched data to our state
                        // it will look like
                        // state = {
                        //      scenarioAnalysis: {
                        //          id: {
                        //              id,
                        //              baseModelId, (you can find the according object in scenarios)
                        //              scenarioModelIds: array of ids (you can find the according objects in scenarios)
                        //              boundingBox,
                        //              createdAt,
                        //              area,
                        //              grid,
                        //              name,
                        //              description,
                        //              permission
                        //          }
                        //      },
                        //      scenarios: {
                        //          id: {
                        //              id,
                        //              name,
                        //              description,
                        //              calculationId
                        //          }
                        //      },
                        //      selectedScenarios: array of ids
                        // }
                        return {
                            ...prevState,
                            scenarioAnalysis: {
                                ...prevState.scenarioAnalysis,
                                // add fetched scenarioAnalysis to list of all previously fetched scenarioAnalysis
                                [data.id]: {
                                    id: data.id,
                                    baseModelId: data.base_model.id,
                                    scenarioModelsIds: data.scenarios.map(
                                        scenario => scenario.id
                                    ),
                                    boundingBox,
                                    createdAt: new Date(data.createdAt),
                                    area: data.geometry,
                                    grid: new Grid(
                                        boundingBox,
                                        data.grid_size.n_x,
                                        data.grid_size.n_y
                                    ),
                                    name: data.name,
                                    description: data.description,
                                    permissions: data.permissions
                                }
                            },
                            scenarios: {
                                ...prevState.scenarios,
                                // add base model
                                [data.base_model.id]: {
                                    id: data.base_model.id,
                                    name: data.base_model.name,
                                    description: data.base_model.description,
                                    calculationId:
                                        data.base_model.calculation_id
                                },
                                // add all scenarios
                                ...data.scenarios.reduce((acc, scenario) => {
                                    acc[scenario.id] = {
                                        id: scenario.id,
                                        name: scenario.name,
                                        description: scenario.description,
                                        calculationId: scenario.calculation_id
                                    };
                                    return acc;
                                }, {})
                            },
                            // reset Selection
                            selectedScenarios: [data.base_model.id]
                        };
                    },
                    () => {
                        this.fetchLayerScheme(data.id);
                        this.fetchBoundariesForAllModels();
                        this.fetchTotalTimes(data.id);
                    }
                );
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.error(error);
                // TODO user friendly error handling
            });
    }

    fetchLayerScheme = scenarioAnalysisId => {
        const { apiKey } = this.props;
        const { scenarioAnalysis, scenarios } = this.state;

        const currentScenarioAnalysis = scenarioAnalysis[scenarioAnalysisId];
        const currentBaseModel = scenarios[currentScenarioAnalysis.baseModelId];

        ConfiguredAxios.get(
            `/calculations/${currentBaseModel.calculationId}/results/layervalues`,
            { headers: { 'X-AUTH-TOKEN': apiKey } }
        )
            .then(({ data }) => {
                this.setState(prevState => ({
                    ...prevState,
                    scenarioAnalysis: {
                        ...prevState.scenarioAnalysis,
                        [scenarioAnalysisId]: {
                            ...prevState.scenarioAnalysis[scenarioAnalysisId],
                            layerScheme: data
                        }
                    }
                }));
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.error(error);
                // TODO user friendly error handling
            });
    };

    fetchBoundariesForAllModels = () => {
        const { apiKey } = this.props;
        const { scenarios } = this.state;

        // Create a get request for every scenario without boundaries
        ConfiguredAxios.all(
            Object.keys(scenarios).map(id => {
                if (!scenarios[id].hasOwnProperty('boundaries')) {
                    return ConfiguredAxios.get(
                        `/modflowmodels/${id}/boundaries`,
                        {
                            headers: {
                                'X-AUTH-TOKEN': apiKey
                            },
                            params: {
                                id
                            }
                        }
                    );
                }
                return null;
            })
        )
            .then(results => {
                // write our fetched boundaries into our state
                // we stored the id of the according scenario model in config.params
                results.forEach(result => {
                    this.setState(prevState => ({
                        ...prevState,
                        scenarios: {
                            ...prevState.scenarios,
                            [result.config.params.id]: {
                                ...prevState.scenarios[result.config.params.id],
                                boundaries: result.data
                            }
                        }
                    }));
                });
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.error(error);
                // TODO user friendly error handling
            });
    };

    fetchTotalTimes = scenarioAnalysisId => {
        const { apiKey } = this.props;
        const { scenarioAnalysis, scenarios } = this.state;

        const currentScenarioAnalysis = scenarioAnalysis[scenarioAnalysisId];
        const currentBaseModel = scenarios[currentScenarioAnalysis.baseModelId];

        ConfiguredAxios.get(
            `/calculations/${currentBaseModel.calculationId}/results/times`,
            { headers: { 'X-AUTH-TOKEN': apiKey } }
        )
            .then(({ data }) => {
                this.setState(prevState => ({
                    ...prevState,
                    scenarioAnalysis: {
                        ...prevState.scenarioAnalysis,
                        [scenarioAnalysisId]: {
                            ...prevState.scenarioAnalysis[scenarioAnalysisId],
                            totalTimes: data
                        }
                    }
                }));
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.error(error);
                // TODO user friendly error handling
            });
    };

    cloneScenario = id => {
        console.warn('TODO clone scenario model');
    };

    deleteScenario = id => {
        console.warn('TODO delete scenario model');
    };

    toggleScenarioSelection = id => () => {
        this.setState(prevState => {
            const index = prevState.selectedScenarios.indexOf(id);
            if (index !== -1) {
                return {
                    ...prevState,
                    selectedScenarios: prevState.selectedScenarios.filter(
                        sid => sid !== id
                    )
                };
            }
            return {
                ...prevState,
                selectedScenarios: [...prevState.selectedScenarios, id]
            };
        });
    };

    render() {
        const { children, params, apiKey } = this.props;
        const {
            navigation,
            scenarioAnalysis,
            scenarios,
            selectedScenarios
        } = this.state;
        return (
            <div className="toolT07 app-width">
                <Navbar links={navigation} />
                {(() => {
                    if (scenarioAnalysis.hasOwnProperty(params.id)) {
                        // convert our data structure to something useful
                        const currentScenarioAnalysis =
                            scenarioAnalysis[params.id];
                        const currentBaseModel =
                            scenarios[currentScenarioAnalysis.baseModelId];
                        // TODO constructing an array here will cause unnecessary rerendering
                        const currentScenarios = [
                            currentBaseModel,
                            ...currentScenarioAnalysis.scenarioModelsIds.map(
                                id => scenarios[id]
                            )
                        ];
                        currentScenarios.forEach(scenario => {
                            scenario.selected = selectedScenarios.includes(
                                scenario.id
                            );
                        });

                        return (
                            <div>
                                <h3 style={[styles.heading]}>
                                    T07. Scenario Analysis
                                </h3>
                                <div className="grid-container">
                                    <div className="tile col stretch">
                                        <Accordion firstActive={null}>
                                            <AccordionItem heading="Description">
                                                <p>
                                                    <pre>
                                                        {currentScenarioAnalysis.description || (
                                                            <i>empty</i>
                                                        )}
                                                    </pre>
                                                </p>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                                {children &&
                                    React.cloneElement(children, {
                                        scenarioAnalysis: currentScenarioAnalysis,
                                        scenarios: currentScenarios,
                                        cloneScenario: this.cloneScenario,
                                        deleteScenario: this.deleteScenario,
                                        toggleScenarioSelection: this
                                            .toggleScenarioSelection,
                                        apiKey
                                    })}
                            </div>
                        );
                    }

                    return <div>Loading!</div>;
                })()}
            </div>
        );
    }
}

const mapStateToProps = (state, { params }) => {
    return {
        apiKey: getApiKey(state.user),
        params
    };
};

export default withRouter(connect(mapStateToProps)(Main));
