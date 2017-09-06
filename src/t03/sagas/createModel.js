import {put, call, take} from 'redux-saga/effects';
import {sendCommand, stateToCreatePayload} from '../../actions/messageBox';
import {Command, Event} from '../../t03/actions/index';
import {WebData} from '../../core';
import { Routing } from '../actions';
import { push } from 'react-router-redux';

export default function* createModelFlow() {
    // eslint-disable-next-line no-constant-condition
    while ( true ) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => action.type === Command.CREATE_MODFLOW_MODEL );

        const payload = stateToCreatePayload(action.payload);
        payload.id = action.id;

        yield put( sendCommand( action.type, payload ) );

        // eslint-disable-next-line no-constant-condition
        while ( true ) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action => WebData.Helpers.waitForResponse(action, Command.CREATE_MODFLOW_MODEL ) );

            if ( response.webData.type === 'error' ) {
                break;
            }

            if ( response.webData.type === 'success' ) {
                yield put(Event.modflowModelCreated(action.tool, action.id, action.payload));
                yield put(
                    push(
                        Routing.editModflowModelUrl( action.routes, action.params )( action.id )
                    )
                );
                break;
            }
        }
    }
}
