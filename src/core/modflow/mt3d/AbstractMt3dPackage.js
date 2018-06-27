class AbstractMt3dPackage {
    _packageName = '';

    constructor(packageName) {
        this._packageName = packageName;
    }

    get packageName() {
        return this._packageName;
    }
}

export default AbstractMt3dPackage;
