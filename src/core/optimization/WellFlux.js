class WellFlux {
    _flux = {
        0: {
            min: -200,
            max: -100,
            result: null
        },
        1: {
            min: -150,
            max: -50,
            result: null
        }
    };

    static fromObject(obj) {
        const wellFlux = new WellFlux();
        wellFlux.flux = obj.flux;
        return wellFlux;
    }

    constructor() {
    }


    get flux() {
        return this._flux;
    }

    set flux(value) {
        this._flux = value;
    }

    get toObject() {
        return {
            'flux': this.flux
        };
    }
}

export default WellFlux;
