
import * as calc from "../calculations/T09C"

function getInitialState() {
    return {
        background: {
            'image' : "/images/tools/T09C.png"
        },
        chart: {
            data: [],
            options: {
                yAxis: {
                    domain: [0 , 'auto']
                }
            }
        },
        info: {
            h: 0,
            z: 0,
            q: 0
        },
        parameters: [
            {
                order: 0,
                id: 'q',
                name: 'Pumping rate, Q (m³/d)',
                min: 0,
                max: 2000,
                value: 2000,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 1,
                id: 'k',
                name: 'Hydraulic conductivity, K (m/d)',
                min: 1,
                max: 100,
                value: 50,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 2,
                id: 'd',
                name: 'Pre-pumping distance, d(m)',
                min: 1,
                max: 50,
                value: 30,
                stepSize: 0.5,
                decimals: 1
            },
            {
                order: 3,
                id: 'df',
                name: 'Density of freshwater [g/cm³]',
                min: 1.000,
                max: 1.005,
                value: 1.000,
                stepSize: 0.001,
                decimals: 3
            },
            {
                order: 4,
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
}

const T09CReducer = ( state=getInitialState(), action ) => {

    switch (action.type) {

        case "RESET_TOOL_T09C": {
            state = {...state};
            state = getInitialState();
            calculateAndModifyState(state);

            break;
        }

        case "CALCULATE_TOOL_T09C": {
            state = {...state};
            calculateAndModifyState(state);

            break;
        }

        case "CHANGE_TOOL_T09C_PARAMETER": {

            const changedParam = action.payload;
            state = {...state};

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

            calculateAndModifyState(state);
            break;
        }
    }

    return state;
};

function calculateAndModifyState(state) {
    const q = state.parameters.find( p => {return p.id == 'q'}).value;
    const k = state.parameters.find( p => {return p.id == 'k'}).value;
    const d = state.parameters.find( p => {return p.id == 'd'}).value;
    const df = state.parameters.find( p => {return p.id == 'df'}).value;
    const ds = state.parameters.find( p => {return p.id == 'ds'}).value;

    state.chart.data = calc.calculateDiagramData(q, k, d, df, ds, 0, 100, 10);
    state.chart.options.yAxis.domain[1] = 2 * calc.calculateZ(d);

    state.info.h = calc.calculateH(q, k, d, df, ds).toFixed(1);
    state.info.q = calc.calculateQ(k, d, df, ds).toFixed(1);
    state.info.z = calc.calculateZ(d).toFixed(1);

    return state
}

export default T09CReducer;
