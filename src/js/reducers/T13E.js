import * as calc from '../calculations/T13E';
import applyParameterUpdate from './applyParameterUpdate';

function getInitialState() {
    return {
        background: {
            'image': '/images/tools/T13E.png'
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
          xwd: 0
        },

        parameters: [{
            order: 0,
            id: 'Qw',
            name: 'Constant pumped flow rate, Qw(m3/sec)',
            min: 0,
            max: 2000,
            value: 1300,
            stepSize: 100,
            decimals: 1
        }, {
            order: 1,
            id: 'ne',
            name: 'Effective porosity, n (-)',
            min: 0,
            max: 5,
            value: 0.35,
            stepSize: 0.05,
            decimals: 1
        }, {
            order: 2,
            id: 'hL',
            name: 'Downstream head, hL (m)',
            min: 0,
            max: 10,
            value: 6,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 3,
            id: 'h0',
            name: 'Upstream head, h0 (m)',
            min: 0,
            max: 10,
            value: 10,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 4,
            id: 'xi',
            name: 'Initial position, xi (m)',
            min: 1,
            max: 500,
            value: 303,
            stepSize: 1,
            decimals: 0
        }, {
            order: 5,
            id: 'x',
            name: 'Location of the well, x (m)',
            min: 1,
            max: 1.5,
            value: 0.1,
            stepSize: 1,
            decimals: 0
        }]
    }
};
const T13EReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T13E':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T13E':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T13E_PARAMETER':
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
    const Qw = state.parameters.find(p => {
            return p.id == 'Qw'
        })
        .value;
    const ne = state.parameters.find(p => {
            return p.id == 'ne'
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
    const xi = state.parameters.find(p => {
            return p.id == 'xi'
        })
        .value;
    const x = state.parameters.find(p => {
            return p.id == 'x'
        })
        .value;
    state.chart.data = calc.calculateDiagramData(Qw, hL, h0, x, xi, 10);
    return state;
}
export default T13EReducer;
