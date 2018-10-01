import OptimizationParameters from '../../../src/core/optimization/OptimizationParameters';

export const defaultParameters = {
    method: 'GA',
    ngen: 100,
    pop_size: 100,
    mutpb: 0.1,
    cxpb: 0.9,
    eta: 20,
    indpb: 0.1,
    initial_solution_id: null,
    ncls: 1,
    maxf: 50,
    qbound: 0.25,
    diversity_flg: false,
    xtol: 0.0001,
    ftol: 0.0001,
    report_frequency: 50
};

test('Create with Defaults', () => {
    const parameters = OptimizationParameters.fromDefaults();
    expect(parameters).toBeInstanceOf(OptimizationParameters);
    expect(parameters.toObject).toEqual(defaultParameters);
});

test('Create from Object', () => {
    const obj = {
        method: 'GA',
        ngen: 4,
        pop_size: 11,
        mutpb: 0.2,
        cxpb: 0.8,
        eta: 21,
        indpb: 0.15,
        initial_solution_id: null,
        ncls: 2,
        maxf: 11,
        qbound: 0.3,
        diversity_flg: false,
        xtol: 0.0001,
        ftol: 0.0001,
        report_frequency: 10
    };
    const parameters = OptimizationParameters.fromObject(obj);
    expect(parameters).toBeInstanceOf(OptimizationParameters);
    expect(parameters.toObject).toEqual(obj);
});

test('Create from empty object.', () => {
    const parameters = OptimizationParameters.fromObject({});
    expect(parameters).toBeInstanceOf(OptimizationParameters);
    expect(parameters.method).toBe('Simplex');
});

test('ApplyMinMax', () => {
    const parameters = OptimizationParameters.fromDefaults();
    expect(parameters.applyMinMax(50, parameters._ngen.min, parameters._ngen.max)).toBe(50);
    expect(parameters.applyMinMax(150, parameters._ngen.min, parameters._ngen.max)).toBe(150);
    expect(parameters.applyMinMax(NaN, parameters._ngen.min, parameters._ngen.max)).toBe(0);
    expect(parameters.applyMinMax(-100, parameters._ngen.min, parameters._ngen.max)).toBe(0);
    parameters.ncls = 5;
    parameters.popSize = 1;
    expect(parameters.popSize).toBe(5);
    parameters.reportFrequency = 1000;
    expect(parameters.reportFrequency).toEqual(parameters.popSize);
    expect(parameters.applyMinMax(10)).toEqual(10);
});
