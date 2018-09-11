import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {Progress} from 'semantic-ui-react';
import * as Selector from '../../selectors';

const status = ({calculation}) => (
    <Progress value={calculation.state} total={6} success={calculation.state === 6}>
        {calculation.state === Selector.model.CALCULATION_STATE_NEW && ''}
        {calculation.state === Selector.model.CALCULATION_STATE_STARTED && 'Started...'}
        {calculation.state === Selector.model.CALCULATION_STATE_PREPROCESSING && 'Preprocessing...'}
        {calculation.state === Selector.model.CALCULATION_STATE_PREPROCESSING_FINISHED && 'Preprocessing finished...'}
        {calculation.state === Selector.model.CALCULATION_STATE_QUEUED && 'Queued...'}
        {calculation.state === Selector.model.CALCULATION_STATE_CALCULATING && 'Calculating...'}
        {calculation.state === Selector.model.CALCULATION_STATE_FINISHED && 'Calculation finished!'}
    </Progress>
);

status.propTypes = {
    calculation: PropTypes.object.isRequired
};

export default ConfiguredRadium(status);
