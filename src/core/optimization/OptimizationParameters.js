class OptimizationParameters {

    _ngen = 5;
    _popSize = 10;
    _mutpb = 0.1;
    _cxpb = 0.9;
    _eta = 20;
    _indpb = 0.2;
    _ncls = 3;
    _nlocal = 1;
    _maxf = 10;
    _qbound = 0.25;
    _diversityFlg = true;
    _localOptFlg = true;
    _refpoint = [0, 0];

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
        return this._ngen;
    }

    set ngen(value) {
        this._ngen = value;
    }

    get popSize() {
        return this._popSize;
    }

    set popSize(value) {
        this._popSize = value;
    }

    get mutpb() {
        return this._mutpb;
    }

    set mutpb(value) {
        this._mutpb = value;
    }

    get cxpb() {
        return this._cxpb;
    }

    set cxpb(value) {
        this._cxpb = value;
    }

    get eta() {
        return this._eta;
    }

    set eta(value) {
        this._eta = value;
    }

    get indpb() {
        return this._indpb;
    }

    set indpb(value) {
        this._indpb = value;
    }

    get ncls() {
        return this._ncls;
    }

    set ncls(value) {
        this._ncls = value;
    }

    get nlocal() {
        return this._nlocal;
    }

    set nlocal(value) {
        this._nlocal = value;
    }

    get maxf() {
        return this._maxf;
    }

    set maxf(value) {
        this._maxf = value;
    }

    get qbound() {
        return this._qbound;
    }

    set qbound(value) {
        this._qbound = value;
    }

    get diversityFlg() {
        return this._diversityFlg;
    }

    set diversityFlg(value) {
        this._diversityFlg = value;
    }

    get localOptFlg() {
        return this._localOptFlg;
    }

    set localOptFlg(value) {
        this._localOptFlg = value;
    }

    get refpoint() {
        return this._refpoint;
    }

    set refpoint(value) {
        this._refpoint = value;
    }

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
