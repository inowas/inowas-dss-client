import * as calc from '../calculations/T16';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T16.png';

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
        info: {
            K: 0,
            total: 0,
            start: "2017-01-20T01:10",
            d5: 0,
            d10: 0,
            d17: 0,
            d20: 0,
            d30: 0,
            d50: 0,
            d60: 0,
            U: 0
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
        sieves: [],
        parametersWet: [{
            def: 'Density of solid',
            name: 'rhoS',
            value: 2.690,
            stepSize: 0.01,
            unit: 'g/cm3'
        }, {
            def: 'Dry mass of soil fraction',
            name: 'Mh',
            value: 51.670,
            stepSize: 0.1,
            unit: 'g'
        }, {
            def: 'Meniscus factor',
            name: 'Fm',
            stepSize: 0.1,
            value: 0.5,
        }, {
            def: 'Hydrometer bulb height',
            name: 'h',
            value: 16,
            stepSize: 0.1,
            unit: 'cm'
        }, {
            def: 'Distance between the base of the stem and the bottom of scale',
            name: 'h0',
            value: 1.5,
            stepSize: 0.1,
            unit: 'cm'
        }, {
            def: 'Length of the scale',
            name: 'Lh',
            value: 14.5,
            stepSize: 0.1,
            unit: 'cm'
        }, {
            def: 'Content of the hydrometer',
            name: 'VA',
            value: 64.5,
            stepSize: 0.1,
            unit: 'cm'
        }, {
            def: 'Cross sectional area of the cylinder',
            name: 'Az',
            value: 29.2,
            stepSize: 0.1,
            unit: 'cm2'
        }, {
            def: 'Minimum scale',
            name:'Smin',
            value: 0.995,
            stepSize: 0.001,
            unit: 'g/cm3'
        }, {
            def: 'Maximum scale',
            name:'Smax',
            value: 1.030,
            stepSize: 0.001,
            unit: 'g/cm3'
        }],
        DIN: {
            selected: false,
            name: 'DIN',
            sievesize: [{
                name: '63 mm',
                selected: true
            },{
                name: '31.5 mm',
                selected: true
            },{
                name:'16 mm',
                selected: true
            },{
                name:'8 mm',
                selected: true
            },{
                name:'4 mm',
                selected: true
            },{
                name:'2 mm',
                selected: true
            },{
                name:'1 mm',
                selected: true
            },{
                name:'0.5 mm',
                selected: true
            },{
                name:'0.25 mm',
                selected: true
            },{
                name:'0.125 mm',
                selected: true
            },{
                name:'0.063 mm',
                selected: true
            }]
        },

        ASTM: {
            selected: false,
            name: 'ASTM',
            sievesize: [{
                name:'75 mm',
                selected: false
            },{
                name:'50 mm',
                selected: false
            },{
                name:'37.5 mm',
                selected: false
            },{
                name:'25 mm',
                selected: false
            },{
                name:'19 mm',
                selected: false
            },{
                name:'9.5 mm',
                selected: false
            },{
                name:'4.75 mm',
                selected: false
            },{
                name:'2 mm',
                selected: true
            },{
                name:'0.85 mm',
                selected: false
            },{
                name:'0.425 mm',
                selected: false
            },{
                name:'0.250 mm',
                selected: false
            },{
                name:'0.150 mm',
                selected: false
            },{
                name:'0.106 mm',
                selected: false
            },{
                name:'0.075 mm',
                selected: false
            }]
        },
        Custom: {
            selected: false,
            name: 'Custom',
            sievesize: [],
            customSize: {
                value: 0.0
            }
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
                selectedSieves(state);
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

        case 'CHANGE_TOOL_T16A_PARAMETERWET':
        {
            state = { ...state,
            };

            const newParam = action.payload;
            state.parametersWet.find(p => {
                return p.name === newParam.name
            }).value = newParam.value;
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
                state.Custom.selected = false;
            }
            if (newParam[1] === 'ASTM') {
                state.ASTM.selected = true;
                state.DIN.selected = false;
                state.Custom.selected = false;
            }
            if (newParam[1] === 'Custom') {
                state.Custom.selected = true;
                state.DIN.selected = false;
                state.ASTM.selected = false;
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
            if (newSieve.id === 'DIN') {
                state.DIN.sievesize.find(p => {
                return p.name === newSieve.name
                }).selected = newSieve.selected;
            }
            if (newSieve.id === 'ASTM') {
                state.ASTM.sievesize.find(p => {
                    return p.name === newSieve.name
                }).selected = newSieve.selected;
            }
            if (newSieve.id === 'Custom') {
                if(newSieve.value) {
                    state.Custom.customSize.value = newSieve.value
                } else if (newSieve.name) {
                    state.Custom.sievesize.find(p => {
                        return p.name === newSieve.name
                    }).selected = newSieve.selected;
                } else {
                    state.Custom.sievesize.push({
                        name: state.Custom.customSize.value + ' mm',
                        selected: false
                    })
                }
            }
            selectedSieves(state);
            calculateAndModifyState(state);
            break;
        }
    }
    return state;
};

function selectedSieves (state) {
    state.sieves = [];
    state.DIN.sievesize.map(s => {
        const name = s.name.split(' ');
        if (s.selected === true){
            const newSieve = {
                id: name[0],
                name: name[0]+name[1],
                min: 0,
                validMin: function(x) {return x > 0},
                max: 1000,
                value: 0,
                stepSize: 0.1,
                decimals: 3,
                inputType: 'NUMBER'
            };
            state.sieves.push(newSieve);
        }
    });
    state.ASTM.sievesize.map(s => {
        const name = s.name.split(' ');
        if (s.selected === true) {
            const newSieve = {
                id: name[0],
                name: name[0] + name[1],
                min: 0,
                validMin: function (x) {
                    return x > 0
                },
                max: 1000,
                value: 0,
                stepSize: 0.1,
                decimals: 3,
                inputType: 'NUMBER'
            };
            state.sieves.push(newSieve);
        }
    });
    state.Custom.sievesize.map(s => {
        const name = s.name.split(' ');
        if (s.selected === true) {
            const newSieve = {
                id: name[0],
                name: name[0] + name[1],
                min: 0,
                validMin: function (x) {
                    return x > 0
                },
                max: 1000,
                value: 0,
                stepSize: 0.1,
                decimals: 3,
                inputType: 'NUMBER'
            };
            state.sieves.push(newSieve);
        }
    });
    const sortedSieves = state.sieves.sort((a, b) => {
        if (Number(a.id) < Number(b.id)) {
            return 1
        }
        return -1;
    });
    // incase someone selects same sieve in both DIN and ASTM
    const filteredSieves = sortedSieves.filter((a,index) =>{
        let returnvalue = true;
        for (let i = 0; i < index; i++) {
            if (a.id == sortedSieves[i].id) {
                returnvalue = false
            }
        }
        return returnvalue;
    });
    state.sieves = filteredSieves;
    return state
}
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

    //calculation of d
    state.info.d5 =  calc.calculateD(state.chart.data, 5);
    state.info.d10 =  calc.calculateD(state.chart.data, 10);
    state.info.d17 =  calc.calculateD(state.chart.data, 17);
    state.info.d20 =  calc.calculateD(state.chart.data, 20);
    state.info.d30 =  calc.calculateD(state.chart.data, 30);
    state.info.d50 =  calc.calculateD(state.chart.data, 50);
    state.info.d60 =  calc.calculateD(state.chart.data, 60);
    state.info.U =  state.info.d60/state.info.d10;
    state.info.K = calc.calculatek(CH, T, state.info.d10);
    return state;
}
export default T16AReducer;
