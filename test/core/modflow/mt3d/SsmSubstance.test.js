import SsmSubstance from '../../../../src/core/modflow/mt3d/SsmSubstance';
import {getSsmGhbBoundaryValues, getSsmWelBoundaryValues} from '../../../fixtures/mt3dms/boundaryValues';

test('Create SsmSubstance with name', () => {
    const substance = SsmSubstance.create('testName');
    expect(substance).toBeInstanceOf(SsmSubstance);
    expect(substance.name).toEqual('testName');
    expect(typeof substance.id).toBe('string');
    expect(substance.boundaryValuesList).toEqual([]);
});

test('Add/Update/Remove BoundaryValues', () => {
    const substance = SsmSubstance.create('testName');
    expect(substance).toBeInstanceOf(SsmSubstance);

    const ssmBoundaryValues = getSsmGhbBoundaryValues();
    substance.updateBoundaryValues(ssmBoundaryValues);
    expect(substance.boundaryValuesList.length).toBe(1);
    expect(substance.boundaryValuesList[0]).toEqual(ssmBoundaryValues);

    // We are adding another boundaryValues
    substance.updateBoundaryValues(getSsmGhbBoundaryValues());
    expect(substance.boundaryValuesList.length).toBe(2);

    ssmBoundaryValues.stressPeriodValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    substance.updateBoundaryValues(ssmBoundaryValues);
    expect(substance.getBoundaryValuesByBoundaryId(ssmBoundaryValues.boundaryId)).toEqual(ssmBoundaryValues);

    substance.removeBoundaryValues(ssmBoundaryValues.boundaryId);
    expect(substance.boundaryValuesList.length).toBe(1);
});

test('Set/Get id', () => {
    const substance = SsmSubstance.create('testName');
    substance.id = 'test';
    expect(substance.id).toEqual('test');
});

test('Set/Get name', () => {
    const substance = SsmSubstance.create('testName');
    substance.name = 'testName2';
    expect(substance.name).toEqual('testName2');
});

test('Set/Get BoundaryValuesList', () => {
    const substance = SsmSubstance.create('testName');
    expect(substance).toBeInstanceOf(SsmSubstance);

    const ssmBoundaryValues = getSsmGhbBoundaryValues();
    substance.boundaryValuesList = [ssmBoundaryValues];
    expect(substance.boundaryValuesList.length).toBe(1);
    expect(substance.boundaryValuesList[0]).toEqual(ssmBoundaryValues);
    expect(substance.boundaryValuesList).toEqual([ssmBoundaryValues]);
});

test('GetBoundaryValuesByBoundaryId', () => {
    const substance = SsmSubstance.create('testName');
    const ssmBoundaryValues = getSsmGhbBoundaryValues();
    substance.updateBoundaryValues(ssmBoundaryValues);
    expect(substance.getBoundaryValuesByBoundaryId(ssmBoundaryValues.boundaryId)).toEqual(ssmBoundaryValues);
    expect(substance.getBoundaryValuesByBoundaryId('notExistingBoundaryId')).toEqual(null);
});

test('ToObject/FromObject', () => {
    const substance = SsmSubstance.create('testName');
    const ssmBoundaryValues = getSsmGhbBoundaryValues();
    substance.updateBoundaryValues(ssmBoundaryValues);
    expect(substance.toObject).toEqual({
        'boundaryValues': [{
            'affectedCells': [
                [3, 4, 0],
                [3, 5, 0],
                [3, 6, 0],
                [3, 4, 2],
                [3, 5, 2],
                [3, 6, 2]
            ],
            'boundaryId': ssmBoundaryValues.boundaryId,
            'boundaryType': 'ghb',
            'stressPeriodValues': [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        }],
        'id': substance.id,
        'name': substance.name
    });

    expect(SsmSubstance.fromObject(substance.toObject)).toEqual(substance);
});

test('Update with false value throws error', () => {
    const substance = SsmSubstance.create('testName');
    expect(substance).toBeInstanceOf(SsmSubstance);
    expect(() => substance.updateBoundaryValues('wrongValue')).toThrow();
});

test('ToSsmPackageValues', () => {
    const substance = SsmSubstance.create('testName');
    expect(substance).toBeInstanceOf(SsmSubstance);
    substance.updateBoundaryValues(getSsmGhbBoundaryValues());
    substance.updateBoundaryValues(getSsmWelBoundaryValues());
    expect(substance.toSsmPackageValues).toEqual([
        [
            [0, 4, 3, 1, 5],
            [0, 5, 3, 1, 5],
            [0, 6, 3, 1, 5],
            [2, 4, 3, 1, 5],
            [2, 5, 3, 1, 5],
            [2, 6, 3, 1, 5]
        ], [
            [0, 4, 3, 2, 5],
            [0, 5, 3, 2, 5],
            [0, 6, 3, 2, 5],
            [2, 4, 3, 2, 5],
            [2, 5, 3, 2, 5],
            [2, 6, 3, 2, 5]
        ], [
            [0, 4, 3, 3, 5],
            [0, 5, 3, 3, 5],
            [0, 6, 3, 3, 5],
            [2, 4, 3, 3, 5],
            [2, 5, 3, 3, 5],
            [2, 6, 3, 3, 5]
        ], [
            [0, 4, 3, 4, 5],
            [0, 5, 3, 4, 5],
            [0, 6, 3, 4, 5],
            [2, 4, 3, 4, 5],
            [2, 5, 3, 4, 5],
            [2, 6, 3, 4, 5]
        ], [
            [0, 4, 3, 5, 5],
            [0, 5, 3, 5, 5],
            [0, 6, 3, 5, 5],
            [2, 4, 3, 5, 5],
            [2, 5, 3, 5, 5],
            [2, 6, 3, 5, 5]
        ], [
            [0, 4, 3, 6, 5],
            [0, 5, 3, 6, 5],
            [0, 6, 3, 6, 5],
            [2, 4, 3, 6, 5],
            [2, 5, 3, 6, 5],
            [2, 6, 3, 6, 5]
        ], [
            [0, 4, 3, 7, 5],
            [0, 5, 3, 7, 5],
            [0, 6, 3, 7, 5],
            [2, 4, 3, 7, 5],
            [2, 5, 3, 7, 5],
            [2, 6, 3, 7, 5]
        ], [
            [0, 4, 3, 8, 5],
            [0, 5, 3, 8, 5],
            [0, 6, 3, 8, 5],
            [2, 4, 3, 8, 5],
            [2, 5, 3, 8, 5],
            [2, 6, 3, 8, 5]
        ], [
            [0, 4, 3, 9, 5],
            [0, 5, 3, 9, 5],
            [0, 6, 3, 9, 5],
            [2, 4, 3, 9, 5],
            [2, 5, 3, 9, 5],
            [2, 6, 3, 9, 5]
        ], [
            [0, 4, 3, 0, 5],
            [0, 5, 3, 0, 5],
            [0, 6, 3, 0, 5],
            [2, 4, 3, 0, 5],
            [2, 5, 3, 0, 5],
            [2, 6, 3, 0, 5]
        ], [
            [2, 4, 3, 1, 2]
        ], [
            [2, 4, 3, 1, 2]
        ], [
            [2, 4, 3, 1, 2]
        ], [
            [2, 4, 3, 1, 2]
        ], [
            [2, 4, 3, 1, 2]
        ], [
            [2, 4, 3, 1, 2]
        ], [
            [2, 4, 3, 1, 2]
        ], [
            [2, 4, 3, 1, 2]
        ], [
            [2, 4, 3, 1, 2]
        ], [
            [2, 4, 3, 1, 2]
        ]
    ]);
});
