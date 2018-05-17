/* eslint-disable camelcase */
import MultipleOPBoundary from './MultipleOPBoundary';
import BoundaryFactory from './BoundaryFactory';

const boundaryType = 'ghb';

export default class GeneralHeadBoundary extends MultipleOPBoundary {

    static createWithStartDate({id = null, name = null, geometry, utcIsoStartDateTime}) {
        return BoundaryFactory.createByTypeAndStartDate({id, name, type: boundaryType, geometry, utcIsoStartDateTime});
    }

    static createFromObject(objectData) {
        objectData.type = boundaryType;
        return BoundaryFactory.fromObjectData(objectData);
    }

    constructor() {
        super();

        // head—is the head on the boundary.
        const head = 0;
        // cond—is the hydraulic conductance of the interface between the aquifer cell and the boundary.
        const cond = 0;

        this._defaultValues = [head, cond];
        this._type = boundaryType;
    }

    get isValid() {
        let valid = super.isValid;
        this._type === boundaryType ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'LineString' ? valid = true : valid = false;
        return valid;
    }
}
