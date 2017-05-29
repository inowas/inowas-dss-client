import {
    addAreaControlPoint,
    deleteAreaControlPoint,
    setActiveAreaControlPoint,
    updateAreaControlPoint,
    setState,
} from '../../actions/T03';

import ControlPointList from '../../components/modflow/ControlPointList';
import { connect } from 'react-redux';
import { getArea } from '../../reducers/T03/general';
import { getState } from '../../reducers/T03/ui';

const mapStateToProps = state => {
    return {
        list: getArea( state.T03.model.general ),
        state: getState( state.T03.ui ),
        statePrefix: 'area',
        backTo: 'general',
        title: 'Area'
    };
};

const T03Area = connect(mapStateToProps, {
    addControlPoint: addAreaControlPoint,
    updateControlPoint: updateAreaControlPoint,
    setState,
    setActiveControlPoint: setActiveAreaControlPoint,
    deleteControlPoint: deleteAreaControlPoint
})( ControlPointList );

export default T03Area;
