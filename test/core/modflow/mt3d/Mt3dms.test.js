import Ajv from 'ajv';
import Mt3dms from '../../../../src/core/modflow/mt3d/mt3dms';
import AbstractMt3dPackage from '../../../../src/core/modflow/mt3d/AbstractMt3dPackage';
import MtPackage from '../../../../src/core/modflow/mt3d/mtPackage';
import BtnPackage from '../../../../src/core/modflow/mt3d/btnPackage';
import AdvPackage from '../../../../src/core/modflow/mt3d/advPackage';
import DspPackage from '../../../../src/core/modflow/mt3d/dspPackage';
import GcgPackage from '../../../../src/core/modflow/mt3d/gcgPackage';
import SsmPackage from '../../../../src/core/modflow/mt3d/ssmPackage';
import SsmSubstance from '../../../../src/core/modflow/mt3d/SsmSubstance';
import BoundaryFactory from '../../../../src/core/boundaries/BoundaryFactory';
import SsmBoundaryValues from '../../../../src/core/modflow/mt3d/SsmBoundaryValues';

test('Create Mt3Dms', () => {
    const mt3dms = new Mt3dms();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
});

test('Create Mt3Dms from defaults', () => {
    const mt3dms = Mt3dms.fromDefaults();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
});

test('It can enable, disable and toggleEnabled Mt3dms', () => {
    const mt3dms = Mt3dms.fromDefaults();
    expect(mt3dms.enabled).toEqual(false);
    mt3dms.enabled = true;
    expect(mt3dms.enabled).toEqual(true);
    mt3dms.toggleEnabled();
    expect(mt3dms.enabled).toEqual(false);
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


test('Test default mt3dms object against schema', () => {
    const mt3dms = Mt3dms.fromDefaults();
    const [result, errors] = mt3dms.validate();
    expect(errors).toEqual(null);
    expect(result).toBeTruthy();
});

test('Test mt3dms object with one substance against schema', () => {
    const mt3dms = Mt3dms.fromDefaults();
    mt3dms.enabled = true;
    const ssmPackage = SsmPackage.fromDefault();
    const substance = SsmSubstance.create('testName');

    const ghbBoundary = BoundaryFactory.fromType('ghb');
    ghbBoundary.affectedLayers = [0, 2];
    ghbBoundary.activeCells = [[3, 4], [3, 5], [3, 6]];

    const ssmBoundaryValues = SsmBoundaryValues.create(ghbBoundary, 10);
    ssmBoundaryValues.stressPeriodValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    substance.updateBoundaryValues(ssmBoundaryValues);
    ssmPackage.addSubstance(substance);

    const [result, errors] = mt3dms.validate();
    expect(errors).toEqual(null);
    expect(result).toBeTruthy();
});
