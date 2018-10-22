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

test('Reorder zones', () => {
    const layer = new SoilmodelLayer();
    const zone1 = SoilmodelZone.fromDefault();
    const zone2 = new SoilmodelZone();
    const zone3 = new SoilmodelZone();
    zone1.priority = 0;
    zone2.priority = 1;
    zone3.priority = 2;
    layer.addZone(zone1).addZone(zone2).addZone(zone3);
    layer.changeOrder(zone2, 'up');
    expect(zone2.priority).toEqual(2);
    expect(zone3.priority).toEqual(1);
    layer.changeOrder(zone2, 'down');
    expect(zone2.priority).toEqual(1);
    expect(zone3.priority).toEqual(2);
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
        [16, 19.428571428571427, 17.06122448979592, 12.43731778425656, 10.487463556851313],
        [19.346938775510207, 19.183673469387756, 16.811078717201166, 12.679708454810497, 10.800641399416909],
        [18.36151603498542, 17.370320699708454, 14.604478134110787, 11.489590670553936, 10.709991503540193],
        [16.533119533527696, 13.686943440233236, 11.715133294460642, 10.851919360266555, 10.435928790622954],
        [16.044012594752186, 12.568458408996252, 11.260350643422385, 10.60904744125322, 10.379379118428545]
    ]);
    layer.smoothParameter(gridSize, 'hk', 2);
    expect(layer.hk).toEqual([
        [18.14170400904385, 17.585984199149287, 15.620700526969102, 13.355099576830098, 12.190519645825267],
        [17.688995903671955, 16.709132108268328, 14.927688444713928, 13.091313409732042, 12.184802115631214],
        [16.365544899588002, 15.38341551561464, 13.808049883026348, 12.43498464417856, 11.822078084719807],
        [15.023350764284917, 14.16936428494785, 12.884148852794402, 11.891263035683071, 11.44981895422993],
        [14.455205249262454, 13.615275994668313, 12.562524966976676, 11.728353625349184, 11.362141699947383]
    ]);
    layer.smoothParameter(gridSize, 'hk', 2, 2);
    expect(layer.hk).toEqual([
        [14.940845886177451, 14.404938563485189, 14.00327073427298, 13.661326119180195, 13.363028438504173],
        [14.345104309963308, 13.981413206375093, 13.714581046795507, 13.469114318152084, 13.259354452055303],
        [14.007983311263914, 13.758188992244325, 13.571280519906793, 13.382637804656728, 13.224849888248235],
        [13.784687736275613, 13.589083662778345, 13.44719560871571, 13.304188470086437, 13.189290503799771],
        [13.650954907061779, 13.498088146293405, 13.396258624275076, 13.297173175457248, 13.224630985267462]
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
