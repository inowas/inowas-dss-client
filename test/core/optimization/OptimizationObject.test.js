import OptimizationObject from '../../../src/core/optimization/OptimizationObject';

export const optimizationObjects = [
    {
        'id': 0,
        'type': 'well',
        'position': {
            'row': [30, 150],
            'col': [30, 150],
            'lay': [0, 0]
        },
        'flux': {
            '0': [720, 720]
        },
        'concentration': {
            '0': [[0, 0]]
        }
    },
    {
        'id': 1,
        'type': 'well',
        'position': {
            'row': [30, 150],
            'col': [30, 150],
            'lay': [0, 0]
        },
        'flux': {
            '0': [720, 720]
        },
        'concentration': {
            '0': [[0, 0]]
        }
    },
    {
        'id': 2,
        'type': 'well',
        'position': {
            'row': [30, 150],
            'col': [30, 150],
            'lay': [0, 0]
        },
        'flux': {
            '0': [720, 720]
        },
        'concentration': {
            '0': [[0, 0]]
        }
    },
    {
        'id': 3,
        'type': 'well',
        'position': {
            'row': [109, 110],
            'col': [109, 110],
            'lay': [0, 0]
        },
        'flux': {
            '0': [-2160, -2160]
        }
    }
];

test('Get OptimizationsObject from Object.', () => {
    const object = OptimizationObject.fromObject(optimizationObjects[0]);
    expect(object).toBeInstanceOf(OptimizationObject);
    expect(object.toObject).toEqual(optimizationObjects[0]);
});
