import { put, take } from 'redux-saga/effects';
import { sendQuery } from '../../actions/messageBox';
import { Query, Action } from '../actions/index';
import { WebData } from '../../core';

export default function* cloneModflowModelFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => WebData.Helpers.waitForAction( action, Query.LOAD_INSTANCES ) );

        yield put( sendQuery( 'tools/' + action.tool + (action.publicInstances ? '?public=true' : ''), Query.LOAD_INSTANCES ) );

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action => WebData.Helpers.waitForResponse( action, Query.LOAD_INSTANCES ) );

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put( Action.setInstances( action.tool, response.webData.data ) );
                break;
            }
        }
    }
}
