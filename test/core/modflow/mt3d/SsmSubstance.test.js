import SsmSubstance from '../../../../src/core/modflow/mt3d/SsmSubstance';

test('Create SsmSubstance with name and values', () => {
    const substance = SsmSubstance.create('testName', 6);
    expect(substance).toBeInstanceOf(SsmSubstance);
    expect(substance.name).toEqual('testName');
    expect(substance.values).toEqual([0, 0, 0, 0, 0, 0]);
    expect(substance.toObject).toEqual({
        name: 'testName',
        values: [0, 0, 0, 0, 0, 0]
    });
});

test('SsmSubstance set values, toObject', () => {
    const substance = SsmSubstance.create('testName', 6);
    substance.values = [1, 2, 3, 4, 5, 6];
    expect(substance.values).toEqual([1, 2, 3, 4, 5, 6]);
    expect(substance.toObject).toEqual({
        name: 'testName',
        values: [1, 2, 3, 4, 5, 6]
    });
});

test('SsmSubstance fromObject', () => {
    const substance = SsmSubstance.fromObject({
        name: 'testName',
        values: [1, 2, 3, 4, 5, 6]
    });
    expect(substance).toBeInstanceOf(SsmSubstance);
    expect(substance.name).toEqual('testName');
    expect(substance.values).toEqual([1, 2, 3, 4, 5, 6]);
});
