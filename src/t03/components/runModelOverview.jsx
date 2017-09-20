import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import { pure } from 'recompose';
import styleGlobals from 'styleGlobals';
import { LayoutComponents } from '../../core';
import RunModelOverviewMap from './runModelOverviewMap';
import RunModelValidation from './runModelValidation';

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

const runModelOverview = ({ model, route, routeType }) => {

    return (<div style={[ styles.columnContainer ]}>
        <LayoutComponents.Column
            heading="Overview"
            style={[ styles.columnNotLast ]}
        >
            <RunModelOverviewMap style={[ styles.expandVertical ]} model={model}/>
            <RunModelValidation model={model} route={route} routeType={routeType}/>
        </LayoutComponents.Column>
    </div>);
};

export default pure( ConfiguredRadium( runModelOverview ) );
