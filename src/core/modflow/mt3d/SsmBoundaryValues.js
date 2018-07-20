import Boundary from '../../boundaries/Boundary';

class SsmBoundaryValues {

    _affectedCells;
    _boundaryType;
    _boundaryId;
    _stressPeriodValues;

    static create(boundary, numberOfStressPeriods) {
        const value = new SsmBoundaryValues();

        if (!(boundary instanceof Boundary)) {
            throw new Error('Boundary must be from instance Boundary');
        }

        value._affectedCells = boundary.affectedCells;
        value._boundaryId = boundary.id;
        value._boundaryType = boundary.type;
        value._stressPeriodValues = new Array(numberOfStressPeriods).fill(0);
        return value;
    }

    static fromObject(obj) {
        const substance = new SsmBoundaryValues();
        substance._affectedCells = obj.affectedCells;
        substance._boundaryId = obj.boundaryId;
        substance._boundaryType = obj.boundaryType;
        substance._stressPeriodValues = obj.stressPeriodValues;
        return substance;
    }

    get affectedCells() {
        return this._affectedCells;
    }

    get boundaryId() {
        return this._boundaryId;
    }

    get boundaryType() {
        return this._boundaryType;
    }

    get stressPeriodValues() {
        return this._stressPeriodValues;
    }

    set stressPeriodValues(value) {
        this._stressPeriodValues = value;
    }

    get values() {
        return this.stressPeriodValues;
    }

    set values(value) {
        this.stressPeriodValues = value;
    }

    get toObject() {
        return {
            affectedCells: this.affectedCells,
            boundaryId: this.boundaryId,
            boundaryType: this.boundaryType,
            stressPeriodValues: this.stressPeriodValues,
        };
    }
}

export default SsmBoundaryValues;
