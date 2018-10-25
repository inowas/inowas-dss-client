import WellPosition from '../../../src/core/optimization/WellPosition';

const examplePosition = {
    lay: {
        min: 0,
        max: 2,
        result: 1
    },
    row: {
        min: 2,
        max: 10,
        result: 5
    },
    col: {
        min: 2,
        max: 10,
        result: 6
    }
};

test('Get well position from object.', () => {
    const position = WellPosition.fromObject(examplePosition);
    expect(position).toBeInstanceOf(WellPosition);
    expect(position.toObject).toEqual(examplePosition);
});

test('Getter and Setter', () => {
    const position = new WellPosition();
    position.lay = null;
    position.row = null;
    position.col = null;
    expect(position).toEqual({
        "_col": {
            "max": 0,
            "min": 0,
            "result": null
        },
        "_lay": {
            "max": 0,
            "min": 0,
            "result": null
        },
        "_row": {
            "max": 0,
            "min": 0,
            "result": null}
    });
    position.lay = {max: 10, min: 5, result: null};
    position.col = {max: 20, min: 0, result: null};
    position.row = {max: 10, min: 0, result: 6};
    expect(position).toEqual({
        "_col": {
            "max": 20,
            "min": 0,
            "result": null
        },
        "_lay": {
            "max": 10,
            "min": 5,
            "result": null
        },
        "_row": {
            "max": 10,
            "min": 0,
            "result": 6}
    });
});
