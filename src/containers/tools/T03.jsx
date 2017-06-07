import * as actions from '../../actions/T03';

import React, { Component, PropTypes } from 'react';
import { getArea } from '../../reducers/ModelEditor/general';
import {
    getState,
    getMapPosition,
    getMousePositionOnMap,
    getDraggedAreaControlPoint,
    getActiveAreaControlPoint,
    getActiveBoundary,
    getDraggedBoundary,
    getActiveBoundaryControlPoint
} from '../../reducers/ModelEditor/ui';
import { getBoundaries } from '../../reducers/ModelEditor/boundaries';
import ModelEditorMap from '../../components/modflow/ModelEditorMap';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class T03 extends Component {

    static propTypes = {
        id: PropTypes.string,
        setState: PropTypes.func,
        push: PropTypes.func
    }

    state = {
        navigation: [ ]
    }

    render( ) {
        const { navigation } = this.state;
        const { id } = this.props;
        const initial = ( id === undefined || id === null );

        return (
            <div className="toolT03">
                <Navbar links={navigation} />
                <ModelEditorMap {...this.props} initial={initial} />
            </div>
        );
    }

}

const mapStateToProps = (state, { params }) => {
    return {
        state: getState( state.T03.ui ),
        area: getArea( state.T03.model.general ),
        mapPosition: getMapPosition( state.T03.ui ),
        mousePositionOnMap: getMousePositionOnMap( state.T03.ui ),
        draggedAreaControlPoint: getDraggedAreaControlPoint( state.T03.ui ),
        activeAreaControlPoint: getActiveAreaControlPoint( state.T03.ui ),
        boundaries: getBoundaries( state.T03.model.boundaries ),
        id: params.id,
        activeBoundary: getActiveBoundary( state.T03.ui ),
        draggedBoundary: getDraggedBoundary( state.T03.ui ),
        activeBoundaryControlPoint: getActiveBoundaryControlPoint( state.T03.ui )
    };
};

// eslint-disable-next-line no-class-assign
T03 = withRouter( connect( mapStateToProps, actions )( T03 ));

export default T03;
