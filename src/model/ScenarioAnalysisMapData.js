import Grid from './Grid';
import BoundingBox from './BoundingBox';

/**
 * CrossSectionMapDataObject Base Class
 */
export default class ScenarioAnalysisMapData {
    _area;
    _grid;
    _boundaries = [];
    _xCrossSection;
    _timeSeriesGridCells = [];
    _heatMapData;
    _globalMin;
    _globalMax;

    constructor({
        area,
        grid,
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
        this._heatMapData = heatMapData;

        this._globalMin = globalMin;
        this._globalMax = globalMax;
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
