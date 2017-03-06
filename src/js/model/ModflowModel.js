/**
 * ModflowModel Base Class
 */
class ModflowModel {

    modelId = null;
    name = null;
    description = null;
    boundaries = [];
    selected: true;

    constructor(modelId) {
        this.modelId = modelId;
    }
}

class ModflowBasemodel extends ModflowModel{

    isbaseModel = true;

    constructor(modelId) {
        super(modelId);
    }
}

class ModflowScenario extends ModflowModel{

    isbaseModel = false;

    constructor(modelId) {
        super(modelId);
    }
}

export { ModflowBasemodel, ModflowScenario }
