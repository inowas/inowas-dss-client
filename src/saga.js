import {takeEvery, call} from 'redux-saga/effects';
import {AT_SEND_HTTP_REQUEST, sendHttpRequestFlow} from './api/webData';
import {Saga as T03} from "./t03/index";

export default function* rootSaga () {
    yield [
        takeEvery( AT_SEND_HTTP_REQUEST, sendHttpRequestFlow ),
        call(T03.createModelFlow),
        call(T03.loadBoundaryFlow),
        call(T03.loadModelFlow),
        call(T03.updateModelFlow),
        call(T03.removeBoundaryFlow),
    ];
}
