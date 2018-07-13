import PropTypes from 'prop-types';
import React from 'react';

import AbstractPackageProperties from './AbstractPackageProperties';
import AdvPackage from '../../../../core/modflow/mt3d/advPackage';
import {Form} from 'semantic-ui-react';

class AdvPackageProperties extends AbstractPackageProperties {
    render() {

        if (!this.state.mtPackage) {
            return null;
        }

        const {readonly} = this.props;
        const {mtPackage} = this.state;

        return (
            <Form>
                <Form.Field>
                    <label>Mixelm</label>
                    <input
                        name={'mixelm'}
                        value={mtPackage.mixelm}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Percel</label>
                    <input
                        name={'percel'}
                        value={mtPackage.percel}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Mxpart</label>
                    <input
                        name={'mxpart'}
                        value={mtPackage.mxpart}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nadvfd</label>
                    <input
                        name={'nadvfd'}
                        value={mtPackage.nadvfd}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Itrack</label>
                    <input
                        name={'itrack'}
                        value={mtPackage.itrack}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Wd</label>
                    <input
                        name={'wd'}
                        value={mtPackage.wd}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Dceps</label>
                    <input
                        name={'dceps'}
                        value={mtPackage.dceps}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseFloat)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nplane</label>
                    <input
                        name={'nplane'}
                        value={mtPackage.nplane}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Npl</label>
                    <input
                        name={'npl'}
                        value={mtPackage.npl}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nph</label>
                    <input
                        name={'nph'}
                        value={mtPackage.nph}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Npmin</label>
                    <input
                        name={'npmin'}
                        value={mtPackage.npmin}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Npmax</label>
                    <input
                        name={'npmax'}
                        value={mtPackage.npmax}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nlsink</label>
                    <input
                        name={'nlsink'}
                        value={mtPackage.nlsink}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Npsink</label>
                    <input
                        name={'npsink'}
                        value={mtPackage.npsink}
                        disabled={readonly}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange(parseInt)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Dchmoc</label>
                    <input
                        name={'dchmoc'}
                        value={mtPackage.dchmoc}
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
    mtPackage: PropTypes.instanceOf(AdvPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default AdvPackageProperties;
