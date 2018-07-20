import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import styleGlobals from 'styleGlobals';
import {LayoutComponents} from '../../../core/index';
import {RunModelOverviewMap, RunModelValidation} from '../index';

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

const RunModelOverview = ({model, route, routeType}) => (
    <div style={[styles.columnContainer]}>
        <LayoutComponents.Column
            heading="Overview"
            style={[styles.columnNotLast]}
        >
            <RunModelOverviewMap style={[styles.expandVertical]} model={model}/>
            <RunModelValidation model={model} route={route} routeType={routeType}/>
        </LayoutComponents.Column>
    </div>
);

RunModelOverview.propTypes = {
    model: PropTypes.object.isRequired,
    route: PropTypes.func.isRequired,
    routeType: PropTypes.func.isRequired
};

export default pure(ConfiguredRadium(RunModelOverview));
