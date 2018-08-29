import uuidv4 from 'uuid/v4';

class SoilmodelZone {
    _id = uuidv4();
    _name = 'New Zone';
    _cells = [];
    _hk = 0;
    _hani = 0;
    _vka = 0;
    _ss = 0;
    _sy = 0;

    static fromObject(obj) {
        const zone = new SoilmodelZone();

        if (obj) {
            zone.id = obj.id;
            zone.name = obj.name;
            zone.cells = obj.cells;
            zone.hk = obj.hk;
            zone.hani = obj.hani;
            zone.vka = obj.vka;
            zone.ss = obj.ss;
            zone.sy = obj.sy;
        }

        return zone;
    }

    constructor() {
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value ? value : uuidv4();
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value ? value : '';
    }

    get cells() {
        return this._cells;
    }

    set cells(value) {
        this._cells = value ? value : [];
    }

    get hk() {
        return this._hk;
    }

    set hk(value) {
        this._hk = value ? parseFloat(value) : 0;
    }

    get hani() {
        return this._hani;
    }

    set hani(value) {
        this._hani = value ? parseFloat(value) : 0;
    }

    get vka() {
        return this._vka;
    }

    set vka(value) {
        this._vka = value ? parseFloat(value) : 0;
    }

    get ss() {
        return this._ss;
    }

    set ss(value) {
        this._ss = value ? parseFloat(value) : 0;
    }

    get sy() {
        return this._sy;
    }

    set sy(value) {
        this._sy = value ? parseFloat(value) : 0;
    }

    get toObject() {
        return {
            'id': this.id,
            'name': this.name,
            'cells': this.cells,
            'hk': this.hk,
            'hani': this.hani,
            'vka': this.vka,
            'ss': this.ss,
            'sy': this.sy
        };
    }
}

export default SoilmodelZone;
