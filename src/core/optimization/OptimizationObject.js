import Location from './Location';
import uuidv4 from 'uuid/v4';

class OptimizationObject {
    _id = uuidv4();
    _name = 'New Optimization Object';
    _type = 'wel';
    _position = new Location();
    _flux = [];
    _substances = [];
    _numberOfStressPeriods;

    static createFromTypeAndStressPeriods(type, numberOfStressPeriods) {
        const object = new OptimizationObject();
        object.type = type;
        object.numberOfStressPeriods = numberOfStressPeriods;
        object.flux = (new Array(numberOfStressPeriods)).fill(0).map(() => {
            return {
                min: 0,
                max: 0,
                result: 0
            };
        });
        return object;
    }

    static fromObject(obj) {
        const object = new OptimizationObject();
        object.id = obj.id;
        object.name = obj.name;
        object.type = obj.type;
        object.position = Location.fromObject(obj.position);
        object.flux = obj.flux;
        object.substances = obj.substances;
        object.numberOfStressPeriods = obj.numberOfStressPeriods;
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
        return this._name;
    }

    set name(value) {
        this._name = !value ? 'New Optimization Object' : value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        if (value !== 'wel') {
            throw new Error('Type must be one of type: wel');
        }
        this._type = value;
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    get flux() {
        return this._flux;
    }

    set flux(value) {
        this._flux = value;
    }

    updateFlux(rows) {
        this.flux = rows.map((row, key) => {
            return {
                id: key,
                min: parseFloat(row.min),
                max: parseFloat(row.max)
            };
        });
        return this;
    }

    get concentration() {
        return this.calculateConcentration();
    }

    get numberOfStressPeriods() {
        return this._numberOfStressPeriods;
    }

    set numberOfStressPeriods(value) {
        this._numberOfStressPeriods = value;
    }

    get substances() {
        return this._substances;
    }

    set substances(value) {
        this._substances = value;
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
            'position': {
                lay: this.position.lay,
                row: this.position.row,
                col: this.position.col,
            },
            'flux': this.flux,
            'concentration': this.concentration,
            'substances': this.substances,
            'numberOfStressPeriods': this.numberOfStressPeriods
        });
    }
}

export default OptimizationObject;
