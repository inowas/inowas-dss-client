import * as calc from '../calculations/T18';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T18.jpg';
import {
    inputType
} from '../inputType';

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
        info: {
            CoToHigh: false,
            CnToHigh: false,
            AH: 0,
            AN: 0,
            AO: 0
        },
        background: {
            'image': image
        },
        parameters: [{
            order: 0,
            id: 'LLRN',
            label: 'Limiting loading rates N (kg/m²/y)',
            inputType: inputType.NUMBER,
            min: 0,
            validMin: function(x) {return x >= 0},
            max: 500,
            value: 67,
            stepSize: 1,
            decimals: 0
        }, {
            order: 1,
            id: 'LLRO',
            label: 'Limiting loading rates BOD (kg/m²/y)',
            inputType: inputType.NUMBER,
            min: 0,
            validMin: function(x) {return x >= 0},
            max: 1000,
            value: 667,
            stepSize: 1,
            decimals: 0
        }, {
            order: 2,
            id: 'AF',
            label: 'The infiltration rate was estimated using',
            inputType: inputType.RADIO_SELECT,
            value: 0.07,
            options: [{
                id: 'Bit',
                value: 0.07,
                label: 'Basin infiltration test'
            }, {
                id: 'Ciaep',
                value: 0.02,
                label: 'Cylinder infiltrometer or air entry permeameter'
            }]
        }, {
            order: 3,
            id: 'Q',
            label: 'Flow rate, Q (million m³/y)',
            inputType: inputType.SLIDER,
            min: 0,
            validMin: function(x) {return x >= 0},
            max: 30,
            value: 3.65,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 4,
            id: 'IR',
            label: 'Infiltration rate, IR (m/y)',
            inputType: inputType.SLIDER,
            min: 0,
            validMin: function(x) {return x >= 0},
            max: 1000,
            value: 438,
            stepSize: 1,
            decimals: 0
        }, {
            order: 5,
            id: 'OD',
            label: 'No. operation days per year, OD (d)',
            inputType: inputType.SLIDER,
            min: 0,
            validMin: function(x) {return x >= 0},
            max: 365,
            validMax: function(x) {return x <= 365},
            value: 365,
            stepSize: 1,
            decimals: 0
        }, {
            order: 6,
            id: 'Cn',
            label: 'Nitrogen concentration, CN (mg/l)',
            inputType: inputType.SLIDER,
            min: 0,
            validMin: function(x) {return x >= 0},
            max: 100,
            value: 40,
            stepSize: 1,
            decimals: 0
        }, {
            order: 7,
            id: 'Co',
            label: 'Organic concentration, CBOD (mg/l)',
            inputType: inputType.SLIDER,
            min: 0,
            validMin: function(x) {return x >= 0},
            max: 100,
            value: 100,
            stepSize: 1,
            decimals: 0
        }]
    };
}
const T18Reducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T18':
            {
                state = { ...state
                };
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T18':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T18_PARAMETER':
            {
                state = { ...state
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
    const LLRN = calc.convertLLR(state.parameters.find(p => {
            return p.id == 'LLRN'
        })
        .value);
    const LLRO = calc.convertLLR(state.parameters.find(p => {
            return p.id == 'LLRO'
        })
        .value);
    const AF = state.parameters.find(p => {
            return p.id == 'AF'
        })
        .value;
    const Q = calc.convertQ(state.parameters.find(p => {
            return p.id == 'Q'
        })
        .value);
    const IR = state.parameters.find(p => {
            return p.id == 'IR'
        })
        .value;
    const OD = state.parameters.find(p => {
            return p.id == 'OD'
        })
        .value;
    const Cn = calc.convertC(state.parameters.find(p => {
            return p.id == 'Cn'
        })
        .value);
    const Co = calc.convertC(state.parameters.find(p => {
            return p.id == 'Co'
        })
        .value);
    state.info.CoToHigh = calc.isCtoHigh(Co, IR, AF, OD, LLRO);
    state.info.CnToHigh = calc.isCtoHigh(Cn, IR, AF, OD, LLRN);
    state.chart.data = calc.calculateDiagramData(LLRN, LLRO, AF, Q, IR, OD, Cn, Co);
    state.info.AH = state.chart.data.find(A => {return A.name == 'AH'}).value;
    state.info.AN = state.chart.data.find(A => {return A.name == 'AN'}).value;
    state.info.AO = state.chart.data.find(A => {return A.name == 'AO'}).value;

    return state;
}
export default T18Reducer;
