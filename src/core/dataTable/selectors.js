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

const getBoundaries = (state, props) => props.params.type
    ? state[props.tool].model.boundaries.filter(b => ( b.type === props.params.type ))
    : state[props.tool].model.boundaries;

export const makeGetBoundaries = () => {
    return createSelector(
        [getBoundaries],
        (boundaries) => boundaries
    );
};

export const makeMapStateToPropsBoundaries = () => {

    const boundaries = makeGetBoundaries();
    return (state, props) => {
        return {
            boundaries: boundaries(state, props)
        }
    };
};
