/* eslint-disable camelcase */
import Boundary from './Boundary';

export default class WellBoundary extends Boundary {

    static createWithStartDate({id = null, name = null, geometry, utcIsoStartDateTime}) {
        return Boundary.createByTypeAndStartDate({id, name, type: 'wel', geometry, utcIsoStartDateTime});
    }

    static createFromObject(objectData) {
        objectData.type = 'wel';
        return super.fromObjectData(objectData);
    }

    constructor() {
        super();
        this._defaultValues = [0];
        this._hasObservationPoints = false;
        this._metadata = {well_type: 'puw'};
        this._type = 'wel';
    }

    get wellType() {
        return (this._metadata && this._metadata.well_type) || 'puw';
    }

    set wellType(type) {
        this._metadata.well_type = type;
    }

    get isValid() {
        let valid = super.isValid;
        this._type === 'wel' ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'Point' ? valid = true : valid = false;
        return valid;
    }
}
