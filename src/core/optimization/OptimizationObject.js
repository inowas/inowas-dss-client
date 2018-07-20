import WellPosition from './WellPosition';
import uuidv4 from 'uuid/v4';

class OptimizationObject {
    _id = uuidv4();
    _name = 'New Optimization Object';
    _type = 'well';
    _position = new WellPosition();
    _flux = [];
    _concentration = [
        {
            'component1': {
                id: uuidv4(),
                min: 0,
                max: 10,
                result: null
            },
            'component2': {
                id: uuidv4(),
                min: 5,
                max: 10,
                result: null
            }
        },
        {
            'component1': {
                id: uuidv4(),
                min: 0,
                max: 50,
                result: null
            }
        },
        {
            'component1': {
                id: uuidv4(),
                min: 50,
                max: 100,
                result: null
            },
            'component2': {
                id: uuidv4(),
                min: 20,
                max: 80,
                result: null
            }
        },
    ];

    static fromObject(obj) {
        const object = new OptimizationObject;
        object.id = obj.id;
        object.name = obj.name;
        object.type = obj.type;
        object.position = WellPosition.fromObject(obj.position);
        object.flux = obj.flux;
        object.concentration = obj.concentration;
        return object;
    }

    constructor() {}

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
        this._type = !value ? 'well' : value;
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

    addFlux(min = 0, max = 0, result = null) {
        this._flux.push({id: uuidv4(), min: min, max: max, result: result});
        return this;
    }

    updateFlux(index, min = 0, max = 0, result = null) {
        this._flux = this._flux.map(item => {
            if(index === item.id) {
                return {id: index, min: min, max: max, result: result};
            }
            return {id: item.id, min: item.min, max: item.max, result: item.result};
        });
        return this;
    }

    removeFlux(index) {
        this._flux = this._flux.filter((_, i) => index !== i);
        return this;
    }

    get concentration() {
        return this._concentration;
    }

    set concentration(value) {
        this._concentration = value;
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
