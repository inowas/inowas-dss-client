import { put, take } from 'redux-saga/effects';
import { sendCommand } from '../../actions/messageBox';
import { Command, Event } from '../../t03/actions/index';
import { WebData } from '../../core';
import { Routing } from '../actions';
import { push } from 'react-router-redux';

export default function* addLayerFlow() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => action.type === Command.ADD_LAYER );

        yield put( sendCommand( action.type, action.payload ) );

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-next-line no-shadow
            const response = yield take( action =>
                WebData.Helpers.waitForResponse( action, Command.ADD_LAYER )
            );

            if (response.webData.type === 'error') {
                break;
            }

            if (response.webData.type === 'success') {
                yield put( Event.layerAdded( action.tool, action.payload.layer ) );
                yield put(
                    push(
                        Routing.editLayerUrl( action.routes, action.params )( action.payload.layer.id )
                    )
                );
                break;
            }
        }
    }
}
