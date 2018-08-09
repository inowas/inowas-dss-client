import OptimizationParameters from './OptimizationParameters';
import OptimizationObject from './OptimizationObject';
import OptimizationObjective from './OptimizationObjective';
import OptimizationConstraint from './OptimizationConstraint';
import Location from './Location';
import uuidv4 from 'uuid/v4';

class Optimization {
    _id = uuidv4();
    _constraints = [];
    _objectives = [];
    _objects = [];
    _parameters;
    _enabled = false;

    static fromDefaults() {
        const optimization = new Optimization();
        optimization.parameters = OptimizationParameters.fromDefaults();
        optimization.constraints = [];
        optimization.objectives = [
            // TODO: Examples only for testing
            OptimizationObjective.fromObject({
                'id': uuidv4(),
                'name': 'Objective 1',
                'type': 'head',
                'conc_file_name': 'MT3D001.UCN',
                'summary_method': 'max',
                'weight': -1,
                'penalty_value': 999,
                'location': Location.fromObject({
                    'type': 'object',
                    'objects': ['123-abc-456', '789-xyz-012']
                })
            }),
            OptimizationObjective.fromObject({
                'id': uuidv4(),
                'name': 'Objective 2',
                'type': 'concentration',
                'conc_file_name': 'MT3D001.UCN',
                'summary_method': 'max',
                'weight': -1,
                'penalty_value': 999,
                'location': Location.fromObject({
                    'type': 'bbox',
                    'ts': {
                        'min': 0,
                        'max': 0
                    },
                    'lay': {
                        'min': 0,
                        'max': 0
                    },
                    'row': {
                        'min': 90,
                        'max': 90
                    },
                    'col': {
                        'min': 90,
                        'max': 90
                    },
                    'objects': []
                })
            })
        ];
        optimization.objects = [
            OptimizationObject.fromObject({
                'id': '123-abc-456',
                'name': 'Brunnen 1',
                'type': 'wel',
                'position': Location.fromObject({
                    type: 'bbox',
                    col: {
                        min: 10,
                        max: 20,
                        result: 15
                    },
                    row: {
                        min: 10,
                        max: 20,
                        result: 15
                    },
                    lay: {
                        min: 0,
                        max: 1,
                        result: 1
                    }
                }),
                'flux': [],
                'concentrations': [],
                'substances': []
            }),
            OptimizationObject.fromObject({
                'id': '789-xyz-012',
                'name': 'Brunnen 2',
                'type': 'wel',
                'position': Location.fromObject({
                    type: 'bbox',
                    col: {
                        min: 20,
                        max: 30,
                        result: 22
                    },
                    row: {
                        min: 20,
                        max: 30,
                        result: 22
                    },
                    lay: {
                        min: 0,
                        max: 1,
                        result: 1
                    }
                }),
                'flux': [],
                'concentrations': [],
                'substances': []
            })
        ];
        return optimization;
    }

    static fromObject(obj) {
        const optimization = new Optimization;
        optimization.id = obj.id;
        optimization.parameters = OptimizationParameters.fromObject(obj.parameters);

        obj.constraints.forEach((constraint) => {
            optimization.addConstraint(OptimizationConstraint.fromObject(constraint));
        });

        obj.objectives.forEach((objective) => {
            optimization.addObjective(OptimizationObjective.fromObject(objective));
        });

        obj.objects.forEach((object) => {
            optimization.addObject(OptimizationObject.fromObject(object));
        });
        optimization.enabled = obj.enabled;

        return optimization;
    }

    constructor() {
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

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
            'id': this.id,
            'parameters': this.parameters.toObject,
            'constraints': this.constraints.map(c => c.toObject),
            'objectives': this.objectives.map(c => c.toObject),
            'objects': this.objects.map(c => c.toObject),
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
