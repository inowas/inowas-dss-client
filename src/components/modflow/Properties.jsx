import '../../less/leaflet.less';


import React, { Component, PropTypes } from 'react';
import PropertyWrapper from './Tool';
import ModelEditorBoundaries from '../../containers/tools/ModelEditorBoundaries';
import ModelEditorGeneral from '../../containers/tools/ModelEditorGeneral';
import styleGlobals from 'styleGlobals';

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

export default class ModelEditor extends Component {

    static propTypes = {
        selectedProperty: PropTypes.string.isRequired,
        close: PropTypes.func.isRequired,

        tool: PropTypes.string.isRequired,
        id: PropTypes.string,
        view: PropTypes.string,
        setEditorState: PropTypes.func,
        setView: PropTypes.func,
        addAreaControlPoint: PropTypes.func,
        setMapPosition: PropTypes.func,
        area: PropTypes.array,
        setMousePositionOnMap: PropTypes.func,
        firstAreaControlPoint: PropTypes.object,
        lastAreaControlPoint: PropTypes.object,
        mousePositionOnMap: PropTypes.object,
        setDraggedAreaControlPoint: PropTypes.func,
        draggedAreaControlPoint: PropTypes.number,
        setAreaLatitude: PropTypes.func,
        setAreaLongitude: PropTypes.func,
        activeAreaControlPoint: PropTypes.number,
        setActiveAreaControlPoint: PropTypes.func,
        updateBoundingBox: PropTypes.func,
        boundaries: PropTypes.array,
        initial: PropTypes.bool,
        activeBoundary: PropTypes.string,
        setActiveBoundary: PropTypes.func,
        addBoundary: PropTypes.func,
        removeBoundary: PropTypes.func,
        draggedBoundary: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        setDraggedBoundary: PropTypes.func,
        updateBoundary: PropTypes.func,
        addBoundaryControlPoint: PropTypes.func,
        updateBoundaryControlPoint: PropTypes.func,
        activeBoundaryControlPoint: PropTypes.number,
        setActiveBoundaryControlPoint: PropTypes.func,
        deleteAreaControlPoint: PropTypes.func
    };

    render( ) {
        const { tool, close, selectedProperty } = this.props;

        switch ( selectedProperty ) {

            case 'create':
                return (
                    <PropertyWrapper heading="Create Model" style={styles.tool} close={close} closeable={false}>
                        <ModelEditorGeneral tool={tool}/>
                    </PropertyWrapper>
                );

            case 'general':
                return (
                    <PropertyWrapper heading="General Model Properties" style={styles.tool} close={close} closeable={true}>
                        <ModelEditorGeneral tool={tool}/>
                    </PropertyWrapper>
                );

            case 'boundaries':
                return (
                    <PropertyWrapper heading="Boundary Conditions" style={styles.tool} close={close} closeable={true}>
                        <ModelEditorBoundaries tool={tool}/>
                    </PropertyWrapper>
                );

            default:
                return null;
        }

    }
}
