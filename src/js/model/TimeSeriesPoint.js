

export default class TimeSeriesPoint {

    _name;
    _coordinate;
    _selected;
    _timeSeriesResults;

    constructor(coordinate){
        if ( !( coordinate instanceof Coordinate ) ) {
            throw new Error( 'Expected first parameter to be a Coordinate, but got ' + ( typeof coordinate ) );
        }

        this._coordinate = coordinate;
    };

    set name(name) {
        this._name = name;
    }

    addResult(timeSeriesResult){
        if ( !( timeSeries instanceof TimeSeriesResult ) ) {
            throw new Error( 'Expected first parameter to be a TimeSeries, but got ' + ( typeof timeSeries ) );
        }
        this._timeSeries.push(timeSeries)
    }
}
