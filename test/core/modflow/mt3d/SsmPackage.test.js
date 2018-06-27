import SsmPackage from '../../../../src/core/modflow/mt3d/ssmPackage';

test('Get SsmPackage from Default', () => {
    const ssm = SsmPackage.fromDefault();
    expect(ssm).toBeInstanceOf(SsmPackage);
    expect(ssm.packageName).toEqual('ssm');
    expect(ssm.crch).toEqual(null);
    expect(ssm.cevt).toEqual(null);
    expect(ssm.mxss).toEqual(null);
    expect(ssm.stressPeriodData).toEqual(null);
    expect(ssm.dtype).toEqual(null);
    expect(ssm.extension).toEqual('ssm');
    expect(ssm.unitnumber).toEqual(null);
    expect(ssm.filenames).toEqual(null);
});

test('Get SsmPackage from Object', () => {
    const ssmObj = {
        crch: null,
        cevt: null,
        mxss: null,
        stress_period_data: null,
        dtype: null,
        extension: 'ssm',
        unitnumber: null,
        filenames: null
    };
    const ssm = SsmPackage.fromObject(ssmObj);
    expect(ssm.toObject).toEqual(ssmObj);
});
