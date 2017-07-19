import { getArea, getDescription, getLengthUnit, getName, getTimeUnit } from '../reducers/ModelEditor/general';

import ConfiguredAxios from 'ConfiguredAxios';
import LengthUnit from '../model/LengthUnit';
import TimeUnit from '../model/TimeUnit';
import { getActiveBoundary } from '../reducers/ModelEditor/ui';
import { getApiKey } from '../reducers/user';
import { getBoundary } from '../reducers/ModelEditor/boundaries';
import { push } from 'react-router-redux';
import Boundary from '../model/Boundary';
import BoundaryType from '../model/BoundaryType';
import BoundaryMetadata from '../model/BoundaryMetadata';
import {sendCommandCreateModflowModel, sendCommandUpdateModflowModel} from "./messageBox";
import uuid from "uuid";

/**
 * UI
 */

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

export function setName( tool, name ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_NAME',
        tool,
        payload: name
    };
}

export function setDescription( tool, description ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_DESCRIPTION',
        tool,
        payload: description
    };
}

export function setTimeUnit( tool, timeUnit ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_TIME_UNIT',
        tool,
        payload: timeUnit
    };
}

export function setLengthUnit( tool, lengthUnit ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_LENGTH_UNIT',
        tool,
        payload: lengthUnit
    };
}

export function setArea( tool, area ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_AREA',
        tool,
        payload: area
    };
}

export function addAreaControlPoint( tool, lat, lng, index ) {
    return {
        type: 'MODEL_EDITOR_MODEL_AREA_ADD_CONTROL_POINT',
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
        type: 'MODEL_EDITOR_MODEL_AREA_UPDATE_CONTROL_POINT',
        tool,
        payload: {
            index,
            controlPoint
        }
    };
}

export function setAreaLatitude( tool, index, lat ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_AREA_LATITUDE',
        tool,
        payload: {
            index,
            lat
        }
    };
}

export function setAreaLongitude( tool, index, lng ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_AREA_LONGITUDE',
        tool,
        payload: {
            index,
            lng
        }
    };
}

export function deleteAreaControlPoint( tool, index ) {
    return {
        type: 'MODEL_EDITOR_MODEL_DELETE_AREA_CONTROL_POINT',
        tool,
        payload: index
    };
}

export function loadModel( tool, id ) {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/modflowmodels/' + id, { headers: { 'X-AUTH-TOKEN': getApiKey( getState().user ) } } )
            }
        } ).then( ( { action } ) => {
            const data = action.payload.data;
            dispatch( setName( tool, data.name ) );
            dispatch( setDescription( tool, data.description ) );
            dispatch( setTimeUnit( tool, TimeUnit.fromNumber( data.time_unit ) ) );
            dispatch( setLengthUnit( tool, LengthUnit.fromNumber( data.length_unit ) ) );
            dispatch( setArea( tool, data.geometry.coordinates[ 0 ].map( c => ( { lat: c[ 1 ], lng: c[ 0 ] } ) ) ) );
            dispatch( setMapPosition( tool, {
                bounds: [ {
                    lat: data.bounding_box.y_min,
                    lng: data.bounding_box.x_min,
                }, {
                    lat: data.bounding_box.y_max,
                    lng: data.bounding_box.x_max,
                } ]
            } ) );
            // TODO
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function createModel( tool ) {
    return ( dispatch, getState ) => {
        const id = uuid.v4();
        const name = getName( getState().T03.model.general );
        const description = getDescription( getState().T03.model.general );
        const geometry = getArea( getState().T03.model.general );
        const timeUnit = getTimeUnit( getState().T03.model.general );
        const lengthUnit = getLengthUnit( getState().T03.model.general );

        // TODO validate and fullfill data
        const boundingBox = {};
        const gridSize = {};

        dispatch( push( '/tools/' + tool + '/' + id ) );
        dispatch( setName( tool, name ) );
        dispatch( setDescription( tool, description ) );
        dispatch( setArea( tool, geometry ) );
        dispatch( setTimeUnit( tool, timeUnit ) );
        dispatch( setLengthUnit( tool, lengthUnit ) );
        dispatch( sendCommandCreateModflowModel( id, name, description, geometry, boundingBox, gridSize, timeUnit, lengthUnit ));
    };
}

export function updateModel( tool, id ) {
    return ( dispatch, getState ) => {
        const name = getName( getState().T03.model.general );
        const description = getDescription( getState().T03.model.general );
        const geometry = getArea( getState().T03.model.general );
        const timeUnit = getTimeUnit( getState().T03.model.general );
        const lengthUnit = getLengthUnit( getState().T03.model.general );
        const boundingBox = {};
        const gridSize = {};

        dispatch( setName( tool, name ) );
        dispatch( setDescription( tool, description ) );
        dispatch( setArea( tool, geometry ) );
        dispatch( setTimeUnit( tool, timeUnit ) );
        dispatch( setLengthUnit( tool, lengthUnit ) );
        dispatch( sendCommandUpdateModflowModel( id, name, description, geometry, boundingBox, gridSize, timeUnit, lengthUnit ));
    };
}

/**
 * BOUNDARIES
 */

export function setBoundaries( tool, boundaries ) {
    return {
        type: 'MODEL_EDITOR_MODEL_SET_BOUNDARIES',
        tool,
        payload: boundaries
    };
}

export function addBoundary( tool, boundary ) {
    return {
        type: 'MODEL_EDITOR_MODEL_ADD_BOUNDARY',
        tool,
        payload: boundary
    };
}

export function updateBoundary( tool, boundary ) {
    return {
        type: 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY',
        tool,
        payload: boundary
    };
}

export function deleteBoundary( tool, id ) {
    return {
        type: 'MODEL_EDITOR_MODEL_DELETE_BOUNDARY',
        tool,
        payload: id
    };
}

export function addBoundaryControlPoint( tool, controlPoint, index ) {
    return ( dispatch, getState ) => {
        const id = getBoundary( getState()[ tool ].model.boundaries, getActiveBoundary( getState().T03.ui ) ).id;
        dispatch( {
            type: 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_CONTROL_POINT',
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
            type: 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_CONTROL_POINT',
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
            type: 'MODEL_EDITOR_MODEL_DELETE_BOUNDARY_CONTROL_POINT',
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
        type: 'MODEL_EDITOR_MODEL_UPDATE_BOUNDARY_PUMPING_RATE',
        tool,
        payload: {
            boundaryId,
            observationPointId,
            index,
            datetime,
            pumpingRate
        }
    };
}

export function addPumpingRate( tool, boundaryId, observationPointId, index, datetime, pumpingRate ) {
    return {
        type: 'MODEL_EDITOR_MODEL_ADD_BOUNDARY_PUMPING_RATE',
        tool,
        payload: {
            boundaryId,
            observationPointId,
            index,
            datetime,
            pumpingRate
        }
    };
}

export function fetchBoundaries( tool, id ) {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/modflowmodels/' + id + '/boundaries', { headers: { 'X-AUTH-TOKEN': getApiKey( getState().user ) } } )
            }
        } ).then( ( { action } ) => {
            const data = action.payload.data;
            dispatch( setBoundaries( tool, data.map( b => {
                const type = new BoundaryType( b.type === 'well' ? 'wel' : b.type ); // TODO remove when api updated
                return new Boundary(
                    b.id,
                    b.name,
                    type,
                    b.geometry,
                    b.metadata.layer /* TODO */,
                    type.slug === 'wel' ? new BoundaryMetadata( { wellType: b.metadata.well_type } ) : null
                );
            } ) ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
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
