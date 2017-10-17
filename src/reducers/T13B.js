import * as calc from '../calculations/T13B';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T13B.png';

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
        }, {
            order: 5,
            id: 'ne',
            name: 'Effective porosity, n (-)',
            min: 0,
            max: 0.5,
            value: 0.35,
            stepSize: 0.01,
            decimals: 2,
            disable: true
        }, {
            order: 6,
            id: 'xi',
            name: 'Initial position, xi (m)',
            min: 0,
            max: 1000,
            value: 50,
            stepSize: 10,
            decimals: 0,
            disable: true
        }, {
            order: 7,
            id: 'xe',
            name: 'Arrival location, xe (m)',
            min: 1,
            max: 1000,
            value: 200,
            stepSize: 10,
            decimals: 0,
            disable: true
        }]
    }
}
const T13BReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'CHANGE_TOOL_T13B_SETTINGS':
            {
               state = {
                    ...state,
                     settings: action.payload
                };
                state.parameters.map(param => {
                   if (param.order >= 5){
                       param.disable = false;
                   } else {
                       param.disable = true;
                   }
                });
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

                if (xi.value > L.value) {
                    xi.value = L.value;
                }
                //setting boundaries of ne and K
                let ne = state.parameters.find(p => {return p.id == 'ne'});
                if (ne.max > 0.5) {
                    ne.max = 0.5;
                }
                if (ne.max < 0.0) {
                    ne.max = 0.0;
                }
                let K = state.parameters.find(p => {return p.id == 'K'});
                if (K.max > 10e3) {
                    K.max = 10e3;
                }

                calculateAndModifyState(state);
                console.log('I reach ehre')
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
    if (state.settings.selected === 'h0') {
        state.chart.data = calc.calculateDiagramData(w, K, ne, (xwd*1), h0, xi, xe, 10);
    }
    if (state.settings.selected === 'hL') {
        state.chart.data = calc.calculateDiagramData(w, K, ne, (L-xwd), hL, xi, xe, 10);
    }
    return state;
}
export default T13BReducer;
