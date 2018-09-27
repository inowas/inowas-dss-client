import Optimization from '../../../src/core/optimization/Optimization';
import OptimizationInput from '../../../src/core/optimization/OptimizationInput';
import OptimizationSolution from "../../../src/core/optimization/OptimizationSolution";

test('Create with Defaults and toObject', () => {
    const optimization = Optimization.fromDefaults();
    optimization.input.id = '345-def-987';
    expect(optimization).toBeInstanceOf(Optimization);
    expect(optimization.toObject).toEqual({
        'id': '345-def-987',
        'input': {
            'constraints': [],
            'id': '345-def-987',
            'objectives': [],
            'objects': [],
            'parameters': {
                'cxpb': 0.9,
                'diversity_flg': false,
                'eta': 20,
                'ftol': 0.0001,
                'indpb': 0.1,
                'maxf': 50,
                'method': 'GA',
                'mutpb': 0.1,
                'ncls': 1,
                'ngen': 100,
                'pop_size': 100,
                'qbound': 0.25,
                'report_frequency': 50,
                'xtol': 0.0001
            }
            },
        'progress': {
            'final': false,
            'iteration': 0,
            'iteration_total': 0,
            'progress_log': [],
            'simulation': 0,
            'simulation_total': 0
        },
        'solutions': [],
        'state': 0
    });
});

test('Adding solutions', () => {
    const optimization = Optimization.fromDefaults();
    optimization.addSolution(new OptimizationSolution());
    expect(optimization.solutions).toHaveLength(1);
    expect(() => {
        optimization.addSolution({});
    }).toThrow();
});

test('From object', () => {
    const opt = {
        input: OptimizationInput.fromDefaults().toObject,
        state: 2,
        progress: [1, 2, 3],
        solutions: [(new OptimizationSolution).toObject, (new OptimizationSolution).toObject]
    };
    const optimization = Optimization.fromObject(opt);
    expect(optimization).toBeInstanceOf(Optimization);
    expect(optimization.toObject.solutions).toHaveLength(2);
});
