import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {Grid, Button, Icon, Progress, Segment, List, Popup, Modal} from 'semantic-ui-react';
import Chart from './fitnessChart';
import {
    OPTIMIZATION_STATE_CANCELLED, OPTIMIZATION_STATE_FINISHED, OPTIMIZATION_STATE_NEW,
    getMessage, optimizationHasError, optimizationInProgress
} from "../../selectors/optimization";
import OptimizationSolutionModal from "./OptimizationSolutionModal";
import OptimizationSolution from "../../../core/optimization/OptimizationSolution";
import Stressperiods from "../../../core/modflow/Stressperiods";
import Optimization from "../../../core/optimization/Optimization";
import OptimizationObject from "../../../core/optimization/OptimizationObject";
import {Routing} from "../../actions";

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
            data: this.setData(props)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            optimization: nextProps.optimization.toObject,
            data: this.setData(nextProps)
        });
    }

    setData = (props) => {
        const optimization = props.optimization.toObject;
        return optimization.progress.progress_log.map((p, key) => {
            return {
                name: key,
                log: parseFloat(p.toFixed(2))
            };
        });
    };

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

    onClickReset = () => {
        return this.props.onChange({
            key: 'state',
            value: 0
        });
    };

    onClickDetails = (key) => {
        return this.setState({
            selectedSolution: this.state.optimization.solutions[key]
        });
    };

    onCancelModal = () => {
        return this.setState({
            selectedSolution: null,
            createdBoundaries: null
        });
    };

    calculateProgress = () => {
        const opt = Optimization.fromObject(this.state.optimization);
        return opt.calculateProgress();
    };

    render() {
        return (
            <LayoutComponents.Column>
                <Grid style={styles.tablewidth}>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            {this.state.optimization.state !== OPTIMIZATION_STATE_NEW &&
                            <Button icon
                                    style={styles.iconfix}
                                    onClick={this.onClickReset}
                                    labelPosition="left">
                                <Icon name="left arrow"/>
                                Reset
                            </Button>
                            }
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            State: {getMessage(this.state.optimization.state)}
                        </Grid.Column>
                        <Grid.Column/>
                    </Grid.Row>
                    {this.state.optimization.progress && this.state.optimization.progress.simulation_total !== 0 && this.state.optimization.progress.iteration_total !== 0
                        ?
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Progress
                                    percent={this.calculateProgress()}
                                    progress
                                    indicating={optimizationInProgress(this.state.optimization.state)}
                                    success={this.state.optimization.state === OPTIMIZATION_STATE_FINISHED}
                                    error={optimizationHasError(this.state.optimization.state)}
                                    warning={this.state.optimization.state === OPTIMIZATION_STATE_CANCELLED}
                                >
                                    Iteration {this.state.optimization.progress.iteration} of {this.state.optimization.progress.iteration_total} /
                                    Simulation {this.state.optimization.progress.simulation} of {this.state.optimization.progress.simulation_total}
                                </Progress>
                            </Grid.Column>
                        </Grid.Row>
                        :
                        <Grid.Row columns={1}>
                        </Grid.Row>
                    }
                    {this.state.data && this.state.data.length > 0 &&
                    <Grid.Row columns={1}>
                        <section className="stretch">
                            <Chart data={this.state.data}/>
                        </section>
                    </Grid.Row>
                    }
                </Grid>
                {this.state.optimization.solutions.length > 0
                    ?
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
                            {
                                this.state.optimization.solutions.map((solution, key) => (
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
                                                    this.state.optimization.input.objectives.map((o, key) =>
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
                                                <Button disabled color="blue"
                                                        size="small"
                                                        style={styles.iconfix}
                                                >
                                                    Optimize Locally
                                                </Button>
                                            </Button.Group>
                                        </Grid.Column>
                                    </Grid.Row>
                                ))
                            }
                        </Grid>
                    </Segment>
                    :
                    <p>No solutions.</p>
                }
                {this.state.selectedSolution &&
                <OptimizationSolutionModal
                    model={this.props.model}
                    onCancel={this.onCancelModal}
                    stressPeriods={this.props.stressPeriods}
                    solution={OptimizationSolution.fromObject(this.state.selectedSolution)}
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
                        <p>You can now go to boundaries, to make further changes and start a new calculation afterwards.</p>
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
    optimization: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    stressPeriods: PropTypes.instanceOf(Stressperiods),
    errors: PropTypes.array
};

export default pure(ConfiguredRadium(OptimizationResultsComponent));
