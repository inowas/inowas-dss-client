import ConfiguredAxios from 'ConfiguredAxios';
import { getApiKey } from '../reducers/user';

export function setDashboardModelsT07( models ) {
    return {
        type: 'SET_DASHBOARD_MODELS_TO7',
        payload: models
    };
}

export function fetchDashboardModelsT07() {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalyses/public', { headers: { 'X-AUTH-TOKEN': getApiKey( getState() ) } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setDashboardModelsT07( action.payload.data ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.log( error );
        } );
    };
}
