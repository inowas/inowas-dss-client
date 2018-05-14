/* eslint-disable camelcase */
import Boundary from './Boundary';

export default class RechargeBoundary extends Boundary {

    static createWithStartDate({id = null, name = null, geometry, utcIsoStartDateTime}) {
        return Boundary.createByTypeAndStartDate({id, name, type: 'rch', geometry, utcIsoStartDateTime});
    }

    static createFromObject(objectData) {
        objectData.type = 'rch';
        return super.fromObjectData(objectData);
    }

    constructor() {
        super();
        this._defaultValues = [0];
        this._hasObservationPoints = false;
        this._type = 'rch';
    }

    get isValid() {
        let valid = super.isValid;
        this._type === 'rch' ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'Polygon' ? valid = true : valid = false;
        return valid;
    }
}
