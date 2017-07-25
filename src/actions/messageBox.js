import {sendHttpRequest} from "../api/webData";
import config from '../config';

export const COMMAND_CREATE_MODFLOW_MODEL = "createModflowModel";
export const COMMAND_UPDATE_MODFLOW_MODEL = "updateModflowModel";

export function stateToCreatePayload(state) {
    return {
        name: state.name,
        description: state.description,
        geometry: state.geometry,
        bounding_box: state.bounding_box,
        grid_size: state.grid_size,
        time_unit: state.time_unit,
        length_unit: state.length_unit
    }
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
