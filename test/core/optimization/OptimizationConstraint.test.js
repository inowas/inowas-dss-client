import OptimizationConstraint from '../../../src/core/optimization/OptimizationConstraint';

export const concentrationConstraint = {
    'type': 'concentration',
    'conc_file_name': 'MT3D001.UCN',
    'summary_method': 'max',
    'operator': 'less',
    'value': 2,
    'location': {
        'type': 'bbox',
        'ts': [0, 0],
        'lay': [0, 0],
        'row': [90, 90],
        'col': [90, 90]
    }
};

test('Get concentration Constraint from Object.', () => {
    const constraint = OptimizationConstraint.fromObject(concentrationConstraint);
    expect(constraint).toBeInstanceOf(OptimizationConstraint);
    expect(constraint.toObject).toEqual(concentrationConstraint);
});
