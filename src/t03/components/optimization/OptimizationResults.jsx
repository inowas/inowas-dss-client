import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {Grid, Button, Progress, Segment, List, Popup, Modal, Tab, Dimmer, Loader} from 'semantic-ui-react';
import Chart from './FitnessChart';
import {
    OPTIMIZATION_STATE_CANCELLED, optimizationHasError, optimizationInProgress
} from "../../selectors/optimization";
import OptimizationSolutionModal from "./OptimizationSolutionModal";
import OptimizationSolution from "../../../core/optimization/OptimizationSolution";
import Stressperiods from "../../../core/modflow/Stressperiods";
import Optimization from "../../../core/optimization/Optimization";
import OptimizationLocallyModal from "./OptimizationLocallyModal";
import OptimizationInput from "../../../core/optimization/OptimizationInput";
import OptimizationObject from "../../../core/optimization/OptimizationObject";

const styles = {
    contentFix: {
        width: 'auto',
        maxWidth: '350px'
    },
    iconFix: {
        width: 'auto',
        height: 'auto'
    },
    inputFix: {
        padding: '0'
    },
    link: {
        cursor: 'pointer'
    },
    popupFix: {
        maxWidth: '350px'
    },
    tableWidth: {
        width: '99%'
    }
};

class OptimizationResultsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            optimization: this.props.optimization.toObject,
            selectedSolution: null,
            createdBoundaries: null,
            localOptimization: null
        };
    }

    componentWillReceiveProps(nextProps) {
        let newActiveIndex = this.state.activeIndex;

        if (this.props.optimization.methods.length !== nextProps.optimization.methods.length) {
            newActiveIndex = nextProps.optimization.methods.length - 1;
        }

        this.setState({
            activeIndex: newActiveIndex,
            optimization: nextProps.optimization.toObject
        });
    }

    onClickApply = (id) => {
        const solution = Optimization.fromObject(this.state.optimization).getSolutionById(id).toObject;

        const boundaries = solution.objects.map(o => {
            return OptimizationObject.fromObject(o).toBoundary(this.props.model.bounding_box, this.props.model.grid_size, this.props.stressPeriods);
        });

        this.setState({
            createdBoundaries: boundaries
        });

        return this.props.onApplySolution(boundaries);
    };

    onClickLocalOptimization = (id) => {
        const solution = Optimization.fromObject(this.state.optimization).getSolutionById(id).toObject;
        return this.setState({
            localOptimization: solution
        });
    };

    onClickDetails = (id) => {
        const solution = Optimization.fromObject(this.state.optimization).getSolutionById(id).toObject;
        return this.setState({
            selectedSolution: solution
        });
    };

    onCancelModal = () => this.setState({
        localOptimization: null,
        selectedSolution: null,
        createdBoundaries: null
    });

    onCalculationStart = (input) => {
        this.onCancelModal();
        this.props.onChangeInput({
            key: 'input',
            value: input
        });
        this.props.onCalculationClick();
    };

    onTabChange = (e, {activeIndex}) => this.setState({activeIndex});

    renderMethodResults(method, mKey, state) {
        return (
            <Tab.Pane attached={false} key={mKey}>
                {method.progress && method.progress.iteration > 0 ?
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Progress
                                    percent={method.progress.final ? 100 : method.progress.calculate()}
                                    progress
                                    indicating={!method.progress.final}
                                    success={method.progress.final}
                                    error={!method.progress.final && optimizationHasError(state)}
                                    warning={!method.progress.final && state === OPTIMIZATION_STATE_CANCELLED}
                                >
                                    Iteration {method.progress.iteration} of {method.progress.iterationTotal}
                                    {method.progress.simulationTotal > 0 ?
                                        <span>
                                            &nbsp;/ Simulation {method.progress.simulation} of {method.progress.simulationTotal}
                                            </span>
                                        :
                                        <span/>
                                    }
                                </Progress>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <section className="stretch">
                                <Chart data={method.progress.toChartData}/>
                            </section>
                        </Grid.Row>
                    </Grid> : <div/>
                }
                {method.solutions.length > 0 ?
                    <Segment style={styles.tableWidth}>
                        <Grid divided="vertically">
                            <Grid.Row columns={3}>
                                <Grid.Column textAlign="center" width={4}>
                                    <b>Solution</b>
                                </Grid.Column>
                                <Grid.Column textAlign="center" width={6}>
                                    <b>Fitness</b>
                                </Grid.Column>
                                <Grid.Column textAlign="center" width={6}/>
                            </Grid.Row>
                            {method.solutions.map((solution, sKey) => (
                                <Grid.Row columns={3} key={sKey}>
                                    <Grid.Column textAlign="center" width={4}>
                                        <Button
                                            onClick={() => this.onClickDetails(solution.id)}
                                        >
                                            Solution {sKey + 1}
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <List>
                                            {
                                                this.props.optimization.input.objectives.map((o, oKey) =>
                                                    <List.Item key={oKey}>
                                                        <Popup
                                                            style={styles.popupFix}
                                                            trigger={<span>Objective {oKey + 1}</span>}>
                                                            <Popup.Content style={styles.contentFix}>
                                                                {o.name}
                                                            </Popup.Content>
                                                        </Popup>: <b>{parseFloat(solution.fitness[oKey]).toFixed(3)}</b>
                                                    </List.Item>
                                                )
                                            }
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column textAlign="center" width={6}>
                                        <Button.Group>
                                            <Button color="blue"
                                                    disabled={optimizationInProgress(this.state.optimization.state)}
                                                    size="small"
                                                    style={styles.iconFix}
                                                    onClick={() => this.onClickApply(solution.id)}
                                            >
                                                Apply
                                            </Button>
                                            <Button.Or/>
                                            <Button color="blue"
                                                    disabled={this.props.model.dirty || optimizationInProgress(this.state.optimization.state)}
                                                    size="small"
                                                    style={styles.iconFix}
                                                    onClick={() => this.onClickLocalOptimization(solution.id)}
                                            >
                                                Optimize Locally
                                            </Button>
                                        </Button.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            ))}
                        </Grid>
                    </Segment> : <div/>
                }
            </Tab.Pane>
        );
    };

    render() {
        const {activeIndex, optimization} = this.state;
        const state = this.props.optimization.state;

        const panes = this.props.optimization.methods.map((method, mKey) => {
            return {
                menuItem: method.name,
                render: () => this.renderMethodResults(method, mKey, state)
            };
        });

        return (
            <LayoutComponents.Column>
                <Grid style={styles.tableWidth}>
                    <Grid.Row columns={3}>
                        <Grid.Column/>
                        <Grid.Column/>
                        <Grid.Column/>
                    </Grid.Row>
                </Grid>
                <Tab menu={{secondary: true, pointing: true}} activeIndex={activeIndex} onTabChange={this.onTabChange}
                     panes={panes} style={styles.tableWidth}/>
                {(optimizationInProgress(optimization.state) && panes.length === 0) ?
                    <Dimmer active inverted>
                        <Loader inverted content='Starting Calculation' />
                    </Dimmer> : <div />
                }
                {this.state.selectedSolution &&
                <OptimizationSolutionModal
                    model={this.props.model}
                    onCancel={this.onCancelModal}
                    stressPeriods={this.props.stressPeriods}
                    solution={OptimizationSolution.fromObject(this.state.selectedSolution)}
                />
                }
                {this.state.localOptimization &&
                <OptimizationLocallyModal
                    onCancel={this.onCancelModal}
                    onCalculationStart={this.onCalculationStart}
                    optimizationInput={OptimizationInput.fromObject(this.state.optimization.input)}
                    solution={OptimizationSolution.fromObject(this.state.localOptimization)}
                />
                }
                {this.state.createdBoundaries &&
                <Modal size={'tiny'} open onClose={this.onCancelModal} dimmer={'inverted'}>
                    <Modal.Header>Solution Applied</Modal.Header>
                    <Modal.Content>
                        <p>The solution has been applied successfully. Following boundaries have been created:</p>
                        <List>
                            {this.state.createdBoundaries.map((boundary, key) =>
                                <List.Item key={key}>{boundary.name} of type {boundary.type}</List.Item>
                            )}
                        </List>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive onClick={this.props.onGoToBoundaryClick}>Go to Boundaries</Button>
                        <Button onClick={this.onCancelModal}>Close</Button>
                    </Modal.Actions>
                </Modal>
                }
            </LayoutComponents.Column>
        );
    }
}

OptimizationResultsComponent.propTypes = {
    onApplySolution: PropTypes.func.isRequired,
    optimization: PropTypes.instanceOf(Optimization).isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    onCalculationClick: PropTypes.func.isRequired,
    onGoToBoundaryClick: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    stressPeriods: PropTypes.instanceOf(Stressperiods),
    errors: PropTypes.array
};

export default pure(ConfiguredRadium(OptimizationResultsComponent));
