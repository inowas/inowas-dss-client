import Boundary from '../../model/Boundary';
import BoundaryType from '../../model/BoundaryType';

export const getBoundaryObjects = state => state.map( b => new Boundary( b.id, b.name, new BoundaryType( b.type ), b.geometry, b.affected_layers, b.metadata, b.observationPoints ) );
export const getBoundaries = state => state.map( b => new Boundary( b.id, b.name, new BoundaryType( b.type ), b.geometry, b.affected_layers, b.metadata, b.observationPoints ) );
export const getBoundary = ( state, id ) => {
    const boundary = state.find( b => b.id === id );
    return boundary ? new Boundary( boundary.id, boundary.name, new BoundaryType( boundary.type ), boundary.geometry, boundary.affected_layers, boundary.metadata ? boundary.metadata : null, boundary.observationPoints ) : null;
};

export function getBoundaryDefaultsByType( type, id, name, geometry, startDateTime ) {
    switch (type) {
        case 'chd':
        case 'ghb':
            return {
                id: id,
                name: name,
                geometry: geometry,
                type: type,
                affected_layers: [0],
                metadata: {},
                observation_points: [
                    {
                        id: 'op1',
                        name: 'OP1',
                        geometry: {
                            type: 'Point',
                            coordinates: geometry.coordinates[0]
                        },
                        date_time_values: [
                            {
                                date_time: startDateTime,
                                values: [ 0, 0 ]
                            }
                        ]
                    }
                ]
            };

        case 'riv':
            return {
                id: id,
                name: name,
                geometry: geometry,
                type: type,
                affected_layers: [0],
                metadata: {},
                observation_points: [
                    {
                        id: 'op1',
                        name: 'OP1',
                        geometry: {
                            type: 'Point',
                            coordinates: geometry.coordinates[0]
                        },
                        date_time_values: [
                            {
                                date_time: startDateTime,
                                values: [ 0, 0, 0 ]
                            }
                        ]
                    }
                ]
            };

        case 'rch':
        case 'wel':
            return {
                id: id,
                name: name,
                geometry: geometry,
                type: type,
                affected_layers: [0],
                metadata: {
                    well_type: 'puw'
                },
                date_time_values: [{
                    date_time: startDateTime,
                    values: [0]
                }]
            };
    }

    return null;
}
