import {
    addBoundaryControlPoint,
    setActiveBoundaryControlPoint,
    updateBoundaryControlPoint,
    deleteBoundaryControlPoint,
    setState,
} from '../../actions/T03';

import ControlPointList from '../../components/modflow/ControlPointList';
import { connect } from 'react-redux';
import { getBoundary } from '../../reducers/ModelEditor/boundaries';
import { getState, getActiveBoundary } from '../../reducers/ModelEditor/ui';

const mapStateToProps = state => {
    return {
        list: getBoundary( state.T03.model.boundaries, getActiveBoundary(state.T03.ui) ).geometry,
        state: getState( state.T03.ui ),
        statePrefix: 'river',
        backTo: 'boundariesOverlay',
        title: 'River'
    };
};

const T03River = connect(mapStateToProps, {
    addControlPoint: addBoundaryControlPoint,
    updateControlPoint: updateBoundaryControlPoint,
    setState,
    setActiveControlPoint: setActiveBoundaryControlPoint,
    deleteControlPoint: deleteBoundaryControlPoint
})( ControlPointList );

export default T03River;
