import Location from '../../../src/core/optimization/Location';

export const exampleLocation = {
    type: 'bbox',
    ts: {
        from: 0,
        to: 0
    },
    lay: {
        from: 0,
        to: 0
    },
    row: {
        from: 90,
        to: 90
    },
    col: {
        from: 90,
        to: 90
    },
    objects: []
};

test('Create from Object', () => {
    const location = Location.fromObject(exampleLocation);
    expect(location).toBeInstanceOf(Location);
    expect(location.toObject).toEqual(exampleLocation);
});
