import OptimizationObjective from '../../../src/core/optimization/OptimizationObjective';
import {exampleLocation} from './Location.test';
import Location from '../../../src/core/optimization/Location';
import uuidv4 from 'uuid/v4';

export const concentrationObjective = {
    id: uuidv4(),
    name: 'Concentration Objective',
    type: 'concentration',
    conc_file_name: 'MT3D001.UCN',
    summary_method: 'max',
    weight: -1,
    penalty_value: 999,
    location: Location.fromObject(exampleLocation).toObject
};

export const headObjective = {
    id: uuidv4(),
    name: 'Head Objective',
    type: 'head',
    summary_method: 'max',
    weight: -1,
    penalty_value: 999,
    location: Location.fromObject({
        'type': 'object',
        'objects': [0, 1]
    }).toObject
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
