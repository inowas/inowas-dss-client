import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Modal, Segment} from "semantic-ui-react";
import OptimizationInput from "../../../core/optimization/OptimizationInput";
import OptimizationSolution from "../../../core/optimization/OptimizationSolution";

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

class OptimizationLocallyModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            optimization: this.props.optimizationInput.toObject
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            optimization: nextProps.optimizationInput.toObject
        });
    }

    onCancelModal = () => {
        return this.props.onCancel();
    };

    onCalculationClick = () => {
        const parameters = {
            ...this.state.optimization.parameters,
            method: 'Simplex',
            initial_solution_id: this.props.solution.id
        };

        return this.props.onCalculationStart(parameters);
    };

    handleChange = (e, {name, value}) => {
        const parameters = {
            ...this.state.optimization.parameters,
            [name]: value
        };

        return this.setState({
            optimization: {
                ...this.state.optimization,
                parameters: parameters
            }
        });
    };

    render() {
        const parameters = this.state.optimization.parameters;

        return (
            <Modal size={'large'} open onClose={this.onCancelModal} dimmer={'inverted'}>
                <Modal.Header>Optimize Solution Locally</Modal.Header>
                <Modal.Content>
                    <b>Solution: {this.props.solution.id}</b>
                    <Form>
                        <Form.Field>
                            <label>Maximum number of function evaluations during the local
                                optimization.</label>
                            <Form.Input
                                type="number"
                                name="maxf"
                                value={parameters.maxf}
                                placeholder="maxf ="
                                onChange={this.handleChange}
                                style={styles.inputfix}
                            />
                        </Form.Field>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>xtol</label>
                                <Form.Input
                                    type="number"
                                    name="xtol"
                                    value={parameters.xtol}
                                    placeholder="xtol ="
                                    onChange={this.handleChange}
                                    style={styles.inputfix}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>ftol</label>
                                <Form.Input
                                    type="number"
                                    name="ftol"
                                    value={parameters.ftol}
                                    placeholder="ftol ="
                                    onChange={this.handleChange}
                                    style={styles.inputfix}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Segment>
                            <Grid divided="vertically">
                                <Grid.Row columns={3}>
                                    <Grid.Column>
                                        <b>Objective</b>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <b>Actual Value</b>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <b>Target</b>
                                    </Grid.Column>
                                </Grid.Row>
                                {this.state.optimization.objectives.map((objective, key) =>
                                    <Grid.Row columns={3} key={key}>
                                        <Grid.Column>
                                            {objective.name}
                                        </Grid.Column>
                                        <Grid.Column>
                                            {parseFloat(this.props.solution.fitness[key]).toFixed(3)}
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Form.Field>
                                                <Form.Input
                                                    type="number"
                                                    name="objective"
                                                    placeholder="target ="
                                                    style={styles.inputfix}
                                                />
                                            </Form.Field>
                                        </Grid.Column>
                                    </Grid.Row>
                                )}
                            </Grid>
                        </Segment>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.onCancelModal}>Cancel</Button>
                    <Button primary onClick={this.onCalculationClick}>
                        Run Optimization
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

OptimizationLocallyModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onCalculationStart: PropTypes.func.isRequired,
    optimizationInput: PropTypes.instanceOf(OptimizationInput).isRequired,
    solution: PropTypes.instanceOf(OptimizationSolution).isRequired
};

export default pure(ConfiguredRadium(OptimizationLocallyModal));
