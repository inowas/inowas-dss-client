import WellPosition from './WellPosition';
import uuidv4 from 'uuid/v4';

class OptimizationObject {
    _id = uuidv4();
    _type = 'wel';
    _position = new WellPosition();
    _flux = {};
    _meta = {
        _name: 'New Optimization Object',
        _numberOfStressPeriods: 0,
        _substances: []
    };

    static createFromTypeAndStressPeriods(type, numberOfStressPeriods) {
        const object = new OptimizationObject();
        object.type = type;
        object.numberOfStressPeriods = numberOfStressPeriods;

        let flux = {};
        for (let i = 0; i < numberOfStressPeriods; i++) {
            flux[i.toString()] = {
                min: 0,
                max: 0,
                result: null
            }
        }
        object.flux = flux;

        return object;
    }

    static fromObject(obj) {
        const object = new OptimizationObject();
        object.id = obj.id;
        object.name = obj.name;
        object.type = obj.type;
        object.position = WellPosition.fromObject(obj.position);
        object.substances = obj.substances;
        object.numberOfStressPeriods = obj.numberOfStressPeriods;
        object.updateFlux(obj.flux);

        return object;
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
        return this._meta._name;
    }

    set name(value) {
        this._meta._name = !value ? 'New Optimization Object' : value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        if (value !== 'wel') {
            throw new Error('Type must be one of type: wel');
        }
        this._type = value ? value : 'wel';
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value ? value : new WellPosition();
    }

    get flux() {
        return this._flux;
    }

    set flux(value) {
        this._flux = value ? value : {};
    }

    updateFlux(rows) {
        let flux = {};
        for (let i = 0; i < this.numberOfStressPeriods; i++) {
            flux[i.toString()] = {
                min: rows[i] && rows[i].min ? parseFloat(rows[i].min) : 0,
                max: rows[i] && rows[i].max ? parseFloat(rows[i].max) : 0,
                result: rows[i] && rows[i].result ? parseFloat(rows[i].result) : null
            }
        }
        this.flux = flux;
        return this;
    }

    get concentration() {
        return this.calculateConcentration();
    }

    get numberOfStressPeriods() {
        return this._meta._numberOfStressPeriods;
    }

    set numberOfStressPeriods(value) {
        this._meta._numberOfStressPeriods = value ? value : 0;
    }

    get substances() {
        return this._meta._substances;
    }

    set substances(value) {
        this._meta._substances = value ? value : [];
    }

    addSubstance(name) {
        const substances = this.substances;
        substances.push({
            id: uuidv4(),
            name: name,
            data: (new Array(this.numberOfStressPeriods)).fill(0).map(() => {
                return {
                    min: 0,
                    max: 0,
                    result: 0
                };
            })
        });

        this.substances = substances;
        return this;
    }

    updateSubstance(substance) {
        this.substances = this.substances.map(s => {
            if (s.id === substance.id) {
                return substance;
            }
            return s;
        });
        return this;
    }

    removeSubstance(id) {
        this.substances = this.substances.filter(s => s.id !== id);
        return this;
    }

    calculateConcentration() {
        const substances = this.substances;
        const concentration = {};

        if (substances.length === 0) {
            return {};
        }

        for (let i = 0; i < this.numberOfStressPeriods; i++) {
            const obj = {};
            substances.forEach(s => {
                obj[s.name] = {
                    min: s.data[i].min,
                    max: s.data[i].max,
                    result: s.data[i].result
                };
            });
            concentration[i.toString()] = obj;
        }

        return concentration;
    }

    get toObject() {
        return ({
            'id': this.id,
            'name': this.name,
            'type': this.type,
            'position': this.position.toObject,
            'flux': this.flux,
            'concentration': this.concentration,
            'substances': this.substances,
            'numberOfStressPeriods': this.numberOfStressPeriods
        });
    }
}

export default OptimizationObject;
