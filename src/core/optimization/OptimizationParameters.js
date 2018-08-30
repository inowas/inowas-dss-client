class OptimizationParameters {

    _method = {value: 'GA'};
    _ngen = {value: 100, parse: (x) => parseInt(x, 10), min: 1, max: 100};
    _ncls = {value: 1, parse: (x) => parseInt(x, 10), min: 1, max: 10};
    _popSize = {value: 100, parse: (x) => parseInt(x, 10), min: 2, max: 100};
    _mutpb = {value: 0.1, parse: (x) => parseFloat(x), min: 0, max: 1};
    _cxpb = {value: 0.9, parse: (x) => parseFloat(x), min: 0, max: 1};
    _eta = {value: 20, parse: (x) => parseFloat(x), min: 1, max: 30};
    _indpb = {value: 0.1, parse: (x) => parseFloat(x), min: 0, max: 1};
    _maxf = {value: 50, parse: (x) => parseInt(x, 10), min: 1, max: 200};
    _qbound = {value: 0.25, parse: (x) => parseFloat(x), min: 0, max: 1};
    _xtol = {value: 0.0001, parse: (x) => parseFloat(x), min: 0, max: 1};
    _ftol = {value: 0.0001, parse: (x) => parseFloat(x), min: 0, max: 1};
    _diversityFlg = {value: false};

    static fromDefaults() {
        return new OptimizationParameters();
    }

    static fromObject(obj) {
        const parameters = new OptimizationParameters();
        parameters.method = obj.method;
        parameters.ngen = obj.ngen;
        parameters.popSize = obj.pop_size;
        parameters.mutpb = obj.mutpb;
        parameters.cxpb = obj.cxpb;
        parameters.eta = obj.eta;
        parameters.indpb = obj.indpb;
        parameters.ncls = obj.ncls;
        parameters.maxf = obj.maxf;
        parameters.qbound = obj.qbound;
        parameters.xtol = obj.xtol;
        parameters.ftol = obj.ftol;
        parameters.diversityFlg = obj.diversity_flg;
        return parameters;
    }

    constructor() {
    }

    get method() {
        return this._method.value;
    }

    set method(value) {
        switch (value) {
            case 'GA':
                this._method.value = 'GA';
                break;
            default:
                this._method.value = 'Simplex';
                break;
        }
    }

    get ngen() {
        return this._ngen.value;
    }

    set ngen(value) {
        this._ngen.value = this.applyMinMax(this._ngen.parse(value), this._ngen.min, this._ngen.max);
    }

    get popSize() {
        return this._popSize.value;
    }

    set popSize(value) {
        this._popSize.value = this.applyMinMax(this._popSize.parse(value), (this._ncls.value < 2 ? 2 : this._ncls.value), this._popSize.max);
    }

    get mutpb() {
        return this._mutpb.value;
    }

    set mutpb(value) {
        this._mutpb.value = this.applyMinMax(this._mutpb.parse(value), this._mutpb.min, this._mutpb.max);
    }

    get cxpb() {
        return this._cxpb.value;
    }

    set cxpb(value) {
        this._cxpb.value = this.applyMinMax(this._cxpb.parse(value), this._cxpb.min, this._cxpb.max);
    }

    get eta() {
        return this._eta.value;
    }

    set eta(value) {
        this._eta.value = this.applyMinMax(this._eta.parse(value), this._eta.min, this._eta.max);
    }

    get indpb() {
        return this._indpb.value;
    }

    set indpb(value) {
        this._indpb.value = this.applyMinMax(this._indpb.parse(value), this._indpb.min, this._indpb.max);
    }

    get ncls() {
        return this._ncls.value;
    }

    set ncls(value) {
        this._ncls.value = this.applyMinMax(this._ncls.parse(value), this._ncls.min, this._ncls.max);
        this._popSize.value = this.applyMinMax(this._popSize.value, (this._ncls.value < 2 ? 2 : this._ncls.value), this._popSize.max);
    }

    get maxf() {
        return this._maxf.value;
    }

    set maxf(value) {
        this._maxf.value = this.applyMinMax(this._maxf.parse(value), this._maxf.min, this._maxf.max);
    }

    get qbound() {
        return this._qbound.value;
    }

    set qbound(value) {
        this._qbound.value = this.applyMinMax(this._qbound.parse(value), this._qbound.min, this._qbound.max);
    }

    get xtol() {
        return this._xtol.value;
    }

    set xtol(value) {
        this._xtol.value = this.applyMinMax(this._xtol.parse(value), this._xtol.min, this._xtol.max);
    }

    get ftol() {
        return this._ftol.value;
    }

    set ftol(value) {
        this._ftol.value = this.applyMinMax(this._ftol.parse(value), this._ftol.min, this._ftol.max);
    }

    get diversityFlg() {
        return this._diversityFlg.value;
    }

    set diversityFlg(value) {
        this._diversityFlg.value = value;
    }

    applyMinMax = (value, min, max) => {
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        if (isNaN(value)) {
            return min;
        }
        return value;
    };

    get toObject() {
        return ({
            'method': this.method,
            'ngen': this.ngen,
            'pop_size': this.popSize,
            'mutpb': this.mutpb,
            'cxpb': this.cxpb,
            'eta': this.eta,
            'indpb': this.indpb,
            'ncls': this.ncls,
            'maxf': this.maxf,
            'qbound': this.qbound,
            'xtol': this.xtol,
            'ftol': this.ftol,
            'diversity_flg': this.diversityFlg,
        });
    }
}

export default OptimizationParameters;
