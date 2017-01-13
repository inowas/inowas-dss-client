
import * as calc from "../calculations/T09B"

function getInitialState() {
    return {
        background: {
            'image' : "/images/tools/T09B.png"
        },
        chart: {
            data: [],
            options: {
                yAxis: {
                    domain: [0, 50]
                },
                xAxis: {}
            }
        },
        info: {
            l: 0,
            z: 0
        },
        parameters: [
            {
                order: 0,
                id: 'b',
                name: 'Aquifer thickness, b (m)',
                min: 1,
                max: 100,
                value: 50,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 1,
                id: 'i',
                name: 'Hydraulic gradient, i (-)',
                min: 0.000,
                max: 0.010,
                value: 0.002,
                stepSize: 0.001,
                decimals: 3
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
}

const T09BReducer = ( state=getInitialState(), action ) => {

    switch (action.type) {

        case "RESET_TOOL_T09B": {
            state = {...state};
            state = getInitialState();
            calculateAndModifyState(state);

            break;
        }

        case "CALCULATE_TOOL_T09B": {
            state = {...state};
            calculateAndModifyState(state);

            break;
        }

        case "CHANGE_TOOL_T09B_PARAMETER": {

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
    const b = state.parameters.find( p => {return p.id == 'b'}).value;
    const i = state.parameters.find( p => {return p.id == 'i'}).value;
    const df = state.parameters.find( p => {return p.id == 'df'}).value;
    const ds = state.parameters.find( p => {return p.id == 'ds'}).value;

    state.chart.options.yAxis.domain = [-b, 0];
    state.chart.options.xAxis.domain = [-b*10, 0];
    state.chart.data = calc.calculateDiagramData(i, b, df, ds, 0, b*10, 1);
    state.info.z = calc.calculateZ(i, b, df, ds).toFixed(1);
    state.info.l = calc.calculateL(i, b, df, ds).toFixed(1);
    state.info.xT = state.chart.data.find((d) => {return d.b == Math.round(d.z)}).x;

    return state
}

export default T09BReducer;
