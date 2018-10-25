import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {Grid, Button, Progress, Segment, List, Popup, Modal} from 'semantic-ui-react';
import Chart from './FitnessChart';
import {
    OPTIMIZATION_STATE_CANCELLED,
    getMessage, optimizationHasError
} from "../../selectors/optimization";
import OptimizationSolutionModal from "./OptimizationSolutionModal";
import OptimizationSolution from "../../../core/optimization/OptimizationSolution";
import Stressperiods from "../../../core/modflow/Stressperiods";
import Optimization from "../../../core/optimization/Optimization";
import OptimizationLocallyModal from "./OptimizationLocallyModal";
import OptimizationInput from "../../../core/optimization/OptimizationInput";
import OptimizationObject from "../../../core/optimization/OptimizationObject";

const styles = {
    iconfix: {
        width: 'auto',
        height: 'auto'
    },
    inputfix: {
        padding: '0'
    },
    link: {
        cursor: 'pointer'
    },
    tablewidth: {
        width: '99%'
    }
};

class OptimizationResultsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            optimization: this.props.optimization.toObject,
            selectedSolution: null,
            createdBoundaries: null,
            localOptimization: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            optimization: nextProps.optimization.toObject
        });
    }

    onClickApply = (id) => {
        const solution = this.state.optimization.solutions.filter(s => s.id === id)[0];

        const boundaries = solution.objects.map(o => {
            return OptimizationObject.fromObject(o).toBoundary(this.props.model.bounding_box, this.props.model.grid_size, this.props.stressPeriods);
        });

        this.setState({
            createdBoundaries: boundaries
        });

        return this.props.onApplySolution(boundaries);
    };

    onClickLocalOptimization = (key) => {
        return this.setState({
            localOptimization: this.state.optimization.solutions[key]
        });
    };

    onClickDetails = (key) => {
        return this.setState({
            selectedSolution: this.state.optimization.solutions[key]
        });
    };

    onCancelModal = () => {
        return this.setState({
            localOptimization: null,
            selectedSolution: null,
            createdBoundaries: null
        });
    };

    onCalculationStart = (input) => {
        this.onCancelModal();
        this.props.onChangeInput({
            key: 'input',
            value: input
        });
        this.props.onCalculationClick();
    };

    render() {
        const state = this.props.optimization.state;

        return (
            <LayoutComponents.Column>
                <Grid style={styles.tablewidth}>
                    <Grid.Row columns={3}>
                        <Grid.Column/>
                        <Grid.Column textAlign="center">
                            State: {getMessage(state)}
                        </Grid.Column>
                        <Grid.Column/>
                    </Grid.Row>
                    {this.props.optimization.methods.map(method =>
                        <div>
                            {method.progress && method.progress.iteration > 0 ?
                                <div>
                                    <Grid.Row columns={1}>
                                        <Grid.Column>
                                            <Progress
                                                percent={method.progress.calculate()}
                                                progress
                                                indicating={!method.progress.final}
                                                success={method.progress.final}
                                                error={!method.progress.final && optimizationHasError(state)}
                                                warning={!method.progress.final && state === OPTIMIZATION_STATE_CANCELLED}
                                            >
                                                Iteration {method.progress.iteration} of {method.progress.iterationTotal} /
                                                {method.progress.simulationTotal > 0 ?
                                                    <span>
                                                    Simulation {method.progress.simulation} of {method.progress.simulationTotal}
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
                                </div> : <div/>
                            }
                            {method.solutions.length > 0 ?
                                <Segment style={styles.tablewidth}>
                                    <Grid divided="vertically">
                                        <Grid.Row columns={3}>
                                            <Grid.Column textAlign="center">
                                                <b>Solution</b>
                                            </Grid.Column>
                                            <Grid.Column textAlign="center">
                                                <b>Fitness</b>
                                            </Grid.Column>
                                            <Grid.Column textAlign="center"/>
                                        </Grid.Row>
                                        {method.solutions.map((solution, key) => (
                                            <Grid.Row columns={3} key={key}>
                                                <Grid.Column textAlign="center">
                                                    <Button
                                                        onClick={() => this.onClickDetails(key)}
                                                    >
                                                        Solution {key + 1}
                                                    </Button>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <List>
                                                        {
                                                            this.props.optimization.input.objectives.map((o, key) =>
                                                                <List.Item key={key}>
                                                                    <Popup trigger={<span>Objective {key + 1}</span>}
                                                                           content={o.name}/>: <b>{parseFloat(solution.fitness[key]).toFixed(3)}</b>
                                                                </List.Item>
                                                            )
                                                        }
                                                    </List>
                                                </Grid.Column>
                                                <Grid.Column textAlign="center">
                                                    <Button.Group>
                                                        <Button color="blue"
                                                                size="small"
                                                                style={styles.iconfix}
                                                                onClick={() => this.onClickApply(solution.id)}
                                                        >
                                                            Apply
                                                        </Button>
                                                        <Button.Or/>
                                                        <Button color="blue"
                                                                size="small"
                                                                style={styles.iconfix}
                                                                onClick={() => this.onClickLocalOptimization(key)}
                                                        >
                                                            Optimize Locally
                                                        </Button>
                                                    </Button.Group>
                                                </Grid.Column>
                                            </Grid.Row>
                                        ))
                                        }
                                    </Grid>
                                </Segment> : <div/>
                            }
                        </div>
                    )}
                </Grid>
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
                        <p>You can now go to boundaries, to make further changes and start a new calculation
                            afterwards.</p>
                    </Modal.Content>
                    <Modal.Actions>
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
    model: PropTypes.object.isRequired,
    stressPeriods: PropTypes.instanceOf(Stressperiods),
    errors: PropTypes.array
};

export default pure(ConfiguredRadium(OptimizationResultsComponent));
