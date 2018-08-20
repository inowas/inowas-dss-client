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
            optimization: this.props.optimization.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            optimization: nextProps.optimization.toObject
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

        console.log(`Could not find result with id ${resultId} and/or solution with id ${solutionId}`);
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
                case 0:
                    state = 'New';
                    break;
                case 1:
                    state = 'Started';
                    break;
                case 2:
                    state = 'Calculating';
                    break;
                case 3:
                    state = 'Finished';
                    break;
                case 10:
                    state = 'Cancelling';
                    break;
                case 11:
                    state = 'Cancelled';
                    break;
                default:
                    state = 'Undefined';
            }
        }

        // TODO: Select from multiple results
        const result = this.state.optimization.results && this.state.optimization.results.length >= 1
            ? this.state.optimization.results[0] : null;
        const progress = this.state.optimization.progress
            ? this.state.optimization.progress : null;

        const data = [
            {name: '1', fitness: 0},
            {name: '2', fitness: 9},
            {name: '3', fitness: 15},
            {name: '4', fitness: 18},
            {name: '5', fitness: 20},
        ];

        // TODO: Chart is not rendered correctly after switching the page
        return (
            <LayoutComponents.Column heading="Objectives">
                <Grid style={styles.tablewidth}>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            {this.state.optimization.state !== 0 &&
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
                            <Chart data={data}/>
                        </section>
                    </Grid.Row>
                </Grid>
                {result && result.solutions.length >= 1
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
                                result.solutions.map((solution, key) => (
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
                    <p>No results.</p>
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
