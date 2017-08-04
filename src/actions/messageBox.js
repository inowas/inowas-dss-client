import {sendHttpRequest} from "../api/webData";
import config from '../config';

export function stateToCreatePayload ( state ) {
    let geometry = state.geometry;

    geometry.coordinates = [
        geometry.coordinates,
    ];
    geometry.coordinates[0].push(geometry.coordinates[0][0]);

    return {
        name: state.name,
        description: state.description,
        geometry,
        bounding_box: state.bounding_box,
        grid_size: state.grid_size,
        time_unit: state.time_unit,
        length_unit: state.length_unit
    }
}

export function payloadToSetModel ( payload ) {
    return payload;
}

export function sendCommand ( messageName, payload, metadata = [] ) {
    return sendMessageBox(
        messageName, {
            metadata,
            message_name: messageName,
            payload,
        } );
}

export function sendMessageBox ( responseAction, body ) {
    return sendHttpRequest( buildRequest('messagebox', 'POST', JSON.stringify( body )), responseAction );
}

export function sendQuery ( url, responseAction ) {
    return sendHttpRequest( buildRequest(url, 'GET'), responseAction );
}

export function buildRequest(url, method, body) {
    let options = {
        headers: {
            'Accept': 'application/json',
            'Access-Control-Request-Method': method
        },
        method
    };
    if (body) {
        options['body'] = body;
        options['headers']['Content-Type'] = 'application/json';
    }

    return { url: config.baseURL + '/v2/' + url, options }
}
