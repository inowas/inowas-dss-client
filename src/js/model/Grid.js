export default class Grid {
    _x;
    _y;

    constructor(x, y) {
        if(typeof x !== 'number') {
            throw new Error('Expected first parameter to be a number, but got ' + (typeof x));
        }

        if(typeof y !== 'number') {
            throw new Error('Expected second parameter to be a number, but got ' + (typeof y));
        }

        this._x = x;
        this._y = y;
    }

    set x(x) {
        if(typeof x !== 'number') {
            throw new Error('Expected first parameter to be a number, but got ' + (typeof x));
        }

        this._x = x;
    }

    get x() {
        return this._x;
    }

    set y(y) {
        if(typeof y !== 'number') {
            throw new Error('Expected first parameter to be a number, but got ' + (typeof y));
        }

        this._y = y;
    }

    get y() {
        return this._y;
    }
}
