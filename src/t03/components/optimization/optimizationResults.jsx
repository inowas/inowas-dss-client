import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {Grid, Button, Icon, Progress, Segment, List, Popup} from 'semantic-ui-react';
import Chart from './fitnessChart';
import {
    OPTIMIZATION_STATE_CALCULATING,
    OPTIMIZATION_STATE_CANCELLED,
    OPTIMIZATION_STATE_CANCELLING, OPTIMIZATION_STATE_ERROR, OPTIMIZATION_STATE_ERROR_CANCELLING,
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
import OptimizationSolutionModal from "./OptimizationSolutionModal";
import OptimizationSolution from "../../../core/optimization/OptimizationSolution";
import Stressperiods from "../../../core/modflow/Stressperiods";

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
    },
    popupFix: {
        width: '10px'
    }
};

class OptimizationResultsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            optimization: this.props.optimization.toObject,
            selectedSolution: null,
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
                log: parseFloat(p)
            };
        });
    };

    onClickApply = (id) => {
        const solution = this.state.optimization.solutions.filter(s => s.id === id)[0];

        console.log(solution);

        return false;
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
            selectedSolution: null
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
                case OPTIMIZATION_STATE_ERROR:
                    state = 'Error';
                    break;
                case OPTIMIZATION_STATE_ERROR_RECALCULATING_MODEL:
                    state = 'Error Recalculating Model';
                    break;
                case OPTIMIZATION_STATE_ERROR_PUBLISHING:
                    state = 'Error Publishing';
                    break;
                case OPTIMIZATION_STATE_ERROR_CANCELLING:
                    state = 'Error Cancelling';
                    break;
                case OPTIMIZATION_STATE_ERROR_OPTIMIZATION_CORE:
                    state = 'Error Optimization Core';
                    break;
                default:
                    state = `Undefined State with code: ${this.state.optimization.state}`;
            }
        }

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
                            State: {state}
                        </Grid.Column>
                        <Grid.Column/>
                    </Grid.Row>
                    {this.state.optimization.progress.iteration && this.state.optimization.progress.iteration_total && this.state.optimization.progress.iteration_total !== 0
                        ?
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Progress
                                    percent={100 * this.state.optimization.progress.iteration / this.state.optimization.progress.iteration_total}
                                    progress indicating>
                                    Iteration {this.state.optimization.progress.iteration} of {this.state.optimization.progress.iteration_total}
                                </Progress>
                            </Grid.Column>
                        </Grid.Row>
                        :
                        <Grid.Row columns={1}>
                        </Grid.Row>
                    }
                    {this.state.optimization.progress.simulation && this.state.optimization.progress.simulation_total && this.state.optimization.progress.simulation_total !== 0
                        ?
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Progress
                                    percent={100 * this.state.optimization.progress.simulation / this.state.optimization.progress.simulation_total}
                                    progress indicating>
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
                                                        <Popup wide style={styles.popupFix} trigger={<span>Objective {key+1}</span>} content={o.name} />: <b>{parseFloat(solution.fitness[key]).toFixed(3)}</b>
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
            </LayoutComponents.Column>
        );
    }
}

OptimizationResultsComponent.propTypes = {
    optimization: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    stressPeriods: PropTypes.instanceOf(Stressperiods),
    errors: PropTypes.array
};

export default pure(ConfiguredRadium(OptimizationResultsComponent));
