export default class TimeSeriesResult {

    _resultType;
    _layerNumber;
    _modelId;
    _timeSeries;

    constructor(modelId, resultType, layerNumber){
    };

    get resultType() {
        return this._resultType;
    }
}
