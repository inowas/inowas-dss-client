import { includes, union, forIn } from 'lodash';
import {Routing} from '../../core';

const routeKeyIds = ['id', 'said'];

const filterParamsForBoundaryOverview = (params) => forIn(
    params,
    (value, key, obj) => obj[key] = includes(union(routeKeyIds, ['property']), key) ? value : null
);

const filterParamsForBoundaryType = (params) => forIn(
    params,
    (value, key, obj) => obj[key] = includes(union(routeKeyIds, ['property', 'type']), key) ? value : null
);

const filterParamsForBoundaryEdit = (params) => forIn(
    params,
    (value, key, obj) => obj[key] = includes(union(routeKeyIds, ['property', 'type', 'pid']), key) ? value : null
);

const filterParamsForModflowModelEdit = (params) => forIn(
    params,
    (value, key, obj) => obj[key] = includes(routeKeyIds, key) ? value : null
);

export const goToBoundaryTypeOverview = (routes, params) => (property, type) => {
    Routing.goToUrl(routes, {...filterParamsForBoundaryType(params), property, type})
};

export const goToBoundaryOverview  = (routes, params) => (property) => {
    Routing.goToUrl(routes, {...filterParamsForBoundaryOverview(params), property})
};

export const editModflowModel = (routes, params) => (id) => {
    Routing.goToUrl(routes, {...filterParamsForModflowModelEdit(params), id})
};

export const editModflowModelUrl = (routes, params) => (id) => {
    return Routing.buildUrl(routes, {...filterParamsForModflowModelEdit(params), id});
};

export const editBoundary = (routes, params) => (property, type, pid) => {
    Routing.goToUrl(routes, {...filterParamsForBoundaryEdit(params), property, type, pid})
};

export const editBoundaryOnMap = (routes, params) => (property, type, pid) => {
    Routing.goToUrl(routes, {...filterParamsForBoundaryEdit(params), property, type, pid}, '#edit')
};

export const createBoundary = (routes, params) =>  (property, type) => {
    Routing.goToUrl(routes, {...filterParamsForBoundaryType(params), property, type}, '#create')
};

export const editLayer = (routes, params) => (pid) => {
    Routing.goToUrl(routes, {...filterParamsForBoundaryType(params), property: 'soilmodel', type: '!', pid});
};

export const editLayerUrl  = (routes, params) => (pid) => {
    return Routing.buildUrl(routes, {...filterParamsForBoundaryType(params), property: 'soilmodel', type: '!', pid});
};
