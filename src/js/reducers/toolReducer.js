
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
    parameters: [
        {
            id: 'cnd',
            name: 'Hydraulic Conductivity, K (m/d)',
            min: 0,
            max: 100,
            value: 51,
            stepSize: 1
        },
        {
            id: 'dep',
            name: 'Depth to base of aquifer, B (m)',
            min: -50,
            max: 10,
            value: -21,
            stepSize: 1
        }
    ]
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

        case "CHANGE_TOOL_PARAMETER": {

            const changedParam = action.payload;
            state = {
                ...state,
            };

            state.parameters.map( p => {
                if (p.id === changedParam.id){
                    if (changedParam.hasOwnProperty('min')){
                        p.min = changedParam.min;
                    }

                    if (changedParam.hasOwnProperty('max')){
                        p.max = changedParam.max;
                    }

                    if (changedParam.hasOwnProperty('value')){
                        p.value = changedParam.value;
                    }
                }
            });

            break;
        }
    }

    return state;
};

export default toolReducer;
