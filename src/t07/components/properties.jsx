import React from 'react';
import { LayoutComponents } from '../../core/index';
import {
    ScenarioAnalysisGeneral,
} from '../containers/index';
import styleGlobals from 'styleGlobals';
import { pure } from 'recompose';
import ConfiguredRadium from 'ConfiguredRadium';

const styles = {
    window: {
        width:
            4 * styleGlobals.dimensions.gridColumn +
            3 * styleGlobals.dimensions.gridGutter,
        position: 'relative',
        zIndex: 1100
    }
};

const properties = ({ tool, close, selectedProperty, type }) => {
    switch (selectedProperty) {
        case 'create':
            return (
                <LayoutComponents.CloseableWindow
                    heading="Create Scenario Analysis"
                    style={styles.window}
                    close={close}
                    closeable={false}
                >
                    <ScenarioAnalysisGeneral tool={tool} />
                </LayoutComponents.CloseableWindow>
            );

        default:
            return (
                <LayoutComponents.CloseableWindow
                    heading="Scenario Analysis Properties"
                    style={styles.window}
                    close={close}
                    closeable
                >
                    <ScenarioAnalysisGeneral tool={tool} />
                </LayoutComponents.CloseableWindow>
            );
    }
};

export default pure(ConfiguredRadium(properties));
