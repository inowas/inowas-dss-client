export default class GridCell {
    _x;
    _y;

    constructor(x, y) {
        if(typeof x !== 'number') {
            throw new Error('Expected second parameter to be a number, but got ' + (typeof x));
        }

        if(typeof y !== 'number') {
            throw new Error('Expected third parameter to be a number, but got ' + (typeof y));
        }

        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}
