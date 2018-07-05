import PropTypes from 'prop-types';
import React from 'react';
import AdvPackage from '../../../../core/modflow/mt3d/advPackage';
import {Form} from 'semantic-ui-react';

class AdvPackageProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adv: props.adv.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            adv: nextProps.adv.toObject
        });
    }

    handleOnChange = (cast) => (e) => {
        const {name} = e.target;
        let value;

        (typeof cast === 'function') ? value = cast(e.target.value) : value = e.target.value;

        return this.setState({
            adv: {
                ...this.state.adv,
                [name]: cast(value)
            }
        });
    };

    handleOnBlur = () => {
        this.props.onChange(AdvPackage.fromObject(this.state.adv));
    };

    render() {
        const {readonly} = this.props;
        const {adv} = this.state;

        return (
            <Form>
                <Form.Field>
                    <label>Mixelm</label>
                    <input
                        name={'mixelm'}
                        value={adv.mixelm}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Percel</label>
                    <input
                        name={'percel'}
                        value={adv.percel}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Mxpart</label>
                    <input
                        name={'mxpart'}
                        value={adv.mxpart}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nadvfd</label>
                    <input
                        name={'nadvfd'}
                        value={adv.nadvfd}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Itrack</label>
                    <input
                        name={'itrack'}
                        value={adv.itrack}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Wd</label>
                    <input
                        name={'wd'}
                        value={adv.wd}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Dceps</label>
                    <input
                        name={'dceps'}
                        value={adv.dceps}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nplane</label>
                    <input
                        name={'nplane'}
                        value={adv.nplane}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Npl</label>
                    <input
                        name={'npl'}
                        value={adv.npl}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nph</label>
                    <input
                        name={'nph'}
                        value={adv.nph}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Npmin</label>
                    <input
                        name={'npmin'}
                        value={adv.npmin}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Npmax</label>
                    <input
                        name={'npmax'}
                        value={adv.npmax}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nlsink</label>
                    <input
                        name={'nlsink'}
                        value={adv.nlsink}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Npsink</label>
                    <input
                        name={'npsink'}
                        value={adv.npsink}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Dchmoc</label>
                    <input
                        name={'dchmoc'}
                        value={adv.dchmoc}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
            </Form>
        );
    }
}

AdvPackageProperties.propTypes = {
    adv: PropTypes.instanceOf(AdvPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default AdvPackageProperties;
