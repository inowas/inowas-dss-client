import ConfiguredAxios from 'ConfiguredAxios';
import store from '../store';

function apiKey() {
    return store.getState().user.apiKey;
}

export function setDashboardModelsT07( models ) {
    return {
        type: 'SET_DASHBOARD_MODELS_TO7',
        payload: models
    };
}

export function fetchDashboardModelsT07() {
    return dispatch => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/public/projects.json', { headers: { 'X-AUTH-TOKEN': apiKey() } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setDashboardModelsT07( action.payload.data ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.log( error );
        } );
    };
}
