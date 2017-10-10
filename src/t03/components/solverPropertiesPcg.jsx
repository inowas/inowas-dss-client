import React from 'react';
import { pure } from 'recompose';
import { LayoutComponents } from '../../core';
import Input from '../../components/primitive/Input';

const solverPropertiesPcg = ({ solver, getTypeForInput, handleInputChange, readOnly }) => {
    return (<section>
        <LayoutComponents.InputGroup label="mxiter">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.mxiter )}
                name="mxiter"
                value={solver.mxiter}
                cast={parseInt}
                onChange={handleInputChange( 'mxiter' )}
                placeholder="mxiter"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="iter1">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.iter1 )}
                name="iter1"
                value={solver.iter1}
                cast={parseInt}
                onChange={handleInputChange( 'iter1' )}
                placeholder="iter1"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="npcond">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.npcond )}
                name="npcond"
                value={solver.npcond}
                cast={parseInt}
                onChange={handleInputChange( 'npcond' )}
                placeholder="npcond"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="hclose">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.hclose )}
                name="hclose"
                value={solver.hclose}
                cast={parseFloat}
                onChange={handleInputChange( 'hclose' )}
                placeholder="hclose"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="rclose">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.rclose )}
                name="rclose"
                value={solver.rclose}
                cast={parseFloat}
                onChange={handleInputChange( 'rclose' )}
                placeholder="rclose"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="relax">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.relax )}
                name="relax"
                value={solver.relax}
                cast={parseFloat}
                onChange={handleInputChange( 'relax' )}
                placeholder="relax"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="nbpol">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.nbpol )}
                name="nbpol"
                value={solver.nbpol}
                cast={parseInt}
                onChange={handleInputChange( 'nbpol' )}
                placeholder="nbpol"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="iprpcg">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.iprpcg )}
                name="iprpcg"
                value={solver.iprpcg}
                cast={parseInt}
                onChange={handleInputChange( 'iprpcg' )}
                placeholder="iprpcg"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="mutpcg">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.mutpcg )}
                name="mutpcg"
                value={solver.mutpcg}
                cast={parseInt}
                onChange={handleInputChange( 'mutpcg' )}
                placeholder="mutpcg"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="damp">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.damp )}
                name="damp"
                value={solver.damp}
                cast={parseFloat}
                onChange={handleInputChange( 'damp' )}
                placeholder="damp"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="dampt">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.dampt )}
                name="dampt"
                value={solver.dampt}
                cast={parseFloat}
                onChange={handleInputChange( 'dampt' )}
                placeholder="dampt"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="ihcofadd">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.ihcofadd )}
                name="ihcofadd"
                value={solver.ihcofadd}
                cast={parseInt}
                onChange={handleInputChange( 'ihcofadd' )}
                placeholder="ihcofadd"
            />
        </LayoutComponents.InputGroup>
    </section>);
};

export default pure( solverPropertiesPcg );
