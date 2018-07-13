import GcgPackage from '../../../../src/core/modflow/mt3d/gcgPackage';

test('Get GcgPackage from Default', () => {
    const gcg = GcgPackage.fromDefault();
    expect(gcg).toBeInstanceOf(GcgPackage);
    expect(gcg.packageName).toEqual('gcg');
    expect(gcg.mxiter).toEqual(1);
    expect(gcg.iter1).toEqual(50);
    expect(gcg.isolve).toEqual(3);
    expect(gcg.ncrs).toEqual(0);
    expect(gcg.accl).toEqual(1);
    expect(gcg.cclose).toEqual(1e-5);
    expect(gcg.iprgcg).toEqual(0);
    expect(gcg.extension).toEqual('gcg');
    expect(gcg.unitnumber).toEqual(null);
    expect(gcg.filenames).toEqual(null);
});

test('Get GcgPackage from Object', () => {
    const gcgObj = {
        _meta: {package_name: 'gcg'},
        mxiter: 1,
        iter1: 50,
        isolve: 3,
        ncrs: 0,
        accl: 1,
        cclose: 1e-5,
        iprgcg: 0,
        extension: 'gcg',
        unitnumber: null,
        filenames: null
    };
    const gcg = GcgPackage.fromObject(gcgObj);
    expect(gcg.toObject).toEqual(gcgObj);
});
