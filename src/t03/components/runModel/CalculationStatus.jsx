import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {Progress} from 'semantic-ui-react';

const status = ({calculation}) => (
    <Progress value={calculation.state} total={4} success={calculation.state === 4}>
        {calculation.state === 0 && ''}
        {calculation.state === 1 && 'Preprocessing...'}
        {calculation.state === 2 && 'Calculation queued...'}
        {calculation.state === 3 && 'Calculating...'}
        {calculation.state === 4 && 'Calculation finished.'}
    </Progress>
);

status.propTypes = {
    calculation: PropTypes.object.isRequired
};

export default ConfiguredRadium(status);
