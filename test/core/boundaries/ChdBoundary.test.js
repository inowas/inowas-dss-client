import fs from 'fs';
import Uuid from 'uuid';
import {importBoundariesFromCsv} from '../../../src/core/import/CsvImporter';
import * as boundaryObjects from '../../fixtures/obj/boundaryObjects';
import {ConstantHeadBoundary} from '../../../src/core/boundaries';

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
    expect(boundaries.length).toBe(1);

    const chd = boundaries[0];
    expect(chd).toBeInstanceOf(ConstantHeadBoundary);
    expect(chd.observationPoints.length).toBe(2);
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
