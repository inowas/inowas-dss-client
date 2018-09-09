import PropTypes from 'prop-types';
import React from 'react';
import {Form} from 'semantic-ui-react';

import AbstractPackageProperties from './AbstractPackageProperties';
import GcgPackage from '../../../../core/modflow/mt3d/gcgPackage';

class GcgPackageProperties extends AbstractPackageProperties {
    render() {
        if (!this.state.mtPackage) {
            return null;
        }

        const {readonly} = this.props;
        const {mtPackage} = this.state;

        return (
            <Form>
                <Form.Field>
                    <label>Mxiter</label>
                    <input
                        name={'mxiter'}
                        value={mtPackage.mxiter}
                        disabled={readonly}
                        onBlur={this.handleOnBlur(parseInt)}
                        onChange={this.handleOnChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Iter1</label>
                    <input
                        name={'iter1'}
                        value={mtPackage.iter1}
                        disabled={readonly}
                        onBlur={this.handleOnBlur(parseInt)}
                        onChange={this.handleOnChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Isolve</label>
                    <input
                        name={'isolve'}
                        value={mtPackage.isolve}
                        disabled={readonly}
                        onBlur={this.handleOnBlur(parseInt)}
                        onChange={this.handleOnChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Ncrs</label>
                    <input
                        name={'ncrs'}
                        value={mtPackage.ncrs}
                        disabled={readonly}
                        onBlur={this.handleOnBlur(parseInt)}
                        onChange={this.handleOnChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Accl</label>
                    <input
                        name={'accl'}
                        value={mtPackage.accl}
                        disabled={readonly}
                        onBlur={this.handleOnBlur(parseInt)}
                        onChange={this.handleOnChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Cclose</label>
                    <input
                        name={'cclose'}
                        value={mtPackage.cclose}
                        disabled={readonly}
                        onBlur={this.handleOnBlur(parseFloat)}
                        onChange={this.handleOnChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Iprgcg</label>
                    <input
                        name={'iprgcg'}
                        value={mtPackage.iprgcg}
                        disabled={readonly}
                        onBlur={this.handleOnBlur(parseInt)}
                        onChange={this.handleOnChange}
                    />
                </Form.Field>
            </Form>
        );
    }
}

GcgPackageProperties.propTypes = {
    mtPackage: PropTypes.instanceOf(GcgPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};

export default GcgPackageProperties;
