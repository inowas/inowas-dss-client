import {WebData} from '../core';
import config from '../config';

export function stateToCreatePayload( state ) {
    return {
        name: state.name,
        description: state.description,
        geometry: state.geometry,
        bounding_box: state.bounding_box,
        grid_size: state.grid_size,
        time_unit: state.time_unit,
        length_unit: state.length_unit,
        public: state.public,
    };
}

export function payloadToSetModel( payload ) {
    return payload;
}

export function buildRequest(url, method, body) {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Access-Control-Request-Method': method
        },
        method
    };
    if (body) {
        options.body = body;
        options.headers['Content-Type'] = 'application/json';
    }

    return { url: config.baseURL + '/v2/' + url, options };
}

export function sendMessageBox( responseAction, body, tool ) {
    return WebData.Modifier.Query.sendHttpRequest( buildRequest('messagebox', 'POST', JSON.stringify( body )), responseAction, tool );
}

export function sendCommand( messageName, payload, metadata = [], tool ) {
    return sendMessageBox(
        messageName, {
            metadata,
            message_name: messageName,
            payload,
        },
        tool
    );
}

export function sendQuery( url, responseAction, tool ) {
    return WebData.Modifier.Query.sendHttpRequest( buildRequest(url, 'GET'), responseAction, tool );
}
