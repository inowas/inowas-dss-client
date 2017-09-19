import Console from '../../components/primitive/Console';
import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import styleGlobals from 'styleGlobals';
import { LayoutComponents } from '../../core';

const styles = {
    columnContainer: {
        display: 'flex'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

const logs = ({calculation}) => {

    return (<div style={[ styles.columnContainer ]}>
        <LayoutComponents.Column
            heading="Show logs"
            style={[ styles.columnNotLast ]}
        >
            <Console>{calculation.message}</Console>
        </LayoutComponents.Column>
    </div>)
};

export default ConfiguredRadium(logs);
