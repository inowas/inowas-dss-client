import {
    handleDeleteBoundary, handleAddBoundaryControlPoint,
    handleUpdateBoundaryControlPoint, handleDeleteBoundaryControlPoint, handleUpdateBoundaryPumpingRate,
    handleAddBoundaryPumpingRate, handleUpdateBoundary, handleUpdateBoundaryGeometry, handleUpdateAreaGeometry,
    handleUpdateBoundingBox, handleUpdateLayer, handleRemoveLayer, handleAddLayer
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

            case Action.SET_ACTIVE_CELLS:
                return {
                    ...state,
                    active_cells: action.payload
                };

            case Action.UPDATE_GEOMETRY:
                return {
                    ...state,
                    boundaries: handleUpdateBoundaryGeometry(state.boundaries, action),
                    geometry: handleUpdateAreaGeometry(state)
                };

            case Action.DESTROY_MODFLOW_MODEL:
                return model.getInitialState();

            case Action.SET_MODEL_AREA:
                return {
                    ...state,
                    geometry: action.payload.geometry,
                    bounding_box: handleUpdateBoundingBox(state.bounding_box, action.payload.latLngBounds)
                };

            case Action.SET_BOUNDARIES:
                return {...state, boundaries: action.payload};

            case Action.ADD_BOUNDARY:
            // case Event.BOUNDARY_ADDED:
                return {...state, boundaries: [...state.boundaries, action.payload]};

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
            case Event.LAYER_UPDATED:
                return {
                    ...state,
                    soilmodel: handleUpdateLayer(state.soilmodel, action)
                };

            case Event.LAYER_ADDED:
                return {
                    ...state,
                    soilmodel: handleAddLayer(state.soilmodel, action)
                };

            case Event.LAYER_REMOVED:
                return {
                    ...state,
                    soilmodel: {
                        ...state.soilmodel,
                        layers: handleRemoveLayer( state.soilmodel.layers, action )
                    }
                };

            case Action.SET_STRESS_PERIODS:
            case Event.STRESS_PERIODS_UPDATED:
                return {
                    ...state,
                    stress_periods: action.payload
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

            case Action.SET_CALCULATION:
                return {...state, calculation: action.payload};

            case Event.MODFLOW_PACKAGE_UPDATED:
                return {
                    ...state,
                    packages: {
                        ...state.packages,
                        [ action.packageType ]: {
                            ...state.packages[ action.packageType ],
                            [ action.packageId ]: action.payload.data
                        }
                    }
                };
            case Action.SET_MODFLOW_PACKAGE:
                return {
                    ...state,
                    packages: {
                        ...state.packages,
                        [ action.packageType ]: {
                            ...state.packages[ action.packageType ],
                            [ action.packageId ]: action.payload
                        }
                    }
                };

            case Action.SET_MODFLOW_PACKAGES:
                return {...state, packages: action.payload};

            default:
                return state;
        }
    };
};

export default createModelReducer;
