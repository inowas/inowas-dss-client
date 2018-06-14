import OptimizationObjective from '../../../src/core/optimization/OptimizationObjective';

export const concentrationObjective = {
    'type': 'concentration',
    'conc_file_name': 'MT3D001.UCN',
    'summary_method': 'max',
    'weight': -1,
    'penalty_value': 999,
    'location': {
        'type': 'bbox',
        'ts': [0, 0],
        'lay': [0, 0],
        'row': [90, 90],
        'col': [90, 90]
    }
};

export const headObjective = {
    'type': 'head',
    'summary_method': 'max',
    'weight': -1,
    'penalty_value': 999,
    'location': {
        'type': 'object',
        'objects': [0, 1]
    }
};

test('Get concentration Objective from Object.', () => {
    const objective = OptimizationObjective.fromObject(concentrationObjective);
    expect(objective).toBeInstanceOf(OptimizationObjective);
    expect(objective.toObject).toEqual(concentrationObjective);
});

test('Get head Objective from Object.', () => {
    const objective = OptimizationObjective.fromObject(headObjective);
    expect(objective).toBeInstanceOf(OptimizationObjective);
    expect(objective.toObject).toEqual(headObjective);
});
