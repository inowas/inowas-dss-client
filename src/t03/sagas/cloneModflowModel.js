import { put, take } from 'redux-saga/effects';
import { sendCommand } from '../../actions/messageBox';
import { setPublic } from '../../actions/dashboard';
import { Command, Event } from '../../t03/actions/index';
import { WebData } from '../../core';

export default function* cloneModflowModelFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => WebData.Helpers.waitForAction( action, Command.CLONE_MODFLOW_MODEL ) );

        yield put( sendCommand( action.type, action.payload ) );

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action => WebData.Helpers.waitForResponse( action, Command.CLONE_MODFLOW_MODEL ) );

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put( Event.modflowModelCloned( action.tool, action.id, action.payload.id ) );
                yield put(setPublic(false));
                break;
            }
        }
    }
}
