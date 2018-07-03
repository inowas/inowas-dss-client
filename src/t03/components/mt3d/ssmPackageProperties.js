import PropTypes from 'prop-types';
import React from 'react';
import SsmPackage from '../../../core/modflow/mt3d/ssmPackage';
import {Button, Form} from 'semantic-ui-react';

class SsmPackageProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ssm: props.ssm.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ssm: nextProps.ssm.toObject
        });
    }

    handleOnChange = (cast) => (e) => {
        const {name} = e.target;
        let value;

        (typeof cast === 'function') ? value = cast(e.target.value) : value = e.target.value;

        return this.setState({
            ssm: {
                ...this.state.ssm,
                [name]: cast(value)
            }
        });
    };

    handleOnSave = () => {
        this.props.onChange(SsmPackage.fromObject(this.state.ssm));
    };

    render() {
        const {readonly} = this.props;
        const {ssm} = this.state;

        return (
            <Form>
                // DataTable
                <Button onClick={this.handleOnSave}/>
            </Form>
        );
    }
}

SsmPackageProperties.propTypes = {
    ssm: PropTypes.instanceOf(SsmPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default SsmPackageProperties;
