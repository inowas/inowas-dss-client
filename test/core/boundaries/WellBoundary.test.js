import fs from 'fs';
import Uuid from 'uuid';
import {WellBoundary} from '../../../src/core/boundaries';
import {importBoundariesFromCsv} from '../../../src/core/import/CsvImporter';
import * as boundaryObjects from '../../fixtures/obj/boundaryObjects';

test('WellBoundary createWithStartDate', () => {
    const id = Uuid.v4();
    const name = 'NameOfWell';
    const geometry = {type: 'Point', coordinates: [[3, 4]]};
    const startDateTime = new Date('2015-01-02').toISOString();

    const wellBoundary = WellBoundary.createWithStartDate({
        id,
        name,
        geometry,
        utcIsoStartDateTime: startDateTime
    });

    expect(wellBoundary).toBeInstanceOf(WellBoundary);
    expect(wellBoundary.id).toEqual(id);
    expect(wellBoundary.name).toEqual(name);
    expect(wellBoundary.geometry).toEqual(geometry);
    expect(wellBoundary.affectedLayers).toEqual([0]);
    expect(wellBoundary.metadata).toEqual({well_type: 'puw'});
    expect(wellBoundary.hasObservationPoints).toEqual(false);
    expect(wellBoundary.dateTimeValues).toEqual([{date_time: startDateTime, values: [0]}]);
    expect(wellBoundary.indexedDateTimeValues).toEqual([{id: 0, date_time: startDateTime, values: [0]}]);
    expect(wellBoundary.activeCells).toBeNull();
});

test('Import WellBoundary from CSV', () => {
    const content = fs.readFileSync('test/fixtures/csv/wellBoundaries.csv', 'utf8');
    const boundaries = importBoundariesFromCsv(content);
    expect(Array.isArray(boundaries)).toBe(true);
    expect(boundaries.length).toBe(1);
    expect(boundaries[0]).toBeInstanceOf(WellBoundary);
});


test('Import a WellObjectFromFile', () => {
    const wellObject = boundaryObjects.wellBoundary();
    expect(wellObject.hasOwnProperty('id')).toBeTruthy();
    expect(wellObject.hasOwnProperty('name')).toBeTruthy();
    expect(wellObject.hasOwnProperty('geometry')).toBeTruthy();
    expect(wellObject.hasOwnProperty('affected_layers')).toBeTruthy();
    expect(wellObject.hasOwnProperty('metadata')).toBeTruthy();
    expect(wellObject.hasOwnProperty('date_time_values')).toBeTruthy();
    expect(wellObject.hasOwnProperty('active_cells')).toBeTruthy();
});

test('Get WellBoundary from Object', () => {
    const wellObject = boundaryObjects.wellBoundary();
    const wellBoundary = WellBoundary.createFromObject(wellObject);
    expect(wellBoundary).toBeInstanceOf(WellBoundary);
    expect(wellBoundary.toObject).toEqual(wellObject);
});
