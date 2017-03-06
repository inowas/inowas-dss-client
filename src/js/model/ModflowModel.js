/**
 * ModflowModel Base Class
 */
export default class ModflowModel {

    constructor(modelId, isBaseModel = false) {
        this.modelId = modelId;
        this.isBaseModel = isBaseModel;
    }

    modelId = null;
    name = null;
    description = null;
    boundaries = [];
    selected: true;
    isBaseModel;
}
