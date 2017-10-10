import { put, take } from 'redux-saga/effects';
import {
    sendCommand,
} from '../../actions/messageBox';

import { Command, Action, Event, Query } from '../../t03/actions/index';
import { WebData } from '../../core';

export default function * updateModflowPackage() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(action => action.type === Command.UPDATE_MODFLOW_PACKAGE);

        yield put( Action.setModflowPackage( action.tool, action.payload.package_name, action.packageType, action.payload.data ) );
        yield put(sendCommand(action.type, action.payload));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take(action => WebData.Helpers.waitForResponse(action, Command.UPDATE_MODFLOW_PACKAGE));

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put(Event.modflowPackageUpdated(action.tool, action.payload.package_name, action.packageType, action.payload.data));
                yield put(Query.getModflowPackages(action.tool, action.payload.id));
                break;
            }
        }
    }
}
