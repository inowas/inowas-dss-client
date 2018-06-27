import Mt3dms from '../../../../src/core/modflow/mt3d/mt3dms';
import MtPackage from '../../../../src/core/modflow/mt3d/mtPackage';
import BtnPackage from '../../../../src/core/modflow/mt3d/btnPackage';
import AdvPackage from '../../../../src/core/modflow/mt3d/advPackage';
import DspPackage from '../../../../src/core/modflow/mt3d/dspPackage';
import GcgPackage from '../../../../src/core/modflow/mt3d/gcgPackage';
import SsmPackage from '../../../../src/core/modflow/mt3d/ssmPackage';

test('Create Mt3Dms', () => {
    const mt3dms = new Mt3dms();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
});

test('Set mt-package', () => {
    const mt3dms = new Mt3dms();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
    mt3dms.addPackage(MtPackage.fromDefault());
    expect(mt3dms.packages.mt).toEqual(MtPackage.fromDefault());
});

test('Mt3Ds toObject', () => {
    const mt3dms = new Mt3dms();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
    mt3dms.addPackage(MtPackage.fromDefault());
    expect(mt3dms.toObject).toEqual({
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

test('Not valid packages throws errors', () => {
    const mt3dms = new Mt3dms();
    expect(() => mt3dms.addPackage({}).toThrow());
});
