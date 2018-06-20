import fs from 'fs';
import Uuid from 'uuid';
import * as boundaryObjects from '../../fixtures/obj/boundaryObjects';
import HeadObservation from '../../../src/core/boundaries/HeadObservation';
import {importBoundariesFromCsv} from "../../../src/core/import/CsvImporter";

test('HeadObservation createWithStartDate', () => {
    const id = Uuid.v4();
    const name = 'NameOfHeadObservation';
    const geometry = {type: 'Point', coordinates: [[3, 4]]};
    const startDateTime = new Date('2015-01-02').toUTCString();

    const headObservation = HeadObservation.createWithStartDate({
        id,
        name,
        geometry,
        utcIsoStartDateTime: startDateTime
    });

    expect(headObservation).toBeInstanceOf(HeadObservation);
    expect(headObservation.id).toEqual(id);
    expect(headObservation.name).toEqual(name);
    expect(headObservation.geometry).toEqual(geometry);
    expect(headObservation.affectedLayers).toEqual([0]);
    expect(headObservation.metadata).toEqual({});
    expect(headObservation.getDateTimeValues()).toEqual([{date_time: startDateTime, values: [0]}]);
    expect(headObservation.getIndexedDateTimeValues()).toEqual([{id: 0, date_time: startDateTime, values: [0]}]);
    expect(headObservation.activeCells).toBeNull();
});

test('Import HeadObservation from CSV', () => {
    const content = fs.readFileSync('test/fixtures/csv/headObservations.csv', 'utf8');
    const boundaries = importBoundariesFromCsv(content);
    expect(Array.isArray(boundaries)).toBe(true);
    expect(boundaries.length).toBe(2);
    const headObservation1 = boundaries.filter(b => b.name === 'Head Observation 1')[0];
    expect(headObservation1).toBeInstanceOf(HeadObservation);
    expect(headObservation1.name).toBe('Head Observation 1');
    expect(headObservation1.geometry).toEqual({type: 'Point', coordinates: [105.80670115581347, 20.96897765302136]});
    expect(headObservation1.affectedLayers).toEqual([1]);
    expect(headObservation1.getDateTimeValues().length).toEqual(12);
    expect(headObservation1.getDateTimeValues()).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [-1000]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [-2000]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [-3000]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [4000]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [5000]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [6000]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [5900]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [5000]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [4000]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [-3000]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [-2000]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [-1000]}
    ]);
    const headObservation2 = boundaries.filter(b => b.name === 'Head Observation 2')[0];
    expect(headObservation2).toBeInstanceOf(HeadObservation);
    expect(headObservation2.name).toBe('Head Observation 2');
    expect(headObservation2.geometry).toEqual({type: 'Point', coordinates: [105.80661546542011, 20.968747756127655]});
    expect(headObservation2.affectedLayers).toEqual([2]);
    expect(headObservation2.getDateTimeValues().length).toEqual(12);
    expect(headObservation2.getDateTimeValues()).toEqual([
        {'date_time': '2010-01-01T00:00:00.000Z', 'values': [-1000]},
        {'date_time': '2010-02-01T00:00:00.000Z', 'values': [-2000]},
        {'date_time': '2010-03-01T00:00:00.000Z', 'values': [-3000]},
        {'date_time': '2010-04-01T00:00:00.000Z', 'values': [4000]},
        {'date_time': '2010-05-01T00:00:00.000Z', 'values': [5000]},
        {'date_time': '2010-06-01T00:00:00.000Z', 'values': [6000]},
        {'date_time': '2010-07-01T00:00:00.000Z', 'values': [5900]},
        {'date_time': '2010-08-01T00:00:00.000Z', 'values': [5000]},
        {'date_time': '2010-09-01T00:00:00.000Z', 'values': [4000]},
        {'date_time': '2010-10-01T00:00:00.000Z', 'values': [-2000]},
        {'date_time': '2010-11-01T00:00:00.000Z', 'values': [-1000]},
        {'date_time': '2010-12-01T00:00:00.000Z', 'values': [-2000]}
    ]);
});

test('Import a HeadObservationObjectFromFile', () => {
    const headObservationObject = boundaryObjects.headObservation();
    expect(headObservationObject.hasOwnProperty('id')).toBeTruthy();
    expect(headObservationObject.hasOwnProperty('name')).toBeTruthy();
    expect(headObservationObject.hasOwnProperty('geometry')).toBeTruthy();
    expect(headObservationObject.hasOwnProperty('affected_layers')).toBeTruthy();
    expect(headObservationObject.hasOwnProperty('metadata')).toBeTruthy();
    expect(headObservationObject.hasOwnProperty('date_time_values')).toBeTruthy();
    expect(headObservationObject.hasOwnProperty('active_cells')).toBeTruthy();
});

test('Get HeadObservation from Object', () => {
    const headObservationObj = boundaryObjects.headObservation();
    const headObservation = HeadObservation.createFromObject(headObservationObj);
    expect(headObservation).toBeInstanceOf(HeadObservation);
    expect(headObservation.toObject).toEqual(headObservationObj);
});

test('Get BoundaryDefaults equals fromStartDate', () => {
    const id = Uuid.v4();
    const name = 'NameOfHeadObservation';
    const geometry = {type: 'Point', coordinates: [[3, 4]]};
    const startDateTime = new Date('2015-01-02').toUTCString();

    const headObservation = HeadObservation.createWithStartDate({
        id,
        name,
        geometry,
        utcIsoStartDateTime: startDateTime
    });

    expect(headObservation).toBeInstanceOf(HeadObservation);
    expect(headObservation.id).toEqual(id);
    expect(headObservation.name).toEqual(name);
    expect(headObservation.geometry).toEqual(geometry);
    expect(headObservation.affectedLayers).toEqual([0]);
    expect(headObservation.metadata).toEqual({});
    expect(headObservation.getDateTimeValues()).toEqual([{date_time: startDateTime, values: [0]}]);
    expect(headObservation.getIndexedDateTimeValues()).toEqual([{id: 0, date_time: startDateTime, values: [0]}]);
    expect(headObservation.activeCells).toBeNull();
});
