
const initialState = {
    background: {
        'image' : "/images/toolScheme.svg"
    },
    chart: {
        data: {},
        options: {}
    },
    settings: {
        'selected': 'confined'
    },
    parameters: {
        cnd: ['Hydraulic Conductivity, K (m/d)', 0, 100, 10, 1],
        dep: ['Depth to base of aquifer, B(m)', -50, 10, -21, 1]
    }
};

const toolReducer = ( state=initialState, action ) => {

    switch (action.type) {
        case "CHANGE_TOOL_SETTINGS": {
            state = {
                ...state,
                settings: action.payload
            };

            break;
        }
    }

    return state;
};

export default toolReducer;
