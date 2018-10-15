import SoilmodelZone from "../../../src/core/soilmodel/SoilmodelZone";
import SoilmodelLayer from "../../../src/core/soilmodel/SoilmodelLayer";

const exampleLayer = {
    id: '123-abc-456',
    _meta: {
        zones: [
            (SoilmodelZone.fromDefault()).toObject,
            (new SoilmodelZone()).toObject
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
    layer.updateZone(zone2);
    expect(layer.zones).toHaveLength(2);
    zone1.name = 'Zone XYZ';
    layer.updateZone(zone1);
    expect(layer.zones[0].name).toEqual('Zone XYZ');
    layer.removeZone(zone2);
    expect(layer.zones).toHaveLength(1);
    expect(() => {
        layer.addZone({});
    }).toThrow();
});

test('Setters fallback values', () => {
    const layer = new SoilmodelLayer();
    layer.id = 'c333ac03-a830-4005-83ab-77bb2286640f';
    layer.name = null;
    layer.number = null;
    layer.zones = null;
    layer.description = null;
    layer.laytyp = null;
    layer.top = null;
    layer.botm = null;
    layer.meta = null;
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
        "_meta": {
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
    expect(layer.meta).toEqual({
        _zones: []
    })
});

test('Zones to parameter and smoothing', () => {
    const gridSize = {
        n_x: 5,
        n_y: 5
    };
    const layer = new SoilmodelLayer();
    const zone1 = SoilmodelZone.fromDefault();
    const zone2 = new SoilmodelZone();
    zone1.hk = 10;
    zone1.activeCells = new Array(gridSize.n_y * gridSize.n_x).fill(0).map((value, key) => {
        return [Math.floor(key / gridSize.n_y), key - Math.floor(key / gridSize.n_y) * gridSize.n_x];
    });
    zone2.name = 'Clay';
    zone2.priority = 1;
    zone2.hk = 20;
    zone2.activeCells = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    layer.addZone(zone1).addZone(zone2).zonesToParameters(gridSize, 'hk');
    expect(layer.hk).toEqual([
        [10, 20, 20, 10, 10],
        [20, 20, 20, 10, 10],
        [20, 20, 20, 10, 10],
        [20, 10, 10, 10, 10],
        [20, 10, 10, 10, 10]
    ]);
    layer.smoothParameter(gridSize, 'hk');
    expect(layer.hk).toEqual([
        [17.5, 19.583333333333332, 16.59722222222222, 12.766203703703704, 10.691550925925926],
        [19.51388888888889, 19.243827160493826, 16.4656207133059, 12.946733062795305, 11.067414615404155],
        [18.12628600823045, 17.03884697454656, 13.966114212349064, 11.605098067094936, 10.936540957549065],
        [15.860855497129501, 13.88801141025062, 11.833118962693463, 10.926763577742948, 10.578067100397824],
        [14.93721672684503, 12.753200432819767, 11.5668490639178, 10.817466450792006, 10.580574282233194]
    ]);
    layer.smoothParameter(gridSize, 'hk', 2);
    expect(layer.hk).toEqual([
        [18.330955842522968, 17.33544878450389, 15.405313705263538, 13.502525890367023, 12.632180040362845],
        [17.345711175308594, 16.361625315059072, 14.714807276926585, 13.201790249810792, 12.52516526117447],
        [15.85648155353041, 15.025586806532921, 13.72045665047626, 12.605569856638981, 12.134129540750957],
        [14.565809761634627, 13.959900432205917, 12.972811812982902, 12.155629624615509, 11.818075599690104],
        [14.01131868762564, 13.531389677023995, 12.74706705436084, 12.078349543751202, 11.823935168449404]
    ]);
    layer.zonesToParameters(gridSize);
    expect(layer.hani).toEqual([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ]);
});
