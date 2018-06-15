class Location {
    _type;
    _ts;
    _lay;
    _row;
    _col;
    _objects;

    static fromObject(obj) {
        const location = new Location();
        location.type = obj.type;
        location.ts = obj.ts;
        location.lay = obj.lay;
        location.row = obj.row;
        location.col = obj.col;
        location.objects = obj.objects;
        return location;
    }

    constructor() {}

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get ts() {
        return this._ts;
    }

    set ts(value) {
        this._ts = value;
    }

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

    get objects() {
        return this._objects;
    }

    set objects(value) {
        this._objects = value;
    }

    get toObject() {
        return ({
            'type': this.type,
            'ts': this.ts,
            'lay': this.lay,
            'row': this.row,
            'col': this.col,
            'objects': this.objects
        });
    }
}

export default Location;
