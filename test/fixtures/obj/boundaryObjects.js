import * as uuid from 'uuid';

export const rchBoundary = () => {
    return {
        id: uuid.v4(),
        name: 'ANewRandomRchBoundary' + Math.random(),
        geometry: {type: 'Polygon', coordinates: [[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]},
        type: 'rch',
        metadata: {},
        date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [0]}],
        active_cells: null
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
        active_cells: null
    };
};
