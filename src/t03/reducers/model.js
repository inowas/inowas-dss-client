import {
    handleAreaAddControlPoint, handleAreaDeleteControlPoint,
    handleAreaUpdateControlPoint
} from './general';
import {
    handleDeleteBoundary, handleAddBoundaryControlPoint,
    handleUpdateBoundaryControlPoint, handleDeleteBoundaryControlPoint, handleUpdateBoundaryPumpingRate,
    handleAddBoundaryPumpingRate, handleUpdateBoundary, handleUpdateBoundaryGeometry, handleUpdateAreaGeometry,
    handleBoundaryGeometrySetEditTrue
} from './boundary';
import {Action, Event} from "../actions/index";
import {calcBoundsOfPolygon} from "../../calculations/geoTools";
import {model} from "../selectors/index";

const createModelReducer = tool => {
    return ( state = model.getInitialState(), action ) => {
        if ( action.tool !== tool ) {
            return state;
        }

        switch ( action.type ) {
            case Event.MODFLOW_MODEL_CREATED:
            case Event.MODFLOW_MODEL_UPDATED:
            case Action.SET_MODFLOW_MODEL:
                return {
                    ...state,
                    ...action.payload
                };

            case Action.UPDATE_GEOMETRY:
                return { ...state, boundaries: handleUpdateBoundaryGeometry(state.boundaries, action), geometry: handleUpdateAreaGeometry(state, action)};

            case Action.DESTROY_MODFLOW_MODEL:
                return model.getInitialState();

            case Action.SET_MODEL_AREA:
                return { ...state, geometry: action.payload };

            case Action.CREATE_MODEL_AREA:
                return {
                    ...state,
                    geometry: {create: true}
                };

            case Action.EDIT_MODEL_AREA:
                let geometry = state.geometry;
                geometry.edit = true;

                return {
                    ...state,
                    geometry:  geometry
                };

            case Action.ADD_AREA_CONTROL_POINT:
                return { ...state, geometry: handleAreaAddControlPoint( state.geometry, action )};

            case Action.UPDATE_AREA_CONTROL_POINT:
                return { ...state, geometry: handleAreaUpdateControlPoint( state.geometry, action )};

            case Action.DELETE_AREA_CONTROL_POINT:
                return { ...state, geometry: handleAreaDeleteControlPoint( state.geometry, action )};

            case Action.SET_BOUNDARIES:
                return { ...state, boundaries: action.payload };

            case Action.ADD_BOUNDARY:
                return { ...state, boundaries: [ ...state.boundaries, action.payload ] };

            case Action.EDIT_BOUNDARY_GEOMETRY:
                return {
                    ...state,
                    boundaries: handleBoundaryGeometrySetEditTrue(state.boundaries, action) };

            case Action.SET_BOUNDARY_GEOMETRY:
                return {
                    ...state,
                    boundaries: handleUpdateBoundaryGeometry(state.boundaries, action) };

            case Action.SET_BOUNDARY:
            case Action.UPDATE_BOUNDARY:
                return {
                    ...state,
                    boundaries: handleUpdateBoundary(state.boundaries, action)
                };

            case Action.UPDATE_BOUNDING_BOX:
                return { ...state, bounding_box: calcBoundsOfPolygon(state.geometry.coordinates) };

            case Event.BOUNDARY_REMOVED:
                return { ...state, boundaries: handleDeleteBoundary(state.boundaries, action) };

            case Action.ADD_BOUNDARY_CONTROL_POINT:
                return { ...state, boundaries: handleAddBoundaryControlPoint(state.boundaries, action) };

            case Action.UPDATE_BOUNDARY_CONTROL_POINT:
                return { ...state, boundaries: handleUpdateBoundaryControlPoint(state.boundaries, action) };

            case Action.DELETE_BOUNDARY_CONTROL_POINT:
                return { ...state, boundaries: handleDeleteBoundaryControlPoint(state.boundaries, action) };

            case Action.UPDATE_BOUNDARY_PUMPING_RATE:
                return { ...state, boundaries: handleUpdateBoundaryPumpingRate(state.boundaries, action) };

            case Action.ADD_BOUNDARY_PUMPING_RATE:
                return { ...state, boundaries: handleAddBoundaryPumpingRate(state.boundaries, action) };

            default:
                return state
        }
    }
};

export default createModelReducer;
