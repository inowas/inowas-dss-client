import OptimizationProgress from "../../../src/core/optimization/OptimizationProgress";
import OptimizationSolution from "../../../src/core/optimization/OptimizationSolution";
import OptimizationMethod from "../../../src/core/optimization/OptimizationMethod";

const exampleMethod = {
    name: 'GA',
    solutions: [{
        id: 'test',
        fitness: [1, 2, 3],
        variables: [1, 2, 11],
        objects: []
    }],
    progress: (new OptimizationProgress()).toObject
};

test('Get method from object.', () => {
    const method = OptimizationMethod.fromObject(exampleMethod);
    expect(method).toBeInstanceOf(OptimizationMethod);
    expect(method.toObject).toEqual({
        "name": "GA",
        "progress": {
            "final": false,
            "iteration": 0,
            "iteration_total": 0,
            "progress_log": [],
            "simulation": 0,
            "simulation_total": 0
        },
        "solutions": [
            {
                "id": 'test',
                "fitness": [1, 2, 3],
                "variables": [1, 2, 11],
                "objects": []
            }
        ]
    });
});

test('Getter and Setter', () => {
    const method = OptimizationMethod.fromObject(exampleMethod);
    method.name = null;
    method.progress = null;
    method.solutions = null;
    expect(method.toObject).toEqual({
        "name": "",
        "progress": null,
        "solutions": []
    });
});

test('Add solution to Simplex method', () => {
    const method = new OptimizationMethod();
    method.name = 'Simplex';
    method.progress = OptimizationProgress.fromObject({
        progressLog: [],
        iteration: 0,
        iterationTotal: 10,
        final: false,
    });

    const solution = new OptimizationSolution();
    method.addSolution(solution);
    expect(method.solutions).toHaveLength(1);

    expect(() => {
        method.addSolution({});
    }).toThrow();
});