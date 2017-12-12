import React from 'react';
import {closest as leafletClosest} from 'leaflet-geometryutil';
import {Circle, FeatureGroup, Polygon, Polyline, TileLayer} from 'react-leaflet';
import {EditControl} from 'react-leaflet-draw';
import FullscreenControl from 'react-leaflet-fullscreen';
import {uniqueId} from 'lodash';

export const disableMap = (map) => {
    if (map) {
        map.leafletElement._handlers.forEach(function(handler) {
            handler.disable();
        });
    }
};

export const enableMap = (map) => {
    if (map) {
        map.leafletElement._handlers.forEach(function(handler) {
            handler.enable();
        });
    }
};

export const invalidateSize = (map) => {
    if (map) {
        map.leafletElement.invalidateSize();
    }
};

export const closestPointOnGeometry = (map, geometry, point, vertices = true) => {
    return leafletClosest(map, geometry, point, vertices);
};

export const getLatLngFromXY = coordinates => coordinates.map(c => [c[1], c[0]]);

export const getDefaultTileLayer = () => {
    return (
        <TileLayer
            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
        />
    );
};

export const renderCreateControl = (type, onCreated) => {
    const options = {
        area: {
            edit: {
                edit: false,
                remove: false
            },
            draw: {
                polyline: false,
                polygon: true,
                rectangle: false,
                circle: false,
                marker: false,
                delete: false
            }
        },
        chd: {
            edit: {
                edit: true,
                remove: false
            },
            draw: {
                polyline: true,
                polygon: false,
                rectangle: false,
                circle: false,
                marker: false
            }
        },
        ghb: {
            edit: {
                edit: true,
                remove: false
            },
            draw: {
                polyline: true,
                polygon: false,
                rectangle: false,
                circle: false,
                marker: false
            }
        },
        rch: {
            edit: {
                edit: true,
                remove: false
            },
            draw: {
                polyline: false,
                polygon: true,
                rectangle: false,
                circle: false,
                marker: false
            }
        },
        riv: {
            edit: {
                edit: true,
                remove: false
            },
            draw: {
                polyline: true,
                polygon: false,
                rectangle: false,
                circle: false,
                marker: false
            }
        },
        wel: {
            edit: {
                edit: true,
                remove: false
            },
            draw: {
                polyline: false,
                polygon: false,
                rectangle: false,
                circle: false,
                marker: true
            }
        }
    };

    return (
        <FeatureGroup>
            <EditControl
                position="bottomright"
                onCreated={onCreated}
                {...options[type]}
            />
        </FeatureGroup>
    );
};

const getReactLeafletElementFromGeometry = geometry => {
    switch (geometry.type.toLowerCase()) {
        case 'polygon':
            return (
                <Polygon
                    key={uniqueId()}
                    positions={getLatLngFromXY(
                        geometry.coordinates[0]
                    )}
                />
            );
        case 'linestring':
            return (
                <Polyline
                    key={uniqueId()}
                    positions={getLatLngFromXY(
                        geometry.coordinates
                    )}
                />
            );
        case 'point':
            return (
                <Circle
                    key={uniqueId()}
                    center={[
                        geometry.coordinates[1],
                        geometry.coordinates[0]
                    ]}
                    radius={50}
                />
            );
        default:
            return null;
    }
};

export const renderEditControl = (type, geometry, onEdited) => {
    const options = {
        edit: {
            remove: false
        },
        draw: {
            polyline: false,
            polygon: false,
            rectangle: false,
            circle: false,
            marker: false
        }
    };

    return (
        <FeatureGroup>
            <EditControl position="bottomright" onEdited={onEdited} {...options}/>
            {getReactLeafletElementFromGeometry(geometry)}
        </FeatureGroup>
    );
};

export const renderFullScreenControl = (position = 'topright') => {
    return (
        <FullscreenControl position={position} />
    );
};
