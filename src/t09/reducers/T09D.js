export const getInitialState = (tool) => {
    return {
        name: 'New simple tool',
        description: 'Simple tool description',
        public: false,
        tool: tool,
        settings: {
            AqType: 'unconfined'
        },
        parameters: [{
            order: 0,
            id: 'k',
            name: 'Hydraulic conductivity, K [m/d]',
            min: 1,
            validMin: function(x) {
                return x > 0;
            },
            max: 100,
            value: 50,
            stepSize: 1,
            decimals: 0
        }, {
            order: 1,
            id: 'b',
            name: 'Aquifer thickness below sea level, b [m]',
            min: 10,
            validMin: function(x) {
                return x > 0;
            },
            max: 100,
            value: 20,
            stepSize: 1,
            decimals: 0
        }, {
            order: 2,
            id: 'q',
            name: 'Offshore discharge rate, q [m³/d]',
            min: 0.1,
            validMin: function(x) {
                return x > 0;
            },
            max: 10,
            value: 1,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 3,
            id: 'xw',
            name: 'Distance from well to shoreline, xw [m]',
            min: 1000,
            validMin: function(x) {
                return x > 0;
            },
            max: 5000,
            value: 2000,
            stepSize: 1,
            decimals: 0
        }, {
            order: 4,
            id: 'rhof',
            name: 'Density of freshwater, ρ [g/cm³]',
            min: 0.9,
            validMin: function(x) {
                return x >= 0.9;
            },
            max: 1.03,
            validMax: function(x) {
                return x <= 1.05;
            },
            value: 1,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 5,
            id: 'rhos',
            name: 'Density of saltwater, ρₛ [g/cm³]',
            min: 0.9,
            validMin: function(x) {
                return x >= 0.9;
            },
            max: 1.03,
            validMax: function(x) {
                return x <= 1.05;
            },
            value: 1.025,
            stepSize: 0.001,
            decimals: 3
        }]
    };
};
