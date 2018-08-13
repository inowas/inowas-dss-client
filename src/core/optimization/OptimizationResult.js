import uuidv4 from 'uuid/v4';

class OptimizationResult {
    _id = uuidv4();

    static fromObject(obj) {
        const result = new OptimizationResult();
        result.id = obj.id;
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

    get toObject() {
        return {
            'id': this.id
        };
    }
}

export default OptimizationResult;
