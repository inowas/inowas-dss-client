import Optimization from '../../../src/core/optimization/Optimization';
import OptimizationParameters from '../../../src/core/optimization/OptimizationParameters';
import OptimizationObjective from '../../../src/core/optimization/OptimizationObjective';
import OptimizationConstraint from '../../../src/core/optimization/OptimizationConstraint';
import OptimizationObject from '../../../src/core/optimization/OptimizationObject';
import {defaultParameters} from './Parameters.test';
import {concentrationObjective, headObjective} from './OptimizationObjective.test';
import {optimizationObjects} from './OptimizationObject.test';
import {concentrationConstraint} from './OptimizationConstraint.test';

test('Create with Defaults', () => {
    const optimization = Optimization.fromDefaults();
    expect(optimization.parameters).toBeInstanceOf(OptimizationParameters);
    expect(Array.isArray(optimization.objectives)).toBeTruthy();
    expect(optimization.objectives.length).toBe(0);
    expect(Array.isArray(optimization.constraints)).toBeTruthy();
    expect(optimization.constraints.length).toBe(0);
    expect(Array.isArray(optimization.objects)).toBeTruthy();
    expect(optimization.objects.length).toBe(0);
});

test('Create from Object', () => {
    const optimizationExample = {
        'parameters': defaultParameters,
        'constraints': [
            concentrationConstraint
        ],
        'objectives': [
            concentrationObjective,
            headObjective
        ],
        'objects': [
            optimizationObjects[0],
            optimizationObjects[1],
            optimizationObjects[2],
            optimizationObjects[3]
        ]
    };
    const optimization = Optimization.fromObject(optimizationExample);
    expect(optimization.toObject).toEqual(optimizationExample);
});

test('Add Constraint to Optimization', () => {
    const optimization = Optimization.fromDefaults();
    optimization.addConstraint(OptimizationConstraint.fromObject(concentrationConstraint));
    expect(optimization.constraints.length).toBe(1);
    expect(optimization.constraints[0].toObject).toEqual(concentrationConstraint);
});

test('Add wrong Contraint Type to Optimization', () => {
    const optimization = Optimization.fromDefaults();
    expect(() => {
        optimization.addConstraint(OptimizationObjective.fromObject(concentrationObjective));
    }).toThrow();
});

test('Add Objective to Optimization', () => {
    const optimization = Optimization.fromDefaults();
    optimization.addObjective(OptimizationObjective.fromObject(concentrationObjective));
    expect(optimization.objectives.length).toBe(1);
    expect(optimization.objectives[0].toObject).toEqual(concentrationObjective);
});

test('Add wrong Objective Type to Optimization', () => {
    const optimization = Optimization.fromDefaults();
    expect(() => {
        optimization.addObjective(OptimizationConstraint.fromObject(concentrationConstraint));
    }).toThrow();
});

test('Add Objects to Optimization', () => {
    const optimization = Optimization.fromDefaults();
    optimizationObjects.forEach((object) => {
        optimization.addObject(OptimizationObject.fromObject(object));
    });
    expect(optimization.objects.length).toBe(4);
    expect(optimization.objects[0].toObject).toEqual(optimizationObjects[0]);
});

test('Add wrong OptimizationObject Type to Optimization', () => {
    const optimization = Optimization.fromDefaults();
    expect(() => {
        optimization.addObject(OptimizationConstraint.fromObject(concentrationConstraint));
    }).toThrow();
});
