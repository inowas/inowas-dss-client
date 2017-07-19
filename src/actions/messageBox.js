import {sendHttpRequest} from "../api/webData";
import config from '../config';

export const COMMAND_CREATE_MODFLOW_MODEL = "createModflowModel";
export const COMMAND_UPDATE_MODFLOW_MODEL = "updateModflowModel";

export function sendCommandCreateModflowModel ( id, name, description, geometry, boundingBox, gridSize, timeUnit, lengthUnit ) {
    const payload = {
        uuid: id,
        name,
        description,
        geometry,
        bounding_box: boundingBox,
        grid_size: gridSize,
        time_unit: timeUnit,
        length_unit: lengthUnit
    };

    return sendMessageBox( COMMAND_CREATE_MODFLOW_MODEL, payload );
}

export function sendCommandUpdateModflowModel ( id, name, description, geometry, boundingBox, gridSize, timeUnit, lengthUnit ) {
    const payload = {
        uuid: id,
        name,
        description,
        geometry,
        bounding_box: boundingBox,
        grid_size: gridSize,
        time_unit: timeUnit,
        length_unit: lengthUnit
    };
    return sendMessageBox( COMMAND_UPDATE_MODFLOW_MODEL, payload );
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
