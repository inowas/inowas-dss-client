import OptimizationParameters from '../../../src/core/optimization/OptimizationParameters';

export const defaultParameters = {
    'ngen': 100,
    'pop_size': 100,
    'mutpb': 0.1,
    'cxpb': 0.9,
    'eta': 20,
    'indpb': 0.1,
    'ncls': 1,
    'nlocal': 0,
    'maxf': 50,
    'qbound': 0.25,
    'diversity_flg': false,
    'local_opt_flg': false,
    'refpoint': [0, 0]
};

test('Create with Defaults', () => {
    const parameters = OptimizationParameters.fromDefaults();
    expect(parameters).toBeInstanceOf(OptimizationParameters);
    expect(parameters.toObject).toEqual(defaultParameters);
});

test('Create from Object', () => {
    const obj = {
        'ngen': 4,
        'pop_size': 11,
        'mutpb': 0.2,
        'cxpb': 0.8,
        'eta': 21,
        'indpb': 0.15,
        'ncls': 2,
        'nlocal': 2,
        'maxf': 11,
        'qbound': 0.3,
        'diversity_flg': false,
        'local_opt_flg': false,
        'refpoint': [1, 1]
    };
    const parameters = OptimizationParameters.fromObject(obj);
    expect(parameters).toBeInstanceOf(OptimizationParameters);
    expect(parameters.toObject).toEqual(obj);
});

test('ApplyMinMax', () => {
    const parameters = OptimizationParameters.fromDefaults();
    expect(parameters.applyMinMax(50, parameters._ngen.min, parameters._ngen.max)).toBe(50);
    expect(parameters.applyMinMax(150, parameters._ngen.min, parameters._ngen.max)).toBe(100);
    expect(parameters.applyMinMax(-100, parameters._ngen.min, parameters._ngen.max)).toBe(1);
    parameters.ncls = 5;
    parameters.popSize = 1;
    expect(parameters.popSize).toBe(5);
});
