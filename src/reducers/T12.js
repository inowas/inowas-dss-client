import * as calc from '../calculations/T12';
import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T12.png';

function getInitialState() {
    return {
        background: {
            'image': image
        },
        chart: {
            data: [],
            options: {
                yAxis: {
                    domain: ['auto', 'auto']
                }
            }
        },
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
        },{
            id: '4',
            t: 48,
            V: 1.0,
            stepSize: 0.1,
            checked: 'true',
            decimals: 2
        },{
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
            def: 'Temprature',
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
        tempvisctable:{
            temp:[-30,-20,-10,-5,0,5,10,15,20,25,30,35,40],
            visc:[8661.1,4362.7,2645.2,2153.5,1792.3,1518.7,1306.4,1138,1002,890.45,797.68,719.62,653.25]
        },
        parameters: [{
            order: 0,
            id: 'ueq',
            name: "Infiltration duration, uₑq [h]",
            min: 1,
            validMin: function(x) {return x > 0},
            max: 10000,
            value: 5000,
            stepSize: 1,
            decimals: 0
        }, {
            order: 1,
            id: 'IR',
            name: 'Infiltration rate, Vb [m3/d]',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 1000,
            value: 100,
            stepSize: 10,
            decimals: 0
        }, {
            order: 2,
            id: 'K',
            name: 'Hydr. conductivity, K [m/d]',
            min: 1,
            validMin: function(x) {return x > 0},
            max: 100,
            value: 20,
            stepSize: 1,
            decimals: 0
        }]
    }
}
const T12Reducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T12': {
            state = getInitialState();
            calculateAndModifyState(state);
            break;
        }
        case 'CALCULATE_TOOL_T12': {
            state = {
                ...state
            };
            calculateAndModifyState(state);
            break;
        }
        case 'CHANGE_TOOL_T12_PARAMETER': {
            state = {
                ...state,
            };

            const newParam = action.payload;
            var param = state.parameters.find(p => {
                return p.id === newParam.id
            });
            applyParameterUpdate(param, newParam);

            calculateAndModifyState(state);
            break;
        }
        case 'CHANGE_TOOL_T12_MFI': {
            state = {
                ...state,
            };

            const newParam = action.payload;
            console.log(state.mfi)
            var param = state.mfi.find(p => {
                return Number(p.id) === Number(newParam.id)
            });
            if (!newParam.V && newParam.t) param.t = newParam.t;
            if (!newParam.t && newParam.V) param.V = newParam.V;
            addEmptyEntry(state);
            calculateAndModifyState(state);
            break;
        }
        case 'CHANGE_TOOL_T12_USEDATA': {
        state = {
            ...state,
        };

        const newParam = action.payload;
        var param = state.mfi.find(p => {
            return Number(p.id) === Number(newParam.id)
        });
            if (param.checked === 'false') {param.checked = 'true'}
            else {param.checked = 'false'}
        calculateAndModifyState(state);
        break;
    }
        case 'CHANGE_TOOL_T12_CORRECTIONS':
        {
            state = { ...state,
            };

            const newParam = action.payload;
            state.corrections.find(p => {
                return p.name === newParam.name
            }).value = newParam.value;
            calculateAndModifyState(state);
            break;
        }
    }
    return state;
};
function addEmptyEntry(state) {
    const data = state.mfi;
    if (data[data.length-1].t != 0 || data[data.length -1].V != 0) {
        const newEntry = {
            id: data.length+1,
            t: 0,
            V: 0,
            stepSize: 0.1,
            checked: 'false',
            decimals: 2
        };
        state.mfi.push(newEntry);
    }
}
function calculateAndModifyState(state) {
    //calculation of graph data
    const data = calc.calculateData(state.mfi);
    calc.calcMFI(data, state.info);
    //corrections
    const temp = state.corrections.find(p => {
        return p.name == 'T'
    })
        .value;
    const pressure = state.corrections.find(p => {
        return p.name == 'P'
    })
        .value;
    const Af = state.corrections.find(p => {
        return p.name == 'Af'
    })
        .value;
    const D = state.corrections.find(p => {
        return p.name == 'D'
    })
        .value;
    var MFIcor1 = calc.visc_Correc(state.tempvisctable, temp, state.info.MFI);
    MFIcor1 = MFIcor1*(pressure/210)*(Af**2/0.00138**2);

    const K = state.parameters.find(p => {
        return p.id == 'K'
    })
        .value;
    const ueq = state.parameters.find(p => {
        return p.id == 'ueq'
    })
        .value;
    const IR = state.parameters.find(p => {
        return p.id == 'IR'
    })
        .value;
    const D50 = (10**(-3)*(K/150)**0.6);
    const EPS = D50/6;
    state.info.MFIcor2 = MFIcor1*((D*10**(-6))**2/EPS**2);
    state.info.vc = 2*10**(-6)*state.info.MFIcor2*(ueq)*(IR**2/(K/150)**1.2);
    state.chart.data = calc.calculateDiagramData(data,state.info);
    return state;
}
export default T12Reducer;
