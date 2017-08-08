import Boundary from '../../model/Boundary';
import BoundaryType from '../../model/BoundaryType';

export const getBoundaryObjects = state => state.map( b => new Boundary( b.id, b.name, new BoundaryType( b.type ), b.geometry, b.affected_layers, b.metadata, b.observationPoints ) );
export const getBoundaries = state => state.map( b => new Boundary( b.id, b.name, new BoundaryType( b.type ), b.geometry, b.affected_layers, b.metadata, b.observationPoints ) );
export const getBoundary = ( state, id ) => {
    const boundary = state.find( b => b.id === id );
    return boundary ? new Boundary( boundary.id, boundary.name, new BoundaryType( boundary.type ), boundary.geometry, boundary.affected_layers, boundary.metadata ? boundary.metadata : null, boundary.observationPoints ) : null;
};
