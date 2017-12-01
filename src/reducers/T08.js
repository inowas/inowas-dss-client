import * as calc from '../calculations/T08';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T08.jpg';

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
            retardation: true,
            case: 'Case2',
            infiltration:'Continuous'
        },
        info: {
            R: 0,
            DL: 0,
            vx: 0,
            C: 0
        },

        parameters: [{
            order: 0,
            id: 'C0',
            name: 'Initial concentration of the solute, C₀ [mg/l]',
            min: 0.0,
            max: 1000.0,
            value: 725,
            stepSize: 0.01,
            decimals: 3
        }, {
            order: 1,
            id: 'x',
            name: 'Distance from the injection point, x [m]',
            min: 0,
            max: 100,
            value: 15,
            stepSize: 1,
            decimals: 2
        }, {
            order: 2,
            id: 't',
            name: 'Time since injection, t [d]',
            min: 0,
            max: 500,
            value: 365,
            stepSize: 1,
            decimals: 0
        }, {
            order: 3,
            id: 'K',
            name: 'Hydraulic conductivity, K [m/d]',
            min: 1e-2,
            max: 1e+2,
            value: 2.592,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 4,
            id: 'I',
            name: 'Hydraulic gradient, I [-]',
            min: 0,
            max: 0.01,
            value: 0.002,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 5,
            id: 'ne',
            name: 'Effective porosity, n [-]',
            min: 0,
            max: 0.5,
            value: 0.23,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 6,
            id: 'rhoS',
            name: 'Particle density, ρₛ [g/cc]',
            min: 0,
            max: 3.00,
            value: 2.65,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 7,
            id: 'alphaL',
            name: 'Longitudinal dispersivity, alpha [m]',
            min: 0.1,
            max: 10,
            value: 0.923,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 8,
            id: 'Kd',
            name: 'Sorption partition coefficient,  Kd [l/g]',
            min: 0.0,
            max: 0.1,
            value: 0.01,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 9,
            id: 'tau',
            name: 'Duration of infiltration, τ [d]',
            min: 0,
            max: 500,
            value: 100,
            stepSize: 1,
            decimals: 0
        }, {
            order: 10,
            id: 'Corg',
            name: 'Organic carbon content in the soil, Cₒᵣg [-]',
            min: 0,
            max: 0.1,
            value: 0.001,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 11,
            id: 'Kow',
            name: 'Logarithmus of octanol/water partition coefficient, log Kₒw [-]',
            min: 0,
            max: 10,
            value: 2.25,
            stepSize: 0.001,
            decimals: 3
        }]
    }
}
const T08Reducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T08':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T08':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T08_PARAMETER':
            {
                state = { ...state,
                };

                const newParam = action.payload;
                var param = state.parameters.find(p => {return p.id === newParam.id});
                applyParameterUpdate(param, newParam);
                if(param.order >= 10) {
                    calculateKdAndModifyState(state);
                }
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T08_SETTINGS':
            {
            state = {
                ...state,
            };
            state.settings.case = action.payload;
            calculateAndModifyState(state);
            break;
        }
        case 'CHANGE_TOOL_T08_INFILTRATION':
        {
            state = {
                ...state,
            };
            state.settings.infiltration = action.payload;
            calculateAndModifyState(state);
            break;
        }
    }
    return state;
};
function calculateKdAndModifyState(state) {
    const Kow = state.parameters.find(p => {
        return p.id == 'Kow'
    })
        .value;
    const Corg = state.parameters.find(p => {
        return p.id == 'Corg'
    })
        .value;

    state.parameters.find(p => {
        return p.id == 'Kd'
    })
        .value = calc.calculate_kd(Kow, Corg);
}
function calculateAndModifyState(state) {
    const C0 = state.parameters.find(p => {
            return p.id == 'C0'
        })
        .value;
    const K = state.parameters.find(p => {
            return p.id == 'K'
        })
        .value;
    const I = state.parameters.find(p => {
        return p.id == 'I'
    })
        .value;
    const ne = state.parameters.find(p => {
            return p.id == 'ne'
        })
        .value;
    const x = state.parameters.find(p => {
            return p.id == 'x'
        })
        .value;
    const t = state.parameters.find(p => {
            return p.id == 't'
        })
        .value;
    const Kd = state.parameters.find(p => {
        return p.id == 'Kd'
    })
        .value;
    const alphaL = state.parameters.find(p => {
            return p.id == 'alphaL'
        })
        .value;
    const tau = state.parameters.find(p => {
        return p.id == 'tau'
    })
        .value;
    state.info.vx = calc.calculate_vx(K, ne, I);
    state.info.DL = calc.calculate_DL(alphaL,state.info.vx);
    state.info.R = calc.calculate_R(ne, Kd);
    state.chart.data = calc.calculateDiagramData(C0, state.info, x, t, state.settings.case, state.settings.infiltration, tau);

    return state;
}
export default T08Reducer;
