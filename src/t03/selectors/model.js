import styleGlobals from 'styleGlobals';

export const CALCULATION_STATE_NEW = 0;
export const CALCULATION_STATE_PREPROCESSING = 1;
export const CALCULATION_STATE_QUEUED = 2;
export const CALCULATION_STATE_STARTED = 3;
export const CALCULATION_STATE_FINISHED = 4;

export const getInitialStyles = () => {
    return {
        area: {
            weight: 5,
            opacity: 0.7,
            color: styleGlobals.colors.primary,
            fill: false
        },
        bounding_box: {
            color: '#000',
            weight: 0.5,
            fill: false
        },
        grid: {
            weight: 1,
            opacity: 1,
            color: 'blue',
            fill: false
        },
        chd: {
            weight: 5,
            color: styleGlobals.colors.accent,
            opacity: 1,
            fill: false
        },
        ghb: {
            weight: 5,
            color: styleGlobals.colors.accent,
            opacity: 1,
            fill: false
        },
        rch: {
            weight: 2,
            color: styleGlobals.colors.accent,
            opacity: 0.7,
            fillOpacity: 0.3
        },
        riv: {
            weight: 5,
            color: styleGlobals.colors.accent,
            opacity: 1
        },
        riv_op: {
            radius: 5,
            color: styleGlobals.colors.grayDark,
            weight: 2,
            fillColor: styleGlobals.colors.grayDark,
            fillOpacity: 0.7
        },
        wel: {
            cw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkgreen',
                fillOpacity: 0.7
            },
            puw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkblue',
                fillOpacity: 0.7
            },
            iw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'blue',
                fillOpacity: 0.7
            },
            inw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'blue',
                fillOpacity: 0.7
            },
            irw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkgreen',
                fillOpacity: 0.7
            },
            sniw: {
                radius: 5,
                color: 'red',
                weight: 2,
                fillColor: 'darkgreen',
                fillOpacity: 0.7
            },
            snpw: {
                radius: 5,
                color: 'red',
                weight: 2,
                fillColor: 'darkblue',
                fillOpacity: 0.7
            },
            prw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkblue',
                fillOpacity: 0.7
            },
            rbf: {
                radius: 5,
                color: 'black',
                weight: 1,
                fillColor: 'yellow',
                fillOpacity: 1
            },
            smw: {
                radius: 5,
                color: 'black',
                weight: 1,
                fillColor: 'red',
                fillOpacity: 1
            },
            snw: {
                radius: 5,
                color: 'black',
                weight: 1,
                fillColor: 'yellow',
                fillOpacity: 1
            },
            snifw: {
                radius: 5,
                color: '#63b3ea',
                weight: 2,
                fillColor: '#bbdff6',
                fillOpacity: 0.7
            },
            activeWell: {
                fillColor: 'yellow'
            }
        },
        op: {
            radius: 5,
            color: styleGlobals.colors.grayDark,
            weight: 2,
            fillColor: styleGlobals.colors.grayDark,
            fillOpacity: 1
        },
        op_temp: {
            radius: 5,
            color: styleGlobals.colors.grayDark,
            weight: 1,
            fillColor: styleGlobals.colors.grayDark,
            fillOpacity: 0.5
        },
        op_selected: {
            radius: 5,
            color: styleGlobals.colors.redDark,
            weight: 1,
            fillColor: styleGlobals.colors.redDark,
            fillOpacity: 1
        },
        default: {
            radius: 5,
            weight: 2,
            opacity: 1,
            color: 'blue',
            dashArray: '1',
            fillColor: 'blue',
            fillOpacity: 0.7
        }
    };
};

export const getInitialState = () => {
    return {
        name: 'NewModflowModel',
        description: 'NewModflowModelDescription',
        grid_size: {
            n_x: 50,
            n_y: 60
        },
        styles: getInitialStyles(),
        time_unit: 4,
        length_unit: 2,
        bounding_box: [[-10, 51], [0, 50]],
        geometry: null,
        boundaries: null,
        results: null,
        soilmodel: null,
        permissions: 'rwx',
        calculation: {state: 0, calculation_id: '', message: ''},
        public: true
    };
};

export const getInitialLayerState = () => {
    return {
        botm: 0,
        description: '',
        hani: 1,
        hk: 10,
        layavg: 0,
        laytyp: 0,
        laywet: 0,
        name: 'new layer',
        number: 0,
        ss: 0.00002,
        sy: 0.15,
        top: 1,
        vka: 1
    };
};

export const getPermissions = state => state.model.permissions;

export const getModflowModel = state => state.model;

export const getModflowPackages = state => state.model.packages;
