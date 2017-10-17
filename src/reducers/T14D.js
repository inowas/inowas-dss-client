import * as calc from '../calculations/T14D';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T14D.png';

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
            dQ: 0
        },
        parameters: [{
            order: 0,
            id: 'Qw',
            name: 'Pumping rate, Qw (m³/d)',
            min: 1,
            validMin: function(x) {return x > 0;},
            max: 1000,
            value: 150,
            stepSize: 1,
            decimals: 0
        }, {
            order: 1,
            id: 't',
            name: 'Duration of pumping, t (d)',
            min: 100,
            validMin: function(x) {return x > 1;},
            max: 500,
            value: 365,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 2,
            id: 'S',
            name: 'Aquifer storage coefficient, S (-)',
            min: 0.1,
            validMin: function(x) {return x > 0;},
            max: 0.5,
            validMax: function(x) {return x <= 1;},
            value: 0.2,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 3,
            id: 'T',
            name: 'Aquifer transmissivity, T (m²/d)',
            min: 1000,
            validMin: function(x) {return x > 0;},
            max: 3000,
            value: 1500,
            stepSize: 10,
            decimals: 0
        }, {
            order: 4,
            id: 'd',
            name: 'Distance from stream to well, d (m)',
            min: 200,
            validMin: function(x) {return x > 0;},
            max: 1000,
            value: 500,
            stepSize: 1,
            decimals: 0
        }, {
            order: 5,
            id: 'W',
            name: 'Width of stream , W (m)',
            min: 1,
            validMin: function(x) {return x > 0;},
            max: 10,
            value: 2.5,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 6,
            id: 'Kdash',
            name: 'Permeability of the semipervious layer, K\' (m/d)',
            min: 0.1,
            validMin: function(x) {return x > 0;},
            max: 1,
            value: 0.1,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 7,
            id: 'bdash',
            name: 'Thickness of the semipervious layer, b\' (m)',
            min: 1,
            validMin: function(x) {return x > 0;},
            max: 10,
            value: 1,
            stepSize: 0.1,
            decimals: 1
        }]
    };
}

const T14DReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T14D':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T14D':
            {
                state = { ...state };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T14D_PARAMETER':
            {
                state = { ...state };

                const newParam = action.payload;
                const param = state.parameters.find(p => {return p.id === newParam.id;});

                applyParameterUpdate(param, newParam);
                calculateAndModifyState(state);
                break;
            }
    }
    return state;
};

function calculateAndModifyState(state) {

    const Qw = state.parameters.find(p => (p.id === 'Qw')).value;
    const t = state.parameters.find( p => (p.id === 't')).value;
    const S = state.parameters.find( p => (p.id === 'S')).value;
    const T = state.parameters.find( p => (p.id === 'T')).value;
    const d = state.parameters.find( p => (p.id === 'd')).value;
    const W = state.parameters.find( p => (p.id === 'W')).value;
    const Kdash = state.parameters.find( p => (p.id === 'Kdash')).value;
    const bdash = state.parameters.find( p => (p.id === 'bdash')).value;

    const lambda = Kdash * W / bdash;

    state.chart.data = calc.calculateDiagramData(Qw, S, T, d, 0, t, lambda, 1);
    state.info.dQ = state.chart.data[state.chart.data.length - 1].dQ;

    return state;
}

export default T14DReducer;
