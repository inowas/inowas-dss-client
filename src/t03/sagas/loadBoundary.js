import {put, all, call, take, select} from 'redux-saga/effects';
import {buildRequest} from "../../actions/messageBox";
import {Query, Action} from "../../t03/actions/index";
import {getApiKey} from "../../reducers/user";
import {WebData} from "../../core";

export default function* loadBoundaryFlow () {
    while ( true ) {
        let action = yield take( action => action.type === Query.GET_BOUNDARY );

        yield put( WebData.Modifier.Action.responseAction( action.type, { type: "loading" } ) );

        yield WebData.Modifier.Action.reset( action.type );
        yield Action.destroyModflowModel();

        const state = yield select();
        const apiKey = getApiKey( state.user );

        try {
            const boundary = yield call(
                WebData.Helpers.fetchStatusWrapper,
                buildRequest( 'modflowmodels/' + action.id + '/boundaries/' + action.bid, 'GET' ),
                apiKey
            );
            yield put( Action.setBoundary( action.tool, boundary ) );

        } catch ( err ) {
            let msg = "Unknown Error";

            if ( typeof err === "string" ) {
                msg = err;
            } else {
                let error = err.error || { message: undefined };
                msg = error.message || msg;
            }

            yield put( WebData.Modifier.Action.responseAction( action.type, { type: "error", msg: msg } ) );
        }
    }
}
