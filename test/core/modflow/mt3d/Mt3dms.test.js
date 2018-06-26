import Mt3dms from '../../../../src/core/modflow/mt3d/mt3dms';
import MtPackage from '../../../../src/core/modflow/mt3d/mtPackage';

test('Create Mt3Dms', () => {
    const mt3dms = new Mt3dms();
    expect(mt3dms).toBeInstanceOf(Mt3dms);
    mt3dms.addPackage(MtPackage.fromDefault());
    expect(mt3dms.toObject).toEqual({
        packages: ['mt'],
        run_model: true,
        write_input: true,
        mt: {
            modelname: 'mt',
            namefile_ext: 'nam',
            exe_name: 'mt3dms',
            model_ws: '.',
            ftlfilename: 'mt3d_link.ftl',
            version: 'mt3dms',
            verbose: false
        }
    });
});
