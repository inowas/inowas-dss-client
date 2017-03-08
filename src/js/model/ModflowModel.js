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

    containsBoundary(boundary) {
        return this.boundaries.find( b => b.id == boundary.id ) instanceof MfBoundary;
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

        console.log(this.result);

        return this.result.min();
    }

    maxValue() {
        if (this.result instanceof MfResult === false) {
            return null;
        }

        return this.result.max();
    }
}
