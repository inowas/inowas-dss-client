import * as calc from '../calculations/T09D'
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T09D.png';

function getInitialState() {
    return {
        background: {
            'image': image
        },
        chart: {
            data: [],
            options: {
                yAxis: {
                    domain: [0, 'auto']
                }
            }
        },
        settings: {
            selected: 'confined'
        },
        info: {
            x: 0,
            q: 0
        },
        parameters: [{
                order: 0,
                id: 'k',
                name: 'Hydraulic conductivity, K [m/d]',
                min: 1,
                validMin: function (x) {
                    return x > 0
                },
                max: 100,
                value: 50,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 1,
                id: 'b',
                name: 'Aquifer thickness below sea level, b [m]',
                min: 10,
                validMin: function (x) {
                    return x > 0
                },
                max: 100,
                value: 20,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 2,
                id: 'q',
                name: 'Offshore discharge rate, q [m³/d]',
                min: 0.1,
                validMin: function (x) {
                    return x > 0
                },
                max: 10,
                value: 1,
                stepSize: 0.1,
                decimals: 1
            },
            {
                order: 3,
                id: 'qw',
                name: 'Well pumping rate, Qw [m³/d]',
                min: 1000,
                validMin: function (x) {
                    return x > 0
                },
                max: 8000,
                value: 5000,
                stepSize: 10,
                decimals: 0
            },
            {
                order: 4,
                id: 'xw',
                name: 'Distance from well to shoreline, xw [m]',
                min: 1000,
                validMin: function (x) {
                    return x > 0
                },
                max: 5000,
                value: 2000,
                stepSize: 1,
                decimals: 0
            },
            {
                order: 5,
                id: 'rhof',
                name: 'Density of freshwater, ρ [g/cm³]',
                min: 0.9,
                validMin: function (x) {
                    return x >= 0.9
                },
                max: 1.03,
                validMax: function (x) {
                    return x <= 1.05
                },
                value: 1,
                stepSize: 0.001,
                decimals: 3
            },
            {
                order: 6,
                id: 'rhos',
                name: 'Density of saltwater, ρₛ [g/cm³]',
                min: 0.9,
                validMin: function (x) {
                    return x >= 0.9
                },
                max: 1.03,
                validMax: function (x) {
                    return x <= 1.05
                },
                value: 1.025,
                stepSize: 0.001,
                decimals: 3
            }
        ]
    };
}

const T09DReducer = (state = getInitialState(), action) => {

    switch (action.type) {

        case 'CHANGE_TOOL_T09D_SETTINGS':
            state = {
                ...state,
                settings: action.payload
            };
            break;


        case 'RESET_TOOL_T09D':
            state = { ...state
            };
            state = getInitialState();
            calculateAndModifyState(state);
            break;

        case 'CALCULATE_TOOL_T09D':
            state = { ...state
            };
            calculateAndModifyState(state);

            break;

        case 'CHANGE_TOOL_T09D_PARAMETER':
            state = { ...state
            };

            const newParam = action.payload;
            var param = state.parameters.find(p => {
                return p.id === newParam.id
            });
            applyParameterUpdate(param, newParam);
            // check rhof <= rhos
            let rhof = state.parameters.find(p => {return p.id == 'rhof'}),
                rhos = state.parameters.find(p => {return p.id == 'rhos'})

            if (rhof.value > rhos.value) {
                rhof.value = rhos.value;
            }
            calculateAndModifyState(state);
            break;
    }

    return state;
};

function calculateAndModifyState(state) {
    const k = state.parameters.find(p => {
        return p.id == 'k'
    }).value;
    const b = state.parameters.find(p => {
        return p.id == 'b'
    }).value;
    const q = state.parameters.find(p => {
        return p.id == 'q'
    }).value;
    const qw = state.parameters.find(p => {
        return p.id == 'qw'
    }).value;
    const xw = state.parameters.find(p => {
        return p.id == 'xw'
    }).value;
    const rhof = state.parameters.find(p => {
        return p.id == 'rhof'
    }).value;
    const rhos = state.parameters.find(p => {
        return p.id == 'rhos'
    }).value;
    var xs = xw*(1-(qw/(Math.PI*q*xw) ));
    console.log(xs);
    state.chart.data = calc.calculateDiagramData(q, b, k, rhof, rhos, qw, xw);

    // state.chart.data = calc.calculateDiagramData(q, k, d, df, ds, 0, 100, 10);
    // state.chart.options.yAxis.domain[1] = 2 * calc.calculateZCrit(d);
    //
    // state.info.z = calc.calculateZ(q, k, d, df, ds).toFixed(1);
    // state.info.q = calc.calculateQ(k, d, df, ds).toFixed(1);
    // state.info.zCrit = calc.calculateZCrit(d).toFixed(1);

    //state.chart.options.yAxis.domain[1] = -100;

    state.info.xT = 1;
    state.info.qmax = 1;

    return state
}

export default T09DReducer;
