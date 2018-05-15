/* eslint-disable camelcase */
import Boundary from './Boundary';

export default class ConstantHeadBoundary extends Boundary {

    static createWithStartDate({id = null, name = null, geometry, utcIsoStartDateTime}) {
        return Boundary.createByTypeAndStartDate({id, name, type: 'rch', geometry, utcIsoStartDateTime});
    }

    static createFromObject(objectData) {
        objectData.type = 'chd';
        return super.fromObjectData(objectData);
    }

    constructor() {
        super();

        // Shead—is the head at the boundary at the start of the stress period.
        const sHead = 0;
        // Ehead—is the head at the boundary at the end of the stress period.
        const eHead = 0;

        this._defaultValues = [sHead, eHead];
        this._hasObservationPoints = true;
        this._type = 'chd';
    }

    get isValid() {
        let valid = super.isValid;
        this._type === 'chd' ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'LineString' ? valid = true : valid = false;
        return valid;
    }
}
