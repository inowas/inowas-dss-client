import ConfiguredAxios from 'ConfiguredAxios';
import { getActiveBoundary } from '../reducers/ModelEditor/ui';
import { getApiKey } from '../reducers/user';
// import { getBoundary } from '../reducers/ModelEditor/boundaries';
import Boundary from '../model/Boundary';
import BoundaryType from '../model/BoundaryType';
import BoundaryMetadata from '../model/BoundaryMetadata';
// import {sendCommandCreateModflowModel, sendCommandUpdateModflowModel, sendQuery} from "./messageBox";


/**
 * UI
 */

export function setView(tool, view ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_VIEW',
        tool,
        payload: view
    };
}

export function setEditorState( tool, mode ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_STATE',
        tool,
        payload: mode
    };
}

export function setActiveBoundary( tool, id ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_ACTIVE_BOUNDARY',
        tool,
        payload: id
    };
}

export function setActiveBoundaryType( tool, type ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_ACTIVE_BOUNDARY_TYPE',
        tool,
        payload: type
    };
}

export function setDraggedBoundary( tool, id ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_DRAGGED_BOUNDARY',
        tool,
        payload: id
    };
}

export function setMapPosition( tool, position ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_MAP_POSITION',
        tool,
        payload: position
    };
}

export function setMousePositionOnMap( tool, position ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_MOUSE_POSITION_ON_MAP',
        tool,
        payload: position
    };
}

export function setDraggedAreaControlPoint( tool, index ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_DRAGGED_AREA_CONTROL_POINT',
        tool,
        payload: index
    };
}

export function setActiveAreaControlPoint( tool, index ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_ACTIVE_AREA_CONTROL_POINT',
        tool,
        payload: index
    };
}

export function setActiveBoundaryControlPoint( tool, index ) {
    return {
        type: 'MODEL_EDITOR_UI_SET_ACTIVE_BOUNDARY_CONTROL_POINT',
        tool,
        payload: index
    };
}

/**
 * MODEL
 */

/**
 * GENERAL
 */

export const ActionTypeModel = {
    UPDATE_GEOMETRY: 'MODEL_EDITOR_UPDATE_GEOMETRY',
    DESTROY_MODFLOW_MODEL: 'MODEL_EDITOR_MODEL_DESTROY',
    LOAD_MODFLOW_MODEL: 'MODEL_EDITOR_MODEL_LOAD',
    CREATE_MODFLOW_MODEL: 'MODEL_EDITOR_MODEL_CREATE',
    UPDATE_MODFLOW_MODEL: 'MODEL_EDITOR_MODEL_UPDATE',
    SET_MODFLOW_MODEL: 'MODEL_EDITOR_MODEL_SET',
    SET_NAME: 'MODEL_EDITOR_MODEL_SET_NAME',
    SET_DESCRIPTION: 'MODEL_EDITOR_MODEL_SET_DESCRIPTION',
    SET_TIME_UNIT: 'MODEL_EDITOR_MODEL_SET_TIME_UNIT',
    SET_LENGTH_UNIT: 'MODEL_EDITOR_MODEL_SET_LENGTH_UNIT',
    SET_AREA: 'MODEL_EDITOR_MODEL_SET_AREA',
    SET_AREA_LATITUDE: 'MODEL_EDITOR_MODEL_SET_AREA_LATITUDE',
    SET_AREA_LONGITUDE: 'MODEL_EDITOR_MODEL_SET_AREA_LONGITUDE',
    ADD_AREA_CONTROL_POINT: 'MODEL_EDITOR_MODEL_AREA_ADD_CONTROL_POINT',
    DELETE_AREA_CONTROL_POINT: 'MODEL_EDITOR_MODEL_DELETE_AREA_CONTROL_POINT',
    UPDATE_AREA_CONTROL_POINT: 'MODEL_EDITOR_MODEL_AREA_UPDATE_CONTROL_POINT',
    UPDATE_BOUNDING_BOX: 'MODEL_EDITOR_MODEL_UPDATE_BOUNDING_BOX',
};


export function updateGeometry( tool, id, geometry ) {
    return {
        type: ActionTypeModel.UPDATE_GEOMETRY,
        tool,
        payload: {
            id: id,
            geometry: geometry
        }
    };
}

export function setModflowModel( tool, payload ) {
    return {
        type: ActionTypeModel.SET_MODFLOW_MODEL,
        tool,
        payload
    };
}

export function setArea( tool, area ) {
    return {
        type: ActionTypeModel.SET_AREA,
        tool,
        payload: area
    };
}

export function addAreaControlPoint( tool, lng, lat, index ) {
    return {
        type: ActionTypeModel.ADD_AREA_CONTROL_POINT,
        tool,
        payload: {
            lat,
            lng,
            index
        }
    };
}

export function updateAreaControlPoint( tool, index, controlPoint ) {
    return {
        type: ActionTypeModel.UPDATE_AREA_CONTROL_POINT,
        tool,
        payload: {
            index,
            controlPoint
        }
    };
}

export function updateBoundingBox( tool ) {
    return {
        type: ActionTypeModel.UPDATE_BOUNDING_BOX,
        tool,
    };
}

export function setAreaLatitude( tool, index, lat ) {
    return {
        type: ActionTypeModel.SET_AREA_LATITUDE,
        tool,
        payload: {
            index,
            lat
        }
    };
}

export function setAreaLongitude( tool, index, lng ) {
    return {
        type: ActionTypeModel.SET_AREA_LONGITUDE,
        tool,
        payload: {
            index,
            lng
        }
    };
}

export function deleteAreaControlPoint( tool, index ) {
    return {
        type: ActionTypeModel.DELETE_AREA_CONTROL_POINT,
        tool,
        payload: index
    };
}

/**
 * BOUNDARIES
 */

export const ActionTypeBoundaries = {
    SET_BOUNDARIES: 'MODEL_EDITOR_MODEL_SET_BOUNDARIES',
    ADD_BOUNDARY: 'MODEL_EDITOR_MODEL_ADD_BOUNDARY',
    UPDATE_BOUNDARY: 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY',
    ADD_BOUNDARY_CONTROL_POINT: 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_CONTROL_POINT',
    UPDATE_BOUNDARY_CONTROL_POINT: 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_CONTROL_POINT',
    DELETE_BOUNDARY_CONTROL_POINT: 'MODEL_EDITOR_MODEL_DELETE_BOUNDARY_CONTROL_POINT',
    UPDATE_BOUNDARY_PUMPING_RATE: 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_PUMPING_RATE',
    ADD_BOUNDARY_PUMPING_RATE: 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_PUMPING_RATE',
};

export function addBoundary( tool, boundary ) {
    return {
        type: ActionTypeBoundaries.ADD_BOUNDARY,
        tool,
        payload: boundary
    };
}

export function updateBoundary( tool, boundary ) {
    return {
        type: ActionTypeBoundaries.UPDATE_BOUNDARY,
        tool,
        payload: boundary
    };
}

export function addBoundaryControlPoint( tool, controlPoint, index ) {
    return ( dispatch, getState ) => {
        const id = getBoundary( getState()[ tool ].model.boundaries, getActiveBoundary( getState().T03.ui ) ).id;
        dispatch( {
            type: ActionTypeBoundaries.ADD_BOUNDARY_CONTROL_POINT,
            tool,
            payload: {
                id,
                index,
                controlPoint
            }
        } );
    };
}

export function updateBoundaryControlPoint( tool, index, controlPoint ) {
    return ( dispatch, getState ) => {
        const id = getBoundary( getState()[ tool ].model.boundaries, getActiveBoundary( getState().T03.ui ) ).id;
        dispatch( {
            type: ActionTypeBoundaries.UPDATE_BOUNDARY_CONTROL_POINT,
            tool,
            payload: {
                id,
                index,
                controlPoint
            }
        } );
    };
}

export function deleteBoundaryControlPoint( tool, index ) {
    return ( dispatch, getState ) => {
        const id = getBoundary( getState()[ tool ].model.boundaries, getActiveBoundary( getState().T03.ui ) ).id;
        dispatch( {
            type: ActionTypeBoundaries.DELETE_BOUNDARY_CONTROL_POINT,
            tool,
            payload: {
                id,
                index
            }
        } );
    };
}

export function updatePumpingRate( tool, boundaryId, observationPointId, index, datetime, pumpingRate ) {
    return {
        type: ActionTypeBoundaries.UPDATE_BOUNDARY_PUMPING_RATE,
        tool,
        payload: {
            boundaryId,
            editObservationPointId: observationPointId,
            index,
            datetime,
            pumpingRate
        }
    };
}

export function addPumpingRate( tool, boundaryId, observationPointId, index, datetime, pumpingRate ) {
    return {
        type: ActionTypeBoundaries.ADD_BOUNDARY_PUMPING_RATE,
        tool,
        payload: {
            boundaryId,
            editObservationPointId: observationPointId,
            index,
            datetime,
            pumpingRate
        }
    };
}

export function fetchBoundary( tool, id, bid ) {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/modflowmodels/' + id + '/boundaries/' + bid, { headers: { 'X-AUTH-TOKEN': getApiKey( getState().user ) } } )
            }
        } ).then( ( { action } ) => {
            const data = action.payload.data;
            const type = new BoundaryType( data.type === 'well' ? 'wel' : data.type ); // TODO remove when api updated
            dispatch( updateBoundary( tool, new Boundary( data.id, data.name, type, data.geometry, data.metadata.layer /* TODO */, type.slug === 'wel' ? new BoundaryMetadata( { wellType: data.metadata.well_type } ) : null, data.observation_points ) ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function saveBoundary( tool, id, bid ) {
    return ( dispatch, getState ) => {
        const boundary = getBoundary( getState()[ tool ].model.boundaries, bid );

        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.put( '/modflowmodels/' + id + '/boundaries/' + bid, boundary.toObject, { headers: { 'X-AUTH-TOKEN': getApiKey( getState().user ) } } )
            }
        } ).then( ( { action } ) => {
            console.warn(action);
            // dispatch( updateBoundary( tool, new Boundary( bid, name, boundary.type, geometry, boundary.affectedLayers /* TODO */, boundary.metadata, boundary.observation_points ) ) );
        }).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}
