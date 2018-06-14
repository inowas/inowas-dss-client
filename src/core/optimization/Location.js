import Object from './Object';

class Objective {
    _type;
    _ts;
    _lay;
    _row;
    _col;
    _objects; // List of Object

    static fromObject(obj) {
        const objective = new Objective();
        objective.type = obj.type;
        objective.ts = obj.ts;
        objective.lay = obj.lay;
        objective.row = obj.row;
        objective.col = obj.col;
        objective.objects = obj.objects;
        return objective;
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
            'type': this._type,
            'ts': this._ts,
            'lay': this._lay,
            'row': this._row,
            'col': this._col,
            'objects': this._objects
        });
    }
}

export default Objective;
