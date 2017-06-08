import * as actions from '../../actions/modelEditor';

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
                <ModelEditorMap {...this.props} initial={initial} tool={'T03'} />
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

const mapDispatchToProps = dispatch => {
    // wrap actions in dispatch and apply T03 as first argument
    const wrappedActions = {};
    for (const key in actions) {
        if(actions.hasOwnProperty(key)) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function() {
                const args = Array.prototype.slice.call(arguments);
                dispatch(actions[key]('T03', ...args));
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
T03 = withRouter( connect( mapStateToProps, mapDispatchToProps )( T03 ));

export default T03;
