import { browserHistory } from 'react-router';

export const goToBoundaryOverview = (tool, id, property) => {
    const url = `/tools/${tool}/${id}/${property}`;

    browserHistory.push(url);
};

export const goToBoundaryTypeOverview = (tool, id, property, type) => {
    const url = `/tools/${tool}/${id}/${property}/${type}`;

    browserHistory.push(url);
};

// TODO use react-router-redux push ~ this propably should be a thunk-action
export const editBoundary = (tool, id, property, type, boundaryId) => {
    const url = `/tools/${tool}/${id}/${property}/${type}/${boundaryId}`;

    browserHistory.push(url);
};

export const editBoundaryOnMap = (tool, id, property, type, boundaryId) => {
    const url = `/tools/${tool}/${id}/${property}/${type}/${boundaryId}#edit`;

    browserHistory.push(url);
};

// TODO use modern template strings
export const newBoundary = (tool, id, property, type) => {
    const url =
        '/tools/' + tool + '/' + id + '/' + property + '/' + type + '#create';

    browserHistory.push(url);
};

export const editLayer = (tool, id, layerId) => {
    browserHistory.push(editLayerUrl(tool, id, layerId));
};

// TODO use modern template strings
export const editLayerUrl = (tool, id, layerId) => {
    return '/tools/' + tool + '/' + id + '/soilmodel/!/' + layerId;
};
