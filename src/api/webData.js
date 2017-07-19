import {call, put, select} from "redux-saga/effects";
import {getApiKey} from "../reducers/user";

export const AT_SEND_HTTP_REQUEST = 'AT_SEND_HTTP_REQUEST';

export function sendHttpRequest ( request, responseAction ) {
    return {
        type: AT_SEND_HTTP_REQUEST,
        request: request,
        responseAction: responseAction
    }
}

export function responseAction ( type, webData ) {
    return {
        type: type,
        webData: webData
    }
}

export function* sendHttpRequestFlow ( action ) {

    yield put( responseAction( action.responseAction, { type: "loading" } ) );

    try {
        const state = yield select();

        let data = yield call( fetchStatusWrapper, action.request, getApiKey( state.user ) );

        yield put( responseAction( action.responseAction, { type: "success", data: data } ) );
    } catch ( err ) {
        let msg = "Unknown Error";

        if ( typeof err === "string" ) {
            msg = err;
        } else {
            let error = err.error || { message: undefined };
            msg = error.message || msg;
        }

        yield put( responseAction( action.responseAction, { type: "error", msg: msg } ) );
    }
}

function fetchStatusWrapper ( request, apiKey ) {
    request.options.headers['X-AUTH-TOKEN'] = apiKey;

    return fetch( request.url, request.options ).then( response => {
        const contentType = response.headers.get( "content-type" );

        if ( contentType && contentType.indexOf( "application/json" ) !== -1 ) {
            return response.json()
                .then( function( json ) {
                    return response.ok ? json : Promise.reject( json );
                } )
                .catch( function( error ) {
                    // if ok then empty response was given e.g. 200
                    return response.ok ? {} : Promise.reject( error );
                } );
        } else {
            return response.ok ? {} : Promise.reject( {} );
        }
    } );
}
