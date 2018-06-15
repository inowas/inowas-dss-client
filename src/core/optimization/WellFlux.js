class WellFlux {
    _stressPeriodIndex = {
        '0': [-200, -100]
    };

    static fromObject(obj) {
        const wellFlux = new WellFlux();
        wellFlux.stressPeriodIndex = obj.stress_period_index;
        return wellFlux;
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

export default WellFlux;
