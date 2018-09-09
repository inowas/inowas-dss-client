import OptimizationConstraint from '../../../src/core/optimization/OptimizationConstraint';
import Location from '../../../src/core/optimization/Location';
import { exampleLocation } from './Location.test';
import uuidv4 from 'uuid/v4';

export const concentrationConstraint = {
    'id': uuidv4(),
    'name': 'Constraint 1',
    'type': 'concentration',
    'conc_file_name': 'MT3D001.UCN',
    'summary_method': 'max',
    'operator': 'less',
    'value': 2,
    'location': Location.fromObject(exampleLocation).toObject,
    'location_1': (new Location).toObject,
    'location_2': (new Location).toObject,
};

test('Get concentration Constraint from Object.', () => {
    const constraint = OptimizationConstraint.fromObject(concentrationConstraint);
    expect(constraint).toBeInstanceOf(OptimizationConstraint);
    expect(constraint.toObject).toEqual(concentrationConstraint);
    expect(constraint.location1).toBeInstanceOf(Location);
    expect(constraint.location2).toBeInstanceOf(Location);
});

test('Create constraint from empty object.', () => {
    const constraint = OptimizationConstraint.fromObject({});
    expect(constraint).toBeInstanceOf(OptimizationConstraint);
    expect(constraint.name).toBe('New Optimization Constraint');
});
