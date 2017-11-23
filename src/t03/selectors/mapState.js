import { createSelector } from 'reselect';
import { WebData } from '../../core';
import { Command } from '../../t03/actions';
import * as Selector from '../../t03/selectors';

const getBoundaries = (state, props) => {
    const boundaries = state[props.tool ? props.tool : props.route.tool].model.boundaries || [];
    if (props.params.type) {
        return boundaries.filter(b => ( b.type === props.params.type ));
    }

    return boundaries;
};

const getArea = (state, props) => state[props.tool].model.geometry;
const getModel = (state, props) => state[props.tool].model;
const getPermissions = (state, props) => state[props.tool].model.permissions;
const getStyles = (state, props) => state[props.tool].model.styles;

export const makeGetArea = () => {
    return createSelector(
        [getArea],
        (geometry) => geometry
    );
};

export const makeGetModel = () => {
    return createSelector(
        [getModel],
        (model) => model
    );
};

export const makeGetBoundaries = () => {
    return createSelector(
        [getBoundaries],
        (boundaries) => boundaries
    );
};

export const makeGetPermissions = () => {
    return createSelector(
        [getPermissions],
        (permissions) => permissions
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
        [WebData.Selector.getRequestStatus],
        (status) => status
    );
};

export const makeGetWebDataStatusObject = (type) => {
    return createSelector(
        [state => WebData.Selector.getStatusObject(state, type)],
        (status) => status
    );
};

export const makeGetSoilmodelLayersForInput = () => {
    return createSelector(
        [(state, props) => Selector.soilModel.getLayersForInput(state[props.tool].model)],
        (layers) => layers
    );
};

export const makeMapStateToPropsBoundaries = () => {
    const area = makeGetArea();
    const model = makeGetModel();
    const boundaries = makeGetBoundaries();
    const permissions = makeGetPermissions();
    const styles = makeGetStyles();
    const updateBoundaryStatus = makeGetWebDataStatusObject(Command.UPDATE_BOUNDARY);
    const soilmodelLayers = makeGetSoilmodelLayersForInput();

    return (state, props) => {
        return {
            model: model(state, props),
            area: area(state, props),
            boundaries: boundaries(state, props),
            permissions: permissions(state, props),
            mapStyles: styles(state, props),
            updateBoundaryStatus: updateBoundaryStatus(state, props),
            soilmodelLayers: soilmodelLayers(state, props)
        };
    };
};
