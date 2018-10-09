import uuidv4 from 'uuid/v4';
import OptimizationObject from '../../../src/core/optimization/OptimizationObject';
import OptimizationSolution from '../../../src/core/optimization/OptimizationSolution';

export const exampleSolution = {
    id: uuidv4(),
    fitness: [1, 2, 3],
    variables: [1, 2, 11],
    objects: [(new OptimizationObject()).toObject, (new OptimizationObject()).toObject]
};

test('Get optimization solution from object.', () => {
    const solution = OptimizationSolution.fromObject(exampleSolution);
    expect(solution).toBeInstanceOf(OptimizationSolution);
    expect(solution.toObject).toEqual(exampleSolution);
    solution.id = null;
    expect(solution.id).toHaveLength(36);
});

test('Add objects to solution.', () => {
    const solution = new OptimizationSolution();
    solution.addObject(new OptimizationObject());
    expect(solution.objects).toHaveLength(1);
    expect(() => {
        solution.addObject({});
    }).toThrow();
    solution.objects = [new OptimizationObject(), new OptimizationObject()];
    expect(solution.objects).toHaveLength(2);
});
