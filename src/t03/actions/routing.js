import { browserHistory } from 'react-router';
import { forEach, replace, includes, union, forIn } from 'lodash';

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
    goToUrl(routes, {...filterParamsForBoundaryType(params), property, type})
};

export const goToBoundaryOverview  = (routes, params) => (property) => {
    goToUrl(routes, {...filterParamsForBoundaryOverview(params), property})
};

export const editModflowModel = (routes, params) => (id) => {
    goToUrl(routes, {...filterParamsForModflowModelEdit(params), id})
};

export const editModflowModelUrl = (routes, params) => (id) => {
    return buildUrl(routes, {...filterParamsForModflowModelEdit(params), id});
};

export const editBoundary = (routes, params) => (property, type, pid) => {
    goToUrl(routes, {...filterParamsForBoundaryEdit(params), property, type, pid})
};

export const editBoundaryOnMap = (routes, params) => (property, type, pid) => {
    goToUrl(routes, {...filterParamsForBoundaryEdit(params), property, type, pid}, '#edit')
};

export const createBoundary = (routes, params) =>  (property, type) => {
    goToUrl(routes, {...filterParamsForBoundaryType(params), property, type}, '#create')
};

export const editLayer = (routes, params) => (pid) => {
    goToUrl(routes, {...filterParamsForBoundaryType(params), property: 'soilmodel', type: '!', pid});
};

export const editLayerUrl  = (routes, params) => (pid) => {
    return buildUrl(routes, {...filterParamsForBoundaryType(params), property: 'soilmodel', type: '!', pid});
};

const buildUrl = (routes, params, query) => {
    let url = routes.map(route => route.path).join('/');

    forEach(params, (value, key) => {
        url = replace(url, ':' + key, value ? ('/' + value) : '')}
    );

    url = url.replace(/\(\//g, '').replace(/\)/g, '').replace(/\/\//g, '/');

    if (query) {
        url += query;
    }

    return url;
};

const goToUrl = (routes, params, query) => {
    browserHistory.push(
        buildUrl(routes, params, query)
    );
};
