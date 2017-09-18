import Grid from './Grid';
import BoundingBox from './BoundingBox';

import { min, max } from 'lodash';

/**
 * CrossSectionMapDataObject Base Class
 */
export default class ScenarioAnalysisMapData {
    _area;
    _grid;
    _type;
    _boundaries = [];
    _xCrossSection;
    _timeSeriesGridCells = [];
    _heatMapData;
    _globalMin;
    _globalMax;

    constructor({
        area,
        grid,
        type = 'head',
        boundaries = null,
        xCrossSection = null,
        timeSeriesGridCells = null,
        heatMapData = null,
        globalMin = null,
        globalMax = null
    }) {
        this._area = area;

        if (!(grid instanceof Grid)) {
            throw new Error(
                'Expected second parameter to be a Grid, but got ' + typeof grid
            );
        }
        this._grid = grid;

        this._type = type;

        // null is permitted
        if (!(boundaries instanceof Array) && boundaries !== null) {
            throw new Error(
                'Expected third parameter to be an array, but got ' +
                    typeof boundaries
            );
        }
        this._boundaries = boundaries;

        // null is permitted
        if (!(xCrossSection instanceof BoundingBox) && xCrossSection !== null) {
            throw new Error(
                'Expected fourth parameter to be a BoundingBox, but got ' +
                    typeof xCrossSection
            );
        }
        this._xCrossSection = xCrossSection;

        // null is permitted
        if (
            !(timeSeriesGridCells instanceof Array) &&
            timeSeriesGridCells !== null
        ) {
            throw new Error(
                'Expected fifth parameter to be an array, but got ' +
                    typeof timeSeriesGridCells
            );
        }
        this._timeSeriesGridCells = timeSeriesGridCells;

        // null is permitted
        if (!(heatMapData instanceof Array) && heatMapData !== null) {
            throw new Error(
                'Expected sixth parameter to be a string, but got ' +
                    typeof heatMapData
            );
        }

        if (heatMapData) {
            this._heatMapData = heatMapData;
        }

        if (this._type === 'drawdown' && this._heatMapData) {
            this._heatMapData = heatMapData.map( row => {
                return row.map( col => {
                    if (col) {
                        return -col;
                    }

                    return null;
                });
            });
        }

        this._globalMin = globalMin;
        this._globalMax = globalMax;

        if (this._type === 'drawdown' && this._heatMapData) {
            if (!this._globalMin) {
                this._globalMin = min(this._heatMapData.map( row => {
                    return min(row);
                }));
            }

            if (!this._globalMax) {
                this._globalMax = max(this._heatMapData.map( row => {
                    return max(row);
                }));
            }

            if (- this._globalMin > this._globalMax) {
                this._globalMax = - this._globalMin;
            }

            if (- this._globalMax < this._globalMin) {
                this._globalMin = - this._globalMax;
            }
        }
    }

    get area() {
        return this._area;
    }

    get grid() {
        return this._grid;
    }

    get boundingBox() {
        return this._grid.boundingBox;
    }

    get boundaries() {
        return this._boundaries;
    }

    get xCrossSection() {
        return this._xCrossSection;
    }

    get timeSeriesGridCells() {
        return this._timeSeriesGridCells;
    }

    get heatMapData() {
        return this._heatMapData;
    }

    get globalMin() {
        return this._globalMin;
    }

    get globalMax() {
        return this._globalMax;
    }
}
