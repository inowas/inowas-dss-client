import TimeSeries from './TimeSeries';
import ResultType from './ResultType';
import LayerNumber from './LayerNumber';

export default class TimeSeriesResult {

    _modelId;
    _resultType;
    _layerNumber;
    _timeSeries;

    constructor(modelId, resultType, layerNumber) {
        this._modelId = modelId;

        if ( !( resultType instanceof ResultType ) ) {
            throw new Error( 'Expected first parameter to be a ResultType, but got ' + ( typeof resultType ) );
        }
        this._resultType = resultType;

        if ( !( layerNumber instanceof LayerNumber ) ) {
            throw new Error( 'Expected first parameter to be a LayerNUmber, but got ' + ( typeof layerNumber ) );
        }
        this._layerNumber = layerNumber;
    }

    get modelId() {
        return this._modelId;
    }

    get resultType() {
        return this._resultType;
    }

    get layerNumber() {
        return this._layerNumber;
    }

    set timeSeries(timeSeries) {
        if ( !( timeSeries instanceof TimeSeries ) ) {
            throw new Error( 'Expected first parameter to be a TimeSeries, but got ' + ( typeof timeSeries ) );
        }

        this._timeSeries = timeSeries;
    }

    get timeSeries() {
        return this._timeSeries;
    }
}
