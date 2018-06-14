import fs from 'fs';
import Uuid from 'uuid';
import {importBoundariesFromCsv} from '../../../src/core/import/CsvImporter';
import * as boundaryObjects from '../../fixtures/obj/boundaryObjects';
import GeneralHeadBoundary from '../../../src/core/boundaries/GeneralHeadBoundary';

test('GhbBoundary createWithStartDate', () => {
    const id = Uuid.v4();
    const name = 'NameOfBoundary';
    const geometry = {type: 'LineString', coordinates: [[0, 0], [0, 10], [10, 10], [10, 0]]};
    const startDateTime = new Date('2015-01-02').toISOString();

    const boundary = GeneralHeadBoundary.createWithStartDate({
        id,
        name,
        geometry,
        utcIsoStartDateTime: startDateTime
    });

    expect(boundary).toBeInstanceOf(GeneralHeadBoundary);
    expect(boundary.id).toEqual(id);
    expect(boundary.name).toEqual(name);
    expect(boundary.geometry).toEqual(geometry);
    expect(boundary.affectedLayers).toEqual([0]);
    expect(boundary.metadata).toEqual({});
    expect(boundary.getDateTimeValues()).toEqual([{date_time: startDateTime, values: [0, 0]}]);
    expect(boundary.getIndexedDateTimeValues()).toEqual([{id: 0, date_time: startDateTime, values: [0, 0]}]);
    expect(boundary.activeCells).toBeNull();
});

test('Import GhbBoundary from CSV', () => {
    const content = fs.readFileSync('test/fixtures/csv/ghbBoundaries.csv', 'utf8');

    const boundaries = importBoundariesFromCsv(content);
    expect(Array.isArray(boundaries)).toBe(true);
    expect(boundaries.length).toBe(2);
    const GhbBoundary1 = boundaries.filter(b => b.name === 'General Head 1')[0];
    expect(GhbBoundary1).toBeInstanceOf(GeneralHeadBoundary);
    expect(GhbBoundary1.name).toBe('General Head 1');
    expect(GhbBoundary1.geometry).toEqual({
        type: 'LineString',
        coordinates: [
            [105.80670115581347, 20.96897765302136],
            [105.80080579955491, 20.97869487449211],
            [105.80249616611935, 20.978686921354154]
        ]
    });

    const observationPointsChd1 = GhbBoundary1.observationPoints;
    expect(observationPointsChd1.length).toBe(2);
    expect(observationPointsChd1.filter(op => op.id === 'GHB1_south').length).toBe(1);
    expect(observationPointsChd1.filter(op => op.id === 'GHB1_north').length).toBe(1);
    expect(GhbBoundary1.getDateTimeValues('GHB1_south').length).toBe(12);
    expect(GhbBoundary1.getDateTimeValues('GHB1_south')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [230, 1000]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [230, 1000]}]
    );
    expect(GhbBoundary1.getDateTimeValues('GHB1_north').length).toBe(12);
    expect(GhbBoundary1.getDateTimeValues('GHB1_north')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [240, 1100]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [240, 1100]}]
    );

    const GhbBoundary2 = boundaries.filter(b => b.name === 'General Head 2')[0];
    expect(GhbBoundary2).toBeInstanceOf(GeneralHeadBoundary);
    expect(GhbBoundary2.name).toBe('General Head 2');
    expect(GhbBoundary2.geometry).toEqual({
        type: 'LineString',
        coordinates: [
            [105.80661571026738, 20.968972726743612],
            [105.80079973820523, 20.97869472228025],
            [105.80249279827451, 20.978686756516314]
        ]
    });

    const observationPointsChd2 = GhbBoundary2.observationPoints;
    expect(observationPointsChd2.length).toBe(2);
    expect(observationPointsChd2.filter(op => op.id === 'GHB2_south').length).toBe(1);
    expect(observationPointsChd2.filter(op => op.id === 'GHB2_north').length).toBe(1);
    expect(GhbBoundary2.getDateTimeValues('GHB2_south').length).toBe(12);
    expect(GhbBoundary2.getDateTimeValues('GHB2_south')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [231, 1101]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [231, 1101]}]
    );
    expect(GhbBoundary2.getDateTimeValues('GHB2_north').length).toBe(12);
    expect(GhbBoundary2.getDateTimeValues('GHB2_north')).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [241, 1201]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [241, 1201]}]
    );
});

test('Import a GhbBoundary from File', () => {
    const boundaryObject = boundaryObjects.ghbBoundary();
    expect(boundaryObject.hasOwnProperty('id')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('name')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('geometry')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('metadata')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('observation_points')).toBeTruthy();
    expect(boundaryObject.hasOwnProperty('active_cells')).toBeTruthy();
});

test('Get GhbBoundary from Object', () => {
    const boundaryObject = boundaryObjects.ghbBoundary();
    const boundary = GeneralHeadBoundary.createFromObject(boundaryObject);
    expect(boundary).toBeInstanceOf(GeneralHeadBoundary);
    expect(boundary.toObject).toEqual(boundaryObject);
});
