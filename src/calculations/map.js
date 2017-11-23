import {closest as leafletClosest} from 'leaflet-geometryutil';

export const disableMap = ( map ) => {
    if ( map ) {
        map.leafletElement._handlers.forEach( function( handler ) {
            handler.disable();
        } );
    }
};

export const enableMap = ( map ) => {
    if ( map ) {
        map.leafletElement._handlers.forEach( function( handler ) {
            handler.enable();
        } );
    }
};

export const invalidateSize = ( map ) => {
    if ( map ) {
        map.leafletElement.invalidateSize();
    }
};

export const closestPointOnGeometry = (map, geometry, point, vertices = true) => {
    return leafletClosest(map, geometry, point, vertices);
};

export const getLatLngFromXY = coordinates => coordinates.map(c => [c[1], c[0]]);
