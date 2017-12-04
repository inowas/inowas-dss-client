import applyParameterUpdate from '../core/simpleTools/parameterUpdate';
import image from '../images/tools/T09A.png';

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
            z: 0,
            h: 0
        },
        parameters: [{
            order: 0,
            id: 'h',
            name: 'Thickness of freshwater above sea level, h [m]',
            min: 0,
            max: 10,
            value: 1,
            stepSize: 0.1,
            decimals: 1
        }, {
            order: 1,
            id: 'df',
            name: 'Density of freshwater [g/cm³]',
            min: 0.9,
            validMin: function (x) {
                return x >= 0.9
            },
            max: 1.03,
            validMax: function (x) {
                return x <= 1.05
            },
            value: 1.000,
            stepSize: 0.001,
            decimals: 3
        }, {
            order: 2,
            id: 'ds',
            name: 'Density of saltwater [g/cm³]',
            min: 0.9,
            validMin: function (x) {
                return x >= 0.9
            },
            max: 1.03,
            validMax: function (x) {
                return x <= 1.05
            },
            value: 1.025,
            stepSize: 0.001,
            decimals: 3
        }]
    };
}
const T09AReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'RESET_TOOL_T09A':
        {
            state = { ...state
            };
            state = getInitialState();
            calculateAndModifyState(state);
            break;
        }
        case 'CALCULATE_TOOL_T09A':
        {
            state = { ...state
            };
            calculateAndModifyState(state);
            break;
        }
        case 'CHANGE_TOOL_T09A_PARAMETER':
        {
            state = { ...state,
            };
            const newParam = action.payload;
            var param = state.parameters.find(p => {
                return p.id === newParam.id
            });
            applyParameterUpdate(param, newParam);
            // check df <= ds
            let df = state.parameters.find(p => {return p.id == 'df'}),
                ds = state.parameters.find(p => {return p.id == 'ds'})

            if (df.value > ds.value) {
                df.value = ds.value;
            }
            state = calculateAndModifyState(state);
            break;
        }
    }
    return state;
};

function calculateAndModifyState(state) {
    const h = state.parameters.find(p => {
        return p.id == 'h'
    }).value;
    const df = state.parameters.find(p => {
        return p.id == 'df'
    }).value;
    const ds = state.parameters.find(p => {
        return p.id == 'ds'
    }).value;
    let z = (df * h) / (ds - df); //eq 1
    state.chart.data = [{
        name: '',
        h,
        z
    }];
    state.info = {
        h,
        z
    }
    return state;
}

export default T09AReducer;