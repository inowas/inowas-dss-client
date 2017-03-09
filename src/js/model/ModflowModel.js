import MfBoundary from './ModflowBoundary';
import MfResult from './ModflowModelResult';

/**
 * ModflowModel Base Class
 */
export default class ModflowModel {

    modelId = null;
    name = null;
    description = null;
    boundingBox = null;
    gridSize = null;
    area = null;
    boundaries = [];
    selected = null;
    isBaseModel;
    result;

    static fromModflowDetails(details) {
        const model = new ModflowModel(details.modelId, details.isBaseModel);
        model.area = details.area;
        model.name = details.name;
        model.description = details.description;
        model.boundingBox = details.boundingBox;
        model.gridSize = details.gridSize;
        model.selected = false;
        return model;
    }

    constructor(modelId, isBaseModel = false) {
        this.modelId = modelId;
        this.isBaseModel = isBaseModel;
    }

    boundaryCount() {
        return this.boundaries.length;
    }

    containsBoundary(boundary) {
        return this.boundaries.find( b => b.id === boundary.id ) instanceof MfBoundary;
    }

    addBoundary(boundary) {
        this.boundaries.push(boundary);
    }


    updateBoundary(boundary) {
        this.boundaries.map( b => {
            if (b.id === boundary.id) {
                return boundary;
            }
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

        if (rowData === null) {
            return null;
        }

        const chartData = [];
        chartData.push(this.name);
        rowData.forEach( v => {chartData.push(v);});
        return chartData;
    }

    chartLeftBorderByRowNumber(row) {
        if (this.result instanceof MfResult === false) {
            return null;
        }

        const rowData = this.result.rowData(row);

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


        const nX = this.gridSize.n_x;
        const xMin = this.boundingBox.x_min;
        const xMax = this.boundingBox.x_max;
        const dX = (xMax-xMin)/nX;

        return Math.round((xMin+(leftBorder*dX))*1000)/1000;
    }

    chartRightBorderByRowNumber(row) {
        if (this.result instanceof MfResult === false) {
            return null;
        }

        const rowData = this.result.rowData(row);

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

        const nX = this.gridSize.n_x;
        const xMin = this.boundingBox.x_min;
        const xMax = this.boundingBox.x_max;
        const dX = (xMax-xMin)/nX;

        return Math.round((xMin+(rightBorder*dX))*1000)/1000;
    }


    labelYAxis(){
        if (this.hasResult()){
            if (this.result.resultType().toString() == 'head') {
                return 'Groundwater Head [m]'
            }

            if (this.result.resultType().toString() == 'drawdown') {
                return 'Groundwater DrawDown [m]'
            }
        }

        return '';
    }

    labelXAxis(){
        if (this.hasResult()) {
            return ('Longitude');
        }
    }

    columnXAxis(){
        const column = ['x'];
        const nX = this.gridSize.n_x;
        const xMin = this.boundingBox.x_min;
        const xMax = this.boundingBox.x_max;
        const dX = (xMax-xMin)/nX;

        for (let i=0; i<nX; i++){
            column.push(Math.round((xMin+(i*dX))*1000)/1000);
        }

        return column;
    }


    hasResult() {
        return (this.result instanceof MfResult);
    }
}
