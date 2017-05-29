import BoundingBox from '../model/BoundingBox';
import ConfiguredAxios from 'ConfiguredAxios';
import Coordinate from '../model/Coordinate';
import LayerNumber from '../model/LayerNumber';
import ModflowBoundary from '../model/ModflowBoundary';
import ModflowLayerValues from '../model/ModflowLayerValues';
import ModflowModel from '../model/ModflowModel';
import ModflowModelBoundaries from '../model/ModflowModelBoundaries';
import ModflowModelResult from '../model/ModflowModelResult';
import ResultType from '../model/ResultType';
import TimeSeries from '../model/TimeSeries';
import TimeSeriesResult from '../model/TimeSeriesResult';
import TotalTimes from '../model/TotalTimes';
import TwoDData from '../model/TwoDData';
import config from '../config';
import { getApiKey } from '../reducers/user';

export function setTotalTimes( totalTimes ) {
    if ( ( totalTimes instanceof TotalTimes ) === false ) {
        throw Error( 'Expected first param to be instance of TotalTimes' );
    }

    return {
        type: 'T07_SET_TOTAL_TIMES',
        payload: totalTimes
    };
}

export function addModel( model ) {
    return {
        type: 'T07_ADD_MODEL',
        payload: model
    };
}

export function reloadDone() {
    return {
        type: 'T07_RELOAD_DONE'
    };
}

export function resizeDone() {
    return {
        type: 'T07_RESIZE_DONE'
    };
}

export function setModelBoundaries( boundaries ) {
    if ( boundaries instanceof ModflowModelBoundaries === false ) {
        throw Error( 'Expected first param to be instance of ModflowModelBoundaries' );
    }

    return {
        type: 'T07_SET_MODEL_BOUNDARIES',
        payload: boundaries
    };
}

export function setLayerValues( layerValues ) {
    if ( layerValues instanceof ModflowLayerValues === false ) {
        throw Error( 'Expected first param to be instance of ModflowModelBoundaries' );
    }

    return {
        type: 'T07_SET_MODEL_LAYERVALUES',
        payload: layerValues
    };
}

export function setResultsT07A( modflowModelResult ) {
    if ( modflowModelResult instanceof ModflowModelResult === false ) {
        throw Error( 'Expected first param to be instance of ModflowModelResult' );
    }

    return {
        type: 'T07A_SET_MODEL_RESULT',
        payload: modflowModelResult
    };
}

export function setResultsT07B( modflowModelResult ) {
    if ( modflowModelResult instanceof ModflowModelResult === false ) {
        throw Error( 'Expected first param to be instance of ModflowModelResult' );
    }

    return {
        type: 'T07B_SET_RESULT',
        payload: modflowModelResult
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

export function setMapView( center, zoom ) {
    return {
        type: 'T07_SET_MAP_VIEW',
        payload: {
            center,
            zoom
        }
    };
}

export function fetchModelBoundaries( id ) {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/modflowmodels/' + id + '/boundaries.json', {
                    headers: {
                        'X-AUTH-TOKEN': getApiKey( getState() )
                    }
                } )
            }
        } ).then( ( { action } ) => {
            const modelId = id;
            const boundaries = action.payload.data;

            boundaries.map( b => {
                return ModflowBoundary.fromParameters( b.id, b.name, b.type, b.geometry, b.metadata );
            } );

            const payload = new ModflowModelBoundaries( modelId, boundaries );
            dispatch( setModelBoundaries( payload ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function fetchLayerValues( id ) {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/model/' + id + '/calculation/layervalues.json', { headers: { 'X-AUTH-TOKEN': getApiKey( getState() ) } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setLayerValues( new ModflowLayerValues( id, action.payload.data ) ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function fetchTotalTimes( id, type, layer ) {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/model/' + id + '/calculation/times/type/' + type.toString() + '/layer/' + layer.toString() + '.json', { headers: { 'X-AUTH-TOKEN': getApiKey( getState() ) } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setTotalTimes( new TotalTimes( id, type, layer, action.payload.data.start_date, action.payload.data.end_date, action.payload.data.total_times ) ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function setupT07b() {
    return {
        type: 'T07B_SETUP'
    };
}

export function fetchDetails(id, onSuccess ) {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalyses/' + id + '.json', { headers: { 'X-AUTH-TOKEN': getApiKey( getState() ) } } )
            }
        } ).then( ( { action } ) => {
            const area = action.payload.data.geometry;
            const boundingBoxPlain = action.payload.data.bounding_box;
            const boundingBox = new BoundingBox( new Coordinate( boundingBoxPlain.y_min, boundingBoxPlain.x_min ), new Coordinate( boundingBoxPlain.y_max, boundingBoxPlain.x_max ) );
            const gridSize = action.payload.data.grid_size;

            const baseModel = ModflowModel.fromProps(
                action.payload.data.base_model.id,
                true,
                area,
                action.payload.data.base_model.name,
                action.payload.data.base_model.description,
                boundingBox,
                gridSize.n_x,
                gridSize.n_y,
                true
            );

            dispatch( addModel( baseModel ) );
            dispatch( setBounds( boundingBox.toArray() ) );
            dispatch( fetchModelBoundaries( baseModel.modelId ) );
            dispatch( fetchLayerValues( baseModel.modelId ) );
            dispatch( fetchTotalTimes( baseModel.modelId, new ResultType( 'head' ), new LayerNumber( 0 ) ) );

            const scenarios = action.payload.data.scenarios;
            for ( let i = 0; i < scenarios.length; i++ ) {
                const sc = scenarios[ i ];
                const scenario = ModflowModel.fromProps(
                    sc.id,
                    false,
                    area,
                    sc.name,
                    sc.description,
                    boundingBox,
                    gridSize.n_x,
                    gridSize.n_y,
                    i === ( scenarios.length - 1 )
                );

                dispatch( addModel( scenario ) );
                dispatch( fetchModelBoundaries( scenario.modelId ) );
            }

            ( onSuccess && onSuccess( dispatch ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function updateResultsT07A( id, resultType, layerNumber, totalTime ) {
    const imageURL = config.baseURL + '/image';
    const url = '/scenarioanalysis/model/' + id + '/calculation/result/type/' + resultType.toString() + '/layer/' + layerNumber.toString() + '/totim/' + totalTime.toString();

    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( url + '.json', { headers: { 'X-AUTH-TOKEN': getApiKey( getState() ) } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setResultsT07A( new ModflowModelResult( id, layerNumber, resultType, totalTime, action.payload.data, imageURL + url + '.png' ) ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function updateResultsT07B( modelId1, modelId2, resultType, layerNumber, totalTime ) {
    const imageURL = config.baseURL + '/image';
    const url = '/scenarioanalysis/result/difference/models/' + modelId1 + '/' + modelId2 + '/type/' + resultType.toString() + '/layer/' + layerNumber.toString() + '/totim/' + totalTime.toString();

    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( url + '.json', { headers: { 'X-AUTH-TOKEN': getApiKey( getState() ) } } )
            }
        } ).then( ( { action } ) => {
            dispatch( setResultsT07B( new ModflowModelResult( modelId1, layerNumber, resultType, totalTime, action.payload.data, imageURL + url + '.png' ) ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}

export function toggleModelSelection( modelId ) {
    return {
        type: 'T07_TOGGLE_MODEL_SELECTION',
        payload: modelId
    };
}

export function setSelectedLayer( layer ) {
    if ( layer instanceof LayerNumber === false ) {
        throw Error( 'Expected first param to be instance of LayerNumber' );
    }

    return {
        type: 'T07_SET_SELECTED_LAYER',
        payload: layer
    };
}

export function setSelectedResultType( resultType ) {
    if ( resultType instanceof ResultType === false ) {
        throw Error( 'Expected first param to be instance of ResultType' );
    }

    return {
        type: 'T07_SET_SELECTED_RESULT_TYPE',
        payload: resultType
    };
}

export function setSelectedTotalTimeIndex( index ) {
    return {
        type: 'T07_SET_SELECTED_TOTAL_TIME_INDEX',
        payload: index
    };
}

export function setActiveCoordinate( coordinate ) {
    return {
        type: 'T07_SET_ACTIVE_COORDINATE',
        payload: coordinate
    };
}

export function setSelectedModelIdsT07B( selectedModelIds ) {
    return {
        type: 'T07B_SET_SELECTED_MODEL_IDS',
        payload: selectedModelIds
    };
}

export function addTimeSeriesPoint( timeSeriesPoint ) {
    return {
        type: 'T07_ADD_TIME_SERIES_POINT',
        payload: timeSeriesPoint
    };
}

export function setTimeSeriesPointSelection( index, selected ) {
    return {
        type: 'T07_SET_TIME_SERIES_POINT_SELECTION',
        payload: {
            index,
            selected
        }
    };
}

export function setTimeSeriesPointResult( coordinate, timeSeriesResult ) {
    return {
        type: 'T07_SET_TIME_SERIES_POINT_RESULT',
        payload: {
            coordinate,
            timeSeriesResult
        }
    };
}

export function fetchTimeSeries( coordinate, modelId, resultType, layerNumber, x, y, startDate ) {
    return ( dispatch, getState ) => {
        return dispatch( {
            type: 'FETCH_DATA',
            payload: {
                promise: ConfiguredAxios.get( '/scenarioanalysis/result/timeseries/model/' + modelId + '/type/' + resultType.toString() + '/layer' + layerNumber.toString() + '/nx/' + x + '/ny/' + y + '.json', { headers: { 'X-AUTH-TOKEN': getApiKey( getState() ) } } )
            }
        } ).then( ( { action } ) => {
            const data = [];
            Object.keys( action.payload.data ).map( key => {
                data.push( new TwoDData( key, action.payload.data[ key ] ) );
            } );
            const timeSeries = new TimeSeries( startDate, data );
            const timeSeriesResult = new TimeSeriesResult( modelId, resultType, layerNumber );
            timeSeriesResult.timeSeries = timeSeries;

            dispatch( setTimeSeriesPointResult( coordinate, timeSeriesResult ) );
        } ).catch( ( error ) => {
            // eslint-disable-next-line no-console
            console.error( error );
        } );
    };
}
