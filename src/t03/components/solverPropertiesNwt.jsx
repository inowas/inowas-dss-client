import React from 'react';
import { pure } from 'recompose';
import { LayoutComponents } from '../../core';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';

const solverPropertiesPcg = ({ solver, getTypeForInput, handleInputChange, handleSelectChange, readOnly }) => {
    return (<section>
        <LayoutComponents.InputGroup label="headtol">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.headtol )}
                name="headtol"
                value={solver.headtol}
                cast={parseFloat}
                onChange={handleInputChange( 'headtol' )}
                placeholder="headtol"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="fluxtol">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.fluxtol )}
                name="fluxtol"
                value={solver.fluxtol}
                cast={parseFloat}
                onChange={handleInputChange( 'fluxtol' )}
                placeholder="fluxtol"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="maxiterout">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.maxiterout )}
                name="maxiterout"
                value={solver.maxiterout}
                cast={parseInt}
                onChange={handleInputChange( 'maxiterout' )}
                placeholder="maxiterout"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="thickfact">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.thickfact )}
                name="thickfact"
                value={solver.thickfact}
                cast={parseFloat}
                onChange={handleInputChange( 'thickfact' )}
                placeholder="thickfact"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="linmeth">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.linmeth )}
                name="linmeth"
                value={solver.linmeth}
                cast={parseInt}
                onChange={handleInputChange( 'linmeth' )}
                placeholder="linmeth"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="iprnwt">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.iprnwt )}
                name="iprnwt"
                value={solver.iprnwt}
                cast={parseInt}
                onChange={handleInputChange( 'iprnwt' )}
                placeholder="iprnwt"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="ibotavg">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.ibotavg )}
                name="ibotavg"
                value={solver.ibotavg}
                cast={parseInt}
                onChange={handleInputChange( 'ibotavg' )}
                placeholder="ibotavg"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="options">
            <Select
                clearable={false}
                name="options"
                disabled={readOnly}
                value={solver.options}
                onChange={handleSelectChange( 'options' )}
                options={[
                    {
                        value: 'SPECIFIED',
                        label: 'SPECIFIED'
                    },
                    {
                        value: 'SIMPLE',
                        label: 'SIMPLE'
                    },
                    {
                        value: 'MODERATE',
                        label: 'MODERATE'
                    },
                    {
                        value: 'COMPLEX',
                        label: 'COMPLEX'
                    },
                ]}
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="continue">
            <Select
                clearable={false}
                name="continue"
                disabled={readOnly}
                value={solver.continue}
                onChange={handleSelectChange( 'continue' )}
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
        <LayoutComponents.InputGroup label="dbdtheta">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.dbdtheta )}
                name="dbdtheta"
                value={solver.dbdtheta}
                cast={parseFloat}
                onChange={handleInputChange( 'dbdtheta' )}
                placeholder="dbdtheta"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="dbdkappa">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.dbdkappa )}
                name="dbdkappa"
                value={solver.dbdkappa}
                cast={parseFloat}
                onChange={handleInputChange( 'dbdkappa' )}
                placeholder="dbdkappa"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="dbdgamma">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.dbdgamma )}
                name="dbdgamma"
                value={solver.dbdgamma}
                cast={parseFloat}
                onChange={handleInputChange( 'dbdgamma' )}
                placeholder="dbdgamma"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="momfact">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.momfact )}
                name="momfact"
                value={solver.momfact}
                cast={parseFloat}
                onChange={handleInputChange( 'momfact' )}
                placeholder="momfact"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="backflag">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.backflag )}
                name="backflag"
                value={solver.backflag}
                cast={parseInt}
                onChange={handleInputChange( 'backflag' )}
                placeholder="backflag"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="maxbackiter">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.maxbackiter )}
                name="maxbackiter"
                value={solver.maxbackiter}
                cast={parseInt}
                onChange={handleInputChange( 'maxbackiter' )}
                placeholder="maxbackiter"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="backtol">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.backtol )}
                name="backtol"
                value={solver.backtol}
                cast={parseFloat}
                onChange={handleInputChange( 'backtol' )}
                placeholder="backtol"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="backreduce">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.backreduce )}
                name="backreduce"
                value={solver.backreduce}
                cast={parseFloat}
                onChange={handleInputChange( 'backreduce' )}
                placeholder="backreduce"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="maxitinner">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.maxitinner )}
                name="maxitinner"
                value={solver.maxitinner}
                cast={parseInt}
                onChange={handleInputChange( 'maxitinner' )}
                placeholder="maxitinner"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="ilumethod">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.ilumethod )}
                name="ilumethod"
                value={solver.ilumethod}
                cast={parseInt}
                onChange={handleInputChange( 'ilumethod' )}
                placeholder="ilumethod"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="levfill">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.levfill )}
                name="levfill"
                value={solver.levfill}
                cast={parseInt}
                onChange={handleInputChange( 'levfill' )}
                placeholder="levfill"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="stoptol">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.stoptol )}
                name="stoptol"
                value={solver.stoptol}
                cast={parseFloat}
                onChange={handleInputChange( 'stoptol' )}
                placeholder="stoptol"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="msdr">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.msdr )}
                name="msdr"
                value={solver.msdr}
                cast={parseInt}
                onChange={handleInputChange( 'msdr' )}
                placeholder="msdr"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="iacl">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.iacl )}
                name="iacl"
                value={solver.iacl}
                cast={parseInt}
                onChange={handleInputChange( 'iacl' )}
                placeholder="iacl"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="norder">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.norder )}
                name="norder"
                value={solver.norder}
                cast={parseInt}
                onChange={handleInputChange( 'norder' )}
                placeholder="norder"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="level">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.level )}
                name="level"
                value={solver.level}
                cast={parseInt}
                onChange={handleInputChange( 'level' )}
                placeholder="level"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="north">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.north )}
                name="north"
                value={solver.north}
                cast={parseInt}
                onChange={handleInputChange( 'north' )}
                placeholder="north"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="iredsys">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.iredsys )}
                name="iredsys"
                value={solver.iredsys}
                cast={parseInt}
                onChange={handleInputChange( 'iredsys' )}
                placeholder="iredsys"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="rrctols">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.rrctols )}
                name="rrctols"
                value={solver.rrctols}
                cast={parseFloat}
                onChange={handleInputChange( 'rrctols' )}
                placeholder="rrctols"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="idroptol">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.idroptol )}
                name="idroptol"
                value={solver.idroptol}
                cast={parseInt}
                onChange={handleInputChange( 'idroptol' )}
                placeholder="idroptol"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="epsrn">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.epsrn )}
                name="epsrn"
                value={solver.epsrn}
                cast={parseFloat}
                onChange={handleInputChange( 'epsrn' )}
                placeholder="epsrn"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="hclosexmd">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.hclosexmd )}
                name="hclosexmd"
                value={solver.hclosexmd}
                cast={parseFloat}
                onChange={handleInputChange( 'hclosexmd' )}
                placeholder="hclosexmd"
            />
        </LayoutComponents.InputGroup>
        <LayoutComponents.InputGroup label="mxiterxmd">
            <Input
                disabled={readOnly}
                type={getTypeForInput( solver.mxiterxmd )}
                name="mxiterxmd"
                value={solver.mxiterxmd}
                cast={parseInt}
                onChange={handleInputChange( 'mxiterxmd' )}
                placeholder="mxiterxmd"
            />
        </LayoutComponents.InputGroup>
    </section>);
};

export default pure( solverPropertiesPcg );
