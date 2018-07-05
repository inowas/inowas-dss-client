import PropTypes from 'prop-types';
import React from 'react';
import DspPackage from '../../../../core/modflow/mt3d/dspPackage';
import {Form} from 'semantic-ui-react';

class DspPackageProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dsp: props.dsp.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dsp: nextProps.dsp.toObject
        });
    }

    handleOnChange = (cast) => (e) => {
        const {name} = e.target;
        let value;

        (typeof cast === 'function') ? value = cast(e.target.value) : value = e.target.value;

        return this.setState({
            dsp: {
                ...this.state.dsp,
                [name]: cast(value)
            }
        });
    };

    handleOnBlur = () => {
        this.props.onChange(DspPackage.fromObject(this.state.dsp));
    };

    render() {
        const {readonly} = this.props;
        const {dsp} = this.state;

        return (
            <Form>
                <Form.Field>
                    <label>Al</label>
                    <input
                        name={'al'}
                        value={dsp.al}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Trpt</label>
                    <input
                        name={'trpt'}
                        value={dsp.trpt}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Trpv</label>
                    <input
                        name={'trpv'}
                        value={dsp.trpv}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Dmcoef</label>
                    <input
                        name={'dmcoef'}
                        value={dsp.dmcoef}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
            </Form>
        );
    }
}

DspPackageProperties.propTypes = {
    dsp: PropTypes.instanceOf(DspPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default DspPackageProperties;
