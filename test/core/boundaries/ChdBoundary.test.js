import fs from 'fs';
import Uuid from 'uuid';
import {importBoundariesFromCsv} from '../../../src/core/import/CsvImporter';
import * as boundaryObjects from '../../fixtures/obj/boundaryObjects';
import {ConstantHeadBoundary, RechargeBoundary} from '../../../src/core/boundaries';

test('ChdBoundary createWithStartDate', () => {
    const id = Uuid.v4();
    const name = 'NameOfBoundary';
    const geometry = {type: 'LineString', coordinates: [[0, 0], [0, 10], [10, 10], [10, 0]]};
    const startDateTime = new Date('2015-01-02').toISOString();

    const boundary = ConstantHeadBoundary.createWithStartDate({
        id,
        name,
        geometry,
        utcIsoStartDateTime: startDateTime
    });

    expect(boundary).toBeInstanceOf(ConstantHeadBoundary);
    expect(boundary.id).toEqual(id);
    expect(boundary.name).toEqual(name);
    expect(boundary.geometry).toEqual(geometry);
    expect(boundary.affectedLayers).toEqual([0]);
    expect(boundary.metadata).toEqual({});
    expect(boundary.getDateTimeValues()).toEqual([{date_time: startDateTime, values: [0, 0]}]);
    expect(boundary.getIndexedDateTimeValues()).toEqual([{id: 0, date_time: startDateTime, values: [0, 0]}]);
    expect(boundary.activeCells).toBeNull();
});

test('Import ChdBoundary from CSV', () => {
    const content = fs.readFileSync('test/fixtures/csv/chdBoundaries.csv', 'utf8');

    const boundaries = importBoundariesFromCsv(content);
    expect(Array.isArray(boundaries)).toBe(true);
    expect(boundaries.length).toBe(2);
    const chdBoundary1 = boundaries.filter(b => b.name === 'Constant Head 1')[0];
    expect(chdBoundary1).toBeInstanceOf(ConstantHeadBoundary);
    expect(chdBoundary1.name).toBe('Constant Head 1');
    expect(chdBoundary1.geometry).toEqual({
        type: 'LineString',
        coordinates: [
            [105.80670115581347, 20.96897765302136],
            [105.80080579955491, 20.97869487449211],
            [105.80249616611935, 20.978686921354154]
        ]
    });

    const observationPointsChd1 = chdBoundary1.observationPoints;
    expect(observationPointsChd1.length).toBe(2);
    expect(observationPointsChd1.filter(op => op.id === 'CHD1_south').length).toBe(1);
    expect(observationPointsChd1.filter(op => op.id === 'CHD1_north').length).toBe(1);
    expect(chdBoundary1.getDateTimeValues('CHD1_south').length).toBe(12);
    expect(chdBoundary1.getDateTimeValues('CHD1_south')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [230, 230]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [230, 230]}]
    );
    expect(chdBoundary1.getDateTimeValues('CHD1_north').length).toBe(12);
    expect(chdBoundary1.getDateTimeValues('CHD1_north')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [240, 240]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [240, 240]}]
    );

    const chdBoundary2 = boundaries.filter(b => b.name === 'Constant Head 2')[0];
    expect(chdBoundary2).toBeInstanceOf(ConstantHeadBoundary);
    expect(chdBoundary2.name).toBe('Constant Head 2');
    expect(chdBoundary2.geometry).toEqual({
        type: 'LineString',
        coordinates: [
            [105.80661571026738, 20.968972726743612],
            [105.80079973820523, 20.97869472228025],
            [105.80249279827451, 20.978686756516314]
        ]
    });

    const observationPointsChd2 = chdBoundary2.observationPoints;
    expect(observationPointsChd2.length).toBe(2);
    expect(observationPointsChd2.filter(op => op.id === 'CHD2_south').length).toBe(1);
    expect(observationPointsChd2.filter(op => op.id === 'CHD2_north').length).toBe(1);
    expect(chdBoundary2.getDateTimeValues('CHD2_south').length).toBe(12);
    expect(chdBoundary2.getDateTimeValues('CHD2_south')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [231, 231]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [231, 231]}]
    );
    expect(chdBoundary2.getDateTimeValues('CHD2_north').length).toBe(12);
    expect(chdBoundary2.getDateTimeValues('CHD2_north')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [241, 241]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [241, 241]}]
    );
});

test('Import a ChdBoundary from File', () => {
    const boundaryObject = boundaryObjects.chdBoundary();
    expect(boundaryObject.hasOwnProperty('id')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('name')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('geometry')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('metadata')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('observation_points')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('active_cells')).toBeTruthy();
});

test('Get ChdBoundary from Object', () => {
    const boundaryObject = boundaryObjects.chdBoundary();
    const boundary = ConstantHeadBoundary.createFromObject(boundaryObject);
    expect(boundary).toBeInstanceOf(ConstantHeadBoundary);
    expect(boundary.toObject).toEqual(boundaryObject);
});
