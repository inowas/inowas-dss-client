import { takeEvery, call } from 'redux-saga/effects';
import { WebData } from './core';
import { Saga as T03 } from './t03/index';

export default function* rootSaga() {
    yield [
        takeEvery(
            WebData.Modifier.Query.AT_SEND_HTTP_REQUEST,
            WebData.Saga.sendHttpRequestFlow
        ),
        call(T03.addBoundaryFlow),
        call(T03.addLayerFlow),
        call(T03.createModelFlow),
        call(T03.getModflowModelDetailsFlow),
        call(T03.loadBoundaryFlow),
        call(T03.loadModelFlow),
        call(T03.loadSoilmodelLayerFlow),
        call(T03.removeBoundaryFlow),
        call(T03.removeLayerFlow),
        call(T03.updateBoundaryFlow),
        call(T03.updateLayerFlow),
        call(T03.updateModelFlow),
        call(T03.updateStressPeriodsFlow)
    ];
}
