import SsmPackage from '../../../../src/core/modflow/mt3d/ssmPackage';
import SsmSubstance from '../../../../src/core/modflow/mt3d/SsmSubstance';
import {getSsmGhbBoundaryValues, getSsmWelBoundaryValues} from '../../../fixtures/mt3dms/boundaryValues';

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

test('Set/Get Unitnumber', () => {
    const ssm = SsmPackage.fromDefault();
    ssm.unitnumber = 123;
    expect(ssm.unitnumber).toEqual(123);
});

test('Can add, update and remove substances', () => {
    const ssm = SsmPackage.fromDefault();
    const substanceA = SsmSubstance.create('testSubstance_1');
    const substanceB = SsmSubstance.create('testSubstance_2');
    ssm.addSubstance(substanceA);
    ssm.addSubstance(substanceB);
    expect(ssm.substances.length).toBe(2);

    substanceA.name = 'newTestSubstance_1';
    ssm.updateSubstance(substanceA);
    expect(ssm.substances[0].name).toEqual('newTestSubstance_1');

    ssm.removeSubstance(substanceA.id);
    expect(ssm.substances.length).toBe(1);
    ssm.removeSubstance(substanceB.id);
    expect(ssm.substances.length).toBe(0);
});

test('It can add substances with boundaryValues', () => {
    const ssm = SsmPackage.fromDefault();
    const cadmium = SsmSubstance.create('cadmium');
    cadmium.updateBoundaryValues(getSsmGhbBoundaryValues());
    ssm.addSubstance(cadmium);

    const arsenic = SsmSubstance.create('arsenic');
    arsenic.updateBoundaryValues(getSsmWelBoundaryValues());
    ssm.addSubstance(arsenic);

    const chromium = SsmSubstance.create('chromium');
    const welBoundaryValues = getSsmWelBoundaryValues();
    welBoundaryValues.stressPeriodValues = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    chromium.updateBoundaryValues(welBoundaryValues);
    ssm.addSubstance(chromium);

    expect(ssm.stressPeriodData).toEqual([
        [
            [0, 4, 3, 1, 5, 1, 0, 0],
            [0, 5, 3, 1, 5, 1, 0, 0],
            [0, 6, 3, 1, 5, 1, 0, 0],
            [2, 4, 3, 1, 5, 1, 0, 0],
            [2, 5, 3, 1, 5, 1, 0, 0],
            [2, 6, 3, 1, 5, 1, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 10]
        ], [
            [0, 4, 3, 2, 5, 2, 0, 0],
            [0, 5, 3, 2, 5, 2, 0, 0],
            [0, 6, 3, 2, 5, 2, 0, 0],
            [2, 4, 3, 2, 5, 2, 0, 0],
            [2, 5, 3, 2, 5, 2, 0, 0],
            [2, 6, 3, 2, 5, 2, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 11]
        ], [
            [0, 4, 3, 3, 5, 3, 0, 0],
            [0, 5, 3, 3, 5, 3, 0, 0],
            [0, 6, 3, 3, 5, 3, 0, 0],
            [2, 4, 3, 3, 5, 3, 0, 0],
            [2, 5, 3, 3, 5, 3, 0, 0],
            [2, 6, 3, 3, 5, 3, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 12]
        ], [
            [0, 4, 3, 4, 5, 4, 0, 0],
            [0, 5, 3, 4, 5, 4, 0, 0],
            [0, 6, 3, 4, 5, 4, 0, 0],
            [2, 4, 3, 4, 5, 4, 0, 0],
            [2, 5, 3, 4, 5, 4, 0, 0],
            [2, 6, 3, 4, 5, 4, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 13]
        ], [
            [0, 4, 3, 5, 5, 5, 0, 0],
            [0, 5, 3, 5, 5, 5, 0, 0],
            [0, 6, 3, 5, 5, 5, 0, 0],
            [2, 4, 3, 5, 5, 5, 0, 0],
            [2, 5, 3, 5, 5, 5, 0, 0],
            [2, 6, 3, 5, 5, 5, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 14]
        ], [
            [0, 4, 3, 6, 5, 6, 0, 0],
            [0, 5, 3, 6, 5, 6, 0, 0],
            [0, 6, 3, 6, 5, 6, 0, 0],
            [2, 4, 3, 6, 5, 6, 0, 0],
            [2, 5, 3, 6, 5, 6, 0, 0],
            [2, 6, 3, 6, 5, 6, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 15]
        ], [
            [0, 4, 3, 7, 5, 7, 0, 0],
            [0, 5, 3, 7, 5, 7, 0, 0],
            [0, 6, 3, 7, 5, 7, 0, 0],
            [2, 4, 3, 7, 5, 7, 0, 0],
            [2, 5, 3, 7, 5, 7, 0, 0],
            [2, 6, 3, 7, 5, 7, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 16]
        ], [
            [0, 4, 3, 8, 5, 8, 0, 0],
            [0, 5, 3, 8, 5, 8, 0, 0],
            [0, 6, 3, 8, 5, 8, 0, 0],
            [2, 4, 3, 8, 5, 8, 0, 0],
            [2, 5, 3, 8, 5, 8, 0, 0],
            [2, 6, 3, 8, 5, 8, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 17]
        ], [
            [0, 4, 3, 9, 5, 9, 0, 0],
            [0, 5, 3, 9, 5, 9, 0, 0],
            [0, 6, 3, 9, 5, 9, 0, 0],
            [2, 4, 3, 9, 5, 9, 0, 0],
            [2, 5, 3, 9, 5, 9, 0, 0],
            [2, 6, 3, 9, 5, 9, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 18]
        ], [
            [0, 4, 3, 0, 5, 0, 0, 0],
            [0, 5, 3, 0, 5, 0, 0, 0],
            [0, 6, 3, 0, 5, 0, 0, 0],
            [2, 4, 3, 0, 5, 0, 0, 0],
            [2, 5, 3, 0, 5, 0, 0, 0],
            [2, 6, 3, 0, 5, 0, 0, 0],
            [2, 4, 3, 0, 2, 0, 1, 19]
        ]
    ]);
});

test('Add/Update substance not from type SsmSubstance throws error', () => {
    const ssm = SsmPackage.fromDefault();
    expect(() => {
        ssm.addSubstance('notASubstance');
    }).toThrow();
    expect(() => {
        ssm.updateSubstance('notASubstance');
    }).toThrow();
});

test('Update substance with unknown type throws Error', () => {
    const ssm = SsmPackage.fromDefault();
    expect(() => {
        ssm.updateSubstance('bId123', 0, 'testSubstance_1');
    }).toThrow();
});
