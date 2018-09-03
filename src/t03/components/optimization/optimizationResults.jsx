import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {Grid, Button, Icon, Progress, Segment, List} from 'semantic-ui-react';
import Chart from './fitnessChart';
import OptimizationResult from '../../../core/optimization/OptimizationResult';
import OptimizationSolution from '../../../core/optimization/OptimizationSolution';
import OptimizationInput from '../../../core/optimization/OptimizationInput';
import {
    OPTIMIZATION_STATE_CALCULATING,
    OPTIMIZATION_STATE_CANCELLED,
    OPTIMIZATION_STATE_CANCELLING,
    OPTIMIZATION_STATE_ERROR_OPTIMIZATION_CORE,
    OPTIMIZATION_STATE_ERROR_PUBLISHING,
    OPTIMIZATION_STATE_ERROR_RECALCULATING_MODEL,
    OPTIMIZATION_STATE_FINISHED,
    OPTIMIZATION_STATE_NEW,
    OPTIMIZATION_STATE_PREPROCESSING,
    OPTIMIZATION_STATE_PREPROCESSING_FINISHED,
    OPTIMIZATION_STATE_QUEUED,
    OPTIMIZATION_STATE_STARTED
} from "../../selectors/optimization";

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
            data: this.props.optimization.solutions.map((solution, index) => {
                return {
                    name: index.toString(),
                    fitness: solution.fitness
                }
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            optimization: nextProps.optimization.toObject,
            data: nextProps.optimization.solutions.map((solution, index) => {
                return {
                    name: index.toString(),
                    fitness: solution.fitness
                }
            })
        });
    }

    onClickApply = (resultId, solutionId) => {
        const result = OptimizationResult.fromObject(this.state.optimization.results.filter(r => r.id === resultId)[0]);
        const solution = OptimizationSolution.fromObject(result.solutions.filter(s => s.id === solutionId)[0]);
        const input = OptimizationInput.fromObject(this.state.optimization.input);

        if (result && solution && input) {
            input.objects = solution.objects;

            // TODO
            input.objectives.map((obj, key) => {
                obj.weight = solution.fitness[key];
            });

            return this.props.onChange({
                key: 'input',
                value: input.toObject
            });
        }

        return false;
    };

    onClickReset = () => {
        return this.props.onChange({
            key: 'state',
            value: 0
        });
    };

    render() {
        let state = 'NOT SET';

        if (this.state.optimization) {
            switch (this.state.optimization.state) {
                case OPTIMIZATION_STATE_NEW:
                    state = 'New';
                    break;
                case OPTIMIZATION_STATE_STARTED:
                    state = 'Started';
                    break;
                case OPTIMIZATION_STATE_PREPROCESSING:
                    state = 'Preprocessing';
                    break;
                case OPTIMIZATION_STATE_PREPROCESSING_FINISHED:
                    state = 'Preprocessing finished';
                    break;
                case OPTIMIZATION_STATE_QUEUED:
                    state = 'Queued';
                    break;
                case OPTIMIZATION_STATE_CALCULATING:
                    state = 'Calculating';
                    break;
                case OPTIMIZATION_STATE_FINISHED:
                    state = 'Finished';
                    break;
                case OPTIMIZATION_STATE_CANCELLING:
                    state = 'Cancelling';
                    break;
                case OPTIMIZATION_STATE_CANCELLED:
                    state = 'Cancelled';
                    break;
                case OPTIMIZATION_STATE_ERROR_RECALCULATING_MODEL:
                    state = 'Error Recalculating Model';
                    break;
                case OPTIMIZATION_STATE_ERROR_PUBLISHING:
                    state = 'Error Publishing';
                    break;
                case OPTIMIZATION_STATE_ERROR_OPTIMIZATION_CORE:
                    state = 'Error Optimization Core';
                    break;
                default:
                    state = 'Undefined';
            }
        }

        // TODO: Select from multiple solutions
        const progress = this.state.optimization.progress
            ? this.state.optimization.progress : null;

        console.log(this.state);

        return (
            <LayoutComponents.Column heading="Objectives">
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
                            State: {state}
                        </Grid.Column>
                        <Grid.Column/>
                    </Grid.Row>
                    {progress &&
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Progress
                                percent={100 * progress.generation / this.state.optimization.input.parameters.ngen}
                                progress indicating>
                                Iteration {progress.generation} of {this.state.optimization.input.parameters.ngen}
                            </Progress>
                        </Grid.Column>
                    </Grid.Row>
                    }
                    <Grid.Row columns={1}>
                        <section className="stretch">
                            {this.state.data.length > 0 &&
                                <Chart data={this.state.data}/>
                            }
                        </section>
                    </Grid.Row>
                </Grid>
                {this.state.optimization.solutions.length > 0
                    ?
                    <Segment>
                        <Grid divided="vertically">
                            <Grid.Row columns={5}>
                                <Grid.Column textAlign="center">
                                    <b>Solution</b>
                                </Grid.Column>
                                <Grid.Column textAlign="center">
                                    <b>Objective</b>
                                </Grid.Column>
                                <Grid.Column textAlign="center">
                                    <b>Value</b>
                                </Grid.Column>
                                <Grid.Column/>
                                <Grid.Column textAlign="center">
                                    <b>Optimize Locally</b>
                                </Grid.Column>
                            </Grid.Row>
                            {
                                this.state.optimization.solutions.map((solution, key) => (
                                    <Grid.Row columns={5} key={key}>
                                        <Grid.Column textAlign="center">
                                            {key}
                                        </Grid.Column>
                                        <Grid.Column textAlign="center">
                                            <List>
                                                {
                                                    this.state.optimization.input.objectives.map((objective, oKey) => (
                                                        <List.Item key={oKey}>{objective.name}</List.Item>
                                                    ))
                                                }
                                            </List>
                                        </Grid.Column>
                                        <Grid.Column textAlign="right">
                                            <List>
                                                {
                                                    solution.fitness.map((value, fKey) => (
                                                        <List.Item key={fKey}>{value}</List.Item>
                                                    ))
                                                }
                                            </List>
                                        </Grid.Column>
                                        <Grid.Column textAlign="center">
                                            <Button color="blue"
                                                    size="small"
                                                    style={styles.iconfix}
                                                    onClick={() => this.onClickApply(result.id, solution.id)}
                                            >
                                                Apply
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column textAlign="center">
                                            <Button color="blue"
                                                    size="small"
                                                    style={styles.iconfix}
                                            >
                                                Button
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                ))
                            }
                        </Grid>
                    </Segment>
                    :
                    <p>No solutions.</p>
                }
            </LayoutComponents.Column>
        );
    }
}

OptimizationResultsComponent.propTypes = {
    optimization: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default pure(ConfiguredRadium(OptimizationResultsComponent));
