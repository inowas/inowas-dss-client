class OptimizationObject {
    _type = 'well';
    _id;
    _position; // WellPosition
    _flux; // WellFlux
    _concentration; // WellConcentration

    static fromObject(obj) {
        const object = new OptimizationObject;
        object.type = obj.type;
        object.id = obj.id;
        object.position = obj.position;
        object.flux = obj.flux;
        object.concentration = obj.concentration;
        return object;
    }

    constructor() {}


    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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
            'type': this.type,
            'id': this.id,
            'position': this.position,
            'flux': this.flux,
            'concentration': this.concentration
        });
    }
}

export default OptimizationObject;
