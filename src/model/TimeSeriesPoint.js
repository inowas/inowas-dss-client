import Coordinate from './Coordinate';
import TimeSeriesResult from './TimeSeriesResult';
import {unionWith} from 'lodash';

export default class TimeSeriesPoint {

    _name;
    _coordinate;
    _selected;
    _timeSeriesResults = [];

    constructor( name = 'new Point', selected = true) {
        this._name = name;
        this._selected = selected;
    }

    set coordinate(coordinate) {
        if ( !( coordinate instanceof Coordinate ) ) {
            throw new Error( 'Expected first parameter to be a Coordinate, but got ' + ( typeof coordinate ) );
        }

        this._coordinate = coordinate;
    }

    get coordinate() {
        return this._coordinate;
    }

    set name(name) {
        if(typeof name !== 'string') {
            throw new Error('Expected first parameter to be a string, but got ' + (typeof name));
        }

        this._name = name;
    }

    get name() {
        return this._name;
    }

    set selected(selected) {
        if(typeof selected !== 'boolean') {
            throw new Error('Expected first parameter to be a boolean, but got ' + (typeof selected));
        }

        this._selected = selected;
    }

    get selected() {
        return this._selected;
    }

    addResult(newTimeSeriesResult) {
        if ( !( newTimeSeriesResult instanceof TimeSeriesResult ) ) {
            throw new Error( 'Expected first parameter to be a TimeSeriesResult, but got ' + ( typeof newTimeSeriesResult ) );
        }
        this._timeSeriesResults = unionWith([newTimeSeriesResult], this.timeSeriesResults, TimeSeriesResult.compare);
    }

    get timeSeriesResults() {
        return this._timeSeriesResults;
    }
}
