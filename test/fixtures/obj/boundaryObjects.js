import * as uuid from 'uuid';

export const wellBoundary = () => {
    return {
        id: uuid.v4(),
        name: 'ANewRandomWell' + Math.random(),
        geometry: {type: 'Point', coordinates: [[3, 4]]},
        affected_layers: [0],
        metadata: {wellType: 'puw'},
        date_time_values: [{date_time: new Date('2015-01-02').toISOString(), values: [0]}],
        active_cells: null
    };
};
