import {
    handleDeleteBoundary, handleAddBoundaryControlPoint,
    handleUpdateBoundaryControlPoint, handleDeleteBoundaryControlPoint, handleUpdateBoundaryPumpingRate,
    handleAddBoundaryPumpingRate, handleUpdateBoundary, handleUpdateBoundaryGeometry, handleUpdateAreaGeometry,
    handleBoundaryGeometrySetEditTrue, handleUpdateBoundingBox, handleAreaGeometrySetEditTrue,
    handleRemoveAreaGeometryFlags, handleRemoveBoundaryGeometryFlags, handleUpdateLayer
} from './boundary';
import { Action, Event } from '../actions/index';
import { calcBoundsOfPolygon } from '../../calculations/geoTools';
import { model } from '../selectors/index';

const createModelReducer = tool => {
    return (state = model.getInitialState(), action) => {
        if (action.tool !== tool) {
            return state;
        }

        switch (action.type) {
            case Event.MODFLOW_MODEL_CREATED:
            case Event.MODFLOW_MODEL_UPDATED:
            case Action.SET_MODFLOW_MODEL:
                return {
                    ...state,
                    ...action.payload
                };

            case Action.UPDATE_GEOMETRY:
                return {
                    ...state,
                    boundaries: handleUpdateBoundaryGeometry(state.boundaries, action),
                    geometry: handleUpdateAreaGeometry(state)
                };

            case Action.REMOVE_GEOMETRY_FLAGS:
                return {
                    ...state,
                    geometry: handleRemoveAreaGeometryFlags(state),
                    boundaries: handleRemoveBoundaryGeometryFlags(state)
                };

            case Action.DESTROY_MODFLOW_MODEL:
                return model.getInitialState();

            case Action.SET_MODEL_AREA:
                return {
                    ...state,
                    geometry: action.payload.geometry,
                    bounding_box: handleUpdateBoundingBox(state.bounding_box, action.payload.latLngBounds)
                };

            case Action.CREATE_MODEL_AREA:
                return {
                    ...state,
                    geometry: {create: true}
                };

            case Action.EDIT_MODEL_AREA:
                return {
                    ...state,
                    geometry: handleAreaGeometrySetEditTrue(state.geometry)
                };

            case Action.SET_BOUNDARIES:
                return {...state, boundaries: action.payload};

            case Action.ADD_BOUNDARY:
                return {...state, boundaries: [...state.boundaries, action.payload]};

            case Action.EDIT_BOUNDARY_GEOMETRY:
                return {
                    ...state,
                    boundaries: handleBoundaryGeometrySetEditTrue(state.boundaries, action)
                };

            case Action.SET_BOUNDARY_GEOMETRY:
                return {
                    ...state,
                    boundaries: handleUpdateBoundaryGeometry(state.boundaries, action)
                };

            case Action.SET_BOUNDARY:
            case Action.UPDATE_BOUNDARY:
            case Event.BOUNDARY_UPDATED:
                return {
                    ...state,
                    boundaries: handleUpdateBoundary(state.boundaries, action)
                };

            case Action.SET_LAYER:
                return {
                    ...state,
                    soilmodel: handleUpdateLayer(state.soilmodel, action)
                };

            case Action.UPDATE_BOUNDING_BOX:
                return {...state, bounding_box: calcBoundsOfPolygon(state.geometry.coordinates)};

            case Event.BOUNDARY_REMOVED:
                return {...state, boundaries: handleDeleteBoundary(state.boundaries, action)};

            case Action.ADD_BOUNDARY_CONTROL_POINT:
                return {...state, boundaries: handleAddBoundaryControlPoint(state.boundaries, action)};

            case Action.UPDATE_BOUNDARY_CONTROL_POINT:
                return {...state, boundaries: handleUpdateBoundaryControlPoint(state.boundaries, action)};

            case Action.DELETE_BOUNDARY_CONTROL_POINT:
                return {...state, boundaries: handleDeleteBoundaryControlPoint(state.boundaries, action)};

            case Action.UPDATE_BOUNDARY_PUMPING_RATE:
                return {...state, boundaries: handleUpdateBoundaryPumpingRate(state.boundaries, action)};

            case Action.ADD_BOUNDARY_PUMPING_RATE:
                return {...state, boundaries: handleAddBoundaryPumpingRate(state.boundaries, action)};

            case Action.SET_RESULTS:
                return {...state, results: action.payload};

            case Action.SET_SOILMODEL:
                return {...state, soilmodel: action.payload};

            default:
                return state;
        }
    };
};

export default createModelReducer;
