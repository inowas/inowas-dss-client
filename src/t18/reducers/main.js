import {createSimpleToolReducer} from '../../core/helpers/createSimpleToolReducer';
import {inputType} from "../../inputType";

export const SETTINGS_CASE_FIXED_TIME = 1;
export const SETTINGS_CASE_VARIABLE_TIME = 2;
export const SETTINGS_INFILTRATION_ONE_TIME = 1;
export const SETTINGS_INFILTRATION_CONTINUOUS = 2;

export const getInitialState = () => {
    return {
        name: 'New simple tool',
        description: 'Simple tool description',
        permissions: 'rwx',
        public: false,
        settings: {
            retardation: true,
            case: SETTINGS_CASE_FIXED_TIME,
            infiltration: SETTINGS_INFILTRATION_CONTINUOUS
        },
        parameters: [{
            order: 0,
            id: 'LLRN',
            label: 'Limiting loading rates N (kg/m²/y)',
            inputType: inputType.NUMBER,
            min: 0,
            validMin: x => x >= 0,
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
            validMin: x => x >= 0,
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
            validMin: x => x >= 0,
            max: 30,
            value: 3.65,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 4,
            id: 'IR',
            label: 'Infiltration rate, I<sub>R</sub> (m/y)',
            inputType: inputType.SLIDER,
            min: 0,
            validMin: x => x >= 0,
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
            validMin: x => x >= 0,
            max: 365,
            validMax: x => x <= 365,
            value: 365,
            stepSize: 1,
            decimals: 0
        }, {
            order: 6,
            id: 'Cn',
            label: 'Nitrogen concentration, C<sub>N</sub> (mg/l)',
            inputType: inputType.SLIDER,
            min: 0,
            validMin: x => x >= 0,
            max: 100,
            value: 40,
            stepSize: 1,
            decimals: 0
        }, {
            order: 7,
            id: 'Co',
            label: 'Organic concentration, C<sub>O</sub> (BOD in mg/l)',
            inputType: inputType.SLIDER,
            min: 0,
            validMin: x => x >= 0,
            max: 100,
            value: 100,
            stepSize: 1,
            decimals: 0
        }]
    };
};

export const createReducer = tool => {
    return createSimpleToolReducer(tool, getInitialState(tool));
};
