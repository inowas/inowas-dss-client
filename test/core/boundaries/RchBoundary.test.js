import fs from 'fs';
import Uuid from 'uuid';
import {importBoundariesFromCsv} from '../../../src/core/import/CsvImporter';
import * as boundaryObjects from '../../fixtures/obj/boundaryObjects';
import {RechargeBoundary} from '../../../src/core/boundaries';

test('RchBoundary createWithStartDate', () => {
    const id = Uuid.v4();
    const name = 'NameOfBoundary';
    const geometry = {type: 'Polygon', coordinates: [[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]};
    const startDateTime = new Date('2015-01-02').toISOString();

    const boundary = RechargeBoundary.createWithStartDate({
        id,
        name,
        geometry,
        utcIsoStartDateTime: startDateTime
    });

    expect(boundary).toBeInstanceOf(RechargeBoundary);
    expect(boundary.id).toEqual(id);
    expect(boundary.name).toEqual(name);
    expect(boundary.geometry).toEqual(geometry);
    expect(boundary.affectedLayers).toEqual([0]);
    expect(boundary.metadata).toEqual({});
    expect(boundary.getDateTimeValues()).toEqual([{date_time: startDateTime, values: [0]}]);
    expect(boundary.getIndexedDateTimeValues()).toEqual([{id: 0, date_time: startDateTime, values: [0]}]);
    expect(boundary.activeCells).toBeNull();
});

test('Import RchBoundary from CSV', () => {
    const content = fs.readFileSync('test/fixtures/csv/rchBoundaries.csv', 'utf8');
    const boundaries = importBoundariesFromCsv(content);
    expect(Array.isArray(boundaries)).toBe(true);
    expect(boundaries.length).toBe(2);
    const rchBoundary1 = boundaries.filter(b => b.name === 'Recharge Boundary 1')[0];
    expect(rchBoundary1).toBeInstanceOf(RechargeBoundary);
    expect(rchBoundary1.name).toBe('Recharge Boundary 1');
    expect(rchBoundary1.geometry).toEqual({
        type: 'Polygon',
        coordinates: [
            [105.80670115581347, 20.96897765302136],
            [105.80080579955491, 20.97869487449211],
            [105.80249616611935, 20.978686921354154],
            [105.80670115581347, 20.96897765302136]
        ]
    });
    expect(rchBoundary1.affectedLayers).toEqual([1]);
    expect(rchBoundary1.metadata).toEqual({});
    expect(rchBoundary1.getDateTimeValues().length).toEqual(12);
    expect(rchBoundary1.getDateTimeValues()).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [0.0004]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [0.0005]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [0.0004]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [0.0003]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [0.0002]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [0.0003]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [0.0004]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [0.0005]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [0.0004]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [0.0003]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [0.0002]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [0.0003]}
    ]);
    const rchBoundary2 = boundaries.filter(b => b.name === 'Recharge Boundary 2')[0];
    expect(rchBoundary2).toBeInstanceOf(RechargeBoundary);
    expect(rchBoundary2.name).toBe('Recharge Boundary 2');
    expect(rchBoundary2.geometry).toEqual({
        type: 'Polygon',
        coordinates: [
            [105.80661571026738, 20.968972726743612],
            [105.80079969006613, 20.978685687496043],
            [105.802483130377, 20.978677767043365],
            [105.80669271094274, 20.9689813973438]
        ]
    });
    expect(rchBoundary2.getDateTimeValues().length).toEqual(12);
    expect(rchBoundary2.getDateTimeValues()).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [0.0003]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [0.0002]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [0.0003]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [0.0003]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [0.0002]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [0.0003]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [0.0004]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [0.0005]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [0.0004]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [0.0003]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [0.0002]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [0.0003]}
    ]);
});


test('Import a RchBoundary from File', () => {
    const boundaryObject = boundaryObjects.rchBoundary();
    expect(boundaryObject.hasOwnProperty('id')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('name')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('geometry')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('metadata')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('date_time_values')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('active_cells')).toBeTruthy();
});

test('Get RchBoundary from Object', () => {
    const boundaryObject = boundaryObjects.rchBoundary();
    const boundary = RechargeBoundary.createFromObject(boundaryObject);
    expect(boundary).toBeInstanceOf(RechargeBoundary);
    expect(boundary.toObject).toEqual(boundaryObject);
});
