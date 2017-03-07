import MfBoundary from './ModflowBoundary';

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
    selected: true;
    isBaseModel;
    layerValues;

    static fromModflowDetails(details){
        let model = new ModflowModel(details.modelId, details.isBaseModel);
        model.name = details.name;
        model.description = details.description;
        model.boundingBox = details.boundingBox;
        model.gridSize = details.gridSize;
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
        })
    }
}
