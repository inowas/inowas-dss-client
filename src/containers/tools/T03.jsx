import * as actions from '../../actions/T03';

import React, { Component, PropTypes } from 'react';
import { getArea, getFirstAreaCoordinate, getLastAreaCoordinate } from '../../reducers/T03/general';
import { getState, getMapPosition, getMousePositionOnMap, getDraggedAreaCoordinate, getActiveAreaCoordinate } from '../../reducers/T03/ui';

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
                <Navbar links={navigation}/>
                <ModelEditorMap {...this.props} initial={initial}/>
            </div>
        );
    }

}

const mapStateToProps = (state, { params }) => {
    return {
        state: getState( state.T03.ui ),
        area: getArea( state.T03.model.general ),
        firstAreaCoordinate: getFirstAreaCoordinate( state.T03.model.general ),
        lastAreaCoordinate: getLastAreaCoordinate( state.T03.model.general ),
        mapPosition: getMapPosition( state.T03.ui ),
        mousePositionOnMap: getMousePositionOnMap( state.T03.ui ),
        draggedAreaCoordinate: getDraggedAreaCoordinate( state.T03.ui ),
        activeAreaCoordinate: getActiveAreaCoordinate( state.T03.ui ),
        id: params.id
    };
};

// eslint-disable-next-line no-class-assign
T03 = withRouter( connect( mapStateToProps, actions )( T03 ));

export default T03;
