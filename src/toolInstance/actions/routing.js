import { includes, forIn } from 'lodash';
import { Routing } from '../../core';

const routeKeyIds = [ 'id' ];

const filterParamsId = (params) => forIn(
    params,
    (value, key, obj) => obj[ key ] = includes( routeKeyIds, key ) ? value : null
);


export const editToolInstance = (routes, params) => (id) => {
    Routing.goToUrl( routes, { ...filterParamsId( params ), id } );
};

export const editToolInstanceUrl = (routes, params) => (id) => {
    return Routing.buildUrl( routes, { ...filterParamsId( params ), id } );
};
