// import ModflowModelDifference from '../../model/ModflowModelDifference';
// import { Modifier, Selector } from '../index';
// import TotalTime from '../../model/TotalTime';
// import TimeSeriesPoint from '../../model/TimeSeriesPoint';
// import LayerNumber from '../../model/LayerNumber';
// import ResultType from '../../model/ResultType';
// import Coordinate from '../../model/Coordinate';
// import ModflowModels from '../../model/ModflowModelsCollection';
// import { Action, Event } from '../actions/index';
//
// function getInitialState() {
//     return {
//         scenarioAnalysis: Selector.ScenarioAnalysis.getInitialState(),
//         resize: false,
//         reload: false,
//         layerValues: null,
//         selectedLayerNumber: null,
//         selectedResultType: null,
//         totalTimes: null,
//         selectedTotalTimeIndex: null,
//         models: new ModflowModels(),
//         t07bDifference: null,
//         t07bSelectedModelIds: null,
//         T07BResult: null,
//         timeSeriesPoints: [], // for T07C
//         mapPosition: {
//             bounds: [
//                 {
//                     lat: -90,
//                     lng: -180
//                 },
//                 {
//                     lat: 90,
//                     lng: 180
//                 }
//             ]
//         },
//         activeCoordinate: null
//     };
// }
//
// const T07MainReducer = (state = getInitialState(), action) => {
//     switch (action.type) {
//         case Action.SET_SCENARIO_ANALYSIS:
//             return {
//                 ...state,
//                 scenarioAnalysis: action.payload
//             };
//         case Event.SCENARIO_ANALYSIS_UPDATED:
//             return {
//                 ...state,
//                 scenarioAnalysis: {
//                     ...state.scenarioAnalysis,
//                     ...action.payload
//                 }
//             };
//
//         case Action.DESTROY_SCENARIO_ANALYSIS:
//             return {
//                 ...state,
//                 scenarioAnalysis: Selector.ScenarioAnalysis.getInitialState()
//             };
//
//         case Modifier.Event.SCENARIO_DELETED:
//             state = { ...state };
//             state.models.removeById(action.payload.scenario_id);
//             state.resize = true;
//             break;
//
//     }
//
//     return state;
// };
//
// export default T07MainReducer;

import { combineReducers } from 'redux';
import ScenarioAnalysis from './ScenarioAnalysis';
import ScenarioModels from './ScenarioModels';

export default combineReducers({
    ScenarioAnalysis,
    ScenarioModels
});
