import LayerNumber from './LayerNumber';

export default class ModflowLayerValues{

    _modelId = null;
    _layerValues = [];

    constructor(modelId, layerValues){
        this._modelId = modelId;
        this._layerValues = layerValues;
    };

    modelId() {
        return this._modelId;
    }

    layerValues() {
        return this._layerValues;
    }

    getLowestHeadLayer() {
        return new LayerNumber(3);
    }
}
