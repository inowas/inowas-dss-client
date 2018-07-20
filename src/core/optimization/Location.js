class Location {
    _type;
    _ts = {from: 0, to: 0};
    _lay = {from: 0, to: 0};
    _row = {from: 0, to: 0};
    _col = {from: 0, to: 0};
    _objects = [];

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
        if(value) {
            this._ts = value;
        }
    }

    get lay() {
        return this._lay;
    }

    set lay(value) {
        if(value) {
            this._lay = value;
        }
    }

    get row() {
        return this._row;
    }

    set row(value) {
        if(value) {
            this._row = value;
        }
    }

    get col() {
        return this._col;
    }

    set col(value) {
        if(value) {
            this._col = value;
        }
    }

    get objects() {
        return this._objects;
    }

    set objects(value) {
        if(value) {
            this._objects = value;
        }
    }

    addObject(value) {
        this._objects.push(value);
        return this;
    }

    removeObject(value) {
        this._objects = this._objects.filter(i => value !== i);
        return this;
    }

    updateObjects(value) {
        this._objects = value;
        return this;
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
