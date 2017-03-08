import LayerNumber from './LayerNumber';

export default class ModflowLayerValues {

    _modelId = null;
    _layerValues = [];
    _layerCount;

    constructor(modelId, layerValues) {
        this._modelId = modelId;
        this._layerValues = layerValues;
        this._layerCount = layerValues.length;
    }

    modelId() {
        return this._modelId;
    }

    layerValues() {
        return this._layerValues;
    }

    getLowestLayer() {
        return new LayerNumber(this._layerCount-1);
    }

    getLowestHeadLayer() {
        for (let i=this._layerCount-1; i>=0; i--){
            if (this._layerValues[i].indexOf('head') > -1){
                return new LayerNumber(i);
            }
        }

        return null;
    }

    map = (callback) => {
        return this._layerValues.map(callback);
    };
}
