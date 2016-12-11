
import * as calc from "../calculations/T09A"

const initialState = {
    background: {
        'image' : "/images/tools/T09A.png"
    },
    chart: {
        data: {}
    },
    settings: {
        'selected': 'confined'
    },
    parameters: [
        {
            order: 0,
            id: 'z',
            name: 'Thickness of freshwater below sea level [m]',
            min: 0,
            max: 100,
            value: 40,
            stepSize: 0.1,
            decimals: 1
        },
        {
            order: 1,
            id: 'h',
            name: 'Thickness of freshwater above sea level [m]',
            min: 0,
            max: 10,
            value: 1,
            stepSize: 0.1,
            decimals: 1
        },
        {
            order: 2,
            id: 'df',
            name: 'Density of freshwater [g/cm³]',
            min: 1.000,
            max: 1.005,
            value: 1.000,
            stepSize: 0.001,
            decimals: 3
        },
        {
            order: 0,
            id: 'ds',
            name: 'Density of saltwater [g/cm³]',
            min: 1.020,
            max: 1.030,
            value: 1.025,
            stepSize: 0.001,
            decimals: 3
        }
    ]
};

const T09AReducer = ( state=initialState, action ) => {

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
                }}
            );

            const idf = state.parameters.findIndex( p => {return p.id == 'df'});
            const ids = state.parameters.findIndex( p => {return p.id == 'ds'});
            const iz = state.parameters.findIndex( p => {return p.id == 'z'});
            const ih = state.parameters.findIndex( p => {return p.id == 'h'});

            if (changedParam.id == 'h'){
                state.parameters[iz].value = calc.calculateZ(
                    state.parameters[ih].value,
                    state.parameters[idf].value,
                    state.parameters[ids].value
                );
            }

            if (changedParam.id == 'z'){
                state.parameters[ih].value = calc.calculateH(
                    state.parameters[iz].value,
                    state.parameters[idf].value,
                    state.parameters[ids].value
                );
            }

            if (changedParam.id == 'df' || changedParam.id == 'ds'){
                state.parameters[iz].value = calc.calculateZ(
                    state.parameters[ih].value,
                    state.parameters[idf].value,
                    state.parameters[ids].value
                );

                state.parameters[ih].value = calc.calculateH(
                    state.parameters[iz].value,
                    state.parameters[idf].value,
                    state.parameters[ids].value
                );
            }

            state.parameters.map( p => {
                if (p.value > p.max) {
                    p.max = p.value;
                }

                if (p.value < p.min) {
                    p.min = p.value;
                }
            });

            break;
        }
    }

    return state;
};

export default T09AReducer;
