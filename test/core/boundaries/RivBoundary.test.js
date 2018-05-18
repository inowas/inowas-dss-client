import fs from 'fs';
import Uuid from 'uuid';
import {importBoundariesFromCsv} from '../../../src/core/import/CsvImporter';
import * as boundaryObjects from '../../fixtures/obj/boundaryObjects';
import RiverBoundary from '../../../src/core/boundaries/RiverBoundary';

test('RivBoundary createWithStartDate', () => {
    const id = Uuid.v4();
    const name = 'NameOfBoundary';
    const geometry = {type: 'LineString', coordinates: [[0, 0], [0, 10], [10, 10], [10, 0]]};
    const startDateTime = new Date('2015-01-02').toISOString();

    const boundary = RiverBoundary.createWithStartDate({
        id,
        name,
        geometry,
        utcIsoStartDateTime: startDateTime
    });

    expect(boundary).toBeInstanceOf(RiverBoundary);
    expect(boundary.id).toEqual(id);
    expect(boundary.name).toEqual(name);
    expect(boundary.geometry).toEqual(geometry);
    expect(boundary.affectedLayers).toEqual([0]);
    expect(boundary.metadata).toEqual({});
    expect(boundary.getDateTimeValues()).toEqual([{date_time: startDateTime, values: [0, 0, 0]}]);
    expect(boundary.getIndexedDateTimeValues()).toEqual([{id: 0, date_time: startDateTime, values: [0, 0, 0]}]);
    expect(boundary.activeCells).toBeNull();
});

test('Import RivBoundary from CSV', () => {
    const content = fs.readFileSync('test/fixtures/csv/rivBoundaries.csv', 'utf8');

    const boundaries = importBoundariesFromCsv(content);
    expect(Array.isArray(boundaries)).toBe(true);
    expect(boundaries.length).toBe(2);
    const RivBoundary1 = boundaries.filter(b => b.name === 'River 1')[0];
    expect(RivBoundary1).toBeInstanceOf(RiverBoundary);
    expect(RivBoundary1.name).toBe('River 1');
    expect(RivBoundary1.geometry).toEqual({
        type: 'LineString',
        coordinates: [
            [105.80670115581347, 20.96897765302136],
            [105.80080579955491, 20.97869487449211],
            [105.80249616611935, 20.978686921354154]
        ]
    });

    const observationPointsChd1 = RivBoundary1.observationPoints;
    expect(observationPointsChd1.length).toBe(2);
    expect(observationPointsChd1.filter(op => op.id === 'RIV1_south').length).toBe(1);
    expect(observationPointsChd1.filter(op => op.id === 'RIV1_north').length).toBe(1);
    expect(RivBoundary1.getDateTimeValues('RIV1_south').length).toBe(12);
    expect(RivBoundary1.getDateTimeValues('RIV1_south')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [230, 1000, 200]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [230, 1000, 200]}]
    );
    expect(RivBoundary1.getDateTimeValues('RIV1_north').length).toBe(12);
    expect(RivBoundary1.getDateTimeValues('RIV1_north')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [240, 1100, 210]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [240, 1100, 210]}]
    );

    const RivBoundary2 = boundaries.filter(b => b.name === 'River 2')[0];
    expect(RivBoundary2).toBeInstanceOf(RiverBoundary);
    expect(RivBoundary2.name).toBe('River 2');
    expect(RivBoundary2.geometry).toEqual({
        type: 'LineString',
        coordinates: [
            [105.80661571026738, 20.968972726743612],
            [105.80079973820523, 20.97869472228025],
            [105.80249279827451, 20.978686756516314]
        ]
    });

    const observationPointsChd2 = RivBoundary2.observationPoints;
    expect(observationPointsChd2.length).toBe(2);
    expect(observationPointsChd2.filter(op => op.id === 'RIV2_south').length).toBe(1);
    expect(observationPointsChd2.filter(op => op.id === 'RIV2_north').length).toBe(1);
    expect(RivBoundary2.getDateTimeValues('RIV2_south').length).toBe(12);
    expect(RivBoundary2.getDateTimeValues('RIV2_south')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [231, 1101, 201]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [231, 1101, 201]}]
    );
    expect(RivBoundary2.getDateTimeValues('RIV2_north').length).toBe(12);
    expect(RivBoundary2.getDateTimeValues('RIV2_north')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [241, 1201, 211]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [241, 1201, 211]}]
    );
});

test('Import a RivBoundary from File', () => {
    const boundaryObject = boundaryObjects.rivBoundary();
    expect(boundaryObject.hasOwnProperty('id')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('name')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('geometry')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('metadata')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('observation_points')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('active_cells')).toBeTruthy();
});

test('Get RivBoundary from Object', () => {
    const boundaryObject = boundaryObjects.rivBoundary();
    const boundary = RiverBoundary.createFromObject(boundaryObject);
    expect(boundary).toBeInstanceOf(RiverBoundary);
    expect(boundary.toObject).toEqual(boundaryObject);
});
