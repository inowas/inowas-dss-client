import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import styleGlobals from 'styleGlobals';
import {LayoutComponents} from '../../core';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';
import OptimizationParameters from '../../core/optimization/OptimizationParameters';

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

    onBlur = () => {
        return this.props.onChange(OptimizationParameters.fromObject(this.state.parameters));
    };

    onChange = (name) => {
        return (value) => {
            this.setState({
                parameters: {...this.state.parameters, [name]: value}
            });
        };
    };
    // TODO: Semantic-UI

    render() {
        const {parameters} = this.state;
        return (<div style={[styles.columnContainer]}>
            <LayoutComponents.Column heading="Parameters" style={[styles.columnNotLast]}>
                <form>
                    <LayoutComponents.InputGroup label="Number of generations of genetic algorithm">
                        <Input
                            type="number"
                            value={parameters.ngen}
                            name="ngen"
                            placeholder="ngen"
                            onChange={this.onChange('ngen')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Population size of genetic algorithm">
                        <Input
                            type="number"
                            value={parameters.pop_size}
                            name="pop_size"
                            placeholder="pop_size"
                            onChange={this.onChange('pop_size')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Probability of individual to be produced by mutation">
                        <Input
                            type="number"
                            value={parameters.mutpb}
                            name="mutpb"
                            placeholder="mutpb"
                            onChange={this.onChange('mutpb')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Probability of individual to be produced by cross-over">
                        <Input
                            type="number"
                            value={parameters.cxpb}
                            name="cxpb"
                            placeholder="cxpb"
                            onChange={this.onChange('cxpb')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="ETA crowding factor">
                        <Input
                            type="number"
                            value={parameters.eta}
                            name="eta"
                            placeholder="eta"
                            onChange={this.onChange('eta')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Probability of mutation of a single value of an individual">
                        <Input
                            type="number"
                            value={parameters.indpb}
                            name="indpb"
                            placeholder="indpb"
                            onChange={this.onChange('indpb')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Flag defining whether or not Diversity preserving module will be included">
                        <Select
                            clearable={false}
                            value={parameters.diversity_flg}
                            name="diversity_flg"
                            onChange={this.onChange('diversity_flg')}
                            onBlur={this.onBlur}
                            options={[
                                {
                                    value: true,
                                    label: 'true'
                                },
                                {
                                    value: false,
                                    label: 'false'
                                }
                            ]}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Boundary value of the Q diversity index. Required if diversity_flg = True">
                        <Input
                            type="number"
                            value={parameters.qbound}
                            name="qbound"
                            placeholder="qbound"
                            onChange={this.onChange('qbound')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Number of classes to be used in the clustering module. Required if diversity_flg = True">
                        <Input
                            type="number"
                            value={parameters.ncls}
                            name="ncls"
                            placeholder="ncls"
                            onChange={this.onChange('ncls')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Flag defining whether or not Local search module will be included">
                        <Select
                            clearable={false}
                            value={parameters.local_opt_flg}
                            name="local_opt_flg"
                            onChange={this.onChange('local_opt_flg')}
                            onBlur={this.onBlur}
                            options={[
                                {
                                    value: true,
                                    label: 'true'
                                },
                                {
                                    value: false,
                                    label: 'false'
                                }
                            ]}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Number of individuals to be selected for local optimization from every generation. Required if local_opt_flg = True">
                        <Input
                            type="number"
                            value={parameters.nlocal}
                            placeholder="nlocal"
                            onChange={this.onChange('nlocal')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                    <LayoutComponents.InputGroup label="Maximum number of function evaluations during the local optimization. Required if local_opt_flg = True">
                        <Input
                            type="number"
                            value={parameters.maxf}
                            placeholder="maxf"
                            onChange={this.onChange('maxf')}
                            onBlur={this.onBlur}
                        />
                    </LayoutComponents.InputGroup>
                </form>
            </LayoutComponents.Column>
        </div>);
    }
}

OptimizationParametersComponent.propTypes = {
    parameters: PropTypes.instanceOf(OptimizationParameters),
    onChange: PropTypes.func.isRequired
};

export default pure(ConfiguredRadium(OptimizationParametersComponent));
