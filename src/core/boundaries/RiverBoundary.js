import MultipleOPBoundary from './MultipleOPBoundary';
import BoundaryFactory from './BoundaryFactory';

const boundaryType = 'riv';

export default class RiverBoundary extends MultipleOPBoundary {

    static createWithStartDate({id = null, name = null, geometry, utcIsoStartDateTime}) {
        return BoundaryFactory.createByTypeAndStartDate({id, name, type: boundaryType, geometry, utcIsoStartDateTime});
    }

    static createFromObject(objectData) {
        objectData.type = boundaryType;
        return BoundaryFactory.fromObjectData(objectData);
    }

    constructor() {
        super();

        // Stage—is the head in the river.
        const stage = 0;
        // Cond—is the riverbed hydraulic conductance.
        const cond = 0;
        // Rbot—is the elevation of the bottom of the riverbed.
        const rBot = 0;

        this._defaultValues = [stage, cond, rBot];
        this._type = boundaryType;
    }

    get isValid() {
        let valid = super.isValid;
        this._type === boundaryType ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'LineString' ? valid = true : valid = false;
        return valid;
    }
}
