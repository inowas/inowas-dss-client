import PropTypes from 'prop-types';
import React from 'react';
import {Form} from 'semantic-ui-react';

import AbstractPackageProperties from './AbstractPackageProperties';
import DspPackage from '../../../../core/modflow/mt3d/dspPackage';

class DspPackageProperties extends AbstractPackageProperties {
    render() {

        if (!this.state.mtPackage) {
            return null;
        }

        const {readonly} = this.props;
        const {mtPackage} = this.state;

        return (
            <Form>
                <Form.Group>
                    <Form.Field>
                        <label>Al</label>
                        <input
                            name={'al'}
                            value={mtPackage.al}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Trpt</label>
                        <input
                            name={'trpt'}
                            value={mtPackage.trpt}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Trpv</label>
                        <input
                            name={'trpv'}
                            value={mtPackage.trpv}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Dmcoef</label>
                        <input
                            name={'dmcoef'}
                            value={mtPackage.dmcoef}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }
}

DspPackageProperties.propTypes = {
    mtPackage: PropTypes.instanceOf(DspPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default DspPackageProperties;
