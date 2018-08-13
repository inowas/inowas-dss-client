import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import styleGlobals from 'styleGlobals';
import {LayoutComponents} from '../../../core/index';
import {Segment, Form} from 'semantic-ui-react';

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

    input: {
        padding: 0
    }
};

class OptimizationResultsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Test
            </div>
        );
    }
}

OptimizationResultsComponent.propTypes = {
    optimization: PropTypes.object.isRequired
};

export default pure(ConfiguredRadium(OptimizationResultsComponent));
