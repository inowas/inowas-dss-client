import '../../less/leaflet.less';

import React from 'react';
import { LayoutComponents } from '../../core/index';
import { ModelEditorGeneral, ModelEditorBoundary, ModelEditorSoilmodel } from '../containers/index';
import ModelEditorResults from './ModelEditorResults';
import styleGlobals from 'styleGlobals';
import { pure } from 'recompose';
import ConfiguredRadium from 'ConfiguredRadium';

const styles = {
    window: {
        width: 4 * styleGlobals.dimensions.gridColumn + 3 * styleGlobals.dimensions.gridGutter,
        position: 'relative',
        zIndex: 1100
    }
};

const properties = ({ tool, close, selectedProperty, type }) => {
    switch ( selectedProperty ) {
        case 'create':
            return (
                <LayoutComponents.CloseableWindow heading="Create Model" style={styles.window} close={close} closeable={false}>
                    <ModelEditorGeneral tool={tool}/>
                </LayoutComponents.CloseableWindow>
            );

        case 'boundaries':
            return (
                <LayoutComponents.CloseableWindow heading="Boundary Conditions" style={styles.window} close={close} closeable>
                    <ModelEditorBoundary tool={tool}/>
                </LayoutComponents.CloseableWindow>
            );

        case 'soilmodel':
            return (
                <LayoutComponents.CloseableWindow heading="Soilmodel" style={styles.window} close={close} closeable>
                    <ModelEditorSoilmodel tool={tool}/>
                </LayoutComponents.CloseableWindow>
            );

        case 'results':
            return (
                <LayoutComponents.CloseableWindow heading="Results" style={styles.window}>
                    <ModelEditorResults type={type} tool={tool} />
                </LayoutComponents.CloseableWindow>
            );

        default:
            return (
                <LayoutComponents.CloseableWindow heading="General Model Properties" style={styles.window} close={close} closeable>
                    <ModelEditorGeneral tool={tool}/>
                </LayoutComponents.CloseableWindow>
            );
    }
};

export default pure(ConfiguredRadium( properties ));
