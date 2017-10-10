import React from 'react';
import { pure } from 'recompose';
import { LayoutComponents } from '../../core';
import Input from '../../components/primitive/Input';

const flowPropertiesUpw = ({ flow, getTypeForInput, handleInputChange, readOnly }) => {
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
        <LayoutComponents.InputGroup label="iphdry">
            <Input
                disabled={readOnly}
                type={getTypeForInput( flow.iphdry )}
                name="iphdry"
                value={flow.iphdry}
                cast={parseFloat}
                onChange={handleInputChange( 'iphdry' )}
                placeholder="iphdry"
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
    </section>);
};

export default pure( flowPropertiesUpw );
