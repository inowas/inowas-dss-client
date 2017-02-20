import axios from '../axios';
import store from '../store';

const apiKey = store.getState().user.apiKey;

export function getModelList() {
    return {
        type: 'SET_TOOL_T07_MODEL_LIST',
        payload: axios.get('/modflow/', {
            headers: {'X-AUTH-TOKEN': apiKey}
        })
    };
}
