import Location from '../../../src/core/optimization/Location';

export const exampleLocation = {
    'type': 'bbox',
    'ts': [0, 0],
    'lay': [0, 0],
    'row': [90, 90],
    'col': [90, 90]
};

test('Create from Object', () => {
    const location  = Location.fromObject(exampleLocation);
    expect(location).toBeInstanceOf(Location);
    expect(location.toObject).toEqual(exampleLocation);
});
