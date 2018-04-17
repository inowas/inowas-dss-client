import {WellBoundary} from './WellBoundary';

export class Boundary {
    _id;
    _name;
    _geometry;
    _hasObservationPoints;
    _affectedLayers = [0];
    _metadata = {};
    _dateTimeValues = [];
    _activeCells;

    static fromObjectData = (objectData, {type}) => {
        switch (type) {
            case 'wel':
                return WellBoundary.fromObjectData(objectData);

        }

        return null;
    };

    get isValid() {
        let valid = true;

        this._id ? valid = true : valid = false;
        this._name ? valid = true : valid = false;
        this._geometry ? valid = true : valid = false;
        Array.isArray(this._affectedLayers) && (this._affectedLayers.length > 0) ? valid = true : valid = false;
        typeof this._metadata === 'object' ? valid = true : valid = false;
        Array.isArray(this._dateTimeValues) && (this._dateTimeValues.length > 0) ? valid = true : valid = false;
        Array.isArray(this._activeCells) && (this._activeCells.length > 0) ? valid = true : valid = false;

        return valid;
    }

    get hasObservationPoints() {
        return this._hasObservationPoints;
    }
}
