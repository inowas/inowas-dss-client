import {sendHttpRequest} from "../api/webData";
import config from '../config';

export const COMMAND_CREATE_MODFLOW_MODEL = "createModflowModel";
export const COMMAND_UPDATE_MODFLOW_MODEL = "updateModflowModel";

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

    payload.geometry.coordinates = payload.geometry.coordinates[0];
    payload.geometry.coordinates.pop();

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
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify( body )
    };

    return sendHttpRequest( { url: config.baseURL + '/v2/messagebox', options }, responseAction );
}

export function sendQuery ( url, responseAction ) {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET"
    };

    return sendHttpRequest( { url: config.baseURL + '/v2/' + url, options }, responseAction );
}
