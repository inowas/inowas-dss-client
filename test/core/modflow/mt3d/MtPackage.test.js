import MtPackage from '../../../../src/core/modflow/mt3d/mtPackage';

test('Get MtPackage from Default', () => {
    const mt = MtPackage.fromDefault();
    expect(mt).toBeInstanceOf(MtPackage);
    expect(mt.packageName).toEqual('mt');
    expect(mt.modelname).toEqual('mt');
    expect(mt.namefileExt).toEqual('nam');
    expect(mt.exeName).toEqual('mt3dms');
    expect(mt.modelWs).toEqual('.');
    expect(mt.ftlfilename).toEqual('mt3d_link.ftl');
    expect(mt.version).toEqual('mt3dms');
    expect(mt.verbose).toEqual(false);
});

test('Get MtPackage from Object', () => {
    const mtObj = {
        modelname: 'mt1',
        namefile_ext: 'nam2',
        exe_name: 'mt3dm',
        model_ws: './../',
        ftlfilename: 'mt3d_link_2.ftl',
        version: 'mt3dms_2',
        verbose: true
    };

    const mt = MtPackage.fromObject(mtObj);
    expect(mt).toBeInstanceOf(MtPackage);
    expect(mt.packageName).toEqual('mt');
    expect(mt.modelname).toEqual('mt1');
    expect(mt.namefileExt).toEqual('nam2');
    expect(mt.exeName).toEqual('mt3dm');
    expect(mt.modelWs).toEqual('./../');
    expect(mt.ftlfilename).toEqual('mt3d_link_2.ftl');
    expect(mt.version).toEqual('mt3dms_2');
    expect(mt.verbose).toEqual(true);
});

test('Get MtPackage toObjectFromObject', () => {
    const mt = MtPackage.fromDefault();
    expect(mt).toBeInstanceOf(MtPackage);
    expect(mt.toObject).toEqual({
        modelname: 'mt',
        namefile_ext: 'nam',
        exe_name: 'mt3dms',
        model_ws: '.',
        ftlfilename: 'mt3d_link.ftl',
        version: 'mt3dms',
        verbose: false
    });
});
