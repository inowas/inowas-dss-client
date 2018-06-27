import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import ConfiguredRadium from 'ConfiguredRadium';
import {Form} from 'semantic-ui-react';
import OptimizationParameters from '../../core/optimization/OptimizationParameters';

class InputRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            from: props.from,
            to: props.to
        };
    }

    handleChange = (e, {name, value}) => {
        if (name === 'from') {
            if (value > this.state.to) {
                return this.setState({
                    from: this.state.to,
                    to: this.state.to
                });
            }
            if (this.props.min && value < this.props.min) {
                return this.setState({
                    from: this.props.min,
                    to: this.state.to
                });
            }
            return this.setState({
                from: parseFloat(value),
                to: this.state.to
            });
        }
        if (name === 'to') {
            if (value < this.state.from) {
                return this.setState({
                    from: this.state.from,
                    to: this.state.from
                });
            }
            if (this.props.max && value > this.props.max) {
                return this.setState({
                    from: this.state.from,
                    to: this.props.max
                });
            }
            return this.setState({
                from: this.state.from,
                to: parseFloat(value)
            });
        }
        return this.setState({
            from: this.state.from,
            to: this.state.to
        });
    };

    handleSubmit = () => {
        return this.props.onChange({
            name: this.props.name,
            from: this.state.from,
            to: this.state.to
        });
    };

    render() {
        const styles = {
            inputFix: {
                padding: '0'
            }
        };

        return (
            <Form.Group widths="equal">
                <Form.Field>
                    <label>{this.props.label} from</label>
                    <Form.Input
                        disabled={this.props.disabled}
                        type="number"
                        name="from"
                        value={this.state.from.toFixed(this.props.decimals)}
                        placeholder="from ="
                        style={styles.inputFix}
                        onChange={this.handleChange}
                        onBlur={this.handleSubmit}
                    />
                </Form.Field>
                <Form.Field>
                    <label>to</label>
                    <Form.Input
                        disabled={this.props.disabled}
                        type="number"
                        name="to"
                        value={this.state.to.toFixed(this.props.decimals)}
                        placeholder="to ="
                        style={styles.inputFix}
                        onChange={this.handleChange}
                        onBlur={this.handleSubmit}
                    />
                </Form.Field>
            </Form.Group>
        );
    }
}

InputRange.propTypes = {
    name: PropTypes.string.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    decimals: PropTypes.number,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

export default pure(ConfiguredRadium(InputRange));
