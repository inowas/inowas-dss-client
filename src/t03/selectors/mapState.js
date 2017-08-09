import { createSelector } from 'reselect'
import { webData } from '../../core/webData/selectors'
import { boundary } from '../selectors';

const getBoundaries = (state, props) => props.params.type
    ? state[props.tool ? props.tool : props.route.tool].model.boundaries.filter(b => ( b.type === props.params.type ))
    : state[props.tool ? props.tool : props.route.tool].model.boundaries;

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

export const makeGetWebData = () => {
    return createSelector(
        [webData.getRequestStatus],
        (status) => status
    );
};

export const makeMapStateToProps = () => {

    const boundaries = makeGetBoundaries();
    const webData = makeGetWebData();

    return (state, props) => {
        return {
            boundaries: boundary.getBoundaries( boundaries(state, props) ),
            webData: webData(state, props),
        }
    };
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
