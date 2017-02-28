import * as calc from '../calculations/T13B';
import applyParameterUpdate from './applyParameterUpdate';

function getInitialState() {
    return {
        background: {
            'image': '/images/tools/T13B.png'
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
            selected: 'hL'
        },
        info: {
          xwd: 0
        },

        parameters: [{
            order: 0,
            id: 'w',
            name: 'Percolation rate, w(m/d)',
            min: 0,
            max: 10,
            value: 0.1,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 1,
            id: 'K',
            name: 'Hydraulic conductivity, K (m/d)',
            min: 0,
            max: 100,
            value: 10,
            stepSize: 1,
            decimals: 1
        }, {
            order: 2,
            id: 'ne',
            name: 'Effective porosity, n (-)',
            min: 0,
            max: 5,
            value: 0.35,
            stepSize: 0.05,
            decimals: 1
        }, {
            order: 3,
            id: 'L',
            name: 'Aquifer length, L´ (m)',
            min: 0,
            max: 5000,
            value: 1000,
            stepSize: 10,
            decimals: 0
        }, {
            order: 4,
            id: 'hL',
            name: 'Downstream head, hL (m)',
            min: 0,
            max: 10,
            value: 1,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 5,
            id: 'h0',
            name: 'Upstream head, h0 (m)',
            min: 0,
            max: 10,
            value: 10,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 6,
            id: 'xi',
            name: 'Distance to initial position, xi (m)',
            min: 1,
            max: 500,
            value: 50,
            stepSize: 1,
            decimals: 0
        }, {
            order: 7,
            id: 'xe',
            name: 'Distance to arrival location, xe (m)',
            min: 1,
            max: 1500,
            value: 1000,
            stepSize: 1,
            decimals: 0
        }]
    }
};
const T13BReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'CHANGE_TOOL_T13B_SETTINGS':
            {
               state = {
                    ...state,
                    settings: action.payload
                };
                calculateAndModifyState(state);
                break;
            }

        case 'RESET_TOOL_T13B':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T13B':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T13B_PARAMETER':
            {
                state = { ...state,
                };

                const newParam = action.payload;
                var param = state.parameters.find(p => {return p.id === newParam.id});
                applyParameterUpdate(param, newParam);

                // check xi <= xe <= L
                let xe = state.parameters.find(p => {return p.id == 'xe'}),
                xi = state.parameters.find(p => {return p.id == 'xi'}),
                L = state.parameters.find(p => {return p.id == 'L'});

                if (xe.value < xi.value) {
                    xe.value = xi.value;
                }

                if (xe.value > L.value) {
                    xe.value = L.value;
                }

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
    const K = state.parameters.find(p => {
            return p.id == 'K'
        })
        .value;
    const ne = state.parameters.find(p => {
            return p.id == 'ne'
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
    const xi = state.parameters.find(p => {
            return p.id == 'xi'
        })
        .value;
    const xe = state.parameters.find(p => {
            return p.id == 'xe'
        })
        .value;
    state.info.xwd = calc.calculateXwd(L, K, w, hL, h0).toFixed(1);
    const xwd = state.info.xwd;
    var h1 = hL;
    var L1 = L-xwd;
    if (state.settings.selected === 'h0') {
        h1 = h0;
        //L1 = xwd; check why it's not working!!
    }
    state.chart.data = calc.calculateDiagramData(w, K, ne, L1, h1, xi, xe, 10);
    return state;
}
export default T13BReducer;
