import SsmSubstance from '../../../../src/core/modflow/mt3d/SsmSubstance';

test('Create SsmSubstance with name, boundary, and values', () => {
    const substance = SsmSubstance.create('testName');
    expect(substance).toBeInstanceOf(SsmSubstance);
    expect(substance.name).toEqual('testName');
    expect(typeof substance.id).toBe('string');
    expect(substance.boundaryValues).toEqual([]);
});
