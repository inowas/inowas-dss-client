import OptimizationInput from './OptimizationInput';
import OptimizationSolution from './OptimizationSolution';
import Ajv from 'ajv';

class Optimization {
    _input;
    _state = 0;
    _progress = {
        _log: [],
        _generation: 0,
        _final: false
    };
    _solutions = [];

    static fromDefaults() {
        const optimization = new Optimization();
        optimization.input = OptimizationInput.fromDefaults();
        return optimization;
    }

    static fromObject(obj) {
        const optimization = new Optimization();
        optimization.input = OptimizationInput.fromObject(obj.input);
        optimization.state = obj.state;
        optimization.progress = obj.progress;

        obj.solutions && obj.solutions.forEach((solution) => {
            optimization.addSolution(OptimizationSolution.fromObject(solution));
        });

        return optimization;
    }

    constructor() {
    }

    get id() {
        return this.input.id;
    }

    get input() {
        return this._input;
    }

    set input(value) {
        this._input = value ? value : {};
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value ? value : 0;
    }

    get progress() {
        return this._progress;
    }

    set progress(value) {
        this._progress._log = value && value.log ? value.log : [];
        this._progress._generation = value && value.generation ? value.generation : 0;
        this._progress._final = value && value.final ? value.final : false;
    }

    get solutions() {
        return this._solutions;
    }

    set solutions(value) {
        this._solutions = value ? value : [];
    }

    get toObject() {
        return {
            'id': this.id,
            'input': this.input.toObject,
            'state': this.state,
            'progress': {
                log: this._progress._log,
                generation: this._progress._generation,
                final: this._progress._final
            },
            'solutions': this.solutions.map(r => r.toObject)
        };
    }

    addSolution(result) {
        if (!(result instanceof OptimizationSolution)) {
            throw new Error('The result object is not of type OptimizationSolution.');
        }
        this._solutions.push(result);
    }

    validate() {
        const schema = require("./optimization.schema.json");
        const ajv = new Ajv({schemaId: "id"});
        ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
        const validate = ajv.compile(schema);
        return [validate(this.toObject), validate.errors];
    }
}

export default Optimization;
