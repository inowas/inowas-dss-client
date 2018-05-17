import SingleOPBoundary from './SingleOPBoundary';
import BoundaryFactory from './BoundaryFactory';

const boundaryType = 'wel';

export default class WellBoundary extends SingleOPBoundary {

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
        this._metadata = {well_type: 'puw'};
        this._type = boundaryType;
    }

    get wellType() {
        return (this._metadata && this._metadata.well_type) || 'puw';
    }

    set wellType(type) {
        this._metadata.well_type = type;
    }

    get isValid() {
        let valid = super.isValid;
        this._type === boundaryType ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'Point' ? valid = true : valid = false;
        return valid;
    }
}
