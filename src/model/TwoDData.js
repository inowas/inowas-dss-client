export default class TwoDData {
    _key;
    _value

    constructor(key, value) {
        if(key === null || key === undefined) {
            throw new Error('First parameter must not be null or undefined');
        }

        this._key = key;
        this._value = value;
    }

    get key() {
        return this._key;
    }

    set value(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

}
