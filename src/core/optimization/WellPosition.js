class WellPosition {
    _lay = [0, 0];
    _row = [10, 20];
    _col = [10, 20];

    static fromObject(obj) {
        const wellPosition = new WellPosition();
        wellPosition.lay = obj.lay;
        wellPosition.row = obj.row;
        wellPosition.col = obj.col;
        return wellPosition;
    }

    constructor() {}


    get lay() {
        return this._lay;
    }

    set lay(value) {
        this._lay = value;
    }

    get row() {
        return this._row;
    }

    set row(value) {
        this._row = value;
    }

    get col() {
        return this._col;
    }

    set col(value) {
        this._col = value;
    }

    get toObject() {
        return ({
            'lay': this.lay,
            'row': this.row,
            'col': this.col
        });
    }
}

export default WellPosition;
