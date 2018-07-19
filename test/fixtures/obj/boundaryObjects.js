import * as uuid from 'uuid';

export const chdBoundary = () => {
    return {
        id: uuid.v4(),
        name: 'ANewRandomChdBoundary' + Math.random(),
        geometry: {type: 'LineString', coordinates: [[0, 0], [0, 10], [10, 10], [10, 0]]},
        type: 'chd',
        metadata: {},
        observation_points: [
            {
                id: 'op1',
                name: 'OP1',
                geometry: {type: 'Point', coordinates: [0, 0]},
                date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [9, 9]}],
            },
            {
                id: 'op2',
                name: 'OP2',
                geometry: {type: 'Point', coordinates: [10, 10]},
                date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [9, 9]}],
            }
        ],
        active_cells: [[5, 6], [5, 7], [5, 8]]
    };
};

export const ghbBoundary = () => {
    return {
        id: uuid.v4(),
        name: 'ANewRandomGhbBoundary' + Math.random(),
        geometry: {type: 'LineString', coordinates: [[0, 0], [0, 10], [10, 10], [10, 0]]},
        type: 'ghb',
        metadata: {},
        observation_points: [
            {
                id: 'op1',
                name: 'OP1',
                geometry: {type: 'Point', coordinates: [0, 0]},
                date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [9, 1000]}],
            },
            {
                id: 'op2',
                name: 'OP2',
                geometry: {type: 'Point', coordinates: [10, 10]},
                date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [9, 1000]}],
            }
        ],
        active_cells: [[5, 6], [5, 7], [5, 8]]
    };
};

export const rchBoundary = () => {
    return {
        id: uuid.v4(),
        name: 'ANewRandomRchBoundary' + Math.random(),
        geometry: {type: 'Polygon', coordinates: [[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]},
        type: 'rch',
        metadata: {},
        date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [0]}],
        active_cells: [[5, 6], [5, 7], [5, 8]]
    };
};

export const rivBoundary = () => {
    return {
        id: uuid.v4(),
        name: 'ANewRandomRivBoundary' + Math.random(),
        geometry: {type: 'LineString', coordinates: [[0, 0], [0, 10], [10, 10], [10, 0]]},
        type: 'riv',
        metadata: {},
        observation_points: [
            {
                id: 'op1',
                name: 'OP1',
                geometry: {type: 'Point', coordinates: [0, 0]},
                date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [9, 1000, 8]}],
            },
            {
                id: 'op2',
                name: 'OP2',
                geometry: {type: 'Point', coordinates: [10, 0]},
                date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [9, 1000, 8]}],
            }
        ],
        active_cells: [[5, 6], [5, 7], [5, 8]]
    };
};

export const wellBoundary = () => {
    return {
        id: uuid.v4(),
        name: 'ANewRandomWell' + Math.random(),
        geometry: {type: 'Point', coordinates: [[3, 4]]},
        type: 'wel',
        affected_layers: [0],
        metadata: {wellType: 'puw'},
        date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [0]}],
        active_cells: [[4, 5]]
    };
};

export const headObservation = () => {
    return {
        id: uuid.v4(),
        name: 'ANewRandomHeadObservation' + Math.random(),
        geometry: {type: 'Point', coordinates: [[3, 4]]},
        type: 'hob',
        affected_layers: [0],
        metadata: {},
        date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [0]}],
        active_cells: [[4, 5]]
    };
};
