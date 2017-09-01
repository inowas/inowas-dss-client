import Grid from './Grid';
import MfResult from './ModflowModelResult';

/**
 * ModflowModelDifference Base Class
 */
export default class ModflowModelDifference {

    _modelId1;
    _modelId2;
    _area;
    _grid;
    _result;

    constructor(modelId1, modelId2, area, grid, result = null) {
        this._modelId1 = modelId1;
        this._modelId2 = modelId2;
        this._area = area;

        if ( !( grid instanceof Grid ) ) {
            throw new Error( 'Expected second parameter to be a Grid, but got ' + ( typeof grid ) );
        }
        this._grid = grid;
        this._result = result;
    }

    get grid() {
        return this._grid;
    }

    get area() {
        return this._area;
    }

    get modelId1() {
        return this._modelId1;
    }

    get modelId2() {
        return this._modelId2;
    }

    get result() {
        return this._result;
    }

    updateResult(result) {
        this._result = result;
    }

    minValue() {
        if (this._result instanceof MfResult === false) {
            return null;
        }

        return this._result.min();
    }

    maxValue() {
        if (this._result instanceof MfResult === false) {
            return null;
        }

        return this._result.max();
    }

    chartDataByRowNumber(row) {
        if (this._result instanceof MfResult === false) {
            return null;
        }

        const rowData = this._result.rowData(row);

        if (rowData === null) {
            return null;
        }

        const chartData = [];
        chartData.push(this.name);
        rowData.forEach( v => {chartData.push(v);});
        return chartData;
    }

    chartLeftBorderByRowNumber(row) {
        if (this._result instanceof MfResult === false) {
            return null;
        }

        const rowData = this._result.rowData(row);

        if (rowData === null) {
            return null;
        }

        let leftBorder = 0;
        for (let i = 0; i < rowData.length; i++) {
            if (rowData[i] === null) {
                continue;
            }

            leftBorder = i;
            break;
        }


        const nX = this.grid.nX;
        const xMin = this.grid.boundingBox.southWest.lng;
        const xMax = this.grid.boundingBox.northEast.lng;
        const dX = (xMax - xMin) / nX;

        return Math.round((xMin + (leftBorder * dX)) * 1000) / 1000;
    }

    chartRightBorderByRowNumber(row) {
        if (this._result instanceof MfResult === false) {
            return null;
        }

        const rowData = this._result.rowData(row);

        if (rowData === null) {
            return null;
        }

        let rightBorder = 0;
        for (let i = rowData.length - 1; i >= 0; i--) {
            if (rowData[i] === null) {
                continue;
            }

            rightBorder = i;
            break;
        }

        const nX = this.grid.nX;
        const xMin = this.grid.boundingBox.southWest.lng;
        const xMax = this.grid.boundingBox.northEast.lng;
        const dX = (xMax - xMin) / nX;

        return Math.round((xMin + (rightBorder * dX)) * 1000) / 1000;
    }

    columnXAxis() {
        const column = ['x'];
        const nX = this.grid.nX;
        const xMin = this.grid.boundingBox.southWest.lng;
        const xMax = this.grid.boundingBox.northEast.lng;
        const dX = (xMax - xMin) / nX;

        for (let i = 0; i < nX; i++) {
            column.push(Math.round((xMin + (i * dX)) * 1000) / 1000);
        }

        return column;
    }

    coordinateByGridCell(col, row) {
        const nX = this.grid.nX;
        const nY = this.grid.nY;
        const xMin = this.grid.boundingBox.southWest.lng;
        const xMax = this.grid.boundingBox.northEast.lng;
        const yMin = this.grid.boundingBox.southWest.lat;
        const yMax = this.grid.boundingBox.northEast.lat;
        const dX = (xMax - xMin) / nX;
        const dY = (yMax - yMin) / nY;

        const x = Math.round((xMin + ((col + 0.5) * dX)) * 1000) / 1000;
        const y = Math.round((yMin + ((row + 0.5) * dY)) * 1000) / 1000;

        return {x: x, y: y};
    }

    hasResult() {
        return (this._result instanceof MfResult);
    }

    get modelIds() {
        return [this._modelId1, this._modelId2];
    }
}
