import { createSelector } from 'reselect'

export const getRows = ( page, perPage = {} ) => ( data ) => {
    const offset = (page - 1) * perPage;
    return data.slice( offset, page * perPage );
};

export const getSortingColumns = (component = {}) => () => component.state.sortingColumns || {};
