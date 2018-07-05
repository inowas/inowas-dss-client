import PropTypes from 'prop-types';
import React from 'react';
import GcgPackage from '../../../../core/modflow/mt3d/gcgPackage';
import {Form} from 'semantic-ui-react';

class GcgPackageProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gcg: props.gcg.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gcg: nextProps.gcg.toObject
        });
    }

    handleOnChange = (cast) => (e) => {
        const {name} = e.target;
        let value;

        (typeof cast === 'function') ? value = cast(e.target.value) : value = e.target.value;

        return this.setState({
            gcg: {
                ...this.state.gcg,
                [name]: cast(value)
            }
        });
    };

    handleOnBlur = () => {
        this.props.onChange(GcgPackage.fromObject(this.state.gcg));
    };

    render() {
        const {readonly} = this.props;
        const {gcg} = this.state;

        return (
            <Form>
                <Form.Field>
                    <label>Mxiter</label>
                    <input
                        name={'mxiter'}
                        value={gcg.mxiter}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Iter1</label>
                    <input
                        name={'iter1'}
                        value={gcg.iter1}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Isolve</label>
                    <input
                        name={'isolve'}
                        value={gcg.isolve}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Ncrs</label>
                    <input
                        name={'ncrs'}
                        value={gcg.ncrs}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Accl</label>
                    <input
                        name={'accl'}
                        value={gcg.accl}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Cclose</label>
                    <input
                        name={'cclose'}
                        value={gcg.cclose}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Iprgcg</label>
                    <input
                        name={'iprgcg'}
                        value={gcg.iprgcg}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
            </Form>
        );
    }
}

GcgPackageProperties.propTypes = {
    gcg: PropTypes.instanceOf(GcgPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default GcgPackageProperties;
