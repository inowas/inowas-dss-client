import OptimizationInput from '../../../src/core/optimization/OptimizationInput';
import OptimizationParameters from '../../../src/core/optimization/OptimizationParameters';
import OptimizationObjective from '../../../src/core/optimization/OptimizationObjective';
import OptimizationConstraint from '../../../src/core/optimization/OptimizationConstraint';
import OptimizationObject from '../../../src/core/optimization/OptimizationObject';
import {concentrationObjective} from './OptimizationObjective.test';
import {optimizationObjects} from './OptimizationObject.test';
import {concentrationConstraint} from './OptimizationConstraint.test';

test('Create with Defaults and toObject', () => {
    const optimization = OptimizationInput.fromDefaults();
    expect(OptimizationInput.fromObject(optimization.toObject)).toBeInstanceOf(OptimizationInput);
    expect(optimization.parameters).toBeInstanceOf(OptimizationParameters);
    expect(Array.isArray(optimization.objectives)).toBeTruthy();
    expect(optimization.objectives.length).toBe(0);
    expect(Array.isArray(optimization.constraints)).toBeTruthy();
    expect(optimization.constraints.length).toBe(0);
    expect(Array.isArray(optimization.objects)).toBeTruthy();
    expect(optimization.objects.length).toBe(0);
});

test('Add Constraint to Optimization', () => {
    const optimization = OptimizationInput.fromDefaults();
    optimization.addConstraint(OptimizationConstraint.fromObject(concentrationConstraint));
    expect(optimization.constraints.length).toBe(1);
    expect(optimization.constraints[0].toObject).toEqual(concentrationConstraint);
});

test('Add wrong Contraint Type to Optimization', () => {
    const optimization = OptimizationInput.fromDefaults();
    expect(() => {
        optimization.addConstraint(OptimizationObjective.fromObject(concentrationObjective));
    }).toThrow();
});

test('Add Objective to Optimization', () => {
    const optimization = OptimizationInput.fromDefaults();
    optimization.addObjective(OptimizationObjective.fromObject(concentrationObjective));
    expect(optimization.objectives.length).toBe(1);
});

test('Add wrong Objective Type to Optimization', () => {
    const optimization = OptimizationInput.fromDefaults();
    expect(() => {
        optimization.addObjective(OptimizationConstraint.fromObject(concentrationConstraint));
    }).toThrow();
});

test('Add Objects to Optimization', () => {
    const optimization = OptimizationInput.fromDefaults();
    optimizationObjects.forEach(object => {
        optimization.addObject(OptimizationObject.fromObject(object));
    });
    expect(optimization.objects.length).toBe(2);
});

test('Add wrong Object to Optimization', () => {
    const optimization = OptimizationInput.fromDefaults();
    expect(() => {
        optimization.addObject(OptimizationConstraint.fromObject(concentrationConstraint));
    }).toThrow();
});

test('From Object', () => {
    const obj = {
        parameters: OptimizationParameters.fromDefaults().toObject,
        objects: [(new OptimizationObject()).toObject, (new OptimizationObject()).toObject],
        objectives: [(new OptimizationObjective()).toObject, (new OptimizationObjective()).toObject],
        constraints: [(new OptimizationConstraint()).toObject, (new OptimizationConstraint()).toObject],
    };
    const input = OptimizationInput.fromObject(obj);
    expect(input).toBeInstanceOf(OptimizationInput);
    expect(input.toObject.objects).toHaveLength(2);
    expect(OptimizationInput.fromObject(null)).toBeInstanceOf(OptimizationInput);
});
