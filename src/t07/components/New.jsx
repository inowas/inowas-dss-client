import React from 'react';
import { LayoutComponents } from '../../core/';
import { map } from 'lodash';
import SelectModel from './SelectModel';

export default ({ basemodelId, handleSelectChange, models }) => {
    return (
        <SelectModel
            label={'Base Model'}
            value={basemodelId}
            handleSelectChange={handleSelectChange}
            models={models}
        />
    );
}
