import Location from './Location';
import uuidv4 from 'uuid/v4';

class OptimizationObjective {

    _id = uuidv4();
    _name = 'New Optimization Objective';
    _type = '';
    _concFileName = 'MT3D001.UCN';
    _summaryMethod ='';
    _weight = -1;
    _penaltyValue = 999;
    _location = new Location();

    static fromObject(obj) {
        const objective = new OptimizationObjective();
        objective.id = obj.id;
        objective.name = obj.name;
        objective.type = obj.type;
        objective.concFileName = obj.conc_file_name;
        objective.summaryMethod = obj.summary_method;
        objective.weight = obj.weight;
        objective.penaltyValue = obj.penalty_value;
        objective.location = Location.fromObject(obj.location);
        return objective;
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
        this._name = !value ? 'New Optimization Objective' : value;
    }

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

    get toObject() {
        return ({
            'id': this.id,
            'name': this.name,
            'type': this.type,
            'conc_file_name': this.concFileName,
            'summary_method': this.summaryMethod,
            'weight': this.weight,
            'penalty_value': this.penaltyValue,
            'location': this.location.toObject
        });
    }
}

export default OptimizationObjective;
