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
    target: null,
    location: Location.fromObject(exampleLocation).toObject,
    location_1: Location.fromObject({}).toObject,
    location_2: Location.fromObject({}).toObject
};

export const headObjective = {
    id: uuidv4(),
    name: 'Head Objective',
    type: 'head',
    summary_method: 'max',
    weight: -1,
    penalty_value: 999,
    target: 500,
    location: Location.fromObject({
        'type': 'object',
        'objects': [0, 1]
    }).toObject,
    location_1: Location.fromObject({}).toObject,
    location_2: Location.fromObject({}).toObject
};

test('Get concentration objective from object.', () => {
    const objective = OptimizationObjective.fromObject(concentrationObjective);
    expect(objective).toBeInstanceOf(OptimizationObjective);
    expect(objective.toObject).toEqual(concentrationObjective);
    objective.location1 = null;
    objective.location2 = null;
    expect(objective.toObject.location1).toBeUndefined();
    expect(objective.toObject.location2).toBeUndefined();
});

test('Get head objective from object.', () => {
    const objective = OptimizationObjective.fromObject(headObjective);
    expect(objective).toBeInstanceOf(OptimizationObjective);
    expect(objective.toObject).toEqual(headObjective);
});

test('Create objective from empty object.', () => {
    const objective = OptimizationObjective.fromObject({});
    expect(objective).toBeInstanceOf(OptimizationObjective);
    expect(objective.name).toBe('New Optimization Objective');
    expect(objective.location).toEqual(new Location());
});

test('Setting type of objective.', () => {
    const objective = new OptimizationObjective();
    objective.type = 'flux';
    expect(objective.location.type).toEqual('object');
});
