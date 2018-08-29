import uuidv4 from 'uuid/v4';
import SoilmodelZone from "./SoilmodelZone";

class SoilmodelLayer {
    _id = uuidv4();
    _meta = {
        _zones: []
    };
    _name = 'New Layer';
    _description = '';
    _number = 0;
    _laytyp = 0;
    _top = 1;
    _botm = 0;
    _hk = 10;
    _hani = 1;
    _vka = 1;
    _layavg = 0;
    _laywet = 0;
    _ss = 0.00002;
    _sy = 0.15;

    static fromObject(obj) {
        const layer = new SoilmodelLayer();

        if(obj) {
            layer.id = obj.id;
            layer.meta = obj.meta;
            layer.name = obj.name;
            layer.description = obj.description;
            layer.number = obj.number;
            layer.laytyp = obj.laytyp;
            layer.top = obj.top;
            layer.botm = obj.botm;
            layer.hk = obj.hk;
            layer.hani = obj.hani;
            layer.vka = obj.vka;
            layer.layavg = obj.layavg;
            layer.laywet = obj.laywet;
            layer.ss = obj.ss;
            layer.sy = obj.sy;
        }

        return layer;
    }

    constructor() {}

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value ? value : uuidv4();
    }

    get meta() {
        return {
            zones: this._meta._zones.map(z => {
               return z.toObject;
            })
        };
    }

    set meta(value) {
        this._meta = {
            _zones: value ? value.zones : []
        };
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value ? value : 'New Layer';
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value ? value : '';
    }

    get number() {
        return this._number;
    }

    set number(value) {
        this._number = value ? parseInt(value) : 0;
    }

    get laytyp() {
        return this._laytyp;
    }

    set laytyp(value) {
        this._laytyp = value ? parseInt(value) : 0;
    }

    get top() {
        return this._top;
    }

    set top(value) {
        this._top = value ? value : 0;
    }

    get botm() {
        return this._botm;
    }

    set botm(value) {
        this._botm = value ? value : 0;
    }

    get hk() {
        return this._hk;
    }

    set hk(value) {
        this._hk = value ? value : 0;
    }

    get hani() {
        return this._hani;
    }

    set hani(value) {
        this._hani = value ? value : 0;
    }

    get vka() {
        return this._vka;
    }

    set vka(value) {
        this._vka = value ? value : 0;
    }

    get layavg() {
        return this._layavg;
    }

    set layavg(value) {
        this._layavg = value ? value : 0;
    }

    get laywet() {
        return this._laywet;
    }

    set laywet(value) {
        this._laywet = value ? value : 0;
    }

    get ss() {
        return this._ss;
    }

    set ss(value) {
        this._ss = value ? value : 0;
    }

    get sy() {
        return this._sy;
    }

    set sy(value) {
        this._sy = value ? value : 0;
    }

    get toObject() {
        return {
            'id': this.id,
            'name': this.name,
            '_meta': this.meta,
            'description': this.description,
            'number': this.number,
            'laytyp': this.laytyp,
            'top': this.top,
            'botm': this.botm,
            'hk': this.hk,
            'hani': this.hani,
            'vka': this.vka,
            'layavg': this.layavg,
            'laywet': this.laywet,
            'ss': this.ss,
            'sy': this.sy
        };
    }

    addZone(zone) {
        if (!(zone instanceof SoilmodelZone)) {
            throw new Error('The zone object is not of type SoilmodelZone.');
        }

        const zones = this.meta.zones;
        zones.push(zone);
        this.meta = {
            ...this.meta,
            zones: zones
        };

        return this;
    }

    removeZone(zone) {
        this.meta = {
            ...this.meta,
            zones: this.meta.zones.filter(z => z.id !== zone.id)
        };
        return this;
    }

    updateZone(zone) {
        let zoneExists = false;

        console.log('UpdateZone', zone);

        this.meta = {
            ...this.meta,
            zones: this.meta.zones.map(z => {
                if (z.id === zone.id) {
                    zoneExists = true;
                    console.log('Update zone in Layer', z.id);
                    return zone;
                }
                return z;
            })
        };

        if(!zoneExists) {
            console.log('Add Zone to Layer');
            this.addZone(zone);
        }

        return this;
    }
}

export default SoilmodelLayer;
