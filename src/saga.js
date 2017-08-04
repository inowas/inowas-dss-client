import {takeEvery, call} from 'redux-saga/effects';
import {AT_SEND_HTTP_REQUEST, sendHttpRequestFlow} from './api/webData';
import {createModelFlow} from "./sagas/modflow/createModel";
import {loadModelFlow} from "./sagas/modflow/loadModel";
import {updateModelFlow} from "./sagas/modflow/updateModel";
import {removBoundaryFlow} from "./t03/sagas/index";

export default function* rootSaga () {
    yield [
        takeEvery( AT_SEND_HTTP_REQUEST, sendHttpRequestFlow ),
        call(createModelFlow),
        call(loadModelFlow),
        call(updateModelFlow),
        call(removBoundaryFlow),
    ];
}
