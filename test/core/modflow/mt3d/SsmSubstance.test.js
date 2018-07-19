import SsmSubstance from '../../../../src/core/modflow/mt3d/SsmSubstance';
import * as boundaryObjects from '../../../fixtures/obj/boundaryObjects';
import {WellBoundary} from '../../../../src/core/boundaries';

const createBoundary = () => WellBoundary.createFromObject(boundaryObjects.wellBoundary());

test('Create SsmSubstance with name, boundary, and values', () => {
    const substance = SsmSubstance.create('testName', createBoundary(), 6);
    expect(substance).toBeInstanceOf(SsmSubstance);
    expect(substance.affectedCells).toEqual([[4, 5, 0]]);
    expect(substance.name).toEqual('testName');
    expect(substance.values).toEqual([0, 0, 0, 0, 0, 0]);
    expect(substance.toObject).toEqual({
        affectedCells: [[4, 5, 0]],
        name: 'testName',
        values: [0, 0, 0, 0, 0, 0],
    });
});

test('SsmSubstance set values, toObject', () => {
    const substance = SsmSubstance.create('testName', createBoundary(), 6);
    substance.values = [1, 2, 3, 4, 5, 6];
    expect(substance.values).toEqual([1, 2, 3, 4, 5, 6]);
    substance.name = 'testName2';
    expect(substance.name).toEqual('testName2');
});

test('SsmSubstance fromObject', () => {
    const substance = SsmSubstance.fromObject({
        name: 'testName',
        values: [1, 2, 3, 4, 5, 6],
        affectedCells: [[1, 2, 3]]
    });
    expect(substance).toBeInstanceOf(SsmSubstance);
    expect(substance.name).toEqual('testName');
    expect(substance.values).toEqual([1, 2, 3, 4, 5, 6]);
    expect(substance.affectedCells).toEqual([[1, 2, 3]]);
});

