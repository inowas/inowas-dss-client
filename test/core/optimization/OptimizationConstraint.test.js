import OptimizationConstraint from '../../../src/core/optimization/OptimizationConstraint';
import Location from '../../../src/core/optimization/Location';
import { exampleLocation } from './Location.test';

export const concentrationConstraint = {
    'type': 'concentration',
    'conc_file_name': 'MT3D001.UCN',
    'summary_method': 'max',
    'operator': 'less',
    'value': 2,
    'location': Location.fromObject(exampleLocation)
};

test('Get concentration Constraint from Object.', () => {
    const constraint = OptimizationConstraint.fromObject(concentrationConstraint);
    expect(constraint).toBeInstanceOf(OptimizationConstraint);
    expect(constraint.toObject).toEqual(concentrationConstraint);
});
