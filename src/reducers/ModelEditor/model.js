import {
    handleAreaAddControlPoint, handleAreaDeleteControlPoint,
    handleAreaUpdateControlPoint
} from './general';
import {
    handleDeleteBoundary, handleAddBoundaryControlPoint,
    handleUpdateBoundaryControlPoint, handleDeleteBoundaryControlPoint, handleUpdateBoundaryPumpingRate,
    handleAddBoundaryPumpingRate, handleUpdateBoundary
} from './boundaries';
import {ActionTypeBoundaries, ActionTypeModel} from "../../actions/modelEditor";
import {calcBoundsOfPolygon} from "../../calculations/geoTools";

export function getInitialState () {
    return {
        name: "NewModflowModel",
        description: "NewModflowModelDescription",
        grid_size: {
            n_x: 50,
            n_y: 60
        },
        time_unit: 2,
        length_unit: 2,
        bounding_box: [
            [ 0, 0 ],
            [ 10, 10 ]
        ],
        geometry: { coordinates: [] },
        boundaries: [],
    };
}

const createModelReducer = tool => {
    return ( state = getInitialState(), action ) => {
        if ( action.tool !== tool ) {
            return state;
        }

        switch ( action.type ) {
            case ActionTypeModel.SET_NAME:
                return { ...state, name: action.payload };

            case ActionTypeModel.SET_DESCRIPTION:
                return { ...state, description: action.payload };

            case ActionTypeModel.SET_TIME_UNIT:
                return { ...state, time_unit: action.payload.toNumber };

            case ActionTypeModel.SET_LENGTH_UNIT:
                return { ...state, length_unit: action.payload.toNumber };

            case ActionTypeModel.SET_AREA:
                return { ...state, geometry: { coordinates: action.payload, type: "Polygon" } };

            case ActionTypeModel.ADD_AREA_CONTROL_POINT:
                return handleAreaAddControlPoint( state, action );

            case ActionTypeModel.UPDATE_AREA_CONTROL_POINT:
                return handleAreaUpdateControlPoint( state, action );

            case ActionTypeModel.DELETE_AREA_CONTROL_POINT:
                return handleAreaDeleteControlPoint( state, action );

            case ActionTypeBoundaries.SET_BOUNDARIES:
                return { ...state, boundaries: action.payload.map( b => b.toObject ) };

            case ActionTypeBoundaries.ADD_BOUNDARY:
                return { ...state, boundaries: [ ...state.boundaries, action.payload.toObject ] };

            case ActionTypeBoundaries.UPDATE_BOUNDARY:
                return { ...state, boundaries: handleUpdateBoundary(state.boundaries, action) };

            case ActionTypeModel.UPDATE_BOUNDING_BOX:
                return { ...state, bounding_box: calcBoundsOfPolygon(state.geometry.coordinates) };

            case ActionTypeBoundaries.DELETE_BOUNDARY:
                return { ...state, boundaries: handleDeleteBoundary(state.boundaries, action) };

            case ActionTypeBoundaries.ADD_BOUNDARY_CONTROL_POINT:
                return { ...state, boundaries: handleAddBoundaryControlPoint(state.boundaries, action) };

            case ActionTypeBoundaries.UPDATE_BOUNDARY_CONTROL_POINT:
                return { ...state, boundaries: handleUpdateBoundaryControlPoint(state.boundaries, action) };

            case ActionTypeBoundaries.DELETE_BOUNDARY_CONTROL_POINT:
                return { ...state, boundaries: handleDeleteBoundaryControlPoint(state.boundaries, action) };

            case ActionTypeBoundaries.UPDATE_BOUNDARY_PUMPING_RATE:
                return { ...state, boundaries: handleUpdateBoundaryPumpingRate(state.boundaries, action) };

            case ActionTypeBoundaries.ADD_BOUNDARY_PUMPING_RATE:
                return { ...state, boundaries: handleAddBoundaryPumpingRate(state.boundaries, action) };

            default:
                return state
        }
    }
};

export default createModelReducer;
