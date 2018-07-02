import Mt3dms from '../../../../src/core/modflow/mt3d/mt3dms';
import MtPackage from '../../../../src/core/modflow/mt3d/mtPackage';
import BtnPackage from '../../../../src/core/modflow/mt3d/btnPackage';
import AdvPackage from '../../../../src/core/modflow/mt3d/advPackage';
import DspPackage from '../../../../src/core/modflow/mt3d/dspPackage';
import GcgPackage from '../../../../src/core/modflow/mt3d/gcgPackage';
import SsmPackage from '../../../../src/core/modflow/mt3d/ssmPackage';
import AbstractMt3dPackage from '../../../../src/core/modflow/mt3d/AbstractMt3dPackage';

test('Create Mt3Dms', () => {
    const mt3dms = new Mt3dms();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
});

test('Create Mt3Dms from defaults', () => {
    const mt3dms = Mt3dms.fromDefaults();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
});

test('It can enable and disable Mt3dms', () => {
    const mt3dms = Mt3dms.fromDefaults();
    expect(mt3dms.enabled).toEqual(false);
    mt3dms.enabled = true;
    expect(mt3dms.enabled).toEqual(true);
    expect(mt3dms).toBeInstanceOf(Mt3dms);
});

test('Set mt-package', () => {
    const mt3dms = new Mt3dms();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
    mt3dms.addPackage(MtPackage.fromDefault());
    expect(mt3dms.packages.mt).toEqual(MtPackage.fromDefault());
});

test('Get mt-package', () => {
    const mt3dms = new Mt3dms();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
    mt3dms.addPackage(MtPackage.fromDefault());
    expect(mt3dms.getPackage('mt')).toEqual(MtPackage.fromDefault());
});

test('Get not available package throws an error', () => {
    const mt3dms = new Mt3dms();
    expect(() => mt3dms.getPackage('unknown')).toThrow();
});

test('Mt3Ds toObject', () => {
    const mt3dms = new Mt3dms();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
    mt3dms.addPackage(MtPackage.fromDefault());
    expect(mt3dms.toObject).toEqual({
        enabled: false,
        packages: ['mt', 'btn', 'adv', 'dsp', 'gcg', 'ssm'],
        run_model: true,
        write_input: true,
        mt: MtPackage.fromDefault().toObject,
        btn: BtnPackage.fromDefault().toObject,
        adv: AdvPackage.fromDefault().toObject,
        dsp: DspPackage.fromDefault().toObject,
        gcg: GcgPackage.fromDefault().toObject,
        ssm: SsmPackage.fromDefault().toObject
    });
});

test('Mt3Ds fromObject', () => {
    const mt3dmsObj = new Mt3dms().toObject;
    const mt3dms = Mt3dms.fromObject(mt3dmsObj);
    expect(mt3dms).toBeInstanceOf(Mt3dms);
});

test('Not valid packages throws errors', () => {
    const mt3dms = new Mt3dms();
    expect(() => mt3dms.addPackage('string')).toThrow();
    expect(() => mt3dms.addPackage(new AbstractMt3dPackage)).toThrow();
});
