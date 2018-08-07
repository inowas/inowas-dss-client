import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import ConfiguredRadium from 'ConfiguredRadium';
import {Form} from 'semantic-ui-react';

class InputRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            from: props.from,
            to: props.to
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            from: nextProps.from,
            to: nextProps.to
        });
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
                    { this.props.label || this.props.label_from ?
                        <label>
                            {this.props.label ? this.props.label : ''} {this.props.label_from ? this.props.label_from : ''}
                        </label>
                        :
                        ''
                    }
                    <Form.Input
                        disabled={this.props.disabled}
                        type="number"
                        name="from"
                        value={this.state.from.toFixed(this.props.decimals ? this.props.decimals : 0)}
                        placeholder="from ="
                        style={styles.inputFix}
                        onChange={this.handleChange}
                        onBlur={this.handleSubmit}
                    />
                </Form.Field>
                <Form.Field>
                    {this.props.label_to ? <label>{ this.props.label_to }</label> : ''}
                    <Form.Input
                        disabled={this.props.disabled}
                        type="number"
                        name="to"
                        value={this.state.to.toFixed(this.props.decimals ? this.props.decimals : 0)}
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
    label_from: PropTypes.string,
    label_to: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

export default pure(ConfiguredRadium(InputRange));
