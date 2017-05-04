export default class ModflowModelDetails{

    modelId = null;
    boundaries = [];

    constructor(modelId, boundaries){
        this.modelId = modelId;
        this.boundaries = boundaries;
    };
}
