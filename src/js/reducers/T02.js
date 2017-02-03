import * as calc from '../calculations/T02';
import applyParameterUpdate from './applyParameterUpdate';

function getInitialState() {
    return {
        background: {
            'image': '/images/tools/T02.png'
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
            hmax: 0,
        },
        parameters: [{
            order: 0,
            id: 'w',
            name: 'Percolation rate, w(m/d)',
            min: 0,
            validMin: function(x) {return x >= 0},
            max: 10,
            value: 0.045,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 1,
            id: 'L',
            name: 'Basin length, L (m)',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 100,
            value: 20.5,
            stepSize: 1,
            decimals: 1
        }, {
            order: 2,
            id: 'W',
            name: 'Basin width, W (m)',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 100,
            value: 20.5,
            stepSize: 1,
            decimals: 1
        }, {
            order: 3,
            id: 'hi',
            name: 'Initial groundwater Level, hi (m)',
            min: 0,
            validMin: function(x) {return x >= 0},
            max: 100,
            value: 35,
            stepSize: 1,
            decimals: 0
        }, {
            order: 4,
            id: 'Sy',
            name: 'Specific yield, Sy (-)',
            min: 0.000,
            validMin: function(x) {return x > 0},
            max: 0.5,
            validMax: function(x) {return x <= 0.5},
            value: 0.085,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 5,
            id: 'K',
            name: 'Hydraulic conductivity, K (m/d)',
            min: 0.1,
            validMin: function(x) {return x > 0},
            max: 10,
            validMax: function(x) {return x <= 100000},
            value: 1.83,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 6,
            id: 't',
            name: 'Infiltration time, t (d)',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 100,
            value: 1.5,
            stepSize: 1,
            decimals: 1
        }]
    }
};
const T02Reducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T02':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T02':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T02_PARAMETER':
            {
                state = { ...state,
                };

                const newParam = action.payload;
                var param = state.parameters.find(p => {return p.id === newParam.id});
                applyParameterUpdate(param, newParam);

                calculateAndModifyState(state);
                break;
            }
    }
    return state;
};

function calculateAndModifyState(state) {
    const w = state.parameters.find(p => {
            return p.id == 'w'
        })
        .value;
    const L = state.parameters.find(p => {
            return p.id == 'L'
        })
        .value;
    const W = state.parameters.find(p => {
            return p.id == 'W'
        })
        .value;
    const hi = state.parameters.find(p => {
            return p.id == 'hi'
        })
        .value;
    const Sy = state.parameters.find(p => {
            return p.id == 'Sy'
        })
        .value;
    const K = state.parameters.find(p => {
            return p.id == 'K'
        })
        .value;
    const t = state.parameters.find(p => {
            return p.id == 't'
        })
        .value;
    state.chart.data = calc.calculateDiagramData(w, L, W, hi, Sy, K, t, 0, 120, 10);


    state.info.hmax = state.chart.data[0].hhi + hi;
    //state.chart.options.yAxis.domain[1] = 2 * calc.calculateZCrit(d);
    return state
}
export default T02Reducer;
