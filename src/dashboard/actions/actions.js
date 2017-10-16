/**
 * Actions triggers only a store change.
 */
import { Modifier as T03 } from '../../t03';
import { Modifier as T07 } from '../../t07';
import { Modifier as ToolInstance } from '../../toolInstance';
import uuid from 'uuid';

export const SET_INSTANCES = 'DASHBOARD_SET_INSTANCES';
export const SET_SET_ACTIVE_TOOL = 'DASHBOARD_SET_ACTIVE_TOOL';
export const SET_SET_PUBLIC = 'DASHBOARD_SET_PUBLIC';

export function setInstances(tool, payload) {
    return {
        type: SET_INSTANCES,
        tool,
        payload
    };
}

export function setActiveTool( tool ) {
    return {
        type: SET_SET_ACTIVE_TOOL,
        payload: tool
    };
}

export function setPublic( publicInstances ) {
    return {
        type: SET_SET_PUBLIC,
        payload: publicInstances
    };
}

export function cloneToolInstance( id ) {
    return (dispatch, getState ) => {

        const tool = getState().dashboard.ui.activeToolSlug;

        switch (tool) {
            case 'T02':
                return dispatch( ToolInstance.Command.cloneToolInstance( tool, id, uuid.v4()) );
            case 'T03':
                return dispatch( T03.Command.cloneModflowModel( tool, id, uuid.v4()) );
            case 'T07':
                return dispatch( T07.Command.cloneScenarioAnalysis( tool, id, uuid.v4()) );
            default:
                break;
        }
    };
}

export function deleteToolInstance( id ) {
    return (dispatch, getState ) => {

        const tool = getState().dashboard.ui.activeToolSlug;

        switch (tool) {
            case 'T02':
                return dispatch( ToolInstance.Command.deleteToolInstance( tool, id ) );
            case 'T03':
                return dispatch( T03.Command.deleteModflowModel( tool, id ) );
            case 'T07':
                return dispatch( T07.Command.deleteScenarioAnalysis( tool, id ) );
            default:
                break;
        }
    };
}
