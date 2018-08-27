import SoilmodelZone from "../../../src/core/soilmodel/SoilmodelZone";

const exampleZone = {
    'id': 'abc-123-def-456',
    'name': 'Zone 1',
    'cells': [
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
    ],
    'hk': 10,
    'hani': 1,
    'vka': 1,
    'ss': 0.00001,
    'sy': 0.2
};

test('Get soilmodel zone from object', () => {
    const zone1 = SoilmodelZone.fromObject(exampleZone);
    expect(zone1).toBeInstanceOf(SoilmodelZone);
    expect(zone1.toObject).toEqual(exampleZone);

    const zone2 = SoilmodelZone.fromObject(null);
    const zone3 = new SoilmodelZone();
    zone3.id = zone2.id;
    expect(zone2).toEqual(zone3);
});

test('Setters fallback values', () => {
    const zone = new SoilmodelZone();
    zone.id = 'c333ac03-a830-4005-83ab-77bb2286640f';
    zone.name = null;
    zone.cells = null;
    zone.hk = null;
    zone.hani = null;
    zone.vka = null;
    zone.ss = null;
    zone.sy = null;
    expect(zone.toObject).toEqual({
        'cells': [],
        'hani': 0,
        'hk': 0,
        'id': 'c333ac03-a830-4005-83ab-77bb2286640f',
        'name': '',
        'ss': 0,
        'sy': 0,
        'vka': 0
    });
    zone.id = null;
    expect(zone.id).toHaveLength(36);
});