import * as calc from '../calculations/T16A';
import applyParameterUpdate from './applyParameterUpdate';

function getInitialState() {
    return {
        background: {
            'image': '/images/tools/T16A.png'
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
            K: 0,
            total: 0,
            start: "2017-01-20T01:10",
            d10: 0
        },
        hydroData: [{
            datetime: "2000-12-20T01:10",
            time: "00:00:30",
            reading: 2,
            temp: 1
        },{
            datetime: "2000-12-20T01:10",
            time: "00:01:00",
            reading: 2,
            temp: 1
        },{
            datetime: "2000-12-20T01:10",
            time: "00:02:00",
            reading: 2,
            temp: 1
        },{
            datetime: "2000-12-20T01:10",
            time: "00:05:00",
            reading: 2,
            temp: 1
        },{
            datetime: "2000-12-20T01:10",
            time: "00:15:00",
            reading: 2,
            temp: 1
        },{
            datetime: "2000-12-20T01:10",
            time: "00:45:00",
            reading: 2,
            temp: 1
        },{
            datetime: "2000-12-20T01:10",
            time: "02:00:00",
            reading: 2,
            temp: 1
        },{
            datetime: "2000-12-20T01:10",
            time: "06:00:00",
            reading: 2,
            temp: 1
        },{
            datetime: "2000-12-20T01:10",
            time: "00:00:00",
            reading: 2,
            temp: 1
        }],
        sieves: [{
            id: '35.5',
            name: '35.5mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 0,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '16',
            name: '16mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 452.2,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '8',
            name: '4mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 441.6,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '4',
            name: '4mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 361.8,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '2',
            name: '2mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 228.6,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '1',
            name: '1mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 202.2,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '0.5',
            name: '0.5mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 228.9,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '0.25',
            name: '0.25mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 218.1,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '0.125',
            name: '0.125mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 324.5,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: 'lt0.125',
            name: '<0.125mm',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 86.2,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        }],
        parameters: [{
            order: 0,
            id: 'CH',
            name: 'Hazen coefficient, CH',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 500,
            stepSize: 10,
            decimals: 0
        }, {
            order: 1,
            id: 'd10',
            name: 'Particle dia @ 10% of accum. mass, d10 (-)',
            min: 0.1,
            validMin: function(x) {return x > 0},
            max: 1,
            value: 0.1,
            stepSize: 0.01,
            decimals: 2
        }, {
            order: 2,
            id: 'T',
            name: 'Water temperature, T (C)',
            min: 10,
            validMin: function(x) {return x > 0},
            max: 40,
            value: 20,
            stepSize: 0.1,
            decimals: 1,
            inputType: 'NUMBER'
        }]
    }
}
const T16AReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T16A':
            {
                state = getInitialState();
                calculateAndModifyState(state);
                break;
            }
        case 'CALCULATE_TOOL_T16A':
            {
                state = { ...state
                };
                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T16A_PARAMETER':
            {
                state = { ...state,
                };

                const newParam = action.payload;
                var param = state.parameters.find(p => {return p.id === newParam.id});
                applyParameterUpdate(param, newParam);

                calculateAndModifyState(state);
                break;
            }
        case 'CHANGE_TOOL_T16A_Sieve':
        {
            state = { ...state,
            };

            const newParam = action.payload;
            var param = state.sieves.find(p => {return p.id === newParam.id});
            applyParameterUpdate(param, newParam);

            calculateAndModifyState(state);
            break;
        }
    }
    return state;
};

function calculateAndModifyState(state) {
    const CH = state.parameters.find(p => {
            return p.id == 'CH'
        })
        .value;
    const d10 = state.parameters.find(p => {
            return p.id == 'd10'
        })
        .value;
    const T = state.parameters.find(p => {
            return p.id == 'T'
        })
        .value;
    //calculation of total dry mass
    state.info.total = 0;
    state.sieves.map(param => {
        state.info.total = state.info.total + param.value
    });
    //calculation of graph data
    state.chart.data = calc.calculateDiagramData(state.sieves, state.info.total);
    //calculation of d10
    state.info.d10 =  calc.calculated10(state.chart.data);
    state.info.K = calc.calculatek(CH, T, state.info.d10);
    return state;
}
export default T16AReducer;
