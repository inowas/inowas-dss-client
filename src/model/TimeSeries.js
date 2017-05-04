export default class TimeSeries {

    _start;
    _data = [];

    constructor( start, data ) {
        if ( !( start instanceof Date ) ) {
            throw new Error( 'Expected first parameter to be a Date-Value, but got ' + ( typeof start ) );
        }

        if ( !( data instanceof Array ) ) {
            throw new Error( 'Expected second parameter to be an array, but got ' + ( typeof data ) );
        }

        this._start = start;
        this._data = data;
    }

    get start() {
        return this._start;
    }

    get data() {
        return this._data;
    }

    get values() {
        return this.data.map(d => {
            return d.value;
        });
    }
}
