import { createSelector } from 'reselect'
import {getGeometry} from "../../t03/selectors/general";

export const getRows = ( page, perPage = {} ) => ( data ) => {
    const offset = (page - 1) * perPage;
    return data.slice( offset, page * perPage );
};

const getBoundaries = (state, props) => props.params.type
    ? state[props.tool].model.boundaries.filter(b => ( b.type === props.params.type ))
    : state[props.tool].model.boundaries;

const getArea = (state, props) => state[props.tool].model.geometry;
const getStyles = (state, props) => state[props.tool].model.styles;

export const makeGetBoundaries = () => {
    return createSelector(
        [getBoundaries],
        (boundaries) => boundaries
    );
};

export const makeGetArea = () => {
    return createSelector(
        [getArea],
        (geometry) => geometry
    );
};

export const makeGetStyles = () => {
    return createSelector(
        [getStyles],
        (styles) => styles
    );
};

export const makeMapStateToPropsBoundaries = () => {

    const boundaries = makeGetBoundaries();
    const area = makeGetArea();
    const styles = makeGetStyles();
    return (state, props) => {
        return {
            styles: styles(state, props),
            area: area(state, props),
            boundaries: boundaries(state, props)
        }
    };
};
