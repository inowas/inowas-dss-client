import { put, call, take, select, all } from 'redux-saga/effects';
import { Query, Action } from '../actions';
import { getApiKey } from '../../reducers/user';
import { WebData } from '../../core';
import ConfiguredAxios from 'ConfiguredAxios';
import BoundingBox from '../../model/BoundingBox';
import Coordinate from '../../model/Coordinate';
import Grid from '../../model/Grid';

export default function* loadScenarioAnalysis() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-shadow
        const action = yield take(Query.FETCH_SCENARIO_ANALYSIS_DETAILS);
        yield put(
            WebData.Modifier.Action.setAjaxStatus(action.type, {
                type: 'loading'
            })
        );

        const state = yield select();
        const apiKey = getApiKey(state.user);

        try {
            // fetch scenarioAnalysis
            const {
                data
            } = yield call(
                ConfiguredAxios.get,
                `/scenarioanalyses/${action.payload.id}`,
                {
                    headers: { 'X-AUTH-TOKEN': apiKey }
                }
            );

            if (data) {
                const boundingBox = new BoundingBox(
                    new Coordinate(
                        data.bounding_box[0][1],
                        data.bounding_box[0][0]
                    ),
                    new Coordinate(
                        data.bounding_box[1][1],
                        data.bounding_box[1][0]
                    )
                );

                const scenarioAnalysis = {
                    [data.id]: {
                        id: data.id,
                        baseModelId: data.base_model.id,
                        scenarioModelsIds: data.scenarios.map(
                            scenario => scenario.id
                        ),
                        boundingBox,
                        createdAt: new Date(data.createdAt),
                        area: data.geometry,
                        grid: new Grid(
                            boundingBox,
                            data.grid_size.n_x,
                            data.grid_size.n_y
                        ),
                        name: data.name,
                        description: data.description,
                        permissions: data.permissions,
                        public: data.public
                    }
                };

                const scenarioModels = {
                    [data.base_model.id]: {
                        id: data.base_model.id,
                        name: data.base_model.name,
                        description: data.base_model.description,
                        calculationId: data.base_model.calculation_id,
                        isBaseModel: true
                    },
                    // add all scenarios
                    ...data.scenarios.reduce((acc, scenario) => {
                        acc[scenario.id] = {
                            id: scenario.id,
                            name: scenario.name,
                            description: scenario.description,
                            calculationId: scenario.calculation_id
                        };
                        return acc;
                    }, {})
                };

                const currentBaseModel =
                    scenarioModels[
                        scenarioAnalysis[action.payload.id].baseModelId
                    ];

                const [
                    layerSchemeResponse,
                    boundariesResponses,
                    totalTimesResponse
                ] = yield all([
                    call(
                        ConfiguredAxios.get,
                        `/calculations/${currentBaseModel.calculationId}/results/layervalues`,
                        {
                            headers: { 'X-AUTH-TOKEN': apiKey }
                        }
                    ),
                    call(
                        ConfiguredAxios.all,
                        Object.keys(scenarioModels).map(id => {
                            return ConfiguredAxios.get(
                                `/modflowmodels/${id}/boundaries`,
                                {
                                    headers: {
                                        'X-AUTH-TOKEN': apiKey
                                    },
                                    params: {
                                        id
                                    }
                                }
                            );
                        })
                    ),
                    call(
                        ConfiguredAxios.get,
                        `/calculations/${currentBaseModel.calculationId}/results/times`,
                        { headers: { 'X-AUTH-TOKEN': apiKey } }
                    )
                ]);

                scenarioAnalysis[data.id].layerScheme =
                    layerSchemeResponse.data;
                scenarioAnalysis[data.id].totalTimes = totalTimesResponse.data;

                boundariesResponses.forEach(b => {
                    scenarioModels[b.config.params.id].boundaries = b.data;
                });
                yield all([
                    put(Action.setScenarioAnalysis(scenarioAnalysis)),
                    put(Action.setScenarioModels(scenarioModels))
                ]);
            }
        } catch (e) {
            yield put(
                WebData.Modifier.Action.setAjaxStatus(action.type, {
                    type: 'error',
                    error: e
                })
            );
            break;
        }

        yield put(
            WebData.Modifier.Action.setAjaxStatus(action.type, {
                type: 'success'
            })
        );
    }
}
