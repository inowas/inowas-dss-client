import * as actions from '../../actions/modelEditor';

import React, { Component, PropTypes } from 'react';
// import { getGeometry } from '../../reducers/ModelEditor/general';
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
// import { getBoundaries } from '../../reducers/ModelEditor/boundaries';
// import {Properties} from '../../t03/components/index';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class T07E extends Component {

    static propTypes = {
        id: PropTypes.string,
        setEditorState: PropTypes.func,
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
            <div className="toolT07E">
                <Navbar links={navigation} />
                {/*<Properties {...this.props} initial={initial} tool={'T07E'} />*/}
            </div>
        );
    }

}

const mapStateToProps = (state, { params }) => {
    return {
        state: getState( state.T07E.ui ),
        // area: getGeometry( state.T07E.model.general ),
        mapPosition: getMapPosition( state.T07E.ui ),
        mousePositionOnMap: getMousePositionOnMap( state.T07E.ui ),
        draggedAreaControlPoint: getDraggedAreaControlPoint( state.T07E.ui ),
        activeAreaControlPoint: getActiveAreaControlPoint( state.T07E.ui ),
        // boundaries: getBoundaries( state.T07E.model.boundaries ),
        id: params.id,
        activeBoundary: getActiveBoundary( state.T07E.ui ),
        draggedBoundary: getDraggedBoundary( state.T07E.ui ),
        activeBoundaryControlPoint: getActiveBoundaryControlPoint( state.T07E.ui )
    };
};

const mapDispatchToProps = dispatch => {
    // wrap actions in dispatch and apply T07E as first argument
    const wrappedActions = {};
    for (const key in actions) {
        if(actions.hasOwnProperty(key)) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function() {
                const args = Array.prototype.slice.call(arguments);
                dispatch(actions[key]('T07E', ...args));
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
T07E = withRouter( connect( mapStateToProps, mapDispatchToProps )( T07E ));

export default T07E;
