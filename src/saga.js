import {takeEvery, call} from 'redux-saga/effects';
import {AT_SEND_HTTP_REQUEST, sendHttpRequestFlow} from './api/webData';
import {createModelFlow} from "./sagas/modflow/createModel";

export default function* rootSaga () {
    yield [
        takeEvery( AT_SEND_HTTP_REQUEST, sendHttpRequestFlow ),
        call(createModelFlow),
    ];
}
