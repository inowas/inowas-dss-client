import * as calc from '../calculations/T16A';
import applyParameterUpdate from './applyParameterUpdate';

function getInitialState() {
    return {
        background: {
            'image': '/images/tools/T16A.png'
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
            K: 0
        },
        parameters: [{
            order: 0,
            id: 'CH',
            name: 'Hazen coefficient, CH',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 500,
            stepSize: 10,
            decimals: 0
        }, {
            order: 1,
            id: 'd10',
            name: 'Particle dia @ 10% of accum. mass, d10 (-)',
            min: 0.1,
            validMin: function(x) {return x > 0},
            max: 1,
            value: 0.1,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 2,
            id: 'T',
            name: 'Water temperature, T (C)',
            min: 10,
            validMin: function(x) {return x > 0},
            max: 40,
            value: 20,
            stepSize: 0.1,
            decimals: 1
        }]
    }
};
const T14DReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T16A':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T16A':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T16A_PARAMETER':
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
    const CH = state.parameters.find(p => {
            return p.id == 'CH'
        })
        .value;
    const d10 = state.parameters.find(p => {
            return p.id == 'd10'
        })
        .value;
    const T = state.parameters.find(p => {
            return p.id == 'T'
        })
        .value;
    state.chart.data = calc.calculateDiagramData(CH, T, 0, d10, 0.01);
    state.info.K = state.chart.data[state.chart.data.length -1].K;
    return state;
}
export default T14DReducer;
