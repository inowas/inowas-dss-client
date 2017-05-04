import BoundingBox from './BoundingBox';
import Coordinate from './Coordinate';

export default class TimeSeriesGridCell {
    _boundingBox;
    _coordinate;
    _backgroundColor;
    _markerColor;
    _opacity;

    constructor({boundingBox, coordinate, backgroundColor = '#ED8D05', markerColor = '#1EB1ED', opacity = 1}) {
        if ( !( boundingBox instanceof BoundingBox ) ) {
            throw new Error( 'Expected first parameter to be a BoundingBox, but got ' + ( typeof boundingBox ) );
        }
        this._boundingBox = boundingBox;

        if ( !( coordinate instanceof Coordinate ) ) {
            throw new Error( 'Expected second parameter to be a Coordinate, but got ' + ( typeof coordinate ) );
        }
        this._coordinate = coordinate;

        if(typeof backgroundColor !== 'string') {
            throw new Error('Expected third parameter to be a string, but got ' + (typeof backgroundColor));
        }
        this._backgroundColor = backgroundColor;

        if(typeof markerColor !== 'string') {
            throw new Error('Expected fourth parameter to be a string, but got ' + (typeof markerColor));
        }
        this._markerColor = markerColor;

        if(typeof opacity !== 'number' || opacity < 0 || opacity > 1) {
            throw new Error('Expected fifth parameter to be a number between 0 and 1, but got ' + opacity + ' which is a ' + (typeof opacity));
        }
        this._opacity = opacity;
    }

    get boundingBox() {
        return this._boundingBox;
    }

    get coordinate() {
        return this._coordinate;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    get markerColor() {
        return this._markerColor;
    }

    get opacity() {
        return this._opacity;
    }
}
