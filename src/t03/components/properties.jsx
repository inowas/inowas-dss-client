import '../../less/leaflet.less';

import React from 'react';
import {LayoutComponents} from '../../core/index';
import {ModelEditorGeneral, ModelEditorBoundary} from '../containers/index';
import styleGlobals from 'styleGlobals';
import {pure} from 'recompose';

const styles = {
    wrapper: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: styleGlobals.dimensions.navBarHeight,
        bottom: 0,
        overflow: 'hidden'
    },
    map: {
        height: '100%',
        position: 'relative'
    },
    resetViewButton: {
        zIndex: 1100,
        position: 'absolute',
        top: styleGlobals.dimensions.spacing.large,
        right: styleGlobals.dimensions.spacing.large
    },
    boundingBox: {
        color: '#000',
        weight: 0.5,
        fillColor: 'blue',
        fillOpacity: 0.1
    },
    river: {
        color: '#000',
        weight: 0.5,
        fillColor: 'blue',
        fillOpacity: 0
    },
    overlayWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    overlay: {
        width: styleGlobals.dimensions.appWidth,
        padding: styleGlobals.dimensions.gridGutter,
        maxHeight: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex'
    },
    menu: {
        width: styleGlobals.dimensions.gridColumn,
        marginLeft: styleGlobals.dimensions.gridGutter,
        marginRight: styleGlobals.dimensions.gridGutter,
        marginBottom: 'auto', // pin element to top
        position: 'relative',
        zIndex: 1100
    },
    tool: {
        width: 4 * styleGlobals.dimensions.gridColumn + 3 * styleGlobals.dimensions.gridGutter,
        marginRight: styleGlobals.dimensions.gridGutter,
        position: 'relative',
        zIndex: 1100
    }
};

const properties = ( { tool, close, selectedProperty } ) => {
    switch ( selectedProperty ) {
        case 'create':
            return (
                <LayoutComponents.CloseableWindow heading="Create Model" style={styles.tool} close={close}
                                                  closeable={false}>
                    <ModelEditorGeneral tool={tool}/>
                </LayoutComponents.CloseableWindow>
            );

        case 'boundaries':
            return (
                <LayoutComponents.CloseableWindow heading="Boundary Conditions" style={styles.tool} close={close}
                                                  closeable={true}>
                    <ModelEditorBoundary tool={tool}/>
                </LayoutComponents.CloseableWindow>
            );

        default:
            return (
                <LayoutComponents.CloseableWindow heading="General Model Properties" style={styles.tool} close={close}
                                                  closeable={true}>
                    <ModelEditorGeneral tool={tool}/>
                </LayoutComponents.CloseableWindow>
            );
    }
};


export default pure( properties );
