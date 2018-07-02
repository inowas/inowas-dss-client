import PropTypes from 'prop-types';
import React from 'react';
import BtnPackage from '../../../core/modflow/mt3d/btnPackage';
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

    handleOnChange = (e) => {
        const {name, value} = e.target;
        return this.setState({
            btn: {
                ...this.state.btn,
                [name]: value
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
            <div>
                <Form>
                    <Form.Field>
                        <label>NComp</label>
                        <input
                            name={'ncomp'}
                            value={btn.ncomp}
                            disabled={readonly}
                            onBlur={this.handleOnBlur}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>MComp</label>
                        <input
                            name={'mcomp'}
                            value={btn.mcomp}
                            disabled={readonly}
                            onBlur={this.handleOnBlur}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Prsity</label>
                        <input
                            name={'prsity'}
                            value={btn.prsity}
                            disabled={readonly}
                            onBlur={this.handleOnBlur}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Icbund</label>
                        <input
                            name={'icbund'}
                            value={btn.icbund}
                            disabled={readonly}
                            onBlur={this.handleOnBlur}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

BtnPackageProperties.propTypes = {
    btn: PropTypes.instanceOf(BtnPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default BtnPackageProperties;
