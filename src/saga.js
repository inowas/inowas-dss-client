import { takeEvery, call } from 'redux-saga/effects';
import { WebData } from './core';
import { Saga as Dashboard } from './dashboard/index';
import { Saga as RasterData } from './core/rasterData/index';
import { Saga as T03 } from './t03/index';
import { Saga as T07 } from './t07/index';
import { Saga as ToolInstance } from './toolInstance/index';

export default function* rootSaga() {
    yield [
        takeEvery(
            WebData.Modifier.Query.AT_SEND_HTTP_REQUEST,
            WebData.Saga.sendHttpRequestFlow
        ),
        call(Dashboard.loadInstancesFlow),
        call(RasterData.uploadRasterFileFlow),
        call(T03.addBoundaryFlow),
        call(T03.addLayerFlow),
        call(T03.calculateModflowModelFlow),
        call(T03.calculateStressPeriodsFlow),
        call(T03.cloneModflowModelFlow),
        call(T03.createModelFlow),
        call(T03.deleteModlfowModelFlow),
        call(T03.getModflowModelDetailsFlow),
        call(T03.loadBoundaryFlow),
        call(T03.loadListfileFlow),
        call(T03.loadModelFlow),
        call(T03.loadModflowPackagesFlow),
        call(T03.loadModflowPackageFlow),
        call(T03.loadResultsFlow),
        call(T03.loadSoilmodelLayerFlow),
        call(T03.loadStressPeriodsFlow),
        call(T03.pollModflowModelCalculationStatusFlow),
        call(T03.removeBoundaryFlow),
        call(T03.removeLayerFlow),
        call(T03.updateBoundaryFlow),
        call(T03.updateLayerFlow),
        call(T03.updateModelFlow),
        call(T03.updateModflowPackageFlow),
        call(T03.updateStressPeriodsFlow),
        call(T07.cloneScenarioAnalysisFlow),
        call(T07.createScenarioAnalysisFlow),
        call(T07.createScenarioFlow),
        call(T07.deleteScenarioAnalysisFlow),
        call(T07.deleteScenarioFlow),
        call(T07.loadScenarioAnalysisFlow),
        call(T07.updateScenarioAnalysisFlow),
        call(ToolInstance.createToolInstanceFlow),
        call(ToolInstance.updateToolInstanceFlow),
        call(ToolInstance.deleteToolInstanceFlow),
        call(ToolInstance.cloneToolInstanceFlow),
        call(ToolInstance.cloneToolInstanceFlow),
    ];
}
