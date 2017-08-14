import {put, call, take} from 'redux-saga/effects';
import {browserHistory} from 'react-router';
import {sendCommand, stateToCreatePayload} from '../../actions/messageBox';
import {Command, Event} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* createModelFlow() {
    while ( true ) {
        const action = yield take( action => action.type === Command.CREATE_MODFLOW_MODEL );

        const payload = stateToCreatePayload(action.payload);
        payload.id = action.id;

        yield put( sendCommand( action.type, payload ) );

        while ( true ) {
            const response = yield take( action => WebData.Helpers.waitForResponse(action, Command.CREATE_MODFLOW_MODEL ) );

            if ( response.webData.type === 'error' ) {
                break;
            }

            if ( response.webData.type === 'success' ) {
                yield put(Event.modflowModelCreated(action.tool, action.id, action.payload));
                yield call( browserHistory.push, '/tools/' + action.tool + '/' + action.id );
                break;
            }
        }
    }
}
