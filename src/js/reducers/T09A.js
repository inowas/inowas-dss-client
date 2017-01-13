
import * as calculations from '../calculations';

const initialState = {
    background: {
        'image' : '/images/tools/T09A.png'
    },
    chart: {
        data: [
            {x: 1000, h: 4000, z: 2400},
            {x:  900, h: 3000, z: 1398},
            {x:  800, h: 2000, z: 9800},
            {x:  700, h: 2780, z: 3908},
            {x:  600, h: 1890, z: 4800},
            {x:  500, h: 2390, z: 3800},
            {x:  400, h: 3490, z: 4300}
        ],
        options: {
            yAxis: {
                domain: ['auto' , 'auto']
            }
        }
    },
    settings: {
        'selected': 'confined'
    },
    parameters: [
        {
            order: 0,
            id: 'h',
            name: 'Thickness of freshwater above sea level [m]',
            min: 0,
            max: 10,
            value: 1,
            stepSize: 0.1,
            decimals: 1
        },
        {
            order: 1,
            id: 'zCrit',
            name: 'Thickness of freshwater below sea level [m]',
            min: 0,
            max: 100,
            value: 40,
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
            order: 3,
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
        case 'CHANGE_TOOL_SETTINGS': {
            state = {
                ...state,
                settings: action.payload
            };

            break;
        }

        case 'CHANGE_TOOL_PARAMETER': {

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
            const iz = state.parameters.findIndex( p => {return p.id == 'zCrit'});
            const ih = state.parameters.findIndex( p => {return p.id == 'h'});

            if (changedParam.id == 'h'){
                state.parameters[iz].value = calculations.T09A.calculateZ(
                    state.parameters[ih].value,
                    state.parameters[idf].value,
                    state.parameters[ids].value
                );
            }

            if (changedParam.id == 'zCrit'){
                state.parameters[ih].value = calculations.T09A.calculateH(
                    state.parameters[iz].value,
                    state.parameters[idf].value,
                    state.parameters[ids].value
                );
            }

            if (changedParam.id == 'df' || changedParam.id == 'ds'){
                state.parameters[iz].value = calculations.T09A.calculateZ(
                    state.parameters[ih].value,
                    state.parameters[idf].value,
                    state.parameters[ids].value
                );

                state.parameters[ih].value = calculations.T09A.calculateH(
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
