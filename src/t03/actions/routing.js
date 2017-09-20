import { includes, union, forIn } from 'lodash';
import { Routing } from '../../core';

const routeKeyIds = [ 'id', 'said' ];

const filterParamsProperty = (params) => forIn(
    params,
    (value, key, obj) => obj[ key ] = includes( union( routeKeyIds, [ 'property' ] ), key ) ? value : null
);

const filterParamsPropertyType = (params) => forIn(
    params,
    (value, key, obj) => obj[ key ] = includes( union( routeKeyIds, [ 'property', 'type' ] ), key ) ? value : null
);

const filterParamsPropertyTypePid = (params) => forIn(
    params,
    (value, key, obj) => obj[ key ] = includes( union( routeKeyIds, [ 'property', 'type', 'pid' ] ), key ) ? value : null
);

const filterParamsForModflowModelEdit = (params) => forIn(
    params,
    (value, key, obj) => obj[ key ] = includes( routeKeyIds, key ) ? value : null
);

export const goToPropertyType = (routes, params) => (property, type) => {
    Routing.goToUrl( routes, { ...filterParamsPropertyType( params ), property, type } );
};

export const goToProperty = (routes, params) => (property) => {
    Routing.goToUrl( routes, { ...filterParamsProperty( params ), property } );
};

export const editModflowModel = (routes, params) => (id) => {
    Routing.goToUrl( routes, { ...filterParamsForModflowModelEdit( params ), id } );
};

export const editModflowModelUrl = (routes, params) => (id) => {
    return Routing.buildUrl( routes, { ...filterParamsForModflowModelEdit( params ), id } );
};

export const editBoundary = (routes, params) => (property, type, pid) => {
    Routing.goToUrl( routes, { ...filterParamsPropertyTypePid( params ), property, type, pid } );
};

export const editBoundaryUrl = (routes, params) => (property, type, pid) => {
    return Routing.buildUrl( routes, { ...filterParamsPropertyTypePid( params ), property, type, pid } );
};

export const editBoundaryOnMap = (routes, params) => (property, type, pid) => {
    Routing.goToUrl( routes, { ...filterParamsPropertyTypePid( params ), property, type, pid }, '#edit' );
};

export const createBoundary = (routes, params) => (property, type) => {
    Routing.goToUrl( routes, { ...filterParamsPropertyType( params ), property, type }, '#create' );
};

export const createArea = (routes, params) => () => {
    Routing.goToUrl( routes, { said: null, id: null, property: null, type: null, pid: null }, '#create' );
};

export const editLayer = (routes, params) => (pid) => {
    Routing.goToUrl( routes, { ...filterParamsPropertyType( params ), property: 'soilmodel', type: '!', pid } );
};

export const editLayerUrl = (routes, params) => (pid) => {
    return Routing.buildUrl( routes, {
        ...filterParamsPropertyType( params ),
        property: 'soilmodel',
        type: '!',
        pid
    } );
};

export const modelRunType = (routes, params) => (type) => {
    Routing.goToUrl( routes, { ...filterParamsPropertyType( params ), property: 'model-run', type } );
};
