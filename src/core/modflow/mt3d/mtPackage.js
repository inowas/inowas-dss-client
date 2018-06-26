import AbstractMt3dPackage from './AbstractMt3dPackage';

class MtPackage extends AbstractMt3dPackage {

    _modelname = 'mt';
    _namefileExt = 'nam';
    _exeName = 'mt3dms';
    _modelWs = '.';
    _ftlfilename = 'mt3d_link.ftl';
    _version = 'mt3dms';
    _verbose = false;

    static fromDefault() {
        return new MtPackage();
    }

    static fromObject(obj) {
        const mt = new MtPackage();
        mt.modelname = obj.modelname;
        mt.namefileExt = obj.namefile_ext;
        mt.exeName = obj.exe_name;
        mt.modelWs = obj.model_ws;
        mt.ftlfilename = obj.ftlfilename;
        mt.version = obj.version;
        mt.verbose = obj.verbose;
        return mt;
    }

    constructor() {
        super();
        this._packageName = 'mt';
    }

    get modelname() {
        return this._modelname;
    }

    set modelname(value) {
        this._modelname = value;
    }

    get namefileExt() {
        return this._namefileExt;
    }

    set namefileExt(value) {
        this._namefileExt = value;
    }

    get exeName() {
        return this._exeName;
    }

    set exeName(value) {
        this._exeName = value;
    }

    get modelWs() {
        return this._modelWs;
    }

    set modelWs(value) {
        this._modelWs = value;
    }

    get ftlfilename() {
        return this._ftlfilename;
    }

    set ftlfilename(value) {
        this._ftlfilename = value;
    }

    get version() {
        return this._version;
    }

    set version(value) {
        this._version = value;
    }

    get verbose() {
        return this._verbose;
    }

    set verbose(value) {
        this._verbose = value;
    }

    get toObject() {
        return {
            modelname: this._modelname,
            namefile_ext: this._namefileExt,
            exe_name: this._exeName,
            model_ws: this._modelWs,
            ftlfilename: this._ftlfilename,
            version: this._version,
            verbose: this._verbose
        };
    }
}

export default MtPackage;
