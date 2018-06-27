import AdvPackage from '../../../../src/core/modflow/mt3d/advPackage';

test('Get AdvPackage from Default', () => {
    const adv = AdvPackage.fromDefault();
    expect(adv).toBeInstanceOf(AdvPackage);
    expect(adv.packageName).toEqual('adv');
    expect(adv.mixelm).toEqual(3);
    expect(adv.percel).toEqual(0.75);
    expect(adv.mxpart).toEqual(800000);
    expect(adv.nadvfd).toEqual(1);
    expect(adv.itrack).toEqual(3);
    expect(adv.wd).toEqual(0.5);
    expect(adv.dceps).toEqual(1e-5);
    expect(adv.nplane).toEqual(2);
    expect(adv.npl).toEqual(10);
    expect(adv.nph).toEqual(40);
    expect(adv.npmin).toEqual(5);
    expect(adv.npmax).toEqual(80);
    expect(adv.nlsink).toEqual(0);
    expect(adv.npsink).toEqual(15);
    expect(adv.dchmoc).toEqual(0.0001);
    expect(adv.extension).toEqual('adv');
    expect(adv.unitnumber).toEqual(null);
    expect(adv.filenames).toEqual(null);
});

test('Get AdvPackage from Object', () => {
    const advObj = {
        mixelm: 4,
        percel: 0.7,
        mxpart: 700000,
        nadvfd: 2,
        itrack: 2,
        wd: 0.3,
        dceps: 2e-5,
        nplane: 3,
        npl: 11,
        nph: 42,
        npmin: 6,
        npmax: 81,
        nlsink: 1,
        npsink: 16,
        dchmoc: 0.0002,
        extension: 'ad',
        unitnumber: 12,
        filenames: 'TEST'
    };
    const adv = AdvPackage.fromObject(advObj);
    expect(adv.toObject).toEqual(advObj);
});
