import axios from '../axios';
import store from '../store';

const getApiKey = function() {
    return store.getState().user.apiKey;
};

export function fetchScenarios(modelId) {
    const apiKey = getApiKey();
    return {
        type: 'FETCH_SCENARIOS',
        payload: axios.get('/scenarioanalysis/models/' + modelId + '.json', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}

export function setBaseModel(modelId) {
    return {
        type: 'SET_BASEMODEL',
        payload: modelId
    };
}

export function setActiveScenario(scenarioId) {
    return {
        type: 'SET_ACTIVE_SCENARIO',
        payload: scenarioId
    };
}

export function duplicateScenario(modelId, scenarioId) {
    const apiKey = getApiKey();
    return {
        type: 'DUPLICATE_SCENARIO',
        payload: axios.post('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '/duplicate.json',
            {},
            {headers: {'X-AUTH-TOKEN': apiKey}}
        )
    };
}

export function deleteScenario(modelId, scenarioId) {
    const apiKey = getApiKey();
    return {
        type: 'DELETE_SCENARIO',
        payload: axios.delete('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '.json', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}

export function updateNameAndDescription(modelId, scenarioId, name, description) {
    const apiKey = getApiKey();
    return {
        type: 'UPDATE_SCENARIO',
        payload: axios.put('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '.json',
            {
                name: name,
                description: description
            },
            {headers: {'X-AUTH-TOKEN': apiKey}}
        )
    };
}

export function fetchScenarioBoundary( modelId, scenarioId, boundaryId ) {
    const apiKey = getApiKey();
    return {
        type: 'FETCH_SCENARIO_BOUNDARY',
        payload: axios.get('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '/boundaries/' + boundaryId + '.json', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}

export function fetchScenario(modelId, scenarioId) {
    const apiKey = getApiKey();
    return {
        type: 'FETCH_SCENARIO',
        payload: axios.get('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '.json', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}

export function calculateScenario(scenarioId) {
    const apiKey = getApiKey();
    return {
        type: 'CALCULATE_SCENARIO',
        payload: axios.post('/scenarioanalysis/calculation/' + scenarioId + '.json', {}, {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}

export function addWell(modelId, scenarioId, latLng) {
    const apiKey = getApiKey();
    return {
        type: 'SCENARIO_SUBMIT_EVENT',
        payload: axios.post('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '.json',
            {payload: JSON.stringify({event: 'ADD_WELL', name: 'myNewWell', lat: latLng.lat, lng: latLng.lng, srid: 4326})},
            {headers: {'X-AUTH-TOKEN': apiKey}}
        )
    };
}

export function removeWell(modelId, scenarioId, wellId) {
    const apiKey = getApiKey();
    return {
        type: 'SCENARIO_SUBMIT_EVENT',
        payload: axios.post('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '.json',
            {payload: JSON.stringify({event: 'REMOVE_WELL', well_id: wellId})},
            {headers: {'X-AUTH-TOKEN': apiKey}}
        )
    };
}

export function changeWellName(modelId, scenarioId, wellId, name) {
    const apiKey = getApiKey();
    return {
        type: 'SCENARIO_SUBMIT_EVENT',
        payload: axios.post('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '.json',
            {payload: JSON.stringify({event: 'CHANGE_WELL_NAME', well_id: wellId, name: name})},
            {headers: {'X-AUTH-TOKEN': apiKey}}
        )
    };
}

export function changeWellFlux(modelId, scenarioId, wellId, flux) {
    const stressperiods = [{
        date_time_begin: '2015-01-01',
        flux: flux
    }];
    const apiKey = getApiKey();
    return {
        type: 'SCENARIO_SUBMIT_EVENT',
        payload: axios.post('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '.json',
            {payload: JSON.stringify({event: 'CHANGE_WELL_STRESSPERIODS', well_id: wellId, stress_periods: stressperiods})},
            {headers: {'X-AUTH-TOKEN': apiKey}}
        )
    };
}

export function changeWellType(modelId, scenarioId, wellId, type) {
    const apiKey = getApiKey();
    return {
        type: 'SCENARIO_SUBMIT_EVENT',
        payload: axios.post('/scenarioanalysis/models/' + modelId + '/scenarios/' + scenarioId + '.json',
            {payload: JSON.stringify({event: 'CHANGE_WELL_TYPE', well_id: wellId, type: type})},
            {headers: {'X-AUTH-TOKEN': apiKey}}
        )
    };
}

export function choosePointForNewWell() {
    return {
        type: 'SET_SELECT_POINT',
        payload: true
    };
}

export function setPointForNewWell(pointData) {
    return {
        type: 'SET_SELECT_POINT',
        payload: pointData
    };
}

export function changeNameOfBoundary(id, name) {
    return {
        type: 'CHANGE_BOUNDARY_NAME',
        payload: {id: id, name: name}
    };
}

export function getHeadList(scenarioId) {
    const apiKey = getApiKey();
    return {
        type: 'FETCH_SCENARIO_HEAD_LIST',
        payload: axios.get('/scenarioanalysis/scenario/' + scenarioId + '/heads.json', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}
