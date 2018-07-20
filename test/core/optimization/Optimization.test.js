import Optimization from '../../../src/core/optimization/Optimization';
import OptimizationParameters from '../../../src/core/optimization/OptimizationParameters';
import OptimizationObjective from '../../../src/core/optimization/OptimizationObjective';
import OptimizationConstraint from '../../../src/core/optimization/OptimizationConstraint';
import OptimizationObject from '../../../src/core/optimization/OptimizationObject';
import {defaultParameters} from './OptimizationParameters.test';
import {concentrationObjective, headObjective} from './OptimizationObjective.test';
import {optimizationObjects} from './OptimizationObject.test';
import {concentrationConstraint} from './OptimizationConstraint.test';

test('Create with Defaults', () => {
    const optimization = Optimization.fromDefaults();
    expect(optimization.parameters).toBeInstanceOf(OptimizationParameters);
    expect(Array.isArray(optimization.objectives)).toBeTruthy();
    expect(optimization.objectives.length).toBe(2);
    expect(Array.isArray(optimization.constraints)).toBeTruthy();
    expect(optimization.constraints.length).toBe(0);
    expect(Array.isArray(optimization.objects)).toBeTruthy();
    expect(optimization.objects.length).toBe(2);
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
    expect(optimization.objectives.length).toBe(3);
});

test('Add wrong Objective Type to Optimization', () => {
    const optimization = Optimization.fromDefaults();
    expect(() => {
        optimization.addObjective(OptimizationConstraint.fromObject(concentrationConstraint));
    }).toThrow();
});

test('Add Objects to Optimization', () => {
    const optimization = Optimization.fromDefaults();
    optimizationObjects.forEach(object => {
        optimization.addObject(OptimizationObject.fromObject(object));
    });
    expect(optimization.objects.length).toBe(4);
});
