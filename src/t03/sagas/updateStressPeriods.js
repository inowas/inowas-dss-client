import {put, take} from 'redux-saga/effects';
import {
    sendCommand,
} from '../../actions/messageBox';

import {Command, Action, Event} from '../../t03/actions/index';
import {WebData} from '../../core';

export default function* updateStressPeriodsFlow() {
    // eslint-disable-next-line no-constant-condition
    while ( true ) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => action.type === Command.UPDATE_STRESS_PERIODS );

        yield put( Action.setStressPeriods( action.tool, action.payload.stress_periods ) );
        yield put( sendCommand( action.type, action.payload ));

        // eslint-disable-next-line no-constant-condition
        while ( true ) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action => WebData.Helpers.waitForResponse( action, Command.UPDATE_STRESS_PERIODS ) );

            if ( response.webData.type === 'error' ) {
                break;
            }

            if ( response.webData.type === 'success' ) {
                yield put( Event.stressPeriodsUpdated( action.tool, action.payload.stress_periods ) );
                break;
            }
        }
    }
}
