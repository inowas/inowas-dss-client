import OptimizationParameters from './OptimizationParameters';
import OptimizationObject from './OptimizationObject';
import OptimizationObjective from './OptimizationObjective';
import OptimizationConstraint from './OptimizationConstraint';

class Optimization {
    _constraints = [];
    _objectives = [];
    _objects = [];
    _parameters;
    _enabled = false;

    static fromDefaults() {
        const optimization = new Optimization;
        optimization.parameters = OptimizationParameters.fromDefaults();
        optimization.constraints = [];
        optimization.objectives = [];
        optimization.objects = [];
        return optimization;
    }

    static fromObject(obj) {
        const optimization = new Optimization;
        optimization.parameters = OptimizationParameters.fromObject(obj.parameters);

        obj.constraints.forEach( (constraint) => {
            optimization.addConstraint(OptimizationConstraint.fromObject(constraint));
        });

        obj.objectives.forEach( (objective) => {
            optimization.addObjective(OptimizationObjective.fromObject(objective));
        });

        obj.objects.forEach( (object) => {
            optimization.addObject(OptimizationObject.fromObject(object));
        });
        optimization.enabled = obj.enabled;

        return optimization;
    }

    constructor() {}

    get parameters() {
        return this._parameters;
    }

    set parameters(value) {
        this._parameters = value;
    }

    get constraints() {
        return this._constraints;
    }

    set constraints(value) {
        this._constraints = value;
    }

    get objectives() {
        return this._objectives;
    }

    set objectives(value) {
        this._objectives = value;
    }

    get objects() {
        return this._objects;
    }

    set objects(value) {
        this._objects = value;
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
    }

    get toObject() {
        return {
            'parameters': this.parameters.toObject,
            'constraints': this.constraints.map( c => c.toObject ),
            'objectives': this.objectives.map( c => c.toObject ),
            'objects': this.objects.map( c => c.toObject ),
            'enabled': this.enabled
        };
    }

    addConstraint(constraint) {
        if (!(constraint instanceof OptimizationConstraint)) {
            throw new Error('The parameter constraint is not of type OptimizationConstraint.');
        }
        this._constraints.push(constraint);
    }

    addObjective(objective) {
        if (!(objective instanceof OptimizationObjective)) {
            throw new Error('The parameter objective is not of type OptimizationObjective.');
        }
        this._objectives.push(objective);
    }

    addObject(object) {
        if (!(object instanceof OptimizationObject)) {
            throw new Error('The parameter object is not of type OptimizationObject.');
        }
        this._objects.push(object);
    }
}

export default Optimization;
