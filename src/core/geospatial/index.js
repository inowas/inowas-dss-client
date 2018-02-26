import React from 'react';
import {lineString} from '@turf/helpers';
import {booleanCrosses, booleanContains, booleanOverlap, envelope} from '@turf/turf';
import {floor, min, max, uniqueId} from 'lodash';
import {closest as leafletClosest} from 'leaflet-geometryutil';
import {Circle, FeatureGroup, Polygon, Polyline, TileLayer} from 'react-leaflet';
import {EditControl} from 'react-leaflet-draw';
import FullscreenControl from 'react-leaflet-fullscreen';

export const getMinMaxFromBoundingBox = boundingBox => {
    const xMin = min([boundingBox[0][0], boundingBox[1][0]]);
    const xMax = max([boundingBox[0][0], boundingBox[1][0]]);
    const yMin = min([boundingBox[0][1], boundingBox[1][1]]);
    const yMax = max([boundingBox[0][1], boundingBox[1][1]]);

    return {
        xMin, xMax, yMin, yMax
    };
};

/* Calculate GridCells
Structure:
const cells = [
{x:1, y:2, geometry: geometry},
{x:1, y:3, geometry: geometry},
{x:1, y:4, geometry: geometry},
{x:1, y:5, geometry: geometry},
]
*/
const getGridCells = (boundingBox, gridSize) => {
    const {xMin, xMax, yMin, yMax} = getMinMaxFromBoundingBox(boundingBox);
    const nX = gridSize.n_x;
    const nY = gridSize.n_y;
    const dx = (xMax - xMin) / nX;
    const dy = (yMax - yMin) / nY;

    const cells = [];
    for (let y = 0; y < nY; y++) {
        for (let x = 0; x < nX; x++) {
            cells.push({
                x: x,
                y: nY - y - 1,
                geometry: envelope(lineString([
                    [xMin + x * dx, yMax - (nY - y) * dy],
                    [xMin + (x + 1) * dx, yMax - (nY - y - 1) * dy]
                ]))
            });
        }
    }

    return cells;
};

export const getActiveCellFromCoordinate = (coordinate, boundingBox, gridSize) => {
    const {xMin, xMax, yMin, yMax} = getMinMaxFromBoundingBox(boundingBox);
    const nX = gridSize.n_x;
    const nY = gridSize.n_y;
    const dx = (xMax - xMin) / nX;
    const dy = (yMax - yMin) / nY;
    const x = coordinate[0];
    const y = coordinate[1];

    return [
        floor((x - xMin) / dx),
        floor(nY - (y - yMin) / dy),
    ];
};

export const calculateActiveCells = (geom, boundingBox, gridSize) => {
    let geometry;
    if (geom.geometry) {
        geometry = geom.geometry;
    } else {
        geometry = geom;
    }

    const activeCells = [];

    if (geometry.type.toLowerCase() === 'point') {
        const coordinate = geometry.coordinates;
        activeCells.push(getActiveCellFromCoordinate(coordinate, boundingBox, gridSize));
    }

    if (geometry.type.toLowerCase() === 'linestring') {
        const gridCells = getGridCells(boundingBox, gridSize);
        gridCells.forEach(cell => {
            if (booleanCrosses(geometry, cell.geometry)) {
                activeCells.push([cell.x, cell.y]);
            }
        });
    }

    if (geometry.type.toLowerCase() === 'polygon') {
        const gridCells = getGridCells(boundingBox, gridSize);
        gridCells.forEach(cell => {
            if (booleanContains(geometry, cell.geometry) || booleanOverlap(geometry, cell.geometry)) {
                activeCells.push([cell.x, cell.y]);
            }
        });
    }

    return activeCells;
};

export function calcBoundsOfPolygon(polygon) {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    polygon.forEach(c => {
        if (c[1] < minLat) {
            minLat = c[1];
        }

        if (c[1] > maxLat) {
            maxLat = c[1];
        }

        if (c[0] < minLng) {
            minLng = c[0];
        }

        if (c[0] > maxLng) {
            maxLng = c[0];
        }
    });

    return [
        [
            minLng,
            minLat,
        ], [
            maxLng,
            maxLat,
        ]
    ];
}

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
        <FullscreenControl position={position}/>
    );
};
