import OptimizationObject from '../../../src/core/optimization/OptimizationObject';
import WellPosition from '../../../src/core/optimization/WellPosition';
import uuidv4 from 'uuid/v4';

export const optimizationObjects = [
    {
        id: uuidv4(),
        name: 'Well 1',
        type: 'well',
        position: new WellPosition().toObject,
        flux: [
            {
                id: uuidv4(),
                min: 720,
                max: 860
            },
            {
                id: uuidv4(),
                min: 250,
                max: 500
            }
        ],
        concentration: [
            {
                component1: {
                    min: 0,
                    max: 10
                },
                component2: {
                    min: 10,
                    max: 20
                }
            },
            {
                component3: {
                    min: 20,
                    max: 30
                },
                component4: {
                    min: 30,
                    max: 40
                }
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Well 2',
        type: 'well',
        position: new WellPosition().toObject,
        flux: [
            {
                id: uuidv4(),
                min: 450,
                max: 750
            },
            {
                id: uuidv4(),
                min: 350,
                max: 600
            }
        ],
        concentration: [
            {
                component1: {
                    min: 2,
                    max: 12
                },
                component2: {
                    min: 12,
                    max: 22
                }
            },
            {
                component3: {
                    min: 22,
                    max: 32
                },
                component4: {
                    min: 32,
                    max: 42
                }
            }
        ]
    },
];

test('Get OptimizationsObject from Object.', () => {
    const object = OptimizationObject.fromObject(optimizationObjects[0]);
    expect(object).toBeInstanceOf(OptimizationObject);
    expect(object.toObject).toEqual(optimizationObjects[0]);
});

test('Updating flux data.', () => {
    const object = OptimizationObject.fromObject(optimizationObjects[1]);
    expect(object.addFlux(10, 30).flux.length).toBe(3);
    expect(object.removeFlux(1).flux.length).toBe(2);
    expect(object.updateFlux(object.flux[1].id, 900, 1000).flux[1].min).toBe(900);
});

test('Setter: name and type', () => {
    const object = OptimizationObject.fromObject(optimizationObjects[0]);
    object.name = null;
    expect(object.name).toBe('New Optimization Object');
    object.name = 'Well 3';
    expect(object.name).toBe('Well 3');
    object.type = null;
    expect(object.type).toBe('well');
    object.type = 'another type';
    expect(object.type).toBe('another type');
});
