import {takeEvery} from 'redux-saga/effects';
import {AT_SEND_HTTP_REQUEST, sendHttpRequestFlow} from './api/webData';

export default function* rootSaga () {
    yield [
        takeEvery( AT_SEND_HTTP_REQUEST, sendHttpRequestFlow )
    ];
}
