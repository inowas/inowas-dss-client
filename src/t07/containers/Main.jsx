import { Command, Query } from '../actions';
import React, { Component } from 'react';

import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Input from '../../components/primitive/Input';
import { LayoutComponents } from '../../core/';
import Navbar from '../../containers/Navbar';
import PropTypes from 'prop-types';
import Select from '../../components/primitive/Select';
import { connect } from 'react-redux';
import { getApiKey } from '../../reducers/user';
import { getScenarioAnalysisById } from '../reducers/ScenarioAnalysis';
import { getScenarioModelsByIds } from '../reducers/ScenarioModels';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';
import { withRouter } from 'react-router';
import * as Dashboard from '../../dashboard';

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
        updateScenarioAnalysis: PropTypes.func,
        createScenarioAnalysis: PropTypes.func,
        apiKey: PropTypes.string,
        scenarioAnalysis: PropTypes.object,
        scenarioModels: PropTypes.array
    };

    state = {
        navigation: [],
        scenarioAnalysis: {
            name: 'New Scenario Analysis',
            description: '',
            public: true
        },
        scenarioModels: []
    };

    componentDidMount() {
        const {
            id,
            fetchScenarioAnalysisDetails,
            scenarioAnalysis,
            scenarioModels,
            loadInstances
        } = this.props;
        loadInstances('T03', false);

        if (id) {
            this.setNavigation(id);
            fetchScenarioAnalysisDetails(id);
        }

        // copy scenarioAnalysis to state so we (the user) can edit this local copy
        if (scenarioAnalysis) {
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                scenarioAnalysis
            });
        }

        // copy scenarioModels to state so we can enhance them with selected
        if (scenarioModels) {
            this.setScenarioModels(scenarioModels);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id && nextProps.id !== null) {
            this.setNavigation(nextProps.id);

            nextProps.fetchScenarioAnalysisDetails(nextProps.id);
        }

        // copy scenarioAnalysis to state so we (the user) can edit this local copy
        if (this.props.scenarioAnalysis !== nextProps.scenarioAnalysis) {
            this.setState({
                scenarioAnalysis: nextProps.scenarioAnalysis
            });
        }

        // copy scenarioModels to state so we can enhance them with selected
        if (this.props.scenarioModels !== nextProps.scenarioModels) {
            this.setScenarioModels(nextProps.scenarioModels);
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

    setScenarioModels = scenarioModels => {
        this.setState({
            scenarioModels: scenarioModels.map(scenarioModel => {
                return {
                    ...scenarioModel,
                    selected: scenarioModel.isBaseModel
                };
            })
        });
    };

    saveScenarioAnalysis = () => {
        const { updateScenarioAnalysis, createScenarioAnalysis, routes, params } = this.props;
        const { scenarioAnalysis } = this.state;
        if (scenarioAnalysis.id) {
            updateScenarioAnalysis(scenarioAnalysis.id, scenarioAnalysis);
        } else {
            createScenarioAnalysis(uuid.v4(), scenarioAnalysis, routes, params);
        }
    };

    cloneScenario = id => {
        const { createScenario } = this.props;
        const { scenarioAnalysis } = this.state;
        createScenario(scenarioAnalysis.id, id, uuid.v4());
    };

    deleteScenario = id => {
        const { deleteScenario } = this.props;
        const { scenarioAnalysis } = this.state;
        deleteScenario(scenarioAnalysis.id, id);
    };

    toggleScenarioSelection = id => () => {
        this.setState(prevState => ({
            ...prevState,
            scenarioModels: prevState.scenarioModels.map(scenarioModel => {
                if (scenarioModel.id === id) {
                    return {
                        ...scenarioModel,
                        selected: !scenarioModel.selected
                    };
                }

                return scenarioModel;
            })
        }));
    };

    onScenarioAnalysisPropertyInputChange = property => value => {
        this.setState(prevState => ({
            ...prevState,
            scenarioAnalysis: {
                ...prevState.scenarioAnalysis,
                [property]: value.hasOwnProperty('value') ? value.value : value // dirty fix for react-select-plus returning an object
            }
        }));
    };

    render() {
        const { children, id, apiKey } = this.props;
        const { navigation, scenarioAnalysis, scenarioModels } = this.state;
        return (
            <div className="toolT07 app-width">
                <Navbar links={navigation} />
                {(() => {
                    // if we god an id but no models, than we are still loading
                    if (!id || scenarioModels.length > 0) {
                        return (
                            <div>
                                <h3 style={[styles.heading]}>
                                    <Input
                                        value={scenarioAnalysis.name}
                                        onChange={this.onScenarioAnalysisPropertyInputChange(
                                            'name'
                                        )}
                                        appearance="visibleOnFocus"
                                    />
                                </h3>
                                <div className="grid-container">
                                    <div className="tile col stretch">
                                        <Accordion firstActive={null}>
                                            <AccordionItem heading="Metainformation">
                                                <LayoutComponents.InputGroup label="Description">
                                                    <Input
                                                        value={
                                                            scenarioAnalysis.description
                                                        }
                                                        onChange={this.onScenarioAnalysisPropertyInputChange(
                                                            'description'
                                                        )}
                                                    />
                                                </LayoutComponents.InputGroup>
                                                <LayoutComponents.InputGroup label="Public / Private">
                                                    <Select
                                                        clearable={false}
                                                        value={
                                                            scenarioAnalysis.public
                                                        }
                                                        onChange={this.onScenarioAnalysisPropertyInputChange(
                                                            'public'
                                                        )}
                                                        options={[
                                                            {
                                                                label: 'public',
                                                                value: true
                                                            },
                                                            {
                                                                label:
                                                                    'private',
                                                                value: false
                                                            }
                                                        ]}
                                                    />
                                                </LayoutComponents.InputGroup>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                                {(() => {
                                    if (children && !id) {
                                        // no id provided - look's like the user want's to create a new ScenarioAnalysis
                                        return React.cloneElement(children, {
                                            handleSelectChange: this.onScenarioAnalysisPropertyInputChange('basemodel_id'),
                                            basemodelId: scenarioAnalysis.basemodel_id,
                                            models: this.props.models
                                        });
                                    }
                                    // no children - error
                                    return null;
                                })()}
                                <div className="grid-container">
                                    <div className="tile col stretch">
                                        <Button
                                            onClick={this.saveScenarioAnalysis}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                                {(() => {
                                    if (children && id) {
                                        // inject data into children - children come from /routes.jsx
                                        return React.cloneElement(children, {
                                            scenarioAnalysis,
                                            scenarioModels,
                                            cloneScenario: this.cloneScenario,
                                            deleteScenario: this.deleteScenario,
                                            toggleScenarioSelection: this.toggleScenarioSelection,
                                            apiKey
                                        });
                                    }
                                })()}
                            </div>
                        );
                    }
                    // loading
                    return <div>Loading!</div>;
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
        models: Dashboard.Selector.tool.getTool(
            state.dashboard.tools,
            'T03'
        ).instances,
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
        loadInstances: Dashboard.Modifier.Query.loadInstances,
        fetchScenarioAnalysisDetails: Query.fetchScenarioAnalysisDetails,
        deleteScenario: Command.deleteScenario,
        createScenario: Command.createScenario,
        updateScenarioAnalysis: Command.updateScenarioAnalysis,
        createScenarioAnalysis: Command.createScenarioAnalysis
    })(Main)
);
