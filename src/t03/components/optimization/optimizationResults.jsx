import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {Grid, Button, Icon, Progress, Segment, Modal} from 'semantic-ui-react';
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
import OptimizationResultsMap from "./optimizationResultsMap";
import OptimizationSolution from "../../../core/optimization/OptimizationSolution";
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

        /* TODO: just for testing
        const solution1 = new OptimizationSolution();
        const solution2 = new OptimizationSolution();

        const object1 = new OptimizationObject();
        const object2 = new OptimizationObject();
        const object3 = new OptimizationObject();

        object1.position.row.min = 1;
        object1.position.row.max = 10;
        object1.position.row.result = 5;
        object1.position.col.min = 1;
        object1.position.col.max = 10;
        object1.position.col.result = 5;

        object2.position.row.min = 2;
        object2.position.row.max = 12;
        object2.position.row.result = 6;
        object2.position.col.min = 2;
        object2.position.col.max = 12;
        object2.position.col.result = 6;

        object3.position.row.min = 15;
        object3.position.row.max = 25;
        object3.position.row.result = 19;
        object3.position.col.min = 5;
        object3.position.col.max = 15;
        object3.position.col.result = 10;

        solution1.fitness = [0.2, 0.6, 0.8, 0.85];
        solution1.variables = [1, 2, 3, 1];
        solution1.objects = [object1];

        solution2.fitness = [0.1, 0.7, 0.9, 0.95];
        solution2.variables = [3, 1, 2, 3];
        solution2.objects = [object2, object3];

        const solutions = [solution1.toObject, solution2.toObject];*/

        this.state = {
            optimization: this.props.optimization.toObject,
            selectedSolution: null,
            data: this.setData(props)
        };
    }

    componentWillReceiveProps(nextProps) {
        let data = [];

        for (let i = 0; i <= (nextProps.optimization.input.objectives.length - 1); i++) {
            data[i] = {
                name: i
            };
            nextProps.optimization.solutions.forEach((s, k) => {
                data[i][`solution${k + 1}`] = s.fitness[i];
            });
        }

        this.setState({
            optimization: nextProps.optimization.toObject,
            data: this.setData(nextProps)
        });
    }

    setData = (props) => {
        let data = [];

        for (let i = 0; i <= (props.optimization.input.objectives.length - 1); i++) {
            data[i] = {
                name: i
            };
            props.optimization.solutions.forEach((s, k) => {
                data[i][`solution${k + 1}`] = s.fitness[i];
            });
        }

        return data;
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

    onClickDetails = (id) => {
        return this.setState({
            selectedSolution: this.state.optimization.solutions.filter(s => s.id === id)[0]
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

        const progress = this.state.optimization.progress
            ? this.state.optimization.progress : null;

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
                    {this.state.optimization.solutions.length > 0 && this.state.data.length > 0 &&
                    <Grid.Row columns={1}>
                        <section className="stretch">
                            <Chart data={this.state.data}/>
                        </section>
                    </Grid.Row>
                    }
                </Grid>
                {this.state.optimization.solutions.length > 0
                    ?
                    <Segment>
                        <Grid divided="vertically">
                            <Grid.Row columns={3}>
                                <Grid.Column textAlign="center">
                                    <b>Solution</b>
                                </Grid.Column>
                                <Grid.Column textAlign="center"/>
                                <Grid.Column textAlign="center"/>
                            </Grid.Row>
                            {
                                this.state.optimization.solutions.map((solution, key) => (
                                    <Grid.Row columns={3} key={key}>
                                        <Grid.Column textAlign="center">
                                            {key + 1}
                                        </Grid.Column>
                                        <Grid.Column textAlign="center">
                                            <Button
                                                onClick={() => this.onClickDetails(solution.id)}
                                            >
                                                Details
                                            </Button>
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
                <Modal size={'large'} open onClose={this.onCancelModal} dimmer={'inverted'}>
                    <Modal.Header>Solution Details</Modal.Header>
                    <Modal.Content>
                        <OptimizationResultsMap
                            area={this.props.model.geometry}
                            bbox={this.props.model.bounding_box}
                            objects={this.state.selectedSolution.objects}
                            readOnly={true}
                            gridSize={this.props.model.grid_size}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.onCancelModal}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
                }
            </LayoutComponents.Column>
        );
    }
}

OptimizationResultsComponent.propTypes = {
    optimization: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.array
};

export default pure(ConfiguredRadium(OptimizationResultsComponent));
