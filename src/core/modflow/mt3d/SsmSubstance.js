import Uuid from 'uuid';
import SsmBoundaryValues from './SsmBoundaryValues';

class SsmSubstance {

    _id = '';
    _name = '';
    _boundaryValues = [];

    static create(name) {
        const substance = new SsmSubstance();
        substance._id = Uuid.v4();
        substance._name = name;
        return substance;
    }

    static fromObject(obj) {
        const substance = new SsmSubstance();
        substance._id = obj.id;
        substance._name = obj.name;
        substance._boundaryValues = obj.boundaryValues;
        return substance;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get boundaryValues() {
        return this._boundaryValues.map(bv => SsmBoundaryValues.fromObject(bv));
    }

    set boundaryValues(values) {
        this._boundaryValues = values.map(v => v.toObject);
    }

    getBoundaryValuesByBoundaryId(boundaryId) {
        const boundaryValues = this.boundaryValues.filter(bv => bv.boundaryId === boundaryId)[0];
        if (boundaryValues instanceof SsmBoundaryValues) {
            return boundaryValues;
        }
        return null;
    }

    updateBoundaryValues(ssmBoundaryValues) {
        if (!(ssmBoundaryValues instanceof SsmBoundaryValues)) {
            throw new Error('SsmBoundaryValues must be instanceof SsmBoundaryValues');
        }

        const boundaryValues = this.boundaryValues;

        if (boundaryValues.filter(bv => bv.boundaryId === ssmBoundaryValues.boundaryId).length === 0) {
            boundaryValues.push(ssmBoundaryValues);
            this.boundaryValues = boundaryValues;
            return;
        }

        this.boundaryValues = this.boundaryValues.map(bv => {
            if (bv.boundaryId === ssmBoundaryValues.boundaryId) {
                return ssmBoundaryValues;
            }
            return bv;
        });
    }

    removeBoundaryValues(boundaryId) {
        this.boundaryValues = this.boundaryValues.filter(bv => bv._boundaryId !== boundaryId);
    }

    get toObject() {
        return {
            id: this.id,
            name: this._name,
            boundaryValues: this._boundaryValues
        };
    }
}

export default SsmSubstance;
