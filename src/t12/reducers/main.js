import {createSimpleToolReducer} from '../../core/helpers/createSimpleToolReducer';

export const getInitialState = (tool) => {
    return {
        name: 'New simple tool',
        description: 'Simple tool description',
        permissions: 'rwx',
        public: false,
        tool: tool,
        info: {
            MFI: 0,
            a: 0,
            MFIcor2: 0,
            vc: 0
        },
        mfi: [{
            id: '1',
            t: 10,
            V: 0.25,
            stepSize: 0.1,
            checked: 'true',
            decimals: 2
        }, {
            id: '2',
            t: 23,
            V: 0.5,
            stepSize: 0.1,
            checked: 'true',
            decimals: 2
        }, {
            id: '3',
            t: 35,
            V: 0.75,
            stepSize: 0.1,
            checked: 'true',
            decimals: 2
        }, {
            id: '4',
            t: 48,
            V: 1.0,
            stepSize: 0.1,
            checked: 'true',
            decimals: 2
        }, {
            id: '5',
            t: 0,
            V: 0,
            stepSize: 0.1,
            checked: 'false',
            decimals: 2
        }],
        corrections: [{
            def: 'Volume',
            name: 'V',
            value: 1000,
            stepSize: 0.1,
            unit: 'ml'
        }, {
            def: 'Pressure',
            name: 'P',
            value: 210,
            stepSize: 1,
            unit: 'KPa'
        }, {
            def: 'Filter area',
            name: 'Af',
            stepSize: 0.0001,
            value: 0.00138,
            unit: 'mm2'
        }, {
            def: 'Temperature',
            name: 'T',
            value: 12,
            stepSize: 0.1,
            unit: '°C'
        }, {
            def: 'Filter pore diameter',
            name: 'D',
            value: 0.45,
            stepSize: 0.1,
            unit: 'micrometer'
        }],
        parameters: [{
            order: 0,
            id: 'ueq',
            name: 'Infiltration duration, u<sub>eq</sub>  [h]',
            min: 1,
            validMin: x => x > 0,
            max: 10000,
            value: 5000,
            stepSize: 1,
            decimals: 0
        }, {
            order: 1,
            id: 'IR',
            name: 'Infiltration rate, V<sub>b</sub> [m<sup>3</sup>/d]',
            min: 1,
            validMin: x => x > 0,
            max: 1000,
            value: 100,
            stepSize: 10,
            decimals: 0
        }, {
            order: 2,
            id: 'K',
            name: 'Hydr. conductivity, K [m/d]',
            min: 1,
            validMin: x => x > 0,
            max: 100,
            value: 20,
            stepSize: 1,
            decimals: 0
        }]
    };
};

export const createReducer = tool => {
    return createSimpleToolReducer(tool, getInitialState(tool));
};
