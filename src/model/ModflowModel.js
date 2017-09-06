import MfBoundary from './ModflowBoundary';
import MfResult from './ModflowModelResult';
import Grid from './Grid';

/**
 * ModflowModel Base Class
 */
export default class ModflowModel {
    modelId = null;
    name = null;
    description = null;
    _grid;
    _area;
    boundaries = [];
    _calculationId = null;
    selected = null;
    isBaseModel;
    result;

    static fromModflowDetails(details) {
        const model = new ModflowModel(details.calculationId, details.isBaseModel);
        model._area = details.area;
        model.name = details.name;
        model.description = details.description;
        model._grid = new Grid(
            details.boundingBox,
            details.gridSize.n_x,
            details.gridSize.n_y
        );
        model.selected = false;
        return model;
    }

    static fromProps(
        modelId,
        isBaseModel,
        area,
        name,
        description,
        boundingBox,
        nx,
        ny,
        calculationId,
        selected,
        permissions
    ) {
        const model = new ModflowModel(modelId, isBaseModel);
        model._area = area;
        model.name = name;
        model.description = description;
        model._grid = new Grid(boundingBox, nx, ny);
        model._calculationId = calculationId;
        model.selected = selected;
        model.permissions = permissions;
        return model;
    }

    get calculationId() {
        return this._calculationId;
    }

    get area() {
        return this._area;
    }

    get grid() {
        return this._grid;
    }

    constructor(modelId, isBaseModel = false) {
        this.modelId = modelId;
        this.isBaseModel = isBaseModel;
    }

    boundaryCount() {
        return this.boundaries.length;
    }

    containsBoundary(boundary) {
        return (
            this.boundaries.find(b => b.id === boundary.id) instanceof
            MfBoundary
        );
    }

    addBoundary(boundary) {
        this.boundaries.push(boundary);
    }

    // doesn't do anything
    updateBoundary(boundary) {
        this.boundaries.map(b => {
            if (b.id === boundary.id) {
                return boundary;
            }
            return null;
        });
    }

    isSelected() {
        return this.selected;
    }

    toggleSelection() {
        this.selected = !this.selected;
    }

    minValue() {
        if (this.result instanceof MfResult === false) {
            return null;
        }

        return this.result.min();
    }

    maxValue() {
        if (this.result instanceof MfResult === false) {
            return null;
        }

        return this.result.max();
    }

    chartDataByRowNumber(row) {
        if (this.result instanceof MfResult === false) {
            return null;
        }

        const rowData = this.result.rowData(row);

        if (!rowData) {
            return null;
        }

        const chartData = [];
        chartData.push(this.name);
        rowData.forEach(v => {
            chartData.push(v);
        });
        return chartData;
    }

    chartLeftBorderByRowNumber(row) {
        if (this.result instanceof MfResult === false) {
            return null;
        }

        const rowData = this.result.rowData(row);

        if (!rowData) {
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

        return Math.round((xMin + leftBorder * dX) * 1000) / 1000;
    }

    chartRightBorderByRowNumber(row) {
        if (this.result instanceof MfResult === false) {
            return null;
        }

        const rowData = this.result.rowData(row);

        if (!rowData) {
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

        return Math.round((xMin + rightBorder * dX) * 1000) / 1000;
    }

    columnXAxis() {
        const column = ['x'];
        const nX = this.grid.nX;
        const xMin = this.grid.boundingBox.southWest.lng;
        const xMax = this.grid.boundingBox.northEast.lng;
        const dX = (xMax - xMin) / nX;

        for (let i = 0; i < nX; i++) {
            column.push(Math.round((xMin + i * dX) * 1000) / 1000);
        }

        return column;
    }

    // should be moved to grid ~ grid.gridCellToBoundingBox could be used
    coordinateByGridCell(col, row) {
        const nX = this.grid.nX;
        const nY = this.grid.nY;
        const xMin = this.grid.boundingBox.southWest.lng;
        const xMax = this.grid.boundingBox.northEast.lng;
        const yMin = this.grid.boundingBox.southWest.lat;
        const yMax = this.grid.boundingBox.northEast.lat;
        const dX = (xMax - xMin) / nX;
        const dY = (yMax - yMin) / nY;

        const x = Math.round((xMin + (col + 0.5) * dX) * 1000) / 1000;
        const y = Math.round((yMin + (row + 0.5) * dY) * 1000) / 1000;

        return { x: x, y: y };
    }

    hasResult() {
        return this.result instanceof MfResult;
    }
}
