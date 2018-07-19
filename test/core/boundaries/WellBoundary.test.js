import fs from 'fs';
import Uuid from 'uuid';
import {WellBoundary} from '../../../src/core/boundaries';
import {importBoundariesFromCsv} from '../../../src/core/import/CsvImporter';
import * as boundaryObjects from '../../fixtures/obj/boundaryObjects';
import {getBoundaryDefaults} from '../../../src/t03/selectors/boundary';

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
    expect(wellBoundary.getDateTimeValues()).toEqual([{date_time: startDateTime, values: [0]}]);
    expect(wellBoundary.getIndexedDateTimeValues()).toEqual([{id: 0, date_time: startDateTime, values: [0]}]);
    expect(wellBoundary.activeCells).toBeNull();
});

test('Import WellBoundary from CSV', () => {
    const content = fs.readFileSync('test/fixtures/csv/wellBoundaries.csv', 'utf8');
    const boundaries = importBoundariesFromCsv(content);
    expect(Array.isArray(boundaries)).toBe(true);
    expect(boundaries.length).toBe(2);
    const wellBoundary1 = boundaries.filter(b => b.name === 'Pumping Well 1')[0];
    expect(wellBoundary1).toBeInstanceOf(WellBoundary);
    expect(wellBoundary1.name).toBe('Pumping Well 1');
    expect(wellBoundary1.wellType).toBe('inf');
    expect(wellBoundary1.geometry).toEqual({type: 'Point', coordinates: [105.80670115581347, 20.96897765302136]});
    expect(wellBoundary1.affectedLayers).toEqual([1]);
    expect(wellBoundary1.getDateTimeValues().length).toEqual(12);
    expect(wellBoundary1.getDateTimeValues()).toEqual([
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
    const wellBoundary2 = boundaries.filter(b => b.name === 'Pumping Well 2')[0];
    expect(wellBoundary2).toBeInstanceOf(WellBoundary);
    expect(wellBoundary2.name).toBe('Pumping Well 2');
    expect(wellBoundary2.wellType).toBe('puw');
    expect(wellBoundary2.geometry).toEqual({type: 'Point', coordinates: [105.80661546542011, 20.968747756127655]});
    expect(wellBoundary2.affectedLayers).toEqual([2]);
    expect(wellBoundary2.getDateTimeValues().length).toEqual(12);
    expect(wellBoundary2.getDateTimeValues()).toEqual([
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

test('WellBoundary ActiveCells', () => {
    const wellObject = boundaryObjects.wellBoundary();
    const wellBoundary = WellBoundary.createFromObject(wellObject);
    expect(wellBoundary.affectedCells).toEqual([[4, 5, 0]]);
    expect(wellBoundary.toObject).toEqual(wellObject);
});

test('Get BoundaryDefaults equals fromStartDate', () => {
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
    expect(wellBoundary.getDateTimeValues()).toEqual([{date_time: startDateTime, values: [0]}]);
    expect(wellBoundary.getIndexedDateTimeValues()).toEqual([{id: 0, date_time: startDateTime, values: [0]}]);
    expect(wellBoundary.activeCells).toBeNull();

    expect(wellBoundary.toObject).toEqual(getBoundaryDefaults('wel', id, name, geometry, startDateTime));
});
