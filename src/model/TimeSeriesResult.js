import TimeSeries from './TimeSeries';
import ResultType from './ResultType';
import LayerNumber from './LayerNumber';

export default class TimeSeriesResult {

    _calculationId;
    _resultType;
    _layerNumber;
    _timeSeries;

    constructor(calculationId, resultType, layerNumber) {
        this._calculationId = calculationId;

        if ( !( resultType instanceof ResultType ) ) {
            throw new Error( 'Expected first parameter to be a ResultType, but got ' + ( typeof resultType ) );
        }
        this._resultType = resultType;

        if ( !( layerNumber instanceof LayerNumber ) ) {
            throw new Error( 'Expected first parameter to be a LayerNUmber, but got ' + ( typeof layerNumber ) );
        }
        this._layerNumber = layerNumber;
    }

    get calculationId() {
        return this._calculationId;
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

    sameAs(otherTimeSeriesResult) {
        if ( !( otherTimeSeriesResult instanceof TimeSeriesResult ) ) {
            throw new Error( 'Expected first parameter to be a TimeSeriesResult, but got ' + ( typeof otherTimeSeriesResult ) );
        }

        return (this.calculationId === otherTimeSeriesResult.calculationId
            && this.resultType.sameAs(otherTimeSeriesResult.resultType)
            && this.layerNumber.sameAs(otherTimeSeriesResult.layerNumber));
    }

    static compare(timeSeriesResult1, timeSeriesResult2) {
        if ( !( timeSeriesResult1 instanceof TimeSeriesResult ) ) {
            throw new Error( 'Expected first parameter to be a TimeSeriesResult, but got ' + ( typeof timeSeriesResult1 ) );
        }

        if ( !( timeSeriesResult2 instanceof TimeSeriesResult ) ) {
            throw new Error( 'Expected second parameter to be a TimeSeriesResult, but got ' + ( typeof timeSeriesResult2 ) );
        }

        return (timeSeriesResult1.calculationId === timeSeriesResult2.calculationId
            && timeSeriesResult1.resultType.sameAs(timeSeriesResult2.resultType)
            && timeSeriesResult1.layerNumber.sameAs(timeSeriesResult2.layerNumber));
    }
}
