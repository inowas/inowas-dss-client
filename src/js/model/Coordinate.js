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

    set lat(lat) {
        if(typeof lat !== 'number') {
            throw new Error('Expected first parameter to be a number, but got ' + (typeof lat));
        }

        this._lat = lat;
    }

    get lat() {
        return this._lat;
    }

    set lng(lng) {
        if(typeof lng !== 'number') {
            throw new Error('Expected first parameter to be a number, but got ' + (typeof lng));
        }

        this._lng = lng;
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

}
