import SsmBoundaryValues from '../../../../src/core/modflow/mt3d/SsmBoundaryValues';
import {ghbBoundary} from '../../../fixtures/obj/boundaryObjects';
import BoundaryFactory from '../../../../src/core/boundaries/BoundaryFactory';

const boundary = BoundaryFactory.fromObjectData(ghbBoundary());

test('Create SsmBoundaryValues with boundary and numberOfStressPeriods', () => {
    const boundaryValues = SsmBoundaryValues.create(boundary, 10);
    expect(boundaryValues).toBeInstanceOf(SsmBoundaryValues);
    expect(boundaryValues.affectedCells.cells).toEqual([[5, 6, 0], [5, 7, 0], [5, 8, 0]]);
    expect(boundaryValues.boundaryId).toEqual(boundary.id);
    expect(boundaryValues.boundaryType).toEqual(boundary.type);
    expect(boundaryValues.stressPeriodValues).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(boundaryValues.values).toEqual(boundaryValues.stressPeriodValues);
    expect(boundaryValues.toObject).toEqual({
        'affectedCells': [[5, 6, 0], [5, 7, 0], [5, 8, 0]],
        'boundaryId': boundary.id,
        'boundaryType': 'ghb',
        'stressPeriodValues': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    });
    expect(SsmBoundaryValues.fromObject(boundaryValues.toObject)).toEqual(boundaryValues);
    expect(boundaryValues.toSsmPackageValues).toEqual(
        [[
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ], [
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ], [
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ], [
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ], [
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ], [
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ], [
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ], [
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ], [
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ], [
            [0, 6, 5, 0, 5],
            [0, 7, 5, 0, 5],
            [0, 8, 5, 0, 5]
        ]]
    );
});

test('FromObjectToObject', () => {
    const boundaryValues = SsmBoundaryValues.create(boundary, 10);
    expect(SsmBoundaryValues.fromObject(boundaryValues.toObject)).toEqual(boundaryValues);
});

test('GetSetStressPeriodValues', () => {
    const boundaryValues = SsmBoundaryValues.create(boundary, 10);
    boundaryValues.stressPeriodValues = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(boundaryValues.stressPeriodValues).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    boundaryValues.values = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(boundaryValues.stressPeriodValues).toEqual([1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
});

test('Create with invalid boundary throws Error', () => {
    expect(() => SsmBoundaryValues.create('notABoundary', 10)).toThrow();
});
