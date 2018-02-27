import {createSimpleToolReducer} from '../../core/helpers/createSimpleToolReducer';

export const getInitialState = () => {
    return {
        name: 'New simple tool',
        description: 'Simple tool description',
        permissions: 'rwx',
        public: false,
        settings: {
            variable: 'x'
        },
        parameters: [{
            order: 0,
            id: 'w',
            name: 'Percolation rate, w (m/d)',
            min: 0,
            validMin: function(x) {
                return x >= 0;
            },
            max: 10,
            value: 0.045,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 1,
            id: 'L',
            name: 'Basin length, L (m)',
            min: 0,
            validMin: function(x) {
                return x > 0;
            },
            max: 1000,
            value: 40,
            stepSize: 1,
            decimals: 0
        }, {
            order: 2,
            id: 'W',
            name: 'Basin width, W (m)',
            min: 0,
            validMin: function(x) {
                return x > 0;
            },
            max: 100,
            value: 20,
            stepSize: 1,
            decimals: 0
        }, {
            order: 3,
            id: 'hi',
            name: 'Initial groundwater Level, hi (m)',
            min: 0,
            validMin: function(x) {
                return x >= 0;
            },
            max: 100,
            value: 35,
            stepSize: 1,
            decimals: 0
        }, {
            order: 4,
            id: 'Sy',
            name: 'Specific yield, Sy (-)',
            min: 0.000,
            validMin: function(x) {
                return x > 0;
            },
            max: 0.5,
            validMax: function(x) {
                return x <= 0.5;
            },
            value: 0.085,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 5,
            id: 'K',
            name: 'Hydraulic conductivity, K (m/d)',
            min: 0.1,
            validMin: function(x) {
                return x > 0;
            },
            max: 10,
            validMax: function(x) {
                return x <= 100000;
            },
            value: 1.83,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 6,
            id: 't',
            name: 'Infiltration time, t (d)',
            min: 0,
            validMin: function(x) {
                return x > 0;
            },
            max: 100,
            value: 1.5,
            stepSize: 1,
            decimals: 0
        }]
    };
};

const createReducer = tool => {
    return createSimpleToolReducer(tool, getInitialState);
};

export default createReducer;
