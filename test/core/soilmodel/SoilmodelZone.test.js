import SoilmodelZone from "../../../src/core/soilmodel/SoilmodelZone";

const exampleZone = {
    'id': 'abc-123-def-456',
    'name': 'Zone 1',
    'geometry': {
        'type': 'Polygon',
        'coordinates': [
            [-63.687336, -31.313615],
            [-63.687336, -31.367449],
            [-63.56926, -31.367449],
            [-63.56926, -31.313615],
            [-63.687336, -31.313615]
        ]
    },
    'activeCells': [[0, 10], [1, 10], [2, 10], [3, 10], [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9]],
    'priority': 1,
    'hk': 10,
    'hani': 1,
    'vka': 1,
    'ss': 0.00001,
    'sy': 0.2
};

test('Get soilmodel zone from object and from default', () => {
    const zone1 = SoilmodelZone.fromObject(exampleZone);
    expect(zone1).toBeInstanceOf(SoilmodelZone);
    expect(zone1.toObject).toEqual(exampleZone);
    const zone2 = SoilmodelZone.fromObject(null);
    const zone3 = new SoilmodelZone();
    zone3.id = zone2.id;
    expect(zone2).toEqual(zone3);
    const zone4 = SoilmodelZone.fromDefault();
    zone4.id = 'c333ac03-a830-4005-83ab-77bb2286640f';
    expect(zone4.toObject).toEqual({
        'activeCells': [],
        'geometry': {},
        'hani': 1,
        'hk': 10,
        'id': 'c333ac03-a830-4005-83ab-77bb2286640f',
        'name': 'Default',
        'priority': 0,
        'ss': 0.00002,
        'sy': 0.15,
        'vka': 1
    });
});

test('Setters fallback values', () => {
    const zone = new SoilmodelZone();
    zone.id = 'c333ac03-a830-4005-83ab-77bb2286640f';
    zone.name = null;
    zone.activeCells = null;
    zone.geometry = null;
    zone.priority = null;
    zone.hk = null;
    zone.hani = null;
    zone.vka = null;
    zone.ss = null;
    zone.sy = null;
    expect(zone.toObject).toEqual({
        'activeCells': [],
        'geometry': {},
        'hani': null,
        'hk': null,
        'id': 'c333ac03-a830-4005-83ab-77bb2286640f',
        'name': '',
        'priority': 0,
        'ss': null,
        'sy': null,
        'vka': null
    });
    zone.id = null;
    expect(zone.id).toHaveLength(36);
});
