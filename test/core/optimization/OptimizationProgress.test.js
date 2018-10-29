import OptimizationProgress from "../../../src/core/optimization/OptimizationProgress";

const exampleProgress1 = {
    progress_log: [0, 1, 2, 3, 4],
    iteration: 1,
    iteration_total: 10,
    simulation: 5,
    simulation_total: 20,
    final: false
};

const exampleProgress2 = {
    progress_log: [0, 1, 2, 3, 4],
    iteration: 5,
    iteration_total: 10,
    final: false
};

test('Get progress from object.', () => {
    const progress = OptimizationProgress.fromObject(exampleProgress2);
    expect(progress).toBeInstanceOf(OptimizationProgress);
    expect(progress.toObject).toEqual({
        "final": false,
        "iteration": 5,
        "iteration_total": 10,
        "progress_log": [0, 1, 2, 3, 4],
        "simulation": 0,
        "simulation_total": 0
    });
});

test('Calculate progress and toChartData.', () => {
    const progress1 = OptimizationProgress.fromObject(exampleProgress1);
    expect(progress1.calculate()).toBe(2.5);
    expect(progress1.toChartData).toHaveLength(5);
    progress1.iterationTotal = 0;
    progress1.simulationTotal = 0;
    expect(progress1.calculate()).toBe(0);

    const progress2 = OptimizationProgress.fromObject(exampleProgress2);
    expect(progress2.calculate()).toBe(50);
    expect(progress2.toChartData).toHaveLength(5);
});

test('Getter and Setter', () => {
    const progress = OptimizationProgress.fromObject(exampleProgress1);
    progress.simulation = null;
    progress.simulationTotal = null;
    progress.iteration = null;
    progress.iterationTotal = null;
    progress.progressLog = null;
    progress.final = null;
    expect(progress.toObject).toEqual({
        "final": false,
        "iteration": 0,
        "iteration_total": 0,
        "progress_log": [],
        "simulation": 0,
        "simulation_total": 0
    });
    progress.final = true;
    expect(progress.toObject).toEqual({
        "final": true,
        "iteration": 0,
        "iteration_total": 0,
        "progress_log": [],
        "simulation": 0,
        "simulation_total": 0
    });
});