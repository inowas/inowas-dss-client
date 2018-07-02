import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import styleGlobals from 'styleGlobals';
import {LayoutComponents} from '../../core';
import OptimizationParameters from '../../core/optimization/OptimizationParameters';
import {Segment, Form} from 'semantic-ui-react';

const styles = {
    columnContainer: {
        display: 'flex'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    },

    expandVertical: {
        flex: 1
    },

    input: {
        padding: 0
    }
};

class OptimizationParametersComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parameters: props.parameters.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            parameters: nextProps.parameters.toObject
        });
    }

    handleSubmit = () => {
        return this.props.onChange(OptimizationParameters.fromObject(this.state.parameters));
    };

    handleChange = (e, {name, value}) => this.setState({
        parameters: {...this.state.parameters, [name]: value}
    });

    render() {
        const boolOptions = [
            {
                key: 'true',
                value: true,
                text: 'True'
            },
            {
                key: 'false',
                value: false,
                text: 'False'
            }
        ];
        const {parameters} = this.state;

        return (<div style={[styles.columnContainer]}>
            <LayoutComponents.Column heading="Parameters" style={[styles.columnNotLast]}>
                <Form>
                    <Form.Field>
                        <label>Method of optimization</label>
                        <Form.Select
                            name="method"
                            value={parameters.method}
                            placeholder="method ="
                            onChange={this.handleChange}
                            onBlur={this.handleSubmit}
                            options={[
                                {
                                    key: 'ga',
                                    value: 'ga',
                                    text: 'GA'
                                },
                                {
                                    key: 'simplex',
                                    value: 'simplex',
                                    text: 'Simplex'
                                }
                            ]}
                        />
                    </Form.Field>
                    {(parameters.method === 'ga' &&
                        <div>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Number of generations of genetic algorithm</label>
                                    <Form.Input
                                        type="text"
                                        name="ngen"
                                        value={parameters.ngen}
                                        placeholder="ngen ="
                                        onChange={this.handleChange}
                                        onBlur={this.handleSubmit}
                                        style={styles.input}
                                        disabled={(parameters.method !== 'ga')}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Population size of genetic algorithm</label>
                                    <Form.Input
                                        type="number"
                                        name="pop_size"
                                        value={parameters.pop_size}
                                        placeholder="pop_size ="
                                        onChange={this.handleChange}
                                        onBlur={this.handleSubmit}
                                        style={styles.input}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Probability of individual to be produced by mutation</label>
                                    <Form.Input
                                        type="number"
                                        name="mutpb"
                                        value={parameters.mutpb}
                                        placeholder="mutpb ="
                                        onChange={this.handleChange}
                                        onBlur={this.handleSubmit}
                                        style={styles.input}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Probability of individual to be produced by cross-over</label>
                                    <Form.Input
                                        type="number"
                                        name="cxpb"
                                        value={parameters.cxpb}
                                        placeholder="cxpb ="
                                        onChange={this.handleChange}
                                        onBlur={this.handleSubmit}
                                        style={styles.input}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <label>ETA crowding factor</label>
                                <Form.Input
                                    type="number"
                                    name="eta"
                                    value={parameters.eta}
                                    placeholder="eta ="
                                    onChange={this.handleChange}
                                    onBlur={this.handleSubmit}
                                    style={styles.input}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Probability of mutation of a single value of an individual</label>
                                <Form.Input
                                    name="indpb"
                                    type="number"
                                    value={parameters.indpb}
                                    placeholder="indpb ="
                                    onChange={this.handleChange}
                                    onBlur={this.handleSubmit}
                                    style={styles.input}
                                />
                            </Form.Field>
                            <Segment>
                                <Form.Field>
                                    <label>Flag defining whether or not Diversity preserving module will be
                                        included</label>
                                    <Form.Select
                                        name="diversity_flg"
                                        value={parameters.diversity_flg}
                                        placeholder="diversity_flg ="
                                        onChange={this.handleChange}
                                        onBlur={this.handleSubmit}
                                        options={boolOptions}
                                    />
                                </Form.Field>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <label>Boundary value of the Q diversity index.</label>
                                        <Form.Input
                                            type="number"
                                            name="qbound"
                                            value={parameters.qbound}
                                            placeholder="qbound ="
                                            onChange={this.handleChange}
                                            onBlur={this.handleSubmit}
                                            style={styles.input}
                                            disabled={(parameters.diversity_flg === false)}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Number of classes to be used in the clustering module.</label>
                                        <Form.Input
                                            type="number"
                                            name="ncls"
                                            value={parameters.ncls}
                                            placeholder="ncls ="
                                            onChange={this.handleChange}
                                            onBlur={this.handleSubmit}
                                            style={styles.input}
                                            disabled={(parameters.diversity_flg === false)}
                                        />
                                    </Form.Field>
                                </Form.Group>
                            </Segment>
                        </div>
                    )}
                    {(parameters.method === 'simplex' &&
                        <div>
                            <Form.Field>
                                <label>Maximum number of function evaluations during the local optimization.</label>
                                <Form.Input
                                    type="number"
                                    name="maxf"
                                    value={parameters.maxf}
                                    placeholder="maxf ="
                                    onChange={this.handleChange}
                                    onBlur={this.handleSubmit}
                                    style={styles.input}
                                    disabled={(parameters.method !== 'simplex')}
                                />
                            </Form.Field>
                        </div>
                    )}
                </Form>
            </LayoutComponents.Column>
        </div>);
    }
}

OptimizationParametersComponent.propTypes = {
    parameters: PropTypes.instanceOf(OptimizationParameters),
    onChange: PropTypes.func.isRequired
};

export default pure(ConfiguredRadium(OptimizationParametersComponent));
