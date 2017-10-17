import React from 'react';
import Select from '../../components/primitive/Select';
import { LayoutComponents } from '../../core/';
import { map } from 'lodash';

export default ({ basemodelId, handleSelectChange, models }) => {
    return (
        <div>
            <LayoutComponents.InputGroup label="Base Model">
                <Select
                    clearable={false}
                    value={basemodelId}
                    onChange={handleSelectChange( 'basemodel_id' )}
                    options={
                        map( models, v => {return { label: v.name, value: v.id };} )
                    }
                />
            </LayoutComponents.InputGroup>
        </div>
    );
}
