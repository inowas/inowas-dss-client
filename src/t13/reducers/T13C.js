export const getInitialState = (tool) => {
    return {
        name: 'New simple tool',
        description: 'Simple tool description',
        public: false,
        permissions: 'rwx',
        tool: tool,
        parameters: [{
            order: 0,
            id: 'W',
            name: 'Average infiltration rate, W [m/d]',
            min: 0.001,
            max: 0.01,
            value: 0.0011232,
            stepSize: 0.0001,
            decimals: 4
        }, {
            order: 1,
            id: 'K',
            name: 'Hydraulic conductivity, K [m/d]',
            min: 10e-2,
            max: 10e+2,
            value: 30.246,
            stepSize: 10,
            decimals: 2
        }, {
            order: 2,
            id: 'ne',
            name: 'Effective porosity, n [-]',
            min: 0,
            max: 0.5,
            value: 0.35,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 3,
            id: 'L',
            name: 'Aquifer length, L´ [m]',
            min: 0,
            max: 1000,
            value: 500,
            stepSize: 10,
            decimals: 0
        }, {
            order: 4,
            id: 'hL',
            name: 'Downstream fixed head boundary, hL´ [m]',
            min: 0,
            max: 10,
            value: 2,
            stepSize: 0.5,
            decimals: 1
        }, {
            order: 5,
            id: 'h0',
            name: 'Upstream head, h₀ [m]',
            min: 0,
            max: 10,
            value: 5,
            stepSize: 0.1,
            decimals: 1,
        }, {
            order: 6,
            id: 'xi',
            name: 'Initial position, xᵢ [m]',
            min: 0,
            max: 1000,
            value: 310,
            stepSize: 10,
            decimals: 0
        }, {
            order: 7,
            id: 'xe',
            name: 'Arrival location, xₑ [m]',
            min: 1,
            max: 1000,
            value: 600,
            stepSize: 10,
            decimals: 0
        }]
    };
};
