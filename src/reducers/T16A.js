import * as calc from '../calculations/T16A';
import applyParameterUpdate from './applyParameterUpdate';

function getInitialState() {
    return {
        background: {
            'image': '/images/tools/T16.png'
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
        dSampSieve: {
            id: 'dSampSieve',
            name: 'Dry Sample',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 10000,
            value: 177.05,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },
        hydroData: [{
            datetime: "2000-12-20T01:10",
            time: "00:00:30",
            reading: 1.0215,
            temp: 20.7
        },{
            datetime: "2000-12-20T01:10",
            time: "00:01:00",
            reading: 1.02,
            temp: 20.7
        },{
            datetime: "2000-12-20T01:10",
            time: "00:02:00",
            reading: 1.016,
            temp: 20.7
        },{
            datetime: "2000-12-20T01:10",
            time: "00:05:00",
            reading: 1.013,
            temp: 20.7
        },{
            datetime: "2000-12-20T01:10",
            time: "00:15:00",
            reading: 1.011,
            temp: 20.7
        },{
            datetime: "2000-12-20T01:10",
            time: "00:45:00",
            reading: 1.0085,
            temp: 20.7
        },{
            datetime: "2000-12-20T01:10",
            time: "02:00:00",
            reading: 1.0065,
            temp: 21
        },{
            datetime: "2000-12-20T01:10",
            time: "06:00:00",
            reading: 1.0045,
            temp: 20.8
        },{
            datetime: "2000-12-20T01:10",
            time: "23:59:59",
            reading: 1.0015,
            temp: 20.6
        }],
        sieves: [{
            id: '35.5',
            name: '35.5mm',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 0,
            stepSize: 0.1,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '16',
            name: '16mm',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 0,
            stepSize: 0.1,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '8',
            name: '8mm',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 0,
            stepSize: 0.1,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '4',
            name: '4mm',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 0.1,
            stepSize: 0.1,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '2',
            name: '2mm',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 2.5,
            stepSize: 0.1,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '1',
            name: '1mm',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 8.0,
            stepSize: 0.1,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '0.5',
            name: '0.5mm',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 19.3,
            stepSize: 0.1,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '0.25',
            name: '0.25mm',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 117.6,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        },{
            id: '0.125',
            name: '0.125mm',
            min: 0,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 14.2,
            stepSize: 10,
            decimals: 1,
            inputType: 'NUMBER'
        }],
        parametersWet: {
            rhoS: 2.690,
            Mh: 51.670,
            Fm: 0.5,
            h: 16,
            h0: 1.5,
            Lh: 14.5,
            VA: 64.5,
            Az: 29.2,
            Smin: 0.995,
            Smax: 1.030
        },
        DIN: {
            selected: false,
            name: 'DIN',
            sievesize: ['63 mm','31.5 mm','16 mm','8 mm','4 mm','2 mm','1 mm','0.5 mm','0.25 mm','0.125 mm',
                '0.063 mm']
        },

        ASTM: {
            selected: false,
            name: 'ASTM',
            sievesize: ['75 mm','50 mm','37.5 mm','25 mm','19 mm','9.5 mm','4.75 mm','2.0 mm',
                '0.85 mm','0.425 mm','0.250 mm','0.150 mm','0.106 mm','0.075 mm']
        },
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
        case 'CHANGE_TOOL_T16A_HYDRODATA':
        {
            state = { ...state,
            };

            const newParam = action.payload;
            state.hydroData.find(p => {
                return p.time === newParam.id
            }).reading = newParam.reading;

            calculateAndModifyState(state);
            break;
        }
        case 'CHANGE_TOOL_T16A_SIEVE':
            {
                const newParam = action.payload;
                if (newParam.id === 'dSampSieve') {
                    state = {
                    ...state,
                    };
                    state.dSampSieve.value = newParam.value;
                } else {
                    state = {
                    ...state,
                    };
                    var param = state.sieves.find(p => {
                        return p.id === newParam.id
                    });
                    applyParameterUpdate(param, newParam);
                }
                calculateAndModifyState(state);
                break;
            }

        case 'CHANGE_TOOL_T16A_STANDARD':
        {
            const newParam = action.payload.name.split('_');

            state = {
                    ...state,
                };
            if (newParam[1] === 'DIN') {
                state.DIN.selected = true;
                state.ASTM.selected = false;
            }
            if (newParam[1] === 'ASTM') {
                state.ASTM.selected = true;
                state.DIN.selected = false;
            }
            calculateAndModifyState(state);
            break;
        }

        case 'CHANGE_TOOL_T16A_NEWSIEVE':
        {
            const newSieve = action.payload;

            state = {
                ...state,
            };
            state.sieves.push(newSieve);
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
        console.log(param.value);
        state.info.total = Number(state.info.total) + Number(param.value)
    });
    //calculation of graph data
    state.chart.data = calc.calculateDiagramData(state.sieves, state.info.total, state.dSampSieve,
        state.hydroData, state.parametersWet);

    //calculation of d10
    state.info.d10 =  calc.calculated10(state.chart.data);
    state.info.K = calc.calculatek(CH, T, state.info.d10);
    return state;
}
export default T16AReducer;
