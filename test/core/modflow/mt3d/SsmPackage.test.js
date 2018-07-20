import SsmPackage from '../../../../src/core/modflow/mt3d/ssmPackage';
import SsmSubstance from '../../../../src/core/modflow/mt3d/SsmSubstance';
import * as boundaryObjects from '../../../fixtures/obj/boundaryObjects';
import {WellBoundary} from '../../../../src/core/boundaries';

const createBoundary = () => WellBoundary.createFromObject(boundaryObjects.wellBoundary());

test('Get SsmPackage from Default', () => {
    const ssm = SsmPackage.fromDefault();
    expect(ssm).toBeInstanceOf(SsmPackage);
    expect(ssm.packageName).toEqual('ssm');
    expect(ssm.crch).toEqual(null);
    expect(ssm.cevt).toEqual(null);
    expect(ssm.mxss).toEqual(null);
    expect(ssm.stressPeriodData).toEqual(null);
    expect(ssm.dtype).toEqual(null);
    expect(ssm.extension).toEqual('ssm');
    expect(ssm.unitnumber).toEqual(null);
    expect(ssm.filenames).toEqual(null);
});

test('Get SsmPackage from Object', () => {
    const ssmObj = {
        _meta: {package_name: 'ssm'},
        crch: null,
        cevt: null,
        mxss: null,
        stress_period_data: null,
        dtype: null,
        extension: 'ssm',
        unitnumber: null,
        filenames: null
    };
    const ssm = SsmPackage.fromObject(ssmObj);
    expect(ssm.toObject).toEqual(ssmObj);
});

test('Can add and remove and update substances', () => {
    const ssm = SsmPackage.fromDefault();
    ssm.addSubstance(SsmSubstance.create('testSubstance_1'));
    ssm.addSubstance(SsmSubstance.create('testSubstance_2'));
    expect(ssm.substances.length).toBe(2);
});

test('Add substance not from type SsmSubstance throws error', () => {
    const ssm = SsmPackage.fromDefault();
    expect(() => {
        ssm.addSubstance('bId123', 'testSubstance_1', 5);
    }).toThrow();
});

test('Update substance with unknown type throws Error', () => {
    const ssm = SsmPackage.fromDefault();
    expect(() => {
        ssm.updateSubstance('bId123', 0, 'testSubstance_1');
    }).toThrow();
});

test('Update substance from unknown BoundaryId throws error', () => {
    const ssm = SsmPackage.fromDefault();
    expect(() => {
        ssm.updateSubstance('bId123', 0, SsmSubstance.create('testSubstance_1', createBoundary(), 4));
    }).toThrow();
});
