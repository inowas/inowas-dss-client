class OptimizationObjective {

    _type = '';
    _concFileName = 'MT3D001.UCN';
    _summaryMethod ='';
    _weight = -1;
    _penaltyValue = 999;
    _location; // Location
    _location1; // Location
    _location2; // Location

    static fromObject(obj) {
        const objective = new OptimizationObjective();
        objective.type = obj.type;
        objective.concFileName = obj.conc_file_name;
        objective.summaryMethod = obj.summary_method;
        objective.weight = obj.weight;
        objective.penaltyValue = obj.penalty_value;
        objective.location = obj.location;
        objective.location1 = obj.location_1;
        objective.location2 = obj.location_2;
        return objective;
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

    get weight() {
        return this._weight;
    }

    set weight(value) {
        this._weight = value;
    }

    get penaltyValue() {
        return this._penaltyValue;
    }

    set penaltyValue(value) {
        this._penaltyValue = value;
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

    get isValid() {
        // TODO: Validierung
        return true;
    }

    get toObject() {
        return ({
            'type': this.type,
            'conc_file_name': this.concFileName,
            'summary_method': this.summaryMethod,
            'weight': this.weight,
            'penalty_value': this.penaltyValue,
            'location': this.location,
            'location_1': this.location1,
            'location_2': this.location2
        });
    }
}

export default OptimizationObjective;
