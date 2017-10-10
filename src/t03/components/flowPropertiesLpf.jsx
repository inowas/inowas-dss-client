import React from 'react';
import { pure } from 'recompose';
import { LayoutComponents } from '../../core';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';

const flowPropertiesLpf = ({ flow, getTypeForInput, handleInputChange, handleSelectChange, readOnly }) => {
    return (<section>
        <LayoutComponents.InputGroup label="hdry">
            <Input
                disabled={readOnly}
                type={getTypeForInput( flow.hdry )}
                name="hdry"
                value={flow.hdry}
                cast={parseFloat}
                onChange={handleInputChange( 'hdry' )}
                placeholder="hdry"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="wetfct">
            <Input
                disabled={readOnly}
                type={getTypeForInput( flow.wetfct )}
                name="wetfct"
                value={flow.wetfct}
                cast={parseFloat}
                onChange={handleInputChange( 'wetfct' )}
                placeholder="wetfct"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="iwetit">
            <Input
                disabled={readOnly}
                type={getTypeForInput( flow.iwetit )}
                name="iwetit"
                value={flow.iwetit}
                cast={parseFloat}
                onChange={handleInputChange( 'iwetit' )}
                placeholder="iwetit"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="ihdwet">
            <Input
                disabled={readOnly}
                type={getTypeForInput( flow.ihdwet )}
                name="ihdwet"
                value={flow.ihdwet}
                cast={parseFloat}
                onChange={handleInputChange( 'ihdwet' )}
                placeholder="ihdwet"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="vkcb">
            <Input
                disabled={readOnly}
                type={getTypeForInput( flow.vkcb )}
                name="vkcb"
                value={flow.vkcb}
                cast={parseFloat}
                onChange={handleInputChange( 'vkcb' )}
                placeholder="vkcb"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="wetdry">
            <Input
                disabled={readOnly}
                type={getTypeForInput( flow.wetdry )}
                name="wetdry"
                value={flow.wetdry}
                cast={parseFloat}
                onChange={handleInputChange( 'wetdry' )}
                placeholder="wetdry"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="storagecoefficient">
            <Select
                clearable={false}
                name="storagecoefficient"
                disabled={readOnly}
                value={flow.storagecoefficient}
                onChange={handleSelectChange( 'storagecoefficient' )}
                options={[
                    {
                        value: true,
                        label: 'true'
                    },
                    {
                        value: false,
                        label: 'false'
                    }
                ]}
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="constantcv">
            <Select
                clearable={false}
                name="constantcv"
                disabled={readOnly}
                value={flow.constantcv}
                onChange={handleSelectChange( 'constantcv' )}
                options={[
                    {
                        value: true,
                        label: 'true'
                    },
                    {
                        value: false,
                        label: 'false'
                    }
                ]}
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="nocvcorrection">
            <Select
                clearable={false}
                name="nocvcorrection"
                disabled={readOnly}
                value={flow.nocvcorrection}
                onChange={handleSelectChange( 'nocvcorrection' )}
                options={[
                    {
                        value: true,
                        label: 'true'
                    },
                    {
                        value: false,
                        label: 'false'
                    }
                ]}
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="novfc">
            <Select
                clearable={false}
                name="novfc"
                disabled={readOnly}
                value={flow.novfc}
                onChange={handleSelectChange( 'novfc' )}
                options={[
                    {
                        value: true,
                        label: 'true'
                    },
                    {
                        value: false,
                        label: 'false'
                    }
                ]}
            />
        </LayoutComponents.InputGroup>
    </section>);
};

export default pure( flowPropertiesLpf );
