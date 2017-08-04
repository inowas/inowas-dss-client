import { createSelector } from 'reselect'

export const calcPage = ( selectedPage, perPage, length ) => {
    return Math.min( Math.max( selectedPage, 1 ), calcPages( perPage, length ) );
};

export const calcPages = ( perPage, length ) => {
    return Math.ceil( length / perPage );
};

export const getRows = ( page, perPage = {} ) => ( data ) => {
    const offset = (page - 1) * perPage;
    return data.slice( offset, page * perPage );
};

export const mapBoundaries = ( boundaries ) => {
    return boundaries.map( ( b, index ) => {
        return {
            id: b.id,
            name: b.name,
            well_ype: b.type,
            lat: b.geometry.coordinates[ 1 ],
            lng: b.geometry.coordinates[ 0 ],
            layers: b.affected_layers,
        }
    } )
};

const getBoundaries = (state, props) => state[props.tool].model.boundaries;

export const makeGetBoundaries = () => {
    return createSelector(
        [getBoundaries],
        (boundaries) => {
            return mapBoundaries(boundaries);
        }
    );
};

export const makeMapStateToPropsBoundaries = () => {

    const boundaries = makeGetBoundaries();
    return (state, props) => {
        return {
            rows: boundaries(state, props)
        }
    };
};
