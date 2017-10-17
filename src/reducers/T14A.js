import * as calc from '../calculations/T14A';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T14A.png';

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
            min: 1,
            validMin: function(x) {return x > 1;},
            max: 500,
            value: 5,
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
        }]
    };
}

const T14AReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T14A':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T14A':
            {
                state = { ...state };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T14A_PARAMETER':
            {
                state = { ...state };

                const newParam = action.payload;
                const param = state.parameters.find(p => (p.id === newParam.id));

                applyParameterUpdate(param, newParam);
                calculateAndModifyState(state);

                break;
            }
    }
    return state;
};

const calculateAndModifyState = state => {
    const Qw = state.parameters.find(p => (p.id === 'Qw')).value;
    const t = state.parameters.find( p => (p.id === 't')).value;
    const S = state.parameters.find( p => (p.id === 'S')).value;
    const T = state.parameters.find( p => (p.id === 'T')).value;
    const d = state.parameters.find( p => (p.id === 'd')).value;

    state.chart.data = calc.calculateDiagramData(Qw, S, T, d, 0, t, 1);
    state.info.dQ = state.chart.data[state.chart.data.length - 1].dQ;
    return state;
};

export default T14AReducer;
