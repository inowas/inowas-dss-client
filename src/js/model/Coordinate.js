export default class Coordinate {
    _lat;
    _lng;

    constructor(lat, lng) {
        if(typeof lat !== 'number') {
            throw new Error('Expected first parameter to be a number, but got ' + (typeof lat));
        }

        if(typeof lng !== 'number') {
            throw new Error('Expected second parameter to be a number, but got ' + (typeof lng));
        }

        this._lat = lat;
        this._lng = lng;
    }

    get lat() {
        return this._lat;
    }

    get lng() {
        return this._lng;
    }

    toArray() {
        return [
            this._lat,
            this._lng
        ];
    }

    toLatLng() {
        return {
            lat: this._lat,
            lng: this._lng
        };
    }

    sameAs(coordinate) {
        if ( !( coordinate instanceof Coordinate ) ) {
            throw new Error( 'Expected first parameter to be a Coordinate, but got ' + ( typeof coordinate ) );
        }
        return (coordinate.lat === this.lat && coordinate.lng === this.lng);
    }

}
