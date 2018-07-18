import AbstractMt3dPackage from './AbstractMt3dPackage';
import SsmSubstance from "./SsmSubstance";

class SsmPackage extends AbstractMt3dPackage {

    // SET stress_period_data
    // ssm_data[0] = [
    //      [4, 4, 4, 1.0, itype['GHB'], 1.0, 100.0)]
    // ]
    _crch = null;
    _cevt = null;
    _mxss = null;
    _stressPeriodData = null;
    _dtype = null;
    _extension = 'ssm';
    _unitnumber = null;
    _filenames = null;

    static fromDefault() {
        return new SsmPackage();
    }

    static fromObject(obj) {
        const ssm = new SsmPackage();
        ssm.metaDataFromObject(obj);
        ssm.crch = obj.crch;
        ssm.cevt = obj.cevt;
        ssm.mxss = obj.mxss;
        ssm.stressPeriodData = obj.stress_period_data;
        ssm.dtype = obj.dtype;
        ssm.extension = obj.extension;
        ssm.unitnumber = obj.unitnumber;
        ssm.filenames = obj.filenames;
        return ssm;
    }

    constructor() {
        super('ssm');
        this.substances = [];
    }

    get crch() {
        return this._crch;
    }

    set crch(value) {
        this._crch = value;
    }

    get cevt() {
        return this._cevt;
    }

    set cevt(value) {
        this._cevt = value;
    }

    get mxss() {
        return this._mxss;
    }

    set mxss(value) {
        this._mxss = value;
    }

    get stressPeriodData() {
        return this._stressPeriodData;
    }

    set stressPeriodData(value) {
        this._stressPeriodData = value;
    }

    get dtype() {
        return this._dtype;
    }

    set dtype(value) {
        this._dtype = value;
    }

    get extension() {
        return this._extension;
    }

    set extension(value) {
        this._extension = value;
    }

    get unitnumber() {
        return this._unitnumber;
    }

    set unitnumber(value) {
        this._unitnumber = value;
    }

    get filenames() {
        return this._filenames;
    }

    set filenames(value) {
        this._filenames = value;
    }

    set substances(substances) {
        this.setMetaDataItem('substances', substances);
    }

    get substances() {
        return this.getMetaDataItem('substances');
    }

    addSubstance(boundaryId, substance) {
        if (!(substance instanceof SsmSubstance)) {
            throw new Error('Substance has too be instance of SsmSubstance');
        }

        const substances = this.getMetaDataItem('substances');
        substances.push({
            boundaryId,
            substance: substance.toObject
        });

        this.setMetaDataItem('substances', substances);
    }

    updateSubstances(boundaryId, substances) {
        const filteredSubstances = this.getMetaDataItem('substances').filter(
            s => (s.boundaryId !== boundaryId)
        );
        this.setMetaDataItem('substances', filteredSubstances);
        substances.forEach(s => this.addSubstance(boundaryId, s));
    }

    removeSubstance(boundaryId, name) {
        const substances = this.getMetaDataItem('substances').filter(
            s => (s.boundaryId !== boundaryId || s.substance.name !== name)
        );
        this.setMetaDataItem('substances', substances);
    }

    getSubstancesByBoundaryId(boundaryId) {
        return this.getMetaDataItem('substances').filter(
            s => (s.boundaryId !== boundaryId)
        );
    }

    get toObject() {
        const obj = {
            crch: this.crch,
            cevt: this.cevt,
            mxss: this.mxss,
            stress_period_data: this.stressPeriodData,
            dtype: this.dtype,
            extension: this.extension,
            unitnumber: this.unitnumber,
            filenames: this.filenames
        };

        return {
            ...super.toObject,
            ...obj
        };
    }
}

export default SsmPackage;
