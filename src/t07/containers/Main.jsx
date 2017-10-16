import React, { Component } from 'react';

import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Navbar from '../../containers/Navbar';
import PropTypes from 'prop-types';
import { Query, Command } from '../actions';
import { connect } from 'react-redux';
import { getApiKey } from '../../reducers/user';
import { getScenarioAnalysisById } from '../reducers/ScenarioAnalysis';
import { getScenarioModelsByIds } from '../reducers/ScenarioModels';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';
import uuid from 'uuid';

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
        id: PropTypes.string,
        fetchScenarioAnalysisDetails: PropTypes.func,
        deleteScenario: PropTypes.func,
        createScenario: PropTypes.func,
        apiKey: PropTypes.string,
        scenarioAnalysis: PropTypes.object,
        scenarioModels: PropTypes.array
    };

    state = {
        navigation: [],
        scenarioAnalysis: {},
        scenarios: {},
        selectedScenarios: []
    };

    componentDidMount() {
        const { id, fetchScenarioAnalysisDetails } = this.props;
        if (id) {
            this.setNavigation(id);
            fetchScenarioAnalysisDetails(id);
        }

        // select first scenario
        if (this.props.scenarioModels && this.props.scenarioModels.length > 0) {
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                selectedScenarios: [this.props.scenarioModels[0].id]
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id && nextProps.id !== null) {
            this.setNavigation(nextProps.id);
            nextProps.fetchScenarioAnalysisDetails(nextProps.id);
        }

        // select first sceanrio
        if (
            this.props.scenarioModels !== nextProps.scenarioModels &&
            nextProps.scenarioModels &&
            nextProps.scenarioModels.length > 0
        ) {
            this.setState({
                selectedScenarios: [nextProps.scenarioModels[0].id]
            });
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

    cloneScenario = id => {
        const { scenarioAnalysis, createScenario } = this.props;
        createScenario(scenarioAnalysis.id, id, uuid.v4());
    };

    deleteScenario = id => {
        const { scenarioAnalysis, deleteScenario } = this.props;
        deleteScenario(scenarioAnalysis.id, id);
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
        const {
            children,
            id,
            apiKey,
            scenarioAnalysis,
            scenarioModels
        } = this.props;
        const { navigation, selectedScenarios } = this.state;
        return (
            <div className="toolT07 app-width">
                <Navbar links={navigation} />
                {(() => {
                    if (id) {
                        if (scenarioAnalysis && scenarioModels) {
                            // TODO this causes unecessary rerendering
                            const scenarioModelsEnhancedWithSelected = scenarioModels.map(
                                scenarioModel => ({
                                    ...scenarioModel,
                                    selected: selectedScenarios.includes(
                                        scenarioModel.id
                                    )
                                })
                            );

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
                                                            {scenarioAnalysis.description || (
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
                                            scenarioAnalysis,
                                            scenarioModels: scenarioModelsEnhancedWithSelected,
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
                    }
                    return <div>{children}</div>;
                })()}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const scenarioAnalysis = getScenarioAnalysisById(
        state.T07.ScenarioAnalysis,
        props.params.id
    );
    return {
        apiKey: getApiKey(state.user),
        scenarioAnalysis,
        scenarioModels: scenarioAnalysis
            ? getScenarioModelsByIds(state, props)
            : null,
        id: props.params.id
    };
};

export default withRouter(
    connect(mapStateToProps, {
        fetchScenarioAnalysisDetails: Query.fetchScenarioAnalysisDetails,
        deleteScenario: Command.deleteScenario,
        createScenario: Command.createScenario
    })(Main)
);
