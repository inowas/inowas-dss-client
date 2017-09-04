import { browserHistory } from 'react-router';
import { forEach, replace } from 'lodash';

export const buildUrl = (routes, params, query) => {
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

export const goToUrl = (routes, params, query) => {
    browserHistory.push(
        buildUrl(routes, params, query)
    );
};
