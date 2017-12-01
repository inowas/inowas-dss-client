import {lineString} from '@turf/helpers';
import {booleanCrosses, booleanContains, booleanOverlap, envelope} from '@turf/turf';
import {floor, min, max} from 'lodash';


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

export const calculateActiveCells = (geometry, boundingBox, gridSize) => {
    const activeCells = [];

    if (geometry.geometry.type.toLowerCase() === 'point') {
        const coordinate = geometry.geometry.coordinates;
        activeCells.push(getActiveCellFromCoordinate(coordinate, boundingBox, gridSize));
    }

    if (geometry.geometry.type.toLowerCase() === 'linestring') {
        const gridCells = getGridCells(boundingBox, gridSize);
        gridCells.forEach(cell => {
            if (booleanCrosses(geometry, cell.geometry)) {
                activeCells.push([cell.x, cell.y]);
            }
        });
    }

    if (geometry.geometry.type.toLowerCase() === 'polygon') {
        const gridCells = getGridCells(boundingBox, gridSize);
        gridCells.forEach(cell => {
            if (booleanContains(geometry, cell.geometry) || booleanOverlap(geometry, cell.geometry)) {
                activeCells.push([cell.x, cell.y]);
            }
        });
    }

    return activeCells;
};
