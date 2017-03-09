import MfModel from './ModflowModel';

export default class ModflowModelsCollection {

    _models = [];

    constructor(){};

    models(){
        return this._models;
    }

    addModel(model) {
        if (model instanceof MfModel) {
            this._models.push(model);
        }
    }

    forEach = (callback) => {
        return this._models.forEach(callback);
    };

    filter = (callback) => {
        return this._models.filter(callback);
    };

    map = (callback) => {
        return this._models.map(callback);
    };

    push = (model) => {
        return this._models.push(model);
    };

    baseModel(){
        return this._models.find( m => {return m.isBaseModel})
    }

    count(){
        return this._models.length;
    }

    countModelsWithResults(){
        let counter = 0;
        this._models.forEach( m => {
            if (m.hasResult()) {
                counter++;
            }
        });

        return counter;
    }
}
