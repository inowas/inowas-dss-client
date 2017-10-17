import React from 'react';
import Select from '../../components/primitive/Select';
import { LayoutComponents } from '../../core/';
import { map } from 'lodash';

export default ({ value, label, handleSelectChange, models }) => {
    if (label) {
        return (
            <LayoutComponents.InputGroup label={label}>
                <Select
                    clearable={false}
                    value={value}
                    onChange={handleSelectChange}
                    options={
                        map( models, v => {return { label: v.name, value: v.id };} )
                    }
                />
            </LayoutComponents.InputGroup>
        );
    }
    return <Select
        clearable={false}
        value={value}
        onChange={handleSelectChange}
        options={
            map( models, v => {return { label: v.name, value: v.id };} )
        }
    />
}
