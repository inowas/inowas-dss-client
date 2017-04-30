import { unionBy } from 'lodash';

import MfModel from './ModflowModel';

export default class ModflowModelsCollection {

    _models = [];

    constructor() {}

    get models() {
        return this._models;
    }

    get length() {
        return this._models.length;
    }

    // addModel(model) {
    //     if (model instanceof MfModel) {
    //         this._models.push(model);
    //     }
    // }

    forEach = ( callback ) => {
        return this._models.forEach( callback );
    };

    filter = ( callback ) => {
        return this._models.filter( callback );
    };

    map = ( callback ) => {
        return this._models.map( callback );
    };

    push = ( model ) => {
        // don't just push, because we don't wan't duplicates
        this._models = unionBy([model], this._models.reverse(), 'modelId').reverse();
        return this._models.length;
    };

    get baseModel() {
        return this._models.find( m => { return m.isBaseModel; } );
    }

    count() {
        return this._models.length;
    }

    countModelsWithResults() {
        let counter = 0;
        this._models.forEach( m => {
            if ( m.hasResult() ) {
                counter++;
            }
        } );

        return counter;
    }

    globalMinValue = () => {
        const values = [];
        this._models.forEach( m => {
            if ( !m.isSelected() ) {
                return;
            }

            const minValue = m.minValue();
            if ( minValue === null ) {
                return;
            }
            values.push( minValue );
        } );

        return values.sort( ( a, b ) => a > b )[ 0 ];
    };

    globalMaxValue = () => {
        const values = [];
        this._models.forEach( m => {
            if ( !m.isSelected() ) {
                return;
            }

            const maxValue = m.maxValue();
            if ( maxValue === null ) {
                return;
            }
            values.push( maxValue );
        } );

        return values.sort( ( a, b ) => a < b )[ 0 ];
    }
}
