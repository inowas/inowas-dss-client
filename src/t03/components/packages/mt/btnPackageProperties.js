import PropTypes from 'prop-types';
import React from 'react';
import BtnPackage from '../../../../core/modflow/mt3d/btnPackage';
import {Form} from 'semantic-ui-react';

class BtnPackageProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btn: props.btn.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            btn: nextProps.btn.toObject
        });
    }

    handleOnChange = (cast) => (e) => {
        const {name} = e.target;
        let value;

        (typeof cast === 'function') ? value = cast(e.target.value) : value = e.target.value;

        return this.setState({
            btn: {
                ...this.state.btn,
                [name]: cast(value)
            }
        });
    };

    handleOnBlur = () => {
        this.props.onChange(BtnPackage.fromObject(this.state.btn));
    };

    render() {
        const {readonly} = this.props;
        const {btn} = this.state;

        return (
            <Form>
                <Form.Field>
                    <label>NComp</label>
                    <input
                        name={'ncomp'}
                        value={btn.ncomp}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>MComp</label>
                    <input
                        name={'mcomp'}
                        value={btn.mcomp}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Prsity</label>
                    <input
                        name={'prsity'}
                        value={btn.prsity}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Icbund</label>
                    <input
                        name={'icbund'}
                        value={btn.icbund}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
            </Form>
        );
    }
}

BtnPackageProperties.propTypes = {
    btn: PropTypes.instanceOf(BtnPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default BtnPackageProperties;
