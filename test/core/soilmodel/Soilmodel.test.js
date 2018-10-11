import Soilmodel from "../../../src/core/soilmodel/Soilmodel";
import SoilmodelLayer from "../../../src/core/soilmodel/SoilmodelLayer";

const exampleSoilModel = {
    id: '123-456-abc-def',
    meta: {},
    general: {
        wetfct: 0.1
    },
    layers: [
        (new SoilmodelLayer()).toObject,
        (new SoilmodelLayer()).toObject
    ]
};

test('Get soilmodel from object', () => {
    const soilmodel1 = Soilmodel.fromObject(exampleSoilModel);
    expect(soilmodel1).toBeInstanceOf(Soilmodel);
    expect(soilmodel1.toObject).toEqual(exampleSoilModel);
    const soilmodel2 = Soilmodel.fromObject(null);
    const soilmodel3 = new Soilmodel();
    soilmodel2.id = soilmodel3.id;
    expect(soilmodel2).toEqual(soilmodel3);
});

test('Setters fallback values', () => {
    const soilmodel = new Soilmodel();
    soilmodel.id = 'c333ac03-a830-4005-83ab-77bb2286640f';
    soilmodel.meta = null;
    soilmodel.general = null;
    soilmodel.layers = null;
    expect(soilmodel.toObject).toEqual({
        "general": {
            "wetfct": 0.1
        },
        "id": "c333ac03-a830-4005-83ab-77bb2286640f",
        "layers": [],
        "meta": {}
    });
    soilmodel.id = null;
    expect(soilmodel.id).toHaveLength(36);
});

test('Add, remove, update layer to soilmodel', () => {
    const soilmodel = new Soilmodel();
    const layer1 = new SoilmodelLayer();
    const layer2 = new SoilmodelLayer();
    soilmodel.addLayer(layer1);
    soilmodel.addLayer(layer2);
    expect(soilmodel.layers).toHaveLength(2);
    layer1.name = 'Layer XYZ';
    soilmodel.updateLayer(layer1);
    expect(soilmodel.layers[0].name).toEqual('Layer XYZ');
    soilmodel.removeLayer(layer2);
    expect(soilmodel.layers).toHaveLength(1);
    expect(() => {
        soilmodel.addLayer({});
    }).toThrow();
});
