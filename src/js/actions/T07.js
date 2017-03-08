import axios from '../axios';
import ConfiguredAxios from 'ConfiguredAxios';
import store from '../store';
import ModflowBoundary from '../model/ModflowBoundary';
import ModflowLayerValues from '../model/ModflowLayerValues';
import ModflowModelBoundaries from '../model/ModflowModelBoundaries';
import ModflowModelDetails from '../model/ModflowModelDetails';
import ModflowModelResult from '../model/ModflowModelResult';
import ResultType from '../model/ResultType';
import LayerNumber from '../model/LayerNumber';
import TotalTime from '../model/TotalTime';
import TotalTimes from '../model/TotalTimes';

const apiKey = store.getState().user.apiKey;

export function fetchModelDetails( id ) {
    return dispatch => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/' + id + '.json', { headers: { 'X-AUTH-TOKEN': apiKey } } )
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
            dispatch( setBounds([{
                lat: baseModel.boundingBox.y_min,
                lng: baseModel.boundingBox.x_min
            }, {
                lat: baseModel.boundingBox.y_max,
                lng: baseModel.boundingBox.x_max
            }]) );
            dispatch( fetchModelBoundaries( baseModel.modelId ) );
            dispatch( fetchLayerValues( baseModel.modelId ) );
            dispatch( fetchTotalTimes( baseModel.modelId,  new ResultType('head'), new LayerNumber(3)) );

            const scenarios = action.payload.data.scenarios;

            scenarios.forEach( sc => {
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

export function fetchModelBoundaries( id ) {
    return dispatch => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/model/' + id + '/boundaries.json', { headers: { 'X-AUTH-TOKEN': apiKey } } )
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

export function fetchLayerValues( id ) {
    return dispatch => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/model/' + id + '/calculation/layervalues.json', { headers: { 'X-AUTH-TOKEN': apiKey } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setLayerValues( new ModflowLayerValues( id, action.payload.data) ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function fetchTotalTimes( id, type, layer ) {
    return dispatch => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/model/' + id + '/calculation/times/type/' + type.toString() + '/layer/' + layer.toString() + '.json', { headers: { 'X-AUTH-TOKEN': apiKey } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setTotalTimes( new TotalTimes( id, type, layer, action.payload.data.start_date, action.payload.data.end_date, action.payload.data.total_times )));
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function updateResults( id, resultType, layerNumber, totalTime ) {
    const baseUrl = axios.defaults.baseURL.replace('api', 'image');
    const url = '/scenarioanalysis/model/' + id + '/calculation/result/type/' + resultType.toString() + '/layer/' + layerNumber.toString() + '/totim/' + totalTime.toString();

    return dispatch => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( url + '.json', { headers: { 'X-AUTH-TOKEN': apiKey } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setResults(new ModflowModelResult(id, layerNumber, resultType, totalTime, action.payload.data, baseUrl + url + '.png')) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function setTotalTimes( totalTimes ) {
    if ((totalTimes instanceof TotalTimes) === false) {
        throw Error('Expected first param to be instance of TotalTimes');
    }

    return {
        type: 'T07_SET_TOTAL_TIMES',
        payload: totalTimes
    };
}

export function setModelDetails( details ) {
    if (details instanceof ModflowModelDetails === false) {
        throw Error('Expected first param to be instance of ModflowModelDetails');
    }

    return {
        type: 'T07_SET_MODEL_DETAILS',
        payload: details
    };
}

export function setModelBoundaries( boundaries ) {
    if (boundaries instanceof ModflowModelBoundaries === false) {
        throw Error('Expected first param to be instance of ModflowModelBoundaries');
    }

    return {
        type: 'T07_SET_MODEL_BOUNDARIES',
        payload: boundaries
    };
}

export function setLayerValues( layerValues ) {
    if (layerValues instanceof ModflowLayerValues === false) {
        throw Error('Expected first param to be instance of ModflowModelBoundaries');
    }

    return {
        type: 'T07_SET_MODEL_LAYERVALUES',
        payload: layerValues
    };
}

export function setResults( modflowModelResult ) {
    if (modflowModelResult instanceof ModflowModelResult === false) {
        throw Error('Expected first param to be instance of ModflowModelResult');
    }

    return {
        type: 'T07_SET_MODEL_RESULT',
        payload: modflowModelResult
    };
}

export function toggleModelSelection( modelId ) {
    return {
        type: 'T07_TOGGLE_MODEL_SELECTION',
        payload: modelId
    };
}

export function setSelectedLayer( layer ) {
    if (layer instanceof LayerNumber === false) {
        throw Error('Expected first param to be instance of LayerNumber');
    }

    return {
        type: 'T07_SET_SELECTED_LAYER',
        payload: layer
    };
}

export function setSelectedResultType( resultType ) {
    if (resultType instanceof ResultType === false) {
        throw Error('Expected first param to be instance of ResultType');
    }

    return {
        type: 'T07_SET_SELECTED_RESULT_TYPE',
        payload: resultType
    };
}

export function setSelectedTotalTime( totalTime ) {
    if (totalTime instanceof TotalTime === false) {
        throw Error('Expected first param to be instance of TotalTime');
    }

    return {
        type: 'T07_SET_SELECTED_TOTAL_TIME',
        payload: totalTime
    };
}

export function setBounds( bounds ) {
    return {
        type: 'T07_SET_BOUNDS',
        payload: {
            bounds
        }
    };
}

export function setMapView(center, zoom) {
    return {
        type: 'T07_SET_MAP_VIEW',
        payload: {
            center,
            zoom
        }
    };
}

export function setActiveGridCell(cell) {
    return {
        type: 'T07_SET_ACTIVE_GRID_CELL',
        payload: cell
    };
}
