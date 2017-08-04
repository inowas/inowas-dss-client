import {
    handleAreaAddControlPoint, handleAreaDeleteControlPoint,
    handleAreaUpdateControlPoint
} from './general';
import {
    handleDeleteBoundary, handleAddBoundaryControlPoint,
    handleUpdateBoundaryControlPoint, handleDeleteBoundaryControlPoint, handleUpdateBoundaryPumpingRate,
    handleAddBoundaryPumpingRate, handleUpdateBoundary, handleUpdateBoundaryGeometry, handleUpdateAreaGeometry
} from './boundaries';
import {ActionTypeBoundaries, ActionTypeModel} from "../../actions/modelEditor";
import {Action, Event} from "../../t03/actions/index";
import {calcBoundsOfPolygon} from "../../calculations/geoTools";

function getInitialStyles() {
    return {
        area : {
            weight: 2,
            opacity: 1,
            color: 'grey',
            dashArray: '3',
            fillColor: 'blue',
            fillOpacity: 0.05
        },
        bounding_box : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        grid : {
            weight: 1,
            opacity: 1,
            color: 'blue',
            dashArray: '3',
            fillOpacity: 0
        },
        chd : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        ghb : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        rch : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        riv : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        wel: {
            cw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkgreen',
                fillOpacity: 0.7
            },
            iw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkgreen',
                fillOpacity: 0.7
            },
            sniw: {
                radius: 5,
                color: 'red',
                weight: 2,
                fillColor: 'darkgreen',
                fillOpacity: 0.7
            },
            puw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkblue',
                fillOpacity: 0.7
            },
            snpw: {
                radius: 5,
                color: 'red',
                weight: 2,
                fillColor: 'darkblue',
                fillOpacity: 0.7
            },
            prw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkblue',
                fillOpacity: 0.7
            },
            smw: {
                radius: 5,
                color: 'black',
                weight: 1,
                fillColor: 'red',
                fillOpacity: 1
            },
            snw: {
                radius: 5,
                color: 'black',
                weight: 1,
                fillColor: 'yellow',
                fillOpacity: 1
            },
            snifw: {
                radius: 5,
                color: '#63b3ea',
                weight: 2,
                fillColor: '#bbdff6',
                fillOpacity: 0.7
            },
            activeWell: {
                fillColor: 'yellow'
            }
        },
        default: {
            weight: 2,
            opacity: 1,
            color: 'blue',
            dashArray: '1',
            fillColor: 'blue',
            fillOpacity: 0.7
        }
    }
}

export function getInitialState () {
    return {
        name: "NewModflowModel",
        description: "NewModflowModelDescription",
        grid_size: {
            n_x: 50,
            n_y: 60
        },
        styles: getInitialStyles(),
        time_unit: 2,
        length_unit: 2,
        bounding_box: null,
        geometry: null,
        boundaries: [],
    };
}

const createModelReducer = tool => {
    return ( state = getInitialState(), action ) => {
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

            case ActionTypeModel.UPDATE_GEOMETRY:
                return { ...state, boundaries: handleUpdateBoundaryGeometry(state.boundaries, action), geometry: handleUpdateAreaGeometry(state, action)};


            case ActionTypeModel.DESTROY_MODFLOW_MODEL:
                return getInitialState();

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
                return { ...state, geometry: handleAreaAddControlPoint( state.geometry, action )};

            case ActionTypeModel.UPDATE_AREA_CONTROL_POINT:
                return { ...state, geometry: handleAreaUpdateControlPoint( state.geometry, action )};

            case ActionTypeModel.DELETE_AREA_CONTROL_POINT:
                return { ...state, geometry: handleAreaDeleteControlPoint( state.geometry, action )};

            case Action.SET_BOUNDARIES:
                return { ...state, boundaries: action.payload };

            case ActionTypeBoundaries.ADD_BOUNDARY:
                return { ...state, boundaries: [ ...state.boundaries, action.payload ] };

            case ActionTypeBoundaries.UPDATE_BOUNDARY:
                return { ...state, boundaries: handleUpdateBoundary(state.boundaries, action) };

            case ActionTypeModel.UPDATE_BOUNDING_BOX:
                return { ...state, bounding_box: calcBoundsOfPolygon(state.geometry.coordinates) };

            case Event.BOUNDARY_REMOVED:
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
