class SsmSubstance {

    _name = '';
    _values = [];

    static create(name, numberOfValues) {
        const substance = new SsmSubstance();
        substance._name = name;
        substance._values = new Array(numberOfValues).fill(0, 0, numberOfValues);
        return substance;
    }

    static fromObject(obj) {
        const substance = new SsmSubstance();
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

    get values() {
        return this._values;
    }

    set values(value) {
        this._values = value;
    }

    get toObject() {
        return {
            name: this._name,
            values: this._values
        };
    }
}

export default SsmSubstance;
