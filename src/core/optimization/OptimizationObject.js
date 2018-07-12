import WellPosition from './WellPosition';

class OptimizationObject {
    _name = 'New Optimization Object';
    _type = 'well';
    _position = new WellPosition();
    _flux = {
        0: {
            min: -200,
            max: -100,
            result: null
        },
        1: {
            min: -150,
            max: -50,
            result: null
        }
    };
    _concentration; // WellConcentration

    static fromObject(obj) {
        const object = new OptimizationObject;
        object.name = obj.name;
        object.type = obj.type;
        object.position = WellPosition.fromObject(obj.position);
        object.flux = obj.flux;
        object.concentration = obj.concentration;
        return object;
    }

    constructor() {}

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

    get concentration() {
        return this._concentration;
    }

    set concentration(value) {
        this._concentration = value;
    }

    get toObject() {
        return ({
            'name': this.name,
            'type': this.type,
            'position': this.position.toObject,
            'flux': this.flux,
            'concentration': this.concentration
        });
    }
}

export default OptimizationObject;
