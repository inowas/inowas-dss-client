import WellPosition from './WellPosition';
import uuidv4 from 'uuid/v4';

class OptimizationObject {
    _id = uuidv4();
    _name = 'New Optimization Object';
    _type = 'wel';
    _position = new WellPosition();
    _flux = [];
    _concentration = [];
    _substances = [];
    _numberOfStressperiods;

    static createFromTypeAndStressperiods(type, numberOfStressperiods) {
        const object = new OptimizationObject();
        object.type = type;
        object.numberOfStressperiods = numberOfStressperiods;
        object.flux = (new Array(numberOfStressperiods)).map(() => (
            {id: uuidv4(), min: 0, max: 0, result: 0}
        ));
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

    get concentration() {
        return this._concentration;
    }

    set concentration(value) {
        this._concentration = value;
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
            data: (new Array(this.numberOfStressperiods)).map(() => (
                {id: uuidv4(), min: 0, max: 0, result: 0}
            ))
        });

        this.substances = substances;
        this.calculateConcentration();
    }

    updateSubstance(substance) {
        const substances = this.substances;
        substances.map(s => {
            if (s.id === substance.id) {
                return substance;
            }
            return s;
        });

        this.substances = substances;
        this.calculateConcentration();
    }

    removeSubstance(id) {
        const substances = this.substances;
        substances.filter(s => s.id !== id);
        this.substances = substances;
        this.calculateConcentration();
    }

    calculateConcentration() {
        // ToDo !!!
        this.concentration = [
            {
                component1: {
                    min: 2,
                    max: 12
                },
                component2: {
                    min: 12,
                    max: 22
                }
            },
            {
                component3: {
                    min: 22,
                    max: 32
                },
                component4: {
                    min: 32,
                    max: 42
                }
            }
        ];
    }

    get toObject() {
        return ({
            'id': this.id,
            'name': this.name,
            'type': this.type,
            'position': this.position.toObject,
            'flux': this.flux,
            'concentration': this.concentration
        });
    }
}

export default OptimizationObject;
