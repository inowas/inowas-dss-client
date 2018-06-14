class OptimizationConstraint {

    _type;
    _concFileName = 'MT3D001.UCN';
    _summaryMethod;
    _value;
    _operator;
    _location; // Location
    _location1; // Location
    _location2; // Location

    static fromObject(obj) {
        const constraint = new OptimizationConstraint();
        constraint.type = obj.type;
        constraint.concFileName = obj.conc_file_name;
        constraint.summaryMethod = obj.summary_method;
        constraint.value = obj.value;
        constraint.operator = obj.operator;
        constraint.location = obj.location;
        constraint.location1 = obj.location_1;
        constraint.location2 = obj.location_2;
        return constraint;
    }

    constructor() {}

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get concFileName() {
        return this._concFileName;
    }

    set concFileName(value) {
        this._concFileName = value;
    }

    get summaryMethod() {
        return this._summaryMethod;
    }

    set summaryMethod(value) {
        this._summaryMethod = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get operator() {
        return this._operator;
    }

    set operator(value) {
        this._operator = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    get location1() {
        return this._location1;
    }

    set location1(value) {
        this._location1 = value;
    }

    get location2() {
        return this._location2;
    }

    set location2(value) {
        this._location2 = value;
    }

    get toObject() {
        return ({
            'type': this.type,
            'conc_file_name': this.concFileName,
            'summary_method': this.summaryMethod,
            'value': this.value,
            'operator': this.operator,
            'location': this.location,
            'location_1': this.location1,
            'location_2': this.location2
        });
    }
}

export default OptimizationConstraint;
