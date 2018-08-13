import Optimization from '../../../src/core/optimization/Optimization';
import OptimizationResult from '../../../src/core/optimization/OptimizationResult';
import OptimizationInput from '../../../src/core/optimization/OptimizationInput';

test('Create with Defaults and toObject', () => {
    const optimization = Optimization.fromDefaults();
    optimization.id = '123-abc-456';
    optimization.input.id = '345-def-987';
    expect(optimization).toBeInstanceOf(Optimization);
    expect(optimization.toObject).toEqual({
        'id': '123-abc-456',
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
                'method': 'ga',
                'mutpb': 0.1,
                'ncls': 1,
                'ngen': 100,
                'pop_size': 100,
                'qbound': 0.25,
                'xtol': 0.0001
            }
        },
        'progress': [],
        'results': [],
        'state': 0
    });
});

test('Adding results', () => {
    const optimization = Optimization.fromDefaults();
    optimization.addResult(new OptimizationResult());
    expect(optimization.results).toHaveLength(1);
    expect(() => {
        optimization.addResult({});
    }).toThrow();
});

test('From object', () => {
    const opt = {
        input: OptimizationInput.fromDefaults().toObject,
        state: 2,
        progress: [1, 2, 3],
        results: [(new OptimizationResult).toObject, (new OptimizationResult).toObject]
    };
    const optimization = Optimization.fromObject(opt);
    expect(optimization).toBeInstanceOf(Optimization);
    expect(optimization.toObject.results).toHaveLength(2);
});
