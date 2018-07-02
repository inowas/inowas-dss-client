import PropTypes from 'prop-types';
import React from 'react';
import MtPackage from '../../../core/modflow/mt3d/mtPackage';
import {Button, Checkbox, Form} from 'semantic-ui-react';

class MtPackageProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mt: props.mt.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            mt: nextProps.mt.toObject
        });
    }

    handleChange = (name, value) => {
        const mt = {
            ...this.state.mt,
            [name]: value
        };

        this.setState(mt);
        this.props.onChange(MtPackage.fromObject(mt));
    };

    render() {
        const {enabled, readonly, toggleEnabled} = this.props;
        const mtPackage = MtPackage.fromObject(this.state.mt);

        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Enabled</label>
                        <Checkbox checked={enabled} onChange={toggleEnabled} disabled={readonly}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Version</label>
                        <input value={mtPackage.version} readOnly disabled={readonly}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Ftl filename</label>
                        <input value={mtPackage.ftlfilename} readOnly/>
                    </Form.Field>
                    <Form.Field>
                        <label>Verbose</label>
                        <input value={mtPackage.verbose} readOnly/>
                    </Form.Field>
                    <Button type={'submit'} disabled={readonly}>Save</Button>
                </Form>
            </div>
        );
    }
}

MtPackageProperties.propTypes = {
    mt: PropTypes.instanceOf(MtPackage),
    onChange: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
    readonly: PropTypes.bool.isRequired,
    toggleEnabled: PropTypes.func.isRequired,
};


export default MtPackageProperties;
