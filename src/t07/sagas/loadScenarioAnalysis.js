import { put, call, take, select } from 'redux-saga/effects';
import { buildRequest } from '../../actions/messageBox';
import { Query, Action } from '../actions/index';
import { getApiKey } from '../../reducers/user';
import { WebData } from '../../core';

export default function* loadScenarioAnalysis() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take( action => WebData.Helpers.waitForAction( action, Query.GET_SCENARIO_ANALYSIS_DETAILS ) );

        yield put( WebData.Modifier.Action.responseAction( action.type, { type: 'loading' } ) );

        const state = yield select();
        const apiKey = getApiKey( state.user );

        try {
            const scenarioAnalysis = yield call(
                WebData.Helpers.fetchStatusWrapper,
                buildRequest( 'scenarioanalyses/' + action.id + '', 'GET' ),
                apiKey
            );

            const data = {
                basemodel_id: scenarioAnalysis.base_model.id,
                name: scenarioAnalysis.name,
                description: scenarioAnalysis.description,
                public: scenarioAnalysis.public,
                id: scenarioAnalysis.id,
                permissions: scenarioAnalysis.permissions,
            };

            yield put( Action.setScenarioAnalysis( action.tool, data ) );
            yield put(WebData.Modifier.Action.responseAction(action.type, {type: 'success', data: null}));
        } catch (err) {
            let msg = 'Unknown Error';

            if (typeof err === 'string') {
                msg = err;
            } else {
                const error = err.error || { message: undefined };
                msg = error.message || msg;
            }

            yield put( WebData.Modifier.Action.responseAction( action.type, { type: 'error', msg: msg } ) );
        }
    }
}
