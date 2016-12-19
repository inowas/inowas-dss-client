import axios from "../axios";
import store from "../store"

const getApiKey = function() {
    return store.getState().user.apiKey;
};

export function fetchScenarios(modelId) {
    const apiKey = getApiKey();
    return {
        type: "FETCH_SCENARIOS",
        payload: axios.get('/scenarioanalysis/models/'+ modelId +'.json', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    }
}

export function setBaseModel(modelId) {
    return {
        type: "SET_BASEMODEL",
        payload: modelId
    }
}

export function setActiveScenario(scenarioId) {
    return {
        type: "SET_ACTIVE_SCENARIO",
        payload: scenarioId
    }
}

export function duplicateScenario(modelId, scenarioId) {
    const apiKey = getApiKey();
    return {
        type: "DUPLICATE_SCENARIO",
        payload: axios.post('/scenarioanalysis/models/'+ modelId +'/scenarios/'+ scenarioId +'/duplicate.json',
            {},
            {headers: {'X-AUTH-TOKEN': apiKey}}
        )
    }
}

export function deleteScenario(modelId, scenarioId) {
    const apiKey = getApiKey();
    return {
        type: "DELETE_SCENARIO",
        payload: axios.delete('/scenarioanalysis/models/'+ modelId +'/scenarios/'+ scenarioId +'.json', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    }
}

export function updateNameAndDescription(modelId, scenarioId, name, description) {
    const apiKey = getApiKey();
    return {
        type: "UPDATE_SCENARIO",
        payload: axios.put('/scenarioanalysis/models/'+ modelId +'/scenarios/'+ scenarioId +'.json',
            {
                name: name,
                description: description
            },
            {headers: {'X-AUTH-TOKEN': apiKey}}
        )
    }
}

export function fetchScenarioBoundary( modelId, scenarioId, boundaryId ) {
    const apiKey = getApiKey();
    return {
        type: "FETCH_SCENARIO_BOUNDARY",
        payload: axios.get('/scenarioanalysis/models/'+ modelId +'/scenarios/'+ scenarioId +'/boundaries/'+ boundaryId +'.json', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}

export function fetchScenario(modelId, scenarioId) {
    const apiKey = getApiKey();
    return {
        type: "FETCH_SCENARIO",
        payload: axios.get('/scenarioanalysis/models/'+ modelId +'/scenarios/'+ scenarioId +'.json', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}

export function calculateScenario(scenarioId) {
    const apiKey = getApiKey();
    return {
        type: "CALCULATE_SCENARIO",
        payload: axios.post("scenarioanalysis/calculation/"+ scenarioId +".json", {},{
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}
