export const getInitialState = (tool) => {
    return {
        name: 'New simple tool',
        description: 'Simple tool description',
        public: false,
        tool: tool,
        parameters: [{
            order: 0,
            id: 'k',
            name: 'Hydraulic conductivity, K (m/d)',
            min: 1,
            max: 100,
            value: 50,
            stepSize: 1,
            decimals: 0
        }, {
            order: 1,
            id: 'z',
            name: 'Depth to base of aquifer, z0 (m)',
            min: 0,
            max: 100,
            value: 15,
            stepSize: 1,
            decimals: 0
        }, {
            order: 2,
            id: 'l',
            name: 'Distance to inland boundary, L (m)',
            min: 0,
            max: 100,
            value: 50,
            stepSize: 1,
            decimals: 0
        }, {
            order: 3,
            id: 'w',
            name: 'Recharge rate, w (m³/d)',
            min: 0,
            max: 200,
            value: 50,
            stepSize: 1,
            decimals: 0
        }, {
            order: 4,
            id: 'dz',
            name: 'Sea level rise, dz0 (m)',
            min: 0,
            max: 0.5,
            value: 0.1,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 5,
            id: 'hi',
            name: 'Constant head at inland boundary, hi (m)',
            min: 0,
            max: 100,
            value: 5,
            stepSize: 1,
            decimals: 0
        }, {
            order: 6,
            id: 'df',
            name: 'Density of freshwater [g/cm³]',
            min: 1.000,
            max: 1.005,
            value: 1.000,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 7,
            id: 'ds',
            name: 'Density of saltwater [g/cm³]',
            min: 1.020,
            max: 1.030,
            value: 1.025,
            stepSize: 0.001,
            decimals: 3
        }]
    };
};
