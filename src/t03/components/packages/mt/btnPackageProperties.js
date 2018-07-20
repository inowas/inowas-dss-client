import PropTypes from 'prop-types';
import React from 'react';
import {Form} from 'semantic-ui-react';

import AbstractPackageProperties from './AbstractPackageProperties';
import BtnPackage from '../../../../core/modflow/mt3d/btnPackage';

class BtnPackageProperties extends AbstractPackageProperties {
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
                        <label>NComp</label>
                        <input
                            type={'number'}
                            name={'ncomp'}
                            value={mtPackage.ncomp}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>MComp</label>
                        <input
                            type={'number'}
                            name={'mcomp'}
                            value={mtPackage.mcomp}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Prsity</label>
                        <input
                            type={'number'}
                            name={'prsity'}
                            value={mtPackage.prsity}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Icbund</label>
                        <input
                            type={'number'}
                            name={'icbund'}
                            value={mtPackage.icbund}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Sconc</label>
                        <input
                            type={'number'}
                            name={'sconc'}
                            value={mtPackage.sconc}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Cinact</label>
                        <input
                            type={'number'}
                            name={'cinact'}
                            value={mtPackage.cinact}
                            disabled={readonly}
                            onBlur={this.handleOnBlur((value) => parseFloat(value).toExponential())}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Thkmin</label>
                        <input
                            type={'number'}
                            name={'thkmin'}
                            value={mtPackage.thkmin}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Ifmtcn</label>
                        <input
                            type={'number'}
                            name={'ifmtcn'}
                            value={mtPackage.ifmtcn}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Ifmtnp</label>
                        <input
                            type={'number'}
                            name={'ifmtnp'}
                            value={mtPackage.ifmtnp}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Ifmtrf</label>
                        <input
                            name={'ifmtrf'}
                            value={mtPackage.ifmtrf}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Ifmtdp</label>
                        <input
                            type={'number'}
                            name={'ifmtdp'}
                            value={mtPackage.ifmtdp}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Nprs</label>
                        <input
                            type={'number'}
                            name={'nprs'}
                            value={mtPackage.nprs}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Nprobs</label>
                        <input
                            type={'number'}
                            name={'nprobs'}
                            value={mtPackage.nprobs}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Nprmas</label>
                        <input
                            type={'number'}
                            name={'nprmas'}
                            value={mtPackage.nprmas}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>DT0</label>
                        <input
                            type={'number'}
                            name={'dt0'}
                            value={mtPackage.dt0}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Mxstrn</label>
                        <input
                            type={'number'}
                            name={'mxstrn'}
                            value={mtPackage.mxstrn}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseInt)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Ttsmult</label>
                        <input
                            type={'number'}
                            name={'ttsmult'}
                            value={mtPackage.ttsmult}
                            disabled={readonly}
                            onBlur={this.handleOnBlur(parseFloat)}
                            onChange={this.handleOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Ttsmax</label>
                        <input
                            type={'number'}
                            name={'ttsmax'}
                            value={mtPackage.ttsmax}
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

BtnPackageProperties.propTypes = {
    mtPackage: PropTypes.instanceOf(BtnPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};

export default BtnPackageProperties;
