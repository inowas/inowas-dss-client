import WellPosition from './WellPosition';
import uuidv4 from 'uuid/v4';

class OptimizationObject {
    _id = uuidv4();
    _name = 'New Optimization Object';
    _type = 'wel';
    _position = new WellPosition();
    _flux = [];
    _concentrations = [];
    _substances = [];
    _numberOfStressperiods;

    static createFromTypeAndStressperiods(type, numberOfStressperiods) {
        const object = new OptimizationObject();
        object.type = type;
        object.numberOfStressperiods = numberOfStressperiods;
        object.flux = (new Array(numberOfStressperiods)).fill(0).map(() => {
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
        object.position = WellPosition.fromObject(obj.position);
        object.flux = obj.flux;
        object.concentrations = obj.concentrations;
        object.substances = obj.substances;
        object.numberOfStressperiods = obj.numberOfStressperiods;
        return object;
    }

    constructor() {
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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

    get concentrations() {
        return this._concentrations;
    }

    set concentrations(value) {
        this._concentrations = value;
    }

    get numberOfStressperiods() {
        return this._numberOfStressperiods;
    }

    set numberOfStressperiods(value) {
        this._numberOfStressperiods = value;
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
            data: (new Array(this.numberOfStressperiods)).fill(0).map(() => {
                return {
                    min: 0,
                    max: 0,
                    result: 0
                };
            })
        });

        this.substances = substances;
        this.calculateConcentration();
    }

    updateSubstance(substance) {
        this.substances = this.substances.map(s => {
            if (s.id === substance.id) {
                return substance;
            }
            return s;
        });
        this.calculateConcentration();
    }

    removeSubstance(id) {
        this.substances = this.substances.filter(s => s.id !== id);
        this.calculateConcentration();
    }

    calculateConcentration() {
        this.concentrations = this.substances.map(s => {
            return {
                [s.name]: s.data.map(d => {
                    return {
                        min: d.min,
                        max: d.max,
                        result: d.result
                    };
                })
            };
        });
    }

    get toObject() {
        return ({
            'id': this.id,
            'name': this.name,
            'type': this.type,
            'position': this.position.toObject,
            'flux': this.flux,
            'concentrations': this.concentrations,
            'substances': this.substances,
            'numberOfStressperiods': this.numberOfStressperiods
        });
    }
}

export default OptimizationObject;
