import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import { pure } from 'recompose';
import styleGlobals from 'styleGlobals';

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
    },

    expandVertical: {
        flex: 1
    },
};

const optimizationObjects = ({ model, route, routeType }) => {
    return (<p>Objects</p>);
};

export default pure( ConfiguredRadium( optimizationObjects ) );
