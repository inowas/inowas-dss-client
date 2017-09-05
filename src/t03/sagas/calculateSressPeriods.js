import { put, take } from 'redux-saga/effects';
import { sendCommand } from '../../actions/messageBox';
import { Command, Event, Query } from '../../t03/actions/index';
import { WebData } from '../../core';

export default function* calculateStressPeriodsFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => WebData.Helpers.waitForAction( action, Command.CALCULATE_STRESS_PERIODS ) );

        yield put( sendCommand( action.type, action.payload ) );

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action => WebData.Helpers.waitForResponse( action, Command.CALCULATE_STRESS_PERIODS ) );

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put( Event.stressPeriodsCalculated( action.tool, action.payload ) );
                yield put( Query.getStressPeriods( action.tool, action.payload.id ) );
                break;
            }
        }
    }
}
