import OptimizationObject from '../../../src/core/optimization/OptimizationObject';
import Location from '../../../src/core/optimization/Location';
import uuidv4 from 'uuid/v4';
import WellPosition from "../../../src/core/optimization/WellPosition";

export const optimizationObjects = [
    {
        id: '1234-abcd-5678',
        name: 'Well 1',
        type: 'wel',
        position: new Location().toObject,
        numberOfStressPeriods: 2,
        flux: {
            '0': {
                id: uuidv4(),
                min: 720,
                max: 860
            },
            '1': {
                id: uuidv4(),
                min: 250,
                max: 500
            }
        },
        substances: [
            {
                id: 'component1',
                name: 'component1',
                data: [
                    {min: 0, max: 10},
                    {min: 10, max: 20}
                ]
            },
            {
                id: 'component2',
                name: 'component2',
                data: [
                    {min: 0, max: 10},
                    {min: 10, max: 20}
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Well 2',
        type: 'wel',
        position: new Location().toObject,
        numberOfStressPeriods: 2,
        flux: {
            '0': {
                id: uuidv4(),
                min: 450,
                max: 750
            },
            '1': {
                id: uuidv4(),
                min: 350,
                max: 600
            }
        },
        substances: [
            {
                id: 'component3',
                name: 'component3',
                data: [
                    {min: 0, max: 100},
                    {min: 0, max: 100}
                ]
            },
            {
                id: 'component4',
                name: 'component4',
                data: [
                    {min: 0, max: 100},
                    {min: 0, max: 100}
                ]
            }
        ]
    }
];

test('Create OptimizationObject', () => {
    const object = OptimizationObject.createFromTypeAndStressPeriods('wel', 5);
    expect(object).toBeInstanceOf(OptimizationObject);
    expect(object.type).toEqual('wel');
    expect(object.numberOfStressPeriods).toEqual(5);
    expect(object.flux).toEqual(
        {
            "0": {"max": 0, "min": 0, "result": null},
            "1": {"max": 0, "min": 0, "result": null},
            "2": {"max": 0, "min": 0, "result": null},
            "3": {"max": 0, "min": 0, "result": null},
            "4": {"max": 0, "min": 0, "result": null}
        }
    );
    expect(OptimizationObject.fromObject(object.toObject)).toEqual(object);
});

test('Getter and Setter', () => {
    const object = OptimizationObject.fromObject(optimizationObjects[0]);
    expect(object.id).toBe('1234-abcd-5678');
    expect(object.position).toEqual({
        "_col": {"max": 0, "min": 0},
        "_lay": {"max": 0, "min": 0},
        "_row": {"max": 0, "min": 0}
    });
    expect(object.concentration).toEqual({
        '0': {
            'component1': {'max': 10, 'min': 0, 'result': null},
            'component2': {'max': 10, 'min': 0, 'result': null}
        },
        '1': {
            'component1': {'max': 20, 'min': 10, 'result': null},
            'component2': {'max': 20, 'min': 10, 'result': null}
        }
    });
    object.substances = null;
    expect(object.substances).toHaveLength(0);
    object.position = null;
    expect(object.position).toBeInstanceOf(WellPosition);
    object.name = null;
    expect(object.name).toBe('New Optimization Object');
    object.name = 'Well 3';
    expect(object.name).toBe('Well 3');
    expect(() => {
        object.type = 'another type';
    }).toThrow();
});

test('Updating substances', () => {
    const object = new OptimizationObject();
    object.numberOfStressPeriods = 2;
    const substances = [
        {
            id: '123-456-789',
            name: 'NaCl',
            data: [
                {min: 10, max: 20},
                {min: 20, max: 30}
            ]
        },
        {
            id: 'abc-def-ghi',
            name: 'HCl',
            data: [
                {min: 30, max: 40, result: 35},
                {min: 40, max: 50, result: 35}
            ]
        }
    ];
    object.updateSubstances(substances);
    expect(object.concentration).toEqual({
        "0": {
            "HCl": {"max": 40, "min": 30, "result": 35},
            "NaCl": {"max": 20, "min": 10, "result": null}},
        "1": {
            "HCl": {"max": 50, "min": 40, "result": 35},
            "NaCl": {"max": 30, "min": 20, "result": null}
        }
    });
});

test('Updating flux', () => {
    const object = OptimizationObject.createFromTypeAndStressPeriods('wel', 3);
    const rows = {
        '0': {min: 0, max: 10, result: null},
        '1': {min: 1, max: 11, result: null},
        '2': {min: 2, max: 12, result: 8}
    };
    expect(object.updateFlux(rows).flux).toEqual({
        '0': {min: 0, max: 10, result: null},
        '1': {min: 1, max: 11, result: null},
        '2': {min: 2, max: 12, result: 8}
    });
});
