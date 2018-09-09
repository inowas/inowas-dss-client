import uuidv4 from 'uuid/v4';
import OptimizationSolution from './OptimizationSolution';

class OptimizationResult {
    _id = uuidv4();
    _solutions = [];
    _progressLog = [];
    _generation = 0;
    _final = false;

    static fromObject(obj) {
        const result = new OptimizationResult();
        result.id = obj.id;

        obj.solutions.forEach((solution) => {
            result.addSolution(OptimizationSolution.fromObject(solution));
        });

        result.progressLog = obj.progress_log;
        result.generation = obj.generation;
        result.final = obj.final;
        return result;
    }

    constructor() {
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get solutions() {
        return this._solutions;
    }

    set solutions(value) {
        this._solutions = value;
    }

    get progressLog() {
        return this._progressLog;
    }

    set progressLog(value) {
        this._progressLog = value;
    }

    get generation() {
        return this._generation;
    }

    set generation(value) {
        this._generation = value;
    }

    get final() {
        return this._final;
    }

    set final(value) {
        this._final = value;
    }

    get toObject() {
        return {
            'id': this.id,
            'solutions': this.solutions.map(s => s.toObject),
            'progress_log': this.progressLog,
            'generation': this.generation,
            'final': this.final
        };
    }

    addSolution(solution) {
        if (!(solution instanceof OptimizationSolution)) {
            throw new Error('The solution is not of type OptimizationSolution.');
        }
        this._solutions.push(solution);
    }
}

export default OptimizationResult;
