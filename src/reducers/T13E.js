import * as calc from '../calculations/T13E';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T13E.png';

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
          xwd: 0
        },

        parameters: [{
            order: 0,
            id: 'Qw',
            name: 'Constant pumped flow rate, Qw(m3/d)',
            min: 0,
            max: 10e8,
            value: 1300,
            stepSize: 100,
            decimals: 1
        }, {
            order: 1,
            id: 'ne',
            name: 'Effective porosity, n (-)',
            min: 0,
            max: 0.5,
            value: 0.35,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 2,
            id: 'hL',
            name: 'Downstream head, hL (m)',
            min: 0,
            max: 20,
            value: 6,
            stepSize: 0.5,
            decimals: 1
        }, {
            order: 3,
            id: 'h0',
            name: 'Upstream head, h0 (m)',
            min: 0,
            max: 20,
            value: 10,
            stepSize: 0.5,
            decimals: 1
        }, {
            order: 4,
            id: 'xi',
            name: 'Initial position, xi (m)',
            min: 0,
            max: 1000,
            value: 303,
            stepSize: 10,
            decimals: 0
        }, {
            order: 5,
            id: 'x',
            name: 'Location of the well, x (m)',
            min: 1,
            max: 1000,
            value: 100,
            stepSize: 10,
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
                // check xi <= xe <= L
                let x = state.parameters.find(p => {return p.id == 'x'}),
                    xi = state.parameters.find(p => {return p.id == 'xi'});

                if (x.value > xi.value) {
                    x.value = xi.value;
                }
                //setting boundaries of ne and K
                let ne = state.parameters.find(p => {return p.id == 'ne'});
                if (ne.max > 0.5) {
                    ne.max = 0.5;
                }
                if (ne.max < 0.0) {
                    ne.max = 0.0;
                }
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
    state.chart.data = calc.calculateDiagramData(Qw, ne, hL, h0, x, xi, 10);
    return state;
}
export default T13EReducer;
