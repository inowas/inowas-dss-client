import OptimizationObject from '../../../src/core/optimization/OptimizationObject';
import WellPosition from '../../../src/core/optimization/WellPosition';
import uuidv4 from 'uuid/v4';

export const optimizationObjects = [
    {
        id: '1234-abcd-5678',
        name: 'Well 1',
        type: 'wel',
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
        concentrations: [
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
        type: 'wel',
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
        concentrations: [
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

test('Create OptimizationObject', () => {
    const object = OptimizationObject.createFromTypeAndStressperiods('wel', 5);
    expect(object).toBeInstanceOf(OptimizationObject);
    expect(object.type).toEqual('wel');
    expect(object.numberOfStressperiods).toEqual(5);
    expect(object.flux).toEqual([
        {'max': 0, 'min': 0, 'result': 0},
        {'max': 0, 'min': 0, 'result': 0},
        {'max': 0, 'min': 0, 'result': 0},
        {'max': 0, 'min': 0, 'result': 0},
        {'max': 0, 'min': 0, 'result': 0}
    ]);
    expect(OptimizationObject.fromObject(object.toObject)).toEqual(object);
});

test('Getter and Setter', () => {
    const object = OptimizationObject.fromObject(optimizationObjects[0]);
    expect(object.id).toBe('1234-abcd-5678');
    expect(object.position).toEqual({
        '_col': {'max': 150, 'min': 30, 'result': null},
        '_lay': {'max': 0, 'min': 0, 'result': null},
        '_row': {'max': 0, 'min': 0, 'result': null}
    });
    expect(object.concentrations).toEqual([{
        'component1': {'max': 10, 'min': 0},
        'component2': {'max': 20, 'min': 10}
    }, {
        'component3': {'max': 30, 'min': 20},
        'component4': {'max': 40, 'min': 30}
    }]);
    object.name = null;
    expect(object.name).toBe('New Optimization Object');
    object.name = 'Well 3';
    expect(object.name).toBe('Well 3');
    object.type = 'wel';
    expect(object.type).toBe('wel');
    expect(() => {
        object.type = 'another type';
    }).toThrow();
});

test('Adding, updating and removing substances', () => {
    const object = OptimizationObject.createFromTypeAndStressperiods('wel', 5);
    object.addSubstance('NaCl');
    object.addSubstance('Pb');
    expect(object.substances).toHaveLength(2);
    expect(object.concentrations).toHaveLength(2);
    expect(object.concentrations).toEqual([
        {
            'NaCl': [
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0}
            ]
        }, {
            'Pb': [
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0}
            ]
        }
    ]);
    object.updateSubstance({
        id: object.substances.filter(s => s.name === 'NaCl')[0].id,
        name: 'NaCl',
        data: [
            {'max': 100, 'min': 50, 'result': 0},
            {'max': 200, 'min': 50, 'result': 0},
            {'max': 300, 'min': 50, 'result': 0},
            {'max': 200, 'min': 50, 'result': 0},
            {'max': 100, 'min': 50, 'result': 0}
        ]
    });
    expect(object.concentrations).toEqual([
        {
            'NaCl': [
                {'max': 100, 'min': 50, 'result': 0},
                {'max': 200, 'min': 50, 'result': 0},
                {'max': 300, 'min': 50, 'result': 0},
                {'max': 200, 'min': 50, 'result': 0},
                {'max': 100, 'min': 50, 'result': 0}
            ]
        }, {
            'Pb': [
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0},
                {'max': 0, 'min': 0, 'result': 0}
            ]
        }
    ]);
    object.removeSubstance(object.substances.filter(s => s.name === 'NaCl')[0].id);
    expect(object.concentrations).toHaveLength(1);
});
