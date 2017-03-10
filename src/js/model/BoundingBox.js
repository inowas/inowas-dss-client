import Coordinate from './Coordinate';

export default class BoundingBox {
    _southWest;
    _northEast;

    constructor( southWest, northEast ) {
        if ( !( southWest instanceof Coordinate ) ) {
            throw new Error( 'Expected first parameter to be a Coordinate, but got ' + ( typeof southWest ) );
        }

        if ( !( northEast instanceof Coordinate ) ) {
            throw new Error( 'Expected second parameter to be a Coordinate, but got ' + ( typeof northEast ) );
        }

        this._northEast = northEast;
        this._southWest = southWest;
    }

    set southWest( southWest ) {
        if ( !( southWest instanceof Coordinate ) ) {
            throw new Error( 'Expected first parameter to be a Coordinate, but got ' + ( typeof southWest ) );
        }

        this._southWest = southWest;
    }

    get southWest() {
        return this._southWest;
    }

    set northEast( northEast ) {
        if ( !( northEast instanceof Coordinate ) ) {
            throw new Error( 'Expected first parameter to be a Coordinate, but got ' + ( typeof northEast ) );
        }

        this._northEast = northEast;
    }

    get northEast() {
        return this._northEast;
    }

    // this will be a format leaflet understands
    toArray() {
        return [
            this._southWest.toLatLng(),
            this._northEast.toLatLng()
        ];
    }
}
