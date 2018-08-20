import {put, take} from 'redux-saga/effects';
import {Command, Query} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* calculateOptimization() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => action.type === Command.CALCULATE_OPTIMIZATION);

        yield put(WebData.Modifier.Action.responseAction(Command.CALCULATE_OPTIMIZATION, {
            type: 'loading',
            data: null
        }));

        yield put(WebData.Modifier.Action.sendCommand(action.type, action.payload));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action => WebData.Helpers.waitForResponse(action, Command.CALCULATE_OPTIMIZATION));

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put(Query.getOptimization(action.tool, action.payload));
                break;
            }
        }
    }
}
