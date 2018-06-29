import AdvPackage from '../../../../src/core/modflow/mt3d/advPackage';
import BtnPackage from '../../../../src/core/modflow/mt3d/btnPackage';
import DspPackage from '../../../../src/core/modflow/mt3d/dspPackage';
import GcgPackage from '../../../../src/core/modflow/mt3d/gcgPackage';
import Mt3dPackageFactory from '../../../../src/core/modflow/mt3d/Mt3dPackageFactory';
import MtPackage from '../../../../src/core/modflow/mt3d/mtPackage';
import SsmPackage from '../../../../src/core/modflow/mt3d/ssmPackage';

test('Create Adv-Package from Object', () => {
    const p = AdvPackage.fromDefault();
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject)).toBeInstanceOf(AdvPackage);
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject).toObject).toEqual(p.toObject);
});

test('Create Btn-Package from Object', () => {
    const p = BtnPackage.fromDefault();
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject)).toBeInstanceOf(BtnPackage);
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject).toObject).toEqual(p.toObject);
});

test('Create Dsp-Package from Object', () => {
    const p = DspPackage.fromDefault();
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject)).toBeInstanceOf(DspPackage);
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject).toObject).toEqual(p.toObject);
});

test('Create Gcg-Package from Object', () => {
    const p = GcgPackage.fromDefault();
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject)).toBeInstanceOf(GcgPackage);
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject).toObject).toEqual(p.toObject);
});

test('Create Mt-Package from Object', () => {
    const p = MtPackage.fromDefault();
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject)).toBeInstanceOf(MtPackage);
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject).toObject).toEqual(p.toObject);
});

test('Create Ssm-Package from Object', () => {
    const p = SsmPackage.fromDefault();
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject)).toBeInstanceOf(SsmPackage);
    expect(Mt3dPackageFactory.fromData(p.packageName, p.toObject).toObject).toEqual(p.toObject);
});

test('Create default Object', () => {
    expect(Mt3dPackageFactory.fromData('', {})).toBeNull();
});
