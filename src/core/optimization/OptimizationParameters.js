class OptimizationParameters {

    _ngen = {value: 100, parse: (x) => parseInt(x, 10), min: 1, max: 100};
    _ncls = {value: 1, parse: (x) => parseInt(x, 10), min: 1, max: 10};
    _popSize = {value: 100, parse: (x) => parseInt(x, 10), min: 2, max: 100};
    _mutpb = {value: 0.1, parse: (x) => parseFloat(x), min: 0, max: 1};
    _cxpb = {value: 0.9, parse: (x) => parseFloat(x), min: 0, max: 1};
    _eta = {value: 20, parse: (x) => parseFloat(x), min: 1, max: 30};
    _indpb = {value: 0.1, parse: (x) => parseFloat(x), min: 0, max: 1};
    _nlocal = {value: 0, parse: (x) => parseInt(x, 10), min: 0, max: 100};
    _maxf = {value: 50, parse: (x) => parseInt(x, 10), min: 1, max: 200};
    _qbound = {value: 0.25, parse: (x) => parseFloat(x), min: 0, max: 1};
    _diversityFlg = {value: false};
    _localOptFlg = {value: false};
    _refpoint = {value: [0, 0]};

    static fromDefaults() {
        return new OptimizationParameters();
    }

    static fromObject(obj) {
        const parameters = new OptimizationParameters();
        parameters.ngen = obj.ngen;
        parameters.popSize = obj.pop_size;
        parameters.mutpb = obj.mutpb;
        parameters.cxpb = obj.cxpb;
        parameters.eta = obj.eta;
        parameters.indpb = obj.indpb;
        parameters.ncls = obj.ncls;
        parameters.nlocal = obj.nlocal;
        parameters.maxf = obj.maxf;
        parameters.qbound = obj.qbound;
        parameters.diversityFlg = obj.diversity_flg;
        parameters.localOptFlg = obj.local_opt_flg;
        parameters.refpoint = obj.refpoint;
        return parameters;
    }

    constructor() {}

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
        this._nlocal.value = this.applyMinMax(this._nlocal.value, this._nlocal.min, this._popSize.value);
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

    get nlocal() {
        return this._nlocal.value;
    }

    set nlocal(value) {
        this._nlocal.value = this.applyMinMax(this._nlocal.parse(value), this._nlocal.min, this._popSize.value);
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

    get diversityFlg() {
        return this._diversityFlg.value;
    }

    set diversityFlg(value) {
        this._diversityFlg.value = value;
    }

    get localOptFlg() {
        return this._localOptFlg.value;
    }

    set localOptFlg(value) {
        this._localOptFlg.value = value;
    }

    get refpoint() {
        return this._refpoint.value;
    }

    set refpoint(value) {
        this._refpoint.value = value;
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
            'ngen': this.ngen,
            'pop_size': this.popSize,
            'mutpb': this.mutpb,
            'cxpb': this.cxpb,
            'eta': this.eta,
            'indpb': this.indpb,
            'ncls': this.ncls,
            'nlocal': this.nlocal,
            'maxf': this.maxf,
            'qbound': this.qbound,
            'diversity_flg': this.diversityFlg,
            'local_opt_flg': this.localOptFlg,
            'refpoint': this.refpoint
        });
    }
}

export default OptimizationParameters;
