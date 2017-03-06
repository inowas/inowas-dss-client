export default class ModflowLayerValues{

    modelId = null;
    layerValues = [];

    constructor(modelId, layerValues){
        this.modelId = modelId;
        this.layerValues = layerValues;
    };
}
