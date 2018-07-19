import Boundary from '../../boundaries/Boundary';

class SsmSubstance {

    _name = '';
    _affectedCells = [];
    _values = [];

    static create(name, boundary, numberOfValues) {
        if (!(boundary instanceof Boundary)) {
            throw new Error('Boundary must be instance of boundary');
        }

        const substance = new SsmSubstance();
        substance._name = name;
        substance._affectedCells = boundary.affectedCells;
        substance._values = new Array(numberOfValues).fill(0, 0, numberOfValues);
        return substance;
    }

    static fromObject(obj) {
        const substance = new SsmSubstance();
        substance._affectedCells = obj.affectedCells;
        substance._name = obj.name;
        substance._values = obj.values;
        return substance;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get affectedCells() {
        return this._affectedCells;
    }

    get values() {
        return this._values;
    }

    set values(value) {
        this._values = value;
    }

    get toObject() {
        return {
            affectedCells: this._affectedCells,
            name: this._name,
            values: this._values
        };
    }
}

export default SsmSubstance;
