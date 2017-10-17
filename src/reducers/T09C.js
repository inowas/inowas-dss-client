import * as calc from '../calculations/T09C';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T09C.png';

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
        info: {
            z: 0,
            zCrit: 0,
            q: 0
        },
        parameters: [{
            order: 0,
            id: 'q',
            name: 'Pumping rate, Q (m³/d)',
            min: 1,
            validMin: function (x) {
                return x > 0
            },
            max: 3000,
            value: 2000,
            stepSize: 1,
            decimals: 0
        }, {
            order: 1,
            id: 'k',
            name: 'Hydraulic conductivity, K (m/d)',
            min: 1,
            validMin: function (x) {
                return x > 0
            },
            max: 100,
            validMax: function (x) {
                return x <= 100000
            },
            value: 50,
            stepSize: 1,
            decimals: 0
        }, {
            order: 2,
            id: 'd',
            name: 'Pre-pumping distance, d(m)',
            min: 1,
            validMin: function (x) {
                return x > 0
            },
            max: 50,
            value: 30,
            stepSize: 1,
            decimals: 0
        }, {
            order: 3,
            id: 'df',
            name: 'Density of freshwater [g/cm³]',
            min: 0.9,
            validMin: function (x) {
                return x >= 0.9
            },
            max: 1.03,
            validMax: function (x) {
                return x <= 1.05
            },
            value: 1.000,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 4,
            id: 'ds',
            name: 'Density of saltwater [g/cm³]',
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
        }]
    };
}
const T09CReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T09C':
            {
                state = { ...state
                };
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T09C':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T09C_PARAMETER':
            {
                state = { ...state
                };
                const newParam = action.payload;
                var param = state.parameters.find(p => {
                    return p.id === newParam.id
                });
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
    const q = state.parameters.find(p => {
            return p.id == 'q'
        })
        .value;
    const k = state.parameters.find(p => {
            return p.id == 'k'
        })
        .value;
    const d = state.parameters.find(p => {
            return p.id == 'd'
        })
        .value;
    const df = state.parameters.find(p => {
            return p.id == 'df'
        })
        .value;
    const ds = state.parameters.find(p => {
            return p.id == 'ds'
        })
        .value;
    state.chart.data = calc.calculateDiagramData(q, k, d, df, ds, 0, 1000, 1);
    state.chart.options.yAxis.domain[1] = 2 * calc.calculateZCrit(d);
    state.info.z = calc.calculateZ(q, k, d, df, ds)
        .toFixed(1);
    state.info.q = calc.calculateQ(k, d, df, ds)
        .toFixed(1);
    state.info.zCrit = calc.calculateZCrit(d)
        .toFixed(1);
    return state
}

export default T09CReducer;
