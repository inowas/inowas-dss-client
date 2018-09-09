import React from 'react';
import PropTypes from 'prop-types';
import Console from '../../../components/primitive/Console';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import {LayoutComponents} from '../../../core/index';

const styles = {
    columnContainer: {
        display: 'flex'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    }
};

const CalculationLogs = ({calculation}) => (
    <div style={[styles.columnContainer]}>
        <LayoutComponents.Column
            heading="Show logs"
            style={[styles.columnNotLast]}
        >
            <Console>{calculation.message}</Console>
        </LayoutComponents.Column>
    </div>
);

CalculationLogs.propTypes = {
    calculation: PropTypes.object
};

export default ConfiguredRadium(CalculationLogs);
