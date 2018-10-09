import uuidv4 from 'uuid/v4';
import OptimizationProgress from "../../../src/core/optimization/OptimizationProgress";

const exampleProgress = {
    GA: {
        progress_log: [0, 1, 2, 3, 4],
        iteration: 1,
        iteration_total: 10,
        simulation: 5,
        simulation_total: 20,
        final: false
    },
    Simplex: {
        progress_log: [0, 1, 2, 3, 4],
        iteration: 5,
        iteration_total: 10,
        final: false
    }
};

test('Get progress from object.', () => {
    const progress = OptimizationProgress.fromObject(exampleProgress);
    expect(progress).toBeInstanceOf(OptimizationProgress);
    expect(progress.toObject).toEqual(exampleProgress);

    const nullProgress = OptimizationProgress.fromObject({
        GA: null,
        Simplex: null
    });
    expect(nullProgress.toObject).toEqual({
        GA: null,
        Simplex: null
    });
    expect(OptimizationProgress.fromObject(null).toObject).toEqual({
        GA: null,
        Simplex: null
    })
});

test('Calculate progress and toChartData.', () => {
    const progress = OptimizationProgress.fromObject(exampleProgress);
    expect(progress.GA.calculate()).toBe(2.5);
    expect(progress.GA.toChartData).toHaveLength(5);
    progress.GA.iterationTotal = 0;
    progress.GA.simulationTotal = 0;
    expect(progress.GA.calculate()).toBe(0);

    expect(progress.Simplex.calculate()).toBe(50);
    expect(progress.Simplex.toChartData).toHaveLength(5);
});

test('Getter and Setter', () => {
    const progress = OptimizationProgress.fromObject(exampleProgress);
    progress.GA.simulation = null;
    progress.GA.simulationTotal = null;
    progress.GA.iteration = null;
    progress.GA.iterationTotal = null;
    progress.GA.progressLog = null;
    progress.GA.final = null;
    progress.Simplex.progressLog = null;
    progress.Simplex.iteration = null;
    progress.Simplex.iterationTotal = null;
    progress.Simplex.final = null;
    expect(progress.toObject).toEqual({
        "GA": {
            "final": false,
            "iteration": 0,
            "iteration_total": 0,
            "progress_log": [],
            "simulation": 0,
            "simulation_total": 0
        },
        "Simplex": {
            "final": false,
            "iteration": 0,
            "iteration_total": 0,
            "progress_log": []
        }
    });
    progress.GA.final = true;
    progress.Simplex.final = true;
    expect(progress.toObject).toEqual({
        "GA": {
            "final": true,
            "iteration": 0,
            "iteration_total": 0,
            "progress_log": [],
            "simulation": 0,
            "simulation_total": 0
        },
        "Simplex": {
            "final": true,
            "iteration": 0,
            "iteration_total": 0,
            "progress_log": []
        }
    });
});