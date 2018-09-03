import uuidv4 from 'uuid/v4';
import OptimizationInput from './OptimizationInput';
import OptimizationSolution from './OptimizationSolution';

class Optimization {
    _id;
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
        optimization.input = OptimizationInput.fromDefaults(optimization.id);
        return optimization;
    }

    static fromObject(obj) {
        const optimization = new Optimization();
        optimization.id = obj.id;
        optimization.input = OptimizationInput.fromObject(obj.input);
        optimization.state = obj.state;
        optimization.progress = obj.progress;

        obj.solutions && obj.solutions.forEach((solution) => {
            optimization.addSolution(OptimizationSolution.fromObject(solution));
        });

        return optimization;
    }

    constructor() {
        this.id = uuidv4();
        this.input = new OptimizationInput(this.id);
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value ? value : uuidv4();
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
}

export default Optimization;
