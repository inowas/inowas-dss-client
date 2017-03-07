export default class ModflowModelDetails {

    modelId = null;
    name = null;
    description = null;
    area = null;
    boundingBox = null;
    gridSize = null;
    isBaseModel = null;

    constructor(modelId, name, description, area, boundingBox, gridSize, isBaseModel = false) {
        this.modelId = modelId;
        this.name = name;
        this.description = description;
        this.area = area;
        this.boundingBox = boundingBox;
        this.gridSize = gridSize;
        this.isBaseModel = isBaseModel;
    }
}
