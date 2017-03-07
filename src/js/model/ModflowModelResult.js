/**
 * ModflowModelResult
 */
export default class ModflowModelResult {

    _modelId;
    _layerNumber;
    _resultType;
    _totalTime;
    _data;
    _imgUrl;

    constructor(modelId, layerNumber, resultType, totalTime, data, imgUrl) {
        this._modelId = modelId;
        this._layerNumber = layerNumber;
        this._resultType = resultType;
        this._totalTime = totalTime;
        this._data = data;
        this._imgUrl = imgUrl;
    }

    modelId(){
        return this._modelId;
    }

    layerNumber(){
        return this._layerNumber;
    }

    resultType(){
        return this._resultType;
    }

    totalTime(){
        return this._totalTime;
    }

    data(){
        return this._data;
    }

    imgUrl(min = null, max=null){
        if (min == null || max == null){
            return this._imgUrl;
        }

        return this._imgUrl+'?min='+ min + '&max=' + max;
    }
}
