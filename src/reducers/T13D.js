import * as calc from '../calculations/T13D';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';

function getInitialState() {
    return {
        chart: {
            data: [],
            options: {
                yAxis: {
                    domain: [0, 'auto']
                }
            }
        },
        settings: {
            selected: ''
        },
        info: {
          xwd: 0
        },

        parameters: [{
            order: 0,
            id: 'W',
            name: 'Average infiltration rate, W(m/d)',
            min: 0.001,
            max: 0.01,
            value: 0.00112,
            stepSize: 0.0001,
            decimals: 5,
            disable: false
        }, {
            order: 1,
            id: 'K',
            name: 'Hydraulic conductivity, K (m/d)',
            min: 10e-2,
            max: 10e2,
            value: 30.2,
            stepSize: 10,
            decimals: 2,
            disable: false
        }, {
            order: 2,
            id: 'L',
            name: 'Aquifer length, L´ (m)',
            min: 0,
            max: 1000,
            value: 1000,
            stepSize: 10,
            decimals: 0,
            disable: false
        }, {
            order: 3,
            id: 'hL',
            name: 'Downstream head, hL´ (m)',
            min: 0,
            max: 10,
            value: 2,
            stepSize: 0.1,
            decimals: 1,
            disable: false
        }, {
            order: 4,
            id: 'h0',
            name: 'Upstream head, h0 (m)',
            min: 0,
            max: 10,
            value: 5,
            stepSize: 0.1,
            decimals: 1,
            disable: false
        }]
    }
}
const T13BReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T13D':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T13D':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T13D_PARAMETER':
            {
                state = { ...state,
                };

                const newParam = action.payload;
                var param = state.parameters.find(p => {return p.id === newParam.id});
                applyParameterUpdate(param, newParam);

                //setting boundaries of ne and K
                let K = state.parameters.find(p => {return p.id == 'K'});
                if (K.max > 10e3) {
                    K.max = 10e3;
                }

                calculateAndModifyState(state);
                break;
            }
    }
    return state;
};

function calculateAndModifyState(state) {
    const w = state.parameters.find(p => {
            return p.id == 'W'
        })
        .value;
    const K = state.parameters.find(p => {
            return p.id == 'K'
        })
        .value;
    const L = state.parameters.find(p => {
            return p.id == 'L'
        })
        .value;
    const hL = state.parameters.find(p => {
            return p.id == 'hL'
        })
        .value;
    const h0 = state.parameters.find(p => {
        return p.id == 'h0'
    })
        .value;
    state.info.xwd = calc.calculateXwd(L, K, w, hL, h0).toFixed(1);
    const xwd = state.info.xwd;
    return state;
}
export default T13BReducer;
