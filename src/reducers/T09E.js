import * as calc from '../calculations/T09E';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T09E.png';

function getInitialState() {
    return {
        background: {
            'image' : image
        },
        chart: {
            data: [],
            options: {
                yAxis: {
                    domain: [0 , 'auto']
                }
            }
        },
        settings: {
            'selected': 'confined'
        },
        info: {
            x: 0,
            q: 0
        },
        parameters: [
            {
                order: 0,
                id: 'k',
                name: 'Hydraulic conductivity, K (m/d)',
                min: 1,
                max: 100,
                value: 50,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 1,
                id: 'z',
                name: 'Depth to base of aquifer, z0 (m)',
                min: 0,
                max: 100,
                value: 15,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 2,
                id: 'l',
                name: 'Distance to inland boundary, L (m)',
                min: 0,
                max: 100,
                value: 50,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 3,
                id: 'w',
                name: 'Recharge rate, w (m³/d)',
                min: 0,
                max: 200,
                value: 50,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 4,
                id: 'dz',
                name: 'Sea level rise, dz0 (m)',
                min: 0,
                max: 0.5,
                value: 0.1,
                stepSize: 0.01,
                decimals: 2
            },
            {
                order: 5,
                id: 'hi',
                name: 'Constant head at inland boundary, hi (m)',
                min: 0,
                max: 100,
                value: 5,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 6,
                id: 'df',
                name: 'Density of freshwater [g/cm³]',
                min: 1.000,
                max: 1.005,
                value: 1.000,
                stepSize: 0.001,
                decimals: 3
            },
            {
                order: 7,
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

const T09DReducer = ( state=getInitialState(), action ) => {

    switch (action.type) {

        case 'CHANGE_TOOL_T09E_SETTINGS': {
            state = {
                ...state,
                settings: action.payload
            };

            break;
        }

        case 'RESET_TOOL_T09E': {
            state = {...state};
            state = getInitialState();
            calculateAndModifyState(state);

            break;
        }

        case 'CALCULATE_TOOL_T09E': {
            state = {...state};
            calculateAndModifyState(state);

            break;
        }

        case 'CHANGE_TOOL_T09E_PARAMETER': {

            state = {...state};

            const newParam = action.payload;
            var param = state.parameters.find(p => {return p.id === newParam.id});
            applyParameterUpdate(param, newParam);
            // check df <= ds
            let df = state.parameters.find(p => {return p.id == 'df'}),
                ds = state.parameters.find(p => {return p.id == 'ds'})

            if (df.value > ds.value) {
                df.value = ds.value;
            }
            calculateAndModifyState(state);
            break;
        }
    }

    return state;
};

function calculateAndModifyState(state) {
    const k = state.parameters.find( p => {return p.id == 'k'}).value;
    const z = state.parameters.find( p => {return p.id == 'z'}).value;
    const l = state.parameters.find( p => {return p.id == 'l'}).value;
    const w = state.parameters.find( p => {return p.id == 'w'}).value;
    const dz = state.parameters.find( p => {return p.id == 'dz'}).value;
    const hi = state.parameters.find( p => {return p.id == 'hi'}).value;
    const df = state.parameters.find( p => {return p.id == 'df'}).value;
    const ds = state.parameters.find( p => {return p.id == 'ds'}).value;

    //state.chart.data = calc.calculateDiagramData(q, k, d, df, ds, 0, 100, 10);
    //state.chart.options.yAxis.domain[1] = 2 * calc.calculateZCrit(d);

    //state.info.z = calc.calculateZ(q, k, d, df, ds).toFixed(1);
    //state.info.q = calc.calculateQ(k, d, df, ds).toFixed(1);
    //state.info.zCrit = calc.calculateZCrit(d).toFixed(1);

    return state
}

export default T09DReducer;
