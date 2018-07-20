import PropTypes from 'prop-types';
import React from 'react';
import {Checkbox, Form} from 'semantic-ui-react';

import AbstractPackageProperties from './AbstractPackageProperties';
import MtPackage from '../../../../core/modflow/mt3d/mtPackage';

class MtPackageProperties extends AbstractPackageProperties {
    render() {
        if (!this.state.mtPackage) {
            return null;
        }

        const {enabled, readonly, toggleEnabled} = this.props;
        const {mtPackage} = this.state;

        return (
            <Form>
                <Form.Field>
                    <label>Enabled</label>
                    <Checkbox checked={enabled} onChange={toggleEnabled} disabled={readonly}/>
                </Form.Field>
                <Form.Field>
                    <label>Version</label>
                    <input value={mtPackage.version} readOnly/>
                </Form.Field>
                <Form.Field>
                    <label>Ftl filename</label>
                    <input value={mtPackage.ftlfilename} readOnly/>
                </Form.Field>
                <Form.Field>
                    <label>Verbose</label>
                    <input value={mtPackage.verbose} readOnly/>
                </Form.Field>
            </Form>
        );
    }
}

MtPackageProperties.propTypes = {
    mtPackage: PropTypes.instanceOf(MtPackage),
    onChange: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
    readonly: PropTypes.bool.isRequired,
    toggleEnabled: PropTypes.func.isRequired,
};


export default MtPackageProperties;
