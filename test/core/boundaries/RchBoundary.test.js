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
    expect(boundary.hasObservationPoints).toEqual(false);
    expect(boundary.dateTimeValues).toEqual([{date_time: startDateTime, values: [0]}]);
    expect(boundary.indexedDateTimeValues).toEqual([{id: 0, date_time: startDateTime, values: [0]}]);
    expect(boundary.activeCells).toBeNull();
});

test('Import RchBoundary from CSV', () => {
    const content = fs.readFileSync('test/fixtures/csv/rchBoundaries.csv', 'utf8');
    const boundaries = importBoundariesFromCsv(content);
    expect(Array.isArray(boundaries)).toBe(true);
    expect(boundaries.length).toBe(1);
    expect(boundaries[0]).toBeInstanceOf(RechargeBoundary);
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
