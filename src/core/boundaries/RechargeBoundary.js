import BoundaryFactory from './BoundaryFactory';
import SingleOPBoundary from './SingleOPBoundary';

const boundaryType = 'rch';

export default class RechargeBoundary extends SingleOPBoundary {

    static createWithStartDate({id = null, name = null, geometry, utcIsoStartDateTime}) {
        return BoundaryFactory.createByTypeAndStartDate({id, name, type: boundaryType, geometry, utcIsoStartDateTime});
    }

    static createFromObject(objectData) {
        objectData.type = boundaryType;
        return BoundaryFactory.fromObjectData(objectData);
    }

    constructor() {
        super();
        this._defaultValues = [0];
        this._type = boundaryType;
    }

    get isValid() {
        let valid = super.isValid;
        this._type === boundaryType ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'Polygon' ? valid = true : valid = false;
        return valid;
    }
}
