class WellConcentration {
    _stressPeriodIndex = {
        '0': [[0, 0.1], [0, 0.1]]
    };

    static fromObject(obj) {
        const wellConcentration = new WellConcentration();
        wellConcentration.stressPeriodIndex = obj.stress_period_index;
        return wellConcentration;
    }

    constructor() {}

    get stressPeriodIndex() {
        return this._stressPeriodIndex;
    }

    set stressPeriodIndex(value) {
        this._stressPeriodIndex = value;
    }

    get toObject() {
        return {
            'stress_period_index': this.stressPeriodIndex
        };
    }
}

export default WellConcentration;
