import * as calc from '../calculations/T13A';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T13A.png';

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
        parameters: [{
            order: 0,
            id: 'W',
            name: 'Average infiltration rate, W(m/d)',
            min: 0.001,
            max: 0.01,
            value: 0.009,
            stepSize: 0.0001,
            decimals: 4
        }, {
            order: 1,
            id: 'K',
            name: 'Hydraulic conductivity, K (m/d)',
            min: 10e-2,
            max: 10e2,
            value: 10.1,
            stepSize: 10,
            decimals: 2
        }, {
            order: 2,
            id: 'ne',
            name: 'Effective porosity, n (-)',
            min: 0,
            max: 0.5,
            value: 0.35,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 3,
            id: 'L',
            name: 'Aquifer length, L´ (m)',
            min: 0,
            max: 1000,
            value: 500,
            stepSize: 10,
            decimals: 0
        }, {
            order: 4,
            id: 'hL',
            name: 'Downstream fixed head boundary, hL´ (m)',
            min: 0,
            max: 10,
            value: 2,
            stepSize: 0.5,
            decimals: 1
        }, {
            order: 5,
            id: 'xi',
            name: 'Initial position, xi (m)',
            min: 0,
            max: 1000,
            value: 50,
            stepSize: 10,
            decimals: 0
        }, {
            order: 6,
            id: 'xe',
            name: 'Arrival location, xe (m)',
            min: 1,
            max: 1000,
            value: 500,
            stepSize: 10,
            decimals: 0
        }]
    }
}
const T13AReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T13A':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T13A':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T13A_PARAMETER':
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
    const xi = state.parameters.find(p => {
            return p.id == 'xi'
        })
        .value;
    const xe = state.parameters.find(p => {
            return p.id == 'xe'
        })
        .value;
    state.chart.data = calc.calculateDiagramData(w, K, ne, L, hL, xi, xe, 10);
    return state;
}
export default T13AReducer;
