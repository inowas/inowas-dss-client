import ConfiguredAxios from 'ConfiguredAxios';
import { getApiKey } from '../reducers/user';
import { Modifier } from '../t03';
import uuid from 'uuid';

export function setActiveTool( tool ) {
    return {
        type: 'DASHBOARD_SET_ACTIVE_TOOL',
        payload: tool
    };
}

export function setPublic( publicInstances ) {
    return {
        type: 'DASHBOARD_SET_PUBLIC',
        payload: publicInstances
    };
}

export function setInstances( tool, instances ) {
    return {
        type: 'DASHBOARD_SET_INSTANCES',
        payload: {
            tool,
            instances
        }
    };
}

export function fetchInstances( tool, publicInstances = false ) {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/tools/' + tool + ( publicInstances ? '/public' : '' ), { headers: { 'X-AUTH-TOKEN': getApiKey( getState().user ) } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setInstances( tool, action.payload.data ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.log( error );
        } );
    };
}

export function cloneToolInstance( id ) {
    return (dispatch, getState ) => {

        const tool = getState().dashboard.ui.activeToolSlug;

        switch (tool) {
            case 'T03':
                return dispatch( Modifier.Command.cloneModflowModel( tool, id, uuid.v4()) );
                break;
            default:
                break;
        }
    };
}

export function deleteToolInstance( id ) {
    return (dispatch, getState ) => {

        const tool = getState().dashboard.ui.activeToolSlug;

        switch (tool) {
            case 'T03':
                return dispatch( Modifier.Command.deleteModflowModel( tool, id ) );
                break;
            default:
                break;
        }
    };
}
