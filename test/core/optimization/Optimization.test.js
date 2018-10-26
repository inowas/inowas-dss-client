import Optimization from '../../../src/core/optimization/Optimization';
import OptimizationInput from '../../../src/core/optimization/OptimizationInput';
import OptimizationMethod from "../../../src/core/optimization/OptimizationMethod";

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
                'initial_solution_id': null,
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
        'methods': [],
        'state': 0
    });
});

test('Adding methods', () => {
    const optimization = Optimization.fromDefaults();
    optimization.addMethod(new OptimizationMethod());
    expect(optimization.methods).toHaveLength(1);
    expect(() => {
        optimization.addMethod({});
    }).toThrow();
});

test('Getter and Setter', () => {
    const optimization = Optimization.fromDefaults();
    optimization.methods = null;
    expect(optimization.methods).toBeInstanceOf(Array);
    optimization.methods = [new OptimizationMethod()];
    expect(optimization.methods).toHaveLength(1);
    optimization.state = null;
    expect(optimization.state).toEqual(0);
    optimization.input = null;
    expect(optimization.input).toEqual({});
});

test('From object', () => {
    const opt = {
        input: OptimizationInput.fromDefaults().toObject,
        state: 2,
        methods: [(new OptimizationMethod()).toObject, (new OptimizationMethod()).toObject]
    };
    const optimization = Optimization.fromObject(opt);
    expect(optimization).toBeInstanceOf(Optimization);
    expect(optimization.toObject.methods).toHaveLength(2);
});

test('Validate optimization', () => {
    const optimization = Optimization.fromDefaults();
    expect(optimization.validate()).toBeInstanceOf(Array);
});