import ConfiguredAxios from 'ConfiguredAxios';
import { getApiKey } from '../reducers/user';
import { Modifier as T03 } from '../t03';
import { Modifier as T07 } from '../t07';
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
                return dispatch( T03.Command.cloneModflowModel( tool, id, uuid.v4()) );
                break;
            case 'T07':
                return dispatch( T07.Command.cloneScenarioAnalysis( tool, id, uuid.v4()) );
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
                return dispatch( T03.Command.deleteModflowModel( tool, id ) );
                break;
            case 'T07':
                return dispatch( T07.Command.deleteScenarioAnalysis( tool, id ) );
                break;
            default:
                break;
        }
    };
}
