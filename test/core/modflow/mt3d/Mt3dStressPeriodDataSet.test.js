import Mt3dStressPeriodDataSet from '../../../../src/core/modflow/mt3d/Mt3dStressPeriodDataSet';

test('Create new with Array', () => {
    const arr = [1, 2, 3, 4.0, 'GHB'];
    const mt3dStressPeriodDataSet = new Mt3dStressPeriodDataSet(arr);
    expect(mt3dStressPeriodDataSet).toBeInstanceOf(Mt3dStressPeriodDataSet);
    expect(mt3dStressPeriodDataSet.layer).toEqual(1);
    expect(mt3dStressPeriodDataSet.row).toEqual(2);
    expect(mt3dStressPeriodDataSet.column).toEqual(3);
    expect(mt3dStressPeriodDataSet.concentrations).toEqual([4.0]);
    expect(mt3dStressPeriodDataSet.itype).toEqual('GHB');
});

test('Create new with Array with multiple concentrations', () => {
    const arr = [1, 2, 3, 4.0, 1, 5.0, 6.0, 7.0];
    const mt3dStressPeriodDataSet = new Mt3dStressPeriodDataSet(arr);
    expect(mt3dStressPeriodDataSet).toBeInstanceOf(Mt3dStressPeriodDataSet);
    expect(mt3dStressPeriodDataSet.layer).toEqual(1);
    expect(mt3dStressPeriodDataSet.row).toEqual(2);
    expect(mt3dStressPeriodDataSet.column).toEqual(3);
    expect(mt3dStressPeriodDataSet.concentrations).toEqual([5.0, 6.0, 7.0]);
    expect(mt3dStressPeriodDataSet.itype).toEqual(1);
});

test('Create from Array', () => {
    const arr = [1, 2, 3, 4.0, 'GHB', 5.0, 100.0];
    expect(new Mt3dStressPeriodDataSet(arr)).toEqual(Mt3dStressPeriodDataSet.fromArray(arr));
});

test('Method toArray', () => {
    const arr1 = [1, 2, 3, 5.0, 'GHB', 5.0, 100.0];
    expect(new Mt3dStressPeriodDataSet(arr1).toArray).toEqual(arr1);

    const arr2 = [1, 2, 3, 5.0, 'GHB'];
    expect(new Mt3dStressPeriodDataSet(arr2).toArray).toEqual(arr2);
});

test('Invalid array throws error', () => {
    expect(() => new Mt3dStressPeriodDataSet({})).toThrow();
    expect(() => new Mt3dStressPeriodDataSet([])).toThrow();
});
