import ConfiguredAxios from 'ConfiguredAxios';
import store from '../store';
import ModflowBoundary from '../model/ModflowBoundary';
import ModflowModelBoundaries from '../model/ModflowModelBoundaries';
import ModflowModelDetails from '../model/ModflowModelDetails';

const apiKey = store.getState().user.apiKey;

export function setModelDetails( details ) {
    if (details instanceof ModflowModelDetails === false) {
        throw Error('Expected first param to be instance of ModflowModelDetails');
    }

    return {
        type: 'SET_MODEL_DETAILS',
        payload: details
    };
}

export function fetchDetails(id) {
    return dispatch => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/'+id+'.json', { headers: { 'X-AUTH-TOKEN': apiKey } } )
            }
        } ).then( ( { action } ) => {

            const area = JSON.parse(action.payload.data.base_model.area);
            const boundingBox = JSON.parse(action.payload.data.base_model.bounding_box);
            const gridSize = JSON.parse(action.payload.data.base_model.grid_size);

            const baseModel = new ModflowModelDetails(
                action.payload.data.base_model.model_id,
                action.payload.data.base_model.name,
                action.payload.data.base_model.description,
                area,
                boundingBox,
                gridSize,
                true
            );

            dispatch( setModelDetails( baseModel ) );
            dispatch( fetchModelBoundaries( baseModel.modelId ) );

            const scenarios = action.payload.data.scenarios;

            scenarios.map( sc => {
                const scenario = new ModflowModelDetails(
                    sc.model_id,
                    sc.name,
                    sc.description,
                    area,
                    boundingBox,
                    gridSize,
                    false
                );

                dispatch( setModelDetails( scenario ) );
                dispatch( fetchModelBoundaries( scenario.modelId ) );
            });

        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function setModelBoundaries( boundaries ) {
    if (boundaries instanceof ModflowModelBoundaries === false) {
        throw Error('Expected first param to be instance of ModflowModelBoundaries');
    }

    return {
        type: 'SET_MODEL_BOUNDARIES',
        payload: boundaries
    };
}

export function fetchModelBoundaries(id) {
    return dispatch => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/model/'+id+'/boundaries.json', { headers: { 'X-AUTH-TOKEN': apiKey } } )
            }
        } ).then( ( { action } ) => {
            const modelId = id;
            const boundaries = action.payload.data;

            boundaries.map( b => {
                return ModflowBoundary.fromParameters(b.boundary_id, b.name, b.type, JSON.parse(b.geometry), b.metadata);
            });

            const payload = new ModflowModelBoundaries(modelId, boundaries);
            dispatch( setModelBoundaries( payload ) );

        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}
