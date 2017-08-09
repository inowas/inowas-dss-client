
const getInitialStyles = () => {
    return {
        area : {
            weight: 2,
            opacity: 1,
            color: 'grey',
            dashArray: '3',
            fillColor: 'blue',
            fillOpacity: 0.05
        },
        bounding_box : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        grid : {
            weight: 1,
            opacity: 1,
            color: 'blue',
            dashArray: '3',
            fillOpacity: 0
        },
        chd : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        ghb : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        rch : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        riv : {
            weight: 2,
            color: 'green',
            opacity: 1,
            dashArray: '3',
            fillOpacity: 0
        },
        riv_op:  {
            radius: 5,
            color: 'blue',
            weight: 2,
            fillColor: 'darkblue',
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
            iw: {
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
            puw: {
                radius: 3,
                color: 'black',
                weight: 1,
                fillColor: 'darkblue',
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
        default: {
            weight: 2,
            opacity: 1,
            color: 'blue',
            dashArray: '1',
            fillColor: 'blue',
            fillOpacity: 0.7
        }
    }
};

export const getInitialState = () => {
    return {
        name: "NewModflowModel",
        description: "NewModflowModelDescription",
        grid_size: {
            n_x: 50,
            n_y: 60
        },
        styles: getInitialStyles(),
        time_unit: 2,
        length_unit: 2,
        bounding_box: [[0,0], [10,10]],
        geometry: null,
        boundaries: [],
    };
};

export const getModflowModel = state => state.model;
