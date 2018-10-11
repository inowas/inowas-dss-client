import SoilmodelZone from "../../../src/core/soilmodel/SoilmodelZone";
import SoilmodelLayer from "../../../src/core/soilmodel/SoilmodelLayer";

const exampleLayer = {
    id: '123-abc-456',
    meta: {
        zones: [
            new SoilmodelZone(),
            new SoilmodelZone()
        ]
    },
    name: 'New Layer',
    description: 'This is an example layer.',
    number: 1,
    laytyp: 1,
    top: [
        [200, 201, 202, 202, 203],
        [201, 201, 201, 202, 202],
        [202, 202, 200, 201, 201]
    ],
    botm: 195,
    hk: 0.004,
    hani: 1,
    vka: 1,
    layavg: 2,
    laywet: 1,
    ss: 0.0002,
    sy: 0.4
};

test('Get soilmodel layer from object', () => {
    const layer1 = SoilmodelLayer.fromObject(exampleLayer);
    expect(layer1).toBeInstanceOf(SoilmodelLayer);
    expect(layer1.toObject).toEqual(exampleLayer);
    const layer2 = SoilmodelLayer.fromObject(null);
    const layer3 = new SoilmodelLayer();
    layer3.id = layer2.id;
    expect(layer2).toEqual(layer3);
});

test('Add, remove, update zone to layer', () => {
    const layer = new SoilmodelLayer();
    const zone1 = new SoilmodelZone();
    const zone2 = new SoilmodelZone();
    layer.addZone(zone1);
    layer.addZone(zone2);
    expect(layer.meta.zones).toHaveLength(2);
    zone1.name = 'Zone XYZ';
    layer.updateZone(zone1);
    expect(layer.meta.zones[0].name).toEqual('Zone XYZ');
    layer.removeZone(zone2);
    expect(layer.meta.zones).toHaveLength(1);
    expect(() => {
        layer.addZone({});
    }).toThrow();
});

test('Setters fallback values', () => {
    const layer = new SoilmodelLayer();
    layer.id = 'c333ac03-a830-4005-83ab-77bb2286640f';
    layer.name = null;
    layer.number = null;
    layer.meta = null;
    layer.description = null;
    layer.laytyp = null;
    layer.top = null;
    layer.botm = null;
    layer.hk = null;
    layer.hani = null;
    layer.vka = null;
    layer.layavg = null;
    layer.laywet = null;
    layer.ss = null;
    layer.sy = null;
    expect(layer.toObject).toEqual({
        "botm": 0,
        "description": "",
        "hani": 0,
        "hk": 0,
        "id": "c333ac03-a830-4005-83ab-77bb2286640f",
        "layavg": 0,
        "laytyp": 0,
        "laywet": 0,
        "meta": {
            "zones": []
        },
        "name": "New Layer",
        "number": 0,
        "ss": 0,
        "sy": 0,
        "top": 0,
        "vka": 0
    });
    layer.id = null;
    expect(layer.id).toHaveLength(36);
});
